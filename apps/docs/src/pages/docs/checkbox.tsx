import * as React from 'react'
import { Code, Container, PageHeader, Checkbox } from '@aplo/ui'

export default function CheckboxDocs() {
  const [controlled, setControlled] = React.useState(false)

  return (
    <Container className="py-16 space-y-16">

      <PageHeader
        id="checkbox"
        title="Checkbox"
        description={<>An accessible checkbox built on <code className="text-xs bg-muted px-1.5 py-0.5 rounded">{'<input type="checkbox">'}</code> via Base UI. Supports checked, indeterminate, and disabled states with a motion-aware draw-in tick animation.</>}
      />

      <hr className="border-border" />

      <section id="sizes" className="space-y-6">
        <SectionLabel>Sizes</SectionLabel>
        <Row>
          <LabelledCheckbox label="Small" size="sm" defaultChecked />
          <LabelledCheckbox label="Default" size="default" defaultChecked />
          <LabelledCheckbox label="Large" size="lg" defaultChecked />
        </Row>
      </section>

      <section id="states" className="space-y-6">
        <SectionLabel>States</SectionLabel>
        <Row>
          <LabelledCheckbox label="Unchecked" />
          <LabelledCheckbox label="Checked" defaultChecked />
          <LabelledCheckbox label="Indeterminate" indeterminate />
        </Row>
      </section>

      <section id="disabled" className="space-y-6">
        <SectionLabel>Disabled</SectionLabel>
        <Row>
          <LabelledCheckbox label="Disabled unchecked" disabled />
          <LabelledCheckbox label="Disabled checked" defaultChecked disabled />
          <LabelledCheckbox label="Disabled indeterminate" indeterminate disabled />
        </Row>
      </section>

      <section id="controlled" className="space-y-6">
        <SectionLabel>Controlled</SectionLabel>
        <Row>
          <LabelledCheckbox
            label={controlled ? 'Checked' : 'Unchecked'}
            checked={controlled}
            onCheckedChange={setControlled}
          />
        </Row>
      </section>

      <hr className="border-border" />

      <section id="usage" className="space-y-4">
        <SectionLabel>Usage</SectionLabel>
        <Code>{`import { Checkbox } from '@aplo/ui'

// Uncontrolled
<Checkbox defaultChecked />

// Controlled
const [checked, setChecked] = useState(false)
<Checkbox checked={checked} onCheckedChange={setChecked} />

// Indeterminate
<Checkbox indeterminate />

// Sizes: sm | default | lg
<Checkbox size="sm" />
<Checkbox size="lg" />

// With a label
<label className="flex items-center gap-2">
  <Checkbox checked={checked} onCheckedChange={setChecked} />
  <span className="text-sm">Accept terms and conditions</span>
</label>`}</Code>
      </section>

    </Container>
  )
}

function LabelledCheckbox({
  label,
  ...props
}: { label: string } & React.ComponentProps<typeof Checkbox>) {
  return (
    <label className="flex items-center gap-2.5 cursor-pointer select-none">
      <Checkbox {...props} />
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
