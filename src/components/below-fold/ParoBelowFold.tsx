import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import EnlacesCalculadoras from "@/components/EnlacesCalculadoras";
import { Link } from "react-router-dom";

interface FaqItem {
  pregunta: string;
  respuesta: string;
}

interface ParoBelowFoldProps {
  faqs: FaqItem[];
}

export default function ParoBelowFold({ faqs }: ParoBelowFoldProps) {
  const { ref: refSeo, visible: visSeo } = useScrollReveal();
  const { ref: refFaq, visible: visFaq } = useScrollReveal();

  return (
    <>
      <section ref={refSeo}>
        <div className={`transition-all duration-700 ${visSeo ? "animate-fade-up" : "opacity-0"}`}>
          <article>
            <h2 className="text-2xl md:text-3xl font-bold font-display text-foreground mb-4">
              Cómo funciona la prestación por desempleo en España
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              La prestación por desempleo (lo que todo el mundo llama "el paro") es un derecho de los trabajadores que han cotizado lo suficiente. No es un regalo del Estado: es un seguro que has pagado con tus cotizaciones a lo largo de tu vida laboral.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-6">
              La cantidad que cobras depende de tres factores principales: <strong className="text-foreground">tu base de cotización</strong> (cuánto has cotizado a la Seguridad Social), <strong className="text-foreground">el tiempo que has cotizado</strong> en los últimos 6 años, y <strong className="text-foreground">si tienes hijos a cargo</strong>.
            </p>

            <h2 className="text-2xl md:text-3xl font-bold font-display text-foreground mt-10 mb-4">
              Cómo calcular el paro paso a paso
            </h2>

            <div className="space-y-6 mb-8">
              <div className="pl-4 border-l-2 border-primary/30">
                <h3 className="font-bold text-foreground mb-1">1. Calcula tu base reguladora</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Se toma la media de tus bases de cotización de los últimos 180 días (6 meses). Si tu base de cotización era de 1.800 €/mes, tu base reguladora diaria será 1.800 / 30 = 60 €.
                </p>
              </div>
              <div className="pl-4 border-l-2 border-primary/30">
                <h3 className="font-bold text-foreground mb-1">2. Aplica los porcentajes</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Los primeros 6 meses cobras el <strong className="text-foreground">70%</strong> de tu base reguladora. A partir del séptimo mes, baja al <strong className="text-foreground">50%</strong>. En nuestro ejemplo: 1.800 × 70% = 1.260 € los primeros 6 meses, y 1.800 × 50% = 900 € a partir del séptimo.
                </p>
              </div>
              <div className="pl-4 border-l-2 border-primary/30">
                <h3 className="font-bold text-foreground mb-1">3. Comprueba los topes</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Tu prestación no puede ser superior ni inferior a ciertos límites basados en el IPREM. Sin hijos, el máximo es el 175% del IPREM (~1.050 €). Con 1 hijo, el 200% (~1.200 €). Con 2 o más, el 225% (~1.350 €). El mínimo sin hijos es el 80% del IPREM (~480 €).
                </p>
              </div>
              <div className="pl-4 border-l-2 border-primary/30">
                <h3 className="font-bold text-foreground mb-1">4. Calcula la duración</h3>
                <p className="text-muted-foreground leading-relaxed">
                  La duración depende de los días cotizados en los últimos 6 años. El mínimo es 4 meses (con 360-539 días cotizados) y el máximo es 24 meses (con 2.160+ días). Por cada 180 días cotizados adicionales, sumas 2 meses de prestación.
                </p>
              </div>
            </div>

            <h2 className="text-2xl md:text-3xl font-bold font-display text-foreground mt-10 mb-4">
              Ejemplo práctico
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              <strong className="text-foreground">María</strong>, 38 años, lleva 5 años como administrativa en Málaga con una base de cotización de 1.600 €/mes. Le despiden y no tiene hijos.
            </p>
            <div className="bg-card border border-border rounded-lg p-5 mb-6 space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-muted-foreground">Días cotizados (5 años)</span><span className="font-medium">1.800 días</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Duración de la prestación</span><span className="font-medium">20 meses</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Cuantía meses 1-6 (70%)</span><span className="font-bold text-primary">1.050 € (tope)</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Cuantía meses 7-20 (50%)</span><span className="font-bold text-primary">800 €</span></div>
              <hr className="border-border" />
              <div className="flex justify-between"><span className="font-bold">Total estimado</span><span className="font-bold text-primary">17.500 €</span></div>
            </div>

            <h2 className="text-2xl md:text-3xl font-bold font-display text-foreground mt-10 mb-4">
              Factores que influyen en tu prestación
            </h2>
            <ul className="space-y-3 text-muted-foreground mb-8">
              {[
                ["Base de cotización", "No confundir con el salario bruto. A veces la base es diferente (tiene topes máximos y mínimos). Mira tu nómina."],
                ["Tiempo cotizado", "Solo cuentan los últimos 6 años. Si hace 7 años trabajaste 3 años, solo contarán los que caigan dentro de esa ventana."],
                ["Hijos a cargo", "Tener hijos a cargo sube los topes máximos y mínimos de la prestación. Hijos menores de 26 (o mayores con discapacidad) que convivan contigo."],
                ["Tipo de cese", "La baja voluntaria no da derecho a paro (salvo excepciones). Los despidos (improcedente, objetivo, ERE) sí."],
              ].map(([titulo, desc]) => (
                <li key={titulo} className="flex flex-col sm:flex-row gap-1 sm:gap-3 items-start">
                  <span className="font-bold text-primary shrink-0 sm:w-36">{titulo}</span>
                  <span>{desc}</span>
                </li>
              ))}
            </ul>

            <h2 className="text-2xl md:text-3xl font-bold font-display text-foreground mt-10 mb-4">
              Errores comunes al solicitar el paro
            </h2>
            <div className="space-y-4 mb-8">
              {[
                { titulo: "Pasarse del plazo de 15 días hábiles", desc: "Si no solicitas la prestación en los 15 días hábiles siguientes al cese, pierdes los días de retraso. No pierdes el derecho, pero sí dinero." },
                { titulo: "No inscribirse como demandante de empleo", desc: "Antes de solicitar el paro, tienes que inscribirte en tu oficina de empleo. Sin este paso, no te admiten la solicitud." },
                { titulo: "Confundir la base de cotización con el salario neto", desc: "Tu base de cotización es el importe sobre el que se calculan tus cuotas a la SS. Normalmente es similar al bruto, pero puede diferir." },
                { titulo: "No tener en cuenta los topes", desc: "Aunque hayas cotizado mucho, la prestación tiene un máximo. Si tu base es alta, puedes pensar que cobrarás más de lo que realmente te corresponde." },
                { titulo: "No saber que puedes compatibilizar paro y trabajo", desc: "Si te ofrecen un trabajo a tiempo parcial, puedes compatibilizarlo con parte de la prestación. No rechaces ofertas pensando que pierdes todo el paro." },
              ].map((e, i) => (
                <div key={i} className="flex gap-4 p-4 rounded-lg border border-border bg-card">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-accent/10 text-accent font-bold text-sm shrink-0">{i + 1}</span>
                  <div>
                    <h3 className="font-bold text-foreground mb-1">{e.titulo}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{e.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <p className="text-sm text-muted-foreground mt-6">
              ¿Necesitas calcular también tu finiquito? Usa nuestra <Link to="/calculadora-finiquito/" className="text-primary hover:underline">calculadora de finiquito</Link> para saber cuánto te deben además del paro.
            </p>
          </article>
        </div>
      </section>

      <section id="faq" className="scroll-mt-20" ref={refFaq}>
        <div className={`transition-all duration-700 ${visFaq ? "animate-fade-up" : "opacity-0"}`}>
          <h2 className="text-2xl md:text-3xl font-bold font-display text-foreground mb-2">
            Preguntas frecuentes sobre la prestación por desempleo
          </h2>
          <p className="text-muted-foreground mb-8">Las dudas más habituales resueltas en cristiano.</p>
          <Accordion type="single" collapsible className="space-y-2">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`faq-${i}`} className="border border-border rounded-lg px-4 data-[state=open]:bg-card data-[state=open]:shadow-sm transition-all">
                <AccordionTrigger className="text-left font-medium text-foreground hover:no-underline py-4">{faq.pregunta}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-4 leading-relaxed">{faq.respuesta}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <EnlacesCalculadoras excluir="/calculadora-paro/" />
    </>
  );
}
