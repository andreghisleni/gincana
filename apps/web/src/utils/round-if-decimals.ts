function roundTo(number, decimalPlaces) {
  const multiplier = 10 ** decimalPlaces
  return Math.round(number * multiplier) / multiplier
}

export function roundIfDecimals(number, decimalPlaces = 2) {
  if (number % 1 !== 0) {
    // Check if the number has decimals
    return roundTo(number, decimalPlaces)
  } else {
    return number // Return the original number if no decimals
  }
}
