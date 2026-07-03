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
      .then((data) => {
        setProjects(data.filter((r) => !r.fork));
        setLoading(false);
      })
      .catch((err) => {
        setError(err?.message || "Failed to load projects");
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="spinner" />;

  if (error) {
    return (
      <section className="py-16 border-t border-border">
        <div className="flex justify-between items-baseline mb-12 animate-fade-in max-md:flex-col max-md:gap-4">
          <h2 className="text-[2.5rem] tracking-tight brand-font">Selected Work.</h2>
        </div>
        <div className="bento-box bg-bg/40 p-10 text-center">
          <p className="text-secondary text-[0.95rem]">{error}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 border-t border-border">
      <div className="flex justify-between items-baseline mb-12 animate-fade-in max-md:flex-col max-md:gap-4">
        <h2 className="text-[2.5rem] tracking-tight brand-font">Selected Work.</h2>
        <a
          href={`https://github.com/${GITHUB_USERNAME}`}
          target="_blank"
          rel="noreferrer"
          className="text-[0.9rem] font-medium uppercase tracking-widest text-secondary hover:text-primary"
        >
          All projects →
        </a>
      </div>

      <div className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-6">
        {projects.map((p, i) => (
          <a
            key={p.id}
            href={p.html_url}
            target="_blank"
            rel="noreferrer"
            className="bento-box flex flex-col justify-between h-full no-underline animate-fade-in"
            style={{ animationDelay: `${0.2 + i * 0.1}s` }}
          >
            <div>
              <h3 className="text-[1.6rem] mb-4 text-primary brand-font">{p.name}</h3>
              <p className="text-secondary text-[0.95rem] mb-8 line-clamp-3">
                {p.description || "No description provided. Check out the repository for more details."}
              </p>
            </div>
            <div className="flex items-center gap-4 flex-wrap">
              {p.language && (
                <span className="pill-badge bg-transparent border border-border">{p.language}</span>
              )}
              <span className="pill-badge">★ {p.stargazers_count}</span>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
