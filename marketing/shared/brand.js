// Sistema de marca compartido entre generadores de carruseles
// (marketing/recorrido, marketing/guias, y los que vengan después).
// Todo lo visual vive acá para que un cambio de marca se haga en un solo lugar.
const fs = require("fs");
const path = require("path");

const REPO = path.resolve(__dirname, "../..");
// fonts.css lo genera ./fuentes.sh (no se versiona: son ~460 KB de base64)
const FONTS = fs.readFileSync(path.join(__dirname, "fonts.css"), "utf8");

const C = {
  navy: "#011943",
  blue: "#0685de",
  blueLight: "#89c7f6",
  slate: "#6c7b92",
  border: "#e2e8f0",
  wa: "#25D366",
};

// Las fotos se incrustan como data URI: con setContent el documento es about:blank
// y Chromium bloquea la carga de file://
function photo(categoria, n) {
  const f = path.join(REPO, "public/photos", categoria, `foto-0${n}.webp`);
  return "data:image/webp;base64," + fs.readFileSync(f).toString("base64");
}

const whatsappIconPath = `
  <path d="M17.47 14.38c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.64.07-.3-.15-1.25-.46-2.38-1.47-.88-.78-1.47-1.75-1.65-2.05-.17-.3-.02-.46.13-.6.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.6-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.01-1.04 2.480 0 1.46 1.06 2.87 1.21 3.07.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.69.63.71.22 1.36.19 1.87.12.57-.09 1.75-.72 2-1.41.25-.69.25-1.28.17-1.41-.07-.13-.27-.2-.57-.35z"/>
  <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.46 1.32 4.96L2 22l5.25-1.38a9.87 9.87 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91C21.96 6.45 17.5 2 12.04 2zm0 18.15h-.01c-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.22 8.22 0 0 1-1.26-4.38c0-4.54 3.7-8.23 8.25-8.23 2.2 0 4.27.86 5.83 2.42a8.19 8.19 0 0 1 2.41 5.82c0 4.54-3.7 8.23-8.23 8.23z"/>`;

const whatsappButton = (label) => `
<div style="display:inline-flex;align-items:center;gap:22px;background:${C.wa};padding:28px 46px;margin-top:64px">
  <svg width="46" height="46" viewBox="0 0 24 24" fill="#fff" style="flex:none">${whatsappIconPath}</svg>
  <span style="font-family:'Plus Jakarta Sans',sans-serif;font-weight:800;font-size:40px;color:#fff;letter-spacing:-.01em">${label}</span>
</div>`;

// ── Marca (logo + wordmark + fila de pie) ──────────────────────────────────────
const logo = (dark) => `
<svg width="56" height="56" viewBox="0 0 100 100" style="flex:none">
  <circle cx="50" cy="50" r="48" fill="${dark ? "none" : C.navy}"
          stroke="${dark ? "#ffffff" : "none"}" stroke-width="4"/>
  <path d="M27 52 50 30 73 52 73 75 27 75Z" fill="none"
        stroke="${dark ? "#ffffff" : "#f3f4f5"}" stroke-width="5" stroke-linejoin="round"/>
  <rect x="42" y="58" width="16" height="17" fill="${C.blue}"/>
</svg>`;

const wordmark = (dark) => {
  const fg = dark ? "#ffffff" : C.navy;
  return `<span class="wm" style="color:${fg}">portal <span style="color:${C.blue}">de</span> bodegas</span>`;
};

const brandRow = (dark, counter) => `
<div class="brand">
  <div class="brand-l">${logo(dark)}${wordmark(dark)}</div>
  <div class="counter" style="color:${dark ? "rgba(255,255,255,.72)" : C.slate}">${counter}</div>
</div>`;

// ── Envoltorio HTML compartido por todos los slides ────────────────────────────
const shell = (body, extra = "") => `<!doctype html><html lang="es"><head><meta charset="utf-8">
<style>
${FONTS}
*{margin:0;padding:0;box-sizing:border-box}
html,body{width:1080px;height:1350px}
body{font-family:Inter,sans-serif;-webkit-font-smoothing:antialiased}
.slide{position:relative;width:1080px;height:1350px;overflow:hidden;background:${C.navy}}
.bg{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
.scrim{position:absolute;inset:0;background:
  linear-gradient(to top, ${C.navy} 0%, ${C.navy}f2 18%, ${C.navy}b3 34%, ${C.navy}40 52%, ${C.navy}0d 68%, transparent 80%)}
.content{position:absolute;left:72px;right:72px;bottom:72px}
.eyebrow{font-family:'IBM Plex Mono',monospace;font-weight:500;font-size:21px;
  letter-spacing:.24em;text-transform:uppercase;color:${C.blueLight}}
.rule{width:78px;height:3px;background:${C.blue};margin:26px 0 34px}
h1{font-family:Fraunces,Georgia,serif;font-weight:600;color:#fff;line-height:1.02;
  letter-spacing:-.015em}
h2{font-family:Fraunces,Georgia,serif;font-weight:600;color:#fff;font-size:66px;
  line-height:1.12;letter-spacing:-.01em;margin-top:18px}
.sub{font-family:Inter,sans-serif;font-weight:300;font-size:31px;color:rgba(255,255,255,.88);
  line-height:1.45;margin-top:22px;max-width:820px}
.brand{position:absolute;left:72px;right:72px;bottom:72px;display:flex;align-items:center;
  justify-content:space-between}
.brand-l{display:flex;align-items:center;gap:20px}
.wm{font-family:'Plus Jakarta Sans',sans-serif;font-weight:800;font-size:34px;letter-spacing:-.01em}
.counter{font-family:'IBM Plex Mono',monospace;font-weight:500;font-size:22px;letter-spacing:.14em}
.badge{position:absolute;top:48px;right:48px;background:${C.navy}d9;color:#fff;
  font-family:'IBM Plex Mono',monospace;font-weight:500;font-size:21px;letter-spacing:.18em;
  padding:15px 26px}
${extra}
</style></head><body>${body}</body></html>`;

module.exports = {
  REPO,
  C,
  photo,
  shell,
  brandRow,
  logo,
  wordmark,
  whatsappButton,
};
