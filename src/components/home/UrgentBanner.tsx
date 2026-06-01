import { Link } from "wouter";
import { motion } from "framer-motion";
import { AlertTriangle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useContent } from "@/store/content";

export function UrgentBanner() {
  const { content } = useContent();
  const high = content.urgentComms.filter((c) => c.severity === "alta");
  if (high.length === 0) return null;
  const first = high[0];
  const ctaLabel = content.branding.urgentBanner.ctaLabel;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="rounded-xl border border-destructive/30 bg-destructive/5 p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
      data-testid="urgent-banner"
    >
      <div className="flex items-start gap-3 min-w-0">
        <div className="w-10 h-10 rounded-full bg-destructive/15 flex items-center justify-center flex-shrink-0">
          <AlertTriangle className="w-5 h-5 text-destructive" />
        </div>
        <div className="min-w-0">
          <div className="font-semibold text-destructive text-sm">
            {high.length} comunicado{high.length > 1 ? "s" : ""} urgente{high.length > 1 ? "s" : ""} pendente{high.length > 1 ? "s" : ""}
          </div>
          <div className="text-foreground text-sm mt-0.5 truncate font-medium">{first.title}</div>
        </div>
      </div>
      <Button
        asChild
        className="bg-destructive hover:bg-destructive/90 text-destructive-foreground gap-2 w-full sm:w-auto"
        data-testid="button-ver-urgentes"
      >
        <Link href="/comunicados-urgentes">
          {ctaLabel}
          <ArrowRight className="w-4 h-4" />
        </Link>
      </Button>
    </motion.div>
  );
}
