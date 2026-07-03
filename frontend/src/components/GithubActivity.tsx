import { useEffect, useState } from "react";
import { githubFetch } from "../lib/github";
import { GITHUB_USERNAME, HEATMAP_COLORS } from "../lib/constants";
import type { GitHubProfile, GitHubSearchCount, GitHubEvent } from "../lib/types";

export function GithubActivity() {
  const [profile, setProfile] = useState<GitHubProfile | null>(null);
  const [commits, setCommits] = useState<string>("...");
  const [prs, setPrs] = useState<string>("...");
  const [heat, setHeat] = useState<number[]>(new Array(60).fill(0));
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [profileData, commitsData, prsData, eventsData] = await Promise.allSettled([
          githubFetch<GitHubProfile>(`https://api.github.com/users/${GITHUB_USERNAME}`),
          githubFetch<GitHubSearchCount>(`https://api.github.com/search/commits?q=author:${GITHUB_USERNAME}`, {
            headers: { Accept: "application/vnd.github.cloak-preview" },
          }),
          githubFetch<GitHubSearchCount>(`https://api.github.com/search/issues?q=author:${GITHUB_USERNAME}+type:pr`),
          githubFetch<GitHubEvent[]>(`https://api.github.com/users/${GITHUB_USERNAME}/events/public?per_page=100`),
        ]);

        if (profileData.status === "fulfilled") setProfile(profileData.value);
        if (commitsData.status === "fulfilled") setCommits(String(commitsData.value.total_count || 0));
        if (prsData.status === "fulfilled") setPrs(String(prsData.value.total_count || 0));

        if (eventsData.status === "fulfilled" && Array.isArray(eventsData.value)) {
          const h = new Array(60).fill(0);
          const today = new Date();
          today.setHours(0, 0, 0, 0);
          eventsData.value.forEach((e) => {
            const d = new Date(e.created_at);
            d.setHours(0, 0, 0, 0);
            const diff = Math.floor(Math.abs(today.getTime() - d.getTime()) / 86400000);
            if (diff < 60) h[59 - diff] += 1;
          });
          const max = Math.max(...h, 1);
          setHeat(h.map((v) => (v === 0 ? 0 : Math.ceil((v / max) * 4))));
        }

        const rejected = [profileData, commitsData, prsData, eventsData].filter(
          (r) => r.status === "rejected"
        );
        if (rejected.length > 0) {
          const firstError = (rejected[0] as PromiseRejectedResult).reason;
          setError(firstError?.message || "Failed to load some GitHub data");
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load GitHub data");
      }
    };

    fetchData();
  }, []);

  if (error) {
    return (
      <div className="mt-20 w-full animate-fade-in" style={{ animationDelay: "0.3s" }}>
        <div className="mb-8">
          <span className="text-[0.85rem] font-semibold tracking-[0.15em] uppercase mb-2 block fluo-text">
            ACTIVITY MONITOR
          </span>
          <h2 className="text-[clamp(3rem,6vw,4rem)] tracking-tight brand-font">GitHub.</h2>
        </div>
        <div className="bento-box bg-bg/40 p-10 text-center">
          <p className="text-secondary text-[0.95rem]">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-20 w-full animate-fade-in" style={{ animationDelay: "0.3s" }}>
      <div className="mb-8">
        <span className="text-[0.85rem] font-semibold tracking-[0.15em] uppercase mb-2 block fluo-text">
          ACTIVITY MONITOR
        </span>
        <h2 className="text-[clamp(3rem,6vw,4rem)] tracking-tight brand-font">GitHub.</h2>
      </div>

      <div className="bento-box bg-bg/40 p-10 mb-6">
        <div className="flex justify-between items-center mb-12">
          <div className="flex items-center gap-3 text-[0.8rem] font-semibold tracking-[0.1em] fluo-text">
            <span
              className="w-[10px] h-[10px] bg-fluo rounded-full inline-block"
              style={{ animation: "pulse 2s infinite" }}
            />
            REAL-TIME ACTIVITY
          </div>
          <span className="text-[0.8rem] text-secondary tracking-[0.1em]">LAST 60 DAYS</span>
        </div>

        <div className="grid grid-rows-2 grid-flow-col gap-[0.6rem] justify-center mb-12 overflow-x-auto pb-4">
          {heat.map((lvl, i) => (
            <div
              key={i}
              className="w-5 h-5 rounded transition-all duration-300"
              style={{
                backgroundColor: HEATMAP_COLORS[lvl as keyof typeof HEATMAP_COLORS],
                boxShadow: lvl === 4 ? "0 0 8px rgba(57, 255, 20, 0.3)" : undefined,
              }}
            />
          ))}
        </div>

        <div className="flex justify-between items-center text-[0.75rem] text-secondary tracking-widest">
          <span>MORE INACTIVE</span>
          <div className="flex gap-2">
            {[1, 2, 3, 4].map((l) => (
              <div
                key={l}
                className="w-3.5 h-3.5 rounded-sm"
                style={{ backgroundColor: HEATMAP_COLORS[l as keyof typeof HEATMAP_COLORS] }}
              />
            ))}
          </div>
          <span>MORE ACTIVE</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6 max-md:grid-cols-1">
        {[
          { label: "TOTAL COMMITS", value: commits },
          { label: "PULL REQUESTS", value: prs },
          { label: "REPOSITORIES", value: profile ? String(profile.public_repos) : "..." },
          { label: "FOLLOWERS", value: profile ? String(profile.followers) : "..." },
        ].map((s) => (
          <div
            key={s.label}
            className="bento-box bg-bg/40 flex flex-col items-center justify-center text-center p-12"
          >
            <span className="text-[0.85rem] text-secondary tracking-[0.1em] mb-4 uppercase">
              {s.label}
            </span>
            <span className="text-[clamp(3rem,5vw,4rem)] text-primary leading-none brand-font">
              {s.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
