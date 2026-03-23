import { useNavigate } from 'react-router-dom'
import type { Order } from '../data/mockData'

interface OrderCardProps {
  order: Order;
}

export default function OrderCard({ order }: OrderCardProps) {
  const navigate = useNavigate()

  return (
    <div
      onClick={() => navigate(`/order/${order.id}`)}
      className="active-scale"
      style={{
        background: 'var(--color-surface)',
        borderRadius: 'var(--radius-md)',
        border: '1px solid var(--color-border)',
        marginBottom: 8,
        overflow: 'hidden',
        display: 'flex',
        cursor: 'pointer',
        transition: 'transform 100ms ease',
      }}
    >
      {/* Left accent bar */}
      <div style={{ width: 4, background: 'var(--color-urgent)', flexShrink: 0 }} />

      {/* Content */}
      <div style={{ flex: 1, padding: '12px 14px' }}>
        {/* Top row */}
        <div className="flex items-center justify-between" style={{ marginBottom: 4 }}>
          <div className="flex items-center gap-2">
            <span className="font-dm" style={{ fontSize: 14, fontWeight: 600 }}>
              #{order.id}
            </span>
            {order.urgent && (
              <span
                style={{
                  fontSize: 10,
                  fontWeight: 700,
                  padding: '2px 6px',
                  borderRadius: 4,
                  background: 'var(--color-status-problem)',
                  color: 'var(--color-status-problem-text)',
                  letterSpacing: '0.3px',
                }}
              >
                СРОЧНО
              </span>
            )}
          </div>
          <span className="font-dm" style={{ fontSize: 14, fontWeight: 600, color: 'var(--color-urgent)' }}>
            ${Math.abs(order.amount).toFixed(2)}
          </span>
        </div>

        {/* Middle row */}
        <div className="flex items-center justify-between" style={{ marginBottom: 6 }}>
          <span className="font-inter" style={{ fontSize: 12, color: 'var(--color-text-secondary)' }}>
            {order.customer} · {order.time}
          </span>
          <span className="font-inter" style={{ fontSize: 12, color: 'var(--color-text-tertiary)' }}>
            {order.problem}
          </span>
        </div>

        {/* Bottom row */}
        <div className="flex items-center justify-between">
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 4,
              fontSize: 11,
              fontWeight: 500,
              padding: '3px 8px',
              borderRadius: 20,
              background: 'var(--color-status-problem)',
              color: 'var(--color-status-problem-text)',
            }}
          >
            ⚠️ Проблемный
          </span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/order/${order.id}`);
            }}
            style={{
              fontSize: 11,
              fontWeight: 600,
              padding: '4px 12px',
              borderRadius: 20,
              border: '1px solid var(--color-accent-blue)',
              color: 'var(--color-accent-blue)',
              background: 'transparent',
              cursor: 'pointer',
            }}
          >
            Решить →
          </button>
        </div>
      </div>
    </div>
  )
}
