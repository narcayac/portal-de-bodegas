#!/usr/bin/env node
// Sistema de diseño — documento visual en PDF, 16:9 apaisado.
//
// El documento está hecho con el sistema que documenta: usa las fuentes
// reales, los tokens reales y los componentes exportados por
// ../shared/brand.js. Si algo se ve mal acá, está mal en la marca.
//
//   node build.js      → salida/sistema-de-diseno.pdf
const fs = require("fs");
const path = require("path");
const { chromium } = require("playwright");
const {
  FONTS, C, REPO, whatsappButton, chromePath,
} = require("../shared/brand.js");

// Los archivos reales de marca. No se usan logo() ni wordmark() de
// ../shared/brand.js: esos son una reconstrucción en SVG que no coincide con
// el logotipo real —ni en el dibujo del isotipo ni en la tipografía de la
// palabra—. Un sistema de diseño no puede documentar una aproximación.
const asset = (f) =>
  "data:image/png;base64," +
  fs.readFileSync(path.join(REPO, "public/brand", f)).toString("base64");
const ISOTIPO = asset("isotipo.png");
const LOGOTIPO = asset("logo.png");

const CHROME = chromePath();
const W = 1920;
const H = 1080;
const OUT = path.join(__dirname, "salida");
const TOTAL = 8;

// ── Datos ─────────────────────────────────────────────────────────────────────
const COLORES = [
  ["Institucional", [
    ["navy", "#011943", "Fondo de toda pieza; texto sobre blanco"],
    ["navyMid", "#0d2444", "Punto claro del degradado radial"],
  ]],
  ["Acento", [
    ["blue", "#0685de", "Reglas, botones, el &laquo;de&raquo; del logotipo"],
    ["blueDark", "#035caa", "Estado hover del acento"],
    ["blueLight", "#89c7f6", "R&oacute;tulos e &iacute;conos sobre oscuro"],
  ]],
  ["Neutros", [
    ["slate", "#6c7b92", "Texto secundario sobre blanco"],
    ["slateLight", "#adb2c0", "Texto terciario, deshabilitado"],
    ["border", "#e2e8f0", "Bordes y separadores"],
    ["bgAlt", "#f8f9fb", "Fondo de secciones alternadas"],
  ]],
  ["WhatsApp", [
    ["wa", "#25D366", "Solo el bot&oacute;n de WhatsApp"],
    ["waDark", "#1da851", "Hover del bot&oacute;n"],
  ]],
];

const FAMILIAS = [
  ["Fraunces", "Fraunces,Georgia,serif", 600, "Titulares. Es la voz de la marca.", "400 · 500 · 600 · 700"],
  ["Inter", "Inter,sans-serif", 300, "Cuerpo de texto y bajadas.", "300 · 400 · 500 · 600"],
  ["IBM Plex Mono", "'IBM Plex Mono',monospace", 500, "R&oacute;tulos, direcciones, contadores y cifras de ficha.", "400 · 500 · 600"],
  ["Plus Jakarta Sans", "'Plus Jakarta Sans',sans-serif", 800, "Solo el logotipo y el bot&oacute;n de WhatsApp.", "700 · 800"],
];

const REGLAS = [
  ["Piso de legibilidad m&oacute;vil",
   "Una pieza de 1080 px se ve en el tel&eacute;fono a unos 400 px. Bajo 28 px de cuerpo &mdash;o 24 px en mono&mdash; el texto no se lee en la mano."],
  ["Nunca text-shadow en PDF",
   "Chromium rasteriza el desenfoque como un rect&aacute;ngulo opaco y el texto sale con una caja detr&aacute;s. Sobre foto se resuelve con degradados."],
  ["Ninguna cifra sin fuente",
   "La atribuci&oacute;n va visible en la l&aacute;mina donde aparece el dato, y el desglose completo en el caption."],
  ["El pie de fuente no envuelve",
   "Lleva white-space:nowrap: si no cabe en una l&iacute;nea se corta, y eso avisa en la revisi&oacute;n. Se acorta la atribuci&oacute;n, no el cuerpo."],
  ["Revisar los PDF a 72 dpi o m&aacute;s",
   "A 50 dpi los artefactos de impresi&oacute;n no se distinguen. Un documento se dio por bueno dos veces antes de que aparecieran."],
  ["La foto dice lo que dice el r&oacute;tulo",
   "Se rotul&oacute; un patio de maniobras sobre una zona de maquinaria estacionada, y una l&aacute;mina de acopio con la foto de una nave."],
];

const ARCHIVOS = [
  ["Tokens de color, tipograf&iacute;a y contenedor del sitio", "lib/data.js"],
  ["Carga de fuentes y variables CSS", "app/layout.jsx"],
  ["Resets, canal&oacute;n y comportamiento responsive", "app/globals.css"],
  ["Tokens, logotipo, bot&oacute;n y envoltorio de piezas sociales", "marketing/shared/brand.js"],
  ["Generaci&oacute;n de fonts.css en base64", "marketing/shared/fuentes.sh"],
  ["Escala del documento apaisado e &iacute;conos", "marketing/catalogo/build.js"],
  ["Pisos de tama&ntilde;o documentados", "marketing/informes/README.md"],
];

// Cuatro íconos de muestra. El set completo vive en ../catalogo/build.js:
// acá solo se enseña el idioma, no se duplica el catálogo entero.
const ICONOS = [
  ["Escudo", `<path d="M24 4 L41 10 V24C41 33.5 33.5 40.5 24 44C14.5 40.5 7 33.5 7 24 V10 Z" stroke="${C.blueLight}" stroke-width="3.2" stroke-linejoin="round"/><path d="M16.5 23.5 L21.5 28.5 L31.5 18.5" stroke="${C.blueLight}" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"/>`],
  ["Per&iacute;metro", `<rect x="5" y="9" width="38" height="30" stroke="${C.blueLight}" stroke-width="3.2" stroke-dasharray="6 5" stroke-linecap="round"/><path d="M27 13 L17 26 H23 L20 36 L31 22 H25 Z" fill="${C.blueLight}"/>`],
  ["C&aacute;mara", `<rect x="5" y="13" width="23" height="13" rx="2" stroke="${C.blueLight}" stroke-width="3.2"/><path d="M28 17 L42 11.5 V27.5 L28 22 Z" stroke="${C.blueLight}" stroke-width="3.2" stroke-linejoin="round"/><path d="M16 26 V38" stroke="${C.blueLight}" stroke-width="3.2"/><path d="M8 42 H24" stroke="${C.blueLight}" stroke-width="3.2" stroke-linecap="round"/>`],
  ["Cami&oacute;n", `<rect x="3" y="14" width="23" height="17" stroke="${C.blueLight}" stroke-width="3.2"/><path d="M26 20 H34 L44 27 V31 H26 Z" stroke="${C.blueLight}" stroke-width="3.2" stroke-linejoin="round"/><circle cx="14" cy="36" r="4.5" fill="${C.blueLight}"/><circle cx="35" cy="36" r="4.5" fill="${C.blueLight}"/>`],
];

// ── Piezas ────────────────────────────────────────────────────────────────────
// El logotipo real no tiene versión para fondo oscuro, así que en este
// documento —que es todo navy— va sobre una tarjeta blanca de esquinas rectas.
// Es la solución honesta mientras no exista la versión invertida.
const pie = (n) => `
<div class="pie">
  <div class="pie-chip"><img src="${LOGOTIPO}" alt=""></div>
  <div class="pie-n">Sistema de dise&ntilde;o &nbsp;&middot;&nbsp; ${String(n).padStart(2, "0")} / ${TOTAL}</div>
</div>`;

const cabecera = (eyebrow, titulo, bajada = "") => `
  <div class="eyebrow">${eyebrow}</div>
  <div class="rule"></div>
  <h1>${titulo}</h1>
  ${bajada ? `<div class="bajada">${bajada}</div>` : ""}`;

// 1 · Portada
const portada = () => `
<div class="slide plano">
  <div style="position:absolute;left:104px;right:104px;top:300px">
    <div class="eyebrow">Portal de Bodegas</div>
    <div class="rule"></div>
    <h1 style="font-size:116px;line-height:1.0">Sistema<br>de dise&ntilde;o</h1>
    <div class="bajada" style="font-size:33px;max-width:980px;margin-top:40px">
      Color, tipograf&iacute;a, logotipo y los componentes que se repiten en el sitio,
      en las piezas sociales y en los documentos comerciales.
    </div>
  </div>
  <div style="position:absolute;right:104px;top:290px;display:flex;gap:26px">
    ${["#0685de", "#89c7f6", "#6c7b92", "#e2e8f0"].map(
      (hex) => `<div style="width:92px;height:420px;background:${hex}"></div>`
    ).join("")}
  </div>
  ${pie(1)}
</div>`;

// 2 · Color
const color = () => `
<div class="slide plano">
  <div style="position:absolute;left:104px;right:104px;top:118px">
    ${cabecera("Color", "Once tokens, cuatro grupos",
      "El verde de WhatsApp no es un color de marca: es el color de un bot&oacute;n y no se usa para nada m&aacute;s.")}
    <div class="grupos">
      ${COLORES.map(([grupo, items]) => `
        <div class="grupo">
          <div class="grupo-t">${grupo}</div>
          ${items.map(([nombre, hex, uso]) => `
            <div class="sw">
              <div class="sw-c" style="background:${hex}"></div>
              <div class="sw-t">
                <div class="sw-n">${nombre}</div>
                <div class="sw-h">${hex.toUpperCase()}</div>
                <div class="sw-u">${uso}</div>
              </div>
            </div>`).join("")}
        </div>`).join("")}
    </div>
  </div>
  ${pie(2)}
</div>`;

// 3 · Tipografía
const tipografia = () => `
<div class="slide plano">
  <div style="position:absolute;left:104px;right:104px;top:110px">
    ${cabecera("Tipograf&iacute;a", "Cuatro familias, un trabajo cada una",
      "No se mezclan los roles. Un t&iacute;tulo en Inter o un r&oacute;tulo en Fraunces rompen el sistema.")}
    <div class="fams">
      ${FAMILIAS.map(([nombre, pila, peso, rol, pesos]) => `
        <div class="fam">
          <div class="fam-aa" style="font-family:${pila};font-weight:${peso}">Aa</div>
          <div class="fam-n" style="font-family:${pila};font-weight:${peso}">${nombre}</div>
          <div class="fam-r">${rol}</div>
          <div class="fam-p">${pesos}</div>
        </div>`).join("")}
    </div>
    <div class="nota">
      Ajustes &oacute;pticos: Fraunces siempre con letter-spacing negativo (&minus;.015em en
      titulares grandes, &minus;.01em en medianos) e interlineado entre 1.02 y 1.12 &mdash;
      cuanto mayor el cuerpo, m&aacute;s cerrada. Inter de cuerpo va en peso 300, no 400:
      en 400 compite con el titular. El mono siempre en may&uacute;sculas, con
      letter-spacing de .12em a .26em seg&uacute;n el tama&ntilde;o.
    </div>
  </div>
  ${pie(3)}
</div>`;

// 4 · Escala — con una pieza social real a escala
const escala = () => `
<div class="slide plano">
  <div style="position:absolute;left:104px;top:110px;width:1020px">
    ${cabecera("Escala", "Tres lienzos, tres escalas",
      "No se mezclan. Un tama&ntilde;o pensado para 1080 px no sirve en el sitio ni en el documento apaisado.")}
    <div class="esc">
      <div class="esc-g">Sitio web &mdash; tipograf&iacute;a fluida</div>
      <div class="esc-r"><span>Titular de portada</span><code>clamp(38px, 4.6vw, 60px)</code></div>
      <div class="esc-r"><span>Titular de secci&oacute;n</span><code>clamp(32px, 4.4vw, 52px)</code></div>
      <div class="esc-r"><span>Titular de tarjeta</span><code>clamp(28px, 4vw, 44px)</code></div>
      <div class="esc-r"><span>Canal&oacute;n</span><code>40px &rarr; 20px bajo 768px</code></div>

      <div class="esc-g" style="margin-top:30px">Pieza social &mdash; lienzo 1080 &times; 1350</div>
      <div class="esc-r"><span>Antet&iacute;tulo mono</span><code>21px · .24em</code></div>
      <div class="esc-r"><span>Subtitular Fraunces</span><code>66px · 1.12</code></div>
      <div class="esc-r"><span>Bajada Inter 300</span><code>31px · 1.45</code></div>
      <div class="esc-r"><span>M&aacute;rgenes</span><code>72px</code></div>

      <div class="esc-g" style="margin-top:30px">Documento apaisado &mdash; lienzo 1920 &times; 1080</div>
      <div class="esc-r"><span>Titular de portada</span><code>104px</code></div>
      <div class="esc-r"><span>Bajada Inter 300</span><code>34px</code></div>
      <div class="esc-r"><span>M&aacute;rgenes</span><code>104px · pie a 60px</code></div>
    </div>
  </div>

  <div class="mock-wrap">
    <div class="mock-cap">Pieza social a escala, con sus medidas reales</div>
    <div class="mock-box">
      <div class="mock">
        <div style="position:absolute;left:72px;right:72px;bottom:72px">
          <div style="font-family:'IBM Plex Mono',monospace;font-weight:500;font-size:21px;
            letter-spacing:.24em;text-transform:uppercase;color:${C.blueLight}">Informe N&ordm; 04</div>
          <div style="width:78px;height:3px;background:${C.blue};margin:26px 0 34px"></div>
          <div style="font-family:Fraunces,Georgia,serif;font-weight:600;font-size:66px;
            color:#fff;line-height:1.12;letter-spacing:-.01em">Dos mercados,<br>dos direcciones</div>
          <div style="font-family:Inter,sans-serif;font-weight:300;font-size:31px;
            color:rgba(255,255,255,.88);line-height:1.45;margin-top:22px;max-width:820px">
            La vacancia industrial cae mientras la minibodega sube.</div>
        </div>
      </div>
    </div>
  </div>
  ${pie(4)}
</div>`;

// 5 · Logotipo
const logotipo = () => `
<div class="slide plano">
  <div style="position:absolute;left:104px;right:104px;top:118px">
    ${cabecera("Logotipo", "Un archivo, no una composici&oacute;n",
      "Se usa el archivo tal cual. No se recompone con tipograf&iacute;a ni se recolorea.")}
    <div class="logos">
      <div class="logo-caja"><img src="${ISOTIPO}" style="height:196px">
        <div class="logo-pie">Isotipo</div></div>
      <div class="logo-caja ancha"><img src="${LOGOTIPO}" style="height:92px">
        <div class="logo-pie">Logotipo en conjunto</div></div>
    </div>
    <div class="logo-fila">
      <div class="logo-specs">
        <div class="ls"><b>Archivos</b>public/brand/isotipo.png &middot; logo.png</div>
        <div class="ls"><b>Fondo</b>Blanco o claro. Ver advertencia &rarr;</div>
        <div class="ls"><b>Caja</b>Siempre min&uacute;scula</div>
        <div class="ls"><b>Invariante</b>El &laquo;de&raquo; va en azul</div>
      </div>
      <div class="aviso">
        <div class="aviso-t">No existe versi&oacute;n para fondo oscuro</div>
        <div class="aviso-d">Sobre navy el c&iacute;rculo del isotipo desaparece y la palabra,
          que es navy, se reduce a los blancos interiores de las letras. Esto es el archivo
          real puesto sobre el fondo de marca:</div>
        <div class="aviso-demo"><img src="${LOGOTIPO}" style="height:62px"></div>
        <div class="aviso-n">Mientras no exista la versi&oacute;n invertida, en piezas oscuras
          va sobre tarjeta blanca de esquinas rectas &mdash; como en el pie de este documento.</div>
      </div>
    </div>
  </div>
  ${pie(5)}
</div>`;

// 6 · Componentes
const componentes = () => `
<div class="slide plano">
  <div style="position:absolute;left:104px;right:104px;top:110px">
    ${cabecera("Componentes", "Lo que se repite en cada pieza")}
    <div class="comps">
      <div class="comp">
        <div class="comp-t">Antet&iacute;tulo y regla</div>
        <div class="comp-d">Todo bloque abre igual. Es el gesto que hace reconocible al sistema.</div>
        <div class="comp-m">
          <div class="eyebrow" style="font-size:19px">Informe de mercado</div>
          <div class="rule" style="margin:20px 0 0"></div>
        </div>
      </div>
      <div class="comp">
        <div class="comp-t">Insignia</div>
        <div class="comp-d">Para numerar ediciones o marcar destinatario. Arriba a la derecha.</div>
        <div class="comp-m">
          <span class="badge-d">Octubre 2026</span>
        </div>
      </div>
      <div class="comp">
        <div class="comp-t">Degradado sobre foto</div>
        <div class="comp-d">El texto nunca va directo sobre la imagen. Nunca con sombra: siempre con degradado.</div>
        <div class="comp-m">
          <div class="grad"><span>Texto legible</span></div>
        </div>
      </div>
      <div class="comp">
        <div class="comp-t">Bot&oacute;n de WhatsApp</div>
        <div class="comp-d">Rect&aacute;ngulo recto, sin esquinas redondeadas. El &uacute;nico uso del verde.</div>
        <div class="comp-m" style="transform:scale(.52);transform-origin:left top;height:70px">
          ${whatsappButton("Cotiza por WhatsApp")}
        </div>
      </div>
      <div class="comp comp-ancho">
        <div class="comp-t">&Iacute;conos</div>
        <div class="comp-d">Lienzo de 48 &times; 48, trazo de 2.5 a 3.2 seg&uacute;n el tama&ntilde;o final,
          relleno s&oacute;lido solo donde hace falta peso. Blancos sobre c&iacute;rculo de color;
          en blueLight cuando se apoyan directo sobre el fondo. Bajo 48 px hay que quitarles
          elementos o se vuelven manchas.</div>
        <div class="comp-m" style="display:flex;gap:60px;align-items:center">
          ${ICONOS.map(([n, d]) => `
            <div style="text-align:center">
              <svg width="56" height="56" viewBox="0 0 48 48" fill="none">${d}</svg>
              <div class="ico-n">${n}</div>
            </div>`).join("")}
        </div>
      </div>
    </div>
  </div>
  ${pie(6)}
</div>`;

// 7 · Reglas duras, con la demostración del piso de legibilidad
const reglas = () => `
<div class="slide plano">
  <div style="position:absolute;left:104px;top:110px;width:1030px">
    ${cabecera("Reglas duras", "Seis, y todas salieron de un error",
      "No son preferencias de estilo. Cada una cost&oacute; rehacer un entregable.")}
    <div class="reglas">
      ${REGLAS.map(([t, d], i) => `
        <div class="reg">
          <div class="reg-n">${String(i + 1).padStart(2, "0")}</div>
          <div><div class="reg-t">${t}</div><div class="reg-d">${d}</div></div>
        </div>`).join("")}
    </div>
  </div>

  <div class="demo">
    <div class="demo-t">El piso de 28 px, demostrado</div>
    <div class="demo-d">Las dos muestras est&aacute;n al 37%: el tama&ntilde;o real
      al que se ve una pieza de 1080 px en un tel&eacute;fono.</div>
    <div class="demo-caja">
      <div class="demo-et">Cuerpo a 28 px</div>
      <div style="font-family:Inter,sans-serif;font-weight:300;font-size:28px;
        color:#fff;line-height:1.45;transform:scale(.37);transform-origin:left top;
        width:1500px;height:50px">La vacancia industrial de Santiago se mantiene bajo el 1,5%.</div>
    </div>
    <div class="demo-caja">
      <div class="demo-et">Cuerpo a 17 px</div>
      <div style="font-family:Inter,sans-serif;font-weight:300;font-size:17px;
        color:#fff;line-height:1.45;transform:scale(.37);transform-origin:left top;
        width:1500px;height:36px">La vacancia industrial de Santiago se mantiene bajo el 1,5%.</div>
    </div>
    <div class="demo-n">Los dos se leen en el monitor. Uno de los dos no se lee en la mano.</div>
  </div>
  ${pie(7)}
</div>`;

// 8 · Dónde vive cada cosa
const archivos = () => `
<div class="slide plano">
  <div style="position:absolute;left:104px;right:104px;top:130px">
    ${cabecera("Fuentes de verdad", "D&oacute;nde vive cada definici&oacute;n",
      "Este documento es un reflejo, no la fuente. Si alguien cambia un token all&aacute;, esto queda desactualizado en silencio.")}
    <table class="tbl">
      <thead><tr><th>Qu&eacute;</th><th>Archivo</th></tr></thead>
      <tbody>
        ${ARCHIVOS.map(([q, f]) => `<tr><td>${q}</td><td class="mono">${f}</td></tr>`).join("")}
      </tbody>
    </table>
    <div class="nota" style="margin-top:30px">
      Para regenerar: <span class="mono-i">../shared/fuentes.sh</span> y luego
      <span class="mono-i">node build.js</span>.
    </div>
  </div>
  ${pie(8)}
</div>`;

const slides = [
  portada(), color(), tipografia(), escala(),
  logotipo(), componentes(), reglas(), archivos(),
];

const html = `<!doctype html><html lang="es"><head><meta charset="utf-8"><style>
${FONTS}
@page { size: ${W}px ${H}px; margin: 0; }
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:Inter,sans-serif;-webkit-font-smoothing:antialiased}
.slide{position:relative;width:${W}px;height:${H}px;overflow:hidden;background:${C.navy};
  page-break-after:always}
.slide:last-child{page-break-after:auto}
.plano{background:radial-gradient(130% 90% at 18% 0%, ${"#0d2444"} 0%, ${C.navy} 64%)}

.eyebrow{font-family:'IBM Plex Mono',monospace;font-weight:500;font-size:22px;
  letter-spacing:.26em;text-transform:uppercase;color:${C.blueLight}}
.rule{width:92px;height:4px;background:${C.blue};margin:28px 0 34px}
h1{font-family:Fraunces,Georgia,serif;font-weight:600;color:#fff;font-size:64px;
  line-height:1.06;letter-spacing:-.015em}
.bajada{font-family:Inter,sans-serif;font-weight:300;font-size:27px;
  color:rgba(255,255,255,.76);line-height:1.46;margin-top:22px;max-width:1180px}
.nota{font-family:Inter,sans-serif;font-weight:300;font-size:21px;line-height:1.55;
  color:rgba(255,255,255,.56);max-width:1500px}
.mono{font-family:'IBM Plex Mono',monospace;font-weight:500;color:${C.blueLight}}
.mono-i{font-family:'IBM Plex Mono',monospace;font-weight:500;color:${C.blueLight};font-size:19px}

.pie{position:absolute;left:104px;right:104px;bottom:54px;display:flex;align-items:center;
  justify-content:space-between}
.pie-l{display:flex;align-items:center;gap:20px}
.wm{font-family:'Plus Jakarta Sans',sans-serif;font-weight:800;font-size:30px;letter-spacing:-.01em}
.pie-n{font-family:'IBM Plex Mono',monospace;font-weight:500;font-size:19px;
  letter-spacing:.16em;color:rgba(255,255,255,.52)}

/* Color */
.grupos{display:flex;gap:56px;margin-top:40px}
.grupo{flex:1}
.grupo-t{font-family:'IBM Plex Mono',monospace;font-weight:500;font-size:18px;
  letter-spacing:.2em;text-transform:uppercase;color:${C.blueLight};
  border-bottom:2px solid ${C.blue};padding-bottom:14px;margin-bottom:22px}
.sw{display:flex;gap:20px;align-items:flex-start;margin-bottom:22px}
/* El borde es fuerte a propósito: navy y navyMid sobre fondo navy son
   invisibles sin él, y una muestra que no se ve no documenta nada. */
.sw-c{width:72px;height:72px;flex:none;outline:1px solid rgba(255,255,255,.5);outline-offset:-1px}
.sw-n{font-family:'IBM Plex Mono',monospace;font-weight:500;font-size:20px;color:#fff}
.sw-h{font-family:'IBM Plex Mono',monospace;font-weight:500;font-size:17px;
  color:${C.blueLight};margin-top:4px}
.sw-u{font-family:Inter,sans-serif;font-weight:300;font-size:18px;
  color:rgba(255,255,255,.6);line-height:1.38;margin-top:8px}

/* Tipografía */
.fams{display:flex;gap:46px;margin-top:40px}
.fam{flex:1;border-top:4px solid ${C.blue};padding-top:26px}
.fam-aa{font-size:116px;color:#fff;line-height:1;letter-spacing:-.02em}
.fam-n{font-size:33px;color:#fff;margin-top:22px}
.fam-r{font-family:Inter,sans-serif;font-weight:300;font-size:21px;
  color:rgba(255,255,255,.7);line-height:1.46;margin-top:14px;min-height:62px}
.fam-p{font-family:'IBM Plex Mono',monospace;font-weight:500;font-size:17px;
  letter-spacing:.1em;color:${C.blueLight};margin-top:10px}

/* Escala */
.esc{margin-top:34px}
.esc-g{font-family:'IBM Plex Mono',monospace;font-weight:500;font-size:17px;
  letter-spacing:.2em;text-transform:uppercase;color:${C.blueLight};
  border-bottom:1px solid rgba(255,255,255,.2);padding-bottom:10px;margin-bottom:6px}
.esc-r{display:flex;justify-content:space-between;align-items:baseline;padding:5px 0;
  border-bottom:1px solid rgba(255,255,255,.08)}
.esc-r span{font-family:Inter,sans-serif;font-weight:300;font-size:20px;color:rgba(255,255,255,.88)}
.esc-r code{font-family:'IBM Plex Mono',monospace;font-weight:500;font-size:18px;color:${C.blueLight}}
.mock-wrap{position:absolute;right:104px;top:150px;width:620px}
.mock-cap{font-family:'IBM Plex Mono',monospace;font-weight:500;font-size:16px;
  letter-spacing:.16em;text-transform:uppercase;color:rgba(255,255,255,.5);margin-bottom:18px}
.mock-box{width:486px;height:607px;overflow:hidden;outline:1px solid rgba(255,255,255,.22)}
.mock{width:1080px;height:1350px;position:relative;
  background:radial-gradient(120% 80% at 50% 0%, #0d2444 0%, ${C.navy} 62%);
  transform:scale(.45);transform-origin:left top}

/* Logotipo */
.logos{display:flex;gap:38px;margin-top:28px;align-items:stretch}
.logo-caja{width:330px;flex:none;background:#fff;display:flex;flex-direction:column;
  align-items:center;justify-content:center;padding:34px 0 22px}
.logo-caja.ancha{flex:1;width:auto}
.logo-pie{font-family:'IBM Plex Mono',monospace;font-weight:500;font-size:15px;
  letter-spacing:.16em;text-transform:uppercase;margin-top:24px;color:${C.slate}}
.logo-fila{display:flex;gap:56px;margin-top:26px;align-items:flex-start}
.logo-specs{flex:1}
.ls{display:flex;gap:18px;font-family:Inter,sans-serif;font-weight:300;font-size:20px;
  color:rgba(255,255,255,.82);padding:11px 0;border-top:1px solid rgba(255,255,255,.13)}
.ls b{font-family:'IBM Plex Mono',monospace;font-weight:500;font-size:15px;letter-spacing:.16em;
  text-transform:uppercase;color:${C.blueLight};width:190px;flex:none;padding-top:4px}
.aviso{width:770px;flex:none;border-left:4px solid ${C.blue};padding-left:34px}
.aviso-t{font-family:Fraunces,Georgia,serif;font-weight:600;font-size:28px;color:#fff}
.aviso-d{font-family:Inter,sans-serif;font-weight:300;font-size:19px;line-height:1.46;
  color:rgba(255,255,255,.7);margin-top:11px}
.aviso-demo{margin-top:12px;padding:8px 0}
.aviso-n{font-family:Inter,sans-serif;font-weight:300;font-size:17px;line-height:1.42;
  color:rgba(255,255,255,.52);margin-top:8px}

/* Pie: tarjeta blanca porque el logotipo real no tiene versión invertida */
.pie-chip{background:#fff;padding:11px 16px;display:inline-flex;align-items:center}
.pie-chip img{height:30px;display:block}

/* Componentes */
.comps{display:flex;flex-wrap:wrap;gap:30px 44px;margin-top:34px}
.comp{width:390px;border-top:1px solid rgba(255,255,255,.18);padding-top:20px}
.comp-ancho{width:100%}
.comp-t{font-family:Fraunces,Georgia,serif;font-weight:600;font-size:28px;color:#fff}
.comp-d{font-family:Inter,sans-serif;font-weight:300;font-size:19px;line-height:1.46;
  color:rgba(255,255,255,.64);margin-top:9px}
.comp-m{margin-top:20px;min-height:76px}
.badge-d{display:inline-block;background:rgba(1,25,67,.85);outline:1px solid rgba(255,255,255,.22);
  color:#fff;font-family:'IBM Plex Mono',monospace;font-weight:500;font-size:19px;
  letter-spacing:.18em;padding:13px 24px}
.grad{width:330px;height:76px;position:relative;
  background:linear-gradient(to top, ${C.navy} 0%, ${C.navy}cc 44%, #3f5b7e 100%);
  display:flex;align-items:flex-end;padding:12px 16px}
.grad span{font-family:Inter,sans-serif;font-weight:300;font-size:21px;color:#fff}
.ico-n{font-family:'IBM Plex Mono',monospace;font-weight:500;font-size:15px;
  letter-spacing:.14em;text-transform:uppercase;color:rgba(255,255,255,.58);margin-top:10px}

/* Reglas */
.reglas{margin-top:30px}
.reg{display:flex;gap:24px;align-items:flex-start;padding:8px 0;
  border-top:1px solid rgba(255,255,255,.13)}
.reg-n{font-family:'IBM Plex Mono',monospace;font-weight:500;font-size:19px;
  color:${C.blueLight};width:42px;flex:none;padding-top:5px}
.reg-t{font-family:Fraunces,Georgia,serif;font-weight:600;font-size:26px;color:#fff;line-height:1.2}
.reg-d{font-family:Inter,sans-serif;font-weight:300;font-size:18px;line-height:1.42;
  color:rgba(255,255,255,.66);margin-top:6px}
.demo{position:absolute;right:104px;top:210px;width:600px;
  border-left:4px solid ${C.blue};padding-left:40px}
.demo-t{font-family:Fraunces,Georgia,serif;font-weight:600;font-size:34px;color:#fff}
.demo-d{font-family:Inter,sans-serif;font-weight:300;font-size:20px;line-height:1.46;
  color:rgba(255,255,255,.66);margin-top:12px}
.demo-caja{margin-top:26px;background:rgba(255,255,255,.05);padding:20px 22px;
  outline:1px solid rgba(255,255,255,.12)}
.demo-et{font-family:'IBM Plex Mono',monospace;font-weight:500;font-size:15px;
  letter-spacing:.16em;text-transform:uppercase;color:${C.blueLight};margin-bottom:14px}
.demo-n{font-family:Inter,sans-serif;font-weight:300;font-size:19px;line-height:1.46;
  color:rgba(255,255,255,.56);margin-top:24px}

/* Tabla */
.tbl{width:100%;border-collapse:collapse;margin-top:46px}
.tbl th{font-family:'IBM Plex Mono',monospace;font-weight:500;font-size:18px;
  letter-spacing:.18em;text-transform:uppercase;color:${C.blueLight};text-align:left;
  padding:0 26px 18px 0;border-bottom:3px solid ${C.blue}}
.tbl td{font-family:Inter,sans-serif;font-weight:300;font-size:23px;color:rgba(255,255,255,.88);
  padding:15px 26px 15px 0;border-bottom:1px solid rgba(255,255,255,.13)}
.tbl td.mono{font-size:21px}
</style></head><body>${slides.join("\n")}</body></html>`;

(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  const browser = await chromium.launch({ executablePath: CHROME });
  const page = await browser.newPage({ viewport: { width: W, height: H } });
  await page.setContent(html, { waitUntil: "load" });
  await page.evaluate(() => document.fonts.ready);

  const archivo = path.join(OUT, "sistema-de-diseno.pdf");
  await page.pdf({
    path: archivo,
    printBackground: true,
    width: `${W}px`,
    height: `${H}px`,
    margin: { top: 0, right: 0, bottom: 0, left: 0 },
  });

  await browser.close();
  const kb = Math.round(fs.statSync(archivo).size / 1024);
  console.log(`✓ ${archivo} — ${slides.length} láminas, ${kb} KB`);
})();
