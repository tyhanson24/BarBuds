import { useState } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

const SCHEDULE_DISPLAY = [
  { day: 'MON', label: 'Upper Pull + Lower Push' },
  { day: 'TUE', label: 'Upper Push + Lower Pull' },
  { day: 'WED', label: 'Cardio Only' },
  { day: 'THU', label: 'Upper Pull + Lower Push' },
  { day: 'FRI', label: 'Upper Push + Lower Pull' },
  { day: 'SAT', label: 'Rest' },
  { day: 'SUN', label: 'Rest' },
];

function calcMacros(currentWeight, goalWeight) {
  const losing = goalWeight < currentWeight;
  const maintaining = goalWeight === currentWeight;

  // Target bodyweight in lbs for calculations
  const targetBw = goalWeight;

  // Calories: ~12 cal/lb for cut, ~15 for maintain, ~17 for bulk
  let calPerLb = maintaining ? 15 : losing ? 12 : 17;
  const calories = Math.round(targetBw * calPerLb);

  // Protein: 1g per lb of goal bodyweight
  const protein = Math.round(targetBw * 1);

  // Fat: 0.35g per lb of goal bodyweight
  const fat = Math.round(targetBw * 0.35);

  // Carbs: fill remaining calories
  const carbCalories = calories - (protein * 4) - (fat * 9);
  const carbs = Math.round(Math.max(carbCalories / 4, 50));

  const actualCalories = (protein * 4) + (carbs * 4) + (fat * 9);

  const goal = losing ? 'Fat Loss' : maintaining ? 'Maintenance' : 'Lean Bulk';

  return { calories: actualCalories, protein, carbs, fat, goal };
}

export default function Settings({ userName, onBack, onReset }) {
  const [macroData, setMacroData] = useLocalStorage('willfit-macros', {
    currentWeight: '',
    goalWeight: '',
  });

  const [showMacros, setShowMacros] = useState(
    macroData.currentWeight && macroData.goalWeight
  );

  const handleCalc = () => {
    if (!macroData.currentWeight || !macroData.goalWeight) return;
    setShowMacros(true);
  };

  const macros =
    showMacros && macroData.currentWeight && macroData.goalWeight
      ? calcMacros(Number(macroData.currentWeight), Number(macroData.goalWeight))
      : null;

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

      {/* Macro Calculator */}
      <div className="settings-card">
        <div className="settings-card-label">Macro Calculator</div>
        <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
          <input
            className="input"
            type="number"
            placeholder="Current weight (lbs)"
            value={macroData.currentWeight}
            onChange={(e) => {
              setMacroData({ ...macroData, currentWeight: e.target.value });
              setShowMacros(false);
            }}
            style={{ marginBottom: 0 }}
          />
          <input
            className="input"
            type="number"
            placeholder="Goal weight (lbs)"
            value={macroData.goalWeight}
            onChange={(e) => {
              setMacroData({ ...macroData, goalWeight: e.target.value });
              setShowMacros(false);
            }}
            style={{ marginBottom: 0 }}
          />
        </div>
        <button
          className="btn-primary"
          onClick={handleCalc}
          style={{
            marginTop: 12,
            opacity: macroData.currentWeight && macroData.goalWeight ? 1 : 0.5,
          }}
          disabled={!macroData.currentWeight || !macroData.goalWeight}
        >
          CALCULATE MACROS
        </button>

        {macros && (
          <div className="macro-results">
            <div className="macro-goal">{macros.goal}</div>
            <div className="macro-calories">{macros.calories} cal/day</div>
            <div className="macro-grid">
              <div className="macro-item">
                <span className="macro-value protein">{macros.protein}g</span>
                <span className="macro-label">Protein</span>
              </div>
              <div className="macro-item">
                <span className="macro-value carbs">{macros.carbs}g</span>
                <span className="macro-label">Carbs</span>
              </div>
              <div className="macro-item">
                <span className="macro-value fat">{macros.fat}g</span>
                <span className="macro-label">Fat</span>
              </div>
            </div>
            <p style={{ color: 'var(--text-dim)', fontSize: '0.75rem', marginTop: 8 }}>
              Based on 1g protein/lb goal weight, 0.35g fat/lb, carbs fill remaining calories.
            </p>
          </div>
        )}
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
