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
import { ThemeContext } from 'context/ThemeContext'

const Home: NextPage = () => {
  const { todaysDate, currentMonth, currentYear, daysInMonth } =
    useContext(CalendarContext)
  const themeContext = useContext(ThemeContext)

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

  const styles = {
    calendarButton:
      'absolute top-0 left-0 z-0 flex h-full w-full items-center justify-center transition-all duration-150 ease-linear',
  }

  return (
    <>
      <Head>
        <title>Ingen - Manage your time efficiently</title>
      </Head>

      <div className="bg-light-background dark:bg-dark-background">
        <div className="mx-auto flex w-full max-w-screen-xl items-center justify-between py-5">
          <h3 className="font-bold dark:text-white">Ingen.</h3>
          {themeContext?.currentTheme === 'dark' ? (
            <button
              className="mx-4 dark:text-white"
              onClick={() =>
                themeContext?.setCurrentTheme(
                  themeContext?.currentTheme === 'dark' ? 'light' : 'dark'
                )
              }
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
            </button>
          ) : (
            <button
              className="mx-4 dark:text-white"
              onClick={() =>
                themeContext?.setCurrentTheme(
                  themeContext?.currentTheme === 'dark' ? 'light' : 'dark'
                )
              }
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                />
              </svg>
            </button>
          )}
        </div>

        <div className="mx-auto flex h-screen w-[1280px] flex-col items-center justify-center">
          <div className="w-full text-left">
            <h1 className="text-left text-xl font-semibold dark:text-dark-theme-heading">
              Calendar
            </h1>
            <h5 className="mt-2 mb-6 text-base font-medium text-black/50 dark:text-dark-theme-body">
              {currentMonth} {currentYear}
            </h5>
          </div>

          <div className="grid w-full grid-cols-8">
            {daysInMonth.map((day, i) => (
              <div
                key={i}
                className={`relative h-[150px] w-auto min-w-[150px] overflow-hidden `}
              >
                {day < todaysDate ? (
                  <button
                    value={day + '/' + currentMonth + '/' + currentYear}
                    onClick={handlePopup}
                    className={`${styles.calendarButton} border-light-border/30 border border-light-border-pale font-normal text-light-text-pale dark:border-dark-theme-primary/20 dark:bg-dark-theme-primary/20 dark:text-white/25`}
                    disabled
                  >
                    {day.toString()}
                  </button>
                ) : day === todaysDate ? (
                  <button
                    value={day + '/' + currentMonth + '/' + currentYear}
                    onClick={handlePopup}
                    className={`${styles.calendarButton} absolute top-0 left-0 z-10 border border-light-theme-primary bg-white/30 hover:bg-light-theme-primary/25  hover:font-semibold hover:text-white dark:border-dark-theme-primary dark:bg-dark-theme-primary/5 dark:text-white dark:hover:bg-dark-theme-primary/50`}
                  >
                    {day.toString()}
                  </button>
                ) : (
                  <button
                    value={day + '/' + currentMonth + '/' + currentYear}
                    onClick={handlePopup}
                    className={`${styles.calendarButton} absolute top-0 left-0 z-0 border border-light-theme-primary/25 bg-white/30 hover:border-light-theme-primary/25 hover:bg-light-theme-primary/10 hover:font-semibold hover:text-light-theme-primary dark:border-dark-theme-primary/25 dark:bg-dark-theme-primary/5 dark:text-white dark:hover:border-dark-theme-primary  dark:hover:bg-dark-theme-primary/50`}
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
