import React, { useState, useEffect } from 'react'
import homeBg from '../assets/bg.svg'
import RegLogHeader from '../components/RegLogHeader'
import LoginForm from '../components/LoginForm'
import ForgotForm from '../components/ForgotForm'
import { Link, useNavigate } from 'react-router-dom'
import { authService } from '../services/authService'
import { useAuth, useAppDispatch } from '../store/hooks'
import { loginUser } from '../store/slices/authSlice'
import { addNotification } from '../store/slices/uiSlice'
import { createSuccessNotification, createErrorNotification } from '../store/utils'

const LoginSignupPage = () => {
    const [isLogin, setIslogin] = useState(true)
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const { isAuthenticated, loading, error } = useAuth()

    // Check if user is already authenticated and redirect to dashboard
    useEffect(() => {
        if (!loading && isAuthenticated) {
            navigate('/dashboard', { replace: true })
        }
    }, [isAuthenticated, loading, navigate])

    const handleLogin = async (formDetails) => {
        try {
            console.log('Login attempt:', formDetails) 
            const result = await dispatch(loginUser(formDetails)).unwrap()
            console.log('Login successful:', result)
            
            // Show success notification
            dispatch(addNotification(createSuccessNotification(
                'Login successful! Welcome back.',
                'Success'
            )))
            
            // Navigation will be handled by the useEffect above
        } catch (error) {
            console.error('Login failed:', error)
            
            // Show error notification
            dispatch(addNotification(createErrorNotification(
                error || 'Login failed. Please check your credentials.',
                'Login Failed'
            )))
        }
    }

    // Show loading spinner while checking authentication
    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen bg-gray-50">
                <div className="flex flex-col items-center gap-4">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-500"></div>
                    <p className="text-gray-600">Checking authentication...</p>
                </div>
            </div>
        )
    }

    // Don't render login page if user is authenticated (while redirecting)
    if (isAuthenticated) {
        return null
    }

  return (
    <div style={{
        backgroundImage: `url(${homeBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
      >
        {console.log(isAuthenticated)}
        <RegLogHeader
          isLogin={isLogin} 
          setIslogin={setIslogin}
        />

        <div className='min-h-[calc(100vh-180px)] flex items-center max-sm:justify-center md:pl-20'>
            {
                isLogin 
                ? <LoginForm handleLogin={handleLogin} navigate={navigate}/>
                : <ForgotForm handleLogin={handleLogin} navigate={navigate}/>
            }
        </div>

        {/* copywright */}
        <div className='flex items-center justify-between p-8 text-[14px] font-[400]'>
          <p>Flutterwave Technology Solutions Limited - Licensed by the Central Bank of Nigeria</p>
          <div className='flex gap-10'>
            <Link>Privacy policy</Link>
            <Link>Terms and conditions</Link>
          </div>
        </div>
    </div>
  )
}

export default LoginSignupPage