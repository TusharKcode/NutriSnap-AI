import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer,} from "recharts";
import { FaChartLine } from "react-icons/fa";

function WeightChart({ entries }) {
    const data = [...entries].reverse().map((entry) => ({
        date: new Date(entry.createdAt).toLocaleDateString(),

        weight: entry.weight,
    }));

    return (
        <div className="rounded-3xl bg-linear-to-br from-purple-50 to-pink-50 p-4 border border-purple-100">
            <div className="flex items-center gap-2 mb-4">
                <FaChartLine className="text-purple-600" />

                <h3 className="font-bold text-purple-700">Weight Trend</h3>
            </div>

            <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data}>
                        <XAxis dataKey="date" tick={{ fontSize: 12 }} />

                        <YAxis />

                        <Tooltip contentStyle={{
                            borderRadius: "16px",
                            border: "none",
                            boxShadow: "0 10px 25px rgba(0,0,0,0.12)",
                        }}
                        />

                        <Line
                            type="monotone"
                            dataKey="weight"
                            stroke="#9333ea"
                            strokeWidth={4}
                            dot={{
                                r: 5,
                            }}
                            activeDot={{
                                r: 8,
                            }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}

export default WeightChart;
