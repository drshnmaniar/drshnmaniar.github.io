# drshnmaniar.github.io

Personal portfolio of **Darshan Maniar** — playful & bold React site with a self-updating, LaTeX-compiled CV.

**Live:** https://drshnmaniar.github.io

## How the CV pipeline works

The CV lives as LaTeX source in [`LaTex/`](LaTex/) (`main.tex` = English, `main_de.tex` = German). On every push to `main`, the [deploy workflow](.github/workflows/deploy.yml):

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

## Structure

- `src/content/portfolio.json` — all site content in one place; edit this to update text
- `src/components/` — Hero, Journey, Experience, Projects, GitHubActivity, Skills, Footer, plus the toys (Terminal, Toys)
- `src/style/portfolio.css` — the neo-brutalist design system
- `LaTex/` — the CV source of truth

## Easter eggs

Press <kbd>~</kbd>. Or enter the Konami code. Or open the dev console. 🕹️
