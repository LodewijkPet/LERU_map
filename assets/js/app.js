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
  const mapFeatureById = new Map(mapData.features.map((feature) => [feature.id, feature]));
  let activeView = initialHash === "timeline" ? "timeline" : initialHash === "nl-be-comparison" ? "comparison" : "system";
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
  const timelineCategories = [
    {
      id: "core-code",
      label: "Core codes",
      shortLabel: "Code",
      lane: "core",
      color: "#0b6b5f",
      description: "National or institutional codes, standards, principles and integrity guidance."
    },
    {
      id: "national-body",
      label: "National bodies",
      shortLabel: "Body",
      lane: "core",
      color: "#2f67b1",
      description: "National research-integrity, ombuds, attestation, advisory or ethics-in-science bodies."
    },
    {
      id: "law-regulation",
      label: "Law and regulation",
      shortLabel: "Law",
      lane: "core",
      color: "#9e3d36",
      description: "Acts, decrees, regulations, ministerial orders and formal legal transitions."
    },
    {
      id: "institutional-route",
      label: "Institutional routes",
      shortLabel: "Institution",
      lane: "core",
      color: "#167c8c",
      description: "University, academy, institute, RPO, RIO and committee procedures."
    },
    {
      id: "case-transparency",
      label: "Case transparency",
      shortLabel: "Transparency",
      lane: "core",
      color: "#b5962f",
      description: "Public decisions, case archives, annual statistics, recommendations and warning outputs."
    },
    {
      id: "funder-compliance",
      label: "Funder compliance",
      shortLabel: "Funder",
      lane: "core",
      color: "#7b4fa3",
      description: "Grant rules, project controls, sanctions, audit routes and funder reporting."
    },
    {
      id: "quality-degree",
      label: "Quality and degree routes",
      shortLabel: "Quality",
      lane: "boundary",
      color: "#566b84",
      description: "Quality assurance, accreditation, doctoral attestation and degree/title routes."
    },
    {
      id: "biomedical-ethics",
      label: "Biomedical ethics",
      shortLabel: "Biomedical",
      lane: "boundary",
      color: "#b84f77",
      description: "Clinical trials, medical research ethics, bioethics and health-research approval routes."
    },
    {
      id: "animal-research",
      label: "Animal research",
      shortLabel: "Animal",
      lane: "boundary",
      color: "#8b6238",
      description: "Animal experimentation, animal welfare approvals and enforcement routes."
    },
    {
      id: "data-ip-open",
      label: "Data, IP and open science",
      shortLabel: "Data/IP",
      lane: "boundary",
      color: "#3e6fbd",
      description: "Data protection, IP, open science, repositories, research data and AI governance."
    },
    {
      id: "major-case",
      label: "Major cases",
      shortLabel: "Case",
      lane: "core",
      color: "#2f3335",
      description: "Major misconduct cases, scandal reports, public inquiries and high-impact investigations."
    },
    {
      id: "other-boundary",
      label: "Other boundaries",
      shortLabel: "Boundary",
      lane: "boundary",
      color: "#68796e",
      description: "Adjacent regimes that define where the research-integrity route stops."
    },
    {
      id: "uncategorized",
      label: "Uncategorized",
      shortLabel: "Other",
      lane: "core",
      color: "#8b8f92",
      description: "Events still needing taxonomy cleanup."
    }
  ];
  const timelineCategoryById = new Map(timelineCategories.map((category) => [category.id, category]));

  const elements = {
    countryCount: document.getElementById("country-count"),
    documentCount: document.getElementById("document-count"),
    overviewCount: document.getElementById("overview-count"),
    systemView: document.getElementById("system-view"),
    timelineView: document.getElementById("timeline-view"),
    comparisonView: document.getElementById("comparison-view"),
    viewTabs: Array.from(document.querySelectorAll(".view-tab")),
    mapPanel: document.querySelector(".map-panel"),
    map: document.getElementById("europe-map"),
    detail: document.getElementById("country-detail"),
    grid: document.getElementById("country-grid"),
    search: document.getElementById("country-search"),
    dossier: document.getElementById("country-dossier"),
    timelineMap: document.getElementById("timeline-map"),
    timelinePlay: document.getElementById("timeline-play"),
    timelinePrev: document.getElementById("timeline-prev"),
    timelineNext: document.getElementById("timeline-next"),
    timelineSpeed: document.getElementById("timeline-speed"),
    timelineCategory: document.getElementById("timeline-category"),
    timelineLane: document.getElementById("timeline-lane"),
    timelineSearch: document.getElementById("timeline-search"),
    timelineReset: document.getElementById("timeline-reset"),
    timelineYearRange: document.getElementById("timeline-year-range"),
    timelineYearOutput: document.getElementById("timeline-year-output"),
    timelineYearLabel: document.getElementById("timeline-year-label"),
    timelineStats: document.getElementById("timeline-stats"),
    timelineHistogram: document.getElementById("timeline-histogram"),
    timelineLegend: document.getElementById("timeline-legend"),
    timelineEventPanel: document.getElementById("timeline-event-panel")
  };
  const allTimelineEvents = buildTimelineEvents();
  const timelineYearValues = allTimelineEvents
    .map((eventItem) => eventItem.startYear)
    .filter((year) => Number.isFinite(year) && year < 9999);
  const timelineBounds = {
    minYear: timelineYearValues.length ? Math.min(...timelineYearValues) : 1900,
    maxYear: timelineYearValues.length ? Math.max(...timelineYearValues) : new Date().getFullYear()
  };
  const timelineDatePositions = buildTimelineDatePositions(allTimelineEvents);
  const timelineState = {
    currentYear: timelineBounds.maxYear,
    currentDateKey: timelineDatePositions.length
      ? timelineDatePositions[timelineDatePositions.length - 1].dateKey
      : makeIsoDate(timelineBounds.maxYear, 1, 1),
    selectedCountryId: "",
    searchTerm: "",
    category: "all",
    lane: "all",
    isPlaying: false,
    timerId: null
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

  function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
  }

  function slugify(value) {
    return String(value || "")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "")
      .slice(0, 72);
  }

  function formatDatePart(value) {
    return String(value).padStart(2, "0");
  }

  function makeIsoDate(year, month, day) {
    return `${year}-${formatDatePart(month || 1)}-${formatDatePart(day || 1)}`;
  }

  function parseTimelineDate(dateText, index) {
    const text = String(dateText || "").trim();
    const lowerText = text.toLowerCase();
    const monthPattern = monthNames.join("|");
    const isoMatch = text.match(/\b(\d{4})-(\d{2})-(\d{2})\b/);
    if (isoMatch) {
      const year = Number(isoMatch[1]);
      const month = Number(isoMatch[2]);
      const day = Number(isoMatch[3]);
      return {
        startYear: year,
        startMonth: month,
        startDay: day,
        startDate: makeIsoDate(year, month, day),
        endYear: null,
        endDate: null,
        datePrecision: "day",
        isDateRange: false,
        sortValue: year * 10000 + month * 100 + day + index / 1000
      };
    }

    const dayMonthRange = lowerText.match(
      new RegExp(`\\b(\\d{1,2})\\s+(${monthPattern})\\s+(\\d{4})\\s*(?:-|\\u2013|\\u2014|to)\\s*(\\d{1,2})\\s+(${monthPattern})\\s+(\\d{4})\\b`)
    );
    if (dayMonthRange) {
      const startDay = Number(dayMonthRange[1]);
      const startMonth = monthNames.indexOf(dayMonthRange[2]) + 1;
      const startYear = Number(dayMonthRange[3]);
      const endDay = Number(dayMonthRange[4]);
      const endMonth = monthNames.indexOf(dayMonthRange[5]) + 1;
      const endYear = Number(dayMonthRange[6]);
      return {
        startYear,
        startMonth,
        startDay,
        startDate: makeIsoDate(startYear, startMonth, startDay),
        endYear,
        endDate: makeIsoDate(endYear, endMonth, endDay),
        datePrecision: "range",
        isDateRange: true,
        sortValue: startYear * 10000 + startMonth * 100 + startDay + index / 1000
      };
    }

    const sameMonthDayRange = lowerText.match(
      new RegExp(`\\b(\\d{1,2})\\s*(?:-|\\u2013|\\u2014|to)\\s*(\\d{1,2})\\s+(${monthPattern})\\s+(\\d{4})\\b`)
    );
    if (sameMonthDayRange) {
      const startDay = Number(sameMonthDayRange[1]);
      const endDay = Number(sameMonthDayRange[2]);
      const month = monthNames.indexOf(sameMonthDayRange[3]) + 1;
      const year = Number(sameMonthDayRange[4]);
      return {
        startYear: year,
        startMonth: month,
        startDay,
        startDate: makeIsoDate(year, month, startDay),
        endYear: year,
        endDate: makeIsoDate(year, month, endDay),
        datePrecision: "range",
        isDateRange: true,
        sortValue: year * 10000 + month * 100 + startDay + index / 1000
      };
    }

    const rangeMatch = lowerText.match(/\b(\d{4})\s*(?:-|\u2013|\u2014|to)\s*(\d{4})\b/);
    if (rangeMatch) {
      const startYear = Number(rangeMatch[1]);
      const endYear = Number(rangeMatch[2]);
      return {
        startYear,
        startMonth: 1,
        startDay: 1,
        startDate: makeIsoDate(startYear, 1, 1),
        endYear,
        endDate: makeIsoDate(endYear, 12, 31),
        datePrecision: "range",
        isDateRange: true,
        sortValue: startYear * 10000 + index / 1000
      };
    }

    const dayMonthYear = lowerText.match(new RegExp(`\\b(\\d{1,2})\\s+(${monthPattern})\\s+(\\d{4})\\b`));
    if (dayMonthYear) {
      const day = Number(dayMonthYear[1]);
      const month = monthNames.indexOf(dayMonthYear[2]) + 1;
      const year = Number(dayMonthYear[3]);
      return {
        startYear: year,
        startMonth: month,
        startDay: day,
        startDate: makeIsoDate(year, month, day),
        endYear: null,
        endDate: null,
        datePrecision: "day",
        isDateRange: false,
        sortValue: year * 10000 + month * 100 + day + index / 1000
      };
    }

    const monthYear = lowerText.match(new RegExp(`(${monthPattern})\\s+(\\d{4})`));
    if (monthYear) {
      const month = monthNames.indexOf(monthYear[1]) + 1;
      const year = Number(monthYear[2]);
      return {
        startYear: year,
        startMonth: month,
        startDay: 1,
        startDate: makeIsoDate(year, month, 1),
        endYear: null,
        endDate: null,
        datePrecision: "month",
        isDateRange: false,
        sortValue: year * 10000 + month * 100 + index / 1000
      };
    }

    const yearMatch = lowerText.match(/\d{4}/);
    const year = yearMatch ? Number(yearMatch[0]) : 9999;
    return {
      startYear: year,
      startMonth: 1,
      startDay: 1,
      startDate: year < 9999 ? makeIsoDate(year, 1, 1) : "",
      endYear: null,
      endDate: null,
      datePrecision: year < 9999 ? "year" : "unknown",
      isDateRange: false,
      sortValue: year * 10000 + index / 1000
    };
  }

  function timelineDateValue(dateKey) {
    return Number(String(dateKey || "").replace(/-/g, ""));
  }

  function timelineYearFromDateKey(dateKey) {
    const year = Number(String(dateKey || "").slice(0, 4));
    return Number.isFinite(year) ? year : timelineBounds.maxYear;
  }

  function formatTimelineDateLabel(dateKey) {
    const parts = String(dateKey || "").split("-").map(Number);
    if (parts.length !== 3 || parts.some((part) => !Number.isFinite(part))) return String(dateKey || "");
    const month = monthNames[parts[1] - 1] || "";
    const displayMonth = month ? `${month.charAt(0).toUpperCase()}${month.slice(1)}` : "";
    return `${parts[2]} ${displayMonth} ${parts[0]}`.trim();
  }

  function formatTimelineCompactDate(dateKey) {
    const parts = String(dateKey || "").split("-").map(Number);
    if (parts.length !== 3 || parts.some((part) => !Number.isFinite(part))) return String(dateKey || "");
    const month = monthNames[parts[1] - 1] || "";
    const displayMonth = month ? `${month.charAt(0).toUpperCase()}${month.slice(1, 3)}` : "";
    return `${parts[2]} ${displayMonth} ${parts[0]}`.trim();
  }

  function buildTimelineDatePositions(events) {
    const byDate = new Map();
    const countByYear = new Map();
    events.forEach((eventItem) => {
      if (!eventItem.startDate || !Number.isFinite(eventItem.startYear) || eventItem.startYear >= 9999) return;
      countByYear.set(eventItem.startYear, (countByYear.get(eventItem.startYear) || 0) + 1);
      if (!byDate.has(eventItem.startDate)) {
        byDate.set(eventItem.startDate, {
          dateKey: eventItem.startDate,
          year: eventItem.startYear,
          dateValue: timelineDateValue(eventItem.startDate),
          eventCount: 0,
          yearEventCount: 0
        });
      }
      byDate.get(eventItem.startDate).eventCount += 1;
    });
    return Array.from(byDate.values())
      .map((position) => Object.assign(position, { yearEventCount: countByYear.get(position.year) || position.eventCount }))
      .sort((left, right) => left.dateValue - right.dateValue);
  }

  function eventText(eventItem, country) {
    return [
      country && country.name,
      eventItem.date,
      eventItem.title,
      eventItem.type,
      eventItem.actors,
      eventItem.importance,
      eventItem.source,
      eventItem.sourceUrl
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();
  }

  function includesAny(text, terms) {
    return terms.some((term) => text.includes(term));
  }

  function normalizeTimelineCategory(eventItem, country) {
    const text = eventText(eventItem, country);
    if (includesAny(text, ["animal", "veterinary", "experiment authorisation", "experiment authorization"])) {
      return "animal-research";
    }
    if (
      includesAny(text, [
        "clinical trial",
        "clinical trials",
        "biomedical",
        "bioethics",
        "medical ethics",
        "health ethics",
        "human research",
        "research ethics committee",
        "metc",
        "rec "
      ])
    ) {
      return "biomedical-ethics";
    }
    if (
      includesAny(text, [
        "data protection",
        "personal data",
        "gdpr",
        "privacy",
        "ip ",
        "intellectual property",
        "copyright",
        "open science",
        "open access",
        "repository",
        "data management",
        "dmp",
        "fair",
        "ai "
      ])
    ) {
      return "data-ip-open";
    }
    if (
      includesAny(text, [
        "case archive",
        "case publication",
        "public decision",
        "public decisions",
        "decision archive",
        "annual statistics",
        "annual report",
        "published decision",
        "warning statement",
        "transparency practice",
        "public reporting"
      ])
    ) {
      return "case-transparency";
    }
    if (includesAny(text, ["major integrity event", "fraud", "scandal", "macchiarini", "stapel", "public inquiry"])) {
      return "major-case";
    }
    const looksInstitutional = includesAny(text, ["university", "faculty", "institutional", "institute"]);
    const bodyCreation =
      includesAny(text, ["established", "created", "launched", "appointed", "mandate"]) &&
      includesAny(text, ["ombuds", "committee", "council", "commission", "office", "authority", "agency", "body", "lowi"]);
    if (
      includesAny(text, [
        "national body",
        "national committee",
        "national council",
        "national ethics",
        "national integrity",
        "research integrity body"
      ]) ||
      (bodyCreation && !looksInstitutional)
    ) {
      return "national-body";
    }
    if (
      includesAny(text, [
        "code",
        "conduct",
        "guideline",
        "guidelines",
        "principles",
        "recommendation",
        "recommendations",
        "standards",
        "charter"
      ])
    ) {
      return "core-code";
    }
    if (
      includesAny(text, [
        "funder",
        "funding",
        "grant",
        "project-stage",
        "project stage",
        "audit",
        "default",
        "termination",
        "research council"
      ])
    ) {
      return "funder-compliance";
    }
    if (
      includesAny(text, [
        "quality assurance",
        "accreditation",
        "doctoral",
        "degree",
        "title revocation",
        "attestation",
        "habilitation"
      ])
    ) {
      return "quality-degree";
    }
    if (
      includesAny(text, [
        "university",
        "institutional",
        "institute",
        "academy",
        "committee",
        "procedure",
        "rio",
        "complaint route"
      ])
    ) {
      return "institutional-route";
    }
    if (includesAny(text, ["law", "act", "decree", "regulation", "ordinance", "ministerial order", "government decision"])) {
      return "law-regulation";
    }
    if (includesAny(text, ["whistle", "employment", "corruption", "security", "safety"])) {
      return "other-boundary";
    }
    return "uncategorized";
  }

  function normalizeTimelineLevel(eventItem, categoryId) {
    const text = eventText(eventItem, null);
    if (categoryId === "funder-compliance" || includesAny(text, ["funder", "grant", "funding"])) return "funder";
    if (
      ["biomedical-ethics", "animal-research", "data-ip-open", "quality-degree", "other-boundary"].includes(categoryId)
    ) {
      return "boundary";
    }
    if (categoryId === "major-case" || includesAny(text, ["case", "fraud", "scandal"])) return "case";
    if (includesAny(text, ["university", "institution", "institute", "faculty"])) return "institutional";
    if (includesAny(text, ["national", "law", "ministry", "government", "council", "commission"])) return "national";
    return "unknown";
  }

  function makeTimelineShortTitle(title) {
    const text = String(title || "Untitled event").replace(/\s+/g, " ").trim();
    if (text.length <= 64) return text;
    const compact = text
      .replace(/^new\s+/i, "")
      .replace(/\s+for\s+research\s+integrity/i, "")
      .replace(/\s+on\s+research\s+integrity/i, "");
    if (compact.length <= 64) return compact;
    return `${compact.slice(0, 61).trim()}...`;
  }

  function isFutureTimelineDate(startDate) {
    if (!startDate) return false;
    const eventDate = new Date(`${startDate}T00:00:00`);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return !Number.isNaN(eventDate.getTime()) && eventDate > today;
  }

  function buildTimelineEvents() {
    const events = [];
    countries.forEach((country) => {
      const timeline = (country.dossierDetails && country.dossierDetails.timeline) || [];
      timeline.forEach((eventItem, index) => {
        const parsedDate = parseTimelineDate(eventItem.date, index);
        const normalizedCategory = normalizeTimelineCategory(eventItem, country);
        const category = timelineCategoryById.get(normalizedCategory) || timelineCategoryById.get("uncategorized");
        events.push({
          id: `${country.id}-${index}-${slugify(eventItem.title || eventItem.date || "timeline-event")}`,
          countryId: country.id,
          countryName: country.name,
          shortName: country.shortName,
          mapId: country.mapId,
          region: country.region,
          originalDate: eventItem.date || "",
          startYear: parsedDate.startYear,
          startDate: parsedDate.startDate,
          endYear: parsedDate.endYear,
          endDate: parsedDate.endDate,
          datePrecision: parsedDate.datePrecision,
          isDateRange: parsedDate.isDateRange,
          isFutureDated: isFutureTimelineDate(parsedDate.startDate),
          sortValue: parsedDate.sortValue,
          title: eventItem.title || "Untitled event",
          shortTitle: makeTimelineShortTitle(eventItem.title),
          type: eventItem.type || "Unclassified",
          normalizedCategory,
          categoryLabel: category.label,
          categoryShortLabel: category.shortLabel,
          categoryColor: category.color,
          lane: category.lane,
          level: normalizeTimelineLevel(eventItem, normalizedCategory),
          actors: eventItem.actors || "",
          importance: eventItem.importance || "",
          source: eventItem.source || "",
          sourceUrl: eventItem.sourceUrl || "",
          hasSourceUrl: Boolean(eventItem.sourceUrl)
        });
      });
    });
    return events.sort((left, right) => left.sortValue - right.sortValue || left.countryName.localeCompare(right.countryName));
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
    if (updateHash) setActiveView("system", false);
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

  function setActiveView(view, updateHash) {
    activeView = view === "timeline" ? "timeline" : view === "comparison" ? "comparison" : "system";
    if (elements.systemView) elements.systemView.hidden = activeView !== "system";
    if (elements.timelineView) elements.timelineView.hidden = activeView !== "timeline";
    if (elements.comparisonView) elements.comparisonView.hidden = activeView !== "comparison";
    elements.viewTabs.forEach((tab) => {
      const isActive = tab.dataset.view === activeView;
      tab.classList.toggle("is-active", isActive);
      tab.setAttribute("aria-selected", isActive ? "true" : "false");
    });

    if (activeView === "timeline") {
      closeDossier();
      renderTimelineExplorer();
      if (updateHash) window.history.replaceState(null, "", "#timeline");
    } else if (activeView === "comparison") {
      closeDossier();
      setTimelinePlaying(false);
      if (updateHash) window.history.replaceState(null, "", "#nl-be-comparison");
    } else {
      setTimelinePlaying(false);
      if (updateHash && (window.location.hash === "#timeline" || window.location.hash === "#nl-be-comparison")) {
        window.history.replaceState(null, "", "#country-detail");
      }
      scheduleDetailHeightSync();
    }
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

  function timelineCategory(categoryId) {
    return timelineCategoryById.get(categoryId) || timelineCategoryById.get("uncategorized");
  }

  function timelineSearchableText(eventItem) {
    return [
      eventItem.countryName,
      eventItem.shortName,
      eventItem.region,
      eventItem.originalDate,
      eventItem.title,
      eventItem.type,
      eventItem.categoryLabel,
      eventItem.actors,
      eventItem.importance,
      eventItem.source,
      eventItem.sourceUrl
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();
  }

  function getFilteredTimelineEvents() {
    const query = timelineState.searchTerm.trim().toLowerCase();
    return allTimelineEvents.filter((eventItem) => {
      if (timelineState.selectedCountryId && eventItem.countryId !== timelineState.selectedCountryId) return false;
      if (timelineState.category !== "all" && eventItem.normalizedCategory !== timelineState.category) return false;
      if (timelineState.lane !== "all" && eventItem.lane !== timelineState.lane) return false;
      return !query || timelineSearchableText(eventItem).includes(query);
    });
  }

  function timelineDatePositionsForEvents(events) {
    return buildTimelineDatePositions(events);
  }

  function timelineDateKeyForYear(events, year, mode) {
    const positions = timelineDatePositionsForEvents(events).filter((position) => position.year === year);
    if (!positions.length) return "";
    return mode === "latest" ? positions[positions.length - 1].dateKey : positions[0].dateKey;
  }

  function timelineNearestDateKey(events, currentDateKey, direction) {
    const positions = timelineDatePositionsForEvents(events);
    if (!positions.length) return "";
    const currentValue = timelineDateValue(currentDateKey);
    if (!currentValue) return direction >= 0 ? positions[0].dateKey : positions[positions.length - 1].dateKey;
    const nextPosition =
      direction >= 0
        ? positions.find((position) => position.dateValue > currentValue)
        : positions
            .slice()
            .reverse()
            .find((position) => position.dateValue < currentValue);
    return nextPosition ? nextPosition.dateKey : "";
  }

  function setTimelineDateKey(dateKey) {
    timelineState.currentDateKey = dateKey || "";
    if (dateKey) {
      timelineState.currentYear = timelineYearFromDateKey(dateKey);
    }
  }

  function setTimelineYear(year, events, mode) {
    timelineState.currentYear = year;
    timelineState.currentDateKey =
      timelineDateKeyForYear(events, year, mode || "latest") ||
      makeIsoDate(year, mode === "first" ? 1 : 12, mode === "first" ? 1 : 31);
  }

  function snapTimelineDateToFilteredEvents() {
    const filteredEvents = getFilteredTimelineEvents();
    if (!filteredEvents.length) return;
    if (filteredEvents.some((eventItem) => eventItem.startDate === timelineState.currentDateKey)) return;
    const sameYearDateKey = timelineDateKeyForYear(filteredEvents, timelineState.currentYear, "latest");
    const nearestDateKey =
      sameYearDateKey ||
      timelineNearestDateKey(filteredEvents, timelineState.currentDateKey, 1) ||
      timelineNearestDateKey(filteredEvents, timelineState.currentDateKey, -1);
    if (nearestDateKey) setTimelineDateKey(nearestDateKey);
  }

  function eventsForTimelineYear(events, year) {
    return events.filter((eventItem) => eventItem.startYear === year);
  }

  function eventsForTimelineDate(events, dateKey) {
    if (!dateKey) return eventsForTimelineYear(events, timelineState.currentYear);
    return events.filter((eventItem) => eventItem.startDate === dateKey);
  }

  function cumulativeTimelineCountryIds(events, dateKey) {
    const currentDateValue = dateKey ? timelineDateValue(dateKey) : timelineState.currentYear * 10000 + 1231;
    return new Set(
      events
        .filter((eventItem) => {
          if (!Number.isFinite(eventItem.startYear) || eventItem.startYear >= 9999) return false;
          if (!eventItem.startDate) return eventItem.startYear <= timelineState.currentYear;
          return timelineDateValue(eventItem.startDate) <= currentDateValue;
        })
        .map((eventItem) => eventItem.countryId)
    );
  }

  function groupTimelineEventsByCountry(events) {
    const grouped = new Map();
    events.forEach((eventItem) => {
      if (!grouped.has(eventItem.countryId)) grouped.set(eventItem.countryId, []);
      grouped.get(eventItem.countryId).push(eventItem);
    });
    return grouped;
  }

  function timelineCountryPosition(country) {
    const feature = mapFeatureById.get(country.mapId);
    if (!feature) return null;
    const offset = markerOffsets[country.mapId] || [0, 0];
    return {
      feature,
      x: feature.centroid[0] + offset[0],
      y: feature.centroid[1] + offset[1]
    };
  }

  function activateTimelineCountry(countryId) {
    if (!countryById.has(countryId)) return;
    selectedId = countryId;
    timelineState.selectedCountryId = timelineState.selectedCountryId === countryId ? "" : countryId;
    setTimelinePlaying(false);
    snapTimelineDateToFilteredEvents();
    renderTimelineExplorer();
  }

  function bindTimelineCountryActivation(element, countryId) {
    element.addEventListener("click", () => activateTimelineCountry(countryId));
    element.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        activateTimelineCountry(countryId);
      }
    });
  }

  function timelineCalloutPriority(eventItem) {
    const priority = [
      "national-body",
      "core-code",
      "case-transparency",
      "law-regulation",
      "major-case",
      "funder-compliance",
      "institutional-route",
      "quality-degree",
      "biomedical-ethics",
      "animal-research",
      "data-ip-open",
      "other-boundary",
      "uncategorized"
    ];
    const index = priority.indexOf(eventItem.normalizedCategory);
    return index >= 0 ? index : priority.length;
  }

  function truncateTimelineCalloutLine(text, maxChars) {
    const cleanText = String(text || "").trim();
    if (cleanText.length <= maxChars) return cleanText;
    if (maxChars <= 3) return cleanText.slice(0, maxChars);
    return `${cleanText.slice(0, maxChars - 3).trim()}...`;
  }

  function wrapTimelineCalloutText(value, maxChars, maxLines) {
    const text = String(value || "").replace(/\s+/g, " ").trim();
    if (!text) return [];
    const words = text.split(" ");
    const lines = [];
    let line = "";
    let truncated = false;

    for (const word of words) {
      const chunks = word.length > maxChars ? word.match(new RegExp(`.{1,${maxChars}}`, "g")) || [word] : [word];
      for (const chunk of chunks) {
        const candidate = line ? `${line} ${chunk}` : chunk;
        if (candidate.length <= maxChars) {
          line = candidate;
          continue;
        }
        if (line) {
          lines.push(line);
          line = chunk;
        } else {
          lines.push(chunk);
          line = "";
        }
        if (lines.length >= maxLines) {
          truncated = true;
          line = "";
          break;
        }
      }
      if (truncated) break;
    }

    if (!truncated && line) lines.push(line);
    if (lines.length > maxLines) {
      lines.length = maxLines;
      truncated = true;
    }
    if (truncated && lines.length) {
      lines[lines.length - 1] = truncateTimelineCalloutLine(lines[lines.length - 1], maxChars);
    }
    return lines.map((item) => truncateTimelineCalloutLine(item, maxChars));
  }

  function appendTimelineCalloutLines(textElement, lines, className, firstDy, nextDy) {
    lines.forEach((line, lineIndex) => {
      const attrs = { class: className, x: "12" };
      if (textElement.childNodes.length) attrs.dy = lineIndex === 0 ? firstDy : nextDy;
      const tspan = createSvg("tspan", attrs);
      tspan.textContent = line;
      textElement.appendChild(tspan);
    });
  }

  function appendTimelineCallout(parent, eventItem, index) {
    const country = countryById.get(eventItem.countryId);
    const position = country && timelineCountryPosition(country);
    if (!position) return;

    const width = 248;
    const metaLines = wrapTimelineCalloutText(`${eventItem.originalDate} | ${eventItem.countryName}`, 35, 1);
    const titleLines = wrapTimelineCalloutText(eventItem.shortTitle, 31, 2);
    const categoryLines = wrapTimelineCalloutText(eventItem.categoryLabel, 31, 1);
    const height = 28 + metaLines.length * 13 + titleLines.length * 16 + categoryLines.length * 14;
    const rightSide = position.x < mapData.width * 0.52;
    const x = clamp(rightSide ? position.x + 42 : position.x - width - 42, 12, mapData.width - width - 12);
    const y = clamp(position.y - height / 2 + (index % 3) * 18, 18, mapData.height - height - 18);
    const lineEndX = rightSide ? x : x + width;
    const lineEndY = y + Math.min(38, height - 18);

    parent.appendChild(
      createSvg("line", {
        class: "timeline-leader-line",
        x1: position.x,
        y1: position.y,
        x2: lineEndX,
        y2: lineEndY,
        style: `--timeline-color: ${eventItem.categoryColor}`
      })
    );

    const callout = createSvg("g", {
      class: "timeline-callout",
      transform: `translate(${x} ${y})`,
      style: `--timeline-color: ${eventItem.categoryColor}`
    });
    callout.appendChild(createSvg("rect", { width, height, rx: "8", ry: "8" }));

    const clipId = `timeline-callout-clip-${eventItem.id}-${index}`;
    const clipPath = createSvg("clipPath", { id: clipId });
    clipPath.appendChild(createSvg("rect", { x: "8", y: "8", width: width - 16, height: height - 16, rx: "6", ry: "6" }));
    callout.appendChild(clipPath);

    const text = createSvg("text", {
      class: "timeline-callout-text",
      x: "12",
      y: "19",
      "clip-path": `url(#${clipId})`
    });
    appendTimelineCalloutLines(text, metaLines, "timeline-callout-meta", "0", "13");
    appendTimelineCalloutLines(text, titleLines, "timeline-callout-title", "20", "16");
    appendTimelineCalloutLines(text, categoryLines, "timeline-callout-category", "18", "14");
    callout.appendChild(text);
    parent.appendChild(callout);
  }

  function renderTimelineMap(filteredEvents, activeEvents) {
    const svg = elements.timelineMap;
    if (!svg) return;
    svg.replaceChildren();
    svg.setAttribute("viewBox", `0 0 ${mapData.width} ${mapData.height}`);
    svg.setAttribute("preserveAspectRatio", "xMidYMid meet");

    const cumulativeCountryIds = cumulativeTimelineCountryIds(filteredEvents, timelineState.currentDateKey);
    const activeByCountry = groupTimelineEventsByCountry(activeEvents);
    const shapeGroup = createSvg("g");
    const pulseGroup = createSvg("g", { "aria-hidden": "true" });
    const markerGroup = createSvg("g", { "aria-label": "Timeline countries" });
    const calloutGroup = createSvg("g", { class: "timeline-callout-layer", "aria-hidden": "true" });

    mapData.features.forEach((feature) => {
      const country = countryByMapId.get(feature.id);
      const countryActiveEvents = country ? activeByCountry.get(country.id) || [] : [];
      const activeEvent = countryActiveEvents[0];
      const path = createSvg("path", {
        d: feature.path,
        class: [
          "timeline-country-shape",
          country ? "in-system" : "",
          country && cumulativeCountryIds.has(country.id) ? "has-recorded" : "",
          activeEvent ? "is-active" : "",
          country && country.id === timelineState.selectedCountryId ? "is-selected" : ""
        ]
          .filter(Boolean)
          .join(" "),
        style: activeEvent ? `--timeline-color: ${activeEvent.categoryColor}` : ""
      });

      const title = createSvg("title");
      title.textContent = country
        ? `${country.name}: ${countryActiveEvents.length || 0} events on ${formatTimelineDateLabel(timelineState.currentDateKey) || timelineState.currentYear}`
        : feature.name;
      path.appendChild(title);

      if (country) {
        path.setAttribute("role", "button");
        path.setAttribute("tabindex", "0");
        path.setAttribute("aria-label", `${country.name}, timeline filter`);
        bindTimelineCountryActivation(path, country.id);
      }
      shapeGroup.appendChild(path);
    });

    countries.forEach((country) => {
      const position = timelineCountryPosition(country);
      if (!position) return;
      const countryActiveEvents = activeByCountry.get(country.id) || [];
      const activeEvent = countryActiveEvents[0];
      const hasRecorded = cumulativeCountryIds.has(country.id);

      if (activeEvent) {
        pulseGroup.appendChild(
          createSvg("circle", {
            class: "timeline-event-pulse",
            cx: position.x,
            cy: position.y,
            r: "25",
            style: `--timeline-color: ${activeEvent.categoryColor}`
          })
        );
      }

      const marker = createSvg("g", {
        class: [
          "timeline-country-marker",
          hasRecorded ? "has-recorded" : "",
          activeEvent ? "is-active" : "",
          country.id === timelineState.selectedCountryId ? "is-selected" : ""
        ]
          .filter(Boolean)
          .join(" "),
        role: "button",
        tabindex: "0",
        "aria-label": `${country.name}, timeline filter`,
        transform: `translate(${position.x} ${position.y})`,
        style: activeEvent ? `--timeline-color: ${activeEvent.categoryColor}` : ""
      });
      marker.appendChild(createSvg("circle", { r: activeEvent ? "20" : "15" }));
      const label = createSvg("text", { x: "0", y: "5" });
      label.textContent = country.shortName;
      marker.appendChild(label);
      bindTimelineCountryActivation(marker, country.id);
      markerGroup.appendChild(marker);
    });

    const calloutEvents = Array.from(activeByCountry.values())
      .map((eventList) => eventList.slice().sort((left, right) => timelineCalloutPriority(left) - timelineCalloutPriority(right))[0])
      .sort((left, right) => timelineCalloutPriority(left) - timelineCalloutPriority(right) || left.countryName.localeCompare(right.countryName))
      .slice(0, 5);
    calloutEvents.forEach((eventItem, index) => appendTimelineCallout(calloutGroup, eventItem, index));

    svg.append(shapeGroup, pulseGroup, markerGroup, calloutGroup);
  }

  function renderTimelineStats(filteredEvents, activeEvents) {
    const currentDateLabel = formatTimelineDateLabel(timelineState.currentDateKey);
    const yearEventCount = eventsForTimelineYear(filteredEvents, timelineState.currentYear).length;
    if (elements.timelineYearLabel) {
      elements.timelineYearLabel.textContent = currentDateLabel
        ? `Events on ${currentDateLabel}`
        : `Events in ${timelineState.currentYear}`;
    }
    if (elements.timelineYearOutput) {
      elements.timelineYearOutput.textContent = currentDateLabel
        ? formatTimelineCompactDate(timelineState.currentDateKey)
        : String(timelineState.currentYear);
    }
    if (elements.timelineYearRange) {
      elements.timelineYearRange.value = String(timelineState.currentYear);
    }
    if (!elements.timelineStats) return;
    elements.timelineStats.replaceChildren();
    [
      `${allTimelineEvents.length} total events`,
      `${filteredEvents.length} after filters`,
      `${activeEvents.length} on date`,
      `${yearEventCount} in ${timelineState.currentYear}`,
      timelineState.selectedCountryId && countryById.get(timelineState.selectedCountryId)
        ? countryById.get(timelineState.selectedCountryId).name
        : ""
    ]
      .filter(Boolean)
      .forEach((label) => elements.timelineStats.appendChild(createElement("span", "pill", label)));
  }

  function renderTimelineLegend() {
    if (!elements.timelineLegend) return;
    elements.timelineLegend.replaceChildren();
    timelineCategories.forEach((category) => {
      const item = createElement("span", "timeline-legend-item");
      item.style.setProperty("--timeline-color", category.color);
      item.append(createElement("i"), document.createTextNode(category.label));
      elements.timelineLegend.appendChild(item);
    });
  }

  function renderTimelineHistogram(filteredEvents) {
    if (!elements.timelineHistogram) return;
    elements.timelineHistogram.replaceChildren();
    const countByYear = new Map();
    filteredEvents.forEach((eventItem) => {
      countByYear.set(eventItem.startYear, (countByYear.get(eventItem.startYear) || 0) + 1);
    });
    const maxCount = Math.max(1, ...Array.from(countByYear.values()));

    for (let year = timelineBounds.minYear; year <= timelineBounds.maxYear; year += 1) {
      const count = countByYear.get(year) || 0;
      const button = createElement("button", "timeline-year-bar");
      button.type = "button";
      button.classList.toggle("is-active", year === timelineState.currentYear);
      button.setAttribute("aria-label", `${year}: ${count} timeline events`);
      button.title = `${year}: ${count} events`;
      button.addEventListener("click", () => {
        setTimelineYear(year, filteredEvents, "latest");
        setTimelinePlaying(false);
        renderTimelineExplorer();
      });
      const fill = createElement("span", "timeline-year-bar-fill");
      fill.style.height = count ? `${Math.max(8, Math.round((count / maxCount) * 100))}%` : "0";
      button.appendChild(fill);
      elements.timelineHistogram.appendChild(button);
    }
  }

  function renderTimelineEventCard(eventItem) {
    const card = createElement("article", "timeline-event-card");
    card.style.setProperty("--timeline-color", eventItem.categoryColor);
    const header = createElement("header");
    header.append(createElement("h4", "", eventItem.title), createElement("time", "", eventItem.originalDate));

    const meta = createElement("div", "timeline-meta");
    [
      eventItem.countryName,
      eventItem.categoryLabel,
      eventItem.type,
      eventItem.datePrecision === "range" ? "Date range" : "",
      eventItem.isFutureDated ? "Scheduled/future" : ""
    ]
      .filter(Boolean)
      .forEach((label) => meta.appendChild(createElement("span", "pill", label)));

    card.append(header, meta);
    if (eventItem.actors) card.appendChild(createElement("p", "timeline-event-actors", eventItem.actors));
    if (eventItem.importance) card.appendChild(createElement("p", "", eventItem.importance));

    const actions = createElement("div", "timeline-event-actions");
    const countryButton = createActionButton("Show country", "card-action secondary-action");
    countryButton.addEventListener("click", () => {
      timelineState.selectedCountryId = eventItem.countryId;
      selectedId = eventItem.countryId;
      setTimelinePlaying(false);
      renderTimelineExplorer();
    });
    const dossierButton = createActionButton("Open dossier", "card-action primary-action");
    dossierButton.addEventListener("click", () => openDossier(eventItem.countryId));
    actions.append(countryButton, dossierButton);

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
      card.appendChild(source);
    }

    card.appendChild(actions);
    return card;
  }

  function renderTimelineEventPanel(filteredEvents, activeEvents) {
    const panel = elements.timelineEventPanel;
    if (!panel) return;
    panel.replaceChildren();

    const currentDateLabel = formatTimelineDateLabel(timelineState.currentDateKey);
    const header = createElement("div", "timeline-event-panel-header");
    header.append(
      createElement("p", "eyebrow", "Active events"),
      createElement("h3", "", currentDateLabel || `${timelineState.currentYear}`)
    );
    if (timelineState.selectedCountryId) {
      const country = countryById.get(timelineState.selectedCountryId);
      const clearButton = createActionButton(`Clear ${country ? country.name : "country"}`, "card-action secondary-action");
      clearButton.addEventListener("click", () => {
        timelineState.selectedCountryId = "";
        renderTimelineExplorer();
      });
      header.appendChild(clearButton);
    }
    panel.appendChild(header);

    const summary = createElement("p", "timeline-panel-summary");
    summary.textContent = activeEvents.length
      ? `${activeEvents.length} matching event${activeEvents.length === 1 ? "" : "s"} recorded on this date.`
      : "No matching events are recorded on this date.";
    panel.appendChild(summary);

    if (activeEvents.length) {
      const grouped = groupTimelineEventsByCountry(activeEvents);
      grouped.forEach((events, countryId) => {
        const country = countryById.get(countryId);
        const group = createElement("section", "timeline-event-group");
        group.appendChild(createElement("h4", "", `${country ? country.name : countryId} (${events.length})`));
        events
          .slice()
          .sort((left, right) => left.sortValue - right.sortValue)
          .forEach((eventItem) => group.appendChild(renderTimelineEventCard(eventItem)));
        panel.appendChild(group);
      });
      return;
    }

    const priorEvents = filteredEvents
      .filter((eventItem) => timelineDateValue(eventItem.startDate) < timelineDateValue(timelineState.currentDateKey))
      .slice(-5)
      .reverse();
    if (priorEvents.length) {
      panel.appendChild(createElement("h4", "", "Latest earlier matches"));
      priorEvents.forEach((eventItem) => panel.appendChild(renderTimelineEventCard(eventItem)));
    }
  }

  function renderTimelineExplorer() {
    const filteredEvents = getFilteredTimelineEvents();
    const activeEvents = eventsForTimelineDate(filteredEvents, timelineState.currentDateKey);
    renderTimelineStats(filteredEvents, activeEvents);
    renderTimelineMap(filteredEvents, activeEvents);
    renderTimelineHistogram(filteredEvents);
    renderTimelineLegend();
    renderTimelineEventPanel(filteredEvents, activeEvents);
  }

  function timelineDateKeysWithEvents() {
    return timelineDatePositionsForEvents(getFilteredTimelineEvents()).map((position) => position.dateKey);
  }

  function stepTimelineDate(direction) {
    const filteredEvents = getFilteredTimelineEvents();
    const nextDateKey = timelineNearestDateKey(filteredEvents, timelineState.currentDateKey, direction);
    if (!nextDateKey) return false;
    setTimelineDateKey(nextDateKey);
    renderTimelineExplorer();
    return true;
  }

  function timelinePlaybackDelay(filteredEvents) {
    const baseDelay = Number(elements.timelineSpeed && elements.timelineSpeed.value) || 750;
    const activeEvents = eventsForTimelineDate(filteredEvents, timelineState.currentDateKey);
    const yearEventCount = Math.max(1, eventsForTimelineYear(filteredEvents, timelineState.currentYear).length);
    const sameDateCount = Math.max(1, activeEvents.length);
    const densityMultiplier = clamp(1 + Math.log2(yearEventCount) / 6 + (sameDateCount - 1) * 0.12, 1, 2.75);
    return Math.round(baseDelay * densityMultiplier);
  }

  function queueTimelinePlaybackStep() {
    const filteredEvents = getFilteredTimelineEvents();
    timelineState.timerId = window.setTimeout(() => {
      if (!stepTimelineDate(1)) {
        setTimelinePlaying(false);
        return;
      }
      if (timelineState.isPlaying) queueTimelinePlaybackStep();
    }, timelinePlaybackDelay(filteredEvents));
  }

  function setTimelinePlaying(isPlaying) {
    if (timelineState.timerId) {
      window.clearTimeout(timelineState.timerId);
      timelineState.timerId = null;
    }
    timelineState.isPlaying = Boolean(isPlaying);
    if (elements.timelinePlay) elements.timelinePlay.textContent = timelineState.isPlaying ? "Pause" : "Play";
    if (!timelineState.isPlaying) return;

    const playableDateKeys = timelineDateKeysWithEvents();
    if (!playableDateKeys.length) {
      setTimelinePlaying(false);
      return;
    }
    if (!playableDateKeys.some((dateKey) => timelineDateValue(dateKey) > timelineDateValue(timelineState.currentDateKey))) {
      setTimelineDateKey(playableDateKeys[0]);
      renderTimelineExplorer();
    }
    queueTimelinePlaybackStep();
  }

  function resetTimelineFilters() {
    timelineState.currentYear = timelineBounds.maxYear;
    timelineState.currentDateKey = timelineDatePositions.length
      ? timelineDatePositions[timelineDatePositions.length - 1].dateKey
      : makeIsoDate(timelineBounds.maxYear, 1, 1);
    timelineState.selectedCountryId = "";
    timelineState.searchTerm = "";
    timelineState.category = "all";
    timelineState.lane = "all";
    setTimelinePlaying(false);
    if (elements.timelineSearch) elements.timelineSearch.value = "";
    if (elements.timelineCategory) elements.timelineCategory.value = "all";
    if (elements.timelineLane) elements.timelineLane.value = "all";
    renderTimelineExplorer();
  }

  function initializeTimelineControls() {
    if (elements.timelineYearRange) {
      elements.timelineYearRange.min = String(timelineBounds.minYear);
      elements.timelineYearRange.max = String(timelineBounds.maxYear);
      elements.timelineYearRange.value = String(timelineState.currentYear);
    }

    if (elements.timelineCategory) {
      elements.timelineCategory.replaceChildren();
      const allOption = createElement("option", "", "All categories");
      allOption.value = "all";
      elements.timelineCategory.appendChild(allOption);
      timelineCategories.forEach((category) => {
        const option = createElement("option", "", category.label);
        option.value = category.id;
        elements.timelineCategory.appendChild(option);
      });
    }
  }

  function bindTimelineControls() {
    elements.viewTabs.forEach((tab) => {
      tab.addEventListener("click", () => setActiveView(tab.dataset.view, true));
    });
    if (elements.timelinePlay) {
      elements.timelinePlay.addEventListener("click", () => setTimelinePlaying(!timelineState.isPlaying));
    }
    if (elements.timelinePrev) {
      elements.timelinePrev.addEventListener("click", () => {
        setTimelinePlaying(false);
        stepTimelineDate(-1);
      });
    }
    if (elements.timelineNext) {
      elements.timelineNext.addEventListener("click", () => {
        setTimelinePlaying(false);
        stepTimelineDate(1);
      });
    }
    if (elements.timelineSpeed) {
      elements.timelineSpeed.addEventListener("change", () => {
        if (timelineState.isPlaying) setTimelinePlaying(true);
      });
    }
    if (elements.timelineCategory) {
      elements.timelineCategory.addEventListener("change", (event) => {
        timelineState.category = event.target.value;
        setTimelinePlaying(false);
        snapTimelineDateToFilteredEvents();
        renderTimelineExplorer();
      });
    }
    if (elements.timelineLane) {
      elements.timelineLane.addEventListener("change", (event) => {
        timelineState.lane = event.target.value;
        setTimelinePlaying(false);
        snapTimelineDateToFilteredEvents();
        renderTimelineExplorer();
      });
    }
    if (elements.timelineSearch) {
      elements.timelineSearch.addEventListener("input", (event) => {
        timelineState.searchTerm = event.target.value;
        setTimelinePlaying(false);
        snapTimelineDateToFilteredEvents();
        renderTimelineExplorer();
      });
    }
    if (elements.timelineReset) {
      elements.timelineReset.addEventListener("click", resetTimelineFilters);
    }
    if (elements.timelineYearRange) {
      elements.timelineYearRange.addEventListener("input", (event) => {
        setTimelineYear(Number(event.target.value), getFilteredTimelineEvents(), "latest");
        setTimelinePlaying(false);
        renderTimelineExplorer();
      });
    }
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
    setActiveView("system", false);
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
    if (nextHash === "timeline") {
      setActiveView("timeline", false);
      return;
    }
    if (nextHash === "nl-be-comparison") {
      setActiveView("comparison", false);
      return;
    }
    if (nextHash === "country-list" || nextHash === "country-detail") {
      setActiveView("system", false);
      window.requestAnimationFrame(() => {
        const target = document.getElementById(nextHash);
        if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
      });
      return;
    }
    const dossierId = nextHash.startsWith("dossier-") ? nextHash.slice("dossier-".length) : "";
    if (dossierId) {
      setActiveView("system", false);
      openDossier(dossierId, false);
      return;
    }

    const nextId = nextHash;
    if (nextId && nextId !== selectedId) {
      setActiveView("system", false);
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

  initializeTimelineControls();
  bindTimelineControls();
  renderStats();
  activateCountry(selectedId, false);
  renderTimelineExplorer();
  if (initialDossierId && countryById.has(initialDossierId)) {
    renderDossier(initialDossierId, true);
  } else {
    setActiveView(activeView, false);
  }
})();
