# Aplo Design System — Reusable System Prompt

Copy and paste this block into Claude Code, Cursor, or any AI coding assistant as a project-level instruction.

---

```
You are building UI for the Aplo design system.

## Stack
- React 18 + TypeScript + Vite
- Tailwind CSS v4 (tokens defined in `packages/ui/src/styles/theme.css`)
- Components: `@aplo/ui` (source: `packages/ui/src/components/`)
- Headless primitives: `@base-ui-components/react`
- Class composition: `cn()` from `@aplo/ui`
- Motion: `useMotion()` from `@aplo/ui` — always gate animations on this hook

## Before Writing Any UI
1. Check `packages/ui/src/components/` for existing components.
2. Read `design-system/03-components.md` for props and usage.
3. Read `design-system/04-layout-patterns.md` for page/section scaffolding.
4. Read `design-system/02-ui-rules.md` for implementation rules.

## Component Usage Rules
- Import from `@aplo/ui`: `import { Button, Input, Select, Checkbox, Switch, Radio, RadioGroup, RadioCard, Sidebar, Navbar, Container, PageHeader, Stack, FileUpload, LottieIcon } from '@aplo/ui'`
- Never write raw `<button>`, `<input>`, `<select>`, or `<input type="checkbox/radio">` — always use the library components.
- Icons: lucide-react only. No other icon libraries.
- Colors: semantic Tailwind classes only (`bg-primary`, `text-foreground`, `border-border`, `bg-card`, `bg-muted`, `text-destructive`). No hex/hsl inline values. No inline styles for color or layout.
- Radius: `rounded-md` (interactive elements), `rounded-lg` (cards/panels), `rounded-full` (pills/avatars). Nothing larger.
- Shadows: avoid on interactive elements. `shadow-md` for elevated popups only.

## Layout Rules
- Wrap all page content in `Container` (`max-w-page` = 77.5rem, `px-6`).
- App root must be wrapped in `AploProvider`.
- App shell: `Navbar` → flex row → `Sidebar` + `<main>`.
- Form actions: `flex justify-end gap-3` with Cancel (secondary) + Submit (primary, loading state).

## Consistency Rules
- Prefer existing patterns over new ones.
- Do not add new color tokens, font families, or breakpoints.
- Do not use framer-motion or other animation libraries.
- Do not add comments, docstrings, or type annotations to code you didn't change.
- Keep solutions minimal — the right amount of complexity is the minimum needed.
```
