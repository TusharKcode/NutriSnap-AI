import Footer from '../components/Footer';
import PublicNavbar from '../components/PublicNavbar';

function About() {
    return (
        <>
            <PublicNavbar />
            <div className="max-w-6xl mx-auto px-6 py-16">

                <h1 className="text-5xl font-bold mb-8">
                    About NutriSnapAI
                </h1>

                <p className="text-lg text-gray-600 mb-8">
                    NutriSnapAI is an AI-powered nutrition
                    tracking platform that helps users
                    build healthier eating habits through
                    intelligent food analysis and
                    personalized recommendations.
                </p>

                <div className="grid md:grid-cols-2 gap-8">

                    <div className="bg-white shadow rounded-xl p-6">

                        <h2 className="text-2xl font-semibold mb-4">
                            What We Do
                        </h2>

                        <ul className="space-y-3">
                            <li>📸 AI Food Recognition</li>
                            <li>🍽 Nutrition Tracking</li>
                            <li>💧 Water Monitoring</li>
                            <li>⚖ Weight Tracking</li>
                            <li>📊 Progress Analytics</li>
                            <li>🤖 AI Meal Suggestions</li>
                        </ul>

                    </div>

                </div>

                <div className="mt-12 bg-green-50 border border-green-200 rounded-xl p-8">

                    <h2 className="text-2xl font-semibold mb-4">
                        Our Mission
                    </h2>

                    <p className="text-gray-700">
                        To make healthy eating simple,
                        accessible and intelligent using
                        modern AI technology.
                    </p>

                </div>

            </div>

            <Footer />
        </>
    );
}

export default About;