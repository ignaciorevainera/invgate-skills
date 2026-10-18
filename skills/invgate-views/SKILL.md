---
name: invgate-views
description: Use when querying filtered requests via saved views (view_id), polling recent tickets, exporting bulk data, or designing queries to avoid API rate-limit saturation.
---

# InvGate Views & Anti-Saturation Querying

This skill teaches how to retrieve filtered ticket lists and reports in InvGate Service Management using **saved custom views (`view_id`)** as pre-compiled server-side filters, avoiding repetitive API calls and rate-limit exhaustion.

## The View-First Rule (Anti-Saturation)

When an integration or user needs to query tickets matching complex criteria (specific categories, open statuses, assigned helpdesks, dates), **never iterate over individual filters via `/incident` or `/incidents.by.*`**.

```text
❌ Saturation Pattern:
GET /categories -> GET /helpdesks -> GET /incidents.by.category (repeat for each category) -> GET /incident (N calls to resolve custom fields/names)

✅ View-First Pattern:
Create/Identify View in UI -> GET /incidents.details.by.view?view_id=76 -> 1 call yields up to 1,000 pre-filtered requests with metadata
```

---

## URL Parsing & Permissions

When the user shares a web interface URL:
```text
https://[instance].cloud.invgate.net/views/index/show/view_id/76#list
                                                      ^^^^^^^
                                                      view_id = 76
```
Extract `view_id: 76`.

### Permissions & Visibility Invariants
1. **Private vs. Shared Views**: A custom view is scoped to the user who created it. For the API token to read the view, the token's authenticated user must be the **creator** of the view or have it explicitly **shared**.
2. **Predefined vs. Custom Collision**:
   * Predefined system views (e.g., Unassigned, My Requests) typically have small static IDs (`1` to `50`).
   * Custom user views have auto-increment IDs that can numerically collide with predefined IDs.
   * In REST API, query `/incidents.details.by.view?view_id=<ID>`.
   * In MCP (`list_view_requests`), you **must** supply `predefined: false` for custom views and `predefined: true` for system views.

---

## Decision Matrix

| Need | Recommended Method | Volume / Limit | Notes |
|---|---|---|---|
| Complete ticket data + column labels | `GET /incidents.details.by.view` | Up to 1,000 / page | Primary reporting tool; uses `page_key` pagination |
| Only IDs for light sync | `GET /incidents.by.view` | Up to 500 / page | Returns `requestIds[]`; uses `limit` & `offset` |
| Live tool call via MCP | `list_view_requests` | Up to 100 / page | Set `predefined: false` for user views |
| Delta sync of recent activity | `GET /incidents.last.hour` | Up to 500 / page | Incremental polling without re-reading history |
| Massive full dataset export | `POST /data.export` | Unlimited | Asynchronous CSV/XLS generation |

---

## Best Practices for View Design in InvGate UI

Before querying via API, optimize the View configuration in the InvGate web console:
1. **Include Target Columns in the View**: `GET /incidents.details.by.view` returns only columns enabled in the view. Enable columns like *Customer*, *Priority*, *Status*, *Last Update*, and required *Custom Fields* in the UI so they arrive pre-populated in `data` and `metadata`, eliminating N+1 lookups.
2. **Pre-compile Hierarchy Filters**: Let InvGate's database engine evaluate multiple category or status inclusions rather than filtering JSON in memory on the client side.
3. **Cursor Paging (`page_key`)**: For views with over 1,000 requests, pass the returned `next_page_key` into subsequent calls until `next_page_key` is null.

For full JSON response schemas, curl examples, and export workflows, consult [`references/reporting-endpoints.md`](references/reporting-endpoints.md).
