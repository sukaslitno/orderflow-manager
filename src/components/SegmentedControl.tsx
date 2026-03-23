interface SegmentedControlProps {
  options: string[];
  selected: number;
  onChange: (index: number) => void;
}

export default function SegmentedControl({ options, selected, onChange }: SegmentedControlProps) {
  return (
    <div
      style={{
        display: 'inline-flex',
        background: 'var(--color-border-light)',
        borderRadius: 'var(--radius-sm)',
        padding: 3,
        gap: 2,
      }}
    >
      {options.map((opt, i) => (
        <button
          key={i}
          onClick={() => onChange(i)}
          style={{
            padding: '6px 16px',
            borderRadius: 6,
            fontSize: 13,
            fontWeight: 500,
            border: 'none',
            cursor: 'pointer',
            transition: 'all 200ms ease',
            background: selected === i ? 'var(--color-accent)' : 'transparent',
            color: selected === i ? '#FFFFFF' : 'var(--color-text-secondary)',
          }}
        >
          {opt}
        </button>
      ))}
    </div>
  )
}
