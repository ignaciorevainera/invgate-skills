---
name: invgate-mcp
description: Use when an InvGate Service Management MCP server is available or missing, and you need to inspect live entities (requests, categories, creation forms, enums, helpdesks, users, KB) or verify attribute structure before using the REST API, designing catalog items, templates, or workflows.
---

# InvGate Service Management MCP

Live, read-mostly access to an InvGate instance. Use it to **discover real structure** before writing code, templates, workflows, or API calls.

**Core principle:** The MCP gives structure; the instance gives data. Never hardcode IDs, names, or option values taken from one instance into artifacts meant for another.

## Source Precedence

| Situation | Behavior |
|---|---|
| Production MCP available | Source of truth for that instance. |
| Only a non-production MCP (QA, sandbox) | Structural reference only. Label findings "structure from non-production instance, not verified in target". |
| No MCP available | Use `invgate-api` references. State that nothing was verified live. Do not stop or ask the user to install the MCP. |
| MCP and REST API disagree | REST API wins. Report the discrepancy. |
| Target instance unclear | Ask which instance before using concrete values. |

## What Transfers Between Instances

- **Transfers:** entity attributes, field types, `required` flags, enum meaning, form shape (`custom_fields`, `template`), pagination, response shapes.
- **Does NOT transfer:** category/helpdesk/location/company/user IDs and names, custom field IDs, option values, workflow names, SLAs, enum IDs beyond defaults. Re-resolve in the target (via API: `/categories`, `/helpdesks`, `/cf.fields.by.category`).

## Discovery Order

1. `get_enums`: statuses, priorities, request types, sources.
2. `list_creatable_categories` (`query` for text search), then `get_category_creation_form` for `custom_fields`, `allowed_type_ids`, `has_workflow`.
3. `list_helpdesks`, `list_locations`, `list_companies`, `list_users` (scope) to resolve IDs from names.
4. `list_requests` / `search_requests` / `get_request` to inspect real attribute shapes.
5. `ask_virtual_agent` for open-ended "how do I..." questions; `search_kb` for raw articles.

Tool inputs and field maps: [references/mcp-tools.md](references/mcp-tools.md).

## Rules

- All results are scoped to the authenticated user's permissions. Empty results may mean "not visible", not "does not exist".
- Prefer read tools. Never create or change requests on a shared instance without explicit user approval.
- Never paste tokens into files, commits, or skill content.

## Common Mistakes

| Mistake | Fix |
|---|---|
| Copying QA IDs into production payloads | Re-resolve IDs in the target via API. |
| Guessing option values for a field | Read `options` from `get_category_creation_form`. |
| Concluding an entity is missing from one empty result | Check permissions and filters first. |
| Skipping verification because MCP is absent | Fall back to `invgate-api` references and say so. |
