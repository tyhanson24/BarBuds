import { TRAINING_SCHEDULE } from '../data/workouts';

const DAY_NAMES = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

function getWeekDates(baseDate) {
  const d = new Date(baseDate);
  const day = d.getDay();
  const sunday = new Date(d);
  sunday.setDate(d.getDate() - day);

  return DAY_NAMES.map((name, i) => {
    const date = new Date(sunday);
    date.setDate(sunday.getDate() + i);
    return {
      name,
      date: date.getDate(),
      fullDate: new Date(date),
      hasWorkout: !!TRAINING_SCHEDULE[name] && TRAINING_SCHEDULE[name].type !== 'rest',
    };
  });
}

export default function WeekCalendar({ selectedDate, onSelectDate, onPrevWeek, onNextWeek }) {
  const today = new Date();
  const week = getWeekDates(selectedDate);

  const isToday = (d) =>
    d.fullDate.toDateString() === today.toDateString();

  const isSelected = (d) =>
    d.fullDate.toDateString() === selectedDate.toDateString();

  return (
    <div className="week-cal">
      <button className="week-nav" onClick={onPrevWeek}>&lt;</button>
      {week.map((d) => (
        <div
          key={d.name}
          className={`week-day ${isSelected(d) ? 'selected' : ''} ${isToday(d) ? 'today' : ''}`}
          onClick={() => onSelectDate(d.fullDate)}
        >
          <span className="week-day-name">{d.name}</span>
          <span className="week-day-num">{d.date}</span>
          {d.hasWorkout && <span className="week-day-dot" />}
        </div>
      ))}
      <button className="week-nav" onClick={onNextWeek}>&gt;</button>
    </div>
  );
}
