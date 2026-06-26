import { Link } from "@tanstack/react-router";
import { site } from "@/content/site";

export function Footer() {
  return (
    <footer className="bg-royal text-vanilla">
      <div className="overflow-hidden border-y border-vanilla/10 py-4">
        <div className="marquee-track flex whitespace-nowrap font-serif italic text-3xl md:text-5xl">
          {Array.from({ length: 4 }).map((_, i) => (
            <span key={i} className="px-8 opacity-90">
              O Arquivo <span className="text-canary">·</span> Jornalismo Independente{" "}
              <span className="text-canary">·</span> Eleições 2026{" "}
              <span className="text-canary">·</span>
            </span>
          ))}
        </div>
      </div>
      <div className="max-w-screen-2xl mx-auto px-5 md:px-10 py-16 grid gap-12 md:grid-cols-12">
        <div className="md:col-span-8">
          <div className="font-serif text-4xl md:text-5xl font-black uppercase tracking-tighter">
            {site.name}
          </div>
          <p className="mt-4 text-vanilla/70 max-w-sm leading-relaxed">{site.description}</p>
        </div>
        <div className="md:col-span-4">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-canary mb-4">Navegar</p>
          <ul className="space-y-2 text-sm">
            <li><Link to="/quiz" className="hover:text-canary transition-colors">Quiz</Link></li>
            <li><Link to="/sobre" className="hover:text-canary transition-colors">Sobre o projeto</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-vanilla/10 px-5 md:px-10 py-6 text-[10px] uppercase tracking-[0.2em] text-vanilla/50 flex flex-col md:flex-row justify-between gap-2 max-w-screen-2xl mx-auto">
        <span>© {new Date().getFullYear()} {site.name}. Todos os direitos reservados.</span>
      </div>
    </footer>
  );
}