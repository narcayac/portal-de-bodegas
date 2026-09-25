# Recorrido — carruseles por proyecto

Carrusel de 6 slides (1080×1350, formato 4:5) por cada proyecto de la red.
Se generan por código para que los cinco salgan idénticos en tipografía,
color y grilla.

| Nº | Proyecto | Estado |
|---|---|---|
| 01 | El Barrancón | publicado (hecho antes de este generador) |
| 02 | Bosque Catemito | publicado — `salida/bosque-catemito/` |
| 03 | Alto Las Acacias | publicado (hecho fuera de este generador) |
| 04 | Acacias Seis | publicado — `salida/acacias-seis/` |
| 05 | Inversiones Duramet | publicado — `salida/inversiones-duramet/` |

Vuelta completa: los 5 proyectos de la red ya tienen su carrusel. La
próxima ronda (cuando corresponda repetir) puede variar el ángulo por
proyecto en vez de repetir la misma estructura de atributos.

## Estructura del carrusel

1. **Portada** — foto aérea, nombre del proyecto, rango de m², badge "Desliza →"
2. **Atributo** — foto + titular + bajada
3. **Atributo** — foto + titular + bajada
4. **Atributo** — foto + titular + bajada
5. **Ficha** — fondo blanco, superficie, arriendo y 5 especificaciones
6. **Cierre** — CTA a WhatsApp

El sistema de marca (colores, fuentes, logo, shell HTML) vive en
`../shared/brand.js` — lo comparte esta serie con `../guias/`. Si cambia
algo de marca, se cambia ahí una sola vez.

## Cómo generar

```bash
npm i playwright                        # solo la primera vez
../shared/fuentes.sh                    # genera ../shared/fonts.css (no versionado)
node build.js                           # renderiza TODOS los proyectos definidos
node build.js acacias-seis              # renderiza solo uno, por id

node ../shared/pdf.js salida/acacias-seis acacias-seis.pdf   # PDF para LinkedIn
```

Si Chromium está en otra ruta: `CHROME_PATH=/ruta/al/chrome node build.js`.

Para el siguiente proyecto se agrega un objeto nuevo en `build.js` (fotos,
titulares, ficha) siguiendo el patrón de `BOSQUE` / `ACACIAS_SEIS` /
`DURAMET`, y se suma a `ALL_PROJECTS`. Un feature puede llevar `zoom`
(número, ej. `1.6`) para reencuadrar una foto ya usada en otro slide sin
que se vea repetida — útil cuando el proyecto no tiene fotos limpias de
sobra (ver Inversiones Duramet).

## Por plataforma

Instagram publica el carrusel como imágenes nativas (los `slide-0N.png`).
LinkedIn no tiene carrusel nativo: se publica como documento adjunto, por
eso `../shared/pdf.js` empaqueta las mismas imágenes ya renderizadas en
un PDF de 6 páginas — no vuelve a dibujar texto, así queda pixel-idéntico
al carrusel de Instagram.

Cada proyecto en `salida/<id>/` lleva:
- `slide-0N.png` — carrusel para Instagram
- `<id>.pdf` — documento para LinkedIn
- `instagram-caption.txt` — copy corto, hashtags de alcance
- `linkedin-caption.txt` — copy más largo, tono institucional B2B, sin hashtags de alcance masivo

El caption cambia de tono por plataforma pero comparte las reglas duras
de la sección siguiente (sin precio en el copy de redes, sin promesas,
sin emojis).

## Reglas al escribir los textos

- Los datos de m² salen de `lib/data.js`. No se inventan cifras.
- Precio público aprobado: **desde 0,13 UF/m²/mes**. El acopio al aire libre
  de Bosque Catemito: **desde 0,02 UF/m²/mes**. Ningún otro valor es público.
- Nunca prometer disponibilidad ni plazos de entrega.
- Sin emojis. El ícono de WhatsApp es SVG, no emoji.
- Español de Chile: "arriendo", nunca "renta".

## Fotos

Se toman de `public/photos/<proyecto>/`. Antes de elegir hay que mirarlas:
en Bosque Catemito, `foto-02` y `foto-06` traen la marca de agua
"ID 3547413" de un portal y quedaron fuera; `foto-07` tiene una franja
negra en el tercio inferior. Se usaron 04 (portada), 01, 05 y 03.

En Acacias Seis las 5 fotos estaban limpias (sin marcas de agua ni
defectos): se usaron todas — 01 (portada), 04, 02 y 03 (atributos).

En Inversiones Duramet, de 6 fotos solo 3 sirven: `foto-01` muestra un
camión con branding de un tercero ("Ballerina") que ocupa cerca de la
mitad del ancho del encuadre — se probó matemáticamente que ningún
recorte vía `object-position` lo excluye sin perder el resto del
contenido útil, así que se descartó. `foto-03` y `foto-05` muestran a un
trabajador sin polera y manchas de humedad en el revestimiento. Con solo
`foto-02`, `foto-04` y `foto-06` limpias, `foto-02` se reutiliza dos
veces (portada + un atributo) con `zoom` y una región de encuadre
distinta cada vez — cuidado al elegir la región: un primer intento de
zoom sobre `foto-02` (zona inferior izquierda) reveló a un segundo
trabajador sin polera que no era visible en el encuadre ancho de la
portada. Vale la pena pedir fotos nuevas de este proyecto.
