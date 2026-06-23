(function () {
  const metadata = window.LERU_MEMBER_METADATA || {};
  const records = Array.isArray(window.LERU_MEMBER_DATA) ? window.LERU_MEMBER_DATA : [];

  const elements = {
    metadataCaveat: document.getElementById("metadata-caveat"),
    metadataStatus: document.getElementById("metadata-status"),
    seedCount: document.getElementById("seed-count"),
    routeCount: document.getElementById("route-count"),
    validationCount: document.getElementById("validation-count"),
    sourceCount: document.getElementById("source-count"),
    search: document.getElementById("leru-search"),
    countryFilter: document.getElementById("country-filter"),
    profileFilter: document.getElementById("profile-filter"),
    validationFilter: document.getElementById("validation-filter"),
    tagFilter: document.getElementById("tag-filter"),
    resetFilters: document.getElementById("reset-filters"),
    resultCount: document.getElementById("result-count"),
    results: document.getElementById("leru-results"),
    emptyMessage: document.getElementById("empty-message"),
    validationNeeds: document.getElementById("validation-needs"),
    excludedList: document.getElementById("excluded-list")
  };

  function ensureArray(value) {
    return Array.isArray(value) ? value : [];
  }

  function normalize(value) {
    return String(value || "").trim().toLowerCase();
  }

  function hasText(value) {
    return Boolean(String(value || "").trim());
  }

  function createElement(tagName, className, text) {
    const element = document.createElement(tagName);
    if (className) element.className = className;
    if (text !== undefined && text !== null) element.textContent = text;
    return element;
  }

  function createExternalLink(label, href, className) {
    const rawHref = href || "#";
    const anchor = createElement("a", className, label || href || "Source");
    anchor.href = rawHref;
    if (/^https?:\/\//i.test(rawHref)) {
      anchor.target = "_blank";
      anchor.rel = "noreferrer";
    }
    return anchor;
  }

  function appendIfText(parent, tagName, className, text) {
    if (!hasText(text)) return;
    parent.appendChild(createElement(tagName, className, text));
  }

  function uniqueSorted(values) {
    return [...new Set(values.filter(hasText))].sort((a, b) => a.localeCompare(b));
  }

  function populateSelect(select, values, defaultLabel) {
    if (!select) return;
    select.replaceChildren(createElement("option", "", defaultLabel));
    select.firstChild.value = "";
    values.forEach((value) => {
      const option = createElement("option", "", value);
      option.value = value;
      select.appendChild(option);
    });
  }

  function collectRecordText(record) {
    const sourceText = ensureArray(record.sourceLinks)
      .map((source) => [source.label, source.type, source.note, source.url].join(" "))
      .join(" ");
    return [
      record.institution,
      record.country,
      record.city,
      record.leruStatus,
      record.inteStatus,
      record.profileStatus,
      record.validationStatus,
      record.transparencyCategory,
      record.nationalRoute,
      record.institutionalRoute,
      record.transparencySummary,
      sourceText,
      ensureArray(record.tags).join(" "),
      ensureArray(record.caveats).join(" "),
      record.nextFollowUp
    ]
      .join(" ")
      .toLowerCase();
  }

  function getFilteredRecords() {
    const searchText = normalize(elements.search && elements.search.value);
    const country = elements.countryFilter ? elements.countryFilter.value : "";
    const profile = elements.profileFilter ? elements.profileFilter.value : "";
    const validation = elements.validationFilter ? elements.validationFilter.value : "";
    const tag = elements.tagFilter ? elements.tagFilter.value : "";

    return records.filter((record) => {
      if (country && record.country !== country) return false;
      if (profile && record.profileStatus !== profile) return false;
      if (validation && record.validationStatus !== validation) return false;
      if (tag && !ensureArray(record.tags).includes(tag) && record.transparencyCategory !== tag) return false;
      if (searchText && !collectRecordText(record).includes(searchText)) return false;
      return true;
    });
  }

  function renderSummaryCounts() {
    const withRoutes = records.filter((record) => hasText(record.institutionalRoute)).length;
    const needingValidation = records.filter((record) =>
      normalize(record.validationStatus).includes("validation")
    ).length;
    const withSources = records.filter((record) => ensureArray(record.sourceLinks).length > 0).length;

    if (elements.seedCount) elements.seedCount.textContent = records.length;
    if (elements.routeCount) elements.routeCount.textContent = withRoutes;
    if (elements.validationCount) elements.validationCount.textContent = needingValidation;
    if (elements.sourceCount) elements.sourceCount.textContent = withSources;
  }

  function renderMetadata() {
    if (elements.metadataCaveat && metadata.caveat) {
      elements.metadataCaveat.textContent = metadata.caveat;
    }

    if (elements.metadataStatus) {
      const status = metadata.status || "Public-source draft for validation";
      const updated = metadata.lastUpdated ? ` Last updated: ${metadata.lastUpdated}.` : "";
      elements.metadataStatus.textContent = `Status: ${status}.${updated}`;
    }
  }

  function renderValidationLists() {
    if (elements.validationNeeds) {
      const needs = ensureArray(metadata.validationNeeds);
      elements.validationNeeds.replaceChildren();
      if (needs.length) {
        needs.forEach((need) => {
          elements.validationNeeds.appendChild(createElement("li", "", need));
        });
      } else {
        elements.validationNeeds.appendChild(createElement("li", "", "No validation needs recorded yet."));
      }
    }

    if (elements.excludedList) {
      const excluded = ensureArray(metadata.deliberatelyExcluded);
      elements.excludedList.replaceChildren();
      if (excluded.length) {
        excluded.forEach((item) => {
          const label = [item.institution, item.reason].filter(hasText).join(": ");
          elements.excludedList.appendChild(createElement("li", "", label));
        });
      } else {
        elements.excludedList.appendChild(createElement("li", "", "No scope exclusions recorded."));
      }
    }
  }

  function createList(items, className, emptyText) {
    const list = createElement("ul", className);
    if (!items.length) {
      list.appendChild(createElement("li", "", emptyText));
      return list;
    }
    items.forEach((item) => {
      list.appendChild(createElement("li", "", item));
    });
    return list;
  }

  function renderSourceList(sources) {
    const list = createElement("ul", "leru-source-list");
    if (!sources.length) {
      list.appendChild(createElement("li", "", "No public source link recorded in this seed."));
      return list;
    }

    sources.forEach((source) => {
      const item = document.createElement("li");
      if (source.url) {
        item.appendChild(createExternalLink(source.label, source.url));
      } else {
        item.appendChild(createElement("strong", "", source.label || "Source"));
      }
      if (source.type) item.appendChild(createElement("span", "leru-card-note", ` ${source.type}.`));
      if (source.note) item.appendChild(createElement("span", "leru-card-note", ` ${source.note}`));
      list.appendChild(item);
    });
    return list;
  }

  function renderCard(record) {
    const card = createElement("article", "leru-card");

    const header = createElement("div", "leru-card-header");
    const titleGroup = document.createElement("div");
    titleGroup.appendChild(createElement("h3", "", record.institution || "Unnamed institution"));
    titleGroup.appendChild(
      createElement(
        "p",
        "leru-card-meta",
        [record.city, record.country].filter(hasText).join(", ") || "Country not recorded"
      )
    );

    const statusStack = createElement("div", "leru-status-stack");
    if (record.validationStatus) statusStack.appendChild(createElement("span", "leru-status", record.validationStatus));
    if (record.profileStatus) statusStack.appendChild(createElement("span", "leru-tag", record.profileStatus));
    if (record.transparencyCategory) statusStack.appendChild(createElement("span", "leru-tag", record.transparencyCategory));
    header.append(titleGroup, statusStack);
    card.appendChild(header);

    const memberSection = createElement("div", "leru-card-section");
    memberSection.appendChild(createElement("h4", "", "Member framing"));
    appendIfText(memberSection, "p", "", record.leruStatus);
    appendIfText(memberSection, "p", "leru-card-note", `INTE status: ${record.inteStatus || "Not recorded"}`);
    card.appendChild(memberSection);

    const nationalSection = createElement("div", "leru-card-section");
    nationalSection.appendChild(createElement("h4", "", "Country route"));
    appendIfText(nationalSection, "p", "", record.nationalRoute || "No country-route summary recorded.");
    card.appendChild(nationalSection);

    const institutionalSection = createElement("div", "leru-card-section");
    institutionalSection.appendChild(createElement("h4", "", "Institution route"));
    appendIfText(
      institutionalSection,
      "p",
      "",
      record.institutionalRoute || "No institution-route summary recorded."
    );
    card.appendChild(institutionalSection);

    const transparencySection = createElement("div", "leru-card-section");
    transparencySection.appendChild(createElement("h4", "", "Transparency and public output"));
    appendIfText(
      transparencySection,
      "p",
      "",
      record.transparencySummary || "No transparency summary recorded for this seed."
    );
    card.appendChild(transparencySection);

    const sourcesSection = createElement("div", "leru-card-section");
    sourcesSection.appendChild(createElement("h4", "", "Public sources"));
    sourcesSection.appendChild(renderSourceList(ensureArray(record.sourceLinks)));
    card.appendChild(sourcesSection);

    const caveatSection = createElement("div", "leru-card-section");
    caveatSection.appendChild(createElement("h4", "", "Caveats"));
    caveatSection.appendChild(
      createList(ensureArray(record.caveats), "leru-caveat-list", "No record-specific caveat recorded.")
    );
    card.appendChild(caveatSection);

    if (ensureArray(record.tags).length) {
      const tagsSection = createElement("div", "leru-card-section");
      tagsSection.appendChild(createElement("h4", "", "Tags"));
      const tagList = createElement("div", "leru-tag-list");
      ensureArray(record.tags).forEach((tag) => tagList.appendChild(createElement("span", "leru-tag", tag)));
      tagsSection.appendChild(tagList);
      card.appendChild(tagsSection);
    }

    const followUpSection = createElement("div", "leru-card-section");
    followUpSection.appendChild(createElement("h4", "", "Next follow-up"));
    appendIfText(followUpSection, "p", "", record.nextFollowUp || "No follow-up recorded.");
    card.appendChild(followUpSection);

    const actions = createElement("div", "leru-card-actions");
    if (record.countryDossierLink) {
      actions.appendChild(createExternalLink("Open country dossier", record.countryDossierLink, "card-action primary-action"));
    }
    if (ensureArray(record.sourceLinks)[0] && ensureArray(record.sourceLinks)[0].url) {
      actions.appendChild(
        createExternalLink("Open first source", ensureArray(record.sourceLinks)[0].url, "card-action secondary-action")
      );
    }
    if (actions.childNodes.length) card.appendChild(actions);

    return card;
  }

  function renderResults() {
    if (!elements.results) return;
    const filtered = getFilteredRecords();
    elements.results.replaceChildren();
    filtered.forEach((record) => elements.results.appendChild(renderCard(record)));

    if (elements.resultCount) {
      const total = records.length;
      const noun = total === 1 ? "institution" : "institutions";
      elements.resultCount.textContent = `Showing ${filtered.length} of ${total} ${noun}.`;
    }

    if (elements.emptyMessage) elements.emptyMessage.hidden = filtered.length !== 0;
  }

  function populateFilters() {
    populateSelect(elements.countryFilter, uniqueSorted(records.map((record) => record.country)), "All countries");
    populateSelect(
      elements.profileFilter,
      uniqueSorted(records.map((record) => record.profileStatus)),
      "All profile statuses"
    );
    populateSelect(
      elements.validationFilter,
      uniqueSorted(records.map((record) => record.validationStatus)),
      "All validation statuses"
    );
    populateSelect(
      elements.tagFilter,
      uniqueSorted([
        ...records.map((record) => record.transparencyCategory),
        ...records.flatMap((record) => ensureArray(record.tags))
      ]),
      "All tags"
    );
  }

  function resetFilters() {
    if (elements.search) elements.search.value = "";
    [elements.countryFilter, elements.profileFilter, elements.validationFilter, elements.tagFilter].forEach((select) => {
      if (select) select.value = "";
    });
    renderResults();
  }

  function bindEvents() {
    if (elements.search) elements.search.addEventListener("input", renderResults);
    [elements.countryFilter, elements.profileFilter, elements.validationFilter, elements.tagFilter].forEach((select) => {
      if (select) select.addEventListener("change", renderResults);
    });
    if (elements.resetFilters) elements.resetFilters.addEventListener("click", resetFilters);
  }

  function init() {
    renderMetadata();
    renderSummaryCounts();
    renderValidationLists();
    populateFilters();
    bindEvents();
    renderResults();
  }

  init();
})();
