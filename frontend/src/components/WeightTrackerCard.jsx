import { useEffect, useState } from 'react';
import weightService from '../services/weightService';

function WeightTrackerCard() {

    const [weight, setWeight] = useState('');
    const [entries, setEntries] = useState([]);
    const [loading, setLoading] = useState(true);

    const loadWeights = async () => {
        try {
            const res =
                await weightService.getWeightHistory();

            if (res.status === 200) {
                setEntries(
                    res.data.entries || []
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

    if (loading) {
        return (
            <div className="rounded-2xl bg-white p-6 shadow-sm border">
                Loading weight tracker...
            </div>
        );
    }

    return (
        <div className="rounded-2xl bg-white p-6 shadow-sm border border-gray-200">

            <h2 className="text-lg font-semibold mb-4">
                Weight Tracking
            </h2>

            <div className="mb-4">
                <p className="text-sm text-gray-500">
                    Current Weight
                </p>

                <p className="text-3xl font-bold">
                    {latestWeight} kg
                </p>
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
                    className="flex-1 border rounded p-2"
                />

                <button
                    type="submit"
                    className="px-4 py-2 bg-green-500 text-white rounded"
                >
                    Add
                </button>

            </form>

            <div className="space-y-2">

                {entries.length === 0 ? (
                    <p className="text-sm text-gray-500">
                        No weight records
                    </p>
                ) : (
                    entries.map((entry) => (
                        <div
                            key={entry._id}
                            className="flex justify-between items-center border rounded p-2"
                        >

                            <span>
                                ⚖️ {entry.weight} kg
                            </span>

                            <button
                                onClick={() =>
                                    handleDelete(
                                        entry._id
                                    )
                                }
                                className="text-red-500"
                            >
                                Delete
                            </button>

                        </div>
                    ))
                )}

            </div>

        </div>
    );
}

export default WeightTrackerCard;