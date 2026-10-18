# Specification: InvGate Views & Anti-Saturation Reporting Skill (`invgate-views`)

## 1. Overview
`invgate-views` es una skill especializada para agentes de IA que enseña a obtener listados filtrados de solicitudes, métricas y exportaciones en InvGate Service Management priorizando el uso de **Vistas personalizadas (`view_id`)** como filtros pre-compilados en el servidor. Su objetivo principal es evitar llamadas repetitivas, filtros manuales costosos o problemas N+1 que saturen el rate-limit de la API REST.

## 2. Functional Requirements

### 2.1 URL Parsing & View Identification
- Extraer el parámetro numérico `view_id` directamente cuando el usuario comparta una URL de InvGate con el patrón:
  `https://[instance]/views/index/show/view_id/<VIEW_ID>#list`
- Documentar las reglas de permisos y visibilidad:
  - Una vista personalizada pertenece a su creador. Para que el token de la API pueda consultarla, el usuario asociado al token debe ser el dueño de la vista o tenerla explícitamente compartida.
  - Diferenciar entre vistas predefinidas del sistema (`id` bajos, `predefined: true` en MCP) y vistas personalizadas de usuario (`predefined: false`).

### 2.2 Anti-Saturation Strategy & View Design Guide
- Establecer la regla de oro **View-First Querying**: cuando un usuario o integración necesita consultar periódicamente tickets bajo una combinación fija de criterios (ej. estados abiertos + conjunto específico de categorías + mesas de ayuda), instruir a crear/usar una Vista en la UI de InvGate y consumirla por `view_id` en lugar de encadenar múltiples llamadas a `/incidents.by.*` o `/incident`.
- Guiar qué columnas agregar a la Vista en la UI de InvGate dado que `GET /incidents.details.by.view` devuelve en `data` y `metadata` exactamente las columnas configuradas en la vista (evitando llamadas adicionales para traducir IDs de usuarios, categorías o estados).

### 2.3 REST API View Consumption Patterns
- **`GET /incidents.details.by.view`**:
  - Uso principal para reportería y listados enriquecidos (hasta 1000 registros por página).
  - Parámetros: `view_id` (requerido), `page_key` (paginación por cursor usando `next_page_key`), `sort_by` (`id` | `last_update`), `order_by` (`asc` | `desc`).
  - Interpretación de respuesta: cruce entre `data` (filas) y `metadata` (diccionario de etiquetas de columnas y objetos relacionados).
- **`GET /incidents.by.view`**:
  - Uso ligero cuando solo se requieren los IDs (`requestIds`) con paginación `limit` y `offset`.

### 2.4 Complementary Reporting & Export Endpoints
- Documentar en `skills/invgate-views/references/reporting-endpoints.md` el flujo y parámetros exactos de:
  - **Bulk Data Export**: `POST /data.export` y `GET /data.export` para exportaciones asíncronas masivas.
  - **Incremental Polling**: `GET /incidents.last.hour` (con `limit` y `page_key`) para sincronización diferencial sin re-consultar históricos.
  - **Time Tracking**: `GET /timetracking` y atributos de SLA para reportes de esfuerzo y cumplimiento.
  - **MCP Equivalence Note**: Breve nota sobre `list_requests_views` y `list_view_requests` (`predefined` flag collision warning).

### 2.5 Cross-Skill Integration & Registry
- Agregar referencia cruzada en `skills/invgate-api/SKILL.md` e `skills/invgate-mcp/SKILL.md` apuntando a `invgate-views` cuando se requiera filtrado por vistas o consultas masivas sin saturar la API.
- Registrar `skills/invgate-views` en `plugin.json`, `README.md` y `conductor/product.md`.

## 3. Non-Functional Requirements
- **Instance Agnosticism**: No hardcodear IDs de categorías, usuarios ni tokens reales; usar placeholders claros (`<VIEW_ID>`, `[instance]`).
- **Progressive Disclosure**: Mantener `skills/invgate-views/SKILL.md` conciso (< 400 palabras) y colocar el detalle exhaustivo de payloads y estructuras JSON en `skills/invgate-views/references/reporting-endpoints.md`.
- **Notion & GitHub Markdown Compatibility**: Tablas GFM y bloques limpios.

## 4. Acceptance Criteria
- [ ] Existe `skills/invgate-views/SKILL.md` con frontmatter YAML válido (`name: invgate-views`, `description: Use when...`).
- [ ] Existe `skills/invgate-views/references/reporting-endpoints.md` con el esquema completo de `/incidents.details.by.view`, `/incidents.by.view`, `/incidents.last.hour`, `/data.export` y `/timetracking`.
- [ ] `skills/invgate-api/SKILL.md` y `skills/invgate-mcp/SKILL.md` referencian a `invgate-views` para consultas basadas en vistas y anti-saturación.
- [ ] `plugin.json` y `README.md` incluyen `invgate-views`.

## 5. Out of Scope
- Modificaciones al binario CLI `bin/invgate-skills.js`.
- Creación de scripts de exportación acoplados a una instancia específica.
