import { Star, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useContent } from "@/store/content";

export function PesquisaSatisfacao() {
  const { content } = useContent();
  const { badge, title, body, cta } = content.branding.pesquisa;

  return (
    <section className="py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl bg-gradient-to-r from-[hsl(184_100%_32%)] to-[hsl(198_100%_28%)] p-8 sm:p-12 text-white relative overflow-hidden">
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage:
                "radial-gradient(circle at 90% 50%, white 1.5px, transparent 1.5px)",
              backgroundSize: "30px 30px",
            }}
          />
          <div className="relative grid lg:grid-cols-[1fr_auto] gap-6 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 text-xs font-semibold uppercase tracking-wider mb-4">
                <Star className="w-3.5 h-3.5" />
                {badge}
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold leading-tight">{title}</h3>
              <p className="mt-3 text-white/85 max-w-xl">{body}</p>
            </div>
            <Button
              size="lg"
              className="bg-white text-[hsl(198_100%_28%)] hover:bg-white/90 gap-2 shadow-lg w-full lg:w-auto"
              data-testid="button-responder-pesquisa"
            >
              {cta}
              <ArrowUpRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
