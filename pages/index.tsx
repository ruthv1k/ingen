import {
  eachDayOfInterval,
  endOfMonth,
  format,
  startOfMonth,
  startOfToday,
} from 'date-fns'
import { customAlphabet } from 'nanoid'
import { NextPage } from 'next'
import Head from 'next/head'
import { useEffect, useState } from 'react'

// types
import { Task } from 'types'

// components
import Popup from '@/components/popup'

// helpers
import { usePopup } from 'hooks/usePopup'

// context
import Calendar from '@/components/calendar'
import AppLayout from '@/components/layout'

const getMonthDates = (date: Date) => {
  return eachDayOfInterval({
    start: startOfMonth(date),
    end: endOfMonth(date),
  })
}

const Home: NextPage = () => {
  const [month, setMonth] = useState(getMonthDates(startOfToday()))
  const [tasks, setTasks] = useState<Array<Task>>([])
  const { popup, openPopup, closePopup } = usePopup()

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
      <AppLayout>
        <Calendar
          month={month}
          setMonth={setMonth}
          handlePopup={handlePopup}
          tasks={tasks}
        />
      </AppLayout>

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
