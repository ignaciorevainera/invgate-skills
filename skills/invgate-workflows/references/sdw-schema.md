# InvGate Workflow (.sdw) JSON Schema & Reference

An `.sdw` file is a UTF-8 Base64 encoded JSON string representing the full definition of an InvGate Service Management workflow.

## Top-Level Structure

```json
{
  "name": "Workflow Name",
  "description": "",
  "creator": 4509,
  "zoom": 100,
  "position": null,
  "start": "dcPTDxvH",
  "end": "Fnjf7lmN",
  "items": { ... },
  "jumpConnections": [],
  "global": { ... },
  "ui_version": 2,
  "instance_id": 1,
  "last_updated_at_sd_version": "7.x.x"
}
```

---

## Global Configuration (`global`)

* `responsible_group`: Default Help Desk / Group ID.
* `hasCustomer`: Boolean, whether a customer/requester is assigned.
* `titleNotBlank`: Boolean, enforces non-empty title.
* `allowsRequestDescription`: Boolean.
* `whoCanStart`: Object specifying permission rules (roles, groups, helpdesks).
* `variables`: Dictionary of process variables accessible across nodes:
  ```json
  "variables": {
    "variable_id_8chars": {
      "id": "variable_id_8chars",
      "type": 1,
      "name": null,
      "params": {
        "type": 1,
        "label": "Variable Label",
        "description": "Description",
        "fixedVariable": 0
      },
      "default": null,
      "shared_id": 0
    }
  }
  ```

---

## Node Structure (`items[node_id]`)

Every node is keyed by an 8-character alphanumeric string (e.g. `dcPTDxvH`, `0cea74cb`).

```json
{
  "id": "0cea74cb",
  "label": "Step Name",
  "customTitle": null,
  "type": 3,
  "chart": {
    "left": 5415,
    "top": 7700,
    "sourceConnections": ["dcPTDxvH"],
    "targetConnections": ["a0efe4fc"]
  },
  "config": { ... },
  "visibility": {
    "enabled": false,
    "roles": [],
    "helpdesks": [],
    "groups": [],
    "companies": []
  }
}
```

### Integrity Rules for `chart`
* `sourceConnections`: Array of IDs of incoming nodes.
* `targetConnections`: Array of IDs of outgoing nodes.
* **Invariant**: If node A targets node B (`A.chart.targetConnections.includes("B")`), node B must source node A (`B.chart.sourceConnections.includes("A")`).

---

## Node Types (`item.type`)

### 1. Start Node (`type: 1`)
* Only one start node per workflow.
* `id` matches root `start`.
* Contains initial form fields in `config.data.form.fields`.

### 2. End Node (`type: 2`)
* Terminal node of the workflow.
* `id` matches root `end`.
* `targetConnections` is empty.

### 8. Conditional Gateway / Branching (`type: 8`)
* Multi-branch decision logic based on form fields or variables.
* Contains `config.conditions`:
  ```json
  "conditions": {
    "branch_id": {
      "id": "branch_id",
      "label": "Condition Label",
      "next": "target_node_id",
      "position": 0,
      "rules": {
        "rule_group_id": {
          "rule_id": {
            "property": "source_step_id-field_id",
            "operator": "is",
            "value": "MATCH_VALUE"
          }
        }
      }
    }
  }
  ```

### 3. Action / Execution Node (`type: 3`)
Subdivided by `config.type`:

| `config.type` | Purpose | Key Attributes |
|---|---|---|
| `301` | **Form / User Step** | `config.data.form.fields`, `config.data.form.responsible` |
| `303` | **Automated Action** | `config.data.action` (see Action Types below) |
| `304` | **Tasks** | `config.data.tasks` (checklist of tasks assigned to agents) |
| `305` | **Approvals** | `config.data.approval` (voters, approval rules, thresholds) |
| `306` | **InvGate Native Action** | `config.data.action.mappings` (ticket creation, comments) |
| `307` | **Sub-process** | `config.data.form.items` (parallel child requests) |
| `310` | **Wait Condition** | `config.data.waitingFor` (timer, external event, date) |

---

## Automated Action Types (`config.data.action.type` inside `303`)

* **Type `1` (Send Email / Notification)**:
  * `params.subject`, `params.body`, `params.recipients`, `params.attachments`.
* **Type `2` (HTTP Webhook / API Call)**:
  * `params.url`, `params.method` (`get`, `post`, `put`), `params.send.vars`, `params.receive.vars`, `params.auth`, `params.auth_mode`, `params.auth_saved`, `params.failaction`.
* **Type `9` (InvGate API Call)**: see section below.
* **Type `10` (Formula / Calculation)**:
  * `params.expression` (e.g. `CONCAT("PREFIX ", {{var1}}, " ", {{var2}})`, `DATE_SUBTRACT({{date}}, 1, "days")`), `params.resultVariable`, `params.overwriteVariable`.

---

## Native Action Types (`config.data.action.commonActionType` inside `306`)

`config.data.action` has `type: 306`, `commonActionType`, `mappings`, `iconItem`, `failAction`. `mappings` is keyed by an 8-char id; each entry maps an attribute to `{ "value", "label", "type" }` where `type` is `CONSTANT` or `VARIABLE` (`value` is then a variable id).

| `commonActionType` | Purpose | Mapped attributes |
|---|---|---|
| `3` | Reassign request | `assignment` |
| `4` | Add observer | `observers`, `request_id`, `follow` |
| `16` | Create linked child request | `categories`, `type`, `priority`, `location`, `assignment`, `customfields`, `variable_store`, `link_to_process`, `title`, `description`, `customer` |
| `17` | Edit request | `request_id`, `customer`, `priority` |
| `20` | Add comment | `reply_type`, `request_id`, `description`, `customer` |
| `21` | Create announcement | `importance`, `helpdesks`, `groups`, `title`, `description`, `variable_store` |

* `assignment.value` is `[helpdeskId, [agentId, ""]]`; `label` mirrors it with names.
* `reply_type` values: `common` (public), `hide_to_customers` (internal), `solve` (comment marks the solution).
* `variable_store` saves the created entity ID (request or announcement) into a workflow variable for later steps.
* `failAction`: `null` (stop on error) or `"continue"`.

---

## Sub-process Node (`config.type: 307`)

Creates one or more child requests as parallel items and waits for them. Structure: `config.data.form` with `creation`, `visible_to_endusers`, `optional_item`, `copied_items`, `planning_stage`, `responsible`, and `items`.

Each entry of `items`: `id`, `name`, `description`, `time` (`value`, `measure`), `helpdeskId`, `dependencies`, `readonly`, `is_dynamic`, `iterator_variable`, `mappings`.
`mappings` is keyed by the item id and maps `categories`, `type`, `priority`, `assignment`, `customer`, `title`, `description`, `location` using the `CONSTANT`/`VARIABLE` format above.
`is_dynamic` with `iterator_variable` creates one item per element of a variable.

---

## Tasks Node (`config.type: 304`)

`config.data.tasks`: `creation`, `visible_to_endusers`, `optional_task`, `copied_tasks`, `planning_stage`, `responsible`, and `tasks` keyed by id.
Each task: `id`, `name`, `description`, `time`, `user`, `helpdeskId`, `dependencies` (task ids), `readonly`.

---

## Approval Node (`config.type: 305`)

`config.data.approval` keys: `type`, `description`, `expiration`, `approvers`, `variable`, `pause_sla`, `add_approvers_as_followers`, `approval_manager_id`, `next_accepted`, `next_rejected`, `next_cancelled`, `acceptance_reason_config_type`, `rejection_reason_config_type`.

| `approval.type` | `approvers` shape |
|---|---|
| `1` | `{ "users": [userId] }` fixed users |
| `5` | `{ "number": "1", "group": [helpdeskId] }` N approvals from a group |
| `6` | `{ "userVariable": "<variableId>.<stepId>.<fieldId>" }` approver chosen in a prior step |

* `expiration`: `enabled`, `working_hours`, `time` (`value`, `unit`), `action`.
* `variable` stores the approval result.
* The three `next_*` keys hold target node ids and must match `chart.targetConnections`.
* Node `config.data.form.fields` may be empty or an object.

---

## Wait Node (`config.type: 310`)

`config.data.waitingFor`: `type`, `sourceType` (`manual`), `manual` (`amount`, `unit` e.g. `days`), `variable`, `allowRuntimeModification`.

---

## Responsible (`config.data.form.responsible`)

Present on steps that need an owner: `helpdesk`, `user`, `type`, `variable`, `stage`.

| `type` | Meaning |
|---|---|
| `1` | Fixed helpdesk (`helpdesk`) |
| `2` | User from a variable (`variable`) |
| `3` | Default (no explicit owner) |
| `4` | Same owner as another step (`stage` = that node id) |

---

## Step Visibility (`item.visibility`)

`enabled` (boolean) plus `roles`, `helpdesks`, `groups`, `companies`. When enabled, only matching users see the step.

---

## Form Fields (`config.data.form.fields`)

Object keyed by field id (empty arrays also occur). Each field: `id`, `variable` (global variable id), `label`, `desc`, `position`, `required`, `readonly`, `configurable`, `shared_id`, `predefined`, `predefined_type`, `default`, `order_type`, `validatable`, `validation_criteria`, `is_required_for_approval`, `visibilityRules`.

Gateway conditions reference fields as `"<stepId>-<fieldId>"` in `rules[...].property`. Observed operators: `is`, `in`. For list fields, `value` is the option `hash`, not the label.

---

## Variable Types (`global.variables[id].type`)

| `type` | Data type | Notes |
|---|---|---|
| `1` | Text | `params.input_format`, `custom_regex`, `custom_error_message` |
| `2` | Option list | `params.options[]` (`name`, `key`, `hash`), `multiple`, `dynamic`, `populationType`, `populationSource`, `optionsReference` |
| `3` | Long text | |
| `4` | Number | Counters and entity IDs |
| `5` | Checkbox / boolean | `params.checkbox_custom_label` |
| `6` | Date | `validatable`, `validation_criteria` (e.g. `only-future`) |
| `7` | User | `params.helpdesks`, `groups`, `roles`, `companies`, `multiple` |
| `10` | Computed / formula result | `params` is `[]` |
| `11` | Attachments | |
| `12` | Location | `params.populationType` |
| `14` | Date-time (inferred) | `validatable`, `validation_criteria` |
| `15` | Request type | system variable |

Types `10` and `14` are inferred from naming and usage; confirm in the target instance.

**System variables** are identified by an id prefix and `params.fixedVariable`: `requestNumber`, `requestType`, `requestLastComment`, `requestLastCommentAttachment`, `wfTitle`, `wfAuthor`, `wfCustomer`, `wfCustomerUsername`, `wfCustomerEmail`, `customersManager`, `customersManagerName`. Do not edit or recreate them. Manually added variables carry `params.addedManual: 1` and `name` (a readable alias). Other variable keys: `default`, `total_references`, `shared_id`, `predefined`, `predefined_type`, `validatable`, `validation_criteria`.

---

## Formula Functions (`303`, `action.type: 10`)

Observed in `params.expression`: `CONCAT(...)`, `IF(cond, a, b)`, `IsEmpty(x)`, `DATE_SUBTRACT(date, n, "days")`, arithmetic (`{{var}}+1`), comparison (`==`, `>=`), logic (`||`). Variables use `{{variableId}}`. Result goes to `params.resultVariable`; `params.overwriteVariable` controls overwriting.

---

## Automated Action `type: 9` (InvGate API call)

Same `params` shape as type `2` (`url`, `method`, `send`, `receive`, `auth_mode`, `auth`, `auth_saved`, `failaction`) plus `base_domain`. Used for calls to the instance's own REST API (e.g. `/incident.link`). `receive.vars[].key` is a JSONPath (e.g. `$[0].id`) mapped to a variable. `send.vars[]` maps `key` to `variable`; `send.format` is `http`, `receive.format` is `json`. `auth_saved` references a saved credential id of the instance.
