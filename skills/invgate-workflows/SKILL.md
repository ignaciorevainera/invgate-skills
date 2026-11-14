---
name: invgate-workflows
description: Use when designing, analyzing, editing, converting, or visually diagramming (Mermaid) InvGate Service Management workflows (.sdw files) or defining approvals, routing, and automated steps.
---

# InvGate Workflows & SDW Engineering

This skill teaches how to inspect, edit, design, and convert InvGate Service Management workflows in `.sdw` format.

## SDW File Lifecycle

An `.sdw` file is a UTF-8 Base64 encoded JSON string representing the full workflow diagram.

### Conversion Commands

Convert between `.sdw` and readable `.json` using the built-in CLI:

```bash
# Decode .sdw to editable .json
npx invgate-skills sdw unpack workflow.sdw [workflow.json]

# Encode modified .json back to .sdw for InvGate import
npx invgate-skills sdw pack workflow.json [workflow.sdw]
```

---

## Workflow Editing Rules

When modifying workflow JSON definitions, strictly follow these integrity rules:

### 1. Unique Identifiers
* Node IDs, variable IDs, and field IDs must be unique **8-character alphanumeric strings** (e.g. `dcPTDxvH`, `44d573be`).
* Never duplicate IDs across nodes, fields, or conditions.

### 2. Graph Connectivity Invariants
For any connection between Node A and Node B:
* Add `B` to `A.chart.targetConnections`.
* Add `A` to `B.chart.sourceConnections`.
* When inserting Node C between A and B:
  1. Remove `B` from `A.chart.targetConnections`, add `C`.
  2. Remove `A` from `B.chart.sourceConnections`, add `C`.
  3. Set `C.chart.sourceConnections = [A]` and `C.chart.targetConnections = [B]`.

### 3. Canvas Positioning
* Always maintain non-overlapping coordinates in `chart.left` and `chart.top` (standard spacing is 250–300px horizontally or 150–200px vertically).

### 4. Variable Synchronization
* When adding a form field or action output that must be referenced by other steps, register the variable in `global.variables` with a unique 8-character ID.
* Reference variables using the `{{variable_id}}` interpolation syntax in titles, bodies, and formulas.

---

## Node Types Quick Reference

| Type ID | Config Type | Category | Description |
|---|---|---|---|
| `1` | - | **Inicio** | Workflow entry point; contains initial form fields. |
| `2` | - | **Fin** | Workflow terminal point; empty target connections. |
| `8` | - | **Bifurcación** | Conditional branching gateway (`conditions`). |
| `3` | `301` | **Formulario** | User input step with customizable form fields. |
| `3` | `303` | **Automatización** | Emails (`type 1`), Webhooks HTTP (`type 2`), InvGate API (`type 9`), Fórmulas (`type 10`). |
| `3` | `304` | **Tareas** | Operational task checklist assigned to agents. |
| `3` | `305` | **Aprobaciones** | Approval step; types `1` fixed users, `5` group quorum, `6` variable. Branches: accepted/rejected/cancelled. |
| `3` | `306` | **Acción InvGate** | Reassign (`3`), observers (`4`), child ticket (`16`), edit request (`17`), comment (`20`), announcement (`21`). |
| `3` | `307` | **Subproceso** | Parallel child requests (`form.items`), optionally dynamic per variable. |
| `3` | `310` | **Espera** | Timer or event pause (`waitingFor`). |

For the complete JSON schema and parameter mapping, consult [`references/sdw-schema.md`](file:///e:/Dev/proyectos/invgate-skills/skills/invgate-workflows/references/sdw-schema.md). For the full catalog of supported formula functions, consult [`references/formula-functions.md`](file:///e:/Dev/proyectos/invgate-skills/skills/invgate-workflows/references/formula-functions.md).

---

## Mermaid Workflow Diagramming

When asked to visually represent, design, or document an InvGate workflow using Mermaid, **prioritize horizontal layout (`flowchart LR`)** by default (use `flowchart TD` only if explicitly requested). Follow the official high-contrast color and shape standard:

| Node Type | Color / HEX | Mermaid Syntax | Class |
|---|---|---|---|
| **Inicio (Start)** | Verde Menta (`#E8F8F0`, stroke `#1E8449`) | `([ "Inicio: ..." ])` | `:::startNode` |
| **Solicitud / Formulario / Acciones** | Celeste Claro (`#EBF5FB`, stroke `#2471A3`) | `[ "Paso: ..." ]` | `:::requestNode` |
| **Condicional / Bifurcación** | Marfil Claro (`#FEFDE8`, stroke `#D4AC0D`) | `{"¿Condición?"}` (Rombo) | `:::conditionNode` |
| **Aprobación** | Cian Claro (`#E0F7FA`, stroke `#0097A7`) | `[ "Aprobación: ..." ]` | `:::approvalNode` |
| **Tarea** | Durazno Claro (`#FEF5E7`, stroke `#D35400`) | `[ "Tarea: ..." ]` | `:::taskNode` |
| **Subproceso** | Terracota Claro (`#FBEEE6`, stroke `#BA4A00`) | `[[ "Subproceso: ..." ]]` | `:::subprocessNode` |
| **Fórmula / Cálculo** | Lima Muy Claro (`#F4FBEA`, stroke `#689F38`) | `[ "Fórmula: ..." ]` | `:::formulaNode` |
| **Web Service / API** | Esmeralda Claro (`#E8F6F3`, stroke `#16A085`) | `[ "Web Service: ..." ]` | `:::webserviceNode` |
| **Espera de tiempo** | Lavanda Claro (`#F5EEF8`, stroke `#8E44AD`) | `[ "Espera: ..." ]` | `:::waitNode` |
| **Cancelación / Rechazo** | Rosa Claro (`#FDEDEC`, stroke `#C0392B`) | `([ "Cancelado: ..." ])` | `:::cancelNode` |
| **Fin de solicitud** | Gris Perla (`#F2F4F4`, stroke `#707B7C`) | `([ "Fin: ..." ])` | `:::endNode` |

Always include the corresponding `classDef` rules in the diagram. For clean rendering in **Excalidraw** and external Mermaid tools:
- Wrap all step labels in double quotes (`"..."`) and **never use HTML (`<br/>`) or Markdown (`**`)** inside labels.
- Keep lines concise (~25–30 chars max); use explicit `\n` for two-line labels instead of relying on automatic wrapping.
- When a step is owned by a specific support group/helpdesk, format as `"[Tipo]: [Grupo] - [Acción]"` or split with `\n` (`"Tarea: TI_Micro_Microinformática\nRemasterización a Stock"`).
- Explicitly label branch arrows (e.g. `-->|"Sí"|`, `-->|"Aprobado"|`).

For full class definitions and a complete multi-step example, consult [`references/mermaid-diagrams.md`](file:///e:/Dev/proyectos/invgate-skills/skills/invgate-workflows/references/mermaid-diagrams.md).

## Practices Observed in Real Workflows

* Store IDs returned by child-request, announcement, or API steps in a variable (`variable_store`, `receive.vars`) before later steps need them.
* Use `failAction: "continue"` / `failaction: "continue"` on non-critical automations so a failure does not block the process.
* Branch approvals on all three outcomes; route `next_cancelled` explicitly, usually with `next_rejected`.
* Compute derived text or status with formula steps (`IF`, `IsEmpty`, `CONCAT`) instead of duplicating gateways.
* Gateway rules on list fields compare the option `hash`, not the visible label. Read hashes from `global.variables[...].params.options`.
* Never recreate system variables (`requestNumber`, `wfCustomer`, ...); reference their existing ids.

## Live Verification

When an InvGate MCP server is available, use `invgate-mcp` to confirm enums (statuses, priorities, types), helpdesks, and category forms before referencing them in a workflow. Resolve IDs in the target instance; never copy IDs from a non-production instance into a `.sdw` file.
