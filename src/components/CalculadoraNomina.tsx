import { useState } from "react";
import { Wallet, ArrowRight, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { calcularNomina, type ResultadoNomina } from "@/lib/nomina";

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

export default function CalculadoraNomina() {
  const [salario, setSalario] = useState("");
  const [pagas, setPagas] = useState("14");
  const [situacion, setSituacion] = useState<Situacion>("soltero");
  const [hijos, setHijos] = useState("0");
  const [resultado, setResultado] = useState<ResultadoNomina | null>(null);
  const [error, setError] = useState("");

  const handleCalcular = () => {
    setError("");
    const sal = parseFloat(salario);
    if (!sal || sal <= 0) {
      setError("Introduce tu salario bruto anual. Si solo sabes el mensual, multiplica por 12 o 14.");
      return;
    }

    const res = calcularNomina({
      salarioBrutoAnual: sal,
      pagasExtras: parseInt(pagas),
      situacionFamiliar: situacion,
      hijosmenores25: parseInt(hijos) || 0,
    });
    setResultado(res);
    setTimeout(() => {
      document.getElementById("resultado-nomina")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  };

  return (
    <section id="calculadora" className="scroll-mt-20">
      <Card className="p-6 md:p-8 shadow-lg shadow-primary/5 border-0 ring-1 ring-border">
        <div className="flex items-center gap-3 mb-2">
          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10">
            <Wallet className="h-5 w-5 text-primary" />
          </div>
          <h2 className="text-xl md:text-2xl font-bold font-display text-foreground leading-tight">
            Calculadora de nómina neta
          </h2>
        </div>
        <p className="text-sm text-muted-foreground mb-6 ml-[52px]">
          Pasa de bruto a neto en un clic. Entiende cada deducción de tu nómina.
        </p>

        <div className="grid gap-5 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="salario-bruto">
              Salario bruto anual (€)
              <InfoTip text="El total de tus ingresos brutos al año incluyendo pagas extras." />
            </Label>
            <Input id="salario-bruto" type="number" placeholder="Ej: 25.000" value={salario} onChange={(e) => setSalario(e.target.value)} min={0} />
          </div>

          <div className="space-y-2">
            <Label>
              Número de pagas
              <InfoTip text="12 si tus pagas están prorrateadas o 14 si cobras paga extra en junio y diciembre." />
            </Label>
            <Select value={pagas} onValueChange={setPagas}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="12">12 pagas (prorrateadas)</SelectItem>
                <SelectItem value="14">14 pagas</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Situación familiar</Label>
            <Select value={situacion} onValueChange={(v) => setSituacion(v as Situacion)}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="soltero">Soltero/a</SelectItem>
                <SelectItem value="casado_conyuge_ingresos">Casado/a (cónyuge con ingresos)</SelectItem>
                <SelectItem value="casado_conyuge_sin_ingresos">Casado/a (cónyuge sin ingresos)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="hijos-nomina">Hijos menores de 25 años</Label>
            <Input id="hijos-nomina" type="number" value={hijos} onChange={(e) => setHijos(e.target.value)} min={0} max={10} />
          </div>
        </div>

        {error && <p className="mt-4 text-sm text-destructive font-medium" role="alert">{error}</p>}

        <Button onClick={handleCalcular} size="lg" className="w-full mt-6 text-base font-semibold active:scale-[0.98] transition-transform">
          Calcular mi nómina neta <ArrowRight className="h-4 w-4 ml-1" />
        </Button>
        <p className="text-xs text-muted-foreground text-center mt-3">Gratis, sin registro y al instante.</p>
      </Card>

      {resultado && (
        <div id="resultado-nomina" className="mt-8 scroll-mt-20">
          <Card className="p-6 md:p-8 border-0 ring-1 ring-primary/20 shadow-lg shadow-primary/5 animate-fade-up">
            <h3 className="text-xl font-bold font-display mb-4">Tu nómina desglosada</h3>
            <div className="space-y-3">
              <div className="flex justify-between pb-3 border-b border-border">
                <span className="text-muted-foreground">Salario bruto mensual</span>
                <span className="font-bold tabular-nums">{fmt(resultado.salarioBrutoMensual)} €</span>
              </div>
              <div className="flex justify-between pb-3 border-b border-border">
                <span className="text-muted-foreground">Contingencias comunes (4,7%)</span>
                <span className="font-medium tabular-nums text-destructive">-{fmt(resultado.cotizacionSS)} €</span>
              </div>
              <div className="flex justify-between pb-3 border-b border-border">
                <span className="text-muted-foreground">Desempleo (1,55%)</span>
                <span className="font-medium tabular-nums text-destructive">-{fmt(resultado.cotizacionDesempleo)} €</span>
              </div>
              <div className="flex justify-between pb-3 border-b border-border">
                <span className="text-muted-foreground">Formación + MEI (0,8%)</span>
                <span className="font-medium tabular-nums text-destructive">-{fmt(resultado.cotizacionFormacion)} €</span>
              </div>
              <div className="flex justify-between pb-3 border-b border-border">
                <span className="text-muted-foreground">IRPF ({resultado.tipoRetencion}%)</span>
                <span className="font-medium tabular-nums text-destructive">-{fmt(resultado.retencionIRPF)} €</span>
              </div>
            </div>

            <div className="mt-6 p-4 rounded-lg bg-primary/5">
              <div className="flex items-center justify-between gap-4">
                <span className="text-lg font-bold font-display">Neto mensual</span>
                <span className="text-2xl font-bold tabular-nums text-primary">{fmt(resultado.salarioNetoMensual)} €</span>
              </div>
              <div className="flex items-center justify-between gap-4 mt-2 text-sm text-muted-foreground">
                <span>Neto anual</span>
                <span className="font-medium tabular-nums">{fmt(resultado.salarioNetoAnual)} €</span>
              </div>
            </div>
          </Card>
        </div>
      )}
    </section>
  );
}
