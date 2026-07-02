import { useEffect, useState } from "react";

interface Repo {
  id: number;
  name: string;
  html_url: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  fork: boolean;
}

export function ProjectList() {
  const [projects, setProjects] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://api.github.com/users/Not1Sam/repos?sort=updated&per_page=12")
      .then((r) => r.json())
      .then((data) => {
        setProjects(data.filter((r: Repo) => !r.fork));
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <div className="spinner" />;

  return (
    <section className="py-16 border-t border-border">
      <div className="flex justify-between items-baseline mb-12 animate-fade-in max-md:flex-col max-md:gap-4">
        <h2 className="text-[2.5rem] tracking-tight brand-font">Selected Work.</h2>
        <a
          href="https://github.com/Not1Sam"
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
