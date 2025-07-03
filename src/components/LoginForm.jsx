import React, { use, useState } from 'react'
import Input from './Input'
import Button from './Button'
import PasswordInput from './PasswordInput'

const LoginForm = ({ handleLogin, navigate }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordType, setPasswordType] = useState('password')
    const [error, setError] = useState({})

    const loginValidation = () => {
        const newError = {};
          
        if (!email.trim()) {
              newError.email = 'Email is required';
            }
          
        if (!password.trim()) {
              newError.password = 'Password is required';
            }
          
            setError(newError);
          
        return {
            isValid: Object.keys(newError).length === 0 
        }
    }

    const handlePwView = () =>{
        setPasswordType(prev => prev === 'password' ? 'text' : 'password')
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const result = loginValidation()
        if(!result.isValid) return

        const formDetails = {
            email,
            password
        }
        handleLogin(formDetails)
    }

  return (
    <div className='rounded-[4px] w-[343px] max-w-full bg-white py-8 px-7 space-y-4 shadow-lg'>
        <h3 className='text-[16px] font-[500px] mb-4'>Login to your account</h3>
        <form action="" onSubmit={handleSubmit}>
            <Input
                type='email'
                value={email}
                id='email' 
                onChange={(e) => setEmail(e.target.value)}
                error={error.email}
                placeholder='Email address'
            />
            <PasswordInput
                type={passwordType}
                value={password}
                id='password' 
                onChange={(e) => setPassword(e.target.value)}
                error={error.password}
                handlePwView={handlePwView}
                placeholder='Password'
            />

            <div>
                <Button
                    type='submit'
                    className='w-full'
                    size='md'
                >
                    Login
                </Button>
            </div>
            {error && Object.values(error).map(item => {
                return <p className="text-red-500 text-sm mt-2" key={item}>{item}</p>
            })} 
            <p className='text-[#576ae6] text-[14px] mt-6 cursor-pointer' >
                Forgot password?
            </p>
        </form>
    </div>
  )
}

export default LoginForm