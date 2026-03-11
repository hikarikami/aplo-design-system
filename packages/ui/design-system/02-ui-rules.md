# Aplo Design System — UI Rules

Rules for AI agents generating UI with this design system.

---

## Spacing

- **Always** use Tailwind spacing utilities. Never use inline `style={{ margin/padding }}`.
- **Prefer** `gap-2` to `gap-4` for dense UI (toolbars, icon rows). Use `gap-4` to `gap-6` for form fields.
- **Prefer** `space-y-1.5` between a label and its input (matches Input and Select components).
- **Avoid** margins on individual input/button elements — use `gap` on their parent container.
- Form sections: `space-y-4` or `space-y-6`. Between sections: `gap-8` or more.

## Layout Density

- **Prefer** compact layouts. Default height for inputs/buttons is `h-10`. Use `h-9` (`sm`) for sidebar forms and secondary interfaces.
- **Avoid** full-height, maximally spaced layouts unless the interface is intentionally minimal (e.g. marketing).
- **Always** use `Container` (`mx-auto max-w-page px-6`) for page-level horizontal constraints.
- Max content width: `77.5rem` (1240px) via `max-w-page`.

## Border Radius

- Interactive elements (buttons, inputs, selects, checkboxes): `rounded-md` (4px).
- Cards, panels, dropzones, radio cards: `rounded-lg` (6px).
- Switches and radio indicators: `rounded-full`.
- **Avoid** `rounded-xl` or `rounded-2xl` — not in the system.
- **Avoid** sharp edges (`rounded-none`) on interactive elements.

## Shadows

- **Avoid** `shadow-md` or `shadow-lg` on buttons and form controls.
- `shadow-sm` is used on Switch thumb only.
- Select popup uses `shadow-md` — this is the only elevated surface using a shadow.
- Focus glow on inputs/selects: `shadow-[0_0_0_3px_hsl(179_100%_21%/0.12)]` — use this exact pattern.
- **Do not** use box shadows for elevation. Use `bg-secondary` or `border-border` for card depth.

## Cards and Containers

- Card background: `bg-card` (not `bg-background`).
- Card border: `border border-border`.
- Card radius: `rounded-lg`.
- **Prefer** `bg-card text-card-foreground` for content panels.
- **Avoid** nesting cards inside cards.
- `bg-muted` for secondary/subdued surfaces (upload zones, image placeholders, inactive radio card thumbnails).

## Buttons

- **Always** use the `Button` component. Never write raw `<button>` with manual styling.
- Default action: `variant="primary"` (`bg-primary text-primary-foreground`).
- Secondary / cancel: `variant="secondary"`.
- Destructive / delete: `variant="destructive"`.
- Borderline actions (filter, toggle): `variant="outline"` or `variant="ghost"`.
- Text links: `variant="link"` (no background, underline on hover).
- Icon-only buttons: `size="icon"` (40×40px) or `size="icon-sm"` (32×32px).
- **Avoid** mixing multiple `primary` buttons in one view. Use one primary CTA per section.
- **Always** pass `loading={true}` (not a custom spinner) for async button states.

## Form Layout

- **Always** group label + input + description + error using the `Input` or `Select` component. Do not build custom labeled inputs.
- **Prefer** single-column forms. Use two-column only for fields that are naturally paired (e.g. first name / last name).
- Form actions (submit/cancel): right-aligned row at the bottom, using `flex justify-end gap-3`.
- Validation errors: shown inline below the relevant field via the `error` prop. Never use toasts for field-level validation.
- `description` prop: use for static helper text (shown when no error). Avoid showing both description and error simultaneously (Input handles this automatically).

## Typography

- Font: Lato. Do not import or use other fonts.
- Heading sizes: `text-4xl font-bold` (page title), `text-2xl font-bold`, `text-xl font-semibold`, `text-lg font-semibold`.
- Body: `text-sm` (default), `text-xs` (secondary/meta).
- Eyebrow labels: `text-xs font-semibold uppercase tracking-widest text-muted-foreground`.
- **Avoid** `font-light` or weights below 400.
- **Avoid** centered body text in forms or data-heavy interfaces. Center only in hero/empty state contexts.
- Link color: `text-primary dark:text-aplo-300`. Use `variant="link"` Button for inline actions.

## Empty States

- **Always** include an icon, a short label, and optional description.
- Container: `flex flex-col items-center justify-center gap-4 py-16 text-center`.
- Icon: use a relevant lucide-react icon at `size-10`, wrapped in `rounded-full p-3 bg-secondary text-muted-foreground`.
- Label: `text-sm font-medium text-foreground`.
- Description: `text-sm text-muted-foreground max-w-xs`.
- CTA (optional): `Button variant="primary" size="sm"`.

## Icon Usage

- **Always** use lucide-react icons. Do not import from other icon sets.
- Default icon size: `size-4` (16px). Use `size-5` for medium emphasis, `size-6` for empty states.
- Icons inside Button: passed as children — the Button applies `[&_svg]:size-4 [&_svg]:shrink-0` automatically.
- Prefix/suffix icons in Input: pass via `prefixIcon`/`suffixIcon` props.
- **Avoid** using icons without accessible context (label, aria-label, or sr-only text).

## Interaction States

- Focus: `focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background`. Applied by Base UI automatically on managed components.
- Hover: `hover:bg-secondary` for ghost/neutral. `hover:bg-primary/90` for primary buttons (handled by variants).
- Disabled: `opacity-50` (Base UI: `data-disabled:opacity-50`) or `opacity-40` (native: `disabled:opacity-40`). Never hide disabled elements.
- Loading: use `loading={true}` on `Button`. Never disable a button's visibility during loading.
- **Avoid** color-only interaction feedback. Pair color change with opacity or border change.

## Motion

- **Always** gate animation on `useMotion()`. Import from `@aplo/ui`.
- Apply transition classes conditionally: `cn(motionEnabled && 'transition-colors duration-200')`.
- **Never** hardcode CSS transitions on elements that should respect `prefers-reduced-motion`.
- Default durations: `duration-150` (fast: hover/indicator), `duration-200` (standard: border/color), `duration-300` (slow: fade/canvas).

## Color Usage

- **Do not** use inline `style={{ color, backgroundColor }}`. Use Tailwind utilities only.
- **Do not** use arbitrary color values like `text-[#006B69]`. Use semantic tokens: `text-primary`, `bg-muted`, `border-border`.
- Dark mode colors are handled automatically by CSS vars. Do not write `dark:` overrides for semantic colors.
- Write `dark:` overrides only for palette-specific values (e.g. `dark:border-aplo-400 dark:text-aplo-300` as seen in `outline` button variant).
