# InvGate Workflows - Mermaid Diagramming Standard

This guide defines the official specification for generating visual representations of InvGate Service Management workflows in Mermaid format. Whenever a visual diagram of an `.sdw` workflow, process flow, or routing model is requested, follow this standard.

---

## 1. Node Types, Shapes, and Color Palette

The diagram uses `flowchart TD` (or `flowchart LR` when horizontal layout is preferred) with dedicated CSS classes (`classDef`) mapping to InvGate workflow node types:

| Node Type | InvGate Type | Shape Syntax | Color / Style | Description |
|---|---|---|---|---|
| **Inicio (Start)** | `type: 1` | `([ "Inicio: ..." ])` | Verde (`#2ecc71`) | Workflow entry point and initial category form |
| **Solicitudes / Formularios** | `type: 3` (`301`, `306`) | `[ "Paso: ..." ]` | Azul (`#3498db`) | User forms, ticket creation, edits, and incident actions |
| **Condicional / Bifurcación** | `type: 8` | `{"¿Condición?"}` | Amarillo (`#f1c40f`) | Gateway routing with conditional branch rules (Rombo) |
| **Aprobaciones** | `type: 3` (`305`) | `[ "Aprobación: ..." ]` | Cian (`#00bcd4`) | Approval steps (fixed, group quorum, or variable) |
| **Tareas** | `type: 3` (`304`) | `[ "Tarea: ..." ]` | Naranja (`#f39c12`) | Operational checklists assigned to agent groups |
| **Subprocesos** | `type: 3` (`307`) | `[[ "Subproceso: ..." ]]` | Naranja intenso (`#d35400`) | Subroutines / parallel child request triggers |
| **Fórmulas / Cálculos** | `type: 3` (`303` t:10) | `[ "Fórmula: ..." ]` | Verde Lima (`#8bc34a`) | Data transformation, text concat, mathematical logic |
| **Web Services / API** | `type: 3` (`303` t:2, 9) | `[ "Web Service: ..." ]` | Verde oscuro (`#1e824c`) | External HTTP webhooks or InvGate API triggers |
| **Espera de tiempo** | `type: 3` (`310`) | `[ "Espera: ..." ]` | Violeta (`#9b59b6`) | Timers, delays, or event wait pauses |
| **Cancelación / Rechazo** | Terminal | `([ "Cancelado: ..." ])` | Rojo (`#e74c3c`) | Rejection or cancellation branch exit point |
| **Fin de solicitud** | `type: 2` | `([ "Fin: ..." ])` | Gris (`#95a5a6`) | Successful completion and workflow termination |

---

## 2. Reusable Mermaid Class Definitions

Always declare these `classDef` rules at the beginning or end of your Mermaid flowchart:

```mermaid
flowchart TD
    %% Node Class Definitions
    classDef startNode fill:#2ecc71,stroke:#27ae60,stroke-width:2px,color:#fff;
    classDef requestNode fill:#3498db,stroke:#2980b9,stroke-width:2px,color:#fff;
    classDef conditionNode fill:#f1c40f,stroke:#d4ac0d,stroke-width:2px,color:#000;
    classDef approvalNode fill:#00bcd4,stroke:#0097a7,stroke-width:2px,color:#fff;
    classDef taskNode fill:#f39c12,stroke:#d68910,stroke-width:2px,color:#fff;
    classDef subprocessNode fill:#d35400,stroke:#a04000,stroke-width:2px,color:#fff;
    classDef formulaNode fill:#8bc34a,stroke:#689f38,stroke-width:2px,color:#000;
    classDef webserviceNode fill:#1e824c,stroke:#145a32,stroke-width:2px,color:#fff;
    classDef waitNode fill:#9b59b6,stroke:#8e44ad,stroke-width:2px,color:#fff;
    classDef cancelNode fill:#e74c3c,stroke:#c0392b,stroke-width:2px,color:#fff;
    classDef endNode fill:#95a5a6,stroke:#7f8c8d,stroke-width:2px,color:#fff;
```

---

## 3. Formatting & Diagram Rules

1. **Quote Node Labels**: Always wrap labels inside double quotes (e.g. `nodeId["Texto del paso"]`) to prevent syntax errors caused by parentheses, brackets, or accents.
2. **Explicit Transitions**: Label branch outcomes clearly on connecting arrows:
   - Conditional gateways: `-->|"Sí"|` and `-->|"No"|` (or matching rule names).
   - Approvals: `-->|"Aprobado"|`, `-->|"Rechazado"|`, and `-->|"Cancelado"|`.
3. **Class Application**: Apply classes via `:::className` syntax on each node definition or via `class nodeId className;`.

---

## 4. Complete Reference Example

Below is a complete workflow demonstrating all node types and their respective styles:

```mermaid
flowchart TD
    %% Class Definitions
    classDef startNode fill:#2ecc71,stroke:#27ae60,stroke-width:2px,color:#fff;
    classDef requestNode fill:#3498db,stroke:#2980b9,stroke-width:2px,color:#fff;
    classDef conditionNode fill:#f1c40f,stroke:#d4ac0d,stroke-width:2px,color:#000;
    classDef approvalNode fill:#00bcd4,stroke:#0097a7,stroke-width:2px,color:#fff;
    classDef taskNode fill:#f39c12,stroke:#d68910,stroke-width:2px,color:#fff;
    classDef subprocessNode fill:#d35400,stroke:#a04000,stroke-width:2px,color:#fff;
    classDef formulaNode fill:#8bc34a,stroke:#689f38,stroke-width:2px,color:#000;
    classDef webserviceNode fill:#1e824c,stroke:#145a32,stroke-width:2px,color:#fff;
    classDef waitNode fill:#9b59b6,stroke:#8e44ad,stroke-width:2px,color:#fff;
    classDef cancelNode fill:#e74c3c,stroke:#c0392b,stroke-width:2px,color:#fff;
    classDef endNode fill:#95a5a6,stroke:#7f8c8d,stroke-width:2px,color:#fff;

    %% Workflow Flow
    Start(["Inicio: Solicitud de Equipamiento"]):::startNode
    FormUserData["Formulario: Datos de Usuario y Puesto"]:::requestNode
    CalcBudget["Fórmula: Calcular Costo Estimado"]:::formulaNode
    CondBudget{"¿Costo > $1000?"}:::conditionNode
    ApprovalMgr["Aprobación: Gerente de Área"]:::approvalNode
    ApiInventory["Web Service: Reservar en ERP"]:::webserviceNode
    TaskIT["Tarea: Configuración de Equipo"]:::taskNode
    SubProcAccess[["Subproceso: Creación de Cuentas"]:::subprocessNode
    WaitDelivery["Espera: 48 Horas para Entrega"]:::waitNode
    UpdateTicket["Acción InvGate: Notificar Entrega"]:::requestNode
    EndSuccess(["Fin: Proceso Completado"]):::endNode
    CancelReq(["Cancelado: Solicitud Rechazada"]):::cancelNode

    %% Connections
    Start --> FormUserData
    FormUserData --> CalcBudget
    CalcBudget --> CondBudget
    
    CondBudget -->|"Sí"| ApprovalMgr
    CondBudget -->|"No"| ApiInventory
    
    ApprovalMgr -->|"Aprobado"| ApiInventory
    ApprovalMgr -->|"Rechazado"| CancelReq
    ApprovalMgr -->|"Cancelado"| CancelReq
    
    ApiInventory --> TaskIT
    TaskIT --> SubProcAccess
    SubProcAccess --> WaitDelivery
    WaitDelivery --> UpdateTicket
    UpdateTicket --> EndSuccess
```
