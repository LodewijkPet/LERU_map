param(
    [Parameter(Mandatory = $true)]
    [string]$LegacyRoot,

    [Parameter(Mandatory = $true)]
    [string]$WorkspaceRoot
)

$ErrorActionPreference = 'Stop'

$legacyResolved = [IO.Path]::GetFullPath($LegacyRoot)
$workspaceResolved = [IO.Path]::GetFullPath($WorkspaceRoot)

if (-not (Test-Path -LiteralPath $legacyResolved -PathType Container)) {
    throw "Legacy source directory does not exist: $legacyResolved"
}
if (-not (Test-Path -LiteralPath $workspaceResolved -PathType Container)) {
    throw "Workspace directory does not exist: $workspaceResolved"
}

function Ensure-Directory {
    param([Parameter(Mandatory = $true)][string]$Path)
    if (-not (Test-Path -LiteralPath $Path -PathType Container)) {
        New-Item -ItemType Directory -Path $Path | Out-Null
    }
}

function Copy-SourceFile {
    param(
        [Parameter(Mandatory = $true)][string]$Source,
        [Parameter(Mandatory = $true)][string]$Destination,
        [Parameter(Mandatory = $true)][AllowEmptyCollection()][System.Collections.Generic.List[object]]$Log,
        [string]$Role = 'source'
    )
    if (Test-Path -LiteralPath $Source -PathType Leaf) {
        Ensure-Directory -Path (Split-Path -Parent $Destination)
        Copy-Item -LiteralPath $Source -Destination $Destination -Force
        $Log.Add([ordered]@{
            role = $Role
            source_path = $Source
            destination_path = $Destination
            copied = $true
            size_bytes = (Get-Item -LiteralPath $Destination).Length
            sha256 = (Get-FileHash -LiteralPath $Destination -Algorithm SHA256).Hash.ToLowerInvariant()
        })
    }
    else {
        $Log.Add([ordered]@{
            role = $Role
            source_path = $Source
            destination_path = $Destination
            copied = $false
            missing = $true
        })
    }
}

function Write-JsonFile {
    param(
        [Parameter(Mandatory = $true)][object]$Object,
        [Parameter(Mandatory = $true)][string]$Path,
        [int]$Depth = 20
    )
    Ensure-Directory -Path (Split-Path -Parent $Path)
    $json = $Object | ConvertTo-Json -Depth $Depth
    [IO.File]::WriteAllText($Path, $json + [Environment]::NewLine, [Text.UTF8Encoding]::new($false))
}

$sharedRoot = Join-Path $workspaceResolved '00_Shared_LERU_and_Methods'
$sharedFolders = @(
    '01_Study_Protocol_and_Codebook',
    '02_LERU_Documents',
    '03_Email_and_Meeting_Context_RESTRICTED',
    '04_Cross_Committee_Data',
    '05_Reference_Methods'
)
Ensure-Directory -Path $sharedRoot
foreach ($folder in $sharedFolders) {
    Ensure-Directory -Path (Join-Path $sharedRoot $folder)
}

$sharedLog = [System.Collections.Generic.List[object]]::new()
$sharedCopies = @(
    @('01_Admin\Preparation\European committees draft protocol.docx', '01_Study_Protocol_and_Codebook\European_committees_draft_protocol_2024-11.docx', 'study_protocol'),
    @('90_Archive\Original\research_integrity_systems_codebook.docx', '01_Study_Protocol_and_Codebook\research_integrity_systems_codebook_2025-08-11.docx', 'data_dictionary'),
    @('90_Archive\Original\research_integrity_complaints_schema.json', '01_Study_Protocol_and_Codebook\research_integrity_complaints_schema_2025-08-11.json', 'data_schema'),
    @('90_Archive\Original\2025_04_14_data_collection_overview_v1.0.0.xlsx', '01_Study_Protocol_and_Codebook\data_collection_overview_2025-04-14.xlsx', 'data_collection_overview'),
    @('01_Admin\Documents\Data\Data collection form.docx', '01_Study_Protocol_and_Codebook\data_collection_form_legacy.docx', 'data_collection_form'),
    @('small report\request.txt', '03_Email_and_Meeting_Context_RESTRICTED\original_LERU_request.txt', 'original_request'),
    @('01_Admin\2024_11_21_bijeenkomst_notes_v1.0.0.docx', '03_Email_and_Meeting_Context_RESTRICTED\meeting_notes_2024-11-21.docx', 'meeting_notes'),
    @('01_Admin\2025_01_23_meeting_notes_v1.0.0.docx', '03_Email_and_Meeting_Context_RESTRICTED\meeting_notes_2025-01-23.docx', 'meeting_notes'),
    @('01_Admin\2025_01_24_meeting_notes_v1.0.0.docx', '03_Email_and_Meeting_Context_RESTRICTED\meeting_notes_2025-01-24.docx', 'meeting_notes'),
    @('small report\institutional_positioning_report.txt', '04_Cross_Committee_Data\institutional_positioning_report_2026-01-21.txt', 'cross_case_summary'),
    @('small report\next_steps.txt', '04_Cross_Committee_Data\legacy_next_steps_2026-01-21.txt', 'open_questions'),
    @('04_Outputs\LERU_report\data\institutions.json', '04_Cross_Committee_Data\legacy_aggregate_institutions.json', 'legacy_aggregate'),
    @('PROJECT_OVERVIEW.md', '04_Cross_Committee_Data\legacy_project_overview.md', 'legacy_overview'),
    @('90_Archive\Original\LERU 2025.pptx', '02_LERU_Documents\LERU_2025_legacy_presentation.pptx', 'presentation'),
    @('90_Archive\Original\Kopenhagen 2024.pptx', '02_LERU_Documents\Copenhagen_2024_legacy_presentation.pptx', 'presentation')
)

foreach ($copy in $sharedCopies) {
    Copy-SourceFile -Source (Join-Path $legacyResolved $copy[0]) -Destination (Join-Path $sharedRoot $copy[1]) -Log $sharedLog -Role $copy[2]
}

$institutions = @(
    [ordered]@{ order = 1; folder = '01_BE_KU_Leuven'; iso = 'BE'; country = 'Belgium'; country_file = 'belgium.json'; name = 'KU Leuven'; institution_file = 'ku_leuven.json'; profile_file = 'ku-leuven.txt'; country_research = '3. Belgium vs Austria.docx'; committee_file = $null },
    [ordered]@{ order = 2; folder = '02_DK_University_of_Copenhagen'; iso = 'DK'; country = 'Denmark'; country_file = 'denmark.json'; name = 'University of Copenhagen'; institution_file = 'university_of_copenhagen.json'; profile_file = 'university-of-copenhagen.txt'; country_research = '2. Germany vs Denmark.docx'; committee_file = $null },
    [ordered]@{ order = 3; folder = '03_FI_University_of_Helsinki'; iso = 'FI'; country = 'Finland'; country_file = 'finland.json'; name = 'University of Helsinki'; institution_file = 'university_of_helsinki.json'; profile_file = 'university of helsinki.txt'; country_research = '8. Sweden vs Finland.docx'; committee_file = $null },
    [ordered]@{ order = 4; folder = '04_FR_Paris_Saclay_University'; iso = 'FR'; country = 'France'; country_file = 'france.json'; name = 'Paris-Saclay University'; institution_file = 'paris_saclay_university.json'; profile_file = 'Paris-Saclay University.txt'; country_research = '1. Netherlands vs France.docx'; committee_file = $null },
    [ordered]@{ order = 5; folder = '05_FR_Sorbonne_University'; iso = 'FR'; country = 'France'; country_file = 'france.json'; name = 'Sorbonne University'; institution_file = 'sorbonne_university.json'; profile_file = 'Sorbonne University.txt'; country_research = '1. Netherlands vs France.docx'; committee_file = $null },
    [ordered]@{ order = 6; folder = '06_FR_University_of_Strasbourg'; iso = 'FR'; country = 'France'; country_file = 'france.json'; name = 'University of Strasbourg'; institution_file = 'university_of_strasbourg.json'; profile_file = 'University of Strasbourg.txt'; country_research = '1. Netherlands vs France.docx'; committee_file = $null },
    [ordered]@{ order = 7; folder = '07_DE_Heidelberg_University'; iso = 'DE'; country = 'Germany'; country_file = 'germany.json'; name = 'Heidelberg University'; institution_file = 'heidelberg_university.json'; profile_file = 'Heidelberg University.txt'; country_research = '2. Germany vs Denmark.docx'; committee_file = $null },
    [ordered]@{ order = 8; folder = '08_DE_LMU_Munich'; iso = 'DE'; country = 'Germany'; country_file = 'germany.json'; name = 'LMU Munich'; institution_file = 'lmu_munich.json'; profile_file = 'LMU Munich.txt'; country_research = '2. Germany vs Denmark.docx'; committee_file = $null },
    [ordered]@{ order = 9; folder = '09_DE_University_of_Freiburg'; iso = 'DE'; country = 'Germany'; country_file = 'germany.json'; name = 'University of Freiburg'; institution_file = 'university_of_freiburg.json'; profile_file = 'University of Freiburg.txt'; country_research = '2. Germany vs Denmark.docx'; committee_file = $null },
    [ordered]@{ order = 10; folder = '10_IE_Trinity_College_Dublin'; iso = 'IE'; country = 'Ireland'; country_file = 'ireland.json'; name = 'Trinity College Dublin'; institution_file = 'trinity_college_dublin.json'; profile_file = 'Trinity College Dublin.txt'; country_research = '9. Noorwegen vs Ierland.docx'; committee_file = $null },
    [ordered]@{ order = 11; folder = '11_IT_University_of_Milan'; iso = 'IT'; country = 'Italy'; country_file = 'italy.json'; name = 'University of Milan'; institution_file = 'university_of_milan.json'; profile_file = 'University of Milan.txt'; country_research = '5. Italy vs Spain.docx'; committee_file = $null },
    [ordered]@{ order = 12; folder = '12_NL_Leiden_University'; iso = 'NL'; country = 'Netherlands'; country_file = 'netherlands.json'; name = 'Leiden University'; institution_file = 'leiden_university.json'; profile_file = 'leiden-university.txt'; country_research = '1. Netherlands vs France.docx'; committee_file = 'leiden_university_research_integrity_committee.json' },
    [ordered]@{ order = 13; folder = '13_NL_University_of_Amsterdam'; iso = 'NL'; country = 'Netherlands'; country_file = 'netherlands.json'; name = 'University of Amsterdam'; institution_file = 'university_of_amsterdam.json'; profile_file = 'University of Amsterdam.txt'; country_research = '1. Netherlands vs France.docx'; committee_file = 'university_of_amsterdam_research_integrity_committee.json' },
    [ordered]@{ order = 14; folder = '14_NL_Utrecht_University'; iso = 'NL'; country = 'Netherlands'; country_file = 'netherlands.json'; name = 'Utrecht University'; institution_file = 'utrecht_university.json'; profile_file = 'Utrecht University.txt'; country_research = '1. Netherlands vs France.docx'; committee_file = 'utrecht_university_research_integrity_committee.json' },
    [ordered]@{ order = 15; folder = '15_ES_University_of_Barcelona'; iso = 'ES'; country = 'Spain'; country_file = 'spain.json'; name = 'University of Barcelona'; institution_file = 'university_of_barcelona.json'; profile_file = 'University of Barcelona.txt'; country_research = '5. Italy vs Spain.docx'; committee_file = $null },
    [ordered]@{ order = 16; folder = '16_SE_Lund_University'; iso = 'SE'; country = 'Sweden'; country_file = 'sweden.json'; name = 'Lund University'; institution_file = 'lund_university.json'; profile_file = 'Lund University.txt'; country_research = '8. Sweden vs Finland.docx'; committee_file = $null },
    [ordered]@{ order = 17; folder = '17_CH_ETH_Zurich'; iso = 'CH'; country = 'Switzerland'; country_file = 'switzerland.json'; name = 'ETH Zurich'; institution_file = 'eth_zurich.json'; profile_file = 'ETH Zürich.txt'; country_research = '4. Switzerland vs Luxembourg.docx'; committee_file = $null },
    [ordered]@{ order = 18; folder = '18_CH_University_of_Geneva'; iso = 'CH'; country = 'Switzerland'; country_file = 'switzerland.json'; name = 'University of Geneva'; institution_file = 'university_of_geneva.json'; profile_file = 'University of Geneva.txt'; country_research = '4. Switzerland vs Luxembourg.docx'; committee_file = $null },
    [ordered]@{ order = 19; folder = '19_CH_University_of_Zurich'; iso = 'CH'; country = 'Switzerland'; country_file = 'switzerland.json'; name = 'University of Zurich'; institution_file = 'university_of_zurich.json'; profile_file = 'University of Zurich.txt'; country_research = '4. Switzerland vs Luxembourg.docx'; committee_file = $null },
    [ordered]@{ order = 20; folder = '20_UK_Imperial_College_London'; iso = 'GB'; country = 'United Kingdom'; country_file = 'united_kingdom.json'; name = 'Imperial College London'; institution_file = 'imperial_college_london.json'; profile_file = 'Imperial College London.txt'; country_research = '10. United Kingdom.docx'; committee_file = $null },
    [ordered]@{ order = 21; folder = '21_UK_University_College_London'; iso = 'GB'; country = 'United Kingdom'; country_file = 'united_kingdom.json'; name = 'University College London'; institution_file = 'university_college_london.json'; profile_file = 'University College London.txt'; country_research = '10. United Kingdom.docx'; committee_file = $null },
    [ordered]@{ order = 22; folder = '22_UK_University_of_Cambridge'; iso = 'GB'; country = 'United Kingdom'; country_file = 'united_kingdom.json'; name = 'University of Cambridge'; institution_file = 'university_of_cambridge.json'; profile_file = 'University of Cambridge.txt'; country_research = '10. United Kingdom.docx'; committee_file = $null },
    [ordered]@{ order = 23; folder = '23_UK_University_of_Edinburgh'; iso = 'GB'; country = 'United Kingdom'; country_file = 'united_kingdom.json'; name = 'University of Edinburgh'; institution_file = 'university_of_edinburgh.json'; profile_file = 'University of Edinburgh.txt'; country_research = '10. United Kingdom.docx'; committee_file = $null },
    [ordered]@{ order = 24; folder = '24_UK_University_of_Oxford'; iso = 'GB'; country = 'United Kingdom'; country_file = 'united_kingdom.json'; name = 'University of Oxford'; institution_file = 'university_of_oxford.json'; profile_file = 'University of Oxford.txt'; country_research = '10. United Kingdom.docx'; committee_file = $null }
)

$subfolders = @(
    '00_Dossier_Metadata',
    '01_Country_System',
    '02_Committee_and_Institution',
    '03_Procedures_and_Policies',
    '04_Reports_Statistics_and_Timeline',
    '05_Correspondence_RESTRICTED',
    '06_Web_Sources_and_Snapshots',
    '99_Working_Notes'
)

$sourceIndex = [System.Collections.Generic.List[object]]::new()

foreach ($institution in $institutions) {
    $dossierRoot = Join-Path $workspaceResolved $institution.folder
    Ensure-Directory -Path $dossierRoot
    foreach ($subfolder in $subfolders) {
        Ensure-Directory -Path (Join-Path $dossierRoot $subfolder)
    }

    $copyLog = [System.Collections.Generic.List[object]]::new()

    Copy-SourceFile -Source (Join-Path $legacyResolved ('02_Data\Raw\institutions\' + $institution.institution_file)) -Destination (Join-Path $dossierRoot '00_Dossier_Metadata\institution_record_legacy.json') -Log $copyLog -Role 'institution_record'
    Copy-SourceFile -Source (Join-Path $legacyResolved ('02_Data\Raw\countries\' + $institution.country_file)) -Destination (Join-Path $dossierRoot '01_Country_System\country_record_legacy.json') -Log $copyLog -Role 'country_record'
    Copy-SourceFile -Source (Join-Path $legacyResolved ('small report\' + $institution.profile_file)) -Destination (Join-Path $dossierRoot '02_Committee_and_Institution\institutional_positioning_profile_2026-01-21.txt') -Log $copyLog -Role 'institutional_profile'

    if ($institution.committee_file) {
        Copy-SourceFile -Source (Join-Path $legacyResolved ('02_Data\Raw\committees\' + $institution.committee_file)) -Destination (Join-Path $dossierRoot '02_Committee_and_Institution\committee_record_legacy.json') -Log $copyLog -Role 'committee_record'
    }

    $countryStages = @(
        @('01_Admin\Documents\Data\1. Deep research\', 'country_system_deep_research_initial.docx', 'country_research_initial'),
        @('01_Admin\Documents\Data\2. Structured Deep Research\', 'country_system_structured_research.docx', 'country_research_structured'),
        @('01_Admin\Documents\Data\3. Data capture from Strucutred Deep Research\', 'country_system_data_capture.docx', 'country_research_data_capture')
    )
    foreach ($stage in $countryStages) {
        Copy-SourceFile -Source (Join-Path $legacyResolved ($stage[0] + $institution.country_research)) -Destination (Join-Path $dossierRoot ('01_Country_System\' + $stage[1])) -Log $copyLog -Role $stage[2]
    }

    if ($institution.name -eq 'Leiden University') {
        $leidenSource = Join-Path $legacyResolved '02_Data\documents\leiden-university'
        if (Test-Path -LiteralPath $leidenSource -PathType Container) {
            foreach ($file in Get-ChildItem -LiteralPath $leidenSource -File) {
                Copy-SourceFile -Source $file.FullName -Destination (Join-Path $dossierRoot ('03_Procedures_and_Policies\' + $file.Name)) -Log $copyLog -Role 'policy_document'
            }
        }
    }

    if ($institution.name -eq 'Heidelberg University') {
        $heidelbergSource = Join-Path $legacyResolved '01_Admin\Documents\Received special documents\Germany\Heidelberg Unversity'
        if (Test-Path -LiteralPath $heidelbergSource -PathType Container) {
            foreach ($file in Get-ChildItem -LiteralPath $heidelbergSource -File) {
                Copy-SourceFile -Source $file.FullName -Destination (Join-Path $dossierRoot ('03_Procedures_and_Policies\Received_from_institution_' + $file.Name)) -Log $copyLog -Role 'received_document'
            }
        }
    }

    if ($institution.name -eq 'ETH Zurich') {
        $ethSource = Join-Path $legacyResolved '01_Admin\Documents\Received special documents\Switzerland\ETH Zurich'
        if (Test-Path -LiteralPath $ethSource -PathType Container) {
            foreach ($file in Get-ChildItem -LiteralPath $ethSource -File) {
                $targetSubfolder = if ($file.Extension -ieq '.docx') { '05_Correspondence_RESTRICTED' } else { '03_Procedures_and_Policies' }
                Copy-SourceFile -Source $file.FullName -Destination (Join-Path $dossierRoot ($targetSubfolder + '\Received_from_institution_' + $file.Name)) -Log $copyLog -Role 'received_document'
            }
        }
    }

    $profilePath = Join-Path $legacyResolved ('small report\' + $institution.profile_file)
    $urls = @()
    if (Test-Path -LiteralPath $profilePath -PathType Leaf) {
        $profileText = Get-Content -Raw -LiteralPath $profilePath
        $urls = [regex]::Matches($profileText, 'https?://[^\s\)\]\>]+') |
            ForEach-Object { $_.Value.TrimEnd('.', ',', ';', '"', "'", ':') } |
            Sort-Object -Unique |
            ForEach-Object {
                [ordered]@{
                    url = $_
                    inferred_type = if ($_ -match '(?i)\.pdf(?:$|\?)') { 'pdf' } elseif ($_ -match '(?i)\.docx?(?:$|\?)') { 'word_document' } else { 'webpage' }
                    source = 'legacy institutional positioning profile'
                    last_checked = $null
                    local_copy = $null
                    verification_status = 'not_rechecked'
                }
            }
    }
    Write-JsonFile -Object @($urls) -Path (Join-Path $dossierRoot '06_Web_Sources_and_Snapshots\web_sources_legacy.json')

    $status = [ordered]@{
        institution = $institution.name
        country = $institution.country
        country_iso = $institution.iso
        leru_population_status = 'Included in the 24-member LERU population as of 2026-08-18; verify against the official LERU members page before publication.'
        dossier_created = (Get-Date).ToString('yyyy-MM-ddTHH:mm:ssK')
        evidence_status = if ($institution.name -eq 'Leiden University') { 'partially structured; institutional profile and local documents present' } else { 'legacy institutional profile present; structured institution record largely unpopulated' }
        confidentiality = 'Files under 05_Correspondence_RESTRICTED may contain personal data or non-public correspondence and must not be published without review.'
        copied_source_files = @($copyLog)
        legacy_web_sources = @($urls)
        next_actions = @(
            'Verify the responsible research integrity committee/function and its exact institutional position.',
            'Locate and archive the current governing regulation, complaints procedure, composition/appointment rules, annual reports and case statistics.',
            'Complete the country-system fields and distinguish national, sectoral, institutional and appellate bodies.',
            'Record source-specific evidence, publication/version dates, access dates and confidence.',
            'Use targeted email verification for fields that remain unknown or ambiguous.'
        )
    }
    Write-JsonFile -Object $status -Path (Join-Path $dossierRoot '00_Dossier_Metadata\dossier_status.json')

    $sourceIndex.Add([ordered]@{
        order = $institution.order
        folder = $institution.folder
        institution = $institution.name
        country = $institution.country
        country_iso = $institution.iso
        source_file_count = @($copyLog | Where-Object { $_.copied }).Count
        legacy_url_count = @($urls).Count
        missing_expected_sources = @($copyLog | Where-Object { $_.missing } | ForEach-Object { $_.source_path })
    })
}

Write-JsonFile -Object ([ordered]@{
    generated = (Get-Date).ToString('yyyy-MM-ddTHH:mm:ssK')
    legacy_source_root = $legacyResolved
    workspace_root = $workspaceResolved
    population_size = $institutions.Count
    countries = @($institutions.country | Sort-Object -Unique)
    shared_sources = @($sharedLog)
    commission_dossiers = @($sourceIndex)
}) -Path (Join-Path $workspaceResolved '99_Project_Admin\PROJECT_SOURCE_INDEX.json')

Write-Output ("Created or updated {0} commission dossiers and the shared source area." -f $institutions.Count)
