function SummaryCard({
	title,
	value,
	unit,
	goal,
}) {
	return (
		<div className="rounded-3xl bg-white p-6 shadow-xl border border-gray-200 transition hover:-translate-y-1 hover:shadow-2xl">
			<div className="flex items-center justify-between">
				<p className="text-sm font-medium text-gray-500">
					{title}
				</p>

				<div className="h-10 w-10 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
					⭐
				</div>
			</div>

			<div className="mt-6">
				<p className="text-3xl font-semibold text-gray-900">
					{value} {unit}
				</p>

				<p className="mt-2 text-sm text-gray-500">
					Goal: {goal}
				</p>
			</div>
		</div>
	);
}

export default SummaryCard;