import React, { useEffect, useState } from 'react';
import { BsSearch, BsBell, BsChevronDown, BsPlus } from "react-icons/bs";
import { IoSettingsOutline } from "react-icons/io5";
import { BiDotsVerticalRounded, BiPlusCircle } from "react-icons/bi";
import DashNav from '../components/DashNav';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchPatientById } from '../store/slices/patientSlice';
import { Loader } from '../components/loader';
import { ageFromDate, Day, formatDate, Month } from '../utility';
import { addRecord, fetchRecordsByBusiness } from '../store/slices/recordsSlice';
import { createAppointment, fetchAppointmentByPatientBusiness, rescheduleAppointment } from '../store/slices/appointmentSlice';

const PatientRecords = () => {
    const [activeTab, setActiveTab] = useState('Patient Information');
    const [activeService, setActiveService] = useState('Medical');
    const [records, setRecords] = useState([]);
    const [miniloading, setMiniloading] = useState(false);
    const [showAppointmentModal, setShowAppointmentModal] = useState(false);
    const [showRescheduleModal, setShowRescheduleModal] = useState(false);
    const [selectedAppointmentToReschedule, setSelectedAppointmentToReschedule] = useState(null);
    const [showMedicalRecordModal, setShowMedicalRecordModal] = useState(false);
    const [appointmentForm, setAppointmentForm] = useState({
        date: '',
        time: '',
        duration: '30 min',
        type: 'Regular Checkup',
        doctor: '',
        priority: 'Normal',
        notes: '',
        treatmentPlan: [],
        reminderMethod: 'SMS & Email'
    });
    const [rescheduleForm, setRescheduleForm] = useState({
        date: '',
        time: '',
        doctor: '',
        type: '',
        reason: ''
    });
    const [medicalRecordForm, setMedicalRecordForm] = useState({
        recordType: 'Consultation',
        data: {
            diagnosis: '',
            reasonForVisit: '',
            notes: '',
            prescribedMedications: [
                {
                    name: '',
                    dosage: '',
                    frequency: '',
                    duration: ''
                }
            ],
            recommendedTests: []
        },
        provider: {
            name: '',
            nprn: ''
        }
    });
    const dispatch = useDispatch();
    const { healthId } = useParams();
    const { loading: patientLoading, selectedPatient } = useSelector(state => state.patients);
    const user = JSON.parse(localStorage.getItem("user"))
    const { appointments, loading: appointmentLoading } = useSelector(state => state.appointments)
    const navigate = useNavigate();

    const tabs = [
        'Patient Information',
        'Appointment History',
        'Next Appointment',
        'Medical Record'
    ];

    const services = ['Medical', 'Cosmetic'];

    // Sample appointment history data
    const appointmentHistory = [
        {
            id: 1,
            date: "2024-04-12",
            time: "10:30 AM",
            duration: "45 min",
            type: "Regular Checkup",
            doctor: "Dr. Ada Wong",
            status: "Completed",
            notes: "Routine cleaning and examination. No issues found.",
            treatmentProvided: ["Dental cleaning", "X-ray", "Fluoride treatment"]
        },
        {
            id: 2,
            date: "2024-03-15",
            time: "2:00 PM",
            duration: "30 min",
            type: "Follow-up",
            doctor: "Dr. Soap Mactavish",
            status: "Completed",
            notes: "Check on tooth filling progress. Healing well.",
            treatmentProvided: ["Visual examination", "Pain assessment"]
        },
        {
            id: 3,
            date: "2024-02-20",
            time: "9:15 AM",
            duration: "60 min",
            type: "Tooth Filling",
            doctor: "Dr. John Price",
            status: "Completed",
            notes: "Composite filling on upper left molar. Patient tolerated well.",
            treatmentProvided: ["Local anesthesia", "Composite filling", "Bite adjustment"]
        },
        {
            id: 4,
            date: "2024-01-28",
            time: "11:00 AM",
            duration: "25 min",
            type: "Consultation",
            doctor: "Dr. Lara Croft",
            status: "Completed",
            notes: "Initial consultation for dental implant. Treatment plan discussed.",
            treatmentProvided: ["Clinical examination", "Treatment planning", "Cost estimate"]
        },
        {
            id: 5,
            date: "2024-01-15",
            time: "3:30 PM",
            duration: "40 min",
            type: "Emergency",
            doctor: "Dr. Gordon Freeman",
            status: "Completed",
            notes: "Emergency visit for severe tooth pain. Temporary relief provided.",
            treatmentProvided: ["Pain relief", "Antibiotics prescribed", "Emergency treatment"]
        },
        {
            id: 6,
            date: "2023-12-10",
            time: "1:45 PM",
            duration: "35 min",
            type: "Cleaning",
            doctor: "Dr. Ada Wong",
            status: "Completed",
            notes: "Professional cleaning and scaling. Good oral hygiene maintained.",
            treatmentProvided: ["Deep cleaning", "Scaling", "Polishing"]
        },
        {
            id: 7,
            date: "2024-04-25",
            time: "4:00 PM",
            duration: "30 min",
            type: "Follow-up",
            doctor: "Dr. Soap Mactavish",
            status: "Cancelled",
            notes: "Patient cancelled due to illness. Rescheduled for next week.",
            treatmentProvided: []
        },
        {
            id: 8,
            date: "2024-03-03",
            time: "8:30 AM",
            duration: "20 min",
            type: "Consultation",
            doctor: "Dr. John Price",
            status: "No Show",
            notes: "Patient did not attend scheduled appointment.",
            treatmentProvided: []
        }
    ];

    // Sample appointment logs data
    const appointmentLogs = [
        {
            id: 1,
            action: "Appointment scheduled",
            appointmentType: "Regular Checkup",
            createdBy: "Reception Staff - Mary Johnson",
            date: "2024-04-10",
            time: "9:15 AM",
            details: "Routine checkup appointment scheduled with Dr. Ada Wong"
        },
        {
            id: 2,
            action: "Appointment completed",
            appointmentType: "Regular Checkup",
            createdBy: "Dr. Ada Wong",
            date: "2024-04-12",
            time: "11:15 AM",
            details: "Patient attended appointment. Routine cleaning completed successfully"
        },
        {
            id: 3,
            action: "Follow-up scheduled",
            appointmentType: "Follow-up",
            createdBy: "Dr. Soap Mactavish",
            date: "2024-03-10",
            time: "3:30 PM",
            details: "Follow-up appointment scheduled to check tooth filling progress"
        },
        {
            id: 4,
            action: "Appointment completed",
            appointmentType: "Follow-up",
            createdBy: "Dr. Soap Mactavish",
            date: "2024-03-15",
            time: "2:45 PM",
            details: "Follow-up completed. Healing progress is satisfactory"
        },
        {
            id: 5,
            action: "Emergency appointment",
            appointmentType: "Emergency",
            createdBy: "Reception Staff - David Kim",
            date: "2024-01-15",
            time: "3:00 PM",
            details: "Emergency slot allocated for severe tooth pain complaint"
        },
        {
            id: 6,
            action: "Appointment cancelled",
            appointmentType: "Follow-up",
            createdBy: "Patient - Willie Jennie",
            date: "2024-04-24",
            time: "2:10 PM",
            details: "Patient called to cancel due to illness. Rescheduling requested"
        },
        {
            id: 7,
            action: "No show logged",
            appointmentType: "Consultation",
            createdBy: "Reception Staff - Mary Johnson",
            date: "2024-03-03",
            time: "8:45 AM",
            details: "Patient did not attend scheduled consultation appointment"
        },
        {
            id: 8,
            action: "Appointment rescheduled",
            appointmentType: "Cleaning",
            createdBy: "Reception Staff - Sarah Wilson",
            date: "2023-12-08",
            time: "4:20 PM",
            details: "Appointment moved from Dec 8th to Dec 10th at patient's request"
        }
    ];

    // Sample logs data
    const medicalLogs = [
        {
            id: 1,
            action: "Created medical record",
            recordType: "Crown Placement",
            toothNumber: 3,
            createdBy: "Dr. Ada Wong",
            date: "2024-01-21",
            time: "10:30 AM",
            details: "Initial crown placement record created for tooth #3"
        },
        {
            id: 2,
            action: "Updated treatment plan",
            recordType: "Tooth Filling",
            toothNumber: 10,
            createdBy: "Dr. Soap Mactavish",
            date: "2024-04-12",
            time: "2:15 PM",
            details: "Treatment plan updated due to time constraints"
        },
        {
            id: 3,
            action: "Created referral",
            recordType: "Extraction",
            toothNumber: 17,
            createdBy: "Dr. John Price",
            date: "2024-05-05",
            time: "11:45 AM",
            details: "Patient referred to oral surgeon for impacted wisdom tooth"
        },
        {
            id: 4,
            action: "Started treatment",
            recordType: "Root Canal Therapy",
            toothNumber: 30,
            createdBy: "Dr. Lara Croft",
            date: "2024-06-18",
            time: "9:00 AM",
            details: "Root canal therapy initiated for infected tooth"
        },
        {
            id: 5,
            action: "Completed treatment",
            recordType: "Veneer",
            toothNumber: 8,
            createdBy: "Dr. Ada Wong",
            date: "2024-07-02",
            time: "3:30 PM",
            details: "Porcelain veneer successfully placed and bonded"
        },
        {
            id: 6,
            action: "Created medical record",
            recordType: "Tooth Filling",
            toothNumber: 19,
            createdBy: "Dr. Soap Mactavish",
            date: "2024-08-29",
            time: "1:20 PM",
            details: "Composite filling procedure documented"
        },
        {
            id: 7,
            action: "Scheduled follow-up",
            recordType: "Deep Cleaning",
            toothNumber: 25,
            createdBy: "Dr. John Price",
            date: "2024-09-11",
            time: "4:10 PM",
            details: "Patient rescheduled, follow-up appointment created"
        },
        {
            id: 8,
            action: "Completed extraction",
            recordType: "Extraction",
            toothNumber: 1,
            createdBy: "Dr. Lara Croft",
            date: "2024-10-30",
            time: "8:45 AM",
            details: "Tooth extraction completed due to severe periodontitis"
        },
        {
            id: 9,
            action: "Insurance verification",
            recordType: "Root Canal Therapy",
            toothNumber: 14,
            createdBy: "Dr. Gordon Freeman",
            date: "2024-11-07",
            time: "12:30 PM",
            details: "Insurance pre-authorization submitted and logged"
        },
        {
            id: 10,
            action: "Treatment completed",
            recordType: "Bonding",
            toothNumber: 24,
            createdBy: "Dr. Ada Wong",
            date: "2024-12-19",
            time: "2:45 PM",
            details: "Cosmetic bonding procedure completed successfully"
        }
    ];



    useEffect(() => {
        // console.log("Patient ID", healthId)
        dispatch(fetchPatientById(healthId));

    }, [healthId]);

    // Form handlers
    const handleFormChange = (field, value) => {
        setAppointmentForm(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleTreatmentPlanChange = (treatments) => {
        setAppointmentForm(prev => ({
            ...prev,
            treatmentPlan: treatments
        }));
    };

    const handleRescheduleFormChange = (field, value) => {
        setRescheduleForm(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleMedicalRecordFormChange = (field, value) => {
        if (field.includes('.')) {
            const [section, subField] = field.split('.');
            setMedicalRecordForm(prev => ({
                ...prev,
                [section]: {
                    ...prev[section],
                    [subField]: value
                }
            }));
        } else {
            setMedicalRecordForm(prev => ({
                ...prev,
                [field]: value
            }));
        }
    };

    const handleMedicationChange = (index, field, value) => {
        setMedicalRecordForm(prev => ({
            ...prev,
            data: {
                ...prev.data,
                prescribedMedications: prev.data.prescribedMedications.map((med, i) =>
                    i === index ? { ...med, [field]: value } : med
                )
            }
        }));
    };

    const addMedication = () => {
        setMedicalRecordForm(prev => ({
            ...prev,
            data: {
                ...prev.data,
                prescribedMedications: [
                    ...prev.data.prescribedMedications,
                    { name: '', dosage: '', frequency: '', duration: '' }
                ]
            }
        }));
    };

    const removeMedication = (index) => {
        setMedicalRecordForm(prev => ({
            ...prev,
            data: {
                ...prev.data,
                prescribedMedications: prev.data.prescribedMedications.filter((_, i) => i !== index)
            }
        }));
    };

    const handleRecommendedTestsChange = (tests) => {
        setMedicalRecordForm(prev => ({
            ...prev,
            data: {
                ...prev.data,
                recommendedTests: tests
            }
        }));
    };

    const handleOpenRescheduleModal = (appointment) => {
        setSelectedAppointmentToReschedule(appointment);
        setRescheduleForm({
            date: appointment.data.date,
            time: appointment.data.time,
            doctor: appointment.data.doctor,
            type: appointment.data.type,
            reason: ''
        });
        setShowRescheduleModal(true);
    };

    const handleSubmitAppointment = async (e) => {
        e.preventDefault();

        // Basic validation
        if (!appointmentForm.date || !appointmentForm.time || !appointmentForm.doctor) {
            alert('Please fill in all required fields');
            return;
        }

        // Prepare appointment data
        const appointmentData = {
            ...appointmentForm,
            patient: selectedPatient?.health_id,
            business: user?.business_id,
            status: 'Pending',
            reminders: {
                sent: false,
                lastSent: null,
                method: appointmentForm.reminderMethod
            }
        };

        try {
            // Dispatch the create appointment action
            const result = await dispatch(createAppointment(appointmentData));

            if (result.type === 'appointments/createAppointment/fulfilled') {
                // Success - close modal and reset form
                setShowAppointmentModal(false);
                setAppointmentForm({
                    date: '',
                    time: '',
                    duration: '30 min',
                    type: 'Regular Checkup',
                    doctor: '',
                    priority: 'Normal',
                    notes: '',
                    treatmentPlan: [],
                    reminderMethod: 'SMS & Email'
                });

                alert('Appointment scheduled successfully!');
            } else if (result.type === 'appointments/createAppointment/rejected') {
                // Handle error
                alert(`Failed to schedule appointment: ${result.payload}`);
            }
        } catch (error) {
            console.error('Error creating appointment:', error);
            alert('An error occurred while scheduling the appointment. Please try again.');
        }
    };

    const handleSubmitReschedule = async (e) => {
        e.preventDefault();

        // Basic validation
        if (!rescheduleForm.date || !rescheduleForm.time || !rescheduleForm.doctor || !rescheduleForm.type) {
            alert('Please fill in all required fields');
            return;
        }

        // Check if any field actually changed
        if (rescheduleForm.date === selectedAppointmentToReschedule.data.date &&
            rescheduleForm.time === selectedAppointmentToReschedule.data.time &&
            rescheduleForm.doctor === selectedAppointmentToReschedule.data.doctor &&
            rescheduleForm.type === selectedAppointmentToReschedule.data.type) {
            alert('Please make at least one change to reschedule the appointment');
            return;
        }

        try {
            // Dispatch the reschedule appointment action
            const result = await dispatch(rescheduleAppointment({
                appointmentId: selectedAppointmentToReschedule.appointmentId,
                updateData: {
                    date: rescheduleForm.date,
                    time: rescheduleForm.time,
                    doctor: rescheduleForm.doctor,
                    type: rescheduleForm.type,
                    reason: rescheduleForm.reason,
                }
            }));

            if (result.type === 'appointments/rescheduleAppointment/fulfilled') {
                // Success - close modal and reset form
                setShowRescheduleModal(false);
                setSelectedAppointmentToReschedule(null);
                setRescheduleForm({
                    date: '',
                    time: '',
                    doctor: '',
                    type: '',
                    reason: ''
                });

                // Refresh appointments
                handleFetchAppointments();

                alert('Appointment rescheduled successfully!');
            } else if (result.type === 'appointments/rescheduleAppointment/rejected') {
                // Handle error
                alert(`Failed to reschedule appointment: ${result.payload}`);
            }
        } catch (error) {
            console.error('Error rescheduling appointment:', error);
            alert('An error occurred while rescheduling the appointment. Please try again.');
        }
    };

    const handleFetchAppointments = async () => {
        setMiniloading(true)
        dispatch(fetchAppointmentByPatientBusiness(selectedPatient?.health_id)).then((res) => {
            setMiniloading(false)
            if (res.payload.success === false) return alert(res.payload.message)
            // console.log("Done loading", res.payload.data)
        });
    }

    // Sample doctors list
    const doctors = [
        'Dr. Ada Wong',
        'Dr. Soap Mactavish',
        'Dr. John Price',
        'Dr. Lara Croft',
        'Dr. Gordon Freeman'
    ];

    // Sample appointment types
    const appointmentTypes = [
        'Regular Checkup',
        'Follow-up',
        'Emergency',
        'Consultation',
        'Cleaning',
        'Crown Placement',
        'Root Canal Therapy',
        'Extraction',
        'Implant Surgery',
        'Orthodontic Consultation'
    ];

    // Sample treatment options
    const treatmentOptions = [
        'Dental cleaning',
        'X-ray',
        'Fluoride treatment',
        'Visual examination',
        'Pain assessment',
        'Crown fitting',
        'Bite adjustment',
        'Final cementation',
        'Local anesthesia',
        'Implant placement',
        'Suturing',
        'Post-op instructions',
        'Clinical examination',
        'Digital impressions',
        'Treatment planning'
    ];

    // Record types
    const recordTypes = [
        'Consultation',
        'Prescription',
        'LabTest',
        'Imaging',
        'Surgery',
        'Vitals',
        'Diagnosis',
        'Allergy',
        'Vaccination',
        'Admission',
        'Discharge',
        'Referral',
        'MentalHealth',
        'ProgressNote',
        'TreatmentPlan',
        'ConsentForm',
        'MedicalCertificate',
        'DentalRecord',
        'EyeExam',
        'EmergencyVisit'
    ];

    // Sample recommended tests
    const availableTests = [
        'ECG',
        'Chest X-ray',
        'Blood pressure monitoring',
        'Blood glucose test',
        'Complete Blood Count (CBC)',
        'Lipid profile',
        'Liver function test',
        'Kidney function test',
        'Urine analysis',
        'CT Scan',
        'MRI',
        'Ultrasound',
        'Mammogram',
        'Colonoscopy',
        'Endoscopy'
    ];

    const handleSubmitMedicalRecord = async (e) => {
        e.preventDefault();

        // Basic validation
        if (!medicalRecordForm.recordType || !medicalRecordForm.data.reasonForVisit) {
            alert('Please fill in all required fields');
            return;
        }

        // Prepare medical record data
        const recordData = {
            ...medicalRecordForm,
            patient: selectedPatient?.health_id,
            business: user?.business_id,
        };

        try {
            // Here you would dispatch to your medical records slice
            console.log('Medical Record Data:', recordData);

            dispatch(addRecord(recordData))
                .then((res) => {
                    if (res?.payload?.success === false) return alert(res.payload.message)
                    dispatch(fetchRecordsByBusiness())
                    setShowMedicalRecordModal(false);
                    setMedicalRecordForm({
                        recordType: 'Consultation',
                        data: {
                            diagnosis: '',
                            reasonForVisit: '',
                            notes: '',
                            prescribedMedications: [
                                {
                                    name: '',
                                    dosage: '',
                                    frequency: '',
                                    duration: ''
                                }
                            ],
                            recommendedTests: []
                        },
                        provider: {
                            name: '',
                            nprn: ''
                        }
                    });

                    alert('Medical record created successfully!');
                })
                .catch((err) => {
                    console.error('Error creating medical record:', err);
                })

        } catch (error) {
            console.error('Error creating medical record:', error);
            alert('An error occurred while creating the medical record. Please try again.');
        }
    };

    // Sample patient data
    const patientData = {
        name: selectedPatient?.full_name,
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
        condition: selectedPatient?.id.split("-")[0],
        // Extended patient information
        id: selectedPatient?.health_id,
        age: selectedPatient?.dob ? ageFromDate(selectedPatient.dob) : 0,
        gender: selectedPatient?.gender,
        dateOfBirth: selectedPatient?.dob,
        phone: selectedPatient?.phone,
        email: selectedPatient?.email,
        address: "123 Victoria Island, Lagos, Nigeria",
        emergencyContact: selectedPatient?.emergencyContact,
        allergies: ["Penicillin", "Latex"],
        medicalHistory: [
            "Hypertension (controlled)",
            "Previous dental surgery (2022)"
        ],
        vitals: selectedPatient?.vitals,
        registrationDate: formatDate(selectedPatient?.created_at),
        lastUpdated: formatDate(selectedPatient?.updated_at)
    };


    if (!selectedPatient && patientLoading) {
        return <Loader message="Loading patient data..." />;
    }
    // console.log("Patient Data", appointments)
    return (
        <div className="flex h-screen bg-gray-50 overflow-hidden">
            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                <div className="flex-1 overflow-y-auto p-4 sm:p-6">
                    {/* Breadcrumb */}
                    <div className="flex items-center space-x-2 text-sm text-gray-500 mb-4 sm:mb-6">
                        <span className="text-blue-600 font-medium truncate cursor-pointer" onClick={() => navigate('/dashboard')}>Dashboard</span>
                        <BsChevronDown className="h-3 w-3 rotate-[-90deg] flex-shrink-0" />
                        <span className="truncate">{selectedPatient?.full_name}</span>
                    </div>

                    {/* Patient Header */}
                    <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 mb-4 sm:mb-6">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
                            <div className="flex items-center space-x-3 sm:space-x-4">
                                {/* <img
                                    src={patientData.avatar}
                                    alt={patientData.name}
                                    className="w-12 h-12 sm:w-16 sm:h-16 rounded-full flex-shrink-0"
                                /> */}
                                <div className="min-w-0 flex-1">
                                    <h2 className="text-xl sm:text-xl font-bold text-gray-900 truncate">{patientData.name}</h2>
                                    {/* <button className="text-blue-600 text-sm hover:underline mt-1">Edit</button> */}
                                </div>
                            </div>
                                <div className="flex items-center space-x-2 mt-1">
                                    <svg className="w-4 h-4 text-gray-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 2a8 8 0 100 16 8 8 0 000-16zM8 11a1 1 0 100 2h4a1 1 0 100-2H8z" clipRule="evenodd" />
                                    </svg>
                                    <span className="text-gray-600 text-sm truncate">{patientData.condition}</span>
                                </div>
                            <h2 className="text-gray-600 text-sm truncate">{patientData.id}</h2>
                            <button
                                onClick={() => setShowAppointmentModal(true)}
                                className="bg-blue-600 text-white px-4 sm:px-6 py-2 rounded-lg hover:bg-blue-700 text-sm sm:text-base w-full sm:w-auto"
                            >
                                Create Appointment
                            </button>
                        </div>
                    </div>

                    {/* Navigation Tabs */}
                    <div className="bg-white rounded-lg shadow-sm mb-4 sm:mb-6 sticky top-0 z-30">
                        <div className="border-b border-gray-200">
                            <nav className="flex overflow-x-auto space-x-4 sm:space-x-8 px-4 sm:px-6 scrollbar-hide">
                                {tabs.map((tab) => (
                                    <button
                                        key={tab}
                                        onClick={() => {
                                            if (tab === "Medical Record") {
                                                setMiniloading(true)
                                                dispatch(fetchRecordsByBusiness()).then((res) => {
                                                    setMiniloading(false)
                                                    if (res.payload.success === false) return alert(res.payload.message)
                                                    setRecords(res.payload.data)
                                                    // console.log("Done loading", res.payload.data)
                                                });
                                            }

                                            if (tab === "Appointment History" || tab === "Next Appointment") {
                                                handleFetchAppointments()
                                            }
                                            setActiveTab(tab)
                                        }}
                                        className={`py-3 sm:py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap flex-shrink-0 ${activeTab === tab
                                            ? 'border-blue-500 text-blue-600'
                                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                            }`}
                                    >
                                        {tab}
                                    </button>
                                ))}
                            </nav>
                        </div>
                    </div>

                    {/* Content Area */}
                    {activeTab === 'Patient Information' ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
                            {/* Basic Information */}

                            <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 h-[400px] ">
                                <h3 className="text-lg font-bold text-gray-900 mb-4 sm:mb-6">Basic Information</h3>

                                <div className="space-y-4">
                                    <div className="flex items-center space-x-3 sm:space-x-4">

                                        <div className="min-w-0 flex-1">
                                            <h4 className="text-base sm:text-lg font-semibold text-gray-900 truncate">{patientData.name}</h4>
                                            <p className="text-xs sm:text-sm text-gray-500 truncate">Patient ID: {patientData.id}</p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 gap-3 sm:gap-4">
                                        <div className="grid grid-cols-2 gap-3 sm:gap-4">
                                            <div>
                                                <label className="block text-xs font-medium text-gray-500 uppercase">Age</label>
                                                <p className="text-sm font-medium text-gray-900">{patientData.age} years</p>
                                            </div>
                                            <div>
                                                <label className="block text-xs font-medium text-gray-500 uppercase">Gender</label>
                                                <p className="text-sm font-medium text-gray-900">{patientData.gender}</p>
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-xs font-medium text-gray-500 uppercase">Date of Birth</label>
                                            <p className="text-sm font-medium text-gray-900">{patientData.dateOfBirth}</p>
                                        </div>



                                        <div>
                                            <label className="block text-xs font-medium text-gray-500 uppercase">Registration Date</label>
                                            <p className="text-sm font-medium text-gray-900">{patientData.registrationDate}</p>
                                        </div>

                                        <div>
                                            <label className="block text-xs font-medium text-gray-500 uppercase">Last Updated</label>
                                            <p className="text-sm font-medium text-gray-900">{patientData.lastUpdated}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Contact Information */}
                            <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 h-[400px] ">
                                <h3 className="text-lg font-bold text-gray-900 mb-4 sm:mb-6">Contact Information</h3>

                                <div className="space-y-3 sm:space-y-4">
                                    <div>
                                        <label className="block text-xs font-medium text-gray-500 uppercase">Phone Number</label>
                                        <p className="text-sm font-medium text-gray-900 break-all">{patientData.phone || "--:--"}</p>
                                    </div>

                                    <div>
                                        <label className="block text-xs font-medium text-gray-500 uppercase">Email Address</label>
                                        <p className="text-sm font-medium text-gray-900 break-all">{patientData.email}</p>
                                    </div>

                                    <div>
                                        <label className="block text-xs font-medium text-gray-500 uppercase">Address</label>
                                        <p className="text-sm font-medium text-gray-900">{patientData.address}</p>
                                    </div>

                                    <div className="border-t pt-3 sm:pt-4">
                                        <h4 className="text-base font-semibold text-gray-900 mb-2 sm:mb-3">Emergency Contact</h4>
                                        {patientData.emergencyContact ? (
                                            <div className="space-y-2">
                                                <div>
                                                    <label className="block text-xs font-medium text-gray-500 uppercase">Name</label>
                                                    <p className="text-sm font-medium text-gray-900">{patientData.emergencyContact?.name}</p>
                                                </div>
                                                <div>
                                                    <label className="block text-xs font-medium text-gray-500 uppercase">Relationship</label>
                                                    <p className="text-sm font-medium text-gray-900">{patientData.emergencyContact?.relationship}</p>
                                                </div>
                                                <div>
                                                    <label className="block text-xs font-medium text-gray-500 uppercase">Phone</label>
                                                    <p className="text-sm font-medium text-gray-900 break-all">{patientData.emergencyContact?.phone}</p>
                                                </div>
                                            </div>
                                        ) : (
                                            <p className="text-sm font-medium text-gray-400 mt-2">No emergency contact found</p>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Medical Information */}
                            <div className="xl:col-span-1 md:col-span-2 space-y-4 sm:space-y-6">


                                {/* Vital Signs */}
                                <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
                                    <h3 className="text-lg font-bold text-gray-900 mb-4 sm:mb-6">Latest Vital Signs</h3>

                                    <div className="grid grid-cols-2 gap-3 sm:gap-4">
                                        {/* <div>
                                            <label className="block text-xs font-medium text-gray-500 uppercase">Blood Pressure</label>
                                            <p className="text-sm font-medium text-gray-900">{patientData.vitals.bloodPressure}</p>
                                        </div> */}
                                        <div>
                                            <label className="block text-xs font-medium text-gray-500 uppercase">Blood Type</label>
                                            <p className="text-sm font-medium text-gray-900">{patientData.vitals?.bloodType || "--:--"}</p>
                                        </div>

                                        <div>
                                            <label className="block text-xs font-medium text-gray-500 uppercase">Genotype</label>
                                            <p className="text-sm font-medium text-gray-900">{patientData.vitals?.genotype || "--:--"}</p>
                                        </div>

                                        <div>
                                            <label className="block text-xs font-medium text-gray-500 uppercase">Weight</label>
                                            <p className="text-sm font-medium text-gray-900">{patientData.vitals?.weight || "--:--"}</p>
                                        </div>

                                        <div>
                                            <label className="block text-xs font-medium text-gray-500 uppercase">Height</label>
                                            <p className="text-sm font-medium text-gray-900">{patientData.vitals?.height || "--:--"}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Medical History & Allergies */}
                                {/* <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
                                    <h3 className="text-lg font-bold text-gray-900 mb-4 sm:mb-6">Medical History & Allergies</h3>

                                    <div className="space-y-3 sm:space-y-4">
                                        <div>
                                            <label className="block text-xs font-medium text-gray-500 uppercase mb-2">Allergies</label>
                                            <div className="flex flex-wrap gap-2">
                                                {patientData.allergies.map((allergy, index) => (
                                                    <span
                                                        key={index}
                                                        className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800"
                                                    >
                                                        <svg className="w-3 h-3 mr-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                                            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                                        </svg>
                                                        {allergy}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-xs font-medium text-gray-500 uppercase mb-2">Medical History</label>
                                            <div className="space-y-2">
                                                {patientData.medicalHistory.map((condition, index) => (
                                                    <div key={index} className="flex items-start space-x-2">
                                                        <svg className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                        </svg>
                                                        <span className="text-sm text-gray-900">{condition}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div> */}
                            </div>
                        </div>
                    ) : activeTab === 'Medical Record' ? (
                        <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 ">
                            {miniloading ? <div className="flex-1  rounded-lg   bg-red-500 h-[400px]">
                                <Loader message="Loading medical records..." />
                            </div> : <>

                                {/* Treatment Records */}
                                <div className="flex-1 bg-white rounded-lg shadow-sm p-4 sm:p-6">
                                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-10 space-y-2 sm:space-y-0">
                                        <div className="flex items-center space-x-2">
                                            <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded flex-shrink-0">22</span>
                                            <h3 className="text-base sm:text-lg font-medium text-gray-900 truncate">Maxillary Left Lateral Incisor</h3>
                                        </div>
                                    </div>

                                    <div className="space-y-4 sm:space-y-6">
                                        {records.slice(0, 7).map((record, index) => (
                                            <div
                                                key={index}
                                                className="border-l-4 border-grey-200 pl-3 sm:pl-4 relative mb-9 cursor-pointer hover:bg-gray-50 transition-colors rounded-lg p-3"
                                                onClick={() => navigate(`/dashboard/record/view-record/${record.recordId}/${record.patient}`)}
                                            >
                                                {/* Timeline dot */}
                                                <div className="absolute -left-2 w-4 h-4 bg-gray-400 rounded-full"></div>

                                                <div className="space-y-3 sm:space-y-0">
                                                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between sm:space-x-4">
                                                        <div className="flex-1">
                                                            <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-3 mb-3">
                                                                <div className="text-center sm:text-left bg-gray-50 sm:bg-transparent p-2 sm:p-0 rounded sm:rounded-none">
                                                                    <div className="text-xs font-medium text-gray-500">{Month(record.created_at)}</div>
                                                                    <div className="text-lg font-bold text-gray-900">{Day(record.created_at)}</div>
                                                                </div>
                                                                <div className="flex-1 min-w-0">
                                                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 text-sm">
                                                                        <div>
                                                                            <div className="text-xs text-gray-500 uppercase">Type</div>
                                                                            <div className="font-medium truncate">{record.type}</div>
                                                                        </div>
                                                                        <div>
                                                                            <div className="text-xs text-gray-500 uppercase">Provider</div>
                                                                            <div className="font-medium truncate">{record.data.provider.name}</div>
                                                                        </div>
                                                                        <div>
                                                                            <div className="text-xs text-gray-500 uppercase">Prescription</div>
                                                                            <div className="font-medium truncate">{record.data.data.prescribedMedications ? record.data.data.prescribedMedications.length : '--:--'}</div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            {/* Status and Reason */}
                                                            {record.data.data.reasonForVisit && (
                                                                <div className="text-sm text-gray-600 mb-2">
                                                                    Reason: {record.data.data.reasonForVisit}
                                                                </div>
                                                            )}

                                                            {/* Notes */}
                                                            {record.data.data.recommendedTests && <>
                                                                <div className="text-sm text-gray-600 mb-2 mt-5">
                                                                    Recommended Tests:
                                                                </div>
                                                                <div className="flex flex-wrap gap-2 mb-3 sm:mb-0">
                                                                    {record.data.data.recommendedTests.map((note, index) => (
                                                                        <span
                                                                            key={index}
                                                                            className="inline-flex items-center px-2 py-1 rounded text-xs bg-gray-100 text-gray-700"
                                                                        >
                                                                            <svg className="w-3 h-3 mr-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                                                                <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                                                                            </svg>
                                                                            {note}
                                                                        </span>
                                                                    ))}
                                                                </div>
                                                            </>}
                                                        </div>

                                                        {/* Click indicator */}
                                                        <div className="flex items-center text-gray-400 hover:text-gray-600">
                                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                            </svg>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>


                                {/* Medical Records Log */}
                                <div className="w-full lg:w-96 flex-shrink-0">
                                    <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 sticky top-4 z-10">
                                        <div className="flex items-center justify-between mb-4 sm:mb-6">
                                            <h3 className="text-lg font-bold text-gray-900">Medical Records Log</h3>
                                            <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                                                {medicalLogs.length} entries
                                            </span>
                                        </div>

                                        {/* Create Record Button */}
                                        <div className="mb-6">
                                            <button
                                                onClick={() => setShowMedicalRecordModal(true)}
                                                className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
                                            >
                                                <BiPlusCircle size={30} />
                                                <span className="font-medium">Create Medical Record</span>
                                            </button>
                                        </div>

                                        <div className="space-y-4 max-h-150 overflow-y-auto">
                                            {medicalLogs.slice(0, 4).map((log) => (
                                                <div key={log.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                                                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between space-y-2 sm:space-y-0">
                                                        <div className="flex-1">
                                                            <div className="flex items-start space-x-3">
                                                                <div className="flex-shrink-0">
                                                                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                                                                </div>
                                                                <div className="min-w-0 flex-1">
                                                                    <div className="flex items-center space-x-2 mb-1">
                                                                        <h4 className="text-sm font-medium text-gray-900">{log.action}</h4>
                                                                        <span className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">
                                                                            Tooth #{log.toothNumber}
                                                                        </span>
                                                                    </div>
                                                                    <p className="text-sm text-gray-600 mb-2">{log.recordType}</p>
                                                                    <p className="text-xs text-gray-500">{log.details}</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="text-right flex-shrink-0">
                                                            <div className="text-sm font-medium text-gray-900">{log.createdBy}</div>
                                                            <div className="text-xs text-gray-500">{log.date}</div>
                                                            <div className="text-xs text-blue-600">{log.time}</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>

                                        {/* Summary Stats */}
                                        <div className="mt-6 pt-4 border-t border-gray-200">
                                            <div className="grid grid-cols-3 gap-4 text-center">
                                                <div>
                                                    <div className="text-lg font-bold text-gray-900">
                                                        {medicalLogs.filter(log => log.action.includes('Created')).length}
                                                    </div>
                                                    <div className="text-xs text-gray-500">Records Created</div>
                                                </div>
                                                <div>
                                                    <div className="text-lg font-bold text-gray-900">
                                                        {medicalLogs.filter(log => log.action.includes('Completed')).length}
                                                    </div>
                                                    <div className="text-xs text-gray-500">Treatments Completed</div>
                                                </div>
                                                <div>
                                                    <div className="text-lg font-bold text-gray-900">
                                                        {new Set(medicalLogs.map(log => log.createdBy)).size}
                                                    </div>
                                                    <div className="text-xs text-gray-500">Healthcare Providers</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </>}

                        </div>
                    ) : activeTab === 'Appointment History' ? (
                        <div className="flex flex-col lg:flex-row gap-4 sm:gap-6">

                            {miniloading ? <div className="flex-1  rounded-lg  bg-red-500 h-[400px]">
                                <Loader message="Loading appointment history..." />
                            </div> : <>
                                <div className="flex-1 space-y-6">

                                    {/* Appointment Timeline */}
                                    <div className="bg-white rounded-lg shadow-sm p-6">
                                        <div className="flex items-center justify-between mb-6">
                                            <h3 className="text-lg font-bold text-gray-900">Appointment History</h3>
                                            <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                                                {appointmentHistory.length} appointments
                                            </span>
                                        </div>

                                        <div className="space-y-6">
                                            {appointments.map((appointment, index) => (
                                                <div key={appointment.id} className="relative">
                                                    {/* Timeline line */}
                                                    {index !== appointmentHistory.length - 1 && (
                                                        <div className="absolute left-4 top-10 w-0.5 h-16 bg-gray-200"></div>
                                                    )}

                                                    <div className="flex items-start space-x-4">
                                                        {/* Status indicator */}
                                                        <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${appointment.status === 'Completed' ? 'bg-green-100' :
                                                            appointment.data.status === 'Cancelled' ? 'bg-red-100' :
                                                                appointment.status === 'No Show' ? 'bg-orange-100' : 'bg-gray-100'
                                                            }`}>
                                                            {appointment.data.status === 'Completed' ? (
                                                                <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                                                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                                </svg>
                                                            ) : appointment.data.status === 'Cancelled' ? (
                                                                <svg className="w-4 h-4 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                                                                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                                                </svg>
                                                            ) : (
                                                                <svg className="w-4 h-4 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
                                                                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                                                </svg>
                                                            )}
                                                        </div>

                                                        {/* Appointment details */}
                                                        <div className="flex-1 bg-gray-50 rounded-lg p-4">
                                                            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between space-y-3 sm:space-y-0">
                                                                <div className="flex-1">
                                                                    <div className="flex items-center space-x-3 mb-2">
                                                                        <h4 className="text-lg font-medium text-gray-900">{appointment.type}</h4>
                                                                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${appointment.data.status === 'Completed' ? 'bg-green-100 text-green-800' :
                                                                            appointment.data.status === 'Cancelled' ? 'bg-red-100 text-red-800' :
                                                                                appointment.data.status === 'No Show' ? 'bg-orange-100 text-orange-800' : 'bg-gray-100 text-gray-800'
                                                                            }`}>
                                                                            {appointment.data.status}
                                                                        </span>
                                                                    </div>

                                                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-gray-600 mb-3">
                                                                        <div className="flex items-center space-x-2">
                                                                            <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                                                                <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                                                                            </svg>
                                                                            <span>{appointment.data.date}</span>
                                                                        </div>
                                                                        <div className="flex items-center space-x-2">
                                                                            <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                                                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                                                                            </svg>
                                                                            <span>{appointment.data.time} ({appointment.data.duration})</span>
                                                                        </div>
                                                                    </div>

                                                                    <div className="flex items-center space-x-2 text-sm text-gray-600 mb-3">
                                                                        <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                                                            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                                                                        </svg>
                                                                        <span>{appointment.data.doctor}</span>
                                                                    </div>

                                                                    {appointment.data.treatmentPlan.length > 0 && (
                                                                        <div className="mb-3">
                                                                            <p className="text-xs font-medium text-gray-500 uppercase mb-2">{appointment.data.status === "Completed" ? "Treatments Provided" : "Treatment Planned"}</p>
                                                                            <div className="flex flex-wrap gap-1">
                                                                                {appointment.data.treatmentPlan.map((treatment, idx) => (
                                                                                    <span key={idx} className="inline-flex items-center px-2 py-1 rounded text-xs bg-blue-100 text-blue-800">
                                                                                        {treatment}
                                                                                    </span>
                                                                                ))}
                                                                            </div>
                                                                        </div>
                                                                    )}

                                                                    <p className="text-sm text-gray-600 italic">{appointment.data.notes}</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Appointment Activity Log */}
                                <div className="w-full lg:w-96 flex-shrink-0">
                                    <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 sticky top-4 z-10">
                                        <div className="flex items-center justify-between mb-4 sm:mb-6">
                                            <h3 className="text-lg font-bold text-gray-900">Appointment Activity Log</h3>
                                            <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                                                {appointmentLogs.length} entries
                                            </span>
                                        </div>

                                        <div className="space-y-4 max-h-150 overflow-y-auto">
                                            {appointmentLogs.slice(0, 4).map((log) => (
                                                <div key={log.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                                                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between space-y-2 sm:space-y-0">
                                                        <div className="flex-1">
                                                            <div className="flex items-start space-x-3">
                                                                <div className="flex-shrink-0">
                                                                    <div className={`w-2 h-2 rounded-full mt-2 ${log.action.includes('completed') ? 'bg-green-600' :
                                                                        log.action.includes('cancelled') ? 'bg-red-600' :
                                                                            log.action.includes('No show') ? 'bg-orange-600' :
                                                                                log.action.includes('Emergency') ? 'bg-purple-600' : 'bg-blue-600'
                                                                        }`}></div>
                                                                </div>
                                                                <div className="min-w-0 flex-1">
                                                                    <div className="flex items-center space-x-2 mb-1">
                                                                        <h4 className="text-sm font-medium text-gray-900">{log.action}</h4>
                                                                        <span className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">
                                                                            {log.appointmentType}
                                                                        </span>
                                                                    </div>
                                                                    <p className="text-xs text-gray-500">{log.details}</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="text-right flex-shrink-0">
                                                            <div className="text-sm font-medium text-gray-900">{log.createdBy}</div>
                                                            <div className="text-xs text-gray-500">{log.date}</div>
                                                            <div className="text-xs text-blue-600">{log.time}</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>

                                        {/* Summary Stats */}
                                        <div className="mt-6 pt-4 border-t border-gray-200">
                                            <div className="grid grid-cols-2 gap-4 text-center">
                                                <div>
                                                    <div className="text-lg font-bold text-gray-900">
                                                        {appointmentLogs.filter(log => log.action.includes('scheduled')).length}
                                                    </div>
                                                    <div className="text-xs text-gray-500">Scheduled</div>
                                                </div>
                                                <div>
                                                    <div className="text-lg font-bold text-gray-900">
                                                        {appointmentLogs.filter(log => log.action.includes('completed')).length}
                                                    </div>
                                                    <div className="text-xs text-gray-500">Completed</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </>}
                        </div>
                    ) : activeTab === 'Next Appointment' ? (
                        <div className="flex flex-col lg:flex-row gap-4 sm:gap-6">
                            {miniloading ? <div className="flex-1  rounded-lg   bg-red-500 h-[400px]">
                                <Loader message="Loading next appointment..." />
                            </div> : <>
                                <div className="flex-1">
                                    {/* Next Appointment Cards */}
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between">
                                            <h3 className="text-lg font-bold text-gray-900">Upcoming Appointments</h3>
                                        </div>

                                        {appointments.filter(apt => apt.data.status != 'Completed').map((appointment) => (
                                            <div key={appointment.id} className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
                                                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between space-y-4 lg:space-y-0">
                                                    <div className="flex-1">
                                                        <div className="flex items-center space-x-3 mb-3">
                                                            <h4 className="text-xl font-medium text-gray-900">{appointment.type}</h4>
                                                            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${appointment.data.status === 'Confirmed' ? 'bg-green-100 text-green-800' :
                                                                appointment.data.status === 'Pending Confirmation' ? 'bg-yellow-100 text-yellow-800' :
                                                                    appointment.data.status === 'Tentative' ? 'bg-orange-100 text-orange-800' : 'bg-gray-100 text-gray-800'
                                                                }`}>
                                                                {appointment.data.status}
                                                            </span>
                                                            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${appointment.data.priority === 'High' ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'
                                                                }`}>
                                                                {appointment.data.priority} Priority
                                                            </span>
                                                        </div>

                                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600 mb-4">
                                                            <div className="flex items-center space-x-2">
                                                                <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                                                    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                                                                </svg>
                                                                <span className="font-medium">{appointment.data.date}</span>
                                                            </div>
                                                            <div className="flex items-center space-x-2">
                                                                <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                                                                </svg>
                                                                <span>{appointment.data.time} ({appointment.data.duration})</span>
                                                            </div>
                                                            <div className="flex items-center space-x-2">
                                                                <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                                                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                                                                </svg>
                                                                <span>{appointment.data.doctor}</span>
                                                            </div>
                                                        </div>

                                                        <p className="text-sm text-gray-600 mb-4">{appointment.data.notes}</p>

                                                        <div className="mb-4">
                                                            <p className="text-xs font-medium text-gray-500 uppercase mb-2">Treatment Plan</p>
                                                            <div className="flex flex-wrap gap-2">
                                                                {appointment.data.treatmentPlan.map((treatment, idx) => (
                                                                    <span key={idx} className="inline-flex items-center px-2 py-1 rounded text-xs bg-blue-100 text-blue-800">
                                                                        {treatment}
                                                                    </span>
                                                                ))}
                                                            </div>
                                                        </div>

                                                        <div className="flex items-center space-x-4 text-xs text-gray-500">
                                                            <div className="flex items-center space-x-1">
                                                                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                                                                </svg>
                                                                <span>Reminder: {appointment.data.reminders.sent ? `Sent ${appointment.data.reminders.lastSent} via ${appointment.data.reminders.method}` : 'Pending'}</span>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="flex space-x-2">
                                                        <button
                                                            onClick={() => handleOpenRescheduleModal(appointment)}
                                                            className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700"
                                                        >
                                                            Reschedule
                                                        </button>
                                                        <button className="bg-gray-100 text-gray-700 px-3 py-1 rounded text-sm hover:bg-gray-200">
                                                            Cancel
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Appointment Summary Cards */}
                                <div className="w-full lg:w-80 flex-shrink-0">
                                    <div className="space-y-4 sticky top-4">
                                        <div className="bg-white rounded-lg shadow-sm p-4">
                                            <div className="flex items-center">
                                                <div className="flex-shrink-0">
                                                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                                        <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                                                            <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                                                        </svg>
                                                    </div>
                                                </div>
                                                <div className="ml-4">
                                                    <p className="text-sm font-medium text-gray-500">Upcoming</p>
                                                    <p className="text-2xl font-bold text-gray-900">
                                                        {appointments.filter(apt => apt.data.status != 'Completed').length}
                                                    </p>
                                                    <p className="text-xs text-gray-400 mt-1">Total appointments scheduled</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="bg-white rounded-lg shadow-sm p-4">
                                            <div className="flex items-center">
                                                <div className="flex-shrink-0">
                                                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                                                        <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                        </svg>
                                                    </div>
                                                </div>
                                                <div className="ml-4">
                                                    <p className="text-sm font-medium text-gray-500">Confirmed</p>
                                                    <p className="text-2xl font-bold text-gray-900">
                                                        {appointments.filter(apt => apt.status === 'Confirmed').length}
                                                    </p>
                                                    <p className="text-xs text-gray-400 mt-1">Patient confirmations received</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="bg-white rounded-lg shadow-sm p-4">
                                            <div className="flex items-center">
                                                <div className="flex-shrink-0">
                                                    <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                                                        <svg className="w-6 h-6 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                                                            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                                        </svg>
                                                    </div>
                                                </div>
                                                <div className="ml-4">
                                                    <p className="text-sm font-medium text-gray-500">High Priority</p>
                                                    <p className="text-2xl font-bold text-gray-900">
                                                        {appointments.filter(apt => apt.data.priority === 'High').length}
                                                    </p>
                                                    <p className="text-xs text-gray-400 mt-1">Urgent care appointments</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="bg-white rounded-lg shadow-sm p-4">
                                            <div className="flex items-center">
                                                <div className="flex-shrink-0">
                                                    <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                                                        <svg className="w-6 h-6 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
                                                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                                                        </svg>
                                                    </div>
                                                </div>
                                                <div className="ml-4">
                                                    <p className="text-sm font-medium text-gray-500">Pending</p>
                                                    <p className="text-2xl font-bold text-gray-900">
                                                        {appointments.filter(apt => apt.data.status === 'Pending' || apt.status === 'Tentative').length}
                                                    </p>
                                                    <p className="text-xs text-gray-400 mt-1">Awaiting confirmation</p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Schedule New Button */}
                                        <div className="bg-white rounded-lg shadow-sm p-4">
                                            <button
                                                onClick={() => setShowAppointmentModal(true)}
                                                className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
                                            >
                                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                                                </svg>
                                                <span className="font-medium">Schedule New Appointment</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </>}
                        </div>
                    ) : (
                        <div className="bg-white rounded-lg shadow-sm p-6">
                            <div className="text-center py-12">
                                <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                </svg>
                                <h3 className="mt-2 text-sm font-medium text-gray-900">Coming Soon</h3>
                                <p className="mt-1 text-sm text-gray-500">This section is under development.</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Appointment Modal */}
            {showAppointmentModal && (
                <div className="fixed inset-0 flex items-center justify-center z-50 p-4" style={{
                    backgroundColor: 'rgba(0, 0, 0, 0.5)'
                }} >
                    <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="p-6">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-2xl font-bold text-gray-900">Schedule New Appointment</h2>
                                <button
                                    onClick={() => setShowAppointmentModal(false)}
                                    className="text-gray-400 hover:text-gray-600 transition-colors"
                                >
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>

                            <form onSubmit={handleSubmitAppointment} className="space-y-6">
                                {/* Patient Info */}
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <h3 className="font-medium text-gray-900 mb-2">Patient Information</h3>
                                    <div className="flex items-center space-x-3">
                                        <img
                                            src={patientData.avatar}
                                            alt={patientData.name}
                                            className="w-10 h-10 rounded-full"
                                        />
                                        <div>
                                            <p className="font-medium text-gray-900">{patientData.name}</p>
                                            <p className="text-sm text-gray-500">ID: {patientData.id}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Basic Information */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Date <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="date"
                                            value={appointmentForm.date}
                                            onChange={(e) => handleFormChange('date', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Time <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="time"
                                            value={appointmentForm.time}
                                            onChange={(e) => handleFormChange('time', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Duration</label>
                                        <select
                                            value={appointmentForm.duration}
                                            onChange={(e) => handleFormChange('duration', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        >
                                            <option value="15 min">15 minutes</option>
                                            <option value="30 min">30 minutes</option>
                                            <option value="45 min">45 minutes</option>
                                            <option value="60 min">1 hour</option>
                                            <option value="90 min">1.5 hours</option>
                                            <option value="120 min">2 hours</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Doctor <span className="text-red-500">*</span>
                                        </label>
                                        <select
                                            value={appointmentForm.doctor}
                                            onChange={(e) => handleFormChange('doctor', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            required
                                        >
                                            <option value="">Select a doctor</option>
                                            {doctors.map((doctor, index) => (
                                                <option key={index} value={doctor}>{doctor}</option>
                                            ))}
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Appointment Type</label>
                                        <select
                                            value={appointmentForm.type}
                                            onChange={(e) => handleFormChange('type', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        >
                                            {appointmentTypes.map((type, index) => (
                                                <option key={index} value={type}>{type}</option>
                                            ))}
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
                                        <select
                                            value={appointmentForm.priority}
                                            onChange={(e) => handleFormChange('priority', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        >
                                            <option value="Normal">Normal</option>
                                            <option value="High">High</option>
                                            <option value="Urgent">Urgent</option>
                                        </select>
                                    </div>
                                </div>

                                {/* Treatment Plan */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Treatment Plan</label>
                                    <div className="border border-gray-300 rounded-lg p-3 max-h-32 overflow-y-auto">
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                            {treatmentOptions.map((treatment, index) => (
                                                <label key={index} className="flex items-center space-x-2">
                                                    <input
                                                        type="checkbox"
                                                        checked={appointmentForm.treatmentPlan.includes(treatment)}
                                                        onChange={(e) => {
                                                            if (e.target.checked) {
                                                                handleTreatmentPlanChange([...appointmentForm.treatmentPlan, treatment]);
                                                            } else {
                                                                handleTreatmentPlanChange(appointmentForm.treatmentPlan.filter(t => t !== treatment));
                                                            }
                                                        }}
                                                        className="text-blue-600 focus:ring-blue-500"
                                                    />
                                                    <span className="text-sm text-gray-700">{treatment}</span>
                                                </label>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Notes */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Notes</label>
                                    <textarea
                                        value={appointmentForm.notes}
                                        onChange={(e) => handleFormChange('notes', e.target.value)}
                                        rows={3}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="Additional notes or special instructions..."
                                    />
                                </div>

                                {/* Reminder Settings */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Reminder Method</label>
                                    <select
                                        value={appointmentForm.reminderMethod}
                                        onChange={(e) => handleFormChange('reminderMethod', e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    >
                                        <option value="SMS & Email">SMS & Email</option>
                                        <option value="SMS">SMS Only</option>
                                        <option value="Email">Email Only</option>
                                        <option value="Phone Call">Phone Call</option>
                                        <option value="None">No Reminder</option>
                                    </select>
                                </div>

                                {/* Form Actions */}
                                <div className="flex space-x-4 pt-6 border-t border-gray-200">
                                    <button
                                        type="button"
                                        onClick={() => setShowAppointmentModal(false)}
                                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={appointmentLoading}
                                        className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {appointmentLoading ? 'Scheduling...' : 'Schedule Appointment'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}

            {/* Reschedule Modal */}
            {showRescheduleModal && selectedAppointmentToReschedule && (
                <div className="fixed inset-0 flex items-center justify-center z-50 p-4" style={{
                    backgroundColor: 'rgba(0, 0, 0, 0.5)'
                }}>
                    <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
                        <div className="p-6">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-xl font-bold text-gray-900">Reschedule Appointment</h2>
                                <button
                                    onClick={() => setShowRescheduleModal(false)}
                                    className="text-gray-400 hover:text-gray-600 transition-colors"
                                >
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>

                            {/* Current Appointment Info */}
                            <div className="bg-gray-50 p-4 rounded-lg mb-6">
                                <h3 className="font-medium text-gray-900 mb-2">Current Appointment</h3>
                                <div className="space-y-1 text-sm text-gray-600">
                                    <p><span className="font-medium">Type:</span> {selectedAppointmentToReschedule.data.type}</p>
                                    <p><span className="font-medium">Date:</span> {selectedAppointmentToReschedule.data.date}</p>
                                    <p><span className="font-medium">Time:</span> {selectedAppointmentToReschedule.data.time}</p>
                                    <p><span className="font-medium">Doctor:</span> {selectedAppointmentToReschedule.data.doctor}</p>
                                    <p><span className="font-medium">Duration:</span> {selectedAppointmentToReschedule.data.duration}</p>
                                </div>
                            </div>

                            <form onSubmit={handleSubmitReschedule} className="space-y-4">
                                {/* New Date */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        New Date <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="date"
                                        value={rescheduleForm.date}
                                        onChange={(e) => handleRescheduleFormChange('date', e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        required
                                    />
                                </div>

                                {/* New Time */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        New Time <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="time"
                                        value={rescheduleForm.time}
                                        onChange={(e) => handleRescheduleFormChange('time', e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        required
                                    />
                                </div>

                                {/* Doctor */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Doctor <span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        value={rescheduleForm.doctor}
                                        onChange={(e) => handleRescheduleFormChange('doctor', e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        required
                                    >
                                        <option value="">Select a doctor</option>
                                        {doctors.map((doctor, index) => (
                                            <option key={index} value={doctor}>{doctor}</option>
                                        ))}
                                    </select>
                                </div>

                                {/* Appointment Type */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Appointment Type <span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        value={rescheduleForm.type}
                                        onChange={(e) => handleRescheduleFormChange('type', e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        required
                                    >
                                        <option value="">Select appointment type</option>
                                        {appointmentTypes.map((type, index) => (
                                            <option key={index} value={type}>{type}</option>
                                        ))}
                                    </select>
                                </div>

                                {/* Reason (Optional) */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Reason for Changes (Optional)
                                    </label>
                                    <textarea
                                        value={rescheduleForm.reason}
                                        onChange={(e) => handleRescheduleFormChange('reason', e.target.value)}
                                        rows={3}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="Enter reason for changing appointment details..."
                                    />
                                </div>

                                {/* Form Actions */}
                                <div className="flex space-x-3 pt-4">
                                    <button
                                        type="button"
                                        onClick={() => setShowRescheduleModal(false)}
                                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={appointmentLoading}
                                        className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {appointmentLoading ? 'Rescheduling...' : 'Reschedule'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}

            {/* Medical Record Modal */}
            {showMedicalRecordModal && (
                <div className="fixed inset-0 flex items-center justify-center z-50 p-4" style={{
                    backgroundColor: 'rgba(0, 0, 0, 0.5)'
                }}>
                    <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="p-6">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-2xl font-bold text-gray-900">Create Medical Record</h2>
                                <button
                                    onClick={() => setShowMedicalRecordModal(false)}
                                    className="text-gray-400 hover:text-gray-600 transition-colors"
                                >
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>

                            <form onSubmit={handleSubmitMedicalRecord} className="space-y-6">
                                {/* Patient Info */}
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <h3 className="font-medium text-gray-900 mb-2">Patient Information</h3>
                                    <div className="flex items-center space-x-3">
                                        <img
                                            src={patientData.avatar}
                                            alt={patientData.name}
                                            className="w-10 h-10 rounded-full"
                                        />
                                        <div>
                                            <p className="font-medium text-gray-900">{patientData.name}</p>
                                            <p className="text-sm text-gray-500">ID: {patientData.id}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Record Type and Provider Information */}
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Record Type <span className="text-red-500">*</span>
                                        </label>
                                        <select
                                            value={medicalRecordForm.recordType}
                                            onChange={(e) => handleMedicalRecordFormChange('recordType', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            required
                                        >
                                            {recordTypes.map((type, index) => (
                                                <option key={index} value={type}>{type}</option>
                                            ))}
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Provider Name
                                        </label>
                                        <input
                                            type="text"
                                            value={medicalRecordForm.provider.name}
                                            onChange={(e) => handleMedicalRecordFormChange('provider.name', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            placeholder="e.g., Lifeline Clinic"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Provider NPRN
                                        </label>
                                        <input
                                            type="text"
                                            value={medicalRecordForm.provider.nprn}
                                            onChange={(e) => handleMedicalRecordFormChange('provider.nprn', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            placeholder="e.g., NPRN-00923"
                                        />
                                    </div>
                                </div>

                                {/* Medical Information */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Reason for Visit <span className="text-red-500">*</span>
                                        </label>
                                        <textarea
                                            value={medicalRecordForm.data.reasonForVisit}
                                            onChange={(e) => handleMedicalRecordFormChange('data.reasonForVisit', e.target.value)}
                                            rows={3}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            placeholder="e.g., Chest pain and shortness of breath"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Diagnosis
                                        </label>
                                        <textarea
                                            value={medicalRecordForm.data.diagnosis}
                                            onChange={(e) => handleMedicalRecordFormChange('data.diagnosis', e.target.value)}
                                            rows={3}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            placeholder="e.g., Type 2 Diabetes"
                                        />
                                    </div>
                                </div>

                                {/* Prescribed Medications */}
                                <div>
                                    <div className="flex items-center justify-between mb-4">
                                        <label className="block text-sm font-medium text-gray-700">
                                            Prescribed Medications
                                        </label>
                                        <button
                                            type="button"
                                            onClick={addMedication}
                                            className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition-colors"
                                        >
                                            Add Medication
                                        </button>
                                    </div>

                                    <div className="space-y-4">
                                        {medicalRecordForm.data.prescribedMedications.map((medication, index) => (
                                            <div key={index} className="border border-gray-200 rounded-lg p-4">
                                                <div className="flex items-center justify-between mb-3">
                                                    <h4 className="text-sm font-medium text-gray-900">Medication {index + 1}</h4>
                                                    {medicalRecordForm.data.prescribedMedications.length > 1 && (
                                                        <button
                                                            type="button"
                                                            onClick={() => removeMedication(index)}
                                                            className="text-red-600 hover:text-red-800 text-sm"
                                                        >
                                                            Remove
                                                        </button>
                                                    )}
                                                </div>
                                                <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                                                    <div>
                                                        <label className="block text-xs font-medium text-gray-500 uppercase mb-1">Name</label>
                                                        <input
                                                            type="text"
                                                            value={medication.name}
                                                            onChange={(e) => handleMedicationChange(index, 'name', e.target.value)}
                                                            className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                            placeholder="e.g., Amlodipine"
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="block text-xs font-medium text-gray-500 uppercase mb-1">Dosage</label>
                                                        <input
                                                            type="text"
                                                            value={medication.dosage}
                                                            onChange={(e) => handleMedicationChange(index, 'dosage', e.target.value)}
                                                            className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                            placeholder="e.g., 5mg"
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="block text-xs font-medium text-gray-500 uppercase mb-1">Frequency</label>
                                                        <input
                                                            type="text"
                                                            value={medication.frequency}
                                                            onChange={(e) => handleMedicationChange(index, 'frequency', e.target.value)}
                                                            className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                            placeholder="e.g., Once daily"
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="block text-xs font-medium text-gray-500 uppercase mb-1">Duration</label>
                                                        <input
                                                            type="text"
                                                            value={medication.duration}
                                                            onChange={(e) => handleMedicationChange(index, 'duration', e.target.value)}
                                                            className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                            placeholder="e.g., 30 days"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Recommended Tests */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Recommended Tests</label>
                                    <div className="border border-gray-300 rounded-lg p-3 max-h-32 overflow-y-auto">
                                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                                            {availableTests.map((test, index) => (
                                                <label key={index} className="flex items-center space-x-2">
                                                    <input
                                                        type="checkbox"
                                                        checked={medicalRecordForm.data.recommendedTests.includes(test)}
                                                        onChange={(e) => {
                                                            if (e.target.checked) {
                                                                handleRecommendedTestsChange([...medicalRecordForm.data.recommendedTests, test]);
                                                            } else {
                                                                handleRecommendedTestsChange(medicalRecordForm.data.recommendedTests.filter(t => t !== test));
                                                            }
                                                        }}
                                                        className="text-blue-600 focus:ring-blue-500"
                                                    />
                                                    <span className="text-sm text-gray-700">{test}</span>
                                                </label>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Notes */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Clinical Notes</label>
                                    <textarea
                                        value={medicalRecordForm.data.notes}
                                        onChange={(e) => handleMedicalRecordFormChange('data.notes', e.target.value)}
                                        rows={4}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="Patient advised to reduce salt intake, avoid stress, and return for follow-up in 2 weeks..."
                                    />
                                </div>

                                {/* Form Actions */}
                                <div className="flex space-x-4 pt-6 border-t border-gray-200">
                                    <button
                                        type="button"
                                        onClick={() => setShowMedicalRecordModal(false)}
                                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                                    >
                                        Create Medical Record
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PatientRecords;
