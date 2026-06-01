import { useEffect, useState } from "react";
import { CalendarDays } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { formatLongDate, getGreeting } from "@/lib/format";
import { useContent } from "@/store/content";

export function GreetingStrip() {
  const { content } = useContent();
  const g = content.branding.greeting;
  const firstName = g.userName.split(" ").slice(0, 2).join(" ");
  const [now, setNow] = useState<Date>(() => new Date(2026, 3, 29, 8, 30));

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 60_000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="bg-[hsl(199_30%_97%)] border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 min-w-0">
          <CalendarDays className="w-5 h-5 text-[hsl(198_100%_28%)] flex-shrink-0" />
          <div className="text-sm min-w-0">
            <span className="font-semibold text-[hsl(198_100%_28%)]">
              {getGreeting(now)}, {firstName}
            </span>
            <span className="text-muted-foreground hidden sm:inline">
              {" · "}{formatLongDate(now)}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <div className="text-right hidden md:block leading-tight">
            <div className="text-xs font-semibold text-foreground">{g.userName}</div>
            <div className="text-[11px] text-muted-foreground">
              {g.userRole}{g.sector ? ` · ${g.sector}` : ""}
            </div>
          </div>
          <Avatar className="w-9 h-9 ring-2 ring-[hsl(198_100%_28%)] ring-offset-2 ring-offset-[hsl(199_30%_97%)]">
            <AvatarFallback className="bg-[hsl(198_100%_28%)] text-white text-xs font-semibold">
              {g.userInitials}
            </AvatarFallback>
          </Avatar>
        </div>
      </div>
    </div>
  );
}
