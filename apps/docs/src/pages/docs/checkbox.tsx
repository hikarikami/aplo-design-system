import * as React from 'react'
import { Checkbox, Code, PageHeader } from '@aplo/ui'
import { DocPage, DocSection } from '@/components/doc-page'
import { PropsTable } from '@/components/props-table'
import { Preview } from '@/components/preview'

const TOC = [
  { id: 'installation', label: 'Installation' },
  { id: 'usage', label: 'Usage' },
  { id: 'sizes', label: 'Sizes' },
  { id: 'states', label: 'States' },
  { id: 'disabled', label: 'Disabled' },
  { id: 'controlled', label: 'Controlled' },
  { id: 'api', label: 'API Reference' },
]

export default function CheckboxDocs() {
  const [controlled, setControlled] = React.useState(false)

  return (
    <DocPage toc={TOC}>
      <PageHeader title="Checkbox" description="An accessible checkbox built on Base UI. Supports checked, indeterminate, and disabled states with a motion-aware draw-in tick animation." />

      <DocSection id="installation" title="Installation">
        <Code language="ts">{`import { Checkbox } from '@aplo/ui'`}</Code>
      </DocSection>

      <DocSection id="usage" title="Usage">
        <Code>{`// Uncontrolled
<Checkbox defaultChecked />

// Controlled
const [checked, setChecked] = useState(false)
<Checkbox checked={checked} onCheckedChange={setChecked} />

// Indeterminate
<Checkbox indeterminate />

// With a label
<label className="flex items-center gap-2">
  <Checkbox checked={checked} onCheckedChange={setChecked} />
  <span className="text-sm">Accept terms and conditions</span>
</label>`}</Code>
      </DocSection>

      <DocSection id="sizes" title="Sizes">
        <Preview>
          <Row>
            <LabelledCheckbox label="Small" size="sm" defaultChecked />
            <LabelledCheckbox label="Default" size="default" defaultChecked />
            <LabelledCheckbox label="Large" size="lg" defaultChecked />
          </Row>
        </Preview>
      </DocSection>

      <DocSection id="states" title="States">
        <Preview>
          <Row>
            <LabelledCheckbox label="Unchecked" />
            <LabelledCheckbox label="Checked" defaultChecked />
            <LabelledCheckbox label="Indeterminate" indeterminate />
          </Row>
        </Preview>
      </DocSection>

      <DocSection id="disabled" title="Disabled">
        <Preview>
          <Row>
            <LabelledCheckbox label="Disabled unchecked" disabled />
            <LabelledCheckbox label="Disabled checked" defaultChecked disabled />
            <LabelledCheckbox label="Disabled indeterminate" indeterminate disabled />
          </Row>
        </Preview>
      </DocSection>

      <DocSection id="controlled" title="Controlled">
        <Preview>
          <LabelledCheckbox
            label={controlled ? 'Checked' : 'Unchecked'}
            checked={controlled}
            onCheckedChange={setControlled}
          />
        </Preview>
      </DocSection>

      <DocSection id="api" title="API Reference">
        <PropsTable props={[
          { name: 'checked', type: 'boolean', default: '—' },
          { name: 'defaultChecked', type: 'boolean', default: 'false' },
          { name: 'onCheckedChange', type: '(checked: boolean) => void', default: '—' },
          { name: 'indeterminate', type: 'boolean', default: 'false' },
          { name: 'size', type: "'sm' | 'default' | 'lg'", default: "'default'" },
          { name: 'disabled', type: 'boolean', default: 'false' },
        ]} />
      </DocSection>
    </DocPage>
  )
}

function LabelledCheckbox({ label, ...props }: { label: string } & React.ComponentProps<typeof Checkbox>) {
  return (
    <label className="flex items-center gap-2.5 cursor-pointer select-none">
      <Checkbox {...props} />
      <span className="text-sm text-muted-foreground">{label}</span>
    </label>
  )
}

function Row({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-wrap gap-6 items-center">{children}</div>
}
