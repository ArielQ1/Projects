import { useNote } from '../hooks/useNote'

export function NoteItem ({ note, onEdit }) {
  const { setNote } = useNote()

  const handleClickEdit = () => {
    onEdit(note)
  }
  const handleClickDelete = () => {
    if (window.confirm('¿Estás seguro de que quieres eliminar esta nota?')) {
      setNote((prevNotes) => prevNotes.filter((n) => n.id !== note.id))
    }
  }

  return (
    <div className='bg-gradient-to-br from-gray-800/80 to-gray-900/90 backdrop-blur-sm p-4 sm:p-6 rounded-2xl shadow-xl border border-gray-700/50 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:border-gray-600/50 group'>
      <div className='flex flex-col sm:flex-row sm:items-center justify-between mb-3 sm:mb-4 gap-2'>
        <h2 className='text-lg sm:text-xl lg:text-2xl font-semibold text-gray-100 group-hover:text-white transition-colors line-clamp-2'>
          {note.title}
        </h2>
        <span className='text-xs sm:text-sm text-gray-400 bg-gray-700/50 px-2 py-1 rounded-full whitespace-nowrap self-start sm:self-auto'>
          📅 {note.date}
        </span>
      </div>
      <p className='text-gray-300 text-sm sm:text-base mb-4 sm:mb-6 line-clamp-3 leading-relaxed'>
        {note.content}
      </p>
      <div className='flex flex-col sm:flex-row gap-2 sm:gap-3 sm:justify-end'>
        <button
          onClick={handleClickEdit}
          className='flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 text-sm sm:text-base font-medium'
        >
          <svg width='16' height='16' fill='none' stroke='currentColor' strokeWidth='2' className='inline-block' viewBox='0 0 24 24'>
            <path d='M16.862 3.487a2.5 2.5 0 1 1 3.535 3.535l-12.02 12.02-4.243.707.707-4.243 12.02-12.02z' />
            <path d='M15.5 6.5l2 2' />
          </svg>
          <span className='hidden sm:inline'>Editar</span>
          <span className='sm:hidden'>✏️ Editar</span>
        </button>
        <button
          onClick={handleClickDelete}
          className='flex items-center justify-center gap-2 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 text-sm sm:text-base font-medium'
        >
          <svg viewBox='0 0 24 24' stroke='currentColor' strokeWidth='2' width='16px' height='16px' fill='none'>
            <path d='M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6h14zM10 11v6M14 11v6' />
          </svg>
          <span className='hidden sm:inline'>Eliminar</span>
          <span className='sm:hidden'>🗑️ Eliminar</span>
        </button>
      </div>
    </div>
  )
}
