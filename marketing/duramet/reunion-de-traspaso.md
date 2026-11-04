# Duramet — pauta de la reunión de traspaso

> Complemento de `plan-traspaso-y-operacion.md` (Fase 0, tarea 1).
> Una reunión, 75 minutos, con pantalla compartida. Noviembre 2026.

## El criterio que ordena la reunión

Los activos digitales se dividen en dos grupos y la reunión solo debe
gastarse en el primero:

**Irrecuperable sin esa persona.** El archivo de proyecto de RapidWeaver,
las licencias de los complementos, las credenciales de FTP, la cuenta de
X (que no tiene sistema de roles: es usuario y clave o nada), y todo lo
que esa persona *sabe* y no está escrito en ninguna parte.

**Recuperable sin esa persona, con más trabajo.** El dominio (se verifica
el titular en NIC Chile), la ficha de Google Business Profile (se reclama
la propiedad), Search Console (se verifica por DNS), la página de
Facebook (se puede pedir a Meta con documentación de la empresa). Si algo
de esto no sale en la reunión, no es una emergencia.

Por eso el orden de abajo no es temático: es por riesgo de pérdida.

## Antes de la reunión

**Que la convoque el directorio, no tú.** Un correo de Ricardo diciendo
"Nati queda a cargo de lo digital desde ahora, les pido coordinar el
traspaso" cambia por completo la reunión. Sin eso, llegas pidiendo
favores a alguien que no tiene obligación de dártelos, y el archivo del
sitio se demora tres semanas en aparecer.

**Ten lista la cuenta corporativa** (`marketing@duramet.cl` o similar)
con verificación en dos pasos activada, abierta en el navegador. Casi
todas las transferencias se hacen invitando a esa dirección, y si no
existe el día de la reunión, todo queda "para después".

**Pide pantalla compartida explícitamente al agendar.** Es el único
punto táctico que de verdad importa: lo que se transfiere en vivo durante
la reunión queda hecho, y lo que queda como promesa de enviar se demora
semanas o no llega.

**Lleva esta pauta impresa o en pantalla y toma notas en vivo**, en la
ficha del final.

## Lo que NO hay que hacer

- **No presentes el diagnóstico del sitio.** El texto de relleno en la
  portada, los títulos duplicados, la falta de medición: nada de eso va a
  la reunión. Si la conversación se convierte en una evaluación del
  trabajo de esa persona, se pone a la defensiva y el archivo del sitio
  deja de aparecer. El diagnóstico es para el directorio, no para ella.
- **No pidas que arregle nada.** No es una reunión de pendientes, es una
  reunión de entrega.
- **No negocies plata ni contratos.** Si aparece el tema, va al
  directorio.
- **No aceptes "te lo mando cuando pueda".** Todo lo que no se haga en
  vivo sale con fecha y responsable.

---

## Agenda, 75 minutos

### 0:00–0:05 · Encuadre

Una frase, sin rodeos: *"Voy a quedar a cargo de lo digital de Duramet.
Esta reunión es para recibir los accesos y que me cuentes cómo está
armado, así no te seguimos molestando después."*

El "así no te seguimos molestando después" es importante: le ofrece una
salida limpia en vez de una pérdida.

### 0:05–0:20 · El sitio: lo único que no se puede recuperar

Las preguntas, en este orden:

1. ¿Con qué está hecho el sitio y quién lo construyó?
   (Ya sé que es RapidWeaver + Stacks, pero conviene que lo diga: la
   respuesta revela si lo entiende o si lo heredó.)
2. **¿Existe el archivo de proyecto de RapidWeaver? ¿En qué computador
   está?** Es la pregunta más importante de la reunión.
3. ¿Qué complementos de pago usa y a nombre de quién están las licencias?
4. ¿Dónde está alojado el sitio, con qué proveedor y con qué plan?
5. ¿Cuáles son las credenciales de FTP o del panel de hosting?
6. ¿El sitio tiene respaldo en alguna parte?

**Pide el archivo ahí mismo**, por WeTransfer o Drive, durante la
reunión. Es un archivo grande con una carpeta de recursos al lado; si
queda para después, puede no llegar nunca. Si dice que no lo tiene o que
está en un computador que ya no usa, eso es la respuesta más valiosa de
la reunión: significa que el sitio hay que rehacerlo, y lo sabes hoy en
vez de en febrero.

### 0:20–0:45 · Transferencias en vivo, con pantalla compartida

Acá no se pregunta: se hace. Plataforma por plataforma, cada una invita a
la cuenta corporativa como administrador o propietario.

| Plataforma | Dónde se hace | La trampa a revisar |
|---|---|---|
| **Google Ads** | Herramientas y configuración → Acceso y seguridad → Usuarios | Si la cuenta está bajo una cuenta de administrador (MCC) de la agencia, hay que **desvincularla**, no solo agregarte. Revisar también el método de pago: si la tarjeta es de la agencia, el gasto se corta el día que se van |
| **Google Analytics** | Administrar → Accesos a la propiedad | Puede que no exista ninguna propiedad. Si existe una vieja de Universal Analytics, pedirla igual: tiene el histórico |
| **Search Console** | Configuración → Usuarios y permisos | Pedir **propietario**, no usuario. Preguntar con qué método se verificó el dominio: si fue un archivo HTML subido por FTP, el control real está en el hosting |
| **Google Business Profile** | Configuración → Administradores | Hay que transferir **propiedad principal**, no agregar administrador. Es la que suele quedar a medias |
| **Facebook** | Business Suite → Configuración → Páginas → Accesos | Si la página vive dentro del Business Manager de la agencia, el traspaso se solicita a Meta y toma días. Hay que **iniciarlo en la reunión** |
| **LinkedIn** | Página → Herramientas de administración → Administradores | Solo un administrador existente puede agregarte. Si la persona se va antes, se pierde |
| **YouTube** | Según el tipo de canal | Preguntar si es una **cuenta de marca** o un canal personal. Si es personal, no se transfiere: hay que migrarlo o abrir uno nuevo. Dato clave |
| **X / Twitter** | No tiene roles | Se entrega usuario, clave y, sobre todo, **el correo asociado y el segundo factor**. Si el 2FA está en el teléfono de esa persona, hay que cambiarlo en la reunión o la cuenta se pierde |
| **Dominio `duramet.cl`** | NIC Chile | Verificar el titular y, sobre todo, **el correo de contacto registrado**. Si es el de esa persona, los avisos de vencimiento le llegan a ella |

Regla para este bloque: en cada fila, o queda hecho, o queda con fecha.
Nada queda en "lo veo esta semana".

### 0:45–0:55 · Plata, vencimientos y el formulario

1. ¿Qué se paga al mes y a quién? (hosting, dominio, licencias, Ads)
2. ¿Con qué tarjeta o cuenta se paga cada cosa?
3. ¿Qué vence y cuándo? El dominio es el crítico: si vence sin que nadie
   mire, el sitio y los correos se caen el mismo día.
4. **¿A qué correo entrega el formulario de contacto del sitio?**
   Confírmalo con un envío de prueba ahí mismo, con pantalla compartida.
   Puede estar llegando a una casilla que ya no existe.
5. ¿Hay algún contrato o servicio con renovación automática?

### 0:55–1:10 · Lo que solo esa persona sabe

Este bloque no da accesos, da contexto, y es lo que no vas a poder
reconstruir después. Pregunta abierta y deja que hable:

1. ¿Hubo campañas de Google Ads antes? ¿Qué funcionó y qué no?
2. ¿Por qué el sitio quedó en la subcarpeta `/bodegas/` y no en la raíz?
3. ¿Alguna vez hubo analítica instalada? ¿Por qué se sacó o nunca se puso?
4. ¿Por dónde llegaban los arrendatarios en la práctica: el formulario,
   el teléfono, Facebook, boca a boca?
5. ¿Quién decidía qué se publicaba?
6. ¿Hay fotos originales, logo en vector, videos sin editar en alguna
   parte? ¿Dónde?
7. **¿Hay algo más que tenga acceso o clave y que no esté en esta lista?**
   Pregúntalo literal y al final. Es la que destapa la cuenta de Canva,
   el banco de imágenes o la cuenta de Mailchimp de la que nadie se
   acordaba.

### 1:10–1:15 · Cierre

Lee en voz alta lo que quedó pendiente, con la fecha de cada cosa.
Acuerda una ventana corta de consultas: *"si me trabo con algo, ¿te
puedo escribir las próximas dos semanas?"* — es razonable de pedir y
evita quedar colgada.

**Ese mismo día**, manda el correo resumen: lo que quedó entregado, lo
que quedó pendiente con fecha, y la ventana de consultas. Con copia al
directorio. Ese correo es el que convierte los acuerdos en compromisos y
el que te protege si algo no llega.

---

## Ficha de traspaso — llenar en la reunión

| Activo | ¿Existe? | Titular / dueño hoy | ¿Queda a mi nombre? | Pendiente y fecha |
|---|---|---|---|---|
| Archivo de proyecto RapidWeaver | | | | |
| Licencias de complementos Stacks | | | | |
| Hosting (panel) | | | | |
| FTP / SFTP | | | | |
| Dominio `duramet.cl` (NIC Chile) | | | | |
| Correo de contacto del dominio | | | | |
| Google Ads | | | | |
| Método de pago de Ads | | | | |
| Google Analytics | | | | |
| Search Console | | | | |
| Google Business Profile | | | | |
| Facebook | | | | |
| X / Twitter | | | | |
| LinkedIn | | | | |
| YouTube | | | | |
| Destino del formulario | | | | |
| Fotos, logo en vector, videos | | | | |
| Otros (Canva, correos, etc.) | | | | |

## Criterio de cierre

La reunión salió bien si al terminar tienes, para **cada fila** de la
ficha, una de dos cosas: el acceso en mano, o una fecha escrita con
nombre y apellido. Una fila en blanco es una fila que se va a convertir
en problema.

Y si el archivo de RapidWeaver no existe o no aparece, la reunión fue
igual de útil: la decisión de rehacer el sitio pasa de "habría que
evaluarlo" a "hay que presupuestarlo este mes", y eso va al directorio
con fundamento.
