# Portal de Bodegas — sistema de diseño

Valores reales extraídos de `lib/data.js`, `app/layout.jsx`, `app/globals.css`
y `marketing/shared/brand.js`. Si algo cambia allá, este documento queda
desactualizado: esas son las fuentes de verdad.

---

## 1. Color

| Token | Hex | Para qué |
|---|---|---|
| `navy` | `#011943` | Color institucional. Fondo de todas las piezas y color de texto sobre blanco |
| `navyMid` | `#0d2444` | Punto claro del degradado radial en fondos planos |
| `blue` | `#0685de` | Acento. Reglas, botones, la palabra "de" del logotipo, detalle del isotipo |
| `blueDark` | `#035caa` | Estado hover del acento |
| `blueLight` | `#89c7f6` | Rótulos sobre fondo oscuro: antetítulos, etiquetas, íconos |
| `slate` | `#6c7b92` | Texto secundario sobre blanco |
| `slateLight` | `#adb2c0` | Texto terciario, deshabilitado |
| `border` | `#e2e8f0` | Bordes y separadores sobre blanco |
| `bgAlt` | `#f8f9fb` | Fondo de secciones alternadas |
| `wa` | `#25D366` | Verde WhatsApp. **Solo** para el botón de WhatsApp |
| `waDark` | `#1da851` | Hover del botón de WhatsApp |

Sobre fondo oscuro el texto no va en blanco puro salvo los titulares:
el cuerpo va en `rgba(255,255,255,.88)`, las notas al pie en `.58`, y los
separadores en `rgba(255,255,255,.15)`.

---

## 2. Tipografía

Cuatro familias, todas de Google Fonts. Cada una tiene un trabajo y no se
mezclan los roles.

| Familia | Rol | Pesos |
|---|---|---|
| **Fraunces** | Titulares. Es la voz de la marca | 400, 500, 600, 700 |
| **Inter** | Cuerpo de texto y bajadas | 300, 400, 500, 600 |
| **IBM Plex Mono** | Rótulos, antetítulos, direcciones, contadores, cifras de ficha | 400, 500, 600 |
| **Plus Jakarta Sans** | Solo el logotipo y el botón de WhatsApp | 700, 800 |

En el sitio se cargan con `next/font/google` y quedan como variables CSS:
`--font-fraunces`, `--font-inter`, `--font-mono`, `--font-jakarta`.

En las piezas de marketing se incrustan en base64 dentro de `fonts.css`
(generado por `marketing/shared/fuentes.sh`), porque Chromium al renderizar
con `setContent` no resuelve peticiones externas a Google Fonts.

### Ajustes ópticos

- Fraunces siempre con `letter-spacing` negativo: `-.015em` en titulares
  grandes, `-.01em` en los medianos. Sin eso se ve suelta.
- Fraunces en titular: `line-height` entre 1.02 y 1.12. Cuanto más grande el
  cuerpo, más cerrada la interlínea.
- Inter de cuerpo en peso **300**, no 400. En 400 compite con el titular.
- IBM Plex Mono siempre en mayúsculas y con `letter-spacing` amplio:
  `.12em` a `.26em` según el tamaño.

---

## 3. Escala tipográfica

Hay tres contextos y cada uno tiene su escala. No se mezclan.

### Sitio web — tipografía fluida

Los titulares usan `clamp()` para escalar con el viewport:

```
Titular de portada     clamp(38px, 4.6vw, 60px)
Titular de sección     clamp(32px, 4.4vw, 52px)
Titular de tarjeta     clamp(28px, 4vw, 44px)
Subtítulo              clamp(20px, 2.6vw, 26px)
```

Contenedor: `max-width: 1280px`, centrado, con `padding: 0 var(--gutter)`.
El canalón es **40 px** en escritorio y **20 px** bajo 768 px de ancho.

### Pieza social — lienzo de 1080 × 1350

| Elemento | Valor |
|---|---|
| Antetítulo (mono) | 21 px, `.24em`, mayúsculas, `blueLight` |
| Regla de acento | 78 × 3 px, `blue`, márgenes 26 px / 34 px |
| Titular (Fraunces 600) | tamaño por pieza, `line-height` 1.02 |
| Subtitular (Fraunces 600) | 66 px, `line-height` 1.12 |
| Bajada (Inter 300) | 31 px, `line-height` 1.45, ancho máximo 820 px |
| Logotipo | 34 px |
| Contador | 22 px mono, `.14em` |
| Márgenes | 72 px por lado |

### Documento apaisado — lienzo de 1920 × 1080

| Elemento | Valor |
|---|---|
| Antetítulo (mono) | 22 px, `.26em` |
| Regla de acento | 92 × 4 px, márgenes 28 px / 36 px |
| Titular de portada | 104 px |
| Titular de lámina | 62 – 82 px |
| Subtitular | 50 px |
| Bajada (Inter 300) | 34 px |
| Nota al pie | 22 px, `rgba(255,255,255,.58)` |
| Márgenes | 104 px por lado, pie a 60 px del borde |

---

## 4. Logotipo

Isotipo y logotipo van juntos, separados por 20 px.

El isotipo es un círculo con la silueta de una nave industrial y un portón
sólido en azul:

```html
<svg width="56" height="56" viewBox="0 0 100 100">
  <circle cx="50" cy="50" r="48" fill="#011943"/>
  <path d="M27 52 50 30 73 52 73 75 27 75Z" fill="none"
        stroke="#f3f4f5" stroke-width="5" stroke-linejoin="round"/>
  <rect x="42" y="58" width="16" height="17" fill="#0685de"/>
</svg>
```

Sobre fondo oscuro el círculo va sin relleno y con borde blanco de 4, y la
silueta en blanco. El portón se mantiene azul en las dos versiones.

El logotipo es texto, no imagen: Plus Jakarta Sans 800, 34 px,
`letter-spacing -.01em`, en minúsculas, con **"de" en azul**:

> portal <span>de</span> bodegas

Sobre fondo claro el texto va en `navy`; sobre oscuro, en blanco. El "de"
siempre azul.

---

## 5. Elementos recurrentes

**Antetítulo + regla.** Todo bloque de contenido abre igual: una línea en
mono y mayúsculas en `blueLight`, y debajo una regla azul corta. Es el gesto
que hace reconocible al sistema.

**Degradado sobre foto.** El texto nunca va directo sobre la imagen. Se
interpone un degradado desde `navy` opaco abajo hasta transparente arriba.
**Nunca se usa `text-shadow`** — ver reglas duras.

**Insignia.** Rectángulo `navy` al 85% de opacidad, arriba a la derecha, con
texto en mono. Para numerar ediciones o marcar destinatario.

**Pie de marca.** Isotipo + logotipo a la izquierda, contador en mono a la
derecha, alineados a los márgenes de la pieza.

**Botón de WhatsApp.** Fondo `wa`, ícono blanco de 46 px, texto en Jakarta
800 de 40 px, relleno de 28 px por 46 px. Rectángulo recto, sin esquinas
redondeadas.

**Íconos.** Lienzo de 48 × 48, trazo de 2.5 a 3.2 según el tamaño final,
relleno sólido solo donde hace falta peso visual. Blancos cuando van sobre
un círculo de color; en `blueLight` cuando se apoyan directo sobre el fondo.
Bajo 48 px de tamaño final hay que quitarles elementos o se vuelven manchas.

---

## 6. Reglas duras

Estas salieron de errores que costó rehacer. No son preferencias.

1. **Piso de legibilidad móvil.** Una imagen de 1080 px se ve en el teléfono
   a unos 400 px: todo lo que mida menos de **28 px** de cuerpo —o **24 px**
   en monoespaciada— queda ilegible en la mano aunque en el monitor se vea
   bien. Cifras destacadas, mínimo 42 px.

2. **Nunca `text-shadow` en piezas que se imprimen a PDF.** Chromium
   rasteriza el desenfoque como un rectángulo opaco: el texto sale con una
   caja detrás y los titulares se ven dobles. La legibilidad sobre foto se
   resuelve solo con degradados.

3. **Ninguna cifra sin su fuente visible** en la lámina donde aparece, y el
   desglose completo en el caption.

4. **El pie de fuente lleva `white-space:nowrap`.** Si no cabe en una línea
   se corta, y eso avisa en la revisión. La solución es acortar la
   atribución, nunca bajar el cuerpo.

5. **Revisar los PDF a 72 dpi o más.** A 50 dpi los artefactos de impresión
   no se distinguen.

6. **La foto tiene que decir lo que dice el rótulo.** Se rotuló un patio de
   maniobras sobre una zona llena de maquinaria estacionada, y una lámina de
   terreno de acopio con la foto de una nave. Las dos veces hubo que rehacer.

---

## 7. Dónde vive cada cosa

| Qué | Dónde |
|---|---|
| Tokens de color, tipografía y contenedor del sitio | `lib/data.js` |
| Carga de fuentes y variables CSS | `app/layout.jsx` |
| Resets, canalón y comportamiento responsive | `app/globals.css` |
| Tokens, logotipo, botón y envoltorio de las piezas sociales | `marketing/shared/brand.js` |
| Generación de `fonts.css` en base64 | `marketing/shared/fuentes.sh` |
| Escala del documento apaisado e íconos | `marketing/catalogo/build.js` |
| Pisos de tamaño documentados | `marketing/informes/README.md` |
