

export default function useCalendar(date: string) {
  const months: Array<string> = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ]

  let d: Date = new Date(date)
  let days: number = new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate()
  let today: number = d.getDate()
  let currentMonth: string = months[d.getMonth()]
  let currentYear: number = d.getFullYear()
  let daysInMonth: Array<number | string> = findDaysInMonth(days)

  return {
    months,
    days,
    today,
    currentMonth,
    currentYear,
    daysInMonth,
  }
}

function findDaysInMonth(noOfDays: number) {
  let daysInMonth = []
  for (let i = 1; i <= noOfDays; i++) {
    if (i < 10) daysInMonth.push('0' + i.toString())
    else daysInMonth.push(i)
  }

  return daysInMonth
}