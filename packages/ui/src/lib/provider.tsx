import * as React from 'react'
import { ThemeProvider } from './theme'
import { MotionProvider } from './motion'

export function AploProvider({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <MotionProvider>
        {children}
      </MotionProvider>
    </ThemeProvider>
  )
}
