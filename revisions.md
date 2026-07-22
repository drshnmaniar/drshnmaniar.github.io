# revisions.md — CV Revision Loop (agentic)

Source of truth: `LaTex/cv.en.json` + `LaTex/cv.de.json` (content), `LaTex/template.tex.j2` (layout).
`main.tex` / `main_de.tex` are build artifacts. Never edit them directly.
EN and DE must stay in lockstep: every content change lands in **both** JSON files in the same task.

---

## Evaluation strategy

Run this exact pipeline after every task. A task is DONE only if the full pipeline passes.

```bash
cd LaTex
python build.py                                        # E1: render JSON -> tex
pdflatex -interaction=nonstopmode -halt-on-error main.tex      # E2: EN compiles
pdflatex -interaction=nonstopmode -halt-on-error main_de.tex   # E3: DE compiles
pdftotext -layout main.pdf    main.txt                 # E4: extract text
pdftotext -layout main_de.pdf main_de.txt
```

Then evaluate, in order:

1. **Mechanical gate** (E1–E4 exit 0; both PDFs ≤ 2 pages — grep the pdflatex log for `(N pages`).
2. **Layout gate**: no section header is the last non-empty line of a page (headers listed in each JSON's `labels`; match by line prefix, `-layout` appends the right column).
3. **Consistency gate**: run every check in the checklist below against `main.txt` and `main_de.txt`. Numbers must match *across sections* and *across languages*.
4. **Screener pass**: re-read `main.txt` top-to-bottom in 60 seconds' worth of text (first ~40 lines). Ask: would a contradiction, buzzword, or junior signal stop a Fortune 500 screener? Log any hit as a new checklist row — the checklist is allowed to grow, never shrink.

After each task: re-run the whole pipeline, update the checkboxes, commit with message `cv-revision: <task-id> <summary>`, then pick the next unchecked task. Stop when all checklist rows pass and no task remains.

---

## Checklist criteria (pass/fail — verify against extracted text, not the JSON)

### A. Credibility / consistency
- [x] **C1** One canonical application count. Today: "50+ global applications" (experience) vs "200+ applications" (modernization project) vs "200+ mission-critical production systems" (monitoring project). Pick the defensible number(s), and if 50 and 200 measure different things, each occurrence must say *what* it counts.
- [x] **C2** One canonical detection-time claim. Today: "8-10 hours to 10-15 minutes" (experience) vs "hours to minutes" (monitoring project). Same event → same figures, or the duplicate is removed (see S1).
- [x] **C3** No verbatim-duplicated achievements between Experience and Projects. Grep test: no sentence stem (≥6 consecutive words) appears in both sections.
- [x] **C4** "Mentored/coached 4-5 junior developers" appears at most once per employer and is phrased differently if it appears twice at all.
- [x] **C5** Modernization project period "Dec 2024 - Jan 2025" either carries the real program span or the 6-week claim is scoped to what actually happened in 6 weeks. 200+ apps in 6 weeks fails the sniff test.
- [x] **C6** Every number survives "how did you measure that?" — flag any % or count with no stated scope/window.
- [x] **C7** EN and DE make identical factual claims (same numbers, same dates, same counts).

### B. Structure
- [x] **S1** Projects section contains no entry that restates an Experience bullet. Reveation projects are either merged into experience bullets or carry *only* detail not present there. Target: Projects = Personal Site, AI Research, and at most one non-duplicative Reveation entry.
- [x] **S2** Certification section removed (single intro Coursera cert = junior signal). `labels.certification`, `certifications[]`, and the template's certification block all gone.
- [x] **S3** Summary ≤ 3 lines in the rendered PDF. Cut everything the CV already demonstrates.
- [x] **S4** Section order after S2: Summary → Experience → Education → Technical Skills → Projects.
- [x] **S5** Both PDFs ≤ 2 pages; no orphaned headers (layout gate).
- [x] **S6** No mostly-empty page. Either the CV fits one dense page, or page 2 is at least half full. Added by the gate-4 screener pass at v12: page 1 was ~90% full and page 2 ~25%, which reads like the content ran out.

### D. Website ↔ CV parity (`src/content/portfolio.json`, `src/components/*.js`)

Added 2026-07-22 after the CV loop closed. The site is the same claims in a louder voice; a
recruiter who reads both must not find them disagreeing. The CV is now the reference — where
the two differ, the site moves.

- [x] **W1** No count or duration on the site contradicts the CV. Specifically: the monitoring system covers 50+ applications (not 200+), 200+ belongs only to the legacy estate, detection is 8-10 h → 10-15 min, deploys 2-3 h → ~1 h, tickets ~30% over the following year.
- [x] **W2** Availability says the same thing in all four places (hero, footer, journey 2027, CV header): 20 h/week in semester, full-time in semester breaks, full-time from early 2027. No place may promise full-time *now* — the student visa does not allow it.
- [x] **W3** No project card point restates an experience highlight. Cards carry the how and the artifact; the highlight carries the outcome. Grep test: no 6-word stem shared between `experience[].highlights` and `projects[].points`.
- [x] **W4** No project period is narrower than the work it claims. The modernization card may not date 200+ applications to a six-week window.
- [ ] **W5** Same filler ban as L1, applied to `portfolio.json` and the components.
- [ ] **W6** `npm run build` exits 0 and `portfolio.json` parses.

### C. Language / signal
- [x] **L1** Zero filler adjectives in bullets: comprehensive, intelligent, seamless, robust, cutting-edge, mission-critical (unless counting something), "ensuring business continuity", "directly impacting customer satisfaction". Grep for each.
- [x] **L2** Every bullet = verb + what + scale/outcome. No bullet ends in an unverifiable outcome clause.
- [x] **L3** Work-authorization line states the concrete entitlement (e.g. "20 h/week during semester, full-time during breaks; unrestricted from early 2027"), not just "German Student Visa".
- [x] **L4** AI-research bullets claim what a coursework survey can claim: "78% of respondents reported gains" style, no "delivered actionable insights … platform consolidation" fluff.
- [x] **L5** DE text is idiomatic German, not translated English (spot-check by native speaker or LLM pass with that explicit instruction).

---

## Atomic tasks (one commit each; every task = edit both JSONs unless noted)

| ID | Task | Touches | Done when |
|----|------|---------|-----------|
| T1 | Reconcile application counts: decide canonical figures for monitoring (watched systems) vs modernization (apps in program) vs experience, with scope words | cv.en.json, cv.de.json | C1, C7 |
| T2 | Reconcile detection-time claim everywhere to the experience figure | both JSONs | C2 |
| T3 | Delete Certification section (labels, data, template block) | both JSONs, template.tex.j2 | S2, S4, pipeline green |
| T4 | Merge monitoring-dashboard project into the experience bullet it duplicates; keep only net-new detail (alerting design, MTTD definition) or drop entirely | both JSONs | S1, C3 |
| T5 | Merge/trim modernization project the same way; fix its period (C5) | both JSONs | S1, C5 |
| T6 | Rewrite summary to ≤ 3 rendered lines | both JSONs | S3 |
| T7 | Strip filler adjectives and outcome-fluff from all remaining bullets (grep list in L1) | both JSONs | L1, L2 |
| T8 | De-duplicate the mentoring claim between employers; rephrase one | both JSONs | C4 |
| T9 | Upgrade work-authorization line to concrete entitlement | both JSONs | L3 |
| T10 | Tighten AI-research bullets to survey-honest claims | both JSONs | L4 |
| T11 | Idiomatic-German pass over cv.de.json (content unchanged, phrasing only) | cv.de.json | L5, C7 |
| T12 | Final consistency sweep: run all checklist greps against fresh main.txt/main_de.txt; fix stragglers | any | all boxes |
| T13 | Compress to one dense page: cut the weakest bullet from each block rather than padding page 2 | both JSONs | S6, S5 still green |
| T14 | Monitoring card: 200+ → 50+ applications, precise detection figures, drop "intelligent" | portfolio.json | W1 (monitoring), W5 (partial) |
| T15 | Modernization card: widen the period to the Reveation tenure and move "intensive migration phase Dec 2024 - Jan 2025" into the points | portfolio.json | W4 |
| T16 | Availability parity: hero, footer, and journey 2027 state the visa entitlement and stop promising full-time now | portfolio.json, Footer.js | W2 |
| T17 | Carry the CV's two new facts (deploy time, NuGet packaging) into the site's experience highlights; de-duplicate card points against highlights | portfolio.json | W1, W3 |
| T18 | Site filler sweep + `npm run build` + screener pass over the rendered page | portfolio.json, components | W5, W6 |

**Ordering constraint:** T1–T2 before T4–T5 (agree on numbers before moving text). T3 anytime. T7 after T4–T6 (don't polish text that's about to be deleted). T11–T12 last. T14–T18 run after the CV loop closes, because the CV is their reference; T18 last of all.

**Website pipeline** (replaces E1–E4 for T14–T18):

```bash
node -e "JSON.parse(require('fs').readFileSync('src/content/portfolio.json','utf8'))"   # parses
npm run build                                                                          # exits 0
```

Then the W-rows above, checked against `portfolio.json` and `LaTex/cv.en.json` side by side.

---

## Loop protocol

```
while unchecked tasks remain:
    pick lowest-numbered runnable task (respect ordering constraints)
    apply the edit to BOTH language JSONs (and template if the task says so)
    run evaluation pipeline (E1-E4 + gates 1-4)
    if any gate fails: fix within the same task before committing
    update checklist boxes in this file
    append a row to the Version log below (same edit, same commit)
    commit: "cv-revision: T<n> <summary>"
re-run gate 4 (screener pass) one final time; append any new findings as C/S/L rows and new tasks; if none -> loop complete
```

---

## Version log (append-only — one row per completed task, written by the loop)

Format: version bumps by task, never rewritten. `v0` is the state before the loop starts.
Each row records what a reviewer would notice changed, not the mechanical diff (git has that).

| Version | Task | Date | What changed (reviewer-visible) | Gates newly passing |
|---------|------|------|----------------------------------|---------------------|
| v0 | — | 2026-07-22 | Baseline: unified EN/DE header (no photo), keep-together section guards, availability copy fixed. Known defects: 50-vs-200 app-count contradiction, duplicated Reveation projects, 5-line summary, Coursera cert section, filler adjectives. | — |
| v1 | T1 | 2026-07-22 | The monitoring project claimed "200+ mission-critical production systems" while Experience described the same system as covering "50+ global applications". Monitoring now reads 50+ production applications in both places; the 200+ figure survives only where it belongs, scoped as "the 200+ applications in the legacy estate". | C1 |
| v2 | T2 | 2026-07-22 | The monitoring project's vague "from hours to minutes" now carries the same 8-10 hours to 10-15 minutes figures the Experience bullet uses, so the two descriptions of one system no longer differ in precision. | C2 |
| v3 | T3 | 2026-07-22 | The Certification section and its single introductory Coursera entry are gone — data, label, and template block. A 7-year engineer listing an intro Python cert reads junior; the section earned no space. Order is now Summary, Experience, Education, Technical Skills, Projects. | S2, S4 |
| v4 | T4 | 2026-07-22 | The System Health Monitoring Dashboard project is gone: four of its five bullets restated the Experience bullet describing the same system, and the fifth was cross-team filler. Its one net-new detail — alerts carrying contextual error data for root-cause work — folded into that Experience bullet. | — (C3 partial) |
| v5 | T5 | 2026-07-22 | The Legacy Modernization project is gone too, and with it the "200+ apps in six weeks" claim — resolved by deletion rather than by inventing a program span. Its two real facts moved into Experience as dated bullets: deployment time 2-3 hours to about 1 hour, and monolithic modules converted to versioned NuGet packages across the 200+ application estate. Projects is now employer-free: Personal Site and the AI research study. | C3, C5, S1 |
| v6 | T6 | 2026-07-22 | Summary cut from five rendered lines to three in both languages. Gone: the tech-stack list (Skills already has it), the language levels (ditto), the M.Sc. restatement (Education has it), and the imprecise "hours to minutes" echo. Kept: 7+ years, the modernization specialism stated as what it actually does, and the intent to stay in Germany. | S3 |
| v7 | T7 | 2026-07-22 | Filler pass over every remaining bullet in both languages. "Collaborated with peers to implement microservices ... to enhance scalability" became "Built .NET 8 microservices with RabbitMQ and Web API to restructure member subscription processing"; the PI-planning bullet lost three clauses of process narration; "ensuring system stability and enhancing user experience" and "through a systematic problem-solving approach" are gone. Every bullet now ends on a fact, not an adjective. | L1, L2 |
| v8 | T8 | 2026-07-22 | Both employers claimed "4-5 junior developers", which read copy-pasted. Reveation keeps the headcount; Tark now claims the practice instead — owning code review and pair programming after the 2020 promotion. "4-5" appears exactly once per language. | C4 |
| v9 | T9 | 2026-07-22 | "Work Authorization: German Student Visa" made a recruiter guess what they may offer. It now states the entitlement: 20 h/week, full-time in semester breaks, full-time from early 2027 — matching the availability line on the website. Both language versions fit on one header line. | L3 |
| v10 | T10 | 2026-07-22 | AI-research entry cut from four bullets to three and stripped of research-theatre vocabulary: "designed and deployed a structured survey methodology" is now "designed and ran a survey", and "statistical analysis ... using descriptive statistics" (which said the same thing twice) is now plainly descriptive statistics plus hand-coded free text. The 78% stays framed as what respondents reported. | L4 |
| v11 | T11 | 2026-07-22 | German phrasing pass, facts untouched. Calques replaced with the terms German IT actually uses (`Altsystemlandschaft`, not `Altsystembestand`; `Inhaltsänderungen ohne Eingriff in den Komponentencode`, not code that gets "berührt"). Fixed a split-verb error in the survey bullet, rebuilt the profile in noun style so it no longer switches subject mid-sentence, lower-cased `(fließend)`, and left the Bachelor's title in English to match the EN version. | L5 |
| v12 | T12 | 2026-07-22 | Consistency sweep. Caught one straggler the earlier tasks missed: "the estate" carried 50+ in one bullet and 200+ in another, reviving the C1 contradiction in softer words. Monitoring now covers "50+ production applications worldwide"; the NuGet work covers "the 200+ applications in the legacy estate". Layout verified from rendered page images rather than text extraction, which had been reordering right-aligned columns. Screener pass logged one new finding as S6. | C6, C7, S5 |
| v13 | T13 | 2026-07-22 | Both CVs are now one dense page instead of one full page plus a quarter-full one. Cut by weakest-first, not by padding: the 2018 Alexa skill (oldest, least relevant to a .NET modernization pitch), the C#/VB feature-maintenance bullet (its VB signal moved into the migration bullet, which now reads "legacy C# and VB estate"), and two bullets merged in each project. No claim was lost, only restated more tightly. | S6 |
| v14 | T14 | 2026-07-22 | Website monitoring card said "200+ mission-critical production systems" while the site's own experience section said 50+ — the contradiction the CV fixed at v1, still live on the page. Card now reads 50+ applications, "8-10 hours → 10-15 minutes" instead of "hours → minutes", and the alerting bullet describes what the alerts contain rather than calling itself intelligent. | W1 (monitoring), W5 |
| v15 | T15 | 2026-07-22 | The modernization card dated 200+ unified applications to six weeks. Period widened to the Reveation tenure (Dec 2022 - Mar 2025, unambiguously true) and the six-week window kept where it is defensible: as the intensive migration phase, stated inside the bullet. The site keeps the card the CV dropped, because the site has room to explain it. | W4 |
| v16 | T16 | 2026-07-22 | The site offered full-time work in three places ("full-time too, for the right team", "full-time already for the right team", "or sooner, for the right role") while the CV states a student visa capped at 20 h/week in semester. All three now state the entitlement instead: 20 h/week in semester, full-time in semester breaks, full-time from early 2027. **Reversible by choice, not by fact** — if the intent was "I would leave the programme for the right offer", that is a conversation to have in an interview, not a promise on a landing page. | W2 |
| v17 | T17 | 2026-07-22 | Deploy-time win (2-3 h → ~1 h) carried from the CV into the site's experience highlights, and removed from the modernization card's prose so the two stop saying the same sentence — the card now explains the mechanism, the highlight states the outcome, and the number survives as the card's metric badge. NuGet packaging stays the card's centerpiece rather than being duplicated into a highlight. Tark's mentoring line got the same C4 treatment as the CV: it claims the practice, not a second "4-5 juniors". | W1, W3 |

Rules for the agent filling this in:
- One row per task, appended in the same commit as the task itself.
- "What changed" is 1–2 sentences in plain language: the claim/section as it read before → as it reads now.
- If a task was skipped or collapsed into another, log that too (e.g. "T4 absorbed into T5") — no silent gaps in the version sequence.
- If gate 4 adds new checklist rows, log that as its own row (version bump, task id `screener`).

Out of scope for this loop: website copy (`src/content/portfolio.json`), template layout beyond T3, photo/no-photo decision (already settled: no photo, unified header).
