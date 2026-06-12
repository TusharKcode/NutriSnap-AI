import { Link } from 'react-router-dom';

function Footer() {
    return (
        <footer className="bg-gray-900 text-white mt-16">

            <div className="max-w-7xl mx-auto px-6 py-10">

                <div className="grid md:grid-cols-3 gap-8">

                    {/* Brand */}

                    <div>
                        <h2 className="text-2xl font-bold">
                            NutriSnapAI
                        </h2>

                        <p className="mt-3 text-gray-400">
                            AI-powered nutrition tracking,
                            hydration monitoring,
                            weight management and
                            healthy meal recommendations.
                        </p>
                    </div>

                    {/* Quick Links */}

                    <div>
                        <h3 className="font-semibold mb-3">
                            Quick Links
                        </h3>

                        <div className="flex flex-col gap-2">

                            <Link to="/">
                                Home
                            </Link>

                            <Link to="/about">
                                About
                            </Link>

                            <Link to="/contact">
                                Contact
                            </Link>

                        </div>
                    </div>

                    {/* Tech Stack */}

                    <div>
                        <h3 className="font-semibold mb-3">
                            Built With
                        </h3>

                        <ul className="space-y-2 text-gray-400">
                            <li>React</li>
                            <li>Node.js</li>
                            <li>Express</li>
                            <li>MongoDB</li>
                            <li>Gemini AI</li>
                            <li>TailwindCSS</li>
                        </ul>
                    </div>

                </div>

                <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400">

                    © {new Date().getFullYear()} NutriSnapAI.
                    All rights reserved.

                </div>

            </div>

        </footer>
    );
}

export default Footer;