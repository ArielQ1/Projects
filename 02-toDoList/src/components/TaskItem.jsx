import { useState } from 'react'
import { useTask } from '../hooks/useTask'
import { Modal } from './Modal'
import { TaskForm } from './TaskForm'
import { formatDate } from '../helpers/formatDate'
import { SubTaskForm } from './SubTaskForm'

export function TaskItem ({ task }) {
  const { setTasks } = useTask()
  const [isOpen, setIsOpen] = useState(false)
  const [isSubTaskOpen, setIsSubTaskOpen] = useState(false)

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'text-green-400'
      case 'in progress':
        return 'text-yellow-400'
      case 'pending':
        return 'text-red-400'
    }
  }

  const handleClickEdit = () => {
    setIsOpen(true)
  }
  const handleClickDelete = () => {
    setTasks(prevTasks => prevTasks.filter(t => t.id !== task.id))
  }

  const handleClickAddSubtask = () => {
    setIsSubTaskOpen(true)
  }

  const handleChangeCheckBox = (e) => {
    const subTaskId = e.target.id
    setTasks(prevTasks =>
      prevTasks.map(t => {
        if (t.id === task.id) {
          const updatedSubTasks = t.subTasks.map(subTask =>
            subTask.id === subTaskId
              ? { ...subTask, status: subTask.status === 'completed' ? 'pending' : 'completed' }
              : subTask
          )

          const empezandoTask = updatedSubTasks.find(st => st.title === 'Starting')
          const allSubTasksCompleted = updatedSubTasks.every(st => st.status === 'completed')
          const empezandoCompleted = empezandoTask?.status === 'completed'

          let newTaskStatus = t.status

          if (allSubTasksCompleted) {
            newTaskStatus = 'completed'
          } else if (empezandoCompleted) {
            newTaskStatus = 'in progress'
          } else {
            newTaskStatus = 'pending'
          }

          return {
            ...t,
            subTasks: updatedSubTasks,
            status: newTaskStatus
          }
        }
        return t
      })
    )
  }

  return (
    <div className={`p-6 bg-gradient-to-br from-slate-800 via-slate-900 to-slate-800 rounded-2xl mb-4 shadow-xl hover:shadow-2xl transition-all duration-300 border border-slate-700 hover:border-slate-600 group ${task.status === 'completed' ? 'opacity-70' : ''}`}>
      <div className='mb-4 pb-3 border-b border-slate-700 group-hover:border-slate-600 transition-colors duration-200'>
        <h3
          className={`text-white font-semibold text-xl tracking-wide leading-relaxed group-hover:text-blue-300 transition-colors duration-200 ${task.status === 'completed' ? 'line-through text-green-400' : ''}`}
        >
          {task.title}
        </h3>
        <p className='text-gray-400 text-sm mt-1'>
          {formatDate(task.createdAt)}
        </p>
        <p className={`text-sm mt-1 font-medium ${getStatusColor(task.status)}`}>
          {task.status.charAt(0).toUpperCase() + task.status.slice(1)}
        </p>
        <div className='mt-1'>
          <p className='text-gray-500 text-sm mt-1'>
            {task.subTasks.length > 0 ? `Subtasks: ${task.subTasks.length}` : 'No subtasks'}
          </p>
          {task.subTasks.length > 0 && (
            <ul className='list-disc list-inside text-gray-400 mt-1'>
              {task.subTasks.map((subTask) => (
                <div className='flex gap-2' key={subTask.id}>
                  <input
                    onChange={handleChangeCheckBox}
                    type='checkbox'
                    name=''
                    id={subTask.id}
                    checked={subTask.status === 'completed'}
                    readOnly
                  />
                  <label
                    htmlFor={subTask.id}
                    className={`${
                      subTask.status === 'completed' ? 'line-through text-green-400' : ''
                    } ${
                      subTask.isDefault ? 'font-semibold text-blue-300' : ''
                    }`}
                  >
                    {subTask.title}
                  </label>
                  {' - '}
                  <span className={getStatusColor(subTask.status)}>
                    {subTask.status.charAt(0).toUpperCase() + subTask.status.slice(1)}
                  </span>
                </div>
              ))}
            </ul>
          )}
        </div>
        <div className='mt-2 h-1 w-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full opacity-70 group-hover:opacity-100 group-hover:w-16 transition-all duration-300' />
      </div>

      <div className='flex space-x-3 justify-end'>
        <button onClick={handleClickEdit} className='px-5 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl shadow-lg hover:from-blue-700 hover:to-blue-800 hover:scale-105 hover:shadow-xl transition-all duration-200 focus:outline-none focus:ring-3 focus:ring-blue-400 focus:ring-opacity-50 font-medium tracking-wide'>
          <span className='flex items-center space-x-2'>
            <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z' />
            </svg>
            <span>Edit</span>
          </span>
        </button>
        <Modal isOpen={isOpen} onClose={() => setIsOpen(!isOpen)}>
          <TaskForm onClose={setIsOpen} task={task} />
        </Modal>
        <button onClick={handleClickDelete} className='px-5 py-2.5 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-xl shadow-lg hover:from-red-700 hover:to-red-800 hover:scale-105 hover:shadow-xl transition-all duration-200 focus:outline-none focus:ring-3 focus:ring-red-400 focus:ring-opacity-50 font-medium tracking-wide'>
          <span className='flex items-center space-x-2'>
            <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16' />
            </svg>
            <span>Delete</span>
          </span>
        </button>
        <button onClick={handleClickAddSubtask} className='px-5 py-2.5 bg-gradient-to-r from-gray-600 to-gray-700 text-white rounded-xl shadow-lg hover:from-gray-700 hover:to-gray-800 hover:scale-105 hover:shadow-xl transition-all duration-200 focus:outline-none focus:ring-3 focus:ring-gray-400 focus:ring-opacity-50 font-medium tracking-wide'>
          <span className='flex items-center space-x-2'>
            <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 5H7a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z' />
            </svg>
            <span>Add Subtask</span>
          </span>
        </button>
        <Modal isOpen={isSubTaskOpen} onClose={() => setIsSubTaskOpen(!isSubTaskOpen)}>
          <SubTaskForm onClose={setIsSubTaskOpen} task={task} />
        </Modal>
      </div>
    </div>
  )
}
