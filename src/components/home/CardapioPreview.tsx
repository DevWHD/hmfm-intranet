import { Link } from "wouter";
import { Coffee, Soup, Cookie, Moon, ArrowRight, UtensilsCrossed } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useContent } from "@/store/content";

const MEAL_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  Café: Coffee,
  "Café da manhã": Coffee,
  Almoço: Soup,
  Lanche: Cookie,
  "Lanche da tarde": Cookie,
  Jantar: Moon,
};

export function CardapioPreview() {
  const { content } = useContent();
  const todayMenu = content.todayMenu;
  return (
    <Card className="p-6">
      <div className="flex items-start justify-between mb-5">
        <div>
          <div className="flex items-center gap-2 text-[hsl(198_100%_28%)]">
            <UtensilsCrossed className="w-5 h-5" />
            <div className="text-xs font-semibold uppercase tracking-widest">Cardápio do Dia</div>
          </div>
          <h3 className="font-serif text-xl font-bold text-[hsl(198_100%_28%)] mt-1">
            {todayMenu.day} · {todayMenu.date}
          </h3>
        </div>
        <Link
          href="/cardapio"
          className="text-sm font-semibold text-[hsl(198_100%_28%)] hover:underline inline-flex items-center gap-1"
          data-testid="link-cardapio-semana"
        >
          Semana <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {todayMenu.meals.map((m) => {
          const Icon = MEAL_ICONS[m.name] ?? Soup;
          return (
            <div
              key={m.name}
              className="rounded-lg border border-border bg-[hsl(199_30%_97%)]/40 p-4"
              data-testid={`meal-${m.name}`}
            >
              <div className="flex items-center gap-2 mb-2 text-[hsl(198_100%_28%)]">
                <Icon className="w-4 h-4" />
                <div className="font-semibold text-sm">{m.name}</div>
              </div>
              <ul className="text-xs text-muted-foreground space-y-1 leading-relaxed">
                {m.items.map((it) => (
                  <li key={it} className="flex gap-2">
                    <span className="text-[hsl(198_100%_28%)]">·</span>
                    <span>{it}</span>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
