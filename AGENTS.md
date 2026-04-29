# AGENTS.md

This file is the standing handoff for continuing the LERU map data collection.

Use it when adding a new country, deepening an overview into a full dossier, or doing a final sweep on an already-expanded country.

## Project Goal

Build and maintain a source-linked overview of research integrity systems across Europe.

The app compares countries by:

- national research integrity bodies
- institutional procedures and committees
- funder requirements
- public case publication and transparency
- boundary regimes such as biomedical ethics, animal research, data protection, IP, open science, and quality assurance

The output is a static web app plus a project overview page.

## Current State

Status as of 28 April 2026:

- 49 country records are represented in `data/countries.js`.
- 40 readable `Overview <Country>.docx` files are already represented in the app.
- 40 country records are explicitly labelled `Deep dossier drafted`.
- 35 country entries are represented in `data/transparency.js`.
- `data/source-registry.csv` currently holds 1370 entries.
- `North Macedonia`, `San Marino`, `Monaco`, `Malta`, `Liechtenstein`, `Georgia`, `Azerbaijan`, `Armenia`, `Andorra`, `Albania`, `Kosovo`, `Bosnia and Herzegovina`, `Iceland`, `Belarus`, `Bulgaria`, `Serbia`, `Cyprus`, `Luxembourg`, `Latvia`, `Ireland`, `Austria`, `Switzerland`, `Spain`, `Slovenia`, `Czechia`, `Belgium`, `Croatia`, `Hungary`, `Russia`, `Ukraine`, `Turkey`, `Estonia`, `Greece`, `Portugal`, `Poland`, `Montenegro`, `Moldova`, `Slovakia`, `Sweden`, the `United Kingdom`, `Germany`, and `France` all have recent committee-and-case-file, reconciliation, or first-dossier work; the current practical work is final sweeps, missing-overview drafting, and the committee-and-case-file pilot workflow, now tested on the Netherlands, Romania, Sweden, Denmark, Finland, Lithuania, Norway, Italy, the United Kingdom, Germany, France, Slovakia, Moldova, Montenegro, Poland, Portugal, Greece, Estonia, Turkey, Ukraine, Russia, Hungary, Croatia, Belgium, Czechia, Slovenia, Spain, Switzerland, Austria, Ireland, Latvia, Luxembourg, Cyprus, Serbia, Bulgaria, Belarus, Iceland, Bosnia and Herzegovina, Kosovo, and North Macedonia.

Current special cases:

- `Albania`, `Andorra`, `Armenia`, `Azerbaijan`, `Georgia`, `Liechtenstein`, `Malta`, `Monaco`, and `San Marino` have first expanded app dossiers but no overview documents yet.
- `United Kingdom` now has a synthesized `Overview United Kingdom.docx` and a reconciled app dossier; the remaining UK work is broader annual-statement, funder and devolved-boundary harvesting.
- `Vatican City` has a data folder but is not yet represented as an app country profile.

## Where Things Live

- `index.html`: main app page
- `project-overview.html`: project briefing and progress tracker
- `app.js`: rendering logic
- `styles.css`: styling
- `protocol/index.html`: protocol page
- `CASE-FILE-WORKFLOW.md`: dedicated instructions for the committee-and-case-file discovery pass
- `data/countries.js`: main app dataset
- `data/transparency.js`: extracted transparency layer
- `data/source-registry.csv`: registry of collected web/PDF sources
- `data/extraction-status.md`: overview extraction status
- `data/overview-extraction-log.csv`: overview extraction log
- `data/transparency-extraction-log.csv`: transparency extraction log

Each country has a folder in `data/<Country>/` with:

- `Overview <Country>.docx` when available
- `raw documentation/` subfolders for laws, procedures, codes, ethics bodies, monitoring, source notes, etc.

## What To Do Next

### Immediate next method pass

1. Committee-and-case-file discovery pass

Start with:

- `CASE-FILE-WORKFLOW.md`
- existing deep dossiers in `data/countries.js`
- current country source notes in `data/<Country>/raw documentation/source notes/`
- the country `transparency` blocks and `integrityCommittees` directories already in the app

This pass is meant to find the full handling network for each country, not only the headline national body, and then identify the strongest public case-file, decision, summary, archive or no-publication evidence for each route.

### Suggested next archive-heavy pilots for calibrating the method

No fixed next pilot is currently pinned after the North Macedonia sweep. Choose the next pass from final-sweep notes that still ask for committee coverage, decision visibility, institutional annual reports, or boundary-lane separation.

### Countries already signalling committee or case-publication gaps

- Slovakia
- Moldova
- Montenegro
- Poland
- Portugal
- France
- Germany
- Greece

### Missing overview drafting and representation gaps

- `Albania`, `Andorra`, `Armenia`, `Azerbaijan`, `Georgia`, `Liechtenstein`, `Malta`, `Monaco`, and `San Marino` need formal overview documents based on their first expanded app dossiers.
- `Vatican City` has a data folder but is not yet represented as an app country profile.

## Standard Workflow For One Country

### 1. Start with the local overview

Always begin with:

- `data/<Country>/Overview <Country>.docx`

Use it to identify:

- the likely national integrity model
- core actors
- candidate source types
- likely boundaries
- likely institutional examples

### 2. Check the local country folder

Inspect:

- `data/<Country>/raw documentation/`

Use any existing files or source notes before going online.

### 3. Expand with official online documentation

Prefer official sources in this order:

1. national legislation databases
2. ministries of education / research / science
3. national research integrity, ethics, or quality assurance bodies
4. national academies
5. funders
6. universities and public research institutes
7. biomedical ethics bodies
8. data protection authorities
9. IP authorities
10. animal research or clinical trial authorities

Use non-official sources only if absolutely necessary, and label the limitation clearly.

### 4. Map the country as a system

Do not just collect documents. Identify:

- where the network starts
- where the strongest national route sits
- what is handled institutionally
- what is only a boundary regime
- where public accountability exists
- where the evidence is missing or inaccessible

Important rule:

- Do not invent a single national misconduct board if the country actually has a distributed system.

### 5. Update `data/countries.js`

Every country entry must have the core overview fields:

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

For a full deep dossier, also add:

- `transparency`
- `dossierDetails`

### 6. Update the tracker

After finishing a country, update `project-overview.html`:

- change the country status row
- update the current focus callout
- move the current focus or next-country marker if it changed
- update any summary counts if they changed

### 7. Verify the app still works

At minimum run:

```powershell
node --check data/countries.js
node --check app.js
```

Do not add browser or visual-inspection work to the default checklist unless the user explicitly asks for it.

## Deep Dossier Structure

When a country is ready to move from overview to full dossier, the structure in `data/countries.js` should follow the current renderer.

### `transparency`

Use this for country-specific case-publication notes, especially when:

- the country is outside the scope of `data/transparency.js`
- the default transparency layer is too generic
- the country has an unusual publication model

Current fields:

- `tier`
- `mainBody`
- `coverage`
- `publicAccess`
- `hasArchive`
- `publicationModel`
- `format`
- `sourceDate`
- `keyNote`
- `resources`

Each `resources` item can include:

- `label`
- `url`
- `resourceClass`
- `scope`
- `caseLevelInfo`
- `comment`

### `dossierDetails`

Current top-level fields:

- `readingGuide`
- `networkExtent`
- `systemMap`
- `networkLayers`
- `integrityCommittees`
- `evidenceCategories`
- `boundaries`
- `timeline`
- `sourceLinks`

#### `systemMap`

Each item uses:

- `label`
- `startsAt`
- `travelsThrough`
- `endsAt`

#### `networkLayers`

Each layer uses:

- `title`
- `summary`
- `actors`

Each actor typically uses:

- `name`
- `category`
- `since`
- `scope`
- `role`
- `documents`
- `signals`

#### `integrityCommittees`

Use this as a route directory, not just a list of formal committees.

Fields:

- `summary`
- `methodology`
- `groups`

Each group uses:

- `title`
- `description`
- `committees`

Each committee route typically uses:

- `institution`
- `committee`
- `status`
- `scope`
- `since`
- `route`
- `links`
- `signals`

#### `evidenceCategories`

Each item uses:

- `label`
- `purpose`
- `examples`
- `startsAt`
- `endsAt`

#### `boundaries`

Each item uses:

- `label`
- `handledBy`
- `examples`
- `watchPoint`

#### `timeline`

Each item uses:

- `date`
- `title`
- `type`
- `actors`
- `importance`
- `source`
- `sourceUrl`

Use absolute dates where possible, for example `25 April 2025`, not relative wording.

#### `sourceLinks`

Use this as the public source backbone for the dossier.

Each item can include:

- `label`
- `type`
- `date`
- `path`
- `url`
- `note`

## What Counts As A Good Country Deep Dive

A good country deep dive does all of the following:

- clearly states whether the country has one national integrity body or a distributed system
- separates research integrity from adjacent regimes
- identifies the strongest national route
- shows how the institutional layer works
- includes funders where relevant
- includes biomedical ethics, animal research, data protection, IP, open science, or other boundaries when relevant
- includes a timeline of major legal and institutional developments
- includes a source backbone built mostly from official sources
- marks gaps honestly

## Boundary Rules

Keep these distinctions clear:

- research misconduct vs research ethics approval
- misconduct handling vs quality assurance
- funder monitoring vs misconduct adjudication
- academic integrity in teaching vs research integrity in research
- data protection vs research misconduct
- IP disputes vs authorship / integrity disputes
- anti-corruption, whistleblowing, and employment discipline vs research integrity

Do not collapse these into one system unless the source material clearly does so.

## Source Rules

### Preferred sources

- law portals
- ministry pages
- official committee pages
- official PDF regulations
- funder rules
- university regulations and committee pages
- academy pages
- national authority pages

### Avoid unless necessary

- news summaries
- consultancy pages
- blog posts
- student summaries
- secondary commentary without primary source links

### If sources are weak or inaccessible

State it directly in the country text.

Examples:

- no public case archive identified
- official source inaccessible in this pass
- committee mentioned in law but no current committee page found
- current composition still to verify

## Source Registry Practice

`data/source-registry.csv` is the structured source log.

Use it when adding or formalizing web sources. Follow the existing pattern:

- country code + source number, for example `AL-S001`
- `source_type`
- `raw_documentation_category`
- access date
- what the source was used for
- where it is stored locally

If you only update `data/countries.js` in a focused deep-dive pass, the source registry does not always need a full rebuild. But when new source collection becomes substantial, update the registry as well.

## Stage Labels

Use these labels consistently:

- `Initial source notes`
- `Data folder only`
- `Overview drafted`
- `Expanded overview dossier`
- `Deep dossier drafted`

Use `Deep dossier drafted` only when the country has:

- a real dossier structure
- a source backbone
- a system map
- network layers
- committee directory
- boundaries
- timeline

## After Finishing A Country

Complete this checklist:

1. Update the country entry in `data/countries.js`.
2. Update `project-overview.html`.
3. If relevant, update `data/source-registry.csv`.
4. If a new overview was created or extracted, update:
   - `data/extraction-status.md`
   - `data/overview-extraction-log.csv`
5. Run syntax checks.
6. Re-read the edited committee and transparency text for consistency.
7. Move the current focus or next-country marker if it changed.

## Current Priority Notes

- `Andorra` has been expanded from starter source notes into a first app dossier. Future Andorran work should draft `Overview Andorra.docx`, inspect AQUA register and appeal outputs, widen University of Andorra and private-HEI integrity checks, search AR+I for internal research-integrity, data, authorship or conflict-of-interest procedures, verify whether the Ministry of Health CEI publishes approval lists, minutes or statistics, and keep AQUA quality-assurance outputs, CEI biomedical ethics approvals, APDA data-protection decisions and OMPA/IP routes separate from general research-misconduct publication.
- `Albania` has been expanded from starter source notes into a first app dossier. Future Albanian work should draft `Overview Albania.docx`, inspect the linked University of Tirana regulation PDFs, widen institutional output checks beyond UT, UMT, UAMD and Elbasan, search NASRI/AKKSHI for annual reports or sanction and monitoring outputs, and keep ASCAL quality-assurance decisions, AKBPM clinical routes, IDP data-protection decisions and DPPI/IP routes separate from general research-misconduct publication.
- `Armenia` has been expanded from starter source notes into a first app dossier. Future Armenian work should draft `Overview Armenia.docx`, locate full ARLIS or HESC legal texts for scientific activity and degree-award rules, test whether HESC refusal, revocation or appeal orders can be separated from ordinary degree/title orders, locate any current National Centre for Infectious Diseases REC page, widen institutional misconduct, authorship and research-data checks beyond YSMU, AUA, IMB and YSU, locate a direct animal-experiment authority page or public permit register, and keep ANQA quality-assurance files, clinical-trial approvals, animal permits, PDPA data-protection decisions and AIPO/IP routes separate from general research-misconduct publication.
- `Azerbaijan` has been expanded from a data-folder-only record into a first app dossier. Future Azerbaijani work should draft `Overview Azerbaijan.docx`, index AAK news, dissertation, commission-decision and bulletin pages for refusal, deprivation, restoration, appeal and court-reversal cases, test whether AAK's selective plagiarism notices point to a fuller decision archive, widen university procedure checks beyond UNEC, ADA, Baku State University, Azerbaijan University and ASCCA, locate current biomedical REC/IRB approval-list routes, locate animal-research and data-protection authority outputs, and keep TKTA QA reports, clinical/medical ethics, COPAT/IP and open-science routes separate from general research-misconduct publication.
- `Georgia` has been expanded from a data-folder-only record into a first app dossier. Future Georgian work should draft `Overview Georgia.docx`, extract ETHICS project outputs for published national research-integrity policies, officer and board templates, MOOC or service material, index NCEQE decisions and register files for doctoral and research standards without treating QA as misconduct, widen Georgian-language institutional ethics and plagiarism checks beyond TSU, TSMU, Ilia, EEU and CIU, locate direct clinical-trial agency pages and biomedical approval lists, locate animal-research authority outputs, and keep NCEQE QA, PDPS/data, Sakpatenti/IP and biomedical routes separate from general misconduct publication.
- `Liechtenstein` has been expanded from a data-folder-only record into a first app dossier. Future Liechtenstein work should draft `Overview Liechtenstein.docx`, inspect the University of Liechtenstein Better Science Policy file for procedure, publication or retention rules, search University and UFL annual reports for ombudsperson, misconduct, plagiarism or disciplinary statistics, inspect UFL disciplinary and appeals regulations for publication and confidentiality duties, widen Liechtenstein Institute governance checks, and keep Zurich clinical-ethics approval, animal-experiment authorisation, Data Protection Authority annual reports and IP registers separate from general research-misconduct publication.
- `Malta` has been expanded from a data-folder-only record into a first app dossier. Future Maltese work should draft `Overview Malta.docx`, search University of Malta annual reports, Senate reports and UREC/FREC pages for public statistics, audit summaries or disciplinary-case references, search MCAST annual reports, Corporate Research Committee outputs and disciplinary board regulations for public ethics or misconduct statistics, check whether Xjenza Malta or predecessor MCST publishes funded-project default, termination, audit or sanction summaries, index MFHEA external quality assurance reports for research-governance, doctoral-supervision, plagiarism or academic-integrity references without treating QA as misconduct adjudication, and keep Health Ethics Committee, Medicines Authority, animal-welfare, IDPC, IP, open-access and research-data routes separate from general misconduct files.
- `Monaco` has been expanded from a data-folder-only record into a first app dossier. Future Monegasque work should draft `Overview Monaco.docx`, search CSM annual reports, minutes, statutes or internal regulations for research-integrity, authorship, conflicts, data, ethics or complaint wording, inspect IUM student, faculty, DBA and research handbooks for academic-integrity and research-misconduct procedure or publication rules, verify whether the Comite consultatif d'ethique en matiere de recherche biomedicale has a current public page, membership list, opinion list or annual statistics, search APDP/CCIN deliberations for biomedical research entries by sponsor, institution, study and outcome while keeping them as data-protection boundary files, check whether CSM, MonacoTech, the Monaco Innovation Fund or Horizon Europe co-funding pages publish audit, default, grant-termination or sanction outputs, and keep CSM scientific outputs, IUM academic conduct, biomedical ethics, APDP data protection, MCIPO/IP, innovation funding and animal/veterinary rules separate.
- `San Marino` has been expanded from a data-folder-only record into a first app dossier. Future San Marino work should draft `Overview San Marino.docx`, inspect UniRSM statute/regulation hubs, Senate/Council minutes and annual reports for ethics or misconduct outputs, test whether CERS publishes approval lists or statistics, index CSB documents and opinions by type, check USBM/EUREKA or innovation-funding sanction outputs, verify animal-experimentation enforcement or exception files, and keep UniRSM discipline, CSB/CERS biomedical ethics, Data Protection Authority, USBM/IP, innovation funding and animal-experimentation routes separate.
- `Slovakia` has now completed the committee-and-case-file pilot. Future Slovak work should monitor NKVIE publication practice for closed submissions, widen the institutional minutes/opinions sample beyond UPJS and STU, and deepen VEGA/KEGA plus clinical and animal boundary routes.
- `France` has completed the committee-and-case-file pilot. Future French work should expand the institutional annual-report directory, track Inadis output practice, revisit CNRS/MIS report retention and request rules, and keep boundary registers separate from general misconduct publication.
- `Germany` has completed the committee-and-case-file pilot. Future German work should expand the institutional annual-report directory beyond Freie Universitat Berlin and Gottingen, add more Land-level implementation examples, and deepen Fraunhofer and Max Planck institute-level routes.
- `United Kingdom` has completed both the committee-and-case-file pilot and overview reconciliation. Future UK work should expand the institutional annual-statement directory, funder-by-funder reporting matrix, devolved health/REC/AWERB map, and university research-ethics examples.
- `Moldova` has now completed the committee-and-case-file pilot. Future Moldovan work should classify ANACEC Governing Board publication coverage by route and year, look for public Ethics and Management Council outputs beyond aggregate reporting, widen institutional committee coverage beyond USM, UTM and USMF, and complete the animal-research route.
- `Montenegro` has now completed the committee-and-case-file pilot. Future Montenegrin work should index more archived national decisions, check whether `etickikomitet.edu.me` or a successor archive is live, widen institutional output checks beyond UCG, Mediterranean University and UDG, and deepen the animal-research plus copyright or IP boundary routes.
- `Poland` has now completed the committee-and-case-file pilot. Future Polish work should widen local publication checks beyond UW, WUT, JUMC, IIMCB and IP PAN, add more PAN-institute and Lukasiewicz-network routes, track later PAN annual reports and plenary notes, confirm the ministerial disciplinary publication pattern, and deepen local animal and clinical boundary routes.
- `Portugal` has now completed the committee-and-case-file pilot. Future Portuguese work should widen the institutional opinion and annual-report sample beyond U.Porto and Coimbra, expand polytechnic coverage, check whether FCT exposes any clearer public scientific-integrity or compliance route, and keep CEIC indicator pages and evaluation-status visibility separate from general misconduct publication.
- `Greece` has now completed the committee-and-case-file pilot. Future Greek work should widen official institutional activity-report checks beyond NKUA and the University of Macedonia, test whether annual-report clauses at NTUA, Harokopio, Thessaly, AUEB and other EHDE routes produce public files, watch EOF archive durability after the CTIS transition, and keep CTIS, ANILAB and HDPA boundary records separate from general misconduct publication.
- `Estonia` has now completed the committee-and-case-file pilot. Future Estonian work should monitor ETAG's first generalized misconduct outputs and institutional annual statistics, test ETIS public approval visibility after 2026 approvals start to accumulate, widen approval-list checks beyond UT and TAI, and keep EBIN/biobank, CTIS, AKI and animal-project records separate from general misconduct publication.
- `Turkey` has now completed the committee-and-case-file pilot. Future Turkish work should monitor YOK, UAK, TUBITAK and TUSEB for aggregate statistics, anonymized summaries or decision examples; widen university legal-office and local-board examples beyond Necmettin Erbakan, GIBTU, Ege, KTU and Saglik Bilimleri; test the spread of the 28 August 2025 YOK non-human and non-animal approval duty; and keep TITCK, HADMEK/HADYEK, KVKK, thesis and open-science routes separate from general misconduct publication.
- `Ukraine` has now completed the committee-and-case-file pilot. Future Ukrainian work should index the NAQA complaint/decision page by year, complaint stage and outcome; monitor post-2026 implementation of institutional public-decision duties under the Law On Academic Integrity; widen NASU, academy-institute and university micro-publication examples beyond NASU and KPI; and keep clinical-trial, animal-research, data-protection and IP boundary routes separate from general misconduct publication.
- `Russia` has now completed the committee-and-case-file pilot. Future Russian work should extract and classify VAK/GIS Nauka attestation orders by decision type and year, test page stability from multiple networks, widen autonomous-degree organization and university examples, monitor RAS ethics-council outputs, deepen the animal/preclinical boundary trail, and keep ANRI retractions, GRLS clinical-trial records and watchdog sources separate from official attestation publication.
- `Hungary` has now completed the committee-and-case-file pilot. Future Hungarian work should verify whether TeB definitive decisions are directly reachable through the Academy Gazette or another MTA publication route, index TUKEB annual permit pages, widen Corvinus-style institutional research-ethics approval checks, broaden HUN-REN institute output checks beyond CSFK and the Centre for Ecological Research, and keep NNGYK/CTIS, ETT, NEBIH and NAIH boundary records separate from general misconduct publication.
- `Croatia` has now completed the committee-and-case-file pilot. Future Croatian work should index the legacy Odbor report and opinion corpus by year and case type, monitor whether the National Council publishes finalized minimum ethical principles, widen institutional annual-report checks beyond Zagreb, Rijeka, Split and IRB, test whether HRZZ publishes Committee for Scientific Integrity outputs or remains procedure-only, and keep HALMED, animal-research, AZOP and IP records separate from general misconduct publication.
- `Belgium` has now completed the committee-and-case-file pilot. Future Belgian work should index VCWI annual reports through 2025 by theme and outcome, extract KU Leuven and UAntwerpen annual-report rows, test whether UGent, UHasselt, VUB, Flemish institutes or FWB universities publish comparable summaries, monitor CSIS website accessibility and output practice, and keep FAMHP/CTIS, biomedical ethics, animal research, data-protection, dual-use, IP and open-science routes separate from general misconduct publication.
- `Czechia` has now completed the committee-and-case-file pilot. Future Czech work should index the Charles University Ethics Commission statements and minutes archive by year, topic, privacy exclusion and outcome; search local-language pages for comparable university or CAS institute statement/minutes archives; test CAS Scientific Integrity Committee output practice; extract GA CR, TA CR and AZV enforcement wording; and keep research ethics review, clinical-trial, animal, data-protection and research-security routes separate from general misconduct publication.
- `Slovenia` has now completed the committee-and-case-file pilot. Future Slovenian work should monitor whether the National Council publishes its first anonymized opinions under the 3 July 2025 procedure, index any ARIS-referred or institution-referred initiatives by outcome, search additional university and institute pages for public opinions, minutes, annual reports or approval lists, verify the 2023-2026 versus 2023-2027 mandate label, and keep research-ethics approvals, medical ethics, animal-procedure approvals, data protection and IP boundaries separate from research-integrity findings.
- `Spain` has now completed the committee-and-case-file pilot. Future Spanish work should index CEEI reports, recommendations and admissibility outputs by route and topic; monitor whether CEEI publishes individual opinions after the RD 1045/2025 amendment; index CIR-CAT recommendations by topic, request source and outcome; widen autonomous-community and university/OPI output checks; strengthen AEI funder and call-level integrity evidence; and keep CEIm, biomedical, animal-project, data-protection and other ethics approvals separate from research-integrity case publication.
- `Switzerland` has now completed the committee-and-case-file pilot and the ETH Zurich correction. Future Swiss work should index SNSF annual reports and case news by year and outcome, extract ETH Zurich anonymized reports and procedure statistics from the table endpoints, track SCCSI's first public annual report after its 1 January 2026 launch, widen institutional output checks beyond ETH Zurich, EPFL, UZH, Basel, Bern, Geneva, Fribourg and USI, and keep RAPS/HumRes, Swissmedic and animal-experiment authorizations separate from research-misconduct case files.
- `Austria` has now completed the committee-and-case-file pilot. Future Austrian work should index OeAWI annual reports from 2011 through 2023 by inquiry number, allegation type, route, outcome and recommendation; test whether FWF annual reporting exposes separately extractable misconduct outcomes; search archived University of Vienna and Medical University of Innsbruck pages for anonymized case descriptions; widen Fachhochschule and private-university route checks through the 2024 ombuds directory; and keep student/thesis plagiarism, research ethics, animal testing and clinical-trial approvals separate from research-misconduct case files.
- `Ireland` has now completed the committee-and-case-file pilot. Future Irish work should index NRIF annual statistics from 2016 through 2023 by investigation count, upheld count and allegation category; watch for the 2024 statistics and SRII2025 results; test whether NCI's FOI/publication clause or MTU's RICO output channels ever produce actual case reports; widen public-RPO checks beyond Teagasc, Marine Institute, DIAS and NIBRT; and keep NREC, HPRA, HRCDC and QQI/NAIN boundary lanes separate from research-misconduct publication.
- `Latvia` has now completed the committee-and-case-file pilot. Future Latvian work should index UL Academic Ethics Commission decisions from 2019 through 2026 by date, topic, route and outcome; extract LAS/LCS ethics-code and academy-publication traces as historical context rather than a live archive; search current LAS/LCS committee outputs again; widen RSU, RTU, LBTU and other institutional output checks; and keep research-ethics opinion registers, CMEC, clinical trials, genome, animal, data, open-science and AI routes separate from misconduct findings.
- `Luxembourg` has now completed the committee-and-case-file pilot. Future Luxembourg work should monitor the LARI 2023/2024 annual report, index LARI annual reports by opened/closed/continued cases and request categories, treat the 2020 FNR statement as a rare case-level funder communication rather than an archive, verify any public LIH misconduct-management procedure and LIST Ethics Committee terms of reference, and keep CNER favourable-opinion lists plus ALVA animal-use reports separate from misconduct transparency.
- `Cyprus` has now completed the committee-and-case-file pilot. Future Cyprus work should index CNBC research-proposal decision/register PDFs from 2020 through 2023 by project and outcome, check whether 2024 or 2025 CNBC decision files have appeared, sample CYQAA rejected-programme and final-report tables for academic-integrity, doctoral-supervision or plagiarism material, search Greek institutional pages for public Senate or ethics decisions, and keep CNBC bioethics plus CYQAA quality-assurance outputs separate from general research-misconduct transparency.
- `Serbia` has now completed the committee-and-case-file pilot. Future Serbian work should monitor whether the Committee for Ethics in Science is publicly appointed and begins publishing warnings, title-revocation referrals, statistics or decisions; locate the standalone Science Fund Ethics Act if it remains public outside programme manuals; widen Belgrade, Novi Sad, Nis and Kragujevac local-output checks; and keep Science Fund ethics audits, biomedical ethics, animal approvals, data protection, open science and journal categorization separate from general misconduct publication.
- `Bulgaria` has now completed the committee-and-case-file pilot. Future Bulgarian work should test the MON Academic Ethics Committee page from a browser or non-blocked network, index any accessible national reports or decisions, extract UNWE and Institute of Mechanics BAS annual-report/report rows, widen institutional checks beyond Sofia, UNWE, SWU, Trakia, Ruse, Svishtov and medical universities, and keep scientific/medical ethics approvals, clinical trials, BPOS open-science deposit and accreditation/register routes separate from general misconduct publication.
- `Belarus` has now completed the committee-and-case-file pilot. Future Belarus work should test `vak.gov.by` from a browser or non-blocked network, check whether VAK publishes any Presidium, appeal, deprivation or restoration outputs beyond the author-abstract library, widen dissertation-council and anti-plagiarism checks across BSU, BNTU, BSEU, BSMU, regional universities and NASB institutes, locate a direct current laboratory-animal authority page, and keep RCETH clinical-trial registers plus journal publication-ethics pages separate from general misconduct publication.
- `Iceland` has now completed the committee-and-case-file pilot. Future Iceland work should locate any public Committee on Good Scientific Practice website, procedure rules, annual reports or opinions; test the Icelandic version of the National Bioethics Committee issued-licences list; widen university committee-output checks beyond UI, RU, UNAK, AUI and Bifrost; sample Landspitali, HH and other health-provider committee outputs; and keep bioethics licences, hospital approvals, Data Protection Authority, IMA and IRF funding routes separate from general misconduct publication.
- `Bosnia and Herzegovina` has now completed the committee-and-case-file pilot. Future Bosnia and Herzegovina work should index UNSA Faculty of Electrical Engineering opinion PDFs by year, topic and outcome; locate any standalone UNSA Ethics Council annual reports; widen public-opinion and approval-list checks across UNSA members, UNIBL, Tuzla, Mostar, Zenica, East Sarajevo, Bihac, Dzemal Bijedic and private universities; harvest HEA institution-documentation links systematically; test stable records in ALMBIH's dynamic clinical-trial register; and keep accreditation, clinical, animal, child-research, data-protection and journal-publication routes separate from general misconduct publication.
- `Kosovo` has now completed the committee-and-case-file pilot. Future Kosovo work should index KAA decision, monitoring and post-accreditation pages by institution and year; extract KAA 2025 annual-report Appeals Committee statistics; search SCQ minutes and KAA decision pages for public KAA Code of Ethics resolutions; track whether UP publishes annual Ethics Council summaries or underlying decisions; widen public and private HEI checks beyond UP, Mitrovica, Ferizaj and Rezonanca; and keep accreditation, data protection and research-ethics approvals separate from general misconduct publication.
- `North Macedonia` has now completed the committee-and-case-file pilot. Future North Macedonia work should verify whether the statutory scientific-research Ethics Board has current public appointments, recommendations or annual reports; index AQHE evaluation reports and accreditation decisions by institution, year and integrity-relevant fields; widen UKIM self-evaluation and ethics-commission evidence beyond Medicine and TMF; test SEEU ombudsperson, code and corruption-reporting outputs; and keep QA reports, student-discipline snippets, biomedical approvals, data-protection notices and plagiarism-system evidence separate from general research-misconduct case publication.

## Working Style

When continuing the project, prefer conservative additions:

- follow the existing data shape
- reuse established phrasing patterns from strong dossiers such as Netherlands, Denmark, Latvia, Luxembourg, and Moldova
- keep the writing analytic, not promotional
- use precise dates
- be explicit about what is verified and what still needs a final sweep

If in doubt, choose clarity over completeness and mark the gap for the next pass.
