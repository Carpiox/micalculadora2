import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const faqs = [
  {
    pregunta: "¿Qué es exactamente el finiquito?",
    respuesta:
      "Es el dinero que la empresa te debe cuando dejas de trabajar, por el motivo que sea. Incluye los días de salario pendientes, las vacaciones que no hayas disfrutado y la parte de las pagas extras que ya hayas generado. Piensa en ello como una \"liquidación\": todo lo que la empresa te debe por el trabajo que ya has hecho.",
  },
  {
    pregunta: "¿Finiquito e indemnización son lo mismo?",
    respuesta:
      "No, y confundirlos es uno de los errores más comunes. El finiquito es lo que te deben SIEMPRE (salario, vacaciones, pagas). La indemnización es una cantidad EXTRA que solo te pagan si el despido es objetivo o improcedente. Puedes cobrar finiquito sin indemnización (si te vas tú), pero no indemnización sin finiquito.",
  },
  {
    pregunta: "Me voy voluntariamente, ¿tengo derecho a algo?",
    respuesta:
      "Sí. No tendrás indemnización ni derecho a paro, pero la empresa te tiene que pagar el finiquito: los días trabajados que no te han pagado, las vacaciones que no has cogido y la parte proporcional de las pagas extras. Es tu dinero, lo has ganado trabajando.",
  },
  {
    pregunta: "¿Cuánto me corresponde de finiquito con 10 años de antigüedad?",
    respuesta:
      "Depende de tu salario y del tipo de despido. Por ejemplo, con un salario de 1.500 € brutos y despido improcedente, la indemnización sola serían unos 19.000 €, más el salario pendiente, vacaciones y pagas. En total, podrían ser más de 20.000 €. Usa nuestra calculadora con tus datos concretos para obtener una cifra ajustada.",
  },
  {
    pregunta: "¿Puedo negarme a firmar el finiquito?",
    respuesta:
      "Puedes, pero no es necesario. Lo mejor es firmarlo escribiendo \"No conforme\" al lado de tu firma. Así, cobras lo que te dan y mantienes el derecho a reclamar la diferencia si crees que falta dinero. Tienes 1 año para hacerlo.",
  },
  {
    pregunta: "Mi empresa dice que mi despido es disciplinario, ¿qué hago?",
    respuesta:
      "Muchas empresas usan el despido disciplinario para no pagar indemnización, aunque la causa real no lo justifique. Si impugnas ante el juzgado y el juez lo declara improcedente, te corresponden 33 días por año. Tienes 20 días hábiles para presentar la demanda, así que no esperes.",
  },
  {
    pregunta: "¿La indemnización por despido paga IRPF?",
    respuesta:
      "La indemnización legal por despido está exenta de IRPF. Es decir, si te pagan los 33 días por año que marca la ley, no tributas nada por ello. Solo pagarías impuestos si la empresa te paga una cantidad superior al mínimo legal (algo que puede pasar en acuerdos). El resto del finiquito (salario, vacaciones, pagas) sí tributa como tu nómina normal.",
  },
  {
    pregunta: "¿Cuánto tarda la empresa en pagarme el finiquito?",
    respuesta:
      "La ley dice que debe estar listo el día que termina el contrato. En la práctica, algunas empresas tardan unos días. Si pasan semanas sin pagarte, puedes reclamar y además exigir intereses de demora. No te quedes esperando eternamente.",
  },
  {
    pregunta: "¿Qué pasa con el finiquito si la empresa cierra o quiebra?",
    respuesta:
      "Si la empresa es insolvente, el FOGASA (Fondo de Garantía Salarial) cubre parte de lo que te deben: hasta 120 días de salario pendiente y hasta un año de indemnización (con un límite diario del doble del SMI). No es lo ideal, pero es una red de seguridad.",
  },
  {
    pregunta: "He firmado el finiquito sin poner 'No conforme', ¿ya no puedo reclamar?",
    respuesta:
      "Sí puedes. Firmar el finiquito sin \"No conforme\" complica un poco las cosas, pero no cierra la puerta. Si hay errores en el cálculo o cantidades que faltan, puedes reclamar ante el Juzgado de lo Social dentro del plazo de 1 año. Lo que sí dificulta es demostrar que no estabas de acuerdo, así que por eso siempre recomendamos firmar con esa coletilla.",
  },
];

export default function FAQ() {
  const { ref, visible } = useScrollReveal();

  return (
    <section id="faq" className="scroll-mt-20" ref={ref}>
      <div className={`transition-all duration-700 ${visible ? "animate-fade-up" : "opacity-0"}`}>
        <h2 className="text-2xl md:text-3xl font-bold font-display text-foreground mb-2">
          Todo lo que siempre quisiste saber sobre el finiquito
        </h2>
        <p className="text-muted-foreground mb-8 max-w-2xl">
          Hemos recopilado las dudas más habituales que nos llegan. Si la tuya no está aquí, déjanos un comentario y la añadimos.
        </p>

        <Accordion type="single" collapsible className="space-y-2">
          {faqs.map((faq, i) => (
            <AccordionItem
              key={i}
              value={`faq-${i}`}
              className="border border-border rounded-lg px-4 data-[state=open]:bg-card data-[state=open]:shadow-sm transition-all"
            >
              <AccordionTrigger className="text-left font-medium text-foreground hover:no-underline py-4">
                {faq.pregunta}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground pb-4 leading-relaxed">
                {faq.respuesta}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
