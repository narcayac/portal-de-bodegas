// Generador de carruseles "Diagramas" — Portal de Bodegas
// Tercera familia visual, además de ../recorrido/ (proyecto físico) y
// ../guias/ (explicativo con foto + scrim). Acá cada slide carga un dato
// dibujado: un flujo, una proporción, una comparación. Portada editorial
// con foto a sangre y bloque de título montado encima; cierre navy.
// Renderiza 6 slides de 1080x1350 (4:5) por post.
const { chromium } = require("playwright");
const fs = require("fs");
const path = require("path");
const { C, shell, brandRow, whatsappButton, photo } = require("../shared/brand.js");

const CHROME =
  process.env.CHROME_PATH ||
  "/opt/pw-browsers/chromium-1194/chrome-linux/chrome";

const navy = C.navy;
const W = "#fff";

// ── Piezas compartidas por todos los posts ────────────────────────────
const icon = (d, size = 58) => `
<svg width="${size}" height="${size}" viewBox="0 0 48 48" fill="none" style="flex:none">${d}</svg>`;

// Los íconos van en blanco: viven sobre círculos de color sólido, no
// sueltos sobre el fondo. Acá solo el trazado; el tamaño lo pone icon().
const D = {
  calendario: `
    <rect x="7" y="10" width="34" height="30" rx="2" stroke="${W}" stroke-width="2.5"/>
    <line x1="7" y1="18" x2="41" y2="18" stroke="${W}" stroke-width="2.5"/>
    <line x1="15" y1="6" x2="15" y2="14" stroke="${W}" stroke-width="2.5" stroke-linecap="round"/>
    <line x1="33" y1="6" x2="33" y2="14" stroke="${W}" stroke-width="2.5" stroke-linecap="round"/>
    <rect x="14" y="24" width="6" height="6" fill="${W}"/>`,
  reloj: `
    <circle cx="24" cy="24" r="17" stroke="${W}" stroke-width="2.5"/>
    <path d="M24 14 V24 L32 29" stroke="${W}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>`,
  expandir: `
    <path d="M30 18 L42 6 M42 6 H33 M42 6 V15" stroke="${W}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M18 30 L6 42 M6 42 H15 M6 42 V33" stroke="${W}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>`,
  terreno: `
    <rect x="4" y="13" width="40" height="25" stroke="${W}" stroke-width="2.5"/>
    <rect x="9" y="18" width="13" height="15" fill="${W}"/>
    <path d="M33 20 V31 M27.5 25.5 H38.5" stroke="${W}" stroke-width="2.5" stroke-linecap="round"/>`,
  camion: `
    <rect x="4" y="16" width="22" height="16" stroke="${W}" stroke-width="2.5"/>
    <path d="M26 21 H34 L42 27 V32 H26 Z" stroke="${W}" stroke-width="2.5" stroke-linejoin="round"/>
    <circle cx="15" cy="36" r="4" fill="${W}"/>
    <circle cx="34" cy="36" r="4" fill="${W}"/>`,
  contrato: `
    <rect x="10" y="6" width="28" height="36" stroke="${W}" stroke-width="2.5"/>
    <line x1="17" y1="16" x2="31" y2="16" stroke="${W}" stroke-width="2.5" stroke-linecap="round"/>
    <line x1="17" y1="23" x2="31" y2="23" stroke="${W}" stroke-width="2.5" stroke-linecap="round"/>
    <path d="M17 31 L22 36 L32 26" stroke="${W}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>`,
  valor: `
    <rect x="9" y="11" width="12" height="27" fill="${W}"/>
    <rect x="27" y="24" width="12" height="14" fill="${W}"/>
    <line x1="5" y1="42" x2="43" y2="42" stroke="${W}" stroke-width="2.5" stroke-linecap="round"/>`,
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

// Portada editorial compartida: foto a sangre con el bloque de título
// montado encima (capas, no zonas). Es la fórmula elegida para la serie.
const coverSlide = ({ src, pos, kicker, titleSize, title, tagline, taglineTop }) => shell(`
<div class="slide" style="background:#fff">
  <img src="${src}"
    style="position:absolute;left:0;top:0;width:1080px;height:660px;object-fit:cover;object-position:${pos}">

  <div style="position:absolute;top:48px;right:48px;border:2px solid rgba(255,255,255,.6);color:#fff;
    font-family:'IBM Plex Mono',monospace;font-weight:500;font-size:19px;letter-spacing:.18em;
    padding:13px 24px;z-index:5">Desliza &rarr;</div>

  <div style="position:absolute;left:0;top:470px;width:800px;background:${navy};padding:54px 72px 58px">
    <div class="eyebrow" style="font-size:21px">${kicker}</div>
    <div style="width:92px;height:4px;background:${C.blue};margin:24px 0 30px"></div>
    <h1 style="color:#fff;font-size:${titleSize}px;line-height:1.02;letter-spacing:-.02em">${title}</h1>
  </div>

  <div style="position:absolute;left:72px;right:72px;top:${taglineTop}px">
    <div style="font-family:Inter,sans-serif;font-weight:400;font-size:34px;color:${C.slate};line-height:1.4">
      ${tagline}
    </div>
  </div>
  ${brandRow(false, "1 / 6")}
</div>`);

// Cierre compartido: navy + CTA. Sin teléfono ni URL — el botón de
// WhatsApp es la única acción, igual que en ../versus/.
const ctaSlide = ({ eyebrow, title, sub }) => shell(`
<div class="slide">
  <div style="position:absolute;inset:0;background:
    radial-gradient(120% 80% at 50% 0%, #0d2444 0%, ${navy} 62%)"></div>
  <div style="position:absolute;left:72px;right:72px;top:420px">
    <div class="eyebrow">${eyebrow}</div>
    <div class="rule"></div>
    <h1 style="font-size:66px">${title}</h1>
    <div class="sub" style="margin-top:30px">${sub}</div>
    ${whatsappButton("Cotiza por WhatsApp")}
  </div>
  ${brandRow(true, "6 / 6")}
</div>`);

// ══════════════════════════════════════════════════════════════════════
// Post — Bodega para e-commerce en San Bernardo
// Fuente: guía bodega-para-ecommerce-san-bernardo en lib/guias.js
// ══════════════════════════════════════════════════════════════════════
function postEcommerce() {
  const NAME = "Bodega para e-commerce";

  const slideCover = () =>
    coverSlide({
      src: photo("acacias-seis", 3),
      pos: "50% 55%",
      kicker: "Gu&iacute;a",
      titleSize: 82,
      title: "Bodega para<br>e-commerce",
      tagline: "Picking, despacho y &uacute;ltima milla<br>en San Bernardo",
      taglineTop: 930,
    });

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

  const stepRow = (n, iconHtml, text, y) => `
<div style="position:absolute;left:${STEP_X - 58}px;top:${y - 58}px">
  ${circle(116, navy, iconHtml, numberBadge(n))}
</div>
<div style="position:absolute;left:${STEP_X + 90}px;top:${y - 36}px;width:780px;
  font-family:Inter,sans-serif;font-weight:400;font-size:27px;color:${navy};line-height:1.4">${text}</div>`;

  const slideSteps = () => shell(`
<div class="slide" style="background:#fff">
  ${header("Temporada alta", NAME)}
  <div style="position:absolute;left:72px;right:72px;top:160px">
    <h1 style="color:${navy};font-size:52px;line-height:1.18">La flexibilidad pesa<br>m&aacute;s que el precio</h1>
  </div>
  <div style="position:absolute;left:${STEP_X - 1.5}px;top:${STEP_Y[0] + 58}px;width:3px;height:${STEP_Y[2] - STEP_Y[0] - 116}px;
    background:${C.border}"></div>
  ${stepRow(1, icon(D.calendario, 50), "CyberDay, Black Friday y Navidad<br>multiplican el despacho", STEP_Y[0])}
  ${stepRow(2, icon(D.reloj, 50), "Dimensionar solo para el d&iacute;a a d&iacute;a te deja<br>corriendo detr&aacute;s del inventario", STEP_Y[1])}
  ${stepRow(3, icon(D.expandir, 40), "Ampliar sin mudarte vale m&aacute;s que<br>ahorrar unas UF por m&sup2;", STEP_Y[2])}
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
    <div style="position:absolute;right:32px;bottom:28px">${circle(60, C.blue, icon(D.expandir, 34))}</div>
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

  const slideCta = () =>
    ctaSlide({
      eyebrow: `Gu&iacute;a &middot; ${NAME}`,
      title: "&iquest;Tu e-commerce ya<br>necesita m&aacute;s que un box?",
      sub: "Cu&eacute;ntanos tu volumen de pedidos<br>y te ayudamos a dimensionar la bodega.",
    });

  return {
    id: "bodega-para-ecommerce-san-bernardo",
    name: NAME,
    slides: [slideCover, slideConcept, slideFlow, slideSteps, slideCapacity, slideCta],
  };
}

// ══════════════════════════════════════════════════════════════════════
// Post — Por qué el sur se convirtió en polo logístico
// Fuentes en lib/guias.js: bodegas-san-bernardo-hub-logistico (rutas,
// suelo, valor), mercado-bodegas-santiago-agosto-2026 (nueva oferta en
// San Bernardo / Calera de Tango / Paine, cita de Revista Logistec) y
// mercado-bodegas-santiago-septiembre-2026 (vacancia y submercados
// más buscados, Cushman & Wakefield 2T 2026).
// ══════════════════════════════════════════════════════════════════════
function postPoloSur() {
  const NAME = "Polo log&iacute;stico sur";

  const slideCover = () =>
    coverSlide({
      src: photo("bosque-catemito", 4),
      pos: "50% 42%",
      kicker: "Ubicaci&oacute;n",
      titleSize: 72,
      title: "Por qu&eacute; el sur<br>se convirti&oacute; en<br>polo log&iacute;stico",
      tagline: "El mapa industrial de Santiago<br>se movi&oacute; de Quilicura a San Bernardo",
      taglineTop: 1010,
    });

  // 2 — El giro: dos bandas sólidas (el norte consolidado / la nueva
  // oferta) con una flecha entre medio. Los nombres del sur salen del
  // informe de agosto; los del norte, de la guía del hub logístico.
  const chip = (text, dark) => `
<div style="background:${dark ? "rgba(255,255,255,.14)" : "#fff"};color:${dark ? "#fff" : navy};
  font-family:Inter,sans-serif;font-weight:600;font-size:30px;padding:18px 30px;border-radius:10px">${text}</div>`;

  const band = (top, bg, labelColor, label, chips, dark) => `
<div style="position:absolute;left:72px;right:72px;top:${top}px;background:${bg};border-radius:20px;padding:36px 40px">
  <div style="font-family:'IBM Plex Mono',monospace;font-weight:600;font-size:19px;letter-spacing:.18em;
    text-transform:uppercase;color:${labelColor}">${label}</div>
  <div style="display:flex;gap:16px;margin-top:28px">${chips.map((c) => chip(c, dark)).join("")}</div>
</div>`;

  const slideShift = () => shell(`
<div class="slide" style="background:#fff">
  ${header("El giro", NAME)}
  <div style="position:absolute;left:72px;right:72px;top:180px">
    <h1 style="color:${navy};font-size:54px;line-height:1.18">Durante a&ntilde;os, el mapa<br>apuntaba al norte</h1>
  </div>

  ${band(390, "rgba(108,123,146,.12)", C.slate, "El norte consolidado", ["Quilicura", "Pudahuel", "Lampa"], false)}

  <div style="position:absolute;left:510px;top:618px;width:60px;height:0;
    border-left:30px solid transparent;border-right:30px solid transparent;border-top:44px solid ${C.blue}"></div>

  ${band(700, navy, C.blueLight, "La nueva oferta industrial", ["San Bernardo", "Calera de Tango", "Paine"], true)}

  <div style="position:absolute;left:72px;right:72px;top:960px;border-top:2px solid ${C.border};padding-top:32px">
    <div style="font-family:Inter,sans-serif;font-weight:400;font-size:27px;color:${C.slate};line-height:1.45">
      La log&iacute;stica se mueve hacia donde hay suelo disponible, buenos
      accesos y costos razonables.
    </div>
  </div>
  ${brandRow(false, "2 / 6")}
</div>`);

  // 3 — Hub-and-spokes: las cuatro salidas troncales de la comuna, cada
  // una rotulada con lo que resuelve. Izquierda, Santiago urbano;
  // derecha, carga nacional y puerto.
  const CX = 540, CY = 740, SPOKE = 215;

  const spoke = (deg) => `
<div style="position:absolute;left:${CX}px;top:${CY - 2}px;width:${SPOKE}px;height:4px;background:${C.blue};
  transform:rotate(${deg}deg);transform-origin:left center"></div>
<div style="position:absolute;left:${CX}px;top:${CY - 11}px;width:${SPOKE + 12}px;height:22px;
  transform:rotate(${deg}deg);transform-origin:left center">
  <div style="position:absolute;right:0;top:0;width:22px;height:22px;background:${navy};border-radius:3px"></div>
</div>`;

  const routeLabel = (pos, name, desc) => `
<div style="position:absolute;${pos}">
  <div style="font-family:'IBM Plex Mono',monospace;font-weight:600;font-size:20px;letter-spacing:.14em;
    text-transform:uppercase;color:${C.blue}">${name}</div>
  <div style="font-family:Inter,sans-serif;font-weight:400;font-size:26px;color:${navy};line-height:1.35;
    margin-top:12px">${desc}</div>
</div>`;

  const slideRoutes = () => shell(`
<div class="slide" style="background:#fff">
  ${header("Conectividad", NAME)}
  <div style="position:absolute;left:72px;right:72px;top:175px">
    <h1 style="color:${navy};font-size:50px;line-height:1.18">Cuatro salidas<br>troncales</h1>
  </div>

  ${spoke(-135)}${spoke(-45)}${spoke(135)}${spoke(45)}

  <div style="position:absolute;left:${CX - 92}px;top:${CY - 92}px">
    ${circle(184, navy, `<div style="font-family:'Plus Jakarta Sans',sans-serif;font-weight:800;font-size:31px;
      color:#fff;text-align:center;line-height:1.15;letter-spacing:-.01em">San<br>Bernardo</div>`)}
  </div>

  ${routeLabel("left:40px;top:430px;width:300px;text-align:right", "A. Vespucio", "&Uacute;ltima milla en toda la capital")}
  ${routeLabel("left:740px;top:430px;width:300px", "Ruta 5 Sur", "Distribuci&oacute;n nacional sin cruzar la ciudad")}
  ${routeLabel("left:40px;top:940px;width:300px;text-align:right", "Acceso Sur", "Entrada y salida de carga de Santiago")}
  ${routeLabel("left:740px;top:940px;width:300px", "Ruta 78", "Salida directa al puerto de San Antonio")}

  ${brandRow(false, "3 / 6")}
</div>`);

  // 4 — Las tres razones estructurales de la guía del hub logístico
  const RX = 128;
  const RY = [515, 740, 965];

  const reasonRow = (n, iconHtml, title, desc, y) => `
<div style="position:absolute;left:${RX - 58}px;top:${y - 58}px">
  ${circle(116, navy, iconHtml, numberBadge(n))}
</div>
<div style="position:absolute;left:${RX + 90}px;top:${y - 61}px;width:780px">
  <div style="font-family:'Plus Jakarta Sans',sans-serif;font-weight:800;font-size:31px;color:${navy};
    letter-spacing:-.01em">${title}</div>
  <div style="font-family:Inter,sans-serif;font-weight:400;font-size:26px;color:${C.slate};line-height:1.4;
    margin-top:12px">${desc}</div>
</div>`;

  const slideReasons = () => shell(`
<div class="slide" style="background:#fff">
  ${header("Por qu&eacute; el sur", NAME)}
  <div style="position:absolute;left:72px;right:72px;top:170px">
    <h1 style="color:${navy};font-size:52px;line-height:1.18">Tres razones<br>estructurales</h1>
  </div>
  <div style="position:absolute;left:${RX - 1.5}px;top:${RY[0] + 58}px;width:3px;height:${RY[2] - RY[0] - 116}px;
    background:${C.border}"></div>
  ${reasonRow(1, icon(D.terreno, 50), "Suelo disponible", "Permite arrendar superficies grandes de una vez &mdash; y ampliar sin mudarse de direcci&oacute;n.", RY[0])}
  ${reasonRow(2, icon(D.camion, 50), "Conectividad troncal", "La bodega mejor ubicada no es la m&aacute;s cercana a tu oficina: es la m&aacute;s cercana a la autopista.", RY[1])}
  ${reasonRow(3, icon(D.valor, 50), "Valor por m&sup2;", "M&aacute;s competitivo que los polos consolidados del norte, con la misma conectividad.", RY[2])}
  ${brandRow(false, "4 / 6")}
</div>`);

  // 5 — La validación de mercado: vacancia (Cushman & Wakefield, 2T 2026)
  // y las dos lecturas publicadas sobre el sur.
  const statCard = (left, bg, value, label) => `
<div style="position:absolute;left:${left}px;top:380px;width:452px;height:280px;border-radius:20px;background:${bg};
  box-shadow:0 18px 36px rgba(1,25,67,.18)">
  <div style="position:absolute;left:36px;top:46px;font-family:'Plus Jakarta Sans',sans-serif;font-weight:800;
    font-size:90px;color:#fff;letter-spacing:-.03em">${value}</div>
  <div style="position:absolute;left:36px;right:36px;bottom:36px;font-family:Inter,sans-serif;font-weight:400;
    font-size:24px;color:rgba(255,255,255,.82);line-height:1.35">${label}</div>
</div>`;

  const slideMarket = () => shell(`
<div class="slide" style="background:#fff">
  ${header("Los n&uacute;meros", NAME)}
  <div style="position:absolute;left:72px;right:72px;top:170px">
    <h1 style="color:${navy};font-size:52px;line-height:1.18">No es percepci&oacute;n:<br>es el mercado</h1>
  </div>

  ${statCard(72, navy, "3,83%", "Vacancia total del mercado de bodegas de Santiago")}
  ${statCard(556, C.blue, "0,29%", "Vacancia en clase A &mdash; un m&iacute;nimo hist&oacute;rico")}

  <div style="position:absolute;left:72px;right:72px;top:688px;font-family:'IBM Plex Mono',monospace;
    font-weight:500;font-size:20px;letter-spacing:.14em;text-transform:uppercase;color:${C.slate}">
    Cushman &amp; Wakefield &middot; 2T 2026
  </div>

  <div style="position:absolute;left:72px;right:72px;top:748px;border-left:6px solid ${C.blue};padding-left:34px">
    <div style="font-family:Fraunces,Georgia,serif;font-weight:600;font-size:40px;color:${navy};
      line-height:1.22;letter-spacing:-.01em">
      &ldquo;El sur se abre paso en el mercado de bodegaje de la Regi&oacute;n Metropolitana&rdquo;
    </div>
    <div style="font-family:'IBM Plex Mono',monospace;font-weight:500;font-size:20px;letter-spacing:.14em;
      text-transform:uppercase;color:${C.slate};margin-top:24px">Revista Logistec</div>
  </div>

  <div style="position:absolute;left:72px;right:72px;top:960px;border-top:2px solid ${C.border};padding-top:30px">
    <div style="font-family:Inter,sans-serif;font-weight:400;font-size:26px;color:${C.slate};line-height:1.45">
      Para clase A, el sur y el poniente/noroeste son los submercados m&aacute;s
      buscados &mdash; y el sur es, adem&aacute;s, el preferido por el retail para
      abastecer la Regi&oacute;n Metropolitana.
    </div>
  </div>
  ${brandRow(false, "5 / 6")}
</div>`);

  const slideCta = () =>
    ctaSlide({
      eyebrow: `Ubicaci&oacute;n &middot; ${NAME}`,
      title: "&iquest;Buscas bodega en<br>el sur de Santiago?",
      sub: "Tenemos cinco proyectos en San Bernardo,<br>desde 180 hasta 14.000 m&sup2;.",
    });

  return {
    id: "polo-logistico-sur-santiago",
    name: "Polo logístico sur",
    slides: [slideCover, slideShift, slideRoutes, slideReasons, slideMarket, slideCta],
  };
}


// ══════════════════════════════════════════════════════════════════════
// Post — Mercado de bodegas en Santiago, octubre 2026
// Fuente: guía mercado-bodegas-santiago-octubre-2026 en lib/guias.js.
// Cifras de NAI Sarrà (1S 2026), Colliers (minibodegas, octubre 2026),
// Cushman & Wakefield (2T 2026) y CBRE, según la cobertura en prensa
// del rubro. Ninguna se redondea ni se reinterpreta acá.
// ══════════════════════════════════════════════════════════════════════
function postMercadoOctubre() {
  const NAME = "Informe &middot; Octubre 2026";

  // Pie de fuente: en un informe de mercado la atribución no es un
  // detalle legal, es parte del contenido.
  const fuente = (top, texto) => `
<div style="position:absolute;left:72px;right:72px;top:${top}px;font-family:'IBM Plex Mono',monospace;
  font-weight:500;font-size:18px;letter-spacing:.12em;text-transform:uppercase;color:${C.slate}">${texto}</div>`;

  const slideCover = () =>
    coverSlide({
      src: photo("alto-las-acacias", 1),
      pos: "50% 58%",
      kicker: "Informe de mercado",
      titleSize: 78,
      title: "Dos mercados,<br>dos direcciones",
      tagline: "Bodegas en Santiago &mdash; octubre 2026",
      taglineTop: 910,
    });

  // 2 — La divergencia, en barras verticales a escala real: la vacancia
  // industrial contra la de minibodegas. La desproporción es el dato.
  const BASE = 950, VMAX = 31.7, VH = 430, BW = 250;

  const vBar = (cx, pct, fill, nombre, delta) => {
    const h = Math.round((pct / VMAX) * VH);
    return `
<div style="position:absolute;left:${cx - BW / 2}px;top:${BASE - h}px;width:${BW}px;height:${h}px;
  background:${fill};border-radius:6px 6px 0 0"></div>
<div style="position:absolute;left:${cx - BW / 2}px;top:${BASE - h - 82}px;width:${BW}px;text-align:center;
  font-family:'Plus Jakarta Sans',sans-serif;font-weight:800;font-size:60px;color:${fill};
  letter-spacing:-.03em">${pct.toString().replace(".", ",")}%</div>
<div style="position:absolute;left:${cx - BW / 2 - 40}px;top:${BASE + 28}px;width:${BW + 80}px;text-align:center">
  <div style="font-family:Inter,sans-serif;font-weight:600;font-size:28px;color:${navy}">${nombre}</div>
  <div style="font-family:'IBM Plex Mono',monospace;font-weight:500;font-size:21px;color:${C.slate};
    margin-top:14px">${delta}</div>
</div>`;
  };

  const slideVacancia = () => shell(`
<div class="slide" style="background:#fff">
  ${header("Vacancia", NAME)}
  <div style="position:absolute;left:72px;right:72px;top:170px">
    <h1 style="color:${navy};font-size:46px;line-height:1.18">La bodega industrial escasea.<br>La minibodega sobra.</h1>
  </div>

  <div style="position:absolute;left:72px;right:72px;top:${BASE}px;height:3px;background:${C.border}"></div>
  ${vBar(330, 3.59, navy, "Bodega industrial", "desde 3,69% &darr;")}
  ${vBar(750, 31.7, C.slate, "Minibodega", "desde 28,5% &uarr;")}

  ${fuente(1110, "NAI Sarr&agrave; 1S 2026 &middot; Colliers minibodegas, octubre 2026")}
  ${brandRow(false, "2 / 6")}
</div>`);

  // 3 — La segunda dimensión del mismo contraste, girada 90°: el precio
  // por m². Las barras van a escala sobre un máximo de 0,40 UF.
  const PX0 = 72, PMAX = 0.4, PW = 620, PBH = 76;

  const hBar = (top, pct, fill, nombre, valor) => {
    const w = Math.round((pct / PMAX) * PW);
    return `
<div style="position:absolute;left:${PX0}px;top:${top}px;font-family:Inter,sans-serif;font-weight:600;
  font-size:28px;color:${navy}">${nombre}</div>
<div style="position:absolute;left:${PX0}px;top:${top + 45}px;width:${w}px;height:${PBH}px;background:${fill};
  border-radius:0 6px 6px 0"></div>
<div style="position:absolute;left:${PX0 + w + 26}px;top:${top + 50}px;font-family:'Plus Jakarta Sans',sans-serif;
  font-weight:800;font-size:42px;color:${fill};letter-spacing:-.02em">${valor}</div>`;
  };

  const slidePrecio = () => shell(`
<div class="slide" style="background:#fff">
  ${header("Precio por m&sup2;", NAME)}
  <div style="position:absolute;left:72px;right:72px;top:170px">
    <h1 style="color:${navy};font-size:50px;line-height:1.18">Y la que sobra<br>cuesta m&aacute;s del doble</h1>
  </div>

  ${hBar(420, 0.148, navy, "Bodega industrial", "0,148 UF/m&sup2;")}
  ${hBar(640, 0.356, C.slate, "Minibodega", "0,356 UF/m&sup2;")}

  <div style="position:absolute;left:72px;right:72px;top:850px;border-top:2px solid ${C.border};padding-top:32px">
    <div style="font-family:Inter,sans-serif;font-weight:400;font-size:27px;color:${C.slate};line-height:1.45">
      En la minibodega se paga la conveniencia &mdash;metros chicos, plazo
      corto, sin contrato largo&mdash;, no el metro cuadrado.
    </div>
  </div>
  ${fuente(1040, "Valores de arriendo mensual promedio")}
  ${brandRow(false, "3 / 6")}
</div>`);

  // 4 — Los plazos: el dato con más consecuencias prácticas del mes
  const TX = 128;
  const TY = [515, 740, 965];

  const plazoRow = (n, iconHtml, title, desc, y) => `
<div style="position:absolute;left:${TX - 58}px;top:${y - 58}px">
  ${circle(116, navy, iconHtml, numberBadge(n))}
</div>
<div style="position:absolute;left:${TX + 90}px;top:${y - 61}px;width:780px">
  <div style="font-family:'Plus Jakarta Sans',sans-serif;font-weight:800;font-size:31px;color:${navy};
    letter-spacing:-.01em">${title}</div>
  <div style="font-family:Inter,sans-serif;font-weight:400;font-size:26px;color:${C.slate};line-height:1.4;
    margin-top:12px">${desc}</div>
</div>`;

  const slidePlazos = () => shell(`
<div class="slide" style="background:#fff">
  ${header("Los plazos", NAME)}
  <div style="position:absolute;left:72px;right:72px;top:170px">
    <h1 style="color:${navy};font-size:48px;line-height:1.18">El mercado se compromete<br>antes de existir</h1>
  </div>
  <div style="position:absolute;left:${TX - 1.5}px;top:${TY[0] + 58}px;width:3px;height:${TY[2] - TY[0] - 116}px;
    background:${C.border}"></div>
  ${plazoRow(1, icon(D.contrato, 50), "61,5% ya est&aacute; prearrendado", "De la superficie en construcci&oacute;n en la Regi&oacute;n Metropolitana, seis de cada diez ya tienen arrendatario antes de terminarse.", TY[0])}
  ${plazoRow(2, icon(D.reloj, 50), "4 a 5 a&ntilde;os para desarrollar", "Lo que toma conseguir terreno, permisos y construir. La oferta no puede reaccionar r&aacute;pido aunque la demanda apriete.", TY[1])}
  ${plazoRow(3, icon(D.calendario, 50), "18 a 24 meses de anticipaci&oacute;n", "El plazo con que la prensa del rubro recomienda planificar una operaci&oacute;n nueva.", TY[2])}
  ${brandRow(false, "4 / 6")}
</div>`);

  // 5 — La brecha por calidad en círculos a escala de área: clase B
  // tiene casi cinco veces la vacancia de clase A.
  const dA = 96, dB = Math.round(dA * Math.sqrt(5.95 / 1.21));

  const burbuja = (cx, cy, d, fill, valor, label) => `
<div style="position:absolute;left:${cx - d / 2}px;top:${cy - d / 2}px;width:${d}px;height:${d}px;
  border-radius:50%;background:${fill};box-shadow:0 16px 32px rgba(1,25,67,.2)"></div>
<div style="position:absolute;left:${cx - 180}px;top:${cy + 140}px;width:360px;text-align:center">
  <div style="font-family:'Plus Jakarta Sans',sans-serif;font-weight:800;font-size:54px;color:${fill};
    letter-spacing:-.03em">${valor}</div>
  <div style="font-family:Inter,sans-serif;font-weight:400;font-size:27px;color:${C.slate};margin-top:14px">${label}</div>
</div>`;

  const slideCalidad = () => shell(`
<div class="slide" style="background:#fff">
  ${header("Calidad", NAME)}
  <div style="position:absolute;left:72px;right:72px;top:170px">
    <h1 style="color:${navy};font-size:50px;line-height:1.18">No es que no haya bodegas.<br>No hay bodegas buenas.</h1>
  </div>

  ${burbuja(320, 600, dA, navy, "1,21%", "Vacancia clase A")}
  ${burbuja(740, 600, dB, C.slate, "5,95%", "Vacancia clase B")}

  <div style="position:absolute;left:72px;right:72px;top:880px;border-top:2px solid ${C.border};padding-top:32px">
    <div style="font-family:Inter,sans-serif;font-weight:400;font-size:27px;color:${C.slate};line-height:1.45">
      El espacio sobra donde el est&aacute;ndar no alcanza. Quien busca clase A
      compite por un stock m&iacute;nimo.
    </div>
  </div>
  ${fuente(1040, "NAI Sarr&agrave; &middot; 1er semestre 2026 &middot; &aacute;rea proporcional")}
  ${brandRow(false, "5 / 6")}
</div>`);

  const slideCta = () =>
    ctaSlide({
      eyebrow: "Informe de mercado &middot; Octubre 2026",
      title: "&iquest;Necesitas bodega<br>con plazos reales?",
      sub: "Cu&eacute;ntanos metraje y uso,<br>y te cotizamos hoy mismo.",
    });

  return {
    id: "mercado-bodegas-santiago-octubre-2026",
    name: "Mercado de bodegas — octubre 2026",
    slides: [slideCover, slideVacancia, slidePrecio, slidePlazos, slideCalidad, slideCta],
  };
}

// ── Render ────────────────────────────────────────────────────────────
const POSTS = [postEcommerce(), postPoloSur(), postMercadoOctubre()];

(async () => {
  const filtro = process.argv.slice(2);
  const sel = filtro.length ? POSTS.filter((p) => filtro.includes(p.id)) : POSTS;
  if (!sel.length) {
    console.error(`No hay post con ese id. Disponibles: ${POSTS.map((p) => p.id).join(", ")}`);
    process.exit(1);
  }

  const browser = await chromium.launch({ executablePath: CHROME });
  const page = await browser.newPage({ viewport: { width: 1080, height: 1350 }, deviceScaleFactor: 1 });

  for (const post of sel) {
    const outDir = path.join(__dirname, "salida", post.id);
    fs.mkdirSync(outDir, { recursive: true });

    console.log(`\n${post.name} (${post.id})`);
    for (let i = 0; i < post.slides.length; i++) {
      await page.setContent(post.slides[i](), { waitUntil: "load" });
      await page.evaluate(() => document.fonts.ready);
      await page.waitForTimeout(250);
      const file = path.join(outDir, `slide-${String(i + 1).padStart(2, "0")}.png`);
      await page.screenshot({ path: file });
      console.log("✓", path.basename(file));
    }
  }
  await browser.close();
})();
