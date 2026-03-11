import { Moon } from 'lucide-react'
import { Button, Code, Navbar, PageHeader } from '@aplo/ui'
import { DocPage, DocSection } from '@/components/doc-page'
import { PropsTable } from '@/components/props-table'
import { NavbarPropDefs } from '@/gen/component-props'
import { Preview } from '@/components/preview'

const TOC = [
  { id: 'installation', label: 'Installation' },
  { id: 'usage', label: 'Usage' },
  { id: 'examples', label: 'Examples' },
  { id: 'api', label: 'API Reference' },
]

export default function NavbarDocs() {
  return (
    <DocPage toc={TOC}>
      <PageHeader title="Navbar" description="A sticky, glass-effect navigation bar with two composable slots — left and right. Drop in a logo, nav links, or action buttons without touching the layout." />

      <DocSection id="installation" title="Installation">
        <Code language="ts">{`import { Navbar } from '@aplo/ui'`}</Code>
      </DocSection>

      <DocSection id="usage" title="Usage">
        <Code>{`<Navbar
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
        <div className="space-y-4">
          <Preview centered={false} className="p-0 overflow-hidden">
            <div className="px-4 pt-3 pb-2"><p className="text-xs text-muted-foreground">Logo only</p></div>
            <Navbar className="static shadow-none" left={<span className="text-sm font-semibold tracking-wide">Aplo</span>} />
          </Preview>

          <Preview centered={false} className="p-0 overflow-hidden">
            <div className="px-4 pt-3 pb-2"><p className="text-xs text-muted-foreground">With nav links</p></div>
            <Navbar className="static shadow-none" left={<><span className="text-sm font-semibold tracking-wide">Aplo</span><nav className="flex items-center gap-1"><a href="#" className="rounded-md px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors duration-150">Home</a><a href="#" className="rounded-md px-3 py-1.5 text-sm text-foreground font-medium bg-secondary">Docs</a><a href="#" className="rounded-md px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors duration-150">Blog</a></nav></>} />
          </Preview>

          <Preview centered={false} className="p-0 overflow-hidden">
            <div className="px-4 pt-3 pb-2"><p className="text-xs text-muted-foreground">With actions</p></div>
            <Navbar className="static shadow-none" left={<span className="text-sm font-semibold tracking-wide">Aplo</span>} right={<><Button variant="ghost" size="icon" aria-label="Toggle theme"><Moon className="size-4" /></Button><Button size="sm" variant="outline">Sign in</Button><Button size="sm">Get started</Button></>} />
          </Preview>
        </div>
      </DocSection>

      <DocSection id="api" title="API Reference">
        <PropsTable props={NavbarPropDefs} />
      </DocSection>
    </DocPage>
  )
}
