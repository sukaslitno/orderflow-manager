import { useState, useCallback } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Timeline from '../components/Timeline'
import StatusBadge from '../components/StatusBadge'
import Toast from '../components/Toast'
import { orders, problemTypeOptions } from '../data/mockData'
import { STATUS_CONFIG, PROBLEM_TYPE_LABELS } from '../data/statusConfig'
import { formatRub, formatItemsCount } from '../utils/format'

const TOAST_MESSAGES: Record<string, string> = {
  problem: '✓ Решение зафиксировано',
  new: '▶ Заказ взят в работу',
  assembly: '📦 Заказ отмечен как собранный',
  shipped: '✓ Доставка подтверждена',
};

const ACTION_CONFIG: Record<string, {
  left: { label: string; color: string; border: string };
  right: { label: string; bg: string; color: string };
}> = {
  problem: {
    left: { label: '📞 Связаться', color: 'var(--color-accent-blue)', border: 'var(--color-accent-blue)' },
    right: { label: '✅ Зафиксировать', bg: '#111', color: '#fff' },
  },
  new: {
    left: { label: '📋 Детали', color: 'var(--color-text-secondary)', border: 'var(--color-border)' },
    right: { label: '▶ Взять в работу', bg: '#111', color: '#fff' },
  },
  assembly: {
    left: { label: '📞 Связаться', color: 'var(--color-accent-blue)', border: 'var(--color-accent-blue)' },
    right: { label: '📦 Отметить собранным', bg: '#D97706', color: '#fff' },
  },
  shipped: {
    left: { label: '📋 Детали', color: 'var(--color-text-secondary)', border: 'var(--color-border)' },
    right: { label: '✓ Подтвердить доставку', bg: '#059669', color: '#fff' },
  },
};

const ASSEMBLY_CHECKLIST = [
  'Проверить комплектацию по накладной',
  'Упаковать в фирменный пакет',
  'Прикрепить накладную и стикер с адресом',
  'Взвесить и записать вес посылки',
];

export default function OrderDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const order = orders.find((o) => o.id === id) || orders[0]
  const config = STATUS_CONFIG[order.status]
  const actions = ACTION_CONFIG[order.status]

  const [selectedProblem, setSelectedProblem] = useState(
    order.problemType ? PROBLEM_TYPE_LABELS[order.problemType] : problemTypeOptions[0].label
  )
  const [comment, setComment] = useState('')
  const [showToast, setShowToast] = useState(false)
  const [checklist, setChecklist] = useState(ASSEMBLY_CHECKLIST.map(() => false))

  const handleAction = () => {
    setShowToast(true)
    setTimeout(() => navigate('/'), 1500)
  }

  const handleDismissToast = useCallback(() => setShowToast(false), [])

  const cardStyle = {
    margin: '0 20px 16px',
    background: 'var(--color-surface)',
    borderRadius: 'var(--radius-lg)',
    padding: 16,
    border: '1px solid var(--color-border)',
  } as const;

  const sectionTitle = {
    fontSize: 12,
    color: 'var(--color-text-secondary)',
    textTransform: 'uppercase' as const,
    letterSpacing: '0.5px',
    marginBottom: 12,
    fontWeight: 500,
  };

  return (
    <div style={{ paddingBottom: 90, background: 'var(--color-bg)', minHeight: '100vh' }}>
      {/* Header */}
      <header
        className="sticky top-0 z-50 flex items-center justify-between"
        style={{
          height: 56,
          padding: '0 20px',
          background: 'var(--color-surface)',
          borderBottom: '1px solid var(--color-border)',
        }}
      >
        <button
          onClick={() => navigate('/')}
          className="active-scale"
          style={{
            width: 36, height: 36, borderRadius: '50%',
            border: '1px solid var(--color-border)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: 'var(--color-surface)', cursor: 'pointer', fontSize: 16,
          }}
        >
          ←
        </button>
        <span className="font-dm" style={{ fontSize: 16, fontWeight: 600 }}>
          Заказ #{order.id}
        </span>
        <button
          style={{
            width: 36, height: 36, borderRadius: '50%',
            border: '1px solid var(--color-border)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: 'var(--color-surface)', cursor: 'pointer', fontSize: 18,
          }}
        >
          ⋯
        </button>
      </header>

      {/* Status Strip */}
      <div
        className="flex items-center justify-between"
        style={{ background: config.bgColor, padding: '10px 20px' }}
      >
        <span className="font-dm" style={{ fontWeight: 700, fontSize: 14, color: config.textColor }}>
          {config.icon} {config.label}
        </span>
        {order.status === 'problem' ? (
          order.urgent === 'urgent' ? (
            <span
              style={{
                fontSize: 11, fontWeight: 700, padding: '3px 10px',
                borderRadius: 20, background: 'var(--color-urgent)', color: '#fff',
                display: 'inline-flex', alignItems: 'center', gap: 4,
              }}
            >
              <span className="animate-pulse-dot" style={{ width: 6, height: 6, borderRadius: '50%', background: '#fff', display: 'inline-block' }} />
              СРОЧНО
            </span>
          ) : (
            <span
              style={{
                fontSize: 11, fontWeight: 600, padding: '3px 10px',
                borderRadius: 20, background: 'var(--color-border-light)', color: 'var(--color-text-secondary)',
              }}
            >
              ● Обычный
            </span>
          )
        ) : (
          <span style={{ fontSize: 12, color: config.textColor, fontWeight: 500 }}>
            {formatItemsCount(order.items)}
          </span>
        )}
      </div>

      {/* Order Meta */}
      <div style={{ margin: '16px 20px', background: 'var(--color-surface)', borderRadius: 'var(--radius-lg)', padding: 16, border: '1px solid var(--color-border)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px 16px' }}>
          <div>
            <div style={{ fontSize: 11, color: 'var(--color-text-tertiary)', marginBottom: 2 }}>Заказ</div>
            <div className="font-dm" style={{ fontSize: 14, fontWeight: 600 }}>#{order.id}</div>
          </div>
          <div>
            <div style={{ fontSize: 11, color: 'var(--color-text-tertiary)', marginBottom: 2 }}>Дата</div>
            <div className="font-inter" style={{ fontSize: 14 }}>{order.date}</div>
          </div>
          <div>
            <div style={{ fontSize: 11, color: 'var(--color-text-tertiary)', marginBottom: 2 }}>Сумма</div>
            <div
              className="font-dm"
              style={{
                fontSize: 14,
                fontWeight: 600,
                color: order.status === 'problem' ? 'var(--color-urgent)' : 'var(--color-text-primary)',
              }}
            >
              {formatRub(order.amount)}
            </div>
          </div>
          <div>
            <div style={{ fontSize: 11, color: 'var(--color-text-tertiary)', marginBottom: 2 }}>Статус</div>
            <StatusBadge status={order.status} />
          </div>
        </div>
      </div>

      {/* Order Items */}
      <div style={cardStyle}>
        <div style={sectionTitle}>Состав заказа</div>
        <div>
          {order.items.map((item, i) => (
            <div
              key={i}
              className="flex items-center justify-between gap-3"
              style={{
                padding: '10px 0',
                borderBottom: i < order.items.length - 1 ? '1px solid var(--color-border-light)' : 'none',
              }}
            >
              <span
                className="font-inter"
                style={{
                  fontSize: 14,
                  color: 'var(--color-text-primary)',
                  flex: 1,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
              >
                {item.name}
              </span>
              <span
                className="font-inter"
                style={{
                  fontSize: 13,
                  color: 'var(--color-text-secondary)',
                  whiteSpace: 'nowrap',
                  flexShrink: 0,
                }}
              >
                {item.qty} × {formatRub(item.price)}
              </span>
            </div>
          ))}
          <div
            className="flex items-center justify-between"
            style={{
              marginTop: 4,
              background: 'var(--color-bg)',
              borderRadius: 'var(--radius-sm)',
              padding: '10px 8px',
              marginLeft: -8,
              marginRight: -8,
            }}
          >
            <span className="font-dm" style={{ fontSize: 14, fontWeight: 600 }}>Итого</span>
            <span className="font-dm" style={{ fontSize: 14, fontWeight: 600 }}>{formatRub(order.amount)}</span>
          </div>
        </div>
      </div>

      {/* Customer Card */}
      <div style={cardStyle}>
        <div style={sectionTitle}>Клиент</div>
        <div className="flex items-center gap-3" style={{ marginBottom: 14 }}>
          <div
            className="font-dm"
            style={{
              width: 40, height: 40, borderRadius: '50%',
              background: 'var(--color-accent-blue)', color: '#fff',
              fontSize: 14, fontWeight: 600,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            {order.customer.split(' ').map(n => n[0]).join('')}
          </div>
          <div>
            <div className="font-dm" style={{ fontSize: 15, fontWeight: 600 }}>{order.customer}</div>
            <div style={{ fontSize: 12, color: 'var(--color-text-secondary)' }}>{order.customerEmail}</div>
            <div style={{ fontSize: 13, color: 'var(--color-text-secondary)', marginTop: 2 }}>
              📞 {order.customerPhone}
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <button className="active-scale" style={{ flex: 1, padding: '8px 12px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-accent-blue)', color: 'var(--color-accent-blue)', background: 'transparent', fontSize: 13, fontWeight: 500, cursor: 'pointer' }}>
            📞 Позвонить
          </button>
          <button className="active-scale" style={{ flex: 1, padding: '8px 12px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-accent-blue)', color: 'var(--color-accent-blue)', background: 'transparent', fontSize: 13, fontWeight: 500, cursor: 'pointer' }}>
            ✉️ Написать
          </button>
        </div>
      </div>

      {/* Problem-specific sections */}
      {order.status === 'problem' && (
        <>
          <div style={cardStyle}>
            <div style={sectionTitle}>Тип проблемы</div>
            <div style={{ position: 'relative' }}>
              <select
                value={selectedProblem}
                onChange={(e) => setSelectedProblem(e.target.value)}
                style={{
                  width: '100%', padding: '12px 40px 12px 16px',
                  border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)',
                  fontSize: 14, fontFamily: "'Inter', sans-serif",
                  color: 'var(--color-text-primary)', background: 'var(--color-surface)',
                  appearance: 'none', cursor: 'pointer', outline: 'none',
                }}
              >
                {problemTypeOptions.map((opt) => (
                  <option key={opt.value} value={opt.label}>{opt.label}</option>
                ))}
              </select>
              <div style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: 'var(--color-text-tertiary)', fontSize: 12 }}>
                ▼
              </div>
            </div>
          </div>

          <div style={cardStyle}>
            <div style={{ marginBottom: 10 }}>
              <span style={{ fontSize: 12, color: 'var(--color-text-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: 500 }}>
                Комментарий
              </span>
              <span style={{ fontSize: 12, color: 'var(--color-text-tertiary)', marginLeft: 6 }}>
                (необязательно)
              </span>
            </div>
            <div style={{ position: 'relative' }}>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value.slice(0, 500))}
                placeholder="Опишите детали проблемы..."
                style={{
                  width: '100%', minHeight: 80, padding: 12,
                  border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)',
                  fontSize: 14, fontFamily: "'Inter', sans-serif",
                  color: 'var(--color-text-primary)', background: 'var(--color-surface)',
                  resize: 'none', outline: 'none',
                }}
              />
              <div style={{ position: 'absolute', bottom: 8, right: 12, fontSize: 11, color: 'var(--color-text-tertiary)' }}>
                {comment.length}/500
              </div>
            </div>
          </div>
        </>
      )}

      {/* Assembly checklist */}
      {order.status === 'assembly' && (
        <div style={cardStyle}>
          <div style={sectionTitle}>Сборка</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {ASSEMBLY_CHECKLIST.map((item, i) => (
              <label key={i} className="flex items-center gap-3" style={{ cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={checklist[i]}
                  onChange={() => {
                    const next = [...checklist];
                    next[i] = !next[i];
                    setChecklist(next);
                  }}
                  style={{
                    width: 18, height: 18, borderRadius: 4,
                    accentColor: '#111', cursor: 'pointer', flexShrink: 0,
                  }}
                />
                <span
                  className="font-inter"
                  style={{
                    fontSize: 14,
                    color: checklist[i] ? 'var(--color-text-tertiary)' : 'var(--color-text-primary)',
                    textDecoration: checklist[i] ? 'line-through' : 'none',
                  }}
                >
                  {item}
                </span>
              </label>
            ))}
          </div>
        </div>
      )}

      {/* Delivery Card — all statuses */}
      <div style={cardStyle}>
        <div style={sectionTitle}>Доставка</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <InfoRow label="Служба" value={order.deliveryService} />
          <InfoRow label="Адрес" value={order.address} />
          <InfoRow label="Трек" value={order.trackNumber || '—'} mono={!!order.trackNumber} />
          <InfoRow label="Ожидается" value={order.estimatedDelivery || '—'} />
          <InfoRow label="Оплата" value={order.paymentMethod} />
        </div>
      </div>

      {/* Timeline */}
      <div style={cardStyle}>
        <div style={sectionTitle}>История</div>
        <Timeline events={order.timeline} />
      </div>

      {/* Fixed Bottom Actions */}
      <div
        style={{
          position: 'fixed', bottom: 0, left: '50%', transform: 'translateX(-50%)',
          width: '100%', maxWidth: 430, background: 'var(--color-surface)',
          borderTop: '1px solid var(--color-border)',
          padding: '12px 20px',
          paddingBottom: 'calc(12px + env(safe-area-inset-bottom, 0px))',
          display: 'flex', gap: 10, zIndex: 40,
        }}
      >
        <button
          className="active-scale"
          style={{
            flex: 1, padding: '12px 12px', borderRadius: 'var(--radius-xl)',
            background: 'transparent', color: actions.left.color,
            fontSize: 13, fontWeight: 600,
            border: `1px solid ${actions.left.border}`, cursor: 'pointer',
          }}
        >
          {actions.left.label}
        </button>
        <button
          onClick={handleAction}
          className="active-scale"
          style={{
            flex: 1, padding: '12px 12px', borderRadius: 'var(--radius-xl)',
            background: actions.right.bg, color: actions.right.color,
            fontSize: 13, fontWeight: 600, border: 'none', cursor: 'pointer',
          }}
        >
          {actions.right.label}
        </button>
      </div>

      <Toast
        message={TOAST_MESSAGES[order.status]}
        visible={showToast}
        onDismiss={handleDismissToast}
      />
    </div>
  )
}

function InfoRow({ label, value, mono }: { label: string; value: string; mono?: boolean }) {
  return (
    <div className="flex justify-between items-start gap-4">
      <span style={{ fontSize: 13, color: 'var(--color-text-secondary)', flexShrink: 0 }}>{label}</span>
      <span
        className={mono ? '' : 'font-inter'}
        style={{
          fontSize: 13,
          fontWeight: mono ? 600 : 400,
          fontFamily: mono ? "'Courier New', monospace" : undefined,
          color: 'var(--color-text-primary)',
          textAlign: 'right',
        }}
      >
        {value}
      </span>
    </div>
  );
}
