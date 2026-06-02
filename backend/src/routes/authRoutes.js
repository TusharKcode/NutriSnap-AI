const express = require('express');
const { registerUser, loginUser, updateUserGoals } = require('../controllers/authController');
const protect = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.put('/goals', protect, updateUserGoals);

module.exports = router;
