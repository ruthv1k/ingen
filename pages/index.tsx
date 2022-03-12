import { Task } from '@/types/task'
import type { NextPage } from 'next'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import Popup from '@/components/popup'
import { customAlphabet } from 'nanoid'
import useCalendar from '@/helpers/useCalendar'

const Home: NextPage = () => {
  const { today, currentMonth, currentYear, daysInMonth } = useCalendar()
  const [tasks, setTasks] = useState<Array<Task>>([])
  const [popup, setPopup] = useState({
    isOpen: false,
    date: '',
  })

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
      setPopup({
        isOpen: true,
        date,
      })
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
      setPopup({ date: '', isOpen: false })
    }
  }

  return (
    <>
      <Head>
        <title>Simple Task Planner</title>
      </Head>
      <div className="flex items-center w-screen">
        <div className="flex flex-col items-start justify-center h-screen mx-auto min-w-fit">
          <h1 className="text-xl font-semibold">Calendar</h1>
          <h5 className="mt-2 mb-6 text-base font-medium text-black/50">
            {currentMonth} {currentYear}
          </h5>
          <div className="grid justify-start grid-cols-8">
            {daysInMonth.map((day, i) => (
              <div
                key={i}
                className={`relative h-[150px] w-[150px] overflow-hidden border`}
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
                  className={`duration-15 0 absolute top-0 left-0 z-0 flex h-full w-full items-center justify-center bg-white/30 transition-all ease-linear ${
                    day == today
                      ? 'border-2 border-light-theme-primary/50 hover:font-semibold hover:text-light-theme-primary'
                      : day > today
                      ? 'hover:bg-light-theme-primary/25 hover:font-semibold hover:text-white'
                      : 'bg-light-theme-primary/5'
                  }`}
                  disabled={day < today ? true : false}
                >
                  {day}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {popup.isOpen ? (
        <Popup
          popup={popup}
          setPopup={setPopup}
          submitForm={submitForm}
          tasks={tasks}
          markAsDone={markAsDone}
        />
      ) : null}
    </>
  )
}

export default Home
