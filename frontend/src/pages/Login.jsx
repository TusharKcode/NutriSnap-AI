import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import PublicNavbar from '../components/PublicNavbar';

export default function Login() {
	const navigate = useNavigate();
	const { login } = useAuth();

	const [formValues, setFormValues] = useState({
		email: '',
		password: '',
	});
	const [isLoading, setIsLoading] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormValues((prev) => ({
			...prev,
			[name]: value,
		}));
		// Clear error when user starts typing
		if (errorMessage) setErrorMessage('');
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setIsLoading(true);
		setErrorMessage('');

		try {
			const response = await login(formValues);

			if (response?.status === 200) {
				navigate('/dashboard');
			} else {
				const errorMsg = response?.data?.message || 'Login failed. Please try again.';
				setErrorMessage(errorMsg);
			}
		} catch (error) {
			setErrorMessage(
				error?.response?.data?.message || error?.message || 'An error occurred. Please try again.'
			);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="flex items-center justify-center min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 px-4 sm:px-6 lg:px-8">
			<PublicNavbar />
			<div className="w-full max-w-md">
				{/* Card */}
				<div className="bg-white rounded-lg shadow-2xl p-8 space-y-6">
					{/* Header */}
					<div className="text-center">
						<h1 className="text-3xl font-bold text-gray-900">NutriSnap</h1>
						<p className="text-gray-600 mt-2 text-sm">Sign in to your account</p>
					</div>

					{/* Error Message */}
					{errorMessage && (
						<div className="bg-red-50 border border-red-200 rounded-lg p-3">
							<p className="text-red-700 text-sm">{errorMessage}</p>
						</div>
					)}

					{/* Form */}
					<form onSubmit={handleSubmit} className="space-y-4">
						{/* Email Field */}
						<div>
							<label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
								Email Address
							</label>
							<input
								type="email"
								id="email"
								name="email"
								value={formValues.email}
								onChange={handleChange}
								placeholder="you@example.com"
								required
								className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
							/>
						</div>

						{/* Password Field */}
						<div>
							<label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
								Password
							</label>
							<input
								type="password"
								id="password"
								name="password"
								value={formValues.password}
								onChange={handleChange}
								placeholder="••••••••"
								required
								className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
							/>
						</div>

						{/* Login Button */}
						<button
							type="submit"
							disabled={isLoading}
							className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400 text-white font-medium py-2 px-4 rounded-lg transition duration-200 flex items-center justify-center gap-2"
						>
							{isLoading ? (
								<>
									<svg
										className="animate-spin h-5 w-5"
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
									>
										<circle
											className="opacity-25"
											cx="12"
											cy="12"
											r="10"
											stroke="currentColor"
											strokeWidth="4"
										></circle>
										<path
											className="opacity-75"
											fill="currentColor"
											d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
										></path>
									</svg>
									Signing in...
								</>
							) : (
								'Sign In'
							)}
						</button>
					</form>

					{/* Footer Link */}
					<div className="text-center text-sm text-gray-600">
						Don't have an account?{' '}
						<button
							onClick={() => navigate('/register')}
							className="text-indigo-600 hover:text-indigo-700 font-medium transition"
						>
							Sign up
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}