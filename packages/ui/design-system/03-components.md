# Aplo Design System — Component Reference

Source: `packages/ui/src/components/`
Import everything from `@aplo/ui`.

---

## Button

**Source**: `packages/ui/src/components/button/button.tsx`

The primary action primitive. Native `<button>` with CVA variants, optional stipple ripple, and loading spinner. No Base UI dependency.

### Props
<!-- PROPS:Button -->
| Prop | Type | Default |
| ------ | ------ | --------- |
| `variant` | `'primary' \| 'secondary' \| 'outline' \| 'ghost' \| 'destructive' \| 'link'` | `'primary'` |
| `size` | `'sm' \| 'default' \| 'lg' \| 'xl' \| 'icon' \| 'icon-sm'` | `'default'` |
| `loading` | `boolean` | `false` |
| `asChild` | `boolean` | `false` |
| `disabled` | `boolean` | — |
<!-- /PROPS:Button -->

### Variants
- `primary` — `bg-primary text-primary-foreground`. Main CTA. One per visual section.
- `secondary` — `bg-secondary text-secondary-foreground`. Supporting actions.
- `outline` — `border-primary text-primary bg-transparent`. Tertiary; teal border.
- `ghost` — `bg-transparent text-foreground`. Toolbar/inline actions.
- `destructive` — `bg-destructive text-destructive-foreground`. Irreversible actions only.
- `link` — `text-primary underline-offset-4 hover:underline p-0 h-auto`. Inline text links.

### Sizes
- `sm` — `h-8 px-3 text-xs`
- `default` — `h-10 px-5 text-sm`
- `lg` — `h-12 px-7 text-base`
- `xl` — `h-14 px-9 text-base font-semibold tracking-wider`
- `icon` — 40×40px square, no horizontal padding
- `icon-sm` — 32×32px square, no horizontal padding

### Usage
```tsx
// Primary CTA
<Button>Save changes</Button>

// Loading state
<Button loading={isSubmitting}>Submit</Button>

// As router link
<Button asChild variant="outline">
  <Link to="/dashboard">Go to dashboard</Link>
</Button>

// Icon-only (always add aria-label)
<Button size="icon" variant="ghost" aria-label="Settings">
  <Settings />
</Button>

// Destructive
<Button variant="destructive" onClick={handleDelete}>Delete account</Button>
```

### Gotchas
- Ripple fires on click and is skipped automatically when `variant="link"` or motion is disabled — no manual gating needed.
- SVG children auto-size to 16px via `[&_svg]:size-4` — do not set `className="size-5"` on icons.
- `asChild` renders the child element directly — pass exactly one child, not a fragment.
- `loading` both disables the button and replaces content with a spinner — do not also set `disabled`.

---

## Switch

**Source**: `packages/ui/src/components/switch/switch.tsx`

A toggle control. Uses Base UI `Switch.Root` + `Switch.Thumb`. Renders a `<span>` with a hidden `<input type="checkbox">` — not a `<button>`.

### Props
<!-- PROPS:Switch -->
| Prop | Type | Default |
| ------ | ------ | --------- |
| `checked` | `boolean` | — |
| `defaultChecked` | `boolean` | — |
| `onCheckedChange` | `(checked: boolean) => void` | — |
| `disabled` | `boolean` | — |
| `readOnly` | `boolean` | — |
| `required` | `boolean` | — |
| `size` | `'sm' \| 'default'` | `'default'` |
| `className` | `string` | — |
<!-- /PROPS:Switch -->

### Sizes
- `sm` — `h-4 w-7` track, `size-3` thumb
- `default` — `h-5 w-9` track, `size-4` thumb

### Usage
```tsx
// Controlled
const [enabled, setEnabled] = useState(false)
<label className="flex items-center gap-2 cursor-pointer select-none">
  <span className="text-sm text-foreground">Enable notifications</span>
  <Switch checked={enabled} onCheckedChange={setEnabled} />
</label>

// Motion toggle pattern (used in this codebase)
const { motionEnabled, setMotionEnabled } = useMotion()
<Switch
  size="sm"
  checked={motionEnabled}
  onCheckedChange={setMotionEnabled}
  aria-label="Toggle animations"
/>
```

### Gotchas
- Renders a `<span>`, not a `<button>` — `ref` type is `HTMLElement`, not `HTMLButtonElement`.
- Switch renders no label text — always pair with a `<label>` or `aria-label`.
- `onCheckedChange` receives the new boolean directly, not an event.

---

## Checkbox

**Source**: `packages/ui/src/components/checkbox/checkbox.tsx`

Uses Base UI `Checkbox.Root` + `Checkbox.Indicator`. Three states: unchecked, checked (animated SVG tick), indeterminate (dash).

### Props
<!-- PROPS:Checkbox -->
| Prop | Type | Default |
| ------ | ------ | --------- |
| `checked` | `boolean` | — |
| `defaultChecked` | `boolean` | — |
| `onCheckedChange` | `(checked: boolean) => void` | — |
| `indeterminate` | `boolean` | `false` |
| `disabled` | `boolean` | — |
| `size` | `'sm' \| 'default' \| 'lg'` | `'default'` |
| `className` | `string` | — |
<!-- /PROPS:Checkbox -->

### Sizes
- `sm` — 16×16px box, 10px tick stroke
- `default` — 20×20px box, 12px tick stroke
- `lg` — 24×24px box, 14px tick stroke

### Usage
```tsx
// Basic
<label className="flex items-center gap-2 cursor-pointer">
  <Checkbox checked={agreed} onCheckedChange={setAgreed} />
  <span className="text-sm">I agree to the terms</span>
</label>

// Indeterminate (parent of mixed children)
<Checkbox
  indeterminate={someChecked && !allChecked}
  checked={allChecked}
  onCheckedChange={setAllChecked}
/>
```

### Gotchas
- `indeterminate` visually overrides `checked` — both can be true simultaneously in state.
- Tick draw-in animation is gated on `useMotion()` internally — no manual gating needed.
- `onCheckedChange` receives a plain boolean, not an event.
- Renders a `<span>` + hidden `<input>` — ref type is `HTMLElement`.

---

## Input

**Source**: `packages/ui/src/components/input/input.tsx`

A labeled text input. Uses Base UI `Field.Root`, `Field.Label`, `Field.Description`, `Field.Error`, and `Input`. Floating label, teal focus glow, prefix/suffix icons, character countdown.

### Props
<!-- PROPS:Input -->
| Prop | Type | Default | Description |
| ------ | ------ | --------- | ------------- |
| `label` | `string` | — | Label rendered above the input |
| `description` | `string` | — | Muted hint shown below the field; hidden when `error` is set |
| `error` | `string` | — | Red error copy; also marks the field invalid via Field.Root |
| `prefixIcon` | `React.ReactNode` | — | Leading icon / element inside the left edge of the input |
| `suffixIcon` | `React.ReactNode` | — | Trailing icon / element inside the right edge of the input |
| `size` | `'sm' \| 'default' \| 'lg'` | `'default'` | Visual + spacing scale |
<!-- /PROPS:Input -->

### States
- Default: `border-border`
- Focused: `border-primary` + teal glow ring
- Error: `border-destructive`, glow suppressed
- Disabled: `opacity-50 pointer-events-none`

### Character Countdown
Shown in suffix area when `maxLength` is set. Color: neutral → amber at 90% → destructive at 100%. Hidden when `error` is shown.

### Usage
```tsx
// Basic labeled
<Input label="Email" type="email" placeholder="you@example.com" />

// With description + error (React Hook Form)
<Input
  label="Password"
  type="password"
  description="At least 8 characters."
  error={errors.password?.message}
  {...register('password')}
/>

// With icons
<Input
  label="Search"
  prefixIcon={<Search />}
  placeholder="Search..."
/>

// Character limit
<Input label="Bio" maxLength={160} />
```

### Gotchas
- `description` is hidden when `error` is set — they share the same slot.
- `containerClassName` applies to the `Field.Root` wrapper, not the `<input>`.
- Never write a raw `<input>` with a manual label — always use this component.
- `prefixIcon` and `suffixIcon` accept any `ReactNode`; lucide-react icons are standard.

---

## Select

**Source**: `packages/ui/src/components/select/select.tsx`

A styled dropdown. Uses Base UI `Select.*` primitives. Visually matches `Input` exactly — same sizing, label/description/error API.

### Exports
- `Select` — root/trigger
- `SelectItem` — individual option (checkmark when selected)
- `SelectGroup` — optional grouping with a header label

### Select Props
<!-- PROPS:Select -->
| Prop | Type | Default | Description |
| ------ | ------ | --------- | ------------- |
| `label` | `string` | — | Label rendered above the trigger, matching Input style |
| `description` | `string` | — | Muted hint shown below the field; hidden when `error` is set |
| `error` | `string` | — | Red error copy |
| `placeholder` | `string` | — | Text shown when nothing is selected |
| `size` | `'sm' \| 'default' \| 'lg'` | `'default'` | Visual + spacing scale — matches Input sizes exactly |
| `className` | `string` | — | Extra class names forwarded to the trigger button |
| `value` | `T` | — | — |
| `defaultValue` | `T` | — | — |
| `onValueChange` | `(value: T \| null) => void` | — | — |
| `disabled` | `boolean` | — | — |
| `children` | `React.ReactNode` | — | — |
<!-- /PROPS:Select -->

### Usage
```tsx
// Basic
<Select label="Status" placeholder="Select status" value={val} onValueChange={setVal}>
  <SelectItem value="active">Active</SelectItem>
  <SelectItem value="inactive">Inactive</SelectItem>
  <SelectItem value="archived">Archived</SelectItem>
</Select>

// Grouped
<Select label="Region" placeholder="Choose region">
  <SelectGroup label="Asia Pacific">
    <SelectItem value="au">Australia</SelectItem>
    <SelectItem value="nz">New Zealand</SelectItem>
  </SelectGroup>
  <SelectGroup label="Europe">
    <SelectItem value="gb">United Kingdom</SelectItem>
  </SelectGroup>
</Select>
```

### Gotchas
- `onValueChange` receives `string | null` (null when cleared) — type accordingly.
- Popup width is set to match the trigger via `w-(--anchor-width)` — do not override width on `SelectItem`.
- Popup animation is gated on `useMotion()` internally.
- `modal={false}` — no backdrop; clicking outside closes without locking scroll.

---

## Radio / RadioCard

**Source**: `packages/ui/src/components/radio/radio.tsx`

Three exports: `RadioGroup`, `Radio`, `RadioCard`. Uses Base UI `RadioGroup`, `Radio.Root`, `Radio.Indicator`.

### RadioGroup Props
<!-- PROPS:RadioGroup -->
| Prop | Type | Default | Description |
| ------ | ------ | --------- | ------------- |
| `value` | `string` | — | — |
| `defaultValue` | `string` | — | — |
| `onValueChange` | `(value: string) => void` | — | — |
| `disabled` | `boolean` | — | — |
| `orientation` | `'horizontal' \| 'vertical'` | `'vertical'` | Layout direction for child radios. Defaults to 'vertical'. |
<!-- /PROPS:RadioGroup -->

### Radio Props
<!-- PROPS:Radio -->
| Prop | Type | Default | Description |
| ------ | ------ | --------- | ------------- |
| `value` | `string` | — | Must match a value in the parent RadioGroup. |
| `disabled` | `boolean` | — | — |
| `size` | `'sm' \| 'default'` | `'default'` | — |
| `indicator` | `'dot' \| 'check'` | `'dot'` | 'dot'   (default) — filled circle scales in when selected. 'check'           — circle fills with primary and shows a white checkmark, matching the RadioCard indicator style. |
| `children` | `React.ReactNode` | — | Label rendered beside the indicator. |
<!-- /PROPS:Radio -->

### RadioCard Props
<!-- PROPS:RadioCard -->
| Prop | Type | Default | Description |
| ------ | ------ | --------- | ------------- |
| `value` | `string` | — | Must match a value in the parent RadioGroup. |
| `disabled` | `boolean` | — | — |
| `title` | `string` | — | Bold label shown in the card. |
| `description` | `string` | — | Muted supporting text shown below the title. |
| `image` | `string` | — | URL of a thumbnail image. Renders as a small rounded square — top-left in card layout, left side in list layout. |
| `startContent` | `React.ReactNode` | — | Custom node for the image slot. Overrides the image prop. Sized automatically to match the layout. |
| `layout` | `'list' \| 'card'` | `'list'` | 'list' (default) — horizontal flex; indicator at end of row. 'card'           — vertical flex; indicator in absolute top-right corner. |
<!-- /PROPS:RadioCard -->

### Usage
```tsx
// Simple radio list
<RadioGroup value={tier} onValueChange={setTier}>
  <Radio value="free">Free</Radio>
  <Radio value="pro">Pro</Radio>
  <Radio value="enterprise">Enterprise</Radio>
</RadioGroup>

// Card grid (plan selector)
<RadioGroup value={plan} onValueChange={setPlan} orientation="horizontal">
  <div className="grid grid-cols-3 gap-3">
    <RadioCard value="starter" title="Starter" description="For individuals" layout="card" />
    <RadioCard value="pro" title="Pro" description="For teams" layout="card" />
    <RadioCard value="enterprise" title="Enterprise" description="Custom" layout="card" />
  </div>
</RadioGroup>

// List with icon
<RadioCard
  value="card"
  title="Credit card"
  description="Visa, Mastercard, Amex"
  startContent={<CreditCard className="size-5 text-muted-foreground" />}
/>
```

### Gotchas
- `Radio` must be a direct or nested descendant of `RadioGroup` — Base UI wires the context.
- `RadioCard` is not a replacement for `Radio` — it uses a fully different visual treatment.
- `onValueChange` on `RadioGroup` receives the new value string directly, not an event.

---

## Sidebar

**Source**: `packages/ui/src/components/sidebar/sidebar.tsx`

A collapsible `<aside>` navigation panel. Uses Base UI `Collapsible.Root` + `Collapsible.Trigger`. Animates width between `w-64` (open) and `w-10` (collapsed).

### Props
<!-- PROPS:Sidebar -->
| Prop | Type | Default | Description |
| ------ | ------ | --------- | ------------- |
| `children` | `React.ReactNode` | — | Nav/content to render inside the expanded panel |
| `defaultOpen` | `boolean` | `true` | Whether the sidebar starts open. Default: true |
<!-- /PROPS:Sidebar -->

### Layout Behavior
- `sticky top-14 h-[calc(100vh-3.5rem)]` — sticks directly below the 56px Navbar.
- Width transition: `duration-300 ease-in-out-expo`.
- Content fades out (`opacity-0 pointer-events-none`) when collapsed — text does not reflow.
- Content wrapper is always `w-64` internally, clipped by `overflow-hidden` on the parent.

### Usage
```tsx
// Standard layout below Navbar
<div className="flex">
  <Sidebar>
    <nav className="p-4 space-y-1">
      <NavLink to="/docs/button">Button</NavLink>
      <NavLink to="/docs/input">Input</NavLink>
    </nav>
  </Sidebar>
  <main className="flex-1 min-w-0">
    <Outlet />
  </main>
</div>
```

### Gotchas
- Always place `Sidebar` as the first child of a flex row — it is not self-positioning.
- Collapse toggle is built in — do not add an external toggle button.
- `sticky top-14` assumes a 56px Navbar. If Navbar height changes, update this too.

---

## FileUpload

**Source**: `packages/ui/src/components/upload/upload.tsx`

Drag/drop/paste/click upload zone. Hand-rolled (no Base UI). Marching-ants SVG border animation on active state. Requires `MotionProvider` in the tree.

### Props
<!-- PROPS:FileUpload -->
| Prop | Type | Default | Description |
| ------ | ------ | --------- | ------------- |
| `onFileSelect` | `(file: File) => void` | — | Called when a valid file is chosen via click, drag-drop, or paste |
| `accept` | `string[]` | `['image/jpeg','image/png','image/webp']` | Accepted MIME types — defaults to common image formats |
| `maxSizeMb` | `number` | `10` | Max file size in MB |
| `label` | `string` | `'Drop, paste, or click to browse'` | Primary label shown in the drop zone |
| `hint` | `string` | — | Secondary hint line — auto-generated from accept/maxSizeMb if omitted |
| `error` | `string` | — | Validation error message to display below the drop zone |
<!-- /PROPS:FileUpload -->

### States
- Default: `bg-muted/40`, static dashed `border-border`
- Hover / drag-over: `bg-primary/5`, animated `stroke-primary` border (marching ants)
- Error: `text-destructive` message below zone

### Supported Interactions
- Click / Enter / Space: opens system file picker
- Drag-and-drop: validated on drop
- Paste: intercepts `document` paste events globally (any image in clipboard)

### Usage
```tsx
// Basic
<FileUpload onFileSelect={(file) => console.log(file)} />

// PDF only with external error
<FileUpload
  accept={['application/pdf']}
  maxSizeMb={25}
  label="Upload your document"
  hint="PDF only · Max 25 MB"
  error={uploadError}
  onFileSelect={handleFile}
/>
```

### Gotchas
- **Requires `MotionProvider`** in the tree — uses `useMotion()` internally to gate the march animation.
- `onFileSelect` is only called after internal validation passes — type/size errors are shown automatically.
- Pass `error` for server-side validation errors; internal errors are shown automatically and cleared on next attempt.
- The paste listener is attached to `document` — one `FileUpload` on screen at a time is recommended.

---

## Navbar

**Source**: `packages/ui/src/components/navbar/navbar.tsx`

Sticky top navigation bar. `<header>` with `bg-background/60 backdrop-blur-md`. Wraps content in `Container` internally.

### Props
<!-- PROPS:Navbar -->
| Prop | Type | Default | Description |
| ------ | ------ | --------- | ------------- |
| `left` | `React.ReactNode` | — | Content to render on the left side (logo, nav links, etc.) |
| `right` | `React.ReactNode` | — | Content to render on the right side |
<!-- /PROPS:Navbar -->

### Layout
- Height: `h-14` (56px). `z-50 sticky top-0`.
- Left slot: `flex items-center gap-6`
- Right slot: `flex items-center gap-2`

### Usage
```tsx
<Navbar
  left={
    <>
      <span className="text-sm font-semibold">Acme</span>
      <nav className="flex gap-1">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/docs">Docs</NavLink>
      </nav>
    </>
  }
  right={
    <>
      <Button variant="ghost" size="icon" aria-label="Toggle theme">
        <Sun />
      </Button>
    </>
  }
/>
```

### Gotchas
- `Navbar` uses `Container` internally — do not wrap its children in another `Container`.
- `Sidebar` uses `sticky top-14` to sit directly below this — both heights must stay in sync.

---

## Code

**Source**: `packages/ui/src/components/code/code.tsx`

Syntax-highlighted code block with optional copy-to-clipboard button. Uses `react-syntax-highlighter` with a custom Aplo theme.

### Props
<!-- PROPS:Code -->
| Prop | Type | Default |
| ------ | ------ | --------- |
| `children` | `string` | — |
| `language` | `string` | `'tsx'` |
| `showCopy` | `boolean` | `true` |
<!-- /PROPS:Code -->

### Usage
```tsx
// TSX (default language)
<Code>{`import { Button } from '@aplo/ui'

export function Example() {
  return <Button>Click me</Button>
}`}</Code>

// Bash
<Code language="bash">{`npm install @aplo/ui`}</Code>

// CSS
<Code language="css">{`@import '@aplo/ui/styles';`}</Code>

// Without copy button
<Code showCopy={false}>{`const x = 1`}</Code>
```

### Gotchas
- `children` must be a plain string — do not pass JSX or template literals with interpolated components.
- Language defaults to `'tsx'`; pass `language="ts"` for TypeScript without JSX.
- Copy button is always visible (not hover-only) for accessibility.

---

## Container

**Source**: `packages/ui/src/components/container/container.tsx`

Constrains width and adds horizontal padding. Polymorphic via `as` prop.

### Props
<!-- PROPS:Container -->
| Prop | Type | Default | Description |
| ------ | ------ | --------- | ------------- |
| `as` | `React.ElementType` | `'div'` | Render as a different element, e.g. "section", "main", "header" |
<!-- /PROPS:Container -->

### Classes Applied
`mx-auto w-full max-w-page px-6` — max-width 77.5rem (1240px), 24px side padding.

### Usage
```tsx
// Page content wrapper
<main>
  <Container>
    <PageHeader title="Dashboard" />
    {/* page content */}
  </Container>
</main>

// As section
<Container as="section" className="py-16">
  <h2>Features</h2>
</Container>
```

### Gotchas
- `Navbar` uses `Container` internally — do not add another `Container` around Navbar children.
- Do not nest `Container` inside `Container` — the widths will compound incorrectly.
- Do not use `Container` inside `Hero` — Hero is full-bleed by design.

---

## Hero

**Source**: `packages/ui/src/components/hero/hero.tsx`

Full-bleed section with optional interactive particle globe. Uses `useMotion()` — **requires `MotionProvider`**.

### Props
<!-- PROPS:Hero -->
| Prop | Type | Default | Description |
| ------ | ------ | --------- | ------------- |
| `backgroundEffect` | `HeroBackgroundEffect` | `'none'` | Controls the interactive background treatment |
| `globeShadowAngle` | `number` | `-135` | Angle (degrees) of the sparse/shadow side of the globe. Default: −135 (top-left) |
| `globeShadowStrength` | `number` | `0.75` | Strength of the directional density gradient (0 = uniform, 1 = maximum). Default: 0.75 |
| `scaleCircle` | `boolean` | `false` | When true the globe radius scales proportionally with the container so it always occupies roughly one-third of the hero. Default: false (uses 640 px). |
| `globeRadius` | `number` | — | Explicit globe radius in pixels. Takes precedence over both `scaleCircle` and the built-in default when provided. |
<!-- /PROPS:Hero -->

### Usage
```tsx
// Basic globe
<Hero backgroundEffect="stipple-follow" className="min-h-150">
  <Container>
    <h1>Build faster.</h1>
  </Container>
</Hero>

// Scaled globe (adapts to container size)
<Hero backgroundEffect="stipple-follow" scaleCircle className="min-h-96">
  <Container>
    <h1>Responsive globe.</h1>
  </Container>
</Hero>

// Custom fixed radius
<Hero backgroundEffect="stipple-follow" globeRadius={400} className="min-h-64" />
```

### Gotchas
- **Requires `MotionProvider`** — motion-off renders a static snapshot instead of animating.
- Do not nest inside `Container` — Hero is full-bleed.
- `globeRadius` takes priority over `scaleCircle` — no need to unset `scaleCircle` when using a fixed radius.
- The canvas is `aria-hidden="true"` — purely decorative, no a11y impact.
- Uses `IntersectionObserver` — animation pauses automatically when off-screen.
- Only use once per page; multiple Hero instances increase canvas overhead.

---

## Stack

**Source**: `packages/ui/src/components/stack/stack.tsx`

Creates a CSS stacking context (`isolation: isolate`) to scope z-index within a section.

### Props
| Prop | Type | Default |
|------|------|---------|
| `as` | `React.ElementType` | `'div'` |
| + all HTML attributes of `as` element | | |

### Usage
```tsx
// Prevent z-index bleed between Hero and next section
<Stack as="main">
  <Hero backgroundEffect="stipple-follow" className="min-h-150">…</Hero>
  <section className="py-24">…</section>
</Stack>
```

### Gotchas
- `Stack` adds no visual styles — add layout classes (`flex`, `grid`, `py-*`) via `className`.
- Use when a Hero's canvas or a sticky element bleeds into adjacent sections visually.

---

## PageHeader

**Source**: `packages/ui/src/components/page-header/page-header.tsx`

Semantic `<header>` with eyebrow + title + description. For top-of-page headings.

### Props
<!-- PROPS:PageHeader -->
| Prop | Type | Default | Description |
| ------ | ------ | --------- | ------------- |
| `title` | `string` | — | Main page title rendered as an <h1> |
| `description` | `React.ReactNode` | — | Descriptive text below the title — accepts ReactNode for inline code/links |
| `eyebrow` | `string` | — | Optional small label above the title (eyebrow text) |
<!-- /PROPS:PageHeader -->

### Usage
```tsx
<Container>
  <PageHeader
    eyebrow="Components"
    title="Button"
    description="The primary action primitive for all interactive controls."
  />
</Container>
```

### Gotchas
- `title` renders as `<h1>` — only one `PageHeader` per page.
- Always place inside a `Container`.

---

## Label

**Source**: `packages/ui/src/components/label/label.tsx`

A styled `<label>`. Used internally by `Input` and `Select`. Exposed for custom form layouts.

### Props
| Prop | Type | Default |
|------|------|---------|
| `size` | `sm \| default \| lg` | `default` |
| + all native `<label>` props | | |

### Usage
```tsx
// Manual association
<Label htmlFor="custom-input">Full name</Label>
<input id="custom-input" className="..." />
```

### Gotchas
- Prefer using the `label` prop on `Input`/`Select` directly — they wire up `htmlFor` automatically.
- Use `Label` manually only when building a fully custom field that can't use the `Input` component.

---

## LottieIcon

**Source**: `packages/ui/src/components/lottie-icon/lottie-icon.tsx`

Renders a Lottie animation from a `.lottie` binary file or JSON data.

### Props
| Prop | Type | Notes |
|------|------|-------|
| `src` | `string` | URL to a `.lottie` binary file |
| `animationData` | `object` | JSON animation data |
| `size` | `number` | Width + height in px (applied via inline style) |
| `speed` | `number` | Playback speed multiplier |
| `loop` | `boolean` | |
| `autoplay` | `boolean` | |

### Usage
```tsx
// From .lottie file
<LottieIcon src="/animations/check.lottie" size={48} loop autoplay />

// From JSON
import animData from './animation.json'
<LottieIcon animationData={animData} size={32} />
```

### Gotchas
- Pass `src` **or** `animationData` — not both. `src` takes a URL to a binary `.lottie` file.
- `size` uses inline style — the only permitted use of inline style in this codebase.

---

## Common Patterns

### Form (Input + Select + Submit)
```tsx
<form className="flex flex-col gap-4 max-w-sm" onSubmit={handleSubmit(onSubmit)}>
  <Input
    label="Email"
    type="email"
    error={errors.email?.message}
    {...register('email')}
  />
  <Select label="Role" value={role} onValueChange={setRole}>
    <SelectItem value="admin">Admin</SelectItem>
    <SelectItem value="member">Member</SelectItem>
  </Select>
  <div className="flex justify-end gap-3">
    <Button variant="secondary" type="button" onClick={onCancel}>Cancel</Button>
    <Button loading={isSubmitting}>Save</Button>
  </div>
</form>
```

### Page Layout (Navbar + Sidebar + Main)
```tsx
<>
  <Navbar left={<Logo />} right={<ThemeToggle />} />
  <div className="flex">
    <Sidebar>
      <nav className="p-4 space-y-1">…</nav>
    </Sidebar>
    <main className="flex-1 min-w-0">
      <Container className="py-8">
        <PageHeader title="Settings" />
        {/* content */}
      </Container>
    </main>
  </div>
</>
```

### Destructive Confirmation Row
```tsx
<div className="flex justify-end gap-3">
  <Button variant="secondary">Cancel</Button>
  <Button variant="destructive" onClick={handleDelete}>Delete</Button>
</div>
```

### RadioCard Plan Selector
```tsx
<RadioGroup value={plan} onValueChange={setPlan}>
  <div className="grid grid-cols-3 gap-3">
    <RadioCard value="starter" title="Starter" description="For individuals" layout="card" />
    <RadioCard value="pro" title="Pro" description="For teams" layout="card" />
    <RadioCard value="enterprise" title="Enterprise" description="Contact us" layout="card" />
  </div>
</RadioGroup>
```

### Motion Toggle
```tsx
const { motionEnabled, setMotionEnabled } = useMotion()
<label className="flex items-center gap-2 cursor-pointer select-none">
  <span className="text-sm text-muted-foreground">Animations</span>
  <Switch size="sm" checked={motionEnabled} onCheckedChange={setMotionEnabled} />
</label>
```

---

## Component Relationships

- `Navbar` uses `Container` internally — don't add another Container around Navbar children.
- `Sidebar` uses `sticky top-14` — assumes Navbar is `h-14`. Keep in sync.
- `Input` and `Select` share identical `label` / `description` / `error` / `size` API.
- `Button` is used inside `FileUpload` for the "Choose file" trigger.
- `FileUpload` and `Hero` both require `MotionProvider` in the tree.
- `PageHeader` sits inside a `Container` at the top of `<main>`.
- `Stack` wraps full-bleed sections to isolate z-index stacking.
- `AploProvider` = `ThemeProvider` + `MotionProvider` — required at app root.
