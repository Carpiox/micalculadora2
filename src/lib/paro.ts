export interface DatosParo {
  baseCotizacionMensual: number;
  diasCotizados: number; // últimos 6 años
  hijosACargo: number;
}

export interface ResultadoParo {
  cuantiaMensual70: number;
  cuantiaMensual50: number;
  duracionMeses: number;
  mesesAl70: number;
  mesesAl50: number;
  topeMaximo: number;
  topeMinimo: number;
  cuantiaMensualReal: number;
  totalEstimado: number;
  baseReguladoraDiaria: number;
}

const IPREM_MENSUAL_2026 = 624;

function calcularDuracionMeses(diasCotizados: number): number {
  if (diasCotizados < 360) return 0;
  if (diasCotizados < 540) return 4;
  if (diasCotizados < 720) return 6;
  if (diasCotizados < 900) return 8;
  if (diasCotizados < 1080) return 10;
  if (diasCotizados < 1260) return 12;
  if (diasCotizados < 1440) return 14;
  if (diasCotizados < 1620) return 16;
  if (diasCotizados < 1800) return 18;
  if (diasCotizados < 1980) return 20;
  if (diasCotizados < 2160) return 22;
  return 24;
}

export function calcularParo(datos: DatosParo): ResultadoParo {
  const { baseCotizacionMensual, diasCotizados, hijosACargo } = datos;

  const baseReguladoraDiaria = baseCotizacionMensual / 30;
  const baseReguladoraMensual = baseCotizacionMensual;

  const cuantiaMensual70 = baseReguladoraMensual * 0.7;
  const cuantiaMensual50 = baseReguladoraMensual * 0.5;

  const duracionMeses = calcularDuracionMeses(diasCotizados);
  const mesesAl70 = Math.min(6, duracionMeses);
  const mesesAl50 = Math.max(0, duracionMeses - 6);

  // Topes 2026
  let topeMaximo: number;
  if (hijosACargo === 0) {
    topeMaximo = IPREM_MENSUAL_2026 * 1.75;
  } else if (hijosACargo === 1) {
    topeMaximo = IPREM_MENSUAL_2026 * 2.0;
  } else {
    topeMaximo = IPREM_MENSUAL_2026 * 2.25;
  }

  let topeMinimo: number;
  if (hijosACargo === 0) {
    topeMinimo = IPREM_MENSUAL_2026 * 0.8;
  } else {
    topeMinimo = IPREM_MENSUAL_2026 * 1.07;
  }

  const aplicarTopes = (cuantia: number) => Math.max(topeMinimo, Math.min(topeMaximo, cuantia));

  const cuantiaReal70 = aplicarTopes(cuantiaMensual70);
  const cuantiaReal50 = aplicarTopes(cuantiaMensual50);

  const cuantiaMensualReal = mesesAl70 > 0 ? cuantiaReal70 : cuantiaReal50;

  const totalEstimado = cuantiaReal70 * mesesAl70 + cuantiaReal50 * mesesAl50;

  return {
    cuantiaMensual70: Math.round(cuantiaReal70 * 100) / 100,
    cuantiaMensual50: Math.round(cuantiaReal50 * 100) / 100,
    duracionMeses,
    mesesAl70,
    mesesAl50,
    topeMaximo: Math.round(topeMaximo * 100) / 100,
    topeMinimo: Math.round(topeMinimo * 100) / 100,
    cuantiaMensualReal: Math.round(cuantiaMensualReal * 100) / 100,
    totalEstimado: Math.round(totalEstimado * 100) / 100,
    baseReguladoraDiaria: Math.round(baseReguladoraDiaria * 100) / 100,
  };
}
