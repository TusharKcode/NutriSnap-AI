const User = require('../models/User');

/**
 * Get current user profile
 * GET /api/user/profile
 */
const getUserProfile = async (req, res) => {
    try {
        const user = req.user;

        if (!user) {
            return res.status(401).json({ message: 'User not authenticated' });
        }

        const userResponse = user.toObject();
        delete userResponse.password;

        res.json({
            success: true,
            user: userResponse,
        });
    } catch (error) {
        console.error('[User] getUserProfile failed:', error);
        res.status(500).json({ message: 'Server error while fetching profile' });
    }
};

/**
 * Update user nutritional goals
 * PUT /api/user/goals
 * 
 * Request body:
 * {
 *   "calorieGoal": 2500,
 *   "proteinGoal": 150,
 *   "carbGoal": 300,
 *   "fatGoal": 80
 * }
 */
const updateGoals = async (req, res) => {
    try {
        const user = req.user;

        if (!user) {
            return res.status(401).json({ message: 'User not authenticated' });
        }

        const { calorieGoal, proteinGoal, carbGoal, fatGoal, waterGoal, weightGoal } = req.body;

        // Validate that at least one goal is provided
        if (
            calorieGoal === undefined &&
            proteinGoal === undefined &&
            carbGoal === undefined &&
            fatGoal === undefined &&
            waterGoal === undefined &&
            weightGoal === undefined
        ) {
            return res.status(400).json({
                message: 'At least one goal field must be provided',
            });
        }

        // Validate calorieGoal
        if (calorieGoal !== undefined) {
            if (typeof calorieGoal !== 'number') {
                return res.status(400).json({ message: 'calorieGoal must be a number' });
            }
            if (calorieGoal < 0) {
                return res.status(400).json({ message: 'calorieGoal must not be negative' });
            }
            if (calorieGoal > 10000) {
                return res.status(400).json({ message: 'calorieGoal seems too high (> 10000)' });
            }
            user.calorieGoal = calorieGoal;
        }

        // Validate proteinGoal
        if (proteinGoal !== undefined) {
            if (typeof proteinGoal !== 'number') {
                return res.status(400).json({ message: 'proteinGoal must be a number' });
            }
            if (proteinGoal < 0) {
                return res.status(400).json({ message: 'proteinGoal must not be negative' });
            }
            if (proteinGoal > 500) {
                return res.status(400).json({ message: 'proteinGoal seems too high (> 500g)' });
            }
            user.proteinGoal = proteinGoal;
        }

        // Validate carbGoal
        if (carbGoal !== undefined) {
            if (typeof carbGoal !== 'number') {
                return res.status(400).json({ message: 'carbGoal must be a number' });
            }
            if (carbGoal < 0) {
                return res.status(400).json({ message: 'carbGoal must not be negative' });
            }
            if (carbGoal > 1000) {
                return res.status(400).json({ message: 'carbGoal seems too high (> 1000g)' });
            }
            user.carbGoal = carbGoal;
        }

        // Validate fatGoal
        if (fatGoal !== undefined) {
            if (typeof fatGoal !== 'number') {
                return res.status(400).json({ message: 'fatGoal must be a number' });
            }
            if (fatGoal < 0) {
                return res.status(400).json({ message: 'fatGoal must not be negative' });
            }
            if (fatGoal > 500) {
                return res.status(400).json({ message: 'fatGoal seems too high (> 500g)' });
            }
            user.fatGoal = fatGoal;
        }

        // Validate fatGoal
        if (waterGoal !== undefined) {
            if (typeof waterGoal !== 'number') {
                return res.status(400).json({
                    message: 'waterGoal must be a number',
                });
            }

            if (waterGoal < 0) {
                return res.status(400).json({
                    message: 'waterGoal must not be negative',
                });
            }

            if (waterGoal > 10000) {
                return res.status(400).json({
                    message: 'waterGoal seems too high (>10000 ml)',
                });
            }

            user.waterGoal = waterGoal;
        }
        
        // Validate Weight Goal
        if (weightGoal !== undefined) {
            if (typeof weightGoal !== 'number') {
                return res.status(400).json({
                    message: 'weightGoal must be a number',
                });
            }

            if (weightGoal < 20) {
                return res.status(400).json({
                    message: 'weightGoal too low',
                });
            }

            if (weightGoal > 500) {
                return res.status(400).json({
                    message: 'weightGoal too high',
                });
            }

            user.weightGoal = weightGoal;
        }

        // Save updated user
        await user.save();

        const userResponse = user.toObject();
        delete userResponse.password;

        res.json({
            success: true,
            message: 'Goals updated successfully',
            user: userResponse,
        });
    } catch (error) {
        console.error('[User] updateGoals failed:', error);
        res.status(500).json({ message: 'Server error while updating goals' });
    }
};

/**
 * Get current user goals
 * GET /api/user/goals
 */
const getGoals = async (req, res) => {
    try {
        const user = req.user;

        if (!user) {
            return res.status(401).json({ message: 'User not authenticated' });
        }

        res.json({
            success: true,
            goals: {
                calorieGoal: user.calorieGoal,
                proteinGoal: user.proteinGoal,
                carbGoal: user.carbGoal,
                fatGoal: user.fatGoal,
                waterGoal: user.waterGoal,
                weightGoal: user.weightGoal,
            },
        });
    } catch (error) {
        console.error('[User] getGoals failed:', error);
        res.status(500).json({ message: 'Server error while fetching goals' });
    }
};

module.exports = {
    getUserProfile,
    updateGoals,
    getGoals,
};
