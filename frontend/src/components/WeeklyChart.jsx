import {
	ResponsiveContainer,
	LineChart,
	Line,
	XAxis,
	YAxis,
	Tooltip,
	CartesianGrid,
} from 'recharts';

function WeeklyChart({ data }) {
	return (
		<div className="rounded-2xl bg-white p-6 shadow-sm border border-gray-200">
			<h2 className="text-lg font-semibold mb-4">
				Weekly Calories
			</h2>

			<div style={{ width: '100%', height: 300 }}>
				<ResponsiveContainer>
					<LineChart data={data}>
						<CartesianGrid strokeDasharray="3 3" />

						<XAxis
							dataKey="date"
							tickFormatter={(value) =>
								new Date(value).toLocaleDateString(
									'en-US',
									{
										weekday: 'short',
									}
								)
							}
						/>

						<YAxis />

						<Tooltip />

						<Line
							type="monotone"
							dataKey="calories"
							strokeWidth={3}
						/>
					</LineChart>
				</ResponsiveContainer>
			</div>
		</div>
	);
}

export default WeeklyChart;