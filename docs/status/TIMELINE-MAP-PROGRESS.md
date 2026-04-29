# Timeline Map Progress Log

Last updated: 29 April 2026

## Current Implementation Status

The first implementation pass for the timeline map feature has started and is now partially functional in the static app.

Implemented in this pass:

- Added a top-level view switcher with:
  - `System map`
  - `Development timeline`
- Added a new `#timeline-view` section in `index.html`.
- Added a second Europe SVG map for timeline playback.
- Added timeline controls:
  - play/pause
  - previous event year
  - next event year
  - speed selector
  - category filter
  - core RI versus boundary lane filter
  - event search
  - reset
- Added a year range scrubber.
- Added an event-density histogram.
- Added a category legend.
- Added an event side panel with event cards, source links, country filtering, and dossier links.
- Added browser-side extraction of all `dossierDetails.timeline` records from `data/countries.js`.
- Added date normalization for:
  - year-only dates
  - exact `D Month YYYY` dates
  - `Month YYYY` dates
  - ISO dates
  - year ranges
- Added derived event fields:
  - country metadata
  - normalized start year/date
  - date precision
  - date-range flag
  - future-dated flag
  - normalized category
  - lane
  - level
  - short title
  - source flags
- Added a first category taxonomy and keyword mapper.
- Added cumulative map highlighting by selected year.
- Added active-year country pulses.
- Added SVG callout boxes and leader lines for up to five active countries in the selected year.
- Added click and keyboard handling on timeline map countries.
- Added restart behavior for playback when the timeline is already at the latest year.
- Added responsive styles for the new timeline view.
- Added reduced-motion handling for the pulse animation.

## Files Changed In This Pass

- `index.html`
  - Added timeline header link, view tabs, system-view wrapper, and timeline-view markup.
- `assets/js/app.js`
  - Added timeline event extraction, normalization, filtering, rendering, playback, map callouts, and event handlers.
- `assets/css/styles.css`
  - Added view-tab styling, timeline layout, controls, map states, callouts, histogram, event cards, and responsive rules.
- `docs/plans/TIMELINE-MAP-FEATURE-PLAN.md`
  - Existing feature plan from the planning pass.
- `docs/status/TIMELINE-MAP-PROGRESS.md`
  - This progress ledger.

## Data Inventory Used

Current app data as checked in this pass:

- 49 country records.
- 719 timeline events extracted from country dossiers.
- 47 distinct event years.
- Latest normalized event year: 2027.
- Highest density year: 134 events.

## Verification Completed

Passed:

```powershell
node --check assets/js/app.js
node --check data/countries.js
```

Also confirmed with a local Node data inventory that the app still exposes 49 countries and 719 timeline events.

Browser smoke test status:

- Attempted to use Playwright through `npx`.
- Playwright package resolution/CLI is available, but the Chromium browser executable is not installed in this environment.
- No browser screenshot or DOM interaction test has been completed yet.

## Known Limitations

- Category mapping is keyword-based and should be reviewed against real event examples.
- Callout placement uses simple side-of-map positioning and can still overlap in dense years.
- Dense years are not yet aggregated in the callout layer beyond the current five-callout cap.
- Playback steps by event year, not by every exact event date.
- The side panel lists all matching events for the selected year; very dense years can produce a long panel.
- Date ranges are triggered at their start year only.
- No exported `data/timeline-events.js` or generator script exists yet.
- No source-quality audit panel exists yet.
- No narrative story presets or comparison lanes exist yet.
- The browser visual/runtime pass still needs to be done on a machine with an installed Playwright browser or by manually opening `index.html`.

## Recommended Next Steps

1. Run a browser smoke test:
   - Open `index.html`.
   - Switch to `Development timeline`.
   - Confirm the timeline map is visible.
   - Move the year slider.
   - Use Play/Pause.
   - Click a country.
   - Use category and lane filters.
   - Open an event source and a country dossier from the event panel.

2. Review the category mapper:
   - Sample at least 10 events from each category.
   - Adjust keywords that over-classify laws, institutional committees, or boundary routes.
   - Track remaining `uncategorized` events.

3. Improve dense-year behavior:
   - Add `+N more events` callout summary.
   - Group callouts by country when multiple events occur in one year.
   - Keep the side panel as the full detail surface.

4. Add an audit summary:
   - events without `sourceUrl`
   - events without `source`
   - uncategorized events
   - date ranges
   - future-dated events
   - countries without map geometry

5. Add story presets:
   - codes of conduct
   - national bodies
   - public case transparency
   - institutional routes
   - funder compliance
   - boundary regimes
   - 2024-2027 transitions

6. Consider splitting timeline code from `assets/js/app.js` if the file becomes hard to maintain:
   - `timeline.js`
   - `data/timeline-taxonomy.js`
   - generated `data/timeline-events.js`

## Resume Notes

Start by reading:

- `docs/plans/TIMELINE-MAP-FEATURE-PLAN.md`
- this file
- `index.html`
- timeline functions in `assets/js/app.js`
- timeline CSS block in `assets/css/styles.css`

The main implementation block in `assets/js/app.js` begins near the top-level timeline category definitions and continues through the timeline rendering functions before the existing country-list rendering code.
