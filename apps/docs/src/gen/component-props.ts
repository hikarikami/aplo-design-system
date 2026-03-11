// GENERATED — do not edit manually. Run: pnpm gen:props
// Source: packages/ui/dist/components/**/*.d.ts

export type PropDef = { name: string; type: string; default?: string; description?: string }

/** Props for the Button component. */
export const ButtonPropDefs: PropDef[] = [
  { name: "variant", type: "'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive' | 'link'", default: "'primary'" },
  { name: "size", type: "'sm' | 'default' | 'lg' | 'xl' | 'icon' | 'icon-sm'", default: "'default'" },
  { name: "loading", type: "boolean", default: "false" },
  { name: "asChild", type: "boolean", default: "false" },
  { name: "disabled", type: "boolean" },
]

/** Props for the Switch component. */
export const SwitchPropDefs: PropDef[] = [
  { name: "checked", type: "boolean" },
  { name: "defaultChecked", type: "boolean" },
  { name: "onCheckedChange", type: "(checked: boolean) => void" },
  { name: "disabled", type: "boolean" },
  { name: "readOnly", type: "boolean" },
  { name: "required", type: "boolean" },
  { name: "size", type: "'sm' | 'default'", default: "'default'" },
  { name: "className", type: "string" },
]

/** Props for the Checkbox component. */
export const CheckboxPropDefs: PropDef[] = [
  { name: "checked", type: "boolean" },
  { name: "defaultChecked", type: "boolean" },
  { name: "onCheckedChange", type: "(checked: boolean) => void" },
  { name: "indeterminate", type: "boolean", default: "false" },
  { name: "disabled", type: "boolean" },
  { name: "size", type: "'sm' | 'default' | 'lg'", default: "'default'" },
  { name: "className", type: "string" },
]

/** Props for the Input component. */
export const InputPropDefs: PropDef[] = [
  { name: "label", type: "string", description: "Label rendered above the input" },
  { name: "description", type: "string", description: "Muted hint shown below the field; hidden when `error` is set" },
  { name: "error", type: "string", description: "Red error copy; also marks the field invalid via Field.Root" },
  { name: "prefixIcon", type: "React.ReactNode", description: "Leading icon / element inside the left edge of the input" },
  { name: "suffixIcon", type: "React.ReactNode", description: "Trailing icon / element inside the right edge of the input" },
  { name: "size", type: "'sm' | 'default' | 'lg'", default: "'default'", description: "Visual + spacing scale" },
]

/** Props for the Select component. */
export const SelectPropDefs: PropDef[] = [
  { name: "label", type: "string", description: "Label rendered above the trigger, matching Input style" },
  { name: "description", type: "string", description: "Muted hint shown below the field; hidden when `error` is set" },
  { name: "error", type: "string", description: "Red error copy" },
  { name: "placeholder", type: "string", description: "Text shown when nothing is selected" },
  { name: "size", type: "'sm' | 'default' | 'lg'", default: "'default'", description: "Visual + spacing scale — matches Input sizes exactly" },
  { name: "className", type: "string", description: "Extra class names forwarded to the trigger button" },
  { name: "value", type: "T" },
  { name: "defaultValue", type: "T" },
  { name: "onValueChange", type: "(value: T | null) => void" },
  { name: "disabled", type: "boolean" },
  { name: "children", type: "React.ReactNode" },
]

/** Props for the RadioGroup component. */
export const RadioGroupPropDefs: PropDef[] = [
  { name: "value", type: "string" },
  { name: "defaultValue", type: "string" },
  { name: "onValueChange", type: "(value: string) => void" },
  { name: "disabled", type: "boolean" },
  { name: "orientation", type: "'horizontal' | 'vertical'", default: "'vertical'", description: "Layout direction for child radios. Defaults to 'vertical'." },
]

/** Props for the Radio component. */
export const RadioPropDefs: PropDef[] = [
  { name: "value", type: "string", description: "Must match a value in the parent RadioGroup." },
  { name: "disabled", type: "boolean" },
  { name: "size", type: "'sm' | 'default'", default: "'default'" },
  { name: "indicator", type: "'dot' | 'check'", default: "'dot'", description: "'dot'   (default) — filled circle scales in when selected. 'check'           — circle fills with primary and shows a white checkmark, matching the RadioCard indicator style." },
  { name: "children", type: "React.ReactNode", description: "Label rendered beside the indicator." },
]

/** Props for the RadioCard component. */
export const RadioCardPropDefs: PropDef[] = [
  { name: "value", type: "string", description: "Must match a value in the parent RadioGroup." },
  { name: "disabled", type: "boolean" },
  { name: "title", type: "string", description: "Bold label shown in the card." },
  { name: "description", type: "string", description: "Muted supporting text shown below the title." },
  { name: "image", type: "string", description: "URL of a thumbnail image. Renders as a small rounded square — top-left in card layout, left side in list layout." },
  { name: "startContent", type: "React.ReactNode", description: "Custom node for the image slot. Overrides the image prop. Sized automatically to match the layout." },
  { name: "layout", type: "'list' | 'card'", default: "'list'", description: "'list' (default) — horizontal flex; indicator at end of row. 'card'           — vertical flex; indicator in absolute top-right corner." },
]

/** Props for the Sidebar component. */
export const SidebarPropDefs: PropDef[] = [
  { name: "children", type: "React.ReactNode", description: "Nav/content to render inside the expanded panel" },
  { name: "defaultOpen", type: "boolean", default: "true", description: "Whether the sidebar starts open. Default: true" },
]

/** Props for the FileUpload component. */
export const FileUploadPropDefs: PropDef[] = [
  { name: "onFileSelect", type: "(file: File) => void", description: "Called when a valid file is chosen via click, drag-drop, or paste" },
  { name: "accept", type: "string[]", default: "['image/jpeg','image/png','image/webp']", description: "Accepted MIME types — defaults to common image formats" },
  { name: "maxSizeMb", type: "number", default: "10", description: "Max file size in MB" },
  { name: "label", type: "string", default: "'Drop, paste, or click to browse'", description: "Primary label shown in the drop zone" },
  { name: "hint", type: "string", description: "Secondary hint line — auto-generated from accept/maxSizeMb if omitted" },
  { name: "error", type: "string", description: "Validation error message to display below the drop zone" },
]

/** Props for the Navbar component. */
export const NavbarPropDefs: PropDef[] = [
  { name: "left", type: "React.ReactNode", description: "Content to render on the left side (logo, nav links, etc.)" },
  { name: "right", type: "React.ReactNode", description: "Content to render on the right side" },
]

/** Props for the Hero component. */
export const HeroPropDefs: PropDef[] = [
  { name: "backgroundEffect", type: "HeroBackgroundEffect", default: "'none'", description: "Controls the interactive background treatment" },
  { name: "globeShadowAngle", type: "number", default: "-135", description: "Angle (degrees) of the sparse/shadow side of the globe. Default: −135 (top-left)" },
  { name: "globeShadowStrength", type: "number", default: "0.75", description: "Strength of the directional density gradient (0 = uniform, 1 = maximum). Default: 0.75" },
  { name: "scaleCircle", type: "boolean", default: "false", description: "When true the globe radius scales proportionally with the container so it always occupies roughly one-third of the hero. Default: false (uses 640 px)." },
  { name: "globeRadius", type: "number", description: "Explicit globe radius in pixels. Takes precedence over both `scaleCircle` and the built-in default when provided." },
]

/** Props for the Container component. */
export const ContainerPropDefs: PropDef[] = [
  { name: "as", type: "React.ElementType", default: "'div'", description: "Render as a different element, e.g. \"section\", \"main\", \"header\"" },
]

/** Props for the PageHeader component. */
export const PageHeaderPropDefs: PropDef[] = [
  { name: "title", type: "string", description: "Main page title rendered as an <h1>" },
  { name: "description", type: "React.ReactNode", description: "Descriptive text below the title — accepts ReactNode for inline code/links" },
  { name: "eyebrow", type: "string", description: "Optional small label above the title (eyebrow text)" },
]

/** Props for the Code component. */
export const CodePropDefs: PropDef[] = [
  { name: "children", type: "string" },
  { name: "language", type: "string", default: "'tsx'" },
  { name: "showCopy", type: "boolean", default: "true" },
]
