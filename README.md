# invgate-skills

A collection of AI agent skills for **InvGate Service Management**. Each skill teaches an AI coding assistant how to generate, design, and document InvGate configurations.

## Quick Start (via `npx`)

You can install these skills directly into your environment without cloning:

```bash
# Interactive installation
npx invgate-skills

# Directly into Antigravity global configuration (~/.gemini/config/skills/)
npx invgate-skills install --target antigravity

# Directly into current project workspace (.agents/skills/)
npx invgate-skills install --target agents

# Directly into Claude Code workspace (.claude/skills/)
npx invgate-skills install --target claude

# List available skills
npx invgate-skills list
```

## Available Skills

| Skill | Description | Status |
|---|---|---|
| `invgate-templates` | Generate HTML customization templates for InvGate tickets | ✅ Ready |
| `invgate-workflows` | Design approval and escalation workflows | 🚧 Placeholder |
| `invgate-catalog` | Structure service catalog items and categories | 🚧 Placeholder |

## Structure

```text
invgate-skills/
├── bin/
│   └── invgate-skills.js  # CLI runner for npx installation
├── plugin.json            # Antigravity plugin manifest
├── package.json           # npm package definition
├── README.md
└── skills/
    ├── invgate-templates/
    │   └── SKILL.md
    ├── invgate-workflows/
    │   └── SKILL.md
    └── invgate-catalog/
        └── SKILL.md
```

## Publishing to npm

To make `npx invgate-skills` accessible to everyone:

```bash
npm login
npm publish --access public
```
