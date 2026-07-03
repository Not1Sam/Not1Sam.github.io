import { useEffect, useState } from "react";

const services = [
  { name: "Arch Linux", desc: "Daily Driver OS", icon: "▸" },
  { name: "Unraid", desc: "Core Server OS & Storage", icon: "▸" },
  { name: "Plex", desc: "Media Streaming", icon: "▸" },
  { name: "Bitwarden", desc: "Password Management", icon: "▸" },
  { name: "WireGuard VPN", desc: "Secure Remote Access", icon: "▸" },
  { name: "Dev Containers", desc: "Isolated Development", icon: "▸" },
];

export function Homelab() {
  const [visible, setVisible] = useState(false);
  const [scanIndex, setScanIndex] = useState(-1);

  useEffect(() => { const t = setTimeout(() => setVisible(true), 200); return () => clearTimeout(t); }, []);

  // Sequential scan effect on services
  useEffect(() => {
    if (!visible) return;
    let i = 0;
    const interval = setInterval(() => {
      setScanIndex(i);
      i++;
      if (i >= services.length) {
        clearInterval(interval);
        setTimeout(() => setScanIndex(-1), 600);
      }
    }, 120);
    return () => clearInterval(interval);
  }, [visible]);

  return (
    <section className="py-10 md:py-14 border-t border-border">
      <div className="mb-8 md:mb-10 animate-fade-in">
        <span className="text-[0.7rem] md:text-[0.75rem] font-semibold tracking-[0.15em] uppercase mb-2 block font-mono text-secondary">
          <span className="fluo-text mr-1">▸</span> INFRASTRUCTURE
        </span>
        <h2 className="text-[clamp(1.6rem,5vw,2.5rem)] tracking-tight brand-font">Self-Hosted Homelab.</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[3fr_2fr] gap-3 md:gap-5">
        <div className="bento-box stagger-child" style={{ animationDelay: "0.1s" }}>
          <h3 className="text-[clamp(1.1rem,3vw,1.5rem)] mb-4 md:mb-5 text-primary brand-font">Personal Infrastructure</h3>
          <div className="space-y-3 text-secondary text-[0.9rem] md:text-[0.95rem] leading-relaxed">
            <p>
              Dedicated self-hosted server powered by <strong className="text-fluo font-mono text-[0.85rem]">Unraid</strong>. Backbone for my digital life and development workflow.
              <strong className="text-fluo font-mono text-[0.85rem]"> Dev Containers</strong> for isolated, reproducible environments.
            </p>
            <p>
              Securely tunneled through <strong className="text-fluo font-mono text-[0.85rem]">WireGuard VPN</strong> — access from anywhere.
            </p>
          </div>
        </div>

        <div className="bento-box stagger-child" style={{ animationDelay: "0.2s" }}>
          <h3 className="text-[clamp(1.1rem,3vw,1.5rem)] mb-4 md:mb-5 text-primary brand-font flex items-center gap-2">
            Active Services
            <span className="text-[0.6rem] font-mono text-fluo/50 font-normal">
              {visible ? `[${Math.min(scanIndex + 1, services.length)}/${services.length}]` : ""}
            </span>
          </h3>
          <div className="flex flex-col gap-0">
            {services.map((s, i) => (
              <div
                key={i}
                className={`flex items-center gap-3 py-2.5 border-b border-border/50 last:border-b-0 transition-all duration-300 ${
                  visible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-3"
                } ${scanIndex === i ? "bg-fluo/5 border-l-2 border-l-fluo pl-2 -ml-2" : ""}`}
                style={{ transitionDelay: `${300 + i * 60}ms` }}
              >
                <span className={`text-[0.7rem] font-mono shrink-0 transition-colors duration-200 ${scanIndex === i ? "text-fluo" : "text-fluo/40"}`}>
                  {s.icon}
                </span>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-0.5 flex-1 min-w-0">
                  <span className={`font-semibold text-[0.85rem] transition-colors duration-200 ${scanIndex === i ? "text-fluo" : "text-primary"}`}>
                    {s.name}
                  </span>
                  <span className="text-[0.7rem] text-secondary uppercase tracking-[0.1em] font-mono">{s.desc}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
