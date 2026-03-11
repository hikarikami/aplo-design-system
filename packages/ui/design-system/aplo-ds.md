# Aplo Design System — Canonical AI Reference

> Read this file first. It is the single authoritative summary for generating UI with `@aplo/ui`.

---

## What This Is

`@aplo/ui` is a shared React component library for Aplo-built internal tools, Figma plugins, and micro apps. It is not a general-purpose UI kit.

**Stack**: React 18 + TypeScript + Tailwind CSS v4 + Base UI headless primitives + CVA variants.

---

## Design Principles (Short Form)

- **Dark-first**: Default theme is dark. Light mode is fully supported.
- **One accent color**: Teal (`hsl(179 100% 21%)` / `#006B69`). No other accents.
- **Motion is optional**: All animations gated on `useMotion()`. Respect `prefers-reduced-motion`.
- **Minimalist**: No decorative elements. Emphasis only on primary actions and errors.
- **Accessible**: All interactive components use Base UI for keyboard/ARIA. Never remove focus rings.

---

## Available Components

| Component | Import | Use For |
|-----------|--------|---------|
| `Button` | `@aplo/ui` | All actions |
| `Input` | `@aplo/ui` | Text inputs with label/error |
| `Select` | `@aplo/ui` | Dropdown selectors |
| `Checkbox` | `@aplo/ui` | Multi-select toggles |
| `Switch` | `@aplo/ui` | Binary on/off toggles |
| `RadioGroup` + `Radio` | `@aplo/ui` | Single-select options |
| `RadioCard` | `@aplo/ui` | Rich single-select cards |
| `Sidebar` | `@aplo/ui` | Collapsible nav panel |
| `Navbar` | `@aplo/ui` | Sticky top nav bar |
| `Container` | `@aplo/ui` | Page-width constraint (max 77.5rem) |
| `PageHeader` | `@aplo/ui` | Page title + description |
| `Hero` | `@aplo/ui` | Landing section with optional particle globe |
| `Stack` | `@aplo/ui` | CSS stacking context (`isolation: isolate`) |
| `FileUpload` | `@aplo/ui` | Drag/drop/paste file zone |
| `LottieIcon` | `@aplo/ui` | Lottie animation player |
| `Label` | `@aplo/ui` | Styled `<label>` |
| `AploProvider` | `@aplo/ui` | App root — wraps ThemeProvider + MotionProvider |
| `cn` | `@aplo/ui` | Class merging utility (clsx + tailwind-merge) |
| `useTheme` | `@aplo/ui` | Theme toggle hook |
| `useMotion` | `@aplo/ui` | Motion preference hook |

Icons: `lucide-react` only.

---

## Button Variants

```tsx
<Button variant="primary">Main action</Button>      // teal bg
<Button variant="secondary">Cancel</Button>         // muted bg
<Button variant="outline">Tertiary</Button>          // teal border
<Button variant="ghost">Inline</Button>              // transparent
<Button variant="destructive">Delete</Button>        // red bg
<Button variant="link">Text link</Button>            // underline only
<Button size="icon" aria-label="Edit"><Pencil /></Button>  // 40×40px
<Button loading>Saving...</Button>                   // spinner + disabled
```

---

## Form Fields

```tsx
// Always use component props for label/description/error — never custom markup
<Input
  label="Email"
  description="We'll never share this."
  error={errors.email?.message}
  prefixIcon={<Mail />}
  maxLength={100}
  {...register('email')}
/>

<Select label="Status" value={val} onValueChange={setVal} error={errors.status?.message}>
  <SelectItem value="active">Active</SelectItem>
  <SelectItem value="inactive">Inactive</SelectItem>
</Select>

<Checkbox checked={agreed} onCheckedChange={setAgreed} id="terms" />
<label htmlFor="terms" className="text-sm text-foreground">I agree to the terms</label>

<Switch checked={enabled} onCheckedChange={setEnabled} />

<RadioGroup value={plan} onValueChange={setPlan}>
  <Radio value="starter">Starter</Radio>
  <Radio value="pro">Pro</Radio>
</RadioGroup>
```

---

## App Shell

```tsx
// Required at root
<AploProvider>
  <Navbar left={<Logo />} right={<UserMenu />} />
  <div className="flex min-h-[calc(100vh-3.5rem)]">
    <Sidebar defaultOpen>
      {/* nav items */}
    </Sidebar>
    <main className="flex-1 overflow-y-auto">
      <Container className="py-8">
        <PageHeader title="Dashboard" description="Overview of your workspace." />
        {/* page content */}
      </Container>
    </main>
  </div>
</AploProvider>
```

---

## Core Layout Patterns

### Form action row
```tsx
<div className="flex justify-end gap-3">
  <Button variant="secondary">Cancel</Button>
  <Button variant="primary" loading={isSubmitting}>Save</Button>
</div>
```

### Card
```tsx
<div className="rounded-lg border border-border bg-card p-4">
  {/* content */}
</div>
```

### Section header + action
```tsx
<div className="flex items-center justify-between">
  <h2 className="text-lg font-semibold text-foreground">Section</h2>
  <Button variant="ghost" size="sm">View all</Button>
</div>
```

### Empty state
```tsx
<div className="flex flex-col items-center justify-center gap-4 py-16 text-center">
  <div className="rounded-full p-3 bg-secondary text-muted-foreground">
    <FolderOpen className="size-8" />
  </div>
  <div className="space-y-1">
    <p className="text-sm font-medium text-foreground">No items yet</p>
    <p className="text-sm text-muted-foreground max-w-xs">Create your first item to get started.</p>
  </div>
  <Button variant="primary" size="sm">Create item</Button>
</div>
```

### List container
```tsx
<div className="rounded-lg border border-border bg-card divide-y divide-border">
  {items.map(item => (
    <div key={item.id} className="flex items-center gap-4 px-4 py-3">
      {/* row */}
    </div>
  ))}
</div>
```

---

## Usage Priorities

1. Use an existing `@aplo/ui` component — always first choice.
2. Compose existing components — before writing any custom markup.
3. Write Tailwind + Base UI — if a new headless primitive is needed, follow existing component patterns.
4. Write plain Tailwind HTML — only for layout, typography, and purely presentational containers.

---

## Do

- `import { Button, Input, cn } from '@aplo/ui'`
- Use semantic color tokens: `bg-primary`, `text-foreground`, `border-border`, `bg-card`, `bg-muted`
- Use `rounded-md` for inputs/buttons, `rounded-lg` for cards
- Use `cn()` for all class merging
- Add `aria-label` to all icon-only buttons
- Gate animations: `cn(motionEnabled && 'transition-colors duration-200')`

## Do Not

- Write raw `<button>`, `<input>`, `<select>`, `<input type="checkbox/radio">`
- Use inline `style={{ color, backgroundColor }}`
- Use arbitrary color values (`text-[#006B69]`, `bg-[hsl(...)]`)
- Use `rounded-xl` or larger
- Add `shadow-md` to cards or buttons
- Use `framer-motion` or any animation library
- Write `dark:` overrides for semantic tokens (they auto-switch)
- Use any icon library other than `lucide-react`
- Create components outside `packages/ui/src/components/`

---

## Design Tokens (Key Values)

| Token | Value |
|-------|-------|
| Primary (teal) | `hsl(179 100% 21%)` / `#006B69` |
| Background (dark) | `hsl(240 5% 9%)` / `#161619` approx |
| Card (dark) | `hsl(240 5% 12%)` |
| Border | `hsl(240 5% 20%)` (dark) |
| Ring (focus) | `hsl(179 100% 21%)` |
| Radius md | 4px |
| Radius lg | 6px |
| Container max-width | 77.5rem (1240px) |
| Navbar height | 56px (h-14) |
| Font | Lato, 400/700/900 |
