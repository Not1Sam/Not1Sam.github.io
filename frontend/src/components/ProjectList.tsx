import { useEffect, useState } from "react";
import { githubFetch } from "../lib/github";
import { GITHUB_USERNAME } from "../lib/constants";
import type { GitHubRepo } from "../lib/types";

export function ProjectList() {
  const [projects, setProjects] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    githubFetch<GitHubRepo[]>(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=12`)
      .then((data) => { setProjects(data.filter((r) => !r.fork)); setLoading(false); })
      .catch((err) => { setError(err?.message || "Failed to load projects"); setLoading(false); });
  }, []);

  if (loading) return <div className="spinner" />;

  if (error) {
    return (
      <section className="py-10 md:py-14 border-t border-border">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-baseline mb-8 md:mb-10 gap-2 animate-fade-in">
          <h2 className="text-[clamp(1.6rem,5vw,2.5rem)] tracking-tight brand-font">Selected Work.</h2>
        </div>
        <div className="bento-box p-6 md:p-10 text-center">
          <p className="text-secondary text-[0.85rem] font-mono">{error}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-10 md:py-14 border-t border-border">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-baseline mb-8 md:mb-10 gap-2 animate-fade-in">
        <h2 className="text-[clamp(1.6rem,5vw,2.5rem)] tracking-tight brand-font">Selected Work.</h2>
        <a href={`https://github.com/${GITHUB_USERNAME}`} target="_blank" rel="noreferrer" className="text-[0.75rem] font-mono uppercase tracking-[0.12em] text-secondary hover:text-fluo transition-colors">
          VIEW ALL <span className="fluo-text">→</span>
        </a>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
        {projects.map((p, i) => (
          <a
            key={p.id}
            href={p.html_url}
            target="_blank"
            rel="noreferrer"
            className="bento-box flex flex-col justify-between h-full no-underline stagger-child group"
            style={{ animationDelay: `${0.1 + i * 0.06}s` }}
          >
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-fluo/40 font-mono text-[0.7rem]">▸</span>
                <h3 className="text-[1.1rem] md:text-[1.25rem] text-primary brand-font group-hover:text-fluo transition-colors">{p.name}</h3>
              </div>
              <p className="text-secondary text-[0.8rem] md:text-[0.85rem] mb-5 leading-relaxed pl-4 border-l border-border/50 group-hover:border-fluo/30 transition-colors">
                {p.description || "No description provided."}
              </p>
            </div>
            <div className="flex items-center gap-2 flex-wrap pl-4">
              {p.language && <span className="pill-badge text-[0.6rem]">{p.language}</span>}
              <span className="pill-badge text-[0.6rem]">★ {p.stargazers_count}</span>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
