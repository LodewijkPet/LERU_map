# Country-Pair System Comparison Workflow

Status date: 29 May 2026

Use this workflow when comparing two country research-integrity systems for a research integrity officer audience.

This workflow is deliberately staged. A full comparison is too large for one agent run. Each numbered task below is meant to be a separate agentic task unless the user explicitly asks to continue. When a task is complete, stop, report the result, and name the next task.

## Purpose

Create a defensible, source-current, officer-facing comparison between two countries.

The final comparison should help a research integrity officer answer practical questions:

- Where does a concern or allegation start in each country?
- Who handles advice, investigation, decision-making, second-line review and publication?
- Which bodies publish case files, summaries, statistics or annual reports?
- Which evidence is current, outdated, missing, inaccessible or only boundary-related?
- What changes when a case involves a funder, hospital, clinical trial, animal research, data protection, IP, research security or quality assurance?
- What should an officer not assume when moving between the two systems?

The comparison must not rank countries with a single score. It should compare functions, routes, evidence depth and practical implications.

## Mandatory Agent Rule

Do not complete the whole comparison in one run.

When the user asks for one task, do only that task. Do not silently continue into the next task, even if the next task seems obvious.

At the end of every task, provide a handoff with:

- task completed
- exact scope covered
- files changed
- sources or local documents checked
- key findings
- unresolved gaps
- next recommended task
- whether syntax checks were run

Use wording like:

```text
Task 2A is complete. I stopped here as instructed by the comparison workflow. The next task is Task 2B: Belgium source-current sweep, or you can start a new conversation with that task.
```

If the user explicitly says "continue with the next task", then continue with one next task only.

## Required Starting Context

At the start of every task, read or inspect the minimum relevant local context:

- `AGENTS.md`
- this workflow document
- the pair-specific plan, for example `docs/plans/NL-BE-SYSTEM-COMPARISON-PLAN.md`
- each country's overview document if needed
- each country's source notes
- each country's entry in `data/countries.js`
- each country's entry in `data/transparency.js`, if present
- relevant rows in `data/source-registry.csv`
- existing app comparison section, if the task touches the UI

Use local evidence first. Go online only for current-source verification, missing official sources, or when the task specifically requires source refresh.

## Core Definitions

Use these terms consistently:

- `Country A` and `Country B`: the two countries being compared.
- `Core research-integrity route`: the route that handles alleged research misconduct or research-integrity breaches.
- `First-line handler`: the institution, office, board or committee where a case normally starts.
- `Decision-maker`: the person or body that makes the final institutional or national decision.
- `Second-line body`: an advisory, appeal, review or external opinion body.
- `Publication owner`: the body that publishes case files, decisions, summaries, statistics or annual reports.
- `Funder route`: grant-compliance, notification, sanction, repayment, eligibility or audit route.
- `Boundary route`: adjacent regime such as biomedical ethics, clinical trials, animal research, data protection, IP, quality assurance, research security, open science, employment discipline or whistleblowing.
- `Public output`: any public decision, opinion, case summary, case table, annual statistics, annual report, archive, register or official negative statement about non-publication.

## Comparison Control File

Every pair should have a pair-specific plan in `docs/plans/`.

For the Netherlands-Belgium pilot, use:

- `docs/plans/NL-BE-SYSTEM-COMPARISON-PLAN.md`

For new pairs, create:

```text
docs/plans/<COUNTRY-A>-<COUNTRY-B>-SYSTEM-COMPARISON-PLAN.md
```

The pair plan should contain:

- purpose and audience
- task status table
- country-specific quality gates
- known evidence gaps
- final comparison page location
- source-current dates
- final review notes

The pair plan should not replace this workflow. This workflow says how to compare. The pair plan says what happened for that pair.

## Standard Task Sequence

The full process has six phases:

1. Set up the pair and source inventory.
2. Complete Country A data-quality and source-current work.
3. Complete Country B data-quality and source-current work.
4. Compare the country dossier sections axis by axis.
5. Write the officer-facing synthesis and general overview.
6. Build or update the static comparison section in the app.

Each phase is split into smaller tasks. Agents should run one task at a time.

## Phase 0: Pair Setup

### Task 0A: Create Or Update The Pair Plan

Goal: create a control document for the comparison.

Do this:

1. Read this workflow.
2. Read `AGENTS.md`.
3. Check whether a pair plan already exists.
4. If not, create one under `docs/plans/`.
5. If it exists, update its status table and make it refer to this workflow.
6. Do not perform country quality checks in this task.

Minimum output in the pair plan:

- pair name
- status date
- audience
- current task table
- Country A current status
- Country B current status
- comparison page status
- next task

Definition of done:

- pair plan exists
- task sequence is visible
- next task is named

Stop after this task.

### Task 0B: Build A Local Source Inventory For Country A

Goal: identify every source already present for Country A before going online.

Do this:

1. Open `data/<Country A>/Overview <Country A>.docx` if present.
2. Inspect `data/<Country A>/raw documentation/`.
3. Read the country source notes.
4. Extract Country A source links from `data/countries.js`.
5. Extract Country A transparency resources from `data/transparency.js`, if present.
6. Extract Country A rows from `data/source-registry.csv`.
7. Build a source inventory grouped by route.

Group sources under these headings:

- national law or code
- national integrity body or advisory route
- institutional complaint procedure
- public case archive, report or publication hub
- funder route
- university examples
- public research institute examples
- biomedical or clinical route
- animal research route
- data-protection route
- IP route
- quality-assurance route
- research-security, dual-use, AI or open-science route
- unclear or duplicate source

For each source, capture:

- title
- URL or local path
- source type
- current date or document date, if visible
- access date already recorded
- country-dossier location where it is used
- route or boundary supported
- whether it needs a current-source check
- whether it appears superseded, duplicated, broken or vague

Where to record:

- Prefer appending a concise `Comparison source inventory` section to the existing country source note.
- If the source note becomes too large, create a separate file under the country source notes folder.

Definition of done:

- all local Country A sources have been inventoried
- every source is assigned to a route or boundary lane
- sources needing live verification are marked
- no live online refresh has been attempted unless needed to identify an existing source

Stop after this task.

### Task 0C: Build A Local Source Inventory For Country B

Repeat Task 0B for Country B only.

Do not compare countries yet. Do not refresh sources yet.

Stop after this task.

## Phase 1: Country A Full Quality Check

Country A must be made comparison-ready before it is compared.

### Task 1A: Country A Source-Current Sweep

Goal: verify every important Country A source one by one against the latest official public version.

Do this:

1. Start from the Country A source inventory.
2. Check every source marked as needing live verification.
3. Prefer official sources.
4. For every source, decide one status:
   - `current`
   - `newer version found`
   - `moved`
   - `broken or inaccessible`
   - `superseded`
   - `historical but still relevant`
   - `duplicate`
   - `not official enough`
   - `boundary only`
5. When a source has a newer version, capture the newer title, URL, document date and practical change.
6. When a source is referenced by another official source, record the cross-reference.
7. Do not update comparison conclusions until all source-current checks for this task are complete.

Check these source families one by one:

- national code, law, regulation or procedure
- national or second-line integrity body
- committee membership or connected-institution directory
- annual reports, case archives and publication hubs
- funder rules and grant terms
- institutional examples
- research-institute examples
- biomedical and clinical-trial boundary sources
- animal research boundary sources
- data-protection boundary sources
- IP and commercialization sources
- quality-assurance sources
- research security, dual-use, AI, open science or data-management sources

Record for each source:

- old source
- new source if found
- date checked
- official status
- whether the source changes the country dossier
- whether the source changes the future comparison

Definition of done:

- every important Country A source has a current-source status
- newer or moved sources are logged
- broken, superseded and historical sources are marked
- official cross-references are noted

Stop after this task unless the user explicitly asks to proceed.

### Task 1B: Country A Dossier Update

Goal: update the project files for Country A after the source-current sweep.

Do this:

1. Re-read the Country A source-current notes.
2. Update `data/countries.js` only where evidence changes the dossier.
3. Update `data/transparency.js` if the publication model changes.
4. Update `data/source-registry.csv` for durable new, moved or replacement sources.
5. Update `reports/project-overview.html` if the country status, counts or next focus changed.
6. Add a dated quality-check note to the country source note.

Do not add comparison-page content in this task.

Definition of done:

- Country A source note has a dated quality-check section
- Country A app dossier is current
- transparency entry is current if relevant
- source registry is updated if relevant
- project overview is updated if relevant
- syntax checks pass:

```powershell
node --check data/countries.js
node --check data/transparency.js
node --check assets/js/app.js
```

Stop after this task.

### Task 1C: Country A Quality Gate

Goal: decide whether Country A is comparison-ready.

Answer these questions in the pair plan:

- Is the national model current?
- Is the main code or normative baseline current?
- Are first-line and second-line routes clear?
- Are publication owners clear?
- Are funder routes clear?
- Are boundary routes separated?
- Are public-output sources current?
- Are missing sources or inaccessible routes explicit?
- What still needs field indexing later but does not block comparison?

Use these labels:

- `comparison-ready`
- `comparison-ready with stated gaps`
- `not ready`

Definition of done:

- pair plan records Country A quality-gate status
- remaining gaps are listed
- next task is named

Stop after this task.

## Phase 2: Country B Full Quality Check

Repeat Phase 1 for Country B.

### Task 2A: Country B Source-Current Sweep

Repeat Task 1A for Country B.

Stop after this task.

### Task 2B: Country B Dossier Update

Repeat Task 1B for Country B.

Stop after this task.

### Task 2C: Country B Quality Gate

Repeat Task 1C for Country B.

Stop after this task.

## Phase 3: Section-By-Section Comparison

Only start Phase 3 after both countries are at least `comparison-ready with stated gaps`.

The goal is to compare the same dossier sections across both countries and extract differences that matter to officers.

### Task 3A: Compare System Model And Normative Baseline

Compare:

- system type
- national, federal, community, academy or institutional design
- legal basis
- code of conduct
- ALLEA use
- national or sector model procedure
- role of self-regulation
- role of ministries or quality bodies

For each country, record:

- main rule source
- current version
- who the rule applies to
- whether the rule is binding, soft-law, funder-based or institutional
- what an officer must know

Output:

- a comparison note in the pair plan
- a concise officer-facing finding
- source links for every major claim

Stop after this task.

### Task 3B: Compare Complaint Route And Case Handling

Compare:

- where allegations start
- confidential advice route
- formal complaint route
- investigation body
- final decision-maker
- second-line review or advice
- appeal or court-adjacent routes, if relevant
- handoff paths between institution, national body, funder and publication owner

For each route, distinguish:

- intake
- advice
- investigation
- decision
- review
- publication
- sanction or consequence

Output:

- side-by-side route ladder
- points of divergence
- officer-facing "if you are handling a case" implications

Stop after this task.

### Task 3C: Compare Public Output And Transparency

Compare:

- public archives
- decision or opinion pages
- annual reports
- case summaries
- aggregate statistics
- publication rules
- retention rules
- anonymization
- what is not public

For each publication source, record:

- owner
- handler relationship
- years covered
- format
- public fields
- non-public fields
- case-level depth
- stability
- known exclusions
- whether it is core misconduct or boundary-only

Use labels:

- `structured archive`
- `stable case page`
- `individual case files`
- `annual-report summaries`
- `aggregate statistics only`
- `procedure only`
- `no public trace found`
- `boundary-only public output`

Output:

- side-by-side transparency ladder
- strongest public-output source for each country
- most important gap for each country

Stop after this task.

### Task 3D: Compare Institutional Implementation

Compare:

- university committees
- institute procedures
- shared committees
- ombudspersons or confidential advisers
- sector directories
- annual-report practice
- publication or non-publication at local level
- institutional examples used in the dossier

For each country, ask:

- Is the institutional layer standardized or varied?
- Are local routes visible publicly?
- Are local outputs published?
- Are there strong exemplars?
- Are public research institutes included?
- Are private, hospital, university-of-applied-sciences or non-university institutions included where relevant?

Output:

- institutional implementation matrix
- officer-facing comparison of local handling reality

Stop after this task.

### Task 3E: Compare Funder And Grant-Compliance Routes

Compare:

- main public funders
- grant terms
- reporting duties
- notification duties
- eligibility consequences
- repayment, suspension, termination or exclusion powers
- whether funders investigate or rely on host institutions
- whether funders publish outcomes

Keep funder compliance separate from misconduct adjudication.

Output:

- funder-route comparison
- practical implications for funded cross-border collaborations

Stop after this task.

### Task 3F: Compare Boundary Regimes

Compare each boundary lane separately:

- biomedical ethics
- clinical trials
- animal research
- data protection
- IP and commercialization
- quality assurance and accreditation
- research security or knowledge security
- dual use
- open science and data management
- AI or authorship guidance
- employment discipline, whistleblowing or social safety where relevant

For each boundary, record:

- body or route
- public output type
- why it matters to research integrity officers
- why it is not the general misconduct route
- source confidence

Output:

- boundary comparison table
- "do not confuse" notes for officers

Stop after this task.

### Task 3G: Compare Evidence Quality And Remaining Extraction Targets

Compare:

- source currency
- primary-source strength
- official cross-references
- completeness of route directory
- public-output indexing depth
- language or accessibility barriers
- missing institutional coverage
- unresolved document updates
- extraction targets that remain too large for this comparison pass

Use labels:

- `current`
- `mostly current`
- `partial`
- `not found`
- `boundary only`
- `needs field indexing`

Output:

- evidence quality scorecard without numeric ranking
- remaining extraction targets by country
- recommendation on whether the comparison page can be updated

Stop after this task.

## Phase 4: General Synthesis

Only start Phase 4 after all Phase 3 comparison tasks are complete.

### Task 4A: Draft The General Overview

Goal: write the high-level synthesis across all differences found.

The general overview should include:

- one paragraph on the overall system contrast
- one paragraph on officer workflow implications
- one paragraph on transparency and public-output differences
- one paragraph on institutional implementation differences
- one paragraph on funder and boundary implications
- one paragraph on evidence confidence and missingness

The synthesis must be grounded in the section-by-section notes. Do not add new claims without sources.

Output:

- draft overview in the pair plan or a comparison working note
- list of source-backed claims to carry into the app
- list of claims that should not be used because evidence is too weak

Stop after this task.

### Task 4B: Draft Officer-Facing Comparison Content

Goal: turn the evidence into app-ready content.

Draft these sections:

- officer brief
- route ladder
- public evidence ladder
- institutional implementation matrix
- funder matrix
- boundary controls
- evidence confidence and gaps
- source backbone
- practical officer checklist

For every section, include:

- concise user-facing text
- source references
- internal note if the claim depends on a gap or negative finding

Output:

- app-ready comparison draft
- source backbone
- list of UI sections to add or update

Stop after this task.

## Phase 5: Static App Implementation

Only start Phase 5 after Task 4B has an app-ready draft.

### Task 5A: Implement Or Update The Static Comparison Section

Goal: build the comparison page or section from the approved draft.

Do this:

1. Identify the existing app structure in `index.html`, `assets/js/app.js` and `assets/css/styles.css`.
2. Add or update a static comparison section.
3. Keep the content hard-coded unless the pair plan explicitly says to create a data file.
4. Do not invent a general dynamic comparison schema during the static pilot.
5. Make source links visible for major claims.
6. Keep the design useful for officers: dense, scannable, route-based and not marketing-like.

Definition of done:

- comparison section exists
- navigation exposes it
- content matches the approved draft
- section keeps boundary regimes separate
- source links are present
- syntax checks pass:

```powershell
node --check data/countries.js
node --check data/transparency.js
node --check assets/js/app.js
```

Stop after this task.

### Task 5B: Visual And Usability Check

Goal: verify that the static section is readable and usable.

Do this:

1. Open the app locally.
2. Check desktop layout.
3. Check narrow/mobile layout.
4. Confirm no text overlap.
5. Confirm tables or cards remain readable.
6. Confirm links and navigation work.
7. Confirm the country dossiers remain reachable.

Use browser inspection only for this task or when the user explicitly asks for visual verification.

Output:

- visual check notes
- screenshots if useful
- fixes applied, if any

Stop after this task.

## Phase 6: Final Review And Dynamic Readiness

Do not start this phase until the static comparison has been reviewed.

### Task 6A: Research Integrity Officer Review Pass

Goal: check whether the comparison is useful to officers.

Review the page against these questions:

- Can an officer see where a concern starts in both countries?
- Can an officer find the second-line or review body?
- Can an officer identify where precedent, statistics or public outputs sit?
- Can an officer see what will remain confidential?
- Can an officer distinguish core misconduct from boundary regimes?
- Can an officer understand funder implications?
- Can an officer see what not to assume in cross-border collaborations?
- Are evidence gaps clear without weakening valid findings?

Output:

- review findings
- content edits needed
- UI edits needed
- source gaps that should become future tasks

Stop after this task.

### Task 6B: Dynamic Model Readiness Review

Goal: decide what, if anything, should become reusable data.

Only do this after the static page works.

Assess whether repeated comparison sections justify:

- `data/comparisons.js`
- reusable route-ladder component
- reusable public-output table
- reusable boundary matrix
- pair selector
- country-pair source-confidence fields
- export or print view

Do not implement the dynamic model in this task unless the user explicitly asks.

Output:

- recommended dynamic fields
- fields that should remain hand-authored
- app files likely to change later
- risks of over-generalizing too early

Stop after this task.

## Required Comparison Axes

Every mature comparison should eventually cover these axes:

- system type
- national or distributed structure
- community, federal, regional or sector split
- main code or normative baseline
- first-line handler
- decision-maker
- second-line or review body
- publication owner
- public case-output depth
- institutional route visibility
- public research institute route visibility
- funder role
- grant-compliance consequences
- public-output retention and anonymization
- boundary-regime separation
- officer-facing practical implications
- evidence confidence
- remaining extraction targets

## Source-Current Checklist

For every important source, check:

- current title
- current URL
- current document date
- issuing body
- whether the source says it replaces another source
- whether another official page points to it
- whether the app still points to an older version
- whether the source is stored locally
- whether the source registry has it
- whether the source supports a core route or only a boundary route
- whether the source changes the country summary, transparency block, route directory, timeline or comparison text

## Document-By-Document Review Method

When going over documents one by one, use this format:

```md
### Source check: <source title>

- Existing location:
- Existing app use:
- Existing document date:
- Live official URL checked:
- Latest version found:
- Official cross-reference found:
- Status:
- Route supported:
- Boundary warning:
- Dossier change needed:
- Comparison change needed:
- Source-registry change needed:
- Notes:
```

For PDFs or reports with substantial case material, add:

```md
- Years covered:
- Case fields available:
- Outcome fields available:
- Publication exclusions:
- Retention or removal rule:
- Representative case or table:
- Extraction target:
```

## Updating Project Files

Use the smallest stable update that reflects the evidence.

Update `data/countries.js` when:

- system type changes
- code baseline changes
- route directory changes
- transparency block changes
- source links change
- timeline needs a new current-source event
- `nextFocus` needs to move

Update `data/transparency.js` when:

- country-level publication model changes
- public-output sources change
- source date changes
- transparency tier or key note changes

Update `data/source-registry.csv` when:

- a durable new source is formalized
- a source has moved to a new stable URL
- a replacement version is now used
- an archive, database, annual-report corridor or representative case file becomes an extraction target

Update `reports/project-overview.html` when:

- country status changes
- current focus changes
- source-registry count changes
- a major pair comparison milestone is completed

Update app files only in Phase 5:

- `index.html`
- `assets/js/app.js`
- `assets/css/styles.css`
- optional `data/comparisons.js` only if explicitly chosen

## Syntax And Consistency Checks

Run these after data or app edits:

```powershell
node --check data/countries.js
node --check data/transparency.js
node --check assets/js/app.js
```

If `data/transparency.js` was not touched and is known unaffected, it may be omitted, but it is safer to run it.

Also run a duplicate source-id check when editing `data/source-registry.csv`.

Suggested PowerShell:

```powershell
Import-Csv data/source-registry.csv | Group-Object source_id | Where-Object Count -gt 1
```

## Final Comparison Definition Of Done

A country-pair comparison is complete when:

- both countries have current-source checks
- both countries have source-note quality-check sections
- both countries have updated dossier data where needed
- source registry is updated for durable new sources
- section-by-section comparison notes exist
- general overview is grounded in those notes
- officer-facing app content exists
- source links support major claims
- boundary regimes are separate
- evidence gaps are explicit
- syntax checks pass
- visual check is complete if a UI section was changed
- the pair plan records the completed status and next dynamic-readiness task

## Netherlands-Belgium Pilot Task Map

For the Netherlands-Belgium pilot, use this concrete order:

1. Task 0A: update `docs/plans/NL-BE-SYSTEM-COMPARISON-PLAN.md` against this workflow.
2. Task 0B: Netherlands local source inventory.
3. Task 0C: Belgium local source inventory.
4. Task 1A: Netherlands source-current sweep.
5. Task 1B: Netherlands dossier update.
6. Task 1C: Netherlands quality gate.
7. Task 2A: Belgium source-current sweep.
8. Task 2B: Belgium dossier update.
9. Task 2C: Belgium quality gate.
10. Task 3A: compare system model and normative baseline.
11. Task 3B: compare complaint route and case handling.
12. Task 3C: compare public output and transparency.
13. Task 3D: compare institutional implementation.
14. Task 3E: compare funder and grant-compliance routes.
15. Task 3F: compare boundary regimes.
16. Task 3G: compare evidence quality and extraction targets.
17. Task 4A: draft general overview.
18. Task 4B: draft officer-facing comparison content.
19. Task 5A: implement or update static comparison section.
20. Task 5B: visual and usability check.
21. Task 6A: officer review pass.
22. Task 6B: dynamic model readiness review.

Some NL-BE tasks may already have been completed in earlier work. If so, the agent should confirm the evidence, mark completed tasks in the pair plan, and continue only with the next requested task.

