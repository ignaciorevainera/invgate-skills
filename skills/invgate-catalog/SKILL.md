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

## Design Guidance

- Group categories by the user's intent (what they need), not by internal team structure.
- Keep hierarchy shallow and names unambiguous; the leaf name must make sense without its parents.
- Use a workflow category only when approvals, routing, or automation are needed. Otherwise use a plain category with a template.
- Mark a custom field `required` only when the process cannot start without it.
- Pair each catalog item with a template (`invgate-templates`) and, if `has_workflow`, a workflow (`invgate-workflows`).

## Discovery

**REQUIRED SUB-SKILL:** Use `invgate-mcp` to inspect existing categories and forms (`list_creatable_categories`, `get_category_creation_form`) before designing. Follow its source precedence: a non-production MCP gives structure only, never reusable IDs or names.

Without MCP, use the REST API: `GET /categories`, `GET /cf.fields.by.category`, `GET /wf.initialfields.by.category` (see `invgate-api`).
