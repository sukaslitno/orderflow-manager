import type { OrderStatus, ProblemType } from './mockData';

export const STATUS_CONFIG: Record<OrderStatus, {
  label: string;
  accentColor: string;
  bgColor: string;
  textColor: string;
  icon: string;
}> = {
  new: {
    label: 'Новый',
    accentColor: '#2563EB',
    bgColor: 'var(--color-status-new)',
    textColor: 'var(--color-status-new-text)',
    icon: '🆕',
  },
  assembly: {
    label: 'Сборка',
    accentColor: '#D97706',
    bgColor: 'var(--color-status-assembly)',
    textColor: 'var(--color-status-assembly-text)',
    icon: '📦',
  },
  shipped: {
    label: 'Отправлен',
    accentColor: '#059669',
    bgColor: 'var(--color-status-shipped)',
    textColor: 'var(--color-status-shipped-text)',
    icon: '✅',
  },
  problem: {
    label: 'Проблемный',
    accentColor: '#DC2626',
    bgColor: 'var(--color-status-problem)',
    textColor: 'var(--color-status-problem-text)',
    icon: '⚠️',
  },
};

export const PROBLEM_TYPE_LABELS: Record<NonNullable<ProblemType>, string> = {
  cancel: 'Отмена заказа',
  payment_error: 'Ошибка оплаты',
  return: 'Возврат товара',
  wrong_address: 'Неверный адрес',
  other: 'Другое',
};
