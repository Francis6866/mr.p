import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAuth, usePatients, useRecords, useUI } from '../store/hooks'
import { loginUser, logout } from '../store/slices/authSlice'
import { fetchPatients, addPatient, searchPatients } from '../store/slices/patientSlice'
import { fetchRecords, searchRecords } from '../store/slices/recordsSlice'
import { 
  addNotification, 
  openModal, 
  closeModal, 
  toggleSidebar 
} from '../store/slices/uiSlice'
import { createSuccessNotification, createErrorNotification } from '../store/utils'

// Example component showing how to use Redux in your app
const ExampleReduxUsage = () => {
  const dispatch = useAppDispatch()
  
  // Using the custom hooks to access state
  const auth = useAuth()
  const patients = usePatients()
  const records = useRecords()
  const ui = useUI()
  
  const [loginForm, setLoginForm] = useState({ email: '', password: '' })

  // Example: Fetch data on component mount
  useEffect(() => {
    if (auth.isAuthenticated) {
      dispatch(fetchPatients())
      dispatch(fetchRecords())
    }
  }, [auth.isAuthenticated, dispatch])

  // Example: Handle login
  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const result = await dispatch(loginUser(loginForm)).unwrap()
      dispatch(addNotification(createSuccessNotification('Login successful!')))
    } catch (error) {
      dispatch(addNotification(createErrorNotification(error)))
    }
  }

  // Example: Handle logout
  const handleLogout = () => {
    dispatch(logout())
    dispatch(addNotification(createSuccessNotification('Logged out successfully')))
  }

  // Example: Add a new patient
  const handleAddPatient = async () => {
    const patientData = {
      name: 'John Doe',
      email: 'john.doe@example.com',
      phone: '+1234567890',
      dateOfBirth: '1990-01-01',
    }
    
    try {
      await dispatch(addPatient(patientData)).unwrap()
      dispatch(addNotification(createSuccessNotification('Patient added successfully!')))
      dispatch(closeModal('addPatient'))
    } catch (error) {
      dispatch(addNotification(createErrorNotification(error)))
    }
  }

  // Example: Open modal
  const handleOpenAddPatientModal = () => {
    dispatch(openModal({ modalName: 'addPatient' }))
  }

  // Example: Toggle sidebar
  const handleToggleSidebar = () => {
    dispatch(toggleSidebar())
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Redux Integration Example</h1>
      
      {/* Authentication Status */}
      <div className="bg-blue-50 p-4 rounded-lg mb-6">
        <h2 className="text-xl font-semibold mb-2">Authentication Status</h2>
        <p>Authenticated: {auth.isAuthenticated ? 'Yes' : 'No'}</p>
        <p>Loading: {auth.loading ? 'Yes' : 'No'}</p>
        {auth.user && <p>User: {auth.user.name || auth.user.email}</p>}
        {auth.error && <p className="text-red-600">Error: {auth.error}</p>}
      </div>

      {/* Login Form (if not authenticated) */}
      {!auth.isAuthenticated && (
        <div className="bg-white p-4 border rounded-lg mb-6">
          <h2 className="text-xl font-semibold mb-4">Login</h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="email"
              placeholder="Email"
              value={loginForm.email}
              onChange={(e) => setLoginForm({...loginForm, email: e.target.value})}
              className="w-full p-2 border rounded"
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={loginForm.password}
              onChange={(e) => setLoginForm({...loginForm, password: e.target.value})}
              className="w-full p-2 border rounded"
              required
            />
            <button 
              type="submit" 
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              disabled={auth.loading}
            >
              {auth.loading ? 'Logging in...' : 'Login'}
            </button>
          </form>
        </div>
      )}

      {/* Authenticated Actions */}
      {auth.isAuthenticated && (
        <div className="space-y-6">
          {/* User Actions */}
          <div className="bg-white p-4 border rounded-lg">
            <h2 className="text-xl font-semibold mb-4">User Actions</h2>
            <div className="space-x-4">
              <button 
                onClick={handleLogout}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
              >
                Logout
              </button>
              <button 
                onClick={handleToggleSidebar}
                className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
              >
                Toggle Sidebar ({ui.sidebarOpen ? 'Open' : 'Closed'})
              </button>
            </div>
          </div>

          {/* Patient Management */}
          <div className="bg-white p-4 border rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Patient Management</h2>
            <div className="mb-4">
              <p>Total Patients: {patients.patients.length}</p>
              <p>Loading: {patients.loading ? 'Yes' : 'No'}</p>
              {patients.error && <p className="text-red-600">Error: {patients.error}</p>}
            </div>
            <div className="space-x-4">
              <button 
                onClick={() => dispatch(fetchPatients())}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                disabled={patients.loading}
              >
                Refresh Patients
              </button>
              <button 
                onClick={handleOpenAddPatientModal}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                Add Patient
              </button>
              {ui.modals.addPatient && (
                <button 
                  onClick={handleAddPatient}
                  className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800"
                >
                  Confirm Add Patient
                </button>
              )}
            </div>
          </div>

          {/* Records Management */}
          <div className="bg-white p-4 border rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Records Management</h2>
            <div className="mb-4">
              <p>Total Records: {records.records.length}</p>
              <p>Loading: {records.loading ? 'Yes' : 'No'}</p>
              {records.error && <p className="text-red-600">Error: {records.error}</p>}
            </div>
            <button 
              onClick={() => dispatch(fetchRecords())}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              disabled={records.loading}
            >
              Refresh Records
            </button>
          </div>

          {/* Notifications */}
          <div className="bg-white p-4 border rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Notifications ({ui.notifications.length})</h2>
            <div className="space-y-2">
              {ui.notifications.map((notification) => (
                <div 
                  key={notification.id}
                  className={`p-2 rounded ${
                    notification.type === 'success' ? 'bg-green-100 text-green-800' :
                    notification.type === 'error' ? 'bg-red-100 text-red-800' :
                    notification.type === 'warning' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-blue-100 text-blue-800'
                  }`}
                >
                  <p className="font-semibold">{notification.title}</p>
                  <p>{notification.message}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ExampleReduxUsage 