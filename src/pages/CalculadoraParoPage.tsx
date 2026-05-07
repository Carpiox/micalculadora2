import { lazy, Suspense } from "react";
import SEOHead from "@/components/SEOHead";
import { ChevronDown } from "lucide-react";
import Navbar from "@/components/Navbar";
import CalculadoraParo from "@/components/CalculadoraParo";
import Breadcrumb from "@/components/Breadcrumb";
import FaqSchema from "@/components/FaqSchema";
import Footer from "@/components/Footer";
import { generateCalculatorSchema } from "@/lib/schema";

const ParoBelowFold = lazy(() => import("@/components/below-fold/ParoBelowFold"));

const faqs = [
  { pregunta: "¿Cuánto tiempo tengo que haber trabajado para cobrar el paro?", respuesta: "Necesitas haber cotizado al menos 360 días (1 año) en los últimos 6 años. Si no llegas, podrías optar al subsidio por desempleo (RAI o subsidio extraordinario), que tiene requisitos diferentes." },
  { pregunta: "¿Cuánto se cobra de paro?", respuesta: "Los primeros 6 meses cobras el 70% de tu base reguladora, y a partir del séptimo mes, el 50%. Hay topes máximos y mínimos que dependen de si tienes hijos a cargo. Con el IPREM de 2026, el máximo sin hijos es de 1.092 €/mes aproximadamente." },
  { pregunta: "¿Puedo cobrar el paro si me voy voluntariamente?", respuesta: "En principio no. La baja voluntaria no da derecho a prestación por desempleo. Sin embargo, hay excepciones: si te vas por un traslado, por modificación sustancial de condiciones de trabajo, o por incumplimiento grave del empresario, sí podrías tener derecho." },
  { pregunta: "¿El paro se cobra neto o bruto?", respuesta: "La prestación por desempleo tributa como rendimiento del trabajo en el IRPF. El SEPE aplica una retención (normalmente baja, entre el 2% y el 10%), así que la cantidad neta es ligeramente inferior a la bruta." },
  { pregunta: "¿Puedo trabajar mientras cobro el paro?", respuesta: "Si trabajas por cuenta ajena a tiempo completo, se suspende la prestación. A tiempo parcial, se puede compatibilizar (cobras paro reducido + salario). Si te das de alta como autónomo, puedes capitalizar el paro o compatibilizarlo bajo ciertas condiciones." },
  { pregunta: "¿Qué pasa si me quedo sin paro y sigo desempleado?", respuesta: "Puedes solicitar el subsidio por desempleo (430 €/mes aprox.), la Renta Activa de Inserción (RAI) o, en última instancia, el Ingreso Mínimo Vital (IMV). Cada uno tiene requisitos diferentes." },
  { pregunta: "¿Cuándo puedo solicitar el paro?", respuesta: "Tienes 15 días hábiles desde el cese para solicitar la prestación. Si te pasas de plazo, no pierdes el derecho pero sí los días de retraso. No esperes al último momento." },
  { pregunta: "¿El paro cuenta para la jubilación?", respuesta: "Sí. Mientras cobras la prestación contributiva, el SEPE cotiza por ti a la Seguridad Social, así que ese tiempo cuenta para tu jubilación. En el subsidio, la cotización es menor." },
];

const paroPath = "/calculadora-paro/";
const paroDescription =
  "Calcula gratis cuánto cobrarás de prestación por desempleo en España según tu base de cotización, días trabajados e hijos a cargo.";
const paroSchema = generateCalculatorSchema("Calculadora de Paro España 2026", paroDescription, paroPath);
const breadcrumbItems = [
  { name: "Inicio", url: "/" },
  { name: "Calculadora de Paro", url: paroPath },
];

export default function CalculadoraParoPage() {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Calculadora de Paro España 2026 — Cuánto cobrarás de prestación por desempleo"
        description="Calcula gratis cuánto cobrarás de paro en España. Prestación por desempleo según tu base de cotización, días trabajados e hijos a cargo. Actualizada a 2026."
        path={paroPath}
        keywords={[
          "calculadora de paro",
          "prestación por desempleo",
          "cuánto cobro de paro",
          "calcular paro España",
          "SEPE prestación 2026",
        ]}
        schema={paroSchema}
        robots="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
      />
      <FaqSchema questions={faqs} />
      <Navbar />
      <Breadcrumb items={breadcrumbItems} />

      <header className="section-warm py-8 md:py-20">
        <div className="container max-w-2xl animate-fade-up">
          <h1 className="text-3xl md:text-5xl font-display font-bold text-foreground leading-tight md:leading-[1.1] text-center">
            ¿Cuánto cobrarás de paro? Calcúlalo ahora
          </h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-xl mx-auto text-center">
            Averigua la cuantía y duración de tu prestación por desempleo en menos de un minuto. Basado en la legislación española de 2026.
          </p>
          <div className="flex justify-center mt-6">
            <a href="#calculadora" className="inline-flex items-center gap-1 text-primary font-medium hover:underline">
              Calcular ahora <ChevronDown className="h-4 w-4" />
            </a>
          </div>
        </div>
      </header>

      <main className="container py-12 space-y-20 max-w-3xl">
        <CalculadoraParo />
        <Suspense fallback={null}>
          <ParoBelowFold faqs={faqs} />
        </Suspense>
      </main>

      <Footer />
    </div>
  );
}
