import { useEffect, useRef, useState } from 'react'
import { cn } from '@aplo/ui'

export interface TocItem {
  id: string
  label: string
}

interface DocPageProps {
  toc: TocItem[]
  children: React.ReactNode
}

export function DocPage({ toc, children }: DocPageProps) {
  const [activeId, setActiveId] = useState<string>('')
  const observerRef = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    observerRef.current?.disconnect()
    observerRef.current = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveId(entry.target.id)
        }
      },
      { rootMargin: '-10% 0% -80% 0%' }
    )
    toc.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) observerRef.current!.observe(el)
    })
    return () => observerRef.current?.disconnect()
  }, [toc])

  return (
    <div className="max-w-page mx-auto px-6 lg:px-10 py-12 flex gap-16">
      <div className="flex-1 min-w-0 space-y-12">
        {children}
      </div>

      <aside className="hidden xl:block w-44 shrink-0">
        <div className="sticky top-20 space-y-1.5">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">
            On This Page
          </p>
          {toc.map(({ id, label }) => (
            <a
              key={id}
              href={`#${id}`}
              className={cn(
                'block text-sm transition-colors duration-150 leading-snug',
                activeId === id
                  ? 'text-primary font-medium'
                  : 'text-muted-foreground hover:text-foreground',
              )}
            >
              {label}
            </a>
          ))}
        </div>
      </aside>
    </div>
  )
}

export function DocSection({
  id,
  title,
  children,
  className,
}: {
  id: string
  title: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <section id={id} className={cn('space-y-5', className)}>
      <h2 className="text-base font-semibold text-foreground border-b border-border pb-2">
        {title}
      </h2>
      {children}
    </section>
  )
}
