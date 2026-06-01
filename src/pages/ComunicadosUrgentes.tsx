import { Siren, AlertTriangle, AlertCircle, Info, Clock } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { type Severity } from "@/data/urgentComms";
import { useContent } from "@/store/content";

const SEV: Record<Severity, { label: string; cls: string; icon: React.ComponentType<{ className?: string }> }> = {
  alta: { label: "Crítico", cls: "bg-red-50 text-red-700 border-red-200", icon: AlertTriangle },
  media: { label: "Atenção", cls: "bg-amber-50 text-amber-700 border-amber-200", icon: AlertCircle },
  baixa: { label: "Informativo", cls: "bg-blue-50 text-blue-700 border-blue-200", icon: Info },
};

export default function ComunicadosUrgentes() {
  const { content } = useContent();
  return (
    <>
      <PageHeader
        title="Comunicados Urgentes"
        subtitle="Alertas oficiais que exigem atenção imediata da equipe assistencial e administrativa."
        breadcrumb="Comunicados Urgentes"
        icon={<Siren className="w-7 h-7" />}
      />
      <section className="py-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          {content.urgentComms.map((c) => {
            const s = SEV[c.severity];
            const Icon = s.icon;
            return (
              <Card
                key={c.id}
                className={`p-6 border-l-4 ${
                  c.severity === "alta"
                    ? "border-l-red-500"
                    : c.severity === "media"
                    ? "border-l-amber-500"
                    : "border-l-blue-500"
                }`}
                data-testid={`urgent-${c.id}`}
              >
                <div className="flex items-start gap-4">
                  <div className={`w-11 h-11 rounded-full ${s.cls} flex items-center justify-center flex-shrink-0 border`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-3 flex-wrap">
                      <h3 className="font-semibold text-foreground text-base sm:text-lg leading-snug">{c.title}</h3>
                      <Badge variant="outline" className={`text-[10px] ${s.cls}`}>
                        {s.label}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mt-3 leading-relaxed">{c.body}</p>
                    <div className="mt-4 flex items-center gap-3 text-xs text-muted-foreground flex-wrap">
                      <span className="inline-flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {c.publishedAt}
                      </span>
                      <span>·</span>
                      <span className="font-medium text-foreground/70">{c.author}</span>
                      <span>·</span>
                      <span>Setor: {c.sector}</span>
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </section>
    </>
  );
}
