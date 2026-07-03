import { SKILLS } from "../lib/skills";

export function Stack() {
  return (
    <div className="py-6 md:py-8">
      <section className="animate-fade-in" style={{ animationDelay: "0.1s" }}>
        <div className="mb-8 md:mb-10">
          <span className="text-[0.7rem] md:text-[0.75rem] font-semibold tracking-[0.15em] uppercase mb-2 block font-mono text-secondary">
            <span className="fluo-text mr-1">▸</span> CAPABILITIES
          </span>
          <h1 className="text-[clamp(1.8rem,6vw,3rem)] tracking-tight brand-font">Tech Stack.</h1>
          <p className="text-secondary mt-2 text-[0.85rem] md:text-[0.9rem]">Languages, frameworks, and tools powering the system.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
          {[
            { title: "Languages", items: SKILLS.languages },
            { title: "Frontend", items: SKILLS.frontend },
            { title: "Backend & DB", items: SKILLS.backend },
            { title: "Infrastructure", items: SKILLS.devops },
          ].map((cat, ci) => (
            <div key={cat.title} className="bento-box animate-fade-in" style={{ animationDelay: `${0.15 + ci * 0.08}s` }}>
              <h3 className="text-[clamp(1rem,2.5vw,1.3rem)] mb-3 md:mb-4 text-primary brand-font">{cat.title}</h3>
              <div className="flex flex-wrap gap-1.5">
                {cat.items.map((t) => (
                  <span key={t} className="pill-badge text-[0.6rem] md:text-[0.65rem]">{t}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
