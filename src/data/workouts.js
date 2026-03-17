// Planet Fitness compatible workout program
// Split: Upper Pull/Lower Push (Mon/Thu), Upper Push/Lower Pull (Tue/Fri), Cardio (Wed)
// All workouts under 1 hour

export const DAYS = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

export const TRAINING_SCHEDULE = {
  MON: { type: 'lift', label: 'Upper Pull + Lower Push', session: 'A' },
  TUE: { type: 'lift', label: 'Upper Push + Lower Pull', session: 'B' },
  WED: { type: 'cardio', label: 'Cardio Only' },
  THU: { type: 'lift', label: 'Upper Pull + Lower Push', session: 'A' },
  FRI: { type: 'lift', label: 'Upper Push + Lower Pull', session: 'B' },
  SAT: { type: 'rest', label: 'Rest' },
  SUN: { type: 'rest', label: 'Rest' },
};

export const SESSION_A = {
  label: 'Upper Pull + Lower Push',
  tags: ['PULL', 'PUSH'],
  sections: [
    {
      title: 'UPPER PULL',
      subtitle: 'Back + Biceps',
      exercises: [
        {
          name: 'Lat Pulldown',
          equipment: 'MACHINE',
          sets: 3,
          reps: '10-12',
          rest: '90s',
          cue: 'Pull to upper chest. Squeeze shoulder blades. Control the negative.',
        },
        {
          name: 'Seated Cable Row',
          equipment: 'CABLE',
          sets: 3,
          reps: '10-12',
          rest: '90s',
          cue: 'Chest up, pull to belly button. Pause at contraction.',
        },
        {
          name: 'DB Row',
          equipment: 'DUMBBELL',
          sets: 3,
          reps: '10-12 ea.',
          rest: '60s',
          cue: 'One hand on bench. Row to hip, not shoulder. Full stretch at bottom.',
        },
        {
          name: 'Face Pull',
          equipment: 'CABLE',
          sets: 3,
          reps: '15',
          rest: '60s',
          cue: 'Rope attachment, pull to forehead. Externally rotate at top.',
        },
        {
          name: 'DB Curl',
          equipment: 'DUMBBELL',
          sets: 2,
          reps: '12-15',
          rest: '60s',
          cue: 'Controlled eccentric. No swinging. Alternate or together.',
        },
      ],
    },
    {
      title: 'LOWER PUSH',
      subtitle: 'Quads + Calves',
      exercises: [
        {
          name: 'Leg Press',
          equipment: 'MACHINE',
          sets: 3,
          reps: '12-15',
          rest: '90s',
          cue: 'Feet shoulder-width, mid-platform. Full ROM, don\'t lock knees.',
        },
        {
          name: 'Smith Machine Squat',
          equipment: 'SMITH',
          sets: 3,
          reps: '10-12',
          rest: '90s',
          cue: 'Feet slightly forward. Sit back into it. Chest up.',
        },
        {
          name: 'Leg Extension',
          equipment: 'MACHINE',
          sets: 3,
          reps: '12-15',
          rest: '60s',
          cue: 'Squeeze at top for 1 second. Slow negative.',
        },
        {
          name: 'Standing Calf Raise',
          equipment: 'MACHINE',
          sets: 3,
          reps: '15-20',
          rest: '45s',
          cue: 'Full stretch at bottom, pause at top. Slow tempo.',
        },
      ],
    },
    {
      title: 'CARDIO FINISHER',
      subtitle: '10 minutes to close it out',
      exercises: [
        {
          name: 'Incline Treadmill Walk',
          equipment: 'CARDIO',
          sets: 1,
          reps: '10 min',
          rest: '—',
          cue: '3.0-3.5 mph, 10-12% incline. Steady effort, no holding rails.',
        },
      ],
    },
  ],
};

export const SESSION_B = {
  label: 'Upper Push + Lower Pull',
  tags: ['PUSH', 'PULL'],
  sections: [
    {
      title: 'UPPER PUSH',
      subtitle: 'Chest + Shoulders + Triceps',
      exercises: [
        {
          name: 'DB Bench Press',
          equipment: 'DUMBBELL',
          sets: 3,
          reps: '10-12',
          rest: '90s',
          cue: 'Arch back slightly, feet flat. Touch DBs at top, stretch at bottom.',
        },
        {
          name: 'Smith Machine Incline Press',
          equipment: 'SMITH',
          sets: 3,
          reps: '10-12',
          rest: '90s',
          cue: 'Bench at 30°. Lower to upper chest. Drive up explosively.',
        },
        {
          name: 'DB Shoulder Press',
          equipment: 'DUMBBELL',
          sets: 3,
          reps: '10-12',
          rest: '60s',
          cue: 'Seated or standing. Press overhead, don\'t flare elbows too wide.',
        },
        {
          name: 'Cable Fly',
          equipment: 'CABLE',
          sets: 3,
          reps: '12-15',
          rest: '60s',
          cue: 'Slight bend in elbows. Squeeze chest hard at center. Slow stretch back.',
        },
        {
          name: 'Tricep Pushdown',
          equipment: 'CABLE',
          sets: 2,
          reps: '12-15',
          rest: '60s',
          cue: 'Elbows pinned to sides. Full lockout. Rope or bar attachment.',
        },
      ],
    },
    {
      title: 'LOWER PULL',
      subtitle: 'Hamstrings + Glutes',
      exercises: [
        {
          name: 'Smith Machine RDL',
          equipment: 'SMITH',
          sets: 3,
          reps: '10-12',
          rest: '90s',
          cue: 'Soft knees, hinge at hips. Feel hamstring stretch. Squeeze glutes at top.',
        },
        {
          name: 'Lying Leg Curl',
          equipment: 'MACHINE',
          sets: 3,
          reps: '12-15',
          rest: '60s',
          cue: 'Hips pressed into pad. Curl all the way up, slow on the way down.',
        },
        {
          name: 'DB Walking Lunge',
          equipment: 'DUMBBELL',
          sets: 3,
          reps: '10 ea.',
          rest: '60s',
          cue: 'Long stride, knee over ankle. Push through front heel. Stay upright.',
        },
        {
          name: 'Hip Abduction',
          equipment: 'MACHINE',
          sets: 2,
          reps: '15-20',
          rest: '45s',
          cue: 'Sit tall. Push knees out with control. Squeeze at full open.',
        },
      ],
    },
    {
      title: 'CARDIO FINISHER',
      subtitle: '10 minutes to close it out',
      exercises: [
        {
          name: 'Stairmaster',
          equipment: 'CARDIO',
          sets: 1,
          reps: '10 min',
          rest: '—',
          cue: 'Level 5-7. Full steps, no leaning on rails. Keep your core tight.',
        },
      ],
    },
  ],
};

export const CARDIO_DAY = {
  label: 'Cardio Only',
  tags: ['CARDIO'],
  sections: [
    {
      title: 'STEADY STATE CARDIO',
      subtitle: 'Pick one or mix it up — 30-40 minutes total',
      exercises: [
        {
          name: 'Incline Treadmill Walk',
          equipment: 'CARDIO',
          sets: 1,
          reps: '15 min',
          rest: '—',
          cue: '3.0-3.5 mph, 10-15% incline. Zone 2 heart rate.',
        },
        {
          name: 'Elliptical',
          equipment: 'CARDIO',
          sets: 1,
          reps: '10 min',
          rest: '—',
          cue: 'Moderate resistance. Push and pull with arms. Keep cadence steady.',
        },
        {
          name: 'Stationary Bike',
          equipment: 'CARDIO',
          sets: 1,
          reps: '10 min',
          rest: '—',
          cue: 'Moderate resistance. Seated or standing intervals. Cool down last 2 min.',
        },
      ],
    },
    {
      title: 'CORE CIRCUIT',
      subtitle: '2 rounds, minimal rest between exercises',
      exercises: [
        {
          name: 'Plank Hold',
          equipment: 'BODYWEIGHT',
          sets: 2,
          reps: '30-45s',
          rest: '30s',
          cue: 'Forearms on ground. Straight line from head to heels. Brace hard.',
        },
        {
          name: 'Dead Bug',
          equipment: 'BODYWEIGHT',
          sets: 2,
          reps: '10 ea.',
          rest: '30s',
          cue: 'Lower back pressed into floor. Opposite arm and leg extend. Slow.',
        },
        {
          name: 'Cable Woodchop',
          equipment: 'CABLE',
          sets: 2,
          reps: '12 ea.',
          rest: '30s',
          cue: 'Rotate from hips, not arms. Control the weight back. Both sides.',
        },
      ],
    },
  ],
};

export function getSessionForDay(dayName) {
  const schedule = TRAINING_SCHEDULE[dayName];
  if (!schedule) return null;
  if (schedule.type === 'rest') return null;
  if (schedule.type === 'cardio') return CARDIO_DAY;
  if (schedule.session === 'A') return SESSION_A;
  if (schedule.session === 'B') return SESSION_B;
  return null;
}

export function getTotalExercises(session) {
  if (!session) return 0;
  return session.sections.reduce((sum, s) => sum + s.exercises.length, 0);
}
