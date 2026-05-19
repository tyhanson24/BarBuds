export const ACL_NON_NEGOTIABLES: { title: string; rules: string[] } = {
  title: 'ACL Non-Negotiables',
  rules: [
    'Surgical leg (LEFT) goes FIRST on every unilateral exercise.',
    'Nordic hamstring curl is non-negotiable. Every week. No exceptions.',
    'Reactive agility is GATED — only at full speed once LSI ≥ 85% (Week 7 test).',
    'Knee pain over 3/10 during a session → stop the exercise, log it, message Dad.',
    'No deep loaded squats below parallel until LSI ≥ 90%.',
    'Decel before re-accel: own the stop before owning the cut.',
    '≥ 95% LSI by Week 11 retest is the gate for Phase 4.',
    'Sleep 8+ hours. Protein ≥ 1g/lb bodyweight. Hydrate.',
  ],
}

export const WARMUP_FLOW: { title: string; steps: { name: string; reps: string }[] } = {
  title: '10-Minute Dynamic Warm-Up',
  steps: [
    { name: 'World\'s greatest stretch', reps: '4/side' },
    { name: 'Hip openers (90/90)', reps: '5/side' },
    { name: 'Spider-Man lunge + rotation', reps: '4/side' },
    { name: 'Ankle rocks (knee-to-wall)', reps: '8/side' },
    { name: 'Glute bridge march', reps: '10/side' },
    { name: 'Band lateral walk', reps: '10/side' },
    { name: 'Band monster walk', reps: '10 steps fwd + bwd' },
    { name: 'Pogo hops (low)', reps: '20' },
    { name: 'A-skip', reps: '20 yd' },
    { name: 'High-knee run-out', reps: '20 yd' },
    { name: 'Build-up to 70%', reps: '20 yd' },
  ],
}

export const FORM_CUES: { exercise: string; cues: string[] }[] = [
  {
    exercise: 'Nordic Hamstring Curl',
    cues: [
      'Partner pins ankles or use band-assist anchored overhead.',
      'Knees on pad. Body in straight line from knee to shoulder.',
      '5-second eccentric — lower as slowly as possible.',
      'Catch with hands when you lose control. NEVER let the chest slam.',
      'Push back to start with hands; the up phase is not the work.',
    ],
  },
  {
    exercise: 'Copenhagen Plank',
    cues: [
      'Top leg on bench, ankle/foot supported.',
      'Bottom leg suspended underneath.',
      'Drive heel into bench; hip rises off ground.',
      'Square hips to floor — no rotating.',
      'Build from 10s holds to 30s/side over Phase 1.',
    ],
  },
  {
    exercise: 'Bulgarian Split Squat (RFE)',
    cues: [
      'Front foot far enough that knee tracks over mid-foot, not way past toes.',
      'Surgical (LEFT) leg first every set.',
      'Torso slightly forward, not vertical.',
      'Drive through full foot — heel + mid + ball.',
      'Knee tracks over second toe; no caving in.',
    ],
  },
  {
    exercise: 'Hang Power Clean',
    cues: [
      'Bar at upper-thigh. Lats packed. Soft knees.',
      'Triple extension: ankle, knee, hip — explosive.',
      'Shrug and pull elbows high, then fast under.',
      'Catch in shallow front-rack, elbows up.',
      'If form breaks, drop weight. Speed beats load on this lift.',
    ],
  },
]

export const TESTING_INSTRUCTIONS: { test: string; how: string }[] = [
  {
    test: '40-yard dash',
    how: 'Hand-timed off first movement, 3 attempts, full rest. Take best. Same surface, shoes, starter both Week 1 and Week 11. Record the 10-yd split separately.',
  },
  {
    test: 'Vertical jump',
    how: 'Standing reach first (chalk hand, touch wall flat-footed). Then jump and touch — height jumped = top touch minus standing reach. 3 attempts.',
  },
  {
    test: 'Broad jump',
    how: 'Two-foot start, two-foot land, must stick (no hop after landing). Measure from start line to nearest heel. 3 attempts.',
  },
  {
    test: 'Pro agility 5-10-5',
    how: 'Start straddling center cone. Sprint 5 yd one way, plant + sprint 10 yd the other, plant + sprint 5 yd through start. Best of each direction.',
  },
  {
    test: 'Single-leg hop battery (LSI)',
    how: 'Single hop for distance: max single hop, 2-foot land. Triple hop: 3 consecutive hops on same leg. 6-meter timed hop: time how long to cover 6 m on one leg. ALWAYS non-surgical first then surgical. LSI = (L / R) × 100. ≥95% is the gate.',
  },
]

export const COMING_SOON_TESTS: { test: string; when: string }[] = [
  { test: 'Week 1 baseline', when: 'Run on Day 1 (Mon) + Day 2 (Tue) of Week 1.' },
  { test: 'Week 7 mid-cycle hop test', when: 'Wed of Week 7. LSI gate for Phase 3.' },
  { test: 'Week 11 full re-test', when: 'Mon + Tue of Week 11. LSI ≥ 95% gates full Phase 4.' },
]
