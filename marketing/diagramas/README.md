# Diagramas — carruseles con un dato dibujado por slide

Tercera familia visual del sistema, junto a `../recorrido/` (recorrido de
un proyecto físico) y `../guias/` (explicativo con foto + scrim). La
diferencia no es solo estética: acá **cada slide carga un dato dibujado**
—un flujo, una proporción, una comparación— en vez de ilustrar una frase.

Nació porque el carrusel de e-commerce hecho en `../guias/` repetía la
fórmula de foto + texto encima y las slides nombraban categorías
evidentes ("recepción, picking, packing") sin agregar información.

| Post | id | Estado |
|---|---|---|
| Bodega para e-commerce en San Bernardo | `bodega-para-ecommerce-san-bernardo` | publicado |
| Por qué el sur se convirtió en polo logístico | `polo-logistico-sur-santiago` | publicado |

## Estructura

Solo las slides 1 y 6 son fijas: la portada (`coverSlide`) y el cierre
(`ctaSlide`) viven en el módulo y los posts solo les pasan el contenido.
Las cuatro del medio las define cada post según el dato que tenga que
dibujar — ese es el punto de la serie.

1. **Portada** — foto a sangre (sin márgenes) con el bloque de título
   montado encima. Capas, no zonas: la foto no es fondo con scrim.
2–5. **El dato dibujado** — un diagrama distinto por slide.
6. **Cierre** — navy con CTA a WhatsApp.

En e-commerce son: fan-out (entrada consolidada contra salidas
fraccionadas), barra apilada con el reparto del espacio, tres nodos
verticales conectados por una línea, y tarjetas anidadas (hoy /
ampliable). En el polo logístico sur: dos bandas sólidas con la flecha
del giro norte→sur, un hub-and-spokes con las cuatro salidas troncales,
tres razones numeradas, y dos tarjetas de cifras con las citas de
mercado.

Las slides 1 y 6 son las de contraste (foto y navy); del 2 al 5 van
sobre blanco, con círculos y bloques de color sólido y sombra suave — el
mismo lenguaje del badge "VS" de `../versus/`.

## Decisiones de diseño que costaron varias rondas

- **Nada de contornos finos sobre blanco.** La primera versión usaba
  íconos de línea y recuadros punteados y se leía como un manual técnico
  de los noventa. Todo pasó a relleno sólido con sombra.
- **Nada de íconos genéricos en la portada.** Una caja dentro de un
  círculo se lee como cualquier app de logística; los planos de planta se
  leían como documentación técnica. La portada ganadora es editorial:
  foto a sangre y bloque de título encima.
- **Sin isometría ni emojis**, por la regla de marca en
  `.claude/agents/_contexto-cliente.md`.

## Cómo generar

```bash
npm i playwright                   # solo la primera vez
../shared/fuentes.sh               # genera ../shared/fonts.css (no versionado)
node build.js                                 # renderiza TODOS los posts
node build.js polo-logistico-sur-santiago     # renderiza solo uno, por id

node ../shared/pdf.js salida/<id> <id>.pdf    # PDF para LinkedIn
```

Para sumar un post se agrega una función `postX()` que devuelve
`{ id, name, slides }` y se mete en `POSTS`. Los íconos nuevos van al
objeto `D` compartido (solo el trazado; el tamaño lo pone `icon()`).

Si Chromium está en otra ruta: `CHROME_PATH=/ruta/al/chrome node build.js`.

## De dónde salen las cifras

Mismas reglas que `../guias/README.md`: el contenido se condensa de las
guías reales en `lib/guias.js`, no se inventa.

El reparto del espacio de la slide 3 (almacenaje 60–70%, recepción y
despacho 10–15%, picking 5–15%, oficina 5–10%, y el ejemplo de 300 m² de
almacenaje → bodega de 420–500 m²) viene de
`cuantos-metros-cuadrados-necesita-tu-bodega`, que la guía de e-commerce
enlaza explícitamente. El ancho de cada tramo de la barra va al centro
de su rango publicado; los rótulos llevan el rango completo.

Las cifras del post del sur salen de tres guías ya publicadas:
`bodegas-san-bernardo-hub-logistico` (las cuatro rutas troncales, el
suelo disponible, el valor comparado con el norte y la frase de la
autopista), el informe de agosto (la nueva oferta en San Bernardo,
Calera de Tango y Paine, más la cita de Revista Logistec) y el de
septiembre (vacancia 3,83% / 0,29% clase A y los submercados más
buscados, Cushman & Wakefield 2T 2026). No se escribió guía nueva para
este post: el tema ya está cubierto por `bodegas-san-bernardo-hub-logistico`
y una segunda página sobre lo mismo competiría con ella en búsqueda.

El cierre no muestra teléfono ni URL: el botón de WhatsApp es la única
acción, igual que en `../versus/`.
