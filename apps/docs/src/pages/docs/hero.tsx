import { ArrowRight } from 'lucide-react'
import { Button, Code, Hero, PageHeader } from '@aplo/ui'
import { DocPage, DocSection } from '@/components/doc-page'
import { PropsTable } from '@/components/props-table'

const TOC = [
  { id: 'installation', label: 'Installation' },
  { id: 'usage', label: 'Usage' },
  { id: 'default', label: 'Default' },
  { id: 'stipple', label: 'Stipple Globe' },
  { id: 'shadow', label: 'Shadow Options' },
  { id: 'notes', label: 'Notes' },
  { id: 'api', label: 'API Reference' },
]

export default function HeroDocs() {
  return (
    <DocPage toc={TOC}>

      <PageHeader
        title="Hero"
        description="A full-width section wrapper with an optional interactive stipple particle globe. Used for landing page hero sections."
      />

      <DocSection id="installation" title="Installation">
        <Code language="ts">{`import { Hero } from '@aplo/ui'`}</Code>
      </DocSection>

      <DocSection id="usage" title="Usage">
        <Code>{`import { Hero, Button } from '@aplo/ui'

// Plain wrapper — no background effect
<Hero className="min-h-screen">
  <div className="flex flex-col items-center py-24">
    <h1>Hello world</h1>
  </div>
</Hero>

// Interactive stipple globe
<Hero
  backgroundEffect="stipple-follow"
  globeShadowAngle={-135}
  globeShadowStrength={0.75}
  className="min-h-screen"
>
  <div className="px-12 py-24">
    <h1 className="text-5xl font-bold text-foreground">Heading</h1>
    <Button variant="primary" size="lg">
      Get started <ArrowRight />
    </Button>
  </div>
</Hero>`}</Code>
      </DocSection>

      <DocSection id="default" title="Default (no effect)">
        <div className="rounded-lg border border-border overflow-hidden">
          <Hero className="min-h-48">
            <div className="flex flex-col items-center justify-center gap-4 py-16 text-center px-8">
              <h2 className="text-3xl font-bold text-foreground">Build faster with Aplo</h2>
              <p className="text-muted-foreground max-w-md text-sm">A shared design system for Aplo-built products.</p>
              <Button variant="primary">Get started <ArrowRight /></Button>
            </div>
          </Hero>
        </div>
      </DocSection>

      <DocSection id="stipple" title="Stipple Globe Effect">
        <p className="text-sm text-muted-foreground">
          Set <code className="text-xs bg-muted px-1.5 py-0.5 rounded">backgroundEffect="stipple-follow"</code> to enable the interactive teal particle globe. Move your cursor over the preview below.
        </p>
        <div className="rounded-lg border border-border overflow-hidden">
          <Hero backgroundEffect="stipple-follow" className="min-h-72">
            <div className="flex flex-col items-start justify-center gap-4 py-20 px-12">
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Design system</p>
              <h2 className="text-4xl font-bold text-foreground max-w-md leading-tight">
                Shared components.<br />Shipped faster.
              </h2>
              <Button variant="primary" size="lg">Explore components <ArrowRight /></Button>
            </div>
          </Hero>
        </div>
      </DocSection>

      <DocSection id="shadow" title="Shadow Options">
        <p className="text-sm text-muted-foreground">
          <code className="text-xs bg-muted px-1.5 py-0.5 rounded">globeShadowAngle</code> controls which side of the globe is sparse. <code className="text-xs bg-muted px-1.5 py-0.5 rounded">globeShadowStrength</code> (0–1) controls the fade intensity.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="rounded-lg border border-border overflow-hidden">
            <p className="text-xs text-muted-foreground px-4 pt-3 pb-1">angle=45 strength=0.9</p>
            <Hero backgroundEffect="stipple-follow" globeShadowAngle={45} globeShadowStrength={0.9} className="min-h-48" />
          </div>
          <div className="rounded-lg border border-border overflow-hidden">
            <p className="text-xs text-muted-foreground px-4 pt-3 pb-1">angle=-135 strength=0.4</p>
            <Hero backgroundEffect="stipple-follow" globeShadowAngle={-135} globeShadowStrength={0.4} className="min-h-48" />
          </div>
        </div>
      </DocSection>

      <DocSection id="notes" title="Notes">
        <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside">
          <li>The canvas is <code className="text-xs bg-muted px-1.5 py-0.5 rounded">aria-hidden="true"</code> — purely decorative.</li>
          <li>When motion is disabled, the globe renders as a static snapshot with no animation.</li>
          <li>Use <code className="text-xs bg-muted px-1.5 py-0.5 rounded">Stack</code> to wrap Hero alongside other sections to prevent z-index bleed.</li>
          <li>Do not nest Hero inside a <code className="text-xs bg-muted px-1.5 py-0.5 rounded">Container</code> — it is designed to be full-width. Put <code className="text-xs bg-muted px-1.5 py-0.5 rounded">Container</code> inside Hero's children instead.</li>
        </ul>
      </DocSection>

      <DocSection id="api" title="API Reference">
        <PropsTable props={[
          { name: 'backgroundEffect', type: "'stipple-follow' | undefined", default: '—' },
          { name: 'globeShadowAngle', type: 'number', default: '-135' },
          { name: 'globeShadowStrength', type: 'number', default: '0.75' },
          { name: 'className', type: 'string', default: '—' },
          { name: 'children', type: 'ReactNode', default: '—' },
        ]} />
      </DocSection>

    </DocPage>
  )
}
