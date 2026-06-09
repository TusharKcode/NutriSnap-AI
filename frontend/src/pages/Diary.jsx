import { useEffect, useState } from 'react';
import foodService from '../services/foodService';

function Diary() {
	const [entries, setEntries] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState('');
	const [editingId, setEditingId] = useState(null);
	const [searchTerm, setSearchTerm] = useState('');
	const [mealFilter, setMealFilter] = useState('all');

	const [editForm, setEditForm] = useState({
		foodName: '',
		calories: '',
		protein: '',
		carbs: '',
		fat: '',
		mealType: '',
	});

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

	const handleEditSave = async () => {
		try {
			const response =
				await foodService.updateFood(
					editingId,
					editForm
				);

			if (response?.status === 200) {
				setEntries((prev) =>
					prev.map((entry) =>
						entry._id === editingId
							? response.data.entry
							: entry
					)
				);

				setEditingId(null);
			}
		} catch (error) {
			console.error(
				'Update failed:',
				error
			);
		}
	};

	const filteredEntries = entries.filter((entry) => {
		const matchesSearch =
			entry.foodName
				.toLowerCase()
				.includes(searchTerm.toLowerCase());

		const matchesMeal =
			mealFilter === 'all'
				? true
				: entry.mealType === mealFilter;

		return matchesSearch && matchesMeal;
	});

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

				<div className="mb-6 grid gap-4 md:grid-cols-2">
					<div className="mb-6 flex items-center justify-between flex-wrap gap-3">
						<p className="text-gray-600">
							Showing
							<span className="font-semibold mx-1">
								{filteredEntries.length}
							</span>
							of
							<span className="font-semibold mx-1">
								{entries.length}
							</span>
							entries
						</p>
						<button
							onClick={() => {
								setSearchTerm('');
								setMealFilter('all');
							}}
							className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
						>
							Clear Filters
						</button>
					</div>
					<input
						type="text"
						placeholder="Search food..."
						value={searchTerm}
						onChange={(e) =>
							setSearchTerm(e.target.value)
						}
						className={`border rounded-xl p-3 ${
							searchTerm
								? 'border-blue-500'
								: ''
						}`}
					/>

					<select
						value={mealFilter}
						onChange={(e) =>
							setMealFilter(e.target.value)
						}
						className={`border rounded-xl p-3 ${
							mealFilter !== 'all'
								? 'border-green-500'
								: ''
						}`}
					>
						<option value="all">
							All Meals
						</option>

						<option value="breakfast">
							Breakfast
						</option>

						<option value="lunch">
							Lunch
						</option>

						<option value="dinner">
							Dinner
						</option>

						<option value="snack">
							Snack
						</option>

						<option value="sweet">
							Sweet
						</option>
					</select>

				</div>

				{error && (
					<div className="mb-6 rounded-lg bg-red-50 border border-red-200 p-4 text-red-700">
						{error}
					</div>
				)}

				{filteredEntries.length === 0 ? (
					<div className="bg-white rounded-2xl shadow p-8 text-center">
						<p className="text-gray-500">
							No matching food entries found.
						</p>
					</div>
				) : (
					<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
						{filteredEntries.map((entry) => (
							<div
								key={entry._id}
								className="bg-white rounded-3xl shadow-lg border border-gray-100 p-6"
							>
								<div className="flex justify-end">
									<button
										onClick={() => {
											setEditingId(entry._id);

											setEditForm({
												foodName: entry.foodName,
												calories: entry.calories,
												protein: entry.protein,
												carbs: entry.carbs,
												fat: entry.fat,
												mealType: entry.mealType,
											});
										}}
										className="text-blue-600 font-medium"
									>
										Edit
									</button>
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

								<div className="flex flex-wrap gap-2 mb-6">
									{searchTerm && (
										<span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
											Search: {searchTerm}
										</span>
									)}

									{mealFilter !== 'all' && (
										<span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
											Meal: {mealFilter}
										</span>
									)}
								</div>
							</div>
						))}
					</div>
				)}
			</div>
			{editingId && (
				<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
					<div className="bg-white rounded-3xl p-6 w-full max-w-md">
						<h2 className="text-2xl font-bold mb-4">
							Edit Food Entry
						</h2>

						<div className="space-y-3">

							<input
								type="text"
								placeholder="Food Name"
								value={editForm.foodName}
								onChange={(e) =>
									setEditForm({
										...editForm,
										foodName: e.target.value,
									})
								}
								className="w-full border rounded-lg p-2"
							/>

							<input
								type="number"
								placeholder="Calories"
								value={editForm.calories}
								onChange={(e) =>
									setEditForm({
										...editForm,
										calories: e.target.value,
									})
								}
								className="w-full border rounded-lg p-2"
							/>

							<input
								type="number"
								placeholder="Protein"
								value={editForm.protein}
								onChange={(e) =>
									setEditForm({
										...editForm,
										protein: e.target.value,
									})
								}
								className="w-full border rounded-lg p-2"
							/>

							<input
								type="number"
								placeholder="Carbs"
								value={editForm.carbs}
								onChange={(e) =>
									setEditForm({
										...editForm,
										carbs: e.target.value,
									})
								}
								className="w-full border rounded-lg p-2"
							/>

							<input
								type="number"
								placeholder="Fat"
								value={editForm.fat}
								onChange={(e) =>
									setEditForm({
										...editForm,
										fat: e.target.value,
									})
								}
								className="w-full border rounded-lg p-2"
							/>

							<select
								value={editForm.mealType}
								onChange={(e) =>
									setEditForm({
										...editForm,
										mealType: e.target.value,
									})
								}
								className="w-full border rounded-lg p-2"
							>
								<option value="breakfast">
									Breakfast
								</option>

								<option value="lunch">
									Lunch
								</option>

								<option value="dinner">
									Dinner
								</option>

								<option value="snack">
									Snack
								</option>

								<option value="snack">
									Snack
								</option>
								
								<option value="sweet">
									Sweet
								</option>
							</select>

							<div className="flex gap-3 pt-2">
								<button
									onClick={handleEditSave}
									className="flex-1 bg-blue-600 text-white py-2 rounded-xl"
								>
									Save
								</button>

								<button
									onClick={() =>
										setEditingId(null)
									}
									className="flex-1 bg-gray-300 py-2 rounded-xl"
								>
									Cancel
								</button>
							</div>

						</div>
					</div>
				</div>
			)}
		</div>
	);
}

export default Diary;