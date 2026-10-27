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
- **Lámina de fuentes y metodología**, cifra por cifra, más la
  advertencia de por qué las consultoras no calzan entre sí.

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

1. **Portada** — cubierta de informe: navy, cabecera, titular, bajada,
   índice numerado y una banda de foto al pie. Sin titular sobre foto.
2. **01 a 05** — una lámina por sección, cada una con su gráfico y su
   pie de fuente.
3. **Fuentes y metodología** — qué aporta cada consultora y qué
   advertencias hay que hacer antes de comparar.
4. **Cierre** — CTA a WhatsApp, sin teléfono ni URL.

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
- **Los términos se explican antes de usarse.** La lámina 03 define
  clase A y clase B, que es una convención de mercado y no una norma
  oficial.

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
`filaNumerada`, `circulo` y `numberBadge`. Lo que cambia cada mes es el
número de edición, las secciones y los gráficos.

Antes de escribir nada: el contenido sale de la guía correspondiente en
`lib/guias.js`, que se publica primero. El informe en redes es un
resumen de esa guía, no una pieza independiente — así las cifras y las
fuentes viven en un solo lugar.

## Reglas al escribir los textos

- Ninguna cifra sin fuente visible en la lámina donde aparece.
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
