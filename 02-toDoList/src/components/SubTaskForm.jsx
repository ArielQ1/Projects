import { useState } from 'react'
import { useTask } from '../hooks/useTask'
import { v4 as uuidv4 } from 'uuid'

export function SubTaskForm ({ onClose, task }) {
  const [subTaskName, setSubTaskName] = useState('')
  const { setTasks } = useTask()

  const handleSubmit = (event) => {
    event.preventDefault()

    if (!subTaskName.trim()) {
      return
    }

    const newSubTask = {
      id: uuidv4(),
      title: subTaskName.trim(),
      status: 'pending',
      createdAt: new Date().toISOString(),
      isDefault: false,
      order: 1
    }

    setTasks((prevTasks) =>
      prevTasks.map((t) => {
        if (t.id === task.id) {
          const startTask = t.subTasks.find(st => st.title === 'Starting')
          const endTask = t.subTasks.find(st => st.title === 'Finished')
          const middleTasks = t.subTasks.filter(st => st.title !== 'Starting' && st.title !== 'Finished')

          const updatedSubTasks = [
            ...(startTask ? [startTask] : []),
            ...middleTasks,
            newSubTask,
            ...(endTask ? [endTask] : [])
          ]

          return { ...t, subTasks: updatedSubTasks }
        }
        return t
      })
    )

    setSubTaskName('')
    onClose(false)
  }

  const handleCancel = () => {
    setSubTaskName('')
    onClose(false)
  }

  return (
    <div className='p-6 bg-gradient-to-br from-slate-800 via-slate-900 to-slate-800 rounded-2xl mb-4 shadow-xl hover:shadow-2xl transition-all duration-300 border border-slate-700 hover:border-slate-600 group'>
      <div className='mb-4 pb-3 border-b border-slate-700 group-hover:border-slate-600 transition-colors duration-200'>
        <h3 className='text-white font-semibold text-xl tracking-wide leading-relaxed group-hover:text-blue-300 transition-colors duration-200'>
          Add Subtask
        </h3>
      </div>
      <form onSubmit={handleSubmit} className='space-y-4'>
        <div>
          <input
            type='text'
            placeholder='Enter subtask name...'
            value={subTaskName}
            onChange={(e) => setSubTaskName(e.target.value)}
            className='w-full p-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring focus:ring-blue-500'
          />
        </div>
        <div className='flex justify-end space-x-3'>
          <button
            type='button'
            onClick={handleCancel}
            className='px-5 py-2.5 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors duration-200'
          >
            Cancel
          </button>
          <button
            type='submit'
            className='px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200'
          >
            Add Subtask
          </button>
        </div>
      </form>
    </div>
  )
}
