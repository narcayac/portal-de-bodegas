#!/usr/bin/env node
// Catálogo de capacidad — documento comercial en PDF, 16:9 apaisado.
//
// A diferencia del resto de marketing/, esto no es contenido social: es un
// documento que se adjunta a un correo y se reenvía dentro de otra empresa.
// Por eso sale en PDF de una sola pasada (no PNG por lámina) y por eso el
// cuerpo de texto es más grande de lo que parece necesario en pantalla: se
// lee impreso y proyectado, no en un teléfono.
//
//   node build.js            → salida/catalogo-portal-de-bodegas.pdf
const fs = require("fs");
const path = require("path");
const { chromium } = require("playwright");
const { execFileSync } = require("child_process");
const { FONTS, C, REPO, logo, wordmark, chromePath } = require("../shared/brand.js");

const CHROME = chromePath();

// No se usa photo() de shared/brand.js: ese incrusta el webp tal cual y Chromium,
// al imprimir a PDF, lo reencodifica sin pérdida. El documento terminaba en 22 MB,
// que es demasiado para adjuntar a un correo. Pasando por JPEG el peso baja a un
// tercio sin diferencia visible a tamaño de pantalla.
function foto(categoria, n, ancho = 2000) {
  const f = path.join(REPO, "public/photos", categoria, `foto-0${n}.webp`);
  const jpg = execFileSync(
    "convert",
    [f, "-resize", `${ancho}x>`, "-quality", "80", "-strip", "jpg:-"],
    { maxBuffer: 64 * 1024 * 1024 }
  );
  return "data:image/jpeg;base64," + jpg.toString("base64");
}
const W = 1920;
const H = 1080;
const OUT = path.join(__dirname, "salida");

// ── Datos ─────────────────────────────────────────────────────────────────────
// Metrajes y direcciones salen de lib/data.js — si cambian allá, cambian acá.
const RECINTOS = [
  {
    id: "bosque-catemito",
    nombre: "Bosque Catemito",
    direccion: "Camino Catemito 1990",
    foto: 4,
    rango: "360 – 14.000 m&sup2;",
    titular: "La mayor escala de la red",
    cuerpo:
      "M&oacute;dulos desde 360 m&sup2; combinables hasta 14.000 m&sup2; bajo un mismo techo, " +
      "sobre un terreno con capacidad para construir hasta 30.000 m&sup2; a medida.",
    specs: [
      ["Superficie techada", "360 a 14.000 m&sup2;, en m&oacute;dulos combinables"],
      ["Construcci&oacute;n a medida", "Hasta 30.000 m&sup2; sobre terreno propio"],
      ["Acopio a cielo abierto", "2.000 a 40.000 m&sup2; en el mismo recinto"],
      ["Uso", "Centro de distribuci&oacute;n y operaci&oacute;n de gran escala"],
    ],
  },
  {
    id: "inversiones-duramet",
    nombre: "Inversiones Duramet",
    direccion: "General Urrutia 101",
    foto: 1,
    rango: "450 – 1.900 m&sup2;",
    titular: "Crecimiento por etapas",
    cuerpo:
      "Rango amplio en un mismo recinto: permite consolidar una operaci&oacute;n mediana " +
      "o escalar por tramos sin cambiar de direcci&oacute;n.",
    specs: [
      ["Superficie techada", "450 a 1.900 m&sup2;"],
      ["Patio", "Maniobra y acceso directo para cami&oacute;n"],
      ["Instalaciones", "Radier industrial y energ&iacute;a trif&aacute;sica"],
      ["Uso", "Distribuci&oacute;n y almacenaje de volumen medio"],
    ],
  },
  {
    id: "acacias-seis",
    nombre: "Acacias Seis",
    direccion: "Las Acacias 1250",
    foto: 3,
    rango: "1.551 m&sup2;",
    titular: "Planta libre, sin columnas",
    cuerpo:
      "Una sola nave contigua de 1.551 m&sup2; sin apoyos intermedios: el metraje &uacute;til " +
      "coincide con el metraje contratado.",
    specs: [
      ["Superficie techada", "1.551 m&sup2; en nave &uacute;nica"],
      ["Estructura", "Planta libre, sin columnas interiores"],
      ["Instalaciones", "Radier industrial y energ&iacute;a trif&aacute;sica"],
      ["Uso", "Racking continuo y manufactura liviana"],
    ],
  },
  {
    id: "el-barrancon",
    nombre: "El Barrancón",
    direccion: "Camino El Barranc&oacute;n, Lote D, N&ordm; 3890",
    foto: 2,
    rango: "623 – 1.266 m&sup2;",
    titular: "Dimensionado para camión grande",
    cuerpo:
      "V&iacute;as de circulaci&oacute;n extra anchas y patios de maniobra amplios: el cami&oacute;n " +
      "entra, gira y carga sin bloquear al siguiente.",
    specs: [
      ["Superficie techada", "623 a 1.266 m&sup2;"],
      ["Circulaci&oacute;n", "V&iacute;as extra anchas y patios amplios"],
      ["Conexi&oacute;n", "Acceso r&aacute;pido a Ruta 5 Sur y Am&eacute;rico Vespucio"],
      ["Uso", "Log&iacute;stica y distribuci&oacute;n con flota pesada"],
    ],
  },
  {
    id: "alto-las-acacias",
    nombre: "Alto Las Acacias",
    direccion: "Las Acacias 1250",
    foto: 1,
    rango: "180 – 720 m&sup2;",
    titular: "Superficies acotadas",
    cuerpo:
      "El tramo chico de la red, para operaciones que necesitan presencia en el sur " +
      "de Santiago sin comprometer superficie que no van a usar.",
    specs: [
      ["Superficie techada", "180 a 720 m&sup2;"],
      ["Instalaciones", "Radier industrial y energ&iacute;a trif&aacute;sica"],
      ["Patio", "Estacionamiento para cami&oacute;n"],
      ["Uso", "Operaci&oacute;n acotada o avanzada regional"],
    ],
  },
];

const EQUIPAMIENTO = [
  ["Seguridad", "24/7 con guardia en el recinto"],
  ["Per&iacute;metro", "Cerco el&eacute;ctrico perimetral"],
  ["Vigilancia", "C&aacute;maras CCTV y PTZ en exterior"],
  ["Acceso", "Control de acceso al recinto"],
  ["Energ&iacute;a", "Trif&aacute;sica instalada"],
  ["Pisos", "Radieres industriales alisados"],
  ["Maniobra", "Patios amplios y v&iacute;as extra anchas"],
  ["Camiones", "Acceso directo y estacionamiento"],
];

const COLABORACION = [
  [
    "Capacidad para sus contratos",
    "TIBA opera, nosotros ponemos los metros. Al ser propietarios directos no hay " +
      "corredor en medio: el costo del espacio entra limpio a la estructura del contrato.",
  ],
  [
    "Acopio de contenedores",
    "De 2.000 a 40.000 m&sup2; de terreno nivelado desde 0,02 UF/m&sup2; al mes, dentro " +
      "de recinto cerrado. Para carga, equipos y contenedores que no requieren techo.",
  ],
  [
    "Construcci&oacute;n a medida",
    "Hasta 30.000 m&sup2; en Bosque Catemito, dise&ntilde;ados sobre la especificaci&oacute;n " +
      "de un contrato que lo justifique, antes de que el arriendo empiece a correr.",
  ],
  [
    "Capacidad de respaldo",
    "Superficie adicional para peaks estacionales o sobreflujo, sin obligar a comprometer " +
      "un contrato de largo plazo por metros que se usan tres meses al a&ntilde;o.",
  ],
];

// ── Piezas de maquetación ─────────────────────────────────────────────────────
const pie = (n, total, oscuro = true) => `
<div class="pie">
  <div class="pie-l">${logo(oscuro)}${wordmark(oscuro)}</div>
  <div class="pie-n" style="color:${oscuro ? "rgba(255,255,255,.62)" : C.slate}">
    ${String(n).padStart(2, "0")} / ${String(total).padStart(2, "0")}
  </div>
</div>`;

const TOTAL = 13;

// Portada
const portada = () => `
<div class="slide">
  <img class="bg" src="${foto("el-barrancon", 1)}">
  <div class="scrim"></div>
  <div class="cover-txt" style="position:absolute;left:104px;right:104px;bottom:210px">
    <div class="eyebrow">Portal de Bodegas &middot; San Bernardo, Regi&oacute;n Metropolitana</div>
    <div class="rule"></div>
    <h1 style="font-size:104px">Capacidad de almacenaje<br>industrial en el sur de Santiago</h1>
    <div class="sub" style="max-width:1180px">
      Cinco recintos industriales propios, de 180 a 14.000 m&sup2; techados y hasta
      40.000 m&sup2; de terreno para acopio. Arriendo directo con el propietario.
    </div>
  </div>
  <div class="dest">Preparado para TIBA Group &middot; Noviembre 2026</div>
  ${pie(1, TOTAL)}
</div>`;

// Tesis
const tesis = () => `
<div class="slide plano">
  <div style="position:absolute;left:104px;right:104px;top:150px">
    <div class="eyebrow">Por qu&eacute; les escribimos</div>
    <div class="rule"></div>
    <h1 style="font-size:82px;max-width:1500px">Ustedes venden almacenaje.<br>Nosotros somos due&ntilde;os de los metros.</h1>
    <div class="sub" style="max-width:1420px;font-size:33px">
      TIBA ofrece contract logistics, almacenaje y distribuci&oacute;n en Chile. Para vender
      ese servicio hace falta superficie, y la superficie tiene due&ntilde;o. Portal de Bodegas
      opera cinco recintos industriales propios en San Bernardo y los arrienda directo,
      sin corredores ni comisi&oacute;n de corretaje.
    </div>
  </div>
  <div class="cifras">
    <div class="cifra">
      <div class="cifra-n">5</div>
      <div class="cifra-t">recintos propios en San Bernardo,<br>todos operativos hoy</div>
    </div>
    <div class="cifra">
      <div class="cifra-n">180 – 14.000</div>
      <div class="cifra-t">m&sup2; de superficie techada,<br>en m&oacute;dulos combinables</div>
    </div>
    <div class="cifra">
      <div class="cifra-n">40.000</div>
      <div class="cifra-t">m&sup2; m&aacute;ximos de terreno<br>para acopio a cielo abierto</div>
    </div>
  </div>
  ${pie(2, TOTAL)}
</div>`;

// Corredor
const corredor = () => `
<div class="slide">
  <img class="bg" src="${foto("el-barrancon", 4)}">
  <div class="scrim-der"></div>
  <div style="position:absolute;right:104px;top:116px;width:900px">
    <div class="eyebrow">Ubicaci&oacute;n</div>
    <div class="rule"></div>
    <h1 style="font-size:62px">San Bernardo, donde<br>se movi&oacute; el eje industrial</h1>
    <div class="lista">
      <div class="li">
        <div class="li-k">Ruta 5 Sur</div>
        <div class="li-v">Entrada sur de Santiago. Toda la carga que sube desde el centro
          y el sur del pa&iacute;s pasa por este eje.</div>
      </div>
      <div class="li">
        <div class="li-k">Am&eacute;rico Vespucio</div>
        <div class="li-v">Conexi&oacute;n al anillo de circunvalaci&oacute;n y, por &eacute;l,
          a la Ruta 78 hacia San Antonio.</div>
      </div>
      <div class="li">
        <div class="li-k">D&oacute;nde queda superficie</div>
        <div class="li-v">Con la vacancia industrial de Santiago movi&eacute;ndose bajo el
          1,5%, el submercado sur es donde todav&iacute;a se encuentra metraje disponible.</div>
      </div>
    </div>
    <div class="nota" style="margin-top:30px">Publicamos un informe mensual del mercado industrial
      de la Regi&oacute;n Metropolitana, sobre reportes de Cushman &amp; Wakefield, CBRE,
      Colliers y NAI Sarr&aacute;. De ah&iacute; salen estos datos.</div>
  </div>
  ${pie(3, TOTAL)}
</div>`;

// Ficha de recinto. `n` es el número de lámina y `idx` el del recinto dentro de
// los cinco: son distintos porque la lámina de acopio se intercala entre medio.
// Derivar uno del otro producía "recinto 6 de 5".
const ficha = (r, n, idx) => `
<div class="slide">
  <div class="split-img">
    <img class="bg" src="${foto(r.id, r.foto)}">
    <div class="scrim-split"></div>
    <div class="scrim-pie"></div>
    <div class="split-cap">
      <div class="split-cap-n">${r.nombre}</div>
      <div class="split-cap-d">${r.direccion} &middot; San Bernardo</div>
    </div>
  </div>
  <div class="split-panel">
    <div class="eyebrow">Recinto ${idx} de 5</div>
    <div class="rule"></div>
    <div class="panel-rango">${r.rango}</div>
    <h2>${r.titular}</h2>
    <div class="panel-cuerpo">${r.cuerpo}</div>
    <div class="specs">
      ${r.specs
        .map(
          ([k, v]) => `<div class="spec"><div class="spec-k">${k}</div><div class="spec-v">${v}</div></div>`
        )
        .join("")}
    </div>
  </div>
  ${pie(n, TOTAL)}
</div>`;

// Acopio
const acopio = () => `
<div class="slide">
  <div class="split-img">
    <img class="bg" src="${foto("bosque-catemito", 1)}">
    <div class="scrim-split"></div>
    <div class="scrim-pie"></div>
    <div class="split-cap">
      <div class="split-cap-n">Terreno de acopio</div>
      <div class="split-cap-d">Bosque Catemito &middot; Camino Catemito 1990</div>
    </div>
  </div>
  <div class="split-panel">
    <div class="eyebrow">Superficie sin techo</div>
    <div class="rule"></div>
    <div class="panel-rango">2.000 – 40.000 m&sup2;</div>
    <h2>Acopio a cielo abierto</h2>
    <div class="panel-cuerpo">
      Terreno nivelado y compactado dentro del mismo recinto cerrado, con la misma
      seguridad perimetral que las naves. Pagarle techo a la carga que aguanta
      intemperie es pagar por algo que no se usa.
    </div>
    <div class="specs">
      <div class="spec"><div class="spec-k">Valor</div><div class="spec-v">Desde 0,02 UF/m&sup2; al mes</div></div>
      <div class="spec"><div class="spec-k">M&oacute;dulos</div><div class="spec-v">Desde 2.000 m&sup2;, con superficie exclusiva</div></div>
      <div class="spec"><div class="spec-k">Para un forwarder</div><div class="spec-v">Contenedores, vac&iacute;os y equipos</div></div>
      <div class="spec"><div class="spec-k">Seguridad</div><div class="spec-v">Cerco perimetral, CCTV y control de acceso</div></div>
    </div>
  </div>
  ${pie(5, TOTAL)}
</div>`;

// Tabla comparativa
const tabla = () => `
<div class="slide plano">
  <div style="position:absolute;left:104px;right:104px;top:130px">
    <div class="eyebrow">Los cinco recintos</div>
    <div class="rule"></div>
    <h1 style="font-size:66px">Superficie disponible por recinto</h1>
    <table class="tbl">
      <thead>
        <tr><th>Recinto</th><th>Direcci&oacute;n</th><th class="num">Desde</th><th class="num">Hasta</th><th>Lo que lo distingue</th></tr>
      </thead>
      <tbody>
        <tr><td class="n">Bosque Catemito</td><td>Camino Catemito 1990</td><td class="num">360 m&sup2;</td><td class="num">14.000 m&sup2;</td><td>Construcci&oacute;n a medida y acopio en el mismo recinto</td></tr>
        <tr><td class="n">Inversiones Duramet</td><td>General Urrutia 101</td><td class="num">450 m&sup2;</td><td class="num">1.900 m&sup2;</td><td>Crecimiento por etapas</td></tr>
        <tr><td class="n">Acacias Seis</td><td>Las Acacias 1250</td><td class="num">1.551 m&sup2;</td><td class="num">1.551 m&sup2;</td><td>Planta libre, sin columnas interiores</td></tr>
        <tr><td class="n">El Barranc&oacute;n</td><td>Camino El Barranc&oacute;n 3890</td><td class="num">623 m&sup2;</td><td class="num">1.266 m&sup2;</td><td>V&iacute;as extra anchas para cami&oacute;n grande</td></tr>
        <tr><td class="n">Alto Las Acacias</td><td>Las Acacias 1250</td><td class="num">180 m&sup2;</td><td class="num">720 m&sup2;</td><td>El tramo de superficie acotada</td></tr>
      </tbody>
    </table>
    <div class="nota" style="margin-top:34px">Los m&oacute;dulos de Bosque Catemito se combinan entre s&iacute;: el rango
      no describe cinco bodegas sueltas, sino una superficie que se arma seg&uacute;n lo que pida la operaci&oacute;n.</div>
  </div>
  ${pie(10, TOTAL)}
</div>`;

// Equipamiento
const equipamiento = () => `
<div class="slide plano">
  <div style="position:absolute;left:104px;right:104px;top:150px">
    <div class="eyebrow">Est&aacute;ndar com&uacute;n</div>
    <div class="rule"></div>
    <h1 style="font-size:66px">Lo que traen los cinco recintos</h1>
    <div class="sub" style="max-width:1300px;font-size:30px">
      No es equipamiento opcional ni por proyecto: es el est&aacute;ndar con el que opera
      toda la red.
    </div>
    <div class="grid2">
      ${EQUIPAMIENTO.map(
        ([k, v]) => `<div class="g2"><div class="g2-k">${k}</div><div class="g2-v">${v}</div></div>`
      ).join("")}
    </div>
  </div>
  ${pie(11, TOTAL)}
</div>`;

// Colaboración
const colaboracion = () => `
<div class="slide plano">
  <div style="position:absolute;left:104px;right:104px;top:130px">
    <div class="eyebrow">Modalidades</div>
    <div class="rule"></div>
    <h1 style="font-size:66px">Cuatro formas de trabajar juntos</h1>
    <div class="cols">
      ${COLABORACION.map(
        ([t, d], i) => `
        <div class="col">
          <div class="col-n">${String(i + 1).padStart(2, "0")}</div>
          <div class="col-t">${t}</div>
          <div class="col-d">${d}</div>
        </div>`
      ).join("")}
    </div>
  </div>
  ${pie(12, TOTAL)}
</div>`;

// Condiciones y contacto
const cierre = () => `
<div class="slide plano">
  <div style="position:absolute;left:104px;right:104px;top:150px">
    <div class="eyebrow">Condiciones comerciales</div>
    <div class="rule"></div>
    <h1 style="font-size:70px">Trato directo con el propietario</h1>
    <div class="cond">
      <div class="cd"><div class="cd-k">Bodega techada</div><div class="cd-v">En torno a <b>0,13 UF/m&sup2;</b> al mes, seg&uacute;n recinto, superficie y plazo</div></div>
      <div class="cd"><div class="cd-k">Terreno de acopio</div><div class="cd-v">Desde <b>0,02 UF/m&sup2;</b> al mes</div></div>
      <div class="cd"><div class="cd-k">Plazos</div><div class="cd-v">Flexibles, ajustados a la operaci&oacute;n y al contrato que la origina</div></div>
      <div class="cd"><div class="cd-k">Intermediaci&oacute;n</div><div class="cd-v">Ninguna. Sin corredores y <b>sin comisi&oacute;n de corretaje</b></div></div>
    </div>
    <div class="contacto">
      <div class="ct-k">Contacto</div>
      <div class="ct-v">rarcaya@arcaya.cl &nbsp;&middot;&nbsp; +56 9 9225 9272 &nbsp;&middot;&nbsp; portaldebodegas.cl</div>
      <div class="ct-n">Coordinamos visita a cualquiera de los cinco recintos sin compromiso.</div>
    </div>
  </div>
  ${pie(13, TOTAL)}
</div>`;

// ── Documento ─────────────────────────────────────────────────────────────────
const slides = [
  portada(),
  tesis(),
  corredor(),
  ficha(RECINTOS[0], 4, 1),
  acopio(),
  ficha(RECINTOS[1], 6, 2),
  ficha(RECINTOS[2], 7, 3),
  ficha(RECINTOS[3], 8, 4),
  ficha(RECINTOS[4], 9, 5),
  tabla(),
  equipamiento(),
  colaboracion(),
  cierre(),
];

const html = `<!doctype html><html lang="es"><head><meta charset="utf-8"><style>
${FONTS}
@page { size: ${W}px ${H}px; margin: 0; }
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:Inter,sans-serif;-webkit-font-smoothing:antialiased}
.slide{position:relative;width:${W}px;height:${H}px;overflow:hidden;background:${C.navy};
  page-break-after:always}
.slide:last-child{page-break-after:auto}
.plano{background:radial-gradient(130% 90% at 18% 0%, #0d2444 0%, ${C.navy} 64%)}
.bg{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}

/* Degradados */
.scrim{position:absolute;inset:0;background:linear-gradient(to top,
  ${C.navy} 0%, ${C.navy}fa 26%, ${C.navy}d8 44%, ${C.navy}7a 64%, ${C.navy}26 80%, transparent 96%)}
/* La portada lleva sombra propia: el techo claro de la nave se come el texto. */
.cover-txt .eyebrow,.cover-txt h1,.cover-txt .sub{text-shadow:0 4px 32px rgba(1,25,67,.92)}
.scrim-der{position:absolute;inset:0;background:linear-gradient(to left,
  ${C.navy} 0%, ${C.navy}f2 44%, ${C.navy}aa 60%, ${C.navy}33 78%, transparent 100%)}
.scrim-split{position:absolute;inset:0;background:linear-gradient(to right,
  transparent 55%, ${C.navy}26 76%, ${C.navy}66 100%)}
/* Degradado inferior: sin él, el rótulo de dirección se lava contra la gravilla
   clara de varias fotos. El nombre aguanta solo; la línea en mono, no. */
.scrim-pie{position:absolute;inset:0;background:linear-gradient(to top,
  ${C.navy}ed 0%, ${C.navy}b0 16%, ${C.navy}4d 32%, transparent 50%)}

/* Tipografía base */
.eyebrow{font-family:'IBM Plex Mono',monospace;font-weight:500;font-size:22px;
  letter-spacing:.26em;text-transform:uppercase;color:${C.blueLight}}
.rule{width:92px;height:4px;background:${C.blue};margin:28px 0 36px}
h1{font-family:Fraunces,Georgia,serif;font-weight:600;color:#fff;line-height:1.05;
  letter-spacing:-.015em}
h2{font-family:Fraunces,Georgia,serif;font-weight:600;color:#fff;font-size:50px;
  line-height:1.14;letter-spacing:-.01em;margin-top:16px}
.sub{font-family:Inter,sans-serif;font-weight:300;font-size:34px;color:rgba(255,255,255,.9);
  line-height:1.48;margin-top:30px}
.nota{font-family:Inter,sans-serif;font-weight:300;font-size:22px;line-height:1.52;
  color:rgba(255,255,255,.58);margin-top:40px;max-width:1080px}

/* Pie de página */
.pie{position:absolute;left:104px;right:104px;bottom:60px;display:flex;align-items:center;
  justify-content:space-between}
.pie-l{display:flex;align-items:center;gap:20px}
.wm{font-family:'Plus Jakarta Sans',sans-serif;font-weight:800;font-size:32px;letter-spacing:-.01em}
.pie-n{font-family:'IBM Plex Mono',monospace;font-weight:500;font-size:21px;letter-spacing:.16em}

/* Portada */
.dest{position:absolute;top:70px;right:104px;font-family:'IBM Plex Mono',monospace;
  font-weight:500;font-size:21px;letter-spacing:.2em;text-transform:uppercase;
  color:#fff;background:${C.blue};padding:18px 30px}

/* Cifras de la tesis */
.cifras{position:absolute;left:104px;right:104px;bottom:170px;display:flex;gap:74px}
.cifra{flex:1;border-top:4px solid ${C.blue};padding-top:30px}
.cifra-n{font-family:Fraunces,Georgia,serif;font-weight:700;font-size:74px;color:#fff;
  line-height:1;letter-spacing:-.02em}
.cifra-t{font-family:Inter,sans-serif;font-weight:300;font-size:26px;line-height:1.42;
  color:rgba(255,255,255,.72);margin-top:20px}

/* Lista del corredor */
.lista{margin-top:46px}
.li{border-top:1px solid rgba(255,255,255,.16);padding:21px 0}
.li-k{font-family:'IBM Plex Mono',monospace;font-weight:500;font-size:20px;
  letter-spacing:.18em;text-transform:uppercase;color:${C.blueLight}}
.li-v{font-family:Inter,sans-serif;font-weight:300;font-size:26px;line-height:1.44;
  color:rgba(255,255,255,.9);margin-top:11px}

/* Ficha dividida */
.split-img{position:absolute;left:0;top:0;width:1150px;height:${H}px;overflow:hidden}
/* El rótulo sube por encima del pie de marca: a 84px se montaba sobre el logo. */
.split-cap{position:absolute;left:84px;bottom:172px;right:120px}
.split-cap-n{font-family:Fraunces,Georgia,serif;font-weight:600;font-size:62px;color:#fff;
  line-height:1.06;letter-spacing:-.015em;text-shadow:0 4px 34px rgba(1,25,67,.86)}
.split-cap-d{font-family:'IBM Plex Mono',monospace;font-weight:500;font-size:21px;
  letter-spacing:.12em;color:rgba(255,255,255,.9);margin-top:16px;
  text-shadow:0 3px 22px rgba(1,25,67,.92)}
.split-panel{position:absolute;right:0;top:0;width:770px;height:${H}px;
  background:${C.navy};padding:112px 84px 128px 70px}
.panel-rango{font-family:Fraunces,Georgia,serif;font-weight:700;font-size:58px;color:${C.blueLight};
  line-height:1;letter-spacing:-.02em}
.panel-cuerpo{font-family:Inter,sans-serif;font-weight:300;font-size:26px;line-height:1.5;
  color:rgba(255,255,255,.82);margin-top:24px}
.specs{margin-top:40px}
.spec{border-top:1px solid rgba(255,255,255,.15);padding:16px 0}
.spec-k{font-family:'IBM Plex Mono',monospace;font-weight:500;font-size:17px;
  letter-spacing:.17em;text-transform:uppercase;color:${C.blueLight}}
.spec-v{font-family:Inter,sans-serif;font-weight:400;font-size:24px;line-height:1.36;
  color:#fff;margin-top:8px}

/* Tabla */
.tbl{width:100%;border-collapse:collapse;margin-top:48px}
.tbl th{font-family:'IBM Plex Mono',monospace;font-weight:500;font-size:19px;
  letter-spacing:.17em;text-transform:uppercase;color:${C.blueLight};text-align:left;
  padding:0 26px 20px 0;border-bottom:3px solid ${C.blue}}
.tbl td{font-family:Inter,sans-serif;font-weight:300;font-size:27px;color:rgba(255,255,255,.88);
  padding:26px 26px 26px 0;border-bottom:1px solid rgba(255,255,255,.14);line-height:1.34}
.tbl td.n{font-weight:500;color:#fff}
.tbl th.num,.tbl td.num{text-align:right;font-family:'IBM Plex Mono',monospace;font-weight:500;
  white-space:nowrap}
.tbl td.num{font-size:25px;color:#fff}

/* Grilla de equipamiento */
.grid2{display:grid;grid-template-columns:1fr 1fr;gap:0 92px;margin-top:52px}
.g2{border-top:1px solid rgba(255,255,255,.15);padding:24px 0}
.g2-k{font-family:'IBM Plex Mono',monospace;font-weight:500;font-size:18px;
  letter-spacing:.17em;text-transform:uppercase;color:${C.blueLight}}
.g2-v{font-family:Inter,sans-serif;font-weight:300;font-size:28px;color:#fff;margin-top:10px}

/* Columnas de colaboración */
.cols{display:flex;gap:56px;margin-top:58px}
.col{flex:1;border-top:4px solid ${C.blue};padding-top:28px}
.col-n{font-family:'IBM Plex Mono',monospace;font-weight:500;font-size:22px;
  letter-spacing:.2em;color:${C.blueLight}}
.col-t{font-family:Fraunces,Georgia,serif;font-weight:600;font-size:34px;color:#fff;
  line-height:1.18;margin-top:18px;letter-spacing:-.01em}
.col-d{font-family:Inter,sans-serif;font-weight:300;font-size:23px;line-height:1.52;
  color:rgba(255,255,255,.76);margin-top:20px}

/* Condiciones */
.cond{margin-top:52px}
.cd{display:flex;align-items:baseline;border-top:1px solid rgba(255,255,255,.15);padding:26px 0}
.cd-k{font-family:'IBM Plex Mono',monospace;font-weight:500;font-size:19px;
  letter-spacing:.17em;text-transform:uppercase;color:${C.blueLight};width:420px;flex:none}
.cd-v{font-family:Inter,sans-serif;font-weight:300;font-size:30px;color:rgba(255,255,255,.92)}
.cd-v b{font-weight:600;color:#fff}
.contacto{margin-top:64px;border-left:4px solid ${C.blue};padding-left:40px}
.ct-k{font-family:'IBM Plex Mono',monospace;font-weight:500;font-size:19px;
  letter-spacing:.2em;text-transform:uppercase;color:${C.blueLight}}
.ct-v{font-family:Inter,sans-serif;font-weight:400;font-size:34px;color:#fff;margin-top:16px}
.ct-n{font-family:Inter,sans-serif;font-weight:300;font-size:24px;
  color:rgba(255,255,255,.6);margin-top:14px}
</style></head><body>${slides.join("\n")}</body></html>`;

(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  const browser = await chromium.launch({ executablePath: CHROME });
  const page = await browser.newPage({ viewport: { width: W, height: H } });
  await page.setContent(html, { waitUntil: "load" });
  await page.evaluate(() => document.fonts.ready);

  const archivo = path.join(OUT, "catalogo-portal-de-bodegas.pdf");
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
