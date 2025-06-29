export function Modal ({ children, isOpen, onClose }) {
  if (!isOpen) return null

  return (
    <div className='fixed inset-0 flex items-center justify-center bg-black/70 z-50'>
      <div className='bg-white rounded-lg shadow-lg p-6 w-full max-w-md'>
        <button onClick={onClose} className='absolute bg-red-600/80 hover:bg-red-600 px-2 rounded-full top-2 right-2 text-white hover:text-red-200'>
          &times;
        </button>
        {children}
      </div>
    </div>
  )
}
