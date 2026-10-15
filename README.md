# invgate-skills

A comprehensive collection of modular AI agent skills for **InvGate Service Management**. Designed for platforms like Google Antigravity, Claude Code, and Codex, this toolkit enables AI assistants to design, inspect, integrate, automate, and document InvGate configurations following enterprise best practices.

## Core Philosophy: Modular & Adaptive Solutions

InvGate solutions are not one-size-fits-all:
* **Standalone Templates**: An HTML template can be the complete and sufficient solution to standardize request capture for a helpdesk queue, without requiring new workflows or catalog redesigns.
* **Standalone Workflows**: An `.sdw` workflow can automate backend operations, approvals, and child tickets independently.
* **Live Discovery First**: Use the MCP server (or QA sandbox) to inspect live field types and schemas before writing code, without hardcoding non-production IDs.
* **Zero-Fluff Documentation**: Clear, actionable documentation formatted in Notion- and GitHub-compatible Markdown with Mermaid diagrams and decision matrices.

---

## Available Skills

| Skill | Description | Scope |
|---|---|---|
| [`invgate-templates`](skills/invgate-templates/SKILL.md) | Generate HTML customization templates for InvGate tickets with strict tag guidelines (`<p>`, `#3498db` titles, helper notes). | UI / Forms |
| [`invgate-workflows`](skills/invgate-workflows/SKILL.md) | Inspect, edit, design, and convert InvGate `.sdw` workflows (JSON schema, approvals, sub-processes, formulas, native actions). | Automation / SDW |
| [`invgate-catalog`](skills/invgate-catalog/SKILL.md) | Structure service catalog categories, hierarchies (`parent_path`), form fields, and request type bindings. | Service Catalog |
| [`invgate-api`](skills/invgate-api/SKILL.md) | Build, execute, and debug HTTP REST API requests against InvGate endpoints (Incidents, Workflows, Users, KB). | Integrations / REST |
| [`invgate-mcp`](skills/invgate-mcp/SKILL.md) | Query live instance entities via Model Context Protocol (MCP) with strict environment precedence (QA vs. Prod). | Live Inspection |
| [`invgate-docs`](skills/invgate-docs/SKILL.md) | Write concise, Notion-compatible technical runbooks, SOPs/KB articles, ADRs, and process improvement proposals. | Documentation / KB |

---

## Built-in CLI Utilities

The package includes executable CLI tools available via `npx`:

### 1. Skill Installation
Install skills directly into your preferred agent workspace:

```bash
# Interactive setup
npx invgate-skills

# Directly into Antigravity global configuration (~/.gemini/config/skills/)
npx invgate-skills install --target antigravity

# Into current project workspace (.agents/skills/)
npx invgate-skills install --target agents

# Into Claude Code workspace (.claude/skills/)
npx invgate-skills install --target claude

# List packaged skills
npx invgate-skills list
```

### 2. Workflow (.sdw) Conversion
Convert InvGate workflow files to editable JSON and back:

```bash
# Unpack Base64 .sdw to readable JSON
npx invgate-skills sdw unpack workflow.sdw [workflow.json]

# Pack modified JSON back to importable .sdw
npx invgate-skills sdw pack workflow.json [workflow.sdw]
```

---

## Repository Structure

```text
invgate-skills/
├── bin/
│   └── invgate-skills.js     # CLI runner (installer & sdw converter)
├── plugin.json               # Antigravity plugin manifest
├── package.json              # npm package definition
├── README.md
└── skills/
    ├── invgate-templates/    # HTML description templates
    ├── invgate-workflows/    # Workflow (.sdw) schema & rules
    │   └── references/       # Full sdw-schema.md specifications
    ├── invgate-catalog/      # Catalog hierarchy & category design
    ├── invgate-api/          # REST API endpoints & payload references
    │   └── references/       # Domain markdown reference docs
    ├── invgate-mcp/          # MCP tools reference & precedence rules
    │   └── references/       # Tool input schemas & entity shapes
    └── invgate-docs/         # Notion-compatible documentation archetypes
```

---

## Publishing to npm

```bash
npm login
npm publish --access public
```
