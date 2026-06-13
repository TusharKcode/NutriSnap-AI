import Footer from '../components/Footer';
import PublicNavbar from '../components/PublicNavbar';
import {
    FaCamera,
    FaChartLine,
    FaTint,
    FaWeight,
    FaRobot,
    FaBullseye,
    FaCheckCircle,
    FaRocket,
    FaUtensils,
} from 'react-icons/fa';

function About() {

    const features = [
        {
            icon: <FaCamera />,
            title: 'AI Food Recognition',
            desc: 'Identify foods instantly from photos.',
        },
        {
            icon: <FaUtensils />,
            title: 'Nutrition Tracking',
            desc: 'Track calories and macronutrients.',
        },
        {
            icon: <FaTint />,
            title: 'Water Monitoring',
            desc: 'Stay hydrated with daily goals.',
        },
        {
            icon: <FaWeight />,
            title: 'Weight Tracking',
            desc: 'Monitor weight progress over time.',
        },
        {
            icon: <FaChartLine />,
            title: 'Progress Analytics',
            desc: 'Visualize health and nutrition trends.',
        },
        {
            icon: <FaRobot />,
            title: 'AI Suggestions',
            desc: 'Receive personalized meal guidance.',
        },
    ];

    const stats = [
        {
            title: 'AI Analysis',
            value: 'Smart',
            icon: <FaCamera />,
        },
        {
            title: 'Nutrition',
            value: 'Daily',
            icon: <FaChartLine />,
        },
        {
            title: 'Hydration',
            value: 'Tracked',
            icon: <FaTint />,
        },
        {
            title: 'Insights',
            value: 'AI',
            icon: <FaRobot />,
        },
    ];

    return (
        <>
            <PublicNavbar />

            <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50">

                <div className="max-w-6xl mx-auto px-6 py-12 md:py-16">

                    {/* Hero Section */}
                    <div className="text-center mb-12 animate-fadeUp">

                        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-100 text-green-700 font-semibold text-sm">
                            <FaRobot />
                            AI Powered Nutrition Tracking
                        </span>

                        <h1 className="mt-6 text-4xl md:text-6xl font-black bg-gradient-to-r from-green-600 via-emerald-500 to-teal-500 bg-clip-text text-transparent">
                            About NutriSnapAI
                        </h1>

                        <p className="mt-5 max-w-3xl mx-auto text-gray-600 text-lg">
                            NutriSnapAI helps users build healthier eating habits
                            through intelligent food analysis, nutrition tracking,
                            hydration monitoring, progress insights and AI-powered
                            recommendations.
                        </p>

                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">

                        {stats.map((item) => (
                            <div
                                key={item.title}
                                className="bg-white rounded-3xl border border-gray-100 shadow-lg p-5 text-center hover:-translate-y-1 hover:shadow-xl transition-all duration-300"
                            >
                                <div className="flex justify-center text-green-500 text-2xl mb-3">
                                    {item.icon}
                                </div>

                                <h3 className="font-bold text-gray-800">
                                    {item.value}
                                </h3>

                                <p className="text-sm text-gray-500">
                                    {item.title}
                                </p>
                            </div>
                        ))}

                    </div>

                    {/* What We Do */}
                    <div className="mb-12">

                        <div className="text-center mb-8">
                            <h2 className="text-3xl font-black text-gray-800">
                                What We Do
                            </h2>

                            <p className="text-gray-500 mt-2">
                                Everything you need to manage nutrition and wellness.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">

                            {features.map((feature) => (
                                <div
                                    key={feature.title}
                                    className="bg-white rounded-3xl p-6 shadow-lg border border-gray-100 hover:-translate-y-1 hover:shadow-xl transition-all duration-300"
                                >
                                    <div className="text-green-500 text-3xl mb-4">
                                        {feature.icon}
                                    </div>

                                    <h3 className="font-bold text-lg text-gray-800 mb-2">
                                        {feature.title}
                                    </h3>

                                    <p className="text-gray-500 text-sm">
                                        {feature.desc}
                                    </p>
                                </div>
                            ))}

                        </div>

                    </div>

                    {/* Why Choose Us */}
                    <div className="bg-white/80 backdrop-blur rounded-3xl shadow-xl border border-white p-8 mb-12">

                        <div className="flex items-center gap-3 mb-6">
                            <FaCheckCircle className="text-green-500 text-3xl" />

                            <h2 className="text-2xl font-black text-gray-800">
                                Why Choose NutriSnapAI?
                            </h2>
                        </div>

                        <div className="grid md:grid-cols-2 gap-4 text-gray-700">

                            <div className="flex items-center gap-3">
                                <FaCheckCircle className="text-green-500" />
                                Easy food logging
                            </div>

                            <div className="flex items-center gap-3">
                                <FaCheckCircle className="text-green-500" />
                                AI-powered analysis
                            </div>

                            <div className="flex items-center gap-3">
                                <FaCheckCircle className="text-green-500" />
                                Personalized nutrition goals
                            </div>

                            <div className="flex items-center gap-3">
                                <FaCheckCircle className="text-green-500" />
                                Visual dashboards & analytics
                            </div>

                            <div className="flex items-center gap-3">
                                <FaCheckCircle className="text-green-500" />
                                Hydration & weight tracking
                            </div>

                            <div className="flex items-center gap-3">
                                <FaCheckCircle className="text-green-500" />
                                Build healthier habits daily
                            </div>

                        </div>

                    </div>

                    {/* Mission */}
                    <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-3xl p-8 text-white shadow-xl mb-10">

                        <div className="flex items-center gap-3 mb-4">
                            <FaBullseye className="text-3xl" />

                            <h2 className="text-3xl font-black">
                                Our Mission
                            </h2>
                        </div>

                        <p className="text-lg leading-relaxed text-green-50">
                            To make healthy eating simple, accessible and
                            intelligent through modern AI technology,
                            helping people achieve sustainable wellness goals.
                        </p>

                    </div>

                    {/* Future Vision */}
                    <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100">

                        <div className="flex items-center gap-3 mb-5">
                            <FaRocket className="text-purple-500 text-3xl" />

                            <h2 className="text-2xl font-black text-gray-800">
                                Future Vision
                            </h2>
                        </div>

                        <div className="grid md:grid-cols-2 gap-4 text-gray-700">

                            <div>🚀 Advanced food recognition</div>
                            <div>🤖 AI nutrition coaching</div>
                            <div>📊 Enhanced health analytics</div>
                            <div>🍽 Personalized meal planning</div>

                        </div>

                    </div>

                </div>

            </div>

            <Footer />
        </>
    );
}

export default About;