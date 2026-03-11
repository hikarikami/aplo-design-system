# Aplo Design System — Component Reference

Source: `packages/ui/src/components/`

---

## Button

**Source**: `packages/ui/src/components/button/button.tsx`

The primary action primitive. Wraps a native `<button>` with CVA variants, an optional ripple effect, and loading state. No Base UI dependency.

### Props
| Prop | Type | Default | Notes |
|------|------|---------|-------|
| `variant` | `primary \| secondary \| outline \| ghost \| destructive \| link` | `primary` | |
| `size` | `sm \| default \| lg \| xl \| icon \| icon-sm` | `default` | |
| `loading` | `boolean` | `false` | Disables + shows spinner |
| `asChild` | `boolean` | `false` | Clones single child, merges className |
| `disabled` | native | — | Applies `opacity-40 cursor-not-allowed` |

### Variants
- `primary` — teal bg, white text. Main CTA.
- `secondary` — muted bg, foreground text. Secondary actions.
- `outline` — transparent bg, teal border+text. Tertiary actions.
- `ghost` — transparent bg, foreground text. Inline/toolbar actions.
- `destructive` — red bg, white text. Delete/irreversible actions.
- `link` — transparent, underline on hover, no padding. Inline text links.

### Sizes
- `sm` — h-8, px-3, text-xs
- `default` — h-10, px-5, text-sm
- `lg` — h-12, px-7, text-base
- `xl` — h-14, px-9, font-semibold tracking-wider
- `icon` — 40×40px, no horizontal padding
- `icon-sm` — 32×32px, no horizontal padding

### Notes
- Ripple effect fires on click (skipped if `variant="link"` or motion disabled).
- Use `asChild` when wrapping a `<Link>` from a router.
- Icons passed as children auto-size to 16px (`[&_svg]:size-4`).
- Only one `primary` button per visual section.

---

## Switch

**Source**: `packages/ui/src/components/switch/switch.tsx`

A toggle control. Uses Base UI `Switch.Root` + `Switch.Thumb`. Renders a `<span>` with a hidden `<input type="checkbox">`.

### Props
| Prop | Type | Default |
|------|------|---------|
| `checked` | `boolean` | — |
| `defaultChecked` | `boolean` | — |
| `onCheckedChange` | `(checked: boolean) => void` | — |
| `disabled` | `boolean` | — |
| `size` | `sm \| default` | `default` |
| `id`, `name`, `required`, `readOnly` | native | — |

### States
- Unchecked: `bg-muted` track
- Checked: `bg-primary` track, thumb translated right
- Disabled: `data-disabled:opacity-50 cursor-not-allowed`

### Composition
Pair with a `<label>` or `<Label>` component — the Switch itself renders no label text.

---

## Checkbox

**Source**: `packages/ui/src/components/checkbox/checkbox.tsx`

Uses Base UI `Checkbox.Root` + `Checkbox.Indicator`. Supports three visual states: unchecked, checked (animated draw-in tick), and indeterminate (dash).

### Props
| Prop | Type | Default |
|------|------|---------|
| `checked` | `boolean` | — |
| `defaultChecked` | `boolean` | — |
| `onCheckedChange` | `(checked: boolean) => void` | — |
| `indeterminate` | `boolean` | `false` |
| `disabled` | `boolean` | — |
| `size` | `sm \| default \| lg` | `default` |
| `id`, `name`, `value`, `required`, `readOnly` | native | — |

### Sizes
- `sm` — 16×16px box, 10px tick
- `default` — 20×20px box, 12px tick
- `lg` — 24×24px box, 14px tick

### States
- Unchecked: `border-border bg-background`
- Checked: `bg-primary border-primary` + animated SVG tick stroke-dashoffset
- Indeterminate: `bg-primary border-primary` + horizontal dash
- Hover: `hover:border-primary/60`
- Disabled: `data-disabled:opacity-50`

### Notes
- The tick animation uses `strokeDasharray/strokeDashoffset` (conditional on motion).
- `indeterminate` prop overrides `checked` visually.

---

## Input

**Source**: `packages/ui/src/components/input/input.tsx`

A labeled text input. Uses Base UI `Field.Root`, `Field.Label`, `Field.Description`, `Field.Error`, and `Input`. Includes floating label, focus glow, prefix/suffix icons, character countdown, and error display.

### Props
| Prop | Type | Default |
|------|------|---------|
| `label` | `string` | — |
| `description` | `string` | — |
| `error` | `string` | — |
| `prefixIcon` | `ReactNode` | — |
| `suffixIcon` | `ReactNode` | — |
| `size` | `sm \| default \| lg` | `default` |
| `containerClassName` | `string` | — |
| + all native `<input>` props | | |

### States
- Default: `border-border`
- Focused: `border-primary` + teal glow ring
- Error: `border-destructive` (glow suppressed)
- Disabled: `opacity-50 pointer-events-none`

### Character Countdown
- Appears in the suffix area when `maxLength` is set.
- Color: default → amber at 90% → destructive at 100%.
- Auto-hides when `error` prop is shown.

### Description vs Error
- `description` is shown when there is no `error`.
- `error` shows a warning icon + message and replaces `description`.

### Notes
- Do not build raw `<input>` with label/error manually — use this component.
- `containerClassName` applies to the `Field.Root` wrapper.
- `prefixIcon` and `suffixIcon` accept any ReactNode; lucide-react icons are standard.

---

## Select

**Source**: `packages/ui/src/components/select/select.tsx`

A dropdown selector. Uses Base UI `Select.*` primitives. Matches `Input` sizing and styling exactly. Supports label, description, and error — same API as Input.

### Components
- `Select` — root/trigger wrapper
- `SelectItem` — individual option (checkmark when selected)
- `SelectGroup` — group with optional header label

### Select Props
| Prop | Type | Default |
|------|------|---------|
| `label` | `string` | — |
| `description` | `string` | — |
| `error` | `string` | — |
| `placeholder` | `string` | — |
| `size` | `sm \| default \| lg` | `default` |
| `value`, `defaultValue` | `string` | — |
| `onValueChange` | `(value: string \| null) => void` | — |
| `open`, `defaultOpen`, `onOpenChange` | | — |
| `disabled`, `required`, `name` | | — |

### Popup Behavior
- Popup width matches trigger width (`w-(--anchor-width)`).
- Animates in/out with opacity + Y translate (motion-gated).
- `modal={false}` — no backdrop.

### Usage Pattern
```tsx
<Select label="Status" placeholder="Select status" value={val} onValueChange={setVal}>
  <SelectItem value="active">Active</SelectItem>
  <SelectItem value="inactive">Inactive</SelectItem>
</Select>
```

---

## Radio / RadioCard

**Source**: `packages/ui/src/components/radio/radio.tsx`

Three exports: `RadioGroup`, `Radio`, `RadioCard`. Uses Base UI `RadioGroup`, `Radio.Root`, `Radio.Indicator`.

### RadioGroup Props
| Prop | Type | Default |
|------|------|---------|
| `value`, `defaultValue` | `string` | — |
| `onValueChange` | `(value: string) => void` | — |
| `orientation` | `horizontal \| vertical` | `vertical` |
| `disabled`, `readOnly`, `required`, `name` | | — |

### Radio Props
| Prop | Type | Default |
|------|------|---------|
| `value` | `string` | required |
| `size` | `sm \| default` | `default` |
| `indicator` | `dot \| check` | `dot` |
| `disabled` | `boolean` | — |
| `children` | `ReactNode` | label text |

### RadioCard Props
| Prop | Type | Notes |
|------|------|-------|
| `value` | `string` | required |
| `title` | `string` | primary label |
| `description` | `string` | secondary text |
| `image` | `string` | URL for thumbnail |
| `startContent` | `ReactNode` | replaces image |
| `layout` | `list \| card` | `list` |
| `disabled` | `boolean` | |

### RadioCard States
- Default: `border-border bg-card`
- Hover: `hover:border-muted-foreground/50`
- Selected: `data-checked:border-primary data-checked:bg-secondary/40`
- Disabled: `data-disabled:opacity-50`

### When to Use
- `Radio` — simple lists of choices with a label.
- `RadioCard` in `list` layout — option lists with description/thumbnail.
- `RadioCard` in `card` layout — grid-style option cards (settings, plan selection).

---

## Sidebar

**Source**: `packages/ui/src/components/sidebar/sidebar.tsx`

A collapsible `<aside>` navigation panel. Uses Base UI `Collapsible.Root` + `Collapsible.Trigger` for state and ARIA. Animates width between `w-64` (open) and `w-10` (collapsed).

### Props
| Prop | Type | Default |
|------|------|---------|
| `defaultOpen` | `boolean` | — |
| `children` | `ReactNode` | nav content |
| `className` | `string` | — |

### Layout Behavior
- `sticky top-14 h-[calc(100vh-3.5rem)]` — sticks below 56px navbar.
- Width transition: `transition-[width] duration-300 ease-in-out-expo`.
- Content fades out when collapsed (`opacity-0 pointer-events-none aria-hidden`).
- Text does not reflow — content wrapper is always `w-64`, clipped by overflow-hidden parent.

### Notes
- Place directly inside a flex/grid layout with the main content area.
- Children are the nav items/sections (user-supplied).

---

## FileUpload (Upload)

**Source**: `packages/ui/src/components/upload/upload.tsx`

A drag/drop/paste/click file upload zone. No Base UI dependency (hand-rolled). Marching-ants SVG border animation on drag-over.

### Props
| Prop | Type | Default |
|------|------|---------|
| `onFileSelect` | `(file: File) => void` | — |
| `accept` | `string[]` | `['image/jpeg','image/png','image/webp']` |
| `maxSizeMb` | `number` | `10` |
| `label` | `string` | `'Drop, paste, or click to browse'` |
| `hint` | `string` | auto-generated from `accept` + `maxSizeMb` |
| `error` | `string` | — |

### States
- Default: `bg-muted/40 hover:bg-muted/70`, static dashed border
- Drag-over / hover: `bg-primary/5`, `stroke-primary animate-march` dashed border
- Error: `text-sm text-destructive` below the zone

### Supported Interactions
- Click: opens system file picker
- Keyboard: Enter/Space opens picker
- Drag-and-drop: validated on drop
- Paste: intercepts clipboard image paste globally

### Validation
Internal validation fires before `onFileSelect`. Sets internal error if file type is not in `accept` or size exceeds `maxSizeMb`. Pass `error` prop for external validation errors.

---

## Navbar

**Source**: `packages/ui/src/components/navbar/navbar.tsx`

A sticky top navigation bar. `<header>` element with `bg-background/60 backdrop-blur-md`. Uses `Container` internally.

### Props
| Prop | Type | Notes |
|------|------|-------|
| `left` | `ReactNode` | logo/nav links |
| `right` | `ReactNode` | actions/avatar |
| `children` | `ReactNode` | fallback for `right` |

### Layout
- Height: `h-14` (56px)
- Left slot: `flex items-center gap-6`
- Right slot: `flex items-center gap-2`
- `z-50 sticky top-0` — always above page content

### Notes
- Sidebar uses `sticky top-14` to align below this navbar.
- Do not put form elements or heavy content in the Navbar.

---

## Container

**Source**: `packages/ui/src/components/container/container.tsx`

A layout wrapper that constrains width and adds horizontal padding. Polymorphic via `as` prop.

### Props
| Prop | Type | Default |
|------|------|---------|
| `as` | `React.ElementType` | `'div'` |

### Classes
`mx-auto w-full max-w-page px-6` — max-width: 77.5rem (1240px), 24px padding each side.

### Notes
- Use as the direct child of `<main>`, `<section>`, or `<header>` to constrain content.
- Navbar uses it internally — do not wrap Navbar content in another Container.

---

## Hero

**Source**: `packages/ui/src/components/hero/hero.tsx`

A section wrapper with optional interactive particle globe background. Intended for landing page hero sections.

### Props
| Prop | Type | Default |
|------|------|---------|
| `backgroundEffect` | `'none' \| 'stipple-follow'` | `'none'` |
| `globeShadowAngle` | `number` | — |
| `globeShadowStrength` | `number` | `0.75` |
| `children` | `ReactNode` | — |

### Notes
- `'stipple-follow'` renders 60,000 teal particles into an `<canvas>` that responds to mouse movement.
- The canvas is `aria-hidden="true"` and degrades gracefully when motion is disabled (static render).
- Use only once per page. Do not use inside a card or constrained container.
- Children are positioned `relative z-10` above the canvas.

---

## Stack

**Source**: `packages/ui/src/components/stack/stack.tsx`

A layout primitive that creates a CSS stacking context (`isolation: isolate`). Use to scope z-index inside a visual section.

### Props
| Prop | Type | Default |
|------|------|---------|
| `as` | `React.ElementType` | `'div'` |

### Notes
- Use Stack when layering overlapping sections (e.g., a hero followed by a features section) to prevent z-index bleed.
- Does not affect visual layout — add Tailwind classes for flex/grid/padding.

---

## PageHeader

**Source**: `packages/ui/src/components/page-header/page-header.tsx`

A semantic `<header>` with eyebrow + title + description. For page-level headings.

### Props
| Prop | Type | Notes |
|------|------|-------|
| `title` | `string` | required. `<h1>`, `text-4xl font-bold` |
| `description` | `ReactNode` | optional. `text-muted-foreground max-w-xl` |
| `eyebrow` | `string` | optional. `text-xs uppercase tracking-widest text-muted-foreground` |

### Notes
- One per page. Use inside a `Container`.
- Title is always `<h1>`. Do not add another `<h1>` on the same page.

---

## Label

**Source**: `packages/ui/src/components/label/label.tsx`

A styled `<label>` wrapper. Used internally by Input and Select. Exposed for manual form layouts.

### Props
| Prop | Type | Default |
|------|------|---------|
| `size` | `sm \| default \| lg` | `default` |
| + all native `<label>` props | | |

### Classes
`block font-medium text-foreground text-sm` (`text-xs` for sm).

---

## LottieIcon

**Source**: `packages/ui/src/components/lottie-icon/lottie-icon.tsx`

Renders a Lottie animation. Supports both `.lottie` binary files (via `src`) and JSON animation data (via `animationData`).

### Props
| Prop | Type | Default |
|------|------|---------|
| `src` | `string` | — URL to `.lottie` file |
| `animationData` | `object` | — JSON animation |
| `size` | `number` | — width + height in px |
| `speed` | `number` | — playback speed multiplier |
| `loop` | `boolean` | — |
| `autoplay` | `boolean` | — |

### Notes
- Pass `src` for binary `.lottie`, `animationData` for JSON. Do not pass both.
- Size is set via inline style (only case where inline style is used in this system).

---

## Common Patterns

### Form Field (Input + Label + Error)
```tsx
<Input
  label="Email address"
  description="We'll never share your email."
  error={errors.email?.message}
  {...register('email')}
/>
```

### Action Row
```tsx
<div className="flex justify-end gap-3">
  <Button variant="secondary">Cancel</Button>
  <Button variant="primary" loading={isSubmitting}>Save changes</Button>
</div>
```

### Destructive Confirmation
```tsx
<Button variant="destructive" onClick={handleDelete}>Delete account</Button>
```

### Icon Button
```tsx
<Button size="icon" variant="ghost" aria-label="Settings">
  <Settings />
</Button>
```

### Checkbox + Label
```tsx
<label className="flex items-center gap-2 cursor-pointer">
  <Checkbox checked={checked} onCheckedChange={setChecked} />
  <span className="text-sm text-foreground">Remember me</span>
</label>
```

### RadioGroup with Cards
```tsx
<RadioGroup value={plan} onValueChange={setPlan}>
  <RadioCard value="starter" title="Starter" description="For individuals" layout="card" />
  <RadioCard value="pro" title="Pro" description="For teams" layout="card" />
</RadioGroup>
```

---

## Component Relationships

- `Navbar` uses `Container` internally.
- `Input` and `Select` share identical label/description/error API and size tokens.
- `Button` is used inside `FileUpload` ("Choose file" trigger).
- `Sidebar` is designed to sit alongside a `<main>` inside a flex layout below a `Navbar`.
- `PageHeader` sits inside a `Container` at the top of `<main>`.
- `Stack` wraps `Hero` and other page sections to manage stacking context.
- `AploProvider` wraps `ThemeProvider` + `MotionProvider` — required at app root.

---

## Inferred Missing Components

These components are not present but are clearly implied by the existing system:

- **Toast/Notification** — no alert/notification component exists. (Inferred: would use `bg-card border-border` with teal/destructive variants.)
- **Dialog/Modal** — no dialog component. (Inferred: would use Base UI `Dialog.*` with `backdrop-blur-sm` overlay.)
- **Tabs** — no tab component. (Inferred: would use Base UI `Tabs.*`.)
- **Table** — no data table. (Inferred: would use `bg-card` rows with `border-border` dividers.)
- **Badge/Tag** — no badge component. (Inferred: `rounded-full px-2 py-0.5 text-xs font-medium`.)
- **Tooltip** — no tooltip. (Inferred: would use Base UI `Tooltip.*`.)
- **Skeleton** — no loading skeleton. (Inferred: `bg-muted animate-pulse rounded-md`.)
