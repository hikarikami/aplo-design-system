import * as React from 'react'
import { Code, PageHeader, Tabs, TabsList, Tab, TabsPanel } from '@aplo/ui'
import { DocPage, DocSection } from '@/components/doc-page'
import { Preview } from '@/components/preview'

const TOC = [
  { id: 'installation', label: 'Installation' },
  { id: 'app',          label: 'App Variant'     },
  { id: 'bordered',     label: 'Bordered Variant' },
  { id: 'sizes',        label: 'Sizes'            },
  { id: 'controlled',   label: 'Controlled'       },
  { id: 'disabled',     label: 'Disabled Tab'     },
  { id: 'keep-mounted', label: 'keepMounted'      },
  { id: 'api',          label: 'API Reference'    },
]

export default function TabsDocs() {
  const [active, setActive] = React.useState('overview')

  return (
    <DocPage toc={TOC}>
      <PageHeader
        title="Tabs"
        description="Keyboard-navigable tab panels built on Base UI. Two variants — app and bordered — with full ARIA support and animated transitions."
      />

      {/* ── Installation ─────────────────────────────────────────────────── */}
      <DocSection id="installation" title="Installation">
        <Code language="ts">{`import { Tabs, TabsList, Tab, TabsPanel } from '@aplo/ui'`}</Code>
      </DocSection>

      {/* ── App Variant ──────────────────────────────────────────────────── */}
      <DocSection id="app" title="App Variant">
        <p className="text-sm text-muted-foreground mb-4">
          Toggle-button group style. Inactive tabs look like secondary buttons; the active tab
          uses the primary colour, making the selection immediately obvious.
        </p>
        <Preview>
          <Tabs defaultValue="overview" variant="app">
            <TabsList>
              <Tab value="overview">Overview</Tab>
              <Tab value="analytics">Analytics</Tab>
              <Tab value="settings">Settings</Tab>
            </TabsList>
            <TabsPanel value="overview">
              <p className="text-sm text-muted-foreground">Overview panel content goes here.</p>
            </TabsPanel>
            <TabsPanel value="analytics">
              <p className="text-sm text-muted-foreground">Analytics panel content goes here.</p>
            </TabsPanel>
            <TabsPanel value="settings">
              <p className="text-sm text-muted-foreground">Settings panel content goes here.</p>
            </TabsPanel>
          </Tabs>
        </Preview>
        <Code>{`<Tabs defaultValue="overview" variant="app">
  <TabsList>
    <Tab value="overview">Overview</Tab>
    <Tab value="analytics">Analytics</Tab>
    <Tab value="settings">Settings</Tab>
  </TabsList>
  <TabsPanel value="overview">Overview content</TabsPanel>
  <TabsPanel value="analytics">Analytics content</TabsPanel>
  <TabsPanel value="settings">Settings content</TabsPanel>
</Tabs>`}</Code>
      </DocSection>

      {/* ── Bordered Variant ─────────────────────────────────────────────── */}
      <DocSection id="bordered" title="Bordered Variant">
        <p className="text-sm text-muted-foreground mb-4">
          Minimal underline-style tabs. Inactive tabs display as plain text; the active tab
          gains a sliding primary-colour indicator that animates between selections.
        </p>
        <Preview>
          <Tabs defaultValue="files" variant="bordered">
            <TabsList>
              <Tab value="files">Files</Tab>
              <Tab value="shared">Shared</Tab>
              <Tab value="recent">Recent</Tab>
              <Tab value="starred">Starred</Tab>
            </TabsList>
            <TabsPanel value="files">
              <p className="text-sm text-muted-foreground">Your files are listed here.</p>
            </TabsPanel>
            <TabsPanel value="shared">
              <p className="text-sm text-muted-foreground">Files shared with you appear here.</p>
            </TabsPanel>
            <TabsPanel value="recent">
              <p className="text-sm text-muted-foreground">Recently accessed files appear here.</p>
            </TabsPanel>
            <TabsPanel value="starred">
              <p className="text-sm text-muted-foreground">Your starred files appear here.</p>
            </TabsPanel>
          </Tabs>
        </Preview>
        <Code>{`<Tabs defaultValue="files" variant="bordered">
  <TabsList>
    <Tab value="files">Files</Tab>
    <Tab value="shared">Shared</Tab>
    <Tab value="recent">Recent</Tab>
    <Tab value="starred">Starred</Tab>
  </TabsList>
  <TabsPanel value="files">Files content</TabsPanel>
  <TabsPanel value="shared">Shared content</TabsPanel>
  <TabsPanel value="recent">Recent content</TabsPanel>
  <TabsPanel value="starred">Starred content</TabsPanel>
</Tabs>`}</Code>
      </DocSection>

      {/* ── Sizes ────────────────────────────────────────────────────────── */}
      <DocSection id="sizes" title="Sizes">
        <p className="text-sm text-muted-foreground mb-4">
          Both variants support <code className="text-xs bg-muted px-1 py-0.5 rounded">sm</code>,{' '}
          <code className="text-xs bg-muted px-1 py-0.5 rounded">default</code>, and{' '}
          <code className="text-xs bg-muted px-1 py-0.5 rounded">lg</code> sizes via the{' '}
          <code className="text-xs bg-muted px-1 py-0.5 rounded">size</code> prop on{' '}
          <code className="text-xs bg-muted px-1 py-0.5 rounded">Tabs</code>.
        </p>
        <Preview>
          <div className="flex flex-col gap-8 w-full">
            <div className="space-y-2">
              <p className="text-xs text-muted-foreground">Small — app</p>
              <Tabs defaultValue="a" variant="app" size="sm">
                <TabsList>
                  <Tab value="a">Overview</Tab>
                  <Tab value="b">Analytics</Tab>
                  <Tab value="c">Settings</Tab>
                </TabsList>
              </Tabs>
            </div>
            <div className="space-y-2">
              <p className="text-xs text-muted-foreground">Default — app</p>
              <Tabs defaultValue="a" variant="app" size="default">
                <TabsList>
                  <Tab value="a">Overview</Tab>
                  <Tab value="b">Analytics</Tab>
                  <Tab value="c">Settings</Tab>
                </TabsList>
              </Tabs>
            </div>
            <div className="space-y-2">
              <p className="text-xs text-muted-foreground">Large — app</p>
              <Tabs defaultValue="a" variant="app" size="lg">
                <TabsList>
                  <Tab value="a">Overview</Tab>
                  <Tab value="b">Analytics</Tab>
                  <Tab value="c">Settings</Tab>
                </TabsList>
              </Tabs>
            </div>
            <div className="space-y-2">
              <p className="text-xs text-muted-foreground">Small — bordered</p>
              <Tabs defaultValue="a" variant="bordered" size="sm">
                <TabsList>
                  <Tab value="a">Files</Tab>
                  <Tab value="b">Shared</Tab>
                  <Tab value="c">Recent</Tab>
                </TabsList>
              </Tabs>
            </div>
            <div className="space-y-2">
              <p className="text-xs text-muted-foreground">Default — bordered</p>
              <Tabs defaultValue="a" variant="bordered" size="default">
                <TabsList>
                  <Tab value="a">Files</Tab>
                  <Tab value="b">Shared</Tab>
                  <Tab value="c">Recent</Tab>
                </TabsList>
              </Tabs>
            </div>
            <div className="space-y-2">
              <p className="text-xs text-muted-foreground">Large — bordered</p>
              <Tabs defaultValue="a" variant="bordered" size="lg">
                <TabsList>
                  <Tab value="a">Files</Tab>
                  <Tab value="b">Shared</Tab>
                  <Tab value="c">Recent</Tab>
                </TabsList>
              </Tabs>
            </div>
          </div>
        </Preview>
        <Code>{`<Tabs defaultValue="a" variant="app" size="sm">…</Tabs>
<Tabs defaultValue="a" variant="app" size="default">…</Tabs>
<Tabs defaultValue="a" variant="app" size="lg">…</Tabs>`}</Code>
      </DocSection>

      {/* ── Controlled ───────────────────────────────────────────────────── */}
      <DocSection id="controlled" title="Controlled">
        <p className="text-sm text-muted-foreground mb-4">
          Use <code className="text-xs bg-muted px-1 py-0.5 rounded">value</code> +{' '}
          <code className="text-xs bg-muted px-1 py-0.5 rounded">onValueChange</code> to drive
          the active tab from external state.
        </p>
        <Preview>
          <div className="space-y-4 w-full">
            <p className="text-xs text-muted-foreground">
              Active: <span className="font-mono text-primary">{active}</span>
            </p>
            <Tabs value={active} onValueChange={setActive} variant="bordered">
              <TabsList>
                <Tab value="overview">Overview</Tab>
                <Tab value="analytics">Analytics</Tab>
                <Tab value="settings">Settings</Tab>
              </TabsList>
              <TabsPanel value="overview">
                <p className="text-sm text-muted-foreground">Overview content.</p>
              </TabsPanel>
              <TabsPanel value="analytics">
                <p className="text-sm text-muted-foreground">Analytics content.</p>
              </TabsPanel>
              <TabsPanel value="settings">
                <p className="text-sm text-muted-foreground">Settings content.</p>
              </TabsPanel>
            </Tabs>
          </div>
        </Preview>
        <Code>{`const [active, setActive] = useState('overview')

<Tabs value={active} onValueChange={setActive} variant="bordered">
  <TabsList>
    <Tab value="overview">Overview</Tab>
    <Tab value="analytics">Analytics</Tab>
  </TabsList>
  <TabsPanel value="overview">Overview content</TabsPanel>
  <TabsPanel value="analytics">Analytics content</TabsPanel>
</Tabs>`}</Code>
      </DocSection>

      {/* ── Disabled ─────────────────────────────────────────────────────── */}
      <DocSection id="disabled" title="Disabled Tab">
        <p className="text-sm text-muted-foreground mb-4">
          Add <code className="text-xs bg-muted px-1 py-0.5 rounded">disabled</code> to any{' '}
          <code className="text-xs bg-muted px-1 py-0.5 rounded">Tab</code> to make it
          non-interactive and visually dimmed. Keyboard navigation skips disabled tabs.
        </p>
        <Preview>
          <div className="flex flex-col gap-6 w-full">
            <Tabs defaultValue="a" variant="app">
              <TabsList>
                <Tab value="a">Active</Tab>
                <Tab value="b">Normal</Tab>
                <Tab value="c" disabled>Disabled</Tab>
              </TabsList>
            </Tabs>
            <Tabs defaultValue="a" variant="bordered">
              <TabsList>
                <Tab value="a">Active</Tab>
                <Tab value="b">Normal</Tab>
                <Tab value="c" disabled>Disabled</Tab>
              </TabsList>
            </Tabs>
          </div>
        </Preview>
        <Code>{`<Tab value="c" disabled>Disabled</Tab>`}</Code>
      </DocSection>

      {/* ── keepMounted ──────────────────────────────────────────────────── */}
      <DocSection id="keep-mounted" title="keepMounted">
        <p className="text-sm text-muted-foreground mb-4">
          By default, inactive panels are unmounted from the DOM. Pass{' '}
          <code className="text-xs bg-muted px-1 py-0.5 rounded">keepMounted</code> to a{' '}
          <code className="text-xs bg-muted px-1 py-0.5 rounded">TabsPanel</code> to keep it
          mounted (hidden via <code className="text-xs bg-muted px-1 py-0.5 rounded">aria-hidden</code>).
          Useful for panels that contain forms or charts whose state should be preserved.
        </p>
        <Code>{`<TabsPanel value="chart" keepMounted>
  <ExpensiveChart />
</TabsPanel>`}</Code>
      </DocSection>

      {/* ── API Reference ────────────────────────────────────────────────── */}
      <DocSection id="api" title="API Reference">
        <div className="space-y-8">
          {/* Tabs */}
          <div>
            <h3 className="text-base font-semibold mb-3">Tabs</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2 pr-4 font-medium text-muted-foreground">Prop</th>
                    <th className="text-left py-2 pr-4 font-medium text-muted-foreground">Type</th>
                    <th className="text-left py-2 font-medium text-muted-foreground">Default</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {[
                    ['variant',         '"app" | "bordered"',              '"app"'],
                    ['size',            '"sm" | "default" | "lg"',         '"default"'],
                    ['value',           'any',                             '—'],
                    ['defaultValue',    'any',                             '—'],
                    ['onValueChange',   '(value: any) => void',            '—'],
                    ['orientation',     '"horizontal" | "vertical"',       '"horizontal"'],
                    ['className',       'string',                          '—'],
                  ].map(([prop, type, def]) => (
                    <tr key={prop}>
                      <td className="py-2 pr-4 font-mono text-xs text-foreground">{prop}</td>
                      <td className="py-2 pr-4 font-mono text-xs text-muted-foreground">{type}</td>
                      <td className="py-2 font-mono text-xs text-muted-foreground">{def}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* TabsList */}
          <div>
            <h3 className="text-base font-semibold mb-3">TabsList</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2 pr-4 font-medium text-muted-foreground">Prop</th>
                    <th className="text-left py-2 pr-4 font-medium text-muted-foreground">Type</th>
                    <th className="text-left py-2 font-medium text-muted-foreground">Default</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {[
                    ['activateOnFocus', 'boolean', 'false'],
                    ['loopFocus',       'boolean', 'true'],
                    ['className',       'string',  '—'],
                  ].map(([prop, type, def]) => (
                    <tr key={prop}>
                      <td className="py-2 pr-4 font-mono text-xs text-foreground">{prop}</td>
                      <td className="py-2 pr-4 font-mono text-xs text-muted-foreground">{type}</td>
                      <td className="py-2 font-mono text-xs text-muted-foreground">{def}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Tab */}
          <div>
            <h3 className="text-base font-semibold mb-3">Tab</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2 pr-4 font-medium text-muted-foreground">Prop</th>
                    <th className="text-left py-2 pr-4 font-medium text-muted-foreground">Type</th>
                    <th className="text-left py-2 font-medium text-muted-foreground">Default</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {[
                    ['value',    'any',     '—'],
                    ['disabled', 'boolean', 'false'],
                    ['className','string',  '—'],
                  ].map(([prop, type, def]) => (
                    <tr key={prop}>
                      <td className="py-2 pr-4 font-mono text-xs text-foreground">{prop}</td>
                      <td className="py-2 pr-4 font-mono text-xs text-muted-foreground">{type}</td>
                      <td className="py-2 font-mono text-xs text-muted-foreground">{def}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* TabsPanel */}
          <div>
            <h3 className="text-base font-semibold mb-3">TabsPanel</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2 pr-4 font-medium text-muted-foreground">Prop</th>
                    <th className="text-left py-2 pr-4 font-medium text-muted-foreground">Type</th>
                    <th className="text-left py-2 font-medium text-muted-foreground">Default</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {[
                    ['value',       'any',     '—'],
                    ['keepMounted', 'boolean', 'false'],
                    ['className',   'string',  '—'],
                  ].map(([prop, type, def]) => (
                    <tr key={prop}>
                      <td className="py-2 pr-4 font-mono text-xs text-foreground">{prop}</td>
                      <td className="py-2 pr-4 font-mono text-xs text-muted-foreground">{type}</td>
                      <td className="py-2 font-mono text-xs text-muted-foreground">{def}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </DocSection>
    </DocPage>
  )
}
