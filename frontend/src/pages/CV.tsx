import { SKILLS } from "../lib/skills";

export function CV() {
  const experience = [
    {
      role: "Software Engineer",
      company: "Freelance",
      period: "2023 — Present",
      description: "Building full-stack web applications, REST APIs, and containerized infrastructure for clients and personal projects.",
    },
  ];

  const education = [
    {
      degree: "Software Engineering",
      school: "University",
      period: "2020 — 2024",
    },
  ];

  const skills = SKILLS;

  return (
    <main className="py-8 max-w-[900px]">
      <section className="animate-fade-in" style={{ animationDelay: "0.1s" }}>
        <div className="mb-12">
          <h1 className="text-[clamp(2.5rem,6vw,4rem)] tracking-tight brand-font">CV.</h1>
          <p className="text-secondary mt-4">
            Professional experience, education, and technical skills.
          </p>
        </div>

        <div className="mb-12">
          <h2 className="text-[1.8rem] mb-6 brand-font border-b border-border pb-3">Experience</h2>
          {experience.map((e, i) => (
            <div key={i} className="bento-box mb-4">
              <div className="flex justify-between items-start max-sm:flex-col max-sm:gap-2">
                <h3 className="text-[1.2rem] font-bold brand-font">{e.role}</h3>
                <span className="fluo-text text-[0.85rem] font-mono">{e.period}</span>
              </div>
              <p className="text-secondary text-[0.9rem] mt-1 mb-3">{e.company}</p>
              <p className="text-secondary leading-relaxed">{e.description}</p>
            </div>
          ))}
        </div>

        <div className="mb-12">
          <h2 className="text-[1.8rem] mb-6 brand-font border-b border-border pb-3">Education</h2>
          {education.map((e, i) => (
            <div key={i} className="bento-box mb-4">
              <div className="flex justify-between items-start max-sm:flex-col max-sm:gap-2">
                <h3 className="text-[1.2rem] font-bold brand-font">{e.degree}</h3>
                <span className="fluo-text text-[0.85rem] font-mono">{e.period}</span>
              </div>
              <p className="text-secondary text-[0.9rem] mt-1">{e.school}</p>
            </div>
          ))}
        </div>

        <div>
          <h2 className="text-[1.8rem] mb-6 brand-font border-b border-border pb-3">Technical Skills</h2>
          <div className="grid grid-cols-2 gap-6 max-sm:grid-cols-1">
            {Object.entries(skills).map(([cat, items]) => (
              <div key={cat} className="bento-box">
                <h3 className="text-[1.1rem] mb-4 font-bold brand-font capitalize">{cat}</h3>
                <div className="flex flex-wrap gap-2">
                  {items.map((s) => (
                    <span key={s} className="pill-badge">{s}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
