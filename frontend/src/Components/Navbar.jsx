import React, { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, Globe, ChevronDown, User, Menu, X } from 'lucide-react';
import { AuthContext } from '../Context/authContext';

const Navbar = () => {
    const navigate = useNavigate();
    const [showRegions, setShowRegions] = useState(false)
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [openDropDown, setOpenDropDown] = useState(false)

    const { authUser, state, logout } = useContext(AuthContext)

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Fixed click outside handler
    useEffect(() => {
        const handleClickOutside = (event) => {
            // Only close if menu is open and click is outside both menu button AND mobile menu
            if (mobileMenuOpen &&
                !event.target.closest('.mobile-menu') &&
                !event.target.closest('.mobile-menu-button')) {
                setMobileMenuOpen(false);
            }
        };

        // Add a small delay to prevent immediate closing when opening
        if (mobileMenuOpen) {
            const timer = setTimeout(() => {
                document.addEventListener('click', handleClickOutside);
            }, 100);

            return () => {
                clearTimeout(timer);
                document.removeEventListener('click', handleClickOutside);
            };
        }
    }, [mobileMenuOpen]);

    useEffect(() => {
        if (authUser) {
            setIsLoggedIn(true);
        }
    }, [authUser])

    useEffect(() => {
        console.log(isLoggedIn);

    }, [isLoggedIn])

    const toggleMobileMenu = (e) => {
        e.stopPropagation(); // Prevent event bubbling
        setMobileMenuOpen(!mobileMenuOpen);
    };

    return (
        <div className='w-full'>
            <div className={`items-center text-white flex flex-row justify-between px-4 sm:px-6 lg:px-8 py-3 sm:py-4 lg:py-5 fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-black/90 backdrop-blur-md shadow-lg' : 'bg-transparent'}`}>

                {/* Logo/Name */}
                <div
                    onClick={() => navigate('/')}
                    className='font-bold text-xl sm:text-2xl lg:text-3xl cursor-pointer hover:text-gray-300 transition-colors flex-shrink-0'
                >
                    StockAtlas
                </div>

                {/* Desktop Navigation */}
                <div className='hidden md:flex gap-6 lg:gap-10 items-center'>
                    {/* Search Bar */}
                    <div className="relative group w-fit">
                        <div className="relative z-10 bg-gray-800/50 backdrop-blur-sm flex flex-row items-center gap-2 px-4 py-2 rounded-full border border-gray-600/30 hover:border-gray-500/50 transition-all duration-200">
                            <Search color="white" size={20} />
                            <input
                                className="w-full lg:w-[300px] xl:w-[400px] border-none outline-none bg-transparent text-white placeholder:text-gray-400 text-base lg:text-lg"
                                type="text"
                                placeholder="Search stocks (e.g., AAPL)"
                            />
                        </div>
                    </div>

                    {/* Region Selector */}
                    <div className='relative flex flex-col items-center justify-center'>
                        <div
                            onClick={() => setShowRegions(!showRegions)}
                            title='Select region'
                            className='flex items-center justify-center gap-1 px-3 py-2 rounded-full hover:bg-gray-200/10 cursor-pointer transition-colors'
                        >
                            <Globe color='white' size={22} />
                            <ChevronDown
                                color='white'
                                size={18}
                                className={`transform transition-transform ${showRegions ? 'rotate-180' : ''}`}
                            />
                        </div>
                        {showRegions && (
                            <div className="absolute top-full mt-2 bg-black/90 backdrop-blur-md rounded-lg shadow-xl border border-gray-600/30 overflow-hidden">
                                <div className="py-2">
                                    {['US', 'UK', 'India', 'Japan'].map((region) => (
                                        <div
                                            key={region}
                                            className="px-4 py-2 hover:bg-gray-600/30 cursor-pointer text-white transition-colors"
                                            onClick={() => {
                                                console.log('Selected region:', region);
                                                setShowRegions(false);
                                            }}
                                        >
                                            {region}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* User Profile */}
                    {state !== 'Sign Up' ? (
                        <div className="relative">
                            <div onClick={() => setOpenDropDown(true)}
                                className='hover:bg-gray-200/10 cursor-pointer flex items-center justify-center rounded-full p-3 transition-colors'
                            >
                                <User size={22} />
                                {
                                    openDropDown
                                        ? <div className='absolute right-0 top-full mt-3 w-48 bg-gray-200/10 backdrop-blur-sm flex flex-col rounded-xl shadow-xl border border-gray-200/30 overflow-hidden'>
                                            <p onClick={() => navigate('/profile')} className='w-full px-6 py-3 hover:bg-gray-200/30 cursor-pointer transition-all duration-200 text-sm font-medium'>Profile</p>
                                            <p onClick={() => navigate(logout(authUser._id))} className='w-full px-6 py-3 hover:bg-gray-200/30 cursor-pointer transition-all duration-200 text-sm font-medium border-t border-gray-200/20'>Sign Out</p>
                                        </div>
                                        : null
                                }
                            </div>
                        </div>
                    ) : (
                        <div
                            onClick={() => navigate('/login')}
                            className='hover:bg-gray-200/10 cursor-pointer flex items-center justify-center rounded-full py-2 px-4 border border-gray-200/20 hover:border-gray-200/40 transition-all text-sm lg:text-base'
                        >
                            Sign In
                        </div>
                    )}
                </div>

                {/* Mobile Menu Button - Added mobile-menu-button class */}
                <div
                    className='flex md:hidden rounded-lg hover:bg-gray-200/10 p-2 cursor-pointer transition-colors mobile-menu-button flex-shrink-0'
                    onClick={toggleMobileMenu}
                >
                    {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </div>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className="md:hidden fixed inset-0 bg-black/95 backdrop-blur-md z-40 mobile-menu">
                    <div className="flex flex-col pt-16 px-6 space-y-4 h-full overflow-y-auto">
                        {/* Mobile Search */}
                        <div className="bg-gray-800/60 backdrop-blur-sm flex flex-row items-center gap-3 px-4 py-3 rounded-xl border border-gray-600/40">
                            <Search color="white" size={20} />
                            <input
                                className="w-full border-none outline-none bg-transparent text-white placeholder:text-gray-400 text-base"
                                type="text"
                                placeholder="Search stocks..."
                            />
                        </div>

                        {/* Mobile Region Selector */}
                        <div className="space-y-2">
                            <div
                                onClick={() => setShowRegions(!showRegions)}
                                className="flex items-center justify-between px-4 py-3 rounded-xl hover:bg-gray-800/50 cursor-pointer transition-colors"
                            >
                                <div className="flex items-center gap-3">
                                    <Globe color='white' size={20} />
                                    <span className="text-white text-base font-medium">Select Region</span>
                                </div>
                                <ChevronDown
                                    color='white'
                                    size={18}
                                    className={`transform transition-transform duration-200 ${showRegions ? 'rotate-180' : ''}`}
                                />
                            </div>
                            {showRegions && (
                                <div className="ml-6 space-y-1 bg-gray-800/30 rounded-lg p-2">
                                    {['US', 'UK', 'India', 'Japan'].map((region) => (
                                        <div
                                            key={region}
                                            className="px-3 py-2 rounded-lg hover:bg-gray-700/50 cursor-pointer text-gray-300 hover:text-white transition-colors text-sm"
                                            onClick={() => {
                                                console.log('Selected region:', region);
                                                setShowRegions(false);
                                                setMobileMenuOpen(false);
                                            }}
                                        >
                                            {region}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Mobile Auth */}
                        {isLoggedIn ? (
                            <div
                                onClick={() => {
                                    navigate('/profile');
                                    setMobileMenuOpen(false);
                                }}
                                className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-800/50 cursor-pointer transition-colors"
                            >
                                <User size={20} color="white" />
                                <span className="text-white text-base font-medium">Profile</span>
                            </div>
                        ) : (
                            <div
                                onClick={() => {
                                    navigate('/login');
                                    setMobileMenuOpen(false);
                                }}
                                className="flex items-center justify-center py-3 px-6 mt-4 rounded-xl border border-gray-500/30 hover:border-gray-400/50 hover:bg-gray-800/30 cursor-pointer transition-all"
                            >
                                <span className="text-white text-base font-medium">Sign In</span>
                            </div>
                        )}

                        {/* Close button at bottom for better UX */}
                        {/* <div className="flex-grow"></div> */}
                        {/* <div 
                            onClick={() => setMobileMenuOpen(false)}
                            className="flex items-center justify-center py-3 px-6 mb-8 rounded-xl bg-gray-800/50 hover:bg-gray-700/50 cursor-pointer transition-colors"
                        >
                            <span className="text-gray-300 text-sm">Close Menu</span>
                        </div> */}
                    </div>
                </div>
            )}
        </div>
    )
}

export default Navbar