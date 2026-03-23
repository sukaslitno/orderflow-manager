export interface Order {
  id: string;
  customer: string;
  email: string;
  time: string;
  amount: number;
  problem: string;
  urgent: boolean;
  status: 'problem' | 'new' | 'assembly' | 'shipped';
  timeline: TimelineEvent[];
}

export interface TimelineEvent {
  label: string;
  time: string;
  date: string;
  color: 'green' | 'yellow' | 'red';
  current?: boolean;
}

export const problemOrders: Order[] = [
  {
    id: 'ORD-2891',
    customer: 'Иван Петров',
    email: 'ivan.petrov@email.com',
    time: '14:23',
    amount: -340.00,
    problem: 'Ошибка оплаты',
    urgent: true,
    status: 'problem',
    timeline: [
      { label: 'Заказ создан', time: '09:00', date: '23 марта', color: 'green' },
      { label: 'Перешёл в обработку', time: '11:30', date: '23 марта', color: 'yellow' },
      { label: 'Проблема зафиксирована', time: '14:23', date: '23 марта', color: 'red', current: true },
    ],
  },
  {
    id: 'ORD-2847',
    customer: 'Мария Смирнова',
    email: 'maria.smirnova@email.com',
    time: '13:11',
    amount: -1240.00,
    problem: 'Неверный адрес',
    urgent: true,
    status: 'problem',
    timeline: [
      { label: 'Заказ создан', time: '08:45', date: '23 марта', color: 'green' },
      { label: 'Перешёл в обработку', time: '10:00', date: '23 марта', color: 'yellow' },
      { label: 'Проблема зафиксирована', time: '13:11', date: '23 марта', color: 'red', current: true },
    ],
  },
  {
    id: 'ORD-2839',
    customer: 'Алексей Козлов',
    email: 'alexey.kozlov@email.com',
    time: '11:45',
    amount: -89.99,
    problem: 'Возврат',
    urgent: false,
    status: 'problem',
    timeline: [
      { label: 'Заказ создан', time: '07:30', date: '23 марта', color: 'green' },
      { label: 'Перешёл в обработку', time: '09:15', date: '23 марта', color: 'yellow' },
      { label: 'Проблема зафиксирована', time: '11:45', date: '23 марта', color: 'red', current: true },
    ],
  },
  {
    id: 'ORD-2821',
    customer: 'Екатерина Новак',
    email: 'ekaterina.novak@email.com',
    time: '10:30',
    amount: -560.00,
    problem: 'Отмена заказа',
    urgent: false,
    status: 'problem',
    timeline: [
      { label: 'Заказ создан', time: '06:00', date: '23 марта', color: 'green' },
      { label: 'Перешёл в обработку', time: '08:45', date: '23 марта', color: 'yellow' },
      { label: 'Проблема зафиксирована', time: '10:30', date: '23 марта', color: 'red', current: true },
    ],
  },
  {
    id: 'ORD-2815',
    customer: 'Дмитрий Волков',
    email: 'dmitry.volkov@email.com',
    time: '09:15',
    amount: -220.00,
    problem: 'Ошибка оплаты',
    urgent: true,
    status: 'problem',
    timeline: [
      { label: 'Заказ создан', time: '05:30', date: '23 марта', color: 'green' },
      { label: 'Перешёл в обработку', time: '07:00', date: '23 марта', color: 'yellow' },
      { label: 'Проблема зафиксирована', time: '09:15', date: '23 марта', color: 'red', current: true },
    ],
  },
];

export const metrics = {
  newOrders: 47,
  assembly: 12,
  problems: 3,
};

export const progressData = {
  shipped: 68,
  processing: 20,
  assembly: 8,
  problems: 3,
};

export const problemTypes = [
  'Ошибка оплаты',
  'Неверный адрес',
  'Возврат товара',
  'Отмена заказа',
  'Другое',
];
