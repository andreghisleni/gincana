export function addTime(hour: string, timeMinutes: number): string {
  // Dividing the hour and minutes
  const [currentHour, currentMinutes] = hour.split(':').map(Number)

  // Adding the time in minutes
  const totalMinutes = currentHour * 60 + currentMinutes + timeMinutes

  // Calculating the new hours and minutes
  const newHour = Math.floor(totalMinutes / 60)
  const newMinutes = totalMinutes % 60

  // Formatting the new hour and minutes with leading zeros, if necessary
  const newHourStr = newHour.toString().padStart(2, '0')
  const newMinutesStr = newMinutes.toString().padStart(2, '0')

  return `${newHourStr}:${newMinutesStr}`
}
