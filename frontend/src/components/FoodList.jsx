import {
    FaUtensils,
    FaFire,
    FaCalendarAlt,
    FaRegSmileBeam,
} from "react-icons/fa";

function FoodList({ data = [] }) {

    const getMealColor = (mealType) => {
        switch (mealType?.toLowerCase()) {
            case "breakfast":
                return "bg-yellow-100 text-yellow-700";

            case "lunch":
                return "bg-green-100 text-green-700";

            case "dinner":
                return "bg-blue-100 text-blue-700";

            case "snack":
                return "bg-purple-100 text-purple-700";
			
			case "sweet":
                return "bg-purple-100 text-orange-700";

            default:
                return "bg-gray-100 text-gray-700";
        }
    };

    return (
        <div
            className="
                rounded-3xl
                border border-gray-200
                bg-white/80
                backdrop-blur-sm
                p-6
                shadow-lg
                hover:shadow-2xl
                transition-all
                duration-300
            "
        >
            {/* Header */}

            <div className="sticky top-0 z-10 bg-white/90 backdrop-blur-sm pb-4 mb-5 flex items-center gap-3">

                <div className="p-3 rounded-full bg-orange-100">
                    <FaUtensils className="text-orange-500 text-lg" />
                </div>

                <div>
                    <h2 className="text-xl font-bold bg-linear-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                        Recent Meals
                    </h2>

                    <p className="text-sm text-gray-500">
                        Your latest nutrition activity
                    </p>
                </div>

            </div>

            {/* Empty State */}

            {data.length === 0 ? (
                <div className="text-center py-10">

                    <div className="flex justify-center mb-4">
                        <div className="p-5 rounded-full bg-orange-50 animate-bounce">
                            <FaRegSmileBeam className="text-4xl text-orange-400" />
                        </div>
                    </div>

                    <h3 className="text-lg font-semibold text-gray-700">
                        No meals logged yet
                    </h3>

                    <p className="text-gray-500 mt-2">
                        Upload your first meal and start
                        tracking nutrition 🍎
                    </p>

                </div>
            ) : (
                <div className="space-y-4 max-h-72 overflow-y-auto pr-2 custom-scrollbar">

                    {data.map((food) => (

                        <div
                            key={food._id}
                            className="
                                flex items-center justify-between
                                rounded-2xl
                                border border-gray-100
                                bg-gray-50
                                p-4
                                hover:bg-white
                                hover:shadow-md
                                transition-all
                                duration-300
                            "
                        >
                            {/* Left */}

                            <div>

                                <p className="font-semibold text-gray-800">
                                    {food.foodName}
                                </p>

                                <div className="flex items-center gap-2 mt-2">

                                    <span
                                        className={`
                                            px-2 py-1 rounded-full text-xs font-medium
                                            ${getMealColor(food.mealType)}
                                        `}
                                    >
                                        {food.mealType}
                                    </span>

                                </div>

                            </div>

                            {/* Right */}

                            <div className="text-right">

                                <div className="flex items-center justify-end gap-1 text-orange-600 font-bold">

                                    <FaFire />

                                    <span>
                                        {food.calories} kcal
                                    </span>

                                </div>

                                <div className="flex items-center justify-end gap-1 mt-2 text-xs text-gray-500">

                                    <FaCalendarAlt />

                                    <span>
                                        {new Date(
                                            food.createdAt
                                        ).toLocaleDateString()}
                                    </span>

                                </div>

                            </div>

                        </div>

                    ))}

                </div>
            )}
        </div>
    );
}

export default FoodList;