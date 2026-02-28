export default function TodayAppointments({ patients }) {
  return (
    <div style={{ background: '#161D2E', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 20, overflow: 'hidden' }}>
      <div style={{ padding: '20px 24px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ fontSize: '0.88rem', fontWeight: 700, color: 'white', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
          Today's Appointments
        </div>
      </div>
      {patients.length === 0 ? (
        <div style={{ padding: '16px 20px', color: 'rgba(255,255,255,0.3)', fontSize: '0.82rem' }}>
          No appointments today
        </div>
      ) : (
        patients.map(p => (
          <div key={p.id} style={{
            display: 'flex', alignItems: 'center', gap: 12,
            padding: '14px 20px', borderBottom: '1px solid rgba(255,255,255,0.04)',
          }}>
            <div style={{
              fontFamily: 'Space Mono, monospace', fontSize: '0.72rem',
              color: '#3A9BD5', background: 'rgba(58,155,213,0.1)',
              padding: '4px 10px', borderRadius: 6, whiteSpace: 'nowrap',
            }}>
              {p.nextAppt.replace('Today ', '')}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 600, fontSize: '0.85rem', color: 'white' }}>{p.name}</div>
              <div style={{ fontSize: '0.73rem', color: 'rgba(255,255,255,0.35)' }}>
                {p.id} · {p.weeks}w · {p.status}
              </div>
            </div>
            <button
              onClick={() => alert(`Joining session with ${p.name}...`)}
              style={{
                background: 'linear-gradient(135deg,#3A9BD5,#5DAE7A)', color: 'white',
                border: 'none', borderRadius: 8, padding: '7px 16px',
                fontSize: '0.76rem', fontWeight: 700, cursor: 'pointer',
              }}
            >
              Join →
            </button>
          </div>
        ))
      )}
    </div>
  )
}
