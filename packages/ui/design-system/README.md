# Aplo Design System — AI Reference

This folder contains the machine-readable design system documentation for `@aplo/ui`.

It is written for AI coding agents first, human developers second.

---

## Read Order for AI Agents

1. **[aplo-ds.md](./aplo-ds.md)** — Start here. Single canonical reference for generating UI.
2. **[ai-rules.md](./ai-rules.md)** — Strict rules for what to use, what to avoid.
3. **[03-components.md](./03-components.md)** — Full component reference with props and patterns.
4. **[04-layout-patterns.md](./04-layout-patterns.md)** — Page and section scaffolding.

---

## File Overview

| File | Purpose | Read When |
|------|---------|-----------|
| `aplo-ds.md` | Canonical single-file summary | Always — read first |
| `ai-rules.md` | Strict do/don't rules for agents | Before generating any UI |
| `system-prompt.md` | Paste-ready prompt for Claude/Cursor | When configuring a new AI session |
| `01-design-principles.md` | Design intent and a11y expectations | When making design decisions |
| `02-ui-rules.md` | Implementation rules (spacing, color, motion) | When unsure about a styling decision |
| `03-components.md` | Component props, variants, usage | When using a specific component |
| `04-layout-patterns.md` | Page/section layouts with code | When scaffolding new pages |
| `tokens.json` | Design tokens (color, radius, spacing) | When checking exact values |

---

## Source of Truth

The actual source code is in `packages/ui/src/components/`. These docs are derived from it.

If there is a conflict between this documentation and the source code, the source code wins.

---

## How to Use

**For a new Claude Code / Cursor session**:
1. Paste the contents of `system-prompt.md` into your system prompt or project instructions.
2. Reference `aplo-ds.md` in your first message for context.

**For a specific component question**:
- Read `03-components.md` for the relevant component.

**For a new page or feature**:
- Check `04-layout-patterns.md` for the closest matching layout pattern.
- Check `03-components.md` for the components you'll need.
- Follow `02-ui-rules.md` for all styling decisions.
