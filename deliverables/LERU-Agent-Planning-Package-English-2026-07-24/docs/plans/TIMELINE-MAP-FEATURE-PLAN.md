# Research Integrity Timeline Map Feature Plan

Status: planned feature
Date: 29 April 2026

## Purpose

Add a new timeline tab to the LERU map app that reuses the existing Europe map and all collected country timeline data to show how research integrity systems developed over time.

The feature should support two complementary uses:

- Exploratory analysis: a user can filter, search, compare countries, inspect sources, and understand development patterns.
- Narrative playback: a user can press play and watch the map change as events occur, with short callout boxes pointing to the relevant countries.

The goal is not only to make the app more visual. The goal is to turn the collected timestamps into a research instrument that shows when codes, national bodies, procedures, funder rules, public case publication, and boundary regimes appeared across Europe.

## Current Starting Point

The app already has the main ingredients:

- `data/countries.js` contains country dossiers.
- Many dossiers include `dossierDetails.timeline`.
- Timeline event fields already include `date`, `title`, `type`, `actors`, `importance`, `source`, and `sourceUrl`.
- `data/europe-map.js` contains the SVG geometry, centroids, and map IDs.
- `assets/js/app.js` already renders the Europe map and country-level dossier timelines.
- `index.html` currently has one main map workspace, country detail, dossier panel, and country list.

Quick local data inventory on 29 April 2026:

- 49 country records.
- 719 country timeline events.
- All 719 events contain at least one four-digit year.
- Earliest event year detected: 1867.
- Latest event year detected: 2027.
- Timeline density is uneven by country, which is expected because some countries have deeper dossiers than others.

This means the first version can be built from existing data without a new research pass.

## Design Principles

1. Keep the map analytical, not decorative.
   The timeline should help users compare systems, not just watch animations.

2. Preserve source traceability.
   Every visible event should keep a route back to the country dossier and, where available, the original source URL.

3. Separate core research integrity from boundary regimes.
   Codes, national integrity bodies, institutional misconduct procedures, public case publication, biomedical ethics, animal research, data protection, IP, quality assurance, open science, and funder compliance should remain visually distinguishable.

4. Avoid overstating maturity.
   A country lighting up should mean an event is recorded, not that the country has a complete or superior system.

5. Make uncertainty visible.
   Exact dates, year-only dates, date ranges, and future implementation dates should be treated differently.

6. Keep motion optional.
   Playback should be useful, but the same information must be usable through keyboard controls, filters, and static views.

## Recommended Feature Shape

Create a new top-level tab or mode called `Timeline`.

The existing app could then expose:

- `Map`: the current pilot coverage map and country detail.
- `Timeline`: the animated development map and timeline explorer.
- `Countries`: the current country list, if the navigation is later split more clearly.

For the first implementation, a simple two-tab structure is enough:

- `System map`
- `Development timeline`

The timeline tab should reuse the same map data, country IDs, marker offsets, and selected-country behavior as the current map. It should not require a second map dataset.

## Main Screen Layout

Recommended desktop layout:

```text
+----------------------------------------------------------------------------------+
| Timeline controls: Play | Year | Speed | Filters | Search | Event count          |
+-----------------------------------------------+----------------------------------+
|                                               |                                  |
| Europe map                                    | Active event stack               |
|                                               |                                  |
| - countries light up over time                | - current event card             |
| - pulsing event markers                       | - source link                    |
| - callout boxes with leader lines             | - related country actions        |
|                                               |                                  |
+-----------------------------------------------+----------------------------------+
| Global timeline rail / histogram / scrubber                                      |
+----------------------------------------------------------------------------------+
```

Recommended mobile layout:

- Controls at the top.
- Map below controls.
- Timeline scrubber under the map.
- Active event cards below the scrubber.
- Filters in a collapsible drawer.

The map should remain the dominant visual element, but the bottom timeline rail is what makes the animation understandable.

## Core Experience

### 1. Cumulative Development Map

The default timeline map should answer:

What did the research integrity landscape look like by this year?

Behavior:

- The user selects a year or date position.
- Countries with at least one event up to that date are highlighted.
- Countries with a recent event at the current point pulse briefly.
- The selected event category controls the color of the pulse or marker.
- The right panel lists the active year events.
- Clicking a country filters the timeline to that country.

Useful visual encodings:

- Pale fill: country has timeline evidence before the selected date.
- Stronger fill: country has one or more events in the selected year.
- Ring pulse: event occurred at the current playback point.
- Small stacked ticks near the country marker: multiple event categories occurred in the same year.

Important caveat in the UI:

- Highlighting means "recorded in this dataset by this date", not full system maturity.

### 2. Event Playback

The user can press a play button.

Playback behavior:

- Events are sorted by normalized date.
- The map advances through time.
- When an event occurs, the country pulses.
- A small textbox appears near the country.
- A leader line connects the textbox to the country centroid or marker.
- The textbox contains a short event label, for example:
  - `National code of conduct revised`
  - `National integrity body established`
  - `Public case archive begins`
  - `Funder compliance route updated`
- The right panel shows the full event card with source link.

Controls:

- Play / pause.
- Previous event.
- Next event.
- Jump to first event.
- Jump to latest event.
- Speed selector.
- Year scrubber.
- Event mode versus year mode.
- Reduced-motion toggle or automatic respect for `prefers-reduced-motion`.

Playback modes:

- Event-by-event: every normalized event is shown in order.
- Year-by-year: all events in a year appear together.
- Decade scan: useful for long historical context.
- Selected-story playback: only events matching a narrative filter are played.

### 3. Callout Textboxes With Leader Lines

This is the signature animation idea.

Callout content should be short:

- Date or year.
- Country.
- Short title.
- Normalized category.
- One-sentence importance summary.
- Source link icon or text link.

Example:

```text
2018
Netherlands
New NGWI enters into force
Core code
Five principles, 61 standards, and institutional duties of care become the national code base.
```

Callout placement rules:

- Prefer placing the box outside the country shape, not on top of the country.
- Use the country centroid plus a per-country callout offset.
- Use left or right columns for dense regions such as Benelux, Balkans, and the Baltics.
- Use short leader lines with no arrowhead or a subtle dot at the country endpoint.
- If several countries have events on the same date, stack callouts in an event queue instead of drawing too many boxes at once.
- If one country has several events in the same year, aggregate into one callout with a count and show details in the side panel.

Collision handling:

- Version 1 can use manual zones: northwest, northeast, west, central, east, southeast, island/off-map.
- Version 2 can add automatic collision avoidance.
- Dense-year playback should cap visible callouts and put the rest in the side panel.

### 4. Global Timeline Rail

The bottom rail should show the full event corpus.

Recommended layers:

- A histogram of event counts per year.
- Colored segments by normalized event category.
- A draggable scrubber handle.
- Ticks for major years.
- A visible selected year/date label.

Interactions:

- Hover a bar to show number of events by category.
- Click a year to jump the map.
- Drag the scrubber to animate manually.
- Shift-click or range-select to inspect a period.

Useful display modes:

- Event density by year.
- First recorded event per country.
- Code and law milestones only.
- Public transparency milestones only.
- Boundary-regime development only.

### 5. Event Side Panel

The right panel should be the serious reading surface.

For the current date/year, show:

- Event count.
- Country chips.
- Event cards grouped by country.
- Category badges.
- Source link.
- Button to open country dossier.
- Button to keep only this country.
- Button to compare with another country.

Event card fields:

- Date as recorded.
- Normalized date or year if useful.
- Country.
- Title.
- Type and normalized category.
- Actors.
- Importance.
- Source/source URL.

### 6. Filters

Filters make the feature useful after the novelty of playback.

Recommended filters:

- Country.
- Region.
- Date range.
- Event category.
- Core RI only.
- Boundary regimes only.
- Public transparency and case publication.
- National-level events.
- Institutional-level events.
- Funder events.
- Exact-date only.
- Include future implementation dates.
- Include overview-only or lower-confidence events.

Filter presentation:

- Use compact checkbox groups and segmented controls.
- Keep active filters visible as removable chips.
- Always show how many events remain after filtering.

### 7. Search

Search should scan:

- Country name.
- Event title.
- Event type.
- Actors.
- Importance text.
- Source label.

Search behavior:

- Search filters the timeline rail, side panel, and map together.
- Matching words can be highlighted in the side panel.
- Search results can be played as a filtered playback.

### 8. Narrative Story Modes

Add optional preset stories after the basic explorer works.

Possible story presets:

1. Codes of conduct
   Shows first national codes, major revisions, ENRIO/ALLEA-aligned updates, institutional code adoption, and 2024-2026 AI/open-science refreshes.

2. National integrity bodies
   Shows the creation of national advisory, investigative, ombuds, attestation, ethics, or research-integrity bodies.

3. Public case transparency
   Shows when countries begin publishing case decisions, annual statistics, advisory opinions, warning statements, or public registers.

4. Institutional first-line handling
   Shows university committee creation, institutional procedures, RIO routes, annual reporting, and local public summaries.

5. Funder compliance
   Shows research-council, grant-agency, and project-stage integrity requirements.

6. Boundary regimes
   Shows biomedical ethics, animal research, data protection, IP, quality assurance, clinical trials, open science, and data-management regimes separately from misconduct handling.

7. Major integrity cases and shocks
   Shows high-impact cases, investigations, public reports, or reforms triggered by scandals, where recorded in the dossier.

8. 2024-2027 transition layer
   Shows recent and future-dated reforms, especially AI, open science, public-decision duties, new committees, and 2026 implementation points.

Each story mode should include a short title, a short methodological note, and the active filter definition. Do not put long explanatory text over the map.

## Comparison Ideas

### Country Comparison

Allow two to four countries to be selected.

Show:

- Parallel country lanes.
- First recorded code event.
- First national body event.
- First public case/transparency event.
- Latest recorded update.
- Total event count by category.

This would be useful for comparing, for example:

- Netherlands, Denmark, Finland, Norway, Sweden.
- France, Germany, United Kingdom.
- Portugal, Greece, Spain.
- Ireland, Latvia, Luxembourg.
- North Macedonia and nearby Balkan countries.

### Regional Development View

Show regions as small multiples:

- Nordics.
- Western Europe.
- Baltics.
- Balkans.
- Central/Eastern Europe.
- Microstates and small systems.

Each region could show a small timeline density chart plus the map highlight.

### Milestone Matrix

A compact matrix can summarize whether each country has recorded events for:

- National code.
- National body.
- Institutional procedure.
- Committee directory.
- Funder requirement.
- Public case publication.
- Biomedical ethics boundary.
- Animal research boundary.
- Data protection boundary.
- Open science or data-management route.

Rows: countries.

Columns: milestone categories.

Cells: first recorded year, blank if not yet recorded, dotted if weak/uncertain.

This matrix would complement the animated view and help users who need a quick comparison.

## Data Model

The existing timeline event shape is good for country dossiers, but the map timeline needs a normalized derived event model.

Recommended derived event fields:

```js
{
  id: "netherlands-2018-10-01-ngwi-in-force",
  countryId: "netherlands",
  countryName: "Netherlands",
  mapId: "NLD",
  region: "Western Europe",
  originalDate: "1 October 2018",
  startYear: 2018,
  startDate: "2018-10-01",
  endYear: null,
  endDate: null,
  datePrecision: "day",
  isDateRange: false,
  isFutureDated: false,
  title: "NGWI 2018 enters into force",
  shortTitle: "National code enters into force",
  type: "Foundational code in force",
  normalizedCategory: "core-code",
  level: "national",
  lane: "core-ri",
  actors: "KNAW, NFU, NWO, TO2, VH and VSNU/UNL",
  importance: "The national code becomes the main norm base for institutional duties and complaint handling.",
  source: "Universities of the Netherlands",
  sourceUrl: "https://...",
  hasSourceUrl: true
}
```

Do not replace the country dossier timelines. Generate this model from `data/countries.js`.

### Date Normalization

Preserve the original date string and add normalized fields for sorting and filtering.

Date cases to support:

- `2003`
- `2014`
- `14 September 2018`
- `1 October 2018`
- `1995-2001`
- `2023-2026`
- `28 August 2025`
- `2027`

Recommended precision values:

- `year`
- `month`
- `day`
- `range`
- `unknown`

Rules:

- If an exact day is present, use `YYYY-MM-DD`.
- If only a year is present, use `YYYY-01-01` internally but display the original year.
- If a range is present, keep `startYear` and `endYear`.
- For playback, range events can appear at the start year with a duration marker on the rail.
- Future-dated events should be included but visually marked.
- Events with weak or ambiguous dates should remain visible but carry lower precision.

### Category Normalization

Current `type` values are useful but inconsistent. The timeline feature needs a stable taxonomy.

Recommended normalized categories:

- `core-code`: national or institutional codes of conduct, integrity codes, ethics codes where they govern research integrity.
- `national-body`: creation, mandate, appointment, or reform of a national research-integrity body, ombuds body, advisory body, attestation body, or national ethics-in-science body.
- `law-regulation`: laws, decrees, regulations, ministerial orders, government decisions.
- `institutional-route`: university, academy, institute, or RPO committee/procedure/office route.
- `case-transparency`: case publication, public decisions, annual statistics, archive creation, public recommendations, warnings.
- `funder-compliance`: grant rules, funder sanctions, project-stage integrity controls, audit/default routes.
- `quality-degree`: quality assurance, doctoral attestation, degree/title revocation, accreditation routes.
- `biomedical-ethics`: medical research ethics, clinical trials, bioethics committees.
- `animal-research`: animal experiments, animal welfare approval routes.
- `data-ip-open`: data protection, research data, IP, copyright, open science, repositories, AI governance.
- `major-case`: major misconduct case, investigation, scandal report, or public inquiry.
- `other-boundary`: other adjacent regimes that are important but not core misconduct handling.
- `uncategorized`: temporary fallback for events not yet mapped.

Each category should have:

- Label.
- Short label.
- Color.
- Icon or simple symbol.
- Description.
- Whether it counts as core RI or boundary.
- Whether it counts as national, institutional, funder, or boundary by default.

Use a varied palette. Do not make the whole timeline one color family.

### Event Level

Add a derived `level` field:

- `national`
- `institutional`
- `funder`
- `boundary`
- `case`
- `regional`
- `unknown`

This supports filters and story modes.

### Confidence and Source Flags

Add derived flags:

- `hasSourceUrl`
- `hasSourceLabel`
- `fromOverviewOnly`
- `datePrecision`
- `isFutureDated`
- `isBoundary`
- `isCoreRI`

The feature should not hide weaker evidence, but it should let the user filter and interpret it.

## Technical Architecture

### Recommended First Implementation

Keep the first implementation lightweight:

- Add timeline tab markup to `index.html`.
- Add timeline styles to `assets/css/styles.css`.
- Add timeline functions to `assets/js/app.js`, or split into `timeline.js` if `assets/js/app.js` becomes too large.
- Derive normalized timeline events in the browser from `window.COUNTRY_DATA`.

This is practical because 719 events is small enough for client-side filtering and rendering.

### Possible Later Refactor

If the feature grows, create generated data files:

- `data/timeline-events.js`
- `data/timeline-taxonomy.js`

Potential generation script:

- `scripts/build-timeline-events.mjs`

The script could:

- Read `data/countries.js`.
- Extract every `dossierDetails.timeline` event.
- Normalize dates.
- Apply category mapping.
- Emit a stable event list.
- Emit an audit report for unclassified types, missing sources, and ambiguous dates.

This makes quality control easier, but it is not required for the first prototype.

## Visual Design Details

### Map State

Country fill should answer cumulative state:

- No recorded event by current date: context fill.
- Has at least one event before current date: muted evidence fill.
- Has active event at current date/year: bright event fill and pulse.
- Selected country: existing selected styling, but adapted to timeline.

Markers:

- Keep existing short country markers.
- Add a small outer ring for active timeline events.
- Use a category-colored dot or ring when a filtered category is active.

Leader lines:

- Use SVG `line` or `path` elements in an overlay group.
- Keep lines thin and muted.
- Use category color only at the callout header or marker, not on every line.

### Timeline Rail

Recommended rail elements:

- Histogram bars.
- Scrubber line.
- Current year label.
- Date range background for selected period.
- Category legend.

Avoid cramming all labels into the rail. Show labels on hover/focus and in the side panel.

### Callout Cards

Callout cards should be compact:

- Max width around 220-280px on desktop.
- 1-2 line title.
- One-sentence body.
- Category badge.
- Source link.

Callout timeout:

- Event-by-event mode: stay until next event or user pause.
- Year mode: stay for a short duration, then aggregate into the side panel.
- If paused, callouts remain visible.

### Color And Symbols

Suggested category color direction:

- Core codes: green.
- National bodies: blue.
- Law/regulation: red or rust.
- Institutional routes: teal.
- Case transparency: gold.
- Funders: purple.
- Quality/degree: grey-blue.
- Biomedical ethics: rose.
- Animal research: brown.
- Data/IP/open science: cyan or indigo.
- Major cases: black or high-contrast accent.

Use color plus text labels, not color alone.

## Interaction Details

### User Actions

Click country:

- Selects country.
- Filters side panel to country.
- Shows that country's full event sequence.
- Provides a `Open dossier` action.

Click event card:

- Highlights country.
- Moves scrubber to event date.
- Shows callout.
- Offers source and dossier links.

Hover or focus event:

- Highlights corresponding country and timeline bar.

Click timeline year:

- Moves map to that year.
- Shows events in that year.

Drag scrubber:

- Updates map live.
- Debounces side-panel rendering if needed.

Search:

- Filters event corpus.
- Keeps playback possible on filtered results.

### Keyboard Support

Controls should support:

- Space: play/pause when playback control is focused.
- Left/right arrow: previous/next event or year.
- Home/end: first/latest event.
- Tab navigation through controls, map countries, timeline events, and side panel links.

For screen readers:

- Announce current year.
- Announce event count when the year changes.
- Do not announce every animation frame.
- Provide an accessible event list that mirrors map events.

### Reduced Motion

If `prefers-reduced-motion` is set:

- Disable automatic pulsing.
- Disable animated transitions.
- Replace playback with step-based changes.
- Keep play button available only if motion is acceptable or use static stepping.

## Implementation Phases

### Phase 1 - Data Audit And Normalizer

Deliverables:

- Function to extract all timeline events from `window.COUNTRY_DATA`.
- Date parser for year, day-month-year, and year ranges.
- Category mapping function.
- Event counts by category, year, and country.
- Console-free UI diagnostics for missing dates or missing source URLs.

Acceptance criteria:

- Every existing event appears in the derived event list.
- Events sort chronologically.
- Original date strings are preserved.
- Unclassified event count is visible for future cleanup.

### Phase 2 - Static Timeline Tab

Deliverables:

- New `Timeline` tab.
- Europe map rendered in timeline mode.
- Bottom histogram/scrubber.
- Side panel with event cards.
- Year/date selection.
- Country click filtering.

Acceptance criteria:

- User can select a year and see matching events.
- User can click a country and see its timeline.
- User can open source links and country dossiers.
- Existing map and country list still work.

### Phase 3 - Playback And Callouts

Deliverables:

- Play/pause controls.
- Previous/next event controls.
- Playback speed.
- Event callout boxes.
- SVG leader lines to countries.
- Active country pulse.
- Aggregation for multiple events in same date/year.

Acceptance criteria:

- Playback can run through filtered events.
- Pausing freezes the current state.
- Callouts do not cover controls.
- Dense years remain readable through aggregation.
- Reduced-motion setting is respected.

### Phase 4 - Filters And Story Modes

Deliverables:

- Category filters.
- Core RI versus boundary filter.
- Level filter.
- Region filter.
- Date range filter.
- Story presets.
- Active filter chips.

Acceptance criteria:

- Filters update map, rail, side panel, and playback consistently.
- Story modes are explainable and reversible.
- Users can clear all filters.

### Phase 5 - Comparison Views

Deliverables:

- Country comparison panel.
- Parallel country lanes.
- Milestone matrix.
- Regional small multiples or regional density summaries.

Acceptance criteria:

- User can compare first recorded milestones across selected countries.
- Matrix cells link to events.
- Missing evidence is marked as missing, not as absence of a system.

### Phase 6 - Quality Polish

Deliverables:

- Better category mapping.
- Date audit list for ambiguous ranges.
- Callout placement refinements.
- Improved mobile layout.
- Source and dossier deep-link cleanup.

Acceptance criteria:

- No event category is left unexplained.
- Mobile layout remains usable.
- The timeline tab is useful without playback.

## Suggested File Changes For First Build

Likely files:

- `index.html`: add tab controls and timeline tab structure.
- `assets/css/styles.css`: add timeline workspace, controls, histogram, callouts, and responsive layout.
- `assets/js/app.js`: add derived event model, timeline rendering, filters, playback state, and event handlers.

Optional later files:

- `data/timeline-taxonomy.js`: stable category labels/colors.
- `data/timeline-events.js`: generated event list.
- `scripts/build-timeline-events.mjs`: generator and audit script.
- `docs/plans/TIMELINE-MAP-FEATURE-PLAN.md`: this plan.

## State Management Sketch

Recommended state:

```js
const timelineState = {
  activeTab: "timeline",
  mode: "year",
  isPlaying: false,
  currentIndex: 0,
  currentYear: 2018,
  speed: 1,
  selectedCountryId: "",
  searchTerm: "",
  filters: {
    categories: new Set(),
    levels: new Set(),
    regions: new Set(),
    coreOnly: false,
    boundaryOnly: false,
    includeFuture: true,
    exactDatesOnly: false
  }
};
```

Derived data:

- `allTimelineEvents`
- `filteredTimelineEvents`
- `eventsByYear`
- `eventsByCountry`
- `eventsByCategory`
- `activeEvents`

Do not mutate the original country objects except where the existing app already merges transparency data.

## Date Parser Sketch

The parser should be small and explicit.

Supported patterns:

- `YYYY`
- `D Month YYYY`
- `DD Month YYYY`
- `Month YYYY`
- `YYYY-YYYY`
- `YYYY-YYYY` with spaces or en dash variants if later needed

Output:

- `startYear`
- `startDate`
- `endYear`
- `endDate`
- `datePrecision`
- `displayDate`

Fallback:

- Find the first four-digit year.
- Use that as `startYear`.
- Mark `datePrecision` as `year`.
- Preserve original text.

## Event Label Strategy

The collected titles are good for dossier reading but may be long for map callouts.

Add a derived `shortTitle`:

Rules:

- Use original title if 60 characters or less.
- Otherwise apply simple replacements:
  - `enters into force` -> `enters into force`
  - `established` -> `established`
  - `adopted` -> `adopted`
  - `revised` -> `revised`
  - `annual report` -> `annual report`
- If still long, truncate at a phrase boundary and keep full title in the side panel.

Later, add hand-curated short titles for the most important events.

## Handling Dense Years

Some years, especially 2023-2026, will have many events.

Recommended behavior:

- Year mode groups all events in the year.
- The map highlights all affected countries.
- The side panel groups by country and category.
- The map shows no more than 5 callouts at once.
- If more than 5 events are active, show:
  - top priority callouts by category and source quality.
  - `+N more events` indicator.
  - full list in the side panel.

Priority order for visible callouts:

1. National body created or reformed.
2. Core national code adopted or revised.
3. Public case archive or reporting practice starts.
4. Law/regulation enters into force.
5. Major case or public investigation.
6. Funder compliance route.
7. Institutional route.
8. Boundary regime.

## Handling Future Dates

The dataset includes future-dated implementation markers up to 2027.

Future dates should:

- Be included by default if they are in the source data.
- Use a distinct style, such as dashed outline or "scheduled" badge.
- Be filterable through `Include future dates`.
- Avoid language that implies the event has already happened.

Example display:

- `2027 scheduled`
- `Implementation date recorded in source`

## Source And Dossier Linking

Every event card should support:

- Source URL if available.
- Source label if available.
- Country dossier deep link.

Suggested links:

- `Open source`
- `Open country dossier`
- `Show country timeline`

If no source URL exists:

- Show the source label if present.
- Show `Source recorded in dossier` rather than leaving a blank.

## Quality Audits The Feature Can Produce

This feature can also help improve the dataset.

Add an internal audit view or console-free summary for:

- Events with no `sourceUrl`.
- Events with no `source`.
- Events mapped to `uncategorized`.
- Countries with no timeline events.
- Countries with unusually sparse event counts.
- Events with future dates.
- Events with ambiguous date ranges.
- Duplicate-looking titles in the same country/year.

This should not be visible as a main user-facing tab unless needed. A small maintainer summary could be enough.

## Risks And Mitigations

Risk: timeline depth differs by country.

Mitigation:

- Label the view as recorded evidence.
- Add filters for dossier stage.
- Do not rank countries by event count without caveats.

Risk: event types are inconsistent.

Mitigation:

- Use normalized categories.
- Keep original `type` visible in event details.
- Track uncategorized events for cleanup.

Risk: map callouts become cluttered.

Mitigation:

- Cap visible callouts.
- Aggregate dense years.
- Use side panel as full event list.
- Use story filters for presentation.

Risk: date ranges are misleading in playback.

Mitigation:

- Preserve original date range.
- Display range bars on the timeline rail.
- Trigger range events at start date but show range styling.

Risk: users confuse boundary regimes with misconduct systems.

Mitigation:

- Use clear category labels.
- Keep `Core RI` and `Boundary` filters.
- Use separate colors and legends.

Risk: animation reduces accessibility.

Mitigation:

- Respect reduced-motion preferences.
- Provide step controls.
- Keep event list fully accessible.

## Minimum Viable Version

The smallest useful version should include:

- A new `Timeline` tab.
- Derived event extraction from `data/countries.js`.
- Chronological sorting and date normalization.
- Year scrubber.
- Map highlighting by selected year.
- Event side panel.
- Category legend.
- Country click filtering.
- Source and dossier links.

This version can ship before playback if needed.

## Preferred First Release

The preferred first release should include the minimum version plus:

- Play/pause.
- Previous/next event.
- Event callouts with leader lines.
- Category filters.
- Core RI versus boundary filter.
- Event density histogram.
- Active filter chips.
- Reduced-motion handling.

This would deliver the feature the user imagines while still keeping the analytical explorer usable.

## Later Enhancements

Good second-wave features:

- Narrative story presets.
- Country comparison lanes.
- Milestone matrix.
- Regional small multiples.
- Curated short event titles.
- Export current view as image or CSV.
- Shareable hash state for a selected year/filter/story.
- Source-quality audit panel.
- Auto-generated country chronology summaries.

## Implementation Checklist

1. Add timeline tab shell.
2. Extract all timeline events from country dossiers.
3. Normalize dates while preserving original labels.
4. Normalize event categories.
5. Render static timeline map state.
6. Render timeline rail and scrubber.
7. Render active event side panel.
8. Add country and event interactions.
9. Add playback state and controls.
10. Add callouts and leader lines.
11. Add filters and active filter chips.
12. Add reduced-motion behavior.
13. Add source and dossier links.
14. Add data-quality audit summary.
15. Run syntax checks.

Minimum checks after implementation:

```powershell
node --check data/countries.js
node --check assets/js/app.js
```

For the timeline feature itself, also check in the browser that:

- The timeline tab loads.
- The map is not blank.
- The scrubber changes the active year.
- Playback starts, pauses, and steps correctly.
- Callouts point to the expected countries.
- Dense years remain readable.
- Mobile layout does not overlap controls, map, and event cards.

## Recommended Next Step

Build Phase 1 and Phase 2 first as a non-animated timeline explorer. Once the event extraction, filtering, and static map state are solid, add playback and callouts in Phase 3.

This order keeps the feature grounded in the data and makes the animation meaningful rather than fragile.
