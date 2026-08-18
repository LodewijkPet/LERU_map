param()

$ErrorActionPreference = 'Stop'
$root = Split-Path -Parent $PSScriptRoot
$generated = (Get-Date).ToString('o')
$sharedMethods = Join-Path $root '00_Shared_LERU_and_Methods\01_Study_Protocol_and_Codebook'
$sharedCross = Join-Path $root '00_Shared_LERU_and_Methods\04_Cross_Committee_Data'
$restricted = Join-Path $root '00_Shared_LERU_and_Methods\03_Email_and_Meeting_Context_RESTRICTED'

New-Item -ItemType Directory -Path $sharedMethods -Force | Out-Null
New-Item -ItemType Directory -Path $sharedCross -Force | Out-Null
New-Item -ItemType Directory -Path $restricted -Force | Out-Null

$dictionary = [ordered]@{
    title = 'LERU Research Integrity Functions — master data dictionary'
    version = '0.1-working-draft'
    generated = $generated
    unit_of_inclusion = 'Official LERU member university'
    unit_of_analysis = 'Primary institutional route for receiving, reviewing, investigating, deciding on, or publishing information about potential breaches of research integrity; multiple nested route actors are permitted.'
    interpretation_rule = 'Not found is not equivalent to absent. Every substantive value must carry field-level provenance and a validation status.'
    controlled_vocabularies = [ordered]@{
        route_type = @('committee','board','commission','office','ombudsperson','scientific-integrity-referent','named-person','reporting-desk','adviser-network','ad-hoc-panel','executive-route','hybrid','other')
        authority_type = @('advisory','investigatory','decision-making','referral','sanctioning','preventive','administrative-support','publication','appeal-or-review')
        evidence_status = @('verified_official_public','verified_member_email','inferred','not_found','not_public','not_applicable','conflicting_sources','awaiting_validation')
        confidentiality = @('public','restricted-project-team','confidential-correspondence','not-for-publication')
        document_category = @('law-or-statutory-framework','national-code-or-guideline','terms-of-reference-or-mandate','appointment-or-composition','complaints-procedure','reporting-form','annual-report-or-statistics','decision-advice-or-case-summary','evaluation-or-monitoring','training-or-prevention','organisation-or-route-page','boundary-regime','correspondence-or-validation','method-or-codebook','other')
        relationship_type = @('reports_to','appoints','advises','investigates_for','decides_after','refers_to','appealed_to','reviewed_by','funded_by','shared_with','collaborates_with','publishes_for','oversees','provides_secretariat_to')
        missingness = @('observed','not_found','not_public','not_applicable','not_yet_searched','conflicting')
    }
    domains = @(
        [ordered]@{ id='01_population_identity'; purpose='Define and audit the study population.'; fields=@(
            @{name='institution_id';type='string';required=$true}, @{name='official_name';type='string';required=$true}, @{name='english_name';type='string'}, @{name='aliases';type='array[string]'}, @{name='country_iso';type='string';required=$true}, @{name='country';type='string';required=$true}, @{name='city';type='string'}, @{name='institution_type';type='string'}, @{name='official_leru_member';type='boolean';required=$true}, @{name='leru_membership_start';type='partial-date'}, @{name='leru_membership_source_document_id';type='string'}, @{name='leru_inte_participation';type='enum[confirmed,unconfirmed,not_applicable]'}, @{name='inte_validation_date';type='date'}, @{name='inclusion_reason';type='string';required=$true}
        )},
        [ordered]@{ id='02_country_system'; purpose='Describe the national system in which the institutional route operates.'; fields=@(
            @{name='system_type';type='string'}, @{name='centralisation';type='enum[centralised,decentralised,hybrid]'}, @{name='legal_basis';type='array[document_id]'}, @{name='norm_hierarchy';type='array[string]'}, @{name='national_codes';type='array[document_id]'}, @{name='national_investigation_bodies';type='array[actor_id]'}, @{name='national_advice_review_or_appeal_bodies';type='array[actor_id]'}, @{name='institutional_autonomy';type='string'}, @{name='funder_role';type='string'}, @{name='academy_or_sector_role';type='string'}, @{name='judicial_routes';type='string'}, @{name='transparency_regime';type='string'}, @{name='interfaces_ethics_privacy_ip_open_science_security';type='array[relationship_id]'}
        )},
        [ordered]@{ id='03_route_governance'; purpose='Represent every committee, office, person or hybrid route involved in case handling.'; repeatable=$true; fields=@(
            @{name='route_id';type='string';required=$true}, @{name='official_name';type='string';required=$true}, @{name='english_name';type='string'}, @{name='route_type';type='controlled'}, @{name='parent_organisational_unit';type='string'}, @{name='institutional_position';type='string'}, @{name='status';type='enum[current,historical,planned,unclear]'}, @{name='established_date';type='partial-date'}, @{name='predecessor_route_ids';type='array[string]'}, @{name='constitutive_basis';type='array[document_id]'}, @{name='mandate';type='string'}, @{name='jurisdiction';type='string'}, @{name='authority_types';type='array[controlled]'}, @{name='permanent_or_ad_hoc';type='enum[permanent,ad-hoc,hybrid]'}, @{name='reporting_line';type='string'}, @{name='decision_maker';type='actor_id'}, @{name='secretariat';type='actor_id'}, @{name='independence_safeguards';type='string'}, @{name='conflict_of_interest_rules';type='string'}, @{name='composition_count';type='integer'}, @{name='composition_roles_and_expertise';type='array[string]'}, @{name='appointment_method';type='string'}, @{name='term_length';type='duration'}
        )},
        [ordered]@{ id='04_procedure'; purpose='Code each version of the applicable case-handling procedure.'; repeatable=$true; fields=@(
            @{name='procedure_id';type='string';required=$true}, @{name='document_id';type='string';required=$true}, @{name='effective_from';type='date'}, @{name='effective_to';type='date'}, @{name='who_can_report';type='string'}, @{name='respondent_scope';type='string'}, @{name='research_scope';type='string'}, @{name='misconduct_definitions';type='array[string]'}, @{name='ffp_qrp_other_categories';type='array[string]'}, @{name='anonymous_reports';type='enum[accepted,conditional,not-accepted,unclear]'}, @{name='confidential_reports';type='string'}, @{name='informal_advice_or_mediation';type='string'}, @{name='intake_channel';type='string'}, @{name='admissibility_criteria';type='array[string]'}, @{name='limitation_period';type='duration-or-string'}, @{name='initial_assessment';type='string'}, @{name='preliminary_inquiry';type='string'}, @{name='formal_investigation';type='string'}, @{name='evidence_standard';type='string'}, @{name='hearing_and_response_rights';type='string'}, @{name='recusal_conflicts';type='string'}, @{name='time_limits_by_stage';type='array[object]'}, @{name='possible_findings';type='array[string]'}, @{name='measures_or_sanctions';type='array[string]'}, @{name='decision_maker';type='actor_id'}, @{name='internal_review';type='string'}, @{name='external_review_or_appeal';type='string'}, @{name='multi_institution_and_funder_cases';type='string'}, @{name='protections_for_parties';type='string'}, @{name='records_and_data_protection';type='string'}, @{name='publication_and_anonymisation';type='string'}
        )},
        [ordered]@{ id='05_activity_statistics'; purpose='Capture annual, comparable workload and outcome data with explicit denominators.'; repeatable=$true; fields=@(
            @{name='reporting_year';type='year';required=$true}, @{name='signals_received';type='integer'}, @{name='formal_complaints_received';type='integer'}, @{name='admissible_complaints';type='integer'}, @{name='investigations_started';type='integer'}, @{name='investigations_completed';type='integer'}, @{name='median_duration_days';type='number'}, @{name='duration_range_days';type='object'}, @{name='backlog_end_year';type='integer'}, @{name='allegation_categories';type='array[category-count]'}, @{name='outcomes';type='array[category-count]'}, @{name='measures';type='array[category-count]'}, @{name='reviews_or_appeals';type='integer'}, @{name='publication_status';type='string'}, @{name='denominator_note';type='string';required=$true}
        )},
        [ordered]@{ id='06_relationships'; purpose='Encode the institutional and national network as directed, dated edges.'; repeatable=$true; fields=@(
            @{name='relationship_id';type='string';required=$true}, @{name='source_actor_id';type='string';required=$true}, @{name='target_actor_id';type='string';required=$true}, @{name='relationship_type';type='controlled';required=$true}, @{name='direction_note';type='string'}, @{name='scope';type='string'}, @{name='valid_from';type='partial-date'}, @{name='valid_to';type='partial-date'}, @{name='source_document_ids';type='array[string]'}
        )},
        [ordered]@{ id='07_documents_sources'; purpose='Provide a complete provenance manifest for public, received and restricted evidence.'; repeatable=$true; fields=@(
            @{name='document_id';type='string';required=$true}, @{name='title_original';type='string';required=$true}, @{name='title_english';type='string'}, @{name='document_category';type='controlled'}, @{name='publisher';type='string'}, @{name='language';type='string'}, @{name='version';type='string'}, @{name='publication_date';type='partial-date'}, @{name='effective_date';type='partial-date'}, @{name='supersedes_document_id';type='string'}, @{name='replaced_by_document_id';type='string'}, @{name='url';type='uri'}, @{name='archived_url';type='uri'}, @{name='accessed_at';type='datetime'}, @{name='mime_type';type='string'}, @{name='local_relative_path';type='string'}, @{name='sha256';type='string'}, @{name='confidentiality';type='controlled'}, @{name='supported_fields';type='array[field-path]'}, @{name='extract_status';type='enum[not-started,partial,complete,not-machine-readable]'}, @{name='pinpoint_references';type='array[string]'}, @{name='validation_status';type='controlled'}
        )},
        [ordered]@{ id='08_timeline'; purpose='Construct versioned LERU, national, institutional, route and document histories.'; repeatable=$true; fields=@(
            @{name='event_id';type='string';required=$true}, @{name='level';type='enum[LERU,country,institution,route,procedure,document]'}, @{name='start_date';type='partial-date'}, @{name='end_date';type='partial-date'}, @{name='date_precision';type='enum[day,month,year,approximate,unknown]'}, @{name='event_type';type='string'}, @{name='actor_ids';type='array[string]'}, @{name='title';type='string'}, @{name='description';type='string'}, @{name='comparative_significance';type='string'}, @{name='source_document_ids';type='array[string]'}, @{name='supersedes_event_id';type='string'}, @{name='status';type='enum[historical,current,planned]'}
        )},
        [ordered]@{ id='09_email_validation'; purpose='Keep respondent confirmation separate from the public evidence base.'; repeatable=$true; fields=@(
            @{name='validation_id';type='string';required=$true}, @{name='institution_id';type='string'}, @{name='respondent_function';type='string'}, @{name='message_or_thread_reference';type='string'}, @{name='received_date';type='date'}, @{name='claims_confirmed';type='array[field-path]'}, @{name='claims_corrected';type='array[object]'}, @{name='claims_added';type='array[object]'}, @{name='attachment_document_ids';type='array[string]'}, @{name='permission_to_publish';type='enum[yes,no,partial,not-asked,unclear]'}, @{name='confidentiality';type='controlled'}, @{name='open_questions';type='array[string]'}, @{name='last_follow_up_date';type='date'}, @{name='response_status';type='enum[not-contacted,sent,reminded,responded,declined,undeliverable]'}
        )},
        [ordered]@{ id='10_field_validation'; purpose='Attach provenance, confidence and missingness to every substantive claim.'; repeatable=$true; fields=@(
            @{name='field_path';type='string';required=$true}, @{name='value';type='any'}, @{name='evidence_status';type='controlled';required=$true}, @{name='missingness';type='controlled'}, @{name='source_document_ids';type='array[string]'}, @{name='accessed_or_confirmed_at';type='datetime'}, @{name='confidence';type='enum[high,moderate,low,not-rated]'}, @{name='validation_question';type='string'}, @{name='resolved_at';type='datetime'}
        )}
    )
}
$dictionary | ConvertTo-Json -Depth 20 | Set-Content -LiteralPath (Join-Path $sharedMethods 'MASTER_DATA_DICTIONARY_v0.1.json') -Encoding utf8

$emailIndex = [ordered]@{
    generated = $generated
    scope = 'Read-only index of locally available LERU-related email and meeting evidence. No live mailbox search was possible.'
    access_limit = 'No Outlook Email connector was available. Sent Items, older folders and attachments counted but not exported in the local Inbox snapshot remain unavailable.'
    handling_rule = 'This index and the underlying correspondence folder are restricted to the project team. Do not publish personal contact details or meeting links.'
    records = @(
        @{id='email-original-positioning-request';date='2026-01-21 (file modification; original send date not preserved)';topic='Original request about institutional placement of the function handling misconduct cases, integrity promotion and ordinance oversight';local_evidence='original_LERU_request.txt';attachments='none preserved';use='Defines the original question'},
        @{id='email-eth-achermann';date='2024-12-09 (document metadata)';topic='Swiss national context and ETH procedure supplied after the Copenhagen LERU Integrity Group meeting';local_evidence='17_CH_ETH_Zurich/05_Correspondence_RESTRICTED/Notes_Gerald_Achermann.docx';attachments='Keypoints.pdf; 415en.pdf';use='Direct respondent evidence; publication permission still to verify'},
        @{id='email-heidelberg-documents';date='2024-12-09 (file modification)';topic='Two received Heidelberg/Germany policy documents';local_evidence='07_DE_Heidelberg_University/03_Procedures_and_Policies';attachments='Heidelberg statute 2021; DFG Code 2019';use='Received documents; sender and message provenance not preserved'},
        @{id='outlook-leru-inte-meetings';date='2026-06-02';topic='Plan for one report per affiliated committee/institution plus a later web page; advice to frame carefully and show LERU-centre tables';local_evidence='restricted local Outlook snapshot copied to this folder';attachments='3 and 2 counted in two messages; none exported';use='Scope and stakeholder feedback'},
        @{id='outlook-cambridge-meeting';date='2026-06-18';topic='LERU meeting on 24 June';local_evidence='restricted local Outlook snapshot copied to this folder';attachments='1 counted; not exported';use='Meeting context; do not publish meeting link'},
        @{id='meeting-feedback-cambridge';date='2026-06-25';topic='Oral feedback to add descriptive numbers and comparisons, make the report standalone, and compare with other RI groups/committees/universities';local_evidence='leru-cambridge-ri-meeting-2026.json';attachments='not applicable';use='Report design requirements'},
        @{id='outlook-country-reports';date='2026-04-20';topic='ENRIO/Embassy country reports, decisions, SIMPLIFY and possible cooperation';local_evidence='restricted local Outlook snapshot copied to this folder';attachments='1 counted; not exported';use='Potential comparative and national-system sources'},
        @{id='outlook-maastricht-comparator';date='2026-06-05';topic='Non-LERU Maastricht CWI offered further information on its procedure';local_evidence='restricted local Outlook snapshot copied to this folder';attachments='1 counted; content not verified';use='Potential external comparator, not part of primary population'}
    )
}
$emailIndex | ConvertTo-Json -Depth 8 | Set-Content -LiteralPath (Join-Path $restricted 'EMAIL_EVIDENCE_INDEX.json') -Encoding utf8

$dossiers = Get-ChildItem -LiteralPath $root -Directory | Where-Object { $_.Name -match '^\d{2}_[A-Z]{2}_' } | Sort-Object Name
foreach ($dossier in $dossiers) {
    $statusPath = Join-Path $dossier.FullName '00_Dossier_Metadata\dossier_status.json'
    $status = if (Test-Path -LiteralPath $statusPath) { Get-Content -LiteralPath $statusPath -Raw | ConvertFrom-Json } else { $null }
    $institution = if ($status -and $status.institution) { $status.institution } else { $dossier.Name }
    $country = if ($status -and $status.country) { $status.country } else { 'See dossier metadata' }
    $readme = @"
# $institution research-integrity dossier

Country: $country  
Dossier generated: $generated  
Study inclusion unit: official LERU member university  
Analysis unit: the institution's primary research-integrity handling route and every nested committee, office, adviser, referent, ombudsperson or panel involved.

## Folder guide

- `00_Dossier_Metadata`: manifests, legacy structured record and validation status.
- `01_Country_System`: national legal, code, oversight, review and transparency context.
- `02_Committee_and_Institution`: institutional positioning, mandate, governance and actor mapping.
- `03_Procedures_and_Policies`: current and historical procedures, regulations and policy documents.
- `04_Reports_Statistics_and_Timeline`: annual reports, public cases, counts, outcomes and dated events.
- `05_Correspondence_RESTRICTED`: respondent feedback and received documents that require confidentiality or permission checks.
- `06_Web_Sources_and_Snapshots`: retrieved official pages and URL inventories.
- `99_Working_Notes`: extraction notes, unresolved contradictions and targeted follow-up questions.

## Evidence rules

1. Treat `not found` as missing evidence, never as proof of absence.
2. Record the exact source, retrieval date, version and pinpoint reference for every substantive claim.
3. Keep public evidence and respondent correspondence separate.
4. Verify whether a document is current before using it for comparison.
5. Record route actors separately when responsibilities are split.
6. Do not publish personal contact data, private email text or meeting links.

See `SOURCE_MANIFEST.json` for the local file inventory and the shared master data dictionary for the target field structure.
"@
    Set-Content -LiteralPath (Join-Path $dossier.FullName '00_Dossier_Metadata\DOSSIER_README.md') -Value $readme -Encoding utf8

    $template = [ordered]@{
        institution = [ordered]@{ institution_id=$dossier.Name; official_name=$institution; country=$country; official_leru_member=$true; leru_inte_participation='unconfirmed' }
        country_system = [ordered]@{ system_type=$null; centralisation=$null; legal_basis=@(); national_codes=@(); national_bodies=@(); institutional_autonomy=$null; transparency_regime=$null }
        handling_routes = @()
        procedure_versions = @()
        annual_activity = @()
        relationships = @()
        timeline = @()
        email_validation = @()
        field_validation = @()
        record_status = [ordered]@{ created_at=$generated; comparative_extraction='not_started'; member_validation='not_started'; note='Populate according to MASTER_DATA_DICTIONARY_v0.1.json. Preserve nulls and explicit missingness.' }
    }
    $template | ConvertTo-Json -Depth 12 | Set-Content -LiteralPath (Join-Path $dossier.FullName '00_Dossier_Metadata\structured_record_TEMPLATE.json') -Encoding utf8

    $manifestItems = Get-ChildItem -LiteralPath $dossier.FullName -Recurse -File | Where-Object { $_.Name -ne 'SOURCE_MANIFEST.json' } | Sort-Object FullName | ForEach-Object {
        $relative = [System.IO.Path]::GetRelativePath($dossier.FullName, $_.FullName).Replace('\','/')
        $restrictedFlag = $relative -match 'RESTRICTED'
        [ordered]@{
            local_relative_path = $relative
            size_bytes = $_.Length
            sha256 = (Get-FileHash -LiteralPath $_.FullName -Algorithm SHA256).Hash.ToLowerInvariant()
            confidentiality = if ($restrictedFlag) { 'restricted-project-team' } else { 'public-or-working' }
            manifest_generated_at = $generated
        }
    }
    [ordered]@{ institution=$institution; country=$country; generated=$generated; file_count=@($manifestItems).Count; files=@($manifestItems) } |
        ConvertTo-Json -Depth 8 | Set-Content -LiteralPath (Join-Path $dossier.FullName '00_Dossier_Metadata\SOURCE_MANIFEST.json') -Encoding utf8
}

$coverage = foreach ($dossier in $dossiers) {
    $status = Get-Content -LiteralPath (Join-Path $dossier.FullName '00_Dossier_Metadata\dossier_status.json') -Raw | ConvertFrom-Json
    $manifest = Get-Content -LiteralPath (Join-Path $dossier.FullName '00_Dossier_Metadata\SOURCE_MANIFEST.json') -Raw | ConvertFrom-Json
    [ordered]@{
        dossier=$dossier.Name; institution=$status.institution; country=$status.country; local_file_count=$manifest.file_count
        procedure_or_policy_files=@($manifest.files | Where-Object { $_.local_relative_path -like '03_Procedures_and_Policies/*' }).Count
        report_statistics_timeline_files=@($manifest.files | Where-Object { $_.local_relative_path -like '04_Reports_Statistics_and_Timeline/*' }).Count
        restricted_correspondence_files=@($manifest.files | Where-Object { $_.local_relative_path -like '05_Correspondence_RESTRICTED/*' }).Count
        official_web_snapshot_files=@($manifest.files | Where-Object { $_.local_relative_path -like '06_Web_Sources_and_Snapshots/*' }).Count
        structured_comparative_extraction='not_started'
        member_validation='not_started'
    }
}
[ordered]@{ generated=$generated; population_size=$dossiers.Count; note='File presence is not equivalent to substantive completeness or current-version validation.'; dossiers=$coverage } |
    ConvertTo-Json -Depth 8 | Set-Content -LiteralPath (Join-Path $sharedCross 'CURRENT_DOSSIER_COVERAGE.json') -Encoding utf8

Write-Output "Generated master dictionary, email index, $($dossiers.Count) dossier READMEs, structured templates, manifests and coverage summary."

