// Generador de posts "Versus" — Portal de Bodegas
// Formato distinto a ../guias/ y ../recorrido/: pantalla dividida en dos
// colores planos, sin foto ni degradado, para comparar dos opciones que la
// gente confunde. 3 slides en vez de 6: pregunta, comparación, cierre.
// Renderiza 1080x1350 (4:5), igual que las otras series.
const { chromium } = require("playwright");
const fs = require("fs");
const path = require("path");
const { C, shell, brandRow, whatsappButton } = require("../shared/brand.js");

const CHROME =
  process.env.CHROME_PATH ||
  "/opt/pw-browsers/chromium-1194/chrome-linux/chrome";

const vsBadge = () => `
<div style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);
  width:130px;height:130px;border-radius:50%;background:${C.blue};
  display:flex;align-items:center;justify-content:center;border:6px solid #fff;z-index:2">
  <span style="font-family:'IBM Plex Mono',monospace;font-weight:700;font-size:38px;
    color:#fff;letter-spacing:.05em">VS</span>
</div>`;

// Oscurece una franja inferior para que el logo (y su acento azul) tengan
// contraste parejo sin importar sobre qué mitad de color caiga.
const bottomScrim = () => `
<div style="position:absolute;left:0;right:0;bottom:0;height:170px;background:
  linear-gradient(to top, rgba(1,25,67,.62) 0%, rgba(1,25,67,0) 100%)"></div>`;

// Caja (self-storage): un box chico, cerrado — en contraste de tamaño y
// forma con la bodega, para que cada lado se reconozca sin leer el label.
const boxIcon = (size) => `
<svg width="${size}" height="${size}" viewBox="0 0 48 48" fill="none" style="flex:none">
  <path d="M24 6 L42 16 L42 34 L24 44 L6 34 L6 16 Z" stroke="#fff" stroke-width="2.5" stroke-linejoin="round"/>
  <path d="M6 16 L24 26 L42 16" stroke="#fff" stroke-width="2.5" stroke-linejoin="round"/>
  <line x1="24" y1="26" x2="24" y2="44" stroke="#fff" stroke-width="2.5"/>
</svg>`;

// Bodega industrial: mismo motivo de techo a dos aguas que el logo, pero
// como nave grande con portón — más ancha y con acceso de carga.
const warehouseIcon = (size) => `
<svg width="${Math.round(size * 1.21)}" height="${size}" viewBox="0 0 58 48" fill="none" style="flex:none">
  <path d="M4 22 L29 6 L54 22 L54 42 L4 42 Z" stroke="#fff" stroke-width="2.5" stroke-linejoin="round"/>
  <rect x="21" y="26" width="16" height="16" stroke="#fff" stroke-width="2.5"/>
</svg>`;

// 1 — Portada: pantalla partida, un ícono grande por lado como protagonista
const slideHook = (v) =>
  shell(`
<div class="slide">
  <div style="position:absolute;inset:0;left:0;width:540px;background:${C.slate}"></div>
  <div style="position:absolute;inset:0;left:540px;width:540px;background:${C.navy}"></div>
  <div style="position:absolute;top:150px;left:0;width:540px;text-align:center">
    <div style="display:flex;justify-content:center">${boxIcon(118)}</div>
    <div class="eyebrow" style="color:rgba(255,255,255,.88);font-size:21px;margin-top:30px">${v.left.label}</div>
  </div>
  <div style="position:absolute;top:150px;left:540px;width:540px;text-align:center">
    <div style="display:flex;justify-content:center">${warehouseIcon(118)}</div>
    <div class="eyebrow" style="color:${C.blueLight};font-size:21px;margin-top:30px">${v.right.label}</div>
  </div>
  ${vsBadge()}
  <div style="position:absolute;left:72px;right:72px;top:830px;text-align:center">
    <h1 style="font-size:66px;color:#fff">${v.question}</h1>
    <div class="sub" style="text-align:center;max-width:100%;margin:26px auto 0">${v.hook}</div>
  </div>
  ${bottomScrim()}
  ${brandRow(true, "1 / 3")}
</div>`);

// 2 — Comparación lado a lado, fila por fila
const slideCompare = (v) => {
  const n = v.rows.length;
  const top = 165;
  const bottom = 1180;
  const rowH = (bottom - top) / n;
  const rows = v.rows
    .map((r, i) => {
      const y = top + i * rowH;
      return `
    <div style="position:absolute;left:0;right:0;top:${y}px;height:${rowH}px;
      border-top:${i === 0 ? "0" : "1px solid rgba(255,255,255,.14)"}">
      <div style="position:absolute;top:50%;left:60px;width:360px;transform:translateY(-50%)">
        <span style="font-family:Inter,sans-serif;font-weight:500;font-size:27px;color:#fff">${r.left}</span>
      </div>
      <div style="position:absolute;top:50%;left:660px;right:60px;transform:translateY(-50%)">
        <span style="font-family:Inter,sans-serif;font-weight:500;font-size:27px;color:#fff">${r.right}</span>
      </div>
      <div style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);
        background:#fff;color:${C.navy};font-family:'IBM Plex Mono',monospace;font-weight:600;
        font-size:16px;letter-spacing:.1em;text-transform:uppercase;padding:9px 16px;
        white-space:nowrap;z-index:2">${r.label}</div>
    </div>`;
    })
    .join("");
  return shell(`
<div class="slide">
  <div style="position:absolute;inset:0;left:0;width:540px;background:${C.slate}"></div>
  <div style="position:absolute;inset:0;left:540px;width:540px;background:${C.navy}"></div>
  <div style="position:absolute;left:72px;right:72px;top:60px;display:flex;justify-content:space-between">
    <div class="eyebrow" style="color:rgba(255,255,255,.8);font-size:19px">${v.left.label}</div>
    <div class="eyebrow" style="color:${C.blueLight};font-size:19px">${v.right.label}</div>
  </div>
  ${rows}
  ${bottomScrim()}
  ${brandRow(true, "2 / 3")}
</div>`);
};

// 3 — Cierre: ambos lados convergen en navy, CTA a WhatsApp
const slideCta = (v) =>
  shell(`
<div class="slide">
  <div style="position:absolute;inset:0;background:
    radial-gradient(120% 80% at 50% 0%, #0d2444 0%, ${C.navy} 62%)"></div>
  <div style="position:absolute;left:72px;right:72px;top:420px">
    <div class="eyebrow">${v.ctaKicker}</div>
    <div class="rule"></div>
    <h1 style="font-size:66px">${v.ctaHead}</h1>
    <div class="sub" style="margin-top:30px">${v.ctaSub}</div>
    ${whatsappButton("Cotiza por WhatsApp")}
  </div>
  ${brandRow(true, "3 / 3")}
</div>`);

// ── Bodega industrial vs. self-storage ──────────────────────────────────────
// Contenido condensado de lib/guias.js: "bodega-industrial-vs-self-storage".
const SELF_STORAGE = {
  id: "bodega-vs-self-storage",
  name: "Bodega industrial vs. self-storage",
  left: { label: "Self-storage" },
  right: { label: "Bodega industrial" },
  question: "&iquest;Guardas cosas,<br>u operas un negocio?",
  hook: "Se buscan casi con las mismas palabras &mdash; no resuelven el mismo problema.",
  rows: [
    { label: "Superficie", left: "1 a 30 m&sup2;", right: "Desde 180 m&sup2;" },
    { label: "Acceso", left: "Personas, sin cami&oacute;n", right: "Cami&oacute;n y maquinaria" },
    { label: "Uso permitido", left: "Guardar objetos", right: "Operar tu empresa" },
    { label: "Precio", left: "Alto por m&sup2;", right: "Desde 0,13 UF/m&sup2;/mes" },
  ],
  ctaKicker: "Comparativa &middot; Bodega vs. self-storage",
  ctaHead: "&iquest;Tu operaci&oacute;n ya necesita<br>m&aacute;s que un box?",
  ctaSub: "Bodegas industriales en San Bernardo, desde 180 m&sup2;.<br>Trato directo con el propietario.",
};

const ALL = [SELF_STORAGE];

(async () => {
  const filter = process.argv[2];
  const targets = filter ? ALL.filter((v) => v.id === filter) : ALL;

  if (filter && targets.length === 0) {
    console.error(`Desconocido: "${filter}". Disponibles: ${ALL.map((v) => v.id).join(", ")}`);
    process.exit(1);
  }

  const browser = await chromium.launch({ executablePath: CHROME });
  const page = await browser.newPage({
    viewport: { width: 1080, height: 1350 },
    deviceScaleFactor: 1,
  });

  for (const v of targets) {
    const outDir = path.join(__dirname, "salida", v.id);
    fs.mkdirSync(outDir, { recursive: true });

    const pages = [slideHook(v), slideCompare(v), slideCta(v)];

    console.log(`\n${v.name} (${v.id})`);
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
