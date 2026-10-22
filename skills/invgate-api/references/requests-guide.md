# InvGate Service Management - Requests (Incidents & Processes) In-Depth Guide

This guide provides deep technical patterns, parameter behaviors, and operational best practices for managing requests (incidents, problems, changes, service requests, and workflow processes) via the InvGate Service Management REST API.

---

## 1. Request Lifecycle & Concept

In InvGate Service Management, every ticket or process is identified internally as a **request** (often mapped to the `/incident` endpoints).

Requests can be:
- **Standard Tickets**: Categorized as Incidents, Problems, Changes, or Service Requests (`type_id` 1–4).
- **Process / Workflow Requests**: Requests initiated from an automated workflow or process template associated with a category.

---

## 2. Request Creation (`POST /incident`)

Creates a new ticket or triggers a process.

### Parameters Summary

| Parameter | Type | Required | Description |
|---|---|---|---|
| `category_id` | `INTEGER` | Yes | Category ID. Determines catalog rules, SLA policies, and associated workflows. |
| `user_id` | `INTEGER` | Yes | Customer / Requestor user ID. |
| `title` | `STRING` | Yes | Request subject / title. |
| `description` | `STRING` | Conditional | Request details / body. **Optional** when creating process requests. |
| `priority_id` | `INTEGER` | No | Priority level (1–4). If omitted, falls back to category default. |
| `source_id` | `INTEGER` | No | Request origin source ID (see Enum Reference below). Default is usually 5 (API) or 1. |
| `assigned_id` | `INTEGER` | No | Specific agent user ID assigned to the request. |
| `assigned_group_id` | `INTEGER` | No | Help desk group ID assigned to handle the request. |
| `date_ocurred` | `INTEGER` | No | Epoch timestamp when the issue actually occurred. |
| `location_id` | `INTEGER` | No | Location ID where the incident happened. |
| `related_to` | `ARRAY` | No | Array of existing incident IDs to link as related requests (e.g. `[1020, 1021]`). |
| `field_uid_<ID>` | `ANY` | No | Custom field value loaded in the same creation call (e.g., `field_uid_5616: "20345678"`). |
| `attachments` | `FILE` | No | Binary file attachments (requires `multipart/form-data`). |

### Key Advanced Patterns

#### A. Single-Call Custom Field Population (`field_uid_<ID>`)
Instead of creating a ticket and then executing separate calls to update custom fields, you can pass custom fields directly in the `POST /incident` body:
- Use prefix `field_uid_` followed by the custom field ID (found via `GET /customfields` or MCP `list_custom_fields`).
- Example payload:
```json
{
  "category_id": 14,
  "user_id": 42,
  "title": "Hardware replacement request",
  "description": "Laptop battery swollen",
  "priority_id": 3,
  "field_uid_105": "SN-88392019",
  "field_uid_204": "Office 4B"
}
```

#### B. Process / Workflow Creation
When `category_id` maps to an automated workflow or process:
- `description` is **not required** if the process definition already provides descriptions in step fields.
- Initial process variables can be initialized directly as parameters in the request body.
- Retrieve the required initial fields first using `GET /wf.initialfields.by.category?category_id=<ID>`.

#### C. Linking Related Incidents (`related_to`)
You can link the new request to one or more existing requests at creation time:
```json
{
  "category_id": 14,
  "user_id": 42,
  "title": "Sub-incident related to network failure",
  "description": "Branch office offline",
  "related_to": [5401, 5402]
}
```

#### D. File Attachments
- Standard JSON payloads do not accept raw binary streams.
- To attach files during creation, send the request as `multipart/form-data`.
- Each file parameter is named `attachments[]` or `attachments` with the binary file part.

---

## 3. Request Modification (`PUT /incident`)

Updates an existing request.

### Parameters Summary

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | `INTEGER` | Yes | Request ID to update. |
| `title` | `STRING` | No | New title. |
| `description` | `STRING` | No | Updated description. |
| `status_id` | `INTEGER` | No | New status ID. |
| `priority_id` | `INTEGER` | No | New priority ID. |
| `category_id` | `INTEGER` | No | Reclassify request to a new category. |
| `assigned_id` | `INTEGER` | No | Reassign to a specific agent ID. |
| `assigned_group_id` | `INTEGER` | No | Reassign to a specific help desk group ID. |
| `reassignment` | `BOOLEAN` | No | When `true`, triggers automated assignment rules. |

### Rule-Based Reassignment (`reassignment: true`)
When updating category, priority, or other request properties, setting `"reassignment": true` instructs the assignment engine to re-run the configured help desk routing rules and assign the ticket automatically, rather than requiring you to calculate and pass explicit `assigned_id` or `assigned_group_id` values.

---

## 4. Request Retrieval: `GET /incident` vs `GET /incidents`

### Differences & Usage

| Feature | `GET /incident` | `GET /incidents` |
|---|---|---|
| **Target** | Single request | Batch of multiple requests |
| **ID parameter** | `id` (integer) | `ids` (array of integers, e.g. `ids[]=1&ids[]=2`) |
| **Use Case** | Detailed single-ticket inspection | Batch lookup of known request IDs |
| **Comments** | Included when `comments=true` | Included when `comments=true` |

### Query Parameters

| Parameter | Type | Default | Description |
|---|---|---|---|
| `date_format` | `STRING` | `"epoch"` | Date formatting in response. Options: `"epoch"` or `"iso8601"`. |
| `comments` | `BOOLEAN` | `false` | Whether to include ticket comments and activity log. |
| `decoded_special_characters` | `BOOLEAN` | `false` | Decodes HTML entities and special characters in returned text fields. |

### Key Response Fields

- `id`: Internal numerical ID.
- `pretty_id`: Human-readable identifier formatted per instance settings (e.g. `#10423` or `INC-10423`).
- `status_id`: Current status enum ID.
- `priority_id`: Current priority enum ID.
- `type_id`: Type ID (Incident, Problem, Change, Service Request).
- `source_id`: Source ID where the ticket originated.
- `created_at`, `solved_at`, `closed_at`, `last_update`: Timestamps (epoch integer or ISO-8601 string based on `date_format`).
- `closed_reason`: Numerical code explaining why the ticket was closed (see enum table below).
- `sla_*`: SLA target and breach timestamps:
  - `sla_response_date`, `sla_response_time`, `sla_response_time_breach`
  - `sla_resolution_date`, `sla_resolution_time`, `sla_resolution_time_breach`

---

## 5. Enum & Code References

### Request Type (`type_id`)

| ID | Name | Description |
|---|---|---|
| `1` | Incident | Unplanned interruption or reduction in quality of an IT service. |
| `2` | Problem | Cause or potential cause of one or more incidents. |
| `3` | Change | Addition, modification, or removal of anything that could affect IT services. |
| `4` | Service Request | Formal request from a user for something to be provided (e.g. access, equipment). |

### Priority (`priority_id`)

| ID | Name |
|---|---|
| `1` | Low |
| `2` | Medium |
| `3` | High |
| `4` | Urgent |

### Status (`status_id`)

| ID | Name | State Type |
|---|---|---|
| `-1` | Discarded | Closed / Inactive |
| `1` | New | Open |
| `2` | In Progress | Open |
| `3` | Waiting for Client | Pending |
| `4` | Waiting for Approval | Pending |
| `5` | Resolved | Solved (pending user or system confirmation) |
| `6` | Closed | Closed |
| `7` | Waiting for Agent | Pending internal action |

### Source (`source_id`)

| ID | Name / Channel | Description |
|---|---|---|
| `1` | Web / Self-Service | Created by end-user via customer portal |
| `2` | Email | Generated from incoming support email |
| `3` | Phone | Registered manually by agent receiving a phone call |
| `4` | Chat | Created via live chat integration |
| `5` | API | External integration via REST API |
| `6` | Agent Web Portal | Created directly by an agent in the Service Desk console |
| `7` | Automated Trigger | Created by monitoring/alerting systems |
| `8` | Mobile App | Created from InvGate Mobile app |
| `9` | Virtual Agent / Bot | Created through chatbot or AI conversational assistant |
| `10` | Import / Migration | Bulk import or data migration tool |

> **Note:** Additional source IDs (up to 16) may be configured in modern InvGate versions. Use the MCP `get_enums` tool or `GET /sources` to inspect instance-specific source definitions.

### Closed Reason (`closed_reason`)

| ID | Meaning | Description |
|---|---|---|
| `1` | Solution accepted | End-user explicitly accepted the proposed solution. |
| `2` | Solution expired | Resolution automatically accepted after confirmation timeout elapsed. |
| `3` | Inactivity timeout | Closed automatically due to lack of customer response while in waiting state. |
| `4` | Finalized process | Request was driven by a workflow/process that reached its end step. |

---

## 6. Business Intelligence, Export & Reporting Architecture

> [!WARNING]
> **Do NOT poll `GET /incidents` or `GET /incident` in loops for reporting or BI ingestion.**
> Polling individual or batched ticket endpoints frequently causes server overhead, database lock contention, and rate limit throttling.

### Recommended Approaches for Analytics:
1. **OLAP API**: If enabled, use the specialized OLAP/Analytics API endpoints designed for aggregated metrics and multidimensional querying.
2. **Database Export (`POST /data.export`)**: Use asynchronous background export jobs to generate bulk CSV/JSON snapshots without blocking transactional tables.
3. **Custom Views (`invgate-views`)**: Use predefined filtered views (`/views/show?view_id=...`) to retrieve only specific active subsets rather than scanning the full incident table.

---

## 7. HTTP Errors & Response Patterns

The InvGate API generally returns JSON responses with HTTP status codes:

- `200 OK`: Request succeeded. Note: Some endpoints return a JSON payload with `status: "ERROR"` and a `description` field even on HTTP 200 if business validation fails.
- `400 Bad Request`: Missing mandatory parameters or invalid field types.
- `401 Unauthorized` / `403 Forbidden`: Invalid API credentials, expired session token, or lack of permission for the target resource.
- `404 Not Found`: Target entity (`incident`, `category`, `user`, etc.) does not exist.
- `500 Internal Server Error`: Server-side unhandled exception. Check payload formats and data validity.

### Error Envelope Example
```json
{
  "status": "ERROR",
  "description": "Category ID 999 does not exist"
}
```
Always check both HTTP status and response payload body (`status !== "ERROR"`) when handling responses.
