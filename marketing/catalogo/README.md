# Catálogo de capacidad — documento comercial

Documento en PDF apaisado (16:9, 13 láminas) para enviar por correo a un
operador logístico. La primera versión se preparó para **TIBA Group**.

```bash
node build.js        # → salida/catalogo-portal-de-bodegas.pdf
```

## Qué lo diferencia del resto de marketing/

Todo lo demás en esta carpeta es contenido social: se publica, se mide y se
reemplaza. Esto no. Es un documento que se adjunta a un correo, lo abre una
persona en una empresa y lo reenvía internamente a otras tres. Por eso:

- Sale en **PDF de una sola pasada**, no en PNG por lámina.
- El cuerpo de texto es más grande de lo que parece necesario en pantalla:
  se lee impreso y proyectado, no en un teléfono.
- No lleva botón de WhatsApp. En un documento corporativo, el contacto va
  como dato, no como llamada a la acción.

## El ángulo

El documento **no** presenta a TIBA como un posible arrendatario. TIBA vende
contract logistics, almacenaje y distribución: para vender ese servicio
necesita metros cuadrados, y los metros tienen dueño. El documento se dirige
a ellos como proveedor de capacidad para los contratos que ellos ganan, y el
argumento central es que al no haber corredor en medio el costo del espacio
entra limpio a la estructura de su contrato.

Si se reusa para otro destinatario, hay que revisar si ese ángulo aplica.
Para una empresa que busca bodega para su propia operación, no aplica.

## Imágenes

`foto()` convierte el webp a JPEG con ImageMagick antes de incrustarlo. No
se usa `photo()` de `../shared/brand.js`: ese incrusta el webp tal cual y
Chromium, al imprimir a PDF, lo reencodifica sin pérdida. El documento
terminaba pesando 22 MB, demasiado para adjuntar. Por JPEG queda en 2,8 MB
sin diferencia visible.

Las fotos están elegidas para este público. Un forwarder mira el patio y el
camión antes que la nave vacía: por eso Duramet usa la foto de camiones
cargando y la portada, la aérea con flota. Si se cambian, revisar que la
foto siga diciendo lo que dice el rótulo.

## Nunca usar text-shadow

Chromium, al imprimir a PDF, rasteriza el desenfoque de `text-shadow` como un
**rectángulo opaco**. En pantalla se ve bien; en el PDF el texto queda con una
caja azul detrás y los títulos salen dobles. Pasó en la portada y en los
rótulos de los recintos, y no se detectó en la revisión porque las hojas de
contacto estaban a 50 dpi.

La legibilidad del texto sobre foto se resuelve **solo con degradados**
(`.scrim`, `.scrim-pie`), que son elementos del DOM y se imprimen bien.

Corolario: revisar este documento a 72 dpi o más, nunca a 50.

## La numeración de los recintos

`ficha()` recibe el número de lámina y el del recinto por separado. Son
distintos porque la lámina de acopio se intercala entre medio; derivar uno
del otro producía "recinto 6 de 5". No volver a derivarlo.

## Pendientes antes de enviarlo

Tres datos que el documento hoy **no** resuelve y que no se inventaron:

1. **Estatus aduanero.** No se afirma ni se niega que los recintos sean
   almacén extraportuario o depósito aduanero. TIBA es agente de aduana y
   es la primera pregunta que va a hacer. Conviene decirlo de frente.
2. **Distancias a puerto y aeropuerto.** Deliberadamente fuera. Las fuentes
   públicas mezclan distancia en línea recta con distancia por carretera, y
   un forwarder sabe esos números de memoria: uno malo cuesta la autoridad
   del documento entero.
3. **Firma.** El correo del documento es `ricardo@portaldebodegas.cl`, que
   es el de contacto comercial y está escrito directo acá. Falta el nombre
   completo y el cargo de quien firma.

Ojo con el correo: `lib/data.js` todavía trae `rarcaya@arcaya.cl` como
`SITE.email`, es decir el sitio publica uno distinto del que usa este
documento. Hay que decidir cuál es el correcto y alinearlos.

## Datos

Metrajes y direcciones salen de `lib/data.js`. Si cambian allá, hay que
cambiarlos acá: la duplicación es deliberada —el catálogo es una foto fija
de lo ofrecido en una fecha— pero conviene revisarla antes de cada envío.
