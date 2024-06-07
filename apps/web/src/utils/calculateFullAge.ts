import { intervalToDuration } from 'date-fns'

export function calculateFullAge(birthDate: Date) {
  const { years, months, days } = intervalToDuration({
    start: birthDate,
    end: new Date(),
  })

  console.log('years', years)
  console.log('months', months)
  console.log('days', days)

  return `${years || 0} anos, ${months || 0} meses e ${days || 0} dias`
}
