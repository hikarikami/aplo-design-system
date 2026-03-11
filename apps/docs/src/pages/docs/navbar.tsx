import { Moon } from 'lucide-react'
import { Button, Code, Navbar, PageHeader } from '@aplo/ui'
import { DocPage, DocSection } from '@/components/doc-page'
import { PropsTable } from '@/components/props-table'

const TOC = [
  { id: 'installation', label: 'Installation' },
  { id: 'usage', label: 'Usage' },
  { id: 'examples', label: 'Examples' },
  { id: 'api', label: 'API Reference' },
]

export default function NavbarDocs() {
  return (
    <DocPage toc={TOC}>

      <PageHeader
        title="Navbar"
        description="A sticky, glass-effect navigation bar with two composable slots — left and right. Drop in a logo, nav links, or action buttons without touching the layout."
      />

      <DocSection id="installation" title="Installation">
        <Code language="ts">{`import { Navbar } from '@aplo/ui'`}</Code>
      </DocSection>

      <DocSection id="usage" title="Usage">
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
      </DocSection>

      <DocSection id="examples" title="Examples">
        <div className="space-y-6">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Logo only</p>
            <div className="rounded-lg border border-border overflow-hidden">
              <Navbar
                className="static shadow-none"
                left={<span className="text-sm font-semibold tracking-wide">Aplo</span>}
              />
            </div>
          </div>

          <div className="space-y-2">
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

          <div className="space-y-2">
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
        </div>
      </DocSection>

      <DocSection id="api" title="API Reference">
        <PropsTable props={[
          { name: 'left', type: 'ReactNode', default: '—' },
          { name: 'right', type: 'ReactNode', default: '—' },
          { name: 'className', type: 'string', default: '—' },
        ]} />
      </DocSection>

    </DocPage>
  )
}
