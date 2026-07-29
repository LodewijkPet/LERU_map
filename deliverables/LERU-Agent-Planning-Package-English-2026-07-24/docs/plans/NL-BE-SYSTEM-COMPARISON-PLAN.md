# Netherlands-Belgium System Comparison Plan

Status date: 29 May 2026

## Purpose

Create the first dedicated system-comparison section of the app, starting with the Netherlands and Belgium.

The first version should be useful for research integrity officers, not a general audience ranking page. It should help an officer understand how two systems differ in practice: where a concern starts, who handles it, where second-line advice sits, what public evidence exists, which funder or institutional rules matter, and which adjacent regimes must stay separate from research misconduct handling.

This pilot should stay deliberately static until the product shape is good. After the Netherlands-Belgium page works as an expert comparison, the project can decide which fields should become dynamic and reusable across country pairs.

## Detailed Workflow Handoff

This pair plan is governed by the reusable workflow in:

- `docs/workflows/COUNTRY-PAIR-COMPARISON-WORKFLOW.md`

Future agents should use that workflow as the operating guide. The workflow deliberately splits the comparison into separate agentic tasks. When an agent is asked to do one task, it should complete only that task, stop, report the handoff, and name the next task.

The static NL-BE section already implemented in the app should be treated as a first pilot surface, not as the final detailed comparison. If the goal is to rebuild the comparison more systematically from all local papers, documentation and source notes, restart from the workflow task sequence and move step by step.

Recommended next strict workflow task:

- Task 1C: run the Netherlands quality gate.

After Task 1C is complete:

- Task 2A: complete a Belgium source-current sweep from the Belgium local source inventory.

## Granular Task Ledger

| Task | Status | Notes |
| --- | --- | --- |
| Task 0A: create or update pair plan | Completed | Pair plan exists and now points to the reusable workflow. |
| Task 0B: Netherlands local source inventory | Completed 29 May 2026 | Added `data/Netherlands/raw documentation/source notes/Netherlands comparison source inventory.md`; it inventories the local overview, source note, recursive app dossier links, transparency resources and 25 source-registry rows by route or boundary lane. No live refresh or comparison-page edit was made. |
| Task 0C: Belgium local source inventory | Completed 29 May 2026 | Added `data/Belgium/raw documentation/source notes/Belgium comparison source inventory.md`; it inventories the local overview, source note, recursive app dossier links, transparency resources and 30 source-registry rows by Belgium-wide, federal, Flemish, FWB, institutional and boundary lanes. No live refresh or comparison-page edit was made. |
| Task 1A: Netherlands source-current sweep | Completed 29 May 2026 | Added `data/Netherlands/raw documentation/source notes/Netherlands source-current sweep 2026-05-29.md`; it status-codes the important official Dutch sources for the comparison, keeps NGWI 2018 as the active baseline with a 2026 code watchpoint, confirms LOWI/UNL/VH/NWO/ZonMw route currency, and keeps boundary regimes separate. No app-data, transparency-layer, source-registry or comparison-page update was made. |
| Task 1B: Netherlands dossier update | Completed 29 May 2026 | Re-read `Netherlands source-current sweep 2026-05-29.md` against `data/countries.js` and `data/transparency.js`; no app-data, transparency-layer, source-registry, project-overview or comparison-page edit was needed because the current Dutch dossier already reflects the source-current findings. Added a dated Task 1B note to `data/Netherlands/raw documentation/source notes/Netherlands deep-dive sources.md`. |
| Task 1C: Netherlands quality gate | Completed for pilot; pending under strict workflow | Netherlands was marked comparison-ready for the first static page, with further field indexing still needed. The strict workflow still needs an explicit quality-gate answer using the Task 1A and Task 1B notes. |
| Task 2A: Belgium source-current sweep | Partly completed | 29 May 2026 check covered major comparison-readiness sources; the new workflow calls for every important source to be status-coded one by one. |
| Task 2B: Belgium dossier update | Completed for pilot | `data/countries.js`, `data/transparency.js`, source notes and registry were updated for the 29 May 2026 pilot. |
| Task 2C: Belgium quality gate | Completed for pilot | Belgium marked comparison-ready for first static page, with further field indexing still needed. |
| Task 3A-3G: section-by-section comparison | Not completed under the new workflow | The static page contains a first synthesis, but not a full axis-by-axis comparison note. |
| Task 4A-4B: general synthesis and app-ready content draft | Partly completed | First static content exists; a deeper synthesis should be redrafted after Tasks 3A-3G. |
| Task 5A: static app implementation | Completed for pilot | Static comparison section added to the app on 29 May 2026. |
| Task 5B: visual and usability check | Partly completed | Headless screenshots were checked; in-app browser or Playwright verification was not available at the time. |
| Task 6A-6B: officer review and dynamic readiness | Not started | Should wait until the deeper comparison content is complete. |

## Working Principles

- Compare systems by function, not by prestige or one overall score.
- Keep research misconduct, research ethics approval, funder compliance, employment discipline, data protection, IP, animal research, clinical trials, open science, quality assurance and research security in separate lanes.
- Treat public case visibility as one comparison dimension, not as a proxy for system quality.
- Show evidence confidence and missingness explicitly.
- Preserve the difference between handler, decision-maker, second-line body and publication owner.
- Prefer official sources and current local source notes before adding new online sources.

## Pilot Sequence

### Phase 1: Netherlands Data Quality Check

Status: pilot completed on 29 May 2026; strict workflow Tasks 0B, 1A and 1B are now complete. The next strict step is an explicit Netherlands quality gate.

Goal: make the Dutch dossier comparison-ready before it becomes one half of the page.

Start from:

- `data/Netherlands/Overview Netherlands.docx`
- `data/Netherlands/raw documentation/source notes/Netherlands deep-dive sources.md`
- Netherlands entry in `data/countries.js`
- Netherlands transparency entry in `data/transparency.js`
- existing LOWI, UNL, VH, NWO, ZonMw, NRIN and NGWI source links

Check and update:

- Source currency for LOWI opinions, LOWI regulations and latest LOWI annual report.
- UNL complaint-publication archive, especially 2025 and 2026 rows and linked files.
- Vereniging Hogescholen publication pages, including whether a 2026 page exists and how the 2022 and 2025 hbo files compare with the publication-format rule.
- NWO Scientific Integrity Desk page and latest annual-report material.
- ZonMw notification, compliance or sanction visibility.
- Current status of the Netherlands Code of Conduct for Research Integrity update expected in 2026.
- ENRIO Netherlands report and ENRIO membership evidence.
- Non-UNL LOWI affiliates such as Sanquin, RIVM, WODC, CPB, PBL, SCP, KiM and NKI for procedure pages and public-output traces.
- Boundary lanes: METC/CCMO, animal research, data protection, knowledge security, social safety and IP.

Output:

- Add a dated Netherlands quality-check note to the local source note.
- Update `data/countries.js` only where current evidence changes the summary, transparency block, route directory, timeline, source links or `nextFocus`.
- Update `data/transparency.js` if the country-level publication model changes.
- Update `data/source-registry.csv` for durable new sources.
- Run `node --check data/countries.js` and `node --check assets/js/app.js`.

Netherlands quality gate:

- The page may use the Netherlands only after the current code baseline, LOWI/UNL/VH/NWO public-output model, ENRIO status, main boundary warnings and remaining evidence gaps are explicit.

### Phase 2: Belgium Data Quality Check

Status: completed on 29 May 2026. The Belgian dossier is comparison-ready for a first static NL-BE page, with remaining work limited to VCWI/KU Leuven/UAntwerpen field extraction, broader institutional retesting and CSIS output monitoring.

Goal: make the Belgian dossier comparison-ready before it becomes the second half of the page.

Start from:

- `data/Belgium/Overview Belgium.docx`
- `data/Belgium/raw documentation/source notes/Belgium deep-dive sources.md`
- Belgium entry in `data/countries.js`
- Belgium transparency entry in `data/transparency.js`
- existing VCWI, CSIS, FWO, FNRS, PINDARE, KU Leuven, UAntwerpen and Belgian code source links

Check and update:

- VCWI annual-report hub and annual reports from 2013 through the latest available year.
- VCWI connected-institutions directory and second-advice procedure.
- KU Leuven annual-report hub, current CRI regulation and latest public case-summary fields.
- UAntwerpen CWI page and annual reports through the latest available year.
- UGent, UHasselt, VUB, imec, VIB, VITO, HOGENT, AP Hogeschool and other VCWI-recognized institutions for annual summaries or procedure-only visibility.
- CSIS/FWB route: FNRS page, CSIS regulation, CSIS output practice, accessibility and any annual report, anonymized opinion or recommendation page.
- PINDARE/CRef directory and FWB university CIS/CEIS routes.
- FWO, FNRS and BELSPO funder and federal-programme requirements.
- Belgium-wide 2009 Code of Ethics for Scientific Research, ALLEA 2023 use, and community-specific code references.
- Boundary lanes: FAMHP/CTIS, biomedical ethics committees, animal research, Belgian Data Protection Authority, research security, dual use, IP and open science.

Output:

- Add a dated Belgium quality-check note to the local source note.
- Update `data/countries.js` only where current evidence changes the federal-container/two-community reading, transparency block, route directory, timeline, source links or `nextFocus`.
- Update `data/transparency.js` if the country-level publication model changes.
- Update `data/source-registry.csv` for durable new sources.
- Run `node --check data/countries.js` and `node --check assets/js/app.js`.

Belgium quality gate:

- The page may use Belgium only after the federal-container, Flemish VCWI lane, FWB/CSIS lane, strongest public-output sources, main funder routes, boundary warnings and evidence gaps are explicit.

### Phase 3: First Comparison Page

Status: first static section implemented on 29 May 2026 in `index.html`, `assets/js/app.js` and `assets/css/styles.css`.

Goal: build a static Netherlands-Belgium comparison page or app section that officers can use immediately.

Recommended first location:

- Add a top-level app view or section labelled `System comparison`.
- Start with one hard-coded comparison: `Netherlands vs Belgium`.
- Keep the page content hand-authored from the quality-checked dossiers during this pilot.

Core page sections:

1. Officer brief
   - Five to eight high-signal bullets explaining the practical difference between the two systems.
   - Example focus: Netherlands as a code-driven, institution-first system with LOWI second-line advice and sector publication hubs; Belgium as a federal container with Flemish and FWB community lanes and stronger public case traces in Flanders.

2. Route ladder
   - Side-by-side lane view from first concern to possible public output.
   - Rows: informal advice, formal institutional complaint, first-line committee/advice, board or institutional decision, second-line advice, funder consequence, publication owner, appeal or external route if applicable.

3. Public evidence and case visibility
   - Compare LOWI, UNL, VH and NWO with VCWI, KU Leuven, UAntwerpen and CSIS/FWB.
   - Show format, depth, years covered, anonymization, retention or lifecycle, and what is not public.

4. Institutional implementation
   - Compare how local committees and advisers are organized.
   - Show whether the country relies on sector hubs, local annual reports, connected-institution directories or confidential local procedures.

5. Funder and grant-compliance routes
   - Compare NWO/ZonMw with FWO/FNRS/BELSPO.
   - Separate funder notification, grant consequences and audit duties from misconduct adjudication.

6. Code and norm baseline
   - Compare NGWI/ALLEA/LOWI documents with the Belgian 2009 code, ALLEA, VCWI/CSIS references and funder clauses.
   - Mark the Netherlands 2026 code-update watchpoint if still unresolved after the quality check.

7. Boundary regimes
   - Side-by-side table for clinical trials, biomedical ethics, animal research, data protection, IP, open science, knowledge security or research security, and quality assurance.
   - Each row should state whether it is a core misconduct route, boundary route or evidence context.

8. Practical officer questions
   - Where would an allegation normally start?
   - Who gives second-line advice?
   - Where can public precedent or statistics be found?
   - Which cases are likely to remain confidential?
   - What changes when a case involves a funder?
   - Which route handles clinical, animal, GDPR, IP or employment issues?
   - What should a foreign collaborator not assume?

9. Evidence confidence and gaps
   - Short quality panel for each country.
   - Fields: source-current date, primary-source strength, route coverage, public-output indexing depth, boundary separation, known gaps and next extraction target.

10. Source backbone
   - Curated links only, not every source.
   - Include the strongest route source, publication source, representative report or archive, main code source and main boundary warning source for each country.

## Comparison Dimensions

Use these dimensions as the stable content checklist:

- System type.
- Core normative baseline.
- First-line handler.
- Second-line or review body.
- Publication owner.
- Public case-output depth.
- Institutional route visibility.
- Funder role.
- Cross-sector or community split.
- Boundary-regime separation.
- Officer-facing practical implication.
- Evidence confidence.
- Current watchpoints.

## Data Quality Scorecard

Use labels rather than numeric scores:

- `Current`: checked in this pass against live or latest available official sources.
- `Mostly current`: core route checked, but one lower-priority lane remains to refresh.
- `Partial`: route exists but current source, publication practice or coverage remains uncertain.
- `Not found`: no official public source located in this pass.
- `Boundary only`: useful evidence, but not a general research-misconduct route.

The page should avoid a single combined quality score. A transparent publication ladder is not the same thing as a better integrity culture, and a confidential route is not automatically a weak route.

## First Static Data Shape

Do not design the final dynamic schema yet. For the first build, either:

- hard-code the Netherlands-Belgium comparison in the app section, or
- create a small `data/comparisons.js` file with one object only.

If a data file is used, keep it close to the page sections:

```js
{
  id: "netherlands-belgium",
  title: "Netherlands and Belgium",
  audience: "Research integrity officers",
  countries: ["netherlands", "belgium"],
  sourceDate: "Exact date of completed comparison pass",
  officerBrief: [],
  routeLadder: [],
  publicEvidence: [],
  boundaryRows: [],
  practicalQuestions: [],
  confidence: [],
  sourceBackbone: []
}
```

This object should be treated as a prototype, not a commitment to the eventual dynamic model.

## Definition Of Done

The pilot is done when:

- Netherlands has a fresh quality-check note and any needed app data updates.
- Belgium has a fresh quality-check note and any needed app data updates.
- The comparison page answers officer-facing questions without requiring the user to read both full country dossiers.
- The page clearly distinguishes public case visibility from system quality.
- The page keeps boundary regimes separate.
- The page links to the strongest official sources for every major comparison claim.
- `node --check data/countries.js` passes.
- `node --check assets/js/app.js` passes.
- If a new data file is added, `node --check` passes for that file as well.

## Later Dynamic Investigation

Only after the static pilot is reviewed, decide whether to generalize:

- country-pair selector
- reusable comparison axes generated from `data/countries.js`
- separate `data/comparisons.js`
- reusable route-ladder component
- reusable source-confidence panel
- comparison export or print view
- filters for officer type, funder officer, institutional officer, national body, or policy analyst

The dynamic version should be based on what proved useful in the Netherlands-Belgium pilot, not on assumptions made before the first comparison is read by users.
