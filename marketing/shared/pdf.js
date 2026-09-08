// Empaqueta un carrusel ya renderizado (slide-0N.png) en un PDF de una página
// por slide — LinkedIn no tiene carrusel nativo, publica documentos. No vuelve
// a dibujar texto: usa las imágenes tal cual, así queda pixel-idéntico al
// carrusel de Instagram.
//
//   node pdf.js <carpeta-de-slides> [nombre-salida.pdf]
//   node pdf.js ../recorrido/salida/acacias-seis
//   node pdf.js ../guias/salida/built-to-suit
const fs = require("fs");
const path = require("path");
const { chromium } = require("playwright");

const CHROME =
  process.env.CHROME_PATH ||
  "/opt/pw-browsers/chromium-1194/chrome-linux/chrome";

const WIDTH_PX = 1080;
const HEIGHT_PX = 1350;

const dirArg = process.argv[2];
if (!dirArg) {
  console.error("Uso: node pdf.js <carpeta-de-slides> [nombre-salida.pdf]");
  process.exit(1);
}

const dir = path.resolve(process.cwd(), dirArg);
const files = fs
  .readdirSync(dir)
  .filter((f) => /^slide-\d+\.png$/.test(f))
  .sort();

if (!files.length) {
  console.error("No hay slide-0N.png en", dir);
  process.exit(1);
}

const outName = process.argv[3] || `${path.basename(dir)}.pdf`;

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

  const outFile = path.join(dir, outName);
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
