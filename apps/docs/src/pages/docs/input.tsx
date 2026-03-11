import * as React from 'react'
import { Container, PageHeader, Input } from '@aplo/ui'
import { Search, Eye, EyeOff, Mail, Lock } from 'lucide-react'

export default function InputDocs() {
  const [showPassword, setShowPassword] = React.useState(false)
  const [controlled, setControlled] = React.useState('')

  return (
    <Container className="py-16 space-y-16">

      <PageHeader
        id="input"
        title="Input"
        description={<>A Field-wired text input built on Base UI's <code className="text-xs bg-muted px-1.5 py-0.5 rounded">{'<Input>'}</code> with automatic a11y wiring, a teal focus ring, prefix/suffix slots, and a character countdown.</>}
      />

      <hr className="border-border" />

      <section id="default" className="space-y-6">
        <SectionLabel>Default</SectionLabel>
        <Grid>
          <Input label="Full name" />
          <Input label="Email address" type="email" />
          <Input label="Company" defaultValue="Acme Corp" />
        </Grid>
      </section>

      <hr className="border-border" />

      <section id="sizes" className="space-y-6">
        <SectionLabel>Sizes</SectionLabel>
        <Grid>
          <Input label="Small" size="sm" />
          <Input label="Default" size="default" />
          <Input label="Large" size="lg" />
        </Grid>
      </section>

      <hr className="border-border" />

      <section id="placeholder" className="space-y-6">
        <SectionLabel>Without label</SectionLabel>
        <Grid>
          <Input placeholder="Search…" />
          <Input placeholder="Enter a value" size="sm" />
          <Input placeholder="Large field" size="lg" />
        </Grid>
      </section>

      <hr className="border-border" />

      <section id="icons" className="space-y-6">
        <SectionLabel>Prefix &amp; suffix icons</SectionLabel>
        <Grid>
          <Input label="Search" prefixIcon={<Search />} />
          <Input label="Email" type="email" prefixIcon={<Mail />} />
          <Input
            label="Password"
            type={showPassword ? 'text' : 'password'}
            prefixIcon={<Lock />}
            suffixIcon={
              <button
                type="button"
                onClick={() => setShowPassword(p => !p)}
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
              </button>
            }
          />
        </Grid>
      </section>

      <hr className="border-border" />

      <section id="count" className="space-y-6">
        <SectionLabel>Character countdown</SectionLabel>
        <Grid>
          <Input label="Username" maxLength={20} />
          <Input label="Bio" maxLength={80} defaultValue="Approaching the limit soon…" />
        </Grid>
      </section>

      <hr className="border-border" />

      <section id="states" className="space-y-6">
        <SectionLabel>Description &amp; error</SectionLabel>
        <Grid>
          <Input
            label="Subdomain"
            description="Choose a unique identifier for your workspace."
          />
          <Input
            label="Email address"
            type="email"
            error="That email address is already in use."
            defaultValue="taken@example.com"
          />
          <Input label="API key" error="Key is invalid or has expired." />
        </Grid>
      </section>

      <hr className="border-border" />

      <section id="disabled" className="space-y-6">
        <SectionLabel>Disabled</SectionLabel>
        <Grid>
          <Input label="Read-only field" disabled defaultValue="Cannot edit" />
          <Input label="Empty disabled" disabled />
        </Grid>
      </section>

      <hr className="border-border" />

      <section id="controlled" className="space-y-6">
        <SectionLabel>Controlled</SectionLabel>
        <div className="max-w-sm space-y-3">
          <Input
            label="Live value"
            value={controlled}
            onChange={e => setControlled(e.target.value)}
          />
          <p className="text-xs text-muted-foreground font-mono">
            value: &quot;{controlled}&quot;
          </p>
        </div>
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

function Grid({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl">
      {children}
    </div>
  )
}
