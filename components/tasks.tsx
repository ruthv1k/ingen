import useCalendar from '@/helpers/useCalendar'
import { Task } from '@/types/task'

interface Props {
  tasks: Array<Task>
  markAsDone: (id: string) => void
  date: string
}

const Tasks: React.FC<Props> = ({ tasks, date, markAsDone }) => {
  let { today } = useCalendar()
  let formattedDate: number = 0
  let filteredTasks: Array<Task> = []
  if (date) formattedDate = parseInt(date.split('/')[0])
  if (tasks && tasks.length > 0)
    filteredTasks = tasks.filter(
      (task) =>
        parseInt(task.date.split('/')[0]) === formattedDate &&
        task.isDone === false
    )

  return (
    <>
      <h1 className="mb-6 text-xl font-semibold dark:text-dark-theme-heading">
        {formattedDate === today
          ? `Today's Tasks`
          : formattedDate === today + 1
          ? `Tomorrow's Tasks`
          : `Tasks on ${date}`}
      </h1>
      <ul className={`list-none ${filteredTasks.length > 3 ? 'overflow-y-scroll md:max-h-[400px]' : '' } md:pr-4`}>
        {filteredTasks.length > 0 ? (
          filteredTasks.map((task) => (
            <li
              key={task.id}
              className="mb-4 flex min-w-[300px] items-start justify-between border bg-white p-4 dark:border-dark-theme-primary dark:bg-transparent"
            >
              <div className="md:pr-4">
                <span className="text-xs dark:text-dark-theme-body">
                  {task.fromTime && task.toTime
                    ? `${task.fromTime} - ${task.toTime}`
                    : ''}
                </span>
                <h5 className="mt-1 dark:text-dark-theme-heading">
                  {task.title}
                </h5>
                <p className="mt-1 text-xs dark:text-dark-theme-body">
                  {task.description}
                </p>
              </div>

              <button
                type="button"
                className="flex items-center justify-center px-4 py-3 transition-all duration-150 ease-linear bg-light-theme-primary/25 text-light-theme-primary hover:bg-green-400 hover:text-white dark:bg-dark-theme-primary/50 dark:text-white dark:hover:bg-dark-theme-primary dark:hover:text-green-400"
                onClick={() => markAsDone(task.id)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </button>
            </li>
          ))
        ) : (
          <li className="dark:text-dark-theme-body">No tasks found</li>
        )}
      </ul>
    </>
  )
}

export default Tasks
