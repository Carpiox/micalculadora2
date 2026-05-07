import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";

const CalculadoraFiniquitoPage = lazy(() => import("./pages/CalculadoraFiniquitoPage.tsx"));
const CalculadoraParoPage = lazy(() => import("./pages/CalculadoraParoPage.tsx"));
const CalculadoraIRPFPage = lazy(() => import("./pages/CalculadoraIRPFPage.tsx"));
const CalculadoraNominaPage = lazy(() => import("./pages/CalculadoraNominaPage.tsx"));
const CalculadoraIndemnizacionPage = lazy(() => import("./pages/CalculadoraIndemnizacionPage.tsx"));
const PoliticaPrivacidad = lazy(() => import("./pages/PoliticaPrivacidad.tsx"));
const AvisoLegal = lazy(() => import("./pages/AvisoLegal.tsx"));
const Cookies = lazy(() => import("./pages/Cookies.tsx"));
const NotFound = lazy(() => import("./pages/NotFound.tsx"));

function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full" />
    </div>
  );
}

const App = () => (
  <HelmetProvider>
    <TooltipProvider>
      <BrowserRouter>
        <Suspense fallback={<PageLoader />}>
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
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </HelmetProvider>
);

export default App;

