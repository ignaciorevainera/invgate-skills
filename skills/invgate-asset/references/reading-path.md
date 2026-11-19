# Reading Path — Asset Management

Which of the 211 Asset Management KB articles to read, and in what order. Tier 1 = changes how you model inventory or explains a behavior that affects data integrity. Installation, proxy deployment, per-source connector details, logs, troubleshooting and licensing setup are Tier 3 by design.

## Tier 1 — Non-negotiable (15)

| # | Article | ID | Why |
|---|---|---|---|
| 1 | Guía de inicio para Asset Management | [1733](https://support.invgate.com/knowledgebase_articles/show/index/article_id/1733) | Module map, agent/proxy, first configuration order |
| 2 | Descubrimiento de activos | [808](https://support.invgate.com/knowledgebase_articles/show/index/article_id/808) | Discovery vs agent, what each protocol collects, converting devices |
| 3 | Detalles sobre Discovery | [1095](https://support.invgate.com/knowledgebase_articles/show/index/article_id/1095) | ICMP, TCP, DNS, mDNS, ARP behavior |
| 4 | Configurar Discovery Sources | [1177](https://support.invgate.com/knowledgebase_articles/show/index/article_id/1177) | Source catalog, AD proxy requirement, external systems |
| 5 | Agente de Asset Management | [813](https://support.invgate.com/knowledgebase_articles/show/index/article_id/813) | Supported OS, prerequisites, connectivity |
| 6 | Estado de ciclo de vida | [915](https://support.invgate.com/knowledgebase_articles/show/index/article_id/915) | Tracked/hidden/non-monitored behavior and license impact |
| 7 | Campos personalizados | [906](https://support.invgate.com/knowledgebase_articles/show/index/article_id/906) | Field types, CI types, CSV limitation |
| 8 | Tipos de activos personalizados | [908](https://support.invgate.com/knowledgebase_articles/show/index/article_id/908) | Type creation and disabling |
| 9 | Tags y Smart Tags | [911](https://support.invgate.com/knowledgebase_articles/show/index/article_id/911) | Classification, automatic tags, locking |
| 10 | Inventory ID | [913](https://support.invgate.com/knowledgebase_articles/show/index/article_id/913) | Identifier templates and name sync |
| 11 | Roles y permisos | [677](https://support.invgate.com/knowledgebase_articles/show/index/article_id/677) | Default vs custom roles, CI permissions |
| 12 | Contratos | [798](https://support.invgate.com/knowledgebase_articles/show/index/article_id/798) | Software vs asset contracts, license assignment |
| 13 | Órdenes de compra | [1979](https://support.invgate.com/knowledgebase_articles/show/index/article_id/1979) | Order → reception → asset traceability |
| 14 | Despliegue de software y configuraciones | [1142](https://support.invgate.com/knowledgebase_articles/show/index/article_id/1142) | Packages, actions, plans, execution windows |
| 15 | Políticas de software | [1762](https://support.invgate.com/knowledgebase_articles/show/index/article_id/1762) | Allowed/forbidden/review classification |

## Tier 2 — Read before a specific design

| Article | ID | Topic |
|---|---|---|
| Aplicaciones de negocio (CMDB) | [723](https://support.invgate.com/knowledgebase_articles/show/index/article_id/723) | Business applications, diagrams, CI relationships |
| Vistas de CIs | [1536](https://support.invgate.com/knowledgebase_articles/show/index/article_id/1536) | Explorer views, email export, QR |
| Tableros predefinidos | [1224](https://support.invgate.com/knowledgebase_articles/show/index/article_id/1224) | Dashboard content, refresh window |
| Atlas | [2006](https://support.invgate.com/knowledgebase_articles/show/index/article_id/2006) | Lifecycle and end-of-support enrichment (Cloud) |
| Medición de software | [967](https://support.invgate.com/knowledgebase_articles/show/index/article_id/967) | Usage sampling and 60-day retention |
| Reglas de visibilidad | [1298](https://support.invgate.com/knowledgebase_articles/show/index/article_id/1298) | Tag filters, incremental rules |
| Guía de automatizaciones | [756](https://support.invgate.com/knowledgebase_articles/show/index/article_id/756) | Events, conditions, deployment actions |
| Guía básica de API | [541](https://support.invgate.com/knowledgebase_articles/show/index/article_id/541) | OAuth, Swagger v2, limits, read-only credentials |
| Servidor MCP | [2122](https://support.invgate.com/knowledgebase_articles/show/index/article_id/2122) | Official read-only MCP server |
| Crear y gestionar CIs | [2128](https://support.invgate.com/knowledgebase_articles/show/index/article_id/2128) | CI connections and relationship modeling |
| Software compliance | [1158](https://support.invgate.com/knowledgebase_articles/show/index/article_id/1158) | License compliance calculation |
| Auditorías físicas | [2087](https://support.invgate.com/knowledgebase_articles/show/index/article_id/2087) | Physical audit workflow |

## Tier 3 — Operational, summarized separately

Installation, proxy and agent deployment recipes, per-source connector walkthroughs, deployment procedures, third-party integration setup, logs, AI Hub, mobile app and licensing operations are captured as durable behavior in [operations.md](operations.md). Read the original article only when the task is exactly that procedure.
