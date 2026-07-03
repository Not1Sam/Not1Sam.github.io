import { useEffect, useState } from "react";
import { githubFetch } from "../lib/github";
import { GITHUB_USERNAME, HEATMAP_COLORS } from "../lib/constants";
import type { GitHubProfile, GitHubSearchCount, GitHubEvent } from "../lib/types";

function AnimatedNumber({ value, delay = 0 }: { value: string; delay?: number }) {
  const [revealed, setRevealed] = useState(false);
  useEffect(() => { const t = setTimeout(() => setRevealed(true), delay); return () => clearTimeout(t); }, [delay]);
  return (
    <span className={`transition-all duration-500 ${revealed ? "opacity-100 translate-y-0 blur-0" : "opacity-0 translate-y-2 blur-sm"}`}>
      {value}
    </span>
  );
}

export function GithubActivity() {
  const [profile, setProfile] = useState<GitHubProfile | null>(null);
  const [commits, setCommits] = useState<string>("...");
  const [prs, setPrs] = useState<string>("...");
  const [heat, setHeat] = useState<number[]>(new Array(60).fill(0));
  const [error, setError] = useState<string | null>(null);
  const [cellsVisible, setCellsVisible] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [profileData, commitsData, prsData, eventsData] = await Promise.allSettled([
          githubFetch<GitHubProfile>(`https://api.github.com/users/${GITHUB_USERNAME}`),
          githubFetch<GitHubSearchCount>(`https://api.github.com/search/commits?q=author:${GITHUB_USERNAME}`, { headers: { Accept: "application/vnd.github.cloak-preview" } }),
          githubFetch<GitHubSearchCount>(`https://api.github.com/search/issues?q=author:${GITHUB_USERNAME}+type:pr`),
          githubFetch<GitHubEvent[]>(`https://api.github.com/users/${GITHUB_USERNAME}/events/public?per_page=100`),
        ]);

        if (profileData.status === "fulfilled") setProfile(profileData.value);
        if (commitsData.status === "fulfilled") setCommits(String(commitsData.value.total_count || 0));
        if (prsData.status === "fulfilled") setPrs(String(prsData.value.total_count || 0));

        if (eventsData.status === "fulfilled" && Array.isArray(eventsData.value)) {
          const h = new Array(60).fill(0);
          const today = new Date(); today.setHours(0, 0, 0, 0);
          eventsData.value.forEach((e) => {
            const d = new Date(e.created_at); d.setHours(0, 0, 0, 0);
            const diff = Math.floor(Math.abs(today.getTime() - d.getTime()) / 86400000);
            if (diff < 60) h[59 - diff] += 1;
          });
          const max = Math.max(...h, 1);
          setHeat(h.map((v) => (v === 0 ? 0 : Math.ceil((v / max) * 4))));
        }

        const rejected = [profileData, commitsData, prsData, eventsData].filter((r) => r.status === "rejected");
        if (rejected.length > 0) {
          setError((rejected[0] as PromiseRejectedResult).reason?.message || "Failed to load some GitHub data");
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load GitHub data");
      }
    };
    fetchData();
  }, []);

  // Sequential heatmap cell reveal
  useEffect(() => {
    if (heat.every((v) => v === 0)) return;
    let current = 0;
    const interval = setInterval(() => {
      current++;
      setCellsVisible(current);
      if (current >= 60) clearInterval(interval);
    }, 30);
    return () => clearInterval(interval);
  }, [heat]);

  if (error) {
    return (
      <div className="mt-14 md:mt-20 w-full animate-fade-in" style={{ animationDelay: "0.3s" }}>
        <div className="mb-6 md:mb-8">
          <span className="text-[0.7rem] md:text-[0.75rem] font-semibold tracking-[0.15em] uppercase mb-2 block font-mono text-secondary">
            <span className="fluo-text mr-1">▸</span> ACTIVITY MONITOR
          </span>
          <h2 className="text-[clamp(2rem,6vw,3.5rem)] tracking-tight brand-font">GitHub.</h2>
        </div>
        <div className="bento-box p-6 md:p-10 text-center">
          <p className="text-secondary text-[0.85rem] font-mono">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-14 md:mt-20 w-full animate-fade-in" style={{ animationDelay: "0.3s" }}>
      <div className="mb-6 md:mb-8">
        <span className="text-[0.7rem] md:text-[0.75rem] font-semibold tracking-[0.15em] uppercase mb-2 block font-mono text-secondary">
          <span className="fluo-text mr-1">▸</span> ACTIVITY MONITOR
        </span>
        <h2 className="text-[clamp(2rem,6vw,3.5rem)] tracking-tight brand-font">GitHub.</h2>
      </div>

      <div className="bento-box p-4 md:p-8 lg:p-10 mb-4 md:mb-6 relative overflow-hidden">
        {/* Scanning line */}
        <div className="scan-line" style={{ animationDuration: "5s" }} />

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-6 md:mb-10 relative z-10">
          <div className="flex items-center gap-2 text-[0.7rem] md:text-[0.75rem] font-semibold tracking-[0.1em] font-mono fluo-text">
            <span className="w-2 h-2 bg-fluo rounded-full inline-block shrink-0" style={{ animation: "pulse 2s infinite" }} />
            LIVE FEED
          </div>
          <span className="text-[0.65rem] md:text-[0.7rem] text-secondary tracking-[0.1em] font-mono">60-DAY WINDOW</span>
        </div>

        {/* Heatmap with sequential reveal */}
        <div className="overflow-x-auto pb-4 -mx-1 px-1 mb-6 md:mb-10 relative z-10">
          <div className="grid grid-rows-2 grid-flow-col gap-[0.4rem] md:gap-[0.5rem] justify-center min-w-[min-content]">
            {heat.map((lvl, i) => (
              <div
                key={i}
                className="w-3.5 h-3.5 md:w-4 md:h-4 transition-all duration-300 hover:scale-125"
                style={{
                  backgroundColor: i < cellsVisible ? HEATMAP_COLORS[lvl as keyof typeof HEATMAP_COLORS] : "transparent",
                  boxShadow: lvl === 4 && i < cellsVisible ? "0 0 6px rgba(57, 255, 20, 0.4)" : undefined,
                  borderRadius: "1px",
                  transition: "background-color 0.2s, box-shadow 0.2s",
                }}
              />
            ))}
          </div>
        </div>

        <div className="flex justify-between items-center text-[0.6rem] md:text-[0.65rem] text-secondary tracking-widest font-mono relative z-10">
          <span>MINIMAL</span>
          <div className="flex gap-1.5">
            {[1, 2, 3, 4].map((l) => (
              <div key={l} className="w-2.5 h-2.5 md:w-3 md:h-3" style={{ backgroundColor: HEATMAP_COLORS[l as keyof typeof HEATMAP_COLORS], borderRadius: "1px" }} />
            ))}
          </div>
          <span>MAXIMUM</span>
        </div>
      </div>

      {/* Stats with animated numbers */}
      <div className="grid grid-cols-2 gap-3 md:gap-4">
        {[
          { label: "COMMITS", value: commits },
          { label: "PULL REQUESTS", value: prs },
          { label: "REPOSITORIES", value: profile ? String(profile.public_repos) : "..." },
          { label: "FOLLOWERS", value: profile ? String(profile.followers) : "..." },
        ].map((s, i) => (
          <div key={s.label} className="bento-box flex flex-col items-center justify-center text-center p-5 md:p-8 stagger-child hover-scale" style={{ animationDelay: `${0.1 + i * 0.1}s` }}>
            <span className="text-[0.6rem] md:text-[0.7rem] text-secondary tracking-[0.12em] mb-2 md:mb-3 uppercase font-mono">{s.label}</span>
            <span className="text-[clamp(1.8rem,5vw,3rem)] text-primary leading-none brand-font">
              <AnimatedNumber value={s.value} delay={400 + i * 200} />
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
