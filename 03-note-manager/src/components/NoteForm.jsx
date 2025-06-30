import { useState } from 'react'
import { useNote } from '../hooks/useNote'
import { v4 as uuidv4 } from 'uuid'

export function NoteForm ({ closeModal, note }) {
  const { setNote } = useNote()
  const [title, setTitle] = useState(note ? note.title : '')
  const [content, setContent] = useState(note ? note.content : '')

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!title.trim() || !content.trim()) {
      console.log('Por favor, completa todos los campos.')
      return
    }

    if (note) {
      const updatedNote = {
        ...note,
        title: title.trim(),
        content: content.trim(),
        date: new Date().toLocaleDateString()
      }
      setNote((prevNotes) =>
        prevNotes.map((n) => (n.id === note.id ? updatedNote : n))
      )
    } else {
      const id = uuidv4()
      const date = new Date().toLocaleDateString()
      setNote((prevNotes) => [
        ...prevNotes,
        { id, title: title.trim(), content: content.trim(), date }
      ])
      setTitle('')
      setContent('')
    }
    closeModal(false)
  }

  return (
    <form onSubmit={handleSubmit} className='bg-gradient-to-b from-gray-800 to-gray-900 p-4 sm:p-6 lg:p-8 rounded-xl shadow-2xl border border-gray-700'>
      <h1 className='text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-4 sm:mb-6 text-center'>
        {note ? 'Editar nota' : 'Crear una nueva nota'}
      </h1>
      <div className='space-y-4'>
        <div>
          <label className='block text-sm font-medium text-gray-300 mb-2'>
            Título
          </label>
          <input
            type='text'
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            placeholder='Escribe el título de la nota'
            className='w-full p-3 sm:p-4 bg-gray-700/50 text-white placeholder-gray-400 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 backdrop-blur-sm'
          />
        </div>
        <div>
          <label className='block text-sm font-medium text-gray-300 mb-2'>
            Contenido
          </label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder='Escribe el contenido de la nota'
            className='w-full p-3 sm:p-4 bg-gray-700/50 text-white placeholder-gray-400 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 backdrop-blur-sm resize-none'
            rows='4'
          />
        </div>
        <button
          type='submit'
          className='w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold px-4 py-3 sm:py-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800'
        >
          {note ? 'Actualizar Nota' : 'Guardar Nota'}
        </button>
      </div>
    </form>
  )
}
