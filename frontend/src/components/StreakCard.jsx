function StreakCard({
	currentStreak,
}) {
	return (
		<div className="rounded-3xl bg-white p-6 shadow-xl border border-gray-200 flex items-center justify-between">
			<div>
				<p className="text-sm font-medium text-gray-500">
					🔥 Current Streak
				</p>

				<p className="mt-4 text-4xl font-semibold text-gray-900">
					{currentStreak}
				</p>

				<p className="mt-2 text-sm text-gray-500">
					Days in a row
				</p>
			</div>

			<div className="h-16 w-16 rounded-3xl bg-red-50 text-red-600 flex items-center justify-center text-3xl">
				🔥
			</div>
		</div>
	);
}

export default StreakCard;