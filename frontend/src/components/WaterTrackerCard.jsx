import { useEffect, useState } from 'react';
import waterService from '../services/waterService';
import userService from '../services/userService';

function WaterTrackerCard() {

    const [totalWater, setTotalWater] = useState(0);
    const [loading, setLoading] = useState(true);
    const [entries, setEntries] = useState([]);
    const [waterGoal, setWaterGoal] = useState(3000);

    const loadWater = async () => {
        try {
            const [waterRes, goalsRes] = await Promise.all([
                waterService.getTodayWater(),
                userService.getGoals(),
            ]);

            if (waterRes.status === 200) {
                setEntries(waterRes.data.entries || []);
                setTotalWater(waterRes.data.totalWater || 0);
            }

            if (goalsRes.status === 200) {
                setWaterGoal(
                    goalsRes.data.goals.waterGoal || 3000
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
            await loadWater();
        };
        initialize();
    }, []);

    const addWater = async (amount) => {
        const res =
            await waterService.addWater(amount);

        if (res.status === 201) {
            loadWater();
        }
    };

    const progress = Math.min(
        (totalWater / waterGoal) * 100,
        100
    );

    const handleDelete = async (id) => {
    const res = await waterService.deleteWater(id);

    if (res.status === 200) {
            loadWater();
        }
    };

    if (loading) {
        return (
            <div className="rounded-2xl bg-white p-6 shadow-sm border">
                Loading water tracker...
            </div>
        );
    }

    return (
        <div className="relative overflow-hidden rounded-3xl bg-white/90 backdrop-blur-md p-6 shadow-xl border border-blue-100 hover:shadow-2xl transition-all duration-500">

            {/* Decorative Blur */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-200/30 rounded-full blur-3xl"></div>

            {/* Header */}
            <div className="relative flex items-center justify-between mb-6">
                <div>
                    <h2 className="text-2xl font-bold text-slate-800">
                        💧 Hydration Tracker
                    </h2>

                    <p className="text-sm text-slate-500">
                        Stay hydrated throughout the day
                    </p>
                </div>

                <div className="bg-blue-100 text-blue-700 px-3 py-2 rounded-xl font-bold">
                    {Math.round(progress)}%
                </div>
            </div>

            {/* Water Stats */}
            <div className="relative mb-6">

                <div className="flex justify-between mb-3">
                    <span className="font-bold text-slate-700">
                        {totalWater} ml
                    </span>

                    <span className="font-bold text-blue-600">
                        Goal: {waterGoal} ml
                    </span>
                </div>

                {/* Progress Container */}
                <div className="relative h-8 bg-blue-50 rounded-full overflow-hidden border border-blue-100">

                    {/* Water Fill */}
                    <div
                        className="absolute left-0 top-0 h-full bg-linear-to-r from-cyan-400 via-blue-500 to-indigo-500 transition-all duration-700"
                        style={{
                            width: `${progress}%`,
                        }}
                    />

                    {/* Wave Animation */}
                    <div
                        className="absolute top-0 left-0 h-full w-full opacity-20 animate-pulse"
                        style={{
                            background:
                                "repeating-linear-gradient(90deg, white 0px, white 20px, transparent 20px, transparent 40px)",
                        }}
                    />

                    <div className="absolute inset-0 flex items-center justify-center text-xs font-bold text-white">
                        {Math.round(progress)}%
                    </div>

                </div>
            </div>

            {/* Quick Add Buttons */}
            <div className="grid grid-cols-3 gap-3">

                <button
                    onClick={() => addWater(250)}
                    className="rounded-xl py-3 font-semibold text-blue-700 bg-blue-100 hover:bg-blue-200 hover:scale-105 transition"
                >
                    +250 ml
                </button>

                <button
                    onClick={() => addWater(500)}
                    className="rounded-xl py-3 font-semibold text-indigo-700 bg-indigo-100 hover:bg-indigo-200 hover:scale-105 transition"
                >
                    +500 ml
                </button>

                <button
                    onClick={() => addWater(1000)}
                    className="rounded-xl py-3 font-semibold text-cyan-700 bg-cyan-100 hover:bg-cyan-200 hover:scale-105 transition"
                >
                    +1 L
                </button>

            </div>

            {/* History */}
            <div className="mt-6">

                <div className="flex items-center justify-between mb-3">
                    <h3 className="font-bold text-slate-700">
                        Today's Entries
                    </h3>

                    <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                        {entries.length} logs
                    </span>
                </div>

                {entries.length === 0 ? (
                    <div className="text-center py-6">
                        <div className="text-4xl animate-bounce">
                            💧
                        </div>

                        <p className="mt-2 text-slate-500">
                            No water logged today
                        </p>
                    </div>
                ) : (
                    <div className="max-h-52 overflow-y-auto space-y-2 pr-1">

                        {entries.map((entry) => (
                            <div
                                key={entry._id}
                                className="flex justify-between items-center bg-blue-50 hover:bg-blue-100 rounded-xl p-3 transition"
                            >
                                <span className="font-medium text-slate-700">
                                    💦 {entry.amount} ml
                                </span>

                                <button
                                    onClick={() =>
                                        handleDelete(entry._id)
                                    }
                                    className="text-red-500 font-medium hover:text-red-700 transition"
                                >
                                    Delete
                                </button>
                            </div>
                        ))}

                    </div>
                )}
            </div>

        </div>
    );
}

export default WaterTrackerCard;