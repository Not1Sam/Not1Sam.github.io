import { Link, useLocation } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { ThemeSwitcher } from "./ThemeSwitcher";

const links = [
  { href: "/", label: "init" },
  { href: "/lab", label: "lab" },
  { href: "/stack", label: "stack" },
  { href: "/projects", label: "projects" },
  { href: "/blog", label: "logs" },
  { href: "/contact", label: "contact" },
];

export function Header() {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => { setOpen(false); }, [location.pathname]);

  useEffect(() => {
    if (!open) return;
    const handleClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:bg-fluo focus:text-black focus:px-4 focus:py-2">
        Skip to content
      </a>
      <nav aria-label="Main navigation" className="flex justify-between items-center py-5 md:py-6 mb-10 md:mb-14 border-b border-border relative animate-fade-in">
        <div className="flex justify-between items-center w-full md:w-auto">
          <Link to="/" className="text-[1.1rem] md:text-[1.3rem] font-bold tracking-tight font-mono text-fluo hover:animate-text-glow transition-all" onClick={() => setOpen(false)}>
            <span className="opacity-50">&lt;</span>not1sam<span className="opacity-50">/&gt;</span>
          </Link>
          <button
            className="md:hidden bg-transparent border border-border text-fluo text-[0.85rem] cursor-pointer tracking-widest px-3 py-1.5 font-mono active:scale-95 transition-all hover:border-fluo hover:shadow-[0_0_10px_rgba(57,255,20,0.2)]"
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
          >
            {open ? "[x]" : "[=]"}
          </button>
        </div>

        <div className="hidden md:flex gap-4 lg:gap-5 items-center" role="menubar">
          <ThemeSwitcher />
          <span className="text-border mx-1">|</span>
          {links.map((l) => (
            <Link
              key={l.href}
              to={l.href}
              role="menuitem"
              className={`font-mono text-[0.7rem] lg:text-[0.75rem] font-medium tracking-[0.12em] uppercase px-2.5 py-1.5 transition-all duration-200 whitespace-nowrap ${
                location.pathname === l.href
                  ? "text-fluo bg-fluo/10 border border-fluo/30"
                  : "text-secondary hover:text-fluo hover:bg-fluo/5"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </div>

        {open && (
          <div ref={menuRef} className="fixed inset-0 top-[56px] z-40 bg-bg/98 backdrop-blur-md md:hidden animate-fade-in">
            <div className="flex flex-col items-start gap-0 p-6 pt-6 h-full overflow-y-auto">
              <ThemeSwitcher />
              <div className="w-full border-t border-border my-4" />
              {links.map((l, i) => (
                <Link key={l.href} to={l.href} role="menuitem" className="w-full" style={{ animationDelay: `${i * 0.04}s` }}>
                  <span className={`block font-mono text-[0.85rem] font-medium tracking-[0.12em] uppercase px-4 py-3 transition-all duration-200 animate-fade-in border-l-2 ${
                    location.pathname === l.href
                      ? "text-fluo bg-fluo/10 border-fluo"
                      : "text-secondary hover:text-fluo hover:bg-fluo/5 border-transparent hover:border-fluo/30"
                  }`}>
                    <span className="opacity-40 mr-2">~/</span>{l.label}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>
    </>
  );
}
