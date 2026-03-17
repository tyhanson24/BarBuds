import { useLocalStorage } from '../hooks/useLocalStorage';
import { DAYS, getSessionForDay, getTotalExercises } from '../data/workouts';

export default function History({ onBack }) {
  const [completedExercises] = useLocalStorage('willfit-completed', {});

  const entries = Object.entries(completedExercises)
    .filter(([, completed]) => completed.length > 0)
    .sort(([a], [b]) => b.localeCompare(a));

  return (
    <div className="history">
      <div className="history-header">
        <h1>History</h1>
        <button className="btn-nav" onClick={onBack}>
          &lt; TRAIN
        </button>
      </div>

      {entries.length === 0 ? (
        <div className="history-empty">
          Complete some exercises to see history here.
        </div>
      ) : (
        entries.map(([dateKey, completed]) => {
          const date = new Date(dateKey + 'T12:00:00');
          const dayName = DAYS[date.getDay()];
          const session = getSessionForDay(dayName);
          const total = getTotalExercises(session);
          const label = session?.label || 'Rest';

          const formattedDate = date.toLocaleDateString('en-US', {
            weekday: 'long',
            month: 'short',
            day: 'numeric',
          });

          return (
            <div key={dateKey} className="history-entry">
              <div className="history-date">{formattedDate}</div>
              <div className="history-session">{label}</div>
              <div className="history-count">
                {completed.length}/{total} exercises completed
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}
