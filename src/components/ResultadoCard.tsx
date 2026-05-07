import { type ResultadoFiniquito, type TipoDespido } from "@/lib/finiquito";
import { Card } from "@/components/ui/card";
import { AlertTriangle, CheckCircle2, TrendingUp, MessageCircle } from "lucide-react";

const fmt = (n: number) =>
  n.toLocaleString("es-ES", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

const despidoLabels: Record<TipoDespido, string> = {
  disciplinario: "Despido disciplinario (procedente)",
  objetivo: "Despido objetivo",
  improcedente: "Despido improcedente",
  voluntario: "Baja voluntaria",
};

interface Props {
  resultado: ResultadoFiniquito;
  tipoDespido: TipoDespido;
}

export default function ResultadoCard({ resultado, tipoDespido }: Props) {
  const items = [
    {
      label: "Indemnización por despido",
      value: resultado.indemnizacion,
      detail:
        tipoDespido === "disciplinario" || tipoDespido === "voluntario"
          ? "En tu caso no te corresponde indemnización. Eso no significa que no cobres nada — sigue leyendo."
          : `Has trabajado ${resultado.aniosAntiguedad.toFixed(1)} años, que son ${resultado.diasIndemnizacion.toFixed(0)} días de indemnización a ${fmt(resultado.salarioDiario)} €/día.`,
    },
    {
      label: "Salario del mes que te deben",
      value: resultado.salarioPendiente,
      detail: `Te corresponden los ${resultado.diasTrabajadosMesActual} días que has trabajado en el último mes y que aún no has cobrado.`,
    },
    {
      label: "Vacaciones sin disfrutar",
      value: resultado.vacacionesNoDisfrutadas,
      detail:
        resultado.diasVacacionesPendientes > 0
          ? `Tienes ${resultado.diasVacacionesPendientes} días de vacaciones generados que no has usado. La empresa te los tiene que pagar.`
          : "No tienes días de vacaciones pendientes.",
    },
    {
      label: "Pagas extras (parte proporcional)",
      value: resultado.parteProporcionaPagasExtras,
      detail:
        resultado.parteProporcionaPagasExtras === 0
          ? "Tus pagas van prorrateadas o no queda parte pendiente."
          : "La parte de la paga extra que ya has generado desde la última vez que la cobraste.",
    },
  ];

  return (
    <Card className="p-6 md:p-8 border-0 ring-1 ring-primary/20 shadow-lg shadow-primary/5 animate-fade-up">
      <div className="flex items-center gap-3 mb-4">
        <CheckCircle2 className="h-6 w-6 text-primary" />
        <h3 className="text-xl font-bold font-display">Esto es lo que te corresponde</h3>
      </div>

      <p className="text-sm text-muted-foreground mb-6">
        Tu situación: <strong className="text-foreground">{despidoLabels[tipoDespido]}</strong>. 
        Aquí tienes el desglose completo, concepto por concepto.
      </p>

      <div className="space-y-4">
        {items.map((item) => (
          <div
            key={item.label}
            className="flex flex-col sm:flex-row sm:items-start justify-between gap-1 pb-4 border-b border-border last:border-0"
          >
            <div className="flex-1">
              <p className="font-medium text-foreground">{item.label}</p>
              <p className="text-sm text-muted-foreground mt-0.5">{item.detail}</p>
            </div>
            <span className="text-lg font-bold tabular-nums text-foreground sm:text-right shrink-0">
              {fmt(item.value)} €
            </span>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 rounded-lg bg-primary/5 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-primary" />
          <span className="text-lg font-bold font-display text-foreground">Total finiquito</span>
        </div>
        <span className="text-2xl font-bold tabular-nums text-primary">
          {fmt(resultado.totalFiniquito)} €
        </span>
      </div>

      <div className="mt-5 flex gap-2 p-3 rounded-md bg-accent/10 text-sm">
        <AlertTriangle className="h-4 w-4 text-accent shrink-0 mt-0.5" />
        <p className="text-muted-foreground">
          <strong className="text-foreground">Ojo, esto es una estimación.</strong> Tu convenio colectivo, complementos salariales o acuerdos con la empresa pueden hacer que la cifra real sea diferente. Si la cantidad es importante para ti, merece la pena que un abogado laboralista lo revise.
        </p>
      </div>

      <div className="mt-4 flex gap-2 p-3 rounded-md bg-primary/5 text-sm">
        <MessageCircle className="h-4 w-4 text-primary shrink-0 mt-0.5" />
        <p className="text-muted-foreground">
          <strong className="text-foreground">¿No cuadra con lo que te ofrece la empresa?</strong> Más abajo te explicamos los <a href="#errores" className="text-primary hover:underline">errores más comunes</a> que cometen las empresas al calcular el finiquito y <a href="#consejos" className="text-primary hover:underline">qué revisar antes de firmar</a>.
        </p>
      </div>
    </Card>
  );
}
