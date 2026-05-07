export interface DatosNomina {
  salarioBrutoAnual: number;
  pagasExtras: number; // 12 (prorrateadas) o 14
  situacionFamiliar: "soltero" | "casado_conyuge_ingresos" | "casado_conyuge_sin_ingresos";
  hijosmenores25: number;
}

export interface ResultadoNomina {
  salarioBrutoMensual: number;
  cotizacionSS: number;
  cotizacionDesempleo: number;
  cotizacionFormacion: number;
  totalCotizaciones: number;
  retencionIRPF: number;
  tipoRetencion: number;
  salarioNetoMensual: number;
  salarioNetoAnual: number;
  salarioBrutoAnual: number;
}

export function calcularNomina(datos: DatosNomina): ResultadoNomina {
  const { salarioBrutoAnual, pagasExtras, situacionFamiliar, hijosmenores25 } = datos;

  const salarioBrutoMensual = salarioBrutoAnual / pagasExtras;

  // Cotizaciones SS del trabajador (sobre bruto mensual base 12 pagas)
  const baseCotizacionMensual = salarioBrutoAnual / 12;
  const cotizacionCC = baseCotizacionMensual * 0.047; // Contingencias comunes 4.7%
  const cotizacionDesempleo = baseCotizacionMensual * 0.0155; // Desempleo 1.55%
  const cotizacionFormacion = baseCotizacionMensual * 0.001; // Formación 0.1%
  const cotizacionMEI = baseCotizacionMensual * 0.008; // MEI 0.8% en 2026
  const totalCotizacionesMensual = cotizacionCC + cotizacionDesempleo + cotizacionFormacion + cotizacionMEI;

  // Para IRPF, calculamos sobre bruto anual
  const totalCotizacionesAnual = totalCotizacionesMensual * 12;

  // Mínimo personal
  let minimoPersonal = 5550;
  if (situacionFamiliar === "casado_conyuge_sin_ingresos") {
    minimoPersonal += 3400;
  }
  const minimoHijos = [0, 2400, 2400 + 2700, 2400 + 2700 + 4000, 2400 + 2700 + 4000 + 4500];
  const deduccionHijos = minimoHijos[Math.min(hijosmenores25, 4)] || 0;
  const deduccionesPersonales = minimoPersonal + deduccionHijos;

  // Base imponible
  const baseImponible = Math.max(0, salarioBrutoAnual - totalCotizacionesAnual - 2000);

  // Tramos 2026
  const TRAMOS = [
    { desde: 0, hasta: 12450, tipo: 0.19 },
    { desde: 12450, hasta: 20200, tipo: 0.24 },
    { desde: 20200, hasta: 35200, tipo: 0.30 },
    { desde: 35200, hasta: 60000, tipo: 0.37 },
    { desde: 60000, hasta: 300000, tipo: 0.45 },
    { desde: 300000, hasta: Infinity, tipo: 0.47 },
  ];

  const calcCuota = (base: number) => {
    let cuota = 0;
    let restante = base;
    for (const t of TRAMOS) {
      if (restante <= 0) break;
      const ancho = t.hasta === Infinity ? restante : t.hasta - t.desde;
      const baseTramo = Math.min(restante, ancho);
      cuota += baseTramo * t.tipo;
      restante -= baseTramo;
    }
    return cuota;
  };

  const cuotaTotal = calcCuota(baseImponible);
  const cuotaMinimo = calcCuota(deduccionesPersonales);
  const retencionAnual = Math.max(0, cuotaTotal - cuotaMinimo);
  const tipoRetencion = salarioBrutoAnual > 0 ? (retencionAnual / salarioBrutoAnual) * 100 : 0;
  const retencionMensual = retencionAnual / pagasExtras;

  // Cotizaciones mensuales en nómina
  const cotizacionesEnNomina = totalCotizacionesMensual;

  const salarioNetoMensual = salarioBrutoMensual - cotizacionesEnNomina - retencionMensual;
  const salarioNetoAnual = salarioBrutoAnual - totalCotizacionesAnual - retencionAnual;

  return {
    salarioBrutoMensual: Math.round(salarioBrutoMensual * 100) / 100,
    cotizacionSS: Math.round(cotizacionCC * 100) / 100,
    cotizacionDesempleo: Math.round(cotizacionDesempleo * 100) / 100,
    cotizacionFormacion: Math.round((cotizacionFormacion + cotizacionMEI) * 100) / 100,
    totalCotizaciones: Math.round(cotizacionesEnNomina * 100) / 100,
    retencionIRPF: Math.round(retencionMensual * 100) / 100,
    tipoRetencion: Math.round(tipoRetencion * 100) / 100,
    salarioNetoMensual: Math.round(salarioNetoMensual * 100) / 100,
    salarioNetoAnual: Math.round(salarioNetoAnual * 100) / 100,
    salarioBrutoAnual,
  };
}
