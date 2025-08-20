import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Servicos from "./pages/Servicos";
import QuemSomos from "./pages/QuemSomos";
import Blog from "./pages/Blog";
import PostERP from "./pages/PostERP";
import PostControlePecas from "./pages/PostControlePecas";
import PostSiteLeads from "./pages/PostSiteLeads";
import Contato from "./pages/Contato";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/servicos" element={<Servicos />} />
          <Route path="/quem-somos" element={<QuemSomos />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/erp-restaurante-planilha-prejuizo" element={<PostERP />} />
          <Route path="/blog/controle-pecas-estoque" element={<PostControlePecas />} />
          <Route path="/blog/site-que-gera-leads-checklist" element={<PostSiteLeads />} />
          <Route path="/contato" element={<Contato />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
