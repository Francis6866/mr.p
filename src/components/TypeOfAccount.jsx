import React from 'react'
import Input from './Input'
import Select from './Select'
import { Link } from 'react-router-dom'
import Radio from './Radio'
import Button from './Button'

const TypeOfAccount = ({formData, onChange, nextStep}) => {
  return (
    <div className='space-y-10'>
        <div>
            <h2 className='text-2xl font-bold opacity-75'>What type of account would you like to create?</h2>
            <p className='text-[14px]'>Choose the option that fits your organization.</p>
        </div>

        <div>
            <Select
                type='select'
                id='country'
                name='country'
                label='Country'
                required={true}
                value={formData.country}
                onChange={onChange}
                options={[
                    { value: '', label: '--Select Country' },
                    { value: 'nigeria', label: 'Nigeria' },
                    { value: 'rwanda', label: 'Rwanda' }
                  ]}
            />
            <p className='text-[12px]'>
                Can't find your country? 
                <Link className='text-[#576ae6]'>click here</Link>
            </p>
        </div>

        <div>
            <h3 className="">
                <Radio
                  label="I'm creating an account for:"
                  id="accountType"
                  name="accountType"
                  required={true}
                  value={formData.accountType}
                  onChange={onChange}
                  RadioClass='border border-[#FF9B00] py-4 px-3 rounded-lg'
                  options={[
                    { value: 'business account', heading: 'Business account', label: 'For freelancers, sole traders, startups, small-to-medium businesses and enterprises.' },
                    { value: 'others', heading: 'Other entities', label: `For charities, non-profits & religious institutions.` },
                  ]}
                />
            </h3>
        </div>

        <div onClick={nextStep}>
            <Button 
                type='button'
                variant='primary'
                className='w-full'
                size='lg'
            >
                Let's get started
            </Button>
        </div>

        <p className='text-[14px] text-center -mt-8'>
            Already have an account? <Link to='/' className='text-[#576ae6]'>Login here</Link>
        </p>
    </div>
  )
}

export default TypeOfAccount