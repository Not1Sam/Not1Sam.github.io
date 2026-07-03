import { SKILLS } from "../lib/skills";

export function Stack() {
  return (
    <div className="py-8">
      <section className="animate-fade-in" style={{ animationDelay: "0.1s" }}>
        <div className="mb-12">
          <h1 className="text-[clamp(2.5rem,6vw,4rem)] tracking-tight brand-font">
            Tech <br />
            Stack.
          </h1>
          <p className="text-secondary mt-4">
            The languages, frameworks, and tools powering my projects.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-6 max-md:grid-cols-1">
          {[
            { title: "Languages", items: SKILLS.languages },
            { title: "Frontend", items: SKILLS.frontend },
            { title: "Backend & DB", items: SKILLS.backend },
            { title: "Infrastructure & Tools", items: SKILLS.devops },
          ].map((cat, ci) => (
            <div
              key={cat.title}
              className="bento-box animate-fade-in"
              style={{ animationDelay: `${0.2 + ci * 0.1}s` }}
            >
              <h3 className="text-[1.8rem] mb-6 text-primary brand-font">{cat.title}</h3>
              <div className="flex flex-wrap gap-2">
                {cat.items.map((t) => (
                  <span key={t} className="pill-badge">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
