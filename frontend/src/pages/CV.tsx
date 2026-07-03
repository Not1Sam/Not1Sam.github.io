import { useState, useEffect } from "react";
import { SKILLS } from "../lib/skills";
import { API_BASE, SITE_URL } from "../lib/constants";
import type { CVData } from "../lib/types";

export function CV() {
  const [cv, setCv] = useState<CVData | null>(null);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<"embedded" | "skills">("skills");

  useEffect(() => {
    fetch(`${API_BASE}/api/cv`)
      .then((r) => r.json())
      .then((data) => { setCv(data); if (data?.file_path) setViewMode("embedded"); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const experience = [
    { role: "Software Engineer", company: "Freelance", period: "2023 — Present", description: "Building full-stack web applications, REST APIs, and containerized infrastructure." },
  ];
  const education = [
    { degree: "Software Engineering", school: "University", period: "2020 — 2024" },
  ];
  const shareUrl = `${SITE_URL}/cv`;

  return (
    <main className="py-6 md:py-8 max-w-[1100px]">
      <section className="animate-fade-in" style={{ animationDelay: "0.1s" }}>
        <div className="mb-6 md:mb-8">
          <span className="text-[0.7rem] md:text-[0.75rem] font-semibold tracking-[0.15em] uppercase mb-2 block font-mono text-secondary">
            <span className="fluo-text mr-1">▸</span> PROFILE
          </span>
          <h1 className="text-[clamp(1.8rem,6vw,3rem)] tracking-tight brand-font">CV.</h1>
          <p className="text-secondary mt-2 text-[0.85rem] md:text-[0.9rem]">Experience, education, and technical skills.</p>
        </div>

        <div className="mb-5 md:mb-6 flex flex-col sm:flex-row gap-2 md:gap-3 items-start">
          {cv && (
            <div className="flex gap-2 flex-wrap">
              <button onClick={() => setViewMode("embedded")} className={`px-3 py-1.5 font-mono text-[0.7rem] cursor-pointer border transition-all ${viewMode === "embedded" ? "bg-fluo/20 text-fluo border-fluo/50" : "bg-transparent text-secondary border-border hover:text-primary"}`}>
                PDF VIEW
              </button>
              <button onClick={() => setViewMode("skills")} className={`px-3 py-1.5 font-mono text-[0.7rem] cursor-pointer border transition-all ${viewMode === "skills" ? "bg-fluo/20 text-fluo border-fluo/50" : "bg-transparent text-secondary border-border hover:text-primary"}`}>
                SKILLS VIEW
              </button>
            </div>
          )}
          {cv && <a href={`${API_BASE}${cv.file_path}`} target="_blank" rel="noreferrer" className="btn-outline text-[0.7rem] px-3 py-1.5">DOWNLOAD →</a>}
        </div>

        {viewMode === "embedded" && cv ? (
          <div className="border border-border overflow-hidden bg-white" style={{ height: "calc(100vh - 280px)", minHeight: "400px" }}>
            <iframe src={`${API_BASE}${cv.file_path}#toolbar=1&navpanes=1&scrollbar=1`} className="w-full h-full border-none" title="CV PDF" />
          </div>
        ) : (
          <div className="flex flex-col gap-8 md:gap-10">
            <div>
              <h2 className="text-[clamp(1.1rem,3vw,1.5rem)] mb-4 brand-font border-b border-border pb-2 flex items-center gap-2">
                <span className="fluo-text font-mono text-[0.8rem]">▸</span> Experience
              </h2>
              {experience.map((e, i) => (
                <div key={i} className="bento-box mb-3">
                  <div className="flex flex-col sm:flex-row justify-between items-start gap-1">
                    <h3 className="text-[clamp(0.95rem,2.5vw,1.1rem)] font-bold brand-font">{e.role}</h3>
                    <span className="fluo-text text-[0.7rem] font-mono">{e.period}</span>
                  </div>
                  <p className="text-secondary text-[0.8rem] mt-1 mb-2">{e.company}</p>
                  <p className="text-secondary text-[0.8rem] md:text-[0.85rem] leading-relaxed">{e.description}</p>
                </div>
              ))}
            </div>

            <div>
              <h2 className="text-[clamp(1.1rem,3vw,1.5rem)] mb-4 brand-font border-b border-border pb-2 flex items-center gap-2">
                <span className="fluo-text font-mono text-[0.8rem]">▸</span> Education
              </h2>
              {education.map((e, i) => (
                <div key={i} className="bento-box mb-3">
                  <div className="flex flex-col sm:flex-row justify-between items-start gap-1">
                    <h3 className="text-[clamp(0.95rem,2.5vw,1.1rem)] font-bold brand-font">{e.degree}</h3>
                    <span className="fluo-text text-[0.7rem] font-mono">{e.period}</span>
                  </div>
                  <p className="text-secondary text-[0.8rem] mt-1">{e.school}</p>
                </div>
              ))}
            </div>

            <div>
              <h2 className="text-[clamp(1.1rem,3vw,1.5rem)] mb-4 brand-font border-b border-border pb-2 flex items-center gap-2">
                <span className="fluo-text font-mono text-[0.8rem]">▸</span> Technical Skills
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                {Object.entries(SKILLS).map(([cat, items]) => (
                  <div key={cat} className="bento-box">
                    <h3 className="text-[0.9rem] mb-2 font-bold brand-font capitalize">{cat}</h3>
                    <div className="flex flex-wrap gap-1.5">
                      {items.map((s) => <span key={s} className="pill-badge text-[0.6rem]">{s}</span>)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {!loading && !cv && viewMode !== "embedded" && (
          <div className="mt-8 flex flex-col gap-8 md:gap-10">
            <div>
              <h2 className="text-[clamp(1.1rem,3vw,1.5rem)] mb-4 brand-font border-b border-border pb-2 flex items-center gap-2">
                <span className="fluo-text font-mono text-[0.8rem]">▸</span> Experience
              </h2>
              {experience.map((e, i) => (
                <div key={i} className="bento-box mb-3">
                  <div className="flex flex-col sm:flex-row justify-between items-start gap-1">
                    <h3 className="text-[clamp(0.95rem,2.5vw,1.1rem)] font-bold brand-font">{e.role}</h3>
                    <span className="fluo-text text-[0.7rem] font-mono">{e.period}</span>
                  </div>
                  <p className="text-secondary text-[0.8rem] mt-1 mb-2">{e.company}</p>
                  <p className="text-secondary text-[0.8rem] md:text-[0.85rem] leading-relaxed">{e.description}</p>
                </div>
              ))}
            </div>
            <div>
              <h2 className="text-[clamp(1.1rem,3vw,1.5rem)] mb-4 brand-font border-b border-border pb-2 flex items-center gap-2">
                <span className="fluo-text font-mono text-[0.8rem]">▸</span> Education
              </h2>
              {education.map((e, i) => (
                <div key={i} className="bento-box mb-3">
                  <div className="flex flex-col sm:flex-row justify-between items-start gap-1">
                    <h3 className="text-[clamp(0.95rem,2.5vw,1.1rem)] font-bold brand-font">{e.degree}</h3>
                    <span className="fluo-text text-[0.7rem] font-mono">{e.period}</span>
                  </div>
                  <p className="text-secondary text-[0.8rem] mt-1">{e.school}</p>
                </div>
              ))}
            </div>
            <div>
              <h2 className="text-[clamp(1.1rem,3vw,1.5rem)] mb-4 brand-font border-b border-border pb-2 flex items-center gap-2">
                <span className="fluo-text font-mono text-[0.8rem]">▸</span> Technical Skills
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                {Object.entries(SKILLS).map(([cat, items]) => (
                  <div key={cat} className="bento-box">
                    <h3 className="text-[0.9rem] mb-2 font-bold brand-font capitalize">{cat}</h3>
                    <div className="flex flex-wrap gap-1.5">
                      {items.map((s) => <span key={s} className="pill-badge text-[0.6rem]">{s}</span>)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        <div className="mt-10 md:mt-14 bento-box text-center py-4">
          <p className="text-secondary/50 text-[0.7rem] mb-1 font-mono">SHARE LINK</p>
          <p className="font-mono text-fluo text-[0.75rem] break-all">{shareUrl}</p>
        </div>
      </section>
    </main>
  );
}
