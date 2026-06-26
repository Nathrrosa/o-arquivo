import { useEffect, useRef, useState } from "react";
import { Brain, MonitorSmartphone, Sparkles, AlertTriangle } from "lucide-react";

function useInView<T extends HTMLElement>(threshold = 0.25) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    if (!ref.current || inView) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setInView(true);
            obs.disconnect();
          }
        });
      },
      { threshold }
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold, inView]);
  return { ref, inView };
}

function useCountUp(target: number, start: boolean, duration = 1400, delay = 0) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!start) return;
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      setValue(target);
      return;
    }
    const startTime = performance.now() + delay;
    let raf = 0;
    const tick = (now: number) => {
      const elapsed = Math.max(0, now - startTime);
      const t = Math.min(1, elapsed / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(eased * target);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, start, duration, delay]);
  return value;
}

const fmt = (n: number) =>
  n.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

function TitleReveal({ start }: { start: boolean }) {
  const words = ["A", "IA", "explodiu", "como", "ferramenta", "de", "desinformação"];
  return (
    <h3 className="font-serif text-3xl md:text-4xl text-royal leading-tight flex flex-wrap items-center gap-x-3 gap-y-1">
      <span
        className={[
          "inline-flex items-center justify-center w-11 h-11 rounded-full bg-royal text-canary shrink-0",
          "transition-all duration-700",
          start ? "opacity-100 scale-100" : "opacity-0 scale-75",
        ].join(" ")}
        aria-hidden="true"
      >
        <Brain size={22} className="animate-pulse" />
      </span>
      {words.map((w, i) => {
        const highlight = w === "explodiu";
        return (
          <span
            key={i}
            className={[
              "inline-block transition-all duration-500",
              start ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3",
              highlight
                ? "relative px-1 font-bold italic text-royal after:content-[''] after:absolute after:left-0 after:right-0 after:bottom-0 after:h-2 after:bg-canary after:-z-0"
                : "",
            ].join(" ")}
            style={{ transitionDelay: start ? `${120 + i * 90}ms` : "0ms" }}
          >
            <span className="relative z-10">{w}</span>
          </span>
        );
      })}
    </h3>
  );
}

function YearCard({
  year,
  value,
  start,
  delay,
  highlight,
  tooltip,
}: {
  year: number;
  value: number;
  start: boolean;
  delay: number;
  highlight?: boolean;
  tooltip: string;
}) {
  const v = useCountUp(value, start, 1600, delay);
  return (
    <article
      title={tooltip}
      className={[
        "relative group flex-1 rounded-sm border p-5 md:p-6 bg-vanilla",
        "transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_14px_36px_-14px_rgba(30,30,80,0.35)]",
        start ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
        highlight
          ? "border-canary shadow-[0_0_0_2px_var(--canary),0_18px_40px_-18px_rgba(234,179,8,0.55)]"
          : "border-royal/20 shadow-[0_8px_24px_-16px_rgba(30,30,80,0.35)]",
      ].join(" ")}
      style={{ transitionDelay: start ? `${delay}ms` : "0ms" }}
    >
      {highlight && (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-sm opacity-60"
          style={{
            background:
              "radial-gradient(circle at 30% 20%, rgba(234,179,8,0.18), transparent 60%)",
          }}
        />
      )}
      <div className="relative flex items-center gap-3 mb-3">
        <span
          className={[
            "inline-flex items-center justify-center w-10 h-10 rounded-sm transition-transform duration-300 group-hover:rotate-[-4deg]",
            highlight ? "bg-canary text-royal" : "bg-royal text-canary",
          ].join(" ")}
        >
          {highlight ? <Sparkles size={18} /> : <MonitorSmartphone size={18} />}
        </span>
        <div className="flex flex-col leading-none">
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-royal/70">
            Ano
          </span>
          <span className="font-serif text-2xl text-royal">{year}</span>
        </div>
        {!highlight && (
          <span className="ml-auto text-[10px] font-bold uppercase tracking-[0.2em] text-royal/60 border border-royal/30 px-2 py-1 rounded-sm">
            FAKE
          </span>
        )}
      </div>
      <div className="relative">
        <div
          className={[
            "font-serif font-bold tabular-nums leading-none",
            highlight ? "text-5xl md:text-6xl text-royal" : "text-4xl md:text-5xl text-royal",
          ].join(" ")}
        >
          {fmt(v)}
          <span className="text-2xl md:text-3xl align-top ml-1">%</span>
        </div>
        <p
          className={[
            "mt-3 text-sm md:text-base text-ink/85 leading-relaxed transition-all duration-700",
            start ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2",
          ].join(" ")}
          style={{ transitionDelay: start ? `${delay + 400}ms` : "0ms" }}
        >
          dos conteúdos falsos monitorados utilizavam inteligência artificial.
        </p>
      </div>
    </article>
  );
}

function Timeline({ start }: { start: boolean }) {
  return (
    <div className="relative my-6">
      <div
        className="h-[3px] w-full bg-royal/10 rounded-full overflow-hidden"
        aria-hidden="true"
      >
        <div
          className="h-full bg-gradient-to-r from-royal via-royal to-canary transition-[width] ease-out"
          style={{
            width: start ? "100%" : "0%",
            transitionDuration: "1800ms",
          }}
        />
      </div>
      {/* particles */}
      <div className="pointer-events-none absolute inset-0">
        {[15, 40, 60, 78].map((left, i) => (
          <span
            key={i}
            aria-hidden="true"
            className={[
              "absolute top-1/2 -translate-y-1/2 w-1 h-1 rounded-full bg-canary transition-all",
              start ? "opacity-80" : "opacity-0",
            ].join(" ")}
            style={{
              left: `${left}%`,
              transitionDelay: `${800 + i * 120}ms`,
              animation: start ? `pulse 1.6s ${i * 0.25}s ease-in-out infinite` : undefined,
            }}
          />
        ))}
      </div>
      {/* markers */}
      <div className="relative mt-3 flex justify-between text-[11px] font-bold uppercase tracking-[0.2em] text-royal/80">
        <div
          className={[
            "flex flex-col items-start transition-all duration-500",
            start ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-1",
          ].join(" ")}
          style={{ transitionDelay: start ? "600ms" : "0ms" }}
        >
          <span className="w-3 h-3 -mt-[18px] rounded-full bg-royal border-2 border-vanilla shadow-md" />
          <span className="mt-1">2024</span>
        </div>
        <div
          className={[
            "flex flex-col items-end transition-all duration-500",
            start ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-1",
          ].join(" ")}
          style={{ transitionDelay: start ? "1600ms" : "0ms" }}
        >
          <span className="w-4 h-4 -mt-[22px] rounded-full bg-canary border-2 border-royal shadow-md animate-pulse" />
          <span className="mt-1">2025</span>
        </div>
      </div>
    </div>
  );
}

function BarChart({ start }: { start: boolean }) {
  const v2024 = useCountUp(4.65, start, 1200, 200);
  const v2025 = useCountUp(25.77, start, 1800, 600);
  return (
    <div className="mt-8 bg-vanilla border border-royal/15 rounded-sm p-5 md:p-6">
      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-royal/70 mb-4">
        Comparativo anual
      </p>
      <div className="space-y-4">
        {[
          { label: "2024", value: v2024, target: 4.65, highlight: false },
          { label: "2025", value: v2025, target: 25.77, highlight: true },
        ].map((row) => (
          <div key={row.label}>
            <div className="flex items-baseline justify-between mb-1">
              <span className="font-serif text-lg text-royal">{row.label}</span>
              <span className="font-serif font-bold tabular-nums text-royal">
                {fmt(row.value)}%
              </span>
            </div>
            <div className="h-4 w-full bg-royal/10 rounded-full overflow-hidden">
              <div
                className={[
                  "h-full rounded-full transition-[width] ease-out",
                  row.highlight
                    ? "bg-gradient-to-r from-canary to-yellow-400 shadow-[0_0_12px_rgba(234,179,8,0.55)]"
                    : "bg-royal",
                ].join(" ")}
                style={{
                  width: start ? `${(row.target / 30) * 100}%` : "0%",
                  transitionDuration: row.highlight ? "1800ms" : "1200ms",
                  transitionDelay: row.highlight ? "600ms" : "200ms",
                }}
              />
            </div>
          </div>
        ))}
      </div>
      <div
        className={[
          "mt-5 inline-flex items-center gap-2 px-3 py-2 bg-royal text-canary rounded-sm text-xs font-bold uppercase tracking-[0.18em]",
          "transition-all duration-700",
          start ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2",
        ].join(" ")}
        style={{ transitionDelay: start ? "1800ms" : "0ms" }}
      >
        <AlertTriangle size={14} />
        Crescimento superior a 5 vezes
      </div>
    </div>
  );
}

export function AIGrowthInfographic() {
  const { ref, inView } = useInView<HTMLDivElement>(0.15);
  return (
    <section
      ref={ref}
      aria-label="Crescimento da IA como ferramenta de desinformação entre 2024 e 2025"
      className="-mx-5 md:mx-0 my-4"
    >
      <div className="bg-vanilla border border-royal/15 p-5 md:p-8 rounded-sm">
        <TitleReveal start={inView} />

        <Timeline start={inView} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mt-4">
          <YearCard
            year={2024}
            value={4.65}
            start={inView}
            delay={400}
            tooltip="Fonte: Projeto Desinformação em Números 2025 – 2º trimestre | Agência Lupa"
          />
          <YearCard
            year={2025}
            value={25.77}
            start={inView}
            delay={1200}
            highlight
            tooltip="Fonte: Projeto Desinformação em Números 2025 – 2º trimestre | Agência Lupa"
          />
        </div>

        <div
          className={[
          "mt-8 p-6 md:p-8 rounded-sm text-white relative overflow-hidden",
            "transition-all duration-700",
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3",
          ].join(" ")}
          style={{
            background:
              "linear-gradient(135deg, var(--royal) 0%, #1e1e50 60%, var(--royal) 100%)",
            transitionDelay: inView ? "2000ms" : "0ms",
          }}
        >
          <span
            aria-hidden="true"
            className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-canary/20 blur-2xl"
          />
          <p className="relative font-serif text-xl md:text-2xl leading-snug !text-white font-normal">
            “O crescimento de{" "}
              <span className="animate-pulse font-bold text-white">mais de cinco vezes</span>
            {" "}marca uma virada no padrão da desinformação monitorada pela Lupa.”
          </p>  
        </div>
      </div>

      <footer className="mt-4 px-5 md:px-6 py-3 bg-royal/[0.04] border-l-2 border-royal/40 text-xs text-ink/70 font-sans">
        <span className="font-bold uppercase tracking-[0.15em] text-royal/80">Fonte:</span>{" "}
        Projeto Desinformação em Números 2025 – 2º trimestre |{" "}
        <a
          href="https://www.agencialupa.org/noticias/2026/02/05/fakes-com-ia-crescem-308-em-um-ano-revela-estudo-inedito-da-lupa/"
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-2 hover:text-royal"
        >
          Agência Lupa
        </a>
        .
      </footer>
    </section>
  );
}