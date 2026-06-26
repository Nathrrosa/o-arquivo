import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import type { Block, InlineLink } from "@/content/site";
import { ShortsCarousel } from "@/components/article/ShortsCarousel";
import { StatsCards } from "@/components/article/StatsCards";
import { AIGrowthInfographic } from "@/components/article/AIGrowthInfographic";
import { IbictInfographic } from "@/components/article/IbictInfographic";

function renderTextWithLinks(text: string, links?: InlineLink[], emphasis?: string[]) {
  let segments: (string | ReactNode)[] = [text];

  if (!links?.length && !emphasis?.length) return text;

  for (const link of links ?? []) {
    const next: (string | ReactNode)[] = [];
    for (const seg of segments) {
      if (typeof seg !== "string") {
        next.push(seg);
        continue;
      }
      const parts = seg.split(link.text);
      for (let i = 0; i < parts.length; i++) {
        if (i > 0) {
          next.push(
            <a
              key={`${link.href}-${i}`}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#7c3aed] underline underline-offset-4 decoration-1 decoration-[#7c3aed] hover:opacity-70 transition-opacity"
            >
              {link.text}
            </a>
          );
        }
        next.push(parts[i]);
      }
    }
    segments = next;
  }

  for (const phrase of emphasis ?? []) {
    const next: (string | ReactNode)[] = [];
    for (const seg of segments) {
      if (typeof seg !== "string") {
        next.push(seg);
        continue;
      }
      const parts = seg.split(phrase);
      for (let i = 0; i < parts.length; i++) {
        if (i > 0) {
          next.push(
            <strong key={`em-${phrase.slice(0, 8)}-${i}`} className="font-bold italic">
              {phrase}
            </strong>
          );
        }
        next.push(parts[i]);
      }
    }
    segments = next;
  }

  return <>{segments}</>;
}

export function ArticleBlocks({ blocks }: { blocks: Block[] }) {
  return (
    <div className="space-y-10 editorial-prose">
      {blocks.map((b, i) => (
        <BlockRenderer key={i} block={b} />
      ))}
    </div>
  );
}

function BlockRenderer({ block }: { block: Block }) {
  switch (block.type) {
    case "paragraph":
      return (
        <p className={
          [
            block.dropCap ? "drop-cap text-xl md:text-2xl font-serif !leading-relaxed text-ink" : undefined,
            block.bold ? "font-bold" : undefined,
          ].filter(Boolean).join(" ") || undefined
        }>
          {renderTextWithLinks(block.text, block.links, block.emphasis)}
        </p>
      );
    case "heading":
      return (
        <h3 className="font-serif text-3xl md:text-4xl text-royal pt-6 border-t border-royal/15">
          {block.text}
        </h3>
      );
    case "image":
      return (
        <figure className="py-4 -mx-5 md:mx-0">
          <img
            src={block.src}
            alt={block.alt}
            loading="lazy"
            className="w-full h-auto"
          />
          {block.caption && (
            <figcaption className="px-5 md:px-0 mt-3 text-xs text-ink/60 italic font-sans">
              {block.caption}
            </figcaption>
          )}
        </figure>
      );
    case "quote":
      return (
        <blockquote className="relative my-14 py-10 pl-8 md:pl-12 pr-6 md:pr-8 border-l-4 border-canary bg-canary/10 rounded-r-sm -mx-5 md:mx-0">
          <p className="font-serif text-2xl md:text-4xl italic leading-tight mb-6 text-royal">
            “{block.text}”
          </p>
          <cite className="block text-[11px] uppercase tracking-[0.2em] font-bold text-royal/70 not-italic">
            — {block.author}
          </cite>
        </blockquote>
      );
    case "audio":
      return (
        <div className="p-6 md:p-8 bg-canary/15 border border-royal/15 rounded-sm">
          <div className="flex justify-between items-center mb-5">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-royal">
              ♪ Áudio · {block.title}
            </span>
            {block.duration && (
              <span className="text-[10px] font-bold text-royal">{block.duration}</span>
            )}
          </div>
          {block.src ? (
            <audio controls src={block.src} className="w-full" />
          ) : (
            <div className="flex items-center gap-4">
              <button
                aria-label="Reproduzir"
                className="w-12 h-12 bg-royal rounded-full flex items-center justify-center hover:scale-105 transition-transform"
              >
                <span className="w-0 h-0 border-y-[6px] border-y-transparent border-l-[10px] border-l-vanilla ml-1" />
              </button>
              <div className="flex-1 h-1 bg-royal/15 relative">
                <div className="absolute inset-y-0 left-0 w-1/3 bg-royal" />
              </div>
            </div>
          )}
        </div>
      );
    case "video":
      return (
        <figure className="-mx-5 md:mx-0">
          <div className="aspect-video bg-ink">
            <iframe
              src={block.embedUrl}
              title={block.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            />
          </div>
          <figcaption className="px-5 md:px-0 mt-3 text-xs text-ink/60 italic">
            {block.title}
          </figcaption>
        </figure>
      );
    case "embed":
      const isVideoEmbed = /youtube\.com|youtu\.be|vimeo\.com/.test(block.embedUrl);
      const isSpotify = /open\.spotify\.com/.test(block.embedUrl);
      return (
        <figure
          className={
            isSpotify
              ? "my-10 mx-auto max-w-3xl p-6 md:p-8 bg-royal/[0.05] border border-royal/15 rounded-xl"
              : isVideoEmbed
              ? "-mx-5 md:mx-0 my-10 p-3 md:p-5 bg-royal/[0.04] border border-royal/10 rounded-sm"
              : "-mx-5 md:mx-0"
          }
        >
          {block.intro && (
            <p className="mb-4 font-serif text-lg md:text-xl text-royal font-bold leading-snug">
              {block.intro}
            </p>
          )}
          {isVideoEmbed ? (
            <div className="aspect-video bg-ink">
              <iframe
                src={block.embedUrl}
                title={block.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
                loading="lazy"
              />
            </div>
          ) : (
            <iframe
              src={block.embedUrl}
              title={block.title}
              allow="encrypted-media"
              className="w-full h-[152px] md:h-[232px]"
              loading="lazy"
            />
          )}
          {block.caption && (
            <figcaption className="mt-3 text-xs text-ink/60 italic font-sans">
              {block.caption}
            </figcaption>
          )}
        </figure>
      );
    case "callout":
      return (
        <div className="bg-canary/25 border border-canary p-6 md:p-8 -mx-5 md:mx-0">
          <h4 className="font-serif text-xl md:text-2xl text-royal mb-4 leading-snug">
            {block.title}
          </h4>
          <ul className="space-y-3">
            {block.items.map((item, idx) => (
              <li key={idx} className="flex gap-3 text-ink/90 text-base leading-relaxed">
                <span className="shrink-0 mt-1.5 w-1.5 h-1.5 rounded-full bg-royal" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      );
    case "cta":
      return (
        <div className="relative flex items-center justify-center mt-14 -mb-6 md:-mb-10">
          {/* Linha divisória */}
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-royal/15"></div>
          </div>
          
          {/* Pílula com texto e seta */}
          <span className="relative bg-royal text-vanilla text-xs md:text-sm font-medium px-6 py-2.5 rounded-full shadow-md border border-vanilla/10 flex items-center gap-2 max-w-[90%] md:max-w-xl text-center">
            <span>{block.text}</span>
            <span className="text-canary font-bold animate-bounce shrink-0">↓</span>
          </span>
        </div>
      );
    case "shortsCarousel":
      return <ShortsCarousel title={block.title} videoIds={block.videoIds} />;
    case "statsCards":
      return <StatsCards />;
    case "aiGrowthInfographic":
      return <AIGrowthInfographic />;
    case "ibictInfographic":
      return <IbictInfographic />;
    case "quiz":
      return (
        <div className="bg-canary p-8 md:p-10 -mx-5 md:mx-0 mt-16 md:mt-20 rounded-sm flex flex-col md:flex-row md:items-center gap-6 md:justify-between">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-royal mb-3">Quiz interativo</p>
            <h4 className="font-serif text-2xl md:text-3xl text-royal mb-2">{block.title}</h4>
            <p className="text-royal/80 max-w-md">{block.description}</p>
          </div>
          <Link
            to={block.href}
            className="shrink-0 inline-flex items-center justify-center px-6 py-4 bg-royal text-vanilla text-xs font-bold uppercase tracking-[0.2em] hover:bg-ink transition-colors"
          >
            Iniciar quiz →
          </Link>
        </div>
      );
  }
}