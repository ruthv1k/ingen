import { Fragment, useEffect, useReducer, useContext } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { format } from 'date-fns'

import { Task } from 'types'

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
  const todaysDate = parseInt(format(new Date(), 'd'))
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
    <Transition appear show={popup.isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closePopup}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all dark:border-transparent dark:bg-dark-background">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900 dark:text-dark-theme-heading"
                >
                  {formattedDate === todaysDate
                    ? `Schedule today's tasks`
                    : formattedDate === todaysDate + 1
                    ? `Schedule tomorrow's tasks`
                    : `Scheduled tasks on ${popup.date}`}
                </Dialog.Title>

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

                  <div className="flex items-center justify-start">
                    <label className="dark:text-dark-theme-heading">
                      From
                      <input
                        type="time"
                        className="ml-2 mt-2 border px-4 py-2 focus:outline-none dark:border-dark-theme-primary dark:bg-transparent dark:text-dark-theme-body "
                        onChange={setFrom}
                      />
                    </label>
                    <label className="ml-4 block dark:text-dark-theme-heading">
                      To
                      <input
                        type="time"
                        className="ml-2 mt-2 border px-4 py-2 focus:outline-none dark:border-dark-theme-primary dark:bg-transparent dark:text-dark-theme-body"
                        onChange={setTo}
                      />
                    </label>
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
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}

export default Popup
