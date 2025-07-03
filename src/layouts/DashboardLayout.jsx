import React from 'react'
import DashNav from '../components/DashNav'
import { Outlet } from 'react-router-dom'
import AuthGuard from '../components/AuthGuard'

const DashboardLayout = () => {
  return (
    <AuthGuard redirectTo="/">
      <div className='flex'>
          <div>
              <DashNav />
          </div>
          <div className='flex-1 overflow-hidden'>
              <Outlet />
          </div>
      </div>
    </AuthGuard>
  )
}

export default DashboardLayout