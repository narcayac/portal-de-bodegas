#!/usr/bin/env bash
# Descarga las fuentes de marca y las deja incrustadas en fonts.css como base64.
# Se incrustan porque Chromium, al renderizar con setContent, no resuelve
# peticiones externas a Google Fonts.
#
#   ./fuentes.sh     → genera fonts.css (~460 KB, no se versiona)
set -euo pipefail
cd "$(dirname "$0")"

URL="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,600;9..144,700&family=Inter:wght@300;400;500;600&family=IBM+Plex+Mono:wght@500&family=Plus+Jakarta+Sans:wght@800&display=swap"

curl -sS -A "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 Chrome/120 Safari/537.36" \
  -o .gf.css "$URL"

node -e '
const fs = require("fs"), cp = require("child_process");
const css = fs.readFileSync(".gf.css", "utf8");
let out = "", n = 0;
for (const part of css.split("/*").slice(1)) {
  if (part.slice(0, part.indexOf("*/")).trim() !== "latin") continue;
  const block = "@font-face" + part.slice(part.indexOf("@font-face") + 10);
  const m = block.match(/url\((https:\/\/fonts\.gstatic\.com\/[^)]+)\)/);
  if (!m) continue;
  const tmp = ".f" + n++ + ".woff2";
  cp.execSync(`curl -sS -o ${tmp} "${m[1]}"`);
  out += block
    .replace(m[1], "data:font/woff2;base64," + fs.readFileSync(tmp).toString("base64"))
    .replace(/unicode-range:[^;]+;/, "") + "\n";
  fs.unlinkSync(tmp);
}
fs.writeFileSync("fonts.css", out);
console.log("fonts.css:", n, "familias,", (out.length / 1024 | 0) + " KB");
'
rm -f .gf.css
