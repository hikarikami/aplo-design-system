import { Moon } from 'lucide-react'
import { Button, Code, Container, Navbar, PageHeader } from '@aplo/ui'

export default function NavbarDocs() {
  return (
    <Container className="py-16 space-y-16">

      <PageHeader
        id="navbar"
        title="Navbar"
        description={<>A sticky, glass-effect navigation bar with two composable slots — <code className="text-xs bg-muted px-1.5 py-0.5 rounded">left</code> and <code className="text-xs bg-muted px-1.5 py-0.5 rounded">right</code>. Drop in a logo, nav links, or action buttons without touching the layout.</>}
      />

      <hr className="border-border" />

      <section id="examples" className="space-y-10">
        <SectionLabel>Examples</SectionLabel>

        {/* Logo only */}
        <div className="space-y-3">
          <p className="text-sm text-muted-foreground">Logo only</p>
          <div className="rounded-lg border border-border overflow-hidden">
            <Navbar
              className="static shadow-none"
              left={<span className="text-sm font-semibold tracking-wide">Aplo</span>}
            />
          </div>
        </div>

        {/* With nav links */}
        <div className="space-y-3">
          <p className="text-sm text-muted-foreground">With nav links</p>
          <div className="rounded-lg border border-border overflow-hidden">
            <Navbar
              className="static shadow-none"
              left={
                <>
                  <span className="text-sm font-semibold tracking-wide">Aplo</span>
                  <nav className="flex items-center gap-1">
                    <a href="#" className="rounded-md px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors duration-150">Home</a>
                    <a href="#" className="rounded-md px-3 py-1.5 text-sm text-foreground font-medium bg-secondary">Docs</a>
                    <a href="#" className="rounded-md px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors duration-150">Blog</a>
                  </nav>
                </>
              }
            />
          </div>
        </div>

        {/* With actions */}
        <div className="space-y-3">
          <p className="text-sm text-muted-foreground">With actions</p>
          <div className="rounded-lg border border-border overflow-hidden">
            <Navbar
              className="static shadow-none"
              left={<span className="text-sm font-semibold tracking-wide">Aplo</span>}
              right={
                <>
                  <Button variant="ghost" size="icon" aria-label="Toggle theme">
                    <Moon className="size-4" />
                  </Button>
                  <Button size="sm" variant="outline">Sign in</Button>
                  <Button size="sm">Get started</Button>
                </>
              }
            />
          </div>
        </div>
      </section>

      <hr className="border-border" />

      <section id="usage" className="space-y-4">
        <SectionLabel>Usage</SectionLabel>
        <Code>{`import { Navbar } from '@aplo/ui'

// left  — logo, brand text, nav links
// right — actions, toggles, auth buttons

<Navbar
  left={<span className="text-sm font-semibold">Aplo</span>}
  right={
    <>
      <Button variant="ghost" size="icon"><Moon /></Button>
      <Button size="sm">Get started</Button>
    </>
  }
/>`}</Code>
      </section>

    </Container>
  )
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
      {children}
    </h2>
  )
}
