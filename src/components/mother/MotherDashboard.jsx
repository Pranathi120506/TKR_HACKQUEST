import { useState, useEffect } from 'react'
import {
  getMotherVitals,
  getMotherAppointments,
  insertVital,
  insertMood,
  calculateRisk
} from '../../services/motherService'
import AIChatbot from './AIChatbot'
import { useLanguage } from '../../contexts/LanguageContext'

const MOODS = ['😊 Good', '😴 Tired', '🤢 Nauseous', '😰 Anxious', '🤕 Pain']

const STATUS_COLORS = {
  normal: { bg: 'rgba(93,174,122,0.1)', color: '#5DAE7A' },
  warning: { bg: 'rgba(232,84,84,0.1)', color: '#E85454' },
  watch: { bg: 'rgba(247,197,159,0.12)', color: '#E8963A' }
}

export default function MotherDashboard({ user, onLogout }) {
  const [vitals, setVitals] = useState([])
  const [appointments, setAppointments] = useState([])
  const [selectedMood, setSelectedMood] = useState(null)
  const [risk, setRisk] = useState('Low Risk')
  const [newVital, setNewVital] = useState({ name: '', value: '' })
  const { lang, setLang, t } = useLanguage()

  // New features state
  const [kicks, setKicks] = useState(0)
  const [hydration, setHydration] = useState(0)
  const [phase, setPhase] = useState('pregnancy') // 'pregnancy' or 'toddler'

  const firstName = user?.name?.split(' ')[0] || ''
  const weeks = user?.weeks || 24 // Mock current gestation week

  /* ===========================
     LOAD DATA
  =========================== */
  useEffect(() => {
    async function loadData() {
      if (!user?.id) return

      const { data: vitalsData } = await getMotherVitals(user.id)
      const { data: appointmentData } = await getMotherAppointments(user.id)

      if (vitalsData) {
        setVitals(vitalsData)
        setRisk(calculateRisk(vitalsData) + ' Risk')
      }

      if (appointmentData) {
        setAppointments(appointmentData)
      }
    }

    loadData()
  }, [user])

  /* ===========================
     ADD VITAL
  =========================== */
  async function handleAddVital() {
    if (!newVital.name || !newVital.value) return

    const vitalData = {
      mother_id: user.id,
      name: newVital.name,
      value: newVital.value,
      status: 'normal',
      label: 'Logged'
    }

    await insertVital(vitalData)

    const { data } = await getMotherVitals(user.id)

    if (data) {
      setVitals(data)
      setRisk(calculateRisk(data) + ' Risk')
    }

    setNewVital({ name: '', value: '' })
  }

  /* ===========================
     MOOD SAVE
  =========================== */
  async function handleMoodSelect(mood) {
    setSelectedMood(mood)

    await insertMood({
      mother_id: user.id,
      mood
    })
  }

  /* ===========================
     UI
  =========================== */
  return (
    <div style={{ minHeight: '100vh', background: '#FDF8F2', fontFamily: 'DM Sans, sans-serif' }}>

      {/* HEADER */}
      <header style={{
        background: 'white',
        padding: '0 40px',
        height: 68,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottom: '1px solid rgba(0,0,0,0.05)'
      }}>
        <div style={{ fontSize: 20, fontWeight: 600, color: '#E07A94' }}>
          🌸 Bloom
        </div>

        <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>

          {/* Phase Toggle */}
          <div style={{
            display: 'flex',
            background: 'rgba(0,0,0,0.03)',
            borderRadius: 20,
            padding: 4,
            border: '1px solid rgba(0,0,0,0.05)'
          }}>
            <button
              onClick={() => setPhase('pregnancy')}
              style={{
                background: phase === 'pregnancy' ? '#E07A94' : 'transparent',
                color: phase === 'pregnancy' ? 'white' : '#666',
                border: 'none', borderRadius: 16, padding: '4px 16px',
                fontWeight: 600, fontSize: '0.85rem', cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              🤰 {t("Pregnancy")}
            </button>
            <button
              onClick={() => setPhase('toddler')}
              style={{
                background: phase === 'toddler' ? '#3A9BD5' : 'transparent',
                color: phase === 'toddler' ? 'white' : '#666',
                border: 'none', borderRadius: 16, padding: '4px 16px',
                fontWeight: 600, fontSize: '0.85rem', cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              👶 {t("Toddler")}
            </button>
          </div>

          {/* Language Toggle */}
          <button
            onClick={() => setLang(lang === 'en' ? 'te' : 'en')}
            style={{
              background: 'rgba(224,122,148,0.1)',
              color: '#E07A94',
              border: '1px solid rgba(224,122,148,0.3)',
              borderRadius: 20,
              padding: '6px 12px',
              cursor: 'pointer',
              fontWeight: 600,
              fontSize: '0.85rem'
            }}
          >
            {lang === 'en' ? '🌐 Language: EN' : '🌐 భాష: TE'}
          </button>

          <button
            onClick={onLogout}
            style={{
              border: '1px solid rgba(0,0,0,0.1)',
              padding: '8px 16px',
              borderRadius: 20,
              background: 'white',
              cursor: 'pointer'
            }}
          >
            {t("Sign Out")}
          </button>
        </div>
      </header>

      <div style={{ padding: 40 }}>

        <h2 style={{ marginBottom: 30 }}>
          {t("Good Morning")}, {firstName} 🌸
        </h2>

        {/* ================= PREGNANCY PHASE UI ================= */}
        {phase === 'pregnancy' && (
          <>
            {/* GESTATION TRACKER */}
            <Card title={`⏳ ${t("Gestation Journey")}`}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, fontSize: '0.9rem' }}>
                <span>{t("Current Week")}: <strong>{weeks}</strong></span>
                <span>{t("Trimester")}: <strong>{weeks < 13 ? 1 : weeks < 27 ? 2 : 3}</strong></span>
              </div>
              <div style={{ width: '100%', height: 12, background: '#eee', borderRadius: 6, overflow: 'hidden' }}>
                <div style={{
                  width: `${(weeks / 40) * 100}%`,
                  height: '100%',
                  background: 'linear-gradient(90deg, #E07A94, #9B7ED9)',
                  borderRadius: 6,
                  transition: 'width 0.5s ease-out'
                }} />
              </div>
              <div style={{ textAlign: 'center', marginTop: 10, fontSize: '0.8rem', color: '#666' }}>
                {weeks} / 40 {t("Weeks")}
              </div>
            </Card>

            {/* RISK */}
            <Card title={`🧠 ${t("Risk Level")}`}>
              <div style={{
                fontSize: 20,
                fontWeight: 600,
                color:
                  risk === 'High Risk' ? '#E85454' :
                    risk === 'Medium Risk' ? '#E8963A' :
                      '#5DAE7A'
              }}>
                {t(risk)}
              </div>
            </Card>

            {/* DAILY TRACKERS */}
            <div style={{ display: 'flex', gap: 24, marginBottom: 24 }}>
              <div style={{ flex: 1 }}>
                <Card title={`👶 ${t("Kick Counter")}`}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#E07A94' }}>{kicks} {t("Kicks")}</span>
                    <button
                      onClick={() => setKicks(k => k + 1)}
                      style={{
                        background: '#E07A94', color: 'white', border: 'none',
                        width: 40, height: 40, borderRadius: '50%', fontSize: '1.2rem',
                        cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                        boxShadow: '0 4px 12px rgba(224,122,148,0.3)'
                      }}
                    >
                      +
                    </button>
                  </div>
                </Card>
              </div>
              <div style={{ flex: 1 }}>
                <Card title={`💧 ${t("Hydration")}`}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#3A9BD5' }}>{hydration} / 8 {t("Glasses")}</span>
                    <button
                      onClick={() => setHydration(h => Math.min(h + 1, 8))}
                      disabled={hydration >= 8}
                      style={{
                        background: hydration >= 8 ? '#ccc' : '#3A9BD5', color: 'white', border: 'none',
                        width: 40, height: 40, borderRadius: '50%', fontSize: '1.2rem',
                        cursor: hydration >= 8 ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                        boxShadow: hydration >= 8 ? 'none' : '0 4px 12px rgba(58,155,213,0.3)'
                      }}
                    >
                      +
                    </button>
                  </div>
                </Card>
              </div>
            </div>

            {/* MOOD */}
            <Card title={`😊 ${t("How are you feeling today?")}`}>
              {MOODS.map(m => (
                <button
                  key={m}
                  onClick={() => handleMoodSelect(m)}
                  style={{
                    margin: 6,
                    padding: '8px 14px',
                    borderRadius: 20,
                    border: 'none',
                    cursor: 'pointer',
                    background: selectedMood === m ? '#E07A94' : '#eee',
                    color: selectedMood === m ? 'white' : '#333'
                  }}
                >
                  {t(m)}
                </button>
              ))}
            </Card>

            {/* LOG VITAL */}
            <Card title={`➕ ${t("Log New Vital")}`}>
              <div style={{ display: 'flex', gap: 10, marginBottom: 10 }}>
                <input
                  placeholder={t("Vital Name (BP, Sugar)")}
                  value={newVital.name}
                  onChange={e => setNewVital({ ...newVital, name: e.target.value })}
                  style={{ padding: 8, flex: 1 }}
                />
                <input
                  placeholder={t("Value")}
                  value={newVital.value}
                  onChange={e => setNewVital({ ...newVital, value: e.target.value })}
                  style={{ padding: 8, flex: 1 }}
                />
                <button
                  onClick={handleAddVital}
                  style={{
                    background: '#E07A94',
                    color: 'white',
                    border: 'none',
                    padding: '8px 14px',
                    borderRadius: 8,
                    cursor: 'pointer'
                  }}
                >
                  {t("Save")}
                </button>
              </div>
            </Card>

            {/* VITALS */}
            <Card title={`📊 ${t("Today's Vitals")}`}>
              {vitals.map(v => {
                const sc = STATUS_COLORS[v.status] || STATUS_COLORS.normal
                return (
                  <div
                    key={v.id}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      padding: '10px 0',
                      borderBottom: '1px solid rgba(0,0,0,0.05)'
                    }}
                  >
                    <span>{t(v.name)}</span>
                    <div>
                      <strong>{v.value}</strong>
                      <span
                        style={{
                          marginLeft: 8,
                          padding: '2px 8px',
                          borderRadius: 20,
                          fontSize: 12,
                          background: sc.bg,
                          color: sc.color
                        }}
                      >
                        {t(v.label)}
                      </span>
                    </div>
                  </div>
                )
              })}
            </Card>

            {/* APPOINTMENTS */}
            <Card title={`📅 ${t("Upcoming Appointments")}`}>
              {appointments.map(a => (
                <div
                  key={a.id}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    padding: '10px 0',
                    borderBottom: '1px solid rgba(0,0,0,0.05)'
                  }}
                >
                  <div>
                    <div style={{ fontWeight: 600 }}>{a.title}</div>
                    <div style={{ fontSize: 13 }}>{a.doctor}</div>
                  </div>
                  <div>{a.time}</div>
                </div>
              ))}
            </Card>
          </>
        )}

        {/* ================= TODDLER PHASE UI ================= */}
        {phase === 'toddler' && (
          <>
            <Card title={`💉 ${t("Vaccination Schedule")}`}>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid #eee' }}>
                <div>
                  <div style={{ fontWeight: 600 }}>6 {t("Weeks")}</div>
                  <div style={{ fontSize: '0.8rem', color: '#666' }}>DTaP, IPV, Hep B, RV, Hib, PCV13</div>
                </div>
                <div style={{ color: '#5DAE7A', fontWeight: 600 }}>✅ {t("Done")}</div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid #eee' }}>
                <div>
                  <div style={{ fontWeight: 600 }}>10 {t("Weeks")}</div>
                  <div style={{ fontSize: '0.8rem', color: '#666' }}>DTaP, IPV, RV, Hib, PCV13</div>
                </div>
                <div style={{ color: '#E8963A', fontWeight: 600 }}>⏳ {t("Upcoming")}</div>
              </div>
            </Card>

            <div style={{ display: 'flex', gap: 24, marginBottom: 24 }}>
              <div style={{ flex: 1 }}>
                <Card title={`📏 ${t("Growth Tracker")}`}>
                  <div style={{ padding: '8px 0', borderBottom: '1px solid #eee' }}>
                    <div style={{ fontSize: '0.8rem', color: '#666' }}>{t("Weight")}</div>
                    <div style={{ fontWeight: 600, fontSize: '1.2rem' }}>4.5 kg <span style={{ fontSize: '0.8rem', color: '#5DAE7A' }}>+1.2kg</span></div>
                  </div>
                  <div style={{ padding: '8px 0' }}>
                    <div style={{ fontSize: '0.8rem', color: '#666' }}>{t("Height")}</div>
                    <div style={{ fontWeight: 600, fontSize: '1.2rem' }}>55 cm <span style={{ fontSize: '0.8rem', color: '#5DAE7A' }}>+3cm</span></div>
                  </div>
                </Card>
              </div>
              <div style={{ flex: 1 }}>
                <Card title={`⭐ ${t("Core Milestones")}`}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 0' }}>
                    <input type="checkbox" checked readOnly style={{ accentColor: '#3A9BD5', width: 16, height: 16 }} />
                    <span style={{ fontSize: '0.9rem', textDecoration: 'line-through', color: '#888' }}>{t("Lifts head")}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 0' }}>
                    <input type="checkbox" readOnly style={{ accentColor: '#3A9BD5', width: 16, height: 16 }} />
                    <span style={{ fontSize: '0.9rem' }}>{t("Social smile")}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 0' }}>
                    <input type="checkbox" readOnly style={{ accentColor: '#3A9BD5', width: 16, height: 16 }} />
                    <span style={{ fontSize: '0.9rem' }}>{t("Coos and babbles")}</span>
                  </div>
                </Card>
              </div>
            </div>
          </>
        )}
      </div>

      <AIChatbot />
    </div>
  )
}

/* ===========================
   CARD COMPONENT
=========================== */
function Card({ title, children }) {
  return (
    <div style={{
      background: 'white',
      padding: 24,
      borderRadius: 20,
      marginBottom: 24,
      boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
    }}>
      <div style={{
        fontWeight: 600,
        marginBottom: 16
      }}>
        {title}
      </div>
      {children}
    </div>
  )
}