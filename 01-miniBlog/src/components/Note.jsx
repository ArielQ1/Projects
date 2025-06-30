import { useState } from 'react'
import { Modal } from './Modal'
import { NoteForm } from './NoteForm'

export function Note ({ note, onDelete, onEdit }) {
  const [isOpen, setIsOpen] = useState(false)

  const handleClickDelete = () => {
    onDelete(note.id)
  }
  const handleClickEdit = () => {
    setIsOpen(true)
  }

  const handleEditNote = (updatedNote) => {
    onEdit(updatedNote)
    setIsOpen(false)
  }

  return (
    <div className='bg-white shadow-md rounded-lg p-6 mb-4'>
      <h2 className='text-xl font-semibold mb-2'>{note.title}</h2>
      <p className='text-gray-700'>{note.content}</p>
      <div className='mt-4 flex justify-between items-center'>
        <span className='text-sm text-gray-500'>Last edited: {note.date}</span>
        <div className='flex gap-4'>
          <button onClick={handleClickEdit} className='text-white bg-green-500/90 rounded-xl px-6 py-2 hover:underline hover:cursor-pointer hover:bg-green-500'>Edit</button>
          <button onClick={handleClickDelete} className='text-white bg-red-500/90 rounded-xl px-6 py-2 hover:underline hover:cursor-pointer hover:bg-red-500'>Delete</button>
        </div>
      </div>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <NoteForm onCreateNote={handleEditNote} title='Edit' note={note} />
      </Modal>
    </div>
  )
}
