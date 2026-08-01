#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  DEFAULT_ACCESS_DATE,
  REPO_ROOT,
  auditSource,
  groupCounts,
  mapWithConcurrency,
  markdownEscape,
  parseArgs,
  rowsToCsv,
  writeJson,
  writeText,
} from "./leru_maintenance_lib.mjs";

const AUDIT_HEADERS = [
  "source_id",
  "title",
  "requested_url",
  "final_url",
  "access_date",
  "status",
  "http_status",
  "redirect_count",
  "content_type",
  "content_length_header",
  "etag",
  "last_modified",
  "bytes_fingerprinted",
  "fingerprint_sha256",
  "fingerprint_scope",
  "technical_change",
  "substantive_equivalence",
  "expected_result",
  "expectation_met",
  "error",
  "review_reasons",
];

function flattenAuditRow(result) {
  return {
    ...result,
    redirect_count: result.redirect_chain.length,
    review_reasons: result.review_reasons.join(" | "),
  };
}

function auditMarkdown(audit) {
  const lines = [
    "# LERU source technical audit",
    "",
    `Technical access date: ${audit.technical_access_date}`,
    "",
    "> This audit records reachability, redirects, response metadata, and bounded fingerprints. It does not establish substantive equivalence, source meaning, or publication ownership.",
    "",
    "## Summary",
    "",
    "| Status | Count |",
    "| --- | ---: |",
  ];
  for (const [status, count] of Object.entries(audit.status_counts)) {
    lines.push(`| ${markdownEscape(status)} | ${count} |`);
  }
  lines.push(
    "",
    `Expected pilot outcomes met: ${audit.expectations.met}/${audit.expectations.total_with_expectations}`,
    "",
    "## Results",
    "",
    "| Source | Status | HTTP | Redirects | MIME type | Review |",
    "| --- | --- | ---: | ---: | --- | --- |",
  );
  for (const result of audit.results) {
    lines.push(
      `| ${markdownEscape(result.title)} | ${markdownEscape(result.status)} | ${result.http_status ?? ""} | ${result.redirect_chain.length} | ${markdownEscape(result.content_type)} | ${markdownEscape(result.review_reasons.join("; ") || "none")} |`,
    );
  }
  const exceptions = audit.results.filter(
    (result) => result.review_reasons.length > 0 || result.expectation_met === false || !["accessible", "redirected-accessible"].includes(result.status),
  );
  lines.push("", "## Exceptions and human review items", "");
  if (exceptions.length === 0) {
    lines.push("None.");
  } else {
    for (const result of exceptions) {
      const reasons = result.review_reasons.length > 0 ? result.review_reasons.join("; ") : "unexpected pilot result";
      lines.push(`- **${result.source_id} — ${result.title}:** ${reasons}. Substantive equivalence: ${result.substantive_equivalence}.`);
    }
  }
  lines.push(
    "",
    "## Interpretation boundary",
    "",
    "- A successful response does not prove that the content is current or supports the same claim as before.",
    "- A redirect is a review signal, not automatic evidence of substantive equivalence.",
    "- An HTTP or network failure is a dated access result, not proof that the source or body does not exist.",
    "- Suggested manifest updates are separate and are not applied by this audit.",
  );
  return `${lines.join("\n")}\n`;
}

function loadSources({ manifestPath, pilotPath }) {
  if (pilotPath) {
    const pilot = JSON.parse(fs.readFileSync(pilotPath, "utf8"));
    if (!Array.isArray(pilot.sources)) throw new Error("Pilot file must contain a sources array.");
    return pilot.sources;
  }
  const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
  if (!Array.isArray(manifest.sources)) throw new Error("Manifest file must contain a sources array.");
  return manifest.sources;
}

export async function runAudit({
  root = REPO_ROOT,
  manifestPath,
  pilotPath = null,
  previousAuditPath = null,
  outputDirectory,
  accessDate = DEFAULT_ACCESS_DATE,
  ids = [],
  limit = null,
  concurrency = 4,
  timeoutMs = 15000,
  maximumBytes = 1_000_000,
} = {}) {
  const manifest = manifestPath || path.join(root, "data", "maintenance", "leru-source-manifest.json");
  const destination = outputDirectory || path.join(root, "reports", "maintenance", `${accessDate}-source-audit`);
  const previousResults = previousAuditPath
    ? JSON.parse(fs.readFileSync(previousAuditPath, "utf8")).results || []
    : [];
  const previousById = new Map(previousResults.map((result) => [result.source_id, result]));
  let sources = loadSources({ manifestPath: manifest, pilotPath });
  if (ids.length > 0) {
    const requested = new Set(ids);
    sources = sources.filter((source) => requested.has(source.source_id));
  }
  if (limit !== null && Number.isFinite(limit)) sources = sources.slice(0, limit);
  if (sources.length === 0) throw new Error("No sources selected for audit.");

  const results = await mapWithConcurrency(sources, concurrency, (source) =>
    auditSource(source, {
      accessDate,
      timeoutMs,
      maximumBytes,
      previous: previousById.get(source.source_id) || null,
    }),
  );
  const withExpectations = results.filter((result) => result.expected_result);
  const audit = {
    schema_version: "1.0.0",
    technical_access_date: accessDate,
    publication_data_cutoff: null,
    audit_scope: pilotPath ? `pilot:${path.basename(pilotPath)}` : `manifest:${path.basename(manifest)}`,
    source_count: results.length,
    status_counts: groupCounts(results.map((result) => result.status)),
    expectations: {
      total_with_expectations: withExpectations.length,
      met: withExpectations.filter((result) => result.expectation_met).length,
    },
    results,
  };
  const suggestedUpdates = {
    schema_version: "1.0.0",
    technical_access_date: accessDate,
    applied: false,
    caution: "These are technical observations only. Review redirects, changed fingerprints, MIME changes, and failures before applying any source or claim update.",
    updates: results.map((result) => ({
      source_id: result.source_id,
      last_technical_check: result.access_date,
      proposed_technical_status: result.status,
      proposed_final_url: result.final_url,
      http_status: result.http_status,
      content_type: result.content_type,
      etag: result.etag,
      last_modified: result.last_modified,
      fingerprint_sha256: result.fingerprint_sha256,
      fingerprint_scope: result.fingerprint_scope,
      review_required: result.review_reasons.length > 0 || !["accessible", "redirected-accessible"].includes(result.status),
      review_reasons: result.review_reasons,
    })),
  };
  const contentDelta = {
    schema_version: "1.0.0",
    technical_access_date: accessDate,
    comparison_basis: previousAuditPath ? path.basename(previousAuditPath) : null,
    interpretation_boundary: "Fingerprint and response changes are technical change signals. They are not a substantive content comparison until the relevant official text is reviewed.",
    deltas: results.map((result) => ({
      source_id: result.source_id,
      title: result.title,
      comparison_status: result.technical_change,
      final_url: result.final_url,
      current_fingerprint_sha256: result.fingerprint_sha256,
      fingerprint_scope: result.fingerprint_scope,
      potential_content_change: result.review_reasons.includes("content fingerprint changed"),
      substantive_review_required:
        result.substantive_equivalence === "human review required" ||
        result.review_reasons.length > 0 ||
        !["accessible", "redirected-accessible"].includes(result.status),
      review_reasons: result.review_reasons,
    })),
  };

  writeJson(path.join(destination, "source-audit.json"), audit);
  writeText(
    path.join(destination, "source-audit.csv"),
    rowsToCsv(results.map(flattenAuditRow), AUDIT_HEADERS),
  );
  writeText(path.join(destination, "source-audit.md"), auditMarkdown(audit));
  writeJson(path.join(destination, "content-delta.json"), contentDelta);
  writeJson(path.join(destination, "suggested-manifest-updates.json"), suggestedUpdates);
  return { audit, contentDelta, suggestedUpdates, destination };
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const root = path.resolve(args.root || REPO_ROOT);
  const accessDate = args["access-date"] || DEFAULT_ACCESS_DATE;
  const ids = args.ids ? String(args.ids).split(",").filter(Boolean) : [];
  const limit = args.limit === undefined ? null : Number.parseInt(args.limit, 10);
  const { audit, destination } = await runAudit({
    root,
    manifestPath: args.manifest ? path.resolve(args.manifest) : undefined,
    pilotPath: args.pilot ? path.resolve(args.pilot) : null,
    previousAuditPath: args["previous-audit"] ? path.resolve(args["previous-audit"]) : null,
    outputDirectory: path.resolve(args["output-dir"] || path.join(root, "reports", "maintenance", `${accessDate}-source-audit`)),
    accessDate,
    ids,
    limit,
    concurrency: Number.parseInt(args.concurrency || "4", 10),
    timeoutMs: Number.parseInt(args["timeout-ms"] || "15000", 10),
    maximumBytes: Number.parseInt(args["max-bytes"] || "1000000", 10),
  });
  process.stdout.write(
    `${JSON.stringify(
      {
        output_directory: destination,
        source_count: audit.source_count,
        status_counts: audit.status_counts,
        expectations: audit.expectations,
      },
      null,
      2,
    )}\n`,
  );
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  main().catch((error) => {
    process.stderr.write(`${error.stack || error.message || String(error)}\n`);
    process.exitCode = 1;
  });
}
