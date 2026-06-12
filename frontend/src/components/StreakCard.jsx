import { FaFire } from 'react-icons/fa';

function StreakCard({ currentStreak }) {
	return (
		<div className="relative overflow-hidden rounded-3xl bg-linear-to-r from-orange-500 via-red-500 to-pink-500 p-6 shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">

			{/* Background Glow */}
			<div className="absolute -top-10 -right-10 h-40 w-40 rounded-full bg-white/10 blur-3xl" />

			<div className="absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-yellow-300/20 blur-3xl" />

			<div className="relative flex flex-col md:flex-row items-center justify-between gap-6">

				{/* Left Content */}
				<div>

					<div className="flex items-center gap-2">
						<FaFire className="text-yellow-300 text-lg animate-pulse" />

						<p className="uppercase tracking-widest text-xs font-bold text-orange-100">
							Current Streak
						</p>
					</div>

					<h2 className="mt-3 text-5xl font-black text-white">
						{currentStreak}
					</h2>

					<p className="mt-2 text-orange-100 font-medium">
						Days tracked continuously
					</p>

					<div className="mt-4 inline-flex items-center rounded-full bg-white/20 px-4 py-1 text-sm font-semibold text-white backdrop-blur-md">
						🔥 Keep the momentum going!
					</div>

				</div>

				{/* Right Icon */}
				<div className="relative">

					<div className="absolute inset-0 rounded-full bg-yellow-300 opacity-40 blur-xl animate-pulse" />

					<div className="relative flex h-24 w-24 items-center justify-center rounded-full bg-white/20 backdrop-blur-md border border-white/20">
						<FaFire className="text-5xl text-yellow-300 animate-bounce" />
					</div>

				</div>

			</div>

			{/* Bottom Progress */}
			<div className="mt-6">

				<div className="flex justify-between text-xs text-orange-100 mb-2">
					<span>Consistency</span>
					<span>{currentStreak} Days</span>
				</div>

				<div className="h-2 rounded-full bg-white/20 overflow-hidden">

					<div
						className="h-full rounded-full bg-yellow-300 transition-all duration-1000"
						style={{
							width: `${Math.min(currentStreak * 5, 100)}%`,
						}}
					/>

				</div>

			</div>

		</div>
	);
}

export default StreakCard;