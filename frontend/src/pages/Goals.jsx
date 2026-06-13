import { useEffect, useState } from 'react';
import userService from '../services/userService';
import AppNavbar from '../components/AppNavbar';
import { FaFire, FaDrumstickBite, FaBreadSlice, FaCheese, FaTint,FaWeight, FaBullseye, FaSave, FaCheckCircle, FaExclamationCircle,} from 'react-icons/fa';

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
			[e.target.name]:
				e.target.value === ''
					? ''
					: Number(e.target.value),
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
				setMessage('Goals updated successfully 🎉');
				await loadGoals();
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
		<>
			<AppNavbar/>
			<div className="min-h-screen bg-linear-to-br from-orange-50 via-white to-blue-50 py-10 px-4">

				<div className="max-w-4xl mx-auto">
					{/* Header */}
					<div className="text-center mb-10 animate-fadeIn">
						<div className="h-24 w-24 mx-auto rounded-full bg-linear-to-r from-orange-500 to-red-500 flex items-center justify-center text-white shadow-2xl animate-float">
							<FaBullseye size={38} />
						</div>

						<h1 className="mt-5 text-5xl font-black bg-linear-to-r from-orange-600 via-red-500 to-pink-500 bg-clip-text text-transparent">
							Nutrition Goals
						</h1>

						<p className="text-gray-500 mt-3">
							Set daily targets and stay consistent.
						</p>
					</div>

					{/* Success */}
					{message && (
						<div className="mb-6 flex items-center gap-3 rounded-2xl border border-green-200 bg-green-50 p-4 text-green-700 animate-fadeIn">
							<FaCheckCircle />
							{message}
						</div>
					)}

					{/* Error */}
					{error && (
						<div className="mb-6 flex items-center gap-3 rounded-2xl border border-red-200 bg-red-50 p-4 text-red-700 animate-fadeIn">
							<FaExclamationCircle />
							{error}
						</div>
					)}

					<form
						onSubmit={handleSubmit}
						className="grid md:grid-cols-2 gap-6"
					>
						{/* Calories */}
						<div className="goal-card">
							<label className="goal-label">
								<FaFire />
								Calories Goal
							</label>

							<input
								type="number"
								name="calorieGoal"
								value={goals.calorieGoal ?? ''}
								onChange={handleChange}
								className="goal-input"
							/>
						</div>

						{/* Protein */}
						<div className="goal-card">
							<label className="goal-label">
								<FaDrumstickBite />
								Protein Goal
							</label>

							<input
								type="number"
								name="proteinGoal"
								value={goals.proteinGoal ?? ''}
								onChange={handleChange}
								className="goal-input"
							/>
						</div>

						{/* Carbs */}
						<div className="goal-card">
							<label className="goal-label">
								<FaBreadSlice />
								Carbs Goal
							</label>
							<input
								type="number"
								name="carbGoal"
								value={goals.carbGoal ?? ''}
								onChange={handleChange}
								className="goal-input"
							/>
						</div>

						{/* Fat */}
						<div className="goal-card">
							<label className="goal-label">
								<FaCheese />
								Fat Goal
							</label>

							<input
								type="number"
								name="fatGoal"
								value={goals.fatGoal ?? ''}
								onChange={handleChange}
								className="goal-input"
							/>
						</div>

						{/* Water */}
						<div className="goal-card">
							<label className="goal-label">
								<FaTint />
								Water Goal (ml)
							</label>

							<input
								type="number"
								name="waterGoal"
								value={goals.waterGoal ?? ''}
								onChange={handleChange}
								className="goal-input"
							/>
						</div>

						{/* Weight */}
						<div className="goal-card">
							<label className="goal-label">
								<FaWeight />
								Weight Goal (kg)
							</label>

							<input
								type="number"
								name="weightGoal"
								value={goals.weightGoal ?? ''}
								onChange={handleChange}
								className="goal-input"
							/>
						</div>

						<div className="md:col-span-2">
							<button
								type="submit"
								disabled={saving}
								className="w-full rounded-3xl bg-linear-to-r from-orange-500 to-red-500 py-4 text-lg font-bold text-white shadow-xl transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl"
							>
								{saving ? (
									'Saving...'
								) : (
									<>
										<FaSave className="inline mr-2" />
										Save Goals
									</>
								)}
							</button>

						</div>

					</form>

				</div>

			</div>
		</>
	);
}

export default Goals;