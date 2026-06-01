import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useContent } from "@/store/content";
import { getIcon } from "@/lib/icons";

const COLOR_CLASSES: Record<string, { bg: string; text: string }> = {
  blue: { bg: "bg-[hsl(198_100%_28%)]", text: "text-[hsl(198_100%_28%)]" },
  darkblue: { bg: "bg-[hsl(196_100%_21%)]", text: "text-[hsl(196_100%_21%)]" },
  teal: { bg: "bg-[hsl(184_100%_32%)]", text: "text-[hsl(184_100%_32%)]" },
  green: { bg: "bg-[hsl(110_67%_31%)]", text: "text-[hsl(110_67%_31%)]" },
};

export function SistemasGrid() {
  const { content } = useContent();
  const { eyebrow, title, subtitle } = content.branding.sistemas;

  return (
    <section className="py-14 sm:py-16">
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {content.systems.map((s, i) => {
            const Icon = getIcon(s.icon);
            const c = COLOR_CLASSES[s.color] ?? COLOR_CLASSES.blue;
            return (
              <motion.button
                key={s.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.45, delay: i * 0.06 }}
                whileHover={{ y: -4 }}
                className={`group relative bg-white rounded-xl border border-border p-6 text-left shadow-sm hover:shadow-lg transition-all`}
                data-testid={`system-card-${s.id}`}
              >
                <div className={`w-12 h-12 rounded-lg ${c.bg} text-white flex items-center justify-center shadow-md mb-4`}>
                  <Icon className="w-6 h-6" strokeWidth={2} />
                </div>
                <div className={`font-bold text-lg ${c.text}`}>{s.name}</div>
                <p className="text-sm text-muted-foreground mt-1.5 leading-relaxed">{s.description}</p>
                <div className={`mt-4 inline-flex items-center gap-1.5 text-sm font-semibold ${c.text} group-hover:gap-2 transition-all`}>
                  Acessar
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
