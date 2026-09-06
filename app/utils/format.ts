// app/utils/format.ts
const usd = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
})

/** Whole-dollar currency, e.g. `$110`. Prints are priced in round numbers. */
export function formatPrice(value: number): string {
  return usd.format(value)
}
