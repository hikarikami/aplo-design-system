import * as React from 'react'
import { Code, PageHeader, Select, SelectGroup, SelectItem } from '@aplo/ui'
import { DocPage, DocSection } from '@/components/doc-page'
import { PropsTable } from '@/components/props-table'
import { Preview } from '@/components/preview'

const TOC = [
  { id: 'installation', label: 'Installation' },
  { id: 'usage', label: 'Usage' },
  { id: 'default', label: 'Default' },
  { id: 'sizes', label: 'Sizes' },
  { id: 'groups', label: 'Groups' },
  { id: 'states', label: 'Description & Error' },
  { id: 'disabled', label: 'Disabled' },
  { id: 'controlled', label: 'Controlled' },
  { id: 'api', label: 'API Reference' },
]

export default function SelectDocs() {
  const [controlled, setControlled] = React.useState<string | null>(null)

  return (
    <DocPage toc={TOC}>
      <PageHeader title="Select" description="A dropdown built on Base UI's headless Select. Trigger, popup, and items are fully keyboard-navigable and ARIA-wired. Sized to match Input." />

      <DocSection id="installation" title="Installation">
        <Code language="ts">{`import { Select, SelectItem, SelectGroup } from '@aplo/ui'`}</Code>
      </DocSection>

      <DocSection id="usage" title="Usage">
        <Code>{`<Select label="Country">
  <SelectItem value="au">Australia</SelectItem>
  <SelectItem value="us">United States</SelectItem>
</Select>

// Controlled
const [value, setValue] = useState<string | null>(null)
<Select label="Plan" value={value ?? undefined} onValueChange={setValue}>
  <SelectItem value="free">Free</SelectItem>
  <SelectItem value="pro">Pro</SelectItem>
</Select>`}</Code>
      </DocSection>

      <DocSection id="default" title="Default">
        <Preview centered={false}>
          <Grid>
            <Select label="Country"><SelectItem value="au">Australia</SelectItem><SelectItem value="us">United States</SelectItem><SelectItem value="gb">United Kingdom</SelectItem></Select>
            <Select label="Plan" defaultValue="pro"><SelectItem value="free">Free</SelectItem><SelectItem value="pro">Pro</SelectItem><SelectItem value="enterprise">Enterprise</SelectItem></Select>
            <Select label="Priority" placeholder="Set priority…"><SelectItem value="low">Low</SelectItem><SelectItem value="medium">Medium</SelectItem><SelectItem value="high">High</SelectItem></Select>
          </Grid>
        </Preview>
      </DocSection>

      <DocSection id="sizes" title="Sizes">
        <Preview centered={false}>
          <Grid>
            <Select label="Small" size="sm"><SelectItem value="a">Option A</SelectItem><SelectItem value="b">Option B</SelectItem></Select>
            <Select label="Default" size="default"><SelectItem value="a">Option A</SelectItem><SelectItem value="b">Option B</SelectItem></Select>
            <Select label="Large" size="lg"><SelectItem value="a">Option A</SelectItem><SelectItem value="b">Option B</SelectItem></Select>
          </Grid>
        </Preview>
      </DocSection>

      <DocSection id="groups" title="Groups">
        <Preview centered={false}>
          <div className="w-full max-w-xs">
            <Select label="Region">
              <SelectGroup label="Asia Pacific"><SelectItem value="au">Australia</SelectItem><SelectItem value="jp">Japan</SelectItem><SelectItem value="sg">Singapore</SelectItem></SelectGroup>
              <SelectGroup label="Europe"><SelectItem value="gb">United Kingdom</SelectItem><SelectItem value="de">Germany</SelectItem><SelectItem value="fr">France</SelectItem></SelectGroup>
            </Select>
          </div>
        </Preview>
      </DocSection>

      <DocSection id="states" title="Description &amp; Error">
        <Preview centered={false}>
          <Grid>
            <Select label="Timezone" description="Used to localise notifications and reports."><SelectItem value="utc">UTC</SelectItem><SelectItem value="aest">AEST (UTC+10)</SelectItem><SelectItem value="est">EST (UTC−5)</SelectItem></Select>
            <Select label="Role" error="You don't have permission to change this." defaultValue="viewer"><SelectItem value="viewer">Viewer</SelectItem><SelectItem value="editor">Editor</SelectItem><SelectItem value="admin">Admin</SelectItem></Select>
          </Grid>
        </Preview>
      </DocSection>

      <DocSection id="disabled" title="Disabled">
        <Preview centered={false}>
          <Grid>
            <Select label="Locked field" disabled defaultValue="pro"><SelectItem value="free">Free</SelectItem><SelectItem value="pro">Pro</SelectItem></Select>
            <Select label="With disabled item"><SelectItem value="a">Available</SelectItem><SelectItem value="b" disabled>Unavailable</SelectItem><SelectItem value="c">Available</SelectItem></Select>
          </Grid>
        </Preview>
      </DocSection>

      <DocSection id="controlled" title="Controlled">
        <Preview centered={false}>
          <div className="max-w-xs space-y-3 w-full">
            <Select label="Fruit" value={controlled ?? undefined} onValueChange={setControlled}><SelectItem value="apple">Apple</SelectItem><SelectItem value="banana">Banana</SelectItem><SelectItem value="mango">Mango</SelectItem></Select>
            <p className="text-xs text-muted-foreground font-mono">value: {controlled ? `"${controlled}"` : 'null'}</p>
          </div>
        </Preview>
      </DocSection>

      <DocSection id="api" title="API Reference">
        <PropsTable props={[
          { name: 'label', type: 'string', default: '—' },
          { name: 'placeholder', type: 'string', default: "'Select…'" },
          { name: 'size', type: "'sm' | 'default' | 'lg'", default: "'default'" },
          { name: 'value', type: 'string | undefined', default: '—' },
          { name: 'defaultValue', type: 'string', default: '—' },
          { name: 'onValueChange', type: '(value: string) => void', default: '—' },
          { name: 'description', type: 'string', default: '—' },
          { name: 'error', type: 'string', default: '—' },
          { name: 'disabled', type: 'boolean', default: 'false' },
          { name: 'children', type: 'ReactNode', default: '—' },
        ]} />
      </DocSection>
    </DocPage>
  )
}

function Grid({ children }: { children: React.ReactNode }) {
  return <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">{children}</div>
}
