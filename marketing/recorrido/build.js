// Generador de carruseles "Recorrido" — Portal de Bodegas
// Renderiza 6 slides 1080x1350 (4:5) por proyecto.
const { chromium } = require("playwright");
const fs = require("fs");
const path = require("path");

// Chromium de Playwright. Si tu ruta es otra, expórtala en CHROME_PATH.
const CHROME =
  process.env.CHROME_PATH ||
  "/opt/pw-browsers/chromium-1194/chrome-linux/chrome";
const REPO = path.resolve(__dirname, "../..");
// fonts.css lo genera ./fuentes.sh (no se versiona: son ~460 KB de base64)
const FONTS = fs.readFileSync(path.join(__dirname, "fonts.css"), "utf8");

const C = {
  navy: "#011943",
  blue: "#0685de",
  blueLight: "#89c7f6",
  slate: "#6c7b92",
  border: "#e2e8f0",
  wa: "#25D366",
};

// Las fotos se incrustan como data URI: con setContent el documento es about:blank
// y Chromium bloquea la carga de file://
const photo = (proj, n) => {
  const f = path.join(REPO, "public/photos", proj, `foto-0${n}.webp`);
  return "data:image/webp;base64," + fs.readFileSync(f).toString("base64");
};

// ── Marca ─────────────────────────────────────────────────────────────────────
const logo = (dark) => `
<svg width="56" height="56" viewBox="0 0 100 100" style="flex:none">
  <circle cx="50" cy="50" r="48" fill="${dark ? "none" : C.navy}"
          stroke="${dark ? "#ffffff" : "none"}" stroke-width="4"/>
  <path d="M27 52 50 30 73 52 73 75 27 75Z" fill="none"
        stroke="${dark ? "#ffffff" : "#f3f4f5"}" stroke-width="5" stroke-linejoin="round"/>
  <rect x="42" y="58" width="16" height="17" fill="${C.blue}"/>
</svg>`;

const wordmark = (dark) => {
  const fg = dark ? "#ffffff" : C.navy;
  return `<span class="wm" style="color:${fg}">portal <span style="color:${C.blue}">de</span> bodegas</span>`;
};

const brandRow = (dark, counter) => `
<div class="brand">
  <div class="brand-l">${logo(dark)}${wordmark(dark)}</div>
  <div class="counter" style="color:${dark ? "rgba(255,255,255,.72)" : C.slate}">${counter}</div>
</div>`;

// ── Slides ────────────────────────────────────────────────────────────────────
const shell = (body, extra = "") => `<!doctype html><html lang="es"><head><meta charset="utf-8">
<style>
${FONTS}
*{margin:0;padding:0;box-sizing:border-box}
html,body{width:1080px;height:1350px}
body{font-family:Inter,sans-serif;-webkit-font-smoothing:antialiased}
.slide{position:relative;width:1080px;height:1350px;overflow:hidden;background:${C.navy}}
.bg{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
.scrim{position:absolute;inset:0;background:
  linear-gradient(to top, ${C.navy} 0%, ${C.navy}f2 18%, ${C.navy}b3 34%, ${C.navy}40 52%, ${C.navy}0d 68%, transparent 80%)}
.content{position:absolute;left:72px;right:72px;bottom:72px}
.eyebrow{font-family:'IBM Plex Mono',monospace;font-weight:500;font-size:21px;
  letter-spacing:.24em;text-transform:uppercase;color:${C.blueLight}}
.rule{width:78px;height:3px;background:${C.blue};margin:26px 0 34px}
h1{font-family:Fraunces,Georgia,serif;font-weight:600;color:#fff;line-height:1.02;
  letter-spacing:-.015em}
h2{font-family:Fraunces,Georgia,serif;font-weight:600;color:#fff;font-size:66px;
  line-height:1.12;letter-spacing:-.01em;margin-top:18px}
.sub{font-family:Inter,sans-serif;font-weight:300;font-size:31px;color:rgba(255,255,255,.88);
  line-height:1.45;margin-top:22px;max-width:820px}
.brand{position:absolute;left:72px;right:72px;bottom:72px;display:flex;align-items:center;
  justify-content:space-between}
.brand-l{display:flex;align-items:center;gap:20px}
.wm{font-family:'Plus Jakarta Sans',sans-serif;font-weight:800;font-size:34px;letter-spacing:-.01em}
.counter{font-family:'IBM Plex Mono',monospace;font-weight:500;font-size:22px;letter-spacing:.14em}
.badge{position:absolute;top:48px;right:48px;background:${C.navy}d9;color:#fff;
  font-family:'IBM Plex Mono',monospace;font-weight:500;font-size:21px;letter-spacing:.18em;
  padding:15px 26px}
${extra}
</style></head><body>${body}</body></html>`;

// 1 — Portada
const slideCover = (p) =>
  shell(`
<div class="slide">
  <img class="bg" src="${p.cover.src}" style="object-position:${p.cover.pos}">
  <div class="scrim"></div>
  <div class="badge">Desliza &rarr;</div>
  <div class="content" style="bottom:250px">
    <div class="eyebrow">Recorrido &middot; Proyecto N&ordm;${p.num}/05</div>
    <div class="rule"></div>
    <h1 style="font-size:${p.titleSize}px">${p.name}</h1>
    <div class="sub" style="font-weight:400;font-size:33px;color:rgba(255,255,255,.92)">${p.range} &middot; San Bernardo</div>
  </div>
  ${brandRow(true, "1 / 6")}
</div>`);

// 2-4 — Atributos sobre foto
const slideFeature = (p, f, i) =>
  shell(`
<div class="slide">
  <img class="bg" src="${f.src}" style="object-position:${f.pos}">
  <div class="scrim"></div>
  <div class="badge">${i} / 6</div>
  <div class="content">
    <div class="eyebrow" style="font-size:19px">${p.name}</div>
    <h2>${f.head}</h2>
    <div class="sub">${f.sub}</div>
  </div>
</div>`);

// 5 — Ficha
const slideFicha = (p) =>
  shell(`
<div class="slide" style="background:#fff">
  <div style="position:absolute;left:72px;right:72px;top:88px">
    <div style="display:flex;justify-content:space-between;align-items:baseline">
      <div class="eyebrow" style="color:${C.slate};font-size:20px">Ficha del proyecto</div>
      <div class="eyebrow" style="color:${C.slate};font-size:20px">N&ordm; ${p.num} / 05</div>
    </div>
    <div style="height:2px;background:${C.navy};margin-top:26px"></div>

    <h1 style="color:${C.navy};font-size:${p.fichaTitleSize}px;margin-top:62px">${p.name}</h1>

    <div style="display:flex;margin-top:56px">
      <div style="width:360px;flex:none">
        <div class="eyebrow" style="color:${C.slate};font-size:18px">Superficie</div>
        <div style="font-family:Fraunces,serif;font-weight:600;font-size:42px;color:${C.blue};margin-top:16px;white-space:nowrap">${p.range}</div>
      </div>
      <div>
        <div class="eyebrow" style="color:${C.slate};font-size:18px">Arriendo</div>
        <div style="font-family:Fraunces,serif;font-weight:600;font-size:42px;color:${C.navy};margin-top:16px;white-space:nowrap">${p.price}</div>
      </div>
    </div>

    <div style="height:1px;background:${C.border};margin-top:56px"></div>
    ${p.specs
      .map(
        (s) => `<div style="display:flex;gap:26px;align-items:flex-start;padding:29px 0;border-bottom:1px solid ${C.border}">
        <span style="color:${C.blue};font-size:31px;line-height:1.3;flex:none">&mdash;</span>
        <span style="font-family:Inter,sans-serif;font-weight:400;font-size:31px;color:${C.navy};line-height:1.3">${s}</span>
      </div>`
      )
      .join("")}
  </div>
  ${brandRow(false, "5 / 6")}
</div>`);

// 6 — Cierre / CTA
const slideCta = (p) =>
  shell(`
<div class="slide">
  <div style="position:absolute;inset:0;background:
    radial-gradient(120% 80% at 50% 0%, #0d2444 0%, ${C.navy} 62%)"></div>
  <div style="position:absolute;left:72px;right:72px;top:380px">
    <div class="eyebrow">Recorrido &middot; Proyecto N&ordm;${p.num}/05</div>
    <div class="rule"></div>
    <h1 style="font-size:80px">${p.ctaHead}</h1>
    <div class="sub" style="margin-top:34px">${p.ctaSub}</div>

    <div style="display:inline-flex;align-items:center;gap:22px;background:${C.wa};
                padding:28px 46px;margin-top:64px">
      <svg width="46" height="46" viewBox="0 0 24 24" fill="#fff" style="flex:none">
        <path d="M17.47 14.38c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.64.07-.3-.15-1.25-.46-2.38-1.47-.88-.78-1.47-1.75-1.65-2.05-.17-.3-.02-.46.13-.6.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.6-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.01-1.04 2.480 0 1.46 1.06 2.87 1.21 3.07.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.69.63.71.22 1.36.19 1.87.12.57-.09 1.75-.72 2-1.41.25-.69.25-1.28.17-1.41-.07-.13-.27-.2-.57-.35z"/>
        <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.46 1.32 4.96L2 22l5.25-1.38a9.87 9.87 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91C21.96 6.45 17.5 2 12.04 2zm0 18.15h-.01c-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.22 8.22 0 0 1-1.26-4.38c0-4.54 3.7-8.23 8.25-8.23 2.2 0 4.27.86 5.83 2.42a8.19 8.19 0 0 1 2.41 5.82c0 4.54-3.7 8.23-8.23 8.23z"/>
      </svg>
      <span style="font-family:'Plus Jakarta Sans',sans-serif;font-weight:800;font-size:40px;color:#fff;letter-spacing:-.01em">+56 9 9225 9272</span>
    </div>

    <div style="font-family:'IBM Plex Mono',monospace;font-weight:500;font-size:24px;
                letter-spacing:.14em;color:${C.blueLight};margin-top:44px">
      www.portaldebodegas.cl
    </div>
  </div>
  ${brandRow(true, "6 / 6")}
</div>`);

// ── Proyecto: Bosque Catemito ────────────────────────────────────────────────
const BOSQUE = {
  id: "bosque-catemito",
  num: "02",
  name: "Bosque Catemito",
  range: "360 &ndash; 14.000 m&sup2;",
  price: "desde 0,13 UF/m&sup2; al mes",
  titleSize: 86,
  fichaTitleSize: 82,
  cover: { src: photo("bosque-catemito", 4), pos: "56% 42%" },
  features: [
    {
      src: photo("bosque-catemito", 1),
      pos: "50% 50%",
      head: "Portones amplios,<br>patio de maniobras",
      sub: "Los camiones entran, giran y cargan a nivel de piso.",
    },
    {
      src: photo("bosque-catemito", 5),
      pos: "50% 50%",
      head: "Planta libre sobre<br>radier industrial",
      sub: "M&oacute;dulos desde 360&nbsp;m&sup2; combinables hasta 14.000&nbsp;m&sup2;.",
    },
    {
      src: photo("bosque-catemito", 3),
      pos: "50% 46%",
      head: "Terreno para acopio<br>al aire libre",
      sub: "Desde 2.000 hasta 40.000&nbsp;m&sup2;, dentro del mismo recinto cerrado.",
    },
  ],
  specs: [
    "M&oacute;dulos desde 360 m&sup2; combinables hasta 14.000 m&sup2;",
    "Terreno para construir hasta 30.000 m&sup2; a medida",
    "Acopio al aire libre: 2.000 &ndash; 40.000 m&sup2; desde 0,02 UF/m&sup2;",
    "Radier industrial y energ&iacute;a trif&aacute;sica",
    "Seguridad 24/7, CCTV y control de acceso",
  ],
  ctaHead: "&iquest;Te sirve<br>Bosque Catemito?",
  ctaSub: "Cotiza directo con el propietario.<br>Sin corredora y sin comisi&oacute;n.",
};

// ── Render ────────────────────────────────────────────────────────────────────
(async () => {
  const proj = BOSQUE;
  const outDir = path.join(__dirname, "salida", proj.id);
  fs.mkdirSync(outDir, { recursive: true });

  const pages = [
    slideCover(proj),
    ...proj.features.map((f, i) => slideFeature(proj, f, i + 2)),
    slideFicha(proj),
    slideCta(proj),
  ];

  const browser = await chromium.launch({ executablePath: CHROME });
  const page = await browser.newPage({
    viewport: { width: 1080, height: 1350 },
    deviceScaleFactor: 1,
  });

  for (let i = 0; i < pages.length; i++) {
    await page.setContent(pages[i], { waitUntil: "load" });
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(400);
    const file = path.join(outDir, `slide-${String(i + 1).padStart(2, "0")}.png`);
    await page.screenshot({ path: file });
    console.log("✓", path.basename(file));
  }
  await browser.close();
})();
