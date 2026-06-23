# LERU Member Environment Plan

Prepared: 23 June 2026

Status: exploratory planning only. No feature implementation, app restructuring, data removal, or bulk dataset import has been done.

## Current App Summary

The project is a plain static web app. It does not use a framework, package manager, bundler, or build step. The README explicitly says the app can be opened directly through `index.html` or served with a simple local web server. There is no `package.json`, `vite.config.js`, `webpack.config.js`, or `node_modules` folder in the repository.

Main runtime files:

| Path | Role |
| --- | --- |
| `index.html` | Main app entry point. Loads CSS, country/map/transparency data, and app JS with script tags. |
| `assets/css/styles.css` | Shared styling for the main map app, tabs, cards, comparison view, tables, dossier panels, and responsive behavior. |
| `assets/js/app.js` | Main client-side renderer. Reads globals from `window.COUNTRY_DATA`, `window.TRANSPARENCY_DATA`, and `window.EUROPE_MAP`. |
| `data/europe-map.js` | Static map geometry. |
| `data/countries.js` | Main country and dossier dataset. |
| `data/transparency.js` | Shared transparency/case-publication layer. |
| `reports/project-overview.html` | Shareable project briefing and progress tracker. Inline CSS, report-style layout. |
| `reports/presentation-report.html` | Presentation-oriented project report. Inline CSS. |
| `protocol/index.html` | Separate method/protocol page. Inline CSS and a small inline table-filter script. |
| `docs/plans/*.md` | Planning documents for major phases/features. |
| `docs/workflows/*.md` | Method/workflow references, especially the committee-and-case-file workflow. |

Existing reusable navigation/page patterns:

- `index.html` has a compact top header with links, a summary strip, and a tabbed `view-tabs` pattern for "System map", "Development timeline", and "NL-BE comparison".
- `assets/js/app.js` already supports switching between view panes, rendering a searchable country list, rendering country detail and full dossier panels, rendering timeline filters, and rendering a static comparison view.
- `reports/project-overview.html` and `protocol/index.html` use a different report-page pattern: sticky left navigation, a hero/header section, full-width content sections, table wrappers, status tags, and inline CSS.
- `index.html` already includes a static comparison-style product aimed at research integrity officers. This is substantively close to the requested LERU environment, but it is embedded inside the main app and currently focused on NL-BE.

Current verified counts from the local files:

- `data/countries.js`: 49 country records.
- Country stages: 40 `Deep dossier drafted`, 9 `Expanded overview dossier`.
- All 49 country records currently contain a `dossierDetails` object.
- `data/transparency.js`: 35 explicit transparency records plus default transparency metadata.
- `data/source-registry.csv`: 1564 data rows, 1565 lines including the header.

## Current Data Structures

### `data/countries.js`

Shape: one global array assigned as `window.COUNTRY_DATA = [...]`.

Top-level country keys currently used:

- `id`
- `mapId`
- `name`
- `shortName`
- `region`
- `stage`
- `folder`
- `systemType`
- `summary`
- `keyActors`
- `documentLabels`
- `dataSignals`
- `nextFocus`
- `documents`
- `transparency`
- `dossierDetails`

Representative top-level field examples:

- `id: "belgium"`
- `stage: "Deep dossier drafted"`
- `documents: [{ label, type, path }]`

`dossierDetails` keys currently used:

- `readingGuide`
- `networkExtent`
- `systemMap`
- `networkLayers`
- `integrityCommittees`
- `evidenceCategories`
- `boundaries`
- `timeline`
- `sourceLinks`

Representative nested examples:

- `networkLayers[].actors[]` uses fields such as `name`, `category`, `since`, `scope`, `role`, `documents`, and `signals`.
- `integrityCommittees.groups[].committees[]` uses fields such as `institution`, `committee`, `status`, `scope`, `since`, `route`, `links`, and `signals`.
- `sourceLinks[]` uses fields such as `label`, `type`, `date`, `scope`, `url`, `path`, and `note`.

### `data/transparency.js`

Shape: three globals:

- `window.TRANSPARENCY_METADATA`
- `window.DEFAULT_TRANSPARENCY_DATA`
- `window.TRANSPARENCY_DATA = [...]`

Explicit transparency record fields:

- `id`
- `country`
- `score`
- `tier`
- `mainBody`
- `coverage`
- `publicAccess`
- `publicationModel`
- `format`
- `hasArchive`
- `keyNote`
- `sourcePath`
- `sourceDate`
- `resources`
- sometimes `sourceCountryLabel`

Representative resource fields:

- `label`
- `url`
- `resourceClass`
- `scope`
- `caseLevelInfo`
- `comment`

### Existing Institution-Level And Committee-Level Structures

There is no standalone institution/member table yet. Institution-level and committee-level material is embedded inside country dossiers:

- `country.dossierDetails.integrityCommittees.groups[].committees[]`
- `country.dossierDetails.networkLayers[].actors[]`
- `country.transparency.resources[]`
- `country.dossierDetails.sourceLinks[]`
- country source notes under `data/<Country>/raw documentation/source notes/*.md`
- `data/source-registry.csv`

This is enough to seed LERU institution cards or rows, but not enough for a clean member environment without a purpose-built LERU data layer.

No dedicated `data/leru*.js`, `data/*member*`, `data/*institution*`, or `data/*committee*` file was found.

## Existing LERU-Relevant Material

### Explicit LERU/INTE Findings

Exact `LERU` appears mostly as the project label:

- `index.html` eyebrow: `LERU map pilot`
- `README.md`
- `reports/project-overview.html`
- `reports/presentation-report.html`
- `docs/plans/TIMELINE-MAP-FEATURE-PLAN.md`
- `AGENTS.md`

Within country data, explicit LERU substance appears in the Spain/Barcelona dossier:

- `data/countries.js` around the Universitat de Barcelona route describes a research-integrity code, ethics and integrity mailbox, bioethics/animal/hospital-related committees, and a `LERU/HRS4R-linked research-ethics agenda`.

No standalone `INTE` material or LERU INTE membership dataset was found in the repository. A LERU INTE layer would therefore need either a new curated data file or a later import from a separately verified member list.

### Strong Existing Institution Seeds

The repository already contains several LERU-relevant institutional routes, public-output examples, and source-registry entries. These are not in a dedicated LERU table; they live inside country dossiers, source notes, transparency resources, and the source registry.

Representative examples:

| Institution or route | Existing material | Main locations |
| --- | --- | --- |
| KU Leuven | Commission on Research Integrity / reporting desk, annual-report hub, yearly CWI counts and anonymized summaries. | `data/countries.js`, `data/transparency.js`, `data/source-registry.csv`, `data/Belgium/raw documentation/source notes/Belgium deep-dive sources.md` |
| Leiden University and LUMC | Academic Integrity Committee / CWI, separate university and LUMC chambers, complaint route, annual reports. | `data/countries.js`, Netherlands source notes/inventory |
| Utrecht University and UMC Utrecht | Scientific Integrity Committee / CWI, complaints regulation, annual report, LOWI route. | `data/countries.js`, Netherlands source notes/inventory |
| Oxford | Annual research integrity reports and 2024 statement with anonymized numbered allegations/outcomes. | `data/countries.js`, `data/transparency.js`, `data/source-registry.csv`, UK source notes |
| Imperial College London | Annual statement with narrative case-learning trace. | `data/countries.js`, `data/transparency.js`, `data/source-registry.csv`, UK source notes |
| Cambridge | Research integrity report hub and misconduct procedure, latest report hub added as UK quality-pass seed. | `data/countries.js`, `data/transparency.js`, `data/source-registry.csv`, UK source notes |
| UCL | Annual statement on research integrity 2023-2024, named contacts and Research Misconduct Committee annual-analysis notes. | `data/countries.js`, `data/transparency.js`, `data/source-registry.csv`, UK source notes |
| ETH Zurich | Scientific Integrity Office, Integrity Commission, GSP Commission, departmental RIAs, anonymised investigation reports table, procedure statistics table. | `data/countries.js`, `data/transparency.js`, `data/source-registry.csv`, Switzerland source notes |
| University of Geneva | Swiss institutional route example under the broader Swiss responsible-bodies directory and boundary ecosystem. | `data/countries.js`, Switzerland source notes/source registry |
| Sorbonne Universite | Integrity delegation and 2025 scientific-integrity activity report. | `data/countries.js`, `data/transparency.js`, `data/source-registry.csv`, France source notes |
| Universite Paris-Saclay | POLETHIS ethics and integrity route. | `data/source-registry.csv`, France source notes, France dossier references |
| Heidelberg University | Ombudsmen for academic practice and Graduate Academy ombudsperson. | `data/countries.js`, `data/source-registry.csv`, Germany source notes |
| University of Milan | Ethics Committee page and regulation; useful restricted-minutes/publication-boundary example. | `data/countries.js`, `data/transparency.js`, `data/source-registry.csv`, Italy source notes |
| Trinity College Dublin | Senior Dean Research Integrity route and good-research-practice policy. | `data/countries.js`, `data/source-registry.csv`, Ireland source notes |
| University of Helsinki | Research integrity / responsible conduct route and adviser/support model. | `data/countries.js`, `data/source-registry.csv`, Finland source notes |
| Lund University | Deviations from good research practice review board and reporting route. | `data/countries.js`, `data/source-registry.csv`, Sweden source notes |
| Universitat de Barcelona | Ethics and integrity route, multiple committees, mailbox, LERU/HRS4R-linked ethics agenda. | `data/countries.js`, `data/source-registry.csv`, Spain source notes |
| University of Copenhagen | Local QRP and returned-cases route under the Danish statutory split. | `data/countries.js`, Denmark source notes |

### Existing Method Material Useful For LERU

- `docs/workflows/CASE-FILE-WORKFLOW.md` gives the best route-level logic: treat the route as the unit, not only a formal committee, and distinguish structured archives, annual-report summaries, procedure-only routes, and no-public-trace findings.
- `docs/workflows/COUNTRY-PAIR-COMPARISON-WORKFLOW.md` is already tuned for a research integrity officer audience.
- `docs/plans/NL-BE-SYSTEM-COMPARISON-PLAN.md` is a close product analogue: static, officer-facing, route-oriented, and comparison-focused.
- `docs/plans/NEXT-PHASE-QUALITY-PLAN.md` defines the quality-consolidation standard that the LERU member page should inherit.

## Recommended Architecture

### Option A: Add A New Standalone Page, `leru/index.html`

Fit with current app:

- Strong fit. The project already has separate top-level `protocol/index.html` and report pages, and the main app can link to separate pages.
- Keeps LERU-specific language and data loading isolated from the country map.
- Can reuse `assets/css/styles.css` or use a small LERU-specific stylesheet later.

Implementation complexity:

- Moderate. Add a new folder/page plus a small renderer and a small data file.
- No need to modify the complex map/timeline code for V1.

Risk of breaking existing app:

- Low. The main app can remain unchanged except for an optional navigation link.

Support for future LERU tables/reports:

- Strong. A standalone page can grow into search/filter tables, profile cards, downloadable static summaries, and links back to country dossiers without crowding `index.html`.

Static app/backend fit:

- Works fully as static HTML/JS/CSS. It cannot provide real access control by itself, but it can present public or local-only content safely if the hosting model is clear.

### Option B: Add A New Section/View Inside `index.html`

Fit with current app:

- Good visually. The app already has tabbed view panes, search patterns, comparison sections, and renderer helpers.
- The current NL-BE comparison view demonstrates this can work.

Implementation complexity:

- Moderate to high. It requires editing `index.html`, `assets/js/app.js`, and probably `assets/css/styles.css`.
- The app view-state and hash routing would need new cases for `#leru` or similar.

Risk of breaking existing app:

- Medium. The main app JS is large and directly wires element IDs. Adding another view increases selector/routing risk.

Support for future LERU tables/reports:

- Good for a lightweight view, weaker if the LERU environment grows into its own resource with institution profiles and validation states.

Static app/backend fit:

- Works statically, but it makes the public main app look like the LERU member environment itself. This may blur public/internal boundaries.

### Option C: Add A Report-Style Page Under `reports/`, e.g. `reports/leru-member-environment.html`

Fit with current app:

- Good for a briefing, prototype, or presentation-oriented deliverable.
- Reuses the report pattern with sticky nav, inline CSS, sections, and tables.

Implementation complexity:

- Low for a static narrative page.
- Higher if it later needs dynamic search/filter data from a separate JS file.

Risk of breaking existing app:

- Very low. It is isolated.

Support for future LERU tables/reports:

- Good for a report, weaker for an operational lookup environment.
- It may encourage a static narrative product rather than a reusable member-data layer.

Static app/backend fit:

- Works statically, but should not imply access restriction unless it is only stored/served privately.

### Recommendation

Use Option A: add a new standalone `leru/index.html` environment with its own small data file and optional lightweight JS renderer.

Reasoning:

- It has the lowest risk to the existing country map while still supporting a real lookup environment.
- It can link back to country dossiers (`../index.html#dossier-belgium`, `../index.html#dossier-united-kingdom`, etc.) without reusing the entire app state.
- It creates a clean place for LERU-specific fields such as member status, INTE status, validation status, institutional profile completeness, and next follow-up.
- It avoids adding another large data concern to `data/countries.js`.
- It can remain static and public-safe for V1, while local/private deployment can be handled outside the app if needed.

## V1 Feature Proposal

V1 should be a practical public-safe lookup page, not an access-controlled portal and not a policy statement.

Recommended V1 sections:

1. Intro / landing
   - Short explanation of the broader Research Integrity Systems in Europe map.
   - Short explanation that the LERU page is a practical member-oriented view derived from public and project-verified sources.
   - Explicit note that V1 is a static evidence map and not a private authenticated member portal.

2. LERU member lookup
   - Searchable table or compact cards.
   - Fields: institution, country, LERU status, LERU INTE status if known, national route summary, institutional route summary, transparency/public-output type, validation status, next follow-up.
   - Use links back to country dossiers and public source links.

3. Institution / committee profiles
   - For institutions with enough existing data, show profile cards with:
     - research integrity office/committee route
     - complaint/reporting route
     - public procedures
     - public case outputs or annual reports
     - main source links
     - caveats
   - Do not fabricate profiles for institutions with thin data. Use `validationStatus` and `nextFollowUp`.

4. Route comparison
   - Small comparison strip: national route, institutional first-line route, second-line or advisory route, public-output model.
   - This can reuse concepts from the NL-BE comparison page and the case-file workflow.

5. Missing / member validation needed
   - Clear list of missing or uncertain fields.
   - Examples: "current committee composition to verify", "annual report found but fields not indexed", "no public case-output archive located", "LERU INTE membership status to validate".

6. Links back
   - Country dossier links.
   - Source registry/source links.
   - Project overview and protocol links.

Implementation note: use basic static JS filtering. No fake login, no password field, no privacy banner suggesting real protection.

## Proposed Data Schema

Recommended file for V1:

- `data/leru-members.js`

Use a global assignment to match the existing app pattern:

```js
window.LERU_MEMBER_DATA = [
  {
    id: "ku-leuven",
    institution: "KU Leuven",
    countryId: "belgium",
    country: "Belgium",
    city: "Leuven",
    leruStatus: "LERU member",
    inteStatus: "To verify",
    profileStatus: "Seeded from country dossier",
    validationStatus: "Needs member validation",
    nationalRoute: {
      summary: "Flemish institutional first-line route with VCWI second advice; Belgium-wide code baseline.",
      countryDossierHref: "../index.html#dossier-belgium"
    },
    institutionalRoute: {
      officeOrCommittee: "Commission on Research Integrity and Research Integrity Reporting Desk",
      location: "Research coordination / integrity and ethics pages",
      routeSummary: "Concerns can move through advisers/reporting desk and CRI procedure.",
      publicProcedures: "Public institutional route and annual-report pages",
      publicOutputs: "Annual reports with counts and anonymized summaries",
      transparencyType: "Institutional annual-report corridor"
    },
    sourceLinks: [
      {
        label: "KU Leuven annual reports",
        url: "https://research.kuleuven.be/en/integrity-ethics/integrity/annual-report",
        sourceType: "Institutional annual-report hub",
        sourceDate: "2026-05-29",
        registryId: "BE-S024"
      }
    ],
    tags: ["annual-report", "committee", "first-line", "member-validation"],
    caveats: [
      "Do not treat KU Leuven annual reports as a Belgian national archive.",
      "Current LERU INTE status still needs validation against a member list."
    ],
    nextFollowUp: "Index annual-report rows and validate member-facing description."
  }
];
```

Optional globals:

```js
window.LERU_MEMBER_METADATA = {
  prepared: "2026-06-23",
  sourceBasis: "Existing country dossiers, transparency layer, source registry and source notes",
  privacyNote: "Static public-safe view; no authentication or private member data."
};
```

Why JS rather than CSV/JSON for V1:

- Existing app data uses global JS files.
- It works from `file://` without a fetch/CORS issue.
- It avoids adding build tooling.

CSV or JSON can be considered later if the data becomes large or needs spreadsheet editing. If using JSON, serve through a local/static server rather than opening from disk, because browser fetch restrictions may vary.

## Exact Files To Add/Edit

| File path | Change type | Purpose | Risk level | Notes |
| --- | --- | --- | --- | --- |
| `docs/plans/LERU-MEMBER-ENVIRONMENT-PLAN.md` | Add | This exploratory handoff. | Low | Planning artifact for this exploratory pass. |
| `leru/index.html` | Add | New standalone LERU member environment. | Low | Recommended implementation target for next pass. |
| `data/leru-members.js` | Add | Purpose-built LERU member/institution data layer. | Low | Keep small in V1; use public-safe data only. |
| `assets/js/leru.js` | Add | Lightweight renderer for search, filters, cards/table, profile expansion. | Low | Do not modify `assets/js/app.js` unless cross-linking becomes necessary. |
| `assets/css/leru.css` | Add or maybe edit | Optional LERU-specific page styles. | Low | Prefer a new small stylesheet if the page needs layout differences. Alternatively reuse `assets/css/styles.css`. |
| `index.html` | Maybe edit | Add one header/nav link to `leru/index.html`. | Low-medium | Optional. Keep to a single link if added. |
| `reports/project-overview.html` | Maybe edit | Mention the LERU member environment once it exists. | Low | Optional after implementation. |
| `README.md` | Maybe edit | Add how to open `leru/index.html`. | Low | Optional after implementation. |
| `data/countries.js` | Avoid editing in V1 | Country source data should remain the backbone, not the LERU product dataset. | Medium | Only edit if a discovered country error must be corrected. |
| `data/transparency.js` | Avoid editing in V1 | LERU page should consume or reference transparency conclusions rather than recode them. | Medium | Only edit for a verified transparency correction. |
| `data/source-registry.csv` | Maybe edit later | Add registry rows if new public sources are collected. | Low-medium | Not needed for a pure prototype using existing sources. |

## Risks And Privacy/Authentication Caveats

Static app limitations:

- A static app cannot provide real access restriction by itself.
- Anything committed to the repository and deployed publicly should be treated as public.
- Client-side filtering is convenience only, not security.
- Hiding content in JavaScript, comments, inactive tabs, or unlinked files is not privacy protection.

Safe to host publicly:

- Public source links.
- Institution-level summaries based on public sources.
- Existing country dossier conclusions already intended for the static app.
- Validation status labels such as `public-source seed`, `needs member validation`, or `not yet checked`.
- Aggregated or anonymized public-output descriptions already present in official annual reports or public case pages.

Keep local/private unless explicitly cleared:

- Personal email lists or named private contacts not already public institutional role contacts.
- Internal LERU INTE distribution lists.
- Unpublished member feedback.
- Internal meeting notes.
- Raw exports containing personal data or unreviewed sensitive comments.
- Any case material not already public and anonymized in official sources.

How to make the page useful without login:

- Position it as a public-safe evidence map and lookup aid.
- Use validation and caveat fields instead of implying completeness.
- Link to country dossiers and public sources.
- Use "member validation needed" as an action queue rather than a private workspace.
- If a genuinely restricted member product is required, host it outside this static app behind institutional authentication or keep a private local build that is not published.

## Verification Checks

Safe checks run on 23 June 2026:

```powershell
node --check data\countries.js
node --check assets\js\app.js
node --check data\transparency.js
```

All completed with exit code 0. No implementation files were changed, no packages were installed and no destructive commands were run.

## Questions For Lodewijk

1. Which LERU membership list should be treated as authoritative for V1, and should LERU INTE membership be included only after validation?
2. Should V1 cover all LERU universities immediately, or only institutions already represented with usable source material in the current dossiers?
3. Should the first page be public-facing, local-only for internal discussion, or prepared for later authenticated hosting outside this static app?
4. For member validation, should the page show a status field only, or should it generate institution-specific validation prompts/checklists?
5. Is the primary audience research integrity officers, policy leads, LERU INTE participants, or a mixed LERU working-group audience?
6. Should institutional contact names be excluded by default unless they are official public role contacts?
7. Should country-system comparison remain the main frame, or should V1 prioritize institution-to-institution route comparison?

## Suggested Next Codex Implementation Prompt

```text
You are working in my existing "Research Integrity Systems in Europe" static web app.

Use `docs/plans/LERU-MEMBER-ENVIRONMENT-PLAN.md` as the implementation handoff.

Implement a minimal public-safe V1 LERU member environment without restructuring the existing app.

Requirements:

1. Add a standalone page at `leru/index.html`.
2. Add a small public-safe seed dataset at `data/leru-members.js`.
3. Add a lightweight renderer at `assets/js/leru.js` for search/filtering and profile expansion.
4. Reuse existing visual language from `assets/css/styles.css` where practical; add `assets/css/leru.css` only if needed.
5. Seed only a small set of institutions already supported by existing project data, such as KU Leuven, Leiden, Utrecht, Oxford, Imperial, Cambridge, UCL, ETH Zurich, Sorbonne, Trinity, Helsinki, Lund and Barcelona. Do not claim completeness.
6. Each seeded record must include country link, route summary, public procedure/output summary, source links, validation status, caveats and next follow-up.
7. Do not add authentication, private-data claims, personal email lists, or sensitive unpublished material.
8. Keep `data/countries.js` and `data/transparency.js` unchanged unless a clear bug is found.
9. Optionally add one navigation link from `index.html` to `leru/index.html`.
10. Run safe checks: `node --check data/countries.js`, `node --check assets/js/app.js`, and syntax-check any new JS file.

After implementation, summarize changed files, seeded institutions, caveats, and checks run.
```
