// Generador de "Informes" — Portal de Bodegas
// Cuarta familia visual. A diferencia de ../diagramas/ (un post con un
// dato dibujado), acá el objeto es un informe de mercado publicado: se
// repite todos los meses con el mismo formato y cambia solo la data.
// Por eso tiene cabecera fija con número de edición, secciones
// numeradas, pie de fuente en cada lámina y una lámina de metodología.
// Renderiza 8 slides de 1080x1350 (4:5).
const { chromium } = require("playwright");
const fs = require("fs");
const path = require("path");
const { C, shell, brandRow, whatsappButton, photo } = require("../shared/brand.js");

const CHROME =
  process.env.CHROME_PATH ||
  "/opt/pw-browsers/chromium-1194/chrome-linux/chrome";

const navy = C.navy;
const W = "#fff";
const N = 8; // láminas por informe

// ── Chrome del informe ────────────────────────────────────────────────
// La cabecera va en TODAS las láminas: es lo que hace que una lámina
// suelta, compartida fuera de contexto, siga leyéndose como parte de un
// informe y no como una imagen cualquiera.
const masthead = (edicion) => `
<div style="position:absolute;left:0;top:0;width:1080px;height:96px;background:${navy};
  border-bottom:3px solid ${C.blue}">
  <div style="position:absolute;left:72px;top:36px;font-family:'IBM Plex Mono',monospace;font-weight:600;
    font-size:20px;letter-spacing:.22em;color:#fff;text-transform:uppercase">Informe de mercado</div>
  <div style="position:absolute;right:72px;top:36px;font-family:'IBM Plex Mono',monospace;font-weight:500;
    font-size:20px;letter-spacing:.22em;color:${C.blueLight};text-transform:uppercase">${edicion}</div>
</div>`;

const seccion = (n, titulo) => `
<div style="position:absolute;left:72px;top:148px;display:flex;align-items:baseline;gap:18px">
  <div style="font-family:'IBM Plex Mono',monospace;font-weight:700;font-size:21px;color:${C.blue};
    letter-spacing:.1em">${n}</div>
  <div style="font-family:'IBM Plex Mono',monospace;font-weight:500;font-size:21px;color:${C.slate};
    letter-spacing:.2em;text-transform:uppercase">${titulo}</div>
</div>`;

// Pie de fuente por lámina. En un informe la atribución no es letra
// chica legal: es parte de lo que se está publicando.
const pie = (fuente) => `
<div style="position:absolute;left:72px;right:72px;top:1150px;height:1px;background:${C.border}"></div>
<div style="position:absolute;left:72px;right:72px;top:1170px;font-family:'IBM Plex Mono',monospace;
  font-weight:500;font-size:17px;letter-spacing:.08em;color:${C.slate};text-transform:uppercase">Fuente: ${fuente}</div>`;

const titular = (texto, size) => `
<div style="position:absolute;left:72px;right:72px;top:206px">
  <h1 style="color:${navy};font-size:${size}px;line-height:1.18">${texto}</h1>
</div>`;

const bajada = (top, texto, size = 27) => `
<div style="position:absolute;left:72px;right:72px;top:${top}px">
  <div style="font-family:Inter,sans-serif;font-weight:400;font-size:${size}px;color:${C.slate};
    line-height:1.45">${texto}</div>
</div>`;

const remate = (top, texto) => `
<div style="position:absolute;left:72px;right:72px;top:${top}px;border-top:2px solid ${C.border};padding-top:30px">
  <div style="font-family:Inter,sans-serif;font-weight:400;font-size:26px;color:${C.slate};line-height:1.45">${texto}</div>
</div>`;

const icon = (d, size = 50) => `
<svg width="${size}" height="${size}" viewBox="0 0 48 48" fill="none" style="flex:none">${d}</svg>`;

const D = {
  contrato: `
    <rect x="10" y="6" width="28" height="36" stroke="${W}" stroke-width="2.5"/>
    <line x1="17" y1="16" x2="31" y2="16" stroke="${W}" stroke-width="2.5" stroke-linecap="round"/>
    <line x1="17" y1="23" x2="31" y2="23" stroke="${W}" stroke-width="2.5" stroke-linecap="round"/>
    <path d="M17 31 L22 36 L32 26" stroke="${W}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>`,
  reloj: `
    <circle cx="24" cy="24" r="17" stroke="${W}" stroke-width="2.5"/>
    <path d="M24 14 V24 L32 29" stroke="${W}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>`,
  calendario: `
    <rect x="7" y="10" width="34" height="30" rx="2" stroke="${W}" stroke-width="2.5"/>
    <line x1="7" y1="18" x2="41" y2="18" stroke="${W}" stroke-width="2.5"/>
    <line x1="15" y1="6" x2="15" y2="14" stroke="${W}" stroke-width="2.5" stroke-linecap="round"/>
    <line x1="33" y1="6" x2="33" y2="14" stroke="${W}" stroke-width="2.5" stroke-linecap="round"/>
    <rect x="14" y="24" width="6" height="6" fill="${W}"/>`,
};

const circulo = (size, fill, content, badge) => `
<div style="width:${size}px;height:${size}px;border-radius:50%;background:${fill};
  display:flex;align-items:center;justify-content:center;position:relative;flex:none;
  box-shadow:0 14px 28px rgba(1,25,67,.22)">${badge || ""}${content}</div>`;

const numberBadge = (n) => `
<div style="position:absolute;top:-10px;left:-10px;width:34px;height:34px;border-radius:50%;
  background:${C.blue};color:#fff;font-family:'IBM Plex Mono',monospace;font-weight:700;
  font-size:16px;display:flex;align-items:center;justify-content:center;
  box-shadow:0 4px 10px rgba(1,25,67,.3)">${n}</div>`;

// Fila numerada con ícono — se reusa en la lámina de plazos.
const filaNumerada = (n, iconHtml, title, desc, y, x = 128) => `
<div style="position:absolute;left:${x - 58}px;top:${y - 58}px">
  ${circulo(116, navy, iconHtml, numberBadge(n))}
</div>
<div style="position:absolute;left:${x + 90}px;top:${y - 61}px;width:780px">
  <div style="font-family:'Plus Jakarta Sans',sans-serif;font-weight:800;font-size:31px;color:${navy};
    letter-spacing:-.01em">${title}</div>
  <div style="font-family:Inter,sans-serif;font-weight:400;font-size:26px;color:${C.slate};line-height:1.4;
    margin-top:12px">${desc}</div>
</div>`;

// ══════════════════════════════════════════════════════════════════════
// Informe Nº 04 — Octubre 2026
// Guía correspondiente: mercado-bodegas-santiago-octubre-2026
// ══════════════════════════════════════════════════════════════════════
function informeOctubre2026() {
  const EDICION = "N&ordm; 04 &middot; Octubre 2026";
  const M = masthead(EDICION);

  // ── Portada: cubierta de informe, no portada de post. Sin titular
  // sobre foto: el índice es lo que avisa que esto es un documento.
  const indice = [
    ["01", "Vacancia"],
    ["02", "Precio por m&sup2;"],
    ["03", "Clase A y clase B"],
    ["04", "Brecha por calidad"],
    ["05", "Plazos"],
  ];

  const slidePortada = () => shell(`
<div class="slide">
  <div style="position:absolute;inset:0;background:${navy}"></div>
  ${M}

  <div style="position:absolute;left:72px;right:72px;top:176px">
    <div class="eyebrow" style="font-size:20px">Bodegas &middot; Regi&oacute;n Metropolitana</div>
    <div style="width:92px;height:4px;background:${C.blue};margin:24px 0 30px"></div>
    <h1 style="color:#fff;font-size:76px;line-height:1.04;letter-spacing:-.02em">Dos mercados,<br>dos direcciones</h1>
    <div style="font-family:Inter,sans-serif;font-weight:300;font-size:30px;color:rgba(255,255,255,.82);
      line-height:1.45;margin-top:28px;max-width:860px">
      La bodega industrial escasea. La minibodega sobra.<br>Qu&eacute; dicen las cifras de este mes, y de d&oacute;nde salen.
    </div>
  </div>

  <div style="position:absolute;left:72px;right:72px;top:620px">
    ${indice
      .map(
        ([n, t]) => `
    <div style="display:flex;align-items:baseline;gap:22px;padding:11px 0;
      border-bottom:1px solid rgba(255,255,255,.14)">
      <div style="font-family:'IBM Plex Mono',monospace;font-weight:700;font-size:19px;color:${C.blue};
        letter-spacing:.1em">${n}</div>
      <div style="font-family:'IBM Plex Mono',monospace;font-weight:500;font-size:19px;
        color:rgba(255,255,255,.80);letter-spacing:.18em;text-transform:uppercase">${t}</div>
    </div>`
      )
      .join("")}
  </div>

  <img src="${photo("alto-las-acacias", 1)}"
    style="position:absolute;left:0;top:940px;width:1080px;height:240px;object-fit:cover;object-position:50% 38%">

  ${brandRow(true, `1 / ${N}`)}
</div>`);

  // ── 01 Vacancia: la divergencia, a escala real y sin truncar el eje.
  const BASE = 980, VMAX = 31.7, VH = 420, BW = 250;

  const barraV = (cx, pct, fill, nombre, delta) => {
    const h = Math.round((pct / VMAX) * VH);
    return `
<div style="position:absolute;left:${cx - BW / 2}px;top:${BASE - h}px;width:${BW}px;height:${h}px;
  background:${fill};border-radius:6px 6px 0 0"></div>
<div style="position:absolute;left:${cx - BW / 2}px;top:${BASE - h - 84}px;width:${BW}px;text-align:center;
  font-family:'Plus Jakarta Sans',sans-serif;font-weight:800;font-size:60px;color:${fill};
  letter-spacing:-.03em">${pct.toString().replace(".", ",")}%</div>
<div style="position:absolute;left:${cx - BW / 2 - 40}px;top:${BASE + 26}px;width:${BW + 80}px;text-align:center">
  <div style="font-family:Inter,sans-serif;font-weight:600;font-size:28px;color:${navy}">${nombre}</div>
  <div style="font-family:'IBM Plex Mono',monospace;font-weight:500;font-size:21px;color:${C.slate};
    margin-top:12px">${delta}</div>
</div>`;
  };

  const slideVacancia = () => shell(`
<div class="slide" style="background:#fff">
  ${M}${seccion("01", "Vacancia")}
  ${titular("La bodega industrial escasea.<br>La minibodega sobra.", 46)}
  <div style="position:absolute;left:72px;right:72px;top:${BASE}px;height:3px;background:${C.border}"></div>
  ${barraV(330, 3.59, navy, "Bodega industrial", "desde 3,69% &darr;")}
  ${barraV(750, 31.7, C.slate, "Minibodega", "desde 28,5% &uarr;")}
  ${pie("NAI Sarr&agrave; 1S 2026 (industrial) &middot; Colliers octubre 2026 (minibodegas)")}
  ${brandRow(false, `2 / ${N}`)}
</div>`);

  // ── 02 Precio: cada barra declara qué incluye ese precio. Sin eso la
  // comparación no es honesta: no miden lo mismo.
  const PX0 = 72, PMAX = 0.4, PW = 620, PBH = 72;

  const barraH = (top, pct, fill, nombre, valor, incluye) => {
    const w = Math.round((pct / PMAX) * PW);
    return `
<div style="position:absolute;left:${PX0}px;top:${top}px;font-family:Inter,sans-serif;font-weight:600;
  font-size:28px;color:${navy}">${nombre}</div>
<div style="position:absolute;left:${PX0}px;top:${top + 44}px;width:${w}px;height:${PBH}px;background:${fill};
  border-radius:0 6px 6px 0"></div>
<div style="position:absolute;left:${PX0 + w + 26}px;top:${top + 48}px;font-family:'Plus Jakarta Sans',sans-serif;
  font-weight:800;font-size:42px;color:${fill};letter-spacing:-.02em">${valor}</div>
<div style="position:absolute;left:${PX0}px;right:72px;top:${top + 132}px;font-family:Inter,sans-serif;
  font-weight:400;font-size:23px;color:${C.slate};line-height:1.4">${incluye}</div>`;
  };

  const slidePrecio = () => shell(`
<div class="slide" style="background:#fff">
  ${M}${seccion("02", "Precio por m&sup2;")}
  ${titular("El metro chico se paga<br>m&aacute;s caro", 48)}
  ${barraH(400, 0.148, navy, "Bodega industrial", "0,148 UF/m&sup2;", "Precio pedido promedio. Gastos comunes y consumos van aparte.")}
  ${barraH(640, 0.356, C.slate, "Minibodega", "0,356 UF/m&sup2;", "Promedio. Suele venir con gastos comunes, seguridad y acceso incluidos.")}
  ${remate(880, "No miden lo mismo, y aun ajustando por eso la brecha por m&sup2; sigue siendo de m&aacute;s del doble. Es lo esperable: los metros a granel siempre salen m&aacute;s baratos por unidad.")}
  ${pie("Cushman &amp; Wakefield 2T 2026 &middot; Colliers octubre 2026")}
  ${brandRow(false, `3 / ${N}`)}
</div>`);

  // ── 03 Glosario: los informes usan "clase A" y "clase B" todo el
  // tiempo sin explicarlos. Acá se explican antes de usarlos.
  const CRITERIOS = [
    ["Altura libre", "Cu&aacute;nto se puede apilar en vertical. Los centros de mayor est&aacute;ndar rondan los 10 a 12 metros al hombro."],
    ["Andenes de carga", "Muelles elevados con niveladores, para cargar el cami&oacute;n a nivel del piso de bodega."],
    ["Protecci&oacute;n contra incendios", "Redes h&uacute;meda y seca; en el est&aacute;ndar m&aacute;s alto, factibilidad o instalaci&oacute;n de rociadores."],
    ["Radier y patio de maniobras", "Piso que aguante gr&uacute;as y racks, y espacio real para que gire un cami&oacute;n completo."],
  ];

  const criterio = ([term, desc], i) => {
    const y = 500 + i * 140;
    return `
<div style="position:absolute;left:72px;top:${y + 12}px;width:16px;height:16px;background:${C.blue};
  border-radius:3px"></div>
<div style="position:absolute;left:116px;right:72px;top:${y}px">
  <div style="font-family:'Plus Jakarta Sans',sans-serif;font-weight:800;font-size:29px;color:${navy};
    letter-spacing:-.01em">${term}</div>
  <div style="font-family:Inter,sans-serif;font-weight:400;font-size:25px;color:${C.slate};line-height:1.4;
    margin-top:10px">${desc}</div>
</div>`;
  };

  const slideGlosario = () => shell(`
<div class="slide" style="background:#fff">
  ${M}${seccion("03", "Glosario")}
  ${titular("Clase A y clase B<br>no son una norma", 48)}
  ${bajada(362, "Es una convenci&oacute;n de mercado, no una certificaci&oacute;n oficial, y cada consultora la pondera a su manera. Esto es lo que se eval&uacute;a:")}
  ${CRITERIOS.map(criterio).join("")}
  ${pie("Criterios descritos por CBRE y Cushman &amp; Wakefield en prensa del rubro")}
  ${brandRow(false, `4 / ${N}`)}
</div>`);

  // ── 04 Brecha por calidad: burbujas escaladas por área, no por
  // diámetro — si no, se exagera la diferencia.
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
  ${M}${seccion("04", "Brecha por calidad")}
  ${titular("No es que no haya bodegas.<br>No hay bodegas buenas.", 48)}
  ${burbuja(320, 620, dA, navy, "1,21%", "Vacancia clase A")}
  ${burbuja(740, 620, dB, C.slate, "5,95%", "Vacancia clase B")}
  ${remate(910, "El espacio sobra donde el est&aacute;ndar no alcanza. Quien busca clase A compite por un stock m&iacute;nimo.")}
  ${pie("NAI Sarr&agrave; 1S 2026 &middot; burbujas a escala de &aacute;rea")}
  ${brandRow(false, `5 / ${N}`)}
</div>`);

  const PY = [490, 710, 930];

  const slidePlazos = () => shell(`
<div class="slide" style="background:#fff">
  ${M}${seccion("05", "Plazos")}
  ${titular("El mercado se compromete<br>antes de existir", 46)}
  <div style="position:absolute;left:126.5px;top:${PY[0] + 58}px;width:3px;height:${PY[2] - PY[0] - 116}px;
    background:${C.border}"></div>
  ${filaNumerada(1, icon(D.contrato), "61,5% ya est&aacute; prearrendado", "De la superficie en construcci&oacute;n en la Regi&oacute;n Metropolitana, seis de cada diez ya tienen arrendatario antes de terminarse.", PY[0])}
  ${filaNumerada(2, icon(D.reloj), "4 a 5 a&ntilde;os para desarrollar", "Lo que toma conseguir terreno, permisos y construir. La oferta no puede reaccionar r&aacute;pido aunque la demanda apriete.", PY[1])}
  ${filaNumerada(3, icon(D.calendario), "18 a 24 meses de anticipaci&oacute;n", "El plazo con que la prensa del rubro recomienda planificar una operaci&oacute;n nueva.", PY[2])}
  ${pie("Cushman &amp; Wakefield 2T 2026 &middot; CBRE &middot; prensa del rubro")}
  ${brandRow(false, `6 / ${N}`)}
</div>`);

  // ── Fuentes: cifra por cifra, más la advertencia metodológica. Es la
  // lámina que separa un informe de una infografía.
  const FUENTES = [
    ["NAI Sarr&agrave;", "1<sup>er</sup> semestre 2026", "Vacancia industrial: 3,59% general, 1,21% clase A y 5,95% clase B. Absorci&oacute;n por submercado."],
    ["Colliers", "Octubre 2026", "Minibodegas: inventario de 396.035 m&sup2;, vacancia de 28,5% a 31,7% y precio promedio de 0,356 UF/m&sup2;."],
    ["Cushman &amp; Wakefield", "2&ordm; trimestre 2026", "Precio pedido industrial de 0,148 UF/m&sup2; y 61,5% de la superficie en construcci&oacute;n ya prearrendada."],
    ["CBRE", "2026", "Plazo de cuatro a cinco a&ntilde;os para desarrollar y proyecci&oacute;n de superficie nueva para el a&ntilde;o."],
  ];

  const fuenteRow = ([nombre, periodo, aporta], i) => {
    const y = 380 + i * 142;
    return `
<div style="position:absolute;left:72px;right:72px;top:${y}px">
  <div style="font-family:'IBM Plex Mono',monospace;font-weight:600;font-size:20px;letter-spacing:.14em;
    text-transform:uppercase;color:${C.blue}">${nombre} <span style="color:${C.slate}">&middot; ${periodo}</span></div>
  <div style="font-family:Inter,sans-serif;font-weight:400;font-size:25px;color:${navy};line-height:1.4;
    margin-top:10px">${aporta}</div>
</div>`;
  };

  const slideFuentes = () => shell(`
<div class="slide" style="background:#fff">
  ${M}${seccion("&mdash;", "Fuentes y metodolog&iacute;a")}
  ${titular("De d&oacute;nde sale<br>cada cifra", 48)}
  ${FUENTES.map(fuenteRow).join("")}

  <div style="position:absolute;left:72px;right:72px;top:920px;background:rgba(6,133,222,.07);
    border-radius:16px;padding:28px 32px">
    <div style="font-family:Inter,sans-serif;font-weight:400;font-size:23px;color:${C.slate};line-height:1.45">
      Accedimos a los reportes v&iacute;a su cobertura en prensa especializada, no a los documentos
      originales. Cada consultora mide un universo distinto, as&iacute; que las cifras no son
      comparables entre s&iacute;: lo comparable es la tendencia. A octubre no hay publicado un
      reporte industrial del 3<sup>er</sup> trimestre, y no extrapolamos uno.
    </div>
  </div>
  ${pie("Elaboraci&oacute;n Portal de Bodegas &middot; Octubre 2026")}
  ${brandRow(false, `7 / ${N}`)}
</div>`);

  const slideCta = () => shell(`
<div class="slide">
  <div style="position:absolute;inset:0;background:
    radial-gradient(120% 80% at 50% 0%, #0d2444 0%, ${navy} 62%)"></div>
  ${M}
  <div style="position:absolute;left:72px;right:72px;top:430px">
    <div class="eyebrow">Informe N&ordm; 04 &middot; Octubre 2026</div>
    <div class="rule"></div>
    <h1 style="font-size:66px">&iquest;Necesitas bodega<br>con plazos reales?</h1>
    <div class="sub" style="margin-top:30px">Cu&eacute;ntanos metraje y uso,<br>y te cotizamos hoy mismo.</div>
    ${whatsappButton("Cotiza por WhatsApp")}
  </div>
  ${brandRow(true, `${N} / ${N}`)}
</div>`);

  return {
    id: "mercado-bodegas-santiago-octubre-2026",
    name: "Informe Nº 04 — octubre 2026",
    slides: [
      slidePortada, slideVacancia, slidePrecio, slideGlosario,
      slideCalidad, slidePlazos, slideFuentes, slideCta,
    ],
  };
}

// ── Render ────────────────────────────────────────────────────────────
const INFORMES = [informeOctubre2026()];

(async () => {
  const filtro = process.argv.slice(2);
  const sel = filtro.length ? INFORMES.filter((p) => filtro.includes(p.id)) : INFORMES;
  if (!sel.length) {
    console.error(`No hay informe con ese id. Disponibles: ${INFORMES.map((p) => p.id).join(", ")}`);
    process.exit(1);
  }

  const browser = await chromium.launch({ executablePath: CHROME });
  const page = await browser.newPage({ viewport: { width: 1080, height: 1350 }, deviceScaleFactor: 1 });

  for (const inf of sel) {
    const outDir = path.join(__dirname, "salida", inf.id);
    fs.mkdirSync(outDir, { recursive: true });

    console.log(`\n${inf.name} (${inf.id})`);
    for (let i = 0; i < inf.slides.length; i++) {
      await page.setContent(inf.slides[i](), { waitUntil: "load" });
      await page.evaluate(() => document.fonts.ready);
      await page.waitForTimeout(250);
      const file = path.join(outDir, `slide-${String(i + 1).padStart(2, "0")}.png`);
      await page.screenshot({ path: file });
      console.log("✓", path.basename(file));
    }
  }
  await browser.close();
})();
