import { Code, PageHeader } from '@aplo/ui'
import { DocPage, DocSection } from '@/components/doc-page'

const TOC = [
  { id: 'overview', label: 'Overview' },
  { id: 'theme-provider', label: 'ThemeProvider' },
  { id: 'use-theme', label: 'useTheme' },
  { id: 'motion-provider', label: 'MotionProvider' },
  { id: 'use-motion', label: 'useMotion' },
  { id: 'setup', label: 'App Setup' },
]

export default function ThemingDocs() {
  return (
    <DocPage toc={TOC}>

      <PageHeader
        title="Theming & Motion"
        description="ThemeProvider and MotionProvider are lightweight React context wrappers that manage light/dark mode and animation preferences across your app. Both persist user choices to localStorage and respect OS-level settings by default."
      />

      <DocSection id="overview" title="Overview">
        <div className="space-y-3 text-sm text-muted-foreground">
          <p>
            Wrap your app once with both providers. All <code className="text-xs bg-muted px-1.5 py-0.5 rounded">@aplo/ui</code> components read from these contexts automatically — you don't need to pass theme or motion props anywhere.
          </p>
          <p>
            <strong className="text-foreground">Theme</strong> toggles a <code className="text-xs bg-muted px-1.5 py-0.5 rounded">.dark</code> class on <code className="text-xs bg-muted px-1.5 py-0.5 rounded">{'<html>'}</code>, which activates the <code className="text-xs bg-muted px-1.5 py-0.5 rounded">dark:</code> Tailwind variant across all components.{' '}
            <strong className="text-foreground">Motion</strong> exposes a boolean your animated components can gate on, defaulting to the OS <code className="text-xs bg-muted px-1.5 py-0.5 rounded">prefers-reduced-motion</code> setting.
          </p>
        </div>
      </DocSection>

      <DocSection id="theme-provider" title="ThemeProvider">
        <div className="space-y-3 text-sm text-muted-foreground mb-4">
          <p>
            Reads the initial theme from <code className="text-xs bg-muted px-1.5 py-0.5 rounded">localStorage</code> (key: <code className="text-xs bg-muted px-1.5 py-0.5 rounded">aplo-theme</code>), defaulting to <code className="text-xs bg-muted px-1.5 py-0.5 rounded">'dark'</code>. On every theme change it writes back to <code className="text-xs bg-muted px-1.5 py-0.5 rounded">localStorage</code> and toggles the <code className="text-xs bg-muted px-1.5 py-0.5 rounded">.dark</code> class on <code className="text-xs bg-muted px-1.5 py-0.5 rounded">document.documentElement</code>.
          </p>
        </div>
        <Code language="tsx">{`import { ThemeProvider } from '@aplo/ui'

export function App() {
  return (
    <ThemeProvider>
      {/* your app */}
    </ThemeProvider>
  )
}`}</Code>
      </DocSection>

      <DocSection id="use-theme" title="useTheme">
        <div className="space-y-3 text-sm text-muted-foreground mb-4">
          <p>
            Returns <code className="text-xs bg-muted px-1.5 py-0.5 rounded">{'{ theme, setTheme }'}</code> where <code className="text-xs bg-muted px-1.5 py-0.5 rounded">theme</code> is <code className="text-xs bg-muted px-1.5 py-0.5 rounded">'light' | 'dark'</code>. Must be called inside a <code className="text-xs bg-muted px-1.5 py-0.5 rounded">ThemeProvider</code>.
          </p>
        </div>
        <Code language="tsx">{`import { useTheme, Button } from '@aplo/ui'
import { Moon, Sun } from 'lucide-react'

function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label="Toggle theme"
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
    >
      {theme === 'dark' ? <Sun className="size-4" /> : <Moon className="size-4" />}
    </Button>
  )
}`}</Code>
      </DocSection>

      <DocSection id="motion-provider" title="MotionProvider">
        <div className="space-y-3 text-sm text-muted-foreground mb-4">
          <p>
            Reads from <code className="text-xs bg-muted px-1.5 py-0.5 rounded">localStorage</code> (key: <code className="text-xs bg-muted px-1.5 py-0.5 rounded">aplo-motion</code>) first. If no stored preference exists, it checks the OS <code className="text-xs bg-muted px-1.5 py-0.5 rounded">prefers-reduced-motion</code> media query — motion is enabled by default unless the OS requests reduced motion. It also listens for OS preference changes in real time and updates accordingly, unless the user has set an explicit override.
          </p>
        </div>
        <Code language="tsx">{`import { MotionProvider } from '@aplo/ui'

export function App() {
  return (
    <MotionProvider>
      {/* your app */}
    </MotionProvider>
  )
}`}</Code>
      </DocSection>

      <DocSection id="use-motion" title="useMotion">
        <div className="space-y-3 text-sm text-muted-foreground mb-4">
          <p>
            Returns <code className="text-xs bg-muted px-1.5 py-0.5 rounded">{'{ motionEnabled, setMotionEnabled }'}</code>. Use <code className="text-xs bg-muted px-1.5 py-0.5 rounded">motionEnabled</code> to gate animations in your own components. Must be called inside a <code className="text-xs bg-muted px-1.5 py-0.5 rounded">MotionProvider</code>.
          </p>
        </div>
        <Code language="tsx">{`import { useMotion, Switch } from '@aplo/ui'

function MotionToggle() {
  const { motionEnabled, setMotionEnabled } = useMotion()
  return (
    <label className="flex items-center gap-2 cursor-pointer select-none">
      <span className="text-sm text-muted-foreground">Animations</span>
      <Switch
        size="sm"
        checked={motionEnabled}
        onCheckedChange={setMotionEnabled}
        aria-label="Toggle animations"
      />
    </label>
  )
}

// Gate your own animations
function AnimatedCard() {
  const { motionEnabled } = useMotion()
  return (
    <div className={motionEnabled ? 'transition-all duration-300' : ''}>
      {/* content */}
    </div>
  )
}`}</Code>
      </DocSection>

      <DocSection id="setup" title="App Setup">
        <div className="text-sm text-muted-foreground mb-4">
          <p>Nest both providers at the root. Order doesn't matter — they are independent contexts.</p>
        </div>
        <Code language="tsx">{`import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ThemeProvider, MotionProvider } from '@aplo/ui'
import '@aplo/ui/styles'
import App from './App'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <MotionProvider>
        <App />
      </MotionProvider>
    </ThemeProvider>
  </StrictMode>
)`}</Code>
      </DocSection>

    </DocPage>
  )
}
