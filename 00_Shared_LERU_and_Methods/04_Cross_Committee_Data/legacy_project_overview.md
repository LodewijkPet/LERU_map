# LERU Integrity Map - Project Overview

## Purpose
This repository consolidates research integrity information for European countries, Dutch committees, and LOWI reports. It supports data collection, descriptive analysis, and a static website for browsing and capturing new entries.

## Repository layout
- `01_Admin/`: meeting notes, protocols, drafts, and supporting documents.
- `02_Data/`: canonical JSON sources and templates used by analysis and the website.
- `03_Analysis/`: scripts that summarize coverage and build timeline datasets.
- `04_Outputs/`: published assets, including the static website.
- `90_Archive/`: historical source files and legacy materials.

## Data flow
1. Update or add JSON files under `02_Data/Raw/countries`, `02_Data/Raw/committees`, or `02_Data/Raw/reports`.
2. Regenerate aggregated datasets for the website:
   ```powershell
   python 02_Data/Raw/tools/seed_initial_data.py --aggregate
   ```
3. (Optional) Generate analytics JSON for dashboards or summaries:
   ```powershell
   python 03_Analysis/descriptive/build_descriptive_overview.py
   python 03_Analysis/timeline/build_timeline_dataset.py
   ```

## Key outputs
- Static website in `04_Outputs/Website/` with pages for countries, committees, and reports.
- Aggregated JSON in `04_Outputs/Website/data/` for fast client-side loading.
- Analysis artefacts in `03_Analysis/descriptive/descriptive_summary.json` and
  `03_Analysis/timeline/timeline_events.json`.

## Notes for contributors
- Keep templates in `02_Data/Raw/templates/` aligned with the website forms.
- After editing raw JSON, always regenerate the aggregated data so the site and
  analysis scripts see the same view.
