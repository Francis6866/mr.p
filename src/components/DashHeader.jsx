import React from 'react'
import { FaStar } from "react-icons/fa6";
import { HiMiniUser } from "react-icons/hi2";

const DashHeader = ({children}) => {
  return (
    <div>
         {/* header */}
                <div className='flex max-sm:flex-col md:justify-between md:items-center'>
                    <h1 className='text-[#040202] font-bold'>{children}</h1>
                    <div className='flex items-center gap-2'>
                        <span>
                         <FaStar color='gold'/>
                        </span>
                        <p>Your default currency is <span className='font-bold text-[#ccc]'>NGN</span></p>
                        <div className="avatar w-6 h-6 rounded-full bg-gray-500 flex items-center justify-center">
                         <HiMiniUser size={20} color='white' />
                        </div>
                    </div>
                </div>
    </div>
  )
}

export default DashHeader