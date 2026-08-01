# LERU priority-member source-current results

Technical access date: 2026-07-30

This is the first bounded batch under p-leru-source-current-verification. It covers seven high-priority LERU member profiles and does not set the report publication cut-off.

## Batch result

- Seven of seven member profiles received a completed route, procedure, output and boundary-control check.
- The final technical audit covered 44 current profile-linked sources: 31 directly accessible, 12 redirected-accessible and one HTTP error.
- The one HTTP error was the official Legifrance Research Code page returning HTTP 403 to the scripted client. It remained an official browser-accessible source and was not treated as absent.
- The source manifest now contains 2,216 unique URLs, including 2,053 report-critical sources. The source registry contains 1,585 rows with 1,585 unique IDs.
- The strict standing public-output field remains 14 of 24 members.
- Public-output categories now total 12 local, 4 national or sector, 4 procedure-only, 2 restricted or internal and 2 historical or case-specific.

## Report-relevant corrections

| Member | Result | Report implication |
| --- | --- | --- |
| University of Geneva | Memento 0003 is current as Version 3; its 5 September 2025 entry changes only a Swiss-code footnote. No standing output was located. | Retain procedure-only; cite the current version without implying a substantive 2025 procedure revision. |
| University of Strasbourg | The referent route remains current. The HRS4R strategy URL moved to HREIR. No local output was located. | Retain national-or-sector-output; keep Ofis output national and HREIR as prevention context. |
| University of Freiburg | Historical Rector reports record 19 completed procedures plus three new cases in 2014-2015 and 51 centrally pending matters over the three-year term ending 30 September 2017, including 39 involving the Commission and 28 examined by the self-control officer. | Retain historical-or-case-specific, now supported by aggregate Rector reporting as well as case-specific material; do not imply current annual reporting. |
| Trinity College Dublin | The current hub-linked and former policy URLs returned byte-identical Version 1.1 PDFs. No Trinity-owned RI output was located. | Retain national-or-sector-output; NRIF remains national context. Exclude the Senior Lecturer student-discipline table. |
| Universite Paris-Saclay | POLETHIS/RIS remains current; no local RIS activity or case output was located. | Retain procedure-only; CER-PS stays in the research-ethics boundary. |
| LMU Munich | A current central Ethics in Research hub was added. Two official regulation URLs returned byte-identical 17 November 2023 PDFs. | Retain procedure-only; the hub improves route visibility but does not create public output. |
| Heidelberg University | A public 2019 Senate Commission interim summary was located; the final Commission report remained internal. | Correct procedure-only to historical-or-case-specific; keep the strict standing-output count unchanged. |

## PDF verification

The source PDFs were downloaded only to tmp/pdfs/2026-07-30-priority-members, text-extracted and selectively rendered for visual verification.

- Freiburg 2014-2015 Rector report, printed pages 26-27: 19 completed procedures and three newly received cases.
- Freiburg 2016-2017 Rector report, printed pages 42-45: 51 centrally pending matters over the three-year term, 39 involving the Investigation Commission, 28 examined by the self-control officer, 40 of 51 concerning qualification work and 36 of 51 from medicine.
- Trinity Senior Lecturer Annual Report 2023-2024, page 44: the Research Misconduct row sits inside Appendix VIII, Examination Infringement and Plagiarism, with Office of the Junior Dean data; it is outside the College RIO evidence lane.
- Trinity policy: the current and former URLs returned byte-identical 26-page PDFs.
- LMU regulation: the two official URLs returned byte-identical 20-page PDFs.
- Heidelberg rules: version of 28 September 2021; annual anonymised reporting to the Rector is internal and the Commission report is not published.

## Source-state reconciliation

- Ordinary trailing-slash redirects were recorded but do not change substance.
- Strasbourg HRS4R -> HREIR and Heidelberg Graduate Academy -> Ombuds Program are meaningful moved-page reconciliations.
- Trinity's current Research assets policy link redirects to the former Media URL; byte identity was verified and both URLs remain in the audit trail.
- A redirect was never treated as substantive equivalence without checking the destination or document.
- A failed search or technical HTTP error was never treated as evidence that a source, route or case does not exist.

## Files with canonical updates

- data/leru-members.js
- data/leru-extraction-log.csv
- data/source-registry.csv
- Switzerland, France, Germany and Ireland country source notes
- docs/status/LERU-REPORT-GAP-MATRIX.md
- docs/status/LERU-PUBLIC-OUTPUT-AUDIT.md
- regenerated source manifest and derived-count outputs

The next bounded source-current batch is the eleven regular-priority LERU member profiles. Member validation remains required for the seven public-source interpretations in this batch.
