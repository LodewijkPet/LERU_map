param(
    [Parameter(Mandatory = $true)]
    [string]$WorkspaceRoot
)

$ErrorActionPreference = 'Stop'
$workspaceResolved = [IO.Path]::GetFullPath($WorkspaceRoot)

if (-not (Test-Path -LiteralPath $workspaceResolved -PathType Container)) {
    throw "Workspace directory does not exist: $workspaceResolved"
}

function Ensure-Directory {
    param([Parameter(Mandatory = $true)][string]$Path)
    if (-not (Test-Path -LiteralPath $Path -PathType Container)) {
        New-Item -ItemType Directory -Path $Path | Out-Null
    }
}

function Write-JsonFile {
    param(
        [Parameter(Mandatory = $true)][object]$Object,
        [Parameter(Mandatory = $true)][string]$Path,
        [int]$Depth = 20
    )
    $json = $Object | ConvertTo-Json -Depth $Depth
    [IO.File]::WriteAllText($Path, $json + [Environment]::NewLine, [Text.UTF8Encoding]::new($false))
}

function Normalize-Url {
    param([Parameter(Mandatory = $true)][string]$Url)
    try {
        $builder = [UriBuilder]::new($Url)
        if ($builder.Query) {
            $pairs = $builder.Query.TrimStart('?').Split('&', [StringSplitOptions]::RemoveEmptyEntries)
            $kept = @($pairs | Where-Object { $_ -notmatch '^(?i)(utm_[^=]*|fbclid|gclid)=' })
            $builder.Query = $kept -join '&'
        }
        return $builder.Uri.AbsoluteUri
    }
    catch {
        return $Url
    }
}

function Get-SafeFileName {
    param(
        [Parameter(Mandatory = $true)][string]$Url,
        [Parameter(Mandatory = $true)][string]$FallbackExtension
    )
    try {
        $uri = [Uri]::new($Url)
        $name = [Uri]::UnescapeDataString([IO.Path]::GetFileName($uri.AbsolutePath))
    }
    catch {
        $name = ''
    }
    if ([string]::IsNullOrWhiteSpace($name)) {
        $bytes = [Text.Encoding]::UTF8.GetBytes($Url)
        $hash = [Convert]::ToHexString([Security.Cryptography.SHA256]::HashData($bytes)).Substring(0, 12).ToLowerInvariant()
        $name = "source_$hash$FallbackExtension"
    }
    $invalid = [IO.Path]::GetInvalidFileNameChars()
    foreach ($char in $invalid) {
        $name = $name.Replace([string]$char, '_')
    }
    if (-not [IO.Path]::GetExtension($name)) {
        $name += $FallbackExtension
    }
    if ($name.Length -gt 150) {
        $extension = [IO.Path]::GetExtension($name)
        $stem = [IO.Path]::GetFileNameWithoutExtension($name)
        $name = $stem.Substring(0, [Math]::Min(130, $stem.Length)) + $extension
    }
    return $name
}

function Test-DownloadedFile {
    param(
        [Parameter(Mandatory = $true)][string]$Path,
        [Parameter(Mandatory = $true)][string]$Kind
    )
    if (-not (Test-Path -LiteralPath $Path -PathType Leaf)) { return $false }
    if ((Get-Item -LiteralPath $Path).Length -lt 100) { return $false }
    $stream = [IO.File]::OpenRead($Path)
    try {
        $buffer = [byte[]]::new(4)
        $read = $stream.Read($buffer, 0, $buffer.Length)
    }
    finally {
        $stream.Dispose()
    }
    if ($read -lt 2) { return $false }
    if ($Kind -eq 'pdf') {
        return ($buffer[0] -eq 0x25 -and $buffer[1] -eq 0x50 -and $buffer[2] -eq 0x44 -and $buffer[3] -eq 0x46)
    }
    return ($buffer[0] -eq 0x50 -and $buffer[1] -eq 0x4B)
}

$downloadRoot = Join-Path $workspaceResolved '99_Project_Admin\_download_tmp'
Ensure-Directory -Path $downloadRoot
$log = [System.Collections.Generic.List[object]]::new()
$userAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) LERU-research-integrity-source-archiver/1.0'

$dossiers = Get-ChildItem -LiteralPath $workspaceResolved -Directory |
    Where-Object { $_.Name -match '^\d\d_[A-Z]{2}_' } |
    Sort-Object Name

foreach ($dossier in $dossiers) {
    $manifestPath = Join-Path $dossier.FullName '06_Web_Sources_and_Snapshots\web_sources_legacy.json'
    if (-not (Test-Path -LiteralPath $manifestPath -PathType Leaf)) { continue }

    $items = @(Get-Content -Raw -LiteralPath $manifestPath | ConvertFrom-Json)
    for ($i = 0; $i -lt $items.Count; $i++) {
        $item = $items[$i]
        if ($item.inferred_type -notin @('pdf', 'word_document')) { continue }

        $kind = if ($item.inferred_type -eq 'pdf') { 'pdf' } else { 'word_document' }
        $extension = if ($kind -eq 'pdf') { '.pdf' } else { '.docx' }
        $normalizedUrl = Normalize-Url -Url ([string]$item.url)
        $fileName = Get-SafeFileName -Url $normalizedUrl -FallbackExtension $extension
        $tempName = '{0}_{1}.download' -f $dossier.Name, ([Guid]::NewGuid().ToString('N'))
        $tempPath = Join-Path $downloadRoot $tempName
        $destination = Join-Path $dossier.FullName ('03_Procedures_and_Policies\Downloaded_' + $fileName)
        $checkedAt = (Get-Date).ToString('yyyy-MM-ddTHH:mm:ssK')

        try {
            $response = Invoke-WebRequest -Uri $normalizedUrl -OutFile $tempPath -MaximumRedirection 10 -TimeoutSec 90 -UserAgent $userAgent -PassThru
            if (-not (Test-DownloadedFile -Path $tempPath -Kind $kind)) {
                throw "The downloaded response did not have the expected $kind file signature."
            }
            Move-Item -LiteralPath $tempPath -Destination $destination -Force
            $relative = [IO.Path]::GetRelativePath($dossier.FullName, $destination)
            $item.last_checked = $checkedAt
            $item.verification_status = 'downloaded_and_signature_checked'
            $item.local_copy = $relative
            if (-not ($item.PSObject.Properties.Name -contains 'normalized_url')) {
                $item | Add-Member -NotePropertyName normalized_url -NotePropertyValue $normalizedUrl
            }
            else { $item.normalized_url = $normalizedUrl }
            if (-not ($item.PSObject.Properties.Name -contains 'http_status')) {
                $item | Add-Member -NotePropertyName http_status -NotePropertyValue ([int]$response.StatusCode)
            }
            else { $item.http_status = [int]$response.StatusCode }
            $log.Add([ordered]@{
                dossier = $dossier.Name
                url = $normalizedUrl
                status = 'downloaded'
                destination = $destination
                size_bytes = (Get-Item -LiteralPath $destination).Length
                sha256 = (Get-FileHash -LiteralPath $destination -Algorithm SHA256).Hash.ToLowerInvariant()
            })
        }
        catch {
            if (Test-Path -LiteralPath $tempPath -PathType Leaf) {
                Remove-Item -LiteralPath $tempPath -Force
            }
            $item.last_checked = $checkedAt
            $item.verification_status = 'download_failed'
            if (-not ($item.PSObject.Properties.Name -contains 'download_error')) {
                $item | Add-Member -NotePropertyName download_error -NotePropertyValue $_.Exception.Message
            }
            else { $item.download_error = $_.Exception.Message }
            $log.Add([ordered]@{
                dossier = $dossier.Name
                url = $normalizedUrl
                status = 'failed'
                error = $_.Exception.Message
            })
        }
    }
    Write-JsonFile -Object @($items) -Path $manifestPath
}

$leruTarget = Join-Path $workspaceResolved '00_Shared_LERU_and_Methods\02_LERU_Documents'
Ensure-Directory -Path $leruTarget
$leruSources = @(
    [ordered]@{ url = 'https://www.leru.org/files/LERU10LOWRES_final.pdf'; file = 'LERU_The_First_Decade_2002-2012.pdf'; role = 'history' },
    [ordered]@{ url = 'https://www.leru.org/files/Towards-a-Research-Integrity-Culture-at-Universities-full-paper.pdf'; file = 'LERU_Towards_a_Research_Integrity_Culture_2020.pdf'; role = 'research_integrity_policy' },
    [ordered]@{ url = 'https://www.leru.org/files/Publications/Communicating-with-intergrity_LERU-paper.pdf'; file = 'LERU_Communicating_with_Integrity_2024.pdf'; role = 'research_integrity_policy' },
    [ordered]@{ url = 'https://www.leru.org/files/Publications/LERU_PositionPaper_Framework-for-the-Assessment-of-Researchers.pdf'; file = 'LERU_Pathway_Towards_a_Multidimensional_Academic_Career_Framework_2022.pdf'; role = 'related_policy' },
    [ordered]@{ url = 'https://www.leru.org/files/Implementing-open-science.pdf'; file = 'LERU_Implementing_Open_Science_2018.pdf'; role = 'related_policy' }
)

foreach ($source in $leruSources) {
    $destination = Join-Path $leruTarget $source.file
    $tempPath = Join-Path $downloadRoot ('leru_' + [Guid]::NewGuid().ToString('N') + '.download')
    try {
        $response = Invoke-WebRequest -Uri $source.url -OutFile $tempPath -MaximumRedirection 10 -TimeoutSec 90 -UserAgent $userAgent -PassThru
        if (-not (Test-DownloadedFile -Path $tempPath -Kind 'pdf')) {
            throw 'The downloaded response did not have a PDF file signature.'
        }
        Move-Item -LiteralPath $tempPath -Destination $destination -Force
        $log.Add([ordered]@{
            dossier = '00_Shared_LERU_and_Methods'
            url = $source.url
            status = 'downloaded'
            role = $source.role
            destination = $destination
            size_bytes = (Get-Item -LiteralPath $destination).Length
            sha256 = (Get-FileHash -LiteralPath $destination -Algorithm SHA256).Hash.ToLowerInvariant()
        })
    }
    catch {
        if (Test-Path -LiteralPath $tempPath -PathType Leaf) {
            Remove-Item -LiteralPath $tempPath -Force
        }
        $log.Add([ordered]@{
            dossier = '00_Shared_LERU_and_Methods'
            url = $source.url
            status = 'failed'
            role = $source.role
            error = $_.Exception.Message
        })
    }
}

Write-JsonFile -Object ([ordered]@{
    generated = (Get-Date).ToString('yyyy-MM-ddTHH:mm:ssK')
    note = 'Automated first-pass archive of direct public PDF/Word links from legacy profiles plus selected official LERU documents. A successful entry passed a file-signature check but still requires substantive/version verification.'
    results = @($log)
}) -Path (Join-Path $workspaceResolved '99_Project_Admin\PUBLIC_SOURCE_DOWNLOAD_LOG.json')

Write-Output ("Public source download pass finished: {0} succeeded, {1} failed." -f @($log | Where-Object { $_.status -eq 'downloaded' }).Count, @($log | Where-Object { $_.status -eq 'failed' }).Count)
