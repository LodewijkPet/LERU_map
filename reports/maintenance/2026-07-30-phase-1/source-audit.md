# LERU source technical audit

Technical access date: 2026-07-30

> This audit records reachability, redirects, response metadata, and bounded fingerprints. It does not establish substantive equivalence, source meaning, or publication ownership.

## Summary

| Status | Count |
| --- | ---: |
| accessible | 4 |
| network-error | 1 |
| redirected-accessible | 1 |

Expected pilot outcomes met: 6/6

## Results

| Source | Status | HTTP | Redirects | MIME type | Review |
| --- | --- | ---: | ---: | --- | --- |
| LERU official members page | accessible | 200 | 0 | text/html; charset=UTF-8 | none |
| ALLEA European Code of Conduct for Research Integrity 2023 | accessible | 200 | 0 | application/pdf | none |
| KU Leuven research-integrity annual-report corridor | accessible | 200 | 0 | text/html;charset=utf-8 | none |
| LOWI advisory-opinions archive | accessible | 200 | 0 | text/html; charset=UTF-8 | none |
| LOWI HTTP-to-HTTPS redirect test | redirected-accessible | 200 | 2 | text/html; charset=UTF-8 | redirect requires equivalence review |
| Deliberately inaccessible reserved-domain test | network-error |  | 0 |  | network access failed |

## Exceptions and human review items

- **PILOT-REDIRECT — LOWI HTTP-to-HTTPS redirect test:** redirect requires equivalence review. Substantive equivalence: human review required.
- **PILOT-INACCESSIBLE — Deliberately inaccessible reserved-domain test:** network access failed. Substantive equivalence: not assessed.

## Interpretation boundary

- A successful response does not prove that the content is current or supports the same claim as before.
- A redirect is a review signal, not automatic evidence of substantive equivalence.
- An HTTP or network failure is a dated access result, not proof that the source or body does not exist.
- Suggested manifest updates are separate and are not applied by this audit.
