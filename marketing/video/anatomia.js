// Anatomía de un recinto industrial — Portal de Bodegas
// Recorre la aérea de dron de Bosque Catemito señalando qué es cada
// zona. Es el formato de recorrido con especificaciones encima que usan
// las cuentas del rubro, pero resuelto desde arriba, que es donde se
// entiende la escala — y sin necesidad de filmar.
//
// Misma mecánica que ./build.js: el DOM se arma una vez y cada cuadro
// solo actualiza estilos vía window.render(t).
// Formato: 1080x1920 (9:16) para reel. 24 fps.
const { chromium } = require("playwright");
const { execFileSync } = require("child_process");
const fs = require("fs");
const path = require("path");
const { C, FONTS, photo, logo, wordmark, chromePath } = require("../shared/brand.js");

const W = 1080, H = 1920, FPS = 24;
const navy = C.navy;

// La aérea, y la ventana por la que se ve dentro del lienzo vertical
const FOTO_W = 2000, FOTO_H = 1125;
const VX = 0, VY = 400, VW = 1080, VH = 1200;

// Posiciones medidas sobre la foto (ver README). El encuadre general
// tiene que cubrir la ventana: VH / FOTO_H = 1.067 es el mínimo.
const ESC_GRAL = 1.067;
const ESC_ZOOM = 2.1;
const GRAL_CX = 1100, GRAL_CY = 562;

// Las zonas van de derecha a izquierda, que es un barrido limpio sobre
// la foto. Cada rótulo describe lo que de verdad se ve en ese punto:
// el patio que aparece en la imagen está ocupado por maquinaria, así
// que no se puede rotular como patio de maniobras libre.
const ZONAS = [
  { cx: 1520, cy: 500, titulo: "Naves techadas", sub: "Hasta 14.000 m&sup2; bajo techo" },
  { cx: 1130, cy: 515, titulo: "Patio de maniobras", sub: "El cami&oacute;n llega hasta la puerta" },
  { cx: 820, cy: 590, titulo: "Acopio a cielo abierto", sub: "Contenedores, maquinaria y equipos" },
];

const T_INTRO = 4.0, T_ZONA = 5.0, T_VUELTA = 2.0, T_CIERRE = 3.6;
const T = { intro: [0, T_INTRO], zonas: [T_INTRO, T_INTRO + ZONAS.length * T_ZONA] };
T.vuelta = [T.zonas[1], T.zonas[1] + T_VUELTA];
T.cierre = [T.vuelta[1] - 0.4, T.vuelta[1] - 0.4 + T_CIERRE];
const DUR = T.cierre[1];

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

  <div id="win" style="position:absolute;left:${VX}px;top:${VY}px;width:${VW}px;height:${VH}px;overflow:hidden">
    <img id="foto" src="${photo("bosque-catemito", 4)}"
      style="position:absolute;left:0;top:0;width:${FOTO_W}px;height:${FOTO_H}px;transform-origin:0 0">
    ${ZONAS.map(
      (_, i) => `
    <div class="mira" data-i="${i}" style="position:absolute;left:0;top:0;opacity:0">
      <div style="position:absolute;left:-86px;top:-86px;width:172px;height:172px;border:5px solid ${C.blue};
        border-radius:50%;box-shadow:0 0 0 4px rgba(1,25,67,.35), 0 10px 30px rgba(0,0,0,.45)"></div>
    </div>`
    ).join("")}
    <div style="position:absolute;inset:0;pointer-events:none;
      box-shadow:inset 0 0 120px 40px ${navy}55"></div>
  </div>

  <div id="titulo" style="position:absolute;left:84px;right:84px;top:118px;opacity:0">
    <div class="mono" style="font-size:25px;color:${C.blueLight}">Bosque Catemito &middot; San Bernardo</div>
    <h1 style="font-size:72px;margin-top:24px">Anatom&iacute;a de un<br>recinto industrial</h1>
  </div>

  <div id="zona" style="position:absolute;left:84px;right:84px;top:140px;opacity:0">
    <div class="mono" id="zona-n" style="font-size:23px;color:${C.blueLight}"></div>
    <h1 id="zona-t" style="font-size:68px;margin-top:22px"></h1>
    <div class="jak" id="zona-s" style="font-size:38px;color:${C.blue};margin-top:24px"></div>
  </div>

  <div id="cierre" style="position:absolute;inset:0;opacity:0;background:
    radial-gradient(120% 70% at 50% 30%, #0d2444 0%, ${navy} 62%)">
    <div id="cierre-in" style="position:absolute;left:84px;right:84px;top:700px;text-align:center">
      <div style="display:flex;align-items:center;justify-content:center;gap:24px">
        ${logo(true)}${wordmark(true)}
      </div>
      <h1 style="font-size:58px;margin-top:64px">&iquest;Qu&eacute; necesita<br>tu operaci&oacute;n?</h1>
      <div style="font-family:Inter,sans-serif;font-weight:300;font-size:34px;color:rgba(255,255,255,.86);
        line-height:1.4;margin-top:32px">Cinco recintos en San Bernardo,<br>desde 180 m&sup2;</div>
      <div style="display:inline-flex;align-items:center;gap:22px;background:${C.wa};
        padding:30px 52px;margin-top:58px">
        <svg width="46" height="46" viewBox="0 0 24 24" fill="#fff"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.46 1.32 4.96L2 22l5.25-1.38a9.87 9.87 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91C21.96 6.45 17.5 2 12.04 2zm0 18.15h-.01c-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.22 8.22 0 0 1-1.26-4.38c0-4.54 3.7-8.23 8.25-8.23 2.2 0 4.27.86 5.83 2.42a8.19 8.19 0 0 1 2.41 5.82c0 4.54-3.7 8.23-8.23 8.23z"/></svg>
        <span class="jak" style="font-size:40px;color:#fff">Cotiza por WhatsApp</span>
      </div>
    </div>
  </div>

</div>
<script>
const T = ${JSON.stringify(T)}, Z = ${JSON.stringify(ZONAS)};
const VW = ${VW}, VH = ${VH}, FW = ${FOTO_W}, FH = ${FOTO_H};
const SG = ${ESC_GRAL}, SZ = ${ESC_ZOOM}, GCX = ${GRAL_CX}, GCY = ${GRAL_CY}, T_ZONA = ${T_ZONA};

const clamp = (v,a,b) => Math.max(a, Math.min(b, v));
const easeOut = (x) => 1 - Math.pow(1 - clamp(x,0,1), 3);
const easeOutQuad = (x) => 1 - Math.pow(1 - clamp(x,0,1), 2);
const easeInOut = (x) => (x < .5 ? 4*x*x*x : 1 - Math.pow(-2*x+2, 3)/2);
const prog = (t,a,b) => clamp((t-a)/(b-a), 0, 1);
const fade = (t,[a,b]) => Math.min(prog(t,a,a+.5), 1 - prog(t,b-.5,b));
const $ = (s) => document.querySelector(s);
const $$ = (s) => [...document.querySelectorAll(s)];

function vista(cx, cy, s) {
  return { s,
    tx: clamp(VW/2 - cx*s, VW - FW*s, 0),
    ty: clamp(VH/2 - cy*s, VH - FH*s, 0) };
}
const lerpV = (a,b,k) => ({ tx: a.tx+(b.tx-a.tx)*k, ty: a.ty+(b.ty-a.ty)*k, s: a.s+(b.s-a.s)*k });
const GRAL = vista(GCX, GCY, SG);
// Apertura: se parte acercado sobre las naves y se retrocede al plano
// general. Un movimiento casi imperceptible al inicio hace que el reel
// se lea como foto en el feed y la gente pase de largo.
const APERTURA = vista(1400, 500, 1.55);

window.render = (t) => {
  // el retroceso de apertura: rápido al principio y asentándose
  let v = lerpV(APERTURA, GRAL, easeOutQuad(prog(t, 0, T.intro[1])));
  if (t >= T.zonas[0] && t < T.zonas[1]) {
    const k = (t - T.zonas[0]) / T_ZONA;
    const i = Math.min(Math.floor(k), Z.length - 1), f = k - i;
    const desde = i === 0 ? GRAL : vista(Z[i-1].cx, Z[i-1].cy, SZ);
    const hasta = vista(Z[i].cx, Z[i].cy, SZ);
    v = lerpV(desde, hasta, easeInOut(clamp(f / 0.5, 0, 1)));
    v.s *= 1 + 0.02 * clamp((f - 0.5) / 0.5, 0, 1);   // sigue respirando al llegar
  } else if (t >= T.vuelta[0]) {
    const ult = vista(Z[Z.length-1].cx, Z[Z.length-1].cy, SZ);
    v = lerpV(ult, GRAL, easeInOut(prog(t, T.vuelta[0], T.vuelta[1])));
  }
  $("#foto").style.transform = "translate(" + v.tx + "px," + v.ty + "px) scale(" + v.s + ")";

  // la mira solo aparece sobre la zona que se está mostrando
  const act = (t >= T.zonas[0] && t < T.zonas[1])
    ? Math.min(Math.floor((t - T.zonas[0]) / T_ZONA), Z.length - 1) : -1;
  $$(".mira").forEach((el) => {
    const i = +el.dataset.i, z = Z[i];
    el.style.transform = "translate(" + (z.cx*v.s + v.tx) + "px," + (z.cy*v.s + v.ty) + "px)";
    if (i !== act) { el.style.opacity = 0; return; }
    const f = ((t - T.zonas[0]) / T_ZONA) - i;
    el.style.opacity = Math.min(easeOut(prog(f, 0.34, 0.6)), 1 - prog(f, 0.9, 1));
  });

  $("#titulo").style.opacity = fade(t, T.intro);
  $("#zona").style.opacity = 0;
  if (act >= 0) {
    const f = ((t - T.zonas[0]) / T_ZONA) - act, z = Z[act];
    $("#zona-n").textContent = "0" + (act+1) + " / 0" + Z.length;
    $("#zona-t").innerHTML = z.titulo;
    $("#zona-s").innerHTML = z.sub;
    const ent = easeOut(prog(f, 0.14, 0.46));
    $("#zona").style.opacity = Math.min(ent, 1 - prog(f, 0.9, 1));
    $("#zona").style.transform = "translateY(" + (24*(1-ent)) + "px)";
  }

  $("#cierre").style.opacity = Math.min(prog(t, T.cierre[0], T.cierre[0]+0.6), 1);
  const pc = easeOut(prog(t, T.cierre[0]+0.3, T.cierre[0]+1.2));
  $("#cierre-in").style.transform = "translateY(" + (28*(1-pc)) + "px)";
  $("#cierre-in").style.opacity = pc;
};
</script></body></html>`;

(async () => {
  const outDir = path.join(__dirname, "salida");
  const frameDir = path.join(outDir, "frames-anatomia");
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

  const mp4 = path.join(outDir, "anatomia-recinto-industrial.mp4");
  execFileSync("ffmpeg", ["-y", "-framerate", String(FPS),
    "-i", path.join(frameDir, "f-%04d.png"),
    "-c:v", "libx264", "-preset", "slow", "-crf", "18",
    "-pix_fmt", "yuv420p", "-movflags", "+faststart", mp4],
    { stdio: ["ignore", "ignore", "pipe"] });

  fs.rmSync(frameDir, { recursive: true, force: true });
  console.log(`\n✓ ${mp4}  (${Math.round(fs.statSync(mp4).size / 1024)} KB)`);
})();
