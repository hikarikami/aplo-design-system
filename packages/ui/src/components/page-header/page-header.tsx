import * as React from 'react'
import { cn } from '../../lib/utils'

export interface PageHeaderProps extends React.HTMLAttributes<HTMLElement> {
  /** Main page title rendered as an <h1> */
  title: string
  /** Descriptive text below the title — accepts ReactNode for inline code/links */
  description?: React.ReactNode
  /** Optional small label above the title (eyebrow text) */
  eyebrow?: string
}

function PageHeader({ title, description, eyebrow, className, ...props }: PageHeaderProps) {
  return (
    <header className={cn(className)} {...props}>
      {eyebrow && (
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2">
          {eyebrow}
        </p>
      )}
      <h1 className="text-4xl font-bold tracking-tight">{title}</h1>
      {description && (
        <p className="mt-3 text-muted-foreground max-w-xl">{description}</p>
      )}
    </header>
  )
}

PageHeader.displayName = 'PageHeader'

export { PageHeader }
