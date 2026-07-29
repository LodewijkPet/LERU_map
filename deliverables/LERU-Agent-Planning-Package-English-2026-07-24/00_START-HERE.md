# LERU Integrity Map: Agent Planning Package

Package date: 24 July 2026

## Purpose

This package brings together the English-language planning and instruction materials used to guide agent-supported information processing in the **Research Integrity Systems in Europe / LERU Integrity Map** project.

It is intended as:

- a transparent account of the planning architecture used in the project;
- a worked example of how complex Agent plans can be structured;
- a practical reference for designing standing instructions, phase plans, workflows, control documents, microplans, and audit trails.

These materials describe a project method and working architecture. They are not an official LERU policy statement or an institutional audit.

## Recommended Reading Order

1. `docs/status/AGENT-PLANS-AND-INSTRUCTIONS-INVENTORY-EN.md`
   - A project-specific inventory of every form of Agent planning and instruction.

2. `docs/plans/AGENT-PLAN-DESIGN-GUIDE.md`
   - A reusable guide to drafting effective Agent plans, with templates, review criteria, quality gates, stop conditions, and common failure modes.

3. `AGENTS.md`
   - The standing project handoff used to guide country-level research and maintenance.

4. `docs/workflows/`
   - The repeatable methods for case-file research, country-pair comparison, and LERU institution extraction.

5. `docs/plans/` and `docs/status/`
   - Examples showing the difference between a target plan, an execution workflow, and a current-status ledger.

6. `data/`
   - Examples of record-level next actions, working notes, source registration, and extraction logs.

## Package Structure

```text
00_START-HERE.md
AGENTS.md
README.md
protocol/
docs/
  plans/
  workflows/
  status/
  article/
reports/
  project-overview.html
data/
  country and LERU data containing record-level next actions
  country working notes
  source registry and extraction logs
assets/
  image used by the protocol and project overview
08_cover_email/
  suggested accompanying email
```

The repository-relative paths have deliberately been preserved so that links between the source documents continue to work after the ZIP is extracted.

## The Planning Model in One Page

The project uses five linked guidance layers:

| Layer | Purpose |
| --- | --- |
| Standing handoff | Defines what must always remain true |
| Phase or product plan | Defines what a phase or feature must deliver |
| Workflow | Defines how a repeatable task is performed |
| Status or control document | Records what has happened and what comes next |
| Embedded microplan | Gives the next concrete action for one country or institution |

Audit and provenance files support all five layers by recording the source, access date, extraction event, and evidence use.

## Important Interpretation Notes

- Use files without the `-2023-1236` suffix as the current canonical versions. Snapshot files are not included in this package.
- The protocol is a methodological scaffold and contains explicitly labelled placeholder examples.
- Some design plans predate implementation. In those cases, the corresponding progress or status file is authoritative for the current resume point.
- Different files have different status dates. This is documented in the English inventory.
- Absence of public evidence is not treated as proof that a route, case, or internal output does not exist.
- Research ethics, clinical trials, animal research, data protection, quality assurance, IP, open science, employment, and whistleblowing are kept separate from general research-misconduct handling unless an official source explicitly connects them.

## Suggested Use

For discussion of Agent-plan design, focus on:

- the separation between method and status;
- the one-task-at-a-time rule in the country-pair workflow;
- controlled classifications and missingness labels;
- file-update rules;
- definitions of done at task, record, phase, and product levels;
- explicit handoff and next-task requirements;
- record-level `nextFocus` and `nextFollowUp` fields;
- the source registry and extraction logs as continuity infrastructure.
