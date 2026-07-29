# Inventory of Agent Plans and Project Instructions

Inventory date: 24 July 2026

## Purpose and Scope

This document collects the repository-local plans, instructions, workflows, checklists, status-driven follow-up actions, and audit trails that agents use when processing information in the **Research Integrity Systems in Europe / LERU Integrity Map** project.

The inventory covers instructions explicitly stored in this project repository. General platform, model, or runtime instructions outside the repository are not included.

Companion documents:

- [Dutch version of this inventory](AGENT-PLANS-AND-INSTRUCTIONS-INVENTORY.md)
- [Guide to designing effective Agent plans](../plans/AGENT-PLAN-DESIGN-GUIDE.md)

## Executive Summary

Agent guidance in this project is not contained in a single plan. It is a layered system:

| Layer | Number / coverage | Function |
| --- | ---: | --- |
| Standing agent handoff | 1 | General project goals, fixed working method, data schema, source rules, quality criteria, and priorities |
| Formal research protocol | 1 | Research design, variables, source hierarchy, missingness, quality assurance, and analysis plan |
| Explicit plan files | 4 | Active quality phase, timeline feature, Netherlands-Belgium comparison, and LERU member environment |
| Execution workflows | 3 | Case-file research, country-pair comparison, and LERU institution extraction |
| Current status and gap documents | 4 | Progress, implementation limitations, validation agenda, and prioritized follow-up |
| Project tracker | 1 | Project-wide status, country table, current focus, and next work |
| Extraction status file | 1 | Coverage of overview documents and registration layers |
| Country source notes | 53 files for 49 countries | Working notes, search trails, negative findings, quality checks, and “gaps for next pass” |
| Embedded country microplans | 49 `nextFocus` fields | The next concrete action for every country |
| Embedded LERU microplans | 24 `nextFollowUp` fields | The next concrete action for every LERU institution |
| LERU validation questions | 110 questions across 22 institutions | Targeted prompts for member validation |
| Audit and provenance files | 4 principal logs/registries | Traceability of sources, overview extraction, transparency extraction, and LERU extraction |
| Technical operating instructions | 1 | Starting and locally checking the static app |

Live counts on 24 July 2026:

- 49 country records: 40 `Deep dossier drafted` and 9 `Expanded overview dossier`;
- all 49 countries have a populated `nextFocus`;
- 35 explicit transparency records, supplemented by runtime defaults;
- 1,568 entries in the current source registry;
- 40 overview extraction log rows;
- 50 transparency extraction log rows;
- 33 LERU extraction log rows;
- 24 LERU member profiles.

## 1. Standing Agent Handoff

### `AGENTS.md`

Status: the principal general project instruction.

Use it when:

- adding a new country;
- deepening an overview into a full dossier;
- carrying out a final sweep;
- updating project data and the tracker after completing a pass.

The handoff contains:

1. **Project goal**
   - Build and maintain a source-linked overview of European research-integrity systems.
   - Compare national bodies, institutional procedures, funders, public case output, and adjacent regimes.

2. **Current project state**
   - Country and dossier coverage.
   - Special cases.
   - Completed pilots and current priorities.

3. **Standard workflow for one country**
   1. Start with `data/<Country>/Overview <Country>.docx`.
   2. Inspect the local country folder and source notes.
   3. Expand with official online documentation.
   4. Model the country as a system rather than as a document collection.
   5. Update `data/countries.js`.
   6. Update `reports/project-overview.html`.
   7. Run at least the required JavaScript syntax checks.

4. **Fixed source order**
   1. national legislation databases;
   2. ministries;
   3. national integrity, ethics, or quality bodies;
   4. academies;
   5. funders;
   6. universities and public research institutes;
   7. biomedical ethics bodies;
   8. data-protection authorities;
   9. intellectual-property authorities;
   10. animal-research and clinical-trial authorities.

5. **Required dossier structure**
   - Core fields for every country.
   - `transparency` and `dossierDetails` for a deep dossier.
   - Fixed structures for `systemMap`, `networkLayers`, `integrityCommittees`, `evidenceCategories`, `boundaries`, `timeline`, and `sourceLinks`.

6. **Quality definition**
   - State clearly whether the system is national or distributed.
   - Separate research integrity from adjacent regimes.
   - Identify the strongest national and institutional routes.
   - Include funders, a timeline, and an official source backbone.
   - Explicitly record missing or inaccessible evidence.

7. **Fixed boundary rules**
   - Misconduct is not the same as research-ethics approval.
   - Case handling is not the same as quality assurance.
   - Funder monitoring is not the same as adjudication.
   - Student academic integrity is not the same as research integrity.
   - Data protection, IP, whistleblowing, employment, and anti-corruption remain separate lanes unless the source explicitly joins them.

8. **Stage labels and definition of done**
   - Use `Deep dossier drafted` only when the record genuinely contains a system map, network layers, committee directory, boundaries, timeline, and source backbone.
   - After a country pass, update data, tracker, and relevant registries/logs; run syntax checks; and reread committee and transparency wording.

9. **Working style**
   - Prefer conservative additions.
   - Reuse existing data shapes and established wording.
   - Write analytically rather than promotionally.
   - Use precise dates.
   - Mark uncertainty as a gap.

Source: [`AGENTS.md`](../../AGENTS.md)

## 2. Formal Research Protocol

### `protocol/index.html`

Status: **draft protocol / working scaffold**, not the current operational task board.

The protocol expresses the project as a reproducible mapping study:

- design: descriptive cross-sectional mapping with longitudinal versioning;
- primary unit: country or jurisdiction, with nested organizations and governance actors;
- core outcome: presence, scope, maturity, and transparency of infrastructure;
- source principle: every coded observation must lead to a retrievable source;
- data model: separate entities, observations, sources, variables, and extraction decisions;
- missingness labels: `not_found`, `not_applicable`, `unclear`, `source_inaccessible`, `translation_pending`, and `requires_expert_confirmation`;
- quality assurance: calibration, dual extraction for priority variables, adjudication, and confidence per observation;
- analysis: descriptive tables, governance typologies, transparency outputs, and gap reports.

Protocol source hierarchy:

| Tier | Source type | Normal use |
| --- | --- | --- |
| S1 | Legal or statutory source | Mandates, powers, obligations, and appeals |
| S2 | Official national body | Structure, procedure, annual reporting, and guidance |
| S3 | Institutional or funder policy | Local implementation, reporting routes, and training |
| S4 | Scholarly or grey literature | Search discovery and triangulation |
| S5 | Media, blog, or third party | Signal only; formal coding requires confirmation |

Protocol workflow:

1. scope the country;
2. search for sources;
3. screen sources;
4. extract variables;
5. adjudicate disagreements;
6. lock the dataset.

Important warning: the protocol explicitly states that its tables and URLs are placeholders. They must not be used as current country findings.

Source: [`protocol/index.html`](../../protocol/index.html)

## 3. Explicit Plan Files

### 3.1 Active Project-Wide Plan: `NEXT-PHASE-QUALITY-PLAN.md`

Status: the active project phase according to the tracker.

Purpose: move from broad first-pass collection to defensible, current, and comparison-ready dossiers.

Seven workstreams:

1. **Source Currency Sweep**
   - Check the latest law, code, procedure, annual reports, funder terms, institutional examples, and boundary sources.
   - Record moved, missing, superseded, or inaccessible sources.

2. **ENRIO Cross-Check**
   - Record whether an ENRIO country report and ENRIO member or affiliate exist.
   - Use ENRIO as a comparison layer, not as a replacement for primary sources.

3. **Code of Conduct Matrix**
   - Identify national, academy, funder, sector, and institutional codes.
   - Record use of ALLEA 2023 and the integrity topics covered.

4. **Committee and Institution Directory**
   - Normalize national, institutional, funder, and boundary routes.
   - Capture route owner, scope, output status, archive/report source, and boundary warning.

5. **Public Output and Case-File Repository Indexing**
   - Index owner, years, format, searchable fields, allegation types, outcomes, anonymization, lifecycle, and accessibility.

6. **Missing Overview and Representation Completion**
   - Produce formal overviews for nine countries.
   - Decide whether Vatican City should be represented.

7. **Data Hygiene and App Consistency**
   - Update country data, tracker, agent handoff, source registry, and relevant logs.
   - Run syntax checks.

Definition of done for the phase:

- every country has a current-source check date;
- ENRIO status;
- main-code status;
- a route directory covering national, institutional, funder, and boundary routes;
- a clear public-output assessment;
- durable source-registry entries;
- explicit missingness.

Source: [`docs/plans/NEXT-PHASE-QUALITY-PLAN.md`](../plans/NEXT-PHASE-QUALITY-PLAN.md)

### 3.2 Product and Architecture Plan: `LERU-MEMBER-ENVIRONMENT-PLAN.md`

Status in the document: originally “exploratory planning only.” The recommended V1 has since been largely implemented, so the document now mainly serves as an architecture and privacy handoff.

Core choices:

- a standalone page at `leru/index.html`;
- a dedicated data layer in `data/leru-members.js`;
- a static, public-safe lookup environment;
- no fake authentication or hidden private data in client-side files;
- populate profiles only with verifiable public institutional evidence;
- do not confuse country-level conclusions with institution-level routes.

The plan contains:

- an inventory of the existing app architecture;
- three architecture options and a recommendation;
- proposed V1 sections;
- a proposed data schema;
- exact file changes;
- privacy and authentication limitations;
- verification checks;
- open decision questions;
- a ready-to-use implementation prompt.

Source: [`docs/plans/LERU-MEMBER-ENVIRONMENT-PLAN.md`](../plans/LERU-MEMBER-ENVIRONMENT-PLAN.md)

### 3.3 Pair-Specific Control Plan: `NL-BE-SYSTEM-COMPARISON-PLAN.md`

Status: execution ledger for the first country comparison.

Functions:

- define audience and comparison purpose;
- track status task by task;
- define quality gates for the Netherlands and Belgium;
- guide the static comparison page;
- postpone dynamic generalization until the static pilot has been reviewed.

Working principles:

- compare systems by function, not prestige;
- do not use a single combined country ranking;
- distinguish handler, decision-maker, second-line body, and publication owner;
- treat public case visibility as one dimension rather than overall system quality;
- separate boundary regimes;
- show confidence and missingness.

Important status nuance: Task 1C is recorded as “completed for pilot; pending under strict workflow.” This is intentional. The pilot already used the Netherlands, but the later strict workflow still requires a formally recorded quality gate.

Source: [`docs/plans/NL-BE-SYSTEM-COMPARISON-PLAN.md`](../plans/NL-BE-SYSTEM-COMPARISON-PLAN.md)

### 3.4 Feature Plan: `TIMELINE-MAP-FEATURE-PLAN.md`

Status in the plan: “planned feature”; current progress: partially implemented.

The plan contains:

- analytical and narrative objectives;
- cumulative development map;
- event playback;
- callouts and leader lines;
- timeline rail, side panel, filters, search, and story modes;
- comparison, regional views, and a milestone matrix;
- derived event model;
- normalization of dates, categories, levels, and confidence;
- six implementation phases;
- accessibility, reduced motion, and mobile behavior;
- risks and mitigations;
- MVP, preferred release, and verification checklist.

Implementation phases:

1. data audit and normalizer;
2. static timeline tab;
3. playback and callouts;
4. filters and story modes;
5. comparison views;
6. quality polish.

Source: [`docs/plans/TIMELINE-MAP-FEATURE-PLAN.md`](../plans/TIMELINE-MAP-FEATURE-PLAN.md)

## 4. Execution Workflows

### 4.1 `CASE-FILE-WORKFLOW.md`

Status: standing method for committee and case-file research. All 40 deep dossiers have completed the initial pass, but the workflow remains active as the repository-indexing and quality method.

Core questions:

1. Which bodies handle, review, monitor, or publish cases?
2. What public trail does each body leave?
3. How open, structured, and durable is that trail?

Unit of observation: the **route**, not only the formal committee.

Visibility classes:

1. structured archive;
2. stable case page;
3. individual case files;
4. annual-report summaries;
5. aggregate statistics only;
6. procedure only;
7. no public trace found.

Standard workflow:

1. build a seed list from local documents and existing data;
2. separate handlers from boundary bodies;
3. find a constitutive source, procedure, publication hub, and example output for each body;
4. expand institutionally when the national layer is weak or distributed;
5. code publication model, depth, lifecycle, owner, archive scope, public fields, restrictions, and stability;
6. record negative findings;
7. change the dossier only when the evidence is stable.

The workflow also contains:

- 40 country-specific methodological refinements from the pilots;
- a search order and local-language search approach;
- rules for reusing the existing data structures;
- a detailed Markdown working-note template;
- boundary rules;
- a definition of good output;
- a closing checklist.

Source: [`docs/workflows/CASE-FILE-WORKFLOW.md`](../workflows/CASE-FILE-WORKFLOW.md)

### 4.2 `COUNTRY-PAIR-COMPARISON-WORKFLOW.md`

Status: specialized workflow for an officer-facing comparison of two countries.

Special agent rule:

- do not complete the whole comparison in one run;
- execute one numbered task per run unless the user explicitly asks to continue;
- stop after each task and provide a fixed handoff;
- report scope, changed files, sources checked, findings, gaps, next task, and checks.

Phases and tasks:

0. pair plan and local source inventories;
1. Country A source-current sweep, dossier update, and quality gate;
2. the same for Country B;
3. seven comparison axes:
   - system model and normative baseline;
   - complaint route and case handling;
   - public output and transparency;
   - institutional implementation;
   - funder and grant compliance;
   - boundary regimes;
   - evidence quality and extraction targets;
4. general synthesis and officer-facing content;
5. static app implementation and visual check;
6. officer review and dynamic-readiness review.

The document also contains:

- fixed definitions;
- a source-current checklist;
- a source-by-source review template;
- rules for changing project files;
- syntax and duplicate-ID checks;
- a full definition of done.

Source: [`docs/workflows/COUNTRY-PAIR-COMPARISON-WORKFLOW.md`](../workflows/COUNTRY-PAIR-COMPARISON-WORKFLOW.md)

### 4.3 `LERU-INSTITUTION-EXTRACTION-WORKFLOW.md`

Status: specialized workflow for deepening a LERU member profile.

Source order:

1. search the repository first;
2. then use only official public institutional sources;
3. normally omit non-official sources.

Fields to update include:

- report and profile status;
- evidence level;
- transparency category;
- institutional route;
- committee or office;
- procedure and public-output summaries;
- source coverage and source links;
- caveats;
- next follow-up;
- member-validation questions.

Status logic:

- `Coverage placeholder`;
- `Partial seed`;
- `Detailed seed`.

Additional rules:

- never infer one institution’s route from another institution in the same country;
- do not recode boundary regimes as misconduct handling;
- do not reproduce personal email addresses, telephone numbers, or private operational details;
- do not interpret absence of public output as absence of cases;
- log each batch, run syntax checks, and perform visual checks only when requested.

Source: [`docs/workflows/LERU-INSTITUTION-EXTRACTION-WORKFLOW.md`](../workflows/LERU-INSTITUTION-EXTRACTION-WORKFLOW.md)

## 5. Status-Driven Plans and Resume Instructions

### `reports/project-overview.html`

This is the operational project tracker and the most useful project-wide status view.

It contains:

- current counts;
- a five-step high-level workflow;
- roles of the main data files;
- a country table with `Current level` and `Next action`;
- current focus;
- the active quality phase;
- country completion, dossier hardening, and method tightening;
- briefing text for collaborators.

High-level workflow:

1. find sources;
2. draft an overview;
3. extract into the app;
4. add transparency;
5. deepen dossiers.

Source: [`reports/project-overview.html`](../../reports/project-overview.html)

### `data/extraction-status.md`

Functions:

- audit which overview DOCX files are represented in `data/countries.js`;
- track readability problems;
- identify the nine countries without a formal overview;
- summarize progress in the source registry and transparency layer.

Source: [`data/extraction-status.md`](../../data/extraction-status.md)

### `docs/status/TIMELINE-MAP-PROGRESS.md`

Functions:

- connect the feature plan to what has actually been implemented;
- register changed files and completed checks;
- record known limitations;
- provide an ordered resume queue.

Current resume order:

1. browser smoke test;
2. category-mapper review;
3. improve dense-year behavior;
4. add an audit summary;
5. add story presets;
6. optionally split timeline code into separate files.

Source: [`docs/status/TIMELINE-MAP-PROGRESS.md`](TIMELINE-MAP-PROGRESS.md)

### LERU Status Documents

1. [`LERU-EXECUTIVE-SUMMARY-DRAFT.md`](LERU-EXECUTIVE-SUMMARY-DRAFT.md)
   - Public-source synthesis.
   - Validation agenda and limitations.
   - Recommends member validation before another general extraction round.

2. [`LERU-PUBLIC-OUTPUT-AUDIT.md`](LERU-PUBLIC-OUTPUT-AUDIT.md)
   - Wording rules and public-output typology for all 24 institutions.
   - Institution-specific audit basis and remaining validation question.
   - Batch updates and member-validation updates.

3. [`LERU-REPORT-GAP-MATRIX.md`](LERU-REPORT-GAP-MATRIX.md)
   - Prioritization matrix for every institution.
   - Next actions for member validation, field indexing, and editorial/export work.
   - Distinguishes audit completion from genuinely new public-output evidence.

These documents do not define the general method. They determine the next LERU work.

## 6. Embedded Microplans

### 6.1 Country Level in `data/countries.js`

All 49 country records contain a `nextFocus`.

This field is the most concrete last-mile instruction for each country. It may require:

- drafting a missing `Overview <Country>.docx`;
- field-indexing an annual-report or decision archive;
- reverifying a body or procedure;
- widening institutional coverage;
- testing an inaccessible route through another official entry point;
- monitoring a future legal or procedural change;
- keeping boundary regimes explicitly separate.

The 49 `nextFocus` texts are visible in the app and summarized in the country tracker.

Source: [`data/countries.js`](../../data/countries.js)

### 6.2 LERU Institution Level in `data/leru-members.js`

All 24 profiles contain a `nextFollowUp`.

Twenty-two profiles contain a total of 110 `memberValidationQuestions`. University of Milan and University of Zurich no longer have open question arrays; their recent member-validation findings have already been converted into concrete monitoring instructions.

Typical follow-up actions:

- index annual outputs row by row;
- confirm that no local public-output channel was missed;
- distinguish institutional output from national or sector output;
- avoid describing internal or restricted output as public;
- recheck a changed procedure, office name, or ordinance later.

Source: [`data/leru-members.js`](../../data/leru-members.js)

### 6.3 Country Source Notes

There are 53 Markdown source-note files across all 49 countries.

Recurring instruction sections:

- `Committee and case-file pass`;
- `Quality-consolidation pass`;
- `Source-current sweep`;
- `Gaps for next pass`;
- `Remaining gaps for a final sweep`;
- `Next extraction targets`;
- `Remaining follow-up queue`;
- comparison inventory and quality-gate notes;
- member-validation updates.

Four task-specific notes supplement the single base note for each country:

- Belgium comparison source inventory;
- Netherlands comparison source inventory;
- Netherlands source-current sweep 2026-05-29;
- Romania overview-readability issue.

Location pattern: `data/<Country>/raw documentation/source notes/`

## 7. Templates and Checklists Used by Agents

The project instructions contain reusable templates:

1. **Deep-dossier data schema**
   - In `AGENTS.md`.
   - Specifies the expected fields for every object and subobject.

2. **Committee and case-file working-note template**
   - In `CASE-FILE-WORKFLOW.md`.
   - Requests body type, lane, owner, archive scope, database function, visibility, lifecycle, case-file status, exclusions, and gaps.

3. **Source-current review template**
   - In `COUNTRY-PAIR-COMPARISON-WORKFLOW.md`.
   - Records existing location, live URL, status, cross-reference, route, boundary warning, and required changes for each source.

4. **PDF/report extraction extension**
   - Years, case fields, outcome fields, publication exclusions, retention, representative file, and extraction target.

5. **Quality gates**
   - Country comparison uses `comparison-ready`, `comparison-ready with stated gaps`, and `not ready`.

6. **Definitions of done**
   - Present at country, case-file, quality-phase, comparison-task, comparison-pilot, timeline-phase, and LERU-profile levels.

7. **Technical checks**
   - JavaScript syntax checks.
   - Duplicate source-ID check when `data/source-registry.csv` changes.
   - Browser and visual checks only when the relevant workflow phase or the user requires them.

## 8. Audit and Provenance Instructions

These files are not narrative plans, but they make execution auditable:

| File | Function |
| --- | --- |
| `data/source-registry.csv` | Durable sources, type, category, access date, use, and local storage |
| `data/overview-extraction-log.csv` | Audit trail for 40 overview extractions |
| `data/transparency-extraction-log.csv` | Audit trail for transparency extraction |
| `data/leru-extraction-log.csv` | Batch and profile updates for LERU institutions |

Registration rules:

- use stable source IDs;
- log durable new, moved, or replacement sources;
- label archives, databases, registers, and annual-report corridors as extraction targets;
- where possible, record both the hub and a representative file;
- preserve access date and coding use;
- never treat `not found` as proof that something does not exist.

## 9. Technical Operating and Product Instructions

### `README.md`

Contains:

- starting the app through `index.html`;
- an alternative local Python HTTP server;
- project structure;
- troubleshooting.

Source: [`README.md`](../../README.md)

### `docs/article/build_leru_report_outline.py`

This script is not a general agent plan, but it contains an encoded editorial product specification:

- group LERU institutions by national system;
- present route, public output, and analytical angle for each institution;
- preserve boundary and institution/national-output distinctions;
- generate a Word article outline.

It therefore belongs to the implementation artifacts, not to the principal normative instructions.

Source: [`docs/article/build_leru_report_outline.py`](../article/build_leru_report_outline.py)

## 10. Consolidated Current Agent Workflow

When the distributed instructions are combined into one current workflow, the process is:

1. **Determine the task type**
   - country pass;
   - quality sweep;
   - case-file or repository-indexing pass;
   - country comparison;
   - LERU institution profile;
   - app or feature implementation.

2. **Read the correct instruction layer**
   - always `AGENTS.md`;
   - then the specialized plan and/or workflow;
   - then the current status or pair-control file.

3. **Start locally**
   - overview;
   - raw documentation;
   - source notes;
   - existing app fields;
   - transparency layer;
   - source registry.

4. **Verify selectively online**
   - official and current sources first;
   - local-language searches where needed;
   - ENRIO only as a comparison layer;
   - secondary sources at most as search bridges.

5. **Model routes and functions**
   - intake;
   - advice;
   - investigation;
   - decision;
   - second line or appeal;
   - funder consequence;
   - publication.

6. **Code public output precisely**
   - owner;
   - scope;
   - depth;
   - format;
   - public fields;
   - non-public fields;
   - anonymization;
   - lifecycle;
   - retention;
   - accessibility;
   - exclusions;
   - stability.

7. **Keep boundaries separate**
   - ethics approval, clinical, animal, data, IP, QA, open science, security, employment, and whistleblowing are separate lanes.

8. **Record negative findings**
   - no archive found;
   - body exists in law but no current page was located;
   - publication duty exists but no live output was found;
   - source is blocked, moved, or historical;
   - only aggregate or restricted information is available.

9. **Update the smallest stable set of project files**
   - source notes first;
   - app data only for evidence-driven changes;
   - source registry and logs when relevant;
   - tracker only when status or next action genuinely changes.

10. **Verify**
    - syntax;
    - duplicate IDs where relevant;
    - internal consistency of committee and transparency wording;
    - visual behavior only when the task requires it.

11. **Hand off**
    - what was completed;
    - which sources were checked;
    - which conclusions changed;
    - which gaps remain;
    - what the next concrete task is.

## 11. Precedence and Relationship Between Instructions

Recommended reading and decision order within the repository:

1. `AGENTS.md` for general standards and project context.
2. The specialized workflow for the task:
   - case files;
   - country pair;
   - LERU institution.
3. The corresponding plan:
   - quality phase;
   - pair plan;
   - feature or product plan.
4. The current status or gap document for the resume point.
5. The country or institution source note.
6. `nextFocus`, `nextFollowUp`, or validation questions as the concrete last step.

Important:

- The country-pair workflow has an explicit stop-after-one-task rule.
- The case-file document defines the classification method even though the first 40 pilots are complete.
- The quality plan defines the active project-wide phase.
- The protocol defines the desired scientific methodology but still contains placeholders.
- Status documents and microplans define priority, not the general quality standard.

## 12. Known Version and Consistency Issues

1. **Different status dates**
   - `AGENTS.md` and the quality plan are mainly current through 30 April 2026.
   - Netherlands-Belgium documents run through 29 May 2026.
   - LERU documents contain updates through 16 July 2026.

2. **Source-registry count**
   - Older instructions mention 1,550 or 1,564 entries.
   - The current registry and project tracker contain 1,568 entries.

3. **LERU plan versus implementation**
   - The LERU plan calls itself exploratory and says the feature has not been built.
   - The repository now contains `leru/index.html`, `data/leru-members.js`, `assets/js/leru.js`, and a report page.
   - Use the plan as the architecture and privacy basis, not as the current implementation status.

4. **Timeline plan versus implementation**
   - The feature plan says “planned.”
   - The progress log records a partially working implementation.
   - The progress log is authoritative for resuming implementation.

5. **Protocol placeholders**
   - The protocol tables and example links are explicitly non-factual.
   - Do not use them as country evidence.

6. **LERU counts from different dates**
   - The executive-summary draft preserves an earlier typology count.
   - The public-output audit and gap matrix include later member-validation updates.
   - Use `data/leru-members.js` and the latest audit for current classification.

7. **Snapshot files**
   - Eight files carry the suffix `-2023-1236`.
   - These are parallel snapshots or backups, not the primary current instruction or data files.
   - Use the unsuffixed files by default.

## 13. Canonical Source List

### General Instructions

- [`AGENTS.md`](../../AGENTS.md)
- [`README.md`](../../README.md)

### Protocol

- [`protocol/index.html`](../../protocol/index.html)

### Plans

- [`docs/plans/NEXT-PHASE-QUALITY-PLAN.md`](../plans/NEXT-PHASE-QUALITY-PLAN.md)
- [`docs/plans/LERU-MEMBER-ENVIRONMENT-PLAN.md`](../plans/LERU-MEMBER-ENVIRONMENT-PLAN.md)
- [`docs/plans/NL-BE-SYSTEM-COMPARISON-PLAN.md`](../plans/NL-BE-SYSTEM-COMPARISON-PLAN.md)
- [`docs/plans/TIMELINE-MAP-FEATURE-PLAN.md`](../plans/TIMELINE-MAP-FEATURE-PLAN.md)

### Workflows

- [`docs/workflows/CASE-FILE-WORKFLOW.md`](../workflows/CASE-FILE-WORKFLOW.md)
- [`docs/workflows/COUNTRY-PAIR-COMPARISON-WORKFLOW.md`](../workflows/COUNTRY-PAIR-COMPARISON-WORKFLOW.md)
- [`docs/workflows/LERU-INSTITUTION-EXTRACTION-WORKFLOW.md`](../workflows/LERU-INSTITUTION-EXTRACTION-WORKFLOW.md)

### Status, Progress, and Prioritization

- [`reports/project-overview.html`](../../reports/project-overview.html)
- [`data/extraction-status.md`](../../data/extraction-status.md)
- [`docs/status/TIMELINE-MAP-PROGRESS.md`](TIMELINE-MAP-PROGRESS.md)
- [`docs/status/LERU-EXECUTIVE-SUMMARY-DRAFT.md`](LERU-EXECUTIVE-SUMMARY-DRAFT.md)
- [`docs/status/LERU-PUBLIC-OUTPUT-AUDIT.md`](LERU-PUBLIC-OUTPUT-AUDIT.md)
- [`docs/status/LERU-REPORT-GAP-MATRIX.md`](LERU-REPORT-GAP-MATRIX.md)

### Embedded Planning

- [`data/countries.js`](../../data/countries.js)
- [`data/leru-members.js`](../../data/leru-members.js)
- `data/<Country>/raw documentation/source notes/*.md`

### Audit Trail

- [`data/source-registry.csv`](../../data/source-registry.csv)
- [`data/overview-extraction-log.csv`](../../data/overview-extraction-log.csv)
- [`data/transparency-extraction-log.csv`](../../data/transparency-extraction-log.csv)
- [`data/leru-extraction-log.csv`](../../data/leru-extraction-log.csv)

## Conclusion

The project uses four complementary forms of agent planning:

1. **Normative instructions** — what must always remain true (`AGENTS.md`, protocol, boundary rules, and source rules).
2. **Phase and product plans** — what a project phase or feature must deliver.
3. **Stepwise workflows** — how a bounded task is carried out and when the agent must stop.
4. **Status-driven microplans** — which country, institution, source, or field should be handled next.

Their combination makes the work reproducible: general standards protect content quality, workflows protect execution quality, status documents protect continuity, and data/log fields preserve the concrete next action and the evidence trail.
