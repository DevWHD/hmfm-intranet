import { useMemo, useState } from "react";
import { FolderOpen, Search, FileText, FileSpreadsheet, Download } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { type DocCategory } from "@/data/documents";
import { useContent } from "@/store/content";

type Filter = "Todos" | DocCategory;

const filters: Filter[] = ["Todos", "Protocolos Clínicos", "Manuais", "Formulários", "POPs", "Resoluções"];

const TYPE_ICON: Record<string, React.ComponentType<{ className?: string }>> = {
  PDF: FileText,
  DOC: FileText,
  XLS: FileSpreadsheet,
};

const TYPE_COLOR: Record<string, string> = {
  PDF: "bg-red-50 text-red-700 border-red-200",
  DOC: "bg-blue-50 text-blue-700 border-blue-200",
  XLS: "bg-emerald-50 text-emerald-700 border-emerald-200",
};

export default function Documentos() {
  const { content } = useContent();
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<Filter>("Todos");

  const filtered = useMemo(() => {
    return content.documents.filter((d) => {
      if (filter !== "Todos" && d.category !== filter) return false;
      if (query.trim()) {
        const q = query.toLowerCase();
        return (
          d.title.toLowerCase().includes(q) ||
          d.description.toLowerCase().includes(q) ||
          d.sector.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [query, filter, content.documents]);

  return (
    <>
      <PageHeader
        title="Documentos & Protocolos"
        subtitle="Repositório institucional de protocolos clínicos, manuais, formulários e procedimentos operacionais padrão."
        breadcrumb="Documentos"
        icon={<FolderOpen className="w-7 h-7" />}
      />
      <section className="py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Buscar documento, setor ou descrição..."
                className="pl-9"
                data-testid="input-search-documentos"
              />
            </div>
            <div className="flex gap-2 overflow-x-auto">
              {filters.map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  data-testid={`filter-doc-${f}`}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap border transition-colors ${
                    filter === f
                      ? "bg-[hsl(198_100%_28%)] text-white border-[hsl(198_100%_28%)]"
                      : "bg-white text-foreground border-border hover:border-[hsl(198_100%_28%)]/40"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filtered.map((d) => {
              const Icon = TYPE_ICON[d.type] ?? FileText;
              return (
                <Card key={d.id} className="p-5 hover:border-[hsl(198_100%_28%)]/40 hover:shadow-md transition-all" data-testid={`document-${d.id}`}>
                  <div className="flex gap-4">
                    <div className={`w-12 h-12 rounded-lg ${TYPE_COLOR[d.type]} flex items-center justify-center flex-shrink-0 border`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-2 flex-wrap">
                        <h3 className="font-semibold text-foreground leading-snug">{d.title}</h3>
                        <Badge variant="outline" className="text-[10px]">
                          {d.category}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground mt-2 leading-relaxed">{d.description}</p>
                      <div className="mt-3 flex items-center justify-between gap-2 flex-wrap">
                        <div className="text-[11px] text-muted-foreground">
                          {d.sector} · {d.type} · {d.size} · atualizado {d.updatedAt}
                        </div>
                        <Button size="sm" variant="outline" className="h-7 gap-1 text-xs" data-testid={`download-${d.id}`}>
                          <Download className="w-3 h-3" />
                          Baixar
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>

          {filtered.length === 0 && (
            <Card className="p-12 text-center text-muted-foreground mt-4">Nenhum documento encontrado.</Card>
          )}
        </div>
      </section>
    </>
  );
}
