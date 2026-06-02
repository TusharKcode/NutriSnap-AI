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

        return res.json(summary);
    } catch (error) {
        console.error('[Dashboard] getDashboardSummary error:', error);
        return res.status(500).json({ message: 'Failed to load dashboard summary' });
    }
};

module.exports = {
    getDashboardSummary,
};
