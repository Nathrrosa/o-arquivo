import * as React from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, type CarouselApi } from "@/components/ui/carousel";
import { cn } from "@/lib/utils";

type Props = {
  title?: string;
  videoIds: string[];
};

export function ShortsCarousel({ title, videoIds }: Props) {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);

  React.useEffect(() => {
    if (!api) return;
    setCurrent(api.selectedScrollSnap());
    const onSelect = () => setCurrent(api.selectedScrollSnap());
    api.on("select", onSelect);
    api.on("reInit", onSelect);
    return () => {
      api.off("select", onSelect);
      api.off("reInit", onSelect);
    };
  }, [api]);

  return (
    <div className="-mx-5 md:mx-0 my-10 p-5 md:p-7 bg-royal/[0.04] border border-royal/10 rounded-sm">
      {title && (
        <p className="px-5 md:px-0 mb-4 text-[10px] font-bold uppercase tracking-[0.2em] text-royal">
          ▶ {title}
        </p>
      )}
      <Carousel setApi={setApi} opts={{ loop: false, align: "center" }} className="w-full">
        <CarouselContent>
          {videoIds.map((id, idx) => (
            <CarouselItem key={id} className="flex justify-center">
              <div className="w-full max-w-[320px] mx-auto">
                <div className="relative w-full bg-ink" style={{ aspectRatio: "9 / 16" }}>
                  <iframe
                    src={`https://www.youtube.com/embed/${id}?rel=0&playsinline=1`}
                    title={`Vídeo ${idx + 1}`}
                    loading="lazy"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    className="absolute inset-0 w-full h-full"
                  />
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-2 md:-left-12 bg-vanilla border-royal text-royal hover:bg-canary" />
        <CarouselNext className="right-2 md:-right-12 bg-vanilla border-royal text-royal hover:bg-canary" />
      </Carousel>
      <div className="flex justify-center gap-2 mt-5">
        {videoIds.map((_, idx) => (
          <button
            key={idx}
            type="button"
            aria-label={`Ir para vídeo ${idx + 1}`}
            onClick={() => api?.scrollTo(idx)}
            className={cn(
              "h-2 rounded-full transition-all",
              current === idx ? "w-6 bg-royal" : "w-2 bg-royal/30 hover:bg-royal/60"
            )}
          />
        ))}
      </div>
    </div>
  );
}