# Armenia - initial extraction notes

Accessed: 2026-04-16

Status: first-pass source map only. This is not yet a full country overview.

Source registry IDs: `AM-S001` to `AM-S004` in `data/source-registry.csv`.

## Preliminary system reading

Armenia's visible public layer includes a higher-education and science committee with formal responsibility for scientific degree award processes, laws and regulations on scientific activity, and a biomedical research ethics committee layer. This first pass did not identify a single national general research-integrity office or national misconduct board.

The first working hypothesis is therefore: degree-award and science-governance system plus biomedical REC layer, with institution-level ethics and misconduct procedures still to be mapped.

## Candidate actors

- Higher Education and Science Committee.
- Specialized academic councils involved in scientific degree award.
- National Institute of Health of Armenia research ethics committee.
- National Centre for Infectious Diseases research ethics committee.
- Universities and research institutes as institutional procedure owners.

## Sources located

- Higher Education and Science Committee laws and regulations page. It lists the RA Law on Scientific and Scientific-Technical Activities and other regulations relevant to degree award and scientific governance.  
  https://degrees.hesc.am/en/node/542

- Higher Education and Science Committee about page. It states that committee functions were approved in the RA Law on Scientific and Scientific-Technical Activity and that Doctor of Philosophy, Doctor of Science, Associate Professor, and Professor titles are awarded in Armenia.  
  https://degrees.hesc.am/en/about-us

- Higher Education and Science Committee defense-process page. It states that completed application files and dissertations are sent to the scientific secretary of the specialized academic council, and that the scientific secretary reviews the integrity of documents before forwarding materials to the committee.  
  https://degrees.hesc.am/en/node/540

- Council of Europe Office in Yerevan page on Armenian research ethics committees. It identifies RECs under the National Institute of Health of RA and the National Centre for Infectious Diseases of RA and links the training to European REC standards, the Oviedo Convention, and biomedical-research standards.  
  https://www.coe.int/en/web/yerevan/news1/-/asset_publisher/wWTBvPqHlz8x/content/members-of-armenian-research-ethics-committees-have-strengthened-their-capacities-in-line-with-the-main-principles-and-standards-of-european-recs

## Extraction signals

- Code `LAW_SCIENCE`: the Law on Scientific and Scientific-Technical Activities should be collected and translated or summarized.
- Code `DEGREE_AWARD_CONTROL`: HESC degree-award rules are a governance and quality-control source, not necessarily a full research-integrity procedure.
- Code `DOCUMENT_INTEGRITY_CHECK`: the defense process includes an explicit document-integrity review point.
- Code `BIOMEDICAL_REC`: Armenian biomedical RECs are visible through the Council of Europe source and need official Armenian source collection.

## Open follow-up

- Locate official full-text laws and regulations from HESC or the Armenian legal portal and file them under `law references`.
- Search HESC and major universities for plagiarism, fabrication, falsification, authorship, dissertation withdrawal, appeal, and misconduct procedures.
- Locate official pages for the National Institute of Health REC and National Centre for Infectious Diseases REC.
- Determine whether Armenia has grant-funder terms that require ethics approval, research integrity, data management, or open-science compliance.

## First expanded dossier pass

Accessed: 2026-04-28

Status: first app dossier drafted from official online sources. Armenia is still missing a formal `Overview Armenia.docx`.

### System reading

Armenia should currently be coded as a degree-award and institution-led research-governance system, not as a single national research-misconduct board. The public national layer is strongest through the Higher Education and Science Committee / Supreme Certifying Committee route for scientific degrees, academic titles, specialized academic councils, dissertation-defense procedure, degree/title orders and qualification standards.

HESC has an explicit role in refusing a scientific degree where regulatory violations occur, and the defense route includes a document-integrity review by the scientific secretary before files move to HESC. The located public order stream mainly records degree and title awards; a separated refusal, revocation or misconduct-decision archive was not located in this pass.

The second public corridor is quality assurance. ANQA publishes accreditation decisions, expert reports and a State Accreditation Register. This is useful case-like public material for higher-education accountability, but it should be classified as quality assurance rather than general research-integrity adjudication unless an individual file expressly records an integrity breach.

Institutional and boundary routes are visible through NIH, YSMU, AUA, IMB, YSU, clinical-trial law, animal-experiment law, data-protection pages and IP pages. These sources show ethics approval, IRB/REC handling, originality checks, regulatory permits, registers and decisions, but no public general research-misconduct case archive.

### Seed bodies

- Body: Higher Education and Science Committee / Supreme Certifying Committee route
- Type: national degree and certification route
- Lane: scientific degrees, academic titles, specialized academic councils
- Role: approves and certifies degrees and titles; can refuse awards for regulatory violations; publishes orders and maintains defense/council data
- Strongest current source: https://degrees.hesc.am/en/about-us and https://degrees.hesc.am/en/orders
- Publication class: degree/title order stream
- Case-file status: public award orders found; no separated misconduct/refusal/revocation archive found

- Body: Specialized academic councils
- Type: degree-defense handling network
- Lane: dissertation defense and expert assessment
- Role: receive dissertation files, appoint experts and opponents, hold defenses, and send decisions into the HESC route
- Strongest current source: https://degrees.hesc.am/en/node/540 and https://degrees.hesc.am/en/councils
- Publication class: procedure and directory
- Case-file status: document-integrity checkpoint found; not a public misconduct archive

- Body: HESC state research-grant programmes
- Type: funder compliance route
- Lane: state-funded scientific and technical activity grants
- Role: application, eligibility, expertise, contract, reporting and consequences
- Strongest current source: https://irf-armenia-2025.hesc.am/documents/25IRF-2_Call_ENG.pdf
- Publication class: call and compliance terms
- Case-file status: predatory/fraud publication admissibility check and reporting consequences found; no sanction archive located

- Body: ANQA
- Type: higher-education quality assurance
- Lane: institutional and programme accreditation
- Role: coordinates self-evaluation, external review, site visit, expert report and Accreditation Committee decision
- Strongest current source: https://www.anqa.am/en/accreditation/ and https://register.anqa.am/
- Publication class: QA decision/report corridor
- Case-file status: public QA files found; separate from misconduct decisions

- Body: National Institute of Health Ethics Committee
- Type: biomedical research ethics committee
- Lane: biomedical and behavioral research review
- Role: reviews research plans and protects participant rights, interests and confidentiality
- Strongest current source: https://new.nih.am/subdivisions/ethics_committee/
- Publication class: procedure-only REC route
- Case-file status: official REC page found; no public approval list or misconduct archive located

- Body: Yerevan State Medical University Ethics Committee
- Type: institutional medical and research ethics committee
- Lane: clinical, medical, pharmacological, laboratory-animal, research and behavioral ethics
- Role: screens applications, appoints reviewers, meets monthly and issues positive, positive-with-remarks or negative written conclusions
- Strongest current source: https://ysmu.am/en/research/ethics-committee/
- Publication class: procedure-only institutional route
- Case-file status: conclusion categories found; no public decision archive located

- Body: American University of Armenia Institutional Review Boards
- Type: institutional IRB route
- Lane: human participant and animal-subject research under AUA
- Role: develops and oversees research ethics procedures and educates the academic community
- Strongest current source: https://policies.aua.am/policy/107 and https://aua.am/aua-institutional-review-board-guidebook/
- Publication class: policy and application route
- Case-file status: IRB route found; no public misconduct case archive located

- Body: Institute of Molecular Biology NAS RA Ethics Committee
- Type: institute IRB route
- Lane: biomedical and molecular-biology research review
- Role: publishes IRB identifiers, membership and review forms
- Strongest current source: https://imb.am/ethics-committee/
- Publication class: committee page and forms
- Case-file status: approval route; no public misconduct publication found

- Body: Yerevan State University originality-control route
- Type: institutional academic-integrity infrastructure
- Lane: plagiarism/originality checks for theses and scientific articles
- Role: Turnitin Similarity used through e-learning platform to check originality
- Strongest current source: https://www.ysu.am/en/IT-center/articles/75571
- Publication class: originality-control infrastructure
- Case-file status: prevention/control source; no adjudication archive found

- Body: Medicines authority and Clinical Trials Ethics Commission
- Type: clinical-trial boundary route
- Lane: clinical trial authorization, ethics opinion, registry and monitoring
- Role: favourable ethics opinions and authorisation required; law requires a public registry of authorised and rejected clinical trials
- Strongest current source: https://www.arlis.am/hy/acts/193634 and https://www.pharm.am/index.php/en/permitted-clinical-trials
- Publication class: clinical-trial boundary register/legal route
- Case-file status: boundary registry/publication duty; not general misconduct publication

- Body: authorised body under Veterinary Medicine Law
- Type: animal-research boundary route
- Lane: animal experiments for educational, scientific and research purposes
- Role: issues permits, may reject with justification, keeps permit-register data
- Strongest current source: https://www.arlis.am/hy/acts/193641
- Publication class: legal permit route
- Case-file status: register duty found; direct public register still to locate

- Body: Personal Data Protection Agency
- Type: data-protection boundary route
- Lane: personal data, education-sector data, decrees, guidance and administrative penalties
- Strongest current source: https://pdpa.am/en and https://www.moj.am/en/page/609
- Publication class: boundary decisions/guidance
- Case-file status: boundary records only unless a research-data case is explicit

- Body: Intellectual Property Office
- Type: IP boundary route
- Lane: patents, trademarks, official bulletins, board of appeal and search
- Strongest current source: https://aipo.am/en/
- Publication class: IP register and appeal infrastructure
- Case-file status: separate from authorship or research-misconduct routes unless linked by an institutional procedure

### Public case-material sources

- Source: HESC orders page
- Body: HESC / Supreme Certifying Committee
- Format: HTML page with linked order PDFs
- Access: public
- Case level: degree/title order stream; no misconduct-specific classification located
- Note: use as an extraction target to test award, refusal, revocation and title-decision patterns.

- Source: ANQA accreditation page and State Accreditation Register
- Body: ANQA
- Format: HTML pages with decisions, expert reports and register entries
- Access: public
- Case level: QA decision/report corridor
- Note: strong public accountability material, but classify as quality assurance.

- Source: Law on Medicines and pharm.am clinical-trial pages
- Body: medicines authority / clinical-trial ethics route
- Format: law page, legal-document page and permitted-trials page
- Access: public
- Case level: clinical-trial authorization and registry duty
- Note: boundary lane, not general misconduct.

- Source: PDPA and Ministry of Justice data-protection decision pages
- Body: Personal Data Protection Agency / Ministry of Justice
- Format: HTML pages
- Access: public
- Case level: data-protection decisions, guidance and administrative-penalty news
- Note: boundary lane unless a research-data case is explicit.

### Archive or database extraction targets

- Target: HESC orders
- URL: https://degrees.hesc.am/en/orders
- Owner: HESC / Supreme Certifying Committee
- Route: degree/title certification
- Scope: public orders on awarding degrees and titles
- Database function: order stream
- Extraction priority: high
- Representative case file: April 2026 degree and title orders
- Access or stability note: live public page; next pass should test pagination and refusal/revocation terms.

- Target: HESC defenses archive
- URL: https://degrees.hesc.am/en/archive
- Owner: HESC
- Route: dissertation defense metadata
- Scope: defense records across institutions and specialities
- Database function: defense archive
- Extraction priority: medium
- Representative case file: not selected in this pass
- Access or stability note: public but large dynamic page; use cautiously.

- Target: ANQA accreditation decisions and expert reports
- URL: https://www.anqa.am/en/accreditation/
- Owner: ANQA
- Route: higher-education QA
- Scope: Accreditation Committee decisions and expert panel reports
- Database function: QA decision/report corridor
- Extraction priority: medium
- Representative case file: 2024 Accreditation Committee decisions and 2025 expert report links
- Access or stability note: public; classify separately from misconduct.

- Target: State Accreditation Register
- URL: https://register.anqa.am/
- Owner: ANQA
- Route: higher-education QA
- Scope: institutional and programme register
- Database function: QA register
- Extraction priority: low to medium
- Representative case file: not selected in this pass
- Access or stability note: public register landing page.

- Target: permitted clinical trials
- URL: https://www.pharm.am/index.php/en/permitted-clinical-trials
- Owner: medicines authority / pharm.am route
- Route: clinical-trial boundary
- Scope: permitted clinical trials and required documents
- Database function: clinical-trial boundary register
- Extraction priority: medium
- Representative case file: not selected in this pass
- Access or stability note: public boundary route.

### Gaps for next pass

- Draft `Overview Armenia.docx` from the first expanded app dossier.
- Locate official full-text law pages for the Law on Scientific and Scientific-Technical Activity and degree-award regulations from ARLIS or HESC-linked files.
- Test whether HESC order pagination contains refusal, withdrawal, revocation or appeal orders that can be separated from ordinary award orders.
- Locate a current official National Centre for Infectious Diseases REC page; the route is currently confirmed through the Council of Europe page and publication acknowledgements, not a live committee page.
- Widen institutional misconduct, authorship, research-data and publication-procedure checks beyond YSMU, AUA, IMB and YSU.
- Locate a direct animal-experiment authority page or public permit register under the Veterinary Medicine Law.
- Keep ANQA QA files, clinical-trial approvals, animal permits, PDPA decisions and IP registers separate from general research-misconduct publication.
