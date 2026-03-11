import * as React from 'react'
import { cn } from '../../lib/utils'
import { Container } from '../container'

export interface NavbarProps extends React.HTMLAttributes<HTMLElement> {
  /** Content to render on the left side (logo, nav links, etc.) */
  left?: React.ReactNode
  /** Content to render on the right side */
  right?: React.ReactNode
}

export function Navbar({ left, right, className, children, ...props }: NavbarProps) {
  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full',
        'bg-background/60 backdrop-blur-md',
        'border-b border-border/50',
        className,
      )}
      {...props}
    >
      <Container className="flex h-14 items-center justify-between gap-4">
        <div className="flex items-center gap-6">{left}</div>
        <div className="flex items-center gap-2">{right ?? children}</div>
      </Container>
    </header>
  )
}
