import type { Workout, DayOfWeek } from '../types'
import { getPhase, weekInPhase } from './program'

// =====================================================================
// PHASE 1 TEMPLATES (Weeks 1-3) — weekIdx is 0, 1, or 2
// =====================================================================

function p1_mon(w: number): Workout {
  return {
    id: `w${w + 1}d1`,
    week: w + 1,
    day: 1,
    phase: 1,
    type: 'Speed + Lower Push',
    title: 'Linear Speed (Accel) + Lower Push',
    duration: '70 min',
    notes: [
      'Surgical leg first on every unilateral exercise.',
      'Sprints today are 85% effort. Save 100% for Phase 3.',
    ],
    blocks: [
      {
        name: 'Warm-up',
        duration: '15 min',
        exercises: [
          { id: 'gen-bike', name: 'Easy bike or row', sets: 1, reps: '5 min', category: 'warmup' },
          { id: 'dyn-warmup', name: 'Dynamic warm-up + activation', sets: 1, reps: '10 min', note: 'See Info tab', category: 'warmup' },
        ],
      },
      {
        name: 'Speed — Acceleration',
        duration: '15 min',
        exercises: [
          { id: 'wall-drive', name: 'Wall drives', sets: 3, reps: '5/leg', category: 'speed' },
          { id: 'a-skip', name: 'A-skip', sets: 3, reps: '20 yd', category: 'speed' },
          { id: 'falling-start', name: 'Falling starts', sets: 4, reps: '10 yd', effort: '85%', rest: 'walk back', category: 'speed' },
          { id: '10yd-sprint', name: '10-yard sprints', sets: 6, reps: '10 yd', effort: '85%', rest: '60s', category: 'speed' },
        ],
      },
      {
        name: 'Lower Push',
        duration: '30 min',
        exercises: [
          { id: 'front-squat', name: 'Front squat', sets: 4, reps: '6', load: `${[155, 165, 175][w]} lbs`, category: 'main' },
          { id: 'bss', name: 'RFE Bulgarian split squat', sets: 4, reps: '8/leg', load: `${[35, 40, 45][w]} lb DB ea hand`, note: 'Surgical leg first', category: 'main' },
          { id: 'step-up', name: 'Step-up (knee-high box)', sets: 3, reps: '10/leg', load: `${[30, 35, 40][w]} lb DB ea hand`, note: 'Drive through heel, no hop', category: 'main' },
          { id: 'sl-leg-press', name: 'Single-leg leg press', sets: 3, reps: '10/leg', note: 'Slow 3s eccentric', category: 'accessory' },
          { id: 'calf', name: 'Standing calf raise', sets: 3, reps: '15', category: 'accessory' },
        ],
      },
      {
        name: 'Core',
        exercises: [
          { id: 'dead-bug', name: 'Dead bug', sets: 3, reps: '8/side', category: 'core' },
          { id: 'pallof', name: 'Pallof press', sets: 3, reps: '10/side', category: 'core' },
        ],
      },
    ],
  }
}

function p1_tue(w: number): Workout {
  return {
    id: `w${w + 1}d2`,
    week: w + 1,
    day: 2,
    phase: 1,
    type: 'Upper Strength',
    title: 'Upper Strength',
    duration: '60 min',
    blocks: [
      { name: 'Warm-up', duration: '10 min', exercises: [
        { id: 'gen-row', name: 'Easy row', sets: 1, reps: '5 min', category: 'warmup' },
        { id: 'upper-warmup', name: 'Banded shoulder warm-up + scap work', sets: 1, reps: '5 min', category: 'warmup' },
      ]},
      { name: 'Strength', exercises: [
        { id: 'bench', name: 'Bench press', sets: 5, reps: '5', load: `${[205, 215, 225][w]} lbs`, category: 'main' },
        { id: 'weighted-pullup', name: 'Weighted pull-up', sets: 5, reps: '5', load: `+${[20, 25, 30][w]} lb`, note: 'Band-assist if needed', category: 'main' },
        { id: 'db-incline', name: 'DB incline press', sets: 4, reps: '8', category: 'main' },
        { id: 'bb-row', name: 'Barbell bent-over row', sets: 4, reps: '8', category: 'main' },
      ]},
      { name: 'Accessory', exercises: [
        { id: 'lat-raise', name: 'DB lateral raise', sets: 3, reps: '12', category: 'accessory' },
        { id: 'face-pull', name: 'Face pull', sets: 3, reps: '15', category: 'accessory' },
        { id: 'farmer', name: 'Farmer carry', sets: 3, reps: '40 yd', load: 'heavy', category: 'accessory' },
      ]},
      { name: 'Core', exercises: [
        { id: 'hlr', name: 'Hanging leg raise', sets: 3, reps: '8', category: 'core' },
      ]},
    ],
  }
}

function p1_wed(w: number): Workout {
  return {
    id: `w${w + 1}d3`,
    week: w + 1,
    day: 3,
    phase: 1,
    type: 'COD + Lower Pull',
    title: 'Pre-Planned COD + Lower Pull',
    duration: '70 min',
    notes: ['NO reactive cuts. Pre-planned, deliberate change of direction only.'],
    blocks: [
      { name: 'Warm-up', duration: '10 min', exercises: [
        { id: 'gen-bike2', name: 'Easy bike', sets: 1, reps: '5 min', category: 'warmup' },
        { id: 'dyn-warmup2', name: 'Dynamic warm-up', sets: 1, reps: '5 min', category: 'warmup' },
      ]},
      { name: 'Agility — Pre-Planned', duration: '15 min', exercises: [
        { id: 'lat-shuffle-sprint', name: 'Lateral shuffle → sprint', sets: 4, reps: '10 yd (5L/5F)', category: 'agility' },
        { id: 'bp-fwd', name: 'Backpedal → forward sprint', sets: 4, reps: '10 yd', category: 'agility' },
        { id: 'decel', name: 'Deceleration drill', sets: 4, reps: '10 yd sprint, 5 yd decel, hold 2s', category: 'agility' },
      ]},
      { name: 'Lower Pull', exercises: [
        { id: 'trap-bar', name: 'Trap bar deadlift', sets: 4, reps: '6', load: `${[235, 245, 255][w]} lbs`, note: 'Sub conventional DL if no trap bar', category: 'main' },
        { id: 'rdl', name: 'Romanian deadlift', sets: 4, reps: '8', category: 'main' },
        { id: 'rev-lunge', name: 'Reverse lunge (DB)', sets: 3, reps: '8/leg', category: 'main' },
        { id: 'nordic', name: 'Nordic hamstring curl (eccentric)', sets: 3, reps: '5', note: 'NON-NEGOTIABLE. 5-sec lower. Partner hold or band-assisted.', category: 'main' },
      ]},
      { name: 'Core', exercises: [
        { id: 'copenhagen', name: 'Copenhagen plank', sets: 3, reps: '20 sec/side', category: 'core' },
        { id: 'hollow-hold', name: 'Hollow hold', sets: 3, reps: '30 sec', category: 'core' },
        { id: 'side-plank', name: 'Side plank', sets: 3, reps: '30 sec/side', category: 'core' },
      ]},
    ],
  }
}

function p1_thu(w: number): Workout {
  return {
    id: `w${w + 1}d4`,
    week: w + 1,
    day: 4,
    phase: 1,
    type: 'Mobility + Z2',
    title: 'Mobility + Aerobic Recovery',
    duration: '60 min',
    blocks: [
      { name: 'Mobility', duration: '20 min', exercises: [
        { id: 'mobility-flow', name: 'Hip / ankle / T-spine flow', sets: 1, reps: '20 min', category: 'mobility' },
      ]},
      { name: 'Aerobic Z2', duration: '30 min', exercises: [
        { id: 'z2', name: 'Row, bike, or jog', sets: 1, reps: '30 min', effort: 'HR ~140–150', category: 'conditioning' },
      ]},
      { name: 'Soft Tissue', duration: '15 min', exercises: [
        { id: 'roll', name: 'Foam roll + lacrosse ball', sets: 1, reps: '15 min', note: 'Glutes, quads, calves, T-spine', category: 'mobility' },
      ]},
    ],
  }
}

function p1_fri(w: number): Workout {
  return {
    id: `w${w + 1}d5`,
    week: w + 1,
    day: 5,
    phase: 1,
    type: 'Top Speed + Upper Power',
    title: 'Top-End Speed + Upper Power',
    duration: '70 min',
    blocks: [
      { name: 'Warm-up', duration: '10 min', exercises: [
        { id: 'gen-row2', name: 'Easy row', sets: 1, reps: '5 min', category: 'warmup' },
        { id: 'dyn-warmup3', name: 'Dynamic warm-up', sets: 1, reps: '5 min', category: 'warmup' },
      ]},
      { name: 'Speed — Top End', duration: '20 min', exercises: [
        { id: 'skip-drills', name: 'A-skip, B-skip, dribbles', sets: 2, reps: '20 yd each', category: 'speed' },
        { id: 'build-up', name: 'Build-ups', sets: 3, reps: '30 yd', effort: 'gradual to 85%', category: 'speed' },
        { id: 'flying-10', name: 'Flying 10s', sets: 4, reps: '10 yd w/ 20 yd lead-in', effort: '90%', rest: '2 min', category: 'speed' },
      ]},
      { name: 'Upper Power', exercises: [
        { id: 'push-press', name: 'Push press', sets: 5, reps: '3', load: `${[145, 155, 165][w]} lbs`, category: 'main' },
        { id: 'mb-chest-pass', name: 'Med ball chest pass (wall)', sets: 4, reps: '5', effort: 'max', category: 'plyo' },
        { id: 'mb-slam', name: 'Med ball overhead slam', sets: 4, reps: '5', effort: 'max', category: 'plyo' },
        { id: 'db-bench', name: 'DB bench press', sets: 4, reps: '6', category: 'main' },
        { id: 'weighted-chinup', name: 'Weighted chin-up', sets: 4, reps: '5', load: `+${[20, 25, 30][w]} lb`, category: 'main' },
      ]},
      { name: 'Accessory', exercises: [
        { id: 'sa-row', name: 'Single-arm DB row', sets: 3, reps: '8/side', category: 'accessory' },
        { id: 'landmine-press', name: 'Landmine press', sets: 3, reps: '8/side', category: 'accessory' },
      ]},
      { name: 'Core', exercises: [
        { id: 'plank-combo', name: 'Plank (front + side)', sets: 3, reps: '45 sec', category: 'core' },
      ]},
    ],
  }
}

function p1_sat(w: number): Workout {
  const conditioning = [
    { reps: '8×60 yd', rest: '45s', effort: '70%' },
    { reps: '10×60 yd', rest: '40s', effort: '75%' },
    { reps: '12×60 yd', rest: '35s', effort: '75%' },
  ][w]!
  return {
    id: `w${w + 1}d6`,
    week: w + 1,
    day: 6,
    phase: 1,
    type: 'Conditioning + Position',
    title: 'Conditioning + Position Drills',
    duration: '60 min',
    blocks: [
      { name: 'Warm-up', duration: '10 min', exercises: [
        { id: 'dyn-warmup4', name: 'Dynamic warm-up', sets: 1, reps: '10 min', category: 'warmup' },
      ]},
      { name: 'Conditioning — Tempo Runs', exercises: [
        { id: 'tempo-60', name: 'Tempo 60s', sets: 1, reps: conditioning.reps, effort: conditioning.effort, rest: conditioning.rest, category: 'conditioning' },
      ]},
      { name: 'Position Skill (Light, Technical)', exercises: [
        { id: 'backpedal', name: 'Backpedal mechanics', sets: 4, reps: '15 yd', note: 'Focus on hip position', category: 'position' },
        { id: 'bp-turn', name: 'Backpedal to 90° turn', sets: 4, reps: 'each side', note: 'Slow, deliberate, no full speed', category: 'position' },
        { id: 'catch-reps', name: 'Catch reps (if partner)', sets: 1, reps: '50 punts/kicks', note: 'Mostly stationary', category: 'position' },
      ]},
    ],
  }
}

function p1_sun(w: number): Workout {
  return {
    id: `w${w + 1}d7`,
    week: w + 1,
    day: 7,
    phase: 1,
    type: 'OFF',
    title: 'Rest Day',
    duration: '—',
    rest: true,
    blocks: [],
    notes: ['Full rest. Sleep 9 hrs. Eat the protein.'],
  }
}

// =====================================================================
// PHASE 2 TEMPLATES (Weeks 4-7) — weekIdx is 0, 1, 2, 3
// Week 7 (weekIdx=3) is a TEST week on main lifts.
// =====================================================================

function p2_mon(w: number): Workout {
  const wk: Workout = {
    id: `w${w + 4}d1`,
    week: w + 4,
    day: 1,
    phase: 2,
    type: 'Speed + Lower Push (Heavy)',
    title: 'Accel Speed + Lower Push (Heavy)',
    duration: '75 min',
    blocks: [
      { name: 'Warm-up', duration: '15 min', exercises: [
        { id: 'gen-bike3', name: 'Easy bike', sets: 1, reps: '5 min', category: 'warmup' },
        { id: 'dyn-warmup5', name: 'Dynamic warm-up', sets: 1, reps: '10 min', category: 'warmup' },
      ]},
      { name: 'Speed', exercises: [
        { id: 'wall-drive2', name: 'Wall drives', sets: 2, reps: '5/leg', category: 'speed' },
        { id: 'skip-drills2', name: 'A-skip, B-skip', sets: 2, reps: '20 yd', category: 'speed' },
        { id: 'sled-push', name: 'Sled push (heavy)', sets: 5, reps: '10 yd', effort: 'max', rest: 'full', note: 'Sub: BikeErg max-resistance 8 sec', category: 'speed' },
        { id: 'resisted-sprint', name: 'Resisted sprint (band or sled, light)', sets: 4, reps: '15 yd', category: 'speed' },
        { id: 'sprint-15', name: 'Unresisted sprint', sets: 4, reps: '15 yd', effort: '95%', category: 'speed' },
      ]},
      { name: 'Lower Push', exercises: [
        { id: 'front-squat', name: 'Front squat', sets: 5, reps: w === 3 ? '3 (3RM test)' : '3', load: `${[195, 215, 235, 250][w]} lbs`, category: 'main' },
        { id: 'sl-box-jump', name: 'Single-leg box jump', sets: 4, reps: '3/leg', note: w < 2 ? 'Small box. Stick the landing.' : 'Medium box. Stick the landing.', category: 'plyo' },
        { id: 'bss-heavy', name: 'Bulgarian split squat (heavy)', sets: 4, reps: '6/leg', load: `${[50, 60, 70, 80][w]} lb DB ea hand`, category: 'main' },
        { id: 'sl-rdl', name: 'Single-leg RDL', sets: 3, reps: '8/leg', load: `${[45, 50, 55, 60][w]} lb DB ea hand`, note: 'Slow eccentric', category: 'main' },
        { id: 'heavy-stepup', name: 'Heavy step-up', sets: 3, reps: '6/leg', category: 'main' },
        { id: 'calf-heavy', name: 'Standing calf raise (heavy)', sets: 4, reps: '8', category: 'accessory' },
      ]},
      { name: 'Core', exercises: [
        { id: 'pallof-march', name: 'Pallof press + march', sets: 3, reps: '10/side', category: 'core' },
      ]},
    ],
  }
  if (w === 3) wk.notes = ['Week 7 — Front Squat 3RM test on top set.']
  return wk
}

function p2_tue(w: number): Workout {
  const wk: Workout = {
    id: `w${w + 4}d2`,
    week: w + 4,
    day: 2,
    phase: 2,
    type: 'Upper Strength (Heavy)',
    title: 'Upper Strength (Heavy)',
    duration: '60 min',
    blocks: [
      { name: 'Warm-up', duration: '10 min', exercises: [
        { id: 'gen-row3', name: 'Easy row', sets: 1, reps: '5 min', category: 'warmup' },
        { id: 'upper-warmup2', name: 'Banded shoulder + scap', sets: 1, reps: '5 min', category: 'warmup' },
      ]},
      { name: 'Strength', exercises: [
        { id: 'bench', name: 'Bench press', sets: 5, reps: w === 3 ? '3 (3RM test)' : '3', load: `${[235, 245, 255, 265][w]} lbs`, category: 'main' },
        { id: 'weighted-pullup', name: 'Weighted pull-up', sets: 5, reps: '3', load: `+${[35, 40, 45, 50][w]} lb`, category: 'main' },
        { id: 'cg-bench', name: 'Close-grip bench', sets: 4, reps: '6', load: `${[195, 205, 215, 225][w]} lbs`, category: 'main' },
        { id: 'pendlay', name: 'Pendlay row', sets: 4, reps: '6', load: `${[165, 175, 185, 195][w]} lbs`, category: 'main' },
      ]},
      { name: 'Accessory', exercises: [
        { id: 'db-press', name: 'DB shoulder press', sets: 3, reps: '8', category: 'accessory' },
        { id: 'cable-face-pull', name: 'Cable face pull', sets: 3, reps: '15', category: 'accessory' },
        { id: 'heavy-farmer', name: 'Heavy farmer carry', sets: 4, reps: '30 yd', category: 'accessory' },
      ]},
      { name: 'Core', exercises: [
        { id: 'weighted-hlr', name: 'Weighted hanging leg raise', sets: 3, reps: '6', category: 'core' },
      ]},
    ],
  }
  if (w === 3) wk.notes = ['Week 7 — Bench 3RM test on top set.']
  return wk
}

function p2_wed(w: number): Workout {
  const wk: Workout = {
    id: `w${w + 4}d3`,
    week: w + 4,
    day: 3,
    phase: 2,
    type: 'COD + Lower Pull',
    title: 'Pre-Planned Multi-Directional COD + Lower Pull',
    duration: '75 min',
    blocks: [
      { name: 'Warm-up', duration: '10 min', exercises: [
        { id: 'gen-bike4', name: 'Easy bike', sets: 1, reps: '5 min', category: 'warmup' },
        { id: 'dyn-warmup6', name: 'Dynamic warm-up', sets: 1, reps: '5 min', category: 'warmup' },
      ]},
      { name: 'Agility — Pre-Planned, Moderate Speed', duration: '20 min', exercises: [
        { id: 'pro-agility-walk', name: '5-10-5 walk-through', sets: 4, reps: '1', effort: '70%', category: 'agility' },
        { id: 'pro-agility', name: '5-10-5 (each direction)', sets: 4, reps: '1 ea direction', effort: '85%', category: 'agility' },
        { id: 'l-drill', name: 'L-drill (3-cone)', sets: 3, reps: '1 ea direction', effort: '85%', category: 'agility' },
        { id: 'box-drill', name: 'Box drill (5×5 yd)', sets: 4, reps: '1', note: 'Sprint, shuffle, backpedal, shuffle', category: 'agility' },
        { id: 'decel2', name: 'Deceleration', sets: 4, reps: '15 yd sprint, 5 yd decel, hold', category: 'agility' },
      ]},
      { name: 'Lower Pull', exercises: [
        { id: 'trap-bar', name: 'Trap bar deadlift', sets: 5, reps: w === 3 ? '3 (3RM test)' : '3', load: `${[275, 305, 335, 365][w]} lbs`, category: 'main' },
        { id: 'hip-thrust', name: 'Hip thrust (barbell)', sets: 4, reps: '6', load: `${[185, 205, 225, 245][w]} lbs`, category: 'main' },
        { id: 'sl-hip-thrust', name: 'Single-leg hip thrust', sets: 3, reps: '8/leg', load: ['BW', '10 lb plate', '15 lb plate', '20 lb plate'][w]!, category: 'main' },
        { id: 'nordic', name: 'Nordic hamstring curl', sets: 4, reps: '5', note: 'Add 1-sec pause at hardest point. NON-NEGOTIABLE.', category: 'main' },
      ]},
      { name: 'Core', exercises: [
        { id: 'copenhagen-full', name: 'Copenhagen plank (full)', sets: 3, reps: '20 sec/side', category: 'core' },
        { id: 'ghr-ecc', name: 'Glute-ham raise (eccentric)', sets: 3, reps: '6', note: 'Sub: banded Nordic if no GHR', category: 'core' },
        { id: 'hollow-rock', name: 'Hollow rock', sets: 3, reps: '10', category: 'core' },
      ]},
    ],
  }
  if (w === 3) wk.notes = ['Week 7 — Trap bar 3RM test on top set. LSI re-test on hops if scheduled today.']
  return wk
}

function p2_thu(w: number): Workout {
  return { ...p1_thu(w), id: `w${w + 4}d4`, week: w + 4, phase: 2 }
}

function p2_fri(w: number): Workout {
  return {
    id: `w${w + 4}d5`,
    week: w + 4,
    day: 5,
    phase: 2,
    type: 'Top Speed + Upper Power',
    title: 'Top-End Speed + Upper Power',
    duration: '75 min',
    blocks: [
      { name: 'Warm-up', duration: '10 min', exercises: [
        { id: 'gen-row4', name: 'Easy row', sets: 1, reps: '5 min', category: 'warmup' },
        { id: 'dyn-warmup7', name: 'Dynamic warm-up', sets: 1, reps: '5 min', category: 'warmup' },
      ]},
      { name: 'Speed — Top End', duration: '20 min', exercises: [
        { id: 'skip-fastleg', name: 'A-skip, fast leg, dribbles', sets: 2, reps: '20 yd each', category: 'speed' },
        { id: 'flying-20', name: 'Flying 20s', sets: 4, reps: '20 yd w/ 20 yd lead-in', effort: '95%', rest: 'full', category: 'speed' },
        { id: 'sprint-30-max', name: '30-yd build to max', sets: 3, reps: '30 yd', rest: 'full', category: 'speed' },
      ]},
      { name: 'Power', exercises: [
        { id: 'hang-clean', name: 'Hang power clean', sets: 5, reps: '3', load: `${[145, 155, 165, 175][w]} lbs`, note: 'Triple extension focus', category: 'main' },
        { id: 'push-press', name: 'Push press', sets: 5, reps: '3', load: `${[165, 175, 185, 195][w]} lbs`, category: 'main' },
        { id: 'mb-rotational', name: 'Med ball rotational throw', sets: 4, reps: '5/side', category: 'plyo' },
        { id: 'mb-slam2', name: 'Med ball overhead slam', sets: 4, reps: '5', category: 'plyo' },
        { id: 'plyo-pushup', name: 'Plyo push-up (clap or boxes)', sets: 4, reps: '5', category: 'plyo' },
      ]},
      { name: 'Upper Accessory', exercises: [
        { id: 'weighted-chinup2', name: 'Weighted chin-up', sets: 4, reps: '4', category: 'accessory' },
        { id: 'landmine-row', name: 'Single-arm landmine row', sets: 3, reps: '8/side', category: 'accessory' },
      ]},
      { name: 'Core', exercises: [
        { id: 'side-plank-reach', name: 'Side plank with reach', sets: 3, reps: '8/side', category: 'core' },
      ]},
    ],
  }
}

function p2_sat(_w: number): Workout {
  return {
    id: `w${_w + 4}d6`,
    week: _w + 4,
    day: 6,
    phase: 2,
    type: 'Conditioning + Position',
    title: 'Football Conditioning + Position Drills',
    duration: '70 min',
    blocks: [
      { name: 'Warm-up', duration: '10 min', exercises: [
        { id: 'dyn-warmup8', name: 'Dynamic warm-up', sets: 1, reps: '10 min', category: 'warmup' },
      ]},
      { name: 'Conditioning — Football Gas Tank', exercises: [
        { id: '110s', name: '110-yd runs', sets: 10, reps: '1', effort: '≤18 sec', rest: '45–60s', category: 'conditioning' },
      ]},
      { name: 'Position Drills', exercises: [
        { id: 'bp-break', name: 'Backpedal-break (45°, 90°, 180°)', sets: 5, reps: 'each angle', note: 'Pre-planned', category: 'position' },
        { id: 'close-ball', name: 'Closing-on-the-ball', sets: 8, reps: '1', effort: '70–80%', category: 'position' },
        { id: 'tackle-form', name: 'Tackling form (NO contact)', sets: 1, reps: '10 reps', note: 'Chute or pad approach, hip drop, knee over toe', category: 'position' },
      ]},
    ],
  }
}

function p2_sun(w: number): Workout {
  return { ...p1_sun(w), id: `w${w + 4}d7`, week: w + 4, phase: 2 }
}

// =====================================================================
// PHASE 3 TEMPLATES (Weeks 8-10) — weekIdx is 0, 1, 2
// =====================================================================

function p3_mon(w: number): Workout {
  return {
    id: `w${w + 8}d1`,
    week: w + 8,
    day: 1,
    phase: 3,
    type: 'Reactive Plyo + Power Squat + Accel',
    title: 'Reactive Plyo + Power Squat + Accel',
    duration: '75 min',
    notes: ['Only enter Phase 3 if Week 7 LSI ≥85%. Otherwise hold and re-test.'],
    blocks: [
      { name: 'Warm-up', duration: '10 min', exercises: [
        { id: 'dyn-warmup9', name: 'Dynamic warm-up', sets: 1, reps: '10 min', category: 'warmup' },
      ]},
      { name: 'Reactive Plyo', duration: '15 min', exercises: [
        { id: 'pogo', name: 'Pogo hops', sets: 3, reps: '10', note: 'Ground contact <0.2s', category: 'plyo' },
        { id: 'drop-jump', name: 'Drop jump → vertical (12" box)', sets: 4, reps: '4', category: 'plyo' },
        { id: 'sl-drop', name: 'Single-leg drop to single-leg hop', sets: 3, reps: '3/leg', category: 'plyo' },
        { id: 'bounding', name: 'Bounding', sets: 3, reps: '20 yd', category: 'plyo' },
      ]},
      { name: 'Speed — Reactive Accel', exercises: [
        { id: 'sled-accel', name: 'Resisted accel (heavy sled)', sets: 3, reps: '10 yd', category: 'speed' },
        { id: 'unresisted-accel', name: 'Unresisted accel', sets: 4, reps: '15 yd', effort: '100%', category: 'speed' },
        { id: 'reactive-start', name: 'Reactive start (partner visual cue)', sets: 4, reps: '15 yd', category: 'speed' },
      ]},
      { name: 'Lower (Speed-Strength)', exercises: [
        { id: 'front-squat-speed', name: 'Front squat (speed)', sets: 6, reps: '3', load: `${[170, 175, 180][w]} lbs (65%)`, note: 'Bar speed focus', category: 'main' },
        { id: 'sl-hop-distance', name: 'Single-leg hop for distance', sets: 4, reps: '3/leg', effort: 'max', category: 'plyo' },
        { id: 'bss-jump', name: 'Bulgarian split squat (jump)', sets: 3, reps: '6/leg', note: 'Explosive concentric', category: 'main' },
        { id: 'sl-rdl2', name: 'Single-leg RDL', sets: 3, reps: '6/leg', category: 'main' },
      ]},
      { name: 'Core', exercises: [
        { id: 'copenhagen-30', name: 'Copenhagen plank', sets: 3, reps: '30 sec/side', category: 'core' },
      ]},
    ],
  }
}

function p3_tue(w: number): Workout {
  return {
    id: `w${w + 8}d2`,
    week: w + 8,
    day: 2,
    phase: 3,
    type: 'Upper Power + Strength',
    title: 'Upper Power + Strength',
    duration: '65 min',
    blocks: [
      { name: 'Warm-up', duration: '10 min', exercises: [
        { id: 'gen-row5', name: 'Easy row', sets: 1, reps: '5 min', category: 'warmup' },
        { id: 'upper-warmup3', name: 'Banded shoulder + scap', sets: 1, reps: '5 min', category: 'warmup' },
      ]},
      { name: 'Strength + Power', exercises: [
        { id: 'bench-speed', name: 'Bench press (speed)', sets: 6, reps: '3', load: `${[170, 175, 180][w]} lbs (65%)`, note: 'Bar speed focus', category: 'main' },
        { id: 'plyo-pushup2', name: 'Plyo push-up', sets: 4, reps: '5', category: 'plyo' },
        { id: 'weighted-pullup-speed', name: 'Weighted pull-up (speed)', sets: 5, reps: '3', note: 'Explosive concentric', category: 'main' },
        { id: 'mb-chest-pass2', name: 'Med ball chest pass', sets: 4, reps: '5', category: 'plyo' },
        { id: 'db-press2', name: 'DB shoulder press', sets: 3, reps: '6', category: 'accessory' },
      ]},
      { name: 'Carry + Pull', exercises: [
        { id: 'heavy-farmer2', name: 'Heavy farmer carry', sets: 3, reps: '40 yd', category: 'accessory' },
        { id: 'cable-face-pull2', name: 'Cable face pull', sets: 3, reps: '15', category: 'accessory' },
      ]},
      { name: 'Core', exercises: [
        { id: 'pallof-rot', name: 'Pallof rotation', sets: 3, reps: '8/side', category: 'core' },
      ]},
    ],
  }
}

function p3_wed(w: number): Workout {
  return {
    id: `w${w + 8}d3`,
    week: w + 8,
    day: 3,
    phase: 3,
    type: 'REACTIVE Agility + Posterior Power',
    title: 'REACTIVE Agility + Posterior Chain Power',
    duration: '75 min',
    notes: ['THE MONEY DAY. Full-speed reactive cuts.'],
    blocks: [
      { name: 'Warm-up', duration: '10 min', exercises: [
        { id: 'dyn-warmup10', name: 'Dynamic warm-up', sets: 1, reps: '10 min', category: 'warmup' },
      ]},
      { name: 'Reactive Agility', duration: '25 min', exercises: [
        { id: 'mirror-drill', name: 'Mirror drill (partner leads)', sets: 4, reps: '10 sec', category: 'agility' },
        { id: 'color-cod', name: 'Color/number reaction COD', sets: 6, reps: '1', note: 'Partner calls direction last-second', category: 'agility' },
        { id: 'ball-drop', name: 'React to ball drop / hand signal cuts', sets: 6, reps: '1', category: 'agility' },
        { id: 'w-drill', name: 'W-drill with reactive cut', sets: 4, reps: '1', category: 'agility' },
        { id: 'pro-agility-full', name: 'Full-speed 5-10-5 and 3-cone', sets: 3, reps: '1 each', effort: '100%', category: 'agility' },
      ]},
      { name: 'Posterior Power', exercises: [
        { id: 'hang-clean2', name: 'Hang power clean', sets: 6, reps: '2', load: `${[175, 180, 185][w]} lbs (80%)`, category: 'main' },
        { id: 'trap-bar-speed', name: 'Trap bar deadlift (speed)', sets: 5, reps: '3', load: `${[245, 255, 265][w]} lbs (70%)`, note: 'Pull fast', category: 'main' },
        { id: 'hip-thrust-heavy', name: 'Hip thrust (heavy)', sets: 4, reps: '5', load: `${[245, 255, 265][w]} lbs`, category: 'main' },
        { id: 'nordic2', name: 'Nordic hamstring curl', sets: 4, reps: '5', note: 'STILL non-negotiable', category: 'main' },
        { id: 'sl-hip-thrust2', name: 'Single-leg hip thrust', sets: 3, reps: '6/leg', category: 'main' },
      ]},
      { name: 'Core', exercises: [
        { id: 'hollow-rock2', name: 'Hollow rock', sets: 3, reps: '12', category: 'core' },
      ]},
    ],
  }
}

function p3_thu(w: number): Workout {
  return { ...p1_thu(w), id: `w${w + 8}d4`, week: w + 8, phase: 3 }
}

function p3_fri(w: number): Workout {
  return {
    id: `w${w + 8}d5`,
    week: w + 8,
    day: 5,
    phase: 3,
    type: 'Max Velocity Speed + Power',
    title: 'Max Velocity Speed + Power',
    duration: '70 min',
    notes: ['Top-end speed day. Full recovery (3 min) between flying sprints.'],
    blocks: [
      { name: 'Warm-up', duration: '15 min', exercises: [
        { id: 'skip-warmup', name: 'Skip + dribble warm-up', sets: 2, reps: '20 yd each', category: 'warmup' },
      ]},
      { name: 'Max Velocity', duration: '25 min', exercises: [
        { id: 'build-up2', name: 'Build-ups', sets: 3, reps: '30 yd', category: 'speed' },
        { id: 'flying-30', name: 'Flying 30s', sets: 3, reps: '30 yd w/ 30 yd lead-in', effort: '100%', rest: '3 min', category: 'speed' },
        { id: 'flying-20-2', name: 'Flying 20s', sets: 3, reps: '20 yd', effort: '100%', rest: '3 min', category: 'speed' },
      ]},
      { name: 'Power', exercises: [
        { id: 'push-press-85', name: 'Push press', sets: 5, reps: '2', load: `${[185, 195, 205][w]} lbs (85%)`, category: 'main' },
        { id: 'box-jump-max', name: 'Box jump (max height)', sets: 4, reps: '3', category: 'plyo' },
        { id: 'db-bench-speed', name: 'DB bench (speed)', sets: 4, reps: '5', load: '65%', category: 'main' },
        { id: 'weighted-chinup3', name: 'Weighted chin-up', sets: 4, reps: '4', category: 'main' },
        { id: 'mb-scoop', name: 'Med ball rotational scoop toss', sets: 4, reps: '4/side', category: 'plyo' },
      ]},
      { name: 'Core', exercises: [
        { id: 'side-plank-reach2', name: 'Side plank reach', sets: 3, reps: '8/side', category: 'core' },
      ]},
    ],
  }
}

function p3_sat(_w: number): Workout {
  return {
    id: `w${_w + 8}d6`,
    week: _w + 8,
    day: 6,
    phase: 3,
    type: 'Football Conditioning + Skill',
    title: 'Football-Specific Conditioning + Position Skill',
    duration: '70 min',
    blocks: [
      { name: 'Warm-up', duration: '10 min', exercises: [
        { id: 'dyn-warmup11', name: 'Dynamic warm-up', sets: 1, reps: '10 min', category: 'warmup' },
      ]},
      { name: 'Conditioning — Alactic/Aerobic', exercises: [
        { id: 'half-gasser', name: 'Half-gasser', sets: 6, reps: '53 yd × 2 (down-back)', effort: ':15 work', rest: ':45', category: 'conditioning' },
      ]},
      { name: 'Position Skill (Reactive, Full Speed)', exercises: [
        { id: 'pedal-break-ball', name: 'Pedal-break to ball', sets: 8, reps: '1', category: 'position' },
        { id: 'hip-turn-run', name: 'Hip-turn and run', sets: 8, reps: '1', category: 'position' },
        { id: 'kick-return', name: 'Kick return footwork', sets: 10, reps: '1', note: 'Catch, plant, hit lane, sprint 20 yd', category: 'position' },
        { id: 'tackle-angles', name: 'Open-field tackling angles', sets: 1, reps: '10', note: 'No contact, chute or form-fit dummy', category: 'position' },
      ]},
    ],
  }
}

function p3_sun(w: number): Workout {
  return { ...p1_sun(w), id: `w${w + 8}d7`, week: w + 8, phase: 3 }
}

// =====================================================================
// PHASE 4 (Weeks 11-12) — Hand-defined per week
// =====================================================================

const week11Base: Workout[] = [
  {
    id: 'w11d1', week: 11, day: 1, phase: 4,
    type: 'TEST DAY A — Performance',
    title: 'Week 11 Re-Test: Performance Battery',
    duration: '90 min',
    notes: ['Re-test attempts: 40 yd, 10 yd split, vertical, broad, pro agility. Then light lift.'],
    blocks: [
      { name: 'Warm-up', duration: '20 min', exercises: [
        { id: 'test-warmup', name: 'Full dynamic warm-up + 3 build-ups', sets: 1, reps: '20 min', category: 'warmup' },
      ]},
      { name: 'TESTS — Log results in Testing tab', exercises: [
        { id: 'test-40', name: '40-yard dash', sets: 3, reps: '1', rest: 'full', note: 'Best of 3. Same starter, same surface, same shoes.', category: 'speed' },
        { id: 'test-10', name: '10-yard split (off 40)', sets: 1, reps: '1', category: 'speed' },
        { id: 'test-vert', name: 'Vertical jump', sets: 3, reps: '1', category: 'plyo' },
        { id: 'test-broad', name: 'Broad jump', sets: 3, reps: '1', category: 'plyo' },
        { id: 'test-pro', name: 'Pro agility 5-10-5', sets: 3, reps: '1 ea direction', category: 'agility' },
      ]},
      { name: 'Light Lift', exercises: [
        { id: 'bss-light', name: 'Bulgarian split squat', sets: 3, reps: '6/leg', category: 'main' },
        { id: 'weighted-chinup-light', name: 'Weighted chin-up', sets: 3, reps: '5', category: 'main' },
        { id: 'plyo-light', name: 'Easy plyo (pogo, low box jumps)', sets: 3, reps: '5', category: 'plyo' },
      ]},
    ],
  },
  {
    id: 'w11d2', week: 11, day: 2, phase: 4,
    type: 'TEST DAY B — Strength + Symmetry',
    title: 'Week 11 Re-Test: Strength + LSI',
    duration: '90 min',
    notes: ['Build up to 3RMs. Hop battery for LSI. ≥95% LSI gates full Phase 4.'],
    blocks: [
      { name: 'Warm-up', duration: '15 min', exercises: [
        { id: 'gen-bike5', name: 'Easy bike', sets: 1, reps: '5 min', category: 'warmup' },
        { id: 'dyn-warmup12', name: 'Dynamic warm-up', sets: 1, reps: '10 min', category: 'warmup' },
      ]},
      { name: 'Strength 3RMs — Log in Testing tab', exercises: [
        { id: 'test-fsq', name: 'Front squat 3RM', sets: 1, reps: '3', note: 'Open 235, 2nd 250, 3rd 260 (stretch 275)', category: 'main' },
        { id: 'test-trapbar', name: 'Trap bar deadlift 3RM', sets: 1, reps: '3', note: 'Open 345, 2nd 375, 3rd 395 (stretch 415)', category: 'main' },
        { id: 'test-bench', name: 'Bench press 3RM', sets: 1, reps: '3', note: 'Open 235, 2nd 255, 3rd 265', category: 'main' },
      ]},
      { name: 'Symmetry — Log L vs R in Testing tab', exercises: [
        { id: 'test-sl-hop', name: 'Single-leg hop for distance', sets: 3, reps: '1/leg', category: 'plyo' },
        { id: 'test-triple-hop', name: 'Triple hop for distance', sets: 3, reps: '1/leg', category: 'plyo' },
        { id: 'test-6m-hop', name: '6-meter timed hop', sets: 3, reps: '1/leg', category: 'plyo' },
      ]},
      { name: 'Body Comp', exercises: [
        { id: 'bw-bf', name: 'Bodyweight + BF', sets: 1, reps: '—', category: 'core' },
      ]},
    ],
  },
  p3_wed(2),
  p1_thu(0),
  p3_fri(2),
  p3_sat(2),
  p1_sun(0),
]

const week11: Workout[] = week11Base.map((w, i) => ({ ...w, id: `w11d${i + 1}`, week: 11, day: (i + 1) as DayOfWeek, phase: 4 }))

const week12: Workout[] = [
  {
    id: 'w12d1', week: 12, day: 1, phase: 4,
    type: 'Speed + Light Lower',
    title: 'Taper Mon — Speed + Light Lower',
    duration: '50 min',
    blocks: [
      { name: 'Warm-up', duration: '10 min', exercises: [
        { id: 'dyn-warmup13', name: 'Dynamic warm-up', sets: 1, reps: '10 min', category: 'warmup' },
      ]},
      { name: 'Speed', exercises: [
        { id: '10yd-starts', name: '10-yd starts', sets: 5, reps: '10 yd', effort: '100%', rest: 'full', category: 'speed' },
      ]},
      { name: 'Lift', exercises: [
        { id: 'trap-bar-light', name: 'Trap bar deadlift', sets: 3, reps: '3', load: '275 lbs', category: 'main' },
        { id: 'bss-taper', name: 'Bulgarian split squat', sets: 3, reps: '5/leg', category: 'main' },
        { id: 'nordic-taper', name: 'Nordic hamstring curl', sets: 2, reps: '5', category: 'main' },
      ]},
    ],
  },
  {
    id: 'w12d2', week: 12, day: 2, phase: 4,
    type: 'Mobility + Z2',
    title: 'Taper Tue — Mobility + Easy Aerobic',
    duration: '40 min',
    blocks: [
      { name: 'Mobility', duration: '20 min', exercises: [
        { id: 'mobility-flow2', name: 'Mobility flow', sets: 1, reps: '20 min', category: 'mobility' },
      ]},
      { name: 'Aerobic', duration: '20 min', exercises: [
        { id: 'z2-light', name: 'Easy Z2', sets: 1, reps: '20 min', category: 'conditioning' },
      ]},
    ],
  },
  {
    id: 'w12d3', week: 12, day: 3, phase: 4,
    type: 'Reactive + Hamstring',
    title: 'Taper Wed — Flying 20s + Reactive Agility (Light)',
    duration: '45 min',
    blocks: [
      { name: 'Warm-up', duration: '10 min', exercises: [
        { id: 'dyn-warmup14', name: 'Dynamic warm-up', sets: 1, reps: '10 min', category: 'warmup' },
      ]},
      { name: 'Speed', exercises: [
        { id: 'flying-20-taper', name: 'Flying 20s', sets: 3, reps: '20 yd', effort: '100%', rest: 'full', category: 'speed' },
      ]},
      { name: 'Reactive Agility (Low Volume)', duration: '15 min', exercises: [
        { id: 'reactive-light', name: 'Mirror drill + color-cue cuts', sets: 4, reps: '8 sec', category: 'agility' },
      ]},
      { name: 'Hamstring', exercises: [
        { id: 'nordic-taper2', name: 'Nordic hamstring curl', sets: 2, reps: '5', category: 'main' },
      ]},
    ],
  },
  {
    id: 'w12d4', week: 12, day: 4, phase: 4,
    type: 'Upper Tune-up',
    title: 'Taper Thu — Upper Tune-Up',
    duration: '40 min',
    blocks: [
      { name: 'Warm-up', duration: '10 min', exercises: [
        { id: 'upper-warmup4', name: 'Banded shoulder + scap', sets: 1, reps: '10 min', category: 'warmup' },
      ]},
      { name: 'Lift', exercises: [
        { id: 'bench-taper', name: 'Bench press', sets: 3, reps: '3', load: '235 lbs', category: 'main' },
        { id: 'pullup-taper', name: 'Pull-up', sets: 3, reps: '5', category: 'main' },
        { id: 'push-press-taper', name: 'Push press', sets: 3, reps: '3', load: '165 lbs', category: 'main' },
        { id: 'mb-taper', name: 'Med ball throw', sets: 3, reps: '5', category: 'plyo' },
      ]},
    ],
  },
  {
    id: 'w12d5', week: 12, day: 5, phase: 4,
    type: 'Speed Tune-up',
    title: 'Taper Fri — Speed Tune-Up',
    duration: '35 min',
    blocks: [
      { name: 'Warm-up', duration: '15 min', exercises: [
        { id: 'skip-warmup2', name: 'Skip drills', sets: 1, reps: '15 min', category: 'warmup' },
      ]},
      { name: 'Speed (Low Volume, Max Intent)', exercises: [
        { id: 'flying-10-taper', name: 'Flying 10s', sets: 2, reps: '10 yd', effort: '100%', rest: 'full', category: 'speed' },
        { id: 'flying-20-taper2', name: 'Flying 20s', sets: 2, reps: '20 yd', effort: '100%', rest: 'full', category: 'speed' },
      ]},
    ],
  },
  {
    id: 'w12d6', week: 12, day: 6, phase: 4,
    type: 'Light Position',
    title: 'Taper Sat — Light Position Work',
    duration: '20 min',
    notes: ['Visualization. Catch reps. No conditioning. No fatigue.'],
    blocks: [
      { name: 'Position', exercises: [
        { id: 'position-light', name: 'Backpedal + break + catch', sets: 1, reps: '20 min', effort: 'easy', category: 'position' },
      ]},
    ],
  },
  {
    id: 'w12d7', week: 12, day: 7, phase: 4,
    type: 'OFF',
    title: 'Pre-Camp OFF Day',
    duration: '—',
    rest: true,
    blocks: [],
    notes: ['Sleep 9–10 hrs. Hydrate. Pack the bag. Report Aug 11 ready.'],
  },
]

const TEMPLATES: Record<number, ((w: number) => Workout)[]> = {
  1: [p1_mon, p1_tue, p1_wed, p1_thu, p1_fri, p1_sat, p1_sun],
  2: [p2_mon, p2_tue, p2_wed, p2_thu, p2_fri, p2_sat, p2_sun],
  3: [p3_mon, p3_tue, p3_wed, p3_thu, p3_fri, p3_sat, p3_sun],
}

export function getWorkout(week: number, day: DayOfWeek): Workout {
  if (week === 11) return week11[day - 1]!
  if (week === 12) return week12[day - 1]!
  const phase = getPhase(week)
  const wIdx = weekInPhase(week)
  return TEMPLATES[phase]![day - 1]!(wIdx)
}

export function getAllWorkouts(): Workout[] {
  const all: Workout[] = []
  for (let week = 1; week <= 12; week++) {
    for (let day = 1; day <= 7; day++) {
      all.push(getWorkout(week, day as DayOfWeek))
    }
  }
  return all
}
