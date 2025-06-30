import { useEffect, useState } from 'react'
import { Modal } from '../components/Modal'
import { TaskForm } from '../components/TaskForm'
import { TaskItem } from '../components/TaskItem'
import { useTask } from '../hooks/useTask'
import { FilterBar } from '../components/FilterBar'

export function Home () {
  const { tasks } = useTask()
  const [isOpen, setIsOpen] = useState(false)
  const [filter, setFilter] = useState('all')
  const [data, setData] = useState([])
  useEffect(() => {
    window.localStorage.setItem('tasks', JSON.stringify(tasks))
    if (filter === 'all') {
      setData(tasks)
    } else {
      setData(tasks.filter(task => task.status.toLowerCase() === filter.toLowerCase()))
    }
  }, [filter, tasks])

  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gray-800'>
      <h1 className='text-4xl text-center font-bold mb-4 text-gray-200 p-4'>Welcome to the To-Do List App</h1>
      <FilterBar filter={filter} setFilter={setFilter} />
      <button onClick={() => setIsOpen(!isOpen)} className='px-6 py-3 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 transition-colors duration-300 mb-6'>
        Add New Task
      </button>
      <div className='flex flex-wrap justify-center gap-6'>
        {
          data.map((task) => (
            <TaskItem key={task.id} task={task} />
          ))
        }
      </div>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(!isOpen)}>
        <TaskForm onClose={setIsOpen} />
      </Modal>
    </div>
  )
}
