export function SearchBar ({ searchTerm, setSearchTerm }) {
  const handleClear = () => {
    setSearchTerm('')
  }

  return (
    <div className='w-full max-w-xs sm:max-w-md lg:max-w-lg mx-auto mt-4 sm:mt-6 relative px-4 sm:px-0'>
      <div className='relative group'>
        <div className='absolute inset-y-0 left-0 pl-3 sm:pl-4 flex items-center pointer-events-none'>
          <svg className='h-4 w-4 sm:h-5 sm:w-5 text-gray-400 group-focus-within:text-blue-400 transition-colors' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z' />
          </svg>
        </div>
        <input
          type='text'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder='Buscar por título o contenido...'
          className='w-full pl-10 sm:pl-12 pr-10 sm:pr-12 py-3 sm:py-4 bg-gray-700/50 text-white placeholder-gray-400 rounded-xl border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 backdrop-blur-sm text-sm sm:text-base'
        />
        {searchTerm && (
          <button
            onClick={handleClear}
            className='absolute inset-y-0 right-0 pr-3 sm:pr-4 flex items-center text-gray-400 hover:text-gray-200 transition-colors group'
            aria-label='Limpiar búsqueda'
          >
            <svg className='h-4 w-4 sm:h-5 sm:w-5 group-hover:scale-110 transition-transform' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' />
            </svg>
          </button>
        )}
      </div>
      {searchTerm && (
        <div className='mt-2 text-xs sm:text-sm text-gray-400 text-center animate-fade-in'>
          Buscando: <span className='text-blue-400 font-medium'>"{searchTerm}"</span>
        </div>
      )}
    </div>
  )
}
