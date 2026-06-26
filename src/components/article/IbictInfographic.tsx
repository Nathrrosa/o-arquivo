import { useRef, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { motion, AnimatePresence } from "framer-motion";
import { Download, Loader2, MessageCircle, Search, Smartphone, X } from "lucide-react";

type Datum = {
  categoria: string;
  shortLabel: string;
  valor: number;
  descricao: string;
  analise: string;
  color: string;
};

const data: Datum[] = [
  {
    categoria: "Difícil",
    shortLabel: "Difícil",
    valor: 50,
    descricao: "considera difícil avaliar se uma notícia é falsa ou verdadeira",
    analise:
      "Metade da população brasileira reconhece a dificuldade de distinguir conteúdo verdadeiro de falso nas redes sociais, evidenciando a urgência de iniciativas de educação midiática.",
    color: "#FFC107",
  },
  {
    categoria: "Fácil",
    shortLabel: "Fácil",
    valor: 46,
    descricao: "considera fácil avaliar se uma notícia é falsa ou verdadeira",
    analise:
      "Quase metade dos entrevistados afirma ter facilidade em identificar notícias falsas — uma confiança que nem sempre corresponde à capacidade real de verificação.",
    color: "#0A3D91",
  },
  {
    categoria: "Não sabe / não respondeu",
    shortLabel: "Não sabe",
    valor: 4,
    descricao: "não sabe ou não pode responder",
    analise:
      "Uma pequena parcela do público não soube ou preferiu não responder, indicando incerteza sobre o próprio repertório frente à desinformação.",
    color: "#B7C9E8",
  },
];

function CustomTooltip({ active, payload }: { active?: boolean; payload?: Array<{ payload: Datum }> }) {
  if (!active || !payload || !payload.length) return null;
  const d = payload[0].payload;
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-xs rounded-lg border border-[#E5E7EB] bg-white p-4 shadow-xl"
    >
      <div className="flex items-center gap-2">
        <span className="inline-block h-3 w-3 rounded-sm" style={{ backgroundColor: d.color }} />
        <span className="text-sm font-semibold text-[#0A3D91]">{d.categoria}</span>
      </div>
      <div className="mt-1 text-2xl font-bold text-[#0A3D91]">{d.valor}%</div>
      <p className="mt-1 text-xs leading-snug text-slate-600">{d.descricao}</p>
    </motion.div>
  );
}

function FakeNewsBadge() {
  return (
    <div className="relative flex items-center">
      <div className="relative">
        <Smartphone className="text-[#0A3D91]" size={64} strokeWidth={1.6} />
        <span
          className="absolute -bottom-1 -right-1 grid h-8 w-8 place-items-center rounded-full border-2 border-white"
          style={{ backgroundColor: "#FFC107" }}
        >
          <Search size={16} className="text-[#0A3D91]" strokeWidth={2.5} />
        </span>
      </div>
      <span
        className="ml-2 rotate-[-6deg] rounded-md px-2 py-1 text-xs font-extrabold tracking-wider text-white shadow-md"
        style={{ backgroundColor: "#E53935" }}
      >
        FAKE NEWS
      </span>
    </div>
  );
}

export function IbictInfographic() {
  const [selected, setSelected] = useState<Datum | null>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [exporting, setExporting] = useState(false);
  const exportRef = useRef<HTMLDivElement>(null);

  const handleExportPdf = async () => {
    if (!exportRef.current || exporting) return;
    setExporting(true);
    try {
      const [{ default: html2canvas }, { default: jsPDF }] = await Promise.all([
        import("html2canvas"),
        import("jspdf"),
      ]);
      const node = exportRef.current;
      const canvas = await html2canvas(node, {
        scale: 3,
        backgroundColor: "#FFFFFF",
        useCORS: true,
        logging: false,
        windowWidth: node.scrollWidth,
      });
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({ orientation: "portrait", unit: "pt", format: "a4", compress: true });
      const pageW = pdf.internal.pageSize.getWidth();
      const pageH = pdf.internal.pageSize.getHeight();
      const margin = 24;
      const availW = pageW - margin * 2;
      const availH = pageH - margin * 2;
      const ratio = Math.min(availW / canvas.width, availH / canvas.height);
      const renderW = canvas.width * ratio;
      const renderH = canvas.height * ratio;
      const x = (pageW - renderW) / 2;
      const y = (pageH - renderH) / 2;
      pdf.addImage(imgData, "PNG", x, y, renderW, renderH, undefined, "FAST");
      pdf.save("infografico-fake-news-ibict.pdf");
    } catch (err) {
      console.error("PDF export failed", err);
    } finally {
      setExporting(false);
    }
  };

  return (
    <section className="-mx-5 md:mx-0 bg-white border border-[#E5E7EB] rounded-sm overflow-hidden">
      <div className="h-[3px] w-full" style={{ backgroundColor: "#F4B400" }} />
      <div className="px-4 sm:px-6 py-6 sm:py-8">
        <div className="mb-2 flex justify-end">
          <button
            onClick={handleExportPdf}
            disabled={exporting}
            className="inline-flex items-center gap-2 rounded-md bg-[#0A3D91] px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-[#0A3D91]/90 disabled:opacity-60"
            aria-label="Exportar infográfico em PDF"
          >
            {exporting ? <Loader2 size={16} className="animate-spin" /> : <Download size={16} />}
            {exporting ? "Exportando..." : "Exportar PDF"}
          </button>
        </div>

        <div ref={exportRef} className="bg-white">
          <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-4">
            <div className="min-w-0" />
            <FakeNewsBadge />
          </div>

          <motion.h3
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mx-auto mt-4 max-w-4xl text-center font-sans text-xl font-semibold leading-snug text-[#0A3D91] sm:text-2xl md:text-[28px] md:leading-[1.25]"
          >
            Para os brasileiros, é fácil ou difícil saber quais notícias são falsas nas redes sociais?
          </motion.h3>

          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-[1fr_auto]">
            <div className="h-[360px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data} margin={{ top: 40, right: 20, left: 0, bottom: 10 }} barCategoryGap="25%">
                  <CartesianGrid strokeDasharray="4 4" stroke="#E5E7EB" vertical={false} />
                  <XAxis
                    dataKey="shortLabel"
                    tick={{ fill: "#0A3D91", fontSize: 13, fontWeight: 600 }}
                    axisLine={{ stroke: "#E5E7EB" }}
                    tickLine={false}
                  />
                  <YAxis
                    domain={[0, 60]}
                    ticks={[0, 20, 40, 60]}
                    tickFormatter={(v) => `${v}%`}
                    tick={{ fill: "#6B7280", fontSize: 12 }}
                    axisLine={false}
                    tickLine={false}
                    width={42}
                  />
                  <Tooltip cursor={{ fill: "rgba(10,61,145,0.04)" }} content={<CustomTooltip />} />
                  <Bar
                    dataKey="valor"
                    radius={[6, 6, 0, 0]}
                    isAnimationActive
                    animationDuration={900}
                    onClick={(_, idx) => {
                      setSelected(data[idx]);
                      setActiveIndex(idx);
                    }}
                    onMouseEnter={(_, idx) => setActiveIndex(idx)}
                    onMouseLeave={() => setActiveIndex(null)}
                    label={{
                      position: "top",
                      formatter: (v: number) => `${v}%`,
                      fill: "#0A3D91",
                      fontSize: 20,
                      fontWeight: 800,
                    }}
                  >
                    {data.map((d, i) => (
                      <Cell
                        key={d.categoria}
                        fill={d.color}
                        cursor="pointer"
                        style={{
                          transition: "filter 200ms, transform 200ms",
                          filter:
                            activeIndex === i ? "drop-shadow(0 8px 16px rgba(10,61,145,0.25))" : "none",
                          transformOrigin: "bottom",
                          transform: activeIndex === i ? "scaleY(1.03)" : "scaleY(1)",
                          opacity: activeIndex === null || activeIndex === i ? 1 : 0.55,
                        }}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            <AnimatePresence>
              {selected && (
                <motion.aside
                  key={selected.categoria}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="relative w-full max-w-sm rounded-xl border border-[#E5E7EB] bg-white p-6 shadow-lg md:w-72"
                  role="dialog"
                  aria-label={`Detalhes: ${selected.categoria}`}
                >
                  <button
                    onClick={() => {
                      setSelected(null);
                      setActiveIndex(null);
                    }}
                    className="absolute right-3 top-3 rounded p-1 text-slate-500 hover:bg-slate-100"
                    aria-label="Fechar painel"
                  >
                    <X size={16} />
                  </button>
                  <div className="flex items-center gap-2">
                    <span className="inline-block h-3 w-3 rounded-sm" style={{ backgroundColor: selected.color }} />
                    <span className="text-sm font-semibold uppercase tracking-wide text-[#0A3D91]">
                      {selected.categoria}
                    </span>
                  </div>
                  <div className="mt-2 text-5xl font-bold text-[#0A3D91]">{selected.valor}%</div>
                  <p className="mt-3 text-sm leading-relaxed text-slate-700">{selected.descricao}</p>
                  <div className="mt-4 border-t border-[#E5E7EB] pt-4">
                    <h4 className="text-xs font-semibold uppercase tracking-wide text-[#F4B400]">Análise</h4>
                    <p className="mt-1 text-sm leading-relaxed text-slate-700">{selected.analise}</p>
                  </div>
                </motion.aside>
              )}
            </AnimatePresence>
          </div>

          <footer className="mt-10 flex flex-col items-start gap-4 border-t border-[#E5E7EB] pt-6 sm:flex-row sm:items-center">
            <div className="flex items-center gap-3">
              <span
                className="grid h-12 w-12 shrink-0 place-items-center rounded-full"
                style={{ backgroundColor: "#FFC107" }}
              >
                <MessageCircle className="text-[#0A3D91]" size={22} />
              </span>
              <span className="text-sm font-semibold text-[#0A3D91]">
                Pesquisa Nacional
                <br />
                sobre Desinformação
              </span>
            </div>
            <div className="hidden h-12 w-px bg-[#E5E7EB] sm:block" />
            <p className="text-xs leading-snug text-[#0A3D91] sm:text-sm">
              <span className="font-semibold">Fonte:</span> Pesquisa Nacional sobre Desinformação 2023
              <br />
              Instituto Brasileiro de Informação em Ciência e Tecnologia (IBICT)
            </p>
          </footer>
        </div>
      </div>
    </section>
  );
}