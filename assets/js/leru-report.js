(function () {
  const metadata = window.LERU_MEMBER_METADATA || {};
  const records = Array.isArray(window.LERU_MEMBER_DATA) ? window.LERU_MEMBER_DATA : [];

  const elements = {
    printButton: document.getElementById("print-report"),
    caveatText: document.getElementById("report-caveat-text"),
    sourceLine: document.getElementById("report-source-line"),
    kpis: document.getElementById("report-kpis"),
    executiveSummary: document.getElementById("executive-summary-text"),
    typologyList: document.getElementById("typology-list"),
    patternList: document.getElementById("pattern-list"),
    gapList: document.getElementById("gap-list"),
    matrixBody: document.getElementById("matrix-body"),
    profileList: document.getElementById("profile-list"),
    findingsList: document.getElementById("findings-list"),
    validationAgenda: document.getElementById("validation-agenda")
  };

  function ensureArray(value) {
    return Array.isArray(value) ? value : [];
  }

  function hasText(value) {
    return Boolean(String(value || "").trim());
  }

  function text(value, fallback) {
    return hasText(value) ? String(value) : fallback || "Not yet extracted.";
  }

  function createElement(tagName, className, value) {
    const element = document.createElement(tagName);
    if (className) element.className = className;
    if (value !== undefined && value !== null) element.textContent = value;
    return element;
  }

  function createLink(label, href, className) {
    const anchor = createElement("a", className, label || href || "Link");
    anchor.href = href || "#";
    if (/^https?:\/\//i.test(href || "")) {
      anchor.target = "_blank";
      anchor.rel = "noreferrer";
    }
    return anchor;
  }

  function appendList(parent, items, emptyText) {
    const list = createElement("ul", "");
    const normalized = ensureArray(items).filter(hasText);
    if (!normalized.length) {
      list.appendChild(createElement("li", "", emptyText || "Not yet extracted."));
    } else {
      normalized.forEach((item) => list.appendChild(createElement("li", "", item)));
    }
    parent.appendChild(list);
  }

  function appendParagraph(parent, value, fallback) {
    parent.appendChild(createElement("p", "", text(value, fallback)));
  }

  function countBy(predicate) {
    return records.filter(predicate).length;
  }

  const publicOutputCategoryLabels = {
    "local-output": "Local output",
    "national-or-sector-output": "National/sector output",
    "procedure-only": "Procedure only",
    "restricted-or-internal-output": "Restricted/internal output",
    "historical-or-case-specific": "Historical/case-specific",
    "boundary-only": "Boundary only",
    unclear: "Unclear"
  };

  const publicOutputCategoryDefinitions = {
    "local-output": {
      explanation:
        "Institution-owned annual reports, aggregate statistics, anonymized summaries, report tables or decision/public-case corridors are visible.",
      caveat:
        "Local output is still usually summarized or anonymized; it should not be treated as a full case-file archive unless the source clearly functions that way."
    },
    "national-or-sector-output": {
      explanation:
        "Public output is visible through a national, regional or sector-level body rather than a clearly institution-owned output channel.",
      caveat:
        "National or sector output should not be read as local institutional reporting unless it gives institution-specific counts, summaries or decisions."
    },
    "procedure-only": {
      explanation:
        "The institution has public route or procedure evidence, but no local public annual-report, aggregate-statistics or anonymized-output channel was identified in this pass.",
      caveat:
        "Procedure-only visibility should not be interpreted as absence of cases, concerns, investigations or internal reporting."
    },
    "restricted-or-internal-output": {
      explanation:
        "The located output appears restricted or internal, while public material mainly establishes the route, code, committee or governance context.",
      caveat:
        "Restricted/internal output may be important operationally but should not be presented as public transparency."
    },
    "historical-or-case-specific": {
      explanation:
        "Public material exists for a historical or case-complex-specific matter, but no current standing public-output channel was identified.",
      caveat:
        "Historical case-complex pages should not be generalized into a current recurring archive."
    },
    "boundary-only": {
      explanation:
        "Only adjacent governance evidence is visible, such as ethics approval, clinical, animal, data, quality, IP/open-science or research-security routes.",
      caveat:
        "Boundary material should remain separate unless a source explicitly connects it to research-misconduct handling."
    },
    unclear: {
      explanation:
        "The public-output model is not yet classified.",
      caveat:
        "This should be resolved before using the profile as a validation product."
    }
  };

  const publicOutputCategoryOrder = [
    "local-output",
    "national-or-sector-output",
    "procedure-only",
    "restricted-or-internal-output",
    "historical-or-case-specific",
    "boundary-only",
    "unclear"
  ];

  function getPublicOutputCategory(record) {
    return record.publicOutputCategory || "unclear";
  }

  function formatPublicOutputCategory(record) {
    const category = getPublicOutputCategory(record);
    const label = publicOutputCategoryLabels[category] || publicOutputCategoryLabels.unclear;
    return record.publicOutputCategoryNote ? `${label}: ${record.publicOutputCategoryNote}` : label;
  }

  function getSummary() {
    return {
      officialMembers: countBy((record) => record.officialLeruMember),
      detailedProfiles: countBy((record) => record.reportStatus === "Detailed seed"),
      partialProfiles: countBy((record) => record.reportStatus === "Partial seed"),
      seededProfiles: countBy((record) => ["Detailed seed", "Partial seed"].includes(record.reportStatus)),
      placeholders: countBy((record) => record.reportStatus === "Coverage placeholder"),
      procedureEvidence: countBy((record) => record.sourceCoverage && record.sourceCoverage.institutionalProcedure === "available"),
      publicOutputEvidence: countBy((record) => record.sourceCoverage && record.sourceCoverage.annualReportOrCaseOutput === "available"),
      localOutput: countBy((record) => getPublicOutputCategory(record) === "local-output"),
      nationalOrSectorOutput: countBy((record) => getPublicOutputCategory(record) === "national-or-sector-output"),
      procedureOnlyOutput: countBy((record) => getPublicOutputCategory(record) === "procedure-only"),
      restrictedOrInternalOutput: countBy((record) => getPublicOutputCategory(record) === "restricted-or-internal-output"),
      historicalOrCaseSpecificOutput: countBy((record) => getPublicOutputCategory(record) === "historical-or-case-specific"),
      boundaryOnlyOutput: countBy((record) => getPublicOutputCategory(record) === "boundary-only"),
      unclearOutput: countBy((record) => getPublicOutputCategory(record) === "unclear"),
      nonLocalOrNoStandingOutput: countBy((record) => getPublicOutputCategory(record) !== "local-output")
    };
  }

  function renderMetadata() {
    if (elements.caveatText) {
      elements.caveatText.textContent =
        metadata.caveat ||
        "This report is a working public-source draft. Institution-level details require member validation.";
    }

    if (elements.sourceLine) {
      const source = metadata.leruSource || {};
      const sourceText = source.url
        ? `Membership baseline: ${source.label || "LERU member page"} (${source.url}), accessed ${source.accessed || "not recorded"}.`
        : "Membership baseline source not recorded.";
      elements.sourceLine.textContent = sourceText;
    }
  }

  function renderKpis() {
    if (!elements.kpis) return;
    const summary = getSummary();
    const kpis = [
      ["Official LERU members", summary.officialMembers],
      ["Detailed profiles", summary.detailedProfiles],
      ["Partial profiles", summary.partialProfiles],
      ["Coverage placeholders", summary.placeholders],
      ["Institutional procedure evidence", summary.procedureEvidence],
      ["Public output evidence", summary.publicOutputEvidence],
      ["Local public output", summary.localOutput],
      ["National/sector output", summary.nationalOrSectorOutput],
      ["Procedure-only audits", summary.procedureOnlyOutput],
      ["Restricted/internal", summary.restrictedOrInternalOutput],
      ["Historical/case-specific", summary.historicalOrCaseSpecificOutput]
    ];

    elements.kpis.replaceChildren();
    kpis.forEach(([label, value]) => {
      const card = createElement("div", "report-kpi");
      card.append(createElement("strong", "", value), createElement("span", "", label));
      elements.kpis.appendChild(card);
    });
  }

  function getCategoryRecords(category) {
    return records
      .filter((record) => getPublicOutputCategory(record) === category)
      .sort((a, b) => String(a.institution || "").localeCompare(String(b.institution || "")));
  }

  function renderExecutiveSummary() {
    if (!elements.executiveSummary) return;
    const summary = getSummary();
    const paragraphs = [
      `This public-source pilot represents ${summary.officialMembers} official LERU member universities and maps the visible research-integrity routes, offices, committees, procedure documents and public-output signals identified in this pass. All ${summary.officialMembers} member profiles are now detailed public-source seeds, and all ${summary.procedureEvidence} have identifiable public institutional procedure or route evidence. That makes the current report useful as a validation tool: it gives LERU / INTE members a structured route map to confirm, correct or add to, while staying outside private member communications and unpublished case material.`,
      `The main finding is that procedure visibility is stronger and more consistent than public output visibility. Strict public-output evidence is currently recorded for ${summary.publicOutputEvidence} member profiles. The typology gives a more precise reading: ${summary.localOutput} profiles show institution-owned local output, ${summary.nationalOrSectorOutput} rely on national, regional or sector-level output, ${summary.procedureOnlyOutput} are procedure-visible but output-light, ${summary.restrictedOrInternalOutput} has restricted or internal output signals, and ${summary.historicalOrCaseSpecificOutput} is historical or case-specific rather than a standing output channel. These categories describe public-source visibility, not case incidence. Absence of public output should not be interpreted as absence of cases, concerns, investigations or internal reporting.`,
      "The report therefore treats annual statements, aggregate statistics, anonymized summaries, public case PDFs, national statements, restricted committee material and historical case-complex pages as different transparency signals. It also keeps boundary regimes separate: research ethics review, clinical governance, animal research, data protection, quality assurance, student discipline, IP/open science and research security are included only when useful for context and should not be collapsed into research-misconduct handling unless the source explicitly does so."
    ];
    elements.executiveSummary.replaceChildren();
    paragraphs.forEach((paragraph) => elements.executiveSummary.appendChild(createElement("p", "", paragraph)));
  }

  function renderTypology() {
    if (!elements.typologyList) return;
    elements.typologyList.replaceChildren();

    publicOutputCategoryOrder.forEach((category) => {
      const categoryRecords = getCategoryRecords(category);
      const definition = publicOutputCategoryDefinitions[category] || publicOutputCategoryDefinitions.unclear;
      const card = createElement("article", "typology-card");
      const header = createElement("div", "typology-card-header");
      header.append(
        createElement("h3", "", publicOutputCategoryLabels[category] || publicOutputCategoryLabels.unclear),
        createElement("strong", "typology-count", categoryRecords.length)
      );
      card.appendChild(header);
      card.appendChild(createElement("p", "typology-explanation", definition.explanation));
      const institutionText = categoryRecords.length
        ? categoryRecords.map((record) => record.institution || "Unnamed institution").join("; ")
        : "No institutions currently classified in this category.";
      card.appendChild(createElement("p", "typology-institutions", institutionText));
      card.appendChild(createElement("p", "typology-caveat", definition.caveat));
      elements.typologyList.appendChild(card);
    });
  }

  function renderPatternAndGapLists() {
    if (elements.patternList) {
      elements.patternList.replaceChildren();
      ensureArray(metadata.crossCuttingFindings).forEach((item) => {
        elements.patternList.appendChild(createElement("li", "", item));
      });
    }

    if (elements.gapList) {
      const placeholders = records
        .filter((record) => record.reportStatus === "Coverage placeholder")
        .map((record) => `${record.institution}: institutional extraction still needed.`);
      const noOutputCount = countBy(
        (record) => record.sourceCoverage && record.sourceCoverage.annualReportOrCaseOutput !== "available"
      );
      const gaps = [
        `${noOutputCount} members do not yet have public annual-report or case-output evidence in the LERU model.`,
        `${getSummary().nonLocalOrNoStandingOutput} members are coded as national/sector, restricted/internal, historical/case-specific or procedure-only rather than local standing output.`,
        "LERU INTE participation/status is not validated in this public-source dataset.",
        "Several records have route evidence but still need field-level annual-report or procedure extraction.",
        ...placeholders
      ];
      elements.gapList.replaceChildren();
      gaps.forEach((gap) => elements.gapList.appendChild(createElement("li", "", gap)));
    }
  }

  function createCell(value, fallback) {
    return createElement("td", "", text(value, fallback));
  }

  function renderMatrix() {
    if (!elements.matrixBody) return;
    elements.matrixBody.replaceChildren();

    records.forEach((record) => {
      const row = document.createElement("tr");
      row.append(
        createCell(record.institution),
        createCell(record.country),
        createCell(record.nationalRoute || record.countrySystemSummary),
        createCell(record.institutionalRoute),
        createCell(record.committeeOrOffice),
        createCell(record.procedureSummary || (record.sourceCoverage && record.sourceCoverage.institutionalProcedure)),
        createCell(record.publicOutputSummary || record.transparencySummary),
        createCell(formatPublicOutputCategory(record)),
        createCell(record.evidenceLevel),
        createCell(record.validationStatus),
        createCell(record.nextFollowUp)
      );
      elements.matrixBody.appendChild(row);
    });
  }

  function renderSourceList(record) {
    const list = createElement("ul", "source-list");
    const leruSource = record.leruSource || metadata.leruSource;
    if (leruSource && leruSource.url) {
      const item = document.createElement("li");
      item.appendChild(createLink(leruSource.label || "LERU member page", leruSource.url));
      item.appendChild(createElement("span", "source-note-text", ` Membership baseline, accessed ${leruSource.accessed || "not recorded"}.`));
      list.appendChild(item);
    }
    if (record.countryDossierLink) {
      const item = document.createElement("li");
      item.appendChild(createLink("Country dossier in main map", record.countryDossierLink));
      item.appendChild(createElement("span", "source-note-text", " Country-system context."));
      list.appendChild(item);
    }

    ensureArray(record.sourceLinks).forEach((source) => {
      const item = document.createElement("li");
      if (source.url) {
        item.appendChild(createLink(source.label || source.url, source.url));
      } else {
        item.appendChild(createElement("strong", "", source.label || "Source"));
      }
      const detail = [source.type, source.supports, source.note].filter(hasText).join(" | ");
      if (detail) item.appendChild(createElement("span", "source-note-text", ` ${detail}`));
      list.appendChild(item);
    });

    if (!list.children.length) {
      list.appendChild(createElement("li", "", "No source link recorded."));
    }
    return list;
  }

  function createProfileBlock(title, value, fallback, full) {
    const block = createElement("div", full ? "profile-block full" : "profile-block");
    block.appendChild(createElement("h4", "", title));
    appendParagraph(block, value, fallback);
    return block;
  }

  function renderProfile(record) {
    const card = createElement("article", "profile-card");
    const header = createElement("div", "profile-header");
    const titleGroup = document.createElement("div");
    titleGroup.appendChild(createElement("h3", "", record.institution || "Unnamed institution"));
    titleGroup.appendChild(
      createElement(
        "p",
        "profile-meta",
        [record.city, record.country, record.reportStatus, record.evidenceLevel].filter(hasText).join(" | ")
      )
    );

    const tagGroup = createElement("div", "profile-tags");
    [record.validationStatus, publicOutputCategoryLabels[getPublicOutputCategory(record)], record.transparencyCategory, record.profileStatus]
      .filter(hasText)
      .forEach((tag) => tagGroup.appendChild(createElement("span", "profile-tag", tag)));

    header.append(titleGroup, tagGroup);
    card.appendChild(header);

    const grid = createElement("div", "profile-grid");
    grid.append(
      createProfileBlock("Country-system context", record.countrySystemSummary),
      createProfileBlock("National route", record.nationalRoute),
      createProfileBlock("Institutional route", record.institutionalRoute),
      createProfileBlock("Committee / office", record.committeeOrOffice),
      createProfileBlock("Procedure summary", record.procedureSummary),
      createProfileBlock("Public output / transparency", record.publicOutputSummary || record.transparencySummary),
      createProfileBlock("Public-output category", formatPublicOutputCategory(record)),
      createProfileBlock("Next follow-up", record.nextFollowUp, "No follow-up recorded.", true)
    );

    const boundaryBlock = createElement("div", "profile-block full");
    boundaryBlock.appendChild(createElement("h4", "", "Boundary-regime notes"));
    appendList(boundaryBlock, ensureArray(record.boundaryRegimes), "No boundary regimes recorded.");
    grid.appendChild(boundaryBlock);

    const sourceBlock = createElement("div", "profile-block full");
    sourceBlock.appendChild(createElement("h4", "", "Source links"));
    sourceBlock.appendChild(renderSourceList(record));
    grid.appendChild(sourceBlock);

    const caveatBlock = createElement("div", "profile-block full");
    caveatBlock.appendChild(createElement("h4", "", "Caveats"));
    appendList(caveatBlock, ensureArray(record.caveats), "No record-specific caveat recorded.");
    grid.appendChild(caveatBlock);

    const questionBlock = createElement("div", "profile-block full");
    questionBlock.appendChild(createElement("h4", "", "Member-validation questions"));
    appendList(questionBlock, ensureArray(record.memberValidationQuestions), "No member-validation questions recorded.");
    grid.appendChild(questionBlock);

    if (ensureArray(record.reportNotes).length) {
      const notesBlock = createElement("div", "profile-block full");
      notesBlock.appendChild(createElement("h4", "", "Report notes"));
      appendList(notesBlock, ensureArray(record.reportNotes), "No report notes recorded.");
      grid.appendChild(notesBlock);
    }

    card.appendChild(grid);
    return card;
  }

  function renderProfiles() {
    if (!elements.profileList) return;
    elements.profileList.replaceChildren();
    records.forEach((record) => elements.profileList.appendChild(renderProfile(record)));
  }

  function renderList(element, items, emptyText) {
    if (!element) return;
    element.replaceChildren();
    const normalized = ensureArray(items).filter(hasText);
    if (!normalized.length) {
      element.appendChild(createElement("li", "", emptyText || "Not yet extracted."));
      return;
    }
    normalized.forEach((item) => element.appendChild(createElement("li", "", item)));
  }

  function bindPrint() {
    if (!elements.printButton) return;
    elements.printButton.addEventListener("click", () => {
      if (typeof window.print === "function") {
        window.print();
      }
    });
  }

  function init() {
    renderMetadata();
    renderKpis();
    renderExecutiveSummary();
    renderPatternAndGapLists();
    renderTypology();
    renderMatrix();
    renderProfiles();
    renderList(elements.findingsList, metadata.crossCuttingFindings, "No cross-cutting findings recorded.");
    renderList(elements.validationAgenda, metadata.validationAgenda, "No validation agenda recorded.");
    bindPrint();
  }

  init();
})();
