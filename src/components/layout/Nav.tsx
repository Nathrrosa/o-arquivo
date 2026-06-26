import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { site } from "@/content/site";

const links = [
  { to: "/", label: "Início" },
  { to: "/quiz", label: "Quiz" },
  { to: "/sobre", label: "Sobre" },
] as const;

export function Nav() {
  const [open, setOpen] = useState(false);
  return (
    <nav className="sticky top-0 z-50 bg-vanilla/85 backdrop-blur-md border-b border-royal/10">
      <div className="max-w-screen-2xl mx-auto px-5 md:px-10 py-4 flex justify-between items-center">
        <Link
          to="/"
          className="font-serif text-2xl md:text-3xl font-black tracking-tighter text-royal uppercase glitch-hover"
        >
          {site.name}
        </Link>
        <div className="hidden md:flex gap-7 text-[11px] font-bold uppercase tracking-[0.18em] text-ink">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              activeOptions={{ exact: l.to === "/" }}
              activeProps={{ className: "text-royal" }}
              className="hover:text-royal transition-colors"
            >
              {l.label}
            </Link>
          ))}
        </div>
        <div className="hidden md:flex items-center gap-3">
          <span className="relative px-3 py-1.5 bg-royal text-vanilla text-[10px] font-bold rounded-full uppercase tracking-widest">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-canary mr-2 align-middle animate-pulse" />
            Eleições 2026
          </span>
        </div>
        <button
          aria-label="Abrir menu"
          onClick={() => setOpen((o) => !o)}
          className="md:hidden flex flex-col gap-1.5 p-2"
        >
          <span className={`block w-6 h-0.5 bg-royal transition-transform ${open ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`block w-6 h-0.5 bg-royal transition-opacity ${open ? "opacity-0" : ""}`} />
          <span className={`block w-6 h-0.5 bg-royal transition-transform ${open ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </div>
      {open && (
        <div className="md:hidden border-t border-royal/10 bg-vanilla px-5 py-6 flex flex-col gap-5 text-sm font-bold uppercase tracking-[0.18em]">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              onClick={() => setOpen(false)}
              activeOptions={{ exact: l.to === "/" }}
              activeProps={{ className: "text-royal" }}
              className="hover:text-royal"
            >
              {l.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}