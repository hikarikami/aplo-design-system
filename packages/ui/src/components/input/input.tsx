import * as React from 'react'
import { Field } from '@base-ui-components/react/field'
import { Input as BaseInput } from '@base-ui-components/react/input'
import { cn } from '../../lib/utils'
import { useMotion } from '../../lib/motion'
import { Label } from '../../components/label'

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /** Label rendered above the input */
  label?: string
  /** Muted hint shown below the field; hidden when `error` is set */
  description?: string
  /** Red error copy; also marks the field invalid via Field.Root */
  error?: string
  /** Leading icon / element inside the left edge of the input */
  prefixIcon?: React.ReactNode
  /** Trailing icon / element inside the right edge of the input */
  suffixIcon?: React.ReactNode
  /** Visual + spacing scale */
  size?: 'sm' | 'default' | 'lg'
  /** Extra class names on the outermost Field.Root wrapper */
  containerClassName?: string
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      containerClassName,
      label,
      description,
      error,
      prefixIcon,
      suffixIcon,
      size = 'default',
      disabled,
      maxLength,
      defaultValue,
      value,
      onChange,
      onFocus,
      onBlur,
      id,
      ...props
    },
    ref,
  ) => {
    const { motionEnabled } = useMotion()
    const internalId = React.useId()
    const fieldId = id ?? internalId

    const controlled = value !== undefined
    const [focused,   setFocused  ] = React.useState(false)
    const [charCount, setCharCount] = React.useState<number>(() => {
      const initial = controlled ? value : defaultValue
      return typeof initial === 'string' ? initial.length : 0
    })

    React.useEffect(() => {
      if (controlled && typeof value === 'string') setCharCount(value.length)
    }, [controlled, value])

    const hasSuffix = !!(suffixIcon || maxLength != null)

    const wrapperH  = size === 'sm' ? 'h-9'  : size === 'lg' ? 'h-12' : 'h-10'
    const inputPad  = size === 'sm' ? 'py-2 text-xs'  : size === 'lg' ? 'py-3.5 text-base' : 'py-2.5 text-sm'
    const inputPx   = prefixIcon
      ? size === 'sm' ? 'pl-8'   : size === 'lg' ? 'pl-11'  : 'pl-9'
      : size === 'sm' ? 'px-3'   : size === 'lg' ? 'px-4'   : 'px-3.5'
    const prefixLeft = size === 'sm' ? 'left-2.5' : size === 'lg' ? 'left-3.5' : 'left-3'
    const prefixSize = size === 'sm' ? 'size-3.5' : size === 'lg' ? 'size-5'   : 'size-4'
    const suffixRight = size === 'sm' ? 'right-2.5' : size === 'lg' ? 'right-3.5' : 'right-3'
    const countText   = size === 'sm' ? 'text-[10px]' : 'text-xs'

    return (
      <Field.Root
        invalid={!!error}
        disabled={disabled}
        className={cn('w-full space-y-1.5', containerClassName)}
      >
        {/* ── Label ───────────────────────────────────────────────────── */}
        {label && (
          <Label htmlFor={fieldId} size={size}>
            {label}
          </Label>
        )}

        {/* ── Input chrome ────────────────────────────────────────────── */}
        <div
          className={cn(
            'relative overflow-hidden rounded-md border bg-card',
            wrapperH,
            !error  && 'border-border',
            !error  && focused && 'border-primary',
            !!error && 'border-destructive',
            focused && !error && 'shadow-[0_0_0_3px_hsl(179_100%_21%/0.12)]',
            disabled && 'pointer-events-none opacity-50',
            motionEnabled && 'transition-[border-color,box-shadow] duration-200',
          )}
        >
          {/* Prefix icon */}
          {prefixIcon && (
            <div
              aria-hidden
              className={cn(
                'absolute top-1/2 -translate-y-1/2 flex items-center justify-center text-muted-foreground',
                prefixLeft,
                prefixSize,
                focused && 'text-primary/70',
                motionEnabled && 'transition-colors duration-200',
              )}
            >
              {prefixIcon}
            </div>
          )}

          <BaseInput
            ref={ref}
            id={fieldId}
            value={controlled ? value : undefined}
            defaultValue={!controlled ? defaultValue : undefined}
            maxLength={maxLength}
            disabled={disabled}
            className={cn(
              'w-full h-full bg-transparent text-foreground',
              'outline-none border-0 ring-0',
              'placeholder:text-muted-foreground/60',
              inputPad,
              inputPx,
              hasSuffix && (size === 'sm' ? 'pr-8' : size === 'lg' ? 'pr-12' : 'pr-10'),
              'disabled:cursor-not-allowed',
              className,
            )}
            onFocus={(e) => { setFocused(true);  onFocus?.(e) }}
            onBlur={(e)  => { setFocused(false); onBlur?.(e)  }}
            onChange={(e) => {
              if (!controlled) setCharCount(e.target.value.length)
              onChange?.(e)
            }}
            {...props}
          />

          {/* Suffix — trailing icon + countdown */}
          {hasSuffix && (
            <div
              aria-hidden
              className={cn(
                'absolute top-1/2 -translate-y-1/2 flex items-center gap-1.5 pointer-events-none text-muted-foreground',
                suffixRight,
              )}
            >
              {maxLength != null && (
                <span
                  className={cn(
                    'tabular-nums font-mono leading-none',
                    countText,
                    charCount >= maxLength
                      ? 'text-destructive font-semibold'
                      : charCount / maxLength >= 0.9
                      ? 'text-amber-500'
                      : '',
                  )}
                >
                  {maxLength - charCount}
                </span>
              )}
              {suffixIcon && (
                <span className={cn(prefixSize, 'flex items-center justify-center')}>
                  {suffixIcon}
                </span>
              )}
            </div>
          )}
        </div>

        {/* ── Description ─────────────────────────────────────────────── */}
        {description && !error && (
          <Field.Description className="text-xs text-muted-foreground">
            {description}
          </Field.Description>
        )}

        {/* ── Error ───────────────────────────────────────────────────── */}
        {error && (
          <Field.Error
            match={true}
            className="flex items-center gap-1.5 text-xs text-destructive"
          >
            <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden className="size-3 shrink-0 mt-px">
              <path d="M8 1.333 1.333 14h13.334L8 1.333Zm0 8.334a.667.667 0 1 1 0 1.333.667.667 0 0 1 0-1.333Zm-.667-4h1.334v3.333H7.333V5.667Z" />
            </svg>
            {error}
          </Field.Error>
        )}
      </Field.Root>
    )
  },
)

Input.displayName = 'Input'

export { Input }
