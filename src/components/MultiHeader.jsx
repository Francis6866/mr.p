import React from 'react'
import { FaTimes, FaLongArrowAltLeft } from "react-icons/fa";
import { Link } from 'react-router-dom'
import Button from './Button'
import { useNavigate } from 'react-router-dom'


const MultiHeader = ({ prevStep, step }) => {
    const navigate = useNavigate();
    
  return (
    <div>
        <div className='flex justify-between items-center gap-8 py-8 px-4'>
            {/* brand */}
        
            <div className={`max-sm ${step === 1 ? 'hidden' : ''}`}>
                <Link>Brand</Link>
            </div>

            <div className={`max-sm ${step === 1 ? 'visble' : 'hidden'}`} onClick={prevStep}>
              <FaLongArrowAltLeft size={25}/>
            </div>

            <div className="progress flex-1">
                <div className='w-full h-3 bg-gray-400 rounded-[4px] overflow-hidden transition-all duration-300'>
                    <div className={`bg-amber-400 h-3 ${step === 0 ? 'w-1/2' : 'w-full'}`}></div>
                </div>
            </div>

            {/* button */}
            <div onClick={() => navigate('/')} className='cursor-pointer'>
                <Button
                    type='button'
                    variant = 'outline'
                    className='' 
                >
                    <FaTimes />
                </Button>
            </div>
        </div>
    </div>
  )
}

export default MultiHeader