import * as React from 'react'
import { cn } from '@/lib/utils'

export interface StackProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * Render as a different element. Defaults to 'div'.
   * Use 'section', 'article', etc. for semantic HTML.
   */
  as?: React.ElementType
}

/**
 * Stack — a layout primitive that guarantees this element paints above any
 * earlier Stack sibling, without manual z-index management.
 *
 * How it works: `isolation: isolate` (Tailwind `isolate`) creates a CSS
 * stacking context. Within the same parent, stacking contexts at the same
 * z-level are painted in DOM order — so a later Stack is always on top of
 * an earlier one. Children's z-indices are also safely scoped inside each
 * Stack and won't bleed into siblings.
 *
 * Usage:
 *   <Stack as="section" className="bg-background">
 *     <Container>...</Container>
 *   </Stack>
 */
export function Stack({ as: Component = 'div', className, children, ...props }: StackProps) {
  return (
    <Component className={cn('isolate', className)} {...props}>
      {children}
    </Component>
  )
}
