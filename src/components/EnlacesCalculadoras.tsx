import { Link } from "react-router-dom";
import { Calculator, Briefcase, Receipt, Wallet, Scale } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const calculadoras = [
  {
    nombre: "Calculadora de Finiquito",
    desc: "Calcula cuánto te deben al dejar tu trabajo: salario pendiente, vacaciones y pagas extras.",
    href: "/calculadora-finiquito/",
    icon: Calculator,
  },
  {
    nombre: "Calculadora de Paro",
    desc: "Averigua cuánto cobrarás de prestación por desempleo y durante cuántos meses.",
    href: "/calculadora-paro/",
    icon: Briefcase,
  },
  {
    nombre: "Calculadora de IRPF",
    desc: "Descubre cuánto te retiene Hacienda y cuál es tu tipo efectivo real.",
    href: "/calculadora-irpf/",
    icon: Receipt,
  },
  {
    nombre: "Calculadora de Nómina Neta",
    desc: "Convierte tu salario bruto a neto y entiende cada deducción de tu nómina.",
    href: "/calculadora-nomina/",
    icon: Wallet,
  },
  {
    nombre: "Calculadora de Indemnización",
    desc: "Calcula tu indemnización por despido según el tipo y tu antigüedad.",
    href: "/calculadora-indemnizacion/",
    icon: Scale,
  },
];

interface Props {
  excluir?: string; // href to exclude (current page)
}

export default function EnlacesCalculadoras({ excluir }: Props) {
  const { ref, visible } = useScrollReveal();
  const items = calculadoras.filter((c) => c.href !== excluir);

  return (
    <section className="scroll-mt-20" ref={ref}>
      <div className={`transition-all duration-700 ${visible ? "animate-fade-up" : "opacity-0"}`}>
        <h2 className="text-2xl md:text-3xl font-bold font-display text-foreground mb-2">
          Otras herramientas que te pueden interesar
        </h2>
        <p className="text-muted-foreground mb-6">
          Resuelve todas tus dudas laborales y financieras en un solo sitio.
        </p>
        <div className="grid gap-3 sm:grid-cols-2">
          {items.map((c) => (
            <Link
              key={c.href}
              to={c.href}
              className="group flex gap-4 p-4 rounded-xl border border-border bg-card hover:shadow-md hover:shadow-primary/5 transition-all duration-300 hover:border-primary/20"
            >
              <div className="p-2 rounded-lg bg-primary/10 text-primary w-fit h-fit shrink-0 group-hover:bg-primary/15 transition-colors">
                <c.icon className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-bold text-foreground group-hover:text-primary transition-colors">{c.nombre}</h3>
                <p className="text-sm text-muted-foreground mt-0.5">{c.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

