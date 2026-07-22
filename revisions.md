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
- [ ] **C3** No verbatim-duplicated achievements between Experience and Projects. Grep test: no sentence stem (≥6 consecutive words) appears in both sections.
- [x] **C4** "Mentored/coached 4-5 junior developers" appears at most once per employer and is phrased differently if it appears twice at all.
- [x] **C5** Modernization project period "Dec 2024 - Jan 2025" either carries the real program span or the 6-week claim is scoped to what actually happened in 6 weeks. 200+ apps in 6 weeks fails the sniff test.
- [ ] **C6** Every number survives "how did you measure that?" — flag any % or count with no stated scope/window.
- [ ] **C7** EN and DE make identical factual claims (same numbers, same dates, same counts).

### B. Structure
- [x] **S1** Projects section contains no entry that restates an Experience bullet. Reveation projects are either merged into experience bullets or carry *only* detail not present there. Target: Projects = Personal Site, AI Research, and at most one non-duplicative Reveation entry.
- [x] **S2** Certification section removed (single intro Coursera cert = junior signal). `labels.certification`, `certifications[]`, and the template's certification block all gone.
- [x] **S3** Summary ≤ 3 lines in the rendered PDF. Cut everything the CV already demonstrates.
- [x] **S4** Section order after S2: Summary → Experience → Education → Technical Skills → Projects.
- [ ] **S5** Both PDFs ≤ 2 pages; no orphaned headers (layout gate).

### C. Language / signal
- [x] **L1** Zero filler adjectives in bullets: comprehensive, intelligent, seamless, robust, cutting-edge, mission-critical (unless counting something), "ensuring business continuity", "directly impacting customer satisfaction". Grep for each.
- [x] **L2** Every bullet = verb + what + scale/outcome. No bullet ends in an unverifiable outcome clause.
- [ ] **L3** Work-authorization line states the concrete entitlement (e.g. "20 h/week during semester, full-time during breaks; unrestricted from early 2027"), not just "German Student Visa".
- [ ] **L4** AI-research bullets claim what a coursework survey can claim: "78% of respondents reported gains" style, no "delivered actionable insights … platform consolidation" fluff.
- [ ] **L5** DE text is idiomatic German, not translated English (spot-check by native speaker or LLM pass with that explicit instruction).

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

**Ordering constraint:** T1–T2 before T4–T5 (agree on numbers before moving text). T3 anytime. T7 after T4–T6 (don't polish text that's about to be deleted). T11–T12 last.

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

Rules for the agent filling this in:
- One row per task, appended in the same commit as the task itself.
- "What changed" is 1–2 sentences in plain language: the claim/section as it read before → as it reads now.
- If a task was skipped or collapsed into another, log that too (e.g. "T4 absorbed into T5") — no silent gaps in the version sequence.
- If gate 4 adds new checklist rows, log that as its own row (version bump, task id `screener`).

Out of scope for this loop: website copy (`src/content/portfolio.json`), template layout beyond T3, photo/no-photo decision (already settled: no photo, unified header).
