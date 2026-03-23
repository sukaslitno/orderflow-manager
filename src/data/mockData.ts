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
  items: OrderItem[];
  address: string;
  deliveryService: string;
  trackNumber: string | null;
  estimatedDelivery: string | null;
  timeline: TimelineEvent[];
  paymentMethod: string;
}

export interface OrderItem {
  name: string;
  qty: number;
  price: number;
}

export interface TimelineEvent {
  label: string;
  time: string;
  color: 'green' | 'amber' | 'red' | 'blue' | 'gray';
}

export const orders: Order[] = [
  // --- ПРОБЛЕМНЫЕ ---
  {
    id: 'ORD-2891',
    customer: 'Иван Петров',
    customerEmail: 'i.petrov@mail.ru',
    customerPhone: '+7 (916) 342-18-74',
    time: '14:23',
    date: '23 марта, 14:23',
    amount: 4890,
    status: 'problem',
    problemType: 'payment_error',
    urgent: 'urgent',
    paymentMethod: 'СБП',
    deliveryService: 'СДЭК',
    trackNumber: null,
    estimatedDelivery: null,
    address: 'Москва, ул. Профсоюзная, 44, кв. 12',
    items: [
      { name: 'Кроссовки Nike Air Max 270', qty: 1, price: 3990 },
      { name: 'Носки спортивные (3 пары)', qty: 1, price: 900 },
    ],
    timeline: [
      { label: 'Заказ оформлен', time: '09:15, 23 марта', color: 'green' },
      { label: 'Ожидание оплаты', time: '09:16, 23 марта', color: 'amber' },
      { label: 'Ошибка списания СБП', time: '14:23, 23 марта', color: 'red' },
    ],
  },
  {
    id: 'ORD-2847',
    customer: 'Мария Смирнова',
    customerEmail: 'm.smirnova@yandex.ru',
    customerPhone: '+7 (926) 711-09-33',
    time: '13:11',
    date: '23 марта, 13:11',
    amount: 12400,
    status: 'problem',
    problemType: 'wrong_address',
    urgent: 'urgent',
    paymentMethod: 'Карта Сбербанк',
    deliveryService: 'Boxberry',
    trackNumber: null,
    estimatedDelivery: null,
    address: 'Санкт-Петербург, пр. Ветеранов, 169 — ПВЗ не найден',
    items: [
      { name: 'Пальто женское Zarina, р. 44', qty: 1, price: 8999 },
      { name: 'Ремень кожаный', qty: 1, price: 1490 },
      { name: 'Шарф шерстяной', qty: 2, price: 955 },
    ],
    timeline: [
      { label: 'Заказ оформлен', time: '08:00, 23 марта', color: 'green' },
      { label: 'Оплата получена', time: '08:02, 23 марта', color: 'green' },
      { label: 'Передан в сборку', time: '10:00, 23 марта', color: 'amber' },
      { label: 'Адрес ПВЗ не распознан', time: '13:11, 23 марта', color: 'red' },
    ],
  },
  {
    id: 'ORD-2839',
    customer: 'Алексей Козлов',
    customerEmail: 'alexey.kozlov88@gmail.com',
    customerPhone: '+7 (903) 558-24-61',
    time: '11:45',
    date: '23 марта, 11:45',
    amount: 2290,
    status: 'problem',
    problemType: 'return',
    urgent: 'normal',
    paymentMethod: 'Тинькофф Pay',
    deliveryService: 'Почта России',
    trackNumber: 'RA123456789RU',
    estimatedDelivery: null,
    address: 'Казань, ул. Баумана, 5, кв. 88',
    items: [
      { name: 'Bluetooth-наушники JBL Tune 510BT', qty: 1, price: 2290 },
    ],
    timeline: [
      { label: 'Заказ оформлен', time: '15:30, 20 марта', color: 'green' },
      { label: 'Отправлен Почтой России', time: '10:00, 21 марта', color: 'blue' },
      { label: 'Доставлен', time: '14:00, 22 марта', color: 'green' },
      { label: 'Возврат запрошен клиентом', time: '11:45, 23 марта', color: 'red' },
    ],
  },
  {
    id: 'ORD-2821',
    customer: 'Екатерина Лазарева',
    customerEmail: 'kate_laz@inbox.ru',
    customerPhone: '+7 (909) 214-77-02',
    time: '10:30',
    date: '23 марта, 10:30',
    amount: 6750,
    status: 'problem',
    problemType: 'cancel',
    urgent: 'normal',
    paymentMethod: 'Карта Альфа-Банк',
    deliveryService: 'СДЭК',
    trackNumber: null,
    estimatedDelivery: null,
    address: 'Новосибирск, ул. Красный проспект, 33, кв. 7',
    items: [
      { name: 'Кофемашина Delonghi Dedica', qty: 1, price: 6750 },
    ],
    timeline: [
      { label: 'Заказ оформлен', time: '09:00, 23 марта', color: 'green' },
      { label: 'Оплата получена', time: '09:05, 23 марта', color: 'green' },
      { label: 'Клиент запросил отмену', time: '10:30, 23 марта', color: 'red' },
    ],
  },
  {
    id: 'ORD-2815',
    customer: 'Дмитрий Волков',
    customerEmail: 'd.volkov@rambler.ru',
    customerPhone: '+7 (985) 330-45-18',
    time: '09:15',
    date: '23 марта, 09:15',
    amount: 1850,
    status: 'problem',
    problemType: 'payment_error',
    urgent: 'urgent',
    paymentMethod: 'СБП',
    deliveryService: 'ПВЗ 5Post',
    trackNumber: null,
    estimatedDelivery: null,
    address: 'Екатеринбург, ул. Мира, 7, кв. 3',
    items: [
      { name: 'Чехол для iPhone 15 Pro, кожаный', qty: 1, price: 890 },
      { name: 'Защитное стекло 2.5D', qty: 2, price: 480 },
    ],
    timeline: [
      { label: 'Заказ оформлен', time: '09:14, 23 марта', color: 'green' },
      { label: 'Ошибка списания СБП — таймаут', time: '09:15, 23 марта', color: 'red' },
    ],
  },

  // --- НОВЫЕ ---
  {
    id: 'ORD-2808',
    customer: 'Ольга Белова',
    customerEmail: 'olga.belova@bk.ru',
    customerPhone: '+7 (965) 412-88-90',
    time: '08:45',
    date: '23 марта, 08:45',
    amount: 18900,
    status: 'new',
    problemType: null,
    urgent: null,
    paymentMethod: 'Карта Сбербанк',
    deliveryService: 'СДЭК',
    trackNumber: null,
    estimatedDelivery: '26 марта',
    address: 'Москва, ул. Тверская, 24, кв. 55',
    items: [
      { name: 'Робот-пылесос Xiaomi S10+', qty: 1, price: 14990 },
      { name: 'Мешки-пылесборники (10 шт)', qty: 2, price: 1955 },
    ],
    timeline: [
      { label: 'Заказ оформлен', time: '08:45, 23 марта', color: 'green' },
      { label: 'Оплата подтверждена', time: '08:46, 23 марта', color: 'green' },
    ],
  },
  {
    id: 'ORD-2801',
    customer: 'Сергей Лебедев',
    customerEmail: 's.lebedev@yandex.ru',
    customerPhone: '+7 (977) 601-33-14',
    time: '08:20',
    date: '23 марта, 08:20',
    amount: 4350,
    status: 'new',
    problemType: null,
    urgent: null,
    paymentMethod: 'Тинькофф Pay',
    deliveryService: 'Boxberry',
    trackNumber: null,
    estimatedDelivery: '25 марта',
    address: 'Москва, ул. Арбат, 15, кв. 2',
    items: [
      { name: 'Книга «Чистый код» Роберт Мартин', qty: 1, price: 890 },
      { name: 'Механическая клавиатура Keychron K2', qty: 1, price: 3460 },
    ],
    timeline: [
      { label: 'Заказ оформлен', time: '08:20, 23 марта', color: 'green' },
      { label: 'Ожидает назначения сборщика', time: '08:21, 23 марта', color: 'gray' },
    ],
  },

  // --- СБОРКА ---
  {
    id: 'ORD-2795',
    customer: 'Наталья Орлова',
    customerEmail: 'nat.orlova@mail.ru',
    customerPhone: '+7 (921) 774-50-09',
    time: '07:55',
    date: '23 марта, 07:55',
    amount: 32100,
    status: 'assembly',
    problemType: null,
    urgent: null,
    paymentMethod: 'Рассрочка Сбер',
    deliveryService: 'СДЭК (курьер)',
    trackNumber: null,
    estimatedDelivery: '25 марта',
    address: 'Санкт-Петербург, ул. Садовая, 10, кв. 4',
    items: [
      { name: 'Смартфон Samsung Galaxy S24, 256 Гб', qty: 1, price: 27990 },
      { name: 'Беспроводная зарядка Samsung 15W', qty: 1, price: 2490 },
      { name: 'Чехол Clear Cover', qty: 1, price: 1620 },
    ],
    timeline: [
      { label: 'Заказ оформлен', time: '06:00, 23 марта', color: 'green' },
      { label: 'Рассрочка одобрена', time: '06:15, 23 марта', color: 'green' },
      { label: 'Передан в сборку', time: '07:55, 23 марта', color: 'amber' },
    ],
  },
  {
    id: 'ORD-2788',
    customer: 'Андрей Морозов',
    customerEmail: 'andrei.m@gmail.com',
    customerPhone: '+7 (912) 889-27-43',
    time: '07:30',
    date: '23 марта, 07:30',
    amount: 7650,
    status: 'assembly',
    problemType: null,
    urgent: null,
    paymentMethod: 'Карта Тинькофф',
    deliveryService: 'СДЭК',
    trackNumber: null,
    estimatedDelivery: '25 марта',
    address: 'Екатеринбург, ул. Ленина, 55, кв. 18',
    items: [
      { name: 'Кофемолка Hario Skerton Pro', qty: 1, price: 3890 },
      { name: 'Кофе Ethiopia Yirgacheffe, 250 г', qty: 3, price: 1253 },
    ],
    timeline: [
      { label: 'Заказ оформлен', time: '05:00, 23 марта', color: 'green' },
      { label: 'Оплата получена', time: '05:01, 23 марта', color: 'green' },
      { label: 'Передан в сборку', time: '07:30, 23 марта', color: 'amber' },
    ],
  },

  // --- ОТПРАВЛЕНЫ ---
  {
    id: 'ORD-2770',
    customer: 'Татьяна Кузнецова',
    customerEmail: 'tkuznetsova@inbox.ru',
    customerPhone: '+7 (931) 100-66-21',
    time: '06:10',
    date: '23 марта, 06:10',
    amount: 21000,
    status: 'shipped',
    problemType: null,
    urgent: null,
    paymentMethod: 'Карта Альфа-Банк',
    deliveryService: 'СДЭК',
    trackNumber: '1400522801234',
    estimatedDelivery: '25 марта',
    address: 'Новосибирск, пр. Карла Маркса, 3, кв. 66',
    items: [
      { name: 'Ноутбук Lenovo IdeaPad 5 Pro', qty: 1, price: 18990 },
      { name: 'Сумка для ноутбука 15.6"', qty: 1, price: 2010 },
    ],
    timeline: [
      { label: 'Заказ оформлен', time: '20:00, 22 марта', color: 'green' },
      { label: 'Оплата получена', time: '20:01, 22 марта', color: 'green' },
      { label: 'Собран и упакован', time: '04:00, 23 марта', color: 'amber' },
      { label: 'Передан в СДЭК', time: '06:10, 23 марта', color: 'blue' },
    ],
  },
  {
    id: 'ORD-2755',
    customer: 'Виктор Попов',
    customerEmail: 'v.popov@bk.ru',
    customerPhone: '+7 (906) 224-39-77',
    time: '05:45',
    date: '23 марта, 05:45',
    amount: 5400,
    status: 'shipped',
    problemType: null,
    urgent: null,
    paymentMethod: 'СБП',
    deliveryService: 'Boxberry',
    trackNumber: '62090444556',
    estimatedDelivery: '26 марта',
    address: 'Казань, ул. Петербургская, 20, кв. 11',
    items: [
      { name: 'Термос Stanley Classic 1L', qty: 1, price: 3490 },
      { name: 'Набор силиконовых крышек', qty: 1, price: 1910 },
    ],
    timeline: [
      { label: 'Заказ оформлен', time: '18:00, 22 марта', color: 'green' },
      { label: 'Оплата получена', time: '18:00, 22 марта', color: 'green' },
      { label: 'Собран и упакован', time: '02:00, 23 марта', color: 'amber' },
      { label: 'Передан в Boxberry', time: '05:45, 23 марта', color: 'blue' },
    ],
  },
];

export const problemTypeOptions = [
  { value: 'payment_error', label: 'Ошибка оплаты' },
  { value: 'wrong_address', label: 'Неверный адрес' },
  { value: 'return', label: 'Возврат товара' },
  { value: 'cancel', label: 'Отмена заказа' },
  { value: 'other', label: 'Другое' },
];
