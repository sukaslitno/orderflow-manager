interface MetricCardProps {
  icon: string;
  label: string;
  value: number;
  badgeText: string;
  badgeColor: 'blue' | 'amber' | 'red';
  showPulse?: boolean;
  onClick?: () => void;
}

const badgeStyles = {
  blue: {
    background: 'var(--color-status-new)',
    color: 'var(--color-status-new-text)',
  },
  amber: {
    background: 'var(--color-status-assembly)',
    color: 'var(--color-status-assembly-text)',
  },
  red: {
    background: 'var(--color-status-problem)',
    color: 'var(--color-status-problem-text)',
  },
};

export default function MetricCard({ icon, label, value, badgeText, badgeColor, showPulse, onClick }: MetricCardProps) {
  return (
    <button
      onClick={onClick}
      className="active-scale"
      style={{
        flex: '1 1 0',
        minWidth: 0,
        background: 'var(--color-surface)',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--color-border)',
        padding: '14px 12px',
        textAlign: 'left',
        cursor: 'pointer',
        transition: 'transform 100ms ease',
      }}
    >
      <div className="flex items-center gap-1" style={{ marginBottom: 6 }}>
        <span style={{ fontSize: 14 }}>{icon}</span>
        <span className="font-inter" style={{ fontSize: 11, color: 'var(--color-text-secondary)' }}>
          {label}
        </span>
      </div>
      <div className="font-dm" style={{ fontSize: 28, fontWeight: 700, color: 'var(--color-text-primary)', lineHeight: 1.1 }}>
        {value}
      </div>
      <div className="flex items-center gap-1.5" style={{ marginTop: 8 }}>
        {showPulse && (
          <span
            className="animate-pulse-dot"
            style={{
              width: 6,
              height: 6,
              borderRadius: '50%',
              background: 'var(--color-urgent)',
              display: 'inline-block',
            }}
          />
        )}
        <span
          style={{
            ...badgeStyles[badgeColor],
            fontSize: 10,
            fontWeight: 600,
            padding: '2px 8px',
            borderRadius: 20,
            display: 'inline-block',
          }}
        >
          {badgeText}
        </span>
      </div>
    </button>
  )
}
