import { Code, PageHeader } from '@aplo/ui'
import { DocPage, DocSection } from '@/components/doc-page'

const TOC = [
  { id: 'installation', label: 'Installation' },
  { id: 'setup', label: 'App Setup' },
  { id: 'styles', label: 'Styles' },
  { id: 'tailwind', label: 'Tailwind Integration' },
  { id: 'usage', label: 'Usage' },
  { id: 'ai-setup', label: 'AI Assistant Setup' },
]

export default function GettingStartedDocs() {
  return (
    <DocPage toc={TOC}>
      <PageHeader
        title="Getting Started"
        description="Install @aplo/ui and have your first component rendering in under five minutes."
      />

      <DocSection id="installation" title="Installation">
        <div className="flex items-start gap-3 rounded-lg border border-border bg-muted/40 px-4 py-3 mb-4">
          <span className="text-sm text-muted-foreground">
            Starting a new project with AI?{' '}
            <a href="/docs/ai-prompts#project-setup" className="text-primary underline-offset-4 hover:underline">
              Use the AI Project Setup prompt
            </a>{' '}
            to have Claude scaffold the entire setup for you.
          </span>
        </div>
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

      <DocSection id="ai-setup" title="AI Assistant Setup">
        <p className="text-sm text-muted-foreground mb-4">
          Aplo ships AI rules alongside the package so coding assistants know to use the design system correctly — the right components, tokens, and patterns — instead of generating raw HTML or introducing incompatible libraries.
        </p>
        <p className="text-sm text-muted-foreground mb-4">
          Add the following to your project's <code className="text-xs bg-muted px-1.5 py-0.5 rounded">CLAUDE.md</code> (create it at the project root if it doesn't exist):
        </p>
        <Code language="markdown">{`# UI

@node_modules/@aplo/ui/design-system/01-design-principles.md
@node_modules/@aplo/ui/design-system/02-ui-rules.md
@node_modules/@aplo/ui/design-system/ai-rules.md
@node_modules/@aplo/ui/design-system/03-components.md
@node_modules/@aplo/ui/design-system/04-layout-patterns.md`}</Code>
        <p className="text-sm text-muted-foreground mt-4 mb-4">
          For Cursor, create <code className="text-xs bg-muted px-1.5 py-0.5 rounded">.cursor/rules/aplo-ui.mdc</code>:
        </p>
        <Code language="markdown">{`---
alwaysApply: true
---
@node_modules/@aplo/ui/design-system/ai-rules.md`}</Code>
        <p className="text-sm text-muted-foreground mt-4">
          The rules file is included in the published package — no extra downloads needed.
        </p>
      </DocSection>

    </DocPage>
  )
}
