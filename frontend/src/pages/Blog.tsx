import { useEffect, useState } from "react";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  created_at: string;
}

const API_BASE = import.meta.env.VITE_API_URL || "http://84.8.221.29:8000";

export function Blog() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE}/api/blog`)
      .then((r) => r.json())
      .then((d) => { setPosts(d); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  return (
    <main className="py-8">
      <section className="animate-fade-in" style={{ animationDelay: "0.1s" }}>
        <div className="mb-12">
          <h1 className="text-[clamp(2.5rem,6vw,4rem)] tracking-tight brand-font">
            Dev
            <br />
            Logs.
          </h1>
          <p className="text-secondary mt-4">Thoughts, tutorials, and engineering rants.</p>
        </div>

        {loading ? (
          <div className="spinner" />
        ) : posts.length === 0 ? (
          <div className="bento-box text-center py-12">
            <p className="text-secondary">
              No transmissions found. Head to the{" "}
              <a href="/admin" className="fluo-text">Admin panel</a> to write the first log.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {posts.map((p, i) => (
              <article
                key={p.id}
                className="bento-box animate-fade-in"
                style={{ animationDelay: `${0.2 + i * 0.1}s` }}
              >
                <span className="text-[0.8rem] fluo-text font-mono tracking-wider">
                  {new Date(p.created_at).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
                <h2 className="text-[1.8rem] mt-2 mb-3 brand-font">{p.title}</h2>
                <p className="text-secondary mb-6">{p.excerpt}</p>
                <button className="px-6 py-2 bg-transparent border border-border text-primary cursor-pointer transition-all hover:border-secondary font-mono text-[0.85rem]">
                  Read full log →
                </button>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
