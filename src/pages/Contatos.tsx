import { useMemo, useState } from "react";
import { PhoneCall, Search, Phone } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { type Contact } from "@/data/contacts";
import { useContent } from "@/store/content";

export default function Contatos() {
  const { content } = useContent();
  const [query, setQuery] = useState("");

  const grouped = useMemo(() => {
    const filtered = content.contacts.filter((c) => {
      if (!query.trim()) return true;
      const q = query.toLowerCase();
      return c.sector.toLowerCase().includes(q) || c.ramal.includes(q) || c.role.toLowerCase().includes(q);
    });

    const map = new Map<string, Contact[]>();
    for (const c of filtered) {
      if (!map.has(c.sector)) map.set(c.sector, []);
      map.get(c.sector)!.push(c);
    }

    return Array.from(map.entries()).sort((a, b) => a[0].localeCompare(b[0]));
  }, [query, content.contacts]);

  return (
    <>
      <PageHeader
        title="Contatos & Ramais"
        subtitle="Diretório de setores e ramais internos do HMFM."
        breadcrumb="Contatos"
        icon={<PhoneCall className="w-7 h-7" />}
      />
      <section className="py-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative mb-6">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar por setor, função ou ramal..."
              className="pl-9"
              data-testid="input-search-contatos"
            />
          </div>

          {grouped.length === 0 ? (
            <Card className="p-12 text-center text-muted-foreground">Nenhum contato encontrado.</Card>
          ) : (
            <div className="space-y-5">
              {grouped.map(([sector, list]) => (
                <Card key={sector} className="overflow-hidden" data-testid={`contact-sector-${sector}`}>
                  <div className="bg-[hsl(199_30%_94%)] px-5 py-2.5 border-b border-border">
                    <h3 className="font-serif font-bold text-sm text-[hsl(198_100%_28%)]">{sector}</h3>
                  </div>
                  <div className="divide-y divide-border">
                    {list.map((c) => (
                      <div
                        key={c.id}
                        className="px-5 py-4 flex items-center justify-between gap-4 hover:bg-[hsl(199_30%_97%)]/40 transition-colors"
                        data-testid={`contact-${c.id}`}
                      >
                        <div className="min-w-0">
                          <div className="font-medium text-sm text-foreground">{c.role}</div>
                          <div className="text-xs text-muted-foreground">Sem nome publicado</div>
                        </div>
                        <a
                          href={`tel:${c.ramal}`}
                          className="inline-flex items-center gap-1.5 text-sm font-semibold text-foreground hover:text-[hsl(198_100%_28%)] whitespace-nowrap"
                        >
                          <Phone className="w-3.5 h-3.5" /> Ramal {c.ramal}
                        </a>
                      </div>
                    ))}
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
