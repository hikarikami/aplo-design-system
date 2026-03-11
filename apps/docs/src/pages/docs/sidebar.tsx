import { Code, PageHeader, Sidebar } from '@aplo/ui'
import { DocPage, DocSection } from '@/components/doc-page'
import { PropsTable } from '@/components/props-table'
import { SidebarPropDefs } from '@/gen/component-props'
import { Preview } from '@/components/preview'

const TOC = [
  { id: 'installation', label: 'Installation' },
  { id: 'usage', label: 'Usage' },
  { id: 'examples', label: 'Examples' },
  { id: 'api', label: 'API Reference' },
]

export default function SidebarDocs() {
  return (
    <DocPage toc={TOC}>
      <PageHeader title="Sidebar" description="A collapsible sticky sidebar with glass styling that matches the Navbar. Width animates between 256px (open) and 40px (collapsed). Accepts any children." />

      <DocSection id="installation" title="Installation">
        <Code language="ts">{`import { Sidebar } from '@aplo/ui'`}</Code>
      </DocSection>

      <DocSection id="usage" title="Usage">
        <Code>{`<div className="flex">
  <Sidebar defaultOpen={true}>
    <nav className="p-4 space-y-1">
      <a href="/docs/button">Button</a>
      <a href="/docs/navbar">Navbar</a>
    </nav>
  </Sidebar>
  <main className="flex-1 min-w-0">
    {/* page content */}
  </main>
</div>`}</Code>
      </DocSection>

      <DocSection id="examples" title="Examples">
        <div className="space-y-4">
          <Preview centered={false} className="p-0 overflow-hidden">
            <div className="px-4 pt-3 pb-2"><p className="text-xs text-muted-foreground">Default (starts open)</p></div>
            <div className="h-52 flex border-t border-border">
              <Sidebar className="static h-52 self-auto top-0">
                <div className="p-4 space-y-1">
                  <p className="px-3 mb-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">Navigation</p>
                  <DemoLink>Overview</DemoLink>
                  <DemoLink active>Components</DemoLink>
                  <DemoLink>Changelog</DemoLink>
                </div>
              </Sidebar>
              <div className="flex-1 flex items-center justify-center text-sm text-muted-foreground">Main content</div>
            </div>
          </Preview>

          <Preview centered={false} className="p-0 overflow-hidden">
            <div className="px-4 pt-3 pb-2"><p className="text-xs text-muted-foreground">Starts collapsed</p></div>
            <div className="h-52 flex border-t border-border">
              <Sidebar className="static h-52 self-auto top-0" defaultOpen={false}>
                <div className="p-4 space-y-1"><DemoLink>Overview</DemoLink><DemoLink active>Components</DemoLink><DemoLink>Changelog</DemoLink></div>
              </Sidebar>
              <div className="flex-1 flex items-center justify-center text-sm text-muted-foreground">Main content</div>
            </div>
          </Preview>
        </div>
      </DocSection>

      <DocSection id="api" title="API Reference">
        <PropsTable props={SidebarPropDefs} />
      </DocSection>
    </DocPage>
  )
}

function DemoLink({ children, active }: { children: React.ReactNode; active?: boolean }) {
  return (
    <div className={`flex items-center rounded-md px-3 py-1.5 text-sm cursor-default ${active ? 'bg-secondary text-foreground font-medium' : 'text-muted-foreground'}`}>
      {children}
    </div>
  )
}
