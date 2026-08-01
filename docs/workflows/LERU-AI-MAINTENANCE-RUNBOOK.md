# LERU AI Maintenance Runbook

Status: active
Status date: 2026-07-30
Audience: maintainers of the LERU Integrity Map evidence base and report
Governed by: `AGENTS.md` and `docs/article/LERU-REPORT-PRODUCTION-GUIDE.md`

## Purpose

Use this workflow to inventory report evidence, regenerate denominators, detect technical source changes, and prepare bounded review batches. The tooling deliberately separates technical observations from substantive research judgments.

It may report that a URL redirects, a response fingerprint changed, or a source is inaccessible. It must not silently conclude that the replacement is equivalent, that a report claim has changed, or that a body or output route does not exist.

## Tools and artifacts

| Tool or artifact | Role |
| --- | --- |
| `scripts/build_leru_source_manifest.mjs` | Generate source and canonical-input manifests from live project data. |
| `scripts/generate_leru_report_counts.mjs` | Regenerate country, overview, transparency, registry, member, validation, and public-output denominators. |
| `scripts/audit_leru_sources.mjs` | Perform bounded non-destructive HTTP(S) checks and produce non-applied update suggestions. |
| `scripts/run_leru_maintenance_batch.mjs` | Run the complete manifest, counts, pilot, tests, and completion-report sequence. |
| `data/maintenance/leru-source-manifest.json` | Machine-readable source inventory and provisional claim crosswalk. |
| `data/maintenance/leru-canonical-inputs.json` | File hashes, roles, and working-tree state for canonical report inputs. |
| `reports/maintenance/<batch>/` | Dated outputs, exceptions, suggested updates, validation, and handoff. |

## Human–AI boundary

AI may:

- generate and compare technical manifests;
- check URLs, redirects, MIME types, metadata, and bounded fingerprints;
- regenerate counts from canonical data;
- identify potentially changed sources and prepare visible proposed patches;
- update established evidence fields after official-source verification when a later bounded task explicitly authorizes that mutation;
- run syntax, consistency, and reproducibility checks.

Human confirmation remains required for:

- the report publication type, group name, authorship, approval route, and publication data cut-off;
- interpreting conflicting official sources or translation-sensitive changes;
- changing a headline conclusion or classification with legal, linguistic, or institutional ambiguity;
- selecting principal findings, recommendations, examples, and final wording;
- sending, circulating, submitting, or publishing any file or message.

## Initial or structural run

Run the complete phase-1 sequence:

```powershell
node scripts/run_leru_maintenance_batch.mjs `
  --access-date 2026-07-30 `
  --output-dir reports/maintenance/2026-07-30-phase-1
```

Review in this order:

1. `batch-summary.md`;
2. `validation-results.json`;
3. `source-audit.md`;
4. `content-delta.json`;
5. `suggested-manifest-updates.json`;
6. `derived-counts.md`;
7. source and canonical-input manifests when a row-level question remains.

The deliberately inaccessible pilot source must appear as a handled exception while the batch still passes.

## Monthly technical source check

First regenerate manifests and counts:

```powershell
node scripts/build_leru_source_manifest.mjs --access-date YYYY-MM-DD
node scripts/generate_leru_report_counts.mjs `
  --access-date YYYY-MM-DD `
  --output-dir reports/maintenance/YYYY-MM-DD-monthly
```

Then audit high-priority sources. Select their IDs from the manifest rather than hand-copying stale URLs. A full monthly command can be generated from the JSON manifest; for a bounded manual run, pass an explicit comma-separated ID list:

```powershell
node scripts/audit_leru_sources.mjs `
  --manifest data/maintenance/leru-source-manifest.json `
  --ids LRS-AAA,LRS-BBB,LRS-CCC `
  --access-date YYYY-MM-DD `
  --output-dir reports/maintenance/YYYY-MM-DD-monthly
```

Use `--previous-audit <path-to-source-audit.json>` to distinguish an initial baseline from a technical change. Do not treat a fingerprint difference as a semantic change until the relevant content has been compared.

Monthly completion requires:

- audit artifacts and suggested updates;
- a review list for redirects, failures, MIME changes, and fingerprint changes;
- regenerated counts;
- no automatic claim or source replacement.

## Quarterly content review

Use the monthly technical output to define a bounded content batch. State:

- named sources, members, countries, or repository series;
- exact fields or claims being checked;
- access date and proposed data cut-off;
- official source types and languages;
- stop conditions;
- files that may be changed.

For each flagged source:

1. open the current official page or document;
2. compare it with the prior source or locally archived version;
3. record owner, title, date/version, URL, access date, purpose, and storage/registry location;
4. distinguish procedure visibility, aggregate activity reporting, and case-level public output;
5. preserve boundary regimes as separate lanes;
6. update only evidence-confirmed fields;
7. regenerate affected counts and report the visible diff;
8. leave ambiguous interpretation as a review item.

## Pre-draft evidence freeze

Before a formal report draft:

1. obtain Lodewijk’s publication data cut-off;
2. ensure governance decisions from Claire are recorded separately;
3. regenerate the canonical-input manifest and derived counts;
4. audit all sources supporting headline claims, tables, and figures;
5. resolve or disclose source-current exceptions;
6. archive the exact input hashes, Git commit and working-tree state;
7. generate the claim-evidence ledger, tables, figures, references, and annex from that same snapshot;
8. block any headline claim without a source, denominator, date, limitation, and review status.

Do not label a dirty technical snapshot as a publication freeze without recording all changed paths and hashes.

## Annual full review

The annual review covers:

- all canonical input files and overview documents;
- country, transparency, member, extraction-log, and source-registry consistency;
- laws, codes, committee routes, funder routes, annual-report corridors, and decision repositories;
- dated negative findings and inaccessible sources;
- boundary classification;
- member-validation status;
- report counts, claim ledger, references, tables, figures, and annex;
- whether an update, correction, or erratum is warranted.

Complete it in bounded country, member, or repository batches. Do not launch one unbounded crawl of every source.

## Recovery routes

### Redirect

- Preserve the old URL in the audit trail.
- Check whether the final page is owned by the same official organization.
- Compare title, date/version, route, powers, reporting duties, confidentiality, appeal, and publication provisions.
- Apply a replacement only after substantive equivalence or documented change is established.

### HTTP error, timeout, or network failure

- Record the dated result as `source inaccessible in this pass`.
- Retry once with the official site navigation or a current official search result.
- Check the existing local copy and source registry.
- Do not infer that the body, document, or output route no longer exists.

### Changed fingerprint

- Compare the current source with the previous audit or locally stored version.
- Ignore purely technical layout, tracking, or cookie changes when they do not alter relevant evidence.
- Record claim-relevant changes with exact passages or structured fields and provenance.
- Escalate translation-sensitive or legally ambiguous changes.

### Conflicting official sources

- Retain both sources and their dates.
- Prefer the competent owner and newest valid version only when authority and supersession are explicit.
- Do not silently reconcile conflicting powers, route descriptions, or publication duties.
- Record the conflict as a human decision item.

### Count mismatch

- Do not repair the report number by hand.
- Identify the canonical input and generator rule responsible for the mismatch.
- Correct the source data or generator with a visible diff.
- Regenerate every dependent count, table, and figure.

## Required handoff

Every maintenance batch ends with:

- target set and technical access date;
- canonical inputs and changed files;
- source-by-source results;
- regenerated denominators;
- claims strengthened, weakened, changed, or still unsupported;
- redirects, failures, translation issues, privacy issues, and human decisions;
- validation commands and results;
- next bounded batch.
