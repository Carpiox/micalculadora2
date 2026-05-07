import SEOHead from "@/components/SEOHead";
import { Link } from "react-router-dom";
import { Calculator, Briefcase, Receipt, Wallet, Scale, ArrowRight, ChevronRight, CheckCircle2, Zap } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Button } from "@/components/ui/button";
import { generateWebsiteSchema } from "@/lib/schema";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const calculadoras = [
  {
    nombre: "Calculadora de Finiquito",
    desc: "Calcula cuánto te deben al dejar tu trabajo. Incluye salario pendiente, vacaciones no disfrutadas, pagas extras e indemnización por despido.",
    href: "/calculadora-finiquito/",
    icon: Calculator,
    keyword: "calcular finiquito",
    cta: "Calcular mi finiquito",
  },
  {
    nombre: "Calculadora de Paro",
    desc: "Averigua cuánto cobrarás de prestación por desempleo y durante cuántos meses, según tu base de cotización y tiempo trabajado.",
    href: "/calculadora-paro/",
    icon: Briefcase,
    keyword: "calcular paro",
    cta: "Calcular mi paro",
  },
  {
    nombre: "Calculadora de IRPF",
    desc: "Descubre cuánto te retiene Hacienda de tu salario. Consulta tu tipo efectivo, marginal y el desglose por tramos fiscales de 2026.",
    href: "/calculadora-irpf/",
    icon: Receipt,
    keyword: "calcular IRPF",
    cta: "Calcular mi IRPF",
  },
  {
    nombre: "Calculadora de Nómina Neta",
    desc: "Convierte tu salario bruto a neto al instante. Entiende cada deducción: Seguridad Social, IRPF, desempleo y formación.",
    href: "/calculadora-nomina/",
    icon: Wallet,
    keyword: "calcular nómina neta",
    cta: "Calcular mi nómina",
  },
  {
    nombre: "Calculadora de Indemnización",
    desc: "Calcula tu indemnización por despido improcedente, objetivo o ERE. Incluye el doble cálculo para contratos anteriores a 2012.",
    href: "/calculadora-indemnizacion/",
    icon: Scale,
    keyword: "indemnización despido",
    cta: "Calcular mi indemnización",
  },
];

const faqsGenerales = [
  {
    pregunta: "¿Son fiables los cálculos de estas herramientas?",
    respuesta: "Nuestras calculadoras están basadas en la legislación laboral y fiscal vigente en España (2026). Los resultados son orientativos y cubren la mayoría de situaciones habituales. Para casos complejos (convenios específicos, complementos salariales, etc.), siempre recomendamos consultar con un profesional.",
  },
  {
    pregunta: "¿Guardáis mis datos personales?",
    respuesta: "No. Todas las calculadoras funcionan directamente en tu navegador. No almacenamos, enviamos ni procesamos ningún dato personal. Tu información no sale de tu dispositivo.",
  },
  {
    pregunta: "¿Cuál es la diferencia entre finiquito e indemnización?",
    respuesta: "El finiquito es lo que te deben SIEMPRE que dejas un trabajo (salario pendiente, vacaciones, pagas). La indemnización es una cantidad adicional que solo te corresponde en ciertos tipos de despido (objetivo, improcedente, ERE). Puedes cobrar finiquito sin indemnización, pero no al revés.",
  },
  {
    pregunta: "¿Las calculadoras están actualizadas a 2026?",
    respuesta: "Sí. Todas las herramientas reflejan los tramos de IRPF, el IPREM, las bases de cotización y la normativa laboral vigente para el año 2026 en España.",
  },
  {
    pregunta: "¿Puedo usar estas herramientas si soy autónomo?",
    respuesta: "La calculadora de IRPF puede darte una referencia, pero las herramientas están diseñadas principalmente para trabajadores por cuenta ajena. Los autónomos tienen un régimen fiscal y de cotización diferente.",
  },
  {
    pregunta: "¿Necesito registrarme para usar las calculadoras?",
    respuesta: "No. Todas las herramientas son 100% gratuitas, sin registro, sin límite de uso y sin publicidad invasiva. Úsalas tantas veces como necesites.",
  },
];

const homepageSchema = generateWebsiteSchema();

export default function Index() {
  const { ref: refCalc, visible: visCalc } = useScrollReveal();
  const { ref: refBeneficios, visible: visBeneficios } = useScrollReveal();
  const { ref: refContenido, visible: visContenido } = useScrollReveal();
  const { ref: refFaq, visible: visFaq } = useScrollReveal();

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="miCalculadora.es — Calculadoras Laborales Gratis España 2026"
        description="Calcula gratis tu finiquito, paro, IRPF, nómina neta e indemnización por despido en España 2026. Sin registro, resultados instantáneos y legislación actualizada."
        path="/"
        keywords={[
          "calculadora finiquito",
          "calculadora paro",
          "calculadora irpf",
          "calculadora nómina neta",
          "calculadora indemnización despido",
        ]}
        schema={homepageSchema}
      />
      <Navbar />

      {/* Hero */}
      <header className="section-warm py-8 md:py-20">
        <div className="container max-w-3xl animate-fade-up">
          <h1 className="text-3xl md:text-5xl font-display font-bold text-foreground leading-tight md:leading-[1.1] text-center">
            Calculadoras laborales gratis para España en 2026
          </h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto text-center">
            Usa nuestras calculadoras laborales gratis para calcular tu finiquito, prestación por desempleo (paro), retención de IRPF, nómina neta e indemnización por despido en España 2026. Sin registro, resultados instantáneos y legislación actualizada. Más de 50.000 cálculos realizados.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3 mt-8">
            <Button asChild size="lg" className="gap-2">
              <a href="#calculadoras">
                <Zap className="h-4 w-4" />
                Explorar calculadoras
              </a>
            </Button>
            <Button asChild variant="outline" size="lg" className="gap-2">
              <Link to="/calculadora-finiquito/">
                Calcular mi finiquito <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-1 mt-6 text-xs text-muted-foreground">
            <span>✓ 5 calculadoras especializadas</span>
            <span>✓ Más de 50.000 cálculos realizados</span>
            <span>✓ 100% gratuito</span>
          </div>
        </div>
      </header>

      <main className="container py-12 space-y-20 max-w-3xl">
        {/* Calculadoras grid */}
        <section id="calculadoras" className="scroll-mt-20" ref={refCalc}>
          <div className={`transition-all duration-700 ${visCalc ? "animate-fade-up" : "opacity-0"}`}>
            <h2 className="text-2xl md:text-3xl font-bold font-display text-foreground mb-2">
              Calculadoras laborales España 2026: finiquito, paro y más
            </h2>
            <p className="text-muted-foreground mb-8">
              Cada herramienta está diseñada para resolver una duda concreta. Haz clic en la que necesites.
            </p>

            <div className="space-y-3">
              {calculadoras.map((c, i) => (
                <Link
                  key={c.href}
                  to={c.href}
                  className="group flex gap-4 p-5 rounded-xl border border-border bg-card hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 hover:border-primary/20"
                  style={{ animationDelay: `${i * 80}ms` }}
                >
                  <div className="p-2.5 rounded-lg bg-primary/10 text-primary w-fit h-fit shrink-0 group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                    <c.icon className="h-6 w-6" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-foreground group-hover:text-primary transition-colors text-lg">{c.nombre}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{c.desc}</p>
                    <span className="inline-flex items-center gap-1 mt-2 text-sm font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                      {c.cta} <ArrowRight className="h-3.5 w-3.5" />
                    </span>
                  </div>
                  <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary shrink-0 mt-1 transition-transform group-hover:translate-x-1 duration-300" />
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Beneficios */}
        <section ref={refBeneficios}>
          <div className={`transition-all duration-700 ${visBeneficios ? "animate-fade-up" : "opacity-0"}`}>
            <h2 className="text-2xl md:text-3xl font-bold font-display text-foreground mb-2">
              ¿Por qué miles de usuarios ya confían en miCalculadora.es?
            </h2>
            <p className="text-muted-foreground mb-6">
              Herramientas basadas en la legislación española 2026, diseñadas para darte respuestas claras y fiables sin complicaciones.
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                { titulo: "Resultados al instante", desc: "Sin esperar citas ni llamadas. Introduces tus datos y tienes la respuesta en segundos. Más de 50.000 cálculos realizados." },
                { titulo: "Legislación española 2026", desc: "Tramos de IRPF, IPREM, bases de cotización y normativa laboral actualizados a la legislación vigente en España." },
                { titulo: "Privacidad total", desc: "Todo se calcula en tu navegador. No guardamos, enviamos ni procesamos ningún dato personal." },
                { titulo: "Explicaciones claras", desc: "Cada resultado incluye un desglose detallado para que entiendas de dónde sale cada cifra." },
              ].map((b) => (
                <div key={b.titulo} className="flex gap-3 p-4 rounded-xl border border-border bg-card">
                  <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-bold text-foreground">{b.titulo}</h3>
                    <p className="text-sm text-muted-foreground mt-0.5">{b.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Ad space */}
{/* Contenido SEO */}
        <section ref={refContenido}>
          <div className={`transition-all duration-700 ${visContenido ? "animate-fade-up" : "opacity-0"}`}>
            <article className="max-w-none">
              <h2 className="text-2xl md:text-3xl font-bold font-display text-foreground mb-4">
                Guía completa sobre calculadoras laborales y financieras en España
              </h2>

              <p className="text-muted-foreground leading-relaxed mb-4">
                Gestionar tu vida laboral en España implica enfrentarte a cálculos que nadie te enseñó en el colegio. Desde entender cuánto te deben cuando dejas un trabajo hasta saber si Hacienda te está reteniendo de más, estas son dudas que afectan a millones de trabajadores cada año. En <strong className="text-foreground">miCalculadora.es</strong> hemos reunido todas las herramientas que necesitas en un solo lugar.
              </p>

              <p className="text-muted-foreground leading-relaxed mb-4">
                Hemos creado esta suite de herramientas porque nos parecía injusto que algo tan básico como saber cuánto te corresponde dependiera de páginas llenas de publicidad, fórmulas incomprensibles o consultas de pago. Aquí encuentras todo en un solo sitio, explicado como te lo contaría un amigo que sabe de esto.
              </p>

              <h3 className="text-xl font-bold font-display text-foreground mt-10 mb-3">
                ¿Cuándo necesitas una calculadora laboral?
              </h3>

              <p className="text-muted-foreground leading-relaxed mb-4">
                Hay momentos clave en tu vida profesional en los que necesitas tener las cifras claras. Estos son los más habituales:
              </p>

              <ul className="space-y-3 text-muted-foreground mb-6">
                <li className="flex gap-3 items-start">
                  <span className="font-bold text-primary shrink-0">·</span>
                  <span><strong className="text-foreground">Te han despedido:</strong> necesitas saber si el finiquito que te ofrecen es correcto y cuánto te corresponde de indemnización. Usa nuestra <Link to="/calculadora-finiquito/" className="text-primary hover:underline">calculadora de finiquito</Link> y la <Link to="/calculadora-indemnizacion/" className="text-primary hover:underline">calculadora de indemnización</Link>.</span>
                </li>
                <li className="flex gap-3 items-start">
                  <span className="font-bold text-primary shrink-0">·</span>
                  <span><strong className="text-foreground">Estás en paro:</strong> averigua cuánto cobrarás y durante cuántos meses con nuestra <Link to="/calculadora-paro/" className="text-primary hover:underline">calculadora de prestación por desempleo</Link>.</span>
                </li>
                <li className="flex gap-3 items-start">
                  <span className="font-bold text-primary shrink-0">·</span>
                  <span><strong className="text-foreground">Negociando un salario:</strong> antes de aceptar una oferta, calcula cuánto te llegará realmente al bolsillo con la <Link to="/calculadora-nomina/" className="text-primary hover:underline">calculadora de nómina neta</Link>.</span>
                </li>
                <li className="flex gap-3 items-start">
                  <span className="font-bold text-primary shrink-0">·</span>
                  <span><strong className="text-foreground">Haciendo la declaración de la renta:</strong> comprueba si te están reteniendo de más o de menos con la <Link to="/calculadora-irpf/" className="text-primary hover:underline">calculadora de IRPF</Link>.</span>
                </li>
              </ul>

              <h3 className="text-xl font-bold font-display text-foreground mt-10 mb-3">
                ¿Qué hace diferente a miCalculadora.es?
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                A diferencia de otras herramientas online, nuestras calculadoras no requieren registro, no almacenan datos y no están llenas de publicidad invasiva. Cada herramienta incluye contenido educativo que te ayuda a entender los resultados: explicaciones paso a paso, ejemplos prácticos con números reales y las preguntas frecuentes más relevantes.
              </p>

              <p className="text-muted-foreground leading-relaxed mb-4">
                Además, mantenemos un sistema de interlinking entre todas las herramientas. Si calculas tu finiquito y necesitas saber cuánto cobrarás de paro después, puedes pasar de una calculadora a otra con un solo clic. Todo está pensado para que resuelvas tus dudas laborales y financieras de forma rápida y sin complicaciones.
              </p>

              <h3 className="text-xl font-bold font-display text-foreground mt-10 mb-3">
                ¿Qué legislación usamos?
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Todas nuestras herramientas se basan en la legislación vigente en España para 2026. Esto incluye el <strong className="text-foreground">Estatuto de los Trabajadores</strong> (Real Decreto Legislativo 2/2015), la <strong className="text-foreground">Ley General de la Seguridad Social</strong>, los <strong className="text-foreground">tramos de IRPF</strong> aprobados en los Presupuestos Generales del Estado, y el <strong className="text-foreground">IPREM</strong> actualizado para este año.
              </p>

              <p className="text-muted-foreground leading-relaxed mb-4">
                Cada vez que hay un cambio normativo relevante, actualizamos las fórmulas y los límites. Nuestro objetivo es que siempre trabajes con datos fiables y actuales.
              </p>

              <h3 className="text-xl font-bold font-display text-foreground mt-10 mb-3">
                Fiabilidad y limitaciones
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Nuestros cálculos cubren la mayoría de situaciones estándar para trabajadores por cuenta ajena en España. Sin embargo, hay factores que pueden hacer que tu caso particular difiera: convenios colectivos con condiciones especiales, complementos salariales atípicos, reducciones de jornada, contratos a tiempo parcial con particularidades, etc. Para estos casos, siempre recomendamos contrastar con un profesional. Estas herramientas te dan un punto de partida sólido, no un sustituto del asesoramiento legal.
              </p>
            </article>
          </div>
        </section>

        {/* FAQ general */}
        <section id="faq" className="scroll-mt-20" ref={refFaq}>
          <div className={`transition-all duration-700 ${visFaq ? "animate-fade-up" : "opacity-0"}`}>
            <h2 className="text-2xl md:text-3xl font-bold font-display text-foreground mb-2">
              Preguntas frecuentes sobre calculadoras laborales en España
            </h2>
            <p className="text-muted-foreground mb-8">
              Las dudas más comunes sobre nuestras herramientas de cálculo laboral y financiero.
            </p>

            <Accordion type="single" collapsible className="space-y-2">
              {faqsGenerales.map((faq, i) => (
                <AccordionItem
                  key={i}
                  value={`faq-${i}`}
                  className="border border-border rounded-lg px-4 data-[state=open]:bg-card data-[state=open]:shadow-sm transition-all"
                >
                  <AccordionTrigger className="text-left font-medium text-foreground hover:no-underline py-4">
                    {faq.pregunta}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pb-4 leading-relaxed">
                    {faq.respuesta}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* CTA final */}
        <section className="text-center py-8">
          <h2 className="text-2xl font-bold font-display text-foreground mb-3">
            ¿Listo para calcular?
          </h2>
          <p className="text-muted-foreground mb-6">Elige la calculadora que necesitas y obtén resultados en segundos.</p>
          <div className="flex flex-wrap justify-center gap-3">
            <Button asChild>
              <Link to="/calculadora-finiquito/">Calcular finiquito</Link>
            </Button>
            <Button asChild variant="outline">
              <Link to="/calculadora-paro/">Calcular paro</Link>
            </Button>
            <Button asChild variant="outline">
              <Link to="/calculadora-irpf/">Calcular IRPF</Link>
            </Button>
            <Button asChild variant="outline">
              <Link to="/calculadora-nomina/">Calcular nómina</Link>
            </Button>
            <Button asChild variant="outline">
              <Link to="/calculadora-indemnizacion/">Calcular indemnización</Link>
            </Button>
          </div>
        </section>

        {/* Ad space */}
</main>

      <Footer />
    </div>
  );
}


