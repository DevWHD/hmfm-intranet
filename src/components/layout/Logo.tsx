import { Link } from "wouter";
import { Activity } from "lucide-react";
import { useContent } from "@/store/content";

export function Logo() {
  const { content } = useContent();
  const l = content.branding.logo;
  return (
    <Link href="/" className="flex items-center gap-3 group">
      {l.imageUrl ? (
        <img
          src={l.imageUrl}
          alt={l.primary}
          className="w-11 h-11 rounded-md object-cover shadow-md group-hover:shadow-lg transition-shadow"
        />
      ) : (
        <div className="w-11 h-11 rounded-md bg-gradient-to-br from-[hsl(198_100%_28%)] to-[hsl(196_100%_18%)] flex items-center justify-center text-white shadow-md group-hover:shadow-lg transition-shadow">
          <Activity className="w-6 h-6" strokeWidth={2.5} />
        </div>
      )}
      <div className="leading-tight">
        <div className="font-serif text-[hsl(198_100%_28%)] font-bold text-lg sm:text-xl tracking-tight">
          {l.primary}
        </div>
        <div className="text-[10px] sm:text-[11px] text-muted-foreground font-medium uppercase tracking-wider">
          {l.secondary}
        </div>
      </div>
    </Link>
  );
}
