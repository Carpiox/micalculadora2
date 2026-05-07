import { useState } from "react";
import { Briefcase, ArrowRight, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { calcularParo, type ResultadoParo } from "@/lib/paro";

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

export default function CalculadoraParo() {
  const [baseCotizacion, setBaseCotizacion] = useState("");
  const [diasCotizados, setDiasCotizados] = useState("");
  const [hijos, setHijos] = useState("0");
  const [resultado, setResultado] = useState<ResultadoParo | null>(null);
  const [error, setError] = useState("");

  const handleCalcular = () => {
    setError("");
    const base = parseFloat(baseCotizacion);
    const dias = parseInt(diasCotizados);
    if (!base || base <= 0) {
      setError("Introduce tu base de cotización. La encuentras en tu nómina o en el certificado de empresa.");
      return;
    }
    if (!dias || dias < 360) {
      setError("Necesitas al menos 360 días cotizados en los últimos 6 años para tener derecho a paro.");
      return;
    }

    const res = calcularParo({
      baseCotizacionMensual: base,
      diasCotizados: dias,
      hijosACargo: parseInt(hijos) || 0,
    });
    setResultado(res);
    setTimeout(() => {
      document.getElementById("resultado-paro")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  };

  return (
    <section id="calculadora" className="scroll-mt-20">
      <Card className="p-6 md:p-8 shadow-lg shadow-primary/5 border-0 ring-1 ring-border">
        <div className="flex items-center gap-3 mb-2">
          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10">
            <Briefcase className="h-5 w-5 text-primary" />
          </div>
          <h2 className="text-xl md:text-2xl font-bold font-display text-foreground leading-tight">
            Calculadora de prestación por desempleo
          </h2>
        </div>
        <p className="text-sm text-muted-foreground mb-6 ml-[52px]">
          Introduce tus datos y te calculamos cuánto cobrarás de paro y durante cuántos meses.
        </p>

        <div className="grid gap-5 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="base-cotizacion">
              Base de cotización mensual (€)
              <InfoTip text="Es la cantidad sobre la que cotizas a la Seguridad Social. Aparece en tu nómina como 'Base de cotización por contingencias comunes'. Si no la encuentras, pon tu salario bruto como referencia." />
            </Label>
            <Input
              id="base-cotizacion"
              type="number"
              placeholder="Ej: 1.800"
              value={baseCotizacion}
              onChange={(e) => setBaseCotizacion(e.target.value)}
              min={0}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="dias-cotizados">
              Días cotizados (últimos 6 años)
              <InfoTip text="Los días que has cotizado a la Seguridad Social en los últimos 6 años. Puedes consultarlo en tu vida laboral (sede electrónica de la Seguridad Social). Un año de trabajo son aproximadamente 360 días." />
            </Label>
            <Input
              id="dias-cotizados"
              type="number"
              placeholder="Ej: 1.080 (3 años)"
              value={diasCotizados}
              onChange={(e) => setDiasCotizados(e.target.value)}
              min={0}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="hijos-cargo">
              Hijos a cargo
              <InfoTip text="Hijos menores de 26 años (o mayores con discapacidad) que convivan contigo y no tengan ingresos propios superiores al SMI." />
            </Label>
            <Input
              id="hijos-cargo"
              type="number"
              value={hijos}
              onChange={(e) => setHijos(e.target.value)}
              min={0}
              max={10}
            />
          </div>
        </div>

        {error && (
          <p className="mt-4 text-sm text-destructive font-medium" role="alert">{error}</p>
        )}

        <Button onClick={handleCalcular} size="lg" className="w-full mt-6 text-base font-semibold active:scale-[0.98] transition-transform">
          Calcular mi prestación <ArrowRight className="h-4 w-4 ml-1" />
        </Button>
        <p className="text-xs text-muted-foreground text-center mt-3">
          Gratis, sin registro y al instante. Tus datos no se guardan.
        </p>
      </Card>

      {resultado && (
        <div id="resultado-paro" className="mt-8 scroll-mt-20">
          <Card className="p-6 md:p-8 border-0 ring-1 ring-primary/20 shadow-lg shadow-primary/5 animate-fade-up">
            <h3 className="text-xl font-bold font-display mb-4">Tu prestación por desempleo</h3>

            {resultado.duracionMeses === 0 ? (
              <p className="text-muted-foreground">No llegas al mínimo de 360 días cotizados para tener derecho a la prestación contributiva. Podrías optar al subsidio por desempleo.</p>
            ) : (
              <>
                <div className="space-y-3">
                  <div className="flex justify-between pb-3 border-b border-border">
                    <span className="text-muted-foreground">Primeros {resultado.mesesAl70} meses (70%)</span>
                    <span className="font-bold tabular-nums">{fmt(resultado.cuantiaMensual70)} €/mes</span>
                  </div>
                  {resultado.mesesAl50 > 0 && (
                    <div className="flex justify-between pb-3 border-b border-border">
                      <span className="text-muted-foreground">Siguientes {resultado.mesesAl50} meses (50%)</span>
                      <span className="font-bold tabular-nums">{fmt(resultado.cuantiaMensual50)} €/mes</span>
                    </div>
                  )}
                  <div className="flex justify-between pb-3 border-b border-border">
                    <span className="text-muted-foreground">Duración total</span>
                    <span className="font-bold">{resultado.duracionMeses} meses</span>
                  </div>
                  <div className="flex justify-between pb-3 border-b border-border">
                    <span className="text-muted-foreground">Tope máximo mensual</span>
                    <span className="font-medium tabular-nums text-muted-foreground">{fmt(resultado.topeMaximo)} €</span>
                  </div>
                  <div className="flex justify-between pb-3 border-b border-border">
                    <span className="text-muted-foreground">Tope mínimo mensual</span>
                    <span className="font-medium tabular-nums text-muted-foreground">{fmt(resultado.topeMinimo)} €</span>
                  </div>
                </div>

                <div className="mt-6 p-4 rounded-lg bg-primary/5 flex items-center justify-between gap-4">
                  <span className="text-lg font-bold font-display">Total estimado</span>
                  <span className="text-2xl font-bold tabular-nums text-primary">{fmt(resultado.totalEstimado)} €</span>
                </div>
              </>
            )}
          </Card>
        </div>
      )}
    </section>
  );
}
