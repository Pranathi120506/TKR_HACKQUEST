export default function Toast({ message }) {
  return (
    <div style={{
      position: 'fixed',
      bottom: 32,
      left: '50%',
      transform: 'translateX(-50%)',
      background: '#2D2320',
      color: 'white',
      borderRadius: 99,
      padding: '14px 28px',
      fontSize: '0.85rem',
      fontWeight: 500,
      zIndex: 10000,
      whiteSpace: 'nowrap',
      boxShadow: '0 8px 32px rgba(45,35,32,0.25)',
      animation: 'fadeUp 0.4s cubic-bezier(0.34,1.56,0.64,1)',
    }}>
      {message}
    </div>
  )
}
