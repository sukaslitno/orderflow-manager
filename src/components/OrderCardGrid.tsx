import { useNavigate } from 'react-router-dom'
import type { Order } from '../data/mockData'

interface OrderCardGridProps {
  order: Order;
}

export default function OrderCardGrid({ order }: OrderCardGridProps) {
  const navigate = useNavigate()

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
        borderTop: order.urgent ? '3px solid var(--color-urgent)' : '3px solid var(--color-status-assembly-text)',
      }}
    >
      {/* Top */}
      <div>
        <div className="flex items-center justify-between" style={{ marginBottom: 6 }}>
          <span className="font-dm" style={{ fontSize: 13, fontWeight: 600 }}>
            #{order.id}
          </span>
          {order.urgent && (
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

      {/* Bottom */}
      <div className="flex items-center justify-between">
        <span
          style={{
            fontSize: 10,
            fontWeight: 500,
            padding: '2px 6px',
            borderRadius: 20,
            background: 'var(--color-status-problem)',
            color: 'var(--color-status-problem-text)',
          }}
        >
          {order.problem}
        </span>
        <span className="font-dm" style={{ fontSize: 13, fontWeight: 600, color: 'var(--color-urgent)' }}>
          ${Math.abs(order.amount).toFixed(2)}
        </span>
      </div>
    </div>
  )
}
