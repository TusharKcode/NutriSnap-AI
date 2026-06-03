import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import dashboardService from '../services/dashboardService';

function Dashboard() {
	const navigate = useNavigate();
	const { logout, user } = useAuth();
	const [summary, setSummary] = useState(null);
	const [goals, setGoals] = useState(null);
	const [streak, setStreak] = useState(null);
	const [error, setError] = useState('');
	const [isLoading, setIsLoading] = useState(true);

	const streakCount = streak?.current || streak?.count || streak?.streak || 0;

	const handleLogout = () => {
		logout();
		navigate('/login');
	};

	const loadDashboard = async () => {
		setIsLoading(true);
		setError('');

		try {
			const [summaryRes, goalsRes, streakRes] = await Promise.all([
				dashboardService.getDashboardSummary(),
				dashboardService.getGoalProgress(),
				dashboardService.getStreak(),
			]);

			if (summaryRes?.status === 200) {
				setSummary(summaryRes.data);
			} else {
				setError('Unable to load dashboard summary.');
			}

			if (goalsRes?.status === 200) {
				setGoals(goalsRes.data);
			} else {
				setError((prev) => prev || 'Unable to load goal progress.');
			}

			if (streakRes?.status === 200) {
				setStreak(streakRes.data);
			} else {
				setError((prev) => prev || 'Unable to load streak data.');
			}
		} catch (err) {
			setError('An error occurred while loading dashboard data.', err);
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		loadDashboard();
	}, []);

	return (
		<div className="p-10 space-y-6">
			<div className="flex items-center justify-between">
				<div>
					<h1 className="text-3xl font-bold">Welcome back, {user?.name}</h1>
					<p className="text-sm text-gray-600">Here is your latest dashboard overview.</p>
				</div>
				<button
					onClick={handleLogout}
					className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
				>
					Logout
				</button>
			</div>

			{isLoading ? (
				<div className="rounded-lg border border-dashed border-gray-300 p-6 text-center text-gray-500">
					Loading dashboard...
				</div>
			) : (
				<>
					{error && (
						<div className="rounded-lg bg-red-50 border border-red-200 p-4 text-red-700">
							{error}
						</div>
					)}

				<div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
					{['Calories', 'Protein', 'Carbs', 'Fat'].map((stat) => {
						const key = stat.toLowerCase();
						const value = summary?.[key] ?? '-';
						const displayValue = stat === 'Calories' ? `${value} kcal` : `${value} g`;

						return (
							<div key={stat} className="rounded-3xl bg-white p-6 shadow-xl border border-gray-200 transition hover:-translate-y-1 hover:shadow-2xl">
								<div className="flex items-center justify-between">
									<p className="text-sm font-medium text-gray-500">{stat}</p>
									<div className="h-10 w-10 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
										<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
											<path d="M9.049 2.927C9.432 1.9 10.568 1.9 10.951 2.927l.584 1.9a1 1 0 00.95.69h2.004c1.054 0 1.49 1.357.64 1.96l-1.62 1.18a1 1 0 00-.364 1.118l.618 1.94c.27.844-.698 1.54-1.41 1.02l-1.64-1.28a1 1 0 00-1.176 0l-1.64 1.28c-.712.52-1.68-.176-1.41-1.02l.618-1.94a1 1 0 00-.364-1.118L3.87 6.477c-.85-.603-.414-1.96.64-1.96h2.004a1 1 0 00.95-.69l.584-1.9z" />
									</svg>
									</div>
								</div>
								<div className="mt-6">
									<p className="text-3xl font-semibold text-gray-900">{displayValue}</p>
									<p className="mt-2 text-sm text-gray-500">Target and performance metrics</p>
								</div>
							</div>
						);
					})}
				</div>

				<div className="rounded-3xl bg-white p-6 shadow-xl border border-gray-200 transition hover:-translate-y-1 hover:shadow-2xl flex items-center justify-between">
					<div>
						<p className="text-sm font-medium text-gray-500">🔥 Current Streak</p>
						<p className="mt-4 text-4xl font-semibold text-gray-900">{streakCount}</p>
						<p className="mt-2 text-sm text-gray-500">Days in a row</p>
					</div>
					<div className="h-16 w-16 rounded-3xl bg-red-50 text-red-600 flex items-center justify-center text-3xl">
						🔥
					</div>
				</div>

				<div className="grid gap-6 lg:grid-cols-2">
						<div className="rounded-2xl bg-white p-6 shadow-sm border border-gray-200">
							<h2 className="text-lg font-semibold text-gray-900">Goal Progress</h2>
							<pre className="mt-4 text-sm text-gray-700 whitespace-pre-wrap">{JSON.stringify(goals, null, 2)}</pre>
						</div>

						<div className="rounded-2xl bg-white p-6 shadow-sm border border-gray-200">
							<h2 className="text-lg font-semibold text-gray-900">Streak</h2>
							<pre className="mt-4 text-sm text-gray-700 whitespace-pre-wrap">{JSON.stringify(streak, null, 2)}</pre>
						</div>
					</div>
				</>
			)}
		</div>
	);
}

export default Dashboard;