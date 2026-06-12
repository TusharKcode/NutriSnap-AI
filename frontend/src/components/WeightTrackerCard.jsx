import { useEffect, useState } from 'react';
import weightService from '../services/weightService';
import userService from '../services/userService';
import WeightChart from './WeightChart';
import { FaWeight, FaArrowUp, FaArrowDown, FaPlus, FaTrash } from 'react-icons/fa';

function WeightTrackerCard() {

    const [weight, setWeight] = useState('');
    const [entries, setEntries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [weightGoal, setWeightGoal] = useState(70);
    

    const loadWeights = async () => {
        try {
            const [weightRes, goalsRes] = await Promise.all([
                    weightService.getWeightHistory(),
                    userService.getGoals(),
                ]);

            if (weightRes.status === 200) {
                setEntries(
                    weightRes.data.entries || []
                );
            }

            if (goalsRes.status === 200) {
                setWeightGoal(
                    goalsRes.data.goals.weightGoal || 70
                );
            }

        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const initialize = async () => {
            await loadWeights();
        };
        initialize();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!weight) return;

        const res =
            await weightService.addWeight(
                Number(weight)
            );

        if (res.status === 201) {
            setWeight('');
            loadWeights();
        }
    };

    const handleDelete = async (id) => {

        const res =
            await weightService.deleteWeight(
                id
            );

        if (res.status === 200) {
            loadWeights();
        }
    };

    const latestWeight =
        entries.length > 0
            ? entries[0].weight
            : '-';

    const weightDifference =
        latestWeight !== '-'
            ? (
                latestWeight -
                weightGoal
            ).toFixed(1)
            : null;

    const isAboveGoal = weightDifference > 0;

    if (loading) {
        return (
            <div className="rounded-2xl bg-white p-6 shadow-sm border">
                Loading weight tracker...
            </div>
        );
    }

    return (
        <div className="rounded-3xl bg-white/80 backdrop-blur-md p-6 shadow-xl border border-gray-200 hover:shadow-2xl transition-all duration-300">

            <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-full bg-purple-100">
                    <FaWeight className="text-purple-600 text-xl" />
                </div>

                <div>
                    <h2 className="text-xl font-bold bg-linear-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
                        Weight Analytics
                    </h2>

                    <p className="text-sm text-gray-500">
                        Monitor your progress & body goals
                    </p>
                </div>
            </div>

            <div className="grid md:grid-cols-3 gap-4 mb-6">

            {/* Current Weight */}
            <div className="rounded-2xl bg-linear-to-r from-purple-50 to-pink-50 p-4 border border-purple-100">

                    <p className="text-sm text-gray-500">
                        Current Weight
                    </p>

                    <p className="text-3xl font-black text-purple-600 mt-2">
                        {latestWeight} kg
                    </p>

                </div>

                {/* Goal Weight */}
                <div className="rounded-2xl bg-linear-to-r from-green-50 to-emerald-50 p-4 border border-green-100">

                    <p className="text-sm text-gray-500">
                        Goal Weight
                    </p>

                    <p className="text-3xl font-black text-green-600 mt-2">
                        {weightGoal} kg
                    </p>

                </div>

                {/* Difference */}
                <div
                    className={`rounded-2xl p-4 border ${
                        isAboveGoal
                            ? 'bg-red-50 border-red-100'
                            : 'bg-blue-50 border-blue-100'
                    }`}
                >

                    <p className="text-sm text-gray-500">
                        Difference
                    </p>

                    <div className="flex items-center gap-2 mt-2">

                        {isAboveGoal ? (
                            <FaArrowUp className="text-red-500" />
                        ) : (
                            <FaArrowDown className="text-green-500" />
                        )}

                        <p
                            className={`text-3xl font-black ${
                                isAboveGoal
                                    ? 'text-red-500'
                                    : 'text-green-500'
                            }`}
                        >
                            {Math.abs(weightDifference)} kg
                        </p>

                    </div>

                </div>

            </div>

            <form
                onSubmit={handleSubmit}
                className="flex gap-2 mb-4"
            >

                <input
                    type="number"
                    step="0.1"
                    value={weight}
                    onChange={(e) =>
                        setWeight(
                            e.target.value
                        )
                    }
                    placeholder="Weight (kg)"
                    className="flex-1 rounded-xl border border-gray-300 p-3 focus:ring-2 focus:ring-purple-400 outline-none"
                />

                <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-linear-to-r from-green-500 to-emerald-500 text-white font-semibold flex items-center gap-2 hover:scale-105 transition"
                >
                    <FaPlus />
                    Add
                </button>

            </form>

            <div className="mb-6">
                <WeightChart
                    entries={entries}
                />
            </div>

            <div className="space-y-2">

                {entries.length === 0 ? (
                    <div className="text-center py-8">
                        <div className="text-5xl animate-bounce mb-3">
                            ⚖️
                        </div>

                        <p className="font-semibold text-gray-700">
                            No weight records yet
                        </p>

                        <p className="text-sm text-gray-500 mt-2">
                            Start tracking your fitness journey today.
                        </p>
                    </div>
                ) : (
                    entries.map((entry) => (
                        <div
                            key={entry._id}
                            className="flex justify-between items-center rounded-2xl border border-gray-100 p-3 hover:bg-purple-50 transition"
                        >

                            <div>
                                <p className="font-semibold text-gray-800">
                                    ⚖️ {entry.weight} kg
                                </p>

                                <p className="text-xs text-gray-500">
                                    {new Date(entry.createdAt).toLocaleDateString()}
                                </p>
                            </div>

                            <button
                                onClick={() =>
                                    handleDelete(
                                        entry._id
                                    )
                                }
                                className="p-2 rounded-full hover:bg-red-100 text-red-500 transition"
                            >
                                <FaTrash />
                            </button>

                        </div>
                    ))
                )}

            </div>

        </div>
    );
}

export default WeightTrackerCard;