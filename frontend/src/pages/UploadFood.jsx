import { useState } from 'react';
import foodService from '../services/foodService';

export default function UploadFood() {
	const [formValues, setFormValues] = useState({
		imageUrl: '',
		mealType: 'breakfast',
		foodName: '',
		calories: '',
		protein: '',
		carbs: '',
		fat: '',
	});
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState('');
	const [success, setSuccess] = useState('');

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormValues((prev) => ({
			...prev,
			[name]: value,
		}));
		if (error) setError('');
		if (success) setSuccess('');
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setIsLoading(true);
		setError('');
		setSuccess('');

		try {
			const response = await foodService.uploadFood(formValues);

			if (response?.status === 200 || response?.status === 201) {
				setSuccess('Food entry uploaded successfully!');
				setFormValues({
					imageUrl: '',
					mealType: 'breakfast',
					foodName: '',
					calories: '',
					protein: '',
					carbs: '',
					fat: '',
				});
				setTimeout(() => setSuccess(''), 4000);
			} else {
				const errorMsg = response?.data?.message || 'Upload failed. Please try again.';
				setError(errorMsg);
			}
		} catch (err) {
			setError(err?.response?.data?.message || err?.message || 'An error occurred. Please try again.');
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="min-h-screen bg-linear-to-br from-orange-50 to-amber-100 px-4 sm:px-6 lg:px-8 py-12">
			<div className="max-w-2xl mx-auto">
				{/* Header */}
				<div className="text-center mb-8">
					<h1 className="text-4xl font-bold text-gray-900">Log Your Food</h1>
					<p className="text-gray-600 mt-2">Track your daily nutrition intake</p>
				</div>

				{/* Card */}
				<div className="bg-white rounded-3xl shadow-2xl p-8 space-y-6">
					{/* Success Message */}
					{success && (
						<div className="bg-green-50 border border-green-200 rounded-lg p-4">
							<p className="text-green-700 font-medium">{success}</p>
						</div>
					)}

					{/* Error Message */}
					{error && (
						<div className="bg-red-50 border border-red-200 rounded-lg p-4">
							<p className="text-red-700 text-sm">{error}</p>
						</div>
					)}

					{/* Form */}
					<form onSubmit={handleSubmit} className="space-y-5">
						{/* Image URL */}
						<div>
							<label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700 mb-1">
								Image URL
							</label>
							<input
								type="url"
								id="imageUrl"
								name="imageUrl"
								value={formValues.imageUrl}
								onChange={handleChange}
								placeholder="https://example.com/food.jpg"
                                required
								className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition"
							/>
						</div>

						{/* Meal Type */}
						<div>
							<label htmlFor="mealType" className="block text-sm font-medium text-gray-700 mb-1">
								Meal Type
							</label>
							<select
								id="mealType"
								name="mealType"
								value={formValues.mealType}
								onChange={handleChange}
								className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition"
							>
								<option value="breakfast">Breakfast</option>
								<option value="lunch">Lunch</option>
								<option value="dinner">Dinner</option>
								<option value="snack">Snack</option>
							</select>
						</div>

						{/* Food Name */}
						<div>
							<label htmlFor="foodName" className="block text-sm font-medium text-gray-700 mb-1">
								Food Name
							</label>
							<input
								type="text"
								id="foodName"
								name="foodName"
								value={formValues.foodName}
								onChange={handleChange}
								placeholder="e.g., Chicken Salad"
								className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition"
							/>
						</div>

						{/* Macro Grid */}
						<div className="grid gap-4 sm:grid-cols-2">
							{/* Calories */}
							<div>
								<label htmlFor="calories" className="block text-sm font-medium text-gray-700 mb-1">
									Calories
								</label>
								<input
									type="number"
									id="calories"
									name="calories"
									value={formValues.calories}
									onChange={handleChange}
									placeholder="0"
									className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition"
								/>
							</div>

							{/* Protein */}
							<div>
								<label htmlFor="protein" className="block text-sm font-medium text-gray-700 mb-1">
									Protein (g)
								</label>
								<input
									type="number"
									id="protein"
									name="protein"
									value={formValues.protein}
									onChange={handleChange}
									placeholder="0"
									className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition"
								/>
							</div>

							{/* Carbs */}
							<div>
								<label htmlFor="carbs" className="block text-sm font-medium text-gray-700 mb-1">
									Carbs (g)
								</label>
								<input
									type="number"
									id="carbs"
									name="carbs"
									value={formValues.carbs}
									onChange={handleChange}
									placeholder="0"
									className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition"
								/>
							</div>

							{/* Fat */}
							<div>
								<label htmlFor="fat" className="block text-sm font-medium text-gray-700 mb-1">
									Fat (g)
								</label>
								<input
									type="number"
									id="fat"
									name="fat"
									value={formValues.fat}
									onChange={handleChange}
									placeholder="0"
									className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition"
								/>
							</div>
						</div>

						{/* Submit Button */}
						<button
							type="submit"
							disabled={isLoading}
							className="w-full bg-orange-600 hover:bg-orange-700 disabled:bg-gray-400 text-white font-medium py-2 px-4 rounded-lg transition duration-200 flex items-center justify-center gap-2"
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
									Uploading...
								</>
							) : (
								'Log Food'
							)}
						</button>
					</form>
				</div>
			</div>
		</div>
	);
}