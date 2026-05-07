import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import EnlacesCalculadoras from "@/components/EnlacesCalculadoras";
import { Link } from "react-router-dom";

interface FaqItem {
  pregunta: string;
  respuesta: string;
}

interface IRPFBelowFoldProps {
  faqs: FaqItem[];
}

export default function IRPFBelowFold({ faqs }: IRPFBelowFoldProps) {
  const { ref: refSeo, visible: visSeo } = useScrollReveal();
  const { ref: refFaq, visible: visFaq } = useScrollReveal();

  return (
    <>
      <section ref={refSeo}>
        <div className={`transition-all duration-700 ${visSeo ? "animate-fade-up" : "opacity-0"}`}>
          <article>
            <h2 className="text-2xl md:text-3xl font-bold font-display text-foreground mb-4">
              Cómo funciona el IRPF en España
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              El IRPF es un impuesto <strong className="text-foreground">progresivo</strong>: no pagas el mismo porcentaje por todo tu salario. Tu renta se divide en tramos, y cada tramo se grava a un tipo diferente. Los primeros 12.450 € tributan al 19%, los siguientes hasta 20.200 € al 24%, y así sucesivamente.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Esto significa que si ganas 30.000 €, NO pagas un 30% de todo. Solo la parte entre 20.200 € y 30.000 € se grava al 30%. Por eso tu <strong className="text-foreground">tipo efectivo</strong> (lo que pagas realmente sobre el total) siempre es menor que tu tipo marginal (el tramo más alto al que llegas).
            </p>

            <h2 className="text-2xl md:text-3xl font-bold font-display text-foreground mt-10 mb-4">
              Cómo calcular tu IRPF paso a paso
            </h2>
            <div className="space-y-6 mb-8">
              <div className="pl-4 border-l-2 border-primary/30">
                <h3 className="font-bold text-foreground mb-1">1. Determina tu base imponible</h3>
                <p className="text-muted-foreground leading-relaxed">
                  A tu salario bruto anual le restas las cotizaciones a la Seguridad Social (~6,35%) y los gastos deducibles del trabajador (2.000 €). Esa es tu base imponible.
                </p>
              </div>
              <div className="pl-4 border-l-2 border-primary/30">
                <h3 className="font-bold text-foreground mb-1">2. Aplica los tramos fiscales</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Divide tu base imponible en los tramos del IRPF y aplica el porcentaje correspondiente a cada tramo. La suma de todas las cuotas parciales es tu cuota íntegra.
                </p>
              </div>
              <div className="pl-4 border-l-2 border-primary/30">
                <h3 className="font-bold text-foreground mb-1">3. Resta el mínimo personal y familiar</h3>
                <p className="text-muted-foreground leading-relaxed">
                  El mínimo personal (5.550 €) y las reducciones por hijos (2.400 € el primero, 2.700 € el segundo...) se restan de tu cuota. Esto reduce tu factura fiscal final.
                </p>
              </div>
              <div className="pl-4 border-l-2 border-primary/30">
                <h3 className="font-bold text-foreground mb-1">4. Calcula tu retención mensual</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Divide la cuota anual entre 12 (o 14 si cobras pagas extras). Eso es lo que tu empresa te retiene cada mes de tu nómina.
                </p>
              </div>
            </div>

            <h2 className="text-2xl md:text-3xl font-bold font-display text-foreground mt-10 mb-4">
              Ejemplo práctico: salario de 28.000 €
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              <strong className="text-foreground">Pedro</strong>, soltero y sin hijos, gana 28.000 € brutos al año trabajando en Barcelona.
            </p>
            <div className="bg-card border border-border rounded-lg p-5 mb-6 space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-muted-foreground">Salario bruto anual</span><span className="font-medium">28.000 €</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Cotizaciones SS (~6,35%)</span><span className="font-medium">-1.778 €</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Gastos deducibles</span><span className="font-medium">-2.000 €</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Base imponible</span><span className="font-bold">24.222 €</span></div>
              <hr className="border-border" />
              <div className="flex justify-between"><span className="text-muted-foreground">Retención anual IRPF</span><span className="font-bold text-primary">~3.600 €</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Tipo efectivo</span><span className="font-bold text-primary">~12,8%</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Retención mensual (14 pagas)</span><span className="font-bold text-primary">~257 €</span></div>
            </div>

            <h2 className="text-2xl md:text-3xl font-bold font-display text-foreground mt-10 mb-4">
              Tramos de IRPF 2026 en España
            </h2>
            <div className="overflow-x-auto rounded-lg border border-border mb-6">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-muted/50">
                    <th className="text-left p-3 font-semibold">Desde</th>
                    <th className="text-left p-3 font-semibold">Hasta</th>
                    <th className="text-center p-3 font-semibold">Tipo</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["0 €", "12.450 €", "19%"],
                    ["12.450 €", "20.200 €", "24%"],
                    ["20.200 €", "35.200 €", "30%"],
                    ["35.200 €", "60.000 €", "37%"],
                    ["60.000 €", "300.000 €", "45%"],
                    ["300.000 €", "En adelante", "47%"],
                  ].map(([desde, hasta, tipo]) => (
                    <tr key={desde} className="border-t border-border">
                      <td className="p-3 text-muted-foreground">{desde}</td>
                      <td className="p-3 text-muted-foreground">{hasta}</td>
                      <td className="p-3 text-center font-bold text-primary">{tipo}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <h2 className="text-2xl md:text-3xl font-bold font-display text-foreground mt-10 mb-4">
              Errores comunes con el IRPF
            </h2>
            <div className="space-y-4 mb-8">
              {[
                { titulo: "Creer que 'subes de tramo' y pierdes dinero", desc: "Falso. Solo la parte que supera el límite del tramo se grava al tipo superior. Ganar más SIEMPRE significa cobrar más neto." },
                { titulo: "No revisar el tipo de retención", desc: "Tu empresa calcula tu retención al principio del año. Si cambian tus circunstancias (hijos, hipoteca), puedes pedir que la ajusten con el modelo 145." },
                { titulo: "Ignorar las deducciones autonómicas", desc: "Cada comunidad autónoma tiene sus propias deducciones. Investiga las de tu zona: por alquiler, nacimiento de hijos, inversión en empresa nueva, etc." },
                { titulo: "No declarar ingresos extra", desc: "Trabajos freelance, ventas online, rendimientos de cuentas... Todo tributa. Si Hacienda lo detecta y no lo has declarado, hay recargo." },
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
              ¿Quieres saber cuánto te queda limpio cada mes? Prueba nuestra <Link to="/calculadora-nomina/" className="text-primary hover:underline">calculadora de nómina neta</Link>.
            </p>
          </article>
        </div>
      </section>

      <section id="faq" className="scroll-mt-20" ref={refFaq}>
        <div className={`transition-all duration-700 ${visFaq ? "animate-fade-up" : "opacity-0"}`}>
          <h2 className="text-2xl md:text-3xl font-bold font-display text-foreground mb-2">Preguntas frecuentes sobre el IRPF</h2>
          <p className="text-muted-foreground mb-8">Lo que más nos preguntan sobre impuestos, explicado sin rodeos.</p>
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

      <EnlacesCalculadoras excluir="/calculadora-irpf/" />
    </>
  );
}
