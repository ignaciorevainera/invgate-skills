# Official MCP Server Articles

Curated from the Spanish KB (`support.invgate.com`) on 2026-11-18. Full index: `invgate-basics/references/kb-index.md`.

| Article | ID | Product |
|---|---|---|
| Cómo conectar asistentes de IA a Service Management con MCP | [2115](https://support.invgate.com/knowledgebase_articles/show/index/article_id/2115) | Service Management |
| Servidor MCP: conectar asistentes de IA a Asset Management (Beta) | [2122](https://support.invgate.com/knowledgebase_articles/show/index/article_id/2122) | Asset Management |

## Service Management — Key Facts

- Endpoint per instance: `https://{cliente}.invgate.com/mcp/v1`, transport **Streamable HTTP**, JSON-RPC over POST.
- Token prefix `smmcp_`, created at **Perfil > Opciones > Tokens MCP**. Expiry 30/60/90 days or none. Maximum 10 active tokens per user. Shown once.
- Admin switch: **Config > AI Hub > Servidor MCP**. All options are off by default.
  - Master switch (endpoint returns Not Found when off)
  - Enable for end users
  - Enable write for agents
  - Enable write for end users
  - Additional allowed origins for browser-based clients (max 20)
- Disabling the master switch **suspends** tokens in Service Management; re-enabling restores them. Revoking a token is immediate and permanent.
- Tokens inherit the owner's permissions and are stored hashed (SHA-256). Token-level rate limiting returns `429` + `Retry-After`.
- Clients: Gemini CLI (native `httpUrl`), Claude Desktop (via `mcp-remote`), any client supporting HTTP + custom `Authorization` header.
- Resource `sm://me` returns the authenticated user profile.

### Tool Inventory

Read (all users): enums; request detail with comments and secure attachment URLs; KB search; Virtual Service Agent Q&A; my requests; my pending approvals; notifications; creatable categories; category creation form; my views and their requests.

Write (if enabled): create request; reply (public/internal, optionally as solution); approve/reject request; accept/reject proposed solution.

Agent extras (read): my pending work; my tasks; collaborations and observations; due in the next 48 hours; user search by scope; global request search; requests by customer; structured request list with combined filters; search companies, helpdesks and locations.

Agent extras (write): complete task; assign/reassign request; change status (reopen, reject, cancel).

### Known Beta Limits

No stage advancement beyond creation, no attachment upload, no CMDB/asset operations, no reports or analytics, no custom-field or priority filter in global search.

## Asset Management — Key Facts

- Endpoint `/mcp/v1` on the IGAM instance, transport Streamable HTTP.
- **Read-only** in this version: query inventory, people and financial data with the user's permissions.
- Token prefix `ammcp_`; expiry 30/60/90 days or none; maximum 10 active tokens.
- Admin switch: **Configuración > AI Hub > Servidor MCP**. Available on Cloud and On-Premise.
- Limitation to verify per version: the AM article states that disabling the server **revokes** existing tokens irreversibly, while the SM article states they are suspended. Confirm on the target instance before disabling.
