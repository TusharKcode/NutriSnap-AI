import { useState } from 'react';
import foodService from '../services/foodService';

export default function UploadFood() {
	const [formValues, setFormValues] = useState({
		mealType: 'breakfast',
		foodName: '',
		calories: '',
		protein: '',
		carbs: '',
		fat: '',
	});

	const [imageFile, setImageFile] = useState(null);

	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState('');
	const [success, setSuccess] = useState('');

	const handleChange = (e) => {
		const { name, value } = e.target;

		setFormValues((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleImageChange = (e) => {
		setImageFile(e.target.files[0]);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		setIsLoading(true);
		setError('');
		setSuccess('');

		try {
			if (!imageFile) {
				setError('Please select an image.');
				setIsLoading(false);
				return;
			}

			const formData = new FormData();

			formData.append('image', imageFile);
			formData.append('mealType', formValues.mealType);
			formData.append('foodName', formValues.foodName);
			formData.append('calories', formValues.calories);
			formData.append('protein', formValues.protein);
			formData.append('carbs', formValues.carbs);
			formData.append('fat', formValues.fat);

			const response = await foodService.uploadFood(formData);

			if (response?.status === 200 || response?.status === 201) {
				setSuccess('Food uploaded successfully!');

				setFormValues({
					mealType: 'breakfast',
					foodName: '',
					calories: '',
					protein: '',
					carbs: '',
					fat: '',
				});

				setImageFile(null);
			} else {
				setError(
					response?.data?.message ||
					'Upload failed.'
				);
			}
		} catch (err) {
			setError(
				err?.response?.data?.message ||
				err?.message ||
				'Upload failed.'
			);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="min-h-screen bg-orange-50 py-10 px-4">
			<div className="max-w-2xl mx-auto bg-white p-8 rounded-3xl shadow-xl">

				<h1 className="text-3xl font-bold mb-6">
					Upload Food
				</h1>

				{success && (
					<div className="mb-4 p-3 bg-green-100 text-green-700 rounded">
						{success}
					</div>
				)}

				{error && (
					<div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
						{error}
					</div>
				)}

				<form
					onSubmit={handleSubmit}
					className="space-y-4"
				>

					<div>
						<label className="block mb-1 font-medium">
							Food Image
						</label>

						<input
							type="file"
							accept="image/*"
							onChange={handleImageChange}
							required
							className="w-full border rounded-lg p-2"
						/>
					</div>

					<div>
						<label className="block mb-1 font-medium">
							Meal Type
						</label>

						<select
							name="mealType"
							value={formValues.mealType}
							onChange={handleChange}
							className="w-full border rounded-lg p-2"
						>
							<option value="breakfast">Breakfast</option>
							<option value="lunch">Lunch</option>
							<option value="dinner">Dinner</option>
							<option value="snack">Snack</option>
						</select>
					</div>

					<input
						type="text"
						name="foodName"
						placeholder="Food Name"
						value={formValues.foodName}
						onChange={handleChange}
						className="w-full border rounded-lg p-2"
					/>

					<input
						type="number"
						name="calories"
						placeholder="Calories"
						value={formValues.calories}
						onChange={handleChange}
						className="w-full border rounded-lg p-2"
					/>

					<input
						type="number"
						name="protein"
						placeholder="Protein (g)"
						value={formValues.protein}
						onChange={handleChange}
						className="w-full border rounded-lg p-2"
					/>

					<input
						type="number"
						name="carbs"
						placeholder="Carbs (g)"
						value={formValues.carbs}
						onChange={handleChange}
						className="w-full border rounded-lg p-2"
					/>

					<input
						type="number"
						name="fat"
						placeholder="Fat (g)"
						value={formValues.fat}
						onChange={handleChange}
						className="w-full border rounded-lg p-2"
					/>

					<button
						type="submit"
						disabled={isLoading}
						className="w-full bg-orange-600 text-white py-3 rounded-xl"
					>
						{isLoading
							? 'Uploading...'
							: 'Upload Food'}
					</button>

				</form>
			</div>
		</div>
	);
}