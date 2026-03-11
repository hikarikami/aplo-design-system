import { cn } from '@aplo/ui'

interface PreviewProps {
  children: React.ReactNode
  className?: string
  /** Center content horizontally and vertically (default: true) */
  centered?: boolean
}

export function Preview({ children, className, centered = true }: PreviewProps) {
  return (
    <div
      className={cn(
        'rounded-lg border border-border bg-card min-h-32 p-8',
        centered && 'flex items-center justify-center',
        className,
      )}
    >
      {children}
    </div>
  )
}
