export type TipoDespidoIndem = "improcedente" | "objetivo" | "disciplinario" | "fin_temporal" | "ere";

export interface DatosIndemnizacion {
  tipoDespido: TipoDespidoIndem;
  salarioBrutoAnual: number;
  fechaInicio: Date;
  fechaFin: Date;
  fechaContratoPreReforma?: boolean; // contrato anterior a feb 2012
}

export interface ResultadoIndemnizacion {
  indemnizacion: number;
  diasPorAnio: number;
  aniosAntiguedad: number;
  salarioDiario: number;
  diasTotales: number;
  topeMensualidades: number;
  topeAlcanzado: boolean;
  explicacion: string;
}

export function calcularIndemnizacion(datos: DatosIndemnizacion): ResultadoIndemnizacion {
  const { tipoDespido, salarioBrutoAnual, fechaInicio, fechaFin, fechaContratoPreReforma } = datos;

  const salarioDiario = salarioBrutoAnual / 365;
  const diffMs = fechaFin.getTime() - fechaInicio.getTime();
  const aniosAntiguedad = Math.max(0, diffMs / (1000 * 60 * 60 * 24 * 365.25));

  let diasPorAnio = 0;
  let topeMensualidades = Infinity;
  let explicacion = "";

  switch (tipoDespido) {
    case "improcedente":
      if (fechaContratoPreReforma && fechaInicio < new Date(2012, 1, 12)) {
        // Doble cálculo: 45 días hasta feb 2012, 33 días después
        const fechaReforma = new Date(2012, 1, 12);
        const aniosPreReforma = Math.max(0, (fechaReforma.getTime() - fechaInicio.getTime()) / (1000 * 60 * 60 * 24 * 365.25));
        const aniosPostReforma = Math.max(0, (fechaFin.getTime() - fechaReforma.getTime()) / (1000 * 60 * 60 * 24 * 365.25));

        const diasPre = 45 * aniosPreReforma;
        const diasPost = 33 * aniosPostReforma;
        const diasTotales = diasPre + diasPost;
        const indemnizacionSinTope = diasTotales * salarioDiario;
        const tope42 = 42 * (salarioBrutoAnual / 12);
        const tope24 = 24 * (salarioBrutoAnual / 12);
        const tope = Math.max(tope42, tope24); // Se aplica el más favorable
        const indemnizacion = Math.min(indemnizacionSinTope, tope);

        return {
          indemnizacion: Math.round(indemnizacion * 100) / 100,
          diasPorAnio: 33, // referencia
          aniosAntiguedad: Math.round(aniosAntiguedad * 100) / 100,
          salarioDiario: Math.round(salarioDiario * 100) / 100,
          diasTotales: Math.round(diasTotales * 100) / 100,
          topeMensualidades: 24,
          topeAlcanzado: indemnizacionSinTope > tope,
          explicacion: `Doble cálculo: ${aniosPreReforma.toFixed(1)} años a 45 días + ${aniosPostReforma.toFixed(1)} años a 33 días.`,
        };
      }
      diasPorAnio = 33;
      topeMensualidades = 24;
      explicacion = "33 días de salario por año trabajado, con un máximo de 24 mensualidades.";
      break;
    case "objetivo":
      diasPorAnio = 20;
      topeMensualidades = 12;
      explicacion = "20 días de salario por año trabajado, con un máximo de 12 mensualidades.";
      break;
    case "ere":
      diasPorAnio = 20;
      topeMensualidades = 12;
      explicacion = "Mínimo legal: 20 días por año (máximo 12 mensualidades). En la práctica, los ERE suelen negociar cantidades superiores.";
      break;
    case "disciplinario":
      diasPorAnio = 0;
      explicacion = "El despido disciplinario procedente no genera indemnización. Si se declara improcedente, se aplican 33 días/año.";
      break;
    case "fin_temporal":
      diasPorAnio = 12;
      topeMensualidades = Infinity;
      explicacion = "12 días de salario por año trabajado para contratos temporales finalizados.";
      break;
  }

  const diasTotales = diasPorAnio * aniosAntiguedad;
  const indemnizacionSinTope = diasTotales * salarioDiario;
  const topeEuros = topeMensualidades * (salarioBrutoAnual / 12);
  const indemnizacion = Math.min(indemnizacionSinTope, topeEuros);

  return {
    indemnizacion: Math.round(indemnizacion * 100) / 100,
    diasPorAnio,
    aniosAntiguedad: Math.round(aniosAntiguedad * 100) / 100,
    salarioDiario: Math.round(salarioDiario * 100) / 100,
    diasTotales: Math.round(diasTotales * 100) / 100,
    topeMensualidades: topeMensualidades === Infinity ? 0 : topeMensualidades,
    topeAlcanzado: indemnizacionSinTope > topeEuros && topeMensualidades !== Infinity,
    explicacion,
  };
}
