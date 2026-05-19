import type { TabKey } from './TabNav'

const TABS: { key: TabKey; label: string }[] = [
  { key: 'today', label: 'TODAY' },
  { key: 'program', label: 'PROGRAM' },
  { key: 'log', label: 'LOG' },
  { key: 'info', label: 'INFO' },
]

export function TopTabBar({ active, onChange }: { active: TabKey; onChange: (k: TabKey) => void }) {
  return (
    <div
      role="tablist"
      className="sticky z-20 bg-ink-900/95 backdrop-blur border-b border-ink-600 overflow-x-auto no-scrollbar"
      style={{ top: 'calc(60px + env(safe-area-inset-top))' }}
    >
      <div className="grid grid-cols-4 min-w-full">
        {TABS.map(({ key, label }) => {
          const isActive = active === key
          return (
            <button
              key={key}
              role="tab"
              aria-selected={isActive}
              onClick={() => onChange(key)}
              className={`min-h-[44px] px-3 py-2.5 font-display tracking-widest text-xs uppercase border-b-2 transition-colors ${
                isActive ? 'text-cream border-ripon' : 'text-steel border-transparent active:text-cream'
              }`}
            >
              {label}
            </button>
          )
        })}
      </div>
    </div>
  )
}
