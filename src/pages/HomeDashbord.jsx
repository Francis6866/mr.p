import React, { useState, useMemo } from 'react';
import { LineChart } from '@mui/x-charts/LineChart';
import { IoPeopleOutline, IoSettingsOutline } from "react-icons/io5";
import { FaRegCalendarCheck, FaRegHospital } from "react-icons/fa";
import { BsThreeDotsVertical, BsSearch, BsBell, BsChevronRight, BsPlus } from "react-icons/bs";
import { GoFilter } from "react-icons/go";
import { FiEye, FiTrash2 } from "react-icons/fi";
import {
    RiLayoutGridLine,
    RiMessage2Line,
    RiFileList2Line,
    RiExchangeLine,
    RiHeadphoneLine,
    RiQuestionLine,
    RiArrowDownSLine
} from "react-icons/ri";

const Sidebar = () => {
    const menuItems = [
        { icon: <RiLayoutGridLine size={20} />, name: 'Dashboard' },
        { icon: <IoPeopleOutline size={20} />, name: 'Patients' },
        { icon: <RiMessage2Line size={20} />, name: 'Message' },
        { icon: <FaRegCalendarCheck size={20} />, name: 'Appointments' },
        { icon: <RiFileList2Line size={20} />, name: 'Billing' },
        { icon: <RiExchangeLine size={20} />, name: 'Transactions' },
    ];

    const tools = [
        { icon: <IoSettingsOutline size={20} />, name: 'Settings' },
        { icon: <RiHeadphoneLine size={20} />, name: 'Chat & Support' },
        { icon: <RiQuestionLine size={20} />, name: 'Help Center' },
    ];

    return (
        <div className="w-64 bg-white p-5 flex flex-col justify-between">
            <div>
                <div className="flex items-center gap-2 mb-10">
                    <div className="bg-teal-500 rounded-full p-2">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-6 h-6">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-5.5-2.5l1.41-1.41L12 16.17l4.09-4.08L17.5 13.5 12 19 6.5 13.5zM12 5c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
                        </svg>
                    </div>
                    <span className="text-2xl font-bold">Medisight</span>
                </div>
                <nav>
                    <ul>
                        {menuItems.map((item, index) => (
                            <li key={index} className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer ${item.name === 'Dashboard' ? 'bg-teal-50 text-teal-500 font-semibold' : 'text-gray-500 hover:bg-gray-50'}`}>
                                {item.icon}
                                <span>{item.name}</span>
                            </li>
                        ))}
                    </ul>
                </nav>
                <div className="mt-8">
                    <p className="text-xs text-gray-400 uppercase tracking-wider pl-3">Tools</p>
                    <nav className="mt-4">
                        <ul>
                            {tools.map((item, index) => (
                                <li key={index} className="flex items-center gap-3 p-3 rounded-lg cursor-pointer text-gray-500 hover:bg-gray-50">
                                    {item.icon}
                                    <span>{item.name}</span>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>
            </div>
            <div>
                <div className="bg-teal-50 p-4 rounded-lg text-left">
                    <div className="bg-white rounded-full w-8 h-8 flex items-center justify-center">
                        <svg className="w-5 h-5 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path></svg>
                    </div>
                    <h3 className="font-semibold mt-2">Upgrade to premium</h3>
                    <p className="text-sm text-gray-600 mt-1">Upgrade your account to premium to get more features</p>
                    <button className="w-full bg-gray-800 text-white py-2 rounded-lg mt-3 font-semibold">Upgrade plan</button>
                </div>
                <div className="mt-6 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <img src="https://i.pravatar.cc/40?u=robert" alt="Robert Fox" className="w-10 h-10 rounded-full" />
                        <div>
                            <p className="font-semibold">Robert Fox</p>
                            <p className="text-sm text-gray-500">robertfox@email.com</p>
                        </div>
                    </div>
                    <RiArrowDownSLine className="text-gray-500" />
                </div>
            </div>
        </div>
    )
};

const DashboardHeader = () => (
    <div className="flex justify-between items-center mb-6">
        <div>
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <p className="text-gray-500">Overview of all of your patients and your income</p>
        </div>
        <div className="flex items-center gap-4">
            <button className="flex items-center gap-2 border rounded-lg px-4 py-2 hover:bg-gray-100">
                <BsPlus />
                <span>Export</span>
            </button>
            <button className="flex items-center gap-2 bg-teal-500 text-white rounded-lg px-4 py-2 hover:bg-teal-600">
                <BsPlus />
                <span>Create new</span>
            </button>
        </div>
    </div>
);

const StatCard = ({ icon, title, value, percentage, iconBgColor }) => (
    <div className="bg-white p-3 rounded-lg shadow flex flex-col justify-between">
        <div className="flex items-center justify-between">
            <div className={`p-1 rounded-lg ${iconBgColor}`}>
                {icon}
            </div>
            <div>
                <p className="text-gray-500 text-sm mt-4">{title}</p>
                <p className="text-l font-bold">{value}</p>
            </div>
            <span className={`text-sm font-semibold ${percentage > 0 ? 'text-green-500' : 'text-red-500'}`}>
                +{percentage}%
            </span>
        </div>
        <a href="#" className="flex-row  justify-between text-teal-500 text-sm font-semibold mt-4 flex items-center gap-1">
            See details
            <BsChevronRight />
        </a>
    </div>
);

const OverviewChart = () => {
    const uData = [4000, 3000, 2000, 2780, 1890, 2390, 3490];
    const pData = [2400, 1398, 9800, 3908, 4800, 3800, 4300];
    const xLabels = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
    ];

    return (
        <div className="bg-white p-5 rounded-lg shadow">
            <div className="flex justify-between items-center">
                <h3 className="font-bold text-lg">Overview</h3>
                <div className="flex gap-4 text-sm">
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-teal-400 rounded-full"></div>
                        <span>Hospitalized patients</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
                        <span>Outpatients</span>
                    </div>
                </div>
                <BsThreeDotsVertical />
            </div>
            <div style={{ height: 250, marginTop: '20px' }}>
                <LineChart
                    series={[
                        { data: uData, label: 'Hospitalized patients', color: '#4fd1c5' },
                        { data: pData, label: 'Outpatients', color: '#e2e8f0' },
                    ]}
                    xAxis={[{ scaleType: 'point', data: xLabels }]}
                    sx={{
                        '.MuiLineElement-root': {
                            strokeWidth: 3,
                        },
                        '.MuiMarkElement-root': {
                            strokeWidth: 2,
                            scale: '0.6',
                        },
                    }}
                />
            </div>
        </div>
    );
};


const AppointmentList = () => {
    const appointments = [
        { name: 'Brooklyn Simmons', test: 'Allergy Testing', time: 'Tomorrow 10:30', avatar: 'https://i.pravatar.cc/40?u=a' },
        { name: 'Courtney Henry', test: 'Routine Lab Tests', time: 'Tomorrow 10:00', avatar: 'https://i.pravatar.cc/40?u=b' },
        { name: 'Sarah Miller Olivia', test: 'Chronic Disease Management', time: 'Today 15:00', avatar: 'https://i.pravatar.cc/40?u=c' },
        { name: 'Esther Howard', test: 'Allergy Testing', time: 'Today 14:00', avatar: 'https://i.pravatar.cc/40?u=d' },
    ];

    return (
        <div className="bg-white p-5 rounded-lg shadow h-full">
            <div className="flex justify-between items-center">
                <h3 className="font-bold text-lg">Appointment list</h3>
                <BsThreeDotsVertical />
            </div>
            <div className="mt-4">
                {appointments.map((appt, index) => (
                    <div key={index} className="flex items-center justify-between py-2 border-b border-gray-200 last:border-b-0">
                        <div className="flex items-center gap-1">
                            <img src={appt.avatar} alt={appt.name} className="w-8 h-8 rounded-full" />
                            <div>
                                <p className=" text-sm font-semibold">{appt.name}</p>
                                <p className="text-sm text-gray-500">{appt.test}</p>
                            </div>
                        </div>
                        <div className="text-right">
                            <p className="text-sm text-gray-500">{appt.time.split(' ')[0]}</p>
                            <p className="font-semibold">{appt.time.split(' ')[1]}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

const PatientList = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedDepartment, setSelectedDepartment] = useState('All');
    const [selectedGender, setSelectedGender] = useState('All');
    const [showFilters, setShowFilters] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);
    const [selectedRows, setSelectedRows] = useState(new Set());
    const [selectAll, setSelectAll] = useState(false);

    const patients = [
        { name: 'Brooklyn Simmons', gender: 'Male', dob: '1995-03-18', age: 29, department: 'Cardiology', id: '#OM123AA' },
        { name: 'Anthony Johnson', gender: 'Male', dob: '1997-03-18', age: 27, department: 'Cardiology', id: '#AT456BB' },
        { name: 'Sarah Miller Olivia', gender: 'Female', dob: '1987-03-18', age: 35, department: 'Oncology', id: '#EA789CC' },
        { name: 'Emily Davis', gender: 'Female', dob: '1990-05-12', age: 34, department: 'Neurology', id: '#ED101DD' },
        { name: 'Michael Chen', gender: 'Male', dob: '1985-08-25', age: 39, department: 'Orthopedics', id: '#MC202EE' },
        { name: 'Lisa Rodriguez', gender: 'Female', dob: '1992-11-03', age: 32, department: 'Cardiology', id: '#LR303FF' },
        { name: 'David Wilson', gender: 'Male', dob: '1988-12-15', age: 36, department: 'Neurology', id: '#DW404GG' },
        { name: 'Jennifer Brown', gender: 'Female', dob: '1993-07-22', age: 31, department: 'Orthopedics', id: '#JB505HH' },
        { name: 'Robert Taylor', gender: 'Male', dob: '1986-04-08', age: 38, department: 'Cardiology', id: '#RT606II' },
        { name: 'Amanda Garcia', gender: 'Female', dob: '1991-09-30', age: 33, department: 'Oncology', id: '#AG707JJ' },
    ];

    // Get unique departments for filter dropdown
    const departments = useMemo(() => {
        const depts = [...new Set(patients.map(patient => patient.department))];
        return ['All', ...depts];
    }, []);

    // Get unique genders for filter dropdown
    const genders = useMemo(() => {
        const genderOptions = [...new Set(patients.map(patient => patient.gender))];
        return ['All', ...genderOptions];
    }, []);

    // Filter patients based on search term and filters
    const filteredPatients = useMemo(() => {
        return patients.filter(patient => {
            const matchesSearch = patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                 patient.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                 patient.department.toLowerCase().includes(searchTerm.toLowerCase());
            
            const matchesDepartment = selectedDepartment === 'All' || patient.department === selectedDepartment;
            const matchesGender = selectedGender === 'All' || patient.gender === selectedGender;

            return matchesSearch && matchesDepartment && matchesGender;
        });
    }, [patients, searchTerm, selectedDepartment, selectedGender]);

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
            const allCurrentPatientIds = currentPatients.map(patient => patient.id);
            setSelectedRows(new Set([...selectedRows, ...allCurrentPatientIds]));
        } else {
            const currentPatientIds = currentPatients.map(patient => patient.id);
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
        const selectedPatients = patients.filter(patient => selectedRows.has(patient.id));
        console.log('Viewing patients:', selectedPatients);
        alert(`Viewing ${selectedPatients.length} selected patient(s)`);
    };

    const handleDelete = () => {
        const selectedPatients = patients.filter(patient => selectedRows.has(patient.id));
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
                            className="border border-gray-200 rounded-lg pl-10 pr-4 py-2 w-84"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <button 
                        className={`flex items-center gap-2 border border-gray-200 rounded-lg px-4 py-2 hover:bg-gray-100 ${showFilters ? 'bg-teal-50 border-teal-300' : ''}`}
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
                        <button
                            onClick={handleView}
                            className="flex items-center gap-2 px-3 py-1 bg-blue-500 text-white rounded-lg text-sm hover:bg-blue-600 transition-colors"
                        >
                            <FiEye size={14} />
                            <span>View</span>
                        </button>
                        <button
                            onClick={handleDelete}
                            className="flex items-center gap-2 px-3 py-1 bg-red-500 text-white rounded-lg text-sm hover:bg-red-600 transition-colors"
                        >
                            <FiTrash2 size={14} />
                            <span>Delete</span>
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
                        <th className="p-3 font-semibold text-gray-600">Name</th>
                        <th className="p-3 font-semibold text-gray-600">Gender</th>
                        <th className="p-3 font-semibold text-gray-600">Date of Birth</th>
                        <th className="p-3 font-semibold text-gray-600">Age</th>
                        <th className="p-3 font-semibold text-gray-600">Department</th>
                        <th className="p-3 font-semibold text-gray-600">Patient ID</th>
                    </tr>
                </thead>
                <tbody>
                    {currentPatients.length > 0 ? (
                        currentPatients.map((patient, index) => (
                            <tr key={index} className={`border-b border-gray-200 hover:bg-gray-50 ${selectedRows.has(patient.id) ? 'bg-blue-50' : ''}`}>
                                <td className="p-3">
                                    <input 
                                        type="checkbox" 
                                        checked={selectedRows.has(patient.id)}
                                        onChange={(e) => handleRowSelection(patient.id, e.target.checked)}
                                    />
                                </td>
                                <td className="p-3 flex items-center gap-3">
                                    <img src={`https://i.pravatar.cc/40?u=${patient.name}`} alt={patient.name} className="w-8 h-8 rounded-full" />
                                    {patient.name}
                                </td>
                                <td className="p-3 text-gray-600">{patient.gender}</td>
                                <td className="p-3 text-gray-600">{patient.dob}</td>
                                <td className="p-3 text-gray-600">{patient.age} years old</td>
                                <td className="p-3 text-gray-600">{patient.department}</td>
                                <td className="p-3 text-gray-600">{patient.id}</td>
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
    )
}

const Dashboard = () => {
    return (
        <div className="flex h-screen bg-gray-50 text-gray-800">
            {/* <Sidebar /> */}
            <div className="flex-1 flex flex-col">
                <header className="p-6 bg-gray-50 flex justify-between items-center">
                    <h1 className="text-xl font-semibold">
                        <span role="img" aria-label="sun">☀️</span> Good Morning, Dr. Robert!
                    </h1>
                    <div className="flex items-center gap-6">
                        <BsBell size={20} className="text-gray-500" />
                        <img src="https://i.pravatar.cc/40?u=drrobert" alt="Dr. Robert" className="w-10 h-10 rounded-full" />
                    </div>
                </header>
                <main className="flex-1 overflow-y-auto p-6 pt-0">
                    <DashboardHeader />
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <StatCard icon={<IoPeopleOutline size={24} className="text-blue-500" />} title="Total Patients" value="579" percentage={15} iconBgColor="bg-blue-100" />
                        <StatCard icon={<FaRegCalendarCheck size={24} className="text-orange-500" />} title="Total Appointment" value="54" percentage={10} iconBgColor="bg-orange-100" />
                        <StatCard icon={<FaRegHospital size={24} className="text-teal-500" />} title="Total Income" value="$8,399.24" percentage={28} iconBgColor="bg-teal-100" />
                        <StatCard icon={<FaRegHospital size={24} className="text-indigo-500" />} title="Total Treatments" value="112" percentage={12} iconBgColor="bg-indigo-100" />
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
                        <div className="lg:col-span-2">
                            <OverviewChart />
                        </div>
                        <div>
                            <AppointmentList />
                        </div>
                    </div>
                    <PatientList />
                </main>
            </div>
        </div>
    );
};

export default Dashboard;