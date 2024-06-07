import { isEqual, startOfDay } from 'date-fns'

export const dateInArray = (date: Date, array: Date[]) =>
  array.some((d) => +d === +date)

export function dateInArrayNew(date: Date, array: Date[]) {
  const startOfDate = startOfDay(date)
  return array.some((d) => isEqual(startOfDay(d), startOfDate))
}
