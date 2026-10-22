# InvGate Service Management REST API - Endpoint Index

Source: [InvGate Service Desk API Manual](https://releases.invgate.com/service-desk/api/)

Total operations cataloged: 166

## /breakingnews

| Method | Endpoint | Description |
|---|---|---|
| PUT | /breakingnews | Modifies a set of Breaking News. |
| GET | /breakingnews | Returns the requested Breaking News. |
| POST | /breakingnews | Creates Breaking News. |

## /breakingnews.all

| Method | Endpoint | Description |
|---|---|---|
| GET | /breakingnews.all | Lists all the Breaking News. |

## /breakingnews.attributes.status

| Method | Endpoint | Description |
|---|---|---|
| GET | /breakingnews.attributes.status | Lists all the possible status for the Breaking News' and their descriptions. If an ID is provided, only one will be listed. |

## /breakingnews.attributes.type

| Method | Endpoint | Description |
|---|---|---|
| GET | /breakingnews.attributes.type | Lists all the importance types of the Breaking News. If an ID its provided, only one will be listed. |

## /breakingnews.status

| Method | Endpoint | Description |
|---|---|---|
| GET | /breakingnews.status | Returns the updates of the requested Breaking News. |
| POST | /breakingnews.status | Creates a new update to the given Breaking News. |

## /categories

| Method | Endpoint | Description |
|---|---|---|
| GET | /categories | Lists all the categories, or the required one if an ID is provided. Supports text search and pagination. |

## /cf.field.options.list

| Method | Endpoint | Description |
|---|---|---|
| DELETE | /cf.field.options.list | Erases keys from the list type custom fields configuration. |
| GET | /cf.field.options.list | Lists the configuration of custom fields that are a list type. |
| POST | /cf.field.options.list | Configures list type custom fields. If the key already exists, the previous value will be overwritten. |

## /cf.field.options.list.config

| Method | Endpoint | Description |
|---|---|---|
| GET | /cf.field.options.list.config | Lists the configuration of custom fields that are of type list. |

## /cf.field.options.tree

| Method | Endpoint | Description |
|---|---|---|
| DELETE | /cf.field.options.tree | Erases the options from the tree type custom fields and any of its children. |
| PUT | /cf.field.options.tree | Modifies the configuration of the tree type custom fields. If there is no such key, it will be added. |
| GET | /cf.field.options.tree | Returns the structure of the tree type custom fields options. The hash is system internal, but it is used to make modifications. |
| POST | /cf.field.options.tree | Adds configuration to the tree type custom fields. If the key already exists, the previous value will be overwritten. |

## /cf.fields.all

| Method | Endpoint | Description |
|---|---|---|
| GET | /cf.fields.all | Returns a list of all the active custom fields. |

## /cf.fields.by.category

| Method | Endpoint | Description |
|---|---|---|
| GET | /cf.fields.by.category | Returns a list of the custom fields related to a category ID. |

## /cf.fields.shared.all

| Method | Endpoint | Description |
|---|---|---|
| GET | /cf.fields.shared.all | Returns a list of all the active shared custom fields. |

## /cf.fields.types

| Method | Endpoint | Description |
|---|---|---|
| GET | /cf.fields.types | Returns a list of all the supported custom field types, with a brief description of the data type for each field. |

## /cis.by.id

| Method | Endpoint | Description |
|---|---|---|
| GET | /cis.by.id | Returns an array of CIs, linked through custom fields and shared custom fields, with their IDs and properties. |

## /companies

| Method | Endpoint | Description |
|---|---|---|
| DELETE | /companies | Erases an existing company. |
| PUT | /companies | Modifies an existing company. |
| GET | /companies | Returns all the active companies. |
| POST | /companies | Creates a new company. |

## /companies.groups

| Method | Endpoint | Description |
|---|---|---|
| DELETE | /companies.groups | Suppresses the relationship between a users group and a company. |
| GET | /companies.groups | Lists all the users groups related to a company. |
| POST | /companies.groups | Relates a users group to a company. |

## /companies.observers

| Method | Endpoint | Description |
|---|---|---|
| DELETE | /companies.observers | Removes observers from a company. |
| GET | /companies.observers | Returns all active companies and their observers, or the observers for the specified companies. |
| POST | /companies.observers | Add users as observers to a company. |

## /companies.users

| Method | Endpoint | Description |
|---|---|---|
| DELETE | /companies.users | Removes a user from a company. If the user is within a group that belongs to that company, they will also be removed from that group. |
| GET | /companies.users | Lists the members of a company. |
| POST | /companies.users | Adds a user to a company. If the company contains groups, the users will also be added to those groups. |

## /data.export

| Method | Endpoint | Description |
|---|---|---|
| GET | /data.export | Returns the data export URL. |

## /groups

| Method | Endpoint | Description |
|---|---|---|
| DELETE | /groups | Erases a group of users. |
| GET | /groups | Returns all active groups of users, or one in particular if an ID or name is provided. |
| POST | /groups | Creates a group of users. |

## /groups.observers

| Method | Endpoint | Description |
|---|---|---|
| DELETE | /groups.observers | Removes observers from a group. |
| GET | /groups.observers | Returns all active groups and their observers, or the observers for the specified groups. |
| POST | /groups.observers | Add users as observers to a group. |

## /groups.users

| Method | Endpoint | Description |
|---|---|---|
| DELETE | /groups.users | Removes a user from a group. |
| GET | /groups.users | Lists the members of a group. |
| POST | /groups.users | Adds a user to a group. |

## /helpdesks

| Method | Endpoint | Description |
|---|---|---|
| GET | /helpdesks | Returns all the active help desks, or one in particular. |

## /helpdesks.observers

| Method | Endpoint | Description |
|---|---|---|
| DELETE | /helpdesks.observers | Removes observers from a help desk. |
| GET | /helpdesks.observers | Returns all active help desks and their observers, or the observers for the specified help desks. |
| POST | /helpdesks.observers | Add users as observers to a help desk. |

## /helpdesksandlevels

| Method | Endpoint | Description |
|---|---|---|
| GET | /helpdesksandlevels | Returns all the help desks and levels, or one in particular. |

## /incident

| Method | Endpoint | Description |
|---|---|---|
| PUT | /incident | Change attributes of a request. |
| GET | /incident | Returns the information of the given request. |
| POST | /incident | Creates a new request in the system. To include custom fields, read this guide . |

## /incident.approval

| Method | Endpoint | Description |
|---|---|---|
| GET | /incident.approval | Lists the approvals instances that the given request has. |

## /incident.approval.accept

| Method | Endpoint | Description |
|---|---|---|
| PUT | /incident.approval.accept | Accepts an approval. |

## /incident.approval.add_voter

| Method | Endpoint | Description |
|---|---|---|
| POST | /incident.approval.add_voter | Adds a voter to an approval. |

## /incident.approval.cancel

| Method | Endpoint | Description |
|---|---|---|
| PUT | /incident.approval.cancel | Cancels an approval. |

## /incident.approval.possible_voters

| Method | Endpoint | Description |
|---|---|---|
| GET | /incident.approval.possible_voters | Lists users that could accept or reject the approval. |

## /incident.approval.reject

| Method | Endpoint | Description |
|---|---|---|
| PUT | /incident.approval.reject | Rejects an approval. |

## /incident.approval.status

| Method | Endpoint | Description |
|---|---|---|
| GET | /incident.approval.status | Lists the statuses of the approvals. |

## /incident.approval.type

| Method | Endpoint | Description |
|---|---|---|
| GET | /incident.approval.type | Lists the available approvals types. |

## /incident.approval.vote_status

| Method | Endpoint | Description |
|---|---|---|
| GET | /incident.approval.vote_status | Lists the status of the approval votes. |

## /incident.attachment

| Method | Endpoint | Description |
|---|---|---|
| GET | /incident.attachment | Returns the requested attachment. |

## /incident.attributes.priority

| Method | Endpoint | Description |
|---|---|---|
| GET | /incident.attributes.priority | Lists all the priorities, or only one if an ID its provided. |

## /incident.attributes.source

| Method | Endpoint | Description |
|---|---|---|
| GET | /incident.attributes.source | Lists all the sources. If an ID is provided, only the one that matches the specified ID will be listed. |

## /incident.attributes.status

| Method | Endpoint | Description |
|---|---|---|
| GET | /incident.attributes.status | Lists all the status. If an ID is provided, only the one that matches the specified ID will be listed. |

## /incident.attributes.type

| Method | Endpoint | Description |
|---|---|---|
| GET | /incident.attributes.type | Lists all the types. If an ID is provided, only the one that matches the specified ID will be listed. Use the status filter to include deleted types. |

## /incident.cancel

| Method | Endpoint | Description |
|---|---|---|
| POST | /incident.cancel | Cancel a request. |

## /incident.collaborator

| Method | Endpoint | Description |
|---|---|---|
| GET | /incident.collaborator | Lists the collaborators IDs. |
| POST | /incident.collaborator | Requests collaboration from the defined user. |

## /incident.comment

| Method | Endpoint | Description |
|---|---|---|
| GET | /incident.comment | Gets the replies from a given request. |
| POST | /incident.comment | Adds a reply to a request. |

## /incident.custom_approval

| Method | Endpoint | Description |
|---|---|---|
| GET | /incident.custom_approval | Lists the custom approvals templates that the given request has. |
| POST | /incident.custom_approval | Requests a custom approval in the given request. |

## /incident.custom_field

| Method | Endpoint | Description |
|---|---|---|
| DELETE | /incident.custom_field | Deletes value in the associated custom field. |
| POST | /incident.custom_field | Creates values for a custom field from a request. Different types of data can be sent in the values variable. No value (empty string) means erase value. When sending files, the name of the file has to be in the values array (including its extension), and the file(s) itself should be sent in the body of the request. |
| PATCH | /incident.custom_field | Add values for a multiple custom field from a request. This only works for the custom field with type CI. It can only be sent one CI name at a time in the values variable. It must be the complete name of the CI and all the CIs that have that exact name will be added to the multiple custom field. |

## /incident.external_entity

| Method | Endpoint | Description |
|---|---|---|
| GET | /incident.external_entity | Lists all the external entities linked to a request. |
| POST | /incident.external_entity | Links a request to an external entity. |

## /incident.link

| Method | Endpoint | Description |
|---|---|---|
| GET | /incident.link | Lists all the linked requests from a given request. |
| POST | /incident.link | Links a request to another request. |

## /incident.linked_cis.counters.from

| Method | Endpoint | Description |
|---|---|---|
| GET | /incident.linked_cis.counters.from | Returns counters with the number of incidents of each status. |

## /incident.observer

| Method | Endpoint | Description |
|---|---|---|
| GET | /incident.observer | Lists all the IDs of the request's observers. |
| POST | /incident.observer | Adds a user as observer. |

## /incident.promote.to.major.incident

| Method | Endpoint | Description |
|---|---|---|
| POST | /incident.promote.to.major.incident | Promotes the given request to a major incident and returns the ID of the created major incident. |

## /incident.reassign

| Method | Endpoint | Description |
|---|---|---|
| POST | /incident.reassign | Reassigns a request to a help desk and/or agent. |

## /incident.reject

| Method | Endpoint | Description |
|---|---|---|
| POST | /incident.reject | Rejects a request. |

## /incident.relate.ci.by.keyword

| Method | Endpoint | Description |
|---|---|---|
| POST | /incident.relate.ci.by.keyword | Relates a request to every CI that matches a certain keyword. |

## /incident.reopen

| Method | Endpoint | Description |
|---|---|---|
| PUT | /incident.reopen | Reopens a request. |

## /incident.solution.accept

| Method | Endpoint | Description |
|---|---|---|
| PUT | /incident.solution.accept | Accepts the solution of a request. |

## /incident.solution.reject

| Method | Endpoint | Description |
|---|---|---|
| PUT | /incident.solution.reject | Rejects the solution of a request. |

## /incident.spontaneous_approval

| Method | Endpoint | Description |
|---|---|---|
| POST | /incident.spontaneous_approval | Creates a spontaneous approval. |

## /incident.tasks

| Method | Endpoint | Description |
|---|---|---|
| GET | /incident.tasks | Retrieves the list of tasks linked to a specified request. |

## /incident.waitingfor.agent

| Method | Endpoint | Description |
|---|---|---|
| POST | /incident.waitingfor.agent | Sets the agent waiting status to the request. |

## /incident.waitingfor.customer

| Method | Endpoint | Description |
|---|---|---|
| POST | /incident.waitingfor.customer | Sets the waiting for customer status to the request. |

## /incident.waitingfor.date

| Method | Endpoint | Description |
|---|---|---|
| POST | /incident.waitingfor.date | Sets the waiting for date status to the request. |

## /incident.waitingfor.external_entity

| Method | Endpoint | Description |
|---|---|---|
| POST | /incident.waitingfor.external_entity | Sets the request in the waiting for external entity status. The entity should be already linked. |

## /incident.waitingfor.incident

| Method | Endpoint | Description |
|---|---|---|
| POST | /incident.waitingfor.incident | Sets the request in the waiting for another request status. |

## /incidents

| Method | Endpoint | Description |
|---|---|---|
| GET | /incidents | Lists the requests. |

## /incidents.by.agent

| Method | Endpoint | Description |
|---|---|---|
| GET | /incidents.by.agent | Lists the requests from a given agent. |

## /incidents.by.cis

| Method | Endpoint | Description |
|---|---|---|
| GET | /incidents.by.cis | Returns all the requests linked to a CI, considering its IDs, its groups and the ID of the integration it belongs to. |

## /incidents.by.customer

| Method | Endpoint | Description |
|---|---|---|
| GET | /incidents.by.customer | Lists the open requests from a customer. |

## /incidents.by.helpdesk

| Method | Endpoint | Description |
|---|---|---|
| GET | /incidents.by.helpdesk | Lists the open requests from a help desk. |

## /incidents.by.sentiment

| Method | Endpoint | Description |
|---|---|---|
| GET | /incidents.by.sentiment | Lists the open requests from a sentiment. |

## /incidents.by.status

| Method | Endpoint | Description |
|---|---|---|
| GET | /incidents.by.status | Lists all open requests matching the status specified by parameter. |

## /incidents.by.view

| Method | Endpoint | Description |
|---|---|---|
| GET | /incidents.by.view | Lists the requests from a view ID. |

## /incidents.details.by.view

| Method | Endpoint | Description |
|---|---|---|
| GET | /incidents.details.by.view | Lists the requests with their details from a view ID. |

## /incidents.last.hour

| Method | Endpoint | Description |
|---|---|---|
| GET | /incidents.last.hour | Lists all the requests that were created within the last hour. |

## /internalnotes

| Method | Endpoint | Description |
|---|---|---|
| DELETE | /internalnotes | Deletes an internal note. |
| PUT | /internalnotes | Updates the info of an internal note. |
| GET | /internalnotes | Lists all the internal notes, or one in particular. |
| POST | /internalnotes | Creates an internal note. |

## /kb.articles

| Method | Endpoint | Description |
|---|---|---|
| DELETE | /kb.articles | Deletes an article from a given ID. |
| PUT | /kb.articles | Modifies an article given a certain ID. |
| GET | /kb.articles | Lists all the articles with their properties. |
| POST | /kb.articles | Creates an article. |

## /kb.articles.attachments

| Method | Endpoint | Description |
|---|---|---|
| DELETE | /kb.articles.attachments | Deletes an attachment from an article. |
| GET | /kb.articles.attachments | Lists the attachments from an article. |
| POST | /kb.articles.attachments | Adds attachments to an article. |

## /kb.articles.by.category

| Method | Endpoint | Description |
|---|---|---|
| GET | /kb.articles.by.category | Lists all the articles that belong to a certain category. |

## /kb.articles.by.ids

| Method | Endpoint | Description |
|---|---|---|
| GET | /kb.articles.by.ids | Lists articles by ID. |

## /kb.articles.by.keywords

| Method | Endpoint | Description |
|---|---|---|
| GET | /kb.articles.by.keywords | Searches for articles by keywords. |

## /kb.categories

| Method | Endpoint | Description |
|---|---|---|
| DELETE | /kb.categories | Deletes a Knowledge Base category. |
| PUT | /kb.categories | Modifies a Knowledge Base category. |
| GET | /kb.categories | Lists all the Knowledge Base categories. |
| POST | /kb.categories | Creates a new Knowledge Base category. |

## /kb.categories.by.ids

| Method | Endpoint | Description |
|---|---|---|
| GET | /kb.categories.by.ids | Lists Knowledge Base categories by some given IDs. |

## /levels

| Method | Endpoint | Description |
|---|---|---|
| GET | /levels | Returns all active help desks' levels, or one in particular. |

## /levels.observers

| Method | Endpoint | Description |
|---|---|---|
| DELETE | /levels.observers | Removes observers from a help desk level. |
| GET | /levels.observers | Returns all active help desk levels and their observers, or the observers for the specified help desk levels. |
| POST | /levels.observers | Add users as observers to a help desk level. |

## /locations

| Method | Endpoint | Description |
|---|---|---|
| DELETE | /locations | Erases an existing location and its sublocations. |
| GET | /locations | Returns all active locations, or one in particular. |
| POST | /locations | Creates a location. |

## /locations.observers

| Method | Endpoint | Description |
|---|---|---|
| DELETE | /locations.observers | Removes observers from a location. |
| GET | /locations.observers | Returns all active locations and their observers, or the observers for the specified locations. |
| POST | /locations.observers | Add users as observers to a location. |

## /locations.users

| Method | Endpoint | Description |
|---|---|---|
| DELETE | /locations.users | Removes users from a location. |
| GET | /locations.users | Lists the members of a location. |
| POST | /locations.users | Adds users to a location. |

## /sd.version

| Method | Endpoint | Description |
|---|---|---|
| GET | /sd.version | Returns the current version of the InvGate Service Management instance. |

## /timetracking

| Method | Endpoint | Description |
|---|---|---|
| DELETE | /timetracking | Deletes a time log entry from a request. |
| GET | /timetracking | Lists all the available time tracking records within a specific time interval or a request ID. |
| POST | /timetracking | Logs the indicated time within a request. |

## /timetracking.attributes.category

| Method | Endpoint | Description |
|---|---|---|
| GET | /timetracking.attributes.category | Lists all the time tracking categories, or the required one if an ID is provided. |

## /triggers

| Method | Endpoint | Description |
|---|---|---|
| GET | /triggers | If no ID is specified, it returns a list with all the user defined triggers. Otherwise, it returns the trigger matching the specific trigger ID (if it exists). |

## /triggers.executions

| Method | Endpoint | Description |
|---|---|---|
| GET | /triggers.executions | Returns a list detailing each time that a specific trigger was executed in the last hour. If no trigger ID is provided, it returns all the times that user defined triggers were executed in the last hour. |

## /user

| Method | Endpoint | Description |
|---|---|---|
| DELETE | /user | Deletes a user. |
| PUT | /user | Updates the info of a user. |
| GET | /user | Returns the info of a user. |
| POST | /user | Creates a new user. |

## /user.by

| Method | Endpoint | Description |
|---|---|---|
| GET | /user.by | Retrieves the user matching the username or email and displays some basic information about the user. At least one of the input parameters is required. |

## /user.convert

| Method | Endpoint | Description |
|---|---|---|
| POST | /user.convert | Changes the user from external into internal and sends an email to the user requesting a new password. |

## /user.disable

| Method | Endpoint | Description |
|---|---|---|
| PUT | /user.disable | Disables a user. |

## /user.enable

| Method | Endpoint | Description |
|---|---|---|
| PUT | /user.enable | Enables a user. |

## /user.password

| Method | Endpoint | Description |
|---|---|---|
| PUT | /user.password | Changes the password of a user. |

## /user.password.reset

| Method | Endpoint | Description |
|---|---|---|
| POST | /user.password.reset | Sends an email to the user requesting a new password. |

## /user.token

| Method | Endpoint | Description |
|---|---|---|
| POST | /user.token | Creates a new session token for the user that matches the input ID. |

## /users

| Method | Endpoint | Description |
|---|---|---|
| GET | /users | Retrieves users and displays some basic information about them. It's possible to specify an array of user IDs in order to filter specific users; otherwise, it retrieves all users. |

## /users.by

| Method | Endpoint | Description |
|---|---|---|
| GET | /users.by | Retrieves users matching username, email or any of their phone numbers and displays basic information about them. |

## /users.groups

| Method | Endpoint | Description |
|---|---|---|
| GET | /users.groups | Returns the user's groups, companies, helpdesks and locations. |

## /wf.deploy

| Method | Endpoint | Description |
|---|---|---|
| PUT | /wf.deploy | Deploys the last version of the workflow. |

## /wf.initialfields.by.category

| Method | Endpoint | Description |
|---|---|---|
| GET | /wf.initialfields.by.category | Lists the initial fields needed to create a request from a workflow. |

## /wf.request

| Method | Endpoint | Description |
|---|---|---|
| GET | /wf.request | Returns the general information of a workflow request, the steps it went through with the values loaded in their fields, and the current value of every workflow variable. Steps the workflow has not reached yet are not returned. |

## /workflow.field.list.values

| Method | Endpoint | Description |
|---|---|---|
| GET | /workflow.field.list.values | Retrieves current values from a workflow instance field of type list. |
| POST | /workflow.field.list.values | Adds or sets values in a workflow instance field of type list. Use operation "add" to append values (default) or "set" to replace all values. |

