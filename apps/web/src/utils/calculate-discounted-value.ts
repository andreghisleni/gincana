export function calculateDiscountedValue(
  originalValue: number,
  discount: number,
  type: 'PERCENTAGE' | 'FIXED_AMOUNT',
): number {
  const discountAmount =
    type === 'PERCENTAGE' ? (originalValue * discount) / 100 : discount
  const discountedValue = originalValue - discountAmount
  return discountedValue
}
