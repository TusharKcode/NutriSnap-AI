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
        const imageUrl = `${req.protocol}://${req.get('host')}` + `/uploads/${imageFile.filename}`;

        const analysis = await analyzeFood(imageFile.path, imageFile.mimetype);

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

            mealType: mealType
                ? mealType.toLowerCase()
                : undefined,
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

const analyzeFoodImage = async (req, res) => {
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

        const analysis = await analyzeFood(
            imageFile.path,
            imageFile.mimetype
        );

        return res.status(200).json({
            success: true,
            analysis,
        });

    } catch (error) {
        console.error(
            '[FoodController] analyzeFoodImage failed:',
            error
        );

        return res.status(500).json({
            message:
                'Failed to analyze image',
        });
    }
};

const deleteFoodEntry = async (req, res) => {
    try {
        const user = req.user;
        const { id } = req.params;
        const entry = await FoodEntry.findOne({
            _id: id,
            userId: user._id,
        });

        if (!entry) {
            return res.status(404).json({
                message: 'Food entry not found',
            });
        }
        await FoodEntry.findByIdAndDelete(id);

        res.status(200).json({
            success: true,
            message: 'Food entry deleted successfully',
        });
    } catch (error) {
        console.error(
            '[FoodController] deleteFoodEntry failed:',
            error
        );

        res.status(500).json({
            message: 'Server error while deleting food entry',
        });
    }
};

const updateFoodEntry = async (req, res) => {
    try {
        const user = req.user;
        const { id } = req.params;
        const entry = await FoodEntry.findOne({
            _id: id,
            userId: user._id,
        });

        if (!entry) {
            return res.status(404).json({
                message: 'Food entry not found',
            });
        }

        const { foodName, calories, protein, carbs, fat, mealType, } = req.body;
        entry.foodName = foodName;
        entry.calories = calories;
        entry.protein = protein;
        entry.carbs = carbs;
        entry.fat = fat;
        entry.mealType = mealType;

        await entry.save();

        res.status(200).json({
            success: true,
            entry,
        });
    } catch (error) {
        console.error(
            '[FoodController] updateFoodEntry failed:',
            error
        );

        res.status(500).json({
            message: 'Server error while updating entry',
        });
    }
};

module.exports = { uploadFood, getDiary, analyzeFoodImage, deleteFoodEntry, updateFoodEntry};