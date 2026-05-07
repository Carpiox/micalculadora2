import { useState } from "react";
import { Receipt, ArrowRight, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { calcularIRPF, type ResultadoIRPF } from "@/lib/irpf";

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

type Situacion = "soltero" | "casado_conyuge_ingresos" | "casado_conyuge_sin_ingresos";

export default function CalculadoraIRPF() {
  const [salario, setSalario] = useState("");
  const [situacion, setSituacion] = useState<Situacion>("soltero");
  const [hijos, setHijos] = useState("0");
  const [resultado, setResultado] = useState<ResultadoIRPF | null>(null);
  const [error, setError] = useState("");

  const handleCalcular = () => {
    setError("");
    const sal = parseFloat(salario);
    if (!sal || sal <= 0) {
      setError("Introduce tu salario bruto anual.");
      return;
    }

    const res = calcularIRPF({
      salarioBrutoAnual: sal,
      situacionFamiliar: situacion,
      hijosmenores25: parseInt(hijos) || 0,
      comunidadAutonoma: "general",
    });
    setResultado(res);
    setTimeout(() => {
      document.getElementById("resultado-irpf")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  };

  return (
    <section id="calculadora" className="scroll-mt-20">
      <Card className="p-6 md:p-8 shadow-lg shadow-primary/5 border-0 ring-1 ring-border">
        <div className="flex items-center gap-3 mb-2">
          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10">
            <Receipt className="h-5 w-5 text-primary" />
          </div>
          <h2 className="text-xl md:text-2xl font-bold font-display text-foreground leading-tight">
            Calculadora de IRPF 2026
          </h2>
        </div>
        <p className="text-sm text-muted-foreground mb-6 ml-[52px]">
          Descubre cuánto pagas de IRPF, tu tipo efectivo y cuánto te retienen cada mes.
        </p>

        <div className="grid gap-5 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="salario-anual">
              Salario bruto anual (€)
              <InfoTip text="El total de tus ingresos brutos anuales por trabajo. Lo encuentras sumando 12 o 14 nóminas brutas." />
            </Label>
            <Input id="salario-anual" type="number" placeholder="Ej: 28.000" value={salario} onChange={(e) => setSalario(e.target.value)} min={0} />
          </div>

          <div className="space-y-2">
            <Label>
              Situación familiar
              <InfoTip text="Afecta al mínimo personal y familiar que reduce tu base imponible." />
            </Label>
            <Select value={situacion} onValueChange={(v) => setSituacion(v as Situacion)}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="soltero">Soltero/a o con pareja con ingresos</SelectItem>
                <SelectItem value="casado_conyuge_ingresos">Casado/a (cónyuge con ingresos)</SelectItem>
                <SelectItem value="casado_conyuge_sin_ingresos">Casado/a (cónyuge sin ingresos)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="hijos-irpf">
              Hijos menores de 25 años
              <InfoTip text="Hijos que convivan contigo y no tengan rentas superiores a 8.000 € anuales." />
            </Label>
            <Input id="hijos-irpf" type="number" value={hijos} onChange={(e) => setHijos(e.target.value)} min={0} max={10} />
          </div>
        </div>

        {error && <p className="mt-4 text-sm text-destructive font-medium" role="alert">{error}</p>}

        <Button onClick={handleCalcular} size="lg" className="w-full mt-6 text-base font-semibold active:scale-[0.98] transition-transform">
          Calcular mi IRPF <ArrowRight className="h-4 w-4 ml-1" />
        </Button>
        <p className="text-xs text-muted-foreground text-center mt-3">Gratis, sin registro y al instante.</p>
      </Card>

      {resultado && (
        <div id="resultado-irpf" className="mt-8 scroll-mt-20">
          <Card className="p-6 md:p-8 border-0 ring-1 ring-primary/20 shadow-lg shadow-primary/5 animate-fade-up">
            <h3 className="text-xl font-bold font-display mb-4">Tu IRPF en detalle</h3>
            <div className="space-y-3">
              <div className="flex justify-between pb-3 border-b border-border">
                <span className="text-muted-foreground">Base imponible</span>
                <span className="font-bold tabular-nums">{fmt(resultado.baseImponible)} €</span>
              </div>
              <div className="flex justify-between pb-3 border-b border-border">
                <span className="text-muted-foreground">Deducciones personales y familiares</span>
                <span className="font-medium tabular-nums text-muted-foreground">{fmt(resultado.deduccionesPersonales)} €</span>
              </div>
              <div className="flex justify-between pb-3 border-b border-border">
                <span className="text-muted-foreground">Retención anual (IRPF)</span>
                <span className="font-bold tabular-nums">{fmt(resultado.retencionAnual)} €</span>
              </div>
              <div className="flex justify-between pb-3 border-b border-border">
                <span className="text-muted-foreground">Retención mensual</span>
                <span className="font-bold tabular-nums">{fmt(resultado.retencionMensual)} €/mes</span>
              </div>
              <div className="flex justify-between pb-3 border-b border-border">
                <span className="text-muted-foreground">Tipo marginal</span>
                <span className="font-medium">{resultado.tipoMarginal}%</span>
              </div>
            </div>

            <div className="mt-6 p-4 rounded-lg bg-primary/5 flex items-center justify-between gap-4">
              <span className="text-lg font-bold font-display">Tipo efectivo</span>
              <span className="text-2xl font-bold tabular-nums text-primary">{resultado.tipoEfectivo}%</span>
            </div>

            {resultado.tramoDetalle.length > 0 && (
              <div className="mt-6">
                <h4 className="font-bold text-foreground mb-3">Desglose por tramos</h4>
                <div className="overflow-x-auto rounded-lg border border-border">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-muted/50">
                        <th className="text-left p-2 font-semibold">Tramo</th>
                        <th className="text-center p-2 font-semibold">Tipo</th>
                        <th className="text-right p-2 font-semibold">Cuota</th>
                      </tr>
                    </thead>
                    <tbody>
                      {resultado.tramoDetalle.map((t, i) => (
                        <tr key={i} className="border-t border-border">
                          <td className="p-2 text-muted-foreground">{fmt(t.desde)} - {fmt(t.hasta)} €</td>
                          <td className="p-2 text-center font-medium">{t.tipo}%</td>
                          <td className="p-2 text-right tabular-nums font-medium">{fmt(t.cuota)} €</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </Card>
        </div>
      )}
    </section>
  );
}
