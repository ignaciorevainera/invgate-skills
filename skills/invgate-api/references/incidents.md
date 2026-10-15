# InvGate API Reference - Incidents & Requests

### `GET /incident`

Returns the information of the given request.

**Parameters:**

| Name | Type | Required | Description |
|---|---|---|---|
| `date_format` | `STRING` | No | Indicate the date format. The available formats are 'epoch' or 'iso8601'. If null, epoch format is returned. |
| `comments` | `BOOLEAN` | No | When set to true, it includes the comments of the request. |
| `decoded_special_characters` | `BOOLEAN` | No | Indicate if the message is returned decoded. If null, coded format is returned. |
| `id` | `INTEGER` | Yes | Request ID. |

**Response Fields:**

| Field | Type | Description |
|---|---|---|
| `creator_id` | `INTEGER` | Creator ID. |
| `user_id` | `INTEGER` | Customer ID. |
| `sla_incident_resolution` | `STRING` | Resolution SLA of the request. |
| `assigned_id` | `INTEGER` | Assigned agent ID. |
| `request_customer_sentiment_initial` | `STRING` | Initial customer sentiment for the request. "positive", "neutral", "negative" |
| `solved_at` | `STRING` | Solution date in epoch or ISO-8601 format depending on the date_format parameter. |
| `closed_at` | `STRING` | Closing date in epoch or ISO-8601 format depending on the date_format parameter. |
| `id` | `INTEGER` | Request ID. |
| `status_id` | `INTEGER` | Status ID. |
| `comments` | `ARRAY` | Array with comments of the requests with the comment structure. |
| `priority_id` | `INTEGER` | Priority ID. |
| `last_update` | `STRING` | Last update in epoch or ISO-8601 format depending on the date_format parameter. |
| `custom_fields` | `ARRAY` | Array with the custom fields ids as keys and the respective values. |
| `date_ocurred` | `STRING` | Occurrence date in epoch or ISO-8601 format depending on the date_format parameter. |
| `process_id` | `INTEGER` | Process ID of the request if it is a workflow instance. |
| `type_id` | `INTEGER` | Type ID. |
| `pretty_id` | `STRING` | Request pretty ID as configured on the Service Management instance. |
| `description` | `STRING` | Request description. |
| `title` | `STRING` | Request title. |
| `closed_reason` | `STRING` | Reason of closing. 1: Solution accepted, 2: Solution expired, 3: Customer timeout, 4: Finalized workflow. |
| `created_at` | `STRING` | Creation date in epoch or ISO-8601 format depending on the date_format parameter. |
| `attachments` | `ARRAY` | Array with the IDs of the attachments. |
| `source_id` | `INTEGER` | Source ID. |
| `rating` | `INTEGER` | Stars given to the solution. If there's no rating, this field won't be shown. |
| `request_customer_sentiment_current` | `STRING` | Current customer sentiment for the request. "positive", "neutral", "negative" |
| `assigned_group_id` | `INTEGER` | Help desk ID. |
| `sla_incident_first_reply` | `STRING` | First response SLA of the request. |
| `category_id` | `INTEGER` | Category ID. |

---

### `PUT /incident`

Change attributes of a request.

**Parameters:**

| Name | Type | Required | Description |
|---|---|---|---|
| `date` | `STRING` | No | Occurred on timestamp. |
| `description` | `TEXT` | No | Request description. |
| `title` | `STRING` | No | Request title. |
| `type_id` | `INTEGER` | No | Incident = 1, Service Request = 2, Question = 3, Problem = 4, Change = 5, Major Incident = 6 |
| `customer_id` | `INTEGER` | No | Client ID. |
| `source_id` | `INTEGER` | No | Source ID. |
| `location_id` | `INTEGER` | No | Location ID. |
| `reassignment` | `BOOLEAN` | No | Set to true to reassign the request to a help desk according to the new properties. |
| `date_format` | `STRING` | No | Indicate the date format. The available formats are 'epoch' or 'iso8601'. If null, epoch format is returned. |
| `priority_id` | `INTEGER` | No | Low = 1, Medium = 2, High = 3, Urgent = 4, Critical = 5 |
| `category_id` | `INTEGER` | No | Category name can be obtained calling https://releases.invgate.com/service-desk/api/#categories-GET |
| `id` | `INTEGER` | Yes | Request ID. |

**Response Fields:**

| Field | Type | Description |
|---|---|---|
| `creator_id` | `INTEGER` | Creator ID. |
| `user_id` | `INTEGER` | Customer ID. |
| `status_id` | `INTEGER` | Status ID. |
| `assigned_id` | `INTEGER` | Assigned agent ID. |
| `solved_at` | `STRING` | Solution date in epoch or ISO-8601 format depending on the date_format parameter. |
| `closed_at` | `STRING` | Closing date in epoch or ISO-8601 format depending on the date_format parameter. |
| `id` | `INTEGER` | Request ID. |
| `location_id` | `INTEGER` | Location ID. |
| `priority_id` | `INTEGER` | Priority ID. |
| `last_update` | `STRING` | Last update in epoch or ISO-8601 format depending on the date_format parameter. |
| `date_ocurred` | `STRING` | Occurrence date in epoch or ISO-8601 format depending on the date_format parameter. |
| `process_id` | `INTEGER` | Process ID of the request if it is a workflow instance. |
| `type_id` | `INTEGER` | Type ID. |
| `description` | `STRING` | Request description. |
| `title` | `STRING` | Request title. |
| `closed_reason` | `STRING` | Reason of closing. 1: Solution accepted, 2: Solution expired, 3: Customer timeout, 4: Finalized workflow |
| `created_at` | `STRING` | Creation date in epoch or ISO-8601 format depending on the date_format parameter. |
| `attachments` | `ARRAY` | Array with the IDs of the attachments. |
| `source_id` | `INTEGER` | Source ID. |
| `custom_fields` | `ARRAY` | Array with the custom fields IDs as keys and the respective values. |
| `assigned_group_id` | `INTEGER` | Help desk ID. |
| `category_id` | `INTEGER` | Category ID. |

---

### `POST /incident`

**Parameters:**

| Name | Type | Required | Description |
|---|---|---|---|
| `creator_id` | `INTEGER` | Yes | Creator ID. |
| `customer_id` | `INTEGER` | Yes | Client ID. |
| `title` | `STRING` | Yes | Request title. |
| `description` | `TEXT` | No | Request description. Required for requests and Workflows with descriptions. |
| `type_id` | `INTEGER` | Yes | Incident = 1, Service Request = 2, Question = 3, Problem = 4, Change = 5, Major Incident = 6 |
| `attachments` | `ARRAY` | No | Array of request's attachments. |
| `source_id` | `INTEGER` | No | Source ID. |
| `date` | `STRING` | No | Occurred on timestamp in epoch format. |
| `related_to` | `ARRAY` | No | Requests IDs to link. |
| `location_id` | `INTEGER` | No | Location ID. |
| `priority_id` | `INTEGER` | Yes | Low = 1, Medium = 2, High = 3, Urgent = 4, Critical = 5 |
| `category_id` | `INTEGER` | Yes | Category name can be obtained calling https://releases.invgate.com/service-desk/api/#categories-GET |

**Response Fields:**

| Field | Type | Description |
|---|---|---|
| `request_id` | `INTEGER` | ID of the created request. |
| `status` | `STRING` | Returns 'OK' if the request  was correctly created; or 'ERROR' if something went wrong. |
| `info` | `STRING` | Description of the result. |

---

### `GET /incident.approval`

Lists the approvals instances that the given request has.

**Parameters:**

| Name | Type | Required | Description |
|---|---|---|---|
| `request_id` | `INTEGER` | Yes | Request ID. |
| `date_format` | `STRING` | No | Indicate the date format. The available formats are 'epoch' or 'iso8601'. If null, epoch format is returned. |
| `only_pending` | `BOOLEAN` | No | When set to true, it only returns pending approvals. |

**Response Fields:**

| Field | Type | Description |
|---|---|---|
| `created_at` | `STRING` | Date when the approval was triggered, in epoch or ISO-8601 format depending on the date_format parameter. |
| `type` | `INTEGER` | Type ID of the approval. 1: Predefined approval, 2: Spontaneous approval. |
| `status` | `INTEGER` | Status ID of the approval. -2: Cancelled, -1: Waiting, 0: Rejected, 1: Approved. |
| `author_id` | `INTEGER` | Author ID of the approval. |
| `approval_request_description` | `TEXT` | Description of the approval. |
| `approval_request_id` | `INTEGER` | ID of the approval template. |
| `id` | `INTEGER` | ID of the approval instance. |

---

### `PUT /incident.approval.accept`

Accepts an approval.

**Parameters:**

| Name | Type | Required | Description |
|---|---|---|---|
| `note` | `STRING` | No | Note for the approval acceptance. |
| `approval_id` | `INTEGER` | Yes | Approval ID to be accepted. |
| `user_id` | `INTEGER` | Yes | ID of the user who will accept the approval. |

**Response Fields:**

| Field | Type | Description |
|---|---|---|
| `status` | `STRING` | Returns 'OK' if the approval was correctly accepted. |

---

### `POST /incident.approval.add_voter`

Adds a voter to an approval.

**Parameters:**

| Name | Type | Required | Description |
|---|---|---|---|
| `approval_id` | `INTEGER` | Yes | ID of the approval instance. |
| `user_id` | `INTEGER` | Yes | Author ID of the approval. |

**Response Fields:**

| Field | Type | Description |
|---|---|---|
| `approval_id` | `INTEGER` | ID of the approval instance. |
| `user_id` | `INTEGER` | Author ID of the approval. |

---

### `PUT /incident.approval.cancel`

Cancels an approval.

**Parameters:**

| Name | Type | Required | Description |
|---|---|---|---|
| `approval_id` | `INTEGER` | Yes | Approval ID to be cancelled. |
| `user_id` | `INTEGER` | Yes | ID of the user who will cancel the approval. |

**Response Fields:**

| Field | Type | Description |
|---|---|---|
| `status` | `STRING` | Returns 'OK' if the approval was correctly canceled; or 'ERROR' if something went wrong. |

---

### `GET /incident.approval.possible_voters`

Lists users that could accept or reject the approval.

**Parameters:**

| Name | Type | Required | Description |
|---|---|---|---|
| `approval_id` | `INTEGER` | Yes | Approval ID. |
| `only_pending` | `BOOLEAN` | No | When set to true, it only returns voters who have not voted. |

**Response Fields:**

| Field | Type | Description |
|---|---|---|
| `status` | `INTEGER` | Approval status ID. -2: Annulled, -1: Waiting, 0: Rejected, 1: Approved, 2:Expired. |
| `id` | `INTEGER` | User ID. |

---

### `PUT /incident.approval.reject`

Rejects an approval.

**Parameters:**

| Name | Type | Required | Description |
|---|---|---|---|
| `note` | `STRING` | No | Note for the approval rejection. |
| `approval_id` | `INTEGER` | Yes | Approval ID to be rejected. |
| `user_id` | `INTEGER` | Yes | ID of the user will reject the approval. |

**Response Fields:**

| Field | Type | Description |
|---|---|---|
| `status` | `STRING` | Returns 'OK' if the approval was correctly rejected; or 'ERROR' if something went wrong. |

---

### `GET /incident.approval.status`

Lists the statuses of the approvals.

*No parameters required.*

**Response Fields:**

| Field | Type | Description |
|---|---|---|
| `id` | `ARRAY` | Status ID and description. |

---

### `GET /incident.approval.type`

Lists the available approvals types.

*No parameters required.*

**Response Fields:**

| Field | Type | Description |
|---|---|---|
| `id` | `ARRAY` | Type ID and description. |

---

### `GET /incident.approval.vote_status`

Lists the status of the approval votes.

*No parameters required.*

**Response Fields:**

| Field | Type | Description |
|---|---|---|
| `id` | `ARRAY` | Status ID and description. |

---

### `GET /incident.attachment`

Returns the requested attachment.

**Parameters:**

| Name | Type | Required | Description |
|---|---|---|---|
| `id` | `INTEGER` | Yes | Attachment ID. |

**Response Fields:**

| Field | Type | Description |
|---|---|---|
| `hash` | `STRING` | Hash of the attached file. |
| `extension` | `STRING` | Extension of the attached file. |
| `url` | `STRING` | URL of the attached file. |
| `name` | `STRING` | Name of the attached file. |
| `id` | `INTEGER` | ID of the attached file. |

---

### `GET /incident.attributes.priority`

Lists all the priorities, or only one if an ID its provided.

**Parameters:**

| Name | Type | Required | Description |
|---|---|---|---|
| `id` | `INTEGER` | No | Priority ID. |

**Response Fields:**

| Field | Type | Description |
|---|---|---|
| `name` | `STRING` | Priority name. |
| `id` | `INTEGER` | Priority ID. |

---

### `GET /incident.attributes.source`

Lists all the sources. If an ID is provided, only the one that matches the specified ID will be listed.

**Parameters:**

| Name | Type | Required | Description |
|---|---|---|---|
| `id` | `INTEGER` | No | Source ID. |

**Response Fields:**

| Field | Type | Description |
|---|---|---|
| `name` | `STRING` | Source name. |
| `id` | `INTEGER` | Source ID. |

---

### `GET /incident.attributes.status`

Lists all the status. If an ID is provided, only the one that matches the specified ID will be listed.

**Parameters:**

| Name | Type | Required | Description |
|---|---|---|---|
| `id` | `INTEGER` | No | Status ID. |

**Response Fields:**

| Field | Type | Description |
|---|---|---|
| `name` | `STRING` | Status name. |
| `id` | `INTEGER` | Status ID. |

---

### `GET /incident.attributes.type`

Lists all the types. If an ID is provided, only the one that matches the specified ID will be listed. Use the status filter to include deleted types.

**Parameters:**

| Name | Type | Required | Description |
|---|---|---|---|
| `status` | `STRING` | No | Filter by status: active\|deleted\|all. |
| `id` | `INTEGER` | No | Type ID. |

**Response Fields:**

| Field | Type | Description |
|---|---|---|
| `status` | `STRING` | Type status: 'active' or 'deleted'. |
| `is_system` | `BOOLEAN` | Whether the type is a system-defined one. |
| `name` | `STRING` | Type name. |
| `id` | `INTEGER` | Type ID. |

---

### `POST /incident.cancel`

Cancel a request.

**Parameters:**

| Name | Type | Required | Description |
|---|---|---|---|
| `request_id` | `INTEGER` | Yes | ID of the request to cancel. |
| `author_id` | `INTEGER` | Yes | ID of the user cancelling the request. |
| `comment` | `STRING` | No | Cancellation message |

**Response Fields:**

| Field | Type | Description |
|---|---|---|
| `status` | `STRING` | Returns 'OK' if the request was correctly cancelled; or 'ERROR' if something went wrong. |

---

### `GET /incident.collaborator`

Lists the collaborators IDs.

**Parameters:**

| Name | Type | Required | Description |
|---|---|---|---|
| `request_id` | `INTEGER` | Yes | Request ID. |

**Response Fields:**

| Field | Type | Description |
|---|---|---|
| `id` | `ARRAY` | Collaborator ID. |

---

### `POST /incident.collaborator`

Requests collaboration from the defined user.

**Parameters:**

| Name | Type | Required | Description |
|---|---|---|---|
| `request_id` | `INTEGER` | Yes | Request ID. |
| `users_id` | `ARRAY` | No | Users IDs. |
| `author_id` | `INTEGER` | Yes | Author ID. Must be the ID of the user that asks for collaboration. |
| `user_id` | `INTEGER` | No | User ID. |

**Response Fields:**

| Field | Type | Description |
|---|---|---|
| `status` | `STRING` | Returns 'OK' if the collaboration was correctly requested; or 'ERROR' if something went wrong. |

---

### `GET /incident.comment`

Gets the replies from a given request.

**Parameters:**

| Name | Type | Required | Description |
|---|---|---|---|
| `request_id` | `INTEGER` | Yes | Request ID. |
| `date_format` | `STRING` | No | Indicate the date format. The available formats are 'epoch' or 'iso8601'. If null, epoch format is returned. |
| `is_solution` | `BOOLEAN` | No | Indicate if the comments returned are the request's solution. 1: Is solution, 0: Is not solution. If this parameter is not provided then all comments will be returned. |
| `decoded_special_characters` | `BOOLEAN` | No | Indicate if the message is returned decoded. If null, coded format is returned. |

**Response Fields:**

| Field | Type | Description |
|---|---|---|
| `created_at` | `STRING` | Creation time in epoch or ISO-8601 format depending on the date_format parameter. |
| `is_solution` | `BOOLEAN` | Indicates if this comment is the solution of the request. 1: if is the solution, 0: if not. |
| `msg_num` | `INTEGER` | Number of the message in the request. |
| `attachments` | `ARRAY` | Attachment IDs. |
| `message` | `STRING` | Message of the comment. |
| `customer_visible` | `BOOLEAN` | Indicates if the comment is internal or not. 0: Internal, 1: Public. |
| `author_id` | `INTEGER` | Author ID. |
| `reference` | `INTEGER` | ID of the comment that is replying to. |
| `incident_id` | `INTEGER` | Request ID. |
| `id` | `INTEGER` | Comment ID. |

---

### `POST /incident.comment`

Adds a reply to a request.

**Parameters:**

| Name | Type | Required | Description |
|---|---|---|---|
| `is_solution` | `BOOLEAN` | No | Mark as solution. 1: Is solution, 0: Is not solution. |
| `attachments` | `ARRAY` | No | Attachments IDs. |
| `comment` | `TEXT` | Yes | Comment to be added. |
| `request_id` | `INTEGER` | Yes | Request ID. |
| `customer_visible` | `BOOLEAN` | No | Mark as internal. 0: Internal, 1: Public. |
| `author_id` | `INTEGER` | Yes | Author ID. |
| `is_propagation` | `BOOLEAN` | No | Mark as propagation comment. 1: Is propagation comment, 0: Is not propagation comment. |

**Response Fields:**

| Field | Type | Description |
|---|---|---|
| `error` | `STRING` | Description of the error. |
| `status` | `STRING` | Returns 'OK' if the comment was correctly added; or 'ERROR' if something went wrong. |

---

### `GET /incident.custom_approval`

Lists the custom approvals templates that the given request has.

**Parameters:**

| Name | Type | Required | Description |
|---|---|---|---|
| `request_id` | `INTEGER` | Yes | Request ID. |
| `date_format` | `STRING` | No | Indicate the date format. The available formats are 'epoch' or 'iso8601'. If null, epoch format is returned. |

**Response Fields:**

| Field | Type | Description |
|---|---|---|
| `expired_approved` | `INTEGER` | Indicates the action when the approval expires. 1: Approve, 2: Reject. |
| `description_required` | `BOOLEAN` | Indicates if the description is required or not. 0: Required, 1: Not required. |
| `title` | `STRING` | Approval title. |
| `expired_in` | `STRING` | Expiration time in seconds. |
| `created_at` | `STRING` | Creation time in epoch or ISO-8601 format depending on the date_format parameter. |
| `description` | `STRING` | Approval description. |
| `description_prompt` | `STRING` | Template description. |
| `status` | `INTEGER` | Approval status ID. 1: Active, -1: Deleted. |
| `wf_item_id` | `INTEGER` | ID of the phase of the associated workflow. |
| `wf_process_id` | `INTEGER` | ID of the associated workflow. |
| `pause_sla` | `BOOLEAN` | Indicates if the approval pauses the SLA. 1: Pause, 0: Do not pause. |
| `id` | `INTEGER` | Approval template ID. |

---

### `POST /incident.custom_approval`

Requests a custom approval in the given request.

**Parameters:**

| Name | Type | Required | Description |
|---|---|---|---|
| `request_id` | `INTEGER` | Yes | Request ID. |
| `description` | `TEXT` | No | Custom approval description. |
| `author_id` | `INTEGER` | Yes | Author ID of the approval request. |
| `approval_id` | `INTEGER` | Yes | Custom approval ID. |

**Response Fields:**

| Field | Type | Description |
|---|---|---|
| `status` | `STRING` | Returns 'OK' if the approval was correctly requested; or 'ERROR' if something went wrong. |

---

### `PATCH /incident.custom_field`

Add values for a multiple custom field from a request. This only works for the custom field with type CI. It can only be sent one CI name at a time in the values variable. It must be the complete name of the CI and all the CIs that have that exact name will be added to the multiple custom field.

*No parameters required.*

**Response Fields:**

| Field | Type | Description |
|---|---|---|
| `status` | `STRING` | Returns 'OK' if the values were correctly created; or 'ERROR' if something went wrong. |
| `info` | `STRING` | Deletes value in the associated custom field. |

---

### `DELETE /incident.custom_field`

Deletes value in the associated custom field.

**Parameters:**

| Name | Type | Required | Description |
|---|---|---|---|
| `request_id` | `INTEGER` | Yes | Request ID. |
| `author_id` | `INTEGER` | Yes | Author ID. |
| `custom_field_uid` | `INTEGER` | Yes | Custom field UID. |

**Response Fields:**

| Field | Type | Description |
|---|---|---|
| `status` | `STRING` | Returns 'OK' if the values were correctly created; or 'ERROR' if something went wrong. |
| `info` | `STRING` | Deletes value in the associated custom field. |

---

### `POST /incident.custom_field`

Creates values for a custom field from a request. Different types of data can be sent in the values variable. No value (empty string) means erase value. When sending files, the name of the file has to be in the values array (including its extension), and the file(s) itself should be sent in the body of the request.

**Parameters:**

| Name | Type | Required | Description |
|---|---|---|---|
| `request_id` | `INTEGER` | Yes | Request ID. |
| `author_id` | `INTEGER` | Yes | Author ID. |
| `custom_field_uid` | `INTEGER` | Yes | Custom field UID. |
| `values` | `ARRAY` | Yes | Array of values. If only one is required, only the first will be processed. If you are sending files, here you should list the names (with extension) of the files. |

**Response Fields:**

| Field | Type | Description |
|---|---|---|
| `status` | `STRING` | Returns 'OK' if the values were correctly created; or 'ERROR' if something went wrong. |
| `info` | `STRING` | Description of the result. |

---

### `GET /incident.external_entity`

Lists all the external entities linked to a request.

**Parameters:**

| Name | Type | Required | Description |
|---|---|---|---|
| `request_id` | `INTEGER` | Yes | Request ID. |

**Response Fields:**

| Field | Type | Description |
|---|---|---|
| `type` | `STRING` | Entity type. Always 100. |
| `status` | `BOOLEAN` | Entity status. 1: Enabled, 0: Deleted. |
| `name` | `STRING` | External entity name. |
| `ext_ref_id` | `INTEGER` | External entity reference ID. |
| `link_id` | `INTEGER` | Relation ID. |
| `ref_id` | `INTEGER` | External entity ID. |

---

### `POST /incident.external_entity`

Links a request to an external entity.

**Parameters:**

| Name | Type | Required | Description |
|---|---|---|---|
| `request_id` | `INTEGER` | Yes | Request ID. |
| `external_entity_ref_id` | `STRING` | No | External entity reference ID. |
| `external_entity_id` | `INTEGER` | Yes | External entity ID. |

**Response Fields:**

| Field | Type | Description |
|---|---|---|
| `link_id` | `STRING` | ID of the created relation. |
| `status` | `STRING` | Returns 'OK' if the external entity was correctly linked; or 'ERROR' if something went wrong. |
| `info` | `STRING` | Description of the result. |

---

### `GET /incident.link`

Lists all the linked requests from a given request.

**Parameters:**

| Name | Type | Required | Description |
|---|---|---|---|
| `request_id` | `INTEGER` | Yes | Request ID. |

**Response Fields:**

| Field | Type | Description |
|---|---|---|
| `title` | `STRING` | Related request title. |
| `id` | `INTEGER` | Related request ID. |

---

### `POST /incident.link`

Links a request to another request.

**Parameters:**

| Name | Type | Required | Description |
|---|---|---|---|
| `request_id` | `INTEGER` | Yes | Request ID. |
| `request_ids` | `ARRAY` | Yes | Request IDs to link. |

**Response Fields:**

| Field | Type | Description |
|---|---|---|
| `error` | `STRING` | Description of the error. |
| `status` | `STRING` | Returns 'OK' if the request was correctly linked; or 'ERROR' if something went wrong. |
| `info` | `STRING` | Description of the result. |

---

### `GET /incident.linked_cis.counters.from`

Returns counters with the number of incidents of each status.

**Parameters:**

| Name | Type | Required | Description |
|---|---|---|---|
| `from` | `INTEGER` | Yes | Date timestamp from which the counters are picked. |
| `cis_source_id` | `INTEGER` | Yes | ID of the ITAM tool integration in Service Management. |

**Response Fields:**

| Field | Type | Description |
|---|---|---|
| `group` | `STRING` | Name of the group for this CI. |
| `requests` | `ARRAY` | An object that contains two arrays: one counting linked CIs by request status and the other counting linked CIs by request type (only for open requests). |
| `ci_id` | `INTEGER` | ID of the CI. |

---

### `GET /incident.observer`

Lists all the IDs of the request's observers.

**Parameters:**

| Name | Type | Required | Description |
|---|---|---|---|
| `request_id` | `INTEGER` | Yes | Request ID. |

**Response Fields:**

| Field | Type | Description |
|---|---|---|
| `user_id` | `INTEGER` | User ID. |

---

### `POST /incident.observer`

Adds a user as observer.

**Parameters:**

| Name | Type | Required | Description |
|---|---|---|---|
| `request_id` | `INTEGER` | Yes | Request ID. |
| `users_id` | `ARRAY` | No | Users IDs. |
| `author_id` | `INTEGER` | Yes | Author ID. |
| `user_id` | `INTEGER` | No | User ID. |

**Response Fields:**

| Field | Type | Description |
|---|---|---|
| `status` | `STRING` | Returns 'OK' if the observer was correctly added; or 'ERROR' if something went wrong. |

---

### `POST /incident.promote.to.major.incident`

Promotes the given request to a major incident and returns the ID of the created major incident.

**Parameters:**

| Name | Type | Required | Description |
|---|---|---|---|
| `request_id` | `INTEGER` | Yes | Request ID. |
| `confirm` | `BOOLEAN` | No | confirm changes if needed. |
| `author_id` | `INTEGER` | Yes | User ID. |

**Response Fields:**

| Field | Type | Description |
|---|---|---|
| `messages` | `ARRAY` | In case of error, contains the error message. |
| `success` | `BOOLEAN` | Promotion Result. |

---

### `POST /incident.reassign`

Reassigns a request to a help desk and/or agent.

**Parameters:**

| Name | Type | Required | Description |
|---|---|---|---|
| `request_id` | `INTEGER` | Yes | Request ID. |
| `author_id` | `INTEGER` | Yes | Author ID. |
| `group_id` | `INTEGER` | Yes | Help desk ID. |
| `agent_id` | `INTEGER` | No | Agent ID. |

**Response Fields:**

| Field | Type | Description |
|---|---|---|
| `status` | `STRING` | Returns 'OK' if the help desk or group was correctly reassigned; or 'ERROR' if something went wrong. |

---

### `POST /incident.reject`

Rejects a request.

**Parameters:**

| Name | Type | Required | Description |
|---|---|---|---|
| `request_id` | `INTEGER` | Yes | ID of the request to reject. |
| `author_id` | `INTEGER` | Yes | ID of the user rejecting the request. |

**Response Fields:**

| Field | Type | Description |
|---|---|---|
| `status` | `STRING` | Returns 'OK' if the request was correctly rejected; or 'ERROR' if something went wrong. |

---

### `POST /incident.relate.ci.by.keyword`

Relates a request to every CI that matches a certain keyword.

**Parameters:**

| Name | Type | Required | Description |
|---|---|---|---|
| `request_id` | `INTEGER` | Yes | Request ID. |
| `keyword` | `STRING` | Yes | Keyword to search CIs. |
| `exact_match` | `BOOLEAN` | No | Indicates if the results must be an exact match or not. |

**Response Fields:**

| Field | Type | Description |
|---|---|---|
| `status` | `STRING` | Returns 'OK' if the CIs were correctly related; or 'ERROR' if something went wrong. |
| `info` | `STRING` | Description of the result. |

---

### `PUT /incident.reopen`

Reopens a request.

**Parameters:**

| Name | Type | Required | Description |
|---|---|---|---|
| `request_id` | `INTEGER` | Yes | Request ID. |
| `author_id` | `INTEGER` | No | User ID who reopened the ticket. |

**Response Fields:**

| Field | Type | Description |
|---|---|---|
| `error` | `STRING` | Error code |
| `status` | `STRING` | Returns 'OK' if the request  was correctly reopened; or 'ERROR' if something went wrong. |
| `info` | `STRING` | Description of the result |

---

### `PUT /incident.solution.accept`

Accepts the solution of a request.

**Parameters:**

| Name | Type | Required | Description |
|---|---|---|---|
| `rating` | `INTEGER` | Yes | Request rating. Rate the solution on a scale of 1-5, 1 being the lowest and 5 being the highest. |
| `comment` | `STRING` | No | Solution comment. This parameter is required if the rating is less than 4. |
| `id` | `INTEGER` | Yes | Request ID. |

**Response Fields:**

| Field | Type | Description |
|---|---|---|
| `status` | `STRING` | Returns 'OK' if the solution was correctly accepted; or 'ERROR' if something went wrong. |

---

### `PUT /incident.solution.reject`

Rejects the solution of a request.

**Parameters:**

| Name | Type | Required | Description |
|---|---|---|---|
| `comment` | `STRING` | Yes | Rejection reason. |
| `id` | `INTEGER` | Yes | Request ID. |

**Response Fields:**

| Field | Type | Description |
|---|---|---|
| `status` | `STRING` | Returns 'OK' if the solution was correctly rejected; or 'ERROR' if something went wrong. |

---

### `POST /incident.spontaneous_approval`

Creates a spontaneous approval.

**Parameters:**

| Name | Type | Required | Description |
|---|---|---|---|
| `request_id` | `INTEGER` | Yes | Request ID. |
| `description` | `TEXT` | Yes | Approval description. |
| `author_id` | `INTEGER` | Yes | Author ID. |
| `approval_user_id` | `INTEGER` | Yes | User ID from the approval voter. |

**Response Fields:**

| Field | Type | Description |
|---|---|---|
| `status` | `STRING` | Returns 'OK' if the approval was correctly created; or 'ERROR' if something went wrong. |

---

### `GET /incident.tasks`

Retrieves the list of tasks linked to a specified request.

**Parameters:**

| Name | Type | Required | Description |
|---|---|---|---|
| `request_id` | `INTEGER` | Yes | Request ID. |

**Response Fields:**

| Field | Type | Description |
|---|---|---|
| `name` | `STRING` | Task name. |
| `description` | `STRING` | Task description. |
| `wf_stage_id` | `STRING` | ID of the workflow stage if the task is related to one. |
| `completed_at` | `INTEGER` | Task completion date (timestamp). |
| `is_required` | `BOOLEAN` | Whether the task is required or not. |
| `created_at` | `INTEGER` | Task creation date (timestamp). |
| `task_id` | `INTEGER` | Task ID. |
| `helpdesk_id` | `INTEGER` | Assigned helpdesk ID. |
| `status` | `INTEGER` | Task status: 0 = OPEN, 1 = FINISHED, 2 = DELETED, 3 = SKIPPED. |
| `linked_request_id` | `INTEGER` | ID of the linked request (if any). |
| `is_predefined` | `BOOLEAN` | Indicates if it comes predefined from a workflow. |
| `assignment_type` | `INTEGER` | Assignment type: 1 = USER, 2 = HELPDESK. |
| `expiration_date` | `INTEGER` | Due date of the task (timestamp). |
| `agent_id` | `INTEGER` | Assigned agent ID. |

---

### `POST /incident.waitingfor.agent`

Sets the agent waiting status to the request.

**Parameters:**

| Name | Type | Required | Description |
|---|---|---|---|
| `request_id` | `INTEGER` | Yes | Request ID. |

**Response Fields:**

| Field | Type | Description |
|---|---|---|
| `status` | `STRING` | Returns 'OK' if the waiting status was correctly set; or 'ERROR' if something went wrong. |
| `info` | `STRING` | Description of the result. |

---

### `POST /incident.waitingfor.customer`

Sets the waiting for customer status to the request.

**Parameters:**

| Name | Type | Required | Description |
|---|---|---|---|
| `request_id` | `INTEGER` | Yes | Request ID. |

**Response Fields:**

| Field | Type | Description |
|---|---|---|
| `status` | `STRING` | Returns 'OK' if the waiting status was correctly set; or 'ERROR' if something went wrong. |
| `info` | `STRING` | Description of the result. |

---

### `POST /incident.waitingfor.date`

Sets the waiting for date status to the request.

**Parameters:**

| Name | Type | Required | Description |
|---|---|---|---|
| `request_id` | `INTEGER` | Yes | Request ID. |
| `timestamp` | `STRING` | Yes | Date timestamp to set. |

**Response Fields:**

| Field | Type | Description |
|---|---|---|
| `status` | `STRING` | Returns 'OK' if the waiting status was correctly set; or 'ERROR' if something went wrong. |
| `info` | `STRING` | Description of the result. |

---

### `POST /incident.waitingfor.external_entity`

Sets the request in the waiting for external entity status. The entity should be already linked.

**Parameters:**

| Name | Type | Required | Description |
|---|---|---|---|
| `request_id` | `INTEGER` | Yes | Request ID. |
| `entity_link_id` | `INTEGER` | Yes | External entity ID to link to the request status. |

**Response Fields:**

| Field | Type | Description |
|---|---|---|
| `status` | `STRING` | Returns 'OK' if the waiting status was correctly set; or 'ERROR' if something went wrong. |
| `info` | `STRING` | Description of the result. |

---

### `POST /incident.waitingfor.incident`

Sets the request in the waiting for another request status.

**Parameters:**

| Name | Type | Required | Description |
|---|---|---|---|
| `request_id` | `INTEGER` | Yes | Request ID. |
| `wait_request_id` | `INTEGER` | Yes | Request ID that will be waiting for. |

**Response Fields:**

| Field | Type | Description |
|---|---|---|
| `status` | `STRING` | Returns 'OK' if the waiting status was correctly set; or 'ERROR' if something went wrong. |
| `info` | `STRING` | Description of the result. |

---

### `GET /incidents`

Lists the requests.

**Parameters:**

| Name | Type | Required | Description |
|---|---|---|---|
| `date_format` | `STRING` | No | Indicate the date format. The available formats are 'epoch' or 'iso8601'. If null, epoch format is returned. |
| `comments` | `BOOLEAN` | No | When set to true, it includes the comments of the request. |
| `ids` | `ARRAY` | Yes | Request IDs. |

**Response Fields:**

| Field | Type | Description |
|---|---|---|
| `creator_id` | `INTEGER` | Creator ID. |
| `user_id` | `INTEGER` | Customer ID. |
| `sla_incident_resolution` | `STRING` | Resolution SLA of the request. |
| `assigned_id` | `INTEGER` | Assigned agent ID. |
| `request_customer_sentiment_initial` | `STRING` | Initial customer sentiment for the request. "positive", "neutral", "negative" |
| `solved_at` | `STRING` | Solution date in epoch or ISO-8601 format depending on the date_format parameter. |
| `closed_at` | `STRING` | Closing date in epoch or ISO-8601 format depending on the date_format parameter. |
| `id` | `INTEGER` | Request ID. |
| `status_id` | `INTEGER` | Status ID. |
| `comments` | `ARRAY` | Array with comments of the requests with the comment structure. |
| `priority_id` | `INTEGER` | Priority ID. |
| `last_update` | `STRING` | Last update in epoch or ISO-8601 format depending on the date_format parameter. |
| `custom_fields` | `ARRAY` | Array with the custom fields IDs as keys and the respective values. |
| `date_ocurred` | `STRING` | Occurrence date in epoch or ISO-8601 format depending on the date_format parameter. |
| `process_id` | `INTEGER` | Process ID of the request if it is a workflow instance. |
| `type_id` | `INTEGER` | Type ID. |
| `pretty_id` | `STRING` | Request pretty ID as configured on the Service Management instance. |
| `description` | `STRING` | Request description. |
| `title` | `STRING` | Request title. |
| `closed_reason` | `INTEGER` | Reason of closing. 1: Solution accepted, 2: Solution expired, 3: Customer timeout, 4: Finalized workflow. |
| `created_at` | `STRING` | Creation date in epoch or ISO-8601 format depending on the date_format parameter. |
| `attachments` | `ARRAY` | Array with the IDs of the attachments. |
| `source_id` | `INTEGER` | Source ID. |
| `rating` | `INTEGER` | Stars given to the solution. If there's no rating, this field won't be shown. |
| `request_customer_sentiment_current` | `STRING` | Current customer sentiment for the request. "positive", "neutral", "negative" |
| `assigned_group_id` | `INTEGER` | Help desk ID. |
| `sla_incident_first_reply` | `STRING` | First response SLA of the request. |
| `category_id` | `INTEGER` | Category ID. |

---

### `GET /incidents.by.agent`

Lists the requests from a given agent.

**Parameters:**

| Name | Type | Required | Description |
|---|---|---|---|
| `limit` | `INTEGER` | No | Number of items per page. |
| `page_key` | `STRING` | No | Hash key of the results page to retrieve. If null, the first page of results will be returned. |
| `comments` | `BOOLEAN` | No | When set to true, it includes the comments of the request. |
| `id` | `INTEGER` | No | Agent ID. |
| `username` | `STRING` | No | Agent username. |
| `email` | `STRING` | No | Agent email. |

**Response Fields:**

| Field | Type | Description |
|---|---|---|
| `creator_id` | `INTEGER` | Creator ID. |
| `user_id` | `INTEGER` | Customer ID. |
| `sla_incident_resolution` | `STRING` | Resolution SLA of the request. |
| `assigned_id` | `INTEGER` | Assigned agent ID. |
| `request_customer_sentiment_initial` | `STRING` | Initial customer sentiment for the request. "positive", "neutral", "negative" |
| `solved_at` | `STRING` | Solution date in epoch. |
| `closed_at` | `STRING` | Closing date in epoch. |
| `id` | `INTEGER` | Request ID. |
| `status_id` | `INTEGER` | Status ID. |
| `comments` | `ARRAY` | Array with comments of the requests with the comment structure. |
| `priority_id` | `INTEGER` | Priority ID. |
| `last_update` | `STRING` | Last update in epoch. |
| `custom_fields` | `ARRAY` | Array with the custom fields IDs as keys and the respective values. |
| `date_ocurred` | `STRING` | Occurrence date in epoch. |
| `process_id` | `INTEGER` | Process ID of the request if it is a workflow instance. |
| `type_id` | `INTEGER` | Type ID. |
| `pretty_id` | `STRING` | Request pretty ID as configured on the Service Management instance. |
| `next_page_key` | `STRING` | Hash key of the next page of results. If null, the results page retrieved is the last one. |
| `description` | `STRING` | Request description. |
| `title` | `STRING` | Request title. |
| `closed_reason` | `INTEGER` | Reason of closing. 1: Solution accepted, 2: Solution expired, 3: Customer timeout, 4: Finalized workflow. |
| `created_at` | `STRING` | Creation date in epoch. |
| `attachments` | `ARRAY` | Array with the IDs of the attachments. |
| `source_id` | `INTEGER` | Source ID. |
| `request_customer_sentiment_current` | `STRING` | Current customer sentiment for the request. "positive", "neutral", "negative" |
| `assigned_group_id` | `INTEGER` | Help desk ID. |
| `sla_incident_first_reply` | `STRING` | First response SLA of the request. |
| `category_id` | `INTEGER` | Category ID. |

---

### `GET /incidents.by.cis`

Returns all the requests linked to a CI, considering its IDs, its groups and the ID of the integration it belongs to.

**Parameters:**

| Name | Type | Required | Description |
|---|---|---|---|
| `group` | `STRING` | Yes | Name of the group the CIs belong to. Possible values are "asset", "business_application", "cloud_asset", "database". Legacy PascalCase variants (e.g. "Asset", "BusinessApplication") are also accepted. |
| `cis_source_id` | `INTEGER` | Yes | ID of the ITAM tool integration in Service Management. |
| `ci_ids` | `ARRAY` | Yes | IDs of the CIs. |

**Response Fields:**

| Field | Type | Description |
|---|---|---|
| `group` | `STRING` | Name of the group for this CI. |
| `requests` | `ARRAY` | An object that contains two arrays, one listing linked CIs by request status and the other counting linked CIs by request type, only for open requests. |
| `ci_id` | `STRING` | ID of the CI. |

---

### `GET /incidents.by.customer`

Lists the open requests from a customer.

**Parameters:**

| Name | Type | Required | Description |
|---|---|---|---|
| `limit` | `INTEGER` | No | Number of items per page. |
| `page_key` | `STRING` | No | Hash key of the results page to retrieve. If null, the first page of results will be returned. |
| `comments` | `BOOLEAN` | No | When set to true, it includes the comments of the request. |
| `id` | `INTEGER` | No | Customer ID. |
| `username` | `STRING` | No | Customer username. |
| `email` | `STRING` | No | Customer email. |

**Response Fields:**

| Field | Type | Description |
|---|---|---|
| `creator_id` | `INTEGER` | Creator ID. |
| `user_id` | `INTEGER` | Customer ID. |
| `sla_incident_resolution` | `STRING` | Resolution SLA of the request. |
| `assigned_id` | `INTEGER` | Assigned agent ID. |
| `request_customer_sentiment_initial` | `STRING` | Initial customer sentiment for the request. "positive", "neutral", "negative" |
| `solved_at` | `STRING` | Solution date in epoch. |
| `closed_at` | `STRING` | Closing date in epoch. |
| `id` | `INTEGER` | Request ID. |
| `status_id` | `INTEGER` | Status ID. |
| `comments` | `ARRAY` | Array with comments of the requests with the comment structure. |
| `priority_id` | `INTEGER` | Priority ID. |
| `last_update` | `STRING` | Last update in epoch. |
| `custom_fields` | `ARRAY` | Array with the custom fields IDs as keys and the respective values. |
| `date_ocurred` | `STRING` | Occurrence date in epoch. |
| `process_id` | `INTEGER` | Process ID of the request if it is a workflow instance. |
| `type_id` | `INTEGER` | Type ID. |
| `pretty_id` | `STRING` | Request pretty ID as configured on the Service Management instance. |
| `next_page_key` | `STRING` | Hash key of the next page of results. If null, the results page retrieved is the last one. |
| `description` | `STRING` | Request description. |
| `title` | `STRING` | Request title. |
| `closed_reason` | `INTEGER` | Reason of closing. 1: Solution accepted, 2: Solution expired, 3: Customer timeout, 4: Finalized workflow. |
| `created_at` | `STRING` | Creation date in epoch. |
| `attachments` | `ARRAY` | Array with the IDs of the attachments. |
| `source_id` | `INTEGER` | Source ID. |
| `request_customer_sentiment_current` | `STRING` | Current customer sentiment for the request. "positive", "neutral", "negative" |
| `assigned_group_id` | `INTEGER` | Help desk ID. |
| `sla_incident_first_reply` | `STRING` | First response SLA of the request. |
| `category_id` | `INTEGER` | Category ID. |

---

### `GET /incidents.by.helpdesk`

Lists the open requests from a help desk.

**Parameters:**

| Name | Type | Required | Description |
|---|---|---|---|
| `helpdesk_id` | `INTEGER` | No | Help desk ID. |
| `helpdesk_ids` | `ARRAY` | No | Help desks IDs. |

**Response Fields:**

| Field | Type | Description |
|---|---|---|
| `status` | `STRING` | Returns 'OK' if the query was correctly executed; or 'ERROR' if something went wrong. |
| `info` | `STRING` | Description of the result. |
| `requestIds` | `ARRAY` | Request IDs. |

---

### `GET /incidents.by.sentiment`

Lists the open requests from a sentiment.

**Parameters:**

| Name | Type | Required | Description |
|---|---|---|---|
| `sentiment_ids` | `ARRAY` | No | Sentiments IDs. |
| `limit` | `INTEGER` | No | Number of items per page. |
| `offset` | `INTEGER` | No | Skip this number of items in the response. |
| `sentiment_id` | `STRING` | No | Sentiment ID. [negative\|positive\|neutral] |

**Response Fields:**

| Field | Type | Description |
|---|---|---|
| `limit` | `INTEGER` | Number of items per page. |
| `status` | `STRING` | Returns 'OK' if the query was correctly executed; or 'ERROR' if something went wrong. |
| `info` | `STRING` | Description of the result. |
| `offset` | `INTEGER` | Items skipped in the response. |
| `requestIds` | `ARRAY` | Request IDs. |

---

### `GET /incidents.by.status`

Lists all open requests matching the status specified by parameter.

**Parameters:**

| Name | Type | Required | Description |
|---|---|---|---|
| `limit` | `INTEGER` | No | Number of items per page. |
| `status_ids` | `ARRAY` | No | Status IDs. |
| `offset` | `INTEGER` | No | Skip this number of items in the response. |
| `status_id` | `INTEGER` | No | Status ID. |

**Response Fields:**

| Field | Type | Description |
|---|---|---|
| `limit` | `INTEGER` | Number of items per page. |
| `status` | `STRING` | Returns 'OK' if the query was correctly executed; or 'ERROR' if something went wrong. |
| `requestIds` | `ARRAY` | Request IDs. |
| `total` | `INTEGER` | Total items. |
| `info` | `STRING` | Description of the result. |
| `offset` | `INTEGER` | Items skipped in the response. |

---

### `GET /incidents.by.view`

Lists the requests from a view ID.

**Parameters:**

| Name | Type | Required | Description |
|---|---|---|---|
| `limit` | `INTEGER` | No | Number of items per page. |
| `offset` | `INTEGER` | No | Skip this amount of requests in the response. |
| `view_id` | `INTEGER` | Yes | View ID. |

**Response Fields:**

| Field | Type | Description |
|---|---|---|
| `limit` | `INTEGER` | Number of items per page. |
| `status` | `STRING` | Returns 'OK' if the query was correctly executed; or 'ERROR' if something went wrong. |
| `info` | `STRING` | Description of the result. |
| `offset` | `INTEGER` | This amount of request were skipped in the response. |
| `requestIds` | `ARRAY` | Request IDs returned by the view. |

---

### `GET /incidents.details.by.view`

Lists the requests with their details from a view ID.

**Parameters:**

| Name | Type | Required | Description |
|---|---|---|---|
| `order_by` | `STRING` | No | The order in which the results should be sorted. "asc" if the results should be sorted in ascending order, or "desc" if they should be sorted in descending order. If null, requests will be returned sorted in ascending order. |
| `page_key` | `STRING` | No | Hash key of the results page to retrieve. If null, the first page of results will be returned. |
| `sort_by` | `STRING` | No | Attribute upon which the sorting of the results will be performed. "id" if results should be sorted by the request ID, or "last_update" if they should be sorted by the request's last update date. If null, requests will be returned sorted by ID. |
| `view_id` | `INTEGER` | Yes | View ID. |

**Response Fields:**

| Field | Type | Description |
|---|---|---|
| `metadata` | `ARRAY` | Provides resource objects that are related to the primary data, including the labels of the columns from the view. |
| `data` | `ARRAY` | Contains a JSON array (with pagination, 1000 requests per page) representing the primary data of the requests in the request view. |
| `next_page_key` | `STRING` | Hash key of the next page of results. If null, the results page retrieved is the last one. |

---

### `GET /incidents.last.hour`

Lists all the requests that were created within the last hour.

**Parameters:**

| Name | Type | Required | Description |
|---|---|---|---|
| `limit` | `INTEGER` | No | Number of items per page. |
| `page_key` | `STRING` | No | Hash key of the results page to retrieve. If null, the first page of results will be returned. |

**Response Fields:**

| Field | Type | Description |
|---|---|---|
| `creator_id` | `INTEGER` | Creator ID. |
| `user_id` | `INTEGER` | Customer ID. |
| `sla_incident_resolution` | `STRING` | Resolution SLA of the request. |
| `assigned_id` | `INTEGER` | Assigned agent ID. |
| `request_customer_sentiment_initial` | `STRING` | Initial customer sentiment for the request. "positive", "neutral", "negative" |
| `solved_at` | `STRING` | Solution date in epoch. |
| `closed_at` | `STRING` | Closing date in epoch. |
| `id` | `INTEGER` | Request ID. |
| `status_id` | `INTEGER` | Status ID. |
| `comments` | `ARRAY` | Array with comments of the requests with the comment structure. |
| `priority_id` | `INTEGER` | Priority ID. |
| `last_update` | `STRING` | Last update in epoch. |
| `custom_fields` | `ARRAY` | Array with the custom fields IDs as keys and the respective values. |
| `date_ocurred` | `STRING` | Occurrence date in epoch. |
| `process_id` | `INTEGER` | Process ID of the request if it is a workflow instance. |
| `type_id` | `INTEGER` | Type ID. |
| `pretty_id` | `STRING` | Request pretty ID as configured on the Service Management instance. |
| `next_page_key` | `STRING` | Hash key of the next page of results. If null, the results page retrieved is the last one. |
| `description` | `STRING` | Request description. |
| `title` | `STRING` | Request title. |
| `closed_reason` | `INTEGER` | Reason of closing. 1: Solution accepted, 2: Solution expired, 3: Customer timeout, 4: Finalized workflow. |
| `created_at` | `STRING` | Creation date in epoch. |
| `attachments` | `ARRAY` | Array with the IDs of the attachments. |
| `source_id` | `INTEGER` | Source ID. |
| `rating` | `INTEGER` | Stars given to the solution. If there's no rating, this field won't be shown. |
| `request_customer_sentiment_current` | `STRING` | Current customer sentiment for the request. "positive", "neutral", "negative" |
| `assigned_group_id` | `INTEGER` | Help desk ID. |
| `sla_incident_first_reply` | `STRING` | First response SLA of the request. |
| `category_id` | `INTEGER` | Category ID. |

---

### `GET /internalnotes`

Lists all the internal notes, or one in particular.

**Parameters:**

| Name | Type | Required | Description |
|---|---|---|---|
| `date_format` | `STRING` | No | Indicate the date format. The available formats are 'epoch' or 'iso8601'. If null, epoch format is returned. |
| `object_type` | `INTEGER` | No | Entity type ID. 1: User, 2: Helpdesk, 3: Company, 4: Users Group, 5: External Entity. |
| `object_id` | `INTEGER` | No | Entity ID. |
| `id` | `INTEGER` | Yes | Note ID. |

**Response Fields:**

| Field | Type | Description |
|---|---|---|
| `created_at` | `STRING` | Creation date of the note in epoch or ISO-8601 format depending on the date_format parameter. |
| `object_id` | `INTEGER` | Entity ID. |
| `last_author` | `INTEGER` | Last author ID. |
| `title` | `STRING` | Note title. |
| `description` | `STRING` | Note description. |
| `object_type` | `INTEGER` | Entity type ID. 1: User, 2: Helpdesk, 3: Company, 4: Users Group, 5: External Entity. |
| `author_id` | `INTEGER` | Author ID. |
| `last_update` | `STRING` | Last update of the note in epoch or ISO-8601 format depending on the date_format . |
| `id` | `INTEGER` | Note ID. |

---

### `PUT /internalnotes`

Updates the info of an internal note.

**Parameters:**

| Name | Type | Required | Description |
|---|---|---|---|
| `description` | `STRING` | No | Note description. |
| `title` | `STRING` | No | Note title. |
| `author_id` | `INTEGER` | Yes | Author ID. |
| `id` | `INTEGER` | Yes | Note ID. |

**Response Fields:**

| Field | Type | Description |
|---|---|---|
| `Status` | `STRING` | Returns 'OK' if the internal note was correctly updated; or 'ERROR' if something went wrong. |

---

### `POST /internalnotes`

Creates an internal note.

**Parameters:**

| Name | Type | Required | Description |
|---|---|---|---|
| `description` | `STRING` | Yes | Note description. |
| `object_type` | `INTEGER` | Yes | Entity type ID. 1: User, 2: Helpdesk, 3: Company, 4: Users Group, 5: External Entity. |
| `author_id` | `INTEGER` | Yes | Author ID. |
| `object_id` | `INTEGER` | Yes | Entity ID. |
| `title` | `STRING` | Yes | Note title. |

**Response Fields:**

| Field | Type | Description |
|---|---|---|
| `Status` | `STRING` | Returns 'OK' if the internal note was correctly created; or 'ERROR' if something went wrong. |

---

### `DELETE /internalnotes`

Deletes an internal note.

**Parameters:**

| Name | Type | Required | Description |
|---|---|---|---|
| `author_id` | `INTEGER` | Yes | Author ID. |
| `id` | `INTEGER` | Yes | Note ID. |

**Response Fields:**

| Field | Type | Description |
|---|---|---|
| `Status` | `STRING` | Returns 'OK' if the internal note was correctly deleted; or 'ERROR' if something went wrong. |

---

