# Lithuania deep-dive sources

Working note for the Lithuania committee-and-case-file pilot.

Updated: 23 April 2026.

## Starting point

Lithuania was already represented as a deep dossier in `data/countries.js`, with the Office of the Ombudsperson for Academic Ethics and Procedures coded as the central national route, the Research Council of Lithuania as a funder ethics route, and VU, KTU and LSMU as institutional examples.

The pilot did not rebuild the dossier from zero. It checked the existing transparency and committee claims against current official sources and focused on the case-file question: whether the public route contains only summary/metadata material or actual decision files.

## Committee and case-file pass

### Seed bodies

- Body: Office of the Ombudsperson for Academic Ethics and Procedures
- Type: National ombudsperson / national academic ethics and procedures body
- Lane: Academic ethics and academic procedures in research and higher education institutions
- Role: Handles complaints, can initiate investigations, issues decisions, publishes decision information, and produces recommendations, guidelines, reports and analytics.
- Strongest current source: Ombudsperson decisions archive
- Publication owner: Office of the Ombudsperson for Academic Ethics and Procedures
- Archive scope: National Ombudsperson decisions in the academic ethics and procedures lane.
- Archive continuity: Current structured archive; not a complete permanent historical archive because the publication rules include appeal suspension/removal and a one-year online availability period.
- Referral path: Institutional routes can precede or feed the national route; the national Office decision or court route may follow local handling.
- Publication depth: Full depersonalized decision PDFs when the publication stage has been reached, plus immediate decision metadata.
- Publicity mode: Proactive online publication.
- Publication lifecycle: Decision title, number, date and keywords are announced immediately; after the 30-day appeal term, the depersonalized decision is uploaded within 10 working days; appealed decisions are not public during proceedings or are removed if appeal information is learned after publication; the one-year availability period runs from upload or from final procedural judgment.
- Outcome maturity: Final decision when in the decisions archive; complaint/investigation entries are pre-decision and must not be counted as violations.
- Publication class: Structured national decision archive with lifecycle limits.
- Accessibility status: Decisions page and representative PDF decision were live in this pass.
- Case-file status: Strong public case-file trail for national decisions, but time-limited and appeal-sensitive.
- Publication basis: Ombudsperson complaint/investigation procedure and publication practice.
- Publication exclusions: Appeal-stage decisions may be withheld or removed; online availability is time-limited; published decisions are depersonalized and redact identifying details.
- Publication rule or retention: One-year online availability after upload or final procedural judgment.

- Body: Ombudsperson complaints and investigations page
- Type: National route-status page
- Lane: Academic ethics and procedures complaints/investigations
- Role: Shows active or pending complaint/investigation subjects before final decision.
- Strongest current source: Complaints and investigations page
- Publication owner: Office of the Ombudsperson for Academic Ethics and Procedures
- Archive scope: Open or recent complaint/investigation subjects and statuses.
- Archive continuity: Current status page; not a decision archive.
- Referral path: Leads into Ombudsperson investigation and possible final decision.
- Publication depth: Metadata/status only.
- Publicity mode: Proactive online status publication.
- Publication lifecycle: Investigation information appears before any finding; final violation status only exists if the Ombudsperson issues a decision after closure.
- Outcome maturity: Pending or pre-decision.
- Publication class: Investigation status page.
- Accessibility status: Live in this pass.
- Case-file status: Route visibility, not case-outcome evidence.
- Publication basis: Office procedure and website practice.
- Publication exclusions: No full case file or final finding on this page.
- Publication rule or retention: Not identified beyond the live page.

- Body: Research Council of Lithuania
- Type: Funder ethics committee
- Lane: Funding applications, reports, institutional evaluation material and other RCL activity
- Role: Permanent Research Ethics Committee advises the RCL chair, examines research-ethics documents and reviews notifications on possible violations within RCL activity.
- Strongest current source: RCL Research Ethics Committee page
- Publication owner: Research Council of Lithuania
- Archive scope: No public case archive found in this pass; the source proves committee mandate and notification route.
- Archive continuity: Procedure and composition source, not case archive.
- Referral path: Recommendations and advice to the RCL chair; possible funding or evaluation consequences under RCL rules.
- Publication depth: Procedure/committee information only in this pass.
- Publicity mode: Official committee page.
- Publication lifecycle: Not identified for case outputs.
- Outcome maturity: Potential notification route, not public final case-file route.
- Publication class: Procedure only / no public case archive found.
- Accessibility status: Official page located by web search; direct command-line request was blocked by Cloudflare during this pass.
- Case-file status: No public RCL case files located.
- Publication basis: RCL committee rules and official committee page.
- Publication exclusions: Case-output publication not found.
- Publication rule or retention: Not identified.

- Body: Vilnius University Central Academic Ethics Commission
- Type: Institutional academic ethics commission
- Lane: University-wide academic ethics appeals and disputes
- Role: Central academic ethics body supported by unit-level academic ethics commissions.
- Strongest current source: VU Central Academic Ethics Commission 2024 performance report
- Publication owner: Vilnius University
- Archive scope: Institutional reporting and selected public English material; not yet a complete institutional case archive.
- Archive continuity: 2024 report verified as live; broader continuity still to check.
- Referral path: Local unit or central VU handling, with possible national Ombudsperson or court route afterwards.
- Publication depth: Institutional annual/practice reporting; individual decision visibility still needs a wider VU-specific pass.
- Publicity mode: Proactive official PDF reporting.
- Publication lifecycle: Not fully mapped.
- Outcome maturity: Institutional practice/reporting rather than national final-decision archive.
- Publication class: Annual/practice report.
- Accessibility status: Live PDF, redirects to the old VU domain.
- Case-file status: Strong institutional exemplar, but not yet proven as complete public case-file archive.
- Publication basis: VU committee reporting practice.
- Publication exclusions: Not yet mapped.
- Publication rule or retention: Not yet mapped.

### Public case-material sources

- Source: Existing source-registry entry `TR-LT-001`, Ombudsperson decisions archive
- Body: Office of the Ombudsperson for Academic Ethics and Procedures
- Format: HTML archive with decision metadata and links to official PDFs
- Access: Public, official page
- Case level: Decision metadata and depersonalized decision PDFs when the publication stage has been reached
- Note: Core national transparency source.

- Source: Ombudsperson decision of 12 June 2025, No. SP-4
- Body: Office of the Ombudsperson for Academic Ethics and Procedures
- Format: Official PDF
- Access: Public, official PDF
- Case level: Full depersonalized decision
- Note: Representative proof that the archive contains actual decision files, not only summaries.

- Source: Complaints and investigations
- Body: Office of the Ombudsperson for Academic Ethics and Procedures
- Format: HTML status page
- Access: Public, official page
- Case level: Pre-decision complaint/investigation status
- Note: Must be coded as route visibility, not as a finding of violation.

- Source: Procedure of Complaints Handling and Investigations at the Initiative of the Ombudsperson
- Body: Office of the Ombudsperson for Academic Ethics and Procedures
- Format: Official PDF
- Access: Public, official PDF
- Case level: Procedure and publication rule, not case output
- Note: Important for publication timing and lifecycle coding.

- Source: Activity Report for 2025
- Body: Office of the Ombudsperson for Academic Ethics and Procedures
- Format: Official PDF
- Access: Public, official PDF
- Case level: Aggregate and narrative annual-report evidence
- Note: Useful cross-check on volumes and the Office's broader prevention/analytics role.

- Source: Research Ethics Committee of the Research Council of Lithuania
- Body: Research Council of Lithuania
- Format: Official web page
- Access: Public official page located by web search
- Case level: Committee mandate and notification route, not public case files
- Note: Separate funder ethics lane; no public RCL case archive found in this pass.

- Source: VU Central Academic Ethics Commission 2024 performance report
- Body: Vilnius University
- Format: Official PDF
- Access: Public PDF, redirected to old VU host
- Case level: Institutional reporting/practice evidence
- Note: Useful institutional exemplar, but wider institutional coverage remains a next-pass task.

### Method notes

- Lithuania is the counterpoint to Finland. Finland showed a searchable national summary archive without full online statements; Lithuania shows full depersonalized decision PDFs, but with a staged, appeal-sensitive and time-limited publication lifecycle.
- The case-file workflow should therefore distinguish `publication depth` from `archive durability`. A full decision PDF is stronger than a summary, but the archive can still be incomplete as a historical record.
- The workflow also needs `outcome maturity`. Lithuania's complaints/investigations list is open and useful, but it is explicitly pre-decision; it should not be coded as a violation register.
- For future countries, collect one representative decision PDF or case file whenever an archive claims to publish decisions. Archive pages alone may not prove the depth of the case material.

### Gaps for next pass

- Complete the institutional inventory beyond VU, KTU and LSMU, especially Vilnius Tech, Vytautas Magnus University, major research institutes and universities of applied sciences.
- Check whether VU, KTU, LSMU and other institutions publish individual academic ethics decisions, anonymized summaries, annual reports, or only procedures.
- Compare a sample of Ombudsperson decisions against institutional code and committee references to see which local routes most often become national cases.
- Look for any public RCL notification outcomes or funding-consequence traces; none were located in this pass.
