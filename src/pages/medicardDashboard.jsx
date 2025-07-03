import React, { useState, useMemo, useEffect } from 'react';
import { LineChart } from '@mui/x-charts/LineChart';
import { IoPeopleOutline, IoSettingsOutline, IoCardOutline } from "react-icons/io5";
import { FaDownload, FaRegCalendarCheck, FaRegHospital, FaCreditCard } from "react-icons/fa";
import { BsThreeDotsVertical, BsSearch, BsBell, BsChevronRight, BsPlus } from "react-icons/bs";
import { GoFilter } from "react-icons/go";
import { FiEye, FiTrash2, FiX, FiEdit } from "react-icons/fi";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { formatDate } from '../utility';
import { Loader } from '../components/loader';

const CreateMedicardModal = ({ isOpen, onClose, onMedicardCreated }) => {
  const [formData, setFormData] = useState({
    patientName: '',
    patientId: '',
    cardNumber: '',
    expiryDate: '',
    cardType: '',
    issueDate: '',
    status: 'Active'
  });
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.patientName.trim()) {
      newErrors.patientName = 'Patient name is required';
    }

    if (!formData.patientId.trim()) {
      newErrors.patientId = 'Patient ID is required';
    }

    if (!formData.cardNumber.trim()) {
      newErrors.cardNumber = 'Card number is required';
    } else if (formData.cardNumber.length !== 16) {
      newErrors.cardNumber = 'Card number must be 16 digits';
    }

    if (!formData.expiryDate) {
      newErrors.expiryDate = 'Expiry date is required';
    }

    if (!formData.cardType) {
      newErrors.cardType = 'Card type is required';
    }

    if (!formData.issueDate) {
      newErrors.issueDate = 'Issue date is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      // Generate a unique card ID
      const newCardId = `MC${Math.random().toString(36).substr(2, 6).toUpperCase()}${Math.random().toString(36).substr(2, 3).toUpperCase()}`;

      const newMedicard = {
        ...formData,
        cardId: newCardId,
        createdAt: new Date().toISOString()
      };

      onMedicardCreated(newMedicard);
      handleClose();
    }
  };

  const handleClose = () => {
    setFormData({
      patientName: '',
      patientId: '',
      cardNumber: '',
      expiryDate: '',
      cardType: '',
      issueDate: '',
      status: 'Active'
    });
    setErrors({});
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
      <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Issue New Medicard</h2>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <FiX size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Patient Name *
            </label>
            <input
              type="text"
              name="patientName"
              value={formData.patientName}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 ${
                errors.patientName ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter patient name"
            />
            {errors.patientName && <p className="text-red-500 text-sm mt-1">{errors.patientName}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Patient ID *
            </label>
            <input
              type="text"
              name="patientId"
              value={formData.patientId}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 ${
                errors.patientId ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter patient ID"
            />
            {errors.patientId && <p className="text-red-500 text-sm mt-1">{errors.patientId}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Card Number (16 digits) *
            </label>
            <input
              type="text"
              name="cardNumber"
              value={formData.cardNumber}
              onChange={handleInputChange}
              maxLength={16}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 ${
                errors.cardNumber ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter 16-digit card number"
            />
            {errors.cardNumber && <p className="text-red-500 text-sm mt-1">{errors.cardNumber}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Card Type *
            </label>
            <select
              name="cardType"
              value={formData.cardType}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 ${
                errors.cardType ? 'border-red-500' : 'border-gray-300'
              }`}
            >
              <option value="">Select card type</option>
              <option value="Basic">Basic</option>
              <option value="Premium">Premium</option>
              <option value="VIP">VIP</option>
              <option value="Emergency">Emergency</option>
            </select>
            {errors.cardType && <p className="text-red-500 text-sm mt-1">{errors.cardType}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Issue Date *
            </label>
            <input
              type="date"
              name="issueDate"
              value={formData.issueDate}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 ${
                errors.issueDate ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.issueDate && <p className="text-red-500 text-sm mt-1">{errors.issueDate}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Expiry Date *
            </label>
            <input
              type="date"
              name="expiryDate"
              value={formData.expiryDate}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 ${
                errors.expiryDate ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.expiryDate && <p className="text-red-500 text-sm mt-1">{errors.expiryDate}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Status
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
              <option value="Suspended">Suspended</option>
              <option value="Expired">Expired</option>
            </select>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={handleClose}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600"
            >
              Issue Card
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const DashboardHeader = ({ onCreateMedicard }) => (
  <div className="flex justify-between items-center mb-6 mt-6">
    <div>
      <h1 className="text-2xl font-bold">Medicard Management</h1>
      <p className="text-gray-500">Manage patient medical cards and access</p>
    </div>
    <div className="flex items-center gap-4">
      <button
        onClick={onCreateMedicard}
        className="flex items-center gap-2 bg-teal-500 text-white rounded-2xl px-4 py-2 hover:bg-teal-600"
      >
        <BsPlus />
        <span>Issue new card</span>
      </button>
    </div>
  </div>
);

const MedicardList = ({ medicards, onMedicardCreated }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCardType, setSelectedCardType] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [selectedRows, setSelectedRows] = useState(new Set());
  const [selectAll, setSelectAll] = useState(false);
  const navigate = useNavigate();

  // Sample data for demonstration - replace with actual data
  const [medicardData, setMedicardData] = useState([
    {
      cardId: 'MC001ABC123',
      patientName: 'John Doe',
      patientId: 'P001',
      cardNumber: '1234567890123456',
      cardType: 'Premium',
      issueDate: '2024-01-15',
      expiryDate: '2027-01-15',
      status: 'Active',
      createdAt: '2024-01-15T10:30:00Z'
    },
    {
      cardId: 'MC002XYZ456',
      patientName: 'Jane Smith',
      patientId: 'P002',
      cardNumber: '9876543210987654',
      cardType: 'Basic',
      issueDate: '2024-02-01',
      expiryDate: '2027-02-01',
      status: 'Active',
      createdAt: '2024-02-01T14:20:00Z'
    },
    {
      cardId: 'MC003DEF789',
      patientName: 'Robert Johnson',
      patientId: 'P003',
      cardNumber: '5555444433332222',
      cardType: 'VIP',
      issueDate: '2024-01-20',
      expiryDate: '2027-01-20',
      status: 'Suspended',
      createdAt: '2024-01-20T09:15:00Z'
    }
  ]);

  const cardTypes = ['All', 'Basic', 'Premium', 'VIP', 'Emergency'];
  const statuses = ['All', 'Active', 'Inactive', 'Suspended', 'Expired'];

  // Filter medicards based on search term and filters
  const filteredMedicards = useMemo(() => {
    return medicardData.filter(card => {
      const matchesSearch = card.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           card.patientId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           card.cardId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           card.cardNumber.includes(searchTerm);
      
      const matchesCardType = selectedCardType === 'All' || card.cardType === selectedCardType;
      const matchesStatus = selectedStatus === 'All' || card.status === selectedStatus;
      
      return matchesSearch && matchesCardType && matchesStatus;
    });
  }, [medicardData, searchTerm, selectedCardType, selectedStatus]);

  // Pagination logic
  const totalPages = Math.ceil(filteredMedicards.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentMedicards = filteredMedicards.slice(startIndex, endIndex);

  // Reset to first page when filters change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedCardType, selectedStatus]);

  // Handle select all checkbox
  const handleSelectAll = (checked) => {
    setSelectAll(checked);
    if (checked) {
      const allCurrentCardIds = currentMedicards.map(card => card.cardId);
      setSelectedRows(new Set([...selectedRows, ...allCurrentCardIds]));
    } else {
      const currentCardIds = currentMedicards.map(card => card.cardId);
      const newSelectedRows = new Set(selectedRows);
      currentCardIds.forEach(id => newSelectedRows.delete(id));
      setSelectedRows(newSelectedRows);
    }
  };

  // Handle individual row selection
  const handleRowSelection = (cardId, checked) => {
    const newSelectedRows = new Set(selectedRows);
    if (checked) {
      newSelectedRows.add(cardId);
    } else {
      newSelectedRows.delete(cardId);
    }
    setSelectedRows(newSelectedRows);

    // Update select all state
    const currentCardIds = currentMedicards.map(card => card.cardId);
    const allCurrentSelected = currentCardIds.every(id => newSelectedRows.has(id));
    setSelectAll(allCurrentSelected);
  };

  // Action handlers
  const handleView = () => {
    const selectedCards = medicardData.filter(card => selectedRows.has(card.cardId));
    console.log('Viewing cards:', selectedCards);
    alert(`Viewing ${selectedCards.length} selected card(s)`);
  };

  const handleDownload = () => {
    const selectedCards = medicardData.filter(card => selectedRows.has(card.cardId));
    console.log('Downloading cards:', selectedCards);
    alert(`Downloading ${selectedCards.length} card(s) data`);
    setSelectedRows(new Set());
    setSelectAll(false);
  };

  const handleDeactivate = () => {
    const selectedCards = medicardData.filter(card => selectedRows.has(card.cardId));
    if (confirm(`Are you sure you want to deactivate ${selectedCards.length} selected card(s)?`)) {
      setMedicardData(prev => 
        prev.map(card => 
          selectedRows.has(card.cardId) 
            ? { ...card, status: 'Inactive' }
            : card
        )
      );
      setSelectedRows(new Set());
      setSelectAll(false);
      alert(`Deactivated ${selectedCards.length} card(s)`);
    }
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCardType('All');
    setSelectedStatus('All');
    setCurrentPage(1);
    setSelectedRows(new Set());
    setSelectAll(false);
  };

  const goToPage = (page) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };

  const goToPreviousPage = () => {
    goToPage(currentPage - 1);
  };

  const goToNextPage = () => {
    goToPage(currentPage + 1);
  };

  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      }
    }

    return pages;
  };

  const getStatusBadge = (status) => {
    const statusColors = {
      'Active': 'bg-green-100 text-green-800',
      'Inactive': 'bg-gray-100 text-gray-800',
      'Suspended': 'bg-red-100 text-red-800',
      'Expired': 'bg-yellow-100 text-yellow-800'
    };
    
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[status] || 'bg-gray-100 text-gray-800'}`}>
        {status}
      </span>
    );
  };

  // Add new medicard to the list when created
  React.useEffect(() => {
    const handleMedicardCreated = (newCard) => {
      setMedicardData(prev => [newCard, ...prev]);
    };

    if (onMedicardCreated) {
      // This would be set up properly with the parent component
    }
  }, [onMedicardCreated]);

  return (
    <div className="bg-white p-5 rounded-lg shadow mt-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold text-lg">Medicard List</h3>
        <div className="flex items-center gap-4">
          <div className="relative">
            <BsSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name, ID, or card number"
              className="border border-gray-200 rounded-2xl pl-10 pr-4 py-2 w-84"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button
            className={`flex items-center gap-2 border border-gray-200 rounded-2xl px-4 py-2 hover:bg-gray-100 ${
              showFilters ? 'bg-teal-50 border-teal-300' : ''
            }`}
            onClick={() => setShowFilters(!showFilters)}
          >
            <GoFilter />
            <span>Filter</span>
          </button>
          {(searchTerm || selectedCardType !== 'All' || selectedStatus !== 'All') && (
            <button
              className="flex items-center gap-2 border rounded-lg px-4 py-2 hover:bg-gray-100 text-red-600"
              onClick={clearFilters}
            >
              <span>Clear</span>
            </button>
          )}
        </div>
      </div>

      {/* Filter Panel */}
      {showFilters && (
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium text-gray-700">Card Type:</label>
              <select
                value={selectedCardType}
                onChange={(e) => setSelectedCardType(e.target.value)}
                className="border rounded-lg px-3 py-1 text-sm"
              >
                {cardTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium text-gray-700">Status:</label>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="border rounded-lg px-3 py-1 text-sm"
              >
                {statuses.map(status => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      )}

      {/* Action Buttons - Only show when rows are selected */}
      {selectedRows.size > 0 && (
        <div className="flex items-center justify-between mb-4 p-3 bg-blue-50 rounded-lg">
          <span className="text-sm text-gray-600">
            {selectedRows.size} selected
          </span>
          <div className="flex items-center gap-3">
            {selectedRows.size === 1 && (
              <button
                onClick={handleView}
                className="flex items-center gap-2 px-3 py-1 bg-blue-500 text-white rounded-lg text-sm hover:bg-blue-600 transition-colors"
              >
                <FiEye size={14} />
                <span>View</span>
              </button>
            )}
            <button
              onClick={handleDownload}
              className="flex items-center gap-2 px-3 py-1 bg-green-500 text-white rounded-lg text-sm hover:bg-green-600 transition-colors"
            >
              <FaDownload size={14} />
              <span>Download</span>
            </button>
            <button
              onClick={handleDeactivate}
              className="flex items-center gap-2 px-3 py-1 bg-red-500 text-white rounded-lg text-sm hover:bg-red-600 transition-colors"
            >
              <FiTrash2 size={14} />
              <span>Deactivate</span>
            </button>
          </div>
        </div>
      )}

      <table className="w-full text-left text-sm">
        <thead>
          <tr className="bg-gray-50">
            <th className="p-3 w-10">
              <input
                type="checkbox"
                checked={selectAll}
                onChange={(e) => handleSelectAll(e.target.checked)}
              />
            </th>
            <th className="p-3 font-semibold text-gray-600">Card ID</th>
            <th className="p-3 font-semibold text-gray-600">Patient Name</th>
            <th className="p-3 font-semibold text-gray-600">Patient ID</th>
            <th className="p-3 font-semibold text-gray-600">Card Number</th>
            <th className="p-3 font-semibold text-gray-600">Card Type</th>
            <th className="p-3 font-semibold text-gray-600">Issue Date</th>
            <th className="p-3 font-semibold text-gray-600">Expiry Date</th>
            <th className="p-3 font-semibold text-gray-600">Status</th>
          </tr>
        </thead>
        <tbody>
          {currentMedicards.length > 0 ? (
            currentMedicards.map((card, index) => (
              <tr
                key={index}
                className={`border-b border-gray-200 hover:bg-gray-50 ${
                  selectedRows.has(card.cardId) ? 'bg-blue-50' : ''
                }`}
              >
                <td className="p-3">
                  <input
                    type="checkbox"
                    checked={selectedRows.has(card.cardId)}
                    onChange={(e) => handleRowSelection(card.cardId, e.target.checked)}
                  />
                </td>
                <td 
                  className="p-3 text-teal-600 font-medium cursor-pointer hover:text-teal-700"
                  onClick={() => navigate(`/dashboard/view-card/${card.cardId}`)}
                >
                  {card.cardId}
                </td>
                <td className="p-3 flex items-center gap-3">
                  <FaCreditCard className="text-teal-500" />
                  {card.patientName}
                </td>
                <td className="p-3 text-gray-600">{card.patientId}</td>
                <td className="p-3 text-gray-600 font-mono">
                  ****-****-****-{card.cardNumber.slice(-4)}
                </td>
                <td className="p-3 text-gray-600">{card.cardType}</td>
                <td className="p-3 text-gray-600">{formatDate(card.issueDate)}</td>
                <td className="p-3 text-gray-600">{formatDate(card.expiryDate)}</td>
                <td className="p-3">{getStatusBadge(card.status)}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="9" className="p-8 text-center text-gray-500">
                No medicards found matching your search criteria.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination */}
      {filteredMedicards.length > 0 && (
        <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-200">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <label className="text-sm text-gray-600">Show:</label>
              <select
                value={itemsPerPage}
                onChange={(e) => {
                  setItemsPerPage(Number(e.target.value));
                  setCurrentPage(1);
                }}
                className="border border-gray-200 rounded px-2 py-1 text-sm"
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
              </select>
              <span className="text-sm text-gray-600">entries</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={goToPreviousPage}
              disabled={currentPage === 1}
              className={`px-3 py-1 rounded border text-sm ${
                currentPage === 1
                  ? 'border-gray-200 text-gray-400 cursor-not-allowed'
                  : 'border-gray-300 text-gray-600 hover:bg-gray-50'
              }`}
            >
              Previous
            </button>

            {getPageNumbers().map((page, index) => (
              <button
                key={index}
                onClick={() => typeof page === 'number' && goToPage(page)}
                disabled={page === '...'}
                className={`px-3 py-1 rounded border text-sm ${
                  page === currentPage
                    ? 'bg-teal-500 text-white border-teal-500'
                    : page === '...'
                    ? 'border-gray-200 text-gray-400 cursor-not-allowed'
                    : 'border-gray-300 text-gray-600 hover:bg-gray-50'
                }`}
              >
                {page}
              </button>
            ))}

            <button
              onClick={goToNextPage}
              disabled={currentPage === totalPages}
              className={`px-3 py-1 rounded border text-sm ${
                currentPage === totalPages
                  ? 'border-gray-200 text-gray-400 cursor-not-allowed'
                  : 'border-gray-300 text-gray-600 hover:bg-gray-50'
              }`}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const MedicardDashboard = () => {
  const [isCreateMedicardModalOpen, setIsCreateMedicardModalOpen] = useState(false);
  const [medicards, setMedicards] = useState([]);

  const handleMedicardCreated = (newMedicard) => {
    setMedicards(prevMedicards => [newMedicard, ...prevMedicards]);
    console.log('New medicard created:', newMedicard);
    alert(`Medicard "${newMedicard.cardId}" issued successfully for ${newMedicard.patientName}!`);
  };

  return (
    <div className="flex h-screen bg-gray-50 text-gray-800">
      <div className="flex-1 flex flex-col">
        <main className="flex-1 overflow-y-auto p-6 pt-0">
          <DashboardHeader onCreateMedicard={() => setIsCreateMedicardModalOpen(true)} />
          <MedicardList medicards={medicards} onMedicardCreated={handleMedicardCreated} />
        </main>
      </div>

      {isCreateMedicardModalOpen && (
        <CreateMedicardModal
          isOpen={isCreateMedicardModalOpen}
          onClose={() => setIsCreateMedicardModalOpen(false)}
          onMedicardCreated={handleMedicardCreated}
        />
      )}
    </div>
  );
};

export default MedicardDashboard;
