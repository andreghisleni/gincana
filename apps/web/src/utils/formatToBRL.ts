export const formatToBRL = (value: number = 0): string => {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}
