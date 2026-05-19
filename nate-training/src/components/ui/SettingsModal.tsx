import { useEffect, useState } from 'react'
import { X, Copy, ExternalLink } from 'lucide-react'
import { getSettings, saveSettings } from '../../lib/storage'
import type { Settings } from '../../types'
import { PROGRAM_START_DATE, NATE_USER_ID } from '../../data/program'

export function SettingsModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [settings, setSettings] = useState<Settings>({ programStartDate: PROGRAM_START_DATE, surgicalLeg: 'L' })
  const [saving, setSaving] = useState(false)
  const [savedMsg, setSavedMsg] = useState<string | null>(null)

  useEffect(() => {
    if (!open) return
    getSettings().then((s) => {
      if (s) setSettings(s)
    })
  }, [open])

  async function onSave() {
    setSaving(true)
    await saveSettings(settings)
    setSaving(false)
    setSavedMsg('Saved · reload to apply')
    setTimeout(() => setSavedMsg(null), 2500)
  }

  function copyUUID() {
    navigator.clipboard?.writeText(NATE_USER_ID)
    setSavedMsg('UUID copied')
    setTimeout(() => setSavedMsg(null), 1500)
  }

  if (!open) return null
  return (
    <div className="fixed inset-0 z-50 bg-ink-900/85 backdrop-blur-sm flex items-end sm:items-center justify-center p-3 sm:p-4">
      <div className="bg-ink-800 border border-ink-600 rounded-t-2xl sm:rounded-2xl w-full max-w-md p-5 space-y-4 max-h-[90dvh] overflow-y-auto" style={{ paddingBottom: 'max(1.25rem, env(safe-area-inset-bottom))' }}>
        <div className="flex items-center justify-between">
          <h2 className="font-display tracking-widest text-xl uppercase text-cream">Settings</h2>
          <button onClick={onClose} className="text-steel hover:text-cream p-1 -m-1 min-h-[44px] min-w-[44px] flex items-center justify-center" aria-label="Close">
            <X size={22} />
          </button>
        </div>

        <Field label="Program start date">
          <input
            type="date"
            value={settings.programStartDate}
            onChange={(e) => setSettings((s) => ({ ...s, programStartDate: e.target.value }))}
            className="w-full bg-ink-900 border border-ink-600 rounded px-3 py-2.5 text-base font-mono text-cream focus:border-ripon focus:outline-none min-h-[44px]"
          />
          <p className="text-[11px] text-steel mt-1">Must be a Monday. Day-of-program math uses this.</p>
        </Field>

        <Field label="Surgical leg">
          <div className="grid grid-cols-2 gap-2">
            {(['L', 'R'] as const).map((leg) => (
              <button
                key={leg}
                onClick={() => setSettings((s) => ({ ...s, surgicalLeg: leg }))}
                className={`min-h-[44px] py-2.5 rounded font-display tracking-widest text-sm uppercase border ${
                  settings.surgicalLeg === leg
                    ? 'bg-ripon text-cream border-ripon'
                    : 'bg-ink-900 text-cream border-ink-600 active:bg-ink-700'
                }`}
              >
                {leg === 'L' ? 'Left' : 'Right'}
              </button>
            ))}
          </div>
        </Field>

        <Field label="Account">
          <div className="flex items-center gap-2 bg-ink-900 border border-ink-600 rounded px-3 py-2">
            <span className="font-mono text-[11px] text-cream/80 truncate flex-1">{NATE_USER_ID}</span>
            <button onClick={copyUUID} className="text-steel hover:text-cream p-1 min-h-[44px] min-w-[44px] flex items-center justify-center" aria-label="Copy UUID">
              <Copy size={16} />
            </button>
          </div>
          <p className="text-[11px] text-steel mt-1">Anonymous single-user ID. All your data is keyed to this UUID.</p>
        </Field>

        <Field label="Resources">
          <div className="space-y-2 text-sm">
            <a
              href="https://github.com/tyhanson24/BarBuds"
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-between bg-ink-900 border border-ink-600 rounded px-3 py-3 min-h-[44px] active:bg-ink-700 text-cream"
            >
              <span>Source on GitHub</span>
              <ExternalLink size={16} className="text-steel" />
            </a>
          </div>
        </Field>

        <div className="pt-1">
          <button
            disabled={saving}
            onClick={onSave}
            className="w-full min-h-[48px] py-3 bg-ripon text-cream font-display tracking-widest text-base uppercase rounded disabled:opacity-50 active:bg-ripon-dark"
          >
            {saving ? 'Saving…' : 'Save Settings'}
          </button>
          {savedMsg && (
            <p className="text-center text-xs text-signal-green mt-2 font-mono">{savedMsg}</p>
          )}
        </div>
      </div>
    </div>
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="text-[10px] uppercase tracking-wider text-steel mb-1.5 font-display">{label}</div>
      {children}
    </div>
  )
}
