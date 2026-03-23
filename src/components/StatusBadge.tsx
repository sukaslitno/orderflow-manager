import type { OrderStatus } from '../data/mockData';
import { STATUS_CONFIG } from '../data/statusConfig';

interface StatusBadgeProps {
  status: OrderStatus;
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  const config = STATUS_CONFIG[status];
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 4,
        fontSize: 11,
        fontWeight: 500,
        padding: '3px 8px',
        borderRadius: 20,
        background: config.bgColor,
        color: config.textColor,
        whiteSpace: 'nowrap',
      }}
    >
      {config.icon} {config.label}
    </span>
  );
}
