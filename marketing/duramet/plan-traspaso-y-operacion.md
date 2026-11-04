# Duramet — plan de traspaso y operación digital

> Documento de trabajo de Nati Arcaya. Noviembre 2026.
> Cubre tres cosas: qué hay, cómo se toma el control de manos del
> proveedor que lo administraba, y cómo se sostiene después en **4 horas
> semanales**.

El encargo tiene dos mitades que conviene no mezclar. La primera es un
**traspaso**: una vez, con fecha de término, y pesa más de 4 horas. La
segunda es un **régimen**: para siempre, 4 horas por semana, y solo
funciona si el traspaso quedó bien hecho. Si se intenta hacer el
traspaso dentro de las 4 horas semanales, va a tomar cuatro meses y el
sitio va a seguir con texto de relleno en la portada todo ese tiempo.

Por eso el plan va en ese orden: Fase 0 (traspaso, ~8 h en dos semanas),
y recién después el régimen semanal.

---

## 1. Diagnóstico del sitio — hecho el 4 de noviembre de 2026

Revisé `www.duramet.cl` desde fuera, sin credenciales: las 14 páginas
públicas, las cabeceras del servidor, el sitemap, el robots y el código
fuente. Esto es lo que hay.

### Lo que está bien

La velocidad no es el problema: la portada responde en 0,57 s y pesa
66 KB de HTML. El sitio está en HTTPS, es responsive, tiene `viewport`
declarado y la estructura de contenido es razonablemente completa para
una empresa industrial: historia, clientes, testimonios, galería,
compromiso de seguridad, preguntas frecuentes. El contenido existe. El
problema es el estado en que está.

### Hallazgos, por gravedad

**Crítico — el sitio no tiene medición de ningún tipo.**
No hay Google Analytics, ni GA4, ni Google Tag Manager, ni etiqueta de
conversión de Google Ads, ni pixel de Meta. En ninguna de las 14
páginas. Esto significa que, si hay campañas de Google Ads activas, están
corriendo sin que nadie pueda saber qué búsqueda trajo qué contacto, ni
cuánto cuesta un lead, ni si la campaña sirve. La plata se está gastando
a ciegas. Hasta que esto se arregle, cualquier conversación sobre
rendimiento de Ads es una conversación sin datos.

**Crítico — el sitio no se edita desde un navegador, pero el servidor sí.**
Está hecho con **RapidWeaver + Stacks 4**, una aplicación de escritorio
para Mac, no un CMS web. Conté unos 25 complementos de pago distintos
en el código (Gator, Skyward, Eternity, Clean Menu, FreeStack R,
Rotator, superForms y otros). Para cambiar una coma *en el constructor*
hacen falta cuatro cosas a la vez: el archivo de proyecto, un Mac con
RapidWeaver instalado, las licencias de todos esos complementos, y el
acceso al hosting. El pie del sitio enlaza a `vdiseno.cl`, lo que sugiere
que todo eso vive en el estudio que lo construyó.

Lo que cambia el panorama es que **el hosting es cPanel 138.0.19 y el
acceso ya está en nuestras manos** (`duramet.cl:2083`). Eso abre una vía
paralela que no depende del estudio ni de la reunión de traspaso: desde el administrador de archivos se puede subir la etiqueta
de medición, arreglar `robots.txt` y los sitemaps, leer a qué correo
entrega el formulario y bajar un respaldo completo. Los arreglos
urgentes se pueden hacer esta semana sin esperar el archivo de proyecto.

Con una trampa que hay que anotar desde el primer día: **todo cambio
hecho a mano en cPanel se borra sin aviso la próxima vez que alguien
republique desde RapidWeaver.** El constructor sube el sitio completo y
pisa lo que haya. Mientras el estudio pueda publicar, cualquier arreglo
manual es provisorio, y la forma en que se descubre es desagradable: la
medición deja de registrar y nadie se da cuenta hasta el reporte del mes.
De ahí salen dos obligaciones: llevar una lista de los cambios manuales
para reaplicarlos, y cerrar pronto si `vdiseno.cl` sigue vigente.

Para la medición hay además una vía que sobrevive a las
republicaciones. Como las páginas son `.php`, la etiqueta se puede
inyectar del lado del servidor (`auto_prepend_file` o `auto_append_file`,
desde `.htaccess` o el editor de INI de PHP de cPanel) en vez de
escribirla en cada archivo. Hay que probarlo, pero si funciona, la
medición deja de depender de quién publique.

Lo que sigue bloqueado sin el archivo de proyecto es lo estructural:
cambiar el diseño, agregar páginas, reordenar el menú. Editar HTML
compilado a mano para eso es la forma más rápida de romper el sitio.

**Alto — hay texto de relleno publicado en la portada.**
La portada muestra cuatro veces, visible para cualquiera,
`Insertar video de Youtube`. Es el texto de ejemplo del complemento, que
nunca se reemplazó. Debajo hay una fila de marcadores `…` sin contenido.
Es lo primero que ve un arrendatario que llega desde Google.

**Alto — el inventario publicado está desactualizado.**
La portada lista una bodega de 900 m² con la leyenda
`ARRENDADA NO DISPONIBLE`. Publicar lo que no está disponible le resta
credibilidad a lo que sí lo está, y obliga al visitante a filtrar.

**Alto — el formulario es una caja negra, pero con cPanel se abre en
dos minutos.**
Es un `superForms` de RapidWeaver procesado en PHP en el propio
servidor, con captcha. El destinatario no aparece en el HTML público
—ahí solo está el enlace `mailto:contacto@duramet.cl`— porque va en la
parte PHP que el visitante no ve. Con cPanel se resuelve de inmediato:
abrir `contacto.php` en el administrador de archivos y leer el
destinatario, y después revisar en Cuentas de Correo y en
Redireccionamientos dónde cae `contacto@duramet.cl` en la práctica.
Hacerlo antes que cualquier otra cosa: si entrega a una casilla que ya
no existe, esa es la explicación más simple y más barata de por qué no
llegan arrendatarios.

**Medio — 14 páginas comparten 2 títulos y 2 descripciones.**
`contacto.php`, `galeria-de-fotos.php`, `clientes.php` y
`arrienda-hoy-tu-bodega.php` se titulan todas, en Google,
*"Duramet S.A. creada en 1964 como Estructuras Metálicas"*. La página
donde alguien pide una bodega no dice que es la página de contacto. Es
el arreglo de SEO con mejor relación esfuerzo/resultado del sitio.

**Medio — detalles técnicos que suman.**
`<html lang="en">` en un sitio escrito en español. Cuatro `<h1>` en la
portada cuando corresponde uno. Sin etiqueta canónica. Sin Open Graph,
así que al compartir el sitio por WhatsApp o LinkedIn no hay control de
la imagen ni del título que aparece. `robots.txt` responde 404.

**Medio — los sitemaps están mal.**
El de la raíz declara una sola URL (`duramet.cl/index.php`). El de
`/bodegas/` declara 12, de las cuales dos son `NoLink.php` (una página
basura del constructor), usa el dominio sin `www` cuando el sitio sirve
con `www`, y omite contacto, dónde ubicarnos, preguntas frecuentes y
links de interés.

**Medio — el sitio corporativo vive en una subcarpeta.**
La raíz `duramet.cl` redirige con 301 a `duramet.cl/bodegas/`. Funciona,
pero deja a toda la empresa colgando de una carpeta llamada "bodegas",
lo que complica cualquier crecimiento futuro (estructuras metálicas,
inmobiliaria) y reparte la autoridad del dominio de forma rara.

**Bajo — copy desactualizado.**
El sitio dice "Grupo de Empresas con 50 años de experiencia". La propia
página de historia dice que Duramet S.A. se creó en 1964: son 62. El
texto quedó escrito hace más de una década y nadie lo movió.

**Bajo — el canal de contacto no está donde está la gente.**
Hay tres teléfonos (+562 2857 1408, +562 2857 1547, +569 5392 6816) y
`contacto@duramet.cl`, pero ningún enlace de WhatsApp: solo el número
escrito. En Portal de Bodegas, WhatsApp es la vía de conversión
principal y medida. Acá no existe.

### Redes enlazadas desde el sitio

Facebook (`/duramet`), Twitter/X (`@duramet`), LinkedIn
(`company/duramet`) y un canal de YouTube (`UCL9-NtCt0L4V_p76qj-Nz-g`).
**No hay Instagram.** No pude evaluar actividad, seguidores ni última
publicación de ninguna de las cuatro: eso requiere entrar a las cuentas,
y es parte de la Fase 0.

### Lo que no se puede ver sin acceso

Esto no es que esté bien o mal: es que todavía no se sabe. Es la lista
de preguntas que la Fase 0 tiene que cerrar.

| Activo | Qué hay que averiguar |
|---|---|
| Google Ads | Si existe cuenta activa, qué ID, qué se gasta al mes, qué campañas, quién la administra, con qué tarjeta se paga |
| Google Analytics | Si alguna vez existió una propiedad (hoy no está instalada) |
| Search Console | Si el dominio está verificado y por quién |
| Google Business Profile | Si existe ficha, si está verificada, quién es el propietario principal |
| Facebook / X / LinkedIn / YouTube | Quiénes son administradores, si hay Business Manager, última actividad |
| Dominio `duramet.cl` | Titular en NIC Chile, correo de contacto, fecha de vencimiento, quién paga |
| Hosting | Confirmado que es cPanel. Falta el proveedor, el plan, el usuario, si el DNS se administra ahí o en NIC Chile, y quién paga |
| Proyecto RapidWeaver | Si existe el archivo y las licencias, y en qué computador |
| Formulario | A qué correo entrega y si ese correo sigue vivo |

### Lo que se puede hacer ya, sin esperar la reunión

Con la sesión de cPanel abierta, estas cinco cosas no dependen de nadie
más. Conviene hacerlas en este orden.

| # | Qué | Dónde en cPanel |
|---|---|---|
| 1 | **Respaldo completo antes de tocar nada.** Es la red de seguridad de todo lo demás | Archivos → Asistente de copias de seguridad → Copia de seguridad completa |
| 2 | **Averiguar a qué correo entrega el formulario.** Abrir el archivo y leer el destinatario en la parte PHP | Archivos → Administrador de archivos → `public_html/bodegas/contacto.php` → Editar |
| 3 | **Confirmar que ese correo existe y lo lee alguien.** Si es una cuenta local, ver si tiene redirección a una casilla real | Correo → Cuentas de Correo, y Correo → Redireccionamientos |
| 4 | **Mirar el tráfico histórico.** Aunque no haya analítica instalada, el servidor guarda los registros: da una idea de visitas, páginas más vistas y de dónde llegan | Métricas → Visitantes, AWStats o Webalizer |
| 5 | **Instalar la medición** (GA4 y etiqueta de Ads), y arreglar `robots.txt` y los sitemaps | Archivos → Administrador de archivos |

El punto 4 es el más subestimado: hoy no hay ninguna fuente de datos
sobre el sitio, y los registros del servidor son la única que existe
hacia atrás. No reemplazan a GA4 —cuentan robots como visitas y no
distinguen campañas— pero sirven para saber si el sitio recibe 50 o
5.000 visitas al mes antes de decidir cuánto invertir en él.

Y el punto 1 no es formalidad: el sitio está compilado por un
constructor, no hay repositorio, y un archivo mal guardado desde el
administrador de archivos no tiene cómo deshacerse.

---

## 2. La decisión que hay que poner sobre la mesa temprano

Duramet arrienda bodegas en San Bernardo. Portal de Bodegas arrienda
bodegas en San Bernardo, e **Inversiones Duramet es uno de sus cinco
proyectos**. Son dos sitios, del mismo grupo, compitiendo por las mismas
búsquedas, con el mismo inventario detrás.

Eso tiene tres costos concretos: las dos propiedades se canibalizan en
los resultados orgánicos, si ambas pautan en Google Ads suben el precio
de sus propios clics, y un arrendatario que encuentra las dos no entiende
si son la misma empresa o competidores.

No es una decisión técnica y no es mía: es del directorio. Pero hay que
plantearla antes de invertir horas en arreglar el SEO de duramet.cl,
porque la respuesta cambia qué se arregla. Las tres salidas razonables:

1. **Duramet queda como sitio corporativo y Portal de Bodegas se queda
   con el arriendo.** duramet.cl habla de la empresa, su historia, sus
   50 años, estructuras metálicas e inmobiliaria, y manda todo el
   arriendo al portal. Es la opción más limpia y la más barata de
   sostener: un solo sitio que pelea por búsquedas comerciales.
2. **Los dos siguen compitiendo**, cada uno con su inventario y su
   pauta. Es el estado actual. Cuesta el doble y rinde menos.
3. **Se fusionan** en el portal, con redirecciones 301 desde duramet.cl.
   Es lo mejor para SEO y lo peor políticamente: el directorio pierde el
   sitio de la empresa con 62 años.

**Mi recomendación es la 1.** Resuelve la canibalización sin borrar la
marca histórica, y reduce el trabajo semanal a un solo sitio que
convierte.

### Y la decisión gemela: rescatar o rehacer el sitio

Una vez que se sepa si existe el archivo de RapidWeaver:

- **Si existe**, se puede rescatar, y las correcciones de arriba se
  hacen en el constructor. Pero queda la dependencia: un Mac, licencias
  de pago que vencen y un flujo que nadie más en la empresa puede
  operar.
- **Si no existe**, no hay rescate posible y hay que rehacerlo.

En los dos casos vale la pena evaluar rehacerlo en el mismo stack que
`portaldebodegas.cl` (Next.js en Vercel). El argumento no es de moda
técnica: es que ya lo operas, que el deploy es automático al hacer merge,
que no hay licencias ni FTP, y que de una sola vez resuelve medición,
títulos, canónicas, Open Graph y WhatsApp, que son casi todos los
hallazgos de este informe. El costo hay que presupuestarlo aparte y
aprobarlo; no entra en las 4 horas semanales.

---

## 3. Fase 0 — Traspaso (dos semanas, ~8 horas, por única vez)

La regla que ordena todo el traspaso: **el titular de cada activo tiene
que ser Duramet, no una persona.** Si el acceso queda en la cuenta
personal de alguien —aunque sea la tuya— el problema que estamos
resolviendo hoy se repite el día que esa persona se vaya.

En concreto: crear (o rescatar) una cuenta de Google corporativa del
tipo `marketing@duramet.cl`, con verificación en dos pasos y la clave
de recuperación en manos del directorio. Esa cuenta es la dueña. Las
personas, incluida tú, entran como administradores invitados.

### Semana del 4 al 7 de noviembre — inventario y accesos (~4 h)

| # | Tarea | Resultado |
|---|---|---|
| 1 | Reunión de traspaso con quien administraba (1 h). Ir con la tabla de "lo que no se puede ver" de arriba, impresa, y no salir sin respuestas | Tabla completa |
| 2 | Pedir por escrito: archivo de proyecto RapidWeaver, licencias de Stacks, credenciales FTP, acceso al panel de hosting | Correo enviado, con fecha de respuesta |
| 3 | Verificar titularidad del dominio en NIC Chile y la fecha de vencimiento | Captura y fecha anotada |
| 4 | Envío de prueba del formulario y confirmar a dónde llegó | Sí o no, y el correo de destino |
| 5 | Crear la cuenta corporativa de Google con 2FA | Cuenta operativa |

### Semana del 9 al 14 de noviembre — tomar el control (~4 h)

| # | Tarea | Cómo |
|---|---|---|
| 6 | Google Ads: pasar la cuenta a la cuenta corporativa como administrador y quitar al anterior. Si está bajo una cuenta de agencia (MCC), desvincular | Herramientas → Acceso y seguridad |
| 7 | Antes de tocar nada en Ads: **pausar o medir**. Si no hay medición, se pausa hasta instalarla | Decisión escrita en la bitácora |
| 8 | Instalar GA4 y la etiqueta de Google Ads desde el administrador de archivos de cPanel y verificar que registran. Evaluar la inyección por PHP para que sobreviva a una republicación | Evento de prueba visible en GA4 |
| 9 | Search Console: verificar el dominio con la cuenta corporativa y enviar el sitemap arreglado | Propiedad verificada |
| 10 | Google Business Profile: reclamar o traspasar la propiedad principal | Ficha bajo la cuenta corporativa |
| 11 | Facebook, X, LinkedIn, YouTube: quedar como administrador con la cuenta corporativa, quitar accesos viejos | Captura de la lista de roles de cada una |
| 12 | Respaldo completo con el asistente de copias de seguridad de cPanel, más el proyecto RapidWeaver si llegó y los contactos recibidos | Carpeta de respaldo fechada |
| 13 | Crear un usuario de cPanel propio en vez de compartir el principal, y rotar la clave del principal al cerrar el traspaso | Usuario propio operativo |
| 14 | Escribir el **inventario de activos digitales**: un documento con cada activo, su titular, su administrador, dónde se paga y cuándo vence | El documento |

El punto 14 no es burocracia: es el entregable que convierte esto en algo
que el directorio puede auditar y que la próxima persona puede recibir
sin arqueología.

---

## 4. El régimen semanal — 4 horas, dos bloques

Arranca la semana del **16 de noviembre**, una vez cerrada la Fase 0.
Dos bloques en dos días distintos, con hora puesta en el calendario como
si fuera una reunión con el directorio. Si quedan juntos el mismo día,
el segundo se come al primero.

### Las cinco reglas que hacen que 4 horas alcancen

Sin estas reglas, 4 horas se convierten en 10 y el trabajo deja de ser
sostenible. Son más importantes que la grilla de abajo.

1. **Una palanca por canal por semana.** Un cambio en Ads, un arreglo en
   el sitio. Si se tocan tres cosas a la vez, después no se sabe cuál
   funcionó.
2. **Nada se arregla en el momento.** Lo que aparece se anota en la lista
   de pendientes y se prioriza en el bloque siguiente. La urgencia
   inventada es lo que rompe los timebox.
3. **El reloj manda.** Si un segmento se pasa de su tiempo, se corta y
   queda anotado dónde quedó. No se recupera con horas extra.
4. **Todo lo que se hace, se escribe.** Cinco líneas por bloque en la
   bitácora. Es lo que después se convierte en el reporte mensual sin
   trabajo adicional.
5. **Lo que necesita decisión del directorio no se empuja.** Se acumula y
   se presenta junto en el reporte del mes. Perseguir aprobaciones
   sueltas consume el bloque entero.

### Bloque A — Revisión y orden (2 h, martes 9:00–11:00)

Entrar a las consolas, mirar, corregir una cosa, anotar. Misma estructura
todas las semanas, para que no haya que decidir qué hacer.

| Tiempo | Qué | Dónde |
|---|---|---|
| 0:00–0:15 | **Tablero.** Anotar cuatro números en la bitácora: contactos de la semana, clics y gasto de Ads, sesiones, impresiones orgánicas. Mirar, no analizar | GA4, Ads, Search Console |
| 0:15–0:45 | **Google Ads.** Informe de términos de búsqueda → negativizar lo que no corresponde (bodega de vinos, minimarket, bodegas de casa). Revisar anuncios desaprobados y presupuesto agotado. Aplicar **una** palanca | Google Ads |
| 0:45–1:05 | **Leads.** Verificar que los contactos llegaron y están respondidos o derivados. Etiquetar por origen. Una vez al mes, envío de prueba del formulario | Correo, formulario |
| 1:05–1:30 | **Sitio.** Un arreglo de la lista priorizada, uno solo. Antes, el chequeo de un minuto: portada carga, formulario envía, teléfonos correctos | Sitio, FTP o constructor |
| 1:30–1:50 | **Ficha de Google y reseñas.** Responder reseñas nuevas, verificar que horarios, dirección y teléfono siguen bien. Subir una foto | Google Business Profile |
| 1:50–2:00 | **Bitácora.** Cinco líneas: qué se cambió, qué se vio, qué quedó pendiente | Registro |

### Bloque B — Contenido y gobernanza (2 h, jueves 15:00–17:00)

Acá no se revisa nada: se produce. La clave es que las cuatro semanas
del mes no hagan lo mismo, para que el esfuerzo se acumule en vez de
dispersarse.

| Tiempo | Qué |
|---|---|
| 0:00–0:20 | Elegir el tema de la quincena del banco de temas y ajustarlo a lo que pasó en la semana (una búsqueda que apareció en Ads, una pregunta que llegó por el formulario) |
| 0:20–1:20 | **Producción.** Lo que toca según la rotación del mes (abajo) |
| 1:20–1:45 | Programar la publicación y dejarla agendada. Nada queda "para publicar después" |
| 1:45–2:00 | **Gobernanza.** La tarea del mes que toca (abajo) |

### Rotación mensual del bloque de producción

| Semana | Produce | Por qué ahí |
|---|---|---|
| 1 | **Pieza madre.** Una página o guía del sitio: la de mayor valor comercial que falte. O el informe del mes | Es la que cuesta, y se hace cuando hay energía al principio del mes |
| 2 | **Derivados.** Tres o cuatro piezas para redes sacadas de la pieza madre de la semana 1. Nada se escribe de cero | El contenido ya existe; esto es solo adaptarlo |
| 3 | **Prueba social.** Un testimonio, un caso, fotos de una bodega, pedir una reseña a un arrendatario actual | Es lo que más convierte y lo primero que se abandona |
| 4 | **Reporte al directorio.** Una página, armada desde las cuatro bitácoras del mes, con los números, lo que se hizo y las decisiones que se necesitan | Sale casi solo si la regla 4 se cumplió |

### Rotación mensual de los 15 minutos de gobernanza

| Semana | Tarea |
|---|---|
| 1 | **Accesos.** Revisar la lista de administradores de cada plataforma. Nadie de más, nadie de menos |
| 2 | **Pagos y vencimientos.** Dominio, hosting, Ads, licencias. Que nada se caiga por una tarjeta vencida |
| 3 | **Respaldo.** Copia del sitio, del proyecto, de los contactos del mes |
| 4 | **Inventario y decisiones.** Actualizar el inventario de activos y el registro de decisiones del directorio |

---

## 5. Gobernanza digital — las reglas permanentes

Lo que convierte esto en algo que no depende de que tú estés disponible.

**Titularidad.** Todo activo digital se registra a nombre de Duramet,
con la cuenta corporativa como dueña y las personas como administradores
invitados. Verificación en dos pasos en todas. Clave de recuperación en
poder del directorio, no solo tuyo.

**Matriz de roles.** Cada plataforma: quién es propietario, quién
administra, quién solo mira. Se revisa una vez al mes (semana 1 de
gobernanza).

**Registro de decisiones.** Una línea por decisión del directorio, con
fecha. Evita volver a discutir lo mismo y protege tu trabajo cuando
alguien pregunta por qué se hizo algo.

**Qué se publica sin aprobación y qué no.** Esto evita bloqueos y
también errores caros. Sin aprobación: contenido educativo, fotos de
instalaciones, respuestas a reseñas, derivados de piezas ya aprobadas.
**Nunca sin aprobación**: disponibilidad de bodegas, precios, plazos de
entrega, condiciones contractuales, nada que comprometa a la empresa
frente a un arrendatario.

**Separación de plata.** La inversión publicitaria va siempre separada de
los honorarios, en el reporte y en la factura. Nunca en la misma cifra.

**Nada se lanza sin medición.** Si una campaña o una página no tiene cómo
medirse, no sale. Es la regla que este sitio incumplió durante años y es
la razón de que hoy no se pueda decir si Ads sirvió.

---

## 6. Riesgos, y qué hacer con cada uno

| Riesgo | Qué pasa si se ignora | Mitigación |
|---|---|---|
| El archivo de RapidWeaver no aparece | El sitio no queda congelado, porque cPanel permite editar los archivos a mano, pero cada arreglo es frágil y lo estructural sigue bloqueado | Pedirlo por escrito en la semana 1. Mientras no llegue, arreglar por cPanel con registro de cambios manuales |
| Alguien republica desde RapidWeaver y pisa los arreglos manuales | La medición y las correcciones desaparecen sin aviso, y se descubre un mes después | Lista de cambios manuales en la bitácora, etiqueta inyectada por PHP, y acordar con el estudio que no publica sin avisar |
| Ads corriendo sin medición | Cada semana es plata sin atribución y sin aprendizaje | Pausar o medir en la semana 2. No hay tercera opción |
| El formulario entrega a un correo muerto | Se pierden arrendatarios en silencio, y no se sabe desde cuándo | Envío de prueba esta semana, y uno al mes de ahí en adelante |
| Canibalización con portaldebodegas.cl | Las dos propiedades compiten, la pauta se encarece y el arrendatario se confunde | Llevar la decisión del punto 2 al directorio este mes |
| El acceso queda en cuentas personales | Se repite el problema con la próxima persona | Cuenta corporativa dueña de todo, Fase 0 punto 5 |
| El traspaso se hace a medias | Queda un activo huérfano que aparece en el peor momento | El inventario del punto 14 es el criterio de cierre: si falta una fila, el traspaso no terminó |

---

## 7. Qué necesito confirmar contigo

Cinco cosas que cambian el plan y que no puedo averiguar desde fuera:

1. Resuelto el 4 de noviembre: quien administra está dentro de Duramet y
   puede entregar los accesos directamente, así que el traspaso no pasa
   por trámites de reclamo. Queda abierto si el estudio `vdiseno.cl`
   sigue vigente y si el archivo del sitio está allá.
2. ¿Ya tienes algún acceso, o se parte de cero?
3. ¿Hay campañas de Google Ads corriendo hoy, y con qué presupuesto
   mensual?
4. ¿El directorio ya tiene opinión sobre la relación entre duramet.cl y
   portaldebodegas.cl, o hay que plantearla desde cero?
5. ¿Los dos bloques de 2 h quedan martes y jueves, o te acomodan otros
   días?
