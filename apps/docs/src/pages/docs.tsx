import { NavLink, Outlet } from 'react-router-dom'
import { Sidebar } from '@aplo/ui'
import { cn } from '@aplo/ui'

const COMPONENTS = [
  { label: 'Button',   to: '/docs/button'   },
  { label: 'Checkbox', to: '/docs/checkbox' },
  { label: 'Navbar',   to: '/docs/navbar'   },
  { label: 'Input',    to: '/docs/input'    },
  { label: 'Select',   to: '/docs/select'   },
  { label: 'Radio',    to: '/docs/radio'    },
  { label: 'Sidebar',  to: '/docs/sidebar'  },
  { label: 'Switch',   to: '/docs/switch'   },
  { label: 'Upload',   to: '/docs/upload'   },
  { label: 'Hero',     to: '/docs/hero'     },
]

function DocsSidebarContent() {
  return (
    <div className="p-4 space-y-1">
      <p className="px-3 mb-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
        Components
      </p>
      {COMPONENTS.map(({ label, to }) => (
        <NavLink
          key={to}
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
      ))}
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
