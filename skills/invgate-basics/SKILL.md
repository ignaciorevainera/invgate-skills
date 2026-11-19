---
name: invgate-basics
description: Use when explaining how InvGate works, onboarding a team, choosing where a configuration belongs, or answering "how do I..." questions about Service Management and Asset Management (helpdesks and levels, request states, SLA/OLA, catalog, automations versus processes, inventory and discovery).
---

# InvGate Platform Basics

Operating model for **InvGate Service Management (IGSM)** and **InvGate Asset Management (IGAM)**. Use it to orient a design before touching configuration, and to route a question to the right specialized skill.

## Two Products, One Platform

| Product | Purpose | Core object |
|---|---|---|
| Service Management | Service desk, ITIL workflows, requests, SLAs, knowledge base | Solicitud (request) |
| Asset Management | Inventory, discovery, software deployment, contracts, CMDB | Activo / CI |

Separate instances and licenses. They integrate (assets linked to requests, CIs updated from processes), but neither is required for the other.

## Service Management Structure

```text
Mesa de ayuda
└── Submesa / Nivel  ← categories are assigned HERE, not to the parent
    └── Agentes + Coordinadores
```

- **Agente**: resolves requests, consumes a license.
- **Coordinador**: manages one helpdesk, subhelpdesk or level and its requests.
- **Administrador**: full configuration access.
- **Usuario final**: creates requests and follows them, no license.

A category points to a **level**, because assignment rules live there. Pointing it to the parent helpdesk sends work to coordinators instead of agents.

### Helpdesk Configuration

| Setting | Effect |
|---|---|
| Mesa predeterminada | Receives requests that cannot be assigned or escalated |
| Reasignación | "Solo niveles" (default) or "mesas de ayuda y niveles" |
| Acceso restringido | Observers see metrics only; internal comments limited to the assigned helpdesk |
| Ausencias por agente | Agents manage their own absences |

Level names are generated from the helpdesk name and number (`Soporte Nivel 1`); they cannot be renamed independently.

Assignment engine, per level:

| Engine | Behavior |
|---|---|
| Round robin | Rotates requests across agents |
| Libre | Agents take requests; all agents get the pending-assignment notice |
| Decisión del coordinador | Coordinators assign; only coordinators are notified |
| Carga de trabajo | Assigns to the agent with the least pending work |
| Asignación inteligente | AI selects the agent by experience, availability and load |

Working hours: `Config > Mesas de ayuda > Jornadas laborales`. Shifts define days and time ranges; holidays are loaded from an `.ics` file and attached per helpdesk. The same calendar feeds working-hour SLAs and the automation condition **Momento de ejecución**.

### Request Lifecycle

| ID | Estado | Enters when |
|---|---|---|
| 1 | Nuevo | Created by API, scheduled, or in a free-assignment helpdesk, before assignment |
| 2 | Abierto | Assigned to helpdesk or agent |
| 3 | Pendiente | Customer replies |
| 4 | En espera | Agent replies, or waits for customer/date/approval |
| 5 | Solucionado | Agent submits a solution |
| 6 | Cerrado | Solution accepted, or auto-closed by timeout/inactivity |
| 7 | Rechazado | Agent rejects |
| 8 | Cancelado | Agent or customer cancels |

State changes drive SLAs and automations. Never assume a fixed sequence: rejection, cancellation and reopening are all valid transitions.

## Configuration Layers

Pick the smallest layer that solves the need. Each layer depends on the previous one, so build top-down.

| Layer | Answers | Where (SM) |
|---|---|---|
| Tipos de solicitud | What kind of work is this? Predefined 1–6 plus up to 10 active custom types | Config > Solicitudes > Tipos |
| Catálogo | Who can request what, and which level serves it | Config > Catálogo |
| Campos personalizados | What extra data is captured | Config > Solicitudes > Personalizaciones |
| Plantilla de descripción | How the request form looks and what is mandatory at creation | Config > Solicitudes > Personalizaciones |
| Automatizaciones | What happens on an event (create, reply, state change, field change) | Config > Solicitudes > Automatizaciones |
| Procesos | What multi-step path the request follows (forms, approvals, tasks, waits) | Config > Solicitudes > Procesos |
| SLA / OLA | How response and resolution time are measured | Config > Solicitudes > SLA |
| Vistas / Tableros / Reportes | How work and performance are read | Solicitudes / Config > Reportes |

### Choosing the Layer

| Need | Use |
|---|---|
| Standardize captured data only | Category + custom fields + description template |
| Route by condition, no multi-step path | Automations or category assignment rules |
| Approvals, stages, tasks, child requests, integrations | Process |
| Contractual response/resolution targets | SLA (client-facing) or OLA (internal) |
| Recurring analysis or export | Saved view, dashboard or data export report |

**Rule**: a template alone can be a complete solution. Do not add a process just to collect fields.

### SLA and OLA

- **SLA de primera respuesta**: creation → first visible reply by *any* technical user with access, not only the assignee.
- **SLA de resolución**: creation → solution submitted.
- Time can run on calendar hours or working hours (helpdesk schedule + holidays). Only working-hours clocks can be paused.
- Once an SLA reaches `Correcto` it is not re-evaluated.
- **OLA** lives on the same screen (`Config > Solicitudes > SLA & OLA`) and requires at least one helpdesk. It can pause by schedule (helpdesk, custom shift, or never) and by waiting state: customer, date, external entity, request, automatic activity.
- Both can carry elapsed time across consecutive rules ("desde el mismo OLA" / "desde diferente OLA"). Decide this before splitting a target into stages.

### Approvals and Participants

- Three approval types: **solution confirmation** (client accepts or rejects the fix, with optional expiry, default rating and reminders), **custom** (predefined flows) and **spontaneous** (agent picks the approver).
- Spontaneous approvals can pause SLA and OLA while pending; cancellation rights are configurable (author, assigned agent, coordinator, always administrators).
- **Observador**: sees activity, cannot act. Becomes **colaborador** after commenting or acting. **Seguidor**: subscribes to notifications.
- Users become observers by mention, CC on inbound email, task assignment, approval vote or automation. End users can add observers only if the option is enabled in `Config > Solicitudes > General`.
- **External users** interact only by email: they create requests, receive updates, approve solutions and rate them, but cannot act as approvers inside the platform. They are generated from mail interaction (or created via API) and can be converted to internal users, never the reverse.

### Self-Service Portal

- Managed at `Config > General > Portales`. The new design is **Cloud only** and can be previewed with sample data before activation.
- Appearance: preset or custom style (JPG/PNG), brightness and solid/acrylic transparency. Users with reduced transparency enabled always see the solid version.
- The search bar and the Virtual Service Agent stay visible at the bottom of the home page; pending approvals and open requests are grouped automatically.
- Conversational categories can force the agent interaction before a request is created.
- Manual migration is possible until **January 2027**; after that the new portal is applied automatically.

## Asset Management Structure

```text
Activo / CI ── tipo de activo, campos personalizados, etiquetas, ubicación, centro de costo
   ├── inventario: hardware, software, cloud, servicios
   ├── contratos y licencias
   ├── compras (órdenes, proveedores, catálogo de productos)
   └── CMDB: aplicaciones de negocio y relaciones entre CIs
```

- Data arrives from the **agent** (endpoints, richest detail), **discovery** (network scan for devices without an agent: printers, switches, routers, IP phones) or manual/CSV/API import.
- Discovery finds devices; a discovered device becomes an asset when inventoried. `Proxy ARP` covers devices that do not answer directly.
- **Lifecycle state** decides behavior: `Monitoreado` and `Oculto` stay updated and consume license; `No monitoreado` is frozen and does not consume license.
- **Automations** (Pro/Enterprise plans) run on asset, agent or scheduler events: email, update fields, deploy software. Deployment actions are only available for those event types.

## Where the Details Live

- Service Management: [references/kb-index.md](references/kb-index.md) — 358 official articles grouped by category.
- Curated reading order (Tier 1 / Tier 2): [references/reading-path.md](references/reading-path.md).
- Operations: email channel, users and provisioning, notifications, security, AI Hub, releases, upgrades: [references/operations.md](references/operations.md).
- Asset Management: `invgate-asset` and its own KB index.
- Official KB home: `https://support.invgate.com/knowledgebase_articles/list`

| Question | Skill |
|---|---|
| Catalog, categories, custom fields, request types | `invgate-catalog` |
| Description templates | `invgate-templates` |
| Process design and `.sdw` files | `invgate-workflows` |
| API calls, credentials, scopes | `invgate-api` |
| Views, reporting, bulk export | `invgate-views` |
| Writing SOPs and KB articles | `invgate-docs` |
| MCP server and live inspection | `invgate-mcp` |
| Inventory, discovery, CMDB | `invgate-asset` |

## Rules

- Verify names, IDs and options against the target instance. Nothing from this skill is instance data.
- Quote the official article link when a statement comes from the KB; it changes between versions.
- State the product and version when behavior differs (Cloud vs On-Premise, LTS line).
