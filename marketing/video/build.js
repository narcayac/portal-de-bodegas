// Generador de video — Portal de Bodegas
// Sobrevuelo del mapa de San Bernardo con los 5 recintos marcados.
// La animación se calcula cuadro a cuadro con Playwright y se ensambla
// con ffmpeg: el DOM se arma una vez y cada cuadro solo actualiza
// estilos vía window.render(t). Remontar el HTML en cada cuadro
// significaría reparsear los 460 KB de fuentes 672 veces.
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

// ── El mapa base ──────────────────────────────────────────────────────
// Captura de Google Maps centrada en -33.5887,-70.7341 a zoom 12, con el
// chrome del navegador recortado. Las posiciones de los pines están en
// píxeles de esta imagen y se derivaron proyectando las coordenadas de
// cada proyecto en Web Mercator (ver README).
const MAPA = "mapa-base.webp";
const MAPA_W = 2000, MAPA_H = 925;

// Ventana por la que se ve el mapa dentro del lienzo vertical
const VX = 0, VY = 420, VW = 1080, VH = 1200;

// De norte a sur, que es como recorre el video
const RECINTOS = [
  { id: "acacias-seis",        px: 1012, py: 157 },
  { id: "alto-las-acacias",    px: 1017, py: 215 },
  { id: "bosque-catemito",     px: 868,  py: 534 },
  { id: "inversiones-duramet", px: 1132, py: 605 },
  { id: "el-barrancon",        px: 1015, py: 648 },
].map((r) => {
  const p = PROJECTS.find((x) => x.id === r.id);
  return {
    ...r,
    nombre: p.name,
    rango: p.min === p.max ? m2(p.min) : `${p.min.toLocaleString("es-CL")} – ${m2(p.max)}`,
  };
});

// Encuadre general: el grupo completo, centrado en la ventana
const ESC_GRAL = 1.30;
const CGX = RECINTOS.reduce((a, r) => a + r.px, 0) / RECINTOS.length;
const CGY = RECINTOS.reduce((a, r) => a + r.py, 0) / RECINTOS.length;
const ESC_ZOOM = 1.9;

// ── Guion ─────────────────────────────────────────────────────────────
const T_INTRO = 5.6;              // plano general, caen los pines
const T_FICHA = 2.6;              // por recinto
const T_VUELTA = 2.0;             // se abre de vuelta
const T_AEREA = 4.0;
const T_CIERRE = 3.6;
const T = {
  intro: [0, T_INTRO],
  recintos: [T_INTRO, T_INTRO + RECINTOS.length * T_FICHA],
};
T.vuelta = [T.recintos[1], T.recintos[1] + T_VUELTA];
T.aerea = [T.vuelta[1] - 0.4, T.vuelta[1] - 0.4 + T_AEREA];
T.cierre = [T.aerea[1] - 0.4, T.aerea[1] - 0.4 + T_CIERRE];
const DUR = T.cierre[1];

const b64 = fs.readFileSync(path.join(__dirname, MAPA)).toString("base64");

const html = () => `<!doctype html><html lang="es"><head><meta charset="utf-8">
<style>
${FONTS}
*{margin:0;padding:0;box-sizing:border-box}
html,body{width:${W}px;height:${H}px;overflow:hidden}
body{font-family:Inter,sans-serif;-webkit-font-smoothing:antialiased;background:${navy}}
.stage{position:relative;width:${W}px;height:${H}px;overflow:hidden;background:${navy}}
h1{font-family:Fraunces,Georgia,serif;font-weight:600;color:#fff;letter-spacing:-.02em;line-height:1.06}
.mono{font-family:'IBM Plex Mono',monospace;font-weight:500;letter-spacing:.2em;text-transform:uppercase}
.jak{font-family:'Plus Jakarta Sans',sans-serif;font-weight:800;letter-spacing:-.01em}
</style></head><body>
<div class="stage">

  <!-- ventana del mapa -->
  <div id="mapwin" style="position:absolute;left:${VX}px;top:${VY}px;width:${VW}px;height:${VH}px;overflow:hidden">
    <img id="mapa" src="data:image/webp;base64,${b64}"
      style="position:absolute;left:0;top:0;width:${MAPA_W}px;height:${MAPA_H}px;transform-origin:0 0">
    ${RECINTOS.map(
      (r, i) => `
    <div class="pin" data-i="${i}" style="position:absolute;left:0;top:0;opacity:0">
      <div style="position:absolute;left:-21px;top:-52px;width:42px;height:42px;border-radius:50% 50% 50% 0;
        background:${C.blue};transform:rotate(-45deg);border:5px solid #fff;
        box-shadow:0 8px 20px rgba(0,0,0,.5)"></div>
    </div>`
    ).join("")}
    <!-- viñeta para que el borde del mapa no corte en seco -->
    <div style="position:absolute;inset:0;pointer-events:none;box-shadow:inset 0 0 120px 40px ${navy}66"></div>
  </div>

  <!-- título del plano general -->
  <div id="titulo" style="position:absolute;left:84px;right:84px;top:108px;opacity:0">
    <div class="mono" style="font-size:26px;color:${C.blueLight}">San Bernardo &middot; Regi&oacute;n Metropolitana</div>
    <h1 style="font-size:76px;margin-top:26px">Cinco recintos<br>industriales</h1>
  </div>

  <!-- ficha de cada recinto -->
  <div id="ficha" style="position:absolute;left:84px;right:84px;top:118px;opacity:0">
    <div class="mono" id="ficha-n" style="font-size:24px;color:${C.blueLight}"></div>
    <h1 id="ficha-nombre" style="font-size:72px;margin-top:22px"></h1>
    <div class="jak" id="ficha-rango" style="font-size:44px;color:${C.blue};margin-top:28px"></div>
  </div>

  <!-- aérea real -->
  <div id="aerea" style="position:absolute;inset:0;opacity:0">
    <img id="aerea-img" src="${photo("bosque-catemito", 4)}"
      style="position:absolute;left:0;top:0;width:${W}px;height:${H}px;object-fit:cover;transform-origin:50% 50%">
    <div style="position:absolute;inset:0;background:
      linear-gradient(to top, ${navy} 0%, ${navy}e6 15%, ${navy}80 32%, transparent 56%)"></div>
    <div style="position:absolute;left:84px;right:84px;bottom:300px">
      <div class="mono" style="font-size:26px;color:${C.blueLight}">Bosque Catemito</div>
      <h1 style="font-size:64px;margin-top:24px">Hasta 14.000 m&sup2;<br>en un solo recinto</h1>
    </div>
  </div>

  <!-- cierre -->
  <div id="cierre" style="position:absolute;inset:0;opacity:0;background:
    radial-gradient(120% 70% at 50% 30%, #0d2444 0%, ${navy} 62%)">
    <div id="cierre-in" style="position:absolute;left:84px;right:84px;top:720px;text-align:center">
      <div style="display:flex;align-items:center;justify-content:center;gap:24px">
        ${logo(true)}${wordmark(true)}
      </div>
      <h1 style="font-size:60px;margin-top:66px">Arriendo directo,<br>sin corredora</h1>
      <div style="display:inline-flex;align-items:center;gap:22px;background:${C.wa};
        padding:30px 52px;margin-top:62px">
        <svg width="46" height="46" viewBox="0 0 24 24" fill="#fff"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.46 1.32 4.96L2 22l5.25-1.38a9.87 9.87 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91C21.96 6.45 17.5 2 12.04 2zm0 18.15h-.01c-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.22 8.22 0 0 1-1.26-4.38c0-4.54 3.7-8.23 8.25-8.23 2.2 0 4.27.86 5.83 2.42a8.19 8.19 0 0 1 2.41 5.82c0 4.54-3.7 8.23-8.23 8.23z"/></svg>
        <span class="jak" style="font-size:40px;color:#fff">Cotiza por WhatsApp</span>
      </div>
    </div>
  </div>

  <!-- crédito del mapa: visible siempre que se vea el mapa -->
  <div id="credito" class="mono" style="position:absolute;left:84px;bottom:46px;font-size:19px;
    letter-spacing:.12em;color:rgba(255,255,255,.55);opacity:0">Mapa &copy; Google</div>

</div>
<script>
const T = ${JSON.stringify(T)};
const R = ${JSON.stringify(RECINTOS)};
const VW = ${VW}, VH = ${VH}, MW = ${MAPA_W}, MH = ${MAPA_H};
const SG = ${ESC_GRAL}, SZ = ${ESC_ZOOM}, CGX = ${CGX}, CGY = ${CGY};
const T_FICHA = ${T_FICHA};

const clamp = (v,a,b) => Math.max(a, Math.min(b, v));
const easeOut = (x) => 1 - Math.pow(1 - clamp(x,0,1), 3);
const easeInOut = (x) => (x < .5 ? 4*x*x*x : 1 - Math.pow(-2*x+2, 3)/2);
const prog = (t,a,b) => clamp((t-a)/(b-a), 0, 1);
const fade = (t,[a,b]) => Math.min(prog(t,a,a+.5), 1 - prog(t,b-.5,b));
const $ = (s) => document.querySelector(s);
const $$ = (s) => [...document.querySelectorAll(s)];

// Encuadre: centra (cx,cy) del mapa en la ventana, sin dejar que el
// borde del mapa entre en cuadro.
function vista(cx, cy, s) {
  const tx = clamp(VW/2 - cx*s, VW - MW*s, 0);
  const ty = clamp(VH/2 - cy*s, VH - MH*s, 0);
  return { tx, ty, s };
}
const lerpV = (a, b, k) => ({ tx: a.tx+(b.tx-a.tx)*k, ty: a.ty+(b.ty-a.ty)*k, s: a.s+(b.s-a.s)*k });
const GRAL = vista(CGX, CGY, SG);

window.render = (t) => {
  // ── encuadre del mapa ──
  let v = GRAL;
  if (t >= T.recintos[0] && t < T.recintos[1]) {
    const k = (t - T.recintos[0]) / T_FICHA;
    const i = Math.min(Math.floor(k), R.length - 1);
    const f = k - i;
    const desde = i === 0 ? GRAL : vista(R[i-1].px, R[i-1].py, SZ);
    const hasta = vista(R[i].px, R[i].py, SZ);
    v = lerpV(desde, hasta, easeInOut(clamp(f / 0.55, 0, 1)));
  } else if (t >= T.vuelta[0]) {
    const ult = vista(R[R.length-1].px, R[R.length-1].py, SZ);
    v = lerpV(ult, GRAL, easeInOut(prog(t, T.vuelta[0], T.vuelta[1])));
  }
  $("#mapa").style.transform = "translate(" + v.tx + "px," + v.ty + "px) scale(" + v.s + ")";

  // ── pines: caen escalonados y siguen al mapa ──
  $$(".pin").forEach((el) => {
    const i = +el.dataset.i, r = R[i];
    el.style.transform = "translate(" + (r.px*v.s + v.tx) + "px," + (r.py*v.s + v.ty) + "px)";
    const aparece = easeOut(prog(t, 1.0 + i*0.42, 1.0 + i*0.42 + 0.5));
    // el pin del recinto en pantalla queda opaco; el resto se atenúa
    let foco = 1;
    if (t >= T.recintos[0] && t < T.vuelta[0]) {
      const act = Math.min(Math.floor((t - T.recintos[0]) / T_FICHA), R.length - 1);
      foco = i === act ? 1 : 0.35;
    }
    el.style.opacity = aparece * foco;
  });

  // ── capas de texto ──
  $("#titulo").style.opacity = fade(t, T.intro);
  $("#credito").style.opacity = Math.min(prog(t, 0.6, 1.4), 1 - prog(t, T.aerea[0], T.aerea[0]+0.5));

  const enFicha = t >= T.recintos[0] && t < T.recintos[1];
  $("#ficha").style.opacity = 0;
  if (enFicha) {
    const k = (t - T.recintos[0]) / T_FICHA;
    const i = Math.min(Math.floor(k), R.length - 1), f = k - i;
    const r = R[i];
    $("#ficha-n").textContent = String(i+1).padStart(2,"0") + " / 0" + R.length;
    $("#ficha-nombre").innerHTML = r.nombre;
    $("#ficha-rango").textContent = r.rango;
    const ent = easeOut(prog(f, 0.12, 0.42)), sal = 1 - prog(f, 0.88, 1.0);
    $("#ficha").style.opacity = Math.min(ent, sal);
    $("#ficha").style.transform = "translateY(" + (26*(1-ent)) + "px)";
  }

  // ── aérea y cierre ──
  $("#aerea").style.opacity = fade(t, T.aerea);
  $("#aerea-img").style.transform = "scale(" + (1.05 + 0.1*prog(t, T.aerea[0], T.aerea[1])) + ")";
  $("#cierre").style.opacity = Math.min(prog(t, T.cierre[0], T.cierre[0]+0.6), 1);
  const pc = easeOut(prog(t, T.cierre[0]+0.3, T.cierre[0]+1.2));
  $("#cierre-in").style.transform = "translateY(" + (28*(1-pc)) + "px)";
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
  await page.waitForTimeout(500);

  const total = Math.round(DUR * FPS);
  console.log(`\nRenderizando ${total} cuadros (${DUR.toFixed(1)}s a ${FPS} fps, ${W}x${H})`);
  for (let f = 0; f < total; f++) {
    await page.evaluate((t) => window.render(t), f / FPS);
    await page.screenshot({ path: path.join(frameDir, `f-${String(f).padStart(4, "0")}.png`) });
    if (f % 48 === 0) process.stdout.write(`  ${f}/${total}\r`);
  }
  await browser.close();

  const mp4 = path.join(outDir, "mapa-san-bernardo.mp4");
  execFileSync("ffmpeg", ["-y", "-framerate", String(FPS),
    "-i", path.join(frameDir, "f-%04d.png"),
    "-c:v", "libx264", "-preset", "slow", "-crf", "18",
    "-pix_fmt", "yuv420p", "-movflags", "+faststart", mp4],
    { stdio: ["ignore", "ignore", "pipe"] });

  fs.rmSync(frameDir, { recursive: true, force: true });
  console.log(`\n✓ ${mp4}  (${Math.round(fs.statSync(mp4).size/1024)} KB)`);
})();
