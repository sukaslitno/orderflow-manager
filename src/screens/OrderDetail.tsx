import { useState, useCallback } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Timeline from '../components/Timeline'
import Toast from '../components/Toast'
import { problemOrders, problemTypes } from '../data/mockData'

export default function OrderDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const order = problemOrders.find((o) => o.id === id) || problemOrders[0]

  const [selectedProblem, setSelectedProblem] = useState(order.problem)
  const [comment, setComment] = useState('')
  const [showToast, setShowToast] = useState(false)

  const handleResolve = () => {
    setShowToast(true)
    setTimeout(() => navigate('/'), 1500)
  }

  const handleDismissToast = useCallback(() => setShowToast(false), [])

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
            width: 36,
            height: 36,
            borderRadius: '50%',
            border: '1px solid var(--color-border)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'var(--color-surface)',
            cursor: 'pointer',
            fontSize: 16,
          }}
        >
          ←
        </button>
        <span className="font-dm" style={{ fontSize: 16, fontWeight: 600 }}>
          Заказ #{order.id}
        </span>
        <button
          style={{
            width: 36,
            height: 36,
            borderRadius: '50%',
            border: '1px solid var(--color-border)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'var(--color-surface)',
            cursor: 'pointer',
            fontSize: 18,
          }}
        >
          ⋯
        </button>
      </header>

      {/* Status Strip */}
      <div
        className="flex items-center justify-between"
        style={{
          background: 'var(--color-status-problem)',
          padding: '10px 20px',
        }}
      >
        <span className="font-dm" style={{ fontWeight: 700, fontSize: 14, color: 'var(--color-status-problem-text)' }}>
          ⚠️ Проблемный
        </span>
        {order.urgent ? (
          <span
            style={{
              fontSize: 11,
              fontWeight: 700,
              padding: '3px 10px',
              borderRadius: 20,
              background: 'var(--color-urgent)',
              color: '#fff',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 4,
            }}
          >
            <span className="animate-pulse-dot" style={{ width: 6, height: 6, borderRadius: '50%', background: '#fff', display: 'inline-block' }} />
            СРОЧНО
          </span>
        ) : (
          <span
            style={{
              fontSize: 11,
              fontWeight: 600,
              padding: '3px 10px',
              borderRadius: 20,
              background: 'var(--color-border-light)',
              color: 'var(--color-text-secondary)',
            }}
          >
            ⚪ Обычный
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
            <div className="font-inter" style={{ fontSize: 14 }}>23 марта, {order.time}</div>
          </div>
          <div>
            <div style={{ fontSize: 11, color: 'var(--color-text-tertiary)', marginBottom: 2 }}>Сумма</div>
            <div className="font-dm" style={{ fontSize: 14, fontWeight: 600, color: 'var(--color-urgent)' }}>
              ${Math.abs(order.amount).toFixed(2)}
            </div>
          </div>
          <div>
            <div style={{ fontSize: 11, color: 'var(--color-text-tertiary)', marginBottom: 2 }}>Статус</div>
            <span style={{ fontSize: 11, fontWeight: 600, padding: '2px 8px', borderRadius: 20, background: 'var(--color-status-problem)', color: 'var(--color-status-problem-text)' }}>
              Проблемный
            </span>
          </div>
        </div>
      </div>

      {/* Customer Card */}
      <div style={{ margin: '0 20px 16px', background: 'var(--color-surface)', borderRadius: 'var(--radius-lg)', padding: 16, border: '1px solid var(--color-border)' }}>
        <div style={{ fontSize: 12, color: 'var(--color-text-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 12, fontWeight: 500 }}>
          Клиент
        </div>
        <div className="flex items-center gap-3" style={{ marginBottom: 14 }}>
          <div
            className="font-dm"
            style={{
              width: 40,
              height: 40,
              borderRadius: '50%',
              background: 'var(--color-accent-blue)',
              color: '#fff',
              fontSize: 14,
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            {order.customer.split(' ').map(n => n[0]).join('')}
          </div>
          <div>
            <div className="font-dm" style={{ fontSize: 15, fontWeight: 600 }}>{order.customer}</div>
            <div style={{ fontSize: 12, color: 'var(--color-text-secondary)' }}>{order.email}</div>
          </div>
        </div>
        <div className="flex gap-2">
          <button
            className="active-scale"
            style={{
              flex: 1,
              padding: '8px 12px',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid var(--color-accent-blue)',
              color: 'var(--color-accent-blue)',
              background: 'transparent',
              fontSize: 13,
              fontWeight: 500,
              cursor: 'pointer',
            }}
          >
            📞 Позвонить
          </button>
          <button
            className="active-scale"
            style={{
              flex: 1,
              padding: '8px 12px',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid var(--color-accent-blue)',
              color: 'var(--color-accent-blue)',
              background: 'transparent',
              fontSize: 13,
              fontWeight: 500,
              cursor: 'pointer',
            }}
          >
            ✉️ Написать
          </button>
        </div>
      </div>

      {/* Problem Type */}
      <div style={{ margin: '0 20px 16px', background: 'var(--color-surface)', borderRadius: 'var(--radius-lg)', padding: 16, border: '1px solid var(--color-border)' }}>
        <div style={{ fontSize: 12, color: 'var(--color-text-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 10, fontWeight: 500 }}>
          Тип проблемы
        </div>
        <div style={{ position: 'relative' }}>
          <select
            value={selectedProblem}
            onChange={(e) => setSelectedProblem(e.target.value)}
            style={{
              width: '100%',
              padding: '12px 40px 12px 16px',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-md)',
              fontSize: 14,
              fontFamily: "'Inter', sans-serif",
              color: 'var(--color-text-primary)',
              background: 'var(--color-surface)',
              appearance: 'none',
              cursor: 'pointer',
              outline: 'none',
            }}
          >
            {problemTypes.map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
          <div style={{
            position: 'absolute',
            right: 14,
            top: '50%',
            transform: 'translateY(-50%)',
            pointerEvents: 'none',
            color: 'var(--color-text-tertiary)',
            fontSize: 12,
          }}>
            ▼
          </div>
        </div>
      </div>

      {/* Comment */}
      <div style={{ margin: '0 20px 16px', background: 'var(--color-surface)', borderRadius: 'var(--radius-lg)', padding: 16, border: '1px solid var(--color-border)' }}>
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
              width: '100%',
              minHeight: 80,
              padding: 12,
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-md)',
              fontSize: 14,
              fontFamily: "'Inter', sans-serif",
              color: 'var(--color-text-primary)',
              background: 'var(--color-surface)',
              resize: 'none',
              outline: 'none',
            }}
          />
          <div style={{
            position: 'absolute',
            bottom: 8,
            right: 12,
            fontSize: 11,
            color: 'var(--color-text-tertiary)',
          }}>
            {comment.length}/500
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div style={{ margin: '0 20px 16px', background: 'var(--color-surface)', borderRadius: 'var(--radius-lg)', padding: 16, border: '1px solid var(--color-border)' }}>
        <div style={{ fontSize: 12, color: 'var(--color-text-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 14, fontWeight: 500 }}>
          История
        </div>
        <Timeline events={order.timeline} />
      </div>

      {/* Fixed Bottom Actions */}
      <div
        style={{
          position: 'fixed',
          bottom: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '100%',
          maxWidth: 430,
          background: 'var(--color-surface)',
          borderTop: '1px solid var(--color-border)',
          padding: '12px 20px',
          paddingBottom: 'calc(12px + env(safe-area-inset-bottom, 0px))',
          display: 'flex',
          gap: 10,
          zIndex: 40,
        }}
      >
        <button
          className="active-scale"
          style={{
            flex: 1,
            padding: '12px 12px',
            borderRadius: 'var(--radius-xl)',
            background: 'transparent',
            color: 'var(--color-accent-blue)',
            fontSize: 13,
            fontWeight: 600,
            border: '1px solid var(--color-accent-blue)',
            cursor: 'pointer',
          }}
        >
          📞 Связаться
        </button>
        <button
          onClick={handleResolve}
          className="active-scale"
          style={{
            flex: 1,
            padding: '12px 12px',
            borderRadius: 'var(--radius-xl)',
            background: '#111',
            color: '#fff',
            fontSize: 13,
            fontWeight: 600,
            border: 'none',
            cursor: 'pointer',
          }}
        >
          ✅ Зафиксировать
        </button>
      </div>

      <Toast
        message="✓ Решение зафиксировано"
        visible={showToast}
        onDismiss={handleDismissToast}
      />
    </div>
  )
}
