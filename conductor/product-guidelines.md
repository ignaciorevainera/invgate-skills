# Product Guidelines: invgate-skills

## 1. Skill Authoring Principles
- **Progressive Disclosure:** Cada skill tiene un `SKILL.md` conciso (< 500 palabras cuando sea posible) y delega esquemas extensos o catálogos de endpoints a archivos dentro de `references/`.
- **Trigger-Focused Descriptions:** El campo `description` del frontmatter YAML siempre inicia con `Use when...` describiendo síntomas y disparadores sin resumir el flujo interno.
- **Instance Agnosticism:** Ninguna skill debe contener IDs, nombres de mesas, categorías ni tokens hardcodeados de una instancia específica (como QA). Solo se documenta la estructura.

## 2. Voice, Tone & Formatting
- **Concisión Técnica (ASD-STE100):** Voz activa, modo imperativo, cero relleno.
- **Vocabulario Oficial de InvGate:** Usar los términos propios de la plataforma (Mesa de Ayuda / Help Desk, Categoría Hoja, Solicitud de Servicio, Variable de Proceso, Vista).
- **Markdown Compatible (Notion & GitHub):** Tablas GFM para matrices y referencias, diagramas `mermaid` para flujos y bloques `>` para callouts.

## 3. Efficiency & API Stewardship
- **Anti-Saturación:** Priorizar endpoints y herramientas que devuelvan lotes pre-filtrados (como Vistas `view_id`) por encima de múltiples llamadas individuales o iteraciones costosas.
