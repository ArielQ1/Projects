import { Note } from '../components/Note'
import dataJSON from '../../DATA_NOTES.json'
import { NoteForm } from '../components/NoteForm'
import { useState } from 'react'
import { Modal } from '../components/Modal'

export function Home () {
  const [data, setData] = useState(dataJSON)
  const [isOpen, setIsOpen] = useState(false)

  const handleCreateNote = (newNote) => {
    setData([...data, newNote])
    setIsOpen(false)
  }
  const handleDeleteNote = (id) => {
    setData(data.filter(note => note.id !== id))
  }
  const handleEditNote = (updatedNote) => {
    setData(data.map(note => (note.id === updatedNote.id ? updatedNote : note)))
  }

  return (
    <>
      <div className='bg-gray-100 p-6 rounded-lg shadow-md'>
        <h2 className='text-2xl font-semibold mb-4'>My Notes</h2>
        <p className='text-gray-600 mb-6'>Here are your notes. You can create, edit, and delete them.</p>
        <button
          onClick={() => setIsOpen(true)}
          className='text-white bg-blue-500/90 rounded-xl px-6 py-2 hover:underline hover:cursor-pointer hover:bg-blue-500 mb-4'
        >Create Note
        </button>
        <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
          <NoteForm onCreateNote={handleCreateNote} />
        </Modal>
        <div>
          {
            data.map((note) => (
              <Note key={note.id} note={note} onDelete={handleDeleteNote} onCreateNote={handleCreateNote} onEdit={handleEditNote} />
            ))
          }
        </div>
      </div>
    </>
  )
}
