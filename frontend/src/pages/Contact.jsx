import { useState } from 'react';
import Footer from '../components/Footer';
import PublicNavbar from '../components/PublicNavbar';
import { FaUser, FaEnvelope, FaCommentDots, FaPaperPlane, FaLightbulb, FaBug } from 'react-icons/fa';

function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    });

    const [success, setSuccess] = useState('');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        setSuccess(
            'Thank you for contacting us! We will get back to you soon.'
        );

        setFormData({
            name: '',
            email: '',
            message: '',
        });
    };

    return (
        <>
            <PublicNavbar />
            
            {/* Background wrapper covering full content area */}
            <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-100 relative overflow-hidden py-16">
                <div className="absolute top-20 left-20 h-72 w-72 bg-green-300/20 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-20 right-20 h-72 w-72 bg-emerald-300/20 rounded-full blur-3xl animate-pulse" />
                
                <div className="relative z-10 max-w-5xl mx-auto px-6">
                    {/* Header section */}
                    <div className="text-center mb-12 animate-fadeUp">
                        <div className="h-20 w-20 mx-auto rounded-3xl bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center text-white text-3xl shadow-xl mb-6 animate-float">
                            <FaCommentDots />
                        </div>

                        <h1 className="text-4xl md:text-6xl font-black bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                            Contact Us
                        </h1>

                        <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
                            Questions, feedback, feature requests, or bug reports?
                            We'd love to hear from you.
                        </p>
                    </div>

                    {/* Success Alert */}
                    {success && (
                        <div className="mb-8 p-4 border border-green-200 bg-green-50 text-green-700 rounded-2xl shadow-sm animate-fadeUp">
                            {success}
                        </div>
                    )}

                    {/* Contact Form */}
                    <form
                        onSubmit={handleSubmit}
                        className="bg-white/80 backdrop-blur-xl border border-white/30 rounded-3xl shadow-2xl p-8 space-y-6"
                    >
                        {/* Name Input Container */}
                        <div className="relative flex items-center">
                            <FaUser className="absolute left-4 text-gray-400 pointer-events-none" />
                            <input
                                type="text"
                                name="name"
                                placeholder="Your Name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                className="w-full pl-12 pr-4 py-3 rounded-2xl border border-gray-200 bg-white/70 focus:ring-4 focus:ring-green-100 focus:border-green-500 transition-all outline-none"
                            />
                        </div>

                        {/* Email Input Container */}
                        <div className="relative flex items-center">
                            <FaEnvelope className="absolute left-4 text-gray-400 pointer-events-none" />
                            <input
                                type="email"
                                name="email"
                                placeholder="Your Email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="w-full pl-12 pr-4 py-3 rounded-2xl border border-gray-200 bg-white/70 focus:ring-4 focus:ring-green-100 focus:border-green-500 transition-all outline-none"
                            />
                        </div>

                        {/* Message Input Container */}
                        <div className="relative">
                            <FaCommentDots className="absolute left-4 top-4 text-gray-400 pointer-events-none" />
                            <textarea
                                name="message"
                                rows="6"
                                placeholder="Your Message"
                                value={formData.message}
                                onChange={handleChange}
                                required
                                className="w-full pl-12 pr-4 py-3 rounded-2xl border border-gray-200 bg-white/70 resize-none focus:ring-4 focus:ring-green-100 focus:border-green-500 transition-all outline-none"
                            />
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="w-full py-3 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold flex items-center justify-center gap-2 shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all"
                        >
                            <FaPaperPlane className="text-sm" />
                            Send Message
                        </button>
                    </form>

                    {/* Contact Info Cards */}
                    <div className="grid md:grid-cols-3 gap-5 mt-8">
                        {/* Card 1 */}
                        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-lg border border-white/30 p-5 text-center hover:-translate-y-1 transition-all flex flex-col items-center justify-center">
                            <div className="h-12 w-12 rounded-2xl bg-green-100 text-green-600 flex items-center justify-center text-xl mb-3">
                                <FaEnvelope />
                            </div>
                            <h3 className="font-bold text-gray-800 text-lg mb-1">Email Support</h3>
                            <p className="text-sm text-green-600 font-medium">support@nutrisnap.com</p>
                        </div>

                        {/* Card 2 */}
                        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-lg border border-white/30 p-5 text-center hover:-translate-y-1 transition-all flex flex-col items-center justify-center">
                            <div className="h-12 w-12 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center text-xl mb-3">
                                <FaLightbulb />
                            </div>
                            <h3 className="font-bold text-gray-800 text-lg mb-1">Feature Requests</h3>
                            <p className="text-sm text-gray-500">Share new ideas</p>
                        </div>

                        {/* Card 3 */}
                        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-lg border border-white/30 p-5 text-center hover:-translate-y-1 transition-all flex flex-col items-center justify-center">
                            <div className="h-12 w-12 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center text-xl mb-3">
                                <FaBug />
                            </div>
                            <h3 className="font-bold text-gray-800 text-lg mb-1">Bug Reports</h3>
                            <p className="text-sm text-gray-500">Help improve NutriSnap</p>
                        </div>
                    </div>

                </div>
            </div>

            <Footer />
        </>
    );
}

export default Contact;