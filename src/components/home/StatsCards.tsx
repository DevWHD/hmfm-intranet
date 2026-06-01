import { motion } from "framer-motion";
import { MessageSquare, CalendarDays, FolderOpen, AlertTriangle } from "lucide-react";
import { useContent } from "@/store/content";

export function StatsCards() {
  const { content } = useContent();
  const stats = [
    {
      icon: MessageSquare,
      label: "Avisos esta semana",
      value: content.notices.filter((n) => n.daysAgo <= 7).length,
      color: "text-[hsl(198_100%_28%)]",
    },
    {
      icon: CalendarDays,
      label: "Escalas hoje",
      value: content.todayShifts.length,
      color: "text-[hsl(184_100%_32%)]",
    },
    {
      icon: FolderOpen,
      label: "Documentos",
      value: content.documents.length,
      color: "text-[hsl(110_67%_31%)]",
    },
    {
      icon: AlertTriangle,
      label: "Urgentes pendentes",
      value: content.urgentComms.filter((u) => u.severity === "alta").length,
      color: "text-destructive",
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((s, i) => {
        const Icon = s.icon;
        return (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
            className="rounded-xl bg-white border border-border p-5 shadow-sm hover:shadow-md transition-shadow"
            data-testid={`stat-card-${i}`}
          >
            <div className="flex items-start justify-between">
              <div>
                <div className="font-serif text-3xl sm:text-4xl font-bold text-foreground">{s.value}</div>
                <div className="text-xs text-muted-foreground mt-1">{s.label}</div>
              </div>
              <div className={`w-9 h-9 rounded-lg bg-[hsl(199_30%_97%)] flex items-center justify-center ${s.color}`}>
                <Icon className="w-5 h-5" />
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
