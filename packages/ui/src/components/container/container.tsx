import * as React from 'react'
import { cn } from '../../lib/utils'

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Render as a different element, e.g. "section", "main", "header" */
  as?: React.ElementType
}

export function Container({ as: Component = 'div', className, children, ...props }: ContainerProps) {
  return (
    <Component
      className={cn('mx-auto w-full max-w-page px-6', className)}
      {...props}
    >
      {children}
    </Component>
  )
}


