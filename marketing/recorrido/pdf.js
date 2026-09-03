// Arma el PDF de un carrusel para LinkedIn (publica documentos, no carruseles nativos)
// a partir de los slide-0N.png ya renderizados por build.js. No vuelve a dibujar
// texto: empaqueta las imágenes tal cual, así queda pixel-idéntico al carrusel de IG.
//
//   node pdf.js <project-id>    → escribe salida/<project-id>/recorrido-<project-id>.pdf
const fs = require("fs");
const path = require("path");
const { chromium } = require("playwright");

const CHROME =
  process.env.CHROME_PATH ||
  "/opt/pw-browsers/chromium-1194/chrome-linux/chrome";

const WIDTH_PX = 1080;
const HEIGHT_PX = 1350;

const projectId = process.argv[2];
if (!projectId) {
  console.error("Uso: node pdf.js <project-id>");
  process.exit(1);
}

const dir = path.join(__dirname, "salida", projectId);
const files = fs
  .readdirSync(dir)
  .filter((f) => /^slide-\d+\.png$/.test(f))
  .sort();

if (!files.length) {
  console.error("No hay slides en", dir, "— corre primero: node build.js", projectId);
  process.exit(1);
}

const pages = files
  .map((f) => {
    const b64 = fs.readFileSync(path.join(dir, f)).toString("base64");
    return `<div class="page"><img src="data:image/png;base64,${b64}"></div>`;
  })
  .join("\n");

const html = `<!doctype html><html><head><meta charset="utf-8"><style>
  @page { size: ${WIDTH_PX}px ${HEIGHT_PX}px; margin: 0; }
  * { margin: 0; padding: 0; }
  .page { width: ${WIDTH_PX}px; height: ${HEIGHT_PX}px; overflow: hidden; page-break-after: always; }
  .page:last-child { page-break-after: auto; }
  .page img { width: ${WIDTH_PX}px; height: ${HEIGHT_PX}px; display: block; }
</style></head><body>${pages}</body></html>`;

(async () => {
  const browser = await chromium.launch({ executablePath: CHROME });
  const page = await browser.newPage();
  await page.setContent(html, { waitUntil: "load" });

  const outFile = path.join(dir, `recorrido-${projectId}.pdf`);
  await page.pdf({
    path: outFile,
    printBackground: true,
    width: `${WIDTH_PX}px`,
    height: `${HEIGHT_PX}px`,
    margin: { top: 0, right: 0, bottom: 0, left: 0 },
  });

  await browser.close();
  console.log("✓", outFile);
})();
