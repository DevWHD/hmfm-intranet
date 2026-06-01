import { HeroCarousel } from "@/components/home/HeroCarousel";
import { UrgentBanner } from "@/components/home/UrgentBanner";
import { IndicatorsSection } from "@/components/home/IndicatorsSection";
import { SistemasGrid } from "@/components/home/SistemasGrid";
import { AvisosRecentes } from "@/components/home/AvisosRecentes";
import { EscalaHoje } from "@/components/home/EscalaHoje";
import { StatsCards } from "@/components/home/StatsCards";
import { DepartamentosGrid } from "@/components/home/DepartamentosGrid";
import { CardapioPreview } from "@/components/home/CardapioPreview";
import { PesquisaSatisfacao } from "@/components/home/PesquisaSatisfacao";
import { useContent } from "@/store/content";

export default function Home() {
  const { content } = useContent();
  const s = content.branding.homeSections;

  const showMidBlock =
    s.showUrgentBanner || s.showStats || s.showAvisos || s.showEscala || s.showCardapio;

  return (
    <>
      {s.showHero && <HeroCarousel />}

      {showMidBlock && (
        <section className="py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
            {s.showUrgentBanner && <UrgentBanner />}
            {s.showStats && <StatsCards />}
            {(s.showAvisos || s.showEscala) && (
              <div
                className={`grid grid-cols-1 gap-6 mt-2 ${
                  s.showAvisos && s.showEscala ? "lg:grid-cols-[1.6fr_1fr]" : ""
                }`}
              >
                {s.showAvisos && <AvisosRecentes />}
                {s.showEscala && <EscalaHoje />}
              </div>
            )}
            {s.showCardapio && <CardapioPreview />}
          </div>
        </section>
      )}

      {s.showIndicators && <IndicatorsSection />}
      {s.showSistemas && <SistemasGrid />}
      {s.showDepartamentos && <DepartamentosGrid />}
      {s.showPesquisa && <PesquisaSatisfacao />}
    </>
  );
}
