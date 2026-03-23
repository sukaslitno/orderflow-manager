import type { TimelineEvent } from '../data/mockData'

interface TimelineProps {
  events: TimelineEvent[];
}

const dotColors = {
  green: '#166534',
  yellow: '#D97706',
  red: '#EF4444',
}

export default function Timeline({ events }: TimelineProps) {
  return (
    <div style={{ position: 'relative', paddingLeft: 20 }}>
      {events.map((event, i) => (
        <div
          key={i}
          style={{
            position: 'relative',
            paddingBottom: i < events.length - 1 ? 20 : 0,
            paddingLeft: 16,
          }}
        >
          {/* Dot */}
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
          {/* Line */}
          {i < events.length - 1 && (
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
          {/* Content */}
          <div>
            <div
              className="font-inter"
              style={{
                fontSize: 13,
                fontWeight: event.current ? 600 : 400,
                color: event.current ? 'var(--color-text-primary)' : 'var(--color-text-secondary)',
              }}
            >
              {event.label}
            </div>
            <div style={{ fontSize: 11, color: 'var(--color-text-tertiary)', marginTop: 2 }}>
              {event.time}, {event.date}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
