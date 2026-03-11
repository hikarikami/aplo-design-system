import { Code, PageHeader } from '@aplo/ui'
import { DocPage, DocSection } from '@/components/doc-page'

const TOC = [
  { id: 'overview', label: 'Overview' },
  { id: 'project-setup', label: 'New Project Setup' },
  { id: 'system-prompt', label: 'System Prompt' },
  { id: 'feature-prompt', label: 'Feature Prompts' },
]

export default function AiPromptsDocs() {
  return (
    <DocPage toc={TOC}>

      <PageHeader
        title="AI Prompts"
        description="Ready-to-use prompts for AI coding assistants. Paste these into Claude Code, Cursor, or any AI tool to keep generated code consistent with the Aplo design system."
      />

      <DocSection id="overview" title="Overview">
        <div className="space-y-3 text-sm text-muted-foreground">
          <p>
            AI assistants generate generic UI by default — raw <code className="text-xs bg-muted px-1.5 py-0.5 rounded">{'<button>'}</code> elements, inline styles, and custom components that don't fit the system. These prompts give the AI the context it needs to use <code className="text-xs bg-muted px-1.5 py-0.5 rounded">@aplo/ui</code> correctly from the start.
          </p>
          <p>
            Use the <strong className="text-foreground">New Project Setup</strong> prompt when scaffolding a new app, the <strong className="text-foreground">System Prompt</strong> at the start of any ongoing session, and the <strong className="text-foreground">Feature Prompts</strong> mid-session when building a specific screen or component.
          </p>
        </div>
      </DocSection>

      <DocSection id="project-setup" title="New Project Setup">
        <p className="text-sm text-muted-foreground mb-4">
          Use this when starting a brand-new app with the Aplo design system. Paste it into Claude Code or Cursor and it will scaffold the full setup for you.
        </p>
        <Code showCopy>{`Set up a new React + TypeScript + Vite app using the @aplo/ui design system.

1. Install dependencies:
   pnpm add @aplo/ui react react-dom
   pnpm add -D vite @vitejs/plugin-react @tailwindcss/vite tailwindcss typescript

2. In main.tsx, import the styles and wrap the app:
   import '@aplo/ui/styles'
   import { AploProvider } from '@aplo/ui'

   createRoot(document.getElementById('root')!).render(
     <AploProvider>
       <App />
     </AploProvider>
   )

3. In vite.config.ts, add the Tailwind plugin:
   import tailwindcss from '@tailwindcss/vite'
   plugins: [react(), tailwindcss()]

4. In globals.css, import Tailwind and the Aplo theme:
   @import "tailwindcss";
   @import "@aplo/ui/styles";
   @source "./node_modules/@aplo/ui/dist";

5. Scaffold the app shell with Navbar and a main content area using
   Container for horizontal constraints.

Use @aplo/ui components exclusively — never write raw HTML inputs,
buttons, or selects.`}</Code>
      </DocSection>

      <DocSection id="system-prompt" title="System Prompt">
        <p className="text-sm text-muted-foreground mb-4">
          Use this at the start of any session in an existing project. It establishes the tech stack and directs the AI to read the design system rules shipped with the package.
        </p>
        <Code showCopy>{`You are working in an existing React + TypeScript + Vite project using the @aplo/ui design system.

## Tech Stack
- React 18 + TypeScript + Vite
- Tailwind CSS v4
- @aplo/ui for all UI components
- @base-ui-components/react for headless primitives
- lucide-react for icons (no other icon libraries)
- cn() from @aplo/ui for class merging
- useMotion() from @aplo/ui for animation gating

## Design System Rules
Before generating any UI, read the following files from the installed package:
- node_modules/@aplo/ui/design-system/01-design-principles.md
- node_modules/@aplo/ui/design-system/02-ui-rules.md
- node_modules/@aplo/ui/design-system/ai-rules.md
- node_modules/@aplo/ui/design-system/03-components.md
- node_modules/@aplo/ui/design-system/04-layout-patterns.md

Adhere strictly to all rules defined in those files.`}</Code>
        <p className="text-sm text-muted-foreground mt-4">
          If you're using Claude Code, set up <code className="text-xs bg-muted px-1.5 py-0.5 rounded">CLAUDE.md</code> instead — see{' '}
          <a href="/docs/getting-started#ai-setup" className="text-primary underline-offset-4 hover:underline">AI Assistant Setup</a>{' '}
          in Getting Started. The rules load automatically every session without needing to paste this prompt.
        </p>
      </DocSection>

      <DocSection id="feature-prompt" title="Feature Prompts">
        <p className="text-sm text-muted-foreground mb-4">
          Use these mid-session when asking an AI to build a specific screen or feature.
        </p>

        <div className="space-y-4">
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Form Page</p>
            <Code showCopy>{`Build a [feature name] form page using @aplo/ui components.

Use:
- Input for all text fields (with label, description, and error props)
- Select for dropdowns
- Checkbox or Switch for toggles
- Button variant="primary" with loading={isSubmitting} for the submit action
- Button variant="secondary" for cancel
- Container for the page wrapper
- flex justify-end gap-3 for the form action row

Do not write raw HTML inputs, selects, or buttons.
Do not add inline styles or arbitrary color values.`}</Code>
          </div>

          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Dashboard / App Shell</p>
            <Code showCopy>{`Build a dashboard layout using @aplo/ui components.

Structure:
- Navbar at the top (sticky, left slot for logo + nav, right slot for actions)
- flex row below the navbar
- Sidebar on the left (collapsible, contains nav links)
- <main className="flex-1 min-w-0"> for the content area
- Container inside main for horizontal padding

Use Button, Switch, and lucide-react icons in the Navbar right slot.
Use semantic HTML: <header>, <main>, <aside>, <nav>, <section>.`}</Code>
          </div>

          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Landing / Hero Section</p>
            <Code showCopy>{`Build a landing page hero section using @aplo/ui.

Use:
- Hero component with backgroundEffect="stipple-follow" for the globe background
- Hero is full-bleed — do NOT wrap it in Container
- Place content inside Hero using Container for padding constraints
- Stack to isolate z-index if the Hero is followed by other sections

Hero props to consider:
- scaleCircle — makes the globe radius proportional to the container
- globeRadius — explicit px size (overrides scaleCircle)
- globeShadowAngle / globeShadowStrength — controls shadow direction and fade
- Motion-off automatically degrades to a static snapshot (no manual gating needed)

Example structure:
<Stack>
  <Hero backgroundEffect="stipple-follow" className="min-h-150">
    <Container className="flex flex-col justify-center py-24">
      <h1 className="text-5xl font-bold text-foreground">Heading</h1>
      <p className="text-muted-foreground max-w-lg">Subheading</p>
      <Button size="lg">Get started</Button>
    </Container>
  </Hero>
  <section>…next section…</section>
</Stack>`}</Code>
          </div>

          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">New Component</p>
            <Code showCopy>{`Create a new [component name] component using @aplo/ui patterns.

Follow the existing component conventions:
- Use @base-ui-components/react for headless behavior (keyboard, ARIA, focus)
- Use CVA (class-variance-authority) for variants
- Use cn() from @aplo/ui for class merging
- Use useMotion() from @aplo/ui to gate transitions
- Export via forwardRef

Match border radius, ring color (ring-ring), and muted/foreground token
usage exactly to existing components like Button or Input.`}</Code>
          </div>
        </div>
      </DocSection>

    </DocPage>
  )
}
