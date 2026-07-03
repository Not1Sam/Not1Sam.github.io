import { useEffect } from "react";
import { Link } from "react-router-dom";

export function NotFound() {
  useEffect(() => {
    console.warn("[404]", JSON.stringify({
      path: window.location.pathname,
      referrer: document.referrer,
      timestamp: new Date().toISOString(),
    }));
  }, []);

  return (
    <div className="flex justify-center items-center min-h-[50vh] md:min-h-[60vh] animate-fade-in">
      <div className="bento-box text-center py-10 md:py-14 px-6 md:px-10 relative overflow-hidden animate-scale-in">
        {/* Scanning line */}
        <div className="scan-line" />

        {/* Corner accents */}
        <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-fluo/50" />
        <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-fluo/50" />
        <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-fluo/50" />
        <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-fluo/50" />

        {/* Error code label */}
        <div className="font-mono text-fluo text-[0.7rem] mb-4 tracking-widest animate-text-glow animate-flicker-in">
          ▸ ERROR CODE
        </div>

        {/* Glitch 404 */}
        <h1
          className="text-[clamp(4rem,14vw,7rem)] font-bold brand-font leading-none mb-2 animate-glitch"
          style={{ color: "var(--color-fluo)", textShadow: "0 0 30px var(--color-fluo-glow), 0 0 60px var(--color-fluo-dim)" }}
        >
          404
        </h1>

        {/* Signal lost with typing effect */}
        <h2 className="text-[clamp(1.2rem,3.5vw,1.8rem)] font-bold mb-3 brand-font animate-flicker-in" style={{ animationDelay: "0.3s" }}>
          SIGNAL LOST.
        </h2>

        {/* Description with stagger */}
        <p className="text-secondary mb-6 md:mb-8 text-[0.85rem] max-w-[350px] font-mono stagger-child" style={{ animationDelay: "0.5s" }}>
          Requested node not found in network topology.
        </p>

        {/* Animated return button */}
        <div className="stagger-child" style={{ animationDelay: "0.7s" }}>
          <Link to="/" className="btn-primary animate-border-pulse" style={{ animationDuration: "3s" }}>
            RETURN TO INIT →
          </Link>
        </div>

        {/* Decorative data stream */}
        <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1 opacity-20">
          {[...Array(20)].map((_, i) => (
            <span
              key={i}
              className="w-0.5 bg-fluo stagger-child"
              style={{
                height: `${Math.random() * 12 + 4}px`,
                animationDelay: `${0.8 + i * 0.05}s`,
                opacity: Math.random() * 0.5 + 0.3,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
