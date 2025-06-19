import React, { useState } from 'react';

const TabComponents = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className='space-y-6'>
      {/* Tab Headers */}                                
      <div className="tab-headers border-b-2 space-x-4 border-b-[#ccc]">
        {tabs.map((tab, index) => (
          <button key={index} onClick={() => setActiveTab(index)} className={`${activeTab === index ? 'text-[14px] font-bold text-blue-700 border-b-2 pb-4 border-b-blue-700' : 'text-[14px] font-bold'}`}>
            {tab.label}
          </button>
        ))}
      </div>
      <div className="tab-content">
        {tabs[activeTab].component}
      </div>
    </div>
  );
};

export default TabComponents