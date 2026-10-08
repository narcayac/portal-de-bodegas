// 3 opciones de portada para "Bodega para e-commerce", dentro de la
// dirección ya aprobada (círculos de color sólido, sin fotos). Solo
// para feedback — no toca marketing/guias/build.js.
const { chromium } = require("playwright");
const path = require("path");
const { C, shell, brandRow } = require("../shared/brand.js");

const CHROME =
  process.env.CHROME_PATH ||
  "/opt/pw-browsers/chromium-1194/chrome-linux/chrome";

const navy = C.navy;
const W = "#fff";
const icon = (d, size = 58) => `
<svg width="${size}" height="${size}" viewBox="0 0 48 48" fill="none" style="flex:none">${d}</svg>`;

const circle = (size, fill, content, badge) => `
<div style="width:${size}px;height:${size}px;border-radius:50%;background:${fill};
  display:flex;align-items:center;justify-content:center;position:relative;flex:none;
  box-shadow:0 14px 28px rgba(1,25,67,.22)">
  ${badge || ""}
  ${content}
</div>`;

const BOX = icon(`
  <rect x="8" y="16" width="32" height="24" rx="2" stroke="${W}" stroke-width="2"/>
  <line x1="8" y1="28" x2="40" y2="28" stroke="${W}" stroke-width="2"/>
  <line x1="24" y1="16" x2="24" y2="40" stroke="${W}" stroke-width="2"/>`, 150);

const RECEPCION = icon(`
  <path d="M10 22 H38 V40 H10 Z" stroke="${W}" stroke-width="2.5" stroke-linejoin="round"/>
  <path d="M24 6 V22" stroke="${W}" stroke-width="2.5"/>
  <path d="M16 15 L24 23 L32 15" stroke="${W}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>`, 32);
const PICKING = icon(`
  <rect x="8" y="8" width="32" height="32" rx="2" stroke="${W}" stroke-width="2.5"/>
  <line x1="8" y1="20" x2="40" y2="20" stroke="${W}" stroke-width="2.5"/>
  <line x1="8" y1="32" x2="40" y2="32" stroke="${W}" stroke-width="2.5"/>`, 32);
const PACKING = icon(`
  <rect x="8" y="16" width="32" height="24" rx="2" stroke="${W}" stroke-width="2.5"/>
  <line x1="8" y1="28" x2="40" y2="28" stroke="${W}" stroke-width="2.5"/>
  <line x1="24" y1="16" x2="24" y2="40" stroke="${W}" stroke-width="2.5"/>`, 32);
const DESPACHO = icon(`
  <rect x="6" y="18" width="22" height="18" rx="2" stroke="${W}" stroke-width="2.5"/>
  <path d="M30 27 H42" stroke="${W}" stroke-width="2.5"/>
  <path d="M36 21 L42 27 L36 33" stroke="${W}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>`, 32);
const PIN = icon(`
  <path d="M24 6 C16 6 10 12 10 20 C10 30 24 42 24 42 C24 42 38 30 38 20 C38 12 32 6 24 6 Z" stroke="${W}" stroke-width="2.5" stroke-linejoin="round"/>
  <circle cx="24" cy="20" r="5" stroke="${W}" stroke-width="2.5"/>`, 30);

const titleBlock = () => `
<div style="position:absolute;left:72px;right:72px;top:800px">
  <div class="eyebrow" style="color:${C.slate};font-size:21px">Gu&iacute;a</div>
  <div class="rule" style="background:${C.blue}"></div>
  <h1 style="color:${navy};font-size:72px;line-height:1.06">Bodega para e-commerce</h1>
  <div style="font-family:Inter,sans-serif;font-weight:400;font-size:33px;color:${C.slate};margin-top:22px">
    Picking, despacho y &uacute;ltima milla en San Bernardo
  </div>
</div>`;

const slideBadge = () => `
<div style="position:absolute;top:48px;right:48px;border:2px solid ${navy};color:${navy};
  font-family:'IBM Plex Mono',monospace;font-weight:500;font-size:19px;letter-spacing:.18em;
  padding:13px 24px">Desliza &rarr;</div>`;

// A — Caja grande, centrada (versión refinada: sin líneas de velocidad,
// composición más simple y confiada)
const coverA = () => shell(`
<div class="slide" style="background:#fff">
  ${slideBadge()}
  <div style="position:absolute;left:390px;top:270px">
    ${circle(300, navy, BOX)}
  </div>
  ${titleBlock()}
  ${brandRow(false, "1 / 6")}
</div>`);

// B — Tira de 4 iconos (recepción→picking→packing→despacho) como
// preview del flujo que viene en la slide 3, conectados por flechas
const stripIcon = (fill, content, x) => `
<div style="position:absolute;left:${x - 44}px;top:280px">
  ${circle(88, fill, content)}
</div>`;
const stripArrow = (x1, x2) => `
<div style="position:absolute;left:${x1}px;top:${280 + 44 - 1.5}px;width:${x2 - x1}px;height:3px;background:${C.blue}"></div>
<div style="position:absolute;left:${x2 - 8}px;top:${280 + 44 - 7}px;width:0;height:0;
  border-top:7px solid transparent;border-bottom:7px solid transparent;border-left:11px solid ${C.blue}"></div>`;

const STRIP_X = [196, 416, 636, 856];
const coverB = () => shell(`
<div class="slide" style="background:#fff">
  ${slideBadge()}
  ${stripArrow(STRIP_X[0] + 44, STRIP_X[1] - 44)}
  ${stripArrow(STRIP_X[1] + 44, STRIP_X[2] - 44)}
  ${stripArrow(STRIP_X[2] + 44, STRIP_X[3] - 44)}
  ${stripIcon(navy, RECEPCION, STRIP_X[0])}
  ${stripIcon(navy, PICKING, STRIP_X[1])}
  ${stripIcon(navy, PACKING, STRIP_X[2])}
  ${stripIcon(C.blue, DESPACHO, STRIP_X[3])}
  <div style="position:absolute;left:72px;right:72px;top:420px">
    <div style="font-family:Inter,sans-serif;font-weight:500;font-size:18px;color:${C.slate};
      letter-spacing:.08em;text-transform:uppercase">De la recepci&oacute;n a tu cliente</div>
  </div>
  ${titleBlock()}
  ${brandRow(false, "1 / 6")}
</div>`);

// C — Caja grande + badge de ubicación superpuesto (composición de dos
// círculos, como un ícono de app con "badge")
const coverC = () => shell(`
<div class="slide" style="background:#fff">
  ${slideBadge()}
  <div style="position:absolute;left:390px;top:270px">
    ${circle(300, navy, BOX)}
  </div>
  <div style="position:absolute;left:610px;top:460px">
    ${circle(104, C.blue, PIN)}
  </div>
  ${titleBlock()}
  ${brandRow(false, "1 / 6")}
</div>`);

(async () => {
  const browser = await chromium.launch({ executablePath: CHROME });
  const page = await browser.newPage({ viewport: { width: 1080, height: 1350 }, deviceScaleFactor: 1 });
  const variants = [["cover-a", coverA], ["cover-b", coverB], ["cover-c", coverC]];
  for (const [name, fn] of variants) {
    await page.setContent(fn(), { waitUntil: "load" });
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(250);
    const file = path.join(__dirname, `${name}.png`);
    await page.screenshot({ path: file });
    console.log("✓", path.basename(file));
  }
  await browser.close();
})();
