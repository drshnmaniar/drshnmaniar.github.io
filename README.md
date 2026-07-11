# drshnmaniar.github.io

Personal portfolio of **Darshan Maniar** — a quiet-luxury React site backed by a self-updating, LaTeX-compiled CV.

**Live:** https://drshnmaniar.github.io

## Highlights

- **Content lives in one file** — [`src/content/portfolio.json`](src/content/portfolio.json). Copy changes never touch component code.
- **Always-current CV** — the English and German CVs are compiled from LaTeX by CI on every push, so the downloadable PDFs can never fall out of date.
- **Quiet-luxury design** — a restrained, editorial system (serif display, gold accent, generous whitespace) defined in [`src/style/portfolio.css`](src/style/portfolio.css).
- **A few easter eggs** — for the curious.

## How the CV pipeline works

The CV is the source of truth as LaTeX in [`LaTex/`](LaTex/) (`main.tex` = English, `main_de.tex` = German). On every push to `main`, the [deploy workflow](.github/workflows/deploy.yml):

1. Compiles both `.tex` files with a full TeX Live via `xu-cheng/latex-action`
2. Drops the PDFs into `public/cv/` (`DarshanManiar-CV.pdf`, `DarshanManiar-CV-DE.pdf`)
3. Builds the React app and deploys everything to GitHub Pages

So: **edit `LaTex/main.tex`, push, and the download buttons on the site serve the freshly compiled PDF.** No manual exporting, ever.

> **One-time setup:** in the repo settings → *Pages* → set **Source** to **GitHub Actions** (instead of the old `gh-pages` branch).

## Development

```bash
npm install
npm start        # dev server at localhost:3000
npm run build    # production build
```

Note: locally the CV download links 404, because the PDFs only exist after CI compiles them. Everything else works offline.

To build the CVs locally you need a LaTeX distribution (TeX Live or MiKTeX):

```bash
cd LaTex
pdflatex main.tex        # English
pdflatex main_de.tex     # German
```

## Structure

```
src/
  content/portfolio.json   all site copy — edit this to update text
  components/              Nav, Hero, Stats, Journey, Experience, Projects,
                          GitHubActivity, Skills, Footer, Terminal, Toys
  hooks/                  useInView (scroll reveal), useKonami (easter egg)
  style/portfolio.css     the quiet-luxury design system
LaTex/                    CV source of truth (main.tex EN, main_de.tex DE)
.github/workflows/        deploy.yml — compile CVs, build, deploy to Pages
```

## Tech

React (Create React App) · GitHub Actions · LaTeX · GitHub Pages

## Easter eggs

Press <kbd>~</kbd>. Or enter the Konami code. Or open the dev console. 🕹️
