import AIPatientSummary from './AIPatientSummary'

export default function PatientModal({ patient: p, onClose }) {
  const riskStyles = {
    High: { bg: 'rgba(232,84,84,0.2)', color: '#E85454', border: 'rgba(232,84,84,0.3)' },
    Medium: { bg: 'rgba(247,197,159,0.2)', color: '#E8963A', border: 'rgba(247,197,159,0.3)' },
    Low: { bg: 'rgba(93,174,122,0.2)', color: '#5DAE7A', border: 'rgba(93,174,122,0.3)' },
  }
  const rs = riskStyles[p.risk] || riskStyles.Low

  const VITALS = [
    { label: 'Blood Pressure', value: p.bp },
    { label: 'Weight', value: p.weight },
    { label: 'Gestation', value: `${p.weeks}w` },
    { label: 'Next Appt', value: p.nextAppt },
  ]

  const ACTIONS = [
    { label: '📹 Video Call', primary: true, onClick: () => alert('Starting video call...') },
    { label: '💊 Prescribe', primary: false, onClick: () => alert('Prescription sent!') },
    { label: '📄 Full Report', primary: false, onClick: () => alert('Report generated!') },
    { label: '🔔 Alert Partner', primary: false, onClick: () => alert('Alert sent to partner!') },
  ]

  return (
    <div
      onClick={e => e.target === e.currentTarget && onClose()}
      style={{
        position: 'fixed', inset: 0, zIndex: 500,
        background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24,
        animation: 'fadeIn 0.2s ease',
      }}
    >
      <div style={{
        background: '#161D2E', border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: 24, padding: 36, maxWidth: 600, width: '100%',
        maxHeight: '80vh', overflowY: 'auto', position: 'relative',
      }}>
        {/* Close */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute', top: 20, right: 20,
            background: 'rgba(255,255,255,0.08)', border: 'none',
            width: 32, height: 32, borderRadius: '50%', color: 'white',
            cursor: 'pointer', fontSize: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
        >
          ✕
        </button>

        {/* Patient Header */}
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 20, marginBottom: 28, flexWrap: 'wrap' }}>
          <div style={{
            width: 60, height: 60, borderRadius: '50%',
            background: 'linear-gradient(135deg,#3A9BD5,#9B7ED9)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '1.5rem', fontWeight: 700, color: 'white', flexShrink: 0,
          }}>
            {p.name.charAt(0)}
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.8rem', fontWeight: 600, color: 'white' }}>
              {p.name}
            </div>
            <div style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)', marginTop: 4 }}>
              {p.id} · {p.age}y · {p.weeks} weeks pregnant
            </div>
            <div style={{ marginTop: 8, display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              {p.tags.map(t => (
                <span key={t} style={{
                  background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.6)',
                  fontSize: '0.72rem', padding: '3px 10px', borderRadius: 6,
                }}>
                  {t}
                </span>
              ))}
            </div>
          </div>
          <div style={{
            padding: '6px 16px', borderRadius: 99, fontSize: '0.76rem', fontWeight: 700,
            background: rs.bg, color: rs.color, border: `1px solid ${rs.border}`,
          }}>
            {p.risk} Risk
          </div>
        </div>

        {/* Vitals Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 12, marginBottom: 24 }}>
          {VITALS.map(v => (
            <div key={v.label} style={{ background: 'rgba(255,255,255,0.04)', borderRadius: 12, padding: 14, textAlign: 'center' }}>
              <div style={{ fontSize: '0.68rem', color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 6 }}>
                {v.label}
              </div>
              <div style={{ fontSize: '1.1rem', fontWeight: 700, color: 'white', fontFamily: 'Space Mono, monospace' }}>
                {v.value}
              </div>
            </div>
          ))}
        </div>

        {/* Notes */}
        <div style={{ fontSize: '0.76rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'rgba(255,255,255,0.35)', marginBottom: 10 }}>
          Clinical Notes
        </div>
        <div style={{
          background: 'rgba(255,255,255,0.04)', borderRadius: 12, padding: 16,
          fontSize: '0.84rem', color: 'rgba(255,255,255,0.6)', lineHeight: 1.7,
        }}>
          {p.notes}
        </div>

        {/* AI Insight */}
        <div style={{ marginBottom: 24 }}>
          <AIPatientSummary patient={p} />
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          {ACTIONS.map(a => (
            <button
              key={a.label}
              onClick={a.onClick}
              style={{
                padding: '10px 20px', borderRadius: 10, border: 'none',
                fontSize: '0.82rem', fontWeight: 600, cursor: 'pointer',
                background: a.primary ? 'linear-gradient(135deg,#3A9BD5,#5DAE7A)' : 'rgba(255,255,255,0.08)',
                color: a.primary ? 'white' : 'rgba(255,255,255,0.8)',
                transition: 'all 0.2s',
              }}
            >
              {a.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
