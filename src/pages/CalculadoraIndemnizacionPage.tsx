import { lazy, Suspense } from "react";
import SEOHead from "@/components/SEOHead";
import { ChevronDown } from "lucide-react";
import Navbar from "@/components/Navbar";
import CalculadoraIndemnizacion from "@/components/CalculadoraIndemnizacion";
import Breadcrumb from "@/components/Breadcrumb";
import FaqSchema from "@/components/FaqSchema";
import Footer from "@/components/Footer";
import { generateCalculatorSchema } from "@/lib/schema";

const IndemnizacionBelowFold = lazy(() => import("@/components/below-fold/IndemnizacionBelowFold"));

const faqs = [
  { pregunta: "¿Cuántos días de indemnización me corresponden por año?", respuesta: "Depende del tipo de despido: 33 días/año en despido improcedente (máximo 24 mensualidades), 20 días/año en despido objetivo o ERE (máximo 12 mensualidades), y 12 días/año en fin de contrato temporal. El despido disciplinario procedente no genera indemnización." },
  { pregunta: "¿Qué es el 'doble cálculo' para contratos anteriores a 2012?", respuesta: "Si tu contrato es anterior al 12 de febrero de 2012, la indemnización por despido improcedente se calcula en dos tramos: 45 días/año por el tiempo trabajado antes de esa fecha (máximo 42 mensualidades) y 33 días/año por el tiempo posterior. Esto puede suponer una diferencia de miles de euros." },
  { pregunta: "¿La indemnización está exenta de IRPF?", respuesta: "Sí, la indemnización legal obligatoria está exenta de IRPF. Solo tributarías si la empresa te paga una cantidad superior a la que marca la ley (por ejemplo, en un acuerdo negociado). El exceso sí tributa." },
  { pregunta: "¿Cómo se calcula el salario diario para la indemnización?", respuesta: "Se divide el salario bruto anual (incluyendo todos los conceptos: base, complementos, pagas extras) entre 365 días. Es importante incluir TODOS los ingresos regulares, no solo el salario base." },
  { pregunta: "¿Puedo cobrar indemnización si me voy voluntariamente?", respuesta: "En general no. La baja voluntaria no genera derecho a indemnización. Sin embargo, si te vas por un incumplimiento grave del empresario (impago de salarios, acoso, modificación sustancial de condiciones), puedes solicitar la extinción del contrato ante el juzgado y cobrar como un despido improcedente." },
  { pregunta: "¿Qué pasa si la empresa no me paga la indemnización?", respuesta: "Puedes reclamar ante el Juzgado de lo Social. Si la empresa reconoce la improcedencia pero no paga, deberá además abonar los 'salarios de tramitación' (lo que habrías cobrado mientras dura el proceso). Si la empresa es insolvente, el FOGASA cubre parte." },
  { pregunta: "¿La indemnización del ERE es negociable?", respuesta: "Sí. El mínimo legal en un ERE es de 20 días/año, pero en la práctica se negocian cantidades superiores. Los comités de empresa suelen conseguir entre 25 y 40 días/año, dependiendo del tamaño y la situación económica de la empresa." },
  { pregunta: "¿Cuánto tiempo tengo para impugnar un despido?", respuesta: "20 días hábiles desde la fecha del despido. Es un plazo muy corto y no se puede ampliar. Si crees que tu despido es injusto, muévete rápido." },
];

const indemnizacionPath = "/calculadora-indemnizacion/";
const indemnizacionDescription =
  "Calcula gratis tu indemnización por despido en España: improcedente, objetivo, ERE o fin de contrato temporal.";
const indemnizacionSchema = generateCalculatorSchema(
  "Calculadora de Indemnización por Despido 2026 España",
  indemnizacionDescription,
  indemnizacionPath,
);
const breadcrumbItems = [
  { name: "Inicio", url: "/" },
  { name: "Calculadora de Indemnización", url: indemnizacionPath },
];

export default function CalculadoraIndemnizacionPage() {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Calculadora de Indemnización por Despido 2026 — Calcula cuánto te corresponde"
        description="Calcula gratis tu indemnización por despido en España. Improcedente, objetivo, ERE o fin de contrato temporal. Con doble cálculo para contratos pre-2012."
        path={indemnizacionPath}
        keywords={[
          "calculadora indemnización despido",
          "indemnización improcedente",
          "despido objetivo cálculo",
          "fin de contrato temporal indemnización",
          "doble cálculo pre 2012",
        ]}
        schema={indemnizacionSchema}
        robots="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
      />
      <FaqSchema questions={faqs} />
      <Navbar />
      <Breadcrumb items={breadcrumbItems} />

      <header className="section-warm py-8 md:py-20">
        <div className="container max-w-2xl animate-fade-up">
          <h1 className="text-3xl md:text-5xl font-display font-bold text-foreground leading-tight md:leading-[1.1] text-center">
            ¿Cuánto te corresponde de indemnización? Calcúlalo
          </h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-xl mx-auto text-center">
            Calcula tu indemnización por despido según el tipo, tu antigüedad y tu salario. Incluye el doble cálculo para contratos anteriores a la reforma de 2012.
          </p>
          <div className="flex justify-center mt-6">
            <a href="#calculadora" className="inline-flex items-center gap-1 text-primary font-medium hover:underline">
              Calcular ahora <ChevronDown className="h-4 w-4" />
            </a>
          </div>
        </div>
      </header>

      <main className="container py-12 space-y-20 max-w-3xl">
        <CalculadoraIndemnizacion />
        <Suspense fallback={null}>
          <IndemnizacionBelowFold faqs={faqs} />
        </Suspense>
      </main>

      <Footer />
    </div>
  );
}
