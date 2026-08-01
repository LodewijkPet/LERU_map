#!/usr/bin/env node

import path from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import {
  DEFAULT_ACCESS_DATE,
  REPO_ROOT,
  buildCanonicalInputManifest,
  buildDerivedCounts,
  buildSourceManifest,
  groupCounts,
  markdownEscape,
  parseArgs,
  writeJson,
  writeText,
} from "./leru_maintenance_lib.mjs";
import { generateManifests } from "./build_leru_source_manifest.mjs";
import { generateCounts } from "./generate_leru_report_counts.mjs";
import { runAudit } from "./audit_leru_sources.mjs";

function inputHashMap(inputManifest) {
  return new Map(inputManifest.inputs.map((input) => [input.path, `${input.exists}:${input.sha256}`]));
}

function compareInputHashes(before, after) {
  const beforeMap = inputHashMap(before);
  const afterMap = inputHashMap(after);
  const paths = [...new Set([...beforeMap.keys(), ...afterMap.keys()])].sort((left, right) => left.localeCompare(right));
  return paths
    .filter((inputPath) => beforeMap.get(inputPath) !== afterMap.get(inputPath))
    .map((inputPath) => ({ path: inputPath, before: beforeMap.get(inputPath) || null, after: afterMap.get(inputPath) || null }));
}

function runCommand(root, name, command, args) {
  const result = spawnSync(command, args, { cwd: root, encoding: "utf8", windowsHide: true });
  return {
    name,
    command: [command, ...args].join(" "),
    passed: result.status === 0,
    exit_code: result.status,
    stdout: (result.stdout || "").trim(),
    stderr: (result.stderr || "").trim(),
  };
}

function buildBatchSummary({ accessDate, manifest, canonicalInputs, counts, audit, validation }) {
  const fallbackOwners = manifest.sources.filter((source) => source.owner_basis.includes("fallback")).length;
  const missingLastChecked = manifest.sources.filter((source) => !source.last_checked).length;
  const missingVersion = manifest.sources.filter((source) => !source.document_date_or_version).length;
  const effectiveLaneCounts = groupCounts(manifest.sources.map((source) => source.effective_evidence_lane));
  const exceptions = audit.results.filter(
    (result) => result.review_reasons.length > 0 || result.expectation_met === false || !["accessible", "redirected-accessible"].includes(result.status),
  );
  const lines = [
    "# LERU AI maintenance foundation — completion memo",
    "",
    `Technical access date: ${accessDate}`,
    "",
    "## Batch contract",
    "",
    "- Target set: canonical report inputs and all unique HTTP(S) sources represented in the live country, transparency, member, and source-registry layers.",
    "- Evidence question: which inputs and sources support report maintenance, which technical source signals are current, and which exceptions require review?",
    "- Publication data cut-off: not set by this batch.",
    "- Mutation boundary: the pilot made no automatic country, transparency, member, source-registry, report-claim, or publication changes.",
    "",
    "## Outputs",
    "",
    "- `data/maintenance/leru-source-manifest.json` and `.csv`",
    "- `data/maintenance/leru-canonical-inputs.json` and `.csv`",
    "- `derived-counts.json` and `.md` in this batch folder",
    "- `source-audit.json`, `.csv`, and `.md` in this batch folder",
    "- `content-delta.json` in this batch folder; first runs establish a technical baseline and later runs compare fingerprints",
    "- `suggested-manifest-updates.json` in this batch folder; suggestions are not applied",
    "- `validation-results.json` in this batch folder",
    "- `docs/workflows/LERU-AI-MAINTENANCE-RUNBOOK.md`",
    "",
    "## Generated denominators",
    "",
    "| Measure | Current value |",
    "| --- | ---: |",
    `| Countries | ${counts.countries.denominator} |`,
    `| Deep dossiers | ${counts.countries.deep_dossiers} |`,
    `| Overview documents | ${counts.overview_documents.present} |`,
    `| Transparency entries | ${counts.transparency.denominator} |`,
    `| Source-registry rows | ${counts.source_registry.row_denominator} |`,
    `| LERU members | ${counts.leru_members.denominator} |`,
    `| Member validations processed/open | ${counts.leru_members.member_validation.processed}/${counts.leru_members.member_validation.open} |`,
    `| Strict public-output evidence | ${counts.leru_members.strict_public_output.numerator}/${counts.leru_members.strict_public_output.denominator} |`,
    "",
    "## Manifest coverage",
    "",
    `- Unique sources: ${manifest.source_count}`,
    `- Report-critical sources represented in live data: ${manifest.report_critical_count}`,
    `- Canonical local inputs: ${canonicalInputs.input_count}; missing: ${canonicalInputs.missing_input_count}`,
    `- Sources whose technical owner still uses a hostname fallback: ${fallbackOwners}`,
    `- Sources without a recorded prior access date: ${missingLastChecked}`,
    `- Sources without an explicit or title/URL-derived version signal: ${missingVersion}`,
    `- Effective evidence lanes: ${Object.entries(effectiveLaneCounts).map(([lane, count]) => `${lane} ${count}`).join("; ")}`,
    "",
    "## Pilot results",
    "",
    "| Pilot source | Result | Expected | Redirects | Review reason |",
    "| --- | --- | --- | ---: | --- |",
  ];
  for (const result of audit.results) {
    lines.push(
      `| ${markdownEscape(result.title)} | ${markdownEscape(result.status)} | ${markdownEscape(result.expected_result || "none")} | ${result.redirect_chain.length} | ${markdownEscape(result.review_reasons.join("; ") || "none")} |`,
    );
  }
  lines.push("", "## Changed, unsupported, and unresolved claims", "");
  lines.push(
    "- Changed automatically: none. This phase establishes maintenance infrastructure and technical baselines only.",
    `- Regenerated count replacing stale hand-carried totals when used in future drafts: ${counts.source_registry.row_denominator} live source-registry rows.`,
    "- Still unsupported as publication decisions: official LERU product type, current group credit, authorship, approval route, and publication data cut-off.",
    "- Technical source ownership based on explicit metadata or a hostname fallback remains inventory metadata and must not be promoted to publication-owner claims without evidence.",
    "- Redirects, fingerprint changes, access failures, conflicting official sources, and translation-sensitive changes remain review items.",
    "",
    "## Exceptions requiring review",
    "",
  );
  if (exceptions.length === 0) {
    lines.push("None in the six-source pilot.");
  } else {
    for (const result of exceptions) {
      lines.push(`- **${result.source_id}:** ${result.review_reasons.join("; ") || "pilot expectation not met"}.`);
    }
  }
  lines.push(
    "",
    "## Validation",
    "",
    `- Deterministic manifest regeneration: ${validation.deterministic_manifest ? "PASS" : "FAIL"}`,
    `- Deterministic count regeneration: ${validation.deterministic_counts ? "PASS" : "FAIL"}`,
    `- Canonical inputs unchanged by generation and pilot: ${validation.canonical_inputs_unchanged ? "PASS" : "FAIL"}`,
    `- Unique manifest source IDs: ${validation.unique_manifest_ids ? "PASS" : "FAIL"}`,
    `- All scripted checks: ${validation.commands.every((command) => command.passed) ? "PASS" : "FAIL"}`,
    "",
    "## Next bounded batch",
    "",
    "Run `p-leru-source-current-verification` for Geneva, Strasbourg, Freiburg, Trinity College Dublin, Paris-Saclay, LMU Munich, and Heidelberg using the new manifest and audit output format. Treat source changes as proposed evidence updates until content and claim relevance have been reviewed.",
  );
  return `${lines.join("\n")}\n`;
}

export async function runMaintenanceBatch({ root = REPO_ROOT, accessDate = DEFAULT_ACCESS_DATE, outputDirectory } = {}) {
  const destination = outputDirectory || path.join(root, "reports", "maintenance", `${accessDate}-phase-1`);
  const beforeInputs = buildCanonicalInputManifest({ root, accessDate });
  const { manifest, canonicalInputs } = generateManifests({
    root,
    outputDirectory: path.join(root, "data", "maintenance"),
    accessDate,
  });
  const { counts } = generateCounts({ root, outputDirectory: destination, accessDate });

  const deterministicManifest =
    JSON.stringify(buildSourceManifest({ root, accessDate }).manifest) ===
    JSON.stringify(buildSourceManifest({ root, accessDate }).manifest);
  const deterministicCounts =
    JSON.stringify(buildDerivedCounts({ root, accessDate })) === JSON.stringify(buildDerivedCounts({ root, accessDate }));

  const { audit } = await runAudit({
    root,
    pilotPath: path.join(root, "data", "maintenance", "pilot-sources.json"),
    outputDirectory: destination,
    accessDate,
    concurrency: 3,
    timeoutMs: 20000,
    maximumBytes: 1_000_000,
  });
  const afterInputs = buildCanonicalInputManifest({ root, accessDate });
  const inputChanges = compareInputHashes(beforeInputs, afterInputs);
  const sourceIds = manifest.sources.map((source) => source.source_id);

  const scriptPaths = [
    "scripts/leru_maintenance_lib.mjs",
    "scripts/build_leru_source_manifest.mjs",
    "scripts/generate_leru_report_counts.mjs",
    "scripts/audit_leru_sources.mjs",
    "scripts/run_leru_maintenance_batch.mjs",
    "scripts/tests/leru_maintenance.test.mjs",
  ];
  const commands = [
    ...scriptPaths.map((scriptPath) => runCommand(root, `Node syntax: ${scriptPath}`, process.execPath, ["--check", scriptPath])),
    runCommand(root, "Country data syntax", process.execPath, ["--check", "data/countries.js"]),
    runCommand(root, "Transparency data syntax", process.execPath, ["--check", "data/transparency.js"]),
    runCommand(root, "LERU member data syntax", process.execPath, ["--check", "data/leru-members.js"]),
    runCommand(root, "App renderer syntax", process.execPath, ["--check", "assets/js/app.js"]),
    runCommand(root, "Maintenance tests", process.execPath, ["--test", "scripts/tests/leru_maintenance.test.mjs"]),
    runCommand(
      root,
      "Report builder Python syntax",
      "python",
      ["-c", "import ast, pathlib; ast.parse(pathlib.Path('docs/article/build_leru_report_outline.py').read_text(encoding='utf-8'))"],
    ),
    runCommand(root, "Whitespace and patch check", "git", ["diff", "--check"]),
  ];
  const validation = {
    schema_version: "1.0.0",
    technical_access_date: accessDate,
    deterministic_manifest: deterministicManifest,
    deterministic_counts: deterministicCounts,
    canonical_inputs_unchanged: inputChanges.length === 0,
    canonical_input_changes: inputChanges,
    unique_manifest_ids: new Set(sourceIds).size === sourceIds.length,
    derived_count_validations: counts.validation,
    pilot_expectations: audit.expectations,
    commands,
  };
  writeJson(path.join(destination, "validation-results.json"), validation);
  writeText(
    path.join(destination, "batch-summary.md"),
    buildBatchSummary({ accessDate, manifest, canonicalInputs, counts, audit, validation }),
  );
  return { destination, manifest, canonicalInputs, counts, audit, validation };
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const root = path.resolve(args.root || REPO_ROOT);
  const accessDate = args["access-date"] || DEFAULT_ACCESS_DATE;
  const outputDirectory = path.resolve(
    args["output-dir"] || path.join(root, "reports", "maintenance", `${accessDate}-phase-1`),
  );
  const result = await runMaintenanceBatch({ root, accessDate, outputDirectory });
  const passed =
    result.validation.deterministic_manifest &&
    result.validation.deterministic_counts &&
    result.validation.canonical_inputs_unchanged &&
    result.validation.unique_manifest_ids &&
    Object.values(result.validation.derived_count_validations).every(Boolean) &&
    result.validation.commands.every((command) => command.passed);
  process.stdout.write(
    `${JSON.stringify(
      {
        output_directory: result.destination,
        source_manifest_rows: result.manifest.source_count,
        report_critical_sources: result.manifest.report_critical_count,
        canonical_inputs: result.canonicalInputs.input_count,
        derived_counts: {
          countries: result.counts.countries.denominator,
          deep_dossiers: result.counts.countries.deep_dossiers,
          transparency: result.counts.transparency.denominator,
          source_registry: result.counts.source_registry.row_denominator,
          members: result.counts.leru_members.denominator,
          validated: result.counts.leru_members.member_validation.processed,
          strict_public_output: result.counts.leru_members.strict_public_output.numerator,
        },
        pilot_status_counts: result.audit.status_counts,
        pilot_expectations: result.audit.expectations,
        validation_passed: passed,
      },
      null,
      2,
    )}\n`,
  );
  if (!passed) process.exitCode = 1;
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  main().catch((error) => {
    process.stderr.write(`${error.stack || error.message || String(error)}\n`);
    process.exitCode = 1;
  });
}
