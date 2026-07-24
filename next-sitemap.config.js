/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://www.portaldebodegas.cl",
  generateRobotsTxt: true,
  trailingSlash: true,
  // /politica-de-privacidad/ is noindex and excluded from the sitemap.
  // The /icon.svg, /opengraph-image, /apple-icon and /manifest.webmanifest
  // entries are Next.js metadata routes (files, not pages) — keep them out.
  exclude: [
    "/politica-de-privacidad",
    "/politica-de-privacidad/",
    "/icon.svg",
    "/icon.svg/",
    "/opengraph-image",
    "/opengraph-image/",
    "/apple-icon",
    "/apple-icon/",
    "/manifest.webmanifest",
    "/manifest.webmanifest/",
  ],
  robotsTxtOptions: {
    policies: [
      { userAgent: "*", allow: "/", disallow: ["/api/"] },
    ],
  },
};
