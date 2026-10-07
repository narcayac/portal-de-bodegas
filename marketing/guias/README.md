# Guías — carruseles explicativos

Carrusel de 6 slides (1080×1350, formato 4:5) por cada guía de `lib/guias.js`
que se decida convertir a contenido de redes. A diferencia de `../recorrido/`
(que muestra un proyecto físico), acá el contenido es explicativo: un
concepto, cuándo conviene, cómo funciona, y la capacidad real que
tenemos hoy para resolverlo.

El sistema de marca (colores, fuentes, logo, shell HTML) vive en
`../shared/brand.js` — es el mismo que usa `../recorrido/`, así que ambas
series se ven como una sola familia visual.

| Guía | Estado |
|---|---|
| Built-to-suit (construcción a medida) | publicado — `salida/built-to-suit/` |
| Mercado de bodegas — Septiembre 2026 | publicado — `salida/mercado-bodegas-santiago-septiembre-2026/` |
| Cuánto cobra un corredor (y por qué acá no) | publicado — `salida/cuanto-cobra-un-corredor/` |
| Bodega para e-commerce en San Bernardo | publicado — `salida/bodega-para-ecommerce-san-bernardo/` |

El resto de las guías en `lib/guias.js` (precio de arriendo, checklist
técnica, hub logístico San Bernardo, galpón vs. bodega, contrato de
arriendo, cálculo de m², informe de mercado de agosto, terreno de acopio,
bodega industrial vs. self-storage) todavía no tienen versión en carrusel.

## Estructura del carrusel

1. **Portada** — foto de fondo, nombre corto de la guía, tagline
2. **Concepto** — foto + titular + bajada (p. ej. "Qué es")
3. **Lista** — fondo blanco, encabezado + hasta 5 ítems con guión (p. ej. "cuándo conviene")
4. **Pasos** — fondo navy, encabezado + hasta 5 pasos numerados (p. ej. "cómo funciona")
5. **Concepto** — foto + titular + bajada (p. ej. capacidad real del proyecto que resuelve esto)
6. **Cierre** — CTA a WhatsApp

Los slides 3 y 4 (lista y pasos) llevan el logo en el pie en vez del
badge numerado arriba — son los "momentos" más citables del carrusel,
pensados para que se entiendan solos si alguien los comparte sueltos.

## Cómo generar

```bash
npm i playwright                            # solo la primera vez
../shared/fuentes.sh                        # genera ../shared/fonts.css (no versionado)
node build.js                               # renderiza TODAS las guías definidas
node build.js built-to-suit                 # renderiza solo una, por id

node ../shared/pdf.js salida/built-to-suit built-to-suit.pdf   # PDF para LinkedIn
```

Si Chromium está en otra ruta: `CHROME_PATH=/ruta/al/chrome node build.js`.

Para la siguiente guía se agrega un objeto nuevo en `build.js` siguiendo
el patrón de `BUILT_TO_SUIT` / `MERCADO_SEPTIEMBRE` (portada, un concepto
de apertura, una lista, unos pasos, un concepto de cierre con foto) y se
suma a `ALL_GUIDES`. El contenido debe salir de la guía real en
`lib/guias.js` — condensado para la pantalla, no inventado.

Por defecto la portada dice "Guía" — si el contenido es un informe de
mercado (o cualquier cosa que no sea una guía explicativa clásica), se
puede sobrescribir con `kicker: "Informe de mercado"` en el objeto.

Por defecto las slides 1, 2 y 5 llevan foto de fondo. Si el tema no se
presta a foto (una comparación de números, por ejemplo) o ya hay
demasiados carruseles seguidos con la misma fórmula visual, se puede
agregar `noPhoto: true` al objeto de la guía: renderiza esas tres slides
con fondo navy degradado y texto más grande en vez de foto + scrim. En
ese caso `cover`, `concepts[]` y `capacity` no necesitan `src`/`pos`.

## Por plataforma

Mismo criterio que en `../recorrido/`: Instagram publica los
`slide-0N.png` como carrusel nativo; LinkedIn no tiene carrusel, así que
`../shared/pdf.js` empaqueta las mismas imágenes en un PDF de 6 páginas.

Cada guía en `salida/<id>/` lleva:
- `slide-0N.png` — carrusel para Instagram
- `<id>.pdf` — documento para LinkedIn
- `instagram-caption.txt` — copy corto, hashtags de alcance
- `linkedin-caption.txt` — copy más largo, tono institucional B2B

### Versión en video (Reel/feed)

`../shared/video.js` arma un video a partir del mismo carrusel: zoom
suave (Ken Burns) por slide, fundido corto entre cortes, y voz en off
real grabada por el cliente — no se sintetiza voz. Requiere `ffmpeg`
instalado en el sistema (`apt-get install ffmpeg`; el ffmpeg que trae
Playwright es un build mínimo, sin códecs, y no sirve para esto).

```bash
node ../shared/video.js salida/cuanto-cobra-un-corredor                       # preview sin audio
node ../shared/video.js salida/cuanto-cobra-un-corredor --audio voz.mp3       # con voz en off
```

La duración de cada slide sale de `salida/<id>/durations.json` (un
array de segundos, uno por slide); si no existe, usa 4s parejo. El
guion para grabar la voz va en `salida/<id>/guion-voz.txt`, con los
tiempos por slide como referencia — no hace falta cronometrarlo al
segundo, si la grabación queda más larga o corta se ajustan las
duraciones y se vuelve a renderizar.

## Reglas al escribir los textos

- El contenido sale de la guía correspondiente en `lib/guias.js`. Se
  condensa para caber en pantalla, no se inventa ni se agrega información
  que la guía no tenga.
- Sin precio en el copy de redes (regla dura de `organic-specialist.md`
  para contenido orgánico) — aunque el sitio y las guías sí publiquen el
  precio de referencia aprobado.
- Nunca prometer disponibilidad ni plazos de entrega.
- Sin emojis. El ícono de WhatsApp es SVG, no emoji.
- Español de Chile: "arriendo", nunca "renta".

## Fotos

Se toman de `public/photos/<proyecto>/` — el proyecto que mejor
represente el concepto de la guía, no necesariamente el que la guía cita
como ejemplo textual. En Built-to-suit se usó Bosque Catemito completo
(cover, definición, capacidad) porque es el único proyecto con terreno
para construir a medida.

En el informe de mercado de septiembre, la portada probó primero con
Inversiones Duramet (portón + persona caminando) y se cambió a la aérea
de Bosque Catemito: para un informe de mercado (no el recorrido de un
proyecto puntual) una vista de conjunto se lee más "institucional" que
una foto de un portón específico con alguien caminando al frente.

"Cuánto cobra un corredor" se rediseñó sin fotos: es el sexto carrusel
seguido con fórmula "foto + texto encima" (los 5 de Recorrido, más
Built-to-suit y Mercado Septiembre) y para un tema de números/comparación
tiene más sentido un formato 100% tipográfico — fondo navy con degradado,
sin `<img>`. Ver `slideCoverText` / `slideConceptText` en `build.js` y el
flag `noPhoto: true` en el objeto de la guía.

"Bodega para e-commerce" volvió a usar fotos (venía justo después del
carrusel sin fotos, así que alternar de nuevo aporta variedad) con
Acacias Seis completo: las 5 fotos del proyecto están limpias, sin
marcas de agua ni branding de terceros (ver `../recorrido/README.md`).
Se eligió la exterior con el portón abierto para la portada, la interior
mirando hacia la puerta para el concepto de apertura (refuerza la idea
de flujo: algo entra, algo sale) y la nave ancha vacía para el cierre de
capacidad (espacio para organizar zonas y crecer).

## Contenido que no viene de una guía completa

No todo carrusel necesita una guía dedicada en `lib/guias.js`. "Cuánto
cobra un corredor" toma un solo dato ya publicado — la comisión de
corretaje (medio a un mes de arriendo) y el ejemplo de 500 m² a
0,13 UF/m² = 65 UF, ambos de `precio-arriendo-bodega-san-bernardo` — y
le dedica el carrusel completo. Es válido siempre que el dato exista y
esté publicado en el sitio; no se inventa nada nuevo solo para tener
contenido.
