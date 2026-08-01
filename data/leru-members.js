(function () {
  const leruSource = {
    label: "LERU member page",
    url: "https://www.leru.org/members",
    accessed: "2026-07-15"
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
      "Denmark separates national Danish Board on Research Misconduct (NVU) handling of research misconduct from local institutional handling of questionable research practice and returned cases.",
    finland:
      "Finland has a national TENK procedure and institutional first-instance responsibilities; local routes should be separated from national statement summaries.",
    france:
      "France is a legally codified, institutionally executed and nationally coordinated network: the Research Code includes scientific-integrity duties in Articles D211-2, D211-3 and D211-4; institutions appoint RIS (referents a l'integrite scientifique, equivalent to research integrity officers/RIOs), while Ofis (Office francais de l'integrite scientifique), a department of Hceres (Haut conseil a l'evaluation de la recherche et de l'enseignement superieur), coordinates and observes the national system.",
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
      "Switzerland is represented as a fragmented cantonal, institutional and funder-linked integrity system rather than one national misconduct board, with SNSF/ETH outputs and SCCSI reporting, advice and monitoring kept distinct.",
    "united-kingdom":
      "The UK route is employer-led under the Concordat to Support Research Integrity, with annual statements as a recurring public-reporting corridor and health/animal/data regimes kept separate."
  };

  const countryCodeSources = {
    belgium: {
      label: "Code of Ethics for Scientific Research in Belgium",
      url: "https://www.belspo.be/belspo/organisation/publ/pub_ostc/Eth_code/ethcode_en.pdf",
      type: "Belgium-wide code",
      supports: "Belgian code baseline for scientific research ethics and integrity.",
      note: "Use alongside community-level and institutional procedures."
    },
    denmark: {
      label: "Danish Code of Conduct for Research Integrity 2026",
      url: "https://ufsn.dk/english/publications/2026/januar/danish-code-of-conduct-for-research-integrity/",
      type: "National code",
      supports: "Updated Danish national code for research integrity.",
      note: "Replaces the 2014 edition and sits beside the statutory Danish Board on Research Misconduct (NVU) route."
    },
    finland: {
      label: "RI 2023 guideline: Finnish Code of Conduct for Research Integrity",
      url: "https://tenk.fi/en/news/ri-2023-guideline-published-three-languages",
      type: "National guideline",
      supports: "Finnish RI 2023 guideline and handling procedure baseline.",
      note: "TENK code/guideline framework for committed organisations."
    },
    france: {
      label: "Ofis: French national charter for research integrity",
      url: "https://www.ofis-france.fr/la-charte-francaise-de-deontologie-des-metiers-de-la-recherche/",
      type: "National charter",
      supports: "French charter baseline for research professions and scientific integrity.",
      note: "Use alongside Research Code Articles D211-2 to D211-4, Ofis/Hceres guidance and institutional procedures."
    },
    germany: {
      label: "DFG Code of Conduct: Guidelines for Safeguarding Good Research Practice",
      url: "https://www.dfg.de/en/basics-topics/basics-and-principles-of-funding/good-research-practice/code-of-conduct",
      type: "National/funder code",
      supports: "German good-research-practice code baseline used across the institutional system.",
      note: "DFG code is the main national standard for the LERU German profiles."
    },
    ireland: {
      label: "National Policy Statement on Ensuring Research Integrity in Ireland 2024",
      url: "https://www.iua.ie/wp-content/uploads/2024/12/National-Policy-Statement-on-Ensuring-Research-Integrity-in-Ireland-Dec-2024.pdf",
      type: "National policy statement",
      supports: "Irish national research-integrity policy baseline.",
      note: "NRIF/IUA source; use with national investigation guidance and institutional policies."
    },
    italy: {
      label: "CNR Guidelines for Research Integrity 2019",
      url: "https://www.cnr.it/sites/default/files/public/media/doc_istituzionali/ethics/guidelines-for-research-integrity-2019.pdf",
      type: "National research-organisation guideline",
      supports: "Comparable national research-organisation integrity guideline for Italy.",
      note: "No single national university code is recorded in this LERU profile; institutional codes remain important."
    },
    netherlands: {
      label: "Netherlands Code of Conduct for Research Integrity",
      url: "https://www.nwo-i.nl/en/nwo-i-themes/research-integrity/netherlands-code-of-conduct-for-research-integrity/",
      type: "National code",
      supports: "Dutch national code baseline for institution-first complaint handling.",
      note: "Current project baseline remains the 2018 NGWI while update monitoring continues."
    },
    spain: {
      label: "National Declaration on Scientific Integrity",
      url: "https://www.crue.org/wp-content/uploads/2020/02/Declaraci%C3%B3n-Nacional-Integridad-Cient%C3%ADfica_.pdf",
      type: "National declaration",
      supports: "Spanish national scientific-integrity declaration baseline.",
      note: "Use with institutional codes and regional integrity routes such as CIR-CAT."
    },
    sweden: {
      label: "Swedish Research Council: Good Research Practice",
      url: "https://www.vr.se/english/mandates/ethics/good-research-practice---new-edition.html",
      type: "National soft-law guidance",
      supports: "Swedish good-research-practice guidance baseline.",
      note: "Use with the statutory national Npof route and institutional other-deviation procedures."
    },
    switzerland: {
      label: "Code of Conduct for Scientific Integrity",
      url: "https://www.swissuniversities.ch/fileadmin/swissuniversities/Dokumente/Forschung/Kodex_Layout_en_Web.pdf",
      type: "National code",
      supports: "Swiss national scientific-integrity code baseline.",
      note: "Issued by Swiss Academies, swissuniversities, SNSF and Innosuisse."
    },
    "united-kingdom": {
      label: "The Concordat to Support Research Integrity",
      url: "https://ukcori.org/research-integrity-concordat/",
      type: "National concordat",
      supports: "UK research-integrity concordat baseline for employer-led handling and annual statements.",
      note: "Use with institutional procedures, annual statements and funder duties."
    }
  };

  const countryBoundaryRegimes = {
    belgium: ["biomedical ethics", "clinical trials", "animal research", "data protection", "IP", "open science"],
    denmark: ["medical research ethics", "clinical trials", "animal research", "data protection", "open science"],
    finland: ["TENK statement route", "human research ethics", "biobanks", "clinical trials", "data protection"],
    france: [
      "CPP/CNRIPH interventional human-subject research ethics",
      "CER non-interventional human-subject research ethics",
      "clinical trials",
      "CEEA animal-experimentation ethics",
      "data protection",
      "deontology"
    ],
    germany: ["DFG/OWID publication lanes", "medical ethics", "animal research", "data protection", "research security"],
    ireland: ["NREC/HRA health research", "animal research", "data protection", "funder compliance", "quality assurance"],
    italy: ["clinical trials", "territorial/national ethics committees", "animal research", "data protection", "CNR/CNB ethics"],
    netherlands: ["research ethics review", "medical research ethics", "animal research", "data protection", "funder reporting"],
    spain: ["biomedical ethics", "animal research", "data protection", "IP", "open science"],
    sweden: ["ethical review", "animal testing ethics", "clinical trials", "data protection", "biobanks"],
    switzerland: [
      "institutional and cantonal research-ethics review",
      "Swissmedic",
      "FOEN/BAFU",
      "animal-research authorisations",
      "third-party funding compliance",
      "data protection"
    ],
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
    "university-of-freiburg": "procedure-only",
    "university-of-geneva": "procedure-only",
    "heidelberg-university": "historical-or-case-specific",
    "university-of-helsinki": "national-or-sector-output",
    "leiden-university": "local-output",
    "imperial-college-london": "local-output",
    "university-college-london": "local-output",
    "lund-university": "local-output",
    "university-of-milan": "restricted-or-internal-output",
    "lmu-munich": "procedure-only",
    "university-of-oxford": "local-output",
    "universite-paris-saclay": "procedure-only",
    "sorbonne-university": "restricted-or-internal-output",
    "university-of-strasbourg": "national-or-sector-output",
    "utrecht-university": "local-output",
    "eth-zurich": "local-output",
    "university-of-zurich": "procedure-only"
  };

  const publicOutputCategoryNotesById = {
    "ku-leuven": "Institution-owned annual reports publish counts, admissibility outcomes and anonymized advice summaries.",
    "university-of-amsterdam": "Institution-owned CWI annual report evidence is present; field-level extraction remains pending.",
    "universitat-de-barcelona": "UB member validation confirms that public output is a Catalan CIR-CAT regional institution-linked recommendation, not UB-owned reporting; UB does not yet publish annual research-integrity statistics, anonymized summaries or committee activity reports beyond the located pages.",
    "university-of-cambridge": "Institution-owned annual research-integrity reports provide anonymized allegation and investigation information.",
    "university-of-copenhagen": "Institution-owned Practice Committee annual reports and minutes form a local public-output lane.",
    "trinity-college-dublin": "Public output located is NRIF national aggregate reporting; no Trinity-owned output channel was identified.",
    "university-of-edinburgh": "Institution-owned annual research-integrity statements provide recurring public reporting.",
    "university-of-freiburg": "31 July 2026 Freiburg member validation confirms that the current procedure is public but no annual integrity statistics, summaries or comparable public reporting channel are published. Older Rector statistics and the sports-medicine case page remain historical context rather than the basis for the current category.",
    "university-of-geneva": "The current Version 3 procedure and discretionary publication authority are public; 31 July 2026 UNIGE member validation confirms that Rectorate decisions and sanctions are not publicly disclosed and that no UNIGE-owned standing output channel is currently available.",
    "heidelberg-university": "A 2019 case-specific interim summary is public and the rules require anonymized annual reporting to the Rector, but no current standing output channel was identified; the case's final commission report remained internal.",
    "university-of-helsinki": "Public output located is TENK national statement-summary reporting after local processes; no Helsinki-owned output channel was identified.",
    "leiden-university": "Institution-owned CWI annual reports and advice/final-judgment pages provide local public output.",
    "imperial-college-london": "Institution-owned annual research-integrity statements provide recurring public reporting.",
    "university-college-london": "Institution-owned annual research-integrity statements provide recurring public reporting and committee-analysis fields.",
    "lund-university": "Institution-owned Review Board annual report evidence is present for the local other-deviations route.",
    "university-of-milan": "Member validation confirms that violation cases, reasoned opinions and internal statistics exist, but the minutes and opinions are restricted official records rather than public case output.",
    "lmu-munich": "Procedure evidence is public and publication is discretionary after final decisions, but no standing output channel was identified.",
    "university-of-oxford": "Institution-owned annual statements provide anonymized allegations and outcomes.",
    "universite-paris-saclay": "POLETHIS/RIS procedure evidence is public; no Paris-Saclay-owned signalement statistics or case-output channel was identified.",
    "sorbonne-university": "Sorbonne has a visible institutional annual statement/reporting source, but member validation indicates case-level reporting for the studied files appears internal or available only through restricted access.",
    "university-of-strasbourg": "Public output located is Ofis national context; no Strasbourg-owned output channel was identified.",
    "utrecht-university": "Utrecht annual-report evidence and UNL sector case PDFs provide institution-linked public output.",
    "eth-zurich": "Institution-owned anonymized investigation report and procedure-statistics tables provide public output.",
    "university-of-zurich": "The legal framework, procedure and contextual news evidence are public, but July 2026 UZH member validation confirms that no UZH-owned standing output channel is currently available."
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
    const countryCodeSource = record.countryCodeSource || countryCodeSources[record.countryId] || null;
    const committeeCodeSource = record.committeeCodeSource || null;
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
        countryCodeSource,
        committeeCodeSource,
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
        countryCodeSource,
        committeeCodeSource,
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
    title: "LERU research integrity member view",
    reportTitle: "Research integrity routes and transparency at LERU member universities",
    status: "Public-source report for member review",
    lastUpdated: "2026-07-31",
    sourceBasis:
      "Official LERU members page plus existing country dossiers, transparency records, source registry entries and country source notes in this repository.",
    caveat:
      "Report based on public sources and existing project data; not an official LERU statement. Institution-level details require member review before they should be treated as finalized or authoritative.",
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
      "The strongest public-reporting examples in this report are annual reports, anonymized summaries or institutional report tables rather than full case files.",
      "Boundary regimes such as biomedical ethics, animal research, data protection, IP, open science and funder compliance often create important public records but should not be recoded as misconduct handling."
    ],
    validationAgenda: [
      "Is the displayed office, committee, ombuds route or procedure the correct first institutional route?",
      "Is there a public annual report, aggregate statistics page or anonymized case-output channel that should be added?",
      "Are there internal routes that matter operationally but should not be published on a public page?",
      "Which public sources are stable enough to cite as the member-facing evidence backbone?",
      "Which adjacent governance routes should be shown only as context, not as research-misconduct adjudication?",
      "What non-personal member-review pathway should be used for future updates?"
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
          label: "KU Leuven CRI regulation",
          url: "https://research.kuleuven.be/en/integrity-ethics/integrity/procedures",
          type: "institutional procedure",
          supports: "Commission on Research Integrity regulation and procedure",
          note: "Added from the Belgian country dossier as the current local procedure/rule-basis link."
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
      validationStatus: "Updated with UB member validation on route, CIR-CAT status and no-local-output finding",
      evidenceLevel: "Strong",
      transparencyCategory: "UB code plus external CIR-CAT regional recommendation; no UB-owned reporting yet",
      countrySystemSummary:
        "Spain is represented as a distributed integrity system with national soft-law and committee networks, Catalan CIR-CAT routes, separate CERCA centre responsibilities, institutional codes and separate ethics, quality-assurance and biomedical/animal/data boundaries.",
      nationalRoute:
        "UB sits inside the Spanish distributed model and Catalan regional layer. CIR-CAT is an external Generalitat de Catalunya body attached to the department responsible for research and universities, with power to issue recommendations to Catalan universities and CERCA centres. UB and CERCA centres remain separate institutions with their own powers under their regulations.",
      institutionalRoute:
        "UB member validation confirms that the UB ethics/integrity portal plus Code of Conduct for Research Integrity is the correct member-facing institutional route. UB has recently modified its statutes and, once they are approved and in force, will begin the process of establishing a research-integrity committee.",
      committeeOrOffice:
        "UB ethics/integrity portal and Code of Conduct; UB ethics committees as boundary review infrastructure; planned UB research-integrity committee after statutes enter force; CIR-CAT external regional committee for recommendations",
      procedureSummary:
        "UB's official page states that research is conducted under the UB Code of Conduct for Research Integrity and identifies four committees that review ethical implications of projects. The UB code was approved by the Governing Council on 15 May 2020 and includes protocols for fraud, unacceptable practices and wrongful conduct. Member validation confirms that the existing UB committees should be framed as boundary ethics review rather than misconduct handling unless the new research-integrity committee is established. CIR-CAT's admission procedure provides the external regional route for communications and recommendations.",
      publicOutputSummary:
        "UB member validation confirms that UB does not yet publish annual research-integrity statistics, anonymized summaries or committee activity reports beyond the located pages. Public-output evidence is limited to CIR-CAT Recommendation 1/2025, a public external regional integrity recommendation directly concerning UB doctoral-affiliation guidance and CERCA institutions.",
      transparencySummary:
        "Detailed seed because UB has a member-confirmed institution-level code/route and a public external CIR-CAT regional output connected to UB/CERCA affiliation guidance. This is not UB-owned reporting, not a UB misconduct archive and not general case-file publication.",
      sourceCoverage: {
        institutionalProcedure: "available",
        committeePage: "available",
        annualReportOrCaseOutput: "available",
        sourceRegistryLinks: 2
      },
      sourceLinks: [
        {
          label: "UB ethics and integrity",
          url: "https://web.ub.edu/en/ethics-integrity",
          type: "official",
          supports: "institutional route",
          note: "Member validation confirms this portal, together with the Code of Conduct, as the correct UB member-facing route."
        },
        {
          label: "UB Code of Conduct for Research Integrity",
          url: "https://www.ub.edu/comissiobioetica/sites/default/files/documents/normativa/codi_dintegritat_en_la_recerca_de_la_universitat_de_barcelona.pdf",
          type: "procedure",
          supports: "institutional code",
          note: "Member validation confirms this as part of the correct UB member-facing route."
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
          note: "Official external Generalitat de Catalunya route for communications, requests and publication of CIR-CAT opinions under transparency rules."
        },
        {
          label: "CIR-CAT Recommendation 1/2025",
          url: "https://web.gencat.cat/content/dam/webgencat/documents/la-generalitat/com-ens-organitzem/departaments/recerca-universitats/cir-cat/recomanacio_1_2025.pdf",
          type: "regional public output",
          supports: "institution-linked integrity recommendation",
          note: "Public external regional recommendation on UB doctoral-affiliation guidance and CERCA-linked research outputs; not UB-owned reporting."
        },
        {
          label: "CERCA Ombudsperson operating regulations",
          url: "https://cerca.cat/wp-content/uploads/2023/07/Ombudsperson_regulation_June2023.pdf",
          type: "regional boundary/route context",
          supports: "CERCA centre responsibility separation",
          note: "Use only to keep CERCA centre responsibilities separate from UB and CIR-CAT in the validated profile."
        }
      ],
      tags: ["integrity code", "member validated", "ethics boundary", "CIR-CAT", "external regional output", "pending research-integrity committee"],
      caveats: [
        "Do not treat CIR-CAT Recommendation 1/2025 as UB-owned reporting or as a UB institutional case archive.",
        "Keep UB, CERCA centres and CIR-CAT responsibilities separate: CERCA centres and UB are different institutions, while CIR-CAT is an external Generalitat de Catalunya body.",
        "UB ethics committees, animal experimentation, biomedical ethics, data protection, quality assurance and open-science routes remain boundary material unless a source explicitly routes them into research-misconduct handling.",
        "UB member validation confirms that no UB institutional annual integrity statistics, anonymized summaries, committee activity reports or general public misconduct case-output channel are available yet beyond the located pages."
      ],
      reportNotes: [
        "Batch 3 moved UB to Detailed seed because CIR-CAT Recommendation 1/2025 gives public institution-linked integrity output, while preserving the negative finding for a UB-owned archive.",
        "29 July 2026 UB member validation confirmed the UB portal and Code as the correct institutional route, confirmed CIR-CAT output as external regional context rather than UB-owned reporting, confirmed that UB has no annual statistics, anonymized summaries or committee activity reports yet, and added a watchpoint for the future UB research-integrity committee after statutes enter force."
      ],
      nextFollowUp:
        "Monitor approval and entry into force of the modified UB statutes and the subsequent creation of a UB research-integrity committee; add UB-owned statistics or activity reports only if they become public; index CIR-CAT Recommendation 1/2025 as external regional output.",
      memberValidationQuestions: [
        "Confirmed: the UB ethics/integrity portal plus Code of Conduct is the correct member-facing institutional route.",
        "Confirmed: CIR-CAT Recommendation 1/2025 should be shown as external regional institution-linked output rather than UB-owned reporting.",
        "Confirmed: UB does not yet publish annual research-integrity statistics, anonymized summaries or committee activity reports beyond the located pages.",
        "Track: UB has recently modified its statutes and should be rechecked once those statutes are approved and in force and the research-integrity committee establishment process begins.",
        "Confirmed: CERCA centres and UB are separate institutions with their own powers, while CIR-CAT is an external Generalitat de Catalunya body with recommendation power toward Catalan universities and CERCA centres."
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
      validationStatus: "Updated with Danish member validation on Danish Board on Research Misconduct (NVU) terminology and UCPH route correctness",
      evidenceLevel: "Strong",
      transparencyCategory: "Practice Committee annual reports and minutes",
      institutionalRoute:
        "Danish member validation confirms that the UCPH route and links are correct. The Practice Committee assesses responsible-conduct issues, receives complaints, publishes rules, annual reports and meeting minutes, handles cases returned from the Danish Board on Research Misconduct (NVU) and can refer suspected research misconduct to the national Board.",
      committeeOrOffice: "Practice Committee and Named Persons",
      procedureSummary:
        "Committee page, publication hub and institutional code route are represented in the Denmark dossier.",
      publicOutputSummary:
        "The 2024 Practice Committee annual report is coded as the strongest local institutional publication example found in the Denmark pass.",
      transparencySummary:
        "Annual reports and minutes create a local public-output lane, distinct from the Danish Board on Research Misconduct (NVU) national research-misconduct route.",
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
          label: "UCPH Code of Conduct for Responsible Research",
          url: "https://research.ku.dk/integrity/code-of-conduct/",
          type: "institutional code",
          supports: "responsible-research code, Named Persons and Practice Committee route",
          note: "Added from the Denmark country dossier as the institutional code/conduct link."
        },
        {
          label: "UCPH Practice Committee Annual Report 2024",
          url: "https://praksisudvalget.ku.dk/publikationer/_rsberetning_2024_Praksisudvalget_K_benhavns_Universitet.pdf",
          type: "annual report",
          supports: "local QRP and returned-case summaries",
          note: "Contains case summaries, rejections and matters returned from the Danish Board on Research Misconduct (NVU) to local handling."
        }
      ],
      tags: ["Practice Committee", "annual report", "minutes", "returned cases", "member validated", "Danish Board on Research Misconduct"],
      caveats: [
        "Do not merge UCPH local QRP publication with Danish Board on Research Misconduct (NVU) national research-misconduct publication."
      ],
      reportNotes: [
        "29 July 2026 Danish member validation confirmed that the Danish system and UCPH profile are correct, while clarifying that the Danish Board on Research Misconduct (NVU) should be named at first mention and described as handling research misconduct."
      ],
      nextFollowUp: "Index UCPH annual reports and minutes by case type, returned-case status and local outcome category.",
      memberValidationQuestions: [
        "Confirmed: the Danish system and UCPH route and links are correct.",
        "Use Danish Board on Research Misconduct (NVU) at first mention.",
        "Describe the Danish Board on Research Misconduct (NVU) as handling research misconduct, while the UCPH Practice Committee route covers local questionable research practice and returned matters.",
        "Index UCPH annual reports and minutes by case type, returned-case status and local outcome category."
      ]
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
      validationStatus: "Source-current checked 30 July 2026; needs member validation of local output-negative finding",
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
        "The Senior Dean page, last updated 22 July 2025, and the Version 1.1 Good Research Practice policy issued 15 February 2024 identify the Senior Dean as College Research Integrity Officer, delegate allegation management to the Dean of Research, and route upheld matters to the relevant staff or student disciplinary process. The Research Integrity support page was current on 16 January 2026. The policy separates research misconduct from academic-integrity, dignity/respect, protected-disclosure and fraud routes, while the 2026 fraud policy confirms that research fraud can involve consultation with the College RIO or Dean of Research.",
      publicOutputSummary:
        "No Trinity-owned public case-output channel, annual research-integrity statement, anonymized institutional case-summary page or local aggregate misconduct-statistics channel was identified in the 30 July 2026 retest. Ireland's NRIF/IUA corridor publishes national aggregate formal-investigation statistics, and the 2023 report includes Trinity in the responding RPO universe, but those reports do not provide Trinity-specific counts or case narratives. A Senior Lecturer annual-report table labelled Research Misconduct was excluded because it sits in the student examination-infringement and plagiarism appendix and is sourced from the Office of the Junior Dean.",
      transparencySummary:
        "Detailed no-local-output audit seed: the local route is well documented, national aggregate output exists, and the local output gap is now explicitly audited. Public evidence remains procedure-route evidence plus national aggregate context rather than Trinity-specific transparency output.",
      sourceCoverage: {
        institutionalProcedure: "available",
        committeePage: "available",
        annualReportOrCaseOutput: "none located locally; national aggregate available; fraud boundary reporting separate",
        sourceRegistryLinks: 4
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
          url: "https://www.tcd.ie/research/assets/pdf/Policy%20on%20Good%20Research%20Practice_1.1.pdf",
          type: "procedure",
          supports: "good-practice policy",
          note: "Version 1.1, issued 15 February 2024. The current Research assets URL and former Media URL returned byte-identical PDFs on 30 July 2026; the current hub-linked URL is retained here."
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
        "Do not count the Senior Lecturer annual-report Research Misconduct row as research-integrity committee output: it is part of a student examination-infringement and plagiarism appendix and reports Office of the Junior Dean data.",
        "Research ethics approvals, data protection, student academic-integrity, dignity/respect, protected-disclosure and anti-fraud routes should remain separate from research-misconduct handling unless the Good Research Practice policy explicitly connects the matter.",
        "Do not infer absence of Trinity cases from the absence of a Trinity-specific public output channel."
      ],
      reportNotes: [
        "Batch 4 upgraded Trinity to Detailed seed as a no-local-output audit profile: local procedure and national aggregate context are clear, but Trinity-specific public output remains unlocated.",
        "Source-current verification on 30 July 2026 retained the national-or-sector-output category, moved the policy citation to the current hub-linked URL after byte-level comparison, confirmed the 2025/2026 route-page dates and excluded a student-discipline table that could otherwise create a false local-output signal."
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
      profileStatus: "Member-validated procedure-only/no-output profile",
      validationStatus: "Updated with University of Freiburg member validation on route names, current no-public-output status and adjacent support routes",
      evidenceLevel: "Strong",
      transparencyCategory: "Member-validated Academic Integrity procedure with no current public reporting channel",
      countrySystemSummary:
        "Germany has a distributed integrity system with the DFG Code, institution-level ombudsperson and investigation routes, the German Research Ombudsman, DFG sanctions/output, OWID reporting and separate ethics, animal, data, medical and research-security boundaries.",
      nationalRoute:
        "Freiburg belongs to the German institution-first route: the Representative for Academic Self-Regulation and the Investigative Commission on Academic Integrity form the local handling route, while DFG/OWID publication lanes and the German Research Ombudsman are national or system-level context rather than Freiburg's own standing output channel.",
      institutionalRoute:
        "Freiburg presents its research-integrity route through its English Academic Integrity page, the Regulations of the University of Freiburg on Safeguarding Academic Integrity, the Representative for Academic Self-Regulation and the Investigative Commission on Academic Integrity.",
      committeeOrOffice:
        "Representative for Academic Self-Regulation; Investigative Commission on Academic Integrity. The Ethics Committee and Commission on Responsibility in Research are separate advisory or research-ethics boundaries.",
      procedureSummary:
        "The Academic Integrity page links Freiburg's implementation of the DFG good-research-practice guidelines to the 2022 Regulations on Safeguarding Academic Integrity. The Representative for Academic Self-Regulation advises reporters and accused persons, may investigate suspected misconduct and makes a plausibility assessment; the Investigative Commission on Academic Integrity advises the Rector and investigates allegations. The Research Boards page also lists the Commission on Responsibility in Research and the Ethics Committee, but member validation keeps both outside the lead misconduct route.",
      publicOutputSummary:
        "University of Freiburg member validation on 31 July 2026 confirms that no current annual integrity statistics, summaries or comparable public reporting channel are published. The 2014-2015 and 2016-2017 Rector reports and the sports-medicine/doping misconduct page remain recorded as historical evidence, but they are not treated as a current Freiburg reporting route or recurring misconduct-output archive.",
      transparencySummary:
        "Member-validated procedure-only profile: the Academic Integrity procedure and its two lead bodies are public, but Freiburg confirms that it does not publish annual integrity statistics, summaries or similar current output. Historical Rector counts and the sports-medicine case complex remain contextual evidence and should not be generalized into a current reporting category.",
      sourceCoverage: {
        institutionalProcedure: "available",
        committeePage: "available",
        annualReportOrCaseOutput: "none currently published; historical rector reporting and case-specific material retained as context",
        sourceRegistryLinks: 9
      },
      sourceLinks: [
        {
          label: "University of Freiburg Academic Integrity",
          url: "https://uni-freiburg.de/en/research/quality-assurance/good-research-practice/academic-integrity/",
          type: "procedure hub",
          supports: "DFG implementation, Freiburg integrity regulation and Representative for Academic Self-Regulation route",
          note: "Member-preferred English Academic Integrity page; links the regulation and identifies the confidential preliminary-advice and plausibility route."
        },
        {
          label: "University of Freiburg regulation on safeguarding academic integrity",
          url: "https://uni-freiburg.de/wp-content/uploads/Uni-Freiburg-Ordnung-Redlichkeit-in-der-Wissenschaft-en.pdf",
          type: "procedure",
          supports: "ombudsperson and suspected-misconduct procedure",
          note: "English convenience translation of the regulation adopted 25 May 2022; the German original remains authoritative."
        },
        {
          label: "University of Freiburg authoritative German integrity regulation",
          url: "https://uni-freiburg.de/en/wp-content/uploads/sites/61/Uni-Freiburg-Ordnung-Redlichkeit-in-der-Wissenschaft.pdf",
          type: "procedure",
          supports: "authoritative 2022 ombudsperson and suspected-misconduct procedure",
          note: "German official text published 1 June 2022; checked against the English convenience translation on 30 July 2026."
        },
        {
          label: "University of Freiburg Research Boards",
          url: "https://uni-freiburg.de/en/research/quality-assurance/research-boards/",
          type: "committee page",
          supports: "Investigative Commission remit and separate responsibility-in-research and ethics boundaries",
          note: "Member-preferred English page. Identifies the Investigative Commission on Academic Integrity and separately describes the Commission on Responsibility in Research and Ethics Committee."
        },
        {
          label: "University of Freiburg Good Research Practice",
          url: "https://uni-freiburg.de/en/research/quality-assurance/good-research-practice/",
          type: "policy and guidance hub",
          supports: "institutional good-research-practice policies and guidance",
          note: "Member-supplied English hub for Freiburg guidelines and policies."
        },
        {
          label: "University of Freiburg ombuds process for doctoral candidates and supervisors",
          url: "https://uni-freiburg.de/frs-en/grace/ombuds-process/",
          type: "doctoral supervision and conflict-support boundary",
          supports: "central confidential doctoral ombuds process and anonymized ten-year activity report",
          note: "Separate from suspected academic-misconduct handling; the page directs misconduct concerns to the academic self-regulation route."
        },
        {
          label: "University of Freiburg doctoral candidate survey",
          url: "https://uni-freiburg.de/frs-en/grace/doctoral-studies-ufr/doc-survey/",
          type: "early-career researcher and doctoral-quality context",
          supports: "2024 survey results and institutional follow-up on doctoral working and supervision conditions",
          note: "Member-supplied contextual source; not a misconduct procedure or public case-output channel."
        },
        {
          label: "University of Freiburg sports medicine and misconduct public page",
          url: "https://uni-freiburg.de/themen-im-fokus/aufklaerungsarbeit-zu-doping-sportmedizin-und-wissenschaftlichem-fehlverhalten/",
          type: "historical public case material",
          supports: "case-specific historical transparency",
          note: "Use only as historical case-complex evidence, not as proof of a standing public misconduct archive."
        },
        {
          label: "University of Freiburg Rector annual report 2014-2015",
          url: "https://uni-freiburg.de/en/wp-content/uploads/sites/61/Uni-Freiburg-Jahresbericht-des-Rektors-2014-15.pdf",
          type: "historical annual report",
          supports: "historical aggregate investigation-procedure counts",
          note: "Pages 26-27 record 19 completed procedures and three newly received cases in the reporting period."
        },
        {
          label: "University of Freiburg Rector annual report 2016-2017",
          url: "https://uni-freiburg.de/en/wp-content/uploads/sites/61/Uni-Freiburg-Jahresbericht-des-Rektors-2016-17.pdf",
          type: "historical annual report",
          supports: "historical three-year integrity-matter counts",
          note: "Pages 42-45 record 51 centrally pending matters over the three-year term, including 39 involving the Investigation Commission and 28 examined by the self-control officer."
        }
      ],
      tags: ["member validated", "procedure only", "Germany", "academic self-regulation", "investigative commission", "academic integrity", "doctoral ombuds boundary", "early-career survey", "historical context", "no public output confirmed"],
      caveats: [
        "The procedure-only category is the member-validated current framing. The sports-medicine material and older Rector-report counts remain historical context, not evidence of a current reporting corridor.",
        "The doctoral ombuds process concerns supervision conflicts and has its own anonymized activity report; it is not the general suspected-misconduct route.",
        "The doctoral candidate survey concerns working and supervision conditions and is quality/culture context, not case reporting.",
        "The Commission on Responsibility in Research addresses ethical and legal aspects of security-related research, while the Ethics Committee advises researchers; both remain separate from the lead misconduct route.",
        "Do not infer absence of current Freiburg cases, concerns, investigations or internal reporting from the absence of a public output channel."
      ],
      reportNotes: [
        "Batch 4 upgraded Freiburg to Detailed seed as a historical-output/no-current-output audit profile; the sports-medicine page remains case-specific, not a standing archive.",
        "Source-current verification on 30 July 2026 added verified historical Rector-report counts while finding no current recurring public output.",
        "31 July 2026 Freiburg member validation reclassified the current profile from historical-or-case-specific to procedure-only, confirmed that no annual statistics or summaries are published, supplied the preferred English Academic Integrity and Research Boards pages, and added the doctoral ombuds process and doctoral survey as separate support and quality routes."
      ],
      nextFollowUp:
        "Monitor the Academic Integrity and Research Boards pages for procedural changes and recheck only if Freiburg later introduces non-personal public reporting.",
      memberValidationQuestions: []
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
      profileStatus: "Member-validated procedure-only/no-output profile",
      validationStatus: "Updated with University of Geneva member validation on the integrity route, no-public-output finding and ethics boundaries",
      evidenceLevel: "Strong",
      transparencyCategory: "Member-validated integrity procedure with non-public Rectorate decisions",
      countrySystemSummary:
        "Switzerland is coded as fragmented funder and institutional visibility rather than one national misconduct board, with SCCSI, SNSF and ETH-style outputs kept distinct from individual university routes.",
      nationalRoute:
        "UNIGE sits inside the Swiss institution-first model. Member validation confirms that no national body receives and decides concrete UNIGE cases: SCCSI supplies advice and compiles national statistics from anonymous institutional reports, while the UNIGE directive governs local handling.",
      institutionalRoute:
        "Scientific-integrity concerns follow the UNIGE Memento directive: faculty integrity delegates lead the preliminary route, an ad hoc fact-finding commission may investigate, and the Rectorate takes final decisions and sanctions. The all-external Ethics and Professional Conduct Committee is a separate ethics/professional-conduct reference body rather than the lead misconduct investigator.",
      committeeOrOffice: "Faculty integrity delegates; ad hoc fact-finding commission when required; dean/director reporting route; Rectorate final decision and sanctions; external Ethics and Professional Conduct Committee as separate reference body",
      procedureSummary:
        "The RGO research-ethics page states that UNIGE has a dedicated directive to prevent breaches of integrity and protect scientific-work quality. Memento 0003 is current as Version 3: suspected breaches are reported to the Rectorate, routed through a faculty integrity delegate, may require an ad hoc fact-finding commission, and end with a Rectorate decision on closure, sanctions and corrective measures. UNIGE member validation confirms this allocation and reports that an update is being considered to align the directive with the 2023 ALLEA Code and the Swiss scientific-integrity code; no revised directive was public on 31 July 2026.",
      publicOutputSummary:
        "UNIGE member validation on 31 July 2026 confirms that Rectorate decisions and sanctions in scientific-integrity cases are not publicly disclosed. No UNIGE-owned standing case-output channel, annual integrity-statistics page, ombudsperson report or anonymized decision archive was identified in the preceding public-source retest. The directive gives the Rectorate discretionary authority over any publication, which is not a standing public-output channel.",
      transparencySummary:
        "Member-validated procedure-only profile: the breach route is clear and public, but the final decisions and sanctions are not publicly disclosed. The mandatory project-risk statement, CCER, CUREG, CARE/animal experimentation and the institutional Data Protection Officer route are prospective ethics or specialist governance and must remain separate from misconduct case publication.",
      sourceCoverage: {
        institutionalProcedure: "available",
        committeePage: "available",
        annualReportOrCaseOutput: "none located; discretionary publication only",
        sourceRegistryLinks: 7
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
          note: "Describes an external, independent common ethics/professional-conduct body; member validation identifies it as all-external and separate from the lead scientific-integrity investigation route."
        },
        {
          label: "UNIGE directive on integrity in scientific research",
          url: "https://memento.unige.ch/doc/0003",
          type: "procedure",
          supports: "scientific-integrity procedure and breach-handling reference",
          note: "Current Version 3 official Memento directive. The 5 September 2025 maintenance entry updates only the Swiss-code footnote reference; the substantive procedure remains unchanged."
        },
        {
          label: "CUREG how-we-work page",
          url: "https://cureg.unige.ch/en/how-we-work/",
          type: "boundary route",
          supports: "ethical-review boundary and directive cross-reference",
          note: "Useful boundary source; CUREG is not the general misconduct adjudication route."
        },
        {
          label: "UNIGE Statement of ethical risk announcement",
          url: "https://www.unige.ch/recherche/en/news/whats-new/A-new-tool-to-support-research-ethics/topic/1890/news",
          type: "boundary route",
          supports: "mandatory project-level ethics self-check from 2026",
          note: "Prospective project-risk screening for environmental, dual-use, human-participant, integrity and animal issues; not a misconduct investigation or output route."
        },
        {
          label: "UNIGE Commission for Animals in Experimental Research (CARE)",
          url: "https://www.unige.ch/recherche/expanim/informations-pour-les-chercheurs/reglementation/commission-interfacultaire-dethique-de-lexperimentation-animale",
          type: "boundary route",
          supports: "institutional animal-research advisory committee",
          note: "Animal-experimentation governance and advice; keep separate from scientific-integrity case handling."
        },
        {
          label: "UNIGE data-protection roles and responsibilities",
          url: "https://www.unige.ch/donnees-personnelles/a-savoir/roles-et-responsabilites",
          type: "boundary route",
          supports: "institutional Data Protection Officer role",
          note: "The DPO advises, supports and monitors personal-data compliance; this is a data-protection boundary, not scientific-integrity adjudication."
        }
      ],
      tags: ["member validated", "procedure only", "faculty integrity delegates", "fact-finding commission", "Rectorate decision", "external ethics committee", "ethics boundary", "Swiss institutional route", "no public output confirmed", "directive revision watch"],
      caveats: [
        "UNIGE member validation confirms that Rectorate decisions and sanctions are not publicly disclosed; this does not imply absence of cases.",
        "Do not treat discretionary Rectorate publication authority as a recurring public output channel.",
        "A 2025 UNIGE communication about plagiarism in a scientific-committee report was not verified as an output of the Memento 0003 breach procedure and is therefore not counted as committee case output.",
        "The Ethics and Professional Conduct Committee is an external reference body; faculty delegates, an optional ad hoc commission and the Rectorate form the scientific-integrity investigation and decision route.",
        "CUREG, CCER, CARE/animal experimentation, ethical-risk statements, human-research ethics, data protection and dual-use/security review are boundary governance, not misconduct case publication.",
        "The reported directive update is under consideration and must not be described as adopted until a revised official text is published."
      ],
      reportNotes: [
        "Batch 4 upgraded UNIGE to Detailed seed as a procedure-only/no-output audit profile; use the UNIGE directive as the scientific-integrity backbone and the RGO/CUREG pages as route and boundary context.",
        "Source-current verification on 30 July 2026 retained the procedure-only category, confirmed Memento 0003 as Version 3 and distinguished its 2025 footnote-only maintenance update from a substantive procedural revision.",
        "31 July 2026 UNIGE member validation confirmed the faculty-delegate/ad hoc commission/Rectorate route, the non-public status of final decisions and sanctions, the external Ethics and Professional Conduct Committee's separate role, the specialist ethics boundaries and a prospective directive-alignment review."
      ],
      nextFollowUp:
        "Monitor publication of a revised UNIGE scientific-integrity directive aligned with the 2023 ALLEA and Swiss codes, and recheck whether any non-personal aggregate reporting is introduced.",
      memberValidationQuestions: []
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
      profileStatus: "Detailed historical-case-output/no-current-output audit seed",
      validationStatus: "Source-current checked 30 July 2026; needs member validation of historical case-output framing",
      evidenceLevel: "Moderate",
      transparencyCategory: "Ombuds and commission route with historical case-specific public summary",
      countrySystemSummary:
        "Germany is represented as a distributed integrity system built from the DFG Code, institutional ombudsperson and investigation routes, the national German Research Ombudsman, DFG sanctions/output, OWID reporting and separate ethics, clinical, animal, data and IP boundaries.",
      nationalRoute:
        "Heidelberg belongs to the German institution-first model: the local ombudsmen and commission are the first Heidelberg route, while the national German Research Ombudsman and DFG routes remain second-line or funder-level context rather than Heidelberg output.",
      institutionalRoute:
        "Heidelberg publishes a good-academic-practice framework with Senate-appointed ombudsmen as first contacts for suspected academic misconduct and a rectorate standing commission that investigates allegations, evaluates cases and recommends or takes measures. Responsibility in science, fair-conduct, ethics and doctoral support routes are adjacent but separate.",
      committeeOrOffice: "Ombudsmen for good academic practice; Commission for the Safeguarding of Good Academic Practice; separate responsibility-in-science and doctoral/fair-conduct routes",
      procedureSummary:
        "The university-wide good-academic-practice page states that the Rectorate has a standing commission to investigate academic-misconduct allegations and that ombudsmen or the commission chair serve as initial contacts. The rules in the version of 28 September 2021 define academic misconduct, ombudsperson duties and annual general anonymized reporting to the Rector; they also state that the Commission report itself is not published, although the University may inform affected third parties or the public where required.",
      publicOutputSummary:
        "Heidelberg published a case-specific interim summary from the Senate Commission in 2019 concerning the breast-cancer blood-test matter. The official case overview says the final Commission report was delivered in October 2019 but remained internal while disciplinary proceedings continued. No current standing case-output channel, public annual ombuds/commission statistics page or anonymized decision archive was identified in the 30 July 2026 retest. The rules require annual general anonymized reporting to the Rector, but no public version of that internal reporting was located.",
      transparencySummary:
        "Procedure visibility is strong and one historical case-specific interim summary is public, but no current recurring output mechanism was located. Doctoral ombuds, fair-conduct/workplace, ethics review, responsibility-in-science and plagiarism-support material should remain separate from research-misconduct handling unless the academic-misconduct procedure is explicitly invoked.",
      sourceCoverage: {
        institutionalProcedure: "available",
        committeePage: "available",
        annualReportOrCaseOutput: "historical case-specific interim summary; no current standing output; final report internal",
        sourceRegistryLinks: 4
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
          url: "https://www.graduateacademy.uni-heidelberg.de/en/support/ombuds-program",
          type: "official",
          supports: "doctoral ombuds route",
          note: "Current destination of the former ombudsperson URL; shows a mediation-oriented doctoral support route and is not the general misconduct commission route."
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
        },
        {
          label: "Heidelberg 2019 Senate Commission interim summary",
          url: "https://www.uni-heidelberg.de/de/newsroom/bluttest-zur-brustkrebsdiagnostik/zusammenfassung-des-zwischenberichts",
          type: "historical case-specific output",
          supports: "public interim findings from the Senate Commission",
          note: "Public case-specific interim summary; it does not establish a standing decision or report archive."
        },
        {
          label: "Heidelberg breast-cancer blood-test case overview",
          url: "https://www.uni-heidelberg.de/de/newsroom/bluttest-zur-brustkrebsdiagnostik",
          type: "historical case overview",
          supports: "case chronology and final-report publication status",
          note: "Official overview states that the final Commission report was delivered in October 2019 but remained internal while disciplinary proceedings continued."
        }
      ],
      tags: ["official-source seed", "ombuds", "commission route", "historical case output", "no current standing output", "Germany distributed model"],
      caveats: [
        "The 2019 interim summary is a historical case-specific output, not a current public case-output channel or annual statistics route.",
        "The October 2019 final Commission report remained internal; do not describe the interim summary as the final report.",
        "The rules' annual anonymized report to the Rector is internal reporting evidence, not a public output channel.",
        "Graduate Academy, plagiarism-detection, responsibility-in-science, ethics-review and fair-conduct/workplace sources are support or boundary routes unless the academic-misconduct procedure is invoked.",
        "Do not infer absence of Heidelberg cases from the absence of a public output channel."
      ],
      reportNotes: [
        "Batch 5 upgraded Heidelberg to Detailed seed as a procedure-only/no-output audit profile: official route evidence is strong and internal anonymized reporting is noted.",
        "Source-current verification on 30 July 2026 corrected the category to historical-or-case-specific after locating the public 2019 Senate Commission interim summary. The strict current-output count remains unchanged because no standing output channel was found and the final Commission report remained internal."
      ],
      nextFollowUp:
        "Check whether the Commission for the Safeguarding of Good Academic Practice or Rectorate publishes any current non-personal annual activity, general anonymized reporting or later outcome summary; keep the 2019 interim summary separate from the internal final report.",
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
      validationStatus: "Updated with University of Helsinki member validation on local route and no-local-output finding",
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
        "University of Helsinki member validation confirms that no Helsinki local public case-output channel was identified beyond the located public pages.",
        "TENK statement summaries are national second-line output and should not be recoded as Helsinki local publication unless a specific summary identifies Helsinki.",
        "Research ethics committees, medical ethics, data management and permit routes remain boundary regimes."
      ],
      reportNotes: [
        "Batch 5 upgraded Helsinki to Detailed seed as a national-output/no-local-output audit profile: local first-instance handling is clear, while public output remains TENK national-summary based rather than Helsinki-owned.",
        "29 July 2026 University of Helsinki member validation confirmed the local-route and no-local-output framing; the profile remains national-output because TENK statement summaries are the public Finnish output route."
      ],
      nextFollowUp: "Monitor whether Helsinki later publishes annual statistics, local RI decisions or links to Helsinki-specific TENK summaries beyond procedure guidance and general annual reviews.",
      memberValidationQuestions: [
        "Confirmed: the chancellor notification route is the correct public first-instance framing for Helsinki.",
        "Confirmed: no Helsinki local annual statistics or anonymized local decisions were identified beyond the located pages.",
        "Keep TENK statement summaries as national second-line output unless a summary explicitly identifies Helsinki.",
        "Keep ethics, data, animal, clinical and open-science routes as boundary material unless a source routes them into research-misconduct handling."
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
      profileStatus: "Member-validated restricted/internal-output profile",
      validationStatus: "Updated with University of Milan member validation on mandate, disciplinary split and restricted records",
      evidenceLevel: "Strong",
      transparencyCategory: "Restricted internal case records, opinions and statistics",
      countrySystemSummary:
        "Italy is coded as a distributed system with local university ethics and integrity committees, national and research-organisation infrastructure, and separate clinical, territorial ethics, animal, data, IP and quality-assurance boundaries.",
      nationalRoute:
        "The Milan route is institution-level and split by legal character. The Ethics Committee handles project ethics and inquiries into research-integrity misconduct that does not constitute a disciplinary offence; disciplinary-offence inquiries fall to the University Disciplinary Board. National or territorial clinical-ethics routes and CNR/CNB infrastructure remain separate.",
      institutionalRoute:
        "The University of Milan Ethics Committee was established in 2007 for ethical assessment of research projects, initially primarily for funding purposes and without research-integrity jurisdiction. Since July 2015 it has also promoted research integrity and conducted inquiries into misconduct only where the matter is not a disciplinary offence; disciplinary cases are handled by the Disciplinary Board.",
      committeeOrOffice:
        "Ethics Committee for project ethics and non-disciplinary research-integrity inquiries; Research Ethics and Ethics Committee Support Office; Disciplinary Board for disciplinary offences",
      procedureSummary:
        "The Committee page links the 20 July 2015 competence decree and separates project-ethics opinions from non-disciplinary Code and research-integrity violations. The 2022 regulation requires a reasoned opinion to be attached to the meeting minutes and requires the Committee president to report annually to the Academic Senate. The 2024 Code supplies the research-integrity rules and proceedings baseline; disciplinary offences follow the separate Disciplinary Board route.",
      publicOutputCategoryNote:
        "Member validation received on 16 July 2026 confirms that violation cases are recorded in Committee minutes and conclude with an opinion. Minutes and opinions are restricted official records, while internal statistics exist and may be requested periodically by university governance; none is a standing public case-output channel.",
      publicOutputSummary:
        "University of Milan member validation confirms a real internal case record: violation cases handled by the Ethics Committee are recorded in minutes and receive a concluding opinion. The minutes and opinions are subject to restricted consultation and stored in the University's official records system. Internal statistics can be requested periodically by governance, but no standing public case archive, opinion series or aggregate integrity-statistics channel is currently available.",
      transparencySummary:
        "The correct classification is restricted/internal output, not absence of records. The public sources show the mandate, procedure and access restriction; the case minutes, opinions and statistics remain internal. Project ethics, clinical ethics, OPBA animal-welfare opinions and open-science reports remain separate unless explicitly tied to a research-integrity inquiry.",
      sourceCoverage: {
        institutionalProcedure: "available",
        committeePage: "available",
        annualReportOrCaseOutput: "restricted/internal only; minutes, opinions and statistics",
        sourceRegistryLinks: 5
      },
      sourceLinks: [
        {
          label: "University of Milan Ethics Committee",
          url: "https://www.unimi.it/it/ateneo/governance-e-linee-strategiche/organi-di-governo/comitato-etico",
          type: "committee page",
          supports: "project-ethics route, July 2015 integrity mandate and restricted-minutes boundary",
          note: "Links the 20 July 2015 competence decree, limits Code-violation opinions to non-disciplinary matters and states that minutes are restricted through Unimibox."
        },
        {
          label: "Ethics Committee functioning regulation",
          url: "https://www.unimi.it/it/ateneo/normative/regolamenti/regolamento-comitato-etico",
          type: "procedure",
          supports: "institutional committee procedure",
          note: "The 2022 regulation requires reasoned opinions attached to minutes and annual reporting by the Committee president to the Academic Senate."
        },
        {
          label: "University of Milan Code of Ethics",
          url: "https://www.unimi.it/it/ateneo/normative/codice-etico",
          type: "code",
          supports: "research-integrity code and non-disciplinary proceedings",
          note: "The current 2024 Code includes research-specific rules and Title V on sanctions and proceedings."
        },
        {
          label: "University of Milan Statute",
          url: "https://www.unimi.it/it/ateneo/normative/statuto-dateneo",
          type: "statute",
          supports: "separate institutional basis for the Ethics Committee and Disciplinary Board",
          note: "The current Statute lists the Ethics Committee and Disciplinary Board as distinct university bodies. Member validation reports that a Statute review is underway."
        },
        {
          label: "University of Milan Disciplinary Board route",
          url: "https://www.unimi.it/it/ateneo/governance-e-linee-strategiche/elezioni-e-nomine/votazioni-corso",
          type: "disciplinary route",
          supports: "inquiry and concluding-opinion route for disciplinary proceedings involving professors and researchers",
          note: "Official current page describing the Disciplinary Board's role; keep this route separate from non-disciplinary Ethics Committee inquiries."
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
      tags: ["member validated", "ethics committee", "2007 project-ethics origin", "July 2015 integrity mandate", "disciplinary board", "restricted official records", "internal statistics", "statute review watch"],
      caveats: [
        "The Committee's 2007 establishment for project-ethics assessment must not be backdated as research-integrity jurisdiction; that mandate began in July 2015.",
        "Do not merge non-disciplinary Ethics Committee inquiries with disciplinary-offence cases handled by the Disciplinary Board.",
        "Restricted minutes, concluding opinions and internal statistics demonstrate that records exist, but they are not public misconduct case publication.",
        "Clinical trials, OPBA animal-welfare opinions, Open Science annual reports and quality-assurance documents are boundary or governance routes unless tied to a Code of Ethics violation.",
        "The University reports that a Statute review is underway and could remove research-integrity investigation authority from the Ethics Committee in the short term; the profile must be rechecked when changes are adopted."
      ],
      reportNotes: [
        "Updated on 16 July 2026 from University of Milan member validation: added the 2007/July 2015 mandate history, separated non-disciplinary and disciplinary inquiries, reclassified the transparency evidence as restricted internal records rather than absent records, noted internal statistics and added the pending Statute-review watch."
      ],
      nextFollowUp:
        "Monitor the Statute review and revise the responsible-body map immediately if research-integrity investigation authority moves away from the Ethics Committee; if governance approves public release, add non-personal aggregate statistics without exposing restricted minutes or opinions.",
      memberValidationQuestions: []
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
      validationStatus: "Source-current checked 30 July 2026; needs member validation of LMU output-negative finding",
      evidenceLevel: "Moderate",
      transparencyCategory: "Ombudspersons and investigation committee route",
      countrySystemSummary:
        "Germany is represented as a distributed integrity system built from the DFG Code, institutional ombudsperson and investigation routes, the national German Research Ombudsman, DFG sanctions/output, OWID reporting and separate ethics, clinical, animal, data and IP boundaries.",
      nationalRoute:
        "LMU belongs to the German institution-first model: its university-wide GWP regulation is the local route, while the German Research Ombudsman is an alternative supraregional route and DFG output remains funder-level context.",
      institutionalRoute:
        "LMU's current central Ethics in Research hub anchors the university-wide route and links the 17 November 2023 regulation on safeguarding good scientific practice, with ombudspersons for good scientific practice and a formal investigation committee for suspected scientific misconduct.",
      committeeOrOffice: "Ombudspersons for good scientific practice; investigation committee under the LMU GWP regulation",
      procedureSummary:
        "The LMU regulation implements the DFG code, applies to scientific and science-supporting activity at LMU, assigns organizational responsibility to university leadership, sets out independent confidential ombudsperson activity, identifies the German Research Ombudsman as an alternative route and defines the procedure from preliminary handling through formal investigation and possible measures.",
      publicOutputSummary:
        "No LMU public misconduct case-output channel, annual ombudsperson statistics page or anonymized decision archive was identified in the 30 July 2026 retest. The regulation states that university leadership decides whether and how the public is informed after a final decision, which is a discretionary publication rule rather than a standing output channel.",
      transparencySummary:
        "The official regulation gives a usable procedure seed, and medical/graduate-center pages add support and training routes. No LMU annual statistics, anonymized case summaries or standing public-output channel were located in this pass.",
      sourceCoverage: {
        institutionalProcedure: "available",
        committeePage: "available",
        annualReportOrCaseOutput: "none located; publication discretionary only",
        sourceRegistryLinks: 2
      },
      sourceLinks: [
        {
          label: "LMU Ethics in Research hub",
          url: "https://www.lmu.de/de/forschung/ethik-in-der-forschung/",
          type: "procedure and boundary hub",
          supports: "central university-wide good-scientific-practice route and boundary separation",
          note: "Current central hub linking the GWP regulation and separately signposting open science/data, animal research, Nagoya and export-control routes."
        },
        {
          label: "LMU regulation on safeguarding good scientific practice",
          url: "https://cms-cdn.lmu.de/media/contenthub/amtliche-veroeffentlichungen/gwp-ordnung.pdf",
          type: "procedure",
          supports: "university-wide GWP rules, ombudspersons and investigation committee",
          note: "Official LMU regulation dated 17 November 2023 and effective for new reports from 1 August 2023. Two current official LMU download URLs returned byte-identical PDFs on 30 July 2026."
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
        "A central Ethics in Research hub is public, but no separate non-personal LMU ombudsperson or investigation-committee directory was located beyond the regulation in the 30 July 2026 retest.",
        "Do not infer absence of LMU cases from the absence of a public output channel."
      ],
      reportNotes: [
        "Batch 5 upgraded LMU to Detailed seed as a procedure-only/no-output audit profile: the 2023 GWP regulation is strong procedure evidence, but no standing public-output channel was found.",
        "Source-current verification on 30 July 2026 retained the procedure-only category, added the current central Ethics in Research hub and confirmed that two current official regulation URLs resolve to byte-identical 17 November 2023 PDFs."
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
          label: "Oxford research integrity",
          url: "https://www.ox.ac.uk/research/support/research-culture/research-practice/research-integrity",
          type: "official route page",
          supports: "research-integrity route, Registrar route, training and annual statement hub",
          note: "Official route page found in the missing-link check."
        },
        {
          label: "Oxford procedure for addressing potential breaches of research integrity",
          url: "https://www.ox.ac.uk/research/support/governance-and-committees/research-policies/procedure-for-addressing-potential",
          type: "institutional procedure",
          supports: "procedure for receiving, assessing and investigating potential breaches",
          note: "Current procedure page found in the missing-link check."
        },
        {
          label: "Oxford Academic Integrity in Research: Code of Practice and Procedure",
          url: "https://hr.admin.ox.ac.uk/academic-integrity-in-research",
          type: "institutional code and procedure",
          supports: "Oxford code of practice and misconduct procedure basis",
          note: "Official HR Support page for the code/procedure."
        },
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
      validationStatus: "Source-current checked 30 July 2026; needs member validation of Paris-Saclay output-negative finding",
      evidenceLevel: "Moderate",
      transparencyCategory: "POLETHIS/RIS route without public case output",
      countrySystemSummary:
        "France is represented as a distributed integrity system with a Research Code baseline, the Ofis/RIS directory, institutional referents and separate biomedical ethics, data, IP, security and open-science boundaries. RIS means referent a l'integrite scientifique, equivalent to a research integrity officer/RIO; Ofis is the French Office for Research Integrity inside Hceres.",
      nationalRoute:
        "Paris-Saclay appears in the French RIS model: Research Code Articles D211-2, D211-3 and D211-4 create the national statutory route, the Ofis directory and national charter framework identify referents, and case handling remains institution-level unless a separate national or boundary route is triggered. No Paris-Saclay public signalement archive was located.",
      institutionalRoute:
        "Paris-Saclay is represented through POLETHIS and the network of scientific-integrity referents, which exchange practice, advise on breaches and confidentially instruct reported scientific-integrity matters. The CER-PS ethics committee is retained as a research-ethics boundary route.",
      committeeOrOffice: "POLETHIS; network of scientific-integrity referents; CER-PS as ethics-review boundary",
      procedureSummary:
        "The POLETHIS scientific-integrity network page states that referents advise on and instruct matters concerning breaches of scientific integrity in confidence; the doctoral problems page points suspected ethics/integrity breaches to those referents. Ofis lists Paris-Saclay in the national RIS directory. The CER-PS functioning document supports research-ethics review activity and confidentiality, not misconduct publication.",
      publicOutputSummary:
        "No Paris-Saclay public institutional misconduct case-output archive, annual RIS activity report, signalement statistics page or anonymized decision channel was identified in the 30 July 2026 retest. The CER-PS document mentions public activity reporting for ethics review, but that is boundary evidence rather than misconduct-output evidence.",
      transparencySummary:
        "Route and network evidence are present, but this should not be scored as case-output transparency. CER-PS visibility should be kept as ethics-review transparency unless a source connects it to scientific-misconduct handling.",
      sourceCoverage: {
        institutionalProcedure: "available",
        committeePage: "available",
        annualReportOrCaseOutput: "none located; CER-PS ethics output is boundary material",
        sourceRegistryLinks: 2
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
          label: "French Research Code scientific-integrity articles D211-2 to D211-4",
          url: "https://www.legifrance.gouv.fr/codes/section_lc/LEGITEXT000006071190/LEGISCTA000048770016/",
          type: "Research Code",
          supports: "national statutory route for scientific-integrity duties",
          note: "National or sector route source added from member validation."
        },
        {
          label: "Ofis RIS directory",
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
      tags: ["RIS network", "ethics-integrity", "POLETHIS", "Ofis", "procedure only"],
      caveats: [
        "No Paris-Saclay public misconduct output channel was identified in this pass.",
        "CER-PS ethics review and doctoral-conflict routes are boundary/support routes unless a source explicitly connects them to misconduct handling.",
        "Do not reproduce personal contact details from RIS directory or POLETHIS pages.",
        "Do not infer absence of Paris-Saclay cases from the absence of a public output channel."
      ],
      reportNotes: [
        "Batch 5 upgraded Paris-Saclay to Detailed seed as a procedure-only/no-output audit profile: POLETHIS/RIS route evidence is strong enough for a complete route profile, but public-output evidence remains unlocated.",
        "Source-current verification on 30 July 2026 retained the procedure-only category: the POLETHIS/RIS route remains current, targeted French-language output searches found no local RIS activity or case-output channel, and CER-PS activity reporting remains an ethics-review boundary."
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
      validationStatus: "Updated with Sorbonne member validation on restricted case reporting",
      transparencyCategory: "Visible annual statement; case-level reporting restricted/internal",
      nationalRoute:
        "Sorbonne sits in the French RIS model: Research Code Articles D211-2, D211-3 and D211-4 create the national statutory route, institutions appoint RIS (referents a l'integrite scientifique/RIOs), and Ofis inside Hceres coordinates the national system without becoming the local first-instance case board.",
      institutionalRoute:
        "Sorbonne University is represented through a RIS-led scientific-integrity delegation, integrity committee and ambassador network. RIS means referent a l'integrite scientifique, equivalent to a research integrity officer/RIO.",
      committeeOrOffice: "Scientific-integrity delegation, RIS/RIO, integrity committee and ambassador network",
      procedureSummary:
        "RIS delegation and signalement procedure examples are present. Ofis means Office francais de l'integrite scientifique and is a department of Hceres, the Haut conseil a l'evaluation de la recherche et de l'enseignement superieur.",
      publicOutputSummary:
        "A visible Sorbonne annual statement/reporting source is present, but member validation indicates that reporting for the studied cases appears internal or available only through restricted access, including where release depends on university presidency acceptance.",
      transparencySummary:
        "Read Sorbonne as a visible annual-statement route plus restricted/internal case-level reporting, not as a public case-output archive.",
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
          label: "French Research Code scientific-integrity articles D211-2 to D211-4",
          url: "https://www.legifrance.gouv.fr/codes/section_lc/LEGITEXT000006071190/LEGISCTA000048770016/",
          type: "Research Code",
          supports: "national statutory route for scientific-integrity duties",
          note: "National or sector route source added from member validation."
        },
        {
          label: "Ofis: French Office for Research Integrity",
          url: "https://www.ofis-france.fr/en",
          type: "national office",
          supports: "Ofis terminology and national coordination context",
          note: "Ofis is the French Office for Research Integrity; use as national coordination context, not as a local case board."
        },
        {
          label: "Hceres about us",
          url: "https://www.hceres.fr/en/about-us",
          type: "national authority context",
          supports: "Hceres institutional context for Ofis",
          note: "Hceres is the national evaluation council that hosts Ofis as a department."
        },
        {
          label: "Sorbonne University 2025 integrity annual report",
          url: "https://www.sorbonne-universite.fr/sites/default/files/media/2025-12/integrite_scientifique_rapport_activite_2025.pdf",
          type: "annual report",
          supports: "annual activity and signalement evidence",
          note: "Supports visible annual-statement/reporting evidence, but not public release of the studied case files."
        },
        {
          label: "RESINT/Ofis manual for handling scientific-integrity signalements",
          url: "https://www.ofis-france.fr/traitement-des-signalements-relatifs-a-lintegrite-scientifique-manuel-de-procedure",
          type: "procedure manual",
          supports: "procedure guidance for handling scientific-integrity signalements",
          note: "Manual edited by RESINT and published by Ofis; added from member validation."
        },
        {
          label: "Sorbonne University CER",
          url: "https://cer.sorbonne-universite.fr",
          type: "boundary route",
          supports: "non-interventional human-subject research ethics review",
          note: "Research ethics boundary route for non-interventional human-subject protocols; keep separate from RIS misconduct handling."
        }
      ],
      tags: ["RIS", "RIO", "annual statement", "restricted reporting", "signalement", "Ofis", "RESINT", "CER boundary"],
      caveats: [
        "The visible annual statement/reporting source should not be treated as a public case-file archive.",
        "Member validation indicates case-level reporting for the studied files appears internal or restricted-access.",
        "CPP/CNRIPH, CER and CEEA routes are adjacent ethics routes unless a public source explicitly connects them to RIS misconduct handling."
      ],
      reportNotes: [
        "Updated on 29 June 2026 from Sorbonne member validation: Sorbonne remains visible through an annual statement/reporting route, but case-level reporting is coded as internal or restricted-access."
      ],
      nextFollowUp:
        "Keep Sorbonne in the restricted/internal reporting group unless a public case-level decision, case-summary channel or explicitly public aggregate case table is identified."
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
      validationStatus: "Source-current checked 30 July 2026; needs member validation of Strasbourg output-negative finding",
      evidenceLevel: "Moderate",
      transparencyCategory: "Scientific-integrity referent route",
      countrySystemSummary:
        "France is a legally codified, institutionally executed and nationally coordinated network: Research Code Articles D211-2, D211-3 and D211-4 form the statutory scientific-integrity route; institutions appoint RIS (referents a l'integrite scientifique/RIOs), while Ofis inside Hceres coordinates and observes the national system and boundary regimes remain separate.",
      nationalRoute:
        "Strasbourg sits in the French RIS model. Ofis records the institution and the national 2022-2023 synthesis includes Strasbourg among responding establishments, but those national outputs should not be treated as a Strasbourg local case-output archive. Ofis means Office francais de l'integrite scientifique and is a department of Hceres.",
      institutionalRoute:
        "Strasbourg identifies a scientific-integrity referent who promotes and applies the university research deontology charter, receives and processes reports of non-compliance with scientific-integrity rules, and represents the university to Ofis and LERU on scientific integrity.",
      committeeOrOffice: "Referent for scientific integrity",
      procedureSummary:
        "The referent page describes examples such as plagiarism, inappropriate manipulation or fabrication of data, authorship conflicts and undeclared conflicts of interest. The route verifies reports, opens an inquiry where needed, may seek expert advice, conducts adversarial instruction and submits recommendations to the university president for decision. Ofis confirms Strasbourg as a charter-signatory RIS institution; the university's ethics/deontology hub, HRS4R and doctoral pages are prevention or boundary context.",
      publicOutputSummary:
        "No Strasbourg-owned public RIS annual activity report, local signalement statistics page, anonymized case-summary channel or public decision archive was identified in the 30 July 2026 retest. The Ofis 2022-2023 national synthesis is national/sector-level context and notes establishment reporting, but it is not a Strasbourg local output channel.",
      transparencySummary:
        "Detailed RIS route/no-local-output audit seed: the scientific-integrity referent route is visible and procedurally described, but public evidence remains route/procedure evidence plus national Ofis context rather than local public-output evidence.",
      sourceCoverage: {
        institutionalProcedure: "available",
        committeePage: "available",
        annualReportOrCaseOutput: "none located locally; national Ofis synthesis context only",
        sourceRegistryLinks: 2
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
          label: "University of Strasbourg HREIR label page",
          url: "https://www.unistra.fr/fr/universite/labels/label-hr-excellence-research-hreir",
          type: "strategy context",
          supports: "scientific-integrity referent as an institutional action",
          note: "Current destination of the former HRS4R URL; use as prevention/strategy context, not as a case-handling source."
        },
        {
          label: "University of Strasbourg doctoral preparation page",
          url: "https://www.unistra.fr/fr/recherche/doctorat/se-preparer-aux-etudes-doctorales",
          type: "training and charter route",
          supports: "doctoral engagement with research deontology and integrity training",
          note: "Training/doctoral source; not misconduct adjudication."
        },
        {
          label: "French Research Code scientific-integrity articles D211-2 to D211-4",
          url: "https://www.legifrance.gouv.fr/codes/section_lc/LEGITEXT000006071190/LEGISCTA000048770016/",
          type: "Research Code",
          supports: "national statutory route for scientific-integrity duties",
          note: "National or sector route source added from member validation."
        },
        {
          label: "Ofis RIS directory entry for University of Strasbourg",
          url: "https://www.ofis-france.fr/ris/universite-de-strasbourg/",
          type: "national directory",
          supports: "French RIS status and charter-signatory context",
          note: "Use only for institutional RIS/directory context; do not reproduce personal contact details."
        },
        {
          label: "Ofis 2022-2023 synthesis on treatment of scientific-integrity breaches",
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
        "Ofis national synthesis material should not be coded as Strasbourg local output unless it gives Strasbourg-specific counts, cases or activity details.",
        "Do not reproduce personal contact details from the referent or Ofis pages.",
        "Do not infer absence of Strasbourg cases from the absence of a public output channel."
      ],
      reportNotes: [
        "Batch 4 upgraded Strasbourg to Detailed seed as a RIS route/no-local-output audit profile; the Ofis synthesis remains national context only.",
        "Source-current verification on 30 July 2026 retained the national-or-sector-output category, confirmed the referent route and moved the renamed HRS4R strategy citation to its current HREIR destination; no Strasbourg-owned output was located."
      ],
      nextFollowUp:
        "Validate whether Strasbourg publishes annual RIS activity statistics, anonymized case summaries or a non-personal procedure document beyond the referent page and national Ofis context.",
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
          label: "ETH Zurich good scientific practice",
          url: "https://ethz.ch/en/research/ethics-and-animal-welfare/research-integrity/gute-wissenschaftliche-praxis.html",
          type: "institutional good-practice page",
          supports: "good scientific practice, support bodies and prevention route",
          note: "Added from the Switzerland country dossier as the local good-practice source."
        },
        {
          label: "ETH Zurich new misconduct procedure",
          url: "https://ethz.ch/staffnet/en/news-and-events/internal-news/archive/2024/02/new-rules-of-procedure-to-address-scientific-misconduct-are-adopted.html",
          type: "institutional procedure update",
          supports: "new rules of procedure for addressing scientific misconduct",
          note: "Added from the Switzerland country dossier as a procedure-currentness source."
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
      profileStatus: "Member-validated procedure-only/no-output profile",
      validationStatus: "Updated with UZH member validation on route, office role and public reporting",
      evidenceLevel: "Strong",
      transparencyCategory: "Three-instance procedure route",
      countrySystemSummary:
        "Switzerland is represented as a fragmented cantonal, institutional and funder-linked integrity system, now with SCCSI as a national reporting, advisory and monitoring layer but without a national public misconduct case tribunal. ETH Zurich has institution-specific public output; UZH must be treated separately.",
      nationalRoute:
        "UZH sits inside the Swiss institution-first model. Its Integrity Ordinance is cantonal legislation that defines the local procedure, scientific misconduct and possible measures. SCCSI provides national reporting, advice and monitoring, while the Swiss Academies' code supplies national framework context; neither is a UZH case-reporting route.",
      institutionalRoute:
        "UZH's Integrity Ordinance defines three procedural instances. Ombudspersons receive reports and conduct preliminary inquiries; where the allegations may be substantiated, they inform the Executive Board. The Research Integrity Delegate then investigates on behalf of the Executive Board, which decides how to close the proceeding and which measures to take.",
      committeeOrOffice:
        "Procedural bodies: Ombudspersons and deputies; Research Integrity Delegate and deputy; Executive Board. Supporting office: Research Integrity Coordination Office, which supports investigations and handles general inquiries but is not a separate procedural body under the Integrity Ordinance.",
      procedureSummary:
        "The current UZH research-integrity page gives the complete three-instance route and links the Integrity Ordinance. A confidential online form sends case-specific consultation requests and reports of suspected misconduct to the ombudspersons; the Coordination Office is a general-inquiry and investigation-support route, not a case-reporting body. UZH authorship guidance primarily supports good research practice and can also provide a rule base in authorship-misconduct investigations.",
      publicOutputCategoryNote:
        "The legal framework, procedure and contextual news evidence are public, but UZH member validation received on 13 July 2026 confirms that no aggregate statistics, annual integrity report, anonymized case-summary series or public decision archive is currently available.",
      publicOutputSummary:
        "UZH member validation received on 13 July 2026 confirms that no public misconduct case-reporting channel, anonymized decision archive, annual integrity report or aggregate integrity-statistics page is currently available. The UZH annual-report hub and official news are contextual sources, not standing misconduct-output channels.",
      transparencySummary:
        "The legal framework and procedure are public, but UZH does not currently publish standing public case output. This does not imply absence of cases or internal reporting. UZH should not be confused with ETH Zurich, whose separate institutional report tables are stronger public-output evidence.",
      sourceCoverage: {
        institutionalProcedure: "available",
        committeePage: "available",
        annualReportOrCaseOutput: "none located; official news contextual only",
        sourceRegistryLinks: 4
      },
      committeeCodeSource: {
        label: "UZH Integrity Ordinance",
        url: "https://www.zhlex.zh.ch/Erlass.html?Open=&Ordnr=415.27",
        type: "cantonal regulation",
        supports: "local procedure, definition of scientific misconduct and possible measures",
        note: "Official Canton of Zurich legislation page, available in German. This is the institution-specific legal and procedural baseline; the Swiss Code of Conduct remains national context."
      },
      sourceLinks: [
        {
          label: "UZH research integrity",
          url: "https://www.research.uzh.ch/en/procedures/integrity.html",
          type: "official",
          supports: "institutional three-instance route",
          note: "Shows the ombudspersons, Research Integrity Delegate and Executive Board route, the confidential reporting form and the supporting role of the Coordination Office."
        },
        {
          label: "UZH Integrity Ordinance",
          url: "https://www.zhlex.zh.ch/Erlass.html?Open=&Ordnr=415.27",
          type: "regulation",
          supports: "cantonal legal basis for the UZH integrity procedure",
          note: "Official Canton of Zurich legislation page in German; defines scientific misconduct, the procedure and possible measures."
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
          supports: "ombudsperson, delegate and supporting-office directory",
          note: "Lists the ombudspersons, Research Integrity Delegates and Coordination Office staff. The Coordination Office handles general inquiries and supports investigations; it is not a separate procedural body."
        },
        {
          label: "UZH confidential ombudsperson contact form",
          url: "https://www.research.uzh.ch/en/procedures/integrity/kontakt_vertrauensperson.html",
          type: "confidential reporting route",
          supports: "case-specific consultation and suspected-misconduct reports",
          note: "Online form directed to the ombudspersons and deputies; personal contact details are not reproduced in the profile."
        },
        {
          label: "UZH annual report hub",
          url: "https://www.uzh.ch/en/explore/portrait/annualreport.html",
          type: "annual report hub",
          supports: "institutional annual-report location",
          note: "The hub includes the 2025 report, but UZH member validation confirms that it is not currently a standing research-misconduct output channel."
        },
        {
          label: "UZH news: Researchers Who Cheat",
          url: "https://www.news.uzh.ch/en/articles/news/2023/integrity-scientific.html",
          type: "official context",
          supports: "procedure context and limited aggregate reference",
          note: "Use only as contextual evidence for the procedure and limited aggregate references; it is not a recurring output channel."
        }
      ],
      tags: ["member validated", "ombudsperson", "Research Integrity Delegate", "procedure only", "cantonal ordinance", "Swiss institutional route", "2027 revision watch"],
      caveats: [
        "UZH member validation confirms that no public aggregate statistics, annual integrity reporting, anonymized case summaries or decision archive is currently available.",
        "Do not generalize ETH Zurich's anonymized report tables to UZH.",
        "Do not reproduce personal contact details from UZH role/person pages.",
        "Treat UZH news references as contextual only, not as a standing annual-statistics or case-publication corridor.",
        "Do not infer absence of UZH cases from the absence of a public output channel.",
        "UZH reports that its Integrity Ordinance is under substantial revision, with changed procedures, responsible bodies, responsibilities and website URLs planned for early 2027; the current profile and links must be rechecked when the revised ordinance enters force."
      ],
      reportNotes: [
        "Updated on 13 July 2026 from UZH member validation: clarified the cantonal legal basis, the three-instance sequence, the Coordination Office's supporting role, the confidential ombudsperson form, the no-public-output finding and the planned early-2027 revision."
      ],
      nextFollowUp:
        "Recheck the Integrity Ordinance, procedural bodies, responsibilities and all UZH integrity URLs when the planned revised ordinance is expected to enter force in early 2027; also check whether the replacement site introduces public aggregate reporting.",
      memberValidationQuestions: []
    })
  ];
})();
