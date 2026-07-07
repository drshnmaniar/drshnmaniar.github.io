import { useEffect, useState } from "react";
import data from "../content/portfolio.json";
import useInView from "../hooks/useInView";

function Counter({ target, suffix, run }) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!run) return;
    const duration = 1600;
    const start = performance.now();
    let frame;
    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * target));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [run, target]);

  return (
    <span className="stat-value">
      {value}
      {suffix}
    </span>
  );
}

export default function Stats() {
  const [ref, inView] = useInView();

  return (
    <div className="stats-band">
      <div ref={ref} className={`stats reveal ${inView ? "revealed" : ""}`}>
        {data.stats.map((stat) => (
          <div className="stat-card" key={stat.label}>
            <Counter target={stat.value} suffix={stat.suffix} run={inView} />
            <div className="stat-label">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
