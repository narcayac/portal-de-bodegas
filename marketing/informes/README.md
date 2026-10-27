# Informes — el informe de mercado mensual

Cuarta familia visual del sistema, junto a `../recorrido/`, `../guias/`
y `../diagramas/`. La diferencia no es de estilo: lo que se arma acá es
**un informe publicado**, no un post. Se repite todos los meses con el
mismo formato y cambia solo la data.

Eso se nota en tres cosas que las otras series no tienen:

- **Cabecera fija en todas las láminas**, con número de edición y mes.
  Si alguien comparte una lámina suelta, sigue leyéndose como parte de
  un informe y no como una imagen cualquiera.
- **Pie de fuente en cada lámina de datos.** En un informe la
  atribución no es letra chica legal, es parte de lo que se publica.
- **El desglose de fuentes va en el caption**, cifra por cifra, junto
  con la advertencia de por qué las consultoras no calzan entre sí.
  Primero se probó como lámina y se sacó: ocupaba una lámina entera de
  texto que nadie se detiene a leer en el feed, y en el caption se lee
  mejor y se puede copiar.

Nació porque el informe de octubre se armó primero en `../diagramas/` y
quedó bien como post, pero sin decir de dónde salía cada número ni
explicar términos que el informe usaba (clase A, clase B). Para un
contenido que se publica como autoridad de mercado, eso no alcanza.

| Edición | Informe | Estado |
|---|---|---|
| Nº 04 | Octubre 2026 — `mercado-bodegas-santiago-octubre-2026` | publicado |

Las ediciones Nº 01 a Nº 03 (agosto y septiembre) son anteriores a esta
serie: la de septiembre vive como carrusel en `../guias/salida/`.

## Estructura

Siete láminas:

1. **Portada** — cubierta de informe: navy, cabecera, titular, bajada,
   índice numerado y una banda de foto al pie. Sin titular sobre foto.
2. **01 a 05** — una lámina por sección, cada una con su gráfico y su
   pie de fuente.
7. **Cierre** — CTA a WhatsApp, sin teléfono ni URL.

## Reglas de los gráficos

- **A escala real, sin truncar ejes.** En el informe de octubre la barra
  de 3,59% queda diminuta al lado de la de 31,7% porque esa
  desproporción es el dato. Achicar el eje para que "se vea mejor" es
  mentir con el formato.
- **Las burbujas escalan por área, no por diámetro.** Escalar el
  diámetro exagera la diferencia al cuadrado.
- **Si dos cifras no miden lo mismo, la lámina lo dice.** La comparación
  de precio por m² entre bodega industrial y minibodega lleva bajo cada
  barra qué incluye ese valor: el industrial es precio pedido con
  gastos comunes aparte, el de minibodega suele venir con gastos
  comunes y seguridad incluidos. Sin esa línea la comparación no es
  honesta.
- **Los términos se explican antes de usarse, y la explicación tiene
  que responder la pregunta.** La lámina 03 empezó como una lista de
  los criterios que se evalúan (altura, andenes, incendios, patio) y no
  servía: decía qué se mide, pero no cuál clase era cuál. Quedó como
  comparación lado a lado, con el titular respondiendo de entrada —
  clase A es el estándar alto, clase B es todo lo demás— y una columna
  por clase para cada criterio.

## Tamaños de letra

Una imagen de 1080 px se ve en el celular a unos 400 px de ancho: todo
lo que acá mida menos de 28 px queda ilegible en la mano, aunque en el
monitor se vea bien. Los pisos de esta serie:

| Tipo de texto | Mínimo |
|---|---|
| Texto corrido, descripciones, remates | 28 px |
| Rótulos en mono (cabecera, sección, pie de fuente) | 24 px |
| Nombres de serie y etiquetas de gráfico | 30 px |
| Cifras destacadas | 42 px |

El mono lee un poco más grande por el espaciado, por eso admite 24. El
pie de fuente lleva `white-space:nowrap`: si el texto no cabe en una
línea se corta, y eso avisa en la revisión — una segunda línea se monta
sobre el logo del pie. La solución es acortar la atribución, no bajar
el cuerpo.

## Cómo generar

```bash
npm i playwright                   # solo la primera vez
../shared/fuentes.sh               # genera ../shared/fonts.css (no versionado)
node build.js                      # renderiza todos los informes
node build.js mercado-bodegas-santiago-octubre-2026   # solo uno, por id

node ../shared/pdf.js salida/<id> <id>.pdf            # PDF para LinkedIn
```

Si Chromium está en otra ruta: `CHROME_PATH=/ruta/al/chrome node build.js`.

## Para el informe del próximo mes

Se agrega una función `informe<Mes><Año>()` que devuelve
`{ id, name, slides }` y se suma a `INFORMES`. Lo que se reusa tal cual:
`masthead`, `seccion`, `pie`, `titular`, `bajada`, `remate`,
`filaNumerada`, `circulo` y `numberBadge`. Todos ya vienen calibrados a
los pisos de tamaño de arriba. Lo que cambia cada mes es el
número de edición, las secciones y los gráficos.

Antes de escribir nada: el contenido sale de la guía correspondiente en
`lib/guias.js`, que se publica primero. El informe en redes es un
resumen de esa guía, no una pieza independiente — así las cifras y las
fuentes viven en un solo lugar.

## Reglas al escribir los textos

- Ninguna cifra sin fuente visible en la lámina donde aparece, y el
  desglose completo en el caption.
- Si no se accedió al documento original, se dice. El informe de
  octubre se armó con la cobertura en prensa especializada de los
  reportes de NAI Sarrà, Colliers, Cushman & Wakefield y CBRE, y la
  lámina de metodología lo declara.
- Si un reporte del período no está publicado, se dice y no se
  extrapola.
- Sin precio propio en el copy de redes (la referencia pública aprobada
  de 0,13 UF/m²/mes es para el sitio y las guías). Los valores de
  mercado de terceros sí van, con su fuente.
- Nunca prometer disponibilidad ni plazos de entrega.
- Sin emojis. El ícono de WhatsApp es SVG, no emoji.
- Español de Chile: "arriendo", nunca "renta".
