import { useState, useMemo } from 'react'
import Header from '../components/Header'
import StatusBanner from '../components/StatusBanner'
import MetricCard from '../components/MetricCard'
import ProgressBar from '../components/ProgressBar'
import SegmentedControl from '../components/SegmentedControl'
import OrderCard from '../components/OrderCard'
import OrderCardGrid from '../components/OrderCardGrid'
import { orders, metrics, progressData } from '../data/mockData'
import type { OrderStatus } from '../data/mockData'

const STATUS_ORDER: OrderStatus[] = ['problem', 'assembly', 'new', 'shipped'];

const FILTER_OPTIONS: { key: OrderStatus | 'all'; label: string }[] = [
  { key: 'all', label: 'Все' },
  { key: 'new', label: 'Новые' },
  { key: 'assembly', label: 'Сборка' },
  { key: 'problem', label: 'Проблемные' },
  { key: 'shipped', label: 'Отправлены' },
];

const SECTION_TITLES: Record<OrderStatus | 'all', string> = {
  all: 'Все заказы',
  new: 'Новые заказы',
  assembly: 'Заказы в сборке',
  problem: 'Проблемные заказы',
  shipped: 'Отправленные заказы',
};

const STATUS_EMPTY_ICONS: Record<OrderStatus | 'all', string> = {
  all: '📋',
  new: '🆕',
  assembly: '📦',
  problem: '⚠️',
  shipped: '✅',
};

export default function Dashboard() {
  const [viewMode, setViewMode] = useState(0)
  const [statusFilter, setStatusFilter] = useState<OrderStatus | 'all'>('all')

  const sortedOrders = useMemo(() => {
    return [...orders].sort((a, b) => {
      const ai = STATUS_ORDER.indexOf(a.status);
      const bi = STATUS_ORDER.indexOf(b.status);
      if (ai !== bi) return ai - bi;
      if (a.urgent === 'urgent' && b.urgent !== 'urgent') return -1;
      if (a.urgent !== 'urgent' && b.urgent === 'urgent') return 1;
      return 0;
    });
  }, []);

  const filteredOrders = useMemo(() => {
    if (statusFilter === 'all') return sortedOrders;
    return sortedOrders.filter((o) => o.status === statusFilter);
  }, [sortedOrders, statusFilter]);

  const problemCount = orders.filter((o) => o.status === 'problem' && o.urgent === 'urgent').length;

  return (
    <div style={{ paddingBottom: 90 }}>
      <Header />
      <StatusBanner count={problemCount} />

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

      {/* Filter pills */}
      <div
        style={{
          padding: '16px 20px 0',
          overflowX: 'auto',
          whiteSpace: 'nowrap',
          display: 'flex',
          gap: 8,
          msOverflowStyle: 'none',
          scrollbarWidth: 'none',
        }}
      >
        {FILTER_OPTIONS.map((opt) => (
          <button
            key={opt.key}
            onClick={() => setStatusFilter(opt.key)}
            style={{
              padding: '6px 14px',
              borderRadius: 20,
              fontSize: 13,
              fontWeight: 500,
              fontFamily: "'Inter', sans-serif",
              border: 'none',
              cursor: 'pointer',
              flexShrink: 0,
              transition: 'all 150ms ease',
              background: statusFilter === opt.key ? '#111' : 'var(--color-border-light)',
              color: statusFilter === opt.key ? '#fff' : 'var(--color-text-secondary)',
            }}
          >
            {opt.label}
          </button>
        ))}
      </div>

      {/* Orders */}
      <div style={{ padding: '16px 20px 0' }}>
        <div className="flex items-center justify-between" style={{ marginBottom: 12 }}>
          <div className="flex items-center gap-2">
            <h2 className="font-dm" style={{ fontSize: 16, fontWeight: 600 }}>
              {SECTION_TITLES[statusFilter]}
            </h2>
            <span
              style={{
                background: '#F0EFF0',
                color: '#6B6B6B',
                borderRadius: 10,
                padding: '2px 8px',
                fontSize: 12,
                fontWeight: 500,
                fontFamily: "'Inter', sans-serif",
              }}
            >
              {filteredOrders.length}
            </span>
          </div>
          {statusFilter === 'problem' && (
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
          )}
        </div>

        {filteredOrders.length === 0 ? (
          <div
            style={{
              textAlign: 'center',
              padding: '40px 20px',
              color: 'var(--color-text-tertiary)',
            }}
          >
            <div style={{ fontSize: 40, marginBottom: 12 }}>
              {STATUS_EMPTY_ICONS[statusFilter]}
            </div>
            <div className="font-dm" style={{ fontSize: 16, fontWeight: 600, color: 'var(--color-text-secondary)', marginBottom: 4 }}>
              Нет заказов
            </div>
            <div style={{ fontSize: 13 }}>
              {SECTION_TITLES[statusFilter]} не найдено
            </div>
          </div>
        ) : viewMode === 0 ? (
          <div className="animate-fade-in">
            {filteredOrders.map((order) => (
              <OrderCard
                key={order.id}
                order={order}
                showStatusBadge={statusFilter === 'all'}
              />
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
            {filteredOrders.map((order) => (
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
          onClick={() => setStatusFilter('problem')}
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
