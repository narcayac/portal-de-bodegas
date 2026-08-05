---
name: contexto-cliente
description: Ficha de contexto compartida. TODOS los agentes deben leer este archivo antes de producir cualquier entregable. No es un agente ejecutable.
---

# Contexto de cliente — Portal de Bodegas

> Este archivo es la fuente única de verdad. Si un dato cambia, se cambia aquí y no en cada agente.

## Negocio
- **Marca:** Portal de Bodegas
- **Categoría:** Arriendo de bodegas industriales B2B
- **Ubicación:** San Bernardo, Región Metropolitana, Chile (zona sur de Santiago)
- **Proyectos (5):** El Barrancón · Bosque Catemito · Alto Las Acacias · Acacias Seis · Inversiones Duramet
- **Superficies:** 180 m² a 14.000 m² (Bosque Catemito: ampliable hasta 30.000 m² construidos a medida)
- **Modelo:** trato directo con el propietario (sin corretaje ni comisión)

## Diferenciadores (usar como pilares de mensaje)
1. Trato directo con el dueño — sin comisión de corredora
2. Seguridad con CCTV 24/7
3. Energía trifásica
4. Piso industrial (losa de alto tránsito)
5. Acceso para camiones
6. Conectividad logística zona sur (Acceso Sur, Ruta 5, aeropuerto)

## Reglas de negocio duras
- **Precio de referencia PÚBLICO (aprobado por el cliente): desde 0,13 UF/m²/mes** con equipamiento incluido. Se usa en sitio, guías y anuncios. Las cotizaciones exactas siempre se cierran por WhatsApp.
- **Canales de lead:** WhatsApp (+56 9 9225 9272) y formulario Web3Forms (entrega a rarcaya@arcaya.cl, con campos ocultos UTM + gclid; al enviarse redirige a `/gracias/`).
- **CTA primario site-wide:** WhatsApp (botón verde) — es la vía de conversión principal medida. El formulario es la vía secundaria.
- Mensajes de WhatsApp pre-escritos DISTINTOS por origen (proyecto, guía, página) — sirven como etiqueta de procedencia del lead. No unificarlos.
- Nunca prometer disponibilidad, plazos de entrega ni condiciones contractuales sin confirmación del cliente.

## Sistema de marca
- Navy `#011943` · Azul eléctrico `#0685de` · Slate `#6c7b92` · WhatsApp verde `#25D366`
- **Estética:** real estate comercial institucional. Referencias: CBRE, JLL, Cushman & Wakefield, Megacentro.
- **Prohibido:** estética "startup SaaS" — gradientes morados, blobs, ilustraciones isométricas, glassmorphism, emojis en UI.
- Separadores hairline, contenedores de imagen rectilíneos, tipografía editorial, iconografía mínima, grillas tipo tabla.

## Arquitectura SEO (implementada y en producción)
- `/bodegas/` → hub maestro · `/bodegas/san-bernardo/` → categoría de ubicación · `/bodegas/[project-id]/` → 5 páginas de proyecto
- `/guias/` → hub de contenido con 6 guías publicadas: precios (0,13 UF), checklist técnica, hub logístico San Bernardo, galpones (sinónimo clave en Chile), contrato de arriendo, cálculo de m²
- `/contacto/` · `/gracias/` (thank-you del formulario, noindex, dispara conversión) · `/politica-de-privacidad/` (noindex)
- **Keyword principal home:** "arriendo de bodegas para empresas" · Cobertura activa del sinónimo **"galpón"** en metas, FAQ y guía propia
- Fase 2 (no construida): `/zona-sur/`, páginas por tramo de m² y por vertical

## Stack (en producción)
Next.js 14 App Router (JSX, sin TypeScript) en Vercel · dominio www.portaldebodegas.cl · Web3Forms (formulario → email, campos ocultos UTM/gclid) · GA4 (`G-1454PJDP93`) · Google Ads (`AW-18353674917`; conversiones: formulario vía /gracias/, clic en WhatsApp vía etiqueta, llamadas) · Google Search Console + Bing Webmaster Tools · Google Business Profile (verificado, en Maps) · Repo GitHub `narcayac/portal-de-bodegas`, deploy automático al hacer merge a `main`

## Contexto de mercado chileno
- Moneda CLP. Terminología local: boleta de honorarios, retención, UF.
- Patrones de contaminación de búsqueda en Chile: "bodega" también significa minimarket/almacén y bodega de vinos → negativizar agresivamente.
- Volúmenes de búsqueda bajos y muy estacionales. Nunca extrapolar benchmarks de mercados grandes sin advertirlo.

## Relación comercial
Nati trabaja como freelance contratada directamente por el directorio (no está dentro de la empresa). Los entregables deben ser autoexplicativos y presentables a un directorio no técnico.
