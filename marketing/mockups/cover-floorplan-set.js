// 3 variantes de portada en la línea "plano de planta" (ya validada frente
// a los íconos de app, que se sintieron genéricos). Todas en vista
// cenital/plana — nada isométrico, por la regla de marca que prohíbe esa
// estética. Solo para feedback, no toca marketing/guias/build.js.
const { chromium } = require("playwright");
const path = require("path");
const { C, shell, brandRow } = require("../shared/brand.js");

const CHROME =
  process.env.CHROME_PATH ||
  "/opt/pw-browsers/chromium-1194/chrome-linux/chrome";

const navy = C.navy;

const badge = () => `
<div style="position:absolute;top:48px;right:48px;border:2px solid ${navy};color:${navy};
  font-family:'IBM Plex Mono',monospace;font-weight:500;font-size:19px;letter-spacing:.18em;
  padding:13px 24px">Desliza &rarr;</div>`;

const titleBlock = () => `
<div style="position:absolute;left:72px;right:72px;top:800px">
  <div class="eyebrow" style="color:${C.slate};font-size:21px">Gu&iacute;a</div>
  <div class="rule" style="background:${C.blue}"></div>
  <h1 style="color:${navy};font-size:72px;line-height:1.06">Bodega para e-commerce</h1>
  <div style="font-family:Inter,sans-serif;font-weight:400;font-size:33px;color:${C.slate};margin-top:22px">
    Picking, despacho y &uacute;ltima milla en San Bernardo
  </div>
</div>`;

// ── 1 — Bandas horizontales con flujo (la versión ya mostrada, sin el
// corte de portón que se veía como ruido) ──────────────────────────────
const RECT_L = 190, RECT_T = 400, RECT_W = 700, RECT_H = 340;
const BAND_W = RECT_W / 3;

const cover1 = () => shell(`
<div class="slide" style="background:#fff">
  ${badge()}
  <div style="position:absolute;left:${RECT_L - 64}px;top:${RECT_T + RECT_H / 2 - 1.5}px;width:48px;height:3px;background:${C.slate}"></div>
  <div style="position:absolute;left:${RECT_L - 22}px;top:${RECT_T + RECT_H / 2 - 7}px;width:0;height:0;
    border-top:7px solid transparent;border-bottom:7px solid transparent;border-left:11px solid ${C.slate}"></div>

  <div style="position:absolute;left:${RECT_L}px;top:${RECT_T}px;width:${RECT_W}px;height:${RECT_H}px;
    border:3px solid ${navy};border-radius:6px;overflow:hidden">
    <div style="position:absolute;left:0;top:0;width:${BAND_W}px;height:${RECT_H}px;background:#fff"></div>
    <div style="position:absolute;left:${BAND_W}px;top:0;width:${BAND_W}px;height:${RECT_H}px;background:rgba(6,133,222,.07)"></div>
    <div style="position:absolute;left:${BAND_W * 2}px;top:0;width:${BAND_W}px;height:${RECT_H}px;background:${navy}"></div>
    <div style="position:absolute;left:${BAND_W - 1.5}px;top:0;width:3px;height:${RECT_H}px;background:${navy}"></div>
    <div style="position:absolute;left:${BAND_W * 2 - 1.5}px;top:0;width:3px;height:${RECT_H}px;background:${navy}"></div>
  </div>

  <div style="position:absolute;left:${RECT_L + RECT_W + 4}px;top:${RECT_T + RECT_H / 2 - 2}px;width:56px;height:4px;background:${C.blue}"></div>
  <div style="position:absolute;left:${RECT_L + RECT_W + 50}px;top:${RECT_T + RECT_H / 2 - 9}px;width:0;height:0;
    border-top:9px solid transparent;border-bottom:9px solid transparent;border-left:14px solid ${C.blue}"></div>

  ${titleBlock()}
  ${brandRow(false, "1 / 6")}
</div>`);

// ── 2 — Planta de 4 salas (grilla arquitectónica, como un plano real) ──
const G_L = 240, G_T = 330, G_W = 600, G_H = 370;
const G_HALF_W = G_W / 2, G_HALF_H = G_H / 2;

const room = (x, y, w, h, fill) => `
<div style="position:absolute;left:${x}px;top:${y}px;width:${w}px;height:${h}px;background:${fill}"></div>`;

const cover2 = () => shell(`
<div class="slide" style="background:#fff">
  ${badge()}
  <div style="position:absolute;left:${G_L}px;top:${G_T}px;width:${G_W}px;height:${G_H}px;
    border:3px solid ${navy};border-radius:4px;overflow:hidden">
    ${room(0, 0, G_HALF_W, G_HALF_H, "#fff")}
    ${room(G_HALF_W, 0, G_HALF_W, G_HALF_H, "rgba(6,133,222,.08)")}
    ${room(0, G_HALF_H, G_HALF_W, G_HALF_H, "rgba(6,133,222,.15)")}
    ${room(G_HALF_W, G_HALF_H, G_HALF_W, G_HALF_H, navy)}
    <div style="position:absolute;left:${G_HALF_W - 1.5}px;top:0;width:3px;height:${G_H}px;background:${navy}"></div>
    <div style="position:absolute;left:0;top:${G_HALF_H - 1.5}px;width:${G_W}px;height:3px;background:${navy}"></div>
  </div>
  <div style="position:absolute;left:${G_L + G_W - 4}px;top:${G_T + G_H - G_HALF_H / 2 - 2}px;width:56px;height:4px;background:${C.blue}"></div>
  <div style="position:absolute;left:${G_L + G_W + 42}px;top:${G_T + G_H - G_HALF_H / 2 - 9}px;width:0;height:0;
    border-top:9px solid transparent;border-bottom:9px solid transparent;border-left:14px solid ${C.blue}"></div>

  ${titleBlock()}
  ${brandRow(false, "1 / 6")}
</div>`);

// ── 3 — Site plan: edificio con andenes + camión + calle (vista de loteo)
const B_L = 280, B_T = 300, B_W = 520, B_H = 230;
const YARD_H = 110;
const YARD_T = B_T + B_H;
const ROAD_T = YARD_T + YARD_H, ROAD_H = 70;

// portones de andén en el borde inferior del edificio
const docks = [0, 1, 2, 3, 4]
  .map((i) => {
    const w = 54, gap = 40;
    const total = 5 * w + 4 * gap;
    const x = B_L + (B_W - total) / 2 + i * (w + gap);
    return `<div style="position:absolute;left:${x}px;top:${B_T + B_H - 12}px;width:${w}px;height:12px;background:#fff"></div>`;
  })
  .join("");

const cover3 = () => shell(`
<div class="slide" style="background:#fff">
  ${badge()}
  <!-- edificio -->
  <div style="position:absolute;left:${B_L}px;top:${B_T}px;width:${B_W}px;height:${B_H}px;
    background:${navy};border-radius:4px"></div>
  ${docks}
  <!-- patio de maniobra -->
  <div style="position:absolute;left:${B_L - 30}px;top:${YARD_T}px;width:${B_W + 60}px;height:${YARD_H}px;
    background:rgba(6,133,222,.07)"></div>
  <!-- camión plano en un andén -->
  <div style="position:absolute;left:${B_L + B_W / 2 - 32}px;top:${YARD_T + 14}px;width:64px;height:62px;
    background:#fff;border:3px solid ${navy};border-radius:3px"></div>
  <div style="position:absolute;left:${B_L + B_W / 2 - 32}px;top:${YARD_T + 56}px;width:64px;height:3px;background:${navy}"></div>
  <!-- calle -->
  <div style="position:absolute;left:0;right:0;top:${ROAD_T}px;height:${ROAD_H}px;background:rgba(108,123,146,.12)"></div>
  <div style="position:absolute;left:0;right:0;top:${ROAD_T + ROAD_H / 2 - 2}px;height:4px;
    background:repeating-linear-gradient(to right, ${C.slate} 0 26px, transparent 26px 50px)"></div>
  <div style="position:absolute;left:${B_L + B_W / 2 - 1.5}px;top:${YARD_T + 80}px;width:3px;height:${ROAD_T - YARD_T - 80}px;
    background:${C.blue}"></div>
  <div style="position:absolute;left:${B_L + B_W / 2 - 8}px;top:${ROAD_T - 6}px;width:0;height:0;
    border-left:8px solid transparent;border-right:8px solid transparent;border-top:12px solid ${C.blue}"></div>

  ${titleBlock()}
  ${brandRow(false, "1 / 6")}
</div>`);

(async () => {
  const browser = await chromium.launch({ executablePath: CHROME });
  const page = await browser.newPage({ viewport: { width: 1080, height: 1350 }, deviceScaleFactor: 1 });
  const variants = [["cover-1", cover1], ["cover-2", cover2], ["cover-3", cover3]];
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
