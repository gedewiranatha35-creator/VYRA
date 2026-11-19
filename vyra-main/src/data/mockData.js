export const INITIAL_TREND = [
  { time: '10:00', bpm: 72 },
  { time: '10:05', bpm: 77 },
  { time: '10:10', bpm: 82 },
  { time: '10:15', bpm: 76 },
  { time: '10:20', bpm: 84 },
  { time: '10:25', bpm: 78 },
];

export const SAVED_DATES = [
  {
    id: '2026-08-19',
    dayNum: '19',
    dateLabel: '19 August 2026',
    weekday: 'Wednesday',
    month: 'August 2026',
    tone: 'blue',
    records: [
      { id: 'r1', time: '10:25 AM', bpm: 78, status: 'Normal', condition: 'Resting', notes: 'Stable resting heart rate within typical adult range' },
      { id: 'r2', time: '08:12 AM', bpm: 72, status: 'Normal', condition: 'Morning Check', notes: 'Calm morning baseline pulse' },
      { id: 'r3', time: '07:30 AM', bpm: 84, status: 'Normal', condition: 'Post-Walk', notes: 'Light morning walk recovery' },
    ],
  },
  {
    id: '2026-08-18',
    dayNum: '18',
    dateLabel: '18 August 2026',
    weekday: 'Tuesday',
    month: 'August 2026',
    tone: 'green',
    records: [
      { id: 'r4', time: '09:15 AM', bpm: 74, status: 'Normal', condition: 'Morning Check', notes: 'Consistent morning baseline' },
      { id: 'r5', time: '06:40 PM', bpm: 80, status: 'Normal', condition: 'Evening Rest', notes: 'Steady evening pulse' },
    ],
  },
  {
    id: '2026-08-17',
    dayNum: '17',
    dateLabel: '17 August 2026',
    weekday: 'Monday',
    month: 'August 2026',
    tone: 'purple',
    records: [
      { id: 'r6', time: '08:05 AM', bpm: 75, status: 'Normal', condition: 'Resting', notes: 'Well-rested morning reading' },
      { id: 'r7', time: '01:20 PM', bpm: 83, status: 'Normal', condition: 'Desk Work', notes: 'Normal afternoon pulse' },
      { id: 'r8', time: '05:40 PM', bpm: 104, status: 'High', condition: 'Post-Exercise', notes: 'Elevated reading after light jogging' },
      { id: 'r9', time: '09:10 PM', bpm: 71, status: 'Normal', condition: 'Evening Rest', notes: 'Recovered smoothly' },
    ],
  },
  {
    id: '2026-08-16',
    dayNum: '16',
    dateLabel: '16 August 2026',
    weekday: 'Sunday',
    month: 'August 2026',
    tone: 'amber',
    records: [
      { id: 'r10', time: '06:30 AM', bpm: 58, status: 'Low', condition: 'Deep Rest', notes: 'Slightly below 60 BPM upon waking' },
      { id: 'r11', time: '11:00 AM', bpm: 77, status: 'Normal', condition: 'Resting', notes: 'Normal midday baseline' },
    ],
  },
  {
    id: '2026-08-15',
    dayNum: '15',
    dateLabel: '15 August 2026',
    weekday: 'Saturday',
    month: 'August 2026',
    tone: 'rose',
    records: [
      { id: 'r12', time: '09:00 AM', bpm: 76, status: 'Normal', condition: 'Resting', notes: 'Optimal resting pulse' },
      { id: 'r13', time: '08:15 PM', bpm: 79, status: 'Normal', condition: 'Evening Rest', notes: 'Steady evening heart rate' },
    ],
  },
];

export const PDF_TABLE_ROWS = [
  { date: '18 Aug 2026', time: '10:25 AM', hr: '78 BPM', range: '72 – 84 BPM', condition: 'Resting', status: 'Normal', notes: 'Stable resting heart rate within typical adult range' },
  { date: '17 Aug 2026', time: '08:15 AM', hr: '74 BPM', range: '68 – 80 BPM', condition: 'Morning Check', status: 'Normal', notes: 'Consistent morning baseline; regular pulse rhythm' },
  { date: '16 Aug 2026', time: '05:40 PM', hr: '104 BPM', range: '88 – 104 BPM', condition: 'Post-Exercise', status: 'High', notes: 'Elevated reading after light jogging; recovered in 10 min' },
  { date: '15 Aug 2026', time: '06:30 AM', hr: '58 BPM', range: '58 – 64 BPM', condition: 'Deep Rest', status: 'Low', notes: 'Slightly below 60 BPM upon waking; monitor if symptomatic' },
  { date: '14 Aug 2026', time: '01:10 PM', hr: '82 BPM', range: '76 – 86 BPM', condition: 'Desk Work', status: 'Normal', notes: 'Normal afternoon reading with low variability' },
  { date: '13 Aug 2026', time: '09:05 AM', hr: '76 BPM', range: '70 – 81 BPM', condition: 'Resting', status: 'Normal', notes: 'Optimal resting pulse; well-hydrated baseline' },
  { date: '12 Aug 2026', time: '07:50 PM', hr: '80 BPM', range: '74 – 85 BPM', condition: 'Evening Rest', status: 'Normal', notes: 'Steady evening heart rate prior to sleep routine' },
];
