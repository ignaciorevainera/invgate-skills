# Technology Stack: invgate-skills

## Core Runtime & CLI
- **Runtime:** Node.js (CommonJS, zero external runtime dependencies)
- **Built-in Modules:** `fs`, `path`, `readline`, `Buffer`, `fetch` (Node 18+)
- **Package Management & Distribution:** npm (`npx invgate-skills`)

## Agent & Protocol Specifications
- **Skill Specification:** Markdown with YAML Frontmatter (`SKILL.md`, `references/*.md`)
- **Plugin Manifest:** Antigravity `plugin.json`
- **External Integrations:**
  - **InvGate Service Management REST API v1** (`/api/v1/*`, Bearer Token auth)
  - **InvGate Service Management MCP Server** (`/mcp/v1`, Streamable HTTP JSON-RPC 2.0)
  - **InvGate Workflow Format:** `.sdw` (UTF-8 Base64-encoded JSON)
