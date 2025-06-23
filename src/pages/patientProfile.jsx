import React from 'react';
import { BsHeartPulse, BsCameraVideo, BsGrid, BsBagPlus, BsChevronRight } from 'react-icons/bs';
import { TbPrescription } from 'react-icons/tb';
import { FaClinicMedical, FaFlask } from 'react-icons/fa';
import { SlCalender } from 'react-icons/sl';
import { IoPeopleOutline } from 'react-icons/io5';
import { FaRegCalendarCheck, FaRegHospital } from 'react-icons/fa';

// Note: This component uses react-icons. Please install it if you haven't already:
// npm install react-icons

// Custom CSS for styled list bullets
const styles = `
.list-item-custom {
  position: relative;
  padding-left: 1rem;
}
.list-item-custom::before {
  content: "•";
  color: #8B5CF6;
  font-size: 1.2em;
  position: absolute;
  left: 0;
  top: 0;
}
`;

const StyleInjector = () => <style>{styles}</style>;

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
            See Record
            <BsChevronRight />
        </a>
    </div>
);


const PatientProfile = () => {
    return (
        <>
            <StyleInjector />
            <div className="bg-gray-50 p-4 lg:p-8 font-sans min-h-screen">
                <div className="max-w-screen-xl mx-auto flex flex-col lg:flex-row gap-8">

                    {/* Main Content */}
                    <main className="flex-1">
                        <header className="mb-8">
                            <h1 className="text-3xl font-bold text-gray-800">Michael Olivia,</h1>
                            {/* <p className="text-gray-500">You have got no appointments for today</p> */}
                        </header>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                            <StatCard icon={<IoPeopleOutline size={24} className="text-blue-500" />} title="Diagnosis" value="579" percentage={15} iconBgColor="bg-blue-100" />
                            <StatCard icon={<FaClinicMedical size={24} className="text-orange-500" />} title="Lab Results" value="54" percentage={10} iconBgColor="bg-orange-100" />
                            <StatCard icon={<FaRegHospital size={24} className="text-teal-500" />} title="Clinical Note" value="$8,399.24" percentage={28} iconBgColor="bg-teal-100" />
                        </div>

                        {/* Quick Info Cards */}
                        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                            {/* <div className="bg-white p-5 rounded-2xl shadow-sm flex items-center gap-4 border border-gray-100 hover:shadow-md transition-shadow cursor-pointer">
                                <div className="bg-rose-100 p-3 rounded-lg">
                                    <BsHeartPulse size={14} className="text-rose-500 text-2xl" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-semibold text-gray-800">Consultations</h3>
                                    <p className="text-xs text-gray-500">Last Consultation 12.02.2023</p>
                                    <strong className="text-sm font-bold text-gray-800">04 All Time Consultations</strong>
                                </div>
                                <span className="ml-auto text-gray-400">&gt;</span>
                            </div>
                            <div className="bg-white p-5 rounded-2xl shadow-sm flex items-center gap-4 border border-gray-100 hover:shadow-md transition-shadow cursor-pointer">
                                <div className="bg-blue-100 p-3 rounded-lg">
                                    <TbPrescription size={14} className="text-blue-500 text-2xl" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-semibold text-gray-800">Prescriptions</h3>
                                    <p className="text-xs text-gray-500">Last added 12.02.2023</p>
                                    <strong className="text-sm font-bold text-gray-800">01 available prescription</strong>
                                </div>
                                <span className="ml-auto text-gray-400">&gt;</span>
                            </div>
                            <div className="bg-white p-5 rounded-2xl shadow-sm flex   gap-4 border border-gray-100 hover:shadow-md transition-shadow cursor-pointer">
                                <div className="flex-1">
                                    <div className="bg-orange-100 p-3 rounded-lg">
                                        <FaFlask size={14} className="text-orange-500 text-2xl" />
                                    </div>
                                    <h3 className="font-semibold text-gray-800">Lab Screenings</h3>
                                    <p className="text-xs text-gray-500">04 Lab tests</p>
                                    <strong className="text-sm font-bold text-gray-800">Cancer Screening Test</strong>
                                </div>
                                <span className="ml-auto text-gray-400">&gt;</span>
                            </div> */}
                        </section>

                        {/* Upcoming Appointments */}
                        <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-8">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-xl font-bold text-gray-800">Upcoming Appointments</h2>
                                <a href="#" className="text-pink-500 font-semibold text-sm hover:text-pink-600">View all</a>
                            </div>
                            <div className="space-y-4">
                                <div className="bg-gray-50 p-4 rounded-lg flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                    <div className="flex-1">
                                        <h4 className="font-bold text-gray-800">Hormone Therapy Consultation</h4>
                                        <div className="flex items-center text-sm text-gray-500 mt-2 gap-2 flex-wrap">
                                            <img src="https://i.pravatar.cc/40?img=1" alt="Dr. Tina Murphy" className="w-8 h-8 rounded-full" />
                                            <span>Dr. Tina Murphy</span>
                                            <span>&bull;</span>
                                            <span>05 Feb, 2024</span>
                                            <span>&bull;</span>
                                            <span>11:00 AM - 11:30 AM</span>
                                        </div>
                                    </div>
                                    <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 whitespace-nowrap transition-colors">
                                        <BsCameraVideo /> Join Session
                                    </button>
                                </div>
                                <div className="bg-gray-50 p-4 rounded-lg flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                    <div className="flex-1">
                                        <h4 className="font-bold text-gray-800">Anti- Aging Consultation</h4>
                                        <div className="flex items-center text-sm text-gray-500 mt-2 gap-2 flex-wrap">
                                            <img src="https://i.pravatar.cc/40?img=2" alt="Dr. Micheal Hussey" className="w-8 h-8 rounded-full" />
                                            <span>Dr. Micheal Hussey</span>
                                            <span>&bull;</span>
                                            <span>05 Feb, 2024</span>
                                            <span>&bull;</span>
                                            <span>11:00 AM - 11:30 AM</span>
                                        </div>
                                    </div>
                                    <div className="flex gap-2 flex-wrap">
                                        <button className="bg-white border border-red-300 text-red-600 hover:bg-red-50 px-4 py-2 rounded-lg text-sm font-semibold transition-colors">
                                            Cancel Appointment
                                        </button>
                                        <button className="bg-gray-200 hover:bg-gray-300 border border-gray-200 px-4 py-2 rounded-lg text-sm font-semibold transition-colors">
                                            Reschedule
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Medications */}
                        <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-xl font-bold text-gray-800">Medications</h2>
                                <a href="#" className="text-pink-500 font-semibold text-sm hover:text-pink-600">View all</a>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="bg-gray-50 p-4 rounded-lg hover:bg-gray-100 transition-colors">
                                    <p className="text-xs text-gray-500 flex items-center gap-2 mb-2">
                                        <SlCalender /> 26 Oct, 2023
                                    </p>
                                    <h4 className="font-bold text-purple-700">Loratadin 5mg</h4>
                                    <div className="flex justify-between text-xs text-gray-600 mt-4">
                                        <span>3 days left</span>
                                        <span>Twice a day</span>
                                    </div>
                                </div>
                                <div className="bg-gray-50 p-4 rounded-lg hover:bg-gray-100 transition-colors">
                                    <p className="text-xs text-gray-500 flex items-center gap-2 mb-2">
                                        <SlCalender /> 26 Oct, 2023
                                    </p>
                                    <h4 className="font-bold text-purple-700">Brocopan 50mg</h4>
                                    <div className="flex justify-between text-xs text-gray-600 mt-4">
                                        <span>3 days left</span>
                                        <span>Twice a day</span>
                                    </div>
                                </div>
                                <div className="bg-gray-50 p-4 rounded-lg hover:bg-gray-100 transition-colors">
                                    <p className="text-xs text-gray-500 flex items-center gap-2 mb-2">
                                        <SlCalender /> 26 Oct, 2023
                                    </p>
                                    <h4 className="font-bold text-purple-700">Myticafin 5mg</h4>
                                    <div className="flex justify-between text-xs text-gray-600 mt-4">
                                        <span>2 days left</span>
                                        <span>Twice a day</span>
                                    </div>
                                </div>
                            </div>
                        </section>

                    </main>

                    {/* Sidebar */}
                    <aside className=" p-5 bg-white w-full lg:w-80 flex-shrink-0 space-y-6 shadow-sm">
                        <div className="  text-center">
                            <img src="https://i.pravatar.cc/80?img=3" alt="Olivia Roye" className="w-20 h-20 rounded-full mx-auto mb-4" />
                            <h2 className="text-xl font-bold">Olivia Roye</h2>
                            <p className="text-gray-500 text-sm">56 Years</p>
                            <div className="flex justify-around mt-4 text-sm">
                                <div>
                                    <p className="text-gray-500">Blood</p>
                                    <p className="font-bold text-red-600">AB+</p>
                                </div>
                                <div>
                                    <p className="text-gray-500">Height</p>
                                    <p className="font-bold">160 cm</p>
                                </div>
                                <div>
                                    <p className="text-gray-500">Weight</p>
                                    <p className="font-bold">54 kg</p>
                                </div>
                            </div>
                        </div>


                        <div className="p-3 flex items-center justify-between  hover:shadow-md transition-shadow cursor-pointer">
                            <div className="flex items-center gap-3">
                                <BsGrid className="text-purple-600" />
                                <h3 className="font-bold">My Health Records</h3>
                            </div>
                            <span className="text-gray-400">&gt;</span>
                        </div>

                        <div className="  p-5   flex items-center justify-between   hover:shadow-md transition-shadow cursor-pointer">
                            <div className="flex items-center gap-3">
                                <BsCameraVideo className="text-purple-600" />
                                <h3 className="font-bold">Appointments</h3>
                            </div>
                            <span className="text-gray-400">&gt;</span>
                        </div>

                        <div className="bg-pink-50 p-6 rounded-2xl text-center">
                            <div className="bg-pink-100 w-12 h-12 rounded-full mx-auto flex items-center justify-center mb-4">
                                <BsBagPlus className="text-pink-500 text-2xl" />
                            </div>
                            <h3 className="font-bold text-gray-800">Explore Zyvly Pharmacy Now!</h3>
                            <p className="text-sm text-gray-600 mt-2">Get your prescribed medicines now delivered at your doorstep</p>
                        </div>
                    </aside>
                </div>
            </div>
        </>
    );
};

export default PatientProfile;
