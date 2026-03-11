import * as React from 'react'
import { Code, Input, PageHeader } from '@aplo/ui'
import { Search, Eye, EyeOff, Mail, Lock } from 'lucide-react'
import { DocPage, DocSection } from '@/components/doc-page'
import { PropsTable } from '@/components/props-table'
import { Preview } from '@/components/preview'

const TOC = [
  { id: 'installation', label: 'Installation' },
  { id: 'usage', label: 'Usage' },
  { id: 'default', label: 'Default' },
  { id: 'sizes', label: 'Sizes' },
  { id: 'placeholder', label: 'Without Label' },
  { id: 'icons', label: 'Prefix & Suffix' },
  { id: 'count', label: 'Character Countdown' },
  { id: 'states', label: 'Description & Error' },
  { id: 'disabled', label: 'Disabled' },
  { id: 'controlled', label: 'Controlled' },
  { id: 'api', label: 'API Reference' },
]

export default function InputDocs() {
  const [showPassword, setShowPassword] = React.useState(false)
  const [controlled, setControlled] = React.useState('')

  return (
    <DocPage toc={TOC}>
      <PageHeader title="Input" description="A field-wired text input built on Base UI with automatic a11y wiring, a teal focus ring, prefix/suffix slots, and a character countdown." />

      <DocSection id="installation" title="Installation">
        <Code language="ts">{`import { Input } from '@aplo/ui'`}</Code>
      </DocSection>

      <DocSection id="usage" title="Usage">
        <Code>{`<Input label="Full name" />

// With prefix icon
<Input label="Email" type="email" prefixIcon={<Mail />} />

// With error
<Input label="Email" error="That email is already in use." />

// Controlled
const [value, setValue] = useState('')
<Input label="Username" value={value} onChange={e => setValue(e.target.value)} />`}</Code>
      </DocSection>

      <DocSection id="default" title="Default">
        <Preview centered={false}>
          <Grid><Input label="Full name" /><Input label="Email address" type="email" /><Input label="Company" defaultValue="Acme Corp" /></Grid>
        </Preview>
      </DocSection>

      <DocSection id="sizes" title="Sizes">
        <Preview centered={false}>
          <Grid><Input label="Small" size="sm" /><Input label="Default" size="default" /><Input label="Large" size="lg" /></Grid>
        </Preview>
      </DocSection>

      <DocSection id="placeholder" title="Without Label">
        <Preview centered={false}>
          <Grid><Input placeholder="Search…" /><Input placeholder="Enter a value" size="sm" /><Input placeholder="Large field" size="lg" /></Grid>
        </Preview>
      </DocSection>

      <DocSection id="icons" title="Prefix &amp; Suffix Icons">
        <Preview centered={false}>
          <Grid>
            <Input label="Search" prefixIcon={<Search />} />
            <Input label="Email" type="email" prefixIcon={<Mail />} />
            <Input
              label="Password"
              type={showPassword ? 'text' : 'password'}
              prefixIcon={<Lock />}
              suffixIcon={
                <button type="button" onClick={() => setShowPassword(p => !p)} className="text-muted-foreground hover:text-foreground transition-colors" aria-label={showPassword ? 'Hide password' : 'Show password'}>
                  {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                </button>
              }
            />
          </Grid>
        </Preview>
      </DocSection>

      <DocSection id="count" title="Character Countdown">
        <Preview centered={false}>
          <Grid><Input label="Username" maxLength={20} /><Input label="Bio" maxLength={80} defaultValue="Approaching the limit soon…" /></Grid>
        </Preview>
      </DocSection>

      <DocSection id="states" title="Description &amp; Error">
        <Preview centered={false}>
          <Grid>
            <Input label="Subdomain" description="Choose a unique identifier for your workspace." />
            <Input label="Email address" type="email" error="That email address is already in use." defaultValue="taken@example.com" />
            <Input label="API key" error="Key is invalid or has expired." />
          </Grid>
        </Preview>
      </DocSection>

      <DocSection id="disabled" title="Disabled">
        <Preview centered={false}>
          <Grid><Input label="Read-only field" disabled defaultValue="Cannot edit" /><Input label="Empty disabled" disabled /></Grid>
        </Preview>
      </DocSection>

      <DocSection id="controlled" title="Controlled">
        <Preview centered={false}>
          <div className="max-w-sm space-y-3 w-full">
            <Input label="Live value" value={controlled} onChange={e => setControlled(e.target.value)} />
            <p className="text-xs text-muted-foreground font-mono">value: &quot;{controlled}&quot;</p>
          </div>
        </Preview>
      </DocSection>

      <DocSection id="api" title="API Reference">
        <PropsTable props={[
          { name: 'label', type: 'string', default: '—' },
          { name: 'placeholder', type: 'string', default: '—' },
          { name: 'size', type: "'sm' | 'default' | 'lg'", default: "'default'" },
          { name: 'prefixIcon', type: 'ReactNode', default: '—' },
          { name: 'suffixIcon', type: 'ReactNode', default: '—' },
          { name: 'maxLength', type: 'number', default: '—' },
          { name: 'description', type: 'string', default: '—' },
          { name: 'error', type: 'string', default: '—' },
          { name: 'disabled', type: 'boolean', default: 'false' },
          { name: 'value', type: 'string', default: '—' },
          { name: 'onChange', type: 'React.ChangeEventHandler<HTMLInputElement>', default: '—' },
        ]} />
      </DocSection>
    </DocPage>
  )
}

function Grid({ children }: { children: React.ReactNode }) {
  return <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">{children}</div>
}
