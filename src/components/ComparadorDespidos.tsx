import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Scale, FileText, Gavel, HandCoins, ArrowUpRight } from "lucide-react";

export default function ComparadorDespidos() {
  const { ref, visible } = useScrollReveal();

  return (
    <section id="comparador" className="scroll-mt-20" ref={ref}>
      <div className={`transition-all duration-700 ${visible ? "animate-fade-up" : "opacity-0"}`}>
        <h2 className="text-2xl md:text-3xl font-bold font-display text-foreground mb-2">
          ¿Te han despedido? No todos los despidos son iguales
        </h2>
        <p className="text-muted-foreground mb-3 max-w-2xl">
          Mucha gente no sabe que el tipo de despido cambia completamente lo que te corresponde cobrar. Un despido improcedente puede suponer miles de euros más que uno disciplinario. Aquí te lo explicamos con claridad.
        </p>
        <p className="text-sm text-muted-foreground mb-8 max-w-2xl">
          <strong className="text-foreground">Consejo:</strong> si en tu carta de despido no queda claro el motivo, o sospechas que el despido no es procedente, consulta con un abogado laboralista. Muchas veces un despido "disciplinario" acaba siendo declarado improcedente en los juzgados.
        </p>

        {/* Tabla comparativa */}
        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-muted/50">
                <th className="text-left p-3 font-semibold text-foreground">Tipo de despido</th>
                <th className="text-center p-3 font-semibold text-foreground">Días/año</th>
                <th className="text-center p-3 font-semibold text-foreground">Tope máximo</th>
                <th className="text-left p-3 font-semibold text-foreground hidden sm:table-cell">¿Cuándo se aplica?</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-border">
                <td className="p-3 font-medium text-foreground">
                  <div className="flex items-center gap-2">
                    <Scale className="h-4 w-4 text-primary shrink-0" />
                    Improcedente
                  </div>
                </td>
                <td className="p-3 text-center font-bold text-primary">33 días</td>
                <td className="p-3 text-center text-muted-foreground">24 meses</td>
                <td className="p-3 text-muted-foreground hidden sm:table-cell">Cuando el juez determina que el despido no tiene justificación suficiente</td>
              </tr>
              <tr className="border-t border-border bg-muted/20">
                <td className="p-3 font-medium text-foreground">
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-accent shrink-0" />
                    Objetivo
                  </div>
                </td>
                <td className="p-3 text-center font-bold text-accent">20 días</td>
                <td className="p-3 text-center text-muted-foreground">12 meses</td>
                <td className="p-3 text-muted-foreground hidden sm:table-cell">Causas económicas, técnicas u organizativas. Te lo tienen que comunicar por escrito</td>
              </tr>
              <tr className="border-t border-border">
                <td className="p-3 font-medium text-foreground">
                  <div className="flex items-center gap-2">
                    <Gavel className="h-4 w-4 text-destructive shrink-0" />
                    Disciplinario
                  </div>
                </td>
                <td className="p-3 text-center font-bold text-destructive">0 días</td>
                <td className="p-3 text-center text-muted-foreground">—</td>
                <td className="p-3 text-muted-foreground hidden sm:table-cell">Faltas graves del trabajador. Si es procedente, no hay indemnización</td>
              </tr>
              <tr className="border-t border-border bg-muted/20">
                <td className="p-3 font-medium text-foreground">
                  <div className="flex items-center gap-2">
                    <HandCoins className="h-4 w-4 text-muted-foreground shrink-0" />
                    Baja voluntaria
                  </div>
                </td>
                <td className="p-3 text-center font-bold text-muted-foreground">0 días</td>
                <td className="p-3 text-center text-muted-foreground">—</td>
                <td className="p-3 text-muted-foreground hidden sm:table-cell">Tú decides irte. Cobras finiquito pero no indemnización ni paro</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="mt-6 p-4 rounded-lg bg-primary/5 text-sm">
          <p className="text-muted-foreground">
            <strong className="text-foreground">Dato importante:</strong> estos 33 días por año aplican a contratos firmados después de febrero de 2012. Si llevas más tiempo, la antigüedad anterior a esa fecha se calcula a 45 días/año (con tope de 42 mensualidades). Es lo que se llama el "doble cálculo" — y marca una diferencia enorme si llevas muchos años. <a href="#faq" className="text-primary hover:underline">Más detalles en las FAQ</a>.
          </p>
        </div>
      </div>
    </section>
  );
}
