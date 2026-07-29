# Netherlands source-current sweep

Task: NL-BE comparison workflow Task 1A, Country A source-current sweep.

Status date: 29 May 2026.

This sweep checks the official live sources that are material to a final Netherlands-Belgium comparison claim. It does not update `data/countries.js`, `data/transparency.js`, the source registry, or the comparison page. Those changes belong to Task 1B if the status findings below are accepted.

## Scope

Priority sources came from `Netherlands comparison source inventory.md` and the existing 29 May 2026 comparison-readiness note. The sweep focused on the Dutch national code baseline, LOWI, UNL and VH public-output lanes, NWO and ZonMw funder routes, selected institutional/public-institute route seeds, and boundary sources that are likely to appear in the officer-facing comparison.

The larger app-only institutional directory was not refreshed one institution at a time in this task. It should remain supporting background unless Task 1B or a later comparison section uses a specific institution for a final claim.

## Status Codes Used

- `current`: official source is live and still supports the local claim.
- `newer version found`: source points to a later version than the local baseline.
- `moved`: source has a changed official location.
- `broken or inaccessible`: source did not resolve through the tested route.
- `superseded`: source remains visible but should not carry the current claim.
- `historical but still relevant`: source is older but still useful for context or chronology.
- `duplicate`: source duplicates a better current source.
- `not official enough`: source should not be used as a backbone source.
- `boundary only`: source is current but belongs outside the research-misconduct route.

## Source-Current Table

| Route family | Local source or row | Live official check | Status | Dossier impact for Task 1B | Comparison impact |
| --- | --- | --- | --- | --- | --- |
| National code | `NL-S013` NWO-I code page | Live NWO-I page still presents the 2018 Netherlands Code of Conduct for Research Integrity and says a new code is expected in 2026. | `current` with watchpoint | Keep 2018 as active baseline until a final 2026 code is located. | Do not replace the Dutch code baseline yet. |
| National code | `NL-S014` NWO-I consultation news | Live 28 September 2025 consultation page confirms draft update process and expected entry into force in early 2026. | `historical but still relevant` | Keep as revision-process evidence, not as current code text. | Use only as code-transition context. |
| National code | KNAW `Doorontwikkeling Nederlandse Gedragscode Wetenschappelijke Integriteit` | Official KNAW page resolved by HTTP status check; content markers include the 2018 code, revision wording and 2026. Search results also show this as an in-development 2026 KNAW item. | `current` with access limitation | If Task 1B edits code wording, cite NWO-I as the readable current source and KNAW as the official penholder/update page. | Final comparison should include a clear code-watchpoint. |
| National code | NWO code page | Official NWO page resolved by HTTP status check; markers include 2018 and 2026. | `current` with access limitation | Useful cross-check only; NWO-I page is easier to cite. | No substantive change. |
| LOWI body | `NL-S001` LOWI about page | Live page lists LOWI history, current composition, foundation board, advisory council, affiliated institutions and annual reports through 2024. | `current` | If dossier states an affiliate count, prefer the live LOWI page over ENRIO's older count. | Confirms LOWI is broader than UNL/NWO/KNAW but still second-line. |
| LOWI body | ENRIO country report `NL-S010` | Live ENRIO report remains last updated April 2024 and describes LOWI as second-line with institutional first-line handling. | `historical but still relevant` | Keep as secondary cross-check; do not use ENRIO counts as current membership evidence. | Supports layered Dutch model, but not source-current detail. |
| LOWI membership | ENRIO members page `NL-S011` | Live ENRIO members page lists LOWI and NRIN, but uses an older affiliated-institution count than the LOWI page. | `current` for ENRIO membership; `historical but still relevant` for affiliate count | Use only for ENRIO membership and NRIN/LOWI distinction. | Supports NRIN as training/exchange, not a complaint handler. |
| LOWI regulations | `NL-S002` LOWI Regulations 2022 | Live PDF accessible; LOWI documents page still lists the 2022 regulations as current, with 2018 retained for pre-1 February 2022 petitions. | `current` | No update unless app uses more detail from the regulation. | Confirms second-line petition model and publication rules. |
| LOWI process | `NL-S016` LOWI process information | Live page includes 2026 hearing dates, six-week petition timing, first-line prerequisite and exclusions for scientific controversy, labour, civil, administrative and criminal disputes. | `current` | Keep boundary-exclusion wording prominent. | Strong officer-facing distinction between misconduct and adjacent disputes. |
| LOWI annual report | `NL-S003` 2024 annual report | Live LOWI about/documents pages list 2024 as the latest annual report; no LOWI 2025 annual report located. | `current` | 2024 remains annual-report extraction target. | Do not infer 2025 annual statistics. |
| LOWI opinions | `TR-NL-001` and `NL-S017` | Live English archive exposes 2026 decisions and advisory opinions, including 2026-08, 2026-05, 2026-04, 2026-03, 2026-02 and 2026-01. | `current`; duplicate registry purpose | Reconcile duplicate use later: transparency row can remain broad, `NL-S017` can carry 2026 source-current detail. | LOWI 2025-2026 full-field indexing remains the first Dutch extraction target. |
| UNL procedure | UNL scientific-integrity page | Live page still states the 2018 code, CWI/confidential-counsellor first line, board decision, LOWI step, public publication overview and annual-report duty. | `current` | No change except source-current date if Task 1B refreshes source links. | Confirms universities are the first-line handlers. |
| UNL publication hub | `NL-S004` archive | Live archive states anonymized publication since 2005 and six-week publication after final board decision from 2014 onward; year links through 2026 are present. | `current` | No change. | Strong Dutch university-sector transparency lane. |
| UNL 2026 rows | `NL-S015` 2026 page | Live 2026 page still has two rows: Utrecht University peer-review independence and Radboud University data fabrication/manipulation. | `current` | Keep two-row current-year statement until later row indexing finds additions. | Confirms 2026 lane continuity, not a full-year count. |
| VH hub | Generic 2022 VH complaints page | Live page remains a hub linking the 2022 and 2025 hbo pages and the publication format. | `current`; `duplicate` for current-year claim | Use as hub/background, not as the latest case page. | HBO lane remains visible but less deep than UNL. |
| VH 2025 | `NL-S005` 2025 case page | Live 2025 page has two downloads: Saxion and Hogeschool Utrecht. Direct test for a 2026 URL returned 404, and official search found no 2026 page. | `current` | 2025 remains latest hbo case page located. | Do not claim a 2026 hbo page exists. |
| VH format | `NL-S006` publication format PDF | Live December 2022 PDF sets publication fields, anonymisation, six-week publication timing and ten-year retention. | `current` | No change. | Useful comparison against UNL format and Belgium public-output practice. |
| VH sector context | `NL-S024` research culture page | Live page confirms VH as NGWI co-author, LOWI member, publication owner for grounded complaints, and NRIN supporter. | `current` | No change. | Confirms hbo route is sector-backed but not a separate national board. |
| NWO funder route | `NL-S007` NWO scientific integrity | Official NWO page resolved by HTTP status check; still identifies the Scientific Integrity Desk as a safety-net function and links annual reports through 2024. | `current` | No 2025 report located; keep 2024 annual report as target. | NWO is a funder safety net, not a general national case archive. |
| NWO annual report | `NL-S008` 2024 desk report | NWO source still exposes 2024 as latest visible annual report; searches found no 2025 desk annual report. | `current` | Keep 2024 as latest funder reporting source. | Do not infer current 2025 desk counts. |
| ZonMw funder route | `NL-S009` laws and regulations | Live page now explicitly includes 2026 grant terms, integrity notification and document-handover duties. | `current`; newer 2026 terms already present as `NL-S018` | No change unless Task 1B tightens funder wording. | ZonMw remains compliance/funder evidence, not a misconduct publication archive. |
| ZonMw terms | `NL-S018` 2026 terms | Live official page states the 2026 terms apply to grant applications from 1 January 2026. | `current` | Keep. | Current funder baseline for the comparison. |
| ZonMw FAIR data | App-only FAIR/data page | Live page links research integrity, data management, personal data, human tissue and ownership/collaboration. | `boundary only`; `current` | Add to source registry only if data/IP/open-science boundary gets explicit comparison treatment. | Keep separate from misconduct adjudication. |
| UvA route/report | `NL-S019` 2024 CWI annual report and UvA route pages | Search and live PDF confirm 2024 CWI annual report; no 2025 CWI annual report located. UvA route page points to 2024 and 2021-2023 reports. | `current` | 2024 remains local annual-report seed. | Use as institutional reporting example, not as national rule. |
| RIVM route | `NL-S020` RIVM scientific integrity | Live route confirms NGWI/ALLEA baseline, confidential adviser, independent CWI, Director-General decision and LOWI escalation. | `current` | No change. | Strong non-UNL LOWI-affiliate route seed. |
| RIVM output trace | `NL-S021` wind-turbine factsheet | Live page still describes CWI handling, LOWI procedural advice and a resulting procedure adjustment; factsheet updated January 2025. | `current` | Keep as micro-publication, not an archive. | Useful example of public-institute trace visibility. |
| Sanquin route | `NL-S022` research code | Live page confirms Sanquin's research code, independent ombudsperson route and LOWI affiliation. | `current` | No change. | Specialist-health route seed remains valid. |
| Prinses Maxima route | `NL-S023` scientific integrity | Browser view is sparse, but official search cache and linked PDF confirm NGWI endorsement, complaints regulation, committee and confidential advisers. | `current` with access limitation | Keep as route seed; cite linked regulation if detailed procedure is needed. | Valid specialist-centre example, but not public case-output evidence. |
| KNAW institute route | App-only KNAW complaints procedure | Official URL returned HTTP 200 and content markers for the complaints procedure and committee. Browser view is blocked by JavaScript challenge. | `current` with access limitation | If used in final comparison, extract details with a rendered/browser method or cite local source cautiously. | Confirms public-institute route but lower priority than RIVM. |
| CCMO boundary | About CCMO and accredited MRECs | Live CCMO pages confirm WMO basis, participant-protection mission, 10 accredited MRECs and annual-report route. | `boundary only`; `current` | Keep as biomedical/clinical boundary. | Do not merge with CWI/LOWI misconduct route. |
| Animal research boundary | CCD and Rijksoverheid animal-testing rules | Live CCD page confirms central authority and 2025 annual report news; government page confirms NVWA institutional licence, CCD project licence, DEC advice and IvD duties. | `boundary only`; `current` | Update boundary wording only if Task 1B expands animal lane. | Separate project-licence/animal-welfare regime. |
| Data-protection boundary | Autoriteit Persoonsgegevens / CCMO / ZonMw | AP site is partly tool-restricted; one AP page on EDPB COVID research guidance is readable, AP oversterfte page appeared in official search, and CCMO/ZonMw pages supply current research-data context. | `boundary only`; partly access-limited | Add a dedicated AP or CCMO data-protection source only if the comparison table uses this lane. | Data protection is not research-misconduct adjudication. |
| IP boundary | RVO/Netherlands Patent Office | Live RVO pages confirm the Netherlands Patent Office role, patents/IP guidance, and scientist/student patent information. | `boundary only`; `current` | Add source-registry row only if IP lane is included in Task 1B/3. | IP/commercialisation disputes stay outside core misconduct unless an integrity source routes them in. |
| Knowledge-security boundary | RVO National Contact Point | Live RVO page is current enough for the boundary: it says Dutch knowledge institutions have knowledge-security duties since 2022 and routes questions through the contact point. | `boundary only`; `current` | No change unless comparison includes research-security lane. | Keep separate from misconduct handling. |
| Social-safety boundary | KNAW social-safety report and WetenschapVeilig launch | KNAW URL returned HTTP 200 but browser view is blocked; NWO-I WetenschapVeilig launch page remains readable as historical context. | `boundary only`; `historical but still relevant` | Do not use as current misconduct route. | Use only for adjacent-regime warning. |

## Key Findings

- No final 2026 replacement for the Netherlands Code of Conduct for Research Integrity was located in this sweep. The active comparison baseline should remain the 2018 code, with a prominent 2026 update watchpoint.
- LOWI remains current as a second-line advisory route after an institutional first-line decision. The live LOWI pages are better current evidence than ENRIO for composition, affiliate names and annual-report availability.
- LOWI's live opinions archive is active into 2026. This strengthens the public-output comparison lane but also reinforces the need to field-index 2025-2026 opinions before making granular outcome claims.
- UNL's university-sector archive remains active and has a live 2026 page with two rows as of this sweep. VH has no official 2026 case page located; the 2025 page and 2022 format remain the current hbo evidence.
- NWO remains a safety-net funder route, not a national misconduct archive. No 2025 NWO Scientific Integrity Desk annual report was located; 2024 remains the latest visible desk-report target.
- ZonMw's 2026 terms are current and useful for funder-compliance obligations, but no public ZonMw misconduct case archive was identified.
- RIVM, Sanquin and Prinses Maxima remain valid non-UNL LOWI-affiliated route seeds. RIVM is the strongest public-output trace among these because the wind-turbine factsheet describes a CWI/LOWI sequence and procedure adjustment.
- Boundary routes are current enough for separation work: CCMO/MRECs, animal research, data protection, IP, knowledge security and social safety should remain outside the CWI/LOWI misconduct lane unless a source explicitly routes a matter through the research-integrity procedure.

## Source-Registry Notes For Later

- Do not add registry rows in Task 1A. This task only status-coded sources.
- `TR-NL-001` and `NL-S017` duplicate the LOWI opinions archive. This can be retained if `TR-NL-001` remains a transparency-layer row and `NL-S017` remains the 2026 comparison-readiness row, but Task 1B should explain that distinction or consolidate future references.
- Candidate source-registry additions if Task 1B or Task 3 uses these lanes: CCMO accredited MRECs, CCD homepage or animal-testing rules, RVO patents/IP, RVO Knowledge Security Contact Point, and a dedicated AP/CCMO research-data source.

## Task 1B Handoff

Task 1B should be narrow. Recommended updates:

- Refresh Netherlands dossier/source-note wording only where it still implies the 2026 code has entered force, that a 2026 VH case page exists, or that ENRIO affiliate counts are current.
- Keep 2018 NGWI as the current normative baseline and add a source-current watchpoint that the revised code is still in development/expected in 2026.
- Preserve LOWI as second-line, UNL/VH as sector publication owners, and NWO/ZonMw as funder/compliance lanes.
- Do not widen the comparison synthesis until Tasks 1B and 1C have closed the Dutch quality gate.

## Next Strict Task

Task 1B: update the Netherlands dossier and local source notes from this source-current sweep.
