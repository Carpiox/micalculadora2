import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Link } from "react-router-dom";

export default function ContenidoSEO() {
  const { ref, visible } = useScrollReveal();
  const { ref: ref2, visible: visible2 } = useScrollReveal();

  return (
    <>
      <section id="guia" className="scroll-mt-20" ref={ref}>
        <div className={`transition-all duration-700 ${visible ? "animate-fade-up" : "opacity-0"}`}>
          <article className="max-w-none">
            <h2 className="text-2xl md:text-3xl font-bold font-display text-foreground mb-4">
              Cómo se calcula el finiquito en España — explicado para personas normales
            </h2>

            <p className="text-muted-foreground leading-relaxed mb-4">
              Vamos a ser honestos: la mayoría de artículos sobre finiquitos están escritos en "abogadés". Aquí te lo vamos a contar como te lo contaría un amigo que sabe de esto, sin tecnicismos innecesarios.
            </p>

            <p className="text-muted-foreground leading-relaxed mb-6">
              El <strong className="text-foreground">finiquito</strong> es, en pocas palabras, <strong className="text-foreground">todo lo que la empresa te debe cuando dejas de trabajar</strong>. Da igual si te han echado, si se te ha acabado el contrato o si te vas tú: siempre hay finiquito. Otra cosa es la <em>indemnización</em>, que solo te corresponde en ciertos despidos. Pero eso ya lo veremos.
            </p>

            <h3 className="text-xl font-bold font-display text-foreground mt-10 mb-3">
              ¿Qué lleva dentro un finiquito? Los 4 conceptos que debes conocer
            </h3>

            <p className="text-muted-foreground leading-relaxed mb-4">
              Imagina que te despiden el 15 de marzo. Llevabas 5 años en la empresa cobrando 1.800 € brutos al mes con 2 pagas extras en junio y diciembre. ¿Cuánto me corresponde de finiquito? Vamos concepto por concepto:
            </p>

            <div className="space-y-6 mb-8">
              <div className="pl-4 border-l-2 border-primary/30">
                <h4 className="font-bold text-foreground mb-1">1. Salario pendiente del último mes</h4>
                <p className="text-muted-foreground leading-relaxed">
                  Los días que has trabajado en marzo pero que aún no te han pagado. Si te echan el día 15, te deben 15 días de salario. En nuestro ejemplo: 1.800 € / 30 × 15 = <strong className="text-foreground">900 €</strong>. Parece obvio, pero es lo primero que debes comprobar.
                </p>
              </div>

              <div className="pl-4 border-l-2 border-primary/30">
                <h4 className="font-bold text-foreground mb-1">2. Vacaciones que no has disfrutado</h4>
                <p className="text-muted-foreground leading-relaxed">
                  Cada mes que trabajas "generas" vacaciones. Si a 1 de enero tenías derecho a 30 días de vacaciones al año, hasta el 15 de marzo habrás generado unos 6 días. Si no los has usado, la empresa te los paga en dinero. A un salario diario de unos 68,50 € (calculado con pagas incluidas), eso son unos <strong className="text-foreground">411 €</strong>.
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  ¿Sabías que muchas personas pierden este dinero porque no saben que les corresponde? Si te dicen "ya has disfrutado todas tus vacaciones" y no es verdad, reclama.
                </p>
              </div>

              <div className="pl-4 border-l-2 border-primary/30">
                <h4 className="font-bold text-foreground mb-1">3. Parte proporcional de las pagas extras</h4>
                <p className="text-muted-foreground leading-relaxed">
                  Si cobras las pagas en junio y diciembre (no prorrateadas), la empresa te debe la parte que has generado desde la última paga. En nuestro caso, como la última paga fue en diciembre, te corresponden 2,5 meses de paga de verano. Eso son unos <strong className="text-foreground">750 €</strong>.
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  Si tus pagas están prorrateadas (las cobras repartidas cada mes), este concepto ya está incluido en tu nómina mensual.
                </p>
              </div>

              <div className="pl-4 border-l-2 border-primary/30">
                <h4 className="font-bold text-foreground mb-1">4. Indemnización (solo en algunos despidos)</h4>
                <p className="text-muted-foreground leading-relaxed">
                  Este es el concepto "grande" y el que más confusión genera. <strong className="text-foreground">NO siempre te corresponde</strong>. Solo cobras indemnización si el despido es objetivo (20 días/año) o improcedente (33 días/año). Si te vas tú o el despido disciplinario es procedente, no hay indemnización.
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  En el ejemplo de 5 años con despido improcedente: 33 días × 5 años × 68,50 €/día = <strong className="text-foreground">unos 11.300 €</strong> de indemnización. ¿Ves por qué importa tanto saber qué tipo de despido es?
                </p>
              </div>
            </div>

            <h3 className="text-xl font-bold font-display text-foreground mt-10 mb-3">
              La fórmula, paso a paso
            </h3>

            <p className="text-muted-foreground leading-relaxed mb-4">
              Vamos a poner las fórmulas que usa nuestra calculadora, pero explicadas en cristiano:
            </p>

            <div className="bg-card border border-border rounded-lg p-5 mb-6 space-y-4">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Paso 1: Calcula tu salario diario</p>
                <p className="font-mono text-foreground font-medium text-sm">
                  Salario diario = (Salario mensual × 12 + Pagas extras × Salario mensual) / 365
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Ejemplo: (1.800 × 12 + 2 × 1.800) / 365 = <strong className="text-foreground">68,49 €/día</strong>
                </p>
              </div>

              <hr className="border-border" />

              <div>
                <p className="text-sm text-muted-foreground mb-1">Paso 2: Calcula la indemnización (si aplica)</p>
                <p className="font-mono text-foreground font-medium text-sm">
                  Indemnización = Salario diario × Días por año × Años trabajados
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Despido improcedente: 68,49 × 33 × 5 = <strong className="text-foreground">11.301 €</strong> (tope: 24 mensualidades)
                </p>
                <p className="text-xs text-muted-foreground">
                  Despido objetivo: 68,49 × 20 × 5 = <strong className="text-foreground">6.849 €</strong> (tope: 12 mensualidades)
                </p>
              </div>

              <hr className="border-border" />

              <div>
                <p className="text-sm text-muted-foreground mb-1">Paso 3: Suma todo</p>
                <p className="font-mono text-foreground font-medium text-sm">
                  Finiquito total = Indemnización + Salario pendiente + Vacaciones + Pagas extras proporcionales
                </p>
              </div>
            </div>

            <h3 className="text-xl font-bold font-display text-foreground mt-10 mb-3">
              ¿Cuánto me corresponde de finiquito con 3, 5 o 10 años de antigüedad?
            </h3>

            <p className="text-muted-foreground leading-relaxed mb-4">
              Esta es una de las preguntas que más nos llegan, así que aquí van tres escenarios rápidos para un trabajador que cobra 1.500 € brutos/mes con despido improcedente:
            </p>

            <div className="overflow-x-auto rounded-lg border border-border mb-6">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-muted/50">
                    <th className="text-left p-3 font-semibold text-foreground">Antigüedad</th>
                    <th className="text-right p-3 font-semibold text-foreground">Indemnización</th>
                    <th className="text-right p-3 font-semibold text-foreground">Finiquito aprox.</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-border">
                    <td className="p-3 text-foreground font-medium">3 años</td>
                    <td className="p-3 text-right tabular-nums text-muted-foreground">5.753 €</td>
                    <td className="p-3 text-right tabular-nums font-bold text-primary">~7.200 €</td>
                  </tr>
                  <tr className="border-t border-border bg-muted/20">
                    <td className="p-3 text-foreground font-medium">5 años</td>
                    <td className="p-3 text-right tabular-nums text-muted-foreground">9.589 €</td>
                    <td className="p-3 text-right tabular-nums font-bold text-primary">~11.000 €</td>
                  </tr>
                  <tr className="border-t border-border">
                    <td className="p-3 text-foreground font-medium">10 años</td>
                    <td className="p-3 text-right tabular-nums text-muted-foreground">19.178 €</td>
                    <td className="p-3 text-right tabular-nums font-bold text-primary">~20.600 €</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-xs text-muted-foreground mb-8">
              * Estimación para salario de 1.500 €/mes, 2 pagas extras, despido improcedente, sin vacaciones disfrutadas, cese a mitad de mes. <a href="#calculadora" className="text-primary hover:underline">Calcula con tus datos exactos aquí</a>.
            </p>

            <h3 className="text-xl font-bold font-display text-foreground mt-10 mb-3">
              Finiquito e IRPF: ¿tengo que pagar impuestos?
            </h3>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Depende del concepto. El salario pendiente, las vacaciones y las pagas extras <strong className="text-foreground">sí tributan</strong> en el IRPF, igual que tu nómina normal. Sin embargo, la <strong className="text-foreground">indemnización por despido está exenta de impuestos</strong> hasta el límite legal (la cantidad que marca el Estatuto de los Trabajadores). Solo pagarías IRPF por la indemnización si la empresa te paga más de lo que marca la ley (algo que a veces pasa en acuerdos negociados).
            </p>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Esto es importante porque si Hacienda te reclama algo, puede ser que la empresa no haya retenido correctamente. Guarda siempre tu carta de despido y el recibo del finiquito.
            </p>

            <h3 className="text-xl font-bold font-display text-foreground mt-10 mb-3">
              ¿Y si me han hecho un ERE o un ERTE?
            </h3>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Los ERE (Expedientes de Regulación de Empleo) suelen tener condiciones pactadas entre empresa y trabajadores. Normalmente la indemnización es superior a los 20 días del despido objetivo, pero depende de cada negociación. Nuestra <a href="#calculadora" className="text-primary hover:underline">calculadora de finiquito</a> te da el mínimo legal, pero en un ERE podrías cobrar más.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-8">
              En el caso de los ERTE, mientras estés en suspensión de empleo no hay finiquito porque la relación laboral no se extingue. Pero si después del ERTE te despiden, la antigüedad cuenta desde el inicio del contrato, no desde que terminó el ERTE.
            </p>

            <h3 className="text-xl font-bold font-display text-foreground mt-10 mb-3">
              Plazos que no puedes olvidar
            </h3>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Aquí es donde mucha gente pierde dinero por no actuar a tiempo:
            </p>
            <ul className="space-y-3 text-muted-foreground mb-8 list-none pl-0">
              {[
                ["20 días hábiles", "para impugnar un despido ante el Juzgado de lo Social. Este plazo es muy corto y no se puede ampliar. Si crees que tu despido no es justo, muévete rápido."],
                ["1 año", "para reclamar las cantidades del finiquito que consideres incorrectas. Puedes firmar con \"No conforme\" y reclamar después."],
                ["15 días de preaviso", "es lo que debes dar si te vas voluntariamente (salvo que tu convenio diga otra cosa). Si no avisas, la empresa puede descontarte esos días."],
              ].map(([plazo, desc]) => (
                <li key={plazo} className="flex gap-3 items-start">
                  <span className="font-bold text-primary tabular-nums shrink-0 w-28">{plazo}</span>
                  <span>{desc}</span>
                </li>
              ))}
            </ul>

          </article>
        </div>
      </section>

      <section ref={ref2} className="scroll-mt-20">
        <div className={`transition-all duration-700 ${visible2 ? "animate-fade-up" : "opacity-0"}`}>
          <h2 className="text-2xl md:text-3xl font-bold font-display text-foreground mb-4">
            Otras herramientas que te pueden interesar
          </h2>
          <p className="text-muted-foreground mb-6">
            También puedes calcular tu prestación por desempleo o tu retención fiscal con estas herramientas:
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              {
                nombre: "Calculadora de paro",
                desc: "¿Cuánto cobrarás de prestación por desempleo? Depende de tu base de cotización y antigüedad.",
                href: "/calculadora-paro/",
              },
              {
                nombre: "Calculadora de IRPF",
                desc: "Descubre cuánto te retiene Hacienda de tu nómina y si te saldrá a pagar o a devolver.",
                href: "/calculadora-irpf/",
              },
            ].map((c) => (
              <Link
                key={c.nombre}
                to={c.href}
                className="p-4 rounded-lg border border-border bg-card hover:shadow-md hover:shadow-primary/5 transition-shadow duration-300"
              >
                <h3 className="font-bold text-foreground text-sm mb-1">{c.nombre}</h3>
                <p className="text-xs text-muted-foreground">{c.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
