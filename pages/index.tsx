import { Tab } from '@/types/tab'
import { Task } from '@/types/task'
import type { NextPage } from 'next'
import Head from 'next/head'
import { useState } from 'react'
import Tasks from './components/tasks'

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

  /*
   ** Required functions
   */
  function markAsDone(): void {}

  return (
    <>
      <Head>
        <title>Simple Task Planner</title>
      </Head>
      <div className="flex items-center w-screen">
        <div className="flex flex-col items-center justify-center h-screen px-6 mx-auto w-fit">
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
        <div className="flex flex-col items-start justify-center w-2/5 h-screen mx-auto">
          <h1 className="text-xl font-semibold">Calendar</h1>
          <h5 className="mt-2 mb-6 text-base font-medium text-black/50">
            {currentMonth} {currentYear}
          </h5>
          <div className="grid justify-start grid-cols-8">
            {daysInMonth.map((day, i) => (
              <button
                key={i}
                value={day + '/' + currentMonth + '/' + currentYear}
                // onClick={}
                className={`h-[100px] w-[100px] items-center justify-center border transition-all duration-150 ease-linear ${
                  day == currentDate
                    ? 'bg-light-theme-primary/25 text-light-theme-primary hover:bg-light-theme-primary hover:text-white'
                    : 'border-light-theme-primary/10 bg-white hover:bg-light-theme-primary/25 '
                }`}
              >
                {day}
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default Home
