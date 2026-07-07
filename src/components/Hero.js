import data from "../content/portfolio.json";

export default function Hero() {
  const [firstName, ...rest] = data.name.split(" ");
  const surname = rest.join(" ");

  return (
    <header id="top" className="hero">
      <div className="hero-inner">
        <p className="hero-kicker">
          Full Stack Engineer — Heilbronn, Germany
        </p>
        <h1 className="hero-name">
          {firstName} <span className="surname">{surname}</span>
        </h1>
        <p className="hero-tagline">{data.tagline}</p>
        <p className="hero-summary">{data.summary}</p>
        <div className="hero-ctas">
          <a className="lux-pill" href={data.cvEn} download>
            Curriculum Vitae <span aria-hidden="true">↓</span>
          </a>
          <a className="lux-link" href={data.cvDe} download>
            Lebenslauf (DE) <span className="arrow">↓</span>
          </a>
          <a className="lux-link" href={`mailto:${data.email}`}>
            Email <span className="arrow">↗</span>
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
      </div>
    </header>
  );
}
