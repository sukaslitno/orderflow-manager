import { useState } from 'react'
import Header from '../components/Header'
import StatusBanner from '../components/StatusBanner'
import MetricCard from '../components/MetricCard'
import ProgressBar from '../components/ProgressBar'
import SegmentedControl from '../components/SegmentedControl'
import OrderCard from '../components/OrderCard'
import OrderCardGrid from '../components/OrderCardGrid'
import { problemOrders, metrics, progressData } from '../data/mockData'

export default function Dashboard() {
  const [viewMode, setViewMode] = useState(0)

  return (
    <div style={{ paddingBottom: 90 }}>
      <Header />
      <StatusBanner count={metrics.problems} />

      {/* Metrics */}
      <div className="flex gap-3" style={{ padding: '16px 20px 0' }}>
        <MetricCard
          icon="🆕"
          label="Новые"
          value={metrics.newOrders}
          badgeText="за сегодня"
          badgeColor="blue"
        />
        <MetricCard
          icon="📦"
          label="Сборка"
          value={metrics.assembly}
          badgeText="ожидают"
          badgeColor="amber"
        />
        <MetricCard
          icon="⚠️"
          label="Проблемные"
          value={metrics.problems}
          badgeText="срочно!"
          badgeColor="red"
          showPulse
        />
      </div>

      {/* Progress */}
      <div style={{ padding: '24px 20px 0' }}>
        <h2 className="font-dm" style={{ fontSize: 16, fontWeight: 600, marginBottom: 12 }}>
          Статус заказов сегодня
        </h2>
        <ProgressBar
          shipped={progressData.shipped}
          processing={progressData.processing}
          assembly={progressData.assembly}
          problems={progressData.problems}
        />
      </div>

      {/* Toggle */}
      <div style={{ padding: '20px 20px 0' }}>
        <SegmentedControl
          options={['Список', 'Карточки']}
          selected={viewMode}
          onChange={setViewMode}
        />
      </div>

      {/* Problem Orders */}
      <div style={{ padding: '16px 20px 0' }}>
        <div className="flex items-center justify-between" style={{ marginBottom: 12 }}>
          <h2 className="font-dm" style={{ fontSize: 16, fontWeight: 600 }}>
            Проблемные заказы
          </h2>
          <button
            style={{
              fontSize: 13,
              fontWeight: 500,
              color: 'var(--color-accent-blue)',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            Все →
          </button>
        </div>

        {viewMode === 0 ? (
          <div className="animate-fade-in">
            {problemOrders.map((order) => (
              <OrderCard key={order.id} order={order} />
            ))}
          </div>
        ) : (
          <div
            className="animate-fade-in"
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 12,
            }}
          >
            {problemOrders.map((order) => (
              <OrderCardGrid key={order.id} order={order} />
            ))}
          </div>
        )}
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
            padding: '12px 16px',
            borderRadius: 'var(--radius-xl)',
            background: '#111',
            color: '#fff',
            fontSize: 13,
            fontWeight: 600,
            border: 'none',
            cursor: 'pointer',
          }}
        >
          + Добавить заказ
        </button>
        <button
          className="active-scale"
          style={{
            flex: 1,
            padding: '12px 16px',
            borderRadius: 'var(--radius-xl)',
            background: 'transparent',
            color: 'var(--color-urgent)',
            fontSize: 13,
            fontWeight: 600,
            border: '1px solid var(--color-urgent)',
            cursor: 'pointer',
          }}
        >
          ⚠️ Все проблемные
        </button>
      </div>
    </div>
  )
}
