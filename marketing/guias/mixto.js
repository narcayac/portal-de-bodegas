// Post único "mezcla" (1080x1080) — formato aprobado que combina foto + cifra
// grande + cita editorial + franja de datos, distinto al carrusel 4:5 de
// slide-0N.png. Por ahora es específico de Built-to-suit; si se reutiliza
// para más guías, se generaliza como build.js/pdf.js (recibiendo un objeto
// de contenido en vez de tenerlo hardcodeado).
//
//   node mixto.js   → escribe salida/built-to-suit/post-mixto.png
const { chromium } = require("playwright");
const fs = require("fs");
const path = require("path");
const { C, photo } = require("../shared/brand.js");

const CHROME =
  process.env.CHROME_PATH ||
  "/opt/pw-browsers/chromium-1194/chrome-linux/chrome";

const FONTS = fs.readFileSync(path.join(__dirname, "../shared/fonts.css"), "utf8");

const shell = (body) => `<!doctype html><html lang="es"><head><meta charset="utf-8">
<style>
${FONTS}
*{margin:0;padding:0;box-sizing:border-box}
html,body{width:1080px;height:1080px}
body{font-family:Inter,sans-serif;-webkit-font-smoothing:antialiased}
.slide{position:relative;width:1080px;height:1080px;overflow:hidden}
</style></head><body>${body}</body></html>`;

const logo = (dark) => `
<svg width="44" height="44" viewBox="0 0 100 100" style="flex:none">
  <circle cx="50" cy="50" r="48" fill="${dark ? "none" : C.navy}"
          stroke="${dark ? "#ffffff" : "none"}" stroke-width="4"/>
  <path d="M27 52 50 30 73 52 73 75 27 75Z" fill="none"
        stroke="${dark ? "#ffffff" : "#f3f4f5"}" stroke-width="5" stroke-linejoin="round"/>
  <rect x="42" y="58" width="16" height="17" fill="${C.blue}"/>
</svg>`;
const wm = (dark) => `<span style="font-family:'Plus Jakarta Sans',sans-serif;font-weight:800;
  font-size:26px;letter-spacing:-.01em;color:${dark ? "#fff" : C.navy}">portal
  <span style="color:${C.blue}">de</span> bodegas</span>`;

// Piso mínimo de legibilidad: nada por debajo de ~20px. En el feed de
// Instagram esto se ve a una fracción del tamaño real (a menudo <400px de
// ancho en pantalla) — verificado con capturas a 470px y 350px antes de dar
// por buena esta plantilla.
const stats = [
  ["360–14.000 m²", "Módulos ya construidos"],
  ["5 pasos", "Del requerimiento a la entrega"],
  ["0 comisión", "Trato directo con el propietario"],
];

const html = shell(`
<div class="slide" style="background:#fff">
  <div style="position:relative;width:1080px;height:388px;overflow:hidden">
    <img src="${photo("bosque-catemito", 4)}" style="width:100%;height:100%;object-fit:cover;object-position:56% 40%">
    <div style="position:absolute;left:0;right:0;bottom:0;height:150px;background:
      linear-gradient(to top, rgba(1,25,67,.85), rgba(1,25,67,0))"></div>
    <div style="position:absolute;left:56px;top:40px;background:${C.navy}e6;color:#fff;
      font-family:'IBM Plex Mono',monospace;font-weight:500;font-size:20px;letter-spacing:.16em;
      text-transform:uppercase;padding:13px 24px">Gu&iacute;a &middot; Built-to-suit</div>
    <div style="position:absolute;left:56px;bottom:26px;display:flex;align-items:center;gap:14px">
      ${logo(true)}${wm(true)}
    </div>
  </div>

  <div style="position:absolute;left:56px;right:56px;top:426px">
    <div style="font-family:'IBM Plex Mono',monospace;font-weight:500;font-size:20px;letter-spacing:.16em;
      color:${C.slate};text-transform:uppercase">Capacidad a medida &middot; Bosque Catemito</div>
    <div style="display:flex;align-items:baseline;gap:26px;margin-top:12px">
      <div style="font-family:Fraunces,serif;font-weight:600;font-size:96px;line-height:0.9;
        color:${C.navy};letter-spacing:-.02em">30.000&nbsp;m&sup2;</div>
      <div style="font-family:'IBM Plex Mono',monospace;font-weight:500;font-size:21px;color:${C.slate};
        max-width:190px;line-height:1.4">Capacidad m&aacute;xima<br>a construir a medida</div>
    </div>

    <div style="display:flex;gap:20px;align-items:flex-start;margin-top:26px;padding-top:24px;
      border-top:1px solid ${C.border}">
      <div style="font-family:Fraunces,serif;font-weight:600;font-size:40px;
        color:${C.blue};line-height:0.6;flex:none">&ldquo;</div>
      <div style="font-family:Fraunces,serif;font-weight:600;font-size:32px;line-height:1.28;
        color:${C.navy};max-width:850px">
        Cuando ninguna bodega est&aacute;ndar te queda bien, se construye una que s&iacute;.
      </div>
    </div>
  </div>

  <div style="position:absolute;left:56px;right:56px;bottom:48px">
    <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:24px;border-top:1px solid ${C.navy};padding-top:26px">
      ${stats
        .map(
          (s, i) => `<div style="${i > 0 ? `border-left:1px solid ${C.border};padding-left:26px;` : ""}">
          <div style="font-family:Fraunces,serif;font-weight:600;font-size:32px;color:${C.navy};white-space:nowrap">${s[0]}</div>
          <div style="font-family:'IBM Plex Mono',monospace;font-weight:500;font-size:20px;letter-spacing:.01em;
            color:${C.slate};margin-top:10px;line-height:1.4">${s[1]}</div>
        </div>`
        )
        .join("")}
    </div>
    <div style="font-family:'IBM Plex Mono',monospace;font-weight:600;font-size:22px;letter-spacing:.02em;
      color:${C.slate};margin-top:28px;line-height:1.5">
      +56 9 9225 9272 &middot; PORTALDEBODEGAS.CL
    </div>
  </div>
</div>`);

(async () => {
  const outDir = path.join(__dirname, "salida", "built-to-suit");
  fs.mkdirSync(outDir, { recursive: true });

  const browser = await chromium.launch({ executablePath: CHROME });
  const page = await browser.newPage({ viewport: { width: 1080, height: 1080 }, deviceScaleFactor: 1 });
  await page.setContent(html, { waitUntil: "load" });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(300);

  const file = path.join(outDir, "post-mixto.png");
  await page.screenshot({ path: file });
  console.log("✓", file);

  await browser.close();
})();
