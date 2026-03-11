import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../lib/utils'
import { createStippleRipple } from '../../lib/stipple-ripple'
import { useMotion } from '../../lib/motion'

/* ─────────────────────────────────────────────────────────────────────────────
   Button variants — Using Tailwind v4 Semantic Tokens
───────────────────────────────────────────────────────────────────────────── */
const buttonVariants = cva(
  [
    'isolate relative overflow-hidden hover:cursor-pointer',
    'inline-flex items-center justify-center gap-2 whitespace-nowrap',
    'font-medium tracking-wide text-sm',
    'rounded-md transition-all duration-200 ease-in-out',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',
    'disabled:cursor-not-allowed disabled:opacity-40',
    '[&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
  ],
  {
    variants: {
      variant: {
        primary:     'bg-primary text-primary-foreground  hover:bg-primary/90',
        secondary:   'bg-secondary text-secondary-foreground  hover:bg-secondary/80',
        outline:     'border border-primary bg-transparent text-primary dark:border-aplo-400 dark:text-aplo-300 hover:bg-accent hover:text-accent-foreground',
        ghost:       'bg-transparent text-foreground hover:bg-accent hover:text-accent-foreground',
        destructive: 'bg-destructive text-destructive-foreground sm hover:bg-destructive/90',
        link:        'bg-transparent text-primary dark:text-aplo-300 underline-offset-4 hover:underline p-0 h-auto',
      },
      size: {
        sm:        'h-8 px-3 text-xs',
        default:   'h-10 px-5 text-sm',
        lg:        'h-12 px-7 text-base',
        xl:        'h-14 px-9 text-base font-semibold tracking-wider',
        icon:      'h-10 w-10 p-0',
        'icon-sm': 'h-8 w-8 p-0',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'default',
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  loading?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      loading = false,
      disabled,
      asChild = false,
      onClick,
      children,
      ...props
    },
    ref,
  ) => {
    const { motionEnabled } = useMotion()

  const handleTriggerRipple = (e: React.MouseEvent<HTMLButtonElement>) => {
  if (variant === 'link' || !motionEnabled) return

  const el = e.currentTarget
  const rect = el.getBoundingClientRect()
  const style = getComputedStyle(el)

  let rippleColor = '128,128,128' // Default grey
  let opacity = 0.4

  if (variant === 'primary' || variant === 'destructive') {
    rippleColor = '255,255,255' // White for solid
    opacity = 0.85
  } else if (variant === 'ghost' || variant === 'outline') {
    // Pull the Teal from our CSS variable
    rippleColor = style.getPropertyValue('--ripple-color').trim() || '0,107,105'
    opacity = .70 // Higher opacity for teal as requested
  } else if (variant === 'secondary') {
    rippleColor = '128,128,128' // Explicitly grey for secondary
    opacity = 0.7
  }

  createStippleRipple(
    el,
    e.clientX - rect.left,
    e.clientY - rect.top,
    rippleColor,
    opacity
  )
}

    const mergedClassName = cn(
      buttonVariants({ variant, size }),
      motionEnabled && variant !== 'link' && 'active:scale-[0.98]',
      className
    )

    if (asChild && React.isValidElement(children)) {
      const child = children as React.ReactElement<any>
      return React.cloneElement(child, {
        ref,
        className: cn(mergedClassName, child.props.className),
        onClick: (e: React.MouseEvent<HTMLElement>) => {
          handleTriggerRipple(e as any)
          child.props.onClick?.(e)
          onClick?.(e as any)
        },
        ...props,
      })
    }

    return (
      <button
        ref={ref}
        type="button"
        disabled={disabled || loading}
        className={mergedClassName}
        onClick={(e) => {
          handleTriggerRipple(e)
          onClick?.(e)
        }}
        {...props}
      >
        <span className="relative z-2 inline-flex items-center gap-2">
          {loading && <LoadingSpinner />}
          {children}
        </span>
      </button>
    )
  }
)

Button.displayName = 'Button'

/* ─────────────────────────────────────────────────────────────────────────────
   Internal Spinner
───────────────────────────────────────────────────────────────────────────── */
function LoadingSpinner() {
  return (
    <svg
      className="animate-spin -ml-0.5 size-4 shrink-0"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
    </svg>
  )
}

export { Button, buttonVariants }