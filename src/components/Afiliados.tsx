import { useScrollReveal } from "@/hooks/useScrollReveal";
import { ExternalLink, Scale, Briefcase, Phone, ArrowRight } from "lucide-react";

const servicios = [
  {
    icon: Scale,
    nombre: "Habla con un abogado laboralista",
    desc: "Si tu finiquito no cuadra o el despido te parece injusto, un laboralista te dice en 10 minutos si tienes caso. Muchos ofrecen la primera consulta gratis.",
    cta: "Buscar abogado cerca de ti",
  },
  {
    icon: Briefcase,
    nombre: "Asesoría laboral para empresas",
    desc: "Si eres autónomo o empresa, calcular mal un finiquito puede salirte más caro que la propia indemnización. Asegúrate de hacerlo bien.",
    cta: "Encontrar asesoría",
  },
  {
    icon: Phone,
    nombre: "Teléfono gratuito del Ministerio de Trabajo",
    desc: "El 060 es el teléfono de información de la Administración. Pueden orientarte sobre tus derechos laborales sin coste.",
    cta: "Llamar al 060",
  },
];

export default function Afiliados() {
  const { ref, visible } = useScrollReveal();

  return (
    <section id="profesionales" className="scroll-mt-20" ref={ref}>
      <div className={`transition-all duration-700 ${visible ? "animate-fade-up" : "opacity-0"}`}>
        <h2 className="text-2xl md:text-3xl font-bold font-display text-foreground mb-2">
          ¿Tu caso necesita un profesional?
        </h2>
        <p className="text-muted-foreground mb-6 max-w-2xl">
          Nuestra calculadora te da una estimación fiable, pero cada situación tiene matices. Si te juegas mucho dinero, invertir en un profesional merece la pena.
        </p>

        <div className="grid gap-4 sm:grid-cols-3">
          {servicios.map((s) => (
            <div
              key={s.nombre}
              className="rounded-xl border border-border bg-card p-5 flex flex-col hover:shadow-md hover:shadow-primary/5 transition-shadow duration-300"
            >
              <div className="p-2 rounded-lg bg-primary/10 text-primary w-fit mb-3">
                <s.icon className="h-5 w-5" />
              </div>
              <h3 className="font-bold text-foreground mb-1">{s.nombre}</h3>
              <p className="text-sm text-muted-foreground flex-1 mb-3">{s.desc}</p>
              <span className="text-sm font-medium text-primary inline-flex items-center gap-1 cursor-pointer hover:underline">
                {s.cta} <ExternalLink className="h-3.5 w-3.5" />
              </span>
            </div>
          ))}
        </div>

        {/* Ad space */}
</div>
    </section>
  );
}

