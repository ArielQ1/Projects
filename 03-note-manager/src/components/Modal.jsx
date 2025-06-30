const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null

  return (
    <div className='fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-2 sm:p-4'>
      <div className='w-full max-w-sm sm:max-w-md lg:max-w-lg max-h-[95vh] sm:max-h-[90vh] shadow-2xl relative animate-fade-in overflow-y-auto rounded-lg'>
        <button
          className='absolute bg-red-500 hover:bg-red-600 rounded-full w-8 h-8 flex items-center justify-center top-2 right-2 sm:top-4 sm:right-4 text-lg sm:text-xl text-white transition-all duration-200 hover:scale-110 z-10 shadow-lg'
          onClick={onClose}
          aria-label='Cerrar modal'
        >
          ×
        </button>
        <div className='p-1'>{children}</div>
      </div>
    </div>
  )
}

export default Modal
