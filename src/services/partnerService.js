import { getMotherVitals, getLatestMood, calculateRisk } from './motherService'

export async function getPartnerData(motherId) {
  const { data: vitals } = await getMotherVitals(motherId)
  const { data: moodData } = await getLatestMood(motherId)

  const risk = calculateRisk(vitals || [])

  return {
    vitals: vitals || [],
    mood: moodData?.[0]?.mood || null,
    risk
  }
}