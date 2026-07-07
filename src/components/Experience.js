import data from "../content/portfolio.json";
import useInView from "../hooks/useInView";

function ExpCard({ job }) {
  const [ref, inView] = useInView();
  return (
    <article
      ref={ref}
      className={`exp-card reveal ${inView ? "revealed" : ""}`}
    >
      <div className="exp-head">
        <h3 className="exp-company">{job.company}</h3>
        <span className="exp-time">{job.timeSpan}</span>
      </div>
      <div className="exp-pos">
        {job.position} · {job.location}
      </div>
      <ul className="exp-list">
        {job.highlights.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
    </article>
  );
}

export default function Experience() {
  return (
    <section className="section" id="work">
      <span className="section-tag">
        <span className="no">02</span>Experience
      </span>
      <h2 className="section-title">
        Seven years of <em>keeping serious systems alive</em>
      </h2>
      {data.experience.map((job) => (
        <ExpCard job={job} key={job.company} />
      ))}
    </section>
  );
}
