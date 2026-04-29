# Albania - initial extraction notes

Accessed: 2026-04-16

Status: first-pass source map only. This is not yet a full country overview.

Source registry IDs: `AL-S001` to `AL-S005` in `data/source-registry.csv`.

## Preliminary system reading

Albania does not yet show a single national research-integrity office or national misconduct board in this first pass. The visible public structure is a higher-education and scientific-research legal frame, external quality assurance through ASCAL, and institution-level ethics and research rules.

The first working hypothesis is therefore: institution-led ethics and procedure model inside a national higher-education and quality-assurance framework.

## Candidate actors

- Ministry responsible for education and research.
- ASCAL / Quality Assurance Agency in Higher Education, as the external quality-assurance actor for higher education.
- Accreditation Board within ASCAL.
- University of Tirana as an initial institutional example.
- University ethics councils and institutional governing bodies.

## Sources located

- ASCAL mission page. It states that ASCAL operates under DCM No. 109/2017 and Law No. 80/2015 on higher education and scientific research, and that it is the sole institution monitoring and evaluating higher-education quality in Albania.  
  https://mail.ascal.al/en/about-us/mission-and-activity

- ASCAL Accreditation Board organization page. It describes the board as an independent collegial decision-making body and links it to Law No. 80/2015.  
  https://www.ascal.al/en/accreditation-board/organization

- University of Tirana legislation page. It lists the Albanian Constitution, Law No. 80/2015, University of Tirana statute, regulations, and ethics code as the relevant legal and normative frame.  
  https://unitir.edu.al/legjislacioni/

- University of Tirana Code of Ethics page. It identifies the code as approved by Academic Senate decision No. 12 of 18 April 2011 and states that it sets conduct rules for academic staff, non-academic staff, and students.  
  https://unitir.edu.al/kodi-i-etikes-i-universitetit-te-tiranes/

- University of Tirana regulations page. It lists internal regulations, whistleblowing-related rules, the ethics code, and other institutional documents.  
  https://unitir.edu.al/uni-3/

## Extraction signals

- Code `LAW_HE_SCIENCE`: Law No. 80/2015 appears to be the central statutory source to collect.
- Code `QA_ACTOR`: ASCAL should be coded as a quality-assurance actor, not automatically as a misconduct body.
- Code `INSTITUTIONAL_ETHICS`: University ethics councils and institutional ethics codes are visible and should be sampled.
- Code `WHISTLEBLOWING`: University of Tirana lists a whistleblowing investigation/protection regulation; collect and classify separately from research-specific misconduct unless the text links it to research conduct.

## Open follow-up

- Locate the official full text of Law No. 80/2015 and file it under `law references`.
- Locate the University of Tirana full regulation PDF and check whether it contains research integrity, plagiarism, fabrication, falsification, authorship, or misconduct handling provisions.
- Search other major Albanian universities for equivalent ethics, plagiarism, and scientific research procedures.
- Check whether the national research agency or ministry has grant terms with research-integrity, ethics approval, open-science, or data-management requirements.

## Expanded source and committee-route pass

Accessed: 2026-04-26

Status: first app dossier structure drafted. Albania still has no `Overview Albania.docx`; this pass converts the starter map into a conservative system profile and records the main public route evidence.

### Seed bodies

- Body: Ministry responsible for education and research / Law No. 80/2015.
  Type: legal framework.
  Lane: higher education and scientific research governance.
  Role: establishes research activity in HEIs, institutional statutes and regulations, ASCAL quality assurance, and institutional ethics councils.
  Strongest current source: QSHA English PDF copy of Law No. 80/2015; University of Tirana links the Albanian Qendra e Botimeve Zyrtare version.
  Case-file status: procedure and institutional-design evidence, not a case archive.

- Body: Institutional Ethics Councils in higher education institutions.
  Type: institutional handling route.
  Lane: teaching, research and institutional ethics.
  Role: Law No. 80/2015 requires an Institutional Ethics Council in HEIs; University of Tirana, UMT, UAMD and University of Elbasan all expose institutional ethics bodies or documents.
  Strongest current source: University of Tirana 19 March 2025 Ethics Council regulation page; University of Elbasan Ethics Council page; UMT governing bodies and annual report; UAMD committee and document pages.
  Publication class: procedure only at UT, UAMD and Elbasan; aggregate annual-report summaries at UMT.
  Case-file status: no public general research-misconduct decision archive located.

- Body: NASRI / AKKSHI.
  Type: national science funding and monitoring agency.
  Lane: research-funding, evaluation and monitoring.
  Role: supports, monitors and evaluates national R&D programmes and projects; hosts a regulation on ethics in research and publishing.
  Strongest current source: NASRI national R&D programmes page and legal-basis PDF; NASRI-hosted `Rregullore per etiken ne veprimtarine kerkimore dhe botuese`.
  Publication class: funder procedure and monitoring route.
  Case-file status: no public misconduct sanction or decision archive located in this pass.

- Body: ASCAL / Accreditation Board.
  Type: external quality-assurance actor.
  Lane: accreditation, programme review and monitoring.
  Role: ASCAL monitors and evaluates higher-education quality; the Accreditation Board is the final accreditation decision-maker.
  Strongest current source: ASCAL mission, Accreditation Board organization page and decisions page.
  Publication class: structured QA decision hub.
  Case-file status: public accreditation decisions and reports, not research-misconduct case files unless a decision expressly records an integrity breach.

- Body: University of Medicine, Tirana Ethics Council.
  Type: institutional ethics route with aggregate public reporting.
  Lane: teaching, research ethics and project/article approval.
  Role: governing-body page identifies the council; the 2023-2024 annual report says the council reviewed about 150 requests and issued 45 decisions in 2024 related to scientific articles/projects and teaching processes.
  Publication class: aggregate annual-report summaries.
  Case-file status: no individual decisions located.

- Body: Biomedical and clinical-trial ethics route.
  Type: boundary regime.
  Lane: clinical trials and human-health research.
  Role: medicines law and AKBPM materials place clinical-trial permission in a health-ministry/ethics-committee route.
  Publication class: approval/procedure route.
  Case-file status: boundary approval lane, not a general research-integrity archive.

- Body: Information and Data Protection Commissioner.
  Type: boundary regulator.
  Lane: personal-data and access-to-information decisions.
  Role: publishes data-protection decisions and annual reports.
  Publication class: boundary decision page.
  Case-file status: separate from research-misconduct handling.

- Body: General Directorate of Industrial Property.
  Type: boundary regulator.
  Lane: patents, trademarks, industrial designs, IP registers and appeals.
  Role: exposes IP registers, appeals/chambers and official publications.
  Publication class: boundary register and appeal infrastructure.
  Case-file status: IP route, not a research-integrity route unless an institutional source connects the dispute to authorship or misconduct.

### Public case-material sources

- Source: UMT Annual Report 2023-2024.
  Body: University of Medicine, Tirana Ethics Council.
  Format: PDF annual report.
  Access: public.
  Case level: aggregate only.
  Note: records about 150 requests and 45 ethics decisions in 2024, but no individual decision reasoning.

- Source: ASCAL Accreditation Board decisions.
  Body: ASCAL / Accreditation Board.
  Format: HTML decision hub with meeting pages.
  Access: public.
  Case level: QA decision files.
  Note: useful for quality-assurance transparency and extraction, but not a general misconduct archive.

- Source: University of Tirana Ethics Council regulation page.
  Body: University of Tirana Ethics Council.
  Format: HTML page linking the 2025 regulation.
  Access: public.
  Case level: procedure only.
  Note: current institutional ethics route; no public decision archive located.

- Source: UAMD committees and documentation pages.
  Body: UAMD Ethics Council and Institutional Academic Integrity Commission.
  Format: HTML pages and linked PDFs.
  Access: public.
  Case level: procedure and committee visibility.
  Note: exposes a distinct academic-integrity commission and research-ethics code, but no public case outputs located.

- Source: University of Elbasan Ethics Council page.
  Body: University of Elbasan Ethics Council.
  Format: HTML page.
  Access: public.
  Case level: committee visibility.
  Note: identifies the council, its creation by Senate decision No. 07 of 7 February 2020, role and membership.

### Archive or database extraction targets

- Target: ASCAL Accreditation Board decisions.
  URL: https://www.ascal.al/en/accreditation-board/decisions
  Owner: ASCAL.
  Route: quality assurance.
  Scope: accreditation decisions by meeting.
  Database function: QA decision hub.
  Extraction priority: medium, for boundary-lane and QA-integrity evidence only.
  Representative case file: start with 2025 meeting decisions.
  Access or stability note: live page but includes unrelated injected footer links; use official decision links only.

- Target: UMT Annual Report 2023-2024.
  URL: https://umed.edu.al/wp-content/uploads/2026/02/Raporti-Vjetor-UMT-2023-2024-_Final-mars-2025docx.pdf
  Owner: University of Medicine, Tirana.
  Route: institutional ethics council.
  Scope: annual institutional activity, including ethics-council counts.
  Database function: aggregate annual-report corridor.
  Extraction priority: high for Albania case-publication calibration.
  Representative case file: no individual file; use the ethics-council annual-report paragraph.
  Access or stability note: live PDF.

- Target: NASRI research and publishing ethics regulation.
  URL: https://nasri.gov.al/dokumenta/RregullorjaKerkimit.pdf
  Owner: NASRI / AKKSHI.
  Route: institutional research-ethics and responsible-research standards.
  Scope: research culture, complaints, ethics committee, data, plagiarism, authorship, review and conflicts.
  Database function: national guidance/procedure source.
  Extraction priority: high for dossier backbone.
  Representative case file: none; procedure source only.
  Access or stability note: live PDF.

### Gaps for next pass

- Draft `Overview Albania.docx`; no overview document exists yet.
- Locate the full Albanian text of Law No. 80/2015 from Qendra e Botimeve Zyrtare or another stable government mirror, because the QSZ web app requires JavaScript in this pass.
- Download and inspect the linked University of Tirana Ethics Council regulation and research-ethics guide PDFs.
- Check whether the University of Tirana, UAMD, UMT, University of Elbasan and UBT publish ethics-council minutes, opinions, annual reports or decision notices beyond the route pages.
- Search for AKKSHI/NASRI project-monitoring sanctions, termination notices, grant-withdrawal notices or annual reports.
- Keep ASCAL accreditation files, AKBPM clinical-trial permissions, IDP data-protection decisions and DPPI IP registers separate from general research-integrity case publication.
