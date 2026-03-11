You are helping me create an AI-readable design system scaffold for Aplo.

Context:
- This repo contains our shared UI components.
- The main source of truth for existing components is:
  `packages/ui/src/components`
- These components are used for lightweight Aplo-built products such as:
  - Figma plugins
  - micro apps
  - internal tools
  - AI-assisted prototypes
- The goal is NOT to create polished marketing documentation.
- The goal IS to create a compact, highly practical, machine-readable design system that can be easily understood by AI coding agents like Claude Code, Cursor, and ChatGPT.

Your task:
Inspect the components inside `packages/ui/src/components` and generate a new folder called:

`design-system/`

Inside that folder, create the following files:

1. `01-design-principles.md`
2. `02-ui-rules.md`
3. `03-components.md`
4. `04-layout-patterns.md`
5. `ai-rules.md`
6. `system-prompt.md`
7. `tokens.json`
8. `README.md`

Your job is to infer the design system from the actual component code, naming, composition, props, styling patterns, and repeated conventions.

Important:
- Base everything on the REAL components in `packages/ui/src/components`
- Do not invent a glossy brand system that does not exist
- Do not write vague fluff
- Be concrete, structured, and useful to AI agents
- Prefer deterministic guidance over abstract language
- Where something is unclear, make a reasonable best inference and clearly label it as an inferred convention
- Keep everything compact and practical
- Assume the consumers are AI agents first, humans second

Output requirements for each file:

---

## 1) `design-system/01-design-principles.md`

Create a short principles document that explains:
- what this design system is for
- what kinds of products it supports
- the overall UX style inferred from the components
- the main design priorities

Include sections like:
- Purpose
- Intended Use Cases
- Design Principles
- Accessibility Expectations
- Preferred UI Tone

Keep it short and direct.

---

## 2) `design-system/02-ui-rules.md`

Create explicit implementation rules for AI agents.

Include:
- preferred spacing behavior
- preferred layout density
- border radius guidance
- shadow usage guidance
- typical card/container usage
- button usage patterns
- form layout patterns
- typography behavior
- empty state guidance
- icon usage guidance
- interaction state guidance

Use wording like:
- “Always…”
- “Prefer…”
- “Avoid…”
- “Do not…”

This file should read like strict UI generation rules.

---

## 3) `design-system/03-components.md`

Document the existing components found in `packages/ui/src/components`.

For each meaningful component:
- component name
- what it is for
- when to use it
- common props
- any variants/states
- any composition patterns
- any important styling conventions
- any inferred dos/don’ts

Group related components into sections where helpful.

Also include:
- “Common Patterns”
- “Component Relationships”
- “Inferred Missing Components” (only if clearly useful)

Do not just dump raw prop types. Summarise them for practical usage.

---

## 4) `design-system/04-layout-patterns.md`

Infer the likely layout patterns used across the system.

Include practical reusable patterns like:
- app page layout
- settings page
- form page
- dashboard section
- list/detail layout
- modal/sheet/dialog layout
- toolbar/header/actions layout
- empty state layout
- loading/skeleton layout

For each layout pattern, include:
- structure
- intended use
- spacing guidance
- common child components
- layout dos/don’ts

Make this very AI-friendly and reusable.

---

## 5) `design-system/ai-rules.md`

This file is specifically for AI coding agents.

It should contain:
- a short summary of the stack and styling approach inferred from the repo
- the canonical rules to follow before generating UI
- the order of preference for using existing components vs custom markup
- instructions to reuse existing components wherever possible
- guidance on when to compose new wrappers vs extending the system
- rules for visual consistency

Use a format like:

- Before generating UI, inspect…
- Prefer…
- Reuse…
- Avoid…
- When no matching component exists…

Make this concise and agent-focused.

---

## 6) `design-system/system-prompt.md`

Write a reusable system prompt for an AI coding assistant.

It should instruct the AI to:
- use the Aplo design system
- inspect and reuse components from `packages/ui/src/components`
- follow the rules in the `design-system` folder
- prefer consistency over novelty
- keep interfaces simple, accessible, and production-friendly
- avoid unnecessary decorative styling
- use existing patterns before inventing new ones

Write it as a clean prompt block that could be pasted into Claude Code / Cursor as a reusable instruction.

---

## 7) `design-system/tokens.json`

Infer a compact token structure from the components.

This does NOT need to be perfect design-token pipeline output.
It should be a practical JSON file that captures the main conventions you can infer.

Include best-effort categories such as:
- color
- spacing
- radius
- shadow
- typography
- sizing
- zIndex
- component aliases if relevant

Rules:
- Only include tokens that are clearly present or strongly implied
- Do not fabricate a huge enterprise token system
- Keep naming simple and consistent
- Use JSON only
- Add a top-level `"inferred": true/false` or per-token metadata where helpful

---

## 8) `design-system/README.md`

Create a short overview explaining:
- what this folder is
- which file an AI agent should read first
- which files are for rules vs references
- how a developer or AI assistant should use this folder

Keep it very practical.


Also create:
9. `design-system/aplo-ds.md`

This should be the single canonical AI-readable reference that summarises:
- design principles
- core UI rules
- preferred layout patterns
- primary components
- usage priorities
- do/don’t guidance

This file should be the first file an AI agent reads before generating UI.

---

Additional repo-analysis instructions:

When inspecting `packages/ui/src/components`, pay attention to:
- repeated Tailwind utility patterns
- shadcn or Radix-based structures
- consistent wrapper components
- common naming conventions
- shared props and variants
- how forms are structured
- how actions/buttons are grouped
- how cards/panels/sections are built
- how stateful components handle loading, empty, disabled, error, or selected states

Also inspect nearby supporting files if helpful, such as:
- package-local utility files
- class variance authority usage
- Tailwind config
- theme files
- shared tokens/constants
- component index exports

But keep the focus on:
`packages/ui/src/components`

Important authoring constraints:
- Write all files in plain, clean markdown except `tokens.json`
- Be concise but complete
- Avoid marketing language
- Avoid generic advice not grounded in the codebase
- Prefer concrete examples from actual components
- Where inference is used, state that it is inferred
- Do not ask me questions
- Do the analysis and generate the files directly

Implementation steps:
1. Inspect `packages/ui/src/components`
2. Infer the design language and reusable patterns
3. Create the `design-system/` folder
4. Generate all 8 files
5. Ensure the content is internally consistent
6. At the end, provide a short summary of:
   - which components were most important in shaping the system
   - any gaps or ambiguities found
   - any recommendations for improving AI-readability in the future


Extra instruction:
When documenting components or rules, mention the source component filenames/paths where useful, so the generated docs are traceable back to the code. Keep those references lightweight, e.g.:
- Source: `packages/ui/src/components/button.tsx`
- Based on patterns found in: `packages/ui/src/components/form/*`


Please begin now.

After generating the files, review them once for:
- duplication
- contradictions
- overly vague wording
- invented patterns not supported by the code
Then tighten the wording so the result is optimised for AI agents, not for humans browsing docs.