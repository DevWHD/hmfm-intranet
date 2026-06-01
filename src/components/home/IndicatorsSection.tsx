import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useContent } from "@/store/content";
import { getIcon } from "@/lib/icons";

function CountUp({ value, prefix = "" }: { value: number; prefix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const duration = 1600;
    const start = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.floor(value * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value]);

  return (
    <span ref={ref}>
      {prefix}
      {n.toLocaleString("pt-BR")}
    </span>
  );
}

export function IndicatorsSection() {
  const { content } = useContent();
  const { eyebrow, title, items } = content.branding.indicators;

  return (
    <section className="bg-gradient-to-r from-[hsl(196_100%_21%)] via-[hsl(198_100%_24%)] to-[hsl(196_100%_21%)] text-white relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "linear-gradient(45deg, white 1px, transparent 1px), linear-gradient(-45deg, white 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-14 relative">
        <div className="text-center mb-10">
          <div className="text-xs font-semibold uppercase tracking-widest text-white/70 mb-2">
            {eyebrow}
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold">{title}</h2>
        </div>
        <div
          className="grid grid-cols-1 gap-6"
          style={{ gridTemplateColumns: `repeat(${Math.min(items.length || 1, 4)}, minmax(0, 1fr))` }}
        >
          {items.map((ind, i) => {
            const Icon = getIcon(ind.icon);
            return (
              <motion.div
                key={ind.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="text-center"
                data-testid={`indicator-${ind.id}`}
              >
                <div className="w-14 h-14 mx-auto mb-3 rounded-full bg-white/10 backdrop-blur flex items-center justify-center border border-white/20">
                  <Icon className="w-7 h-7 text-white" strokeWidth={1.8} />
                </div>
                <div className="font-serif text-4xl sm:text-5xl font-bold tracking-tight">
                  <CountUp value={ind.value} prefix={ind.prefix} />
                </div>
                <div className="mt-1 text-sm text-white/80 uppercase tracking-wider">{ind.label}</div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
