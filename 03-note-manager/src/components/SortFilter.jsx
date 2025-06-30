export function SortFilter ({ sortOrder, setSortOrder }) {
  return (
    <div className='w-full max-w-xs sm:max-w-md mx-auto mt-3 sm:mt-4 px-4 sm:px-0'>
      <div className='flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3'>
        <span className='text-gray-300 text-xs sm:text-sm font-medium whitespace-nowrap'>
          Ordenar por:
        </span>
        <div className='relative'>
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className='appearance-none bg-gray-700/50 text-white border border-gray-600 rounded-lg px-3 sm:px-4 py-2 sm:py-3 pr-8 sm:pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 backdrop-blur-sm text-xs sm:text-sm min-w-[160px] sm:min-w-[180px]'
          >
            <option value='newest'>📅 Más recientes</option>
            <option value='oldest'>📅 Más antiguas</option>
            <option value='alphabetical'>🔤 A-Z (título)</option>
            <option value='reverse-alphabetical'>🔤 Z-A (título)</option>
          </select>
          <div className='absolute inset-y-0 right-0 flex items-center pr-2 sm:pr-3 pointer-events-none'>
            <svg className='h-3 w-3 sm:h-4 sm:w-4 text-gray-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 9l-7 7-7-7' />
            </svg>
          </div>
        </div>
      </div>
    </div>
  )
}
