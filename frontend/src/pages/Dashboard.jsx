import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import dashboardService from "../services/dashboardService";
import AppNavbar from '../components/AppNavbar';
import SummaryCard from '../components/SummaryCard';
import StreakCard from "../components/StreakCard";
import WeeklyChart from '../components/WeeklyChart';
import FoodList from '../components/FoodList';
import foodService from '../services/foodService';
import MacroRings from '../components/MacroRings';
import WaterTrackerCard from '../components/WaterTrackerCard';
import WeightTrackerCard from '../components/WeightTrackerCard';
import AIMealSuggestionsCard from '../components/AIMealSuggestionsCard';
import { FaFire, FaDrumstickBite, FaBreadSlice, FaCheese, FaBullseye, FaRobot, FaChartLine } from 'react-icons/fa';

function Dashboard() {
    const navigate = useNavigate();
    const { logout, user } = useAuth();
    const [summary, setSummary] = useState(null);
    const [goals, setGoals] = useState(null);
    const [streak, setStreak] = useState(null);
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [weeklyData, setWeeklyData] = useState([]);
    const [recentFoods, setRecentFoods] = useState([]);

    const streakCount =
        streak?.currentStreak ||
        streak?.current ||
        streak?.count ||
        streak?.streak ||
        0;

    const dashboardMetrics = [
        {
            label: "Calories",
            value: summary?.calories ?? goals?.calories?.current ?? "-",
            unit: "kcal",
            progress: goals?.calories?.goal ?? summary?.caloriesGoal,
            icon: <FaFire className="text-orange-500" />
        },
        {
            label: "Protein",
            value: summary?.protein ?? goals?.protein?.current ?? "-",
            unit: "g",
            progress: goals?.protein?.goal ?? summary?.proteinGoal,
            icon: <FaDrumstickBite className="text-red-500" />
        },
        {
            label: "Carbs",
            value: summary?.carbs ?? goals?.carbs?.current ?? "-",
            unit: "g",
            progress: goals?.carbs?.goal ?? summary?.carbsGoal,
            icon: <FaBreadSlice className="text-blue-500" />
        },
        {
            label: "Fat",
            value: summary?.fat ?? goals?.fat?.current ?? "-",
            unit: "g",
            progress: goals?.fat?.goal ?? summary?.fatGoal,
            icon: <FaCheese className="text-yellow-500" />
        },
    ];

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    const loadDashboard = async () => {
        setIsLoading(true);
        setError("");

        try {
            const [summaryRes, goalsRes, streakRes, weeklyRes, diaryRes] = await Promise.all([
                dashboardService.getDashboardSummary(),
                dashboardService.getGoalProgress(),
                dashboardService.getStreak(),
                dashboardService.getWeeklyStats(),
                foodService.getDiary()
            ]);

            if (summaryRes?.status === 200) {
                setSummary(summaryRes.data);
            } else {
                setError("Unable to load dashboard summary.");
            }

            if (goalsRes?.status === 200) {
                setGoals(goalsRes.data);
            } else {
                setError((prev) => prev || "Unable to load goal progress.");
            }

            if (streakRes?.status === 200) {
                setStreak(streakRes.data);
            } else {
                setError((prev) => prev || "Unable to load streak data.");
            }

            if (weeklyRes?.status === 200) {
                setWeeklyData(weeklyRes.data)
            } else {
                setError((prev) => prev || "Unable to load weekly chart data.");
            }

            if (diaryRes?.status === 200) {
                setRecentFoods((diaryRes.data.entries || []).slice(0,5))
            } else {
                setError((prev) => prev || "Unable to load food data.");
            }
        } catch (err) {
            setError("An error occurred while loading dashboard data.", err);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        const initialize = async () => {
            await loadDashboard();
        };
        initialize();
    }, []);

    return (
        <>
            <AppNavbar/>
            <div className="min-h-screen bg-linear-to-br from-green-50 via-white to-blue-50 p-6 md:p-10 space-y-5">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 mb-2">
                    <div>
                        <h1 className="text-2xl md:text-4xl font-bold text-gray-800">
                            Welcome back, {user?.name} 👋
                        </h1>

                        <p className="text-gray-500 mt-1">
                            Track nutrition, hydration, weight and AI recommendations.
                        </p>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="px-5 py-2.5 rounded-2xl bg-red-500 text-white shadow-lg hover:scale-105 hover:bg-red-600 transition-all duration-300"
                    >
                        Logout
                    </button>
                </div>

                

                {isLoading ? (
                    <div className="rounded-lg border border-dashed border-gray-300 p-6 text-center text-gray-500">
                        <div className="flex justify-center py-10">
                            <div className="h-10 w-10 border-4 border-green-500 border-t-transparent rounded-full animate-spin" />
                        </div>
                    </div>
                ) : (
                    <>
                        {error && (
                            <div className="rounded-xl bg-red-50 border border-red-200 p-4 text-red-700">
                                {error}
                            </div>
                        )}

                        {/* Summary Cards */}
                        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
                            {dashboardMetrics.map((metric) => (
                                <SummaryCard
                                    key={metric.label}
                                    title={metric.label}
                                    value={metric.value}
                                    unit={metric.unit}
                                    goal={metric.progress}
                                    icon={metric.icon}
                                />
                            ))}
                        </div>

                        {/* Streak + Macro Rings */}
                        <div className="grid gap-6 lg:grid-cols-2">
                            <StreakCard
                                currentStreak={streakCount}
                            />

                            <MacroRings
                                goals={goals}
                            />
                        </div>

                        {/* Water + Weight */}
                        <div className="grid gap-6 xl:grid-cols-2">
                            <WaterTrackerCard />

                            <WeightTrackerCard />
                        </div>

                        {/* Goal Progress + Stats */}
                        <div className="grid gap-6 lg:grid-cols-2">
                            <div className="rounded-3xl bg-white p-5 shadow-lg border border-gray-100 h-fit">
                                <div className="flex items-center gap-2 mb-4">
                                    <FaBullseye className="text-red-500 text-xl" />
                                    <h2 className="text-lg font-semibold">
                                        Goal Progress
                                    </h2>
                                </div>

                                <div className="space-y-3">
                                    <div className="space-y-1">
                                        <div className="flex justify-between mb-1">
                                            <span>Calories</span>
                                            <span>
                                                {goals?.calories?.current} / {goals?.calories?.goal}
                                            </span>
                                        </div>

                                        <progress
                                            value={goals?.calories?.progress || 0}
                                            max="100"
                                            className="w-full"
                                        />
                                    </div>

                                    <div className="space-y-1">
                                        <div className="flex justify-between mb-1">
                                            <span>Protein</span>
                                            <span>
                                                {goals?.protein?.current} / {goals?.protein?.goal}
                                            </span>
                                        </div>

                                        <progress
                                            value={goals?.protein?.progress || 0}
                                            max="100"
                                            className="w-full"
                                        />
                                    </div>

                                    <div className="space-y-1">
                                        <div className="flex justify-between mb-1">
                                            <span>
                                                Carbs
                                            </span>

                                            <span>
                                                {goals?.carbs?.current} / {goals?.carbs?.goal}
                                            </span>
                                        </div>

                                        <progress
                                            value={goals?.carbs?.progress || 0}
                                            max="100"
                                            className="w-full"
                                        />
                                    </div>

                                    <div className="space-y-1">
                                        <div className="flex justify-between mb-1">
                                            <span>Fat</span>

                                            <span>
                                                {goals?.fat?.current} / {goals?.fat?.goal}
                                            </span>
                                        </div>

                                        <progress
                                            value={goals?.fat?.progress || 0}
                                            max="100"
                                            className="w-full"
                                        />
                                    </div>

                                </div>
                            </div>

                            <div className="rounded-2xl bg-white p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200">

                                <div className="flex items-center gap-2 mb-4">
                                    <FaChartLine className="text-green-500 text-xl" />
                                    <h2 className="text-lg font-semibold">
                                        Tracking Statistics
                                    </h2>
                                </div>

                                <div className="space-y-3 text-sm">

                                    <div className="grid grid-cols-3 gap-3 mt-4">
                                        <div className="bg-orange-50 rounded-xl p-3 text-center">
                                            <p className="text-xs text-gray-500">
                                                Streak
                                            </p>

                                            <h3 className="font-bold text-orange-500">
                                                {streak?.currentStreak || 0}
                                            </h3>
                                        </div>

                                        <div className="bg-blue-50 rounded-xl p-3 text-center">
                                            <p className="text-xs text-gray-500">
                                                Days
                                            </p>

                                            <h3 className="font-bold text-blue-500">
                                                {streak?.totalTrackedDays || 0}
                                            </h3>
                                        </div>

                                        <div className="bg-green-50 rounded-xl p-3 text-center">
                                            <p className="text-xs text-gray-500">
                                                Meals
                                            </p>

                                            <h3 className="font-bold text-green-500">
                                                {summary?.totalMeals || 0}
                                            </h3>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Weekly Chart + Recent Foods */}
                        <div className="grid gap-6 lg:grid-cols-2">

                            <WeeklyChart
                                data={weeklyData}
                            />
                            
                            <div className="float-card h-105">
                                <FoodList
                                    data={recentFoods}
                                    className="h-full overflow-y-auto custom-scrollbar"
                                />
                            </div>

                        </div>
                        
                            {/* AI Suggestions */}
                            <AIMealSuggestionsCard
                                icon={
                                    <FaRobot className="text-indigo-500" />
                                }
                                className="max-h-105 overflow-y-auto custom-scrollbar"
                            />
                    </>
                )}
            </div>
        </>
    );
}
export default Dashboard;