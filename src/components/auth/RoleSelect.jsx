import { useState } from 'react'

const ROLES = [
  {
    key: 'mother',
    emoji: '🤰',
    name: 'Mother',
    desc: 'Track your pregnancy journey, vitals, and receive personalized AI guidance.',
    features: ['Vitals & health tracking', 'AI risk assessment', 'Appointment management', 'Voice support in 8 languages'],
    dotColor: '#E07A94',
    btnGradient: 'linear-gradient(135deg,#E07A94,#9B7ED9)',
    btnShadow: 'rgba(224,122,148,0.4)',
    iconBg: 'linear-gradient(135deg,#F2A7B8,#C5B4E3)',
    iconShadow: 'rgba(224,122,148,0.35)',
    hoverBorder: '#E07A94',
  },
  {
    key: 'doctor',
    emoji: '👩‍⚕️',
    name: 'Doctor',
    desc: 'Monitor patients, manage appointments, and conduct video consultations.',
    features: ['Patient ID & status board', 'Risk alert dashboard', 'Video consultation portal', 'Prescription management'],
    dotColor: '#3A9BD5',
    btnGradient: 'linear-gradient(135deg,#3A9BD5,#5DAE7A)',
    btnShadow: 'rgba(58,155,213,0.4)',
    iconBg: 'linear-gradient(135deg,#A8D4F5,#A8D5B5)',
    iconShadow: 'rgba(58,155,213,0.35)',
    hoverBorder: '#3A9BD5',
  },
  {
    key: 'partner',
    emoji: '💚',
    name: 'Partner',
    desc: "Stay informed and support your partner through every stage of the journey.",
    features: ['Live partner health status', 'Daily care task checklist', 'Nutrition & meal tips', 'Emergency alerts'],
    dotColor: '#5DAE7A',
    btnGradient: 'linear-gradient(135deg,#5DAE7A,#F7C59F)',
    btnShadow: 'rgba(93,174,122,0.4)',
    iconBg: 'linear-gradient(135deg,#A8D5B5,#F7C59F)',
    iconShadow: 'rgba(93,174,122,0.35)',
    hoverBorder: '#5DAE7A',
  },
]

export default function RoleSelect({ onSelect }) {
  return (
    <div style={{ animation: 'fadeUp 0.4s ease' }}>
      {/* Brand */}
      <div style={{ textAlign: 'center', marginBottom: 48 }}>
        <div style={{
          display: 'inline-block', background: 'white',
          border: '1px solid rgba(224,122,148,0.3)', borderRadius: 99,
          padding: '6px 18px', fontSize: '0.72rem', fontWeight: 600,
          color: '#E07A94', letterSpacing: '0.1em', textTransform: 'uppercase',
          marginBottom: 16, boxShadow: '0 2px 12px rgba(224,122,148,0.15)',
        }}>
          🌸 Maternal & Toddler Care Suite
        </div>
        <h1 style={{
          fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(2.2rem,4vw,3.5rem)',
          fontWeight: 300, lineHeight: 1.1, color: '#2D2320', marginBottom: 8,
        }}>
          Welcome to{' '}
          <em style={{ fontStyle: 'italic', color: '#E07A94' }}>Bloom</em>
        </h1>
        <p style={{ fontSize: '0.9rem', color: '#5C4F4A', lineHeight: 1.6 }}>
          Intelligent care from conception to toddlerhood. Select your role to continue.
        </p>
      </div>

      {/* Role Cards Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
        gap: 24, maxWidth: 860, margin: '0 auto',
      }}>
        {ROLES.map(role => (
          <RoleCard key={role.key} role={role} onSelect={onSelect} />
        ))}
      </div>
    </div>
  )
}

function RoleCard({ role, onSelect }) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => onSelect(role.key)}
      style={{
        background: 'white', borderRadius: 28, padding: '40px 32px',
        boxShadow: hovered ? '0 20px 60px rgba(45,35,32,0.14)' : '0 8px 40px rgba(45,35,32,0.08)',
        border: `2px solid ${hovered ? role.hoverBorder : 'transparent'}`,
        cursor: 'pointer',
        transform: hovered ? 'translateY(-6px)' : 'none',
        transition: 'all 0.3s',
        textAlign: 'center',
      }}
    >
      <div style={{
        width: 72, height: 72, borderRadius: '50%',
        background: role.iconBg,
        boxShadow: `0 8px 24px ${role.iconShadow}`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: '2rem', margin: '0 auto 16px',
      }}>
        {role.emoji}
      </div>
      <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.5rem', fontWeight: 600, color: '#2D2320', marginBottom: 8 }}>
        {role.name}
      </div>
      <p style={{ fontSize: '0.8rem', color: '#5C4F4A', lineHeight: 1.6, marginBottom: 20 }}>
        {role.desc}
      </p>
      <ul style={{ listStyle: 'none', marginBottom: 24 }}>
        {role.features.map(f => (
          <li key={f} style={{ fontSize: '0.77rem', color: '#5C4F4A', padding: '4px 0', display: 'flex', alignItems: 'center', gap: 8, justifyContent: 'center' }}>
            <span style={{ width: 5, height: 5, borderRadius: '50%', background: role.dotColor, flexShrink: 0 }} />
            {f}
          </li>
        ))}
      </ul>
      <button
        style={{
          width: '100%', padding: 12, borderRadius: 99, border: 'none',
          background: role.btnGradient, color: 'white',
          fontSize: '0.84rem', fontWeight: 600,
          boxShadow: `0 4px 16px ${role.btnShadow}`,
        }}
      >
        Enter as {role.name} →
      </button>
    </div>
  )
}

