# LERU Institution Extraction Workflow

Use this workflow when upgrading a LERU member profile in `data/leru-members.js`.

## Scope

The LERU institution layer is a public-source pilot. It should show enough institutional evidence to support member validation without exposing private contacts, unpublished case details or operationally sensitive information.

## Source Order

1. Search the repository first: country dossiers, transparency data, source registry, country source notes and existing LERU records.
2. If local evidence is insufficient, use official public sources only: university pages, official regulations, committee or office pages, annual reports, public decision pages and stable PDFs.
3. Use non-official sources only with an explicit limitation note. For this layer, the default is to omit them.

## What To Extract

For each institution, update only verified fields:

- `reportStatus`
- `profileStatus`
- `evidenceLevel`
- `transparencyCategory`
- `institutionalRoute`
- `committeeOrOffice`
- `procedureSummary`
- `publicOutputSummary`
- `transparencySummary`
- `sourceCoverage`
- `sourceLinks`
- `tags`
- `caveats`
- `nextFollowUp`
- `memberValidationQuestions`

Keep country-level route wording separate from the institution-level route. Do not import another institution's route because it is in the same country or city.

## Status Guidance

- `Coverage placeholder`: no institution-specific route is verified.
- `Partial seed`: official institution-specific procedure, office, committee, ombuds or boundary evidence is verified, but the public-output audit, caveats or member-validation questions are still incomplete.
- `Detailed seed`: the institution-specific route is usable for member validation and either public annual reporting, aggregate statistics, anonymized case summaries or a comparable output channel is verified, or a careful no-output / limited-output audit is complete with category wording, caveats and validation questions.

Use `evidenceLevel: "Moderate"` for a clear official procedure route without public-output evidence. Use `evidenceLevel: "Strong"` only where public outputs or unusually complete official evidence are present.

## Boundary Controls

Do not recode adjacent regimes as misconduct handling:

- research ethics review
- clinical trials
- animal research
- data protection
- IP or commercialization
- open science
- doctoral training
- HRS4R or HR policy
- quality assurance
- anti-discrimination, whistleblowing or employment discipline

These can be included as boundary, prevention or support routes when official sources show that they matter.

## Public-Safe Rules

- Do not reproduce personal email addresses, telephone numbers or private operational details from contact pages.
- Do not imply absence of cases from absence of public case-output evidence.
- Do not treat a historical case page as a standing public archive unless the source clearly does so.
- Mark uncertainty directly in `caveats`, `publicOutputSummary` and `nextFollowUp`.

## Logging And Checks

After each batch:

1. Add one row per institution to `data/leru-extraction-log.csv`.
2. Run:

```powershell
node --check data\leru-members.js
node --check assets\js\leru.js
node --check assets\js\leru-report.js
node --check data\countries.js
node --check data\transparency.js
node --check assets\js\app.js
```

3. Smoke check `/leru/`, `/reports/leru-institutions-report.html` and the main app when the request calls for visual/browser validation.
