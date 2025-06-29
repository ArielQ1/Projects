import { useState } from 'react'

export function NoteForm ({ onCreateNote, title = 'Create', note }) {
  const [titleValue, setTitleValue] = useState(note ? note.title : '')
  const [contentValue, setContentValue] = useState(note ? note.content : '')

  const handleSubmit = (event) => {
    event.preventDefault()
    const title = event.target.title.value
    const content = event.target.content.value
    const noteData = {
      id: note ? note.id : Date.now(),
      title,
      content,
      date: new Date().toLocaleDateString()
    }
    onCreateNote(noteData)
    if (!note) {
      event.target.reset()
    }
  }

  const handleTitleChange = (event) => {
    setTitleValue(event.target.value)
  }
  const handleContentChange = (event) => {
    setContentValue(event.target.value)
  }

  return (
    <form onSubmit={handleSubmit} className='bg-white shadow-md rounded-lg p-6 mb-4'>
      <h2 className='text-xl font-semibold mb-2'>{title} Note</h2>
      <div className='mb-4'>
        <label htmlFor='title' className='block text-gray-700'>Title</label>
        <input type='text' onChange={handleTitleChange} value={titleValue} id='title' className='w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500' />
      </div>
      <div className='mb-4'>
        <label htmlFor='content' className='block text-gray-700'>Content</label>
        <textarea id='content' onChange={handleContentChange} value={contentValue} rows='4' className='w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500' />
      </div>
      <button type='submit' className='text-white bg-blue-500/90 rounded-xl px-6 py-2 hover:underline hover:cursor-pointer hover:bg-blue-500'>Save Note</button>
    </form>
  )
}
