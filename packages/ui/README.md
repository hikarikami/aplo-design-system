# @aplo/ui

Aplo Design System — React component library built with Base UI, Tailwind CSS v4, and TypeScript.

## Installation

```bash
npm install @aplo/ui
```

## Setup

### 1. Import styles

In your app entry file (e.g. `main.tsx`):

```tsx
import '@aplo/ui/styles'
```

Or in your CSS:

```css
@import '@aplo/ui/styles';
```

### 2. Wrap your app with `AploProvider`

```tsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@aplo/ui/styles'
import { AploProvider } from '@aplo/ui'
import App from './App'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AploProvider>
      <App />
    </AploProvider>
  </StrictMode>
)
```

`AploProvider` sets up theme (light/dark) and motion preferences. All `@aplo/ui` components must be rendered inside it.

## Usage

```tsx
import { Button, Input, Switch } from '@aplo/ui'

export function MyForm() {
  return (
    <form>
      <Input label="Email" placeholder="you@example.com" />
      <Button>Submit</Button>
    </form>
  )
}
```

## Providers

If you need individual providers (e.g. for custom nesting):

```tsx
import { ThemeProvider, MotionProvider } from '@aplo/ui'
```

### `useTheme`

```tsx
import { useTheme } from '@aplo/ui'

const { theme, setTheme } = useTheme()
// theme: 'light' | 'dark'
// setTheme('light') | setTheme('dark')
```

### `useMotion`

```tsx
import { useMotion } from '@aplo/ui'

const { motionEnabled, setMotionEnabled } = useMotion()
```

## Tailwind CSS

If you're using Tailwind CSS v4 in your project and want to use Aplo's theme variables (colors, spacing, etc.) in your own styles, import the theme directly instead of the prebuilt CSS:

```css
@import "tailwindcss";
@import "@aplo/ui/styles";
@source "./node_modules/@aplo/ui/dist";
```
