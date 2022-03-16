import { useEffect, useReducer } from 'react'

import { Task } from '@/types/task'
import Tasks from 'components/tasks'

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
  closePopup,
  submitForm,
  tasks,
  markAsDone,
}) => {
  let initialState: Task = {
    id: '',
    title: '',
    description: '',
    date: '',
    fromTime: '',
    toTime: '',
    isDone: false,
  }

  const [form, setForm] = useReducer(reducer, initialState)

  function setTaskTitle(e: React.ChangeEvent<HTMLInputElement>): void {
    let taskTitle = (e.target as HTMLInputElement).value
    setForm({ type: 'setTitle', title: taskTitle })
  }

  function setDescription(e: React.ChangeEvent<HTMLInputElement>): void {
    let description = (e.target as HTMLInputElement).value
    setForm({ type: 'setDescription', desc: description })
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
      <div className="flex bg-white border rounded-md popup dark:border-transparent dark:bg-dark-background md:w-11/12 lg:max-w-6xl">
        <div className="w-3/5 px-6 py-8 popup-content">
          <div className="flex items-center justify-start">
            <button
              onClick={closePopup}
              className="flex items-center dark:text-dark-theme-heading"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 text-dark"
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
              Schedule tasks on {popup.date}
            </h3>
          </div>

          <div className="mt-6">
            <label
              htmlFor="form_title"
              className="block pb-2 dark:text-dark-theme-heading"
            >
              What{`'`}s the task?
            </label>
            <input
              type="text"
              placeholder="Schedule a meet with the team..."
              id="form_title"
              className="w-full px-4 py-2 border focus:outline-none dark:border-dark-theme-primary dark:bg-transparent dark:text-dark-theme-body"
              onChange={setTaskTitle}
            />
          </div>

          <div className="mt-6">
            <label
              htmlFor="add_field"
              className="block pb-2 dark:text-dark-theme-heading"
            >
              Any message you want to add to the task?
            </label>
            <input
              type="text"
              placeholder="Get feedback about the progress and look for any blockers"
              id="form_title"
              className="w-full px-4 py-2 border focus:outline-none dark:border-dark-theme-primary dark:bg-transparent dark:text-dark-theme-body"
              onChange={setDescription}
            />
          </div>

          <div className="mt-6">
            <label
              htmlFor="add_field"
              className="block pb-2 dark:text-dark-theme-heading"
            >
              Time Slot
            </label>
            <div className="flex items-center justify-between w-1/3">
              <div>
                <label htmlFor="from" className="dark:text-dark-theme-heading">
                  From
                </label>
                <input
                  type="time"
                  placeholder="From"
                  id="fromTime"
                  className="px-4 py-2 mt-2 border focus:outline-none dark:border-dark-theme-primary dark:bg-transparent dark:text-dark-theme-body"
                  onChange={setFrom}
                />
              </div>
              <div className="ml-4 ">
                <label htmlFor="to" className="dark:text-dark-theme-heading">
                  To
                </label>
                <input
                  type="time"
                  placeholder="To"
                  id="toTime"
                  className="px-4 py-2 mt-2 border focus:outline-none dark:border-dark-theme-primary dark:bg-transparent dark:text-dark-theme-body"
                  onChange={setTo}
                />
              </div>
            </div>
          </div>

          <div className="mt-6">
            <button
              type="button"
              className="px-6 py-3 text-white transition-all duration-150 ease-linear border border-light-theme-primary bg-light-theme-primary hover:bg-transparent hover:text-light-theme-primary dark:border-dark-theme-primary dark:bg-dark-theme-primary dark:text-dark-theme-heading dark:hover:bg-transparent "
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
