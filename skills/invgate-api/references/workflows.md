# InvGate API Reference - Workflows

### `PUT /wf.deploy`

Deploys the last version of the workflow.

**Parameters:**

| Name | Type | Required | Description |
|---|---|---|---|
| `workflow_id` | `INTEGER` | Yes | ID of the workflow to be deployed. |

**Response Fields:**

| Field | Type | Description |
|---|---|---|
| `description` | `INTEGER` | Confirmation message. |
| `workflow_id` | `INTEGER` | ID of the deployed workflow. |
| `status` | `STRING` | Returns 'OK' if the workflow was correctly deployed; or 'ERROR' if something went wrong. |

---

### `GET /wf.initialfields.by.category`

Lists the initial fields needed to create a request from a workflow.

**Parameters:**

| Name | Type | Required | Description |
|---|---|---|---|
| `category_id` | `INTEGER` | Yes | ID of the category related to a workflow. |

**Response Fields:**

| Field | Type | Description |
|---|---|---|
| `workflow_initial_fields` | `ARRAY` | ARRAY with all the properties each field has. |
| `associated_workflow_name` | `STRING` | Name of the associated workflow. |
| `associated_workflow_id` | `INTEGER` | ID of the associated workflow. |
| `category_id` | `INTEGER` | ID of the category related to a workflow. |

---

### `GET /wf.request`

Returns the general information of a workflow request, the steps it went through with the values loaded in their fields, and the current value of every workflow variable. Steps the workflow has not reached yet are not returned.

**Parameters:**

| Name | Type | Required | Description |
|---|---|---|---|
| `step_id` | `STRING` | No | ID of a step in the workflow definition. When set, only that step is returned, along with the variables it references. |
| `variable_id` | `STRING` | No | ID of a workflow variable. When set, only that variable is returned, along with the steps that reference it. |
| `all_executions` | `BOOLEAN` | No | When set to true, every execution of each step is returned. By default only the last execution of each step is returned. |
| `date_format` | `STRING` | No | Indicate the date format. The available formats are 'epoch' or 'iso8601'. If null, epoch format is returned. |
| `language` | `STRING` | No | Language used to translate the labels of the workflow fields. If null, the language configured on the instance is used. |
| `id` | `INTEGER` | Yes | Request ID. |

**Response Fields:**

| Field | Type | Description |
|---|---|---|
| `creator_id` | `INTEGER` | Creator ID. |
| `user_id` | `INTEGER` | Customer ID. |
| `status_id` | `INTEGER` | Status ID. |
| `assigned_id` | `INTEGER` | Assigned agent ID. |
| `solved_at` | `INTEGER` | Solution date as an epoch number, or as an ISO-8601 string when the date_format parameter asks for it. |
| `workflow` | `ARRAY` | Object with the workflow of the request: workflow_id (stable ID of the workflow across versions), process_id (ID of the deployed version running this request), name, description, state ("running", "finalized", "rejected" or "cancelled"), current_step_id, current_step_name, started_at and finished_at. |
| `closed_at` | `INTEGER` | Closing date as an epoch number, or as an ISO-8601 string when the date_format parameter asks for it. |
| `location_id` | `INTEGER` | Location ID. |
| `priority_id` | `INTEGER` | Priority ID. |
| `last_update` | `INTEGER` | Last update as an epoch number, or as an ISO-8601 string when the date_format parameter asks for it. |
| `date_ocurred` | `INTEGER` | Occurrence date as an epoch number, or as an ISO-8601 string when the date_format parameter asks for it. |
| `category_id` | `INTEGER` | Category ID. |
| `type_id` | `INTEGER` | Type ID. |
| `pretty_id` | `STRING` | Request pretty ID as configured on the Service Management instance. |
| `description` | `STRING` | Request description. On workflow requests this is the description configured in the workflow, not a value loaded by the customer: those are in the fields of the steps. |
| `title` | `STRING` | Request title. |
| `closed_reason` | `INTEGER` | Reason of closing. 1: Solution accepted, 2: Solution expired, 3: Customer timeout, 4: Finalized workflow. |
| `created_at` | `INTEGER` | Creation date as an epoch number, or as an ISO-8601 string when the date_format parameter asks for it. |
| `source_id` | `INTEGER` | Source ID. |
| `current_variables_values` | `ARRAY` | Array with the current value of every workflow variable. Each variable has id, name, name_source ("alias", "fixed_label", "field_label" or "id", telling how the name was resolved), type, field_id, value and value_label. |
| `assigned_group_id` | `INTEGER` | Help desk ID. |
| `id` | `INTEGER` | Request ID. |
| `steps` | `ARRAY` | Array with the steps the request went through, in chronological order. Each step has id (the step ID in the workflow definition), name, type, state ("completed" or "current"), parent_step_id (only for steps inside a building block), occurrences (how many times the workflow went through the step) and executions. Each execution has occurrence, state, started_at, completed_at, completed_by (the ID of the user that completed the execution, which on automatic steps is the System user, and null while the execution is not completed), assigned_id, assigned_group_id and fields. Each field has id (the ID of the field in this step), variable_id, field_id (the custom field ID), label, type, value and value_label. |

---

