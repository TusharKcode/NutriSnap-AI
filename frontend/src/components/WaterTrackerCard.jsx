import { useEffect, useState } from 'react';
import waterService from '../services/waterService';

function WaterTrackerCard() {
    const WATER_GOAL = 3000;

    const [totalWater, setTotalWater] = useState(0);
    const [loading, setLoading] = useState(true);
    const [entries, setEntries] = useState([]);

    const loadWater = async () => {
        try {
            const res = await waterService.getTodayWater();

            if (res.status === 200) {
                setEntries(res.data.entries || []);
                setTotalWater(res.data.totalWater || 0);
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
        (totalWater / WATER_GOAL) * 100,
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
        <div className="rounded-2xl bg-white p-6 shadow-sm border border-gray-200">

            <h2 className="text-lg font-semibold mb-4">
                Water Tracking
            </h2>

            <div className="mb-4">
                <div className="flex justify-between mb-2">
                    <span>
                        {totalWater} ml
                    </span>

                    <span>
                        {WATER_GOAL} ml
                    </span>
                </div>

                <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-blue-500"
                        style={{
                            width: `${progress}%`,
                        }}
                    />
                </div>
            </div>

            <div className="grid grid-cols-3 gap-2">

                <button
                    onClick={() => addWater(250)}
                    className="px-3 py-2 rounded bg-blue-100 hover:bg-blue-200"
                >
                    +250 ml
                </button>

                <button
                    onClick={() => addWater(500)}
                    className="px-3 py-2 rounded bg-blue-100 hover:bg-blue-200"
                >
                    +500 ml
                </button>

                <button
                    onClick={() => addWater(1000)}
                    className="px-3 py-2 rounded bg-blue-100 hover:bg-blue-200"
                >
                    +1 L
                </button>

            </div>

            <div className="mt-6">
                <h3 className="font-medium mb-2">
                    Today's Entries
                </h3>

                {entries.length === 0 ? (
                    <p className="text-sm text-gray-500">
                        No water logged today
                    </p>
                ) : (
                    <div className="space-y-2">
                        {entries.map((entry) => (
                            <div
                                key={entry._id}
                                className="flex justify-between items-center border rounded p-2"
                            >
                                <span>
                                    💧 {entry.amount} ml
                                </span>

                                <button
                                    onClick={() =>
                                        handleDelete(entry._id)
                                    }
                                    className="text-red-500 hover:text-red-700"
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