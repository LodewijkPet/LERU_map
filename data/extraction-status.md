# App extraction status

Checked: 2026-04-28

This audit compares local `Overview *.docx` files with `data/countries.js`.

## Finding

All 40 readable country overview documents are represented in the app dataset and have country-specific app extraction in `data/countries.js`.

Romania was initially blocked because the DOCX was zero bytes. The file was restored later on 2026-04-17 and has now been extracted.

Extracted overview entries:

- Austria
- Belarus
- Belgium
- Bosnia and Herzegovina
- Bulgaria
- Croatia
- Cyprus
- Czechia
- Denmark
- Estonia
- Finland
- France
- Germany
- Greece
- Hungary
- Iceland
- Ireland
- Italy
- Kosovo
- Latvia
- Lithuania
- Luxembourg
- Moldova
- Montenegro
- Netherlands
- North Macedonia
- Norway
- Poland
- Portugal
- Romania
- Russia
- Serbia
- Spain
- Slovakia
- Slovenia
- Sweden
- Switzerland
- Turkey
- United Kingdom
- Ukraine

## Latest extraction pass

The latest pass added and reconciled `Overview United Kingdom.docx` on 2026-04-23. The United Kingdom app dossier now includes the new overview synthesis, expanded devolved assurance and charitable-funder routes, four-nation institutional annual-statement examples, health-research cross-border boundaries and animal-research openness sources.

The preceding pass added and extracted eleven newly supplied readable overview countries:

- Bosnia and Herzegovina
- Bulgaria
- Cyprus
- Iceland
- Kosovo
- Montenegro
- North Macedonia
- Romania
- Russia
- Serbia
- Turkey

North Macedonia and Russia were renamed to the standard `Overview <Country>.docx` pattern before extraction. Romania was extracted after the restored DOCX became readable. The local source documents used for this pass are recorded in `data/overview-extraction-log.csv`.

## Overview file readability

40 overview documents are readable as normal DOCX packages for automated extraction.

## Current non-overview entries

Nine countries have first app dossiers but no overview document yet:

- Albania
- Andorra
- Armenia
- Azerbaijan
- Georgia
- Liechtenstein
- Malta
- Monaco
- San Marino

## Website source registry

The latest overview extraction and reconciliation work added embedded source links from the eleven earlier readable new overview documents with `OV-` source IDs, then added the United Kingdom overview-reconciliation sources with `UK-S015` through `UK-S033`, the Germany committee-and-case-file pilot sources with `DE-S039` through `DE-S048`, the France committee-and-case-file pilot sources with `FR-S026` through `FR-S030`, the Slovakia committee-and-case-file pilot sources with `SK-S026` through `SK-S030`, the Moldova committee-and-case-file pilot sources with `MD-S001` through `MD-S005`, the Montenegro committee-and-case-file pilot sources with `ME-S031` through `ME-S037`, the Poland committee-and-case-file pilot sources with `PL-S034` through `PL-S043`, the Portugal committee-and-case-file pilot sources with `PT-S025` through `PT-S029`, later case-file sources through Hungary, the Croatia committee-and-case-file pilot sources with `HR-S031` through `HR-S035`, the Belgium committee-and-case-file pilot sources with `BE-S001` through `BE-S013`, the Czechia committee-and-case-file pilot sources with `CZ-S001` through `CZ-S012`, the Switzerland committee-and-case-file pilot sources with `CH-S001` through `CH-S021`, the Austria committee-and-case-file pilot sources with `AT-S027` through `AT-S033`, the Ireland committee-and-case-file pilot sources with `IE-S035` through `IE-S043`, the Latvia committee-and-case-file pilot sources with `LV-S001` through `LV-S008`, the Luxembourg committee-and-case-file pilot sources with `LU-S001` through `LU-S018`, the Cyprus committee-and-case-file pilot sources with `CY-S001` through `CY-S014`, the Serbia committee-and-case-file pilot sources with `RS-S001` through `RS-S011`, the Bulgaria committee-and-case-file pilot sources with `BG-S001` through `BG-S011`, the Belarus committee-and-case-file pilot sources with `BY-S023` through `BY-S028`, the Iceland committee-and-case-file pilot sources with `IS-S001` through `IS-S008`, the Bosnia and Herzegovina committee-and-case-file pilot sources with `BA-S001` through `BA-S014`, the Kosovo committee-and-case-file pilot sources with `XK-S001` through `XK-S011`, the Armenia first expanded app dossier sources with `AM-S005` through `AM-S022`, the Azerbaijan first expanded app dossier sources with `AZ-S001` through `AZ-S022`, the Georgia first expanded app dossier sources with `GE-S001` through `GE-S022`, the San Marino first expanded app dossier sources with `SM-S001` through `SM-S021`, and the North Macedonia committee-and-case-file pilot sources with `MK-S001` through `MK-S017`. Later quality-consolidation and follow-up passes, including the Latvia UL full-text classification and LAS/LCS/public-research-institute follow-up sources with `LV-S009` through `LV-S038` plus Slovenia quality-consolidation sources with `SI-S030` through `SI-S036`, bring the source registry to 1550 entries.

## Transparency layer

Added: 2026-04-17

The transparency overview `data/transparency_research_integrity_europe_overview.docx` has been extracted into `data/transparency.js` and `data/transparency-extraction-log.csv`.

Scope of source document:

- EU-27
- United Kingdom
- Switzerland
- Norway
- Iceland

All current app country records receive a `transparency` element at runtime. Countries outside the original transparency source scope receive an explicit "Not reviewed in transparency overview" value unless a later country dossier or case-file pass adds country-specific transparency coding. Kosovo was added to `data/transparency.js` through the 26 April 2026 committee-and-case-file pass.

The public web and PDF resources embedded in the transparency overview have been added to `data/source-registry.csv` with `TR-` source IDs.
