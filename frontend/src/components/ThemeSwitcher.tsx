import { useEffect, useState } from "react";

const themes = [
  { id: "dark", label: "Dark" },
  { id: "light", label: "Light" },
  { id: "purple", label: "Purple" },
];

export function ThemeSwitcher() {
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    const saved = localStorage.getItem("theme") || "dark";
    setTheme(saved);
  }, []);

  const switchTheme = (id: string) => {
    setTheme(id);
    document.documentElement.setAttribute("data-theme", id);
    localStorage.setItem("theme", id);
  };

  const idx = themes.findIndex((t) => t.id === theme);

  return (
    <div className="relative flex bg-border rounded-full p-1 w-[210px]">
      <div
        className="absolute top-1 left-1 h-[calc(100%-8px)] w-[calc((100%-8px)/3)] bg-primary rounded-full transition-transform duration-300 z-10"
        style={{
          transform: `translateX(${idx >= 0 ? idx * 100 : 0}%)`,
          transitionTimingFunction: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        }}
      />
      {themes.map((t) => (
        <button
          key={t.id}
          onClick={() => switchTheme(t.id)}
          className={`relative z-20 flex-1 bg-transparent border-none font-[inherit] text-[0.75rem] font-semibold uppercase tracking-widest py-1.5 cursor-pointer transition-colors duration-300 min-w-[66px] ${
            theme === t.id ? "text-bg" : "text-secondary hover:text-primary"
          }`}
        >
          {t.label}
        </button>
      ))}
    </div>
  );
}
