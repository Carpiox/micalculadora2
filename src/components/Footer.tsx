import { Calculator, ChevronRight, Heart } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-card mt-16">
      <div className="container py-12">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Calculator className="h-5 w-5 text-primary" />
              <span className="font-bold text-foreground">miCalculadora.es</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Herramientas laborales y financieras gratuitas para trabajadores en España. Calcula tu finiquito, paro, IRPF, nómina neta e indemnización por despido.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-foreground mb-3">Herramientas</h4>
            <ul className="space-y-2">
              {[
                { nombre: "Calculadora de finiquito", enlace: "/calculadora-finiquito/" },
                { nombre: "Calculadora de paro", enlace: "/calculadora-paro/" },
                { nombre: "Calculadora de IRPF", enlace: "/calculadora-irpf/" },
                { nombre: "Calculadora de nómina neta", enlace: "/calculadora-nomina/" },
                { nombre: "Calculadora de indemnización", enlace: "/calculadora-indemnizacion/" },
              ].map((c) => (
                <li key={c.nombre}>
                  <Link
                    to={c.enlace}
                    className="flex items-center gap-2 min-h-10 text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <ChevronRight className="h-3.5 w-3.5 text-primary" />
                    {c.nombre}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-foreground mb-3">Información legal</h4>
            <p className="text-sm text-muted-foreground leading-relaxed mb-3">
              Los cálculos de estas herramientas son orientativos y se basan en la legislación vigente en España. No constituyen asesoramiento jurídico.
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Información actualizada a 2026 según el Estatuto de los Trabajadores y la normativa fiscal vigente.
            </p>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-border">
          <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 mb-4 text-xs">
            <Link to="/aviso-legal/" className="text-muted-foreground hover:text-foreground transition-colors py-1">Aviso legal</Link>
            <Link to="/politica-privacidad/" className="text-muted-foreground hover:text-foreground transition-colors py-1">Política de privacidad</Link>
            <Link to="/cookies/" className="text-muted-foreground hover:text-foreground transition-colors py-1">Política de cookies</Link>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-muted-foreground">
            <span>© {new Date().getFullYear()} miCalculadora.es</span>
            <span className="flex items-center gap-1">
              Hecho con <Heart className="h-3 w-3 text-destructive" /> para trabajadores en España
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

