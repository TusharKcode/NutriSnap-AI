const User = require("../models/User");
const FoodEntry = require("../models/FoodEntry");
const generateMealSuggestions = require("../services/mealSuggestionService");

const getMealSuggestions = async (req, res) => {
    try {
        const user = req.user;

        if (!user) {
            return res.status(401).json({
                message: "Unauthorized",
            });
        }

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const tomorrow = new Date(today);

        tomorrow.setDate(tomorrow.getDate() + 1);

        const entries = await FoodEntry.find({
            userId: user._id,
            createdAt: {
                $gte: today,
                $lt: tomorrow,
            },
        });

        const totals = entries.reduce(
            (acc, entry) => {
                acc.calories += entry.calories || 0;

                acc.protein += entry.protein || 0;

                acc.carbs += entry.carbs || 0;

                acc.fat += entry.fat || 0;

                return acc;
            },
            {
                calories: 0,
                protein: 0,
                carbs: 0,
                fat: 0,
            },
        );

        const recentMeals = entries.slice(-5).map((meal) => meal.foodName);

        const suggestion = await generateMealSuggestions({
            goals: {
                calories: user.calorieGoal,
                protein: user.proteinGoal,
                carbs: user.carbGoal,
                fat: user.fatGoal,
            },

            current: totals,
            recentMeals,
        });

        return res.json({
            success: true,
            suggestion,
        });
    } catch (error) {
        console.error("[AI Suggestions]", error);

        return res.status(500).json({
            message: "Failed to generate suggestions",
        });
    }
};

module.exports = {
    getMealSuggestions,
};
