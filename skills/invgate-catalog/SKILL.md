---
name: invgate-catalog
description: >-
  Use this skill when the user asks to design, structure, or document service catalog items, categories, or subcategories in InvGate.
---

# InvGate Service Catalog

This skill covers the design and documentation of service catalog structures and category hierarchies in InvGate Service Management.

## Scope

- Service catalog item design
- Category and subcategory hierarchy
- Associated templates per catalog item
- Visibility rules and target audiences

## Catalog Data Model

Attributes of a creatable category (verify live, see Discovery):

| Attribute | Meaning |
|---|---|
| `id`, `name` | Identity. IDs are instance-specific. |
| `parent_path` | Full hierarchy, `Parent / Child / Leaf`. Only leaf categories are selectable. |
| `has_workflow` | `true`: creation runs through a workflow. `false`: plain request. |
| `allowed_type_ids` | Request types the category accepts. Empty means no restriction beyond the default. |
| `default_type_id` | Type applied when none is chosen. |
| `custom_fields[]` | Form fields: `label`, `type`, `required`, `private`, `multi`, `default`, `options`. |
| `template` | Optional description template. See `invgate-templates`. |

### Hierarchy & Binding Rules

- The catalog can be configured so users select only leaves or any node. Only leaves are safe when categories have different forms.
- Bind each category to a **helpdesk level** (level/subhelpdesk), never to the parent helpdesk: assignment engines live on levels, while coordinators sit on the parent. Pointing to the parent routes work to coordinators.
- A category can route to several helpdesks through assignment rules; use **Asignación masiva** to change many categories at once.
- `default_type_id` must be one of `allowed_type_ids`. If no type is selected, the catalog offers all types and shows "No aplica".
- Request types are 1–6 predefined (Incident, Service Request, Question, Problem, Change, Major Incident) plus up to **10 active custom types** (50 total ever created). Custom types carry their own ID format and can be bound to specific categories. Editing a type applies immediately, with no versioning.
- Visibility rules run in **first-match** mode by default (order = priority) or **cumulative** mode. In first-match, you cannot hide priorities in one subset and leave them visible elsewhere with a second rule.

### Bulk Import and Export

- Import is CSV only (`Config > Catálogo > Catálogo de servicios > Importar categorías`); download the template first.
- The template carries 9 hierarchy levels. The parent can be a name or an ID; **levels must be referenced by ID**. Helpdesks accept name or ID.
- Matching is **name-first**: a helpdesk named "1" wins over helpdesk ID 1. Duplicate category names require the ID.
- Export is XLS/XLSX and includes the category ID in the first column, plus the numeric types.
- Process assignment accepts the process ID (from the edit URL) or its name.

## Design Guidance

- Group categories by the user's intent (what they need), not by internal team structure.
- Keep hierarchy shallow and names unambiguous; the leaf name must make sense without its parents.
- Use a workflow category only when approvals, routing, or automation are needed. Otherwise use a plain category with a template.
- Mark a custom field `required` only when the process cannot start without it.
- Pair each catalog item with a template (`invgate-templates`) and, if `has_workflow`, a workflow (`invgate-workflows`).
- Bulk-manage **List** and **Tree** custom field options via CSV/XLSX import and export. Rows with an existing `Option ID` update; rows without it create. Importing with "delete missing" also deletes child options in tree fields.
- Category import/export includes the `Default Type` column.
- Requests can link IGAM financial/contractual entities (contracts, vendors, cost centers, purchase orders).
- Add keywords and a description to each category: they are the portal search surface and feed the suggested-articles feature.
- Validate text fields with RegEx instead of free text when the format is known (ID numbers, phone, email).

## Discovery

**REQUIRED SUB-SKILL:** Use `invgate-mcp` to inspect existing categories and forms (`list_creatable_categories`, `get_category_creation_form`) before designing. Follow its source precedence: a non-production MCP gives structure only, never reusable IDs or names.

Without MCP, use the REST API: `GET /categories`, `GET /cf.fields.by.category`, `GET /wf.initialfields.by.category` (see `invgate-api`).

## Official Documentation

[`references/official-kb.md`](references/official-kb.md) — 16 curated KB articles covering catalog configuration, CSV import, visibility rules, request types and custom fields.

## Citing the Source

When the answer depends on a topic with a **dedicated** KB article, close the response with:

Más información:
- [Título del artículo](https://support.invgate.com/knowledgebase_articles/show/index/article_id/1550) — KB #1550

- Up to **3** citations, one per distinct topic covered in the answer.
- Only dedicated articles. No article, no citation; never infer an ID.
- Prefer links from `references/official-kb.md`, then `kb-index.md`.
- Omit when the answer comes from live instance data or is a design recommendation.
- Use the label in the user's language (`Más información` / `Further reading`).
