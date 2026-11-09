// Generador de video — Portal de Bodegas
// Renderiza una animación cuadro a cuadro con Playwright y la ensambla con
// ffmpeg. A diferencia de ../shared/video.js, que hace Ken Burns sobre PNG
// ya existentes, acá la animación se calcula: el DOM se construye una vez y
// cada cuadro solo actualiza estilos, que es lo que hace viable renderizar
// cientos de cuadros en un rato razonable.
//
// Formato: 1080x1920 (9:16) para reel. 24 fps.
const { chromium } = require("playwright");
const { execFileSync } = require("child_process");
const fs = require("fs");
const path = require("path");
const { C, FONTS, photo, logo, wordmark, chromePath } = require("../shared/brand.js");
const { PROJECTS, m2 } = require("../../lib/data.js");

const W = 1080, H = 1920, FPS = 24;
const navy = C.navy;

// ── Guion ─────────────────────────────────────────────────────────────
// Cada escena declara su ventana de tiempo. Las transiciones se solapan
// medio segundo para que no se vea el corte.
const T = {
  intro:     [0.0,  3.6],
  rutas:     [3.2, 10.8],
  proyectos: [10.4, 19.6],
  aerea:     [19.2, 24.6],
  cierre:    [24.2, 28.0],
};
const DUR = T.cierre[1];

const RUTAS = [
  ["Ruta 5 Sur", "Distribuci&oacute;n nacional", -45],
  ["A. Vespucio", "&Uacute;ltima milla en Santiago", -135],
  ["Ruta 78", "Puerto de San Antonio", 135],
  ["Acceso Sur", "Carga de la capital", 45],
];

// Los metrajes salen de lib/data.js, no se escriben a mano.
const FICHAS = PROJECTS.map((p) => ({
  nombre: p.name,
  rango: p.min === p.max ? m2(p.min) : `${p.min.toLocaleString("es-CL")} – ${m2(p.max)}`,
}));

const html = () => `<!doctype html><html lang="es"><head><meta charset="utf-8">
<style>
${FONTS}
*{margin:0;padding:0;box-sizing:border-box}
html,body{width:${W}px;height:${H}px;overflow:hidden}
body{font-family:Inter,sans-serif;-webkit-font-smoothing:antialiased;background:${navy}}
.stage{position:relative;width:${W}px;height:${H}px;overflow:hidden;background:${navy}}
.layer{position:absolute;inset:0;opacity:0}
h1{font-family:Fraunces,Georgia,serif;font-weight:600;color:#fff;letter-spacing:-.02em;line-height:1.04}
.mono{font-family:'IBM Plex Mono',monospace;font-weight:500;letter-spacing:.22em;text-transform:uppercase}
.jak{font-family:'Plus Jakarta Sans',sans-serif;font-weight:800;letter-spacing:-.01em}
.wm{font-family:'Plus Jakarta Sans',sans-serif;font-weight:800;font-size:52px;letter-spacing:-.01em}
</style></head><body>
<div class="stage">

  <!-- 1 · Intro -->
  <div class="layer" id="intro">
    <div style="position:absolute;left:96px;right:96px;top:760px">
      <div class="mono" id="intro-k" style="font-size:28px;color:${C.blueLight}">Regi&oacute;n Metropolitana</div>
      <div id="intro-rule" style="width:0;height:5px;background:${C.blue};margin:34px 0 40px"></div>
      <h1 id="intro-h" style="font-size:120px">San<br>Bernardo</h1>
    </div>
  </div>

  <!-- 2 · Las rutas -->
  <div class="layer" id="rutas">
    <div class="mono" style="position:absolute;left:96px;top:300px;font-size:26px;color:${C.blueLight}">Conectividad</div>
    <h1 style="position:absolute;left:96px;right:96px;top:360px;font-size:62px">Cuatro salidas<br>troncales</h1>
    ${RUTAS.map(
      (r, i) => `
    <div class="ruta-spoke" data-i="${i}" style="position:absolute;left:540px;top:1058px;width:0;height:5px;
      background:${C.blue};transform:rotate(${r[2]}deg);transform-origin:left center"></div>
    <div class="ruta-dot" data-i="${i}" style="position:absolute;left:540px;top:1049px;width:0;height:0;
      transform:rotate(${r[2]}deg);transform-origin:left center">
      <div style="position:absolute;left:216px;top:0;width:24px;height:24px;background:#fff;border-radius:4px"></div>
    </div>`
    ).join("")}
    ${RUTAS.map(
      (r, i) => `
    <div class="ruta-lbl" data-i="${i}" style="position:absolute;${
        [-45, 45].includes(r[2]) ? "left:684px" : "left:96px;text-align:right"
      };width:300px;top:${r[2] < 0 ? 700 : 1300}px;opacity:0">
      <div class="mono" style="font-size:24px;color:${C.blue}">${r[0]}</div>
      <div style="font-family:Inter,sans-serif;font-weight:400;font-size:28px;color:rgba(255,255,255,.88);
        line-height:1.3;margin-top:12px">${r[1]}</div>
    </div>`
    ).join("")}
    <div id="hub" style="position:absolute;left:432px;top:950px;width:216px;height:216px;border-radius:50%;
      background:#fff;display:flex;align-items:center;justify-content:center;
      box-shadow:0 24px 60px rgba(0,0,0,.4)">
      <div class="jak" style="font-size:36px;color:${navy};text-align:center;line-height:1.1">San<br>Bernardo</div>
    </div>
  </div>

  <!-- 3 · Los proyectos -->
  <div class="layer" id="proyectos">
    <div class="mono" style="position:absolute;left:96px;top:300px;font-size:26px;color:${C.blueLight}">Nuestros proyectos</div>
    <h1 style="position:absolute;left:96px;right:96px;top:360px;font-size:62px">Cinco recintos<br>en San Bernardo</h1>
    ${FICHAS.map(
      (f, i) => `
    <div class="ficha" data-i="${i}" style="position:absolute;left:96px;right:96px;top:${640 + i * 168}px;opacity:0">
      <div style="display:flex;align-items:baseline;justify-content:space-between;
        border-bottom:1px solid rgba(255,255,255,.18);padding-bottom:26px">
        <div class="jak" style="font-size:44px;color:#fff">${f.nombre}</div>
        <div class="mono" style="font-size:28px;color:${C.blueLight};letter-spacing:.08em">${f.rango}</div>
      </div>
    </div>`
    ).join("")}
  </div>

  <!-- 4 · La aérea real -->
  <div class="layer" id="aerea">
    <img id="aerea-img" src="${photo("bosque-catemito", 4)}"
      style="position:absolute;left:0;top:0;width:${W}px;height:${H}px;object-fit:cover;object-position:50% 50%">
    <div style="position:absolute;inset:0;background:
      linear-gradient(to top, ${navy} 0%, ${navy}e6 16%, ${navy}80 34%, transparent 58%)"></div>
    <div style="position:absolute;left:96px;right:96px;bottom:280px">
      <div class="mono" style="font-size:26px;color:${C.blueLight}">Bosque Catemito</div>
      <h1 style="font-size:66px;margin-top:24px">Hasta 14.000 m&sup2;<br>en un solo recinto</h1>
    </div>
  </div>

  <!-- 5 · Cierre -->
  <div class="layer" id="cierre">
    <div style="position:absolute;inset:0;background:
      radial-gradient(120% 70% at 50% 30%, #0d2444 0%, ${navy} 62%)"></div>
    <div id="cierre-in" style="position:absolute;left:96px;right:96px;top:700px;text-align:center">
      <div style="display:flex;align-items:center;justify-content:center;gap:26px">
        ${logo(true)}${wordmark(true)}
      </div>
      <h1 style="font-size:64px;margin-top:72px">Arriendo directo,<br>sin corredora</h1>
      <div style="font-family:Inter,sans-serif;font-weight:300;font-size:36px;color:rgba(255,255,255,.86);
        line-height:1.4;margin-top:36px">Desde 180 hasta 14.000 m&sup2;<br>en San Bernardo</div>
      <div style="display:inline-flex;align-items:center;gap:22px;background:${C.wa};
        padding:30px 52px;margin-top:66px">
        <svg width="46" height="46" viewBox="0 0 24 24" fill="#fff"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.46 1.32 4.96L2 22l5.25-1.38a9.87 9.87 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91C21.96 6.45 17.5 2 12.04 2zm0 18.15h-.01c-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.22 8.22 0 0 1-1.26-4.38c0-4.54 3.7-8.23 8.25-8.23 2.2 0 4.27.86 5.83 2.42a8.19 8.19 0 0 1 2.41 5.82c0 4.54-3.7 8.23-8.23 8.23z"/></svg>
        <span class="jak" style="font-size:42px;color:#fff">Cotiza por WhatsApp</span>
      </div>
    </div>
  </div>

</div>
<script>
const T = ${JSON.stringify(T)};
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const easeOut = (x) => 1 - Math.pow(1 - clamp(x, 0, 1), 3);
// Progreso 0→1 dentro de una ventana [a,b]
const prog = (t, a, b) => clamp((t - a) / (b - a), 0, 1);
// Opacidad de escena: entra en 0.5s, sale en 0.5s
const fade = (t, [a, b]) => Math.min(prog(t, a, a + 0.5), 1 - prog(t, b - 0.5, b));

const $ = (s) => document.querySelector(s);
const $$ = (s) => [...document.querySelectorAll(s)];

window.render = (t) => {
  // 1 · Intro
  const fi = fade(t, T.intro);
  $("#intro").style.opacity = fi;
  const pi = easeOut(prog(t, T.intro[0], T.intro[0] + 1.1));
  $("#intro-rule").style.width = (120 * pi) + "px";
  $("#intro-h").style.transform = "translateY(" + (36 * (1 - pi)) + "px)";
  $("#intro-k").style.opacity = easeOut(prog(t, T.intro[0] + 0.2, T.intro[0] + 1.0));

  // 2 · Rutas: el hub crece y los radios salen uno a uno
  $("#rutas").style.opacity = fade(t, T.rutas);
  const ph = easeOut(prog(t, T.rutas[0] + 0.3, T.rutas[0] + 1.2));
  $("#hub").style.transform = "scale(" + (0.5 + 0.5 * ph) + ")";
  $("#hub").style.opacity = ph;
  $$(".ruta-spoke").forEach((el) => {
    const i = +el.dataset.i, a = T.rutas[0] + 1.3 + i * 0.55;
    el.style.width = (240 * easeOut(prog(t, a, a + 0.6))) + "px";
  });
  $$(".ruta-dot").forEach((el) => {
    const i = +el.dataset.i, a = T.rutas[0] + 1.3 + i * 0.55;
    el.style.opacity = prog(t, a + 0.5, a + 0.7);
  });
  $$(".ruta-lbl").forEach((el) => {
    const i = +el.dataset.i, a = T.rutas[0] + 1.75 + i * 0.55;
    const p = easeOut(prog(t, a, a + 0.5));
    el.style.opacity = p;
    el.style.transform = "translateY(" + (18 * (1 - p)) + "px)";
  });

  // 3 · Proyectos: las fichas entran escalonadas
  $("#proyectos").style.opacity = fade(t, T.proyectos);
  $$(".ficha").forEach((el) => {
    const i = +el.dataset.i, a = T.proyectos[0] + 0.9 + i * 0.6;
    const p = easeOut(prog(t, a, a + 0.6));
    el.style.opacity = p;
    el.style.transform = "translateX(" + (-44 * (1 - p)) + "px)";
  });

  // 4 · Aérea con zoom lento (Ken Burns)
  $("#aerea").style.opacity = fade(t, T.aerea);
  const pa = prog(t, T.aerea[0], T.aerea[1]);
  $("#aerea-img").style.transform = "scale(" + (1.06 + 0.1 * pa) + ")";

  // 5 · Cierre
  $("#cierre").style.opacity = Math.min(prog(t, T.cierre[0], T.cierre[0] + 0.6), 1);
  const pc = easeOut(prog(t, T.cierre[0] + 0.3, T.cierre[0] + 1.2));
  $("#cierre-in").style.transform = "translateY(" + (30 * (1 - pc)) + "px)";
  $("#cierre-in").style.opacity = pc;
};
</script></body></html>`;

(async () => {
  const outDir = path.join(__dirname, "salida");
  const frameDir = path.join(outDir, "frames");
  fs.rmSync(frameDir, { recursive: true, force: true });
  fs.mkdirSync(frameDir, { recursive: true });

  const browser = await chromium.launch({ executablePath: chromePath() });
  const page = await browser.newPage({ viewport: { width: W, height: H }, deviceScaleFactor: 1 });
  await page.setContent(html(), { waitUntil: "load" });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(400);

  const total = Math.round(DUR * FPS);
  console.log(`\nRenderizando ${total} cuadros (${DUR}s a ${FPS} fps, ${W}x${H})`);
  for (let f = 0; f < total; f++) {
    await page.evaluate((t) => window.render(t), f / FPS);
    await page.screenshot({ path: path.join(frameDir, `f-${String(f).padStart(4, "0")}.png`) });
    if (f % 48 === 0) process.stdout.write(`  ${f}/${total}\r`);
  }
  await browser.close();

  const mp4 = path.join(outDir, "portal-de-bodegas-san-bernardo.mp4");
  execFileSync("ffmpeg", [
    "-y", "-framerate", String(FPS),
    "-i", path.join(frameDir, "f-%04d.png"),
    "-c:v", "libx264", "-preset", "slow", "-crf", "18",
    "-pix_fmt", "yuv420p", "-movflags", "+faststart",
    mp4,
  ], { stdio: ["ignore", "ignore", "pipe"] });

  fs.rmSync(frameDir, { recursive: true, force: true });
  const kb = Math.round(fs.statSync(mp4).size / 1024);
  console.log(`\n✓ ${mp4}  (${kb} KB)`);
})();
