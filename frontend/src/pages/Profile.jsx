import { useEffect, useState } from 'react';
import userService from '../services/userService';
import AppNavbar from '../components/AppNavbar';

function Profile() {
	const [profile, setProfile] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState('');

	const loadProfile = async () => {
		try {
			const response = await userService.getProfile();

			if (response?.status === 200) {
				setProfile(response.data.user);
			} else {
				setError('Failed to load profile');
			}
		} catch (err) {
			setError(
				err?.response?.data?.message ||
				err?.message ||
				'Failed to load profile'
			);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		const initialize = async () => {
			await loadProfile();
		};

		initialize();
	}, []);

	if (loading) {
		return (
			<div className="p-10 text-center">
				Loading profile...
			</div>
		);
	}

	return (
		<>
			<AppNavbar/>
			<div className="min-h-screen bg-gray-50 p-6">
				<div className="max-w-4xl mx-auto">

					<h1 className="text-4xl font-bold mb-8">
						My Profile
					</h1>

					{error && (
						<div className="mb-6 bg-red-100 border border-red-300 text-red-700 p-4 rounded-lg">
							{error}
						</div>
					)}

					{profile && (
						<div className="bg-white rounded-3xl shadow-lg p-8">

							<div className="space-y-6">

								<div>
									<p className="text-sm text-gray-500">
										Name
									</p>

									<p className="text-xl font-semibold">
										{profile.name}
									</p>
								</div>

								<div>
									<p className="text-sm text-gray-500">
										Email
									</p>

									<p className="text-xl font-semibold">
										{profile.email}
									</p>
								</div>

								<div>
									<p className="text-sm text-gray-500">
										Current Streak
									</p>

									<p className="text-xl font-semibold">
										🔥 {profile.streakCount || 0} Days
									</p>
								</div>

								<div className="border-t pt-6">

									<h2 className="text-2xl font-bold mb-4">
										Nutrition Goals
									</h2>

									<div className="grid md:grid-cols-2 gap-4">

										<div className="bg-orange-50 p-4 rounded-xl">
											Calories Goal:
											<strong className="ml-2">
												{profile.calorieGoal || 0}
											</strong>
										</div>

										<div className="bg-blue-50 p-4 rounded-xl">
											Protein Goal:
											<strong className="ml-2">
												{profile.proteinGoal || 0} g
											</strong>
										</div>

										<div className="bg-green-50 p-4 rounded-xl">
											Carbs Goal:
											<strong className="ml-2">
												{profile.carbGoal || 0} g
											</strong>
										</div>

										<div className="bg-yellow-50 p-4 rounded-xl">
											Fat Goal:
											<strong className="ml-2">
												{profile.fatGoal || 0} g
											</strong>
										</div>

									</div>

								</div>

							</div>

						</div>
					)}

				</div>
			</div>
		</>
	);
}

export default Profile;