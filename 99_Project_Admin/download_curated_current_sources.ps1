param()

$ErrorActionPreference = 'Stop'
$root = Split-Path -Parent $PSScriptRoot
$retrieved = (Get-Date).ToString('o')

$sources = @(
    @{ Dossier='01_BE_KU_Leuven'; Sub='03_Procedures_and_Policies'; File='CURRENT_KU_Leuven_CRI_procedure.pdf'; Kind='pdf'; Role='institutional procedure'; Url='https://research.kuleuven.be/en/integrity-ethics/integrity/procedures/procedures.pdf' },
    @{ Dossier='01_BE_KU_Leuven'; Sub='04_Reports_Statistics_and_Timeline'; File='SNAPSHOT_KU_Leuven_CRI_annual_report_2024.html'; Kind='html'; Role='annual report page'; Url='https://research.kuleuven.be/en/integrity-ethics/integrity/annual-report/jaarverslag_2024' },
    @{ Dossier='03_FI_University_of_Helsinki'; Sub='01_Country_System'; File='CURRENT_Finland_TENK_RI_Guidelines_2023_EN.pdf'; Kind='pdf'; Role='national code and procedure'; Url='https://tenk.fi/sites/default/files/2023-11/RI_Guidelines_2023.pdf' },
    @{ Dossier='03_FI_University_of_Helsinki'; Sub='06_Web_Sources_and_Snapshots'; File='SNAPSHOT_Helsinki_responsible_conduct_of_research.html'; Kind='html'; Role='institutional official page'; Url='https://www.helsinki.fi/en/research/research-integrity/research-ethics/responsible-conduct-research' },
    @{ Dossier='04_FR_Paris_Saclay_University'; Sub='06_Web_Sources_and_Snapshots'; File='SNAPSHOT_Paris_Saclay_Polethis_scientific_integrity.html'; Kind='html'; Role='institutional official page'; Url='https://www.universite-paris-saclay.fr/en/node/44986' },
    @{ Dossier='05_FR_Sorbonne_University'; Sub='06_Web_Sources_and_Snapshots'; File='SNAPSHOT_Sorbonne_scientific_integrity_delegation.html'; Kind='html'; Role='institutional official page'; Url='https://www.sorbonne-universite.fr/en/about-sorbonne-university/confident-responsible-and-open-science/scientific-integrity-delegation' },
    @{ Dossier='05_FR_Sorbonne_University'; Sub='06_Web_Sources_and_Snapshots'; File='SNAPSHOT_Sorbonne_handling_reports.html'; Kind='html'; Role='institutional procedure page'; Url='https://sante.sorbonne-universite.fr/en/handling-reports-concerning-scientific-integrity' },
    @{ Dossier='06_FR_University_of_Strasbourg'; Sub='06_Web_Sources_and_Snapshots'; File='SNAPSHOT_Strasbourg_scientific_integrity_referent.html'; Kind='html'; Role='institutional procedure page'; Url='https://www.unistra.fr/fr/universite/engagements/referents/referent-lintegrite-scientifique' },
    @{ Dossier='07_DE_Heidelberg_University'; Sub='03_Procedures_and_Policies'; File='CURRENT_Heidelberg_rules_good_academic_practice_EN.pdf'; Kind='pdf'; Role='institutional procedure'; Url='https://backend.uni-heidelberg.de/en/documents/rules-for-safeguarding-good-academic-practice-and-handling-academic-misconduct/download' },
    @{ Dossier='08_DE_LMU_Munich'; Sub='03_Procedures_and_Policies'; File='CURRENT_LMU_order_good_scientific_practice_DE.pdf'; Kind='pdf'; Role='institutional procedure'; Url='https://cms-cdn.lmu.de/media/lmu/downloads/die-lmu/beauftragte/richtlinien-der-lmu-muenchen-zur-selbstkontrolle-in-der-wissenschaft.pdf' },
    @{ Dossier='10_IE_Trinity_College_Dublin'; Sub='03_Procedures_and_Policies'; File='CURRENT_Trinity_Good_Research_Practice_1.1_2024.pdf'; Kind='pdf'; Role='institutional policy and procedure'; Url='https://www.tcd.ie/media/tcd/swsp/pdfs/Policy-on-Good-Research-Practice_1.1-2024.pdf' },
    @{ Dossier='13_NL_University_of_Amsterdam'; Sub='03_Procedures_and_Policies'; File='CURRENT_UvA_Academic_Integrity_Complaints_Regulations_EN.pdf'; Kind='pdf'; Role='institutional procedure'; Url='https://www.uva.nl/binaries/content/assets/uva/en/about-the-uva/uva-profile/rules-and-regulations/research/klachtenregeling-wi-engels-2014-2.pdf' },
    @{ Dossier='13_NL_University_of_Amsterdam'; Sub='04_Reports_Statistics_and_Timeline'; File='CURRENT_UvA_CWI_annual_report_2024_NL.pdf'; Kind='pdf'; Role='annual report and caseload'; Url='https://www.uva.nl/binaries/content/assets/uva/nl/onderzoek/wetenschappelijke-integriteit/jaarverslag-cwi-2024.pdf' },
    @{ Dossier='15_ES_University_of_Barcelona'; Sub='03_Procedures_and_Policies'; File='CURRENT_UB_research_integrity_code_multilingual.pdf'; Kind='pdf'; Role='institutional code'; Url='https://www.ub.edu/comissiobioetica/sites/default/files/documents/normativa/codi_dintegritat_en_la_recerca_de_la_universitat_de_barcelona.pdf' },
    @{ Dossier='15_ES_University_of_Barcelona'; Sub='03_Procedures_and_Policies'; File='CURRENT_UB_good_research_practice_code_ES.pdf'; Kind='pdf'; Role='institutional code'; Url='https://www.ub.edu/comissiobioetica/sites/default/files/documents/normativa/codibonespractiques_spa.pdf' },
    @{ Dossier='16_SE_Lund_University'; Sub='03_Procedures_and_Policies'; File='CURRENT_Lund_guidelines_suspected_deviation_2026.pdf'; Kind='pdf'; Role='institutional procedure'; Url='https://www.staff.lu.se/sites/staff.lu.se/files/2026-05/guidelines-for-the-processing-of-matters-relating-to-suspected-deviation-from-good-research-practice.pdf' },
    @{ Dossier='16_SE_Lund_University'; Sub='04_Reports_Statistics_and_Timeline'; File='CURRENT_Lund_board_annual_report_2025.pdf'; Kind='pdf'; Role='annual report and caseload'; Url='https://www.staff.lu.se/sites/staff.lu.se/files/2026-03/Annual%20Report%202025%20%E2%80%93%20Deviations%20from%20Good%20Research%20Practice%20Review%20Board.pdf' },
    @{ Dossier='18_CH_University_of_Geneva'; Sub='03_Procedures_and_Policies'; File='CURRENT_Geneva_integrity_directive_FR.pdf'; Kind='pdf'; Role='institutional directive'; Url='https://responsable.unige.ch/assets/files/DirectivesIntegrite.pdf' },
    @{ Dossier='20_UK_Imperial_College_London'; Sub='03_Procedures_and_Policies'; File='CURRENT_Imperial_Regulation_21_Research_Misconduct_2026.pdf'; Kind='pdf'; Role='institutional procedure'; Url='https://www.imperial.ac.uk/media/imperial-college/administration-and-support-services/secretariat/new-library-may-24/Regulation-21---Research-Misconduct-Policy-and-Procedures.pdf' },
    @{ Dossier='21_UK_University_College_London'; Sub='06_Web_Sources_and_Snapshots'; File='SNAPSHOT_UCL_research_governance.html'; Kind='html'; Role='official index; linked files require SharePoint authentication'; Url='https://www.ucl.ac.uk/about/leadership/governance-and-compliance/research-governance' },
    @{ Dossier='21_UK_University_College_London'; Sub='03_Procedures_and_Policies'; File='CURRENT_UCL_respondent_guidance.pdf'; Kind='pdf'; Role='procedure guidance'; Url='https://www.ucl.ac.uk/governance-compliance/sites/governance_compliance/files/respondent-guidance-note.pdf' },
    @{ Dossier='24_UK_University_of_Oxford'; Sub='06_Web_Sources_and_Snapshots'; File='SNAPSHOT_Oxford_potential_breaches_procedure.html'; Kind='html'; Role='current institutional procedure page'; Url='https://www.ox.ac.uk/research/support/governance-and-committees/research-policies/procedure-for-addressing-potential' },
    @{ Dossier='24_UK_University_of_Oxford'; Sub='03_Procedures_and_Policies'; File='CURRENT_Oxford_investigation_guidance.pdf'; Kind='pdf'; Role='procedure guidance'; Url='https://hr.web.ox.ac.uk/files/guidanceonairinvestigationprocessfinalpdf' }
)

$headers = @{
    'User-Agent' = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) LERU-research-integrity-evidence-archive/1.0'
    'Accept-Language' = 'en-GB,en;q=0.9,nl;q=0.8'
}

$results = foreach ($source in $sources) {
    $directory = Join-Path (Join-Path $root $source.Dossier) $source.Sub
    $destination = Join-Path $directory $source.File
    New-Item -ItemType Directory -Path $directory -Force | Out-Null
    try {
        Invoke-WebRequest -Uri $source.Url -OutFile $destination -Headers $headers -MaximumRedirection 10 -TimeoutSec 90 -UseBasicParsing
        $bytes = [System.IO.File]::ReadAllBytes($destination)
        $valid = if ($source.Kind -eq 'pdf') {
            $bytes.Length -ge 5 -and [System.Text.Encoding]::ASCII.GetString($bytes, 0, 5) -eq '%PDF-'
        } else {
            $text = [System.Text.Encoding]::UTF8.GetString($bytes)
            $bytes.Length -gt 200 -and ($text -match '(?i)<html|<!doctype')
        }
        if (-not $valid) { throw "Downloaded content did not match expected $($source.Kind) signature." }
        $hash = (Get-FileHash -LiteralPath $destination -Algorithm SHA256).Hash.ToLowerInvariant()
        [pscustomobject]@{
            dossier = $source.Dossier; role = $source.Role; url = $source.Url
            retrieved_at = $retrieved; status = 'downloaded_and_signature_checked'
            destination = $destination; size_bytes = $bytes.Length; sha256 = $hash
        }
    } catch {
        if (Test-Path -LiteralPath $destination) { Remove-Item -LiteralPath $destination -Force }
        [pscustomobject]@{
            dossier = $source.Dossier; role = $source.Role; url = $source.Url
            retrieved_at = $retrieved; status = 'failed'; error = $_.Exception.Message
        }
    }
}

$log = [ordered]@{
    generated = $retrieved
    scope_note = 'Curated official-source retrieval after manual verification on 18 August 2026. Signature checks confirm file type, not substantive completeness. HTML snapshots can contain navigation and should be interpreted with their URLs and retrieval date.'
    results = $results
}
$logPath = Join-Path $PSScriptRoot 'CURATED_CURRENT_SOURCE_DOWNLOAD_LOG.json'
$log | ConvertTo-Json -Depth 6 | Set-Content -LiteralPath $logPath -Encoding utf8
$results | Group-Object status | Select-Object Name, Count | Format-Table -AutoSize

