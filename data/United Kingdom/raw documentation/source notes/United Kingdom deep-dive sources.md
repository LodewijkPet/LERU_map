# United Kingdom deep-dive sources

Updated: 29 April 2026

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

## Quality consolidation pass added 29 April 2026

### Source currency check

- Check date: 29 April 2026.
- National framework: the UKCORI Concordat page confirms the refreshed 2025 Concordat as the current national baseline after the April 2026 transition. The 2019 version is now historical context for earlier annual statements.
- UKCORI evidence layer: the latest identified UKCORI annual statement is `Research Integrity in the UK: Annual Statement 2025`. UKCORI's 2025 analysis of annual statements is the best national evidence corridor for institutional publication practice. The full July 2025 review covers statements from HEIs, government departments and independent research organisations for 2022/23 and 2023/24; it found 78% availability for 2022/23, 75% for 2023/24, and 234 statements in the final analysed set.
- UKRI funder layer: the current UKRI `Policy on the governance of good research practice` is published as 1 April 2026. It confirms that concerns should normally be raised with the employing or enrolling organisation, that UKRI is not normally the investigator or appeal body, and that reporting and grant-response powers sit in the funding relationship.
- UKRIO guidance layer: the UKRIO Code of Practice for Research is at version 3.5, updated in July 2025 to align with the 2025 Concordat and add AI/emerging technology content. UKRIO's 2023 misconduct procedure has been sunset and replaced by the December 2025 `Detailed template procedure for investigating breaches of research integrity`.
- Government research layer: the GOV.UK Concordat implementation page was last updated on 15 January 2026 and now lists multiple 2024-2025 government annual statements plus departmental senior roles and first points of contact.
- Boundary sources remain current enough for the UK reading: HRA research summaries expose REC-reviewed project metadata; the ASRU annual report 2024 includes Annex A non-compliance case entries; HFEA maintains a specialist clinic/licence decision list. These remain boundary-regime files, not general misconduct case files.

### ENRIO cross-check

- ENRIO country report exists: yes. The current public ENRIO United Kingdom country report confirms UKRIO as the national advisory body, the Concordat as the national framework, employer responsibility for misconduct investigations, funder reporting duties, and the absence of a national regulator or oversight body for all misconduct investigations.
- ENRIO annual-report membership check: ENRIO Annual Report 2024 lists UKRIO as the United Kingdom member and says ENRIO country reports were reviewed and updated in 2024.
- Reconciliation with app coding: ENRIO confirms the current app reading. It uses "national advisory body" for UKRIO, but this should not be read as regulatory or adjudicatory power. The app should continue to code UKRIO as advisory and UKCORI as stewardship/evidence, with employers handling cases.
- Terminology note: ENRIO describes the UK as a tripartite structure of research organisations, funding bodies, and UKRIO/other support bodies. This is useful comparison language, but the local UK dossier should keep the more precise split between UKCORI stewardship, UKRIO advice, funder assurance, employer investigation, and boundary regimes.

### Main codes and normative baseline

- Primary UK baseline: `The Concordat to Support Research Integrity` refreshed in 2025, structured around five principles and five commitments.
- Main UK guidance code: UKRIO `Code of Practice for Research`, version 3.5, updated July 2025.
- Funder code/policy layer: UKRI's 1 April 2026 policy, Research England's supporting-research-integrity conditions, Medr annual-statement expectation, SFC 2025-26 assurance guidance, DfE NI research-culture and concordat page, Wellcome research misconduct policy, CRUK scientific conduct guidelines and Royal Society grant policies.
- Institutional code examples: King's `Code of Good Conduct in Research` effective 25 February 2026; UCL Code of Conduct for Research 2023 as described in its annual statement; Cambridge good research practice resources; Nottingham Code of Research Conduct and Research Ethics; Warwick Research Code of Practice.
- ALLEA status: ALLEA is a European reference source in UKRIO and institutional resource material, but no official source in this pass showed the 2023 ALLEA Code replacing the UK Concordat or UKRIO Code as the main UK normative baseline.

### Expanded institutional annual-statement directory seed

Use this as a seed directory for a later structured annual-statement dataset. The unit is the annual-statement route, not the institution as a whole.

| Institution | Nation | Current source checked | Depth signal | Notes |
| --- | --- | --- | --- | --- |
| King's College London | England | 2024-2025 statement and statement hub | Aggregate counts | Named contacts, 2 cases, 0 formal investigations, 0 upheld findings. Existing pilot source. |
| University of Oxford | England | 2024 statement and long-run annual reports hub | Anonymized numbered rows | Stronger case-level annual-statement depth, but not full case files. Existing pilot source. |
| Imperial College London | England | 2024 statement page | Narrative case learning | Potential PhD-thesis plagiarism case trace with outcome/learning. Existing pilot source. |
| University of Cambridge | England | Research integrity reports hub and 2026 misconduct procedure page | Anonymized annual reports plus current procedure | Latest report is 2024-2025; misconduct procedure updated for allegations received from 12 February 2026. |
| University College London | England | Annual statement 2023-2024 PDF | Named contacts, code, ethics reform and misconduct-committee analysis | Good evidence for compliance/assurance functions and a Research Misconduct Committee annual analysis over 2010-2024. |
| University of Manchester | England | Annual statement 2024/25 PDF | Training, open research and misconduct reporting route | Useful large-HEI example; extract the misconduct table in a later pass. |
| University of Nottingham | England | Annual statement 2025 PDF | Current training and integrity governance detail | Search result confirms a 2025 statement; use as a current annual-statement extraction target. |
| University of Warwick | England | Eleventh annual statement 2024-25 PDF | Allegation table with at least one plagiarism allegation | Good example of template use and research-culture/governance integration. |
| University of Sheffield | England | Annual statement 2025 PDF | Policy, concern-raising and clinical-governance notes | Useful example where research integrity, health/social-care governance and concern-raising interact. |
| University of Glasgow | Scotland | Annual statement hub | Long-run annual-statement hub | Current hub exposes 2024-2025 plus prior statements back to 2014-2015. |
| University of Edinburgh | Scotland | Annual research ethics and integrity reports hub | Combined ethics/integrity reporting | Existing pilot source and representative Scotland route. |
| Cardiff University | Wales | Research integrity and governance hub | Named senior lead, first contact, ORIEC and annual statements | Existing pilot source and representative Wales route. |
| Queen's University Belfast | Northern Ireland | Research integrity page and annual statements hub | Long-run annual statements from 2013-2014 onward | Existing pilot source and representative Northern Ireland route. |

Directory reading:

- The annual-statement corridor is real and broader than the first pilot sample.
- The directory should capture depth categories separately: named contacts only, aggregate counts, allegation categories, anonymized numbered rows, narrative case learning and full decisions if any are later found.
- A full dataset should preserve the statement year/reporting period and whether the source is a hub, PDF, HTML page or government list.
- The strongest source for bulk harvesting is still UKCORI's 2025 annual-statement analysis, but institution-level source URLs are needed to verify fields and retention.

### Funder and public-body matrix seed

| Route owner | Source checked | Route type | Publication or case-file status |
| --- | --- | --- | --- |
| UKRI research councils | UKRI policy on governance of good research practice, published 1 April 2026 | Funder assurance, reporting and grant-response route | No public individual case archive; employer normally investigates; UKRI can require reporting and respond within funding. |
| Research England | Supporting research integrity page | England funding condition and formal-investigation notification route | Notification and outcome reporting to Research England, not public case publication. |
| Medr | Research and innovation page | Wales research-culture and Concordat implementation route | Annual statement expectation for funded organisations; no public case archive found. |
| Scottish Funding Council | Research Assurance and Accountability Guidance 2025-26 | Scotland assurance-return route | Requires links to institutions' annual research integrity statements in assurance returns. |
| Department for the Economy Northern Ireland | Research culture and research-related concordats page | Northern Ireland funder-side Concordat route | Names senior oversight and first contact; concerns can be raised through DfE routes if needed. |
| Wellcome | Research misconduct policy, last updated 1 September 2025 | Charitable funder notification and sanction route | Confidential formal-investigation and final-report route; not a public case archive. |
| Cancer Research UK | Scientific conduct guidelines, updated 9 September 2024 | Charitable funder notification and sanctions route | Host institution must notify within one month of a formal investigation decision unless high-risk facts require immediate notice. |
| Royal Society | Grants policies and positions plus Research Misconduct Policy | Learned-society/funder integrity route | Host organisation investigates and reports allegations; no public case archive identified in this pass. |
| Government Office for Science and departments | GOV.UK Concordat implementation page | Government research annual-statement route | Public government annual statements and departmental contact list; useful non-HEI route corridor. |

### Boundary and repository extraction targets

- HRA research summaries: searchable project-summary database for REC-reviewed health and social-care studies. Public fields are study/project metadata and REC opinion filters, not misconduct findings.
- ASRU annual reports: annual non-compliance tables for animal research. Annex A of the 2024 report contains individual non-compliance case entries with action taken by ASRU. This is the strongest UK boundary case-file corridor located in this pass.
- HFEA latest clinic decisions: specialist licence decision list for fertility/embryology. Keep as a boundary decision list.
- GOV.UK government annual statements: centralized list of departmental annual research-integrity statements and contacts. Useful for non-HEI institutional directory expansion.
- Institutional annual statements: candidate structured dataset fields should include source URL, year, organisation type, named senior lead, first contact, procedure owner, allegation counts, formal investigations, upheld findings, allegation categories, anonymization level, narrative learning and retention/hub status.

### Stable dossier conclusions after this pass

- No change to the system type: the UK remains a Concordat-led, funder-reinforced, institutionally executed model.
- No national general misconduct decision archive was identified.
- The quality pass strengthens, rather than changes, the transparency reading: public visibility is best described as a broad annual-statement corridor, supplemented by confidential funder reporting and stronger boundary registers.
- ENRIO confirms the country-level structure but should remain a secondary comparison source behind UKCORI, UKRIO, UKRI, funder, institutional and boundary sources.

### Remaining extraction targets after the quality pilot

- Bulk index the annual-statement directory by year, institution, nation and depth category.
- Extract misconduct tables from Cambridge, UCL, Manchester, Nottingham, Warwick, Sheffield, Glasgow, Edinburgh, Cardiff and Queen's Belfast.
- Expand beyond universities into government departments, independent research organisations, NHS trusts, public sector research establishments, charities and cultural institutions.
- Add a deeper AWERB sample from institutions that publish animal-research openness reports or AWERB terms.
- Check whether 2026-2027 statements begin using the 2025 Concordat expectations consistently after the April 2026 transition.
