// Arma un video vertical/4:5 a partir de un carrusel ya renderizado
// (slide-0N.png), con un leve zoom (Ken Burns) por slide y fundidos cortos
// entre cortes. Pensado para Reels/feed con voz en off grabada aparte —
// no genera ni sintetiza voz, solo la mezcla si se le pasa un archivo de
// audio.
//
//   node video.js <carpeta-de-slides> [--audio ruta.mp3] [nombre-salida.mp4]
//
// La duración de cada slide sale de <carpeta-de-slides>/durations.json
// (array de segundos, uno por slide, en orden). Si no existe, usa 4s parejo
// para cada una.
//
//   node video.js ../guias/salida/cuanto-cobra-un-corredor
//   node video.js ../guias/salida/cuanto-cobra-un-corredor --audio voz.mp3
const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");

const FFMPEG = process.env.FFMPEG_PATH || "ffmpeg";

const WIDTH = 1080;
const HEIGHT = 1350;
const FPS = 25;
const FADE = 0.3; // segundos de fundido a negro entre slides

const args = process.argv.slice(2);
const audioIdx = args.indexOf("--audio");
const audioPath = audioIdx >= 0 ? path.resolve(process.cwd(), args[audioIdx + 1]) : null;
const positional = args.filter((a, i) => {
  if (a === "--audio") return false;
  if (audioIdx >= 0 && i === audioIdx + 1) return false;
  return true;
});
const dirArg = positional[0];
if (!dirArg) {
  console.error("Uso: node video.js <carpeta-de-slides> [--audio ruta.mp3] [nombre-salida.mp4]");
  process.exit(1);
}
const outName = positional[1] || "video.mp4";

const dir = path.resolve(process.cwd(), dirArg);
const slides = fs
  .readdirSync(dir)
  .filter((f) => /^slide-\d+\.png$/.test(f))
  .sort();

if (!slides.length) {
  console.error("No hay slide-0N.png en", dir);
  process.exit(1);
}

const durationsFile = path.join(dir, "durations.json");
const durations = fs.existsSync(durationsFile)
  ? JSON.parse(fs.readFileSync(durationsFile, "utf8"))
  : slides.map(() => 4);

if (durations.length !== slides.length) {
  console.error(
    `durations.json tiene ${durations.length} valores pero hay ${slides.length} slides`
  );
  process.exit(1);
}

const tmp = fs.mkdtempSync(path.join(require("os").tmpdir(), "guias-video-"));

console.log(path.basename(dir));

slides.forEach((slide, i) => {
  const d = durations[i];
  const frames = Math.round(d * FPS);
  const clip = path.join(tmp, `clip-${String(i).padStart(2, "0")}.mp4`);
  const vf = [
    `scale=${WIDTH}:${HEIGHT}`,
    `zoompan=z='min(zoom+0.0012,1.08)':d=${frames}:s=${WIDTH}x${HEIGHT}:fps=${FPS}`,
    `fade=t=in:st=0:d=${FADE}`,
    `fade=t=out:st=${Math.max(d - FADE, 0)}:d=${FADE}`,
  ].join(",");
  execFileSync(FFMPEG, [
    "-y",
    "-loop", "1",
    "-i", path.join(dir, slide),
    "-t", String(d),
    "-vf", vf,
    "-r", String(FPS),
    "-pix_fmt", "yuv420p",
    "-c:v", "libx264",
    clip,
  ]);
  console.log(`✓ ${slide} (${d}s)`);
});

const listFile = path.join(tmp, "list.txt");
fs.writeFileSync(
  listFile,
  slides.map((_, i) => `file 'clip-${String(i).padStart(2, "0")}.mp4'`).join("\n")
);

const silent = path.join(tmp, "silent.mp4");
execFileSync(FFMPEG, ["-y", "-f", "concat", "-safe", "0", "-i", listFile, "-c", "copy", silent]);

const outFile = path.join(dir, outName);

if (audioPath) {
  execFileSync(FFMPEG, [
    "-y",
    "-i", silent,
    "-i", audioPath,
    "-map", "0:v",
    "-map", "1:a",
    "-c:v", "copy",
    "-c:a", "aac",
    "-shortest",
    outFile,
  ]);
} else {
  fs.copyFileSync(silent, outFile);
}

fs.rmSync(tmp, { recursive: true, force: true });
console.log("✓", outFile);
