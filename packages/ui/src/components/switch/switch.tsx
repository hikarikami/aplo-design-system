import * as React from 'react'
import { Switch as BaseSwitch } from '@base-ui-components/react/switch'
import { cn } from '@/lib/utils'
import { useMotion } from '@/lib/motion'

export interface SwitchProps {
  checked?: boolean
  defaultChecked?: boolean
  onCheckedChange?: (checked: boolean) => void
  disabled?: boolean
  readOnly?: boolean
  required?: boolean
  size?: 'sm' | 'default'
  name?: string
  id?: string
  className?: string
}

export const Switch = React.forwardRef<HTMLElement, SwitchProps>(
  (
    {
      checked,
      defaultChecked = false,
      onCheckedChange,
      size = 'default',
      disabled,
      className,
      ...props
    },
    ref,
  ) => {
    const { motionEnabled } = useMotion()

    const sizes = {
      sm:      { track: 'h-5 w-9', thumb: 'size-4', translate: 'data-checked:translate-x-4' },
      default: { track: 'h-6 w-11', thumb: 'size-5', translate: 'data-checked:translate-x-5' },
    }[size]

    return (
      <BaseSwitch.Root
        ref={ref}
        checked={checked}
        defaultChecked={defaultChecked}
        disabled={disabled}
        onCheckedChange={(next) => onCheckedChange?.(next)}
        className={cn(
          // Track
          'relative inline-flex shrink-0 rounded-full border-2 border-transparent',
          // Focus ring
          'outline-none focus-visible:ring-2 focus-visible:ring-ring',
          'focus-visible:ring-offset-2 focus-visible:ring-offset-background',
          // Disabled
          'data-disabled:cursor-not-allowed data-disabled:opacity-50',
          // State colour
          'bg-muted data-checked:bg-primary',
          sizes.track,
          motionEnabled && 'transition-colors duration-200',
          className,
        )}
        {...props}
      >
        <BaseSwitch.Thumb
          className={cn(
            'block rounded-full bg-white shadow-sm',
            'translate-x-0',
            sizes.thumb,
            sizes.translate,
            motionEnabled && 'transition-transform duration-200',
          )}
        />
      </BaseSwitch.Root>
    )
  },
)
Switch.displayName = 'Switch'
