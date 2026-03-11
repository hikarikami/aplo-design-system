import * as React from 'react'
import { RadioGroup as BaseRadioGroup } from '@base-ui-components/react/radio-group'
import { Radio as BaseRadio } from '@base-ui-components/react/radio'
import { cn } from '../../lib/utils'
import { useMotion } from '../../lib/motion'

// ─── RadioGroup ──────────────────────────────────────────────────────────────
// Provides shared selection state for all Radio / RadioCard children.

export interface RadioGroupProps {
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  disabled?: boolean
  readOnly?: boolean
  required?: boolean
  name?: string
  /** Layout direction for child radios. Defaults to 'vertical'. */
  orientation?: 'horizontal' | 'vertical'
  className?: string
  children: React.ReactNode
}

export const RadioGroup = React.forwardRef<HTMLDivElement, RadioGroupProps>(
  ({ orientation = 'vertical', className, children, onValueChange, ...props }, ref) => (
    <BaseRadioGroup
      ref={ref as React.Ref<HTMLDivElement>}
      className={cn(
        'flex',
        orientation === 'horizontal' ? 'flex-row flex-wrap gap-x-6 gap-y-3' : 'flex-col gap-2',
        className,
      )}
      onValueChange={onValueChange ? (value) => onValueChange(value as string) : undefined}
      {...props}
    >
      {children}
    </BaseRadioGroup>
  ),
)
RadioGroup.displayName = 'RadioGroup'

// ─── Radio ───────────────────────────────────────────────────────────────────
// Standard radio button. Always place inside a RadioGroup.

export interface RadioProps {
  /** Must match a value in the parent RadioGroup. */
  value: string
  disabled?: boolean
  size?: 'sm' | 'default'
  /**
   * 'dot'   (default) — filled circle scales in when selected.
   * 'check'           — circle fills with primary and shows a white checkmark,
   *                     matching the RadioCard indicator style.
   */
  indicator?: 'dot' | 'check'
  className?: string
  /** Label rendered beside the indicator. */
  children?: React.ReactNode
}

export const Radio = React.forwardRef<HTMLElement, RadioProps>(
  ({ value, size = 'default', indicator = 'dot', disabled, className, children }, ref) => {
    const { motionEnabled } = useMotion()

    const s = {
      sm:      { root: 'size-4',  dot: 'size-1.5', check: 'size-2'   },
      default: { root: 'size-5',  dot: 'size-2',   check: 'size-2.5' },
    }[size]

    return (
      <label className="inline-flex items-center gap-2.5 cursor-pointer select-none data-disabled:cursor-not-allowed">
        <BaseRadio.Root
          ref={ref}
          value={value}
          disabled={disabled}
          className={cn(
            'relative inline-flex shrink-0 items-center justify-center rounded-full border-2',
            'outline-none focus-visible:ring-2 focus-visible:ring-ring',
            'focus-visible:ring-offset-2 focus-visible:ring-offset-background',
            'border-border bg-background hover:border-primary/60',
            'data-checked:border-primary',
            // check variant fills the circle on selection
            indicator === 'check' && 'data-checked:bg-primary',
            'data-disabled:pointer-events-none data-disabled:opacity-50',
            s.root,
            motionEnabled && 'transition-colors duration-150',
            className,
          )}
        >
          {indicator === 'dot' ? (
            <BaseRadio.Indicator
              keepMounted
              className={cn(
                'rounded-full bg-primary',
                s.dot,
                'data-unchecked:scale-0 data-checked:scale-100',
                motionEnabled && 'transition-transform duration-200 ease-out',
              )}
            />
          ) : (
            // check — SVG uses currentColor; transparent text hides it when unchecked
            <BaseRadio.Indicator
              keepMounted
              className={cn(
                'flex items-center justify-center',
                'data-unchecked:text-transparent data-checked:text-primary-foreground',
                motionEnabled && 'transition-colors duration-150',
              )}
            >
              <svg
                viewBox="0 0 10 8"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden
                className={s.check}
              >
                <polyline points="1 4 3.5 6.5 9 1" />
              </svg>
            </BaseRadio.Indicator>
          )}
        </BaseRadio.Root>
        {children && (
          <span className="text-sm text-foreground leading-none">{children}</span>
        )}
      </label>
    )
  },
)
Radio.displayName = 'Radio'

// ─── RadioCard ───────────────────────────────────────────────────────────────
// Card-style radio for visually rich selections (e.g. plan pickers, style
// choosers). Always place inside a RadioGroup.
//
//  layout="list"  (default) — horizontal row: [thumb?] [text] [indicator]
//  layout="card"            — vertical stack:  [thumb?] [text]
//                             indicator floats absolute top-right corner

export interface RadioCardProps {
  /** Must match a value in the parent RadioGroup. */
  value: string
  disabled?: boolean
  /** Bold label shown in the card. */
  title?: string
  /** Muted supporting text shown below the title. */
  description?: string
  /**
   * URL of a thumbnail image. Renders as a small rounded square —
   * top-left in card layout, left side in list layout.
   */
  image?: string
  /**
   * Custom node for the image slot. Overrides the image prop.
   * Sized automatically to match the layout.
   */
  startContent?: React.ReactNode
  /**
   * 'list' (default) — horizontal flex; indicator at end of row.
   * 'card'           — vertical flex; indicator in absolute top-right corner.
   */
  layout?: 'list' | 'card'
  className?: string
  /** Replaces the default title/description slot with fully custom content. */
  children?: React.ReactNode
}

export const RadioCard = React.forwardRef<HTMLElement, RadioCardProps>(
  (
    {
      value,
      disabled,
      title,
      description,
      image,
      startContent,
      layout = 'list',
      className,
      children,
    },
    ref,
  ) => {
    const { motionEnabled } = useMotion()
    const isCard = layout === 'card'

    // Resolve the thumbnail: explicit startContent wins over image URL
    const thumb = startContent ?? (
      image
        ? <img src={image} alt="" className="size-full object-cover" />
        : null
    )

    return (
      <BaseRadio.Root
        ref={ref}
        value={value}
        disabled={disabled}
        render={<div />}
        className={cn(
          // Base card — neutral, minimal border
          'relative cursor-pointer select-none rounded-lg border border-border bg-card text-card-foreground',
          'outline-none focus-visible:ring-2 focus-visible:ring-ring',
          'focus-visible:ring-offset-2 focus-visible:ring-offset-background',
          'hover:border-muted-foreground/50',
          // Selected — primary border, very subtle bg shift
          'data-checked:border-primary data-checked:bg-secondary/40',
          // Disabled
          'data-disabled:pointer-events-none data-disabled:opacity-50',
          // Layout
          isCard
            ? 'flex flex-col gap-2.5 p-4'
            : 'flex flex-row items-center gap-3 p-3.5',
          motionEnabled && 'transition-colors duration-150',
          className,
        )}
      >
        {/* Thumbnail — small fixed size, not stretched */}
        {thumb && (
          <div
            className={cn(
              'shrink-0 overflow-hidden rounded-md bg-muted',
              isCard ? 'size-14' : 'size-9',
            )}
          >
            {thumb}
          </div>
        )}

        {/* Text content */}
        {(title || description || children) && (
          <div className={cn('min-w-0', !isCard && 'flex-1')}>
            {children ?? (
              <>
                {title && (
                  <p className="text-sm font-semibold text-foreground leading-snug">
                    {title}
                  </p>
                )}
                {description && (
                  <p className={cn(
                    'text-sm text-muted-foreground leading-snug',
                    title && 'mt-0.5',
                  )}>
                    {description}
                  </p>
                )}
              </>
            )}
          </div>
        )}

        {/*
          Selection indicator — empty ring when unchecked, filled primary
          circle with a white checkmark when checked.

          The checkmark SVG uses currentColor. data-unchecked:text-transparent
          makes the stroke invisible without removing it from the DOM, avoiding
          the need for a child-state selector.
        */}
        <BaseRadio.Indicator
          keepMounted
          className={cn(
            'flex shrink-0 items-center justify-center rounded-full border size-4.5',
            'data-unchecked:border-border data-unchecked:bg-transparent data-unchecked:text-transparent',
            'data-checked:border-primary data-checked:bg-primary data-checked:text-primary-foreground',
            isCard && 'absolute top-3 right-3',
            motionEnabled && 'transition-colors duration-150',
          )}
        >
          <svg
            viewBox="0 0 10 8"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
            className="size-2.5"
          >
            <polyline points="1 4 3.5 6.5 9 1" />
          </svg>
        </BaseRadio.Indicator>
      </BaseRadio.Root>
    )
  },
)
RadioCard.displayName = 'RadioCard'
