# Designing Effective Agent Plans

Companion guide to the LERU Integrity Map plan inventory

Prepared: 24 July 2026

## Purpose

This guide explains how to write Agent plans that are clear enough for a new agent to continue complex work without reconstructing the project from scratch.

It draws on the planning architecture used in the **Research Integrity Systems in Europe / LERU Integrity Map** project. The principles are general and can be reused in other research, policy, data, software, and documentation projects.

Related inventory:

- [`AGENT-PLANS-AND-INSTRUCTIONS-INVENTORY-EN.md`](../status/AGENT-PLANS-AND-INSTRUCTIONS-INVENTORY-EN.md)

## The Central Design Principle

A good Agent plan is not merely a list of future actions.

It should allow an agent to determine:

1. what outcome is being pursued;
2. which evidence and files are authoritative;
3. what is inside and outside the task;
4. what sequence should be followed;
5. which decisions may be made autonomously;
6. when the task is complete;
7. when the agent must stop;
8. what must be recorded for the next agent.

For large projects, no single document should try to do all of this. The most reliable design is a layered planning system.

## 1. Use Different Documents for Different Kinds of Guidance

The LERU project separates five functions that are often mixed together:

| Artifact | Main question | Typical lifetime |
| --- | --- | --- |
| Standing agent handoff | What must always remain true in this project? | Long-lived |
| Phase or product plan | What outcome should this phase or feature produce? | Medium-lived |
| Workflow | How should this repeatable task be performed? | Long-lived |
| Status or control document | Where are we now, and what comes next? | Frequently updated |
| Embedded microplan | What is the next concrete action for this record? | Changes after each pass |

Keeping these functions separate reduces instruction drift.

### Standing Agent Handoff

Use a file such as `AGENTS.md` for:

- project goal;
- repository map;
- general source and quality rules;
- fixed data schemas;
- naming and status conventions;
- cross-cutting boundaries;
- minimum checks;
- completion checklist;
- current broad priorities.

Do not turn the standing handoff into a full historical log. Move detailed progress into status documents.

### Phase or Product Plan

Use a plan file when a bounded phase or product needs:

- a target outcome;
- workstreams or implementation phases;
- architecture choices;
- deliverables;
- acceptance criteria;
- risks and mitigations;
- a definition of done.

Examples in this project include the quality-consolidation plan and the timeline feature plan.

### Workflow

Use a workflow when the same task will be repeated for:

- multiple countries;
- multiple institutions;
- multiple documents;
- multiple comparisons;
- recurring updates.

A workflow should define the sequence, evidence classifications, templates, quality gates, and stop rules. It should not contain a constantly changing list of which country is next.

### Status or Control Document

Use a status file, tracker, or pair-specific plan for:

- task status;
- completed work;
- current source-check date;
- unresolved gaps;
- next task;
- implementation limitations;
- decisions that changed the plan.

A status document reports what happened. It should point back to the workflow that explains how the work is performed.

### Embedded Microplan

Use a field such as `nextFocus` or `nextFollowUp` when every record needs one concrete next action.

A good microplan is:

- record-specific;
- short enough to scan;
- evidence-based;
- explicit about the next source, field, or decision;
- updated when the pass is complete.

## 2. Decide Which Planning Artifact You Need

Use this decision table:

| Situation | Best artifact |
| --- | --- |
| The same rules apply to every task in the repository | Standing handoff |
| A new project phase has several workstreams | Phase plan |
| A task will be repeated many times | Workflow |
| Two entities need a dedicated task ledger | Pair/control plan |
| A feature has architecture and implementation phases | Product/feature plan |
| Work is partially implemented and needs a resume point | Progress log |
| Every data record needs a next action | Embedded microplan |
| A source or extraction must be reproducible | Registry or extraction log |

If two rows apply, use two linked artifacts instead of merging them.

Example:

- the country-pair workflow defines how any pair comparison works;
- the Netherlands-Belgium plan records what happened for that particular pair.

## 3. Give Every Plan a Clear Identity

At the top of every plan, state:

- title;
- status;
- status date;
- purpose;
- audience;
- controlling workflow or higher-level instruction;
- whether the document is active, exploratory, partially implemented, complete, or superseded.

Recommended header:

```md
# <Plan title>

Status: active | exploratory | partially implemented | complete | superseded
Status date: YYYY-MM-DD
Owner or audience: <role or group>
Governed by: <standing instruction or workflow>

## Purpose

<One paragraph describing the concrete outcome.>
```

Why this matters:

- a plan can remain accurate as a design document after implementation has moved on;
- a status date prevents old counts from looking current;
- `Governed by` establishes precedence;
- a clear status prevents an exploratory idea from being mistaken for an approved implementation task.

## 4. Write an Outcome, Not Merely an Activity

Weak purpose:

> Research the country and add sources.

Stronger purpose:

> Produce a source-current country dossier that identifies the first-line handler, decision-maker, second-line route, publication owner, funder consequences, and adjacent regimes, with every major claim linked to an official source.

The stronger version tells the agent what a successful end state looks like.

An outcome should identify:

- the user or audience;
- the practical question being answered;
- the artifact to be produced;
- the evidence standard;
- the most important exclusions.

## 5. Define Scope and Boundaries Explicitly

An Agent plan should state both:

- what is included;
- what must not be collapsed into the task.

This is especially important in research projects where neighboring concepts look similar.

Example:

```md
## Scope

Include:

- research-misconduct complaint routes;
- investigation and review bodies;
- funder notification or sanction routes;
- public decisions, summaries, statistics, and annual reports.

Keep separate:

- research-ethics approval;
- clinical-trial authorization;
- animal-research approval;
- data protection;
- quality assurance;
- employment discipline.
```

Boundary rules prevent category errors. They should appear in the standing handoff and, where especially important, be repeated in specialized workflows.

## 6. Identify the Unit of Work

Plans fail when the agent cannot tell what one completed unit is.

Possible units:

- one country;
- one institution;
- one source;
- one committee route;
- one case-file repository;
- one comparison axis;
- one feature phase;
- one dataset row.

The case-file workflow in this project deliberately defines the **route** as the unit, not the formal committee. This avoids missing ombudspersons, offices, secretariats, publication owners, and appeals bodies.

Recommended wording:

```md
## Unit of Work

Treat one complete complaint-to-publication route as the unit.
Do not assume that a formal committee owns every stage of the route.
```

## 7. Specify the Required Starting Context

Agents should not have to guess which files to read first.

List the minimum relevant starting context in order:

```md
## Required Starting Context

1. Read `AGENTS.md`.
2. Read this workflow.
3. Read the pair- or feature-specific plan.
4. Inspect the local source note.
5. Inspect the current data record.
6. Check the relevant registry rows.
7. Go online only for current-source verification or missing official evidence.
```

The “local first” rule has several benefits:

- avoids repeating completed research;
- preserves previous judgments and negative findings;
- reduces unnecessary online searching;
- makes contradictions visible;
- keeps the existing data model central.

## 8. Make the Evidence Policy Operational

“Use good sources” is not enough.

A strong Agent plan specifies:

- source hierarchy;
- when secondary sources are allowed;
- how current versions are identified;
- what metadata must be captured;
- how conflicting sources are resolved;
- what to do with inaccessible sources;
- whether translation requires review;
- what counts as enough evidence to update a conclusion.

Example source policy:

```md
## Source Policy

Prefer:

1. legislation and official legal databases;
2. official body pages and procedures;
3. official reports, archives, registers, and decisions;
4. official institutional and funder sources;
5. secondary sources only as search bridges.

For each durable source, record:

- issuing body;
- title;
- URL or local path;
- document date;
- access date;
- route supported;
- whether it is current, historical, moved, superseded, or inaccessible;
- where it is used in the output.
```

## 9. Treat Missingness as Data

One of the most important rules in evidence mapping is:

> Not found is not the same as absent.

Plans should provide controlled missingness labels.

Useful labels:

- `not_found`;
- `not_applicable`;
- `unclear`;
- `source_inaccessible`;
- `translation_pending`;
- `historical_only`;
- `procedure_only`;
- `requires_expert_confirmation`.

Good negative finding:

> A publication duty is stated in the procedure, but no live archive or recurring public report was located in this pass.

Weak negative finding:

> The body does not publish.

The first statement is reproducible and bounded by the search. The second overclaims.

## 10. Break Large Work into Atomic Tasks

An atomic task has:

- one primary goal;
- a bounded source set;
- a clear output;
- a completion test;
- a named next task.

The country-pair workflow is a strong example. It separates:

- source inventory;
- current-source verification;
- dossier update;
- quality gate;
- each comparison axis;
- synthesis;
- implementation;
- visual review.

Why this matters:

- conclusions are not written before sources are checked;
- data changes are separated from comparison prose;
- UI implementation does not begin before content is stable;
- each agent handoff is reviewable;
- the user can redirect the project between tasks.

Recommended stop rule:

```md
Complete one numbered task only.
Do not continue into the next task unless the user explicitly asks.
At the end, report the completed task and name the next task.
```

Use this rule only when staged review is genuinely important. Routine small tasks do not need artificial fragmentation.

## 11. Separate Research from Mutation

Plans should explain when findings may change project files.

Useful sequence:

1. inventory existing evidence;
2. verify current sources;
3. stabilize the conclusion;
4. update data;
5. update tracker and logs;
6. verify syntax and consistency.

File-update matrix:

| Finding | File normally updated |
| --- | --- |
| New or corrected system conclusion | Main data record |
| Changed publication model | Transparency data |
| Durable new or replacement source | Source registry |
| Detailed search and negative findings | Source note |
| Changed project status or next action | Project tracker |
| New overview extraction | Extraction status and log |
| Implementation progress | Feature progress log |

The plan should encourage the smallest stable update. Do not modify every project file merely because a pass occurred.

## 12. Define Data Shapes and Allowed Values

If an agent must update structured data, the plan should provide:

- required fields;
- optional fields;
- allowed status labels;
- nested object shapes;
- examples;
- rules for adding a new schema.

Weak instruction:

> Add committee information.

Strong instruction:

```md
Each route record should include:

- institution;
- committee or office;
- route type;
- status;
- scope;
- start date if known;
- complaint or review route;
- public links;
- evidence signals;
- boundary warning where relevant.
```

Stable schemas reduce:

- inconsistent field names;
- duplicate concepts;
- free-text drift;
- renderer failures;
- later migration cost.

## 13. Use Controlled Classifications

Repeated judgments should use fixed labels.

Example public-output classification:

- `Structured archive`;
- `Stable case page`;
- `Individual case files`;
- `Annual-report summaries`;
- `Aggregate statistics only`;
- `Procedure only`;
- `No public trace found`;
- `Boundary-only public output`.

A classification should include:

- a label;
- a definition;
- inclusion and exclusion criteria;
- one or more examples;
- a rule for uncertainty.

Do not create a new classification after every case. Pilot it on several examples first, then stabilize it.

## 14. Distinguish Method, Status, and Priority

These are different:

- **Method:** how case-file repositories are classified.
- **Status:** which countries have completed that classification.
- **Priority:** which repository should be indexed next.

Mixing them causes documents to become stale quickly.

Recommended architecture:

```text
AGENTS.md
  -> fixed project rules

docs/workflows/<WORKFLOW>.md
  -> repeatable method

docs/plans/<PHASE-OR-PAIR-PLAN>.md
  -> target and task structure

docs/status/<PROGRESS>.md
  -> what is complete and what resumes next

data/<record>
  -> concrete next action
```

## 15. Add Quality Gates

A quality gate answers whether work may proceed to the next phase.

Example:

```md
## Country Quality Gate

Record one status:

- `comparison-ready`;
- `comparison-ready with stated gaps`;
- `not ready`.

Answer:

- Is the national model current?
- Is the normative baseline current?
- Are first-line and second-line routes clear?
- Is the publication owner clear?
- Are funder routes clear?
- Are boundary routes separated?
- Are missing or inaccessible sources explicit?
```

Quality gates are more useful than vague statements such as “research complete.”

## 16. Write Definitions of Done at More Than One Level

Complex projects need several completion levels:

### Task Definition of Done

What makes one atomic task complete?

Example:

- every important source has a current-source status;
- moved and superseded sources are marked;
- no data conclusions were updated prematurely;
- the next task is named.

### Record Definition of Done

What makes one country or institution usable?

Example:

- system model;
- route directory;
- source backbone;
- public-output assessment;
- boundary separation;
- explicit gaps.

### Phase Definition of Done

What makes the entire quality phase complete?

Example:

- all represented countries have a current-source date;
- all have code and ENRIO status;
- all have route directories and public-output assessments;
- missing overviews are resolved.

### Product Definition of Done

What makes a feature ready?

Example:

- navigation exposes the feature;
- content is source-linked;
- mobile layout works;
- syntax checks pass;
- accessibility behavior is verified.

## 17. Include Stop Conditions and Escalation Rules

An agent needs to know when not to continue.

Useful stop conditions:

- the task requires a policy choice not supplied by the user;
- a missing source changes the system interpretation materially;
- two official sources conflict and cannot be reconciled;
- an action would expose private or restricted information;
- implementation would require a new data model not authorized by the plan;
- the next task is a separate quality-gate or review phase;
- the requested source or document is inaccessible after reasonable alternatives.

Recommended wording:

```md
Stop and report the blocker if resolving it would require:

- a new scope decision;
- access to private material;
- a change to the approved data model;
- a substantive choice between conflicting official interpretations.
```

Do not use stop conditions merely because the work is difficult. They should protect scope, authority, evidence quality, or privacy.

## 18. Make Verification Proportionate and Explicit

Plans should name the minimum checks that match the risk.

Examples:

- syntax checks after editing JavaScript data;
- duplicate-ID checks after editing registries;
- count reconciliation after bulk extraction;
- link checks for generated documentation;
- render checks for document or presentation artifacts;
- browser checks after UI changes;
- no browser check for a purely textual country-data edit unless requested.

Recommended verification block:

````md
## Verification

After data edits:

```powershell
node --check data/countries.js
node --check data/transparency.js
node --check assets/js/app.js
```

After registry edits:

```powershell
Import-Csv data/source-registry.csv |
  Group-Object source_id |
  Where-Object Count -gt 1
```

Run visual checks only when the task changes the rendered interface.
````

## 19. Design a Useful Handoff

A task is not fully complete until the next agent can understand its result.

Minimum handoff:

- task completed;
- exact scope covered;
- files changed;
- sources or local documents checked;
- key findings;
- unresolved gaps;
- next recommended task;
- checks run;
- any status or count that changed.

Template:

```md
## Handoff

- Task completed:
- Scope:
- Files changed:
- Sources checked:
- Key findings:
- Conclusions changed:
- Negative findings:
- Remaining gaps:
- Checks run:
- Next task:
```

Avoid handoffs that only say “done.” They destroy continuity.

## 20. Keep Plans Current Without Rewriting History

Use:

- status dates;
- append-only pass notes where useful;
- progress ledgers;
- source check dates;
- explicit `superseded` or `historical` labels;
- snapshot files only when their purpose is documented.

When a plan has been implemented:

- do not erase the original design reasoning;
- change its status or add a link to the progress log;
- make the progress log authoritative for the resume point;
- update current counts in the tracker, not in every historical paragraph.

This project demonstrates why this matters:

- the timeline plan still says “planned,” while the progress log records partial implementation;
- the LERU plan remains an exploratory architecture document after the feature was built;
- later member-validation documents supersede some earlier summary counts.

## 21. Protect Privacy and Publication Boundaries

Plans for public-facing evidence products should say what must remain private.

Example:

```md
## Public-Safe Rules

- Use only public institutional role information.
- Do not reproduce personal email addresses or telephone numbers.
- Do not publish private member feedback or unpublished case details.
- Do not imply that client-side hiding is access control.
- Treat anything committed to a public static repository as public.
- Describe restricted output as restricted; do not paraphrase it into a public case file.
```

Privacy rules belong in the plan before implementation begins.

## 22. Common Failure Modes

### Failure 1: One Giant Plan

Symptom:

- method, status, backlog, data schema, and implementation history are all in one file.

Repair:

- separate standing instructions, workflow, phase plan, and progress log.

### Failure 2: No Stop Rule

Symptom:

- an agent inventories sources, changes conclusions, rewrites the UI, and generalizes the data model in one pass.

Repair:

- use atomic tasks and quality gates.

### Failure 3: Activity Without Outcome

Symptom:

- “Search more institutions.”

Repair:

- define the target coverage and what question the added institutions must resolve.

### Failure 4: Missingness Treated as Absence

Symptom:

- “No cases exist” because no public archive was found.

Repair:

- use bounded negative findings and missingness labels.

### Failure 5: Boundary Collapse

Symptom:

- ethics approvals or quality-assurance reports are counted as misconduct decisions.

Repair:

- define lanes and require a “why this is or is not core evidence” field.

### Failure 6: No Source Ownership

Symptom:

- a published case is attributed to the handling body even though a sector association owns the publication page.

Repair:

- separate handler, decision-maker, second-line body, and publication owner.

### Failure 7: Stale Counts Presented as Current

Symptom:

- several plans contain different registry totals without dates.

Repair:

- add status dates and identify one live tracker as authoritative.

### Failure 8: Unbounded Data Collection

Symptom:

- “Check all universities.”

Repair:

- first prove the route types with a purposive sample; widen only when the system shape or comparison requires it.

### Failure 9: Data Changes Without Audit Trail

Symptom:

- app wording changes, but no source note or registry entry explains why.

Repair:

- require a source note, source ID, access date, and handoff.

### Failure 10: Verification Does Not Match the Change

Symptom:

- no syntax check after data edits, or an expensive visual audit after a text-only note change.

Repair:

- state proportional checks in the workflow.

## 23. Reusable Template: Standing `AGENTS.md`

```md
# AGENTS.md

## Project Goal

<What the project produces and for whom.>

## Current State

- Current coverage:
- Current active phase:
- Special cases:

## Repository Map

- `<path>`: <role>

## Standard Workflow

1. Read local context.
2. Inspect existing evidence and logs.
3. Verify missing or current evidence.
4. Model the result using the project schema.
5. Update the smallest stable set of files.
6. Run required checks.
7. Record the handoff and next action.

## Source Rules

1. <highest-priority source>
2. <second-priority source>
3. <fallback>

## Data Schema

- Required fields:
- Optional fields:
- Allowed status values:

## Boundary Rules

- Keep <A> separate from <B>.

## Definition of Good Output

- ...

## Completion Checklist

1. ...

## Working Style

- ...
```

## 24. Reusable Template: Phase Plan

```md
# <Phase name>

Status:
Status date:
Governed by:

## Purpose

<Outcome and audience.>

## Baseline

- Current coverage:
- Completed prior work:
- Known gaps:

## Target Standard

The phase is intended to answer:

1. ...

## Workstream 1: <Name>

Goal:

For each unit:

- ...

Output:

- ...

Quality gate:

- ...

## Workstream 2: <Name>

...

## Suggested Order

1. ...

## Risks and Boundaries

- ...

## Definition of Done

- ...
```

## 25. Reusable Template: Repeatable Workflow

```md
# <Workflow name>

Use this workflow when:

- ...

## Core Question

1. ...

## Unit of Observation

Treat <X> as the unit.

## Required Starting Context

1. ...

## Controlled Classifications

- `<label>`: <definition>

## Standard Task Sequence

### Task 1: <Name>

Goal:

Steps:

1. ...

Output:

- ...

Definition of done:

- ...

Stop after this task.

### Task 2: <Name>

...

## Source Policy

- ...

## Missingness and Negative Findings

- ...

## File Update Rules

- ...

## Verification

- ...

## Handoff Template

- ...
```

## 26. Reusable Template: Pair or Control Plan

```md
# <Entity A>-<Entity B> Control Plan

Status date:
Audience:
Governed by: `<workflow path>`

## Purpose

<Why these two entities are being compared or coordinated.>

## Task Ledger

| Task | Status | Evidence / note | Next action |
| --- | --- | --- | --- |
| 0A | Not started | | |

## Entity A Quality Gate

- Status:
- Current-source date:
- Blocking gaps:
- Non-blocking extraction targets:

## Entity B Quality Gate

- Status:
- Current-source date:
- Blocking gaps:
- Non-blocking extraction targets:

## Output Status

- Draft:
- Implementation:
- Review:

## Next Task

- ...
```

## 27. Reusable Template: Record-Level Microplan

```js
{
  nextFocus: "Index the 2024-2026 annual reports by year, route, allegation category, outcome, publication owner, and retention rule; preserve clinical-trial and data-protection outputs as separate boundary lanes."
}
```

A strong microplan contains:

- one primary target;
- the source or repository family;
- the fields to extract;
- the interpretive boundary;
- a monitoring or decision point if relevant.

A weak microplan:

```text
Do more research.
```

## 28. Agent-Plan Review Checklist

Before adopting a plan, verify:

### Identity and Authority

- Is the plan’s status clear?
- Does it have a date?
- Does it identify the controlling workflow or higher-level instruction?
- Is the intended audience clear?

### Scope

- Is the outcome explicit?
- Are inclusions and exclusions stated?
- Is the unit of work defined?
- Are privacy or authorization boundaries explicit?

### Evidence

- Is there a source hierarchy?
- Is “local first” or another starting rule clear?
- Are current, historical, moved, superseded, and inaccessible sources distinguished?
- Is missingness handled without overclaiming?

### Execution

- Is the task sequence ordered?
- Are large tasks divided into reviewable units?
- Are stop conditions explicit?
- Is it clear when files may be changed?

### Data and Quality

- Are data fields and allowed values specified?
- Are classifications defined?
- Are boundary regimes protected?
- Are quality gates present?
- Is the definition of done testable?

### Verification and Continuity

- Are checks proportional to the changes?
- Is the handoff format specified?
- Is the next task recorded?
- Is there an authoritative current-status location?

If several answers are “no,” the plan is likely a narrative intention rather than an executable Agent plan.

## 29. Recommended Minimal Planning Package for a New Project

For a new project of comparable complexity, begin with:

1. `AGENTS.md`
   - standing rules and repository map;
2. `docs/workflows/CORE-WORKFLOW.md`
   - the repeatable task method;
3. `docs/plans/CURRENT-PHASE-PLAN.md`
   - current target and workstreams;
4. `docs/status/PROJECT-STATUS.md`
   - task ledger and resume point;
5. `data/source-registry.csv`
   - evidence provenance;
6. one `nextFocus` field or backlog item per record;
7. explicit validation and syntax checks.

Add specialized workflows only after repeated work shows that the core workflow is insufficient.

## 30. Final Guidance

The best Agent plans combine precision with restraint.

They are precise about:

- outcome;
- evidence;
- data shape;
- sequence;
- boundaries;
- completion;
- handoff.

They are restrained about:

- expanding scope;
- creating new schemas too early;
- treating missing evidence as absence;
- changing conclusions before verification;
- combining research, implementation, and review into one uncontrolled pass.

The LERU project’s strongest planning pattern is the interaction between:

- a stable standing handoff;
- specialized repeatable workflows;
- phase-specific outcome plans;
- current status ledgers;
- record-level next actions;
- source and extraction audit trails.

That combination turns an Agent plan from a prompt into maintainable project infrastructure.
