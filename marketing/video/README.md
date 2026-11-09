# Video — sobrevuelo de San Bernardo

Video vertical de 28 segundos (1080×1920, 9:16, 24 fps) para reel.

A diferencia de `../shared/video.js`, que hace Ken Burns sobre PNG ya
renderizados, acá la animación se calcula: se arma el DOM una sola vez
y cada cuadro solo actualiza estilos vía `window.render(t)`. Eso es lo
que hace viable renderizar cientos de cuadros en un par de minutos —
volver a montar el HTML en cada cuadro significaría reparsear los
460 KB de fuentes 672 veces.

## Qué muestra

| Tiempo | Escena |
|---|---|
| 0:00 – 0:03 | San Bernardo, Región Metropolitana |
| 0:03 – 0:10 | Las cuatro salidas troncales, dibujándose una a una |
| 0:10 – 0:19 | Los 5 proyectos con su rango de m² |
| 0:19 – 0:24 | La aérea real de Bosque Catemito con zoom lento |
| 0:24 – 0:28 | Cierre con logo y CTA a WhatsApp |

Los metrajes salen de `PROJECTS` en `lib/data.js`, no están escritos a
mano: si cambia un rango en el sitio, cambia en el video.

## Por qué no es Google Earth

La idea original era un sobrevuelo satelital tipo Google Earth. Dos
caminos quedaron descartados:

- **Google Earth Studio** es la herramienta correcta y es gratis, pero
  es una interfaz de navegador con cuenta de Google: no se puede
  automatizar desde acá. Sigue siendo la mejor opción si alguien la
  opera a mano.
- **Mapbox** (imágenes satelitales por API, uso comercial permitido con
  atribución) sí era automatizable, pero requiere una API key que no
  está disponible.

Lo que hay en su lugar es un esquema de marca —el mismo hub-and-spokes
del post del polo logístico— más la única aérea real del banco de
fotos. Comunica dónde están los proyectos; no reemplaza ver los techos
desde arriba. **Lo que de verdad cerraría esta brecha es video de dron
propio**: hoy existe una sola foto aérea y es la toma más fuerte de
todo el material.

## Sin audio

El video sale mudo a propósito: no hay música licenciada disponible
acá, y la mayoría de la gente ve los reels sin sonido. Instagram
permite agregar música desde la app al publicar, que además favorece el
alcance. No se sintetiza voz.

## Cómo generar

```bash
npm i playwright                   # solo la primera vez
../shared/fuentes.sh               # genera ../shared/fonts.css (no versionado)
node build.js                      # ~2,5 minutos
```

Los cuadros intermedios se escriben en `salida/frames/` y se borran al
terminar; solo queda el `.mp4`.

Chromium se busca solo (`chromePath()` en `../shared/brand.js`), porque
la ruta cambia cada vez que se reconstruye el contenedor. `CHROME_PATH`
manda si está definida.

## Para cambiar el guion

Las ventanas de tiempo están en la constante `T` al principio del
archivo, en segundos, y se solapan medio segundo para que las
transiciones no corten en seco. Cambiar una duración es mover un par de
números; `DUR` se calcula del final de la última escena.

Si se quiere otro formato, `W` y `H` están arriba — pero las posiciones
son absolutas y habría que reacomodarlas, no basta con cambiar el
lienzo.
