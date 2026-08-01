# LERU maintenance data

Status: active
Status date: 2026-07-30

This folder contains generated machine-readable inputs for maintaining the evidence base used by the LERU report.

## Generated files

- `leru-source-manifest.json` and `.csv`: one row per canonicalized HTTP(S) source found in the live country, transparency, member, or source-registry layers.
- `leru-canonical-inputs.json` and `.csv`: hashes, roles, Git state, and governed claims for the local files that define report content and counts.
- `pilot-sources.json`: the fixed six-case acceptance pilot used by the source-audit script.

Regenerate the manifests with:

```powershell
node scripts/build_leru_source_manifest.mjs --access-date 2026-07-30
```

## Important field boundaries

- `report_critical` means that the URL is referenced by the live country, transparency, or member data. It does not mean every report draft must cite it.
- `source_owner` is technical inventory metadata. When no explicit owner exists, it falls back to the URL hostname and must be reviewed before publication attribution.
- `dependent_claims` are stable provisional claim keys derived from the data location. They are not a substitute for the later claim-evidence ledger.
- `evidence_lanes` preserves all lane signals found across duplicate references. `effective_evidence_lane` forces any source with both boundary and general signals into `mixed-or-review`; its general claim keys are withheld until a human resolves the lane.
- `last_checked` is the latest recorded access date found in existing data. It is not a claim that the source remains current today.
- `document_date_or_version` is populated only from explicit metadata or a transparently labelled year found in a title or URL.
- `current_status` remains unaudited until a technical audit is reviewed. Audit suggestions are never applied automatically.

Do not hand-edit generated manifests to repair a report count. Correct the canonical source data or generator logic, then regenerate the files.
