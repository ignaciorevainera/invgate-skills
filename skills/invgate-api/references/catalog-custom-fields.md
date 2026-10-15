# InvGate API Reference - Catalog & Custom Fields

### `GET /categories`

Lists all the categories, or the required one if an ID is provided. Supports text search and pagination.

**Parameters:**

| Name | Type | Required | Description |
|---|---|---|---|
| `page_size` | `INTEGER` | No | Number of items per page. Default 20, max 500. |
| `search` | `STRING` | No | Search text for category names. |
| `page` | `INTEGER` | No | Page number for pagination. |
| `id` | `INTEGER` | No | Category ID. |

**Response Fields:**

| Field | Type | Description |
|---|---|---|
| `parent_category_id` | `INTEGER` | Category parent ID. |
| `name` | `STRING` | Category name. |
| `id` | `INTEGER` | Category ID. |

---

### `GET /cf.field.options.list`

Lists the configuration of custom fields that are a list type.

**Parameters:**

| Name | Type | Required | Description |
|---|---|---|---|
| `uid` | `INTEGER` | Yes | Custom field ID. |

**Response Fields:**

| Field | Type | Description |
|---|---|---|
| `key-value` | `ARRAY` | Returns an array with the key-values dictionary of the custom field. |

---

### `DELETE /cf.field.options.list`

Erases keys from the list type custom fields configuration.

**Parameters:**

| Name | Type | Required | Description |
|---|---|---|---|
| `type` | `STRING` | Yes | Type of configuration to change. Types: key-value. |
| `uid` | `INTEGER` | Yes | Custom field ID. |
| `keys` | `ARRAY` | Yes | Array [key1,key2] of keys to be erased. |

**Response Fields:**

| Field | Type | Description |
|---|---|---|
| `total` | `INTEGER` | Number of deleted values. |
| `status` | `STRING` | Returns 'OK' if the custom field option was correctly deleted; or 'ERROR' if something went wrong. |
| `info` | `STRING` | Description of the result. |

---

### `POST /cf.field.options.list`

Configures list type custom fields. If the key already exists, the previous value will be overwritten.

**Parameters:**

| Name | Type | Required | Description |
|---|---|---|---|
| `type` | `STRING` | Yes | Type of configuration to change. Types: key-value. |
| `key_values` | `ARRAY` | Yes | Dictionary {key1: value1, key2: value2, ...} with key-values pairs to be added to the CF list. |
| `uid` | `INTEGER` | Yes | Custom field ID. |

**Response Fields:**

| Field | Type | Description |
|---|---|---|
| `total` | `INTEGER` | Number of modified/added values. |
| `status` | `STRING` | Returns 'OK' if the custom field option was correctly added or modified; or 'ERROR' if something went wrong. |
| `info` | `STRING` | Description of the result. |

---

### `GET /cf.field.options.list.config`

Lists the configuration of custom fields that are of type list.

**Parameters:**

| Name | Type | Required | Description |
|---|---|---|---|
| `uid` | `INTEGER` | Yes | Custom field ID. |

**Response Fields:**

| Field | Type | Description |
|---|---|---|
| `count` | `INTEGER` | The count of configurations in the response. |
| `configurations` | `ARRAY` | Returns an array with the list of options with its configurations for the custom field. |

---

### `GET /cf.field.options.tree`

Returns the structure of the tree type custom fields options. The hash is system internal, but it is used to make modifications.

**Parameters:**

| Name | Type | Required | Description |
|---|---|---|---|
| `uid` | `INTEGER` | Yes | Custom field ID. |

**Response Fields:**

| Field | Type | Description |
|---|---|---|
| `hash` | `STRING` | The unique internal identifier of the option. |
| `children` | `ARRAY` | Array of the option's children. |
| `name` | `STRING` | Option name. |
| `key` | `STRING` | Key defined by the user for the option. |

---

### `PUT /cf.field.options.tree`

Modifies the configuration of the tree type custom fields. If there is no such key, it will be added.

**Parameters:**

| Name | Type | Required | Description |
|---|---|---|---|
| `hash` | `STRING` | Yes | Hash value of the item to modify. |
| `uid` | `INTEGER` | Yes | Custom field ID. |
| `name` | `STRING` | No | Name of the option, value that the user sees when selecting. |
| `key` | `STRING` | No | Key defined by the user; if no value is set the previous value will be used. |

**Response Fields:**

| Field | Type | Description |
|---|---|---|
| `status` | `STRING` | Returns 'OK' if the custom field option was correctly modified; or 'ERROR' if something went wrong. |
| `info` | `STRING` | Description of the result. |

---

### `POST /cf.field.options.tree`

Adds configuration to the tree type custom fields. If the key already exists, the previous value will be overwritten.

**Parameters:**

| Name | Type | Required | Description |
|---|---|---|---|
| `parent_hash` | `STRING` | No | Hash value of the parent; if not set, it will be added to the root. |
| `uid` | `INTEGER` | Yes | Custom field ID. |
| `name` | `STRING` | Yes | Name of the option, value that the user sees when selecting. |
| `key` | `STRING` | No | Key defined by the user; if no value is set, the hash will be used as key. |

**Response Fields:**

| Field | Type | Description |
|---|---|---|
| `status` | `STRING` | Returns 'OK' if the custom field option was correctly added; or 'ERROR' if something went wrong. |
| `info` | `STRING` | Description of the result. |

---

### `DELETE /cf.field.options.tree`

Erases the options from the tree type custom fields and any of its children.

**Parameters:**

| Name | Type | Required | Description |
|---|---|---|---|
| `hash` | `STRING` | Yes | Hash value of the item to modify. |
| `uid` | `INTEGER` | Yes | Custom field ID. |

**Response Fields:**

| Field | Type | Description |
|---|---|---|
| `status` | `STRING` | Returns 'OK' if the custom field option was correctly deleted; or 'ERROR' if something went wrong. |
| `info` | `STRING` | Description of the result. |

---

### `GET /cf.fields.all`

Returns a list of all the active custom fields.

*No parameters required.*

**Response Fields:**

| Field | Type | Description |
|---|---|---|
| `label` | `STRING` | Custom field name. |
| `type` | `INTEGER` | Custom field type ID. |
| `uid` | `INTEGER` | Custom field ID. |
| `description` | `TEXT` | Custom field description. |
| `categories` | `STRING` | Categories where custom field applies. |
| `is_required` | `BOOLEAN` | Indicates if the custom field is required. True if it's required and false if it's not. |

---

### `GET /cf.fields.by.category`

Returns a list of the custom fields related to a category ID.

**Parameters:**

| Name | Type | Required | Description |
|---|---|---|---|
| `category_id` | `INTEGER` | Yes | Category ID. |

**Response Fields:**

| Field | Type | Description |
|---|---|---|
| `uid` | `INTEGER` | Custom field ID. |

---

### `GET /cf.fields.shared.all`

Returns a list of all the active shared custom fields.

*No parameters required.*

**Response Fields:**

| Field | Type | Description |
|---|---|---|
| `description` | `TEXT` | Shared custom field description. |
| `label` | `STRING` | Shared custom field label. |
| `type` | `INTEGER` | Shared custom field type ID. |
| `uid` | `INTEGER` | Shared custom field ID. |

---

### `GET /cf.fields.types`

Returns a list of all the supported custom field types, with a brief description of the data type for each field.

*No parameters required.*

**Response Fields:**

| Field | Type | Description |
|---|---|---|
| `name` | `STRING` | Custom field type name. |
| `id` | `INTEGER` | Custom field type ID. |

---

