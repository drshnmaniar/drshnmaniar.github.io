import data from "../content/portfolio.json";
import useInView from "../hooks/useInView";

function ProjectCard({ project, index }) {
  const [ref, inView] = useInView();
  return (
    <article
      ref={ref}
      className={`proj-card reveal ${inView ? "revealed" : ""}`}
    >
      <div className="proj-no">{String(index + 1).padStart(2, "0")}</div>
      <div>
        <h3 className="proj-title">{project.title}</h3>
        <div className="proj-role">
          {project.role} — {project.period}
        </div>
        <p className="proj-pitch">{project.pitch}</p>
        <ul className="proj-points">
          {project.points.map((point, i) => (
            <li key={i}>{point}</li>
          ))}
        </ul>
        <div className="proj-metrics">
          {project.metrics.map((metric) => (
            <div key={metric.label}>
              <div className="proj-metric-value">{metric.value}</div>
              <div className="proj-metric-label">{metric.label}</div>
            </div>
          ))}
        </div>
        <div className="proj-tech">
          {project.tech.map((tech, i) => (
            <span key={tech}>
              {i > 0 && <span className="sep">·</span>}
              {tech}
            </span>
          ))}
        </div>
        {project.link && (
          <div className="proj-link">
            <a
              className="lux-link"
              href={project.link}
              target="_blank"
              rel="noreferrer"
            >
              View repo <span className="arrow">↗</span>
            </a>
          </div>
        )}
      </div>
    </article>
  );
}

export default function Projects() {
  return (
    <section className="section" id="projects">
      <span className="section-tag">
        <span className="no">03</span>Selected Work
      </span>
      <h2 className="section-title">
        Chosen not for cleverness, but for <em>what they changed</em>
      </h2>
      <div className="proj-grid">
        {data.projects.map((project, i) => (
          <ProjectCard project={project} index={i} key={project.title} />
        ))}
      </div>
    </section>
  );
}
