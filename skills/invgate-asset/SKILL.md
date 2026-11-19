---
name: invgate-asset
description: Use when working with InvGate Asset Management: inventory and asset lifecycle, discovery sources, agent and proxy, software deployment, contracts and purchasing, CMDB business applications, asset automations, dashboards or the Asset Management API.
---

# InvGate Asset Management

Inventory and CMDB platform. This skill covers how the data model works, where data comes from, and which guardrails apply before changing anything.

## Data Model

| Object | Meaning |
|---|---|
| Activo / CI | Any tracked item: computer, server, printer, switch, cloud resource, database, service, digital asset |
| Tipo de activo | Template that defines fields and behavior; custom types are supported |
| Campo personalizado | Extra attribute per asset type; CSV/XLSX import available |
| Etiqueta / Smart Tag | Manual or rule-based classification; smart tags re-evaluate on lifecycle change |
| Inventory ID | Stable identifier used by imports and integrations |
| Ubicación | Physical or logical location; used by visibility rules and dashboards |
| Centro de costo | Financial owner used in cost and depreciation reporting |
| Estado de ciclo de vida | Behavior selector, not just a label (see below) |
| Contrato | Licenses, leasing, subscriptions, renewals and compliance |
| Orden de compra | Purchasing flow with vendors, products and receipts |
| Aplicación de negocio | CMDB grouping of CIs with diagram, relationships, requests and activity |

### Configuration Map

Some builds label the same area `Config` or `Settings`; paths below point to the same screens.

| Setting | Path |
|---|---|
| Tipos de activo | Config > CIs > Tipos |
| Campos personalizados | Settings > CIs > Fields |
| Ciclo de vida | Config > CIs > Ciclo de vida |
| Medición de software | Config > CIs > Medición de software |
| Tags y Smart Tags | Settings > General > Tags |
| Inventory ID | Settings > Assets > Inventory ID |
| Discovery sources | Settings > Network > Discovery sources |
| Despliegue del agente | Config > Red > Despliegue del agente |
| Automatizaciones | Settings > Assets > Automations |
| Roles y permisos | Config > Usuarios > Permisos |
| API | Settings > Integrations > API |

- **Custom fields** apply to a chosen set of CI types (asset, cloud asset, digital asset, business application, audit, database, cost center, contract, vendor, location). Types: text, number, date/time, list, textarea. Multi-select values cannot be created or edited through CSV.
- **Asset types** define fields and icon. Non-native types can be disabled: no new assets, existing ones unchanged.
- **Tags** classify assets, owners, programs and versions. **Smart tags** apply automatically to assets matching explorer conditions; administrators can lock tags so only they manage them.
- **Inventory ID** templates define prefix, base number, minimum digits and suffix; a type can use the Inventory ID as the asset name, syncing both properties.

### Lifecycle States Matter

| Behavior | Visible in Activos | Keeps updating | Consumes license |
|---|---|---|---|
| Monitoreado | Yes | Yes | Yes |
| Oculto | Only when filtering by that state | Yes | Yes |
| No monitoreado | Only when filtering by that state | No, and cannot be edited | No |

License (IP devices) counts **discovered** assets in `Monitoreado` or `Oculto`. Manually created and non-monitored assets do not count. Do not change lifecycle state to "clean up" an inventory without checking license and automation effects.

## Where Inventory Comes From

```text
Agente  → endpoints (desktops, laptops, servers, macOS, Linux, Android)
Discovery → network scan for devices without an agent (printers, switches, routers, IP phones, databases)
Import  → CSV, API, integrations
Manual  → one asset at a time
```

- The **agent** reports hardware, software, usage and security data. It needs direct access to the instance or to an **InvGate proxy**.
- **Discovery** scans IP ranges with ICMP, TCP port scanning, DNS reverse lookup, mDNS and ARP. A discovered device is not an asset until it is inventoried/converted.
- **Discovery sources** pull from external systems: Active Directory (requires proxy 2.0+), Microsoft Intune/Entra, AWS, Azure, Google Workspace, Google Cloud, VMware, Hyper-V, JAMF, Workspace ONE, SOTI, Kubernetes, Apple Business/School Manager, Nmap, InvGate Discovery. Availability depends on version and plan.
- `Proxy ARP` covers devices that do not answer directly; discovery logs record each scan and its outcome.
- Deploy the agent from `Config > Red > Despliegue del agente` (manual, GPO, Intune, SCCM or another deployment tool).

## Modules

| Module | Use |
|---|---|
| Exploradores | Filterable CI lists with saved views, export and bulk actions |
| Tableros | Predefined and custom dashboards, financial planning, stock alerts |
| Software | Installed software, metering, cloud subscriptions, OS update explorer, compliance |
| Despliegue de software | Install, uninstall, scripts, Windows updates, approvals, pending reboot handling |
| Contratos | License types, leasing, renewals, warranty, Microsoft 365 contracts |
| Compras | Vendors, product catalog, purchase orders, shipments, cost centers |
| CMDB | Business applications, CI connections, relationship import via CSV |
| Automatizaciones | Event → conditions → actions; Pro/Enterprise only; deployment actions only on asset, agent or scheduler events |
| Auditorías | Physical audits, RFID mobile app, QR labels, external list search |

## CMDB and Connections

- A **connection** links two CIs directly (asset, person, cloud asset, database, business application) through a validated connection type. It is visible from both ends, in the `CIs relacionados` tab.
- Connection types live in `Config > CIs > Conexiones`. Native types cannot be edited or deleted; custom types define allowed source and target CI types.
- A **business application relationship** belongs to the BA diagram. It also appears in `CIs relacionados` with source `Aplicación de negocio` and can only be edited from the diagram.
- Connections appear as suggestions in the BA diagram. Accepting one creates an independent BA relationship; both rows remain.
- Connections are creatable through the public API and trigger automation events and variables.
- Permission to connect follows CI edit permission; there is no separate connection permission.
- When a connected CI is deleted, cleanup behavior is configurable.

## Contracts and Purchasing

- **Software contracts** register licenses and suites, and assign them manually or automatically to installed programs on assets or to users, depending on license type.
- **Asset contracts** register maintenance, rental, leasing, support or warranty, and link the covered assets.
- Both are CIs: they appear in `Contracts`, support custom fields, tags and contract metrics, and expose a `Contracts` column in other explorers.
- **Purchase orders** (`Compras > Órdenes de compra`) cover order creation, item reception, asset creation from the order and asset linking, with costs, taxes and shipping. Created assets inherit the order link for traceability.
- License types drive compliance: check `Software > Software compliance` before declaring an installation unlicensed.

## Software Deployment

A deployment is a **plan** that runs one or more **packages** on assets with the agent.

- A package groups ordered **actions**: script, install or uninstall. Each action declares predecessors, success/failure behavior and whether to stop the deployment on failure.
- A plan defines targets, the execution window (days and hours) and the packages to apply.
- Deployment needs the agent and the deployment module enabled on the instance (On-Premise may require activation separately).
- Approvals can gate a deployment; permission to deploy is role-based. Verify both before scheduling.

## Software Control

- **Policies** (`Software > Políticas de software`) classify titles as allowed, forbidden or under review, matching by exact title and version, title contains or title starts with.
- Assigning "all devices" to allowed disables that option for the other states to avoid overlapping rules; use tags for the exceptions.
- **Metering** (`Config > CIs > Medición de software`) samples running processes every 5 minutes on Windows agents and keeps 60 days of usage. Use it to reclaim paid licenses.
- **Software compliance** (`Contracts > Software Compliance`) compares installations against licenses. It requires metering and excludes SaaS and operating-system contracts.
- Missing-license math depends on license type: one per installation (`Device Installation`), one per CPU/core (`CPU or Core`), one per matching user when auto-assignment is enabled (`Users`).
- `Low Usage` means no usage in 30 days; `True-Up Cost` and `Potential Savings` are annual estimates in the instance currency. Report them as estimates, not accounting figures.

## Physical Audits

- Audits compare expected assets in a location against what is actually scanned. Available on Pro/Enterprise.
- Result states: `Esperado`, `Encontrado`, `Pendiente` (still open), `Faltante` (missing at close), `Mal ubicado`, `Excluido` (filtered out) and `Desconocido` (scanned but not in IGAM). Misplaced and excluded group as `Extra` in the explorer.
- Capture methods: RFID reader (asset needs the physical RFID label field), QR codes from the mobile app, or manual entry. Partial audits are supported.
- Editing the scope of an audit that already has results recalculates the expected set; review before closing.

## Reading the Data

- **Explorers** exist for Assets, Software, Contracts, CMDB, People, Locations and Activities. Views can export CSV/XLSX, be emailed, or produce a QR code.
- **Dashboards** include predefined boards (CI status, compliance, platform distribution) and custom ones, with global filters, PDF export and a refresh window of up to 15 minutes.
- **Atlas** (Cloud only, no configuration) enriches assets and software with lifecycle, end-of-support and manufacturer data; it feeds explorers, dashboards and automations.

## Roles and Visibility

- Default roles `Administrador` and `Técnico estándar` cannot be edited or deleted. Custom roles define CI permissions per type: `View`, `Edit`, `Manage`.
- Rules filter by tags and smart tags and are **incremental**: the most permissive matching rule wins.
- `Manage` applies its tag filter only to viewing and editing. A newly created asset without the required tags becomes invisible to that role.

## API and MCP

- REST API v2, JSON:API format, OAuth 2.0 client credentials. Documentation is served by the instance at `/public-api/swagger/v2/` (link under Settings > Integrations > API).
- General limit: **1,000 requests per minute**. Specific endpoints (`Assets-lite`, custom field values, `Health`) have plan-based limits.
- Credentials can be marked **read-only** (GET only). Without that flag they can POST and PATCH.
- Official **MCP server (Beta)** is read-only for Asset Management: `/mcp/v1`, Streamable HTTP, token prefix `ammcp_`. See `invgate-mcp`.
- Integrations with Service Management, Jira, ServiceNow, Zendesk, Lansweeper, M365 and CDW consume this API; prefer native connectors over custom scripts.

## Guardrails

- Never hardcode asset type, field, location or lifecycle IDs across instances. Resolve them live.
- Never invent discovery sources, protocols or plan entitlements. Confirm in `Settings` and the KB index.
- Bulk imports match assets by identifier. Export the current data first and edit that file to avoid creating duplicates.
- Merging assets combines two records into one and cannot be undone. Confirm before acting.
- Automations can deploy software and change lifecycle state. Review the conditions, not only the actions.

## Documentation

Official index of 211 Asset Management articles: [references/kb-index.md](references/kb-index.md).
Curated reading order: [references/reading-path.md](references/reading-path.md).
Operations: agent, proxy, discovery sources, financial model, deployment, exports: [references/operations.md](references/operations.md).
Platform-wide model and terminology: `invgate-basics`.
