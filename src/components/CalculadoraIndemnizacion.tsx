import { useState } from "react";
import { Scale, ArrowRight, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { calcularIndemnizacion, type ResultadoIndemnizacion, type TipoDespidoIndem } from "@/lib/indemnizacion";

function InfoTip({ text }: { text: string }) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Info className="inline h-4 w-4 text-muted-foreground cursor-help ml-1" />
      </TooltipTrigger>
      <TooltipContent className="max-w-xs text-sm">{text}</TooltipContent>
    </Tooltip>
  );
}

const fmt = (n: number) => n.toLocaleString("es-ES", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

export default function CalculadoraIndemnizacion() {
  const [tipo, setTipo] = useState<TipoDespidoIndem>("improcedente");
  const [salario, setSalario] = useState("");
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState(new Date().toISOString().split("T")[0]);
  const [preReforma, setPreReforma] = useState(false);
  const [resultado, setResultado] = useState<ResultadoIndemnizacion | null>(null);
  const [error, setError] = useState("");

  const handleCalcular = () => {
    setError("");
    const sal = parseFloat(salario);
    if (!sal || sal <= 0) {
      setError("Introduce tu salario bruto anual.");
      return;
    }
    if (!fechaInicio) {
      setError("Necesitamos la fecha de inicio del contrato.");
      return;
    }
    const inicio = new Date(fechaInicio);
    const fin = new Date(fechaFin);
    if (fin <= inicio) {
      setError("La fecha de fin debe ser posterior a la de inicio.");
      return;
    }

    const res = calcularIndemnizacion({
      tipoDespido: tipo,
      salarioBrutoAnual: sal,
      fechaInicio: inicio,
      fechaFin: fin,
      fechaContratoPreReforma: preReforma,
    });
    setResultado(res);
    setTimeout(() => {
      document.getElementById("resultado-indemnizacion")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  };

  return (
    <section id="calculadora" className="scroll-mt-20">
      <Card className="p-6 md:p-8 shadow-lg shadow-primary/5 border-0 ring-1 ring-border">
        <div className="flex items-center gap-3 mb-2">
          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10">
            <Scale className="h-5 w-5 text-primary" />
          </div>
          <h2 className="text-xl md:text-2xl font-bold font-display text-foreground leading-tight">
            Calculadora de indemnización por despido
          </h2>
        </div>
        <p className="text-sm text-muted-foreground mb-6 ml-[52px]">
          Calcula cuánto te corresponde de indemnización según el tipo de despido y tu antigüedad.
        </p>

        <div className="grid gap-5 md:grid-cols-2">
          <div className="space-y-2">
            <Label>
              Tipo de despido
              <InfoTip text="El tipo de despido determina los días de indemnización por año. Si no lo sabes, revisa tu carta de despido." />
            </Label>
            <Select value={tipo} onValueChange={(v) => setTipo(v as TipoDespidoIndem)}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="improcedente">Improcedente (33 días/año)</SelectItem>
                <SelectItem value="objetivo">Objetivo (20 días/año)</SelectItem>
                <SelectItem value="disciplinario">Disciplinario (0 días)</SelectItem>
                <SelectItem value="fin_temporal">Fin de contrato temporal (12 días/año)</SelectItem>
                <SelectItem value="ere">ERE (mínimo 20 días/año)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="salario-indem">
              Salario bruto anual (€)
              <InfoTip text="Incluye todos los conceptos salariales: base, complementos, pluses, etc." />
            </Label>
            <Input id="salario-indem" type="number" placeholder="Ej: 24.000" value={salario} onChange={(e) => setSalario(e.target.value)} min={0} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="inicio-indem">Fecha de inicio del contrato</Label>
            <Input id="inicio-indem" type="date" value={fechaInicio} onChange={(e) => setFechaInicio(e.target.value)} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="fin-indem">Fecha de despido</Label>
            <Input id="fin-indem" type="date" value={fechaFin} onChange={(e) => setFechaFin(e.target.value)} />
          </div>

          {tipo === "improcedente" && (
            <div className="flex items-center gap-3 md:col-span-2 pt-1">
              <Switch id="pre-reforma" checked={preReforma} onCheckedChange={setPreReforma} />
              <Label htmlFor="pre-reforma" className="cursor-pointer">
                Mi contrato empezó antes de febrero de 2012
                <InfoTip text="Si tu contrato es anterior al 12 de febrero de 2012, la indemnización se calcula con el 'doble cálculo': 45 días/año antes de la reforma y 33 días/año después." />
              </Label>
            </div>
          )}
        </div>

        {error && <p className="mt-4 text-sm text-destructive font-medium" role="alert">{error}</p>}

        <Button onClick={handleCalcular} size="lg" className="w-full mt-6 text-base font-semibold active:scale-[0.98] transition-transform">
          Calcular mi indemnización <ArrowRight className="h-4 w-4 ml-1" />
        </Button>
        <p className="text-xs text-muted-foreground text-center mt-3">Gratis, sin registro y al instante.</p>
      </Card>

      {resultado && (
        <div id="resultado-indemnizacion" className="mt-8 scroll-mt-20">
          <Card className="p-6 md:p-8 border-0 ring-1 ring-primary/20 shadow-lg shadow-primary/5 animate-fade-up">
            <h3 className="text-xl font-bold font-display mb-4">Tu indemnización por despido</h3>

            {resultado.indemnizacion === 0 ? (
              <p className="text-muted-foreground">{resultado.explicacion}</p>
            ) : (
              <>
                <div className="space-y-3">
                  <div className="flex justify-between pb-3 border-b border-border">
                    <span className="text-muted-foreground">Antigüedad</span>
                    <span className="font-bold">{resultado.aniosAntiguedad} años</span>
                  </div>
                  <div className="flex justify-between pb-3 border-b border-border">
                    <span className="text-muted-foreground">Salario diario</span>
                    <span className="font-medium tabular-nums">{fmt(resultado.salarioDiario)} €/día</span>
                  </div>
                  <div className="flex justify-between pb-3 border-b border-border">
                    <span className="text-muted-foreground">Días de indemnización ({resultado.diasPorAnio} días/año)</span>
                    <span className="font-medium tabular-nums">{fmt(resultado.diasTotales)} días</span>
                  </div>
                  {resultado.topeAlcanzado && (
                    <div className="flex justify-between pb-3 border-b border-border">
                      <span className="text-muted-foreground">Tope aplicado</span>
                      <span className="font-medium text-accent">{resultado.topeMensualidades} mensualidades</span>
                    </div>
                  )}
                </div>

                <div className="mt-6 p-4 rounded-lg bg-primary/5 flex items-center justify-between gap-4">
                  <span className="text-lg font-bold font-display">Indemnización</span>
                  <span className="text-2xl font-bold tabular-nums text-primary">{fmt(resultado.indemnizacion)} €</span>
                </div>

                <p className="text-sm text-muted-foreground mt-4">{resultado.explicacion}</p>
              </>
            )}
          </Card>
        </div>
      )}
    </section>
  );
}
