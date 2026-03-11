import { ArrowRight, Mail, Trash2 } from 'lucide-react'
import { Button, Code, PageHeader } from '@aplo/ui'
import { DocPage, DocSection } from '@/components/doc-page'
import { PropsTable } from '@/components/props-table'
import { Preview } from '@/components/preview'

const TOC = [
  { id: 'installation', label: 'Installation' },
  { id: 'usage', label: 'Usage' },
  { id: 'variants', label: 'Variants' },
  { id: 'sizes', label: 'Sizes' },
  { id: 'icons', label: 'With Icons' },
  { id: 'loading', label: 'Loading' },
  { id: 'disabled', label: 'Disabled' },
  { id: 'full-width', label: 'Full Width' },
  { id: 'api', label: 'API Reference' },
]

export default function ButtonDocs() {
  return (
    <DocPage toc={TOC}>

      <PageHeader
        title="Button"
        description="Flexible button primitive built on CVA + Tailwind. Switch variants, sizes, or loading states — all driven by CSS variables so one edit rethemes every button in the app."
      />

      <DocSection id="installation" title="Installation">
        <Code language="ts">{`import { Button } from '@aplo/ui'`}</Code>
      </DocSection>

      <DocSection id="usage" title="Usage">
        <Code>{`<Button variant="primary" size="lg">
  Get started <ArrowRight />
</Button>`}</Code>
      </DocSection>

      <DocSection id="variants" title="Variants">
        <Preview>
          <Row>
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="destructive">Destructive</Button>
            <Button variant="link">Link</Button>
          </Row>
        </Preview>
      </DocSection>

      <DocSection id="sizes" title="Sizes">
        <Preview>
          <Row align="end">
            <Button variant="primary" size="sm">Small</Button>
            <Button variant="primary" size="default">Default</Button>
            <Button variant="primary" size="lg">Large</Button>
            <Button variant="primary" size="xl">Extra Large</Button>
          </Row>
        </Preview>
      </DocSection>

      <DocSection id="icons" title="With Icons">
        <Preview>
          <Row>
            <Button variant="primary">Get started <ArrowRight /></Button>
            <Button variant="outline"><Mail /> Contact us</Button>
            <Button variant="destructive"><Trash2 /> Delete</Button>
            <Button variant="secondary" size="icon" aria-label="Send email"><Mail /></Button>
            <Button variant="outline" size="icon-sm" aria-label="Delete"><Trash2 /></Button>
          </Row>
        </Preview>
      </DocSection>

      <DocSection id="loading" title="Loading">
        <Preview>
          <Row>
            <Button loading>Saving…</Button>
            <Button variant="secondary" loading>Processing</Button>
            <Button variant="outline" loading>Loading</Button>
          </Row>
        </Preview>
      </DocSection>

      <DocSection id="disabled" title="Disabled">
        <Preview>
          <Row>
            <Button disabled>Default</Button>
            <Button variant="secondary" disabled>Secondary</Button>
            <Button variant="outline" disabled>Outline</Button>
            <Button variant="ghost" disabled>Ghost</Button>
          </Row>
        </Preview>
      </DocSection>

      <DocSection id="full-width" title="Full Width">
        <Preview centered={false}>
          <div className="w-full max-w-xs space-y-3">
            <Button variant="primary" className="w-full">Let's chat</Button>
            <Button variant="outline" className="w-full">Find out how <ArrowRight /></Button>
          </div>
        </Preview>
      </DocSection>

      <DocSection id="api" title="API Reference">
        <PropsTable props={[
          { name: 'variant', type: "'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive' | 'link'", default: "'primary'" },
          { name: 'size', type: "'sm' | 'default' | 'lg' | 'xl' | 'icon' | 'icon-sm'", default: "'default'" },
          { name: 'loading', type: 'boolean', default: 'false' },
          { name: 'disabled', type: 'boolean', default: 'false' },
          { name: 'className', type: 'string', default: '—' },
        ]} />
      </DocSection>

    </DocPage>
  )
}

function Row({ children, align = 'center' }: { children: React.ReactNode; align?: 'center' | 'end' }) {
  return <div className={`flex flex-wrap gap-3 items-${align}`}>{children}</div>
}
