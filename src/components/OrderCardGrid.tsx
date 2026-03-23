import { useNavigate } from 'react-router-dom'
import type { Order } from '../data/mockData'
import { STATUS_CONFIG, PROBLEM_TYPE_LABELS } from '../data/statusConfig'
import { formatRub } from '../utils/format'

interface OrderCardGridProps {
  order: Order;
}

export default function OrderCardGrid({ order }: OrderCardGridProps) {
  const navigate = useNavigate()
  const config = STATUS_CONFIG[order.status]
  const isProblem = order.status === 'problem'

  const chipLabel = isProblem && order.problemType
    ? PROBLEM_TYPE_LABELS[order.problemType]
    : config.label;

  return (
    <div
      onClick={() => navigate(`/order/${order.id}`)}
      className="active-scale"
      style={{
        background: 'var(--color-surface)',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--color-border)',
        minHeight: 140,
        padding: '12px',
        cursor: 'pointer',
        transition: 'transform 100ms ease',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        borderTop: `3px solid ${config.accentColor}`,
      }}
    >
      <div>
        <div className="flex items-center justify-between" style={{ marginBottom: 6 }}>
          <span className="font-dm" style={{ fontSize: 13, fontWeight: 600 }}>
            #{order.id}
          </span>
          {order.urgent === 'urgent' && (
            <span
              style={{
                fontSize: 9,
                fontWeight: 700,
                padding: '2px 5px',
                borderRadius: 4,
                background: 'var(--color-status-problem)',
                color: 'var(--color-status-problem-text)',
              }}
            >
              СРОЧНО
            </span>
          )}
        </div>
        <div
          className="font-inter"
          style={{
            fontSize: 13,
            color: 'var(--color-text-primary)',
            fontWeight: 500,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            marginBottom: 4,
          }}
        >
          {order.customer}
        </div>
      </div>

      <div className="flex items-center justify-between">
        <span
          style={{
            fontSize: 10,
            fontWeight: 500,
            padding: '2px 6px',
            borderRadius: 20,
            background: config.bgColor,
            color: config.textColor,
          }}
        >
          {chipLabel}
        </span>
        <span
          className="font-dm"
          style={{
            fontSize: 13,
            fontWeight: 600,
            color: isProblem ? 'var(--color-urgent)' : 'var(--color-text-primary)',
            opacity: order.status === 'shipped' ? 0.75 : 1,
          }}
        >
          {formatRub(order.amount)}
        </span>
      </div>
    </div>
  )
}
