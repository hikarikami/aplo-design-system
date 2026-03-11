import { Hero, Container, PageHeader, Button } from '@aplo/ui'
import { ArrowRight } from 'lucide-react'

export default function HeroDocs() {
  return (
    <Container className="py-16 space-y-16">

      <PageHeader
        title="Hero"
        description="A full-width section wrapper with an optional interactive stipple particle globe. Used for landing page hero sections."
      />

      <hr className="border-border" />

      <section id="default" className="space-y-6">
        <SectionLabel>Default (no effect)</SectionLabel>
        <p className="text-sm text-muted-foreground">
          Without <code className="text-xs bg-card border border-border rounded px-1.5 py-0.5">backgroundEffect</code>, Hero is a plain <code className="text-xs bg-card border border-border rounded px-1.5 py-0.5">{'<section>'}</code> wrapper with <code className="text-xs bg-card border border-border rounded px-1.5 py-0.5">bg-background overflow-hidden</code>. Children are rendered inside a <code className="text-xs bg-card border border-border rounded px-1.5 py-0.5">relative z-10</code> div.
        </p>
        <div className="rounded-lg border border-border overflow-hidden">
          <Hero className="min-h-48">
            <div className="flex flex-col items-center justify-center gap-4 py-16 text-center px-8">
              <h2 className="text-3xl font-bold text-foreground">Build faster with Aplo</h2>
              <p className="text-muted-foreground max-w-md text-sm">A shared design system for Aplo-built products.</p>
              <Button variant="primary">Get started <ArrowRight /></Button>
            </div>
          </Hero>
        </div>
      </section>

      <section id="stipple" className="space-y-6">
        <SectionLabel>Stipple globe effect</SectionLabel>
        <p className="text-sm text-muted-foreground">
          Set <code className="text-xs bg-card border border-border rounded px-1.5 py-0.5">backgroundEffect="stipple-follow"</code> to enable the interactive teal particle globe anchored to the bottom-right. The globe responds to cursor movement within the section. Move your cursor over the preview below.
        </p>
        <div className="rounded-lg border border-border overflow-hidden">
          <Hero backgroundEffect="stipple-follow" className="min-h-72">
            <div className="flex flex-col items-start justify-center gap-4 py-20 px-12">
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Design system</p>
              <h2 className="text-4xl font-bold text-foreground max-w-md leading-tight">
                Shared components.<br />Shipped faster.
              </h2>
              <p className="text-muted-foreground max-w-sm text-sm">
                Built for internal tools, Figma plugins, and AI-assisted prototypes.
              </p>
              <Button variant="primary" size="lg">Explore components <ArrowRight /></Button>
            </div>
          </Hero>
        </div>
      </section>

      <section id="shadow" className="space-y-6">
        <SectionLabel>Shadow angle & strength</SectionLabel>
        <p className="text-sm text-muted-foreground">
          <code className="text-xs bg-card border border-border rounded px-1.5 py-0.5">globeShadowAngle</code> (degrees) controls which side of the globe is sparse. <code className="text-xs bg-card border border-border rounded px-1.5 py-0.5">globeShadowStrength</code> (0–1) controls how strong the fade is. Default angle is <code className="text-xs bg-card border border-border rounded px-1.5 py-0.5">-135</code> (top-left shadow), default strength is <code className="text-xs bg-card border border-border rounded px-1.5 py-0.5">0.75</code>.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="rounded-lg border border-border overflow-hidden">
            <p className="text-xs text-muted-foreground px-4 pt-3 pb-1">angle=45 strength=0.9 (bottom-right shadow)</p>
            <Hero backgroundEffect="stipple-follow" globeShadowAngle={45} globeShadowStrength={0.9} className="min-h-48" />
          </div>
          <div className="rounded-lg border border-border overflow-hidden">
            <p className="text-xs text-muted-foreground px-4 pt-3 pb-1">angle=-135 strength=0.4 (subtle top-left shadow)</p>
            <Hero backgroundEffect="stipple-follow" globeShadowAngle={-135} globeShadowStrength={0.4} className="min-h-48" />
          </div>
        </div>
      </section>

      <hr className="border-border" />

      <section id="usage" className="space-y-4">
        <SectionLabel>Usage</SectionLabel>
        <pre className="rounded-lg bg-card border border-border px-6 py-5 text-sm text-muted-foreground overflow-x-auto leading-relaxed">
          {`import { Hero, Button } from '@aplo/ui'
import { ArrowRight } from 'lucide-react'

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
</Hero>`}
        </pre>
      </section>

      <section id="notes" className="space-y-4">
        <SectionLabel>Notes</SectionLabel>
        <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside">
          <li>The canvas is <code className="text-xs bg-card border border-border rounded px-1.5 py-0.5">aria-hidden="true"</code> — purely decorative.</li>
          <li>When motion is disabled (via the Motion toggle or <code className="text-xs bg-card border border-border rounded px-1.5 py-0.5">prefers-reduced-motion</code>), the globe renders as a static snapshot with no animation.</li>
          <li>Use <code className="text-xs bg-card border border-border rounded px-1.5 py-0.5">Stack</code> to wrap Hero alongside other page sections to prevent z-index bleed.</li>
          <li>Do not nest Hero inside a <code className="text-xs bg-card border border-border rounded px-1.5 py-0.5">Container</code> — it is designed to be full-width. Put <code className="text-xs bg-card border border-border rounded px-1.5 py-0.5">Container</code> inside Hero's children instead.</li>
          <li>Use only once per page.</li>
        </ul>
      </section>

    </Container>
  )
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
      {children}
    </h2>
  )
}
