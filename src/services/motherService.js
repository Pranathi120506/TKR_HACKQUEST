import { MOTHER_VITALS, MOTHER_APPOINTMENTS } from '../data/mockData'

// Temporary local array to hold logged vitals and moods
let localVitals = [...MOTHER_VITALS]
let localMoods = []

export async function getMotherVitals(motherId) {
  return { data: localVitals, error: null }
}

export async function insertVital(vital) {
  localVitals.unshift({ ...vital, id: Date.now().toString(), created_at: new Date().toISOString() })
  return { data: null, error: null }
}

export async function getMotherAppointments(motherId) {
  return { data: MOTHER_APPOINTMENTS, error: null }
}

export async function insertMood(mood) {
  localMoods.unshift({ ...mood, id: Date.now().toString(), created_at: new Date().toISOString() })
  return { data: null, error: null }
}

export async function getLatestMood(motherId) {
  const latest = localMoods.length > 0 ? [localMoods[0]] : []
  return { data: latest, error: null }
}

/* 🧠 Simple Risk Engine */
export function calculateRisk(vitals) {
  let riskScore = 0

  vitals.forEach(v => {
    if (v.status === 'warning') riskScore += 2
    if (v.status === 'watch') riskScore += 1
  })

  if (riskScore >= 4) return 'High'
  if (riskScore >= 2) return 'Medium'
  return 'Low'
}