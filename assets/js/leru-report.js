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
    referenceList: document.getElementById("reference-list"),
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

  function friendlyText(value) {
    return String(value)
      .replace(/public-output/gi, "public reporting")
      .replace(/case-output/gi, "case reporting")
      .replace(/annual-statement/gi, "annual statement")
      .replace(/case-file/gi, "case file")
      .replace(/no-local-output/gi, "no local public reporting")
      .replace(/output-negative/gi, "no public reporting found")
      .replace(/\blocal output\b/gi, "local public reporting")
      .replace(/\bproject seed\b/gi, "project profile")
      .replace(/\bseed profile\b/gi, "profile")
      .replace(/\baudit seed\b/gi, "review profile")
      .replace(/\bDetailed seed\b/g, "Detailed profile")
      .replace(/\bmember validation\b/gi, "member review")
      .replace(/\bvalidation product\b/gi, "member-review product");
  }

  function createElement(tagName, className, value) {
    const element = document.createElement(tagName);
    if (className) element.className = className;
    if (value !== undefined && value !== null) element.textContent = friendlyText(value);
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
    "local-output": "Institution publishes its own public reporting",
    "national-or-sector-output": "Reporting is mainly national, regional or sector-level",
    "procedure-only": "Procedure is public, but no public reporting channel was found",
    "restricted-or-internal-output": "Reporting appears internal or access-restricted",
    "historical-or-case-specific": "Only historical or single-case public material was found",
    "boundary-only": "Only adjacent governance material was found",
    unclear: "Public reporting route still needs checking"
  };

  const publicOutputCategoryDefinitions = {
    "local-output": {
      explanation:
        "The institution itself publishes a visible annual statement, aggregate table, anonymized summary, decision page or other recurring public record about research-integrity handling.",
      caveat:
        "This is usually summarized or anonymized. It should not be read as a full case-file archive unless the source clearly functions that way."
    },
    "national-or-sector-output": {
      explanation:
        "The visible public record sits mainly with a national, regional or sector body, rather than with the institution's own website.",
      caveat:
        "This can be useful context, but it should not be treated as local institutional reporting unless it gives institution-specific counts, summaries or decisions."
    },
    "procedure-only": {
      explanation:
        "The public sources show where a concern would go and what procedure applies, but no public annual report, aggregate statistics, anonymized summary or decision page was found.",
      caveat:
        "This should not be interpreted as absence of cases, concerns, investigations or internal reporting."
    },
    "restricted-or-internal-output": {
      explanation:
        "The public sources show the route, code or committee, but the reporting itself appears to be internal or available only through restricted access.",
      caveat:
        "Internal reporting may be important operationally, but it should not be presented as public transparency."
    },
    "historical-or-case-specific": {
      explanation:
        "A historical case page or a specific case complex is public, but no current recurring public reporting route was found.",
      caveat:
        "Historical case material should not be generalized into a current recurring archive."
    },
    "boundary-only": {
      explanation:
        "The visible public material concerns adjacent governance, such as ethics approval, clinical trials, animal research, data protection, quality assurance, IP/open science or research security.",
      caveat:
        "These routes should remain separate unless a source explicitly connects them to research-misconduct handling."
    },
    unclear: {
      explanation:
        "The public reporting route has not yet been interpreted from the available public sources.",
      caveat:
        "This should be checked before the profile is used for member review."
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

  function getSummary() {
    return {
      officialMembers: countBy((record) => record.officialLeruMember),
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
      ["Institutions with a public procedure or route", summary.procedureEvidence],
      ["Institutions with public reporting found", summary.publicOutputEvidence],
      ["Institution-owned public reporting", summary.localOutput],
      ["National or sector-level reporting", summary.nationalOrSectorOutput],
      ["Procedure visible, no public reporting found", summary.procedureOnlyOutput],
      ["Internal or restricted reporting", summary.restrictedOrInternalOutput],
      ["Historical or single-case material", summary.historicalOrCaseSpecificOutput]
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
      `This report represents ${summary.officialMembers} official LERU member universities and maps the visible research-integrity routes, offices, committees, procedure documents and public reporting found in the public-source review. All ${summary.procedureEvidence} profiles have identifiable public institutional procedure or route evidence. That makes the report useful as a structured route map for LERU / INTE member review, while staying outside private member communications, personal contact lists and unpublished case material.`,
      `The main finding is that procedure visibility is stronger and more consistent than public reporting visibility. Public annual reports, case summaries, aggregate statistics or similar reporting were found for ${summary.publicOutputEvidence} member profiles. ${summary.localOutput} profiles show institution-owned public reporting, ${summary.nationalOrSectorOutput} rely mainly on national, regional or sector-level reporting, ${summary.procedureOnlyOutput} show a public procedure but no public reporting channel, ${summary.restrictedOrInternalOutput} appears to have internal or restricted reporting, and ${summary.historicalOrCaseSpecificOutput} is historical or single-case material rather than a standing reporting route. These groups describe public-source visibility, not how many cases or concerns an institution handles.`,
      "The report therefore treats annual statements, aggregate statistics, anonymized summaries, public case PDFs, national statements, restricted committee material and historical case pages as different transparency signals. It also keeps adjacent governance regimes separate: research ethics review, clinical governance, animal research, data protection, quality assurance, student discipline, IP/open science and research security are included for context and should not be folded into research-misconduct handling unless the source explicitly does so."
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
        : "No institutions currently in this group.";
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
      const noOutputCount = countBy(
        (record) => record.sourceCoverage && record.sourceCoverage.annualReportOrCaseOutput !== "available"
      );
      const gaps = [
        `${noOutputCount} members do not yet have public annual-report or case-output evidence in the LERU model.`,
        `${getSummary().nonLocalOrNoStandingOutput} members rely on national, sector, restricted, historical or procedure-only visibility rather than institution-owned standing public reporting.`,
        "LERU INTE participation still needs member confirmation.",
        "Several records have route evidence but still need field-level annual-report or procedure extraction.",
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
        createCell(record.nextFollowUp)
      );
      elements.matrixBody.appendChild(row);
    });
  }

  function sourceHaystack(source) {
    return [source.label, source.type, source.supports, source.note, source.url].filter(hasText).join(" ").toLowerCase();
  }

  function sourceTitleHaystack(source) {
    return [source.label, source.type, source.supports].filter(hasText).join(" ").toLowerCase();
  }

  function sourceLabelTypeHaystack(source) {
    return [source.label, source.type].filter(hasText).join(" ").toLowerCase();
  }

  function sourceKey(source) {
    return source ? `${source.url || ""}::${source.label || ""}` : "";
  }

  function sourceMatches(source, patterns) {
    const haystack = sourceHaystack(source);
    return patterns.some((pattern) => (pattern instanceof RegExp ? pattern.test(haystack) : haystack.includes(pattern)));
  }

  function sourceLabelTypeMatches(source, patterns) {
    const haystack = sourceLabelTypeHaystack(source);
    return patterns.some((pattern) => patternMatchesText(pattern, haystack));
  }

  function patternMatchesText(pattern, value) {
    return pattern instanceof RegExp ? pattern.test(value) : value.includes(pattern);
  }

  function findSource(record, patterns, preferredPatterns, rejectPatterns) {
    const matches = ensureArray(record.sourceLinks).filter(
      (source) => sourceMatches(source, patterns) && !sourceLabelTypeMatches(source, ensureArray(rejectPatterns))
    );
    if (!matches.length) return null;
    return matches
      .map((source) => {
        const haystack = sourceHaystack(source);
        const titleHaystack = sourceTitleHaystack(source);
        const score = ensureArray(preferredPatterns).reduce(
          (total, pattern) => total + (patternMatchesText(pattern, haystack) ? 10 : 0) + (patternMatchesText(pattern, titleHaystack) ? 20 : 0),
          source.url ? 1 : 0
        );
        return { source, score };
      })
      .sort((a, b) => b.score - a.score)[0].source;
  }

  function getCommitteeCodeSource(record) {
    if (record.committeeCodeSource) {
      return {
        source: record.committeeCodeSource,
        note: record.committeeCodeSource.note || "Committee- or institution-specific code source recorded for this profile."
      };
    }

    const localCodePatterns = [
      { pattern: /\bcode\b/, weight: 30 },
      { pattern: /\bconduct\b/, weight: 30 },
      { pattern: /good research practice/, weight: 30 },
      { pattern: /good scientific practice/, weight: 30 },
      { pattern: /responsible research/, weight: 30 },
      { pattern: /research integrity framework/, weight: 25 },
      { pattern: /integrity framework/, weight: 25 },
      { pattern: /guidelines?/, weight: 20 },
      { pattern: /policy/, weight: 20 },
      { pattern: /regulation/, weight: 10 },
      { pattern: /rules?/, weight: 10 }
    ];
    const rejectPatterns = [
      /annual report/,
      /annual statement/,
      /statistics/,
      /table/,
      /news item/,
      /case pdf/,
      /training/,
      /e-learning/,
      /boundary/
    ];
    const localCodeSource = ensureArray(record.sourceLinks)
      .filter((source) => {
        const title = sourceTitleHaystack(source);
        const labelType = sourceLabelTypeHaystack(source);
        return (
          localCodePatterns.some(({ pattern }) => patternMatchesText(pattern, title)) &&
          !rejectPatterns.some((pattern) => patternMatchesText(pattern, labelType))
        );
      })
      .map((source) => {
        const title = sourceTitleHaystack(source);
        const score = localCodePatterns.reduce(
          (total, { pattern, weight }) => total + (patternMatchesText(pattern, title) ? weight : 0),
          source.url ? 1 : 0
        );
        return { source, score };
      })
      .sort((a, b) => b.score - a.score)[0]?.source;

    if (localCodeSource) {
      return {
        source: localCodeSource,
        note: "This is the most specific public source in the profile that appears to state the code, policy, framework or conduct standard used by the local route."
      };
    }

    if (record.countryCodeSource) {
      return {
        source: record.countryCodeSource,
        note:
          "No committee-specific code reference was identified in the recorded local sources; this is the national or contextual code baseline for the country."
      };
    }

    return {
      source: null,
      note: ""
    };
  }

  function appendSourceLink(item, source) {
    if (source.url) {
      item.appendChild(createLink(source.label || source.url, source.url));
    } else {
      item.appendChild(createElement("strong", "", source.label || "Source"));
    }
  }

  function sourceDetail(source, noteOverride) {
    if (noteOverride) return noteOverride;
    return [source.supports, source.note].filter(hasText).join(" ");
  }

  function appendChecklistItem(list, title, source, missingText, noteOverride) {
    const item = document.createElement("li");
    item.appendChild(createElement("strong", "", `${title}: `));
    if (source) {
      appendSourceLink(item, source);
      const detail = sourceDetail(source, noteOverride);
      if (detail) item.appendChild(createElement("span", "source-note-text", ` ${detail}`));
    } else {
      item.appendChild(createElement("span", "source-note-text", missingText));
    }
    list.appendChild(item);
  }

  function appendOtherSource(list, source) {
    const item = document.createElement("li");
    appendSourceLink(item, source);
    const detail = [source.type, source.supports, source.note].filter(hasText).join(" | ");
    if (detail) item.appendChild(createElement("span", "source-note-text", ` ${detail}`));
    list.appendChild(item);
  }

  function suppressAnnualDocument(source, annualSource) {
    if (!annualSource || sourceKey(source) === sourceKey(annualSource)) return false;
    const annualIsHub = sourceMatches(annualSource, [/hub/, /archive/, /reports\b/, /statements\b/, /page/, /directory/]);
    return annualIsHub && sourceMatches(source, [/annual report/, /annual statement/, /annual statistics/, /annual\/research report/]);
  }

  function renderSourceList(record) {
    const container = createElement("div", "source-list-wrap");
    const checklist = createElement("ul", "source-list source-checklist");
    const sources = ensureArray(record.sourceLinks);

    const mainRouteSource = findSource(
      record,
      [/committee page/, /procedure page/, /procedure/, /research integrity/, /scientific-integrity/, /scientific integrity/, /good research practice/, /integrity/, /official/, /route/, /misconduct/],
      [/committee page/, /procedure page/, /research integrity/, /scientific-integrity/, /scientific integrity/, /procedure/, /ombuds/, /referent/, /official/],
      [/annual report/, /annual statement/, /annual-stat/, /statistics table/, /report table/, /research integrity reports/]
    );
    const regulationSource = findSource(
      record,
      [/regulation/, /rules?/, /procedure/, /policy/, /guidelines?/, /complaints?/, /misconduct/],
      [/regulation/, /rules?/, /procedure/, /guidelines?/],
      [/annual report/, /annual statement/, /statistics/, /table/, /news item/]
    );
    const ruleBasisSource =
      findSource(
        record,
        [/code/, /framework/, /concordat/, /guidelines?/, /good research practice/, /good scientific practice/, /tenk/, /dfg/, /policy/],
        [/code/, /framework/, /concordat/, /guidelines?/, /good research practice/, /good scientific practice/],
        [/annual report/, /annual statement/, /statistics/, /table/, /news item/]
      ) || regulationSource;
    const annualSource = findSource(
      record,
      [/annual report/, /annual reports/, /annual statement/, /annual-statement/, /annual statements/, /annual reviews/, /annual statistics/, /research integrity reports/],
      [/hub/, /archive/, /reports\b/, /statements\b/, /annual reviews/, /page/, /directory/]
    );
    const caseSource = findSource(
      record,
      [/case repository/, /public decisions?/, /case pdf/, /case publication/, /case-publication/, /advice and final judgments/, /anonymized investigation reports/, /statement summaries/, /recommendation/, /decision archive/],
      [/repository/, /public decisions?/, /archive/, /judgments/, /table/, /summaries/]
    );
    const committeeCode = getCommitteeCodeSource(record);
    const countryDossierSource = record.countryDossierLink
      ? {
          label: "Full country dossier in main map",
          url: record.countryDossierLink,
          supports: "Country-system context for interpreting the institutional route."
        }
      : null;

    appendChecklistItem(
      checklist,
      "Main research-integrity committee or route page",
      mainRouteSource,
      "No dedicated public committee or route page was identified in the recorded sources."
    );
    appendChecklistItem(
      checklist,
      "Full dossier in the map",
      countryDossierSource,
      "No country dossier link is recorded for this profile."
    );
    appendChecklistItem(
      checklist,
      "Regulation or procedure",
      regulationSource,
      "No public regulation or procedure source is recorded for this profile."
    );
    appendChecklistItem(
      checklist,
      "Rule basis",
      ruleBasisSource,
      "No separate code, framework or rule-basis source is recorded for this profile.",
      ruleBasisSource && regulationSource && sourceKey(ruleBasisSource) === sourceKey(regulationSource)
        ? "The same public source currently functions as both the procedure and the rule basis in this profile."
        : ""
    );
    appendChecklistItem(
      checklist,
      "Code or standard used by this route",
      committeeCode.source,
      "No committee-specific code, conduct standard, policy or national/contextual fallback source is recorded for this profile.",
      committeeCode.note
    );
    appendChecklistItem(
      checklist,
      "Annual-report location",
      annualSource,
      "No public annual-report or annual-statistics location was identified in the recorded sources."
    );
    appendChecklistItem(
      checklist,
      "Case repository or public decisions",
      caseSource,
      "No standing public case repository, public-decision page or anonymized case-publication location was identified in the recorded sources."
    );

    container.appendChild(
      createElement(
        "p",
        "source-intro",
        "The same source checklist is used for every institution so member reviewers can see whether a route page, country dossier, rule basis, the code or standard used by the local route, annual-report location and case-publication location have been found."
      )
    );
    container.appendChild(checklist);

    const used = new Set([mainRouteSource, regulationSource, ruleBasisSource, committeeCode.source, annualSource, caseSource].filter(Boolean).map(sourceKey));
    const otherSources = sources.filter((source) => !used.has(sourceKey(source)) && !suppressAnnualDocument(source, annualSource));
    if (otherSources.length) {
      container.appendChild(createElement("h5", "", "Other useful public sources"));
      const otherList = createElement("ul", "source-list");
      otherSources.forEach((source) => appendOtherSource(otherList, source));
      container.appendChild(otherList);
    }

    return container;
  }

  function createProfileBlock(title, value, fallback, full) {
    const block = createElement("div", full ? "profile-block full" : "profile-block");
    block.appendChild(createElement("h4", "", title));
    appendParagraph(block, value, fallback);
    return block;
  }

  function joinReadableList(items) {
    const normalized = ensureArray(items).filter(hasText);
    if (!normalized.length) return "";
    if (normalized.length === 1) return normalized[0];
    if (normalized.length === 2) return `${normalized[0]} and ${normalized[1]}`;
    return `${normalized.slice(0, -1).join(", ")} and ${normalized[normalized.length - 1]}`;
  }

  function getPublicReportingInterpretation(record) {
    const category = getPublicOutputCategory(record);
    const definition = publicOutputCategoryDefinitions[category] || publicOutputCategoryDefinitions.unclear;
    const note = hasText(record.publicOutputCategoryNote) ? ` For this institution, the current public-source note is: ${record.publicOutputCategoryNote}` : "";
    return `${definition.explanation} ${definition.caveat}${note}`;
  }

  function getYearReferences(record) {
    const allText = [
      record.procedureSummary,
      record.publicOutputSummary,
      record.transparencySummary,
      ...ensureArray(record.sourceLinks).flatMap((source) => [source.label, source.supports, source.note])
    ]
      .filter(hasText)
      .join(" ");
    const matches = allText.match(/\b(?:19|20)\d{2}(?:[-/](?:\d{2}|(?:19|20)\d{2}))?\b/g) || [];
    return Array.from(new Set(matches)).slice(0, 8);
  }

  function getCommitteeHistory(record) {
    const route = text(record.committeeOrOffice || record.institutionalRoute, "the local research-integrity route");
    const years = getYearReferences(record);
    const yearSentence = years.length
      ? `Dated public material in this profile includes ${joinReadableList(years)}.`
      : "No founding date, long-run activity series or cumulative case total is visible in the recorded public sources.";
    const activity = text(
      record.publicOutputSummary || record.transparencySummary,
      "The recorded public sources do not yet describe public activity, case counts or case types for this route."
    );
    return `The public source set currently identifies ${route}. ${yearSentence} The activity picture visible from public sources is: ${activity} Where founding dates, cumulative case totals, allegation types or outcomes are not stated in public sources, those points remain for member review.`;
  }

  function getComparativeInterest(record) {
    switch (getPublicOutputCategory(record)) {
      case "local-output":
        return "This profile is comparatively useful because the institution itself publishes some public reporting. That makes it easier to compare route design, annual accountability and anonymization practice with members where only procedure pages are public.";
      case "national-or-sector-output":
        return "This profile is interesting because public accountability is visible mainly through a national, regional or sector route. It helps show where institution-level comparison needs country-system context before drawing conclusions about local transparency.";
      case "procedure-only":
        return "This profile is mainly useful as a route-visibility example. It shows how a committee, office or procedure can be public even when annual case reporting, anonymized summaries or public decisions are not visible.";
      case "restricted-or-internal-output":
        return "This profile is useful for comparing public and internal accountability boundaries. The route is visible, but the public sources suggest that some committee material or reporting is not openly accessible.";
      case "historical-or-case-specific":
        return "This profile is useful as a reminder that a visible historical case does not necessarily mean there is a standing public reporting route today. It should be read differently from annual-report or decision-archive examples.";
      case "boundary-only":
        return "This profile is mainly useful for showing how adjacent governance can be much more visible than research-misconduct handling. Those records may matter for context, but they should not be counted as general misconduct reporting.";
      default:
        return "This profile still needs interpretation before it can support comparison. The main review question is which public reporting route, if any, should be used for this institution.";
    }
  }

  function getBoundaryExplanation(record) {
    const regimes = ensureArray(record.boundaryRegimes).filter(hasText);
    if (!regimes.length) {
      return "No adjacent governance routes were recorded for this institution profile. That does not mean such routes are absent; it only means they were not part of the current public-source profile.";
    }
    return `Adjacent governance routes can produce public records that look relevant but answer a different question from research-misconduct handling. For this profile, the routes to keep separate are ${joinReadableList(regimes)}. They should be treated as context unless a public source explicitly connects them to the research-integrity complaint or misconduct route.`;
  }

  function isGenericValidationQuestion(value) {
    const normalized = String(value || "").toLowerCase();
    return (
      normalized.includes("correct public office, committee or procedure route") ||
      normalized.includes("public annual report, case-output channel or aggregate reporting route") ||
      normalized.includes("internal routes that should be acknowledged") ||
      normalized.includes("which boundary regimes should be shown separately") ||
      normalized.includes("preferred non-personal validation pathway")
    );
  }

  function getSpecificValidationQuestions(record) {
    return ensureArray(record.memberValidationQuestions).filter((item) => hasText(item) && !isGenericValidationQuestion(item));
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
        [record.city, record.country].filter(hasText).join(", ")
      )
    );

    header.appendChild(titleGroup);
    card.appendChild(header);

    const grid = createElement("div", "profile-grid");
    grid.append(
      createProfileBlock("Why the national context matters", record.countrySystemSummary),
      createProfileBlock("National or sector route", record.nationalRoute),
      createProfileBlock("Where a concern appears to start locally", record.institutionalRoute),
      createProfileBlock("Committee, office or named route", record.committeeOrOffice),
      createProfileBlock("What the public procedure says", record.procedureSummary),
      createProfileBlock("What is publicly reported", record.publicOutputSummary || record.transparencySummary),
      createProfileBlock("How to interpret the public reporting", getPublicReportingInterpretation(record), "", true),
      createProfileBlock("Committee history and public activity", getCommitteeHistory(record), "", true),
      createProfileBlock("Why this route is useful for comparison", getComparativeInterest(record), "", true)
    );

    const boundaryBlock = createElement("div", "profile-block full");
    boundaryBlock.appendChild(createElement("h4", "", "Adjacent governance to keep separate"));
    appendParagraph(boundaryBlock, getBoundaryExplanation(record));
    grid.appendChild(boundaryBlock);

    const sourceBlock = createElement("div", "profile-block full");
    sourceBlock.appendChild(createElement("h4", "", "Source checklist and other public links"));
    sourceBlock.appendChild(renderSourceList(record));
    grid.appendChild(sourceBlock);

    const specificQuestions = getSpecificValidationQuestions(record);
    if (specificQuestions.length) {
      const questionBlock = createElement("div", "profile-block full");
      questionBlock.appendChild(createElement("h4", "", "Committee-specific review checks"));
      appendList(questionBlock, specificQuestions, "No committee-specific review checks recorded.");
      grid.appendChild(questionBlock);
    }

    grid.appendChild(createProfileBlock("Highest-value follow-up", record.nextFollowUp, "No follow-up recorded.", true));

    card.appendChild(grid);
    return card;
  }

  function renderProfiles() {
    if (!elements.profileList) return;
    elements.profileList.replaceChildren();
    records.forEach((record) => elements.profileList.appendChild(renderProfile(record)));
  }

  function addReference(referenceMap, source, usedBy, category) {
    if (!source || !source.url) return;
    const key = source.url;
    const existing =
      referenceMap.get(key) ||
      {
        label: source.label || source.url,
        url: source.url,
        type: source.type || category || "",
        supports: source.supports || "",
        note: source.note || "",
        usedBy: new Set(),
        categories: new Set()
      };
    if (hasText(usedBy)) existing.usedBy.add(usedBy);
    if (hasText(category)) existing.categories.add(category);
    if (!hasText(existing.type) && hasText(source.type)) existing.type = source.type;
    if (!hasText(existing.supports) && hasText(source.supports)) existing.supports = source.supports;
    if (!hasText(existing.note) && hasText(source.note)) existing.note = source.note;
    referenceMap.set(key, existing);
  }

  function renderReferenceList() {
    if (!elements.referenceList) return;
    const referenceMap = new Map();
    const leruSource = metadata.leruSource || {};
    addReference(referenceMap, leruSource, "LERU membership baseline", "Membership baseline");

    records.forEach((record) => {
      addReference(referenceMap, getCommitteeCodeSource(record).source, `${record.institution}`, "Code/standard used by route");
      ensureArray(record.sourceLinks).forEach((source) => {
        addReference(referenceMap, source, record.institution, source.type || "Profile source");
      });
    });

    const references = Array.from(referenceMap.values()).sort((a, b) => a.label.localeCompare(b.label));
    elements.referenceList.replaceChildren();
    if (!references.length) {
      elements.referenceList.appendChild(createElement("p", "", "No public source links recorded."));
      return;
    }

    const list = createElement("ol", "reference-items");
    references.forEach((reference) => {
      const item = document.createElement("li");
      item.appendChild(createLink(reference.label, reference.url));
      const details = [reference.type, reference.supports, reference.note].filter(hasText).join(" | ");
      if (details) item.appendChild(createElement("span", "source-note-text", ` ${details}`));
      const usedBy = Array.from(reference.usedBy).sort();
      if (usedBy.length) {
        item.appendChild(createElement("span", "reference-used-by", ` Used in: ${usedBy.join("; ")}.`));
      }
      list.appendChild(item);
    });
    elements.referenceList.appendChild(list);
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
    renderReferenceList();
    renderList(elements.findingsList, metadata.crossCuttingFindings, "No cross-cutting findings recorded.");
    renderList(elements.validationAgenda, metadata.validationAgenda, "No validation agenda recorded.");
    bindPrint();
  }

  init();
})();
