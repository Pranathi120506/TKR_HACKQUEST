import { useState } from 'react'

const NAV_ITEMS = [
  { icon: '🏥', label: 'Dashboard' },
  { icon: '👥', label: 'All Patients' },
  { icon: '📅', label: 'Appointments' },
  { icon: '⚠️', label: 'Risk Alerts' },
  { icon: '📹', label: 'Video Consult' },
  { icon: '💊', label: 'Prescriptions' },
  { icon: '📊', label: 'Reports' },
  { icon: '⚙️', label: 'Settings' },
]

export default function DoctorSidebar({ name, onLogout }) {
  const [active, setActive] = useState('Dashboard')

  return (
    <aside style={{
      position: 'fixed', top: 0, left: 0, bottom: 0, width: 260,
      background: '#161D2E', borderRight: '1px solid rgba(255,255,255,0.06)',
      display: 'flex', flexDirection: 'column', zIndex: 100,
    }}>
      {/* Logo */}
      <div style={{ padding: '24px 24px 20px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.2rem', fontWeight: 600, color: 'white' }}>
          🌸 Bloom
        </div>
        <div style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.4)', marginTop: 2 }}>
          Doctor Portal · v2.0
        </div>
      </div>

      {/* User Card */}
      <div style={{ padding: '20px 24px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{
          width: 44, height: 44, borderRadius: '50%',
          background: 'linear-gradient(135deg,#3A9BD5,#5DAE7A)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '1.2rem', marginBottom: 10,
        }}>
          👩‍⚕️
        </div>
        <div style={{ fontSize: '0.88rem', fontWeight: 600, color: 'white' }}>{name}</div>
        <div style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.4)', marginTop: 2 }}>
          DR-2024-001 · Gynaecology
        </div>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: '16px 12px', overflowY: 'auto' }}>
        {NAV_ITEMS.map(item => (
          <NavItem
            key={item.label}
            icon={item.icon}
            label={item.label}
            active={active === item.label}
            onClick={() => setActive(item.label)}
          />
        ))}
      </nav>

      {/* Logout */}
      <div style={{ padding: '16px 24px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <button
          onClick={onLogout}
          style={{
            width: '100%', background: 'rgba(232,84,84,0.1)',
            border: '1px solid rgba(232,84,84,0.2)', color: '#E85454',
            borderRadius: 10, padding: 10, fontSize: '0.82rem', fontWeight: 600,
          }}
        >
          ⬅ Sign Out
        </button>
      </div>
    </aside>
  )
}

function NavItem({ icon, label, active, onClick }) {
  return (
    <div
      onClick={onClick}
      style={{
        display: 'flex', alignItems: 'center', gap: 12,
        padding: '10px 14px', borderRadius: 10, cursor: 'pointer',
        marginBottom: 2, fontSize: '0.84rem', fontWeight: 500,
        background: active ? 'rgba(58,155,213,0.15)' : 'transparent',
        color: active ? '#3A9BD5' : 'rgba(255,255,255,0.5)',
        transition: 'all 0.2s',
      }}
    >
      <span style={{ fontSize: '1rem', width: 20, textAlign: 'center' }}>{icon}</span>
      {label}
    </div>
  )
}
