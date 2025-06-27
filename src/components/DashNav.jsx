import React, { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom';
import { FiHome, FiMenu } from 'react-icons/fi';

// Import icons from a suitable icon library (e.g., react-icons)
import {
    FaLayerGroup,
    FaMoneyBillWave,
    FaFingerprint,
    FaExchangeAlt,
    FaArrowRight,
    FaArrowLeft,
    FaExclamationTriangle,
    FaBolt,
    FaClipboardList,
    FaUserFriends,
    FaCog,
    FaHeadset,
    FaBook,
    FaToggleOn,
    FaTimes
} from 'react-icons/fa';

const DashNav = () => {
    const [isOpen, setIsOpen] = useState(false); // Toggle menu state
    const [isCollapsed, setIsCollapsed] = useState(window.innerWidth < 768 ? true : false);
    const [isMobile, setIsMobile] = useState(false);

    // Handle window resize and set mobile state
    useEffect(() => {
        console.log(window.innerWidth)
    }, []);

    const toggleNav = () => {
        if (isMobile) {
            setIsOpen(!isOpen)
        } else {
            setIsCollapsed(!isCollapsed);
        }
    };

    // Handle clicking outside to close mobile nav
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (isMobile && isOpen && !event.target.closest('.nav-container')) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isMobile, isOpen]);

    return (
        <nav className={` bg-gray-300 h-screen text-[14px] transition-all duration-300 overflow-hidden space-y-6`}>
            {/* Mobile Menu Button - Always visible on mobile */}


            {/* Navigation */}
            <nav className={`scroll-smooth nav-container h-screen bg-white shadow-lg transition-all duration-300 z-40 ${isMobile ? `${isOpen ? 'translate-x-0' : '-translate-x-full'} w-24` : `${isCollapsed ? 'w-20' : 'w-64'}`}`}>


                {/* Profile Section */}
                {window.innerWidth > 768 ? (
                    <div className="p-4 border-b">
                        <div className="flex items-center space-x-3">
                            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                                <span className="text-blue-600">TI</span>
                            </div>
                            {(!isCollapsed || isMobile) && (
                                <div>
                                    <h2 className="font-semibold text-gray-800">TECHTAN I...</h2>
                                    <p className="text-sm text-gray-500">ID KPY30844</p>
                                </div>
                            )}
                        </div>
                    </div>
                ) :
                    isCollapsed ? (
                        <button
                            onClick={toggleNav}
                            className=" mt-5 ml-5 bg-white p-2 rounded-full shadow-lg hover:bg-gray-50"
                        >
                            <FiMenu
                                size={24}
                                className={`transform transition-transform duration-300 ${isCollapsed ? 'rotate-180' : ''}`}
                            />

                        </button>
                    ) : <button
                        onClick={toggleNav}
                        className="fixed top-4 right-25 z-50 bg-white p-2 rounded-full shadow-lg hover:bg-gray-50"
                    >
                        <FaTimes
                            color='crimson'
                            size={24}
                            className={`text-blue-500 transform transition-transform duration-300 ${isCollapsed ? 'rotate-180' : ''}`}
                        />
                    </button>}

                {/* Main Navigation */}
                <div className="p-4">
                    <div className="space-y-4">
                        {/* Main Features */}
                        <div className="space-y-2">
                            <NavItem icon={<FiHome />} text="Dashboard" isCollapsed={isCollapsed && !isMobile} />
                            <NavItem icon={<FaMoneyBillWave />} text="Patients" isCollapsed={isCollapsed && !isMobile} />
                            <NavItem icon={<FaFingerprint />} text="Records" isCollapsed={isCollapsed && !isMobile} />
                            <NavItem icon={<FaExchangeAlt />} text="Medicards" isCollapsed={isCollapsed && !isMobile} />
                        </div>

                        {/* Transactions Section
                        <div>
                            {(!isCollapsed || isMobile) && (
                                <h3 className="text-xs font-semibold text-blue-500 mb-2">TRANSACTIONS</h3>
                            )}
                            <div className="space-y-2">
                                <NavItem icon={<FaArrowLeft />} text="Pay-ins" isCollapsed={isCollapsed && !isMobile} />
                                <NavItem icon={<FaArrowRight />} text="Payouts" isCollapsed={isCollapsed && !isMobile} />
                                <NavItem icon={<FaExclamationTriangle />} text="Disputes" isCollapsed={isCollapsed && !isMobile} />
                                <NavItem icon={<FaBolt />} text="Settlements" isCollapsed={isCollapsed && !isMobile} />
                            </div>
                        </div> */}

                        {/* Account Section */}
                        <div>
                            {(!isCollapsed || isMobile) && (
                                <h3 className="text-xs font-semibold text-blue-500 mb-2">ACCOUNT</h3>
                            )}
                            <div className="space-y-2">
                                <NavItem icon={<FaClipboardList />} text="Audit Logs" isCollapsed={isCollapsed && !isMobile} />
                                <NavItem icon={<FaUserFriends />} text="Referrals" isCollapsed={isCollapsed && !isMobile} />
                                <NavItem icon={<FaCog />} text="Settings" isCollapsed={isCollapsed && !isMobile} />
                                <NavItem icon={<FaHeadset />} text="Support" isCollapsed={isCollapsed && !isMobile} />
                                <NavItem icon={<FaBook />} text="Documentation" isCollapsed={isCollapsed && !isMobile} />
                            </div>
                        </div>
                    </div>
                    {/* Live Mode Toggle */}
                    <div className={`mt-8 p-4 bg-gray-50 rounded-lg ${isCollapsed && !isMobile ? 'text-center' : ''}`}>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                                <FaToggleOn className="text-green-500 text-2xl" />
                                {(!isCollapsed || isMobile) && <span className="font-medium">Live Mode</span>}
                            </div>
                            {(!isCollapsed || isMobile) && (
                                <button className="text-gray-400 hover:text-gray-600">
                                    ?
                                </button>
                            )}
                        </div>
                    </div>

                </div>
            </nav>

        </nav >
    )
}


// NavItem component for consistent styling
const NavItem = ({ icon, text, isCollapsed }) => {
    return (
        <NavLink
            to={text === "Dashboard" ? `/${text.toLowerCase().replace(/\s+/g, '-')}` : `/dashboard/${text.toLowerCase().replace(/\s+/g, '-')}`}
            className={({isActive}) => `flex items-center ${isCollapsed ? 'justify-center' : 'space-x-3'} px-2 py-3 text-gray-600 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors duration-200 ${isActive ? 'bg-blue-50' : ''}`}
            title={isCollapsed ? text : ''}
            end
        >
            <span className="text-xl">{icon}</span>
            {!isCollapsed && <span>{text}</span>}
        </NavLink>
    );
};

export default DashNav