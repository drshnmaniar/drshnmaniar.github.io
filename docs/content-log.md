# Content change log

What changed in the CV and the site, and why. Append-only — entries are never rewritten.

Each entry records what a *reader* would notice, not the mechanical diff; git has the diff.
The rules these changes were held to live in [content-standards.md](content-standards.md).

---

## Run 1 — CV, 2026-07-22

Source: `LaTex/cv.en.json`, `LaTex/cv.de.json`, `LaTex/template.tex.j2`.

### v0 · baseline

Unified EN/DE header (single column, no photo), keep-together section guards in the template,
availability copy fixed on the site.

Known defects going in: the 50-vs-200 application-count contradiction, two Reveation projects
duplicating the experience section, a five-line summary, a Coursera certification section, and
filler adjectives throughout.

### v1 · T1 — reconcile application counts → *C1*

The monitoring project claimed "200+ mission-critical production systems" while Experience
described the same system as covering "50+ global applications". Monitoring now reads 50+
production applications in both places; the 200+ figure survives only where it belongs, scoped
as "the 200+ applications in the legacy estate".

### v2 · T2 — reconcile the detection-time claim → *C2*

The monitoring project's vague "from hours to minutes" now carries the same 8-10 hours to
10-15 minutes figures the Experience bullet uses, so the two descriptions of one system no
longer differ in precision.

### v3 · T3 — remove the Certification section → *S2, S4*

The Certification section and its single introductory Coursera entry are gone — data, label,
and template block. A 7-year engineer listing an intro Python cert reads junior; the section
earned no space. Order is now Summary, Experience, Education, Technical Skills, Projects.

### v4 · T4 — fold the monitoring project into Experience

The System Health Monitoring Dashboard project is gone: four of its five bullets restated the
Experience bullet describing the same system, and the fifth was cross-team filler. Its one
net-new detail — alerts carrying contextual error data for root-cause work — folded into that
Experience bullet.

### v5 · T5 — fold the modernization project into Experience → *C3, C5, S1*

The Legacy Modernization project is gone too, and with it the "200+ apps in six weeks" claim —
resolved by deletion rather than by inventing a program span. Its two real facts moved into
Experience as dated bullets: deployment time 2-3 hours to about 1 hour, and monolithic modules
converted to versioned NuGet packages across the 200+ application estate. Projects is now
employer-free: Personal Site and the AI research study.

### v6 · T6 — rewrite the summary → *S3*

Summary cut from five rendered lines to three in both languages. Gone: the tech-stack list
(Skills already has it), the language levels (ditto), the M.Sc. restatement (Education has it),
and the imprecise "hours to minutes" echo. Kept: 7+ years, the modernization specialism stated
as what it actually does, and the intent to stay in Germany.

### v7 · T7 — strip filler → *L1, L2*

Filler pass over every remaining bullet in both languages. "Collaborated with peers to implement
microservices ... to enhance scalability" became "Built .NET 8 microservices with RabbitMQ and
Web API to restructure member subscription processing"; the PI-planning bullet lost three clauses
of process narration; "ensuring system stability and enhancing user experience" and "through a
systematic problem-solving approach" are gone. Every bullet now ends on a fact, not an adjective.

### v8 · T8 — de-duplicate the mentoring claim → *C4*

Both employers claimed "4-5 junior developers", which read copy-pasted. Reveation keeps the
headcount; Tark now claims the practice instead — owning code review and pair programming after
the 2020 promotion. "4-5" appears exactly once per language.

### v9 · T9 — state the work authorization → *L3*

"Work Authorization: German Student Visa" made a recruiter guess what they may offer. It now
states the entitlement: 20 h/week, full-time in semester breaks, full-time from early 2027 —
matching the availability line on the website. Both language versions fit on one header line.

### v10 · T10 — tighten the research bullets → *L4*

AI-research entry cut from four bullets to three and stripped of research-theatre vocabulary:
"designed and deployed a structured survey methodology" is now "designed and ran a survey", and
"statistical analysis ... using descriptive statistics" (which said the same thing twice) is now
plainly descriptive statistics plus hand-coded free text. The 78% stays framed as what
respondents reported.

### v11 · T11 — idiomatic German → *L5*

German phrasing pass, facts untouched. Calques replaced with the terms German IT actually uses
(`Altsystemlandschaft`, not `Altsystembestand`; `Inhaltsänderungen ohne Eingriff in den
Komponentencode`, not code that gets "berührt"). Fixed a split-verb error in the survey bullet,
rebuilt the profile in noun style so it no longer switches subject mid-sentence, lower-cased
`(fließend)`, and left the Bachelor's title in English to match the EN version.

### v12 · T12 — consistency sweep → *C6, C7, S5*

Caught one straggler the earlier tasks missed: "the estate" carried 50+ in one bullet and 200+ in
another, reviving the C1 contradiction in softer words. Monitoring now covers "50+ production
applications worldwide"; the NuGet work covers "the 200+ applications in the legacy estate".
Layout verified from rendered page images rather than text extraction, which had been reordering
right-aligned columns. Screener pass logged one new finding as S6.

### v13 · T13 — one dense page → *S6*

Both CVs are now one dense page instead of one full page plus a quarter-full one. Cut by
weakest-first, not by padding: the 2018 Alexa skill (oldest, least relevant to a .NET
modernization pitch), the C#/VB feature-maintenance bullet (its VB signal moved into the
migration bullet, which now reads "legacy C# and VB estate"), and two bullets merged in each
project. No claim was lost, only restated more tightly.

---

## Run 2 — Website, 2026-07-22

Source: `src/content/portfolio.json`, `src/components/*.js`. The CV was the reference: where the
two disagreed, the site moved.

### v14 · T14 — monitoring card numbers → *W1, W5*

The card said "200+ mission-critical production systems" while the site's own experience section
said 50+ — the contradiction the CV fixed at v1, still live on the page. Card now reads 50+
applications, "8-10 hours → 10-15 minutes" instead of "hours → minutes", and the alerting bullet
describes what the alerts contain rather than calling itself intelligent.

### v15 · T15 — modernization card period → *W4*

The card dated 200+ unified applications to six weeks. Period widened to the Reveation tenure
(Dec 2022 - Mar 2025, unambiguously true) and the six-week window kept where it is defensible: as
the intensive migration phase, stated inside the bullet. The site keeps the card the CV dropped,
because the site has room to explain it.

### v16 · T16 — availability parity → *W2*

The site offered full-time work in three places ("full-time too, for the right team", "full-time
already for the right team", "or sooner, for the right role") while the CV states a student visa
capped at 20 h/week in semester. All three now state the entitlement instead.

**Reversible by choice, not by fact** — if the intent was "I would leave the programme for the
right offer", that is a conversation to have in an interview, not a promise on a landing page.

### v17 · T17 — carry CV facts across, split card from highlight → *W1, W3*

Deploy-time win (2-3 h → ~1 h) carried from the CV into the site's experience highlights, and
removed from the modernization card's prose so the two stop saying the same sentence — the card
now explains the mechanism, the highlight states the outcome, and the number survives as the
card's metric badge. NuGet packaging stays the card's centerpiece rather than being duplicated
into a highlight. Tark's mentoring line got the same treatment as the CV: it claims the practice,
not a second "4-5 juniors".

### v18 · T18 — filler sweep and screener pass → *W5, W6*

Filler grep clean, build green. Screener pass caught two last mismatches: the research card
claimed "statistical analysis" where the CV claims descriptive statistics on 36 responses, and
the 2022 journey entry rounded detection to "~8 hours to minutes" where every other mention says
8-10 hours to 10-15 minutes. Both now match the CV.

The site's voice — the tagline, "the most honest skills section on this page", the
zero-stale-PDFs metric — was deliberately left alone. That is personality, not inflation.

---

## Run 3 — Website polish, 2026-07-22

Source: `src/content/portfolio.json`, `src/components/Terminal.js`, `src/components/Footer.js`,
`public/index.html`. Site-only pass — nothing here mirrors into the CV; T19 and T21 are
deliberate site/CV divergences, explained below.

### v19 · T19 — site headline title → *W7*

The hero/terminal headline used the internal level "Software Engineer III (Full Stack)", which
means nothing to a reader outside the company that assigned it. `data.role` now reads "Senior
Full Stack Engineer". Deliberately not mirrored to the CV: the CV header and the Experience
entries keep the actual issued title, because a formal document states what was earned, not a
marketing headline. The site's own Experience list is untouched for the same reason.

### v20 · T20 — stats tile detection figure → *W8*

`data.stats` still said "down from 8+ hours" after v14/v18 unified every other mention of this
metric to "8-10 hours to 10-15 minutes". Label now reads "down from 8-10 hours"; the tile's
number (15) stays the range endpoint, matching the compact form already used on the monitoring
project's metric badge.

### v21 · T21 — chai joke no longer echoes the survey stat → *W9*

The terminal's `chai` command joked "productivity +78%" — the same number the AI-adoption
project claims 78% of respondents reported. Changed to "+∞%" so a real, sourced figure never
shares a number with a throwaway joke.

### v22 · T22 — footer availability now generated, not duplicated → *W10*

Footer.js hardcoded its own paraphrase of `data.availability` ("Working student, internship, or
freelance today; full-time from early 2027"), which could drift from the JSON silently. Moved
that sentence into `portfolio.json` as `availability.footer`; the component renders it instead
of restating it.

### v23 · T23 — Azure DevOps added to Skills → *W11*

The modernization project's `tech` tags named "Azure DevOps"; the Skills section's "Cloud &
Tools" only had "Azure". Added, closing a claim the Skills section didn't back up.

### v24 · T24 — stopgap social-preview image → *W12*

`index.html` had `og:title`/`og:description` but no image, so shared links rendered a blank
card. Added `og:image`, `og:type`, and `twitter:card` pointing at the existing `logo512.png`.
This is a stopgap, not a designed 1200×630 card — that work is still open in
[backlog.md](backlog.md) under the prerender item.
