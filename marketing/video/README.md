# Videos — Portal de Bodegas

Dos generadores, los dos verticales 1080×1920 a 24 fps para reel:

| Archivo | Qué produce |
|---|---|
| `build.js` | El mapa de San Bernardo con los 5 recintos marcados |
| `anatomia.js` | Recorrido sobre la aérea de dron señalando las zonas de un recinto |

Los dos usan la misma mecánica: el DOM se arma una sola vez y cada
cuadro solo actualiza estilos vía `window.render(t)`. Remontar el HTML
en cada cuadro significaría reparsear los 460 KB de fuentes cientos de
veces.

---

## anatomia.js — Anatomía de un recinto industrial

24 segundos sobre `public/photos/bosque-catemito/foto-04.webp`, la
única aérea de dron del banco. La cámara recorre la foto de derecha a
izquierda deteniéndose en tres zonas, con una mira que las señala.

| Tiempo | Zona |
|---|---|
| 0:00 – 0:04 | Plano general, título |
| 0:04 – 0:09 | Naves techadas |
| 0:09 – 0:14 | Patio de maniobras |
| 0:14 – 0:19 | Acopio a cielo abierto |
| 0:19 – 0:21 | Vuelta al plano general |
| 0:21 – 0:24 | Cierre con CTA |

**El reel abre en movimiento, no en foto fija.** La primera versión
empezaba en el plano general con una deriva de 1,2% de escala en cuatro
segundos: imperceptible, y en el feed se leía como una foto. Ahora parte
acercado sobre las naves (`APERTURA`, escala 1,55) y retrocede al plano
general con `easeOutQuad`, que es rápido en los primeros cuadros y se
asienta. Hay desplazamiento visible desde el cuadro uno y el recinto se
siente más grande al abrirse.

Las coordenadas de cada zona están en `ZONAS`, en píxeles de la foto
(2000×1125). Para medirlas conviene superponer una grilla:

```bash
ffmpeg -i ../../public/photos/bosque-catemito/foto-04.webp \
  -vf "drawgrid=w=200:h=125:t=2:c=red@0.8" /tmp/grilla.png
```

**Cada rótulo tiene que describir lo que de verdad se ve en ese punto.**
La primera versión rotulaba "patio de maniobras — el camión entra, gira
y carga" sobre una zona de la foto que está ocupada por maquinaria
estacionada. Era falso y se cambió: el patio quedó apuntando a la
explanada frente a los portones, donde efectivamente hay un camión
cargando, y la zona de maquinaria pasó a llamarse acopio, que es lo que
es. Si se mueve una zona, hay que volver a mirar el cuadro.

Queda pendiente confirmar si el terreno despejado del primer plano es
parte del recinto. Si lo es, da para una cuarta zona —terreno para
construir a medida, que en Bosque Catemito llega a 30.000 m²— y hoy no
se rotula porque no está confirmado.

---

# build.js — mapa de San Bernardo

Video vertical de 27 segundos (1080×1920, 9:16, 24 fps) para reel: el
mapa de San Bernardo con los 5 recintos marcados, un acercamiento a
cada uno, y cierre con la aérea de dron.

A diferencia de `../shared/video.js`, que hace Ken Burns sobre PNG ya
renderizados, acá la animación se calcula: se arma el DOM una sola vez
y cada cuadro solo actualiza estilos vía `window.render(t)`. Eso es lo
que hace viable renderizar 658 cuadros en un par de minutos — volver a
montar el HTML en cada cuadro significaría reparsear los 460 KB de
fuentes otras tantas veces.

| Tiempo | Escena |
|---|---|
| 0:00 – 0:06 | Plano general; los 5 pines van cayendo |
| 0:06 – 0:19 | Un acercamiento por recinto, de norte a sur, con nombre y m² |
| 0:19 – 0:21 | Se abre de vuelta al plano general |
| 0:21 – 0:25 | La aérea real de Bosque Catemito, con zoom lento |
| 0:25 – 0:27 | Cierre con logo y CTA a WhatsApp |

Los metrajes salen de `PROJECTS` en `lib/data.js`, no están escritos a
mano. El orden de los recintos es geográfico, de norte a sur.

## El mapa base y las coordenadas

`mapa-base.webp` es una captura de Google Maps centrada en
−33.5887, −70.7341 a zoom 12, recortada: se le sacó el chrome del
navegador (205 px arriba) y la franja de controles de Maps (120 px
más), porque el buscador y los chips de categorías salían en cuadro.
Queda en 2000×925.

Las posiciones de los pines, en píxeles de esa imagen, se derivaron
proyectando en Web Mercator las coordenadas de cada proyecto:

| Proyecto | Coordenadas | Pin (px) |
|---|---|---|
| Acacias Seis | −33.553577, −70.731995 | 1012, 157 |
| Alto Las Acacias | −33.561821, −70.731111 | 1017, 215 |
| Bosque Catemito | −33.607463, −70.756717 | 868, 534 |
| Inversiones Duramet | −33.617688, −70.711464 | 1132, 605 |
| El Barrancón | −33.623838, −70.731585 | 1015, 648 |

Cuatro de las cinco salieron del parámetro `@lat,lng,zoom` de las URL
de Google Maps de cada proyecto, corrigiendo por la posición del pin
en pantalla y por el factor 2 de las capturas retina. Alto Las Acacias
no tenía URL: se georreferenció comparando dos puntos presentes en esa
captura y en el mapa base (el Relleno Sanitario Santiago Poniente y
Cerros de Chena), que dieron el mismo resultado con cero píxeles de
discrepancia.

Si cambia el mapa base hay que recalcular los píxeles — las
coordenadas en grados son lo estable.

## Atribución

El crédito "Mapa © Google" va fijo abajo mientras se ve el mapa, y la
atribución propia de Google Maps queda visible dentro del recorte en
los planos generales. Es requisito de los términos de Google y no hay
que sacarlo.

## Lo que falta para que se vean los techos

Los acercamientos son suaves a propósito: el mapa base es de zoom 12 y
más allá de 1,9× se pixela. Para los primeros planos donde de verdad
se distingan los galpones harían falta 5 capturas en satélite a zoom
~17, una por recinto. Con eso los tramos de acercamiento se
reemplazarían por imagen nítida sin tocar la estructura del video.

Antes se intentó resolverlo por API: **Google Earth Studio** es la
herramienta correcta y es gratis, pero es una interfaz de navegador
que no se puede automatizar desde acá; **Mapbox** sí era automatizable
pero necesita una API key que no está disponible.

## Sin audio

El video sale mudo a propósito: no hay música licenciada acá, y la
mayoría ve los reels sin sonido. Instagram permite agregar música desde
la app al publicar, que además favorece el alcance. No se sintetiza voz.

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

Las duraciones están en las constantes `T_INTRO`, `T_FICHA`, `T_VUELTA`,
`T_AEREA` y `T_CIERRE`, en segundos; las ventanas de `T` se calculan a
partir de ellas y se solapan para que las transiciones no corten en
seco. `ESC_GRAL` es el encuadre del plano general —tiene que ser al
menos `VH / MAPA_H` para que el mapa cubra la ventana— y `ESC_ZOOM` el
de los acercamientos.
