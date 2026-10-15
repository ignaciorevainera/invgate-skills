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

### Authentication Methods

1. **Bearer API Token (Recommended)**
   Pass the API token in the `Authorization` header:
   ```http
   Authorization: Bearer <API_TOKEN>
   ```

2. **Session Token via `/user.token`**
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

---

## Domain Reference Index

When looking up specific endpoints, inspect the corresponding reference file:

| Domain | Reference File | Covered Operations |
|---|---|---|
| **Incidents & Tickets** | `references/incidents.md` | `/incident`, `/incidents`, comments, approvals, solutions, custom fields, reassign, status transitions |
| **Users & Orgs** | `references/users-organizations.md` | `/user`, `/users`, `/groups`, `/companies`, `/helpdesks`, `/locations`, `/levels` |
| **Catalog & Custom Fields** | `references/catalog-custom-fields.md` | `/categories`, `/cf.fields.all`, `/cf.field.options.list`, `/cf.field.options.tree` |
| **Workflows** | `references/workflows.md` | `/wf.request`, `/wf.deploy`, `/wf.initialfields.by.category` |
| **Knowledge Base & System** | `references/knowledge-system.md` | `/kb.articles`, `/kb.categories`, `/breakingnews`, `/timetracking`, `/data.export`, `/sd.version` |

---

## Common Mistakes & Troubleshooting

| Issue | Cause | Solution |
|---|---|---|
| `401 Unauthorized` | Missing or invalid API token | Verify `Authorization: Bearer <token>` header and ensure user has API permissions in InvGate. |
| `status: ERROR` on `/incident` | Missing required fields | Ensure `creator_id`, `customer_id`, `title`, `priority_id`, `type_id`, and `category_id` are provided. |
| Custom fields not saving | Passing raw names instead of IDs | Query `/cf.fields.by.category` to obtain field IDs, then use `/incident.custom_field`. |
| Submitting workflows | Calling `/incident` instead of `/wf.request` | Use `/wf.request` with the required initial fields from `/wf.initialfields.by.category`. |

## Live Verification

Before building payloads, verify attributes, enums, and category forms with `invgate-mcp` when an MCP server is available. If none is available, rely on the references above and state that nothing was verified live. MCP IDs from a non-production instance must never be copied into API calls for another instance.
