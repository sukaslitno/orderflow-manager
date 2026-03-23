export type OrderStatus = 'new' | 'assembly' | 'shipped' | 'problem';
export type ProblemType = 'cancel' | 'payment_error' | 'return' | 'wrong_address' | 'other' | null;
export type UrgencyLevel = 'urgent' | 'normal' | null;

export interface Order {
  id: string;
  customer: string;
  customerEmail: string;
  customerPhone: string;
  time: string;
  date: string;
  amount: number;
  status: OrderStatus;
  problemType: ProblemType;
  urgent: UrgencyLevel;
  items: string;
  address: string;
  timeline: TimelineEvent[];
}

export interface TimelineEvent {
  label: string;
  time: string;
  color: 'green' | 'amber' | 'red' | 'blue' | 'gray';
}

export const orders: Order[] = [
  {
    id: 'ORD-2891',
    customer: 'Иван Петров',
    customerEmail: 'ivan.petrov@email.com',
    customerPhone: '+7 999 123 45 67',
    time: '14:23',
    date: '23 марта, 14:23',
    amount: 340.00,
    status: 'problem',
    problemType: 'payment_error',
    urgent: 'urgent',
    items: '2 товара',
    address: 'Москва, ул. Ленина, 12, кв. 34',
    timeline: [
      { label: 'Заказ создан', time: '09:00, 23 марта', color: 'green' },
      { label: 'Перешёл в обработку', time: '11:30, 23 марта', color: 'amber' },
      { label: 'Проблема зафиксирована', time: '14:23, 23 марта', color: 'red' },
    ],
  },
  {
    id: 'ORD-2847',
    customer: 'Мария Смирнова',
    customerEmail: 'maria.s@email.com',
    customerPhone: '+7 999 234 56 78',
    time: '13:11',
    date: '23 марта, 13:11',
    amount: 1240.00,
    status: 'problem',
    problemType: 'wrong_address',
    urgent: 'urgent',
    items: '5 товаров',
    address: 'Санкт-Петербург, пр. Невский, 88',
    timeline: [
      { label: 'Заказ создан', time: '08:00, 23 марта', color: 'green' },
      { label: 'Передан в сборку', time: '10:00, 23 марта', color: 'amber' },
      { label: 'Неверный адрес', time: '13:11, 23 марта', color: 'red' },
    ],
  },
  {
    id: 'ORD-2839',
    customer: 'Алексей Козлов',
    customerEmail: 'alexey.k@email.com',
    customerPhone: '+7 999 345 67 89',
    time: '11:45',
    date: '23 марта, 11:45',
    amount: 89.99,
    status: 'problem',
    problemType: 'return',
    urgent: 'normal',
    items: '1 товар',
    address: 'Казань, ул. Баумана, 5',
    timeline: [
      { label: 'Заказ создан', time: '07:30, 23 марта', color: 'green' },
      { label: 'Доставлен', time: '10:00, 22 марта', color: 'blue' },
      { label: 'Возврат запрошен', time: '11:45, 23 марта', color: 'red' },
    ],
  },
  {
    id: 'ORD-2821',
    customer: 'Екатерина Новак',
    customerEmail: 'kate.n@email.com',
    customerPhone: '+7 999 456 78 90',
    time: '10:30',
    date: '23 марта, 10:30',
    amount: 560.00,
    status: 'problem',
    problemType: 'cancel',
    urgent: 'normal',
    items: '3 товара',
    address: 'Новосибирск, ул. Красный, 33',
    timeline: [
      { label: 'Заказ создан', time: '09:00, 23 марта', color: 'green' },
      { label: 'Отмена запрошена', time: '10:30, 23 марта', color: 'red' },
    ],
  },
  {
    id: 'ORD-2815',
    customer: 'Дмитрий Волков',
    customerEmail: 'dima.v@email.com',
    customerPhone: '+7 999 567 89 01',
    time: '09:15',
    date: '23 марта, 09:15',
    amount: 220.00,
    status: 'problem',
    problemType: 'payment_error',
    urgent: 'urgent',
    items: '2 товара',
    address: 'Екатеринбург, ул. Мира, 7',
    timeline: [
      { label: 'Заказ создан', time: '09:15, 23 марта', color: 'green' },
      { label: 'Ошибка оплаты', time: '09:20, 23 марта', color: 'red' },
    ],
  },
  {
    id: 'ORD-2808',
    customer: 'Ольга Белова',
    customerEmail: 'olga.b@email.com',
    customerPhone: '+7 999 678 90 12',
    time: '08:45',
    date: '23 марта, 08:45',
    amount: 1890.00,
    status: 'new',
    problemType: null,
    urgent: null,
    items: '7 товаров',
    address: 'Москва, ул. Тверская, 24',
    timeline: [
      { label: 'Заказ создан', time: '08:45, 23 марта', color: 'green' },
    ],
  },
  {
    id: 'ORD-2801',
    customer: 'Сергей Лебедев',
    customerEmail: 'sergey.l@email.com',
    customerPhone: '+7 999 789 01 23',
    time: '08:20',
    date: '23 марта, 08:20',
    amount: 450.50,
    status: 'new',
    problemType: null,
    urgent: null,
    items: '3 товара',
    address: 'Москва, ул. Арбат, 15',
    timeline: [
      { label: 'Заказ создан', time: '08:20, 23 марта', color: 'green' },
    ],
  },
  {
    id: 'ORD-2795',
    customer: 'Наталья Орлова',
    customerEmail: 'natalia.o@email.com',
    customerPhone: '+7 999 890 12 34',
    time: '07:55',
    date: '23 марта, 07:55',
    amount: 3200.00,
    status: 'assembly',
    problemType: null,
    urgent: null,
    items: '12 товаров',
    address: 'Санкт-Петербург, ул. Садовая, 10',
    timeline: [
      { label: 'Заказ создан', time: '06:00, 23 марта', color: 'green' },
      { label: 'Передан в сборку', time: '07:55, 23 марта', color: 'amber' },
    ],
  },
  {
    id: 'ORD-2788',
    customer: 'Андрей Морозов',
    customerEmail: 'andrey.m@email.com',
    customerPhone: '+7 999 901 23 45',
    time: '07:30',
    date: '23 марта, 07:30',
    amount: 760.00,
    status: 'assembly',
    problemType: null,
    urgent: null,
    items: '4 товара',
    address: 'Екатеринбург, ул. Ленина, 55',
    timeline: [
      { label: 'Заказ создан', time: '05:00, 23 марта', color: 'green' },
      { label: 'Передан в сборку', time: '07:30, 23 марта', color: 'amber' },
    ],
  },
  {
    id: 'ORD-2770',
    customer: 'Татьяна Кузнецова',
    customerEmail: 'tatiana.k@email.com',
    customerPhone: '+7 999 012 34 56',
    time: '06:10',
    date: '23 марта, 06:10',
    amount: 2100.00,
    status: 'shipped',
    problemType: null,
    urgent: null,
    items: '8 товаров',
    address: 'Новосибирск, пр. Карла Маркса, 3',
    timeline: [
      { label: 'Заказ создан', time: '20:00, 22 марта', color: 'green' },
      { label: 'Собран', time: '04:00, 23 марта', color: 'amber' },
      { label: 'Отправлен', time: '06:10, 23 марта', color: 'blue' },
    ],
  },
  {
    id: 'ORD-2755',
    customer: 'Виктор Попов',
    customerEmail: 'viktor.p@email.com',
    customerPhone: '+7 999 111 22 33',
    time: '05:45',
    date: '23 марта, 05:45',
    amount: 540.00,
    status: 'shipped',
    problemType: null,
    urgent: null,
    items: '2 товара',
    address: 'Казань, ул. Петербургская, 20',
    timeline: [
      { label: 'Заказ создан', time: '18:00, 22 марта', color: 'green' },
      { label: 'Собран', time: '02:00, 23 марта', color: 'amber' },
      { label: 'Отправлен', time: '05:45, 23 марта', color: 'blue' },
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

export const problemTypeOptions = [
  { value: 'payment_error', label: 'Ошибка оплаты' },
  { value: 'wrong_address', label: 'Неверный адрес' },
  { value: 'return', label: 'Возврат товара' },
  { value: 'cancel', label: 'Отмена заказа' },
  { value: 'other', label: 'Другое' },
];
