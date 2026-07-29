# Netherlands comparison source inventory

Task: NL-BE comparison workflow Task 0B, Country A local source inventory.

Status date: 29 May 2026.

No live online refresh was attempted in this task. This inventory uses only local project evidence: `Overview Netherlands.docx`, the Netherlands source note, the recursive Netherlands app dossier links in `data/countries.js`, the Netherlands transparency resources in `data/transparency.js`, and Netherlands rows in `data/source-registry.csv`.

## Local Evidence Checked

- `data/Netherlands/Overview Netherlands.docx`: local Dutch-language source map and synthesis.
- `data/Netherlands/raw documentation/source notes/Netherlands deep-dive sources.md`: committee-and-case-file pass, 30 April 2026 quality-consolidation pass, and 29 May 2026 NL-BE comparison-readiness check.
- `data/Netherlands/raw documentation/`: category folders exist, but the only local file found in this pass was the source note.
- `data/countries.js`: Netherlands country record, transparency block, dossier details, timeline, route directory, boundaries and source links.
- `data/transparency.js`: Netherlands transparency record and resources.
- `data/source-registry.csv`: 25 Netherlands rows: `TR-NL-001` plus `NL-S001` through `NL-S024`.

Recursive app extraction found 90 unique local/app source locations and 154 raw source references for the Netherlands when `url`, `path` and `sourceUrl` fields are included. The source registry covers the curated backbone and newest 29 May 2026 comparison-readiness additions, but many institutional route examples are app-only and should be current-checked in Task 1A if used for comparison claims.

## Inventory Status Rules

- `Checked 2026-05-29`: already checked in the comparison-readiness pass. Still retest in Task 1A only if the source is central to a final comparison claim.
- `Checked 2026-04-30`: checked during the Dutch quality-consolidation pass. Retest in Task 1A for current version or moved URL.
- `Checked 2026-04-23`: checked during the committee-and-case-file pass. Retest in Task 1A if it remains important.
- `App-only`: source is present in `data/countries.js` but not formalized in the source registry. Retest before using as a final comparison source.
- `Duplicate`: same source appears in more than one local location. Keep one durable source-registry row after Task 1A.
- `Boundary only`: useful for separating adjacent regimes, not a general research-misconduct route.

## National Law Or Code

| Source | URL or path | Type and date | Local use | Current-check need |
| --- | --- | --- | --- | --- |
| Overview Netherlands.docx | `data/Netherlands/Overview Netherlands.docx` | Local overview, no registry row | Source map for the Dutch code-driven, institution-first model | No live check; synthesis only |
| KNAW research integrity theme | `https://www.knaw.nl/en/themes/research-integrity` | App-only national theme page | Historical and normative code background | Retest if used in comparison |
| Evaluation of the NGWI | `https://storage.knaw.nl/2024-10/Adviesrapport-Evaluatie-Nederlandse-gedragscode-wetenschappelijke-integriteit-2024.pdf` | App-only 2024 evaluation report | Revision pressure, AI/open science/social safety boundary warnings | Retest if used in code-baseline section |
| NWO-I Netherlands Code of Conduct page | `https://www.nwo-i.nl/en/nwo-i-themes/research-integrity/netherlands-code-of-conduct-for-research-integrity/` | `NL-S013`, checked 2026-04-30 | Confirms 2018 NGWI as active baseline in local dossier | Task 1A priority because final 2026 code may supersede it |
| NWO-I code consultation news | `https://www.nwo-i.nl/en/news/2025/09/28/denk-mee-over-wetenschappelijke-integriteit/` | `NL-S014`, checked 2026-04-30 | Documents draft update and expected 2026 entry into force | Task 1A priority for supersession check |
| NGWI 2018 enters into force | `https://www.nwo.nl/en/netherlands-code-conduct-research-integrity` | App timeline source | Direct code-launch/current-code source | Retest against NWO/NWO-I before final comparison |
| New NGWI launched | `https://www.vereniginghogescholen.nl/actueel/actualiteiten/nieuwe-gedragscode-wetenschappelijke-integriteit-voor-nederlandse-wetenschap` | App timeline source | VH-side code launch evidence | Retest only if used |
| Scientific integrity at UNL | `https://www.universiteitenvannederland.nl/onderwerpen/onderzoek/wetenschappelijke-integriteit` | App source link, not registry row | University-sector code/procedure explanation | Retest in Task 1A |
| Lectoraten and research culture | `https://www.vereniginghogescholen.nl/themas/lectoraten-en-onderzoekscultuur` | `NL-S024`, checked 2026-05-29 | HBO sector route, NGWI co-authorship, model documents | Lower-priority retest |
| NFU scientific integrity | `https://www.nfu.nl/themas/randvoorwaarden-wetenschappelijk-onderzoek/wetenschappelijke-integriteit` | App-only sector page | UMC/medical-sector code carrier evidence | Retest if used |

## National Integrity Body Or Advisory Route

| Source | URL or path | Type and date | Local use | Current-check need |
| --- | --- | --- | --- | --- |
| LOWI homepage | `https://lowi.nl/` | App source link | Body overview for LOWI's advisory role | Retest if used in final page |
| About LOWI and affiliated institutions | `https://lowi.nl/over-lowi/` | `NL-S001`, checked 2026-04-23 | LOWI history, governance, composition and affiliated institutions | Task 1A priority for current affiliation and composition |
| LOWI Regulations 2022 | `https://lowi.nl/wp-content/uploads/2022/02/LOWI-Regulations-2022.pdf` | `NL-S002`, checked 2026-04-23 | Competence, timing, admissibility, independence and publication rules | Task 1A priority |
| LOWI process information | `https://lowi.nl/en/proces-info/` | `NL-S016`, checked 2026-04-30 | Six-week petition timing and exclusions from LOWI scope | Task 1A priority |
| LOWI Annual Report 2022 | `https://lowi.nl/wp-content/uploads/2023/07/Annual-Report-LOWI-2022.pdf` | App-only older annual report | Network evidence and affiliated-institution range | Historical; retest only if needed |
| LOWI annual report 2024 | `https://lowi.nl/wp-content/uploads/2025/06/Jaarverslag-adviescommissie-LOWI-2024.pdf` | `NL-S003`, checked 2026-04-23 | Latest LOWI annual-report extraction target located in local passes | Task 1A priority for latest annual report |
| ENRIO Netherlands country report | `https://www.enrio.eu/country-reports/netherlands/` | `NL-S010`, checked 2026-04-30 | Secondary cross-check for LOWI second-line and institutional first-line model | Retest if source-current sweep uses ENRIO |
| ENRIO Netherlands members page | `https://www.enrio.eu/members/netherlands/` | `NL-S011`, checked 2026-04-30 | Confirms LOWI and NRIN membership distinction | Retest if membership claim is used |
| ENRIO Annual Report 2024 | `https://www.enrio.eu/wp-content/uploads/2025/04/ENRIO-ANNUAL-REPORT-2024.pdf` | `NL-S012`, checked 2026-04-30 | ENRIO member-list cross-check | Retest for newer annual report if relevant |

## Institutional Complaint Procedure

These sources show first-line institutional handling and route design. Several are app-only and should not carry final comparison claims until Task 1A retests them.

| Source | URL or path | Type and date | Local use | Current-check need |
| --- | --- | --- | --- | --- |
| UNL scientific integrity | `https://www.universiteitenvannederland.nl/onderwerpen/onderzoek/wetenschappelijke-integriteit` | App-only sector route | Explains CWI, confidential counsellor, board ruling and LOWI route | Task 1A priority |
| Leiden Academic Integrity Committee | `https://www.organisatiegids.universiteitleiden.nl/en/university-committees/academic-integrity-committee` | App-only committee page | Leiden CWI route, chambers and annual reports | Retest if used |
| Leiden research integrity | `https://www.universiteitleiden.nl/onderzoek/organisatie-van-ons-onderzoek/kwaliteit-en-integriteit/wetenschappelijke-integriteit` | App-only institutional page | Leiden policy and complaint route | Retest if used |
| UvA complaint route | `https://www.uva.nl/en/research/research-environment/academic-integrity/submitting-a-complaint-about-a-breach-of-academic-integrity/submitting-a-complaint-about-a-breach-of-academic-integrity.html` | App-only route page | UvA complaint route, committee and annual reports | Retest if used |
| UvA Academic Integrity Complaints Regulations | `https://www.uva.nl/binaries/content/assets/uva/en/about-the-uva/uva-profile/rules-and-regulations/research/klachtenregeling-wi-engels-2014-2.pdf` | App-only PDF | UvA complaints regulation | Check for newer regulation |
| VU scientific integrity | `https://vu.nl/nl/over-de-vu/meer-over/wetenschappelijke-integriteit` | App-only committee page | VU CWI, composition, complaint contact, reports and LOWI/UNL route | Retest if used |
| Amsterdam UMC research misconduct chapter | `https://www.amsterdamumc.org/en/research/research-code/chapters/research-misconduct/dealing-with-suspected-violations-of-research-integrity.htm` | App-only institutional route | Amsterdam UMC link to UvA/VU route | Retest if used |
| Utrecht University complaints regulation 2023 | `https://www.uu.nl/sites/default/files/Klachtenregeling-Wetenschappelijke-Integriteit-Universiteit-Utrecht.pdf` | App-only regulation | Utrecht CWI route and board decision model | Check for newer regulation |
| Utrecht University Annual Report 2024 | `https://www.uu.nl/sites/default/files/UU-Jaarverslag-2024-EN.pdf` | App-only annual report | Institutional accountability trace | Check for latest annual report if used |
| RUG scientific integrity | `https://www.rug.nl/about-ug/organization/rules-and-regulations/integrity/wetenschappelijke-integriteit/` | App-only institutional page | Groningen rules and integrity route | Retest if used |
| RUG regulations and conduct codes | `https://www.rug.nl/about-ug/organization/rules-and-regulations/general/gedragscodes-nederlandse-universiteiten/wetenschappelijke-integriteit` | App-only regulation hub | Groningen procedure/rules hub | Retest if used |
| EUR Committee Scientific Integrity | `https://www.eur.nl/en/about-university/organisation/legal-affairs/legal-procedures/committee-scientific-integrity` | App-only committee page | Erasmus CWI role and complaint route | Retest if used |
| EUR regulations and guidelines | `https://www.eur.nl/en/about-eur/policy-and-regulations/regulations-and-guidelines/general` | App-only regulation hub | Erasmus regulation collection | Retest if used |
| UT scientific integrity | `https://www.utwente.nl/en/service-portal/research-support/procedures-facilities/scientific-integrity` | App-only route page | Twente procedure and confidential advisers | Retest if used |
| UT complaints procedure 2024 | `https://www.utwente.nl/en/service-portal/services/hr/resources/integrity/en/scientific-integrity-downloads/complaints-procedure-scientific-integrity-ut-en-2024.pdf` | App-only 2024 regulation | Twente procedure and LOWI step | Check for newer regulation |
| WUR scientific integrity | `https://www.wur.nl/en/about-wur/integrity-and-social-safety/scientific-integrity.htm` | App-only committee page | WUR confidential counsellors, CWI contact and route | Retest if used |
| WUR Scientific Integrity Complaints Procedure | `https://www.wur.nl/upload_mm/e/3/c/bd73a0fa-522c-4b2f-968e-9586fe274214_20171220_Scientific-integrity_Complaints_Procedure_WUR_UK.pdf` | App-only older PDF | WUR committee composition and procedure | Check for newer procedure |
| Radboud research integrity | `https://www.ru.nl/en/about-us/policies-and-regulations/research-integrity` | App-only route page | Radboud policy and committee route | Retest if used |
| Radboud Academic Integrity Regulations | `https://www.ru.nl/en/regulations/academic-integrity-regulations` | App-only regulation | Radboud complaint handling | Retest if used |
| Tilburg Research Integrity Committee | `https://www.tilburguniversity.edu/about/conduct-and-integrity/scientific-integrity/committee` | App-only committee page | Tilburg committee and LOWI route | Retest if used |
| Tilburg complaints regulation | `https://www.tilburguniversity.edu/sites/default/files/download/EN-Klachtenregeling%20Wetenschappelijke%20Integriteit%20TiU_DEF%20011119.pdf` | App-only regulation | Tilburg procedure | Check for newer regulation |
| Maastricht University scientific integrity | `https://www.maastrichtuniversity.nl/research/integrity-ethics/scientific-integrity` | App-only committee page | Maastricht CWI, contact and reports | Retest if used |
| Maastricht regulations 2025 | `https://www.maastrichtuniversity.nl/file/um-klachtenregeling-cwi-2025-enpdf` | App-only 2025 regulation | Maastricht current regulation | Retest if used |
| Open Universiteit committee and confidential adviser | `https://www.ou.nl/-/commissie-en-vertrouwenspersoon-wetenschappelijke-integriteit` | App-only committee page | OU CWI and confidential adviser route | Retest if used |
| Open Universiteit complaints regulation 2023 | `https://www.ou.nl/documents/40554/188658/20230501_SVW_U2023_1578-1_Klachtenregeling_WI_Open_Universiteit.pdf` | App-only 2023 regulation | OU complaint procedure | Check for newer regulation |

## Public Case Archive, Report Or Publication Hub

| Source | URL or path | Type and date | Local use | Current-check need |
| --- | --- | --- | --- | --- |
| LOWI opinions archive | `https://lowi.nl/en/opinions/` | `TR-NL-001` and `NL-S017`, checked 2026-05-29 | National second-line opinions and inadmissibility decisions | Task 1A priority; duplicate registry rows should be reconciled later |
| LOWI annual report 2024 | `https://lowi.nl/wp-content/uploads/2025/06/Jaarverslag-adviescommissie-LOWI-2024.pdf` | `NL-S003`, checked 2026-04-23 | Annual volume, themes and boundary cases | Check for newer annual report |
| UNL complaint publications archive | `https://www.universiteitenvannederland.nl/publicaties-klachten-wetenschappelijke-integriteit` | `NL-S004`, checked 2026-04-23 | University-sector anonymized board decisions and CWI advice | Task 1A priority |
| UNL complaint publications 2026 | `https://www.universiteitenvannederland.nl/overzicht-publicaties-klachten-wetenschappelijke-integriteit-2026` | `NL-S015`, checked 2026-04-30 | Current-year university case page with two rows in local checks | Retest for added 2026 rows |
| VH complaint publications | `https://www.vereniginghogescholen.nl/kennisbank/praktijk-en-onderzoek/artikelen/publicatie-klachten-wetenschappelijke-integriteit-98b6e960-cca6-4044-a4a4-75b50c8fef82` | App-only older/generic case page | HBO case-publication route | Possible duplicate or older route page; retest |
| VH complaint publications 2025 | `https://www.vereniginghogescholen.nl/kennisbank/praktijk-en-onderzoek/artikelen/publicatie-klachten-wetenschappelijke-integriteit-2025` | `NL-S005`, checked 2026-04-23 | Latest hbo case page located in local passes | Task 1A retest for 2026 page |
| VH publication format PDF | `https://www.vereniginghogescholen.nl/system/knowledge_base/attachments/files/000/001/356/original/Format_publicatie_klachten_op_VH_website.pdf?1670590122=` | `NL-S006`, checked 2026-04-23 | Publication fields, six-week timing and ten-year retention | Retest for newer template |
| NWO annual report 2024 | `https://www.nwo.nl/sites/nwo/files/media-files/Jaarverslag%20NWO%20Meldpunt%20Wetenschappelijke%20Integriteit%202024.pdf` | `NL-S008`, checked 2026-04-23 | Funder desk annual trace | Task 1A check for 2025 report |
| UvA CWI annual report 2024 | `https://www.uva.nl/binaries/content/assets/uva/nl/onderzoek/wetenschappelijke-integriteit/jaarverslag-cwi-2024.pdf` | `NL-S019`, checked 2026-05-29 | Local first-line annual-report seed | Field-index target; check for 2025 report later |
| RIVM wind-turbine factsheet complaint trace | `https://www.rivm.nl/windenergie/windmolens-gezondheid/factsheet-gezondheidseffecten-van-windturbinegeluid` | `NL-S021`, checked 2026-05-29 | Non-UNL public-institute micro-publication | Representative trace, not full archive |
| LOWI advice 2022-03/04 | `https://lowi.nl/advies-2022-03-en-04/` | App-only case trace | TU Delft route and boundary evidence | Historical; retest if cited |
| UNL TU Delft case publication 2022 | `https://www.universiteitenvannederland.nl/files/publications/2022%20TUD%20Onzorgvuldig%20en%20verwijtbaar%20onzorgvuldig%20handelen%20wat%20betreft%20de%20selectie%20van%20data%20maar%20geen%20schending%20van%20de%20wetenschappelijke%20integriteit%20-%20ongegrond.pdf` | App-only case PDF | TU Delft case-publication example | Historical; retest if cited |
| UNL TU/e case publication 2020 | `https://www.universiteitenvannederland.nl/files/publications/2020%20%20TUe%20%20Plagiaat%2C%20niet%20corrigeren%20van%20fouten%20in%20eigen%20gepubliceerde%20artikel%2C%20overnemen%20van%20resultaten%20van%20collega-onderzoekers%20zonder%20toestemming%2C%20en%20mach.pdf` | App-only case PDF | TU/e case-publication example | URL should be retested if cited |
| UNL TU/e case publication 2018 | `https://www.universiteitenvannederland.nl/files/publications/2018%20TUE%20Openbaar%20maken%20resultaten%20-%20gedeeltelijk%20gegrond.pdf` | App-only case PDF | TU/e case-publication example | Historical; retest if cited |
| Stapel fraud investigations and final report | `https://www.tilburguniversity.edu/nl/over/gedrag-integriteit/commissie-levelt` | App-only timeline source | Historical major integrity event | Historical context; not a current route source |

## Funder Route

| Source | URL or path | Type and date | Local use | Current-check need |
| --- | --- | --- | --- | --- |
| NWO scientific integrity | `https://www.nwo.nl/en/scientific-integrity` | `NL-S007`, checked 2026-04-23 | NWO Scientific Integrity Desk and safety-net route | Task 1A priority |
| NWO annual report 2024 | `https://www.nwo.nl/sites/nwo/files/media-files/Jaarverslag%20NWO%20Meldpunt%20Wetenschappelijke%20Integriteit%202024.pdf` | `NL-S008`, checked 2026-04-23 | Annual reporting for NWO desk | Check for 2025 report |
| NWO-I complaints procedure scientific integrity | `https://www.nwo-i.nl/medewerkersnwoi/werk-en-gedrag/wetenschappelijke-integriteit/attachment/complaints-procedure-scientific-integrity-nwo-institutes-2/` | App-only institutional/funder-linked regulation | NWO institute complaint procedure | Retest if NWO-I route used |
| ZonMw laws and regulations | `https://www.zonmw.nl/en/laws-and-regulations-concerning-zonmw` | `NL-S009`, checked 2026-04-23 | Funder compliance and notification route | Retest against 2026 grant terms |
| ZonMw General Terms and Conditions Governing Grants 2026 | `https://www.zonmw.nl/sites/zonmw/files/2026-04/General-Terms-and-Conditions-Governing-Grants-of-ZonMw-2026_0.pdf` | `NL-S018`, checked 2026-05-29 | Current grant terms from 1 January 2026 | Current for pilot; retest only if final wording needed |
| ZonMw FAIR data and legal framework | `https://www.zonmw.nl/en/laws-and-regulations-data-management-and-fair-data` | App-only funder/boundary guidance | FAIR/data legal obligations linked to funded projects | Retest if used |
| ZonMw launch of NSRI | `https://www.zonmw.nl/nl/nieuws/grootste-studie-ooit-over-wetenschappelijke-integriteit-van-start` | App timeline and network source | Research-on-research and BVO programme evidence | Context only |
| NSRI PLOS ONE publication | `https://doi.org/10.1371/journal.pone.0263023` | App-only empirical study | Survey context on QRPs and misconduct | Non-official; use cautiously |

## University Examples

The university examples overlap with the institutional complaint procedure lane. They are grouped here for comparison-readiness: Leiden, UvA, VU/Amsterdam UMC, Utrecht, Groningen, Erasmus, Delft, Eindhoven, Twente, Wageningen, Radboud, Tilburg, Maastricht and Open Universiteit are represented in the app route directory. Most are app-only and need retesting before final NL-BE institutional implementation claims.

| Example cluster | Sources | Current-check need |
| --- | --- | --- |
| Leiden | Academic Integrity Committee; Leiden research integrity page | Retest if used |
| Amsterdam | UvA complaint page, UvA 2014 regulation, UvA 2024 annual report, VU scientific integrity page, Amsterdam UMC research misconduct chapter | UvA 2024 report checked 2026-05-29; other pages need retest |
| Utrecht | Utrecht 2023 complaints regulation, Utrecht Annual Report 2024 | Retest for latest regulation and annual report |
| Groningen | RUG scientific integrity, RUG regulations and conduct codes | Retest if used |
| Erasmus | EUR Committee Scientific Integrity, EUR regulations hub | Retest if used |
| Delft and Eindhoven | LOWI 2022-03/04, UNL TU Delft 2022, UNL TU/e 2018 and 2020 | Historical case examples; retest URLs if cited |
| Twente, Wageningen, Radboud, Tilburg, Maastricht, Open Universiteit | UT, WUR, RU, Tilburg, UM and OU route/regulation pages | Retest if used |

## Public Research Institute Examples

| Source | URL or path | Type and date | Local use | Current-check need |
| --- | --- | --- | --- | --- |
| KNAW complaints procedure | `https://www.knaw.nl/over-de-instituten/klachtenregeling-wetenschappelijke-integriteit` | App-only committee page | KNAW institute complaint route | Retest if used |
| KNAW complaints regulation 2024 | `https://storage.knaw.nl/2024-07/2024_Klachtenregeling_wetenschappelijke_integriteit_KNAW_def.pdf` | App-only 2024 regulation | Current KNAW institute regulation | Retest if used |
| RIVM scientific integrity and complaints procedure | `https://www.rivm.nl/over-het-rivm/wetenschappelijke-integriteit-en-klachtenregeling` | `NL-S020`, checked 2026-05-29 | Public-institute CWI/Director-General/LOWI route | Current for pilot; field-index later |
| RIVM wind-turbine factsheet complaint trace | `https://www.rivm.nl/windenergie/windmolens-gezondheid/factsheet-gezondheidseffecten-van-windturbinegeluid` | `NL-S021`, checked 2026-05-29 | Public complaint trace | Representative only |
| Sanquin research code | `https://www.sanquin.nl/en/research/about-research/research-code` | `NL-S022`, checked 2026-05-29 | Specialist health-research ombudsman route and LOWI affiliation | Current for pilot |
| Prinses Maxima scientific integrity | `https://research.prinsesmaximacentrum.nl/nl/onderzoek/wetenschappelijke-integriteit` | `NL-S023`, checked 2026-05-29 | Specialist-centre complaints committee and advisers | Current for pilot |
| CPB planning bureaus have a CWI | `https://www.cpb.nl/planbureaus-hebben-commissie-wetenschappelijke-integriteit` | App-only shared committee announcement | Planning-bureau CWI route | Retest if used |
| PBL quality assurance | `https://www.pbl.nl/over-het-pbl/kwaliteitsborging` | App-only quality/CWI page | Planning-bureau quality and CWI evidence | Retest if used |
| SCP shared CWI announcement | `https://www.scp.nl/actueel/nieuws/2021/04/01/planbureaus-hebben-commissie-wetenschappelijke-integriteit` | App-only shared committee announcement | Planning-bureau route | Retest if used |
| KiM independence and scientific integrity | `https://english.kimnet.nl/about-kim/independence-and-scientific-integrity` | App-only institutional route | Transport policy institute route | Retest if used |

## Universities Of Applied Sciences And Other Institutional Examples

| Source | URL or path | Type and date | Local use | Current-check need |
| --- | --- | --- | --- | --- |
| VH research culture | `https://www.vereniginghogescholen.nl/themas/lectoraten-en-onderzoekscultuur` | `NL-S024`, checked 2026-05-29 | HBO sector route and model context | Current for pilot |
| VH complaint publications 2025 | `https://www.vereniginghogescholen.nl/kennisbank/praktijk-en-onderzoek/artikelen/publicatie-klachten-wetenschappelijke-integriteit-2025` | `NL-S005`, checked 2026-04-23 | Latest hbo case page located | Retest for 2026 page |
| Zuyd complaints committee | `https://www.zuyd.nl/en/research/scientific-integrity/complaints-committee` | App-only committee page | Zuyd route and members | Retest if used |
| Zuyd Klachtencommissie WIO | `https://www.zuyd.nl/onderzoek/wetenschappelijke-integriteit/klachtencommissie-wio` | App-only Dutch committee page | Zuyd Dutch route and confidential adviser | Retest if used |
| Avans research integrity | `https://www.avans.nl/en/int/for-international-organisations/centres-of-applied-research/research-integrity` | App-only route page | Joint hbo committee and reporting emails | Retest if used |
| HAN scientific integrity | `https://www.han.nl/onderzoek/onderzoek-bij-de-han/wetenschappelijke-integriteit/` | App-only shared committee page | Shared hbo CWI | Retest if used |
| University of the Arts The Hague research integrity | `https://www.hogeschoolderkunsten.nl/en/rules-of-conduct/research-integrity` | App-only committee page | Arts university research-integrity route | Retest if used |
| University of Humanistic Studies scientific integrity | `https://www.uvh.nl/en/research/about-our-research/scientific-integrity/` | App-only institutional route | Shared NLU CWI route | Retest if used |
| Theological University Apeldoorn scientific integrity | `https://www.tua.nl/nl/onderzoek/wetenschappelijke-integriteit` | App-only institutional route | Shared NLU CWI route | Retest if used |
| Theological University Utrecht scientific integrity | `https://tuu.nl/en/research/scientific-integrity/` | App-only institutional route | Shared NLU CWI route | Retest if used |
| NLU shared committee regulation | `https://www.tua.nl/assets/admin/plugins/kcfinder/upload/files/ZqinmsyKK_23-04-23_Regeling_Commissie_Wetenschappelijke_Integriteit_NLU_-_vastgesteld.pdf` | App-only shared committee regulation | NLU shared route | Retest if used |

## Biomedical Or Clinical Route

| Source | URL or path | Type and date | Local use | Current-check need |
| --- | --- | --- | --- | --- |
| About CCMO | `https://english.ccmo.nl/about-ccmo` | App source link and timeline source | WMO/CCMO statutory boundary route | Boundary only; retest if used |
| CCMO overview of accredited MRECs | `https://english.ccmo.nl/mrecs/accredited-mrecs` | App-only boundary source | Accredited MREC list and medical-review boundary | Boundary only; retest because overview noted MREC-count mismatch |

## Animal Research Route

| Source | URL or path | Type and date | Local use | Current-check need |
| --- | --- | --- | --- | --- |
| CCD homepage | `https://www.centralecommissiedierproeven.nl/` | App-only boundary source | Central animal-experiment project licence authority | Boundary only; retest if used |
| Government rules on animal testing | `https://www.rijksoverheid.nl/onderwerpen/dierproeven/regels-dierproeven` | App-only legal boundary page | Animal-testing rules, DEC advice, IvD and 3Rs | Boundary only; retest if used |

## Data-Protection Route

No dedicated Dutch data-protection authority source is currently formalized in the Netherlands app source backbone or source registry. Data protection appears as a boundary in the overview and source notes, and through funder/data-management materials such as ZonMw FAIR data. Task 1A should locate or confirm the official Dutch DPA/AP route only if data protection becomes part of the comparison table.

## IP Route

No dedicated IP authority or commercialization source is currently formalized in the Netherlands app source backbone or source registry. IP appears as a boundary pressure point in the overview, LOWI materials and source notes. Task 1A should add an official IP/commercialization source only if the final NL-BE comparison uses that boundary lane.

## Quality-Assurance Route

| Source | URL or path | Type and date | Local use | Current-check need |
| --- | --- | --- | --- | --- |
| PBL quality assurance | `https://www.pbl.nl/over-het-pbl/kwaliteitsborging` | App-only quality/CWI page | Public research institute quality assurance and CWI route | Retest if used |
| Evaluation of the NGWI | `https://storage.knaw.nl/2024-10/Adviesrapport-Evaluatie-Nederlandse-gedragscode-wetenschappelijke-integriteit-2024.pdf` | App-only 2024 evaluation report | Code quality and revision evidence | Retest if used |
| Overview Netherlands.docx quality section | `data/Netherlands/Overview Netherlands.docx` | Local synthesis | SEP, BKO, UMCNL quality standards and BROK noted but not separately formalized | Add official sources only if comparison needs QA detail |

## Research-Security, Dual-Use, AI Or Open-Science Route

| Source | URL or path | Type and date | Local use | Current-check need |
| --- | --- | --- | --- | --- |
| National Knowledge Security Guidelines | `https://english.loketkennisveiligheid.nl/documents/2022/04/07/national-knowledge-security-guidelines` | App-only guideline | Knowledge-security boundary around research practice | Boundary only; retest if used |
| RVO National Contact Point for Knowledge Security | `https://english.rvo.nl/topics/national-contact-point-knowledge-security` | App source link | Government contact point and institution duties | Boundary only; retest if used |
| KNAW Social Safety in Dutch Academia | `https://www.knaw.nl/en/publications/social-safety-dutch-academia-paper-practice` | App-only advisory report | Social-safety boundary and overlap warning | Boundary only; retest if used |
| Launch of SafeScience | `https://www.nwo-i.nl/en/news/2022/11/07/launch-of-national-platform-for-threatened-academics/` | App timeline source | Platform for threatened academics | Boundary/context only |
| ZonMw FAIR data and legal framework | `https://www.zonmw.nl/en/laws-and-regulations-data-management-and-fair-data` | App-only funder/data source | FAIR data and legal framework | Boundary/funder lane; retest if used |
| Evaluation of the NGWI | `https://storage.knaw.nl/2024-10/Adviesrapport-Evaluatie-Nederlandse-gedragscode-wetenschappelijke-integriteit-2024.pdf` | App-only 2024 report | Generative AI, open science, data protection and social safety as update pressure points | Retest for final code relationship |

## Unclear Or Duplicate Source

| Source | Local issue | Action for Task 1A |
| --- | --- | --- |
| LOWI opinions archive | Appears as `TR-NL-001` and `NL-S017`, plus app and transparency resources | Keep latest current-source row or explain duplicate purpose |
| VH complaint publications generic page and 2025 page | Two different VH case-publication URLs appear; 2025 page is latest located in local passes | Retest whether generic URL remains useful or is superseded |
| NWO-I code page plus NWO code page plus VH launch page | All support the NGWI baseline but may not point to the same current code version | Verify final 2026 code status before comparison |
| UNL TU/e 2020 PDF URL | Long file URL may be brittle | Retest only if cited as example |
| Overview Netherlands.docx source hints | Overview text preserves domain-level citations such as `storage.knaw.nl` and `lowi.nl`, not always direct URLs | Use as synthesis, not as final source link |
| Data protection and IP lanes | Mentioned as boundaries but no dedicated AP/IP source is in app source backbone or registry | Add official sources only if used in final comparison |

## Task 0B Findings

- The Dutch local source base is already comparison-useful, but it is unevenly formalized: source-registry rows cover the curated national, sector, funder and 29 May 2026 route seeds, while many institutional examples exist only inside `data/countries.js`.
- The main Dutch comparison risk remains over-coding the system as `LOWI only`. The local source set supports a layered reading: NGWI code baseline, institutional first-line handling, LOWI second-line advice, UNL/VH sector publication hubs, NWO/ZonMw funder lanes, and boundary routes.
- The strongest current-source watchpoint is the national code baseline: local checks still treat NGWI 2018 as active while a final 2026 update was expected.
- The strongest public-output extraction targets remain LOWI 2025-2026 opinions, UNL 2025-2026 rows, VH 2022/2025 hbo files, NWO desk annual reports and the UvA/RIVM local route seeds.
- No update to the static comparison page is justified by Task 0B alone, because this task only inventories local evidence and performs no live source-current verification or new comparison synthesis.

## Next Strict Task

Task 0C: build the Belgium local source inventory from every local document, source note, app source link, transparency resource and source-registry row.
