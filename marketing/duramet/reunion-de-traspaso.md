# Duramet — pauta de la reunión de traspaso

> Complemento de `plan-traspaso-y-operacion.md` (Fase 0, tarea 1).
> Supuesto: **la persona que administra está dentro de Duramet** y va a
> entregar los accesos de buena gana. Una reunión, 90 minutos, con
> pantalla compartida. Noviembre 2026.

## Qué cambia porque la persona está dentro

Con un proveedor externo el riesgo es perder cosas: te vas de la reunión
sin el archivo del sitio y no hay segunda oportunidad. Con alguien de la
empresa ese riesgo casi desaparece, y aparecen otros tres que son menos
obvios y más caros:

**1. El traspaso queda a medias por informalidad.** Es el riesgo
principal. Como la persona sigue ahí, es natural dejar la mitad de los
accesos sin transferir: "cuando lo necesites me lo pides". Funciona
durante dos meses y después aparece un martes a las 9:00 en que no puedes
entrar a Google Ads, o un aviso de vencimiento de dominio que llegó al
correo de otra persona. Por eso la reunión igual se hace completa y la
ficha del final igual se llena entera, aunque se sienta excesivo.

**2. Los accesos pueden quedar colgando de una cuenta personal.** Que la
persona sea de la empresa no significa que las cuentas sean de la
empresa. Si Google Ads está bajo su correo personal, el problema solo se
posterga: cambia de cargo, se va en dos años, y volvemos a esta reunión.
Pasar todo a una cuenta corporativa (`marketing@duramet.cl`) no es
"reclamar": son dos minutos por plataforma, con ella presente,
invitándote como administrador. Reclamar es el trámite con Google o NIC
Chile cuando ya nadie tiene la clave — eso es justamente lo que esta
reunión evita.

**3. El sitio probablemente no lo tiene ella.** El pie de duramet.cl
enlaza a `vdiseno.cl`, y el sitio está hecho con RapidWeaver, una
aplicación de escritorio. Lo más probable es que la persona de Duramet
tenga todas las cuentas y ningún archivo del sitio, porque el archivo
nunca salió del estudio. Eso no es un problema de esta reunión: es una
segunda conversación, con un tercero, y lo que necesitas de esta reunión
es saber **si esa relación sigue vigente y quién puede pedirle el
archivo**.

Y algo que sí hay que cuidar: esta persona va a seguir siendo tu
compañera de trabajo todas las semanas. Conviene no llevar el diagnóstico
del sitio a la reunión como lista de errores. El estado del sitio es de
años y en buena parte del estudio externo; plantearlo como "esto está
mal" convierte una entrega en una defensa y te deja peor parada para
pedir cosas en diciembre. Si el tema sale, el encuadre honesto es que es
el trabajo que viene, no una evaluación de nadie.

---

## Antes de la reunión

**Que la convoque el directorio.** Un correo de Ricardo diciendo "Nati
queda a cargo de lo digital desde ahora, les pido coordinar el traspaso"
sigue valiendo la pena incluso entre personas de la misma empresa: deja
claro que no es una gestión tuya sino una decisión tomada, y evita la
versión informal del traspaso.

**Ten lista la cuenta corporativa** (`marketing@duramet.cl` o similar)
con verificación en dos pasos activada y abierta en el navegador. Casi
todas las transferencias se hacen invitando a esa dirección. Si no existe
el día de la reunión, todo queda para después.

**Pide pantalla compartida al agendar.** Es el punto táctico que importa:
lo que se transfiere en vivo queda hecho. Lo que queda como "te lo paso
en la tarde" se demora semanas, también entre colegas.

**Agenda 90 minutos, no 60.** El bloque de transferencias en vivo son
nueve plataformas y siempre hay dos que piden recuperar una clave.

---

## Agenda, 90 minutos

### 0:00–0:05 · Encuadre

Corto y sin solemnidad: *"Voy a quedar a cargo de lo digital. La idea de
esta reunión es dejar todos los accesos a nombre de la empresa y que me
cuentes cómo está armado, para no tener que interrumpirte cada semana."*

El "para no tener que interrumpirte cada semana" es el argumento que
mejor funciona con alguien de la casa: le ahorra trabajo futuro.

### 0:05–0:40 · Transferencias en vivo

Acá no se pregunta, se hace. Plataforma por plataforma, cada una invita a
la cuenta corporativa como administrador o propietario.

| Plataforma | Dónde se hace | Qué revisar |
|---|---|---|
| **Google Ads** | Herramientas y configuración → Acceso y seguridad → Usuarios | Si la cuenta está bajo una cuenta de administrador (MCC) de una agencia, desvincularla. Y revisar el método de pago: si la tarjeta es personal de alguien, hay que cambiarla a una de la empresa |
| **Google Analytics** | Administrar → Accesos a la propiedad | Puede no existir ninguna propiedad (en el sitio no hay nada instalado). Si existe una vieja de Universal Analytics, pedirla igual: tiene el histórico |
| **Search Console** | Configuración → Usuarios y permisos | Pedir **propietario**, no usuario. Preguntar con qué método se verificó: si fue un archivo HTML por FTP, el control real está en el hosting |
| **Google Business Profile** | Configuración → Administradores | Transferir **propiedad principal**, no agregar administrador. Es la que más se queda a medias |
| **Facebook** | Business Suite → Configuración → Páginas → Accesos | Si la página vive dentro del Business Manager de una agencia, el traspaso se solicita a Meta y toma días: iniciarlo en la reunión |
| **LinkedIn** | Página → Herramientas de administración → Administradores | Solo un administrador existente puede agregarte |
| **YouTube** | Según el tipo de canal | Preguntar si es **cuenta de marca** o canal personal. Si es personal, no se transfiere: se migra o se abre uno nuevo. Conviene saberlo hoy |
| **X / Twitter** | No tiene roles | Se entrega usuario, clave, **el correo asociado y el segundo factor**. Si el 2FA está en el teléfono de esa persona, cambiarlo en la reunión |
| **Dominio `duramet.cl`** | NIC Chile | Verificar titular y **el correo de contacto registrado**. Si es el de una persona, los avisos de vencimiento le llegan a ella y nadie más los ve |

Regla del bloque: cada fila queda hecha, o queda con fecha. Que la
persona esté al lado no es lo mismo que esté hecho.

### 0:40–0:55 · El sitio y la relación con vdiseno.cl

Este es el bloque con la información nueva, porque es lo que
probablemente no esté en sus manos.

1. ¿Quién construyó el sitio y cuándo fue la última vez que se tocó?
2. ¿`vdiseno.cl` sigue siendo proveedor vigente? ¿Hay contrato, pago
   mensual, o fue un trabajo cerrado hace años?
3. **¿Existe el archivo de proyecto de RapidWeaver y en qué computador
   está?** Si está en Duramet, pídelo en la reunión por Drive o
   WeTransfer. Si está en el estudio, necesitas el nombre del contacto y
   quién de Duramet tiene la relación para pedirlo.
4. ¿Hay licencias de complementos pagadas por Duramet, o eran del
   estudio?
5. ¿Dónde está alojado el sitio y con qué proveedor? ¿Quién paga el
   hosting?
6. ¿Tienes las credenciales de FTP o del panel, o también las tiene el
   estudio?
7. ¿Hay respaldo del sitio en alguna parte?

Si la respuesta es que todo está en el estudio, no insistas en la
reunión: anótalo y la decisión de rescatar o rehacer el sitio pasa al
directorio con fundamento, que es lo que necesitas de todas formas.

### 0:55–1:10 · Plata, vencimientos y el formulario

1. ¿Qué se paga al mes y a quién? (hosting, dominio, licencias, Ads)
2. ¿Con qué tarjeta o cuenta se paga cada cosa?
3. ¿Qué vence y cuándo? El dominio es el crítico: si vence sin que nadie
   mire, el sitio y los correos se caen el mismo día.
4. **¿A qué correo entrega el formulario de contacto del sitio?**
   Confírmalo con un envío de prueba ahí mismo, con pantalla compartida.
5. ¿Hay algún servicio con renovación automática del que nadie se acuerde?

### 1:10–1:20 · Lo que solo esa persona sabe

No da accesos, da contexto, y es lo que no se reconstruye después.
Pregunta abierta y deja que hable:

1. ¿Hubo campañas de Google Ads antes? ¿Qué funcionó y qué no?
2. ¿Por qué el sitio quedó en la subcarpeta `/bodegas/` y no en la raíz?
3. ¿Alguna vez hubo analítica instalada? ¿Se sacó o nunca se puso?
4. ¿Por dónde llegaban los arrendatarios en la práctica: formulario,
   teléfono, Facebook, boca a boca?
5. ¿Quién decidía qué se publicaba, y había que pedir permiso a alguien?
6. ¿Hay fotos originales, logo en vector o videos sin editar? ¿Dónde?
7. **¿Hay algo más que tengas con clave y que no esté en esta lista?**
   Literal y al final. Es la pregunta que destapa la cuenta de Canva, el
   banco de imágenes o el Mailchimp del que nadie se acordaba.

### 1:20–1:30 · El límite de aquí en adelante

Este bloque no existiría con un proveedor externo y es el más importante
de los nuevos. La persona se queda en la empresa, así que hay que definir
qué sigue haciendo y qué no. Si no se define, van a quedar dos personas
entrando a las mismas consolas, y la regla de "una palanca por semana"
del plan deja de funcionar: nadie va a poder saber si el cambio del
martes fue tuyo o suyo.

Lo que hay que acordar, en voz alta y por escrito en el correo resumen:

- **Quién entra a Google Ads de aquí en adelante.** Propuesta: solo tú.
  Ella queda con acceso de lectura, no de edición. No es desconfianza: es
  que dos manos en la misma cuenta hacen imposible atribuir resultados.
- **Quién publica en las redes.** Si ella venía publicando y quiere
  seguir, perfecto, pero entonces define qué publica cada una. Si no,
  pasa a ti completo.
- **Quién responde los contactos que llegan** por formulario y teléfono.
  Esto probablemente no cambia y conviene confirmarlo, no asumirlo.
- **A quién se le avisa cuando algo se cae.** Que exista una persona, no
  "alguien".
- **Qué pasa con los accesos que ella conserva.** Lo razonable es que
  mantenga lectura en todo y edición en nada, salvo lo que siga
  operando.

Es una conversación de cinco minutos que evita tres meses de pisarse.

### 1:30 · Cierre

Lee en voz alta lo que quedó pendiente con la fecha de cada cosa. **Ese
mismo día** manda el correo resumen: entregado, pendiente con fecha, y el
límite acordado en el bloque anterior. Con copia al directorio. Entre
colegas ese correo se siente innecesario y es justamente lo que evita que
el traspaso quede a medias.

---

## Ficha de traspaso — llenar en la reunión

| Activo | ¿Existe? | A nombre de quién hoy | ¿Queda a nombre de la empresa? | Pendiente y fecha |
|---|---|---|---|---|
| Google Ads | | | | |
| Método de pago de Ads | | | | |
| Google Analytics | | | | |
| Search Console | | | | |
| Google Business Profile | | | | |
| Facebook | | | | |
| X / Twitter | | | | |
| LinkedIn | | | | |
| YouTube | | | | |
| Dominio `duramet.cl` (NIC Chile) | | | | |
| Correo de contacto del dominio | | | | |
| Hosting (panel) | | | | |
| FTP / SFTP | | | | |
| Archivo de proyecto RapidWeaver | | | | |
| Licencias de complementos Stacks | | | | |
| Relación con `vdiseno.cl` | | | | |
| Destino del formulario | | | | |
| Fotos, logo en vector, videos | | | | |
| Otros (Canva, correos, etc.) | | | | |

## Criterio de cierre

La reunión salió bien si al terminar tienes tres cosas:

1. Para **cada fila** de la ficha, el acceso en mano o una fecha escrita.
   Una fila en blanco es una fila que va a aparecer como problema en
   enero.
2. Una respuesta clara sobre el archivo del sitio: está en Duramet, está
   en el estudio, o no existe. Las tres respuestas sirven; la que no
   sirve es "habría que ver".
3. El límite de aquí en adelante acordado y escrito.

---

## Anexo — correo de convocatoria

Versión corta para pegar. La lista es deliberadamente más breve y más
amable que la agenda interna: sirve para que la persona llegue preparada,
no para mostrarle el detalle de lo que se va a revisar.

> **Asunto:** Traspaso de accesos digitales — coordinemos 90 min
>
> Hola [nombre],
>
> Como te adelantó Ricardo, voy a quedar a cargo de lo digital de
> Duramet. Para no tener que interrumpirte cada semana, me gustaría que
> nos juntáramos una vez y dejáramos todos los accesos ordenados a nombre
> de la empresa.
>
> Calculo 90 minutos y te pido que sea con pantalla compartida, así vamos
> dejando cada cosa hecha en el momento en vez de quedar con pendientes.
>
> Lo que me gustaría repasar:
>
> 1. Google Ads, Analytics y Search Console
> 2. La ficha de Google (la que aparece en Maps)
> 3. Redes sociales: Facebook, LinkedIn, X y YouTube
> 4. El dominio `duramet.cl` y el hosting: dónde están y quién los paga
> 5. El sitio: con qué está hecho y quién lo edita hoy
> 6. A qué correo llegan los contactos del formulario
> 7. Qué se paga mensual y qué tiene fecha de vencimiento
>
> Si puedes tener a mano las claves o los paneles de esos puntos,
> avanzamos rápido.
>
> ¿Te acomoda [día] a las [hora]?
>
> Gracias,
> Nati

Si la convocatoria la manda Ricardo en vez de ti, cambia la primera
frase por "Nati queda a cargo de lo digital desde ahora, les pido
coordinar el traspaso" y el resto queda igual.
