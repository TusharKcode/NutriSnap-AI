import { useEffect, useState } from 'react';
import foodService from '../services/foodService';

function Diary() {
	const [entries, setEntries] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState('');

	const loadDiary = async () => {
		setLoading(true);
		setError('');

		try {
			console.log('Stored Token:', localStorage.getItem('authToken'));

			const response = await foodService.getDiary();

			console.log('Diary Response:', response);
			console.log('Diary Data:', response?.data);
			console.log('Diary Status:', response?.status);

			if (response?.status === 200) {
				setEntries(response.data.entries || []);
			} else {
				setError(
					response?.data?.message ||
					`Request failed with status ${response?.status}`
				);
			}
		} catch (err) {
			console.error('Diary Error:', err);

			setError(
				err?.response?.data?.message ||
				err?.message ||
				'Failed to load diary entries.'
			);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		const initialize = async () => {
			await loadDiary();
		};

		initialize();
	}, []);

	if (loading) {
		return (
			<div className="p-10 text-center">
				Loading diary...
			</div>
		);
	}

	const handleDelete = async (id) => {
		try {
			const response =
				await foodService.deleteFood(id);

			if (response?.status === 200) {
				setEntries((prev) =>
					prev.filter(
						(entry) => entry._id !== id
					)
				);
			}
		} catch (error) {
			console.error(
				'Delete failed:',
				error
			);
		}
	};

	return (
		<div className="min-h-screen bg-gray-50 p-6">
			<div className="max-w-6xl mx-auto">
				<div className="mb-8">
					<h1 className="text-4xl font-bold text-gray-900">
						Food Diary
					</h1>

					<p className="text-gray-600 mt-2">
						View all tracked meals.
					</p>
				</div>

				{error && (
					<div className="mb-6 rounded-lg bg-red-50 border border-red-200 p-4 text-red-700">
						{error}
					</div>
				)}

				{entries.length === 0 ? (
					<div className="bg-white rounded-2xl shadow p-8 text-center">
						<p className="text-gray-500">
							No food entries found.
						</p>
					</div>
				) : (
					<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
						{entries.map((entry) => (
							<div
								key={entry._id}
								className="bg-white rounded-3xl shadow-lg border border-gray-100 p-6"
							>
								<div className="flex justify-end">
									<button
										onClick={() =>
											handleDelete(entry._id)
										}
										className="text-red-600 text-sm font-medium hover:text-red-800"
									>
										Delete
									</button>
								</div>
								<h2 className="text-2xl font-bold mb-3">
									🥗 {entry.foodName}
								</h2>

								<div className="space-y-2 text-gray-700">
									<p>
										<strong>Calories:</strong> {entry.calories} kcal
									</p>

									<p>
										<strong>Protein:</strong> {entry.protein}g
									</p>

									<p>
										<strong>Carbs:</strong> {entry.carbs}g
									</p>

									<p>
										<strong>Fat:</strong> {entry.fat}g
									</p>

									<p>
										<strong>Meal:</strong>{' '}
										{entry.mealType
											? entry.mealType.charAt(0).toUpperCase() +
											entry.mealType.slice(1)
											: 'N/A'}
									</p>

									<p>
										<strong>Date:</strong>{' '}
										{new Date(entry.createdAt).toLocaleDateString()}
									</p>
								</div>

								{entry.imageUrl && (
									<img
										src={entry.imageUrl}
										alt={entry.foodName}
										className="mt-4 h-48 w-full object-cover rounded-xl"
									/>
								)}
							</div>
						))}
					</div>
				)}
			</div>
		</div>
	);
}

export default Diary;