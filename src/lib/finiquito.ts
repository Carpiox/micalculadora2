export type TipoContrato = "indefinido" | "temporal";
export type TipoDespido = "disciplinario" | "objetivo" | "improcedente" | "voluntario";

export interface DatosFiniquito {
  tipoContrato: TipoContrato;
  tipoDespido: TipoDespido;
  salarioBrutoMensual: number;
  fechaInicio: Date;
  fechaFin: Date;
  pagasExtras: number; // 2 normalmente
  pagasProrrateadas: boolean;
  diasVacacionesPorAnio: number; // normalmente 30
  diasVacacionesDisfrutados: number;
}

export interface ResultadoFiniquito {
  indemnizacion: number;
  salarioPendiente: number;
  vacacionesNoDisfrutadas: number;
  parteProporcionaPagasExtras: number;
  totalFiniquito: number;
  diasIndemnizacion: number;
  aniosAntiguedad: number;
  diasTrabajadosMesActual: number;
  diasVacacionesPendientes: number;
  salarioDiario: number;
}

function calcularDiasEntre(inicio: Date, fin: Date): number {
  const diff = fin.getTime() - inicio.getTime();
  return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
}

function calcularAniosAntiguedad(inicio: Date, fin: Date): number {
  const dias = calcularDiasEntre(inicio, fin);
  return dias / 365.25;
}

export function calcularFiniquito(datos: DatosFiniquito): ResultadoFiniquito {
  const {
    tipoDespido,
    salarioBrutoMensual,
    fechaInicio,
    fechaFin,
    pagasExtras,
    pagasProrrateadas,
    diasVacacionesPorAnio,
    diasVacacionesDisfrutados,
  } = datos;

  const salarioAnual = salarioBrutoMensual * (12 + (pagasProrrateadas ? 0 : pagasExtras));
  const salarioDiario = salarioAnual / 365;

  // Antigüedad
  const aniosAntiguedad = calcularAniosAntiguedad(fechaInicio, fechaFin);

  // Indemnización según tipo de despido
  let diasPorAnio = 0;
  let topeMeses = Infinity;

  switch (tipoDespido) {
    case "disciplinario":
      // Despido disciplinario procedente: 0 indemnización
      diasPorAnio = 0;
      break;
    case "objetivo":
      // 20 días por año, max 12 mensualidades
      diasPorAnio = 20;
      topeMeses = 12;
      break;
    case "improcedente":
      // 33 días por año, max 24 mensualidades (post reforma 2012)
      diasPorAnio = 33;
      topeMeses = 24;
      break;
    case "voluntario":
      diasPorAnio = 0;
      break;
  }

  const diasIndemnizacion = diasPorAnio * aniosAntiguedad;
  const topeIndemnizacion = topeMeses * salarioBrutoMensual;
  const indemnizacion = Math.min(diasIndemnizacion * salarioDiario, topeIndemnizacion);

  // Salario pendiente del mes actual
  const diasTrabajadosMesActual = fechaFin.getDate();
  const salarioPendiente = (salarioBrutoMensual / 30) * diasTrabajadosMesActual;

  // Vacaciones no disfrutadas
  const mesDelAnio = fechaFin.getMonth(); // 0-11
  const diasTranscurridosAnio = calcularDiasEntre(
    new Date(fechaFin.getFullYear(), 0, 1),
    fechaFin
  );
  const proporcionAnio = diasTranscurridosAnio / 365;
  const vacacionesGeneradas = Math.round(diasVacacionesPorAnio * proporcionAnio);
  const diasVacacionesPendientes = Math.max(0, vacacionesGeneradas - diasVacacionesDisfrutados);
  const vacacionesNoDisfrutadas = diasVacacionesPendientes * salarioDiario;

  // Parte proporcional de pagas extras
  let parteProporcionaPagasExtras = 0;
  if (!pagasProrrateadas) {
    // Paga de verano (enero-junio) y Navidad (julio-diciembre) proporcional
    const mesesDesdeUltimaPaga = mesDelAnio >= 6 ? mesDelAnio - 6 : mesDelAnio;
    parteProporcionaPagasExtras = (salarioBrutoMensual / 6) * mesesDesdeUltimaPaga * pagasExtras / 2;
  }

  const totalFiniquito = indemnizacion + salarioPendiente + vacacionesNoDisfrutadas + parteProporcionaPagasExtras;

  return {
    indemnizacion: Math.round(indemnizacion * 100) / 100,
    salarioPendiente: Math.round(salarioPendiente * 100) / 100,
    vacacionesNoDisfrutadas: Math.round(vacacionesNoDisfrutadas * 100) / 100,
    parteProporcionaPagasExtras: Math.round(parteProporcionaPagasExtras * 100) / 100,
    totalFiniquito: Math.round(totalFiniquito * 100) / 100,
    diasIndemnizacion: Math.round(diasIndemnizacion * 100) / 100,
    aniosAntiguedad: Math.round(aniosAntiguedad * 100) / 100,
    diasTrabajadosMesActual,
    diasVacacionesPendientes,
    salarioDiario: Math.round(salarioDiario * 100) / 100,
  };
}
