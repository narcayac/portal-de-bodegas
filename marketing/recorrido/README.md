# Recorrido — carruseles por proyecto

Carrusel de 6 slides (1080×1350, formato 4:5) por cada proyecto de la red.
Se generan por código para que los cinco salgan idénticos en tipografía,
color y grilla.

| Nº | Proyecto | Estado |
|---|---|---|
| 01 | El Barrancón | publicado (hecho antes de este generador) |
| 02 | Bosque Catemito | publicado — `salida/bosque-catemito/` |
| 03 | Alto Las Acacias | publicado (hecho fuera de este generador) |
| 04 | Acacias Seis | publicado — `salida/acacias-seis/` |
| 05 | Inversiones Duramet | pendiente |

## Estructura del carrusel

1. **Portada** — foto aérea, nombre del proyecto, rango de m², badge "Desliza →"
2. **Atributo** — foto + titular + bajada
3. **Atributo** — foto + titular + bajada
4. **Atributo** — foto + titular + bajada
5. **Ficha** — fondo blanco, superficie, arriendo y 5 especificaciones
6. **Cierre** — CTA a WhatsApp

## Cómo generar

```bash
npm i playwright                # solo la primera vez
./fuentes.sh                    # genera fonts.css (no versionado)
node build.js                   # renderiza TODOS los proyectos definidos
node build.js acacias-seis      # renderiza solo uno, por id
```

Si Chromium está en otra ruta: `CHROME_PATH=/ruta/al/chrome node build.js`.

Para el siguiente proyecto se agrega un objeto nuevo en `build.js` (fotos,
titulares, ficha) siguiendo el patrón de `BOSQUE` / `ACACIAS_SEIS`, y se
suma a `ALL_PROJECTS`.

## Reglas al escribir los textos

- Los datos de m² salen de `lib/data.js`. No se inventan cifras.
- Precio público aprobado: **desde 0,13 UF/m²/mes**. El acopio al aire libre
  de Bosque Catemito: **desde 0,02 UF/m²/mes**. Ningún otro valor es público.
- Nunca prometer disponibilidad ni plazos de entrega.
- Sin emojis. El ícono de WhatsApp es SVG, no emoji.
- Español de Chile: "arriendo", nunca "renta".

## Fotos

Se toman de `public/photos/<proyecto>/`. Antes de elegir hay que mirarlas:
en Bosque Catemito, `foto-02` y `foto-06` traen la marca de agua
"ID 3547413" de un portal y quedaron fuera; `foto-07` tiene una franja
negra en el tercio inferior. Se usaron 04 (portada), 01, 05 y 03.

En Acacias Seis las 5 fotos estaban limpias (sin marcas de agua ni
defectos): se usaron todas — 01 (portada), 04, 02 y 03 (atributos).
