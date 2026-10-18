# InvGate Reporting & Views Endpoints Reference

This reference covers the endpoints for retrieving requests through saved views, polling incremental changes, tracking effort, and running bulk data exports.

---

## 1. `GET /incidents.details.by.view`

The primary endpoint for retrieving requests matching a saved view along with their configured columns and related resource metadata.

### Request

```http
GET https://[instance].cloud.invgate.net/api/v1/incidents.details.by.view?view_id=76&sort_by=last_update&order_by=desc
Authorization: Bearer <API_TOKEN>
```

### Query Parameters

| Parameter | Type | Required | Default | Description |
|---|---|---|---|---|
| `view_id` | `INTEGER` | Yes | - | Numeric ID of the view. |
| `page_key` | `STRING` | No | `null` | Hash cursor for pagination. Omit for the first page. |
| `sort_by` | `STRING` | No | `id` | Sorting attribute: `id` or `last_update`. |
| `order_by` | `STRING` | No | `asc` | Sorting direction: `asc` or `desc`. |

### Response Structure

Returns up to 1,000 requests per page.

```json
{
  "status": "OK",
  "metadata": [
    { "id": "incident_id", "label": "ID" },
    { "id": "title", "label": "Título" },
    { "id": "status", "label": "Estado" },
    { "id": "priority", "label": "Prioridad" },
    { "id": "category", "label": "Categoría" }
  ],
  "data": [
    {
      "incident_id": 546,
      "title": "Solicitud de Alta en sistema Pucará",
      "status": "En espera",
      "priority": "Alta",
      "category": "Aplicación cambio o release"
    }
  ],
  "next_page_key": "a1b2c3d4e5f6..."
}
```

* When `next_page_key` is `null`, the last page has been reached.

---

## 2. `GET /incidents.by.view`

Returns only an array of request IDs matching the view. Ideal for lightweight synchronization or count checks without payload overhead.

### Request

```http
GET https://[instance].cloud.invgate.net/api/v1/incidents.by.view?view_id=76&limit=100&offset=0
Authorization: Bearer <API_TOKEN>
```

### Query Parameters

| Parameter | Type | Required | Default | Description |
|---|---|---|---|---|
| `view_id` | `INTEGER` | Yes | - | View ID. |
| `limit` | `INTEGER` | No | 20 | Number of items per page. |
| `offset` | `INTEGER` | No | 0 | Number of items to skip. |

### Response Structure

```json
{
  "status": "OK",
  "requestIds": [546, 531, 520, 510],
  "limit": 100,
  "offset": 0
}
```

---

## 3. `GET /incidents.last.hour`

Returns requests created in the last 60 minutes. Use for near real-time incremental polling instead of querying complete views repeatedly.

### Request

```http
GET https://[instance].cloud.invgate.net/api/v1/incidents.last.hour?limit=100
Authorization: Bearer <API_TOKEN>
```

### Query Parameters

| Parameter | Type | Required | Default | Description |
|---|---|---|---|---|
| `limit` | `INTEGER` | No | 20 | Maximum items per page. |
| `page_key` | `STRING` | No | `null` | Pagination hash cursor. |

---

## 4. Bulk Data Export (`/data.export`)

For enterprise analytics, data lake synchronization, or offline backup of thousands of records, use asynchronous data export:

### Step 1: Trigger Export (`POST /data.export`)

```bash
curl -X POST "https://[instance].cloud.invgate.net/api/v1/data.export" \
  -H "Authorization: Bearer $INVGATE_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "type": "incidents",
    "format": "csv"
  }'
```

Returns an export task token or status ID.

### Step 2: Check Status & Download (`GET /data.export`)

```bash
curl -X GET "https://[instance].cloud.invgate.net/api/v1/data.export?id=<EXPORT_ID>" \
  -H "Authorization: Bearer $INVGATE_TOKEN"
```

When ready, returns the download URL or stream for the generated export archive.

---

## 5. MCP Views Integration (`list_view_requests`)

When connected to the InvGate MCP server:

1. List available views: `list_requests_views()`. Returns `{ id, name, predefined, is_shared_to_me }`.
2. Query specific view requests:
   ```json
   {
     "view_id": 76,
     "predefined": false,
     "limit": 50,
     "page": 1
   }
   ```
> [!CRITICAL]
> **Predefined Flag Invariant**: Always pass `predefined: false` for custom views (auto-increment IDs) and `predefined: true` for system views. If omitted or mismatched, the server rejects the request with `"La vista no existe o no tiene acceso a ella."` due to numerical ID collisions between system and custom views.
