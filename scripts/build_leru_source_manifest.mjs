#!/usr/bin/env node

import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  DEFAULT_ACCESS_DATE,
  REPO_ROOT,
  buildCanonicalInputManifest,
  buildSourceManifest,
  parseArgs,
  rowsToCsv,
  writeJson,
  writeText,
} from "./leru_maintenance_lib.mjs";

const SOURCE_HEADERS = [
  "source_id",
  "title",
  "source_owner",
  "owner_basis",
  "countries",
  "country_ids",
  "institutions",
  "institution_ids",
  "url",
  "source_type",
  "evidence_lanes",
  "effective_evidence_lane",
  "evidence_layers",
  "dependent_claims",
  "report_critical",
  "priority",
  "expected_check_cadence",
  "last_checked",
  "document_date_or_version",
  "version_basis",
  "local_or_registry_location",
  "registry_ids",
  "data_paths",
  "used_for",
  "current_status",
  "review_notes",
];

const INPUT_HEADERS = [
  "input_id",
  "role",
  "path",
  "exists",
  "bytes",
  "sha256",
  "modified_at",
  "git_status",
  "governs",
];

function flattenRow(row, headers) {
  return Object.fromEntries(
    headers.map((header) => [header, Array.isArray(row[header]) ? row[header].join(" | ") : row[header]]),
  );
}

export function generateManifests({ root = REPO_ROOT, outputDirectory, accessDate = DEFAULT_ACCESS_DATE } = {}) {
  const destination = outputDirectory || path.join(root, "data", "maintenance");
  const { manifest } = buildSourceManifest({ root, accessDate });
  const canonicalInputs = buildCanonicalInputManifest({ root, accessDate });

  writeJson(path.join(destination, "leru-source-manifest.json"), manifest);
  writeText(
    path.join(destination, "leru-source-manifest.csv"),
    rowsToCsv(manifest.sources.map((row) => flattenRow(row, SOURCE_HEADERS)), SOURCE_HEADERS),
  );
  writeJson(path.join(destination, "leru-canonical-inputs.json"), canonicalInputs);
  writeText(
    path.join(destination, "leru-canonical-inputs.csv"),
    rowsToCsv(canonicalInputs.inputs.map((row) => flattenRow(row, INPUT_HEADERS)), INPUT_HEADERS),
  );

  return { manifest, canonicalInputs, destination };
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  const root = path.resolve(args.root || REPO_ROOT);
  const outputDirectory = path.resolve(args["output-dir"] || path.join(root, "data", "maintenance"));
  const accessDate = args["access-date"] || DEFAULT_ACCESS_DATE;
  const { manifest, canonicalInputs } = generateManifests({ root, outputDirectory, accessDate });
  process.stdout.write(
    `${JSON.stringify(
      {
        output_directory: outputDirectory,
        sources: manifest.source_count,
        report_critical_sources: manifest.report_critical_count,
        canonical_inputs: canonicalInputs.input_count,
        missing_inputs: canonicalInputs.missing_input_count,
      },
      null,
      2,
    )}\n`,
  );
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  main();
}
