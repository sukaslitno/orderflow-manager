export default function Header() {
  return (
    <header
      className="sticky top-0 z-50 flex items-center justify-between"
      style={{
        height: 56,
        padding: '0 20px',
        background: 'var(--color-surface)',
        borderBottom: '1px solid var(--color-border)',
      }}
    >
      <span className="font-dm" style={{ fontWeight: 700, fontSize: 18, color: 'var(--color-text-primary)' }}>
        Orderflow
      </span>
      <div className="flex items-center gap-3">
        {/* Bell */}
        <button className="relative active-scale" style={{ width: 36, height: 36, borderRadius: '50%', border: '1px solid var(--color-border)', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--color-surface)' }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
            <path d="M13.73 21a2 2 0 0 1-3.46 0" />
          </svg>
          <span
            className="absolute"
            style={{
              top: 6,
              right: 6,
              width: 16,
              height: 16,
              borderRadius: '50%',
              background: 'var(--color-urgent)',
              color: '#fff',
              fontSize: 9,
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '2px solid var(--color-surface)',
            }}
          >
            3
          </span>
        </button>
        {/* Avatar */}
        <div
          style={{
            width: 36,
            height: 36,
            borderRadius: '50%',
            background: 'var(--color-accent)',
            color: '#fff',
            fontSize: 13,
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          className="font-dm"
        >
          AM
        </div>
      </div>
    </header>
  )
}
