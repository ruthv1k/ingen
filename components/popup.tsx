import { useEffect, useReducer, useContext } from 'react'

import { Task } from '@/types/task'
import Tasks from 'components/tasks'
import CalendarContext from 'context/CalendarContext'

interface Props {
  popup: {
    isOpen: boolean
    date: string
  }
  closePopup: () => void
  submitForm: (form: Task) => void
  tasks: Array<Task>
  markAsDone: (id: string) => void
}

type ReducerAction =
  | { type: 'setDate'; date: string }
  | { type: 'setTitle'; title: string }
  | { type: 'setDescription'; desc: string }
  | { type: 'setTag'; tag: string }
  | { type: 'setFrom'; fromTime: string }
  | { type: 'setTo'; toTime: string }

function reducer(state: Task, action: ReducerAction): Task {
  switch (action.type) {
    case 'setDate':
      return { ...state, date: action.date }
    case 'setTitle':
      return { ...state, title: action.title }
    case 'setDescription':
      return { ...state, description: action.desc }
    case 'setTag':
      return { ...state, tag: action.tag }
    case 'setFrom':
      return { ...state, fromTime: action.fromTime }
    case 'setTo':
      return { ...state, toTime: action.toTime }
    default:
      throw new Error()
  }
}

const Popup: React.FC<Props> = ({
  popup,
  tasks,
  closePopup,
  submitForm,
  markAsDone,
}) => {
  const { todaysDate } = useContext(CalendarContext)
  let initialState: Task = {
    id: '',
    title: '',
    description: '',
    tag: '',
    date: '',
    fromTime: '',
    toTime: '',
    isDone: false,
  }

  const [form, setForm] = useReducer(reducer, initialState)
  const formattedDate = parseInt(popup.date.split('/')[0])

  function setTaskTitle(e: React.ChangeEvent<HTMLInputElement>): void {
    let taskTitle = (e.target as HTMLInputElement).value
    setForm({ type: 'setTitle', title: taskTitle })
  }

  function setDescription(e: React.ChangeEvent<HTMLInputElement>): void {
    let description = (e.target as HTMLInputElement).value
    setForm({ type: 'setDescription', desc: description })
  }

  function setTag(e: React.ChangeEvent<HTMLInputElement>): void {
    let tag = (e.target as HTMLInputElement).value
    setForm({ type: 'setTag', tag: tag })
  }

  function setFrom(e: React.ChangeEvent<HTMLInputElement>): void {
    let from = (e.currentTarget as HTMLInputElement).value
    setForm({ type: 'setFrom', fromTime: from })
  }

  function setTo(e: React.ChangeEvent<HTMLInputElement>): void {
    let to = (e.target as HTMLInputElement).value
    setForm({ type: 'setTo', toTime: to })
  }

  useEffect(() => {
    setForm({ type: 'setDate', date: popup.date })
  }, [popup.isOpen, popup.date])

  return (
    <>
      <div className="popup flex rounded-md border bg-white dark:border-transparent dark:bg-dark-background md:w-11/12 lg:max-w-6xl">
        <div className="popup-content w-3/5 px-6 py-8">
          <div className="flex items-center justify-start">
            <button
              onClick={closePopup}
              className="flex items-center dark:text-dark-theme-heading"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="text-dark h-6 w-6"
                fill="current"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <h3 className="ml-4 text-xl font-medium dark:text-dark-theme-heading">
              {formattedDate === todaysDate
                ? `Schedule today's tasks`
                : formattedDate === todaysDate + 1
                ? `Schedule tomorrow's tasks`
                : `Schedule tasks on ${popup.date}`}
            </h3>
          </div>

          <div className="mt-6">
            <label className="block pb-3 dark:text-dark-theme-heading">
              What{`'`}s the task?
            </label>
            <input
              type="text"
              placeholder="Schedule a meet with the team..."
              className="w-full border px-4 py-2 focus:outline-none dark:border-dark-theme-primary dark:bg-transparent dark:text-dark-theme-body dark:placeholder:text-dark-theme-body/50"
              onChange={setTaskTitle}
            />
          </div>

          <div className="mt-6">
            <label className="block pb-3 dark:text-dark-theme-heading">
              Any message you want to add to the task?
            </label>
            <input
              type="text"
              placeholder="Get feedback about the progress and look for any blockers"
              className="w-full border px-4 py-2 focus:outline-none dark:border-dark-theme-primary dark:bg-transparent dark:text-dark-theme-body dark:placeholder:text-dark-theme-body/50"
              onChange={setDescription}
            />
          </div>

          <div className="flex items-start justify-between">
            <div className="mt-6">
              <label className="block pb-3 dark:text-dark-theme-heading">
                Add a tag to the task
              </label>
              <input
                type="text"
                placeholder="#work"
                className="w-full border px-4 py-2 focus:outline-none dark:border-dark-theme-primary dark:bg-transparent dark:text-dark-theme-body dark:placeholder:text-dark-theme-body/50"
                onChange={setTag}
              />
            </div>

            <div className="mt-6">
              <label className="block pb-3 dark:text-dark-theme-heading">
                Time Slot
              </label>
              <div className="flex items-center justify-between">
                <div>
                  <label className="dark:text-dark-theme-heading">From</label>
                  <input
                    type="time"
                    className="ml-2 mt-2 border px-4 py-2 focus:outline-none dark:border-dark-theme-primary dark:bg-transparent dark:text-dark-theme-body "
                    onChange={setFrom}
                  />
                </div>
                <div className="ml-4">
                  <label className="dark:text-dark-theme-heading">To</label>
                  <input
                    type="time"
                    className="ml-2 mt-2 border px-4 py-2 focus:outline-none dark:border-dark-theme-primary dark:bg-transparent dark:text-dark-theme-body"
                    onChange={setTo}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <button
              type="button"
              className="border border-light-theme-primary bg-light-theme-primary px-6 py-3 text-white transition-all duration-150 ease-linear hover:bg-transparent hover:text-light-theme-primary dark:border-dark-theme-primary dark:bg-dark-theme-primary dark:text-dark-theme-heading dark:hover:bg-transparent "
              onClick={() => submitForm(form)}
            >
              Add Task
            </button>
          </div>
        </div>
        <div className="w-2/5 px-6 py-8 ">
          <Tasks tasks={tasks} markAsDone={markAsDone} date={popup.date} />
        </div>
      </div>
      <div className="overlay" onClick={closePopup}></div>
    </>
  )
}

export default Popup
