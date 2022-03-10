import { Tab } from '@/types/tab'
import { Task } from '@/types/task'
import type { NextPage } from 'next'
import Head from 'next/head'
import { useState } from 'react'
import Popup from '@/components/popup'
import Tasks from '@/components/tasks'

const Home: NextPage = () => {
  /*
   ** Things required for Calendar
   ** ! - I'll need to work on the calendar implementation, and make it a bit simpler
   */
  const months: Array<string> = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ]
  const d: Date = new Date()
  const days: number = new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate()
  const currentDate: number = d.getDate()
  const currentMonth: string = months[d.getMonth()]
  const currentYear: number = d.getFullYear()
  const daysInMonth: Array<number | string> = []
  for (let i = 1; i <= days; i++) {
    if (i < 10) daysInMonth.push('0' + i.toString())
    else daysInMonth.push(i)
  }

  /*
   ** Required tabs
   */
  const tabs: Array<Tab> = [
    {
      id: 0,
      title: "Today's Tasks",
    },
    {
      id: 1,
      title: 'Upcoming Tasks',
    },
    ,
    {
      id: 2,
      title: 'Finished Tasks',
    },
  ] as Array<Tab>

  const initialTasksState = [
    {
      chosenDate: '',
      taskTitle: '',
      description: '',
      from: '',
      to: '',
    },
  ]

  /*
   ** And here comes the state
   */
  const [currentTab, setCurrentTab] = useState<number>(0)
  const [todaysTasks, setTodaysTasks] = useState<Array<Task>>(initialTasksState)
  const [upcomingTasks, setUpcomingTasks] =
    useState<Array<Task>>(initialTasksState)
  const [finishedTasks, setFinishedTasks] =
    useState<Array<Task>>(initialTasksState)
  const [popup, setPopup] = useState({
    isOpen: false,
    chosenDate: '',
  })
  const [form, setForm] = useState({
    chosenDate: '',
    taskTitle: '',
    description: '',
    from: '',
    to: '',
  })

  /*
   ** Required functions
   * ! - Form management can be made simpler, please work on that when you are able to
   */
  function handlePopup(e: React.MouseEvent<HTMLButtonElement>): void {
    let chosenDate = (e.target as HTMLButtonElement).value
    if (e.target) {
      setPopup({
        isOpen: true,
        chosenDate,
      })
    }
  }

  // ! - Doubtful about the event type - might have to check it out later
  function setChosenDate(e: React.ChangeEvent<HTMLInputElement>) {
    let chosenDate = (e.target as HTMLInputElement).value
    setForm({
      ...form,
      chosenDate,
    })
  }
  function setTaskTitle(e: React.ChangeEvent<HTMLInputElement>): void {
    let taskTitle = (e.target as HTMLInputElement).value
    setForm({
      ...form,
      taskTitle,
    })
  }
  function setDescription(e: React.ChangeEvent<HTMLInputElement>): void {
    let description = (e.target as HTMLInputElement).value
    setForm({
      ...form,
      description,
    })
  }
  function setFrom(e: React.ChangeEvent<HTMLInputElement>): void {
    let from = (e.currentTarget as HTMLInputElement).value
    setForm({
      ...form,
      from,
    })
  }
  function setTo(e: React.ChangeEvent<HTMLInputElement>): void {
    let to = (e.target as HTMLInputElement).value
    setForm({
      ...form,
      to,
    })
  }
  function markAsDone(taskTitle: string, chosenDate: string): void {
    let formattedChosenDate = parseInt(chosenDate.split('/')[0])
    if (formattedChosenDate > currentDate) {
      let tempTasks = upcomingTasks
      upcomingTasks.map((task) => {
        if (task.taskTitle === taskTitle) {
          tempTasks.splice(upcomingTasks.indexOf(task), 1)
        }
      })

      setUpcomingTasks(tempTasks)
    } else if (formattedChosenDate === currentDate) {
      let tempTasks = todaysTasks
      todaysTasks.map((task) => {
        if (task.taskTitle === taskTitle) {
          tempTasks.splice(todaysTasks.indexOf(task), 1)
        }
      })

      setTodaysTasks(tempTasks)
    }
  }
  function submitForm(chosenDate: string): void {
    if (form.taskTitle !== '') {
      let formattedChosenDate = parseInt(chosenDate.split('/')[0])
      let task = {
        ...form,
        chosenDate,
      }
      if (formattedChosenDate > currentDate) {
        setUpcomingTasks([...upcomingTasks, task])
        setCurrentTab(1)
      } else if (formattedChosenDate === currentDate) {
        setTodaysTasks([...todaysTasks, task])
        setCurrentTab(0)
      }
      setPopup({ ...popup, isOpen: false })
    }
  }

  return (
    <>
      <Head>
        <title>Simple Task Planner</title>
      </Head>
      <div className="flex w-screen items-center">
        <div className="mx-auto flex h-screen w-fit flex-col items-center justify-center px-6">
          <ul>
            {tabs &&
              tabs.map((tab) => (
                <li
                  key={tab.id}
                  className={`font-secondary mb-5 block w-full cursor-pointer border border-black px-5 py-2 text-center text-sm font-medium text-black transition-all duration-150 ease-linear ${
                    currentTab === tab.id
                      ? 'border-light-theme-primary bg-light-theme-primary text-white'
                      : 'border-light-theme-primary/25 text-light-theme-primary hover:bg-light-theme-primary/25'
                  }`}
                  onClick={() => setCurrentTab(tab.id)}
                >
                  {tab.title}
                </li>
              ))}
          </ul>
        </div>
        <div className="mx-auto flex min-h-[470px] w-1/5 flex-col items-start justify-start px-6">
          {currentTab === 0 ? (
            <Tasks type="today" tasks={todaysTasks} markAsDone={markAsDone} />
          ) : currentTab === 1 ? (
            <Tasks
              type="upcoming"
              tasks={upcomingTasks}
              markAsDone={markAsDone}
            />
          ) : (
            <Tasks
              type="finished"
              tasks={finishedTasks}
              markAsDone={markAsDone}
            />
          )}
        </div>
        <div className="mx-auto flex h-screen w-2/5 flex-col items-start justify-center">
          <h1 className="text-xl font-semibold">Calendar</h1>
          <h5 className="mt-2 mb-6 text-base font-medium text-black/50">
            {currentMonth} {currentYear}
          </h5>
          <div className="grid grid-cols-8 justify-start">
            {daysInMonth.map((day, i) => (
              <button
                key={i}
                value={day + '/' + currentMonth + '/' + currentYear}
                onClick={handlePopup}
                className={`h-[90px] w-[90px] items-center justify-center border transition-all duration-150 ease-linear ${
                  day == currentDate
                    ? 'bg-light-theme-primary font-bold text-white'
                    : day < currentDate
                    ? 'bg-light-theme-primary/5'
                    : 'border-light-theme-primary/10 bg-white hover:bg-light-theme-primary/25 hover:text-light-theme-primary'
                }`}
                disabled={day < currentDate ? true : false}
              >
                {day}
              </button>
            ))}
          </div>
        </div>
      </div>

      {popup.isOpen ? (
        <Popup
          popup={popup}
          setChosenDate={setChosenDate}
          setTaskTitle={setTaskTitle}
          setDescription={setDescription}
          setFrom={setFrom}
          setTo={setTo}
          setPopup={setPopup}
          submitForm={submitForm}
        />
      ) : null}
    </>
  )
}

export default Home
