export const SITE_URL = "https://micalculadora.es";
export const SITE_NAME = "miCalculadora.es";
export const SITE_LOCALE = "es_ES";
export const DEFAULT_OG_IMAGE = "/og-default.png";
export const DEFAULT_TWITTER_CARD = "summary_large_image";

export interface SiteRoute {
  path: string;
  changefreq: "daily" | "weekly" | "monthly" | "yearly";
  priority: string;
  indexable?: boolean;
}

export const SITE_ROUTES: SiteRoute[] = [
  { path: "/", changefreq: "daily", priority: "1.0", indexable: true },
  { path: "/calculadora-finiquito/", changefreq: "daily", priority: "0.9", indexable: true },
  { path: "/calculadora-paro/", changefreq: "daily", priority: "0.9", indexable: true },
  { path: "/calculadora-irpf/", changefreq: "daily", priority: "0.9", indexable: true },
  { path: "/calculadora-nomina/", changefreq: "daily", priority: "0.9", indexable: true },
  { path: "/calculadora-indemnizacion/", changefreq: "daily", priority: "0.9", indexable: true },
  { path: "/politica-privacidad/", changefreq: "monthly", priority: "0.4", indexable: true },
  { path: "/aviso-legal/", changefreq: "monthly", priority: "0.4", indexable: true },
  { path: "/cookies/", changefreq: "monthly", priority: "0.4", indexable: true },
];

export const PRERENDER_ROUTES = SITE_ROUTES.filter((route) => route.indexable !== false).map(
  (route) => route.path,
);

