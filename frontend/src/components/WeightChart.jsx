import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
} from 'recharts';

function WeightChart({ entries }) {

    const data = [...entries]
            .reverse()
            .map((entry) => ({
                date:
                    new Date(
                        entry.createdAt
                    ).toLocaleDateString(),

                weight:
                    entry.weight,
            }));

    return (
        <div className="h-64">

            <ResponsiveContainer
                width="100%"
                height="100%"
            >

                <LineChart data={data}>

                    <XAxis
                        dataKey="date"
                    />

                    <YAxis />

                    <Tooltip />

                    <Line
                        type="monotone"
                        dataKey="weight"
                    />

                </LineChart>

            </ResponsiveContainer>

        </div>
    );
}

export default WeightChart;