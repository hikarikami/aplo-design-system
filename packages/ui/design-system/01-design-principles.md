# Aplo Design System — Design Principles

## Purpose

The Aplo design system (`@aplo/ui`) is a shared component library for internal Aplo-built products. It is not a general-purpose UI kit and is not intended for public consumption without adaptation.

## Intended Use Cases

- Figma plugins
- Micro apps and internal tools
- AI-assisted prototypes
- Lightweight B2B interfaces built by or for Aplo

## Design Principles

### 1. Minimalist and Functional
No decorative elements unless they serve a functional purpose. The stipple globe and particle effects in `Hero` are intentional brand moments — not a general UI pattern.

### 2. Dark-First
Default theme is dark. `ThemeProvider` reads from `localStorage['aplo-theme']` and defaults to `'dark'`. Light mode is fully supported via CSS variable overrides but dark is the primary design target.

### 3. Teal Accent, Neutral Everything Else
One interactive accent color (`hsl(179 100% 21%)` / `#006B69`). All other colors are neutrals. Do not introduce additional accent colors.

### 4. Motion is Optional
All animations are gated on `useMotion()`. The `MotionProvider` respects `prefers-reduced-motion` and allows user override. Every component must work correctly with motion disabled.

### 5. Accessibility First
All interactive components use Base UI headless primitives (`@base-ui-components/react`) for keyboard navigation, ARIA roles, and focus management. Custom styling is layered on top — never at the cost of accessibility.

### 6. Compact, Production-Friendly UI
Layouts are information-dense but not cluttered. Minimal radius (`rounded-md` = 4px, `rounded-lg` = 6px). No drop shadows on interactive elements. Use `bg-secondary` for hover states, not box-shadows.

## Accessibility Expectations

- All form inputs use Base UI `Field.Root` with proper `Field.Label`, `Field.Error`, and `Field.Description`.
- All toggles (Switch, Checkbox, Radio) have visible focus rings via `focus-visible:ring-2 focus-visible:ring-ring`.
- Disabled states use `data-disabled:opacity-50` (Base UI components) or `disabled:opacity-40` (native HTML).
- Keyboard interactions (Enter/Space) are handled by Base UI or explicitly coded (see Upload component).
- `aria-hidden="true"` on all decorative canvas elements.

## Preferred UI Tone

Corporate, clean, professional. Interfaces are tools — they should be fast to scan, easy to operate, and visually quiet. Reserve emphasis for primary actions and error states only.
