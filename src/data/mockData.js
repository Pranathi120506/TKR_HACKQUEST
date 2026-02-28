// ══════════════════════════════════════════
// MOCK USER DATA
// ═══════════════════════════════════════

export const USERS = {
  mother: [
    { email: 'mother@demo.in', password: 'care1000', name: 'Priya Sharma' },
  ],
  doctor: [
    { id: 'DR-2024-001', email: 'doctor@demo.in', password: 'medic1000', name: 'Dr. Meera Nair' },
  ],
  partner: [
    { email: 'partner@demo.in', password: 'partner123', name: 'Rahul Sharma' },
  ],
}

// ══════════════════════════════════════════
// PATIENT DATA (for Doctor dashboard)
// ══════════════════════════════════════════

export const PATIENTS = [
  {
    id: 'PT-001',
    name: 'Priya Sharma',
    age: 28,
    weeks: 24,
    risk: 'High',
    bp: '140/90',
    weight: '68kg',
    nextAppt: 'Today 3:00 PM',
    status: 'Critical',
    phone: '+91 98765 43210',
    tags: ['Hypertension', 'GDM'],
    notes:
      'Patient reported mild headaches over the past 3 days. BP trending upward. Recommended sodium restriction and increased monitoring frequency. Follow-up scheduled.',
  },
  {
    id: 'PT-002',
    name: 'Meena Pillai',
    age: 25,
    weeks: 16,
    risk: 'Low',
    bp: '118/76',
    weight: '58kg',
    nextAppt: 'Mar 2, 10:00 AM',
    status: 'Stable',
    phone: '+91 87654 32109',
    tags: ['Normal'],
    notes: 'Routine antenatal visit. No concerns. Growth tracking on schedule.',
  },
  {
    id: 'PT-003',
    name: 'Sunita Rao',
    age: 32,
    weeks: 36,
    risk: 'Medium',
    bp: '128/84',
    weight: '74kg',
    nextAppt: 'Mar 1, 2:30 PM',
    status: 'Watch',
    phone: '+91 76543 21098',
    tags: ['Overweight', 'Anaemia'],
    notes: 'Haemoglobin 9.8. Iron supplementation started. Weight gain above recommended range.',
  },
  {
    id: 'PT-004',
    name: 'Kavitha Nair',
    age: 30,
    weeks: 8,
    risk: 'Low',
    bp: '115/72',
    weight: '55kg',
    nextAppt: 'Mar 5, 11:00 AM',
    status: 'Stable',
    phone: '+91 65432 10987',
    tags: ['First Trimester'],
    notes: 'Early pregnancy. Nausea reported. Folic acid and vitamin D prescribed.',
  },
  {
    id: 'PT-005',
    name: 'Ananya Das',
    age: 27,
    weeks: 28,
    risk: 'Medium',
    bp: '132/86',
    weight: '71kg',
    nextAppt: 'Mar 3, 9:00 AM',
    status: 'Watch',
    phone: '+91 54321 09876',
    tags: ['Pre-eclampsia risk'],
    notes:
      'Protein in urine detected. BP borderline. Pre-eclampsia risk elevated — monitoring twice weekly.',
  },
  {
    id: 'PT-006',
    name: 'Rekha Joshi',
    age: 35,
    weeks: 20,
    risk: 'High',
    bp: '145/92',
    weight: '80kg',
    nextAppt: 'Today 5:00 PM',
    status: 'Critical',
    phone: '+91 43210 98765',
    tags: ['Advanced Age', 'Hypertension'],
    notes:
      'Advanced maternal age with persistent hypertension. Antihypertensives prescribed. Weekly monitoring essential.',
  },
]

// ══════════════════════════════════════════
// MOTHER HEALTH DATA (for Mother dashboard)
// ══════════════════════════════════════════

export const MOTHER_VITALS = [
  { name: 'Blood Pressure', value: '118/76', status: 'normal', label: 'Normal' },
  { name: 'Weight', value: '67 kg', status: 'watch', label: '+0.5kg' },
  { name: 'Blood Sugar', value: '98 mg/dL', status: 'normal', label: 'Normal' },
  { name: 'Heart Rate', value: '82 bpm', status: 'normal', label: 'Normal' },
  { name: 'Haemoglobin', value: '10.8 g/dL', status: 'warning', label: 'Low' },
]

export const MOTHER_APPOINTMENTS = [
  {
    title: 'Routine Antenatal Check',
    doctor: 'Dr. Meera Nair · Apollo Hospitals',
    time: 'Today 3:00 PM',
    color: '#E07A94',
    isToday: true,
  },
  {
    title: 'Anomaly Ultrasound Scan',
    doctor: 'Dr. Suresh Kumar · Radiology Dept',
    time: 'Mar 3, 11:00 AM',
    color: '#9B7ED9',
    isToday: false,
  },
  {
    title: 'Nutrition Counselling',
    doctor: 'Dietician Prerna · Teleconsult',
    time: 'Mar 5, 2:00 PM',
    color: '#5DAE7A',
    isToday: false,
  },
  {
    title: 'OGTT Blood Test',
    doctor: 'Pathology Lab · Fasting required',
    time: 'Mar 7, 8:00 AM',
    color: '#F7C59F',
    isToday: false,
  },
]

export const PARTNER_TASKS = [
  { id: 1, text: 'Remind Priya to take prenatal vitamins', done: true },
  { id: 2, text: 'Prepare iron-rich meal (spinach dal / palak paneer)', done: false },
  { id: 3, text: 'Drive Priya to Today 3:00 PM appointment', done: false },
  { id: 4, text: 'Ensure Priya rests for at least 2 hours post-lunch', done: false },
  { id: 5, text: 'Evening walk together (15–20 mins gentle pace)', done: false },
  { id: 6, text: "Log Priya's dinner meal in the health app", done: false },
]

export const PARTNER_NUTRITION = [
  { food: '🌿 Spinach / Palak', nutrient: 'Iron', color: '#5DAE7A', bg: 'rgba(93,174,122,0.1)' },
  { food: '🍊 Citrus Fruits', nutrient: 'Vitamin C', color: '#3A9BD5', bg: 'rgba(58,155,213,0.1)' },
  { food: '🥛 Milk / Curd', nutrient: 'Calcium', color: '#C5B4E3', bg: 'rgba(197,180,227,0.1)' },
  { food: '🫘 Dal / Lentils', nutrient: 'Protein', color: '#F7C59F', bg: 'rgba(247,197,159,0.1)' },
  { food: '🥚 Eggs', nutrient: 'Protein + DHA', color: '#F7C59F', bg: 'rgba(247,197,159,0.1)' },
]
