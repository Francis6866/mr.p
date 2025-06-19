import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Button from './Button'

const RegLogHeader = ({ isLogin, setIslogin }) => {
    const navigate = useNavigate();

    let dirText = isLogin ? "Create account" : "Login to account"

    const handleDirection = () => {
        // Logic to handle direction change can be added here
        if(dirText === "Create account") {
            // Navigate to signup page or change state to show signup form
            navigate('/register');
        }
        else {
            // Navigate to login page or change state to show login form
            setIslogin(true); // Assuming the login page is at the root path
        }   
    }

  return (
    <>
        <div className='flex justify-between items-center p-8'>
            {/* brand */}
            <div>
                <Link to='/'>Brand</Link>
            </div>

            {/* button */}
            <div onClick={handleDirection} className='cursor-pointer'>
                <Button
                    type='button'
                    className='' 
                >
                    {dirText}
                </Button>
            </div>
        </div>
    </>
  )
}

export default RegLogHeader