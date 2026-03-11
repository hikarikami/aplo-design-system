import { Container, PageHeader, Switch } from '@aplo/ui'

export default function SwitchDocs() {
  return (
    <Container className="py-16 space-y-16">

      <PageHeader
        id="switch"
        title="Switch"
        description={<>An accessible toggle switch built on a <code className="text-xs bg-muted px-1.5 py-0.5 rounded">{'<button role="switch">'}</code>. Supports controlled and uncontrolled usage, two sizes, and motion-aware transitions.</>}
      />

      <hr className="border-border" />

      <section id="sizes" className="space-y-6">
        <SectionLabel>Sizes</SectionLabel>
        <Row>
          <LabelledSwitch label="Default" size="default" defaultChecked />
          <LabelledSwitch label="Small" size="sm" defaultChecked />
        </Row>
      </section>

      <section id="states" className="space-y-6">
        <SectionLabel>States</SectionLabel>
        <Row>
          <LabelledSwitch label="Off" />
          <LabelledSwitch label="On" defaultChecked />
          <LabelledSwitch label="Small off" size="sm" />
          <LabelledSwitch label="Small on" size="sm" defaultChecked />
        </Row>
      </section>

      <section id="disabled" className="space-y-6">
        <SectionLabel>Disabled</SectionLabel>
        <Row>
          <LabelledSwitch label="Disabled off" disabled />
          <LabelledSwitch label="Disabled on" defaultChecked disabled />
        </Row>
      </section>

      <hr className="border-border" />

      <section id="usage" className="space-y-4">
        <SectionLabel>Usage</SectionLabel>
        <pre className="rounded-lg bg-card border border-border px-6 py-5 text-sm text-muted-foreground overflow-x-auto leading-relaxed">
          {`import { Switch } from '@aplo/ui'

// Uncontrolled
<Switch defaultChecked />

// Controlled
const [enabled, setEnabled] = useState(false)
<Switch checked={enabled} onCheckedChange={setEnabled} />

// Sizes: default | sm
<Switch size="sm" />

// With a label
<label className="flex items-center gap-2">
  <Switch checked={enabled} onCheckedChange={setEnabled} />
  <span className="text-sm">Enable notifications</span>
</label>`}
        </pre>
      </section>

    </Container>
  )
}

function LabelledSwitch({
  label,
  ...props
}: { label: string } & React.ComponentProps<typeof Switch>) {
  return (
    <label className="flex items-center gap-2.5 cursor-pointer select-none">
      <Switch {...props} />
      <span className="text-sm text-muted-foreground">{label}</span>
    </label>
  )
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
      {children}
    </h2>
  )
}

function Row({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-wrap gap-6 items-center">{children}</div>
}
