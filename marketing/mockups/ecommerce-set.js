// Mockup de dirección completo: "diagrama institucional" — fondo blanco,
// nodos/figuras conectadas en vez de foto+scrim o pantalla partida.
// Reutiliza el motivo de la slide 3 (ya aprobada) en el resto del carrusel
// para que se vea como un solo sistema. Solo para feedback — no toca
// marketing/guias/build.js todavía.
const { chromium } = require("playwright");
const fs = require("fs");
const path = require("path");
const { C, shell, brandRow, whatsappButton } = require("../shared/brand.js");

const CHROME =
  process.env.CHROME_PATH ||
  "/opt/pw-browsers/chromium-1194/chrome-linux/chrome";

const icon = (d, size = 52) => `
<svg width="${size}" height="${size}" viewBox="0 0 48 48" fill="none" style="flex:none">${d}</svg>`;

const navy = C.navy;
const ICONS = {
  recepcion: icon(`
    <path d="M10 22 H38 V40 H10 Z" stroke="${navy}" stroke-width="2.5" stroke-linejoin="round"/>
    <path d="M24 6 V22" stroke="${navy}" stroke-width="2.5"/>
    <path d="M16 15 L24 23 L32 15" stroke="${navy}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>`),
  picking: icon(`
    <rect x="8" y="8" width="32" height="32" stroke="${navy}" stroke-width="2.5"/>
    <line x1="8" y1="20" x2="40" y2="20" stroke="${navy}" stroke-width="2.5"/>
    <line x1="8" y1="32" x2="40" y2="32" stroke="${navy}" stroke-width="2.5"/>`),
  packing: icon(`
    <rect x="8" y="16" width="32" height="24" stroke="${navy}" stroke-width="2.5"/>
    <line x1="8" y1="28" x2="40" y2="28" stroke="${navy}" stroke-width="2.5"/>
    <line x1="24" y1="16" x2="24" y2="40" stroke="${navy}" stroke-width="2.5"/>`),
  despacho: icon(`
    <rect x="6" y="18" width="22" height="18" stroke="${navy}" stroke-width="2.5"/>
    <path d="M30 27 H42" stroke="${navy}" stroke-width="2.5"/>
    <path d="M36 21 L42 27 L36 33" stroke="${navy}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>`),
  devoluciones: icon(`
    <path d="M30 12 A16 16 0 1 1 14 28" stroke="${navy}" stroke-width="2.5" fill="none" stroke-linecap="round"/>
    <path d="M22 6 L30 12 L23 17" stroke="${navy}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>`),
  // Guardar (estático): caja sellada, sin movimiento.
  guardar: icon(`
    <rect x="8" y="16" width="32" height="24" stroke="${C.slate}" stroke-width="2.5"/>
    <line x1="8" y1="28" x2="40" y2="28" stroke="${C.slate}" stroke-width="2.5"/>`, 64),
  // Operar (dinámico): entra y sale de la caja.
  operar: icon(`
    <rect x="16" y="16" width="16" height="16" stroke="${navy}" stroke-width="2.5"/>
    <path d="M2 24 H14" stroke="${navy}" stroke-width="2.5"/>
    <path d="M8 19 L14 24 L8 29" stroke="${navy}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M34 24 H46" stroke="${navy}" stroke-width="2.5"/>
    <path d="M40 19 L46 24 L40 29" stroke="${navy}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>`, 64),
  calendario: icon(`
    <rect x="7" y="10" width="34" height="30" stroke="${navy}" stroke-width="2.5"/>
    <line x1="7" y1="18" x2="41" y2="18" stroke="${navy}" stroke-width="2.5"/>
    <line x1="15" y1="6" x2="15" y2="14" stroke="${navy}" stroke-width="2.5" stroke-linecap="round"/>
    <line x1="33" y1="6" x2="33" y2="14" stroke="${navy}" stroke-width="2.5" stroke-linecap="round"/>
    <rect x="14" y="24" width="6" height="6" fill="${C.blue}"/>`),
  reloj: icon(`
    <circle cx="24" cy="24" r="17" stroke="${navy}" stroke-width="2.5"/>
    <path d="M24 14 V24 L32 29" stroke="${navy}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>`),
  expandir: icon(`
    <rect x="16" y="16" width="16" height="16" stroke="${navy}" stroke-width="2.5"/>
    <path d="M30 18 L42 6 M42 6 H33 M42 6 V15" stroke="${C.blue}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M18 30 L6 42 M6 42 H15 M6 42 V33" stroke="${C.blue}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>`),
};

// ── Encabezado institucional (igual que slideList en guias/build.js) ────────
const header = (kicker, name) => `
<div style="position:absolute;left:72px;right:72px;top:88px">
  <div style="display:flex;justify-content:space-between;align-items:baseline">
    <div class="eyebrow" style="color:${C.slate};font-size:20px">${kicker}</div>
    <div class="eyebrow" style="color:${C.slate};font-size:20px">${name}</div>
  </div>
  <div style="height:2px;background:${C.navy};margin-top:26px"></div>
</div>`;

const NAME = "Bodega para e-commerce";

// 1 — Portada: red de nodos abstracta como marca gráfica, sin foto
const slideCover = () => shell(`
<div class="slide" style="background:#fff">
  <div style="position:absolute;top:48px;right:48px;border:2px solid ${navy};color:${navy};
    font-family:'IBM Plex Mono',monospace;font-weight:500;font-size:19px;letter-spacing:.18em;
    padding:13px 24px">Desliza &rarr;</div>

  <div style="position:absolute;left:72px;top:430px;width:170px;height:170px;border-radius:50%;
    border:2.5px solid ${C.border}"></div>
  <div style="position:absolute;left:146px;top:504px;width:22px;height:22px;border-radius:50%;
    background:${C.blue}"></div>
  <div style="position:absolute;left:260px;top:514px;width:200px;height:2px;background:${C.blue}"></div>
  <div style="position:absolute;left:450px;top:504px;width:22px;height:22px;border-radius:50%;
    background:${navy}"></div>

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

// 2 — Concepto: guardar (estático) vs. operar (flujo)
const slideConcept = () => shell(`
<div class="slide" style="background:#fff">
  ${header("Por qu&eacute; es distinto", NAME)}
  <div style="position:absolute;left:72px;right:72px;top:180px">
    <h1 style="color:${navy};font-size:56px;line-height:1.18">No es guardar cosas,<br>es operar un negocio</h1>
  </div>

  <div style="position:absolute;left:150px;top:560px;width:300px;text-align:center">
    ${ICONS.guardar}
    <div style="font-family:Inter,sans-serif;font-weight:500;font-size:23px;color:${C.slate};margin-top:28px">Guardar cosas</div>
  </div>
  <div style="position:absolute;left:510px;top:605px;font-family:Fraunces,serif;font-size:40px;color:${C.border}">/</div>
  <div style="position:absolute;left:630px;top:560px;width:300px;text-align:center">
    ${ICONS.operar}
    <div style="font-family:Inter,sans-serif;font-weight:600;font-size:23px;color:${navy};margin-top:28px">Operar un negocio</div>
  </div>

  <div style="position:absolute;left:72px;right:72px;top:830px;text-align:center">
    <div style="font-family:Inter,sans-serif;font-weight:400;font-size:28px;color:${C.slate};line-height:1.5">
      Entra inventario, pero sobre todo sale &mdash; pedido por pedido, todos los d&iacute;as.
    </div>
  </div>
  ${brandRow(false, "2 / 6")}
</div>`);

// 3 — Flujo (ya aprobada) — ver marketing/mockups/flujo.js
const node = (n, key, label, x, y, dashed) => `
<div style="position:absolute;left:${x - 65}px;top:${y - 65}px;width:130px;text-align:center">
  <div style="width:110px;height:110px;margin:0 auto;border-radius:50%;
    border:${dashed ? "2.5px dashed" : "2.5px solid"} ${navy};
    display:flex;align-items:center;justify-content:center;position:relative;background:#fff">
    ${n ? `<div style="position:absolute;top:-10px;left:-10px;width:32px;height:32px;border-radius:50%;
      background:${C.blue};color:#fff;font-family:'IBM Plex Mono',monospace;font-weight:700;
      font-size:16px;display:flex;align-items:center;justify-content:center">${n}</div>` : ""}
    ${ICONS[key]}
  </div>
  <div style="font-family:Inter,sans-serif;font-weight:500;font-size:19px;color:${navy};margin-top:16px">${label}</div>
</div>`;

const arrow = (x1, x2, y) => `
<div style="position:absolute;left:${x1}px;top:${y - 1}px;width:${x2 - x1}px;height:2px;background:${C.blue}"></div>
<div style="position:absolute;left:${x2 - 7}px;top:${y - 6}px;width:0;height:0;
  border-top:6px solid transparent;border-bottom:6px solid transparent;border-left:9px solid ${C.blue}"></div>`;

const FLOW_Y = 520;
const FLOW_X = [162, 414, 666, 918];

const slideFlow = () => shell(`
<div class="slide" style="background:#fff">
  ${header("C&oacute;mo fluye tu operaci&oacute;n", NAME)}
  <div style="position:absolute;left:72px;right:72px;top:160px">
    <h1 style="color:${navy};font-size:52px;line-height:1.18">Del flujo ordenado<br>depende no caer en el caos</h1>
  </div>

  ${arrow(FLOW_X[0] + 55, FLOW_X[1] - 55, FLOW_Y)}
  ${arrow(FLOW_X[1] + 55, FLOW_X[2] - 55, FLOW_Y)}
  ${arrow(FLOW_X[2] + 55, FLOW_X[3] - 55, FLOW_Y)}

  ${node(1, "recepcion", "Recepci&oacute;n", FLOW_X[0], FLOW_Y)}
  ${node(2, "picking", "Picking", FLOW_X[1], FLOW_Y)}
  ${node(3, "packing", "Packing", FLOW_X[2], FLOW_Y)}
  ${node(4, "despacho", "Despacho", FLOW_X[3], FLOW_Y)}

  <div style="position:absolute;left:${FLOW_X[3] - 1}px;top:${FLOW_Y + 65}px;width:2px;height:120px;
    background:repeating-linear-gradient(to bottom, ${C.slate} 0 6px, transparent 6px 12px)"></div>
  ${node(null, "devoluciones", "Devoluciones", FLOW_X[3], FLOW_Y + 250, true)}
  <div style="position:absolute;left:${FLOW_X[3] - 140}px;top:${FLOW_Y + 342}px;width:280px;text-align:center">
    <div style="font-family:Inter,sans-serif;font-weight:400;font-size:17px;color:${C.slate};line-height:1.4">
      Aparte, para no mezclarlo con lo que s&iacute; est&aacute; listo para vender
    </div>
  </div>
  ${brandRow(false, "3 / 6")}
</div>`);

// 4 — Pasos: temporada alta, en vez del navy/numerado se usa la misma
// familia de nodos pero apilados verticalmente (distinto del flujo
// horizontal de la slide 3: acá es secuencia de razonamiento, no de proceso)
const stepRow = (n, key, text, y) => `
<div style="position:absolute;left:72px;top:${y}px;width:936px;display:flex;align-items:center;gap:32px">
  <div style="width:84px;height:84px;border-radius:50%;border:2.5px solid ${navy};flex:none;
    display:flex;align-items:center;justify-content:center;position:relative;background:#fff">
    <div style="position:absolute;top:-8px;left:-8px;width:28px;height:28px;border-radius:50%;
      background:${C.blue};color:#fff;font-family:'IBM Plex Mono',monospace;font-weight:700;
      font-size:14px;display:flex;align-items:center;justify-content:center">${n}</div>
    ${ICONS[key]}
  </div>
  <div style="font-family:Inter,sans-serif;font-weight:400;font-size:26px;color:${navy};line-height:1.35">${text}</div>
</div>`;

const slideSteps = () => shell(`
<div class="slide" style="background:#fff">
  ${header("Temporada alta", NAME)}
  <div style="position:absolute;left:72px;right:72px;top:160px">
    <h1 style="color:${navy};font-size:52px;line-height:1.18">La flexibilidad pesa<br>m&aacute;s que el precio</h1>
  </div>
  ${stepRow(1, "calendario", "CyberDay, Black Friday y Navidad<br>multiplican el despacho", 480)}
  ${stepRow(2, "reloj", "Dimensionar solo para el d&iacute;a a d&iacute;a te deja<br>corriendo detr&aacute;s del inventario", 630)}
  ${stepRow(3, "expandir", "Ampliar sin mudarte vale m&aacute;s que<br>ahorrar unas UF por m&sup2;", 780)}
  ${brandRow(false, "4 / 6")}
</div>`);

// 5 — Capacidad: dos recuadros anidados (hoy / ampliable), sin inventar cifras
const slideCapacity = () => shell(`
<div class="slide" style="background:#fff">
  ${header("Portal de Bodegas", NAME)}
  <div style="position:absolute;left:72px;right:72px;top:180px">
    <h1 style="color:${navy};font-size:56px;line-height:1.18">Ampliable<br>en el mismo recinto</h1>
  </div>

  <div style="position:absolute;left:290px;top:560px;width:500px;height:320px;
    border:2.5px dashed ${C.slate};display:flex;align-items:flex-start;justify-content:flex-start">
    <div style="margin:16px;font-family:'IBM Plex Mono',monospace;font-size:17px;letter-spacing:.14em;
      color:${C.slate};text-transform:uppercase">Ma&ntilde;ana</div>
  </div>
  <div style="position:absolute;left:340px;top:650px;width:260px;height:160px;
    border:2.5px solid ${navy};background:#fff;display:flex;align-items:flex-start;justify-content:flex-start">
    <div style="margin:14px;font-family:'IBM Plex Mono',monospace;font-size:17px;letter-spacing:.14em;
      color:${navy};text-transform:uppercase">Hoy</div>
  </div>
  <div style="position:absolute;left:470px;top:720px;width:0;height:0;
    border-top:10px solid transparent;border-bottom:10px solid transparent;border-left:14px solid ${C.blue}"></div>

  <div style="position:absolute;left:72px;right:72px;top:930px;text-align:center">
    <div style="font-family:Inter,sans-serif;font-weight:400;font-size:28px;color:${C.slate};line-height:1.5">
      Parte acotado y crece sin cambiar de direcci&oacute;n<br>cuando el volumen lo pida.
    </div>
  </div>
  ${brandRow(false, "5 / 6")}
</div>`);

// 6 — Cierre: navy + CTA, igual al resto de la serie (contraste con las 5
// slides blancas = la "llegada" después del recorrido informativo)
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
