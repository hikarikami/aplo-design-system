import { Moon, Sun } from 'lucide-react'
import { Navigate, NavLink, Route, Routes } from 'react-router-dom'
import { Button, Navbar, Switch, useTheme, useMotion, cn } from '@aplo/ui'
import HomePage from '@/pages/home'
import DocsLayout from '@/pages/docs'
import ButtonDocs from '@/pages/docs/button'
import NavbarDocs from '@/pages/docs/navbar'
import SidebarDocs from '@/pages/docs/sidebar'
import SwitchDocs from '@/pages/docs/switch'
import CheckboxDocs from '@/pages/docs/checkbox'
import RadioDocs from '@/pages/docs/radio'
import UploadDocs from '@/pages/docs/upload'
import InputDocs from '@/pages/docs/input'
import SelectDocs from '@/pages/docs/select'
import HeroDocs from '@/pages/docs/hero'
import AiPromptsDocs from '@/pages/docs/ai-prompts'
import CodeDocs from '@/pages/docs/code'
import ThemingDocs from '@/pages/docs/theming'

export default function App() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar
        left={<NavLinks />}
        right={<><MotionToggle /><ThemeToggle /></>}
      />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/docs" element={<DocsLayout />}>
          <Route index element={<Navigate to="button" replace />} />
          <Route path="button"  element={<ButtonDocs />} />
          <Route path="navbar"  element={<NavbarDocs />} />
          <Route path="sidebar" element={<SidebarDocs />} />
          <Route path="switch"  element={<SwitchDocs />} />
          <Route path="checkbox" element={<CheckboxDocs />} />
          <Route path="radio"    element={<RadioDocs />} />
          <Route path="upload"   element={<UploadDocs />} />
          <Route path="input"    element={<InputDocs />} />
          <Route path="select"   element={<SelectDocs />} />
          <Route path="hero"     element={<HeroDocs />} />
          <Route path="ai-prompts" element={<AiPromptsDocs />} />
          <Route path="code"       element={<CodeDocs />} />
          <Route path="theming"    element={<ThemingDocs />} />
        </Route>
      </Routes>
    </div>
  )
}

function NavLinks() {
  return (
    <>
      <span className="text-sm font-semibold tracking-wide">Aplo</span>
      <nav className="flex items-center gap-1">
        <NavLink
          to="/"
          end
          className={({ isActive }) => cn(
            'rounded-md px-3 py-1.5 text-sm transition-colors duration-150',
            isActive
              ? 'text-foreground font-medium'
              : 'text-muted-foreground hover:text-foreground hover:bg-secondary',
          )}
        >
          Home
        </NavLink>
        <NavLink
          to="/docs"
          className={({ isActive }) => cn(
            'rounded-md px-3 py-1.5 text-sm transition-colors duration-150',
            isActive
              ? 'text-foreground font-medium'
              : 'text-muted-foreground hover:text-foreground hover:bg-secondary',
          )}
        >
          Documentation
        </NavLink>
      </nav>
    </>
  )
}

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
}

function MotionToggle() {
  const { motionEnabled, setMotionEnabled } = useMotion()
  return (
    <label className="flex items-center gap-2 cursor-pointer select-none">
      <span className="text-xs text-muted-foreground">Motion</span>
      <Switch
        size="sm"
        checked={motionEnabled}
        onCheckedChange={setMotionEnabled}
        aria-label="Toggle animations"
      />
    </label>
  )
}
