function MacroRing({ label, current = 0, goal = 0 }) {
	const percentage =
		goal > 0
			? Math.min(
					Math.round((current / goal) * 100),
					100
			)
			: 0;

	return (
		<div className="flex flex-col items-center">
			<div className="relative h-28 w-28">
				<svg
					className="h-28 w-28 -rotate-90"
					viewBox="0 0 100 100"
				>
					<circle
						cx="50"
						cy="50"
						r="40"
						stroke="#e5e7eb"
						strokeWidth="10"
						fill="none"
					/>

					<circle
						cx="50"
						cy="50"
						r="40"
						stroke="currentColor"
						strokeWidth="10"
						fill="none"
						strokeDasharray={251.2}
						strokeDashoffset={
							251.2 -
							(251.2 * percentage) / 100
						}
						className="text-orange-500"
					/>
				</svg>

				<div className="absolute inset-0 flex flex-col items-center justify-center">
					<p className="font-bold text-lg">
						{percentage}%
					</p>
				</div>
			</div>

			<p className="mt-2 font-medium">
				{label}
			</p>

			<p className="text-sm text-gray-500">
				{current} / {goal} g
			</p>
		</div>
	);
}

function MacroRings({ goals }) {
	return (
		<div className="rounded-2xl bg-white p-6 shadow-sm border border-gray-200">
			<h2 className="text-lg font-semibold mb-6">
				Macro Progress
			</h2>

			<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
				<MacroRing
					label="Protein"
					current={goals?.protein?.current}
					goal={goals?.protein?.goal}
				/>

				<MacroRing
					label="Carbs"
					current={goals?.carbs?.current}
					goal={goals?.carbs?.goal}
				/>

				<MacroRing
					label="Fat"
					current={goals?.fat?.current}
					goal={goals?.fat?.goal}
				/>
			</div>
		</div>
	);
}

export default MacroRings;