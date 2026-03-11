# Aplo Design System — Layout Patterns

Reusable page and section layouts inferred from the component system. Use these patterns as scaffolding for new interfaces.

---

## App Shell (Navbar + Sidebar + Main)

**Use for**: any multi-page internal tool or micro app with persistent navigation.

```
┌─────────────────────────────────┐
│          Navbar (h-14)          │
├────────┬────────────────────────┤
│Sidebar │  <main>                │
│(w-64)  │    Container           │
│sticky  │      page content      │
│        │                        │
└────────┴────────────────────────┘
```

**Structure**:
```tsx
<AploProvider>
  <Navbar left={<Logo />} right={<UserMenu />} />
  <div className="flex min-h-[calc(100vh-3.5rem)]">
    <Sidebar defaultOpen>
      {/* nav items */}
    </Sidebar>
    <main className="flex-1 overflow-y-auto">
      <Container className="py-8">
        {/* page content */}
      </Container>
    </main>
  </div>
</AploProvider>
```

**Rules**:
- `AploProvider` at app root (required for theme + motion).
- `Navbar` always first child of `<body>` content.
- Sidebar uses `sticky top-14 h-[calc(100vh-3.5rem)]` — this matches Navbar height automatically.
- `min-h-[calc(100vh-3.5rem)]` on the flex row ensures full-height sidebar even with short content.
- Do not put `overflow-hidden` on the flex row (breaks sticky sidebar).

---

## Page with Header

**Use for**: settings pages, list pages, any view with a title + actions.

```
Container
  PageHeader (title, description, eyebrow)
  ─── divider (optional) ───
  page content
```

**Structure**:
```tsx
<Container className="py-8 space-y-6">
  <PageHeader
    eyebrow="Settings"
    title="Account"
    description="Manage your account information and preferences."
  />
  <div className="border-t border-border" />
  {/* content */}
</Container>
```

**Rules**:
- One `<h1>` per page (PageHeader provides it).
- `space-y-6` between header and first content section.
- Optional `border-t border-border` divider after the header.

---

## Settings Page

**Use for**: form-based settings, profile editing, preferences.

```
Container
  PageHeader
  ─────────
  Section label
  [Form fields]
  Action row (right-aligned)
```

**Structure**:
```tsx
<Container className="py-8 max-w-2xl space-y-8">
  <PageHeader title="Profile" description="Update your personal details." />
  <form onSubmit={handleSubmit} className="space-y-6">
    <div className="space-y-4">
      <Input label="Full name" {...register('name')} />
      <Input label="Email address" type="email" {...register('email')} />
    </div>
    <div className="flex justify-end gap-3">
      <Button variant="secondary" type="button" onClick={onCancel}>Cancel</Button>
      <Button variant="primary" type="submit" loading={isSubmitting}>Save changes</Button>
    </div>
  </form>
</Container>
```

**Rules**:
- Constrain settings forms to `max-w-2xl` (override Container default).
- Single-column field layout. Two-column only for name pairs.
- Action row always at bottom, right-aligned.
- `space-y-4` between form fields, `space-y-6` between field groups.
- One primary action. Secondary action is Cancel.

---

## Form Page (Standalone)

**Use for**: onboarding steps, multi-field data entry, Figma plugin forms.

```
Centered column (max-w-md)
  Heading
  Subtext
  [Form fields]
  Primary CTA
```

**Structure**:
```tsx
<div className="flex min-h-screen items-start justify-center pt-16 px-4">
  <div className="w-full max-w-md space-y-6">
    <div className="space-y-1">
      <h1 className="text-2xl font-bold text-foreground">Create workspace</h1>
      <p className="text-sm text-muted-foreground">Fill in the details below.</p>
    </div>
    <form className="space-y-4">
      <Input label="Workspace name" {...register('name')} />
      <Select label="Plan" onValueChange={setPlan}>
        <SelectItem value="starter">Starter</SelectItem>
        <SelectItem value="pro">Pro</SelectItem>
      </Select>
      <Button variant="primary" className="w-full" type="submit" loading={submitting}>
        Create workspace
      </Button>
    </form>
  </div>
</div>
```

**Rules**:
- `max-w-md` for form column. Do not use `Container` here.
- `w-full` on the submit button (full-width CTA in standalone form).
- Heading is `text-2xl font-bold` (not PageHeader).
- Do not use the Sidebar in standalone form pages.

---

## Dashboard Section

**Use for**: stat cards, metric grids, summary panels within a dashboard page.

```
Section header (label + action)
Grid of cards
```

**Structure**:
```tsx
<section className="space-y-4">
  <div className="flex items-center justify-between">
    <h2 className="text-lg font-semibold text-foreground">Overview</h2>
    <Button variant="ghost" size="sm">View all</Button>
  </div>
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
    {/* stat cards */}
    <div className="rounded-lg border border-border bg-card p-4 space-y-1">
      <p className="text-xs text-muted-foreground uppercase tracking-widest">Revenue</p>
      <p className="text-2xl font-bold text-foreground">$12,400</p>
    </div>
  </div>
</section>
```

**Rules**:
- Section heading: `text-lg font-semibold`, not `<h1>`.
- Card: `rounded-lg border border-border bg-card p-4`.
- Grid gaps: `gap-4` (not gap-6 for dense dashboards).
- Secondary action in section header: `variant="ghost" size="sm"`.

---

## List / Table Layout

**Use for**: data lists, resource indexes, search results.

```
Toolbar (search + filters + actions)
─────────────────────────────────
List rows or table
─────────────────────────────────
Pagination (if needed)
```

**Structure**:
```tsx
<div className="space-y-4">
  {/* Toolbar */}
  <div className="flex items-center gap-3">
    <Input placeholder="Search…" prefixIcon={<Search />} className="max-w-sm" />
    <div className="ml-auto flex gap-2">
      <Button variant="outline" size="sm">Filter</Button>
      <Button variant="primary" size="sm">New item</Button>
    </div>
  </div>
  {/* List */}
  <div className="rounded-lg border border-border bg-card divide-y divide-border">
    {items.map(item => (
      <div key={item.id} className="flex items-center gap-4 px-4 py-3">
        {/* row content */}
      </div>
    ))}
  </div>
</div>
```

**Rules**:
- Toolbar: `flex items-center gap-3`. Primary actions at end with `ml-auto`.
- List container: `rounded-lg border border-border bg-card divide-y divide-border`.
- Row padding: `px-4 py-3`.
- `variant="primary"` only for the main creation action. All other toolbar buttons are `outline` or `ghost`.
- Search input max-width: `max-w-sm` in toolbar context.

---

## Modal / Dialog Layout (Inferred)

No Dialog component exists yet. When building dialogs, use this pattern.

```
Overlay (backdrop)
  Dialog panel (max-w-md, rounded-lg, bg-card)
    Header (title + close button)
    ─────────────────────────────
    Body (p-6, space-y-4)
    ─────────────────────────────
    Footer (right-aligned actions)
```

**Structure**:
```tsx
<div className="fixed inset-0 z-50 flex items-center justify-center">
  <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
  <div className="relative z-10 w-full max-w-md rounded-lg border border-border bg-card shadow-md">
    {/* Header */}
    <div className="flex items-center justify-between px-6 py-4 border-b border-border">
      <h2 className="text-base font-semibold text-foreground">Dialog title</h2>
      <Button variant="ghost" size="icon-sm" aria-label="Close"><X /></Button>
    </div>
    {/* Body */}
    <div className="p-6 space-y-4">
      {/* content */}
    </div>
    {/* Footer */}
    <div className="flex justify-end gap-3 px-6 py-4 border-t border-border">
      <Button variant="secondary">Cancel</Button>
      <Button variant="primary">Confirm</Button>
    </div>
  </div>
</div>
```

**Rules**:
- Max-width: `max-w-md`. Use `max-w-lg` for forms, `max-w-sm` for confirmations.
- Header and footer separated by `border-border`.
- Close button: `variant="ghost" size="icon-sm"` with `aria-label`.

---

## Toolbar / Header / Action Bar

**Use for**: section-level toolbars, editor toolbars, filtering bars.

**Structure**:
```tsx
<div className="flex h-11 items-center gap-2 border-b border-border px-4">
  <Button variant="ghost" size="icon-sm"><ChevronLeft /></Button>
  <span className="text-sm font-medium text-foreground">Page title</span>
  <div className="ml-auto flex items-center gap-2">
    <Button variant="outline" size="sm">Export</Button>
    <Button variant="primary" size="sm">Publish</Button>
  </div>
</div>
```

**Rules**:
- Height: `h-11` (44px) for compact toolbars inside panels.
- Separate left content from right actions with `ml-auto`.
- `ghost size="icon-sm"` for icon-only toolbar buttons.
- Keep primary actions to one. All others are `outline` or `ghost`.

---

## Empty State

**Use for**: zero-data views, filtered results with no match, onboarding prompts.

**Structure**:
```tsx
<div className="flex flex-col items-center justify-center gap-4 py-16 text-center">
  <div className="rounded-full p-3 bg-secondary text-muted-foreground">
    <FolderOpen className="size-8" />
  </div>
  <div className="space-y-1">
    <p className="text-sm font-medium text-foreground">No items found</p>
    <p className="text-sm text-muted-foreground max-w-xs">
      Get started by creating your first item.
    </p>
  </div>
  <Button variant="primary" size="sm">Create item</Button>
</div>
```

**Rules**:
- Icon in a `rounded-full p-3 bg-secondary` circle.
- One-line title, short description (`max-w-xs`).
- Optional CTA: `variant="primary" size="sm"`.
- Center in the parent container's full height (use `flex-1` on parent if inside a panel).

---

## Loading / Skeleton Layout (Inferred)

No Skeleton component exists. Use this pattern.

```tsx
<div className="space-y-3">
  <div className="h-4 w-48 rounded-md bg-muted animate-pulse" />
  <div className="h-4 w-full rounded-md bg-muted animate-pulse" />
  <div className="h-4 w-3/4 rounded-md bg-muted animate-pulse" />
</div>
```

**Rules**:
- `bg-muted animate-pulse` for all skeleton elements.
- Match dimensions to real content (e.g. `h-10` for input skeletons).
- Wrap in the same layout container the real content will use (same `space-y`, same grid).
- Do not use skeleton + real content simultaneously.
