import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import EnlacesCalculadoras from "@/components/EnlacesCalculadoras";
import { Link } from "react-router-dom";

interface FaqItem {
  pregunta: string;
  respuesta: string;
}

interface IndemnizacionBelowFoldProps {
  faqs: FaqItem[];
}

export default function IndemnizacionBelowFold({ faqs }: IndemnizacionBelowFoldProps) {
  const { ref: refSeo, visible: visSeo } = useScrollReveal();
  const { ref: refFaq, visible: visFaq } = useScrollReveal();

  return (
    <>
      <section ref={refSeo}>
        <div className={`transition-all duration-700 ${visSeo ? "animate-fade-up" : "opacity-0"}`}>
          <article>
            <h2 className="text-2xl md:text-3xl font-bold font-display text-foreground mb-4">
              Cómo funciona la indemnización por despido en España
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              La indemnización es una <strong className="text-foreground">compensación económica</strong> que la empresa te debe pagar cuando te despide sin causa justificada o por motivos económicos. No es lo mismo que el finiquito: el <Link to="/calculadora-finiquito/" className="text-primary hover:underline">finiquito</Link> te lo deben siempre, la indemnización solo en ciertos tipos de despido.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-6">
              La cuantía depende de tres factores: el <strong className="text-foreground">tipo de despido</strong>, tu <strong className="text-foreground">antigüedad en la empresa</strong> y tu <strong className="text-foreground">salario bruto</strong>.
            </p>

            <h2 className="text-2xl md:text-3xl font-bold font-display text-foreground mt-10 mb-4">
              Cómo calcular tu indemnización paso a paso
            </h2>
            <div className="space-y-6 mb-8">
              <div className="pl-4 border-l-2 border-primary/30">
                <h3 className="font-bold text-foreground mb-1">1. Identifica el tipo de despido</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Revisa tu carta de despido. Debe especificar si es objetivo (causas económicas), improcedente, disciplinario, o fin de contrato temporal. Si no queda claro, consulta con un abogado laboralista.
                </p>
              </div>
              <div className="pl-4 border-l-2 border-primary/30">
                <h3 className="font-bold text-foreground mb-1">2. Calcula tu salario diario</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Divide tu salario bruto anual entre 365. Incluye todos los conceptos salariales regulares: base, complementos, pluses, antigüedad, etc.
                </p>
              </div>
              <div className="pl-4 border-l-2 border-primary/30">
                <h3 className="font-bold text-foreground mb-1">3. Multiplica por los días correspondientes</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Improcedente: 33 días × años. Objetivo/ERE: 20 días × años. Fin temporal: 12 días × años. Disciplinario procedente: 0.
                </p>
              </div>
              <div className="pl-4 border-l-2 border-primary/30">
                <h3 className="font-bold text-foreground mb-1">4. Comprueba el tope</h3>
                <p className="text-muted-foreground leading-relaxed">
                  La indemnización por despido improcedente tiene un máximo de 24 mensualidades y la de despido objetivo, 12 mensualidades. Si tu cálculo supera ese tope, cobras el tope.
                </p>
              </div>
            </div>

            <h2 className="text-2xl md:text-3xl font-bold font-display text-foreground mt-10 mb-4">
              Tabla comparativa de indemnizaciones
            </h2>
            <div className="overflow-x-auto rounded-lg border border-border mb-6">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-muted/50">
                    <th className="text-left p-3 font-semibold">Tipo</th>
                    <th className="text-center p-3 font-semibold">Días/año</th>
                    <th className="text-center p-3 font-semibold">Tope</th>
                    <th className="text-center p-3 font-semibold hidden sm:table-cell">Ejemplo (5 años, 24.000€/año)</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["Improcedente", "33", "24 meses", "10.849 €"],
                    ["Objetivo / ERE", "20", "12 meses", "6.575 €"],
                    ["Fin temporal", "12", "Sin tope", "3.945 €"],
                    ["Disciplinario", "0", "—", "0 €"],
                  ].map(([tipo, dias, tope, ejemplo]) => (
                    <tr key={tipo} className="border-t border-border">
                      <td className="p-3 font-medium text-foreground">{tipo}</td>
                      <td className="p-3 text-center font-bold text-primary">{dias}</td>
                      <td className="p-3 text-center text-muted-foreground">{tope}</td>
                      <td className="p-3 text-center tabular-nums font-medium hidden sm:table-cell">{ejemplo}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <h2 className="text-2xl md:text-3xl font-bold font-display text-foreground mt-10 mb-4">
              Ejemplo práctico
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              <strong className="text-foreground">Roberto</strong>, 45 años, lleva 12 años en su empresa con un salario bruto de 32.000 €/año. Le despiden de forma improcedente. Su contrato es posterior a 2012.
            </p>
            <div className="bg-card border border-border rounded-lg p-5 mb-6 space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-muted-foreground">Salario diario</span><span className="font-medium">87,67 €</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Días de indemnización (33 × 12)</span><span className="font-medium">396 días</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Indemnización bruta</span><span className="font-medium">34.717 €</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Tope (24 meses × 2.666 €)</span><span className="font-medium">64.000 €</span></div>
              <hr className="border-border" />
              <div className="flex justify-between"><span className="font-bold">Indemnización final</span><span className="font-bold text-primary">34.717 € (no alcanza tope)</span></div>
            </div>

            <h2 className="text-2xl md:text-3xl font-bold font-display text-foreground mt-10 mb-4">
              Errores comunes en el cálculo de la indemnización
            </h2>
            <div className="space-y-4 mb-8">
              {[
                { titulo: "Calcular solo con el salario base", desc: "La indemnización se calcula sobre el salario bruto total, incluyendo todos los complementos regulares. Usar solo la base puede suponer miles de euros de diferencia." },
                { titulo: "No aplicar el doble cálculo pre-2012", desc: "Si tu contrato es anterior a febrero de 2012, los años previos a la reforma se calculan a 45 días/año, no 33. Muchas empresas 'olvidan' este detalle." },
                { titulo: "Contar solo años completos", desc: "La ley dice que la antigüedad se calcula por períodos de tiempo trabajado, no solo años enteros. 5 años y 8 meses no son 5 años: son 5,67 años." },
                { titulo: "Aceptar un despido disciplinario sin impugnar", desc: "Muchas empresas usan el despido disciplinario para evitar pagar indemnización. Si no está justificado y tú no impugnas, pierdes el derecho a cobrar 33 días/año." },
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

            <p className="text-sm text-muted-foreground">
              ¿Quieres calcular el finiquito completo además de la indemnización? Usa nuestra <Link to="/calculadora-finiquito/" className="text-primary hover:underline">calculadora de finiquito</Link>.
            </p>
          </article>
        </div>
      </section>

      <section id="faq" className="scroll-mt-20" ref={refFaq}>
        <div className={`transition-all duration-700 ${visFaq ? "animate-fade-up" : "opacity-0"}`}>
          <h2 className="text-2xl md:text-3xl font-bold font-display text-foreground mb-2">Preguntas frecuentes sobre la indemnización por despido</h2>
          <p className="text-muted-foreground mb-8">Las dudas más comunes sobre indemnización, resueltas sin rodeos.</p>
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

      <EnlacesCalculadoras excluir="/calculadora-indemnizacion/" />
    </>
  );
}
