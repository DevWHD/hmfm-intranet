import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Layout } from "@/components/layout/Layout";
import { ContentProvider } from "@/store/content";
import Home from "@/pages/Home";
import Avisos from "@/pages/Avisos";
import Escalas from "@/pages/Escalas";
import Documentos from "@/pages/Documentos";
import Setores from "@/pages/Setores";
import Cardapio from "@/pages/Cardapio";
import ComunicadosUrgentes from "@/pages/ComunicadosUrgentes";
import Contatos from "@/pages/Contatos";
import Admin from "@/pages/Admin";
import NotFound from "@/pages/not-found";

const queryClient = new QueryClient();

function SiteRoutes() {
  return (
    <Layout>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/avisos" component={Avisos} />
        <Route path="/escalas" component={Escalas} />
        <Route path="/documentos" component={Documentos} />
        <Route path="/setores" component={Setores} />
        <Route path="/cardapio" component={Cardapio} />
        <Route path="/comunicados-urgentes" component={ComunicadosUrgentes} />
        <Route path="/contatos" component={Contatos} />
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <ContentProvider>
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "") || ""}>

            <Switch>
              <Route path="/admin" component={Admin} />
              <Route component={SiteRoutes} />
            </Switch>
          </WouterRouter>
          <Toaster />
        </ContentProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
