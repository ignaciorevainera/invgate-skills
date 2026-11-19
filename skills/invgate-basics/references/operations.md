# Operations & Administration — Service Management

Durable operational behavior for Tier 3 topics. No instance-specific values: replace `[instance]`, names and IDs with the target environment.

## Email Channel

- Inbound email becomes a request automatically. Outbound uses the notification templates.
- InvGate imposes no inbound limit; the provider does. Microsoft 365 accepts 3,600 messages per hour per subscription, with additional per-sender limits enforced by Microsoft.
- Routing by content: an automation with event **Nueva solicitud**, condition **Origen = Correo** and `Asunto contiene` / `Descripción contiene`, action **Reasignar solicitud**.
- An inbound account can be bound to a catalog category, so the mailbox itself selects the category.
- **External users** interact only by email: they can create requests, receive updates, approve solutions and rate them, but cannot act as approvers inside the platform. They cannot be created manually or by CSV; they are generated from mail interaction or via `POST /user`. They can be converted to internal users, not the reverse.

## Users, Roles and Licensing

| Type | Access | Created by |
|---|---|---|
| Internal | Full UI | Manual, CSV, API |
| External | Email only | Mail interaction, API |
| LDAP | UI, validated by directory | Provisioning |
| SCIM | UI, validated by identity provider | Provisioning |

- Roles: Administrador, Coordinador (helpdesk), Agente (level). Agents and coordinators consume a license; end users do not.
- Additional **configuration roles** grant access to selected settings sections only (`Config > Usuarios > Roles y permisos`). Only administrators manage roles.
- Concurrent-license sessions can be closed after inactivity.

## Notifications

- Templates live at `Config > Usuarios > Notificaciones`, per event, with an email variant.
- Variables are template-specific; the editor lists them. Common ones: `{{TICKET_TITLE}}`, `{{TICKET_CATEGORY}}`, `{{TICKET_CUSTOMER}}`, `{{TICKET_URL}}`, `{{TICKET_PARTICIPANTS}}` (up to 100 participants with role and email).
- `Restablecer plantilla` returns to the default text.

## Security

- External links show a warning with the destination URL. Administrators can allowlist sites (`Config > General > General > Otros`) using one wildcard per URL (`https://*.example.com`, `https://example.com.*`).
- Password policy, file-extension restrictions and SSL configuration are instance-level settings. On-Premise certificate changes require the server.
- Firewall allowlists for platform assets must include the InvGate wildcard domains; a strict firewall otherwise breaks images, attachments and static resources.

## AI Hub and Gamification

- AI Hub is at `Config > AI Hub`. Cloud from v7.71, On-Premise from v7.77.
- `InvGate AI Service` is the provider. It uses the instance knowledge base; disabling it disables the whole AI Hub.
- Submodules: agent assistance (enhanced replies, summaries), proactive detection (similar requests, major incidents, sentiment), Virtual Service Agent, knowledge management (snippets, article generation).
- Gamification (`Config > Gamification`) awards points for requests, replies, KB, SLA, solution confirmation and approvals; points reset per configured period, badges persist.

## Releases and Upgrades

- A new version ships every two weeks, with hotfixes between releases.
- **LTS** releases every six months, bug and security fixes only, supported for six months plus three for security/performance.
- Cloud Enterprise can choose LTS; On-Premise LTS suits organizations that cannot upgrade every two weeks.
- On-Premise upgrade requires: version compatibility check, maintenance window (1 hour minimum), VM snapshots, full database backup, copy of `config`, `indexes`, `uploads`, `logs`, and a tested rollback plan. Services and queues must be stopped before running the installer.

## Search, Replies and Reporting

- Global search covers requests, users, helpdesks and companies. Free text needs at least 3 characters; IDs have no minimum. Double quotes search a phrase, not an exact literal.
- **Response templates** (`Config > Solicitudes > Personalizaciones > Plantillas de respuesta`): global templates scoped to helpdesks and categories, plus personal templates per agent. Both accept request variables.
- **Interval report**: splits each request into intervals delimited by changes in helpdesk/level, wait type, assigned agent or customer. Includes solved, closed, rejected and cancelled requests, and separates customer, agent and external-entity waiting time. Exportable through the `Intervalos de solicitudes` data source.
