import { useState, useEffect } from "react";
import { GithubActivity } from "./GithubActivity";

export function Hero() {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");

  const fullTitle = "[ software \n engineer ]";
  const fullSub =
    "I build Systems that work and are scalable. | \n Networking enthusiast. | \n Homelaber. ";

  useEffect(() => {
    fetch("https://api.github.com/users/Not1Sam")
      .then((r) => r.json())
      .then((d) => { setProfile(d); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  useEffect(() => {
    let i = 0;
    const t = setInterval(() => {
      setTitle(fullTitle.substring(0, i));
      i++;
      if (i > fullTitle.length) {
        clearInterval(t);
        let j = 0;
        const s = setInterval(() => {
          setSubtitle(fullSub.substring(0, j));
          j++;
          if (j > fullSub.length) clearInterval(s);
        }, 30);
      }
    }, 80);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="py-8 pb-24 animate-fade-in">
      <div className="max-w-[800px]">
        <h1 className="text-[clamp(2.5rem,6vw,4.5rem)] leading-[1.1] mb-6 text-primary tracking-tight font-bold brand-font whitespace-pre-line">
          {title}
          <span className="text-fluo" style={{ animation: "blink 1s step-end infinite" }}>
            _
          </span>
        </h1>
        <p className="font-mono text-[1rem] text-secondary max-w-[600px] leading-relaxed mb-10 min-h-[3rem] whitespace-pre-line">
          {subtitle}
        </p>
        <a
          href="https://linktr.ee/not1sam"
          target="_blank"
          rel="noreferrer"
          className="inline-block px-8 py-4 bg-primary text-bg font-semibold text-[1.1rem] rounded transition-all hover:opacity-80 hover:-translate-y-0.5"
        >
          Let&apos;s Connect →
        </a>
      </div>

      {loading ? (
        <div className="spinner" />
      ) : profile ? (
        <div className="grid grid-cols-4 gap-6 mt-16 max-md:grid-cols-2 max-sm:grid-cols-1">
          {[
            { label: "Location", value: "Morocco 🇲🇦" },
            { label: "Currently building", value: "Open Source · Next Gen Tools" },
            { label: "Repositories", value: `${profile.public_repos}+ Projects` },
            { label: "Followers", value: `${profile.followers} Connections` },
          ].map((s) => (
            <div key={s.label} className="bento-box flex flex-col justify-center gap-2 p-6">
              <span className="text-[0.85rem] text-secondary uppercase tracking-widest font-medium">
                {s.label}
              </span>
              <span className="font-semibold text-[1.2rem] text-primary brand-font">{s.value}</span>
            </div>
          ))}
        </div>
      ) : null}

      <GithubActivity />
    </section>
  );
}
