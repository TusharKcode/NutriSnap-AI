const FoodEntry = require('../models/FoodEntry');

const getDashboardSummary = async (req, res) => {
    try {
        const user = req.user;

        if (!user) {
            return res.status(401).json({ message: 'User not authenticated' });
        }

        const entries = await FoodEntry.find({ userId: user._id });

        const summary = entries.reduce(
            (acc, entry) => {
                acc.totalCalories += entry.calories || 0;
                acc.totalProtein += entry.protein || 0;
                acc.totalCarbs += entry.carbs || 0;
                acc.totalFat += entry.fat || 0;
                acc.totalMeals += 1;
                return acc;
            },
            {
                totalCalories: 0,
                totalProtein: 0,
                totalCarbs: 0,
                totalFat: 0,
                totalMeals: 0,
            }
        );

        return res.json({
            calories: summary.totalCalories,
            protein: summary.totalProtein,
            carbs: summary.totalCarbs,
            fat: summary.totalFat,
            totalMeals: summary.totalMeals,
        });
    } catch (error) {
        console.error('[Dashboard] getDashboardSummary error:', error);
        return res.status(500).json({ message: 'Failed to load dashboard summary' });
    }
};

const getWeeklyStats = async (req, res) => {
    try {
        const user = req.user;

        if (!user) {
            return res.status(401).json({ message: 'User not authenticated' });
        }

        const weekAgo = new Date();
        weekAgo.setDate(weekAgo.getDate() - 6);
        weekAgo.setHours(0, 0, 0, 0);

        const entries = await FoodEntry.find({
            userId: user._id,
            createdAt: { $gte: weekAgo },
        });

        const dailyCalories = entries.reduce((acc, entry) => {
            const dateKey = entry.createdAt.toISOString().slice(0, 10);
            acc[dateKey] = (acc[dateKey] || 0) + (entry.calories || 0);
            return acc;
        }, {});

        const chartData = Object.keys(dailyCalories)
            .sort()
            .map((date) => ({
                date,
                calories: dailyCalories[date],
            }));

        return res.json(chartData);
    } catch (error) {
        console.error('[Dashboard] getWeeklyStats error:', error);
        return res.status(500).json({ message: 'Failed to load weekly stats' });
    }
};

const getStreakStats = async (req, res) => {
    try {
        const user = req.user;

        if (!user) {
            return res.status(401).json({ message: 'User not authenticated' });
        }

        const entries = await FoodEntry.find({ userId: user._id }).sort({ createdAt: 1 });

        // Get unique dates with entries
        const uniqueDates = [...new Set(entries.map(entry =>
            entry.createdAt.toISOString().slice(0, 10)
        ))].sort();

        const totalTrackedDays = uniqueDates.length;

        // Calculate current streak
        let currentStreak = 0;
        if (uniqueDates.length > 0) {
            const today = new Date().toISOString().slice(0, 10);
            let checkDate = today;

            for (let i = uniqueDates.length - 1; i >= 0; i--) {
                if (uniqueDates[i] === checkDate) {
                    currentStreak++;
                    checkDate = new Date(new Date(checkDate).getTime() - 86400000).toISOString().slice(0, 10);
                } else {
                    break;
                }
            }
        }

        return res.json({
            currentStreak,
            totalTrackedDays,
        });
    } catch (error) {
        console.error('[Dashboard] getStreakStats error:', error);
        return res.status(500).json({ message: 'Failed to load streak stats' });
    }
};

const getGoalProgress = async (req, res) => {
    try {
        const user = req.user;

        if (!user) {
            return res.status(401).json({ message: 'User not authenticated' });
        }

        // Get today's date range
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);

        // Fetch today's entries
        const todayEntries = await FoodEntry.find({
            userId: user._id,
            createdAt: { $gte: today, $lt: tomorrow },
        });

        // Calculate totals
        const totals = todayEntries.reduce(
            (acc, entry) => {
                acc.currentCalories += entry.calories || 0;
                acc.currentProtein += entry.protein || 0;
                acc.currentCarbs += entry.carbs || 0;
                acc.currentFat += entry.fat || 0;
                return acc;
            },
            {
                currentCalories: 0,
                currentProtein: 0,
                currentCarbs: 0,
                currentFat: 0,
            }
        );

        // Helper to calculate progress safely
        const calculateProgress = (current, goal) => {
            if (!goal || goal === 0) return 0;
            return Math.round((current / goal) * 100);
        };

        const progress = {
            calories: {
                current: totals.currentCalories,
                goal: user.calorieGoal || 0,
                progress: calculateProgress(totals.currentCalories, user.calorieGoal),
            },
            protein: {
                current: totals.currentProtein,
                goal: user.proteinGoal || 0,
                progress: calculateProgress(totals.currentProtein, user.proteinGoal),
            },
            carbs: {
                current: totals.currentCarbs,
                goal: user.carbGoal || 0,
                progress: calculateProgress(totals.currentCarbs, user.carbGoal),
            },
            fat: {
                current: totals.currentFat,
                goal: user.fatGoal || 0,
                progress: calculateProgress(totals.currentFat, user.fatGoal),
            },
        };

        return res.json(progress);
    } catch (error) {
        console.error('[Dashboard] getGoalProgress error:', error);
        return res.status(500).json({ message: 'Failed to load goal progress' });
    }
};

module.exports = {
    getDashboardSummary,
    getWeeklyStats,
    getStreakStats,
    getGoalProgress,
};
