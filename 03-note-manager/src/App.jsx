import { NoteProvider } from './context/note'
import { Home } from './pages/Home'

function App () {
  return (
    <NoteProvider>
      <Home />
    </NoteProvider>
  )
}

export default App
