# Next Phase Quality Consolidation Plan

Status date: 30 April 2026

## Purpose

The project has now completed three broad collection layers:

- extensive country overview extraction
- deep dossier expansion for 40 countries
- committee-and-case-file discovery for all 40 deep dossiers

The next phase is not another first-pass collection sprint. It is a quality-consolidation phase: bring each country record to a defensible, source-current, comparison-ready standard.

## Current Baseline

- 49 country records are represented in `data/countries.js`.
- 40 readable `Overview <Country>.docx` files are represented in the app.
- 40 records are labelled `Deep dossier drafted`.
- All 40 deep dossiers have completed the committee-and-case-file workflow.
- 9 countries have first expanded app dossiers but still need formal overview documents: Albania, Andorra, Armenia, Azerbaijan, Georgia, Liechtenstein, Malta, Monaco and San Marino.
- Vatican City remains a data-folder-only representation question.
- `data/source-registry.csv` currently contains 1550 entries.

## Target Standard

A top-tier country dossier should answer six questions cleanly:

1. What is the current national research-integrity model?
2. Which law, code or soft-law framework is the latest active basis?
3. Which committees, offices, ombudspersons, councils, funders and institutional routes actually handle cases or shape procedure?
4. Which source is the best public evidence for each route?
5. What public case files, reports, decisions, statistics or no-publication evidence exist?
6. Which adjacent regimes are relevant but separate from general research misconduct?

## Workstream 1: Source Currency Sweep

Goal: make sure each country uses the latest available public source versions.

For each country, verify:

- current national law or consolidated legal text
- current national code of conduct or research-integrity guideline
- latest national-body procedure rules
- latest annual report, activity report or statistics
- latest funder integrity/compliance terms
- latest institutional procedure examples
- latest biomedical, animal, data-protection, IP, open-science and QA boundary sources
- whether any previously collected link has moved, disappeared, been superseded or become inaccessible

Output:

- update `data/source-registry.csv` for durable new or replaced sources
- add a short source-currency note in the country source notes
- update `data/countries.js` only when the newer source changes the dossier conclusion

## Workstream 2: ENRIO Cross-Check

Goal: use ENRIO country reports and ENRIO membership material as a secondary comparison layer.

Primary ENRIO sources:

- ENRIO Country Reports Archive: https://www.enrio.eu/country-reports/
- ENRIO Annual Report 2024: https://www.enrio.eu/wp-content/uploads/2025/04/ENRIO-ANNUAL-REPORT-2024.pdf

As of the live ENRIO archive checked on 29 April 2026, ENRIO lists country reports for:

- Austria
- Belgium
- Croatia
- Czech Republic
- Denmark
- Estonia
- Finland
- France
- Germany
- Greece
- Ireland
- Italy
- Lithuania
- Luxembourg
- Montenegro
- Netherlands
- Norway
- Poland
- Portugal
- Slovak Republic
- Slovenia
- Spain
- Sweden
- Switzerland
- United Kingdom

The ENRIO 2024 annual report says these country reports were reviewed and updated in 2024. Treat them as a high-value comparison source, but not as a substitute for primary official law, body, university or funder sources.

For each country, record:

- whether an ENRIO country report exists
- the ENRIO report URL
- whether the report identifies national structures not yet reflected in the dossier
- whether the report confirms or contradicts the current app coding
- whether the country has an ENRIO member or affiliate body listed in ENRIO's latest annual report
- whether ENRIO terminology differs from the local official terminology

Output:

- add ENRIO report links to source notes or `sourceLinks` where useful
- do not overwrite primary-source conclusions without confirming against official sources

## Workstream 3: Code Of Conduct Matrix

Goal: make the main normative baseline visible for every country.

European baseline source:

- ALLEA European Code of Conduct for Research Integrity, revised edition 2023: https://allea.org/portfolio-item/european-code-of-conduct-2023/

For each country, identify:

- national research-integrity code, if any
- academy code, if it functions nationally
- funder code or grant-integrity conditions
- university-sector code or model procedure
- leading institutional code example
- whether the ALLEA European Code of Conduct for Research Integrity, revised edition 2023, is adopted, cited, translated or used as a model
- whether the code defines fabrication, falsification, plagiarism, questionable research practices, authorship, conflicts of interest, data management, supervision, mentoring, peer review, publication ethics, open science or AI use

Output:

- a consistent `main codes` note in each country source note
- update `documentLabels`, `keyActors`, `networkLayers` or `boundaries` when a code materially changes the system map

## Workstream 4: Committee And Institution Directory

Goal: make the route directory complete enough to compare countries.

For each country, build or verify a route inventory for:

- national research-integrity or scientific-integrity bodies
- academy ethics or scientific-integrity committees
- ombudspersons and confidential-adviser routes
- higher-education quality or accreditation bodies when they expose integrity evidence
- funder integrity, audit, default, sanction or eligibility routes
- university and public-research-institute examples
- biomedical, animal, data-protection, IP, open-science, AI and research-security boundary bodies

For each route, capture:

- institution/body name
- committee/office name
- route type
- scope
- current source URL
- public-output status
- publication owner
- archive or report source
- boundary warning, if applicable

Output:

- tighten `dossierDetails.integrityCommittees`
- mark gaps explicitly where a body is known from law but no public page or output was found

## Workstream 5: Public Output And Case-File Repository Indexing

Goal: turn case-file discovery into indexable evidence.

Prioritize countries with rich or confusing public output:

- Netherlands
- Denmark
- Finland
- Lithuania
- Norway
- Romania
- Ukraine
- Germany
- France
- Belgium
- Switzerland
- Austria
- Ireland
- Latvia
- Luxembourg
- Portugal
- Greece
- Poland
- Turkey
- `North Macedonia` full-field AQHE/UKIM/SEEU extraction after first structured follow-up seed

For each repository or report corridor, index:

- route owner
- publication owner
- years covered
- format
- searchable fields
- allegation categories
- outcomes
- anonymization level
- retention or removal rules
- representative case file
- accessibility limits

Output:

- improve country source notes first
- update `data/countries.js` only when a country-level transparency claim changes
- create a separate structured repository dataset only if repeated indexing becomes too bulky for country notes

## Workstream 6: Missing Overview And Representation Completion

Goal: close the remaining first-dossier gaps.

Draft formal overview documents for:

- Albania
- Andorra
- Armenia
- Azerbaijan
- Georgia
- Liechtenstein
- Malta
- Monaco
- San Marino

Decide whether Vatican City should become an app country profile. If included, create the source-backed country record and update the tracker; if excluded, document the scope decision clearly.

## Workstream 7: Data Hygiene And App Consistency

After each country quality pass:

- update `data/countries.js`
- update `reports/project-overview.html`
- update `AGENTS.md` if the country becomes a major current-priority note
- update `data/source-registry.csv` for durable source additions
- update extraction logs only when overview documents are created or extracted
- run:

```powershell
node --check data/countries.js
node --check assets/js/app.js
```

## Suggested Country Order

The first twelve calibration passes have been completed for the United Kingdom, Germany, France, Portugal, Greece, Poland, Ireland, Latvia, Luxembourg, North Macedonia, Austria and the Netherlands by 30 April 2026. Belgium completed the first post-calibration quality pass on 30 April 2026, confirming the ENRIO/VCWI/CSIS two-community reading and creating VCWI, KU Leuven and UAntwerpen indexing targets. Switzerland then completed the next first-pass quality check on 30 April 2026, reconciling ENRIO's May 2024 country report with SCCSI's January 2026 launch and creating SNSF/ETH indexing plus SCCSI-monitoring targets. Latvia also completed the first high-yield follow-up after calibration: LAS/LCS output retesting plus public-research-institute route widening. Ireland has now completed the next compact follow-up by indexing the published 2016-2023 NRIF annual statistics series. Czechia has now completed the next first-pass quality check from the remaining deep dossiers, confirming the ENRIO/CAS no-national-commission baseline and adding JCU as a second institutional statements/minutes corridor alongside Charles University. Slovenia has now completed the next first-pass quality check, reconciling ENRIO's older country-report wording with the current National Council member route, preserving the no-live-opinion-archive coding and adding ARIS as a funder/open-science implementation route. Use those passes as the template: source-currency note, ENRIO status, main code baseline, route directory seed, funder matrix, boundary targets, stable app-data updates, source-registry additions and syntax checks.

Continue with high-yield calibration countries where a better quality pass will improve the whole method:

1. North Macedonia follow-up: full-field AQHE report/decision indexing, UKIM unit self-evaluation classification beyond the first 33-unit map and SEEU Google Drive-linked rule/self-evaluation extraction where stable direct access is available
2. Latvia next extraction: field-index ISSP UL, LIOS, EDI, LVKKI and BMC/Genome institute-code or boundary sources, keep periodic LAS/LCS scientist-committee output checks, and optionally migrate the completed 78-row UL full-text classification into a structured decision dataset
3. Luxembourg follow-up: monitor the pending LARI 2023/2024 annual report, add page-level or allegation-category detail to the seeded LARI annual-report table where useful, and verify LIH/LIST procedure evidence
4. Ireland follow-up: NRIF statistics indexing completed on 30 April 2026; remaining work is SRII2025 result monitoring, NCI/MTU publication tests and DIAS/public-RPO route checks
5. Austria follow-up: OeAWI annual-report field indexing, FWF 2008-2025 suspected-violation statistics extraction, archived Vienna/Medical University of Innsbruck case-summary tests, Fachhochschule/private-university route widening and direct animal-research publication/statistics verification
6. Poland follow-up: PAN annual-report field indexing, renewed plenary-note monitoring, wider university/PAN-institute/Lukasiewicz route checks and NKB/animal boundary extraction
7. Greece follow-up: NTUA and Harokopio annual-report output indexing, AUEB/Thessaly/HMU report tests and EOF/CTIS boundary extraction
8. Portugal follow-up: U.Porto public/authenticated CEUP indexing, CEIUC annual-report series, FCT transparency/funding-route monitoring and CCISP-wide polytechnic expansion
9. France follow-up: Ofis RIS annuaire and synthesis indexing, CNRS/MIS retention/request extraction, Inadis monitoring and wider institutional annual-report search
10. Germany follow-up: DFG press-release indexing, OWID annual-report series, FU Berlin/Gottingen annual-report fields, wider annual-report search, Max Planck/Helmholtz and university medical-center examples
11. United Kingdom follow-up: bulk annual-statement indexing, government/NHS/charity/independent research-organisation statements and AWERB examples
12. Netherlands follow-up: LOWI 2025 opinion indexing, UNL 2025-2026 row indexing, VH 2022/2025 hbo file comparison, NWO annual-report field extraction and non-UNL LOWI-affiliate route widening
13. Switzerland follow-up: SNSF annual-report and case-news indexing, ETH Zurich anonymised-report and procedure-statistics extraction, SCCSI first public-report monitoring and Swiss Academies responsible-bodies directory widening

Then move through the remaining deep dossiers, followed by the nine expanded overview dossiers.

## Definition Of Done For This Phase

The phase is complete when every represented country has:

- a current-source check date
- an ENRIO report status
- a main code-of-conduct status
- a route directory that covers national, institutional, funder and boundary routes
- a clear public-output assessment
- updated source-registry entries for durable sources
- explicit missingness notes where evidence is absent or inaccessible
