import * as React from 'react'
import { cn } from '@/lib/utils'

export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  /** Matches the size prop used on Input / Select */
  size?: 'sm' | 'default' | 'lg'
}

export const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  ({ className, size = 'default', ...props }, ref) => (
    <label
      ref={ref}
      className={cn(
        'block font-medium text-foreground',
        size === 'sm' ? 'text-xs' : 'text-sm',
        className,
      )}
      {...props}
    />
  ),
)
Label.displayName = 'Label'
