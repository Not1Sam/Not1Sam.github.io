import { useState, useEffect } from "react";

const BOOT_LINES = [
  { text: "INITIALIZING SYSTEM...", delay: 0 },
  { text: "LOADING USER PROFILE", delay: 200 },
  { text: "CONNECTING TO GITHUB API", delay: 400 },
  { text: "FETCHING COMMIT DATA", delay: 600 },
  { text: "PARSING STATISTICS", delay: 800 },
  { text: "SYSTEM READY", delay: 1000 },
];

export function TerminalBoot() {
  const [lines, setLines] = useState<string[]>([]);
  const [cursor, setCursor] = useState(true);

  useEffect(() => {
    const timers = BOOT_LINES.map((line) =>
      setTimeout(() => setLines((p) => [...p, line.text]), line.delay)
    );
    const blink = setInterval(() => setCursor((c) => !c), 530);
    return () => {
      timers.forEach(clearTimeout);
      clearInterval(blink);
    };
  }, []);

  return (
    <div className="loading-terminal">
      {lines.map((line, i) => (
        <div key={i} className="loading-terminal-line">
          <span className="text-[var(--color-muted)]">{">"} </span>
          <span className={i === lines.length - 1 ? "text-[var(--color-fluo)]" : ""}>
            {line}
          </span>
        </div>
      ))}
      <span className={`loading-terminal-cursor ${cursor ? "opacity-100" : "opacity-0"}`}>
        █
      </span>
    </div>
  );
}

export function RadarScan() {
  return (
    <div className="loading-radar">
      <div className="loading-radar-sweep" />
      <div className="loading-radar-ring loading-radar-ring-1" />
      <div className="loading-radar-ring loading-radar-ring-2" />
      <div className="loading-radar-ring loading-radar-ring-3" />
      <div className="loading-radar-dot loading-radar-dot-1" />
      <div className="loading-radar-dot loading-radar-dot-2" />
      <div className="loading-radar-dot loading-radar-dot-3" />
    </div>
  );
}

export function CardSkeleton({ count = 3 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="bento-box loading-skeleton-card">
          <div className="loading-skeleton-line loading-skeleton-title" />
          <div className="loading-skeleton-line loading-skeleton-desc" />
          <div className="loading-skeleton-line loading-skeleton-desc-short" />
          <div className="flex gap-2 mt-auto pt-4">
            <div className="loading-skeleton-pill" />
            <div className="loading-skeleton-pill" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function TerminalLines({ count = 4 }: { count?: number }) {
  const [visible, setVisible] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setVisible((v) => (v < count ? v + 1 : v)), 150);
    return () => clearInterval(t);
  }, [count]);

  return (
    <div className="loading-terminal">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className={`loading-terminal-line ${i < visible ? "loading-skeleton-fade-in" : "opacity-0"}`}
        >
          <span className="text-[var(--color-muted)]">{">"} </span>
          <div className="loading-skeleton-line loading-skeleton-blog-line" />
        </div>
      ))}
    </div>
  );
}

export function DocSkeleton() {
  return (
    <div className="loading-document">
      <div className="loading-skeleton-line loading-skeleton-doc-title" />
      <div className="loading-skeleton-line loading-skeleton-doc-subtitle" />
      <div className="loading-skeleton-divider" />
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="loading-skeleton-line loading-skeleton-doc-line" />
      ))}
      <div className="loading-skeleton-divider" />
      <div className="loading-skeleton-line loading-skeleton-doc-title" />
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="loading-skeleton-line loading-skeleton-doc-line" />
      ))}
    </div>
  );
}

export function ImageSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="bento-box loading-skeleton-image-card">
          <div className="loading-skeleton-image" />
          <div className="loading-skeleton-line loading-skeleton-title" />
          <div className="loading-skeleton-line loading-skeleton-desc-short" />
        </div>
      ))}
    </div>
  );
}

export function MatrixRain() {
  const chars = "01アイウエオカキクケコ";
  const [columns, setColumns] = useState<{ char: string; delay: number; duration: number }[]>([]);

  useEffect(() => {
    setColumns(
      Array.from({ length: 20 }).map(() => ({
        char: chars[Math.floor(Math.random() * chars.length)],
        delay: Math.random() * 2,
        duration: 1.5 + Math.random() * 2,
      }))
    );
  }, []);

  return (
    <div className="loading-matrix">
      {columns.map((col, i) => (
        <span
          key={i}
          className="loading-matrix-char"
          style={{ animationDelay: `${col.delay}s`, animationDuration: `${col.duration}s` }}
        >
          {col.char}
        </span>
      ))}
    </div>
  );
}

export function PulseRing() {
  return (
    <div className="loading-pulse-ring-container">
      <div className="loading-pulse-ring loading-pulse-ring-1" />
      <div className="loading-pulse-ring loading-pulse-ring-2" />
      <div className="loading-pulse-ring loading-pulse-ring-3" />
      <span className="loading-pulse-text">LOADING</span>
    </div>
  );
}
