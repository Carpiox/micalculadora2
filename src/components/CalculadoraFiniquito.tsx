import { useState } from "react";
import { Calculator, Info, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  calcularFiniquito,
  type DatosFiniquito,
  type ResultadoFiniquito,
  type TipoContrato,
  type TipoDespido,
} from "@/lib/finiquito";
import ResultadoCard from "./ResultadoCard";

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

export default function CalculadoraFiniquito() {
  const [tipoContrato, setTipoContrato] = useState<TipoContrato>("indefinido");
  const [tipoDespido, setTipoDespido] = useState<TipoDespido>("improcedente");
  const [salario, setSalario] = useState("");
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [pagasExtras, setPagasExtras] = useState("2");
  const [pagasProrrateadas, setPagasProrrateadas] = useState(false);
  const [diasVacaciones, setDiasVacaciones] = useState("30");
  const [diasDisfrutados, setDiasDisfrutados] = useState("0");
  const [resultado, setResultado] = useState<ResultadoFiniquito | null>(null);
  const [error, setError] = useState("");

  const handleCalcular = () => {
    setError("");
    const sal = parseFloat(salario);
    if (!sal || sal <= 0) {
      setError("Pon tu salario bruto mensual — lo encuentras en tu nómina, arriba a la derecha.");
      return;
    }
    if (!fechaInicio) {
      setError("Necesitamos la fecha en la que empezaste a trabajar. Si no la recuerdas exacta, pon una aproximada.");
      return;
    }
    const inicio = new Date(fechaInicio);
    const fin = new Date(fechaFin);
    if (fin <= inicio) {
      setError("La fecha de salida tiene que ser posterior a la de entrada. Revísalo.");
      return;
    }

    const datos: DatosFiniquito = {
      tipoContrato,
      tipoDespido,
      salarioBrutoMensual: sal,
      fechaInicio: inicio,
      fechaFin: fin,
      pagasExtras: parseInt(pagasExtras) || 2,
      pagasProrrateadas,
      diasVacacionesPorAnio: parseInt(diasVacaciones) || 30,
      diasVacacionesDisfrutados: parseInt(diasDisfrutados) || 0,
    };

    const res = calcularFiniquito(datos);
    setResultado(res);

    setTimeout(() => {
      document.getElementById("resultado-finiquito")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 100);
  };

  return (
    <section id="calculadora" className="scroll-mt-20">
      <Card className="p-6 md:p-8 shadow-lg shadow-primary/5 border-0 ring-1 ring-border">
        <div className="flex items-center gap-3 mb-2">
          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10">
            <Calculator className="h-5 w-5 text-primary" />
          </div>
          <h2 className="text-xl md:text-2xl font-bold font-display text-foreground leading-tight">
            Tu calculadora de finiquito
          </h2>
        </div>
        <p className="text-sm text-muted-foreground mb-6 ml-[52px]">
          Rellena los datos de tu contrato y te decimos cuánto te corresponde. Tarda menos de un minuto.
        </p>

        <div className="grid gap-5 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="tipo-contrato">
              ¿Qué tipo de contrato tienes?
              <InfoTip text="Mira tu contrato: pone 'indefinido' o 'temporal/obra y servicio'. Si no lo sabes, probablemente sea indefinido." />
            </Label>
            <Select
              value={tipoContrato}
              onValueChange={(v) => setTipoContrato(v as TipoContrato)}
            >
              <SelectTrigger id="tipo-contrato">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="indefinido">Indefinido</SelectItem>
                <SelectItem value="temporal">Temporal</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="tipo-despido">
              ¿Cómo ha terminado tu relación laboral?
              <InfoTip text="Si te han echado y no sabes de qué tipo, lo más habitual es que sea un despido improcedente. Si tú te vas por tu cuenta, es baja voluntaria." />
            </Label>
            <Select
              value={tipoDespido}
              onValueChange={(v) => setTipoDespido(v as TipoDespido)}
            >
              <SelectTrigger id="tipo-despido">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="improcedente">Me han despedido (improcedente)</SelectItem>
                <SelectItem value="objetivo">Despido objetivo (causas económicas)</SelectItem>
                <SelectItem value="disciplinario">Despido disciplinario</SelectItem>
                <SelectItem value="voluntario">Me voy yo (baja voluntaria)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="salario">
              Salario bruto mensual (€)
              <InfoTip text="Es la cifra que aparece en tu nómina ANTES de descuentos. No el neto que te llega al banco." />
            </Label>
            <Input
              id="salario"
              type="number"
              placeholder="Ej: 1.800"
              value={salario}
              onChange={(e) => setSalario(e.target.value)}
              min={0}
              step={50}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="pagas">
              Pagas extras al año
              <InfoTip text="La mayoría de trabajadores tienen 2 (verano y Navidad). Algunos convenios tienen 3." />
            </Label>
            <Input
              id="pagas"
              type="number"
              value={pagasExtras}
              onChange={(e) => setPagasExtras(e.target.value)}
              min={0}
              max={4}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="fecha-inicio">¿Cuándo empezaste a trabajar?</Label>
            <Input
              id="fecha-inicio"
              type="date"
              value={fechaInicio}
              onChange={(e) => setFechaInicio(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="fecha-fin">¿Cuándo termina (o terminó) el contrato?</Label>
            <Input
              id="fecha-fin"
              type="date"
              value={fechaFin}
              onChange={(e) => setFechaFin(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="vacaciones">Días de vacaciones al año</Label>
            <Input
              id="vacaciones"
              type="number"
              value={diasVacaciones}
              onChange={(e) => setDiasVacaciones(e.target.value)}
              min={0}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="disfrutados">¿Cuántos días de vacaciones has gastado este año?</Label>
            <Input
              id="disfrutados"
              type="number"
              value={diasDisfrutados}
              onChange={(e) => setDiasDisfrutados(e.target.value)}
              min={0}
            />
          </div>

          <div className="flex items-center gap-3 md:col-span-2 pt-1">
            <Switch
              id="prorrateadas"
              checked={pagasProrrateadas}
              onCheckedChange={setPagasProrrateadas}
            />
            <Label htmlFor="prorrateadas" className="cursor-pointer">
              Cobro las pagas extras repartidas cada mes
              <InfoTip text="Algunas empresas reparten las pagas extras en 12 mensualidades en vez de pagártelas en junio y diciembre. Mira si tu nómina incluye 'prorrata de pagas'." />
            </Label>
          </div>
        </div>

        {error && (
          <p className="mt-4 text-sm text-destructive font-medium" role="alert">
            {error}
          </p>
        )}

        <Button
          onClick={handleCalcular}
          size="lg"
          className="w-full mt-6 text-base font-semibold active:scale-[0.98] transition-transform"
        >
          Calcular mi finiquito <ArrowRight className="h-4 w-4 ml-1" />
        </Button>

        <p className="text-xs text-muted-foreground text-center mt-3">
          Gratis, sin registro y al instante. Tus datos no se guardan.
        </p>
      </Card>

      {resultado && (
        <div id="resultado-finiquito" className="mt-8 scroll-mt-20">
          <ResultadoCard resultado={resultado} tipoDespido={tipoDespido} />
        </div>
      )}
    </section>
  );
}
