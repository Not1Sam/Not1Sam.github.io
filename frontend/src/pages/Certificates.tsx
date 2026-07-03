import { useEffect, useState } from "react";
import { API_BASE } from "../lib/constants";
import { ImageSkeleton } from "../components/LoadingStates";

interface Cert { id: string; title: string; issuer: string; date: string; image_path: string; credential_url: string | null; }

export function Certificates() {
  const [certs, setCerts] = useState<Cert[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    fetch(`${API_BASE}/api/certificates`, { signal: controller.signal })
      .then((r) => { if (!r.ok) throw new Error("Failed to load"); return r.json(); })
      .then((d) => { setCerts(d); setLoading(false); })
      .catch((e) => { if (e.name !== "AbortError") { setError(e.message); setLoading(false); } });
    return () => controller.abort();
  }, []);

  return (
    <main className="py-6 md:py-8">
      <section className="animate-fade-in" style={{ animationDelay: "0.1s" }}>
        <div className="mb-8 md:mb-10">
          <span className="text-[0.7rem] md:text-[0.75rem] font-semibold tracking-[0.15em] uppercase mb-2 block font-mono text-secondary">
            <span className="fluo-text mr-1">▸</span> CREDENTIALS
          </span>
          <h1 className="text-[clamp(1.8rem,6vw,3rem)] tracking-tight brand-font">Certificates.</h1>
          <p className="text-secondary mt-2 text-[0.85rem] md:text-[0.9rem]">Professional certifications and achievements.</p>
        </div>

        {loading ? (
          <ImageSkeleton count={6} />
        ) : error ? (
          <div className="bento-box text-center py-10"><p className="text-red-400 font-mono text-[0.85rem]">[ERROR] {error}</p></div>
        ) : certs.length === 0 ? (
          <div className="bento-box text-center py-10"><p className="text-secondary text-[0.85rem] font-mono">NO CREDENTIALS ON FILE.</p></div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
            {certs.map((c, i) => (
              <div key={c.id} className="bento-box animate-fade-in group" style={{ animationDelay: `${0.1 + i * 0.06}s` }}>
                {c.image_path && (
                  <div className="overflow-hidden mb-3 border border-border">
                    <img src={`${API_BASE}/uploads/${encodeURIComponent(c.image_path)}`} alt={c.title} loading="lazy" width={600} height={192}
                      className="w-full h-36 md:h-44 object-cover transition-transform duration-500 group-hover:scale-105"
                      onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                  </div>
                )}
                <h3 className="text-[1rem] md:text-[1.15rem] mb-1.5 brand-font">{c.title}</h3>
                <p className="text-secondary text-[0.8rem] mb-0.5">{c.issuer}</p>
                <p className="fluo-text text-[0.7rem] font-mono mb-3">{c.date}</p>
                {c.credential_url && (
                  <a href={c.credential_url} target="_blank" rel="noreferrer" className="text-[0.75rem] font-mono text-secondary hover:text-fluo transition-colors">
                    VERIFY CREDENTIAL →
                  </a>
                )}
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
