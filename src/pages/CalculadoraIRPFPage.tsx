import { lazy, Suspense } from "react";
import SEOHead from "@/components/SEOHead";
import { ChevronDown } from "lucide-react";
import Navbar from "@/components/Navbar";
import CalculadoraIRPF from "@/components/CalculadoraIRPF";
import Breadcrumb from "@/components/Breadcrumb";
import FaqSchema from "@/components/FaqSchema";
import Footer from "@/components/Footer";
import { generateCalculatorSchema } from "@/lib/schema";

const IRPFBelowFold = lazy(() => import("@/components/below-fold/IRPFBelowFold"));

const faqs = [
  { pregunta: "¿Qué es el IRPF y cómo me afecta?", respuesta: "El IRPF (Impuesto sobre la Renta de las Personas Físicas) es el impuesto que pagas por tus ingresos. Se aplica de forma progresiva: cuanto más ganas, mayor es el porcentaje que pagas. Se retiene directamente de tu nómina cada mes." },
  { pregunta: "¿Qué diferencia hay entre tipo marginal y tipo efectivo?", respuesta: "El tipo marginal es el porcentaje que pagas por el último euro que ganas (determina en qué tramo estás). El tipo efectivo es el porcentaje real que pagas sobre el total de tus ingresos. El efectivo siempre es menor que el marginal." },
  { pregunta: "¿Cuáles son los tramos de IRPF en 2026?", respuesta: "Los tramos estatal + autonómico combinados son: hasta 12.450€ (19%), de 12.450€ a 20.200€ (24%), de 20.200€ a 35.200€ (30%), de 35.200€ a 60.000€ (37%), de 60.000€ a 300.000€ (45%), y más de 300.000€ (47%)." },
  { pregunta: "¿Puedo reducir mi IRPF legalmente?", respuesta: "Sí. Planes de pensiones (hasta 1.500€/año), aportaciones a sindicatos, cuotas de colegios profesionales obligatorios, deducción por vivienda habitual (si la compraste antes de 2013), donativos a ONG, y el mínimo por descendientes o ascendientes." },
  { pregunta: "¿Qué pasa si me retienen más de lo que debo?", respuesta: "Hacienda te devuelve la diferencia cuando hagas la declaración de la renta. Si te retienen de menos, tendrás que pagar. Por eso es importante que tu empresa aplique el tipo correcto." },
  { pregunta: "¿Están incluidas las cotizaciones a la Seguridad Social?", respuesta: "Sí. Nuestra calculadora resta automáticamente las cotizaciones a la Seguridad Social (aprox. 6,35% de tu bruto) antes de calcular la base imponible, tal como se hace en la realidad." },
];

const irpfPath = "/calculadora-irpf/";
const irpfDescription =
  "Calcula tu IRPF gratis. Descubre tu tipo efectivo, retención mensual y desglose por tramos fiscales 2026 para España.";
const irpfSchema = generateCalculatorSchema("Calculadora de IRPF 2026 España", irpfDescription, irpfPath);
const breadcrumbItems = [
  { name: "Inicio", url: "/" },
  { name: "Calculadora de IRPF", url: irpfPath },
];

export default function CalculadoraIRPFPage() {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Calculadora de IRPF 2026 España — Calcula tu retención y tipo efectivo"
        description="Calcula tu IRPF gratis. Descubre tu tipo efectivo, retención mensual y desglose por tramos fiscales 2026. Herramienta actualizada para España."
        path={irpfPath}
        keywords={[
          "calculadora irpf",
          "retención IRPF nómina",
          "tramos irpf 2026",
          "calcular tipo efectivo irpf",
          "impuesto sobre la renta España",
        ]}
        schema={irpfSchema}
        robots="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
      />
      <FaqSchema questions={faqs} />
      <Navbar />
      <Breadcrumb items={breadcrumbItems} />

      <header className="section-warm py-8 md:py-20">
        <div className="container max-w-2xl animate-fade-up">
          <h1 className="text-3xl md:text-5xl font-display font-bold text-foreground leading-tight md:leading-[1.1] text-center">
            ¿Cuánto IRPF pagas realmente? Descúbrelo
          </h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-xl mx-auto text-center">
            Calcula tu retención de IRPF, tipo efectivo y desglose por tramos fiscales. Actualizado a los tramos de 2026.
          </p>
          <div className="flex justify-center mt-6">
            <a href="#calculadora" className="inline-flex items-center gap-1 text-primary font-medium hover:underline">
              Calcular ahora <ChevronDown className="h-4 w-4" />
            </a>
          </div>
        </div>
      </header>

      <main className="container py-12 space-y-20 max-w-3xl">
        <CalculadoraIRPF />
        <Suspense fallback={null}>
          <IRPFBelowFold faqs={faqs} />
        </Suspense>
      </main>

      <Footer />
    </div>
  );
}
