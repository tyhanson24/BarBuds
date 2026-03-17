import { TRAINING_SCHEDULE } from '../data/workouts';

const SCHEDULE_DISPLAY = [
  { day: 'MON', label: 'Upper Pull + Lower Push' },
  { day: 'TUE', label: 'Upper Push + Lower Pull' },
  { day: 'WED', label: 'Cardio Only' },
  { day: 'THU', label: 'Upper Pull + Lower Push' },
  { day: 'FRI', label: 'Upper Push + Lower Pull' },
  { day: 'SAT', label: 'Rest' },
  { day: 'SUN', label: 'Rest' },
];

export default function Settings({ userName, onBack, onReset }) {
  return (
    <div className="settings">
      <div className="settings-header">
        <h1>Settings</h1>
        <button className="btn-nav" onClick={onBack}>
          &lt; TRAIN
        </button>
      </div>

      <div className="settings-card">
        <div className="settings-card-label">Athlete</div>
        <h3>{userName}</h3>
      </div>

      <div className="settings-card">
        <div className="settings-card-label">Gym</div>
        <h3>Planet Fitness</h3>
        <p>All exercises use PF-available equipment.</p>
      </div>

      <div className="settings-card">
        <div className="settings-card-label">Training Schedule</div>
        <div className="schedule-grid" style={{ marginTop: 8 }}>
          {SCHEDULE_DISPLAY.map(({ day, label }) => {
            const isRest = label === 'Rest';
            return (
              <div key={day} className={`schedule-row ${isRest ? 'rest' : ''}`}>
                <span className="schedule-day">{day}</span>
                <span className="schedule-label">{label}</span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="settings-card">
        <div className="settings-card-label">Program</div>
        <h3>Upper/Lower Push-Pull</h3>
        <p>4 lifting days + 1 cardio day per week. Every session under 1 hour. Cardio finisher on lift days.</p>
      </div>

      <button className="btn-danger" onClick={onReset}>
        RESET EVERYTHING
      </button>
    </div>
  );
}
