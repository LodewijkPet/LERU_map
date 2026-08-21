# LERU document- en veldprovenanceregister

## Doel

Deze map implementeert punt D van het A-tot-Z-plan als een controleerbare, versieerbare auditlaag. Het register houdt drie dingen uit elkaar:

1. **documentidentiteit** — welk document of welke bron wordt bedoeld;
2. **documentversie** — welke exacte bestandsversie, met datum, pad en SHA-256;
3. **veldniveau-provenance** — welke afzonderlijke rapport- of datasetclaim door welke bronversie en welke pinpoint wordt ondersteund.

Het huidige Word-artikel is als enige startdocument opgenomen. Het is geregistreerd als `research_output` en is daarom **niet evidence-eligible**: het artikel mag nooit als bewijs voor zijn eigen inhoud worden gebruikt.

## Huidige status

- Registerinfrastructuur: gereed, versie 0.1.
- Beginsnapshot: het huidige Word-artikel op 20 augustus 2026.
- Veldinventaris: documentmetadata, Word-secties, narratieve velden en tabelcellen met stabiele Word-`paraId`-ankers.
- Claim–bewijs-koppelingen: nog leeg zolang de afzonderlijke bron- en validatieversies niet zijn ingelezen.
- Gate D: blijft inhoudelijk open totdat iedere materiële rapportclaim een bron-ID plus pinpoint of een institutionele validatiereferentie heeft.

## Canonieke bestanden

| Bestand | Functie | Wijzigingsregel |
|---|---|---|
| `documents.jsonl` | Stabiele documentidentiteiten | Eén identiteit per document; geen versiegegevens dupliceren |
| `document_versions.jsonl` | Onveranderlijke documentversies | Append-only; nieuwe hash betekent nieuwe `document_version_id` |
| `article_field_snapshots.jsonl` | Momentopname van alle gedetecteerde velden | Append-only per documentversie |
| `field_provenance_links.jsonl` | Koppelingen van claim naar bewijs/validatie | Append-only; correcties krijgen een nieuwe of supersederende koppeling |
| `change_events.jsonl` | Hoog-niveau versiegebeurtenissen | Append-only |
| `field_changes.jsonl` | Oude en nieuwe veldwaarden per versieverschil | Append-only; iedere wijziging wordt beoordeeld en besloten |
| `register_state.json` | Actuele tellingen en Gate-D-status | Afgeleide actuele toestand; mag reproduceerbaar worden vernieuwd |
| `register_schema.json` | ID-regels en gecontroleerde vocabularia | Versienummer verhogen bij schemawijziging |
| `register_integrity_manifest.json` | SHA-256 van de registerbestanden | Na iedere reproduceerbare bouw vernieuwen |
| `LERU_D_document_and_field_provenance_register_v0.1_2026-08-20.html` | Zelfstandige lees- en filterweergave | Afgeleid van de canonieke bestanden |

JSONL is gekozen voor de canonieke laag omdat iedere regel zelfstandig leesbaar is, Git-diffs precies laten zien wat is toegevoegd en append-only geschiedenis niet stilzwijgend kan worden overschreven. De HTML is alleen een gebruikersvriendelijke weergave.

## Beginsnapshot

Iedere documentversie krijgt een eigen map onder `snapshots/YYYY-MM-DD/<document_version_id>/` met:

- een byte-identieke kopie van het geregistreerde document;
- `snapshot_manifest.json` met document-ID, versie-ID, paden, bestandsgrootte, SHA-256, paginatal, woordental en het aantal vastgelegde velden.

Een bestaande snapshot wordt nooit overschreven. Als hetzelfde snapshotpad een andere hash heeft, stopt de builder met een fout.

## Veldniveau en wijzigingsdetectie

Word kent iedere paragraaf intern een stabiele `w14:paraId` toe. Het register gebruikt die ankers voor:

- secties en koppen;
- narratieve paragrafen;
- captions;
- tabelcellen;
- documentmetadata.

Per veld worden de actuele waarde en een genormaliseerde SHA-256 vastgelegd. Bij een latere artikelversie vergelijkt de builder de nieuwe en vorige veldset en registreert hij:

- `created`;
- `modified`;
- `deleted`;
- oude en nieuwe waarde;
- oude en nieuwe hash;
- actor en wijzigingsreden;
- reviewstatus, beoordelaar, datum en besluit.

Een wijziging is pas inhoudelijk afgehandeld wanneer `review_status`, `reviewer`, `reviewed_at`, `decision` en zo nodig `source_or_evidence` zijn ingevuld.

## Claim–bewijs-koppeling

Iedere regel in `field_provenance_links.jsonl` bevat minimaal:

- `link_id`;
- `field_id`;
- `source_document_id`;
- `source_document_version_id`;
- `source_pinpoint`;
- `support_role`;
- `evidence_status`;
- `linked_by` en `linked_at`;
- `reviewer` en `reviewed_at`;
- `notes`.

Toegestane supportrollen zijn `primary`, `corroborating`, `scope`, `conflicting`, `superseded` en `institutional_validation`. Institutionele bevestiging blijft herkenbaar als validatie en wordt niet als publieke bron voorgesteld.

## Nieuwe artikelversie registreren

Voer vanuit de projectroot uit:

```powershell
& '.\99_Project_Admin\Provenance\Update-DocumentProvenanceRegister.ps1' `
  -SnapshotDate 'YYYY-MM-DD' `
  -Actor 'Naam beoordelaar' `
  -ChangeReason 'Korte, concrete reden voor deze versie'
```

De builder is idempotent voor een reeds geregistreerde bestandshash. Bij een nieuwe hash maakt hij een nieuwe snapshot en vult hij het veldwijzigingslog aan.

## Kwaliteitsregels

1. Het huidige rapportbestand blijft op zijn werkpad staan; registratie wijzigt de inhoud niet.
2. Eerdere snapshots, versies, events en veldwijzigingen worden niet verwijderd of herschreven.
3. `not_found_after_search` betekent nooit dat een functie of document niet bestaat.
4. Een bronlink zonder pagina, sectie, bepaling, webkop of andere controleerbare pinpoint voltooit Gate D niet.
5. Een hashwijziging onder dezelfde URL of bestandsnaam maakt een nieuwe bron- of documentversie.
6. Formele publieke bronnen, restricted correspondentie, institutionele validatie en analytische interpretatie blijven afzonderlijke categorieën.
7. Het artikel is een afgeleid onderzoeksproduct en niet zijn eigen bewijsbron.

## Reproduceerbare controle

Na iedere bouw moeten minimaal worden gecontroleerd:

- de hash van het actieve artikel en de snapshot zijn identiek;
- `register_integrity_manifest.json` klopt voor alle genoemde registerbestanden;
- iedere `document_version_id` is uniek;
- iedere veldsnapshot verwijst naar een bestaande documentversie;
- iedere provenance-link verwijst naar een bestaand veld en een bestaande bronversie;
- er zijn geen dubbel gebruikte `link_id`, `event_id` of `change_id`-waarden;
- de HTML-weergave opent lokaal en toont dezelfde tellingen als `register_state.json`.

De volledige beginsnapshotcontrole is vastgelegd in `QA_REPORT_2026-08-20.md`.
