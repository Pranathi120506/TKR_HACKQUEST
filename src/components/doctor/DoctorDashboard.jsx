import { useEffect, useState } from 'react'
import DoctorSidebar from './DoctorSidebar.jsx'
import PatientList from './PatientList.jsx'
import PatientModal from './PatientModal.jsx'
import TodayAppointments from './TodayAppointments.jsx'
import RiskAlerts from './RiskAlerts.jsx'
import AddPatientModal from './AddPatientModal.jsx'
import { getPatientsByDoctor } from '../../services/patientService'

export default function DoctorDashboard({ user, onLogout }) {
  const [filter, setFilter] = useState('all')
  const [selectedPatient, setSelected] = useState(null)
  const [showAddModal, setShowAddModal] = useState(false)
  const [patients, setPatients] = useState([])
  const [loading, setLoading] = useState(true)

  const now = new Date()
  const dateStr = now.toLocaleDateString('en-IN', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  // 🔥 Fetch patients
  async function loadPatients() {
    const { data, error } = await getPatientsByDoctor(user.id)
    if (!error && data) {
      setPatients(data)
    }
    setLoading(false)
  }

  useEffect(() => {
    if (user?.id) {
      loadPatients()
    }
  }, [user])

  function handlePatientAdded() {
    setShowAddModal(false)
    loadPatients()
  }

  // 🔍 Filtering
  const filteredPatients = patients.filter((p) => {
    if (filter === 'critical') return p.risk === 'High'
    if (filter === 'today') return p.next_appt?.includes('Today')
    if (filter === 'stable') return p.risk === 'Low'
    return true
  })

  const todayPatients = patients.filter((p) =>
    p.next_appt?.includes('Today')
  )

  // 📊 Dynamic Stats
  const totalPatients = patients.length
  const highRisk = patients.filter((p) => p.risk === 'High').length
  const stable = patients.filter((p) => p.risk === 'Low').length
  const todayCount = todayPatients.length

  const STATS = [
    { val: totalPatients, label: 'Total Patients' },
    { val: todayCount, label: "Today's Appts" },
    { val: highRisk, label: 'High Risk' },
    { val: stable, label: 'Stable' },
  ]

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#0F1520', fontFamily: 'DM Sans, sans-serif' }}>
      <DoctorSidebar name={user.name} onLogout={onLogout} />

      <main style={{ marginLeft: 260, padding: 32, minHeight: '100vh', flex: 1 }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 32 }}>
          <div>
            <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '2rem', fontWeight: 300, color: 'white' }}>
              Patient <em style={{ color: '#3A9BD5', fontStyle: 'italic' }}>Overview</em>
            </h1>
            <div style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)', marginTop: 4 }}>
              {dateStr}
            </div>
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            style={{
              background: 'rgba(58,155,213,0.15)',
              border: '1px solid rgba(58,155,213,0.3)',
              color: '#3A9BD5',
              borderRadius: 10,
              padding: '10px 18px',
              fontSize: '0.8rem',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            + Add Patient
          </button>
        </div>

        {/* Stats Row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 16, marginBottom: 28 }}>
          {STATS.map((s) => (
            <div
              key={s.label}
              style={{
                background: '#161D2E',
                border: '1px solid rgba(255,255,255,0.06)',
                borderRadius: 16,
                padding: 20,
              }}
            >
              <div
                style={{
                  fontSize: '2rem',
                  fontWeight: 700,
                  color: 'white',
                  fontFamily: 'Space Mono, monospace',
                }}
              >
                {s.val}
              </div>
              <div
                style={{
                  fontSize: '0.75rem',
                  color: 'rgba(255,255,255,0.4)',
                  marginTop: 4,
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                }}
              >
                {s.label}
              </div>
            </div>
          ))}
        </div>

        {/* Loading State */}
        {loading && <p style={{ color: 'white' }}>Loading patients...</p>}

        {/* Main Grid */}
        {!loading && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: 20 }}>
            <PatientList
              patients={filteredPatients}
              filter={filter}
              onFilterChange={setFilter}
              onSelectPatient={setSelected}
            />

            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              <TodayAppointments patients={todayPatients} />
              <RiskAlerts patients={patients} />
            </div>
          </div>
        )}
      </main>

      {/* Patient Modal */}
      {selectedPatient && (
        <PatientModal
          patient={selectedPatient}
          onClose={() => setSelected(null)}
        />
      )}
      {/* Add Patient Modal */}
      {showAddModal && (
        <AddPatientModal
          onClose={() => setShowAddModal(false)}
          onSucceed={handlePatientAdded}
        />
      )}
    </div>
  )
}