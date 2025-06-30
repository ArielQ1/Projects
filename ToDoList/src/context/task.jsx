import { createContext, useState } from 'react'

export const TaskContext = createContext()

export function TaskProvider ({ children }) {
  const [tasks, setTasks] = useState(window.localStorage.getItem('tasks') ? JSON.parse(window.localStorage.getItem('tasks')) : [])

  return (
    <TaskContext.Provider value={{ tasks, setTasks }}>
      {children}
    </TaskContext.Provider>
  )
}
