# miCalculadora.es

> Calculadoras laborales gratuitas y actualizadas a 2026 para trabajadores en España.

[![Version](https://img.shields.io/badge/versión-v1.2.0-blue)](https://github.com/Carpiox/micalculadora2/releases/tag/v1.2.0)
[![Live](https://img.shields.io/badge/web-micalculadora.es-4CAF50)](https://micalculadora.es)
[![Stack](https://img.shields.io/badge/stack-React%20%2B%20TypeScript-61DAFB)](https://react.dev)

Plataforma online que permite calcular de forma instantánea y precisa finiquitos, indemnizaciones, prestaciones por desempleo, retención de IRPF y nómina neta. Todo 100% gratuito, sin registro, sin publicidad invasiva y con privacidad total: los cálculos se ejecutan exclusivamente en el navegador del usuario, ningún dato sale del dispositivo.

🔗 [Ver en producción → micalculadora.es](https://micalculadora.es)

---

## Herramientas disponibles

| Calculadora | Descripción |
|---|---|
| [Finiquito](https://micalculadora.es/calculadora-finiquito/) | Salario pendiente, vacaciones no disfrutadas, pagas extras e indemnización |
| [Indemnización](https://micalculadora.es/calculadora-indemnizacion/) | Despido improcedente, objetivo, ERE y doble cálculo para contratos anteriores a 2012 |
| [Paro 2026](https://micalculadora.es/calculadora-paro/) | Cuantía mensual y duración según base de cotización y días trabajados |
| [IRPF 2026](https://micalculadora.es/calculadora-irpf/) | Tipo efectivo, tipo marginal, desglose por tramos y retención real |
| [Nómina neta](https://micalculadora.es/calculadora-nomina/) | Conversión bruto → neto con desglose completo de cotizaciones y IRPF |

---

## Características principales

- **+50.000 cálculos realizados** por usuarios reales
- Resultados instantáneos con desglose detallado y explicaciones claras
- Contenido educativo en cada página: ejemplos prácticos, tablas oficiales y FAQs
- Diseño completamente responsive y optimizado para móviles
- Privacidad total: ningún dato del usuario sale del navegador
- Actualizado a la normativa española 2026 (ET, tramos IRPF, IPREM y bases de cotización)

---

## Tecnologías y arquitectura

| Tecnología | Uso |
|---|---|
| React + TypeScript | UI y lógica de calculadoras |
| Tailwind CSS | Estilos |
| Vite | Build y servidor de desarrollo |
| react-dom/server | Prerender SSR propio |
| react-helmet-async | Gestión dinámica del `<head>` |
| Vitest | Tests unitarios |
| Playwright | Tests end-to-end |
| Bun | Gestor de paquetes |

**Despliegue:** `bun run build` genera un `dist/` con HTML/CSS/JS estático optimizado que se despliega en Hostinger.

---

## El problema técnico central: SEO en una SPA

React genera una Single Page Application: el servidor devuelve siempre el mismo `index.html` casi vacío y el contenido lo monta JavaScript en el cliente. Cuando Google rastrea la web, no ejecuta JavaScript — solo lee el HTML estático. Resultado sin solución: páginas vacías, sin indexación posible.

**Solución implementada:** sistema de prerender propio usando `react-dom/server`, sin frameworks externos como Next.js ni Remix. Un script de build recorre todas las rutas definidas, renderiza cada componente en servidor y genera HTML estático completo con sus meta tags específicos. El resultado se sirve estáticamente desde Hostinger, manteniendo la experiencia de SPA una vez el usuario navega dentro de la web.

---

## Estructura del proyecto

```
micalculadora2/
├── public/                      # Archivos estáticos (imágenes, favicon, og-default.png)
├── src/
│   ├── components/
│   │   ├── below-fold/          # Componentes lazy-loaded (contenido secundario)
│   │   ├── Breadcrumb.tsx       # Miga de pan visual + schema BreadcrumbList
│   │   ├── FaqSchema.tsx        # Schema FAQPage para Google
│   │   ├── SchemaHead.tsx       # Inyector de JSON-LD al <head>
│   │   └── SEOHead.tsx          # Meta tags, canonical, OG, Twitter Cards
│   ├── lib/
│   │   ├── schema.ts            # Helpers reutilizables para generar schemas
│   │   └── site-routes.ts       # Rutas canónicas del sitio (con trailing slash)
│   ├── pages/                   # Una página por calculadora
│   ├── utils/                   # Lógica de cálculo (finiquito, IRPF, paro...)
│   ├── hooks/                   # Custom hooks
│   ├── App.tsx
│   └── main.tsx
├── scripts/                     # Script de prerender por ruta
├── sitemap.xml
├── robots.txt
├── vite.config.ts
├── tailwind.config.ts
├── playwright.config.ts
└── package.json
```

---

## Historial de versiones

### v1.2.0 — SEO técnico completo
> Mayo 2026

- **Schemas estructurados reutilizables:** helper `schema.ts` con funciones para generar `WebApplication`, `FAQPage`, `BreadcrumbList` y `WebSite + SearchAction`. Centralizados para que cualquier cambio afecte a todas las páginas a la vez.
- **Inyección de `<head>` con react-helmet-async:** `SEOHead.tsx` gestiona título, descripción, canonical, robots, OG y Twitter Cards. `SchemaHead.tsx` inyecta los JSON-LD. Funcionan tanto en cliente como en el prerender SSR.
- **Breadcrumb visual + schema:** nuevo componente `Breadcrumb.tsx` que renderiza la miga de pan para el usuario y genera el schema `BreadcrumbList` para Google simultáneamente.
- **FAQ schema:** `FaqSchema.tsx` genera el schema `FAQPage` en cada calculadora, lo que permite a Google mostrar las preguntas directamente en los resultados de búsqueda (rich results).
- **Lazy loading below-the-fold:** contenido secundario de cada calculadora (tablas, ejemplos, comparativas, FAQs visuales) extraído a componentes separados y cargado con `React.lazy + Suspense`. Mejora el LCP y el tiempo de carga inicial.
- **Imagen Open Graph:** generado `og-default.png` (1200×630px) referenciado en todas las páginas. Las previews en LinkedIn, Twitter y WhatsApp ahora muestran imagen correctamente.
- **Sitemap y robots consistentes:** 6 URLs principales con trailing slash y `lastmod` actualizado. Consistencia total entre canonical, sitemap y enlaces internos para evitar contenido duplicado.
- **Preload de fuente y logo SVG:** añadido en `index.html` para mejorar el LCP.

### v1.1.0 — Primera versión en producción
> 2025

- Lanzamiento público en micalculadora.es
- 5 calculadoras operativas con lógica validada
- Prerender SSR propio con react-dom/server
- Primeros 50.000 cálculos realizados

### v1.0.0 — Prototipo inicial
> 2025

- Prototipo funcional de las calculadoras
- Arquitectura base: React + TypeScript + Vite + Tailwind

---

## Aprendizajes principales

Este proyecto nació para entender cómo funcionan el SEO técnico, el renderizado en servidor y el despliegue de aplicaciones web reales con usuarios reales. Arrancó con apoyo de Lovable.dev para el prototipado inicial y evolucionó hacia una arquitectura propia a medida que aparecían problemas concretos que resolver: indexación en Google, rendimiento de carga, schemas estructurados y gestión de meta tags en una SPA sin framework SSR.