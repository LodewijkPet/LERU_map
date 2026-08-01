import assert from "node:assert/strict";
import fs from "node:fs";
import http from "node:http";
import path from "node:path";
import test from "node:test";
import {
  REPO_ROOT,
  auditSource,
  buildDerivedCounts,
  buildSourceManifest,
  canonicalizeUrl,
  loadAppData,
  parseCsv,
  stableSourceId,
} from "../leru_maintenance_lib.mjs";

test("CSV parser preserves quoted commas, quotes and line breaks", () => {
  const rows = parseCsv('id,title,note\n1,"A, B","line 1\nline 2"\n2,"A ""quote""",plain\n');
  assert.equal(rows.length, 2);
  assert.equal(rows[0].title, "A, B");
  assert.equal(rows[0].note, "line 1\nline 2");
  assert.equal(rows[1].title, 'A "quote"');
});

test("URL canonicalization is stable without merging HTTP and HTTPS", () => {
  assert.equal(canonicalizeUrl("https://EXAMPLE.org:443/path/#fragment"), "https://example.org/path");
  assert.notEqual(stableSourceId("http://example.org/path"), stableSourceId("https://example.org/path"));
  assert.equal(stableSourceId("https://example.org/path/"), stableSourceId("https://example.org/path"));
});

test("derived counts reproduce the current live denominators", () => {
  const counts = buildDerivedCounts();
  const appData = loadAppData();
  const registryRows = parseCsv(fs.readFileSync(path.join(REPO_ROOT, "data/source-registry.csv"), "utf8"));
  const overviewPresent = appData.countries.filter((country) =>
    fs.existsSync(path.join(REPO_ROOT, "data/" + country.name + "/Overview " + country.name + ".docx")),
  ).length;
  const validationProcessed = appData.members.filter((member) => /^Updated with /i.test(member.validationStatus || "")).length;
  const strictOutput = appData.members.filter((member) => member.sourceCoverage?.annualReportOrCaseOutput === "available").length;
  const categoryCounts = appData.members.reduce((result, member) => {
    result[member.publicOutputCategory] = (result[member.publicOutputCategory] || 0) + 1;
    return result;
  }, {});

  assert.equal(counts.countries.denominator, appData.countries.length);
  assert.equal(
    counts.countries.deep_dossiers,
    appData.countries.filter((country) => country.stage === "Deep dossier drafted").length,
  );
  assert.equal(counts.overview_documents.present, overviewPresent);
  assert.equal(counts.overview_documents.missing, appData.countries.length - overviewPresent);
  assert.equal(counts.transparency.denominator, appData.transparency.length);
  assert.equal(counts.source_registry.row_denominator, registryRows.length);
  assert.equal(counts.leru_members.denominator, appData.members.length);
  assert.equal(counts.leru_members.member_validation.processed, validationProcessed);
  assert.equal(counts.leru_members.member_validation.open, appData.members.length - validationProcessed);
  assert.equal(counts.leru_members.strict_public_output.numerator, strictOutput);
  assert.deepEqual(counts.leru_members.public_output_category_counts, categoryCounts);
  assert.ok(Object.values(counts.validation).every(Boolean));
});

function collectLiveUrls(value, output = new Set()) {
  if (Array.isArray(value)) {
    value.forEach((item) => collectLiveUrls(item, output));
  } else if (value && typeof value === "object") {
    for (const [key, child] of Object.entries(value)) {
      if ((key === "url" || key === "sourceUrl") && typeof child === "string" && /^https?:\/\//i.test(child)) {
        output.add(canonicalizeUrl(child));
      } else {
        collectLiveUrls(child, output);
      }
    }
  }
  return output;
}

test("source manifest has unique IDs and covers every live data-layer URL", () => {
  const appData = loadAppData();
  const liveUrls = collectLiveUrls([appData.countries, appData.transparency, appData.members]);
  const { manifest } = buildSourceManifest();
  const ids = manifest.sources.map((source) => source.source_id);
  const manifestUrls = new Set(manifest.sources.map((source) => source.url));
  assert.equal(new Set(ids).size, ids.length);
  for (const url of liveUrls) assert.ok(manifestUrls.has(url), `Missing live URL: ${url}`);
  assert.equal(manifest.source_count, manifest.sources.length);
  assert.ok(manifest.report_critical_count >= liveUrls.size);

  const hraBoundary = manifest.sources.find((source) => source.url.includes("hra.nhs.uk/planning-and-improving-research/application-summaries"));
  assert.ok(hraBoundary);
  assert.ok(hraBoundary.evidence_lanes.includes("boundary-regime"));
  assert.equal(hraBoundary.effective_evidence_lane, "mixed-or-review");
  assert.ok(!hraBoundary.dependent_claims.includes("country:united-kingdom:public-output"));
  assert.ok(!hraBoundary.dependent_claims.includes("country:united-kingdom:institutional-routes"));

  const lowiArchive = manifest.sources.find((source) => source.url === "https://lowi.nl/en/opinions");
  assert.ok(lowiArchive);
  assert.ok(lowiArchive.evidence_lanes.includes("general-research-integrity"));
});

test("technical audit records accessibility, redirects and HTTP failures without interpreting meaning", async (context) => {
  const server = http.createServer((request, response) => {
    if (request.url === "/redirect") {
      response.writeHead(302, { Location: "/ok" });
      response.end();
      return;
    }
    if (request.url === "/ok") {
      response.writeHead(200, { "Content-Type": "text/html", ETag: '"test-etag"' });
      response.end("<html><body>stable test</body></html>");
      return;
    }
    response.writeHead(404, { "Content-Type": "text/plain" });
    response.end("not found");
  });
  await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
  context.after(() => new Promise((resolve) => server.close(resolve)));
  const address = server.address();
  const base = `http://127.0.0.1:${address.port}`;

  const accessible = await auditSource({ source_id: "TEST-OK", title: "OK", url: `${base}/ok`, expected_result: "accessible" });
  assert.equal(accessible.status, "accessible");
  assert.equal(accessible.expectation_met, true);
  assert.equal(accessible.substantive_equivalence, "not assessed");

  const redirected = await auditSource({ source_id: "TEST-REDIRECT", title: "Redirect", url: `${base}/redirect`, expected_result: "redirect" });
  assert.equal(redirected.status, "redirected-accessible");
  assert.equal(redirected.redirect_chain.length, 1);
  assert.equal(redirected.expectation_met, true);
  assert.equal(redirected.substantive_equivalence, "human review required");

  const missing = await auditSource({ source_id: "TEST-MISSING", title: "Missing", url: `${base}/missing`, expected_result: "failure" });
  assert.equal(missing.status, "http-error");
  assert.equal(missing.http_status, 404);
  assert.equal(missing.expectation_met, true);
  assert.match(missing.review_reasons.join(" "), /HTTP 404/);
});
