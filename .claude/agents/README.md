# Equipo de agentes — Portal de Bodegas

11 agentes especializados + 1 archivo de contexto compartido.

## Cómo usarlos

**En Claude Code:** copia esta carpeta a `.claude/agents/` en la raíz del proyecto. Se invocan por nombre (`> usa el agente seo-specialist para...`) o Claude los selecciona solo según la descripción.

**En Claude.ai / Proyectos:** sube los archivos al Project Knowledge y pide "actúa como el agente X".

**Como prompt suelto:** copia el contenido de un archivo (sin el frontmatter) y pégalo como instrucción de sistema.

> `_contexto-cliente.md` no es un agente. Es la fuente única de verdad que todos los demás leen. Si cambia un dato del negocio, se cambia ahí y en ningún otro lado.

## Roster

| Agente | Capa | Responde a |
|---|---|---|
| `cmo` | Dirección | Qué hacemos, en qué orden, con cuánto |
| `seo-specialist` | Orgánico | Arquitectura, keywords, on-page, schema, técnico |
| `organic-specialist` | Orgánico | Contenido, copy, GBP, reseñas, redes |
| `paid-specialist` | Pagado | Mix de canales, presupuesto, escalamiento |
| `sem-specialist` | Pagado | Estrategia de búsqueda pagada |
| `google-ads-specialist` | Pagado | Operación de la plataforma, CSV, mantención |
| `google-analytics-specialist` | Medición | GA4, eventos, atribución, reportes |
| `website-specialist` | Producto | Roadmap, requisitos, arquitectura de conversión |
| `website-designer` | Producto | Sistema visual, componentes, responsive |
| `website-developer` | Producto | Implementación Next.js, schema, eventos, deploy |
| `qa-specialist` | Control | Última verificación antes de publicar |

## Límites entre los que se confunden

El error más común es superponer los tres agentes de pagado. Quedaron separados por capa:

```
paid-specialist        ¿Cuánto va a búsqueda vs. retargeting vs. LinkedIn?
      ↓
sem-specialist         ¿Qué campañas, qué intenciones, qué landings?
      ↓
google-ads-specialist  ¿Cómo se construye eso en la plataforma, sin errores?
```

Y en orgánico:
```
seo-specialist       arquitectura, técnico, blueprints  →  qué debe existir
organic-specialist   contenido, GBP, reseñas            →  qué dice y cómo suena
```

Y en sitio:
```
website-specialist   requisitos y prioridades  →  qué se construye y por qué
website-designer     sistema visual y specs    →  cómo se ve y se comporta
website-developer    Next.js                   →  cómo se construye
```

## Flujos típicos

**Página nueva:**
`seo-specialist` (blueprint) → `organic-specialist` (copy) → `website-designer` (spec visual) → `website-developer` (implementación) → `qa-specialist` (verificación) → publicar

**Campaña nueva:**
`paid-specialist` (presupuesto) → `sem-specialist` (estrategia) → `google-analytics-specialist` (medición primero) → `google-ads-specialist` (construcción) → `qa-specialist` (checklist pre-lanzamiento) → lanzar

**Reporte mensual al directorio:**
`google-analytics-specialist` (datos) → `cmo` (interpretación y recomendación) → `qa-specialist` (revisión pre-envío)

## Reglas que comparten todos

1. Nunca publicar, insinuar ni estimar precios.
2. Inversión publicitaria siempre separada de honorarios.
3. Nada se lanza sin medición verificada.
4. Nada se publica sin pasar por `qa-specialist`.
5. Ningún cambio de URL sin plan de redirección 301.
6. Estética institucional B2B. Nunca "startup SaaS".
