import { Phone, Mail, MapPin, Activity, ExternalLink } from "lucide-react";
import { useContent } from "@/store/content";

export function Footer() {
  const { content } = useContent();
  const f = content.branding.footer;
  const t = content.branding.topBar;
  return (
    <footer className="mt-16 bg-[hsl(196_100%_18%)] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-11 h-11 rounded-md bg-white/10 flex items-center justify-center">
                <Activity className="w-6 h-6" strokeWidth={2.5} />
              </div>
              <div>
                <div className="font-serif font-bold text-xl">{f.primary}</div>
                <div className="text-[11px] uppercase tracking-wider text-white/70">{f.secondary}</div>
              </div>
            </div>
            <p className="text-sm text-white/80 max-w-md leading-relaxed">{f.description}</p>
          </div>

          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider mb-4 text-white">Contato</h4>
            <ul className="space-y-3 text-sm text-white/80">
              {t.phone && (
                <li className="flex items-start gap-2">
                  <Phone className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span>{t.phone}</span>
                </li>
              )}
              {t.email && (
                <li className="flex items-start gap-2">
                  <Mail className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <a href={`mailto:${t.email}`} className="hover:text-white">{t.email}</a>
                </li>
              )}
              {t.address && (
                <li className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span>{t.address}</span>
                </li>
              )}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider mb-4 text-white">Institucional</h4>
            <ul className="space-y-3 text-sm">
              {f.institucionalLinks.map((link, i) => (
                <li key={i}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="text-white/80 hover:text-white inline-flex items-center gap-1"
                  >
                    {link.label} <ExternalLink className="w-3 h-3" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/15 text-xs text-white/60 flex flex-col md:flex-row justify-between gap-2">
          <span>{f.copyright}</span>
          <span>{f.tagline}</span>
        </div>
      </div>
    </footer>
  );
}
