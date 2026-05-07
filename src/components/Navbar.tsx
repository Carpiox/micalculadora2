import { Calculator, Menu, X, Home } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

const links = [
  { href: "/", label: "Inicio", icon: Home },
  { href: "/calculadora-finiquito/", label: "Finiquito" },
  { href: "/calculadora-paro/", label: "Paro" },
  { href: "/calculadora-irpf/", label: "IRPF" },
  { href: "/calculadora-nomina/", label: "Nómina" },
  { href: "/calculadora-indemnizacion/", label: "Indemnización" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md" aria-label="Navegación principal">
      <div className="container flex items-center justify-between h-14">
        <Link to="/" className="flex items-center gap-2 font-bold text-foreground shrink-0">
          <Calculator className="h-5 w-5 text-primary" />
          <span className="hidden sm:inline">miCalculadora.es</span>
          <span className="sm:hidden">miCalculadora</span>
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-1">
          {links.map((l) => (
            <Link
              key={l.href}
              to={l.href}
              className={`px-3 py-2 rounded-md text-sm transition-colors ${
                location.pathname === l.href
                  ? "bg-primary/10 text-primary font-medium"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden min-h-11 min-w-11 p-2 text-muted-foreground hover:text-foreground transition-colors"
          aria-label="Menú"
          aria-expanded={open}
          aria-controls="mobile-menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div id="mobile-menu" className="md:hidden border-t border-border bg-background animate-fade-in">
          <div className="container py-3 space-y-1">
            {links.map((l) => (
              <Link
                key={l.href}
                to={l.href}
                onClick={() => setOpen(false)}
                className={`flex items-center min-h-11 px-3 py-2 rounded-md text-sm transition-colors ${
                  location.pathname === l.href
                    ? "bg-primary/10 text-primary font-medium"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                }`}
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}

