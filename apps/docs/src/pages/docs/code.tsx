import { Code, PageHeader } from '@aplo/ui'
import { DocPage, DocSection } from '@/components/doc-page'
import { PropsTable } from '@/components/props-table'
import { CodePropDefs } from '@/gen/component-props'

const TOC = [
  { id: 'installation', label: 'Installation' },
  { id: 'usage', label: 'Usage' },
  { id: 'languages', label: 'Languages' },
  { id: 'no-copy', label: 'Without Copy Button' },
  { id: 'api', label: 'API Reference' },
]

export default function CodeDocs() {
  return (
    <DocPage toc={TOC}>

      <PageHeader
        title="Code"
        description="Syntax-highlighted code block with a copy-to-clipboard button. Supports TSX, TypeScript, Bash, and more via Prism. Automatically adapts to light and dark themes."
      />

      <DocSection id="installation" title="Installation">
        <Code language="ts">{`import { Code } from '@aplo/ui'`}</Code>
      </DocSection>

      <DocSection id="usage" title="Usage">
        <Code>{`import { Button } from '@aplo/ui'

export function Example() {
  return <Button variant="primary">Click me</Button>
}`}</Code>
      </DocSection>

      <DocSection id="languages" title="Languages">
        <p className="text-sm text-muted-foreground mb-4">
          Supported languages: <code className="text-xs bg-muted px-1.5 py-0.5 rounded">tsx</code>{' '}
          <code className="text-xs bg-muted px-1.5 py-0.5 rounded">typescript</code>{' '}
          <code className="text-xs bg-muted px-1.5 py-0.5 rounded">ts</code>{' '}
          <code className="text-xs bg-muted px-1.5 py-0.5 rounded">bash</code>{' '}
          <code className="text-xs bg-muted px-1.5 py-0.5 rounded">sh</code>
        </p>
        <div className="space-y-4">
          <Code language="tsx">{`// TSX — language="tsx" (default)
function Greeting({ name }: { name: string }) {
  return <h1 className="text-2xl font-bold">Hello, {name}!</h1>
}`}</Code>
          <Code language="bash">{`# Bash — language="bash"
pnpm install @aplo/ui
pnpm dev`}</Code>
          <Code language="ts">{`// TypeScript — language="ts"
type Status = 'idle' | 'loading' | 'success' | 'error'

async function fetchUser(id: string): Promise<{ name: string; status: Status }> {
  const res = await fetch(\`/api/users/\${id}\`)
  return res.json()
}`}</Code>
        </div>
      </DocSection>

      <DocSection id="no-copy" title="Without Copy Button">
        <Code showCopy={false}>{`<Code showCopy={false}>...</Code>`}</Code>
      </DocSection>

      <DocSection id="api" title="API Reference">
        <PropsTable props={CodePropDefs} />
      </DocSection>

    </DocPage>
  )
}
