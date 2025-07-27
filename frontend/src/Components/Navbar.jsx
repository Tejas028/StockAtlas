import React, { useState, useEffect, useContext, useCallback, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, Globe, ChevronDown, User, Menu, X } from 'lucide-react';
import { AuthContext } from '../Context/authContext';
import { StockContext } from '../Context/stockContext';

const Navbar = () => {
    const navigate = useNavigate();
    const [showRegions, setShowRegions] = useState(false)
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [openDropDown, setOpenDropDown] = useState(false)
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState(null);
    const [mobileSearchQuery, setMobileSearchQuery] = useState('');
    const [mobileSearchResults, setMobileSearchResults] = useState(null);

    // Refs for click outside detection
    const regionsRef = useRef(null);
    const profileDropdownRef = useRef(null);
    const mobileMenuRef = useRef(null);
    const searchDropdownRef = useRef(null);
    const mobileSearchDropdownRef = useRef(null);

    const { authUser, state, logout } = useContext(AuthContext)
    const { searchStock, getMarketNews } = useContext(StockContext)

    const handleSearchInputClick=()=>{
        window.open('https://stockanalysis.com/stocks/')
    }

    // Debounced scroll handler for better performance
    useEffect(() => {
        let timeoutId;
        const handleScroll = () => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                setScrolled(window.scrollY > 50);
            }, 10);
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => {
            clearTimeout(timeoutId);
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    // Enhanced click outside handler for all dropdowns
    useEffect(() => {
        const handleClickOutside = (event) => {
            // Close regions dropdown
            if (regionsRef.current && !regionsRef.current.contains(event.target)) {
                setShowRegions(false);
            }

            // Close profile dropdown
            if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target)) {
                setOpenDropDown(false);
            }

            // Close mobile menu
            if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target) &&
                !event.target.closest('.mobile-menu-button')) {
                setMobileMenuOpen(false);
            }

            // Close desktop search dropdown
            if (searchDropdownRef.current && !searchDropdownRef.current.contains(event.target)) {
                setSearchResults(null);
            }

            // Close mobile search dropdown
            if (mobileSearchDropdownRef.current && !mobileSearchDropdownRef.current.contains(event.target)) {
                setMobileSearchResults(null);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Handle escape key to close dropdowns
    useEffect(() => {
        const handleEscape = (event) => {
            if (event.key === 'Escape') {
                setShowRegions(false);
                setOpenDropDown(false);
                setMobileMenuOpen(false);
                setSearchResults(null);
                setMobileSearchResults(null);
            }
        };

        document.addEventListener('keydown', handleEscape);
        return () => document.removeEventListener('keydown', handleEscape);
    }, []);

    // Prevent body scroll when mobile menu is open
    useEffect(() => {
        if (mobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [mobileMenuOpen]);

    useEffect(() => {
        if (authUser) {
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false);
        }
    }, [authUser])

    const toggleMobileMenu = useCallback((e) => {
        e.stopPropagation();
        setMobileMenuOpen(prev => !prev);
        // Clear mobile search when closing menu
        if (mobileMenuOpen) {
            setMobileSearchQuery('');
            setMobileSearchResults(null);
        }
    }, [mobileMenuOpen]);

    const handleLogoClick = useCallback(() => {
        navigate('/');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [navigate]);

    // Desktop search handler
    const handleSearchSubmit = useCallback(async (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            try {
                const stocks = await searchStock(searchQuery);
                // const news=await getMarketNews();
                // console.log(news);
                
                console.log("Fetched stocks:", stocks);
                if (Array.isArray(stocks)) {
                    setSearchResults(stocks.slice(0,1));
                } else {
                    setSearchResults([]);
                }
            } catch (err) {
                console.error("Error in search:", err);
                setSearchResults([]);
            }
        }
    }, [searchQuery, searchStock]);

    // Mobile search handler
    const handleMobileSearchSubmit = useCallback(async (e) => {
        e.preventDefault();
        if (mobileSearchQuery.trim()) {
            try {
                const stocks = await searchStock(mobileSearchQuery);
                if (Array.isArray(stocks)) {
                    setMobileSearchResults(stocks);
                } else {
                    setMobileSearchResults([]);
                }
            } catch (err) {
                console.error("Error in mobile search:", err);
                setMobileSearchResults([]);
            }
        }
    }, [mobileSearchQuery, searchStock]);

    // Handle stock selection from search results
    const handleStockSelect = useCallback(async (stock) => {
        // Navigate to stock detail page or handle selection
        navigate(`/stock/${stock.symbol}`);

        // navigate(`/stock/${stock.displaySymbol}`);
        setSearchResults(null);
        setMobileSearchResults(null);
        setSearchQuery('');
        setMobileSearchQuery('');
        setMobileMenuOpen(false);
    }, []);

    const handleProfileClick = useCallback(() => {
        navigate('/profile');
        setOpenDropDown(false);
        setMobileMenuOpen(false);
    }, [navigate]);

    const handleLogout = useCallback(() => {
        logout(authUser?._id);
        setOpenDropDown(false);
        setMobileMenuOpen(false);
    }, [logout, authUser]);

    const handleSignInClick = useCallback(() => {
        navigate('/login');
        scrollTo(0, 0);
        setMobileMenuOpen(false);
    }, [navigate]);

    return (
        <div className='w-full'>
            <nav
                className={`items-center text-white flex flex-row justify-between px-4 sm:px-6 lg:px-8 py-3 sm:py-4 lg:py-5 fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-black/90 backdrop-blur-md shadow-lg' : 'bg-transparent'}`}
                role="navigation"
                aria-label="Main navigation"
            >
                {/* Logo/Name */}
                <div
                    onClick={handleLogoClick}
                    className='font-bold text-xl sm:text-2xl lg:text-3xl cursor-pointer hover:text-gray-300 transition-colors flex-shrink-0 focus:outline-none focus:ring-2 focus:ring-white/50 rounded-lg px-2 py-1'
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            handleLogoClick();
                        }
                    }}
                >
                    StockAtlas
                </div>

                {/* Desktop Navigation */}
                <div className='hidden md:flex gap-6 lg:gap-10 items-center'>
                    {/* Desktop Search Bar */}
                    <div className="relative">
                        <form onSubmit={handleSearchSubmit} className="relative group w-fit">
                            <div className="relative z-10 bg-gray-800/50 backdrop-blur-sm flex flex-row items-center gap-2 px-4 py-2 rounded-full border border-gray-600/30 hover:border-gray-500/50 focus-within:border-gray-400/70 transition-all duration-200">
                                <Search color="white" size={20} />
                                <input
                                    className="w-full lg:w-[300px] xl:w-[400px] border-none outline-none bg-transparent text-white placeholder:text-gray-400 text-base lg:text-lg"
                                    type="text"
                                    placeholder="Search stocks (e.g., AAPL)"
                                    value={searchQuery.toUpperCase()}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    aria-label="Search stocks"
                                />
                            </div>
                        </form>

                        {/* Desktop Search Suggestions */}
                        {searchResults && (
                            <div ref={searchDropdownRef} className='absolute top-full left-0 right-0 mt-2 z-50 bg-gray-800/90 backdrop-blur-sm border border-gray-600/30 rounded-xl shadow-xl max-h-60 overflow-y-auto'>
                                {
                                    searchResults.length > 0 ? (
                                        searchResults.map((result, idx) => (
                                            <div
                                                key={idx}
                                                onClick={() => handleStockSelect(result)}
                                                className="px-4 py-3 border-b border-gray-600/20 last:border-b-0 hover:bg-gray-600/30 focus:bg-gray-600/30 cursor-pointer transition-all duration-200"
                                            >
                                                <p className="font-semibold text-white text-sm">{result.displaySymbol}</p>
                                                <p className="text-gray-400 text-xs mt-1 truncate">{result.description}</p>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="px-4 py-3 text-gray-400 text-sm">
                                            Didn't find what you were looking for?{' '}
                                            <span 
                                                onClick={handleSearchInputClick}
                                                className="text-blue-400 hover:text-blue-300 cursor-pointer underline"
                                            >
                                                Click here to find a stock's symbol
                                            </span>
                                        </div>
                                    )
                                }
                            </div>
                        )}
                    </div>

                    {/* User Profile */}
                    {isLoggedIn ? (
                        <div className="relative" ref={profileDropdownRef}>
                            <button
                                onClick={() => setOpenDropDown(!openDropDown)}
                                className='hover:bg-gray-200/10 focus:bg-gray-200/10 cursor-pointer flex items-center justify-center rounded-full p-3 transition-colors focus:outline-none focus:ring-2 focus:ring-white/50'
                                aria-expanded={openDropDown}
                                aria-haspopup="true"
                                aria-label="User menu"
                            >
                                <User size={22} />
                            </button>
                            {openDropDown && (
                                <div className='absolute right-0 top-full mt-3 w-48 bg-gray-800/90 backdrop-blur-sm flex flex-col rounded-xl shadow-xl border border-gray-600/30 overflow-hidden'>
                                    <button
                                        onClick={handleProfileClick}
                                        className='w-full text-left px-6 py-3 hover:bg-gray-600/30 focus:bg-gray-600/30 cursor-pointer transition-all duration-200 text-sm font-medium focus:outline-none'
                                    >
                                        Profile
                                    </button>
                                    <button
                                        onClick={handleLogout}
                                        className='w-full text-left px-6 py-3 hover:bg-gray-600/30 focus:bg-gray-600/30 cursor-pointer transition-all duration-200 text-sm font-medium border-t border-gray-600/20 focus:outline-none'
                                    >
                                        Sign Out
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <button
                            onClick={handleSignInClick}
                            className='hover:bg-gray-200/10 focus:bg-gray-200/10 cursor-pointer flex items-center justify-center rounded-full py-2 px-4 border border-gray-200/20 hover:border-gray-200/40 focus:border-gray-200/40 transition-all text-sm lg:text-base focus:outline-none focus:ring-2 focus:ring-white/50'
                        >
                            Sign In
                        </button>
                    )}
                </div>

                {/* Mobile Menu Button */}
                <button
                    className='flex md:hidden rounded-lg hover:bg-gray-200/10 focus:bg-gray-200/10 p-2 cursor-pointer transition-colors mobile-menu-button flex-shrink-0 focus:outline-none focus:ring-2 focus:ring-white/50'
                    onClick={toggleMobileMenu}
                    aria-expanded={mobileMenuOpen}
                    aria-label="Toggle mobile menu"
                >
                    {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </nav>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className="md:hidden fixed inset-0 bg-black/95 backdrop-blur-md z-40" ref={mobileMenuRef}>
                    <div className="flex flex-col pt-16 px-6 space-y-4 h-full overflow-y-auto">
                        {/* Mobile Search */}
                        <div className="relative">
                            <form onSubmit={handleMobileSearchSubmit} className="w-full">
                                <div className="bg-gray-800/60 backdrop-blur-sm flex flex-row items-center gap-3 px-4 py-3 rounded-xl border border-gray-600/40 focus-within:border-gray-500/60 transition-colors">
                                    <Search color="white" size={20} />
                                    <input
                                        className="w-full border-none outline-none bg-transparent text-white placeholder:text-gray-400 text-base"
                                        type="text"
                                        placeholder="Search stocks..."
                                        value={mobileSearchQuery.toUpperCase()}
                                        onChange={(e) => setMobileSearchQuery(e.target.value)}
                                        aria-label="Search stocks"
                                    />
                                </div>
                            </form>

                            {/* Mobile Search Suggestions */}
                            {mobileSearchResults && (
                                <div ref={mobileSearchDropdownRef} className='absolute top-full left-0 right-0 mt-2 z-50 bg-gray-800/90 backdrop-blur-sm border border-gray-600/30 rounded-xl shadow-xl max-h-48 overflow-y-auto'>
                                    {
                                        mobileSearchResults.length > 0 ? (
                                            mobileSearchResults.map((result, idx) => (
                                                <div
                                                    key={idx}
                                                    onClick={() => handleStockSelect(result)}
                                                    className="px-4 py-3 border-b border-gray-600/20 last:border-b-0 hover:bg-gray-600/30 active:bg-gray-600/40 cursor-pointer transition-all duration-200"
                                                >
                                                    <p className="font-semibold text-white text-sm">{result.displaySymbol}</p>
                                                    <p className="text-gray-400 text-xs mt-1 truncate">{result.description}</p>
                                                </div>
                                            ))
                                        ) : (
                                            <div className="px-4 py-3 text-gray-400 text-sm">No results found.</div>
                                        )
                                    }
                                </div>
                            )}
                        </div>

                        {/* Spacer to push auth buttons down when search results are showing */}
                        <div className={`${mobileSearchResults ? 'mt-4' : ''}`}>
                            {/* Mobile Auth */}
                            {isLoggedIn ? (
                                <>
                                    <button
                                        onClick={handleProfileClick}
                                        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-800/50 focus:bg-gray-800/50 cursor-pointer transition-colors focus:outline-none focus:ring-2 focus:ring-white/50"
                                    >
                                        <User size={20} color="white" />
                                        <span className="text-white text-base font-medium">Profile</span>
                                    </button>
                                    <button
                                        onClick={handleLogout}
                                        className="w-full flex items-center justify-center py-3 px-6 mt-3 rounded-xl border border-red-500/30 hover:border-red-400/50 hover:bg-red-800/20 focus:bg-red-800/20 cursor-pointer transition-all focus:outline-none focus:ring-2 focus:ring-red-400/50"
                                    >
                                        <span className="text-red-300 text-base font-medium">Sign Out</span>
                                    </button>
                                </>
                            ) : (
                                <button
                                    onClick={handleSignInClick}
                                    className="w-full flex items-center justify-center py-3 px-6 mt-4 rounded-xl border border-gray-500/30 hover:border-gray-400/50 hover:bg-gray-800/30 focus:bg-gray-800/30 cursor-pointer transition-all focus:outline-none focus:ring-2 focus:ring-white/50"
                                >
                                    <span className="text-white text-base font-medium">Sign In</span>
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Navbar