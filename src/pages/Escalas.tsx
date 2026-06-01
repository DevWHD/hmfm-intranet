import { CalendarDays } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useContent } from "@/store/content";

export default function Escalas() {
  const { content } = useContent();
  return (
    <>
      <PageHeader
        title="Escalas de Plantão"
        subtitle="Distribuição semanal de plantonistas por setor — semana de 27/04 a 03/05/2026."
        breadcrumb="Escalas"
        icon={<CalendarDays className="w-7 h-7" />}
      />
      <section className="py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          {content.weekSchedule.map((sec) => (
            <Card key={sec.sector} className="overflow-hidden" data-testid={`schedule-${sec.sector}`}>
              <div className="bg-[hsl(199_30%_94%)] px-5 py-3 border-b border-border">
                <h3 className="font-serif font-bold text-[hsl(198_100%_28%)]">{sec.sector}</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left px-5 py-3 font-semibold text-muted-foreground text-xs uppercase">Profissional</th>
                      <th className="text-left px-5 py-3 font-semibold text-muted-foreground text-xs uppercase">Função</th>
                      <th className="text-left px-3 py-3 font-semibold text-muted-foreground text-xs uppercase">Turno</th>
                      <th className="text-left px-3 py-3 font-semibold text-muted-foreground text-xs uppercase">Dias</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sec.rows.map((r) => {
                      const first = r.days[0];
                      return (
                        <tr key={r.name} className="border-b border-border last:border-0 hover:bg-[hsl(199_30%_97%)]/50">
                          <td className="px-5 py-3 font-medium text-foreground">{r.name}</td>
                          <td className="px-5 py-3 text-muted-foreground">{r.role}</td>
                          <td className="px-3 py-3">
                            {first && (
                              <Badge
                                variant="outline"
                                className={`text-[10px] ${
                                  first.type === "diurno"
                                    ? "bg-amber-50 text-amber-700 border-amber-200"
                                    : "bg-indigo-50 text-indigo-700 border-indigo-200"
                                }`}
                              >
                                {first.hours}
                              </Badge>
                            )}
                          </td>
                          <td className="px-3 py-3">
                            <div className="flex gap-1 flex-wrap">
                              {r.days.map((d) => (
                                <span
                                  key={d.day}
                                  className={`text-[10px] font-semibold w-9 h-7 rounded flex items-center justify-center ${
                                    d.type === "diurno"
                                      ? "bg-amber-100 text-amber-700"
                                      : "bg-indigo-100 text-indigo-700"
                                  }`}
                                >
                                  {d.day}
                                </span>
                              ))}
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </Card>
          ))}
        </div>
      </section>
    </>
  );
}
