import { useEffect, useState } from 'react'
import Head from 'next/head'
import { customAlphabet } from 'nanoid'

// types
import { Task } from '@/types/task'

// components
import Popup from '@/components/popup'

// helpers
import useCalendar from '@/helpers/useCalendar'
import { usePopup } from 'hooks/usePopup'

interface Props {
  date: string
}

const Home: React.FC<Props> = ({ date }) => {
  const [tasks, setTasks] = useState<Array<Task>>([])
  const { today, currentMonth, currentYear, daysInMonth } = useCalendar(date)
  const { popup, openPopup, closePopup } = usePopup()

  useEffect(() => {
    // check if there are tasks in local storage, if yes, update the state
    let storage: string | null = localStorage.getItem('tasks')
    if (storage) {
      let tasksInLocal: Array<Task> = JSON.parse(storage).tasks
      if (tasks.length === 0 && tasksInLocal.length > 0) {
        setTasks(tasksInLocal)
      }
    }
    // if not add tasks to local storage, if any
    if (tasks.length > 0)
      localStorage.setItem('tasks', JSON.stringify({ tasks }))
  }, [tasks])

  function handlePopup(e: React.MouseEvent<HTMLButtonElement>): void {
    let date = (e.target as HTMLButtonElement).value
    if (e.target) {
      openPopup(date)
    }
  }

  function markAsDone(id: string): void {
    const updatedTasks = [...tasks]
    updatedTasks.forEach((task, i) => {
      if (task.id === id) {
        updatedTasks[i].isDone = true
      }
    })
    setTasks(updatedTasks)
  }

  function submitForm(form: Task): void {
    let taskId = customAlphabet('1234567890', 6)
    if (form.title !== '') {
      form.id = taskId()
      setTasks([...tasks, form])
      closePopup()
    }
  }

  return (
    <>
      <Head>
        <title>Ingen - Manage your time efficiently</title>
      </Head>

      <div className="flex items-center w-screen">
        <div className="flex flex-col items-start justify-center h-screen mx-auto min-w-fit">
          <h1 className="text-xl font-semibold dark:text-dark-theme-heading">
            Calendar
          </h1>
          <h5 className="mt-2 mb-6 text-base font-medium text-black/50 dark:text-dark-theme-body">
            {currentMonth} {currentYear}
          </h5>

          <div className="grid justify-start grid-cols-8">
            {daysInMonth.map((day, i) => (
              <div
                key={i}
                className={`relative h-[150px] w-[150px] overflow-hidden `}
              >
                <ul className="absolute top-3 left-[5px] -z-0 w-[138px]">
                  {tasks &&
                    tasks.map((task) => {
                      if (
                        parseInt(task.date.split('/')[0]) === day &&
                        task.isDone === false
                      )
                        return (
                          <li
                            key={task.id}
                            className={`mb-2 h-[25px] overflow-hidden bg-light-theme-primary/75 px-2 text-white`}
                          >
                            {task.title}
                          </li>
                        )
                    })}
                </ul>

                <button
                  value={day + '/' + currentMonth + '/' + currentYear}
                  onClick={handlePopup}
                  className={`absolute top-0 left-0 z-0 flex h-full w-full items-center justify-center bg-white/30 transition-all duration-150 ease-linear  ${
                    day === today
                      ? 'border-2 border-light-theme-primary/50 hover:font-semibold hover:text-light-theme-primary dark:border-dark-theme-primary dark:bg-dark-theme-primary/5 dark:text-white dark:hover:bg-dark-theme-primary/50'
                      : day > today
                      ? 'border border-light-theme-primary/50 hover:border-light-theme-primary/25 hover:font-semibold hover:text-light-theme-primary dark:border-dark-theme-primary/25 dark:bg-dark-theme-primary/5 dark:text-white dark:hover:border-dark-theme-primary  dark:hover:bg-dark-theme-primary/50'
                      : 'border bg-light-theme-primary/50 font-normal text-dark-theme-primary/50 dark:border-dark-theme-primary/20 dark:bg-dark-theme-primary/20 dark:text-white/25'
                  }`}
                  disabled={day < today}
                >
                  {day.toString()}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {popup.isOpen && (
        <Popup
          popup={popup}
          tasks={tasks}
          today={today}
          closePopup={closePopup}
          submitForm={submitForm}
          markAsDone={markAsDone}
        />
      )}
    </>
  )
}

export async function getStaticProps() {
  const date = new Date()
  return {
    props: {
      date: date.toDateString()
    },
    revalidate: 72000
  }
}

export default Home
