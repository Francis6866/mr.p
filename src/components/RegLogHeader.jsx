import React from 'react'
import { Link } from 'react-router-dom'
import Button from './Button'

const RegLogHeader = () => {
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
                    className='' 
                >
                    Create account
                </Button>
            </div>
        </div>
    </>
  )
}

export default RegLogHeader