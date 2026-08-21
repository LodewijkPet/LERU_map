# Changelog

## 2026-08-20 — Punt D: document- en veldprovenanceregister v0.1

- Een canoniek, Git-vriendelijk provenance-register is toegevoegd onder `99_Project_Admin/Provenance/`, met afzonderlijke lagen voor documentidentiteit, onveranderlijke documentversies, veldsnapshots, claim-bewijskoppelingen, versiegebeurtenissen en veldwijzigingen.
- Het actuele Word-artikel is geregistreerd als `DOC-LERU-REPORT-0001`; een byte-identieke snapshot met SHA-256 `0c3f24477630c20d7662f8489bc3f5a0a73c2658956e23dadb7a65d35f8e3cff` is vastgelegd als `VER-DOC-LERU-REPORT-0001-20260820-0C3F24477630`.
- De beginsnapshot bevat 1.147 afzonderlijke veldsnapshots met stabiele Word-`paraId`-ankers. Daarvan vereisen 609 materiële velden een afzonderlijke bron of institutionele validatie.
- Een idempotente PowerShell-builder, registerschema, integriteitsmanifest, standalone HTML-weergave, README en gedateerd QA-rapport zijn toegevoegd.
- Alle ID-, referentie-, veldhash-, bestandsmanifest-, snapshot- en weergavecontroles zijn geslaagd. De infrastructuur is gereed; Gate D blijft inhoudelijk open totdat de 609 materiële velden aan bewijs of validatie zijn gekoppeld.

## 2026-08-20 — Baseline v0.1

- De actuele Word-werkversie, rapportdatasets, extractie- en bronlogs, canonieke-inputinventaris, dossiermetadata en alle 24 losse `SOURCE_MANIFEST.json`-bestanden zijn als baseline v0.1 vastgelegd.
- De baseline is buiten de Git-werkmap opgeslagen in de LUMC-OneDrive, zowel als leesbare mappenstructuur als ZIP-archief.
- Een bestandsmanifest met SHA-256-controles en een afzonderlijke SHA-256-controle voor het ZIP-archief zijn toegevoegd.
- De inhoud van de actieve bronbestanden is bij het bevriezen niet gewijzigd.
