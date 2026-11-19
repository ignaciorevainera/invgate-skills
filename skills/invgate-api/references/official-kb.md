# Official API Articles (InvGate Knowledge Base)

Curated from the Spanish KB (`support.invgate.com`) on 2026-11-18. Full index: `invgate-basics/references/kb-index.md`.

| Article | ID | Answers |
|---|---|---|
| Guía básica de API para Service Management | [1045](https://support.invgate.com/knowledgebase_articles/show/index/article_id/1045) | Credential types, OAuth 2.0 and Basic auth, 1,000 req/min limit, most-used endpoints, API URL location |
| Alcances (Scopes) en la API | [1648](https://support.invgate.com/knowledgebase_articles/show/index/article_id/1648) | Scope format `api.v1.<endpoint>:<method>` and OAuth token requests |
| Configuración de credenciales y Postman | [1577](https://support.invgate.com/knowledgebase_articles/show/index/article_id/1577) | Creating credentials, enabling General vs OLAP API access, Postman OAuth setup |
| Gestión de solicitudes | [1763](https://support.invgate.com/knowledgebase_articles/show/index/article_id/1763) | `/incident` POST/PUT/GET, `/incidents` GET, enums, attachments, response fields |
| Gestión de usuarios | [1780](https://support.invgate.com/knowledgebase_articles/show/index/article_id/1780) | `/user` and `/users`, `include_disabled`, bulk operations beyond the 100-record UI limit |
| Campos personalizados | [1761](https://support.invgate.com/knowledgebase_articles/show/index/article_id/1761) | `/incident.custom_field` payloads per field type: options, UNIX dates, users, files |
| Creación de procesos | [1768](https://support.invgate.com/knowledgebase_articles/show/index/article_id/1768) | Starting a process through `POST /incident` with initial-stage variables |
| Crear solicitudes con campos personalizados | [1504](https://support.invgate.com/knowledgebase_articles/show/index/article_id/1504) | `field_uid_<ID>` on creation, with Postman walkthrough |
| Buenas prácticas `/incident` vs `/incidents` | [1236](https://support.invgate.com/knowledgebase_articles/show/index/article_id/1236) | Batch reads, 200-ID limit, `/incident.tasks` |
| Obtener solicitudes de una vista vía API | [1275](https://support.invgate.com/knowledgebase_articles/show/index/article_id/1275) | `view_id`, `page_key`, `data`/`metadata`/`next_page_key` |
| Inicializar procesos y publicar | [1285](https://support.invgate.com/knowledgebase_articles/show/index/article_id/1285) | `wf.initialfields.by.category`, `PUT /wf.deploy`, scope `api.v1.wf.deploy:put` |
| Adjuntar archivo en comentario | [1208](https://support.invgate.com/knowledgebase_articles/show/index/article_id/1208) | Multipart comment attachment from Postman |
| Creación de solicitud con adjuntos (PHP) | [243](https://support.invgate.com/knowledgebase_articles/show/index/article_id/243) | Multipart request example |
| Llamadas API masivas con Postman | [1254](https://support.invgate.com/knowledgebase_articles/show/index/article_id/1254) | Collections and bulk execution |
| Ubicaciones vía API | [1579](https://support.invgate.com/knowledgebase_articles/show/index/article_id/1579) | Creating and importing locations |
| API OLAP | [1108](https://support.invgate.com/knowledgebase_articles/show/index/article_id/1108) | Endpoint list and paging; **deprecated from v8.22** |
| Power BI con API OLAP | [1111](https://support.invgate.com/knowledgebase_articles/show/index/article_id/1111) | Legacy BI connection; use the data export report instead |
| API para Asset Management | [541](https://support.invgate.com/knowledgebase_articles/show/index/article_id/541) | IGAM REST/JSON:API API, OAuth 2.0, Swagger, 1,000 req/min |

## Asset Management API

| Article | ID | Answers |
|---|---|---|
| Credenciales de API en AM y Postman | [1586](https://support.invgate.com/knowledgebase_articles/show/index/article_id/1586) | Client credentials and token generation |
| Endpoint `/Assets-lite` | [655](https://support.invgate.com/knowledgebase_articles/show/index/article_id/655) | Lightweight asset export |
| Nuevos endpoints de software y OS | [1897](https://support.invgate.com/knowledgebase_articles/show/index/article_id/1897) | Installations and OS updates endpoints |
| Ubicaciones vía API en AM | [1588](https://support.invgate.com/knowledgebase_articles/show/index/article_id/1588) | Location import |
| Llamadas masivas en AM con Postman | [1563](https://support.invgate.com/knowledgebase_articles/show/index/article_id/1563) | Bulk calls |
