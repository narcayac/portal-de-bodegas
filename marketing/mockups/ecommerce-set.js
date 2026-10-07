// Mockup de dirección v2: mismo diagrama, pero con círculos de color
// sólido (como el badge "VS" de marketing/versus) en vez de contornos
// finos huecos — la v1 se leía como un esquema de manual viejo. También
// se llenan los espacios vacíos: tarjetas con relleno en vez de recuadros
// punteados, elementos más grandes, menos aire muerto.
const { chromium } = require("playwright");
const fs = require("fs");
const path = require("path");
const { C, shell, brandRow, whatsappButton } = require("../shared/brand.js");

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

// 1 — Portada: marca gráfica de nodos, con relleno de color
const slideCover = () => shell(`
<div class="slide" style="background:#fff">
  <div style="position:absolute;top:48px;right:48px;border:2px solid ${navy};color:${navy};
    font-family:'IBM Plex Mono',monospace;font-weight:500;font-size:19px;letter-spacing:.18em;
    padding:13px 24px">Desliza &rarr;</div>

  <div style="position:absolute;left:72px;top:290px">
    ${circle(300, navy, icon(`
      <rect x="8" y="16" width="32" height="24" rx="2" stroke="${W}" stroke-width="2"/>
      <line x1="8" y1="28" x2="40" y2="28" stroke="${W}" stroke-width="2"/>
      <line x1="24" y1="16" x2="24" y2="40" stroke="${W}" stroke-width="2"/>`, 150))}
  </div>
  <div style="position:absolute;left:330px;top:395px;width:52px;height:4px;background:${C.blue};border-radius:2px"></div>
  <div style="position:absolute;left:330px;top:420px;width:84px;height:4px;background:${C.blue};border-radius:2px;opacity:.55"></div>
  <div style="position:absolute;left:330px;top:445px;width:38px;height:4px;background:${C.blue};border-radius:2px;opacity:.3"></div>

  <div style="position:absolute;left:72px;right:72px;top:800px">
    <div class="eyebrow" style="color:${C.slate};font-size:21px">Gu&iacute;a</div>
    <div class="rule" style="background:${C.blue}"></div>
    <h1 style="color:${navy};font-size:72px;line-height:1.06">${NAME}</h1>
    <div style="font-family:Inter,sans-serif;font-weight:400;font-size:33px;color:${C.slate};margin-top:22px">
      Picking, despacho y &uacute;ltima milla en San Bernardo
    </div>
  </div>
  ${brandRow(false, "1 / 6")}
</div>`);

// 2 — Concepto: guardar (estático, muted) vs. operar (flujo, navy)
const slideConcept = () => shell(`
<div class="slide" style="background:#fff">
  ${header("Por qu&eacute; es distinto", NAME)}
  <div style="position:absolute;left:72px;right:72px;top:190px">
    <h1 style="color:${navy};font-size:58px;line-height:1.18">No es guardar cosas,<br>es operar un negocio</h1>
  </div>

  <div style="position:absolute;left:140px;top:580px;width:320px;text-align:center">
    <div style="display:flex;justify-content:center">${circle(160, C.slate, ICONS.guardar)}</div>
    <div style="font-family:Inter,sans-serif;font-weight:500;font-size:25px;color:${C.slate};margin-top:34px">Guardar cosas</div>
  </div>
  <div style="position:absolute;left:532px;top:650px;width:16px;height:16px;border-radius:50%;background:${C.border}"></div>
  <div style="position:absolute;left:620px;top:580px;width:320px;text-align:center">
    <div style="display:flex;justify-content:center">${circle(160, navy, ICONS.operar)}</div>
    <div style="font-family:Inter,sans-serif;font-weight:600;font-size:25px;color:${navy};margin-top:34px">Operar un negocio</div>
  </div>

  <div style="position:absolute;left:72px;right:72px;top:920px;text-align:center">
    <div style="font-family:Inter,sans-serif;font-weight:400;font-size:29px;color:${C.slate};line-height:1.5">
      Entra inventario, pero sobre todo sale &mdash; pedido por<br>pedido, todos los d&iacute;as.
    </div>
  </div>
  ${brandRow(false, "2 / 6")}
</div>`);

// 3 — Flujo (dirección aprobada, con el nuevo relleno de color)
const node = (n, key, label, x, y, muted) => `
<div style="position:absolute;left:${x - 68}px;top:${y - 68}px;width:136px;text-align:center">
  ${circle(136, muted ? C.slate : navy, ICONS[key], n ? numberBadge(n) : "")}
  <div style="font-family:Inter,sans-serif;font-weight:500;font-size:19px;color:${navy};margin-top:18px">${label}</div>
</div>`;

const arrow = (x1, x2, y) => `
<div style="position:absolute;left:${x1}px;top:${y - 1.5}px;width:${x2 - x1}px;height:3px;background:${C.blue}"></div>
<div style="position:absolute;left:${x2 - 8}px;top:${y - 7}px;width:0;height:0;
  border-top:7px solid transparent;border-bottom:7px solid transparent;border-left:11px solid ${C.blue}"></div>`;

const FLOW_Y = 530;
const FLOW_X = [168, 420, 672, 918];

const slideFlow = () => shell(`
<div class="slide" style="background:#fff">
  ${header("C&oacute;mo fluye tu operaci&oacute;n", NAME)}
  <div style="position:absolute;left:72px;right:72px;top:160px">
    <h1 style="color:${navy};font-size:52px;line-height:1.18">Del flujo ordenado<br>depende no caer en el caos</h1>
  </div>

  ${arrow(FLOW_X[0] + 68, FLOW_X[1] - 68, FLOW_Y)}
  ${arrow(FLOW_X[1] + 68, FLOW_X[2] - 68, FLOW_Y)}
  ${arrow(FLOW_X[2] + 68, FLOW_X[3] - 68, FLOW_Y)}

  ${node(1, "recepcion", "Recepci&oacute;n", FLOW_X[0], FLOW_Y)}
  ${node(2, "picking", "Picking", FLOW_X[1], FLOW_Y)}
  ${node(3, "packing", "Packing", FLOW_X[2], FLOW_Y)}
  ${node(4, "despacho", "Despacho", FLOW_X[3], FLOW_Y)}

  <div style="position:absolute;left:${FLOW_X[3] - 1.5}px;top:${FLOW_Y + 72}px;width:3px;height:110px;
    background:repeating-linear-gradient(to bottom, ${C.slate} 0 7px, transparent 7px 14px)"></div>
  ${node(null, "devoluciones", "Devoluciones", FLOW_X[3], FLOW_Y + 250, true)}
  <div style="position:absolute;left:${FLOW_X[3] - 150}px;top:${FLOW_Y + 400}px;width:300px;text-align:center">
    <div style="font-family:Inter,sans-serif;font-weight:400;font-size:18px;color:${C.slate};line-height:1.4">
      Aparte, para no mezclarlo con lo que s&iacute; est&aacute; listo para vender
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
    ${whatsappButton("+56 9 9225 9272")}
    <div style="font-family:'IBM Plex Mono',monospace;font-weight:500;font-size:24px;
                letter-spacing:.14em;color:${C.blueLight};margin-top:44px">
      www.portaldebodegas.cl
    </div>
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
