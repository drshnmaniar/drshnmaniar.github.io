import { useEffect, useState } from "react";
import data from "../content/portfolio.json";

export default function GitHubActivity() {
  const [repos, setRepos] = useState(null);
  const [failed, setFailed] = useState(false);
  const [chartOk, setChartOk] = useState(true);

  useEffect(() => {
    let cancelled = false;
    fetch(
      `https://api.github.com/users/${data.github}/repos?sort=pushed&per_page=6&type=owner`
    )
      .then((res) => (res.ok ? res.json() : Promise.reject(res.status)))
      .then((json) => {
        if (!cancelled) setRepos(json);
      })
      .catch(() => {
        if (!cancelled) setFailed(true);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section className="section" id="github">
      <span className="section-tag">
        <span className="no">04</span>GitHub
      </span>
      <h2 className="section-title">
        Quiet, <em>consistent</em> work
      </h2>

      {chartOk && (
        <img
          className="gh-chart"
          src={`https://ghchart.rshah.org/9c7a4d/${data.github}`}
          alt={`GitHub contribution chart for ${data.github}`}
          loading="lazy"
          onError={() => setChartOk(false)}
        />
      )}

      {failed && (
        <p className="gh-fallback">
          GitHub is rate-limiting the API at the moment — everything lives at{" "}
          <a href={data.githubUrl}>github.com/{data.github}</a>
        </p>
      )}

      {repos && (
        <div className="gh-grid">
          {repos.map((repo) => (
            <a
              className="gh-repo"
              href={repo.html_url}
              key={repo.id}
              target="_blank"
              rel="noreferrer"
            >
              <div className="gh-repo-name">{repo.name}</div>
              <div className="gh-repo-desc">
                {repo.description || "No description — the code speaks quietly for itself."}
              </div>
              <div className="gh-repo-meta">
                {repo.language && (
                  <span>
                    <span className="gh-lang-dot" />
                    {repo.language}
                  </span>
                )}
                <span>★ {repo.stargazers_count}</span>
                <span>
                  {new Date(repo.pushed_at).toLocaleDateString("en-GB", {
                    month: "short",
                    year: "numeric",
                  })}
                </span>
              </div>
            </a>
          ))}
        </div>
      )}
    </section>
  );
}
