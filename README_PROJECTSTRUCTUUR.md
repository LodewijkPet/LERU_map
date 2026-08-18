# LERU-rapport: projectstructuur

Deze map is de zelfstandige werkbasis voor het vergelijkende LERU-rapport over functies en commissies voor wetenschappelijke integriteit. De bestaande website is geen inhoudelijke master; het Word-rapport en de onderliggende dossiers zijn dat wel.

## Hoofdbestand

- `LERU_Research_Integrity_Committees_Comparative_Report_WORKING_DRAFT.docx` — wetenschappelijke rapportopzet, voorlopige evidence-baseline, land- en instellingsprofielen, datamodel, analyseplan en validatievragen.

## Populatie en dossiers

- `01_...` tot en met `24_...` — één dossier per officieel LERU-lid (24 universiteiten in 12 landen).
- De inclusie-eenheid is het LERU-lid. Dit is nog geen gevalideerde lijst van 24 afzonderlijke LERU-INTE-commissies.
- De analyse volgt per instelling de feitelijke integriteitsroute. Die kan bestaan uit een commissie, office, ombudspersoon, referent, named person, reporting desk, panel of hybride combinatie.

Elke instellingsmap bevat:

1. `00_Dossier_Metadata` — README, bronmanifest en template voor het genormaliseerde record;
2. `01_Country_System` — landelijke context en nationale actoren;
3. `02_Committee_and_Institution` — institutionele positionering, mandaat en routeactoren;
4. `03_Procedures_and_Policies` — procedures, codes en andere formele documenten;
5. `04_Reports_Statistics_and_Timeline` — jaarverslagen, casusoutput, aantallen en tijdlijnmateriaal;
6. `05_Correspondence_RESTRICTED` — niet-openbare correspondentie, uitsluitend intern gebruiken;
7. `06_Web_Sources_and_Snapshots` — gedownloade publieke bronnen en websnapshots;
8. `99_Working_Notes` — extractie- en validatienotities.

## Gedeelde methoden en data

- `00_Shared_LERU_and_Methods/01_Study_Protocol_and_Codebook` — protocol, codeboek en master-datadictionary.
- `00_Shared_LERU_and_Methods/02_LERU_Level_Documents` — netwerkbrede LERU-documenten.
- `00_Shared_LERU_and_Methods/03_Email_and_Meeting_Context_RESTRICTED` — correspondentie-index en methodologische context; niet publiceren zonder controle.
- `00_Shared_LERU_and_Methods/04_Cross_Committee_Data` — overkoepelende dekking en vergelijkingsbestanden.

## Herkomst en kwaliteitscontrole

- `99_Project_Admin/PROJECT_SOURCE_INDEX.json` — herkomstindex van gemigreerde projectbronnen.
- `99_Project_Admin/PUBLIC_SOURCE_DOWNLOAD_LOG.json` en `CURATED_CURRENT_SOURCE_DOWNLOAD_LOG.json` — geslaagde en mislukte bronretrievals.
- Elk dossier bevat een `SOURCE_MANIFEST.json` met lokaal pad, bestandsgrootte, SHA-256 en vertrouwelijkheidsstatus.
- Een lokaal Outlook-snapshot, ontvangen ETH-documenten en Heidelberg-documenten zijn verwerkt voor zover zij werkelijk beschikbaar waren. De live Outlook-mailbox en niet-geëxporteerde bijlagen waren niet toegankelijk en zijn daarom als ontbrekend gelogd.

## Eerstvolgende inhoudelijke stap

Vul voor alle instellingen hetzelfde genormaliseerde kernrecord, koppel iedere claim aan veldniveau-provenance en verstuur daarna per instelling alleen de nog openstaande, gerichte validatievragen. Pas na die ronde kunnen de definitieve vergelijkingstabellen, figuren en website-afgeleiden worden gemaakt.
