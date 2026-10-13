// 3 portadas con lenguaje editorial contemporáneo: tipografía a sangre,
// bloques de color que cubren el cuadro y capas superpuestas — en vez de
// diagramas planos centrados sobre blanco (que se leían como manual
// técnico). Sin isometría ni emojis, respetando la regla de marca.
const { chromium } = require("playwright");
const path = require("path");
const { C, shell, brandRow, photo } = require("../shared/brand.js");

const CHROME =
  process.env.CHROME_PATH ||
  "/opt/pw-browsers/chromium-1194/chrome-linux/chrome";

const navy = C.navy;

const badgeDark = () => `
<div style="position:absolute;top:48px;right:48px;border:2px solid rgba(255,255,255,.5);color:#fff;
  font-family:'IBM Plex Mono',monospace;font-weight:500;font-size:19px;letter-spacing:.18em;
  padding:13px 24px;z-index:5">Desliza &rarr;</div>`;

// ── A — Tipografía gigante a sangre sobre navy ────────────────────────
// La palabra clave sale del cuadro por ambos lados: el recorte es el
// gesto de diseño, no un error.
const coverA = () => shell(`
<div class="slide">
  <div style="position:absolute;inset:0;background:
    radial-gradient(130% 90% at 20% 10%, #0d2444 0%, ${navy} 60%)"></div>
  ${badgeDark()}

  <div style="position:absolute;left:72px;top:330px">
    <div class="eyebrow" style="font-size:22px">Gu&iacute;a &middot; Bodega para</div>
  </div>

  <div style="position:absolute;left:-60px;top:380px;white-space:nowrap">
    <span style="font-family:Fraunces,Georgia,serif;font-weight:600;font-size:250px;
      line-height:1;color:#fff;letter-spacing:-.04em">e-commerce</span>
  </div>

  <div style="position:absolute;left:76px;top:700px;width:92px;height:4px;background:${C.blue}"></div>

  <div style="position:absolute;left:72px;right:140px;top:780px">
    <div style="font-family:Inter,sans-serif;font-weight:300;font-size:40px;line-height:1.35;
      color:rgba(255,255,255,.92)">
      No es guardar cosas.<br>Es despachar, pedido por pedido,<br>todos los d&iacute;as.
    </div>
  </div>

  ${brandRow(true, "1 / 6")}
</div>`);

// ── B — Banda de foto a sangre + bloque navy superpuesto ──────────────
// La foto no es fondo con scrim: es una banda recortada, y el bloque de
// texto se le monta encima. Composición por capas, no por zonas.
const coverB = () => shell(`
<div class="slide" style="background:#fff">
  <img src="${photo("acacias-seis", 3)}"
    style="position:absolute;left:0;top:0;width:1080px;height:660px;object-fit:cover;object-position:50% 55%">

  <div style="position:absolute;top:48px;right:48px;border:2px solid rgba(255,255,255,.6);color:#fff;
    font-family:'IBM Plex Mono',monospace;font-weight:500;font-size:19px;letter-spacing:.18em;
    padding:13px 24px;z-index:5">Desliza &rarr;</div>

  <div style="position:absolute;left:0;top:470px;width:800px;background:${navy};padding:54px 72px 58px">
    <div class="eyebrow" style="font-size:21px">Gu&iacute;a</div>
    <div style="width:92px;height:4px;background:${C.blue};margin:24px 0 30px"></div>
    <h1 style="color:#fff;font-size:82px;line-height:1.02;letter-spacing:-.02em">Bodega para<br>e-commerce</h1>
  </div>

  <div style="position:absolute;left:72px;right:72px;top:960px">
    <div style="font-family:Inter,sans-serif;font-weight:400;font-size:34px;color:${C.slate};line-height:1.4">
      Picking, despacho y &uacute;ltima milla<br>en San Bernardo
    </div>
  </div>

  ${brandRow(false, "1 / 6")}
</div>`);

// ── C — Tipografía partida por el borde del color ─────────────────────
// El mismo titular se dibuja dos veces y cada mitad se recorta a su
// campo de color, así la línea cruza la frontera navy/blanco.
const SPLIT = 700;
const TITLE_T = 560;
const titleStyle = (color) => `
  font-family:Fraunces,Georgia,serif;font-weight:600;font-size:104px;line-height:1.0;
  letter-spacing:-.025em;color:${color}`;

const coverC = () => shell(`
<div class="slide" style="background:#fff">
  <div style="position:absolute;left:0;right:0;top:0;height:${SPLIT}px;background:
    radial-gradient(120% 110% at 75% 0%, #0d2444 0%, ${navy} 65%)"></div>
  ${badgeDark()}

  <div style="position:absolute;left:72px;top:300px">
    <div class="eyebrow" style="font-size:22px">Gu&iacute;a</div>
    <div style="width:92px;height:4px;background:${C.blue};margin-top:24px"></div>
  </div>

  <div style="position:absolute;left:0;right:0;top:0;height:${SPLIT}px;overflow:hidden">
    <div style="position:absolute;left:72px;top:${TITLE_T}px;${titleStyle("#fff")}">Bodega para<br>e-commerce</div>
  </div>
  <div style="position:absolute;left:0;right:0;top:${SPLIT}px;bottom:0;overflow:hidden">
    <div style="position:absolute;left:72px;top:${TITLE_T - SPLIT}px;${titleStyle(navy)}">Bodega para<br>e-commerce</div>
  </div>

  <div style="position:absolute;left:72px;right:72px;top:860px">
    <div style="font-family:Inter,sans-serif;font-weight:400;font-size:34px;color:${C.slate};line-height:1.4">
      Picking, despacho y &uacute;ltima milla en San Bernardo
    </div>
  </div>

  ${brandRow(false, "1 / 6")}
</div>`);

(async () => {
  const browser = await chromium.launch({ executablePath: CHROME });
  const page = await browser.newPage({ viewport: { width: 1080, height: 1350 }, deviceScaleFactor: 1 });
  const variants = [["cover-ed-a", coverA], ["cover-ed-b", coverB], ["cover-ed-c", coverC]];
  for (const [name, fn] of variants) {
    await page.setContent(fn(), { waitUntil: "load" });
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(300);
    const file = path.join(__dirname, `${name}.png`);
    await page.screenshot({ path: file });
    console.log("✓", path.basename(file));
  }
  await browser.close();
})();
