import * as React from 'react'
import { Container, PageHeader, Select, SelectItem, SelectGroup } from '@aplo/ui'

export default function SelectDocs() {
  const [controlled, setControlled] = React.useState<string | null>(null)

  return (
    <Container className="py-16 space-y-16">

      <PageHeader
        id="select"
        title="Select"
        description={<>A dropdown built on Base UI's headless Select. Trigger, popup, and items are fully keyboard-navigable and ARIA-wired. Sized to match <code className="text-xs bg-muted px-1.5 py-0.5 rounded">Input</code>.</>}
      />

      <hr className="border-border" />

      <section id="default" className="space-y-6">
        <SectionLabel>Default</SectionLabel>
        <Grid>
          <Select label="Country">
            <SelectItem value="au">Australia</SelectItem>
            <SelectItem value="us">United States</SelectItem>
            <SelectItem value="gb">United Kingdom</SelectItem>
            <SelectItem value="ca">Canada</SelectItem>
          </Select>
          <Select label="Plan" defaultValue="pro">
            <SelectItem value="free">Free</SelectItem>
            <SelectItem value="pro">Pro</SelectItem>
            <SelectItem value="enterprise">Enterprise</SelectItem>
          </Select>
          <Select label="Priority" placeholder="Set priority…">
            <SelectItem value="low">Low</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="high">High</SelectItem>
            <SelectItem value="critical">Critical</SelectItem>
          </Select>
        </Grid>
      </section>

      <hr className="border-border" />

      <section id="sizes" className="space-y-6">
        <SectionLabel>Sizes</SectionLabel>
        <Grid>
          <Select label="Small" size="sm">
            <SelectItem value="a">Option A</SelectItem>
            <SelectItem value="b">Option B</SelectItem>
          </Select>
          <Select label="Default" size="default">
            <SelectItem value="a">Option A</SelectItem>
            <SelectItem value="b">Option B</SelectItem>
          </Select>
          <Select label="Large" size="lg">
            <SelectItem value="a">Option A</SelectItem>
            <SelectItem value="b">Option B</SelectItem>
          </Select>
        </Grid>
      </section>

      <hr className="border-border" />

      <section id="groups" className="space-y-6">
        <SectionLabel>Groups</SectionLabel>
        <Grid>
          <Select label="Region">
            <SelectGroup label="Asia Pacific">
              <SelectItem value="au">Australia</SelectItem>
              <SelectItem value="jp">Japan</SelectItem>
              <SelectItem value="sg">Singapore</SelectItem>
            </SelectGroup>
            <SelectGroup label="Europe">
              <SelectItem value="gb">United Kingdom</SelectItem>
              <SelectItem value="de">Germany</SelectItem>
              <SelectItem value="fr">France</SelectItem>
            </SelectGroup>
          </Select>
        </Grid>
      </section>

      <hr className="border-border" />

      <section id="states" className="space-y-6">
        <SectionLabel>Description &amp; error</SectionLabel>
        <Grid>
          <Select
            label="Timezone"
            description="Used to localise notifications and reports."
          >
            <SelectItem value="utc">UTC</SelectItem>
            <SelectItem value="aest">AEST (UTC+10)</SelectItem>
            <SelectItem value="est">EST (UTC−5)</SelectItem>
          </Select>
          <Select
            label="Role"
            error="You don't have permission to change this."
            defaultValue="viewer"
          >
            <SelectItem value="viewer">Viewer</SelectItem>
            <SelectItem value="editor">Editor</SelectItem>
            <SelectItem value="admin">Admin</SelectItem>
          </Select>
        </Grid>
      </section>

      <hr className="border-border" />

      <section id="disabled" className="space-y-6">
        <SectionLabel>Disabled</SectionLabel>
        <Grid>
          <Select label="Locked field" disabled defaultValue="pro">
            <SelectItem value="free">Free</SelectItem>
            <SelectItem value="pro">Pro</SelectItem>
          </Select>
          <Select label="With disabled item">
            <SelectItem value="a">Available</SelectItem>
            <SelectItem value="b" disabled>Unavailable</SelectItem>
            <SelectItem value="c">Available</SelectItem>
          </Select>
        </Grid>
      </section>

      <hr className="border-border" />

      <section id="controlled" className="space-y-6">
        <SectionLabel>Controlled</SectionLabel>
        <div className="max-w-sm space-y-3">
          <Select
            label="Fruit"
            value={controlled ?? undefined}
            onValueChange={setControlled}
          >
            <SelectItem value="apple">Apple</SelectItem>
            <SelectItem value="banana">Banana</SelectItem>
            <SelectItem value="mango">Mango</SelectItem>
          </Select>
          <p className="text-xs text-muted-foreground font-mono">
            value: {controlled ? `"${controlled}"` : 'null'}
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
