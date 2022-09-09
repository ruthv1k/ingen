import AppLayout from '@/components/layout'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { Task } from 'types'

const Tasks = () => {
  const [tasks, setTasks] = useState<Array<Task>>([])

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
    <AppLayout title="Tasks | Ingen">
      <div className="w-full text-center">
        <Image
          src={'/images/working-on-it.svg'}
          blurDataURL="/images/working-on-it.svg"
          placeholder="blur"
          width={1280}
          height={640}
          alt="Under Construction"
          priority
        />
        <h5 className="mb-2 text-xl font-bold md:text-2xl">
          Page under construction
        </h5>
        <span className="md:text-normal text-sm">
          Illustration by{' '}
          <a href="https://icons8.com/illustrations/author/ARh4OKrFtdfC">
            Pixeltrue
          </a>{' '}
          from <a href="https://icons8.com/illustrations">Ouch!</a>
        </span>
      </div>
    </AppLayout>
  )
}

export default Tasks
