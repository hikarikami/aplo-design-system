import { Code, PageHeader, Switch } from '@aplo/ui'
import { DocPage, DocSection } from '@/components/doc-page'
import { PropsTable } from '@/components/props-table'
import { Preview } from '@/components/preview'

const TOC = [
  { id: 'installation', label: 'Installation' },
  { id: 'usage', label: 'Usage' },
  { id: 'sizes', label: 'Sizes' },
  { id: 'states', label: 'States' },
  { id: 'disabled', label: 'Disabled' },
  { id: 'api', label: 'API Reference' },
]

export default function SwitchDocs() {
  return (
    <DocPage toc={TOC}>
      <PageHeader title="Switch" description="An accessible toggle switch built on Base UI. Supports controlled and uncontrolled usage, two sizes, and motion-aware transitions." />

      <DocSection id="installation" title="Installation">
        <Code language="ts">{`import { Switch } from '@aplo/ui'`}</Code>
      </DocSection>

      <DocSection id="usage" title="Usage">
        <Code>{`// Uncontrolled
<Switch defaultChecked />

// Controlled
const [enabled, setEnabled] = useState(false)
<Switch checked={enabled} onCheckedChange={setEnabled} />

// With a label
<label className="flex items-center gap-2">
  <Switch checked={enabled} onCheckedChange={setEnabled} />
  <span className="text-sm">Enable notifications</span>
</label>`}</Code>
      </DocSection>

      <DocSection id="sizes" title="Sizes">
        <Preview>
          <Row>
            <LabelledSwitch label="Default" size="default" defaultChecked />
            <LabelledSwitch label="Small" size="sm" defaultChecked />
          </Row>
        </Preview>
      </DocSection>

      <DocSection id="states" title="States">
        <Preview>
          <Row>
            <LabelledSwitch label="Off" />
            <LabelledSwitch label="On" defaultChecked />
            <LabelledSwitch label="Small off" size="sm" />
            <LabelledSwitch label="Small on" size="sm" defaultChecked />
          </Row>
        </Preview>
      </DocSection>

      <DocSection id="disabled" title="Disabled">
        <Preview>
          <Row>
            <LabelledSwitch label="Disabled off" disabled />
            <LabelledSwitch label="Disabled on" defaultChecked disabled />
          </Row>
        </Preview>
      </DocSection>

      <DocSection id="api" title="API Reference">
        <PropsTable props={[
          { name: 'checked', type: 'boolean', default: '—' },
          { name: 'defaultChecked', type: 'boolean', default: 'false' },
          { name: 'onCheckedChange', type: '(checked: boolean) => void', default: '—' },
          { name: 'size', type: "'default' | 'sm'", default: "'default'" },
          { name: 'disabled', type: 'boolean', default: 'false' },
        ]} />
      </DocSection>
    </DocPage>
  )
}

function LabelledSwitch({ label, ...props }: { label: string } & React.ComponentProps<typeof Switch>) {
  return (
    <label className="flex items-center gap-2.5 cursor-pointer select-none">
      <Switch {...props} />
      <span className="text-sm text-muted-foreground">{label}</span>
    </label>
  )
}

function Row({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-wrap gap-6 items-center">{children}</div>
}
