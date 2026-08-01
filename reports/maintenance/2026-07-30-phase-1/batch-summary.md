# LERU AI maintenance foundation — completion memo

Technical access date: 2026-07-30

## Batch contract

- Target set: canonical report inputs and all unique HTTP(S) sources represented in the live country, transparency, member, and source-registry layers.
- Evidence question: which inputs and sources support report maintenance, which technical source signals are current, and which exceptions require review?
- Publication data cut-off: not set by this batch.
- Mutation boundary: the pilot made no automatic country, transparency, member, source-registry, report-claim, or publication changes.

## Outputs

- `data/maintenance/leru-source-manifest.json` and `.csv`
- `data/maintenance/leru-canonical-inputs.json` and `.csv`
- `derived-counts.json` and `.md` in this batch folder
- `source-audit.json`, `.csv`, and `.md` in this batch folder
- `content-delta.json` in this batch folder; first runs establish a technical baseline and later runs compare fingerprints
- `suggested-manifest-updates.json` in this batch folder; suggestions are not applied
- `validation-results.json` in this batch folder
- `docs/workflows/LERU-AI-MAINTENANCE-RUNBOOK.md`

## Generated denominators

| Measure | Current value |
| --- | ---: |
| Countries | 49 |
| Deep dossiers | 40 |
| Overview documents | 40 |
| Transparency entries | 35 |
| Source-registry rows | 1568 |
| LERU members | 24 |
| Member validations processed/open | 6/18 |
| Strict public-output evidence | 14/24 |

## Manifest coverage

- Unique sources: 2208
- Report-critical sources represented in live data: 2047
- Canonical local inputs: 54; missing: 0
- Sources whose technical owner still uses a hostname fallback: 2208
- Sources without a recorded prior access date: 22
- Sources without an explicit or title/URL-derived version signal: 1105
- Effective evidence lanes: boundary-regime 170; general-research-integrity 1538; mixed-or-review 370; supporting-unclassified 130

## Pilot results

| Pilot source | Result | Expected | Redirects | Review reason |
| --- | --- | --- | ---: | --- |
| LERU official members page | accessible | accessible | 0 | none |
| ALLEA European Code of Conduct for Research Integrity 2023 | accessible | accessible | 0 | none |
| KU Leuven research-integrity annual-report corridor | accessible | accessible | 0 | none |
| LOWI advisory-opinions archive | accessible | accessible | 0 | none |
| LOWI HTTP-to-HTTPS redirect test | redirected-accessible | redirect | 2 | redirect requires equivalence review |
| Deliberately inaccessible reserved-domain test | network-error | failure | 0 | network access failed |

## Changed, unsupported, and unresolved claims

- Changed automatically: none. This phase establishes maintenance infrastructure and technical baselines only.
- Regenerated count replacing stale hand-carried totals when used in future drafts: 1568 live source-registry rows.
- Still unsupported as publication decisions: official LERU product type, current group credit, authorship, approval route, and publication data cut-off.
- Technical source ownership based on explicit metadata or a hostname fallback remains inventory metadata and must not be promoted to publication-owner claims without evidence.
- Redirects, fingerprint changes, access failures, conflicting official sources, and translation-sensitive changes remain review items.

## Exceptions requiring review

- **PILOT-REDIRECT:** redirect requires equivalence review.
- **PILOT-INACCESSIBLE:** network access failed.

## Validation

- Deterministic manifest regeneration: PASS
- Deterministic count regeneration: PASS
- Canonical inputs unchanged by generation and pilot: PASS
- Unique manifest source IDs: PASS
- All scripted checks: PASS

## Next bounded batch

Run `p-leru-source-current-verification` for Geneva, Strasbourg, Freiburg, Trinity College Dublin, Paris-Saclay, LMU Munich, and Heidelberg using the new manifest and audit output format. Treat source changes as proposed evidence updates until content and claim relevance have been reviewed.
