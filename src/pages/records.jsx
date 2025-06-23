import React, { useState } from 'react';
import { BsSearch, BsBell, BsChevronDown, BsPlus } from "react-icons/bs";
import { IoSettingsOutline } from "react-icons/io5";
import { BiDotsVerticalRounded, BiPlusCircle } from "react-icons/bi";
import DashNav from '../components/DashNav';

const PatientRecords = () => {
    const [activeTab, setActiveTab] = useState('Patient Information');
    const [activeService, setActiveService] = useState('Medical');

    // Sample patient data
    const patientData = {
        name: "Willie Jennie",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
        condition: "Have unevent jawline",
        // Extended patient information
        id: "#WJ2024001",
        age: 28,
        gender: "Male",
        dateOfBirth: "March 15, 1996",
        phone: "+234 808 123 4567",
        email: "willie.jennie@email.com",
        address: "123 Victoria Island, Lagos, Nigeria",
        bloodType: "O+",
        emergencyContact: {
            name: "Sarah Jennie",
            relationship: "Sister",
            phone: "+234 807 987 6543"
        },
        insurance: {
            provider: "Lagos State Health Insurance",
            policyNumber: "LSHIS/2024/001234",
            validUntil: "December 31, 2024"
        },
        allergies: ["Penicillin", "Latex"],
        medicalHistory: [
            "Hypertension (controlled)",
            "Previous dental surgery (2022)"
        ],
        vitals: {
            bloodPressure: "120/80",
            heartRate: "72 bpm",
            weight: "75 kg",
            height: "178 cm"
        },
        registrationDate: "January 15, 2024",
        lastVisit: "April 12, 2024"
    };

    // Sample treatment data
    const treatments = [
        {
            id: 1,
            toothNumber: 3,
            toothName: "Maxillary Right First Molar",
            date: "21",
            month: "JAN",
            condition: "Fractured",
            treatment: "Crown Placement",
            dentist: "Dr. Ada Wong",
            status: "Completed",
            reason: "N/A",
            notes: ["Permanent crown seated and cemented.", "Patient reports no discomfort."]
        },
        {
            id: 2,
            toothNumber: 10,
            toothName: "Maxillary Left Lateral Incisor",
            date: "12",
            month: "APR",
            condition: "Caries",
            treatment: "Tooth filling",
            dentist: "Dr. Soap Mactavish",
            status: "Pending",
            reason: "Not enough time",
            notes: ["Deep decay identified in pulp via x-ray."]
        },
        {
            id: 3,
            toothNumber: 17,
            toothName: "Mandibular Left Third Molar",
            date: "05",
            month: "MAY",
            condition: "Impacted",
            treatment: "Extraction",
            dentist: "Dr. John Price",
            status: "Referred",
            reason: "Requires oral surgeon",
            notes: ["Patient referred to Dr. H. 'Hank' McCoy for surgical extraction."]
        },
        {
            id: 4,
            toothNumber: 30,
            toothName: "Mandibular Right First Molar",
            date: "18",
            month: "JUN",
            condition: "Abscess",
            treatment: "Root Canal Therapy",
            dentist: "Dr. Lara Croft",
            status: "In Progress",
            reason: "Awaiting second appointment",
            notes: ["Initial pulpectomy performed, temporary filling placed."]
        },
        {
            id: 5,
            toothNumber: 8,
            toothName: "Maxillary Right Central Incisor",
            date: "02",
            month: "JUL",
            condition: "Discoloration",
            treatment: "Veneer",
            dentist: "Dr. Ada Wong",
            status: "Completed",
            reason: "N/A",
            notes: ["Porcelain veneer bonded successfully."]
        },
        {
            id: 6,
            toothNumber: 19,
            toothName: "Mandibular Left First Molar",
            date: "29",
            month: "AUG",
            condition: "Caries",
            treatment: "Tooth filling",
            dentist: "Dr. Soap Mactavish",
            status: "Completed",
            reason: "N/A",
            notes: ["Composite filling on occlusal surface."]
        },
        {
            id: 7,
            toothNumber: 25,
            toothName: "Mandibular Right Central Incisor",
            date: "11",
            month: "SEP",
            condition: "Gingivitis",
            treatment: "Deep Cleaning",
            dentist: "Dr. John Price",
            status: "Pending",
            reason: "Patient rescheduled",
            notes: ["Scaling and root planing recommended for lower anterior."]
        },
        {
            id: 8,
            toothNumber: 1,
            toothName: "Maxillary Right Third Molar",
            date: "30",
            month: "OCT",
            condition: "Periodontitis",
            treatment: "Extraction",
            dentist: "Dr. Lara Croft",
            status: "Completed",
            reason: "N/A",
            notes: ["Tooth extracted due to severe bone loss."]
        },
        {
            id: 9,
            toothNumber: 14,
            toothName: "Maxillary Left First Molar",
            date: "07",
            month: "NOV",
            condition: "Caries",
            treatment: "Root Canal Therapy",
            dentist: "Dr. Gordon Freeman",
            status: "In Progress",
            reason: "Awaiting insurance approval",
            notes: ["Extensive decay reaching the nerve. Pre-authorization sent to insurer."]
        },
        {
            id: 10,
            toothNumber: 24,
            toothName: "Mandibular Left Central Incisor",
            date: "19",
            month: "DEC",
            condition: "Minor Chip",
            treatment: "Bonding",
            dentist: "Dr. Ada Wong",
            status: "Completed",
            reason: "N/A",
            notes: ["Cosmetic bonding applied to mesial-incisal edge."]
        },
        {
            id: 11,
            toothNumber: 28,
            toothName: "Mandibular Right Second Premolar",
            date: "22",
            month: "JAN",
            condition: "Caries",
            treatment: "Tooth filling",
            dentist: "Dr. Soap Mactavish",
            status: "Cancelled",
            reason: "Patient did not show",
            notes: ["Follow-up communication required."]
        },
        {
            id: 12,
            toothNumber: 15,
            toothName: "Maxillary Left Second Molar",
            date: "14",
            month: "FEB",
            condition: "Old Filling Failure",
            treatment: "Crown Placement",
            dentist: "Dr. Gordon Freeman",
            status: "Pending",
            reason: "Awaiting lab fabrication",
            notes: ["Old amalgam filling removed, core buildup performed, impression taken for crown."]
        },
        {
            id: 13,
            toothNumber: 6,
            toothName: "Maxillary Right Canine",
            date: "03",
            month: "MAR",
            condition: "Healthy",
            treatment: "Sealant",
            dentist: "Dr. John Price",
            status: "Completed",
            reason: "N/A",
            notes: ["Preventative sealant applied to pits and fissures."]
        },
        {
            id: 14,
            toothNumber: 20,
            toothName: "Mandibular Left Second Premolar",
            date: "09",
            month: "MAR",
            condition: "Sensitivity",
            treatment: "Desensitizing Agent",
            dentist: "Dr. Lara Croft",
            status: "Completed",
            reason: "N/A",
            notes: ["Fluoride varnish applied to address dentin hypersensitivity."]
        },
        {
            id: 15,
            toothNumber: 32,
            toothName: "Mandibular Right Third Molar",
            date: "25",
            month: "MAY",
            condition: "Impacted",
            treatment: "Observation",
            dentist: "Dr. Ada Wong",
            status: "In Progress",
            reason: "Asymptomatic, monitoring",
            notes: ["Wisdom tooth is fully impacted and asymptomatic. Will monitor with yearly x-rays."]
        }
    ];

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

    // Sample next appointments data
    const nextAppointments = [
        {
            id: 1,
            date: "2024-05-15",
            time: "10:30 AM",
            duration: "45 min",
            type: "Regular Checkup",
            doctor: "Dr. Ada Wong",
            status: "Confirmed",
            priority: "Normal",
            notes: "6-month routine checkup and cleaning",
            treatmentPlan: ["Dental cleaning", "X-ray", "Fluoride treatment"],
            reminders: {
                sent: true,
                lastSent: "2024-05-10",
                method: "SMS & Email"
            }
        },
        {
            id: 2,
            date: "2024-05-22",
            time: "2:00 PM", 
            duration: "60 min",
            type: "Crown Placement",
            doctor: "Dr. John Price",
            status: "Confirmed",
            priority: "High",
            notes: "Final crown placement for tooth #14. Lab work completed.",
            treatmentPlan: ["Crown fitting", "Bite adjustment", "Final cementation"],
            reminders: {
                sent: true,
                lastSent: "2024-05-15",
                method: "Phone Call"
            }
        },
        {
            id: 3,
            date: "2024-06-05",
            time: "9:15 AM",
            duration: "30 min",
            type: "Follow-up",
            doctor: "Dr. Soap Mactavish",
            status: "Pending Confirmation",
            priority: "Normal",
            notes: "Check healing progress after root canal therapy",
            treatmentPlan: ["Visual examination", "X-ray if needed", "Pain assessment"],
            reminders: {
                sent: false,
                lastSent: null,
                method: "Pending"
            }
        },
        {
            id: 4,
            date: "2024-06-12",
            time: "11:00 AM",
            duration: "90 min",
            type: "Implant Surgery",
            doctor: "Dr. Lara Croft",
            status: "Confirmed",
            priority: "High",
            notes: "Dental implant placement for tooth #19. Patient has been pre-medicated.",
            treatmentPlan: ["Local anesthesia", "Implant placement", "Suturing", "Post-op instructions"],
            reminders: {
                sent: true,
                lastSent: "2024-05-20",
                method: "Phone Call & Email"
            }
        },
        {
            id: 5,
            date: "2024-07-03",
            time: "3:30 PM",
            duration: "45 min",
            type: "Orthodontic Consultation",
            doctor: "Dr. Gordon Freeman", 
            status: "Tentative",
            priority: "Normal",
            notes: "Initial consultation for potential orthodontic treatment",
            treatmentPlan: ["Clinical examination", "Digital impressions", "Treatment planning"],
            reminders: {
                sent: false,
                lastSent: null,
                method: "Pending"
            }
        }
    ];

    // Sample next appointment logs data
    const nextAppointmentLogs = [
        {
            id: 1,
            action: "Appointment scheduled",
            appointmentType: "Regular Checkup",
            createdBy: "Reception Staff - Mary Johnson",
            date: "2024-05-01",
            time: "2:30 PM",
            details: "6-month checkup scheduled with Dr. Ada Wong for May 15th"
        },
        {
            id: 2,
            action: "Reminder sent",
            appointmentType: "Regular Checkup",
            createdBy: "Automated System",
            date: "2024-05-10",
            time: "9:00 AM",
            details: "SMS and email reminder sent for upcoming appointment"
        },
        {
            id: 3,
            action: "Crown ready notification",
            appointmentType: "Crown Placement",
            createdBy: "Lab Coordinator - Jessica Chen",
            date: "2024-05-18",
            time: "11:15 AM",
            details: "Lab confirmed crown #14 is ready for placement appointment"
        },
        {
            id: 4,
            action: "Follow-up scheduled",
            appointmentType: "Follow-up",
            createdBy: "Dr. Soap Mactavish",
            date: "2024-05-20",
            time: "4:45 PM",
            details: "Post-treatment follow-up scheduled to check healing progress"
        },
        {
            id: 5,
            action: "Pre-surgical clearance",
            appointmentType: "Implant Surgery",
            createdBy: "Dr. Lara Croft",
            date: "2024-05-22",
            time: "1:20 PM",
            details: "Medical clearance obtained for implant surgery procedure"
        },
        {
            id: 6,
            action: "Insurance verification",
            appointmentType: "Implant Surgery",
            createdBy: "Insurance Coordinator - David Kim",
            date: "2024-05-25",
            time: "10:30 AM",
            details: "Insurance pre-authorization approved for implant procedure"
        },
        {
            id: 7,
            action: "Consultation requested",
            appointmentType: "Orthodontic Consultation",
            createdBy: "Patient - Willie Jennie",
            date: "2024-05-28",
            time: "3:15 PM",
            details: "Patient requested orthodontic consultation for alignment issues"
        },
        {
            id: 8,
            action: "Appointment confirmed",
            appointmentType: "Crown Placement",
            createdBy: "Patient - Willie Jennie",
            date: "2024-05-29",
            time: "8:45 AM",
            details: "Patient confirmed attendance for crown placement appointment"
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

    return (
        <div className="flex h-screen bg-gray-50 overflow-hidden">
            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                <div className="flex-1 overflow-y-auto p-4 sm:p-6">
                    {/* Breadcrumb */}
                    <div className="flex items-center space-x-2 text-sm text-gray-500 mb-4 sm:mb-6">
                        <span className="truncate">Patient list</span>
                        <BsChevronDown className="h-3 w-3 rotate-[-90deg] flex-shrink-0" />
                        <span className="text-blue-600 font-medium truncate">Patient detail</span>
                    </div>

                    {/* Patient Header */}
                    <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 mb-4 sm:mb-6">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
                            <div className="flex items-center space-x-3 sm:space-x-4">
                                <img
                                    src={patientData.avatar}
                                    alt={patientData.name}
                                    className="w-12 h-12 sm:w-16 sm:h-16 rounded-full flex-shrink-0"
                                />
                                <div className="min-w-0 flex-1">
                                    <h2 className="text-lg sm:text-xl font-bold text-gray-900 truncate">{patientData.name}</h2>
                                    <div className="flex items-center space-x-2 mt-1">
                                        <svg className="w-4 h-4 text-gray-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10 2a8 8 0 100 16 8 8 0 000-16zM8 11a1 1 0 100 2h4a1 1 0 100-2H8z" clipRule="evenodd" />
                                        </svg>
                                        <span className="text-gray-600 text-sm truncate">{patientData.condition}</span>
                                    </div>
                                    <button className="text-blue-600 text-sm hover:underline mt-1">Edit</button>
                                </div>
                            </div>
                            <button className="bg-blue-600 text-white px-4 sm:px-6 py-2 rounded-lg hover:bg-blue-700 text-sm sm:text-base w-full sm:w-auto">
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
                                        onClick={() => setActiveTab(tab)}
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

                            <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 h-[450px] ">
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
                                            <label className="block text-xs font-medium text-gray-500 uppercase">Blood Type</label>
                                            <p className="text-sm font-medium text-gray-900">{patientData.bloodType}</p>
                                        </div>

                                        <div>
                                            <label className="block text-xs font-medium text-gray-500 uppercase">Registration Date</label>
                                            <p className="text-sm font-medium text-gray-900">{patientData.registrationDate}</p>
                                        </div>

                                        <div>
                                            <label className="block text-xs font-medium text-gray-500 uppercase">Last Visit</label>
                                            <p className="text-sm font-medium text-gray-900">{patientData.lastVisit}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Contact Information */}
                            <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 h-[450px] ">
                                <h3 className="text-lg font-bold text-gray-900 mb-4 sm:mb-6">Contact Information</h3>

                                <div className="space-y-3 sm:space-y-4">
                                    <div>
                                        <label className="block text-xs font-medium text-gray-500 uppercase">Phone Number</label>
                                        <p className="text-sm font-medium text-gray-900 break-all">{patientData.phone}</p>
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
                                        <div className="space-y-2">
                                            <div>
                                                <label className="block text-xs font-medium text-gray-500 uppercase">Name</label>
                                                <p className="text-sm font-medium text-gray-900">{patientData.emergencyContact.name}</p>
                                            </div>
                                            <div>
                                                <label className="block text-xs font-medium text-gray-500 uppercase">Relationship</label>
                                                <p className="text-sm font-medium text-gray-900">{patientData.emergencyContact.relationship}</p>
                                            </div>
                                            <div>
                                                <label className="block text-xs font-medium text-gray-500 uppercase">Phone</label>
                                                <p className="text-sm font-medium text-gray-900 break-all">{patientData.emergencyContact.phone}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Medical Information */}
                            <div className="xl:col-span-1 md:col-span-2 space-y-4 sm:space-y-6">
                                {/* Insurance Information */}
                                {/* <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4 sm:mb-6">Insurance Information</h3>
          
          <div className="space-y-3 sm:space-y-4">
            <div>
              <label className="block text-xs font-medium text-gray-500 uppercase">Provider</label>
              <p className="text-sm font-medium text-gray-900">{patientData.insurance.provider}</p>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-500 uppercase">Policy Number</label>
              <p className="text-sm font-medium text-gray-900 break-all">{patientData.insurance.policyNumber}</p>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-500 uppercase">Valid Until</label>
              <p className="text-sm font-medium text-gray-900">{patientData.insurance.validUntil}</p>
            </div>
          </div>
        </div> */}

                                {/* Vital Signs */}
                                <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
                                    <h3 className="text-lg font-bold text-gray-900 mb-4 sm:mb-6">Latest Vital Signs</h3>

                                    <div className="grid grid-cols-2 gap-3 sm:gap-4">
                                        <div>
                                            <label className="block text-xs font-medium text-gray-500 uppercase">Blood Pressure</label>
                                            <p className="text-sm font-medium text-gray-900">{patientData.vitals.bloodPressure}</p>
                                        </div>

                                        <div>
                                            <label className="block text-xs font-medium text-gray-500 uppercase">Heart Rate</label>
                                            <p className="text-sm font-medium text-gray-900">{patientData.vitals.heartRate}</p>
                                        </div>

                                        <div>
                                            <label className="block text-xs font-medium text-gray-500 uppercase">Weight</label>
                                            <p className="text-sm font-medium text-gray-900">{patientData.vitals.weight}</p>
                                        </div>

                                        <div>
                                            <label className="block text-xs font-medium text-gray-500 uppercase">Height</label>
                                            <p className="text-sm font-medium text-gray-900">{patientData.vitals.height}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Medical History & Allergies */}
                                <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
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
                                </div>
                            </div>
                        </div>
                    ) : activeTab === 'Medical Record' ? (
                        <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 ">

                            {/* Treatment Records */}
                            <div className="flex-1 bg-white rounded-lg shadow-sm p-4 sm:p-6">
                                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-10 space-y-2 sm:space-y-0">
                                    <div className="flex items-center space-x-2">
                                        <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded flex-shrink-0">22</span>
                                        <h3 className="text-base sm:text-lg font-medium text-gray-900 truncate">Maxillary Left Lateral Incisor</h3>
                                    </div>
                                </div>

                                <div className="space-y-4 sm:space-y-6">
                                    {treatments.slice(0, 7).map((treatment) => (
                                        <div key={treatment.id} className="border-l-4 border-grey-200 pl-3 sm:pl-4 relative">
                                            {/* Timeline dot */}
                                            <div className="absolute -left-2 w-4 h-4 bg-gray-400 rounded-full"></div>

                                            <div className="space-y-3 sm:space-y-0">
                                                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between sm:space-x-4">
                                                    <div className="flex-1">
                                                        <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-3 mb-3">
                                                            <div className="text-center sm:text-left bg-gray-50 sm:bg-transparent p-2 sm:p-0 rounded sm:rounded-none">
                                                                <div className="text-xs font-medium text-gray-500">{treatment.month}</div>
                                                                <div className="text-lg font-bold text-gray-900">{treatment.date}</div>
                                                            </div>
                                                            <div className="flex-1 min-w-0">
                                                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 text-sm">
                                                                    <div>
                                                                        <div className="text-xs text-gray-500 uppercase">CONDITION</div>
                                                                        <div className="font-medium truncate">{treatment.condition}</div>
                                                                    </div>
                                                                    <div>
                                                                        <div className="text-xs text-gray-500 uppercase">TREATMENT</div>
                                                                        <div className="font-medium truncate">{treatment.treatment}</div>
                                                                    </div>
                                                                    <div>
                                                                        <div className="text-xs text-gray-500 uppercase">DENTIST</div>
                                                                        <div className="font-medium truncate">{treatment.dentist}</div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        {/* Status and Reason */}
                                                        {treatment.reason && (
                                                            <div className="text-sm text-gray-600 mb-2">
                                                                Reason: {treatment.reason}
                                                            </div>
                                                        )}

                                                        {/* Notes */}
                                                        <div className="flex flex-wrap gap-2 mb-3 sm:mb-0">
                                                            {treatment.notes.map((note, index) => (
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
                                                    </div>

                                                    {/* Status Badge */}
                                                    <div className="flex justify-end sm:ml-4">
                                                        <span
                                                            className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${treatment.status === 'Done'
                                                                ? 'bg-green-100 text-green-800'
                                                                : 'bg-yellow-100 text-yellow-800'
                                                                }`}
                                                        >
                                                            {treatment.status === 'Done' ? (
                                                                <svg className="w-3 h-3 mr-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                                </svg>
                                                            ) : (
                                                                <svg className="w-3 h-3 mr-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                                                                </svg>
                                                            )}
                                                            {treatment.status}
                                                        </span>
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
                                        <button className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2">
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


                        </div>
                    ) : activeTab === 'Appointment History' ? (
                        <div className="flex flex-col lg:flex-row gap-4 sm:gap-6">
                            <div className="flex-1 space-y-6">
                                {/* Summary Cards */}
                                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                    <div className="bg-white rounded-lg shadow-sm p-4">
                                        <div className="flex items-center">
                                            <div className="flex-shrink-0">
                                                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                                                    <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                    </svg>
                                                </div>
                                            </div>
                                            <div className="ml-3">
                                                <p className="text-sm font-medium text-gray-500">Completed</p>
                                                <p className="text-lg font-semibold text-gray-900">
                                                    {appointmentHistory.filter(apt => apt.status === 'Completed').length}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-white rounded-lg shadow-sm p-4">
                                        <div className="flex items-center">
                                            <div className="flex-shrink-0">
                                                <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                                                    <svg className="w-5 h-5 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                                                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                                    </svg>
                                                </div>
                                            </div>
                                            <div className="ml-3">
                                                <p className="text-sm font-medium text-gray-500">Cancelled</p>
                                                <p className="text-lg font-semibold text-gray-900">
                                                    {appointmentHistory.filter(apt => apt.status === 'Cancelled').length}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-white rounded-lg shadow-sm p-4">
                                        <div className="flex items-center">
                                            <div className="flex-shrink-0">
                                                <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                                                    <svg className="w-5 h-5 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
                                                        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                                    </svg>
                                                </div>
                                            </div>
                                            <div className="ml-3">
                                                <p className="text-sm font-medium text-gray-500">No Show</p>
                                                <p className="text-lg font-semibold text-gray-900">
                                                    {appointmentHistory.filter(apt => apt.status === 'No Show').length}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-white rounded-lg shadow-sm p-4">
                                        <div className="flex items-center">
                                            <div className="flex-shrink-0">
                                                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                                                    <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                                                    </svg>
                                                </div>
                                            </div>
                                            <div className="ml-3">
                                                <p className="text-sm font-medium text-gray-500">Total Hours</p>
                                                <p className="text-lg font-semibold text-gray-900">
                                                    {Math.round(appointmentHistory
                                                        .filter(apt => apt.status === 'Completed')
                                                        .reduce((total, apt) => total + parseInt(apt.duration), 0) / 60 * 10) / 10}h
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Appointment Timeline */}
                                <div className="bg-white rounded-lg shadow-sm p-6">
                                    <div className="flex items-center justify-between mb-6">
                                        <h3 className="text-lg font-bold text-gray-900">Appointment Timeline</h3>
                                        <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                                            {appointmentHistory.length} appointments
                                        </span>
                                    </div>

                                    <div className="space-y-6">
                                        {appointmentHistory.map((appointment, index) => (
                                            <div key={appointment.id} className="relative">
                                                {/* Timeline line */}
                                                {index !== appointmentHistory.length - 1 && (
                                                    <div className="absolute left-4 top-10 w-0.5 h-16 bg-gray-200"></div>
                                                )}

                                                <div className="flex items-start space-x-4">
                                                    {/* Status indicator */}
                                                    <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${appointment.status === 'Completed' ? 'bg-green-100' :
                                                        appointment.status === 'Cancelled' ? 'bg-red-100' :
                                                            appointment.status === 'No Show' ? 'bg-orange-100' : 'bg-gray-100'
                                                        }`}>
                                                        {appointment.status === 'Completed' ? (
                                                            <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                            </svg>
                                                        ) : appointment.status === 'Cancelled' ? (
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
                                                                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${appointment.status === 'Completed' ? 'bg-green-100 text-green-800' :
                                                                        appointment.status === 'Cancelled' ? 'bg-red-100 text-red-800' :
                                                                            appointment.status === 'No Show' ? 'bg-orange-100 text-orange-800' : 'bg-gray-100 text-gray-800'
                                                                        }`}>
                                                                        {appointment.status}
                                                                    </span>
                                                                </div>

                                                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-gray-600 mb-3">
                                                                    <div className="flex items-center space-x-2">
                                                                        <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                                                            <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                                                                        </svg>
                                                                        <span>{appointment.date}</span>
                                                                    </div>
                                                                    <div className="flex items-center space-x-2">
                                                                        <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                                                                        </svg>
                                                                        <span>{appointment.time} ({appointment.duration})</span>
                                                                    </div>
                                                                </div>

                                                                <div className="flex items-center space-x-2 text-sm text-gray-600 mb-3">
                                                                    <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                                                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                                                                    </svg>
                                                                    <span>{appointment.doctor}</span>
                                                                </div>

                                                                {appointment.treatmentProvided.length > 0 && (
                                                                    <div className="mb-3">
                                                                        <p className="text-xs font-medium text-gray-500 uppercase mb-2">Treatments Provided</p>
                                                                        <div className="flex flex-wrap gap-1">
                                                                            {appointment.treatmentProvided.map((treatment, idx) => (
                                                                                <span key={idx} className="inline-flex items-center px-2 py-1 rounded text-xs bg-blue-100 text-blue-800">
                                                                                    {treatment}
                                                                                </span>
                                                                            ))}
                                                                        </div>
                                                                    </div>
                                                                )}

                                                                <p className="text-sm text-gray-600 italic">{appointment.notes}</p>
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

                                    {/* Create Record Button */}
                                    <div className="bg-white rounded-lg shadow-sm p-4">
                                        <button className="w-full bg-green-600 text-white px-4 py-3 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center space-x-2">
                                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                                            </svg>
                                            <span className="font-medium">Create Medical Record</span>
                                        </button>
                                    </div>
                                </div>
                            </div>

                        </div>
                    ) : activeTab === 'Next Appointment' ? (
                        <div className="flex flex-col lg:flex-row gap-4 sm:gap-6">
                                                        <div className="flex-1">
                                {/* Next Appointment Cards */}
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-lg font-bold text-gray-900">Upcoming Appointments</h3>
                                    </div>

                                    {nextAppointments.map((appointment) => (
                                        <div key={appointment.id} className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
                                            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between space-y-4 lg:space-y-0">
                                                <div className="flex-1">
                                                    <div className="flex items-center space-x-3 mb-3">
                                                        <h4 className="text-xl font-medium text-gray-900">{appointment.type}</h4>
                                                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                                                            appointment.status === 'Confirmed' ? 'bg-green-100 text-green-800' :
                                                            appointment.status === 'Pending Confirmation' ? 'bg-yellow-100 text-yellow-800' :
                                                            appointment.status === 'Tentative' ? 'bg-orange-100 text-orange-800' : 'bg-gray-100 text-gray-800'
                                                        }`}>
                                                            {appointment.status}
                                                        </span>
                                                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                                                            appointment.priority === 'High' ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'
                                                        }`}>
                                                            {appointment.priority} Priority
                                                        </span>
                                                    </div>
                                                    
                                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600 mb-4">
                                                        <div className="flex items-center space-x-2">
                                                            <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                                                <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                                                            </svg>
                                                            <span className="font-medium">{appointment.date}</span>
                                                        </div>
                                                        <div className="flex items-center space-x-2">
                                                            <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                                                            </svg>
                                                            <span>{appointment.time} ({appointment.duration})</span>
                                                        </div>
                                                        <div className="flex items-center space-x-2">
                                                            <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                                                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                                                            </svg>
                                                            <span>{appointment.doctor}</span>
                                                        </div>
                                                    </div>

                                                    <p className="text-sm text-gray-600 mb-4">{appointment.notes}</p>

                                                    <div className="mb-4">
                                                        <p className="text-xs font-medium text-gray-500 uppercase mb-2">Treatment Plan</p>
                                                        <div className="flex flex-wrap gap-2">
                                                            {appointment.treatmentPlan.map((treatment, idx) => (
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
                                                            <span>Reminder: {appointment.reminders.sent ? `Sent ${appointment.reminders.lastSent} via ${appointment.reminders.method}` : 'Pending'}</span>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="flex space-x-2">
                                                    <button className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700">
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
                                                    {nextAppointments.length}
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
                                                    {nextAppointments.filter(apt => apt.status === 'Confirmed').length}
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
                                                    {nextAppointments.filter(apt => apt.priority === 'High').length}
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
                                                    {nextAppointments.filter(apt => apt.status === 'Pending Confirmation' || apt.status === 'Tentative').length}
                                                </p>
                                                <p className="text-xs text-gray-400 mt-1">Awaiting confirmation</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Schedule New Button */}
                                    <div className="bg-white rounded-lg shadow-sm p-4">
                                        <button className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2">
                                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                                            </svg>
                                            <span className="font-medium">Schedule New Appointment</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
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
        </div>
    );
};

export default PatientRecords;
