import { useEffect, useState } from 'react';
import userService from '../services/userService';
import AppNavbar from '../components/AppNavbar';
import dashboardService from '../services/dashboardService';
import { FaUserCircle, FaEnvelope, FaFire, FaBullseye, FaWeight, FaTint, FaDrumstickBite,FaBreadSlice, FaCheese, FaRunning,} from 'react-icons/fa';

function Profile() {
	const [profile, setProfile] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState('');
	const [currentStreak, setCurrentStreak] = useState(0);
	const [totalTrackedDays, setTotalTrackedDays] = useState(0);
	const [animatedStreak, setAnimatedStreak] = useState(0);
	const [animatedDays, setAnimatedDays] = useState(0);

	const loadProfile = async () => {
		try {
			const response = await userService.getProfile();
			const streakResponse = await dashboardService.getStreak();

			if (streakResponse?.status === 200) {
				setCurrentStreak(
					streakResponse.data.currentStreak || 0
				);

				setTotalTrackedDays(
					streakResponse.data.totalTrackedDays || 0
				);
			}

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

	useEffect(() => {
		let streakTimer;
		let daysTimer;

		if (currentStreak > 0) {
			let count = 0;

			streakTimer = setInterval(() => {
				count++;

				if (count >= currentStreak) {
					setAnimatedStreak(currentStreak);
					clearInterval(streakTimer);
				} else {
					setAnimatedStreak(count);
				}
			}, 80);
		}

		if (totalTrackedDays > 0) {
			let count = 0;

			daysTimer = setInterval(() => {
				count++;

				if (count >= totalTrackedDays) {
					setAnimatedDays(totalTrackedDays);
					clearInterval(daysTimer);
				} else {
					setAnimatedDays(count);
				}
			}, 40);
		}

		return () => {
			clearInterval(streakTimer);
			clearInterval(daysTimer);
		};
	}, [currentStreak, totalTrackedDays]);

	if (loading) {
		return (
			<div className="p-10 text-center">
				Loading profile...
			</div>
		);
	}

	const memberSince = profile?.createdAt
		? new Date(profile.createdAt).toLocaleDateString(
				'en-IN',
				{
					day: 'numeric',
					month: 'long',
					year: 'numeric',
				}
		)
		: 'N/A';

	return (
		<>
			<AppNavbar/>
			<div className="min-h-screen bg-gray-50 p-6">
				<div className="max-w-4xl mx-auto">

					{/* Header Section */}
                    <div className="mb-8 flex items-center gap-4">
                        <div className="h-16 w-16 rounded-2xl bg-linear-to-r from-orange-500 to-red-500 text-white flex items-center justify-center shadow-xl">
                            <FaUserCircle size={30} />
                        </div>
                        <div>
                            <h1 className="text-4xl md:text-5xl font-black bg-linear-to-r from-orange-600 via-red-500 to-pink-500 bg-clip-text text-transparent">
                                My Profile
                            </h1>
                            <p className="text-gray-500 mt-1">
                                Track your progress and achievements
                            </p>
                        </div>
                    </div>

					{error && (
                        <div className="mb-6 bg-red-100 border border-red-300 text-red-700 p-4 rounded-lg">
                            {error}
                        </div>
                    )}

					{profile && (
                        <div className="space-y-8">

                            {/* Hero Profile Card */}
                            <div className="group relative overflow-hidden rounded-3xl bg-white border border-gray-100 p-8 shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 ease-out">
                                <div className="absolute inset-0 bg-linear-to-r from-orange-500/5 via-red-500/5 to-pink-500/5 group-hover:from-orange-500/10 group-hover:via-red-500/10 group-hover:to-pink-500/10 transition-all duration-500" />
                                <div className="relative z-10">
                                    <div className="flex flex-col md:flex-row items-center gap-6">
                                        <div className="h-28 w-28 rounded-full bg-linear-to-r from-orange-500 to-red-500 flex items-center justify-center text-white shadow-xl group-hover:scale-105 group-hover:rotate-2 transition-transform duration-500 ease-out">
                                            <FaUserCircle size={65} />
                                        </div>

                                        <div className="flex-1 text-center md:text-left">
                                            <h2 className="text-3xl font-black text-gray-800">
                                                {profile.name}
                                            </h2>
                                            <p className="mt-2 text-gray-500 flex items-center justify-center md:justify-start gap-2">
                                                <FaEnvelope className="text-gray-400" />
                                                {profile.email}
                                            </p>
                                        </div>

                                        <div className="bg-orange-50 border border-orange-200 px-6 py-4 rounded-2xl text-center w-full md:w-auto group-hover:bg-orange-100/70 group-hover:border-orange-300 transition-all duration-500">
                                            <p className="text-sm text-orange-600 font-semibold">
                                                Current Streak
                                            </p>
                                            <p className="text-3xl font-black text-orange-500 flex items-center justify-center gap-2 my-1 group-hover:animate-bounce">
                                                <FaFire />
                                                {currentStreak}
                                            </p>
                                            <p className="text-xs text-gray-500">
                                                Days
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

							<div className="bg-white rounded-4xl shadow-xl border border-gray-100 p-6">
								<div className="flex items-center gap-4">
									<div className="h-14 w-14 rounded-2xl bg-linear-to-r from-cyan-500 to-blue-500 text-white flex items-center justify-center shadow-lg">
										📅
									</div>
									<div>
										<p className="text-gray-500 text-sm">
											Member Since
										</p>

										<h3 className="text-2xl font-black text-gray-800">
											{memberSince}
										</h3>
									</div>
								</div>
							</div>

                            {/* Stats Overview Grid */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
                                <div className="bg-white rounded-2xl p-6 shadow-md border border-orange-100 hover:-translate-y-1 transition-all duration-300">
                                    <p className="text-sm text-gray-500 font-medium">Current Streak</p>
                                    <h3 className="text-3xl font-black text-orange-500 mt-2">🔥 {animatedStreak}</h3>
                                    <p className="text-gray-400 text-xs mt-1">Days</p>
                                </div>

                                <div className="bg-white rounded-2xl p-6 shadow-md border border-blue-100 hover:-translate-y-1 transition-all duration-300">
                                    <p className="text-sm text-gray-500 font-medium">Tracked Days</p>
                                    <h3 className="text-3xl font-black text-blue-500 mt-2">{animatedDays}</h3>
                                    <p className="text-gray-400 text-xs mt-1">Days Logged</p>
                                </div>

                                <div className="bg-white rounded-2xl p-6 shadow-md border border-green-100 hover:-translate-y-1 transition-all duration-300">
                                    <p className="text-sm text-gray-500 font-medium">Goals Active</p>
                                    <h3 className="text-3xl font-black text-green-500 mt-2">6</h3>
                                    <p className="text-gray-400 text-xs mt-1">Nutrition Goals</p>
                                </div>

                                <div className="bg-white rounded-2xl p-6 shadow-md border border-purple-100 hover:-translate-y-1 transition-all duration-300">
                                    <p className="text-sm text-gray-500 font-medium">Profile Status</p>
                                    <h3 className="text-3xl font-black text-purple-500 mt-2">100%</h3>
                                    <p className="text-gray-400 text-xs mt-1">Complete</p>
                                </div>
                            </div>

                            {/* Achievements Section */}
                            <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="h-12 w-12 rounded-xl bg-linear-to-r from-yellow-400 to-orange-500 text-white flex items-center justify-center shadow-md text-xl">
                                        🏆
                                    </div>
                                    <div>
                                        <h2 className="text-2xl font-black text-gray-800">Achievements</h2>
                                        <p className="text-sm text-gray-500">Unlock badges by staying consistent</p>
                                    </div>
                                </div>

                                <div className="flex flex-wrap gap-3">
                                    {currentStreak >= 1 && (
                                        <div className="px-4 py-2 rounded-xl bg-orange-50 border border-orange-200 text-orange-600 text-sm font-bold">
                                            🔥 First Day Logged
                                        </div>
                                    )}
                                    {currentStreak >= 3 && (
                                        <div className="px-4 py-2 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm font-bold">
                                            🔥 3 Day Streak
                                        </div>
                                    )}
                                    {currentStreak >= 7 && (
                                        <div className="px-4 py-2 rounded-xl bg-yellow-50 border border-yellow-200 text-yellow-700 text-sm font-bold">
                                            🏅 7 Day Warrior
                                        </div>
                                    )}
                                    {currentStreak >= 14 && (
                                        <div className="px-4 py-2 rounded-xl bg-green-50 border border-green-200 text-green-700 text-sm font-bold">
                                            💪 14 Day Consistency
                                        </div>
                                    )}
                                    {currentStreak >= 30 && (
                                        <div className="px-4 py-2 rounded-xl bg-purple-50 border border-purple-200 text-purple-700 text-sm font-bold">
                                            👑 30 Day Champion
                                        </div>
                                    )}
                                    {totalTrackedDays >= 10 && (
                                        <div className="px-4 py-2 rounded-xl bg-blue-50 border border-blue-200 text-blue-700 text-sm font-bold">
                                            📅 10 Days Tracked
                                        </div>
                                    )}
                                    {totalTrackedDays >= 25 && (
                                        <div className="px-4 py-2 rounded-xl bg-cyan-50 border border-cyan-200 text-cyan-700 text-sm font-bold">
                                            📈 Habit Builder
                                        </div>
                                    )}
                                    {totalTrackedDays >= 50 && (
                                        <div className="px-4 py-2 rounded-xl bg-indigo-50 border border-indigo-200 text-indigo-700 text-sm font-bold">
                                            🚀 Nutrition Master
                                        </div>
                                    )}
                                    {currentStreak === 0 && totalTrackedDays === 0 && (
                                        <div className="w-full text-center py-6 text-gray-500 text-sm">
                                            Start tracking meals to unlock achievements 🏆
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Nutrition Goals Section */}
                            <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="h-12 w-12 rounded-xl bg-linear-to-r from-blue-500 to-indigo-500 text-white flex items-center justify-center shadow-md">
                                        <FaBullseye size={20} />
                                    </div>
                                    <div>
                                        <h2 className="text-2xl font-black text-gray-800">Nutrition Targets</h2>
                                        <p className="text-sm text-gray-500">Your custom daily targets</p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                                    <div className="p-5 rounded-2xl bg-orange-50/70 border border-orange-100 flex flex-col items-center text-center">
                                        <FaRunning className="text-orange-500 text-2xl mb-2" />
                                        <p className="text-xs text-gray-500 font-medium">Calories</p>
                                        <h3 className="text-xl font-black text-gray-800 mt-1">{profile.calorieGoal || 0} kcal</h3>
                                    </div>

                                    <div className="p-5 rounded-2xl bg-blue-50/70 border border-blue-100 flex flex-col items-center text-center">
                                        <FaDrumstickBite className="text-blue-500 text-2xl mb-2" />
                                        <p className="text-xs text-gray-500 font-medium">Protein</p>
                                        <h3 className="text-xl font-black text-gray-800 mt-1">{profile.proteinGoal || 0} g</h3>
                                    </div>

                                    <div className="p-5 rounded-2xl bg-green-50/70 border border-green-100 flex flex-col items-center text-center">
                                        <FaBreadSlice className="text-green-500 text-2xl mb-2" />
                                        <p className="text-xs text-gray-500 font-medium">Carbs</p>
                                        <h3 className="text-xl font-black text-gray-800 mt-1">{profile.carbGoal || 0} g</h3>
                                    </div>

                                    <div className="p-5 rounded-2xl bg-yellow-50/70 border border-yellow-100 flex flex-col items-center text-center">
                                        <FaCheese className="text-yellow-600 text-2xl mb-2" />
                                        <p className="text-xs text-gray-500 font-medium">Fats</p>
                                        <h3 className="text-xl font-black text-gray-800 mt-1">{profile.fatGoal || 0} g</h3>
                                    </div>

                                    <div className="p-5 rounded-2xl bg-cyan-50/70 border border-cyan-100 flex flex-col items-center text-center">
                                        <FaTint className="text-cyan-500 text-2xl mb-2" />
                                        <p className="text-xs text-gray-500 font-medium">Water Target</p>
                                        <h3 className="text-xl font-black text-gray-800 mt-1">{profile.waterGoal || 0} ml</h3>
                                    </div>

                                    <div className="p-5 rounded-2xl bg-purple-50/70 border border-purple-100 flex flex-col items-center text-center">
                                        <FaWeight className="text-purple-500 text-2xl mb-2" />
                                        <p className="text-xs text-gray-500 font-medium">Weight Target</p>
                                        <h3 className="text-xl font-black text-gray-800 mt-1">{profile.weightGoal || 0} kg</h3>
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