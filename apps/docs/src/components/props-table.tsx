interface Prop {
  name: string
  type: string
  default?: string
}

interface PropsTableProps {
  props: Prop[]
}

export function PropsTable({ props }: PropsTableProps) {
  return (
    <div className="rounded-lg border border-border overflow-hidden">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border bg-muted/40">
            <th className="px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground w-1/3">Prop</th>
            <th className="px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground w-1/2">Type</th>
            <th className="px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">Default</th>
          </tr>
        </thead>
        <tbody>
          {props.map((prop, i) => (
            <tr key={prop.name} className={i < props.length - 1 ? 'border-b border-border' : ''}>
              <td className="px-4 py-3 font-mono text-xs font-medium text-foreground">{prop.name}</td>
              <td className="px-4 py-3 font-mono text-xs text-muted-foreground leading-relaxed">{prop.type}</td>
              <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{prop.default ?? '—'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
