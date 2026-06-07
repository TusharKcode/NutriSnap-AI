import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import dashboardService from "../services/dashboardService";
import Navbar from '../components/Navbar';
import SummaryCard from '../components/SummaryCard';
import StreakCard from "../components/StreakCard";
import WeeklyChart from '../components/WeeklyChart';
import FoodList from '../components/FoodList';
import foodService from '../services/foodService';
import MacroRings from '../components/MacroRings';

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
        },
        {
            label: "Protein",
            value: summary?.protein ?? goals?.protein?.current ?? "-",
            unit: "g",
            progress: goals?.protein?.goal ?? summary?.proteinGoal,
        },
        {
            label: "Carbs",
            value: summary?.carbs ?? goals?.carbs?.current ?? "-",
            unit: "g",
            progress: goals?.carbs?.goal ?? summary?.carbsGoal,
        },
        {
            label: "Fat",
            value: summary?.fat ?? goals?.fat?.current ?? "-",
            unit: "g",
            progress: goals?.fat?.goal ?? summary?.fatGoal,
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
        <div className="p-10 space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold">Welcome back, {user?.name}</h1>
                </div>
                <button
                    onClick={handleLogout}
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
                >
                    Logout
                </button>
            </div>

            <Navbar/>

            {isLoading ? (
                <div className="rounded-lg border border-dashed border-gray-300 p-6 text-center text-gray-500">
                    Loading dashboard...
                </div>
            ) : (
                <>
                    {error && (
                        <div className="rounded-lg bg-red-50 border border-red-200 p-4 text-red-700">
                            {error}
                        </div>
                    )}

                    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
                        {dashboardMetrics.map((metric) => (
                            <SummaryCard
                                key={metric.label}
                                title={metric.label}
                                value={metric.value}
                                unit={metric.unit}
                                goal={metric.progress}
                            />
                        ))}
                    </div>

                    <StreakCard
                        currentStreak={streakCount}
                    />

                    <MacroRings
                        goals={goals}
                    />

                    <div className="grid gap-6 lg:grid-cols-2">
                        <div className="rounded-2xl bg-white p-6 shadow-sm border border-gray-200">
                            <h2 className="text-lg font-semibold mb-4">Goal Progress</h2>

                            <div className="space-y-4">
                                <div>
                                    <div className="flex justify-between">
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

                                <div>
                                    <div className="flex justify-between">
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

                                <div>
                                    <div className="flex justify-between">
                                        <span>Carbs</span>
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

                                <div>
                                    <div className="flex justify-between">
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

                        <div className="rounded-2xl bg-white p-6 shadow-sm border border-gray-200">
                            <h2 className="text-lg font-semibold mb-4">
                                Tracking Statistics
                            </h2>

                            <div className="space-y-3">

                                <div className="flex justify-between">
                                    <span>Current Streak</span>
                                    <span>{streak?.currentStreak || 0} days</span>
                                </div>

                                <div className="flex justify-between">
                                    <span>Total Tracked Days</span>
                                    <span>{streak?.totalTrackedDays || 0}</span>
                                </div>

                            </div>
                        </div>

                        <div>
                            <div className="space-y-3 ">
                                <WeeklyChart
                                    data={weeklyData}
                                />
                            </div>
                        </div>
                        
                        <div>
                            <div className="mt-6 ">
                                <FoodList
                                    data={recentFoods}
                                />
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}

export default Dashboard;
