import { useState } from 'react';
import { DAYS, TRAINING_SCHEDULE, getSessionForDay, getTotalExercises } from '../data/workouts';
import { useLocalStorage } from '../hooks/useLocalStorage';
import WeekCalendar from './WeekCalendar';
import ExerciseCard from './ExerciseCard';
import ProgressRing from './ProgressRing';

const DAY_NAMES_FULL = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export default function Dashboard({ userName, onSettings, onHistory }) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [completedExercises, setCompletedExercises] = useLocalStorage('willfit-completed', {});

  const dayName = DAYS[selectedDate.getDay()];
  const schedule = TRAINING_SCHEDULE[dayName];
  const session = getSessionForDay(dayName);
  const totalExercises = getTotalExercises(session);

  const dateKey = selectedDate.toISOString().split('T')[0];

  const getCompleted = () => completedExercises[dateKey] || [];

  const toggleExercise = (sectionIdx, exerciseIdx) => {
    const key = `${sectionIdx}-${exerciseIdx}`;
    const current = getCompleted();
    const updated = current.includes(key)
      ? current.filter((k) => k !== key)
      : [...current, key];

    setCompletedExercises({
      ...completedExercises,
      [dateKey]: updated,
    });
  };

  const completedCount = getCompleted().length;

  const changeWeek = (delta) => {
    const d = new Date(selectedDate);
    d.setDate(d.getDate() + delta * 7);
    setSelectedDate(d);
  };

  return (
    <div className="dashboard">
      <div className="dash-header">
        <div>
          <div className="dash-logo">
            WILL<span className="logo-accent">FIT</span>
          </div>
          <div className="dash-subtitle">{userName}</div>
        </div>
        <div className="dash-icons">
          <button className="icon-btn" onClick={onHistory} title="History">
            &#x2197;
          </button>
          <button className="icon-btn" onClick={onSettings} title="Settings">
            &#x2699;
          </button>
        </div>
      </div>

      <WeekCalendar
        selectedDate={selectedDate}
        onSelectDate={setSelectedDate}
        onPrevWeek={() => changeWeek(-1)}
        onNextWeek={() => changeWeek(1)}
      />

      {!schedule || schedule.type === 'rest' ? (
        <div className="rest-day">
          <h2>Rest Day</h2>
          <p>Recover, stretch, eat well. You earned it.</p>
        </div>
      ) : (
        <>
          <div className="session-header">
            <div>
              <div className="session-day-label">
                {DAY_NAMES_FULL[selectedDate.getDay()]}
              </div>
              <h2 className="session-title">{session.label}</h2>
              <div className="session-tags">
                {session.tags.map((tag) => (
                  <span key={tag} className={`tag tag-${tag}`}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <ProgressRing completed={completedCount} total={totalExercises} />
          </div>

          {session.sections.map((section, sIdx) => (
            <div className="section" key={sIdx}>
              <div className="section-title">{section.title}</div>
              <div className="section-subtitle">{section.subtitle}</div>
              {section.exercises.map((exercise, eIdx) => (
                <ExerciseCard
                  key={eIdx}
                  exercise={exercise}
                  index={eIdx}
                  completed={getCompleted().includes(`${sIdx}-${eIdx}`)}
                  onToggle={() => toggleExercise(sIdx, eIdx)}
                />
              ))}
            </div>
          ))}
        </>
      )}
    </div>
  );
}
