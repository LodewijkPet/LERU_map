# Inventaris van agentplannen en projectinstructies

Inventarisatiedatum: 24 juli 2026

## Doel en afbakening

Dit document verzamelt de repository-lokale plannen, instructies, workflows, checklists, statusgestuurde vervolgacties en auditsporen die agents gebruiken bij het verwerken van informatie in het project **Research Integrity Systems in Europe / LERU Integrity Map**.

De inventaris gaat over instructies die zichtbaar in deze projectrepository zijn vastgelegd. Algemene platform-, model- of runtime-instructies buiten de repository vallen er niet onder.

Aanvullende documenten:

- [Engelse versie van deze inventaris](AGENT-PLANS-AND-INSTRUCTIONS-INVENTORY-EN.md)
- [Engelstalige ontwerpgids voor Agent plans](../plans/AGENT-PLAN-DESIGN-GUIDE.md)

## Samenvatting

De agentsturing bestaat niet uit één plan, maar uit een gelaagd systeem:

| Laag | Aantal / bereik | Functie |
| --- | ---: | --- |
| Permanente agent-handoff | 1 | Algemene projectdoelen, vaste werkwijze, dataschema, bronregels, kwaliteitscriteria en prioriteiten |
| Formeel onderzoeksprotocol | 1 | Onderzoeksontwerp, variabelen, bronhiërarchie, missingness, kwaliteitsborging en analyseplan |
| Expliciete planbestanden | 4 | Actieve kwaliteitsfase, tijdlijnfunctie, NL-BE-vergelijking en LERU-memberomgeving |
| Uitvoeringsworkflows | 3 | Case-fileonderzoek, landenvergelijking en LERU-instellingsextractie |
| Actuele status- en gapdocumenten | 4 | Voortgang, implementatiebeperkingen, validatieagenda en geprioriteerde vervolgstappen |
| Projecttracker | 1 | Projectbrede status, landentabel, huidige focus en eerstvolgende werkzaamheden |
| Extractiestatus | 1 | Dekking van overviewdocumenten en registratielagen |
| Landgebonden bronnotities | 53 bestanden voor 49 landen | Werknotities, zoeksporen, negatieve bevindingen, kwaliteitschecks en “gaps for next pass” |
| Ingebedde landenmicroplannen | 49 `nextFocus`-velden | Eerstvolgende concrete actie per land |
| Ingebedde LERU-microplannen | 24 `nextFollowUp`-velden | Eerstvolgende actie per LERU-instelling |
| LERU-validatievragen | 110 vragen bij 22 instellingen | Gerichte vragen voor member validation |
| Audit- en provenancebestanden | 4 hoofdlogs/registries | Herleidbaarheid van bronnen, overviewextractie, transparantie-extractie en LERU-extractie |
| Technische gebruiksinstructie | 1 | Starten en lokaal controleren van de statische app |

Live tellingen op 24 juli 2026:

- 49 landenrecords: 40 `Deep dossier drafted` en 9 `Expanded overview dossier`;
- alle 49 landen hebben een gevuld `nextFocus`;
- 35 expliciete transparantierecords, aangevuld met runtime-defaults;
- 1.568 entries in het actuele bronregister;
- 40 overviewextractielogregels;
- 50 transparantie-extractielogregels;
- 33 LERU-extractielogregels;
- 24 LERU-memberprofielen.

## 1. Permanente agent-handoff

### `AGENTS.md`

Status: belangrijkste algemene projectinstructie.

Gebruik:

- een nieuw land toevoegen;
- een overview verdiepen tot een dossier;
- een final sweep uitvoeren;
- na afloop projectdata en tracker consistent bijwerken.

De handoff bevat:

1. **Projectdoel**
   - Een brongekoppeld overzicht van Europese research-integritysystemen bouwen en onderhouden.
   - Vergelijken op nationale organen, institutionele procedures, funders, publieke case-output en aanpalende regimes.

2. **Huidige projecttoestand**
   - Landen- en dossierdekking.
   - Speciale gevallen.
   - Afgeronde pilots en actuele prioriteiten.

3. **Standaardworkflow voor één land**
   1. Begin met `data/<Country>/Overview <Country>.docx`.
   2. Controleer de lokale map en bronnotities.
   3. Vul aan met officiële online documentatie.
   4. Modelleer het land als systeem, niet als losse documentverzameling.
   5. Werk `data/countries.js` bij.
   6. Werk `reports/project-overview.html` bij.
   7. Voer minimaal JavaScript-syntaxchecks uit.

4. **Vaste bronvolgorde**
   1. nationale wetgevingsdatabases;
   2. ministeries;
   3. nationale integriteits-, ethiek- of kwaliteitsorganen;
   4. academies;
   5. funders;
   6. universiteiten en publieke onderzoeksinstellingen;
   7. biomedische ethiekorganen;
   8. gegevensbeschermingsautoriteiten;
   9. IE-autoriteiten;
   10. dierproef- en klinische-trialautoriteiten.

5. **Verplichte dossierstructuur**
   - Kernvelden voor ieder land.
   - `transparency` en `dossierDetails` voor een deep dossier.
   - Vaste vormen voor `systemMap`, `networkLayers`, `integrityCommittees`, `evidenceCategories`, `boundaries`, `timeline` en `sourceLinks`.

6. **Kwaliteitsdefinitie**
   - Maak duidelijk of het systeem nationaal of gedistribueerd is.
   - Scheid research integrity van aanpalende regimes.
   - Identificeer de sterkste nationale en institutionele routes.
   - Neem funders, tijdlijn en officiële bronbackbone op.
   - Benoem ontbrekende of ontoegankelijke informatie expliciet.

7. **Vaste boundary-regels**
   - Misconduct is niet hetzelfde als research-ethics approval.
   - Case handling is niet hetzelfde als quality assurance.
   - Funder monitoring is niet hetzelfde als adjudication.
   - Student academic integrity is niet hetzelfde als research integrity.
   - Data protection, IP, whistleblowing, employment en anti-corruption blijven aparte lanes tenzij de bron ze uitdrukkelijk verbindt.

8. **Stage-labels en definition of done**
   - Alleen `Deep dossier drafted` gebruiken als er werkelijk een systeemkaart, netwerklaag, commissiedirectory, boundaries, tijdlijn en bronbackbone zijn.
   - Na een landpass: data, tracker en waar nodig register/logs bijwerken, syntaxchecks draaien en commissie-/transparantietekst herlezen.

9. **Werkstijl**
   - Conservatieve toevoegingen.
   - Bestaande datavorm en formuleringen hergebruiken.
   - Analytisch en niet-promotioneel schrijven.
   - Precieze datums gebruiken.
   - Onduidelijkheid als gap markeren.

Bron: [`AGENTS.md`](../../AGENTS.md)

## 2. Formeel onderzoeksprotocol

### `protocol/index.html`

Status: **draft protocol / working scaffold**, niet het actuele operationele takenbord.

Het protocol vertaalt het project naar een reproduceerbaar mappingonderzoek:

- ontwerp: beschrijvende cross-sectionele mapping met longitudinale versioning;
- primaire eenheid: land/jurisdictie, met geneste organisaties en governance-actoren;
- kernuitkomst: aanwezigheid, bereik, volwassenheid en transparantie van infrastructuur;
- bronprincipe: iedere gecodeerde observatie moet naar een terugvindbare bron leiden;
- datamodel: aparte entities, observations, sources, variables en extraction decisions;
- missingness-labels: `not_found`, `not_applicable`, `unclear`, `source_inaccessible`, `translation_pending` en `requires_expert_confirmation`;
- kwaliteitsborging: calibratie, dubbele extractie voor prioriteitsvariabelen, adjudicatie en confidence per observatie;
- analyse: beschrijvende tabellen, governance-typologieën, transparantieoverzichten en gaprapporten.

Bronhiërarchie in het protocol:

| Tier | Brontype | Normaal gebruik |
| --- | --- | --- |
| S1 | Wet of statutaire bron | Mandaten, bevoegdheden, plichten en beroep |
| S2 | Officiële nationale body | Structuur, procedure, jaarverslag en guidance |
| S3 | Instellings- of funderbeleid | Lokale implementatie, meldroute en training |
| S4 | Wetenschappelijke of grey literature | Zoekingang en triangulatie |
| S5 | Media/blog/derde partij | Alleen signaal; formele coding vereist verificatie |

Protocolworkflow:

1. land scopen;
2. bronnen zoeken;
3. bronnen screenen;
4. variabelen extraheren;
5. meningsverschillen adjudiceren;
6. dataset locken.

Belangrijke waarschuwing: het protocol zegt zelf dat de tabellen en URL’s placeholders zijn. Ze mogen niet als actuele landenbevindingen worden gebruikt.

Bron: [`protocol/index.html`](../../protocol/index.html)

## 3. Expliciete planbestanden

### 3.1 Actief projectbreed plan: `NEXT-PHASE-QUALITY-PLAN.md`

Status: volgens de tracker de actieve projectfase.

Doel: de overgang maken van brede eerste verzameling naar verdedigbare, actuele en vergelijkbare dossiers.

Zeven workstreams:

1. **Source Currency Sweep**
   - Controleer de nieuwste wet, code, procedure, jaarverslagen, funder terms, institutionele voorbeelden en boundaries.
   - Registreer verhuisde, verdwenen, vervangen of ontoegankelijke bronnen.

2. **ENRIO Cross-Check**
   - Leg vast of er een ENRIO-country report en ENRIO-member/affiliate is.
   - Gebruik ENRIO als vergelijkingslaag, niet als vervanging voor primaire bronnen.

3. **Code of Conduct Matrix**
   - Identificeer nationale, academy-, funder-, sector- en institutionele codes.
   - Leg gebruik van ALLEA 2023 en behandelde integriteitsonderwerpen vast.

4. **Committee and Institution Directory**
   - Normaliseer nationale, institutionele, funder- en boundary-routes.
   - Leg eigenaar, scope, outputstatus, archiefbron en boundary warning vast.

5. **Public Output and Case-File Repository Indexing**
   - Indexeer eigenaar, jaren, formaat, velden, allegation types, outcomes, anonimisering, lifecycle en toegankelijkheid.

6. **Missing Overview and Representation Completion**
   - Maak formele overviews voor negen landen.
   - Beslis over representatie van Vatican City.

7. **Data Hygiene and App Consistency**
   - Werk country data, tracker, agent-handoff, bronregister en relevante logs bij.
   - Draai syntaxchecks.

Definition of done voor de fase:

- ieder land heeft een actuele controledatum;
- ENRIO-status;
- hoofdcode-status;
- route directory voor nationaal, institutioneel, funder en boundaries;
- duidelijke public-outputbeoordeling;
- duurzame bronregistratie;
- expliciete missingness.

Bron: [`docs/plans/NEXT-PHASE-QUALITY-PLAN.md`](../plans/NEXT-PHASE-QUALITY-PLAN.md)

### 3.2 Product-/architectuurplan: `LERU-MEMBER-ENVIRONMENT-PLAN.md`

Status in het document: oorspronkelijk “exploratory planning only”. De aanbevolen V1 is inmiddels grotendeels geïmplementeerd, zodat het document nu vooral een architectuur- en privacyhandoff is.

Kernkeuzes:

- zelfstandige pagina onder `leru/index.html`;
- eigen datalaag in `data/leru-members.js`;
- statische publieke-safe lookupomgeving;
- geen nep-authenticatie of verborgen private data in client-side bestanden;
- profielen alleen vullen met verifieerbare publieke institutionele evidence;
- country-level conclusies niet verwarren met institution-level routes.

Het plan bevat:

- inventaris van bestaande appstructuur;
- drie architectuuropties en aanbeveling;
- V1-secties;
- voorgesteld dataschema;
- concrete bestandswijzigingen;
- privacy- en authenticatiebeperkingen;
- verificatiechecks;
- open beslisvragen;
- een kant-en-klare implementatieprompt.

Bron: [`docs/plans/LERU-MEMBER-ENVIRONMENT-PLAN.md`](../plans/LERU-MEMBER-ENVIRONMENT-PLAN.md)

### 3.3 Pair-specific control plan: `NL-BE-SYSTEM-COMPARISON-PLAN.md`

Status: uitvoeringsledger voor de eerste landenvergelijking.

Functie:

- doelgroep en vergelijkingsoogmerk vastleggen;
- per taak de status bijhouden;
- kwaliteitspoorten voor Nederland en België definiëren;
- de statische comparison page sturen;
- later beslissen welke vergelijkingselementen dynamisch worden.

Werkprincipes:

- vergelijk functies, niet prestige;
- gebruik geen samengestelde landenranking;
- houd handler, decision-maker, second-line body en publication owner uit elkaar;
- behandel public case visibility als dimensie, niet als systeemkwaliteit;
- scheid boundaries;
- benoem confidence en missingness.

Belangrijke statusnuance: Task 1C staat als “completed for pilot; pending under strict workflow”. Dat is bewust dubbel: het pilotproduct gebruikte Nederland al, maar de later ingevoerde strikte workflow vraagt nog een formeel vastgelegde quality gate.

Bron: [`docs/plans/NL-BE-SYSTEM-COMPARISON-PLAN.md`](../plans/NL-BE-SYSTEM-COMPARISON-PLAN.md)

### 3.4 Featureplan: `TIMELINE-MAP-FEATURE-PLAN.md`

Status in het plan: “planned feature”; actuele voortgang: gedeeltelijk geïmplementeerd.

Het plan bevat:

- analytische en narratieve doelen;
- cumulative development map;
- event playback;
- callouts en leader lines;
- tijdlijnrail, side panel, filters, zoeken en story modes;
- vergelijking, regionale views en milestone matrix;
- afgeleid eventmodel;
- datum-, categorie-, level- en confidence-normalisatie;
- zes implementatiefasen;
- accessibility, reduced motion en mobile gedrag;
- risico’s en mitigaties;
- MVP, preferred release en verificatiechecklist.

Implementatiefasen:

1. data-audit en normalizer;
2. statische timeline tab;
3. playback en callouts;
4. filters en story modes;
5. comparison views;
6. quality polish.

Bron: [`docs/plans/TIMELINE-MAP-FEATURE-PLAN.md`](../plans/TIMELINE-MAP-FEATURE-PLAN.md)

## 4. Uitvoeringsworkflows

### 4.1 `CASE-FILE-WORKFLOW.md`

Status: staande methode voor committee- en case-fileonderzoek; alle 40 deep dossiers hebben de basispass afgerond. De workflow blijft actief als indexeer- en kwaliteitsmethode.

Kernvraag:

1. Welke bodies behandelen, beoordelen, monitoren of publiceren cases?
2. Welk publiek spoor laten zij achter?
3. Hoe open, gestructureerd en duurzaam is dat spoor?

Unit of observation: de **route**, niet alleen een formele commissie.

Zichtbaarheidsklassen:

1. structured archive;
2. stable case page;
3. individual case files;
4. annual-report summaries;
5. aggregate statistics only;
6. procedure only;
7. no public trace found.

Standaardworkflow:

1. bouw een seed list uit lokale documenten en bestaande data;
2. scheid handlers van boundary bodies;
3. zoek per body een constitutieve bron, procedure, publicatiehub en voorbeeldoutput;
4. verbreed institutioneel als het nationale niveau zwak of verdeeld is;
5. codeer publicatiemodel, diepte, lifecycle, eigenaar, archive scope, velden, beperkingen en stabiliteit;
6. registreer negatieve bevindingen;
7. wijzig het dossier pas als de evidence stabiel is.

De workflow bevat daarnaast:

- 40 landspecifieke methodologische verfijningen uit pilots;
- zoekvolgorde en lokale zoektermen;
- hergebruik van de bestaande datastructuur;
- een uitgebreid Markdown-template voor werknotities;
- boundary-regels;
- definitie van goede output;
- afsluitchecklist.

Bron: [`docs/workflows/CASE-FILE-WORKFLOW.md`](../workflows/CASE-FILE-WORKFLOW.md)

### 4.2 `COUNTRY-PAIR-COMPARISON-WORKFLOW.md`

Status: gespecialiseerde workflow voor officer-facing vergelijking van twee landen.

Bijzondere agentregel:

- een volledige vergelijking mag niet in één run worden uitgevoerd;
- één genummerde taak per run, tenzij de gebruiker expliciet vraagt door te gaan;
- na iedere taak stoppen en een vaste handoff geven;
- de handoff vermeldt scope, gewijzigde bestanden, gecontroleerde bronnen, bevindingen, gaps, volgende taak en checks.

Fasen en taken:

0. pair-plan en lokale broninventarissen;
1. Country A source-current sweep, dossierupdate en quality gate;
2. hetzelfde voor Country B;
3. zeven vergelijkingsassen:
   - systeemmodel en normatieve basis;
   - complaint route en case handling;
   - public output en transparantie;
   - institutionele implementatie;
   - funder- en grant-compliance;
   - boundary regimes;
   - evidence quality en extraction targets;
4. algemene synthese en officer-facing content;
5. statische appimplementatie en visuele check;
6. officer review en dynamic-readiness review.

Het document bevat ook:

- vaste definities;
- een source-current checklist;
- een source-by-source reviewtemplate;
- regels voor welke projectbestanden wanneer veranderen;
- syntax- en duplicate-ID-checks;
- een volledige definition of done.

Bron: [`docs/workflows/COUNTRY-PAIR-COMPARISON-WORKFLOW.md`](../workflows/COUNTRY-PAIR-COMPARISON-WORKFLOW.md)

### 4.3 `LERU-INSTITUTION-EXTRACTION-WORKFLOW.md`

Status: gespecialiseerde workflow voor het verdiepen van een LERU-memberprofiel.

Bronvolgorde:

1. repository eerst;
2. daarna uitsluitend officiële publieke instellingsbronnen;
3. niet-officiële bronnen normaal weglaten.

Te vullen velden omvatten onder meer:

- rapport- en profielstatus;
- evidence level;
- transparency category;
- institutionele route;
- committee/office;
- procedure- en public-outputsummary;
- source coverage en links;
- caveats;
- next follow-up;
- member-validation questions.

Statuslogica:

- `Coverage placeholder`;
- `Partial seed`;
- `Detailed seed`.

Aanvullende regels:

- institutionele evidence niet afleiden van een andere instelling in hetzelfde land;
- boundary regimes niet omcoderen tot misconduct handling;
- geen persoonlijke e-mailadressen, telefoonnummers of private operationele details reproduceren;
- afwezigheid van publieke output niet uitleggen als afwezigheid van cases;
- na iedere batch loggen, syntaxchecks draaien en alleen waar gevraagd visueel controleren.

Bron: [`docs/workflows/LERU-INSTITUTION-EXTRACTION-WORKFLOW.md`](../workflows/LERU-INSTITUTION-EXTRACTION-WORKFLOW.md)

## 5. Statusgestuurde plannen en hervatinstructies

### `reports/project-overview.html`

Dit is de operationele projecttracker en de meest bruikbare projectbrede statusweergave.

Het document bevat:

- actuele tellingen;
- een vijfstaps high-level workflow;
- rollen van de belangrijkste databestanden;
- landentabel met `Current level` en `Next action`;
- huidige focus;
- actieve kwaliteitsfase;
- landcompletion, dossierhardening en methodetightening;
- briefingtekst voor collaborators.

High-level workflow:

1. bronnen vinden;
2. overview opstellen;
3. naar de app extraheren;
4. transparantielaag toevoegen;
5. dossiers verdiepen.

Bron: [`reports/project-overview.html`](../../reports/project-overview.html)

### `data/extraction-status.md`

Functie:

- auditen welke overview-DOCX-bestanden in `data/countries.js` zijn vertegenwoordigd;
- leesbaarheidsproblemen bijhouden;
- negen landen zonder formele overview benoemen;
- voortgang van bronregister en transparantielaag samenvatten.

Bron: [`data/extraction-status.md`](../../data/extraction-status.md)

### `docs/status/TIMELINE-MAP-PROGRESS.md`

Functie:

- het featureplan verbinden met werkelijk geïmplementeerde onderdelen;
- gewijzigde bestanden en uitgevoerde checks registreren;
- bekende beperkingen benoemen;
- een geordende hervatqueue geven.

Actuele hervatvolgorde:

1. browser smoke test;
2. category mapper review;
3. dense-year gedrag verbeteren;
4. audit summary toevoegen;
5. story presets toevoegen;
6. eventueel timelinecode opsplitsen.

Bron: [`docs/status/TIMELINE-MAP-PROGRESS.md`](TIMELINE-MAP-PROGRESS.md)

### LERU-statusdocumenten

1. [`LERU-EXECUTIVE-SUMMARY-DRAFT.md`](LERU-EXECUTIVE-SUMMARY-DRAFT.md)
   - Public-source synthese.
   - Validatieagenda en beperkingen.
   - Adviseert eerst member validation in plaats van een nieuwe extractieronde.

2. [`LERU-PUBLIC-OUTPUT-AUDIT.md`](LERU-PUBLIC-OUTPUT-AUDIT.md)
   - Wording rules en typologie voor alle 24 instellingen.
   - Instellingsgebonden auditbasis en resterende validatievraag.
   - Batch- en member-validationupdates.

3. [`LERU-REPORT-GAP-MATRIX.md`](LERU-REPORT-GAP-MATRIX.md)
   - Prioriteringsmatrix per instelling.
   - Volgende acties voor member validation, field indexing en editorial/export.
   - Maakt onderscheid tussen audit-upgrades en werkelijk nieuwe output-evidence.

Deze documenten zijn geen algemene methode, maar sturen de eerstvolgende LERU-werkzaamheden.

## 6. Ingebedde microplannen

### 6.1 Landniveau in `data/countries.js`

Alle 49 landenrecords hebben een `nextFocus`.

Dit veld is de meest concrete last-mile instructie per land. Het kan gaan om:

- een ontbrekende `Overview <Country>.docx` opstellen;
- een jaarverslag- of beslisarchief field-indexen;
- een body of procedure opnieuw verifiëren;
- institutionele dekking verbreden;
- een ontoegankelijke route via een andere officiële ingang testen;
- een toekomstige wets- of procedurewijziging monitoren;
- boundaries expliciet gescheiden houden.

De 49 `nextFocus`-teksten zijn zichtbaar in de app en worden daarnaast samengevat in de country tracker.

Bron: [`data/countries.js`](../../data/countries.js)

### 6.2 LERU-instellingsniveau in `data/leru-members.js`

Alle 24 profielen hebben een `nextFollowUp`.

22 profielen bevatten samen 110 `memberValidationQuestions`. University of Milan en University of Zurich hebben geen open vragenarray meer; hun recente member-validationbevindingen zijn al als concrete monitoringsinstructie verwerkt.

Typische vervolgacties:

- jaarlijkse outputs row-by-row indexeren;
- bevestigen dat geen lokaal public-outputkanaal is gemist;
- institutionele en nationale/sectoroutput uit elkaar houden;
- interne/restricted output niet publiek voorstellen;
- gewijzigde procedure, office name of ordinance later opnieuw controleren.

Bron: [`data/leru-members.js`](../../data/leru-members.js)

### 6.3 Landgebonden bronnotities

Er zijn 53 Markdown-bronnotities verspreid over alle 49 landen.

Terugkerende instructiesecties:

- `Committee and case-file pass`;
- `Quality-consolidation pass`;
- `Source-current sweep`;
- `Gaps for next pass`;
- `Remaining gaps for a final sweep`;
- `Next extraction targets`;
- `Remaining follow-up queue`;
- comparison inventory en quality-gate notes;
- member-validation updates.

Vier aanvullende, taakgerichte notities boven op de ene basisnotitie per land:

- Belgium comparison source inventory;
- Netherlands comparison source inventory;
- Netherlands source-current sweep 2026-05-29;
- Romania overview-readability issue.

Locatiepatroon: `data/<Country>/raw documentation/source notes/`

## 7. Templates en checklists die agents invullen

De projectinstructies bevatten herbruikbare sjablonen:

1. **Deep-dossierdataschema**
   - In `AGENTS.md`.
   - Schrijft per object en subobject de toegestane/verwachte velden voor.

2. **Committee and case-file working-note template**
   - In `CASE-FILE-WORKFLOW.md`.
   - Vraagt per route om body type, lane, owner, archive scope, database function, visibility, lifecycle, case-file status, exclusions en gaps.

3. **Source-current reviewtemplate**
   - In `COUNTRY-PAIR-COMPARISON-WORKFLOW.md`.
   - Legt per bron bestaande locatie, live URL, status, cross-reference, route, boundary warning en vereiste wijzigingen vast.

4. **PDF/report extraction extension**
   - Jaren, case fields, outcome fields, publication exclusions, retention, representatief bestand en extractietarget.

5. **Quality gates**
   - Landenvergelijking gebruikt `comparison-ready`, `comparison-ready with stated gaps` en `not ready`.

6. **Definitions of done**
   - Aanwezig op landniveau, case-filepass, quality-consolidatiefase, comparison task, comparison pilot, timelinefase en LERU-profielbatch.

7. **Technische checks**
   - JavaScript-syntaxchecks.
   - Duplicate source-ID-check bij wijziging van `data/source-registry.csv`.
   - Browser-/visuele checks alleen als de specifieke workflowfase of gebruiker daarom vraagt.

## 8. Audit- en provenance-instructies

Deze bestanden zijn geen narratieve plannen, maar maken uitvoering controleerbaar:

| Bestand | Functie |
| --- | --- |
| `data/source-registry.csv` | Duurzame bronnen, type, categorie, access date, gebruik en lokale opslag |
| `data/overview-extraction-log.csv` | Audit trail van 40 overviewextracties |
| `data/transparency-extraction-log.csv` | Audit trail van transparantie-extractie |
| `data/leru-extraction-log.csv` | Batch- en profielupdates voor LERU-instellingen |

Registratieregels:

- gebruik stabiele source IDs;
- log duurzame nieuwe, verplaatste of vervangende bronnen;
- label archieven, databases, registers en annual-report corridors als extractietarget;
- leg waar mogelijk zowel de hub als een representatief bestand vast;
- bewaar access date en het gebruik in de coding;
- interpreteer `not found` niet als bewijs dat iets niet bestaat.

## 9. Technische gebruiks- en productinstructies

### `README.md`

Bevat:

- starten via `index.html`;
- alternatief starten via een lokale Python HTTP-server;
- projectstructuur;
- troubleshooting.

Bron: [`README.md`](../../README.md)

### `docs/article/build_leru_report_outline.py`

Dit script is geen algemeen agentplan, maar bevat wel een gecodeerde redactionele productspecificatie:

- LERU-instellingen groeperen per nationaal systeem;
- routes, public output en analytische invalshoek per instelling presenteren;
- boundaries en institution/national-outputverschillen bewaken;
- een Word-artikeloutline genereren.

Het hoort daarom bij de uitvoeringsartefacten, niet bij de normatieve hoofdinstructies.

Bron: [`docs/article/build_leru_report_outline.py`](../article/build_leru_report_outline.py)

## 10. Geconsolideerde actuele agentwerkwijze

Als de verspreide instructies tot één actuele werkwijze worden samengevoegd, ontstaat dit proces:

1. **Bepaal het taaktype**
   - landpass;
   - quality sweep;
   - case-file/indexeerpass;
   - landenvergelijking;
   - LERU-instellingsprofiel;
   - app-/feature-implementatie.

2. **Lees de juiste instructielaag**
   - altijd `AGENTS.md`;
   - daarna het gespecialiseerde plan en/of de workflow;
   - daarna het actuele status- of pair-controlbestand.

3. **Begin lokaal**
   - overview;
   - raw documentation;
   - bronnotities;
   - bestaande appvelden;
   - transparantielaag;
   - bronregister.

4. **Verifieer gericht online**
   - officiële en actuele bronnen eerst;
   - lokale taal waar nodig;
   - ENRIO alleen als vergelijkingslaag;
   - secundaire bronnen hooguit als zoekbrug.

5. **Modelleer routes en functies**
   - intake;
   - advies;
   - onderzoek;
   - besluit;
   - second line/appeal;
   - funder consequence;
   - publicatie.

6. **Codeer public output precies**
   - owner;
   - scope;
   - depth;
   - format;
   - public fields;
   - non-public fields;
   - anonymization;
   - lifecycle;
   - retention;
   - accessibility;
   - exclusions;
   - stability.

7. **Houd boundaries apart**
   - ethics approval, clinical, animal, data, IP, QA, open science, security, employment en whistleblowing alleen als aparte lane opnemen.

8. **Registreer negatieve bevindingen**
   - geen archief gevonden;
   - body in wet, maar geen actuele pagina;
   - publicatieplicht zonder live output;
   - bron geblokkeerd, verplaatst of historisch;
   - alleen aggregate of restricted informatie.

9. **Werk de kleinste stabiele set projectbestanden bij**
   - eerst bronnotitie;
   - alleen evidence-driven wijzigingen in appdata;
   - bronregister en logs wanneer relevant;
   - tracker alleen als status of next action werkelijk verandert.

10. **Controleer**
    - syntax;
    - duplicate IDs indien relevant;
    - interne consistentie van committee- en transparencytekst;
    - visueel alleen als de taak dat vereist.

11. **Draag over**
    - wat is afgerond;
    - welke bronnen zijn gecontroleerd;
    - welke conclusies zijn veranderd;
    - welke gaps blijven;
    - wat is de volgende concrete taak.

## 11. Voorrang en samenhang

Aanbevolen lees- en beslisvolgorde binnen de repository:

1. `AGENTS.md` voor algemene standaarden en projectcontext.
2. Gespecialiseerde workflow voor de taak:
   - case files;
   - country pair;
   - LERU institution.
3. Bijbehorend plan:
   - quality phase;
   - pair plan;
   - feature- of productplan.
4. Actueel status-/gapdocument voor waar het werk moet worden hervat.
5. Land- of instellingsgebonden bronnotitie.
6. `nextFocus`, `nextFollowUp` of validatievragen als concrete laatste stap.

Belangrijk:

- De pair-comparisonworkflow heeft een expliciete stop-na-één-taakregel.
- Het case-filedocument bepaalt de classificatiemethode, ook nu de eerste 40 pilots zijn afgerond.
- Het quality plan bepaalt de actuele projectbrede fase.
- Het protocol bepaalt de gewenste wetenschappelijke methodologie, maar bevat nog placeholders.
- Statusdocumenten en microplannen bepalen prioriteit, niet de algemene kwaliteitsstandaard.

## 12. Bekende versie- en consistentiepunten

1. **Verschillende statusdatums**
   - `AGENTS.md` en het quality plan zijn hoofdzakelijk bijgewerkt tot 30 april 2026.
   - NL-BE-documenten lopen tot 29 mei 2026.
   - LERU-documenten bevatten updates tot 16 juli 2026.

2. **Bronregistertelling**
   - Oudere instructies noemen 1.550 of 1.564 entries.
   - De actuele registry en projecttracker bevatten 1.568 regels.

3. **LERU-plan versus implementatie**
   - Het LERU-plan noemt zichzelf exploratory en zegt dat de feature nog niet is gebouwd.
   - De repository bevat inmiddels `leru/index.html`, `data/leru-members.js`, `assets/js/leru.js` en een rapportpagina.
   - Gebruik het plan daarom als ontwerp- en privacybasis, niet als actuele implementatiestatus.

4. **Timelineplan versus implementatie**
   - Het featureplan zegt “planned”.
   - Het progresslog registreert een gedeeltelijk werkende implementatie.
   - Het progresslog is leidend voor hervatting.

5. **Protocolplaceholders**
   - De protocoltabellen en voorbeeldlinks zijn expliciet niet-factueel.
   - Gebruik ze niet als country evidence.

6. **LERU-tellingen op verschillende datums**
   - De executive-summarydraft bewaart een eerdere typologietelling.
   - De public-outputaudit en gap matrix verwerken latere member-validationupdates.
   - Gebruik voor de actuele classificatie `data/leru-members.js` en de nieuwste audit.

7. **Snapshotbestanden**
   - Er bestaan acht bestanden met suffix `-2023-1236`.
   - Deze zijn parallelle snapshots/back-ups en niet de primaire actuele instructie- of databestanden.
   - Gebruik standaard de bestanden zonder dit suffix.

## 13. Canonieke bronnenlijst

### Algemene instructie

- [`AGENTS.md`](../../AGENTS.md)
- [`README.md`](../../README.md)

### Protocol

- [`protocol/index.html`](../../protocol/index.html)

### Plannen

- [`docs/plans/NEXT-PHASE-QUALITY-PLAN.md`](../plans/NEXT-PHASE-QUALITY-PLAN.md)
- [`docs/plans/LERU-MEMBER-ENVIRONMENT-PLAN.md`](../plans/LERU-MEMBER-ENVIRONMENT-PLAN.md)
- [`docs/plans/NL-BE-SYSTEM-COMPARISON-PLAN.md`](../plans/NL-BE-SYSTEM-COMPARISON-PLAN.md)
- [`docs/plans/TIMELINE-MAP-FEATURE-PLAN.md`](../plans/TIMELINE-MAP-FEATURE-PLAN.md)

### Workflows

- [`docs/workflows/CASE-FILE-WORKFLOW.md`](../workflows/CASE-FILE-WORKFLOW.md)
- [`docs/workflows/COUNTRY-PAIR-COMPARISON-WORKFLOW.md`](../workflows/COUNTRY-PAIR-COMPARISON-WORKFLOW.md)
- [`docs/workflows/LERU-INSTITUTION-EXTRACTION-WORKFLOW.md`](../workflows/LERU-INSTITUTION-EXTRACTION-WORKFLOW.md)

### Status, voortgang en prioritering

- [`reports/project-overview.html`](../../reports/project-overview.html)
- [`data/extraction-status.md`](../../data/extraction-status.md)
- [`docs/status/TIMELINE-MAP-PROGRESS.md`](TIMELINE-MAP-PROGRESS.md)
- [`docs/status/LERU-EXECUTIVE-SUMMARY-DRAFT.md`](LERU-EXECUTIVE-SUMMARY-DRAFT.md)
- [`docs/status/LERU-PUBLIC-OUTPUT-AUDIT.md`](LERU-PUBLIC-OUTPUT-AUDIT.md)
- [`docs/status/LERU-REPORT-GAP-MATRIX.md`](LERU-REPORT-GAP-MATRIX.md)

### Ingebedde planning

- [`data/countries.js`](../../data/countries.js)
- [`data/leru-members.js`](../../data/leru-members.js)
- `data/<Country>/raw documentation/source notes/*.md`

### Audit trail

- [`data/source-registry.csv`](../../data/source-registry.csv)
- [`data/overview-extraction-log.csv`](../../data/overview-extraction-log.csv)
- [`data/transparency-extraction-log.csv`](../../data/transparency-extraction-log.csv)
- [`data/leru-extraction-log.csv`](../../data/leru-extraction-log.csv)

## Slotconclusie

Het project gebruikt vier complementaire vormen van agentplanning:

1. **Normatieve instructies** — wat altijd waar moet zijn (`AGENTS.md`, protocol, boundary- en bronregels).
2. **Fase- en productplannen** — wat een projectfase of feature moet opleveren.
3. **Stapsgewijze workflows** — hoe een afgebakende taak wordt uitgevoerd en wanneer de agent moet stoppen.
4. **Statusgestuurde microplannen** — welk land, welke instelling, welke bron of welk veld als volgende aan de beurt is.

Juist de combinatie maakt de verwerking reproduceerbaar: algemene standaarden bewaken de inhoud, workflows bewaken de uitvoering, statusdocumenten bewaken de voortgang en data-/logvelden bewaren de concrete volgende actie en de herleidbaarheid.
