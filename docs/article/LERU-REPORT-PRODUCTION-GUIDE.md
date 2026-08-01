# LERU Report Production Guide

Status: 31 July 2026  
Purpose: working specification for turning the LERU Integrity Map into a LERU-style public report. This is an internal project guide, not an official LERU template or publication.

## Recommended endpoint

Use a **LERU advice paper or public report as the primary product**, with a shorter journal article considered only after the report's terminology, evidence and member validation have stabilised.

This recommendation follows the public LERU Research Integrity Group examples reviewed below. It still requires confirmation from Claire on the publication series, current group name, house style, approval route, authorship and desired length.

The current Word outline in `reports/LERU-research-integrity-report-article-outline-review.docx` is already broadly aligned with this model. The main missing work is not another outline: it is a publication decision, evidence freeze, continuous prose, final comparative tables and figures, recommendations assigned to audiences, formal references, acknowledgements and approval metadata.

## Public LERU examples reviewed

| Example | Package and structure | Main lesson for this project |
| --- | --- | --- |
| *Towards a Research Integrity Culture at Universities: From Recommendations to Implementation* (2020) | 48-page full advice paper plus a 3-page executive summary. The full paper moves from a compact summary of recommendations, to detailed rationale, to member-university examples of practice. | A broad RI report can be longer when it combines an analytical framework, recommendations and a substantial comparative practice section. Put the recommendations early and make the member evidence usable as examples rather than a directory alone. |
| *Defining Responsible and Equitable Authorship by a Principle-based Approach* (2023) | 20-page full advice paper plus a 2-page executive summary. It contains an introduction, a principles-based framework, recommendations for researchers, universities and journals, a conclusion/future-perspectives section and a reference list. | Use an explicit organising framework and assign every recommendation to a named audience. Include author contributions, ORCIDs where appropriate, acknowledgements and consultation history. |
| *Communicating with Integrity: Supporting Researchers with Best Practice in Communication* (2024) | 16-page full advice paper plus a 2-page executive summary. It presents the problem, relates it to existing codes, develops four action areas, closes with an implementation-oriented conclusion and provides a practical checklist appendix. | Keep the main argument focused and finish with something readers can use: a checklist, minimum dataset, route-verification form or implementation roadmap. |

The examples use different public names for the group over time: **Research Integrity Thematic Group** (2020), **Research Integrity Policy Group** (2023) and **Research Integrity Group** (2024). Do not use "Research Integrity Subcommittee" as the formal publication credit without confirming the current preferred term with Claire.

LERU's publications page also states that its papers are written by academics or topic experts from member universities with support from a LERU Policy Officer, and that papers go through review and approval involving all LERU institutions. The examples additionally acknowledge comments from the LERU Board of Directors and Rectors' Assembly. These are publication-governance signals to confirm with Claire, not steps this project should assume automatically.

## Proposed publication package

The following is a planning envelope, not an official LERU length rule:

1. **Main advice paper/report:** approximately 30-40 pages if the 24 institution profiles are condensed; up to 40-50 pages if all profiles remain in the main document.
2. **Standalone executive summary:** 2 pages, written after the main report is stable and able to circulate independently.
3. **Technical annex or data compendium:** full 24-member matrix, country-system table, codebook, validation log and detailed source notes. Keep this material available without allowing it to overwhelm the policy narrative.
4. **Optional journal article:** a later, narrower methodological or comparative paper based on the frozen report dataset.

Prefer the shorter main report plus a technical annex. Recent LERU advice papers are concise, while the 2020 paper shows that a longer format works when extensive member practice examples are integral to the argument.

## AI-maintained evidence base and human-led writing

The project should be maintainable through bounded AI work, while the report remains a human-authored scholarly and policy product. Treat AI as an evidence, analysis, drafting and quality-assurance collaborator—not as the owner of institutional claims or publication decisions.

| Work | AI role | Human role |
| --- | --- | --- |
| Source maintenance | Recheck official URLs, redirects, dates, versions and content changes; produce diffs and exceptions. | Decide how ambiguous, conflicting or politically sensitive changes affect the report. |
| Document discovery | Search official national, body, funder and institutional sources against a defined evidence gap; register and store useful sources. | Decide when the evidence is sufficient and whether an unresolved gap is acceptable. |
| Structured extraction | Extract fixed fields from annual reports, decision repositories and procedure documents; retain provenance and uncertainty. | Review classifications whose meaning depends on legal, linguistic or institutional judgment. |
| Dataset maintenance | Apply evidence-backed patches, regenerate counts and run validation without overwriting unrelated work. | Approve schema or scope changes and any reclassification that changes a headline conclusion. |
| Analysis | Generate reproducible tables, descriptive comparisons, candidate patterns, counterexamples and limitations. | Choose the report's principal findings and prevent overinterpretation, causal claims or rankings. |
| Writing | Prepare section briefs, claim-evidence packs and first drafts from approved evidence; perform targeted revisions. | Set the argument, voice, examples, interpretations, recommendations and final wording. |
| Quality assurance | Audit claims, citations, counts, links, boundary language, accessibility and reproducibility. | Conduct the final author read and approve the exact review or publication files. |
| Communication and publication | Draft reminders, replies, cover notes and change summaries when asked. | Send messages, confirm authorship and LERU governance, approve circulation and publish. |

AI must never silently turn member feedback into a public source, interpret no search result as proof that nothing exists, merge boundary regimes into general misconduct handling, overwrite a human-authored passage without a visible diff, or send or publish externally without an explicit human instruction.

### Standard contract for an AI evidence batch

Every substantial AI batch must start with:

1. a precise target set, such as seven named member profiles or one defined repository series;
2. the exact evidence question or report fields being improved;
3. a data cut-off and access date;
4. the canonical local inputs and files that may be changed;
5. the official source types and languages to search;
6. stop conditions for low-yield or inaccessible searches;
7. the required structured output and validation commands.

Every batch must finish with:

1. a source-by-source result and provenance record;
2. a visible diff of proposed or applied data changes;
3. regenerated dependent counts rather than hand-edited totals;
4. a list of changed, strengthened, weakened or still unsupported report claims;
5. a list of ambiguity, translation, privacy or human-decision items;
6. successful syntax and data-consistency checks;
7. a concise completion memo naming the next bounded batch.

### Maintenance cadence

- **On receipt:** process member feedback or a reported source change through provenance capture, official-source verification, a minimal profile patch, validation-log update, tracker reconciliation and a human-approved reply draft.
- **Monthly:** run technical checks on report-critical URLs, redirects and document metadata; investigate meaningful changes or failures.
- **Quarterly:** recheck changed laws, codes, committee routes, annual reports and public-output repositories, then regenerate the comparative snapshot.
- **Before every formal draft:** freeze a reproducible snapshot and audit every headline claim, denominator, table and figure against it.
- **Annually:** complete a full system, member, source-registry, boundary, repository and negative-finding review and decide whether a report revision or erratum is warranted.

The detailed executable roadmap is maintained in the linked Overview workplace `leru-report-production`. Its project cards distinguish `work_mode: "ai"`, `work_mode: "mix"`, human actions and waiting dependencies.

## Required report architecture

| Section | What it must contain | Current project status and remaining work |
| --- | --- | --- |
| Cover and publication identity | Final title and subtitle; publication type; month/year; author names and affiliations; LERU identity; version or data cut-off where appropriate. | Working cover exists. Confirm the publication series and title with Claire, correct the malformed visible title in the current review DOCX, and refresh the July snapshot metadata. |
| Contents, authorship and acknowledgements | Contents; authors and ORCIDs where appropriate; author-contribution statement; LERU Office support; participating groups; member contributors; consultation and approval acknowledgements. | Not yet finalised. The current outline has no agreed author list, contribution statement or approval trail. |
| Executive summary | Problem, purpose, evidence base, headline findings, implications, 4-6 recommendations and principal limitations in about two pages. It must make sense without the main report. | A strong draft exists, but counts, data cut-off and member-validation status need refreshing before it becomes the standalone executive summary. |
| Introduction and policy problem | Why the mapping is needed now; why a route-based comparison improves on single-body descriptions; intended audiences; the report's principal claim and practical value. | Substantive outline text exists. Convert it to continuous, referenced prose. |
| Scope, concepts and questions | Definitions of research integrity, misconduct, questionable research practices, public output and transparency; unit of observation; research questions; explicit boundary rules. | Strong outline material exists. Freeze terminology against the final publication scope and the current ALLEA/code baseline. |
| Methods and evidence | Corpus, inclusion rules, official-source-first method, extraction stages, quality consolidation, public-output coding, member-validation method, data cut-off, languages, reproducibility and limitations. | Evidence architecture exists. Add a formal, reproducible methods section and a dated flow/count diagram. State response and validation denominators explicitly. |
| European system landscape | The route typology; how national, institutional, funder, academy and specialist actors allocate functions; representative country examples; a route-flow figure. | Typology and country dossiers exist. The continuous comparative narrative and final figure still need drafting. |
| Public accountability and case visibility | The publication continuum; publication ownership; public procedure versus public outcome; aggregate versus case-level output; confidentiality and learning; strongest repository examples. | Typology and 35-jurisdiction layer exist. Freeze counts, field-index the highest-yield repositories and select a small number of examples for the main narrative. |
| LERU member landscape | The 24-member denominator; route and output categories; validated versus public-source-only status; cross-institution findings; concise member evidence. | All 24 profiles are Detailed seed. Eight have confirmed member validation and 16 remain open as of this guide. Decide whether short capsules stay in the main report or move to an annex. |
| Cross-case lessons | Functional route design, second-line review, publication ownership, reporting depth, confidentiality safeguards, boundary discipline and version control. | Strong outline prompts exist. Convert them into an evidence-led argument with selected examples rather than a list of observations. |
| Recommendations by audience | A short set of concrete recommendations, each with an actor, action, rationale, evidence link and practical implementation route. Distinguish LERU/network actions from actions for member universities, national bodies or funders. | Six candidate recommendations exist. Assign audiences, remove overlap, prioritise them and add implementation detail. |
| Implementation and maintenance | Minimum public accountability dataset; verified route register; member update cycle; ownership; review frequency; versioning; how new reports and procedure changes are incorporated. | Core ideas exist but need an owner, cadence and decision on what LERU is actually being asked to maintain. |
| Discussion and limitations | What public-source mapping can and cannot show; ascertainment bias; language and access limitations; no inference from visibility to case incidence or institutional quality. | Strong outline material exists. Add claim-level evidence and distinguish dataset limitations from policy choices. |
| Conclusion | Restate the answer to the research questions and the practical decision or invitation for LERU members. Do not merely repeat the executive summary. | Draft conclusion exists. Finalise after recommendations and publication purpose are agreed. |
| References | Formal bibliography plus claim-level citations to primary official sources. Use stable links and access/version dates. | Source registry and profile links provide the backbone; the report bibliography and footnotes/endnotes are not yet built. |
| Appendices | Codebook; country typology; transparency table; 24-member route/output matrix; member-validation questionnaire and change log; source protocol; limitations register; optional practical checklist. | Appendix plan exists. Decide which annexes are necessary for publication and which remain project records. |

## Minimum figures and tables

The report should contain only visuals that carry an analytical job:

1. **Figure 1 - How a concern travels:** intake, preliminary assessment, investigation, decision, review and publication, with boundary regimes shown as adjacent lanes.
2. **Figure 2 - European system typology:** a non-ranking map or matrix showing how authority is allocated.
3. **Figure 3 - LERU public-output models:** the five visibility categories, publication owner and validation status.
4. **Table 1 - Corpus and method:** country, dossier, transparency, source-registry and LERU-profile denominators with the data cut-off.
5. **Table 2 - LERU comparative findings:** member, country, institutional route, national/sector route, dominant output model, validation status and main evidence gap.
6. **Table 3 - Recommendations:** audience, recommended action, rationale, implementation mechanism and proposed owner or review point.

The 24-member detail table can sit in an appendix if it makes the main paper too dense. Do not turn every country or institution profile into a full narrative chapter unless it advances a cross-case claim.

## Evidence and language rules

- Treat the report as a system map, not a ranking.
- Never infer misconduct incidence, procedural quality or institutional performance from public visibility alone.
- Label the publication owner: institution, national body, regional body, sector body, academy or funder.
- Keep general misconduct handling separate from prospective ethics review, clinical trials, animal research, data protection, IP, quality assurance, student discipline, whistleblowing and employment procedures unless a source explicitly connects them.
- Use the dated wording **"no public source was identified in this review"**, not **"none exists"**, unless an authoritative source supports the stronger claim.
- Keep the strict binary output flag separate from the broader visibility typology and explain both denominators.
- State the report's data cut-off once in the executive summary and methods, and date all time-sensitive negative findings.
- Show member-validation status for every profile. Do not imply that a public-source draft is institutionally approved.
- Cite primary official sources at claim level and keep the source registry as the audit trail.
- Use anonymised or aggregate public examples; do not reproduce confidential case material or personal contact data.
- Use precise current body names. Define abbreviations at first mention and avoid translating local bodies into powers they do not possess.

## Questions to resolve with Claire

1. Is the intended primary product an official LERU advice paper, another LERU report type, an independent project report, or a report plus later journal article?
2. What is the current preferred name of the responsible group for publication credit?
3. Which LERU template, length range and editorial contact should be used?
4. Which review and approval stages are required, and who coordinates member, Board of Directors and Rectors' Assembly review?
5. Who should be listed as author, contributor and acknowledged reviewer, and are ORCIDs and an author-contribution statement expected?
6. Should all 24 member capsules appear in the main paper or in a technical annex?
7. What level of member validation is required before publication, and how should non-response be shown?
8. Should Claire send one network reminder, or should Lodewijk contact the 16 remaining member contacts individually?
9. What response deadline and data cut-off should govern the next draft?
10. Should a standalone two-page executive summary and practical route-verification/minimum-dataset checklist be delivered with the full report?

## Definition of done

The report is ready for formal review only when all of the following are true:

- [ ] Publication type, title, primary audience, group name, authorship and approval route are agreed.
- [ ] A dated data cut-off is frozen and all headline counts regenerate from the project data.
- [ ] The 24-member table distinguishes confirmed validation from public-source-only profiles; non-response is reported honestly.
- [ ] High-yield output repositories used in headline claims are indexed at the required row or annual-report level.
- [ ] The main narrative answers the research questions and uses examples to support cross-case claims.
- [ ] Every recommendation names an audience and a feasible action or implementation mechanism.
- [ ] Figures and tables are non-ranking, source-linked, legible and internally consistent.
- [ ] Boundary regimes remain separate throughout text, tables and figures.
- [ ] Claims have formal references and negative findings have dates and cautious wording.
- [ ] Acknowledgements, author contributions, consultation and approval metadata are complete.
- [ ] A standalone executive summary has been written from the final report, not from a stale draft.
- [ ] An independent reader can understand the report without the Cambridge presentation or the website.
- [ ] The final Word/PDF package has passed accessibility, link, layout and source-current checks.

## Next drafting sequence

1. Ask Claire about the reminder route and the ten publication decisions above.
2. Run the agreed feedback round using the current **8 processed / 16 open** tracker.
3. Freeze the report type, authors, audience and data cut-off.
4. Refresh the outline builder's date, counts and validated profile text, then regenerate the review copy.
5. Build the final comparative member table and the two core route/output figures.
6. Complete only the row-level indexing needed for claims that will appear in the report.
7. Draft the methods, comparative findings, cross-case lessons and recommendations as continuous prose.
8. Move detail that interrupts the argument into appendices.
9. Run member/editorial review with tracked decisions and a visible change log.
10. Write the standalone executive summary last and prepare the accessible publication package.

## Official sources

- [LERU publications: publication types and review process](https://www.leru.org/publications)
- [Towards a Research Integrity Culture at Universities - publication page](https://www.leru.org/publications/towards-a-research-integrity-culture-at-universities-from-recommendations-to-implementation)
- [Towards a Research Integrity Culture at Universities - full paper](https://www.leru.org/files/Towards-a-Research-Integrity-Culture-at-Universities-full-paper.pdf)
- [Towards a Research Integrity Culture at Universities - executive summary](https://www.leru.org/files/Publications/Towards-a-Research-Integrity-Culture-at-Universities-executive-summary.pdf)
- [Defining Responsible and Equitable Authorship - publication page](https://www.leru.org/publications/defining-responsible-and-equitable-authorship-by-a-principle-based-approach)
- [Defining Responsible and Equitable Authorship - full paper](https://www.leru.org/files/Publications/2023.09.08_Authorship-paper_fullpaper_DEF.pdf)
- [Defining Responsible and Equitable Authorship - executive summary](https://www.leru.org/files/2023.09.08_Authorship-paper_Design_ExSum_DEF.pdf)
- [Communicating with Integrity - publication page](https://www.leru.org/publications/communicating-with-integrity-supporting-researchers-with-best-practice-in-communication)
- [Communicating with Integrity - full paper](https://www.leru.org/files/Publications/Communicating-with-intergrity_LERU-paper.pdf)
- [Communicating with Integrity - executive summary](https://www.leru.org/files/Publications/Communicating-with-intergrity_LERU-paper_executive-summary.pdf)
- [LERU Research Integrity Policy Group chair announcement](https://www.leru.org/news/new-chairs-for-leru-policy-groups)
