import { ChangeEvent, useEffect, useState } from 'react'

import AppLayout from '@/components/layout'
import { SearchIcon } from '@/components/icons'

import useDebounce from '@/hooks/useDebounce'
import { Task } from 'src/types'

const Tasks = () => {
  const [tasks, setTasks] = useState<Array<Task>>([])
  const [filteredTasks, setFilteredTasks] = useState<Array<Task>>([])

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

  const search = (e: ChangeEvent<HTMLInputElement>) => {
    let searchTerm = e.target.value
    let filteredTasks = tasks.filter((task) => task.title.includes(searchTerm))

    setFilteredTasks(filteredTasks)
  }

  return (
    <AppLayout title="Tasks | Ingen">
      <h1 className="mb-4 text-left font-semibold dark:text-dark-theme-heading">
        Tasks
      </h1>
      <div className="mb-4 flex items-center justify-between">
        <div>
          <div className="group flex items-center overflow-hidden rounded-full border border-gray-400/40 px-4 focus-within:border-blue-600">
            <SearchIcon className="h-5 w-5 stroke-gray-400/40 transition group-focus-within:stroke-blue-600" />

            <input
              type="text"
              name=""
              id=""
              placeholder="Search"
              className="h-10 w-60 bg-transparent px-4 text-sm outline-none transition-all duration-300 ease-in-out focus:w-72 dark:text-white"
              onChange={useDebounce(search, 300)}
            />
          </div>
          <div></div>
        </div>
      </div>
      <ul>
        {filteredTasks.length > 0
          ? filteredTasks.map((task) => (
              <li
                key={task.id}
                className="mb-4 rounded-lg border border-black/20 py-2 px-4 dark:border-gray-400/40 dark:text-white"
              >
                {task.title}
              </li>
            ))
          : tasks.map((task) => (
              <li
                key={task.id}
                className="mb-4 rounded-lg border border-black/20 py-2 px-4 dark:border-gray-400/40 dark:text-white"
              >
                <span className="mb-1 block text-xs dark:text-dark-theme-body">
                  {task.date}
                </span>
                <h5 className="dark:text-dark-theme-heading">{task.title}</h5>
              </li>
            ))}
      </ul>
    </AppLayout>
  )
}

export default Tasks
