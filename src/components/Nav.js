import data from "../content/portfolio.json";

export default function Nav() {
  const openTerminal = () =>
    window.dispatchEvent(new CustomEvent("open-terminal"));

  return (
    <nav className="nav">
      <div className="nav-inner">
        <a className="nav-logo" href="#top" aria-label="Home">
          Darshan Maniar
        </a>
        <ul className="nav-links">
          <li className="nav-hide-mobile"><a href="#journey">Journey</a></li>
          <li className="nav-hide-mobile"><a href="#work">Work</a></li>
          <li className="nav-hide-mobile"><a href="#projects">Projects</a></li>
          <li className="nav-hide-mobile"><a href="#contact">Contact</a></li>
          <li>
            <button
              className="nav-term-btn"
              onClick={openTerminal}
              title="Open terminal (or press ~)"
              aria-label="Open terminal"
            >
              ~
            </button>
          </li>
          <li>
            <a className="lux-link" href={data.cvEn} download>
              CV <span className="arrow">↓</span>
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
