import { useEffect, useState } from 'react';
import userService from '../services/userService';

function Goals() {
	const [goals, setGoals] = useState({
		calorieGoal: '',
		proteinGoal: '',
		carbGoal: '',
		fatGoal: '',
		waterGoal: '',
		weightGoal: ''
	});

	const [loading, setLoading] = useState(true);
	const [saving, setSaving] = useState(false);
	const [message, setMessage] = useState('');
	const [error, setError] = useState('');

	const loadGoals = async () => {
		setLoading(true);

		try {
			const response = await userService.getGoals();

			if (response?.status === 200) {
				setGoals(response.data.goals);
			}
		} catch (err) {
			setError('Failed to load goals', err);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		const initialize = async () => {
			await loadGoals();
		};

		initialize();
	}, []);

	const handleChange = (e) => {
		setGoals({
			...goals,
			[e.target.name]: Number(e.target.value),
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		setSaving(true);
		setMessage('');
		setError('');

		try {
			const response = await userService.updateGoals(goals);

			if (response?.status === 200) {
				setMessage('Goals updated successfully');
			} else {
				setError(response?.data?.message || 'Update failed');
			}
		} catch {
			setError('Failed to update goals');
		} finally {
			setSaving(false);
		}
	};

	if (loading) {
		return (
			<div className="p-10 text-center">
				Loading goals...
			</div>
		);
	}

	return (
		<div className="max-w-2xl mx-auto p-6">
			<h1 className="text-3xl font-bold mb-6">
				Nutrition Goals
			</h1>

			{message && (
				<div className="mb-4 p-3 bg-green-100 text-green-700 rounded">
					{message}
				</div>
			)}

			{error && (
				<div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
					{error}
				</div>
			)}

			<form onSubmit={handleSubmit} className="space-y-4">

				<input
					type="number"
					name="calorieGoal"
					value={goals.calorieGoal}
					onChange={handleChange}
					placeholder="Calories Goal"
					className="w-full border p-3 rounded"
				/>

				<input
					type="number"
					name="proteinGoal"
					value={goals.proteinGoal}
					onChange={handleChange}
					placeholder="Protein Goal"
					className="w-full border p-3 rounded"
				/>

				<input
					type="number"
					name="carbGoal"
					value={goals.carbGoal}
					onChange={handleChange}
					placeholder="Carbs Goal"
					className="w-full border p-3 rounded"
				/>

				<input
					type="number"
					name="fatGoal"
					value={goals.fatGoal}
					onChange={handleChange}
					placeholder="Fat Goal"
					className="w-full border p-3 rounded"
				/>

				<input
					type="number"
					name="waterGoal"
					value={goals.waterGoal}
					onChange={handleChange}
					placeholder="Water Goal (ml)"
					className="w-full border p-3 rounded"
				/>

				<input
					type="number"
					name="weightGoal"
					value={goals.weightGoal}
					onChange={handleChange}
					placeholder="Weight Goal (kg)"
					className="w-full border p-3 rounded"
				/>

				<button
					type="submit"
					disabled={saving}
					className="bg-blue-600 text-white px-6 py-3 rounded"
				>
					{saving ? 'Saving...' : 'Save Goals'}
				</button>
			</form>
		</div>
	);
}

export default Goals;