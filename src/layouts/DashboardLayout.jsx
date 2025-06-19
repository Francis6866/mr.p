import React from 'react'
import DashNav from '../components/DashNav'
import { Outlet } from 'react-router-dom'

const DashboardLayout = () => {
  return (
    <div className='flex'>
        <div>
            <DashNav />
        </div>
        <div className='flex-1 overflow-hidden'>
            <Outlet />
        </div>
    </div>
  )
}

export default DashboardLayout