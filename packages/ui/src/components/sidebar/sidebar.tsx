import * as React from 'react'
import { Collapsible } from '@base-ui-components/react/collapsible'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '../../lib/utils'
import { useMotion } from '../../lib/motion'

export interface SidebarProps {
  /** Nav/content to render inside the expanded panel */
  children?: React.ReactNode
  /** Whether the sidebar starts open. Default: true */
  defaultOpen?: boolean
  className?: string
}

export function Sidebar({ children, defaultOpen = true, className }: SidebarProps) {
  const [open, setOpen] = React.useState(defaultOpen)
  const { motionEnabled } = useMotion()

  return (
    <Collapsible.Root open={open} onOpenChange={setOpen}>
      <aside
        className={cn(
          'sticky top-14 shrink-0 self-start h-[calc(100vh-3.5rem)]',
          'bg-background/80 backdrop-blur-md',
          'border-r border-border/50',
          'flex flex-col overflow-hidden',
          motionEnabled && 'transition-[width] duration-300 ease-in-out-expo',
          open ? 'w-64' : 'w-10',
          className,
        )}
      >
        {/* ── Toggle row ── */}
        <div
          className={cn(
            'flex h-11 shrink-0 items-center border-b border-border/50',
            open ? 'justify-end px-2' : 'justify-center',
          )}
        >
          <Collapsible.Trigger
            aria-label={open ? 'Collapse sidebar' : 'Expand sidebar'}
            className={cn(
              'inline-flex items-center justify-center rounded-md',
              'size-8 text-muted-foreground',
              'hover:bg-secondary hover:text-foreground',
              'outline-none focus-visible:ring-2 focus-visible:ring-ring',
              motionEnabled && 'transition-colors duration-150',
            )}
          >
            {open
              ? <ChevronLeft className="size-4" />
              : <ChevronRight className="size-4" />
            }
          </Collapsible.Trigger>
        </div>

        {/* ── Scrollable content ──
            Width is pinned at w-64 so text never reflows during the animation;
            the overflow-hidden container clips it cleanly. */}
        <div
          className={cn(
            'flex-1 overflow-y-auto overflow-x-hidden w-64',
            motionEnabled && 'transition-opacity duration-200 ease-in-out-expo',
            open ? 'opacity-100' : 'opacity-0 pointer-events-none',
          )}
          aria-hidden={!open}
        >
          {children}
        </div>
      </aside>
    </Collapsible.Root>
  )
}
