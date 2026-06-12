function SummaryCard({
    title,
    value,
    unit,
    goal,
    icon,
}) {
    return (
        <div className="group relative overflow-hidden rounded-3xl bg-white/90 backdrop-blur-md p-6 shadow-lg border border-gray-100 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl">

            {/* Decorative Background */}
            <div className="absolute -top-10 -right-10 h-32 w-32 rounded-full bg-linear-to-br from-indigo-100 via-purple-100 to-pink-100 opacity-50 blur-3xl group-hover:scale-125 transition-all duration-700"></div>

            {/* Gradient Top Border */}
            <div className="absolute top-0 left-0 h-1 w-full bg-linear-to-r from-green-400 via-blue-500 to-purple-500"></div>

            {/* Header */}
            <div className="relative flex items-center justify-between">

                <div>
                    <p className="text-sm font-semibold uppercase tracking-wider text-slate-500">
                        {title}
                    </p>
                </div>

                <div className="h-12 w-12 rounded-2xl bg-linear-to-br from-indigo-50 to-purple-50 flex items-center justify-center text-xl shadow-sm group-hover:scale-110 transition-transform duration-300">
                    {icon || "⭐"}
                </div>

            </div>

            {/* Value */}
            <div className="relative mt-6">

                <div className="flex items-end gap-2">

                    <h3 className="text-4xl font-extrabold text-slate-800 tracking-tight group-hover:text-indigo-600 transition-colors duration-300">
                        {value}
                    </h3>

                    <span className="mb-1 text-sm font-medium text-slate-500">
                        {unit}
                    </span>

                </div>

                <div className="mt-4 flex items-center justify-between">

                    <span className="text-xs text-slate-400 font-medium">
                        Daily Goal
                    </span>

                    <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                        {goal} {unit}
                    </span>

                </div>

            </div>

        </div>
    );
}

export default SummaryCard;