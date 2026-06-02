const express = require('express');
const { uploadFood, getDiary } = require('../controllers/foodController');
const protect = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/upload', protect, uploadFood);
router.get('/diary', protect, getDiary);

module.exports = router;
