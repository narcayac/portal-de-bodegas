// Generador de carruseles "Guía" — Portal de Bodegas
// Contenido explicativo (basado en lib/guias.js), no recorrido de un proyecto.
// Renderiza 6 slides 1080x1350 (4:5) por guía.
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
const slideCover = (g) =>
  shell(`
<div class="slide">
  <img class="bg" src="${g.cover.src}" style="object-position:${g.cover.pos}">
  <div class="scrim"></div>
  <div class="badge">Desliza &rarr;</div>
  <div class="content" style="bottom:250px">
    <div class="eyebrow">Gu&iacute;a</div>
    <div class="rule"></div>
    <h1 style="font-size:${g.titleSize}px">${g.name}</h1>
    <div class="sub" style="font-weight:400;font-size:33px;color:rgba(255,255,255,.92)">${g.tagline}</div>
  </div>
  ${brandRow(true, "1 / 6")}
</div>`);

// 2, 5 — Concepto sobre foto (definición / capacidad)
const slideConcept = (g, c, i) =>
  shell(`
<div class="slide">
  <img class="bg" src="${c.src}" style="object-position:${c.pos}">
  <div class="scrim"></div>
  <div class="badge">${i} / 6</div>
  <div class="content">
    <div class="eyebrow" style="font-size:19px">${c.label}</div>
    <h2>${c.head}</h2>
    <div class="sub">${c.sub}</div>
  </div>
</div>`);

// 3 — Lista (fondo blanco), p.ej. "cuándo conviene"
const slideList = (g, l, i) =>
  shell(`
<div class="slide" style="background:#fff">
  <div style="position:absolute;left:72px;right:72px;top:88px">
    <div style="display:flex;justify-content:space-between;align-items:baseline">
      <div class="eyebrow" style="color:${C.slate};font-size:20px">${l.kicker}</div>
      <div class="eyebrow" style="color:${C.slate};font-size:20px">${g.name}</div>
    </div>
    <div style="height:2px;background:${C.navy};margin-top:26px"></div>

    <h1 style="color:${C.navy};font-size:56px;line-height:1.18;margin-top:52px">${l.heading}</h1>

    <div style="height:1px;background:${C.border};margin-top:48px"></div>
    ${l.items
      .map(
        (s) => `<div style="display:flex;gap:26px;align-items:flex-start;padding:27px 0;border-bottom:1px solid ${C.border}">
        <span style="color:${C.blue};font-size:28px;line-height:1.3;flex:none">&mdash;</span>
        <span style="font-family:Inter,sans-serif;font-weight:400;font-size:28px;color:${C.navy};line-height:1.35">${s}</span>
      </div>`
      )
      .join("")}
  </div>
  ${brandRow(false, `${i} / 6`)}
</div>`);

// 4 — Pasos numerados (fondo navy)
const slideSteps = (g, s, i) =>
  shell(`
<div class="slide">
  <div style="position:absolute;inset:0;background:
    radial-gradient(120% 80% at 50% 0%, #0d2444 0%, ${C.navy} 62%)"></div>
  <div style="position:absolute;left:72px;right:72px;top:120px">
    <div class="eyebrow">${s.kicker}</div>
    <div class="rule"></div>
    <h1 style="font-size:58px;line-height:1.15">${s.heading}</h1>

    <div style="margin-top:56px">
      ${s.steps
        .map(
          (st, idx) => `<div style="display:flex;gap:32px;align-items:baseline;padding:22px 0;
            border-bottom:1px solid rgba(255,255,255,.14)">
          <span style="font-family:Fraunces,serif;font-weight:600;font-size:34px;color:${C.blueLight};flex:none;width:52px">${String(idx + 1).padStart(2, "0")}</span>
          <span style="font-family:Inter,sans-serif;font-weight:400;font-size:29px;color:#fff;line-height:1.3">${st}</span>
        </div>`
        )
        .join("")}
    </div>
  </div>
  ${brandRow(true, `${i} / 6`)}
</div>`);

// 6 — Cierre / CTA
const slideCta = (g) =>
  shell(`
<div class="slide">
  <div style="position:absolute;inset:0;background:
    radial-gradient(120% 80% at 50% 0%, #0d2444 0%, ${C.navy} 62%)"></div>
  <div style="position:absolute;left:72px;right:72px;top:380px">
    <div class="eyebrow">Gu&iacute;a &middot; ${g.name}</div>
    <div class="rule"></div>
    <h1 style="font-size:72px">${g.ctaHead}</h1>
    <div class="sub" style="margin-top:34px">${g.ctaSub}</div>
    ${whatsappButton("+56 9 9225 9272")}
    <div style="font-family:'IBM Plex Mono',monospace;font-weight:500;font-size:24px;
                letter-spacing:.14em;color:${C.blueLight};margin-top:44px">
      www.portaldebodegas.cl
    </div>
  </div>
  ${brandRow(true, "6 / 6")}
</div>`);

// ── Guía: Built-to-suit ──────────────────────────────────────────────────────
const BUILT_TO_SUIT = {
  id: "built-to-suit",
  name: "Built-to-suit",
  tagline: "C&oacute;mo se construye una bodega industrial a medida",
  titleSize: 92,
  cover: { src: photo("bosque-catemito", 4), pos: "56% 42%" },
  concepts: [
    {
      src: photo("bosque-catemito", 5),
      pos: "50% 50%",
      label: "Qu&eacute; es",
      head: "Construida para tu operaci&oacute;n,<br>no al rev&eacute;s",
      sub: "El propietario dise&ntilde;a la nave seg&uacute;n tus especificaciones: superficie, altura, accesos y energ&iacute;a.",
    },
  ],
  list: {
    kicker: "Cu&aacute;ndo conviene",
    heading: "Cuando lo que necesitas<br>no existe hoy en arriendo",
    items: [
      "M&aacute;s superficie de la que hay disponible en arriendo hoy en la zona",
      "Una altura, un piso o accesos que las bodegas est&aacute;ndar no ofrecen",
      "Crecer por etapas dentro de un mismo terreno",
      "Una combinaci&oacute;n espec&iacute;fica de nave y oficinas",
      "Un contrato a varios a&ntilde;os que justifica el dise&ntilde;o a medida",
    ],
  },
  steps: {
    kicker: "C&oacute;mo funciona",
    heading: "El proceso, en 5 pasos",
    steps: [
      "Levantamiento de requerimientos",
      "Propuesta de dise&ntilde;o y plazo",
      "Definici&oacute;n de condiciones comerciales",
      "Construcci&oacute;n",
      "Entrega e inicio de operaci&oacute;n",
    ],
  },
  capacity: {
    src: photo("bosque-catemito", 3),
    pos: "50% 46%",
    label: "Bosque Catemito",
    head: "Hasta 30.000&nbsp;m&sup2;<br>a medida",
    sub: "Hoy tiene m&oacute;dulos desde 360 hasta 14.000 m&sup2;, con capacidad para construir hasta 30.000&nbsp;m&sup2; a medida en el mismo terreno.",
  },
  ctaHead: "&iquest;Tu operaci&oacute;n<br>necesita algo a medida?",
  ctaSub: "Cu&eacute;ntanos qu&eacute; necesitas &mdash; superficie, altura, plazos &mdash;<br>y vemos qu&eacute; conviene.",
};

// ── Render ────────────────────────────────────────────────────────────────────
// Por defecto renderiza todas las guías definidas abajo.
// Para una sola: node build.js built-to-suit
const ALL_GUIDES = [BUILT_TO_SUIT];

(async () => {
  const filter = process.argv[2];
  const targets = filter ? ALL_GUIDES.filter((g) => g.id === filter) : ALL_GUIDES;

  if (filter && targets.length === 0) {
    console.error(`Guía desconocida: "${filter}". Disponibles: ${ALL_GUIDES.map((g) => g.id).join(", ")}`);
    process.exit(1);
  }

  const browser = await chromium.launch({ executablePath: CHROME });
  const page = await browser.newPage({
    viewport: { width: 1080, height: 1350 },
    deviceScaleFactor: 1,
  });

  for (const g of targets) {
    const outDir = path.join(__dirname, "salida", g.id);
    fs.mkdirSync(outDir, { recursive: true });

    const pages = [
      slideCover(g),
      slideConcept(g, g.concepts[0], 2),
      slideList(g, g.list, 3),
      slideSteps(g, g.steps, 4),
      slideConcept(g, g.capacity, 5),
      slideCta(g),
    ];

    console.log(`\n${g.name} (${g.id})`);
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
