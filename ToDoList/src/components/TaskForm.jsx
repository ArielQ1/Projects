import { useState } from 'react'
import { useTask } from '../hooks/useTask'
import { v4 as uuidv4 } from 'uuid'

export function TaskForm ({ isOpen, task }) {
  const [taskName, setTaskName] = useState(task ? task.title : '')
  const [taskStatus, setTaskStatus] = useState(task ? task.status : 'pending')
  const { setTasks } = useTask()

  const handleSubmit = (event) => {
    event.preventDefault()

    if (!taskName.trim()) {
      return
    }

    if (task) {
      const updatedTask = {
        ...task,
        title: taskName.trim(),
        status: taskStatus,
        updatedAt: new Date().toISOString()
      }
      setTasks((prevTasks) =>
        prevTasks.map((t) => (t.id === task.id ? updatedTask : t))
      )
    } else {
      const newTask = {
        id: uuidv4(),
        title: taskName.trim(),
        status: taskStatus,
        subTasks: [],
        createdAt: new Date().toISOString()
      }
      setTasks((prevTasks) => [...prevTasks, newTask])
    }

    setTaskName('')
    isOpen(false)
  }

  const handleCancel = () => {
    setTaskName(task ? task.title : '')
    isOpen(false)
  }

  return (
    <div className='p-6 bg-gradient-to-br from-slate-800 via-slate-900 to-slate-800 rounded-2xl mb-4 shadow-xl hover:shadow-2xl transition-all duration-300 border border-slate-700 hover:border-slate-600 group'>
      <div className='mb-4 pb-3 border-b border-slate-700 group-hover:border-slate-600 transition-colors duration-200'>
        <h3 className='text-white font-semibold text-xl tracking-wide leading-relaxed group-hover:text-blue-300 transition-colors duration-200'>
          {task ? 'Edit Task' : 'New Task'}
        </h3>
      </div>
      <form onSubmit={handleSubmit} className='space-y-4'>
        <div>
          <input
            type='text'
            placeholder='Enter task name...'
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            className='w-full p-3 bg-slate-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-slate-400 border border-slate-600 focus:border-blue-500 transition-colors duration-200'
            required
          />
          {!taskName.trim() && (
            <p className='text-red-400 text-sm mt-1'>Task name is required</p>
          )}
          <select
            value={taskStatus}
            onChange={(e) => setTaskStatus(e.target.value)}
            className='w-full p-3 mt-2 bg-slate-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-slate-400 border border-slate-600 focus:border-blue-500 transition-colors duration-200'
          >
            <option value='pending'>Pending</option>
            <option value='in progress'>In Progress</option>
            <option value='completed'>Completed</option>
          </select>
        </div>

        <div className='flex space-x-3 pt-2'>
          <button
            type='submit'
            disabled={!taskName.trim()}
            className='flex-1 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl shadow-lg hover:from-blue-700 hover:to-blue-800 hover:scale-105 hover:shadow-xl transition-all duration-200 focus:outline-none focus:ring-3 focus:ring-blue-400 focus:ring-opacity-50 font-medium tracking-wide disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100'
          >
            <span className='flex items-center justify-center space-x-2'>
              <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M5 13l4 4L19 7' />
              </svg>
              <span>{task ? 'Update' : 'Create'} Task</span>
            </span>
          </button>

          <button
            type='button'
            onClick={handleCancel}
            className='px-5 py-2.5 bg-gradient-to-r from-gray-600 to-gray-700 text-white rounded-xl shadow-lg hover:from-gray-700 hover:to-gray-800 hover:scale-105 hover:shadow-xl transition-all duration-200 focus:outline-none focus:ring-3 focus:ring-gray-400 focus:ring-opacity-50 font-medium tracking-wide'
          >
            <span className='flex items-center justify-center space-x-2'>
              <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' />
              </svg>
              <span>Cancel</span>
            </span>
          </button>
        </div>
      </form>
    </div>
  )
}
