import { useState } from 'react';
import { Link } from 'react-router-dom';

import {
    FaUtensils,
    FaBookOpen,
    FaBullseye,
    FaUserCircle,
    FaBars,
    FaTimes,
    FaAppleAlt,
} from 'react-icons/fa';

function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    const navLinks = [
        {
            name: 'Upload',
            path: '/upload',
            icon: <FaUtensils />,
        },
        {
            name: 'Diary',
            path: '/diary',
            icon: <FaBookOpen />,
        },
        {
            name: 'Goals',
            path: '/goals',
            icon: <FaBullseye />,
        },
        {
            name: 'Profile',
            path: '/profile',
            icon: <FaUserCircle />,
        },
    ];

    return (
        <nav
            className="
                sticky top-0 z-50
                backdrop-blur-xl
                bg-white/80
                border-b border-white/20
                shadow-lg
            "
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="h-18 flex items-center justify-between">

                    {/* Logo */}

                    <Link
                        to="/"
                        className="
                            flex items-center gap-3
                            group
                        "
                    >
                        <div
                            className="
                                h-11 w-11
                                rounded-2xl
                                bg-linear-to-br
                                from-green-500
                                via-emerald-500
                                to-blue-500
                                flex items-center justify-center
                                text-white
                                shadow-lg
                                group-hover:scale-110
                                transition-all duration-300
                            "
                        >
                            <FaAppleAlt />
                        </div>

                        <div>
                            <h1
                                className="
                                    text-xl
                                    md:text-2xl
                                    font-black
                                    tracking-tight
                                    bg-linear-to-r
                                    from-green-600
                                    via-blue-600
                                    to-purple-600
                                    bg-clip-text
                                    text-transparent
                                "
                            >
                                FoodTracker
                            </h1>

                            <p className="text-xs text-gray-500">
                                Smart Nutrition Dashboard
                            </p>
                        </div>
                    </Link>

                    {/* Desktop Nav */}

                    <div className="hidden lg:flex items-center gap-2">

                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                to={link.path}
                                className="
                                    flex items-center gap-2
                                    px-4 py-2
                                    rounded-xl
                                    text-gray-700
                                    font-medium
                                    hover:bg-green-50
                                    hover:text-green-600
                                    transition-all duration-300
                                    hover:-translate-y-0.5
                                "
                            >
                                {link.icon}
                                {link.name}
                            </Link>
                        ))}
                    </div>

                    {/* Mobile Toggle */}

                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="
                            lg:hidden
                            h-11 w-11
                            rounded-xl
                            bg-white
                            shadow-md
                            flex items-center justify-center
                            text-gray-700
                            hover:scale-105
                            transition
                        "
                    >
                        {isOpen ? (
                            <FaTimes size={20} />
                        ) : (
                            <FaBars size={20} />
                        )}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}

            <div
                className={`
                    lg:hidden
                    overflow-hidden
                    transition-all
                    duration-300
                    ${isOpen ? 'max-h-96' : 'max-h-0'}
                `}
            >
                <div
                    className="
                        px-4 pb-4
                        bg-white/95
                        backdrop-blur-lg
                    "
                >
                    <div className="space-y-3">

                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                to={link.path}
                                onClick={() =>
                                    setIsOpen(false)
                                }
                                className="
                                    flex items-center gap-3
                                    px-4 py-3
                                    rounded-xl
                                    bg-gray-50
                                    hover:bg-green-50
                                    hover:text-green-600
                                    transition-all
                                "
                            >
                                {link.icon}
                                {link.name}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;