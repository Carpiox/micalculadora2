import { lazy, Suspense } from "react";
import SEOHead from "@/components/SEOHead";
import { ChevronDown } from "lucide-react";
import Navbar from "@/components/Navbar";
import CalculadoraFiniquito from "@/components/CalculadoraFiniquito";
import Breadcrumb from "@/components/Breadcrumb";
import FaqSchema from "@/components/FaqSchema";
import Footer from "@/components/Footer";
import { generateCalculatorSchema } from "@/lib/schema";

const EjemplosReales = lazy(() => import("@/components/EjemplosReales"));
const ComparadorDespidos = lazy(() => import("@/components/ComparadorDespidos"));
const ErroresYConsejos = lazy(() => import("@/components/ErroresYConsejos"));
const ContenidoSEO = lazy(() => import("@/components/ContenidoSEO"));
const FAQ = lazy(() => import("@/components/FAQ"));
const Afiliados = lazy(() => import("@/components/Afiliados"));
const EnlacesCalculadoras = lazy(() => import("@/components/EnlacesCalculadoras"));

const finiquitoFaqs = [
  { pregunta: "¿Qué es exactamente el finiquito?", respuesta: "Es el dinero que la empresa te debe cuando dejas de trabajar, por el motivo que sea. Incluye los días de salario pendientes, las vacaciones que no hayas disfrutado y la parte de las pagas extras que ya hayas generado." },
  { pregunta: "¿Finiquito e indemnización son lo mismo?", respuesta: "No. El finiquito es lo que te deben SIEMPRE (salario, vacaciones, pagas). La indemnización es una cantidad EXTRA que solo te pagan si el despido es objetivo o improcedente." },
  { pregunta: "Me voy voluntariamente, ¿tengo derecho a algo?", respuesta: "Sí. No tendrás indemnización ni derecho a paro, pero la empresa te tiene que pagar el finiquito: los días trabajados, las vacaciones no disfrutadas y la parte proporcional de las pagas extras." },
  { pregunta: "¿Cuánto me corresponde de finiquito con 10 años de antigüedad?", respuesta: "Depende de tu salario y del tipo de despido. Con un salario de 1.500 € brutos y despido improcedente, la indemnización sola serían unos 19.000 €, más el salario pendiente, vacaciones y pagas." },
  { pregunta: "¿Puedo negarme a firmar el finiquito?", respuesta: "Puedes, pero lo mejor es firmarlo escribiendo 'No conforme'. Así cobras lo que te dan y mantienes el derecho a reclamar la diferencia. Tienes 1 año para hacerlo." },
  { pregunta: "Mi empresa dice que mi despido es disciplinario, ¿qué hago?", respuesta: "Muchas empresas usan el despido disciplinario para no pagar indemnización, aunque la causa real no lo justifique. Si impugnas ante el juzgado y el juez lo declara improcedente, te corresponden 33 días por año. Tienes 20 días hábiles para presentar la demanda." },
  { pregunta: "¿La indemnización por despido paga IRPF?", respuesta: "La indemnización legal por despido está exenta de IRPF. Solo pagarías impuestos si la empresa te paga una cantidad superior al mínimo legal." },
];

const finiquitoPath = "/calculadora-finiquito/";
const finiquitoDescription =
  "Calcula tu finiquito en España: salario pendiente, vacaciones, pagas extras e indemnización por despido.";

const finiquitoSchema = generateCalculatorSchema(
  "Calculadora de Finiquito España 2026",
  finiquitoDescription,
  finiquitoPath,
);

const breadcrumbItems = [
  { name: "Inicio", url: "/" },
  { name: "Calculadora de Finiquito", url: finiquitoPath },
];

export default function CalculadoraFiniquitoPage() {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Calculadora de Finiquito España 2026 — Calcula gratis cuánto te corresponde"
        description="Calcula tu finiquito en España gratis. Averigua cuánto te corresponde de indemnización por despido improcedente, objetivo o disciplinario. Con ejemplos reales y desglose completo."
        path={finiquitoPath}
        keywords={[
          "calculadora de finiquito",
          "calcular finiquito",
          "indemnización por despido",
          "finiquito España 2026",
          "despido improcedente cálculo",
        ]}
        schema={finiquitoSchema}
        robots="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
      />
      <FaqSchema questions={finiquitoFaqs} />
      <Navbar />
      <Breadcrumb items={breadcrumbItems} />

      <header className="section-warm py-8 md:py-20">
        <div className="container max-w-2xl animate-fade-up">
          <h1 className="text-3xl md:text-5xl font-display font-bold text-foreground leading-tight md:leading-[1.1] text-center">
            ¿Te han despedido? Averigua cuánto te deben
          </h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-xl mx-auto text-center">
            Calcula tu finiquito en menos de un minuto. Sin registro, gratis y con un desglose que puedas entender. Porque es tu dinero y tienes derecho a saber cuánto te corresponde.
          </p>
          <div className="flex justify-center mt-6">
            <a href="#calculadora" className="inline-flex items-center gap-1 text-primary font-medium hover:underline">
              Calcular ahora <ChevronDown className="h-4 w-4" />
            </a>
          </div>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-1 mt-6 text-xs text-muted-foreground">
            <span>✓ Actualizado a la legislación 2026</span>
            <span>✓ Más de 50.000 cálculos realizados</span>
            <span>✓ 100% gratuito</span>
          </div>
        </div>
      </header>

      <main className="container py-12 space-y-20 max-w-3xl">
        <CalculadoraFiniquito />
        <Suspense fallback={null}>
          <EjemplosReales />
          <ComparadorDespidos />
          <ErroresYConsejos />
          <ContenidoSEO />
          <FAQ />
          <Afiliados />
          <EnlacesCalculadoras excluir="/calculadora-finiquito/" />
        </Suspense>
      </main>

      <Footer />
    </div>
  );
}
