import { Link, useLocation } from "wouter";
import { Logo } from "./Logo";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Menu, MessageCircle, LogIn } from "lucide-react";
import { useState } from "react";
import { useContent } from "@/store/content";
import { getIcon } from "@/lib/icons";
import type { ButtonVariant, HeaderButton } from "@/data/branding";

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary: "bg-[hsl(198_100%_28%)] hover:bg-[hsl(198_100%_24%)] text-white",
  outline: "",
  green: "bg-[hsl(110_67%_31%)] hover:bg-[hsl(110_67%_27%)] text-white",
  darkblue: "bg-[hsl(196_100%_21%)] hover:bg-[hsl(196_100%_18%)] text-white",
  gradient:
    "rounded-full bg-gradient-to-r from-[hsl(198_100%_28%)] to-[hsl(184_100%_32%)] hover:opacity-90 text-white shadow-md",
};

function HeaderButtonView({ btn }: { btn: HeaderButton }) {
  const Icon = getIcon(btn.icon);
  const isInternal = btn.href.startsWith("/");
  const className = `h-9 gap-1.5 ${VARIANT_CLASSES[btn.variant]}`;

  const inner = (
    <>
      <Icon className="w-4 h-4" />
      {btn.label}
    </>
  );

  if (isInternal) {
    return (
      <Button asChild size="sm" variant={btn.variant === "outline" ? "outline" : "default"} className={className} data-testid={`button-${btn.id}`}>
        <Link href={btn.href}>{inner}</Link>
      </Button>
    );
  }
  return (
    <Button asChild size="sm" variant={btn.variant === "outline" ? "outline" : "default"} className={className} data-testid={`button-${btn.id}`}>
      <a href={btn.href} target={btn.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer">
        {inner}
      </a>
    </Button>
  );
}

export function Header() {
  const [location] = useLocation();
  const [open, setOpen] = useState(false);
  const { content } = useContent();
  const navLinks = content.branding.navLinks;
  const headerButtons = content.branding.headerButtons;

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          <Logo />

          <div className="hidden lg:flex items-center gap-2">
            {headerButtons.map((b) => (
              <HeaderButtonView key={b.id} btn={b} />
            ))}
          </div>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden" data-testid="button-menu">
                <Menu className="w-6 h-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[360px]">
              <SheetHeader>
                <SheetTitle className="text-left">Menu</SheetTitle>
              </SheetHeader>
              <nav className="mt-6 flex flex-col gap-1">
                {navLinks.map((link) => {
                  const Icon = getIcon(link.icon);
                  const active = location === link.href;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors ${
                        active
                          ? "bg-[hsl(199_30%_94%)] text-[hsl(198_100%_28%)]"
                          : "text-foreground hover:bg-[hsl(199_30%_97%)]"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      {link.label}
                    </Link>
                  );
                })}
              </nav>
              <div className="mt-6 flex flex-col gap-2 border-t border-border pt-4">
                <Button className="bg-[hsl(110_67%_31%)] hover:bg-[hsl(110_67%_27%)] text-white gap-2 justify-start">
                  <MessageCircle className="w-4 h-4" /> Whatsapp
                </Button>
                <Button variant="outline" className="gap-2 justify-start">
                  <LogIn className="w-4 h-4" /> Log In
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        <nav className="hidden lg:flex items-center gap-1 -mt-1 pb-2 overflow-x-auto">
          {navLinks.map((link) => {
            const active = location === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                data-testid={`nav-${link.href.replace(/\//g, "") || "home"}`}
                className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors whitespace-nowrap ${
                  active
                    ? "bg-[hsl(199_30%_94%)] text-[hsl(198_100%_28%)]"
                    : "text-foreground/75 hover:bg-[hsl(199_30%_97%)] hover:text-[hsl(198_100%_28%)]"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
