import { Helmet } from "react-helmet-async";
import SchemaHead from "@/components/SchemaHead";
import {
  DEFAULT_OG_IMAGE,
  DEFAULT_TWITTER_CARD,
  SITE_LOCALE,
  SITE_NAME,
  SITE_URL,
} from "@/lib/site-routes";

interface SEOHeadProps {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  image?: string;
  noindex?: boolean;
  robots?: string;
  schema?: object | object[];
}

function getAbsoluteUrl(path: string) {
  if (path === "/") return `${SITE_URL}/`;
  return `${SITE_URL}${path.replace(/\/+$/, "")}/`;
}

export default function SEOHead({
  title,
  description,
  path,
  keywords,
  image = DEFAULT_OG_IMAGE,
  noindex = false,
  robots,
  schema,
}: SEOHeadProps) {
  const canonicalUrl = getAbsoluteUrl(path);
  const imageUrl = image.startsWith("http") ? image : `${SITE_URL}${image}`;
  const robotsContent = robots ?? (noindex ? "noindex, nofollow" : "index, follow, max-image-preview:large");

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        {keywords?.length ? <meta name="keywords" content={keywords.join(", ")} /> : null}
        <meta name="author" content={SITE_NAME} />
        <meta name="robots" content={robotsContent} />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content={SITE_NAME} />
        <meta property="og:locale" content={SITE_LOCALE} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:image" content={imageUrl} />
        <meta property="og:image:alt" content={title} />
        <meta name="twitter:card" content={DEFAULT_TWITTER_CARD} />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={imageUrl} />
      </Helmet>
      {schema ? <SchemaHead schema={schema} schemaKey={`seo-schema-${path}`} /> : null}
    </>
  );
}
