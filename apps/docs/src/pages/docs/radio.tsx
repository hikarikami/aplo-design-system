import * as React from 'react'
import { Zap, Rocket, Building2, Palette, Code2, BarChart3 } from 'lucide-react'
import { Code, PageHeader, Radio, RadioCard, RadioGroup } from '@aplo/ui'
import { DocPage, DocSection } from '@/components/doc-page'
import { PropsTable } from '@/components/props-table'
import { Preview } from '@/components/preview'

const TOC = [
  { id: 'installation', label: 'Installation' },
  { id: 'usage', label: 'Usage' },
  { id: 'sizes', label: 'Sizes' },
  { id: 'indicator', label: 'Indicator Style' },
  { id: 'orientation', label: 'Orientation' },
  { id: 'disabled', label: 'Disabled' },
  { id: 'radio-card', label: 'RadioCard' },
  { id: 'radio-card-icons', label: 'RadioCard with Icons' },
  { id: 'api', label: 'API Reference' },
]

export default function RadioDocs() {
  const [plan, setPlan] = React.useState('pro')
  const [provider, setProvider] = React.useState('openai')
  const [iconList, setIconList] = React.useState('pro')
  const [iconCard, setIconCard] = React.useState('design')

  return (
    <DocPage toc={TOC}>
      <PageHeader title="Radio" description="Accessible radio controls built on Base UI. Three exports — RadioGroup, Radio, and RadioCard — compose into standard dot lists or rich card pickers." />

      <DocSection id="installation" title="Installation">
        <Code language="ts">{`import { RadioGroup, Radio, RadioCard } from '@aplo/ui'`}</Code>
      </DocSection>

      <DocSection id="usage" title="Usage">
        <Code>{`// Uncontrolled
<RadioGroup defaultValue="b">
  <Radio value="a">Option A</Radio>
  <Radio value="b">Option B</Radio>
</RadioGroup>

// Controlled
const [value, setValue] = useState('b')
<RadioGroup value={value} onValueChange={setValue}>
  <Radio value="a">Option A</Radio>
  <Radio value="b">Option B</Radio>
</RadioGroup>`}</Code>
      </DocSection>

      <DocSection id="sizes" title="Sizes">
        <Preview>
          <div className="flex flex-wrap gap-10 items-start">
            <div className="space-y-2">
              <p className="text-xs text-muted-foreground mb-3">Default</p>
              <RadioGroup defaultValue="b"><Radio value="a">Option A</Radio><Radio value="b">Option B</Radio><Radio value="c">Option C</Radio></RadioGroup>
            </div>
            <div className="space-y-2">
              <p className="text-xs text-muted-foreground mb-3">Small</p>
              <RadioGroup defaultValue="b"><Radio value="a" size="sm">Option A</Radio><Radio value="b" size="sm">Option B</Radio><Radio value="c" size="sm">Option C</Radio></RadioGroup>
            </div>
          </div>
        </Preview>
      </DocSection>

      <DocSection id="indicator" title="Indicator Style">
        <Preview>
          <div className="flex flex-wrap gap-10 items-start">
            <div><p className="text-xs text-muted-foreground mb-3">Dot (default)</p><RadioGroup defaultValue="b"><Radio value="a">Option A</Radio><Radio value="b">Option B</Radio></RadioGroup></div>
            <div><p className="text-xs text-muted-foreground mb-3">Check</p><RadioGroup defaultValue="b"><Radio value="a" indicator="check">Option A</Radio><Radio value="b" indicator="check">Option B</Radio></RadioGroup></div>
          </div>
        </Preview>
      </DocSection>

      <DocSection id="orientation" title="Orientation">
        <Preview>
          <RadioGroup orientation="horizontal" defaultValue="a">
            <Radio value="a">Left</Radio>
            <Radio value="b">Center</Radio>
            <Radio value="c">Right</Radio>
          </RadioGroup>
        </Preview>
      </DocSection>

      <DocSection id="disabled" title="Disabled">
        <Preview>
          <RadioGroup defaultValue="b">
            <Radio value="a" disabled>Disabled option</Radio>
            <Radio value="b">Enabled option</Radio>
            <Radio value="c" disabled>Another disabled</Radio>
          </RadioGroup>
        </Preview>
      </DocSection>

      <DocSection id="radio-card" title="RadioCard">
        <div className="space-y-4">
          <Preview centered={false}>
            <div className="w-full max-w-sm">
              <p className="text-xs text-muted-foreground mb-4">List layout</p>
              <RadioGroup value={plan} onValueChange={setPlan}>
                <RadioCard value="free" title="Free" description="For personal projects and experimentation" />
                <RadioCard value="pro" title="Pro" description="For teams shipping production software" />
                <RadioCard value="enterprise" title="Enterprise" description="Custom SLAs, SSO, and dedicated support" />
              </RadioGroup>
            </div>
          </Preview>
          <Preview centered={false}>
            <div className="w-full">
              <p className="text-xs text-muted-foreground mb-4">Card layout (grid)</p>
              <RadioGroup value={provider} onValueChange={setProvider} orientation="horizontal" className="grid grid-cols-3 gap-3">
                <RadioCard layout="card" value="openai" title="ChatGPT" description="OpenAI's flagship model" />
                <RadioCard layout="card" value="gemini" title="Gemini" description="Google's multimodal model" />
                <RadioCard layout="card" value="claude" title="Claude" description="Anthropic's model" />
              </RadioGroup>
            </div>
          </Preview>
        </div>
      </DocSection>

      <DocSection id="radio-card-icons" title="RadioCard with Icons">
        <p className="text-sm text-muted-foreground">
          Use <code className="text-xs bg-muted px-1.5 py-0.5 rounded">startContent</code> to pass any ReactNode into the thumbnail slot — icons, avatars, or custom visuals. Pass an image URL to <code className="text-xs bg-muted px-1.5 py-0.5 rounded">image</code> for photo thumbnails.
        </p>

        <div className="space-y-4">
          <Preview centered={false}>
            <div className="w-full max-w-sm">
              <p className="text-xs text-muted-foreground mb-4">List layout with icons</p>
              <RadioGroup value={iconList} onValueChange={setIconList}>
                <RadioCard
                  value="starter"
                  title="Starter"
                  description="Up to 3 projects, 1 GB storage"
                  startContent={<IconThumb color="text-amber-500 bg-amber-500/10"><Zap className="size-4" /></IconThumb>}
                />
                <RadioCard
                  value="pro"
                  title="Pro"
                  description="Unlimited projects, 50 GB storage"
                  startContent={<IconThumb color="text-primary bg-primary/10"><Rocket className="size-4" /></IconThumb>}
                />
                <RadioCard
                  value="enterprise"
                  title="Enterprise"
                  description="Custom limits, SSO, dedicated support"
                  startContent={<IconThumb color="text-violet-500 bg-violet-500/10"><Building2 className="size-4" /></IconThumb>}
                />
              </RadioGroup>
            </div>
          </Preview>

          <Preview centered={false}>
            <div className="w-full">
              <p className="text-xs text-muted-foreground mb-4">Card layout with icons</p>
              <RadioGroup value={iconCard} onValueChange={setIconCard} orientation="horizontal" className="grid grid-cols-3 gap-3">
                <RadioCard
                  layout="card"
                  value="design"
                  title="Design"
                  description="UI & visual assets"
                  startContent={<IconThumb color="text-pink-500 bg-pink-500/10" large><Palette className="size-5" /></IconThumb>}
                />
                <RadioCard
                  layout="card"
                  value="engineering"
                  title="Engineering"
                  description="Code & infrastructure"
                  startContent={<IconThumb color="text-sky-500 bg-sky-500/10" large><Code2 className="size-5" /></IconThumb>}
                />
                <RadioCard
                  layout="card"
                  value="analytics"
                  title="Analytics"
                  description="Data & reporting"
                  startContent={<IconThumb color="text-green-500 bg-green-500/10" large><BarChart3 className="size-5" /></IconThumb>}
                />
              </RadioGroup>
            </div>
          </Preview>

          <Code>{`// startContent — pass any ReactNode into the thumbnail slot
<RadioCard
  value="pro"
  title="Pro"
  description="Unlimited projects, 50 GB storage"
  startContent={
    <div className="size-full flex items-center justify-center bg-primary/10 text-primary rounded-md">
      <Rocket className="size-4" />
    </div>
  }
/>

// image — URL renders as a rounded thumbnail
<RadioCard
  value="photo"
  title="Photo"
  image="https://example.com/thumbnail.jpg"
/>`}</Code>
        </div>
      </DocSection>

      <DocSection id="api" title="API Reference">
        <div className="space-y-4">
          <p className="text-sm font-medium text-foreground">RadioGroup</p>
          <PropsTable props={[{ name: 'value', type: 'string', default: '—' }, { name: 'defaultValue', type: 'string', default: '—' }, { name: 'onValueChange', type: '(value: string) => void', default: '—' }, { name: 'orientation', type: "'vertical' | 'horizontal'", default: "'vertical'" }]} />
          <p className="text-sm font-medium text-foreground pt-2">Radio</p>
          <PropsTable props={[{ name: 'value', type: 'string', default: '—' }, { name: 'size', type: "'default' | 'sm'", default: "'default'" }, { name: 'indicator', type: "'dot' | 'check'", default: "'dot'" }, { name: 'disabled', type: 'boolean', default: 'false' }]} />
          <p className="text-sm font-medium text-foreground pt-2">RadioCard</p>
          <PropsTable props={[{ name: 'value', type: 'string', default: '—' }, { name: 'title', type: 'string', default: '—' }, { name: 'description', type: 'string', default: '—' }, { name: 'image', type: 'string', default: '—' }, { name: 'startContent', type: 'ReactNode', default: '—' }, { name: 'layout', type: "'list' | 'card'", default: "'list'" }, { name: 'disabled', type: 'boolean', default: 'false' }]} />
        </div>
      </DocSection>
    </DocPage>
  )
}

function IconThumb({
  children,
  color,
  large = false,
}: {
  children: React.ReactNode
  color: string
  large?: boolean
}) {
  return (
    <div className={`size-full flex items-center justify-center rounded-md ${color} ${large ? 'text-lg' : ''}`}>
      {children}
    </div>
  )
}
