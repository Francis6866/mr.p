import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaPlus, FaCreditCard, FaHospital, FaPills, FaUserMd, FaChartLine, FaFileMedical, FaSort, FaSortUp, FaSortDown } from 'react-icons/fa';
import { IoCardOutline, IoStatsChart, IoWallet } from 'react-icons/io5';
import { BsThreeDotsVertical, BsCheck, BsClock, BsX, BsFilter } from 'react-icons/bs';
import { formatDate } from '../utility';

const ViewCard = () => {
  const { cardId } = useParams();
  const navigate = useNavigate();

  // Sample card data - replace with actual API call
  const [cardData, setCardData] = useState({
    cardId: 'MC001ABC123',
    patientName: 'John Doe',
    patientId: 'P001',
    cardNumber: '1234567890123456',
    cardType: 'Premium',
    issueDate: '2024-01-15',
    expiryDate: '2027-01-15',
    status: 'Active',
    balance: 15750.50,
    monthlyLimit: 25000.00,
    spentThisMonth: 9250.50
  });

  const [goals, setGoals] = useState([
    {
      id: 1,
      name: 'Medications',
      icon: <FaPills className="text-blue-500" />,
      budget: 1500.00,
      spent: 450.00,
      type: 'BUDGET'
    },
    {
      id: 2,
      name: 'Consultations',
      icon: <FaUserMd className="text-green-500" />,
      budget: 2000.00,
      spent: 750.00,
      type: 'BUDGET'
    },
    {
      id: 3,
      name: 'Lab Tests',
      icon: <FaHospital className="text-purple-500" />,
      budget: 1200.00,
      spent: 380.00,
      type: 'BUDGET'
    },
    {
      id: 4,
      name: 'Emergency',
      icon: <FaChartLine className="text-red-500" />,
      budget: 5000.00,
      spent: 0.00,
      type: 'BUDGET'
    }
  ]);

  const [transactions, setTransactions] = useState([
    {
      id: 1,
      patient: 'John Doe',
      cardNumber: '**** 2345',
      amount: 450.75,
      status: 'Success',
      date: '2024-01-20T10:30:00Z'
    },
    {
      id: 2,
      patient: 'Jane Smith',
      cardNumber: '**** 1156',
      amount: 275.50,
      status: 'Requested',
      date: '2024-01-19T14:20:00Z'
    }
  ]);

  const [transactionHistory, setTransactionHistory] = useState([
   
    {
      id: 4,
      receiver: 'Dr. Smith Clinic',
      type: 'Specialist',
      date: '2024-01-17',
      amount: 300.00,
      icon: <FaUserMd className="text-orange-500" />
    },
    {
      id: 1,
      receiver: 'City General Hospital',
      type: 'Consultation',
      date: '2024-01-20',
      amount: 150.00,
      icon: <FaHospital className="text-blue-500" />
    },
    {
      id: 2,
      receiver: 'MedPlus Pharmacy',
      type: 'Medication',
      date: '2024-01-19',
      amount: 85.50,
      icon: <FaPills className="text-green-500" />
    },
    {
      id: 3,
      receiver: 'LabCorp Diagnostics',
      type: 'Lab Test',
      date: '2024-01-18',
      amount: 220.25,
      icon: <FaHospital className="text-purple-500" />
    },
    {
      id: 4,
      receiver: 'Dr. Smith Clinic',
      type: 'Specialist',
      date: '2024-01-17',
      amount: 300.00,
      icon: <FaUserMd className="text-orange-500" />
    },{
      id: 2,
      receiver: 'MedPlus Pharmacy',
      type: 'Medication',
      date: '2024-01-19',
      amount: 85.50,
      icon: <FaPills className="text-green-500" />
    },
    {
      id: 3,
      receiver: 'LabCorp Diagnostics',
      type: 'Lab Test',
      date: '2024-01-18',
      amount: 220.25,
      icon: <FaHospital className="text-purple-500" />
    },
    {
      id: 4,
      receiver: 'Dr. Smith Clinic',
      type: 'Specialist',
      date: '2024-01-17',
      amount: 300.00,
      icon: <FaUserMd className="text-orange-500" />
    },{
      id: 2,
      receiver: 'MedPlus Pharmacy',
      type: 'Medication',
      date: '2024-01-19',
      amount: 85.50,
      icon: <FaPills className="text-green-500" />
    },
    {
      id: 3,
      receiver: 'LabCorp Diagnostics',
      type: 'Lab Test',
      date: '2024-01-18',
      amount: 220.25,
      icon: <FaHospital className="text-purple-500" />
    },
    {
      id: 4,
      receiver: 'Dr. Smith Clinic',
      type: 'Specialist',
      date: '2024-01-17',
      amount: 300.00,
      icon: <FaUserMd className="text-orange-500" />
    }
  ]);

  // Filter and Sort state for Transaction History
  const [filters, setFilters] = useState({
    type: '',
    receiver: '',
    minAmount: '',
    maxAmount: ''
  });

  const [sortConfig, setSortConfig] = useState({
    key: 'date',
    direction: 'desc'
  });

  const [outcomeStats] = useState([
    {
      category: 'Medical Care',
      amount: 8400.00,
      percentage: 68,
      icon: <FaHospital className="text-blue-500" />
    },
    {
      category: 'Pharmacy',
      amount: 2850.50,
      percentage: 32,
      icon: <FaPills className="text-green-500" />
    },
    {
      category: 'Consultations',
      amount: 2850.50,
      percentage: 32,
      icon: <FaUserMd className="text-green-500" />
    },
    {
      category: 'Lab Tests',
      amount: 2850.50,
      percentage: 32,
      icon: <FaHospital className="text-green-500" />
    },
    {
      category: 'Record retrieval',
      amount: 2850.50,
      percentage: 32,
      icon: <FaFileMedical className="text-green-500" />
    }
  ]);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Success':
        return <BsCheck className="text-green-500" size={16} />;
      case 'Requested':
        return <BsClock className="text-yellow-500" size={16} />;
      case 'Failed':
        return <BsX className="text-red-500" size={16} />;
      default:
        return <BsClock className="text-gray-500" size={16} />;
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  // Filter and Sort functions
  const filterTransactions = (transactions) => {
    return transactions.filter(transaction => {
      const matchesType = !filters.type || transaction.type.toLowerCase().includes(filters.type.toLowerCase());
      const matchesReceiver = !filters.receiver || transaction.receiver.toLowerCase().includes(filters.receiver.toLowerCase());
      const matchesMinAmount = !filters.minAmount || transaction.amount >= parseFloat(filters.minAmount);
      const matchesMaxAmount = !filters.maxAmount || transaction.amount <= parseFloat(filters.maxAmount);
      
      return matchesType && matchesReceiver && matchesMinAmount && matchesMaxAmount;
    });
  };

  const sortTransactions = (transactions) => {
    return [...transactions].sort((a, b) => {
      const aVal = a[sortConfig.key];
      const bVal = b[sortConfig.key];
      
      if (sortConfig.key === 'date') {
        const aDate = new Date(aVal);
        const bDate = new Date(bVal);
        return sortConfig.direction === 'asc' ? aDate - bDate : bDate - aDate;
      }
      
      if (sortConfig.key === 'amount') {
        return sortConfig.direction === 'asc' ? aVal - bVal : bVal - aVal;
      }
      
      // String comparison for receiver and type
      const aStr = aVal.toString().toLowerCase();
      const bStr = bVal.toString().toLowerCase();
      
      if (aStr < bStr) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aStr > bStr) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });
  };

  const handleSort = (key) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'desc' ? 'asc' : 'desc'
    }));
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({
      type: '',
      receiver: '',
      minAmount: '',
      maxAmount: ''
    });
  };

  const getSortIcon = (key) => {
    if (sortConfig.key !== key) return <FaSort className="text-gray-400" size={12} />;
    return sortConfig.direction === 'asc' ? 
      <FaSortUp className="text-gray-600" size={12} /> : 
      <FaSortDown className="text-gray-600" size={12} />;
  };

  // Get unique types and receivers for filter dropdowns
  const uniqueTypes = [...new Set(transactionHistory.map(t => t.type))];
  const uniqueReceivers = [...new Set(transactionHistory.map(t => t.receiver))];

  // Apply filters and sorting
  const filteredAndSortedHistory = sortTransactions(filterTransactions(transactionHistory));

  const spendingPercentage = (cardData.spentThisMonth / cardData.monthlyLimit) * 100;

  return (
    <div className="  h-screen bg-gray-50 overflow-scroll p-10">
       

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-1 space-y-6">
          {/* Card Details */}
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-lg font-semibold">Cards list</h2>
              <button className="p-1 hover:bg-gray-100 rounded">
                <BsThreeDotsVertical size={16} />
              </button>
            </div>

            {/* Medical Card Visual */}
            <div className="relative mb-6">
              <div className="bg-gradient-to-r from-teal-600 to-teal-800 rounded-lg p-6 text-white shadow-lg">
                <div className="flex justify-between items-start mb-8">
                  <div className="flex items-center gap-2">
                    <FaCreditCard size={24} />
                    <span className="font-semibold">MEDICARD</span>
                  </div>
                  <span className="text-xs bg-white/20 px-2 py-1 rounded">
                    {cardData.cardType}
                  </span>
                </div>

                <div className="space-y-2">
                  <div className="text-lg font-mono tracking-wider">
                    {cardData.cardNumber.slice(0, 4)} {cardData.cardNumber.slice(4, 8)} {cardData.cardNumber.slice(8, 12)} ****
                  </div>
                  <div className="text-sm opacity-90">
                    {formatDate(cardData.expiryDate, 'MM/YY')}
                  </div>
                </div>
              </div>
            </div>

            {/* Balance */}
            <div className="text-center mb-6">
              <div className="text-3xl font-bold text-gray-800 mb-1">
                {formatCurrency(cardData.balance)}
              </div>
              <div className="text-gray-500 text-sm">Available Balance</div>
            </div>

            {/* Spending Limits */}
            <div className='sticky top-0'>
              <h3 className="font-semibold mb-4">Spending limits</h3>
              <div className="space-y-2">
                <div className="text-sm text-gray-600">MONTHLY TRANSACTION LIMIT</div>
                <div className="flex items-center gap-3">
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-teal-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${Math.min(spendingPercentage, 100)}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium">{Math.round(spendingPercentage)}%</span>
                </div>
                <div className="text-sm text-gray-600">
                  {formatCurrency(cardData.spentThisMonth)} spent of {formatCurrency(cardData.monthlyLimit)}
                </div>
              </div>
            </div>
          </div>

          {/* Outcome Statistics */}
          <div className="bg-white rounded-lg p-6 shadow-sm sticky top-1">
            <h3 className="font-semibold mb-4">Outcome Statistics</h3>
            <div className="space-y-4">
              {outcomeStats.map((stat, index) => (
                <div key={index}>
                  <div className="flex items-center gap-3 mb-2">
                    {stat.icon}
                    <span className="text-sm font-medium">{stat.category}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-teal-500 h-2 rounded-full"
                        style={{ width: `${stat.percentage}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium">{stat.percentage}%</span>
                  </div>
                  <div className="text-sm font-semibold mt-1">
                    {formatCurrency(stat.amount)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Goals */}
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold">Goals</h2>
              <button className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 px-3 py-2 rounded-lg transition-colors">
                <FaPlus size={14} />
              </button>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {goals.map((goal) => (
                <div key={goal.id} className="text-center p-4 hover:bg-gray-50 rounded-lg transition-colors">
                  <div className="flex justify-center mb-3">
                    <div className="p-3 bg-gray-100 rounded-full">
                      {goal.icon}
                    </div>
                  </div>
                  <div className="font-medium text-sm mb-1">{goal.name}</div>
                  {/* <div className="text-xs text-gray-500 mb-2">{goal.type}</div> */}
                  <div className="font-bold text-lg">{formatCurrency(goal.budget)}</div>
                  <div className="text-xs text-gray-500">
                    {formatCurrency(goal.spent)} spent
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Transactions */}
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h2 className="text-lg font-semibold mb-6">Transactions</h2>

            <div className="space-y-4 mb-6">
              {transactions.map((transaction) => (
                <div key={transaction.id} className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-lg">
                  <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                    <FaCreditCard className="text-gray-600" size={16} />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium">{transaction.patient}</div>
                    <div className="text-sm text-gray-500">{transaction.cardNumber}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold">{formatCurrency(transaction.amount)}</div>
                    <div className="flex items-center gap-1 text-sm">
                      {getStatusIcon(transaction.status)}
                      <span className={
                        transaction.status === 'Success' ? 'text-green-600' :
                          transaction.status === 'Requested' ? 'text-yellow-600' :
                            'text-red-600'
                      }>
                        {transaction.status}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Transaction History */}
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h2 className="text-lg font-semibold mb-6">Transaction History</h2>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-2 font-semibold text-gray-600">
                      <button 
                        onClick={() => handleSort('receiver')}
                        className="flex items-center gap-1 hover:text-gray-800"
                      >
                        Receiver {getSortIcon('receiver')}
                      </button>
                    </th>
                    <th className="text-left py-3 px-2 font-semibold text-gray-600">
                      <button 
                        onClick={() => handleSort('type')}
                        className="flex items-center gap-1 hover:text-gray-800"
                      >
                        Type {getSortIcon('type')}
                      </button>
                    </th>
                    <th className="text-left py-3 px-2 font-semibold text-gray-600">
                      <button 
                        onClick={() => handleSort('date')}
                        className="flex items-center gap-1 hover:text-gray-800"
                      >
                        Date {getSortIcon('date')}
                      </button>
                    </th>
                    <th className="text-right py-3 px-2 font-semibold text-gray-600">
                      <button 
                        onClick={() => handleSort('amount')}
                        className="flex items-center gap-1 hover:text-gray-800 ml-auto"
                      >
                        Amount {getSortIcon('amount')}
                      </button>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAndSortedHistory.map((transaction) => (
                    <tr key={transaction.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-2">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                            {transaction.icon}
                          </div>
                          <span className="font-medium">{transaction.receiver}</span>
                        </div>
                      </td>
                      <td className="py-3 px-2 text-gray-600">{transaction.type}</td>
                      <td className="py-3 px-2 text-gray-600">{formatDate(transaction.date)}</td>
                      <td className="py-3 px-2 text-right font-semibold">
                        {formatCurrency(transaction.amount)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Filter and Sort Controls */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="flex items-center gap-2 mb-4">
                <BsFilter className="text-gray-500" size={16} />
                <span className="font-medium text-gray-700">Filter & Sort</span>
                <span className="text-sm text-gray-500">({filteredAndSortedHistory.length} of {transactionHistory.length} transactions)</span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                {/* Type Filter */}
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Type</label>
                  <select
                    value={filters.type}
                    onChange={(e) => handleFilterChange('type', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  >
                    <option value="">All Types</option>
                    {uniqueTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>

                {/* Receiver Filter */}
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Receiver</label>
                  <select
                    value={filters.receiver}
                    onChange={(e) => handleFilterChange('receiver', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  >
                    <option value="">All Receivers</option>
                    {uniqueReceivers.map(receiver => (
                      <option key={receiver} value={receiver}>{receiver}</option>
                    ))}
                  </select>
                </div>

                {/* Min Amount Filter */}
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Min Amount</label>
                  <input
                    type="number"
                    value={filters.minAmount}
                    onChange={(e) => handleFilterChange('minAmount', e.target.value)}
                    placeholder="$0"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  />
                </div>

                {/* Max Amount Filter */}
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Max Amount</label>
                  <input
                    type="number"
                    value={filters.maxAmount}
                    onChange={(e) => handleFilterChange('maxAmount', e.target.value)}
                    placeholder="$999+"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  />
                </div>

                {/* Clear Filters Button */}
                <div className="flex items-end">
                  <button
                    onClick={clearFilters}
                    className="w-full px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors"
                  >
                    Clear Filters
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewCard; 