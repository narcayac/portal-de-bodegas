// Portada alternativa: plano de planta con el flujo atravesándolo, en vez
// de un ícono de caja (que se leía genérico, como cualquier app de
// logística). Un floor plan es lenguaje visual de real estate — más
// propio de la marca que un ícono de paquete.
const { chromium } = require("playwright");
const path = require("path");
const { C, shell, brandRow } = require("../shared/brand.js");

const CHROME =
  process.env.CHROME_PATH ||
  "/opt/pw-browsers/chromium-1194/chrome-linux/chrome";

const navy = C.navy;

const RECT_L = 190, RECT_T = 400, RECT_W = 700, RECT_H = 340;
const BAND_W = RECT_W / 3;

const slide = shell(`
<div class="slide" style="background:#fff">
  <div style="position:absolute;top:48px;right:48px;border:2px solid ${navy};color:${navy};
    font-family:'IBM Plex Mono',monospace;font-weight:500;font-size:19px;letter-spacing:.18em;
    padding:13px 24px">Desliza &rarr;</div>

  <!-- flecha de entrada: mercadería llegando -->
  <div style="position:absolute;left:${RECT_L - 64}px;top:${RECT_T + RECT_H / 2 - 1.5}px;width:48px;height:3px;background:${C.slate}"></div>
  <div style="position:absolute;left:${RECT_L - 22}px;top:${RECT_T + RECT_H / 2 - 7}px;width:0;height:0;
    border-top:7px solid transparent;border-bottom:7px solid transparent;border-left:11px solid ${C.slate}"></div>

  <!-- el edificio: 3 bandas (entrada / operación / despacho) -->
  <div style="position:absolute;left:${RECT_L}px;top:${RECT_T}px;width:${RECT_W}px;height:${RECT_H}px;
    border:3px solid ${navy};border-radius:6px;overflow:hidden">
    <div style="position:absolute;left:0;top:0;width:${BAND_W}px;height:${RECT_H}px;background:#fff"></div>
    <div style="position:absolute;left:${BAND_W}px;top:0;width:${BAND_W}px;height:${RECT_H}px;background:rgba(6,133,222,.07)"></div>
    <div style="position:absolute;left:${BAND_W * 2}px;top:0;width:${BAND_W}px;height:${RECT_H}px;background:${navy}"></div>
    <div style="position:absolute;left:${BAND_W - 1.5}px;top:0;width:3px;height:${RECT_H}px;background:${navy}"></div>
    <div style="position:absolute;left:${BAND_W * 2 - 1.5}px;top:0;width:3px;height:${RECT_H}px;background:${navy}"></div>
  </div>

  <!-- flecha de salida: despacho hacia la calle -->
  <div style="position:absolute;left:${RECT_L + RECT_W + 4}px;top:${RECT_T + RECT_H / 2 - 2}px;width:56px;height:4px;background:${C.blue}"></div>
  <div style="position:absolute;left:${RECT_L + RECT_W + 50}px;top:${RECT_T + RECT_H / 2 - 9}px;width:0;height:0;
    border-top:9px solid transparent;border-bottom:9px solid transparent;border-left:14px solid ${C.blue}"></div>

  <div style="position:absolute;left:72px;right:72px;top:800px">
    <div class="eyebrow" style="color:${C.slate};font-size:21px">Gu&iacute;a</div>
    <div class="rule" style="background:${C.blue}"></div>
    <h1 style="color:${navy};font-size:72px;line-height:1.06">Bodega para e-commerce</h1>
    <div style="font-family:Inter,sans-serif;font-weight:400;font-size:33px;color:${C.slate};margin-top:22px">
      Picking, despacho y &uacute;ltima milla en San Bernardo
    </div>
  </div>
  ${brandRow(false, "1 / 6")}
</div>`);

(async () => {
  const browser = await chromium.launch({ executablePath: CHROME });
  const page = await browser.newPage({ viewport: { width: 1080, height: 1350 }, deviceScaleFactor: 1 });
  await page.setContent(slide, { waitUntil: "load" });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(250);
  const file = path.join(__dirname, "cover-floorplan.png");
  await page.screenshot({ path: file });
  console.log("✓", file);
  await browser.close();
})();
