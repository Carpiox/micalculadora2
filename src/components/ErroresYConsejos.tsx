import { useScrollReveal } from "@/hooks/useScrollReveal";
import { AlertCircle, ShieldCheck, ArrowRight } from "lucide-react";

export default function ErroresYConsejos() {
  const { ref: refErr, visible: visErr } = useScrollReveal();
  const { ref: refCon, visible: visCon } = useScrollReveal();

  const errores = [
    {
      titulo: "No incluir la parte proporcional de las pagas extras",
      desc: "Es el error más habitual. Si tus pagas no están prorrateadas, la empresa te debe la parte que has generado desde la última paga. Muchas empresas \"se olvidan\" de incluirlo.",
    },
    {
      titulo: "Calcular las vacaciones sobre días naturales en vez de laborables",
      desc: "Algunos convenios hablan de 30 días naturales y otros de 22 días laborables. Si te calculan las vacaciones con la base equivocada, la cifra cambia bastante.",
    },
    {
      titulo: "No contar los complementos salariales",
      desc: "El salario diario para calcular la indemnización debe incluir TODOS tus ingresos regulares: pluses de transporte, nocturnidad, antigüedad, etc. No solo el salario base.",
    },
    {
      titulo: "Aplicar mal la antigüedad",
      desc: "Hemos visto casos donde la empresa cuenta solo años completos y \"se come\" los meses sobrantes. La ley dice que la antigüedad se calcula por períodos completos de meses y días, no solo años enteros.",
    },
    {
      titulo: "Confundir finiquito con indemnización",
      desc: "La empresa te ofrece firmar el \"finiquito\" pero solo incluye la indemnización y no el salario pendiente o las vacaciones. Son cosas distintas y te deben las dos.",
    },
  ];

  const consejos = [
    {
      titulo: "Pide la carta de despido por escrito",
      desc: "Sin documento escrito, el despido puede ser declarado nulo. Además, la carta debe especificar el motivo y la fecha de efectos. No firmes nada que no entiendas.",
    },
    {
      titulo: "Firma siempre con \"No conforme\"",
      desc: "Firmar el finiquito NO significa que estés de acuerdo. Escribir \"No conforme\" al lado de tu firma te permite reclamar después. Tienes hasta 1 año para hacerlo.",
    },
    {
      titulo: "Lleva a un representante sindical",
      desc: "Tienes derecho a que un representante de los trabajadores esté presente cuando te hagan firmar el finiquito. Muchas personas no lo saben y van solas.",
    },
    {
      titulo: "Compara el finiquito con tu nómina",
      desc: "El salario diario del finiquito debe cuadrar con lo que aparece en tu última nómina. Si no coincide, pregunta por qué antes de firmar.",
    },
    {
      titulo: "Guarda toda la documentación",
      desc: "Nóminas, contrato, carta de despido, comunicaciones por email... Si tienes que reclamar, la documentación es tu mejor arma.",
    },
    {
      titulo: "Consulta los plazos para demandar",
      desc: "Para impugnar un despido tienes solo 20 días hábiles. Para reclamar cantidades del finiquito, 1 año. No dejes que se te pase el plazo.",
    },
  ];

  return (
    <>
      <section id="errores" className="scroll-mt-20" ref={refErr}>
        <div className={`transition-all duration-700 ${visErr ? "animate-fade-up" : "opacity-0"}`}>
          <div className="flex items-center gap-3 mb-2">
            <AlertCircle className="h-6 w-6 text-accent" />
            <h2 className="text-2xl md:text-3xl font-bold font-display text-foreground">
              5 errores que cometen las empresas al calcular tu finiquito
            </h2>
          </div>
          <p className="text-muted-foreground mb-8 max-w-2xl">
            Después de revisar cientos de finiquitos, estos son los fallos que vemos una y otra vez. Comprueba que el tuyo no tiene ninguno.
          </p>

          <div className="space-y-4">
            {errores.map((e, i) => (
              <div
                key={i}
                className="flex gap-4 p-4 rounded-lg border border-border bg-card hover:shadow-sm transition-shadow duration-200"
              >
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-accent/10 text-accent font-bold text-sm shrink-0">
                  {i + 1}
                </span>
                <div>
                  <h3 className="font-bold text-foreground mb-1">{e.titulo}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{e.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <p className="text-sm text-muted-foreground mt-6">
            <strong className="text-foreground">¿Te suena alguno?</strong> Si crees que tu finiquito no está bien calculado, tienes derecho a reclamar. <a href="#profesionales" className="text-primary hover:underline">Un abogado laboralista puede revisarlo</a> y decirte en 10 minutos si te están pagando de menos.
          </p>
        </div>
      </section>

      <section id="consejos" className="scroll-mt-20" ref={refCon}>
        <div className={`transition-all duration-700 ${visCon ? "animate-fade-up" : "opacity-0"}`}>
          <div className="flex items-center gap-3 mb-2">
            <ShieldCheck className="h-6 w-6 text-primary" />
            <h2 className="text-2xl md:text-3xl font-bold font-display text-foreground">
              Qué revisar antes de firmar tu finiquito
            </h2>
          </div>
          <p className="text-muted-foreground mb-8 max-w-2xl">
            Estos consejos te pueden ahorrar mucho dinero y disgustos. Léelos antes de firmar nada.
          </p>

          <div className="grid gap-4 sm:grid-cols-2">
            {consejos.map((c, i) => (
              <div
                key={i}
                className="p-4 rounded-lg border border-border bg-card hover:shadow-sm transition-shadow duration-200"
              >
                <h3 className="font-bold text-foreground mb-1 flex items-start gap-2">
                  <span className="mt-0.5 h-2 w-2 rounded-full bg-primary shrink-0" />
                  {c.titulo}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed ml-4">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
