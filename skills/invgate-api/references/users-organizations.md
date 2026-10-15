# InvGate API Reference - Users & Organizations

### `GET /companies`

Returns all the active companies.

**Parameters:**

| Name | Type | Required | Description |
|---|---|---|---|
| `external_id` | `STRING` | No | External ID. |
| `name` | `STRING` | No | Company name. |
| `id` | `INTEGER` | No | Company ID. |

**Response Fields:**

| Field | Type | Description |
|---|---|---|
| `total` | `INTEGER` | Users total. |
| `external_id` | `STRING` | External ID. |
| `name` | `STRING` | Company name. |
| `id` | `INTEGER` | Company ID. |

---

### `PUT /companies`

Modifies an existing company.

**Parameters:**

| Name | Type | Required | Description |
|---|---|---|---|
| `external_id` | `STRING` | No | External ID. |
| `name` | `STRING` | No | Company name. |
| `id` | `INTEGER` | Yes | Company ID. |

**Response Fields:**

| Field | Type | Description |
|---|---|---|
| `external_id` | `STRING` | External ID. |
| `status` | `STRING` | Returns 'OK' if the company was correctly modified; or 'ERROR' if something went wrong. |
| `name` | `STRING` | Company name. |
| `id` | `INTEGER` | Company ID. |

---

### `POST /companies`

Creates a new company.

**Parameters:**

| Name | Type | Required | Description |
|---|---|---|---|
| `external_id` | `STRING` | No | External ID. |
| `name` | `STRING` | Yes | Company name. |

**Response Fields:**

| Field | Type | Description |
|---|---|---|
| `external_id` | `STRING` | External ID. |
| `status` | `STRING` | Returns 'OK' if the company was correctly created; or 'ERROR' if something went wrong. |
| `name` | `STRING` | Company name. |
| `id` | `INTEGER` | ID of the created object. |

---

### `DELETE /companies`

Erases an existing company.

**Parameters:**

| Name | Type | Required | Description |
|---|---|---|---|
| `id` | `INTEGER` | Yes | Company ID. |

**Response Fields:**

| Field | Type | Description |
|---|---|---|
| `status` | `STRING` | Returns 'OK' if the company was correctly deleted; or 'ERROR' if something went wrong. |

---

### `GET /companies.groups`

Lists all the users groups related to a company.

**Parameters:**

| Name | Type | Required | Description |
|---|---|---|---|
| `id` | `INTEGER` | Yes | Company ID. |

**Response Fields:**

| Field | Type | Description |
|---|---|---|
| `total` | `INTEGER` | Users total. |
| `name` | `STRING` | Name of the related group. |
| `id` | `INTEGER` | ID of the related group. |

---

### `DELETE /companies.groups`

Suppresses the relationship between a users group and a company.

**Parameters:**

| Name | Type | Required | Description |
|---|---|---|---|
| `groups` | `ARRAY` | Yes | Groups IDs. |
| `unlink_users_too` | `BOOLEAN` | No | When is set to true, it breaks the relation between the company users and the group. |
| `id` | `INTEGER` | Yes | Company ID. |

**Response Fields:**

| Field | Type | Description |
|---|---|---|
| `id` | `ARRAY` | Group ID. |

---

### `POST /companies.groups`

Relates a users group to a company.

**Parameters:**

| Name | Type | Required | Description |
|---|---|---|---|
| `groups` | `ARRAY` | Yes | Groups IDs. |
| `id` | `INTEGER` | Yes | Company ID. |

**Response Fields:**

| Field | Type | Description |
|---|---|---|
| `id` | `ARRAY` | Group ID. |

---

### `GET /companies.observers`

Returns all active companies and their observers, 
            or the observers for the specified companies.

**Parameters:**

| Name | Type | Required | Description |
|---|---|---|---|
| `ids` | `ARRAY` | No | Company IDs. |

**Response Fields:**

| Field | Type | Description |
|---|---|---|
| `observer_groups` | `ARRAY` | The groups’ IDs that are observers of the entity. |
| `observer_users` | `ARRAY` | The observers’ users IDs. |
| `name` | `STRING` | Company name. |
| `id` | `INTEGER` | Company ID. |

---

### `DELETE /companies.observers`

Removes observers from a company.

**Parameters:**

| Name | Type | Required | Description |
|---|---|---|---|
| `observer_users` | `ARRAY` | Yes | Users IDs to be removed as observers. |
| `id` | `INTEGER` | Yes | Company ID. |

**Response Fields:**

| Field | Type | Description |
|---|---|---|
| `value` | `BOOLEAN` | Returns 'true' if the users were correctly removed as observers from the company.                          Returns 'false' if, for any reason, they weren't removed from the company,                          or if the users weren't observers of the company. |
| `id` | `INTEGER` | User ID. |

---

### `POST /companies.observers`

Add users as observers to a company.

**Parameters:**

| Name | Type | Required | Description |
|---|---|---|---|
| `observer_users` | `ARRAY` | Yes | Users IDs to be added as observers. |
| `id` | `INTEGER` | Yes | Company ID. |

**Response Fields:**

| Field | Type | Description |
|---|---|---|
| `value` | `BOOLEAN` | Returns 'true' if the users were correctly added as observers to the company.                          Returns 'false' if, for any reason, they weren't added to the company,                          or if the users were already observers of the company. |
| `id` | `INTEGER` | User ID. |

---

### `GET /companies.users`

Lists the members of a company.

**Parameters:**

| Name | Type | Required | Description |
|---|---|---|---|
| `user_id` | `INTEGER` | No | User ID |
| `id` | `INTEGER` | Yes | Company ID. |

**Response Fields:**

| Field | Type | Description |
|---|---|---|
| `email` | `STRING` | User email. |
| `username` | `STRING` | Username. |
| `name` | `STRING` | User full name. |
| `id` | `INTEGER` | User ID. |

---

### `DELETE /companies.users`

Removes a user from a company. If the user is within a group that belongs to that company, they will also be removed from that group.

**Parameters:**

| Name | Type | Required | Description |
|---|---|---|---|
| `users` | `ARRAY` | Yes | Users IDs. |
| `id` | `INTEGER` | Yes | Company ID. |

**Response Fields:**

| Field | Type | Description |
|---|---|---|
| `id` | `ARRAY` | User ID. |

---

### `POST /companies.users`

Adds a user to a company. If the company contains groups, the users will also be added to those groups.

**Parameters:**

| Name | Type | Required | Description |
|---|---|---|---|
| `users` | `ARRAY` | Yes | Users IDs. |
| `id` | `INTEGER` | Yes | Company ID. |

**Response Fields:**

| Field | Type | Description |
|---|---|---|
| `id` | `ARRAY` | User ID. |

---

### `GET /groups`

Returns all active groups of users, or one in particular if an ID or name is provided.

**Parameters:**

| Name | Type | Required | Description |
|---|---|---|---|
| `name` | `STRING` | No | Group name. |
| `id` | `INTEGER` | No | Group ID. |

**Response Fields:**

| Field | Type | Description |
|---|---|---|
| `total` | `INTEGER` | Users total. |
| `name` | `STRING` | Group name. |
| `id` | `INTEGER` | Group ID. |

---

### `DELETE /groups`

Erases a group of users.

**Parameters:**

| Name | Type | Required | Description |
|---|---|---|---|
| `id` | `INTEGER` | Yes | Group ID. |

**Response Fields:**

| Field | Type | Description |
|---|---|---|
| `status` | `STRING` | Returns 'OK' if the object was correctly deleted; or 'ERROR' if something went wrong. |

---

### `POST /groups`

Creates a group of users.

**Parameters:**

| Name | Type | Required | Description |
|---|---|---|---|
| `name` | `STRING` | Yes | Group name. |

**Response Fields:**

| Field | Type | Description |
|---|---|---|
| `id` | `INTEGER` | ID of the created object. |

---

### `GET /groups.observers`

Returns all active groups and their observers, 
            or the observers for the specified groups.

**Parameters:**

| Name | Type | Required | Description |
|---|---|---|---|
| `ids` | `ARRAY` | No | Group IDs. |

**Response Fields:**

| Field | Type | Description |
|---|---|---|
| `observer_groups` | `ARRAY` | The groups’ IDs that are observers of the entity. |
| `observer_users` | `ARRAY` | The observers’ users IDs. |
| `name` | `STRING` | Group name. |
| `id` | `INTEGER` | Group ID. |

---

### `DELETE /groups.observers`

Removes observers from a group.

**Parameters:**

| Name | Type | Required | Description |
|---|---|---|---|
| `observer_users` | `ARRAY` | Yes | Users IDs to be removed as observers. |
| `id` | `INTEGER` | Yes | Group ID. |

**Response Fields:**

| Field | Type | Description |
|---|---|---|
| `value` | `BOOLEAN` | Returns 'true' if the users were correctly removed as observers from the group.                          Returns 'false' if, for any reason, they weren't removed from the group,                          or if the users weren't observers of the group. |
| `id` | `INTEGER` | User ID. |

---

### `POST /groups.observers`

Add users as observers to a group.

**Parameters:**

| Name | Type | Required | Description |
|---|---|---|---|
| `observer_users` | `ARRAY` | Yes | Users IDs to be added as observers. |
| `id` | `INTEGER` | Yes | Group ID. |

**Response Fields:**

| Field | Type | Description |
|---|---|---|
| `value` | `BOOLEAN` | Returns 'true' if the users were correctly added as observers to the group.                          Returns 'false' if, for any reason, they weren't added to the group,                          or if the users were already observers of the group. |
| `id` | `INTEGER` | User ID. |

---

### `GET /groups.users`

Lists the members of a group.

**Parameters:**

| Name | Type | Required | Description |
|---|---|---|---|
| `user_id` | `INTEGER` | No | User ID |
| `id` | `INTEGER` | Yes | Group ID. |

**Response Fields:**

| Field | Type | Description |
|---|---|---|
| `email` | `STRING` | User email. |
| `username` | `STRING` | Username. |
| `name` | `STRING` | User full name. |
| `id` | `INTEGER` | User ID. |

---

### `DELETE /groups.users`

Removes a user from a group.

**Parameters:**

| Name | Type | Required | Description |
|---|---|---|---|
| `users` | `ARRAY` | Yes | Users IDs. |
| `id` | `INTEGER` | Yes | Group ID. |

**Response Fields:**

| Field | Type | Description |
|---|---|---|
| `id` | `ARRAY` | User ID. |

---

### `POST /groups.users`

Adds a user to a group.

**Parameters:**

| Name | Type | Required | Description |
|---|---|---|---|
| `users` | `ARRAY` | Yes | Users IDs. |
| `id` | `INTEGER` | Yes | Group ID. |

**Response Fields:**

| Field | Type | Description |
|---|---|---|
| `id` | `ARRAY` | User ID. |

---

### `GET /helpdesks`

Returns all the active help desks, or one in particular.

**Parameters:**

| Name | Type | Required | Description |
|---|---|---|---|
| `include_deleted` | `BOOLEAN` | No | True if deleted help desks should be included. |
| `name` | `STRING` | No | Help desk name. |
| `id` | `INTEGER` | No | Help desk ID. |

**Response Fields:**

| Field | Type | Description |
|---|---|---|
| `engine_id` | `INTEGER` | Help desk engine ID. |
| `status_id` | `INTEGER` | Help desk status ID. |
| `total_members` | `INTEGER` | Total of members. |
| `parent_id` | `INTEGER` | Help desk parent ID. |
| `name` | `STRING` | Help desk name. |
| `id` | `INTEGER` | Help desk ID. |

---

### `GET /helpdesks.observers`

Returns all active help desks and their observers, 
            or the observers for the specified help desks.

**Parameters:**

| Name | Type | Required | Description |
|---|---|---|---|
| `ids` | `ARRAY` | No | Help Desk IDs. |

**Response Fields:**

| Field | Type | Description |
|---|---|---|
| `observer_groups` | `ARRAY` | The groups’ IDs that are observers of the entity. |
| `observer_users` | `ARRAY` | The observers’ users IDs. |
| `name` | `STRING` | Help Desk name. |
| `id` | `INTEGER` | Help Desk ID. |

---

### `DELETE /helpdesks.observers`

Removes observers from a help desk.

**Parameters:**

| Name | Type | Required | Description |
|---|---|---|---|
| `observer_users` | `ARRAY` | Yes | Users IDs to be removed as observers. |
| `id` | `INTEGER` | Yes | Help Desk ID. |

**Response Fields:**

| Field | Type | Description |
|---|---|---|
| `value` | `BOOLEAN` | Returns 'true' if the users were correctly removed as observers from the help desk.                          Returns 'false' if, for any reason, they weren't removed from the help desk,                          or if the users weren't observers of the help desk. |
| `id` | `INTEGER` | User ID. |

---

### `POST /helpdesks.observers`

Add users as observers to a help desk.

**Parameters:**

| Name | Type | Required | Description |
|---|---|---|---|
| `observer_users` | `ARRAY` | Yes | Users IDs to be added as observers. |
| `id` | `INTEGER` | Yes | Help Desk ID. |

**Response Fields:**

| Field | Type | Description |
|---|---|---|
| `value` | `BOOLEAN` | Returns 'true' if the users were correctly added as observers to the help desk.                          Returns 'false' if, for any reason, they weren't added to the help desk,                          or if the users were already observers of the help desk. |
| `id` | `INTEGER` | User ID. |

---

### `GET /helpdesksandlevels`

Returns all the help desks and levels, or one in particular.

**Parameters:**

| Name | Type | Required | Description |
|---|---|---|---|
| `include_deleted` | `BOOLEAN` | No | True if deleted help desks and levels should be included. |
| `id` | `INTEGER` | No | Level ID. |

**Response Fields:**

| Field | Type | Description |
|---|---|---|
| `level_order` | `INTEGER` | If it's a level, indicates the order. |
| `status_id` | `INTEGER` | Status ID. 1: Enabled, 2: Suspend, 3: Out time work, 4: Disabled. |
| `engine_id` | `INTEGER` | Engine ID. 1: Round robin, 2: By load, 3: Free, 4: Manual. |
| `name` | `STRING` | If it is a help desk, indicates the name. |
| `members_ids` | `ARRAY` | Members IDs. |
| `total_members` | `INTEGER` | Total of members. |
| `parent_id` | `INTEGER` | Parent ID. |
| `id` | `INTEGER` | Level ID. |

---

### `GET /levels`

Returns all active help desks' levels, or one in particular.

**Parameters:**

| Name | Type | Required | Description |
|---|---|---|---|
| `include_deleted` | `BOOLEAN` | No | Set it to 'false' to exclude deleted levels. By default, it will retrieve deleted levels. |
| `id` | `INTEGER` | No | Level ID. |

**Response Fields:**

| Field | Type | Description |
|---|---|---|
| `level_order` | `INTEGER` | Level order. |
| `engine_id` | `INTEGER` | Engine ID. 1: Round robin, 2: By load, 3: Free, 4: Manual. |
| `status_id` | `INTEGER` | Status ID. 1: Enabled, 2: Suspend, 3: Out time work, 4: Disabled. |
| `members_ids` | `ARRAY` | List of members IDs that the level has. |
| `total_members` | `INTEGER` | Total amount of members that the level has. |
| `id` | `INTEGER` | Level ID. |

---

### `GET /levels.observers`

Returns all active help desk levels and their observers, 
            or the observers for the specified help desk levels.

**Parameters:**

| Name | Type | Required | Description |
|---|---|---|---|
| `ids` | `ARRAY` | No | Level IDs. |

**Response Fields:**

| Field | Type | Description |
|---|---|---|
| `observer_groups` | `ARRAY` | The groups’ IDs that are observers of the entity. |
| `observer_users` | `ARRAY` | The observers’ users IDs. |
| `name` | `STRING` | Level name. |
| `id` | `INTEGER` | Level ID. |

---

### `DELETE /levels.observers`

Removes observers from a help desk level.

**Parameters:**

| Name | Type | Required | Description |
|---|---|---|---|
| `observer_users` | `ARRAY` | Yes | Users IDs to be removed as observers. |
| `id` | `INTEGER` | Yes | Level ID. |

**Response Fields:**

| Field | Type | Description |
|---|---|---|
| `value` | `BOOLEAN` | Returns 'true' if the users were correctly removed as observers from the help desk level.                          Returns 'false' if, for any reason, they weren't removed from the help desk level,                          or if the users weren't observers of the help desk level. |
| `id` | `INTEGER` | User ID. |

---

### `POST /levels.observers`

Add users as observers to a help desk level.

**Parameters:**

| Name | Type | Required | Description |
|---|---|---|---|
| `observer_users` | `ARRAY` | Yes | Users IDs to be added as observers. |
| `id` | `INTEGER` | Yes | Level ID. |

**Response Fields:**

| Field | Type | Description |
|---|---|---|
| `value` | `BOOLEAN` | Returns 'true' if the users were correctly added as observers to the help desk level.                          Returns 'false' if, for any reason, they weren't added to the help desk level,                          or if the users were already observers of the help desk level. |
| `id` | `INTEGER` | User ID. |

---

### `GET /locations`

Returns all active locations, or one in particular.

**Parameters:**

| Name | Type | Required | Description |
|---|---|---|---|
| `id` | `INTEGER` | No | Location ID. |

**Response Fields:**

| Field | Type | Description |
|---|---|---|
| `parent_id` | `INTEGER` | Parent location ID. |
| `total` | `INTEGER` | Number of users with this location. |
| `name` | `STRING` | Location name. |
| `id` | `INTEGER` | Location ID. |

---

### `DELETE /locations`

Erases an existing location and its sublocations.

**Parameters:**

| Name | Type | Required | Description |
|---|---|---|---|
| `id` | `INTEGER` | Yes | Location ID. |

**Response Fields:**

| Field | Type | Description |
|---|---|---|
| `status` | `STRING` | Returns 'OK' if the location was correctly deleted; or 'ERROR' if something went wrong. |

---

### `POST /locations`

Creates a location.

**Parameters:**

| Name | Type | Required | Description |
|---|---|---|---|
| `parent_id` | `INTEGER` | No | Parent location ID. |
| `name` | `STRING` | Yes | Location name. |

**Response Fields:**

| Field | Type | Description |
|---|---|---|
| `id` | `INTEGER` | Location ID. |

---

### `GET /locations.observers`

Returns all active locations and their observers, 
            or the observers for the specified locations.

**Parameters:**

| Name | Type | Required | Description |
|---|---|---|---|
| `ids` | `ARRAY` | No | Location IDs. |

**Response Fields:**

| Field | Type | Description |
|---|---|---|
| `observer_groups` | `ARRAY` | The groups’ IDs that are observers of the entity. |
| `observer_users` | `ARRAY` | The observers’ users IDs. |
| `name` | `STRING` | Location name. |
| `id` | `INTEGER` | Location ID. |

---

### `DELETE /locations.observers`

Removes observers from a location.

**Parameters:**

| Name | Type | Required | Description |
|---|---|---|---|
| `observer_users` | `ARRAY` | Yes | Users IDs to be removed as observers. |
| `id` | `INTEGER` | Yes | Location ID. |

**Response Fields:**

| Field | Type | Description |
|---|---|---|
| `value` | `BOOLEAN` | Returns 'true' if the users were correctly removed as observers from the location.                          Returns 'false' if, for any reason, they weren't removed from the location,                          or if the users weren't observers of the location. |
| `id` | `INTEGER` | User ID. |

---

### `POST /locations.observers`

Add users as observers to a location.

**Parameters:**

| Name | Type | Required | Description |
|---|---|---|---|
| `observer_users` | `ARRAY` | Yes | Users IDs to be added as observers. |
| `id` | `INTEGER` | Yes | Location ID. |

**Response Fields:**

| Field | Type | Description |
|---|---|---|
| `value` | `BOOLEAN` | Returns 'true' if the users were correctly added as observers to the location.                          Returns 'false' if, for any reason, they weren't added to the location,                          or if the users were already observers of the location. |
| `id` | `INTEGER` | User ID. |

---

### `GET /locations.users`

Lists the members of a location.

**Parameters:**

| Name | Type | Required | Description |
|---|---|---|---|
| `user_id` | `INTEGER` | No | User ID |
| `id` | `INTEGER` | Yes | Location ID. |

**Response Fields:**

| Field | Type | Description |
|---|---|---|
| `email` | `STRING` | User email. |
| `username` | `STRING` | Username. |
| `name` | `STRING` | User full name. |
| `id` | `INTEGER` | User ID. |

---

### `DELETE /locations.users`

Removes users from a location.

**Parameters:**

| Name | Type | Required | Description |
|---|---|---|---|
| `users` | `ARRAY` | Yes | Users IDs to be removed from the location. |
| `id` | `INTEGER` | Yes | Location ID. |

**Response Fields:**

| Field | Type | Description |
|---|---|---|
| `value` | `BOOLEAN` | Returns 'true' if the user was correctly removed from the location or 'false' if it wasn't. |
| `id` | `INTEGER` | Location ID. |

---

### `POST /locations.users`

Adds users to a location.

**Parameters:**

| Name | Type | Required | Description |
|---|---|---|---|
| `users` | `ARRAY` | Yes | Users IDs linked to the location. |
| `id` | `INTEGER` | Yes | Location ID. |

**Response Fields:**

| Field | Type | Description |
|---|---|---|
| `value` | `BOOLEAN` | Returns 'true' if the user was correctly associated with the location or 'false' if it wasn't. |
| `id` | `INTEGER` | Location ID. |

---

### `GET /user`

Returns the info of a user.

**Parameters:**

| Name | Type | Required | Description |
|---|---|---|---|
| `include_disabled` | `BOOLEAN` | No | Indicate if disabled users should be included. True if they should be included and false if not. If this parameter is not provided then disabled users won't be returned. |
| `id` | `INTEGER` | Yes | User ID. |

**Response Fields:**

| Field | Type | Description |
|---|---|---|
| `department` | `STRING` | User department. |
| `phone` | `STRING` | User phone number. |
| `mobile` | `STRING` | User mobile phone number. |
| `birthday` | `STRING` | User birthday. |
| `position` | `STRING` | User position. |
| `other` | `STRING` | User secondary phone number. |
| `role_name` | `STRING` | User’s role. |
| `username` | `STRING` | Username. |
| `user_type` | `INTEGER` | User’s type. Returns 1 if the user is an agent and 2 if it is an end user. |
| `type` | `INTEGER` | User type: 1: System, 2: LDAP, 3: Webservice, 4: Customer, 5: Mailbox. |
| `is_disabled` | `BOOLEAN` | Returns 'true' if the user has been disabled. |
| `country` | `STRING` | User country. |
| `fax` | `STRING` | User fax number. |
| `other_email` | `STRING` | User secondary email address. |
| `office` | `STRING` | User office phone number. |
| `address` | `STRING` | User home address. |
| `name` | `STRING` | User name. |
| `location` | `STRING` | User localization. |
| `is_external` | `BOOLEAN` | Returns 'true' if the user is external. |
| `doc` | `STRING` | User national ID number. |
| `manager_id` | `INTEGER` | User's manager ID. |
| `email` | `STRING` | User email address. |
| `employee_number` | `STRING` | User's employee number. |
| `city` | `STRING` | User city. |
| `lastname` | `STRING` | User lastname. |
| `id` | `INTEGER` | User ID. |
| `is_deleted` | `BOOLEAN` | Returns 'true' if the user has been deleted. |

---

### `PUT /user`

Updates the info of a user.

**Parameters:**

| Name | Type | Required | Description |
|---|---|---|---|
| `department` | `STRING` | No | User department. |
| `mobile` | `STRING` | No | User mobile phone number. |
| `birthday` | `STRING` | No | User birthday. |
| `position` | `STRING` | No | User position. |
| `other` | `STRING` | No | User secondary phone number. |
| `username` | `STRING` | No | Username. |
| `city` | `STRING` | No | User city. |
| `employee_number` | `STRING` | No | User employee number. |
| `country` | `STRING` | No | User country. |
| `fax` | `STRING` | No | User fax number. |
| `phone` | `STRING` | No | User phone number. |
| `office` | `STRING` | No | User office phone number. |
| `address` | `STRING` | No | User home address. |
| `name` | `STRING` | No | User name. |
| `doc` | `STRING` | No | User national ID number. |
| `other` | `STRING` | No | User secondary email address. |
| `manager_id` | `INTEGER` | No | User's manager ID. |
| `email` | `STRING` | No | User email address. |
| `localization` | `STRING` | No | Localization of the user. |
| `lastname` | `STRING` | No | User lastname. |
| `id` | `INTEGER` | Yes | User ID. |
| `language` | `STRING` | No | User language. es: Español, en: English (US), en_GB: English (UK), pt: Português, fr: Français, de: Deutsch, ca: Català, it: Italiano, nl: Nederlands, el: Ελληνικά. |

**Response Fields:**

| Field | Type | Description |
|---|---|---|
| `status` | `STRING` | Returns 'OK' if the user was correctly updated; or 'ERROR' if something went wrong. |

---

### `POST /user`

Creates a new user.

**Parameters:**

| Name | Type | Required | Description |
|---|---|---|---|
| `department` | `STRING` | No | User department. |
| `mobile` | `STRING` | No | User mobile phone number. |
| `birthday` | `STRING` | No | Birthday of the user. |
| `position` | `STRING` | No | User position. |
| `other` | `STRING` | No | User secondary phone number. |
| `localization` | `STRING` | No | Localization of the user. |
| `username` | `STRING` | No | Username. |
| `employee_number` | `STRING` | No | User employee number. |
| `country` | `STRING` | No | User country. |
| `force_password_change` | `BOOLEAN` | No | If true, the user will be forced to change their password on the next login. |
| `fax` | `STRING` | No | User fax number. |
| `phone` | `STRING` | No | User phone number. |
| `other` | `STRING` | No | User secondary email address. |
| `address` | `STRING` | No | User home address. |
| `name` | `STRING` | Yes | User name. |
| `pass` | `STRING` | No | User password. |
| `is_external` | `BOOLEAN` | No | An external user can't login to the system and can only interact with it via email. |
| `doc` | `STRING` | No | User national ID number. |
| `office` | `STRING` | No | User office phone number. |
| `manager_id` | `INTEGER` | No | User's manager ID. |
| `email` | `STRING` | Yes | User email address. |
| `city` | `STRING` | No | User city. |
| `lastname` | `STRING` | Yes | User lastname. |
| `send_set_password_email` | `BOOLEAN` | No | If true, the user will receive an email with a link to set their password. |

**Response Fields:**

| Field | Type | Description |
|---|---|---|
| `department` | `STRING` | User department. |
| `phone` | `STRING` | User phone number. |
| `mobile` | `STRING` | User mobile phone number. |
| `birthday` | `STRING` | User birthday. |
| `position` | `STRING` | User position. |
| `other` | `STRING` | User secondary phone number. |
| `role_name` | `STRING` | User’s role. |
| `username` | `STRING` | Username. |
| `user_type` | `INTEGER` | User’s type. Returns 1 if the user is an agent and 2 if it is an end user. |
| `type` | `INTEGER` | User type: 1: System, 2: LDAP, 3: Webservice, 4: Customer, 5: Mailbox. |
| `is_disabled` | `BOOLEAN` | Returns 'true' if the user has been disabled. |
| `country` | `STRING` | User country. |
| `fax` | `STRING` | User fax number. |
| `other_email` | `STRING` | User secondary email address. |
| `office` | `STRING` | User office phone number. |
| `address` | `STRING` | User home address. |
| `name` | `STRING` | User name. |
| `location` | `STRING` | User localization. |
| `is_external` | `BOOLEAN` | Returns 'true' if the user is external. |
| `doc` | `STRING` | User national ID number. |
| `manager_id` | `INTEGER` | User's manager ID. |
| `email` | `STRING` | User email address. |
| `employee_number` | `STRING` | User's employee number. |
| `city` | `STRING` | User city. |
| `lastname` | `STRING` | User lastname. |
| `id` | `INTEGER` | User ID. |
| `is_deleted` | `BOOLEAN` | Returns 'true' if the user has been deleted. |

---

### `DELETE /user`

Deletes a user.

**Parameters:**

| Name | Type | Required | Description |
|---|---|---|---|
| `id` | `INTEGER` | Yes | User ID. |

**Response Fields:**

| Field | Type | Description |
|---|---|---|
| `status` | `STRING` | Returns 'OK' if the user was correctly deleted; or 'ERROR' if something went wrong. |

---

### `GET /user.by`

Retrieves the user matching the username or email and displays some basic information about the user. At least one of the input parameters is required.

**Parameters:**

| Name | Type | Required | Description |
|---|---|---|---|
| `username` | `STRING` | No | Username. |
| `email` | `STRING` | No | User email address. |

**Response Fields:**

| Field | Type | Description |
|---|---|---|
| `department` | `STRING` | User department. |
| `phone` | `STRING` | User phone number. |
| `mobile` | `STRING` | User mobile phone number. |
| `birthday` | `STRING` | User birthday. |
| `position` | `STRING` | User position. |
| `other` | `STRING` | User secondary phone number. |
| `role_name` | `STRING` | User’s role. |
| `username` | `STRING` | Username. |
| `user_type` | `INTEGER` | User’s type. Returns 1 if the user is an agent and 2 if it is an end user. |
| `type` | `INTEGER` | User type: 1: System, 2: LDAP, 3: Webservice, 4: Customer, 5: Mailbox. |
| `is_disabled` | `BOOLEAN` | Returns 'true' if the user has been disabled. |
| `country` | `STRING` | User country. |
| `fax` | `STRING` | User fax number. |
| `other_email` | `STRING` | User secondary email address. |
| `office` | `STRING` | User office phone number. |
| `address` | `STRING` | User home address. |
| `name` | `STRING` | User name. |
| `location` | `STRING` | User localization. |
| `is_external` | `BOOLEAN` | Returns 'true' if the user is external. |
| `doc` | `STRING` | User national ID number. |
| `manager_id` | `INTEGER` | User's manager ID. |
| `email` | `STRING` | User email address. |
| `employee_number` | `STRING` | User's employee number. |
| `city` | `STRING` | User city. |
| `lastname` | `STRING` | User lastname. |
| `id` | `INTEGER` | User ID. |
| `is_deleted` | `BOOLEAN` | Returns 'true' if the user has been deleted. |

---

### `POST /user.convert`

Changes the user from external into internal and sends an email to the user requesting a new password.

**Parameters:**

| Name | Type | Required | Description |
|---|---|---|---|
| `id` | `INTEGER` | Yes | User ID. |

**Response Fields:**

| Field | Type | Description |
|---|---|---|
| `status` | `STRING` | Returns 'OK' if the user was successfully converted from external into internal; or 'ERROR' if something went wrong. |

---

### `PUT /user.disable`

Disables a user.

**Parameters:**

| Name | Type | Required | Description |
|---|---|---|---|
| `id` | `INTEGER` | Yes | User ID. |

**Response Fields:**

| Field | Type | Description |
|---|---|---|
| `status` | `STRING` | Returns 'OK' if the user was successfully disabled; or 'ERROR' if something went wrong. |

---

### `PUT /user.enable`

Enables a user.

**Parameters:**

| Name | Type | Required | Description |
|---|---|---|---|
| `id` | `INTEGER` | Yes | User ID. |

**Response Fields:**

| Field | Type | Description |
|---|---|---|
| `status` | `STRING` | Returns 'OK' if the user was successfully enabled; or 'ERROR' if something went wrong. |

---

### `PUT /user.password`

Changes the password of a user.

**Parameters:**

| Name | Type | Required | Description |
|---|---|---|---|
| `force_password_change` | `BOOLEAN` | No | If true, the user will be forced to change their password on the next login. |
| `password` | `STRING` | Yes | New password. |
| `id` | `INTEGER` | Yes | User ID. |

**Response Fields:**

| Field | Type | Description |
|---|---|---|
| `status` | `STRING` | Returns 'OK' if the password has been successfully changed; or 'ERROR' if something went wrong. |

---

### `POST /user.password.reset`

Sends an email to the user requesting a new password.

**Parameters:**

| Name | Type | Required | Description |
|---|---|---|---|
| `type` | `STRING` | Yes | Either 'NEW_USER' for new users or 'RESET_PASSWORD' for existing ones. |
| `id` | `INTEGER` | Yes | User ID. |

**Response Fields:**

| Field | Type | Description |
|---|---|---|
| `status` | `STRING` | Returns 'OK' if the password has been successfully reset; or 'ERROR' if something went wrong. |

---

### `POST /user.token`

Creates a new session token for the user that matches the input ID.

**Parameters:**

| Name | Type | Required | Description |
|---|---|---|---|
| `id` | `INTEGER` | Yes | User ID. |

**Response Fields:**

| Field | Type | Description |
|---|---|---|
| `token` | `STRING` | The new token ID. |

---

### `GET /users`

Retrieves users and displays some basic information about them. It's possible to specify an array of user IDs in order to filter specific users; otherwise, it retrieves all users.

**Parameters:**

| Name | Type | Required | Description |
|---|---|---|---|
| `include_disabled` | `BOOLEAN` | No | True if disabled users should be included. |
| `ids` | `ARRAY` | No | Users IDs. |

**Response Fields:**

| Field | Type | Description |
|---|---|---|
| `department` | `STRING` | User department. |
| `phone` | `STRING` | User phone number. |
| `mobile` | `STRING` | User mobile phone number. |
| `birthday` | `STRING` | User birthday. |
| `position` | `STRING` | User position. |
| `other` | `STRING` | User secondary phone number. |
| `role_name` | `STRING` | User’s role. |
| `username` | `STRING` | Username. |
| `user_type` | `INTEGER` | User’s type. Returns 1 if the user is an agent and 2 if it is an end user. |
| `type` | `INTEGER` | User type: 1: System, 2: LDAP, 3: Webservice, 4: Customer, 5: Mailbox. |
| `is_disabled` | `BOOLEAN` | Returns 'true' if the user has been disabled. |
| `country` | `STRING` | User country. |
| `fax` | `STRING` | User fax number. |
| `other_email` | `STRING` | User secondary email address. |
| `office` | `STRING` | User office phone number. |
| `address` | `STRING` | User home address. |
| `name` | `STRING` | User name. |
| `location` | `STRING` | User localization. |
| `is_external` | `BOOLEAN` | Returns 'true' if the user is external. |
| `doc` | `STRING` | User national ID number. |
| `manager_id` | `INTEGER` | User's manager ID. |
| `email` | `STRING` | User email address. |
| `employee_number` | `STRING` | User's employee number. |
| `city` | `STRING` | User city. |
| `lastname` | `STRING` | User lastname. |
| `id` | `INTEGER` | User ID. |
| `is_deleted` | `BOOLEAN` | Returns 'true' if the user has been deleted. |

---

### `GET /users.by`

Retrieves users matching username, email or any of their phone numbers and displays basic information about them.

**Parameters:**

| Name | Type | Required | Description |
|---|---|---|---|
| `phone` | `STRING` | No | User phone number. |
| `phones` | `STRING` | No | User phone number of any kind (main phone number, fax number, office phone number, mobile phone number or other phone number). |
| `other_phone` | `STRING` | No | User secondary phone number. |
| `username` | `STRING` | No | Username. |
| `exact_match` | `BOOLEAN` | No | Indicate if the search should return results if (and only if) there are users with an identical value to the parameter. True if the match is exact. If this parameter is not provided then the search will return any users where the search term is contained in the parameter. |
| `employee_number` | `STRING` | No | User employee number. |
| `fax_phone` | `STRING` | No | User fax number. |
| `page_key` | `STRING` | No | Hash key of the results page to retrieve. If null, the first page of results will be returned. Ignored when page or page_size is sent (offset pagination). |
| `include_disabled` | `BOOLEAN` | No | Indicate if disabled users should be included. True if they should be included and false if not. If this parameter is not provided then disabled users won't be returned. |
| `email` | `STRING` | No | User email address. |
| `mobile_phone` | `STRING` | No | User mobile phone number. |
| `office_phone` | `STRING` | No | User office phone number. |

**Response Fields:**

| Field | Type | Description |
|---|---|---|
| `department` | `STRING` | User department. |
| `phone` | `STRING` | User phone number. |
| `mobile` | `STRING` | User mobile phone number. |
| `birthday` | `STRING` | User birthday. |
| `position` | `STRING` | User position. |
| `other` | `STRING` | User secondary phone number. |
| `role_name` | `STRING` | User’s role. |
| `username` | `STRING` | Username. |
| `next_page_key` | `STRING` | Hash key of the next page of results. If null, the results page retrieved is the last one. |
| `user_type` | `INTEGER` | User’s type. Returns 1 if the user is an agent and 2 if it is an end user. |
| `type` | `INTEGER` | User type: 1: System, 2: LDAP, 3: Webservice, 4: Customer, 5: Mailbox. |
| `is_disabled` | `BOOLEAN` | Returns 'true' if the user has been disabled. |
| `country` | `STRING` | User country. |
| `fax` | `STRING` | User fax number. |
| `other_email` | `STRING` | User secondary email address. |
| `office` | `STRING` | User office phone number. |
| `address` | `STRING` | User home address. |
| `name` | `STRING` | User name. |
| `location` | `STRING` | User localization. |
| `is_external` | `BOOLEAN` | Returns 'true' if the user is external. |
| `doc` | `STRING` | User national ID number. |
| `manager_id` | `INTEGER` | User's manager ID. |
| `email` | `STRING` | User email address. |
| `employee_number` | `STRING` | User's employee number. |
| `city` | `STRING` | User city. |
| `lastname` | `STRING` | User lastname. |
| `id` | `INTEGER` | User ID. |
| `is_deleted` | `BOOLEAN` | Returns 'true' if the user has been deleted. |

---

### `GET /users.groups`

Returns the user's groups, companies, helpdesks and locations.

**Parameters:**

| Name | Type | Required | Description |
|---|---|---|---|
| `ids` | `ARRAY` | Yes | Users IDs. |

**Response Fields:**

| Field | Type | Description |
|---|---|---|
| `helpdesks` | `ARRAY` | Array with the user helpdesks/levels. |
| `groups_observed` | `ARRAY` | Array with the user observed groups. |
| `locations` | `ARRAY` | Array with the user locations. |
| `groups` | `ARRAY` | Array with the user groups. |
| `helpdesks_observed` | `ARRAY` | Array with the user observed helpdesks. |
| `companies` | `ARRAY` | Array with the user companies. |
| `companies_observed` | `ARRAY` | Array with the user observed companies. |
| `id` | `INTEGER` | User ID. |
| `locations_observed` | `ARRAY` | Array with the user observed locations. |
| `username` | `STRING` | Username. |
| `email` | `STRING` | User email address. |

---

