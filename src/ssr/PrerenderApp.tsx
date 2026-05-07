import { HelmetProvider } from "react-helmet-async";
import { Route, Routes } from "react-router-dom";
import { StaticRouter } from "react-router-dom/server";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "@/pages/Index";
import CalculadoraFiniquitoPage from "@/pages/CalculadoraFiniquitoPage";
import CalculadoraParoPage from "@/pages/CalculadoraParoPage";
import CalculadoraIRPFPage from "@/pages/CalculadoraIRPFPage";
import CalculadoraNominaPage from "@/pages/CalculadoraNominaPage";
import CalculadoraIndemnizacionPage from "@/pages/CalculadoraIndemnizacionPage";
import PoliticaPrivacidad from "@/pages/PoliticaPrivacidad";
import AvisoLegal from "@/pages/AvisoLegal";
import Cookies from "@/pages/Cookies";
import NotFound from "@/pages/NotFound";

interface PrerenderAppProps {
  url: string;
  helmetContext: Record<string, unknown>;
}

export default function PrerenderApp({ url, helmetContext }: PrerenderAppProps) {
  return (
    <HelmetProvider context={helmetContext}>
      <TooltipProvider>
        <StaticRouter location={url}>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/calculadora-finiquito/" element={<CalculadoraFiniquitoPage />} />
            <Route path="/calculadora-paro/" element={<CalculadoraParoPage />} />
            <Route path="/calculadora-irpf/" element={<CalculadoraIRPFPage />} />
            <Route path="/calculadora-nomina/" element={<CalculadoraNominaPage />} />
            <Route path="/calculadora-indemnizacion/" element={<CalculadoraIndemnizacionPage />} />
            <Route path="/politica-privacidad/" element={<PoliticaPrivacidad />} />
            <Route path="/aviso-legal/" element={<AvisoLegal />} />
            <Route path="/cookies/" element={<Cookies />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </StaticRouter>
      </TooltipProvider>
    </HelmetProvider>
  );
}

