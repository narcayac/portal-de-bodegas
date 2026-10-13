# Diagramas — carruseles con un dato dibujado por slide

Tercera familia visual del sistema, junto a `../recorrido/` (recorrido de
un proyecto físico) y `../guias/` (explicativo con foto + scrim). La
diferencia no es solo estética: acá **cada slide carga un dato dibujado**
—un flujo, una proporción, una comparación— en vez de ilustrar una frase.

Nació porque el carrusel de e-commerce hecho en `../guias/` repetía la
fórmula de foto + texto encima y las slides nombraban categorías
evidentes ("recepción, picking, packing") sin agregar información.

| Post | Estado |
|---|---|
| Bodega para e-commerce en San Bernardo | publicado — `salida/bodega-para-ecommerce-san-bernardo/` |

## Estructura

1. **Portada** — foto a sangre (sin márgenes) con el bloque de título
   montado encima. Capas, no zonas: la foto no es fondo con scrim.
2. **Diagrama de flujo** — el fan-out: una entrada consolidada contra
   muchas salidas fraccionadas.
3. **Proporción** — barra apilada con el reparto del espacio y una
   leyenda con los rangos.
4. **Pasos** — tres nodos en vertical conectados por una línea.
5. **Capacidad** — tarjetas anidadas con relleno (hoy / ampliable).
6. **Cierre** — navy con CTA a WhatsApp.

Las slides 1 y 6 son las de contraste (foto y navy); del 2 al 5 van
sobre blanco, con círculos de color sólido y sombra suave — el mismo
lenguaje del badge "VS" de `../versus/`.

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
node build.js

node ../shared/pdf.js salida/bodega-para-ecommerce-san-bernardo bodega-para-ecommerce-san-bernardo.pdf
```

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

El cierre no muestra teléfono ni URL: el botón de WhatsApp es la única
acción, igual que en `../versus/`.
