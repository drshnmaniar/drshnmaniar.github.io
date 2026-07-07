import data from "../content/portfolio.json";
import useInView from "../hooks/useInView";

export default function Skills() {
  const [ref, inView] = useInView();

  return (
    <section className="section" id="skills">
      <span className="section-tag">
        <span className="no">05</span>Capabilities
      </span>
      <h2 className="section-title">
        The <em>toolbox</em>, in plain terms
      </h2>
      <div
        ref={ref}
        className={`skills-grid reveal ${inView ? "revealed" : ""}`}
      >
        {Object.entries(data.skills).map(([group, items]) => (
          <div key={group}>
            <div className="skill-group-title">{group}</div>
            <ul className="skill-pills">
              {items.map((skill) => (
                <li key={skill}>{skill}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="lang-row">
        {data.languages.map((lang, i) => (
          <span key={lang.name}>
            {i > 0 && <span className="sep">·</span>}
            {lang.name} — {lang.level}
          </span>
        ))}
      </div>
    </section>
  );
}
