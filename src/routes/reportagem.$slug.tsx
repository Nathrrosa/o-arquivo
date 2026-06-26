import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Shell } from "@/components/layout/Shell";
import { ArticleBlocks } from "@/components/article/ArticleBlock";
import { ReadingProgress } from "@/components/ReadingProgress";
import { articles, site } from "@/content/site";

export const Route = createFileRoute("/reportagem/$slug")({
  loader: ({ params }) => {
    const article = articles.find((a) => a.slug === params.slug);
    if (!article) throw notFound();
    return { article };
  },
  head: ({ loaderData }) => {
    const a = loaderData?.article;
    if (!a) return {};
    return {
      meta: [
        { title: `${a.title} — ${site.name}` },
        { name: "description", content: a.subtitle },
        { property: "og:title", content: a.title },
        { property: "og:description", content: a.subtitle },
        { property: "og:type", content: "article" },
        { property: "og:url", content: `/reportagem/${a.slug}` },
        { property: "og:image", content: a.cover },
      ],
      links: [{ rel: "canonical", href: `/reportagem/${a.slug}` }],
    };
  },
  component: ArticlePage,
  notFoundComponent: () => (
    <Shell>
      <div className="px-5 md:px-10 py-32 max-w-3xl mx-auto text-center">
        <h1 className="font-serif text-5xl text-royal mb-4">Reportagem não encontrada</h1>
        <Link to="/" className="text-royal underline">Voltar ao início</Link>
      </div>
    </Shell>
  ),
  errorComponent: ({ reset }) => (
    <Shell>
      <div className="px-5 md:px-10 py-32 max-w-3xl mx-auto text-center">
        <h1 className="font-serif text-4xl text-royal mb-4">Algo deu errado</h1>
        <button onClick={reset} className="px-6 py-3 bg-royal text-vanilla text-xs uppercase tracking-widest font-bold">Tentar novamente</button>
      </div>
    </Shell>
  ),
});

function ArticlePage() {
  const { article } = Route.useLoaderData();
  return (
    <Shell>
      <ReadingProgress />
      {/* HERO */}
      <header className="relative w-full min-h-[75vh] md:min-h-[88vh] flex items-end overflow-hidden">
        <img
          src={article.cover}
          alt={article.coverAlt}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-royal via-royal/55 to-transparent" />
        <div className="relative z-10 p-5 md:p-12 max-w-5xl reveal">
          <span className="inline-block px-3 py-1 bg-canary text-royal text-[10px] font-bold uppercase tracking-[0.2em] mb-6">
            {article.category}
          </span>
          <h1 className="font-serif font-black text-vanilla text-[clamp(2.25rem,7vw,6.5rem)] leading-[0.95] tracking-tight mb-6 glitch-hover">
            {article.title}
          </h1>
          <p className="text-lg md:text-2xl text-vanilla/85 max-w-3xl font-light leading-relaxed">
            {article.subtitle}
          </p>
        </div>
      </header>

      <article className="max-w-screen-xl mx-auto grid md:grid-cols-12 gap-12 py-16 md:py-24 px-5 md:px-10">
        <aside className="md:col-span-3 border-t-2 border-royal pt-6">
          <div className="md:sticky md:top-28 space-y-8">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-royal/50 mb-1">Por</p>
              <p className="font-semibold">{article.author}</p>
            </div>
            {article.assistant && (
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-royal/50 mb-1">Assistente de produção</p>
                <p className="font-semibold">{article.assistant}</p>
              </div>
            )}
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-royal/50 mb-1">Publicado</p>
              <p className="font-semibold">{article.date}</p>
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-royal/50 mb-1">Formatos</p>
              <p className="font-semibold">{article.formats}</p>
            </div>
          </div>
        </aside>
        <div className="md:col-span-9 max-w-[68ch]">
          <ArticleBlocks blocks={article.blocks} />
        </div>
      </article>

    </Shell>
  );
}