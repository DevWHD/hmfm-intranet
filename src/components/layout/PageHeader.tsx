import { Link } from "wouter";
import { ChevronRight, Home as HomeIcon } from "lucide-react";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  breadcrumb: string;
  icon?: React.ReactNode;
}

export function PageHeader({ title, subtitle, breadcrumb, icon }: PageHeaderProps) {
  return (
    <section className="bg-gradient-to-br from-[hsl(199_30%_97%)] via-white to-[hsl(199_30%_97%)] border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <nav className="flex items-center gap-1.5 text-xs text-muted-foreground mb-4">
          <Link href="/" className="flex items-center gap-1 hover:text-[hsl(198_100%_28%)] transition-colors">
            <HomeIcon className="w-3.5 h-3.5" />
            Início
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-[hsl(198_100%_28%)] font-semibold">{breadcrumb}</span>
        </nav>
        <div className="flex items-start gap-4">
          {icon && (
            <div className="w-14 h-14 rounded-lg bg-[hsl(198_100%_28%)] text-white flex items-center justify-center shadow-md flex-shrink-0">
              {icon}
            </div>
          )}
          <div className="min-w-0">
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[hsl(198_100%_28%)] leading-tight">
              {title}
            </h1>
            {subtitle && (
              <p className="mt-2 text-sm sm:text-base text-muted-foreground max-w-2xl">{subtitle}</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
