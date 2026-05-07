import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useState } from "react";
import { calcularFiniquito } from "@/lib/finiquito";
import { Users, ArrowRight } from "lucide-react";

const casos = [
  {
    nombre: "Laura",
    emoji: "👩‍💼",
    historia: "Laura trabajó 3 años como administrativa en una gestoría de Valencia. Cobraba 1.400 € brutos al mes con 2 pagas extras. La despidieron por causas económicas (despido objetivo) el 20 de abril. No había cogido vacaciones.",
    datos: {
      tipoContrato: "indefinido" as const,
      tipoDespido: "objetivo" as const,
      salarioBrutoMensual: 1400,
      fechaInicio: new Date(2022, 3, 1),
      fechaFin: new Date(2026, 3, 20),
      pagasExtras: 2,
      pagasProrrateadas: false,
      diasVacacionesPorAnio: 30,
      diasVacacionesDisfrutados: 0,
    },
  },
  {
    nombre: "Carlos",
    emoji: "👨‍🔧",
    historia: "Carlos llevaba 8 años como técnico de mantenimiento en una fábrica de Zaragoza. Su salario era de 2.200 € brutos con pagas prorrateadas. Le despidieron de forma improcedente el 10 de junio. Había gastado 5 días de vacaciones.",
    datos: {
      tipoContrato: "indefinido" as const,
      tipoDespido: "improcedente" as const,
      salarioBrutoMensual: 2200,
      fechaInicio: new Date(2017, 5, 1),
      fechaFin: new Date(2026, 5, 10),
      pagasExtras: 2,
      pagasProrrateadas: true,
      diasVacacionesPorAnio: 30,
      diasVacacionesDisfrutados: 5,
    },
  },
  {
    nombre: "Ana",
    emoji: "👩‍🍳",
    historia: "Ana era camarera con contrato temporal en un restaurante de Sevilla. Cobraba 1.200 € brutos al mes, con pagas no prorrateadas. Después de 1 año y medio, decidió marcharse por su cuenta el 15 de septiembre.",
    datos: {
      tipoContrato: "temporal" as const,
      tipoDespido: "voluntario" as const,
      salarioBrutoMensual: 1200,
      fechaInicio: new Date(2024, 2, 1),
      fechaFin: new Date(2026, 8, 15),
      pagasExtras: 2,
      pagasProrrateadas: false,
      diasVacacionesPorAnio: 30,
      diasVacacionesDisfrutados: 10,
    },
  },
];

const fmt = (n: number) =>
  n.toLocaleString("es-ES", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

export default function EjemplosReales() {
  const { ref, visible } = useScrollReveal();
  const [expandido, setExpandido] = useState<number | null>(null);

  return (
    <section id="ejemplos" className="scroll-mt-20" ref={ref}>
      <div className={`transition-all duration-700 ${visible ? "animate-fade-up" : "opacity-0"}`}>
        <div className="flex items-center gap-3 mb-2">
          <Users className="h-6 w-6 text-primary" />
          <h2 className="text-2xl md:text-3xl font-bold font-display text-foreground">
            Ejemplos reales de finiquitos en España
          </h2>
        </div>
        <p className="text-muted-foreground mb-2 max-w-2xl">
          Nada mejor que ver casos concretos para entender cuánto te corresponde. Estos son perfiles basados en situaciones reales que vemos todos los días.
        </p>
        <p className="text-sm text-muted-foreground mb-8 max-w-2xl">
          <strong className="text-foreground">¿Te identificas con alguno?</strong> Haz clic en "Ver desglose" para entender exactamente de dónde sale cada euro.
        </p>

        <div className="space-y-4">
          {casos.map((caso, i) => {
            const res = calcularFiniquito(caso.datos);
            const abierto = expandido === i;
            return (
              <article
                key={caso.nombre}
                className="rounded-xl border border-border bg-card overflow-hidden hover:shadow-md hover:shadow-primary/5 transition-shadow duration-300"
              >
                <div className="p-5">
                  <div className="flex items-start gap-3 mb-3">
                    <span className="text-2xl">{caso.emoji}</span>
                    <div className="flex-1">
                      <h3 className="font-bold text-foreground">{caso.nombre}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed mt-1">
                        {caso.historia}
                      </p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-xs text-muted-foreground">Total finiquito</p>
                      <p className="text-lg font-bold tabular-nums text-primary">
                        {fmt(res.totalFiniquito)} €
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => setExpandido(abierto ? null : i)}
                    className="text-sm font-medium text-primary inline-flex items-center gap-1 hover:underline mt-1"
                  >
                    {abierto ? "Ocultar desglose" : "Ver desglose completo"}{" "}
                    <ArrowRight className={`h-3.5 w-3.5 transition-transform ${abierto ? "rotate-90" : ""}`} />
                  </button>
                </div>

                {abierto && (
                  <div className="border-t border-border bg-muted/30 p-5 text-sm space-y-1.5 animate-fade-in">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Indemnización</span>
                      <span className="font-medium tabular-nums text-foreground">{fmt(res.indemnizacion)} €</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Salario pendiente ({res.diasTrabajadosMesActual} días)</span>
                      <span className="font-medium tabular-nums text-foreground">{fmt(res.salarioPendiente)} €</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Vacaciones no disfrutadas ({res.diasVacacionesPendientes} días)</span>
                      <span className="font-medium tabular-nums text-foreground">{fmt(res.vacacionesNoDisfrutadas)} €</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Parte proporcional pagas extras</span>
                      <span className="font-medium tabular-nums text-foreground">{fmt(res.parteProporcionaPagasExtras)} €</span>
                    </div>
                    <hr className="my-2 border-border" />
                    <div className="flex justify-between font-bold text-primary">
                      <span>Total</span>
                      <span className="tabular-nums">{fmt(res.totalFiniquito)} €</span>
                    </div>
                  </div>
                )}
              </article>
            );
          })}
        </div>

        <p className="text-sm text-muted-foreground mt-6 text-center">
          ¿Tu caso es diferente? <a href="#calculadora" className="text-primary font-medium hover:underline">Usa la calculadora de arriba</a> con tus datos reales.
        </p>
      </div>
    </section>
  );
}
