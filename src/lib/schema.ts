import { SITE_URL } from "@/lib/site-routes";

export interface FaqQuestion {
  pregunta: string;
  respuesta: string;
}

export interface BreadcrumbItem {
  name: string;
  url: string;
}

function toAbsoluteUrl(url: string) {
  if (url.startsWith("http")) {
    return url.endsWith("/") ? url : `${url}/`;
  }

  if (url === "/") {
    return `${SITE_URL}/`;
  }

  const normalizedPath = url.replace(/\/+$/, "");
  return `${SITE_URL}${normalizedPath}/`;
}

export function generateWebsiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "miCalculadora.es",
    url: `${SITE_URL}/`,
    description: "Calculadoras laborales gratis para España 2026",
    potentialAction: {
      "@type": "SearchAction",
      target: `${SITE_URL}/?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}

export function generateCalculatorSchema(name: string, description: string, url: string) {
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name,
    url: toAbsoluteUrl(url),
    applicationCategory: "FinanceApplication",
    operatingSystem: "Web",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "EUR",
    },
    description,
  };
}

export function generateFaqSchema(questions: FaqQuestion[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: questions.map((faq) => ({
      "@type": "Question",
      name: faq.pregunta,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.respuesta,
      },
    })),
  };
}

export function generateBreadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: toAbsoluteUrl(item.url),
    })),
  };
}
