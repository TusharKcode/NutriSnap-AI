import Footer from '../components/Footer';
import PublicNavbar from '../components/PublicNavbar';
import { Link } from 'react-router-dom';
import {
    FaCamera,
    FaUtensils,
    FaTint,
    FaWeight,
    FaBullseye,
    FaRobot,
    FaArrowRight,
    FaFire,
} from 'react-icons/fa';

function Home() {
    const features = [
        {
            icon: <FaCamera />,
            title: 'AI Food Analysis',
            description:
                'Upload food photos and get instant nutritional breakdown powered by AI.',
        },
        {
            icon: <FaUtensils />,
            title: 'Meal Tracking',
            description:
                'Track calories, protein, carbs and fats effortlessly every day.',
        },
        {
            icon: <FaTint />,
            title: 'Water Tracking',
            description:
                'Monitor hydration and stay consistent with daily water goals.',
        },
        {
            icon: <FaWeight />,
            title: 'Weight Tracking',
            description:
                'Visualize weight progress and maintain healthy habits.',
        },
        {
            icon: <FaBullseye />,
            title: 'Goal Management',
            description:
                'Set personalized nutrition, hydration and fitness targets.',
        },
        {
            icon: <FaRobot />,
            title: 'AI Recommendations',
            description:
                'Receive personalized meal suggestions tailored to your goals.',
        },
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            <PublicNavbar />

            {/* Hero Section */}

            <section className="relative overflow-hidden bg-linear-to-br from-green-50 via-white to-emerald-100">
                <div className="max-w-7xl mx-auto px-6 py-24">

                    <div className="text-center">

                        <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
                            <FaFire />
                            AI-Powered Nutrition Tracking
                        </div>

                        <h1 className="text-5xl md:text-7xl font-black text-gray-900 leading-tight">
                            NutriSnap
                            <span className="bg-linear-to-r from-green-600 to-emerald-500 bg-clip-text text-transparent">
                                AI
                            </span>
                        </h1>

                        <p className="mt-6 text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
                            Track meals, monitor nutrition, manage hydration,
                            track weight and receive AI-powered healthy meal
                            recommendations.
                        </p>

                        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-10">

                            <Link
                                to="/register"
                                className="px-8 py-4 bg-green-600 hover:bg-green-700 text-white rounded-2xl shadow-lg transition-all duration-300 hover:scale-105 font-semibold"
                            >
                                Get Started Free
                            </Link>

                            <Link
                                to="/login"
                                className="px-8 py-4 bg-white border border-gray-200 rounded-2xl hover:bg-gray-100 transition-all duration-300 font-semibold"
                            >
                                Login
                            </Link>

                        </div>

                    </div>

                    {/* Stats */}

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mt-20">

                        <div className="bg-white rounded-3xl shadow-lg p-6 text-center">
                            <h3 className="text-3xl font-black text-green-600">
                                AI
                            </h3>
                            <p className="text-gray-500 text-sm">
                                Food Analysis
                            </p>
                        </div>

                        <div className="bg-white rounded-3xl shadow-lg p-6 text-center">
                            <h3 className="text-3xl font-black text-blue-600">
                                24/7
                            </h3>
                            <p className="text-gray-500 text-sm">
                                Tracking
                            </p>
                        </div>

                        <div className="bg-white rounded-3xl shadow-lg p-6 text-center">
                            <h3 className="text-3xl font-black text-orange-500">
                                Goals
                            </h3>
                            <p className="text-gray-500 text-sm">
                                Progress Monitoring
                            </p>
                        </div>

                        <div className="bg-white rounded-3xl shadow-lg p-6 text-center">
                            <h3 className="text-3xl font-black text-purple-600">
                                Smart
                            </h3>
                            <p className="text-gray-500 text-sm">
                                Recommendations
                            </p>
                        </div>

                    </div>

                </div>
            </section>

            {/* Features */}

            <section className="max-w-7xl mx-auto px-6 py-20">

                <div className="text-center mb-14">
                    <h2 className="text-4xl font-black text-gray-900">
                        Everything You Need
                    </h2>

                    <p className="text-gray-500 mt-3">
                        Designed to simplify healthy living.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

                    {features.map((feature) => (
                        <div
                            key={feature.title}
                            className="bg-white rounded-3xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100"
                        >
                            <div className="w-14 h-14 rounded-2xl bg-green-100 text-green-600 flex items-center justify-center text-2xl mb-4">
                                {feature.icon}
                            </div>

                            <h3 className="text-xl font-bold mb-2">
                                {feature.title}
                            </h3>

                            <p className="text-gray-600">
                                {feature.description}
                            </p>
                        </div>
                    ))}

                </div>

            </section>

            {/* How It Works */}

            <section className="bg-white py-20">

                <div className="max-w-6xl mx-auto px-6">

                    <div className="text-center mb-14">
                        <h2 className="text-4xl font-black text-gray-900">
                            How It Works
                        </h2>

                        <p className="text-gray-500 mt-3">
                            Start tracking in three simple steps.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">

                        <div className="bg-green-50 rounded-3xl p-8 text-center shadow-md">
                            <div className="w-16 h-16 rounded-full bg-green-600 text-white flex items-center justify-center text-2xl font-bold mx-auto mb-5">
                                1
                            </div>

                            <h3 className="text-xl font-bold mb-2">
                                Upload
                            </h3>

                            <p className="text-gray-600">
                                Upload a food image from your device.
                            </p>
                        </div>

                        <div className="bg-blue-50 rounded-3xl p-8 text-center shadow-md">
                            <div className="w-16 h-16 rounded-full bg-blue-600 text-white flex items-center justify-center text-2xl font-bold mx-auto mb-5">
                                2
                            </div>

                            <h3 className="text-xl font-bold mb-2">
                                Analyze
                            </h3>

                            <p className="text-gray-600">
                                AI calculates nutritional information instantly.
                            </p>
                        </div>

                        <div className="bg-purple-50 rounded-3xl p-8 text-center shadow-md">
                            <div className="w-16 h-16 rounded-full bg-purple-600 text-white flex items-center justify-center text-2xl font-bold mx-auto mb-5">
                                3
                            </div>

                            <h3 className="text-xl font-bold mb-2">
                                Improve
                            </h3>

                            <p className="text-gray-600">
                                Track progress and receive personalized suggestions.
                            </p>
                        </div>

                    </div>

                </div>

            </section>

            {/* CTA */}

            <section className="py-24">

                <div className="max-w-5xl mx-auto px-6">

                    <div className="bg-linear-to-r from-green-600 to-emerald-500 rounded-4xl p-10 md:p-14 text-center text-white shadow-2xl">

                        <h2 className="text-4xl md:text-5xl font-black">
                            Start Your Health Journey Today
                        </h2>

                        <p className="mt-4 text-green-50 max-w-2xl mx-auto">
                            Build healthier habits with AI-powered nutrition tracking.
                        </p>

                        <Link
                            to="/register"
                            className="inline-flex items-center gap-3 mt-8 bg-white text-green-700 px-8 py-4 rounded-2xl font-bold hover:scale-105 transition-all duration-300"
                        >
                            Create Free Account
                            <FaArrowRight />
                        </Link>

                    </div>

                </div>

            </section>

            <Footer />
        </div>
    );
}

export default Home;