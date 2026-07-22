# Revision loop — skeleton

Template for a content revision pass over the CV or the site. **Copy this file** to something like
`revision-YYYY-MM.md`, fill in the two tables, and work it top to bottom. When the pass closes,
append its entries to [content-log.md](content-log.md) and delete the working copy — the log is
the durable record, the working copy is scaffolding.

Standing rules live in [content-standards.md](content-standards.md); seed the checklist from
there and add whatever this pass is specifically about.

---

## 1. Scope

> One paragraph: what triggered this pass, which files are in scope, which are explicitly out.
> Name the reference — if the CV and site disagree during this pass, which one moves?

## 2. Evaluation pipeline

Run after **every** task. A task is done only if this passes.

```bash
# CV
cd LaTex
python build.py                                                  # render
pdflatex -interaction=nonstopmode -halt-on-error main.tex        # EN compiles
pdflatex -interaction=nonstopmode -halt-on-error main_de.tex     # DE compiles
pdftoppm -png -r 90 -f 1 -l 1 main.pdf p1                        # look at it

# Site
node -e "JSON.parse(require('fs').readFileSync('src/content/portfolio.json','utf8'))"
npm run build
```

Then, in order:

1. **Mechanical** — everything above exits 0; page count within budget.
2. **Layout** — no section header is the last thing on a page; no mostly-empty page. Check the
   rendered image, not extracted text.
3. **Consistency** — walk every checklist row below against the rendered output, not the source.
   Numbers must agree across sections *and* across languages.
4. **Screener pass** — read it top to bottom as a hiring manager with 60 seconds. Would a
   contradiction, a buzzword, or a junior signal stop them? Log any hit as a **new checklist row
   and a new task**. The checklist may grow, never shrink.

## 3. Checklist

Seed from [content-standards.md](content-standards.md), then add rows specific to this pass.
Phrase each row so it is pass/fail against the rendered output — "no page ends on a header",
not "improve the layout".

- [ ] **C1** …
- [ ] **S1** …
- [ ] **L1** …

## 4. Tasks

One commit each. Smallest change that flips a row to pass.

| ID | Task | Touches | Done when |
|----|------|---------|-----------|
| T1 | | | |
| T2 | | | |

**Ordering constraints:** > e.g. agree on the numbers before moving the text that carries them;
> don't polish bullets that a later task deletes.

## 5. Protocol

```
while unchecked tasks remain:
    pick lowest-numbered runnable task (respect ordering constraints)
    apply the edit to every language/surface the task names
    run the evaluation pipeline (gates 1-4)
    if a gate fails: fix inside the same task, before committing
    tick the rows it closed
    write its entry (same commit)
    commit: "<prefix>: T<n> <summary>"

re-run gate 4 once more at the end
    new findings -> new rows + new tasks, keep going
    none        -> pass complete: move entries to content-log.md, delete this file
```

## 6. Entries

Draft them here as you go, then move them to [content-log.md](content-log.md) when the pass
closes. One per task, in plain language: what a reader would notice, the claim as it read before
and as it reads now. Log skipped or merged tasks too — no silent gaps.

### vN · T1 — short title → *rows closed*

> What changed, and why it was worth changing.
