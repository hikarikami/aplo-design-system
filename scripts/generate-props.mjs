#!/usr/bin/env node
/**
 * generate-props.mjs
 *
 * Parses component .d.ts files and generates:
 *   1. apps/docs/src/gen/component-props.ts   — imported by doc pages for PropsTable
 *   2. Updates <!-- PROPS:Name --> markers in packages/ui/design-system/03-components.md
 *
 * Run: node scripts/generate-props.mjs
 *   or: pnpm gen:props
 *
 * After running, commit the generated file alongside the .d.ts changes.
 */

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')
const DIST = (...p) => path.join(ROOT, 'packages/ui/dist/components', ...p)
const GEN_OUT = path.join(ROOT, 'apps/docs/src/gen/component-props.ts')
const MD_PATH = path.join(ROOT, 'packages/ui/design-system/03-components.md')

// ─── Component config ─────────────────────────────────────────────────────────
// Each entry describes one Props interface to extract.
// - dts:       path to the .d.ts file (relative to packages/ui/dist/components/)
// - interface: name of the Props interface to parse
// - exportName: name of the exported constant in component-props.ts
// - defaults:  prop name → default value string (not in .d.ts, set manually)
// - omit:      prop names to exclude from the output (optional)
// - manual:    fully manual props array — use when .d.ts types are insufficient
//              (e.g. CVA-based components where variant/size live in VariantProps)

const COMPONENTS = [
  {
    name: 'Button',
    exportName: 'ButtonPropDefs',
    // Button uses CVA — variant/size come from VariantProps, not the interface.
    // Define them manually so the table stays accurate.
    manual: [
      { name: 'variant', type: "'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive' | 'link'", default: "'primary'" },
      { name: 'size', type: "'sm' | 'default' | 'lg' | 'xl' | 'icon' | 'icon-sm'", default: "'default'" },
      { name: 'loading', type: 'boolean', default: 'false' },
      { name: 'asChild', type: 'boolean', default: 'false' },
      { name: 'disabled', type: 'boolean' },
    ],
  },
  {
    name: 'Switch',
    exportName: 'SwitchPropDefs',
    dts: 'switch/switch.d.ts',
    interface: 'SwitchProps',
    defaults: { size: "'default'" },
    omit: ['id', 'name'],
  },
  {
    name: 'Checkbox',
    exportName: 'CheckboxPropDefs',
    dts: 'checkbox/checkbox.d.ts',
    interface: 'CheckboxProps',
    defaults: { size: "'default'", indeterminate: 'false' },
    omit: ['id', 'name', 'value', 'readOnly', 'required'],
  },
  {
    name: 'Input',
    exportName: 'InputPropDefs',
    dts: 'input/input.d.ts',
    interface: 'InputProps',
    defaults: { size: "'default'" },
    omit: ['containerClassName'],
  },
  {
    name: 'Select',
    exportName: 'SelectPropDefs',
    dts: 'select/select.d.ts',
    interface: 'SelectProps',
    defaults: { size: "'default'" },
    omit: ['containerClassName', 'defaultOpen', 'open', 'onOpenChange', 'required', 'name'],
  },
  {
    name: 'RadioGroup',
    exportName: 'RadioGroupPropDefs',
    dts: 'radio/radio.d.ts',
    interface: 'RadioGroupProps',
    defaults: { orientation: "'vertical'" },
    omit: ['readOnly', 'required', 'name', 'className', 'children'],
  },
  {
    name: 'Radio',
    exportName: 'RadioPropDefs',
    dts: 'radio/radio.d.ts',
    interface: 'RadioProps',
    defaults: { size: "'default'", indicator: "'dot'" },
    omit: ['className'],
  },
  {
    name: 'RadioCard',
    exportName: 'RadioCardPropDefs',
    dts: 'radio/radio.d.ts',
    interface: 'RadioCardProps',
    defaults: { layout: "'list'" },
    omit: ['className', 'children'],
  },
  {
    name: 'Sidebar',
    exportName: 'SidebarPropDefs',
    dts: 'sidebar/sidebar.d.ts',
    interface: 'SidebarProps',
    defaults: { defaultOpen: 'true' },
    omit: ['className'],
  },
  {
    name: 'FileUpload',
    exportName: 'FileUploadPropDefs',
    dts: 'upload/upload.d.ts',
    interface: 'FileUploadProps',
    defaults: {
      accept: "['image/jpeg','image/png','image/webp']",
      maxSizeMb: '10',
      label: "'Drop, paste, or click to browse'",
    },
  },
  {
    name: 'Navbar',
    exportName: 'NavbarPropDefs',
    dts: 'navbar/navbar.d.ts',
    interface: 'NavbarProps',
    omit: ['className', 'children'],
  },
  {
    name: 'Hero',
    exportName: 'HeroPropDefs',
    dts: 'hero/hero.d.ts',
    interface: 'HeroProps',
    defaults: {
      backgroundEffect: "'none'",
      globeShadowAngle: '-135',
      globeShadowStrength: '0.75',
      scaleCircle: 'false',
    },
    omit: [],
  },
  {
    name: 'Container',
    exportName: 'ContainerPropDefs',
    dts: 'container/container.d.ts',
    interface: 'ContainerProps',
    defaults: { as: "'div'" },
    omit: ['className', 'children'],
  },
  {
    name: 'PageHeader',
    exportName: 'PageHeaderPropDefs',
    dts: 'page-header/page-header.d.ts',
    interface: 'PageHeaderProps',
    omit: ['className'],
  },
  {
    name: 'Code',
    exportName: 'CodePropDefs',
    dts: 'code/code.d.ts',
    interface: 'CodeProps',
    defaults: { language: "'tsx'", showCopy: 'true' },
    omit: ['className'],
  },
]

// ─── .d.ts parser ─────────────────────────────────────────────────────────────

/**
 * Parse a Props interface from a .d.ts file.
 * Returns an array of { name, type, optional, description }.
 */
function parseInterface(dtsRelPath, interfaceName) {
  const fullPath = DIST(dtsRelPath)
  if (!fs.existsSync(fullPath)) {
    console.error(`  ✗ Missing: ${dtsRelPath}`)
    return []
  }

  const code = fs.readFileSync(fullPath, 'utf-8')

  // Find the interface block.
  // Handles: export interface Foo { ... } and export interface Foo extends Bar { ... }
  const ifaceRe = new RegExp(
    `export interface ${interfaceName}\\s*(?:<[^>]+>)?\\s*(?:extends[^{]+)?\\{([\\s\\S]*?)\\}(?=\\s*(?:export|declare|$))`,
  )
  const match = code.match(ifaceRe)
  if (!match) {
    console.warn(`  ⚠ Interface '${interfaceName}' not found in ${dtsRelPath}`)
    return []
  }

  return parseBlock(match[1])
}

/** Parse a block of interface members into prop objects. */
function parseBlock(block) {
  const props = []
  const lines = block.split('\n')
  let jsDocLines = []
  let inJsDoc = false

  for (const rawLine of lines) {
    const line = rawLine.trim()
    if (!line) continue

    // Start of JSDoc block
    if (line.startsWith('/**')) {
      inJsDoc = true
      jsDocLines = []
      // Inline single-line JSDoc: /** text */
      const inline = line.replace(/^\/\*\*/, '').replace(/\*\/$/, '').replace(/^\s*\*\s?/, '').trim()
      if (inline) jsDocLines.push(inline)
      if (line.includes('*/')) inJsDoc = false
      continue
    }

    if (inJsDoc) {
      if (line.includes('*/')) { inJsDoc = false; continue }
      jsDocLines.push(line.replace(/^\*\s?/, '').trim())
      continue
    }

    // Property signature: name?: type;  or  name: type;
    const propMatch = line.match(/^(\w+)(\?)?:\s*(.+?);$/)
    if (propMatch) {
      const [, name, q, type] = propMatch
      props.push({
        name,
        optional: q === '?',
        type: type.trim(),
        description: jsDocLines.filter(Boolean).join(' ').trim(),
      })
      jsDocLines = []
    }
  }

  return props
}

// ─── Prop merging & formatting ────────────────────────────────────────────────

/** Build the final PropDef objects for a component. */
function buildPropDefs(comp) {
  if (comp.manual) return comp.manual

  const raw = parseInterface(comp.dts, comp.interface)
  const omitSet = new Set(comp.omit ?? [])
  const defaults = comp.defaults ?? {}

  return raw
    .filter(p => !omitSet.has(p.name))
    .map(({ name, type, description }) => {
      const def = defaults[name]
      return {
        name,
        type,
        ...(def !== undefined ? { default: def } : {}),
        ...(description ? { description } : {}),
      }
    })
}

// ─── TypeScript file generator ────────────────────────────────────────────────

function toTSValue(v) {
  // Serialize a prop def field value as a TS string literal
  return JSON.stringify(v)
}

function generateTSFile(allDefs) {
  const lines = [
    '// GENERATED — do not edit manually. Run: pnpm gen:props',
    '// Source: packages/ui/dist/components/**/*.d.ts',
    '',
    'export type PropDef = { name: string; type: string; default?: string; description?: string }',
    '',
  ]

  for (const { comp, defs } of allDefs) {
    lines.push(`/** Props for the ${comp.name} component. */`)
    lines.push(`export const ${comp.exportName}: PropDef[] = [`)
    for (const def of defs) {
      const parts = [`name: ${toTSValue(def.name)}`, `type: ${toTSValue(def.type)}`]
      if (def.default !== undefined) parts.push(`default: ${toTSValue(def.default)}`)
      if (def.description) parts.push(`description: ${toTSValue(def.description)}`)
      lines.push(`  { ${parts.join(', ')} },`)
    }
    lines.push(`]`)
    lines.push(``)
  }

  return lines.join('\n')
}

// ─── Markdown table generator ──────────────────────────────────────────────────

/** Render prop defs as a markdown table. */
function toMarkdownTable(defs) {
  const hasDesc = defs.some(d => d.description)
  const cols = hasDesc
    ? ['Prop', 'Type', 'Default', 'Description']
    : ['Prop', 'Type', 'Default']

  const sep = cols.map(c => '-'.repeat(c.length + 2))
  const header = `| ${cols.join(' | ')} |`
  const divider = `| ${sep.join(' | ')} |`

  const rows = defs.map(d => {
    const name = `\`${d.name}\``
    const type = `\`${d.type.replace(/\|/g, '\\|')}\``
    const def = d.default !== undefined ? `\`${d.default}\`` : '—'
    if (hasDesc) return `| ${name} | ${type} | ${def} | ${d.description ?? '—'} |`
    return `| ${name} | ${type} | ${def} |`
  })

  return [header, divider, ...rows].join('\n')
}

/** Replace content between <!-- PROPS:Name --> and <!-- /PROPS:Name --> markers. */
function updateMarkdown(mdPath, allDefs) {
  let md = fs.readFileSync(mdPath, 'utf-8')
  let updated = 0

  for (const { comp, defs } of allDefs) {
    const start = `<!-- PROPS:${comp.name} -->`
    const end = `<!-- /PROPS:${comp.name} -->`
    const table = toMarkdownTable(defs)
    const replacement = `${start}\n${table}\n${end}`

    const re = new RegExp(
      escRe(start) + '[\\s\\S]*?' + escRe(end),
      'g',
    )

    if (re.test(md)) {
      md = md.replace(re, replacement)
      updated++
    } else {
      console.warn(`  ⚠ No marker found for PROPS:${comp.name} in 03-components.md`)
    }
  }

  fs.writeFileSync(mdPath, md)
  return updated
}

function escRe(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

// ─── Main ──────────────────────────────────────────────────────────────────────

console.log('⚙  Generating component props…\n')

const allDefs = COMPONENTS.map(comp => {
  console.log(`  Parsing ${comp.interface ?? 'manual'} → ${comp.exportName}`)
  const defs = buildPropDefs(comp)
  return { comp, defs }
})

// 1. Write TypeScript data file
fs.mkdirSync(path.dirname(GEN_OUT), { recursive: true })
fs.writeFileSync(GEN_OUT, generateTSFile(allDefs))
console.log(`\n✓ Generated: apps/docs/src/gen/component-props.ts`)

// 2. Update markdown markers
const count = updateMarkdown(MD_PATH, allDefs)
console.log(`✓ Updated ${count} props table(s) in 03-components.md`)

console.log('\nDone.')
