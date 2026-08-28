// ── GUÍAS (SEO content hub) ──────────────────────────────────────────────────
// Each guide is a static article targeting a non-brand search query.
// Content blocks: h2 | p | list | table | note | cta
// Written for BOTH audiences: pymes (180–500 m²) and mid/large operations
// (500–14.000 m², built-to-suit).

export const GUIAS = [
  {
    slug: "precio-arriendo-bodega-san-bernardo",
    eyebrow: "Guía de precios",
    title: "¿Cuánto cuesta arrendar una bodega en San Bernardo? Guía 2026",
    metaTitle: "Precio de Arriendo de Bodegas en San Bernardo 2026",
    metaDescription:
      "¿Cuánto cuesta arrendar una bodega industrial en San Bernardo? Desde 0,13 UF/m² al mes con trifásica, radier industrial y seguridad 24/7. Guía completa de precios y costos.",
    excerpt:
      "Nuestro valor de referencia (0,13 UF/m²), qué incluye, qué factores mueven el precio y los costos adicionales que nadie te cuenta.",
    date: "2026-07-27",
    readMin: 6,
    related: ["cuantos-metros-cuadrados-necesita-tu-bodega", "mercado-bodegas-santiago-agosto-2026"],
    faq: [
      {
        q: "¿Cuánto cuesta arrendar una bodega pequeña para una pyme?",
        a: "En nuestros proyectos el valor ronda las 0,13 UF/m² al mes: una bodega de 180 m² queda en torno a las 23 UF y una de 500 m² cerca de 65 UF, con equipamiento incluido. Escríbenos por WhatsApp con la superficie que necesitas y te cotizamos el mismo día.",
      },
      {
        q: "¿El precio por m² baja si arriendo una superficie grande?",
        a: "Sí. En superficies sobre 2.000 m² el valor unitario por m² tiende a bajar, y con plazos largos hay espacio adicional de negociación. En proyectos ampliables como Bosque Catemito también se puede construir a la medida.",
      },
      {
        q: "¿El arriendo de bodegas paga IVA?",
        a: "Depende de si la bodega se arrienda con instalaciones que permitan el ejercicio de una actividad comercial o industrial: en ese caso suele estar afecto a IVA. Confírmalo con tu contador según tu caso específico.",
      },
      {
        q: "¿Qué incluye el arriendo a 0,13 UF/m² en Portal de Bodegas?",
        a: "Bodega lista para operar: energía trifásica, radier industrial alisado, seguridad 24/7, CCTV, control de acceso, patio de maniobras, estacionamientos y acceso para camiones. Sin comisión de corretaje, porque el trato es directo.",
      },
    ],
    blocks: [
      {
        t: "p",
        x: "Si estás cotizando bodegas en la zona sur de Santiago, la primera pregunta es siempre la misma: ¿cuánto vale el m²? La respuesta corta: en San Bernardo, menos que en los polos industriales del norte de la capital, con la misma conectividad logística. Aquí te dejamos los valores de referencia y — más importante — los factores que hacen que dos bodegas del mismo tamaño tengan precios muy distintos.",
      },
      { t: "h2", x: "Cómo se cobra el arriendo industrial en Chile" },
      {
        t: "p",
        x: "El arriendo de bodegas se expresa casi siempre en UF por m² al mes. Ese formato permite comparar proyectos de distinto tamaño: multiplicas el valor unitario por la superficie y obtienes el canon mensual. Por ejemplo, una bodega de 500 m² a 0,13 UF/m² son 65 UF mensuales.",
      },
      { t: "h2", x: "¿Cuánto cuesta en San Bernardo? Nuestro valor de referencia" },
      {
        t: "p",
        x: "En nuestros cinco proyectos en San Bernardo, el arriendo ronda las 0,13 UF por m² al mes — y ese valor incluye la bodega equipada y lista para operar: energía trifásica, radieres industriales alisados, seguridad 24/7 con CCTV, control de acceso, patio de maniobras, estacionamientos y acceso directo para camiones.",
      },
      {
        t: "table",
        head: ["Superficie", "Canon mensual aproximado (a 0,13 UF/m²)", "Perfil típico"],
        rows: [
          ["180 m²", "≈ 23 UF", "Pymes y bodegaje inicial"],
          ["500 m²", "≈ 65 UF", "Empresas en crecimiento"],
          ["1.500 m²", "≈ 195 UF", "Distribución y manufactura liviana"],
          ["Sobre 2.000 m²", "Valor unitario negociable según plazo", "Centros de distribución y logística"],
          ["Built-to-suit (construcción a medida)", "Según proyecto y plazo", "Empresas medianas y grandes"],
        ],
      },
      {
        t: "note",
        x: "Valores referenciales de nuestros proyectos; el canon final depende de la superficie, el plazo y el proyecto específico. En el mercado de la Región Metropolitana, bodegas con este nivel de equipamiento suelen transarse entre 0,12 y 0,18 UF/m²/mes — nuestro valor es competitivo justamente por el trato directo.",
      },
      { t: "h2", x: "Los 5 factores que mueven el precio" },
      {
        t: "list",
        items: [
          "Superficie y escala — a mayor metraje, menor valor unitario. Una pyme de 200 m² paga proporcionalmente más por m² que una operación de 5.000 m².",
          "Plazo del contrato — contratos largos dan estabilidad al propietario y abren espacio para negociar el canon.",
          "Equipamiento — radieres industriales alisados, energía trifásica, altura útil y patios de maniobra suman valor real a la operación (y al precio).",
          "Seguridad — cerco eléctrico perimetral, CCTV y guardias 24/7 reducen tu costo de seguros y pérdidas: se pagan solos.",
          "Intermediarios — una corredora suele cobrar comisión equivalente a medio mes o un mes de arriendo, más un recargo implícito. En trato directo, ese costo no existe.",
        ],
      },
      { t: "h2", x: "Los costos adicionales que debes presupuestar" },
      {
        t: "list",
        items: [
          "Garantía — habitualmente 1 a 2 meses de arriendo.",
          "Gastos comunes — en condominios industriales cubren seguridad y mantención de áreas comunes; pregunta siempre el monto antes de firmar.",
          "Seguros — de contenido e incendio; tu operación los necesita esté donde esté.",
          "Habilitación — racks, oficinas interiores, iluminación adicional. Si la bodega entrega radier alisado y trifásica instalada, esta partida baja considerablemente.",
        ],
      },
      { t: "h2", x: "Pyme vs. gran empresa: cómo optimizar en cada escala" },
      {
        t: "p",
        x: "Si eres pyme: prioriza superficies exactas (no pagues m² que no usas), plazos flexibles y bodegas listas para operar — cada peso que no inviertes en habilitación es capital de trabajo. Proyectos como Alto Las Acacias parten en 180 m² justamente para ese perfil.",
      },
      {
        t: "p",
        x: "Si manejas una operación mediana o grande: mira el costo total por posición logística, no solo el canon. Conectividad a Ruta 5 y Vespucio, patios para camiones y posibilidad de crecer sin mudarte (en Bosque Catemito se puede llegar hasta 30.000 m² construidos a medida) pesan más que una décima de UF en el valor unitario.",
      },
      {
        t: "cta",
        x: "¿Quieres el número exacto para tu caso? Cuéntanos superficie y uso, y te cotizamos hoy mismo.",
        wa: "Hola, quiero cotizar el arriendo de una bodega en San Bernardo",
      },
    ],
  },
  {
    slug: "checklist-arrendar-bodega-industrial",
    eyebrow: "Checklist",
    title: "Qué revisar antes de arrendar una bodega industrial: checklist completo",
    metaTitle: "Checklist para Arrendar una Bodega Industrial",
    metaDescription:
      "Los 10 puntos que debes revisar antes de firmar el arriendo de una bodega industrial: radier, altura, energía, accesos, seguridad, contrato y más.",
    excerpt:
      "Los 10 puntos que separan un buen arriendo de un dolor de cabeza: radier, energía, accesos, seguridad, contrato y la pregunta que casi nadie hace.",
    date: "2026-07-27",
    readMin: 7,
    related: ["contrato-arriendo-bodega-industrial", "galpon-en-arriendo-san-bernardo"],
    faq: [
      {
        q: "¿Qué es lo más importante al arrendar una bodega?",
        a: "Que la infraestructura calce con tu operación real: capacidad del radier, altura útil, energía disponible y accesos para el tipo de vehículos que usarás. Un canon barato sale caro si la bodega no soporta tu operación.",
      },
      {
        q: "¿Puedo visitar la bodega antes de firmar?",
        a: "Siempre deberías. En Portal de Bodegas coordinamos visitas sin compromiso a cualquiera de nuestros cinco proyectos en San Bernardo — se agenda directo por WhatsApp.",
      },
      {
        q: "¿Qué plazo de contrato conviene?",
        a: "Depende de tu proyección: si tu operación crece rápido, prioriza flexibilidad o proyectos donde puedas ampliar superficie sin mudarte; si es estable, un plazo largo te da mejor precio.",
      },
    ],
    blocks: [
      {
        t: "p",
        x: "Cambiar de bodega es caro: mudanza, detención de operación, rehabilitación. Por eso la decisión correcta se toma antes de firmar, no después. Esta es la checklist que usamos nosotros mismos para evaluar infraestructura industrial — sirve igual para una pyme que busca sus primeros 200 m² que para un gerente de operaciones evaluando 10.000.",
      },
      { t: "h2", x: "1. Radier: la base de todo (literalmente)" },
      {
        t: "p",
        x: "Pregunta por la capacidad de carga y la terminación. Un radier industrial alisado permite grúas horquilla, racks altos y tránsito intenso sin levantar polvo ni agrietarse. Si el piso es deficiente, ningún otro atributo lo compensa.",
      },
      { t: "h2", x: "2. Altura útil" },
      {
        t: "p",
        x: "La altura libre bajo cercha define cuántas posiciones de rack puedes montar. Para bodegaje simple bastan 4–6 m; para logística con racks selectivos, busca 8 m o más. Más altura = más capacidad sin pagar más suelo.",
      },
      { t: "h2", x: "3. Accesos y patio de maniobras" },
      {
        t: "p",
        x: "¿Entra un camión con rampla? ¿Puede girar sin bloquear a otros? Vías de circulación extra anchas, portones amplios y estacionamiento de camiones marcan la diferencia entre una descarga de 20 minutos y una de 2 horas — todos los días.",
      },
      { t: "h2", x: "4. Energía eléctrica" },
      {
        t: "p",
        x: "Verifica que exista empalme trifásico y qué potencia tiene contratada o disponible. Compresores, frío, maquinaria y cargadores de grúas eléctricas lo exigen. Ampliar potencia después es posible, pero toma tiempo y dinero.",
      },
      { t: "h2", x: "5. Seguridad del recinto" },
      {
        t: "list",
        items: [
          "Cerco perimetral (idealmente eléctrico) en todo el deslinde",
          "CCTV con cámaras exteriores y PTZ operativas — pide verlas funcionando",
          "Control de acceso: quién entra, cómo se registra, guardias 24/7",
          "Historial del sector: pregunta a otros arrendatarios del recinto",
        ],
      },
      { t: "h2", x: "6. Uso de suelo y permisos" },
      {
        t: "p",
        x: "Confirma que el destino del inmueble sea compatible con tu actividad (bodegaje, distribución, manufactura liviana) y que el recinto tenga su recepción municipal en regla. Es la diferencia entre operar tranquilo y una clausura.",
      },
      { t: "h2", x: "7. Conectividad" },
      {
        t: "p",
        x: "Minutos a la autopista importan más que kilómetros al centro. Una bodega a 5 minutos de Ruta 5 o Américo Vespucio ahorra horas-camión todas las semanas. San Bernardo es fuerte justo en esto.",
      },
      { t: "h2", x: "8. Contrato: plazo, reajuste y salida" },
      {
        t: "list",
        items: [
          "Plazo y renovación: ¿qué pasa al vencimiento?",
          "Reajuste: en UF queda indexado automáticamente — verifica la periodicidad",
          "Garantía y condiciones de devolución",
          "Cláusulas de término anticipado para ambas partes",
        ],
      },
      { t: "h2", x: "9. Costos totales, no solo el canon" },
      {
        t: "p",
        x: "Suma gastos comunes, seguros y habilitación. Una bodega entregada con radier alisado, trifásica y seguridad operativa puede ser más conveniente que otra 'más barata' que exige inversión antes de mover la primera caja.",
      },
      { t: "h2", x: "10. La pregunta que casi nadie hace: ¿puedo crecer aquí?" },
      {
        t: "p",
        x: "Si tu operación se duplica en dos años, ¿tendrás que mudarte? Los proyectos con superficie ampliable — como Bosque Catemito, que permite crecer hasta 30.000 m² construidos a medida — convierten el arriendo en una decisión de largo plazo, no en un parche.",
      },
      {
        t: "cta",
        x: "¿Quieres recorrer una bodega con esta checklist en mano? Agenda una visita sin compromiso a cualquiera de nuestros 5 proyectos.",
        wa: "Hola, quiero agendar una visita a una bodega en San Bernardo",
      },
    ],
  },
  {
    slug: "bodegas-san-bernardo-hub-logistico",
    eyebrow: "Ubicación",
    title: "San Bernardo: por qué es el hub logístico del sur de Santiago",
    metaTitle: "Bodegas en San Bernardo: Hub Logístico del Sur",
    metaDescription:
      "Ruta 5, Américo Vespucio y suelo industrial disponible: por qué San Bernardo se consolidó como el polo logístico del sur de la Región Metropolitana.",
    excerpt:
      "Ruta 5 Sur, Vespucio y suelo industrial disponible: las razones por las que la logística está mirando al sur — y lo que significa para tu operación.",
    date: "2026-07-27",
    readMin: 5,
    related: ["galpon-en-arriendo-san-bernardo", "precio-arriendo-bodega-san-bernardo", "mercado-bodegas-santiago-agosto-2026"],
    faq: [
      {
        q: "¿Qué conectividad tiene San Bernardo para camiones?",
        a: "Acceso directo a Ruta 5 Sur (eje norte–sur del país), conexión rápida con Américo Vespucio para distribuir dentro de Santiago, y salida expedita hacia la Ruta 78 en dirección al puerto de San Antonio.",
      },
      {
        q: "¿San Bernardo es más barato que los polos industriales del norte?",
        a: "En general, el valor por m² en la zona sur es más competitivo que en polos consolidados como Quilicura o Pudahuel, con conectividad comparable para distribución nacional.",
      },
      {
        q: "¿Hay bodegas grandes disponibles en San Bernardo?",
        a: "Sí. En nuestra red hay superficies desde 180 m² para pymes hasta 14.000 m² en Bosque Catemito, con posibilidad de construir a medida hasta 30.000 m².",
      },
    ],
    blocks: [
      {
        t: "p",
        x: "Durante años, hablar de bodegas en Santiago era hablar del norte: Quilicura, Pudahuel, Lampa. Pero la logística se mueve hacia donde hay suelo disponible, buenos accesos y costos razonables — y ese mapa hoy apunta al sur. San Bernardo reúne las tres condiciones, y no es casualidad que cada vez más operaciones estén instalándose aquí.",
      },
      { t: "h2", x: "La ecuación de conectividad" },
      {
        t: "list",
        items: [
          "Ruta 5 Sur — el eje troncal del país pasa por la comuna: distribución nacional hacia el norte y el sur sin cruzar la ciudad.",
          "Américo Vespucio — el anillo de circunvalación conecta con toda la capital: última milla urbana eficiente.",
          "Ruta 78 (Autopista del Sol) — salida expedita hacia el puerto de San Antonio, el principal puerto de carga del país.",
          "Acceso Sur — alternativa directa para el flujo de carga que entra y sale de la capital.",
        ],
      },
      {
        t: "p",
        x: "Para una operación de distribución, esto se traduce en algo muy concreto: menos horas-camión por despacho. La bodega mejor ubicada no es la más cercana a tu oficina — es la más cercana a la autopista.",
      },
      { t: "h2", x: "Suelo industrial disponible (y lo que eso permite)" },
      {
        t: "p",
        x: "A diferencia de los polos del norte, donde el suelo industrial escasea y los precios lo reflejan, el sector sur aún ofrece superficie para crecer. Eso permite dos cosas que en otras comunas son casi imposibles: arrendar superficies grandes de una vez, y ampliar sin mudarse. En Bosque Catemito, por ejemplo, una empresa puede partir con una superficie acotada y crecer hasta 30.000 m² construidos a la medida de su operación.",
      },
      { t: "h2", x: "Para pymes: entrar al barrio industrial sin pagar de más" },
      {
        t: "p",
        x: "El mismo factor — disponibilidad de suelo — hace que el valor por m² sea más competitivo que en el norte de la capital. Para una pyme, eso significa acceder a infraestructura industrial real (radieres, trifásica, seguridad 24/7) desde superficies de 180 m², a un costo que no ahoga el flujo de caja.",
      },
      { t: "h2", x: "Para operaciones medianas y grandes: escala y proyección" },
      {
        t: "p",
        x: "Centros de distribución y operaciones logísticas necesitan tres cosas que San Bernardo entrega: superficies sobre 2.000 m² disponibles, patios de maniobra reales para flotas de camiones, y proyección de crecimiento en el mismo recinto. Sumado al ahorro en el canon frente a los polos del norte, la ecuación de costo total por posición logística suele favorecer al sur.",
      },
      { t: "h2", x: "El factor barrio: un polo que se consolida" },
      {
        t: "p",
        x: "Los polos industriales generan externalidades positivas: proveedores cerca, transportistas que conocen la zona, mano de obra local con experiencia en bodegaje y logística. San Bernardo lleva años consolidando ese ecosistema — quien se instala hoy no llega a un experimento, llega a un barrio industrial funcionando.",
      },
      {
        t: "cta",
        x: "Tenemos 5 proyectos en San Bernardo, desde 180 hasta 14.000 m². Cuéntanos qué necesita tu operación.",
        wa: "Hola, quiero información sobre bodegas en San Bernardo",
      },
    ],
  },
];

GUIAS.push({
  slug: "galpon-en-arriendo-san-bernardo",
  eyebrow: "Galpones",
  title: "Galpón en arriendo en San Bernardo: qué buscar (y en qué se diferencia de una bodega)",
  metaTitle: "Galpón en Arriendo en San Bernardo desde 180 m²",
  metaDescription:
    "¿Buscas galpón en arriendo en San Bernardo? Galpones industriales desde 180 hasta 14.000 m² con radier, trifásica y seguridad 24/7. Qué revisar antes de arrendar.",
  excerpt:
    "¿Galpón o bodega? En Chile se usan como sinónimos, pero hay matices que importan al arrendar. Qué revisar y qué hay disponible en San Bernardo.",
  date: "2026-07-27",
  readMin: 5,
  related: ["precio-arriendo-bodega-san-bernardo", "checklist-arrendar-bodega-industrial", "terreno-de-acopio-en-arriendo"],
  faq: [
    {
      q: "¿Es lo mismo un galpón que una bodega?",
      a: "En la práctica chilena, sí: se usan como sinónimos. En rigor, 'galpón' describe la construcción (una nave industrial techada) y 'bodega' el uso (almacenamiento). Un galpón puede usarse como bodega, taller o planta de producción liviana.",
    },
    {
      q: "¿Tienen galpones en arriendo en San Bernardo?",
      a: "Sí. Nuestros cinco proyectos son galpones industriales en arriendo, con superficies desde 180 hasta 14.000 m², radier industrial, energía trifásica y seguridad 24/7. El trato es directo, sin corredores.",
    },
    {
      q: "¿Cuánto cuesta arrendar un galpón industrial?",
      a: "En nuestros proyectos el valor ronda las 0,13 UF por m² al mes, con el galpón equipado y listo para operar. Una superficie de 500 m² queda en torno a las 65 UF mensuales.",
    },
    {
      q: "¿Puedo usar el galpón como taller o planta de producción?",
      a: "Depende de la actividad. Nuestros espacios admiten bodegaje, distribución y manufactura liviana; cuéntanos tu rubro por WhatsApp y te confirmamos al instante si calza.",
    },
  ],
  blocks: [
    {
      t: "p",
      x: "Si llegaste buscando 'galpón en arriendo', estás en el lugar correcto: en Chile, galpón y bodega se usan como sinónimos, y lo que encontrarás en nuestros proyectos son exactamente eso — naves industriales techadas, con radier, energía y seguridad, listas para operar. Pero el matiz entre ambos términos esconde una pregunta útil: ¿qué necesita realmente tu operación?",
    },
    { t: "h2", x: "Galpón y bodega: el matiz que importa" },
    {
      t: "p",
      x: "'Galpón' describe la construcción: una estructura industrial techada, generalmente metálica, de planta libre. 'Bodega' describe el uso: almacenar. Por eso todo depende de lo que harás adentro: si solo guardas mercadería, buscas una bodega; si además produces, armas o reparas, buscas un galpón con las instalaciones para hacerlo. La buena noticia: un galpón bien equipado sirve para ambas cosas.",
    },
    { t: "h2", x: "Qué debe tener un galpón industrial para operar bien" },
    {
      t: "list",
      items: [
        "Radier industrial alisado — soporta grúas horquilla, racks y tránsito pesado sin deteriorarse.",
        "Planta libre — sin pilares intermedios que estorben la maniobra o el layout de racks.",
        "Energía trifásica — imprescindible para maquinaria, compresores o equipos de frío.",
        "Altura útil — más altura es más capacidad de almacenamiento sin pagar más suelo.",
        "Accesos para camiones — portones amplios, vías de circulación anchas y patio de maniobras.",
        "Seguridad — cerco perimetral, CCTV y control de acceso: tu mercadería y tus equipos protegidos.",
      ],
    },
    {
      t: "note",
      x: "Todos nuestros galpones en San Bernardo incluyen este equipamiento de serie: radier industrial alisado, energía trifásica, seguridad 24/7 con CCTV, control de acceso, patio de maniobras y estacionamiento para camiones.",
    },
    { t: "h2", x: "Galpones chicos y grandes: qué hay disponible en San Bernardo" },
    {
      t: "p",
      x: "Nuestra red parte en 180 m² — ideal para pymes, talleres y bodegaje inicial — y llega hasta 14.000 m² en Bosque Catemito, donde además se puede construir a la medida hasta 30.000 m². Entre medio hay superficies intermedias en cada proyecto (360, 450, 623, 720, 1.266, 1.551 y 1.900 m², entre otras), todas con el mismo estándar de equipamiento.",
    },
    { t: "h2", x: "¿Por qué arrendar tu galpón en San Bernardo?" },
    {
      t: "p",
      x: "Conectividad directa a Ruta 5 Sur y Américo Vespucio, salida expedita hacia el puerto de San Antonio por la Ruta 78, y valores más competitivos que los polos industriales del norte de Santiago. Si tu operación mueve camiones, la zona sur juega a tu favor.",
    },
    {
      t: "cta",
      x: "Cuéntanos qué necesitas — superficie, uso y plazo — y te mostramos los galpones disponibles que calzan con tu operación.",
      wa: "Hola, busco un galpón en arriendo en San Bernardo",
    },
  ],
});


GUIAS.push({
  slug: "contrato-arriendo-bodega-industrial",
  eyebrow: "Contrato",
  title: "Contrato de arriendo de bodega industrial: qué revisar antes de firmar",
  metaTitle: "Contrato de Arriendo de Bodega Industrial",
  metaDescription:
    "Plazo, reajuste en UF, garantía, mantenciones, seguros y término anticipado: las cláusulas que debes revisar antes de firmar el arriendo de una bodega o galpón.",
  excerpt:
    "Plazo, reajuste, garantía, mantenciones y las cláusulas que definen si un arriendo es un buen negocio o un problema — explicadas sin jerga legal.",
  date: "2026-08-05",
  readMin: 7,
  related: ["checklist-arrendar-bodega-industrial", "precio-arriendo-bodega-san-bernardo"],
  faq: [
    {
      q: "¿Qué plazo de contrato es habitual para una bodega industrial?",
      a: "Lo común va de 1 a 5 años. Operaciones estables prefieren plazos largos (mejor precio y estabilidad); empresas en crecimiento suelen preferir plazos cortos con renovación o proyectos donde puedan ampliar superficie sin mudarse.",
    },
    {
      q: "¿Cuánto se pide de garantía?",
      a: "Habitualmente entre 1 y 2 meses de arriendo, que se devuelven al restituir la bodega en buen estado según lo pactado en el contrato.",
    },
    {
      q: "¿Quién paga las mantenciones y reparaciones?",
      a: "La regla general: el propietario responde por la estructura (techumbre, muros, instalaciones de origen) y el arrendatario por el uso diario y los daños que cause su operación. Lo importante es que el contrato lo diga explícitamente.",
    },
    {
      q: "¿Necesito un abogado para firmar?",
      a: "Para superficies y plazos importantes, la revisión de un abogado se paga sola. Para arriendos más simples, esta guía te ayuda a hacer las preguntas correctas — y en Portal de Bodegas trabajamos con contratos claros y sin letra chica.",
    },
  ],
  blocks: [
    {
      t: "p",
      x: "El contrato es la parte menos entretenida de arrendar una bodega — y la más importante cuando algo sale distinto a lo esperado. La buena noticia: no necesitas ser abogado para revisarlo bien. Necesitas saber qué cláusulas mirar y qué preguntar antes de firmar. Esta es la lista, sin jerga legal.",
    },
    { t: "h2", x: "1. Plazo, renovación y salida" },
    {
      t: "list",
      items: [
        "Plazo inicial — ¿1, 3, 5 años? Más plazo suele significar mejor canon, pero menos flexibilidad.",
        "Renovación — ¿es automática? ¿Con cuánta anticipación hay que avisar si no se renueva?",
        "Término anticipado — ¿puedes salir antes? ¿Con qué aviso y qué costo? Esta cláusula es tu seguro si el negocio cambia.",
      ],
    },
    { t: "h2", x: "2. Canon y reajuste" },
    {
      t: "p",
      x: "En Chile el arriendo industrial se pacta casi siempre en UF, lo que indexa el valor automáticamente a la inflación — sin sorpresas de reajuste anual negociado. Verifica: el valor en UF, la fecha de pago, el interés por atraso, y si existe algún período de gracia por habilitación (meses iniciales rebajados mientras instalas tu operación — se puede negociar, sobre todo en contratos largos).",
    },
    { t: "h2", x: "3. Garantía y su devolución" },
    {
      t: "p",
      x: "Lo estándar es 1 a 2 meses de arriendo en garantía. Lo que importa revisar: en qué condiciones se devuelve, en qué plazo, y qué puede descontarse. Exige que el contrato incluya (o referencie) un acta de entrega con el estado inicial de la bodega — es tu respaldo al momento de la restitución.",
    },
    { t: "h2", x: "4. Mantenciones: quién paga qué" },
    {
      t: "list",
      items: [
        "Propietario — estructura: techumbre, muros, radier, instalaciones de origen (eléctrica, sanitaria).",
        "Arrendatario — el desgaste del uso diario, los daños de su operación y las mejoras que instale.",
        "Gastos comunes — si el recinto es un condominio industrial, confirma el monto, qué incluye (seguridad, mantención de áreas comunes) y cómo se reajusta.",
      ],
    },
    { t: "h2", x: "5. Uso, destino y subarriendo" },
    {
      t: "p",
      x: "El contrato define para qué puedes usar la bodega (bodegaje, distribución, manufactura liviana...). Asegúrate de que el destino declarado cubra tu operación real — y la que proyectas tener. Si existe la posibilidad de compartir superficie con un partner o filial, revisa la cláusula de subarriendo y cesión: por defecto suele estar prohibida sin autorización escrita.",
    },
    { t: "h2", x: "6. Seguros" },
    {
      t: "p",
      x: "Lo habitual: el propietario asegura el edificio; el arrendatario asegura su contenido (mercadería, equipos) y contrata responsabilidad civil. Algunos contratos exigen pólizas mínimas — revísalo antes para cotizarlas a tiempo, no después de firmar.",
    },
    { t: "h2", x: "7. Entrega y restitución" },
    {
      t: "p",
      x: "Las dos fotos que evitan el 90% de los conflictos: el acta de entrega (estado inicial, idealmente con fotos) y la cláusula de restitución (en qué estado se devuelve, qué pasa con las mejoras que instalaste — ¿quedan, se retiran, se compensan?). Cinco minutos de acta ahorran meses de discusión.",
    },
    { t: "h2", x: "8. El detalle tributario: IVA" },
    {
      t: "p",
      x: "El arriendo de inmuebles con instalaciones que permiten ejercer una actividad comercial o industrial suele estar afecto a IVA. Para tu empresa ese IVA es generalmente crédito fiscal, así que no es un costo extra real — pero confírmalo con tu contador para presupuestar el flujo correctamente.",
    },
    {
      t: "note",
      x: "Esta guía es orientación práctica, no asesoría legal. Para contratos de superficies y plazos importantes, la revisión de un abogado se paga sola. En Portal de Bodegas trabajamos con contratos claros y estamos disponibles para revisar cada cláusula contigo antes de firmar.",
    },
    {
      t: "cta",
      x: "¿Quieres un arriendo con contrato claro y trato directo con el propietario? Conversemos.",
      wa: "Hola, quiero información sobre las condiciones de arriendo de una bodega",
    },
  ],
});

GUIAS.push({
  slug: "cuantos-metros-cuadrados-necesita-tu-bodega",
  eyebrow: "Cálculo",
  title: "¿Cuántos metros cuadrados necesita tu bodega? Guía práctica de cálculo",
  metaTitle: "¿Cuántos m² Necesita tu Bodega? Guía de Cálculo",
  metaDescription:
    "Calcula cuántos metros cuadrados necesita tu bodega según pallets, racks, zonas de trabajo y proyección de crecimiento. Método práctico con ejemplos reales.",
  excerpt:
    "El método práctico para dimensionar tu bodega: pallets, pasillos, zonas de trabajo y el margen de crecimiento que casi todos olvidan.",
  date: "2026-08-05",
  readMin: 6,
  related: ["precio-arriendo-bodega-san-bernardo", "checklist-arrendar-bodega-industrial"],
  faq: [
    {
      q: "¿Cuántos m² necesito para 100 pallets?",
      a: "Como referencia, 100 posiciones de pallet a piso requieren en torno a 250–350 m² considerando pasillos y zonas de maniobra. Con racks en altura, la misma capacidad puede caber en bastante menos superficie.",
    },
    {
      q: "¿Qué porcentaje de la bodega se usa realmente para almacenar?",
      a: "En una operación típica, el almacenaje ocupa el 60–70% de la superficie. El resto se reparte entre pasillos, recepción/despacho, picking y áreas de trabajo u oficina.",
    },
    {
      q: "¿Cuánto margen de crecimiento conviene dejar?",
      a: "Entre 20% y 30% sobre tu necesidad actual. Quedarse corto obliga a mudarse (caro y disruptivo); por eso también convienen proyectos con superficies ampliables, donde puedes crecer sin cambiar de dirección.",
    },
    {
      q: "¿Qué superficie tienen las bodegas de Portal de Bodegas?",
      a: "Desde 180 m² para pymes hasta 14.000 m² en Bosque Catemito, con posibilidad de construir a medida hasta 30.000 m². Cuéntanos tu operación y te ayudamos a dimensionar sin costo.",
    },
  ],
  blocks: [
    {
      t: "p",
      x: "Arrendar de más es pagar m² que no usas; arrendar de menos es mudarse en un año. Dimensionar bien la bodega es la decisión que más impacta tu costo logístico — y se puede calcular con un método simple. Aquí va, con números de referencia reales.",
    },
    { t: "h2", x: "Paso 1: parte por los pallets (o su equivalente)" },
    {
      t: "p",
      x: "La unidad de cálculo del bodegaje es la posición de pallet (≈ 1,0 × 1,2 m). Un pallet a piso ocupa ~1,2 m², pero una bodega no es solo pallets pegados: sumando pasillos de circulación y maniobra, la regla práctica es 2,5 a 3,5 m² por posición a piso. Si tu mercadería no va en pallets, convierte a volumen: ¿cuántos m² de piso ocupan tus racks, estanterías o maquinaria, más el espacio para circular entre ellos?",
    },
    {
      t: "table",
      head: ["Posiciones de pallet (a piso)", "Superficie aproximada", "Perfil típico"],
      rows: [
        ["30 – 60", "≈ 100 – 200 m²", "Pyme, e-commerce en crecimiento"],
        ["100 – 150", "≈ 250 – 450 m²", "Distribuidor regional"],
        ["300 – 500", "≈ 750 – 1.500 m²", "Operación logística media"],
        ["Sobre 1.000", "Sobre 2.500 m² (o racks en altura)", "Centro de distribución"],
      ],
    },
    { t: "h2", x: "Paso 2: la altura vale oro" },
    {
      t: "p",
      x: "Si la bodega tiene buena altura útil y montas racks selectivos, multiplicas la capacidad sin pagar más suelo: 3 niveles de rack triplican las posiciones en la misma superficie. Por eso una bodega de 500 m² con 8 m de altura puede almacenar más que una de 900 m² baja. Al comparar opciones, compara metros cúbicos útiles, no solo metros cuadrados.",
    },
    { t: "h2", x: "Paso 3: suma las zonas que no son almacenaje" },
    {
      t: "list",
      items: [
        "Recepción y despacho — zona de carga/descarga y control: 10–15% de la superficie.",
        "Picking y preparación de pedidos — si armas pedidos, mesa y circulación: 5–15% según el rubro.",
        "Oficina y servicios — administración, baños: 5–10%.",
        "Regla de bolsillo: el almacenaje puro debería quedar en torno al 60–70% del total. Si tu cálculo da 300 m² de almacenaje, busca una bodega de 420–500 m².",
      ],
    },
    { t: "h2", x: "Paso 4: el margen que casi todos olvidan — crecimiento" },
    {
      t: "p",
      x: "La mayoría dimensiona para su operación de hoy. Pero mudar una bodega cuesta caro: flete, detención, rehabilitación, cambio de dirección ante clientes y proveedores. Agrega un 20–30% de holgura sobre tu necesidad actual — o mejor: elige un proyecto donde puedas ampliar superficie sin mudarte. En Bosque Catemito, por ejemplo, una operación puede partir acotada y crecer hasta 30.000 m² construidos a medida en el mismo recinto.",
    },
    { t: "h2", x: "Ejemplo completo: distribuidor pyme" },
    {
      t: "p",
      x: "Una distribuidora que maneja 80 posiciones de pallet a piso: 80 × 3 m² = 240 m² de almacenaje. Sumando recepción/despacho (35 m²), picking (25 m²) y oficina (15 m²): ~315 m². Con 25% de crecimiento: ~400 m². Veredicto: una bodega de 400–500 m² — y a 0,13 UF/m², un canon en torno a las 52–65 UF mensuales. Así de concreto sale el cálculo.",
    },
    {
      t: "cta",
      x: "¿Prefieres que lo calculemos contigo? Cuéntanos qué mueves y cuánto, y te sugerimos la superficie y el proyecto que calzan — sin costo y sin compromiso.",
      wa: "Hola, quiero ayuda para calcular cuantos m2 de bodega necesito",
    },
  ],
});

export const getGuia = (slug) => GUIAS.find((g) => g.slug === slug);


GUIAS.push({
  slug: "mercado-bodegas-santiago-agosto-2026",
  eyebrow: "Informe de mercado",
  title: "Mercado de bodegas en Santiago — Agosto 2026: vacancia, precios y tendencias",
  metaTitle: "Mercado de Bodegas en Santiago — Agosto 2026",
  metaDescription:
    "Vacancia de 4–5%, precios promedio pedidos en torno a 0,15 UF/m²/mes y el sector sur ganando protagonismo: el estado del mercado de bodegas industriales en Santiago, con fuentes.",
  excerpt:
    "La vacancia volvió a niveles saludables, los precios se diferencian por calidad y el sur concentra una parte creciente de la nueva oferta. Las cifras, con fuentes.",
  date: "2026-08-17",
  readMin: 6,
  related: ["precio-arriendo-bodega-san-bernardo", "bodegas-san-bernardo-hub-logistico"],
  faq: [
    {
      q: "¿Cuál es la vacancia de bodegas en Santiago en 2026?",
      a: "Según los últimos informes de las consultoras (CBRE, Colliers, Cushman & Wakefield), la vacancia del mercado de bodegas de Santiago se sitúa entre 4% y 5% en 2026, tras un peak cercano al 7% durante 2025. Es un nivel considerado saludable: hay demanda activa y menos espacio disponible.",
    },
    {
      q: "¿Cuánto cuesta arrendar una bodega en Santiago en 2026?",
      a: "El precio promedio pedido ronda las 0,15 UF/m² al mes, con una brecha creciente según calidad: bodegas clase B cierran en torno a 0,12 UF/m², mientras proyectos clase A nuevos alcanzan hasta 0,20 UF/m². En nuestros proyectos de San Bernardo el valor parte en 0,13 UF/m² con la bodega equipada.",
    },
    {
      q: "¿Es buen momento para arrendar una bodega?",
      a: "Con la vacancia bajando, las buenas opciones se arriendan más rápido que en 2024-2025. Si tu operación necesita espacio en los próximos meses, conviene cotizar con anticipación: los precios se mantienen estables, pero la disponibilidad en superficies específicas ya no sobra.",
    },
    {
      q: "¿Qué zona de Santiago conviene para una operación logística?",
      a: "Depende de tus rutas, pero el sector sur (San Bernardo, Calera de Tango, Paine) concentra una parte creciente de la nueva oferta por su conectividad con Ruta 5, Autopista Central y Vespucio, y por valores más competitivos que los polos del norte. Nuestra guía del hub logístico de San Bernardo profundiza en esto.",
    },
  ],
  blocks: [
    {
      t: "p",
      x: "En Portal de Bodegas seguimos la evolución del mercado industrial de la Región Metropolitana para que empresas y propietarios decidan con información, no con intuición. Esta es la fotografía del mercado de bodegas de Santiago a agosto de 2026, construida a partir de los informes públicos de CBRE, Colliers y Cushman & Wakefield, y de la prensa especializada del rubro.",
    },
    { t: "h2", x: "La vacancia vuelve a niveles saludables" },
    {
      t: "p",
      x: "Tras el aumento de oferta de 2024-2025 — que llevó la vacancia a un peak cercano al 7% — el mercado entró en fase de recuperación: la absorción se mantuvo positiva y el espacio disponible se redujo de forma sostenida. Los últimos reportes sitúan la vacancia del mercado entre 4% y 5%, con el segmento clase A operando prácticamente sin espacios disponibles.",
    },
    {
      t: "table",
      head: ["Período", "Vacancia", "Fuente"],
      rows: [
        ["1er semestre 2025 (peak)", "≈ 6,9%", "Estudios de mercado 2025"],
        ["Cierre 2025", "5,15% – 6,37%", "CBRE / Colliers (universos distintos)"],
        ["1er semestre 2026", "4,2% – 5,2%", "Cushman & Wakefield / CBRE"],
      ],
    },
    {
      t: "note",
      x: "¿Por qué los rangos? Cada consultora mide un universo distinto de propiedades (solo centros clase A/B, con o sin condominios menores), por eso sus cifras difieren. La tendencia, en cambio, es idéntica en todas: la vacancia baja.",
    },
    { t: "h2", x: "Precios: promedio estable, brecha creciente por calidad" },
    {
      t: "p",
      x: "El precio promedio pedido en Santiago ronda las 0,15 UF/m² al mes (0,147 UF/m² según el Marketbeat del primer trimestre 2026 de Cushman & Wakefield). Pero el promedio esconde lo importante: la brecha entre calidades se está abriendo.",
    },
    {
      t: "list",
      items: [
        "Bodegas clase B — cierres en torno a 0,12 UF/m², con vacancia cercana al 7% y concesiones comerciales para evitar espacios vacíos.",
        "Promedio de mercado — ≈ 0,15 UF/m²/mes pedido.",
        "Proyectos clase A nuevos — valores efectivos de hasta 0,20 UF/m², con disponibilidad casi nula.",
      ],
    },
    {
      t: "p",
      x: "La lectura de fondo: el mercado ya no paga solo metros cuadrados. Ubicación, accesos para camiones, potencia eléctrica, altura útil, seguridad y posibilidad de expansión inciden cada vez más en el valor — y en la velocidad con que se arrienda un espacio.",
    },
    { t: "h2", x: "La oferta: construcción acelerando" },
    {
      t: "p",
      x: "La superficie en construcción creció 30% en el último trimestre reportado, superando los 460.000 m² en desarrollo en la Región Metropolitana, con entregas proyectadas mayoritariamente entre fines de 2026 y 2027. Es un pipeline alineado con la demanda real: los desarrolladores están construyendo prácticamente en paralelo a la absorción, sin generar sobreoferta como en el ciclo anterior.",
    },
    { t: "h2", x: "El sector sur se abre paso" },
    {
      t: "p",
      x: "San Bernardo, Calera de Tango y Paine concentran una parte creciente de la nueva oferta industrial — un fenómeno que la prensa del rubro ya bautizó: \"el sur se abre paso en el mercado de bodegaje de la Región Metropolitana\" (Revista Logistec). Las razones son estructurales: conectividad directa con Ruta 5 Sur, Autopista Central y Américo Vespucio, disponibilidad de suelo industrial y valores más competitivos que los polos consolidados del norte y poniente.",
    },
    { t: "h2", x: "Qué significa esto si estás buscando bodega" },
    {
      t: "list",
      items: [
        "Menos vacancia = menos opciones. Las buenas superficies se arriendan más rápido que hace un año; conviene cotizar con anticipación y decidir con agilidad.",
        "Compara equipamiento, no solo m². Con la brecha de calidades abriéndose, dos bodegas al mismo precio pueden soportar operaciones muy distintas.",
        "Los precios están estables. Es un buen momento para presupuestar y firmar plazos con confianza, antes de que el ciclo de menor vacancia presione los valores.",
        "El sur combina conectividad y valor. La zona con más desarrollo nuevo sigue siendo más conveniente por m² que los polos del norte.",
      ],
    },
    { t: "h2", x: "¿Y nuestros valores?" },
    {
      t: "p",
      x: "En Portal de Bodegas publicamos los precios — algo que en este mercado sigue siendo la excepción. Nuestras bodegas en San Bernardo parten en 0,13 UF/m² al mes, bajo el promedio pedido de mercado, con la bodega equipada y lista para operar y trato directo con el propietario, sin comisión de corretaje. Y para operaciones que no requieren techo, tenemos terreno de acopio a cielo abierto desde 0,02 UF/m² al mes en superficies de 2.000 a 40.000 m².",
    },
    {
      t: "note",
      x: "Fuentes: CBRE (Latam Market Figures, informes de cierre 2025), Colliers, Cushman & Wakefield (Marketbeat Industrial Q1 2026) y Revista Logistec. Elaboración: Portal de Bodegas, agosto 2026. Actualizamos este informe periódicamente con cada nueva entrega de las consultoras.",
    },
    {
      t: "cta",
      x: "¿Buscas bodega en la zona con más proyección de Santiago? Cuéntanos superficie y uso, y te cotizamos hoy mismo.",
      wa: "Hola, quiero cotizar una bodega en San Bernardo",
    },
  ],
});

GUIAS.push({
  slug: "terreno-de-acopio-en-arriendo",
  eyebrow: "Acopio",
  title: "Terreno de acopio en arriendo: qué es, cuánto cuesta y qué revisar",
  metaTitle: "Terreno de Acopio en Arriendo desde 0,02 UF/m²",
  metaDescription:
    "Arrienda terreno de acopio a cielo abierto en San Bernardo: superficies de 2.000 a 40.000 m² desde 0,02 UF/m² al mes, nivelado, compactado y con seguridad 24/7. Qué revisar antes de firmar.",
  excerpt:
    "No toda operación necesita techo. Qué es un terreno de acopio, cuándo conviene frente a una bodega techada y los 6 puntos que hay que revisar antes de arrendar.",
  date: "2026-08-18",
  readMin: 5,
  related: ["cuantos-metros-cuadrados-necesita-tu-bodega", "mercado-bodegas-santiago-agosto-2026"],
  faq: [
    {
      q: "¿Cuánto cuesta arrendar un terreno de acopio?",
      a: "En nuestro proyecto Bosque Catemito, en San Bernardo, el terreno de acopio parte en 0,02 UF/m² al mes — una fracción del valor de una bodega techada. Un patio de 5.000 m² queda en torno a las 100 UF mensuales, con el recinto cerrado y seguridad 24/7 incluidos.",
    },
    {
      q: "¿Qué se puede almacenar en un terreno de acopio a cielo abierto?",
      a: "Todo lo que resiste intemperie: contenedores, maquinaria y equipos, áridos, madera, fierro, materiales de construcción, vehículos y estructuras. Si tu carga necesita protección del clima o control de temperatura, corresponde una bodega techada — y ambas pueden combinarse en el mismo recinto.",
    },
    {
      q: "¿Cuándo conviene acopio en vez de bodega techada?",
      a: "Cuando el techo no le agrega valor a tu carga. Si almacenas contenedores o áridos, pagar bodega techada es pagar techo que no usas: el acopio cuesta cerca de un séptimo del valor por m². La pregunta clave es qué porcentaje de tu mercadería realmente necesita protección.",
    },
    {
      q: "¿El terreno de acopio incluye seguridad?",
      a: "En nuestro caso sí: el terreno está dentro del mismo recinto que las bodegas, con cerco perimetral, CCTV y control de acceso 24/7. Es una diferencia importante frente a arrendar un sitio eriazo aislado, donde la seguridad corre completa por tu cuenta.",
    },
  ],
  blocks: [
    {
      t: "p",
      x: "No toda operación logística necesita techo. Contenedores, maquinaria, áridos, madera, fierro: buena parte de lo que se almacena en Chile resiste intemperie sin problema — y pagarle techo a esa carga es pagar por algo que no usa. Para eso existe el terreno de acopio: superficie a cielo abierto, nivelada y compactada, dentro de un recinto seguro, a una fracción del costo de una bodega.",
    },
    { t: "h2", x: "Qué es un terreno de acopio (y quién lo usa)" },
    {
      t: "p",
      x: "Un terreno de acopio — también llamado patio de acopio, cancha de acopio o zona de almacenamiento a cielo abierto — es superficie industrial preparada para depositar carga directamente sobre el suelo: aplanada, compactada y con acceso para camiones y maquinaria. Lo usan empresas de transporte que necesitan estacionar flota y contenedores, constructoras que acopian materiales entre obras, importadores con carga rodada o voluminosa, y operaciones de áridos, madera o acero.",
    },
    { t: "h2", x: "Cuánto cuesta: la matemática del cielo abierto" },
    {
      t: "p",
      x: "La razón de ser del acopio es económica. Mientras una bodega techada equipada parte en torno a 0,13 UF/m² al mes, el terreno de acopio parte en 0,02 UF/m² — cerca de un séptimo del valor. A igual presupuesto, consigues 6 a 7 veces más superficie.",
    },
    {
      t: "table",
      head: ["Superficie", "Terreno de acopio (0,02 UF/m²)", "Bodega techada (0,13 UF/m²)"],
      rows: [
        ["2.000 m²", "≈ 40 UF/mes", "≈ 260 UF/mes"],
        ["5.000 m²", "≈ 100 UF/mes", "≈ 650 UF/mes"],
        ["10.000 m²", "≈ 200 UF/mes", "≈ 1.300 UF/mes"],
        ["40.000 m²", "≈ 800 UF/mes", "—"],
      ],
    },
    {
      t: "note",
      x: "Valores referenciales de nuestro proyecto Bosque Catemito; el canon final depende de superficie, plazo y habilitación requerida. La comparación no es 'cuál es más barato' sino 'qué necesita realmente tu carga': muchas operaciones combinan una bodega techada chica con un patio de acopio grande.",
    },
    { t: "h2", x: "Los 6 puntos que hay que revisar antes de arrendar" },
    {
      t: "list",
      items: [
        "Nivelación y compactado — un terreno sin preparar se convierte en barrial en invierno y las grúas se entierran. Exige superficie aplanada y compactada, y pregunta qué mantención tiene.",
        "Drenaje — ¿dónde va el agua cuando llueve? Un patio que se inunda inutiliza la carga que está a nivel de piso.",
        "Seguridad del recinto — cerco perimetral, CCTV, control de acceso y guardias. Un sitio eriazo barato sin seguridad termina costando más en pérdidas y seguros.",
        "Acceso y circulación para camiones — el camión (y la grúa u horquilla) deben entrar, circular y operar sin maniobras imposibles. Recorre el acceso pensando en tu vehículo más grande.",
        "Uso de suelo y permisos — verifica que la comuna y el rol del terreno permitan tu actividad, especialmente para acopio de áridos, residuos o sustancias con normativa especial.",
        "Módulos y plazo — ¿puedes partir con 2.000 m² y crecer? ¿El módulo es exclusivo o compartido? La flexibilidad vale tanto como el precio.",
      ],
    },
    { t: "h2", x: "Nuestro terreno de acopio en Bosque Catemito" },
    {
      t: "p",
      x: "En Bosque Catemito (Camino Catemito 1990, San Bernardo) tenemos terreno nivelado y compactado para acopio a cielo abierto en superficies de 2.000 a 40.000 m², desde 0,02 UF/m² al mes, con posibilidad de módulos exclusivos. Está dentro del mismo recinto que nuestras bodegas: cerco perimetral, CCTV, control de acceso y circulación para camiones — y a minutos de la Ruta 5 Sur. Si tu operación mezcla carga techada y a la intemperie, puedes combinar bodega y patio en un solo lugar, con un solo contrato y trato directo.",
    },
    {
      t: "cta",
      x: "Cuéntanos qué necesitas acopiar y cuántos m², y te cotizamos hoy mismo — respuesta al instante por WhatsApp.",
      wa: "Hola, quiero información sobre el arriendo de terreno para acopio en Bosque Catemito",
    },
  ],
});

GUIAS.push({
  slug: "bodega-industrial-vs-self-storage",
  eyebrow: "Comparativa",
  title: "Bodega industrial vs. mini-bodega (self-storage): ¿cuál necesitas?",
  metaTitle: "Bodega Industrial vs. Self-Storage: Diferencias y Cuál Elegir",
  metaDescription:
    "¿Bodega industrial o mini-bodega self-storage? Diferencias en tamaño, acceso para camiones, uso permitido y precio — para elegir el espacio correcto para tu empresa en San Bernardo.",
  excerpt:
    "Se buscan casi con las mismas palabras, pero resuelven problemas distintos. Tamaño, acceso, uso permitido y precio: las diferencias que importan antes de cotizar.",
  date: "2026-08-27",
  readMin: 5,
  related: ["precio-arriendo-bodega-san-bernardo", "cuantos-metros-cuadrados-necesita-tu-bodega"],
  faq: [
    {
      q: "¿Puedo guardar la mercadería de mi empresa en un self-storage?",
      a: "Para volúmenes chicos y ocasionales, sí. Pero un self-storage no está pensado para operar: los boxes van de 1 a unos 30 m², no tienen acceso para camiones ni horario de carga industrial, y los contratos suelen prohibir actividad comercial dentro del box. Si recibes o despachas mercadería con regularidad, necesitas una bodega industrial.",
    },
    {
      q: "¿Cuál es la diferencia de precio entre una bodega industrial y un self-storage?",
      a: "El self-storage cobra caro por m² porque vende conveniencia y formato chico — un box de 10 m² puede costar, por metro, varias veces más que una bodega. La bodega industrial se arrienda por superficie completa, desde 0,13 UF/m² en nuestros proyectos: sale mucho más conveniente por metro cuadrado en cuanto tu volumen crece.",
    },
    {
      q: "¿Los self-storage tienen acceso para camiones?",
      a: "En general no están diseñados para eso: pasillos angostos, ascensores o accesos pensados para autos y camionetas, no para un camión operando con carga y descarga regular. Una bodega industrial sí tiene acceso y circulación pensados para camiones desde el diseño.",
    },
    {
      q: "¿Desde qué tamaño conviene pasar de self-storage a bodega industrial?",
      a: "No es solo tamaño, es frecuencia de uso: si ya estás arrendando 2 o 3 boxes, o necesitas recibir proveedores y despachar pedidos de forma regular, ya te conviene una bodega — aunque el metraje total sea similar al de varios boxes juntos. Nuestro proyecto más chico parte en 180 m², pensado justamente para ese salto.",
    },
  ],
  blocks: [
    {
      t: "p",
      x: "\"Arriendo de bodega\" y \"self-storage\" se buscan casi con las mismas palabras, y Google a veces los mezcla en los mismos resultados. Pero resuelven problemas distintos: uno es para guardar cosas, el otro es para operar un negocio. Confundirlos sale caro — ya sea porque pagas de más por m² en un self-storage, o porque arriendas una bodega industrial para guardar cuatro cajas.",
    },
    { t: "h2", x: "Qué es un self-storage (mini-bodega)" },
    {
      t: "p",
      x: "Un self-storage es un box individual dentro de un edificio de bodegaje personal, típicamente de 1 a 30 m², con acceso propio (a veces con clave o app) y horario acotado. Está pensado para almacenar objetos personales, archivo de oficina, inventario chico de e-commerce o mudanzas temporales — no para operar una empresa desde ahí. No tiene acceso para camiones, energía trifásica ni radier industrial, y los reglamentos internos suelen prohibir actividad comercial dentro del box.",
    },
    { t: "h2", x: "Qué es una bodega industrial" },
    {
      t: "p",
      x: "Una bodega industrial es una nave completa — desde 180 m² en nuestros proyectos — con radier industrial alisado, energía trifásica, altura útil y acceso directo para camiones. Está construida para que una empresa opere de verdad: recibir y despachar mercadería, almacenar inventario a escala, hacer manufactura liviana o distribución. Se arrienda directo con el propietario, por la nave completa, no por box.",
    },
    { t: "h2", x: "Las diferencias, lado a lado" },
    {
      t: "table",
      head: ["", "Self-storage (mini-bodega)", "Bodega industrial"],
      rows: [
        ["Superficie típica", "1 – 30 m²", "180 m² en adelante"],
        ["Acceso", "Personas, sin camiones", "Camiones y maquinaria"],
        ["Uso permitido", "Guardar objetos, sin operar", "Operación completa de la empresa"],
        ["Energía y radier", "No incluidos", "Trifásica + radier industrial"],
        ["Precio de referencia", "Alto por m², bajo en total", "Desde 0,13 UF/m² al mes"],
        ["Perfil típico", "Personas y microemprendimientos", "Pymes en crecimiento y empresas logísticas"],
      ],
    },
    {
      t: "note",
      x: "No es que uno sea \"mejor\" que el otro — resuelven necesidades distintas. La pregunta correcta no es cuál es más barato, sino: ¿estoy guardando cosas, u operando un negocio?",
    },
    { t: "h2", x: "Cuándo conviene cada uno" },
    {
      t: "list",
      items: [
        "Self-storage: guardar objetos personales, archivo, temporadas de mudanza, o inventario muy chico de un emprendimiento que recién parte.",
        "Bodega industrial: recibir y despachar mercadería con regularidad, necesitar acceso para camiones, almacenar a escala, o hacer manufactura liviana y distribución.",
        "Señal de que ya es hora de cambiar: estás arrendando más de un box, o cualquier proveedor o cliente necesita llegar en camión a buscar o dejar carga.",
      ],
    },
    { t: "h2", x: "Nuestras bodegas industriales en San Bernardo" },
    {
      t: "p",
      x: "En Portal de Bodegas arrendamos bodegas industriales en cinco proyectos en San Bernardo, desde 180 m² hasta 14.000 m² y ampliables hasta 30.000 m² construidos a medida. Todas con radier industrial alisado, energía trifásica, seguridad 24/7 y acceso directo para camiones — trato directo con el propietario, sin comisión de corretaje.",
    },
    {
      t: "cta",
      x: "¿Tu operación ya necesita más que un box? Cuéntanos qué necesitas y te cotizamos hoy mismo.",
      wa: "Hola, quiero cotizar una bodega industrial (vengo de la guía de self-storage vs. bodega)",
    },
  ],
});
