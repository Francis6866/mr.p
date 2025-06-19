import React from 'react'
import DashHeader from '../components/DashHeader'
import TabComponents from '../components/TabComponents';
import Button from '../components/Button';

const RecordsDashboard = () => {
    const tabs = [
        {
          label: 'Balance',
          component: <div>balance 1</div>,
          condition: true, // render condition
        },
        {
          label: 'Customer Cards',
          component: <div>balance 2</div>,
          condition: true, // render condition
        },
        {
          label: 'Reserved Cards',
          component: <div>balance 3</div>,
          condition: true, // render condition
        },
        {
          label: 'Card Transactions',
          component: <div>balance 4</div>,
          condition: true, // render condition
        },
        {
          label: 'Dispute',
          component: <div>balance 5</div>,
          condition: true, // render condition
        },
        {
          label: 'Billing',
          component: <div>balance 6</div>,
          condition: true, // render condition
        }
      ];

  return (
    <div className='p-6 space-y-15'>
        <DashHeader>Users Record</DashHeader>

        <div className='space-y-8'>

        <div className='flex gap-4'>
            <div className='flex-1'>
                <TabComponents tabs={tabs} />
            </div>
            
            <Button variant='dashPrimary' className='mt-4 self-start'>
                USD
            </Button>
          </div>

        </div>
    </div>
  )
}

export default RecordsDashboard