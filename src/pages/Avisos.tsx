import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Megaphone, Search, Heart } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
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

type Filter = "todos" | NoticePriority;

const filters: { id: Filter; label: string }[] = [
  { id: "todos", label: "Todos" },
  { id: "alta", label: "Alta prioridade" },
  { id: "normal", label: "Normal" },
  { id: "informativo", label: "Informativo" },
];

export default function Avisos() {
  const { content } = useContent();
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<Filter>("todos");

  const filtered = useMemo(() => {
    return content.notices.filter((n) => {
      if (filter !== "todos" && n.priority !== filter) return false;
      if (query.trim()) {
        const q = query.toLowerCase();
        return (
          n.title.toLowerCase().includes(q) ||
          n.body.toLowerCase().includes(q) ||
          n.author.toLowerCase().includes(q) ||
          n.sector.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [query, filter, content.notices]);

  return (
    <>
      <PageHeader
        title="Mural de Avisos"
subtitle="Comunicações oficiais, atualizações de protocolo e recados internos para a equipe HMFM."
        breadcrumb="Mural de Avisos"
        icon={<Megaphone className="w-7 h-7" />}
      />
      <section className="py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Buscar avisos por título, autor, setor..."
                className="pl-9"
                data-testid="input-search-avisos"
              />
            </div>
            <div className="flex gap-2 overflow-x-auto">
              {filters.map((f) => (
                <button
                  key={f.id}
                  onClick={() => setFilter(f.id)}
                  data-testid={`filter-${f.id}`}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap border transition-colors ${
                    filter === f.id
                      ? "bg-[hsl(198_100%_28%)] text-white border-[hsl(198_100%_28%)]"
                      : "bg-white text-foreground border-border hover:border-[hsl(198_100%_28%)]/40"
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          {filtered.length === 0 ? (
            <Card className="p-12 text-center text-muted-foreground">
              Nenhum aviso encontrado para sua busca.
            </Card>
          ) : (
            <div className="space-y-3">
              {filtered.map((n, i) => {
                const p = priorityStyle[n.priority];
                return (
                  <motion.div
                    key={n.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: i * 0.04 }}
                  >
                    <Card className="p-5 hover:border-[hsl(198_100%_28%)]/40 transition-colors" data-testid={`aviso-${n.id}`}>
                      <div className="flex gap-4">
                        <Avatar className="w-11 h-11 flex-shrink-0">
                          <AvatarFallback className="bg-[hsl(199_30%_94%)] text-[hsl(198_100%_28%)] text-xs font-bold">
                            {n.authorInitials}
                          </AvatarFallback>
                        </Avatar>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-start justify-between gap-3 flex-wrap">
                            <h3 className="font-semibold text-foreground text-base sm:text-lg leading-snug">{n.title}</h3>
                            <Badge variant="outline" className={`flex-shrink-0 text-[10px] ${p.cls}`}>
                              {p.label}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{n.body}</p>
                          <div className="mt-3 flex items-center gap-3 text-xs text-muted-foreground flex-wrap">
                            <span className="font-medium text-foreground/70">{n.author}</span>
                            <span>·</span>
                            <span>{n.authorRole}</span>
                            <span>·</span>
                            <span>{relativeDays(n.daysAgo)}</span>
                            <span>·</span>
                            <span>Setor: {n.sector}</span>
                            <span>·</span>
                            <span className="inline-flex items-center gap-1">
                              <Heart className="w-3 h-3" /> {n.likes}
                            </span>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
