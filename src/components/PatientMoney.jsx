import React from 'react'
import ButtonGroup from './ButtonGroup'
import { RiAddFill } from "react-icons/ri";
import { FaMinus } from "react-icons/fa6";
import { LuRefreshCcw } from "react-icons/lu";

const PatientMoney = ({setCloseModal}) => {
  
  return (
    <div className='flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between'>
        <div className='flex gap-4'>
            {/* pending */}
            <div className='font-[900] opacity-50'>
              <p className='text-[16px]'>Pending Balance (NGN)</p>
              <p className='text-2xl'>0.00</p>
              <p className='text-[14px]'>Funds waiting to be settled</p>
            </div>

            {/* pending */}
            <div className='font-[900]  opacity-80'>
              <p className='text-[16px]'>Available Balance (NGN)</p>
              <p className='text-2xl'>0.00</p>
              <p className='text-[14px]  opacity-50'>For withdrawals or payout</p>
            </div>
        </div>
        <div className='lg:grid grid-cols-2 gap-4 max-lg:space-y-4'>
          <ButtonGroup
            variant='primary'
            size='md'
            icon={<RiAddFill color='white'/>}
            className='col-span-2 w-full'
            onClick={() => setCloseModal(true)}
          >
            Add funds
          </ButtonGroup>

          <ButtonGroup
            variant='secondary'
            size='md'
            icon={<FaMinus color='white'/>}
            className='w-full'
          >
            Withdrawal
          </ButtonGroup>

          <ButtonGroup
            variant='tetiary'
            size='md'
            icon={<LuRefreshCcw />}
            start={true}
            className='w-full'
          >
            Convert Funds
          </ButtonGroup>
        </div>
    </div>
  )
}

export default PatientMoney