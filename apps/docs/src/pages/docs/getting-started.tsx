import { Code, PageHeader } from '@aplo/ui'
import { DocPage, DocSection } from '@/components/doc-page'

const TOC = [
  { id: 'installation', label: 'Installation' },
  { id: 'setup', label: 'App Setup' },
  { id: 'styles', label: 'Styles' },
  { id: 'tailwind', label: 'Tailwind Integration' },
  { id: 'usage', label: 'Usage' },
]

export default function GettingStartedDocs() {
  return (
    <DocPage toc={TOC}>
      <PageHeader
        title="Getting Started"
        description="Install @aplo/ui and have your first component rendering in under five minutes."
      />

      <DocSection id="installation" title="Installation">
        <p className="text-sm text-muted-foreground mb-4">
          Install the package with your preferred package manager.
        </p>
        <Code language="bash">{`npm install @aplo/ui
# or
pnpm add @aplo/ui
# or
yarn add @aplo/ui`}</Code>
        <p className="text-sm text-muted-foreground mt-4">
          Peer dependencies — React 18+ and React DOM — must already be installed in your project.
        </p>
      </DocSection>

      <DocSection id="setup" title="App Setup">
        <p className="text-sm text-muted-foreground mb-4">
          Wrap your app root with <code className="text-xs bg-muted px-1.5 py-0.5 rounded">ThemeProvider</code> and <code className="text-xs bg-muted px-1.5 py-0.5 rounded">MotionProvider</code>. All <code className="text-xs bg-muted px-1.5 py-0.5 rounded">@aplo/ui</code> components read from these contexts — you only need to add them once.
        </p>
        <Code language="tsx">{`// main.tsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ThemeProvider, MotionProvider } from '@aplo/ui'
import '@aplo/ui/styles'
import App from './App'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <MotionProvider>
        <App />
      </MotionProvider>
    </ThemeProvider>
  </StrictMode>
)`}</Code>
        <div className="mt-4 space-y-2 text-sm text-muted-foreground">
          <p><strong className="text-foreground">ThemeProvider</strong> — persists light/dark preference to <code className="text-xs bg-muted px-1.5 py-0.5 rounded">localStorage</code> and toggles a <code className="text-xs bg-muted px-1.5 py-0.5 rounded">.dark</code> class on <code className="text-xs bg-muted px-1.5 py-0.5 rounded">{'<html>'}</code>. Defaults to dark.</p>
          <p><strong className="text-foreground">MotionProvider</strong> — persists animation preference to <code className="text-xs bg-muted px-1.5 py-0.5 rounded">localStorage</code> and respects the OS <code className="text-xs bg-muted px-1.5 py-0.5 rounded">prefers-reduced-motion</code> setting automatically.</p>
        </div>
      </DocSection>

      <DocSection id="styles" title="Styles">
        <p className="text-sm text-muted-foreground mb-4">
          Import the stylesheet once at your app entry point. This includes all design tokens, base styles, and component CSS.
        </p>
        <Code language="tsx">{`// In your entry file (main.tsx / index.tsx)
import '@aplo/ui/styles'`}</Code>
        <p className="text-sm text-muted-foreground mt-4 mb-4">Or import it from a CSS file:</p>
        <Code language="css">{`/* globals.css */
@import '@aplo/ui/styles';`}</Code>
      </DocSection>

      <DocSection id="tailwind" title="Tailwind Integration">
        <p className="text-sm text-muted-foreground mb-4">
          If your project uses Tailwind CSS v4 and you want access to Aplo's design tokens (colours, spacing, radius) in your own utility classes, extend your CSS entry with the following:
        </p>
        <Code language="css">{`/* globals.css */
@import "tailwindcss";
@import "@aplo/ui/styles";
@source "./node_modules/@aplo/ui/dist";`}</Code>
        <p className="text-sm text-muted-foreground mt-4">
          The <code className="text-xs bg-muted px-1.5 py-0.5 rounded">@source</code> directive tells Tailwind to scan the distributed component files so none of their utility classes get purged from your build.
        </p>
      </DocSection>

      <DocSection id="usage" title="Usage">
        <p className="text-sm text-muted-foreground mb-4">
          Import components directly from <code className="text-xs bg-muted px-1.5 py-0.5 rounded">@aplo/ui</code> — no sub-path imports required.
        </p>
        <Code language="tsx">{`import { Button, Input, Switch } from '@aplo/ui'

export function MyForm() {
  return (
    <form className="flex flex-col gap-4 max-w-sm">
      <Input label="Email" placeholder="you@example.com" />
      <Input label="Password" type="password" />
      <Button type="submit">Sign in</Button>
    </form>
  )
}`}</Code>
        <p className="text-sm text-muted-foreground mt-4">
          Browse the Components section in the sidebar to see all available components with live previews and full API references.
        </p>
      </DocSection>

    </DocPage>
  )
}
