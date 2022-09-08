import {
  eachDayOfInterval,
  endOfMonth,
  format,
  startOfMonth,
  startOfToday,
} from 'date-fns'
import { useContext, useEffect, useState } from 'react'
import Head from 'next/head'
import { NextPage } from 'next'
import { customAlphabet } from 'nanoid'

// types
import { Task } from 'types'

// components
import Popup from '@/components/popup'

// helpers
import { usePopup } from 'hooks/usePopup'

// context
import { ThemeContext } from 'context/ThemeContext'
import { ToggleThemeButton } from '@/components/buttons/buttons'
import Calendar from '@/components/calendar'

const getMonthDates = (date: Date) => {
  return eachDayOfInterval({
    start: startOfMonth(date),
    end: endOfMonth(date),
  })
}

const Home: NextPage = () => {
  const themeContext = useContext(ThemeContext)

  const [month, setMonth] = useState(getMonthDates(startOfToday()))
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

      {/* Header */}
      <header className="mx-auto mb-6 flex w-11/12 items-center justify-between py-6 md:max-w-screen-md">
        <h3 className="font-bold dark:text-white">Ingen.</h3>
        <ToggleThemeButton themeContext={themeContext} />
      </header>

      {/* Main Content */}
      <main className="mx-auto w-11/12 md:max-w-screen-md">
        <h1 className="mb-4 text-left font-semibold dark:text-dark-theme-heading">
          {format(new Date(), 'MMMM')} {format(new Date(), 'y')}
        </h1>
        <Calendar month={month} handlePopup={handlePopup} tasks={tasks} />
      </main>

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
