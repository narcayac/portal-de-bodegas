// Generador de carruseles "Recorrido" — Portal de Bodegas
// Renderiza 6 slides 1080x1350 (4:5) por proyecto.
const { chromium } = require("playwright");
const fs = require("fs");
const path = require("path");
const { C, photo, shell, brandRow, whatsappButton } = require("../shared/brand.js");

// Chromium de Playwright. Si tu ruta es otra, expórtala en CHROME_PATH.
const CHROME =
  process.env.CHROME_PATH ||
  "/opt/pw-browsers/chromium-1194/chrome-linux/chrome";

// ── Slides ────────────────────────────────────────────────────────────────────
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
    ${whatsappButton("+56 9 9225 9272")}
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

// ── Proyecto: Acacias Seis ───────────────────────────────────────────────────
const ACACIAS_SEIS = {
  id: "acacias-seis",
  num: "04",
  name: "Acacias Seis",
  range: "1.551 m&sup2;",
  price: "desde 0,13 UF/m&sup2; al mes",
  titleSize: 86,
  fichaTitleSize: 82,
  cover: { src: photo("acacias-seis", 1), pos: "50% 42%" },
  features: [
    {
      src: photo("acacias-seis", 4),
      pos: "50% 44%",
      head: "Acceso directo<br>para camiones",
      sub: "Patio amplio para maniobrar y cargar sin restricciones.",
    },
    {
      src: photo("acacias-seis", 2),
      pos: "50% 50%",
      head: "Una sola nave,<br>planta libre",
      sub: "1.551&nbsp;m&sup2; contiguos, sin columnas que interrumpan tu operaci&oacute;n.",
    },
    {
      src: photo("acacias-seis", 3),
      pos: "50% 44%",
      head: "Radier industrial<br>y energ&iacute;a trif&aacute;sica",
      sub: "Lista para operar: distribuci&oacute;n, almacenaje o manufactura liviana.",
    },
  ],
  specs: [
    "Nave &uacute;nica y contigua de 1.551 m&sup2;",
    "Planta libre sin columnas intermedias",
    "Radier industrial y energ&iacute;a trif&aacute;sica",
    "Acceso directo para camiones y patio de maniobras",
    "Seguridad 24/7, cerco el&eacute;ctrico y control de acceso",
  ],
  ctaHead: "&iquest;Te sirve<br>Acacias Seis?",
  ctaSub: "Cotiza directo con el propietario.<br>Sin corredora y sin comisi&oacute;n.",
};

// ── Render ────────────────────────────────────────────────────────────────────
// Por defecto renderiza todos los proyectos definidos abajo.
// Para uno solo: node build.js acacias-seis
const ALL_PROJECTS = [BOSQUE, ACACIAS_SEIS];

(async () => {
  const filter = process.argv[2];
  const targets = filter
    ? ALL_PROJECTS.filter((p) => p.id === filter)
    : ALL_PROJECTS;

  if (filter && targets.length === 0) {
    console.error(`Proyecto desconocido: "${filter}". Disponibles: ${ALL_PROJECTS.map((p) => p.id).join(", ")}`);
    process.exit(1);
  }

  const browser = await chromium.launch({ executablePath: CHROME });
  const page = await browser.newPage({
    viewport: { width: 1080, height: 1350 },
    deviceScaleFactor: 1,
  });

  for (const proj of targets) {
    const outDir = path.join(__dirname, "salida", proj.id);
    fs.mkdirSync(outDir, { recursive: true });

    const pages = [
      slideCover(proj),
      ...proj.features.map((f, i) => slideFeature(proj, f, i + 2)),
      slideFicha(proj),
      slideCta(proj),
    ];

    console.log(`\n${proj.name} (${proj.id})`);
    for (let i = 0; i < pages.length; i++) {
      await page.setContent(pages[i], { waitUntil: "load" });
      await page.evaluate(() => document.fonts.ready);
      await page.waitForTimeout(400);
      const file = path.join(outDir, `slide-${String(i + 1).padStart(2, "0")}.png`);
      await page.screenshot({ path: file });
      console.log("✓", path.basename(file));
    }
  }
  await browser.close();
})();
