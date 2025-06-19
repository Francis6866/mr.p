import React from 'react'
import { MdOutlineRefresh } from "react-icons/md";
import Button from '../components/Button';
import LineGraph from '../components/LineGraph';
import DashHeader from '../components/DashHeader';

// TODO: add material u graph and date picker



const HomeDashboard = () => {
  return (
    <div className='p-6 space-y-30'>
       <DashHeader>Dashboard</DashHeader>

        {/* overview */}
        <div className='space-y-4'>
            <div className='flex items-center gap-4'>
                <h3 className='text-[14px] font-bold'>Transaction Overview</h3>
                <Button variant='dashPrimary'>
                    NGN
                </Button>
            </div>

            <div className='border-[0.5px] rounded-md border-[#ccc] p-4 md:flex gap-4'>
                {/* graph */}
                <section className='md:flex-1'>
                    {/* graph head */}
                    <div className='flex justify-between'>
                        {/* amount */}
                        <div>
                            <p className='font-bold'>0.00</p>
                            <p className='text-[12px] font-bold text-[#ccc]'>Total payment received (NGN)</p>
                        </div>

                        <div className='flex gap-2 items-start'>
                            <div className='border border-[#ccc] px-3 rounded-4xl'>
                                this year
                            </div>
                            <span className='w-6 h-6 rounded-md bg-blue-200 flex justify-center items-center'>
                             <MdOutlineRefresh  color='blue'/>
                            </span>
                        </div>
                    </div>

                    {/* graph */}
                    <div>
                      <LineGraph />
                    </div>
                </section>

                {/* balance */}
                <section className='rounded-lg bg-blue-200 px-6 py-8 space-y-10 md:w-[35%]'>
                    <div className='font-bold text-[12px]'>
                        <div>
                            <h3>Available Balance (NGN)</h3>
                            <p className='text-3xl'>--.--</p>
                        </div>
                        <div>
                            <h3>Ledger Balance (NGN)</h3>
                            <p className='text-3xl'>--.--</p>
                        </div>
                    </div>

                    <p className='font-bold text-blue-700'>See all balances &gt; </p>
                </section>
            </div>
        </div>
    </div>
  )
}

export default HomeDashboard