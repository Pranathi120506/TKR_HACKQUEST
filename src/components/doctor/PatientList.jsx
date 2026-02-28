import { useState } from 'react';

const FILTERS = [
  { key: 'all', label: 'All' },
  { key: 'critical', label: '🔴 Critical' },
  { key: 'today', label: 'Today' },
  { key: 'stable', label: 'Stable' },
]

export default function PatientList({ patients, filter, onFilterChange, onSelectPatient }) {
  const [sortBy, setSortBy] = useState('risk'); // 'risk', 'gestation', 'recent'

  // Sort patients dynamically
  const sortedPatients = [...patients].sort((a, b) => {
    if (sortBy === 'risk') {
      const riskScores = { High: 3, Medium: 2, Low: 1 };
      return riskScores[b.risk] - riskScores[a.risk];
    } else if (sortBy === 'gestation') {
      return b.weeks - a.weeks; // Furthest gestation first
    } else {
      return 0; // Default (assumes list is already somewhat chronologically ordered by default)
    }
  });

  return (
    <div style={{ background: '#161D2E', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 20, overflow: 'hidden' }}>
      {/* Header */}
      <div style={{
        padding: '20px 24px', borderBottom: '1px solid rgba(255,255,255,0.06)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 10,
      }}>
        <div style={{ fontSize: '0.88rem', fontWeight: 700, color: 'white', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
          Patient List
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div>
            {FILTERS.map(f => (
              <button
                key={f.key}
                onClick={() => onFilterChange(f.key)}
                style={{
                  background: filter === f.key ? 'rgba(58,155,213,0.15)' : 'none',
                  border: `1px solid ${filter === f.key ? '#3A9BD5' : 'rgba(255,255,255,0.1)'}`,
                  color: filter === f.key ? '#3A9BD5' : 'rgba(255,255,255,0.4)',
                  borderRadius: 99, padding: '5px 14px',
                  fontSize: '0.74rem', cursor: 'pointer', marginLeft: 6,
                  transition: 'all 0.2s',
                }}
              >
                {f.label}
              </button>
            ))}
          </div>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            style={{
              background: 'rgba(255,255,255,0.05)',
              color: 'white',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: 8,
              padding: '6px 10px',
              fontSize: '0.75rem',
              outline: 'none',
              cursor: 'pointer'
            }}
          >
            <option value="risk">Sort: Highest Risk</option>
            <option value="gestation">Sort: Furthest Gestation</option>
            <option value="recent">Sort: Most Recent</option>
          </select>

        </div>
      </div>

      {/* Rows */}
      <div style={{ padding: 8 }}>
        {sortedPatients.map(p => (
          <PatientRow key={p.id} patient={p} onClick={() => onSelectPatient(p)} />
        ))}
        {patients.length === 0 && (
          <div style={{ padding: '24px', textAlign: 'center', color: 'rgba(255,255,255,0.3)', fontSize: '0.84rem' }}>
            No patients match this filter
          </div>
        )}
      </div>
    </div>
  )
}

function PatientRow({ patient: p, onClick }) {
  const borderLeft = p.risk === 'High' ? '3px solid #E85454' : p.risk === 'Medium' ? '3px solid #F7C59F' : 'none'
  const statusColors = { Critical: { bg: 'rgba(232,84,84,0.15)', color: '#E85454' }, Watch: { bg: 'rgba(247,197,159,0.15)', color: '#F7C59F' }, Stable: { bg: 'rgba(93,174,122,0.15)', color: '#5DAE7A' } }
  const sc = statusColors[p.status] || statusColors.Stable

  return (
    <div
      onClick={onClick}
      style={{
        display: 'flex', alignItems: 'center', gap: 12,
        padding: '14px 16px', borderRadius: 12, cursor: 'pointer',
        borderLeft, transition: 'all 0.2s',
      }}
      onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.04)'}
      onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
    >
      {/* Avatar */}
      <div style={{
        width: 38, height: 38, borderRadius: '50%',
        background: 'linear-gradient(135deg,#3A9BD5,#9B7ED9)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: '0.9rem', fontWeight: 700, color: 'white', flexShrink: 0,
      }}>
        {p.name.charAt(0)}
      </div>

      {/* Info */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'white', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {p.name}
          <span style={{
            background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.4)',
            fontSize: '0.68rem', padding: '1px 7px', borderRadius: 4, marginLeft: 6,
            fontFamily: 'Space Mono, monospace',
          }}>
            {p.id}
          </span>
        </div>
        <div style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.35)', marginTop: 2 }}>
          {p.weeks}w · Age {p.age} · {p.tags.join(', ')}
        </div>
      </div>

      {/* Vitals */}
      <div style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.35)', textAlign: 'right', display: 'flex', flexDirection: 'column', gap: 2 }}>
        <span>BP: {p.bp}</span>
        <span>{p.weight}</span>
      </div>

      {/* Status Badge */}
      <div style={{
        fontSize: '0.68rem', fontWeight: 700, padding: '3px 10px',
        borderRadius: 99, whiteSpace: 'nowrap', textTransform: 'uppercase',
        letterSpacing: '0.04em', background: sc.bg, color: sc.color,
      }}>
        {p.status}
      </div>

      {/* Appointment */}
      <div style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.3)', whiteSpace: 'nowrap', maxWidth: 100, textAlign: 'right' }}>
        {p.nextAppt}
      </div>

      {/* Actions */}
      <div style={{ display: 'flex', gap: 4 }}>
        {['📞', '📹'].map(icon => (
          <button
            key={icon}
            onClick={e => { e.stopPropagation(); alert(`${icon === '📞' ? 'Calling' : 'Video calling'} ${p.name}...`) }}
            style={{
              background: 'rgba(255,255,255,0.06)', border: 'none',
              width: 30, height: 30, borderRadius: 8, fontSize: '0.85rem',
              cursor: 'pointer', transition: 'all 0.2s',
            }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(58,155,213,0.2)'}
            onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.06)'}
          >
            {icon}
          </button>
        ))}
      </div>
    </div>
  )
}
