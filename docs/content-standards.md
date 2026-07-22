# Content standards

The rules the CV and the site are held to. These outlast any particular revision pass — a new
loop starts by copying these rows, not by inventing them. History of how they were applied:
[content-log.md](content-log.md).

## Sources of truth

| What | Lives in | Notes |
|------|----------|-------|
| CV content | `LaTex/cv.en.json`, `LaTex/cv.de.json` | one file per language, same shape |
| CV layout | `LaTex/template.tex.j2` | shared; only a `babel`/`fontenc` branch differs by language |
| Site content | `src/content/portfolio.json` | some copy is still inline in `src/components/*.js` |
| Generated | `LaTex/main.tex`, `LaTex/main_de.tex` | gitignored, overwritten by `build.py` — never edit |

**EN and DE move together.** Every content change lands in both `cv.*.json` files in the same
commit. **The CV is the reference**: where the site and the CV disagree, the site moves.

## Credibility

- Every number states **what it counts**. If two figures measure different things, each occurrence
  says which — "50+ monitored production applications" and "the 200+ applications in the legacy
  estate", never a bare "the estate" carrying both.
- Every number survives *"how did you measure that?"* A percentage without a scope or a window is
  a liability, not an asset.
- The same event gets the **same figures everywhere** — CV, site cards, site journey. No rounding
  in one place and precision in another.
- No claim appears **twice in the same voice**. If a headcount shows up under two employers,
  one of them states the practice instead.
- No period is **narrower than the work it claims**. 200+ applications do not get unified in six
  weeks; if a burst of it did happen in six weeks, that belongs in the sentence, not the date range.

## Structure

- Both CVs fit **one page**.
- **No section header stranded** at the foot of a page, and no mostly-empty page — either it fits
  one dense page or page 2 is at least half full.
- CV summary is **≤ 3 rendered lines**. Cut anything the CV proves elsewhere.
- CV section order: Summary → Experience → Education → Technical Skills → Projects.
- **Projects carries no employer work** on the CV — that is what Experience is for. On the site,
  cards may cover employer work, but the card carries the *mechanism* and the highlight carries
  the *outcome*; they never share a sentence.

## Language

- **No filler.** Banned outright: comprehensive, intelligent, seamless, robust, cutting-edge,
  mission-critical (unless it is counting something), "ensuring business continuity", "directly
  impacting customer satisfaction", "actionable insights". German equivalents likewise: umfassend,
  nahtlos, geschäftskritisch, "umsetzbare Erkenntnisse".
- Every bullet is **verb + what + scale or outcome**, and ends on a fact rather than an adjective.
- Coursework claims what **coursework can claim**: "78% of respondents reported gains", not "78%
  productivity gains".
- The German is **written, not translated** — no calques, no split-verb errors, standard German IT
  vocabulary.
- **Availability says one thing** in all four places (CV header, site hero, site footer, journey
  2027): 20 h/week in semester, full-time in semester breaks, full-time from early 2027. Nothing
  may promise full-time sooner — the student visa does not allow it.

## Verifying

```bash
cd LaTex && python build.py && pdflatex main.tex && pdflatex main_de.tex   # CV
npm run build                                                              # site
```

Page count and stranded headers are checked from the rendered PDF, not from the `.tex` — and from
page **images** rather than `pdftotext`, which reorders right-aligned columns and will make a
correct layout look broken.
