import React, { useState } from 'react'
import DashHeader from '../components/DashHeader'
import TabComponents from '../components/TabComponents';
import PatientMoney from '../components/PatientMoney';
import DataTable from '../components/DataTable';
import Modal from '../components/Modal';


const PatientDashboard = () => {
  const [closeModal, setCloseModal] = useState(false);

    const handleClose = () => {
        setCloseModal(false);
    }

    const tabs = [
        {
          label: 'NGN',
          component: <PatientMoney
            setCloseModal={setCloseModal} 
           />,
          condition: true, // render condition
        }
      ];
    
  return (
    <div className='p-6 space-y-15'>
        <DashHeader>Users Name</DashHeader>

        <div className='space-y-8'>
          {/* links with highlighted underline */}
          <div>
            <TabComponents tabs={tabs} />
          </div>
          <div>
            <DataTable />
          </div>
        </div>
        {
          closeModal && 
          <Modal handleClose={handleClose}/>
        }
    </div>
  )
}

export default PatientDashboard