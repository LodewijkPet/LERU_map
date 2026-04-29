# United Kingdom deep-dive sources

Updated: 23 April 2026

## System reading

The United Kingdom is best read as a Concordat-and-employer research-integrity system rather than a national misconduct-board system.

- The Concordat to Support Research Integrity sets the shared national frame.
- UKCORI provides stewardship, evidence work and annual-statement analysis.
- UKRIO provides independent guidance, confidential advice, case-study training material and procedure templates, but does not act as a regulator.
- UKRI and other funders create assurance, notification and grant-consequence routes, while normally expecting the employing or enrolling organisation to handle allegations.
- Research employers investigate cases locally and publish annual research integrity statements.
- Public case visibility is therefore mostly an institutional annual-statement corridor, not a national decision archive.
- Boundary regimes such as HRA research summaries, ASRU non-compliance reporting and HFEA licence decisions publish richer project or regulatory traces, but these should not be merged into the general misconduct route.

## Committee and case-file pass

### Pilot finding

The UK is a useful pilot for countries where public transparency is strong at the system level but weak at the full individual misconduct-file level.

No national archive of general research-misconduct decisions was identified. Instead, the routine public route is built from annual statements, named contacts, local procedures and selected institutional examples. Some annual statements publish only aggregate tables; others publish anonymized numbered allegations and outcomes. This makes the UK different from countries with a national archive, and different again from countries where almost nothing is published.

### Seed bodies and publication nodes

#### UKCORI and the Concordat annual-statement route

- Type: national stewardship and evidence route
- Lane: research-integrity framework and annual statement monitoring
- Strongest current sources: UKCORI Concordat page, UKCORI annual statement analysis 2025 and UKCORI Annual Statement 2025
- Publication owner: UKCORI / RICS Group, with institutional statements published by employers
- Archive scope: national framework, annual statement expectations, sector analysis and evidence synthesis
- Publication depth: national analysis and statement templates, not individual case files
- Publicity mode: proactive web publication and PDF reports
- Case-file status: annual-statement corridor rather than misconduct decision archive

The UKCORI 2025 annual-statement analysis confirms that statements are a real evidence base, but also that availability and categorisation remain uneven. It is therefore a transparency source and a missingness source at the same time.

#### UKRIO

- Type: independent guidance and advice route
- Lane: research integrity advice, training and procedure design
- Strongest current sources: role/remit pages, case-study pack, barriers report, code and template procedure
- Publication owner: UKRIO
- Archive scope: guidance, anonymized or synthetic learning material, sector problem analysis and procedural templates
- Publication depth: synthetic case studies and barriers analysis; no public archive of real adjudicated cases
- Publicity mode: proactive web publication and PDFs
- Case-file status: not a real-case archive

The UKRIO case-study pack is especially important to label correctly: it is based on recurring real-life situations, but the cases are explicitly not literal accounts of particular enquiries.

#### UKRI

- Type: funder assurance route
- Lane: UKRI-funded activity, applications, peer review and funded organisations
- Strongest current source: UKRI policy on the governance of good research practice
- Publication owner: UKRI
- Archive scope: responsibilities, definitions, reporting and compliance expectations
- Publication depth: policy and reporting requirements, not a public case archive
- Publicity mode: proactive web policy
- Case-file status: funder route; employer normally investigates

UKRI is important because it can require reporting, information, remedial action and grant-related consequences. It should not be coded as the ordinary first-instance misconduct investigator or as a public appeal board.

#### Institutional annual statements

- Type: employer publication route
- Lane: local misconduct handling and Concordat accountability
- Strongest current sources: King's College London 2024-2025 statement, Oxford 2024 statement and Imperial 2024 statement
- Publication owner: individual research employer
- Archive scope: annual public statement, named contacts, procedures, allegation counts or anonymized case summaries
- Publication depth: varies by institution
- Publicity mode: proactive annual statement publication
- Case-file status: strongest general UK public trace, but usually not full case files

Examples from this pilot:

- King's College London publishes a statement hub and a 2024-2025 PDF with named contacts and an aggregate allegation table: 2 cases, 0 formal investigations and 0 upheld findings.
- Oxford's 2024 statement publishes a more granular anonymized table of numbered allegations and outcomes, including preliminary-review dismissals, ongoing matters and student research-work cases handled by the Proctors' Office.
- Imperial's 2024 statement includes a narrative public case trace for a potential PhD-thesis plagiarism allegation, with outcome and lesson-learning information.

This institutional variation is the core UK finding. Future UK collection should store the statement depth for each employer, not only whether a statement exists.

#### HRA research summaries

- Type: health and social-care research boundary register
- Lane: REC-reviewed health research
- Strongest current source: HRA research summaries database
- Publication owner: Health Research Authority
- Archive scope: research-study summaries extracted from IRAS applications after REC review
- Publication depth: project metadata and plain-language summaries; deferral possible for confidentiality reasons
- Publicity mode: searchable public register
- Case-file status: project/approval register, not misconduct decision archive

HRA research summaries are excellent public project records, but they answer a different question from research-misconduct case publication.

#### ASRU annual non-compliance reporting

- Type: statutory animal-research regulator publication
- Lane: Animals (Scientific Procedures) Act compliance
- Strongest current sources: GOV.UK ASRU collection and ASRU annual report 2024
- Publication owner: Home Office / ASRU
- Archive scope: inspection, licensing and non-compliance reporting
- Publication depth: annual report with Annex A individual non-compliance case entries
- Publicity mode: proactive GOV.UK publication
- Case-file status: case-level boundary-regime publication, not general research-integrity misconduct archive

ASRU is one of the clearest UK examples of a boundary regime whose public case visibility can be stronger than the general RI route.

#### HFEA latest clinic decisions

- Type: specialist regulator decision list
- Lane: fertility clinics and embryo-research licensing
- Strongest current source: HFEA latest decisions on clinics
- Publication owner: HFEA
- Archive scope: clinic/licence committee and executive licensing panel decisions
- Publication depth: dated clinic-level decision notices and linked clinic pages
- Publicity mode: proactive web list
- Case-file status: specialist licence-decision publication, not general misconduct case file

### Method refinement from the UK

The UK pass adds a new coding habit for decentralized annual-statement systems:

- treat the annual statement as the primary public corridor where the employer is the case handler
- record annual-statement depth separately for each institution: named contacts only, aggregate counts, allegation categories, anonymized numbered rows, narrative case learning or full decisions
- label synthetic case studies clearly; they can explain practice but are not case files
- separate national stewardship from employer handling: UKCORI analyses and coordinates, UKRIO advises, employers investigate
- separate funder assurance from adjudication: UKRI can require reporting and consequences but is normally not the case investigator
- preserve boundary registers such as HRA, ASRU and HFEA when they publish rich project or decision data, but code them as boundary-regime case visibility

### Fields to preserve in future UK or UK-like annual-statement extraction

- Statement year and reporting period
- Named senior person
- First point of contact or confidential liaison point
- Procedure owner and investigation stages
- Number of allegations reported
- Number of formal investigations
- Allegation categories
- Outcomes and upheld/not-upheld counts
- Whether numbered anonymized rows are published
- Whether narrative case learning is published
- Whether ongoing cases are excluded
- Whether student research-work cases are separated from staff research-misconduct cases
- External bodies/funders notified, if public
- Explicit limits on confidentiality or non-identification

### Overview reconciliation pass added 23 April 2026

The new `Overview United Kingdom.docx` confirms the core UK reading from the pilot: the system is Concordat-led, funder-reinforced and institutionally executed. It also sharpens five data-collection requirements:

- Keep UKCORI and UKRIO separate from case handling. UKCORI stewards national evidence and coordination; UKRIO advises and publishes guidance; employers investigate.
- Store devolved assurance separately. Research England, Medr, SFC and the Department for the Economy Northern Ireland each make the Concordat visible through funding, annual-statement, research-culture or assurance-return routes.
- Store charitable funder routes separately. Wellcome and Cancer Research UK create confidential reporting, update, final-report and possible sanctions routes within the funding relationship.
- Use four-nation institutional examples when building the annual-statement directory. Oxford, Edinburgh, Cardiff and Queen's Belfast show the same Concordat corridor under different local governance names.
- Keep health and animal boundaries explicit. The HRA cross-border toolkit, HRA/REC routes, ASRU licensing, Northern Ireland animal licensing and the Concordat on Openness expose public records that are richer than some RI annual statements but are still boundary-regime evidence.

### Gaps for next pass

- Build a broader UK institutional annual-statement directory beyond King's, Oxford and Imperial.
- Add funder-by-funder reporting and sanction routes beyond UKRI.
- Add devolved health and social-care implementation detail for Scotland, Wales and Northern Ireland.
- Add a wider AWERB and university research ethics sample.
- Use the new `Overview United Kingdom.docx` as the starting synthesis for future UK passes.
