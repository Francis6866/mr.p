import React from 'react'

const Modal = ({handleClose}) => {
    

  return (
    <>
        <div className='fixed inset-0 bg-[#1c388e67] flex items-center justify-center z-50' onClick={handleClose}>
            <div className='bg-white p-6 rounded-lg shadow-lg w-[300px] max-md:min-w-1/2  relative'>
            <button className='absolute top-2 right-4 text-gray-500 hover:text-gray-700' onClick={handleClose}>
                &times;
            </button>
            <h2 className='text-xl font-bold mb-4'>Modal Title</h2>
            <p className='mb-4'>This is a modal content.</p>
            <button className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600'>Close</button>
            </div>
        </div>
    </>
  )
}

export default Modal