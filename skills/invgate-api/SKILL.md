---
name: invgate-api
description: Use when building, executing, or debugging HTTP API requests to InvGate Service Management, including tickets, incidents, workflows, users, and catalog operations.
---

# InvGate Service Management API

This skill provides patterns, authentication protocols, and endpoint references to build and execute HTTP requests against the InvGate Service Management (Service Desk) API.

## Base URL and Authentication

### Base URL
Each InvGate instance exposes its API under:
```text
https://[instance].cloud.invgate.net/api/v1
```
*(On-premises installations use `https://[your-domain]/api/v1`)*

### Rate Limits

The general API (`/api/v1/`) allows **1,000 requests per minute per instance**. On excess it returns HTTP `429` with a `Retry-After` value. Some endpoints (request create/update/read) have stricter plan-based limits, so batch reads instead of looping.

`GET /api/v1/` returns a JSON list of every available method with its parameters. Use it to confirm an endpoint name before coding.

### Authentication Methods

1. **OAuth 2.0 Client Credentials (Recommended)**

   Create credentials in `Config > Integraciones > API > Agregar`. Select the API resources and methods the integration needs; the credential is limited to them.

   ```text
   POST <access token URL from the credential>
   grant_type=client_credentials
   client_id=<client id>
   client_secret=<client secret>
   scopes=api.v1.incident:post api.v1.incident:get
   ```

   Scope format is `api.v1.<endpoint>:<method>`. Request one scope per endpoint and method; a missing scope is an authorization error, not a bad payload.

2. **Basic Authentication (Fallback)**

   Credentials also accept username and password. Use it only when the client cannot perform the OAuth exchange.

3. **Bearer API Token**

   Pass the obtained token in the `Authorization` header:
   ```http
   Authorization: Bearer <API_TOKEN>
   ```

4. **Session Token via `/user.token`**

   If authenticating programmatically on behalf of a user ID:
   ```bash
   POST /api/v1/user.token
   Content-Type: application/json

   { "id": 123 }
   ```
   Use the returned token in subsequent requests.

---

## Canonical Request Patterns

All mutating operations (`POST`, `PUT`, `PATCH`, `DELETE`) require `Content-Type: application/json` and return a standard response object:
```json
{
  "status": "OK",
  "info": "Operation description",
  "request_id": 1042
}
```
Errors return `{"status": "ERROR", "info": "Error details"}`.

### 1. Create Incident / Ticket (`POST /incident`)
```bash
curl -X POST "https://[instance].cloud.invgate.net/api/v1/incident" \
  -H "Authorization: Bearer $INVGATE_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "creator_id": 10,
    "customer_id": 15,
    "title": "VPN connection failure",
    "description": "Unable to establish VPN tunnel from remote site",
    "priority_id": 3,
    "type_id": 1,
    "category_id": 45
  }'
```

*Key values:*
- `type_id`: `1` (Incident), `2` (Service Request), `3` (Question), `4` (Problem), `5` (Change), `6` (Major Incident)
- `priority_id`: `1` (Low), `2` (Medium), `3` (High), `4` (Urgent), `5` (Critical)

### 2. Add Comment to Incident (`POST /incident.comment`)
```bash
curl -X POST "https://[instance].cloud.invgate.net/api/v1/incident.comment" \
  -H "Authorization: Bearer $INVGATE_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "id": 1042,
    "user_id": 10,
    "comment": "Troubleshooting completed; waiting for user verification."
  }'
```

### 3. Reassign Incident (`PUT /incident.reassign`)
```bash
curl -X PUT "https://[instance].cloud.invgate.net/api/v1/incident.reassign" \
  -H "Authorization: Bearer $INVGATE_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "id": 1042,
    "user_id": 10,
    "helpdesk_id": 4,
    "agent_id": 22
  }'
```

### 4. Batch Read (`GET /incidents`)

Read many requests in one call instead of looping over `/incident`:

```bash
GET /api/v1/incidents?ids[]=1042&ids[]=1043&ids[]=1044
```

Accepts up to **200 IDs per call** and returns the same structure as `/incident`. For views and large datasets use `invgate-views`.

`/incident` does **not** include task data. Read tasks with `/incident.tasks` separately.

---

## Domain Reference Index

When looking up specific endpoints, inspect the corresponding reference file:

| Domain | Reference File | Covered Operations |
|---|---|---|
| **API Endpoint Index** | `references/endpoint-index.md` | Full catalog of all 166 REST API endpoints from official manual |
| **Requests In-Depth Guide** | `references/requests-guide.md` | Request lifecycle, `field_uid_<ID>`, process creation, `reassignment: true`, enums, BI/OLAP architecture |
| **Incidents & Tickets** | `references/incidents.md` | `/incident`, `/incidents`, comments, approvals, solutions, custom fields, reassign, status transitions |
| **Users & Orgs** | `references/users-organizations.md` | `/user`, `/users`, `/groups`, `/companies`, `/helpdesks`, `/locations`, `/levels` |
| **Catalog & Custom Fields** | `references/catalog-custom-fields.md` | `/categories`, `/cf.fields.all`, `/cf.field.options.list`, `/cf.field.options.tree` |
| **Workflows** | `references/workflows.md` | `/wf.request`, `/wf.deploy`, `/wf.initialfields.by.category`, `/workflow.field.list.values` |
| **Knowledge Base & System** | `references/knowledge-system.md` | `/kb.articles`, `/kb.categories`, `/breakingnews`, `/timetracking`, `/data.export`, `/sd.version` |
| **Views & Reporting** | `skills/invgate-views` | `/incidents.details.by.view`, `/incidents.by.view`, `/incidents.last.hour`, anti-saturation patterns |

---

## Common Mistakes & Troubleshooting

| Issue | Cause | Solution |
|---|---|---|
| `401 Unauthorized` | Missing or invalid API token | Verify `Authorization: Bearer <token>` header and ensure user has API permissions in InvGate. |
| `status: ERROR` on `/incident` | Missing required fields | Ensure `category_id`, `user_id`, and `title` are provided (`description` is mandatory for tickets, optional for processes). |
| Custom fields not saving | Passing raw names instead of IDs | Query `/cf.fields.by.category` to obtain IDs. On ticket creation, inject directly via `field_uid_<ID>: <value>`. Otherwise use `/incident.custom_field`. |
| Submitting workflows | Misunderstanding workflow creation | Workflows can be triggered via `POST /incident` with the workflow's `category_id` (passing initial variables as parameters) or inspected via `/wf.request`. |
| Manual assignment conflicts | Hardcoding agents when rules exist | Set `"reassignment": true` on `PUT /incident` to let InvGate's routing rules automatically assign the request. |
| Polling `/incidents` for BI | Heavy server load & rate limiting | Never poll `GET /incidents` in loops. Use a view (`invgate-views`) or a data export report (`POST /data.export`). The OLAP API is **deprecated from v8.22**. |
| OAuth call rejected | Scope missing or wrong method | Request every `api.v1.<endpoint>:<method>` the integration uses; one scope per method. |
| Reading tasks returns nothing | `/incident` does not include tasks | Call `/incident.tasks` for the request. |

## Official Documentation

Curated KB links, by task: [`references/official-kb.md`](references/official-kb.md). Start with article 1045 (credentials and limits) and 1648 (scopes).

## Live Verification

Before building payloads, verify attributes, enums, and category forms with `invgate-mcp` when an MCP server is available. If none is available, rely on the references above and state that nothing was verified live. MCP IDs from a non-production instance must never be copied into API calls for another instance.

## Citing the Source

When the answer depends on a topic with a **dedicated** KB article, close the response with:

Más información:
- [Título del artículo](https://support.invgate.com/knowledgebase_articles/show/index/article_id/1550) — KB #1550

- Up to **3** citations, one per distinct topic covered in the answer.
- Only dedicated articles. No article, no citation; never infer an ID.
- Prefer links from `references/official-kb.md`, then `kb-index.md`.
- Omit when the answer comes from live instance data or is a design recommendation.
- Use the label in the user's language (`Más información` / `Further reading`).
