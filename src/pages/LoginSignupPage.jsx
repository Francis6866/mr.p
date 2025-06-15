import React, { useState } from 'react'
import homeBg from '../assets/bg.svg'
import RegLogHeader from '../components/RegLogHeader'
import LoginForm from '../components/LoginForm'
import ForgotForm from '../components/ForgotForm'
import { Link } from 'react-router-dom'

const LoginSignupPage = () => {
    const [isLogin, setIslogin] = useState(true)

    const handleIsLogin = () => {
        setIslogin(prev => !prev)
    }

  return (
    <div style={{
        backgroundImage: `url(${homeBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
      >
        <RegLogHeader
          isLogin={isLogin} 
        />

        <div className='min-h-[calc(100vh-180px)] flex items-center max-sm:justify-center md:pl-20'>
            {
                isLogin 
                ? <LoginForm handleIsLogin={handleIsLogin}/>
                : <ForgotForm handleIsLogin={handleIsLogin}/>
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