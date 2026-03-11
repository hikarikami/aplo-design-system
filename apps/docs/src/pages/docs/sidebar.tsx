import { Code, PageHeader, Sidebar } from '@aplo/ui'
import { DocPage, DocSection } from '@/components/doc-page'
import { PropsTable } from '@/components/props-table'

const TOC = [
  { id: 'installation', label: 'Installation' },
  { id: 'usage', label: 'Usage' },
  { id: 'examples', label: 'Examples' },
  { id: 'api', label: 'API Reference' },
]

export default function SidebarDocs() {
  return (
    <DocPage toc={TOC}>

      <PageHeader
        title="Sidebar"
        description="A collapsible sticky sidebar with glass styling that matches the Navbar. Width animates between 256px (open) and 40px (collapsed). Accepts any children."
      />

      <DocSection id="installation" title="Installation">
        <Code language="ts">{`import { Sidebar } from '@aplo/ui'`}</Code>
      </DocSection>

      <DocSection id="usage" title="Usage">
        <Code>{`// Wrap your page in a flex container, place Sidebar as a sibling to main.
<div className="flex">
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
        <div className="space-y-6">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Default (starts open)</p>
            <div className="h-52 flex rounded-lg border border-border overflow-hidden">
              <Sidebar className="static h-52 self-auto top-0">
                <div className="p-4 space-y-1">
                  <p className="px-3 mb-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                    Navigation
                  </p>
                  <DemoLink>Overview</DemoLink>
                  <DemoLink active>Components</DemoLink>
                  <DemoLink>Changelog</DemoLink>
                </div>
              </Sidebar>
              <div className="flex-1 flex items-center justify-center text-sm text-muted-foreground">
                Main content
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Starts collapsed</p>
            <div className="h-52 flex rounded-lg border border-border overflow-hidden">
              <Sidebar className="static h-52 self-auto top-0" defaultOpen={false}>
                <div className="p-4 space-y-1">
                  <DemoLink>Overview</DemoLink>
                  <DemoLink active>Components</DemoLink>
                  <DemoLink>Changelog</DemoLink>
                </div>
              </Sidebar>
              <div className="flex-1 flex items-center justify-center text-sm text-muted-foreground">
                Main content
              </div>
            </div>
          </div>
        </div>
      </DocSection>

      <DocSection id="api" title="API Reference">
        <PropsTable props={[
          { name: 'defaultOpen', type: 'boolean', default: 'true' },
          { name: 'children', type: 'ReactNode', default: '—' },
          { name: 'className', type: 'string', default: '—' },
        ]} />
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
