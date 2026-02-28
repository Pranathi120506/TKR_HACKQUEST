import { useState, useEffect } from 'react'
import { getPartnerData } from '../../services/partnerService'

const MOODS = ['😊 Happy', '😴 Tired', '😰 Anxious', '🤢 Nauseous', '🤕 In Pain', '😄 Excellent']

export default function PartnerDashboard({ user, onLogout }) {
  const [vitals, setVitals] = useState([])
  const [risk, setRisk] = useState('Low')
  const [latestMood, setLatestMood] = useState(null)
  const [selectedMood, setSelectedMood] = useState(null)

  const firstName = user?.name?.split(' ')[0] || ''

  /* ===========================
     LOAD DATA
  =========================== */
  useEffect(() => {
    async function loadData() {
      if (!user?.linkedMotherId) return

      const data = await getPartnerData(user.linkedMotherId)

      setVitals(data.vitals)
      setRisk(data.risk)
      setLatestMood(data.mood)
    }

    loadData()
  }, [user])

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: 'linear-gradient(135deg,#0D1F15,#0F1A2A)', fontFamily: 'DM Sans, sans-serif' }}>

      {/* HEADER */}
      <header style={{
        padding: '0 40px',
        height: 68,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: 'rgba(255,255,255,0.03)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
      }}>
        <div style={{ fontSize: '1.2rem', fontWeight: 600, color: '#5DAE7A' }}>
          💚 MaternaLink — Partner
        </div>

        <button
          onClick={onLogout}
          style={{
            background: 'rgba(255,255,255,0.06)',
            border: '1px solid rgba(255,255,255,0.1)',
            color: 'rgba(255,255,255,0.6)',
            borderRadius: 99,
            padding: '8px 16px',
            cursor: 'pointer',
          }}
        >
          Sign Out
        </button>
      </header>

      <div style={{ padding: '36px 40px', maxWidth: 1100, margin: '0 auto', width: '100%' }}>

        {/* HERO */}
        <div style={{
          background: 'linear-gradient(135deg,#1A4731,#0F2D4A)',
          borderRadius: 28,
          padding: '36px 40px',
          color: 'white',
          marginBottom: 28,
        }}>
          <div style={{ fontSize: '1.8rem' }}>
            Welcome, <strong>{firstName}</strong> 💚
          </div>
          <div style={{ marginTop: 8, opacity: 0.7 }}>
            Current Risk Level:
            <strong style={{
              marginLeft: 6,
              color:
                risk === 'High' ? '#E85454' :
                  risk === 'Medium' ? '#F7C59F' :
                    '#5DAE7A'
            }}>
              {risk}
            </strong>
          </div>
          {latestMood && (
            <div style={{ marginTop: 6, opacity: 0.7 }}>
              Latest Mood: {latestMood}
            </div>
          )}
        </div>

        {/* VITALS CARD */}
        <DarkCard title="❤️ Priya's Vitals">
          {vitals.map(v => (
            <div
              key={v.id || v.name}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: '10px 0',
                borderBottom: '1px solid rgba(255,255,255,0.05)'
              }}
            >
              <span style={{ color: 'rgba(255,255,255,0.6)' }}>
                {v.name}
              </span>
              <span style={{
                fontWeight: 700,
                color:
                  v.status === 'warning' ? '#E85454' :
                    v.status === 'watch' ? '#F7C59F' :
                      'white'
              }}>
                {v.value}
              </span>
            </div>
          ))}
        </DarkCard>

        {/* MOOD SELECTOR */}
        <DarkCard title="💬 Log Mood">
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            {MOODS.map(mood => (
              <button
                key={mood}
                onClick={() => setSelectedMood(mood)}
                style={{
                  background: selectedMood === mood ? 'rgba(93,174,122,0.3)' : 'rgba(255,255,255,0.06)',
                  border: `1px solid ${selectedMood === mood ? '#5DAE7A' : 'rgba(255,255,255,0.1)'}`,
                  borderRadius: 99,
                  padding: '8px 16px',
                  fontSize: '0.78rem',
                  color: selectedMood === mood ? '#5DAE7A' : 'rgba(255,255,255,0.6)',
                  cursor: 'pointer',
                }}
              >
                {mood}
              </button>
            ))}
          </div>
        </DarkCard>

      </div>
    </div>
  )
}

function DarkCard({ title, children }) {
  return (
    <div style={{
      background: 'rgba(255,255,255,0.05)',
      border: '1px solid rgba(255,255,255,0.08)',
      borderRadius: 20,
      padding: 24,
      marginBottom: 24
    }}>
      <div style={{
        fontSize: '0.75rem',
        textTransform: 'uppercase',
        color: 'rgba(255,255,255,0.4)',
        marginBottom: 16,
        fontWeight: 700
      }}>
        {title}
      </div>
      {children}
    </div>
  )
}