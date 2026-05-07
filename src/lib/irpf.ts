export interface DatosIRPF {
  salarioBrutoAnual: number;
  situacionFamiliar: "soltero" | "casado_conyuge_ingresos" | "casado_conyuge_sin_ingresos";
  hijosmenores25: number;
  comunidadAutonoma: string;
}

export interface ResultadoIRPF {
  baseImponible: number;
  cuotaIntegra: number;
  retencionAnual: number;
  retencionMensual: number;
  tipoEfectivo: number;
  tipoMarginal: number;
  deduccionesPersonales: number;
  tramoDetalle: { desde: number; hasta: number; tipo: number; cuota: number }[];
}

// Tramos IRPF estatal + autonómico combinado 2026 (general)
const TRAMOS_2026 = [
  { desde: 0, hasta: 12450, tipo: 19 },
  { desde: 12450, hasta: 20200, tipo: 24 },
  { desde: 20200, hasta: 35200, tipo: 30 },
  { desde: 35200, hasta: 60000, tipo: 37 },
  { desde: 60000, hasta: 300000, tipo: 45 },
  { desde: 300000, hasta: Infinity, tipo: 47 },
];

export function calcularIRPF(datos: DatosIRPF): ResultadoIRPF {
  const { salarioBrutoAnual, situacionFamiliar, hijosmenores25 } = datos;

  // Cotización SS trabajador aprox (6.35%)
  const cotizacionSS = salarioBrutoAnual * 0.0635;

  // Mínimo personal
  let minimoPersonal = 5550;
  if (situacionFamiliar === "casado_conyuge_sin_ingresos") {
    minimoPersonal += 3400;
  }

  // Mínimo por descendientes
  const minimoHijos = [0, 2400, 2400 + 2700, 2400 + 2700 + 4000, 2400 + 2700 + 4000 + 4500];
  const deduccionHijos = minimoHijos[Math.min(hijosmenores25, 4)] || 0;

  const deduccionesPersonales = minimoPersonal + deduccionHijos;

  // Base imponible
  const baseImponible = Math.max(0, salarioBrutoAnual - cotizacionSS - 2000); // 2000€ gastos deducibles trabajador

  // Base liquidable
  const baseLiquidable = Math.max(0, baseImponible);

  // Calcular cuota por tramos
  const tramoDetalle: { desde: number; hasta: number; tipo: number; cuota: number }[] = [];
  let cuotaTotal = 0;
  let restante = baseLiquidable;

  for (const tramo of TRAMOS_2026) {
    if (restante <= 0) break;
    const anchoTramo = tramo.hasta === Infinity ? restante : tramo.hasta - tramo.desde;
    const baseTramo = Math.min(restante, anchoTramo);
    const cuota = baseTramo * (tramo.tipo / 100);
    tramoDetalle.push({
      desde: tramo.desde,
      hasta: tramo.hasta === Infinity ? baseLiquidable : tramo.hasta,
      tipo: tramo.tipo,
      cuota: Math.round(cuota * 100) / 100,
    });
    cuotaTotal += cuota;
    restante -= baseTramo;
  }

  // Cuota del mínimo personal (lo que se descuenta)
  let cuotaMinimo = 0;
  let restanteMinimo = deduccionesPersonales;
  for (const tramo of TRAMOS_2026) {
    if (restanteMinimo <= 0) break;
    const anchoTramo = tramo.hasta === Infinity ? restanteMinimo : tramo.hasta - tramo.desde;
    const baseTramo = Math.min(restanteMinimo, anchoTramo);
    cuotaMinimo += baseTramo * (tramo.tipo / 100);
    restanteMinimo -= baseTramo;
  }

  const cuotaIntegra = Math.max(0, cuotaTotal - cuotaMinimo);

  const tipoEfectivo = salarioBrutoAnual > 0 ? (cuotaIntegra / salarioBrutoAnual) * 100 : 0;

  // Tipo marginal
  let tipoMarginal = 19;
  for (const tramo of TRAMOS_2026) {
    if (baseLiquidable > tramo.desde) {
      tipoMarginal = tramo.tipo;
    }
  }

  return {
    baseImponible: Math.round(baseImponible * 100) / 100,
    cuotaIntegra: Math.round(cuotaIntegra * 100) / 100,
    retencionAnual: Math.round(cuotaIntegra * 100) / 100,
    retencionMensual: Math.round((cuotaIntegra / 12) * 100) / 100,
    tipoEfectivo: Math.round(tipoEfectivo * 100) / 100,
    tipoMarginal,
    deduccionesPersonales,
    tramoDetalle,
  };
}
