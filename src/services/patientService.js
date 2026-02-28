import { PATIENTS } from '../data/mockData'

// Temporary local array to hold newly added patients
let localPatients = [...PATIENTS]

export async function getPatientsByDoctor(doctorId) {
  return { data: localPatients, error: null }
}

export async function insertPatient(patient) {
  const newPatient = {
    ...patient,
    id: `PT-${Math.floor(Math.random() * 9000).toString().padStart(4, '0')}`,
    tags: patient.tags || ['New Patient']
  }
  localPatients.unshift(newPatient)
  return { data: [newPatient], error: null }
}