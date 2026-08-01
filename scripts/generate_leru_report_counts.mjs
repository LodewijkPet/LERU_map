#!/usr/bin/env node

import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  DEFAULT_ACCESS_DATE,
  REPO_ROOT,
  buildDerivedCounts,
  markdownEscape,
  parseArgs,
  writeJson,
  writeText,
} from "./leru_maintenance_lib.mjs";

function objectTable(title, values) {
  const lines = [`### ${title}`, "", "| Category | Count |", "| --- | ---: |"];
  for (const [key, value] of Object.entries(values)) {
    lines.push(`| ${markdownEscape(key)} | ${value} |`);
  }
  return lines.join("\n");
}

export function countsToMarkdown(counts) {
  const lines = [
    "# LERU report derived counts",
    "",
    `Technical access date: ${counts.technical_access_date}`,
    "",
    "> This is a reproducible technical snapshot. It does not set the publication data cut-off.",
    "",
    "## Headline denominators",
    "",
    "| Measure | Numerator | Denominator or note |",
    "| --- | ---: | --- |",
    `| Country records | ${counts.countries.denominator} | live \`COUNTRY_DATA\` |`,
    `| Deep dossiers | ${counts.countries.deep_dossiers} | ${counts.countries.denominator} country records |`,
    `| Readable overview documents | ${counts.overview_documents.present} | ${counts.overview_documents.country_denominator} country records |`,
    `| Transparency entries | ${counts.transparency.denominator} | live \`TRANSPARENCY_DATA\` |`,
    `| Source-registry rows | ${counts.source_registry.row_denominator} | ${counts.source_registry.unique_source_ids} unique source IDs |`,
    `| LERU member profiles | ${counts.leru_members.denominator} | metadata denominator ${counts.leru_members.metadata_denominator} |`,
    `| Member validation processed | ${counts.leru_members.member_validation.processed} | ${counts.leru_members.denominator} profiles |`,
    `| Member validation open | ${counts.leru_members.member_validation.open} | ${counts.leru_members.denominator} profiles |`,
    `| Strict public-output evidence | ${counts.leru_members.strict_public_output.numerator} | ${counts.leru_members.strict_public_output.denominator} profiles |`,
    "",
    objectTable("Country stage counts", counts.countries.stage_counts),
    "",
    objectTable("LERU report-status counts", counts.leru_members.report_status_counts),
    "",
    objectTable("LERU evidence-level counts", counts.leru_members.evidence_level_counts),
    "",
    objectTable("LERU public-output categories", counts.leru_members.public_output_category_counts),
    "",
    "## Missing overview documents",
    "",
    counts.overview_documents.missing_countries.length > 0
      ? counts.overview_documents.missing_countries.map((country) => `- ${country}`).join("\n")
      : "None.",
    "",
    "## Validation",
    "",
    `- Member metadata denominator matches live data: ${counts.validation.member_metadata_matches_data ? "PASS" : "FAIL"}`,
    `- Public-output categories sum to member denominator: ${counts.validation.public_output_categories_sum_to_member_denominator ? "PASS" : "FAIL"}`,
    `- Source-registry IDs are unique: ${counts.validation.source_registry_ids_unique ? "PASS" : "FAIL"}`,
    `- Git commit: \`${counts.git.commit}\``,
    `- Working tree dirty: ${counts.git.dirty ? "yes; snapshot must retain file hashes and visible diffs" : "no"}`,
  ];
  return `${lines.join("\n")}\n`;
}

export function generateCounts({ root = REPO_ROOT, outputDirectory, accessDate = DEFAULT_ACCESS_DATE } = {}) {
  const destination = outputDirectory || path.join(root, "reports", "maintenance", `${accessDate}-counts`);
  const counts = buildDerivedCounts({ root, accessDate });
  writeJson(path.join(destination, "derived-counts.json"), counts);
  writeText(path.join(destination, "derived-counts.md"), countsToMarkdown(counts));
  return { counts, destination };
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  const root = path.resolve(args.root || REPO_ROOT);
  const outputDirectory = path.resolve(
    args["output-dir"] || path.join(root, "reports", "maintenance", `${args["access-date"] || DEFAULT_ACCESS_DATE}-counts`),
  );
  const accessDate = args["access-date"] || DEFAULT_ACCESS_DATE;
  const { counts } = generateCounts({ root, outputDirectory, accessDate });
  process.stdout.write(
    `${JSON.stringify(
      {
        output_directory: outputDirectory,
        countries: counts.countries.denominator,
        deep_dossiers: counts.countries.deep_dossiers,
        overview_documents: counts.overview_documents.present,
        transparency_entries: counts.transparency.denominator,
        source_registry_rows: counts.source_registry.row_denominator,
        leru_members: counts.leru_members.denominator,
        validation_processed: counts.leru_members.member_validation.processed,
        strict_public_output: counts.leru_members.strict_public_output.numerator,
        validation: counts.validation,
      },
      null,
      2,
    )}\n`,
  );
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  main();
}

