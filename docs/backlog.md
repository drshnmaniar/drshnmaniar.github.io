# Backlog

Known work, not yet done. Technical only — content work goes through
[revision-loop.md](revision-loop.md).

## Migrate off Create React App

`react-scripts@5` is the build tool, and CRA has been unmaintained since early 2025. Vite or Next
is the move.

The reason this is more than housekeeping: the CV sells legacy modernization. A technical
interviewer who opens this repo — and the CV invites them to — finds a portfolio built on a
deprecated toolchain. That is the one contradiction on this site that the reader is qualified to
notice.

## Prerender the site

`public/index.html` ships `<div id="root"></div>` and a noscript that reads "You need to enable
JavaScript to run this app". Without JS the page is blank.

Google renders JS, but link unfurlers and many crawlers do not — so a shared link to the portfolio
can preview as an instruction to enable JavaScript. Static prerendering of the one route fixes it,
and comes free with the migration above if it lands on Next or Vite + a prerender plugin.
