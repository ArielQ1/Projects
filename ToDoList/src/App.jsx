import { TaskProvider } from './context/task'
import { Home } from './pages/Home'

function App () {
  return (
    <TaskProvider>
      <Home />
    </TaskProvider>
  )
}

export default App
