import { Code, PageHeader } from '@aplo/ui'
import { DocPage, DocSection } from '@/components/doc-page'

const TOC = [
  { id: 'overview', label: 'Overview' },
  { id: 'system-prompt', label: 'System Prompt' },
  { id: 'project-setup', label: 'New Project Setup' },
  { id: 'feature-prompt', label: 'Building Features' },
  { id: 'claude-md', label: 'CLAUDE.md Template' },
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
            AI assistants generate generic UI by default — raw <code className="text-xs bg-muted px-1.5 py-0.5 rounded">{'<button>'}</code> elements, inline styles, and custom components that don't fit the system. These prompts solve that by giving the AI the context it needs to use <code className="text-xs bg-muted px-1.5 py-0.5 rounded">@aplo/ui</code> correctly from the start.
          </p>
          <p>
            Use the <strong className="text-foreground">System Prompt</strong> for ongoing sessions, the <strong className="text-foreground">Project Setup</strong> prompt when scaffolding a new app, and the <strong className="text-foreground">CLAUDE.md template</strong> to make Claude Code remember the rules across all sessions automatically.
          </p>
        </div>
      </DocSection>

      <DocSection id="system-prompt" title="System Prompt">
        <p className="text-sm text-muted-foreground">
          Paste this into any AI assistant at the start of a session, or save it as a project-level instruction in Cursor / Claude Code.
        </p>
        <Code language="ts" showCopy>{`You are building UI for the Aplo design system.

## Stack
- React 18 + TypeScript + Vite
- Tailwind CSS v4 (tokens defined in theme.css)
- Components: @aplo/ui
- Headless primitives: @base-ui-components/react
- Class composition: cn() from @aplo/ui
- Motion: useMotion() from @aplo/ui — always gate animations on this hook

## Before Writing Any UI
1. Check for an existing @aplo/ui component that covers the need.
2. Only write custom markup if no matching component exists.

## Component Usage Rules
- Import from @aplo/ui:
  import { Button, Input, Select, Checkbox, Switch, Radio, RadioGroup,
    RadioCard, Sidebar, Navbar, Container, PageHeader, Stack, FileUpload,
    LottieIcon, Code } from '@aplo/ui'
- Never write raw <button>, <input>, <select>, or <input type="checkbox/radio">
- Icons: lucide-react only. No other icon libraries.
- Colors: semantic Tailwind classes only (bg-primary, text-foreground,
  border-border, bg-card, bg-muted, text-destructive). No hex/hsl values.
- Radius: rounded-md (interactive), rounded-lg (cards). Nothing larger.

## Layout Rules
- Wrap all page content in Container (max-w-page = 77.5rem, px-6).
- App root must be wrapped in AploProvider.
- App shell: Navbar → flex row → Sidebar + <main>.

## Consistency Rules
- Prefer existing patterns over new ones.
- Do not add new color tokens, font families, or breakpoints.
- Do not use framer-motion or other animation libraries.
- Keep solutions minimal.`}</Code>
      </DocSection>

      <DocSection id="project-setup" title="New Project Setup">
        <p className="text-sm text-muted-foreground">
          Use this when starting a brand-new app that should use the Aplo design system.
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

3. In vite.config.ts, add the Tailwind plugin and CSS source for @aplo/ui:
   import tailwindcss from '@tailwindcss/vite'
   plugins: [react(), tailwindcss()]

4. In globals.css, import Tailwind and the Aplo theme:
   @import "tailwindcss";
   @import "@aplo/ui/styles";

5. Scaffold the app shell with Navbar and a main content area using
   Container for horizontal constraints.

Use @aplo/ui components exclusively — never write raw HTML inputs,
buttons, or selects.`}</Code>

        <p className="text-sm text-muted-foreground">
          And for a monorepo setup that works in a pnpm workspace (like this one):
        </p>
        <Code language="bash" showCopy>{`# Install in your app
pnpm add @aplo/ui

# If consuming from a local workspace
# In your app's package.json:
"@aplo/ui": "workspace:*"

# Build the library before the app
pnpm --filter @aplo/ui build`}</Code>
      </DocSection>

      <DocSection id="feature-prompt" title="Building Features">
        <p className="text-sm text-muted-foreground">
          Use these prompts mid-session when asking an AI to build a specific screen or feature.
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
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">New Component</p>
            <Code showCopy>{`Create a new [component name] component for @aplo/ui.

Follow the existing patterns in packages/ui/src/components/:
- Use @base-ui-components/react for headless behavior (keyboard, ARIA, focus)
- Use CVA (class-variance-authority) for variants
- Use cn() from ../../lib/utils for class merging
- Use useMotion() from ../../lib/motion to gate transitions
- Export via forwardRef
- Add a barrel export in index.ts

Match border radius, ring color (ring-ring), and muted/foreground token
usage exactly to existing components like Button or Input.`}</Code>
          </div>
        </div>
      </DocSection>

      <DocSection id="claude-md" title="CLAUDE.md Template">
        <p className="text-sm text-muted-foreground">
          Drop a <code className="text-xs bg-muted px-1.5 py-0.5 rounded">CLAUDE.md</code> file at your project root to make Claude Code follow these rules automatically in every session — no need to re-paste the system prompt.
        </p>
        <Code language="ts" showCopy>{`# Project Rules

## Stack
- React 18 + TypeScript + Vite
- Tailwind CSS v4
- @aplo/ui for all UI components
- lucide-react for icons only
- pnpm as the package manager

## UI Rules
- Never write raw <button>, <input>, <select>, or checkbox/radio inputs
- Always import components from @aplo/ui
- Use cn() from @aplo/ui for class merging
- Use semantic Tailwind color tokens only (bg-primary, text-foreground, etc.)
- No inline style={{ color, background }} — use Tailwind classes
- No framer-motion — use useMotion() from @aplo/ui for animation gating
- Radius: rounded-md for interactive, rounded-lg for cards. Never larger.

## Layout
- Wrap page content in <Container>
- Wrap app root in <AploProvider>
- App shell: Navbar → flex row → Sidebar + <main>

## Workflow
- Run \`pnpm dev\` to start the dev server
- Run \`pnpm build\` to build (builds @aplo/ui then docs)
- Check existing @aplo/ui components before writing custom markup`}</Code>

        <p className="text-sm text-muted-foreground">
          Place this file at the root of any project that uses <code className="text-xs bg-muted px-1.5 py-0.5 rounded">@aplo/ui</code>. Claude Code reads it automatically before every session.
        </p>
      </DocSection>

    </DocPage>
  )
}
