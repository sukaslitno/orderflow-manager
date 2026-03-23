import { useNavigate } from 'react-router-dom'
import type { Order } from '../data/mockData'
import { STATUS_CONFIG, PROBLEM_TYPE_LABELS } from '../data/statusConfig'
import StatusBadge from './StatusBadge'

interface OrderCardProps {
  order: Order;
  showStatusBadge?: boolean;
}

const ACTION_LABELS: Record<Order['status'], { label: string; color: string; border: string }> = {
  problem: { label: 'Решить →', color: 'var(--color-accent-blue)', border: 'var(--color-accent-blue)' },
  new: { label: 'Взять в работу →', color: 'var(--color-accent-blue)', border: 'var(--color-accent-blue)' },
  assembly: { label: 'Детали →', color: 'var(--color-text-secondary)', border: 'var(--color-border)' },
  shipped: { label: 'Просмотр →', color: 'var(--color-text-secondary)', border: 'var(--color-border)' },
};

export default function OrderCard({ order, showStatusBadge = true }: OrderCardProps) {
  const navigate = useNavigate()
  const config = STATUS_CONFIG[order.status]
  const action = ACTION_LABELS[order.status]
  const isShipped = order.status === 'shipped'
  const isProblem = order.status === 'problem'

  const subLabel = isProblem && order.problemType
    ? PROBLEM_TYPE_LABELS[order.problemType]
    : order.items;

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
      <div style={{ width: 4, background: config.accentColor, flexShrink: 0 }} />

      <div style={{ flex: 1, padding: '12px 14px' }}>
        {/* Top row */}
        <div className="flex items-center justify-between" style={{ marginBottom: 4 }}>
          <div className="flex items-center gap-2">
            <span className="font-dm" style={{ fontSize: 14, fontWeight: 600 }}>
              #{order.id}
            </span>
            {order.urgent === 'urgent' && (
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
          <span
            className="font-dm"
            style={{
              fontSize: 14,
              fontWeight: 600,
              color: isProblem ? 'var(--color-urgent)' : 'var(--color-text-primary)',
              opacity: isShipped ? 0.75 : 1,
            }}
          >
            ${order.amount.toFixed(2)}
          </span>
        </div>

        {/* Middle row */}
        <div className="flex items-center justify-between" style={{ marginBottom: 6 }}>
          <span className="font-inter" style={{ fontSize: 12, color: 'var(--color-text-secondary)' }}>
            {order.customer} · {order.time}
          </span>
          <span className="font-inter" style={{ fontSize: 12, color: 'var(--color-text-tertiary)' }}>
            {subLabel}
          </span>
        </div>

        {/* Bottom row */}
        <div className="flex items-center justify-between">
          {showStatusBadge && <StatusBadge status={order.status} />}
          {!showStatusBadge && <div />}
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
              border: `1px solid ${action.border}`,
              color: action.color,
              background: 'transparent',
              cursor: 'pointer',
            }}
          >
            {action.label}
          </button>
        </div>
      </div>
    </div>
  )
}
