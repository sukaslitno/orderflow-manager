interface ProgressBarProps {
  shipped: number;
  processing: number;
  assembly: number;
  problems: number;
}

export default function ProgressBar({ shipped, processing, assembly, problems }: ProgressBarProps) {
  const total = shipped + processing + assembly + problems;
  const pct = (v: number) => (v / total) * 100;

  const segments = [
    { value: shipped, color: 'var(--color-status-ok-text)', label: 'Выполнено', dotColor: '#166534' },
    { value: processing, color: 'var(--color-status-new-text)', label: 'В обработке', dotColor: '#1D4ED8' },
    { value: assembly, color: 'var(--color-status-assembly-text)', label: 'Сборка', dotColor: '#92400E' },
    { value: problems, color: 'var(--color-status-problem-text)', label: 'Проблемы', dotColor: '#B91C1C' },
  ];

  const barColors = ['#166534', '#2563EB', '#D97706', '#EF4444'];

  return (
    <div>
      {/* Bar */}
      <div
        style={{
          height: 8,
          borderRadius: 4,
          overflow: 'hidden',
          display: 'flex',
          background: 'var(--color-border-light)',
        }}
      >
        {segments.map((seg, i) => (
          <div
            key={i}
            style={{
              width: `${pct(seg.value)}%`,
              background: barColors[i],
              transition: 'width 300ms ease',
            }}
          />
        ))}
      </div>
      {/* Legend */}
      <div className="flex flex-wrap gap-x-4 gap-y-1" style={{ marginTop: 10 }}>
        {segments.map((seg, i) => (
          <div key={i} className="flex items-center gap-1.5" style={{ fontSize: 12 }}>
            <span
              style={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                background: barColors[i],
                display: 'inline-block',
                flexShrink: 0,
              }}
            />
            <span style={{ color: 'var(--color-text-secondary)' }}>{seg.label}</span>
            <span className="font-dm" style={{ fontWeight: 600, color: 'var(--color-text-primary)' }}>
              {seg.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
