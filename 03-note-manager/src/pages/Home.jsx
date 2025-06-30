import { useState } from 'react'
import { NoteItem } from '../components/NoteItem'
import Modal from '../components/Modal'
import { NoteForm } from '../components/NoteForm'
import { useNote } from '../hooks/useNote'
import { SearchBar } from '../components/SearchBar'
import { SortFilter } from '../components/SortFilter'

export function Home () {
  const [modalOpen, setModalOpen] = useState(false)
  const [editingNote, setEditingNote] = useState(null)
  const { note } = useNote()
  const [searchTerm, setSearchTerm] = useState('')
  const [sortOrder, setSortOrder] = useState('newest')

  const handleEditNote = (noteToEdit) => {
    setEditingNote(noteToEdit)
  }

  const closeEditModal = () => {
    setEditingNote(null)
  }

  const parseDate = (dateString) => {
    const [day, month, year] = dateString.split('/')
    return new Date(year, month - 1, day)
  }

  const getFilteredAndSortedNotes = () => {
    const filtered = note.filter((noteItem) =>
      noteItem.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      noteItem.content.toLowerCase().includes(searchTerm.toLowerCase())
    )
    switch (sortOrder) {
      case 'newest':
        return filtered.sort((a, b) => parseDate(b.date) - parseDate(a.date))
      case 'oldest':
        return filtered.sort((a, b) => parseDate(a.date) - parseDate(b.date))
      case 'alphabetical':
        return filtered.sort((a, b) => a.title.toLowerCase().localeCompare(b.title.toLowerCase()))
      case 'reverse-alphabetical':
        return filtered.sort((a, b) => b.title.toLowerCase().localeCompare(a.title.toLowerCase()))
      default:
        return filtered
    }
  }

  const filteredNotes = getFilteredAndSortedNotes()

  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-800 relative overflow-hidden'>
      <div className='absolute inset-0 bg-[url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%239CA3AF" fill-opacity="0.05"%3E%3Ccircle cx="30" cy="30" r="1"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")] opacity-50' />

      <div className='relative z-10 flex flex-col min-h-screen'>
        <header className='text-center pt-8 sm:pt-12 lg:pt-16 px-4'>
          <h1 className='text-white text-3xl sm:text-4xl lg:text-5xl font-bold mb-2 sm:mb-4 tracking-tight'>
            📝 Gestor de Notas
          </h1>
          <p className='text-gray-300 text-sm sm:text-base lg:text-lg max-w-2xl mx-auto leading-relaxed'>
            Crea, edita y elimina tus notas fácilmente con una interfaz moderna e intuitiva
          </p>
        </header>

        <div className='flex-none px-4 sm:px-6 lg:px-8 space-y-4'>
          <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          <SortFilter sortOrder={sortOrder} setSortOrder={setSortOrder} />

          <div className='flex justify-center'>
            <button
              onClick={() => setModalOpen(!modalOpen)}
              className='bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 flex items-center gap-2 sm:gap-3 text-sm sm:text-base'
            >
              <svg className='w-5 h-5 sm:w-6 sm:h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 4v16m8-8H4' />
              </svg>
              <span>Crear Nueva Nota</span>
            </button>
          </div>
        </div>

        <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
          <NoteForm closeModal={setModalOpen} />
        </Modal>
        <Modal isOpen={editingNote !== null} onClose={closeEditModal}>
          <NoteForm closeModal={closeEditModal} note={editingNote} />
        </Modal>

        <main className='flex-1 px-4 sm:px-6 lg:px-8 py-6 sm:py-8'>
          <div className='max-w-4xl mx-auto'>
            {(searchTerm || note.length > 0) && (
              <div className='mb-6 text-center'>
                <div className='inline-flex items-center bg-gray-800/50 backdrop-blur-sm px-4 py-2 rounded-full border border-gray-700'>
                  <span className='text-gray-300 text-xs sm:text-sm'>
                    {searchTerm
                      ? `${filteredNotes.length} de ${note.length} nota${note.length !== 1 ? 's' : ''} encontrada${filteredNotes.length !== 1 ? 's' : ''}`
                      : `${note.length} nota${note.length !== 1 ? 's' : ''} total${note.length !== 1 ? 'es' : ''}`}
                    {note.length > 1 && (
                      <>
                        <span className='text-gray-500 mx-2'>•</span>
                        <span className='text-gray-400'>
                          {sortOrder === 'newest' && 'Más recientes primero'}
                          {sortOrder === 'oldest' && 'Más antiguas primero'}
                          {sortOrder === 'alphabetical' && 'Orden alfabético A-Z'}
                          {sortOrder === 'reverse-alphabetical' && 'Orden alfabético Z-A'}
                        </span>
                      </>
                    )}
                  </span>
                </div>
              </div>
            )}

            <div className='grid gap-4 sm:gap-6'>
              {filteredNotes.length > 0
                ? (
                    filteredNotes.map((noteItem) => (
                      <NoteItem key={noteItem.id} note={noteItem} onEdit={handleEditNote} />
                    ))
                  )
                : (
                  <div className='text-center py-12 sm:py-16 lg:py-20'>
                    <div className='max-w-md mx-auto'>
                      <div className='text-6xl sm:text-7xl lg:text-8xl mb-4 opacity-50'>
                        {searchTerm ? '🔍' : '📝'}
                      </div>
                      <h3 className='text-xl sm:text-2xl font-semibold text-gray-300 mb-2'>
                        {searchTerm ? 'No se encontraron notas' : 'No hay notas todavía'}
                      </h3>
                      <p className='text-gray-400 text-sm sm:text-base'>
                        {searchTerm
                          ? `No hay notas que coincidan con "${searchTerm}"`
                          : 'Crea tu primera nota haciendo clic en el botón "Crear Nueva Nota"'}
                      </p>
                    </div>
                  </div>
                  )}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
