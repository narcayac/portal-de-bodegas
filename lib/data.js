// ── BRAND TOKENS ──────────────────────────────────────────────────────────────
export const C = {
  navy:       "#011943",
  navyMid:    "#0d2444",
  blue:       "#0685de",
  blueDark:   "#035caa",
  blueLight:  "#89c7f6",
  slate:      "#6c7b92",
  slateLight: "#adb2c0",
  border:     "#e2e8f0",
  bgAlt:      "#f8f9fb",
  wa:         "#25D366",
  waDark:     "#1da851",
};

export const F = {
  head: "var(--font-fraunces), Georgia, 'Times New Roman', serif",
  display: "var(--font-jakarta), var(--font-inter), sans-serif",
  body: "var(--font-inter), 'Inter', sans-serif",
  mono: "var(--font-mono), ui-monospace, 'SFMono-Regular', Menlo, monospace",
};

// Max-width container (applied via inline style spread). Gutter shrinks on mobile.
export const W = { maxWidth: 1280, margin: "0 auto", padding: "0 var(--gutter, 40px)" };

// ── SITE ──────────────────────────────────────────────────────────────────────
export const SITE = {
  url: "https://www.portaldebodegas.cl",
  name: "Portal de Bodegas",
  phone: "+56992259272",
  phoneDisplay: "+56 9 9225 9272",
  email: "rarcaya@arcaya.cl",
  locality: "San Bernardo",
  region: "Región Metropolitana",
  country: "CL",
  // Approx. centroid of San Bernardo, RM (for LocalBusiness geo)
  geo: { lat: -33.592, lng: -70.7 },
};

// ── HELPERS ───────────────────────────────────────────────────────────────────
export const m2    = (n) => n.toLocaleString("es-CL") + " m²";
export const waUrl = (msg) => `https://wa.me/56992259272?text=${encodeURIComponent(msg)}`;

// Navigation hrefs (real routes, trailing slash)
export const HREF = {
  home:           "/",
  bodegas:        "/bodegas/",
  sanBernardo:    "/bodegas/san-bernardo/",
  disponibilidad: "/disponibilidad/",
  guias:          "/guias/",
  contacto:       "/contacto/",
  privacidad:     "/politica-de-privacidad/",
  proyecto:       (id) => `/bodegas/${id}/`,
};

export const METRAJES = [
  "Menos de 300 m²",
  "300–600 m²",
  "600–1.000 m²",
  "Más de 1.000 m²",
  "No sé aún",
];

// ── DATA ──────────────────────────────────────────────────────────────────────
export const PROJECTS = [
  {
    id: "el-barrancon",
    name: "El Barrancón",
    min: 623,
    max: 1266,
    photos: 6,
    wa: "Hola, quiero cotizar disponibilidad en El Barrancón",
    alt: "Bodega industrial El Barrancón en San Bernardo",
    title: "El Barrancón – Bodega en Arriendo San Bernardo | 623–1.266 m²",
    description:
      "Arrienda en El Barrancón, San Bernardo: bodegas industriales desde 623 m² hasta 1.266 m². Seguridad 24/7, radieres industriales y patio de maniobras.",
  },
  {
    id: "bosque-catemito",
    name: "Bosque Catemito",
    min: 360,
    max: 14000,
    photos: 7,
    expandM2: 30000,
    flexible: true,
    wa: "Hola, quiero cotizar disponibilidad en Bosque Catemito",
    alt: "Bodega industrial Bosque Catemito en San Bernardo",
    title: "Bosque Catemito – Bodega en Arriendo San Bernardo | 360–1.440 m²",
    description:
      "Arrienda en Bosque Catemito, San Bernardo: bodegas industriales desde 360 m² hasta 1.440 m². Energía trifásica, CCTV y control de acceso. Incluye terreno para acopio al aire libre.",
    openYard: {
      title: "Terreno para acopio al aire libre",
      desc: "Además de las bodegas techadas, Bosque Catemito cuenta con terreno aplanado y habilitado para arriendo como zona de acopio a cielo abierto: ideal para contenedores, maquinaria, áridos, madera o materiales que no requieren techo. Dentro del mismo recinto y con la misma seguridad: cerco perimetral, CCTV y control de acceso.",
      wa: "Hola, quiero información sobre el arriendo de terreno para acopio en Bosque Catemito",
    },
  },
  {
    id: "alto-las-acacias",
    name: "Alto Las Acacias",
    min: 180,
    max: 720,
    photos: 6,
    wa: "Hola, quiero cotizar disponibilidad en Alto Las Acacias",
    alt: "Bodega industrial Alto Las Acacias en San Bernardo",
    title: "Alto Las Acacias – Bodega en Arriendo San Bernardo | 180–720 m²",
    description:
      "Arrienda en Alto Las Acacias, San Bernardo: bodegas desde 180 m² hasta 720 m², ideales para pymes y empresas en crecimiento. Trato directo.",
  },
  {
    id: "acacias-seis",
    name: "Acacias Seis",
    min: 1551,
    max: 1551,
    photos: 6,
    wa: "Hola, quiero cotizar disponibilidad en Acacias Seis",
    alt: "Bodega industrial Acacias Seis en San Bernardo",
    title: "Acacias Seis – Bodega en Arriendo San Bernardo | 1.551 m²",
    description:
      "Bodega industrial de 1.551 m² en arriendo en Acacias Seis, San Bernardo. Seguridad 24/7, acceso para camiones y patio de maniobras.",
  },
  {
    id: "inversiones-duramet",
    name: "Inversiones Duramet",
    min: 450,
    max: 1900,
    photos: 6,
    wa: "Hola, quiero cotizar disponibilidad en Inversiones Duramet",
    alt: "Bodega industrial Inversiones Duramet en San Bernardo",
    title: "Inversiones Duramet – Bodega en Arriendo San Bernardo | 450–1.900 m²",
    description:
      "Arrienda en Inversiones Duramet, San Bernardo: bodegas industriales desde 450 m² hasta 1.900 m², el mayor metraje disponible en nuestra red.",
  },
];

export const getProject = (id) => PROJECTS.find((p) => p.id === id);

// Street addresses per project (for the map + local SEO).
export const ADDRESSES = {
  "el-barrancon": "Camino El Barrancón (interior), Lote D, Nº 3890",
  "bosque-catemito": "Camino Catemito 1990",
  "alto-las-acacias": "Las Acacias 1250",
  "acacias-seis": "Las Acacias 1250",
  "inversiones-duramet": "General Urrutia 101",
};

// Google Maps embed URL with a pin at the address (no API key required).
export const mapEmbed = (address) =>
  `https://www.google.com/maps?q=${encodeURIComponent(
    `${address}, San Bernardo, Región Metropolitana, Chile`
  )}&output=embed`;

export const PROJECT_SPECS = [
  ["Seguridad", "24/7 · Cerco eléctrico · CCTV y PTZ"],
  ["Energía", "Trifásica instalada"],
  ["Radieres", "Industriales alisados"],
  ["Maniobra", "Patios amplios · Vías extra anchas"],
  ["Camiones", "Acceso directo · Estacionamiento"],
  ["Control", "Acceso controlado"],
];

export const EQUIP_LIST = [
  "Seguridad 24/7",
  "Cerco eléctrico perimetral",
  "Cámaras CCTV y PTZ en exterior",
  "Control de acceso",
  "Energía trifásica",
  "Radieres industriales alisados",
  "Patios de maniobra amplios",
  "Vías de circulación extra anchas",
  "Estacionamiento para camiones",
  "Acceso directo para camiones",
];

// ── FAQS ────────────────────────────────────────────────────────────────────
export const FAQ_GENERAL = [
  {
    q: "¿Puedo arrendar si soy una empresa pequeña o pyme?",
    a: "Sí. Tenemos espacios de distintos tamaños, desde superficies acotadas ideales para pymes hasta grandes bodegas para operaciones mayores.",
  },
  {
    q: "¿Qué tipos de empresas pueden arrendar?",
    a: "Empresas de cualquier rubro: logística, distribución, almacenaje, comercio, manufactura liviana y pymes en crecimiento.",
  },
  {
    q: "¿Arriendan terreno o patio para acopio al aire libre?",
    a: "Sí. En nuestro proyecto Bosque Catemito contamos con terreno aplanado y habilitado para acopio a cielo abierto, ideal para contenedores, maquinaria, áridos o materiales que no requieren techo, dentro de un recinto con seguridad 24/7 y control de acceso.",
  },
  {
    q: "¿Arriendan galpones industriales?",
    a: "Sí. Nuestras bodegas son galpones industriales: naves techadas con radier industrial, energía trifásica y planta libre, aptas para bodegaje, distribución y manufactura liviana.",
  },
  {
    q: "¿En qué comunas tienen bodegas disponibles?",
    a: "Hoy en San Bernardo, en el sector sur de Santiago, con cinco proyectos activos.",
  },
  {
    q: "¿El trato es directo o trabajan con corredores?",
    a: "Directo, sin intermediarios ni comisión de corretaje. Negocias directamente con nosotros.",
  },
  {
    q: "¿Qué plazos de arriendo manejan?",
    a: "Son flexibles y se ajustan a tu operación. Cuéntanos qué necesitas y lo conversamos.",
  },
  {
    q: "¿Las bodegas cuentan con seguridad?",
    a: "Sí: seguridad 24/7, cerco eléctrico perimetral, cámaras CCTV y PTZ en el exterior, y control de acceso.",
  },
  {
    q: "¿Puedo visitar la bodega antes de decidir?",
    a: "Por supuesto. Coordinamos una visita cuando quieras, sin compromiso.",
  },
  {
    q: "¿Cuánto cuesta arrendar una bodega?",
    a: "Nuestros valores de arriendo rondan las 0,13 UF por m² al mes, según proyecto, superficie y plazo. Escríbenos por WhatsApp y te enviamos una cotización a tu medida el mismo día.",
  },
];

export const FAQ_CONTACTO = [
  {
    q: "¿En cuánto tiempo responden?",
    a: "Muy rápido: por WhatsApp te respondemos casi al instante en horario hábil. Por el formulario, el mismo día.",
  },
  {
    q: "¿Necesito visitar la bodega antes de cotizar?",
    a: "No es obligatorio para recibir una cotización inicial.",
  },
  {
    q: "¿El trato es directo?",
    a: "Sí, sin corredores ni intermediarios.",
  },
  {
    q: "¿Puedo arrendar siendo una empresa pequeña?",
    a: "Sí, tenemos espacios para distintos tamaños de operación, incluidas pymes.",
  },
];

// ── WHY US ──────────────────────────────────────────────────────────────────
export const WHY_US = [
  ["Trato directo", "Negocias directamente con nosotros, sin corredores ni comisión de corretaje."],
  ["Respuesta rápida", "Escríbenos por WhatsApp y te respondemos casi al instante en horario hábil."],
  ["Listas para operar", "Radieres industriales alisados, patios de maniobra amplios y vías de circulación extra anchas."],
  ["A tu medida", "Desde pymes hasta grandes operaciones: distintos tamaños y plazos flexibles."],
];
