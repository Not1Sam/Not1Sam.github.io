import { useEffect, useState } from "react";

export function GithubActivity() {
  const [profile, setProfile] = useState<any>(null);
  const [commits, setCommits] = useState<string>("...");
  const [prs, setPrs] = useState<string>("...");
  const [heat, setHeat] = useState<number[]>(new Array(60).fill(0));

  useEffect(() => {
    fetch("https://api.github.com/users/Not1Sam")
      .then((r) => r.json())
      .then(setProfile)
      .catch(console.error);

    fetch("https://api.github.com/search/commits?q=author:Not1Sam", {
      headers: { Accept: "application/vnd.github.cloak-preview" },
    })
      .then((r) => r.json())
      .then((d) => setCommits(String(d.total_count || 0)))
      .catch(console.error);

    fetch("https://api.github.com/search/issues?q=author:Not1Sam+type:pr")
      .then((r) => r.json())
      .then((d) => setPrs(String(d.total_count || 0)))
      .catch(console.error);

    fetch("https://api.github.com/users/Not1Sam/events/public?per_page=100")
      .then((r) => r.json())
      .then((data) => {
        if (!Array.isArray(data)) return;
        const h = new Array(60).fill(0);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        data.forEach((e: any) => {
          const d = new Date(e.created_at);
          d.setHours(0, 0, 0, 0);
          const diff = Math.floor(Math.abs(today.getTime() - d.getTime()) / 86400000);
          if (diff < 60) h[59 - diff] += 1;
        });
        const max = Math.max(...h, 1);
        setHeat(h.map((v) => (v === 0 ? 0 : Math.ceil((v / max) * 4))));
      })
      .catch(console.error);
  }, []);

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
              className={`w-5 h-5 rounded transition-all duration-300 ${
                i === 59 ? "relative" : ""
              } ${
                lvl === 0
                  ? "bg-[#1a1a1a]"
                  : lvl === 1
                  ? "bg-[#2b3314]"
                  : lvl === 2
                  ? "bg-[#556b26]"
                  : lvl === 3
                  ? "bg-[#8fa814]"
                  : "bg-fluo shadow-[0_0_8px_rgba(57,255,20,0.3)]"
              }`}
            />
          ))}
        </div>

        <div className="flex justify-between items-center text-[0.75rem] text-secondary tracking-widest">
          <span>MORE INACTIVE</span>
          <div className="flex gap-2">
            {[1, 2, 3, 4].map((l) => (
              <div
                key={l}
                className={`w-3.5 h-3.5 rounded-sm ${
                  l === 1
                    ? "bg-[#2b3314]"
                    : l === 2
                    ? "bg-[#556b26]"
                    : l === 3
                    ? "bg-[#8fa814]"
                    : "bg-fluo"
                }`}
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
