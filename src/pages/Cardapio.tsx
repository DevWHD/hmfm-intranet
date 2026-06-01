import { UtensilsCrossed, Coffee, Soup, Cookie, Moon } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card } from "@/components/ui/card";
import { useContent } from "@/store/content";

const ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  Café: Coffee,
  "Café da manhã": Coffee,
  Almoço: Soup,
  Lanche: Cookie,
  "Lanche da tarde": Cookie,
  Jantar: Moon,
};

export default function Cardapio() {
  const { content } = useContent();
  return (
    <>
      <PageHeader
        title="Cardápio da Semana"
        subtitle="Refeições oferecidas no refeitório dos colaboradores — semana de 27/04 a 03/05/2026."
        breadcrumb="Cardápio"
        icon={<UtensilsCrossed className="w-7 h-7" />}
      />
      <section className="py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-5">
          {content.weeklyMenu.map((day) => (
            <Card key={day.day} className="overflow-hidden" data-testid={`cardapio-${day.day}`}>
              <div className="bg-gradient-to-r from-[hsl(199_30%_94%)] to-white px-6 py-4 border-b border-border flex items-center justify-between">
                <h3 className="font-serif font-bold text-lg text-[hsl(198_100%_28%)]">{day.day}</h3>
                <span className="text-xs text-muted-foreground font-medium">{day.date}</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-border">
                {day.meals.map((m) => {
                  const Icon = ICONS[m.name] ?? Soup;
                  return (
                    <div key={m.name} className="p-5">
                      <div className="flex items-center gap-2 text-[hsl(198_100%_28%)] mb-3">
                        <Icon className="w-4 h-4" />
                        <div className="font-semibold text-sm">{m.name}</div>
                      </div>
                      <ul className="text-xs text-muted-foreground space-y-1.5 leading-relaxed">
                        {m.items.map((it) => (
                          <li key={it} className="flex gap-2">
                            <span className="text-[hsl(110_67%_31%)] mt-0.5">▸</span>
                            <span>{it}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  );
                })}
              </div>
            </Card>
          ))}
        </div>
      </section>
    </>
  );
}
