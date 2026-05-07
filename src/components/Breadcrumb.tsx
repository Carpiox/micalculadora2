import { Link } from "react-router-dom";
import SchemaHead from "@/components/SchemaHead";
import { type BreadcrumbItem, generateBreadcrumbSchema } from "@/lib/schema";

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

function toInternalPath(url: string) {
  if (!url.startsWith("http")) {
    return url;
  }

  try {
    const parsed = new URL(url);
    return `${parsed.pathname}${parsed.search}${parsed.hash}` || "/";
  } catch {
    return "/";
  }
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  if (items.length < 2) {
    return null;
  }

  return (
    <>
      <SchemaHead schema={generateBreadcrumbSchema(items)} schemaKey="breadcrumb-schema" />
      <nav className="container max-w-3xl py-4 text-sm" aria-label="Migas de pan">
        <ol className="flex flex-wrap items-center gap-1 text-muted-foreground">
          {items.map((item, index) => {
            const isLast = index === items.length - 1;

            return (
              <li key={`${item.url}-${index}`} className="flex items-center gap-1">
                {isLast ? (
                  <span className="text-foreground font-medium">{item.name}</span>
                ) : (
                  <Link to={toInternalPath(item.url)} className="hover:text-foreground hover:underline">
                    {item.name}
                  </Link>
                )}
                {!isLast ? <span aria-hidden="true">/</span> : null}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
