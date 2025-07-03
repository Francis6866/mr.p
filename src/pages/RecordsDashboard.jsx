import React, { useState, useMemo, useEffect } from 'react';
import { LineChart } from '@mui/x-charts/LineChart';
import { IoPeopleOutline, IoSettingsOutline } from "react-icons/io5";
import { FaDownload, FaRegCalendarCheck, FaRegHospital } from "react-icons/fa";
import { BsThreeDotsVertical, BsSearch, BsBell, BsChevronRight, BsPlus } from "react-icons/bs";
import { GoFilter } from "react-icons/go";
import { FiEye, FiTrash2, FiX } from "react-icons/fi";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRecords } from '../store/slices/recordsSlice';
import { formatDate } from '../utility';
import { Loader } from '../components/loader';

const CreatePatientModal = ({ isOpen, onClose, onPatientCreated }) => {
  const [formData, setFormData] = useState({
    name: '',
    gender: '',
    dob: '',
    nin: '',
    email: ''
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

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.gender) {
      newErrors.gender = 'Gender is required';
    }

    if (!formData.dob) {
      newErrors.dob = 'Date of birth is required';
    }

    if (!formData.nin.trim()) {
      newErrors.nin = 'NIN is required';
    } else if (formData.nin.length !== 11) {
      newErrors.nin = 'NIN must be 11 digits';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      // Calculate age from date of birth
      const today = new Date();
      const birthDate = new Date(formData.dob);
      const age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      const actualAge = monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate()) ? age - 1 : age;

      // Generate a unique ID
      const newId = `#${Math.random().toString(36).substr(2, 6).toUpperCase()}${Math.random().toString(36).substr(2, 3).toUpperCase()}`;

      const newPatient = {
        ...formData,
        age: actualAge,
        department: 'General', // Default department
        id: newId
      };

      onPatientCreated(newPatient);
      handleClose();
    }
  };

  const handleClose = () => {
    setFormData({
      name: '',
      gender: '',
      dob: '',
      nin: '',
      email: ''
    });
    setErrors({});
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}  >
      <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Create New Patient</h2>
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
              Full Name *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 ${errors.name ? 'border-red-500' : 'border-gray-300'
                }`}
              placeholder="Enter full name"
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Gender *
            </label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 ${errors.gender ? 'border-red-500' : 'border-gray-300'
                }`}
            >
              <option value="">Select gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
            {errors.gender && <p className="text-red-500 text-sm mt-1">{errors.gender}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Date of Birth *
            </label>
            <input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 ${errors.dob ? 'border-red-500' : 'border-gray-300'
                }`}
            />
            {errors.dob && <p className="text-red-500 text-sm mt-1">{errors.dob}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              NIN (11 digits) *
            </label>
            <input
              type="text"
              name="nin"
              value={formData.nin}
              onChange={handleInputChange}
              maxLength={11}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 ${errors.nin ? 'border-red-500' : 'border-gray-300'
                }`}
              placeholder="Enter 11-digit NIN"
            />
            {errors.nin && <p className="text-red-500 text-sm mt-1">{errors.nin}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email *
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 ${errors.email ? 'border-red-500' : 'border-gray-300'
                }`}
              placeholder="Enter email address"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={handleClose}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors"
            >
              Create Patient
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const DashboardHeader = ({ onCreatePatient }) => (
  <div className="flex justify-between items-center mb-6 mt-6">
    <div>
      <h1 className="text-2xl font-bold">Medical Record</h1>
      <p className="text-gray-500">Patients records you created</p>
    </div>
    <div className="flex items-center gap-4">

      <button
        onClick={onCreatePatient}
        className="flex items-center gap-2 bg-teal-500 text-white rounded-2xl px-4 py-2 hover:bg-teal-600"
      >
        <BsPlus />
        <span>Create new patient</span>
      </button>
    </div>
  </div>
);

const RecordList = ({ record, onPatientCreated }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('All');
  const [selectedGender, setSelectedGender] = useState('All');
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [selectedRows, setSelectedRows] = useState(new Set());
  const [selectAll, setSelectAll] = useState(false);
  const navigate = useNavigate();
  // Get unique departments for filter dropdown


  // console.log("Recordsss", record)

  // Filter patients based on search term and filters
  const filteredPatients = useMemo(() => {
    return record.filter(patient => {
      const matchesSearch = patient.patient.toLowerCase().includes(searchTerm.toLowerCase())
        || patient.recordId.toLowerCase().includes(searchTerm.toLowerCase())
      return matchesSearch
    });
  }, [record, searchTerm]);

  // Pagination logic
  const totalPages = Math.ceil(filteredPatients.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPatients = filteredPatients.slice(startIndex, endIndex);

  // Reset to first page when filters change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedDepartment, selectedGender]);

  // Handle select all checkbox
  const handleSelectAll = (checked) => {
    setSelectAll(checked);
    if (checked) {
      const allCurrentPatientIds = currentPatients.map(patient => patient.recordId);
      setSelectedRows(new Set([...selectedRows, ...allCurrentPatientIds]));
    } else {
      const currentPatientIds = currentPatients.map(patient => patient.recordId);
      const newSelectedRows = new Set(selectedRows);
      currentPatientIds.forEach(id => newSelectedRows.delete(id));
      setSelectedRows(newSelectedRows);
    }
  };

  // Handle individual row selection
  const handleRowSelection = (patientId, checked) => {
    const newSelectedRows = new Set(selectedRows);
    if (checked) {
      newSelectedRows.add(patientId);
    } else {
      newSelectedRows.delete(patientId);
    }
    setSelectedRows(newSelectedRows);

    // Update select all state
    const currentPatientIds = currentPatients.map(patient => patient.id);
    const allCurrentSelected = currentPatientIds.every(id => newSelectedRows.has(id));
    setSelectAll(allCurrentSelected);
  };

  // Action handlers
  const handleView = () => {
    const selectedPatients = record.filter(patient => selectedRows.has(patient.recordId));
    // console.log('Viewing patients:', selectedPatients);
    // alert(`Viewing ${selectedPatients.length} selected patient(s)`);
    navigate(`/dashboard/patients/records/${selectedPatients[0].health_id}`);
  };

  const handleDelete = () => {
    const selectedPatients = record.filter(patient => selectedRows.has(patient.recordId));
    if (confirm(`Are you sure you want to delete ${selectedPatients.length} selected patient(s)?`)) {
      console.log('Deleting patients:', selectedPatients);
      alert(`Deleted ${selectedPatients.length} patient(s)`);
      setSelectedRows(new Set());
      setSelectAll(false);
    }
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedDepartment('All');
    setSelectedGender('All');
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

  return (
    <div className="bg-white p-5 rounded-lg shadow mt-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold text-lg">Patient list</h3>
        <div className="flex items-center gap-4">
          <div className="relative">
            <BsSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name or ID"
              className="border border-gray-200 rounded-2xl pl-10 pr-4 py-2 w-84"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button
            className={`flex items-center gap-2 border border-gray-200 rounded-2xl px-4 py-2 hover:bg-gray-100 ${showFilters ? 'bg-teal-50 border-teal-300' : ''}`}
            onClick={() => setShowFilters(!showFilters)}
          >
            <GoFilter />
            <span>Filter</span>
          </button>
          {(searchTerm || selectedDepartment !== 'All' || selectedGender !== 'All') && (
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
              <label className="text-sm font-medium text-gray-700">Department:</label>
              <select
                value={selectedDepartment}
                onChange={(e) => setSelectedDepartment(e.target.value)}
                className="border rounded-lg px-3 py-1 text-sm"
              >
                {departments.map(dept => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
            </div>
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium text-gray-700">Gender:</label>
              <select
                value={selectedGender}
                onChange={(e) => setSelectedGender(e.target.value)}
                className="border rounded-lg px-3 py-1 text-sm"
              >
                {genders.map(gender => (
                  <option key={gender} value={gender}>{gender}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      )}

      {/* Results Summary with Actions */}
      <div className="mb-4 flex items-center justify-between">
        {/* <div className="text-sm text-gray-600">
                    Showing {startIndex + 1}-{Math.min(endIndex, filteredPatients.length)} of {filteredPatients.length} patients
                    {(searchTerm || selectedDepartment !== 'All' || selectedGender !== 'All') && (
                        <span className="ml-2 text-teal-600">
                            (filtered)
                        </span>
                    )}
                </div> */}

        {/* Action Buttons - Only show when rows are selected */}
        {selectedRows.size > 0 && (
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-600">
              {selectedRows.size} selected
            </span>
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
              onClick={handleDelete}
              className="flex items-center gap-2 px-3 py-1 bg-teal-500 text-white rounded-lg text-sm hover:bg-teal-600 transition-colors"
            >
              <FaDownload size={14} />
              <span>Download</span>
            </button>
          </div>
        )}
      </div>

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
            <th className="p-3 font-semibold text-gray-600">Patient ID</th>
            <th className="p-3 font-semibold text-gray-600">Provider</th>
            <th className="p-3 font-semibold text-gray-600">Created At</th>
            <th className="p-3 font-semibold text-gray-600">Type</th>
            <th className="p-3 font-semibold text-gray-600">Record ID</th>
          </tr>
        </thead>
        <tbody>
          {currentPatients.length > 0 ? (
            currentPatients.map((recordData, index) => (
              <tr
                key={index}
                className={`border-b border-gray-200 hover:bg-gray-50 ${selectedRows.has(recordData.id) ? 'bg-blue-50' : ''}`}>
                <td className="p-3">
                  <input
                    type="checkbox"
                    checked={selectedRows.has(recordData.recordId)}
                    onChange={(e) => handleRowSelection(recordData.recordId, e.target.checked)}
                  />
                </td>
                <td
                  className="p-3 flex items-center gap-3 cursor-pointer">
                  {recordData.patient}
                </td>
                <td className="p-3 text-gray-600">{recordData.data.provider.name}</td>
                <td className="p-3 text-gray-600">{formatDate(recordData.created_at)}</td>
                <td className="p-3 text-gray-600">{recordData.type}</td>
                <td
                  onClick={() => navigate(`/dashboard/record/view-record/${recordData.recordId}/${recordData.patient}`)}
                  className="p-3 text-gray-600 cursor-pointer text-teal-500">{recordData.recordId}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="p-8 text-center text-gray-500">
                No patients found matching your search criteria.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination */}
      {filteredPatients.length > 0 && (
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
              className={`px-3 py-1 rounded border text-sm ${currentPage === 1
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
                className={`px-3 py-1 rounded border text-sm ${page === currentPage
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
              className={`px-3 py-1 rounded border text-sm ${currentPage === totalPages
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
  )
}

const PatientsRecord = () => {
  const [isCreatePatientModalOpen, setIsCreatePatientModalOpen] = useState(false);

  const dispatch = useDispatch()
  const { records, loading: recordsLoading } = useSelector(state => state.records)
  useEffect(() => {
    dispatch(fetchRecords())
  }, [])

  const handlePatientCreated = (newPatient) => {
    // Add the new patient to the list
    setPatients(prevPatients => [newPatient, ...prevPatients]);
    console.log('New patient created:', newPatient);
    alert(`Patient "${newPatient.name}" created successfully!`);
  };

  if (recordsLoading) {
    return <Loader message="Loading records..." />
  }
  // const token = localStorage.getItem('token')
  // console.log("Records", records)
  return (
    <div className="flex h-screen bg-gray-50 text-gray-800">
      {/* <Sidebar /> */}
      <div className="flex-1 flex flex-col">

        <main className="flex-1 overflow-y-auto p-6 pt-0">
          <DashboardHeader onCreatePatient={() => setIsCreatePatientModalOpen(true)} />
          {/* {console.log("Records", records)} */}
          {records && <RecordList record={records} onPatientCreated={handlePatientCreated} />}
        </main>
      </div>

      {isCreatePatientModalOpen && (
        <CreatePatientModal
          isOpen={isCreatePatientModalOpen}
          onClose={() => setIsCreatePatientModalOpen(false)}
          onPatientCreated={handlePatientCreated}
        />
      )}
    </div>
  );
};

export default PatientsRecord;