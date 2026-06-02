const express = require('express');
const { getUserProfile, updateGoals, getGoals } = require('../controllers/userController');
const protect = require('../middleware/authMiddleware');

const router = express.Router();

// All routes require authentication
router.use(protect);

/**
 * GET /api/user/profile
 * Get current user profile (public info only)
 */
router.get('/profile', getUserProfile);

/**
 * GET /api/user/goals
 * Get current user nutritional goals
 */
router.get('/goals', getGoals);

/**
 * PUT /api/user/goals
 * Update user nutritional goals
 * 
 * Request body:
 * {
 *   "calorieGoal": 2500,
 *   "proteinGoal": 150,
 *   "carbGoal": 300,
 *   "fatGoal": 80
 * }
 */
router.put('/goals', updateGoals);

module.exports = router;
