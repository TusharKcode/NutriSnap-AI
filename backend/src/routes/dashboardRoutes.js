const express = require('express');
const { getDashboardSummary, getWeeklyStats, getStreakStats, getGoalProgress } = require('../controllers/dashboardController');
const protect = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/summary', protect, getDashboardSummary);
router.get('/weekly', protect, getWeeklyStats);
router.get('/streak', protect, getStreakStats);
router.get('/goals', protect, getGoalProgress);

module.exports = router;
