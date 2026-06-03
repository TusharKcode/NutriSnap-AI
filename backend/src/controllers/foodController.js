const FoodEntry = require('../models/FoodEntry');
const analyzeFood = require('../services/foodAnalysisService');

const uploadFood = async (req, res) => {
    try {
        const user = req.user;

        if (!user) {
            return res.status(401).json({
                message: 'Unauthorized',
            });
        }

        const imageFile = req.file;

        if (!imageFile) {
            return res.status(400).json({
                message: 'Image file is required',
            });
        }

        const {
            mealType,
            foodName: providedFoodName,
            calories: providedCalories,
            protein: providedProtein,
            carbs: providedCarbs,
            fat: providedFat,
        } = req.body;

        // Temporary image reference
        const imageUrl = `uploaded-${Date.now()}.jpg`;

        const analysis = await analyzeFood(imageUrl);

        const entry = new FoodEntry({
            userId: user._id,
            foodName:
                providedFoodName ||
                analysis.foodName ||
                'Unknown',

            imageUrl,

            calories:
                providedCalories != null
                    ? Number(providedCalories)
                    : Number(analysis.calories || 0),

            protein:
                providedProtein != null
                    ? Number(providedProtein)
                    : Number(analysis.protein || 0),

            carbs:
                providedCarbs != null
                    ? Number(providedCarbs)
                    : Number(analysis.carbs || 0),

            fat:
                providedFat != null
                    ? Number(providedFat)
                    : Number(analysis.fat || 0),

            mealType: mealType || undefined,
        });

        await entry.save();

        res.status(201).json({
            success: true,
            message: 'Food uploaded successfully',
            entry,
        });
    } catch (error) {
        console.error('[FoodController] uploadFood failed:', error);

        res.status(500).json({
            message: 'Server error while uploading food entry',
        });
    }
};

const getDiary = async (req, res) => {
    try {
        const user = req.user;

        if (!user) {
            return res.status(401).json({
                message: 'Unauthorized',
            });
        }

        const entries = await FoodEntry.find({
            userId: user._id,
        }).sort({
            createdAt: -1,
        });

        res.json({
            success: true,
            entries,
        });
    } catch (error) {
        console.error('[FoodController] getDiary failed:', error);

        res.status(500).json({
            message: 'Server error while fetching diary entries',
        });
    }
};

module.exports = {
    uploadFood,
    getDiary,
};