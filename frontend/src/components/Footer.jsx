import { Link } from 'react-router-dom';
import { FaRobot, FaReact, FaNodeJs, FaDatabase, FaGithub, FaEnvelope,} from 'react-icons/fa';
import { SiExpress, SiTailwindcss } from 'react-icons/si';

function Footer() {
    return (
        <footer className="bg-gray-950 text-white mt-16">
            <div className="max-w-7xl mx-auto px-6 py-12">
                <div className="grid md:grid-cols-3 gap-10">

                    {/* Brand */}
                    <div>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="h-12 w-12 rounded-2xl bg-linear-to-r from-green-500 to-emerald-600 flex items-center justify-center shadow-lg">
                                <FaRobot className="text-white text-xl" />
                            </div>

                            <div>
                                <h2 className="text-2xl font-black bg-linear-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
                                    NutriSnapAI
                                </h2>

                                <p className="text-xs text-gray-500">
                                    AI Nutrition Assistant
                                </p>
                            </div>
                        </div>

                        <p className="text-gray-400 leading-relaxed max-w-sm">
                            AI-powered nutrition tracking, hydration monitoring,
                            weight management and personalized meal recommendations
                            designed to help users build healthier habits.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="font-bold text-lg mb-4">
                            Quick Links
                        </h3>

                        <div className="flex flex-col gap-3">
                            <Link
                                to="/"
                                className="text-gray-400 hover:text-green-400 transition"
                            >
                                Home
                            </Link>

                            <Link
                                to="/about"
                                className="text-gray-400 hover:text-green-400 transition"
                            >
                                About
                            </Link>

                            <Link
                                to="/contact"
                                className="text-gray-400 hover:text-green-400 transition"
                            >
                                Contact
                            </Link>

                            <Link
                                to="/login"
                                className="text-gray-400 hover:text-green-400 transition"
                            >
                                Login
                            </Link>
                        </div>
                    </div>

                    {/* Built With */}
                    <div>
                        <h3 className="font-bold text-lg mb-4">
                            Built With
                        </h3>

                        <div className="flex flex-wrap gap-3">
                            <span className="tech-badge">
                                <FaReact />
                                React
                            </span>

                            <span className="tech-badge">
                                <FaNodeJs />
                                Node.js
                            </span>

                            <span className="tech-badge">
                                <SiExpress />
                                Express
                            </span>

                            <span className="tech-badge">
                                <FaDatabase />
                                MongoDB
                            </span>

                            <span className="tech-badge">
                                <FaRobot />
                                Gemini AI
                            </span>

                            <span className="tech-badge">
                                <SiTailwindcss />
                                Tailwind
                            </span>
                        </div>

                        <div className="flex gap-4 mt-6">
                            <button className="footer-icon">
                                <Link
                                    to="https://github.com/TusharKcode"
                                >
                                    <FaGithub />
                                </Link>
                            </button>

                            <button className="footer-icon">
                                <FaEnvelope />
                            </button>
                        </div>
                    </div>

                </div>

                {/* Bottom Bar */}
                <div className="border-t border-gray-800 mt-10 pt-6">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-3 text-sm text-gray-500">
                        <p>
                            © {new Date().getFullYear()} NutriSnapAI.
                            All rights reserved.
                        </p>

                        <p>
                            Built with ❤️ using React, Node.js & AI
                        </p>
                    </div>
                </div>

            </div>
        </footer>
    );
}

export default Footer;