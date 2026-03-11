import * as React from 'react'
import { Checkbox as BaseCheckbox } from '@base-ui-components/react/checkbox'
import { cn } from '@/lib/utils'
import { useMotion } from '@/lib/motion'

export interface CheckboxProps {
  checked?: boolean
  defaultChecked?: boolean
  onCheckedChange?: (checked: boolean) => void
  indeterminate?: boolean
  disabled?: boolean
  readOnly?: boolean
  required?: boolean
  size?: 'sm' | 'default' | 'lg'
  name?: string
  value?: string
  id?: string
  className?: string
}

export const Checkbox = React.forwardRef<HTMLElement, CheckboxProps>(
  (
    {
      checked,
      defaultChecked = false,
      onCheckedChange,
      indeterminate = false,
      size = 'default',
      disabled,
      className,
      ...props
    },
    ref,
  ) => {
    const { motionEnabled } = useMotion()

    // Mirror checked state locally so the draw-in animation always has access
    // to the current value — needed whether controlled or uncontrolled.
    const [internalChecked, setInternalChecked] = React.useState(defaultChecked)
    const isControlled = checked !== undefined
    const currentChecked = isControlled ? checked : internalChecked

    const sizes = {
      sm:      { box: 'size-4', icon: 'size-2.5', dash: 'h-[2px] w-2' },
      default: { box: 'size-5', icon: 'size-3',   dash: 'h-[2px] w-2.5' },
      lg:      { box: 'size-6', icon: 'size-3.5', dash: 'h-[2px] w-3.5' },
    }[size]

    return (
      <BaseCheckbox.Root
        ref={ref}
        checked={isControlled ? checked : undefined}
        defaultChecked={isControlled ? undefined : defaultChecked}
        indeterminate={indeterminate}
        disabled={disabled}
        onCheckedChange={(next) => {
          if (!isControlled) setInternalChecked(next)
          onCheckedChange?.(next)
        }}
        className={cn(
          // Layout
          'relative inline-flex shrink-0 items-center justify-center rounded-sm border-2',
          // Focus ring
          'outline-none focus-visible:ring-2 focus-visible:ring-ring',
          'focus-visible:ring-offset-2 focus-visible:ring-offset-background',
          // Disabled
          'data-disabled:pointer-events-none data-disabled:opacity-50',
          // Idle state
          'border-border bg-background hover:border-primary/60',
          // Checked / indeterminate — fill with primary
          'data-checked:bg-primary data-checked:border-primary',
          'data-indeterminate:bg-primary data-indeterminate:border-primary',
          sizes.box,
          motionEnabled && 'transition-colors duration-150',
          className,
        )}
        {...props}
      >
        <BaseCheckbox.Indicator
          keepMounted
          className="flex items-center justify-center text-primary-foreground"
        >
          {!indeterminate ? (
            // Tick — draw-in via stroke-dashoffset when motion is on
            <svg
              viewBox="0 0 12 9"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden
              className={cn(
                'pointer-events-none',
                sizes.icon,
                currentChecked ? 'opacity-100' : 'opacity-0',
              )}
              style={
                motionEnabled
                  ? {
                      strokeDasharray: 30,
                      strokeDashoffset: currentChecked ? 0 : 30,
                      transition: currentChecked
                        ? 'stroke-dashoffset 0.28s cubic-bezier(0.16,1,0.3,1), opacity 0.15s ease'
                        : 'opacity 0.1s ease',
                    }
                  : undefined
              }
            >
              <polyline points="1 4.5 4.5 8 11 1" />
            </svg>
          ) : (
            // Dash — indeterminate state indicator
            <span
              aria-hidden
              className={cn('rounded-full bg-primary-foreground', sizes.dash)}
            />
          )}
        </BaseCheckbox.Indicator>
      </BaseCheckbox.Root>
    )
  },
)
Checkbox.displayName = 'Checkbox'
