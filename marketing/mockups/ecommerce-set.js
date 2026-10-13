// Mockup de dirección v2: mismo diagrama, pero con círculos de color
// sólido (como el badge "VS" de marketing/versus) en vez de contornos
// finos huecos — la v1 se leía como un esquema de manual viejo. También
// se llenan los espacios vacíos: tarjetas con relleno en vez de recuadros
// punteados, elementos más grandes, menos aire muerto.
const { chromium } = require("playwright");
const fs = require("fs");
const path = require("path");
const { C, shell, brandRow, whatsappButton, photo } = require("../shared/brand.js");

const CHROME =
  process.env.CHROME_PATH ||
  "/opt/pw-browsers/chromium-1194/chrome-linux/chrome";

const icon = (d, size = 58) => `
<svg width="${size}" height="${size}" viewBox="0 0 48 48" fill="none" style="flex:none">${d}</svg>`;

const navy = C.navy;
const W = "#fff";
// Todos los íconos van en blanco: ahora viven sobre círculos de color
// sólido, no sueltos sobre blanco.
const ICONS = {
  recepcion: icon(`
    <path d="M10 22 H38 V40 H10 Z" stroke="${W}" stroke-width="2.5" stroke-linejoin="round"/>
    <path d="M24 6 V22" stroke="${W}" stroke-width="2.5"/>
    <path d="M16 15 L24 23 L32 15" stroke="${W}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>`),
  picking: icon(`
    <rect x="8" y="8" width="32" height="32" rx="2" stroke="${W}" stroke-width="2.5"/>
    <line x1="8" y1="20" x2="40" y2="20" stroke="${W}" stroke-width="2.5"/>
    <line x1="8" y1="32" x2="40" y2="32" stroke="${W}" stroke-width="2.5"/>`),
  packing: icon(`
    <rect x="8" y="16" width="32" height="24" rx="2" stroke="${W}" stroke-width="2.5"/>
    <line x1="8" y1="28" x2="40" y2="28" stroke="${W}" stroke-width="2.5"/>
    <line x1="24" y1="16" x2="24" y2="40" stroke="${W}" stroke-width="2.5"/>`),
  despacho: icon(`
    <rect x="6" y="18" width="22" height="18" rx="2" stroke="${W}" stroke-width="2.5"/>
    <path d="M30 27 H42" stroke="${W}" stroke-width="2.5"/>
    <path d="M36 21 L42 27 L36 33" stroke="${W}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>`),
  devoluciones: icon(`
    <path d="M30 12 A16 16 0 1 1 14 28" stroke="${W}" stroke-width="2.5" fill="none" stroke-linecap="round"/>
    <path d="M22 6 L30 12 L23 17" stroke="${W}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>`),
  guardar: icon(`
    <rect x="8" y="16" width="32" height="24" rx="2" stroke="${W}" stroke-width="2.5"/>
    <line x1="8" y1="28" x2="40" y2="28" stroke="${W}" stroke-width="2.5"/>`, 66),
  operar: icon(`
    <rect x="16" y="16" width="16" height="16" rx="2" stroke="${W}" stroke-width="2.5"/>
    <path d="M2 24 H14" stroke="${W}" stroke-width="2.5"/>
    <path d="M8 19 L14 24 L8 29" stroke="${W}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M34 24 H46" stroke="${W}" stroke-width="2.5"/>
    <path d="M40 19 L46 24 L40 29" stroke="${W}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>`, 66),
  calendario: icon(`
    <rect x="7" y="10" width="34" height="30" rx="2" stroke="${W}" stroke-width="2.5"/>
    <line x1="7" y1="18" x2="41" y2="18" stroke="${W}" stroke-width="2.5"/>
    <line x1="15" y1="6" x2="15" y2="14" stroke="${W}" stroke-width="2.5" stroke-linecap="round"/>
    <line x1="33" y1="6" x2="33" y2="14" stroke="${W}" stroke-width="2.5" stroke-linecap="round"/>
    <rect x="14" y="24" width="6" height="6" fill="${W}"/>`),
  reloj: icon(`
    <circle cx="24" cy="24" r="17" stroke="${W}" stroke-width="2.5"/>
    <path d="M24 14 V24 L32 29" stroke="${W}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>`),
  expandir: icon(`
    <path d="M30 18 L42 6 M42 6 H33 M42 6 V15" stroke="${W}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M18 30 L6 42 M6 42 H15 M6 42 V33" stroke="${W}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>`, 40),
};

const header = (kicker, name) => `
<div style="position:absolute;left:72px;right:72px;top:80px">
  <div style="display:flex;justify-content:space-between;align-items:baseline">
    <div class="eyebrow" style="color:${C.slate};font-size:20px">${kicker}</div>
    <div class="eyebrow" style="color:${C.slate};font-size:20px">${name}</div>
  </div>
  <div style="height:2px;background:${navy};margin-top:26px"></div>
</div>`;

// Círculo de color sólido con sombra suave — el mismo lenguaje del badge
// "VS" (marketing/versus), aplicado a cada nodo del diagrama.
const circle = (size, fill, content, badge) => `
<div style="width:${size}px;height:${size}px;border-radius:50%;background:${fill};
  display:flex;align-items:center;justify-content:center;position:relative;flex:none;
  box-shadow:0 14px 28px rgba(1,25,67,.22)">
  ${badge || ""}
  ${content}
</div>`;

const numberBadge = (n) => `
<div style="position:absolute;top:-10px;left:-10px;width:34px;height:34px;border-radius:50%;
  background:${C.blue};color:#fff;font-family:'IBM Plex Mono',monospace;font-weight:700;
  font-size:16px;display:flex;align-items:center;justify-content:center;
  box-shadow:0 4px 10px rgba(1,25,67,.3)">${n}</div>`;

const NAME = "Bodega para e-commerce";

// 1 — Portada editorial: foto a sangre con el bloque de título montado
// encima (capas, no zonas). Es la opción elegida sobre las de diagrama.
const slideCover = () => shell(`
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

  <div style="position:absolute;left:72px;right:72px;top:930px">
    <div style="font-family:Inter,sans-serif;font-weight:400;font-size:34px;color:${C.slate};line-height:1.4">
      Picking, despacho y &uacute;ltima milla<br>en San Bernardo
    </div>
  </div>
  ${brandRow(false, "1 / 6")}
</div>`);

// 2 — El fan-out: entra consolidado, sale fraccionado. Es la diferencia
// operativa real entre almacenar y despachar e-commerce, y se puede
// dibujar — no solo enunciar.
const FAN_X = 430, FAN_Y = 660;
const rays = [-27, -18, -9, 0, 9, 18, 27]
  .map(
    (deg) => `
  <div style="position:absolute;left:${FAN_X}px;top:${FAN_Y - 1.5}px;width:290px;height:3px;
    background:${C.blue};transform:rotate(${deg}deg);transform-origin:left center"></div>
  <div style="position:absolute;left:${FAN_X}px;top:${FAN_Y - 9}px;width:306px;height:18px;
    transform:rotate(${deg}deg);transform-origin:left center">
    <div style="position:absolute;right:0;top:0;width:18px;height:18px;background:${navy};border-radius:2px"></div>
  </div>`
  )
  .join("");

const slideConcept = () => shell(`
<div class="slide" style="background:#fff">
  ${header("Por qu&eacute; es distinto", NAME)}
  <div style="position:absolute;left:72px;right:72px;top:190px">
    <h1 style="color:${navy};font-size:58px;line-height:1.18">Entra por pallet.<br>Sale por unidad.</h1>
  </div>

  <!-- entrada consolidada -->
  <div style="position:absolute;left:72px;top:${FAN_Y - 4}px;width:96px;height:8px;background:${C.slate}"></div>
  <div style="position:absolute;left:162px;top:${FAN_Y - 13}px;width:0;height:0;
    border-top:13px solid transparent;border-bottom:13px solid transparent;border-left:18px solid ${C.slate}"></div>

  <!-- la bodega -->
  <div style="position:absolute;left:196px;top:${FAN_Y - 90}px;width:234px;height:180px;background:${navy};
    border-radius:8px;box-shadow:0 18px 36px rgba(1,25,67,.22)"></div>

  <!-- salida fraccionada -->
  ${rays}

  <div style="position:absolute;left:72px;right:72px;top:1000px">
    <div style="font-family:Inter,sans-serif;font-weight:400;font-size:29px;color:${C.slate};line-height:1.5">
      Una bodega de almacenaje recibe y mueve poco. Una de e-commerce
      despacha pedido por pedido, todos los d&iacute;as.
    </div>
  </div>
  ${brandRow(false, "2 / 6")}
</div>`);

// 3 — Cuánto espacio ocupa cada zona. Las cifras salen de la guía de
// cálculo de m² en lib/guias.js (almacenaje 60–70%, recepción/despacho
// 10–15%, picking 5–15%, oficina 5–10%), que esta misma guía enlaza.
// El ancho de cada tramo va al centro de su rango publicado.
const ZONES = [
  { label: "Almacenaje", range: "60 &ndash; 70%", w: 65, fill: navy },
  { label: "Recepci&oacute;n y despacho", range: "10 &ndash; 15%", w: 13, fill: C.blue },
  { label: "Picking y packing", range: "5 &ndash; 15%", w: 12, fill: "#89c7f6" },
  { label: "Oficina", range: "5 &ndash; 10%", w: 10, fill: C.slate },
];

const BAR_L = 72, BAR_W = 936, BAR_T = 470, BAR_H = 128;

const barSegments = () => {
  let x = 0;
  return ZONES.map((z, i) => {
    const w = (z.w / 100) * BAR_W;
    const seg = `
    <div style="position:absolute;left:${BAR_L + x}px;top:${BAR_T}px;width:${w}px;height:${BAR_H}px;
      background:${z.fill};${i === 0 ? "border-radius:8px 0 0 8px;" : ""}${i === ZONES.length - 1 ? "border-radius:0 8px 8px 0;" : ""}"></div>`;
    x += w;
    return seg;
  }).join("");
};

const legendRow = (z, i) => `
<div style="position:absolute;left:72px;right:72px;top:${660 + i * 76}px;display:flex;align-items:center;gap:22px">
  <div style="width:20px;height:20px;background:${z.fill};border-radius:4px;flex:none"></div>
  <div style="font-family:Inter,sans-serif;font-weight:400;font-size:28px;color:${navy};flex:1">${z.label}</div>
  <div style="font-family:'IBM Plex Mono',monospace;font-weight:600;font-size:26px;color:${navy}">${z.range}</div>
</div>`;

const slideFlow = () => shell(`
<div class="slide" style="background:#fff">
  ${header("C&oacute;mo se reparte el espacio", NAME)}
  <div style="position:absolute;left:72px;right:72px;top:160px">
    <h1 style="color:${navy};font-size:52px;line-height:1.18">El almacenaje no es<br>toda tu bodega</h1>
  </div>

  ${barSegments()}
  ${ZONES.map(legendRow).join("")}

  <div style="position:absolute;left:72px;right:72px;top:${660 + ZONES.length * 76 + 36}px;
    border-top:2px solid ${C.border};padding-top:32px">
    <div style="font-family:Inter,sans-serif;font-weight:400;font-size:27px;color:${C.slate};line-height:1.45">
      Si tu c&aacute;lculo da 300 m&sup2; de almacenaje,<br>busca una bodega de 420 a 500 m&sup2;.
    </div>
  </div>
  ${brandRow(false, "3 / 6")}
</div>`);

// 4 — Pasos: temporada alta, mismos nodos, apilados en vertical con una
// línea que los conecta (para que no quede aire muerto entre filas)
const STEP_X = 128;
const STEP_Y = [480, 686, 892];

const stepRow = (n, key, text, y) => `
<div style="position:absolute;left:${STEP_X - 58}px;top:${y - 58}px">
  ${circle(116, navy, icon_scaled(key), numberBadge(n))}
</div>
<div style="position:absolute;left:${STEP_X + 90}px;top:${y - 36}px;width:780px;
  font-family:Inter,sans-serif;font-weight:400;font-size:27px;color:${navy};line-height:1.4">${text}</div>`;

// íconos de pasos a tamaño levemente menor para que respiren dentro del
// círculo de 116px
function icon_scaled(key) {
  return ICONS[key].replace(/width="58" height="58"/, 'width="50" height="50"');
}

const slideSteps = () => shell(`
<div class="slide" style="background:#fff">
  ${header("Temporada alta", NAME)}
  <div style="position:absolute;left:72px;right:72px;top:160px">
    <h1 style="color:${navy};font-size:52px;line-height:1.18">La flexibilidad pesa<br>m&aacute;s que el precio</h1>
  </div>
  <div style="position:absolute;left:${STEP_X - 1.5}px;top:${STEP_Y[0] + 58}px;width:3px;height:${STEP_Y[2] - STEP_Y[0] - 116}px;
    background:${C.border}"></div>
  ${stepRow(1, "calendario", "CyberDay, Black Friday y Navidad<br>multiplican el despacho", STEP_Y[0])}
  ${stepRow(2, "reloj", "Dimensionar solo para el d&iacute;a a d&iacute;a te deja<br>corriendo detr&aacute;s del inventario", STEP_Y[1])}
  ${stepRow(3, "expandir", "Ampliar sin mudarte vale m&aacute;s que<br>ahorrar unas UF por m&sup2;", STEP_Y[2])}
  ${brandRow(false, "4 / 6")}
</div>`);

// 5 — Capacidad: tarjetas con relleno (no recuadros punteados) — "hoy"
// sólido dentro de "mañana" con tinte, sin inventar cifras de m²
const slideCapacity = () => shell(`
<div class="slide" style="background:#fff">
  ${header("Portal de Bodegas", NAME)}
  <div style="position:absolute;left:72px;right:72px;top:190px">
    <h1 style="color:${navy};font-size:58px;line-height:1.18">Ampliable<br>en el mismo recinto</h1>
  </div>

  <div style="position:absolute;left:190px;top:560px;width:700px;height:420px;border-radius:28px;
    background:rgba(6,133,222,.07)">
    <div style="margin:28px 32px;font-family:'IBM Plex Mono',monospace;font-weight:600;font-size:18px;
      letter-spacing:.16em;color:${C.blue};text-transform:uppercase">Ma&ntilde;ana</div>
    <div style="position:absolute;right:32px;bottom:28px">${circle(60, C.blue, icon(`<path d="M30 18 L42 6 M42 6 H33 M42 6 V15" stroke="#fff" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M18 30 L6 42 M6 42 H15 M6 42 V33" stroke="#fff" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>`, 34))}</div>
  </div>
  <div style="position:absolute;left:250px;top:660px;width:360px;height:220px;border-radius:20px;
    background:${navy};box-shadow:0 20px 40px rgba(1,25,67,.25)">
    <div style="margin:26px 30px;font-family:'IBM Plex Mono',monospace;font-weight:600;font-size:18px;
      letter-spacing:.16em;color:#fff;text-transform:uppercase">Hoy</div>
  </div>

  <div style="position:absolute;left:72px;right:72px;top:1040px;text-align:center">
    <div style="font-family:Inter,sans-serif;font-weight:400;font-size:28px;color:${C.slate};line-height:1.5">
      Parte acotado y crece sin cambiar de direcci&oacute;n<br>cuando el volumen lo pida.
    </div>
  </div>
  ${brandRow(false, "5 / 6")}
</div>`);

// 6 — Cierre: navy + CTA, igual al resto de la serie
const slideCta = () => shell(`
<div class="slide">
  <div style="position:absolute;inset:0;background:
    radial-gradient(120% 80% at 50% 0%, #0d2444 0%, ${navy} 62%)"></div>
  <div style="position:absolute;left:72px;right:72px;top:420px">
    <div class="eyebrow">Gu&iacute;a &middot; ${NAME}</div>
    <div class="rule"></div>
    <h1 style="font-size:66px">&iquest;Tu e-commerce ya<br>necesita m&aacute;s que un box?</h1>
    <div class="sub" style="margin-top:30px">Cu&eacute;ntanos tu volumen de pedidos<br>y te ayudamos a dimensionar la bodega.</div>
    ${whatsappButton("Cotiza por WhatsApp")}
  </div>
  ${brandRow(true, "6 / 6")}
</div>`);

(async () => {
  const browser = await chromium.launch({ executablePath: CHROME });
  const page = await browser.newPage({ viewport: { width: 1080, height: 1350 }, deviceScaleFactor: 1 });
  const pages = [slideCover(), slideConcept(), slideFlow(), slideSteps(), slideCapacity(), slideCta()];
  for (let i = 0; i < pages.length; i++) {
    await page.setContent(pages[i], { waitUntil: "load" });
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(250);
    const file = path.join(__dirname, `slide-${String(i + 1).padStart(2, "0")}.png`);
    await page.screenshot({ path: file });
    console.log("✓", path.basename(file));
  }
  await browser.close();
})();
