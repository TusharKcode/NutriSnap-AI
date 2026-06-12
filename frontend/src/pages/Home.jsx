import Footer from '../components/Footer';
import { Link } from "react-router-dom";

function Home() {
    return (
        <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}

            <section className="max-w-7xl mx-auto px-6 py-20">
                <div className="text-center">
                    <h1 className="text-5xl font-bold text-gray-900 mb-6">NutriSnapAI</h1>

                    <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
                        Track meals, monitor nutrition, manage hydration, track weight, and
                        receive AI-powered healthy meal recommendations.
                    </p>

                    <div className="flex justify-center gap-4">
                        <Link
                            to="/register"
                            className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                        >
                            Get Started
                        </Link>

                        <Link
                            to="/login"
                            className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-100 transition"
                        >
                            Login
                        </Link>
                    </div>
                </div>
            </section>

        {/* Features */}

            <section className="max-w-7xl mx-auto px-6 py-16">
                <h2 className="text-3xl font-bold text-center mb-12">Features</h2>

                <div className="grid md:grid-cols-3 gap-6">
                    <div className="bg-white p-6 rounded-xl shadow">
                        <h3 className="font-semibold text-lg mb-2">📸 AI Food Analysis</h3>

                        <p className="text-gray-600">
                            Upload meal photos and receive AI-powered nutrition analysis
                            instantly.
                        </p>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow">
                        <h3 className="font-semibold text-lg mb-2">🍽️ Meal Tracking</h3>

                        <p className="text-gray-600">
                            Track calories, protein, carbs and fat every day.
                        </p>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow">
                        <h3 className="font-semibold text-lg mb-2">💧 Water Tracking</h3>

                        <p className="text-gray-600">
                            Monitor daily hydration and reach your water goals.
                        </p>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow">
                        <h3 className="font-semibold text-lg mb-2">⚖️ Weight Tracking</h3>

                        <p className="text-gray-600">
                            Record weight progress and visualize trends.
                        </p>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow">
                        <h3 className="font-semibold text-lg mb-2">🎯 Goal Management</h3>

                        <p className="text-gray-600">
                            Set nutrition, hydration and weight goals.
                        </p>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow">
                        <h3 className="font-semibold text-lg mb-2">
                        🤖 AI Meal Suggestions
                        </h3>

                        <p className="text-gray-600">
                            Personalized healthy meal recommendations powered by AI.
                        </p>
                    </div>
                </div>
            </section>

        {/* How It Works */}

            <section className="bg-white py-16">
                <div className="max-w-6xl mx-auto px-6">
                    <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>

                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="text-center">
                            <h3 className="text-xl font-semibold mb-2">1. Upload</h3>

                            <p className="text-gray-600">Upload your meal image.</p>
                        </div>

                        <div className="text-center">
                            <h3 className="text-xl font-semibold mb-2">2. Analyze</h3>

                            <p className="text-gray-600">AI calculates nutritional values.</p>
                        </div>

                        <div className="text-center">
                            <h3 className="text-xl font-semibold mb-2">3. Improve</h3>

                            <p className="text-gray-600">
                                Track progress and receive suggestions.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

        {/* CTA */}

            <section className="py-20">
                <div className="text-center">
                    <h2 className="text-4xl font-bold mb-4">
                        Start Your Health Journey Today
                    </h2>

                    <p className="text-gray-600 mb-8">
                        Join NutriSnapAI and build healthier eating habits.
                    </p>

                    <Link
                        to="/register"
                        className="px-8 py-4 bg-green-600 text-white rounded-lg hover:bg-green-700"
                    >
                        Create Free Account
                    </Link>
                </div>
            </section>
            <Footer />  
        </div>
    );
}

export default Home;
