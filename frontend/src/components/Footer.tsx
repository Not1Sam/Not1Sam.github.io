import { Link } from "react-router-dom";
import { GITHUB_USERNAME, LINKTREE } from "../lib/constants";

export function Footer() {
  return (
    <footer role="contentinfo" className="animate-fade-in py-10 md:py-14 border-t border-border mt-12 md:mt-16 relative" style={{ animationDelay: "0.4s" }}>
      {/* Top accent line */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-fluo/30 to-transparent" />

      <div className="mb-8 md:mb-10">
        <h2 className="text-[clamp(1.1rem,3vw,1.8rem)] font-bold tracking-tight mb-5 md:mb-6 brand-font text-secondary">
          <span className="fluo-text animate-text-glow">&gt;</span> system.ready()
        </h2>
        <div className="flex flex-col sm:flex-row gap-3">
          <a href={LINKTREE} target="_blank" rel="noreferrer" aria-label="Contact via Linktree" className="btn-primary text-center sm:text-left text-[0.8rem]">
            INITIATE CONTACT →
          </a>
          <a href={`https://github.com/${GITHUB_USERNAME}`} target="_blank" rel="noreferrer" aria-label="GitHub profile" className="btn-outline text-center sm:text-left text-[0.8rem]">
            VIEW SOURCE →
          </a>
        </div>
      </div>

      <div className="border-t border-border pt-5">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
          <div className="flex flex-col gap-0.5">
            <p className="brand-font opacity-40 tracking-[3px] text-[0.7rem] uppercase">
              Houssam Belkasaoui © {new Date().getFullYear()}
            </p>
            <p className="brand-font opacity-30 tracking-[2px] text-[0.65rem]">
              SYS.VERSION {__APP_VERSION__}
            </p>
          </div>
          <div className="flex flex-wrap gap-2 md:gap-3 text-[0.65rem] md:text-[0.7rem] font-mono">
            {[
              { to: "/privacy", label: "PRIVACY" },
              { to: "/terms", label: "TERMS" },
              { to: "/cookies", label: "COOKIES" },
              { to: "/disclaimer", label: "DISCLAIMER" },
            ].map((l, i) => (
              <span key={l.to} className="flex items-center gap-2">
                {i > 0 && <span className="text-border text-[0.5rem]">◆</span>}
                <Link to={l.to} className="text-secondary hover:text-fluo transition-colors">{l.label}</Link>
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
