import React from 'react'
import { Task } from '@/types/task'

interface Props {
  type: string
  tasks: Array<Task>
  markAsDone: () => void
}

const Tasks: React.FC<Props> = ({ type, tasks, markAsDone }) => {
  return (
    <>
      <h1 className="mb-6 text-xl font-semibold">
        {type === 'today'
          ? `Today's Tasks`
          : type === 'upcoming'
          ? `Upcoming Tasks`
          : `Finished Tasks`}
      </h1>
      <ul className="list-none">
        {tasks && tasks.length > 1 ? (
          tasks.map((task) => {
            return (
              task.taskTitle !== '' && (
                <li
                  key={task.taskTitle}
                  className="my-3 flex min-w-[300px] items-center justify-between border bg-white"
                >
                  <span className="block px-5 py-3">{task.taskTitle}</span>

                  <button
                    className="flex items-center justify-center px-4 py-3 text-white bg-blue-400 hover:bg-green-400"
                    onClick={markAsDone}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </button>
                </li>
              )
            )
          })
        ) : (
          <li>
            {type === 'today'
              ? `No Tasks for today`
              : type === 'upcoming'
              ? `No upcoming tasks`
              : `No finished tasks`}
          </li>
        )}
      </ul>
    </>
  )
}

export default Tasks
