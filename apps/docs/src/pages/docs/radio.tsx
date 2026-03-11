import * as React from 'react'
import { Code, PageHeader, Radio, RadioCard, RadioGroup } from '@aplo/ui'
import { DocPage, DocSection } from '@/components/doc-page'
import { PropsTable } from '@/components/props-table'

const TOC = [
  { id: 'installation', label: 'Installation' },
  { id: 'usage', label: 'Usage' },
  { id: 'sizes', label: 'Sizes' },
  { id: 'indicator', label: 'Indicator Style' },
  { id: 'orientation', label: 'Orientation' },
  { id: 'disabled', label: 'Disabled' },
  { id: 'radio-card', label: 'RadioCard' },
  { id: 'api', label: 'API Reference' },
]

export default function RadioDocs() {
  const [plan, setPlan] = React.useState('pro')
  const [provider, setProvider] = React.useState('openai')

  return (
    <DocPage toc={TOC}>

      <PageHeader
        title="Radio"
        description="Accessible radio controls built on Base UI. Three exports — RadioGroup, Radio, and RadioCard — compose into standard dot lists or rich card pickers."
      />

      <DocSection id="installation" title="Installation">
        <Code language="ts">{`import { RadioGroup, Radio, RadioCard } from '@aplo/ui'`}</Code>
      </DocSection>

      <DocSection id="usage" title="Usage">
        <Code>{`// Uncontrolled dot radios
<RadioGroup defaultValue="b">
  <Radio value="a">Option A</Radio>
  <Radio value="b">Option B</Radio>
</RadioGroup>

// Controlled
const [value, setValue] = useState('b')
<RadioGroup value={value} onValueChange={setValue}>
  <Radio value="a">Option A</Radio>
  <Radio value="b">Option B</Radio>
</RadioGroup>

// RadioCard — list layout
<RadioGroup defaultValue="pro">
  <RadioCard value="free" title="Free" description="For personal projects" />
  <RadioCard value="pro" title="Pro" description="For teams" />
</RadioGroup>

// RadioCard — card grid
<RadioGroup defaultValue="pixel" orientation="horizontal" className="grid grid-cols-3 gap-4">
  <RadioCard layout="card" value="pixel" title="Pixel Art" image="/avatars/pixel.png" />
</RadioGroup>`}</Code>
      </DocSection>

      <DocSection id="sizes" title="Sizes">
        <div className="flex flex-wrap gap-10 items-start">
          <div className="space-y-2">
            <p className="text-xs text-muted-foreground mb-3">Default</p>
            <RadioGroup defaultValue="b">
              <Radio value="a">Option A</Radio>
              <Radio value="b">Option B</Radio>
              <Radio value="c">Option C</Radio>
            </RadioGroup>
          </div>
          <div className="space-y-2">
            <p className="text-xs text-muted-foreground mb-3">Small</p>
            <RadioGroup defaultValue="b">
              <Radio value="a" size="sm">Option A</Radio>
              <Radio value="b" size="sm">Option B</Radio>
              <Radio value="c" size="sm">Option C</Radio>
            </RadioGroup>
          </div>
        </div>
      </DocSection>

      <DocSection id="indicator" title="Indicator Style">
        <div className="flex flex-wrap gap-10 items-start">
          <div className="space-y-2">
            <p className="text-xs text-muted-foreground mb-3">Dot (default)</p>
            <RadioGroup defaultValue="b">
              <Radio value="a">Option A</Radio>
              <Radio value="b">Option B</Radio>
            </RadioGroup>
          </div>
          <div className="space-y-2">
            <p className="text-xs text-muted-foreground mb-3">Check</p>
            <RadioGroup defaultValue="b">
              <Radio value="a" indicator="check">Option A</Radio>
              <Radio value="b" indicator="check">Option B</Radio>
            </RadioGroup>
          </div>
        </div>
      </DocSection>

      <DocSection id="orientation" title="Orientation">
        <RadioGroup orientation="horizontal" defaultValue="a">
          <Radio value="a">Left</Radio>
          <Radio value="b">Center</Radio>
          <Radio value="c">Right</Radio>
        </RadioGroup>
      </DocSection>

      <DocSection id="disabled" title="Disabled">
        <RadioGroup defaultValue="b">
          <Radio value="a" disabled>Disabled option</Radio>
          <Radio value="b">Enabled option</Radio>
          <Radio value="c" disabled>Another disabled</Radio>
        </RadioGroup>
      </DocSection>

      <DocSection id="radio-card" title="RadioCard">
        <div className="space-y-8">
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground">List layout (default)</p>
            <RadioGroup value={plan} onValueChange={setPlan} className="max-w-sm">
              <RadioCard value="free" title="Free" description="For personal projects and experimentation" />
              <RadioCard value="pro" title="Pro" description="For teams shipping production software" />
              <RadioCard value="enterprise" title="Enterprise" description="Custom SLAs, SSO, and dedicated support" />
            </RadioGroup>
          </div>

          <div className="space-y-3">
            <p className="text-sm text-muted-foreground">Card layout (grid)</p>
            <RadioGroup value={provider} onValueChange={setProvider} orientation="horizontal" className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-w-xl">
              <RadioCard layout="card" value="openai" title="ChatGPT" description="OpenAI's flagship model" />
              <RadioCard layout="card" value="gemini" title="Gemini" description="Google's multimodal model" />
              <RadioCard layout="card" value="claude" title="Claude" description="Anthropic's model" />
            </RadioGroup>
          </div>
        </div>
      </DocSection>

      <DocSection id="api" title="API Reference">
        <div className="space-y-4">
          <p className="text-sm font-medium text-foreground">RadioGroup</p>
          <PropsTable props={[
            { name: 'value', type: 'string', default: '—' },
            { name: 'defaultValue', type: 'string', default: '—' },
            { name: 'onValueChange', type: '(value: string) => void', default: '—' },
            { name: 'orientation', type: "'vertical' | 'horizontal'", default: "'vertical'" },
          ]} />
          <p className="text-sm font-medium text-foreground pt-2">Radio</p>
          <PropsTable props={[
            { name: 'value', type: 'string', default: '—' },
            { name: 'size', type: "'default' | 'sm'", default: "'default'" },
            { name: 'indicator', type: "'dot' | 'check'", default: "'dot'" },
            { name: 'disabled', type: 'boolean', default: 'false' },
          ]} />
          <p className="text-sm font-medium text-foreground pt-2">RadioCard</p>
          <PropsTable props={[
            { name: 'value', type: 'string', default: '—' },
            { name: 'title', type: 'string', default: '—' },
            { name: 'description', type: 'string', default: '—' },
            { name: 'image', type: 'string', default: '—' },
            { name: 'layout', type: "'list' | 'card'", default: "'list'" },
            { name: 'startContent', type: 'ReactNode', default: '—' },
            { name: 'disabled', type: 'boolean', default: 'false' },
          ]} />
        </div>
      </DocSection>

    </DocPage>
  )
}
