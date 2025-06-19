import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { FiHome, FiMenu } from "react-icons/fi";
import { MdOutlineAccountBalanceWallet } from "react-icons/md";
import { ImBooks } from "react-icons/im";
import { FaRegAddressCard } from "react-icons/fa6";
import { FiUser } from "react-icons/fi";
import { MdAccountBalance } from "react-icons/md";
import { AiOutlineAudit } from "react-icons/ai";
import { FaPeopleGroup } from "react-icons/fa6";
import { GrUserSettings } from "react-icons/gr";

// {`bg-gray-300 p-4 h-screen text-[14px] transition-all duration-300 ${isOpen ? 'w-48' : 'w-16'} overflow-hidden`}

const DashNav = () => {
    const [isOpen, setIsOpen] = useState(false); // Toggle menu state
  return (
    <>
        <nav className={`bg-gray-300 p-4 h-screen text-[14px] transition-all duration-300 overflow-hidden space-y-6`}>
             {/* Toggle Button */}
           <div className="flex justify-between items-center mb-6">
            <button
            className="text-blue-600 md:hidden"
            onClick={() => setIsOpen(!isOpen)}
            >
             <FiMenu size={24} />
            </button>
            <span className={`text-blue-600 font-bold text-sm ${!isOpen && 'hidden'} md:block`}>
             Menu
           </span>
          </div>

          {/* Navigation sections */}
            <section className='space-y-6'>
                <ul className='space-y-4'>
                    <li className='flex items-center gap-2'> <FiHome color='blue' size={20} /> <NavLink to='/dashboard' className={({ isActive }) => `${isActive ? 'font-bold' : ''} ${!isOpen && 'hidden md:inline'}`} end>Home</NavLink></li>
                </ul>

            </section>

            <section className='space-y-6'>
                {/* <h2 className='text-[12px] text-blue-500 uppercase'></h2> */}
                <ul className='space-y-4'>
                    <li className='flex items-center gap-2'><FiUser color='blue' size={20}/>
                    <NavLink to='/dashboard/patient' className={({ isActive }) => `${isActive ? 'font-bold' : ''} ${!isOpen && 'hidden md:inline'}`}>Patient</NavLink></li>

                    <li className='flex items-center gap-2'><ImBooks color='blue' size={20}/><NavLink to='/dashboard/records' className={({ isActive }) => `${isActive ? 'font-bold' : ''} ${!isOpen && 'hidden md:inline'}`}>Records</NavLink></li>

                    <li className='flex items-center gap-2'><FaRegAddressCard color='blue' size={20}/>
                    <NavLink to='/dashboard/medic-card' className={({ isActive }) => `${isActive ? 'font-bold' : ''} ${!isOpen && 'hidden md:inline'}`}>Medic Card</NavLink></li>
                </ul>
            </section>

            <section className='space-y-6'>
                <div className='flex items-center gap-2'>
                    <MdAccountBalance color='blue' size={20}/>
                    <h2 className={`text-[12px] text-blue-500 uppercase ${!isOpen && 'hidden md:inline'}`}>Accounts</h2>
                </div>
                <ul className='space-y-4'>
                    <li className='flex items-center gap-2'><AiOutlineAudit color='blue' size={20}/><NavLink to='/audit' className={({ isActive }) => `${isActive ? 'font-bold' : ''} ${!isOpen && 'hidden md:inline'}`}>Audit Logs</NavLink></li>

                    <li className='flex items-center gap-2'><FaPeopleGroup color='blue' size={20}/><NavLink to='/referrals' className={({ isActive }) => `${isActive ? 'font-bold' : ''} ${!isOpen && 'hidden md:inline'}`}>Referrals</NavLink></li>

                    <li className='flex items-center gap-2'><GrUserSettings color='blue' size={20}/><NavLink to='/settings' className={({ isActive }) => `${isActive ? 'font-bold' : ''} ${!isOpen && 'hidden md:inline'}`}>Settings</NavLink></li>
                </ul>
            </section>
        </nav>
    </>
  )
}

export default DashNav