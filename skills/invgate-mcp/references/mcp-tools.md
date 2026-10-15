# InvGate MCP Tools Reference

Verified against a QA instance. Structure applies to any instance; IDs and names do not.

## Tools

| Tool | Key inputs | Returns |
|---|---|---|
| `get_enums` | none | `priorities`, `request_types`, `statuses`, `sources` as `{id, name}` |
| `list_creatable_categories` | `query`, `limit` | `categories[]`: `id`, `name`, `parent_path`, `has_workflow`, `allowed_type_ids`, `default_type_id`; plus `total_selectable` |
| `get_category_creation_form` | `category_id` | `category`, `allowed_type_ids`, `default_type_id`, `has_workflow`, `workflow_name`, `custom_fields[]`, `template` |
| `list_helpdesks` | `query`, `limit` | `helpdesks[]`: `id`, `name`, `levels[]` |
| `list_locations` | `query`, `limit` | `locations[]`: `id`, `name` |
| `list_companies` | `query`, `limit` | `companies[]` |
| `list_users` | `scope`, `query`, `limit` | `users[]`: `id`, `username`, `email`, `name`, `lastname` |
| `list_requests` | `status`, `priority`, `type`, `source`, `customer_ids`, `agent_ids`, `helpdesk_ids`, `category_ids`, `location_ids`, `customer_company_ids`, `created_after`, `created_before`, `open_only`, `assigned_to_me`, `order_by`, `order_dir`, `limit`, `page` | `data[]`, `pagination` |
| `search_requests` | `query` plus status/customer/agent/helpdesk/category id arrays | same shape as `list_requests` |
| `get_request` | `request_id` | `request` plus `comments[]` |
| `search_requests_by_customer` | `customer_email` or `customer_id` | requests |
| `search_kb` / `get_kb_articles` | text / ids | KB articles |
| `ask_virtual_agent` | `question`, `context` | synthesized natural-language answer |
| `list_my_requests`, `list_my_work`, `list_pending_tasks`, `list_my_participations`, `list_pending_approvals`, `list_requests_due_soon`, `list_notifications` | `limit`, `page` | personal queues of the authenticated user |
| `list_requests_views`, `list_view_requests` | view id | saved views |

`list_users` scopes: `my_coworkers` (default), `agents`, `coordinators`, `admins`, `endusers`, `all`, `all_except_me`.

## Enums (default set, confirm with `get_enums`)

- **Types:** 1 incident, 2 request, 3 question, 4 problem, 5 change_request, 6 major_incident
- **Priorities:** 1 low, 2 medium, 3 high, 4 urgent, 5 critical
- **Statuses:** 1 incoming, 2 open, 3 pending, 4 awaiting, 5 solved, 6 closed, 7 rejected, 8 cancelled
- **Sources:** 1 email, 2 web, 3 phone_call, 4 in_person, 5 im, 6 scheduled, 7 imported, 8 api, 9 msteams, 10 whatsapp, 11 workflow, 12 in_app_chat, 13 app_mobile, 14 mcp, 15 slack, 16 igam

## Entity Shapes

**Request** (`get_request`, `list_requests`): `id`, `title`, `description`, `category_id`, `type_id`, `status_id`, `priority_id`, `source_id`, `creator_id`, `customer_id`, `assigned_id`, `assigned_group_id`, `location_id`, `process_id`, `created_at`, `last_update`, `solved_at`, `closed_at`, `closed_reason`, `date_ocurred`, plus `*_name` display fields. Dates are ISO-8601 with offset. `get_request` adds `attachments[]` and `comments[]` (`author_id`, `message` as HTML, `customer_visible`, `created_at`, `msg_num`, `type`, `attachments[]`).

**Custom field** (in `get_category_creation_form`): `id`, `label`, `type` (`text`, `date`, ...), `required`, `private`, `description`, `multi`, `default`, `options`.

**Category:** `has_workflow: true` means creation goes through a workflow (REST: `/wf.request` with `/wf.initialfields.by.category`), not plain `/incident`. `allowed_type_ids: []` means no restriction beyond `default_type_id`.

## MCP vs REST Differences

- MCP returns `*_name` fields alongside IDs; REST often returns IDs only.
- MCP filters use `*_ids` arrays; combine with AND across filters, OR within an array.
- MCP results respect the authenticated user's visibility; REST token permissions may differ.
- The MCP exposes read tools only in the version checked. Writes (`create_request`) may exist depending on server configuration; check `tools/list`.
