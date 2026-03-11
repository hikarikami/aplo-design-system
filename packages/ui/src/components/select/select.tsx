import * as React from 'react'
import { Select as BaseSelect } from '@base-ui-components/react/select'
import { cn } from '@/lib/utils'
import { useMotion } from '@/lib/motion'
import { Label } from '@/components/label'

/* ─────────────────────────────────────────────────────────────────────────────
   Select — Base UI Select with Aplo branding, sized to match Input.

   Usage:
     <Select label="Role" placeholder="Pick one…">
       <SelectItem value="admin">Admin</SelectItem>
       <SelectGroup label="Users">
         <SelectItem value="viewer">Viewer</SelectItem>
       </SelectGroup>
     </Select>

   Data attributes used:
     Trigger  data-popup-open  data-placeholder  data-disabled
     Icon     data-open        (rotates chevron)
     Popup    data-starting-style / data-ending-style  (CSS transitions)
     Item     data-highlighted  data-selected  data-disabled
───────────────────────────────────────────────────────────────────────────── */

/* ── SelectItem ─────────────────────────────────────────────────────────── */

export interface SelectItemProps {
  value: string
  disabled?: boolean
  className?: string
  children: React.ReactNode
}

export const SelectItem = React.forwardRef<HTMLDivElement, SelectItemProps>(
  ({ value, disabled, className, children }, ref) => (
    <BaseSelect.Item
      ref={ref}
      value={value}
      disabled={disabled}
      className={cn(
        // Layout — indent for the checkmark (16px indicator + 8px gap + 8px left pad = pl-8)
        'relative flex cursor-default select-none items-center rounded-sm',
        'pl-8 pr-2 py-1.5 text-sm text-foreground outline-none',
        // Highlighted (keyboard or hover)
        'data-highlighted:bg-secondary',
        // Disabled
        'data-disabled:pointer-events-none data-disabled:opacity-40',
        className,
      )}
    >
      {/* Teal checkmark — only mounted when this item is selected */}
      <BaseSelect.ItemIndicator
        className="absolute left-2 flex items-center justify-center text-primary"
      >
        <svg
          viewBox="0 0 12 9"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
          className="size-3"
        >
          <polyline points="1 4.5 4.5 8 11 1" />
        </svg>
      </BaseSelect.ItemIndicator>

      <BaseSelect.ItemText>{children}</BaseSelect.ItemText>
    </BaseSelect.Item>
  ),
)
SelectItem.displayName = 'SelectItem'

/* ── SelectGroup ────────────────────────────────────────────────────────── */

export interface SelectGroupProps {
  /** Optional header label rendered above the group items */
  label?: string
  className?: string
  children: React.ReactNode
}

export function SelectGroup({ label, className, children }: SelectGroupProps) {
  return (
    <BaseSelect.Group className={className}>
      {label && (
        <BaseSelect.GroupLabel className="px-2 py-1.5 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          {label}
        </BaseSelect.GroupLabel>
      )}
      {children}
    </BaseSelect.Group>
  )
}

/* ── Select (root) ──────────────────────────────────────────────────────── */

export interface SelectProps<T extends string = string> {
  /** Label rendered above the trigger, matching Input style */
  label?: string
  /** Muted hint shown below the field; hidden when `error` is set */
  description?: string
  /** Red error copy */
  error?: string
  /** Text shown when nothing is selected */
  placeholder?: string
  /** Visual + spacing scale — matches Input sizes exactly */
  size?: 'sm' | 'default' | 'lg'
  /** Extra class names on the outermost wrapper div */
  containerClassName?: string
  /** Extra class names forwarded to the trigger button */
  className?: string

  // Select.Root passthrough
  value?: T
  defaultValue?: T
  onValueChange?: (value: T | null) => void
  disabled?: boolean
  required?: boolean
  name?: string
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void

  children: React.ReactNode
}

export function Select<T extends string = string>({
  label,
  description,
  error,
  placeholder = 'Select an option',
  size = 'default',
  containerClassName,
  className,
  value,
  defaultValue,
  onValueChange,
  disabled,
  required,
  name,
  open,
  defaultOpen,
  onOpenChange,
  children,
}: SelectProps<T>) {
  const { motionEnabled } = useMotion()
  const labelId = React.useId()

  /* ── Size tokens — identical to Input ─────────────────────────────────── */
  const triggerH    = size === 'sm' ? 'h-9'    : size === 'lg' ? 'h-12'   : 'h-10'
  const triggerPx   = size === 'sm' ? 'px-3'   : size === 'lg' ? 'px-4'   : 'px-3.5'
  const triggerText = size === 'sm' ? 'text-xs' : size === 'lg' ? 'text-base' : 'text-sm'

  return (
    <div className={cn('w-full space-y-1.5', containerClassName)}>
      {/* ── Label ─────────────────────────────────────────────────────── */}
      {label && (
        <Label id={labelId} size={size}>
          {label}
        </Label>
      )}

      <BaseSelect.Root
        value={value}
        defaultValue={defaultValue}
        onValueChange={(v) => onValueChange?.(v as T | null)}
        disabled={disabled}
        required={required}
        name={name}
        open={open}
        defaultOpen={defaultOpen}
        onOpenChange={onOpenChange}
        modal={false}
      >
        {/* ── Trigger ─────────────────────────────────────────────────── */}
        <BaseSelect.Trigger
          aria-labelledby={label ? labelId : undefined}
          className={cn(
            // group so children can use group-data-placeholder: to show/hide placeholder
            'group w-full flex items-center justify-between gap-2',
            'rounded-md border bg-card cursor-default text-left outline-none',
            triggerH,
            triggerPx,
            triggerText,
            // Border states — neutral › teal on open/focus › red on error
            !error && 'border-border',
            !error && 'focus-visible:border-primary data-popup-open:border-primary',
            !!error && 'border-destructive',
            // Teal glow ring — open + focused, no error
            !error && motionEnabled && [
              'focus-visible:shadow-[0_0_0_3px_hsl(179_100%_21%/0.12)]',
              'data-popup-open:shadow-[0_0_0_3px_hsl(179_100%_21%/0.12)]',
            ],
            'disabled:pointer-events-none disabled:opacity-50',
            motionEnabled && 'transition-[border-color,box-shadow] duration-200',
            className,
          )}
        >
          {/*
            Placeholder — visible only when trigger has data-placeholder (nothing selected).
            Value is hidden in the same state. Base UI doesn't accept a placeholder prop
            on Select.Value, so we use the trigger's group-data-placeholder: variant.
          */}
          <span aria-hidden className="flex-1 truncate text-muted-foreground/70 hidden group-data-placeholder:block">
            {placeholder}
          </span>
          <BaseSelect.Value className="flex-1 truncate group-data-placeholder:hidden" />

          {/* Chevron — rotates 180° when popup is open via data-open on Icon */}
          <BaseSelect.Icon
            className={cn(
              'size-4 shrink-0 text-muted-foreground',
              'data-open:rotate-180',
              motionEnabled && 'transition-transform duration-200',
            )}
          >
            <svg
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden
              className="size-4"
            >
              <polyline points="4 6 8 10 12 6" />
            </svg>
          </BaseSelect.Icon>
        </BaseSelect.Trigger>

        {/* ── Popup ───────────────────────────────────────────────────── */}
        <BaseSelect.Portal>
          <BaseSelect.Positioner sideOffset={6} alignItemWithTrigger={false} className="z-50 outline-none">
            <BaseSelect.Popup
              className={cn(
                // Size — match trigger width, min readable width
                'w-(--anchor-width) min-w-32',
                // Chrome
                'rounded-md border border-border bg-popover shadow-md p-1 outline-none',
                // Entry / exit animation via CSS transitions
                // Base UI sets data-starting-style on mount, data-ending-style before unmount
                'opacity-100 translate-y-0',
                motionEnabled && 'transition-[opacity,transform] duration-150 ease-out',
                motionEnabled && [
                  'data-starting-style:opacity-0 data-starting-style:-translate-y-1',
                  'data-ending-style:opacity-0   data-ending-style:-translate-y-1',
                ],
              )}
            >
              {children}
            </BaseSelect.Popup>
          </BaseSelect.Positioner>
        </BaseSelect.Portal>
      </BaseSelect.Root>

      {/* ── Description ─────────────────────────────────────────────── */}
      {description && !error && (
        <p className="text-xs text-muted-foreground">{description}</p>
      )}

      {/* ── Error ───────────────────────────────────────────────────── */}
      {error && (
        <p className="flex items-center gap-1.5 text-xs text-destructive">
          <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden className="size-3 shrink-0 mt-px">
            <path d="M8 1.333 1.333 14h13.334L8 1.333Zm0 8.334a.667.667 0 1 1 0 1.333.667.667 0 0 1 0-1.333Zm-.667-4h1.334v3.333H7.333V5.667Z" />
          </svg>
          {error}
        </p>
      )}
    </div>
  )
}
