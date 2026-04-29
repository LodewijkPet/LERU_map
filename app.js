(function () {
  const countries = window.COUNTRY_DATA || [];
  const transparencyData = window.TRANSPARENCY_DATA || [];
  const defaultTransparency = window.DEFAULT_TRANSPARENCY_DATA || {};
  const mapData = window.EUROPE_MAP || { width: 1000, height: 760, features: [] };
  const svgNs = "http://www.w3.org/2000/svg";

  const transparencyById = new Map(transparencyData.map((item) => [item.id, item]));
  countries.forEach((country) => {
    const transparency = transparencyById.get(country.id) || {};
    const dossierTransparency = country.transparency || {};

    // Country dossiers can refine or override the shared transparency layer.
    country.transparency = Object.assign({}, defaultTransparency, transparency, dossierTransparency, {
      id: country.id,
      country: country.name
    });
  });

  const initialHash = window.location.hash.replace("#", "");
  const initialDossierId = initialHash.startsWith("dossier-") ? initialHash.slice("dossier-".length) : "";
  const selectedFromHash = initialDossierId || initialHash;
  const defaultCountry = countries.find((country) => country.id === selectedFromHash) || countries[0];
  let selectedId = defaultCountry ? defaultCountry.id : "";
  let searchTerm = "";

  const countryById = new Map(countries.map((country) => [country.id, country]));
  const countryByMapId = new Map(countries.map((country) => [country.mapId, country]));
  const markerOffsets = {
    BEL: [0, -24],
    BGR: [30, 6],
    BIH: [-28, -10],
    NLD: [24, 20],
    CYP: [0, -28],
    DNK: [-10, -24],
    FRA: [6, 8],
    GBR: [-28, 22],
    ISL: [0, -18],
    IRL: [-8, 18],
    KOS: [26, 12],
    MKD: [24, 30],
    MNE: [-28, 18],
    NOR: [-42, 18],
    PRT: [-16, 8],
    ROU: [34, -8],
    RUS: [-36, 18],
    SRB: [22, -10],
    ESP: [4, 10],
    SWE: [28, 8],
    FIN: [30, -12],
    TUR: [34, 12]
  };

  const elements = {
    countryCount: document.getElementById("country-count"),
    documentCount: document.getElementById("document-count"),
    overviewCount: document.getElementById("overview-count"),
    mapPanel: document.querySelector(".map-panel"),
    map: document.getElementById("europe-map"),
    detail: document.getElementById("country-detail"),
    grid: document.getElementById("country-grid"),
    search: document.getElementById("country-search"),
    dossier: document.getElementById("country-dossier")
  };

  function createElement(tag, className, text) {
    const element = document.createElement(tag);
    if (className) element.className = className;
    if (text !== undefined) element.textContent = text;
    return element;
  }

  function createActionButton(text, className) {
    const button = createElement("button", className, text);
    button.type = "button";
    return button;
  }

  function createSvg(tag, attrs) {
    const element = document.createElementNS(svgNs, tag);
    Object.entries(attrs || {}).forEach(([key, value]) => {
      element.setAttribute(key, value);
    });
    return element;
  }

  function localHref(path) {
    if (!path) return "#";
    if (/^https?:\/\//i.test(path)) return path;
    return encodeURI(path);
  }

  function syncDetailHeight() {
    if (!elements.mapPanel) return;
    const height = elements.mapPanel.getBoundingClientRect().height;
    if (height > 0) {
      document.documentElement.style.setProperty("--map-panel-height", `${Math.ceil(height)}px`);
    }
  }

  function scheduleDetailHeightSync() {
    window.requestAnimationFrame(syncDetailHeight);
  }

  function scrollToDossier(behavior) {
    if (!elements.dossier) return;
    window.requestAnimationFrame(() => {
      elements.dossier.scrollIntoView({ behavior, block: "start" });
    });
  }

  function renderStats() {
    const documentCount = countries.reduce((sum, country) => sum + country.documents.length, 0);
    const overviewCount = countries.filter((country) =>
      country.documents.some((documentItem) => documentItem.type === "Country overview")
    ).length;

    elements.countryCount.textContent = String(countries.length);
    elements.documentCount.textContent = String(documentCount);
    elements.overviewCount.textContent = String(overviewCount);
  }

  function activateCountry(countryId, updateHash) {
    if (!countryById.has(countryId)) return;
    selectedId = countryId;
    if (updateHash) {
      window.history.replaceState(null, "", `#${countryId}`);
    }
    renderMap();
    renderCountryList();
    renderDetail();
    if (elements.dossier && !elements.dossier.hidden) {
      renderDossier(countryId, false);
    }
    scheduleDetailHeightSync();
  }

  function bindActivation(element, countryId) {
    element.addEventListener("click", () => activateCountry(countryId, true));
    element.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        activateCountry(countryId, true);
      }
    });
  }

  function renderMap() {
    const svg = elements.map;
    svg.replaceChildren();
    svg.setAttribute("viewBox", `0 0 ${mapData.width} ${mapData.height}`);
    svg.setAttribute("preserveAspectRatio", "xMidYMid meet");

    const shapeGroup = createSvg("g");
    const markerGroup = createSvg("g", { "aria-label": "Countries in the system" });

    mapData.features.forEach((feature) => {
      const country = countryByMapId.get(feature.id);
      const path = createSvg("path", {
        d: feature.path,
        class: [
          "country-shape",
          country ? "in-system" : "",
          country && country.id === selectedId ? "is-selected" : ""
        ]
          .filter(Boolean)
          .join(" ")
      });

      const title = createSvg("title");
      title.textContent = country ? `${country.name}: ${country.stage}` : feature.name;
      path.appendChild(title);

      if (country) {
        path.setAttribute("role", "button");
        path.setAttribute("tabindex", "0");
        path.setAttribute("aria-label", `${country.name}, ${country.stage}`);
        bindActivation(path, country.id);
      }

      shapeGroup.appendChild(path);
    });

    countries.forEach((country) => {
      const feature = mapData.features.find((item) => item.id === country.mapId);
      if (!feature) return;

      const offset = markerOffsets[country.mapId] || [0, 0];
      const x = feature.centroid[0] + offset[0];
      const y = feature.centroid[1] + offset[1];
      const marker = createSvg("g", {
        class: ["country-marker", country.id === selectedId ? "is-selected" : ""].filter(Boolean).join(" "),
        role: "button",
        tabindex: "0",
        "aria-label": `${country.name}, ${country.stage}`,
        transform: `translate(${x} ${y})`
      });

      marker.appendChild(createSvg("circle", { r: "18" }));
      const label = createSvg("text", { x: "0", y: "6" });
      label.textContent = country.shortName;
      marker.appendChild(label);
      bindActivation(marker, country.id);
      markerGroup.appendChild(marker);
    });

    svg.appendChild(shapeGroup);
    svg.appendChild(markerGroup);
  }

  function searchableText(country) {
    const transparency = country.transparency || {};
    const transparencyResources = (transparency.resources || [])
      .map((resource) =>
        [
          resource.label,
          resource.resourceClass,
          resource.scope,
          resource.caseLevelInfo,
          resource.comment,
          resource.url
        ]
          .filter(Boolean)
          .join(" ")
      )
      .join(" ");

    return [
      country.name,
      country.shortName,
      country.region,
      country.stage,
      country.systemType,
      country.summary,
      country.keyActors.join(" "),
      country.documentLabels.join(" "),
      (country.dataSignals || []).join(" "),
      country.documents.map((documentItem) => documentItem.label).join(" "),
      JSON.stringify(country.dossierDetails || {}),
      transparency.tier,
      transparency.mainBody,
      transparency.coverage,
      transparency.publicAccess,
      transparency.publicationModel,
      transparency.format,
      transparency.keyNote,
      transparencyResources
    ]
      .join(" ")
      .toLowerCase();
  }

  function renderCountryList() {
    const grid = elements.grid;
    grid.replaceChildren();

    const query = searchTerm.trim().toLowerCase();
    const visibleCountries = countries.filter((country) => !query || searchableText(country).includes(query));

    if (!visibleCountries.length) {
      grid.appendChild(createElement("div", "empty-state", "No matching countries in the current collection."));
      return;
    }

    visibleCountries.forEach((country) => {
      const card = createElement("article", "country-card");
      card.setAttribute("data-selected", country.id === selectedId ? "true" : "false");
      card.addEventListener("click", (event) => {
        if (event.target instanceof Element && event.target.closest("button, a")) return;
        activateCountry(country.id, true);
      });

      const header = createElement("header");
      const title = createElement("h3", "", country.name);
      const shortName = createElement("span", "pill strong", country.shortName);
      header.append(title, shortName);

      const meta = createElement("div", "country-meta");
      meta.append(
        createElement("span", "pill", country.stage),
        createElement("span", "pill", `${country.documents.length} files`),
        createElement("span", "pill", country.transparency.tier)
      );

      const type = createElement("p", "", country.systemType);

      const labelRow = createElement("div", "country-meta");
      country.documentLabels.slice(0, 3).forEach((label) => {
        labelRow.appendChild(createElement("span", "pill", label));
      });

      const actions = createElement("div", "card-actions");
      const selectButton = createActionButton("Show on map", "card-action secondary-action");
      selectButton.addEventListener("click", () => activateCountry(country.id, true));
      const dossierButton = createActionButton("Open dossier", "card-action primary-action");
      dossierButton.addEventListener("click", () => openDossier(country.id));
      actions.append(selectButton, dossierButton);

      card.append(header, meta, type, labelRow, actions);
      grid.appendChild(card);
    });
  }

  function renderList(titleText, items) {
    const section = document.createDocumentFragment();
    const title = createElement("h3", "", titleText);
    const list = createElement("ul");
    items.forEach((item) => {
      list.appendChild(createElement("li", "", item));
    });
    section.append(title, list);
    return section;
  }

  function archiveLabel(value) {
    if (value === true) return "Yes";
    if (value === false) return "No";
    return "Not assessed";
  }

  function renderTransparency(transparency) {
    const section = document.createDocumentFragment();
    section.appendChild(createElement("h3", "", "Transparency: case publication"));

    const status = createElement("div", "status-row");
    status.append(
      createElement("span", "pill strong", transparency.tier || "Not assessed"),
      createElement("span", "pill", `Public: ${transparency.publicAccess || "Not assessed"}`),
      createElement("span", "pill", `Archive: ${archiveLabel(transparency.hasArchive)}`)
    );
    section.appendChild(status);

    const details = [
      transparency.mainBody && `Main body: ${transparency.mainBody}`,
      transparency.coverage && `Coverage: ${transparency.coverage}`,
      transparency.publicationModel && `Publication model: ${transparency.publicationModel}`,
      transparency.format && `Format: ${transparency.format}`
    ].filter(Boolean);
    if (details.length) {
      section.appendChild(renderList("Transparency details", details));
    }

    if (transparency.keyNote) {
      section.appendChild(createElement("p", "", transparency.keyNote));
    }

    if (transparency.sourcePath) {
      const source = createElement("p", "source-note");
      const link = createElement("a", "", "Transparency overview document");
      link.href = localHref(transparency.sourcePath);
      source.append(document.createTextNode("Source: "), link);
      if (transparency.sourceDate) {
        source.appendChild(document.createTextNode(` (${transparency.sourceDate})`));
      }
      section.appendChild(source);
    }

    if (transparency.resources && transparency.resources.length) {
      section.appendChild(createElement("h3", "", "Transparency public resources"));
      const resources = createElement("ul", "doc-list");
      transparency.resources.forEach((resource) => {
        const item = createElement("li");
        const link = createElement("a", "", resource.label);
        link.href = localHref(resource.url);
        link.target = "_blank";
        link.rel = "noreferrer";

        const meta = [resource.resourceClass, resource.scope, resource.caseLevelInfo].filter(Boolean).join(" | ");
        item.append(link);
        if (meta) item.appendChild(createElement("span", "", meta));
        if (resource.comment) item.appendChild(createElement("span", "", resource.comment));
        resources.appendChild(item);
      });
      section.appendChild(resources);
    }

    return section;
  }

  function systemProfileLabel(country) {
    const text = [country.systemType, country.summary].filter(Boolean).join(" ").toLowerCase();
    if (text.includes("two-track")) return "Two-track misconduct and broader-practice model";
    if (
      text.includes("federal") ||
      text.includes("multi-level") ||
      text.includes("subnational") ||
      text.includes("regional") ||
      text.includes("community-level")
    ) {
      return "Multi-level or federal governance model";
    }
    if (
      text.includes("self-regulatory") ||
      text.includes("soft-law") ||
      text.includes("code-led") ||
      text.includes("code-driven")
    ) {
      return "Code-led or self-regulatory model";
    }
    if (text.includes("statutory") || text.includes("juridified") || text.includes("legal") || text.includes("law")) {
      return "Legally anchored model";
    }
    if (text.includes("institution")) return "Institution-led or institutionally executed model";
    return "Hybrid or developing governance model";
  }

  function renderFactGrid(items) {
    const grid = createElement("dl", "fact-grid");
    items
      .filter((item) => item.value !== undefined && item.value !== null && item.value !== "")
      .forEach((item) => {
        const group = createElement("div");
        group.append(createElement("dt", "", item.label), createElement("dd", "", String(item.value)));
        grid.appendChild(group);
      });
    return grid;
  }

  function renderStructuredList(items, emptyText) {
    if (!items || !items.length) {
      return createElement("p", "empty-copy", emptyText);
    }
    const list = createElement("ul", "structured-list");
    items.forEach((item) => {
      list.appendChild(createElement("li", "", item));
    });
    return list;
  }

  function renderDossierSection(titleText, modifierClass) {
    const className = ["dossier-section", modifierClass].filter(Boolean).join(" ");
    const section = createElement("section", className);
    section.appendChild(createElement("h3", "", titleText));
    return section;
  }

  function renderResourceLinks(resources) {
    if (!resources || !resources.length) {
      return createElement("p", "empty-copy", "No public resources recorded in this transparency layer yet.");
    }

    const list = createElement("ul", "doc-list");
    resources.forEach((resource) => {
      const item = createElement("li");
      if (resource.url) {
        const link = createElement("a", "", resource.label || resource.url);
        link.href = localHref(resource.url);
        link.target = "_blank";
        link.rel = "noreferrer";
        item.appendChild(link);
      } else {
        item.appendChild(createElement("strong", "", resource.label || "Unnamed resource"));
      }

      const meta = [resource.resourceClass, resource.scope, resource.caseLevelInfo].filter(Boolean).join(" | ");
      if (meta) item.appendChild(createElement("span", "", meta));
      if (resource.comment) item.appendChild(createElement("span", "", resource.comment));
      list.appendChild(item);
    });
    return list;
  }

  function renderDocumentLinks(documents) {
    if (!documents || !documents.length) {
      return createElement("p", "empty-copy", "No collected files recorded yet.");
    }

    const list = createElement("ul", "doc-list");
    documents.forEach((documentItem) => {
      const item = createElement("li");
      const link = createElement("a", "", documentItem.label);
      link.href = localHref(documentItem.path);
      if (documentItem.external) {
        link.target = "_blank";
        link.rel = "noreferrer";
      }
      item.append(link, createElement("span", "", documentItem.type));
      list.appendChild(item);
    });
    return list;
  }

  function renderDeepLinkList(items, emptyText) {
    if (!items || !items.length) {
      return createElement("p", "empty-copy", emptyText || "No documents recorded yet.");
    }

    const list = createElement("ul", "doc-list deep-link-list");
    items.forEach((linkItem) => {
      const item = createElement("li");
      const href = linkItem.url || linkItem.path;
      if (href) {
        const link = createElement("a", "", linkItem.label || href);
        link.href = localHref(href);
        if (/^https?:\/\//i.test(href)) {
          link.target = "_blank";
          link.rel = "noreferrer";
        }
        item.appendChild(link);
      } else {
        item.appendChild(createElement("strong", "", linkItem.label || "Unnamed document"));
      }

      const meta = [linkItem.type, linkItem.date, linkItem.scope].filter(Boolean).join(" | ");
      if (meta) item.appendChild(createElement("span", "", meta));
      if (linkItem.note) item.appendChild(createElement("span", "", linkItem.note));
      list.appendChild(item);
    });
    return list;
  }

  function renderMiniFacts(items) {
    const facts = createElement("dl", "mini-facts");
    items
      .filter((item) => item.value !== undefined && item.value !== null && item.value !== "")
      .forEach((item) => {
        const group = createElement("div");
        group.append(createElement("dt", "", item.label), createElement("dd", "", item.value));
        facts.appendChild(group);
      });
    return facts;
  }

  function renderSystemMap(details) {
    const section = renderDossierSection("System Map", "dossier-section-wide");
    if (details.readingGuide) section.appendChild(createElement("p", "dossier-note", details.readingGuide));
    if (details.networkExtent) section.appendChild(createElement("p", "", details.networkExtent));

    const mapItems = createElement("div", "system-map-grid");
    (details.systemMap || []).forEach((item) => {
      const card = createElement("article", "system-map-card");
      card.append(
        createElement("h4", "", item.label),
        renderMiniFacts([
          { label: "Starts at", value: item.startsAt },
          { label: "Travels through", value: item.travelsThrough },
          { label: "Ends at", value: item.endsAt }
        ])
      );
      mapItems.appendChild(card);
    });
    if (details.systemMap && details.systemMap.length) section.appendChild(mapItems);
    return section;
  }

  function renderEvidenceCategoryDetails(categories) {
    const section = renderDossierSection("Evidence Taxonomy", "dossier-section-wide");
    if (!categories || !categories.length) {
      section.appendChild(createElement("p", "empty-copy", "No detailed evidence taxonomy recorded yet."));
      return section;
    }

    const grid = createElement("div", "evidence-grid");
    categories.forEach((category) => {
      const card = createElement("article", "evidence-card");
      card.append(
        createElement("h4", "", category.label),
        createElement("p", "", category.purpose || ""),
        renderMiniFacts([
          { label: "Examples", value: category.examples },
          { label: "Starts at", value: category.startsAt },
          { label: "Ends at", value: category.endsAt }
        ])
      );
      grid.appendChild(card);
    });
    section.appendChild(grid);
    return section;
  }

  function renderNetworkLayers(layers) {
    const section = renderDossierSection("Institution Network", "dossier-section-wide");
    if (!layers || !layers.length) {
      section.appendChild(createElement("p", "empty-copy", "No detailed institution network recorded yet."));
      return section;
    }

    layers.forEach((layer) => {
      const layerElement = createElement("section", "network-layer");
      layerElement.append(createElement("h4", "", layer.title), createElement("p", "", layer.summary || ""));

      const actorGrid = createElement("div", "actor-grid");
      (layer.actors || []).forEach((actor) => {
        const card = createElement("article", "actor-card");
        card.appendChild(createElement("h5", "", actor.name));

        const meta = createElement("div", "actor-meta");
        [actor.category, actor.since && `Since: ${actor.since}`, actor.scope].filter(Boolean).forEach((value) => {
          meta.appendChild(createElement("span", "pill", value));
        });
        card.appendChild(meta);

        if (actor.role) card.appendChild(createElement("p", "", actor.role));

        if (actor.documents && actor.documents.length) {
          card.append(createElement("h6", "", "Documents and traces"), renderDeepLinkList(actor.documents));
        }
        if (actor.signals && actor.signals.length) {
          card.append(createElement("h6", "", "Coding signals"), renderStructuredList(actor.signals));
        }
        actorGrid.appendChild(card);
      });
      layerElement.appendChild(actorGrid);
      section.appendChild(layerElement);
    });
    return section;
  }

  function renderIntegrityCommittees(directory) {
    const section = renderDossierSection("Research Integrity Committee Directory", "dossier-section-wide");
    if (!directory || !directory.groups || !directory.groups.length) {
      section.appendChild(createElement("p", "empty-copy", "No committee directory recorded yet."));
      return section;
    }

    if (directory.summary) section.appendChild(createElement("p", "", directory.summary));
    if (directory.methodology) section.appendChild(createElement("p", "dossier-note", directory.methodology));

    directory.groups.forEach((group) => {
      const groupElement = createElement("section", "committee-group");
      const groupHeader = createElement("div", "committee-group-header");
      groupHeader.append(
        createElement("h4", "", group.title),
        createElement("span", "pill strong", `${(group.committees || []).length} routes`)
      );
      groupElement.appendChild(groupHeader);
      if (group.description) groupElement.appendChild(createElement("p", "", group.description));

      const grid = createElement("div", "committee-grid");
      (group.committees || []).forEach((committee) => {
        const card = createElement("article", "committee-card");
        const title = committee.institution || committee.name || "Unnamed institution";
        const subtitle = committee.committee || committee.category || committee.name || "Research integrity route";
        card.append(createElement("h5", "", title), createElement("p", "committee-name", subtitle));

        const meta = createElement("div", "committee-meta");
        [committee.status || committee.category, committee.scope || committee.jurisdiction, committee.since ? `Since: ${committee.since}` : ""]
          .filter(Boolean)
          .forEach((value) => {
            meta.appendChild(createElement("span", "pill", value));
          });
        card.appendChild(meta);

        if (committee.route || committee.role) card.appendChild(createElement("p", "", committee.route || committee.role));

        const committeeLinks = [
          ...(committee.website ? [{ label: "Website", type: committee.category, url: committee.website }] : []),
          ...(committee.links || committee.documents || [])
        ];
        if (committeeLinks.length) {
          card.append(createElement("h6", "", "Websites, guidelines and regulations"), renderDeepLinkList(committeeLinks));
        }

        if (committee.signals && committee.signals.length) {
          const signals = createElement("ul", "signal-list");
          committee.signals.forEach((signal) => {
            const item = createElement("li", "", signal);
            signals.appendChild(item);
          });
          card.append(createElement("h6", "", "Coding signals"), signals);
        }
        grid.appendChild(card);
      });

      groupElement.appendChild(grid);
      section.appendChild(groupElement);
    });

    return section;
  }

  function renderBoundaryMap(boundaries) {
    const section = renderDossierSection("Where The Network Starts And Ends", "dossier-section-wide");
    if (!boundaries || !boundaries.length) {
      section.appendChild(createElement("p", "empty-copy", "No boundary map recorded yet."));
      return section;
    }

    const grid = createElement("div", "boundary-grid");
    boundaries.forEach((boundary) => {
      const card = createElement("article", "boundary-card");
      card.append(
        createElement("h4", "", boundary.label),
        renderMiniFacts([
          { label: "Handled by", value: boundary.handledBy },
          { label: "Examples", value: boundary.examples },
          { label: "Watch point", value: boundary.watchPoint }
        ])
      );
      grid.appendChild(card);
    });
    section.appendChild(grid);
    return section;
  }

  function timelineSortValue(dateText, index) {
    const text = String(dateText || "");
    const yearMatch = text.match(/\d{4}/);
    const year = yearMatch ? Number(yearMatch[0]) : 9999;
    const monthNames = [
      "january",
      "february",
      "march",
      "april",
      "may",
      "june",
      "july",
      "august",
      "september",
      "october",
      "november",
      "december"
    ];
    const lowerText = text.toLowerCase();
    const monthIndex = monthNames.findIndex((month) => lowerText.includes(month));
    const dayMatch = text.match(/^\d{1,2}/);
    const month = monthIndex >= 0 ? monthIndex + 1 : 0;
    const day = dayMatch ? Number(dayMatch[0]) : 0;
    return year * 10000 + month * 100 + day + index / 1000;
  }

  function renderTimeline(timeline) {
    const section = renderDossierSection("Development Timeline", "dossier-section-wide timeline-section");
    if (!timeline || !timeline.length) {
      section.appendChild(createElement("p", "empty-copy", "No timeline recorded yet."));
      return section;
    }

    const list = createElement("ol", "timeline");
    const orderedTimeline = timeline
      .map((eventItem, index) => ({ eventItem, index }))
      .sort(
        (left, right) =>
          timelineSortValue(left.eventItem.date, left.index) - timelineSortValue(right.eventItem.date, right.index)
      )
      .map((item) => item.eventItem);

    orderedTimeline.forEach((eventItem) => {
      const item = createElement("li", "timeline-item");
      const date = createElement("time", "", eventItem.date);
      if (/^\d{4}-\d{2}-\d{2}$/.test(eventItem.date)) date.dateTime = eventItem.date;

      const body = createElement("div", "timeline-body");
      body.appendChild(createElement("h4", "", eventItem.title));
      const meta = createElement("div", "timeline-meta");
      [eventItem.type, eventItem.actors].filter(Boolean).forEach((value) => {
        meta.appendChild(createElement("span", "pill", value));
      });
      body.appendChild(meta);
      if (eventItem.importance) body.appendChild(createElement("p", "", eventItem.importance));
      if (eventItem.sourceUrl || eventItem.source) {
        const source = createElement("p", "source-note");
        source.appendChild(document.createTextNode("Source: "));
        if (eventItem.sourceUrl) {
          const link = createElement("a", "", eventItem.source || "Open source");
          link.href = localHref(eventItem.sourceUrl);
          link.target = "_blank";
          link.rel = "noreferrer";
          source.appendChild(link);
        } else {
          source.appendChild(document.createTextNode(eventItem.source));
        }
        body.appendChild(source);
      }
      item.append(date, body);
      list.appendChild(item);
    });
    section.appendChild(list);
    return section;
  }

  function renderSourceLinks(details) {
    const section = renderDossierSection("Source Backbone", "dossier-section-wide");
    section.appendChild(
      renderDeepLinkList(details.sourceLinks, "No detailed source backbone recorded for this country yet.")
    );
    return section;
  }

  function renderDeepDossierSections(country) {
    const details = country.dossierDetails;
    if (!details) return [];

    return [
      renderSystemMap(details),
      renderNetworkLayers(details.networkLayers),
      renderIntegrityCommittees(details.integrityCommittees),
      renderEvidenceCategoryDetails(details.evidenceCategories),
      renderBoundaryMap(details.boundaries),
      renderTimeline(details.timeline),
      renderSourceLinks(details)
    ];
  }

  function renderDossier(countryId, reveal) {
    const country = countryById.get(countryId);
    const panel = elements.dossier;
    if (!country || !panel) return;

    const transparency = country.transparency || defaultTransparency;
    panel.replaceChildren();
    if (reveal) panel.hidden = false;

    const header = createElement("div", "dossier-header");
    const headerTop = createElement("div", "dossier-header-top");
    const titleGroup = createElement("div");
    titleGroup.append(createElement("p", "eyebrow", country.region), createElement("h2", "", `${country.name} dossier`));

    const closeButton = createActionButton("Close dossier", "card-action secondary-action");
    closeButton.addEventListener("click", closeDossier);
    headerTop.append(titleGroup, closeButton);

    const summary = createElement("p", "dossier-summary", country.summary);
    const kpis = createElement("div", "dossier-kpis");
    [
      { label: "System profile", value: systemProfileLabel(country) },
      { label: "Collection stage", value: country.stage },
      { label: "Source files", value: country.documents.length },
      { label: "Case transparency", value: transparency.tier || "Not assessed" }
    ].forEach((item) => {
      const kpi = createElement("div", "dossier-kpi");
      kpi.append(createElement("span", "", item.label), createElement("strong", "", item.value));
      kpis.appendChild(kpi);
    });
    header.append(headerTop, summary, kpis);

    const layout = createElement("div", "dossier-layout");

    const snapshot = renderDossierSection("System Snapshot", "dossier-section-wide");
    snapshot.append(
      renderFactGrid([
        { label: "Country", value: country.name },
        { label: "Region", value: country.region },
        { label: "Map code", value: country.mapId },
        { label: "Data folder", value: country.folder },
        { label: "Shared layout group", value: systemProfileLabel(country) },
        { label: "Transparency tier", value: transparency.tier || "Not assessed" }
      ]),
      createElement("p", "", country.systemType)
    );

    const deepSections = renderDeepDossierSections(country);

    const actors = renderDossierSection("Governance Actors");
    actors.appendChild(renderStructuredList(country.keyActors, "No governance actors recorded yet."));

    const evidence = renderDossierSection("Evidence Categories");
    evidence.appendChild(
      renderStructuredList(country.documentLabels, "No document categories recorded for this country yet.")
    );

    const transparencySection = renderDossierSection("Transparency and Case Publication", "dossier-section-wide");
    transparencySection.appendChild(
      renderFactGrid([
        { label: "Main body", value: transparency.mainBody },
        { label: "Coverage", value: transparency.coverage },
        { label: "Public access", value: transparency.publicAccess },
        { label: "Archive", value: archiveLabel(transparency.hasArchive) },
        { label: "Publication model", value: transparency.publicationModel },
        { label: "Format", value: transparency.format },
        { label: "Source date", value: transparency.sourceDate }
      ])
    );
    if (transparency.keyNote) {
      transparencySection.appendChild(createElement("p", "", transparency.keyNote));
    }
    if (transparency.sourcePath) {
      const source = createElement("p", "source-note");
      const link = createElement("a", "", "Transparency overview document");
      link.href = localHref(transparency.sourcePath);
      source.append(document.createTextNode("Source: "), link);
      transparencySection.appendChild(source);
    }
    transparencySection.append(createElement("h4", "", "Public resources"), renderResourceLinks(transparency.resources));

    const signals = renderDossierSection("Extraction Signals");
    signals.appendChild(renderStructuredList(country.dataSignals, "No extraction signals recorded yet."));

    const nextStep = renderDossierSection("Next Corpus Step");
    nextStep.appendChild(createElement("p", "", country.nextFocus));

    const files = renderDossierSection("Collected Files", "dossier-section-wide");
    files.appendChild(renderDocumentLinks(country.documents));

    layout.append(snapshot, ...deepSections, actors, evidence, transparencySection, signals, nextStep, files);
    panel.append(header, layout);
  }

  function openDossier(countryId, updateHash = true) {
    if (!countryById.has(countryId) || !elements.dossier) return;
    activateCountry(countryId, false);
    renderDossier(countryId, true);
    if (updateHash) {
      window.history.replaceState(null, "", `#dossier-${countryId}`);
    }
    scrollToDossier("smooth");
  }

  function closeDossier() {
    if (!elements.dossier) return;
    elements.dossier.hidden = true;
    elements.dossier.replaceChildren();
  }

  function renderDetail() {
    const country = countryById.get(selectedId);
    const panel = elements.detail;
    panel.replaceChildren();
    if (!country) return;

    const label = createElement("p", "eyebrow", country.region);
    const title = createElement("h2", "", country.name);

    const status = createElement("div", "status-row");
    status.append(
      createElement("span", "pill strong", country.stage),
      createElement("span", "pill", country.folder),
      createElement("span", "pill", `${country.documents.length} source files`)
    );

    const type = createElement("p", "", country.systemType);
    const summary = createElement("p", "", country.summary);
    const detailActions = createElement("div", "detail-actions");
    const dossierButton = createActionButton("Open full dossier", "card-action primary-action");
    dossierButton.addEventListener("click", () => openDossier(country.id));
    detailActions.appendChild(dossierButton);

    panel.append(label, title, status, type, summary, detailActions);
    if (country.transparency) {
      panel.appendChild(renderTransparency(country.transparency));
    }
    panel.appendChild(renderList("Key actors", country.keyActors));
    panel.appendChild(renderList("Document labels", country.documentLabels));
    if (country.dataSignals && country.dataSignals.length) {
      panel.appendChild(renderList("New extraction signals", country.dataSignals));
    }

    const nextTitle = createElement("h3", "", "Next corpus step");
    const next = createElement("p", "", country.nextFocus);
    panel.append(nextTitle, next);

    const docsTitle = createElement("h3", "", "Collected files");
    const docs = createElement("ul", "doc-list");
    country.documents.forEach((documentItem) => {
      const item = createElement("li");
      const link = createElement("a", "", documentItem.label);
      link.href = localHref(documentItem.path);
      if (documentItem.external) {
        link.target = "_blank";
        link.rel = "noreferrer";
      }
      item.append(link, createElement("span", "", documentItem.type));
      docs.appendChild(item);
    });
    panel.append(docsTitle, docs);
  }

  elements.search.addEventListener("input", (event) => {
    searchTerm = event.target.value;
    renderCountryList();
  });

  window.addEventListener("hashchange", () => {
    const nextHash = window.location.hash.replace("#", "");
    const dossierId = nextHash.startsWith("dossier-") ? nextHash.slice("dossier-".length) : "";
    if (dossierId) {
      openDossier(dossierId, false);
      return;
    }

    const nextId = nextHash;
    if (nextId && nextId !== selectedId) {
      activateCountry(nextId, false);
    }
  });

  const detailHeightObserver =
    "ResizeObserver" in window && elements.mapPanel ? new ResizeObserver(scheduleDetailHeightSync) : null;
  if (detailHeightObserver) {
    detailHeightObserver.observe(elements.mapPanel);
  }
  window.addEventListener("resize", scheduleDetailHeightSync);
  window.addEventListener("load", scheduleDetailHeightSync);

  renderStats();
  activateCountry(selectedId, false);
  if (initialDossierId && countryById.has(initialDossierId)) {
    renderDossier(initialDossierId, true);
  }
})();
