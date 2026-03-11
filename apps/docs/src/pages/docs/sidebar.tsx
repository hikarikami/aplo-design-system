import { Container, PageHeader, Sidebar } from '@aplo/ui'

export default function SidebarDocs() {
  return (
    <Container className="py-16 space-y-16">

      <PageHeader
        id="sidebar"
        title="Sidebar"
        description={<>A collapsible sticky sidebar with glass styling that matches the Navbar. Accepts any children — nav links, section headers, or custom content. Width animates between <code className="text-xs bg-muted px-1.5 py-0.5 rounded">w-64</code> (open) and <code className="text-xs bg-muted px-1.5 py-0.5 rounded">w-10</code> (collapsed).</>}
      />

      <hr className="border-border" />

      <section id="examples" className="space-y-10">
        <SectionLabel>Examples</SectionLabel>

        {/* Default — starts open */}
        <div className="space-y-3">
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

        {/* Starts collapsed */}
        <div className="space-y-3">
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
      </section>

      <hr className="border-border" />

      <section id="usage" className="space-y-4">
        <SectionLabel>Usage</SectionLabel>
        <pre className="rounded-lg bg-card border border-border px-6 py-5 text-sm text-muted-foreground overflow-x-auto leading-relaxed">
          {`import { Sidebar } from '@aplo/ui'

// Wrap your page in a flex container, place Sidebar as a sibling to main.
// It sticks to the top of the viewport and collapses to an icon rail.

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
</div>`}
        </pre>
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

function DemoLink({ children, active }: { children: React.ReactNode; active?: boolean }) {
  return (
    <div className={`flex items-center rounded-md px-3 py-1.5 text-sm cursor-default ${active ? 'bg-secondary text-foreground font-medium' : 'text-muted-foreground'}`}>
      {children}
    </div>
  )
}
