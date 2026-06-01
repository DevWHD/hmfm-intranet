import { Link } from "wouter";
import { motion } from "framer-motion";
import { Heart, ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { type NoticePriority } from "@/data/notices";
import { relativeDays } from "@/lib/format";
import { useContent } from "@/store/content";

const priorityStyle: Record<NoticePriority, { label: string; cls: string }> = {
  alta: { label: "Alta prioridade", cls: "bg-orange-100 text-orange-700 border-orange-200" },
  normal: { label: "Normal", cls: "bg-blue-100 text-blue-700 border-blue-200" },
  informativo: { label: "Informativo", cls: "bg-emerald-100 text-emerald-700 border-emerald-200" },
};

export function AvisosRecentes() {
  const { content } = useContent();
  const items = content.notices.slice(0, 4);
  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-serif text-xl font-bold text-[hsl(198_100%_28%)]">Avisos Recentes</h3>
        <Link
          href="/avisos"
          className="text-sm font-semibold text-[hsl(198_100%_28%)] hover:underline inline-flex items-center gap-1"
          data-testid="link-ver-todos-avisos"
        >
          Ver todos <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
      <div className="space-y-3">
        {items.map((n, i) => {
          const p = priorityStyle[n.priority];
          return (
            <motion.div
              key={n.id}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: i * 0.05 }}
              className="rounded-lg border border-border p-4 hover:border-[hsl(198_100%_28%)]/40 hover:bg-[hsl(199_30%_97%)] transition-colors cursor-pointer"
              data-testid={`notice-card-${n.id}`}
            >
              <div className="flex gap-3">
                <Avatar className="w-10 h-10 flex-shrink-0">
                  <AvatarFallback className="bg-[hsl(199_30%_94%)] text-[hsl(198_100%_28%)] text-xs font-bold">
                    {n.authorInitials}
                  </AvatarFallback>
                </Avatar>
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-3">
                    <h4 className="font-semibold text-foreground text-sm sm:text-base leading-snug">{n.title}</h4>
                    <Badge variant="outline" className={`flex-shrink-0 text-[10px] px-2 py-0 h-5 ${p.cls}`}>
                      {p.label}
                    </Badge>
                  </div>
                  <div className="mt-2 flex items-center gap-3 text-xs text-muted-foreground">
                    <span className="font-medium text-foreground/70">{n.author}</span>
                    <span>·</span>
                    <span>{relativeDays(n.daysAgo)}</span>
                    <span>·</span>
                    <span className="inline-flex items-center gap-1">
                      <Heart className="w-3 h-3" /> {n.likes}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </Card>
  );
}
