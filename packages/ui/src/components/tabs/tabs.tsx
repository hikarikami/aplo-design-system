import * as React from 'react'
import { Tabs as BaseTabs } from '@base-ui-components/react/tabs'
import { cn } from '../../lib/utils'
import { useMotion } from '../../lib/motion'

// ─── Context ──────────────────────────────────────────────────────────────────

interface TabsContextValue {
  variant: 'app' | 'bordered'
  size: 'sm' | 'default' | 'lg'
}

const TabsContext = React.createContext<TabsContextValue>({
  variant: 'app',
  size: 'default',
})

// ─── Tabs (Root) ──────────────────────────────────────────────────────────────

export interface TabsProps {
  /**
   * 'app'      — sliding pill indicator behind tabs; active tab has primary background.
   * 'bordered' — minimal text tabs; active tab has a sliding primary underline.
   * @default 'app'
   */
  variant?: 'app' | 'bordered'
  /** @default 'default' */
  size?: 'sm' | 'default' | 'lg'
  /** Controlled active value. */
  value?: any
  /** Uncontrolled default value. */
  defaultValue?: any
  onValueChange?: (value: any) => void
  orientation?: 'horizontal' | 'vertical'
  className?: string
  children?: React.ReactNode
}

export const Tabs = React.forwardRef<HTMLDivElement, TabsProps>(
  (
    {
      variant = 'app',
      size = 'default',
      className,
      onValueChange,
      children,
      ...props
    },
    ref,
  ) => (
    <TabsContext.Provider value={{ variant, size }}>
      <BaseTabs.Root
        ref={ref}
        className={cn('flex flex-col gap-4', className)}
        onValueChange={onValueChange ? (value) => onValueChange(value) : undefined}
        {...props}
      >
        {children}
      </BaseTabs.Root>
    </TabsContext.Provider>
  ),
)
Tabs.displayName = 'Tabs'

// ─── TabsList ─────────────────────────────────────────────────────────────────

export interface TabsListProps {
  /** Whether to change the active tab automatically on arrow-key focus. */
  activateOnFocus?: boolean
  /** Whether keyboard focus wraps around at the ends. @default true */
  loopFocus?: boolean
  className?: string
  children?: React.ReactNode
}

export const TabsList = React.forwardRef<HTMLDivElement, TabsListProps>(
  ({ className, children, ...props }, ref) => {
    const { variant } = React.useContext(TabsContext)
    const { motionEnabled } = useMotion()

    return (
      <BaseTabs.List
        ref={ref}
        className={cn(
          'relative',
          variant === 'app' && 'inline-flex items-center gap-1 rounded-lg p-1',
          variant === 'bordered' && 'flex items-center border-b border-border',
          className,
        )}
        {...props}
      >
        {/*
          App variant — sliding pill background.
          Rendered BEFORE children so it sits behind the tab buttons in DOM
          stacking order (positioned elements later in DOM appear on top).
        */}
        {variant === 'app' && (
          <BaseTabs.Indicator
            className={cn(
              'absolute z-0 bg-primary rounded-md shadow-sm',
              motionEnabled && 'transition-[left,top,width,height] duration-250 ease-in-out',
            )}
            style={{
              left:   'var(--active-tab-left)',
              top:    'var(--active-tab-top)',
              width:  'var(--active-tab-width)',
              height: 'var(--active-tab-height)',
            }}
          />
        )}

        {children}

        {/*
          Bordered variant — sliding underline.
          Rendered AFTER children so it overlaps the list's border-b.
        */}
        {variant === 'bordered' && (
          <BaseTabs.Indicator
            className={cn(
              'absolute -bottom-px h-0.5 bg-primary dark:bg-aplo-300 z-10',
              motionEnabled && 'transition-[left,width] duration-200 ease-in-out',
            )}
            style={{
              left:  'var(--active-tab-left)',
              width: 'var(--active-tab-width)',
            }}
          />
        )}
      </BaseTabs.List>
    )
  },
)
TabsList.displayName = 'TabsList'

// ─── Tab (individual trigger button) ──────────────────────────────────────────

export interface TabProps {
  /** Must match the value of the corresponding TabsPanel. */
  value: any
  disabled?: boolean
  className?: string
  children?: React.ReactNode
}

export const Tab = React.forwardRef<HTMLButtonElement, TabProps>(
  ({ value, disabled, className, children, ...props }, ref) => {
    const { variant, size } = React.useContext(TabsContext)
    const { motionEnabled } = useMotion()

    const appSizeClasses = {
      sm:      'h-7 px-2.5 text-xs',
      default: 'h-9 px-3.5 text-sm',
      lg:      'h-11 px-5 text-base',
    }[size]

    const borderedSizeClasses = {
      sm:      'px-3 pb-2 pt-1.5 text-xs',
      default: 'px-4 pb-3 pt-2 text-sm',
      lg:      'px-5 pb-3.5 pt-2.5 text-base',
    }[size]

    return (
      <BaseTabs.Tab
        ref={ref as React.Ref<HTMLButtonElement>}
        value={value}
        disabled={disabled}
        className={cn(
          // ── Shared base ──────────────────────────────────────────────────
          'inline-flex items-center justify-center whitespace-nowrap',
          'font-medium cursor-pointer select-none',
          'outline-none',
          'focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',
          'data-disabled:pointer-events-none data-disabled:opacity-40',

          // ── App variant ──────────────────────────────────────────────────
          // Tabs sit above the sliding indicator via DOM stacking (tabs come
          // after the indicator in the DOM). `relative z-10` makes this explicit.
          variant === 'app' && [
            'relative z-10 rounded-md',
            appSizeClasses,
            // inactive — transparent, muted text
            'text-foreground',
            // active — white text on top of the teal pill
            'data-active:text-primary-foreground data-active:font-semibold',
            // no text-color transition — the sliding indicator is the motion
          ],

          // ── Bordered variant ─────────────────────────────────────────────
          variant === 'bordered' && [
            borderedSizeClasses,
            // transparent bottom border reserves space so layout doesn't shift
            'text-muted-foreground hover:text-foreground',
            '-mb-px border-b-2 border-transparent',
            // active — primary text, lightened in dark mode
            'data-active:text-primary dark:data-active:text-aplo-300 data-active:font-medium',
            motionEnabled && '',
          ],

          className,
        )}
        {...props}
      >
        {children}
      </BaseTabs.Tab>
    )
  },
)
Tab.displayName = 'Tab'

// ─── TabsPanel ────────────────────────────────────────────────────────────────

export interface TabsPanelProps {
  /** Must match the value of the corresponding Tab. */
  value: any
  /**
   * Keep the panel in the DOM when it is not active.
   * Useful if the panel contains stateful content. @default false
   */
  keepMounted?: boolean
  className?: string
  children?: React.ReactNode
}

export const TabsPanel = React.forwardRef<HTMLDivElement, TabsPanelProps>(
  ({ value, keepMounted = false, className, children, ...props }, ref) => (
    <BaseTabs.Panel
      ref={ref}
      value={value}
      keepMounted={keepMounted}
      className={cn(
        'outline-none',
        'focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',
        'data-hidden:hidden',
        className,
      )}
      {...props}
    >
      {children}
    </BaseTabs.Panel>
  ),
)
TabsPanel.displayName = 'TabsPanel'
