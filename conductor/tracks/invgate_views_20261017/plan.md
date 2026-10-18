# Implementation Plan: InvGate Views & Anti-Saturation Reporting Skill (`invgate-views`)

## Phase 1: Core Skill & Reference Authoring (`invgate-views`)

- [x] Task: Baseline Validation & Skill Structure Setup
    - [x] Verificar qué responde un agente sin `invgate-views` ante una URL `/views/index/show/view_id/76#list` y una solicitud de consulta masiva de tickets abiertos por categorías
    - [x] Crear el directorio `skills/invgate-views/` y `skills/invgate-views/references/`
- [x] Task: Create `skills/invgate-views/SKILL.md`
    - [x] Redactar el frontmatter YAML (`name: invgate-views`, `description: Use when...`)
    - [x] Documentar el principio **View-First Querying (Anti-Saturation)** y cuándo preferir `view_id` sobre llamadas múltiples a la API
    - [x] Documentar la extracción de `view_id` desde URLs de la interfaz web (`.../views/index/show/view_id/<ID>#list`) y reglas de permisos (vistas privadas del creador vs. compartidas con el usuario del token)
    - [x] Documentar la guía de diseño de Vistas en la UI de InvGate (configuración de filtros pre-compilados y selección de columnas para recibir `data` + `metadata` completos sin consultas N+1)
    - [x] Incluir tabla rápida de decisión entre `GET /incidents.details.by.view`, `GET /incidents.by.view`, `list_view_requests` (MCP) y endpoints de exportación/polling
- [x] Task: Create `skills/invgate-views/references/reporting-endpoints.md`
    - [x] Documentar el esquema completo, parámetros y paginación por cursor (`page_key` / `next_page_key`, lotes de hasta 1000 solicitudes) de `GET /incidents.details.by.view`
    - [x] Documentar `GET /incidents.by.view` (`limit`, `offset`, `requestIds`)
    - [x] Documentar el patrón de equivalencia en MCP (`list_requests_views` y `list_view_requests` con la advertencia crítica de colisión de IDs en el flag `predefined: true/false`)
    - [x] Documentar los endpoints complementarios de reportería: `GET /incidents.last.hour` (polling incremental), `POST /data.export` + `GET /data.export` (exportación masiva asíncrona) y `GET /timetracking`
- [x] Task: Phase Verification & Checkpoint (Refer to workflow.md)

## Phase 2: Cross-Skill Integration & Package Registration

- [x] Task: Cross-Reference in `invgate-api` and `invgate-mcp`
    - [x] Actualizar `skills/invgate-api/SKILL.md` para referenciar `invgate-views` cuando se consulten vistas personalizadas o se busque evitar saturación de llamadas
    - [x] Actualizar `skills/invgate-mcp/SKILL.md` y `skills/invgate-mcp/references/mcp-tools.md` con la nota de `predefined` en `list_view_requests` y referencia a `invgate-views`
- [x] Task: Update Package & Conductor Manifests
    - [x] Agregar `"skills/invgate-views"` en `plugin.json`
    - [x] Actualizar la tabla de skills y el árbol de estructura en `README.md` y `conductor/product.md`
    - [x] Verificar que `npx invgate-skills list` liste correctamente `invgate-views`
- [x] Task: Phase Verification & Checkpoint (Refer to workflow.md)
