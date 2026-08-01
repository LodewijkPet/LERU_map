import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const SCRIPT_DIR = path.dirname(fileURLToPath(import.meta.url));

export const REPO_ROOT = path.resolve(SCRIPT_DIR, "..");
export const DEFAULT_ACCESS_DATE = "2026-07-30";

export function parseArgs(argv) {
  const result = { _: [] };
  for (let index = 0; index < argv.length; index += 1) {
    const token = argv[index];
    if (!token.startsWith("--")) {
      result._.push(token);
      continue;
    }
    const equalsIndex = token.indexOf("=");
    if (equalsIndex !== -1) {
      result[token.slice(2, equalsIndex)] = token.slice(equalsIndex + 1);
      continue;
    }
    const key = token.slice(2);
    const next = argv[index + 1];
    if (next !== undefined && !next.startsWith("--")) {
      result[key] = next;
      index += 1;
    } else {
      result[key] = true;
    }
  }
  return result;
}

export function ensureDirectory(directoryPath) {
  fs.mkdirSync(directoryPath, { recursive: true });
}

export function toPosixPath(value) {
  return value.split(path.sep).join("/");
}

export function relativeToRoot(filePath, root = REPO_ROOT) {
  return toPosixPath(path.relative(root, filePath));
}

export function writeJson(filePath, value) {
  ensureDirectory(path.dirname(filePath));
  fs.writeFileSync(filePath, `${JSON.stringify(value, null, 2)}\n`, "utf8");
}

export function writeText(filePath, value) {
  ensureDirectory(path.dirname(filePath));
  fs.writeFileSync(filePath, value.endsWith("\n") ? value : `${value}\n`, "utf8");
}

export function sha256Text(value) {
  return crypto.createHash("sha256").update(value).digest("hex");
}

export function sha256Buffer(value) {
  return crypto.createHash("sha256").update(value).digest("hex");
}

export function sha256File(filePath) {
  return sha256Buffer(fs.readFileSync(filePath));
}

export function uniqueSorted(values) {
  return [...new Set(values.filter((value) => value !== null && value !== undefined && value !== ""))]
    .map((value) => String(value))
    .sort((left, right) => left.localeCompare(right));
}

export function groupCounts(values) {
  const counts = {};
  for (const value of values) {
    const key = value === null || value === undefined || value === "" ? "unspecified" : String(value);
    counts[key] = (counts[key] || 0) + 1;
  }
  return Object.fromEntries(Object.entries(counts).sort(([left], [right]) => left.localeCompare(right)));
}

export function parseCsv(text) {
  const rows = [];
  let row = [];
  let field = "";
  let quoted = false;
  const source = text.replace(/^\uFEFF/, "");

  for (let index = 0; index < source.length; index += 1) {
    const character = source[index];
    if (quoted) {
      if (character === '"' && source[index + 1] === '"') {
        field += '"';
        index += 1;
      } else if (character === '"') {
        quoted = false;
      } else {
        field += character;
      }
      continue;
    }

    if (character === '"') {
      quoted = true;
    } else if (character === ",") {
      row.push(field);
      field = "";
    } else if (character === "\n") {
      row.push(field.replace(/\r$/, ""));
      rows.push(row);
      row = [];
      field = "";
    } else {
      field += character;
    }
  }

  if (field !== "" || row.length > 0) {
    row.push(field.replace(/\r$/, ""));
    rows.push(row);
  }

  const nonEmptyRows = rows.filter((candidate) => candidate.some((value) => value !== ""));
  if (nonEmptyRows.length === 0) {
    return [];
  }
  const headers = nonEmptyRows[0];
  return nonEmptyRows.slice(1).map((values) => Object.fromEntries(headers.map((header, index) => [header, values[index] || ""])));
}

export function readCsv(filePath) {
  return parseCsv(fs.readFileSync(filePath, "utf8"));
}

function quoteCsv(value) {
  const text = value === null || value === undefined ? "" : String(value);
  if (/[",\r\n]/.test(text)) {
    return `"${text.replaceAll('"', '""')}"`;
  }
  return text;
}

export function rowsToCsv(rows, headers) {
  const lines = [headers.map(quoteCsv).join(",")];
  for (const row of rows) {
    lines.push(headers.map((header) => quoteCsv(row[header])).join(","));
  }
  return `${lines.join("\n")}\n`;
}

export function loadAppData(root = REPO_ROOT) {
  const context = vm.createContext({ window: {} });
  const files = ["data/countries.js", "data/transparency.js", "data/leru-members.js"];
  for (const relativePath of files) {
    const absolutePath = path.join(root, relativePath);
    vm.runInContext(fs.readFileSync(absolutePath, "utf8"), context, { filename: absolutePath });
  }
  return {
    countries: context.window.COUNTRY_DATA || [],
    transparency: context.window.TRANSPARENCY_DATA || [],
    transparencyMetadata: context.window.TRANSPARENCY_METADATA || {},
    members: context.window.LERU_MEMBER_DATA || [],
    memberMetadata: context.window.LERU_MEMBER_METADATA || {},
  };
}

export function isWebUrl(value) {
  return typeof value === "string" && /^https?:\/\//i.test(value.trim());
}

export function canonicalizeUrl(value) {
  if (!isWebUrl(value)) {
    return "";
  }
  try {
    const parsed = new URL(value.trim());
    parsed.hash = "";
    parsed.protocol = parsed.protocol.toLowerCase();
    parsed.hostname = parsed.hostname.toLowerCase();
    if ((parsed.protocol === "https:" && parsed.port === "443") || (parsed.protocol === "http:" && parsed.port === "80")) {
      parsed.port = "";
    }
    if (parsed.pathname.length > 1 && parsed.pathname.endsWith("/")) {
      parsed.pathname = parsed.pathname.slice(0, -1);
    }
    return parsed.toString();
  } catch {
    return value.trim();
  }
}

export function stableSourceId(url) {
  return `LRS-${sha256Text(canonicalizeUrl(url)).slice(0, 14).toUpperCase()}`;
}

function latestIsoDate(values) {
  const dates = uniqueSorted(values.filter((value) => /^\d{4}-\d{2}-\d{2}$/.test(String(value))));
  return dates.length > 0 ? dates[dates.length - 1] : "";
}

function sourceTypeFrom(parent, url) {
  const labelText = [parent.type, parent.resourceClass, parent.label, parent.title, parent.supports]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
  const pathname = (() => {
    try {
      return new URL(url).pathname.toLowerCase();
    } catch {
      return "";
    }
  })();
  if (pathname.endsWith(".pdf") || labelText.includes("pdf")) return "PDF";
  if (pathname.endsWith(".docx") || labelText.includes("docx")) return "DOCX";
  if (labelText.includes("annual report") || labelText.includes("jaarverslag")) return "annual report";
  if (labelText.includes("decision") || labelText.includes("opinion") || labelText.includes("advies")) return "decision/output archive";
  if (labelText.includes("code")) return "code or standard";
  if (labelText.includes("procedure") || labelText.includes("regulation")) return "procedure or regulation";
  return parent.type || parent.resourceClass || "official webpage or document";
}

function inferredDocumentVersion(parent, url) {
  const explicit = parent.version || parent.documentVersion || parent.publicationDate || parent.date || "";
  if (explicit) {
    return { value: String(explicit), basis: "explicit source metadata" };
  }
  let readableUrl = url;
  try {
    readableUrl = decodeURIComponent(url);
  } catch {
    // Keep the original URL if malformed percent-encoding prevents decoding.
  }
  const candidate = [parent.title, parent.label, readableUrl].filter(Boolean).join(" ");
  const years = [...candidate.matchAll(/(?:19|20)\d{2}/g)].map((match) => match[0]);
  if (years.length > 0) {
    return { value: `year:${years[years.length - 1]}`, basis: "year in title or URL" };
  }
  return { value: "", basis: "not recorded" };
}

function evidenceLaneFor(dataPath, parent) {
  const text = [
    dataPath,
    parent.resourceClass,
    parent.scope,
    parent.supports,
    parent.label,
    parent.title,
    parent.note,
    parent.comment,
    parent.rawDocumentationCategory,
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
  const hasBoundarySignal =
    dataPath.toLowerCase().includes(".boundaries") ||
    /boundary|clinical trial|animal research|animal welfare|data protection|intellectual property|patent|quality assurance|bioethic|research ethics|ethics-review|anti-fraud|whistleblow|employment route|student discipline/.test(text);
  const hasGeneralIntegritySignal =
    /research integrity|scientific integrity|academic integrity|research misconduct|scientific misconduct|good research practice|good scientific practice|ombud|integrity committee/.test(text);
  if (hasBoundarySignal && hasGeneralIntegritySignal) return "mixed-or-review";
  if (hasBoundarySignal) return "boundary-regime";
  if (hasGeneralIntegritySignal) return "general-research-integrity";
  if (/data\/(countries|transparency|leru-members)\.js/i.test(dataPath)) return "general-research-integrity";
  return "supporting-unclassified";
}

function claimKeysForOccurrence(layer, context, dataPath, parent) {
  const pathText = dataPath.toLowerCase();
  const supportText = [parent.supports, parent.resourceClass, parent.scope, parent.caseLevelInfo, parent.label, parent.title]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
  const evidenceLane = evidenceLaneFor(dataPath, parent);

  if (evidenceLane === "boundary-regime" || evidenceLane === "mixed-or-review") {
    if (layer === "member_profile") return [`member:${context.institutionId}:boundary-regimes`];
    if (layer === "transparency_layer") return [`transparency:${context.countryId}:boundary-review`];
    if (layer === "country_dossier") return [`country:${context.countryId}:boundary-regimes`];
  }

  if (layer === "member_profile") {
    const prefix = `member:${context.institutionId}`;
    if (pathText.includes("lerusource")) return ["report:member-denominator"];
    if (pathText.includes("countrycodesource")) return [`${prefix}:country-code`];
    if (pathText.includes("committeecodesource")) return [`${prefix}:committee-code`];
    if (/public output|annual report|case|decision|statistic|summary/.test(supportText)) return [`${prefix}:public-output`];
    if (/national|sector|regional/.test(supportText)) return [`${prefix}:national-or-sector-route`];
    if (/procedure|route|committee|ombud|regulation|integrity/.test(supportText)) return [`${prefix}:institutional-route`];
    return [`${prefix}:evidence-backbone`];
  }

  if (layer === "transparency_layer") {
    return [`transparency:${context.countryId}:publication-model`];
  }

  if (layer === "country_dossier") {
    const prefix = `country:${context.countryId}`;
    if (pathText.includes("transparency")) return [`${prefix}:public-output`];
    if (pathText.includes("integritycommittees")) return [`${prefix}:institutional-routes`];
    if (pathText.includes("networklayers")) return [`${prefix}:system-allocation`];
    if (pathText.includes("boundaries")) return [`${prefix}:boundary-regimes`];
    if (pathText.includes("timeline")) return [`${prefix}:timeline`];
    if (pathText.includes("sourcelinks")) return [`${prefix}:source-backbone`];
    return [`${prefix}:system-map`];
  }

  return [];
}

function walkHttpSources(value, dataPath, visitor) {
  if (Array.isArray(value)) {
    value.forEach((item, index) => walkHttpSources(item, `${dataPath}[${index}]`, visitor));
    return;
  }
  if (!value || typeof value !== "object") {
    return;
  }
  for (const [key, child] of Object.entries(value)) {
    const childPath = `${dataPath}.${key}`;
    if ((key === "url" || key === "sourceUrl") && isWebUrl(child)) {
      visitor(child, childPath, value);
    } else {
      walkHttpSources(child, childPath, visitor);
    }
  }
}

function createManifestAccumulator(url) {
  return {
    source_id: stableSourceId(url),
    url: canonicalizeUrl(url),
    titles: new Set(),
    source_owners: new Set(),
    owner_bases: new Set(),
    countries: new Set(),
    country_ids: new Set(),
    institutions: new Set(),
    institution_ids: new Set(),
    source_types: new Set(),
    evidence_lanes: new Set(),
    evidence_layers: new Set(),
    dependent_claims: new Set(),
    data_paths: new Set(),
    registry_ids: new Set(),
    last_checked_dates: new Set(),
    document_versions: new Set(),
    version_bases: new Set(),
    local_storage: new Set(),
    used_for: new Set(),
    notes: new Set(),
    priorities: new Set(),
  };
}

function addOccurrence(map, occurrence) {
  const canonicalUrl = canonicalizeUrl(occurrence.url);
  if (!canonicalUrl) return;
  if (!map.has(canonicalUrl)) {
    map.set(canonicalUrl, createManifestAccumulator(canonicalUrl));
  }
  const target = map.get(canonicalUrl);
  const fields = [
    ["titles", occurrence.title],
    ["source_owners", occurrence.owner],
    ["owner_bases", occurrence.ownerBasis],
    ["countries", occurrence.country],
    ["country_ids", occurrence.countryId],
    ["institutions", occurrence.institution],
    ["institution_ids", occurrence.institutionId],
    ["source_types", occurrence.sourceType],
    ["evidence_lanes", occurrence.evidenceLane],
    ["evidence_layers", occurrence.layer],
    ["data_paths", occurrence.dataPath],
    ["registry_ids", occurrence.registryId],
    ["last_checked_dates", occurrence.lastChecked],
    ["document_versions", occurrence.documentVersion],
    ["version_bases", occurrence.versionBasis],
    ["local_storage", occurrence.localStorage],
    ["used_for", occurrence.usedFor],
    ["notes", occurrence.note],
    ["priorities", occurrence.priority],
  ];
  for (const [field, value] of fields) {
    if (value !== null && value !== undefined && value !== "") {
      target[field].add(String(value));
    }
  }
  for (const claim of occurrence.claims || []) {
    if (claim) target.dependent_claims.add(claim);
  }
}

function hostnameOwner(url) {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return "unresolved source owner";
  }
}

function priorityForLayer(layer) {
  if (layer === "member_profile" || layer === "transparency_layer") return "high";
  if (layer === "country_dossier") return "medium";
  return "supporting";
}

function cadenceForPriority(priority) {
  if (priority === "high") return "monthly technical check; quarterly content review";
  if (priority === "medium") return "quarterly when claim-active; otherwise annual";
  return "annual or on demand";
}

function finalizeManifestEntry(accumulator) {
  const priorities = uniqueSorted([...accumulator.priorities]);
  const priority = priorities.includes("high") ? "high" : priorities.includes("medium") ? "medium" : "supporting";
  const titles = uniqueSorted([...accumulator.titles]);
  const owners = uniqueSorted([...accumulator.source_owners]);
  const versions = uniqueSorted([...accumulator.document_versions]);
  const evidenceLanes = uniqueSorted([...accumulator.evidence_lanes]);
  const effectiveEvidenceLane = evidenceLanes.includes("mixed-or-review") ||
    (evidenceLanes.includes("boundary-regime") && evidenceLanes.includes("general-research-integrity"))
    ? "mixed-or-review"
    : evidenceLanes.includes("boundary-regime")
      ? "boundary-regime"
      : evidenceLanes.includes("general-research-integrity")
        ? "general-research-integrity"
        : "supporting-unclassified";
  const allDependentClaims = uniqueSorted([...accumulator.dependent_claims]);
  const dependentClaims = ["boundary-regime", "mixed-or-review"].includes(effectiveEvidenceLane)
    ? allDependentClaims.filter((claim) => claim.includes("boundary"))
    : allDependentClaims;
  return {
    source_id: accumulator.source_id,
    title: titles[0] || accumulator.url,
    alternate_titles: titles.slice(1),
    source_owner: owners[0] || hostnameOwner(accumulator.url),
    alternate_source_owners: owners.slice(1),
    owner_basis: uniqueSorted([...accumulator.owner_bases]).join(" | ") || "URL hostname fallback; review before publication attribution",
    countries: uniqueSorted([...accumulator.countries]),
    country_ids: uniqueSorted([...accumulator.country_ids]),
    institutions: uniqueSorted([...accumulator.institutions]),
    institution_ids: uniqueSorted([...accumulator.institution_ids]),
    url: accumulator.url,
    source_type: uniqueSorted([...accumulator.source_types])[0] || "official webpage or document",
    source_type_signals: uniqueSorted([...accumulator.source_types]),
    evidence_lanes: evidenceLanes,
    effective_evidence_lane: effectiveEvidenceLane,
    evidence_layers: uniqueSorted([...accumulator.evidence_layers]),
    dependent_claims: dependentClaims,
    report_critical: priority !== "supporting",
    priority,
    expected_check_cadence: cadenceForPriority(priority),
    last_checked: latestIsoDate([...accumulator.last_checked_dates]),
    document_date_or_version: versions.join(" | "),
    version_basis: uniqueSorted([...accumulator.version_bases]).join(" | ") || "not recorded",
    local_or_registry_location: uniqueSorted([
      ...accumulator.local_storage,
      ...[...accumulator.registry_ids].map((sourceId) => `data/source-registry.csv#${sourceId}`),
    ]),
    registry_ids: uniqueSorted([...accumulator.registry_ids]),
    data_paths: uniqueSorted([...accumulator.data_paths]),
    used_for: uniqueSorted([...accumulator.used_for]),
    current_status: "not yet technically audited by this maintenance pipeline",
    review_notes: uniqueSorted([...accumulator.notes]),
  };
}

export function buildSourceManifest({ root = REPO_ROOT, accessDate = DEFAULT_ACCESS_DATE } = {}) {
  const appData = loadAppData(root);
  const registryPath = path.join(root, "data/source-registry.csv");
  const registryRows = readCsv(registryPath);
  const map = new Map();

  for (const row of registryRows) {
    if (!isWebUrl(row.url)) continue;
    const version = inferredDocumentVersion({ title: row.title }, row.url);
    addOccurrence(map, {
      url: row.url,
      title: row.title,
      owner: hostnameOwner(row.url),
      ownerBasis: "URL hostname fallback from source registry; review before publication attribution",
      country: row.country,
      sourceType: row.source_type || sourceTypeFrom({ title: row.title }, row.url),
      evidenceLane: evidenceLaneFor(`data/source-registry.csv#${row.source_id}`, {
        title: row.title,
        note: row.notes,
        rawDocumentationCategory: row.raw_documentation_category,
      }),
      layer: "source_registry",
      dataPath: `data/source-registry.csv#${row.source_id}`,
      registryId: row.source_id,
      lastChecked: row.accessed,
      documentVersion: version.value,
      versionBasis: version.basis,
      localStorage: row.stored_in,
      usedFor: row.used_for,
      note: row.notes,
      priority: "supporting",
      claims: [],
    });
  }

  const visitRecord = (record, layer, context, basePath, defaultAccessed = "") => {
    walkHttpSources(record, basePath, (url, dataPath, parent) => {
      const version = inferredDocumentVersion(parent, url);
      const label = parent.label || parent.title || parent.name || "";
      const explicitOwner = parent.owner || parent.publisher || "";
      addOccurrence(map, {
        url,
        title: label || url,
        owner: explicitOwner || hostnameOwner(url),
        ownerBasis: explicitOwner
          ? "explicit structured owner"
          : "URL hostname fallback; review before publication attribution",
        country: context.country,
        countryId: context.countryId,
        institution: context.institution,
        institutionId: context.institutionId,
        sourceType: sourceTypeFrom(parent, url),
        evidenceLane: evidenceLaneFor(dataPath, parent),
        layer,
        dataPath,
        lastChecked: parent.accessed || parent.sourceDate || defaultAccessed,
        documentVersion: version.value,
        versionBasis: version.basis,
        localStorage: parent.path || parent.sourcePath || "",
        usedFor: parent.supports || parent.scope || parent.purpose || "",
        note: parent.note || parent.comment || "",
        priority: priorityForLayer(layer),
        claims: claimKeysForOccurrence(layer, context, dataPath, parent),
      });
    });
  };

  appData.countries.forEach((country, index) => {
    visitRecord(
      country,
      "country_dossier",
      { country: country.name, countryId: country.id },
      `data/countries.js#COUNTRY_DATA[${index}]`,
      country.transparency?.sourceDate || "",
    );
  });

  appData.transparency.forEach((record, index) => {
    visitRecord(
      record,
      "transparency_layer",
      { country: record.country, countryId: record.id },
      `data/transparency.js#TRANSPARENCY_DATA[${index}]`,
      record.sourceDate || appData.transparencyMetadata.prepared || "",
    );
  });

  appData.members.forEach((member, index) => {
    visitRecord(
      member,
      "member_profile",
      {
        country: member.country,
        countryId: member.countryId,
        institution: member.institution,
        institutionId: member.id,
      },
      `data/leru-members.js#LERU_MEMBER_DATA[${index}]`,
      member.leruSource?.accessed || appData.memberMetadata.lastUpdated || "",
    );
  });

  const sources = [...map.values()]
    .map(finalizeManifestEntry)
    .sort((left, right) => left.source_id.localeCompare(right.source_id));
  const manifest = {
    schema_version: "1.0.0",
    technical_access_date: accessDate,
    publication_data_cutoff: null,
    publication_cutoff_note: "Not set by this technical maintenance batch; requires author approval.",
    scope: "All unique HTTP(S) sources in the live country, transparency, member, and source-registry layers.",
    ownership_caution: "source_owner is a technical manifest field derived from explicit metadata, source labels, or hostname fallback. It is not automatically the publication owner used in report interpretation.",
    source_count: sources.length,
    report_critical_count: sources.filter((source) => source.report_critical).length,
    priority_counts: groupCounts(sources.map((source) => source.priority)),
    evidence_layer_counts: groupCounts(sources.flatMap((source) => source.evidence_layers)),
    sources,
  };
  return { manifest, appData, registryRows };
}

function gitStatusMap(root) {
  try {
    const output = execFileSync("git", ["status", "--porcelain=v1", "-uall"], { cwd: root, encoding: "utf8" });
    const result = new Map();
    for (const line of output.split(/\r?\n/).filter(Boolean)) {
      const status = line.slice(0, 2);
      let filePath = line.slice(3);
      if (filePath.includes(" -> ")) filePath = filePath.split(" -> ").at(-1);
      result.set(toPosixPath(filePath.replace(/^"|"$/g, "")), status);
    }
    return result;
  } catch {
    return new Map();
  }
}

export function getGitMetadata(root = REPO_ROOT) {
  let commit = "unavailable";
  try {
    commit = execFileSync("git", ["rev-parse", "HEAD"], { cwd: root, encoding: "utf8" }).trim();
  } catch {
    // The manifest remains usable outside Git.
  }
  const statuses = gitStatusMap(root);
  return {
    commit,
    dirty: statuses.size > 0,
    changed_paths: [...statuses.entries()]
      .map(([filePath, status]) => ({ path: filePath, status }))
      .sort((left, right) => left.path.localeCompare(right.path)),
  };
}

function overviewDocumentPaths(root) {
  const dataPath = path.join(root, "data");
  const results = [];
  for (const entry of fs.readdirSync(dataPath, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    const expected = path.join(dataPath, entry.name, `Overview ${entry.name}.docx`);
    if (fs.existsSync(expected)) results.push(expected);
  }
  return results.sort((left, right) => left.localeCompare(right));
}

export function buildCanonicalInputManifest({ root = REPO_ROOT, accessDate = DEFAULT_ACCESS_DATE } = {}) {
  const specs = [
    ["AGENTS.md", "standing repository instructions", ["report:boundaries", "report:maintenance-contract"]],
    ["docs/article/LERU-REPORT-PRODUCTION-GUIDE.md", "production specification", ["report:architecture", "report:evidence-rules"]],
    ["reports/LERU-research-integrity-report-article-outline-review.docx", "current substantive outline", ["report:draft-baseline"]],
    ["docs/article/build_leru_report_outline.py", "reproducible Word builder", ["report:word-output"]],
    ["docs/status/LERU-REPORT-GAP-MATRIX.md", "member evidence-gap control", ["report:member-gaps"]],
    ["docs/status/LERU-PUBLIC-OUTPUT-AUDIT.md", "public-output definitions and audit", ["report:public-output-typology"]],
    ["data/countries.js", "live country records", ["report:country-denominator", "report:system-typology"]],
    ["data/transparency.js", "live transparency layer", ["report:transparency-denominator", "report:publication-models"]],
    ["data/leru-members.js", "live 24-member profiles", ["report:member-denominator", "report:member-comparison"]],
    ["data/source-registry.csv", "official source audit trail", ["report:source-denominator", "report:provenance"]],
    ["data/leru-extraction-log.csv", "member extraction and validation history", ["report:member-validation"]],
    ["data/overview-extraction-log.csv", "overview extraction history", ["report:overview-denominator"]],
    ["data/transparency-extraction-log.csv", "transparency extraction history", ["report:transparency-provenance"]],
    ["data/extraction-status.md", "overview extraction status", ["report:overview-status"]],
  ];
  for (const overviewPath of overviewDocumentPaths(root)) {
    specs.push([relativeToRoot(overviewPath, root), "country overview document", ["report:country-evidence"]]);
  }

  const statuses = gitStatusMap(root);
  const inputs = specs
    .map(([relativePath, role, governs]) => {
      const absolutePath = path.join(root, relativePath);
      const exists = fs.existsSync(absolutePath);
      const stats = exists ? fs.statSync(absolutePath) : null;
      const normalizedPath = toPosixPath(relativePath);
      return {
        input_id: `LCI-${sha256Text(normalizedPath).slice(0, 14).toUpperCase()}`,
        role,
        path: normalizedPath,
        exists,
        bytes: stats?.size ?? null,
        sha256: exists && stats.isFile() ? sha256File(absolutePath) : null,
        modified_at: stats ? stats.mtime.toISOString() : null,
        git_status: statuses.get(normalizedPath) || "clean",
        governs,
      };
    })
    .sort((left, right) => left.path.localeCompare(right.path));
  return {
    schema_version: "1.0.0",
    technical_access_date: accessDate,
    git: getGitMetadata(root),
    input_count: inputs.length,
    missing_input_count: inputs.filter((input) => !input.exists).length,
    inputs,
  };
}

export function buildDerivedCounts({ root = REPO_ROOT, accessDate = DEFAULT_ACCESS_DATE } = {}) {
  const appData = loadAppData(root);
  const registryRows = readCsv(path.join(root, "data/source-registry.csv"));
  const registryIds = registryRows.map((row) => row.source_id);
  const registryUrls = registryRows.map((row) => canonicalizeUrl(row.url)).filter(Boolean);
  const duplicateIds = Object.entries(groupCounts(registryIds))
    .filter(([, count]) => count > 1)
    .map(([sourceId, count]) => ({ source_id: sourceId, count }));
  const overviewPresent = [];
  const overviewMissing = [];
  for (const country of appData.countries) {
    const relativePath = `data/${country.name}/Overview ${country.name}.docx`;
    if (fs.existsSync(path.join(root, relativePath))) overviewPresent.push(country.name);
    else overviewMissing.push(country.name);
  }

  const validationProcessed = appData.members.filter((member) => /^Updated with /i.test(member.validationStatus || ""));
  const strictOutput = appData.members.filter((member) => member.sourceCoverage?.annualReportOrCaseOutput === "available");
  const publicOutputCategoryCounts = groupCounts(appData.members.map((member) => member.publicOutputCategory));
  const counts = {
    schema_version: "1.0.0",
    technical_access_date: accessDate,
    publication_data_cutoff: null,
    publication_cutoff_note: "Not set by this technical maintenance batch; requires author approval.",
    git: getGitMetadata(root),
    countries: {
      denominator: appData.countries.length,
      stage_counts: groupCounts(appData.countries.map((country) => country.stage)),
      deep_dossiers: appData.countries.filter((country) => country.stage === "Deep dossier drafted").length,
    },
    overview_documents: {
      country_denominator: appData.countries.length,
      present: overviewPresent.length,
      missing: overviewMissing.length,
      missing_countries: overviewMissing.sort((left, right) => left.localeCompare(right)),
    },
    transparency: {
      denominator: appData.transparency.length,
      prepared: appData.transparencyMetadata.prepared || null,
      tier_counts: groupCounts(appData.transparency.map((record) => record.tier)),
    },
    source_registry: {
      row_denominator: registryRows.length,
      unique_source_ids: new Set(registryIds).size,
      unique_urls: new Set(registryUrls).size,
      duplicate_source_ids: duplicateIds,
    },
    leru_members: {
      denominator: appData.members.length,
      metadata_denominator: appData.memberMetadata.officialMemberCount || null,
      official_members: appData.members.filter((member) => member.officialLeruMember).length,
      report_status_counts: groupCounts(appData.members.map((member) => member.reportStatus)),
      evidence_level_counts: groupCounts(appData.members.map((member) => member.evidenceLevel)),
      member_validation: {
        processed: validationProcessed.length,
        open: appData.members.length - validationProcessed.length,
        processed_ids: validationProcessed.map((member) => member.id).sort((left, right) => left.localeCompare(right)),
      },
      strict_public_output: {
        definition: 'sourceCoverage.annualReportOrCaseOutput === "available"',
        numerator: strictOutput.length,
        denominator: appData.members.length,
      },
      public_output_category_counts: publicOutputCategoryCounts,
      public_output_category_denominator: Object.values(publicOutputCategoryCounts).reduce((sum, value) => sum + value, 0),
    },
  };
  counts.validation = {
    member_metadata_matches_data: counts.leru_members.metadata_denominator === counts.leru_members.denominator,
    public_output_categories_sum_to_member_denominator:
      counts.leru_members.public_output_category_denominator === counts.leru_members.denominator,
    source_registry_ids_unique: duplicateIds.length === 0,
  };
  return counts;
}

function normalizeHeaderValue(value) {
  return value === null || value === undefined ? "" : String(value);
}

async function readResponsePrefix(response, maximumBytes) {
  if (!response.body) return { buffer: Buffer.alloc(0), truncated: false };
  const reader = response.body.getReader();
  const chunks = [];
  let total = 0;
  let truncated = false;
  while (true) {
    const { value, done } = await reader.read();
    if (done) break;
    const chunk = Buffer.from(value);
    const remaining = maximumBytes - total;
    if (remaining <= 0) {
      truncated = true;
      await reader.cancel();
      break;
    }
    if (chunk.length > remaining) {
      chunks.push(chunk.subarray(0, remaining));
      total += remaining;
      truncated = true;
      await reader.cancel();
      break;
    }
    chunks.push(chunk);
    total += chunk.length;
  }
  return { buffer: Buffer.concat(chunks), truncated };
}

function resultCategory(result) {
  if (result.status === "redirected-accessible") return "redirect";
  if (result.status === "accessible") return "accessible";
  return "failure";
}

export async function auditSource(
  source,
  {
    accessDate = DEFAULT_ACCESS_DATE,
    timeoutMs = 15000,
    maximumBytes = 1_000_000,
    previous = null,
    fetchImplementation = fetch,
  } = {},
) {
  const redirectChain = [];
  let currentUrl = source.url;
  let response = null;
  let failure = null;

  for (let redirectIndex = 0; redirectIndex <= 5; redirectIndex += 1) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), timeoutMs);
    try {
      response = await fetchImplementation(currentUrl, {
        method: "GET",
        redirect: "manual",
        signal: controller.signal,
        headers: {
          Accept: "text/html,application/pdf,application/json,application/xml;q=0.9,*/*;q=0.8",
          "User-Agent": "LERU-Integrity-Map-Maintenance/1.0 (non-destructive research source audit)",
        },
      });
    } catch (error) {
      failure = error;
    } finally {
      clearTimeout(timeout);
    }

    if (failure) break;
    if (response.status >= 300 && response.status < 400 && response.headers.get("location")) {
      const nextUrl = new URL(response.headers.get("location"), currentUrl).toString();
      redirectChain.push({ from: currentUrl, status: response.status, to: nextUrl });
      currentUrl = nextUrl;
      continue;
    }
    break;
  }

  if (failure) {
    const timeout = failure?.name === "AbortError";
    const result = {
      source_id: source.source_id,
      title: source.title,
      requested_url: source.url,
      final_url: currentUrl,
      access_date: accessDate,
      status: timeout ? "timeout" : "network-error",
      http_status: null,
      redirect_chain: redirectChain,
      content_type: "",
      content_length_header: "",
      etag: "",
      last_modified: "",
      bytes_fingerprinted: 0,
      fingerprint_sha256: "",
      fingerprint_scope: "none",
      technical_change: previous ? "availability changed or remains unavailable" : "initial unavailable baseline",
      substantive_equivalence: "not assessed",
      error: failure?.message || String(failure),
      review_reasons: [timeout ? "request timed out" : "network access failed"],
    };
    result.expected_result = source.expected_result || null;
    result.expectation_met = !source.expected_result || source.expected_result === resultCategory(result);
    return result;
  }

  const { buffer, truncated } = await readResponsePrefix(response, maximumBytes);
  const accessible = response.status >= 200 && response.status < 300;
  const status = accessible
    ? redirectChain.length > 0
      ? "redirected-accessible"
      : "accessible"
    : "http-error";
  const fingerprint = buffer.length > 0 ? sha256Buffer(buffer) : "";
  const reviewReasons = [];
  if (redirectChain.length > 0) reviewReasons.push("redirect requires equivalence review");
  if (!accessible) reviewReasons.push(`HTTP ${response.status}`);
  if (previous && previous.final_url !== currentUrl) reviewReasons.push("final URL changed");
  if (previous && previous.fingerprint_sha256 && fingerprint && previous.fingerprint_sha256 !== fingerprint) {
    reviewReasons.push("content fingerprint changed");
  }
  let technicalChange = "initial baseline";
  if (previous) {
    const changed =
      previous.http_status !== response.status ||
      previous.final_url !== currentUrl ||
      (previous.fingerprint_sha256 && fingerprint && previous.fingerprint_sha256 !== fingerprint);
    technicalChange = changed ? "technical change detected" : "no technical change detected";
  }
  const result = {
    source_id: source.source_id,
    title: source.title,
    requested_url: source.url,
    final_url: currentUrl,
    access_date: accessDate,
    status,
    http_status: response.status,
    redirect_chain: redirectChain,
    content_type: normalizeHeaderValue(response.headers.get("content-type")),
    content_length_header: normalizeHeaderValue(response.headers.get("content-length")),
    etag: normalizeHeaderValue(response.headers.get("etag")),
    last_modified: normalizeHeaderValue(response.headers.get("last-modified")),
    bytes_fingerprinted: buffer.length,
    fingerprint_sha256: fingerprint,
    fingerprint_scope: truncated ? `first ${maximumBytes} bytes` : "complete received body",
    technical_change: technicalChange,
    substantive_equivalence: redirectChain.length > 0 || reviewReasons.includes("content fingerprint changed") ? "human review required" : "not assessed",
    error: "",
    review_reasons: reviewReasons,
  };
  result.expected_result = source.expected_result || null;
  result.expectation_met = !source.expected_result || source.expected_result === resultCategory(result);
  return result;
}

export async function mapWithConcurrency(items, concurrency, worker) {
  const results = new Array(items.length);
  let nextIndex = 0;
  const runner = async () => {
    while (true) {
      const currentIndex = nextIndex;
      nextIndex += 1;
      if (currentIndex >= items.length) return;
      results[currentIndex] = await worker(items[currentIndex], currentIndex);
    }
  };
  await Promise.all(Array.from({ length: Math.max(1, Math.min(concurrency, items.length || 1)) }, () => runner()));
  return results;
}

export function markdownEscape(value) {
  return String(value ?? "").replaceAll("|", "\\|").replaceAll("\n", " ");
}
