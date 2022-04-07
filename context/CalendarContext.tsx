import { createContext, useEffect, useState } from 'react'

interface Calendar {
  todaysDate: number
  currentMonth: string
  currentYear: number
  daysInMonth: Array<number>
}

const CalendarContext = createContext<Calendar>({
  todaysDate: 0,
  currentMonth: '',
  currentYear: 0,
  daysInMonth: [],
})

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

export const CalendarProvider: React.FC = ({ children }) => {
  const [todaysDate, setTodaysDate] = useState<number>(0)
  const [currentMonth, setCurrentMonth] = useState<string>('')
  const [currentYear, setCurrentYear] = useState<number>(2018)
  const [daysInMonth, setDaysInMonth] = useState<Array<number>>([])

  useEffect(() => {
    let today = new Date()
    let todaysDate: number = today.getDate()
    let currentMonth: string = months[today.getMonth()]
    let currentYear: number = today.getFullYear()
    let numberOfDays: number =
      new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate() + 1 // added +1 so that when we slice the daysInMonth to remove 0, we do not want to remove the last date of the months
    let daysInMonth = Array.from(Array(numberOfDays).keys()).slice(1)

    setTodaysDate(todaysDate)
    setCurrentMonth(currentMonth)
    setCurrentYear(currentYear)
    setDaysInMonth(daysInMonth)
  }, [])

  return (
    <CalendarContext.Provider
      value={{ todaysDate, currentMonth, currentYear, daysInMonth }}
    >
      {children}
    </CalendarContext.Provider>
  )
}

export default CalendarContext
