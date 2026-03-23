export function formatRub(amount: number): string {
  return new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'RUB',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatItemsCount(items: { qty: number }[]): string {
  const total = items.reduce((sum, i) => sum + i.qty, 0);
  const lastTwo = total % 100;
  const last = total % 10;
  if (lastTwo >= 11 && lastTwo <= 19) return `${total} товаров`;
  if (last === 1) return `${total} товар`;
  if (last >= 2 && last <= 4) return `${total} товара`;
  return `${total} товаров`;
}
