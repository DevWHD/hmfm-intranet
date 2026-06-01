
import { motion } from "framer-motion";
import { Building2, Phone, MapPin, User } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card } from "@/components/ui/card";
import { useContent } from "@/store/content";
import { getIcon } from "@/lib/icons";

export default function Setores() {
  const { content } = useContent();
  return (
    <>
      <PageHeader
        title="Setores"
        subtitle="Conheça os setores assistenciais e de apoio do HMFM, com ramais, responsáveis e localização."
        breadcrumb="Setores"
        icon={<Building2 className="w-7 h-7" />}
      />
      <section className="py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {content.sectors.map((s, i) => {
              const Icon = getIcon(s.icon);
              return (
                <motion.div
                  key={s.id}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-30px" }}
                  transition={{ duration: 0.4, delay: i * 0.04 }}
                >
                  <Card className="p-6 h-full hover:border-[hsl(198_100%_28%)]/40 hover:shadow-md transition-all" data-testid={`setor-${s.id}`}>
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-lg bg-[hsl(199_30%_94%)] text-[hsl(198_100%_28%)] flex items-center justify-center flex-shrink-0">
                        <Icon className="w-6 h-6" strokeWidth={1.8} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="font-serif font-bold text-lg text-[hsl(198_100%_28%)]">{s.name}</h3>
                        <p className="text-sm text-muted-foreground mt-1.5 leading-relaxed">{s.description}</p>
                      </div>
                    </div>
                    <div className="mt-5 pt-4 border-t border-border space-y-2 text-xs">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Phone className="w-3.5 h-3.5 text-[hsl(198_100%_28%)]" />
                        <span className="font-medium text-foreground">Ramal {s.ramal}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <User className="w-3.5 h-3.5 text-[hsl(198_100%_28%)]" />
                        <span>{s.responsavel}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <MapPin className="w-3.5 h-3.5 text-[hsl(198_100%_28%)]" />
                        <span>{s.localizacao}</span>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
