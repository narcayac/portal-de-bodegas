export default function manifest() {
  return {
    name: "Portal de Bodegas",
    short_name: "Bodegas",
    description:
      "Arriendo de bodegas industriales para empresas en San Bernardo, Región Metropolitana.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#011943",
    lang: "es-CL",
    icons: [
      { src: "/icon.svg", type: "image/svg+xml", sizes: "any" },
      { src: "/apple-icon", type: "image/png", sizes: "180x180" },
    ],
  };
}
