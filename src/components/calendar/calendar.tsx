import {
  addDays,
  eachDayOfInterval,
  endOfMonth,
  format,
  startOfMonth,
} from 'date-fns'
import { Dispatch, SetStateAction } from 'react'
import CalendarCell from './calendar.cell'

import { LeftArrowIcon, RightArrowIcon } from '../icons'

const Calendar = ({
  month,
  setMonth,
  handlePopup,
}: {
  month: Date[]
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
            <LeftArrowIcon />
          </button>
          <h1 className="dark:text-white">
            {format(month[0], 'MMMM')} {format(month[0], 'yyyy')}
          </h1>
          <button className="dark:text-white" onClick={moveToNextMonth}>
            <RightArrowIcon />
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
