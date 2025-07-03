import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { BsChevronDown, BsArrowLeft } from "react-icons/bs";
import { formatDate, Day, Month } from '../utility';
import { Loader } from '../components/loader';
import { fetchRecordById } from '../store/slices/recordsSlice';
import { useDispatch } from 'react-redux';

const ViewRecord = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { recordId, patientId } = useParams();
    const [record, setRecord] = useState(null);
    const [patient, setPatient] = useState(null);
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchRecord = async () => {
            const response = await dispatch(fetchRecordById({ recordId }));
            if (response.payload.success === false) return alert(response.payload.message)
            setRecord(response.payload.data)
            setLoading(false)
        }
        fetchRecord();
    }, [recordId]);

    if (!recordId) {
        return (
            <div className="flex h-screen bg-gray-50 items-center justify-center">
                <div className="text-center">
                    <h2 className="text-xl font-bold text-gray-900 mb-2">Record Not Found</h2>
                    <p className="text-gray-600 mb-4">The medical record you're looking for could not be found.</p>
                    <button
                        onClick={() => navigate(-1)}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                    >
                        Go Back
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="flex h-screen bg-gray-50 overflow-hidden">
            <div className="flex-1 flex flex-col overflow-hidden">
                <div className="flex-1 overflow-y-auto p-4 sm:p-6">
                    {/* Breadcrumb */}
                    <div className="flex items-center space-x-2 text-sm text-gray-500 mb-4 sm:mb-6">
                        <span
                            className="text-blue-600 font-medium truncate cursor-pointer"
                            onClick={() => navigate('/dashboard')}
                        >
                            Dashboard
                        </span>
                        <BsChevronDown className="h-3 w-3 rotate-[-90deg] flex-shrink-0" />
                        <span
                            className="text-blue-600 font-medium truncate cursor-pointer"
                            onClick={() => navigate(-1)}
                        >
                            {patient?.full_name || 'Patient Records'}
                        </span>
                        <BsChevronDown className="h-3 w-3 rotate-[-90deg] flex-shrink-0" />
                        <span className="truncate">Medical Record Details</span>
                    </div>

                    {loading ? <Loader /> :
                        !record ? <div className="text-center text-gray-500">No record found</div> : (
                            <>
                                {/* Header */}
                                <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 mb-4 sm:mb-6">
                                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
                                        <div className="flex items-center space-x-3 sm:space-x-4">
                                            <button
                                                onClick={() => navigate(-1)}
                                                className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                                            >
                                                <BsArrowLeft className="w-5 h-5 text-gray-600" />
                                            </button>
                                            <div className="min-w-0 flex-1">
                                                <h1 className="text-2xl font-bold text-gray-900">Medical Record Details</h1>
                                                <div className="flex items-center space-x-2 mt-1">
                                                    <span className="text-sm text-gray-500">Record Type:</span>
                                                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                                        {record.type}
                                                    </span>
                                                    <span className="text-sm text-gray-500">•</span>
                                                    <span className="text-sm text-gray-500">
                                                        {formatDate(record.created_at)}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex space-x-2">
                                            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm opacity-30 cursor-not-allowed">
                                                Edit Record
                                            </button>
                                            <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 text-sm">
                                                Print
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {/* Main Content */}
                                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                                    {/* Left Column - Record Details */}
                                    <div className="lg:col-span-2 space-y-6">
                                        {/* Patient Information */}
                                        {patient && (
                                            <div className="bg-white rounded-lg shadow-sm p-6">
                                                <h3 className="text-lg font-bold text-gray-900 mb-4">Patient Information</h3>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                    <div>
                                                        <label className="block text-xs font-medium text-gray-500 uppercase">Patient Name</label>
                                                        <p className="text-sm font-medium text-gray-900">{patient.full_name}</p>
                                                    </div>
                                                    <div>
                                                        <label className="block text-xs font-medium text-gray-500 uppercase">Health ID</label>
                                                        <p className="text-sm font-medium text-gray-900">{patient.health_id}</p>
                                                    </div>
                                                    <div>
                                                        <label className="block text-xs font-medium text-gray-500 uppercase">Gender</label>
                                                        <p className="text-sm font-medium text-gray-900">{patient.gender}</p>
                                                    </div>
                                                    <div>
                                                        <label className="block text-xs font-medium text-gray-500 uppercase">Date of Birth</label>
                                                        <p className="text-sm font-medium text-gray-900">{patient.dob}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        {/* Provider Information */}
                                        {record.data?.provider && (
                                            <div className="bg-white rounded-lg shadow-sm p-6">
                                                <h3 className="text-lg font-bold text-gray-900 mb-4">Healthcare Provider</h3>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                    <div>
                                                        <label className="block text-xs font-medium text-gray-500 uppercase">Provider Name</label>
                                                        <p className="text-sm font-medium text-gray-900">
                                                            {record.data.provider.name || 'Not specified'}
                                                        </p>
                                                    </div>
                                                    <div>
                                                        <label className="block text-xs font-medium text-gray-500 uppercase">NPRN</label>
                                                        <p className="text-sm font-medium text-gray-900">
                                                            {record.data.provider.nprn || 'Not specified'}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        {/* Clinical Information */}
                                        <div className="bg-white rounded-lg shadow-sm p-6">
                                            <h3 className="text-lg font-bold text-gray-900 mb-4">Clinical Information</h3>
                                            <div className="space-y-4">
                                                {record.data?.data?.reasonForVisit && (
                                                    <div>
                                                        <label className="block text-xs font-medium text-gray-500 uppercase mb-2">
                                                            Reason for Visit
                                                        </label>
                                                        <div className="bg-gray-50 rounded-lg p-3">
                                                            <p className="text-sm text-gray-900">{record.data.data.reasonForVisit}</p>
                                                        </div>
                                                    </div>
                                                )}

                                                {record.data?.data?.diagnosis && (
                                                    <div>
                                                        <label className="block text-xs font-medium text-gray-500 uppercase mb-2">
                                                            Diagnosis
                                                        </label>
                                                        <div className="bg-gray-50 rounded-lg p-3">
                                                            <p className="text-sm text-gray-900">{record.data.data.diagnosis}</p>
                                                        </div>
                                                    </div>
                                                )}

                                                {record.data?.data?.notes && (
                                                    <div>
                                                        <label className="block text-xs font-medium text-gray-500 uppercase mb-2">
                                                            Clinical Notes
                                                        </label>
                                                        <div className="bg-gray-50 rounded-lg p-3">
                                                            <p className="text-sm text-gray-900">{record.data.data.notes}</p>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        {/* Prescribed Medications */}
                                        {record.data?.data?.prescribedMedications && record.data.data.prescribedMedications.length > 0 && (
                                            <div className="bg-white rounded-lg shadow-sm p-6">
                                                <h3 className="text-lg font-bold text-gray-900 mb-4">Prescribed Medications</h3>
                                                <div className="space-y-4">
                                                    {record.data.data.prescribedMedications.map((medication, index) => (
                                                        <div key={index} className="border border-gray-200 rounded-lg p-4">
                                                            <div className="flex items-center justify-between mb-3">
                                                                <h4 className="font-medium text-gray-900">
                                                                    {medication.name || `Medication ${index + 1}`}
                                                                </h4>
                                                                {medication.name && (
                                                                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                                                        Prescribed
                                                                    </span>
                                                                )}
                                                            </div>
                                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                                                <div>
                                                                    <label className="block text-xs font-medium text-gray-500 uppercase">Dosage</label>
                                                                    <p className="text-sm text-gray-900">{medication.dosage || 'Not specified'}</p>
                                                                </div>
                                                                <div>
                                                                    <label className="block text-xs font-medium text-gray-500 uppercase">Frequency</label>
                                                                    <p className="text-sm text-gray-900">{medication.frequency || 'Not specified'}</p>
                                                                </div>
                                                                <div>
                                                                    <label className="block text-xs font-medium text-gray-500 uppercase">Duration</label>
                                                                    <p className="text-sm text-gray-900">{medication.duration || 'Not specified'}</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        {/* Recommended Tests */}
                                        {record.data?.data?.recommendedTests && record.data.data.recommendedTests.length > 0 && (
                                            <div className="bg-white rounded-lg shadow-sm p-6">
                                                <h3 className="text-lg font-bold text-gray-900 mb-4">Recommended Tests</h3>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                                    {record.data.data.recommendedTests.map((test, index) => (
                                                        <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                                                            <div className="flex-shrink-0">
                                                                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                                                    <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                                                                        <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                                                                    </svg>
                                                                </div>
                                                            </div>
                                                            <div className="flex-1 min-w-0">
                                                                <p className="text-sm font-medium text-gray-900">{test}</p>
                                                                <p className="text-xs text-gray-500">Recommended</p>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    {/* Right Column - Record Metadata */}
                                    <div className="space-y-6">
                                        {/* Record Status */}
                                        <div className="bg-white rounded-lg shadow-sm p-6">
                                            <h3 className="text-lg font-bold text-gray-900 mb-4">Record Status</h3>
                                            <div className="space-y-4">
                                                <div className="flex items-center justify-between">
                                                    <span className="text-sm text-gray-500">Status</span>
                                                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                                        Active
                                                    </span>
                                                </div>
                                                <div className="flex items-center justify-between">
                                                    <span className="text-sm text-gray-500">Type</span>
                                                    <span className="text-sm font-medium text-gray-900">{record.type}</span>
                                                </div>
                                                <div className="flex items-center justify-between">
                                                    <span className="text-sm text-gray-500">Created</span>
                                                    <span className="text-sm font-medium text-gray-900">
                                                        {formatDate(record.created_at)}
                                                    </span>
                                                </div>
                                                {record.updated_at && (
                                                    <div className="flex items-center justify-between">
                                                        <span className="text-sm text-gray-500">Last Updated</span>
                                                        <span className="text-sm font-medium text-gray-900">
                                                            {formatDate(record.updated_at)}
                                                        </span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        {/* Record Timeline */}
                                        <div className="bg-white rounded-lg shadow-sm p-6">
                                            <h3 className="text-lg font-bold text-gray-900 mb-4">Timeline</h3>
                                            <div className="space-y-4">
                                                <div className="flex items-start space-x-3">
                                                    <div className="flex-shrink-0">
                                                        <div className="w-2 h-2 bg-green-600 rounded-full mt-2"></div>
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <p className="text-sm font-medium text-gray-900">Record Created</p>
                                                        <p className="text-xs text-gray-500">
                                                            {formatDate(record.created_at)}
                                                        </p>
                                                    </div>
                                                </div>

                                                {record.data?.data?.prescribedMedications && record.data.data.prescribedMedications.length > 0 && (
                                                    <div className="flex items-start space-x-3">
                                                        <div className="flex-shrink-0">
                                                            <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                                                        </div>
                                                        <div className="flex-1 min-w-0">
                                                            <p className="text-sm font-medium text-gray-900">
                                                                {record.data.data.prescribedMedications.length} Medication(s) Prescribed
                                                            </p>
                                                            <p className="text-xs text-gray-500">
                                                                {formatDate(record.created_at)}
                                                            </p>
                                                        </div>
                                                    </div>
                                                )}

                                                {record.data?.data?.recommendedTests && record.data.data.recommendedTests.length > 0 && (
                                                    <div className="flex items-start space-x-3">
                                                        <div className="flex-shrink-0">
                                                            <div className="w-2 h-2 bg-orange-600 rounded-full mt-2"></div>
                                                        </div>
                                                        <div className="flex-1 min-w-0">
                                                            <p className="text-sm font-medium text-gray-900">
                                                                {record.data.data.recommendedTests.length} Test(s) Recommended
                                                            </p>
                                                            <p className="text-xs text-gray-500">
                                                                {formatDate(record.created_at)}
                                                            </p>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        {/* Quick Stats */}
                                        <div className="bg-white rounded-lg shadow-sm p-6">
                                            <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Stats</h3>
                                            <div className="space-y-3">
                                                <div className="flex items-center justify-between">
                                                    <span className="text-sm text-gray-500">Medications</span>
                                                    <span className="text-lg font-bold text-gray-900">
                                                        {record.data?.data?.prescribedMedications?.length || 0}
                                                    </span>
                                                </div>
                                                <div className="flex items-center justify-between">
                                                    <span className="text-sm text-gray-500">Tests</span>
                                                    <span className="text-lg font-bold text-gray-900">
                                                        {record.data?.data?.recommendedTests?.length || 0}
                                                    </span>
                                                </div>
                                                <div className="flex items-center justify-between">
                                                    <span className="text-sm text-gray-500">Provider</span>
                                                    <span className="text-sm font-medium text-gray-900">
                                                        {record.data?.provider?.name ? '✓' : '—'}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Actions */}
                                        <div className="bg-white rounded-lg shadow-sm p-6">
                                            <h3 className="text-lg font-bold text-gray-900 mb-4">Actions</h3>
                                            <div className="space-y-3">
                                                <button className="w-full bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 text-sm">
                                                    Download PDF
                                                </button>
                                                <button className="w-full bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 text-sm opacity-30 cursor-not-allowed">
                                                    Share Record
                                                </button>
                                                <button className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm opacity-30 cursor-not-allowed">
                                                    Edit Record
                                                </button>
                                                <button className="w-full bg-red-100 text-red-700 px-4 py-2 rounded-lg hover:bg-red-200 text-sm opacity-30 cursor-not-allowed">
                                                    Delete Record
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )
                    }
                </div>
            </div>
        </div>
    );
};

export default ViewRecord; 