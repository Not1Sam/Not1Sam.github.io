import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { ThemeSwitcher } from "./ThemeSwitcher";

const links = [
  { href: "/", label: "[ init ]" },
  { href: "/stack", label: "[ stack ]" },
  { href: "/projects", label: "[ projects ]" },
  { href: "/blog", label: "[ logs ]" },
  { href: "/contact", label: "[ contact ]" },
];

export function Header() {
  const location = useLocation();
  const [open, setOpen] = useState(false);

  return (
    <nav className="flex justify-between items-center py-8 mb-16 border-b border-border relative animate-fade-in">
      <div className="flex justify-between items-center w-full md:w-auto">
        <Link to="/" className="text-[1.5rem] font-bold tracking-tight" onClick={() => setOpen(false)}>
          [ not1sam ]
        </Link>
        <button
          className="md:hidden bg-transparent border-none text-fluo text-[1rem] cursor-pointer tracking-widest p-2 font-mono"
          onClick={() => setOpen(!open)}
        >
          {open ? "[ close ]" : "[ menu ]"}
        </button>
      </div>

      <div className={`md:flex gap-6 items-center ${open ? "flex flex-col items-start gap-5 pt-6 border-t border-border mt-4 w-full" : "hidden"}`}>
        <ThemeSwitcher />
        {links.map((l) => (
          <Link
            key={l.href}
            to={l.href}
            onClick={() => setOpen(false)}
            className={`font-mono text-[0.85rem] font-medium lowercase tracking-widest px-3 py-1.5 transition-all duration-200 whitespace-nowrap ${
              location.pathname === l.href
                ? "bg-fluo text-black font-semibold"
                : "text-secondary hover:text-primary"
            }`}
          >
            {l.label}
          </Link>
        ))}
        <Link
          to="/admin"
          onClick={() => setOpen(false)}
          className={`font-mono text-[0.85rem] ml-4 text-secondary hover:text-primary ${
            location.pathname === "/admin" ? "text-fluo" : ""
          }`}
        >
          ⚙️
        </Link>
      </div>
    </nav>
  );
}
