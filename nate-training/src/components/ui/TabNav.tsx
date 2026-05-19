import { Activity, Calendar, TrendingUp, Info } from 'lucide-react'

export type TabKey = 'today' | 'program' | 'log' | 'info'

const TABS: { key: TabKey; label: string; Icon: typeof Activity }[] = [
  { key: 'today', label: 'Today', Icon: Activity },
  { key: 'program', label: 'Program', Icon: Calendar },
  { key: 'log', label: 'Log', Icon: TrendingUp },
  { key: 'info', label: 'Info', Icon: Info },
]

export function TabNav({ active, onChange }: { active: TabKey; onChange: (k: TabKey) => void }) {
  return (
    <nav
      className="sticky bottom-0 z-30 bg-ink-900/95 backdrop-blur border-t border-ink-600 grid grid-cols-4"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)', minHeight: 'calc(64px + env(safe-area-inset-bottom))' }}
    >
      {TABS.map(({ key, label, Icon }) => {
        const isActive = active === key
        return (
          <button
            key={key}
            onClick={() => onChange(key)}
            className={`flex flex-col items-center justify-center gap-1 min-h-[64px] ${
              isActive ? 'text-ripon' : 'text-steel hover:text-cream'
            }`}
          >
            <Icon size={22} strokeWidth={isActive ? 2.5 : 2} />
            <span className="text-[11px] font-medium tracking-wide uppercase font-display">{label}</span>
          </button>
        )
      })}
    </nav>
  )
}
