# invgate-skills

A collection of AI agent skills for **InvGate Service Management**. Each skill teaches an AI coding assistant how to generate, design, and document InvGate configurations.

## Available Skills

| Skill | Description | Status |
|---|---|---|
| `invgate-templates` | Generate HTML customization templates for InvGate tickets | ✅ Ready |
| `invgate-workflows` | Design approval and escalation workflows | 🚧 Placeholder |
| `invgate-catalog` | Structure service catalog items and categories | 🚧 Placeholder |

## Installation

### Antigravity

Add this package to your project's `plugins.json`:

```json
{
  "plugins": [
    { "path": "/absolute/path/to/invgate-skills" }
  ]
}
```

Or register it globally in `~/.gemini/config/plugins.json` to make it available across all projects.

### Other AI Assistants (Claude Code, VS Code Copilot, OpenCode)

Copy the relevant `SKILL.md` files into your project's instructions folder (e.g., `.agents/`, `.github/`, or the path your tool reads from), and reference them as needed.

## Structure

```
invgate-skills/
├── plugin.json
├── README.md
└── skills/
    ├── invgate-templates/
    │   └── SKILL.md
    ├── invgate-workflows/
    │   └── SKILL.md
    └── invgate-catalog/
        └── SKILL.md
```
