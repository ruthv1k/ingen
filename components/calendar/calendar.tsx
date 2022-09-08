import { format, isPast, isToday } from 'date-fns'
import { Task } from 'types'
import CalendarCell from './calendar.cell'

const Calendar = ({
  month,
  tasks,
  handlePopup,
}: {
  month: Date[]
  tasks: Task[]
  handlePopup: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}) => {
  return (
    <div className="grid grid-cols-3 md:grid-cols-6">
      {month.map((day, i) => (
        <CalendarCell day={day} handlePopup={handlePopup} key={i} />
      ))}
    </div>
  )
}

export default Calendar
