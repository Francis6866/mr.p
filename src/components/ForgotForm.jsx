import React, { useState } from 'react'
import Input from './Input'
import Button from './Button'

const ForgotForm = ({ handleIsLogin }) => {
    const [email, setEmail] = useState('')
    const [error, setError] = useState({})

    const loginValidation = () => {
        const newError = {};
          
        if (!email.trim()) {
              newError.email = 'Email is required';
            }
          
            setError(newError);
          
        return {
            isValid: Object.keys(newError).length === 0 
        }
    }


    const handleSubmit = (e) => {
        e.preventDefault()
        const result = loginValidation()
        if(!result.isValid) return

        const formDetails = {
            email
        }

        console.log(formDetails)
    }

  return (
    <div className='rounded-[4px] w-[343px] max-w-full bg-white p-8 space-y-4 shadow-lg'>
        <h3 className='text-[16px] font-[500px] mb-4'>Forgot Password</h3>
        <form action="" onSubmit={handleSubmit}>
            <Input
                type='email'
                value={email}
                id='email' 
                onChange={(e) => setEmail(e.target.value)}
                error={error.email}
                placeholder='Email address'
            />

            <div>
                <Button
                    type='submit'
                    className='w-full'
                    size='md'
                >
                    Reset Password
                </Button>
            </div>
            {error && Object.values(error).map(item => {
                return <p className="text-red-500 text-sm mt-2" key={item}>{item}</p>
            })} 
            <p className='text-[#576ae6] text-[14px] mt-6 cursor-pointer' onClick={handleIsLogin}>
                Remember your password?
            </p>
        </form>
    </div>
  )
}

export default ForgotForm