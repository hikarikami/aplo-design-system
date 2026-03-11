import * as React from 'react'
import { Accordion, AccordionItem, Code, PageHeader } from '@aplo/ui'
import { DocPage, DocSection } from '@/components/doc-page'
import { PropsTable } from '@/components/props-table'
import { Preview } from '@/components/preview'

const TOC = [
  { id: 'installation', label: 'Installation' },
  { id: 'usage', label: 'Usage' },
  { id: 'default', label: 'Default' },
  { id: 'bordered', label: 'Bordered' },
  { id: 'split', label: 'Split' },
  { id: 'sizes', label: 'Sizes' },
  { id: 'subtitle', label: 'With Subtitle' },
  { id: 'multiple', label: 'Multiple Open' },
  { id: 'disabled', label: 'Disabled' },
  { id: 'controlled', label: 'Controlled' },
  { id: 'api', label: 'API Reference' },
]

const ITEMS = [
  {
    value: '1',
    title: 'What is a design system?',
    content:
      'A design system is a collection of reusable components, guided by clear standards, that can be assembled to build any number of applications. It ensures consistency across products and speeds up the design-to-development workflow.',
  },
  {
    value: '2',
    title: 'Why use Base UI for accessibility?',
    content:
      'Base UI provides unstyled, accessible headless components that implement ARIA patterns and keyboard navigation out of the box. This lets you focus on your brand styling while getting correct semantics for free.',
  },
  {
    value: '3',
    title: 'How do animations work?',
    content:
      'Animations respect the global Motion toggle and the OS prefers-reduced-motion setting. When motion is disabled, transitions are instant. The accordion uses CSS height transitions via a CSS custom property provided by Base UI.',
  },
]

export default function AccordionDocs() {
  const [controlled, setControlled] = React.useState<(string | number)[]>(['1'])

  return (
    <DocPage toc={TOC}>
      <PageHeader
        title="Accordion"
        description="An accessible accordion built on Base UI. Supports single and multiple open items, three visual variants, subtitles, and motion-aware height animations."
      />

      <DocSection id="installation" title="Installation">
        <Code language="ts">{`import { Accordion, AccordionItem } from '@aplo/ui'`}</Code>
      </DocSection>

      <DocSection id="usage" title="Usage">
        <Code>{`<Accordion>
  <AccordionItem value="1" title="Getting started">
    Follow the installation guide to add Aplo to your project.
  </AccordionItem>
  <AccordionItem value="2" title="Customisation">
    Override design tokens in your own CSS to theme the components.
  </AccordionItem>
</Accordion>

// Controlled
const [open, setOpen] = useState<(string | number)[]>([])
<Accordion value={open} onValueChange={setOpen}>
  ...
</Accordion>`}</Code>
      </DocSection>

      <DocSection id="default" title="Default">
        <Preview>
          <div className="w-full max-w-xl">
            <Accordion defaultValue={['1']}>
              {ITEMS.map((item) => (
                <AccordionItem key={item.value} value={item.value} title={item.title}>
                  {item.content}
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </Preview>
      </DocSection>

      <DocSection id="bordered" title="Bordered">
        <Preview>
          <div className="w-full max-w-xl">
            <Accordion variant="bordered" defaultValue={['1']}>
              {ITEMS.map((item) => (
                <AccordionItem key={item.value} value={item.value} title={item.title}>
                  {item.content}
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </Preview>
      </DocSection>

      <DocSection id="split" title="Split">
        <Preview>
          <div className="w-full max-w-xl">
            <Accordion variant="split" defaultValue={['1']}>
              {ITEMS.map((item) => (
                <AccordionItem key={item.value} value={item.value} title={item.title}>
                  {item.content}
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </Preview>
      </DocSection>

      <DocSection id="sizes" title="Sizes">
        <Preview>
          <div className="w-full max-w-xl space-y-6">
            <div>
              <p className="text-xs text-muted-foreground mb-2 font-mono">size="sm"</p>
              <Accordion variant="bordered" size="sm" defaultValue={['1']}>
                <AccordionItem value="1" title="Small accordion item">
                  Compact spacing, great for dense UIs or sidebars.
                </AccordionItem>
                <AccordionItem value="2" title="Another item">
                  Smaller text and padding throughout.
                </AccordionItem>
              </Accordion>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-2 font-mono">size="default"</p>
              <Accordion variant="bordered" defaultValue={['1']}>
                <AccordionItem value="1" title="Default accordion item">
                  Standard spacing for most use cases.
                </AccordionItem>
                <AccordionItem value="2" title="Another item">
                  Balanced padding and readable text size.
                </AccordionItem>
              </Accordion>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-2 font-mono">size="lg"</p>
              <Accordion variant="bordered" size="lg" defaultValue={['1']}>
                <AccordionItem value="1" title="Large accordion item">
                  More generous padding for marketing pages or prominent FAQs.
                </AccordionItem>
                <AccordionItem value="2" title="Another item">
                  Larger trigger text and spacious content area.
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </Preview>
      </DocSection>

      <DocSection id="subtitle" title="With Subtitle">
        <Preview>
          <div className="w-full max-w-xl">
            <Accordion variant="split" defaultValue={['plan']}>
              <AccordionItem
                value="plan"
                title="Pro Plan"
                subtitle="$49 / month · Billed annually"
              >
                Includes unlimited projects, priority support, and advanced analytics.
                Cancel anytime — no lock-in contracts.
              </AccordionItem>
              <AccordionItem
                value="team"
                title="Team Plan"
                subtitle="$99 / month · Up to 10 seats"
              >
                Everything in Pro, plus team collaboration features, SSO, and a
                dedicated account manager.
              </AccordionItem>
              <AccordionItem
                value="enterprise"
                title="Enterprise"
                subtitle="Custom pricing · Unlimited seats"
              >
                Tailored onboarding, SLA guarantees, custom integrations, and
                on-premise deployment options.
              </AccordionItem>
            </Accordion>
          </div>
        </Preview>
      </DocSection>

      <DocSection id="multiple" title="Multiple Open">
        <Preview>
          <div className="w-full max-w-xl">
            <Accordion variant="bordered" multiple defaultValue={['1', '3']}>
              {ITEMS.map((item) => (
                <AccordionItem key={item.value} value={item.value} title={item.title}>
                  {item.content}
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </Preview>
        <Code>{`<Accordion multiple defaultValue={['1', '3']}>
  ...
</Accordion>`}</Code>
      </DocSection>

      <DocSection id="disabled" title="Disabled">
        <Preview>
          <div className="w-full space-y-6 max-w-xl">
            <div>
              <p className="text-xs text-muted-foreground mb-2 font-mono">All items disabled</p>
              <Accordion variant="bordered" disabled>
                {ITEMS.map((item) => (
                  <AccordionItem key={item.value} value={item.value} title={item.title}>
                    {item.content}
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-2 font-mono">Single item disabled</p>
              <Accordion variant="bordered" defaultValue={['1']}>
                <AccordionItem value="1" title={ITEMS[0].title}>
                  {ITEMS[0].content}
                </AccordionItem>
                <AccordionItem value="2" title={ITEMS[1].title} disabled>
                  {ITEMS[1].content}
                </AccordionItem>
                <AccordionItem value="3" title={ITEMS[2].title}>
                  {ITEMS[2].content}
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </Preview>
      </DocSection>

      <DocSection id="controlled" title="Controlled">
        <Preview>
          <div className="w-full max-w-xl space-y-3">
            <Accordion variant="bordered" value={controlled} onValueChange={setControlled}>
              {ITEMS.map((item) => (
                <AccordionItem key={item.value} value={item.value} title={item.title}>
                  {item.content}
                </AccordionItem>
              ))}
            </Accordion>
            <p className="text-xs text-muted-foreground font-mono">
              open: [{controlled.map((v) => `"${v}"`).join(', ')}]
            </p>
          </div>
        </Preview>
      </DocSection>

      <DocSection id="api" title="API Reference">
        <h3 className="text-sm font-semibold text-foreground mb-3">Accordion</h3>
        <PropsTable
          props={[
            { name: 'variant', type: "'default' | 'bordered' | 'split'", default: "'default'" },
            { name: 'size', type: "'sm' | 'default' | 'lg'", default: "'default'" },
            { name: 'multiple', type: 'boolean', default: 'false' },
            { name: 'value', type: '(string | number)[]', default: '—' },
            { name: 'defaultValue', type: '(string | number)[]', default: '—' },
            { name: 'onValueChange', type: '(value: (string | number)[]) => void', default: '—' },
            { name: 'disabled', type: 'boolean', default: 'false' },
          ]}
        />
        <h3 className="text-sm font-semibold text-foreground mb-3 mt-6">AccordionItem</h3>
        <PropsTable
          props={[
            { name: 'value', type: 'string | number', default: '—' },
            { name: 'title', type: 'ReactNode', default: '—' },
            { name: 'subtitle', type: 'ReactNode', default: '—' },
            { name: 'disabled', type: 'boolean', default: 'false' },
            { name: 'children', type: 'ReactNode', default: '—' },
          ]}
        />
      </DocSection>
    </DocPage>
  )
}
