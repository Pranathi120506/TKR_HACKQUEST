import { useState } from 'react'

export function AuthFormWrapper({ children }) {
  return (
    <div style={{ maxWidth: 440, margin: '0 auto', animation: 'fadeUp 0.4s ease' }}>
      <div style={{
        background: 'white', borderRadius: 28, padding: '44px 40px',
        boxShadow: '0 12px 60px rgba(45,35,32,0.1)',
      }}>
        {children}
      </div>
    </div>
  )
}

export function BackButton({ onClick }) {
  return (
    <button onClick={onClick} style={{
      background: 'none', border: 'none', cursor: 'pointer',
      color: '#5C4F4A', fontSize: '0.8rem', fontFamily: 'DM Sans, sans-serif',
      display: 'flex', alignItems: 'center', gap: 6, padding: 0, marginBottom: 28,
    }}>
      ← Back
    </button>
  )
}

export function RoleBadge({ emoji, label }) {
  return (
    <div style={{
      display: 'inline-flex', alignItems: 'center', gap: 8,
      background: '#FDF8F2', borderRadius: 99, padding: '6px 14px 6px 10px',
      fontSize: '0.78rem', fontWeight: 600, color: '#2D2320', marginBottom: 16,
    }}>
      {emoji} {label}
    </div>
  )
}

export function FormTitle({ title, subtitle }) {
  return (
    <div style={{ marginBottom: 24 }}>
      <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '2rem', fontWeight: 600, color: '#2D2320', marginBottom: 6 }}>
        {title}
      </h2>
      {subtitle && <p style={{ fontSize: '0.82rem', color: '#5C4F4A' }}>{subtitle}</p>}
    </div>
  )
}

export function DemoHint({ children, color = 'rose' }) {
  const styles = {
    rose: { bg: 'rgba(242,167,184,0.1)', border: 'rgba(242,167,184,0.3)' },
    blue: { bg: 'rgba(168,213,245,0.1)', border: 'rgba(58,155,213,0.3)' },
    green: { bg: 'rgba(93,174,122,0.08)', border: 'rgba(93,174,122,0.3)' },
  }
  const s = styles[color] || styles.rose
  return (
    <div style={{
      background: s.bg, border: `1px solid ${s.border}`, borderRadius: 12,
      padding: '12px 16px', marginBottom: 20, fontSize: '0.78rem', color: '#5C4F4A', lineHeight: 1.6,
    }}>
      {children}
    </div>
  )
}

export function ErrorBox({ message }) {
  if (!message) return null
  return (
    <div style={{
      background: '#FFF0F0', border: '1px solid #FFC0C0', borderRadius: 10,
      padding: '10px 14px', fontSize: '0.8rem', color: '#C0392B',
      marginBottom: 16, animation: 'fadeIn 0.3s ease',
    }}>
      {message}
    </div>
  )
}

export function FormInput({ id, type = 'text', placeholder, value, onChange, onKeyDown, className }) {
  return (
    <input
      id={id}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      onKeyDown={onKeyDown}
      className={`form-input${className ? ' ' + className : ''}`}
    />
  )
}

export function PasswordInput({ id, value, onChange, onKeyDown, className }) {
  const [show, setShow] = useState(false)
  return (
    <div className="form-input-wrap">
      <input
        id={id}
        type={show ? 'text' : 'password'}
        placeholder="••••••••"
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
        className={`form-input${className ? ' ' + className : ''}`}
      />
      <span className="form-input-icon" onClick={() => setShow(s => !s)}>
        {show ? '🙈' : '👁'}
      </span>
    </div>
  )
}

export function SubmitButton({ onClick, loading, gradient, shadow, children }) {
  return (
    <button
      onClick={onClick}
      disabled={loading}
      style={{
        width: '100%', padding: 14, borderRadius: 99, border: 'none',
        background: gradient, color: 'white',
        fontSize: '0.9rem', fontWeight: 700, marginTop: 8,
        boxShadow: `0 4px 20px ${shadow}`,
        opacity: loading ? 0.7 : 1,
        pointerEvents: loading ? 'none' : 'auto',
        transition: 'all 0.3s',
      }}
    >
      {loading ? 'Verifying…' : children}
    </button>
  )
}

export function Divider() {
  return (
    <div style={{ textAlign: 'center', margin: '18px 0', position: 'relative' }}>
      <div style={{ position: 'absolute', top: '50%', left: 0, right: 0, height: 1, background: 'rgba(45,35,32,0.1)' }}/>
      <span style={{ background: 'white', position: 'relative', padding: '0 12px', fontSize: '0.75rem', color: '#5C4F4A' }}>
        or
      </span>
    </div>
  )
}
