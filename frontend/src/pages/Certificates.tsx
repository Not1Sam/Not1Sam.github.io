import { useEffect, useState } from "react";
import { API_BASE } from "../lib/constants";

interface Cert {
  id: string;
  title: string;
  issuer: string;
  date: string;
  image_path: string;
  credential_url: string | null;
}

export function Certificates() {
  const [certs, setCerts] = useState<Cert[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    fetch(`${API_BASE}/api/certificates`, { signal: controller.signal })
      .then((r) => {
        if (!r.ok) throw new Error("Failed to load certificates");
        return r.json();
      })
      .then((d) => { setCerts(d); setLoading(false); })
      .catch((e) => {
        if (e.name !== "AbortError") {
          setError(e.message);
          setLoading(false);
        }
      });
    return () => controller.abort();
  }, []);

  return (
    <main className="py-8">
      <section className="animate-fade-in" style={{ animationDelay: "0.1s" }}>
        <div className="mb-12">
          <h1 className="text-[clamp(2.5rem,6vw,4rem)] tracking-tight brand-font">
            Certificates.
          </h1>
          <p className="text-secondary mt-4">
            Professional certifications and achievements.
          </p>
        </div>

        {loading ? (
          <div className="spinner" />
        ) : error ? (
          <div className="bento-box text-center py-12">
            <p className="text-red-500">{error}</p>
          </div>
        ) : certs.length === 0 ? (
          <div className="bento-box text-center py-12">
            <p className="text-secondary">No certificates uploaded yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-6">
            {certs.map((c, i) => (
              <div
                key={c.id}
                className="bento-box animate-fade-in"
                style={{ animationDelay: `${0.2 + i * 0.1}s` }}
              >
                {c.image_path && (
                  <img
                    src={`${API_BASE}/uploads/${encodeURIComponent(c.image_path)}`}
                    alt={c.title}
                    loading="lazy"
                    width={600}
                    height={192}
                    className="w-full h-48 object-cover mb-4 border border-border"
                    onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                  />
                )}
                <h3 className="text-[1.3rem] mb-2 brand-font">{c.title}</h3>
                <p className="text-secondary text-[0.9rem] mb-1">{c.issuer}</p>
                <p className="fluo-text text-[0.8rem] font-mono mb-4">{c.date}</p>
                {c.credential_url && (
                  <a
                    href={c.credential_url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[0.85rem] font-mono text-secondary hover:text-fluo"
                  >
                    View Credential →
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
