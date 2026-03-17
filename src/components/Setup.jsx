import { useState } from 'react';
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

export default function Setup({ onStart, onBack }) {
  const [name, setName] = useState('');

  const handleStart = () => {
    if (!name.trim()) return;
    onStart({ name: name.trim() });
  };

  return (
    <div className="setup">
      <h1 className="logo">
        BAR<span className="logo-accent">BUDS</span>
      </h1>
      <p className="tagline">Push. Pull. Train with your crew.</p>

      <input
        className="input"
        placeholder="Your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <div className="setup-section">
        <h2>YOUR SCHEDULE</h2>
        <p>Planet Fitness program — every session under 1 hour.</p>

        <div className="schedule-grid">
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

        <p className="schedule-note">
          Lifting days include a 10-min cardio finisher. Wednesday is dedicated cardio + core.
        </p>
      </div>

      <button
        className="btn-primary"
        onClick={handleStart}
        style={{ marginTop: 20, opacity: name.trim() ? 1 : 0.5 }}
        disabled={!name.trim()}
      >
        START TRAINING
      </button>
      <button className="btn-back" onClick={onBack}>
        Back
      </button>
    </div>
  );
}
