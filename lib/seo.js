import { SITE } from "./data";

/**
 * Build a complete metadata object for a page: canonical, Open Graph and
 * Twitter card. The site-wide OG image (app/opengraph-image.jsx) is injected
 * automatically by Next.js, so individual pages don't need to set it.
 */
export function pageMeta({ title, description, path, noindex = false }) {
  return {
    title,
    description,
    alternates: { canonical: path },
    robots: noindex ? { index: false, follow: true } : undefined,
    openGraph: {
      type: "website",
      url: path,
      siteName: SITE.name,
      locale: "es_CL",
      title,
      description,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}
