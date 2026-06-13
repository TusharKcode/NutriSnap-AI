const express = require('express');
const { getUserProfile, updateGoals, getGoals } = require('../controllers/userController');
const protect = require('../middleware/authMiddleware');

const router = express.Router();

router.use(protect);
router.get('/profile', getUserProfile);
router.get('/goals', getGoals);
router.put('/goals', updateGoals);

module.exports = router;
