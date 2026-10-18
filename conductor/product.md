# Product Definition: invgate-skills

## Vision & Summary
**invgate-skills** es un toolkit modular de skills de IA y utilidades CLI diseñado para asistir en el diseño, automatización, integración, inspección en vivo y documentación de **InvGate Service Management** en entornos como Google Antigravity, Claude Code y Codex.

## Core Capabilities
1. **`invgate-templates`**: Generación de plantillas HTML de descripción con reglas estrictas de etiquetas y estilos.
2. **`invgate-workflows`**: Ingeniería, inspección, edición y empaquetado/desempaquetado de flujos `.sdw` (Base64 JSON).
3. **`invgate-catalog`**: Estructuración de categorías hojas, jerarquías y campos personalizados del catálogo de servicios.
4. **`invgate-api`**: Construcción y ejecución de peticiones HTTP REST contra la API de InvGate.
5. **`invgate-mcp`**: Descubrimiento en vivo vía servidor MCP con reglas estrictas de precedencia de entornos (QA vs. Producción).
6. **`invgate-docs`**: Redacción técnica y operativa concisa en Markdown compatible con Notion y GitHub.
7. **`invgate-views`**: Consulta eficiente de solicitudes filtradas vía vistas personalizadas (`view_id`), polling y patrones anti-saturación.
8. **CLI (`bin/invgate-skills.js`)**: Instalador multi-entorno (`npx invgate-skills`) y conversor de flujos `.sdw` <-> `.json`.

## Target Users
Administradores de InvGate, ingenieros de automatización/DevOps y analistas de gestión de servicios que utilizan agentes de IA para acelerar la configuración y consulta de instancias de InvGate sin acoplar datos entre ambientes.
