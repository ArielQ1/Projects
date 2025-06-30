import { createContext, useEffect, useState } from 'react'

export const NoteContext = createContext()

export const NoteProvider = ({ children }) => {
  const [note, setNote] = useState(() => {
    try {
      const storedNotes = window.localStorage.getItem('notes')
      return storedNotes ? JSON.parse(storedNotes) : []
    } catch (error) {
      console.error('Error al cargar notas desde localStorage:', error)
      return []
    }
  })

  useEffect(() => {
    try {
      window.localStorage.setItem('notes', JSON.stringify(note))
    } catch (error) {
      console.error('Error al guardar notas en localStorage:', error)
    }
  }, [note])

  return (
    <NoteContext.Provider value={{ note, setNote }}>
      {children}
    </NoteContext.Provider>
  )
}
