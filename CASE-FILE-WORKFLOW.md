# CASE-FILE-WORKFLOW.md

This file is the standing handoff for the committee-and-case-file discovery pass.

Use it when a country already has a stable dossier, or when a final sweep needs stronger evidence on who handles research-integrity cases and what public case material exists.

## Why This Pass Exists

As of 28 April 2026:

- the app contains 49 country records
- 40 of those records are already labelled `Deep dossier drafted`
- 40 readable `Overview <Country>.docx` files are represented in the app
- 35 countries already have explicit entries in `data/transparency.js`
- `data/source-registry.csv` contains 1370 entries

The project already has a strong country-by-country system map. What it does not yet have is one repeatable workflow for the next question: which bodies actually handle cases, and what case-file or case-publication trail do they leave behind?

This pass is meant to close that gap without rebuilding the project from zero.

## Core Question

For each country, determine:

1. Which bodies handle, review, appeal, monitor or publish research-integrity cases?
2. What public case-file trail exists for each body?
3. How open, structured and durable is that trail?

## Unit Of Observation

Treat the route as the unit, not only the committee.

Include:

- national ethics or integrity councils
- academy committees
- ombudspersons or integrity offices
- appeals bodies
- funder integrity or compliance routes
- university and public-research-institute committees
- ministerial or regulator routes if they materially shape case handling or publication

Do not force every route into a formal committee label if the real actor is an office, board, secretariat, ombudsperson or appeals chamber.

## What Counts As A Case File

Case-file evidence may include:

- full reasoned decisions or opinions
- anonymized case summaries
- archived rulings or statement pages
- case-specific press releases or notices by the responsible body
- annual reports with identifiable case entries or case counts
- searchable registers or decision hubs

Not enough on its own:

- generic codes or ethics guidelines
- research-ethics approval lists unless they are the actual route being mapped
- plagiarism-software or AI-detection pages without adjudication evidence
- media coverage unless it leads back to an official source
- whistleblowing or employment material unless it is explicitly the research-integrity route

## Evidence Classes

Use one of these visibility classes for each body:

1. `Structured archive`: searchable or stable decision hub.
2. `Stable case page`: durable page grouping case outputs.
3. `Individual case files`: isolated PDFs, HTML decisions or notices.
4. `Annual-report summaries`: recurring reports with case descriptions or counts.
5. `Aggregate statistics only`: no case-level material, but public volumes or outcomes.
6. `Procedure only`: rules or publication duties found, but no actual case output located.
7. `No public trace found`: body known from law or procedure, but no public case material identified in this pass.

## Pilot Refinements From The Netherlands

The first Dutch pilot added four practical rules that should now be treated as part of the method:

- separate the handling body, the final decision-maker and the publication owner
- code sector hubs such as UNL or VH as publication owners when they publish cases decided by institutional boards
- record retention, anonymization and publication-format rules when an official template or publication deadline is public
- describe strong countries as a publication ladder when several public layers coexist, for example national archive, sector archive, funder annual report, institutional page and no-public-trace routes

## Pilot Refinements From Romania

The second Romanian pilot added four more rules for split systems:

- code publication visibility lane by lane before assigning one country-level transparency tier
- separate publication duty in law, an officially linked archive, and an archive that is directly reachable in the current pass
- use at least one negative-finding source when the legal route is public but case-file visibility remains weak, as with CNATDCU in this pass
- do not let one strong university archive overstate a weaker national lane, or let a law-based national archive claim hide stronger institutional publication routes

## Pilot Refinements From Sweden

The third Swedish pilot added four more rules for archive-heavy countries:

- separate archive scope from system scope; a strong national archive may cover only one statutory lane
- record publication exclusions when an official archive omits categories such as rejection decisions
- code national annual-report synthesis as a separate publication layer when locally handled cases are only reported upward in anonymized or aggregate form
- when multilingual official sites differ, note whether a translated page is a full archive or only a language-limited access point

## Pilot Refinements From Denmark

The fourth Danish pilot added four more rules for archive-heavy split systems:

- record archive continuity separately when the current official archive also preserves predecessor-body decisions
- treat direct national decisions and institution-reported annual synthesis as separate publication layers even when the same national owner publishes both
- note referral or return paths when national decisions send possible QRP issues back to institutions for local handling
- when a translated official archive page exposes only older material, code it as a partial or historical mirror rather than as the full current archive

## Pilot Refinements From Finland

The fifth Finnish pilot added four more rules for summary-archive and public-document systems:

- separate proactive online publication from public-document access after case closure
- record publication depth separately, for example full decision, full statement, anonymized summary, annual statistics or procedure-only trace
- do not let a national summary archive hide the first-instance local decision layer in self-regulatory systems
- when the same national body publishes or summarizes both RI statements and boundary ethics-review statements, code those lanes separately

## Pilot Refinements From Lithuania

The sixth Lithuanian pilot added four more rules for full-decision archives with lifecycle limits:

- separate publication depth from archive durability; a full depersonalized decision PDF is stronger than a summary, but it may still be available only for a limited period
- record publication lifecycle when decisions move through immediate metadata, post-appeal publication, appeal suspension or removal, and retention-window expiry
- record outcome maturity separately, especially when a public complaints or investigations list is pre-decision and explicitly not a violation register
- collect at least one representative decision file or case PDF when an archive claims to publish decisions, because the archive page alone may not prove case-file depth

## Pilot Refinements From Norway

The seventh Norwegian pilot added four more rules for countries with parallel public routes:

- distinguish route scope from archive scope even when the archive is excellent; GRU statements are strong national misconduct files, but not the full institutional first-instance universe
- code boundary-regime decision databases separately from misconduct archives; NEM has a strong medical-health appeal decision database that must not be collapsed into GRU
- treat public registers and postjournals as regulatory transparency unless they expose case reasoning; REK project metadata and document-journal visibility are not misconduct case files
- use annual reports to map hidden pipelines when institutions must report cases upward but only a subset becomes individual public statements

## Pilot Refinements From Italy

The eighth Italian pilot added six rules for countries with many small official publication nodes:

- code database function explicitly; an open clinical-trials CSV page, animal-project database, DPA decision database, opinion archive, institutional annual report and misconduct decision archive are different evidence classes
- treat micro-publication nodes as route-mapping evidence, not automatic proof of national misconduct-case transparency
- record restricted institutional records as positive evidence of where the file sits and negative evidence for public access; University of Milan's restricted committee minutes are useful even though they are not public
- keep strong boundary-regime case files visible but separate; Garante research-data decisions and AIFA clinical-trial data are public, structured and important, but they do not replace a general RI archive
- use accessibility-limited official pages as a finding with caution notes, especially where anti-bot or cookie validation blocks automated access to otherwise official database pages
- for every case-like source, record public fields and non-public fields separately; an incidental governance-minutes trace, a study-level approval page, a restricted minute notice and a regulator decision are all evidence, but they are not the same publication class

## Pilot Refinements From United Kingdom

The ninth UK pilot added nine rules for decentralized annual-statement systems:

- treat institutional annual statements as the primary public corridor when employers are the case handlers and no national misconduct archive exists
- record annual-statement depth separately for each institution: named contacts only, aggregate counts, allegation categories, anonymized numbered rows, narrative case learning or full decisions
- label synthetic or educational case studies clearly; UKRIO case-study packs can explain practice but are not real case files
- separate national stewardship from employer handling; UKCORI analyses and coordinates, UKRIO advises, and employers normally investigate
- separate funder assurance from adjudication; UKRI can require reporting, information, remedial action and grant-related consequences, but is normally not the first-instance investigator or appeal body
- store devolved funding-body routes separately when a state has a shared national framework but subnational assurance layers; for the UK this means Research England, Medr, SFC and DfE NI should not be hidden under one generic UKRI label
- store charitable funder reporting separately from public case publication; Wellcome and CRUK create confidential notification, final-report and sanction routes without creating public misconduct archives
- use multi-jurisdiction institutional examples when the same national framework is implemented under different local titles; Oxford, Edinburgh, Cardiff and Queen's Belfast are better as function-matched examples than as identical committee labels
- preserve richer boundary registers such as HRA research summaries, ASRU non-compliance reports and HFEA licence decisions, while coding them as health, animal or fertility/embryology routes rather than general research-misconduct archives

## Pilot Refinements From Germany

The tenth German pilot added five rules for funder-list and confidential ombuds systems:

- treat a curated funder press-release list as a case-publication lane, but record its jurisdiction limits before assigning a country-level transparency tier
- separate confidential intake portals from public databases; intake proves where allegations enter, not what is publicly published
- code national ombuds annual reports as aggregate transparency unless they publish individual decisions
- search for institutional annual reports, because local universities may publish richer tables than the national ombuds body
- store shared or cross-institutional ombuds offices as handling infrastructure even when they do not publish case files

## Pilot Refinements From France

The eleventh French pilot added six rules for systems with a public handler map, aggregate national monitoring and selective operator publication:

- separate handler directories from case-output sources; the Ofis RIS annuaire maps who handles allegations, but does not expose outcomes
- separate national aggregate monitoring from case files; Ofis synthesis reports are strong public evidence of volumes and patterns, not reasoned decisions
- code selective operator case-report pages as micro-publication nodes; CNRS/MIS reports are real case material, but only for selected CNRS-scope outputs
- record retention and request language when official pages say public reports are not permanent or older reports remain available only on request
- keep institutional annual reports visible as recurring transparency corridors, but record whether they contain counts, narrative learning, signalement activity or actual decisions
- treat second-look bodies such as Inadis as procedure/output candidates until their own criteria, practice and public outputs are verified

## Pilot Refinements From Slovakia

The twelfth Slovak pilot added five rules for new national bodies with local publication nodes:

- treat annual reports and survey results from a new national body as aggregate case visibility, not as proof of a decision archive
- inspect meeting records for signals about future publication practice, such as plans to publish information on closed submissions
- if no national archive exists, search institutional pages for minutes, opinions, `stanoviska`, `zápisnice` and similar local output labels
- code public institutional minutes and opinions as micro-publication nodes even when they expose mixed subject matter rather than classic research-misconduct files only
- distinguish national aggregate monitoring from local decision-like outputs before assigning the country-level transparency tier

## Pilot Refinements From Moldova

The thirteenth Moldovan pilot added five rules for mixed board archives and aggregate ministry reporting:

- count a mixed governing-board decision page as a real publication lane when it provides dated lists with linked notes, annexes or appeals
- separate route scope from archive scope; one public page may cover doctoral, title-confirmation, appeal and quality-assurance outputs at the same time
- treat named thesis-specific PDFs as strong case-file evidence even when the archive is not a clean misconduct-only database
- code aggregate ministry or annual reporting as its own visibility layer when it confirms activity counts but not decision files
- do not let one strong national publication lane hide weak or missing institution-level publication

## Pilot Refinements From Montenegro

The fourteenth Montenegrin pilot added five rules for recurring committee streams with partial archive continuity:

- count a recurring committee page as a real publication stream when it systematically exposes sessions, reports and some decisions even without database search
- separate current committee hubs from archived predecessor pages; both matter for archive continuity and should be coded distinctly
- use annual reports to capture continuity clues, dead or unstable committee sites and referral or non-competence patterns
- record institutional publication duties from codes and rulebooks even when live annual reports or decision pages are not yet visible
- code Montenegro as stronger than current-news-only publication, but weaker than a searchable all-cases archive

## Pilot Refinements From Poland

The fifteenth Polish pilot added five rules for countries with aggregate case reporting, anonymized plenary notes and scattered local notices:

- treat annual reports and plenary meeting notes as real case-trace visibility when they publish counts, categories, anonymized matters or adopted opinions
- separate opinion-and-report publication from final disciplinary-decision publication; both matter, but they are not the same transparency class
- map ministerial ombuds, disciplinary commissions and appeal bodies as route nodes even when they publish mandate and composition only
- code isolated institutional communiques as micro-publication nodes rather than as evidence of a stable local archive
- keep plagiarism-detection and thesis-repository infrastructure visible, but separate from public case publication

## Pilot Refinements From Portugal

The sixteenth Portuguese pilot added five rules for countries with institutional opinion archives but no national general archive:

- treat public institutional opinion folders and recommendation directories as real publication lanes even when the national layer remains advisory
- treat annual committee reports with meeting, request or opinion counts as aggregate reporting rather than as governance boilerplate
- keep clinical or biomedical indicator pages and evaluation-status pages visible, but separate them from general misconduct publication
- distinguish route pages that merely describe submission from those that explicitly expose opinions, recommendations or activity outputs
- where no national archive exists, elevate the strongest local opinion archive or annual report into the country transparency reading instead of leaving the country at pure route visibility

## Pilot Refinements From Greece

The seventeenth Greek pilot added six rules for legally activated but institutionally distributed systems with stronger boundary publication than general misconduct publication:

- separate institutional activity-count reports from individual case files; NKUA and University of Macedonia expose real aggregate activity traces without publishing decision reasoning
- code procedure-only complaint mechanics as positive route evidence and negative publication evidence when pages publish deadlines, appeal windows or suspension powers but no outcomes
- treat confidential integrity offices as handling routes even when confidentiality forecloses public case-file publication, as with IMBB/FORTH
- keep clinical-trial ethics opinion tables and CTIS outputs visible as strong boundary case-like material, but do not let them upgrade the general misconduct lane
- record publication-lifecycle shifts when local opinion forms move into CTIS or another external platform
- when a national law creates institutional committees everywhere, widen the sample enough to prove report/publication patterns, not only route existence

## Pilot Refinements From Estonia

The eighteenth Estonian pilot added five rules for statutory transition systems where the first public misconduct outputs may still be prospective:

- separate a legal duty to publish generalized outcomes from a live individual case archive; Estonia has the former for misconduct, not the latter
- treat approval-list archives as case-like public material only for their own lane; UT and TAI decision lists show ethics-review transparency, not misconduct sanctions
- use route pages that name continuing institutional committees as seed directories, then verify publication practice institution by institution
- keep EBIN/biobank, CTIS, AKI and animal-project records visible as boundary transparency, but do not let them upgrade the general misconduct lane
- in first-year statutory systems, record "not yet visible" publication practice without erasing the route itself

## Pilot Refinements From Turkey

The nineteenth Turkish pilot added five rules for route-rich systems with weak public case-output publication:

- distinguish route density from case-publication density; Turkey has visible YOK, UAK, AYEK, institutional and boundary routes without a national general misconduct case archive
- use confidentiality and reporting clauses as negative-publication evidence; YOK one-month reporting and confidential board decisions explain missing public case files instead of leaving the gap vague
- code public consequence rules separately from case publication; UAK applicant consequences and TUBITAK UBYT repayment or AYEK-referral rules show outcomes that can matter without exposing named decisions
- treat legal-office precedent and template hubs as institutional micro-publication, not as live decision archives; Necmettin Erbakan University is useful for procedure and case-law, not for local case counts
- keep TITCK clinical status lists and HADMEK/HADYEK board registries as strong boundary transparency while preserving the low-publication rating for general research misconduct

## Pilot Refinements From Ukraine

The twentieth Ukrainian pilot added five rules for systems where a national second-line case page exists inside a broader distributed architecture:

- treat a stable national page of accepted complaints and linked decision PDFs as structured second-line case publication even when first-line handling remains institutional
- follow the case chain across bodies: NAQA complaint and decision files may later surface as MON attestation or degree-consequence notices
- code academy and university micro-publications below the national lane; NASU commission decisions and KPI governance notes prove local output but do not create an all-cases archive
- separate legal publication duties from observed output during transition years; Ukraine's 2025 law creates public-decision duties, while NAQA's page proves an already visible lane
- keep clinical-trial ethics and animal-research committee routes as boundary evidence even when their official legal trail is cleaner than some academic-integrity routes

## Pilot Refinements From Russia

The twenty-first Russian pilot added six rules for systems with strong attestation infrastructure but no general misconduct archive:

- store archive/database extraction targets even when they are lane-specific; VAK/GIS Nauka attestation orders, ANRI retractions and GRLS clinical-trial records are all useful, but they answer different questions
- treat VAK/GIS Nauka orders as official case-like attestation files, not as a general national research-misconduct archive
- separate dissertation announcement cards and other register metadata from misconduct decisions; they are route metadata and may help later matching, but they do not prove case-publication transparency
- code professional retraction databases separately from state adjudication; ANRI is a high-value publication-ethics database, but not a ministry or institutional sanction body
- keep clinical and preclinical boundary databases visible while protecting the country-level rating from boundary-lane inflation
- when official pages are indexed but unstable, store the hub URL, at least one representative file, and a source-accessibility note

## Pilot Refinements From Hungary

The twenty-second Hungarian pilot added five rules for countries where the general route has a publication basis but the extractable records sit mostly in boundary or approval lanes:

- distinguish a publication rule from a live archive; the MTA Science Ethics Code lets TeB publish selected definitive decisions or general principle statements, but no reachable general TeB decision archive was found in this pass
- treat aggregate Academy report traces as route evidence, not decision publication; TeB meeting and submission counts help map the pipeline without exposing case files
- store boundary archive hubs and representative files together; TUKEB's annual issued-permit pages from 2010 through 2025 and a 2025 permit page are both useful for later extraction
- code institutional approval decisions separately from misconduct findings; Corvinus REC resolution PDFs expose file, project, approval and justification fields, but they are research-ethics approval records
- keep CTIS-linked clinical-trial registers, ETT statements, NEBIH animal reporting and NAIH data routes visible while protecting the low general-misconduct-publication rating

## Pilot Refinements From Croatia

The twenty-third Croatian pilot added five rules for countries where historical national case publication and current decentralized handling point in different directions:

- separate legacy national bodies from the current statutory architecture; Croatia's old Odbor reports and opinions prove case-file publication, but the post-2022 National Council is a standard-setting body rather than a live national misconduct archive
- record publication owner and support body separately; AZVO supported the old Odbor administratively but did not own publication of Odbor outputs
- treat institutional annual reports as a current case-trace lane when they publish appeals, volumes, breach/no-breach outcomes or publication plans, even if they do not expose full decisions
- code public university statements and interpretive opinions as micro-publication nodes, not as searchable sanction archives
- keep planned anonymized reporting and procedure-only funder routes visible as negative-publication evidence until live outputs are located

## Pilot Refinements From Belgium

The twenty-fourth Belgian pilot added five rules for federal or community-fragmented systems:

- code community lanes separately before assigning a country-level transparency tier; Flemish publication does not prove a Belgian national archive
- treat annual reports with anonymized summaries, numbered advice rows or structured FFP/OUP tables as case-file fragments even when they are not full decisions
- separate second-line publication owners from first-line institutional publication; VCWI publishes Flemish second-advice summaries, while KU Leuven and UAntwerpen publish local CWI summaries
- use procedure pages and handler directories as negative-output evidence when they map the route but do not expose case outcomes, as with CSIS/FWB and PINDARE in this pass
- record current directory counts, accessibility limits and community/language metadata because those details explain why fragments cannot be merged too early

## Pilot Refinements From Czechia

The twenty-fifth Czech pilot added five rules for route-rich systems where English pages hide local-language archives:

- search local-language committee pages for statement, opinion, minutes, decision and archive equivalents before treating an institution as route-only; the Charles University English page is route-visible, while the Czech page exposes statements and minutes
- code institutional statements/minutes archives as micro-publication nodes, not national archives, even when they contain individual public statements over many years
- pair the publication rule, the archive page and at least one representative PDF before upgrading a route from procedure-only to publication-visible
- classify ethics-code statements by topic because they may cover academic speech, student or employment conduct, research integrity, plagiarism, publication ethics or other academic-ethics matters in the same archive
- keep research ethics review bodies separate from code-compliance bodies inside the same university, especially where the research ethics commission has non-public minutes and only general guidance is public

## Pilot Refinements From Slovenia

The twenty-sixth Slovenian pilot added five rules for systems that explicitly merge ethics and integrity:

- treat combined ethics-and-integrity bodies as route bundles, then classify each output by function: integrity opinion, ethics-code case, research-ethics approval, medical ethics opinion, animal authorization, data-protection record or IP/public-integrity boundary
- distinguish publication-basis rules from live archives; Slovenia's National Council procedure requires anonymized publication of issued opinions, but no opinion archive was live in this pass
- code aggregate non-opening traces as evidence, not as decisions; the 2023-2025 work report records one ARIS-referred initiative that did not become a procedure because no research-integrity breach was found
- do not upgrade research-ethics approval lists into misconduct publication; FOV approval identifiers are useful operational traces but not integrity case files
- when a national council lacks sanction power, record the follow-up gap separately from the publication gap because institutions may decide whether and how to act on council opinions

## Pilot Refinements From Spain

The twenty-seventh Spanish pilot added five rules for polycentric systems where national, regional and institutional lanes all publish different fragments:

- classify national consultative outputs separately from case archives; CEEI publishes reports, recommendations and admission instructions, but this is not a searchable national misconduct archive
- record subnational recommendations as micro-publication nodes when they respond to concrete disputes; CIR-CAT Recommendation 1/2025 is a real integrity-output fragment tied to a UB/CERCA affiliation dispute
- treat publication-basis clauses as route evidence, not proof of archive completeness; both CEEI and CIR-CAT describe publication under transparency rules while complete files remain restricted
- keep ethics/integrity merged pages lane-coded; Spanish institutional pages often combine good practice, project ethics review, bioethics, animal research and integrity conflict handling
- do not count CEIm, animal-project or biomedical approval registers as general misconduct publication, even when they are more visible than the integrity-conflict route

## Pilot Refinements From Switzerland

The twenty-eighth Swiss pilot added five rules for federal systems where funder, institutional and boundary lanes have different publication logics:

- separate national monitoring from national adjudication; SCCSI receives annual institutional reports and supports institutions, but it does not conduct proceedings or hear appeals
- treat funder annual reports as summary-level case material; SNSF reports give anonymised counts and short rows, while occasional SNSF news can expose a specific case without becoming a decision archive
- record institutional publication rules as high-priority extraction targets and check client-side tables or download endpoints before coding them as rule-only; ETH Zurich's 2024 procedure is now backed by a live table of anonymised investigation reports
- keep approval registries out of misconduct counts; RAPS/HumRes and animal-experiment systems are strong public boundary databases but not research-misconduct case files
- use national responsible-body directories as discovery matrices, not evidence of case publication; the Swiss Academies directory is valuable for finding ombuds/integrity offices but does not show outputs

## Pilot Refinements From Austria

The twenty-ninth Austrian pilot added five rules for systems where the strongest public material is an annual-report corridor:

- treat annual-report archives as extraction targets when they contain numbered anonymized case narratives; OeAWI annual reports are more than aggregate statistics but still not a searchable decision database
- separate final statements from public summaries; OeAWI final statements go to affected persons or institutions, while public annual reports expose anonymized inquiry summaries
- distinguish institutional publication bases from located repositories; University of Vienna permits anonymized case descriptions and annual reporting, but no live public case-report archive was located
- mark internal annual-report duties as internal unless a public archive is found; Medical University of Innsbruck's GSP Panel reports to the rectorate and senate, not necessarily the public
- keep student/thesis plagiarism and degree-revocation statistics in the study-integrity lane even when local pages use good-scientific-practice language

## Pilot Refinements From Ireland

The thirtieth Irish pilot added five rules for forum-and-RIO systems with national aggregate reporting:

- treat recurring national statistics on formal investigations as a real summary-publication corridor even when individual institutions retain first-instance handling
- do not upgrade annual statistics into case-file transparency unless reports include individual case narratives, decisions, report PDFs or institution-level outcomes
- map Research Integrity Officer and Research Integrity and Compliance Officer pages as route fragments, not case repositories, unless they expose public outcomes
- record possible publication clauses separately from located repositories; NCI mentions possible final-report publication under FOI-style conditions, but no live report list was found
- keep health ethics, health-data consent, animal-research and student academic-integrity routes visible but separate from the research-misconduct statistics lane

## Pilot Refinements From Latvia

The thirty-first Latvian pilot added five rules for code-led systems with local-language institutional decision streams:

- treat institutional academic-ethics decision pages as case-publication fragments when the decisions include research authorship, plagiarism, project-ethics or publication conduct, but keep their scope institutional unless national coverage is proved
- separate historical academy or code traces from current live repositories; LAS/LCS ethics traces help map the national route but do not by themselves create a current archive
- keep research-ethics approval pages and opinion registers separate from academic-ethics or misconduct decisions, even when they are much more visible
- where a national code names a committee but no live outputs are located, code the national route as normative, historical or referral-visible rather than archive-visible
- search local-language institutional pages before closing a country as procedure-only; the UL decision list was not exposed with the same clarity through the English route pages

## Pilot Refinements From Luxembourg

The thirty-second Luxembourg pilot added five rules for compact confidential systems with strong boundary publication:

- keep a confidential national investigation route at summary-based transparency even when governance is excellent; LARI/CRI final reports are confidential and no public decision archive was found
- treat a single public funder communication as a rare case-level signal, not as an archive; FNR's 2020 statement is representative evidence but not a recurring repository
- record "coming soon" annual reports as a monitoring target rather than counting them as available evidence; LARI still listed the 2023/2024 report as pending in this pass
- separate public boundary lists from misconduct transparency; CNER favourable opinions and ALVA animal-use annual reports are stronger public lanes, but they are health-ethics and animal-authorisation outputs
- for small national systems, verify all founding-member routes because the institutional network may be short but dense: University, FNR, LIST, LIH and LISER each add a distinct route

## Pilot Refinements From Cyprus

The thirty-third Cyprus pilot added five rules for ethics-heavy systems with public boundary reports:

- upgrade from "no publication" only when the located material gives a recurring public output lane; CNBC research-proposal decision/register files and CYQAA report tables are real public fragments even though they are not misconduct findings
- keep the lane label visible in every note: CNBC files are bioethics approval/register outputs, CYQAA files are accreditation and quality-assurance outputs, and neither should be presented as a general research-integrity archive
- treat complaint-publication rules and external-review complaint aggregates as evidence of practice, but not as a substitute for public reasoning-level case decisions
- search government home/latest-news pages as well as formal menu pages; the CNBC homepage exposed 2020-2023 research-proposal decision/register links more clearly than the English overview pages
- record excluded fragments when they are tempting but off-route, such as media-complaints or court references to plagiarism allegations that are not official research-integrity handling outputs

## Pilot Refinements From Serbia

The thirty-fourth Serbian pilot added five rules for statutory routes with low public case-output visibility:

- code statutory committee design separately from public operational evidence; an official annual or state-of-system report can be the strongest source for an appointment gap
- separate the handler, consequence proposer and final decision-maker when a misconduct route leads into title-revocation, quality-body exclusion or funding-ban endpoints
- treat funder ethics appraisal, grievance logs and Ethics Audit powers as compliance routes unless public audit outcomes, sanctions or case summaries are actually located
- count committee member pages and appointment/dismissal decision lists as route visibility, not case-file publication
- keep biomedical ethics, animal-experiment opinions, open-science monitoring, journal categorization and data protection as boundary lanes even where they are more visible than general misconduct outputs

## Pilot Refinements From Bulgaria

The thirty-fifth Bulgarian pilot added five rules for ministerial routes with stronger institutional report fragments than national archive visibility:

- treat an official page that is linked from a ministry navigation but blocked by access protection as route visibility and an extraction target, not as proof of a live public decision archive
- when the national route is access-limited, use institutional annual reports and report corridors to calibrate transparency, but keep their scope local unless national coverage is proved
- code university reports with complaint counts and narrative categories as annual-report summaries even when they include a proven plagiarism case, because they are not full public decisions
- record internal retention and archive rules separately from public publication; Trakia's archive rule and MU Plovdiv's five-year folder rule prove where records sit but not public access
- keep scientific/medical ethics approval routes, open-science repositories, accreditation lists and registers visible as boundary or evidence infrastructure rather than upgrading general misconduct transparency

## Pilot Refinements From Belarus

The thirty-sixth Belarusian pilot added five rules for attestation-centered systems with unstable official hosts and stronger boundary registers than misconduct outputs:

- treat a legally powerful attestation body as a consequence route even when the live host is inaccessible, but do not upgrade it to case-file visibility without reachable decisions, appeals or deprivation outputs
- separate dissertation metadata or author-abstract libraries from misconduct case archives; VAK metadata targets prove the attestation publication lane, not reasoned case publication
- use official legal-information portals as source targets for powers, deprivation, restoration and appeal procedure when the body website is unstable, while marking the accessibility gap clearly
- code clinical-trial registers and regulator function pages as boundary transparency, even when they expose strong study/protocol fields and inspection-support roles
- for state-centered systems, keep journal publication-ethics pages visible as editorial control while resisting the temptation to treat them as national research-misconduct decisions

## Pilot Refinements From Iceland

The thirty-seventh Icelandic pilot added five rules for statutory national bodies whose case-output trail is weaker than their legal design:

- upgrade a country from "no national body located" when a statute creates a national good-practice committee, but keep the transparency tier low if opinions, annual reports and procedure rules are not publicly located
- treat statutory annual-report duties as a publication expectation, not as evidence of a public archive until actual reports are found
- separate health-research licence lists, hospital IRB permissions and primary-care research approvals from general misconduct case files, even when those pages are searchable or case-like
- code funder handbook misconduct clauses as funding-stage consequence routes unless public withdrawal, investigation or decision outputs are located
- when a national committee is legally central but publicly quiet, use university, health-service and funder routes to map the handling network while preserving the national visibility gap

## Pilot Refinements From Bosnia and Herzegovina

The thirty-eighth Bosnia and Herzegovina pilot added five rules for competence-layered systems where publication is local, quality-assurance based or boundary-specific:

- map the competence level before coding any body; state, entity, canton, district, university, faculty, hospital and regulator routes can all be authoritative in different lanes
- treat accreditation registers and institution-documentation links as quality-assurance transparency, not as misconduct case publication, even when they expose useful complaints or ethics infrastructure evidence
- code public faculty opinion pages and approval lists as micro-publication only; they can be the strongest public case-like evidence without proving a national misconduct archive
- use Senate minutes or governing-board minutes that accept ethics annual reports as annual-report traces, while marking the absence of the full report if it is not public
- keep clinical-trial registers, animal-experiment approvals, child-research ethics codes and data-protection records in boundary lanes unless the source explicitly ties them to general research-misconduct findings

## Pilot Refinements From Kosovo

The thirty-ninth Kosovo pilot added five rules for systems where quality-assurance publication is stronger than misconduct publication:

- code accreditation decision hubs, expert reports, monitoring reports, post-accreditation reports and annual reports as QA file corridors unless the source expressly records a misconduct finding
- treat agency ethics codes for accreditation processes as real complaint routes but keep their scope separate from institutional academic-misconduct routes
- use annual reports to extract aggregate appeal, complaint and decision activity when individual appeal files are not public
- count institutional ethics notices as micro-publication only; a named notice can prove route activity without proving a decision archive
- keep data-protection, access-to-documents and research-ethics approval pages visible as boundary infrastructure, not as general misconduct case files

## Pilot Refinements From North Macedonia

The fortieth North Macedonia pilot added five rules for route-visible but case-archive-light systems:

- treat quality-assurance report and accreditation-decision hubs as repository corridors, but keep their decision function coded as QA unless a file records a misconduct finding
- use self-evaluation reports as micro-publication sources when they expose disciplinary counts, plagiarism checks, ethics committees or research-output controls, while marking whether the snippet concerns teaching discipline, doctoral governance or research misconduct
- separate a statutory national ethics board's legal existence from a public recommendation, annual-report or case-decision archive; law alone is procedure-only visibility
- code council member-ethics boards separately from general researcher misconduct routes, even when the council sets national higher-education and scientific-research standards
- keep data-protection supervision notices as boundary case material; they can be highly case-like but do not substitute for research-integrity case publication

## What Already Exists In The Repo

Always start from existing local evidence:

- `data/<Country>/Overview <Country>.docx`
- `data/<Country>/raw documentation/`
- `data/<Country>/raw documentation/source notes/`
- country `transparency` blocks in `data/countries.js`
- `dossierDetails.integrityCommittees` in `data/countries.js`
- `dossierDetails.sourceLinks` in `data/countries.js`
- `data/transparency.js`
- `data/source-registry.csv`

The key rule for this pass:

- do not restart country research from zero
- use the existing dossier as the seed list of bodies
- use the existing transparency layer as the first publication clue

## Standard Workflow For One Country

### 1. Build a seed list from local material

Start with:

- the overview document
- existing source notes
- `keyActors`
- `networkLayers`
- `integrityCommittees`
- `transparency.resources`
- `nextFocus`

From that material, build a first list of:

- national bodies
- academy routes
- funder routes
- university or institute committees
- ombudsperson or confidential-adviser routes
- appeals bodies
- specialist boundary bodies that publish decisions or case-like material

### 2. Separate handling bodies from boundary bodies

For each seed body, decide whether it is:

- first-line complaint handling
- investigation or advisory stage
- decision-making stage
- appeal or review stage
- funder compliance or sanction stage
- reporting or publication stage
- boundary regime only

Keep boundary regimes only when they matter for case visibility or for explaining why the case is not handled by the core integrity route.

### 3. Hunt four source types for each body

Try to find, in this order:

1. constitutive source
2. procedure or complaint-route source
3. publication hub or archive source
4. example case file, decision, opinion, annual report or statistics source

If the body is named in law but no current web page exists, keep it and mark the gap honestly.

### 4. Expand institution by institution where needed

If the national layer is weak or distributed:

- follow academy member institutions
- follow funder grantee or host-institution obligations
- follow university and public-research-institute integrity pages
- follow named appeals routes and shared committees
- use strong exemplars first, then widen only until the system shape is clear

Do not try to complete every institution in one pass if the country is large. First prove the route types.

### 5. Code the publication model

For every body, record:

- whether case material is public, restricted or not found
- whether publication is case-level, summary-level, statistics-only or rule-only
- publication depth: full decision, full statement, anonymized summary, annual statistics, metadata only or procedure only
- publicity mode: proactive online publication, public document on request, restricted access or not found
- publication lifecycle: immediate metadata, post-appeal publication, appeal suspension or removal, retention-window expiry or permanent archive
- outcome maturity: pending complaint, active investigation, final decision, appealed decision, closed without public case output or aggregate-only reporting
- route scope versus archive scope: whether the public source covers the whole route, an appeal layer, a boundary regime, a register, a reporting pipeline or only selected outputs
- archive scope: which legal lane, body set or decision subset the archive actually covers
- archive continuity: whether the current archive also includes predecessor or superseded-body material
- publication basis: legal duty, internal rule, publication practice only or not identified
- publication owner if it differs from the handling body
- referral path: whether public decisions show handoff or return to another body or lane
- format: HTML, PDF, annual report, database, press release, register
- database function: misconduct decision archive, approval database, project register, postjournal, opinion archive, annual report, restricted-record notice, open-data table or accessibility-limited page
- micro-publication node: national, regional, institutional, funder or boundary-regime source that publishes a small slice of the route
- individual case visibility: no case trace, aggregate only, anonymized numbered rows, narrative case learning, isolated governance-minutes trace, full decision or boundary-regime project/case record
- public data elements: identifiers, dates, body, lane, allegation or project category, parties or anonymization level, procedure stage, reasoning, outcome, sanction or consequence, referral, appeal status and document links
- non-public or restricted elements: names, evidence file, full committee minutes, panel report, appeal file, witness material, supporting documents, commercial-confidential material or restricted intranet record
- why this is or is not a misconduct case file: explain whether the source is a real misconduct decision, annual statement, synthetic case, approval record, project register, regulator decision, governance-minutes trace or procedure-only source
- accessibility status: live, linked but unreachable, moved or unstable, or not found
- publication exclusions: rejections, inadmissible matters, settlements or other categories left out of public release
- stability: archive, recurring page, isolated document or broken trace
- anonymity level: named, partly anonymized, fully anonymized or aggregated only
- any explicit publication deadline, retention period or template rule

### 6. Capture negative findings

Negative findings are part of the result. Record notes such as:

- no public case archive identified
- body exists but no current committee page found
- publication duty in law but no live archive found
- annual report mentions cases without linking decisions
- case material exists only as isolated PDFs
- source inaccessible in this pass
- route appears to exist but current composition still to verify

### 7. Update the country dossier only after the evidence is stable

When the sweep is mature enough:

- expand `dossierDetails.integrityCommittees`
- refine the country `transparency` block
- tighten `summary`, `dataSignals` and `nextFocus`
- add the strongest public sources to `sourceLinks`
- add substantial new sources to `data/source-registry.csv`
- update `project-overview.html` only when the country's next action has genuinely changed

## Search Order

Prefer official sources in this order:

1. law portals and ministerial regulations
2. official body pages and statutes
3. official procedure PDFs and complaint forms
4. official decision hubs, archives or annual reports
5. official university and research-institute committee pages
6. funder rules, sanctions clauses and compliance pages
7. official boundary-regime authorities
8. non-official sources only as bridge material

Useful search patterns:

- body name + decision
- body name + archive
- body name + annual report
- body name + opinion
- body name + complaint
- body name + misconduct
- local-language equivalents of decision, opinion, archive, case, ethics, integrity, appeal and report

## How To Reuse Existing Data Structures

Use the current app schema first.

`dossierDetails.integrityCommittees`

- add missing handling routes and publication routes here
- a route may be a committee, board, ombudsperson, office or appeal chamber

`transparency`

- use this to summarize the country's case-publication reality
- `resources` should hold the best public case or publication sources, not every procedural document

`sourceLinks`

- use this as the public backbone: constitutive source, procedure source, publication source and representative case source
- always include the stable archive, database, decision hub, case page, report folder or register URL when one exists, even if the representative case PDF is also stored separately

`data/source-registry.csv`

- when a source is an archive/database/extraction target, make that visible in the `raw_documentation_category` or `notes` field using terms such as `decision archive`, `case page`, `opinion archive`, `register`, `database`, `annual-report corridor` or `boundary database`
- log both the extraction target and at least one representative case file when available, because later extraction needs the hub URL and quality control needs an example file

Do not invent a new app schema until 5 to 8 countries have been tested with this workflow. If structured extraction becomes repetitive, then create a dedicated case-file dataset later.

## Working Notes Practice

Default approach:

- append a `Committee and case-file pass` section to the existing `data/<Country>/raw documentation/source notes/<Country> deep-dive sources.md`

Only create a separate note file if the current source note has become too large.

Suggested headings:

```md
## Committee and case-file pass

### Seed bodies
- Body:
- Type:
- Lane:
- Role:
- Strongest current source:
- Publication owner:
- Archive scope:
- Database function:
- Micro-publication node:
- Individual case visibility:
- Public data elements:
- Non-public or restricted elements:
- Why this is or is not a misconduct case file:
- Archive continuity:
- Referral path:
- Publication depth:
- Publicity mode:
- Publication lifecycle:
- Outcome maturity:
- Route scope versus archive scope:
- Publication class:
- Accessibility status:
- Case-file status:
- Publication basis:
- Publication exclusions:
- Publication rule or retention:

### Public case-material sources
- Source:
- Body:
- Format:
- Access:
- Case level:
- Note:

### Archive or database extraction targets
- Target:
- URL:
- Owner:
- Route:
- Scope:
- Database function:
- Extraction priority:
- Representative case file:
- Access or stability note:

### Gaps for next pass
- ...
```

## Boundary Rules For This Pass

Do not confuse:

- research misconduct handling with ethics approval
- complaint routing with publication routing
- annual integrity statements with case files
- funder sanctions with institutional adjudication
- retraction databases with official national or institutional case files
- academic cheating in teaching with research-integrity cases
- whistleblowing, social safety, employment discipline or anti-corruption routes with research-integrity bodies unless the source clearly joins them

## Good Output For One Country

A good case-file sweep does all of the following:

- identifies the main handling bodies and not just the best-known national one
- shows where cases start, who decides, who publishes and where cases are handed back or upward
- distinguishes case files from summaries, statistics and rule-only traces
- distinguishes online publication from documents that are public only through access rules or after case closure
- records the absence of publication as a finding, not as a failure
- separates boundary regimes from the core misconduct route
- leaves the dossier easier to compare across countries

## Suggested Pilot Order

Calibrate the method first on countries with known public output:

Completed pilots:

1. Netherlands
2. Romania
3. Sweden
4. Denmark
5. Finland
6. Lithuania
7. Norway
8. Italy
9. United Kingdom
10. Germany
11. France
12. Slovakia
13. Moldova
14. Montenegro
15. Poland
16. Portugal
17. Greece
18. Estonia
19. Turkey
20. Ukraine
21. Russia
22. Hungary
23. Croatia
24. Belgium
25. Czechia
26. Slovenia
27. Spain
28. Switzerland
29. Austria
30. Ireland
31. Latvia
32. Luxembourg
33. Cyprus
34. Serbia
35. Bulgaria
36. Belarus
37. Iceland
38. Bosnia and Herzegovina
39. Kosovo
40. North Macedonia

Next targeted pilots:

No fixed next pilot is pinned after North Macedonia. Choose the next target from countries whose current final-sweep notes still ask for committee coverage, decision visibility, institutional annual reports or boundary-lane separation.

Then widen to countries whose current final-sweep notes already ask for more committee coverage or decision visibility, such as Portugal, Germany, Greece, Estonia, Turkey, Slovakia, Moldova, Hungary follow-up extraction and Ukraine's post-transition NAQA/institutional outputs.

## After A Case-File Pass

1. Confirm the body list is stable enough to explain the country route.
2. Confirm the best public case-material sources are in the dossier.
3. Confirm negative findings are stated explicitly.
4. Update `data/countries.js` and `data/source-registry.csv` if the pass added durable evidence.
5. Run syntax checks if `data/countries.js` was edited.
6. Re-read the edited committee and transparency text for internal consistency; no visual browser inspection is required unless explicitly requested.
