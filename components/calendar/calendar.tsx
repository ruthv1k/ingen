import {
  addDays,
  eachDayOfInterval,
  endOfMonth,
  format,
  startOfMonth,
} from 'date-fns'
import { Dispatch, SetStateAction } from 'react'
import { Task } from 'types'
import CalendarCell from './calendar.cell'

const Calendar = ({
  month,
  tasks,
  setMonth,
  handlePopup,
}: {
  month: Date[]
  tasks: Task[]
  setMonth: Dispatch<SetStateAction<Date[]>>
  handlePopup: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}) => {
  const getMonthDates = (date: Date) => {
    return eachDayOfInterval({
      start: startOfMonth(date),
      end: endOfMonth(date),
    })
  }

  const moveToNextMonth = () => {
    const startDate = addDays(month[month.length - 1], 1)
    setMonth(getMonthDates(startDate))
  }

  const moveToPrevMonth = () => {
    const startDateOfPrevWeek = addDays(month[0], -1)
    setMonth(getMonthDates(startDateOfPrevWeek))
  }
  return (
    <>
      <h1 className="mb-4 text-left font-semibold dark:text-dark-theme-heading">
        <div className="mb-4 flex items-center justify-between">
          <button className="dark:text-white" onClick={moveToPrevMonth}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5L8.25 12l7.5-7.5"
              />
            </svg>
          </button>
          <h1 className="dark:text-white">
            {format(month[0], 'MMMM')} {format(month[0], 'yyyy')}
          </h1>
          <button className="dark:text-white" onClick={moveToNextMonth}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 4.5l7.5 7.5-7.5 7.5"
              />
            </svg>
          </button>
        </div>
      </h1>
      <div className="grid grid-cols-3 md:grid-cols-6">
        {month.map((day, i) => (
          <CalendarCell day={day} handlePopup={handlePopup} key={i} />
        ))}
      </div>
    </>
  )
}

export default Calendar
