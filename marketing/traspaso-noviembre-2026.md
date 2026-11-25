# Portal de Bodegas — traspaso a noviembre 2026

Documento de contexto para continuar el trabajo en otra conversación.

## Qué es la empresa

Arriendo de bodegas industriales B2B en San Bernardo, Región Metropolitana.
Cinco recintos **propios**, de 180 a 14.000 m² techados más hasta 40.000 m²
de terreno para acopio a cielo abierto. El diferenciador comercial es el
trato directo con el propietario: sin corredores ni comisión de corretaje.

Contacto comercial: ricardo@portaldebodegas.cl · +56 9 9225 9272

Los cinco recintos, de mayor a menor: Bosque Catemito (360–14.000 m², más
30.000 m² para construir a medida y el terreno de acopio), Duramet
(450–1.900 m²), Acacias Seis (1.551 m² de planta libre), El Barrancón
(623–1.266 m²) y Alto Las Acacias (180–720 m²).

## Dónde está todo

- **Sitio**: Next.js 14. Las guías viven en `lib/guias.js` y los datos de los
  proyectos en `lib/data.js`. Son la fuente de verdad de metrajes y direcciones.
- **Contenido**: `marketing/`, con una carpeta por serie —`recorrido/`,
  `guias/`, `versus/`, `diagramas/`, `informes/`, `video/`, `catalogo/`,
  `analytics/`. **Cada carpeta tiene su README con las reglas que se
  aprendieron ahí.** Conviene leerlos antes de tocar nada.
- **Rama de trabajo**: `claude/portal-bodegas-content-0izwod`.

## Lo que se hizo en noviembre

| Fecha | Qué se hizo | Área | Tiempo aprox. |
|---|---|---|---|
| 2 nov | Carrusel "temporada alta", 4 láminas + captions. Descartado: público equivocado | Instagram · LinkedIn empresa | 2,5 h |
| 5 nov | Reemplazo por "Cierre de año: días hábiles que quedan", 5 láminas + captions | Instagram · LinkedIn empresa | 3 h |
| 9 nov | Pipeline de video vertical (Playwright + ffmpeg) y resolución de Chromium en los 5 generadores. Primer video descartado | Instagram | 4 h |
| 10 nov | Video "los cinco recintos en el mapa", 27 s, con georreferenciación en Web Mercator. Captions | Instagram · LinkedIn empresa | 5 h |
| 17 nov | Reel "Anatomía de un recinto industrial", 24 s. Captions | Instagram · LinkedIn empresa | 4,5 h |
| 18 nov | Corrección de apertura del reel para que no se lea como foto | Instagram | 1 h |
| 18 nov | Evaluación de conexión por API a Instagram y LinkedIn | Base de datos y reportes | 1,5 h |
| 18 nov | Informe de Instagram a 90 días y plan de contenido derivado | Base de datos y reportes | 2 h |
| 23 nov | Catálogo de capacidad para TIBA Group, 13 láminas en PDF | Marketing corporativo | 6 h |
| 23 nov | Correcciones del catálogo: sombras, desbordes, numeración, peso | Marketing corporativo | 2 h |
| 25 nov | Catálogo: foto de acopio, íconos, nombre Duramet | Marketing corporativo | 2 h |

**Total: 33,5 h.** Instagram y LinkedIn empresa 20 h, marketing corporativo
10 h, base de datos y reportes 3,5 h.

Sin actividad en noviembre: **sitio web y SEO, Google Ads, LinkedIn gerencia,
reuniones y coordinación**. Los tiempos son estimaciones sobre el alcance de
cada entregable, no horas registradas, y solo cubren lo que pasó por el
repositorio.

## Lo que dicen los números

Del informe del 18 de noviembre, sobre los 90 días al 18-nov:

- 78 seguidores, 607 cuentas alcanzadas, 3.403 views, 19 piezas publicadas.
- 52 visitas al perfil y **un solo clic** al enlace de la bio.
- El 59,9% de las views viene de gente que no sigue la cuenta: Instagram ya
  está distribuyendo el contenido. **El problema no es alcance, es conversión.**
- Lo que funciona: carruseles de mercado con un dato duro en el titular. Los
  dos informes numerados promedian 224 cuentas alcanzadas contra 128 del resto.
- Lo que no: los tres reels del período ocupan los tres últimos lugares del
  ranking. Más de la mitad del tiempo de noviembre se fue en video.
- Hallazgo que el informe no vio: **a más alcance, menos conversión**. La
  pieza de mayor alcance (288 cuentas) dio 0 visitas al perfil; el recorrido
  de Acacias Seis (155 cuentas) dio 6. El contenido de mercado trae gente, el
  de propiedad la convierte.

## Reglas de trabajo acordadas

1. **Mostrar el texto primero.** Las láminas se construyen solo después de
   que el contenido esté aprobado. Esta regla salió de varios entregables
   construidos y descartados.
2. **Toda cifra de mercado lleva su fuente visible**, en el pie de la lámina
   o en el caption.
3. **Legibilidad móvil**: en un lienzo de 1080 px, mínimo 28 px de cuerpo y
   24 px para texto en monoespaciada. Abajo de eso no se lee en un teléfono.
4. **Límites de caption**: Instagram 2.200 caracteres, LinkedIn 3.000.
5. **Nunca `text-shadow` en el catálogo PDF**: Chromium lo imprime como una
   caja opaca. La legibilidad sobre foto se resuelve con degradados.
6. **La foto tiene que decir lo que dice el rótulo.** Se rotuló un patio de
   maniobras sobre una zona llena de maquinaria estacionada, y una lámina de
   acopio con la foto de una nave. Las dos veces hubo que rehacerlo.

## Pendientes

**Catálogo TIBA** (`marketing/catalogo/`), lo único que falta para enviarlo:
1. Estatus aduanero — ¿son o no almacén extraportuario / depósito aduanero?
   TIBA es agente de aduana y es la primera pregunta que va a hacer.
2. Distancias reales por carretera a San Antonio, Valparaíso y el aeropuerto.
   Se dejaron fuera a propósito: las fuentes públicas mezclan línea recta con
   carretera y un forwarder detecta un número malo de inmediato.
3. Nombre completo y cargo de quien firma.

**Inconsistencias del repositorio:**
4. El sitio publica `rarcaya@arcaya.cl` en `lib/data.js`, pero el contacto
   comercial es `ricardo@portaldebodegas.cl`. Hay que alinearlos.
5. El recinto se llama **Duramet**, pero `lib/data.js` y
   `marketing/recorrido/build.js` todavía dicen "Inversiones Duramet".

**Decisiones de contenido abiertas:**
6. Diferenciar el cierre de los carruseles según la serie: el contenido de
   mercado llega a desconocidos desde Explorar y debería pedir un seguimiento;
   el de propiedad llega a gente tibia y ahí sí corresponde el WhatsApp. Hoy
   todos cierran pidiendo WhatsApp y el enlace de la bio tuvo un clic en 90 días.
7. Confirmar si el terreno despejado del primer plano de la aérea de Bosque
   Catemito es parte del recinto. Si lo es, da para una cuarta zona en el reel
   —terreno para construir a medida, hasta 30.000 m²— y hay que actualizar los
   dos captions.
8. `marketing/publicados.md`: registro de temas ya publicados, para no repetir.
   Se acordó armarlo y nunca se hizo.

## Conexión a redes

No hay conexión automática y por ahora no la va a haber. Crear una app en el
panel de Meta exige un perfil de Facebook, y está decidido que no se va a
crear. Abency —que resolvería esto sin tocar Facebook, porque ya tiene su app
aprobada— tiene la prueba gratuita vencida. LinkedIn tiene su propio portón:
las métricas de página de empresa están detrás de una API bajo aprobación.

Mientras tanto el análisis es a mano, desde capturas de Instagram Insights y
la exportación nativa de LinkedIn.
