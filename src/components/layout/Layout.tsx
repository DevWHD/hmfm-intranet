import { ReactNode } from "react";
import { Link } from "wouter";

import { TopBar } from "./TopBar";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { GreetingStrip } from "./GreetingStrip";
import { useContent } from "@/store/content";

export function Layout({ children }: { children: ReactNode }) {
  const { content } = useContent();
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <TopBar />
      <Header />
      {content.branding.greeting.showGreeting && <GreetingStrip />}
      <main className="flex-1">{children}</main>
      <Footer />

    </div>
  );
}
