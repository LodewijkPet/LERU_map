param(
    [Parameter(Mandatory=$true)][string]$DocxPath,
    [Parameter(Mandatory=$true)][string]$PdfPath
)

$ErrorActionPreference = 'Stop'
$resolvedDocx = (Resolve-Path -LiteralPath $DocxPath).Path
$resolvedPdf = [System.IO.Path]::GetFullPath($PdfPath)
$pdfDirectory = Split-Path -Parent $resolvedPdf
New-Item -ItemType Directory -Path $pdfDirectory -Force | Out-Null

$word = $null
$document = $null
try {
    $word = New-Object -ComObject Word.Application
    $word.Visible = $false
    $word.DisplayAlerts = 0
    $document = $word.Documents.Open($resolvedDocx, $false, $false)

    foreach ($toc in $document.TablesOfContents) { $toc.Update() | Out-Null }
    $document.Fields.Update() | Out-Null
    foreach ($section in $document.Sections) {
        foreach ($header in $section.Headers) { if ($header.Exists) { $header.Range.Fields.Update() | Out-Null } }
        foreach ($footer in $section.Footers) { if ($footer.Exists) { $footer.Range.Fields.Update() | Out-Null } }
    }
    $document.Repaginate()
    foreach ($toc in $document.TablesOfContents) { $toc.UpdatePageNumbers() | Out-Null }
    $document.Save()
    $document.ExportAsFixedFormat($resolvedPdf, 17)
    Write-Output "Rendered $resolvedDocx to $resolvedPdf"
}
finally {
    if ($document -ne $null) { $document.Close($false) }
    if ($word -ne $null) { $word.Quit() }
    if ($document -ne $null) { [void][System.Runtime.InteropServices.Marshal]::ReleaseComObject($document) }
    if ($word -ne $null) { [void][System.Runtime.InteropServices.Marshal]::ReleaseComObject($word) }
    [gc]::Collect()
    [gc]::WaitForPendingFinalizers()
}

