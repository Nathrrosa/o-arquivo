import { useEffect, useRef, useState } from "react";
import { Smartphone, FileQuestion, Users } from "lucide-react";

type StatCard = {
  title: string;
  value: number;
  description: string;
  icon: "smartphone" | "fileQuestion" | "users";
};

const CARDS: StatCard[] = [
  {
    title: "Uso de redes sociais e apps de mensagens",
    value: 93,
    description:
      "Utilizam alguma rede social, incluindo aplicativos de mensagens como WhatsApp e Telegram.",
    icon: "smartphone",
  },
  {
    title: "Exposição a notícias desconfiadas como falsas",
    value: 72,
    description:
      "Dos usuários de redes sociais relataram ter acessado notícias que desconfiavam ser falsas nos últimos seis meses.",
    icon: "fileQuestion",
  },
  {
    title: "População exposta à desinformação",
    value: 67,
    description: "Da população com 16 anos ou mais já foi exposta à desinformação.",
    icon: "users",
  },
];

const ICONS = {
  smartphone: Smartphone,
  fileQuestion: FileQuestion,
  users: Users,
};

function useInView<T extends HTMLElement>(threshold = 0.3) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    if (!ref.current || inView) return;
    const el = ref.current;
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
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold, inView]);
  return { ref, inView };
}

function CircularStat({
  value,
  start,
  delay,
}: {
  value: number;
  start: boolean;
  delay: number;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) return;
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      setCount(value);
      return;
    }
    const duration = 1400;
    const startTime = performance.now() + delay;
    let raf = 0;
    const tick = (now: number) => {
      const elapsed = Math.max(0, now - startTime);
      const t = Math.min(1, elapsed / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setCount(Math.round(eased * value));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [start, value, delay]);

  // Pie chart geometry
  const cx = 64;
  const cy = 64;
  const r = 56;
  const angle = (count / 100) * 2 * Math.PI;
  const endX = cx + r * Math.sin(angle);
  const endY = cy - r * Math.cos(angle);
  const largeArc = count > 50 ? 1 : 0;
  const wedgePath =
    count >= 100
      ? `M ${cx} ${cy} m 0 -${r} a ${r} ${r} 0 1 1 -0.01 0 Z`
      : `M ${cx} ${cy} L ${cx} ${cy - r} A ${r} ${r} 0 ${largeArc} 1 ${endX} ${endY} Z`;

  return (
    <div
      className="relative shrink-0"
      role="img"
      aria-label={`${value} por cento`}
    >
      <svg width="128" height="128" viewBox="0 0 128 128">
        <circle
          cx={cx}
          cy={cy}
          r={r}
          fill="var(--royal)"
        />
        <path
          d={wedgePath}
          fill="var(--canary)"
        />
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="var(--royal)" strokeWidth="2" />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <span className="font-serif text-2xl font-bold text-royal tabular-nums bg-vanilla/90 px-2 py-0.5 rounded-sm shadow-sm">
          {count}%
        </span>
      </div>
    </div>
  );
}

export function StatsCards() {
  const { ref, inView } = useInView<HTMLDivElement>(0.2);

  return (
    <section
      ref={ref}
      className="-mx-5 md:mx-0 my-4"
      aria-label="Indicadores sobre desinformação no Brasil"
    >
      <div className="flex flex-col gap-4">
        {CARDS.map((card, i) => {
          const Icon = ICONS[card.icon];
          return (
            <article
              key={card.title}
              title={`${card.value}% — ${card.title}`}
              className={[
                "group bg-vanilla border border-royal/15 p-6 md:p-8",
                "flex flex-col md:flex-row gap-6 md:gap-8 items-start md:items-center",
                "transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_30px_-12px_rgba(30,30,80,0.25)] hover:border-royal/40",
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
              ].join(" ")}
              style={{
                transitionDelay: inView ? `${i * 180}ms` : "0ms",
              }}
            >
              <CircularStat
                value={card.value}
                start={inView}
                delay={i * 180 + 120}
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-2">
                  <span className="inline-flex items-center justify-center w-9 h-9 bg-canary text-royal rounded-sm">
                    <Icon size={18} strokeWidth={2} />
                  </span>
                  <h4 className="font-serif text-xl md:text-2xl text-royal leading-tight">
                    {card.title}
                  </h4>
                </div>
                <p className="text-ink/85 text-base leading-relaxed">
                  {card.description}
                </p>
              </div>
            </article>
          );
        })}
      </div>
      <footer className="mt-4 px-5 md:px-6 py-3 bg-royal/[0.04] border-l-2 border-royal/40 text-xs text-ink/70 font-sans">
        <span className="font-bold uppercase tracking-[0.15em] text-royal/80">
          Fonte:
        </span>{" "}
        PNAD Contínua – Tecnologia da Informação e Comunicação 2023 (IBGE).{" "}
        <span className="italic">Dados referentes à população de 16 anos ou mais.</span>
      </footer>
    </section>
  );
}