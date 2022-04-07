import { useContext, useEffect, useState } from 'react'
import Head from 'next/head'
import { NextPage } from 'next'
import { customAlphabet } from 'nanoid'

// types
import { Task } from '@/types/task'

// components
import Popup from '@/components/popup'

// helpers
import { usePopup } from 'hooks/usePopup'

// context
import CalendarContext from 'context/CalendarContext'

const Home: NextPage = () => {
  const { todaysDate, currentMonth, currentYear, daysInMonth } =
    useContext(CalendarContext)

  const [tasks, setTasks] = useState<Array<Task>>([])
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

      <div className="flex w-screen items-center">
        <div className="mx-auto flex h-screen min-w-fit flex-col items-start justify-center">
          <h1 className="text-xl font-semibold dark:text-dark-theme-heading">
            Calendar
          </h1>
          <h5 className="mt-2 mb-6 text-base font-medium text-black/50 dark:text-dark-theme-body">
            {currentMonth} {currentYear}
          </h5>

          <div className="grid grid-cols-8 justify-start">
            {daysInMonth.map((day, i) => (
              <div
                key={i}
                className={`relative h-[150px] w-[150px] overflow-hidden `}
              >
                {day < todaysDate ? (
                  <button
                    value={day + '/' + currentMonth + '/' + currentYear}
                    onClick={handlePopup}
                    className="absolute top-0 left-0 z-0 flex h-full w-full items-center justify-center border  bg-light-theme-primary/50 font-normal text-dark-theme-primary/50 transition-all duration-150 ease-linear dark:border-dark-theme-primary/20 dark:bg-dark-theme-primary/20 dark:text-white/25"
                    disabled
                  >
                    {day.toString()}
                  </button>
                ) : day === todaysDate ? (
                  <button
                    value={day + '/' + currentMonth + '/' + currentYear}
                    onClick={handlePopup}
                    className="absolute top-0 left-0 z-0 flex h-full w-full items-center justify-center border-2 border-light-theme-primary/50 bg-white/30 transition-all duration-150 ease-linear hover:font-semibold hover:text-light-theme-primary dark:border-dark-theme-primary dark:bg-dark-theme-primary/5 dark:text-white dark:hover:bg-dark-theme-primary/50"
                  >
                    {day.toString()}
                  </button>
                ) : (
                  <button
                    value={day + '/' + currentMonth + '/' + currentYear}
                    onClick={handlePopup}
                    className="absolute top-0 left-0 z-0 flex h-full w-full items-center justify-center border border-light-theme-primary/50 bg-white/30 transition-all duration-150 ease-linear hover:border-light-theme-primary/25 hover:font-semibold hover:text-light-theme-primary dark:border-dark-theme-primary/25 dark:bg-dark-theme-primary/5 dark:text-white dark:hover:border-dark-theme-primary  dark:hover:bg-dark-theme-primary/50"
                  >
                    {day.toString()}
                  </button>
                )}

                {tasks && tasks.length > 0 && (
                  <ul className="absolute top-3 left-[5px] -z-0 w-[138px]">
                    {tasks.map((task) => {
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
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {popup.isOpen && (
        <Popup
          popup={popup}
          tasks={tasks}
          closePopup={closePopup}
          submitForm={submitForm}
          markAsDone={markAsDone}
        />
      )}
    </>
  )
}

export default Home
