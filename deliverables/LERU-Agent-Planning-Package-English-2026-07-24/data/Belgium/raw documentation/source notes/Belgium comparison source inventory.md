# Belgium comparison source inventory

Task: NL-BE comparison workflow Task 0C, Country B local source inventory.

Status date: 29 May 2026.

No live online refresh was attempted in this task. This inventory uses only local project evidence: `Overview Belgium.docx`, the Belgium source note, the recursive Belgium app dossier links in `data/countries.js`, the Belgium transparency resources in `data/transparency.js`, and Belgium rows in `data/source-registry.csv`.

## Local Evidence Checked

- `data/Belgium/Overview Belgium.docx`: local Dutch-language synthesis of Belgium as a federal container with Belgium-wide, federal, Flemish and Federation Wallonie-Bruxelles lanes.
- `data/Belgium/raw documentation/source notes/Belgium deep-dive sources.md`: committee-and-case-file pass, 30 April 2026 quality-consolidation pass, and 29 May 2026 NL-BE comparison-readiness check.
- `data/Belgium/raw documentation/`: category folders exist, but the only local file found in this pass was the source note.
- `data/countries.js`: Belgium country record, transparency block, dossier details, timeline, route directory, boundaries and source links.
- `data/transparency.js`: Belgium transparency record and resources.
- `data/source-registry.csv`: 30 Belgium rows: `TR-BE-001`, `TR-BE-002`, and `BE-S001` through `BE-S028`.

Recursive app extraction found 59 unique local/app source locations and 155 raw source references for Belgium when `url`, `path` and `sourceUrl` fields are included. The source registry covers the durable national, community, funder, ENRIO and 29 May 2026 comparison-readiness sources. Several institutional and boundary examples are app-only and should be current-checked before they support final comparison claims.

## Inventory Status Rules

- `Checked 2026-05-29`: already checked in the comparison-readiness pass. Retest in Task 2A only if the source is central to a final comparison claim.
- `Checked 2026-04-30`: checked during the Belgian quality-consolidation pass. Retest in Task 2A for current version or moved URL.
- `Checked 2026-04-24`: checked during the committee-and-case-file pass. Retest in Task 2A if it remains important.
- `Checked 2026-04-17`: checked only for the first transparency extraction. Treat as older or possibly duplicate unless confirmed.
- `App-only`: source is present in `data/countries.js` but not formalized in the source registry. Retest before using as a final comparison source.
- `Boundary only`: useful for separating adjacent regimes, not a general research-misconduct route.

## National Law Or Code

| Source | URL or path | Type and date | Local use | Current-check need |
| --- | --- | --- | --- | --- |
| Overview Belgium.docx | `data/Belgium/Overview Belgium.docx` | Local overview, no registry row | Source map for Belgium-wide, federal, Flemish and FWB lanes | No live check; synthesis only |
| Code of Ethics for Scientific Research in Belgium | `https://www.belspo.be/belspo/organisation/publ/pub_ostc/Eth_code/ethcode_en.pdf` | `BE-S017`, checked 2026-04-30 | Belgium-wide ethical baseline from academies/BELSPO; not a complaint-board source | Retest in Task 2A only for current hosting/version |
| CSIS regulation | `https://www.frs-fnrs.be/docs/CSIS-REGLEMENT.pdf` | `BE-S011`, checked 2026-04-24 | FWB second-line rule source; uses ALLEA plus Belgian and FNRS codes | Task 2A priority for CSIS route |
| FWO research integrity | `https://www.fwo.be/en/about-fwo/research-policy/research-integrity/` | `BE-S013` and `BE-S028`, checked 2026-05-29 | FWO integrity duties, Belgian code and European code use, host-institution handling | Task 2A priority for Flemish funder lane |
| FWO integrity clause | `https://www.fwo.be/nl/ondersteuningsprogramma-s/clausule-wetenschappelijke-integriteit/` | App-only funder clause | Dutch-language FWO integrity clause | Retest if used; possible overlap with `BE-S020` |
| FWO clause on scientific integrity | `https://www.fwo.be/en/support-programmes/clause-on-scientific-integrity/` | `BE-S020`, checked 2026-04-30 | Funder clause requiring compliance with Belgian and European codes | Retest if used in final funder comparison |
| BELSPO P4Science call 2024-2025 information file | `https://www.belspo.be/belspo/P4Science-S4Policy/call/P4Science_2025/P4S_call2024-25-Info-File_v2.pdf` | `BE-S018`, checked 2026-04-30 | Federal programme call and ethics-form/code obligations | Retest only if current federal-call claim is used |

## National Integrity Body Or Advisory Route

Belgium has no single national research-misconduct board in the local evidence. The integrity route has community-specific second-line bodies.

| Source | URL or path | Type and date | Local use | Current-check need |
| --- | --- | --- | --- | --- |
| VCWI main page | `https://vcwi.be/nl/vlaamse-commissie-voor-wetenschappelijke-integriteit` | App source link | Flemish second-line body identity and role | Retest in Task 2A if used |
| VCWI official page | `https://kvab.be/en/vcwi` | `TR-BE-001`, checked 2026-04-17 | Older transparency extraction source for VCWI | Likely duplicate or older route; reconcile with `vcwi.be` sources |
| VCWI second advice page | `https://www.vcwi.be/nl/tweede-advies` | `BE-S004`, checked 2026-04-24 | Flemish second advice after completed local CWI route, 30-day window | Task 2A priority |
| VCWI connected institutions | `https://www.vcwi.be/nl/aangesloten-instellingen` | `BE-S005`, checked 2026-04-24 | Main Flemish directory for connected institutions and local routes | Task 2A priority |
| FNRS CSIS page | `https://www.frs-fnrs.be/en/high-council-scientific-integrity-csis` | `BE-S010` and `BE-S026`, checked 2026-05-29 | Official FWB CSIS page, route and membership; no case archive located | Task 2A priority |
| CSIS regulation | `https://www.frs-fnrs.be/docs/CSIS-REGLEMENT.pdf` | `BE-S011`, checked 2026-04-24 | FWB second-line procedure, institutional commitments and confidentiality | Task 2A priority |
| PINDARE FWB CIS directory | `https://pindare.cref.be/fr/integrite-scientifique/les-comites-dintegrite-scientifique-en-federation-wallonie-bruxelles/` | `BE-S012`, checked 2026-04-24 | FWB local committee directory plus CSIS second-advice route | Task 2A priority; directory, not case-output archive |
| ENRIO Belgium/Flanders country report | `https://www.enrio.eu/country-reports/belgium-flanders/` | `BE-S014`, checked 2026-04-30 | Secondary source confirming VCWI/Flanders model | Retest if ENRIO cross-check used |
| ENRIO Belgium members page | `https://www.enrio.eu/members/belgium/` | `BE-S015`, checked 2026-04-30 | Lists VCWI and CSIS as Belgian ENRIO members | Retest if membership claim used |
| ENRIO Annual Report 2024 | `https://www.enrio.eu/wp-content/uploads/2025/04/ENRIO-ANNUAL-REPORT-2024.pdf` | `BE-S016`, checked 2026-04-30 | Confirms CSIS and VCWI in ENRIO member list | Retest for newer annual report if needed |

## Institutional Complaint Procedure

| Source | URL or path | Type and date | Local use | Current-check need |
| --- | --- | --- | --- | --- |
| KU Leuven research integrity | `https://research.kuleuven.be/en/integrity-ethics/integrity` | App-only route page | KU Leuven first-line CWI route, reporting desk and advisers | Retest if used |
| KU Leuven CRI regulation/procedures | `https://research.kuleuven.be/en/integrity-ethics/integrity/procedures` | App-only procedure page | CRI procedure and regulation; local note says Dutch regulation approved 24 September 2024 | Task 2A priority for KU Leuven |
| KU Leuven Research Integrity Reporting Desk | `https://research.kuleuven.be/en/integrity-ethics/integrity/desk` | App-only reporting route | First-line reporting desk | Retest if used |
| UAntwerpen CWI page | `https://www.uantwerpen.be/en/research/policy/ethics-integrity/ethics-committees-scientific-integrity/committee-scientific-integrity/` | `BE-S008` and `BE-S025`, checked 2026-05-29 | CWI procedure, composition, guidance and annual reports | Task 2A priority |
| Ghent University research integrity | `https://www.ugent.be/plone_portal/en/research/research-integrity` | App-only institutional route | UGent CWI route, VCWI reference and research-integrity support | Retest if used |
| UGent Framework for Good Research Practice | `https://www.ugent.be/en/research/framework` | App-only good-practice framework | Institutional good-practice and research support context | Retest if used |
| UHasselt Commission on Scientific Integrity | `https://www.uhasselt.be/en/research/responsible-research-and-innovation/commission-on-scientific-integrity` | App-only route page | UHasselt CWI route | Retest if used |
| UHasselt procedure regulation | `https://www.uhasselt.be/media/itqguqyp/2023-cwi-reglement.pdf` | App-only 2023 regulation | UHasselt CWI regulation | Check for newer regulation |
| VUB ethics and integrity | `https://www.vub.be/en/our-research/our-vision-and-mission/optimal-research-environment/ethics-and-integrity` | App-only route page | VUB CWI and ethics/integrity route | Retest if used |
| VUB CWI regulations | `https://www.vub.be/sites/default/files/2022-09/20221503CWI%20Regulations%20EN.pdf` | App-only regulation | VUB CWI procedure | Check for newer regulation |
| ULiege ethics and scientific integrity | `https://www.recherche.uliege.be/ceis` | App-only FWB CEIS route | ULiege ethics and scientific-integrity route | Retest if used |
| UCLouvain deontology and ethics | `https://www.uclouvain.be/fr/recherche/deontologie-et-ethique` | App-only FWB route | UCLouvain deontology/ethics/integrity route | Retest if used |
| UCLouvain Commission de deontologie de la recherche | `https://www.uclouvain.be/fr/recherche/commission` | App-only committee page | UCLouvain committee route | Retest if used |
| ULB ethics and integrity | `https://www.ulb.be/en/research/ethics-and-integrity` | App-only FWB institutional route | ULB ethics and integrity route | Retest if used |
| UNamur Conseil a l'Integrite Scientifique | `https://www.unamur.be/fr/recherche/ethique/conseil-integrite-scientifique` | App-only FWB council route | UNamur Scientific Integrity Council | Retest if used |
| UNamur ethics and scientific integrity | `https://www.unamur.be/fr/recherche/organisation/ethique` | App-only boundary/institutional page | UNamur ethics and integrity context | Retest if used |
| UMONS ethics and scientific integrity | `https://web.umons.ac.be/fr/recherche/ethique-et-integrite-scientifique/` | App-only FWB CEIS route | UMONS ethics and scientific-integrity route | Retest if used |
| UMONS CEIS regulation annex | `https://web.umons.ac.be/app/uploads/2025/04/CA145-Point-16-Annexe-22-adaptee-CEIS.pdf` | App-only 2025 regulation annex | UMONS CEIS rules | Retest if used |

## Public Case Archive, Report Or Publication Hub

| Source | URL or path | Type and date | Local use | Current-check need |
| --- | --- | --- | --- | --- |
| VCWI annual reports | `https://www.vcwi.be/jaarverslagen` | `BE-S001` and `BE-S023`, checked 2026-05-29 | Strongest cross-institutional Belgian public-output corridor; annual reports 2013-2025 | Task 2A priority |
| VCWI Yearbook 2024 | `https://kvab.be/sites/default/files/Jaarboek%202024.pdf` | `TR-BE-002`, checked 2026-04-17 | Older transparency extraction source | Reconcile with current VCWI 2024 report |
| VCWI annual report 2025 | `https://www.vcwi.be/sites/default/files/VCWI_jaarverslag2025.pdf` | `BE-S002`, checked 2026-04-24 | Current representative VCWI report with seven second-advice requests and five reports | Task 2A field-index target |
| VCWI annual report 2024 | `https://www.vcwi.be/sites/default/files/VCWI_jaarverslag2024.pdf` | `BE-S003`, checked 2026-04-24 | Representative VCWI report and transparency recommendation | Field-index target |
| KU Leuven annual reports | `https://research.kuleuven.be/en/integrity-ethics/integrity/annual-report` | `BE-S006` and `BE-S024`, checked 2026-05-29 | Institutional annual-report corridor, 2017-2024 in local checks | Task 2A priority |
| KU Leuven annual report 2024 | `https://research.kuleuven.be/en/integrity-ethics/integrity/annual-report/jaarverslag_2024` | `BE-S007`, checked 2026-04-24 | Representative CWI report with notifications, admissibility and summaries | Field-index target |
| UAntwerpen CWI page and annual reports | `https://www.uantwerpen.be/en/research/policy/ethics-integrity/ethics-committees-scientific-integrity/committee-scientific-integrity/` | `BE-S008` and `BE-S025`, checked 2026-05-29 | Institutional annual-report archive and procedure page | Task 2A priority |
| UAntwerpen CWI annual report 2025 | `https://medialibrary.uantwerpen.be/files/56390/ec52e7fc-a2ad-4263-8fb6-a5a1ccb5c6e4.pdf` | `BE-S009`, checked 2026-04-24 | Structured case rows, FFP/OUP categories, outcomes and narrative summaries | Field-index target |
| CSIS regulation | `https://www.frs-fnrs.be/docs/CSIS-REGLEMENT.pdf` | `BE-S011`, checked 2026-04-24 | Procedure and negative-publication evidence for FWB lane | Not a case archive; retest for any output source in Task 2A |
| PINDARE FWB CIS directory | `https://pindare.cref.be/fr/integrite-scientifique/les-comites-dintegrite-scientifique-en-federation-wallonie-bruxelles/` | `BE-S012`, checked 2026-04-24 | Handler-directory visibility for FWB institutions | Not case-output visibility |

## Funder Route

| Source | URL or path | Type and date | Local use | Current-check need |
| --- | --- | --- | --- | --- |
| FWO research integrity | `https://www.fwo.be/en/about-fwo/research-policy/research-integrity/` | `BE-S013` and `BE-S028`, checked 2026-05-29 | FWO as funder, integrity clause actor and VCWI infrastructure actor; host institution handles complaints | Task 2A priority |
| FWO clause on scientific integrity | `https://www.fwo.be/en/support-programmes/clause-on-scientific-integrity/` | `BE-S020`, checked 2026-04-30 | Lifecycle integrity clause for FWO-supported researchers and institutions | Retest if used |
| FWO research ethics | `https://www.fwo.be/en/about-fwo/research-policy/research-ethics/` | `BE-S021`, checked 2026-04-30 | Ethics checklist, approval and audit duties | Boundary/funder route; retest if used |
| Guidelines on FWO's ethics checklist | `https://www.fwo.be/media/t3dix3qj/guidelines-on-fwo-s-ethics-checklist.pdf` | App-only manual | Ethics-checklist operational guidance | Retest if used |
| FNRS CSIS page | `https://www.frs-fnrs.be/en/high-council-scientific-integrity-csis` | `BE-S010` and `BE-S026`, checked 2026-05-29 | FNRS role in CSIS creation and hosting | Current for pilot; retest in Task 2A |
| FNRS scientific policy | `https://www.frs-fnrs.be/en/our-commitments/scientific-policy` | `BE-S022` and `BE-S027`, checked 2026-05-29 | Funder policy linking integrity, CSIS, open science, DMPs, ethics/transparency and animal experimentation | Retest; app also contains alternate URL |
| FNRS scientific policy alternate URL | `https://www.frs-fnrs.be/en/politique-scientifique` | App-only source link | Same funder-policy lane as `BE-S022` | Resolve URL mismatch in Task 2A |
| FNRS regulations and guides | `https://www.frs-fnrs.be/index.php/appels-reglements` | App-only funder document hub | FNRS regulations and guides | Retest if used |
| BELSPO P4Science 2024-2025 call page | `https://www.belspo.be/belspo/P4Science-S4Policy/P4Science_call_2025_en.stm` | App-only federal programme page | Call route for federal research funding | Retest if used |
| BELSPO P4Science 2024-2025 information file | `https://www.belspo.be/belspo/P4Science-S4Policy/call/P4Science_2025/P4S_call2024-25-Info-File_v2.pdf` | `BE-S018`, checked 2026-04-30 | Federal call ethics/code obligations | Retest if used |

## University Examples

Belgium's university examples must remain lane-specific.

| Example cluster | Sources | Current-check need |
| --- | --- | --- |
| Flemish strong public-output examples | KU Leuven annual-report hub and 2024 report; UAntwerpen CWI page and 2025 report | Task 2A priority and later field indexing |
| Flemish route-visible examples | UGent research integrity/framework; UHasselt CWI/regulation; VUB ethics and CWI regulation | Retest before final institutional comparison claims |
| FWB route-visible examples | ULiege CEIS; UCLouvain deontology and commission; ULB ethics/integrity; UNamur council and ethics page; UMONS CEIS and 2025 annex | Retest especially for any public annual report, opinion or recommendation output |
| Interuniversity resource routes | Mind the GAP, VLIR launch pages, PINDARE integrity theme/resources/CIS directory | Retest if used; resource route, not case-output archive |

## Public Research Institute Examples

| Source | URL or path | Type and date | Local use | Current-check need |
| --- | --- | --- | --- | --- |
| VCWI connected institutions | `https://www.vcwi.be/nl/aangesloten-instellingen` | `BE-S005`, checked 2026-04-24 | Directory for Flemish universities, funder and institute routes, including later additions | Task 2A priority |
| FWO research integrity | `https://www.fwo.be/en/about-fwo/research-policy/research-integrity/` | `BE-S013` and `BE-S028`, checked 2026-05-29 | Funder and connected-institution lane | Task 2A priority |
| App/source-note institute targets | imec, VIB, VITO, Waterbouwkundig Laboratorium, HOGENT and AP Hogeschool are named as retest targets in source notes | No dedicated source rows in local inventory beyond VCWI directory | Task 2A should decide which official pages to add |

## Biomedical Or Clinical Route

| Source | URL or path | Type and date | Local use | Current-check need |
| --- | --- | --- | --- | --- |
| FAMHP role in clinical trials | `https://www.famhp.be/en/the_role_of_the_famhp` | App-only boundary source | Federal clinical-trials authority boundary | Boundary only; retest if used |
| Federal bioethics committee creation | `https://www.health.belgium.be/en/creation-du-comite` | App-only boundary source | Bioethics advisory-body context | Boundary only; retest if used |
| FWO research ethics | `https://www.fwo.be/en/about-fwo/research-policy/research-ethics/` | `BE-S021`, checked 2026-04-30 | Funder ethics checklist and approvals | Boundary/funder lane, not general misconduct |

## Animal Research Route

| Source | URL or path | Type and date | Local use | Current-check need |
| --- | --- | --- | --- | --- |
| Flemish animal-experimentation route | `https://www.vlaanderen.be/werken-met-proefdieren` | App-only boundary source | Flemish animal-research guidance | Boundary only; retest if used |
| Walloon animal-experimentation route | `https://bienetreanimal.wallonie.be/home/animaux/animaux-dexperience.html` | App-only boundary source | Walloon animal-research guidance | Boundary only; retest if used |
| FNRS scientific policy | `https://www.frs-fnrs.be/en/our-commitments/scientific-policy` | `BE-S022` and `BE-S027`, checked 2026-05-29 | Connects FNRS policy to animal experimentation | Boundary/funder route; retest URL |

## Data-Protection Route

| Source | URL or path | Type and date | Local use | Current-check need |
| --- | --- | --- | --- | --- |
| Belgian Data Protection Authority research guidance | `https://www.autoriteprotectiondonnees.be/professionnel/themes/recherche` | App-only French guidance | Data-protection boundary for research | Boundary only; retest if used |
| GBA/APD Dutch research guidance | `https://www.gegevensbeschermingsautoriteit.be/professioneel/thema-s/onderzoek` | App-only Dutch guidance | Dutch-language data-protection boundary | Boundary only; likely duplicate-language route |

## IP Route

No dedicated Belgian IP authority or commercialization source is currently formalized in the Belgium app source backbone or source registry. IP appears as a boundary in the overview and source notes through institutional/federal examples. Task 2A should add an official IP/commercialization source only if the final NL-BE comparison uses that boundary lane.

## Quality-Assurance Route

No dedicated Belgian quality-assurance agency source is currently formalized for the comparison backbone. Quality-assurance appears indirectly in the overview through community governance and institutional integrity/ethics pages. Task 2A should avoid adding QA claims unless an official QA source is brought in and coded as boundary-only.

## Research-Security, Dual-Use, AI Or Open-Science Route

| Source | URL or path | Type and date | Local use | Current-check need |
| --- | --- | --- | --- | --- |
| BELSPO Research Security index | `https://www.belspo.be/belspo/ResearchSecurity/index_en.stm` | App-only federal source | Research security boundary and federal compliance context | Boundary only; retest if used |
| BELSPO research-security ethics/core academic values | `https://www.belspo.be/belspo/ResearchSecurity/ethics_en.stm` | `BE-S019`, checked 2026-04-30 | Academic freedom, scientific integrity, open science, ethics committees and risk handling | Boundary only; retest if used |
| FWO research ethics | `https://www.fwo.be/en/about-fwo/research-policy/research-ethics/` | `BE-S021`, checked 2026-04-30 | Ethics checklist and approval duties | Boundary/funder route |
| PINDARE Data Management Plan | `https://pindare.cref.be/fr/research-data-management/data-management-plan-dmp` | App-only DMP source | FWB research-data-management route | Boundary/open-science only |
| DMPonline.be | `https://pindare.cref.be/fr/rdm/write-your-dmp-on-dmponline-be` | App-only DMP platform | FWB DMP platform | Boundary/open-science only |
| UAntwerpen CWI annual report 2025 | `https://medialibrary.uantwerpen.be/files/56390/ec52e7fc-a2ad-4263-8fb6-a5a1ccb5c6e4.pdf` | `BE-S009`, checked 2026-04-24 | Includes AI/reference and conflict-of-interest case themes | Core publication source with AI/boundary examples |

## Unclear Or Duplicate Source

| Source | Local issue | Action for Task 2A |
| --- | --- | --- |
| VCWI official page on `kvab.be` and VCWI main page on `vcwi.be` | `TR-BE-001` uses older/alternate transparency source; app uses `vcwi.be` body page | Reconcile official current body page and keep old source only if still useful |
| VCWI Yearbook 2024 and VCWI annual report 2024 | `TR-BE-002` uses KVAB yearbook, while `BE-S003` uses VCWI annual report PDF | Treat as duplicate/older unless Task 2A shows it adds distinct content |
| VCWI annual reports | `BE-S001` and `BE-S023` both log the same hub with different access dates | Keep latest current-check row or explain duplicate purpose |
| KU Leuven annual reports | `BE-S006` and `BE-S024` both log the same hub with different access dates | Keep latest current-check row or explain duplicate purpose |
| UAntwerpen CWI page | `BE-S008` and `BE-S025` both log the same page with different access dates | Keep latest current-check row or explain duplicate purpose |
| FNRS CSIS page | `BE-S010` and `BE-S026` both log the same page with different access dates | Keep latest current-check row or explain duplicate purpose |
| FNRS scientific policy URL mismatch | Registry uses `/en/our-commitments/scientific-policy`; app source links include `/en/politique-scientifique` | Resolve in Task 2A and update app/registry if one moved |
| FWO integrity clause language split | App uses Dutch-language clause; registry uses English-language clause | Decide whether to keep both or one canonical link |
| CSIS/FWB output status | Route and regulation evidence is present, but no public annual case-output archive is recorded locally | Retest specifically for annual report, anonymized opinion or recommendation output |
| Belgium-wide boundary lanes | FAMHP, data protection, animal research, research security and DMP/open-science sources are mixed with integrity vocabulary | Keep them boundary-only unless a source explicitly links to misconduct handling |

## Task 0C Findings

- Belgium's local source base is strong enough for a careful comparison only if sources remain lane-specific: Belgium-wide code, federal BELSPO/security/funding layer, Flemish VCWI/FWO/VLIR lane, FWB CSIS/FNRS/PINDARE lane, and local institutional examples.
- The strongest public-output evidence is Flemish and annual-report based: VCWI annual reports, KU Leuven CWI annual reports and UAntwerpen CWI annual reports. The FWB lane is structurally visible through CSIS, FNRS and PINDARE, but local evidence still records no comparable public CSIS case-output archive.
- The most important source-current watchpoints for Belgium are duplicate VCWI/KVAB sources, duplicate annual-report hub rows, the FNRS scientific-policy URL mismatch, CSIS output practice, and broader institutional retesting beyond KU Leuven and UAntwerpen.
- No update to the static comparison page is justified by Task 0C alone, because this task only inventories local evidence and performs no live source-current verification or new comparison synthesis.

## Next Strict Task

Task 1A: Netherlands source-current sweep from the newly created Netherlands local source inventory.
