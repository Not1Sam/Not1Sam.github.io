import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { API_BASE } from "../lib/constants";
import { TerminalLines } from "../components/LoadingStates";
import type { BlogPost } from "../lib/types";

export function Blog() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expanded, setExpanded] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    fetch(`${API_BASE}/api/blog`, { signal: controller.signal })
      .then((r) => { if (!r.ok) throw new Error("Failed to load"); return r.json(); })
      .then((d) => { setPosts(d); setLoading(false); })
      .catch((e) => { if (e.name !== "AbortError") { setError(e.message); setLoading(false); } });
    return () => controller.abort();
  }, []);

  return (
    <main className="py-6 md:py-8">
      <section className="animate-fade-in" style={{ animationDelay: "0.1s" }}>
        <div className="mb-8 md:mb-10">
          <span className="text-[0.7rem] md:text-[0.75rem] font-semibold tracking-[0.15em] uppercase mb-2 block font-mono text-secondary stagger-child" style={{ animationDelay: "0.05s" }}>
            <span className="fluo-text mr-1">▸</span> DATA LOGS
          </span>
          <h1 className="text-[clamp(1.8rem,6vw,3rem)] tracking-tight brand-font stagger-child" style={{ animationDelay: "0.1s" }}>Dev Logs.</h1>
          <p className="text-secondary mt-2 text-[0.85rem] md:text-[0.9rem] stagger-child" style={{ animationDelay: "0.15s" }}>Thoughts, tutorials, and engineering rants.</p>
        </div>

        {loading ? (
          <div className="bento-box p-6 md:p-10">
            <TerminalLines count={5} />
          </div>
        ) : error ? (
          <div className="bento-box text-center py-10">
            <p className="text-red-400 font-mono text-[0.85rem] animate-flicker-in">[ERROR] {error}</p>
          </div>
        ) : posts.length === 0 ? (
          <div className="bento-box text-center py-10">
            <p className="text-secondary text-[0.85rem] font-mono">NO LOGS FOUND. <Link to="/admin" className="fluo-text hover:underline">Initialize first entry.</Link></p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-3 md:gap-4">
            {posts.map((p, i) => (
              <article key={p.id} className="bento-box stagger-child" style={{ animationDelay: `${0.1 + i * 0.08}s` }}>
                <div className="flex items-center gap-2 mb-2 font-mono text-[0.7rem]">
                  <span className="fluo-text">▸</span>
                  <span className="text-secondary">{new Date(p.created_at).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}</span>
                </div>
                <h2 className="text-[clamp(1.1rem,3vw,1.5rem)] mb-2 brand-font">{p.title}</h2>
                <p className="text-secondary text-[0.8rem] md:text-[0.85rem] mb-4 leading-relaxed">{p.excerpt}</p>
                {expanded === p.id ? (
                  <div className="animate-slide-up">
                    <div className="whitespace-pre-wrap text-[0.85rem] leading-relaxed mb-3 text-secondary border-l-2 border-fluo/30 pl-4">{p.content}</div>
                    <button onClick={() => setExpanded(null)} className="btn-outline text-[0.75rem]">COLLAPSE ↑</button>
                  </div>
                ) : (
                  <button onClick={() => setExpanded(p.id)} className="btn-outline text-[0.75rem]">EXPAND LOG →</button>
                )}
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
