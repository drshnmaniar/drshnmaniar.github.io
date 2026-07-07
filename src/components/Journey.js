import data from "../content/portfolio.json";
import useInView from "../hooks/useInView";

function JourneyItem({ stop }) {
  const [ref, inView] = useInView();
  return (
    <li ref={ref} className={`journey-item reveal ${inView ? "revealed" : ""}`}>
      <div className="journey-year">{stop.year}</div>
      <div>
        <h3 className="journey-title">{stop.title}</h3>
        <div className="journey-org">{stop.org}</div>
        <p className="journey-detail">{stop.detail}</p>
        <div className="journey-place">{stop.place}</div>
      </div>
    </li>
  );
}

export default function Journey() {
  const { levels, current, note } = data.german;
  const currentIndex = levels.indexOf(current);
  const [xpRef, xpInView] = useInView();

  return (
    <section className="section" id="journey">
      <span className="section-tag">
        <span className="no">01</span>The Journey
      </span>
      <h2 className="section-title">
        The distance between Rajkot and Heilbronn, <em>measured in systems shipped</em>
      </h2>
      <ul className="journey-list">
        {data.journey.map((stop) => (
          <JourneyItem stop={stop} key={stop.year} />
        ))}
      </ul>

      <div
        ref={xpRef}
        className={`xp-box reveal ${xpInView ? "revealed" : ""}`}
      >
        <div className="xp-title">In progress — Deutsch</div>
        <div className="xp-track">
          {levels.map((level, i) => (
            <div
              key={level}
              className={`xp-seg ${
                i < currentIndex ? "filled" : i === currentIndex ? "current" : ""
              }`}
            >
              {level}
            </div>
          ))}
        </div>
        <div className="xp-note">{note}</div>
      </div>
    </section>
  );
}
