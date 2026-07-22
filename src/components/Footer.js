import data from "../content/portfolio.json";

export default function Footer() {
  return (
    <footer className="footer" id="contact">
      <div className="footer-inner">
        <h2 className="footer-big">
          Let's build something that <em>outlives its framework</em>.
        </h2>
        <p className="footer-availability">
          {data.availability.footer} Either way:{" "}
          <a href={`mailto:${data.email}`}>{data.email}</a>
        </p>
        <div className="footer-ctas">
          <a className="lux-pill" href={`mailto:${data.email}`}>
            {data.email}
          </a>
          <a className="lux-link" href={data.cvEn} download>
            CV (EN) <span className="arrow">↓</span>
          </a>
          <a className="lux-link" href={data.cvDe} download>
            Lebenslauf (DE) <span className="arrow">↓</span>
          </a>
          <a
            className="lux-link"
            href={data.githubUrl}
            target="_blank"
            rel="noreferrer"
          >
            GitHub <span className="arrow">↗</span>
          </a>
          <a
            className="lux-link"
            href={data.linkedinUrl}
            target="_blank"
            rel="noreferrer"
          >
            LinkedIn <span className="arrow">↗</span>
          </a>
        </div>
        <div className="footer-meta">
          <span>
            © {new Date().getFullYear()} {data.name} — Heilbronn, Germany
          </span>
          <span className="footer-hint">
            the curious may try <kbd>~</kbd>
          </span>
          <span>CV compiled from LaTeX, always current</span>
        </div>
      </div>
    </footer>
  );
}
