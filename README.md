# Research Integrity Systems in Europe

This project contains the static web app and technical maintenance tools for the LERU Integrity Map. The app does not need a build step or package installation.

The Git checkout contains reviewed software and synthetic setup examples. The working research corpus, member feedback, document captures, author reviews and unfinished reports remain local. A software checkout is not the authoritative scientific dataset or an approved report. The local project instructions and dated source packages retain their existing research roles; this storage change does not merge or freeze them.

## Set up a fresh checkout

Use Python 3.10+ and Node.js 22+ on PATH. There are no required third-party packages for the app or the JavaScript maintenance tests.

For a software demonstration without research records, run:

```powershell
python scripts/setup_synthetic_data.py
```

This explicitly installs the four fictional files in `examples/data/` into the existing `data/` layout. It refuses to replace existing files. All example names, routes and findings are synthetic; geographic shapes only position the examples on the map. Never use their counts or text as study results.

For research work, obtain the authorised local source package from its custodian and retain its relative paths. Do not run the example installer over a working corpus. Existing local files are not changed by cloning or installing examples in a separate checkout.

## Start the App

### Option 1: Open the file directly

1. Open this project folder.
2. Double-click `index.html`.
3. The app should open in your default browser.

### Option 2: Run a local web server

Use this option if your browser blocks local files, or if links behave differently when opened directly from disk.

1. Open PowerShell in this project folder.
2. Start a simple local server:

```powershell
py -m http.server 8000 --bind 127.0.0.1
```

3. Open this address in your browser:

```text
http://localhost:8000
```

4. Stop the server with `Ctrl+C` in PowerShell.

## Project Layout

- `index.html` is the main app entry point.
- `assets/js/app.js` contains the app behavior.
- `assets/css/styles.css` contains the app styling.
- `assets/images/` contains shared visual assets.
- `data/` contains country folders, app datasets, source logs, and transparency data loaded by the page.
- `reports/project-overview.html` is a shareable briefing and progress tracker.
- `reports/presentation-report.html` is a presentation-oriented briefing page.
- `protocol/index.html` contains the separate protocol page.
- `docs/workflows/CASE-FILE-WORKFLOW.md` is the completed committee-and-case-file workflow and method reference.
- `docs/plans/NEXT-PHASE-QUALITY-PLAN.md` is the current quality-consolidation plan.
- `docs/plans/` and `docs/status/` contain feature plans and implementation progress notes.

## Troubleshooting

- If the map or country list does not load, try the local web server option above.
- If `py` is not available, install Python or try:

```powershell
python -m http.server 8000 --bind 127.0.0.1
```

- Keep the `data/` and `assets/` folders next to `index.html`; the app expects those relative paths to stay the same.

## Checks and regeneration

Run the checks that do not require the study corpus:

```powershell
node --check assets/js/app.js
node --test --test-name-pattern "CSV parser|URL canonicalization|technical audit" scripts/tests/leru_maintenance.test.mjs
```

The HTTP test starts its own temporary loopback server and checks synthetic responses. It does not contact institutional systems. With the authorised local corpus restored, run the complete existing suite:

```powershell
node --test scripts/tests/leru_maintenance.test.mjs
```

The two corpus tests check actual denominators and specific source coverage. They are not acceptance tests for the fictional setup data.

Regenerate technical inventories and counts into ignored local output, using the actual technical access date:

```powershell
node scripts/build_leru_source_manifest.mjs --access-date YYYY-MM-DD --output-dir local-state/maintenance
node scripts/generate_leru_report_counts.mjs --access-date YYYY-MM-DD --output-dir local-state/maintenance
```

These commands describe the installed inputs. They do not approve evidence or change the analytical reference date. The source-audit and batch runners perform network requests when explicitly run; the setup and checks above need no institutional connection.

## Storage and local prerequisites

`project-policy.json` lists the reviewed upload paths. Application code, map geometry, necessary artwork, synthetic examples and the independent maintenance tools are tracked. The existing `data/` layout remains in use; it is not excluded as a whole.

The numbered institution dossiers, shared research packages, country documents, mixed public/feedback datasets, project administration, dated deliverables, `outputs/` and `reports/` remain at their existing local paths. Local scientific reports, the protocol page and document links referenced by the older app navigation therefore require the separate source package. The main map and institution lookup can be demonstrated with the fictional setup files. Historical instruction counts are not fresh research findings.

Office documents and downloaded PDFs were not selected for this upload: the current report authority, publication clearance or source-version status was not established. In particular, the working outline contains review comments and tracked changes. Original files and embedded metadata are preserved locally. This is a role-based selection, not a blanket Office, PDF or data exclusion.

Existing archive locations stay in place; `90_Archive/` is also ignored for future recoverable archiving. No historical move was performed because current separate backup coverage was not verified. GitHub is not the backup for excluded material. Ignore rules and removal from the current Git tree do not erase already-published history.

## Selective upload policy

The storage selection is on `chore/selective-software-storage-20261025`. The existing `main` branch publishes the GitHub Pages site. This branch upload does not deploy the site; merging into `main` requires a separate deployment instruction. Use a separate checkout for this branch: switching branches in a working research folder can overwrite ignored inputs.

Read the shared [project storage policy](../../_Admin/project-standards/POLICY.md) in a workspace installation, or obtain the project-standards repository separately. Preserve the existing repository identity and visibility. Review exact staged contents, run `project_audit.py audit --root <checkout> --base <freshly-fetched-remote-commit>`, perform the checks above and verify the remote SHA after pushing. Keep audit reports and recovery manifests under ignored `local-state/`. New corpus files require their own content and source-version review.
