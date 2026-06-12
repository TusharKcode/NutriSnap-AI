import { useState } from 'react';
import Footer from '../components/Footer';
import PublicNavbar from '../components/PublicNavbar';

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
            <div className="max-w-4xl mx-auto px-6 py-16">

                <h1 className="text-5xl font-bold mb-4">
                    Contact Us
                </h1>

                <p className="text-gray-600 mb-10">
                    Have questions, suggestions or feedback?
                    We'd love to hear from you.
                </p>

                {success && (
                    <div className="mb-6 p-4 bg-green-100 text-green-700 rounded-lg">
                        {success}
                    </div>
                )}

                <form
                    onSubmit={handleSubmit}
                    className="bg-white shadow rounded-xl p-8 space-y-6"
                >

                    <input
                        type="text"
                        name="name"
                        placeholder="Your Name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full border p-3 rounded"
                    />

                    <input
                        type="email"
                        name="email"
                        placeholder="Your Email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full border p-3 rounded"
                    />

                    <textarea
                        name="message"
                        rows="5"
                        placeholder="Your Message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        className="w-full border p-3 rounded"
                    />

                    <button
                        type="submit"
                        className="bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700 transition"
                    >
                        Send Message
                    </button>

                </form>

            </div>

            <Footer />
        </>
    );
}

export default Contact;