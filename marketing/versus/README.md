# Versus — comparativas en pantalla dividida

Formato corto (3 slides, no 6) para temas donde la gente confunde dos
opciones — "bodega industrial vs. self-storage", "galpón vs. bodega", etc.
Visualmente es otra familia: pantalla partida en dos colores planos
(`C.slate` / `C.navy`), sin foto ni degradado, para que no se vea igual
que `../guias/` o `../recorrido/`.

| Post | Estado |
|---|---|
| Bodega industrial vs. self-storage | publicado — `salida/bodega-vs-self-storage/` |

## Estructura

1. **Portada** — pantalla partida, la pregunta ("¿Cuál necesitas?") y un
   badge "VS" en el centro.
2. **Comparación** — filas lado a lado (hasta 4, para que entren
   cómodas), con el nombre del atributo en un pill centrado sobre la
   línea divisoria.
3. **Cierre** — CTA a WhatsApp, mismo estilo navy que el resto de las
   series.

## Cómo generar

```bash
npm i playwright                            # solo la primera vez
../shared/fuentes.sh                        # genera ../shared/fonts.css (no versionado)
node build.js                               # renderiza todos los posts definidos
node build.js bodega-vs-self-storage        # renderiza solo uno, por id

node ../shared/pdf.js salida/bodega-vs-self-storage bodega-vs-self-storage.pdf
```

El contenido de cada comparativa sale de la guía correspondiente en
`lib/guias.js` — condensado a 4 filas, no inventado. Mismas reglas de
copy que `../guias/README.md` (sin precio en el texto de redes, sin
emojis, sin prometer disponibilidad, español de Chile).
