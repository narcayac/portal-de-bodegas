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

El resto de las guías en `lib/guias.js` (precio de arriendo, checklist
técnica, hub logístico San Bernardo, galpón vs. bodega, contrato de
arriendo, cálculo de m², informe de mercado, terreno de acopio, bodega
industrial vs. self-storage) todavía no tienen versión en carrusel.

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
el patrón de `BUILT_TO_SUIT` (portada, un concepto de apertura, una
lista, unos pasos, un concepto de cierre con foto) y se suma a
`ALL_GUIDES`. El contenido debe salir de la guía real en `lib/guias.js`
— condensado para la pantalla, no inventado.

## Por plataforma

Mismo criterio que en `../recorrido/`: Instagram publica los
`slide-0N.png` como carrusel nativo; LinkedIn no tiene carrusel, así que
`../shared/pdf.js` empaqueta las mismas imágenes en un PDF de 6 páginas.

Cada guía en `salida/<id>/` lleva:
- `slide-0N.png` — carrusel para Instagram
- `<id>.pdf` — documento para LinkedIn
- `instagram-caption.txt` — copy corto, hashtags de alcance
- `linkedin-caption.txt` — copy más largo, tono institucional B2B

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
