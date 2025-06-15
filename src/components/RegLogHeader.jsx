import React from 'react'
import { Link } from 'react-router-dom'
import Button from './Button'

const RegLogHeader = ({ isLogin }) => {

    let dirText = isLogin ? "Create account" : "Login to account"

  return (
    <>
        <div className='flex justify-between items-center p-8'>
            {/* brand */}
            <div>
                <Link to='/'>Brand</Link>
            </div>

            {/* button */}
            <div>
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