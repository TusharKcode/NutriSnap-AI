import { useState } from 'react';
import { Link } from 'react-router-dom';

function PublicNavbar() {

    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="bg-white shadow-md sticky top-0 z-50">

            <div className="max-w-7xl mx-auto px-4">

                <div className="flex justify-between items-center h-16">

                    <Link
                        to="/"
                        className="text-xl font-bold"
                    >
                        Nutri
                        <span className="text-green-600">
                            SnapAI
                        </span>
                    </Link>

                    <div className="hidden md:flex items-center gap-6">

                        <Link
                            to="/"
                            className="hover:text-green-600"
                        >
                            Home
                        </Link>

                        <Link
                            to="/about"
                            className="hover:text-green-600"
                        >
                            About
                        </Link>

                        <Link
                            to="/contact"
                            className="hover:text-green-600"
                        >
                            Contact
                        </Link>

                        <Link
                            to="/login"
                            className="px-4 py-2 border rounded-lg hover:bg-gray-100"
                        >
                            Login
                        </Link>

                        <Link
                            to="/register"
                            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                        >
                            Register
                        </Link>

                    </div>

                    <button
                        onClick={() =>
                            setIsOpen(!isOpen)
                        }
                        className="md:hidden"
                    >
                        ☰
                    </button>

                </div>

            </div>

            {isOpen && (
                <div className="md:hidden border-t bg-white">

                    <div className="flex flex-col p-4 gap-3">

                        <Link
                            to="/"
                            onClick={() => setIsOpen(false)}
                        >
                            Home
                        </Link>

                        <Link
                            to="/about"
                            onClick={() => setIsOpen(false)}
                        >
                            About
                        </Link>

                        <Link
                            to="/contact"
                            onClick={() => setIsOpen(false)}
                        >
                            Contact
                        </Link>

                        <Link
                            to="/login"
                            onClick={() => setIsOpen(false)}
                        >
                            Login
                        </Link>

                        <Link
                            to="/register"
                            onClick={() => setIsOpen(false)}
                        >
                            Register
                        </Link>

                    </div>

                </div>
            )}

        </nav>
    );
}

export default PublicNavbar;