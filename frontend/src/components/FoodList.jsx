function FoodList({ foods = [] }) {
	return (
		<div className="rounded-2xl bg-white p-6 shadow-sm border border-gray-200">
			<h2 className="text-lg font-semibold mb-4">
				Recent Meals
			</h2>

			{foods.length === 0 ? (
				<p className="text-gray-500">
					No meals logged yet.
				</p>
			) : (
				<div className="space-y-4">
					{foods.map((food) => (
						<div
							key={food._id}
							className="flex items-center justify-between border-b pb-3"
						>
							<div>
								<p className="font-medium">
									{food.foodName}
								</p>

								<p className="text-sm text-gray-500">
									{food.mealType}
								</p>
							</div>

							<div className="text-right">
								<p className="font-semibold">
									{food.calories} kcal
								</p>

								<p className="text-xs text-gray-500">
									{new Date(
										food.createdAt
									).toLocaleDateString()}
								</p>
							</div>
						</div>
					))}
				</div>
			)}
		</div>
	);
}

export default FoodList;