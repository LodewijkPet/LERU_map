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

## Project Files

- `index.html` is the main page.
- `project-overview.html` is a shareable HTML briefing explaining the project, current scope, workflow, and progress.
- `app.js` contains the app behavior.
- `styles.css` contains the styling.
- `data/` contains the country, map, and transparency data loaded by the page.
- `protocol/index.html` contains the separate protocol page.

## Troubleshooting

- If the map or country list does not load, try the local web server option above.
- If `py` is not available, install Python or try:

```powershell
python -m http.server 8000
```

- Keep the `data/` folder next to `index.html`; the app expects those relative paths to stay the same.
