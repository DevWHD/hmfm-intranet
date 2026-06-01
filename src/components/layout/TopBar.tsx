import { Phone, MapPin, Mail } from "lucide-react";
import { useContent } from "@/store/content";

export function TopBar() {
  const { content } = useContent();
  const t = content.branding.topBar;
  return (
    <div className="bg-[hsl(196_100%_18%)] text-white text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-9 flex items-center justify-between gap-4">
        <div className="flex items-center gap-5 overflow-hidden">
          {t.phone && (
            <a
              href={`tel:${t.phone.replace(/\D/g, "")}`}
              className="flex items-center gap-1.5 hover:text-white/80 transition-colors whitespace-nowrap"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>{t.phone}</span>
            </a>
          )}
          {t.email && (
            <a
              href={`mailto:${t.email}`}
              className="hidden sm:flex items-center gap-1.5 hover:text-white/80 transition-colors whitespace-nowrap"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>{t.email}</span>
            </a>
          )}
          {t.address && (
            <span className="hidden md:flex items-center gap-1.5 whitespace-nowrap text-white/80">
              <MapPin className="w-3.5 h-3.5" />
              <span>{t.address}</span>
            </span>
          )}
        </div>
        {t.rightText && (
          <div className="hidden md:flex items-center gap-4 text-white/85">
            <span>{t.rightText}</span>
          </div>
        )}
      </div>
    </div>
  );
}
