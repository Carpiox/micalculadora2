import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import EnlacesCalculadoras from "@/components/EnlacesCalculadoras";
import { Link } from "react-router-dom";

interface FaqItem {
  pregunta: string;
  respuesta: string;
}

interface NominaBelowFoldProps {
  faqs: FaqItem[];
}

export default function NominaBelowFold({ faqs }: NominaBelowFoldProps) {
  const { ref: refSeo, visible: visSeo } = useScrollReveal();
  const { ref: refFaq, visible: visFaq } = useScrollReveal();

  return (
    <>
      <section ref={refSeo}>
        <div className={`transition-all duration-700 ${visSeo ? "animate-fade-up" : "opacity-0"}`}>
          <article>
            <h2 className="text-2xl md:text-3xl font-bold font-display text-foreground mb-4">
              Cómo funciona tu nómina en España
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Tu nómina es el documento que detalla cuánto ganas y cuánto te descuentan cada mes. Entenderla es fundamental para saber si te pagan correctamente y para negociar tu salario con conocimiento de causa.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-6">
              De tu salario bruto mensual se restan dos grandes bloques: las <strong className="text-foreground">cotizaciones a la Seguridad Social</strong> (fijas, alrededor del 6,35%) y la <strong className="text-foreground">retención de IRPF</strong> (variable, depende de tu salario y circunstancias personales). Lo que queda es tu salario neto.
            </p>

            <h2 className="text-2xl md:text-3xl font-bold font-display text-foreground mt-10 mb-4">
              Cómo calcular tu nómina neta paso a paso
            </h2>
            <div className="space-y-6 mb-8">
              <div className="pl-4 border-l-2 border-primary/30">
                <h3 className="font-bold text-foreground mb-1">1. Parte de tu salario bruto</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Es la cifra que aparece en tu contrato o en la parte superior de tu nómina. Si cobras 14 pagas de 2.000 €, tu bruto anual es 28.000 €. Si cobras 12 pagas de 2.333 €, también son 28.000 € anuales.
                </p>
              </div>
              <div className="pl-4 border-l-2 border-primary/30">
                <h3 className="font-bold text-foreground mb-1">2. Resta las cotizaciones a la Seguridad Social</h3>
                <p className="text-muted-foreground leading-relaxed">
                  <strong className="text-foreground">Contingencias comunes:</strong> 4,70%. <strong className="text-foreground">Desempleo:</strong> 1,55%. <strong className="text-foreground">Formación profesional:</strong> 0,10%. <strong className="text-foreground">MEI:</strong> 0,80% (2026). Total: aproximadamente el 7,15% de tu base de cotización.
                </p>
              </div>
              <div className="pl-4 border-l-2 border-primary/30">
                <h3 className="font-bold text-foreground mb-1">3. Resta la retención de IRPF</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Tu empresa calcula el tipo de retención en función de tu salario anual, situación familiar e hijos. Un trabajador soltero sin hijos con 25.000 € brutos tendrá una retención de aproximadamente el 14-15%.
                </p>
              </div>
              <div className="pl-4 border-l-2 border-primary/30">
                <h3 className="font-bold text-foreground mb-1">4. El resultado es tu neto</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Bruto - Cotizaciones SS - IRPF = Neto. Eso es lo que llega a tu cuenta bancaria cada mes.
                </p>
              </div>
            </div>

            <h2 className="text-2xl md:text-3xl font-bold font-display text-foreground mt-10 mb-4">
              Ejemplo práctico: salario bruto de 25.000 €
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              <strong className="text-foreground">Elena</strong>, 30 años, soltera, sin hijos, con 14 pagas.
            </p>
            <div className="bg-card border border-border rounded-lg p-5 mb-6 space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-muted-foreground">Salario bruto mensual (14 pagas)</span><span className="font-medium">1.785,71 €</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Contingencias comunes (4,7%)</span><span className="text-destructive">-97,83 €</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Desempleo (1,55%)</span><span className="text-destructive">-32,29 €</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Formación + MEI (0,8%)</span><span className="text-destructive">-16,67 €</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">IRPF (~14%)</span><span className="text-destructive">-250,00 €</span></div>
              <hr className="border-border" />
              <div className="flex justify-between"><span className="font-bold">Neto mensual</span><span className="font-bold text-primary">~1.388 €</span></div>
            </div>

            <h2 className="text-2xl md:text-3xl font-bold font-display text-foreground mt-10 mb-4">
              Factores que influyen en tu nómina neta
            </h2>
            <ul className="space-y-3 text-muted-foreground mb-8">
              {[
                ["Número de pagas", "Con 12 pagas cobras más cada mes pero sin extras. Con 14, menos mensual pero con paga en junio y diciembre. El neto anual es idéntico."],
                ["Situación familiar", "Estar casado/a con cónyuge sin ingresos o tener hijos reduce tu retención de IRPF, así que cobras más neto cada mes."],
                ["Tipo de contrato", "Los contratos temporales tienen una retención mínima del 2% si son inferiores a un año. Los indefinidos se calculan según la tabla general."],
                ["Comunidad autónoma", "Los tipos de IRPF autonómicos varían ligeramente entre comunidades. Madrid suele tener tipos más bajos; Cataluña y Valencia, más altos."],
              ].map(([titulo, desc]) => (
                <li key={titulo} className="flex flex-col sm:flex-row gap-1 sm:gap-3 items-start">
                  <span className="font-bold text-primary shrink-0 sm:w-36">{titulo}</span>
                  <span>{desc}</span>
                </li>
              ))}
            </ul>

            <h2 className="text-2xl md:text-3xl font-bold font-display text-foreground mt-10 mb-4">
              Errores comunes al interpretar tu nómina
            </h2>
            <div className="space-y-4 mb-8">
              {[
                { titulo: "Confundir bruto con neto en una oferta de trabajo", desc: "El 99% de las ofertas de empleo hablan de salario bruto. Si te ofrecen 30.000 € y piensas que son netos, te llevarás un disgusto importante." },
                { titulo: "No revisar la base de cotización", desc: "Algunas empresas cotizan por debajo de tu salario real usando complementos 'no cotizables'. Esto te perjudica en prestaciones futuras (paro, jubilación)." },
                { titulo: "Ignorar los complementos salariales", desc: "Pluses de transporte, comida, antigüedad... todos cuentan para tu bruto. Comprueba que están bien reflejados en tu nómina." },
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
              ¿Quieres saber cuánto IRPF pagas exactamente? Usa nuestra <Link to="/calculadora-irpf/" className="text-primary hover:underline">calculadora de IRPF</Link> para un desglose por tramos.
            </p>
          </article>
        </div>
      </section>

      <section id="faq" className="scroll-mt-20" ref={refFaq}>
        <div className={`transition-all duration-700 ${visFaq ? "animate-fade-up" : "opacity-0"}`}>
          <h2 className="text-2xl md:text-3xl font-bold font-display text-foreground mb-2">Preguntas frecuentes sobre la nómina</h2>
          <p className="text-muted-foreground mb-8">Las dudas más comunes sobre tu nómina, resueltas sin jerga.</p>
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

      <EnlacesCalculadoras excluir="/calculadora-nomina/" />
    </>
  );
}
