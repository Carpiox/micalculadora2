import { lazy, Suspense } from "react";
import SEOHead from "@/components/SEOHead";
import { ChevronDown } from "lucide-react";
import Navbar from "@/components/Navbar";
import CalculadoraNomina from "@/components/CalculadoraNomina";
import Breadcrumb from "@/components/Breadcrumb";
import FaqSchema from "@/components/FaqSchema";
import Footer from "@/components/Footer";
import { generateCalculatorSchema } from "@/lib/schema";

const NominaBelowFold = lazy(() => import("@/components/below-fold/NominaBelowFold"));

const faqs = [
  { pregunta: "¿Qué diferencia hay entre salario bruto y neto?", respuesta: "El bruto es lo que tu empresa paga por ti. El neto es lo que recibes en tu cuenta. La diferencia son las cotizaciones a la Seguridad Social (~6,35%) y la retención de IRPF (variable según tu salario y situación personal)." },
  { pregunta: "¿Por qué mi compañero cobra distinto neto con el mismo bruto?", respuesta: "Porque la retención de IRPF depende de la situación personal: estado civil, hijos a cargo, discapacidad, tipo de contrato, etc. Dos personas con el mismo bruto pueden tener retenciones muy diferentes." },
  { pregunta: "¿Qué es el MEI que aparece en mi nómina?", respuesta: "El Mecanismo de Equidad Intergeneracional es una cotización adicional del 0,8% (en 2026) que se descuenta de tu nómina para garantizar la sostenibilidad de las pensiones. Se sumó a las cotizaciones habituales desde 2023." },
  { pregunta: "¿Cómo afectan las pagas extras a mi nómina?", respuesta: "Con 14 pagas, tu mensual bruto es menor (bruto anual / 14), pero en junio y diciembre cobras una paga extra. Con 12 pagas (prorrateadas), cobras más cada mes pero sin pagas extra. El neto anual es el mismo." },
  { pregunta: "¿Puedo pedir que me retengan más IRPF?", respuesta: "Sí. Puedes pedir a tu empresa que te aplique un tipo de retención más alto presentando el modelo 145. Así evitas tener que pagar en la declaración de la renta. No puedes pedir que te retengan menos del mínimo legal." },
  { pregunta: "¿Las horas extra tributan igual?", respuesta: "Las horas extra tributan como rendimiento del trabajo (IRPF normal), pero cotizan de forma diferente a la Seguridad Social. Las horas extra de fuerza mayor cotizan al 2% y las ordinarias al tipo general." },
];

const nominaPath = "/calculadora-nomina/";
const nominaDescription =
  "Convierte tu salario bruto a neto gratis con desglose de cotizaciones, IRPF y deducciones actualizado a 2026 en España.";
const nominaSchema = generateCalculatorSchema(
  "Calculadora de Nómina Neta 2026 España",
  nominaDescription,
  nominaPath,
);
const breadcrumbItems = [
  { name: "Inicio", url: "/" },
  { name: "Calculadora de Nómina Neta", url: nominaPath },
];

export default function CalculadoraNominaPage() {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Calculadora de Nómina Neta 2026 — De bruto a neto en un clic"
        description="Convierte tu salario bruto a neto gratis. Calculadora de nómina actualizada a 2026 con desglose de cotizaciones SS, IRPF y todas las deducciones."
        path={nominaPath}
        keywords={[
          "calculadora nómina neta",
          "de bruto a neto",
          "calcular sueldo neto",
          "nómina España 2026",
          "retención irpf nómina",
        ]}
        schema={nominaSchema}
        robots="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
      />
      <FaqSchema questions={faqs} />
      <Navbar />
      <Breadcrumb items={breadcrumbItems} />

      <header className="section-warm py-8 md:py-20">
        <div className="container max-w-2xl animate-fade-up">
          <h1 className="text-3xl md:text-5xl font-display font-bold text-foreground leading-tight md:leading-[1.1] text-center">
            ¿Cuánto cobrarás realmente? De bruto a neto
          </h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-xl mx-auto text-center">
            Introduce tu salario bruto y descubre cuánto te llegará a la cuenta cada mes. Con el desglose completo de todas las deducciones.
          </p>
          <div className="flex justify-center mt-6">
            <a href="#calculadora" className="inline-flex items-center gap-1 text-primary font-medium hover:underline">
              Calcular ahora <ChevronDown className="h-4 w-4" />
            </a>
          </div>
        </div>
      </header>

      <main className="container py-12 space-y-20 max-w-3xl">
        <CalculadoraNomina />
        <Suspense fallback={null}>
          <NominaBelowFold faqs={faqs} />
        </Suspense>
      </main>

      <Footer />
    </div>
  );
}
