# University of Freiburg member-feedback integration

Completed: 31 July 2026  
Technical access date: 31 July 2026  
Publication data cut-off: not changed by this batch

## Outcome

- Processed the University of Freiburg email and attached Word feedback, including 28 tracked revisions and five comments.
- Moved the current Freiburg public-output category from `historical-or-case-specific` to `procedure-only` on member validation.
- Retained the 2014-2015 and 2016-2017 Rector-report counts and the sports-medicine/doping misconduct page as historical context, not a current recurring reporting lane.
- Updated the lead local route to the Representative for Academic Self-Regulation and the Investigative Commission on Academic Integrity.
- Kept the Commission on Responsibility in Research, Ethics Committee, doctoral ombuds process and doctoral candidate survey separate from general misconduct-output coding.

## Official-source results

| Source | Result | Use |
| --- | --- | --- |
| Academic Integrity | Current English page; links the 2022 regulation and describes the academic self-regulation route. | Lead institutional procedure |
| Research Boards | Current English page; confirms the Investigative Commission and separately describes the responsibility-in-research and ethics boards. | Lead commission plus boundary separation |
| Good Research Practice | Current institutional policy/guidance hub. | Prevention and policy context |
| Ombuds Process for Doctoral Candidates and Supervisors | Current confidential supervision-conflict route; includes an anonymized ten-year activity report and redirects suspected misconduct to academic self-regulation. | Doctoral support boundary |
| Doctoral candidate survey | Current page with 2024 results and institutional follow-up. | Early-career and quality-culture context |

## Reconciled outputs

- `data/leru-members.js`
- `data/leru-extraction-log.csv`
- `data/source-registry.csv`
- `data/Germany/raw documentation/source notes/Germany deep-dive sources.md`
- `docs/status/LERU-REPORT-GAP-MATRIX.md`
- `docs/status/LERU-PUBLIC-OUTPUT-AUDIT.md`
- `docs/article/LERU-REPORT-PRODUCTION-GUIDE.md`
- `reports/project-overview.html`
- linked Overview outcome JSON and custom status page
- regenerated source manifest and derived counts

## Derived-count result

- Member validation: 8 processed / 16 open.
- Public-output categories: 12 local, 4 national/sector, 5 procedure-only, 2 restricted/internal, 1 historical/case-specific.
- Strict standing public-output evidence: unchanged at 14 of 24.
- Source registry: 1,596 unique rows.
- Evidence levels: 18 Strong, 6 Moderate.

## Validation

- JavaScript syntax: pass.
- Overview JSON parse: pass.
- Source-registry CSV: 1,596 rows and 1,596 unique IDs.
- LERU extraction-log CSV: pass; Freiburg is the latest entry.
- Generated member denominator and category-sum checks: pass.

## Remaining decisions

- The official Academic Integrity page currently labels the lead person “Representative for Academic Self-Regulation,” while the member attachment also uses “Ombudsperson for Academic Self-Regulation.” The profile uses the official current English page label.
- No external reply was sent. A short reply draft should explain that the earlier category came from the historical Rector counts and sports-medicine page, and confirm that the profile now uses the member-requested current procedure-only framing.
