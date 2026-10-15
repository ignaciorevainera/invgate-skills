# InvGate API Reference - Knowledge Base & System

### `GET /breakingnews`

Returns the requested Breaking News.

**Parameters:**

| Name | Type | Required | Description |
|---|---|---|---|
| `date_format` | `STRING` | No | Indicate the date format. The available formats are 'epoch' or  'iso8601'. If null, epoch format is returned. |
| `id` | `INTEGER` | Yes | Breaking News ID. |

**Response Fields:**

| Field | Type | Description |
|---|---|---|
| `type_id` | `INTEGER` | Breaking News type ID. |
| `created_at` | `STRING` | Creation date in epoch or ISO-8601 format depending on the date_format parameter. |
| `resolution_time` | `STRING` | Resolution time in epoch or ISO-8601 format depending on the date_format parameter. |
| `created_by_id` | `INTEGER` | Breaking News creator ID. |
| `affected_helpdesk_ids` | `ARRAY` | Array with IDs of affected help desks. |
| `status_id` | `INTEGER` | Breaking News status ID. |
| `title` | `STRING` | Breaking News title. |
| `affected_group_ids` | `ARRAY` | Array with IDs of affected groups. |
| `body` | `TEXT` | Breaking News body. |
| `id` | `INTEGER` | Breaking News ID. |

---

### `PUT /breakingnews`

Modifies a set of Breaking News.

**Parameters:**

| Name | Type | Required | Description |
|---|---|---|---|
| `type_id` | `INTEGER` | No | Type ID of the breaking news based on importance. 1: High, 2: Medium, 3: Low. |
| `creator_id` | `INTEGER` | No | ID of the Breaking News' creator. If none is provided then it will be the system. |
| `body` | `TEXT` | No | Breaking News body. |
| `affected_helpdesk_ids` | `ARRAY` | No | Help desks that are affected. It is required unless there is at least one group affected. |
| `status_id` | `INTEGER` | No | Breaking News status ID. 1: Open, 2: Closed. |
| `title` | `STRING` | No | Breaking News title. |
| `affected_group_ids` | `ARRAY` | No | Groups that are affected. It is required unless there is at least one help desk affected. |
| `resolution_time` | `INTEGER` | No | Estimated resolution time. Must be a timestamp (epoch format). |
| `id` | `INTEGER` | Yes | Breaking News ID. |

**Response Fields:**

| Field | Type | Description |
|---|---|---|
| `status` | `STRING` | Returns 'OK' if the Breaking News was correctly modified; or 'ERROR' if something went wrong. |
| `info` | `STRING` | Description of the result. |

---

### `POST /breakingnews`

Creates Breaking News.

**Parameters:**

| Name | Type | Required | Description |
|---|---|---|---|
| `type_id` | `INTEGER` | Yes | Type ID of the breaking news based on importance. 1: High, 2: Medium, 3: Low. |
| `creator_id` | `INTEGER` | No | ID of the Breaking News' creator. If none is provided then it will be the system. |
| `body` | `TEXT` | Yes | Breaking News body. |
| `affected_helpdesk_ids` | `ARRAY` | No | Help desks that are affected. It is required unless there is at least one group affected. |
| `major_incident_id` | `INTEGER` | No | ID of the major incident associated with the Breaking News. |
| `title` | `STRING` | Yes | Breaking News title. |
| `affected_group_ids` | `ARRAY` | No | Groups that are affected. It is required unless there is at least one help desk affected. |
| `resolution_time` | `INTEGER` | No | Estimated resolution time. Must be a timestamp (epoch format). |

**Response Fields:**

| Field | Type | Description |
|---|---|---|
| `status` | `STRING` | Returns 'OK' if the Breaking News was correctly created; or 'ERROR' if something went wrong. |
| `info` | `STRING` | Description of the result. |
| `id` | `INTEGER` | ID of the Breaking News created. |

---

### `GET /breakingnews.all`

Lists all the Breaking News.

**Parameters:**

| Name | Type | Required | Description |
|---|---|---|---|
| `date_format` | `STRING` | No | Indicate the date format. The available formats are 'epoch' or  'iso8601'. If null, epoch format is returned. |

**Response Fields:**

| Field | Type | Description |
|---|---|---|
| `type_id` | `INTEGER` | Breaking News type ID. |
| `created_at` | `STRING` | Creation date in epoch or ISO-8601 format depending on the date_format parameter. |
| `resolution_time` | `STRING` | Resolution time in epoch or ISO-8601 format depending on the date_format parameter. |
| `created_by_id` | `INTEGER` | Breaking News creator ID. |
| `affected_helpdesk_ids` | `ARRAY` | Array with IDs of affected help desks. |
| `status_id` | `INTEGER` | Breaking News status ID. |
| `title` | `STRING` | Breaking News title. |
| `affected_group_ids` | `ARRAY` | Array with IDs of affected groups. |
| `body` | `TEXT` | Breaking News body. |
| `id` | `INTEGER` | Breaking News ID. |

---

### `GET /breakingnews.attributes.status`

Lists all the possible status for the Breaking News' and their descriptions. If an ID is provided, only one will be listed.

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

### `GET /breakingnews.attributes.type`

Lists all the importance types of the Breaking News. If an ID its provided, only one will be listed.

**Parameters:**

| Name | Type | Required | Description |
|---|---|---|---|
| `id` | `INTEGER` | No | Importance type ID. |

**Response Fields:**

| Field | Type | Description |
|---|---|---|
| `name` | `STRING` | Importance type name. |
| `id` | `INTEGER` | Importance type ID. |

---

### `GET /breakingnews.status`

Returns the updates of the requested Breaking News.

**Parameters:**

| Name | Type | Required | Description |
|---|---|---|---|
| `date_format` | `STRING` | No | Indicate the date format. The available formats are 'epoch' or 'iso8601'. If null, epoch format is returned. |
| `id` | `INTEGER` | Yes | Breaking News ID. |

**Response Fields:**

| Field | Type | Description |
|---|---|---|
| `created_at` | `STRING` | Creation date in epoch or ISO-8601 format depending on the date_format parameter. |
| `creator_id` | `INTEGER` | Breaking News creator ID. |
| `body` | `TEXT` | Body of the update. |

---

### `POST /breakingnews.status`

Creates a new update to the given Breaking News.

**Parameters:**

| Name | Type | Required | Description |
|---|---|---|---|
| `is_solution` | `BOOLEAN` | No | Send 1 to close Breaking News. Send 0 to keep open. Default: 0. |
| `creator_id` | `INTEGER` | No | ID of the Breaking News' creator. If none is provided then it will be the system. |
| `body` | `TEXT` | Yes | Breaking News body. |
| `id` | `INTEGER` | Yes | Breaking News ID. |

**Response Fields:**

| Field | Type | Description |
|---|---|---|
| `status` | `STRING` | Returns 'OK' if the Breaking News update was correctly created; or 'ERROR' if something went wrong. |
| `info` | `STRING` | Description of the result. |

---

### `GET /cis.by.id`

Returns an array of CIs, linked through custom fields and shared custom fields, with their IDs and properties.

**Parameters:**

| Name | Type | Required | Description |
|---|---|---|---|
| `ci_internal_ids` | `ARRAY` | Yes | Configuration items IDs from Service Management. |
| `ci_source_id` | `INTEGER` | No | ID of the ITAM tool integration in Service Management. |

**Response Fields:**

| Field | Type | Description |
|---|---|---|
| `ci_internal_id` | `INTEGER` | Configuration item ID from Service Management. |
| `ci_external_id` | `INTEGER` | Configuration item external source ID. |
| `ci_name` | `STRING` | Configuration item name. |

---

### `GET /data.export`

Returns the data export URL.

**Parameters:**

| Name | Type | Required | Description |
|---|---|---|---|
| `id` | `STRING` | Yes | The UUID of the data export report, obtained during report configuration. |

**Response Fields:**

| Field | Type | Description |
|---|---|---|
| `status` | `STRING` | Returns 'OK' if the data export report was correctly executed; or 'ERROR' if something went wrong. |
| `url` | `STRING` | Data export report URL. |

---

### `GET /kb.articles`

Lists all the articles with their properties.

**Parameters:**

| Name | Type | Required | Description |
|---|---|---|---|
| `order_by` | `STRING` | No | Attribute upon which the sorting of the results will be performed. "last_update_date" if they should be sorted by the articles last update date. If null, articles will be returned sorted by ID |
| `offset` | `INTEGER` | No | Skip this number of items in the response. |
| `sort_by` | `STRING` | No | The order in which the results should be sorted. "asc" if the results should be sorted in ascending order, or "desc" if they should be sorted in descending order. If null, articles will be returned sorted in ascending order. |
| `limit` | `INTEGER` | No | Number of items per page. |

**Response Fields:**

| Field | Type | Description |
|---|---|---|
| `is_private` | `BOOLEAN` | If the article is private or not. |
| `external_id` | `STRING` | External ID of the article. |
| `creation_date` | `STRING` | Creation date in epoch. |
| `views` | `INTEGER` | Amount of views that the article has. |
| `title` | `STRING` | Article title. |
| `author_id` | `INTEGER` | Author ID. |
| `attachments` | `ARRAY` | Array with the ID, name and URL of each attachment. |
| `status` | `INTEGER` | Article status ID. 1: Published, 4: Draft, 5: Archived. |
| `rating` | `FLOAT` | Average scoring of the article. |
| `content` | `STRING` | Content of the article. |
| `responsible_id` | `INTEGER` | Responsible ID. |
| `last_update_date` | `STRING` | Last update date in epoch. |
| `id` | `INTEGER` | Article ID. |
| `solved_requests` | `INTEGER` | Amount of requests that this article helped to solve. |
| `source` | `STRING` | Creation origin of the article: web, manual, ai, api, initial_setup, import or external_sync. Read-only. |
| `category_id` | `INTEGER` | Category ID. |

---

### `PUT /kb.articles`

Modifies an article given a certain ID.

**Parameters:**

| Name | Type | Required | Description |
|---|---|---|---|
| `is_private` | `BOOLEAN` | No | Mark as private. 1: Is private. 0: Is public. |
| `external_id` | `STRING` | No | External ID of the article. Optional; must be unique among articles. Send an empty string to clear it. If null, it is left unchanged. |
| `status` | `INTEGER` | No | Article status ID. 1: Published, 4: Draft, 5: Archived. If null, the status is left unchanged. |
| `content` | `STRING` | No | Article content. |
| `responsible_id` | `INTEGER` | No | Article responsible. If it's null, the assigned responsible user will be the same as the author. |
| `description` | `STRING` | No | Article description. |
| `title` | `STRING` | No | Article title. |
| `author_id` | `INTEGER` | Yes | Author ID. |
| `category_id` | `INTEGER` | No | Category ID. |
| `id` | `INTEGER` | Yes | Article ID. |

**Response Fields:**

| Field | Type | Description |
|---|---|---|
| `status` | `STRING` | Returns 'OK' if the article was correctly modified; or 'ERROR' if something went wrong. |

---

### `POST /kb.articles`

Creates an article.

**Parameters:**

| Name | Type | Required | Description |
|---|---|---|---|
| `is_private` | `BOOLEAN` | No | Mark as private. 1: Is private. 0: Is public. |
| `attachments` | `ARRAY` | No | Array of attachments. |
| `status` | `INTEGER` | No | Article status ID. 1: Published, 4: Draft. If null, the article is created as published. |
| `content` | `STRING` | Yes | Article content. |
| `responsible_id` | `INTEGER` | No | Article responsible. If it's null, the assigned responsible user will be the same as the author. |
| `description` | `STRING` | No | Article description. |
| `title` | `STRING` | Yes | Article title. |
| `author_id` | `INTEGER` | Yes | Author ID. |
| `external_id` | `STRING` | No | External ID of the article. Optional; must be unique among articles. |
| `category_id` | `INTEGER` | Yes | Category ID. |

**Response Fields:**

| Field | Type | Description |
|---|---|---|
| `article_id` | `INTEGER` | Article ID. |
| `status` | `STRING` | Returns 'OK' if the article was correctly created; or 'ERROR' if something went wrong. |

---

### `DELETE /kb.articles`

Deletes an article from a given ID.

**Parameters:**

| Name | Type | Required | Description |
|---|---|---|---|
| `id` | `INTEGER` | Yes | Article ID. |

**Response Fields:**

| Field | Type | Description |
|---|---|---|
| `status` | `STRING` | Returns 'OK' if the article was correctly deleted; or 'ERROR' if something went wrong. |

---

### `GET /kb.articles.attachments`

Lists the attachments from an article.

**Parameters:**

| Name | Type | Required | Description |
|---|---|---|---|
| `article_id` | `INTEGER` | Yes | Article ID. |

**Response Fields:**

| Field | Type | Description |
|---|---|---|
| `status` | `STRING` | Returns 'OK' if the query was correctly executed; or 'ERROR' if something went wrong. |
| `url` | `STRING` | Attachment URL. |
| `name` | `STRING` | Attachment Filename. |
| `id` | `INTEGER` | Attachment ID. |

---

### `DELETE /kb.articles.attachments`

Deletes an attachment from an article.

**Parameters:**

| Name | Type | Required | Description |
|---|---|---|---|
| `attachment_id` | `INTEGER` | Yes | Attachment ID. |
| `article_id` | `INTEGER` | Yes | Article ID. |

**Response Fields:**

| Field | Type | Description |
|---|---|---|
| `status` | `STRING` | Returns 'OK' if the attachment was correctly deleted; or 'ERROR' if something went wrong. |

---

### `POST /kb.articles.attachments`

Adds attachments to an article.

**Parameters:**

| Name | Type | Required | Description |
|---|---|---|---|
| `attachments` | `ARRAY` | No | Array of attachments. |
| `author_id` | `INTEGER` | Yes | ID of the user in whose name the update of the article will be done. |
| `article_id` | `INTEGER` | Yes | Article ID. |

**Response Fields:**

| Field | Type | Description |
|---|---|---|
| `status` | `STRING` | Returns 'OK' if the attachment was correctly added; or 'ERROR' if something went wrong. |

---

### `GET /kb.articles.by.category`

Lists all the articles that belong to a certain category.

**Parameters:**

| Name | Type | Required | Description |
|---|---|---|---|
| `visibility` | `INTEGER` | No | Visibility type of the articles to fetch. 1 => Private, 2 => Registered Users, 3 => Public. |
| `limit` | `INTEGER` | No | Number of items per page. |
| `offset` | `INTEGER` | No | Skip this number of items in the response. |
| `category_id` | `INTEGER` | Yes | Category ID. |

**Response Fields:**

| Field | Type | Description |
|---|---|---|
| `is_private` | `BOOLEAN` | If the article is private or not. |
| `external_id` | `STRING` | External ID of the article. |
| `creation_date` | `STRING` | Creation date in epoch. |
| `views` | `INTEGER` | Amount of views that the article has. |
| `title` | `STRING` | Article title. |
| `author_id` | `INTEGER` | Author ID. |
| `attachments` | `ARRAY` | Array with the ID, name and URL of each attachment. |
| `status` | `INTEGER` | Article status ID. 1: Published, 4: Draft, 5: Archived. |
| `rating` | `FLOAT` | Average scoring of the article. |
| `content` | `STRING` | Content of the article. |
| `responsible_id` | `INTEGER` | Responsible ID. |
| `last_update_date` | `STRING` | Last update date in epoch. |
| `id` | `INTEGER` | Article ID. |
| `solved_requests` | `INTEGER` | Amount of requests that this article helped to solve. |
| `source` | `STRING` | Creation origin of the article: web, manual, ai, api, initial_setup, import or external_sync. Read-only. |
| `category_id` | `INTEGER` | Category ID. |

---

### `GET /kb.articles.by.ids`

Lists articles by ID.

**Parameters:**

| Name | Type | Required | Description |
|---|---|---|---|
| `ids` | `ARRAY` | Yes | Article IDs. |

**Response Fields:**

| Field | Type | Description |
|---|---|---|
| `is_private` | `BOOLEAN` | If the article is private or not. |
| `external_id` | `STRING` | External ID of the article. |
| `creation_date` | `STRING` | Creation date in epoch. |
| `views` | `INTEGER` | Amount of views that the article has. |
| `title` | `STRING` | Article title. |
| `author_id` | `INTEGER` | Author ID. |
| `attachments` | `ARRAY` | Array with the ID, name and URL of each attachment. |
| `status` | `INTEGER` | Article status ID. 1: Published, 4: Draft, 5: Archived. |
| `rating` | `FLOAT` | Average scoring of the article. |
| `content` | `STRING` | Content of the article. |
| `responsible_id` | `INTEGER` | Responsible ID. |
| `last_update_date` | `STRING` | Last update date in epoch. |
| `id` | `INTEGER` | Article ID. |
| `solved_requests` | `INTEGER` | Amount of requests that this article helped to solve. |
| `source` | `STRING` | Creation origin of the article: web, manual, ai, api, initial_setup, import or external_sync. Read-only. |
| `category_id` | `INTEGER` | Category ID. |

---

### `GET /kb.articles.by.keywords`

Searches for articles by keywords.

**Parameters:**

| Name | Type | Required | Description |
|---|---|---|---|
| `keywords` | `STRING` | Yes | Keywords to search. |
| `limit` | `INTEGER` | No | Number of results, 25 by default. |
| `min_search_scoring` | `FLOAT` | No | Minimum search scoring from 0 to 1, which measures the accuracy of the search results. |

**Response Fields:**

| Field | Type | Description |
|---|---|---|
| `is_private` | `BOOLEAN` | If the article is private or not. |
| `external_id` | `STRING` | External ID of the article. |
| `creation_date` | `STRING` | Creation date in epoch. |
| `views` | `INTEGER` | Amount of views that the article has. |
| `search_scoring` | `FLOAT` | Score from 0 to 1 that measures the accuracy of the search result. |
| `title` | `STRING` | Article title. |
| `author_id` | `INTEGER` | Author ID. |
| `attachments` | `ARRAY` | Array with the ID, name and URL of each attachment. |
| `status` | `INTEGER` | Article status ID. 1: Published, 4: Draft, 5: Archived. |
| `rating` | `FLOAT` | Average scoring of the article. |
| `content` | `STRING` | Content of the article. |
| `responsible_id` | `INTEGER` | Responsible ID. |
| `last_update_date` | `STRING` | Last update date in epoch. |
| `id` | `INTEGER` | Article ID. |
| `solved_requests` | `INTEGER` | Amount of requests that this article helped to solve. |
| `source` | `STRING` | Creation origin of the article: web, manual, ai, api, initial_setup, import or external_sync. Read-only. |
| `category_id` | `INTEGER` | Category ID. |

---

### `GET /kb.categories`

Lists all the Knowledge Base categories.

*No parameters required.*

**Response Fields:**

| Field | Type | Description |
|---|---|---|
| `parent_id` | `INTEGER` | Category parent ID. |
| `name` | `STRING` | Category name. |
| `id` | `INTEGER` | Category ID. |

---

### `PUT /kb.categories`

Modifies a Knowledge Base category.

**Parameters:**

| Name | Type | Required | Description |
|---|---|---|---|
| `parent_id` | `INTEGER` | No | Category parent ID. |
| `name` | `STRING` | No | Category name. |
| `id` | `INTEGER` | Yes | Category ID. |

**Response Fields:**

| Field | Type | Description |
|---|---|---|
| `status` | `STRING` | Returns 'OK' if the category was correctly modified; or 'ERROR' if something went wrong. |

---

### `POST /kb.categories`

Creates a new Knowledge Base category.

**Parameters:**

| Name | Type | Required | Description |
|---|---|---|---|
| `parent_id` | `INTEGER` | No | Category Parent ID. |
| `name` | `STRING` | Yes | Category name. |

**Response Fields:**

| Field | Type | Description |
|---|---|---|
| `status` | `STRING` | Returns 'OK' if the category was correctly created; or 'ERROR' if something went wrong. |
| `category_id` | `STRING` | Category ID. |

---

### `DELETE /kb.categories`

Deletes a Knowledge Base category.

**Parameters:**

| Name | Type | Required | Description |
|---|---|---|---|
| `id` | `INTEGER` | Yes | Category ID. |

**Response Fields:**

| Field | Type | Description |
|---|---|---|
| `status` | `STRING` | Returns 'OK' if the category was correctly deleted; or 'ERROR' if something went wrong. |

---

### `GET /kb.categories.by.ids`

Lists Knowledge Base categories by some given IDs.

**Parameters:**

| Name | Type | Required | Description |
|---|---|---|---|
| `ids` | `ARRAY` | Yes | Category IDs. |

**Response Fields:**

| Field | Type | Description |
|---|---|---|
| `parent_id` | `INTEGER` | Category parent ID. |
| `name` | `STRING` | Category name. |
| `id` | `INTEGER` | Category ID. |

---

### `GET /sd.version`

Returns the current version of the InvGate Service Management instance.

*No parameters required.*

**Response Fields:**

| Field | Type | Description |
|---|---|---|
| `version` | `STRING` | InvGate Service Management version. |

---

### `GET /timetracking`

Lists all the available time tracking records within a specific time interval or a request ID.

**Parameters:**

| Name | Type | Required | Description |
|---|---|---|---|
| `request_id` | `INTEGER` | No | Request ID. Required if the from parameter  is not provided. |
| `from` | `STRING` | No | Initial date and time of the interval (must be in ISO-8601 format). Required if the request_id parameter is not provided. |
| `date_format` | `STRING` | No | Indicate the date format. The available formats are 'iso8601noT' or 'iso8601'. If null, 'iso8601noT' format is returned, which is ISO-8601 no T (YYYY-mm-dd H:i). |
| `to` | `STRING` | No | Ending date and time of the interval (must be in ISO-8601 format). If it's not specified, the current time will be used. |

**Response Fields:**

| Field | Type | Description |
|---|---|---|
| `to` | `STRING` | Ending date and time of the interval (in ISO 8601 format). |
| `from` | `STRING` | Initial date and time of the interval (in ISO 8601 format). |
| `status` | `INTEGER` | Time tracking entry status. 1: Enabled, 0: Deleted. |
| `comment` | `STRING` | Comment of the logged period. |
| `timetracking_id` | `INTEGER` | Time tracking entry ID. |
| `timetracking_category_id` | `INTEGER` | Time tracking category ID. |
| `user_id` | `INTEGER` | Author ID. |
| `total` | `STRING` | Total amount of time in seconds. |
| `incident` | `INTEGER` | Request ID. |

---

### `DELETE /timetracking`

Deletes a time log entry from a request.

**Parameters:**

| Name | Type | Required | Description |
|---|---|---|---|
| `request_id` | `INTEGER` | Yes | Request ID. |
| `user_id` | `INTEGER` | Yes | Author ID. |
| `timetracking_id` | `INTEGER` | Yes | Time tracking entry ID |

**Response Fields:**

| Field | Type | Description |
|---|---|---|
| `status` | `STRING` | Returns 'OK' if the time tracking entry was correctly deleted; or 'ERROR' if something went wrong. |

---

### `POST /timetracking`

Logs the indicated time within a request.

**Parameters:**

| Name | Type | Required | Description |
|---|---|---|---|
| `to` | `INTEGER` | Yes | Ending date and time of the interval (timestamp format). |
| `user_id` | `INTEGER` | Yes | Author ID. |
| `comment` | `STRING` | No | Add a comment for the logged time. |
| `request_id` | `INTEGER` | Yes | Request ID. |
| `from` | `INTEGER` | No | Initial date and time of the interval (timestamp format). If it's not specified, the current time will be used. |
| `category_id` | `INTEGER` | No | Time tracking category ID. |

**Response Fields:**

| Field | Type | Description |
|---|---|---|
| `status` | `STRING` | Returns 'OK' if the time tracking entry was correctly created; or 'ERROR' if something went wrong. |
| `timetracking_id` | `INTEGER` | The ID of the created time tracking entry. |

---

### `GET /timetracking.attributes.category`

Lists all the time tracking categories, or the required one if an ID is provided.

**Parameters:**

| Name | Type | Required | Description |
|---|---|---|---|
| `id` | `INTEGER` | No | Time tracking category ID. |

**Response Fields:**

| Field | Type | Description |
|---|---|---|
| `parent_id` | `INTEGER` | Time tracking parent category ID |
| `cost_per_hour` | `FLOAT` | Cost of a working hour under the category. |
| `name` | `STRING` | Time tracking category name. |
| `id` | `INTEGER` | Time tracking category ID. |

---

### `GET /triggers`

If no ID is specified, it returns a list with all the user defined triggers. Otherwise, it returns the trigger matching the specific trigger ID (if it exists).

**Parameters:**

| Name | Type | Required | Description |
|---|---|---|---|
| `trigger_id` | `INTEGER` | No | Trigger ID. |

**Response Fields:**

| Field | Type | Description |
|---|---|---|
| `trigger_name` | `STRING` | Trigger name. |
| `id` | `INTEGER` | Trigger ID. |

---

### `GET /triggers.executions`

Returns a list detailing each time that a specific trigger was executed in the last hour. If no trigger ID is provided, it returns all the times that user defined triggers were executed in the last hour.

**Parameters:**

| Name | Type | Required | Description |
|---|---|---|---|
| `trigger_id` | `INTEGER` | No | Trigger ID. |

**Response Fields:**

| Field | Type | Description |
|---|---|---|
| `request_id` | `INTEGER` | ID of the affected request. |
| `trigger_id` | `INTEGER` | Trigger ID. |
| `executed_at` | `INTEGER` | Execution timestamp. |
| `id` | `INTEGER` | Execution ID. |

---

