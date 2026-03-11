import { ArrowRight } from 'lucide-react'
import { Button, Code, Hero, PageHeader } from '@aplo/ui'
import { DocPage, DocSection } from '@/components/doc-page'
import { PropsTable } from '@/components/props-table'
import { Preview } from '@/components/preview'

const TOC = [
  { id: 'installation', label: 'Installation' },
  { id: 'usage', label: 'Usage' },
  { id: 'default', label: 'Default' },
  { id: 'stipple', label: 'Stipple Globe' },
  { id: 'shadow', label: 'Shadow Options' },
  { id: 'scale-circle', label: 'Scale Circle' },
  { id: 'custom-radius', label: 'Custom Radius' },
  { id: 'notes', label: 'Notes' },
  { id: 'api', label: 'API Reference' },
]

export default function HeroDocs() {
  return (
    <DocPage toc={TOC}>
      <PageHeader title="Hero" description="A full-width section wrapper with an optional interactive stipple particle globe. Used for landing page hero sections." />

      <DocSection id="installation" title="Installation">
        <Code language="ts">{`import { Hero } from '@aplo/ui'`}</Code>
      </DocSection>

      <DocSection id="usage" title="Usage">
        <Code>{`import { Hero, Button } from '@aplo/ui'

<Hero backgroundEffect="stipple-follow" className="min-h-screen">
  <div className="px-12 py-24">
    <h1 className="text-5xl font-bold text-foreground">Heading</h1>
    <Button variant="primary" size="lg">Get started <ArrowRight /></Button>
  </div>
</Hero>`}</Code>
      </DocSection>

      <DocSection id="default" title="Default (no effect)">
        <Preview centered={false} className="p-0 overflow-hidden">
          <Hero className="min-h-48">
            <div className="flex flex-col items-center justify-center gap-4 py-16 text-center px-8">
              <h2 className="text-3xl font-bold text-foreground">Build faster with Aplo</h2>
              <p className="text-muted-foreground max-w-md text-sm">A shared design system for Aplo-built products.</p>
              <Button variant="primary">Get started <ArrowRight /></Button>
            </div>
          </Hero>
        </Preview>
      </DocSection>

      <DocSection id="stipple" title="Stipple Globe Effect">
        <p className="text-sm text-muted-foreground">Set <code className="text-xs bg-muted px-1.5 py-0.5 rounded">backgroundEffect="stipple-follow"</code> to enable the interactive teal particle globe. Move your cursor over the preview below.</p>
        <Preview centered={false} className="p-0 overflow-hidden">
          <Hero backgroundEffect="stipple-follow" className="min-h-72">
            <div className="flex flex-col items-start justify-center gap-4 py-20 px-12">
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Design system</p>
              <h2 className="text-4xl font-bold text-foreground max-w-md leading-tight">Shared components.<br />Shipped faster.</h2>
              <Button variant="primary" size="lg">Explore components <ArrowRight /></Button>
            </div>
          </Hero>
        </Preview>
      </DocSection>

      <DocSection id="shadow" title="Shadow Options">
        <p className="text-sm text-muted-foreground"><code className="text-xs bg-muted px-1.5 py-0.5 rounded">globeShadowAngle</code> controls which side is sparse. <code className="text-xs bg-muted px-1.5 py-0.5 rounded">globeShadowStrength</code> (0–1) controls the fade intensity.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Preview centered={false} className="p-0 overflow-hidden">
            <p className="text-xs text-muted-foreground px-4 pt-3 pb-1">angle=45 strength=0.9</p>
            <Hero backgroundEffect="stipple-follow" globeShadowAngle={45} globeShadowStrength={0.9} globeRadius={220} className="min-h-48" />
          </Preview>
          <Preview centered={false} className="p-0 overflow-hidden">
            <p className="text-xs text-muted-foreground px-4 pt-3 pb-1">angle=-135 strength=0.4</p>
            <Hero backgroundEffect="stipple-follow" globeShadowAngle={-135} globeShadowStrength={0.4} globeRadius={220} className="min-h-48" />
          </Preview>
        </div>
      </DocSection>

      <DocSection id="scale-circle" title="Scale Circle">
        <p className="text-sm text-muted-foreground mb-4">
          Set <code className="text-xs bg-muted px-1.5 py-0.5 rounded">scaleCircle</code> to let the globe radius adapt to the container — computed as{' '}
          <code className="text-xs bg-muted px-1.5 py-0.5 rounded">(width + height) / 4</code>, which keeps it roughly one-third of the hero's visual size at any dimension. Particularly useful when the hero height varies between breakpoints.
        </p>
        <Code>{`<Hero backgroundEffect="stipple-follow" scaleCircle className="min-h-96">
  …
</Hero>`}</Code>
        <Preview centered={false} className="p-0 overflow-hidden mt-4">
          <Hero backgroundEffect="stipple-follow" scaleCircle className="min-h-64">
            <div className="flex flex-col items-start justify-center gap-3 py-16 px-12">
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Scale circle</p>
              <h2 className="text-3xl font-bold text-foreground max-w-sm leading-tight">Globe scales with the container.</h2>
            </div>
          </Hero>
        </Preview>
      </DocSection>

      <DocSection id="custom-radius" title="Custom Radius">
        <p className="text-sm text-muted-foreground mb-4">
          Pass <code className="text-xs bg-muted px-1.5 py-0.5 rounded">globeRadius</code> to set an exact pixel size. This takes precedence over both <code className="text-xs bg-muted px-1.5 py-0.5 rounded">scaleCircle</code> and the built-in default of 640 px.
        </p>
        <Code>{`// Small, tight globe
<Hero backgroundEffect="stipple-follow" globeRadius={280} className="min-h-64">
  …
</Hero>

// Large, dramatic globe
<Hero backgroundEffect="stipple-follow" globeRadius={900} className="min-h-64">
  …
</Hero>`}</Code>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <Preview centered={false} className="p-0 overflow-hidden">
            <p className="text-xs text-muted-foreground px-4 pt-3 pb-1">globeRadius=280</p>
            <Hero backgroundEffect="stipple-follow" globeRadius={280} className="min-h-48" />
          </Preview>
          <Preview centered={false} className="p-0 overflow-hidden">
            <p className="text-xs text-muted-foreground px-4 pt-3 pb-1">globeRadius=900</p>
            <Hero backgroundEffect="stipple-follow" globeRadius={900} className="min-h-48" />
          </Preview>
        </div>
      </DocSection>

      <DocSection id="notes" title="Notes">
        <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside">
          <li>The canvas is <code className="text-xs bg-muted px-1.5 py-0.5 rounded">aria-hidden="true"</code> — purely decorative.</li>
          <li>When motion is disabled (via <code className="text-xs bg-muted px-1.5 py-0.5 rounded">MotionProvider</code>), the globe renders as a static snapshot instead of animating.</li>
          <li><code className="text-xs bg-muted px-1.5 py-0.5 rounded">scaleCircle</code> recalculates on every <code className="text-xs bg-muted px-1.5 py-0.5 rounded">ResizeObserver</code> tick, so the globe always fits correctly as the container resizes.</li>
          <li><code className="text-xs bg-muted px-1.5 py-0.5 rounded">globeRadius</code> takes priority over <code className="text-xs bg-muted px-1.5 py-0.5 rounded">scaleCircle</code> — there's no need to unset <code className="text-xs bg-muted px-1.5 py-0.5 rounded">scaleCircle</code> when using a fixed radius.</li>
          <li>Do not nest <code className="text-xs bg-muted px-1.5 py-0.5 rounded">Hero</code> inside a <code className="text-xs bg-muted px-1.5 py-0.5 rounded">Container</code> — it is designed to be full-width.</li>
        </ul>
      </DocSection>

      <DocSection id="api" title="API Reference">
        <PropsTable props={[
          { name: 'backgroundEffect', type: "'stipple-follow' | undefined", default: '—', description: 'Enables the interactive stipple particle globe.' },
          { name: 'globeShadowAngle', type: 'number', default: '-135', description: 'Angle (degrees) of the sparse/shadow side of the globe.' },
          { name: 'globeShadowStrength', type: 'number', default: '0.75', description: 'Fade intensity of the directional shadow (0 = uniform, 1 = maximum).' },
          { name: 'scaleCircle', type: 'boolean', default: 'false', description: 'Scale the globe radius proportionally with the container (~1/3 of hero size).' },
          { name: 'globeRadius', type: 'number', default: '—', description: 'Explicit globe radius in pixels. Overrides scaleCircle and the built-in default (640).' },
          { name: 'className', type: 'string', default: '—', description: 'Additional class names applied to the section element.' },
          { name: 'children', type: 'ReactNode', default: '—', description: 'Content rendered above the canvas layer.' },
        ]} />
      </DocSection>
    </DocPage>
  )
}
