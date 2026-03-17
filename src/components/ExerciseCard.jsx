export default function ExerciseCard({ exercise, index, completed, onToggle }) {
  const num = String(index + 1).padStart(2, '0');

  return (
    <div
      className={`exercise-card ${completed ? 'completed' : ''}`}
      onClick={onToggle}
    >
      <div className="exercise-num">{num}</div>
      <div className="exercise-info">
        <div className="exercise-name-row">
          <span className="exercise-name">{exercise.name}</span>
          <span className={`equip-tag equip-${exercise.equipment}`}>
            {exercise.equipment}
          </span>
        </div>
        <div className="exercise-stats">
          <div>
            <div className="exercise-stat-label">SETS</div>
            <div className="exercise-stat-value">{exercise.sets}</div>
          </div>
          <div>
            <div className="exercise-stat-label">REPS</div>
            <div className="exercise-stat-value">{exercise.reps}</div>
          </div>
          <div>
            <div className="exercise-stat-label">REST</div>
            <div className="exercise-stat-value">{exercise.rest}</div>
          </div>
        </div>
        <div className="exercise-cue">{exercise.cue}</div>
      </div>
    </div>
  );
}
