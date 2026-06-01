import { Link } from "wouter";
import { Clock, ArrowRight, Sun, Moon } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useContent } from "@/store/content";

export function EscalaHoje() {
  const { content } = useContent();
  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-serif text-xl font-bold text-[hsl(198_100%_28%)]">Escala de Hoje</h3>
        <Link
          href="/escalas"
          className="text-sm font-semibold text-[hsl(198_100%_28%)] hover:underline inline-flex items-center gap-1"
          data-testid="link-ver-mais-escalas"
        >
          Ver mais <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
      <div className="space-y-3">
        {content.todayShifts.map((s) => {
          const isDay = s.type === "diurno";
          const Icon = isDay ? Sun : Moon;
          return (
            <div
              key={s.id}
              className="rounded-lg border border-border p-3 flex items-center gap-3 hover:bg-[hsl(199_30%_97%)] transition-colors"
              data-testid={`shift-card-${s.id}`}
            >
              <Avatar className="w-9 h-9 flex-shrink-0">
                <AvatarFallback className="bg-[hsl(199_30%_94%)] text-[hsl(198_100%_28%)] text-[11px] font-bold">
                  {s.initials}
                </AvatarFallback>
              </Avatar>
              <div className="min-w-0 flex-1">
                <div className="font-semibold text-sm text-foreground truncate">{s.name}</div>
                <div className="text-xs text-muted-foreground inline-flex items-center gap-1.5">
                  <Clock className="w-3 h-3" />
                  {s.hours}
                </div>
              </div>
              <Badge
                variant="outline"
                className={`text-[10px] gap-1 ${
                  isDay
                    ? "bg-amber-50 text-amber-700 border-amber-200"
                    : "bg-indigo-50 text-indigo-700 border-indigo-200"
                }`}
              >
                <Icon className="w-3 h-3" />
                {isDay ? "Diurno" : "Noturno"}
              </Badge>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
