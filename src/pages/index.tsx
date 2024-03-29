import {
  eachDayOfInterval,
  endOfMonth,
  startOfMonth,
  startOfToday,
} from 'date-fns'
import { customAlphabet } from 'nanoid'
import { NextPage } from 'next'
import { useEffect, useState } from 'react'

// types
import { Task } from 'src/types'

// components
import Popup from 'src/components/popup'

// helpers
import { usePopup } from 'src/hooks/usePopup'

// context
import Calendar from 'src/components/calendar'
import AppLayout from 'src/components/layout'

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

  useEffect(() => {
    let storage: string | null = localStorage.getItem('tasks')
    if (storage) {
      let tasksInLocal: Array<Task> = JSON.parse(storage).tasks
      if (tasks.length === 0 && tasksInLocal.length > 0) {
        setTasks(tasksInLocal)
      }
    }
    if (tasks.length > 0)
      localStorage.setItem('tasks', JSON.stringify({ tasks }))
  }, [tasks])

  return (
    <>
      <AppLayout>
        <Calendar month={month} setMonth={setMonth} handlePopup={handlePopup} />
      </AppLayout>

      {popup.isOpen && (
        <Popup
          popup={popup}
          closePopup={closePopup}
          submitForm={submitForm}
          markAsDone={markAsDone}
        />
      )}
    </>
  )
}

export default Home
