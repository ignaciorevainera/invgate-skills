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

**Which server am I on?** InvGate ships an official MCP server per instance, in Beta. Its tokens start with `smmcp_` (Service Management) or `ammcp_` (Asset Management) and connect over Streamable HTTP at `/mcp/v1`. See [`references/official-mcp-server.md`](references/official-mcp-server.md) for activation, toggles, token rules and the official tool inventory. The tool names used below belong to the instance MCP toolset; if the connected server exposes different names, map by capability, not by name.

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
| Assuming MCP can advance a process stage | Creation is supported; stage forms still require the web UI. |
| Assuming write access | The administrator enables writing per role; a read-only token fails on any create, reply or approval. |

## Citing the Source

When the answer depends on a topic with a **dedicated** KB article, close the response with:

Más información:
- [Título del artículo](https://support.invgate.com/knowledgebase_articles/show/index/article_id/1550) — KB #1550

- Up to **3** citations, one per distinct topic covered in the answer.
- Only dedicated articles. No article, no citation; never infer an ID.
- Prefer links from `references/official-kb.md`, then `kb-index.md`.
- Omit when the answer comes from live instance data or is a design recommendation.
- Use the label in the user's language (`Más información` / `Further reading`).
