export function Modal ({ children, isOpen, onClose }) {
  if (!isOpen) return null

  return (
    <div className='fixed inset-0 flex items-center justify-center z-50 bg-black/70'>
      <div className='rounded-lg shadow-lg p-6 w-full max-w-md'>
        <button
          className='absolute top-4 right-4 rounded-full bg-red-600/80 text-gray-100 px-2 hover:cursor-pointer hover:bg-red-600 transition-colors duration-300'
          onClick={onClose}
        >
          &times;
        </button>
        {children}
      </div>
    </div>
  )
}
