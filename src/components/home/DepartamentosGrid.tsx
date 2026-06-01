import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useContent } from "@/store/content";
import { getIcon } from "@/lib/icons";

export function DepartamentosGrid() {
  const { content } = useContent();
  const { eyebrow, title, subtitle } = content.branding.departamentos;

  return (
    <section className="py-14 sm:py-16 bg-[hsl(199_30%_97%)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <div className="text-xs font-semibold uppercase tracking-widest text-[hsl(198_100%_28%)] mb-2">
            {eyebrow}
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[hsl(198_100%_28%)]">
            {title}
          </h2>
          {subtitle && (
            <p className="mt-3 text-muted-foreground max-w-xl mx-auto">{subtitle}</p>
          )}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {content.departments.map((d, i) => {
            const Icon = getIcon(d.icon);
            return (
              <Link key={d.id} href={d.href} className="block">
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-30px" }}
                  transition={{ duration: 0.4, delay: i * 0.04 }}
                  whileHover={{ y: -3 }}
                  className="bg-white rounded-xl border border-border p-5 h-full hover:border-[hsl(198_100%_28%)]/40 hover:shadow-md transition-all group"
                  data-testid={`departamento-${d.id}`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-11 h-11 rounded-lg bg-[hsl(199_30%_94%)] text-[hsl(198_100%_28%)] flex items-center justify-center">
                      <Icon className="w-5 h-5" />
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-[hsl(198_100%_28%)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                  </div>
                  <div className="font-semibold text-foreground">{d.name}</div>
                  <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">{d.description}</p>
                </motion.div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
