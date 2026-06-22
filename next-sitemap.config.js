/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://www.portaldebodegas.cl",
  generateRobotsTxt: true,
  trailingSlash: true,
  // /politica-de-privacidad/ is noindex and excluded from the sitemap.
  exclude: ["/politica-de-privacidad", "/politica-de-privacidad/"],
  robotsTxtOptions: {
    policies: [
      { userAgent: "*", allow: "/", disallow: ["/api/"] },
    ],
    additionalSitemaps: ["https://www.portaldebodegas.cl/sitemap.xml"],
  },
};
