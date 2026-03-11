import { createContext, useContext, useEffect, useState } from 'react'
import type { ReactNode } from 'react'

interface MotionContextValue {
  motionEnabled: boolean
  setMotionEnabled: (enabled: boolean) => void
}

const MotionContext = createContext<MotionContextValue | null>(null)

/** Returns true if the system prefers reduced motion */
function systemPrefersReduced(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export function MotionProvider({ children }: { children: ReactNode }) {
  const [motionEnabled, setMotionState] = useState<boolean>(() => {
    const stored = localStorage.getItem('aplo-motion')
    // Explicit user preference takes precedence; otherwise respect the OS setting
    if (stored !== null) return stored === 'true'
    return !systemPrefersReduced()
  })

  // Keep in sync when the OS preference changes (and the user hasn't overridden)
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    function handleChange(e: MediaQueryListEvent) {
      if (localStorage.getItem('aplo-motion') === null) {
        setMotionState(!e.matches)
      }
    }
    mq.addEventListener('change', handleChange)
    return () => mq.removeEventListener('change', handleChange)
  }, [])

  function setMotionEnabled(enabled: boolean) {
    localStorage.setItem('aplo-motion', String(enabled))
    setMotionState(enabled)
  }

  return (
    <MotionContext.Provider value={{ motionEnabled, setMotionEnabled }}>
      {children}
    </MotionContext.Provider>
  )
}

export function useMotion() {
  const ctx = useContext(MotionContext)
  if (!ctx) throw new Error('useMotion must be used within MotionProvider')
  return ctx
}
