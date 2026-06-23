window.TRANSPARENCY_METADATA = {
  sourceDocument: "data/transparency_research_integrity_europe_overview.docx",
  prepared: "2026-04-17",
  scope: "EU-27 plus the United Kingdom, Switzerland, Norway and Iceland",
  question:
    "How national or quasi-national research-integrity bodies publish case material, and in what format.",
  caution:
    "This measures open public visibility of research-integrity case handling, not the overall quality of national misconduct systems."
};

window.DEFAULT_TRANSPARENCY_DATA = {
  score: null,
  tier: "Not reviewed in transparency overview",
  mainBody: "Not assessed in the transparency overview",
  coverage: "Not assessed",
  publicAccess: "Not assessed",
  publicationModel:
    "The 17 April 2026 transparency overview covered the EU-27 plus the United Kingdom, Switzerland, Norway and Iceland. This country is outside that source scope or has not yet been mapped in this transparency layer.",
  format: "Not assessed",
  hasArchive: null,
  keyNote: "Add open case-publication, committee-publication and archive sources in a later pass.",
  sourcePath: "data/transparency_research_integrity_europe_overview.docx",
  sourceDate: "2026-04-17",
  resources: []
};

window.TRANSPARENCY_DATA = [
  {
    id: "austria",
    country: "Austria",
    score: 2,
    tier: "Summary-based annual-report corridor with institutional rule fragments",
    mainBody:
      "OeAWI / OeAWI Commission, with FWF annual publication and institutional route-rule fragments",
    coverage: "National OeAWI and funder routes, plus selected institutional procedure and publication-rule fragments",
    publicAccess: "Yes",
    publicationModel:
      "OeAWI annual-report archive with anonymised inquiry summaries; FWF annual publication practice; institutional routes mostly procedure-only or internal-reporting rules",
    format: "PDF annual reports + official webpages + institutional statutes",
    hasArchive: false,
    keyNote:
      "24 April 2026 case-file pass confirms Austria as summary-based rather than a public decision-archive system. OeAWI's download area is the strongest public source, with Commission annual reports from 2011 through 2023 and numbered anonymised inquiry summaries. Institutional searches found route and publication-rule fragments at Vienna, Medical University of Innsbruck and Salzburg, but no ETH-style public institutional case-report repository.",
    sourcePath: "data/Austria/raw documentation/source notes/Austria deep-dive sources.md",
    sourceDate: "2026-04-24",
    resources: [
      {
        label: "OeAWI download area",
        url: "https://oeawi.at/en/downloads/",
        resourceClass: "Annual-report archive",
        scope: "National OeAWI Commission route",
        caseLevelInfo:
          "Commission annual reports from 2011 through 2023 with anonymised inquiry summaries and statistics",
        comment:
          "Best Austrian extraction target; annual-report archive, not a searchable decision database."
      },
      {
        label: "OeAWI Commission annual report 2023",
        url: "https://oeawi.at/wp-content/uploads/2025/06/OeAWI-Commission-Annual-Report-2023.pdf",
        resourceClass: "Annual report with case material",
        scope: "National",
        caseLevelInfo:
          "Nine new reports, 15 inquiries processed in 2023, and numbered anonymised inquiry summaries",
        comment:
          "Provides the clearest current public case-summary sample."
      },
      {
        label: "University of Vienna ombuds directive",
        url: "https://mtbl.univie.ac.at/storage/media/mtbl02/2005_2006/2005_2006_112.pdf",
        resourceClass: "Institutional publication-rule source",
        scope: "University of Vienna ombuds and Standing Commission route",
        caseLevelInfo:
          "Permits annual reporting and anonymised case descriptions, but no live case repository was located",
        comment:
          "Important institutional fragment; publication basis, not confirmed archive."
      }
    ]
  },
  {
    id: "belgium",
    country: "Belgium",
    score: 3,
    tier: "Flemish annual-report fragments plus FWB procedure visibility",
    mainBody:
      "VCWI, KU Leuven and UAntwerpen annual reports; CSIS/FWB procedure and directory routes",
    coverage:
      "Flemish second-line and first-line institutional lanes, plus FWB procedure and handler-directory visibility",
    publicAccess: "Yes, but lane-specific",
    publicationModel:
      "Anonymized annual reports and institutional summaries in Flanders; procedure and directory visibility in FWB; no Belgian national archive",
    format: "Web + PDF annual reports",
    hasArchive: false,
    keyNote:
      "The 24 April 2026 pass shows Belgium is fragmented but not opaque if the fragments are separated: VCWI annual reports through 2025 and KU Leuven/UAntwerpen summaries expose real case material, while CSIS/FWB remains mainly procedural and directory-visible.",
    sourcePath: "data/Belgium/raw documentation/source notes/Belgium deep-dive sources.md",
    sourceDate: "2026-04-24",
    resources: [
      {
        label: "VCWI annual reports",
        url: "https://www.vcwi.be/jaarverslagen",
        resourceClass: "Second-line annual-report archive",
        scope: "Flemish VCWI second-advice route",
        caseLevelInfo:
          "Annual reports from 2013 through 2025 with counts and anonymized second-advice summaries",
        comment:
          "Strongest cross-institutional Belgian case-publication lane, but Flemish and second-line only."
      },
      {
        label: "VCWI annual report 2025",
        url: "https://www.vcwi.be/sites/default/files/VCWI_jaarverslag2025.pdf",
        resourceClass: "Representative annual report",
        scope: "Flemish VCWI second-advice route",
        caseLevelInfo:
          "Seven second-advice requests, five second-advice reports and anonymized summaries, mainly confirming institutional inadmissibility decisions",
        comment:
          "Latest located VCWI report; also records 22 connected institutions and VLIR support."
      },
      {
        label: "VCWI annual report 2024",
        url: "https://www.vcwi.be/sites/default/files/VCWI_jaarverslag2024.pdf",
        resourceClass: "Representative annual report",
        scope: "Flemish VCWI second-advice route",
        caseLevelInfo:
          "Two second-advice requests, five second-advice reports and anonymized case summaries",
        comment:
          "Useful because it also urges more institutional publication of anonymized CWI reports."
      },
      {
        label: "KU Leuven annual report 2024",
        url: "https://research.kuleuven.be/en/integrity-ethics/integrity/annual-report/jaarverslag_2024",
        resourceClass: "Institutional annual report",
        scope: "KU Leuven first-line CWI route",
        caseLevelInfo:
          "Six notifications, three admissible matters, one founded light problematic-behaviour outcome and anonymized summaries",
        comment:
          "One of the strongest first-line institutional publication lanes found in Belgium."
      },
      {
        label: "UAntwerpen CWI annual report 2025",
        url: "https://medialibrary.uantwerpen.be/files/56390/ec52e7fc-a2ad-4263-8fb6-a5a1ccb5c6e4.pdf",
        resourceClass: "Institutional annual report",
        scope: "University of Antwerp first-line CWI route",
        caseLevelInfo:
          "Multi-year table with FFP/OUP classification, outcome, follow-up, VCWI status and narrative summaries",
        comment:
          "Strong institutional case-file fragment because the report includes structured case rows."
      },
      {
        label: "CSIS regulation",
        url: "https://www.frs-fnrs.be/docs/CSIS-REGLEMENT.pdf",
        resourceClass: "FWB second-line procedure",
        scope: "French-speaking/FWB CSIS second-advice route",
        caseLevelInfo:
          "Procedure and confidentiality rules; no public CSIS case-output archive located in this pass",
        comment:
          "Use as procedure and negative-publication evidence for the FWB lane."
      },
      {
        label: "PINDARE FWB CIS directory",
        url: "https://pindare.cref.be/fr/integrite-scientifique/les-comites-dintegrite-scientifique-en-federation-wallonie-bruxelles/",
        resourceClass: "FWB handler directory",
        scope: "ULiege, UCLouvain, ULB, UMONS, UNamur and CSIS second-advice link",
        caseLevelInfo:
          "Maps confidential institutional handling routes rather than public case outputs",
        comment:
          "Handler-directory evidence should not be scored as a case archive."
      }
    ]
  },
  {
    id: "bulgaria",
    country: "Bulgaria",
    score: 2,
    tier:
      "Summary-based institutional fragments with access-limited national route",
    mainBody:
      "Ministerial Academic Ethics Committee plus institutional and BAS academic-ethics commissions",
    coverage:
      "National statutory route evidence, selected universities, BAS institutes and separate biomedical ethics routes",
    publicAccess: "Partial",
    publicationModel:
      "No verified national public misconduct-decision archive; public evidence comes from an official but access-limited ministry committee page, institutional annual reports, committee document pages and procedure PDFs",
    format: "Official webpages + PDF annual reports + procedure PDFs",
    hasArchive: false,
    keyNote:
      "The 24 April 2026 case-file pass keeps Bulgaria below archive coding but above pure procedure-only coding. The MON Academic Ethics Committee route is official but access-limited in this pass, while UNWE publishes an annual report with complaint counts and a plagiarism summary and the Institute of Mechanics BAS publishes ethics-committee reports. Most other university and medical routes expose rules, forms, internal reports or composition rather than public decisions.",
    sourcePath:
      "data/Bulgaria/raw documentation/source notes/Bulgaria deep-dive sources.md",
    sourceDate: "2026-04-24",
    resources: [
      {
        label: "MON Academic Ethics Committee page",
        url: "https://www.mon.bg/dokumentatsiya/komisiya-po-akademichna-etika/",
        resourceClass: "Official national committee page",
        scope: "Ministerial Academic Ethics Committee",
        caseLevelInfo:
          "Official route page located through the ministry site menu, but direct content access was blocked by Cloudflare in this pass; no stable national decision archive was verified",
        comment:
          "Use as access-limited route evidence and a monitoring target, not as a confirmed archive."
      },
      {
        label: "UNWE Academic Ethics Commission 2022 report",
        url: "https://www.unwe.bg/Uploads/Main/8df0a_%D0%9E%D0%A2%D0%A7%D0%95%D0%A2%20%D0%9A%D0%BE%D0%BC.%20%D0%B0%D0%BA%D0%B0%D0%B4.%20%D0%B5%D1%82%D0%B8%D0%BA%D0%B0%202022.pdf",
        resourceClass: "Institutional annual report",
        scope: "University of National and World Economy",
        caseLevelInfo:
          "Fourteen committee meetings and nine written signals or complaints, including one plagiarism matter summarized as proven with PlagScan",
        comment:
          "Best current Bulgarian institutional case-summary source found in this pass."
      },
      {
        label: "Institute of Mechanics BAS ethics-committee documents",
        url: "https://www.imbm.bas.bg/index.php/bg_BG/ethics-committee-documents",
        resourceClass: "BAS institute report corridor",
        scope: "Institute of Mechanics, Bulgarian Academy of Sciences",
        caseLevelInfo:
          "Document page links ethics-committee rules, annual reports and mandate reports through 2022",
        comment:
          "Recurring institute report stream rather than a decision database."
      },
      {
        label: "MU Plovdiv Academic Ethics Commission rules",
        url: "https://mu-plovdiv.bg/wp-content/uploads/2022/03/%D0%9F%D1%80%D0%B0%D0%B2%D0%B8%D0%BB%D0%BD%D0%B8%D0%BA-%D0%BD%D0%B0-%D0%9A%D0%90%D0%95-2022.pdf",
        resourceClass: "Institutional procedure",
        scope: "Medical University Plovdiv",
        caseLevelInfo:
          "Complaints, written opinions, plagiarism checks, expert arbiters, reports to rectorate and five-year internal file retention",
        comment:
          "Procedure and restricted-file evidence, not a public case archive."
      }
    ]
  },
  {
    id: "croatia",
    country: "Croatia",
    score: 3,
    tier: "Fragmented legacy and institutional case traces",
    mainBody:
      "Legacy Committee on Ethics in Science and Higher Education plus current institutional ethics routes",
    coverage: "Legacy national + current institutional and funder routes",
    publicAccess: "Yes",
    publicationModel:
      "Legacy public opinions and reports, current institutional annual-report summaries and public statements; no current national archive",
    format: "Web + PDF",
    hasArchive: false,
    keyNote:
      "The 24 April 2026 case-file pass confirmed that Croatia has real but fragmented public case traces. The old Odbor route produced work reports and individual opinions, Zagreb publishes annual-report statistics, Rijeka publishes statements and principled outputs, and HRZZ/Split expose route or planned-reporting evidence without located public case files.",
    sourcePath: "data/transparency_research_integrity_europe_overview.docx",
    sourceDate: "2026-04-24",
    resources: [
      {
        label: "Committee work report (2017)",
        url: "https://www.sabor.hr/hr/sjednice-sabora/izvjesce-o-radu-odbora-za-etiku-u-znanosti-i-visokom-obrazovanju-u-2017-godini-0",
        resourceClass: "Annual/activity report",
        scope: "National",
        caseLevelInfo: "Committee work and case-related reporting",
        comment: "Reporting is public but fragmented."
      },
      {
        label: "Legacy Odbor 2017 work report PDF",
        url: "https://sabor.hr/sites/default/files/uploads/sabor/2019-01-18/081406/IZVJ_ODBOR_ETIKA_2017.pdf",
        resourceClass: "Legacy annual/activity report",
        scope: "Historical national route",
        caseLevelInfo:
          "Reports received, resolved and unfinished matters; minutes and agendas remained confidential",
        comment:
          "Strongest national case-trace source, but it belongs to the legacy route rather than the current post-2022 architecture."
      },
      {
        label: "Example opinion (Radman case)",
        url: "https://www.azvo.hr/images/stories/tijela_agencije/oze/Misljenje_-_Radman.pdf",
        resourceClass: "Published case opinion",
        scope: "National",
        caseLevelInfo: "Case-specific opinion",
        comment: "Shows that named opinions can be public."
      },
      {
        label: "University of Zagreb Ethics Council annual report 2022-2023",
        url: "https://www.unizg.hr/fileadmin/rektorat/O_Sveucilistu/Dokumenti_javnost/Izvjesca/Eticki_savjet/2022_2023_Godisnje_izvjesce_o_radu_ES.pdf",
        resourceClass: "Institutional annual-report summaries",
        scope: "University second-line and constituent-unit ethics route",
        caseLevelInfo:
          "Annual statistics and appeal/procedure traces rather than published decisions",
        comment:
          "Best current institutional example of recurring case-volume visibility."
      },
      {
        label: "University of Rijeka Vijece casti",
        url: "https://uniri.hr/o-sveucilistu/struktura/vijece-casti/",
        resourceClass: "Institutional opinion and statement page",
        scope: "University honor-council route",
        caseLevelInfo:
          "Public statements and principled opinions, not a searchable sanction archive",
        comment:
          "Useful current micro-publication node for interpretive outputs."
      }
    ]
  },
  {
    id: "cyprus",
    country: "Cyprus",
    score: 1,
    tier:
      "Low general research-misconduct publication with bioethics and QA report lanes",
    mainBody:
      "No national misconduct board located; CNBC and CYQAA publish adjacent bioethics and quality-assurance outputs",
    coverage:
      "CNBC bioethics decision/register, opinion and annual-report lanes; CYQAA accreditation/rejection reports and complaint-publication rule; selected RIF and institutional route pages.",
    publicAccess:
      "Some for adjacent lanes, weak for general research misconduct",
    publicationModel:
      "Public project-approval/register files, bioethics opinions, annual reports, accreditation reports and complaint-publication rules rather than a public misconduct case archive.",
    format: "Official pages, PDFs, report tables and institutional route pages",
    hasArchive: false,
    keyNote:
      "The 24 April 2026 Cyprus pass found no national general research-misconduct archive, but it did locate public case-like boundary lanes: CNBC research-proposal decision/register files for 2020-2023, CNBC opinions and annual reports, and CYQAA quality-assurance complaint/report publication signals.",
    sourcePath: "data/Cyprus/raw documentation/source notes/Cyprus deep-dive sources.md",
    sourceDate: "2026-04-24",
    resources: [
      {
        label: "CNBC homepage and latest-news decision/register links",
        url: "https://www.bioethics.gov.cy/",
        resourceClass: "Bioethics approval/register hub",
        scope: "Full bioethical assessment of research proposals",
        caseLevelInfo:
          "Links public research-proposal decision/register files for 2020, 2021, 2022 and 2023 located in this pass",
        comment:
          "Strongest Cyprus case-like public lane, but it is bioethics approval rather than misconduct adjudication."
      },
      {
        label: "CNBC opinions archive",
        url: "https://www.bioethics.gov.cy/moh/cnbc/cnbc.nsf/dmlopinions_arch_gr/dmlopinions_arch_gr?Count=1000&Expand=3&OpenDocument=&Start=1",
        resourceClass: "Bioethics opinion archive",
        scope: "National bioethics opinions",
        caseLevelInfo:
          "Public year-grouped opinions from 2003 through 2026 located in this pass",
        comment:
          "Normative opinion archive, not misconduct findings."
      },
      {
        label: "CYQAA complaints policy",
        url: "https://www.dipae.ac.cy/index.php/en/cyqaa-en/complaints-policy-en",
        resourceClass: "QA complaint publication rule",
        scope: "Accreditation compliance and evaluation-process integrity",
        caseLevelInfo:
          "Formal warning statements and final decisions are to be published on relevant entries when complaint thresholds are met",
        comment: "Important publication rule, but tied to accreditation/QA."
      },
      {
        label: "ENQA CYQAA review 2024",
        url: "https://www.dipae.ac.cy/archeia/ektheseis/alles_ektheseis/enqacyqaa_external_review_report2024.pdf",
        resourceClass: "External review with complaint aggregate",
        scope: "CYQAA complaint and reporting practice",
        caseLevelInfo:
          "Reports 18 complaints filed in 2018-2022, 11 substantiated or addressed, six formal recommendations and one police referral",
        comment:
          "Best aggregate QA complaint-practice signal located."
      }
    ]
  },
  {
    id: "czechia",
    country: "Czechia",
    sourceCountryLabel: "Czech Republic",
    score: 2,
    tier: "Institutional statement archive plus route-visible distributed system",
    mainBody:
      "No single national case-publication body; Charles University exposes the strongest public institutional statement/minutes archive, while CAS, universities, funders and specialist regulators publish different parts of the route architecture.",
    coverage:
      "National framework, CAS committee architecture, Charles University Ethics Commission statements and minutes, selected university committee routes, funder conditions, clinical-trial and animal-research authority routes.",
    publicAccess:
      "Strong for normative documents and committee pages; real but institutional and mixed for Charles University Ethics Commission statements; weak for national or academy-level case outcomes.",
    publicationModel:
      "Institutional statement/minutes archive at Charles University, plus codes, procedures, committee pages, tender conditions and regulatory traces rather than a national anonymized misconduct-case archive.",
    format:
      "Official pages, linked PDF statements and minutes, laws, tenders, committee directories, guidance pages and local university documents.",
    hasArchive: false,
    keyNote:
      "The 24 April 2026 Czechia pass found no national misconduct archive, but it did locate a durable institutional micro-publication archive at Charles University. That fragment should be indexed separately from CAS route visibility, funder consequence rules and boundary approvals.",
    sourcePath: "data/Czechia/raw documentation/source notes/Czechia deep-dive sources.md",
    sourceDate: "2026-04-24",
    resources: [
      {
        label: "CAS Scientific Integrity Committee",
        url: "https://www.avcr.cz/en/about-us/cas-structure/Scientific-Integrity-Committee-of-the-CAS/",
        resourceClass: "Committee page",
        scope: "CAS-level integrity route",
        caseLevelInfo: "Names current committee and secretariat, not case outcomes",
        comment:
          "Best academy-level route anchor, but no public CAS case-output archive was located in this pass."
      },
      {
        label: "Charles University Ethics Commission statements and minutes",
        url: "https://cuni.cz/UK-5554.html",
        resourceClass: "Institutional statement/minutes archive",
        scope: "Code-of-ethics compliance",
        caseLevelInfo:
          "Public statements from 2014 through 2025 and meeting minutes through 2025, with explicit privacy-based non-publication notes for some submissions",
        comment:
          "Strongest public Czech institutional case-practice fragment located; mixed academic-ethics archive, not a national research-misconduct archive."
      },
      {
        label: "Charles University Ethics Commission statement No. 1/2025",
        url: "https://cuni.cz/UK-5554-version1-stanovisko1_2025web.pdf",
        resourceClass: "Representative institutional statement",
        scope: "Code-of-ethics compliance",
        caseLevelInfo:
          "Public reasoned statement on an academic-expression ethics submission, concluding no Code of Ethics breach",
        comment:
          "Quality-control example for the archive; code as university ethics practice rather than national misconduct adjudication."
      },
      {
        label: "Charles University Ethics Commission Code of Procedure",
        url: "https://cuni.cz/UKEN-1010.html",
        resourceClass: "Publication-basis procedure",
        scope: "Code-of-ethics compliance",
        caseLevelInfo:
          "Defines submissions to the Ethics Commission and the publication logic used by the statements archive",
        comment:
          "Links the visible archive to a committee procedure rather than treating it as ad hoc publication."
      },
      {
        label: "GA CR EXPRO 2027 tender document",
        url: "https://gacr.cz/wp-content/uploads/2026/03/TD_EXPRO_2027.pdf",
        resourceClass: "Funder condition",
        scope: "Grant proposals and host institutions",
        caseLevelInfo: "Shows funding consequences for code breaches",
        comment: "Strong evidence of funder enforcement leverage, but not a public case archive."
      },
      {
        label: "SUKL clinical-trial legal-regulations page",
        url: "https://sukl.gov.cz/en/en-narizeni-evropskeho-parlamentu-a-rady-eu-c-536-2014/legal-regulations-govering-clinical-trials/",
        resourceClass: "Regulatory boundary",
        scope: "Clinical trials",
        caseLevelInfo: "Approval route, not misconduct case archive",
        comment: "Keeps clinical-trial ethics separate from research-integrity complaints."
      }
    ]
  },
  {
    id: "denmark",
    country: "Denmark",
    score: 4,
    tier: "Structured archive",
    mainBody: "Danish Board on Research Misconduct",
    coverage: "National",
    publicAccess: "Yes",
    publicationModel: "Structured board decisions archive",
    format: "HTML + linked files",
    hasArchive: true,
    keyNote: "Statutory board with public decisions archive.",
    sourcePath: "data/transparency_research_integrity_europe_overview.docx",
    sourceDate: "2026-04-17",
    resources: [
      {
        label: "Decisions of the Danish Board on Research Misconduct",
        url: "https://ufsn.dk/english/about-us/councils-and-commissions/the-danish-board-on-research-misconduct/decisions/",
        resourceClass: "Structured decision archive",
        scope: "National",
        caseLevelInfo: "Board decisions (anonymised)",
        comment: "Statutory national publication route."
      }
    ]
  },
  {
    id: "estonia",
    country: "Estonia",
    score: 2,
    tier: "Low misconduct-case publication with ethics-approval and boundary traces",
    mainBody:
      "ETAG misconduct reporting and second-opinion route, ETAG Research Ethics Committee / ETIS approval logic, University of Tartu and TAI approval lists, and EBIN, CTIS, AKI and animal-research boundary routes.",
    coverage:
      "National statutory route plus institutional and specialist boundary lanes. General misconduct visibility is prospective and generalized; ethics-approval and boundary records are more visible.",
    publicAccess:
      "Moderate for rules, committee pages, approval lists and boundary registers; weak for published misconduct findings or sanctions.",
    publicationModel:
      "Generalized misconduct outcome publication and annual aggregate statistics are required, but no public misconduct-decision archive was found. Public case-like material is strongest in ethics approval lists and specialist boundary databases.",
    format:
      "Official web pages, law pages, PDF and DOCX approval lists, annual reports and specialist registers",
    hasArchive: false,
    keyNote:
      "Estonia is publicly legible through ethics-review infrastructure rather than a misconduct archive: UT and TAI publish approval/decision lists, while the new ETAG misconduct route has not yet produced individual public case files.",
    sourcePath: "data/transparency_research_integrity_europe_overview.docx",
    sourceDate: "2026-04-23",
    resources: [
      {
        label: "ETAG research misconduct route",
        url: "https://etag.ee/en/research-culture/research-integrity/research-misconduct/",
        resourceClass: "National misconduct intake and second-opinion route",
        scope: "National statutory misconduct-events committee route",
        caseLevelInfo:
          "Procedure, reporting address, institutional referral and second-opinion route; no individual case archive found",
        comment:
          "Best current source for the general misconduct handling route after the TAIKS transition."
      },
      {
        label: "Committee procedure regulation",
        url: "https://www.riigiteataja.ee/akt/109122025016",
        resourceClass: "Publication rule",
        scope: "National research ethics and misconduct-events committees",
        caseLevelInfo:
          "Requires generalized publication of commission proceedings/results and annual aggregate institutional statistics",
        comment:
          "This creates a public-output duty but is not evidence of a live case archive yet."
      },
      {
        label: "University of Tartu issued approvals",
        url: "https://ut.ee/et/sisu/teaduseetika-komitee",
        resourceClass: "Institutional approval-list archive",
        scope: "UT ethics approvals from 2014 to 2025 and the 2026 institutional route",
        caseLevelInfo:
          "Approval-list publication for ethics review, not misconduct sanctions",
        comment:
          "One of the strongest official institutional publication lanes found for Estonia."
      },
      {
        label: "TAI Human Research Ethics Committee decisions",
        url: "https://www.tai.ee/et/instituudist/tai-inimuuringute-eetikakomitee",
        resourceClass: "Institutional approval-list archive",
        scope: "TAI human-research ethics decisions and transition notice",
        caseLevelInfo:
          "Annual decision files for human-research review, not misconduct decisions",
        comment:
          "Shows recurring official publication of committee decision lists."
      },
      {
        label: "EBIN ministry page",
        url: "https://www.sm.ee/eesti-bioeetika-ja-inimuuringute-noukogu",
        resourceClass: "Human-genes and health-data boundary route",
        scope: "EBIN competence, forms, annual reports and transition to ETAG",
        caseLevelInfo:
          "Boundary application and annual-report material rather than general misconduct files",
        comment:
          "Important for the Human Genes Act and biobank transparency lane."
      }
    ]
  },
  {
    id: "finland",
    country: "Finland",
    score: 4,
    tier: "Structured archive",
    mainBody: "TENK",
    coverage: "National",
    publicAccess: "Yes",
    publicationModel: "Structured statement-summary archive",
    format: "HTML summaries",
    hasArchive: true,
    keyNote: "Stable archive of statement summaries.",
    sourcePath: "data/transparency_research_integrity_europe_overview.docx",
    sourceDate: "2026-04-17",
    resources: [
      {
        label: "TENK statement summaries",
        url: "https://tenk.fi/en/research-integrity/tenks-statement-summaries",
        resourceClass: "Structured summary archive",
        scope: "National",
        caseLevelInfo: "Statement summaries",
        comment: "Stable archive of summaries rather than full case files."
      }
    ]
  },
  {
    id: "france",
    country: "France",
    score: 3,
    tier: "National aggregate monitoring plus selective operator case reports",
    mainBody:
      "Ofis national synthesis and RIS directory, CNRS/MIS selective report publication, Inadis second-look route, and institutional annual reports or procedure pages.",
    coverage:
      "National aggregate handling data, live handler-directory visibility, selected CNRS operator reports, and local institutional activity reporting; no unified national decision archive.",
    publicAccess: "Yes",
    publicationModel:
      "Aggregate national monitoring plus selective operator and institutional publication rather than a searchable national misconduct decision database.",
    format: "Web, PDF synthesis, selective operator reports, institutional annual reports",
    hasArchive: false,
    keyNote:
      "France has more public case-material visibility than the original transparency overview suggested: Ofis publishes aggregate national handling evidence, CNRS/MIS publishes selected reports, and some institutions publish annual activity. The 29 April 2026 quality pass confirmed the same distributed/selective model against ENRIO and current Ofis material; it still is not a national archive.",
    sourcePath: "data/transparency_research_integrity_europe_overview.docx",
    sourceDate: "2026-04-29",
    resources: [
      {
        label: "Ofis surveys page",
        url: "https://www.ofis-france.fr/les-enquetes-de-lofis/",
        resourceClass: "National monitoring hub",
        scope: "National",
        caseLevelInfo: "Aggregate reporting and survey outputs, not individual case files",
        comment: "Entry point for the 2022-2023 national synthesis."
      },
      {
        label: "Ofis synthesis 2022-2023",
        url:
          "https://www.ofis-france.fr/wp-content/uploads/2025/06/Ofis-Synthese-bisannuelle-2022-2023-traitement-manquements-integrite-scientifique.pdf",
        resourceClass: "National aggregate report",
        scope: "Responding higher education and research institutions",
        caseLevelInfo: "Counts, categories and patterns rather than reasoned decisions",
        comment: "Best national source for aggregate visibility of handled integrity matters."
      },
      {
        label: "Ofis RIS directory",
        url: "https://www.ofis-france.fr/annuaire/",
        resourceClass: "National handler directory",
        scope: "Named institutional RIS network",
        caseLevelInfo: "Handler visibility only; not a case-output archive",
        comment: "Recorded 187 RIS on 23 April 2026."
      },
      {
        label: "Ofis 2026 bilan and perspectives",
        url:
          "https://www.ofis-france.fr/promouvoir-et-proteger-une-culture-partagee-de-lintegrite-scientifique-bilan-et-perspectives/",
        resourceClass: "Current-source signal",
        scope: "National",
        caseLevelInfo:
          "No case-level output; current context for Ofis review of the 2021-2026 integrity landscape",
        comment:
          "Useful for source currency and future regulatory watch, not for case-publication coding."
      },
      {
        label: "CNRS MIS reports",
        url: "https://mis.cnrs.fr/rapports/",
        resourceClass: "Selective operator case-report page",
        scope: "CNRS-scope public reports and recommendations",
        caseLevelInfo:
          "Selected report outputs and recommendations with retention/request limits; not a national archive",
        comment:
          "Strongest file-level France lane found, but only for selected CNRS outputs."
      },
      {
        label: "Sorbonne Universite 2025 integrity annual report",
        url:
          "https://www.sorbonne-universite.fr/sites/default/files/media/2025-12/integrite_scientifique_rapport_activite_2025.pdf",
        resourceClass: "Institutional annual report",
        scope: "Sorbonne Universite",
        caseLevelInfo: "Annual activity and signalement evidence, not full decisions",
        comment: "Representative local annual-report corridor."
      }
    ]
  },
  {
    id: "germany",
    country: "Germany",
    score: 3,
    tier: "Funder case-publication list plus ombuds and institutional annual reports",
    mainBody:
      "DFG scientific-misconduct press-release list, DFG misconduct procedure, OWID annual reports, selected institutional annual reports or ombuds pages, and research-organization procedure routes.",
    coverage:
      "DFG-funded and DFG-handled cases, national ombuds advice and mediation reporting, institutional ombuds/procedure pages, selected university annual reports, shared institutional routes, and non-university research-organization ombuds routes.",
    publicAccess: "Yes",
    publicationModel:
      "Stable DFG press-release list for selected funder-jurisdiction cases, OWID aggregate annual reporting, and scattered institutional annual-report or procedure evidence rather than a consolidated national decision database.",
    format: "Web, curated press-release list, individual press releases, annual-report PDFs, procedure pages",
    hasArchive: false,
    keyNote:
      "Germany has a public case-publication ladder rather than a national database: DFG publishes a stable list of scientific-misconduct press releases for its own jurisdiction, OWID publishes national aggregate ombuds reports, and selected universities publish local annual statistics. The 29 April 2026 quality pass adds Gottingen's 2025 annual-report route, Land-diverse procedure examples and deeper Fraunhofer/Max Planck research-organization routes. None covers all German institutional or research-organization decisions.",
    sourcePath: "data/transparency_research_integrity_europe_overview.docx",
    sourceDate: "2026-04-29",
    resources: [
      {
        label: "Ombuds Committee official site",
        url: "https://ombudsgremium.de/?lang=en",
        resourceClass: "Official publication hub",
        scope: "National",
        caseLevelInfo: "Procedural information and public reporting",
        comment: "No standalone public case database identified."
      },
      {
        label: "DFG press releases on scientific misconduct",
        url: "https://wissenschaftliche-integritaet.de/pressemitteilungen-wiss-fehlverhaltens/",
        resourceClass: "Stable funder case-publication list",
        scope: "DFG-related scientific-misconduct cases over the last ten years",
        caseLevelInfo:
          "Curated yearly list of DFG press releases with individual or grouped sanction outcomes",
        comment:
          "Strongest public case-publication route found for Germany, but limited to DFG jurisdiction."
      },
      {
        label: "DFG press release 08/2026",
        url: "https://www.dfg.de/de/aktuelles/neuigkeiten-themen/pressemitteilungen/2026/pressemitteilung-nr-08",
        resourceClass: "Case publication example",
        scope: "DFG sanction layer",
        caseLevelInfo:
          "Anonymized publication of a written reprimand and two-year exclusion from DFG proposal eligibility for idea theft",
        comment:
          "Shows the current form of DFG case publication in 2026."
      },
      {
        label: "DFG press release 20/2025",
        url: "https://www.dfg.de/en/service/press/press-releases/2025/press-release-no-20",
        resourceClass: "Case publication example",
        scope: "DFG sanction layer",
        caseLevelInfo:
          "Named public case notice with written reprimands and a one-year DFG proposal ban in an image-manipulation case",
        comment:
          "Shows that DFG case publication may include named researchers in some high-profile cases."
      },
      {
        label: "OWID annual reports page",
        url: "https://ombudsgremium.de/category/ombudsman/jahresberichte/",
        resourceClass: "Annual reporting hub",
        scope: "National ombuds layer",
        caseLevelInfo:
          "Yearly summaries and statistics, not a searchable finding-by-finding archive",
        comment:
          "Best recurring public trace for the national ombuds layer."
      },
      {
        label: "OWID annual reports download page",
        url: "https://ombudsgremium.de/2030/owid-jahresberichte/",
        resourceClass: "Annual report download hub",
        scope: "National ombuds layer",
        caseLevelInfo:
          "Download sequence from 2000 through 2024; aggregate reporting and thematic reflection rather than individual decisions",
        comment:
          "Quality-pass source for future bulk indexing of the national ombuds reporting series."
      },
      {
        label: "Freie Universitat Berlin GWP annual report 2025",
        url: "https://refubium.fu-berlin.de/bitstream/handle/fub188/51748/Jahresbericht_GWP_2025_FUB.pdf?isAllowed=y&sequence=1",
        resourceClass: "Institutional annual report",
        scope: "Freie Universitat Berlin ombuds, KowIn and central ombuds route",
        caseLevelInfo:
          "Detailed aggregate tables by suspected misconduct category, faculty and career stage; no individual case files",
        comment:
          "Strong example of local annual-report transparency within the German distributed system."
      },
      {
        label: "Gottingen Ombudsstelle annual reports and 2025 report",
        url: "https://www.uni-goettingen.de/de/gute-wissenschaftliche-praxis--ombudsangelegenheiten-/223832.html",
        resourceClass: "Institutional annual report hub",
        scope: "University of Gottingen ombuds office",
        caseLevelInfo:
          "Current page links the 2025 annual report and a multi-year reporting sequence; reports cover ombuds activity, GWP conflicts and investigation-commission sections rather than full decisions",
        comment:
          "Shows that German local ombuds offices may publish recurring annual summaries while case files remain confidential."
      },
      {
        label: "Fraunhofer IPK scientific integrity",
        url: "https://www.ipk.fraunhofer.de/en/about-us/scientific-integrity.html",
        resourceClass: "Research-organization institute route",
        scope: "Fraunhofer institute-level ombuds route",
        caseLevelInfo:
          "Names local ombudspersons and tasks; not a public case archive",
        comment:
          "Quality-pass source for deepening the Fraunhofer institute-level route directory."
      },
      {
        label: "Berlin higher education shared ombuds office",
        url: "https://www.fu-berlin.de/presse/informationen/fup/2025/fup_25_058-berliner-hochschulen-ombudstelle/index.html",
        resourceClass: "Shared institutional route",
        scope: "Berlin higher-education institutions",
        caseLevelInfo:
          "Shared route can examine suspected misconduct when a higher education institution cannot do so itself; not a public case archive",
        comment:
          "Important emerging cross-institutional handling layer."
      }
    ]
  },
  {
    id: "greece",
    country: "Greece",
    score: 1,
    tier:
      "Low general misconduct publication with institutional aggregate lanes and boundary archives",
    mainBody:
      "Institutional EHDE and REC routes, NKUA and University of Macedonia activity reporting, IMBB/FORTH confidential integrity office, EOF National Ethics Committee and CTIS clinical-trial publication layer.",
    coverage:
      "Distributed institutional visibility plus stronger specialist clinical-trial publication; no national archive of general research-misconduct decisions located.",
    publicAccess:
      "Some for aggregate institutional activity and strong for selected clinical-trial boundary records; weak for individual general misconduct case files.",
    publicationModel:
      "No general national misconduct archive. Public traces are activity reports, complaint-procedure pages, advisory recommendations and boundary approval/opinion tables.",
    format:
      "Institutional report pages, committee pages, official PDFs, EOF archive pages, clinical-trial opinion tables and CTIS notices",
    hasArchive: false,
    keyNote:
      "Greece remains low for public general misconduct findings, but the case-file pass found meaningful official traces: NKUA reports 71 meetings and 213 decisions for 2018-23 January 2025, University of Macedonia exposes a 2019-2022 triennial report, and EOF publishes a clinical-trial ethics opinion/CTIS boundary lane that must be coded separately.",
    sourcePath: "data/Greece/raw documentation/source notes/Greece deep-dive sources.md",
    sourceDate: "2026-04-23",
    resources: [
      {
        label: "NKUA EHDE term activity report",
        url: "https://hub.uoa.gr/apologismos-thiteias-tis-epitropis-ithikis-kai-deontologias-tis-erevnas-tou-panepistimiou-athinon/",
        resourceClass: "Institutional activity report",
        scope: "University EHDE activity",
        caseLevelInfo:
          "Aggregate meeting and decision counts; no individual case files",
        comment:
          "Strongest general institutional activity-count lane found."
      },
      {
        label: "University of Macedonia EHDE triennial report",
        url: "https://www.uom.gr/11825-epitroph-hthikhs-kai-deontologias-ths-ereynas-apologismos-trietias-2019-2022",
        resourceClass: "Institutional activity report",
        scope: "University EHDE activity",
        caseLevelInfo:
          "Public report hub, not a named misconduct archive",
        comment:
          "Useful second official activity-report lane."
      },
      {
        label: "EOF National Ethics Committee archive",
        url: "https://old.eof.gr/web/guest/eed",
        resourceClass: "Boundary approval archive",
        scope: "Clinical-trial ethics opinions",
        caseLevelInfo:
          "Positive-opinion announcements and linked tables with EED and EU CT identifiers",
        comment:
          "Strong case-like boundary publication, not general RI misconduct."
      },
      {
        label: "EOF Part II assessment-report transition notice",
        url: "https://www.eof.gr/en/%CE%B1%CE%BD%CF%84%CE%B9%CE%BA%CE%B1%CF%84%CE%AC%CF%83%CF%84%CE%B1%CF%83%CE%B7-%CE%B5%CE%BD%CF%84%CF%8D%CF%80%CE%BF%CF%85-%CE%B3%CE%BD%CF%89%CE%BC%CE%BF%CE%B4%CF%8C%CF%84%CE%B7%CF%83%CE%B7%CF%82/",
        resourceClass: "Boundary publication-rule notice",
        scope: "CTIS clinical-trial assessment output",
        caseLevelInfo:
          "Official final Part II outcome is posted in CTIS",
        comment:
          "Publication-lifecycle note for the clinical boundary lane."
      }
    ]
  },
  {
    id: "hungary",
    country: "Hungary",
    score: 1,
    tier: "Low general misconduct publication with biomedical permit and institutional approval archives",
    mainBody: "MTA Science Ethics Committee (TeB), TUKEB and institutional REC examples",
    coverage: "Academy-led general route with specialist biomedical and institutional approval lanes",
    publicAccess: "Some",
    publicationModel: "No general misconduct archive; TeB publication basis and aggregate traces; TUKEB permit archive and Corvinus REC decisions in separate approval lanes",
    format: "Codes / report traces / permit pages / approval PDFs / authority register pages",
    hasArchive: true,
    keyNote: "No general national archive of misconduct findings was found. Store TeB publication-rule and report-corridor sources separately from extractable TUKEB permit pages, Corvinus approval decisions, ETT statements, NNGYK/CTIS clinical-trial routing and NEBIH animal reporting.",
    sourcePath: "data/Hungary/raw documentation/source notes/Hungary deep-dive sources.md",
    sourceDate: "2026-04-24",
    resources: [
      {
        label: "MTA Science Ethics Committee page",
        url: "https://mta.hu/hatteranyagok/tudomanyetikai-bizottsag-105786",
        resourceClass: "National committee page",
        scope: "General scientific-integrity governance",
        caseLevelInfo:
          "Mandate, composition and contact route; no public decision archive on the page",
        comment:
          "Anchor for the national special route."
      },
      {
        label: "MTA Science Ethics Code 2024",
        url: "https://mta.hu/data/dokumentumok/egyeb_dokumentumok/2025/Tudomanyetikai_Kodex_2024_angol_VEGLEGES.pdf",
        resourceClass: "Publication-basis PDF",
        scope: "General scientific-integrity governance",
        caseLevelInfo:
          "Publication basis for selected definitive decisions and general principle statements",
        comment:
          "Rule-level evidence, not a live archive."
      },
      {
        label: "TUKEB permit archive hub",
        url: "https://ett.okfo.gov.hu/tukeb/",
        resourceClass: "Specialist permit archive hub",
        scope: "Biomedical research-ethics publication",
        caseLevelInfo:
          "Links annual issued-permit pages from 2010 through 2025",
        comment:
          "High-priority extraction target in a boundary approval lane."
      },
      {
        label: "Corvinus REC resolutions page",
        url: "https://www.uni-corvinus.hu/main-page/about-the-university/senate-university-committees/kutatasetikai-bizottsag/resolutions/?lang=en",
        resourceClass: "Institutional approval archive",
        scope: "University research-ethics approval",
        caseLevelInfo:
          "Public decision PDFs with approval fields",
        comment:
          "Institutional approval archive, not misconduct findings."
      },
      {
        label: "NNGYK clinical-trials register page",
        url: "https://ogyei.gov.hu/klinikai_vizsgalatok_nyilvantartasa/klinikai_vizsgalatok",
        resourceClass: "Boundary register route",
        scope: "Medicinal-product clinical trials",
        caseLevelInfo:
          "Routes current public clinical-trial records to CTIS",
        comment:
          "Clinical-trial transparency route, not general misconduct publication."
      }
    ]
  },
  {
    id: "iceland",
    country: "Iceland",
    score: 2,
    tier: "Statutory national body without located public archive",
    mainBody:
      "Committee on Good Scientific Practice, with boundary visibility through National Bioethics Committee licences, Landspitali and HH health-research committees, and IRF funding rules",
    coverage:
      "National good-scientific-practice law and annual-report duty, institutional notification and university committee routes, health-research licence lists, hospital/primary-care research approvals, data protection and funder compliance.",
    publicAccess:
      "Good for laws, committee routes, health-research licence searching and funder rules; weak for general misconduct outcomes because no public national opinion archive, annual-report archive or case repository was located.",
    publicationModel:
      "Legal duty for annual reporting and national opinions, but no located public general misconduct archive. Public visibility is instead distributed across procedure pages, university committee pages, health-research licence lists and funder-compliance rules.",
    format: "Law pages / official webpages / PDF handbook / licence-search page",
    hasArchive: false,
    keyNote:
      "The 24 April 2026 case-file pass upgrades Iceland from the earlier body-not-located label: Act No. 70/2019 creates a national Committee on Good Scientific Practice and an annual-report duty, but no public committee opinion or annual-report archive was found.",
    sourcePath: "data/Iceland/raw documentation/source notes/Iceland deep-dive sources.md",
    sourceDate: "2026-04-24",
    resources: [
      {
        label: "Act No. 70/2019 on good scientific practice",
        url: "https://www.althingi.is/lagas/nuna/2019070.html",
        resourceClass: "National statutory committee route",
        scope: "General research-integrity law, Committee on Good Scientific Practice, opinion route and annual-report duty",
        caseLevelInfo:
          "National opinion and annual-report route exists in law, but no public opinion or annual-report archive was located",
        comment: "Strongest general research-integrity route."
      },
      {
        label: "National Bioethics Committee issued licences",
        url: "https://island.is/en/o/national-bioethics-committee/Issued-licenses-for-scientific-research-in-the-health-field",
        resourceClass: "Boundary licence list",
        scope: "Issued health-research licences",
        caseLevelInfo:
          "Searchable licence visibility; English page states not all licences are displayed",
        comment: "Health-research approval visibility, not misconduct case publication."
      },
      {
        label: "Landspitali scientific research committees and boards",
        url: "https://island.is/en/o/landspitali/scientific-research-committees-and-boards",
        resourceClass: "Hospital committee directory",
        scope: "IRB, administrative research ethics, scientific council, medical research review and medicines committee routes",
        caseLevelInfo:
          "Committee and approval-route visibility; no misconduct outcome archive located",
        comment: "Boundary route for hospital research approvals."
      },
      {
        label: "Primary Health Care HH Science Committee",
        url: "https://island.is/en/o/hh/scientific-research/hh-science-committee",
        resourceClass: "Health-service research committee",
        scope: "Scientific research at Primary Health Care of the Capital Area",
        caseLevelInfo:
          "Ethical assessment and possible project rejection even after national bioethics approval",
        comment: "Local health-service approval route, not a public misconduct archive."
      },
      {
        label: "IRF Handbook for grant year 2026",
        url: "https://en.rannis.is/media/rannsoknasjodur/IRF_Handbook.pdf",
        resourceClass: "Funder compliance route",
        scope: "Permits, approvals, conflicts, data management, open access and misconduct",
        caseLevelInfo:
          "Misconduct suspicion can trigger institution and IRF Board notification, withdrawal or independent investigation; no public decision archive located",
        comment: "Funding-stage consequence route."
      }
    ]
  },
  {
    id: "ireland",
    country: "Ireland",
    score: 2,
    tier: "Summary-based national reporting with procedure-rich institutional routes",
    mainBody: "National Research Integrity Forum annual statistics, IUA research-integrity portal, institutional RIO routes and Research Ireland grant terms",
    coverage: "National summary reporting on concluded formal investigations plus local institutional procedure pages at universities, technological universities, public RPOs and funders.",
    publicAccess: "Good for policy, guidance, annual aggregate statistics and institutional route design; weak for case-level reasoning because no public decision archive or ETH-style institutional repository was located.",
    publicationModel: "Annual anonymized national statistics reports and distributed institutional procedure fragments rather than individual public case reports.",
    format: "Web + PDF annual statistics + institutional policy/procedure pages",
    hasArchive: false,
    keyNote:
      "The 24 April 2026 case-file pass upgrades Ireland from body-only visibility to summary-based transparency: NRIF publishes an annual statistics archive for formal investigations from 2016 through 2023, but institutional searches found RIO/procedure fragments rather than public case reports or a searchable decision repository.",
    sourcePath: "data/Ireland/raw documentation/source notes/Ireland deep-dive sources.md",
    sourceDate: "2026-04-24",
    resources: [
      {
        label: "IUA research integrity and NRIF page",
        url: "https://www.iua.ie/for-researchers/research-integrity/",
        resourceClass: "National coordination and annual statistics hub",
        scope: "National policy, NRIF guidance, training and annual formal-investigation statistics",
        caseLevelInfo: "Annual statistics reports from 2016 through 2023; no individual decisions",
        comment: "Strongest Irish public transparency route."
      },
      {
        label: "National statistics on formal investigations 2023",
        url: "https://www.iua.ie/wp-content/uploads/2025/07/National-Stats-on-Formal-Investigations-of-Research-Misconduct-2023.pdf",
        resourceClass: "National annual statistics report",
        scope: "Formal investigations concluded in 2023 by participating Irish RPOs",
        caseLevelInfo: "Five concluded investigations and three upheld cases, grouped by allegation category",
        comment: "Representative report proving summary-based national publication."
      },
      {
        label: "Research Ireland grant terms and conditions",
        url: "https://media.researchireland.ie/wp-content/uploads/2026/01/Grant-Terms-and-Conditions.pdf",
        resourceClass: "Current funder terms",
        scope: "Research Ireland compliance, research-misconduct definitions and grant consequences",
        caseLevelInfo: "Funder compliance and notification route, not public case publication",
        comment: "Updates the post-merger funder lane beyond legacy SFI/IRC sources."
      },
      {
        label: "DCU Research Integrity",
        url: "https://www.dcu.ie/research/research-integrity-dcu",
        resourceClass: "Institutional RIO route",
        scope: "RIO contact, procedure, anonymous-reporting option and indicative handling timeline",
        caseLevelInfo: "Procedure and route details; no public outcome archive located",
        comment: "One of the clearer Irish institutional route fragments."
      },
      {
        label: "TUS Research Integrity",
        url: "https://tus.ie/rdi/research/research-integrity/",
        resourceClass: "Technological-university RIO route",
        scope: "Training, policy links, RIO contact and formal allegation form",
        caseLevelInfo: "Procedure and allegation route; no public outcome archive located",
        comment: "Useful for widening beyond the original university sample."
      },
      {
        label: "National College of Ireland research misconduct procedures",
        url: "https://ncisupporthub.ncirl.ie/hc/en-ie/articles/23168427493532-Research-Misconduct-Procedures",
        resourceClass: "Institutional procedure page",
        scope: "Two-stage inquiry/investigation/appeal route and records/publication language",
        caseLevelInfo: "Publication basis through FOI-style language, but no live repository located",
        comment: "Interesting fragment because it mentions possible final-report publication."
      }
    ]
  },
  {
    id: "italy",
    country: "Italy",
    score: 3,
    tier: "Micro-publication nodes without a national misconduct archive",
    mainBody:
      "CNR Research Ethics and Integrity Committee / RI Unit, university committees, Sapienza governance minutes, AIFA and local clinical-study pages, CNB opinions and Garante decisions.",
    coverage:
      "Distributed institutional and boundary-regime visibility: CNR documents and responses, university committee pages or annual reports, clinical-trial open data, bioethics opinions and data-protection decisions.",
    publicAccess:
      "Strong for selected official micro-publication nodes; weak for public finding-by-finding publication of general research-misconduct outcomes.",
    publicationModel:
      "No general national misconduct archive. Publication is scattered across CNR documents, AIFA CSV/open-data and OsSC pages, institutional committee pages or annual reports, restricted university records, CNB opinions and Garante decisions.",
    format: "Official webpages, PDFs, CSV/open-data, annual report, restricted-record notice",
    hasArchive: false,
    keyNote:
      "Italy confirms the micro-publication-node problem: many small official data, opinion, study-level or governance-minutes sources exist, but most are approval, advisory, regulatory or institutional traces rather than misconduct case files. Code public fields and non-public/restricted fields separately.",
    sourcePath: "data/transparency_research_integrity_europe_overview.docx",
    sourceDate: "2026-04-23",
    resources: [
      {
        label: "CNR ethics documents archive",
        url: "https://www.cnr.it/en/doc-ethics",
        resourceClass: "Institutional document archive",
        scope: "CNR and CNR-adjacent general-integrity advice",
        caseLevelInfo:
          "Guidelines, opinions and responses, including advice on alleged misconduct, but not a searchable outcome archive",
        comment:
          "Strongest openly accessible general-integrity material located for Italy."
      },
      {
        label: "Sapienza Senate minutes, 10 December 2024",
        url: "https://www2.uniroma1.it/senatoaccademico/verbali/verbale2024-12-10.htm",
        resourceClass: "Institutional governance-minutes case trace",
        scope: "University ethics-commission matter and Senate outcome",
        caseLevelInfo:
          "Anonymized initials-based ethics/conduct matter, cited code basis and formal-warning outcome; underlying Ethics Commission material is not public",
        comment:
          "Incidental case-like visibility, not a searchable misconduct archive."
      },
      {
        label: "AIFA clinical-trials open data",
        url: "https://www.aifa.gov.it/sperimentazioni-cliniche",
        resourceClass: "Boundary-regime open data",
        scope: "Medicinal-product clinical trials",
        caseLevelInfo:
          "CSV/open-data for ongoing, concluded, non-approved and withdrawn trials",
        comment:
          "Structured and public, but it is clinical-trial authorization data rather than misconduct adjudication."
      },
      {
        label: "Parma Ethics Committee APIDULCIS study page",
        url: "https://www.ao.pr.it/comitatoetico/studio/studio-apidulcis/",
        resourceClass: "Boundary-regime study-level record",
        scope: "Local clinical-study ethics review",
        caseLevelInfo:
          "Study title/acronym, protocol, sponsor/promoter, investigator or unit and opinion/request status for one study",
        comment:
          "Study-level clinical-ethics record, not a misconduct case file."
      },
      {
        label: "UNIVPM Research Ethics Committee annual report 2024",
        url: "https://www.univpm.it/Entra/Engine/RAServeFile.php/f/com_etico_ric/Relazione_Comitato_Etico_DEF%281%29.pdf",
        resourceClass: "Institutional annual report",
        scope: "University research-ethics committee activity",
        caseLevelInfo:
          "Annual committee activity and counts, not individual misconduct decisions",
        comment:
          "Best Italian institutional annual-report micro-publication node found in this pass."
      },
      {
        label: "University of Milan Ethics Committee",
        url: "https://www.unimi.it/it/ateneo/governance-e-linee-strategiche/organi-di-governo/comitato-etico",
        resourceClass: "Institutional committee page",
        scope: "Research-project ethics and non-disciplinary ethics/integrity opinions",
        caseLevelInfo:
          "Public page states that committee minutes are available only with restricted access through Unimibox",
        comment:
          "Useful negative evidence because it explains where the record exists and why the public trail stops."
      },
      {
        label: "Garante Privacy Doc-Web 10057629",
        url: "https://www.garanteprivacy.it/web/guest/home/docweb/-/docweb-display/docweb/10057629",
        resourceClass: "Boundary-regime decision",
        scope: "Health and scientific-research data protection",
        caseLevelInfo:
          "Reasoned public data-protection decision",
        comment:
          "Case-level publication exists in the data-protection lane, not the general research-misconduct lane."
      },
      {
        label: "Italian Committee for Bioethics opinions and responses",
        url: "https://bioetica.governo.it/en/opinions/opinions-responses/",
        resourceClass: "National advisory opinion archive",
        scope: "Bioethics opinions and responses",
        caseLevelInfo:
          "Public advisory opinions, not project misconduct findings",
        comment:
          "Boundary-regime opinion archive that should be coded separately from misconduct case files."
      }
    ]
  },
  {
    id: "kosovo",
    country: "Kosovo",
    score: 1,
    tier:
      "Low general misconduct publication with QA report and institutional micro-publication lanes",
    mainBody:
      "No national misconduct board located; KAA publishes quality-assurance decisions and reports, while UP supplies the clearest institutional ethics-case traces.",
    coverage:
      "KAA decisions, expert reports, monitoring and post-accreditation reports, SCQ meeting notices, Appeals Committee activity, UP Ethics Council and disciplinary routes, and selected data-protection boundary records.",
    publicAccess:
      "Moderate for accreditation and quality-assurance records, low for general research-misconduct findings.",
    publicationModel:
      "Public QA decision/report corridors plus isolated institutional ethics notices rather than a searchable national misconduct archive.",
    format: "Official pages, PDFs, annual report, institutional news notices and boundary decision pages",
    hasArchive: false,
    keyNote:
      "The 26 April 2026 Kosovo pass found no national general misconduct archive. The public trail is strongest through KAA's accreditation decision/report corridors and UP's isolated ethics-case notices, especially the 2 May 2025 notice about an 18 April 2025 Ethics Council decision.",
    sourcePath: "data/Kosovo/raw documentation/source notes/Kosovo deep-dive sources.md",
    sourceDate: "2026-04-26",
    resources: [
      {
        label: "KAA accredited HEI decision hub",
        url: "https://akreditimi.rks-gov.net/decision_v1/",
        resourceClass: "QA decision and report hub",
        scope: "Institution-by-institution accreditation decisions and expert reports",
        caseLevelInfo:
          "Links public SCQ decisions and expert reports by institution, including a 2025 UP institutional expert report",
        comment:
          "Strong public QA file corridor, but not a general misconduct decision archive."
      },
      {
        label: "KAA reports page and 2025 annual report",
        url: "https://akreditimi.rks-gov.net/about-kaa/legal-provisions-and-responsibilities/documentation/",
        resourceClass: "Annual-report corridor",
        scope: "SCQ, KAA and Appeals Committee activity",
        caseLevelInfo:
          "The 2025 annual report records SCQ decisions, requests, complaints, appeals and Appeals Committee decision-making",
        comment:
          "Aggregate QA and appeal visibility, not individual research-misconduct outcomes."
      },
      {
        label: "KAA monitoring reports",
        url: "https://akreditimi.rks-gov.net/monitoring/",
        resourceClass: "Monitoring report hub",
        scope: "HEI and programme monitoring",
        caseLevelInfo: "Public monitoring reports by year for 2023 and 2024",
        comment:
          "Implementation and quality-assurance evidence; keep separate from misconduct publication."
      },
      {
        label: "UP Ethics Council decision notice, 2 May 2025",
        url: "https://uni-pr.edu/page.aspx?id=1%2C38%2C3383",
        resourceClass: "Institutional case notice",
        scope: "University of Prishtina Ethics Council",
        caseLevelInfo:
          "Public notice says the Ethics Council rejected claims about a 2022 promotion/conflict-of-interest matter by decision dated 18 April 2025",
        comment:
          "Strongest located UP ethics case notice, but not a full decision archive."
      },
      {
        label: "AIP decisions page",
        url: "https://aip.rks-gov.net/en/decisions/",
        resourceClass: "Boundary decision page",
        scope: "Personal data and access-to-documents route",
        caseLevelInfo:
          "Shows public decision publication infrastructure in a boundary lane",
        comment:
          "Privacy/access transparency, not research-misconduct handling."
      }
    ]
  },
  {
    id: "latvia",
    country: "Latvia",
    score: 3,
    tier: "Fragmented institutional decision stream plus boundary visibility",
    mainBody:
      "No single national case-publication body found; national norm is LAS/LCS code-based, while the clearest public case-like material is the University of Latvia Academic Ethics Commission decision list.",
    coverage:
      "National legal/code framework, LCS/LAS normative route, UL Academic Ethics Commission decisions, selected university research-ethics approval pages, medical ethics, animal-use and open-science/data/AI sources.",
    publicAccess:
      "Good for UL institutional academic-ethics decisions and research-ethics approval registers; weak for national LAS/LCS outcomes and most other institutions.",
    publicationModel:
      "Institutional decision-list publication and approval/opinion registers rather than a national misconduct database.",
    format: "Official web pages and PDFs",
    hasArchive: true,
    keyNote:
      "Latvia is now coded as fragmented institutional case visibility: UL publishes Academic Ethics Commission decisions, but no current national LAS/LCS case archive was found and research-ethics approval registers remain a separate boundary lane.",
    sourcePath: "data/Latvia/raw documentation/source notes/Latvia deep-dive sources.md",
    sourceDate: "2026-04-24",
    resources: [
      {
        label: "Code of Ethics for Scientists",
        url: "https://www.lza.lv/images/Documents/2_Code_Of_Ethics_For_Scientists_ENG.pdf",
        resourceClass: "National code",
        scope: "LAS/LCS national scientist ethics norm",
        caseLevelInfo:
          "Creates a joint committee route but does not publish a case archive",
        comment: "Main national normative source."
      },
      {
        label: "University of Latvia Academic Ethics Commission decisions",
        url: "https://www.lu.lv/par-mums/akademiskas-etikas-komisija/",
        resourceClass: "Institutional decision list",
        scope: "University academic ethics and integrity",
        caseLevelInfo: "Dated public decisions from 2019 through 2026",
        comment: "Strongest public case-like route located for Latvia."
      },
      {
        label: "University of Latvia 7 January 2025 co-authorship decision",
        url: "https://www.lu.lv/par-mums/akademiskas-etikas-komisija/07012025-par-lidzautoribas-parkapumu/",
        resourceClass: "Representative institutional decision",
        scope: "Authorship and academic ethics",
        caseLevelInfo:
          "Anonymized decision finding an academic-ethics breach and recommending publication and referral actions",
        comment: "Shows why the UL page is more than a committee-route page."
      },
      {
        label: "LAS Proceedings Code of Ethics page",
        url: "https://www.lasproceedings.lv/zinatnieka-etikas-kodekss/",
        resourceClass: "Historical/code trace",
        scope: "LAS/LCS code and ethics-route history",
        caseLevelInfo:
          "Historical and code publication evidence, not a current case archive",
        comment: "Use as context for the national route."
      },
      {
        label: "University of Latvia research ethics",
        url: "https://www.lu.lv/en/science/research-support/research-ethics/",
        resourceClass: "Institutional committee hub",
        scope: "University research ethics",
        caseLevelInfo: "Forms, committees and opinions, not misconduct cases",
        comment: "Best institutional route map."
      },
      {
        label: "RSU Research Ethics Committee",
        url: "https://www.rsu.lv/en/research-ethics-committee",
        resourceClass: "Medical research ethics committee",
        scope: "University and biomedical research",
        caseLevelInfo: "Approvals and permits",
        comment:
          "Also maps clinical, CMEC, ZVA and genome boundaries."
      },
      {
        label: "RTU Research Ethics Committee",
        url: "https://www.rtu.lv/en/research/research-ethics-committee-of-rtu",
        resourceClass: "Institutional research ethics committee",
        scope: "Technical university research ethics",
        caseLevelInfo: "Monthly review route, not misconduct cases",
        comment: "Useful technical-university committee example."
      },
      {
        label: "LBTU Academic Integrity Regulation",
        url: "https://www.lbtu.lv/sites/default/files/2024-06/Academic_integrity_regulation_2023_ar_groz_EN.pdf",
        resourceClass: "Institutional regulation",
        scope: "Academic integrity and ethics committee route",
        caseLevelInfo: "Breach handling and sanctions",
        comment: "Strong institutional academic-integrity source."
      },
      {
        label: "Central Medical Ethics Committee",
        url: "https://www.vm.gov.lv/lv/centrala-medicinas-etikas-komiteja",
        resourceClass: "National specialist ethics body",
        scope: "Medical research ethics",
        caseLevelInfo: "Composition and remit, not misconduct cases",
        comment: "Important biomedical boundary institution."
      }
    ]
  },
  {
    id: "lithuania",
    country: "Lithuania",
    score: 4,
    tier: "Structured national decision archive with retention limits",
    mainBody: "Office of the Ombudsperson for Academic Ethics and Procedures",
    coverage:
      "National academic ethics and procedures decisions, complaints and investigations, annual reports, recommendations, guidelines, analytics, funder ethics and biomedical boundary sources.",
    publicAccess:
      "Yes. Decision metadata is announced immediately and depersonalized decision PDFs are published after the appeal period, but appealed decisions can be withheld or removed during proceedings and online availability is time-limited.",
    publicationModel:
      "Staged national publication model: immediate decision metadata, depersonalized PDF decisions after the appeal window, one-year online availability, active pre-decision complaints/investigations list, activity reports, analytical reviews and public guidance documents.",
    format: "HTML archive and official PDFs",
    hasArchive: true,
    keyNote:
      "Lithuania should be coded as a high-transparency ombudsperson model because national depersonalized decision files are visible; however, archive durability is appeal-sensitive and time-limited, and biomedical, funder and institutional routes remain partly separate from the Office archive.",
    sourcePath: null,
    sourceDate: "2026-04-23",
    resources: [
      {
        label: "Ombudsperson decisions archive",
        url: "https://etikostarnyba.lt/en/decisions/",
        resourceClass: "Structured decision archive",
        scope: "National academic ethics and procedures",
        caseLevelInfo:
          "Immediate decision metadata plus depersonalized PDF decisions when the publication stage has been reached",
        comment:
          "Core transparency source for Lithuania; publication is staged around the appeal period and online decision availability is time-limited."
      },
      {
        label: "Example depersonalized Ombudsperson decision, 12 June 2025 No. SP-4",
        url: "https://etikostarnyba.lt/wp-content/uploads/2026/02/2025-06-12-SP-4_-Nuasmenintas-sprendimas.pdf",
        resourceClass: "Representative public decision file",
        scope: "National academic ethics and procedures",
        caseLevelInfo: "Full depersonalized decision PDF",
        comment:
          "Representative proof that the archive can contain full depersonalized decision files, not only summaries."
      },
      {
        label: "Complaints and investigations",
        url: "https://etikostarnyba.lt/en/complaints-and-investigations/",
        resourceClass: "Investigation status page",
        scope: "National academic ethics and procedures",
        caseLevelInfo: "Open complaint/investigation subjects before final decision",
        comment:
          "Shows route visibility before a decision is reached; it must not be treated as a violation register."
      },
      {
        label: "Recommendations and guidelines",
        url: "https://etikostarnyba.lt/en/recommendations/",
        resourceClass: "National guidance hub",
        scope: "Academic ethics codes, ethical review, AI, science communication and events",
        caseLevelInfo: "Not case-level; preventive and harmonising guidance",
        comment:
          "Important because Lithuania's national layer actively shapes institutional systems."
      },
      {
        label: "Activity Report 2025",
        url: "https://etikostarnyba.lt/wp-content/uploads/2026/03/ACTIVITY-REPORT-FOR-2025.pdf",
        resourceClass: "Annual report",
        scope: "National Office operations",
        caseLevelInfo: "Aggregate complaint, consultation, training and analytical evidence",
        comment: "Latest annual-report source located during the sweep."
      },
      {
        label: "RCL Research Ethics Committee",
        url: "https://lmt.lrv.lt/en/science-quality/the-scientific-research-ethics-committee-of-the-research-council-of-lithuania/",
        resourceClass: "Funder ethics committee",
        scope: "Funding applications, reports, evaluations and RCL activity",
        caseLevelInfo: "Notifications and recommendations, not a public misconduct archive",
        comment: "Separate funder ethics layer."
      },
      {
        label: "Lithuanian Bioethics Committee",
        url: "https://bioetika.lrv.lt/en/about-us/",
        resourceClass: "National biomedical ethics authority",
        scope: "Biomedical research ethics and regional committee coordination",
        caseLevelInfo: "Approval and committee information, not Ombudsperson decisions",
        comment: "Specialist boundary route outside the general academic-ethics archive."
      }
    ]
  },
  {
    id: "luxembourg",
    country: "Luxembourg",
    score: 2,
    tier: "Summary-based national reporting with rare funder case signal",
    mainBody: "LARI / Commission for Research Integrity",
    coverage:
      "National route for LARI member organisations and FNR-funded research, with separate CNER and animal-use boundary reporting",
    publicAccess:
      "Yes for governance documents, aggregate annual reports, CNER reports and opinion lists, animal-use annual statistics and one rare FNR case communication; no public CRI decision archive",
    publicationModel:
      "Governance documents, aggregate annual reports and rare funder communications; confidential CRI final reports",
    format: "Official web pages and PDFs",
    hasArchive: false,
    keyNote:
      "Luxembourg remains summary-based: LARI reports aggregate practice and FNR has a rare public case communication, but CRI final reports are confidential and there is no searchable misconduct decision repository.",
    sourcePath: "data/Luxembourg/raw documentation/source notes/Luxembourg deep-dive sources.md",
    sourceDate: "2026-04-24",
    resources: [
      {
        label: "LARI about and governance documents",
        url: "https://lari.lu/about/",
        resourceClass: "National integrity office hub",
        scope: "LARI member organisations and FNR-funded research",
        caseLevelInfo: "Governance, CRI membership, statute, rules, data-sharing agreement, FNR MoU and annual reports",
        comment: "Core transparency source for the national research-integrity route."
      },
      {
        label: "LARI investigations",
        url: "https://lari.lu/investigation/",
        resourceClass: "Investigation procedure",
        scope: "Alleged research misconduct",
        caseLevelInfo: "Procedure, scope, confidentiality and reporting route; no public final-report archive",
        comment: "Defines the CRI route and the five-month target for investigations."
      },
      {
        label: "LARI annual report 2020-2022",
        url: "https://lari.lu/wp-content/uploads/2024/08/LARI_Annual-Report_2020-2022.pdf",
        resourceClass: "Annual report",
        scope: "National integrity activity",
        caseLevelInfo: "Aggregate case and request counts",
        comment: "Reports 7 opened cases, 6 closed cases, 1 continued case and 90 requests in the interim period."
      },
      {
        label: "FNR funding policies",
        url: "https://www.fnr.lu/our-funding-policies/",
        resourceClass: "Funder compliance route",
        scope: "FNR-funded research",
        caseLevelInfo: "Obligation to report well-founded suspicion to LARI and notify FNR",
        comment: "Connects the funder route to LARI."
      },
      {
        label: "FNR statement on CRI-investigated project",
        url: "https://www.fnr.lu/statement-regarding-allegations-of-research-misconduct-on-fnr-funded-project/",
        resourceClass: "Rare public case-level signal",
        scope: "FNR-funded project and LARI/CRI investigation",
        caseLevelInfo:
          "Public funder communication on a confidential CRI investigation; not part of a case archive",
        comment: "Best public case-level Luxembourg example located."
      },
      {
        label: "CNER publications",
        url: "https://cner.gouvernement.lu/en/publications.html",
        resourceClass: "Health research ethics publication hub",
        scope: "Health studies and ethics opinions",
        caseLevelInfo:
          "Favourable-opinion list through October 2025 and activity reports through 2024",
        comment: "Separate health-ethics transparency layer; not a LARI misconduct archive."
      },
      {
        label: "ALVA animal-use annual report 2024",
        url: "https://agriculture.public.lu/dam-assets/veroeffentlichungen/berichte/tiere/2024-alva-tiere-laboranalyse.pdf",
        resourceClass: "Animal research boundary report",
        scope: "Animals used for scientific purposes",
        caseLevelInfo:
          "Aggregate animal-use and authorisation statistics, not misconduct decisions",
        comment: "Separate authorisation and welfare boundary lane."
      }
    ]
  },
  {
    id: "malta",
    country: "Malta",
    score: 0,
    tier: "No national publication",
    mainBody: "No national body clearly located",
    coverage: "Institutional / policy",
    publicAccess: "No",
    publicationModel: "Guidelines / ethics procedures only",
    format: "Guidance PDFs",
    hasArchive: false,
    keyNote: "Ethics guidance public; no case archive found.",
    sourcePath: "data/transparency_research_integrity_europe_overview.docx",
    sourceDate: "2026-04-17",
    resources: []
  },
  {
    id: "netherlands",
    country: "Netherlands",
    score: 4,
    tier: "Structured archive",
    mainBody: "LOWI",
    coverage: "National appeal / advisory body",
    publicAccess: "Yes",
    publicationModel: "Structured opinions archive",
    format: "HTML archive",
    hasArchive: true,
    keyNote: "Mature public archive of opinions.",
    sourcePath: "data/transparency_research_integrity_europe_overview.docx",
    sourceDate: "2026-04-17",
    resources: [
      {
        label: "LOWI opinions archive",
        url: "https://lowi.nl/en/opinions/",
        resourceClass: "Structured opinion archive",
        scope: "National",
        caseLevelInfo: "Published opinions",
        comment: "One of the most mature public archives identified."
      }
    ]
  },
  {
    id: "norway",
    country: "Norway",
    score: 4,
    tier: "Parallel structured archives and register visibility",
    mainBody:
      "GRU for national misconduct statements, NEM for medical-health ethics appeal decisions, REK for project-register/postjournal visibility and institutions for first-instance handling.",
    coverage:
      "Strong for GRU public misconduct statements and NEM medical-health appeal decisions; moderate for REK project and document-register visibility; weaker for proactive publication of local institutional first-instance case files.",
    publicAccess:
      "High for GRU statements and NEM appeal decisions. REK project metadata and recent document journal information are public, while institutional misconduct case documents may be exempt while pending and accessible only after finalisation subject to confidentiality limits.",
    publicationModel:
      "Parallel publication model: GRU structured statements archive for final national misconduct statements, NEM structured appeal-decision database for medical-health research ethics, REK statutory project register and public postjournal, GRU annual reports for aggregate institutional reporting, and local institutional procedure/annual-report/public-document routes.",
    format: "HTML statement archive, structured HTML decision database, PDFs, public registers, postjournal entries and institutional procedure pages",
    hasArchive: true,
    keyNote:
      "Norway should be coded as high-transparency but route-specific. The strongest public case files are not all in one lane: GRU publishes national misconduct statements, NEM publishes medical-health appeal decisions, and REK exposes regulatory metadata rather than misconduct decisions.",
    sourcePath: null,
    sourceDate: "2026-04-23",
    resources: [
      {
        label: "GRU statements archive",
        url: "https://www.forskningsetikk.no/om-oss/komiteer-og-utvalg/granskingsutvalget/uttalelser/",
        resourceClass: "Structured misconduct statements archive",
        scope: "National misconduct appeal, own-initiative and statement layer",
        caseLevelInfo: "Full public statements, often with anonymisation and reasoning",
        comment: "Core Norwegian misconduct case-file source, but not the full local first-instance universe."
      },
      {
        label: "Representative GRU statement, case 2024/132",
        url: "https://www.forskningsetikk.no/om-oss/komiteer-og-utvalg/granskingsutvalget/uttalelser/uttalelse-2024-132/",
        resourceClass: "Representative public misconduct statement",
        scope: "National GRU appeal/statement route",
        caseLevelInfo: "Full final statement with misconduct, system-error and withdrawal/correction assessment",
        comment: "Used to prove publication depth and the local-to-national appeal route."
      },
      {
        label: "GRU Annual Report 2024",
        url: "https://www.forskningsetikk.no/globalassets/dokumenter/arsrapporter/gru/arsmelding-granskingsutvalget-2024.pdf/download",
        resourceClass: "Annual report with pipeline evidence",
        scope: "Appeals, institutional reports, inquiries and GRU operations",
        caseLevelInfo: "Aggregate and operational evidence rather than individual case files",
        comment: "Shows the institutional-reporting pipeline that is not fully visible through published statements."
      },
      {
        label: "NEM appeal decisions database",
        url: "https://www.forskningsetikk.no/om-oss/komiteer-og-utvalg/nem/sok-i-nems-vedtak/",
        resourceClass: "Structured boundary-regime decision database",
        scope: "Medical-health research ethics appeals from REK and REK KULMU",
        caseLevelInfo: "Searchable appeal decisions with summaries, details and filters",
        comment: "Strong public case-file lane, but it is a medical-health ethics appeal route rather than general misconduct."
      },
      {
        label: "REK project register and public journal source",
        url: "https://rekportalen.no/rek/hvordan-soke/",
        resourceClass: "Public register and access-route source",
        scope: "Medical-health research project metadata, recent document journal and access requests",
        caseLevelInfo: "Project metadata and document-journal visibility, not misconduct decisions",
        comment: "Important regulatory transparency source; should not be coded as a misconduct archive."
      }
    ]
  },
  {
    id: "poland",
    country: "Poland",
    score: 2,
    tier: "Summary-based",
    mainBody: "Committee on Ethics in Science (PAN)",
    coverage: "National committee / academy-led",
    publicAccess: "Yes",
    publicationModel: "Public opinions / activity; not structured archive",
    format: "Web / statements",
    hasArchive: false,
    keyNote: "Public outputs exist, but not a coherent case archive.",
    sourcePath: "data/transparency_research_integrity_europe_overview.docx",
    sourceDate: "2026-04-17",
    resources: [
      {
        label: "Ethics in Science page",
        url: "https://pan.pl/en/ethics-in-science/",
        resourceClass: "Official publication hub",
        scope: "National",
        caseLevelInfo: "Opinions and activity materials",
        comment: "Public outputs exist, but not as a structured case archive."
      }
    ]
  },
  {
    id: "portugal",
    country: "Portugal",
    score: 2,
    tier: "Institutional opinions and local aggregate reporting, no national archive",
    mainBody:
      "U.Porto CEUP public opinions and recommendations, Coimbra CEIUC annual reporting, CEIC clinical indicators, and local route pages anchored by CNECV's recommendation.",
    coverage:
      "Institutional and boundary-fragmented: public university opinion folders, local committee activity reporting, clinical-ethics indicators and route pages, but no unified national general-integrity archive.",
    publicAccess: "Yes, but uneven",
    publicationModel:
      "No national public misconduct archive. Publication runs through institutional opinion folders, local activity reports, clinical-ethics indicators and committee route pages.",
    format: "Web, institutional document folders and annual-report PDFs",
    hasArchive: false,
    keyNote:
      "Portugal is more public than the older transparency overview suggested: U.Porto exposes committee-route and folder visibility, Coimbra CEIUC publishes annual activity reporting, CEIC publishes clinical indicators, and FCT exposes transparency/reporting-channel routes. The 29 April 2026 quality pass confirmed that some CEUP opinions may require authentication and that no national general-misconduct archive was identified.",
    sourcePath: "data/transparency_research_integrity_europe_overview.docx",
    sourceDate: "2026-04-29",
    resources: [
      {
        label: "CNECV Recommendation 1/2018",
        url: "https://www.cnecv.pt/pt/deliberacoes/recomendacoes/integridade-na-investigacao",
        resourceClass: "National advisory page",
        scope: "National",
        caseLevelInfo: "Normative recommendation only",
        comment: "Important for coding the national gap and the advisory layer."
      },
      {
        label: "U.Porto CEUP page",
        url: "https://sigarra.up.pt/up/pt/p/como%20funciona%20a%20universidade%20do%20porto%3A%20comiss%C3%A3o%20de%20%C3%A9tica",
        resourceClass: "Institutional committee page",
        scope: "Institutional",
        caseLevelInfo: "States that documents, opinions and recommendations are available in SIGARRA",
        comment: "Shows that Portugal's strongest general-integrity publication lane is institutional."
      },
      {
        label: "U.Porto CEUP documents page",
        url: "https://sigarra.up.pt/up/pt/conteudos_geral.ver?pct_grupo=1200&pct_pag_id=1001669&pct_parametros=p_pagina%3D1001669",
        resourceClass: "Institutional opinion archive",
        scope: "Institutional",
        caseLevelInfo: "Approved opinions, own-initiative opinions and institutional-request opinions",
        comment: "Most concrete public opinion directory identified in Portugal's general-integrity lane."
      },
      {
        label: "CEIUC 2024 activity report",
        url: "https://www.uc.pt/site/assets/files/2074568/relatorio_ceiuc_2024.pdf",
        resourceClass: "Institutional annual report",
        scope: "Institutional",
        caseLevelInfo: "Aggregate requests, meetings and opinion handling",
        comment: "Shows local aggregate committee reporting rather than only governance text."
      },
      {
        label: "CEIC indicators page",
        url: "https://www.ceic.pt/web/ceic/indicadores-ceic",
        resourceClass: "Clinical ethics indicator archive",
        scope: "Boundary / clinical",
        caseLevelInfo: "Aggregate submissions, opinions and evaluation-time indicators",
        comment: "Strong official visibility signal, but it belongs to the clinical boundary lane."
      },
      {
        label: "FCT transparency policies",
        url: "https://www.fct.pt/en/sobre/politicas-de-transparencia/",
        resourceClass: "Funder transparency and compliance route",
        scope: "Funder / administrative",
        caseLevelInfo: "Reporting and compliance route, not a scientific-misconduct archive",
        comment: "Clarifies FCT's public compliance surface without changing the no-national-archive coding."
      },
      {
        label: "U.Porto Code of Ethics 2026",
        url: "https://www.up.pt/portal/documents/2090/Codigo_Etica_2026.pdf",
        resourceClass: "Institutional code",
        scope: "Institutional",
        caseLevelInfo: "Names improper research conduct and routes interpretive questions to CEUP; no case archive",
        comment: "Current institutional-code baseline for Portugal's strongest public route."
      }
    ]
  },
  {
    id: "romania",
    country: "Romania",
    score: 4,
    tier: "Structured archive",
    mainBody: "CNECSDTI",
    coverage: "National",
    publicAccess: "Yes",
    publicationModel: "Structured decisions and reports archive",
    format: "HTML + PDFs",
    hasArchive: true,
    keyNote: "Formal decisions and historical archives are public.",
    sourcePath: "data/transparency_research_integrity_europe_overview.docx",
    sourceDate: "2026-04-17",
    resources: [
      {
        label: "CNECSDTI decisions archive",
        url: "https://cnecsdti.research.gov.ro/hotarari/",
        resourceClass: "Structured decision archive",
        scope: "National",
        caseLevelInfo: "Formal decisions",
        comment: "Current archive of council decisions."
      },
      {
        label: "Historical decisions archive (2012-2015)",
        url: "https://cnecsdti.research.gov.ro/hotarari/hotarari-in-perioada-2012-2015/",
        resourceClass: "Structured historical archive",
        scope: "National",
        caseLevelInfo: "Historical decisions",
        comment: "Improves temporal continuity of public records."
      }
    ]
  },
  {
    id: "russia",
    country: "Russia",
    score: 3,
    tier:
      "Attestation-order and retraction databases without a general misconduct archive",
    mainBody:
      "Minobrnauki, VAK/GIS Nauka attestation-order and dissertation-card routes, RAS ethics and anti-falsification bodies, ANRI retraction database, institutional routes, and GRLS clinical-trial boundary register.",
    coverage:
      "National attestation and academy/professional routes plus institutional and specialist boundary lanes. Public case-like material is strongest in VAK/GIS Nauka orders and ANRI retraction records, not in a single general misconduct archive.",
    publicAccess:
      "Moderate for route architecture, indexed VAK/GIS Nauka material, ANRI retraction data and GRLS clinical-trial metadata; weak for general misconduct reasoning across all institutions; unstable for some VAK/GIS Nauka pages in this pass.",
    publicationModel:
      "Distributed publication of attestation-order PDFs, dissertation-card metadata, retraction database records, committee pages, institutional procedure pages and clinical-trial register data rather than a unified public archive of research-integrity decisions.",
    format:
      "Official order PDFs, portal/register pages, academy committee pages, professional retraction database, institutional pages and clinical-trial register",
    hasArchive: true,
    keyNote:
      "Russia should be coded as lane-specific public visibility: VAK/GIS Nauka is a high-priority official extraction target for attestation consequences, ANRI is a professional retraction database, and GRLS is a clinical boundary register. None of these is a general national misconduct archive.",
    sourcePath: "data/Russia/raw documentation/source notes/Russia deep-dive sources.md",
    sourceDate: "2026-04-24",
    resources: [
      {
        label: "VAK/GIS Nauka attestation orders",
        url: "https://vak.gisnauka.ru/diplomas-npa-certificates-evidence/orders",
        resourceClass: "Official attestation-order archive",
        scope: "National attestation, degree and council-consequence lane",
        caseLevelInfo:
          "Case-like ministry order stream, including degree-deprivation refusals and diploma or council consequence orders",
        comment:
          "Highest-priority official extraction target; page access was unstable locally, so representative PDFs are logged separately."
      },
      {
        label: "Representative VAK order No. 945/nk",
        url: "https://vak.gisnauka.ru/s3-files/01cc80c69fae4988a0246a8f5e2774e7%3Afisgna/public/media/uploaded/news_files/7b999188-9e03-4484-b522-34c15976b8a2/52742900-6304-4db5-b781-cd9384fa5723.pdf",
        resourceClass: "Official attestation case-like PDF",
        scope: "Degree-deprivation refusal route",
        caseLevelInfo:
          "Representative 2 October 2025 ministry order refusing degree deprivation after expert-council and VAK review",
        comment:
          "Representative file proving order-level depth behind the VAK/GIS Nauka hub."
      },
      {
        label: "VAK/GIS Nauka dissertation announcement list",
        url: "https://vak.gisnauka.ru/adverts-list",
        resourceClass: "Official dissertation metadata register",
        scope: "Dissertation announcement and attestation metadata lane",
        caseLevelInfo:
          "Defense and dissertation metadata rather than misconduct findings",
        comment:
          "Store for extraction, but keep it out of the general misconduct-publication score."
      },
      {
        label: "ANRI retracted-articles database",
        url: "https://rassep.ru/retracted/",
        resourceClass: "Professional retraction database",
        scope: "Publication ethics and retraction culture",
        caseLevelInfo:
          "Searchable article records with retraction dates and reasons",
        comment:
          "A real publication-ethics extraction target, but professional/editorial rather than state adjudication."
      },
      {
        label: "GRLS clinical-trial permissions register",
        url: "https://grls.rosminzdrav.ru/CIPermitionReg.aspx",
        resourceClass: "Clinical-trial boundary register",
        scope: "Clinical studies of medicinal products",
        caseLevelInfo:
          "Permit and status metadata, not research-misconduct decisions",
        comment:
          "Boundary database that should be extracted separately from the general attestation lane."
      }
    ]
  },
  {
    id: "slovakia",
    country: "Slovakia",
    score: 3,
    tier: "National aggregate monitoring plus fragmented institutional minutes and opinions",
    mainBody:
      "NKVIE annual reporting and survey evidence, with local publication nodes at UPJS and STU and a separate APVV route.",
    coverage:
      "National aggregate monitoring, meetings and annual reporting, institutional committee minutes and opinions, funder procedure, and academy or university committee structures.",
    publicAccess: "Yes, but uneven",
    publicationModel:
      "Aggregate national monitoring plus selective institutional minutes and opinion publication rather than a searchable national misconduct decision database.",
    format: "Web, annual-report PDF, meeting PDF, institutional minutes and opinion PDFs",
    hasArchive: false,
    keyNote:
      "Slovakia is more public than the older transparency layer suggested: NKVIE publishes aggregate monitoring and annual-report material, while UPJS and STU expose local committee outputs. These remain fragmented and do not add up to a national archive.",
    sourcePath: "data/transparency_research_integrity_europe_overview.docx",
    sourceDate: "2026-04-23",
    resources: [
      {
        label: "NKVIE overview page",
        url: "https://vaia.gov.sk/sk/rada-vlady-pre-vedu-techniku-a-inovacie/narodna-eticka-komisia/",
        resourceClass: "National integrity body overview",
        scope: "National",
        caseLevelInfo: "Governance and mandate rather than case files",
        comment: "Confirms the national body and its official hub."
      },
      {
        label: "NKVIE institutional survey 2025",
        url: "https://vaia.gov.sk/wp-content/uploads/2026/01/Dotaznik-Narodnej-komisie-pre-vyskumnu-integritu-a-etiku.pdf",
        resourceClass: "Aggregate monitoring report",
        scope: "National",
        caseLevelInfo: "Institutional complaint, substantiation and sanctions counts for 2023-2025",
        comment: "Strongest aggregate evidence for the first-line institutional system."
      },
      {
        label: "NKVIE 2025 annual report",
        url: "https://vaia.gov.sk/wp-content/uploads/2026/04/Vyrocna-sprava-NKVIE_2025.pdf",
        resourceClass: "National annual-report evidence",
        scope: "National",
        caseLevelInfo: "Nine submissions and thematic categories, but no full decisions",
        comment: "Confirms national submission handling and aggregate transparency."
      },
      {
        label: "Information from the sixth meeting of NKVIE",
        url: "https://vaia.gov.sk/wp-content/uploads/2026/04/Informacia-zo-6.-zasadnutia-Narodnej-komisie-pre-vyskumnu-integritu-a-etiku.pdf",
        resourceClass: "Meeting and publication-practice trace",
        scope: "National",
        caseLevelInfo: "Draft information on closed submissions discussed, but no archive yet",
        comment: "Useful indicator of possible future publication practice."
      },
      {
        label: "UPJS minutes, 23 March 2026",
        url: "https://www.upjs.sk/app/uploads/2026/04/Zapis-EK-23.03.2026.pdf",
        resourceClass: "Institutional minutes case trace",
        scope: "Institutional",
        caseLevelInfo: "Public minutes with a case-specific adopted statement",
        comment: "Representative local micro-publication node."
      },
      {
        label: "STU ethics committee opinions",
        url: "https://www.stuba.sk/sk/stu/akademicke-a-samospravne-organy/eticka-komisia-stu/stanoviska-ek-stu.html?month=1&page_id=14371&year=2025",
        resourceClass: "Institutional opinion list",
        scope: "Institutional",
        caseLevelInfo: "Published opinions on submitted complaints",
        comment: "Strongest complaint-opinion list located in this Slovakia pass."
      },
      {
        label: "APVV Commission for Research Integrity and Ethics",
        url: "https://www.apvv.sk/agentura/komisia-pre-vyskumnu-integritu-a-etiku-apvv.html",
        resourceClass: "Funder integrity route",
        scope: "Funder",
        caseLevelInfo: "Procedure and notification route, not public outcomes",
        comment: "Important separate funder lane."
      }
    ]
  },
  {
    id: "slovenia",
    country: "Slovenia",
    score: 1,
    tier: "National publication rule but no live opinion archive",
    mainBody:
      "National Council for Ethics and Integrity in Science, with first-line handling at universities and research organizations.",
    coverage:
      "Council governance documents, procedure rules with anonymized-opinion publication, recommendations, work report trace of one ARIS-referred initiative, university and institute rules, and separate biomedical, animal, data-protection and public-integrity routes.",
    publicAccess:
      "Strong for governance pages, procedure documents and institutional rules; prospective for anonymized council opinions; weak for live opinion-level publication or searchable outcomes.",
    publicationModel:
      "GOV.SI council pages, procedure-based anonymized publication rule, annual reporting and institutional pages rather than a consolidated public archive of national decisions.",
    format:
      "Official webpages, PDFs, regulations, work reports and institutional procedure pages",
    hasArchive: false,
    keyNote:
      "The 24 April 2026 Slovenia pass found a national council and a formal anonymized-opinion publication rule, but no live archive of national opinions. The only located national case trace is aggregate: one ARIS-referred initiative in 2023-2025 did not lead to a procedure because the conduct was not considered a research-integrity breach.",
    sourcePath: "data/Slovenia/raw documentation/source notes/Slovenia deep-dive sources.md",
    sourceDate: "2026-04-24",
    resources: [
      {
        label: "National Council page",
        url: "https://www.gov.si/zbirke/delovna-telesa/delovna-skupina/",
        resourceClass: "National integrity body overview",
        scope: "Mandate, membership, key documents and work-report links",
        caseLevelInfo:
          "Explains the body and its documents, but not a case archive",
        comment:
          "Best public hub for the Slovenian national ethics-and-integrity layer."
      },
      {
        label: "Procedure rules for adopting opinions",
        url: "https://www.gov.si/assets/ministrstva/MVZI/Znanost/Etika-in-integriteta-v-znanosti/Pravila-postopka-za-sprejemanje-mnenj-o-skladnosti-ravnanja-z-eticnimi-pravili-in-o-krsitvah-nacel-raziskovalne-integritete.pdf",
        resourceClass: "Publication-basis procedure",
        scope:
          "Council opinions on ethical-rule compliance and research-integrity principles",
        caseLevelInfo:
          "Procedure stays confidential until opinion and requires anonymized publication of issued opinions; no live opinion archive located",
        comment:
          "Key source for the ethics/integrity merge and for prospective publication."
      },
      {
        label: "Council work report 2023-2025",
        url: "https://www.gov.si/assets/ministrstva/MVZI/Znanost/Etika-in-integriteta-v-znanosti/Porocilo-o-delu-Nacionalnega-sveta-za-etiko-in-integriteto-v-znanosti-2023-2025.pdf",
        resourceClass: "National monitoring trace",
        scope: "Mandate, activities, international positioning and practical limits",
        caseLevelInfo:
          "Reports one ARIS-referred initiative that did not become a procedure and confirms lack of sanction power",
        comment:
          "Aggregate national case trace, not an opinion archive."
      },
      {
        label: "Handling research misconduct at the University of Ljubljana",
        url: "https://www.uni-lj.si/en/research/ethics-and-integrity-in-research/handling-research-misconduct",
        resourceClass: "Institutional complaint route",
        scope: "Named local handling route for allegations of research misconduct",
        caseLevelInfo: "Public route only, not a case archive",
        comment:
          "Shows that practical case handling remains institutional below the national council."
      },
      {
        label: "FOV Ethical Committee for Research in Organizational Sciences",
        url: "https://www.fov.um.si/en/about-faculty/ethical-committee-for-research-in-organizational-sciences/",
        resourceClass: "Local research-ethics approval trace",
        scope: "Faculty research ethics review at University of Maribor",
        caseLevelInfo: "Public approval identifiers, not misconduct outcomes",
        comment:
          "Important classifier: visible output exists, but it is research-ethics approval rather than integrity case publication."
      }
    ]
  },
  {
    id: "spain",
    country: "Spain",
    score: 2,
    tier: "National route documents plus subnational recommendation fragment",
    mainBody: "CEEI and CIR-CAT, with CSIC, ISCIII and universities as institutional routes",
    coverage:
      "National consultative route, Catalan regional integrity procedure and recommendation, institutional committee/code pages and specialist ethics-boundary routes",
    publicAccess:
      "Yes for laws, reports, recommendations, procedure pages and at least one regional recommendation; weak for complete case files and no national decision archive",
    publicationModel:
      "Distributed publication of CEEI reports, recommendations and administrative route documents plus CIR-CAT procedure/recommendation material; no searchable national misconduct archive",
    format: "Official web pages + PDF reports/recommendations",
    hasArchive: false,
    keyNote:
      "24 April 2026 pass upgrades Spain from body-only visibility to fragmented route/output visibility: CEEI publishes national reports and procedure documents, CIR-CAT publishes a handling procedure and Recommendation 1/2025, but no national searchable archive of misconduct findings was identified.",
    sourcePath: "data/Spain/raw documentation/source notes/Spain deep-dive sources.md",
    sourceDate: "2026-04-24",
    resources: [
      {
        label: "CEEI official page",
        url:
          "https://www.ciencia.gob.es/site-web/Ministerio/Mision-y-organizacion/Organismos-consultivos/CEEI.html",
        resourceClass: "National committee portal",
        scope: "National consultative body, public reports, recommendations and administrative documents",
        caseLevelInfo:
          "Publishes reports and recommendations; no searchable archive of individual misconduct files",
        comment:
          "Best public entry point for Spain's national reference route."
      },
      {
        label: "CEEI admission instructions",
        url:
          "https://www.ciencia.gob.es/dam/jcr%3Ac5683944-1d37-4feb-a1cb-4d58676dc09c/InstruccionAdmisionCEEI_311024.pdf",
        resourceClass: "National procedure instructions",
        scope: "Admission, allocation, expert use, finalization, custody and publication basis",
        caseLevelInfo:
          "Explains that complete files are held by the secretariat and publication follows transparency rules",
        comment:
          "Shows why CEEI is route-visible but not archive-visible."
      },
      {
        label: "CIR-CAT admission and processing procedure",
        url:
          "https://web.gencat.cat/ca/generalitat/com-ens-organitzem/departaments/recerca-universitats/CIR-CAT/procediment-adminissio-tramitacio-integracio-cientifica",
        resourceClass: "Regional procedure page",
        scope: "Catalan communications and requests about scientific integrity",
        caseLevelInfo:
          "Defines admission, inadmission, opinions, custody and publication basis; not a complete archive",
        comment:
          "One of the clearest subnational integrity procedures found for Spain."
      },
      {
        label: "CIR-CAT Recommendation 1/2025",
        url:
          "https://web.gencat.cat/content/dam/webgencat/documents/la-generalitat/com-ens-organitzem/departaments/recerca-universitats/cir-cat/recomanacio_1_2025.pdf",
        resourceClass: "Regional recommendation",
        scope: "UB/CERCA institutional-affiliation and authorship-related integrity dispute",
        caseLevelInfo:
          "Public recommendation tied to a concrete institutional dispute context, not a national archive",
        comment:
          "Strongest public case-like integrity fragment in this Spain pass."
      }
    ]
  },
  {
    id: "sweden",
    country: "Sweden",
    score: 4,
    tier: "Structured archive",
    mainBody: "NPOF",
    coverage: "National",
    publicAccess: "Yes",
    publicationModel: "Structured decisions archive",
    format: "HTML archive",
    hasArchive: true,
    keyNote: "Clear national decisions archive.",
    sourcePath: "data/transparency_research_integrity_europe_overview.docx",
    sourceDate: "2026-04-17",
    resources: [
      {
        label: "NPOF decisions archive",
        url: "https://npof.se/en/decisions/",
        resourceClass: "Structured decision archive",
        scope: "National",
        caseLevelInfo: "Published decisions",
        comment: "Clear national case-publication route."
      }
    ]
  },
  {
    id: "switzerland",
    country: "Switzerland",
    score: 3,
    tier:
      "Funder annual reporting plus institutional case-file fragments",
    mainBody:
      "SNSF Commission on Research Integrity and Plagiarism Control Group; ETH Zurich Integrity Commission report list; SCCSI monitoring",
    coverage:
      "National funder route, national monitoring/advisory route, ETH Zurich institutional report list and boundary registries",
    publicAccess:
      "Yes for SNSF annual anonymised reporting and occasional case news; yes for an ETH Zurich institutional list of anonymised reports; no national case archive",
    publicationModel:
      "Annual anonymised funder reports, occasional public case news, an ETH Zurich institutional report list and boundary-regime registries rather than a searchable national misconduct archive",
    format: "PDF annual reports + web news + ETH table endpoint + procedure pages",
    hasArchive: true,
    keyNote:
      "24 April 2026 correction confirms Switzerland as fragmented rather than LOWI-like nationally: SNSF publishes anonymised annual case statistics and occasional case news, while ETH Zurich exposes a public institutional list of anonymised investigation reports. SCCSI receives annual institutional reporting without personal details and is not an appeal or case-handling body.",
    sourcePath: "data/Switzerland/raw documentation/source notes/Switzerland deep-dive sources.md",
    sourceDate: "2026-04-24",
    resources: [
      {
        label: "SNSF Commission on Research Integrity annual report 2024",
        url: "https://www.snf.ch/media/de/vzaHaBcJudF3hRtz/Annual_report_2024_IK.pdf",
        resourceClass: "Annual report with case material",
        scope: "National funder / national framework",
        caseLevelInfo:
          "Anonymised statistics and short rows for plagiarism checks, reports and Commission cases",
        comment:
          "Summary-level funder visibility rather than full decision publication."
      },
      {
        label: "Results of investigation into plagiarism accusations",
        url: "https://www.snf.ch/en/a6HYHTbiHpsk2ET6/news/results-of-investigation-into-plagiarism-accusations",
        resourceClass: "Public case news item",
        scope: "National funder / national framework",
        caseLevelInfo:
          "Specific public communication on plagiarism finding and SNSF sanctions, not a full case report",
        comment:
          "Illustrates occasional case-specific public communication."
      },
      {
        label: "ETH Zurich anonymised investigation reports table",
        url:
          "https://ethz.ch/en/research/ethics-and-animal-welfare/research-integrity/wissenschaftliches-fehlverhalten/_jcr_content/par/accordion/accordionitem_1362309064/par/table.tableComp.json",
        resourceClass: "Institutional report-list endpoint",
        scope: "ETH Zurich Integrity Commission",
        caseLevelInfo:
          "Lists four downloadable anonymised report PDFs: two May 2025 reports and two December 2025 reports",
        comment:
          "Institutional case-file fragment; limited to ETH Zurich and rendered through a table endpoint."
      },
      {
        label: "ETH Zurich new misconduct procedure",
        url:
          "https://ethz.ch/staffnet/en/news-and-events/internal-news/archive/2024/02/new-rules-of-procedure-to-address-scientific-misconduct-are-adopted.html",
        resourceClass: "Institutional publication rule",
        scope: "ETH Zurich Integrity Commission",
        caseLevelInfo:
          "States that anonymised investigation reports are normally published after conclusion, with annual aggregate coverage where reports are not published",
        comment:
          "Explains the rule behind the live ETH report list."
      },
      {
        label: "SCCSI mandate",
        url: "https://scientific-integrity.ch/mandate-of-the-competence-centre",
        resourceClass: "National monitoring mandate",
        scope: "Higher-education institutional reports and monitoring",
        caseLevelInfo:
          "Receives annual reports without personal details; does not conduct proceedings or act as appeal body",
        comment:
          "Negative source for not coding SCCSI as a Swiss national misconduct tribunal."
      }
    ]
  },
  {
    id: "turkey",
    country: "Turkey",
    score: 1,
    tier:
      "Procedural and registry-based transparency without a national misconduct archive",
    mainBody:
      "YOK and UAK rulebooks, TUBITAK and TUSEB AYEK regulations, university committee pages, Necmettin Erbakan University legal-office precedent material, TITCK committee-status lists and HADMEK public HADYEK registry pages.",
    coverage:
      "National and institutional route visibility is strong, but public general misconduct case output is weak. Boundary regimes publish clearer committee-status or board-registry material than the central misconduct routes publish decisions.",
    publicAccess:
      "Strong for laws, directives, FAQs, workflow material, committee pages, legal-office examples, activity-status tables and local-board registries; weak for named or searchable general misconduct findings.",
    publicationModel:
      "Distributed publication of directives, FAQs, forms, consequence rules, legal-office precedent material, activity tables and committee lists instead of a searchable archive of research-misconduct decisions.",
    format:
      "Official law pages, directive PDFs, FAQ PDFs, funder procedure PDFs, institutional ethics pages, legal-office PDFs, ministry list PDFs, board registries and application pages",
    hasArchive: false,
    keyNote:
      "The 24 April 2026 case-file pass found a clear Turkish RI route network but no official national archive of general research-integrity findings. YOK rules require ethics-violation decisions to be reported to YOK and keep board decisions confidential; TUBITAK/TUSEB expose procedure and consequences, while NEU offers a rare institutional precedent/template micro-source.",
    sourcePath: "data/Turkey/raw documentation/source notes/Turkey deep-dive sources.md",
    sourceDate: "2026-04-24",
    resources: [
      {
        label: "YOK research and publication ethics directive",
        url: "https://www.yok.gov.tr/documents/documents/68fb63b8b2511.pdf",
        resourceClass: "National directive and confidentiality rule",
        scope: "University research and publication ethics route",
        caseLevelInfo:
          "Defines local-board routing, one-month reporting to YOK and confidentiality; no public decision archive",
        comment:
          "Best single source for why the route is clear but public case visibility is limited."
      },
      {
        label: "UAK ethics page",
        url: "https://www.uak.gov.tr/page/etik-xPDl4",
        resourceClass: "National promotion-linked route",
        scope: "Docentlik ethics review",
        caseLevelInfo:
          "Publishes process and applicant consequences rather than named outcomes",
        comment:
          "The most visible national second-line route for general research-publication ethics."
      },
      {
        label: "TUBITAK UBYT 2026 procedure",
        url: "https://tubitak.gov.tr/sites/default/files/2026-02/79_YK_islenmis_hali_UBYT_usul_esaslari.pdf",
        resourceClass: "Funder consequence rule",
        scope: "Publication incentives and AYEK-linked ethics consequences",
        caseLevelInfo:
          "Suspected ethics breaches can be referred to AYEK and incentive payments can be recovered; no public case list",
        comment:
          "Useful consequence visibility below the general AYEK regulation."
      },
      {
        label: "Necmettin Erbakan University ethics review and precedent hub",
        url: "https://erbakan.edu.tr/tr/birim/hukuk-musavirligi/sayfa/etik-kurul-inceleme-islemleri-emsal-mahkeme-kararlari-ve-yonergeler",
        resourceClass: "Institutional legal-office micro-publication",
        scope: "Ethics-review examples and precedent court decisions",
        caseLevelInfo:
          "Publishes examples and anonymized precedent PDFs, not a live archive of institutional findings",
        comment:
          "Rare official institutional case-law/source-material node."
      },
      {
        label: "TITCK clinical research ethics committee activity status",
        url: "https://titck.gov.tr/storage/Archive/2026/dynamicModulesAttachment/EtikKurulFaaliyetDurumu09.03.2026_615047de-f51e-468e-9245-64569f8b77e9.pdf",
        resourceClass: "Boundary committee-status list",
        scope: "Clinical-research ethics committees",
        caseLevelInfo:
          "Lists active and suspended committees rather than protocol decisions or misconduct findings",
        comment:
          "Shows stronger public registry logic in the clinical boundary lane."
      },
      {
        label: "HADMEK approved HADYEKs page",
        url: "https://hadmek.tarimorman.gov.tr/Sayfa/Detay/645",
        resourceClass: "Boundary registry page",
        scope: "Animal-research local-board network",
        caseLevelInfo:
          "Publishes network size and approved local-board list, not named case decisions",
        comment:
          "One of the clearest national-local public registries in the Turkish system."
      }
    ]
  },
  {
    id: "ukraine",
    country: "Ukraine",
    score: 4,
    tier:
      "Structured national second-line case page with distributed first-line handling",
    mainBody:
      "NAQA Ethics Committee and Appeals Chamber, with MON attestation consequences, NASU academy commission output and institutional first-line routes.",
    coverage:
      "NAQA public complaint/decision page for plagiarism, fabrication and falsification in degree-related contexts; broader institutional first-line handling remains distributed.",
    publicAccess:
      "Strong for NAQA second-line complaint entries and decision PDFs; mixed for MON consequence notices and academy or university micro-publications; weak for a complete all-institution national archive.",
    publicationModel:
      "NAQA maintains a stable public page grouping accepted complaints/reports and linked decisions, supplemented by ministry attestation notices, academy case notices and isolated institutional governance traces.",
    format:
      "Official webpages, linked complaint and decision PDFs, ministry news/order links, academy decision PDF and institutional governance page",
    hasArchive: true,
    keyNote:
      "The 24 April 2026 case-file pass found that Ukraine has a clearer public case route than the earlier dossier implied: NAQA publishes a structured page of complaints/reports on academic plagiarism, fabrication and falsification with linked case PDFs. This is a strong national second-line lane, but not a universal archive for all local institutional research-integrity outcomes.",
    sourcePath:
      "data/Ukraine/raw documentation/source notes/Ukraine deep-dive sources.md",
    sourceDate: "2026-04-24",
    resources: [
      {
        label:
          "NAQA complaints/reports on plagiarism, fabrication and falsification",
        url: "https://naqa.gov.ua/%D1%81%D0%BA%D0%B0%D1%80%D0%B3%D0%B8-%D0%BF%D0%BE%D0%B2%D1%96%D0%B4%D0%BE%D0%BC%D0%BB%D0%B5%D0%BD%D0%BD%D1%8F-%D1%89%D0%BE%D0%B4%D0%BE-%D1%84%D0%B0%D0%BA%D1%82%D1%96%D0%B2-%D0%B0%D0%BA%D0%B0%D0%B4/",
        resourceClass: "National second-line case page",
        scope: "NAQA Ethics Committee complaints/reports",
        caseLevelInfo:
          "Accepted complaints/reports and linked decisions for plagiarism, fabrication and falsification",
        comment:
          "Strongest Ukrainian case-file source found; narrower than the full institutional universe."
      },
      {
        label: "NAQA Ethics Committee decision No. 59 (195)",
        url: "https://naqa.gov.ua/wp-content/uploads/2025/11/%D0%A0%D1%96%D1%88%D0%B5%D0%BD%D0%BD%D1%8F-59-195.pdf",
        resourceClass: "Representative decision PDF",
        scope: "Dissertation/publication plagiarism and fabrication complaint",
        caseLevelInfo:
          "Reasoned decision dated 25 November 2025 with complaint history, analysis and conclusion",
        comment:
          "Proof that the NAQA case page links to substantive case files."
      },
      {
        label: "Law of Ukraine On Academic Integrity",
        url: "https://zakon.rada.gov.ua/laws/show/en/4742-20",
        resourceClass: "Publication-duty law",
        scope:
          "Academic-integrity violations, institutional decisions, NAQA appeals and publisher duties",
        caseLevelInfo:
          "Requires publication of certain institutional decisions and creates NAQA appeal routes; not itself a case archive",
        comment:
          "Important legal basis for future post-transition publication practice."
      },
      {
        label: "MON Attestation Board decisions, 7 October 2025",
        url: "https://mon.gov.ua/news/atestatsiina-kolehiia-mon-ukhvalyla-cherhovi-rishennia",
        resourceClass: "Ministry consequence notice",
        scope: "Scientific-degree and attestation decisions",
        caseLevelInfo:
          "Reports deprivation of a scientific degree on the basis of a NAQA plagiarism decision",
        comment:
          "Shows a consequence layer attached to NAQA findings."
      },
      {
        label: "NASU Commission academic-integrity case notice",
        url: "https://www.nas.gov.ua/news/komisiya-pri-prezidi-nan-ukrani-iz-zahistu-nauki-protidi-psevdonauci-ta-falsifikaci-naukovih-doslidzhen-rozglyanula-povidomlennya-pro-porushennya-akademichno-dobrochesnosti",
        resourceClass: "Academy micro-publication",
        scope: "NASU commission review of a reported academic-integrity violation",
        caseLevelInfo:
          "Official academy case notice with linked full decision PDF",
        comment:
          "Useful micro-publication lane; not a general national archive."
      },
      {
        label: "KPI rectorate note on Code of Honor authorship case",
        url: "https://kpi.ua/node/18259",
        resourceClass: "Institutional micro-publication",
        scope: "University academic-integrity commission route",
        caseLevelInfo:
          "Records completion of a Code of Honor case about the author list of a scientific article",
        comment:
          "Shows first-line material may appear as isolated governance traces."
      }
    ]
  },
  {
    id: "united-kingdom",
    country: "United Kingdom",
    score: 2,
    tier:
      "Institutional annual-statement corridor and boundary registers without a national misconduct archive",
    mainBody:
      "UKCORI/RICS Concordat annual-statement analysis, institutional annual statements, UKRIO synthetic cases and barriers work, UKRI/Research England/devolved funder assurance, Wellcome and CRUK funder reporting, HRA research summaries, ASRU annual non-compliance reporting and HFEA clinic licence decisions.",
    coverage:
      "UK-wide decentralized employer handling. General misconduct case visibility is strongest through institutional annual statements; project or regulatory case visibility is stronger in selected boundary regimes.",
    publicAccess:
      "Strong for frameworks, guidance, named contacts and many annual statements; mixed for comparable allegation data; weak for full individual misconduct case files.",
    publicationModel:
      "No national general misconduct decision archive. Publication runs through employer annual statements, synthetic UKRIO learning material, funder policy/assurance pages and boundary-regime registers or decision lists.",
    format:
      "Official web hubs, annual-statement PDFs, synthetic case-study PDFs, policy pages, searchable research-summary database, GOV.UK annual report and specialist decision list",
    hasArchive: false,
    keyNote:
      "The UK pilot shows a decentralized annual-statement corridor: the public record usually reports named contacts, allegation counts, categories, anonymized rows or narrative lessons rather than full misconduct files. The 29 April 2026 quality pass expanded the institutional statement seed directory and confirmed that this corridor is broader than the first pilot sample. UKRIO case studies are synthetic; UKRI and devolved funders assure compliance; Wellcome and CRUK create confidential funder-reporting duties; HRA, ASRU and HFEA publish boundary records that must be coded separately.",
    sourcePath: "data/transparency_research_integrity_europe_overview.docx",
    sourceDate: "2026-04-29",
    resources: [
      {
        label: "UKCORI analysis of annual research integrity statements 2025",
        url: "https://ukcori.org/our-work/analysis-of-research-integrity-annual-statements-2025/",
        resourceClass: "National annual-statement analysis",
        scope: "HEIs, government departments and independent research organisations",
        caseLevelInfo:
          "Analyses institutional annual statements and misconduct reporting patterns rather than publishing individual decisions",
        comment:
          "Best national evidence source for the UK annual-statement corridor."
      },
      {
        label: "Review of annual statements on research integrity 2025",
        url: "https://ukcori.org/wp-content/uploads/2025/09/Review-of-annual-statements-on-research-integrity-2025-Full-report.pdf",
        resourceClass: "National annual-statement review",
        scope: "HEI, government and independent research-organisation statements",
        caseLevelInfo:
          "Bulk statement analysis, not individual misconduct case publication",
        comment:
          "Quality-pass source for statement availability, template uptake and later dataset design."
      },
      {
        label: "UKRIO Case study pack No. 1",
        url: "https://ukrio.org/wp-content/uploads/UKRIO-Case-study-pack-No.-1.pdf",
        resourceClass: "Synthetic case-study resource",
        scope: "UK-wide guidance and training",
        caseLevelInfo:
          "Fictitious scenarios based on recurring real-life situations, not literal accounts of particular cases",
        comment:
          "Useful for practice and training, but not a case-file archive."
      },
      {
        label: "UKRIO barriers to investigating and reporting misconduct",
        url: "https://ukrio.org/ukrio-resources/barriers-to-investigating-and-reporting-research-misconduct/",
        resourceClass: "Sector barriers report",
        scope: "UK research employers, funders, researchers and publishers",
        caseLevelInfo:
          "Explains why reporting and investigation visibility remains hard to standardize; no individual decisions",
        comment:
          "Important missingness source for the UK system."
      },
      {
        label: "Research England supporting research integrity",
        url: "https://www.ukri.org/who-we-are/research-england/research-excellence/supporting-research-integrity",
        resourceClass: "Funder assurance route",
        scope: "Higher education providers eligible for Research England funding",
        caseLevelInfo:
          "Grant-condition and formal-investigation notification route, not public individual case files",
        comment:
          "Shows the funder-notification layer below the UK-wide Concordat."
      },
      {
        label: "Medr research and innovation",
        url: "https://www.medr.cymru/en/research-and-innovation/",
        resourceClass: "Devolved assurance route",
        scope: "Welsh higher education research and innovation",
        caseLevelInfo:
          "Concordat and annual-statement expectations, not public individual case files",
        comment:
          "Keeps the Wales funding-body route visible in the UK-wide system."
      },
      {
        label: "SFC Research Assurance and Accountability Guidance 2025-26",
        url: "https://www.sfc.ac.uk/wp-content/uploads/2025/07/Research-Assurance-and-Accountability-Guidance-2025-26.pdf",
        resourceClass: "Devolved assurance route",
        scope: "Scottish university research assurance returns",
        caseLevelInfo:
          "Research assurance, governance, culture and Concordat reporting fields; no public individual case archive",
        comment:
          "Keeps the Scottish assurance-return route visible."
      },
      {
        label: "Department for the Economy Northern Ireland research culture and concordats",
        url: "https://www.economy-ni.gov.uk/articles/uk-higher-education-research-culture-and-research-related-concordats",
        resourceClass: "Devolved assurance route",
        scope: "Northern Ireland research culture and Concordat commitments",
        caseLevelInfo:
          "Funder-side Concordat and research-culture commitments, not public individual case files",
        comment:
          "Keeps the Northern Ireland funding-body route visible."
      },
      {
        label: "Wellcome research misconduct policy",
        url: "https://wellcome.org/research-funding/guidance/policies-grant-conditions/research-misconduct",
        resourceClass: "Charitable funder policy",
        scope: "Wellcome-funded organisations and applications",
        caseLevelInfo:
          "Requires notification of formal investigations and final reports in confidence; no public case archive",
        comment:
          "Strong confidential funder-reporting route."
      },
      {
        label: "Cancer Research UK guidelines for scientific conduct",
        url: "https://www.cancerresearchuk.org/for-researchers/apply-for-and-manage-your-funding/research-policies-and-guidance/guidelines-for-scientific-conduct",
        resourceClass: "Charitable funder policy",
        scope: "CRUK-funded host institutions and grants",
        caseLevelInfo:
          "Requires notification of formal investigations and outcome information in confidence; no public case archive",
        comment:
          "Important funder-compliance layer for biomedical research."
      },
      {
        label: "King's College London Research Integrity Statement 2024-2025",
        url: "https://www.kcl.ac.uk/assets/research/pdf/research-integrity-statement-2024-25.pdf",
        resourceClass: "Institutional annual statement",
        scope: "Employer-level Concordat reporting",
        caseLevelInfo:
          "Named contacts plus aggregate allegation table: 2 cases, 0 formal investigations and 0 upheld findings",
        comment:
          "Representative aggregate-statement model."
      },
      {
        label: "Oxford Research Integrity Statement 2024",
        url: "https://assets-oxweb.admin.ox.ac.uk/2026-02/research-integrity-2024-statement_0.pdf",
        resourceClass: "Institutional annual statement",
        scope: "Employer-level misconduct reporting",
        caseLevelInfo:
          "Anonymized numbered allegations and outcomes, plus separate student research-work cases",
        comment:
          "Shows deeper annual-statement visibility than aggregate counts while still not publishing full files."
      },
      {
        label: "University of Edinburgh annual research ethics and integrity reports",
        url: "https://research-office.ed.ac.uk/research-integrity/annual-research-ethics-and-integrity-reports",
        resourceClass: "Institutional annual statement hub",
        scope: "Scottish institutional reporting",
        caseLevelInfo:
          "Annual ethics and integrity reports with formal-investigation learning sections depending on year",
        comment:
          "Representative Scotland annual-statement route."
      },
      {
        label: "Cardiff University research integrity and governance",
        url: "https://www.cardiff.ac.uk/research/our-research-environment/integrity-and-ethics/research-integrity-and-governance",
        resourceClass: "Institutional annual statement hub",
        scope: "Welsh institutional reporting",
        caseLevelInfo:
          "Named senior lead, first point of contact, ORIEC oversight and annual statement archive",
        comment:
          "Representative Wales annual-statement and named-contact route."
      },
      {
        label: "Queen's University Belfast annual statements",
        url: "https://www.qub.ac.uk/Research/Governance-ethics-and-integrity/Research-integrity/AnnualStatements/",
        resourceClass: "Institutional annual statement hub",
        scope: "Northern Ireland institutional reporting",
        caseLevelInfo:
          "Annual statements of compliance from 2013-2014 onward",
        comment:
          "Representative Northern Ireland annual-statement route."
      },
      {
        label: "Imperial annual statement on research integrity 2024",
        url: "https://www.imperial.ac.uk/research-and-innovation/about-imperial-research/research-integrity-investigations/misconduct/annual-statement-on-research-integrity-2024/",
        resourceClass: "Institutional annual statement",
        scope: "Employer-level misconduct reporting",
        caseLevelInfo:
          "Narrative case-learning trace for a potential PhD-thesis plagiarism allegation",
        comment:
          "Useful example of narrative institutional case visibility."
      },
      {
        label: "Cambridge research integrity reports",
        url: "https://www.cam.ac.uk/research/integrity/reports",
        resourceClass: "Institutional annual statement hub",
        scope: "Employer-level annual reports",
        caseLevelInfo:
          "Latest report is 2024-2025 and includes anonymized information about how allegations were assessed and investigated",
        comment:
          "Quality-pass seed source for the expanded annual-statement directory."
      },
      {
        label: "Warwick annual statement on research integrity 2024-25",
        url: "https://warwick.ac.uk/services/ris/research-integrity/annual-statements/research_integrity_eleventh_annual_statement_2024-25.pdf",
        resourceClass: "Institutional annual statement",
        scope: "Employer-level Concordat reporting",
        caseLevelInfo:
          "Template-style allegation table with at least one plagiarism allegation visible in the statement",
        comment:
          "Useful seed source for annual-statement depth coding."
      },
      {
        label: "Glasgow annual statement on research integrity hub",
        url: "https://www.gla.ac.uk/myglasgow/ris/researchintegrity/misconduct/annualstatementonresearchintegrity/",
        resourceClass: "Institutional annual statement hub",
        scope: "Scottish institutional annual statements",
        caseLevelInfo:
          "Current 2024-2025 statement plus archived annual statements back to 2014-2015",
        comment:
          "Useful long-run Scottish statement corridor."
      },
      {
        label: "HRA research summaries",
        url: "https://www.hra.nhs.uk/planning-and-improving-research/application-summaries/research-summaries/",
        resourceClass: "Boundary-regime project register",
        scope: "REC-reviewed health and social-care research",
        caseLevelInfo:
          "Searchable project summaries and REC opinion filters; not misconduct findings",
        comment:
          "Strong public project visibility in the health-research boundary lane."
      },
      {
        label: "ASRU annual report 2024",
        url: "https://www.gov.uk/government/publications/animals-in-science-regulation-unit-annual-report-2024/animals-in-science-regulation-unit-annual-report-2024-accessible",
        resourceClass: "Boundary-regime annual report",
        scope: "Animal-research non-compliance under ASPA",
        caseLevelInfo:
          "Annual report with Annex A individual non-compliance case entries",
        comment:
          "Case-level boundary publication, not general RI misconduct archive."
      },
      {
        label: "HFEA latest decisions on clinics",
        url: "https://www.hfea.gov.uk/choose-a-clinic/latest-decisions-on-clinics/",
        resourceClass: "Boundary-regime decision list",
        scope: "Fertility clinics and embryo-research licensing",
        caseLevelInfo:
          "Dated clinic/licence committee decisions and linked clinic pages",
        comment:
          "Specialist licence-decision visibility separate from general misconduct handling."
      }
    ]
  }
];
