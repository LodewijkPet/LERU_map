# Decision log

## D-001 — Baseline v0.1 bevriezen

- **Datum:** 2026-08-20
- **Status:** besloten
- **Besluit:** de huidige rapport- en datalaag wordt vóór verdere herstructurering als baseline v0.1 bewaard in een afzonderlijke OneDrive-backup.
- **Minimale inhoud:** de actuele Word-werkversie, de huidige rapportdatasets en logs, de bestaande canonieke-inputinventaris en alle 24 institutionele dossiermanifesten.
- **Aanvullende inhoud:** overige dossiermetadata, centrale bron- en downloadlogs, relevante rapportbouwers, het A-tot-Z-plan en de huidige PDF-render.
- **Reden:** de actieve GitHub-werkmap is de huidige bron van waarheid; de achtergebleven `.git`-entry in de oude OneDrive-map is niet bruikbaar als herstelbron.
- **Gevolg:** toekomstige wijzigingen worden niet teruggeschreven in baseline v0.1. Een volgende baseline krijgt een nieuw versienummer en een nieuw manifest.
- **Open vervolg:** de keuze en inrichting van het canonieke datamodel uit stap C staat los van deze freeze en vereist een afzonderlijk besluit.

## D-002 — Document- en veldprovenance als append-only register vastleggen

- **Datum:** 2026-08-20
- **Status:** besloten en technisch geïmplementeerd; inhoudelijke bewijskoppeling open
- **Besluit:** punt D krijgt een canonieke JSONL-laag voor stabiele documentidentiteiten, onveranderlijke documentversies, artikelveldsnapshots, claim-bewijskoppelingen, versiegebeurtenissen en veldwijzigingen, plus een afgeleide standalone HTML-weergave.
- **Beginscope:** alleen het actuele Word-artikel wordt als eerste document geregistreerd. Het krijgt document-ID `DOC-LERU-REPORT-0001` en versie-ID `VER-DOC-LERU-REPORT-0001-20260820-0C3F24477630`.
- **Bewijsgrens:** het artikel is `research_output` en `evidence_eligible: false`; het mag niet als bewijs voor zijn eigen inhoudelijke claims worden gebruikt. Zelfverwijzing is alleen toegestaan voor verifieerbare artefactmetadata.
- **Veldankers:** Word-`w14:paraId` is het stabiele anker voor paragrafen en tabelcellen. Iedere momentopname bevat daarnaast een genormaliseerde veldhash, locator, sectie, materialiteit en provenance-status.
- **Wijzigingsregel:** een nieuwe bestandshash maakt altijd een nieuwe documentversie en snapshot. Bestaande snapshots en hun manifesten worden niet overschreven. Veldwijzigingen bewaren oude en nieuwe waarde en hash, actor, reden, reviewstatus en besluit.
- **Huidige uitkomst:** 1 document, 1 versie, 1.147 veldsnapshots en 609 materiële velden die afzonderlijk bewijs of institutionele validatie vereisen. Er zijn bewust nog 0 geverifieerde bewijskoppelingen.
- **Reden:** deze scheiding voorkomt zelfcitatie, stille overschrijving en verlies van historische context, terwijl Git-diffs en SHA-256-controles iedere latere wijziging auditbaar maken.
- **Gate-besluit:** de registerinfrastructuur van punt D is gereed. De inhoudelijke definition of done blijft open totdat iedere materiële rapportclaim een bron-ID plus pinpoint of een institutionele validatiereferentie heeft.
