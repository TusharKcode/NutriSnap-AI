import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
    FaBars,
    FaTimes,
    FaLeaf,
} from 'react-icons/fa';

function PublicNavbar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="sticky top-0 z-50 backdrop-blur-xl bg-white/80 border-b border-gray-200 shadow-sm">

            <div className="max-w-7xl mx-auto px-6">

                <div className="flex items-center justify-between h-18">

                    {/* Logo */}

                    <Link
                        to="/"
                        className="flex items-center gap-3 group"
                    >
                        <div className="w-10 h-10 rounded-xl bg-linear-to-r from-green-500 to-emerald-600 flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-all duration-300">
                            <FaLeaf />
                        </div>

                        <div>
                            <h1 className="text-xl font-black text-gray-900">
                                Nutri
                                <span className="text-green-600">
                                    SnapAI
                                </span>
                            </h1>
                        </div>
                    </Link>

                    {/* Desktop Menu */}

                    <div className="hidden md:flex items-center gap-2">

                        <Link
                            to="/"
                            className="px-4 py-2 rounded-xl text-gray-700 hover:bg-green-50 hover:text-green-600 transition-all duration-300 font-medium"
                        >
                            Home
                        </Link>

                        <Link
                            to="/about"
                            className="px-4 py-2 rounded-xl text-gray-700 hover:bg-green-50 hover:text-green-600 transition-all duration-300 font-medium"
                        >
                            About
                        </Link>

                        <Link
                            to="/contact"
                            className="px-4 py-2 rounded-xl text-gray-700 hover:bg-green-50 hover:text-green-600 transition-all duration-300 font-medium"
                        >
                            Contact
                        </Link>

                        <div className="w-px h-8 bg-gray-200 mx-2" />

                        <Link
                            to="/login"
                            className="px-5 py-2.5 rounded-xl border border-gray-300 bg-white hover:bg-gray-100 transition-all duration-300 font-semibold text-gray-700"
                        >
                            Login
                        </Link>

                        <Link
                            to="/register"
                            className="px-5 py-2.5 rounded-xl bg-linear-to-r from-green-600 to-emerald-500 text-white shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 font-semibold"
                        >
                            Get Started
                        </Link>

                    </div>

                    {/* Mobile Toggle */}

                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="md:hidden w-10 h-10 rounded-xl bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-all duration-300"
                    >
                        {isOpen ? (
                            <FaTimes size={18} />
                        ) : (
                            <FaBars size={18} />
                        )}
                    </button>

                </div>

            </div>

            {/* Mobile Menu */}

            {isOpen && (
                <div className="md:hidden border-t border-gray-200 bg-white/95 backdrop-blur-xl animate-fadeIn">

                    <div className="px-6 py-5 space-y-3">

                        <Link
                            to="/"
                            onClick={() => setIsOpen(false)}
                            className="block px-4 py-3 rounded-xl hover:bg-green-50 hover:text-green-600 transition-all duration-300 font-medium"
                        >
                            Home
                        </Link>

                        <Link
                            to="/about"
                            onClick={() => setIsOpen(false)}
                            className="block px-4 py-3 rounded-xl hover:bg-green-50 hover:text-green-600 transition-all duration-300 font-medium"
                        >
                            About
                        </Link>

                        <Link
                            to="/contact"
                            onClick={() => setIsOpen(false)}
                            className="block px-4 py-3 rounded-xl hover:bg-green-50 hover:text-green-600 transition-all duration-300 font-medium"
                        >
                            Contact
                        </Link>

                        <div className="border-t border-gray-200 my-3" />

                        <Link
                            to="/login"
                            onClick={() => setIsOpen(false)}
                            className="block text-center px-4 py-3 rounded-xl border border-gray-300 hover:bg-gray-100 transition-all duration-300 font-semibold"
                        >
                            Login
                        </Link>

                        <Link
                            to="/register"
                            onClick={() => setIsOpen(false)}
                            className="block text-center px-4 py-3 rounded-xl bg-linear-to-r from-green-600 to-emerald-500 text-white shadow-lg font-semibold"
                        >
                            Get Started
                        </Link>

                    </div>

                </div>
            )}

        </nav>
    );
}

export default PublicNavbar;