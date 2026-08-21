# LERU-rapport baseline v0.1

- **Freeze-datum:** 2026-08-20
- **Bronwerkmap:** `C:\Users\lapet\Github\02_Research_Projects\04_LERU_Integrity_Map`
- **Git-commit bij freeze:** `e5893ba`
- **Backupmap:** `C:\Users\lapet\OneDrive - LUMC\02_Research_Projects\PhD_Thesis_Projects\Part_II\04_LERU_Integrity_Map\99_Project_Admin\Baselines\baseline_v0.1_2026-08-20`
- **ZIP-archief:** `C:\Users\lapet\OneDrive - LUMC\02_Research_Projects\PhD_Thesis_Projects\Part_II\04_LERU_Integrity_Map\99_Project_Admin\Baselines\LERU_baseline_v0.1_2026-08-20.zip`

## Doel

Deze snapshot bewaart de uitgangssituatie vóór de inrichting van het canonieke datamodel uit stap C van het A-tot-Z-plan. De freeze maakt de huidige rapport- en datalaag reproduceerbaar, maar verklaart de bestaande bestanden nog niet tot de definitieve datasetstructuur.

## Inbegrepen

- de actuele Word-werkversie en de huidige PDF-render;
- de bestanden uit de bestaande canonieke-inputinventaris;
- de actuele rapportdatasets, extractielogs en bronregisters;
- de onderhoudsmanifesten voor bronnen en canonieke inputs;
- alle 24 institutionele `SOURCE_MANIFEST.json`-bestanden en de overige bestanden in `00_Dossier_Metadata`;
- de gedeelde cross-committee-data en dossierdekkingsstatus;
- de centrale bron- en downloadlogs;
- de relevante rapport- en manifestbouwers;
- het A-tot-Z-plan, dit baselineverslag, het changelog en het decision log.

## Integriteitscontrole

`BASELINE_MANIFEST.csv` bevat voor ieder opgenomen bronbestand het relatieve pad, de categorie, bestandsgrootte, oorspronkelijke wijzigingstijd en de SHA-256-hash. De ZIP-hash staat in het gelijknamige `.sha256`-bestand naast het archief.

## Niet inbegrepen

De snapshot is geen volledige kopie van alle ruwe downloads, tijdelijke renderpagina's, caches, Git-objecten of vertrouwelijke correspondentie. Die blijven op hun bestaande, daarvoor bedoelde locaties staan. Geen actief bronbestand is voor deze freeze overschreven of verplaatst.
