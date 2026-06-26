import { createFileRoute, Link } from "@tanstack/react-router";
import { Shell } from "@/components/layout/Shell";
import { site } from "@/content/site";

const VIDEO_IDS = [
  "coWRTK8nBB8",
  "tJvsKWCzloQ",
  "zSgchFbDIvU",
  "Sh5WV_mx_wM",
  "RVIyyc8amWk",
];

const PAGE_TITLE = "Shorts: desinformação em pauta";
const PAGE_DESCRIPTION =
  "Cinco momentos curtos e marcantes em que a desinformação prejudicou ou manipulou eleições ao redor do mundo. Deslize para assistir um vídeo de cada vez.";

export const Route = createFileRoute("/shorts")({
  head: () => ({
    meta: [
      { title: `${PAGE_TITLE} — ${site.name}` },
      { name: "description", content: PAGE_DESCRIPTION },
      { property: "og:title", content: PAGE_TITLE },
      { property: "og:description", content: PAGE_DESCRIPTION },
      { property: "og:url", content: "/shorts" },
    ],
    links: [{ rel: "canonical", href: "/shorts" }],
  }),
  component: ShortsPage,
});

function ShortsPage() {
  return (
    <Shell>
      <section className="max-w-screen-lg mx-auto px-5 md:px-10 pt-16 md:pt-20 pb-10">
        <Link
          to="/"
          className="text-[10px] font-bold uppercase tracking-[0.25em] text-royal/70 hover:text-royal"
        >
          ← Voltar
        </Link>
        <h1 className="font-serif text-5xl md:text-7xl text-royal leading-[0.95] mt-6 mb-5">
          {PAGE_TITLE}
        </h1>
        <p className="text-ink/75 text-lg md:text-xl max-w-2xl leading-relaxed">
          {PAGE_DESCRIPTION}
        </p>
        <p className="mt-6 text-[10px] font-bold uppercase tracking-[0.25em] text-royal/60">
          Role para baixo ↓ para o próximo vídeo
        </p>
      </section>

      <div
        className="h-[100svh] w-full overflow-y-scroll bg-ink"
        style={{ scrollSnapType: "y mandatory" }}
      >
        {VIDEO_IDS.map((id, idx) => (
          <section
            key={id}
            className="h-[100svh] w-full flex items-center justify-center px-4 py-6"
            style={{ scrollSnapAlign: "center", scrollSnapStop: "always" }}
          >
            <div className="relative h-full max-h-full" style={{ aspectRatio: "9 / 16" }}>
              <div className="relative w-full h-full bg-black rounded-xl overflow-hidden shadow-2xl">
                <iframe
                  src={`https://www.youtube.com/embed/${id}?rel=0&playsinline=1&modestbranding=1`}
                  title={`Vídeo ${idx + 1} de ${VIDEO_IDS.length}`}
                  loading={idx === 0 ? "eager" : "lazy"}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full"
                />
              </div>
              <div className="absolute top-3 right-3 px-2.5 py-1 bg-vanilla/90 text-royal text-[10px] font-bold tracking-[0.15em] rounded-full">
                {idx + 1} / {VIDEO_IDS.length}
              </div>
            </div>
          </section>
        ))}
      </div>
    </Shell>
  );
}