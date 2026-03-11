import * as React from 'react'
import { Code, Container, PageHeader, RadioGroup, Radio, RadioCard } from '@aplo/ui'

export default function RadioDocs() {
  const [plan, setPlan] = React.useState('pro')
  const [provider, setProvider] = React.useState('openai')
  const [style, setStyle] = React.useState('pixel')
  const [avatar, setAvatar] = React.useState('pixel')
  const [team, setTeam] = React.useState('design')

  return (
    <Container className="py-16 space-y-16">

      <PageHeader
        id="radio"
        title="Radio"
        description={<>Accessible radio controls built on Base UI's <code className="text-xs bg-muted px-1.5 py-0.5 rounded">{'<input type="radio">'}</code>. Three exports — <code className="text-xs bg-muted px-1.5 py-0.5 rounded">RadioGroup</code>, <code className="text-xs bg-muted px-1.5 py-0.5 rounded">Radio</code>, and <code className="text-xs bg-muted px-1.5 py-0.5 rounded">RadioCard</code> — compose into standard dot lists or rich card pickers.</>}
      />

      <hr className="border-border" />

      {/* ── Radio (dot) ──────────────────────────────────────────────────── */}
      <section id="radio-default" className="space-y-6">
        <SectionLabel>Radio — sizes</SectionLabel>
        <div className="flex flex-wrap gap-10 items-start">
          <div className="space-y-2">
            <p className="text-xs text-muted-foreground mb-3">Default</p>
            <RadioGroup defaultValue="b">
              <Radio value="a">Option A</Radio>
              <Radio value="b">Option B</Radio>
              <Radio value="c">Option C</Radio>
            </RadioGroup>
          </div>
          <div className="space-y-2">
            <p className="text-xs text-muted-foreground mb-3">Small</p>
            <RadioGroup defaultValue="b">
              <Radio value="a" size="sm">Option A</Radio>
              <Radio value="b" size="sm">Option B</Radio>
              <Radio value="c" size="sm">Option C</Radio>
            </RadioGroup>
          </div>
        </div>
      </section>

      <section id="radio-indicator" className="space-y-6">
        <SectionLabel>Radio — indicator style</SectionLabel>
        <div className="flex flex-wrap gap-10 items-start">
          <div className="space-y-2">
            <p className="text-xs text-muted-foreground mb-3">Dot (default)</p>
            <RadioGroup defaultValue="b">
              <Radio value="a">Option A</Radio>
              <Radio value="b">Option B</Radio>
              <Radio value="c">Option C</Radio>
            </RadioGroup>
          </div>
          <div className="space-y-2">
            <p className="text-xs text-muted-foreground mb-3">Check</p>
            <RadioGroup defaultValue="b">
              <Radio value="a" indicator="check">Option A</Radio>
              <Radio value="b" indicator="check">Option B</Radio>
              <Radio value="c" indicator="check">Option C</Radio>
            </RadioGroup>
          </div>
        </div>
      </section>

      <section id="radio-states" className="space-y-6">
        <SectionLabel>Radio — states</SectionLabel>
        <RadioGroup defaultValue="b" orientation="horizontal">
          <Radio value="a">Unchecked</Radio>
          <Radio value="b">Checked</Radio>
          <Radio value="c" disabled>Disabled off</Radio>
          <Radio value="disabled-on" disabled>
            {/* pre-checked disabled — set defaultValue to this to demo */}
            Disabled
          </Radio>
        </RadioGroup>
        {/* Separate group to show a disabled-checked state */}
        <RadioGroup defaultValue="x" orientation="horizontal">
          <Radio value="x" disabled>Disabled checked</Radio>
        </RadioGroup>
      </section>

      <hr className="border-border" />

      {/* ── RadioCard list layout ─────────────────────────────────────────── */}
      <section id="card-list" className="space-y-6">
        <SectionLabel>RadioCard — list layout (default)</SectionLabel>
        <RadioGroup
          value={provider}
          onValueChange={setProvider}
          className="max-w-sm"
        >
          <RadioCard
            value="openai"
            title="ChatGPT"
            description="OpenAI's image generation model — sharp detail and strong style adherence"
          />
          <RadioCard
            value="gemini"
            title="Google Gemini"
            description="Google's multimodal model — vivid colours and expressive results"
          />
          <RadioCard
            value="claude"
            title="Claude"
            description="Anthropic's model — nuanced composition and natural scene rendering"
          />
        </RadioGroup>
      </section>

      {/* ── RadioCard card layout ─────────────────────────────────────────── */}
      <section id="card-grid" className="space-y-6">
        <SectionLabel>RadioCard — card layout (grid)</SectionLabel>
        <RadioGroup
          value={style}
          onValueChange={setStyle}
          orientation="horizontal"
          className="grid grid-cols-3 gap-4 max-w-2xl"
        >
          <RadioCard
            value="pixel"
            layout="card"
            title="2D Pixel Art"
            description="Retro pixel-style avatar with bold outlines and limited palette"
          />
          <RadioCard
            value="memoji"
            layout="card"
            title="Apple Memoji"
            description="Smooth, rounded 3D cartoon style inspired by Apple Memoji"
          />
          <RadioCard
            value="muppet"
            layout="card"
            title="Muppet-Like"
            description="Fuzzy, textured puppet-like character with exaggerated features"
          />
        </RadioGroup>
      </section>

      {/* ── RadioCard with images ────────────────────────────────────────── */}
      <section id="card-images" className="space-y-6">
        <SectionLabel>RadioCard — with images</SectionLabel>
        <div className="flex flex-col flex-wrap gap-10 items-start">

          {/* List layout with images */}
          <div className="space-y-3">
            <p className="text-xs text-muted-foreground">List</p>
            <RadioGroup value={team} onValueChange={setTeam} className="w-72">
              <RadioCard
                value="design"
                title="Design"
                description="UI/UX and brand"
                image="https://picsum.photos/seed/design/64/64"
              />
              <RadioCard
                value="engineering"
                title="Engineering"
                description="Frontend and backend"
                image="https://picsum.photos/seed/engineering/64/64"
              />
              <RadioCard
                value="marketing"
                title="Marketing"
                description="Growth and content"
                image="https://picsum.photos/seed/marketing/64/64"
              />
            </RadioGroup>
          </div>

          {/* Card layout with images */}
          <div className="space-y-3 w-full ">
            <p className="text-xs text-muted-foreground">Card</p>
            <RadioGroup
              value={avatar}
              onValueChange={setAvatar}
              orientation="horizontal"
              className="w-full grid grid-cols-3 gap-6"
            >
              <RadioCard
                value="pixel"
                layout="card"
                title="Pixel Art"
                description="Retro, bold outlines"
                image="https://picsum.photos/seed/pixel/128/128"
              />
              <RadioCard
                value="memoji"
                layout="card"
                title="Memoji"
                description="Smooth 3D style"
                image="https://picsum.photos/seed/memoji/128/128"
              />
              <RadioCard
                value="muppet"
                layout="card"
                title="Muppet"
                description="Textured puppet"
                image="https://picsum.photos/seed/muppet/128/128"
              />
            </RadioGroup>
          </div>

        </div>
      </section>

      {/* ── RadioCard disabled ────────────────────────────────────────────── */}
      <section id="card-disabled" className="space-y-6">
        <SectionLabel>RadioCard — disabled</SectionLabel>
        <RadioGroup defaultValue="a" className="max-w-sm">
          <RadioCard value="a" title="Available" description="This option can be selected" />
          <RadioCard value="b" title="Unavailable" description="This option is disabled" disabled />
        </RadioGroup>
      </section>

      {/* ── Controlled ───────────────────────────────────────────────────── */}
      <section id="controlled" className="space-y-6">
        <SectionLabel>Controlled</SectionLabel>
        <div className="flex flex-wrap gap-10 items-start">
          <div className="space-y-3">
            <RadioGroup value={plan} onValueChange={setPlan}>
              <Radio value="starter">Starter</Radio>
              <Radio value="pro">Pro</Radio>
              <Radio value="enterprise">Enterprise</Radio>
            </RadioGroup>
            <p className="text-xs text-muted-foreground">
              Selected: <span className="text-foreground font-medium">{plan}</span>
            </p>
          </div>
        </div>
      </section>

      <hr className="border-border" />

      <section id="usage" className="space-y-4">
        <SectionLabel>Usage</SectionLabel>
        <Code>{`import { RadioGroup, Radio, RadioCard } from '@aplo/ui'

// Uncontrolled dot radios
<RadioGroup defaultValue="b">
  <Radio value="a">Option A</Radio>
  <Radio value="b">Option B</Radio>
</RadioGroup>

// Controlled
const [value, setValue] = useState('b')
<RadioGroup value={value} onValueChange={setValue}>
  <Radio value="a">Option A</Radio>
  <Radio value="b">Option B</Radio>
</RadioGroup>

// Horizontal orientation
<RadioGroup orientation="horizontal" defaultValue="a">
  <Radio value="a">Left</Radio>
  <Radio value="b">Right</Radio>
</RadioGroup>

// RadioCard — list layout (default)
<RadioGroup defaultValue="openai">
  <RadioCard value="openai" title="ChatGPT" description="OpenAI's model" />
  <RadioCard value="gemini" title="Google Gemini" description="Google's model" />
</RadioGroup>

// RadioCard — with thumbnail image
<RadioCard value="pixel" title="Pixel Art" image="/avatars/pixel.png" />

// RadioCard — card layout in a grid
<RadioGroup defaultValue="pixel" orientation="horizontal"
  className="grid grid-cols-3 gap-4">
  <RadioCard layout="card" value="pixel" title="Pixel Art"
    description="Retro style" image="/avatars/pixel.png" />
</RadioGroup>

// RadioCard — custom startContent (overrides image)
<RadioCard value="custom" title="Custom" startContent={<MyIcon />} />`}</Code>
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
