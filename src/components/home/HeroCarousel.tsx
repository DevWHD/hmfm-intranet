import { useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useContent } from "@/store/content";
import { getIcon } from "@/lib/icons";

const BG_CLASSES: Record<string, string> = {
  blue: "from-[hsl(198_100%_28%)] via-[hsl(198_100%_24%)] to-[hsl(196_100%_18%)]",
  darkblue: "from-[hsl(196_100%_21%)] via-[hsl(198_100%_18%)] to-[hsl(215_60%_14%)]",
  teal: "from-[hsl(184_100%_32%)] via-[hsl(190_90%_28%)] to-[hsl(198_100%_24%)]",
  green: "from-[hsl(110_67%_31%)] via-[hsl(140_55%_28%)] to-[hsl(160_70%_22%)]",
};

export function HeroCarousel() {
  const { content } = useContent();
  const heroSlides = content.heroSlides;
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" });
  const [selected, setSelected] = useState(0);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelected(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    onSelect();
    const t = setInterval(() => {
      if (emblaApi) emblaApi.scrollNext();
    }, 7000);
    return () => {
      clearInterval(t);
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  if (heroSlides.length === 0) return null;

  return (
    <section className="bg-gradient-to-b from-[hsl(199_30%_97%)] to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        <div className="flex items-end justify-between mb-4">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-[hsl(198_100%_28%)]">
              Rotina Diária
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[hsl(198_100%_28%)] mt-1">
              Plano de Capacidade Plena — PCP
            </h2>
          </div>
          <div className="hidden sm:flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full h-9 w-9"
              onClick={() => emblaApi?.scrollPrev()}
              data-testid="button-hero-prev"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="rounded-full h-9 w-9"
              onClick={() => emblaApi?.scrollNext()}
              data-testid="button-hero-next"
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div className="overflow-hidden rounded-xl shadow-xl" ref={emblaRef}>
          <div className="flex">
            {heroSlides.map((slide) => {
              const Icon = getIcon(slide.icon);
              return (
                <div
                  key={slide.id}
                  className={`flex-[0_0_100%] min-w-0 bg-gradient-to-br ${BG_CLASSES[slide.bg] ?? BG_CLASSES.blue} text-white relative overflow-hidden`}
                >
                  <div
                    className="absolute inset-0 opacity-10"
                    style={{
                      backgroundImage:
                        "radial-gradient(circle at 80% 20%, white 1px, transparent 1px), radial-gradient(circle at 20% 80%, white 1px, transparent 1px)",
                      backgroundSize: "60px 60px, 80px 80px",
                    }}
                  />
                  <div className="relative px-6 sm:px-12 py-12 sm:py-16 grid lg:grid-cols-[1fr_auto] gap-8 items-center min-h-[360px]">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={slide.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.5 }}
                      >
                        <div className="text-xs font-semibold uppercase tracking-widest text-white/80 mb-3">
                          {slide.eyebrow}
                        </div>
                        <h3 className="font-serif text-3xl sm:text-5xl font-bold leading-tight max-w-2xl">
                          {slide.title}{" "}
                          <span className="text-[hsl(184_100%_70%)]">{slide.highlight}</span>
                        </h3>
                        <p className="mt-4 text-base sm:text-lg text-white/85 max-w-xl leading-relaxed">
                          {slide.body}
                        </p>
                        <div className="mt-6 flex flex-wrap gap-3">
                          <Button
                            size="lg"
                            className="bg-white text-[hsl(198_100%_28%)] hover:bg-white/90 gap-2 shadow-lg"
                            data-testid={`button-hero-cta-${slide.id}`}
                          >
                            {slide.cta}
                            <ArrowUpRight className="w-4 h-4" />
                          </Button>
                        </div>
                      </motion.div>
                    </AnimatePresence>
                    <div className="hidden lg:flex w-44 h-44 rounded-2xl bg-white/10 backdrop-blur items-center justify-center border border-white/20">
                      <Icon className="w-24 h-24 text-white" strokeWidth={1.4} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-4 flex justify-center gap-2">
          {heroSlides.map((_, i) => (
            <button
              key={i}
              onClick={() => emblaApi?.scrollTo(i)}
              data-testid={`hero-dot-${i}`}
              aria-label={`Ir para slide ${i + 1}`}
              className={`h-1.5 rounded-full transition-all ${
                selected === i ? "w-8 bg-[hsl(198_100%_28%)]" : "w-2 bg-[hsl(198_100%_28%)]/30"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
