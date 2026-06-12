import {
    FaDrumstickBite,
    FaBreadSlice,
    FaCheese,
} from 'react-icons/fa';

function MacroRing({
    label,
    current = 0,
    goal = 0,
    color,
    icon,
}) {
    const percentage =
        goal > 0
            ? Math.min(
					Math.round(
						(current / goal) * 100
					),
					100
				)
            : 0;

    const circumference = 251.2;

    return (
        <div className="group flex flex-col items-center">

            <div className="relative h-36 w-36 transition-all duration-500 group-hover:scale-105">

                {/* Glow */}
                <div
                    className={`absolute inset-3 rounded-full blur-xl opacity-20 ${color.bg}`}
                />

                <svg
                    className="h-36 w-36 -rotate-90"
                    viewBox="0 0 100 100"
                >
                    {/* Background */}
                    <circle
                        cx="50"
                        cy="50"
                        r="40"
                        stroke="#e5e7eb"
                        strokeWidth="8"
                        fill="none"
                    />

                    {/* Progress */}
                    <circle
                        cx="50"
                        cy="50"
                        r="40"
                        stroke={color.stroke}
                        strokeWidth="8"
                        fill="none"
                        strokeLinecap="round"
                        strokeDasharray={circumference}
                        strokeDashoffset={
                            circumference -
                            (circumference *
                                percentage) /
                                100
                        }
                        className="transition-all duration-1000"
                    />
                </svg>

                {/* Center */}
                <div className="absolute inset-0 flex flex-col items-center justify-center">

                    <div
                        className={`mb-1 text-xl ${color.text}`}
                    >
                        {icon}
                    </div>

                    <p className="text-xl font-bold text-slate-800">
                        {percentage}%
                    </p>
                </div>

            </div>

            <h3 className="mt-4 font-bold text-slate-800 text-lg">
                {label}
            </h3>

            <p className="text-sm text-slate-500">
                {current} / {goal} g
            </p>

        </div>
    );
}

function MacroRings({ goals }) {
    return (
        <div className="relative overflow-hidden rounded-3xl bg-white/90 backdrop-blur-md p-6 md:p-8 shadow-xl border border-gray-100">

            {/* Background Decoration */}
            <div className="absolute top-0 right-0 h-40 w-40 bg-linear-to-br from-orange-100 to-red-100 rounded-full blur-3xl opacity-40"></div>

            <div className="relative">

                <div className="flex items-center justify-between mb-8">

                    <div>
                        <h2 className="text-2xl font-bold text-slate-800">
                            Macro Progress
                        </h2>

                        <p className="text-sm text-slate-500">
                            Track your daily nutrition goals
                        </p>
                    </div>

                    <div className="hidden md:block text-3xl">
                        🎯
                    </div>

                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

                    <MacroRing
                        label="Protein"
                        current={goals?.protein?.current}
                        goal={goals?.protein?.goal}
                        icon={<FaDrumstickBite />}
                        color={{
                            stroke: '#ef4444',
                            text: 'text-red-500',
                            bg: 'bg-red-400',
                        }}
                    />

                    <MacroRing
                        label="Carbs"
                        current={goals?.carbs?.current}
                        goal={goals?.carbs?.goal}
                        icon={<FaBreadSlice />}
                        color={{
                            stroke: '#3b82f6',
                            text: 'text-blue-500',
                            bg: 'bg-blue-400',
                        }}
                    />

                    <MacroRing
                        label="Fat"
                        current={goals?.fat?.current}
                        goal={goals?.fat?.goal}
                        icon={<FaCheese />}
                        color={{
                            stroke: '#f59e0b',
                            text: 'text-yellow-500',
                            bg: 'bg-yellow-400',
                        }}
                    />

                </div>
            </div>
        </div>
    );
}

export default MacroRings;