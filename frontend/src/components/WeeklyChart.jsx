import {
    ResponsiveContainer,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    Area,
    AreaChart,
} from 'recharts';

import {
    FaChartLine,
    FaFire,
} from 'react-icons/fa';

function WeeklyChart({ data = [] }) {

    if (!data.length) {
        return (
            <div className="rounded-3xl bg-white/80 backdrop-blur-md p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300">
                
                <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 rounded-full bg-orange-100 animate-pulse">
                        <FaChartLine className="text-orange-500 text-xl" />
                    </div>

                    <div>
                        <h2 className="text-xl font-bold bg-linear-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                            Weekly Calories
                        </h2>

                        <p className="text-sm text-gray-500">
                            Last 7 days calorie trend
                        </p>
                    </div>
                </div>

                <div className="h-75 flex flex-col items-center justify-center text-center">
                    <FaFire className="text-5xl text-orange-300 animate-bounce mb-4" />

                    <p className="font-semibold text-gray-700">
                        No calorie data yet
                    </p>

                    <p className="text-sm text-gray-500 mt-2">
                        Start logging meals to see your weekly nutrition trend.
                    </p>
                </div>
            </div>
        );
    }

    const highestDay = data.reduce((prev, current) =>
        current.calories > prev.calories ? current : prev
    );

    return (
        <div className="rounded-3xl bg-white/80 backdrop-blur-md p-6 shadow-lg border border-gray-200 hover:shadow-2xl transition-all duration-300">

            {/* Header */}
            <div className="flex items-center justify-between mb-6">

                <div className="flex items-center gap-3">

                    <div className="p-3 rounded-full bg-linear-to-r from-orange-100 to-red-100">
                        <FaChartLine className="text-orange-500 text-xl" />
                    </div>

                    <div>
                        <h2 className="text-xl font-bold bg-linear-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                            Weekly Calories
                        </h2>

                        <p className="text-sm text-gray-500">
                            Nutrition tracking trend
                        </p>
                    </div>
                </div>

                <div className="hidden sm:block text-right">
                    <p className="text-xs text-gray-500">
                        Highest Day
                    </p>

                    <p className="font-bold text-orange-600">
                        🔥 {highestDay.calories} kcal
                    </p>
                </div>

            </div>

            {/* Chart */}
            <div className="h-80">

                <ResponsiveContainer width="100%" height="100%">

                    <AreaChart data={data}>

                        <defs>
                            <linearGradient
                                id="caloriesGradient"
                                x1="0"
                                y1="0"
                                x2="0"
                                y2="1"
                            >
                                <stop
                                    offset="5%"
                                    stopColor="#f97316"
                                    stopOpacity={0.4}
                                />

                                <stop
                                    offset="95%"
                                    stopColor="#f97316"
                                    stopOpacity={0}
                                />
                            </linearGradient>
                        </defs>

                        <CartesianGrid
                            strokeDasharray="4 4"
                            stroke="#e5e7eb"
                        />

                        <XAxis
                            dataKey="date"
                            tick={{
                                fill: '#6b7280',
                                fontSize: 12,
                            }}
                            tickFormatter={(value) =>
                                new Date(value).toLocaleDateString(
                                    'en-US',
                                    {
                                        weekday: 'short',
                                    }
                                )
                            }
                        />

                        <YAxis
                            tick={{
                                fill: '#6b7280',
                                fontSize: 12,
                            }}
                        />

                        <Tooltip
                            contentStyle={{
                                borderRadius: '16px',
                                border: 'none',
                                boxShadow:
                                    '0 10px 25px rgba(0,0,0,0.12)',
                                backgroundColor: '#ffffff',
                            }}
                            formatter={(value) => [
                                `${value} kcal`,
                                'Calories',
                            ]}
                            labelFormatter={(label) =>
                                new Date(label).toLocaleDateString(
                                    'en-US',
                                    {
                                        weekday: 'long',
                                        month: 'short',
                                        day: 'numeric',
                                    }
                                )
                            }
                        />

                        <Area
                            type="monotone"
                            dataKey="calories"
                            stroke="none"
                            fill="url(#caloriesGradient)"
                        />

                        <Line
                            type="monotone"
                            dataKey="calories"
                            stroke="#f97316"
                            strokeWidth={4}
                            dot={{
                                r: 5,
                                fill: '#f97316',
                            }}
                            activeDot={{
                                r: 8,
                            }}
                        />

                    </AreaChart>

                </ResponsiveContainer>

            </div>

            {/* Footer Stats */}
            <div className="grid grid-cols-2 gap-4 mt-4">

                <div className="rounded-2xl bg-orange-50 p-3 border border-orange-100">
                    <p className="text-xs text-gray-500">
                        Peak Calories
                    </p>

                    <p className="font-bold text-orange-600">
                        🔥 {highestDay.calories} kcal
                    </p>
                </div>

                <div className="rounded-2xl bg-green-50 p-3 border border-green-100">
                    <p className="text-xs text-gray-500">
                        Days Logged
                    </p>

                    <p className="font-bold text-green-600">
                        📅 {data.length}
                    </p>
                </div>

            </div>

        </div>
    );
}

export default WeeklyChart;