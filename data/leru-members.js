(function () {
  const leruSource = {
    label: "LERU member page",
    url: "https://www.leru.org/members",
    accessed: "2026-06-23"
  };

  const defaultValidationQuestions = [
    "Is this the correct public office, committee or procedure route to show for this institution?",
    "Is there a public annual report, case-output channel or aggregate reporting route that should be added?",
    "Are there internal routes that should be acknowledged without publishing private operational details?",
    "Which boundary regimes should be shown separately from research-misconduct handling?",
    "What is the preferred non-personal validation pathway for keeping this profile current?"
  ];

  const countryContexts = {
    belgium:
      "Belgium is best read as a federal container with community lanes: Flemish first-line institutional handling plus VCWI second advice, French-speaking/FWB institutional routes plus CSIS, and federal boundary regimes kept separate.",
    denmark:
      "Denmark separates national NVU handling of scientific dishonesty from local institutional handling of questionable research practice and returned cases.",
    finland:
      "Finland has a national TENK procedure and institutional first-instance responsibilities; local routes should be separated from national statement summaries.",
    france:
      "France is a legally codified, institutionally executed and nationally coordinated network: institutions appoint RIS, while Ofis/Hceres coordinates and observes the national system.",
    germany:
      "Germany has a public case-publication ladder through DFG and OWID plus institution-specific ombuds, procedure and commission routes; local visibility varies substantially.",
    ireland:
      "Ireland is represented through NRIF/IUA coordination, national aggregate statistics and institution-level policies rather than a universal public case archive.",
    italy:
      "Italy is coded as a distributed system with local committees, CNR integrity infrastructure and clinical/bioethics boundaries kept separate from misconduct publication.",
    netherlands:
      "The Netherlands uses an institution-first model under the national code, with LOWI as a second-line advisory route for affiliated institutions after local handling.",
    spain:
      "Spain is represented as a distributed system with institutional integrity routes, funder/agency elements and several boundary regimes rather than one national misconduct board.",
    sweden:
      "Sweden separates national Npof handling of research misconduct from local institutional handling of other deviations from good research practice.",
    switzerland:
      "Switzerland is coded as fragmented funder and institutional visibility rather than one national misconduct board, with SNSF/ETH outputs and SCCSI monitoring/advice kept distinct.",
    "united-kingdom":
      "The UK route is employer-led under the Concordat to Support Research Integrity, with annual statements as a recurring public-reporting corridor and health/animal/data regimes kept separate."
  };

  const countryBoundaryRegimes = {
    belgium: ["biomedical ethics", "clinical trials", "animal research", "data protection", "IP", "open science"],
    denmark: ["medical research ethics", "clinical trials", "animal research", "data protection", "open science"],
    finland: ["TENK statement route", "human research ethics", "biobanks", "clinical trials", "data protection"],
    france: ["CPP/CNRIPH human research ethics", "clinical trials", "CNREEA animal ethics", "data protection", "deontology"],
    germany: ["DFG/OWID publication lanes", "medical ethics", "animal research", "data protection", "research security"],
    ireland: ["NREC/HRA health research", "animal research", "data protection", "funder compliance", "quality assurance"],
    italy: ["clinical trials", "territorial/national ethics committees", "animal research", "data protection", "CNR/CNB ethics"],
    netherlands: ["research ethics review", "medical research ethics", "animal research", "data protection", "funder reporting"],
    spain: ["biomedical ethics", "animal research", "data protection", "IP", "open science"],
    sweden: ["ethical review", "animal testing ethics", "clinical trials", "data protection", "biobanks"],
    switzerland: ["swissethics/RAPS/HumRes", "Swissmedic", "animal authorisations", "SNSF funding compliance", "data protection"],
    "united-kingdom": ["HRA/NHS ethics", "AWERB", "UKRI/funder compliance", "data protection", "charity and public-body routes"]
  };

  const publicOutputCategoryById = {
    "ku-leuven": "local-output",
    "university-of-amsterdam": "local-output",
    "universitat-de-barcelona": "national-or-sector-output",
    "university-of-cambridge": "local-output",
    "university-of-copenhagen": "local-output",
    "trinity-college-dublin": "national-or-sector-output",
    "university-of-edinburgh": "local-output",
    "university-of-freiburg": "historical-or-case-specific",
    "university-of-geneva": "procedure-only",
    "heidelberg-university": "procedure-only",
    "university-of-helsinki": "national-or-sector-output",
    "leiden-university": "local-output",
    "imperial-college-london": "local-output",
    "university-college-london": "local-output",
    "lund-university": "local-output",
    "university-of-milan": "restricted-or-internal-output",
    "lmu-munich": "procedure-only",
    "university-of-oxford": "local-output",
    "universite-paris-saclay": "procedure-only",
    "sorbonne-university": "local-output",
    "university-of-strasbourg": "national-or-sector-output",
    "utrecht-university": "local-output",
    "eth-zurich": "local-output",
    "university-of-zurich": "procedure-only"
  };

  const publicOutputCategoryNotesById = {
    "ku-leuven": "Institution-owned annual reports publish counts, admissibility outcomes and anonymized advice summaries.",
    "university-of-amsterdam": "Institution-owned CWI annual report evidence is present; field-level extraction remains pending.",
    "universitat-de-barcelona": "Public output is a Catalan CIR-CAT regional recommendation linked to UB/CERCA affiliation guidance, not a UB-owned archive.",
    "university-of-cambridge": "Institution-owned annual research-integrity reports provide anonymized allegation and investigation information.",
    "university-of-copenhagen": "Institution-owned Practice Committee annual reports and minutes form a local public-output lane.",
    "trinity-college-dublin": "Public output located is NRIF national aggregate reporting; no Trinity-owned output channel was identified.",
    "university-of-edinburgh": "Institution-owned annual research-integrity statements provide recurring public reporting.",
    "university-of-freiburg": "Public material is a historical sports-medicine/misconduct case complex; no current standing output channel was identified.",
    "university-of-geneva": "Procedure and discretionary publication authority are public, but no UNIGE-owned standing output channel was identified.",
    "heidelberg-university": "Procedure evidence is public and rules require anonymized annual reporting to the Rector, but no public output channel was identified.",
    "university-of-helsinki": "Public output located is TENK national statement-summary reporting after local processes; no Helsinki-owned output channel was identified.",
    "leiden-university": "Institution-owned CWI annual reports and advice/final-judgment pages provide local public output.",
    "imperial-college-london": "Institution-owned annual research-integrity statements provide recurring public reporting.",
    "university-college-london": "Institution-owned annual research-integrity statements provide recurring public reporting and committee-analysis fields.",
    "lund-university": "Institution-owned Review Board annual report evidence is present for the local other-deviations route.",
    "university-of-milan": "Committee opinions and minutes appear restricted; public material is governance/procedure context rather than output.",
    "lmu-munich": "Procedure evidence is public and publication is discretionary after final decisions, but no standing output channel was identified.",
    "university-of-oxford": "Institution-owned annual statements provide anonymized allegations and outcomes.",
    "universite-paris-saclay": "POLETHIS/RIS procedure evidence is public; no Paris-Saclay-owned signalement statistics or case-output channel was identified.",
    "sorbonne-university": "Institution-owned scientific-integrity annual reports provide annual activity and signalement evidence.",
    "university-of-strasbourg": "Public output located is OFIS national context; no Strasbourg-owned output channel was identified.",
    "utrecht-university": "Utrecht annual-report evidence and UNL sector case PDFs provide institution-linked public output.",
    "eth-zurich": "Institution-owned anonymized investigation report and procedure-statistics tables provide public output.",
    "university-of-zurich": "Procedure and contextual news evidence are public, but no UZH-owned standing output channel was identified."
  };

  const defaultCoverage = {
    countryDossier: "available",
    institutionalProcedure: "not checked",
    committeePage: "not checked",
    annualReportOrCaseOutput: "not checked",
    sourceRegistryLinks: 0
  };

  function member(record) {
    const countryContext = countryContexts[record.countryId] || "";
    const boundaryRegimes = record.boundaryRegimes || countryBoundaryRegimes[record.countryId] || [];
    const sourceCoverage = Object.assign({}, defaultCoverage, record.sourceCoverage || {});
    const publicOutputCategory = record.publicOutputCategory || publicOutputCategoryById[record.id] || "unclear";
    const publicOutputCategoryNote =
      record.publicOutputCategoryNote ||
      publicOutputCategoryNotesById[record.id] ||
      "No public-output category note recorded.";
    const institutionalEvidenceAvailable =
      sourceCoverage.institutionalProcedure === "available" ||
      sourceCoverage.committeePage === "available" ||
      Boolean(record.institutionalRoute || record.committeeOrOffice || record.procedureSummary);
    const hasPublicOutput = sourceCoverage.annualReportOrCaseOutput === "available";
    const tags = record.tags || [];

    return Object.assign(
      {
        alternativeNames: [],
        officialLeruMember: true,
        leruSource,
        inteStatus: "Needs validation",
        validationStatus: "Needs LERU member validation",
        countrySystemSummary: countryContext,
        nationalRoute: countryContext,
        institutionalRoute: "",
        committeeOrOffice: "",
        procedureSummary: "",
        publicOutputSummary: hasPublicOutput
          ? "Public annual-report or case-output evidence is present in the project seed."
          : "No public case-output channel identified in this pass.",
        publicOutputCategory,
        publicOutputCategoryNote,
        transparencySummary: hasPublicOutput
          ? "Public output evidence is present but still needs field-level extraction."
          : "No public case-output channel identified in this pass; this does not imply absence of cases.",
        boundaryRegimes,
        sourceCoverage,
        sourceLinks: [],
        countryDossierLink: record.countryId ? `../index.html#dossier-${record.countryId}` : "",
        relatedCountryProfileId: record.countryId || "",
        tags: Array.from(
          new Set([
            ...tags,
            institutionalEvidenceAvailable ? "institutional route" : "needs extraction",
            hasPublicOutput ? "public output" : "no public output located",
            "member validation"
          ])
        ),
        caveats: [
          "This is a public-source draft and not an official LERU or institutional validation.",
          "Do not infer absence of cases from absence of public case-output evidence."
        ],
        reportNotes: [],
        nextFollowUp: "Validate the profile against member-provided route and source information.",
        memberValidationQuestions: defaultValidationQuestions
      },
      record,
      {
        leruSource,
        officialLeruMember: true,
        countrySystemSummary: record.countrySystemSummary || countryContext,
        nationalRoute: record.nationalRoute || countryContext,
        publicOutputSummary:
          record.publicOutputSummary ||
          record.transparencySummary ||
          (hasPublicOutput
            ? "Public annual-report or case-output evidence is present in the project seed."
            : "No public case-output channel identified in this pass."),
        publicOutputCategory,
        publicOutputCategoryNote,
        boundaryRegimes,
        sourceCoverage,
        countryDossierLink: record.countryDossierLink || (record.countryId ? `../index.html#dossier-${record.countryId}` : ""),
        relatedCountryProfileId: record.relatedCountryProfileId || record.countryId || "",
        tags: Array.from(new Set([...(record.tags || []), institutionalEvidenceAvailable ? "institutional route" : "needs extraction", hasPublicOutput ? "public output" : "no public output located", "member validation"])),
        caveats: [
          "This is a public-source draft and not an official LERU or institutional validation.",
          "Do not infer absence of cases from absence of public case-output evidence.",
          ...(record.caveats || [])
        ],
        reportNotes: record.reportNotes || [],
        memberValidationQuestions: record.memberValidationQuestions || defaultValidationQuestions
      }
    );
  }

  window.LERU_MEMBER_METADATA = {
    title: "LERU research integrity pilot view",
    reportTitle: "Research integrity routes and transparency at LERU member universities",
    status: "Public-source draft for validation",
    lastUpdated: "2026-06-23",
    sourceBasis:
      "Official LERU members page plus existing country dossiers, transparency records, source registry entries and country source notes in this repository.",
    caveat:
      "Draft based on public sources and existing project data; not an official LERU statement. Institution-level details require member validation before they should be treated as finalized or authoritative.",
    officialMemberCount: 24,
    leruSource,
    validationNeeds: [
      "Validate the authoritative LERU and LERU INTE working-group scope before treating this as an INTE product.",
      "Confirm whether each institution wants the local route description framed as committee, office, ombuds, adviser network, annual statement route or another local term.",
      "Check whether public annual reports, case summaries or procedure pages are current and whether older outputs should be indexed.",
      "Keep research-misconduct handling separate from ethics review, clinical trials, animal research, data protection, IP, open science, quality assurance and teaching discipline.",
      "Avoid adding private contact details, unpublished member comments or sensitive case material to this static public-source view."
    ],
    crossCuttingFindings: [
      "The LERU membership spans strongly centralized, hybrid and distributed national systems; institution-level comparison only works when country route and local route are kept separate.",
      "Several members have visible institutional committees, offices or ombuds routes, but the terms used locally differ substantially.",
      "Public procedure evidence is more common than public case-output evidence.",
      "The strongest public-output examples in this seed are annual reports, anonymized summaries or institutional report tables rather than full case files.",
      "Boundary regimes such as biomedical ethics, animal research, data protection, IP, open science and funder compliance often create important public records but should not be recoded as misconduct handling."
    ],
    validationAgenda: [
      "Is the displayed office, committee, ombuds or procedure the correct first institutional route?",
      "Is there a public annual report, aggregate statistics page or anonymized case-output channel that should be added?",
      "Are there internal routes that matter operationally but should not be published in a public page?",
      "Which public sources are stable enough to cite as the member-facing evidence backbone?",
      "Which boundary regimes should be shown only as adjacent governance, not as research-misconduct adjudication?",
      "What non-personal validation pathway should be used for future updates?"
    ],
    deliberatelyExcluded: [
      {
        institution: "UCLouvain",
        reason:
          "Not represented as an official LERU member in the official LERU member-page baseline used for this report; do not conflate it with University College London."
      }
    ]
  };

  window.LERU_MEMBER_DATA = [
    member({
      id: "ku-leuven",
      institution: "KU Leuven",
      alternativeNames: ["Katholieke Universiteit Leuven"],
      countryId: "belgium",
      country: "Belgium",
      city: "Leuven",
      leruStatus: "Official LERU member; LERU INTE participation still needs validation.",
      reportStatus: "Detailed seed",
      profileStatus: "Transparency seed from existing project data",
      evidenceLevel: "Strong",
      transparencyCategory: "Annual reports and anonymized summaries",
      nationalRoute:
        "KU Leuven sits in the Flemish first-line institutional route, with VCWI available as a second-advice route after local handling.",
      institutionalRoute:
        "KU Leuven and UZ Leuven expose a Commission on Research Integrity, Research Integrity Reporting Desk and adviser/reporting route before any second-line VCWI advice.",
      committeeOrOffice: "Commission on Research Integrity; Research Integrity Reporting Desk; Research Integrity Advisers",
      procedureSummary:
        "Informal concerns can go to advisers; formal allegations go to the Reporting Desk and CRI route.",
      publicOutputSummary:
        "Annual reports publish counts, categories and anonymized CWI advice summaries.",
      transparencySummary:
        "One of the strongest Belgian first-line publication fragments, but not a national case archive.",
      sourceCoverage: {
        institutionalProcedure: "available",
        committeePage: "available",
        annualReportOrCaseOutput: "available",
        sourceRegistryLinks: 3
      },
      sourceLinks: [
        {
          label: "KU Leuven research integrity",
          url: "https://research.kuleuven.be/en/integrity-ethics/integrity",
          type: "official",
          supports: "institutional route",
          note: "Lists advisers, reporting desk, CRI, training and annual reports."
        },
        {
          label: "KU Leuven annual reports",
          url: "https://research.kuleuven.be/en/integrity-ethics/integrity/annual-report",
          type: "annual report",
          supports: "public output",
          note: "Supports the annual-report corridor."
        },
        {
          label: "KU Leuven annual report 2024",
          url: "https://research.kuleuven.be/en/integrity-ethics/integrity/annual-report/jaarverslag_2024",
          type: "annual report",
          supports: "representative public output",
          note: "Representative report with counts, admissibility outcomes and anonymized summaries."
        }
      ],
      tags: ["annual report", "anonymized summaries", "second-line advice", "VCWI"],
      caveats: ["Do not treat KU Leuven annual reports as a Belgian national case archive."],
      nextFollowUp:
        "Index KU Leuven annual-report rows by year, matter type, outcome and publication exclusions."
    }),
    member({
      id: "university-of-amsterdam",
      institution: "University of Amsterdam",
      alternativeNames: ["Universiteit van Amsterdam", "UvA"],
      countryId: "netherlands",
      country: "Netherlands",
      city: "Amsterdam",
      leruStatus: "Official LERU member; LERU INTE participation still needs validation.",
      reportStatus: "Detailed seed",
      profileStatus: "Transparency seed from existing project data",
      evidenceLevel: "Strong",
      transparencyCategory: "CWI annual report and complaint route",
      nationalRoute:
        "UvA sits in the Dutch institution-first CWI model under the national code, with LOWI second-line advice available for affiliated institutions after local handling.",
      institutionalRoute:
        "The UvA route directs concerns first to a supervisor or confidential adviser and then to a written complaint to the Academic Integrity Committee.",
      committeeOrOffice: "Academic Integrity Committee / CWI",
      procedureSummary:
        "Project data identifies the UvA complaint route and complaints-regulation PDF as institutional procedure evidence.",
      publicOutputSummary:
        "The UvA CWI annual report 2024 is recorded as an institutional annual-report corridor with advice summaries and yearly complaint/advice counts.",
      transparencySummary:
        "Public annual-report evidence is present for UvA, but it still needs structured row extraction.",
      sourceCoverage: {
        institutionalProcedure: "available",
        committeePage: "available",
        annualReportOrCaseOutput: "available",
        sourceRegistryLinks: 4
      },
      sourceLinks: [
        {
          label: "UvA complaint route",
          url: "https://www.uva.nl/en/research/research-environment/academic-integrity/submitting-a-complaint-about-a-breach-of-academic-integrity/submitting-a-complaint-about-a-breach-of-academic-integrity.html",
          type: "procedure",
          supports: "institutional complaint route",
          note: "Existing Netherlands dossier source for the UvA complaint route."
        },
        {
          label: "UvA complaints regulation",
          url: "https://www.uva.nl/binaries/content/assets/uva/en/about-the-uva/uva-profile/rules-and-regulations/research/klachtenregeling-wi-engels-2014-2.pdf",
          type: "procedure",
          supports: "complaints regulation",
          note: "English complaints-regulation PDF exposed through the UvA rules-and-regulations area."
        },
        {
          label: "UvA CWI annual report 2024",
          url: "https://www.uva.nl/binaries/content/assets/uva/nl/onderzoek/wetenschappelijke-integriteit/jaarverslag-cwi-2024.pdf",
          type: "annual report",
          supports: "public output",
          note: "Institutional CWI annual report with advice summaries and counts."
        }
      ],
      tags: ["CWI", "annual report", "LOWI", "Dutch institution-first route"],
      nextFollowUp: "Extract the UvA 2024 annual-report fields and check for earlier or later annual reports."
    }),
    member({
      id: "universitat-de-barcelona",
      institution: "Universitat de Barcelona",
      alternativeNames: ["University of Barcelona", "UB"],
      countryId: "spain",
      country: "Spain",
      city: "Barcelona",
      leruStatus: "Official LERU member; LERU INTE participation still needs validation.",
      reportStatus: "Detailed seed",
      profileStatus: "Detailed regional-output seed",
      validationStatus: "Needs member validation of UB route and CIR-CAT output context",
      evidenceLevel: "Strong",
      transparencyCategory: "UB code plus CIR-CAT institution-linked recommendation",
      countrySystemSummary:
        "Spain is represented as a distributed integrity system with national soft-law and committee networks, Catalan CIR-CAT/CERCA routes, institutional codes and separate ethics, quality-assurance and biomedical/animal/data boundaries.",
      nationalRoute:
        "UB sits inside the Spanish distributed model and Catalan regional layer: CIR-CAT can issue scientific-integrity recommendations for Catalan research-system matters, while UB maintains its own ethics/integrity portal and research-integrity code.",
      institutionalRoute:
        "UB is represented through its ethics and integrity portal, Code of Conduct for Research Integrity, institutional ethics committee infrastructure and Catalan CIR-CAT regional integrity route for the public UB/CERCA affiliation recommendation.",
      committeeOrOffice:
        "UB research-integrity code and ethics/integrity portal; UB ethics committees as boundary infrastructure; CIR-CAT regional integrity committee for the institution-linked recommendation",
      procedureSummary:
        "UB's official page states that research is conducted under the UB Code of Conduct for Research Integrity and identifies four committees that review ethical implications of projects. The UB code was approved by the Governing Council on 15 May 2020 and includes protocols for fraud, unacceptable practices and wrongful conduct. CIR-CAT's admission procedure provides the regional route for communications and recommendations.",
      publicOutputSummary:
        "No UB institutional annual integrity report or general case archive was identified. Public-output evidence is nevertheless present through CIR-CAT Recommendation 1/2025, a public regional integrity recommendation directly concerning UB doctoral-affiliation guidance and CERCA institutions.",
      transparencySummary:
        "Detailed seed because UB has an official institution-level code/route and a public institution-linked regional output. This is not a UB misconduct archive and should not be treated as general case-file publication.",
      sourceCoverage: {
        institutionalProcedure: "available",
        committeePage: "available",
        annualReportOrCaseOutput: "available",
        sourceRegistryLinks: 1
      },
      sourceLinks: [
        {
          label: "UB ethics and integrity",
          url: "https://web.ub.edu/en/ethics-integrity",
          type: "official",
          supports: "institutional route",
          note: "Supports integrity code, mailbox and committee infrastructure."
        },
        {
          label: "UB Code of Conduct for Research Integrity",
          url: "https://www.ub.edu/comissiobioetica/sites/default/files/documents/normativa/codi_dintegritat_en_la_recerca_de_la_universitat_de_barcelona.pdf",
          type: "procedure",
          supports: "institutional code",
          note: "Supports the institutional research-integrity code."
        },
        {
          label: "UB Code of Conduct for Research Integrity news item",
          url: "https://web.ub.edu/en/web/actualitat/w/the-ub-code-of-conduct-for-research-integrity-is-available-",
          type: "official",
          supports: "code approval and misconduct-protocol context",
          note: "Explains the code's approval and protocol role for fraud, unacceptable practices and wrongful conduct."
        },
        {
          label: "CIR-CAT admission and processing procedure",
          url: "https://recercaiuniversitats.gencat.cat/ca/01_departament_recerca_i_universitats/el_departament/organismes/circat/procediment-solicituds/index.html",
          type: "regional procedure",
          supports: "Catalan integrity-committee route and publication basis",
          note: "Official Catalan route for communications, requests and publication of CIR-CAT opinions under transparency rules."
        },
        {
          label: "CIR-CAT Recommendation 1/2025",
          url: "https://web.gencat.cat/content/dam/webgencat/documents/la-generalitat/com-ens-organitzem/departaments/recerca-universitats/cir-cat/recomanacio_1_2025.pdf",
          type: "regional public output",
          supports: "institution-linked integrity recommendation",
          note: "Public recommendation on UB doctoral-affiliation guidance and CERCA-linked research outputs."
        }
      ],
      tags: ["integrity code", "committee infrastructure", "ethics boundary", "CIR-CAT", "regional public output"],
      caveats: [
        "Do not treat CIR-CAT Recommendation 1/2025 as a UB institutional case archive.",
        "UB ethics committees, animal experimentation, biomedical ethics, data protection, quality assurance and open-science routes remain boundary material unless a source explicitly routes them into research-misconduct handling.",
        "No UB institutional annual integrity report or general public misconduct case-output channel was identified in this pass."
      ],
      reportNotes: [
        "Batch 3 moved UB to Detailed seed because CIR-CAT Recommendation 1/2025 gives public institution-linked integrity output, while preserving the negative finding for a UB-owned archive."
      ],
      nextFollowUp:
        "Validate whether UB publishes any institutional annual integrity report or case summary, and index CIR-CAT Recommendation 1/2025 by topic, route, recommendation and follow-up status.",
      memberValidationQuestions: [
        "Is the UB ethics/integrity portal plus Code of Conduct the correct member-facing institutional route?",
        "Should CIR-CAT Recommendation 1/2025 be shown as regional institution-linked output rather than UB-owned reporting?",
        "Does UB publish annual research-integrity statistics, anonymized summaries or committee activity reports beyond the pages located here?",
        "Which UB committees should be listed as boundary ethics review rather than misconduct handling?",
        "How should CERCA, CIR-CAT and UB responsibilities be separated in a validated LERU profile?"
      ]
    }),
    member({
      id: "university-of-cambridge",
      institution: "University of Cambridge",
      countryId: "united-kingdom",
      country: "United Kingdom",
      city: "Cambridge",
      leruStatus: "Official LERU member; LERU INTE participation still needs validation.",
      reportStatus: "Detailed seed",
      profileStatus: "Seed profile from existing project data",
      evidenceLevel: "Strong",
      transparencyCategory: "Annual report hub and misconduct procedure",
      nationalRoute:
        "Cambridge is part of the UK employer-led Concordat annual-statement corridor.",
      institutionalRoute:
        "Cambridge has a research-integrity reports hub and a misconduct procedure page; the repository notes the current procedure applies to allegations received from 12 February 2026.",
      committeeOrOffice: "Research integrity reports hub and research misconduct procedure",
      procedureSummary:
        "Official procedure page is present and current-version dating is noted in the UK dossier.",
      publicOutputSummary:
        "The report hub is described as including anonymized information about how allegations were assessed and investigated.",
      transparencySummary:
        "Annual-report hub and misconduct procedure are present; report fields still need structured extraction.",
      sourceCoverage: {
        institutionalProcedure: "available",
        committeePage: "available",
        annualReportOrCaseOutput: "available",
        sourceRegistryLinks: 2
      },
      sourceLinks: [
        {
          label: "Cambridge research integrity reports",
          url: "https://www.cam.ac.uk/research/integrity/reports",
          type: "annual report",
          supports: "annual-statement directory",
          note: "Supports the annual-statement directory and anonymized assessment/investigation information."
        },
        {
          label: "Cambridge research misconduct procedure",
          url: "https://www.cam.ac.uk/research/integrity/research-misconduct",
          type: "procedure",
          supports: "institutional procedure",
          note: "Supports the misconduct procedure route."
        }
      ],
      tags: ["annual report", "misconduct procedure", "UK Concordat"],
      nextFollowUp:
        "Index Cambridge reports by statement year, allegation handling stage, investigation count and outcome category."
    }),
    member({
      id: "university-of-copenhagen",
      institution: "University of Copenhagen",
      countryId: "denmark",
      country: "Denmark",
      city: "Copenhagen",
      leruStatus: "Official LERU member; LERU INTE participation still needs validation.",
      reportStatus: "Detailed seed",
      profileStatus: "Transparency seed from existing project data",
      evidenceLevel: "Strong",
      transparencyCategory: "Practice Committee annual reports and minutes",
      institutionalRoute:
        "The Practice Committee assesses responsible-conduct issues, receives complaints, publishes rules, annual reports and meeting minutes, handles cases returned from NVU and can refer suspected misconduct to the national Board.",
      committeeOrOffice: "Practice Committee and Named Persons",
      procedureSummary:
        "Committee page, publication hub and institutional code route are represented in the Denmark dossier.",
      publicOutputSummary:
        "The 2024 Practice Committee annual report is coded as the strongest local institutional publication example found in the Denmark pass.",
      transparencySummary:
        "Annual reports and minutes create a local public-output lane, distinct from the NVU national misconduct route.",
      sourceCoverage: {
        institutionalProcedure: "available",
        committeePage: "available",
        annualReportOrCaseOutput: "available",
        sourceRegistryLinks: 1
      },
      sourceLinks: [
        {
          label: "UCPH Practice Committee",
          url: "https://praksisudvalget.ku.dk/english/",
          type: "committee page",
          supports: "committee and complaint route",
          note: "Committee page with complaint route, rules, annual reports and contact route."
        },
        {
          label: "UCPH annual reports and minutes",
          url: "https://praksisudvalget.ku.dk/publikationer/",
          type: "annual report",
          supports: "publication hub",
          note: "Official publication page with annual reports and meeting minutes."
        },
        {
          label: "UCPH Practice Committee Annual Report 2024",
          url: "https://praksisudvalget.ku.dk/publikationer/_rsberetning_2024_Praksisudvalget_K_benhavns_Universitet.pdf",
          type: "annual report",
          supports: "local QRP and returned-case summaries",
          note: "Contains case summaries, rejections and matters returned from NVU to local handling."
        }
      ],
      tags: ["Practice Committee", "annual report", "minutes", "returned cases"],
      caveats: ["Do not merge UCPH local QRP publication with NVU national misconduct publication."],
      nextFollowUp: "Index UCPH annual reports and minutes by case type, returned-case status and local outcome category."
    }),
    member({
      id: "trinity-college-dublin",
      institution: "Trinity College Dublin",
      countryId: "ireland",
      country: "Ireland",
      city: "Dublin",
      leruStatus: "Official LERU member; LERU INTE participation still needs validation.",
      reportStatus: "Detailed seed",
      profileStatus: "Detailed national-output/no-local-output audit seed",
      validationStatus: "Needs member validation of local output-negative finding",
      evidenceLevel: "Moderate",
      transparencyCategory: "Senior Dean RIO route with NRIF national-statistics context",
      countrySystemSummary:
        "Ireland is represented through NRIF/IUA coordination, national aggregate statistics and institution-level research-performing-organisation policies rather than a national case tribunal or a universal public case archive.",
      nationalRoute:
        "Trinity sits inside Ireland's RPO-led model: local allegations are handled by the institution, while NRIF/IUA publishes national aggregate formal-investigation statistics across participating state-funded RPOs. NRIF output should not be treated as Trinity-specific unless the report identifies Trinity in a local case or institutional count.",
      institutionalRoute:
        "Trinity is represented through the Senior Dean as College RIO, the Dean of Research route for managing allegations, Associate Dean advice points and a confidential reporting route through the research-integrity process.",
      committeeOrOffice: "Senior Dean as College RIO; Dean of Research and Associate Dean research-integrity route",
      procedureSummary:
        "The Senior Dean page and 15 February 2024 Good Research Practice policy identify the Senior Dean as College Research Integrity Officer, delegate allegation management to the Dean of Research, and route upheld matters to the relevant staff or student disciplinary process. The policy also separates research misconduct from academic-integrity, dignity/respect, protected-disclosure and fraud routes, while the 2026 fraud policy confirms that research fraud can involve consultation with the College RIO or Dean of Research.",
      publicOutputSummary:
        "No Trinity-owned public case-output channel, annual research-integrity statement, anonymized institutional case-summary page or local aggregate misconduct-statistics channel was identified in this pass. Ireland's NRIF/IUA corridor publishes national aggregate formal-investigation statistics, and the 2023 report includes Trinity in the responding RPO universe, but those reports do not provide Trinity-specific counts or case narratives.",
      transparencySummary:
        "Detailed no-local-output audit seed: the local route is well documented, national aggregate output exists, and the local output gap is now explicitly audited. Public evidence remains procedure-route evidence plus national aggregate context rather than Trinity-specific transparency output.",
      sourceCoverage: {
        institutionalProcedure: "available",
        committeePage: "available",
        annualReportOrCaseOutput: "none located locally; national aggregate available; fraud boundary reporting separate",
        sourceRegistryLinks: 3
      },
      sourceLinks: [
        {
          label: "Trinity Senior Dean Research Integrity",
          url: "https://www.tcd.ie/seniordean/research-integrity/",
          type: "official",
          supports: "institutional RIO route",
          note: "Defines the Senior Dean as College RIO and explains delegation."
        },
        {
          label: "Trinity Policy on Good Research Practice",
          url: "https://www.tcd.ie/media/tcd/about/policies/pdfs/Policy-on-Good-Research-Practice_1.1.pdf",
          type: "procedure",
          supports: "good-practice policy",
          note: "Version 1.1, issued 15 February 2024, supports good-practice policy and misconduct process source."
        },
        {
          label: "Trinity Research Integrity support page",
          url: "https://www.tcd.ie/research/support/integrity.php",
          type: "official",
          supports: "research-integrity advice and reporting route",
          note: "Confirms the policy route, Associate Dean advice points and confidential reporting path."
        },
        {
          label: "IUA National Forum on Research Integrity page",
          url: "https://www.iua.ie/for-researchers/research-integrity/",
          type: "national monitoring",
          supports: "Irish national aggregate statistics corridor",
          note: "NRIF publishes national annual statistics for state-funded RPOs; this is not a Trinity case archive."
        },
        {
          label: "NRIF annual statistics on formal investigations of research misconduct 2023",
          url: "https://www.iua.ie/wp-content/uploads/2025/07/National-Stats-on-Formal-Investigations-of-Research-Misconduct-2023.pdf",
          type: "annual statistics",
          supports: "national aggregate output",
          note: "Latest located national statistics report; annex lists Trinity among responding RPOs."
        },
        {
          label: "Trinity Anti-Fraud and Anti-Corruption Policy",
          url: "https://www.tcd.ie/media/tcd/about/policies/pdfs/Fraud-Policy.pdf",
          type: "boundary procedure",
          supports: "research-fraud boundary and annual anonymous fraud-reporting route",
          note: "Boundary evidence only: research fraud can involve the College RIO or Dean of Research, but the annual fraud report is not a research-integrity case-output channel."
        }
      ],
      tags: ["RIO", "policy", "procedure only", "NRIF national aggregate statistics", "no local output identified"],
      caveats: [
        "Do not treat NRIF national aggregate statistics as Trinity-specific case publication.",
        "Research ethics approvals, data protection, student academic-integrity, dignity/respect, protected-disclosure and anti-fraud routes should remain separate from research-misconduct handling unless the Good Research Practice policy explicitly connects the matter.",
        "Do not infer absence of Trinity cases from the absence of a Trinity-specific public output channel."
      ],
      reportNotes: [
        "Batch 4 upgraded Trinity to Detailed seed as a no-local-output audit profile: local procedure and national aggregate context are clear, but Trinity-specific public output remains unlocated."
      ],
      nextFollowUp:
        "Validate with Trinity whether any non-personal annual research-integrity statistics, lessons-learned notes or governance-report entries exist outside the public Senior Dean, Research and NRIF pages.",
      memberValidationQuestions: [
        "Is the Senior Dean/RIO plus delegated Dean of Research route the correct public route for a LERU-facing profile?",
        "Does Trinity publish a research-integrity annual statement, aggregate misconduct statistics or anonymized lessons-learned material outside the pages located here?",
        "Should the national NRIF statistics be linked as context only or included in the member profile source backbone?",
        "Should the anti-fraud policy be shown only as a boundary route for research-fraud matters?",
        "Are student academic-integrity, research ethics and misconduct routes separated correctly?"
      ]
    }),
    member({
      id: "university-of-edinburgh",
      institution: "University of Edinburgh",
      countryId: "united-kingdom",
      country: "United Kingdom",
      city: "Edinburgh",
      leruStatus: "Official LERU member; LERU INTE participation still needs validation.",
      reportStatus: "Detailed seed",
      profileStatus: "Detailed annual-statement seed",
      evidenceLevel: "Strong",
      transparencyCategory: "Annual research integrity statement corridor with misconduct reporting route",
      nationalRoute:
        "Edinburgh is represented as a Scotland example inside the UK employer-led Concordat annual-statement corridor.",
      institutionalRoute:
        "Edinburgh publishes an annual research-integrity statement hub aligned to the UK Concordat and a current research-misconduct page that identifies the Vice Principal Research & Innovation as the main responsible contact, with delegated College named-person routes.",
      committeeOrOffice: "Vice Principal Research & Innovation route; delegated College named-person routes; annual research-integrity statement hub",
      procedureSummary:
        "The official research-integrity pages identify the misconduct definition, reporting route and College-level procedure pages. The annual statement hub states that each annual statement provides assurance on processes and a high-level overview of formal investigations, including case counts.",
      publicOutputSummary:
        "Public annual research-integrity statements are available from 2014-2015 through 2025-2026. They are an annual-statement and aggregate-output corridor, not a complete individual case-file archive.",
      transparencySummary:
        "Detailed public-output route now verified through the statement hub and current misconduct page. Field-level extraction by statement year, allegation count and investigation outcome remains pending.",
      sourceCoverage: {
        institutionalProcedure: "available",
        committeePage: "available",
        annualReportOrCaseOutput: "available",
        sourceRegistryLinks: 1
      },
      sourceLinks: [
        {
          label: "University of Edinburgh annual research ethics and integrity reports",
          url: "https://research-office.ed.ac.uk/research-integrity/annual-research-ethics-and-integrity-reports",
          type: "annual report",
          supports: "institutional annual-report route",
          note: "Representative Scotland institutional annual-report route for research ethics and integrity."
        },
        {
          label: "University of Edinburgh Annual Research Integrity Statements",
          url: "https://research-office.ed.ac.uk/research-ethics-integrity/annual-research-integrity-statements",
          type: "annual report hub",
          supports: "public annual-statement archive",
          note: "Official hub lists statements from 2014-2015 through 2025-2026."
        },
        {
          label: "University of Edinburgh research misconduct page",
          url: "https://research-office.ed.ac.uk/research-integrity/research-misconduct",
          type: "procedure",
          supports: "misconduct definition and reporting route",
          note: "Identifies responsible contact, College delegated routes and cross-institutional Russell Group cooperation."
        },
        {
          label: "University of Edinburgh Annual Research Integrity Statement 2025-2026",
          url: "https://research-office.ed.ac.uk/sites/default/files/2026-05/2025%20-%202026%20University%20of%20Edinburgh%20Annual%20Research%20Integrity%20Statement.pdf",
          type: "annual statement",
          supports: "latest located annual statement",
          note: "Current latest statement linked from the official annual-statement hub."
        }
      ],
      tags: ["annual report", "annual statement", "UK Concordat", "Scotland", "public output"],
      caveats: [
        "Annual statements should not be treated as a full case-file archive.",
        "Research ethics review and misconduct handling should stay separate unless a statement explicitly links them."
      ],
      reportNotes: [
        "Batch 2 moved Edinburgh to Detailed seed because the official statement hub and current misconduct route are now verified."
      ],
      nextFollowUp:
        "Index Edinburgh annual statements by year, named route, allegation count, formal investigation count, outcome and lessons-learned depth.",
      memberValidationQuestions: [
        "Is the Vice Principal Research & Innovation plus delegated College named-person framing the preferred public route?",
        "Should the 2025-2026 statement be treated as the latest current source despite the academic-year label?",
        "Which annual-statement fields should be extracted first for comparison with Oxford, Cambridge, Imperial and UCL?",
        "How should College-specific misconduct pages be represented without overloading the LERU member profile?",
        "Are ethics-review and misconduct-reporting signals separated clearly enough?"
      ]
    }),
    member({
      id: "university-of-freiburg",
      institution: "University of Freiburg",
      alternativeNames: ["Albert-Ludwigs-Universitat Freiburg"],
      countryId: "germany",
      country: "Germany",
      city: "Freiburg",
      leruStatus: "Official LERU member; LERU INTE participation still needs validation.",
      reportStatus: "Detailed seed",
      profileStatus: "Detailed historical-output/no-current-output audit seed",
      validationStatus: "Needs member validation of current output-negative finding",
      evidenceLevel: "Moderate",
      transparencyCategory: "Ombudsperson and investigation commission route",
      countrySystemSummary:
        "Germany has a distributed integrity system with the DFG Code, institution-level ombudsperson and investigation routes, the German Research Ombudsman, DFG sanctions/output, OWID reporting and separate ethics, animal, data, medical and research-security boundaries.",
      nationalRoute:
        "Freiburg belongs to the German institution-first route: the local ombudsperson/self-control route and investigation commission are the Freiburg handling route, while DFG/OWID publication lanes and the German Research Ombudsman are national or system-level context rather than Freiburg's own standing output channel.",
      institutionalRoute:
        "Freiburg presents its research-integrity route through its Redlichkeit in der Wissenschaft page, the university regulation on safeguarding academic integrity, ombudsperson/self-control structures and the Investigation Commission for safeguarding honesty in science.",
      committeeOrOffice:
        "Ombudsperson/self-control route; Investigation Commission for safeguarding honesty in science; coordination office for Redlichkeit in der Wissenschaft",
      procedureSummary:
        "The university page states that Freiburg has legally implemented the DFG good-scientific-practice guidelines through its Redlichkeit regulation. The regulation and commission page identify an ombudsperson/self-control route for suspected misconduct and an Investigation Commission that advises the Rector and investigates suspected scientific misconduct. The same commission page also exposes responsibility-in-research and ethics commission routes that should remain boundary material.",
      publicOutputSummary:
        "No current standing Freiburg public case-output channel, annual ombudsperson/commission statistics page or recurring anonymized decision archive was identified in this pass. Freiburg does maintain a historical public page on the sports-medicine/doping misconduct complex, including reports, press material and a 2021/2024 status-report route; this is case-specific historical transparency, not a general current misconduct-output archive.",
      transparencySummary:
        "Detailed historical-output audit seed: the route is clear and a historical case complex is public, but no current recurring output mechanism was located. Public evidence should be described as procedure visibility plus limited historical case-complex material.",
      sourceCoverage: {
        institutionalProcedure: "available",
        committeePage: "available",
        annualReportOrCaseOutput: "limited historical case material; no current standing output",
        sourceRegistryLinks: 0
      },
      sourceLinks: [
        {
          label: "University of Freiburg Redlichkeit in der Wissenschaft",
          url: "https://uni-freiburg.de/forschung/qualitaetssicherung/gute-wissenschaftliche-praxis/redlichkeit-in-der-wissenschaft/",
          type: "procedure hub",
          supports: "DFG implementation and Freiburg integrity regulation route",
          note: "Official university page for good scientific practice and Redlichkeit in der Wissenschaft."
        },
        {
          label: "University of Freiburg regulation on safeguarding academic integrity",
          url: "https://uni-freiburg.de/wp-content/uploads/Uni-Freiburg-Ordnung-Redlichkeit-in-der-Wissenschaft-en.pdf",
          type: "procedure",
          supports: "ombudsperson and suspected-misconduct procedure",
          note: "English convenience translation; German original remains authoritative."
        },
        {
          label: "University of Freiburg research commissions",
          url: "https://uni-freiburg.de/forschung/qualitaetssicherung/forschungskommissionen/",
          type: "committee page",
          supports: "Investigation Commission remit and committee visibility",
          note: "Identifies the commission that advises the Rector and investigates suspected scientific misconduct."
        },
        {
          label: "University of Freiburg sports medicine and misconduct public page",
          url: "https://uni-freiburg.de/themen-im-fokus/aufklaerungsarbeit-zu-doping-sportmedizin-und-wissenschaftlichem-fehlverhalten/",
          type: "historical public case material",
          supports: "case-specific historical transparency",
          note: "Use only as historical case-complex evidence, not as proof of a standing public misconduct archive."
        }
      ],
      tags: ["official-source seed", "Germany", "ombudsperson", "investigation commission", "historical case material", "no current standing output"],
      caveats: [
        "The sports-medicine material is a historical case complex, not a general current public case-output route.",
        "Do not treat research ethics, responsibility-in-research, dual-use, medical ethics or medical faculty awareness pages as misconduct adjudication.",
        "Do not infer absence of current Freiburg cases from the absence of a standing public output channel."
      ],
      reportNotes: [
        "Batch 4 upgraded Freiburg to Detailed seed as a historical-output/no-current-output audit profile; the sports-medicine page remains case-specific, not a standing archive."
      ],
      nextFollowUp:
        "Validate whether Freiburg publishes current annual statistics, newer non-personal summaries or institutional report references beyond the historical sports-medicine complex.",
      memberValidationQuestions: [
        "Is the Redlichkeit in der Wissenschaft route the preferred public framing for Freiburg?",
        "Should the ombudsperson/self-control route and Investigation Commission be shown separately in the member view?",
        "Is there a current annual report, aggregate statistic or public-output page that should be added?",
        "How should the historical sports-medicine material be referenced without implying a general case archive?",
        "Which boundary routes, including research ethics, dual-use and medical faculty awareness material, should remain separate?"
      ]
    }),
    member({
      id: "university-of-geneva",
      institution: "University of Geneva",
      alternativeNames: ["Universite de Geneve", "UNIGE"],
      countryId: "switzerland",
      country: "Switzerland",
      city: "Geneva",
      leruStatus: "Official LERU member; LERU INTE participation still needs validation.",
      reportStatus: "Detailed seed",
      profileStatus: "Detailed procedure-only/no-output audit seed",
      validationStatus: "Needs member validation of UNIGE output-negative finding",
      evidenceLevel: "Moderate",
      transparencyCategory: "Scientific-integrity directive and ethics-reference route",
      countrySystemSummary:
        "Switzerland is coded as fragmented funder and institutional visibility rather than one national misconduct board, with SCCSI, SNSF and ETH-style outputs kept distinct from individual university routes.",
      nationalRoute:
        "UNIGE sits inside the Swiss institution-first model: the UNIGE directive defines local handling, while SCCSI and Swiss Academies material are framework context rather than a UNIGE case-output route.",
      institutionalRoute:
        "UNIGE presents scientific integrity through its Research Ethics/RGO page, a dedicated Memento directive on integrity in scientific research and breach procedure, faculty integrity delegates, possible ad hoc fact-finding commissions, the Rectorate decision route and the Ethics and Professional Conduct Committee as a wider ethics/professional-conduct reference.",
      committeeOrOffice: "Faculty integrity delegates; ad hoc fact-finding commission; Rectorate decision route; Ethics and Professional Conduct Committee; RGO/CUREG boundary routes",
      procedureSummary:
        "The RGO research-ethics page states that UNIGE has a dedicated directive to prevent breaches of integrity and protect scientific-work quality, and that specific procedures identify, assess and sanction breaches. The Memento directive applies to research and teaching, routes suspected integrity breaches to the Rectorate and faculty delegate, allows an ad hoc fact-finding commission, and gives the Rectorate closure, sanction and possible corrective-publication decisions. CUREG links the same directive while remaining an ethical-review route.",
      publicOutputSummary:
        "No UNIGE-owned public case-output channel, annual integrity-statistics page, ombudsperson report or anonymized decision archive was identified in this pass. The directive says procedures are generally confidential and that the Rectorate decides the timing, form and content of any publication; that is discretionary publication authority, not a standing public-output channel.",
      transparencySummary:
        "Detailed procedure-only audit seed: UNIGE's breach procedure is clear, current and publicly linked, but public evidence is procedure-route evidence rather than case-output evidence. CUREG outputs and ethical-risk statements are research-ethics governance, not misconduct case publication.",
      sourceCoverage: {
        institutionalProcedure: "available",
        committeePage: "available",
        annualReportOrCaseOutput: "none located; discretionary publication only",
        sourceRegistryLinks: 0
      },
      sourceLinks: [
        {
          label: "UNIGE research ethics",
          url: "https://www.unige.ch/recherche/en/resources/research-ethics",
          type: "official",
          supports: "scientific-integrity directive context and research-ethics route",
          note: "States that UNIGE uses a dedicated scientific-integrity directive and procedures for breaches."
        },
        {
          label: "UNIGE code of ethics and professional conduct",
          url: "https://www.unige.ch/ethique/charter",
          type: "official",
          supports: "ethics/professional-conduct reference route",
          note: "Includes research-integrity principles, falsification, plagiarism, authorship and conflicts."
        },
        {
          label: "UNIGE directive on integrity in scientific research",
          url: "https://memento.unige.ch/doc/0003",
          type: "procedure",
          supports: "scientific-integrity procedure and breach-handling reference",
          note: "Official Memento directive linked from UNIGE research-ethics/CUREG resources."
        },
        {
          label: "CUREG how-we-work page",
          url: "https://cureg.unige.ch/en/how-we-work/",
          type: "boundary route",
          supports: "ethical-review boundary and directive cross-reference",
          note: "Useful boundary source; CUREG is not the general misconduct adjudication route."
        }
      ],
      tags: ["official-source seed", "procedure only", "ethics boundary", "Swiss institutional route", "no public output identified"],
      caveats: [
        "No public UNIGE misconduct case-output channel was identified in this pass.",
        "Do not treat discretionary Rectorate publication authority as a recurring public output channel.",
        "CUREG, ethical-risk statements, faculty medicine ombuds support, human-research ethics and data-management routes are boundary governance, not misconduct case publication.",
        "Do not infer absence of UNIGE cases from the absence of a public output channel."
      ],
      reportNotes: [
        "Batch 4 upgraded UNIGE to Detailed seed as a procedure-only/no-output audit profile; use the UNIGE directive as the scientific-integrity backbone and the RGO/CUREG pages as route and boundary context."
      ],
      nextFollowUp:
        "Validate whether UNIGE publishes any non-personal annual integrity statistics, Rectorate summaries or anonymized case-learning material, or whether publication remains discretionary and exceptional.",
      memberValidationQuestions: [
        "Is the UNIGE Memento directive the preferred public source for the institution's scientific-integrity procedure?",
        "Should faculty integrity delegates and the Rectorate be shown as the main breach-handling route, with the Ethics and Professional Conduct Committee as broader ethics context?",
        "Does UNIGE publish aggregate integrity statistics, annual reporting or anonymized case summaries?",
        "Which CUREG, animal, human-research, data and open-science routes should remain boundary material?",
        "What non-personal validation path should be used for future updates?"
      ]
    }),
    member({
      id: "heidelberg-university",
      institution: "Heidelberg University",
      alternativeNames: ["Universitat Heidelberg"],
      countryId: "germany",
      country: "Germany",
      city: "Heidelberg",
      leruStatus: "Official LERU member; LERU INTE participation still needs validation.",
      reportStatus: "Detailed seed",
      profileStatus: "Detailed procedure-only/no-output audit seed",
      validationStatus: "Needs member validation of Heidelberg output-negative finding",
      evidenceLevel: "Moderate",
      transparencyCategory: "Ombuds and commission procedure route",
      countrySystemSummary:
        "Germany is represented as a distributed integrity system built from the DFG Code, institutional ombudsperson and investigation routes, the national German Research Ombudsman, DFG sanctions/output, OWID reporting and separate ethics, clinical, animal, data and IP boundaries.",
      nationalRoute:
        "Heidelberg belongs to the German institution-first model: the local ombudsmen and commission are the first Heidelberg route, while the national German Research Ombudsman and DFG routes remain second-line or funder-level context rather than Heidelberg output.",
      institutionalRoute:
        "Heidelberg publishes a good-academic-practice framework with Senate-appointed ombudsmen as first contacts for suspected academic misconduct and a rectorate standing commission that investigates allegations, evaluates cases and recommends or takes measures. Responsibility in science, fair-conduct, ethics and doctoral support routes are adjacent but separate.",
      committeeOrOffice: "Ombudsmen for good academic practice; Commission for the Safeguarding of Good Academic Practice; separate responsibility-in-science and doctoral/fair-conduct routes",
      procedureSummary:
        "The university-wide good-academic-practice page states that the rectorate has a standing commission to investigate academic-misconduct allegations and that ombudsmen or the commission chair serve as initial contacts. The rules PDF defines academic misconduct, ombudsperson duties and annual general anonymized reporting to the rector, but no public annual output was located.",
      publicOutputSummary:
        "No Heidelberg public misconduct case-output channel, annual ombuds/commission statistics page or anonymized decision archive was identified in this pass. The rules require the ombudspersons to report annually to the Rector in general, anonymized form, but no public version of that internal reporting was located.",
      transparencySummary:
        "Procedure visibility is strong, but public-output visibility remains negative in this pass. Doctoral ombuds, fair-conduct/workplace, ethics review, responsibility-in-science and plagiarism-support material should remain separate from research-misconduct handling unless the academic-misconduct procedure is explicitly invoked.",
      sourceCoverage: {
        institutionalProcedure: "available",
        committeePage: "available",
        annualReportOrCaseOutput: "none located publicly; internal anonymized report to Rector only",
        sourceRegistryLinks: 2
      },
      sourceLinks: [
        {
          label: "Heidelberg ombudsmen for academic practice",
          url: "https://www.uni-heidelberg.de/en/university/about-the-university/good-academic-practice/ombudsmen",
          type: "official",
          supports: "university-wide first-contact route",
          note: "Explains the ombudsmen's counselling, plausibility-assessment and commission-referral role."
        },
        {
          label: "Graduate Academy ombudsperson",
          url: "https://www.graduateacademy.uni-heidelberg.de/beratung/ombudsperson_en.html",
          type: "official",
          supports: "doctoral ombuds route",
          note: "Shows mediation-oriented doctoral route."
        },
        {
          label: "Heidelberg rules and guidelines on good academic practice",
          url: "https://www.uni-heidelberg.de/en/university/about-the-university/good-academic-practice",
          type: "procedure hub",
          supports: "misconduct rules, ombudsmen and commission links",
          note: "Official hub for good academic practice and misconduct handling."
        },
        {
          label: "Rules for safeguarding good academic practice and handling academic misconduct",
          url: "https://backend.uni-heidelberg.de/en/documents/rules-for-safeguarding-good-academic-practice-and-handling-academic-misconduct/download",
          type: "procedure",
          supports: "academic-misconduct definition and ombudsperson/commission procedure",
          note: "English rules PDF; use for procedure detail."
        },
        {
          label: "Statute on Safeguarding Fair Conduct",
          url: "https://backend.uni-heidelberg.de/en/documents/statute-on-safeguarding-fair-conduct/download",
          type: "boundary procedure",
          supports: "fair-conduct boundary route",
          note: "Boundary source for workplace and fair-conduct matters; keep separate from academic-misconduct output."
        }
      ],
      tags: ["official-source seed", "ombuds", "commission route", "procedure only", "Germany distributed model"],
      caveats: [
        "No Heidelberg public case-output channel or annual statistics page was identified in this pass.",
        "The rules' annual anonymized report to the Rector is internal reporting evidence, not a public output channel.",
        "Graduate Academy, plagiarism-detection, responsibility-in-science, ethics-review and fair-conduct/workplace sources are support or boundary routes unless the academic-misconduct procedure is invoked.",
        "Do not infer absence of Heidelberg cases from the absence of a public output channel."
      ],
      reportNotes: [
        "Batch 5 upgraded Heidelberg to Detailed seed as a procedure-only/no-output audit profile: official route evidence is strong, internal anonymized reporting is noted, and no public output lane was located."
      ],
      nextFollowUp:
        "Check whether the Commission for the Safeguarding of Good Academic Practice or Rectorate publishes any non-personal annual activity, general anonymized reporting or outcome summaries.",
      memberValidationQuestions: [
        "Is the ombudsmen-plus-commission framing the correct public Heidelberg route?",
        "Should the Graduate Academy ombudsperson, responsibility-in-science commission and fair-conduct statute be included only as boundary/support routes?",
        "Does Heidelberg publish annual ombuds, commission or misconduct statistics?",
        "Are any public outputs available beyond the procedure pages and rules PDF?",
        "Which workplace-conflict, study/exam and plagiarism-support routes should remain outside the research-misconduct profile?"
      ]
    }),
    member({
      id: "university-of-helsinki",
      institution: "University of Helsinki",
      countryId: "finland",
      country: "Finland",
      city: "Helsinki",
      leruStatus: "Official LERU member; LERU INTE participation still needs validation.",
      reportStatus: "Detailed seed",
      profileStatus: "Detailed national-output/no-local-output audit seed",
      validationStatus: "Needs member validation of Helsinki output-negative finding",
      evidenceLevel: "Moderate",
      transparencyCategory: "Chancellor and adviser route with TENK national-output context",
      institutionalRoute:
        "The University of Helsinki route sets out responsible-conduct premises, research-integrity adviser support, misconduct categories and written notification to the chancellor. Helsinki is listed among organisations committed to TENK's 2023 RI guideline.",
      committeeOrOffice: "Research-integrity adviser/support route; chancellor notification route",
      procedureSummary:
        "Helsinki's page explains adviser support, distinguishes disregard for good research practices from research misconduct and directs allegations in writing to the chancellor. TENK remains the national second-line statement route after local handling.",
      publicOutputSummary:
        "No Helsinki local public case archive, annual integrity statistics page or anonymized local decision channel was identified in this pass. National TENK statement summaries and annual reports remain the public-output route for the Finnish system after local processes.",
      transparencySummary:
        "Helsinki is a clear local first-instance route inside the TENK model, but public output is national-summary-based rather than a Helsinki local archive.",
      sourceCoverage: {
        institutionalProcedure: "available",
        committeePage: "available",
        annualReportOrCaseOutput: "none located locally; TENK national summaries available",
        sourceRegistryLinks: 1
      },
      sourceLinks: [
        {
          label: "University of Helsinki research integrity",
          url: "https://www.helsinki.fi/en/research/research-integrity/research-ethics/responsible-conduct-research",
          type: "official",
          supports: "institutional process example",
          note: "Supports adviser role, misconduct categories and notification to the chancellor."
        },
        {
          label: "University of Helsinki research ethics",
          url: "https://www.helsinki.fi/en/research/research-integrity/research-ethics",
          type: "official",
          supports: "ethics boundary",
          note: "Connects responsible conduct, ethics committees, data management and national expert bodies."
        },
        {
          label: "TENK organisations committed to RI/RCR guidelines",
          url: "https://tenk.fi/en/research-integrity/organisations-committed-rircr-guidelines",
          type: "national route",
          supports: "Helsinki commitment to TENK RI 2023 and RCR 2012 framework",
          note: "Lists University of Helsinki among committed organisations; national context, not local output."
        },
        {
          label: "TENK statement summaries",
          url: "https://tenk.fi/en/research-integrity/tenks-statement-summaries",
          type: "national public-output route",
          supports: "national anonymized statement-summary archive after local RI processes",
          note: "National route; do not treat as a Helsinki local archive unless a summary identifies Helsinki."
        },
        {
          label: "University of Helsinki annual reviews",
          url: "https://www.helsinki.fi/en/about-us/university-helsinki/annual-reviews",
          type: "annual report hub",
          supports: "local annual-report retest point",
          note: "General annual/statistical reports; no local research-integrity case-output channel was identified in this pass."
        }
      ],
      tags: ["official-source seed", "procedure only", "adviser network", "TENK", "national summaries"],
      caveats: [
        "No Helsinki local public case-output channel was identified in this pass.",
        "TENK statement summaries are national second-line output and should not be recoded as Helsinki local publication unless a specific summary identifies Helsinki.",
        "Research ethics committees, medical ethics, data management and permit routes remain boundary regimes."
      ],
      reportNotes: [
        "Batch 5 upgraded Helsinki to Detailed seed as a national-output/no-local-output audit profile: local first-instance handling is clear, while public output remains TENK national-summary based rather than Helsinki-owned."
      ],
      nextFollowUp: "Validate whether Helsinki publishes annual statistics, local RI decisions or links to Helsinki-specific TENK summaries beyond procedure guidance and general annual reviews.",
      memberValidationQuestions: [
        "Is the chancellor notification route the correct public first-instance framing for Helsinki?",
        "Which Helsinki research-integrity adviser information should be shown without personal contact details?",
        "Does Helsinki publish local annual statistics or anonymized local decisions?",
        "Are there Helsinki-specific TENK summaries that should be linked as national second-line output?",
        "Which ethics, data, animal, clinical and open-science routes should remain boundary material?"
      ]
    }),
    member({
      id: "leiden-university",
      institution: "Leiden University",
      alternativeNames: ["Universiteit Leiden", "Leiden University and LUMC"],
      countryId: "netherlands",
      country: "Netherlands",
      city: "Leiden",
      leruStatus: "Official LERU member; LERU INTE participation still needs validation.",
      reportStatus: "Detailed seed",
      profileStatus: "Detailed institutional reporting seed",
      evidenceLevel: "Strong",
      transparencyCategory: "CWI annual reports plus public advice/final-judgment page",
      nationalRoute:
        "Leiden sits in the Dutch institution-first CWI model under the national code, with LOWI second-line advice after local handling.",
      institutionalRoute:
        "Leiden University and LUMC have an Academic Integrity Committee / CWI route, with separate chambers for university and LUMC complaints.",
      committeeOrOffice: "Academic Integrity Committee / Commissie Wetenschappelijke Integriteit",
      procedureSummary:
        "The committee page identifies two chambers for Leiden University and LUMC complaints, and the Dutch committee page links the complaint regulation, the 2023-2024 CWI annual report and the 2018-2022 CWI annual report.",
      publicOutputSummary:
        "Public-output evidence was found: Leiden publishes CWI annual reports and a public overview of CWI advice and final Executive Board judgments. The 2023-2024 annual report and 2018-2022 report contain anonymized case rows; the advice/judgment page currently exposes at least one listed case.",
      transparencySummary:
        "Leiden is now a strong Dutch institutional reporting seed: local CWI reports and advice/final-judgment visibility sit alongside the national UNL/LOWI publication lane.",
      sourceCoverage: {
        institutionalProcedure: "available",
        committeePage: "available",
        annualReportOrCaseOutput: "available",
        sourceRegistryLinks: 0
      },
      sourceLinks: [
        {
          label: "Academic Integrity Committee",
          url: "https://www.organisatiegids.universiteitleiden.nl/en/university-committees/academic-integrity-committee",
          type: "committee page",
          supports: "committee scope and annual reports",
          note: "Includes scope, complaint route, committee chambers, composition and annual reports."
        },
        {
          label: "Leiden research integrity",
          url: "https://www.universiteitleiden.nl/onderzoek/organisatie-van-ons-onderzoek/kwaliteit-en-integriteit/wetenschappelijke-integriteit",
          type: "official",
          supports: "institutional integrity route",
          note: "Connects complaints procedure, confidential adviser and research-integrity policy."
        },
        {
          label: "Leiden CWI Dutch committee files",
          url: "https://www.organisatiegids.universiteitleiden.nl/universitaire-commissies/commissie-wetenschappelijke-integriteit",
          type: "annual report hub",
          supports: "2023-2024 and 2018-2022 CWI annual reports plus complaint regulation",
          note: "Official Dutch page linking the public CWI annual reports and procedure files."
        },
        {
          label: "Leiden CWI annual report 2023-2024",
          url: "https://www.organisatiegids.universiteitleiden.nl/binaries/content/assets/ul2staff/reglementen/onderzoek/jaarverslag-cwi-2023-2024-def.pdf",
          type: "annual report",
          supports: "anonymized annual-report case rows",
          note: "Representative current public report for Leiden University and LUMC CWI activity."
        },
        {
          label: "Leiden CWI advice and final judgments",
          url: "https://www.organisatiegids.universiteitleiden.nl/universitaire-commissies/commissie-wetenschappelijke-integriteit/adviezen-commissie",
          type: "public decisions",
          supports: "public advice and Executive Board final-judgment overview",
          note: "Public overview of CWI advice and final judgments; field-level indexing still needed."
        }
      ],
      tags: ["CWI", "annual report", "public decisions", "LOWI", "Leiden-LUMC"],
      caveats: [
        "Annual reports and listed judgments are anonymized or summarized; they are not a complete public case-file archive.",
        "Leiden University and LUMC chambers should be kept distinct where source fields allow."
      ],
      reportNotes: [
        "Leiden moved to Detailed seed because local CWI annual reports and a public advice/final-judgment page are now verified."
      ],
      nextFollowUp: "Index Leiden/LUMC annual-report rows by year, chamber, complaint type, LOWI interaction and final judgment.",
      memberValidationQuestions: [
        "Is the two-chamber Leiden University/LUMC CWI framing correct for a LERU-facing profile?",
        "Should the Dutch CWI files page or the English committee page be the primary public source?",
        "Are the advice/final-judgment page and annual reports the complete public-output set?",
        "Which fields from the 2023-2024 and 2018-2022 reports should be extracted for comparison?",
        "How should LOWI and UNL publication routes be linked without duplicating local reporting?"
      ]
    }),
    member({
      id: "imperial-college-london",
      institution: "Imperial College London",
      countryId: "united-kingdom",
      country: "United Kingdom",
      city: "London",
      leruStatus: "Official LERU member; LERU INTE participation still needs validation.",
      reportStatus: "Detailed seed",
      profileStatus: "Detailed annual-statement seed",
      evidenceLevel: "Strong",
      transparencyCategory: "Annual statement corridor with RMRG misconduct route",
      institutionalRoute:
        "Imperial is represented through its Research Integrity Investigations pages, annual research-integrity statement series and Research Misconduct Response Group route.",
      committeeOrOffice: "Research Misconduct Response Group; Registrar and University Secretary; Vice-Provost route; Director of Research Integrity Investigations",
      procedureSummary:
        "Current official pages state that allegations may be made under Imperial's Research Misconduct Procedures, that the Research Misconduct Response Group screens allegations, and that full investigations use an Investigation Panel with an independent external member. The 2025 statement records that the procedures were reviewed for the 2025 UK Concordat and are to be introduced in 2026.",
      publicOutputSummary:
        "Public annual statements are available for 2025, 2024, 2023, 2022 and earlier research-integrity reports. The 2024 statement remains a narrative case-learning trace; the 2025 statement is the latest located annual statement and was approved by the governing body on 8 May 2026.",
      transparencySummary:
        "Detailed annual-statement evidence is present, including the current misconduct route. This is public annual reporting and narrative learning, not a searchable full case archive.",
      sourceCoverage: {
        institutionalProcedure: "available",
        committeePage: "available",
        annualReportOrCaseOutput: "available",
        sourceRegistryLinks: 1
      },
      sourceLinks: [
        {
          label: "Imperial research misconduct page",
          url: "https://www.imperial.ac.uk/research-and-innovation/about-imperial-research/research-integrity-investigations/misconduct/",
          type: "procedure",
          supports: "misconduct definition, route and annual-statement archive",
          note: "Official route page for allegations and annual research-integrity statements."
        },
        {
          label: "Imperial annual statement on research integrity 2025",
          url: "https://www.imperial.ac.uk/research-and-innovation/about-imperial-research/research-integrity-investigations/misconduct/annual-statement-on-research-integrity-2025/",
          type: "annual statement",
          supports: "latest annual statement and current procedure review",
          note: "Approved by the governing body on 8 May 2026 and linked from the official misconduct page."
        },
        {
          label: "Imperial annual statement on research integrity 2024",
          url: "https://www.imperial.ac.uk/research-and-innovation/about-imperial-research/research-integrity-investigations/misconduct/annual-statement-on-research-integrity-2024/",
          type: "annual report",
          supports: "narrative annual-statement/public-output example",
          note: "Supports the narrative annual-statement example."
        },
        {
          label: "Imperial research integrity framework",
          url: "https://www.imperial.ac.uk/research-and-innovation/about-imperial-research/research-integrity-investigations/misconduct/research-integrity-framework/",
          type: "framework",
          supports: "Concordat responsibilities and reporting model",
          note: "Explains the annual report to Council and the RMRG statement route."
        }
      ],
      tags: ["annual statement", "case learning", "UK Concordat", "Research Misconduct Response Group"],
      caveats: [
        "Annual statements and narrative learning are not a full case archive.",
        "Health research governance, animal research, data protection and student conduct routes should remain separate."
      ],
      reportNotes: [
        "Batch 2 retained Imperial as Detailed seed but replaced the thin single-source seed with a current 2025 statement and procedure-route backbone."
      ],
      nextFollowUp:
        "Index Imperial annual statements from 2021 through 2025 by allegation count, screening/full-investigation route, outcome, narrative learning and procedure-version changes.",
      memberValidationQuestions: [
        "Is Research Misconduct Response Group the correct public committee label for the profile?",
        "Should the 2025 statement replace the 2024 statement as the primary annual-statement source?",
        "Which annual-statement fields should be extracted for comparison with Cambridge, Oxford, Edinburgh and UCL?",
        "How should the 2026 procedure-introduction note be monitored after implementation?",
        "Are boundary routes such as NHS/clinical governance, animal research and data protection kept separate enough?"
      ]
    }),
    member({
      id: "university-college-london",
      institution: "University College London (UCL)",
      alternativeNames: ["UCL"],
      countryId: "united-kingdom",
      country: "United Kingdom",
      city: "London",
      leruStatus: "Official LERU member; LERU INTE participation still needs validation.",
      reportStatus: "Detailed seed",
      profileStatus: "Detailed annual-statement seed",
      evidenceLevel: "Strong",
      transparencyCategory: "Annual statement archive and Research Misconduct Committee analysis notes",
      institutionalRoute:
        "UCL is represented through its Research Integrity page, annual-statement archive, Compliance and Assurance contact route, Code of Conduct for Research and Research Misconduct Committee analysis notes.",
      committeeOrOffice: "Compliance and Assurance research-integrity route; Research Misconduct Committee annual-analysis route; Research, Innovation and Global Engagement Committee oversight",
      procedureSummary:
        "The UCL Research Integrity page lists the 2024-2025 annual statement and an archive back to 2014-2015. The Research Ethics Policy names the Procedure for investigating and resolving allegations of misconduct in academic research as part of UCL's research-governance arrangements, and the governance terms for RIGEC include receipt of annual reports on the misconduct procedure.",
      publicOutputSummary:
        "UCL has a public annual-statement archive through 2024-2025. The 2023-2024 statement includes Research Misconduct Committee annual-analysis notes over 2010-2024 and tabular allegation/formal-investigation fields; the 2024-2025 DOCX is the latest located statement.",
      transparencySummary:
        "Detailed annual-statement public-output seed with a current archive and committee-analysis route, but not a complete individual case archive.",
      sourceCoverage: {
        institutionalProcedure: "available",
        committeePage: "available",
        annualReportOrCaseOutput: "available",
        sourceRegistryLinks: 1
      },
      sourceLinks: [
        {
          label: "UCL Research Integrity page",
          url: "https://www.ucl.ac.uk/research-innovation-services/compliance-and-assurance/research-integrity",
          type: "official",
          supports: "research-integrity route and annual-statement archive",
          note: "Lists the 2024-2025 annual statement and previous annual statements back to 2014-2015."
        },
        {
          label: "UCL Research Integrity Annual Statement 2024-2025",
          url: "https://www.ucl.ac.uk/research-innovation-services/sites/research_innovation_services/files/ucl_annual_statement_on_research_integrity_2024-25.docx",
          type: "annual statement",
          supports: "latest annual-statement source",
          note: "Latest annual statement linked from UCL's official Research Integrity page."
        },
        {
          label: "UCL annual statement on research integrity 2023-2024",
          url: "https://www.ucl.ac.uk/research-innovation-services/sites/research_innovation_services/files/ucl_research_integrity_annual_statement_2023-2024.pdf",
          type: "annual report",
          supports: "annual-statement seed and Research Misconduct Committee analysis notes",
          note: "Supports the UCL annual-statement seed."
        },
        {
          label: "UCL Research Ethics Policy",
          url: "https://www.ucl.ac.uk/research-innovation-services/training-and-resources/policies-and-guidance/ucl-research-ethics-policy",
          type: "policy",
          supports: "research-governance and misconduct-procedure linkage",
          note: "Names the misconduct investigation procedure within UCL research-governance responsibilities."
        },
        {
          label: "UCL Research, Innovation and Global Engagement Committee",
          url: "https://www.ucl.ac.uk/about/leadership/governance/committees/umc-and-committees/research-innovation-and-global-engagement-committee",
          type: "governance",
          supports: "oversight of annual reports on misconduct procedure",
          note: "Committee remit includes annual reporting on the misconduct procedure."
        }
      ],
      tags: ["annual statement", "Research Misconduct Committee", "UK Concordat", "annual-statement archive"],
      caveats: [
        "This record is for University College London, not UCLouvain.",
        "The Research Ethics Policy is a governance/boundary source; ethics approval should not be collapsed into misconduct adjudication."
      ],
      reportNotes: [
        "Batch 2 retained UCL as Detailed seed and added the current 2024-2025 annual-statement archive route."
      ],
      nextFollowUp:
        "Extract UCL 2023-2024 and 2024-2025 annual-statement fields by allegation type, formal-investigation count, outcome, committee analysis and lessons-learned note.",
      memberValidationQuestions: [
        "Is Compliance and Assurance the preferred public office route for UCL's LERU-facing profile?",
        "Should the Research Misconduct Committee be described as an analysis/screening route, an operational committee route, or both?",
        "Does UCL publish the full current misconduct procedure outside the annual-statement and policy-link context?",
        "Which 2024-2025 DOCX fields should be extracted alongside the 2023-2024 PDF table?",
        "Are UCL research ethics, misconduct handling and student academic misconduct separated clearly enough?"
      ]
    }),
    member({
      id: "lund-university",
      institution: "Lund University",
      countryId: "sweden",
      country: "Sweden",
      city: "Lund",
      leruStatus: "Official LERU member; LERU INTE participation still needs validation.",
      reportStatus: "Detailed seed",
      profileStatus: "Detailed institutional reporting seed",
      evidenceLevel: "Strong",
      transparencyCategory: "Local deviations route with 2025 board annual report",
      institutionalRoute:
        "Lund University exposes a local route for suspected deviations from good research practice. FFP research misconduct may go to Npof, while other deviations are processed by Lund's Deviations from Good Research Practice Review Board.",
      committeeOrOffice: "Deviations from Good Research Practice Review Board; Vice-Chancellor route; faculty research representatives",
      procedureSummary:
        "The current staff pages and 2025 guidelines identify the Board as the local body for other deviations from good research practice, define reporting routes to Lund or Npof, and separate research representatives' advisory role from formal case investigation.",
      publicOutputSummary:
        "Public-output evidence was found: Lund publishes an Annual Report 2025 for the Deviations from Good Research Practice Review Board. This is local aggregate/reporting evidence, not a searchable decision archive.",
      transparencySummary:
        "Lund now has a local annual-report lane for the non-FFP deviation route, while Npof remains the national public decision archive for statutory FFP misconduct.",
      sourceCoverage: {
        institutionalProcedure: "available",
        committeePage: "available",
        annualReportOrCaseOutput: "available",
        sourceRegistryLinks: 1
      },
      sourceLinks: [
        {
          label: "Lund University good research practice",
          url: "https://www.staff.lu.se/compliance/good-research-practice",
          type: "official",
          supports: "local deviations route",
          note: "Supports the split between national misconduct and local handling of other deviations."
        },
        {
          label: "Lund deviations from good research practice",
          url: "https://www.staff.lu.se/research-and-education/research-support/research-ethics-and-animal-testing-ethics/deviations-good-research-practice",
          type: "committee page",
          supports: "review board route and local/Npof split",
          note: "Official route page for the Deviations from Good Research Practice Review Board."
        },
        {
          label: "Reporting suspected deviations at Lund",
          url: "https://www.staff.lu.se/research-and-education/research-support/research-ethics-and-animal-testing-ethics/deviations-good-research-practice/reporting-suspected-deviations-good-research-practice",
          type: "procedure",
          supports: "local reporting route",
          note: "Supports local reporting route for suspected deviations."
        },
        {
          label: "Lund Review Board annual report 2025",
          url: "https://www.staff.lu.se/sites/staff.lu.se/files/2026-03/Annual%20Report%202025%20%E2%80%93%20Deviations%20from%20Good%20Research%20Practice%20Review%20Board.pdf",
          type: "annual report",
          supports: "local annual-report evidence for the Review Board",
          note: "Public annual report for the local other-deviations route."
        },
        {
          label: "Lund guidelines for suspected deviation from good research practice",
          url: "https://www.staff.lu.se/sites/staff.lu.se/files/2026-05/guidelines-for-the-processing-of-matters-relating-to-suspected-deviation-from-good-research-practice.pdf",
          type: "procedure",
          supports: "local board procedure and reporting obligations",
          note: "Current official guidelines PDF."
        }
      ],
      tags: ["local deviations", "Npof", "annual report", "review board", "Sweden local route"],
      caveats: [
        "The Lund annual report is local aggregate/reporting evidence, not a searchable case-file archive.",
        "FFP misconduct belongs to the Npof route; other deviations remain the local Lund route.",
        "Research ethics, animal testing ethics, data stewardship and research representatives are adjacent support or boundary routes unless the deviation procedure is invoked."
      ],
      reportNotes: [
        "Lund moved to Detailed seed because an official 2025 Review Board annual report is now verified."
      ],
      nextFollowUp: "Index the Lund 2025 annual report by received matters, route, outcome and Npof/local split.",
      memberValidationQuestions: [
        "Is the Deviations from Good Research Practice Review Board the correct public Lund route for other deviations?",
        "Should FFP misconduct be shown primarily through Npof, with Lund as the institutional reporting/referral route?",
        "Does Lund publish annual reports before or after 2025 that should be indexed?",
        "Which annual-report fields are safe and useful for LERU comparison?",
        "How should research representatives, ethics review and animal-testing ethics remain separate from formal deviation handling?"
      ]
    }),
    member({
      id: "university-of-milan",
      institution: "University of Milan",
      countryId: "italy",
      country: "Italy",
      city: "Milan",
      leruStatus: "Official LERU member; LERU INTE participation still needs validation.",
      reportStatus: "Detailed seed",
      profileStatus: "Detailed restricted-output/boundary-aware audit seed",
      validationStatus: "Needs member validation of Milan route and restricted-output finding",
      evidenceLevel: "Moderate",
      transparencyCategory: "Ethics committee route with restricted minutes",
      countrySystemSummary:
        "Italy is coded as a distributed system with local university ethics and integrity committees, national and research-organisation infrastructure, and separate clinical, territorial ethics, animal, data, IP and quality-assurance boundaries.",
      nationalRoute:
        "The Milan route is institution-level and committee-led; Italian national or territorial clinical-ethics routes and CNR/CNB-style ethics infrastructure should not be treated as University of Milan misconduct output unless a source explicitly links them to the university case.",
      institutionalRoute:
        "The University of Milan Ethics Committee expresses opinions on research projects and can provide opinions on violations of the Code of Ethics and Research Integrity that are not also disciplinary offences.",
      committeeOrOffice: "University Ethics Committee; Research Ethics Office support route",
      procedureSummary:
        "The committee page, ethics-committee regulation and Code of Ethics show a mixed project-ethics and non-disciplinary ethics/integrity-opinion route. The committee regulation says the committee gives ethical-legal analysis on research proposals and opinions on Code of Ethics violations that are not disciplinary offences; the president reports annually to the Academic Senate. The Code includes research-specific sections on planning, roles, data, authorship, plagiarism, publication duties, open science and proceedings.",
      publicOutputSummary:
        "No University of Milan public misconduct case-output channel, anonymized decision archive or public aggregate integrity-statistics channel was identified in this pass. The key publication evidence is negative: committee minutes/opinions are restricted through Unimibox, while the public research report and Open Science material provide governance, training and policy context rather than case-output reporting.",
      transparencySummary:
        "Detailed restricted-output audit seed: the public route, code and restriction status are clear, but public transparency remains procedure/governance visibility rather than case-output visibility. Project ethics, clinical ethics, OPBA animal-welfare opinions and open-science reports are boundary or prevention material unless explicitly tied to misconduct handling.",
      sourceCoverage: {
        institutionalProcedure: "available",
        committeePage: "available",
        annualReportOrCaseOutput: "none located; committee opinions/minutes restricted",
        sourceRegistryLinks: 3
      },
      sourceLinks: [
        {
          label: "University of Milan Ethics Committee",
          url: "https://www.unimi.it/it/ateneo/governance-e-linee-strategiche/organi-di-governo/comitato-etico",
          type: "committee page",
          supports: "committee route and restricted-minutes boundary",
          note: "Supports project ethics and non-disciplinary ethics/integrity opinion route."
        },
        {
          label: "Ethics Committee functioning regulation",
          url: "https://www.unimi.it/it/ateneo/normative/regolamenti/regolamento-comitato-etico",
          type: "procedure",
          supports: "institutional committee procedure",
          note: "Official regulation page; the regulation was last modified on 24 October 2022."
        },
        {
          label: "University of Milan Code of Ethics",
          url: "https://www.unimi.it/it/ateneo/normative/codice-etico",
          type: "code",
          supports: "research-integrity code and non-disciplinary proceedings",
          note: "Includes research-specific rules and title on sanctions/proceedings."
        },
        {
          label: "University of Milan research report 2025",
          url: "https://work.unimi.it/filepub/bandi_finanziamento/RAR_RelazioneAteneoRicerca_VI_edizione_Ottobre2025.pdf",
          type: "annual/research report",
          supports: "research-integrity governance and training context",
          note: "Mentions research integrity, the Ethics Committee and the Code of Ethics and Research Integrity; not a case-output report."
        },
        {
          label: "University of Milan quality-document mapping",
          url: "https://www.unimi.it/sites/default/files/2021-01/all.%201%20Ateneo.pdf",
          type: "access mapping",
          supports: "restricted/public status of committee opinions and research reports",
          note: "Shows research reports as public and Ethics Committee opinions as restricted through Unimibox."
        }
      ],
      tags: ["ethics committee", "restricted records", "boundary regime", "research-integrity code", "no public output identified"],
      caveats: [
        "Do not treat ethics review or restricted minutes as public misconduct case publication.",
        "No public case-output channel or anonymized decision archive was identified in this pass.",
        "Clinical trials, OPBA animal-welfare opinions, Open Science annual reports and quality-assurance documents are boundary or governance routes unless tied to a Code of Ethics violation.",
        "Do not infer absence of University of Milan cases from the absence of public case-output evidence."
      ],
      reportNotes: [
        "Batch 4 upgraded Milan to Detailed seed as a restricted-output/boundary-aware audit profile: the public route and restricted-output finding are clear, but no public case-output channel was found."
      ],
      nextFollowUp:
        "Validate whether the Ethics Committee president's annual Senate report, opinions on Code violations, or aggregate statistics are published anywhere outside restricted Unimibox and governance reports.",
      memberValidationQuestions: [
        "Is the Ethics Committee the correct public University of Milan route for non-disciplinary research-integrity code violations?",
        "Should the Code of Ethics and Research Integrity be treated as the main procedure source or as a normative baseline?",
        "Are any Ethics Committee opinions, Senate reports, statistics or case summaries public outside restricted Unimibox material?",
        "How should project-ethics opinions be separated from research-misconduct handling?",
        "Which clinical-trial, data, IP and publication-ethics routes should remain boundary material?"
      ]
    }),
    member({
      id: "lmu-munich",
      institution: "Ludwig-Maximilians-Universitat Munchen / LMU Munich",
      alternativeNames: ["LMU Munich", "Ludwig-Maximilians-Universitat Muenchen"],
      countryId: "germany",
      country: "Germany",
      city: "Munich",
      leruStatus: "Official LERU member; LERU INTE participation still needs validation.",
      reportStatus: "Detailed seed",
      profileStatus: "Detailed procedure-only/no-output audit seed",
      validationStatus: "Needs member validation of LMU output-negative finding",
      evidenceLevel: "Moderate",
      transparencyCategory: "Ombudspersons and investigation committee route",
      countrySystemSummary:
        "Germany is represented as a distributed integrity system built from the DFG Code, institutional ombudsperson and investigation routes, the national German Research Ombudsman, DFG sanctions/output, OWID reporting and separate ethics, clinical, animal, data and IP boundaries.",
      nationalRoute:
        "LMU belongs to the German institution-first model: its university-wide GWP regulation is the local route, while the German Research Ombudsman is an alternative supraregional route and DFG output remains funder-level context.",
      institutionalRoute:
        "LMU's university-wide route is anchored in the 17 November 2023 regulation on safeguarding good scientific practice, with ombudspersons for good scientific practice and a formal investigation committee for suspected scientific misconduct.",
      committeeOrOffice: "Ombudspersons for good scientific practice; investigation committee under the LMU GWP regulation",
      procedureSummary:
        "The LMU regulation implements the DFG code, applies to scientific and science-supporting activity at LMU, assigns organizational responsibility to university leadership, sets out independent confidential ombudsperson activity, identifies the German Research Ombudsman as an alternative route and defines the procedure from preliminary handling through formal investigation and possible measures.",
      publicOutputSummary:
        "No LMU public misconduct case-output channel, annual ombudsperson statistics page or anonymized decision archive was identified in this pass. The regulation states that university leadership decides whether and how the public is informed after a final decision, which is a discretionary publication rule rather than a standing output channel.",
      transparencySummary:
        "The official regulation gives a usable procedure seed, and medical/graduate-center pages add support and training routes. No LMU annual statistics, anonymized case summaries or standing public-output channel were located in this pass.",
      sourceCoverage: {
        institutionalProcedure: "available",
        committeePage: "available",
        annualReportOrCaseOutput: "none located; publication discretionary only",
        sourceRegistryLinks: 0
      },
      sourceLinks: [
        {
          label: "LMU regulation on safeguarding good scientific practice",
          url: "https://cms-cdn.lmu.de/media/contenthub/amtliche-veroeffentlichungen/gwp-ordnung.pdf",
          type: "procedure",
          supports: "university-wide GWP rules, ombudspersons and investigation committee",
          note: "Official LMU regulation dated 17 November 2023."
        },
        {
          label: "LMU Medical Faculty good scientific practice resources",
          url: "https://www.med.lmu.de/de/promotion/gwp/",
          type: "support route",
          supports: "faculty-facing GWP, ethics, animal, open-science and conflict-support signposting",
          note: "Use as support and boundary signposting evidence, not as the university-wide procedure itself."
        },
        {
          label: "LMU Graduate Center e-learning on research integrity",
          url: "https://www.graduatecenter.uni-muenchen.de/veranstaltungen/e-learning/index.html",
          type: "training",
          supports: "prevention and training route for research integrity and good scientific practice",
          note: "Training/prevention source; not misconduct adjudication."
        }
      ],
      tags: ["official-source seed", "Germany", "ombudspersons", "investigation committee", "training", "procedure only"],
      caveats: [
        "The Germany dossier has Munich material for Technical University of Munich, but that is not LMU Munich.",
        "Training and medical-faculty signposting pages are support and boundary routes, not public case-output evidence.",
        "No central non-personal LMU ombudsperson or investigation-committee page was located beyond the regulation in this pass.",
        "Do not infer absence of LMU cases from the absence of a public output channel."
      ],
      reportNotes: [
        "Batch 5 upgraded LMU to Detailed seed as a procedure-only/no-output audit profile: the 2023 GWP regulation is strong procedure evidence, but no standing public-output channel was found."
      ],
      nextFollowUp:
        "Locate any current non-personal LMU page for ombudsperson offices or investigation-committee composition, and check whether annual statistics, rectorate summaries or anonymized public outputs exist.",
      memberValidationQuestions: [
        "Is the 2023 GWP regulation the correct public backbone for the LMU profile?",
        "Is there a current public page for the LMU ombudspersons or investigation committee that should be cited instead of, or alongside, the regulation?",
        "Does LMU publish aggregate reporting, annual statistics or anonymized misconduct summaries?",
        "Which faculty-level support routes should be included without implying university-wide adjudication?",
        "How should training and doctoral resources be kept separate from misconduct handling?"
      ]
    }),
    member({
      id: "university-of-oxford",
      institution: "University of Oxford",
      countryId: "united-kingdom",
      country: "United Kingdom",
      city: "Oxford",
      leruStatus: "Official LERU member; LERU INTE participation still needs validation.",
      reportStatus: "Detailed seed",
      profileStatus: "Transparency seed from existing project data",
      evidenceLevel: "Strong",
      transparencyCategory: "Annual statement with anonymized allegations",
      institutionalRoute:
        "Oxford publishes research-integrity statements and support routes, with institutional and student research-work case handling separated in the project data.",
      committeeOrOffice: "Research Integrity Statement route; Registrar/Proctors' Office distinction in 2024 statement",
      procedureSummary:
        "Annual report hub and 2024 statement are present; student research-work cases are separately represented.",
      publicOutputSummary:
        "The 2024 statement has anonymized numbered allegations and outcomes, plus separate student research-work cases.",
      transparencySummary:
        "Strong annual-statement visibility while still not publishing full case files.",
      sourceCoverage: {
        institutionalProcedure: "available",
        committeePage: "available",
        annualReportOrCaseOutput: "available",
        sourceRegistryLinks: 2
      },
      sourceLinks: [
        {
          label: "Oxford Research Integrity Statement 2024",
          url: "https://assets-oxweb.admin.ox.ac.uk/2026-02/research-integrity-2024-statement_0.pdf",
          type: "annual report",
          supports: "anonymized allegations/outcomes",
          note: "Supports anonymized allegations/outcomes and separate student research-work cases."
        },
        {
          label: "Oxford annual research integrity reports",
          url: "https://www.ox.ac.uk/research/support-researchers/research-practice/annual-research-integrity-reports",
          type: "annual report",
          supports: "long-run annual-statement hub",
          note: "Supports the long-run annual-statement corridor."
        }
      ],
      tags: ["annual statement", "anonymized allegations", "UK Concordat"],
      nextFollowUp:
        "Index Oxford annual statements by year, allegation category, outcome and anonymization depth."
    }),
    member({
      id: "universite-paris-saclay",
      institution: "Universite Paris-Saclay",
      alternativeNames: ["University Paris-Saclay"],
      countryId: "france",
      country: "France",
      city: "Paris-Saclay",
      leruStatus: "Official LERU member; LERU INTE participation still needs validation.",
      reportStatus: "Detailed seed",
      profileStatus: "Detailed procedure-only/no-output audit seed",
      validationStatus: "Needs member validation of Paris-Saclay output-negative finding",
      evidenceLevel: "Moderate",
      transparencyCategory: "POLETHIS/RIS route without public case output",
      countrySystemSummary:
        "France is represented as a distributed integrity system with the national scientific-integrity framework, OFIS/RIS directory, institutional referents, annual-report examples at some institutions and separate biomedical ethics, data, IP, security and open-science boundaries.",
      nationalRoute:
        "Paris-Saclay appears in the French RIS model: the OFIS directory and national charter framework identify referents, but case handling remains institution-level and no Paris-Saclay public signalement archive was located.",
      institutionalRoute:
        "Paris-Saclay is represented through POLETHIS and the network of scientific-integrity referents, which exchange practice, advise on breaches and confidentially instruct reported scientific-integrity matters. The CER-PS ethics committee is retained as a research-ethics boundary route.",
      committeeOrOffice: "POLETHIS; network of scientific-integrity referents; CER-PS as ethics-review boundary",
      procedureSummary:
        "The POLETHIS scientific-integrity network page states that referents advise on and instruct matters concerning breaches of scientific integrity in confidence; the doctoral problems page points suspected ethics/integrity breaches to those referents. OFIS lists Paris-Saclay in the national RIS directory. The CER-PS functioning document supports research-ethics review activity and confidentiality, not misconduct publication.",
      publicOutputSummary:
        "No Paris-Saclay public institutional misconduct case-output archive, annual RIS activity report, signalement statistics page or anonymized decision channel was identified in this pass. The CER-PS document mentions public activity reporting for ethics review, but that is boundary evidence rather than misconduct-output evidence.",
      transparencySummary:
        "Route and network evidence are present, but this should not be scored as case-output transparency. CER-PS visibility should be kept as ethics-review transparency unless a source connects it to scientific-misconduct handling.",
      sourceCoverage: {
        institutionalProcedure: "available",
        committeePage: "available",
        annualReportOrCaseOutput: "none located; CER-PS ethics output is boundary material",
        sourceRegistryLinks: 1
      },
      sourceLinks: [
        {
          label: "Universite Paris-Saclay POLETHIS scientific-integrity network",
          url: "https://www.universite-paris-saclay.fr/recherche/polethis-ethique-et-integrite/polethis-axe-du-reseau-integrite-scientifique",
          type: "official",
          supports: "POLETHIS RIS network and confidential breach-instruction route",
          note: "Supports POLETHIS, RIS network and scientific-integrity breach route; do not reproduce personal contact details."
        },
        {
          label: "Paris-Saclay problems and signalment route",
          url: "https://www.universite-paris-saclay.fr/que-faire-en-cas-de-problemes",
          type: "official",
          supports: "doctoral-facing ethics/integrity breach route",
          note: "Points suspected ethics or scientific-integrity breaches to the scientific-integrity referents."
        },
        {
          label: "OFIS RIS directory",
          url: "https://www.ofis-france.fr/annuaire/",
          type: "national directory",
          supports: "French RIS directory and Paris-Saclay referent listing",
          note: "Use role/directory evidence only; do not reproduce personal contact details."
        },
        {
          label: "CER-PS functioning rules",
          url: "https://www.universite-paris-saclay.fr/sites/default/files/2020-01/fonctionnement-cer-2018-10-17_0.pdf",
          type: "boundary procedure",
          supports: "research-ethics committee boundary",
          note: "Ethics-review route with confidentiality and public activity-report provisions; not misconduct adjudication."
        }
      ],
      tags: ["RIS network", "ethics-integrity", "POLETHIS", "OFIS", "procedure only"],
      caveats: [
        "No Paris-Saclay public misconduct output channel was identified in this pass.",
        "CER-PS ethics review and doctoral-conflict routes are boundary/support routes unless a source explicitly connects them to misconduct handling.",
        "Do not reproduce personal contact details from RIS directory or POLETHIS pages.",
        "Do not infer absence of Paris-Saclay cases from the absence of a public output channel."
      ],
      reportNotes: [
        "Batch 5 upgraded Paris-Saclay to Detailed seed as a procedure-only/no-output audit profile: POLETHIS/RIS route evidence is strong enough for a complete route profile, but public-output evidence remains unlocated."
      ],
      nextFollowUp:
        "Validate whether Paris-Saclay publishes annual RIS activity reports, non-personal signalement statistics or public case-learning outputs beyond the POLETHIS route pages.",
      memberValidationQuestions: [
        "Is POLETHIS plus the RIS network the correct public Paris-Saclay route for scientific-integrity reports?",
        "Does Paris-Saclay publish annual RIS activity reports, signalement statistics or anonymized case summaries?",
        "Should CER-PS be shown only as a research-ethics boundary route?",
        "Is there a member-preferred non-personal URL for the institutional referent route?",
        "Which associated-establishment routes should be kept separate from the Paris-Saclay member profile?"
      ]
    }),
    member({
      id: "sorbonne-university",
      institution: "Sorbonne University",
      alternativeNames: ["Sorbonne Universite"],
      countryId: "france",
      country: "France",
      city: "Paris",
      leruStatus: "Official LERU member; LERU INTE participation still needs validation.",
      reportStatus: "Detailed seed",
      profileStatus: "Transparency seed from existing project data",
      evidenceLevel: "Strong",
      transparencyCategory: "Institutional annual report corridor",
      institutionalRoute:
        "Sorbonne University is represented through a RIS-led scientific-integrity delegation, integrity committee and ambassador network.",
      committeeOrOffice: "Scientific-integrity delegation, RIS, integrity committee and ambassador network",
      procedureSummary:
        "RIS delegation and signalement procedure examples are present.",
      publicOutputSummary:
        "The 2025 integrity annual report is a representative institutional annual-report source with RIS, committee, ambassador-network and signalement activity evidence.",
      transparencySummary:
        "Annual activity and signalement reporting are present, but this is not a searchable decision archive.",
      sourceCoverage: {
        institutionalProcedure: "available",
        committeePage: "available",
        annualReportOrCaseOutput: "available",
        sourceRegistryLinks: 2
      },
      sourceLinks: [
        {
          label: "Sorbonne University scientific-integrity delegation",
          url: "https://www.sorbonne-universite.fr/universite/politique-detablissement/pour-une-science-en-confiance-responsable-et-ouverte/la",
          type: "official",
          supports: "RIS, committee, ambassadors and annual reports",
          note: "Shows RIS, committee, ambassadors and annual reports."
        },
        {
          label: "Sorbonne University 2025 integrity annual report",
          url: "https://www.sorbonne-universite.fr/sites/default/files/media/2025-12/integrite_scientifique_rapport_activite_2025.pdf",
          type: "annual report",
          supports: "annual activity and signalement evidence",
          note: "Supports annual activity and signalement evidence."
        }
      ],
      tags: ["RIS", "annual report", "signalement"],
      nextFollowUp:
        "Extract Sorbonne annual-report fields and validate the concise member-facing description of the RIS network."
    }),
    member({
      id: "university-of-strasbourg",
      institution: "University of Strasbourg",
      countryId: "france",
      country: "France",
      city: "Strasbourg",
      leruStatus: "Official LERU member; LERU INTE participation still needs validation.",
      reportStatus: "Detailed seed",
      profileStatus: "Detailed RIS route/no-local-output audit seed",
      validationStatus: "Needs member validation of Strasbourg output-negative finding",
      evidenceLevel: "Moderate",
      transparencyCategory: "Scientific-integrity referent route",
      countrySystemSummary:
        "France is a legally codified, institutionally executed and nationally coordinated network: institutions appoint scientific-integrity referents, while Ofis/Hceres coordinates and observes the national system and boundary regimes remain separate.",
      nationalRoute:
        "Strasbourg sits in the French RIS model. Ofis records the institution and the national 2022-2023 synthesis includes Strasbourg among responding establishments, but those national outputs should not be treated as a Strasbourg local case-output archive.",
      institutionalRoute:
        "Strasbourg identifies a scientific-integrity referent who promotes and applies the university research deontology charter, receives and processes reports of non-compliance with scientific-integrity rules, and represents the university to Ofis and LERU on scientific integrity.",
      committeeOrOffice: "Referent for scientific integrity",
      procedureSummary:
        "The referent page describes examples such as plagiarism, inappropriate manipulation or fabrication of data, authorship conflicts and undeclared conflicts of interest. The route verifies reports, opens an inquiry where needed, may seek expert advice, conducts adversarial instruction and submits recommendations to the university president for decision. OFIS confirms Strasbourg as a charter-signatory RIS institution; the university's ethics/deontology hub, HRS4R and doctoral pages are prevention or boundary context.",
      publicOutputSummary:
        "No Strasbourg-owned public RIS annual activity report, local signalement statistics page, anonymized case-summary channel or public decision archive was identified in this pass. The OFIS 2022-2023 national synthesis is national/sector-level context and notes establishment reporting, but it is not a Strasbourg local output channel.",
      transparencySummary:
        "Detailed RIS route/no-local-output audit seed: the scientific-integrity referent route is visible and procedurally described, but public evidence remains route/procedure evidence plus national OFIS context rather than local public-output evidence.",
      sourceCoverage: {
        institutionalProcedure: "available",
        committeePage: "available",
        annualReportOrCaseOutput: "none located locally; national OFIS synthesis context only",
        sourceRegistryLinks: 0
      },
      sourceLinks: [
        {
          label: "University of Strasbourg scientific-integrity referent",
          url: "https://www.unistra.fr/fr/universite/engagements/referents/referent-lintegrite-scientifique",
          type: "procedure page",
          supports: "scientific-integrity referent mission and report-handling route",
          note: "Do not reproduce personal contact details from the source in this public dataset."
        },
        {
          label: "University of Strasbourg ethics, scientific integrity and deontology page",
          url: "https://www.unistra.fr/fr/universite/engagements/ethique-la-recherche-integrite-scientifique-et-deontologie",
          type: "boundary hub",
          supports: "research ethics, animal-research and deontology boundary routes",
          note: "Boundary governance source; keep separate from misconduct adjudication."
        },
        {
          label: "University of Strasbourg HRS4R label page",
          url: "https://www.unistra.fr/fr/universite/labels/label-hr-excellence-research-hrs4r",
          type: "strategy context",
          supports: "scientific-integrity referent as an institutional action",
          note: "Use as context, not as a case-handling source."
        },
        {
          label: "University of Strasbourg doctoral preparation page",
          url: "https://www.unistra.fr/fr/recherche/doctorat/se-preparer-aux-etudes-doctorales",
          type: "training and charter route",
          supports: "doctoral engagement with research deontology and integrity training",
          note: "Training/doctoral source; not misconduct adjudication."
        },
        {
          label: "OFIS RIS directory entry for University of Strasbourg",
          url: "https://www.ofis-france.fr/ris/universite-de-strasbourg/",
          type: "national directory",
          supports: "French RIS status and charter-signatory context",
          note: "Use only for institutional RIS/directory context; do not reproduce personal contact details."
        },
        {
          label: "OFIS 2022-2023 synthesis on treatment of scientific-integrity breaches",
          url: "https://www.ofis-france.fr/wp-content/uploads/2025/06/Ofis-Synthese-bisannuelle-2022-2023-traitement-manquements-integrite-scientifique.pdf",
          type: "national synthesis",
          supports: "national sector-level reporting context",
          note: "National synthesis context only; not a local Strasbourg output channel."
        }
      ],
      tags: ["official-source seed", "France", "RIS", "scientific-integrity referent", "boundary regime", "no local output identified"],
      caveats: [
        "Do not generalize Sorbonne or Paris-Saclay route evidence to Strasbourg.",
        "Research ethics, animal-research, HRS4R and doctoral-training sources are adjacent governance or prevention routes, not public misconduct-output evidence.",
        "OFIS national synthesis material should not be coded as Strasbourg local output unless it gives Strasbourg-specific counts, cases or activity details.",
        "Do not reproduce personal contact details from the referent or OFIS pages.",
        "Do not infer absence of Strasbourg cases from the absence of a public output channel."
      ],
      reportNotes: [
        "Batch 4 upgraded Strasbourg to Detailed seed as a RIS route/no-local-output audit profile; the OFIS synthesis remains national context only."
      ],
      nextFollowUp:
        "Validate whether Strasbourg publishes annual RIS activity statistics, anonymized case summaries or a non-personal procedure document beyond the referent page and national OFIS context.",
      memberValidationQuestions: [
        "Is the scientific-integrity referent the correct public first route for Strasbourg?",
        "Is there a non-personal procedure document or annual activity report that should be added?",
        "Should the Ofis/LERU representation wording be retained in the member-facing profile?",
        "Which parts of the CER, animal-research, HRS4R and doctoral-training pages should be shown only as boundary or prevention material?",
        "Does Strasbourg publish any aggregate integrity statistics or anonymized decisions?"
      ]
    }),
    member({
      id: "utrecht-university",
      institution: "Utrecht University",
      alternativeNames: ["Utrecht University and UMC Utrecht"],
      countryId: "netherlands",
      country: "Netherlands",
      city: "Utrecht",
      leruStatus: "Official LERU member; LERU INTE participation still needs validation.",
      reportStatus: "Detailed seed",
      profileStatus: "Detailed institutional reporting seed",
      evidenceLevel: "Strong",
      transparencyCategory: "Annual-report trace plus UNL anonymized case PDFs",
      nationalRoute:
        "Utrecht sits in the Dutch institution-first CWI model under the national code, with LOWI advice available before the final local decision where the route applies.",
      institutionalRoute:
        "Utrecht University's CWI investigates formal complaints and advises the Executive Board; project data notes UMC Utrecht-related complaints can be advised on while decision-making rests with the university board.",
      committeeOrOffice: "Scientific Integrity Committee / CWI",
      procedureSummary:
        "The 2023 complaints regulation defines the CWI route, LOWI window and anonymized publication of final board judgments with report/advice through Universities of the Netherlands. The 2024 annual report gives reporting-year case activity.",
      publicOutputSummary:
        "Public-output evidence was found: Utrecht's 2024 annual report describes CWI reporting-year cases, and UNL publishes anonymized Utrecht University case PDFs, including a 2026 founded peer-review matter and a 2024 plagiarism matter.",
      transparencySummary:
        "Utrecht is now a strong Dutch institutional reporting seed: public output appears in the university annual report and the UNL sector publication lane for anonymized CWI/board material.",
      sourceCoverage: {
        institutionalProcedure: "available",
        committeePage: "available",
        annualReportOrCaseOutput: "available",
        sourceRegistryLinks: 0
      },
      sourceLinks: [
        {
          label: "Utrecht scientific integrity complaints regulation 2023",
          url: "https://www.uu.nl/sites/default/files/Klachtenregeling-Wetenschappelijke-Integriteit-Universiteit-Utrecht.pdf",
          type: "procedure",
          supports: "complaints regulation",
          note: "Defines committee, complaint, confidential adviser, institution and board."
        },
        {
          label: "Utrecht University Annual Report 2024",
          url: "https://www.uu.nl/sites/default/files/UU-Jaarverslag-2024%20NL-v5.pdf",
          type: "annual report",
          supports: "annual accountability trace",
          note: "Describes the CWI route, LOWI second opinion and reporting-year cases."
        },
        {
          label: "UNL Utrecht 2026 peer-review case",
          url: "https://www.universiteitenvannederland.nl/files/publications/2026%20UU%20Optreden%20als%20niet%20onafhankelijk%20peer-reviewer%20-%20gegrond.pdf",
          type: "public case PDF",
          supports: "anonymized Utrecht case publication",
          note: "UNL case PDF for a founded Utrecht University peer-review independence matter."
        },
        {
          label: "UNL Utrecht 2024 plagiarism case",
          url: "https://www.universiteitenvannederland.nl/files/publications/2024%20UU%20Plagiaat%20-%20schending%20wetenschappelijke%20integriteit.pdf",
          type: "public case PDF",
          supports: "anonymized Utrecht case publication",
          note: "UNL case PDF for a Utrecht University plagiarism matter classified as a research-integrity breach."
        }
      ],
      tags: ["CWI", "annual report", "LOWI", "UNL case publication", "public case PDFs"],
      caveats: [
        "UNL case PDFs are anonymized sector publications, not a complete Utrecht-hosted case archive.",
        "UMC Utrecht-related wording should be validated because decision-making can rest with the university board depending on route.",
        "Do not treat social-safety, education or general ombuds routes as CWI research-integrity outputs."
      ],
      reportNotes: [
        "Utrecht moved to Detailed seed because both annual-report case activity and UNL anonymized case PDFs are verified."
      ],
      nextFollowUp:
        "Index Utrecht annual-report case fields and UNL PDFs by year, allegation type, CWI advice, LOWI step and final board judgment.",
      memberValidationQuestions: [
        "Is the CWI/Executive Board/LOWI route described correctly for Utrecht University and UMC Utrecht-related cases?",
        "Should UNL case PDFs be shown as sector-level publication or as Utrecht public-output evidence?",
        "Are there additional Utrecht annual reports or case PDFs that should be indexed?",
        "Which fields from the 2024 annual report should be extracted for LERU comparison?",
        "Which ombuds, social-safety, teaching-integrity and biomedical routes should remain separate?"
      ]
    }),
    member({
      id: "eth-zurich",
      institution: "ETH Zurich",
      countryId: "switzerland",
      country: "Switzerland",
      city: "Zurich",
      leruStatus: "Official LERU member; LERU INTE participation still needs validation.",
      reportStatus: "Detailed seed",
      profileStatus: "Transparency seed from existing project data",
      evidenceLevel: "Strong",
      transparencyCategory: "Anonymized report table and procedure statistics",
      institutionalRoute:
        "ETH Zurich combines a Scientific Integrity Office, Integrity Commission, GSP Commission and departmental Research Integrity Advisors.",
      committeeOrOffice: "Scientific Integrity Office; Integrity Commission; GSP Commission; departmental RIAs",
      procedureSummary:
        "Integrity Commission, good scientific practice and new misconduct procedure sources are present.",
      publicOutputSummary:
        "Official ETH table endpoints list anonymized investigation reports and procedure statistics.",
      transparencySummary:
        "A true institutional case-file fragment, but not a Swiss national archive.",
      sourceCoverage: {
        institutionalProcedure: "available",
        committeePage: "available",
        annualReportOrCaseOutput: "available",
        sourceRegistryLinks: 6
      },
      sourceLinks: [
        {
          label: "ETH Zurich Integrity Commission",
          url: "https://ethz.ch/en/the-eth-zurich/organisation/boards-university-groups-commissions/integritaetskommission.html",
          type: "committee page",
          supports: "institutional investigation commission",
          note: "Supports the institutional investigation commission route."
        },
        {
          label: "ETH Zurich anonymized investigation reports table",
          url: "https://ethz.ch/en/research/ethics-and-animal-welfare/research-integrity/wissenschaftliches-fehlverhalten/_jcr_content/par/accordion/accordionitem_1362309064/par/table.tableComp.json",
          type: "annual report",
          supports: "anonymized institutional report list",
          note: "Supports the anonymized institutional report list."
        },
        {
          label: "ETH Zurich procedure statistics table",
          url: "https://ethz.ch/en/research/ethics-and-animal-welfare/research-integrity/wissenschaftliches-fehlverhalten/_jcr_content/par/accordion/accordionitem/par/table.tableComp.json",
          type: "annual report",
          supports: "aggregate procedure counts",
          note: "Supports aggregate procedure counts."
        }
      ],
      tags: ["anonymized reports", "procedure statistics", "case-file fragment"],
      caveats: ["ETH Zurich output is institution-specific and should not be generalized to Switzerland."],
      nextFollowUp:
        "Index ETH anonymized reports and procedure-statistics fields, then validate office/commission/adviser role wording."
    }),
    member({
      id: "university-of-zurich",
      institution: "University of Zurich",
      alternativeNames: ["UZH"],
      countryId: "switzerland",
      country: "Switzerland",
      city: "Zurich",
      leruStatus: "Official LERU member; LERU INTE participation still needs validation.",
      reportStatus: "Detailed seed",
      profileStatus: "Detailed procedure-only/no-output audit seed",
      validationStatus: "Needs member validation of UZH output-negative finding",
      evidenceLevel: "Moderate",
      transparencyCategory: "Three-instance procedure route",
      countrySystemSummary:
        "Switzerland is represented as a fragmented institutional and funder-linked integrity system, now with SCCSI as a national coordination layer but without a national public misconduct case tribunal. ETH Zurich has institution-specific public output; UZH must be treated separately.",
      nationalRoute:
        "UZH sits inside the Swiss institution-first model: the UZH ordinance and procedure define local handling, while SCCSI and Swiss Academies material are national framework context rather than a UZH case-output route.",
      institutionalRoute:
        "UZH's integrity ordinance defines scientific misconduct and three procedural instances: ombudspersons receive reports and conduct preliminary inquiries, the Research Integrity Delegate investigates on behalf of the Executive Board, and the Executive Board decides on closure and measures.",
      committeeOrOffice: "Ombudspersons and deputies; Research Integrity Delegate and deputy; Research Integrity Coordination Office; Executive Board",
      procedureSummary:
        "The current UZH research-integrity page gives a complete three-instance route, links the integrity ordinance and routes confidential reports through the ombudspersons. The broader UZH ethics page repeats the consultation-investigation-decision structure.",
      publicOutputSummary:
        "No UZH public misconduct case-output channel, anonymized decision archive or annual integrity-statistics page was identified in this pass. The annual-report hub is a retest point and official UZH news gives limited contextual references to case volume, but neither source is a standing misconduct-output channel.",
      transparencySummary:
        "Procedure visibility is strong and current, but public output remains unlocated. UZH should not be confused with ETH Zurich, whose separate institutional report tables are stronger public-output evidence.",
      sourceCoverage: {
        institutionalProcedure: "available",
        committeePage: "available",
        annualReportOrCaseOutput: "none located; official news contextual only",
        sourceRegistryLinks: 1
      },
      sourceLinks: [
        {
          label: "UZH research integrity",
          url: "https://www.research.uzh.ch/en/procedures/integrity.html",
          type: "official",
          supports: "institutional three-instance route",
          note: "Institutional three-instance route: ombudsperson, Research Integrity Delegate and Executive Board."
        },
        {
          label: "UZH ethics and integrity overview",
          url: "https://www.uzh.ch/en/researchinnovation/ethics/integrity.html",
          type: "procedure overview",
          supports: "consultation-investigation-decision route",
          note: "Public overview of the three procedural instances and link to UZH for Researchers."
        },
        {
          label: "UZH research integrity persons page",
          url: "https://www.research.uzh.ch/en/procedures/integrity/persons.html",
          type: "office page",
          supports: "coordination office and non-personal route directory",
          note: "Use office/role structure only; do not reproduce personal contact details."
        },
        {
          label: "UZH annual report hub",
          url: "https://www.uzh.ch/en/explore/portrait/annualreport.html",
          type: "annual report hub",
          supports: "annual-report retest point",
          note: "Annual-report hub includes the 2025 report link, but no standing research-misconduct output was identified in this pass."
        },
        {
          label: "UZH news: Researchers Who Cheat",
          url: "https://www.news.uzh.ch/en/articles/news/2023/integrity-scientific.html",
          type: "official context",
          supports: "procedure context and limited aggregate reference",
          note: "Use only as contextual evidence for the procedure and limited aggregate references; it is not a recurring output channel."
        }
      ],
      tags: ["official-source seed", "ombudsperson", "Research Integrity Delegate", "procedure only", "Swiss institutional route", "annual-report retest"],
      caveats: [
        "No UZH public case-output channel was identified in this pass.",
        "Do not generalize ETH Zurich's anonymized report tables to UZH.",
        "Do not reproduce personal contact details from UZH role/person pages.",
        "Treat UZH news references as contextual only, not as a standing annual-statistics or case-publication corridor.",
        "Do not infer absence of UZH cases from the absence of a public output channel."
      ],
      reportNotes: [
        "Batch 5 upgraded UZH to Detailed seed as a procedure-only/no-output audit profile because the three-instance route is clear and public-output evidence remains unlocated."
      ],
      nextFollowUp:
        "Retest UZH annual reports, official news and the research-integrity pages for aggregate statistics, anonymized summaries or policy updates after the 2025 authorship-guideline changes.",
      memberValidationQuestions: [
        "Is the ombudspersons -> Research Integrity Delegate -> Executive Board route the correct public framing for UZH?",
        "Should the Research Integrity Coordination Office be shown as an office route without personal details?",
        "Does UZH publish aggregate statistics, annual integrity reporting or anonymized case summaries?",
        "How should authorship-guideline, ethics, human-research and animal-research routes remain separate from misconduct handling?",
        "Is there a member-preferred public URL for the integrity ordinance and current procedure?"
      ]
    })
  ];
})();
