import { useState } from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className="bg-white shadow-md sticky top-0 z-50 w-full border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    {/* Brand/Logo Area */}
                    <div className="shrink-0">
                        <Link to="/" className="text-xl font-bold text-gray-800 tracking-wide">
                            Food<span className="text-orange-500">Tracker</span>
                        </Link>
                    </div>

                    {/* Desktop Navigation Links */}
                    <div className="hidden md:flex items-center gap-4">
                        <Link to="/upload" className="px-4 py-2 text-sm font-medium bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition duration-200 shadow-sm">
                            Upload Food
                        </Link>
                        <Link to="/diary" className="px-4 py-2 text-sm font-medium bg-green-500 hover:bg-green-600 text-white rounded-lg transition duration-200 shadow-sm">
                            Diary
                        </Link>
                        <Link to="/goals" className="px-4 py-2 text-sm font-medium bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition duration-200 shadow-sm">
                            Goals
                        </Link>
                        <Link to="/profile" className="px-4 py-2 text-sm font-medium bg-purple-500 hover:bg-purple-600 text-white rounded-lg transition duration-200 shadow-sm">
                            Profile
                        </Link>
                    </div>

                    {/* Mobile Menu Button (Hamburger) */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={toggleMenu}
                            type="button"
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none transition duration-150"
                            aria-expanded="false"
                        >
                            <span className="sr-only">Open main menu</span>
                            {/* Dynamic Hamburger / X Icon */}
                            {isOpen ? (
                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            ) : (
                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Dropdown Menu */}
            <div className={`${isOpen ? 'block' : 'hidden'} md:hidden bg-white border-t border-gray-100`}>
                <div className="px-2 pt-2 pb-4 space-y-2 flex flex-col shadow-inner">
                    <Link 
                        to="/upload" 
                        onClick={() => setIsOpen(false)}
                        className="px-4 py-2 text-center text-sm font-medium bg-orange-500 text-white rounded-lg"
                    >
                        Upload Food
                    </Link>
                    <Link 
                        to="/diary" 
                        onClick={() => setIsOpen(false)}
                        className="px-4 py-2 text-center text-sm font-medium bg-green-500 text-white rounded-lg"
                    >
                        Diary
                    </Link>
                    <Link 
                        to="/goals" 
                        onClick={() => setIsOpen(false)}
                        className="px-4 py-2 text-center text-sm font-medium bg-blue-500 text-white rounded-lg"
                    >
                        Goals
                    </Link>
                    <Link 
                        to="/profile" 
                        onClick={() => setIsOpen(false)}
                        className="px-4 py-2 text-center text-sm font-medium bg-purple-500 text-white rounded-lg"
                    >
                        Profile
                    </Link>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;