# Aplo Design System — AI Agent Rules

Rules for AI coding agents (Claude Code, Cursor, ChatGPT) generating UI in this codebase.

---

## Stack Summary

- **Framework**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS v4 (utility-first, no config file — tokens in `theme.css`)
- **Components**: `@aplo/ui` (`packages/ui/src/components/`)
- **Headless primitives**: `@base-ui-components/react` (keyboard/ARIA/focus)
- **Class composition**: `cn()` from `@aplo/ui` (clsx + tailwind-merge)
- **Variant system**: CVA (`class-variance-authority`)
- **Motion**: `useMotion()` hook — all animations are opt-in

---

## Before Generating UI

1. Check `packages/ui/src/components/` for an existing component that covers the need.
2. Check `design-system/03-components.md` for documented props and usage.
3. Check `design-system/04-layout-patterns.md` for matching page/section patterns.
4. Only write custom markup if no matching component or layout exists.

---

## Component Priority Order

1. **Use existing `@aplo/ui` component** — always first choice.
2. **Compose existing components** — wrap or combine existing ones before creating new.
3. **Write Tailwind + Base UI** — if a new headless primitive is needed, follow Base UI pattern.
4. **Write plain Tailwind HTML** — only for layout containers, typography, and purely presentational elements.

---

## Rules

### Imports
- Import components from `@aplo/ui`: `import { Button, Input, Select } from '@aplo/ui'`
- Import icons from `lucide-react` only. No other icon libraries.
- Import `cn` from `@aplo/ui` for class merging.
- Import `useMotion` from `@aplo/ui` when writing animated components.

### Color
- Use Tailwind semantic classes only: `bg-primary`, `text-foreground`, `border-border`, `bg-card`, `bg-muted`, `text-muted-foreground`, `text-destructive`.
- Do not use arbitrary color values (`text-[#006B69]`, `bg-[hsl(...)]`).
- Do not write `dark:` overrides for semantic tokens — they auto-switch via CSS vars.
- Only write `dark:` overrides for aplo palette values (e.g. `dark:text-aplo-300`) when matching an established pattern in the codebase.

### Styling
- Do not use inline `style={{ color, backgroundColor, padding, margin }}`.
- Do not use `className="..."` with hardcoded hex colors.
- Do not use `shadow-lg` or `shadow-xl` on cards or interactive elements.
- Do not use `rounded-xl`, `rounded-2xl`, or `rounded-3xl`.
- Always merge classes with `cn()` — never concatenate strings manually.

### Form Fields
- Always use `Input` for text inputs. Never write raw `<input>` with manual label/error.
- Always use `Select` for dropdowns. Never write raw `<select>`.
- Always use `Checkbox`, `Switch`, or `Radio` for toggles. Never write raw `<input type="checkbox/radio">`.
- The `error`, `description`, and `label` props handle all field feedback — do not add extra elements around them.

### Buttons
- Always use `Button`. Never write raw `<button className="...">`.
- Use `loading` prop for async states. Do not manually disable + add a spinner.
- Use `asChild` when the button must render as a router `<Link>`.
- Use `size="icon"` or `size="icon-sm"` for icon-only buttons. Always add `aria-label`.

### Motion / Animation
- Never add CSS `transition` or `animation` directly to elements without gating on `useMotion()`.
- Never use `framer-motion` or other animation libraries — the system uses canvas-based effects and CSS transitions only.
- Gate all transitions: `cn(motionEnabled && 'transition-colors duration-200')`.

### Layout
- Always use `Container` for page-level horizontal constraints.
- Always use `AploProvider` at the app root.
- Place `Navbar` before the main content flex row.
- Place `Sidebar` as the first child in the flex row (before `<main>`).

### Accessibility
- Always provide `aria-label` for icon-only buttons.
- Never remove `focus-visible` ring classes from interactive elements.
- Use semantic HTML: `<header>`, `<main>`, `<aside>`, `<section>`, `<nav>`.
- Form inputs must always have a `label` prop or a visually associated `<label>`.

---

## When No Matching Component Exists

1. Check if a Base UI primitive covers the headless behavior. If yes, use it and layer Tailwind on top following the existing component patterns in `packages/ui/src/components/`.
2. Match border radius, color, and focus ring exactly to existing components.
3. Mirror the `forwardRef` + `cn()` + `useMotion()` pattern.
4. Do not invent new design tokens or color values.

---

## Composition Over Customization

- Prefer composing `Button + Input + Select` into a new form over writing a custom styled form.
- Prefer wrapping `RadioCard` in a grid over writing a custom card-selector.
- Prefer `Sidebar` + nav items over a custom navigation panel.
- Do not extend component props with new variants — add `className` overrides via `cn()` for one-off tweaks.

---

## Do Not

- Do not use shadcn CLI or shadcn component patterns (this system uses Base UI, not Radix directly).
- Do not install new UI libraries without checking the existing system first.
- Do not add `framer-motion`, `react-spring`, or animation libraries.
- Do not write `useEffect` for theme switching — use `ThemeProvider` / `useTheme()`.
- Do not write custom focus management — Base UI handles it.
- Do not create component files outside `packages/ui/src/components/`.
- Do not import from `packages/ui/src/` directly in `apps/docs/` — use `@aplo/ui`.
