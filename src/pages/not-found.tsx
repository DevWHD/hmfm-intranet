import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Activity, Home as HomeIcon } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4 py-20">
      <div className="text-center max-w-md">
        <div className="w-16 h-16 rounded-full bg-[hsl(199_30%_94%)] text-[hsl(198_100%_28%)] flex items-center justify-center mx-auto mb-6">
          <Activity className="w-8 h-8" strokeWidth={2.2} />
        </div>
        <h1 className="font-serif text-5xl font-bold text-[hsl(198_100%_28%)]">404</h1>
        <p className="mt-3 text-muted-foreground">
A página que você procura não foi encontrada na intranet do HMFM.
        </p>
        <Button asChild className="mt-6 bg-[hsl(198_100%_28%)] hover:bg-[hsl(198_100%_24%)] gap-2">
          <Link href="/">
            <HomeIcon className="w-4 h-4" /> Voltar ao início
          </Link>
        </Button>
      </div>
    </div>
  );
}
