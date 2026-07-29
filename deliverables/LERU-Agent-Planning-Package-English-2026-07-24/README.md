# Research Integrity Systems in Europe

This project is a static web app for browsing the LERU map pilot data. It does not need a build step or package installation.

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
py -m http.server 8000
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
python -m http.server 8000
```

- Keep the `data/` and `assets/` folders next to `index.html`; the app expects those relative paths to stay the same.
