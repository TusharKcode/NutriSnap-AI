import { useEffect, useState } from "react";
import foodService from "../services/foodService";
import AppNavbar from "../components/AppNavbar";
import {FaSearch, FaFilter, FaEdit, FaTrash, FaCalendarAlt, FaFire, FaDrumstickBite, FaBreadSlice, FaCheese, FaUtensils, FaClipboardList,} from "react-icons/fa";

function Diary() {
	const [entries, setEntries] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");
	const [editingId, setEditingId] = useState(null);
	const [searchTerm, setSearchTerm] = useState("");
	const [mealFilter, setMealFilter] = useState("all");

	const [editForm, setEditForm] = useState({
		foodName: "",
		calories: "",
		protein: "",
		carbs: "",
		fat: "",
		mealType: "",
	});

	const loadDiary = async () => {
		setLoading(true);
		setError("");

		try {
			console.log("Stored Token:", localStorage.getItem("authToken"));
			const response = await foodService.getDiary();
			console.log("Diary Response:", response);
			console.log("Diary Data:", response?.data);
			console.log("Diary Status:", response?.status);

		if (response?.status === 200) {
			setEntries(response.data.entries || []);
		} else {
			setError(
				response?.data?.message ||
					`Request failed with status ${response?.status}`,
			);
		}
		} catch (err) {
			console.error("Diary Error:", err);

			setError(
				err?.response?.data?.message ||
				err?.message ||
				"Failed to load diary entries.",
			);
		} finally {
			setLoading(false);
		}
};

	useEffect(() => {
		const initialize = async () => {
			await loadDiary();
		};

		initialize();
	}, []);

	if (loading) {
		return <div className="p-10 text-center">Loading diary...</div>;
	}

	const handleDelete = async (id) => {
		try {
			const response = await foodService.deleteFood(id);

		if (response?.status === 200) {
			setEntries((prev) => prev.filter((entry) => entry._id !== id));
		}
		} catch (error) {
			console.error("Delete failed:", error);
		}
	};

	const handleEditSave = async () => {
		try {
			const response = await foodService.updateFood(editingId, editForm);

			if (response?.status === 200) {
				setEntries((prev) =>
					prev.map((entry) =>
						entry._id === editingId ? response.data.entry : entry,
					),
				);
				setEditingId(null);
			}
		} catch (error) {
			console.error("Update failed:", error);
		}
	};

	const filteredEntries = entries.filter((entry) => {
		const matchesSearch = entry.foodName
			.toLowerCase()
			.includes(searchTerm.toLowerCase());

		const matchesMeal = mealFilter === "all" ? true : entry.mealType === mealFilter;
		return matchesSearch && matchesMeal;
	});

	return (
        <>
            <AppNavbar />
            <div className="min-h-screen bg-gray-50 p-6">
                <div className="max-w-6xl mx-auto">
                    
                    {/* Header Section */}
                    <div className="mb-8">
                        <div className="flex items-center gap-4">
                            <div className="h-16 w-16 rounded-3xl bg-linear-to-r from-orange-500 to-red-500 text-white flex items-center justify-center shadow-xl animate-float">
                                <FaClipboardList size={28} />
                            </div>

                            <div>
                                <h1 className="text-4xl md:text-5xl font-black bg-linear-to-r from-orange-600 via-red-500 to-pink-500 bg-clip-text text-transparent">
                                    Food Diary
                                </h1>
                                <p className="text-gray-500 mt-2">
                                    Track, edit and manage your nutrition journey.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Filter, Search & Stats Grid */}
                    <div className="mb-6 grid gap-4 md:grid-cols-3 items-center">
                        <div className="flex items-center justify-between flex-wrap gap-3">
                            <p className="text-gray-600">
                                Showing
                                <span className="font-semibold mx-1">
                                    {filteredEntries.length}
                                </span>
                                of
                                <span className="font-semibold mx-1">{entries.length}</span>
                                entries
                            </p>
                            <button
                                onClick={() => {
                                    setSearchTerm("");
                                    setMealFilter("all");
                                }}
                                className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
                            >
                                Clear Filters
                            </button>
                        </div>

                        <div className="relative">
                            <FaSearch className="absolute left-4 top-4 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search meals..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-12 pr-4 py-3 rounded-2xl border border-gray-200 focus:ring-2 focus:ring-orange-400 outline-none transition"
                            />
                        </div>

                        <div className="relative">
                            <FaFilter className="absolute left-4 top-4 text-gray-400" />
                            <select
                                value={mealFilter}
                                onChange={(e) => setMealFilter(e.target.value)}
                                className="w-full pl-12 py-3 rounded-2xl border border-gray-200 focus:ring-2 focus:ring-green-400 outline-none"
                            >
                                <option value="all">All Meals</option>
                                <option value="breakfast">Breakfast</option>
                                <option value="lunch">Lunch</option>
                                <option value="dinner">Dinner</option>
                                <option value="snack">Snack</option>
                                <option value="sweet">Sweet</option>
                            </select>
                        </div>
                    </div>

                    {/* Error Alerts */}
                    {error && (
                        <div className="mb-6 rounded-lg bg-red-50 border border-red-200 p-4 text-red-700">
                            {error}
                        </div>
                    )}


                    {/* Main Content: Food Cards List */}
                    {filteredEntries.length === 0 ? (
						<div className="bg-white/80 backdrop-blur-xl rounded-4xl shadow-xl border border-white p-12 text-center animate-fadeUp">

							<div className="text-7xl animate-float mb-4">
								🍽️
							</div>

							<h3 className="text-2xl font-black text-gray-800">
								No Meals Found
							</h3>

							<p className="text-gray-500 mt-2">
								Try changing your search or meal filters.
							</p>

						</div>
					) : (
						<>
							<div className="flex items-center justify-between mb-6 flex-wrap gap-3">

								<div className="flex items-center gap-2">
									<span className="px-4 py-2 rounded-full bg-orange-100 text-orange-700 font-semibold text-sm">
										📋 {filteredEntries.length} Entries
									</span>

									{mealFilter !== "all" && (
										<span className="px-4 py-2 rounded-full bg-green-100 text-green-700 font-semibold text-sm">
											🍴 {mealFilter}
										</span>
									)}
								</div>

							</div>

							<div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
								{filteredEntries.map((entry) => (
									<div
										key={entry._id}
										className="group overflow-hidden rounded-4xl bg-white/90 backdrop-blur-xl border border-orange-100 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-500"
									>
										{/* Image Section */}
										{entry.imageUrl && (
											<div className="relative overflow-hidden">

												<img
													src={entry.imageUrl}
													alt={entry.foodName}
													className="h-56 w-full object-cover transition-transform duration-700 group-hover:scale-110"
												/>

												<div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent" />

												<span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-white/90 backdrop-blur text-orange-600 font-bold text-xs">
													{entry.mealType
														? entry.mealType.charAt(0).toUpperCase() +
														entry.mealType.slice(1)
														: "Meal"}
												</span>

											</div>
										)}

										{/* Content */}
										<div className="p-6">

											{/* Actions */}
											<div className="flex justify-end gap-2 mb-4">

												<button
													onClick={() => {
														setEditingId(entry._id);

														setEditForm({
															foodName: entry.foodName,
															calories: entry.calories,
															protein: entry.protein,
															carbs: entry.carbs,
															fat: entry.fat,
															mealType: entry.mealType,
														});
													}}
													className="h-10 w-10 rounded-xl bg-blue-100 text-blue-600 hover:bg-blue-600 hover:text-white transition-all duration-300 flex items-center justify-center"
												>
													<FaEdit />
												</button>

												<button
													onClick={() => handleDelete(entry._id)}
													className="h-10 w-10 rounded-xl bg-red-100 text-red-600 hover:bg-red-600 hover:text-white transition-all duration-300 flex items-center justify-center"
												>
													<FaTrash />
												</button>

											</div>

											{/* Food Name */}
											<h2 className="text-2xl font-black text-gray-800 mb-5 flex items-center gap-2">
												<FaUtensils className="text-orange-500" />
												{entry.foodName}
											</h2>

											{/* Nutrition Stats */}
											<div className="grid grid-cols-2 gap-3 mb-5">

												<div className="rounded-2xl bg-orange-50 p-3">
													<p className="text-xs text-gray-500">
														Calories
													</p>

													<p className="font-black text-orange-600 flex items-center gap-1">
														<FaFire />
														{entry.calories}
													</p>
												</div>

												<div className="rounded-2xl bg-red-50 p-3">
													<p className="text-xs text-gray-500">
														Protein
													</p>

													<p className="font-black text-red-600 flex items-center gap-1">
														<FaDrumstickBite />
														{entry.protein}g
													</p>
												</div>

												<div className="rounded-2xl bg-yellow-50 p-3">
													<p className="text-xs text-gray-500">
														Carbs
													</p>

													<p className="font-black text-yellow-600 flex items-center gap-1">
														<FaBreadSlice />
														{entry.carbs}g
													</p>
												</div>

												<div className="rounded-2xl bg-purple-50 p-3">
													<p className="text-xs text-gray-500">
														Fat
													</p>

													<p className="font-black text-purple-600 flex items-center gap-1">
														<FaCheese />
														{entry.fat}g
													</p>
												</div>

											</div>

											{/* Date */}
											<div className="flex items-center gap-2 text-sm text-gray-500 border-t pt-4">

												<FaCalendarAlt />

												{new Date(
													entry.createdAt
												).toLocaleDateString()}

											</div>

											{/* Active Filters */}
											<div className="flex flex-wrap gap-2 mt-4">

												{searchTerm && (
													<span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold">
														Search: {searchTerm}
													</span>
												)}

												{mealFilter !== "all" && (
													<span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
														Meal: {mealFilter}
													</span>
												)}

											</div>

										</div>
									</div>
								))}
							</div>
						</>
					)}
                </div>
            </div>

            {/* Edit Modal Popup */}
			{editingId && (
				<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fadeIn">

					<div className="relative w-full max-w-lg rounded-4xl border border-white/20 bg-white/95 backdrop-blur-xl shadow-2xl p-6 md:p-8 animate-modalPop">

						{/* Close Button */}
						<button
							onClick={() => setEditingId(null)}
							className="absolute top-4 right-4 h-10 w-10 rounded-full bg-gray-100 hover:bg-red-100 text-gray-500 hover:text-red-500 transition-all duration-300 flex items-center justify-center"
						>
							✕
						</button>

						{/* Header */}
						<div className="flex items-center gap-4 mb-6">

							<div className="h-14 w-14 rounded-2xl bg-linear-to-r from-blue-500 to-indigo-600 text-white flex items-center justify-center shadow-lg">
								<FaEdit size={22} />
							</div>

							<div>
								<h2 className="text-2xl md:text-3xl font-black text-gray-800">
									Edit Food Entry
								</h2>

								<p className="text-sm text-gray-500">
									Update meal information and nutrition values.
								</p>
							</div>

						</div>

						{/* Form */}
						<div className="space-y-4">

							<input
								type="text"
								placeholder="🍽 Food Name"
								value={editForm.foodName}
								onChange={(e) =>
									setEditForm({
										...editForm,
										foodName: e.target.value,
									})
								}
								className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none transition-all"
							/>

							<input
								type="number"
								placeholder="🔥 Calories"
								value={editForm.calories}
								onChange={(e) =>
									setEditForm({
										...editForm,
										calories: e.target.value,
									})
								}
								className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 focus:ring-2 focus:ring-orange-400 focus:border-orange-400 outline-none transition-all"
							/>

							<div className="grid grid-cols-1 sm:grid-cols-3 gap-3">

								<input
									type="number"
									placeholder="💪 Protein"
									value={editForm.protein}
									onChange={(e) =>
										setEditForm({
											...editForm,
											protein: e.target.value,
										})
									}
									className="rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 focus:ring-2 focus:ring-green-400 outline-none transition-all"
								/>

								<input
									type="number"
									placeholder="🍞 Carbs"
									value={editForm.carbs}
									onChange={(e) =>
										setEditForm({
											...editForm,
											carbs: e.target.value,
										})
									}
									className="rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 focus:ring-2 focus:ring-yellow-400 outline-none transition-all"
								/>

								<input
									type="number"
									placeholder="🥑 Fat"
									value={editForm.fat}
									onChange={(e) =>
										setEditForm({
											...editForm,
											fat: e.target.value,
										})
									}
									className="rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 focus:ring-2 focus:ring-pink-400 outline-none transition-all"
								/>

							</div>

							<select
								value={editForm.mealType}
								onChange={(e) =>
									setEditForm({
										...editForm,
										mealType: e.target.value,
									})
								}
								className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 focus:ring-2 focus:ring-indigo-400 outline-none transition-all"
							>
								<option value="breakfast">🌅 Breakfast</option>
								<option value="lunch">☀️ Lunch</option>
								<option value="dinner">🌙 Dinner</option>
								<option value="snack">🍪 Snack</option>
								<option value="sweet">🍰 Sweet</option>
							</select>

							{/* Action Buttons */}
							<div className="flex flex-col sm:flex-row gap-3 pt-4">

								<button
									onClick={handleEditSave}
									className="flex-1 py-3 rounded-2xl font-bold text-white bg-linear-to-r from-blue-500 to-indigo-600 hover:scale-[1.02] hover:shadow-xl transition-all duration-300"
								>
									💾 Save Changes
								</button>

								<button
									onClick={() => setEditingId(null)}
									className="flex-1 py-3 rounded-2xl font-semibold bg-gray-100 hover:bg-gray-200 text-gray-700 transition-all duration-300"
								>
									Cancel
								</button>

							</div>

						</div>
					</div>
				</div>
			)}
        </>
    );
}

export default Diary;