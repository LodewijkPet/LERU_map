[CmdletBinding()]
param(
    [Parameter()]
    [string]$DocumentPath = 'LERU_Research_Integrity_Committees_Comparative_Report_WORKING_DRAFT.docx',

    [Parameter()]
    [string]$DocumentId = 'DOC-LERU-REPORT-0001',

    [Parameter()]
    [string]$SnapshotDate = '2026-08-20',

    [Parameter()]
    [string]$Actor = 'Codex, on instruction of Lodewijk Pet',

    [Parameter()]
    [string]$ChangeReason = 'Initial implementation of A-to-Z plan point D',

    [Parameter()]
    [string]$RegisterVersion = '0.1'
)

Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'

$script:WNamespace = 'http://schemas.openxmlformats.org/wordprocessingml/2006/main'
$script:W14Namespace = 'http://schemas.microsoft.com/office/word/2010/wordml'
$script:Utf8NoBom = [System.Text.UTF8Encoding]::new($false)

function Get-RepositoryRoot {
    $candidate = [System.IO.Path]::GetFullPath((Join-Path $PSScriptRoot '..\..'))
    if (-not (Test-Path -LiteralPath (Join-Path $candidate 'A_TOT_Z_UITVOERINGSPLAN_LERU_RAPPORT.md') -PathType Leaf)) {
        throw "Repository root could not be validated: $candidate"
    }
    return $candidate
}

function Get-NormalizedText {
    param([AllowNull()][string]$Text)

    if ([string]::IsNullOrWhiteSpace($Text)) {
        return ''
    }
    return ([System.Text.RegularExpressions.Regex]::Replace($Text.Trim(), '\s+', ' '))
}

function Get-TextSha256 {
    param([AllowNull()][string]$Text)

    $normalized = Get-NormalizedText -Text $Text
    $bytes = $script:Utf8NoBom.GetBytes($normalized)
    $sha = [System.Security.Cryptography.SHA256]::Create()
    try {
        return ([System.BitConverter]::ToString($sha.ComputeHash($bytes))).Replace('-', '').ToLowerInvariant()
    }
    finally {
        $sha.Dispose()
    }
}

function ConvertTo-HtmlText {
    param([AllowNull()][object]$Value)

    if ($null -eq $Value) {
        return ''
    }
    if ($Value -is [datetimeoffset]) {
        return [System.Net.WebUtility]::HtmlEncode($Value.ToString('yyyy-MM-ddTHH:mm:sszzz'))
    }
    if ($Value -is [datetime]) {
        return [System.Net.WebUtility]::HtmlEncode($Value.ToString('yyyy-MM-ddTHH:mm:ssK'))
    }
    return [System.Net.WebUtility]::HtmlEncode([string]$Value)
}

function ConvertTo-JsonLine {
    param([Parameter(Mandatory)][object]$InputObject)

    return ($InputObject | ConvertTo-Json -Depth 20 -Compress)
}

function Read-JsonLines {
    param([Parameter(Mandatory)][string]$Path)

    if (-not (Test-Path -LiteralPath $Path -PathType Leaf)) {
        return @()
    }

    $rows = @()
    foreach ($line in [System.IO.File]::ReadAllLines($Path, $script:Utf8NoBom)) {
        if (-not [string]::IsNullOrWhiteSpace($line)) {
            $rows += ($line | ConvertFrom-Json)
        }
    }
    return @($rows)
}

function Write-JsonLines {
    param(
        [Parameter(Mandatory)][string]$Path,
        [Parameter()][object[]]$Rows = @()
    )

    $parent = Split-Path -Parent $Path
    if (-not (Test-Path -LiteralPath $parent -PathType Container)) {
        [System.IO.Directory]::CreateDirectory($parent) | Out-Null
    }
    $lines = @($Rows | ForEach-Object { ConvertTo-JsonLine -InputObject $_ })
    [System.IO.File]::WriteAllLines($Path, $lines, $script:Utf8NoBom)
}

function Write-JsonFile {
    param(
        [Parameter(Mandatory)][string]$Path,
        [Parameter(Mandatory)][object]$Value
    )

    $parent = Split-Path -Parent $Path
    if (-not (Test-Path -LiteralPath $parent -PathType Container)) {
        [System.IO.Directory]::CreateDirectory($parent) | Out-Null
    }
    $json = $Value | ConvertTo-Json -Depth 30
    [System.IO.File]::WriteAllText($Path, $json + [Environment]::NewLine, $script:Utf8NoBom)
}

function Read-ZipXml {
    param(
        [Parameter(Mandatory)][System.IO.Compression.ZipArchive]$Archive,
        [Parameter(Mandatory)][string]$EntryName
    )

    $entry = $Archive.GetEntry($EntryName)
    if ($null -eq $entry) {
        return $null
    }
    $reader = [System.IO.StreamReader]::new($entry.Open())
    try {
        [xml]$xml = $reader.ReadToEnd()
        return ,$xml
    }
    finally {
        $reader.Dispose()
    }
}

function New-WordNamespaceManager {
    param([Parameter(Mandatory)][xml]$Xml)

    $manager = [System.Xml.XmlNamespaceManager]::new($Xml.NameTable)
    $manager.AddNamespace('w', $script:WNamespace)
    $manager.AddNamespace('w14', $script:W14Namespace)
    return ,$manager
}

function Get-WordNodeText {
    param(
        [Parameter(Mandatory)][System.Xml.XmlNode]$Node,
        [Parameter(Mandatory)][System.Xml.XmlNamespaceManager]$NamespaceManager,
        [switch]$SeparateParagraphs
    )

    if ($SeparateParagraphs) {
        $parts = @()
        foreach ($paragraph in $Node.SelectNodes('.//w:p', $NamespaceManager)) {
            $part = (($paragraph.SelectNodes('.//w:t', $NamespaceManager) | ForEach-Object { $_.InnerText }) -join '')
            if (-not [string]::IsNullOrWhiteSpace($part)) {
                $parts += $part.Trim()
            }
        }
        return ($parts -join "`n")
    }
    return (($Node.SelectNodes('.//w:t', $NamespaceManager) | ForEach-Object { $_.InnerText }) -join '')
}

function Get-ParagraphStyle {
    param(
        [Parameter(Mandatory)][System.Xml.XmlNode]$Paragraph,
        [Parameter(Mandatory)][System.Xml.XmlNamespaceManager]$NamespaceManager
    )

    $styleNode = $Paragraph.SelectSingleNode('./w:pPr/w:pStyle', $NamespaceManager)
    if ($null -eq $styleNode) {
        return ''
    }
    return $styleNode.GetAttribute('val', $script:WNamespace)
}

function Get-ParagraphId {
    param(
        [Parameter(Mandatory)][System.Xml.XmlNode]$Paragraph,
        [Parameter(Mandatory)][string]$FallbackSeed
    )

    $paragraphId = $Paragraph.GetAttribute('paraId', $script:W14Namespace)
    if (-not [string]::IsNullOrWhiteSpace($paragraphId)) {
        return $paragraphId.ToUpperInvariant()
    }
    return (Get-TextSha256 -Text $FallbackSeed).Substring(0, 8).ToUpperInvariant()
}

function Get-CurrentSectionPath {
    param([Parameter(Mandatory)][hashtable]$SectionLevels)

    $parts = @()
    foreach ($level in 1..9) {
        if ($SectionLevels.ContainsKey($level) -and -not [string]::IsNullOrWhiteSpace([string]$SectionLevels[$level])) {
            $parts += [string]$SectionLevels[$level]
        }
    }
    if ($parts.Count -eq 0) {
        return 'Front matter'
    }
    return ($parts -join ' > ')
}

function Test-SectionRequiresEvidence {
    param([Parameter(Mandatory)][string]$SectionPath)

    if ($SectionPath -eq 'Front matter') { return $false }
    if ($SectionPath -like 'Document control*') { return $false }
    if ($SectionPath -like 'References and core source framework*') { return $false }
    if ($SectionPath -like 'Appendix *') { return $false }
    return $true
}

function Get-NextId {
    param(
        [Parameter(Mandatory)][string]$Prefix,
        [Parameter(Mandatory)][string]$DateStamp,
        [Parameter(Mandatory)][int]$ExistingCount,
        [Parameter()][int]$Offset = 1
    )

    return ('{0}-{1}-{2:D4}' -f $Prefix, $DateStamp, ($ExistingCount + $Offset))
}

function Get-PropertyValue {
    param(
        [Parameter(Mandatory)][xml]$Xml,
        [Parameter(Mandatory)][string]$XPath,
        [Parameter(Mandatory)][System.Xml.XmlNamespaceManager]$NamespaceManager
    )

    $node = $Xml.SelectSingleNode($XPath, $NamespaceManager)
    if ($null -eq $node) { return $null }
    return $node.InnerText
}

function New-FieldRecord {
    param(
        [Parameter(Mandatory)][string]$FieldId,
        [Parameter(Mandatory)][string]$DocumentId,
        [Parameter(Mandatory)][string]$DocumentVersionId,
        [Parameter(Mandatory)][string]$FieldKind,
        [Parameter(Mandatory)][string]$SectionPath,
        [Parameter(Mandatory)][string]$LocatorType,
        [Parameter(Mandatory)][string]$Locator,
        [AllowNull()][string]$FieldLabel,
        [AllowNull()][string]$Value,
        [Parameter(Mandatory)][string]$Materiality,
        [Parameter(Mandatory)][bool]$RequiresEvidence,
        [AllowNull()][int]$TableNumber,
        [AllowNull()][int]$RowNumber,
        [AllowNull()][int]$ColumnNumber,
        [AllowNull()][string]$Caption,
        [Parameter(Mandatory)][string]$CapturedAt,
        [AllowNull()][string]$SourceDocumentId,
        [AllowNull()][string]$SourcePinpoint,
        [AllowNull()][string]$Notes
    )

    $provenanceStatus = if ($RequiresEvidence) { 'awaiting_source_link' } else { 'not_applicable' }
    if (-not [string]::IsNullOrWhiteSpace($SourceDocumentId)) {
        $provenanceStatus = 'verified_artifact_metadata'
    }

    return [ordered]@{
        field_snapshot_id                  = "$DocumentVersionId::$FieldId"
        field_id                           = $FieldId
        document_id                        = $DocumentId
        document_version_id                = $DocumentVersionId
        field_kind                         = $FieldKind
        section_path                       = $SectionPath
        locator_type                       = $LocatorType
        locator                            = $Locator
        table_number                       = $TableNumber
        row_number                         = $RowNumber
        column_number                      = $ColumnNumber
        caption                            = $Caption
        field_label                        = $FieldLabel
        value_as_snapshot                  = $Value
        value_sha256                       = Get-TextSha256 -Text $Value
        materiality                        = $Materiality
        requires_evidence                  = $RequiresEvidence
        provenance_status                  = $provenanceStatus
        source_document_id                 = $SourceDocumentId
        source_pinpoint                    = $SourcePinpoint
        institutional_validation_reference = $null
        captured_at                        = $CapturedAt
        notes                              = $Notes
    }
}

function Get-DocxInventory {
    param(
        [Parameter(Mandatory)][string]$AbsoluteDocumentPath,
        [Parameter(Mandatory)][string]$DocumentId,
        [Parameter(Mandatory)][string]$DocumentVersionId,
        [Parameter(Mandatory)][string]$CapturedAt,
        [Parameter(Mandatory)][string]$RelativeDocumentPath,
        [Parameter(Mandatory)][string]$RelativeSnapshotPath,
        [Parameter(Mandatory)][string]$FileSha256
    )

    Add-Type -AssemblyName System.IO.Compression.FileSystem
    $archive = [System.IO.Compression.ZipFile]::OpenRead($AbsoluteDocumentPath)
    try {
        $coreXml = Read-ZipXml -Archive $archive -EntryName 'docProps/core.xml'
        $appXml = Read-ZipXml -Archive $archive -EntryName 'docProps/app.xml'
        $documentXml = Read-ZipXml -Archive $archive -EntryName 'word/document.xml'
        if ($null -eq $documentXml) {
            throw 'word/document.xml is missing from the DOCX package.'
        }

        $coreNs = [System.Xml.XmlNamespaceManager]::new($coreXml.NameTable)
        $coreNs.AddNamespace('cp', 'http://schemas.openxmlformats.org/package/2006/metadata/core-properties')
        $coreNs.AddNamespace('dc', 'http://purl.org/dc/elements/1.1/')
        $coreNs.AddNamespace('dcterms', 'http://purl.org/dc/terms/')
        $appNs = [System.Xml.XmlNamespaceManager]::new($appXml.NameTable)
        $appNs.AddNamespace('ep', 'http://schemas.openxmlformats.org/officeDocument/2006/extended-properties')
        $wordNs = New-WordNamespaceManager -Xml $documentXml

        $coreTitle = Get-PropertyValue -Xml $coreXml -XPath '//dc:title' -NamespaceManager $coreNs
        $coreSubject = Get-PropertyValue -Xml $coreXml -XPath '//dc:subject' -NamespaceManager $coreNs
        $coreCreator = Get-PropertyValue -Xml $coreXml -XPath '//dc:creator' -NamespaceManager $coreNs
        $coreDescription = Get-PropertyValue -Xml $coreXml -XPath '//dc:description' -NamespaceManager $coreNs
        $coreCreated = Get-PropertyValue -Xml $coreXml -XPath '//dcterms:created' -NamespaceManager $coreNs
        $coreModified = Get-PropertyValue -Xml $coreXml -XPath '//dcterms:modified' -NamespaceManager $coreNs
        $pageCount = Get-PropertyValue -Xml $appXml -XPath '//ep:Pages' -NamespaceManager $appNs
        $wordCount = Get-PropertyValue -Xml $appXml -XPath '//ep:Words' -NamespaceManager $appNs
        $characterCount = Get-PropertyValue -Xml $appXml -XPath '//ep:Characters' -NamespaceManager $appNs

        $tables = $documentXml.SelectNodes('//w:body/w:tbl', $wordNs)
        $documentControl = [ordered]@{}
        foreach ($table in $tables) {
            $rows = $table.SelectNodes('./w:tr', $wordNs)
            if ($rows.Count -lt 1) { continue }
            $firstCells = $rows[0].SelectNodes('./w:tc', $wordNs)
            if ($firstCells.Count -lt 1) { continue }
            $firstValue = Get-NormalizedText -Text (Get-WordNodeText -Node $firstCells[0] -NamespaceManager $wordNs -SeparateParagraphs)
            if ($firstValue -ne 'Document') { continue }
            foreach ($row in $rows) {
                $cells = $row.SelectNodes('./w:tc', $wordNs)
                if ($cells.Count -lt 2) { continue }
                $key = Get-NormalizedText -Text (Get-WordNodeText -Node $cells[0] -NamespaceManager $wordNs -SeparateParagraphs)
                $value = Get-NormalizedText -Text (Get-WordNodeText -Node $cells[1] -NamespaceManager $wordNs -SeparateParagraphs)
                if (-not [string]::IsNullOrWhiteSpace($key)) {
                    $documentControl[$key] = $value
                }
            }
            break
        }

        $versionLabel = if ($documentControl.Contains('Version and date')) { [string]$documentControl['Version and date'] } else { 'Unlabelled working version' }
        $title = if ($documentControl.Contains('Document')) { [string]$documentControl['Document'] } else { $coreTitle }

        $metadata = [ordered]@{
            title             = $title
            core_title        = $coreTitle
            subject           = $coreSubject
            creator           = $coreCreator
            description       = $coreDescription
            version_label     = $versionLabel
            created_at        = $coreCreated
            modified_at       = $coreModified
            page_count        = if ($pageCount) { [int]$pageCount } else { $null }
            word_count        = if ($wordCount) { [int]$wordCount } else { $null }
            character_count   = if ($characterCount) { [int]$characterCount } else { $null }
            document_control  = $documentControl
        }

        $fields = [System.Collections.Generic.List[object]]::new()
        $metadataValues = [ordered]@{
            'FLD-DOC-ORIGINAL-TITLE' = @('original_title', $title, 'docProps/core.xml and document-control table')
            'FLD-DOC-ENGLISH-TITLE'  = @('english_title', $title, 'English-language document title')
            'FLD-DOC-PUBLISHER'      = @('publisher', $coreCreator, 'docProps/core.xml: dc:creator')
            'FLD-DOC-DOCUMENT-TYPE'  = @('document_type', 'working_report', 'Register classification')
            'FLD-DOC-LANGUAGE'       = @('language', 'en', 'Document-level language classification')
            'FLD-DOC-VERSION'        = @('version_label', $versionLabel, 'Document-control table: Version and date')
            'FLD-DOC-PAGE-COUNT'     = @('page_count', [string]$metadata.page_count, 'docProps/app.xml: Pages')
            'FLD-DOC-WORD-COUNT'     = @('word_count', [string]$metadata.word_count, 'docProps/app.xml: Words')
            'FLD-DOC-SHA256'         = @('sha256', $FileSha256, 'File-level SHA-256')
            'FLD-DOC-LOCAL-PATH'     = @('local_path', $RelativeDocumentPath, 'Repository-relative path')
            'FLD-DOC-SNAPSHOT-PATH'  = @('snapshot_path', $RelativeSnapshotPath, 'Immutable snapshot path')
            'FLD-DOC-ACCESS-CLASS'   = @('access_class', 'internal', 'Working-draft confidentiality classification')
        }
        foreach ($entry in $metadataValues.GetEnumerator()) {
            $field = New-FieldRecord -FieldId $entry.Key -DocumentId $DocumentId -DocumentVersionId $DocumentVersionId `
                -FieldKind 'document_metadata' -SectionPath 'Document metadata' -LocatorType 'package_metadata' `
                -Locator $entry.Value[2] -FieldLabel $entry.Value[0] -Value $entry.Value[1] -Materiality 'administrative' `
                -RequiresEvidence $false -TableNumber $null -RowNumber $null -ColumnNumber $null -Caption $null `
                -CapturedAt $CapturedAt -SourceDocumentId $DocumentId -SourcePinpoint $entry.Value[2] `
                -Notes 'Artifact metadata only; this self-link does not support substantive report claims.'
            $fields.Add($field)
        }

        $body = $documentXml.SelectSingleNode('//w:body', $wordNs)
        $sectionLevels = @{}
        $bodyParagraphNumber = 0
        $tableNumber = 0
        $pendingCaption = $null
        $lastNonEmptyWasCaption = $false

        foreach ($block in $body.ChildNodes) {
            if ($block.LocalName -eq 'p') {
                $bodyParagraphNumber++
                $text = Get-NormalizedText -Text (Get-WordNodeText -Node $block -NamespaceManager $wordNs)
                if ([string]::IsNullOrWhiteSpace($text)) {
                    $lastNonEmptyWasCaption = $false
                    continue
                }
                $style = Get-ParagraphStyle -Paragraph $block -NamespaceManager $wordNs
                $paragraphId = Get-ParagraphId -Paragraph $block -FallbackSeed "body-p-$bodyParagraphNumber-$text"

                $fieldKind = 'narrative_claim'
                $materiality = 'material'
                $requiresEvidence = $true
                $locatorType = 'word_paragraph'
                $caption = $null

                if ($style -match '^Heading([1-9])$') {
                    $level = [int]$Matches[1]
                    $sectionLevels[$level] = $text
                    foreach ($higher in ($sectionLevels.Keys | Where-Object { $_ -gt $level })) {
                        $sectionLevels.Remove($higher)
                    }
                    $fieldKind = 'section_anchor'
                    $materiality = 'structural'
                    $requiresEvidence = $false
                }

                $sectionPath = Get-CurrentSectionPath -SectionLevels $sectionLevels

                if ($style -eq 'Caption') {
                    $fieldKind = 'caption'
                    $materiality = 'structural'
                    $requiresEvidence = $false
                    $pendingCaption = $text
                    $lastNonEmptyWasCaption = $true
                }
                elseif ($style -match '^TOC') {
                    $fieldKind = 'navigation'
                    $materiality = 'structural'
                    $requiresEvidence = $false
                    $lastNonEmptyWasCaption = $false
                }
                elseif ($style -in @('Title', 'Subtitle')) {
                    $fieldKind = 'front_matter'
                    $materiality = 'administrative'
                    $requiresEvidence = $false
                    $lastNonEmptyWasCaption = $false
                }
                elseif ($fieldKind -ne 'section_anchor') {
                    $requiresEvidence = Test-SectionRequiresEvidence -SectionPath $sectionPath
                    if (-not $requiresEvidence) {
                        $materiality = if ($sectionPath -like 'References*') { 'reference' } else { 'methodological_or_administrative' }
                        if ($sectionPath -like 'References*') { $fieldKind = 'source_framework_entry' }
                        elseif ($sectionPath -like 'Appendix *') { $fieldKind = 'appendix_protocol_field' }
                        elseif ($sectionPath -like 'Document control*') { $fieldKind = 'document_control_statement' }
                    }
                    $lastNonEmptyWasCaption = $false
                }
                else {
                    $lastNonEmptyWasCaption = $false
                }

                $note = if ($requiresEvidence) {
                    'Substantive report field awaiting a separate evidence document ID plus pinpoint or an institutional validation reference.'
                }
                else {
                    'Structural, administrative or protocol content; substantive evidence linkage is not required for this field type.'
                }
                $field = New-FieldRecord -FieldId "FLD-ARTICLE-P-$paragraphId" -DocumentId $DocumentId `
                    -DocumentVersionId $DocumentVersionId -FieldKind $fieldKind -SectionPath $sectionPath `
                    -LocatorType $locatorType -Locator "Word paragraph paraId=$paragraphId; body paragraph $bodyParagraphNumber; style=$style" `
                    -FieldLabel $style -Value $text -Materiality $materiality -RequiresEvidence $requiresEvidence `
                    -TableNumber $null -RowNumber $null -ColumnNumber $null -Caption $caption -CapturedAt $CapturedAt `
                    -SourceDocumentId $null -SourcePinpoint $null -Notes $note
                $fields.Add($field)
                continue
            }

            if ($block.LocalName -ne 'tbl') {
                continue
            }

            $tableNumber++
            $captionForTable = if ($lastNonEmptyWasCaption) { $pendingCaption } else { $null }
            $lastNonEmptyWasCaption = $false
            $rows = $block.SelectNodes('./w:tr', $wordNs)
            if ($rows.Count -eq 0) { continue }

            $headerValues = @()
            foreach ($headerCell in $rows[0].SelectNodes('./w:tc', $wordNs)) {
                $headerValues += (Get-NormalizedText -Text (Get-WordNodeText -Node $headerCell -NamespaceManager $wordNs -SeparateParagraphs))
            }

            for ($rowIndex = 0; $rowIndex -lt $rows.Count; $rowIndex++) {
                $cells = $rows[$rowIndex].SelectNodes('./w:tc', $wordNs)
                $rowValues = @()
                foreach ($cell in $cells) {
                    $rowValues += (Get-NormalizedText -Text (Get-WordNodeText -Node $cell -NamespaceManager $wordNs -SeparateParagraphs))
                }
                $rowLabel = if ($rowValues.Count -gt 0) { $rowValues[0] } else { '' }

                for ($columnIndex = 0; $columnIndex -lt $cells.Count; $columnIndex++) {
                    $cell = $cells[$columnIndex]
                    $value = $rowValues[$columnIndex]
                    if ([string]::IsNullOrWhiteSpace($value)) { continue }
                    $firstParagraph = $cell.SelectSingleNode('.//w:p', $wordNs)
                    $paragraphId = if ($null -ne $firstParagraph) {
                        Get-ParagraphId -Paragraph $firstParagraph -FallbackSeed "table-$tableNumber-row-$($rowIndex + 1)-col-$($columnIndex + 1)-$value"
                    }
                    else {
                        (Get-TextSha256 -Text "table-$tableNumber-row-$($rowIndex + 1)-col-$($columnIndex + 1)-$value").Substring(0, 8).ToUpperInvariant()
                    }

                    $sectionPath = Get-CurrentSectionPath -SectionLevels $sectionLevels
                    $fieldKind = 'table_value'
                    $materiality = 'material'
                    $requiresEvidence = Test-SectionRequiresEvidence -SectionPath $sectionPath

                    if ($rowIndex -eq 0 -and $rows.Count -gt 1) {
                        $fieldKind = 'table_header'
                        $materiality = 'structural'
                        $requiresEvidence = $false
                    }
                    elseif ($cells.Count -eq 1) {
                        $fieldKind = 'table_callout'
                    }
                    elseif ($cells.Count -eq 2 -and $columnIndex -eq 0) {
                        $fieldKind = 'table_label'
                        $materiality = 'structural'
                        $requiresEvidence = $false
                    }

                    if (-not (Test-SectionRequiresEvidence -SectionPath $sectionPath)) {
                        $requiresEvidence = $false
                        $materiality = 'methodological_or_administrative'
                    }

                    $fieldLabel = if ($cells.Count -eq 2 -and $columnIndex -eq 1) {
                        $rowLabel
                    }
                    elseif ($rowIndex -gt 0 -and $headerValues.Count -gt $columnIndex) {
                        $headerValues[$columnIndex]
                    }
                    elseif (-not [string]::IsNullOrWhiteSpace($captionForTable)) {
                        $captionForTable
                    }
                    else {
                        "Table $tableNumber cell"
                    }

                    $note = if ($requiresEvidence) {
                        'Substantive report table field awaiting a separate evidence document ID plus pinpoint or an institutional validation reference.'
                    }
                    else {
                        'Structural, administrative or protocol table field.'
                    }
                    $field = New-FieldRecord -FieldId "FLD-ARTICLE-C-$paragraphId" -DocumentId $DocumentId `
                        -DocumentVersionId $DocumentVersionId -FieldKind $fieldKind -SectionPath $sectionPath `
                        -LocatorType 'word_table_cell' -Locator "Table $tableNumber, row $($rowIndex + 1), column $($columnIndex + 1), paraId=$paragraphId" `
                        -FieldLabel $fieldLabel -Value $value -Materiality $materiality -RequiresEvidence $requiresEvidence `
                        -TableNumber $tableNumber -RowNumber ($rowIndex + 1) -ColumnNumber ($columnIndex + 1) `
                        -Caption $captionForTable -CapturedAt $CapturedAt -SourceDocumentId $null -SourcePinpoint $null -Notes $note
                    $fields.Add($field)
                }
            }
        }

        return [ordered]@{
            metadata = $metadata
            fields   = @($fields)
        }
    }
    finally {
        $archive.Dispose()
    }
}

function New-RegisterHtml {
    param(
        [Parameter(Mandatory)][string]$OutputPath,
        [Parameter(Mandatory)][object]$State,
        [Parameter(Mandatory)][object[]]$Documents,
        [Parameter(Mandatory)][object[]]$Versions,
        [Parameter(Mandatory)][object[]]$Fields,
        [Parameter(Mandatory)][AllowEmptyCollection()][object[]]$Links,
        [Parameter(Mandatory)][object[]]$Events,
        [Parameter(Mandatory)][AllowEmptyCollection()][object[]]$Changes
    )

    $documentRows = [System.Text.StringBuilder]::new()
    foreach ($document in $Documents) {
        [void]$documentRows.AppendLine("<tr><td><code>$(ConvertTo-HtmlText $document.document_id)</code></td><td>$(ConvertTo-HtmlText $document.original_title)</td><td>$(ConvertTo-HtmlText $document.document_type)</td><td><span class='badge neutral'>$(ConvertTo-HtmlText $document.access_class)</span></td><td>$(ConvertTo-HtmlText $document.document_role)</td><td>$(ConvertTo-HtmlText $document.notes)</td></tr>")
    }

    $versionRows = [System.Text.StringBuilder]::new()
    foreach ($version in ($Versions | Sort-Object captured_at -Descending)) {
        [void]$versionRows.AppendLine("<tr><td><code>$(ConvertTo-HtmlText $version.document_version_id)</code></td><td>$(ConvertTo-HtmlText $version.version_label)</td><td>$(ConvertTo-HtmlText $version.snapshot_date)</td><td><code class='hash'>$(ConvertTo-HtmlText $version.sha256)</code></td><td>$(ConvertTo-HtmlText $version.page_count)</td><td>$(ConvertTo-HtmlText $version.word_count)</td><td>$(ConvertTo-HtmlText $version.snapshot_path)</td></tr>")
    }

    $fieldRows = [System.Text.StringBuilder]::new()
    foreach ($field in $Fields) {
        $statusClass = if ($field.provenance_status -like 'verified*') { 'ok' } elseif ($field.provenance_status -eq 'awaiting_source_link') { 'warn' } else { 'neutral' }
        $source = if ([string]::IsNullOrWhiteSpace([string]$field.source_document_id)) { '—' } else { [string]$field.source_document_id }
        $pinpoint = if ([string]::IsNullOrWhiteSpace([string]$field.source_pinpoint)) { '—' } else { [string]$field.source_pinpoint }
        $search = ("$($field.field_id) $($field.field_kind) $($field.section_path) $($field.locator) $($field.field_label) $($field.value_as_snapshot) $($field.provenance_status) $source $pinpoint").ToLowerInvariant()
        [void]$fieldRows.AppendLine("<tr data-evidence='$(ConvertTo-HtmlText $field.provenance_status)' data-kind='$(ConvertTo-HtmlText $field.field_kind)' data-search='$(ConvertTo-HtmlText $search)'><td><code>$(ConvertTo-HtmlText $field.field_id)</code></td><td>$(ConvertTo-HtmlText $field.field_kind)</td><td>$(ConvertTo-HtmlText $field.section_path)</td><td>$(ConvertTo-HtmlText $field.locator)</td><td><strong>$(ConvertTo-HtmlText $field.field_label)</strong><div class='value'>$(ConvertTo-HtmlText $field.value_as_snapshot)</div></td><td><span class='badge $statusClass'>$(ConvertTo-HtmlText $field.provenance_status)</span></td><td><code>$(ConvertTo-HtmlText $source)</code></td><td>$(ConvertTo-HtmlText $pinpoint)</td></tr>")
    }

    $eventRows = [System.Text.StringBuilder]::new()
    foreach ($event in ($Events | Sort-Object detected_at -Descending)) {
        [void]$eventRows.AppendLine("<tr><td><code>$(ConvertTo-HtmlText $event.event_id)</code></td><td>$(ConvertTo-HtmlText $event.detected_at)</td><td>$(ConvertTo-HtmlText $event.event_type)</td><td>$(ConvertTo-HtmlText $event.old_version_id)</td><td>$(ConvertTo-HtmlText $event.new_version_id)</td><td>$(ConvertTo-HtmlText $event.changed_field_count)</td><td>$(ConvertTo-HtmlText $event.actor)</td><td>$(ConvertTo-HtmlText $event.change_reason)</td></tr>")
    }

    $changeRows = [System.Text.StringBuilder]::new()
    foreach ($change in ($Changes | Sort-Object detected_at -Descending)) {
        [void]$changeRows.AppendLine("<tr><td><code>$(ConvertTo-HtmlText $change.change_id)</code></td><td><code>$(ConvertTo-HtmlText $change.field_id)</code></td><td>$(ConvertTo-HtmlText $change.change_type)</td><td>$(ConvertTo-HtmlText $change.old_value)</td><td>$(ConvertTo-HtmlText $change.new_value)</td><td><span class='badge warn'>$(ConvertTo-HtmlText $change.review_status)</span></td><td>$(ConvertTo-HtmlText $change.decision)</td></tr>")
    }

    $gateClass = if ($State.gate_d_status -eq 'complete') { 'ok' } else { 'warn' }
    $coveragePct = if ($State.material_fields_requiring_evidence -gt 0) { [math]::Round((100 * $State.material_fields_with_verified_link / $State.material_fields_requiring_evidence), 1) } else { 100 }
    $linkMessage = if ($Links.Count -eq 0) {
        '<div class="empty">Er zijn nog geen afzonderlijke bron- of validatiekoppelingen opgenomen. Dit is bewust zichtbaar: het huidige artikel is een output en geen bron voor zijn eigen claims.</div>'
    }
    else {
        "<p>$($Links.Count) claim–bewijs-koppelingen zijn geregistreerd.</p>"
    }

    $html = @"
<!doctype html>
<html lang="nl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>LERU document- en veldprovenanceregister v$($State.register_version)</title>
<style>
:root{--ink:#132238;--muted:#5f6f82;--line:#dbe3ea;--paper:#fff;--bg:#f3f7f9;--navy:#153c5b;--teal:#008c95;--teal2:#dff4f3;--amber:#a65a00;--amberbg:#fff1d6;--green:#116b4b;--greenbg:#e0f4ea;--red:#9a3412;--redbg:#ffebe5}*{box-sizing:border-box}body{margin:0;background:var(--bg);color:var(--ink);font:14px/1.5 Aptos,Segoe UI,Arial,sans-serif}.shell{max-width:1500px;margin:auto;padding:28px}.hero{background:linear-gradient(135deg,var(--navy),#1d6073 62%,var(--teal));color:#fff;border-radius:18px;padding:30px 34px;box-shadow:0 12px 34px #173a4a26}.eyebrow{text-transform:uppercase;letter-spacing:.12em;font-size:12px;font-weight:700;opacity:.8}.hero h1{font-size:30px;line-height:1.15;margin:8px 0 10px}.hero p{max-width:920px;margin:0;opacity:.9}.meta{display:flex;gap:12px;flex-wrap:wrap;margin-top:18px}.meta span{background:#ffffff19;border:1px solid #ffffff35;border-radius:999px;padding:6px 11px}.cards{display:grid;grid-template-columns:repeat(5,minmax(150px,1fr));gap:14px;margin:18px 0}.card{background:var(--paper);border:1px solid var(--line);border-radius:14px;padding:17px 18px;box-shadow:0 4px 16px #1a32451a}.card .label{color:var(--muted);font-size:12px;text-transform:uppercase;letter-spacing:.06em}.card .number{font-size:27px;font-weight:750;margin-top:3px}.card .sub{color:var(--muted);font-size:12px}.panel{background:var(--paper);border:1px solid var(--line);border-radius:14px;margin:16px 0;box-shadow:0 4px 16px #1a324512;overflow:hidden}.panel h2{font-size:18px;margin:0;padding:18px 20px;border-bottom:1px solid var(--line);background:#f9fbfc}.panel .body{padding:18px 20px}.gate{display:grid;grid-template-columns:auto 1fr;gap:14px;align-items:start;padding:16px;border-radius:12px;background:var(--amberbg);border:1px solid #f0c66f}.gate strong{font-size:15px}.badge{display:inline-block;border-radius:999px;padding:3px 8px;font-size:11px;font-weight:700;white-space:nowrap}.badge.ok{background:var(--greenbg);color:var(--green)}.badge.warn{background:var(--amberbg);color:var(--amber)}.badge.neutral{background:#eaf0f4;color:#40556a}.progress{height:10px;background:#e7edf1;border-radius:99px;overflow:hidden;margin-top:8px}.progress span{display:block;height:100%;background:var(--teal);width:$coveragePct%}.toolbar{display:flex;gap:10px;flex-wrap:wrap;padding:14px 20px;border-bottom:1px solid var(--line);background:#f8fafb}.toolbar input,.toolbar select{border:1px solid #bfcbd5;border-radius:8px;padding:9px 10px;background:#fff;min-width:220px}table{width:100%;border-collapse:separate;border-spacing:0}th{position:sticky;top:0;background:#eaf2f5;color:#28465a;text-align:left;font-size:12px;letter-spacing:.03em;padding:10px;border-bottom:1px solid #bfcbd5;z-index:1}td{vertical-align:top;padding:10px;border-bottom:1px solid #edf1f4;max-width:400px}tbody tr:hover{background:#f7fbfc}.tablewrap{overflow:auto;max-height:680px}code{font:12px/1.4 Consolas,monospace;color:#244c62}.hash{word-break:break-all}.value{color:#44586b;margin-top:4px;max-height:7.2em;overflow:auto}.empty{padding:18px;border:1px dashed #b8c5ce;border-radius:10px;color:var(--muted);background:#f8fafb}details{border-top:1px solid var(--line)}summary{cursor:pointer;padding:15px 20px;font-weight:700}details .detailbody{padding:0 20px 18px;color:#43566a}.footer{color:var(--muted);font-size:12px;padding:14px 2px 40px}.hidden{display:none!important}@media(max-width:1000px){.cards{grid-template-columns:repeat(2,1fr)}.shell{padding:14px}.hero{padding:24px}}@media print{body{background:#fff}.shell{max-width:none;padding:0}.hero{box-shadow:none}.panel,.card{box-shadow:none}.toolbar{display:none}.tablewrap{max-height:none;overflow:visible}th{position:static}}
</style>
</head>
<body><main class="shell">
<section class="hero"><div class="eyebrow">A-tot-Z-plan · punt D</div><h1>Document- en veldprovenanceregister</h1><p>Versiebeheer, veldvingerafdrukken, claim–bewijs-koppelingen en wijzigingshistorie voor het LERU-rapport. De beginsituatie bevat uitsluitend het huidige Word-artikel.</p><div class="meta"><span>Register v$($State.register_version)</span><span>Snapshot $($State.snapshot_date)</span><span>Laatste versie: $($State.latest_document_version_id)</span><span>Gegenereerd $($State.generated_at)</span></div></section>
<section class="cards"><div class="card"><div class="label">Documenten</div><div class="number">$($State.document_count)</div><div class="sub">één stabiele documentidentiteit</div></div><div class="card"><div class="label">Versies</div><div class="number">$($State.version_count)</div><div class="sub">onveranderlijke snapshots</div></div><div class="card"><div class="label">Veldsnapshots</div><div class="number">$($State.field_snapshot_count)</div><div class="sub">met stabiele Word-ankers</div></div><div class="card"><div class="label">Materiële velden</div><div class="number">$($State.material_fields_requiring_evidence)</div><div class="sub">vereisen bron of validatie</div></div><div class="card"><div class="label">Geverifieerd gekoppeld</div><div class="number">$($State.material_fields_with_verified_link)</div><div class="sub">$coveragePct% dekking</div></div></section>
<section class="panel"><h2>Status van Gate D</h2><div class="body"><div class="gate"><span class="badge $gateClass">$(ConvertTo-HtmlText $State.gate_d_status)</span><div><strong>De registerinfrastructuur en de beginsnapshot zijn gereed; de inhoudelijke claimkoppeling staat nog open.</strong><div>Definition of done: geen materiële rapportclaim zonder bron-ID plus pinpoint of institutionele validatiereferentie. Op dit moment zijn $($State.material_fields_with_verified_link) van $($State.material_fields_requiring_evidence) materiële velden aantoonbaar gekoppeld.</div><div class="progress"><span></span></div></div></div></div></section>
<section class="panel"><h2>Documentregister</h2><div class="tablewrap"><table><thead><tr><th>Document-ID</th><th>Titel</th><th>Type</th><th>Toegang</th><th>Rol</th><th>Notitie</th></tr></thead><tbody>$documentRows</tbody></table></div></section>
<section class="panel"><h2>Versies en snapshots</h2><div class="tablewrap"><table><thead><tr><th>Versie-ID</th><th>Versielabel</th><th>Snapshotdatum</th><th>SHA-256</th><th>Pagina's</th><th>Woorden</th><th>Snapshotpad</th></tr></thead><tbody>$versionRows</tbody></table></div></section>
<section class="panel"><h2>Veldniveau-inventaris</h2><div class="toolbar"><input id="search" type="search" placeholder="Zoek veld, sectie, waarde of ID"><select id="evidenceFilter"><option value="">Alle provenance-statussen</option><option value="awaiting_source_link">awaiting_source_link</option><option value="verified_artifact_metadata">verified_artifact_metadata</option><option value="not_applicable">not_applicable</option></select><select id="kindFilter"><option value="">Alle veldtypen</option></select><span id="visibleCount"></span></div><div class="tablewrap"><table id="fields"><thead><tr><th>Veld-ID</th><th>Type</th><th>Sectie</th><th>Pinpoint in artikel</th><th>Veld en momentopname</th><th>Provenance</th><th>Bron-ID</th><th>Bronpinpoint</th></tr></thead><tbody>$fieldRows</tbody></table></div></section>
<section class="panel"><h2>Claim–bewijs-koppelingen</h2><div class="body">$linkMessage</div><details open><summary>Koppelcontract</summary><div class="detailbody">Iedere toekomstige koppeling bevat minimaal een stabiel field_id, source_document_id, document_version_id, source_pinpoint, support_role, evidence_status, beoordelaar en datum. Institutionele validatie krijgt een afzonderlijke validation_reference en wordt niet als publieke bron voorgesteld.</div></details></section>
<section class="panel"><h2>Wijzigingsgebeurtenissen</h2><div class="tablewrap"><table><thead><tr><th>Event-ID</th><th>Datum/tijd</th><th>Type</th><th>Vorige versie</th><th>Nieuwe versie</th><th>Gewijzigde velden</th><th>Actor</th><th>Reden</th></tr></thead><tbody>$eventRows</tbody></table></div></section>
<section class="panel"><h2>Veldwijzigingen</h2><div class="tablewrap"><table><thead><tr><th>Change-ID</th><th>Veld-ID</th><th>Type</th><th>Oude waarde</th><th>Nieuwe waarde</th><th>Review</th><th>Besluit</th></tr></thead><tbody>$changeRows</tbody></table></div></section>
<section class="panel"><h2>Werkregels</h2><div class="body"><ol><li>Overschrijf nooit een eerdere snapshot of documentversie.</li><li>Een gewijzigde bestandshash maakt altijd een nieuwe version_id.</li><li>Veldwijzigingen worden automatisch op stabiele Word-paraId-ankers vergeleken.</li><li>Het rapport is een output; inhoudelijke claims verwijzen naar afzonderlijke bronversies of institutionele validatie.</li><li>Een verandering krijgt oude waarde, nieuwe waarde, bewijs, besluit, beoordelaar en datum voordat zij als beoordeeld geldt.</li></ol></div></section>
<div class="footer">Lokale, zelfstandige HTML-weergave. Canonieke gegevens staan in de JSONL-bestanden naast dit register; deze pagina is daarvan een afgeleide leesweergave.</div>
</main><script>
const rows=[...document.querySelectorAll('#fields tbody tr')],q=document.getElementById('search'),ef=document.getElementById('evidenceFilter'),kf=document.getElementById('kindFilter'),vc=document.getElementById('visibleCount');[...new Set(rows.map(r=>r.dataset.kind))].sort().forEach(k=>{const o=document.createElement('option');o.value=k;o.textContent=k;kf.appendChild(o)});function filter(){const s=q.value.trim().toLowerCase(),e=ef.value,k=kf.value;let n=0;rows.forEach(r=>{const show=(!s||r.dataset.search.includes(s))&&(!e||r.dataset.evidence===e)&&(!k||r.dataset.kind===k);r.classList.toggle('hidden',!show);if(show)n++});vc.textContent=n+' van '+rows.length+' velden zichtbaar'}[q,ef,kf].forEach(x=>x.addEventListener('input',filter));filter();
</script></body></html>
"@
    [System.IO.File]::WriteAllText($OutputPath, $html, $script:Utf8NoBom)
}

$repositoryRoot = Get-RepositoryRoot
$provenanceRoot = [System.IO.Path]::GetFullPath($PSScriptRoot)
if (-not $provenanceRoot.StartsWith($repositoryRoot, [System.StringComparison]::OrdinalIgnoreCase)) {
    throw "Provenance output root is outside the intended repository: $provenanceRoot"
}

$absoluteDocumentPath = if ([System.IO.Path]::IsPathRooted($DocumentPath)) {
    [System.IO.Path]::GetFullPath($DocumentPath)
}
else {
    [System.IO.Path]::GetFullPath((Join-Path $repositoryRoot $DocumentPath))
}
if (-not (Test-Path -LiteralPath $absoluteDocumentPath -PathType Leaf)) {
    throw "Document not found: $absoluteDocumentPath"
}
if ([System.IO.Path]::GetExtension($absoluteDocumentPath) -ne '.docx') {
    throw 'This register builder currently accepts DOCX input only.'
}

$snapshotDateValue = [datetime]::ParseExact($SnapshotDate, 'yyyy-MM-dd', [System.Globalization.CultureInfo]::InvariantCulture)
$dateStamp = $snapshotDateValue.ToString('yyyyMMdd')
$capturedAt = [datetimeoffset]::Now.ToString('yyyy-MM-ddTHH:mm:sszzz')
$fileInfo = Get-Item -LiteralPath $absoluteDocumentPath
$fileSha256 = (Get-FileHash -LiteralPath $absoluteDocumentPath -Algorithm SHA256).Hash.ToLowerInvariant()
$hashPrefix = $fileSha256.Substring(0, 12).ToUpperInvariant()
$documentVersionId = "VER-$DocumentId-$dateStamp-$hashPrefix"

$snapshotDirectory = Join-Path $provenanceRoot "snapshots\$SnapshotDate\$documentVersionId"
if (-not (Test-Path -LiteralPath $snapshotDirectory -PathType Container)) {
    [System.IO.Directory]::CreateDirectory($snapshotDirectory) | Out-Null
}
$snapshotFileName = "LERU_Research_Integrity_Committees_Comparative_Report_working-draft-0.1_snapshot-$SnapshotDate.docx"
$snapshotPath = Join-Path $snapshotDirectory $snapshotFileName
if (Test-Path -LiteralPath $snapshotPath -PathType Leaf) {
    $existingSnapshotHash = (Get-FileHash -LiteralPath $snapshotPath -Algorithm SHA256).Hash.ToLowerInvariant()
    if ($existingSnapshotHash -ne $fileSha256) {
        throw "Existing snapshot has a different hash and will not be overwritten: $snapshotPath"
    }
}
else {
    Copy-Item -LiteralPath $absoluteDocumentPath -Destination $snapshotPath
}

$relativeDocumentPath = [System.IO.Path]::GetRelativePath($repositoryRoot, $absoluteDocumentPath).Replace('\', '/')
$relativeSnapshotPath = [System.IO.Path]::GetRelativePath($repositoryRoot, $snapshotPath).Replace('\', '/')
$inventory = Get-DocxInventory -AbsoluteDocumentPath $absoluteDocumentPath -DocumentId $DocumentId `
    -DocumentVersionId $documentVersionId -CapturedAt $capturedAt -RelativeDocumentPath $relativeDocumentPath `
    -RelativeSnapshotPath $relativeSnapshotPath -FileSha256 $fileSha256
$currentFields = @($inventory.fields)

$documentsPath = Join-Path $provenanceRoot 'documents.jsonl'
$versionsPath = Join-Path $provenanceRoot 'document_versions.jsonl'
$fieldsPath = Join-Path $provenanceRoot 'article_field_snapshots.jsonl'
$linksPath = Join-Path $provenanceRoot 'field_provenance_links.jsonl'
$eventsPath = Join-Path $provenanceRoot 'change_events.jsonl'
$changesPath = Join-Path $provenanceRoot 'field_changes.jsonl'

$documents = @(Read-JsonLines -Path $documentsPath)
$versions = @(Read-JsonLines -Path $versionsPath)
$allFields = @(Read-JsonLines -Path $fieldsPath)
$links = @(Read-JsonLines -Path $linksPath)
$events = @(Read-JsonLines -Path $eventsPath)
$changes = @(Read-JsonLines -Path $changesPath)

if (-not ($documents | Where-Object { $_.document_id -eq $DocumentId })) {
    $documents += [ordered]@{
        document_id          = $DocumentId
        original_title       = $inventory.metadata.title
        english_title        = $inventory.metadata.title
        publisher            = $inventory.metadata.creator
        document_type        = 'working_report'
        language             = 'en'
        document_role        = 'research_output'
        evidence_eligible    = $false
        access_class         = 'internal'
        first_registered_at  = $capturedAt
        notes                = 'Current analytical Word output. It must not be used as evidence for its own substantive claims.'
    }
}

$existingVersion = $versions | Where-Object { $_.document_version_id -eq $documentVersionId } | Select-Object -First 1
$newVersionAdded = $null -eq $existingVersion
$previousVersion = $versions | Where-Object { $_.document_id -eq $DocumentId } | Sort-Object captured_at | Select-Object -Last 1

if ($newVersionAdded) {
    $versions += [ordered]@{
        document_version_id      = $documentVersionId
        document_id              = $DocumentId
        version_label            = $inventory.metadata.version_label
        original_title           = $inventory.metadata.title
        english_title            = $inventory.metadata.title
        publisher                = $inventory.metadata.creator
        document_type            = 'working_report'
        language                 = 'en'
        publication_date         = $null
        effective_from           = $null
        accessed_at              = $capturedAt
        snapshot_date            = $SnapshotDate
        predecessor_version_id   = if ($null -ne $previousVersion) { $previousVersion.document_version_id } else { $null }
        successor_version_id     = $null
        official_url             = $null
        local_path               = $relativeDocumentPath
        snapshot_path            = $relativeSnapshotPath
        sha256                   = $fileSha256
        file_size_bytes          = [int64]$fileInfo.Length
        file_last_modified_at    = $fileInfo.LastWriteTime.ToString('o')
        access_class             = 'internal'
        relevant_pages_sections = 'All 42 pages; section- and field-level anchors are stored separately.'
        supported_data_fields    = 'Research-output fields only; not an evidence source.'
        extraction_status        = 'metadata_and_full_structure_extracted'
        validation_status        = 'snapshot_hash_verified'
        page_count               = $inventory.metadata.page_count
        word_count               = $inventory.metadata.word_count
        character_count          = $inventory.metadata.character_count
        captured_at              = $capturedAt
        captured_by              = $Actor
    }
    $allFields += $currentFields

    $changedFieldCount = 0
    $changeTypeCounts = [ordered]@{ created = 0; modified = 0; deleted = 0 }
    if ($null -ne $previousVersion) {
        $previousFields = @($allFields | Where-Object { $_.document_version_id -eq $previousVersion.document_version_id })
        $oldById = @{}
        foreach ($field in $previousFields) { $oldById[[string]$field.field_id] = $field }
        $newById = @{}
        foreach ($field in $currentFields) { $newById[[string]$field.field_id] = $field }
        $allIds = @($oldById.Keys + $newById.Keys | Sort-Object -Unique)
        $newChangeRows = @()
        foreach ($fieldId in $allIds) {
            $oldField = if ($oldById.ContainsKey($fieldId)) { $oldById[$fieldId] } else { $null }
            $newField = if ($newById.ContainsKey($fieldId)) { $newById[$fieldId] } else { $null }
            $changeType = $null
            if ($null -eq $oldField) { $changeType = 'created' }
            elseif ($null -eq $newField) { $changeType = 'deleted' }
            elseif ($oldField.value_sha256 -ne $newField.value_sha256) { $changeType = 'modified' }
            if ($null -eq $changeType) { continue }
            $changeTypeCounts[$changeType]++
            $changedFieldCount++
            $changeId = Get-NextId -Prefix 'FCH' -DateStamp $dateStamp -ExistingCount $changes.Count -Offset ($newChangeRows.Count + 1)
            $newChangeRows += [ordered]@{
                change_id             = $changeId
                document_id           = $DocumentId
                field_id              = $fieldId
                change_type           = $changeType
                old_document_version  = $previousVersion.document_version_id
                new_document_version  = $documentVersionId
                old_value             = if ($null -ne $oldField) { $oldField.value_as_snapshot } else { $null }
                new_value             = if ($null -ne $newField) { $newField.value_as_snapshot } else { $null }
                old_value_sha256      = if ($null -ne $oldField) { $oldField.value_sha256 } else { $null }
                new_value_sha256      = if ($null -ne $newField) { $newField.value_sha256 } else { $null }
                source_or_evidence    = $null
                change_reason         = $ChangeReason
                actor                 = $Actor
                detected_at           = $capturedAt
                reviewer              = $null
                reviewed_at           = $null
                review_status         = 'pending_review'
                decision              = 'pending'
                decision_notes        = $null
            }
        }
        $changes += $newChangeRows
    }

    $eventId = Get-NextId -Prefix 'EVT' -DateStamp $dateStamp -ExistingCount $events.Count
    $events += [ordered]@{
        event_id            = $eventId
        document_id         = $DocumentId
        detected_at         = $capturedAt
        event_type          = if ($null -eq $previousVersion) { 'initial_snapshot' } else { 'new_document_version' }
        old_version_id      = if ($null -ne $previousVersion) { $previousVersion.document_version_id } else { $null }
        new_version_id      = $documentVersionId
        old_sha256          = if ($null -ne $previousVersion) { $previousVersion.sha256 } else { $null }
        new_sha256          = $fileSha256
        changed_field_count = $changedFieldCount
        fields_created      = $changeTypeCounts.created
        fields_modified     = $changeTypeCounts.modified
        fields_deleted      = $changeTypeCounts.deleted
        actor                = $Actor
        change_reason        = $ChangeReason
        review_status        = if ($null -eq $previousVersion) { 'verified_initial_registration' } else { 'pending_review' }
        reviewer             = if ($null -eq $previousVersion) { $Actor } else { $null }
        reviewed_at          = if ($null -eq $previousVersion) { $capturedAt } else { $null }
        decision             = if ($null -eq $previousVersion) { 'accepted_as_baseline' } else { 'pending' }
    }
}

if (-not (Test-Path -LiteralPath $linksPath -PathType Leaf)) {
    Write-JsonLines -Path $linksPath -Rows @()
}
Write-JsonLines -Path $documentsPath -Rows $documents
Write-JsonLines -Path $versionsPath -Rows $versions
Write-JsonLines -Path $fieldsPath -Rows $allFields
Write-JsonLines -Path $eventsPath -Rows $events
Write-JsonLines -Path $changesPath -Rows $changes

$latestVersion = $versions | Where-Object { $_.document_id -eq $DocumentId } | Sort-Object captured_at | Select-Object -Last 1
$latestFields = @($allFields | Where-Object { $_.document_version_id -eq $latestVersion.document_version_id })
$requiredFields = @($latestFields | Where-Object { $_.requires_evidence -eq $true })
$verifiedLinks = @($links | Where-Object { $_.field_id -in $requiredFields.field_id -and $_.evidence_status -in @('verified_official_public', 'verified_member_confirmation') })
$verifiedFieldCount = @($verifiedLinks | ForEach-Object { $_.field_id } | Sort-Object -Unique).Count

$state = [ordered]@{
    register_version                      = $RegisterVersion
    generated_at                          = $capturedAt
    snapshot_date                         = $SnapshotDate
    document_count                        = @($documents).Count
    version_count                         = @($versions).Count
    latest_document_version_id            = $latestVersion.document_version_id
    latest_document_sha256                = $latestVersion.sha256
    field_snapshot_count                  = @($latestFields).Count
    material_fields_requiring_evidence    = @($requiredFields).Count
    material_fields_with_verified_link    = $verifiedFieldCount
    field_provenance_link_count            = @($links).Count
    unresolved_material_field_count        = @($requiredFields).Count - $verifiedFieldCount
    change_event_count                     = @($events).Count
    field_change_count                     = @($changes).Count
    gate_d_status                          = if (@($requiredFields).Count -eq $verifiedFieldCount) { 'complete' } else { 'open_evidence_linking' }
    register_infrastructure_status         = 'ready'
    canonical_files                        = @('documents.jsonl', 'document_versions.jsonl', 'article_field_snapshots.jsonl', 'field_provenance_links.jsonl', 'change_events.jsonl', 'field_changes.jsonl')
}
Write-JsonFile -Path (Join-Path $provenanceRoot 'register_state.json') -Value $state

$schema = [ordered]@{
    schema_version = '0.1'
    purpose = 'Point-D document/version registration, article-field fingerprinting, claim-evidence linkage and append-only change history.'
    identifier_patterns = [ordered]@{
        document_id = 'DOC-<project>-<role>-<sequence>'
        document_version_id = 'VER-<document_id>-<snapshot_date>-<sha256_prefix>'
        article_field_id = 'FLD-ARTICLE-P-<Word paraId> or FLD-ARTICLE-C-<first cell paraId>'
        event_id = 'EVT-<yyyymmdd>-<sequence>'
        field_change_id = 'FCH-<yyyymmdd>-<sequence>'
    }
    field_provenance_link_required_fields = @('link_id', 'field_id', 'source_document_id', 'source_document_version_id', 'source_pinpoint', 'support_role', 'evidence_status', 'linked_by', 'linked_at', 'reviewer', 'reviewed_at', 'notes')
    supported_evidence_statuses = @('verified_official_public', 'verified_member_confirmation', 'inferred', 'not_found_after_search', 'not_public', 'not_applicable', 'conflicting_sources', 'outdated_source', 'awaiting_validation')
    support_roles = @('primary', 'corroborating', 'scope', 'conflicting', 'superseded', 'institutional_validation')
    change_review_statuses = @('pending_review', 'reviewed', 'accepted', 'rejected', 'superseded')
}
Write-JsonFile -Path (Join-Path $provenanceRoot 'register_schema.json') -Value $schema

$snapshotManifestPath = Join-Path $snapshotDirectory 'snapshot_manifest.json'
if (Test-Path -LiteralPath $snapshotManifestPath -PathType Leaf) {
    $existingSnapshotManifest = Get-Content -Raw -LiteralPath $snapshotManifestPath | ConvertFrom-Json
    if ($existingSnapshotManifest.document_version_id -ne $documentVersionId -or
        $existingSnapshotManifest.sha256 -ne $fileSha256 -or
        $existingSnapshotManifest.snapshot_path -ne $relativeSnapshotPath) {
        throw "Existing snapshot manifest conflicts with the immutable snapshot: $snapshotManifestPath"
    }
}
else {
    $snapshotManifest = [ordered]@{
        snapshot_manifest_version = '0.1'
        snapshot_date = $SnapshotDate
        created_at = $capturedAt
        created_by = $Actor
        document_id = $DocumentId
        document_version_id = $documentVersionId
        version_label = $inventory.metadata.version_label
        original_path = $relativeDocumentPath
        snapshot_path = $relativeSnapshotPath
        sha256 = $fileSha256
        file_size_bytes = [int64]$fileInfo.Length
        page_count = $inventory.metadata.page_count
        word_count = $inventory.metadata.word_count
        field_snapshot_count = @($currentFields).Count
        material_fields_requiring_evidence = @($currentFields | Where-Object { $_.requires_evidence -eq $true }).Count
        immutability_rule = 'If the hash changes, create a new document_version_id and preserve this snapshot.'
    }
    Write-JsonFile -Path $snapshotManifestPath -Value $snapshotManifest
}

$htmlPath = Join-Path $provenanceRoot "LERU_D_document_and_field_provenance_register_v$RegisterVersion`_$SnapshotDate.html"
New-RegisterHtml -OutputPath $htmlPath -State $state -Documents $documents -Versions $versions -Fields $latestFields `
    -Links $links -Events $events -Changes $changes

$integrityFiles = @(
    'documents.jsonl',
    'document_versions.jsonl',
    'article_field_snapshots.jsonl',
    'field_provenance_links.jsonl',
    'change_events.jsonl',
    'field_changes.jsonl',
    'register_state.json',
    'register_schema.json',
    [System.IO.Path]::GetFileName($htmlPath)
)
$integrityRows = @()
foreach ($name in $integrityFiles) {
    $path = Join-Path $provenanceRoot $name
    $item = Get-Item -LiteralPath $path
    $integrityRows += [ordered]@{
        relative_path = [System.IO.Path]::GetRelativePath($repositoryRoot, $path).Replace('\', '/')
        size_bytes = [int64]$item.Length
        sha256 = (Get-FileHash -LiteralPath $path -Algorithm SHA256).Hash.ToLowerInvariant()
    }
}
Write-JsonFile -Path (Join-Path $provenanceRoot 'register_integrity_manifest.json') -Value ([ordered]@{
    manifest_version = '0.1'
    generated_at = $capturedAt
    files = $integrityRows
})

[ordered]@{
    status = 'ok'
    register_version = $RegisterVersion
    document_id = $DocumentId
    document_version_id = $documentVersionId
    new_version_added = $newVersionAdded
    sha256 = $fileSha256
    snapshot_path = $snapshotPath
    html_register_path = $htmlPath
    field_snapshot_count = @($latestFields).Count
    material_fields_requiring_evidence = @($requiredFields).Count
    material_fields_with_verified_link = $verifiedFieldCount
    gate_d_status = $state.gate_d_status
} | ConvertTo-Json -Depth 5
