import { ArrowRight, Mail, Trash2 } from 'lucide-react'
import { Button, Container, PageHeader } from '@aplo/ui'

export default function ButtonDocs() {
  return (
    <Container className="py-16 space-y-16">

      <PageHeader
        id="button"
        title="Button"
        description="Flexible button primitive built on CVA + Tailwind. Switch variants, sizes, or loading states — all driven by CSS variables so one edit rethemes every button in the app."
      />

      <hr className="border-border" />

      <section id="variants" className="space-y-6">
        <SectionLabel>Variants</SectionLabel>
        <Row>
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="destructive">Destructive</Button>
          <Button variant="link">Link</Button>
        </Row>
      </section>

      <section id="sizes" className="space-y-6">
        <SectionLabel>Sizes</SectionLabel>
        <Row align="end">
          <Button  variant="primary" size="sm">Small</Button>
          <Button  variant="primary" size="default">Default</Button>
          <Button  variant="primary" size="lg">Large</Button>
          <Button variant="primary" size="xl">Extra Large</Button>
        </Row>
      </section>

      <section id="icons" className="space-y-6">
        <SectionLabel>With Icons</SectionLabel>
        <Row>
          <Button variant="primary">Get started <ArrowRight /></Button>
          <Button variant="outline"><Mail /> Contact us</Button>
          <Button variant="destructive"><Trash2 /> Delete</Button>
          <Button variant="secondary" size="icon" aria-label="Send email"><Mail /></Button>
          <Button variant="outline" size="icon-sm" aria-label="Delete"><Trash2 /></Button>
        </Row>
      </section>

      <section id="loading" className="space-y-6">
        <SectionLabel>Loading state</SectionLabel>
        <Row>
          <Button loading>Saving…</Button>
          <Button variant="secondary" loading>Processing</Button>
          <Button variant="outline" loading>Loading</Button>
        </Row>
      </section>

      <section id="disabled" className="space-y-6">
        <SectionLabel>Disabled state</SectionLabel>
        <Row>
          <Button disabled>Default</Button>
          <Button variant="secondary" disabled>Secondary</Button>
          <Button variant="outline" disabled>Outline</Button>
          <Button variant="ghost" disabled>Ghost</Button>
        </Row>
      </section>

      <section id="full-width" className="space-y-6">
        <SectionLabel>Full width</SectionLabel>
        <div className="max-w-xs space-y-3">
          <Button  variant="primary" className="w-full">Let's chat</Button>
          <Button  variant="outline" className="w-full">Find out how <ArrowRight /></Button>
        </div>
      </section>

      <hr className="border-border" />

      <section id="usage" className="space-y-4">
        <SectionLabel>Usage</SectionLabel>
        <pre className="rounded-lg bg-card border border-border px-6 py-5 text-sm text-muted-foreground overflow-x-auto leading-relaxed">
          {`import { Button } from '@aplo/ui'

// Variants: primary | secondary | outline | ghost | destructive | link
// Sizes:    sm | default | lg | xl | icon | icon-sm

<Button variant="primary" size="lg">
  Get started <ArrowRight />
</Button>

<Button loading>Saving…</Button>`}
        </pre>
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

function Row({ children, align = 'center' }: { children: React.ReactNode; align?: 'center' | 'end' }) {
  return <div className={`flex flex-wrap gap-3 items-${align}`}>{children}</div>
}
