import * as React from 'react'
import { UploadCloud } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/button'

export interface FileUploadProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Called when a valid file is chosen via click, drag-drop, or paste */
  onFileSelect?: (file: File) => void
  /** Accepted MIME types — defaults to common image formats */
  accept?: string[]
  /** Max file size in MB */
  maxSizeMb?: number
  /** Primary label shown in the drop zone */
  label?: string
  /** Secondary hint line — auto-generated from accept/maxSizeMb if omitted */
  hint?: string
  /** Validation error message to display below the drop zone */
  error?: string
}

const FileUpload = React.forwardRef<HTMLDivElement, FileUploadProps>(
  (
    {
      className,
      onFileSelect,
      accept = ['image/jpeg', 'image/png', 'image/webp'],
      maxSizeMb = 10,
      label = 'Drop, paste, or click to browse',
      hint,
      error,
      ...props
    },
    ref,
  ) => {
    const inputRef = React.useRef<HTMLInputElement>(null)
    const [isDragging, setIsDragging] = React.useState(false)
    const [isHovering, setIsHovering] = React.useState(false)
    const [internalError, setInternalError] = React.useState<string | null>(null)

    const isActive = isDragging || isHovering
    const displayError = error ?? internalError

    const acceptStr = accept.join(',')
    const autoHint = `${accept.map(t => t.split('/')[1].toUpperCase()).join(', ')} · Max ${maxSizeMb} MB`

    function validate(file: File): boolean {
      setInternalError(null)
      const accepted = new Set(accept)
      if (accept.length && !accepted.has(file.type)) {
        setInternalError('Unsupported file type.')
        return false
      }
      if (file.size > maxSizeMb * 1024 * 1024) {
        setInternalError(`File must be under ${maxSizeMb} MB.`)
        return false
      }
      return true
    }

    function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
      const file = e.target.files?.[0]
      if (file && validate(file)) onFileSelect?.(file)
    }

    function handleDrop(e: React.DragEvent) {
      e.preventDefault()
      setIsDragging(false)
      const file = e.dataTransfer.files?.[0]
      if (file && validate(file)) onFileSelect?.(file)
    }

    React.useEffect(() => {
      function handlePaste(e: ClipboardEvent) {
        const item = Array.from(e.clipboardData?.items ?? []).find(i =>
          i.type.startsWith('image/'),
        )
        const file = item?.getAsFile()
        if (file && validate(file)) onFileSelect?.(file)
      }
      document.addEventListener('paste', handlePaste)
      return () => document.removeEventListener('paste', handlePaste)
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    return (
      <div ref={ref} className={cn('flex flex-col gap-3', className)} {...props}>
        {/* Drop zone */}
        <div
          role="button"
          tabIndex={0}
          aria-label="File upload area"
          className={cn(
            'relative overflow-hidden rounded-md transition-colors duration-200 cursor-pointer',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',
            isActive ? 'bg-primary/5' : 'bg-muted/40 hover:bg-muted/70',
          )}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
          onDragOver={e => { e.preventDefault(); setIsDragging(true) }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}
          onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') inputRef.current?.click() }}
        >
          {/* Marching ant SVG border */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              x="0"
              y="0"
              width="100%"
              height="100%"
              fill="none"
              rx="5"
              ry="5"
              strokeWidth="1.5"
              strokeDasharray="10 6"
              className={cn(
                'transition-[stroke] duration-300',
                isActive ? 'stroke-primary animate-march' : 'stroke-border',
              )}
            />
          </svg>

          {/* Content */}
          <div className="flex flex-col items-center gap-4 py-12 px-8 text-center">
            <div
              className={cn(
                'rounded-full p-3 transition-colors duration-200',
                isActive
                  ? 'bg-primary/10 text-primary'
                  : 'bg-secondary text-muted-foreground',
              )}
            >
              <UploadCloud className="size-6" />
            </div>

            <div className="space-y-1">
              <p className="text-sm font-medium text-foreground">{label}</p>
              <p className="text-xs text-muted-foreground">{hint ?? autoHint}</p>
            </div>

            <Button
              size="sm"
              variant="secondary"
              onClick={e => { e.stopPropagation(); inputRef.current?.click() }}
            >
              Choose file
            </Button>
          </div>
        </div>

        {displayError && (
          <p className="text-sm text-destructive">{displayError}</p>
        )}

        <input
          ref={inputRef}
          type="file"
          accept={acceptStr}
          className="sr-only"
          onChange={handleFileChange}
        />
      </div>
    )
  },
)

FileUpload.displayName = 'FileUpload'

export { FileUpload }
