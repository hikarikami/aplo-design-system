# Changelog

All notable changes to `@aplo/ui` are documented here.

Format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).
Versions follow [Semantic Versioning](https://semver.org/).

---

## [0.1.1] – 2026-03-05

### Added
- **Input** — Base UI `Field`-wired text input. Label above field, teal border + glow ring on focus, prefix/suffix icon slots, character countdown (amber → red near limit), description and error states with warning icon. Sizes: `sm`, `default`, `lg`.
- **Select** — Base UI `Select`-wired dropdown. Trigger matches `Input` sizing exactly. Popup opens with fade + slide animation (`data-starting-style` / `data-ending-style`). Chevron rotates on open. Teal checkmark on selected item. Supports `SelectGroup` with optional group labels. Sizes: `sm`, `default`, `lg`.

### Fixed
- **Select** — Page scrollbar no longer jumps when the popup opens. Root cause was `alignItemWithTrigger={true}` (the Base UI default) activating a body scroll lock; disabled with `alignItemWithTrigger={false}` on the Positioner.
- **Select** — Checkmark icon no longer renders on every item. Removed `keepMounted` from `ItemIndicator` so it only mounts when the item is actually selected.

### Changed
- Monorepo `dev` script now runs `@aplo/ui` (`vite build --watch`) and `aplo-docs` (`vite`) in parallel via `pnpm -r --parallel run dev`. Previously only the docs app was started.

---

## [0.1.0] – initial release

### Added
- **Button** — 6 variants (`default`, `secondary`, `outline`, `ghost`, `destructive`, `link`), 6 sizes (`sm`, `default`, `lg`, `xl`, `icon`, `icon-sm`). Stipple-ripple canvas animation on click, motion-gated. Loading spinner state.
- **Switch** — Base UI `Switch.Root` + `Switch.Thumb`. Sizes: `sm`, `default`.
- **Checkbox** — Base UI `Checkbox.Root` + `Checkbox.Indicator`. Draw-in SVG tick animation, indeterminate dash state. Sizes: `sm`, `default`, `lg`.
- **Radio** / **RadioGroup** / **RadioCard** — Base UI `Radio` + `RadioGroup`. Dot and check indicator variants. Card layout supports list and card orientations with optional thumbnail/image slot.
- **Sidebar** — Base UI `Collapsible.Root` + `Collapsible.Trigger` for state and ARIA. Width-transition animation between expanded and collapsed states.
- **Upload** — Hand-rolled (no Base UI equivalent). Drag-and-drop, click-to-browse, paste from clipboard. Marching-ants dashed border animation during drag-over.
- **Navbar** — Top navigation bar with left/right slot props.
- **Container** — Max-width page wrapper with responsive horizontal padding.
- **Hero** — Full-width hero section layout component.
- **Stack** — Vertical/horizontal flex stack with configurable gap.
- **PageHeader** — Section heading with title and description slot.
- **LottieIcon** — Wrapper around `@lottiefiles/dotlottie-react` with consistent sizing.
- **ThemeProvider** / `useTheme` — Toggles `.dark` class on `<html>`. Persists to `localStorage`.
- **MotionProvider** / `useMotion` — Respects `prefers-reduced-motion`. Persists override to `localStorage`.
- `cn()` utility — `clsx` + `tailwind-merge` helper.
- Tailwind v4 CSS-first theme in `globals.css` — semantic tokens, `aplo` dark-surface scale, `brand` on-teal scale, `@custom-variant dark`.

---

<!-- ─────────────────────────────────────────────────────────────────────────
  HOW TO UPDATE THIS FILE
  ────────────────────────────────────────────────────────────────────────────
  Before publishing a new version to npm:

  1. Add a new section at the top (below this comment block):

     ## [x.y.z] – YYYY-MM-DD

  2. Group changes under these headings (omit any that are empty):

     ### Added      – new components, props, or features
     ### Changed    – changes to existing behaviour or API
     ### Deprecated – features that will be removed in a future version
     ### Removed    – features that have been removed
     ### Fixed      – bug fixes
     ### Security   – security patches

  3. Bump the version in packages/ui/package.json to match.

  4. Publish:
     pnpm build:ui
     cd packages/ui && npm publish --access public
────────────────────────────────────────────────────────────────────────── -->
