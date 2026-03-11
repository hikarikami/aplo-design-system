import { NavLink, Outlet } from 'react-router-dom'
import { Sidebar } from '@aplo/ui'
import { cn } from '@aplo/ui'

const COMPONENTS = [
  { label: 'Button',    to: '/docs/button'    },
  { label: 'Checkbox',  to: '/docs/checkbox'  },
  { label: 'Code',      to: '/docs/code'      },
  { label: 'Hero',      to: '/docs/hero'      },
  { label: 'Input',     to: '/docs/input'     },
  { label: 'Navbar',    to: '/docs/navbar'    },
  { label: 'Radio',     to: '/docs/radio'     },
  { label: 'Select',    to: '/docs/select'    },
  { label: 'Sidebar',   to: '/docs/sidebar'   },
  { label: 'Switch',    to: '/docs/switch'    },
  { label: 'Upload',    to: '/docs/upload'    },
]

const GUIDES = [
  { label: 'Getting Started', to: '/docs/getting-started' },
  { label: 'AI Prompts', to: '/docs/ai-prompts' },
  { label: 'Theming & Motion', to: '/docs/theming' },
]

function NavItem({ label, to }: { label: string; to: string }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        cn(
          'flex items-center rounded-md px-3 py-1.5 text-sm transition-colors duration-150',
          isActive
            ? 'bg-secondary text-foreground font-medium'
            : 'text-muted-foreground hover:bg-secondary hover:text-foreground',
        )
      }
    >
      {label}
    </NavLink>
  )
}

function DocsSidebarContent() {
  return (
    <div className="p-4 space-y-4">
      <div className="space-y-1">
        <p className="px-3 mb-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          Guides
        </p>
        {GUIDES.map(({ label, to }) => (
          <NavItem key={to} label={label} to={to} />
        ))}
      </div>

      <div className="space-y-1">
        <p className="px-3 mb-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          Components
        </p>
        {COMPONENTS.map(({ label, to }) => (
          <NavItem key={to} label={label} to={to} />
        ))}
      </div>
    </div>
  )
}

export default function DocsLayout() {
  return (
    <div className="flex">
      <Sidebar>
        <DocsSidebarContent />
      </Sidebar>
      <main className="flex-1 min-w-0">
        <Outlet />
      </main>
    </div>
  )
}
