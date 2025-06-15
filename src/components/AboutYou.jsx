import React, { useState } from 'react'
import Input from './Input'
import Radio from './Radio'
import Select from './Select'
import PasswordInput from './PasswordInput'
import Button from './Button'
import Checkbox from './Checkbox'

const AboutYou = ({formData, onChange}) => {
  const [showPassword, setShowPassword] = useState('password')

  const handlePwView = () => {
    setShowPassword(prev => prev === 'password' ? 'text' : 'password')
  }
  return (
    <div className='space-y-10'>
      <div>
            <h2 className='text-2xl font-bold opacity-75'>Let's get to know you</h2>
      </div>

      <div>
        <Input
          type='text'
          id='businessName'
          name='businessName'
          value={formData.businessName}
          onChange={onChange}
          label='Registered business name'
          placeholder='Harvoxx tech.'
          required={true}
        />
        <p className='text-[12px] -mt-4'>
          Ensure this name matches the name on your registration certificate.
        </p>
      </div>

      <div>
        <div className="flex gap-2">
          <Input
            type='text'
            id='firstName'
            label='First name'
            name='firstName'
            value={formData.firstName}
            onChange={onChange}
            placeholder='John'
            required={true}
            className='flex-1' // Adjusts the width of the first input
          />
          <Input
            type='text'
            id='lastName'
            label='Last name'
            name='lastName'
            value={formData.lastName}
            onChange={onChange}
            placeholder='Doe'
            required={true}
            className='flex-1' // Adjusts the width of the second input
          />
        </div>
        <p className='text-[12px] -mt-4'>
          Enter your first and last name as they appear on your government ID
        </p>
      </div>

      <div>
        <Input
          type='email'
          id='email'
          name='email'
          value={formData.email}
          onChange={onChange}
          label='Enter a valid email address'
          placeholder='Harvoxx@gmail.com'
          required={true}
        />
      </div>

      <div>
        <p className='text-sm font-medium text-gray-700 mb-2'>Is your business incorporated with the Corporate Affairs Commission (CAC)?</p>
        <div className="flex items-center gap-4">
          <Radio
            id="businessIncorporation"
            name='businessIncorporation'
            value={formData.businessIncorporation}
            onChange={onChange}
            options={[
              { value: 'yes', label: 'Yes' }
            ]}
            className='flex-1'
            RadioClass='border border-[#FF9B00] py-4 px-3 rounded-lg'
          />
          <Radio
            id="businessIncorporation"
            name='businessIncorporation'
            value={formData.businessIncorporation}
            onChange={onChange}
            options={[
              { value: 'no', label: 'No' }
            ]}
            className='flex-1'
            RadioClass='border border-[#FF9B00] py-4 px-3 rounded-lg'
          />
        </div>
      </div>

      <div>
        <Select
          type='select'
          id='registrationType'
          name='registrationType'
          value={formData.registrationType}
          onChange={onChange}
          label='Select business registration type'
          options={[
            { value: '', label: '--select options' },
            { value: 'sole proprietordhip', label: 'Sole Proprietordhip' },
            { value: 'limited company', label: 'Limited Company' }
          ]}
          className='mb-4'
        />
      </div>

      <div>
        <PasswordInput
          type={showPassword}
          label='Choose a password'
          id='password'
          name='password'
          value={formData.password}
          onChange={onChange}
          handlePwView={handlePwView}
        />
      </div>

      <div>
        <Checkbox
          label={`I acknowledge that I have read, understood, and agree to be bound by Flutterwave's Merchant Services Agreement (MSA), Terms and Conditions, and Privacy Notice.`}
          id='agreeTerms'
          name='agreeTerms'
          checked={formData.agreeTerms}
          onChange={onChange}
        />
        <Checkbox
          label={`I agree to receive updates and promotional offers from Flutterwave.`}
          id='agreePrivacy'
          name='agreePrivacy'
          checked={formData.agreePrivacy}
          onChange={onChange}
        />
      </div>

      <div>
            <Button 
                type='submit'
                variant='primary'
                className='w-full'
                size='lg'
            >
                Create your account
            </Button>
        </div>
        
    </div>
  )
}

export default AboutYou