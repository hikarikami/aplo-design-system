import * as React from 'react'
import { Accordion as BaseAccordion } from '@base-ui-components/react/accordion'
import { cn } from '../../lib/utils'
import { useMotion } from '../../lib/motion'

/* ─────────────────────────────────────────────────────────────────────────────
   Accordion — Base UI Accordion with Aplo branding.

   Supports three visual variants, three sizes, single/multiple open items,
   and motion-aware height + chevron animations.

   Usage:
     <Accordion>
       <AccordionItem value="1" title="What is Aplo?">
         Content here.
       </AccordionItem>
       <AccordionItem value="2" title="How do I install it?">
         Content here.
       </AccordionItem>
     </Accordion>

   Variants:
     default   — flat list, items separated by hairline dividers
     bordered  — outer border + rounded container, dividers between items
     split     — each item is an independent bordered card

   Data attributes (from Base UI):
     Item     data-open  data-disabled
     Trigger  data-open  data-disabled
     Panel    data-open  data-starting-style  data-ending-style
───────────────────────────────────────────────────────────────────────────── */

type AccordionVariant = 'default' | 'bordered' | 'split'
type AccordionSize = 'sm' | 'default' | 'lg'

/* ── Context ─────────────────────────────────────────────────────────────── */

interface AccordionCtx {
  variant: AccordionVariant
  size: AccordionSize
  motionEnabled: boolean
}

const AccordionContext = React.createContext<AccordionCtx>({
  variant: 'default',
  size: 'default',
  motionEnabled: true,
})

/* ── Accordion (Root) ────────────────────────────────────────────────────── */

export interface AccordionProps {
  /** Visual style of the accordion container */
  variant?: AccordionVariant
  /** Spacing and text scale */
  size?: AccordionSize
  /** Controlled open items (array of item values) */
  value?: (string | number)[]
  /** Initially open items in uncontrolled mode */
  defaultValue?: (string | number)[]
  /** Called when items open/close */
  onValueChange?: (value: (string | number)[]) => void
  /** Allow multiple items open simultaneously */
  multiple?: boolean
  /** Disable all items */
  disabled?: boolean
  className?: string
  children: React.ReactNode
}

export const Accordion = React.forwardRef<HTMLDivElement, AccordionProps>(
  (
    {
      variant = 'default',
      size = 'default',
      value,
      defaultValue,
      onValueChange,
      multiple = false,
      disabled,
      className,
      children,
    },
    ref,
  ) => {
    const { motionEnabled } = useMotion()

    return (
      <AccordionContext.Provider value={{ variant, size, motionEnabled }}>
        <BaseAccordion.Root
          ref={ref}
          value={value}
          defaultValue={defaultValue}
          onValueChange={(v) => onValueChange?.(v)}
          multiple={multiple}
          disabled={disabled}
          className={cn(
            'w-full',
            variant === 'default' && 'divide-y divide-border',
            variant === 'bordered' && [
              'border border-border rounded-md overflow-hidden',
              'divide-y divide-border',
            ],
            variant === 'split' && 'flex flex-col gap-2',
            className,
          )}
        >
          {children}
        </BaseAccordion.Root>
      </AccordionContext.Provider>
    )
  },
)
Accordion.displayName = 'Accordion'

/* ── AccordionItem ───────────────────────────────────────────────────────── */

export interface AccordionItemProps {
  /** Unique value identifying this item */
  value: string | number
  /** Trigger label — can be a string or any ReactNode */
  title: React.ReactNode
  /** Subtitle shown below the title in the trigger */
  subtitle?: React.ReactNode
  /** Disable this specific item */
  disabled?: boolean
  className?: string
  children: React.ReactNode
}

export const AccordionItem = React.forwardRef<HTMLDivElement, AccordionItemProps>(
  ({ value, title, subtitle, disabled, className, children }, ref) => {
    const { variant, size, motionEnabled } = React.useContext(AccordionContext)

    const px = size === 'sm' ? 'px-3' : size === 'lg' ? 'px-5' : 'px-4'
    const py = size === 'sm' ? 'py-2.5' : size === 'lg' ? 'py-5' : 'py-4'
    const titleSize = size === 'sm' ? 'text-sm' : size === 'lg' ? 'text-base' : 'text-sm'

    return (
      <BaseAccordion.Item
        ref={ref}
        value={value}
        disabled={disabled}
        className={cn(
          'group',
          variant === 'split' && 'border border-border rounded-md overflow-hidden',
          'data-disabled:pointer-events-none data-disabled:opacity-50',
          className,
        )}
      >
        {/* ── Trigger ──────────────────────────────────────────────────── */}
        <BaseAccordion.Header className="flex">
          <BaseAccordion.Trigger
            className={cn(
              'flex w-full items-center justify-between gap-3',
              px,
              py,
              titleSize,
              'font-medium text-foreground text-left',
              'outline-none cursor-pointer',
              // Focus ring (inset so it doesn't clash with item borders)
              'focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset',
              // Idle hover
              'hover:bg-muted/60',
              // Open state — teal-tinted bg
              'data-open:bg-accent/40',
              motionEnabled && 'transition-colors duration-150',
            )}
          >
            {/* Title + optional subtitle */}
            <span className="flex flex-col gap-0.5 flex-1 min-w-0">
              <span className="leading-snug">{title}</span>
              {subtitle && (
                <span className={cn('font-normal text-muted-foreground leading-snug', size === 'lg' ? 'text-sm' : 'text-xs')}>
                  {subtitle}
                </span>
              )}
            </span>

            {/* Chevron — rotates 180° when open */}
            <svg
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden
              className={cn(
                'size-4 shrink-0 text-muted-foreground',
                // Rotate via group data attribute
                'group-data-open:rotate-180',
                motionEnabled && 'transition-transform duration-200 ease-[cubic-bezier(0.4,0,0.2,1)]',
              )}
            >
              <polyline points="4 6 8 10 12 6" />
            </svg>
          </BaseAccordion.Trigger>
        </BaseAccordion.Header>

        {/* ── Panel ────────────────────────────────────────────────────── */}
        {/*
          Base UI sets --accordion-panel-height to the measured content height.
          We use it as a Tailwind arbitrary-value class so data-starting-style:h-0
          and data-ending-style:h-0 can override it (attribute selectors beat class
          selectors), giving us a clean 0 → auto → 0 height transition.
          Without motion, the panel has no height constraint so it shows instantly.
        */}
        <BaseAccordion.Panel
          className={cn(
            'overflow-hidden',
            motionEnabled && [
              'h-(--accordion-panel-height)',
              'transition-[height] duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]',
              'data-starting-style:h-0',
              'data-ending-style:h-0',
            ],
          )}
        >
          {/* Inner padded content */}
          <div
            className={cn(
              px,
              'pb-4 pt-0',
              'text-sm text-muted-foreground leading-relaxed',
            )}
          >
            {children}
          </div>
        </BaseAccordion.Panel>
      </BaseAccordion.Item>
    )
  },
)
AccordionItem.displayName = 'AccordionItem'
