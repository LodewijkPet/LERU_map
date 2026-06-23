# LERU Public Output Audit

Status date: 2026-06-23

This audit records the completed Batch 1-5 public-output classification for all 24 official LERU member profiles in `data/leru-members.js`. It separates institution-owned local public output from national, regional, restricted, historical, boundary and procedure-only evidence.

## Category Counts

| Category | Count | Meaning |
| --- | ---: | --- |
| `local-output` | 13 | Institution-owned annual reports, anonymized summaries, report tables or decision/public-case corridors are visible. |
| `national-or-sector-output` | 4 | Public output is national, regional or sector-level context rather than an institution-owned output channel. |
| `procedure-only` | 5 | Public route/procedure evidence is visible, but no local public output channel was identified in this pass. |
| `restricted-or-internal-output` | 1 | Output appears restricted or internal; public material is route/governance evidence. |
| `historical-or-case-specific` | 1 | Public material is historical or case-complex specific, not a current standing output channel. |
| `boundary-only` | 0 | No member is currently coded as boundary-only. |
| `unclear` | 0 | All 24 records now have a standardized category and note. |

Report-status counts after Batch 5: 24 Detailed seed, 0 Partial seed, 0 coverage placeholders. The strict `annualReportOrCaseOutput === "available"` count remains 14 because Batch 4-5 upgrades are audit completions, not new standing local-output findings.

## Wording Rules

- "No public output identified" is not the same as absence of cases. It means no public institution-owned case-output, annual-statistics or anonymized summary channel was located in this pass.
- National, regional or sector aggregate output is not the same as local institutional output unless the source gives institution-specific counts, case summaries or decisions.
- Procedure visibility is not the same as transparency output. A public policy, ombudsperson page, referent page or regulation can prove the route without proving public case reporting.
- Ethics approval, training, open-science, anti-fraud, animal, data-protection, clinical-trial or HR pages are boundary or prevention material unless they are explicitly tied to research-misconduct handling.
- Historical case-complex pages should be described as case-specific historical transparency unless the source clearly functions as a current standing archive.

## Complete Audit Table

| Institution | Country | Category | Public-output wording | Evidence/audit basis | Remaining validation question |
| --- | --- | --- | --- | --- | --- |
| KU Leuven | Belgium | `local-output` | Local annual reports publish counts, categories and anonymized CWI advice summaries. | KU Leuven integrity route, CRI/reporting desk and annual-report hub. | Which annual-report fields should be indexed first by year, matter type and outcome? |
| University of Amsterdam | Netherlands | `local-output` | Local CWI annual-report evidence is present; row extraction remains pending. | UvA complaint route, complaints regulation and CWI annual report 2024. | Are earlier/later CWI annual reports available through the same route? |
| Universitat de Barcelona | Spain | `national-or-sector-output` | Public output is CIR-CAT regional institution-linked output, not a UB-owned archive. | UB ethics/integrity route and Code, plus CIR-CAT Recommendation 1/2025. | Should CIR-CAT output be shown as regional context or member-linked evidence in the final report? |
| University of Cambridge | United Kingdom | `local-output` | Local annual research-integrity reports include anonymized allegation and investigation information. | Cambridge report hub and misconduct-procedure page. | Which allegation-stage and outcome fields should be extracted across report years? |
| University of Copenhagen | Denmark | `local-output` | Local Practice Committee annual reports and minutes create a public output lane. | UCPH Practice Committee page, publication hub and 2024 annual report. | How should NVU-returned matters be separated from local QRP handling? |
| Trinity College Dublin | Ireland | `national-or-sector-output` | NRIF national aggregate statistics are public; no Trinity-owned output channel was identified. | Senior Dean/RIO route, Good Research Practice policy, Research Integrity support page and NRIF statistics. | Does Trinity publish local RI statistics, annual statements or lessons-learned notes outside the located pages? |
| University of Edinburgh | United Kingdom | `local-output` | Local annual research-integrity statements provide recurring public reporting. | Edinburgh annual-statement hub, current statement and misconduct route. | Which statement fields should be indexed by allegation count, investigation count and outcome? |
| University of Freiburg | Germany | `historical-or-case-specific` | Freiburg has historical sports-medicine/misconduct case-complex material, but no current standing output channel was identified. | Redlichkeit route, integrity regulation, Investigation Commission page and historical sports-medicine page. | Does Freiburg publish current annual ombudsperson/commission statistics or non-personal summaries? |
| University of Geneva | Switzerland | `procedure-only` | Scientific-integrity procedure and discretionary publication authority are visible, but no UNIGE-owned standing output channel was identified. | UNIGE RGO/research-ethics page, Memento directive, ethics charter and CUREG boundary route. | Does UNIGE publish aggregate integrity statistics, Rectorate summaries or anonymized learning material? |
| Heidelberg University | Germany | `procedure-only` | Procedure evidence is public and rules require anonymized annual reporting to the Rector, but no public output channel was identified. | Good Academic Practice hub, ombudsmen page, misconduct rules PDF and fair-conduct boundary statute. | Is any non-personal annual report, Rectorate summary or commission output publicly available? |
| University of Helsinki | Finland | `national-or-sector-output` | TENK national statement summaries are public after local processes; no Helsinki-owned output channel was identified. | Helsinki RI page, research-ethics page, TENK commitment list, TENK statement summaries and Helsinki annual-review retest. | Are any Helsinki-specific TENK summaries or local annual statistics publicly linked by the university? |
| Leiden University | Netherlands | `local-output` | Local CWI annual reports and advice/final-judgment pages provide public output. | Leiden committee pages, CWI annual reports and advice/final-judgment page. | How should Leiden University and LUMC chambers be indexed separately? |
| Imperial College London | United Kingdom | `local-output` | Local annual statements provide recurring public reporting and narrative case-learning. | Imperial misconduct page, annual statements and Research Integrity Framework. | How should the 2026 procedure update be monitored after implementation? |
| University College London (UCL) | United Kingdom | `local-output` | Local annual statements provide recurring public reporting and committee-analysis fields. | UCL Research Integrity page, statement archive, ethics policy and RIGEC route. | Where is the current full misconduct procedure best cited from? |
| Lund University | Sweden | `local-output` | Local Review Board annual-report evidence is present for the other-deviations route. | Lund good research practice pages, reporting page, 2025 annual report and guidelines. | Are pre-2025 or post-2025 local annual reports available for indexing? |
| University of Milan | Italy | `restricted-or-internal-output` | Ethics Committee opinions/minutes appear restricted; public material is governance/procedure context rather than case output. | Ethics Committee page/regulation, Code of Ethics and Research Integrity, research report and document-access mapping. | Does the committee president's annual Senate report or any Code-violation opinion appear publicly in non-personal form? |
| Ludwig-Maximilians-Universitat Munchen / LMU Munich | Germany | `procedure-only` | The 2023 GWP regulation is public and publication is discretionary after final decisions, but no standing output channel was identified. | LMU GWP regulation, Medical Faculty GWP resources and Graduate Center research-integrity training. | Is there a current non-personal ombudsperson or investigation-committee page with aggregate output? |
| University of Oxford | United Kingdom | `local-output` | Local annual statements provide anonymized allegations and outcomes. | Oxford annual research-integrity reports and 2024 statement. | Which allegation category, outcome and student research-work fields should be extracted? |
| Universite Paris-Saclay | France | `procedure-only` | POLETHIS/RIS procedure evidence is public; no Paris-Saclay-owned signalement statistics or case-output channel was identified. | POLETHIS RIS network, doctoral problems route, OFIS RIS directory and CER-PS ethics boundary rules. | Does Paris-Saclay publish annual RIS activity reports, non-personal signalement statistics or case-learning outputs? |
| Sorbonne University | France | `local-output` | Local scientific-integrity annual reports provide annual activity and signalement evidence. | Sorbonne RIS/delegation page and 2025 integrity annual report. | Which RIS, committee, ambassador and signalement fields should be extracted? |
| University of Strasbourg | France | `national-or-sector-output` | OFIS national synthesis is public context; no Strasbourg-owned RIS output channel was identified. | Strasbourg RIS referent page, ethics/deontology hub, OFIS RIS entry and OFIS 2022-2023 synthesis. | Does Strasbourg publish local RIS activity statistics, a procedure document or anonymized case summaries? |
| Utrecht University | Netherlands | `local-output` | Utrecht annual-report evidence and UNL sector case PDFs provide institution-linked public output. | Utrecht complaints regulation, 2024 annual report and UNL Utrecht case PDFs. | How should university-hosted reporting and UNL sector publication be separated in row extraction? |
| ETH Zurich | Switzerland | `local-output` | ETH has institution-owned anonymized investigation report and procedure-statistics tables. | ETH Integrity Commission page, anonymized report table and procedure-statistics table. | Which table fields should be normalized across report and procedure-statistics outputs? |
| University of Zurich | Switzerland | `procedure-only` | UZH procedure and contextual news evidence are public, but no UZH-owned standing output channel was identified. | UZH research-integrity route, ethics/integrity overview, persons page, annual-report hub and official news context. | Does UZH publish aggregate statistics, annual integrity reporting or anonymized case summaries outside contextual news? |

## Batch 5 Completion Notes

- Universite Paris-Saclay, LMU Munich, Heidelberg University, University of Zurich and University of Helsinki moved from Partial seed to Detailed seed because the route/procedure descriptions, output-negative wording, caveats, category notes and member-validation questions are now complete.
- These are audit upgrades. They do not add new institution-owned public case-output channels.
- Heidelberg is coded `procedure-only` even though the rules require general anonymized reporting to the Rector, because that located reporting is internal rather than public.
- Helsinki is coded `national-or-sector-output` because TENK statement summaries are a real national output channel, but the Helsinki member profile still has no local public output channel.
- UZH remains separate from ETH Zurich: ETH tables must not be generalized to UZH.
