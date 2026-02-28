const ALERTS = [
  { id: 'PT-001', name: 'Priya Sharma', msg: 'BP 140/90 — Hypertensive reading. Urgent review needed.', color: '#E85454', bg: 'rgba(232,84,84,0.08)', border: 'rgba(232,84,84,0.2)' },
  { id: 'PT-006', name: 'Rekha Joshi', msg: 'BP 145/92 — Advanced maternal age + hypertension combo.', color: '#F7C59F', bg: 'rgba(247,197,159,0.08)', border: 'rgba(247,197,159,0.2)' },
  { id: 'PT-005', name: 'Ananya Das', msg: 'Pre-eclampsia risk factors detected. Monitor closely.', color: '#3A9BD5', bg: 'rgba(58,155,213,0.08)', border: 'rgba(58,155,213,0.2)' },
]

export default function RiskAlerts() {
  return (
    <div style={{ background: '#161D2E', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 20, padding: '20px 24px' }}>
      <div style={{ fontSize: '0.88rem', fontWeight: 700, color: 'white', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 16 }}>
        ⚠️ Risk Alerts
      </div>
      {ALERTS.map(a => (
        <div key={a.id} style={{
          background: a.bg, border: `1px solid ${a.border}`,
          borderRadius: 12, padding: '12px 14px', marginBottom: 8,
        }}>
          <div style={{ fontWeight: 700, fontSize: '0.82rem', color: a.color, marginBottom: 4 }}>
            {a.name} · {a.id}
          </div>
          <div style={{ fontSize: '0.77rem', color: 'rgba(255,255,255,0.55)', lineHeight: 1.5 }}>
            {a.msg}
          </div>
        </div>
      ))}
    </div>
  )
}
