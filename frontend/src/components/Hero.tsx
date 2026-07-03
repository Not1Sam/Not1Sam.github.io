import { useState, useEffect, useRef } from "react";
import { GithubActivity } from "./GithubActivity";
import { githubFetch } from "../lib/github";
import { GITHUB_USERNAME, LINKTREE, HERO_STATS } from "../lib/constants";
import type { GitHubProfile } from "../lib/types";

function CountUp({ target, duration = 1200 }: { target: number; duration?: number }) {
  const [count, setCount] = useState(0);
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!visible) return;
    const startTime = performance.now();
    const step = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [visible, target, duration]);

  return <span ref={ref} className="animate-count">{count}</span>;
}

export function Hero() {
  const [profile, setProfile] = useState<GitHubProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const innerInterval = useRef<ReturnType<typeof setInterval> | null>(null);

  const fullTitle = "[ software \n engineer ]";
  const fullSub = "I build Systems that work and are scalable. | \n Networking enthusiast. | \n Homelaber. ";

  useEffect(() => {
    githubFetch<GitHubProfile>(`https://api.github.com/users/${GITHUB_USERNAME}`)
      .then((d) => { setProfile(d); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) { setTitle(fullTitle); setSubtitle(fullSub); return; }
    let i = 0;
    const t = setInterval(() => {
      setTitle(fullTitle.substring(0, i));
      i++;
      if (i > fullTitle.length) {
        clearInterval(t);
        let j = 0;
        innerInterval.current = setInterval(() => {
          setSubtitle(fullSub.substring(0, j));
          j++;
          if (j > fullSub.length) { clearInterval(innerInterval.current!); innerInterval.current = null; }
        }, 30);
      }
    }, 80);
    return () => { clearInterval(t); if (innerInterval.current) { clearInterval(innerInterval.current); innerInterval.current = null; } };
  }, []);

  const stats = [
    { label: "LOCATION", value: HERO_STATS.location, raw: undefined },
    { label: "BUILDING", value: HERO_STATS.building, raw: undefined },
    { label: "REPOS", value: profile ? `${profile.public_repos}+` : "...", raw: profile?.public_repos },
    { label: "CONNECTIONS", value: profile ? String(profile.followers) : "...", raw: profile?.followers },
  ];

  return (
    <section className="py-6 md:py-8 pb-14 md:pb-20 animate-fade-in">
      {/* Terminal status bar */}
      <div className="flex items-center gap-2 mb-4 md:mb-6 font-mono text-[0.7rem] md:text-[0.75rem] text-secondary stagger-child" style={{ animationDelay: "0.1s" }}>
        <span className="w-2 h-2 rounded-full bg-fluo inline-block" style={{ animation: "pulse 2s infinite" }} />
        <span className="opacity-50">SYS.STATUS:</span>
        <span className="fluo-text animate-text-glow">ONLINE</span>
        <span className="opacity-30 mx-1">|</span>
        <span className="opacity-50">v{__APP_VERSION__}</span>
        <span className="opacity-30 mx-1">|</span>
        <span className="opacity-50">UPTIME: {Math.floor((Date.now() % 86400000) / 3600000)}h</span>
      </div>

      <div className="max-w-[800px]">
        {/* Title with scanning line */}
        <div className="relative">
          <h1 className="text-[clamp(2rem,7vw,4.2rem)] leading-[1.05] mb-4 md:mb-6 text-primary tracking-tight font-bold brand-font whitespace-pre-line animate-flicker">
            {title}
            <span className="text-fluo" style={{ animation: "blink 1s step-end infinite" }}>_</span>
          </h1>
          <div className="scan-line" style={{ animationDuration: "4s" }} />
        </div>

        <p className="font-mono text-[clamp(0.8rem,2.2vw,0.95rem)] text-secondary max-w-[600px] leading-relaxed mb-8 md:mb-10 min-h-[3rem] whitespace-pre-line stagger-child" style={{ animationDelay: "0.4s" }}>
          {subtitle}
        </p>

        <div className="stagger-child" style={{ animationDelay: "0.6s" }}>
          <a href={LINKTREE} target="_blank" rel="noreferrer" className="btn-primary">
            ESTABLISH CONNECTION →
          </a>
        </div>
      </div>

      {/* Stats with count-up */}
      {loading ? (
        <div className="spinner" />
      ) : profile ? (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mt-10 md:mt-14">
          {stats.map((s, i) => (
            <div key={s.label} className="bento-box p-3 md:p-4 stagger-child hover-scale" style={{ animationDelay: `${0.7 + i * 0.1}s` }}>
              <span className="text-[0.6rem] md:text-[0.65rem] text-secondary uppercase tracking-[0.15em] font-mono block mb-1">
                {s.label}
              </span>
              <span className="font-semibold text-[0.95rem] md:text-[1.1rem] text-primary brand-font leading-tight block">
                {s.raw !== undefined ? <CountUp target={s.raw} /> : s.value}
              </span>
            </div>
          ))}
        </div>
      ) : null}

      <GithubActivity />
    </section>
  );
}
