# LERU AI maintenance foundation

Status: complete
Status date: 2026-07-30
Owner or audience: LERU Integrity Map maintainers and review agents
Governed by: `AGENTS.md` and `docs/article/LERU-REPORT-PRODUCTION-GUIDE.md`

## Goal

Implement `p-leru-ai-maintenance-pipeline` as a non-destructive, reproducible maintenance foundation. The implementation must inventory canonical inputs, generate a source-maintenance manifest, regenerate report counts from live data, audit source availability and technical change signals, and produce a reviewable batch report without silently changing research conclusions.

## Bounded batch contract

- Target set: canonical report inputs and the report-critical URLs referenced by the country, transparency, and 24-member data layers.
- Evidence question: which sources and data files currently support the report, when were they last checked, and which technical changes or access failures need human review?
- Technical access date: 2026-07-30. This is not the report's publication data cut-off.
- Canonical inputs: `data/countries.js`, `data/transparency.js`, `data/leru-members.js`, the three extraction logs, `data/source-registry.csv`, the report gap matrix, public-output audit, overview documents, report outline, report builder, production guide, and standing instructions.
- Output: machine-readable manifests, regenerated count artifacts, source-audit artifacts, suggested non-applied manifest updates, a completion memo, tests, and a maintenance runbook.
- Stop conditions: do not resolve conflicting official sources, translation uncertainty, boundary classification, publication ownership, authorship, report interpretation, or publication governance automatically. Record these as review items.

## Files to add or update

- `scripts/leru_maintenance_lib.mjs`: shared loading, normalization, hashing, CSV, and report helpers.
- `scripts/build_leru_source_manifest.mjs`: canonical-input and source-manifest generator.
- `scripts/generate_leru_report_counts.mjs`: reproducible derived-count generator.
- `scripts/audit_leru_sources.mjs`: non-destructive technical source audit.
- `scripts/run_leru_maintenance_batch.mjs`: bounded batch orchestrator.
- `scripts/tests/leru_maintenance.test.mjs`: deterministic unit and integration tests.
- `data/maintenance/`: generated source and canonical-input manifests plus schema documentation.
- `reports/maintenance/2026-07-30-phase-1/`: dated count, audit, suggested-update, and completion artifacts.
- `docs/workflows/LERU-AI-MAINTENANCE-RUNBOOK.md`: exact recurring commands, review gates, and recovery routes.
- Linked Overview outcome: mark only `p-leru-ai-maintenance-pipeline` and its checklist complete after all acceptance checks pass.

## Manifest schema

Each source row will retain a stable ID and include:

- title and source owner or hostname fallback;
- country and institution contexts;
- URL and source type;
- evidence layers and provisional dependent claim keys;
- an explicit general-integrity, boundary, mixed-review, or unclassified evidence lane;
- report-critical flag and expected check cadence;
- last checked date, document/version date when known, local or registry location, and current status;
- the canonical data paths that reference the source;
- explicit review notes rather than inferred resolution of ambiguous meaning.

Canonical local inputs will be recorded separately with role, path, existence, byte size, SHA-256 hash, modified time, Git status, and the claims or counts they govern.

## UI and schema impact

No front-end rendering or existing app-data schema changes are planned. Generated maintenance files are additive. Existing country, transparency, member, registry, and report content will remain unchanged during the technical pilot.

## Pilot

The audit pilot must include:

1. a live official HTML page;
2. an official PDF/code document;
3. an annual-report corridor;
4. a decision or public-output archive;
5. a URL that redirects;
6. a deliberately inaccessible test URL.

The audit may record status, redirects, MIME type, ETag, Last-Modified, byte count, and a bounded content fingerprint. It must not interpret a redirect as substantive equivalence or an access failure as proof that a source does not exist.

## Validation

- Run Node syntax checks on all new scripts and existing app data.
- Run `node --test scripts/tests/leru_maintenance.test.mjs`.
- Regenerate manifests and counts twice and compare deterministic content.
- Confirm the pilot reports the deliberately inaccessible source as an exception without failing the batch.
- Confirm source-registry IDs remain unique and all manifest IDs are unique.
- Confirm derived counts match the live canonical data and include explicit denominators.
- Confirm existing tracked and untracked user files are not overwritten.
- Run the Overview validator after updating the linked task state.

## Definition of done

- All planned artifacts exist and are reproducible from documented commands.
- The source manifest covers every unique URL referenced by the three live data layers and crosswalks matching registry rows.
- The count generator reports the live country, dossier, transparency, source, member, validation, and public-output denominators.
- The six-case pilot finishes with reviewable results and non-applied suggested updates.
- Tests and project syntax checks pass.
- A completion memo lists changed files, counts, exceptions, unsupported or unchanged claims, and the next bounded batch.

## Completion record

Completed on 2026-07-30. The generated source manifest contains 2,208 unique sources, including 2,047 referenced by live report data. All 54 canonical inputs were present and unchanged by the run. The six-case pilot met 6/6 expected outcomes, all 13 scripted checks passed, and the linked Overview project was reconciled to `done`. The next bounded project is `p-leru-source-current-verification`.

---

# LERU priority-member source-current verification

Status: complete
Status date: 2026-07-30
Overview project: `p-leru-source-current-verification`
Owner or audience: LERU Integrity Map maintainers and report authors
Governed by: `AGENTS.md` and `docs/article/LERU-REPORT-PRODUCTION-GUIDE.md`

## Bounded batch contract

- Target set: University of Geneva, University of Strasbourg, University of Freiburg, Trinity College Dublin, Universite Paris-Saclay, LMU Munich and Heidelberg University.
- Evidence question: for each member, are the cited scientific-misconduct route, ombuds or committee page, code or procedure, public-output or annual-report corridor, national or sector escalation source and resulting public-output claim still current and correctly separated from boundary regimes?
- Technical access date: 2026-07-30. This is not the report publication data cut-off.
- Canonical inputs: `data/leru-members.js`, `data/leru-extraction-log.csv`, `data/source-registry.csv`, `docs/status/LERU-REPORT-GAP-MATRIX.md`, `docs/status/LERU-PUBLIC-OUTPUT-AUDIT.md`, the current source manifest, relevant country source notes and the linked Overview project.
- Official source types and languages: official university, national body, funder or legal pages and documents in English, French or German; official local-language searches take precedence over secondary summaries.
- Expected outputs: a seven-member control table, a source-by-source technical and substantive verification record, evidence-backed data/log/registry patches, an exceptions and human-review list, regenerated counts and a completion memo.
- Stop conditions: do not infer non-existence from a failed or empty search; do not treat redirects as equivalent without comparing content; do not merge ethics, clinical, animal, data, IP, QA, student, employment, whistleblowing or fraud routes into general misconduct handling; do not resolve legally, linguistically or institutionally ambiguous changes without human or member review; do not contact members or publish.

## Execution sequence

1. Extract the current seven profiles and all report-critical source IDs connected to them.
2. Run the bounded technical audit and record redirects, access failures, MIME changes and current metadata.
3. Reopen every route- and claim-bearing official source; compare moved or replaced procedures on remit, intake, investigation, decision, appeal, confidentiality, reporting and publication.
4. Retest each dated output-negative finding through targeted official local-language searches for annual reports, activity reports, statistics, anonymized summaries, decisions and Rectorate or governance reporting.
5. Apply only evidence-confirmed changes, preserve prior sources in the audit trail and date every negative finding.
6. Regenerate the source manifest and report counts; run syntax, data-consistency and batch-specific checks.
7. Reconcile only the completed seven-member batch in Overview. Keep the wider project open for the eleven regular profiles and cross-country baselines.

## Validation

- `node --check data/leru-members.js`
- `node --check data/countries.js`
- `node --check data/transparency.js`
- `node --check assets/js/app.js`
- `node --test scripts/tests/leru_maintenance.test.mjs`
- regenerate the source manifest and derived counts from canonical inputs
- confirm source-registry IDs remain unique and all seven target profiles retain source links, dated caveats, member-validation status and boundary separation
- run the linked Overview validation after reconciliation

## Definition of done for this batch

- Each target has a completed route/procedure/output/escalation checklist with official-source provenance.
- Every previously cited URL is classified as current, redirected, moved, replaced, inaccessible or substantively changed.
- Every output-negative claim has a 2026-07-30 retest record and cautious wording.
- Profile classifications change only where official evidence supports the change; ambiguous points remain explicit review items.
- Derived counts, gap matrix and public-output audit agree with the canonical member data.
- Validation passes and the completion memo names the next bounded source-current batch.

## Completion record

Completed on 2026-07-30. The seven priority profiles and 44 current profile-linked sources were checked. Heidelberg moved from procedure-only to historical-or-case-specific on official 2019 interim-summary evidence; Freiburg gained verified historical Rector-report counts; the other five classifications were retained with dated negative retests and explicit boundary exclusions. The strict standing-output count remains 14 of 24, while the broader categories are 12 local, 4 national or sector, 4 procedure-only, 2 restricted or internal and 2 historical or case-specific. The source registry now has 1,585 unique IDs and the regenerated manifest has 2,216 sources, 2,053 report-critical. Syntax, five maintenance tests, batch invariants, derived counts, diff checks and Overview validation passed. The wider Overview project remains available, with the eleven regular-priority profiles as the next bounded batch.
