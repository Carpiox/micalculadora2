import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import SEOHead from "@/components/SEOHead";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted px-4">
      <SEOHead
        title="404 - Página no encontrada | miCalculadora.es"
        description="La página que buscas no existe o ha cambiado de URL. Accede a nuestras calculadoras laborales y financieras."
        path={location.pathname}
        noindex
      />
      <div className="text-center max-w-lg">
        <h1 className="mb-4 text-4xl font-bold">Página no encontrada (404)</h1>
        <p className="mb-6 text-lg text-muted-foreground">
          La URL no existe. Puedes volver al inicio o entrar directamente a una calculadora.
        </p>
        <div className="flex flex-wrap justify-center gap-3 text-sm">
          <Link to="/" className="text-primary underline hover:text-primary/90">
            Ir al inicio
          </Link>
          <Link to="/calculadora-finiquito/" className="text-primary underline hover:text-primary/90">
            Calculadora de finiquito
          </Link>
          <Link to="/calculadora-paro/" className="text-primary underline hover:text-primary/90">
            Calculadora de paro
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;

