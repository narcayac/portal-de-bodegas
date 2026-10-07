// Mockup de dirección: diagrama de flujo en vez de foto+scrim o pantalla
// partida. Solo para feedback — no es parte de ningún build.js de serie
// todavía. Representa la slide 3 (zonas) de "Bodega para e-commerce" como
// un flujo de nodos conectados, fondo blanco institucional.
const { chromium } = require("playwright");
const fs = require("fs");
const path = require("path");
const { C, shell, brandRow } = require("../shared/brand.js");

const CHROME =
  process.env.CHROME_PATH ||
  "/opt/pw-browsers/chromium-1194/chrome-linux/chrome";

const icon = (d) => `
<svg width="52" height="52" viewBox="0 0 48 48" fill="none" style="flex:none">${d}</svg>`;

const ICONS = {
  recepcion: icon(`
    <path d="M10 22 H38 V40 H10 Z" stroke="${C.navy}" stroke-width="2.5" stroke-linejoin="round"/>
    <path d="M24 6 V22" stroke="${C.navy}" stroke-width="2.5"/>
    <path d="M16 15 L24 23 L32 15" stroke="${C.navy}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>`),
  picking: icon(`
    <rect x="8" y="8" width="32" height="32" stroke="${C.navy}" stroke-width="2.5"/>
    <line x1="8" y1="20" x2="40" y2="20" stroke="${C.navy}" stroke-width="2.5"/>
    <line x1="8" y1="32" x2="40" y2="32" stroke="${C.navy}" stroke-width="2.5"/>`),
  packing: icon(`
    <rect x="8" y="16" width="32" height="24" stroke="${C.navy}" stroke-width="2.5"/>
    <line x1="8" y1="28" x2="40" y2="28" stroke="${C.navy}" stroke-width="2.5"/>
    <line x1="24" y1="16" x2="24" y2="40" stroke="${C.navy}" stroke-width="2.5"/>`),
  despacho: icon(`
    <rect x="6" y="18" width="22" height="18" stroke="${C.navy}" stroke-width="2.5"/>
    <path d="M30 27 H42" stroke="${C.navy}" stroke-width="2.5"/>
    <path d="M36 21 L42 27 L36 33" stroke="${C.navy}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>`),
  devoluciones: icon(`
    <path d="M30 12 A16 16 0 1 1 14 28" stroke="${C.navy}" stroke-width="2.5" fill="none" stroke-linecap="round"/>
    <path d="M22 6 L30 12 L23 17" stroke="${C.navy}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>`),
};

const node = (n, key, label, x, y, dashed) => `
<div style="position:absolute;left:${x - 65}px;top:${y - 65}px;width:130px;text-align:center">
  <div style="width:110px;height:110px;margin:0 auto;border-radius:50%;
    border:${dashed ? "2.5px dashed" : "2.5px solid"} ${C.navy};
    display:flex;align-items:center;justify-content:center;position:relative;background:#fff">
    ${n ? `<div style="position:absolute;top:-10px;left:-10px;width:32px;height:32px;border-radius:50%;
      background:${C.blue};color:#fff;font-family:'IBM Plex Mono',monospace;font-weight:700;
      font-size:16px;display:flex;align-items:center;justify-content:center">${n}</div>` : ""}
    ${ICONS[key]}
  </div>
  <div style="font-family:Inter,sans-serif;font-weight:500;font-size:19px;color:${C.navy};margin-top:16px">${label}</div>
</div>`;

const arrow = (x1, x2, y) => `
<div style="position:absolute;left:${x1}px;top:${y - 1}px;width:${x2 - x1}px;height:2px;background:${C.blue}"></div>
<div style="position:absolute;left:${x2 - 7}px;top:${y - 6}px;width:0;height:0;
  border-top:6px solid transparent;border-bottom:6px solid transparent;border-left:9px solid ${C.blue}"></div>`;

const ROW_Y = 520;
const X = [162, 414, 666, 918]; // centros de los 4 nodos principales

const slide = shell(`
<div class="slide" style="background:#fff">
  <div style="position:absolute;left:72px;right:72px;top:88px">
    <div style="display:flex;justify-content:space-between;align-items:baseline">
      <div class="eyebrow" style="color:${C.slate};font-size:20px">C&oacute;mo fluye tu operaci&oacute;n</div>
      <div class="eyebrow" style="color:${C.slate};font-size:20px">Bodega para e-commerce</div>
    </div>
    <div style="height:2px;background:${C.navy};margin-top:26px"></div>
    <h1 style="color:${C.navy};font-size:52px;line-height:1.18;margin-top:44px">Del flujo ordenado<br>depende no caer en el caos</h1>
  </div>

  ${arrow(X[0] + 55, X[1] - 55, ROW_Y)}
  ${arrow(X[1] + 55, X[2] - 55, ROW_Y)}
  ${arrow(X[2] + 55, X[3] - 55, ROW_Y)}

  ${node(1, "recepcion", "Recepci&oacute;n", X[0], ROW_Y)}
  ${node(2, "picking", "Picking", X[1], ROW_Y)}
  ${node(3, "packing", "Packing", X[2], ROW_Y)}
  ${node(4, "despacho", "Despacho", X[3], ROW_Y)}

  <div style="position:absolute;left:${X[3] - 1}px;top:${ROW_Y + 65}px;width:2px;height:120px;
    background:repeating-linear-gradient(to bottom, ${C.slate} 0 6px, transparent 6px 12px)"></div>
  ${node(null, "devoluciones", "Devoluciones", X[3], ROW_Y + 250, true)}
  <div style="position:absolute;left:${X[3] - 140}px;top:${ROW_Y + 342}px;width:280px;text-align:center">
    <div style="font-family:Inter,sans-serif;font-weight:400;font-size:17px;color:${C.slate};line-height:1.4">
      Aparte, para no mezclarlo con lo que s&iacute; est&aacute; listo para vender
    </div>
  </div>

  ${brandRow(false, "3 / 6")}
</div>`);

(async () => {
  const browser = await chromium.launch({ executablePath: CHROME });
  const page = await browser.newPage({ viewport: { width: 1080, height: 1350 }, deviceScaleFactor: 1 });
  await page.setContent(slide, { waitUntil: "load" });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(300);
  const outDir = __dirname;
  const file = path.join(outDir, "flujo-mockup.png");
  await page.screenshot({ path: file });
  await browser.close();
  console.log("✓", file);
})();
