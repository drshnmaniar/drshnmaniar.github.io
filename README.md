# drshnmaniar.github.io

Personal portfolio of **Darshan Maniar** — a quiet-luxury React site backed by a self-updating, LaTeX-compiled CV.

**Live:** https://drshnmaniar.github.io

## Highlights

- **Content lives in one file** — [`src/content/portfolio.json`](src/content/portfolio.json). Copy changes never touch component code.
- **Always-current CV** — the English and German CVs are compiled from LaTeX by CI on every push, so the downloadable PDFs can never fall out of date.
- **One CV layout, two languages** — both PDFs render from a single [`template.tex.j2`](LaTex/template.tex.j2); only the content differs, in [`cv.en.json`](LaTex/cv.en.json) and [`cv.de.json`](LaTex/cv.de.json).
- **Every claim is checked** — [`docs/content-standards.md`](docs/content-standards.md) is the bar a claim has to clear; [`docs/content-log.md`](docs/content-log.md) records what changed and why.
- **Quiet-luxury design** — a restrained, editorial system (serif display, gold accent, generous whitespace) defined in [`src/style/portfolio.css`](src/style/portfolio.css).
- **A few easter eggs** — for the curious.

## How the CV pipeline works

The CV is single-sourced: **layout** lives in [`template.tex.j2`](LaTex/template.tex.j2), **content** in [`cv.en.json`](LaTex/cv.en.json) and [`cv.de.json`](LaTex/cv.de.json). [`build.py`](LaTex/build.py) renders them into `main.tex` and `main_de.tex`, which are **generated files — gitignored, and overwritten on every build.** Never edit them by hand.

On every push to `main`, the [deploy workflow](.github/workflows/deploy.yml):

1. Renders `main.tex` / `main_de.tex` from the template and the two JSON files (`python build.py`)
2. Compiles both with a full TeX Live via `xu-cheng/latex-action`
3. Drops the PDFs into `public/cv/` (`DarshanManiar-CV.pdf`, `DarshanManiar-CV-DE.pdf`)
4. Builds the React app and deploys everything to GitHub Pages

So: **edit `LaTex/cv.en.json` and `LaTex/cv.de.json`, push, and the download buttons serve the freshly compiled PDF.** No manual exporting, ever.

Both languages use the same single-column, photo-free header — the layout is identical, so a change to `template.tex.j2` lands in both PDFs at once. The only language branch left is `babel`/`fontenc` for German hyphenation.

## Development

```bash
npm install
npm start        # dev server at localhost:3000
npm run build    # production build
```

Note: locally the CV download links 404, because the PDFs only exist after CI compiles them. Everything else works offline.

To build the CVs locally you need Python with Jinja2, plus a LaTeX distribution (TeX Live or MiKTeX):

```bash
cd LaTex
pip install "jinja2>=3.1"
python build.py          # cv.*.json + template.tex.j2 -> main.tex, main_de.tex
pdflatex main.tex        # English
pdflatex main_de.tex     # German
```

Skipping `build.py` compiles whatever `main.tex` happened to contain last time — always render first.

## Structure

```
src/
  content/portfolio.json   all site copy — edit this to update text
  components/              Nav, Hero, Stats, Journey, Experience, Projects,
                          GitHubActivity, Skills, Footer, Terminal, Toys
  hooks/                  useInView (scroll reveal), useKonami (easter egg)
  style/portfolio.css     the quiet-luxury design system
LaTex/
  cv.en.json              CV content, English    ─┐ edit these
  cv.de.json              CV content, German     ─┘
  template.tex.j2         shared layout for both languages
  build.py                renders template + JSON -> main.tex, main_de.tex
  main.tex, main_de.tex   generated, gitignored — do not edit
docs/
  content-standards.md    the bar every claim on the CV and the site has to clear
  content-log.md          what changed in each revision pass, and why
  revision-loop.md        skeleton to copy when running another pass
.github/workflows/        deploy.yml — render, compile CVs, build, deploy to Pages
```

## Tech

React (Create React App) · GitHub Actions · LaTeX · GitHub Pages

## Easter eggs

Press <kbd>~</kbd>. Or enter the Konami code. Or open the dev console. 🕹️
