# Duramet — digital

Trabajo digital de **Empresas Duramet** (grupo de 1964, San Bernardo:
estructuras metálicas e inversiones inmobiliarias y bodegaje).
Cliente distinto de Portal de Bodegas; nada acá depende de ese proyecto.

## Qué hay

| Documento | Para qué |
|---|---|
| [`plan-traspaso-y-operacion.md`](plan-traspaso-y-operacion.md) | El documento principal. Diagnóstico del sitio con evidencia, para qué sirve duramet.cl, qué se puede editar desde cPanel y qué no, cómo se reemplazan páginas, la Fase 0 de traspaso y el régimen semanal de 4 horas |
| [`reunion-de-traspaso.md`](reunion-de-traspaso.md) | Pauta de la reunión para recibir los accesos, ficha para llenar en vivo y correo de convocatoria |

## Lo esencial, en diez líneas

- **Sitio:** `www.duramet.cl`, que redirige a `/bodegas/`. Hecho con
  RapidWeaver + Stacks (app de escritorio Mac), construido por
  `vdiseno.cl`. 14 páginas.
- **Hosting:** cPanel 138.0.19, en `duramet.cl:2083`. Acceso disponible.
- **Medición:** no hay. Ni GA4, ni GTM, ni etiqueta de Ads, ni pixel.
  Es el hallazgo que ordena las prioridades.
- **Contacto:** formulario PHP con destino por confirmar,
  `contacto@duramet.cl`, tres teléfonos, sin WhatsApp.
- **Redes:** Facebook, X, LinkedIn y YouTube enlazadas desde el sitio.
  Sin Instagram. Actividad sin evaluar.
- **Decisión pendiente del directorio:** si duramet.cl es el sitio del
  grupo —con estructuras metálicas incluidas— o solo el de arriendo.

## Cómo se trabaja el sitio

El sitio se queda en cPanel, por gobernanza: si mañana esto lo toma otra
persona, tiene que recibir un sitio que viva entero en el hosting de
Duramet y no uno que dependa de cuentas personales.

Las páginas nuevas se escriben en **HTML estático autocontenido**, sin
framework ni paso de compilación. Se revisan acá con capturas antes de
que existan en el servidor, y **publicar lo hace siempre una persona de
Duramet**, subiendo por el administrador de archivos.

Dos reglas que no se saltan:

1. **Respaldo antes de tocar nada.** No hay forma de deshacer en cPanel.
2. **Página nueva en ruta nueva, con 301 desde la vieja.** RapidWeaver no
   borra los archivos que no conoce ni administra el `.htaccess`, así que
   así el trabajo sobrevive a una republicación. Reemplazar un archivo
   existente, no.

## Ritmo

Cuatro horas por semana, en dos bloques de dos horas en días distintos:
revisión y consolas uno, producción y gobernanza el otro. El detalle, la
rotación mensual y las reglas que hacen que cuatro horas alcancen están
en el plan.
