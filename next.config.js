/** @type {import('next').NextConfig} */
const nextConfig = {
  // Real, pre-rendered HTML per route. Trailing slash matches the URL blueprint.
  trailingSlash: true,
  reactStrictMode: true,
  poweredByHeader: false,
  async redirects() {
    // Canonical host is www. 301-redirect the apex domain to avoid duplicate content.
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "portaldebodegas.cl" }],
        destination: "https://www.portaldebodegas.cl/:path*",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
