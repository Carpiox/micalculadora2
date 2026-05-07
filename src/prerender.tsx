import { renderToString } from "react-dom/server";
import type { PrerenderArguments } from "vite-prerender-plugin";
import { parseLinks } from "vite-prerender-plugin/parse";
import PrerenderApp from "@/ssr/PrerenderApp";

interface HeadElement {
  type: string;
  props: Record<string, string>;
  children?: string;
}

function parseAttributes(rawAttributes: string): Record<string, string> {
  const attributes: Record<string, string> = {};
  const attributesRegex = /([:@A-Za-z0-9_-]+)(?:="([^"]*)")?/g;
  let match: RegExpExecArray | null;

  while ((match = attributesRegex.exec(rawAttributes)) !== null) {
    const [, key, value] = match;
    attributes[key] = value ?? "";
  }

  return attributes;
}

function parseSelfClosingTags(markup: string, tagName: "meta" | "link"): HeadElement[] {
  const regex = new RegExp(`<${tagName}\\s+([^>]*?)(?:\\/>|>)`, "gi");
  const tags: HeadElement[] = [];
  let match: RegExpExecArray | null;

  while ((match = regex.exec(markup)) !== null) {
    tags.push({
      type: tagName,
      props: parseAttributes(match[1]),
    });
  }

  return tags;
}

function parseScriptTags(markup: string): HeadElement[] {
  const regex = /<script\s+([^>]*?)>([\s\S]*?)<\/script>/gi;
  const tags: HeadElement[] = [];
  let match: RegExpExecArray | null;

  while ((match = regex.exec(markup)) !== null) {
    const children = match[2]?.trim();
    tags.push({
      type: "script",
      props: parseAttributes(match[1]),
      ...(children ? { children } : {}),
    });
  }

  return tags;
}

function extractTitle(markup: string) {
  const match = /<title[^>]*>([\s\S]*?)<\/title>/i.exec(markup);
  return match?.[1]?.trim() ?? "";
}

export async function prerender(data: PrerenderArguments) {
  const helmetContext: { helmet?: any } = {};
  const html = renderToString(<PrerenderApp url={data.url} helmetContext={helmetContext} />);
  const links = new Set(parseLinks(html));

  const helmet = helmetContext.helmet;
  const titleMarkup = helmet?.title?.toString?.() ?? "";
  const metaMarkup = helmet?.meta?.toString?.() ?? "";
  const linkMarkup = helmet?.link?.toString?.() ?? "";
  const scriptMarkup = helmet?.script?.toString?.() ?? "";

  const headElements = [
    ...parseSelfClosingTags(metaMarkup, "meta"),
    ...parseSelfClosingTags(linkMarkup, "link"),
    ...parseScriptTags(scriptMarkup),
  ];

  return {
    html,
    links,
    head: {
      lang: "es",
      title: extractTitle(titleMarkup),
      elements: new Set(headElements),
    },
  };
}
