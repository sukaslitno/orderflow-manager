import type { TimelineEvent } from '../data/mockData'

interface TimelineProps {
  events: TimelineEvent[];
}

const dotColors: Record<TimelineEvent['color'], string> = {
  green: '#16A34A',
  amber: '#D97706',
  red: '#DC2626',
  blue: '#2563EB',
  gray: '#9CA3AF',
}

export default function Timeline({ events }: TimelineProps) {
  return (
    <div style={{ position: 'relative', paddingLeft: 20 }}>
      {events.map((event, i) => {
        const isLast = i === events.length - 1;
        return (
          <div
            key={i}
            style={{
              position: 'relative',
              paddingBottom: isLast ? 0 : 20,
              paddingLeft: 16,
            }}
          >
            <div
              style={{
                position: 'absolute',
                left: -4,
                top: 3,
                width: 8,
                height: 8,
                borderRadius: '50%',
                background: dotColors[event.color],
                zIndex: 2,
              }}
            />
            {!isLast && (
              <div
                style={{
                  position: 'absolute',
                  left: -1,
                  top: 13,
                  width: 2,
                  height: 'calc(100% - 8px)',
                  background: 'var(--color-border)',
                }}
              />
            )}
            <div>
              <div
                className="font-inter"
                style={{
                  fontSize: 13,
                  fontWeight: isLast ? 600 : 400,
                  color: isLast ? 'var(--color-text-primary)' : 'var(--color-text-secondary)',
                }}
              >
                {event.label}
              </div>
              <div style={{ fontSize: 11, color: 'var(--color-text-tertiary)', marginTop: 2 }}>
                {event.time}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  )
}
