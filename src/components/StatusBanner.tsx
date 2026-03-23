interface StatusBannerProps {
  count: number;
}

export default function StatusBanner({ count }: StatusBannerProps) {
  if (count === 0) return null;

  return (
    <div
      style={{
        background: 'var(--color-urgent-bg)',
        color: 'var(--color-urgent)',
        padding: '12px 20px',
        borderLeft: '3px solid var(--color-urgent)',
        display: 'flex',
        alignItems: 'center',
        gap: 10,
      }}
    >
      <span style={{ fontSize: 18 }}>⚠️</span>
      <div>
        <div className="font-dm" style={{ fontWeight: 700, fontSize: 14 }}>
          {count} требуют внимания
        </div>
        <div style={{ fontSize: 12, opacity: 0.8 }}>
          Проверьте проблемные заказы
        </div>
      </div>
    </div>
  )
}
