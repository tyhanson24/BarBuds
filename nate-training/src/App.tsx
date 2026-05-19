import { useState } from 'react'
import type { DayOfWeek } from './types'
import { useCurrentDay } from './hooks/useCurrentDay'
import { getPhase } from './data/program'
import { Header } from './components/ui/Header'
import { TabNav } from './components/ui/TabNav'
import type { TabKey } from './components/ui/TabNav'
import { TopTabBar } from './components/ui/TopTabBar'
import { SettingsModal } from './components/ui/SettingsModal'
import { TodayView } from './components/views/TodayView'
import { ProgramView } from './components/views/ProgramView'
import { LogView } from './components/views/LogView'
import { InfoView } from './components/views/InfoView'

function App() {
  const current = useCurrentDay()
  const [tab, setTab] = useState<TabKey>('today')
  const [week, setWeek] = useState<number>(current.week)
  const [day, setDay] = useState<DayOfWeek>(current.day)
  const [settingsOpen, setSettingsOpen] = useState(false)

  const phase = getPhase(week)

  function goToDay(w: number, d: DayOfWeek) {
    setWeek(w)
    setDay(d)
    setTab('today')
  }

  return (
    <div className="min-h-dvh flex flex-col">
      <Header week={week} day={day} phase={phase} onSettings={() => setSettingsOpen(true)} />
      <TopTabBar active={tab} onChange={setTab} />
      <main className="flex-1 flex flex-col">
        {tab === 'today' && <TodayView week={week} day={day} onChangeDay={(w, d) => { setWeek(w); setDay(d) }} />}
        {tab === 'program' && <ProgramView selectedWeek={week} selectedDay={day} currentWeek={current.week} currentDay={current.day} onSelect={goToDay} />}
        {tab === 'log' && <LogView />}
        {tab === 'info' && <InfoView />}
      </main>
      <TabNav active={tab} onChange={setTab} />
      <SettingsModal open={settingsOpen} onClose={() => setSettingsOpen(false)} />
    </div>
  )
}

export default App
