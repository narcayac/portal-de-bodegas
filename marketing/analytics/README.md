# Analítica — Portal de Bodegas

Línea base de desempeño por canal, para que las decisiones de contenido
salgan de los números y no del criterio de quien escribe.

| Archivo | Qué es |
|---|---|
| `2026-11-18-instagram-90-dias.md` | Instagram, 20 ago – 18 nov 2026. Primer informe. |

## Cómo se arma

Instagram Insights, leído pieza por pieza. No sirve el gráfico "por tipo
de contenido" del panel: entrega porcentajes que no cuadran con la suma
de las piezas individuales. Los totales de los informes están calculados
desde el detalle de cada publicación, que sí cuadra.

La cuenta no llega a 100 seguidores, y bajo ese umbral Instagram no
entrega ubicaciones, rango etario, horarios de actividad ni crecimiento
neto de seguidores. No es una limitación de la vista ni algo que la API
resuelva: es de la plataforma. Hasta cruzar los 100 conviene anotar el
total de seguidores una vez por semana para tener la serie.

## Estado de la conexión por API

No hay conexión automática y por ahora no la va a haber. Crear una app en
el panel de desarrolladores de Meta exige un perfil de Facebook, y la
cuenta Meta del proyecto solo tiene perfil de Instagram. Esa decisión
está tomada: no se va a crear perfil de Facebook.

Las alternativas, si algún día se quiere automatizar: una herramienta de
terceros que ya tenga su app aprobada por Meta (el usuario autoriza con
credenciales de Instagram, sin tocar Facebook), o seguir a mano. Hoy es a
mano.

LinkedIn tiene su propio portón: las métricas de página de empresa viven
detrás de la Community Management API, que está bajo aprobación. La
exportación nativa de analítica de página sale en XLSX y se lee directo.

## Una corrección al primer informe

El informe del 18 de noviembre recomienda "agregar un cierre que pida
algo" y afirma que ninguna de las cinco mejores piezas pide nada. Eso es
falso: los tres generadores de carrusel terminan en una lámina de cierre
con botón de WhatsApp. Está verificado en `diagramas/build.js`
(`ctaSlide`), `informes/build.js` (`slideCta`) y los demás.

El problema real es otro y es más interesante. El 59,9% de las views
vienen de gente que no sigue la cuenta, llegada por Explorar, y a esa
persona la última lámina le pide que inicie una conversación de venta por
WhatsApp. Es un salto demasiado grande: no hay escalón intermedio. El
enlace de la bio recibió un clic en noventa días.

Lo que falta no es un cierre: es un cierre proporcional a la temperatura
de quien está mirando.
